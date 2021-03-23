# Continuous integration

## Travis

Check docs [here](https://docs.travis-ci.com/user/for-beginners/).

### Example config for PHP (Unit)

```yaml
language: php
php:
  - 7.4
  - 8.0

before_script:
  - travis_retry composer self-update
  - travis_retry composer install --no-interaction --prefer-source --dev

script:
  - vendor/bin/phpunit --coverage-clover coverage.xml tests
```
