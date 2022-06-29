# Architecture concepts

## Lifecycle

1. `public/index.php`
2. `HTTP or Console kernel` - run bootstrapping before request is executed (error handling, environment etc). In this step also middlewares are being executed.
3. `Service providers` - components such as databases (configurable via `config/app.php`). This is the most important aspect of the entire bootstrap process!
4. `Routing` - load routes. Middleware can control authorization before dispatching to a controller.

## Service container

Class dependencies are injected into class via constructor (or setter methods).

```php
namespace App\Http\Controllers;

...
use App\Repositories\UserRepository;
use App\Models\User;

class UserController extends Controller 
{
    public function __construct(UserRepository $users) 
    {
        $this->users = $users;
    }
}
```

> Since repository is injected, it can be easily replaced with mock service. 

## Zero configuration resolution example

```php
class Service
{

}

Route::get('/', function (Service $service) {
    die(get_class($service));
});
```

## When to use container

This is an easy way to access request:

```php
use Illuminate\Http\Request;
 
Route::get('/', function (Request $request) {
    // ...
});
```

But if you want to use class with interface or write shared package you'll need to bind your services to a container.

> This is quite complicated, further research might be needed https://laravel.com/docs/9.x/container

https://laravel.com/docs/9.x/providers

## Service providers

Central place of Laravel bootstrapping. 

> Bootstraping means registering middleware, routes, service container binding, event listeners etc.

> Check `config/app.php` for a list of providers.

> Some providers are deferred, so they aren't loaded every time. 

### Writing custom service providers

```bash
./vendor/bin/sail artisan make:provider HelloWorldProvider
```

In a `register` method you should bind into `service container`. You should not register any event listeners or routes.

#### Register method

Silly example:

```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;
use App\Custom\HelloWorld;

class HelloWorldProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(HelloWorld::class, function ($app) {
            return new HelloWorld();
        });
    }
}
```

And in controller:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


class HelloWorld extends Controller
{
    public function hello(\App\Custom\HelloWorld $provider)
    {
        return $provider->hello();
    }
}
```

> Laravel will automatically now which instance should be used!

More information can be found [here](https://laravel.com/docs/9.x/providers#the-register-method).

#### Boot method

This method can be used to extend framework:

```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;

class HelloWorldProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        Blade::directive('helloworld', function () {
            return "<?php echo 'Hello World!'; ?>";
        });
    }
}
```

> This will add `@helloworld` directive to blade.

It might be also used for composing views (adding variables to views without passing them every time).

```php
    public function boot()
    {s
        View::composer('test', function (\Illuminate\View\View $view) {
            $view->with("test", "Kapitan Żbik!");
        });
    }
```

```blade
{{ $test }}
```

Outputs `Kapitan Żbik!`.

More info [here](https://laravel.com/docs/9.x/providers#the-boot-method).

## Facades

https://laravel.com/docs/9.x/facades