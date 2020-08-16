# CSS BEM

## Basics

* We don't use IDs;
* We don't use HTML tag selectors;
* We don't use CSS reset;
* We don't use universal (*) selector;
* We don't nest selectors to deep (it's allowed when using state selectors);
* We don't use combined selectors (.selector.selector-2);
* We don't use combined tag and class selectors;
* We don't use attribute selectors.

__Important__: class is the only selector that allows you to isolate the styles of each component in the project; increase the readability of the code and do not limit the re-use of the layout.

BEM is good for:

* Reuse the layout;
* Move layout fragments around within a project safely;
* Move the finished layout between projects;
* Create stable, predictable and clear code;
* Reduce the project debugging time.

## BEM parts

### Block

```html
<form class="form" action="/">
```

### Elements

```html
  <input class="form__search" name="s">
  <input class="form__submit" type="submit">
```

### Modifiers and mixes

A modifier defines the look, state and behavior of a block or an element. Adding modifiers is optional. Modifiers let you combine different block features, as you can use any number of modifiers. But a block or an element can’t be assigned different values of the same modifier.

#### Modifiers

```html
<form class="form form_type_original form_size_m form_theme_forest"></form>
<form class="form form_type_original form_size_m form_theme_sun"></form>
```

__Important__: A modifier contains only additional styles that change the original block implementation in some way. This allows you to set the appearance of a universal block only once, and add only those features that differ from the original block code into the modifier styles.

#### Mixes

A mix allows you to apply the same formatting to different HTML elements and combine the behavior and styles of several entities while avoiding code duplication. They can replace abstract wrapper blocks.

For example use a mix of the `link` universal block and the `item` element of the `menu` block:

```html
<nav class="menu">
  <a class="link menu__item" href=""></a>
  <a class="link menu__item" href=""></a>
  <a class="link menu__item" href=""></a>
</nav>
```

#### Universal blocks

Note on elements positioning. Do not create modifiers for positioning elements. Simply use mix classes:

```html
<div>
  <ul class="menu header__menu">
    <li class="menu__item"><a href=""></a></li>
    <li class="menu__item"><a href=""></a></li>
    <li class="menu__item"><a href=""></a></li>
  </ul>
</div>
```
