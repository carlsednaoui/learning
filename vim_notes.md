# 5 Minute Intro

## Basic
    y(ank) - copy
    d(elete) - cut
    c(hange) - replace
    p(aste) - put from buffer after cursor
    o(pen) - start a new line
    i(nsert) - insert before current character
    a(ppend) - insert after current character
    w(ord) - moves to beginning of next word
    b(ack) - moves to beginning of current word or prior word
    e(nd) - moves to end of current word or next word
    f(ind) - moves to a character on the current line
    

## Movement
    movement keys you just need to learn: h,j,k,l
    ^ - beginning of text on a line
    $ - end of text on a line
    0 - first position on line


## Modifiers
    most commands can be prefaced with numeric modifiers.
    2w - means move 2 words
    5h - means move 5 characters to the left
    3k - means move 3 lines up
    3fs - means move to the 3rd letter s folling the cursor

    modification commands (d,c,y) need to know how much to work on.
    dd - delete a line into memory
    yy - yank a line into memory
    cc - change the whole line
    c$ - change from current position to the end
    c2w - change the text spanning the next 2 words
    3dd - delete 3 lines
    d2f. - delete to the second period.

    . - means redo the last modification command.
    / - searches for text, and then n(ext) will go the next found occurance. N will go prior.
    ? - searches backwards through the document.
    You now should be able to use basic vi effectively. Just remember to hit ESC before each command.


## Basic ex commands
    :w myfile.txt  - save current file as 'myfile.txt'
    :q  -  quit the document
    :q! - REALLY QUIT w/o saving
    :w! myfile.txt - try to force saving to 'myfile.txt' even if there are warnings
    :wq - write out the current document and quit
    :r [filename]  - read filename into the current document
    :w %.old - write the current file as  [originalfilename].old
    :0 - go to the top of the document
    :22 - go to line 22
    :$ - go to the bottom of the document


## Marks (placeholders)
    ma - mark the current line as 'a'
    mb - mark the current line as 'b'
    'a - go to mark a
    y'a - yank all the lines from the current position to mark-a
    y'akpkpkp - yank all lines to position a, go up a line, paste, up a line, up a line, paste. You've just taken a block of text and replicated it 3 times.


# Full Vim Tips and Tricks

## Save and quit

    :w => Save [:w filename writes the content to the specified file from current file]

    :q => Exit as long as there have been no changes

    :q! => Exit and ignore any changes

    :wq => Save and Exit.

    :x => Exit, saving changes

    ZZ => Exit and save changes if any have been made

    :10,20w filename => writes the line from 10th line to 20th line in given file name

## Moving the Cursor

    h : Move left

    i : Move right

    j : Move down

    k : Move up

    + : act as j in command mode

    - : act as k in command mode

    w : Move to next word

    W : Move to next blank delimited word

    b : Move to the beginning of the word

    B : Move to the beginning of blank delimiter word
    
    e : Move to the end of the word

    E : Move to the end of Blank delimited word

    ge : jump to previous word-ending

    gE : jump to previous word-ending, ignore punctuation

    g_ : jump to last non-blank character of the line

    ( : Move a sentence back

    ) :Move a sentence forward

    { : Move a paragraph back

    } : Move a paragraph forward

    0 : Move to the beginning of the line [ 0 and | acts as a Home key it goes to beginning of a line ]

    $ : Move to the end of the line, acts as a End key

    :1 : Move to the first line of the file

    G : Move to the last line of the file

    nG : Move to nth line of the file

    :n : Move to nth line of the file

    fc :Move forward to c (c= character)

    Fc : Move back to c

    H :Move to top of screen

    M :Move to middle of screen

    L : Move to bottom of screen

## Inserting Text

    i : Insert before cursor

    I : Insert before line

    a : Append after cursor

    A : Append after line

    o : Open a new line after current line

    O : Open a new line before current line

    r : Replace one character

## Delete/Cut and Paste

    d^ : Deletes from current cursor position to the beginning of the line.

    d$ : Deletes from current cursor position to the end of the line.

    dw : Deletes from current cursor position to the end of the word.

    dd : Deletes three lines from current cursor position downwards.(also :d)

    yy : Yank the current line (also :y)

    x : Delete a character next to the cursor

    X : Delete character to the left of cursor

    P : Paste line before the cursor

    p : Paste line after the cursor

    . : Repeat last edit command

    u : Undo last edit (Ctrl+r redo)

    U : Undo changes to current line

    J : Join two lines

