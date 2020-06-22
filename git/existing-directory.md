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