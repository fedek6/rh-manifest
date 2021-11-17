# How to add an existing directory to a repository?

__Warning!__ Remember that repository must be empty before pushing.

```bash
cd project-diretory
git init
git add .
git commit -m "initial commit"
git remote add origin git@github.com:Retrolove-Games/score-api.git
git push -f origin master
```

## Github

We don't use `master` branches anymore so use this for Github:

```bash
git init
git add .
git commit -m "Create initial template"
git remote add origin git@github.com:OKO-press/react-demo-template.git
git branch -M main
git push -u origin main
```