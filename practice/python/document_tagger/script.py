 #!/usr/bin/python
 # -*- coding: UTF-8 -*-

import re

import texts
print texts.a
print "************************************"

book_1 = texts.divine_comedy

"""
The title of the text is Some Title
The author is Some Author
The translator is Some Person

Here’s the counts for the keywords you searched for:
“red” : 33
“epitome” : 0
“rhinoceros” : 1
"""

title_regex = re.findall('Title: (.*)Author:', book_1, re.DOTALL)
clean_title = re.sub('\s+', ' ', title_regex[0]);

author_regex = re.findall('Author: (.*)Illustrator:', book_1, re.DOTALL)
clean_author = re.sub('\s+', ' ', author_regex[0]);

translator_regex = re.findall('Translator: (.*)Release', book_1, re.DOTALL)
clean_translator = re.sub('\s+', ' ', translator_regex[0]);

title = 'The title of the text is: ' + clean_title
author = 'The author of the text is: ' + clean_author
translator = 'The translator of the text is: ' + clean_translator

print title
print author
print translator

print "************************************"
print "************************************"

title_matcher = re.compile('Title: (.*)Author:', re.DOTALL)
author_matcher = re.compile('Author: (.*)Illustrator:', re.DOTALL)
translator_matcher = re.compile('Translator: (.*)Release', re.DOTALL)
cleaner_matcher = re.compile('\s+')

raw_title = title_matcher.findall(book_1)[0]
clean_title_2 = cleaner_matcher.sub(' ', raw_title)

raw_author = author_matcher.findall(book_1)[0]
clean_author_2 = cleaner_matcher.sub(' ', raw_author)

raw_translator = translator_matcher.search(book_1)
clean_translator_2 = cleaner_matcher.sub(' ', raw_translator.groups()[0])

print clean_title_2
print clean_author_2
print clean_translator_2