# Opcache preloading

This feature requires PHP >= 7.4. 

__Warning!__ Always remember to restart FPM after any code changes that affects preload blob.

## Configuration

Remember to put configuration vars to your _php.ini_ file:

```ini
; Preload
opcache.preload = /home/developer/htdocs/oko-docs/optymalizacja/opcache-preload.php
opcache.preload_user = www-data
```

And after you've finished server configuration restart FPM:

```bash
sudo systemctl restart php7.4-fpm.service
```

## Loader

An example loader for WP:

```php
/**
 * WordPress opcache preloading.
 * Requires PHP >= 7.4.
 * 
 * @link https://stitcher.io/blog/preloading-in-php-74
 * 
 * @version 1.0.0
 */

/**
 * Uwaga! Adjust your path.
 */
define('APP_PATH', '/home/developer/htdocs/oko/');
 
$preload_patterns = [
    // WP native files (priority).
    'wp-load.php',
    'wp-includes/http.php',
    'wp-includes/class-http.php',
    'wp-includes/general-template.php',
    'wp-includes/link-template.php',
    'wp-includes/class-wp-http-response.php',
    'wp-includes/class-wp-http-requests-hooks.php',
    'wp-includes/class-wp-http-proxy.php',
    'wp-includes/class-wp-http-requests-response.php',
    'wp-includes/class-wp-http-cookie.php',
    'wp-includes/class-wp-query.php',
    'wp-includes/class-wp-tax-query.php',
    'wp-includes/class-wp-user.php',
    'wp-includes/class-wp-post.php',
    'wp-includes/class-wp-roles.php',
    'wp-includes/class-wp-role.php',

    'wp-includes/taxonomy.php',
    'wp-includes/post.php',
    'wp-includes/user.php',
    'wp-includes/pluggable.php',
    'wp-includes/rest-api.php',
    'wp-includes/kses.php',
    'wp-includes/capabilities.php',
    'wp-includes/comment.php',
    'wp-includes/query.php',
    'wp-includes/l10n.php',
    'wp-includes/shortcodes.php',
    'wp-includes/theme.php',
    'wp-includes/post-template.php',
    'wp-includes/post-thumbnail-template.php',
    'wp-includes/media.php',
    'wp-includes/date.php',
    'wp-includes/author-template.php',

    // Rest WP files.
    "wp-includes/**/*.php",
    "wp-includes/**/**/*.php",
    "wp-includes/**/**/**/*.php",
    "wp-includes/**/**/**/**/*.php",
];

foreach ($preload_patterns as $pattern) {
    $files = glob(APP_PATH . $pattern);

    foreach ($files as $file) {
        opcache_compile_file($file);
    }
}
```

## Check stats

```php
echo '<pre>' . var_export(opcache_get_status(), true) . '</pre>';
```

## Benchmarking

You will need _apache2-utils_.

```bash
sudo apt-get install apache2-utils
```

```bash
ab -t 10 -n 10000 -c 100 http://oko.local/
```

* -n (number): used to specify the number of requests ab should send to apache
* -t (timeout): used to specify (in seconds) how long ab should continue sending requests
* -c (concurrent): used to specify the number of simultaneous requests for ab to make