# Basics

## Basic routing

Using closure: 

```php
use Illuminate\Support\Facades\Route;
 
Route::get('/greeting', function () {
    return 'Hello World';
});
```

## Default route files

`web` and `api`.

> Api is prefixed automatically with `/api`! You can modify this prefix by editing `RouteServiceProvider`.

```php
// app/Providers/RouteServiceProvider.php
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));
```

## Verbs

```php
Route::get($uri, $callback);
Route::post($uri, $callback);
Route::put($uri, $callback);
Route::patch($uri, $callback);
Route::delete($uri, $callback);
Route::options($uri, $callback);

Route::match(['get', 'post'], '/', function () {
    //
});
 
Route::any('/', function () {
    //
});
```

## Dependency injection

```php
use Illuminate\Http\Request;
 
Route::get('/users', function (Request $request) {
    // ...
});
```

## CSRF protection

Using `Blade` directive:

```php
<form method="POST" action="/profile">
    @csrf
    ...
</form>
```

## Redirect routes

```php
Route::redirect('/here', '/there', 301);
```

## View only routes

```php
Route::view("/view", "test-view", ["foo" => "bar"]);
```

## List routes using artisan

```
php artisan route:list
php artisan route:list -v
php artisan route:list --except-vendor
php artisan route:list --only-vendor
```

## Route parameters

Required:

```php
// Params
Route::get('/view/{foo}', function ($foo) {
    return view("test-view", ["foo" => $foo]);
});
```

Mixed params:

```php
Route::get('/view/{foo}/second/{bar}', function ($foo, $bar) {
    return view("test-view", ["foo" => $foo, "bar" => $bar]);
});
```

## Parameters & dependency injection

```php
use Illuminate\Http\Request;
 
Route::get('/user/{id}', function (Request $request, $id) {
    return 'User '.$id . ' ' . $request->fullUrl();
});
```

## Optional parameters

```php
Route::get('/user/{name?}', function ($name = null) {
    return $name;
});
```

## Regular expressions

```php
Route::get('/user/{id}', function ($id) {
    //
})->where('id', '[0-9]+');
```

With helpers:

```php
Route::get('/user/{id}/{name}', function ($id, $name) {
    //
})->whereNumber('id')->whereAlpha('name');
 
Route::get('/user/{name}', function ($name) {
    //
})->whereAlphaNumeric('name');
 
Route::get('/user/{id}', function ($id) {
    //
})->whereUuid('id');
 
Route::get('/category/{category}', function ($category) {
    //
})->whereIn('category', ['movie', 'song', 'painting']);
```

## Global constraints

```php
/**
 * Define your route model bindings, pattern filters, etc.
 *
 * @return void
 */
public function boot()
{
    Route::pattern('id', '[0-9]+');
}
```

## Naming routes

```php
Route::get('/user/profile', function () {
    //
})->name('profile');

Route::get(
    '/user/profile',
    [UserProfileController::class, 'show']
)->name('profile');
```

### Generating urls for named routes

```php
Route::get('/user/{id}/profile', function ($id) {
    //
})->name('profile');
 
$url = route('profile', ['id' => 1, 'photos' => 'yes']);
 
// /user/1/profile?photos=yes
```

## Route groups

You may share route attributes such as middleware across routes:

```php
Route::middleware(['first', 'second'])->group(function () {
    Route::get('/', function () {
        // Uses first & second middleware...
    });
 
    Route::get('/user/profile', function () {
        // Uses first & second middleware...
    });
});
```

## Multiple routes for one controller

```php
use App\Http\Controllers\OrderController;
 
Route::controller(OrderController::class)->group(function () {
    Route::get('/orders/{id}', 'show');
    Route::post('/orders', 'store');
});

// With prefix
Route::controller(HelloWorld::class)->prefix("hello")->group(function () {
    Route::get('/foo', 'foo');
    Route::get('/bar', 'bar');
});
```

## Subdomain routing

> This is freaking cool!

```php
Route::domain('{account}.example.com')->group(function () {
    Route::get('user/{id}', function ($account, $id) {
        //
    });
});
```

