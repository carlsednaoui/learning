class Animal
  def initialize(name)
    @name = name
  end

  def info
    puts "I'm a #{self.class}."
    puts "My name is '#{@name}'."
  end
end

class Dog < Animal
  include Mamal
  def info
    puts "I #{make_noise}."
    super
  end

  def make_noise
    'bark "woof woof"'
  end
end

module Mamal
  def info
    puts "I'm a mamal"
    super
  end
end

# Singleton
scooby = Dog.new "Scooby-Doo"
class << scooby
  def make_noise
    'howl "Scooby-Dooby-Doo!"'
  end
end
scooby.info

# equivalent to previous example:
# def scooby.make_noise
#   'howl "Scooby-Dooby-Doo!"'
# end
