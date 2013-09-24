# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = "vestal_versions"
  s.version = "1.2.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["Adam Cooper"]
  s.date = "2013-06-18"
  s.description = "Keep a DRY history of your ActiveRecord models' changes"
  s.email = ["adam.cooper@gmail.com"]
  s.files = ["lib/generators/vestal_versions.rb", "lib/generators/vestal_versions/migration/migration_generator.rb", "lib/generators/vestal_versions/migration/templates/initializer.rb", "lib/generators/vestal_versions/migration/templates/migration.rb", "lib/vestal_versions.rb", "lib/vestal_versions/changes.rb", "lib/vestal_versions/conditions.rb", "lib/vestal_versions/control.rb", "lib/vestal_versions/creation.rb", "lib/vestal_versions/deletion.rb", "lib/vestal_versions/options.rb", "lib/vestal_versions/reload.rb", "lib/vestal_versions/reset.rb", "lib/vestal_versions/reversion.rb", "lib/vestal_versions/users.rb", "lib/vestal_versions/version.rb", "lib/vestal_versions/version_num.rb", "lib/vestal_versions/version_tagging.rb", "lib/vestal_versions/versioned.rb", "lib/vestal_versions/versions.rb", "README.rdoc", "LICENSE", "spec/spec_helper.rb", "spec/support/models.rb", "spec/support/schema.rb", "spec/vestal_versions/changes_spec.rb", "spec/vestal_versions/conditions_spec.rb", "spec/vestal_versions/control_spec.rb", "spec/vestal_versions/creation_spec.rb", "spec/vestal_versions/deletion_spec.rb", "spec/vestal_versions/options_spec.rb", "spec/vestal_versions/reload_spec.rb", "spec/vestal_versions/reset_spec.rb", "spec/vestal_versions/reversion_spec.rb", "spec/vestal_versions/users_spec.rb", "spec/vestal_versions/version_spec.rb", "spec/vestal_versions/version_tagging_spec.rb", "spec/vestal_versions/versioned_spec.rb", "spec/vestal_versions/versions_spec.rb"]
  s.homepage = "http://github.com/adamcooper/vestal_versions"
  s.require_paths = ["lib"]
  s.rubygems_version = "2.0.3"
  s.summary = "Keep a DRY history of your ActiveRecord models' changes"
  s.test_files = ["spec/spec_helper.rb", "spec/support/models.rb", "spec/support/schema.rb", "spec/vestal_versions/changes_spec.rb", "spec/vestal_versions/conditions_spec.rb", "spec/vestal_versions/control_spec.rb", "spec/vestal_versions/creation_spec.rb", "spec/vestal_versions/deletion_spec.rb", "spec/vestal_versions/options_spec.rb", "spec/vestal_versions/reload_spec.rb", "spec/vestal_versions/reset_spec.rb", "spec/vestal_versions/reversion_spec.rb", "spec/vestal_versions/users_spec.rb", "spec/vestal_versions/version_spec.rb", "spec/vestal_versions/version_tagging_spec.rb", "spec/vestal_versions/versioned_spec.rb", "spec/vestal_versions/versions_spec.rb"]

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<activerecord>, [">= 3.0.0"])
      s.add_runtime_dependency(%q<activesupport>, [">= 3.0.0"])
      s.add_development_dependency(%q<rspec>, [">= 0"])
      s.add_development_dependency(%q<rake>, [">= 0"])
      s.add_development_dependency(%q<sqlite3>, [">= 0"])
    else
      s.add_dependency(%q<activerecord>, [">= 3.0.0"])
      s.add_dependency(%q<activesupport>, [">= 3.0.0"])
      s.add_dependency(%q<rspec>, [">= 0"])
      s.add_dependency(%q<rake>, [">= 0"])
      s.add_dependency(%q<sqlite3>, [">= 0"])
    end
  else
    s.add_dependency(%q<activerecord>, [">= 3.0.0"])
    s.add_dependency(%q<activesupport>, [">= 3.0.0"])
    s.add_dependency(%q<rspec>, [">= 0"])
    s.add_dependency(%q<rake>, [">= 0"])
    s.add_dependency(%q<sqlite3>, [">= 0"])
  end
end
