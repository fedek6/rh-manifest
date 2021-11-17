# Strict types

It's always a good practice to be as strict as possible. In Realhe.ro projects I always use strict types declarations.

This must be set in all files:

```php
declare(strict_types=1);

function bar(int $foo): string
{
    return $foo;
}

bar(123);
```