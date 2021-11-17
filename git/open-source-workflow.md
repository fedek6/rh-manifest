# Open source workflow

```
Branching means you diverge from the main line of development and continue to do work without messing with that main line.
```

In short, branches isolate the code you are currently working from the code your teammates are working. It's kinda a “parallel universe”, or timeline.

## Create new branch

```bash
git checkout -b my_new_branch
```

Create some commit and push to new branch:

```bash
git push origin my_new_branch
```

__Notice__: You can push local branch to other remote one:

```
git push origin my_new_branch:my_branch_on_remote
```

### Switch back to master

Simply, remove `-b` switch:

```
git checkout master
```

You can have more than one person working on the same branch as you, but that's not recommended. With one person per branch everyone can make their mess without worrying about disturbing someone else's work.

## Pull requests

_Pull requests let you tell others about changes you’ve pushed to a repository on GitHub. Once a pull request is sent, interested parties can review the set of changes, discuss potential modifications, and even push follow-up commits if necessary._

It's basically a way to allow your teammates to review the code of your branch on the web interface of your repo.

__Remember to review your own pull request before asking for reviews of your teammates!__

## Refactoring / Fixing Stuff

Git is such a wonderful tool and has this killer command that allows us to change previously established commits: git interactive rebase.

So we need to merge the first commit (f7f3f6d with the last one a412dbb). And that's when the interactive rebase tools comes in hand.

```
git rebase -i origin/master
```

No we can:

* Reorder of commits.
* Turn them into `fixup`.

After that you need to push your changes with `-f` switch:

```
git push -f origin some_branch
```

__Warning__: pushing with -f is a very dangerous thing. Proceed with caution and always be sure that you're pushing to the right branch.

_Remember: NEVER rewrite the commit history of public branches (like master). This will truly mess your teammates work._