# Artisan cheatsheet

# Run local server

```bash
artisan serve
```

# Create a model

This will create _app/Models/SimpleScore.php_ with proper namespace:

```bash
/artisan make:model Models/SimpleScore
```

## Migrations

### Create

```bash
artisan make:migration create_projects_table
```

Your migration can be found here _database/migrations/2020_06_24_184517_create_projects_table.php_.

### Run

```bash
artisan migrate
```

__Warning!__ In case of an error _1071 Specified key was too long; max key length is 767 bytes_ please edit _app/Providers/AppServiceProvider.php_ like this:

```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
    }
}
```