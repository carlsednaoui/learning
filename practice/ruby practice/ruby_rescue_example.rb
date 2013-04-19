
class FailedShenannigans < StandardError
end

puts "Starting our process."
begin
  print "In the begin block. About to give you some $$$. **** "; puts 10 * 10
  # print "In the begin block. About to crash. **** "; puts 10 * nil
  # print "About to raise an error.  **** "; raise "I raise you an error, son."
  # print "About to raise a custom error.  **** "; raise FailedShenannigans, "This message will show in the rescue block."
  # print "You should only see this if I don't raise an error. ******** "; puts 100 * 100
rescue FailedShenannigans => omg_shenannigans         # you can define the error class && pass in a variable
  puts "In the FailedShenannigans rescue."
  puts omg_shenannigans                               # you have access to the variable you defined earlier
rescue StandardError
  puts "In the StandardError rescue."
  puts $!                                             # you can also use the less-descriptive $! to print the error  
else
  puts "In the else clause. This happens if no exception is raised."
ensure
  puts "In the ensure. This always happen at the end, you know."
end

# More goodness: http://www.ruby-doc.org/docs/ProgrammingRuby/html/tut_exceptions.html

# def promptAndGet(prompt)
#   print prompt
#   res = readline.chomp
#   throw :quitRequested if res == "!"
#   return res
# end

# catch :quitRequested do
#   name = promptAndGet("Name: ")
#   age  = promptAndGet("Age:  ")
#   sex  = promptAndGet("Sex:  ")
# end