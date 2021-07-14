# Color naming conventions

**Notice**: Avoid classes like `.header-blue-left-bottom` because the color and position of that element might change. It’s better for the to reflect it what it is than what it looks like.

## Material design

```scss
$light-green-100:
$light-green-200:
$light-green-300:
// etc
$light-green-900:
$light-green-A200:
$light-green-A400:

$deep-purple-100:
$deep-purple-200:
$deep-purple-300:
```

You can use [this](https://chir.ag/projects/name-that-color/#6195ED) website to generate your color names.

Besides that Material design uses `primary`, `secondary` and `default` convention for buttons.

```jsx
<Button variant="contained">Default</Button>
<Button variant="contained" color="primary">
  Primary
</Button>
<Button variant="contained" color="secondary">
  Secondary
</Button>
```

## Atlassian design system

Atlassian uses `primary`, `subtle`, `danger`, `link` and `warning` buttons.

Besides that, there are principles on how to use these variants. For example:

```
Use a primary button to call attention to an action on a form or to highlight the strongest call to action on a page. Primary buttons should only appear once per container (not including the application header or in a modal dialog). Not every screen requires a primary button.
```