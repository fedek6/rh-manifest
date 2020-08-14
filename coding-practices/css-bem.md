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

## ABEM

ABEM is a variant of BEM with slightly different syntax.

![ABEM](Atomic-design-no-shell.png "ABEM architercture")

Basic structure for ABEM block name looks like this:

```
[a/m/o]-blockName__elementName -modifierName
```

* Atoms are super simple components that generally consist of just a single element (e.g. a button component);
* Molecules are small groups of elements and/or components (e.g. a single form field showing a label and an input field). 
* Organisms are large complex components made up of many molecules and atom components (e.g. a full registration form).


### Modifiers in ABEM

```html
<button class="a-blockName__elementName -small -green -active">
  Submit
</button>
```

```css
.a-blockName__elementName.-green {
  background: green;
  color: white;
}
```

The notable features are:

* Block, element, and modifier names are in lowerCamelCase instead of kebab-case.
* Modifiers are separate classes prefixes with a leading dash.
* You can use a namespace prefix if you’d like, typically to indicate the Atomic Design block type (Atom, Molecule, Organism, Template or Page) or to indicate that a class is meant strictly for JavaScript targeting (js-stickyHeader.)

### Example

```html
<div class="m-revealer o-accordion__section -open">
  <div class="m-revealer__trigger">
    <h2 class="m-revealer__heading">One</h2>
    <div class="m-revealer__icon"></div>
  </div>
  <div class="m-revealer__content">
    Lorem ipsum dolor sit amet...
  </div>
</div>
```

```scss
/* m-revealer component file */
.m-revealer {
    &__trigger {
        display: grid;
        grid-template-columns: 1fr 50px;

        &:hover {
            cursor: pointer;
            background: lightgrey;
        }

        .-open & {
            background: #000;
            color: #fff;

            &:hover {
                background: #1D1F20;
            }
        }
    }

    &__heading {
        margin: 0;
        padding: 10px 20px;
    }
    
    &__icon {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        &::before {
            content: '';
            display: block;
            height: 0;
            width: 0;
            border-top: 10px solid #000;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;

            .-open & {
                transform: rotate(180deg);
                border-top-color: #fff; 
            }
        }
    }
    
    &__content {
        border-top: 1px solid #000;
        padding: 10px 20px;
        display: none;
        
        .-open & {
            display: block;
        }
    }
}
```