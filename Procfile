web: bundle exec rails server -p $PORT RUBY_GC_MALLOC_LIMIT=90000000 RAILS_ROOT=~/discourse RAILS_ENV=production
sidekiq: bundle exec sidekiq -e $RAILS_ENV
clockwork: bundle exec clockwork config/clock.rb