In Escape mode: C is delete the line from under the cursor to end of the line.


## External commands

In Vim it's easy to include the output of external commands in to file.

    !command, the output will be shown in prompt.

To insert the output of the external command in the current file
    type :r!command for example

Code:

     :r!date

## Completion

    In insert mode.

    Ctrl+p word completion .

    Ctrl+x Ctrl+l whole line completion.

    Ctrl+x Ctrl+k to do a dictionary lookup for the already typed characters.

    Ctrl+x Ctrl+f to print the filename is vim.

## Search/Replace

    /pattern : search for pattern

    ?pattern : search backward for pattern

    n :repeat search in same direction

    N : repeat search in opposite direction

    :%s/old/new/g : replace all old with new throughout file

    :%s/old/new/gc : replace all old with new throughout file with confirmations

We can change the substitution delimiter instead of "/" to % or # or @ or !.

[Refer the Following Link.](http://www.unix.com/unix-dummies-questions-answers/131585-changing-vi.html)

    
    :/pattern/= => Print the line number of the first line that matches pattern.

    :g/pattern => Finds (moves to) the last occurrence of pattern in the file.

    :g/pattern/p => Finds and displays all lines in the file containing pattern.

    :g!/pattern/nu => Finds and displays all lines in the file that don't contain pattern;
    also displays the line number for each line found.

    :60,124g/pattern/p => Finds and displays any lines between lines 60 and 124 containing pattern
    
## Inverting Case
    ~ :changes the lower case to upper case of current character

    ~guu :change current line from upper to lower.

    ~gUU :Change current LINE from lower to upper.

    ~guw :Change current WORD from upper to lower.

    ~gUw :Change current WORD from lower to upper.

    g~~ :Invert case to entire line

    :lineno goes to line in execution mode

    :.= gives current cursor position of line

    := total no of lines in file

    Ctrl+h acts as a backspace in insert mode

    shift + 9 goes to sentence starting point in backward

    shift + 0 goes to sentence starting point in forward

    :e is used for editing another file with out quiting the vim editor cltrl+^ is used to toggle between the two files.

    :syn on command in vimrc file will highlight the syntax during inserting the contents in program.

Opening Man page from VIM

    K (Shift+k) will diplays the man page of current word under the cursor


## Splitting Windows
    :sp will split the window

    :q to quit from current split window

    Crtl+ww navigate through another file

    :bnext (or :bn) go to next buffer

    :bprev (or :bp) go to previous buffer

    :bd delete a buffer (close a file)

    Ctrl+ws Split windows

    Ctrl+ww Switch between windows

    Ctrl+wq Quit a window

    Ctrl+wv Split windows vertically.

## Set Options

    :set showmode - will show the current mode

    :set autowrite - will write into file when we are toggling between two files with in editor. :set autoindent - it is used for intendation the code.

    Displaying Line Numbers

    From Command Mode

    :set nu [OR] :set number Display line numbers It will not save in file after closing the file.

    :set nonu [OR] :set nonumber Hide line numbers

    :set nomagic - will special character meaning, like * as some meaning when searching

    :set tabstop - will set the spaces of tab key default it will 8 spaces

    :set showmatch - will show the match of that brace default it will be setted.

    :set spell will set the spell checking and high light wrong spell words.


## Folding

    If we want to folding some few lines in vim file:

    First select the lines after type :fold

    The selected line is folded.

    If we want to open the folded lines use "zo".

    If we want to close the folding lines use zc".

    zR Unfold all folded lines in file.

    za Open/close (toggle) a folded group of lines.

    zA Open a closed fold or close an open fold recursively.

    zc Close a folded group of lines.

    zC Close all folded lines recursively.

    zd Delete a folded line.

    zD Delete all folded lines recursively.

    zE Eliminate all folded lines in file.

    zF Create "N" folded lines.


## Recording

    Insert mode type 1.
    Escape mode.
    q a press q buffer name
    copy and paste.
    Ctrl+a increments the number in current cursor
    Ctrl+x decrements the number in current cursor
    q to quit from recording
    to execute the recording buffer:
    10 @ buffername(a)

    --------------------------------------------------------------------
    Ctrl + a => increase a number under the cursor.
    Ctrl + x => decrease a number under the cursor.
    -------------------------------------------------------------------

## Mapping a key

    In vim editor we can map the key for our requirement for that we use map command

    Syntax: :map keyname work
    Eg: :map <F2> :w - will save the file when F2 key pressed in command mode.

    The key can be unmapped by unmap command
    Syntax: :unmap

    This mapping key is useful for compiling and executing a program


## Abbreviation

    Abbreviation is used in this vim editor
    Syntax: :ab abbreviatedword explanation
    Eg: :ab w work

    Ctrl+f forward scroll screen

    Ctrl+b backward scroll screen

    Ctrl-d Scroll down one half of a page

    Ctrl-u Scroll up one half of a page

    . will execute the last command in execution mode

    In split window N goes backward to navigate

    ^w+ resizing the current split window to larging

    ^w- To decreasing the size of current split window

    p put after current cursor

    P put before the current cursor

    In Insert mode Ctrl+w is used to cut the current word.

    we can open multiple file at same time by passing all filename in vim command in single line.
    :next is used to go to next file.

    J concatenates the line by deleting the end of line

    :set aw this command ensures that file saved automatically before switching.

    : on removes all other windows in split window and current window will become the full screen.

    Buffer can be used in this file to create buffer "buffername commands output
    command is stored in buffername.
    Eg: "a3yy - copy the 3 lines and stored in a buffer

    We can replace the particular word in particular range of line
    Syntax: %10s/new/old/g - global

    : pwd Print the current directory name.

    p and P differs on entire line and part of line deleted or yanked.

    P places it left when word is deleted or cutted or yanked.

    p places it right when word is deleted or cutted or yanked.

    P places it above when entire line is deleted or yanked.

    p places it below when entire line is deleted or yanked.



## In Insert Mode

    ^t give tab in beggining of a line

    ^y copies above character and paste

    ^u undo the operation

    ^i gives tab in current position

    ^o goes to command mode and accept only one command and return back to insert mode

    ^a place the buffer which has inserted text after opening the file.

    ^j and ^m acts as a enter key

    ^k insert before the current position

    ^c goes to command mode

    In execution shift>> acts as tab instead of tab character

    B,W,E navigate between words but they ignore punctuations.

    :.!tr '[a-z]' '[A-Z]' - will convert case lower to upper in current line

    :map r :w^V^M will save the file when press r in command mode

    ^M is set to be enter key in mapping

## Visual mode

    Shift+v is to select a line
    
    Ctrl+v is to select a block of text.

    gv is used to reselect the last selection part in visual mode.

    If you select some lines in visual mode using Ctrl+v or Shift+v.
    later you want to select last selection in lines use gv.

    % keystroke

            The % is used to match the item under the cursor. The item under the cursor
    can be a parenthesis, a curly bracket or a square bracket. By pressing the % key the
    cursor will jump to the corresponding match.


    You can open your .vimrc file in your vim file itself. See the following example

    Code:

    :e ~/.vimrc


    [or]

    Code:

    :e $MYVIMRC


## Other

    single quot dot ('.) is go to the last modification line in a file.

    (`") back tick and double quote is goes to the last modification character.

    :history - list the .viminfo informations ( recent commands executed in vim.)

    q: - it will open a list on executed commands in separate window


## Vim Command Line options

    vim + file_name

    + it will place the cursor at end of the after opening.

    +n it will place the cursor at nth line of the file.

    Ex: vim +3 fine_name it place the cursor at 3rd line of the file.

    vim +/pattern filename

    +/pattern ( vim +/hi filename). the cursor is first occurrence of the pattern line

    +n/pattern ( vim +3/hi filename) cursor is nth occurrence of the line.

    if you want to search a pattern like "Welcome to vim", see the following examples.

    quote the string.

    Code:

    vim +/"to vim" filename escape the space.

    Code:

    vim +/to\ vim a

    -R Option is used to open a file in read only mode(you can't edit that file.

    :e! returns you to the last saved version of the file, so you can start over.

    yl is used to copy a single character.

    ^ Move to first non-blank character of current line.

    n| Move to column n of current line.

## Current Line Searches

    fx Find (move cursor to) next occurrence of x in the line, where x stands for any character.
    Fx Find (move cursor to) previous occurrence of x in the line.

    tx Find (move cursor to) character before next occurrence of x in the line.

    Tx Find (move cursor to) character after previous occurrence of x in the line.

    ; Repeat previous find command in same direction.

    , Repeat previous find command in opposite direction.