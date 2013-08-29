In vim:
    
    switch out: ctrl + z
    switch in:  fg

Git Logs:

    git log --oneline --graph --all --decorate -10

Git Config:

    git config --global user.name
    git config --global user.name "My Name is FOO"

    git config --global user.email
    git config --global user.email "myemail@gogogo.com"

    # To deal with line endings when working with Mac & Windows
    git config --global core.autocrlf input (on a mac)
    git config --global core.autocrlf true  (on windows)

Reverting in git:
    
    git commit --amend (only use this for private repos or before pushing since it re-writes history)
        Super useful to fix commit message typo and what not
        Also useful to add a file to a previous commit
        If you want to REMOVE a file use $ git reset HEAD~1

    git reset (--soft, --mixed, --hard) (only use this for private repos or before pushing since it re-write history)
        git reset -- soft   (kill the commit)
        git reset -- mixed  (kill the commit + staging) (this is the detault)
        git reset -- hard   (kill the commit + staging + working directory)
        $ git reset HEAD~1 (takes you one step back)

    git revert (this is good for public history (it still sucks, but whatever))

Git settings:

    --system  (On a server, use it at a system level to set things such as line spacing, etc.)
    --global  (These are the settings for ALL repos under your user account in this machine)
    --local   (This is the settings for a specific, local, repo)

Other commands:
    
    git reflog
    git show b97d5ee
    git rev-parse HEAD
    git rev-parse master

Using reflog to recuperate some work:
    
    $ git reflog 
      # 73b41bc HEAD@{0}: reset: moving to HEAD~1
      # a0ec5a6 HEAD@{1}: commit (amend): Add checkout page to the website
    $ git checkout -b new_branch a0ec5a6
    $ git checkout master
    $ git merge new_branch
    $ git branch -d new_branch

Branching

    git checkout -b branch_name

    # Merge branches without fast forward
    git merge cart --no-ff

    # Flip between branches
    git checkout -

    # Dealing with merge conflicts
    git checkout --theirs filename

Stash

    git stash
    git stash list
    git stash clear
    git stash pop     (put this in working directory and remove it from stash list)
    git stash apply   (put this in working directory and keep it in stash list)

    # To use it
    git stash pop
        or
    git stash apply
        or
    git stash pop stash@{1} 

Rebasing
    
    git checkout -b new_branch_feature
      # do stuff here on new_branch_feature
      # stuff happens on master
    git rebase master
      # First, rewinding head to replay your work on top of it... (this changes your branch base)
      # Applying: new_branch_feature commit 1
    git checkout master
    git merge new_branch_feature --no-ff

Other
    
    git merge --squash
    python -m SimpleHTTPServer