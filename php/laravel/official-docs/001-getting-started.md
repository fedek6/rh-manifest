# Getting started

## Installation 

```
curl -s https://laravel.build/[app name] | bash
curl -s "https://laravel.build/[app name]?with=mysql,redis" | bash

./vendor/bin/sail up
```

Services: mysql, pgsql, mariadb, redis, memcached, meilisearch, minio, selenium, and mailhog.

> My stack: `curl -s "https://laravel.build/[app name]?with=mariadb,redis,meilisearch,mailhog,selenium" | bash`

## Configuration

Configs are in `config` dir and `.env` files.

> Laravel checks for `APP_ENV` environment variable to check which config load. It uses format: `.env.[APP_ENV]`.

## Checking environment

```php
App::environment(); // "local"
App::environment("local"); // true
```

### Getting config variables

```blade
{{ Config::get('app.name') }}
```

```php
config("app.timezone", "Asia/Seoul");
```

> You can set config vars in runtime: `config(["app.timezone" => "America/Chicago"])`


## Maintenance mode

```bash
artisan down --retry=60
artisan down --secret="secret" 
```

> When using secret you can access your website using: `localhost/secret`. Cookie will be set to access disabled app.

> For better deployment experience use Vapor or Envoyer.

## Directory structure

* `app` core code of app.
* `bootstrap` cache & bootstrap file (do not modify any of that).
* `config`
* `databases` migrations, model factories and seeds.
* `lang`
* `public` entry (index.php) & assets.
* `resources` views & uncompiled assets.
* `routes`
    * web
    * api (stateless)
    * console
    * channels event broadcasting
* `storage` compiled files & logs (you should create `public/storage` symlink).
* `tests` (`php artisan test`)

### App directory

* `Console` artisan commands
* `Http` controllers, middleware & requests
* `Jobs`
* `Broadcasting`
* `Events`
* `Exceptions`
* `Listeners` classes to handle events (for eg. send email to registered user)
* `Mail` classes for mail sending
* `Models` Eloquent models
* `Notifications` 
* `Policies` information if user can perform action
* `Providers` classes to bootstrap application.
* `Rules` Validation rules.

## Starters

* `Breeze` minimal simple authentication, registration, password reset, email verification etc.
* `Jetstream` more complicated stack for authorized application.