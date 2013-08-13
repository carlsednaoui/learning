from optparse import OptionParser

parser = OptionParser()
parser.add_option("-m", "--meal", dest="meal", 
  help="The price of the meal, as a float", type="float")

parser.add_option("-x", "--tax", dest="tax", 
  help="The tax rate for the meal, as an int", type="int")

parser.add_option("-t", "--tip", dest="tip", 
  help="The tip rate for the meal, as an int", type="int", default=20)

(options, args) = parser.parse_args()

if not (options.meal or options.tax):
  parser.error("You forgot something, fix it")

meal_price = options.meal
tax_rate = options.tax
tip_rate = options.tip

total_tax = tax_rate / 100.0 * meal_price
total_tip = tip_rate / 100.0 * meal_price

total_meal_cost = meal_price + total_tax + total_tip

print "The base cost of of your meal was $%s" % "{:.2f}".format(meal_price)
print "You need to pay $%s for tax." % "{:.2f}".format(total_tax)
print "Tipping at a rate of {0}%, you should leave ${1:.2f} for a tip.".format(
  tip_rate, total_tip)
print "The grand total of your meal is $%s." % "{:.2f}".format(total_meal_cost)
