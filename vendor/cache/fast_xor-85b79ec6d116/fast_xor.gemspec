# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = "fast_xor"
  s.version = "1.1.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["Steve Sloan"]
  s.date = "2013-03-22"
  s.description = "Provides a C-optimized method for in-place XORing of two (or three) strings"
  s.email = "steve@finagle.org"
  s.extensions = ["ext/xor/extconf.rb"]
  s.extra_rdoc_files = ["README.rdoc"]
  s.files = ["MIT-LICENSE", "README.rdoc", "benchmark", "lib/.gemkeep", "ext/xor/xor.c", "ext/xor/extconf.rb", "spec/xor_spec.rb"]
  s.homepage = "http://github.com/CodeMonkeySteve/fast_xor"
  s.rdoc_options = ["--charset=UTF-8"]
  s.require_paths = ["lib"]
  s.rubygems_version = "2.0.3"
  s.summary = "Fast String XOR operator"
  s.test_files = ["spec/xor_spec.rb"]

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<rake>, [">= 0"])
      s.add_runtime_dependency(%q<rake-compiler>, [">= 0"])
      s.add_development_dependency(%q<rspec>, [">= 0"])
    else
      s.add_dependency(%q<rake>, [">= 0"])
      s.add_dependency(%q<rake-compiler>, [">= 0"])
      s.add_dependency(%q<rspec>, [">= 0"])
    end
  else
    s.add_dependency(%q<rake>, [">= 0"])
    s.add_dependency(%q<rake-compiler>, [">= 0"])
    s.add_dependency(%q<rspec>, [">= 0"])
  end
end
