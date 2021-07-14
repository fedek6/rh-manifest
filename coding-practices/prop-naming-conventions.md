# Props naming conventions

Source [this](https://dlinau.wordpress.com/2016/02/22/how-to-name-props-for-react-components/).

```
There are only two hard things in Computer Science: cache invalidation and naming things.

— Phil Karlton
```

## Prop types

* `Array` — use plural e.g. items.
* `Number` — imply number `numItems`, `itemCount`, `itemIndex`.
* `Bool` — use prefixes `is`, `can` and `has`.
    * `is`: for visual/behavior variations. e.g. `isVisible`, `isEnable`, `isActive`
    * `can`: fore behavior variations or conditional visual variations. e.g. `canToggle`, `canExpand`, `canHaveCancelButton`
    * `has`: for toggling UI elements. e.g. `hasCancelButton`, `hasHeader`.
* `Object` — use noun e.g. `item`.
* `Element` — use `prefix` element. e.g. `hoverElement`. 

## Named to describe the component itself

Props describe what a component does, not why it does. 

* `hasSubmitPermission` describes user not component. Change it to `<MyForm hasSubmitButton={user.canSubmit} />`.
* `isMobileScreen` describes current browser state, not the reason for variation. Change it to `<MyForm isCompactLayout={browser.isMobileScreen} />`.

Another common mistake is to use a name describing children components instead of the component itself.

* `<MyList onItemClick={...} />` could be more appropriate than `<MyList onClick={...} />`.
* `areCommentsLoading` should be `isLoadingComments`.

## Event handlers

* Use on prefix for prop names, e.g. `onSelect`, `onClick`.
* Use handle prefix for handler functions, e.g. `<MyComp onClick={this.handleClick} />`.
* Avoid using built-in event handler prop names for customer event. For example, use `onSelect` instead of `onFocus` or `onClick` if the native focus/click event is not of interest.