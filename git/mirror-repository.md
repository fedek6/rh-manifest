# Mirror one repository to the other one

```bash
git clone --bare https://github.com/exampleuser/old-repository.git
cd old-repository
git push --mirror https://github.com/exampleuser/new-repository.git
cd ..
rm -rf old-repository
```