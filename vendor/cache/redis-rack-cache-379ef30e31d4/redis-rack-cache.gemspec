# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = "redis-rack-cache"
  s.version = "1.2.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["Luca Guidi", "Matt Horan"]
  s.date = "2013-06-18"
  s.description = "Redis for Rack::Cache"
  s.email = ["me@lucaguidi.com"]
  s.files = [".gitignore", "Gemfile", "MIT-LICENSE", "README.md", "Rakefile", "lib/rack/cache/redis_entitystore.rb", "lib/rack/cache/redis_metastore.rb", "lib/redis-rack-cache.rb", "lib/redis-rack-cache/version.rb", "redis-rack-cache.gemspec", "test/rack/cache/entitystore/pony.jpg", "test/rack/cache/entitystore/redis_test.rb", "test/rack/cache/metastore/redis_test.rb", "test/redis-rack-cache/version_test.rb", "test/test_helper.rb"]
  s.homepage = "http://jodosha.github.com/redis-store"
  s.require_paths = ["lib"]
  s.rubyforge_project = "redis-rack-cache"
  s.rubygems_version = "2.0.3"
  s.summary = "Redis for Rack::Cache"
  s.test_files = ["test/rack/cache/entitystore/pony.jpg", "test/rack/cache/entitystore/redis_test.rb", "test/rack/cache/metastore/redis_test.rb", "test/redis-rack-cache/version_test.rb", "test/test_helper.rb"]

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<redis-store>, ["~> 1.1.0"])
      s.add_runtime_dependency(%q<rack-cache>, ["~> 1.2"])
      s.add_development_dependency(%q<rake>, ["~> 10"])
      s.add_development_dependency(%q<bundler>, ["~> 1.2"])
      s.add_development_dependency(%q<mocha>, ["~> 0.13.0"])
      s.add_development_dependency(%q<minitest>, ["~> 4.3.1"])
    else
      s.add_dependency(%q<redis-store>, ["~> 1.1.0"])
      s.add_dependency(%q<rack-cache>, ["~> 1.2"])
      s.add_dependency(%q<rake>, ["~> 10"])
      s.add_dependency(%q<bundler>, ["~> 1.2"])
      s.add_dependency(%q<mocha>, ["~> 0.13.0"])
      s.add_dependency(%q<minitest>, ["~> 4.3.1"])
    end
  else
    s.add_dependency(%q<redis-store>, ["~> 1.1.0"])
    s.add_dependency(%q<rack-cache>, ["~> 1.2"])
    s.add_dependency(%q<rake>, ["~> 10"])
    s.add_dependency(%q<bundler>, ["~> 1.2"])
    s.add_dependency(%q<mocha>, ["~> 0.13.0"])
    s.add_dependency(%q<minitest>, ["~> 4.3.1"])
  end
end
