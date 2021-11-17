# Git flow

`git-flow` are a set of git extensions to provide high-level repository operations for Vincent Driessen's branching model.

Git-flow is a merge based solution. It doesn't rebase feature branches.

## What is Rebase?

Rebasing is the process of moving or combining a sequence of commits to a new base commit. Rebasing is most useful and easily visualized in the context of a feature branching workflow.

## How to use?

You need to install it. You can use [this cheat sheet](https://danielkummer.github.io/git-flow-cheatsheet/index.html#setup).

### Init

1. Go to git repository directory and run `git flow init`.
2. Choose defaults.

## Features

### Start a feature

```bash
git flow feature start MYFEATURE
``` 

This action creates a new feature branch based on 'develop' and switches to it.

### Finish a feature

```bash
git flow feature finish MYFEATURE
```

* Merges `MYFEATURE` into 'develop'.
* Removes the feature branch.
* Switches back to 'develop' branch.

### Publish a feature

```bash
git flow feature publish MYFEATURE
```

Publish a feature to the remote server, so it can be used by other users.

### Get a feature published by another user

```bash
git flow feature pull origin MYFEATURE
```

Or track a feature on origin:

```bash
git flow feature track MYFEATURE
```

## Releases

To start a release, use the git flow release command. It creates a release branch created from the 'develop' branch.

```bash
git flow release start RELEASE [BASE]
```

`BASE` is an optional sha-1 commit hash to start release from.

### Publish release

It's wise to publish the release branch after creating it to allow release commits by other developers.

```bash
git flow release publish RELEASE
```

Follow release:

```bash
git flow release track RELEASE
```

### Finish release

* Merges the release branch back into 'master'.
* Tags the release with its name.
* Back-merges the release into 'develop'.
* Removes the release branch.

```bash
git flow release finish RELEASE
```

Also push your tags:

```bash
git push origin --tags
```

## Hotfixes

Hotfixes are for quick repairs on live version. They may be branched off from the corresponding tag on the master.

### Create hotfix

```bash
git flow hotfix start VERSION [BASENAME]
```

The version argument hereby marks the new hotfix release name. Optionally you can specify a base name to start from.

### Finish a hotfix

By finishing a hotfix it gets merged back into develop and master. Additionally, the master merge is tagged with the hotfix version.

```bash
git flow hotfix finish VERSION
```