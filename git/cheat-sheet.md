# Cheat sheet

## Branches

`git branch` – list branches
`git btanch -r` – list remote branches 
`git branch [branch]` – create a new branch 
`git checkout [branch]`
`git merge [branch]`
`git push --set-upstream [branch]` – push branch to remote
`git branch -d [branch]` – delete local branch
`git push origin --delete [branch]` – delete remote branch

## Commit

`git diff --name-only` – list changed files
`git add .` – stage all changed files
`git commit -m [msg]` – commit
`git push`
`git checkout -- [.|file]` – discard changes  
`git status --short` – a list of potential changes.

## Submodules

`git submodule add git@github.com:[git path] [local path]` – add

`git submodule update --remote` - update to the newest commit.

**Note**: you can use specific branch for submodules this way:

```
[submodule "app/dist/wp-content/plugins/headless-cms-plugin"]
	path = app/dist/wp-content/plugins/headless-cms-plugin
	url = git@github.com:Memocracy/headless-cms-plugin.git
  branch = develop
```