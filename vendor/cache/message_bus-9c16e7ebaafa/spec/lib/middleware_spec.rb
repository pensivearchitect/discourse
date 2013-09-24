require 'spec_helper'
require 'message_bus'
require 'rack/test'

describe MessageBus::Rack::Middleware do
  include Rack::Test::Methods

  class FakeAsyncMiddleware

    def self.in_async?
      @@in_async if defined? @@in_async
    end

    def initialize(app,config={})
      @app = app
    end

    def call(env)
      result = nil
      EM.run {
        env['async.callback'] = lambda { |r|
          # more judo with deferrable body, at this point we just have headers
          r[2].callback do
            # even more judo cause rack test does not call each like the spec says
            body = ""
            r[2].each do |m|
              body << m
            end
            r[2] = [body]
            result = r
          end
        }
        catch(:async) {
          result = @app.call(env)
        }

        EM::Timer.new(1) { EM.stop }

        defer = lambda {
          if !result
            @@in_async = true
            EM.next_tick do
              defer.call
            end
          else
            EM.next_tick { EM.stop }
          end
        }
        defer.call
      }

      @@in_async = false
      result || [500, {}, ['timeout']]
    end
  end

  def app
    @app ||= Rack::Builder.new {
      use FakeAsyncMiddleware
      use MessageBus::Rack::Middleware
      run lambda {|env| [500, {'Content-Type' => 'text/html'}, 'should not be called' ]}
    }.to_app
  end

  describe "long polling" do
    before do
      MessageBus.long_polling_enabled = true
    end

    it "should respond right away if dlp=t" do
      post "/message-bus/ABC?dlp=t", '/foo1' => 0
      FakeAsyncMiddleware.in_async?.should == false
      last_response.should be_ok
    end

    it "should respond right away to long polls that are polling on -1 with the last_id" do
      post "/message-bus/ABC", '/foo' => -1
      last_response.should be_ok
      parsed = JSON.parse(last_response.body)
      parsed.length.should == 1
      parsed[0]["channel"].should == "/__status"
      parsed[0]["data"]["/foo"].should == MessageBus.last_id("/foo")
    end

    it "should respond to long polls when data is available" do

      Thread.new do
        wait_for(2000) { FakeAsyncMiddleware.in_async? }
        MessageBus.publish "/foo", "bar"
      end

      post "/message-bus/ABC", '/foo' => nil

      last_response.should be_ok
      parsed = JSON.parse(last_response.body)
      parsed.length.should == 1
      parsed[0]["data"].should == "bar"
    end

    it "should timeout within its alloted slot" do
      begin
        MessageBus.long_polling_interval = 10
        s = Time.now.to_f * 1000
        post "/message-bus/ABC", '/foo' => nil
        (Time.now.to_f * 1000 - s).should < 30
      ensure
        MessageBus.long_polling_interval = 5000
      end
    end

    it "should support batch filtering" do
      MessageBus.user_id_lookup do |env|
        1
      end

      MessageBus.around_client_batch("/demo") do |message, user_ids, callback|
        begin
          Thread.current["test"] = user_ids
          callback.call
        ensure
          Thread.current["test"] = nil
        end
      end

      test = nil

      MessageBus.client_filter("/demo") do |user_id, message|
        test = Thread.current["test"]
        message
      end

      client_id = "ABCD"

      id = MessageBus.publish("/demo", "test")

      Thread.new do
        wait_for(2000) { FakeAsyncMiddleware.in_async? }
        MessageBus.publish "/demo", "test"
      end

      post "/message-bus/#{client_id}", {
        '/demo' => id
      }

      test.should == [1]
    end
  end

  describe "diagnostics" do

    it "should return a 403 if a user attempts to get at the _diagnostics path" do
      get "/message-bus/_diagnostics"
      last_response.status.should == 403
    end

    it "should get a 200 with html for an authorized user" do
      MessageBus.stub(:is_admin_lookup).and_return(lambda{|env| true })
      get "/message-bus/_diagnostics"
      last_response.status.should == 200
    end

    it "should get the script it asks for" do
      MessageBus.stub(:is_admin_lookup).and_return(lambda{|env| true })
      get "/message-bus/_diagnostics/assets/message-bus.js"
      last_response.status.should == 200
      last_response.content_type.should == "text/javascript;"
    end

  end

  describe "polling" do
    before do
      MessageBus.long_polling_enabled = false
    end

    it "should respond with a 200 to a subscribe" do
      client_id = "ABCD"

      # client always keeps a list of channels with last message id they got on each
      post "/message-bus/#{client_id}", {
        '/foo' => nil,
        '/bar' => nil
      }
      last_response.should be_ok
    end

    it "should correctly understand that -1 means stuff from now onwards" do

      MessageBus.publish('foo', 'bar')

      post "/message-bus/ABCD", {
        '/foo' => -1
      }
      last_response.should be_ok
      parsed = JSON.parse(last_response.body)
      parsed.length.should == 1
      parsed[0]["channel"].should == "/__status"
      parsed[0]["data"]["/foo"].should == MessageBus.last_id("/foo")

    end

    it "should respond with the data if messages exist in the backlog" do
      id = MessageBus.last_id('/foo')

      MessageBus.publish("/foo", "barbs")
      MessageBus.publish("/foo", "borbs")

      client_id = "ABCD"
      post "/message-bus/#{client_id}", {
        '/foo' => id,
        '/bar' => nil
      }

      parsed = JSON.parse(last_response.body)
      parsed.length.should == 2
      parsed[0]["data"].should == "barbs"
      parsed[1]["data"].should == "borbs"
    end

    it "should not get consumed messages" do
      MessageBus.publish("/foo", "barbs")
      id = MessageBus.last_id('/foo')

      client_id = "ABCD"
      post "/message-bus/#{client_id}", {
        '/foo' => id
      }

      parsed = JSON.parse(last_response.body)
      parsed.length.should == 0
    end

    it "should filter by user correctly" do
      id = MessageBus.publish("/foo", "test", user_ids: [1])
      MessageBus.user_id_lookup do |env|
        0
      end

      client_id = "ABCD"
      post "/message-bus/#{client_id}", {
        '/foo' => id - 1
      }

      parsed = JSON.parse(last_response.body)
      parsed.length.should == 0

      MessageBus.user_id_lookup do |env|
        1
      end

      post "/message-bus/#{client_id}", {
        '/foo' => id - 1
      }

      parsed = JSON.parse(last_response.body)
      parsed.length.should == 1
    end


    it "should filter by client_filter correctly" do
      id = MessageBus.publish("/filter", "test")
      user_id = 0

      MessageBus.user_id_lookup do |env|
        user_id
      end

      MessageBus.client_filter("/filter") do |user_id, message|
        if user_id == 0
          message = message.dup
          message.data += "_filter"
          message
        elsif user_id == 1
          message
        end
      end

      client_id = "ABCD"

      post "/message-bus/#{client_id}", {
        '/filter' => id - 1
      }

      parsed = JSON.parse(last_response.body)
      parsed[0]['data'].should == "test_filter"

      user_id = 1

      post "/message-bus/#{client_id}", {
        '/filter' => id - 1
      }

      parsed = JSON.parse(last_response.body)
      parsed.length.should == 1
      parsed[0]["data"].should == "test"

      user_id = 2

      post "/message-bus/#{client_id}", {
        '/filter' => id - 1
      }

      parsed = JSON.parse(last_response.body)
      parsed.length.should == 0
    end

    it "should filter by group correctly" do
      id = MessageBus.publish("/foo", "test", group_ids: [3,4,5])
      MessageBus.group_ids_lookup do |env|
        [0,1,2]
      end

      client_id = "ABCD"
      post "/message-bus/#{client_id}", {
        '/foo' => id - 1
      }

      parsed = JSON.parse(last_response.body)
      parsed.length.should == 0

      MessageBus.group_ids_lookup do |env|
        [1,7,4,100]
      end

      post "/message-bus/#{client_id}", {
        '/foo' => id - 1
      }

      parsed = JSON.parse(last_response.body)
      parsed.length.should == 1
    end
  end

end
