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

### PSR-12 determines extended code styling

This specification extends, expands and replaces PSR-2, the coding style guide and requires adherence to PSR-1, the basic coding standard.

Check documentation at [PSR-12 docs](https://www.php-fig.org/psr/psr-12/).

### In a nutshell

This example encompasses rules determined in a PSR-12 standard:

```php
<?php

declare(strict_types=1);

namespace Vendor\Package;

use Vendor\Package\{ClassA as A, ClassB, ClassC as C};
use Vendor\Package\SomeNamespace\ClassD as D;

use function Vendor\Package\{functionA, functionB, functionC};

use const Vendor\Package\{ConstantA, ConstantB, ConstantC};

class Foo extends Bar implements FooInterface
{
    public function sampleFunction(int $a, int $b = null): array
    {
        if ($a === $b) {
            bar();
        } elseif ($a > $b) {
            $foo->bar($arg1);
        } else {
            BazClass::bar($arg2, $arg3);
        }
    }

    final public static function bar()
    {
        // method body
    }
}
```

* All PHP files MUST use the Unix LF (linefeed) line ending only.
* All PHP files MUST end with a non-blank line, terminated with a single LF.
* The closing ?> tag MUST be omitted from files containing only PHP.

* There MUST NOT be a hard limit on line length.
* The soft limit on line length MUST be 120 characters.
* Lines SHOULD NOT be longer than 80 characters; lines longer than that SHOULD be split into multiple subsequent lines of no more than 80 characters each.

* There MUST NOT be trailing whitespace at the end of lines.
* Blank lines MAY be added to improve readability and to indicate related blocks of code except where explicitly forbidden.
* There MUST NOT be more than one statement per line.
* Code MUST use an indent of 4 spaces for each indent level, and MUST NOT use tabs for indenting.

* All PHP reserved keywords and types [1][2] MUST be in lower case.
* Any new types and keywords added to future PHP versions MUST be in lower case.
* Short form of type keywords MUST be used i.e. bool instead of boolean, int instead of integer etc.

That means:

```php
(int) - cast to integer
(bool) - cast to boolean
(float), (double), (real) - cast to float
(string) - cast to string
(array) - cast to array
(object) - cast to object
(unset) - cast to NULL
```

* When the opening <?php tag is on the first line of the file, it MUST be on its own line with no other statements unless it is a file containing markup outside of PHP opening and closing tags.
* Import statements MUST never begin with a leading backslash as they must always be fully qualified.

#### Propper PHP file blocks:

```php
<?php

/**
 * This file contains an example of coding styles.
 */

declare(strict_types=1);

namespace Vendor\Package;

use Vendor\Package\{ClassA as A, ClassB, ClassC as C};
use Vendor\Package\SomeNamespace\ClassD as D;
use Vendor\Package\AnotherNamespace\ClassE as E;

use function Vendor\Package\{functionA, functionB, functionC};
use function Another\Vendor\functionD;

use const Vendor\Package\{CONSTANT_A, CONSTANT_B, CONSTANT_C};
use const Another\Vendor\CONSTANT_D;

/**
 * FooBar is an example class.
 */
class FooBar
{
    // ... additional PHP code ...
}

```

#### Compound use block example

You must limit a depth of classes in compound style imports:

```php
<?php

use Vendor\Package\SomeNamespace\{
    SubnamespaceOne\ClassA,
    SubnamespaceOne\ClassB,
    SubnamespaceTwo\ClassY,
    ClassZ,
};
```

#### Declaration of strict types in mixed file

Put it in a first line:

```php
<?php declare(strict_types=1) ?>
<html>
<body>
    <?php
        // ... additional PHP code ...
    ?>
</body>
</html>
```

#### Classes

The term “class” refers to all classes, interfaces, and traits.

Any closing brace MUST NOT be followed by any comment or statement on the same line.

When instantiating a new class, parentheses MUST always be present even when there are no arguments passed to the constructor.

Examples of class declarations:

1-2 implements statement:

```php
<?php

namespace Vendor\Package;

use FooClass;
use BarClass as Bar;
use OtherVendor\OtherPackage\BazClass;

class ClassName extends ParentClass implements \ArrayAccess, \Countable
{
    // constants, properties, methods
}
```

Multiple implements statements:

```php
<?php

namespace Vendor\Package;

use FooClass;
use BarClass as Bar;
use OtherVendor\OtherPackage\BazClass;

class ClassName extends ParentClass implements
    \ArrayAccess,
    \Countable,
    \Serializable
{
    // constants, properties, methods
}
```

Traits usage (put them first after class curly brace):

```php
<?php

namespace Vendor\Package;

use Vendor\Package\FirstTrait;
use Vendor\Package\SecondTrait;
use Vendor\Package\ThirdTrait;

class ClassName
{
    use FirstTrait;
    use SecondTrait;
    use ThirdTrait;
}
```

Insteadof declaration:

```php
<?php

class Talker
{
    use A;
    use B {
        A::smallTalk insteadof B;
    }
    use C {
        B::bigTalk insteadof C;
        C::mediumTalk as FooBar;
    }
}
```

#### Properties and Constants

* Visibility MUST be declared on all properties.
* Visibility MUST be declared on all constants if your project PHP minimum version supports constant visibilities (PHP 7.1 or later).
* There MUST NOT be more than one property declared per statement.
* Property names MUST NOT be prefixed with a single underscore to indicate protected or private visibility. That is, an underscore prefix explicitly has no meaning.
* There MUST be a space between type declaration and property name.

Example: 

```php
<?php

namespace Vendor\Package;

class ClassName
{
    public $foo = null;
    public static int $bar = 0;
}
```

#### Methods and Functions

* Visibility MUST be declared on all methods.
* Method names MUST NOT be prefixed with a single underscore to indicate protected or private visibility. That is, an underscore prefix explicitly has no meaning.
* Method and function names MUST NOT be declared with space after the method name. The opening brace MUST go on its own line, and the closing brace MUST go on the next line following the body. There MUST NOT be a space after the opening parenthesis, and there MUST NOT be a space before the closing parenthesis.

##### Method example: 

```php
<?php

namespace Vendor\Package;

class ClassName
{
    public function fooBarBaz($arg1, &$arg2, $arg3 = [])
    {
        // method body
    }
}
```

##### Function example:

```php
<?php

function fooBarBaz($arg1, &$arg2, $arg3 = [])
{
    // function body
}
```

#### Method and Function Arguments

* In the argument list, there MUST NOT be a space before each comma, and there MUST be one space after each comma.
* Method and function arguments with default values MUST go at the end of the argument list.

Example: 

```php
<?php

namespace Vendor\Package;

class ClassName
{
    public function foo(int $arg1, &$arg2, $arg3 = [])
    {
        // method body
    }
}
```

* Argument lists MAY be split across multiple lines, where each subsequent line is indented once. When doing so, the first item in the list MUST be on the next line, and there MUST be only one argument per line.
* When the argument list is split across multiple lines, the closing parenthesis and opening brace MUST be placed together on their own line with one space between them.

```php
<?php

namespace Vendor\Package;

class ClassName
{
    public function aVeryLongMethodName(
        ClassTypeHint $arg1,
        &$arg2,
        array $arg3 = []
    ) {
        // method body
    }
}
```

* When you have a return type declaration present, there MUST be one space after the colon followed by the type declaration. The colon and declaration MUST be on the same line as the argument list closing parenthesis with no spaces between the two characters.

Example:

```php
<?php

declare(strict_types=1);

namespace Vendor\Package;

class ReturnTypeVariations
{
    public function functionName(int $arg1, $arg2): string
    {
        return 'foo';
    }

    public function anotherFunction(
        string $foo,
        string $bar,
        int $baz
    ): string {
        return 'foo';
    }
}
```

* In nullable type declarations, there MUST NOT be a space between the question mark and the type.

```php
<?php

declare(strict_types=1);

namespace Vendor\Package;

class ReturnTypeVariations
{
    public function functionName(?string $arg1, ?int &$arg2): ?string
    {
        return 'foo';
    }
}
```

* There MUST NOT be a space between the variadic three dot operator and the argument name:

```php
public function process(string $algorithm, ...$parts)
{
    // processing
}
```

* When combining both the reference operator and the variadic three dot operator, there MUST NOT be any space between the two of them:

```php
public function process(string $algorithm, &...$parts)
{
    // processing
}
```

#### abstract, final, and static

* When present, the abstract and final declarations MUST precede the visibility declaration.

* When present, the static declaration MUST come after the visibility declaration.

```php
<?php

namespace Vendor\Package;

abstract class ClassName
{
    protected static $foo;

    abstract protected function zim();

    final public static function bar()
    {
        // method body
    }
}
```

#### Method and Function Calls

* When making a method or function call, there MUST NOT be a space between the method or function name and the opening parenthesis, there MUST NOT be a space after the opening parenthesis, and there MUST NOT be a space before the closing parenthesis. In the argument list, there MUST NOT be a space before each comma, and there MUST be one space after each comma.

```php
<?php

bar();
$foo->bar($arg1);
Foo::bar($arg2, $arg3);
```

* Argument lists MAY be split across multiple lines, where each subsequent line is indented once. When doing so, the first item in the list MUST be on the next line, and there MUST be only one argument per line. A single argument being split across multiple lines (as might be the case with an anonymous function or array) does not constitute splitting the argument list itself.

```php
<?php

$foo->bar(
    $longArgument,
    $longerArgument,
    $muchLongerArgument
);

somefunction($foo, $bar, [
  // ...
], $baz);

$app->get('/hello/{name}', function ($name) use ($app) {
    return 'Hello ' . $app->escape($name);
});
```

#### Control Structures

* There MUST be one space after the control structure keyword
* There MUST NOT be a space after the opening parenthesis
* There MUST NOT be a space before the closing parenthesis
* There MUST be one space between the closing parenthesis and the opening brace
* The structure body MUST be indented once
* The body MUST be on the next line after the opening brace
* The closing brace MUST be on the next line after the body
* The body of each structure MUST be enclosed by braces. This standardizes how the structures look and reduces the likelihood of introducing errors as new lines get added to the body.

 ##### If example: 

```php
<?php

if ($expr1) {
    // if body
} elseif ($expr2) {
    // elseif body
} else {
    // else body;
}
```

##### Multiline if example:

```php
<?php

if (
    $expr1
    && $expr2
) {
    // if body
} elseif (
    $expr3
    && $expr4
) {
    // elseif body
}
```

##### Switch example:

```php
<?php

switch ($expr) {
    case 0:
        echo 'First case, with a break';
        break;
    case 1:
        echo 'Second case, which falls through';
        // no break
    case 2:
    case 3:
    case 4:
        echo 'Third case, return instead of break';
        return;
    default:
        echo 'Default case';
        break;
}
```

```php
<?php

switch (
    $expr1
    && $expr2
) {
    // structure body
}
```

##### While example:

```php
<?php

while ($expr) {
    // structure body
}
```

```php
<?php

while (
    $expr1
    && $expr2
) {
    // structure body
}
```

```php
<?php

do {
    // structure body;
} while (
    $expr1
    && $expr2
);
```

##### For example:

```php
<?php

for ($i = 0; $i < 10; $i++) {
    // for body
}
```

```php
<?php

for (
    $i = 0;
    $i < 10;
    $i++
) {
    // for body
}
```

##### For each example:

```php
<?php

foreach ($iterable as $key => $value) {
    // foreach body
}
```

##### try, catch, finally:

```php
<?php

try {
    // try body
} catch (FirstThrowableType $e) {
    // catch body
} catch (OtherThrowableType | AnotherThrowableType $e) {
    // catch body
} finally {
    // finally body
}
```

##### Operators:

```php
$i++;
++$j;
```

##### Casting:

```php
$intValue = (int) $input;
```

##### Binary opeators:

```php
if ($a === $b) {
    $foo = $bar ?? $a ?? $b;
} elseif ($a > $b) {
    $foo = $a + $b * $c;
}
```
 
##### Ternary operator:

```php
$variable = $foo ? 'foo' : 'bar';
$variable = $foo ?: 'bar';
```

##### Closures:

```php
<?php

$closureWithArgs = function ($arg1, $arg2) {
    // body
};

$closureWithArgsAndVars = function ($arg1, $arg2) use ($var1, $var2) {
    // body
};

$closureWithArgsVarsAndReturn = function ($arg1, $arg2) use ($var1, $var2): bool {
    // body
};
```

```php
<?php

$longArgs_noVars = function (
    $longArgument,
    $longerArgument,
    $muchLongerArgument
) {
   // body
};

$noArgs_longVars = function () use (
    $longVar1,
    $longerVar2,
    $muchLongerVar3
) {
   // body
};

$longArgs_longVars = function (
    $longArgument,
    $longerArgument,
    $muchLongerArgument
) use (
    $longVar1,
    $longerVar2,
    $muchLongerVar3
) {
   // body
};

$longArgs_shortVars = function (
    $longArgument,
    $longerArgument,
    $muchLongerArgument
) use ($var1) {
   // body
};

$shortArgs_longVars = function ($arg) use (
    $longVar1,
    $longerVar2,
    $muchLongerVar3
) {
   // body
};
```

##### Anonymous Classes:

```php
<?php

$instance = new class {};
```

```php
<?php

// Brace on the same line
$instance = new class extends \Foo implements \HandleableInterface {
    // Class content
};

// Brace on the next line
$instance = new class extends \Foo implements
    \ArrayAccess,
    \Countable,
    \Serializable
{
    // Class content
};
```