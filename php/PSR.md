# PSR

At the time of this writing, there are six accepted PSRs: two of them are about autoloading, two of them are related to PHP coding style and the remaining are about interfaces.

## Links

This short guide is based on: 
* [Modern PHP Developer - PSR](https://www.startutorial.com/articles/view/modern-php-developer-psr);
* [PSR-4](https://www.php-fig.org/psr/psr-4/).

## PSR-0 and PSR-4

These two standards are all about autoloading but you should use PSR-4 due to PSR-0 depreciation.

1. The term “class” refers to classes, interfaces, traits, and other similar structures.
2. A fully qualified class name has the following form:
    ```
    \<NamespaceName>(\<SubNamespaceNames>)*\<ClassName>
    ```
3. The fully qualified class name MAY have one or more sub-namespace names.
4. Examples:

| FULLY QUALIFIED CLASS NAME | NAMESPACE PREFIX | BASE DIRECTORY | RESULTING FILE PATH  |
|---|---|---|---|
| \Acme\Log\Writer\File_Writer | Acme\Log\Writer | ./acme-log-writer/lib/ | ./acme-log-writer/lib/File_Writer.php | 
| \Zend\Acl | Zend | /usr/includes/Zend/ | /usr/includes/Zend/Acl.php | 

## PSR-1 and PSR-2

PSR-1 and PSR-2 are for PHP coding standards. PSR-1 focuses on the basics, whereas PSR-2 expands upon PSR-1 and provides a more comprehensive coding style guide.

### Overview:

* Files MUST use only <?php and <?= tags.
* Files MUST use only UTF-8 without BOM for PHP code.
* Files SHOULD either declare symbols (classes, functions, constants, etc.) or cause side effects(e.g. generate output, change .ini settings, etc.) but SHOULD NOT do both.
* Namespaces ad classes MUST follow PSR-0.
* Class names MUST be declared in StydlyCaps.
* Class constants MUST be declared in all upper case with underscore separators.
* Method names MUST be declared in camelCase.
* Properties MAY use one of this methodologies (you must be consistient across your project):
    * $StudlyCaps, 
    * $camelCase,
    * $under_score.

__INFO:__ In all Realhe.ro projects I use _$camelCase_ for all properties. 

### Examples

```php
<?php
namespace Vendor\Model;

class Foo
{
    const VERSION = '1.0';
    const DATE_APPROVED = '2012-06-01';

    protected $apiEngine;

    public function addRecord() {

    }
}
```

## PSR-3 and PSR-7

These standards are associated with the code itself. 

### PSR-3 is all about logging

This iteration of PSR contains information about _LoggerInterface_ that should be implemented in all classes.

Full specifications can be found here [PSR-3](https://www.php-fig.org/psr/psr-3/).

You can use a standardized logger package. You can find it here [psr/log](https://packagist.org/packages/psr/log). 

```php
class User
{
    private $logger;
 
    public function __construct($logger)
    {
        $this->logger = $logger;
    }
 
    public function login($username, $password)
    {
        if ($this->validUsernameAndPassword($username, $password)) {
            $this->logger->addMessage('login');
        }
    }
 
    private function validUsernameAndPassword($username, $password)
    {
        // ... ...
    }
}
```

### PSR-7 is all about HTTP messages

This one's lengthy so go to [PSR-7 docs](https://www.php-fig.org/psr/psr-7/).

## Naming conventions in PSR

* Interfaces MUST be suffixed by Interface: e.g. Psr\Foo\BarInterface.
* Abstract classes MUST be prefixed by Abstract: e.g. Psr\Foo\AbstractBar.
* Traits MUST be suffixed by Trait: e.g. Psr\Foo\BarTrait.