## Route prefixes

```php
Route::prefix('admin')->group(function () {
    Route::get('/users', function () {
        // Matches The "/admin/users" URL
    });
});
```

## Name prefixes

You can combine names:

```php
Route::name('admin.')->group(function () {
    Route::get('/users', function () {
        // Route assigned name "admin.users"...
    })->name('users');
});
```

## Automatic model binding

This will automatically find model by ID and pass it to a function:

```php
use App\Models\User;
 
Route::get('/users/{user}', function (User $user) {
    return $user->email;
});
```

And controller version:

```php
use App\Http\Controllers\UserController;
use App\Models\User;
 
// Route definition...
Route::get('/users/{user}', [UserController::class, 'show']);
 
// Controller method definition...
public function show(User $user)
{
    return view('user.profile', ['user' => $user]);
}
```

## With soft deleted models

```php
use App\Models\User;
 
Route::get('/users/{user}', function (User $user) {
    return $user->email;
})->withTrashed();
```

## Customizing key

```php
use App\Models\Post;
 
Route::get('/posts/{post:slug}', function (Post $post) {
    return $post;
});
```

Or in `Eloquent` model:

```php
/**
 * Get the route key for the model.
 *
 * @return string
 */
public function getRouteKeyName()
{
    return 'slug';
}
```

## Scoping models

You can return only model owned by a specific user:

```php
use App\Models\Post;
use App\Models\User;
 
Route::get('/users/{user}/posts/{post:slug}', function (User $user, Post $post) {
    return $post;
});
```

> `User` must have relationship named `posts`.

The same without custom key:

```php
use App\Models\Post;
use App\Models\User;
 
Route::get('/users/{user}/posts/{post}', function (User $user, Post $post) {
    return $post;
})->scopeBindings();
```

Or entire group:

```php
Route::scopeBindings()->group(function () {
    Route::get('/users/{user}/posts/{post}', function (User $user, Post $post) {
        return $post;
    });
});
```

## Customizing 404 on implicit model

```php
use App\Http\Controllers\LocationsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
 
Route::get('/locations/{location:slug}', [LocationsController::class, 'show'])
        ->name('locations.view')
        ->missing(function (Request $request) {
            return Redirect::route('locations.index');
        });
```

## Implicit ENUM binding

> Since PHP 8.1 allows enums.

```php
<?php
 
namespace App\Enums;
 
enum Category: string
{
    case Fruits = 'fruits';
    case People = 'people';
}
```

And usage:

```php
use App\Enums\Category;
use Illuminate\Support\Facades\Route;
 
Route::get('/categories/{category}', function (Category $category) {
    return $category->value;
});
```

## Explicit binding

You can set it up in `RouteServiceProvider`:

```php
use App\Models\User;
use Illuminate\Support\Facades\Route;
 
/**
 * Define your route model bindings, pattern filters, etc.
 *
 * @return void
 */
public function boot()
{
    Route::model('user', User::class);
 
    // ...
}
```

```php
use App\Models\User;
 
Route::get('/users/{user}', function (User $user) {
    //
});
```


### Custom resolution logic

Edit `RouteServiceProvider`:

```php
use App\Models\User;
use Illuminate\Support\Facades\Route;
 
/**
 * Define your route model bindings, pattern filters, etc.
 *
 * @return void
 */
public function boot()
{
    Route::bind('user', function ($value) {
        return User::where('name', $value)->firstOrFail();
    });
 
    // ...
}
```


Or in model:

```php
/**
 * Retrieve the model for a bound value.
 *
 * @param  mixed  $value
 * @param  string|null  $field
 * @return \Illuminate\Database\Eloquent\Model|null
 */
public function resolveRouteBinding($value, $field = null)
{
    return $this->where('name', $value)->firstOrFail();
}
```

### Fallback routes

You can serve whatever when nothing found:

```php
Route::fallback(function () {
    //
});
```

## Rate limiting

https://laravel.com/docs/9.x/routing#rate-limiting