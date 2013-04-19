module Mamal
  def info
    super
    puts "I'm a mamal, I come from the module."
  end
end

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
    super
    puts "I #{make_noise}."
  end

  def make_noise
    'bark "woof woof"'
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

# More singleton
puts "-----------------"
foo = Array.new
puts foo.size

def foo.size
  "bananas"
end

def foo.love; "me love ruby"; end

class << foo
  def quack
    "quack quack"
  end
end

puts foo.size

puts "-----------------"
bar = Array.new
puts bar.size
puts foo.size
puts "-----------------"

puts foo.love
puts foo.quack

puts "-----------------"
puts foo.singleton_methods