# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = "message_bus"
  s.version = "0.0.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["Sam Saffron"]
  s.date = "2013-06-18"
  s.description = "A message bus built on websockets"
  s.email = ["sam.saffron@gmail.com"]
  s.files = ["README.md", "LICENSE", "lib/message_bus/client.rb", "lib/message_bus/connection_manager.rb", "lib/message_bus/diagnostics.rb", "lib/message_bus/message.rb", "lib/message_bus/message_handler.rb", "lib/message_bus/rack/diagnostics.rb", "lib/message_bus/rack/middleware.rb", "lib/message_bus/rails/railtie.rb", "lib/message_bus/reliable_pub_sub.rb", "lib/message_bus/version.rb", "lib/message_bus.rb"]
  s.homepage = ""
  s.require_paths = ["lib"]
  s.rubygems_version = "2.0.3"
  s.summary = ""

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<rack>, [">= 1.1.3"])
      s.add_runtime_dependency(%q<thin>, [">= 0"])
      s.add_runtime_dependency(%q<eventmachine>, [">= 0"])
      s.add_runtime_dependency(%q<redis>, [">= 0"])
    else
      s.add_dependency(%q<rack>, [">= 1.1.3"])
      s.add_dependency(%q<thin>, [">= 0"])
      s.add_dependency(%q<eventmachine>, [">= 0"])
      s.add_dependency(%q<redis>, [">= 0"])
    end
  else
    s.add_dependency(%q<rack>, [">= 1.1.3"])
    s.add_dependency(%q<thin>, [">= 0"])
    s.add_dependency(%q<eventmachine>, [">= 0"])
    s.add_dependency(%q<redis>, [">= 0"])
  end
end
