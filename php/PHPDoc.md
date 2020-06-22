# PHPDoc

Full doccumentation can be found here [Reference](https://docs.phpdoc.org/latest/references/phpdoc/index.html).

## What is DocBlock?

What elements can be dockblocked?

* namespace
* require(_once)
* include(_once)
* class
* interface
* trait
* function (including methods)
* property
* constant
* variables, both local and global scope.

```php
<?php
/**
 * This is a DocBlock.
 */
function associatedFunction()
{
}
```

### Multilevel DockBlock

```php
<?php
/**
 * I belong to a file
 */

/**
 * I belong to a class
 */
class Def
{
}
```

### Function DockBlock

```php
 <?php
 /**
  * A summary informing the user what the associated element does.
  *
  * A *description*, that can span multiple lines, to go _in-depth_ into the details of this element
  * and to provide some background information or textual references.
  *
  * @param string $myArgument With a *description* of this argument, these may also
  *    span multiple lines.
  *
  * @return void
  */
  function myFunction($myArgument)
  {
  }
```

### Variable DockBlock

```php
/** @var <type> [variable [comment]] */
```

### Single line or mutliline? 

```php
/** This is a single line DocComment. */
```

```php
/**
 * This is a multi-line DocComment.
 */
```

## Almost real life examples

### Functions

```php
/**
 * Check if a Sql row exists. (with two values)
 *
 * This function will check if a selected sql row exists that contains two
 * known values.
 *
 * @param  string  $tblname  Sql Table Name
 * @param  string  $colname  Sql Column Name 1
 * @param  string  $value    Sql value 1
 * @param  string  $colname2 Sql Column Name 2
 * @param  string  $value2   Sql value 2
 * @return boolean           returns true if the sql row does exist
 */
function tableHasRow2D($tblname, $colname, $value, $colname2, $value2) { 
    $row = sqlQuery("SELECT COUNT(*) AS count FROM $tblname WHERE " . "$colname 
           LIKE '$value' AND $colname2 LIKE '$value2'"); 
    return $row['count'] ? true : false; 
} 
```

## Classes

```php
<?php
/**
 * An example class
 *
 * The class is empty for the sake of this example.
 *
 * @package    MyProject
 * @subpackage Common
 * @author     Moshe Teutsch <moteutsch@gmail.com>
 */
class Example {
}
```

## Files

```php
<?php
/**
 * This file contains common functions used throughout the application.
 *
 * @package    MyProject
 * @subpackage Common
 * @license    http://opensource.org/licenses/gpl-license.php  GNU Public License
 * @author     Moshe Teutsch <moteutsch@gmail.com>
 */
```