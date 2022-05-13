# Props naming

- Array – use plural nouns. e.g. items
- Number – use prefix num or postfix count, index etc that can imply a number. e.g. numItems, itemCount, itemIndex  
- Bool – use prefix is, can, has
    - is: for visual/behavior variations. e.g. isVisible, isEnable, isActive
    - can: fore behavior variations or conditional visual variations. e.g. canToggle, canExpand, canHaveCancelButton
    - has: for toggling UI elements. e.g. hasCancelButton, hasHeader
- Object – use noun. e.g. item
- Node – use prefix node. containerNode
- Element – use prefix element. hoverElement

## Some rules

> Props describe what a component does, not why it does.

hasSubmitPermission > hasSubmitButton

isMobileScreen >  isCompactLayout

```jsx
<MyForm hasSubmitButton={user.canSubmit} />
<MyForm isCompactLayout={browser.isMobileScreen} />
```

> Describe parent component instead of children:

- `<MyList onItemClick={...} />` > `<MyList onClick={...} />`
- `areCommentsLoading` > `isLoadingComments`
- `hasIcon` > `isSpacious`

## Event handlers

1. Use prefix `onClick`
2. Use handle prefix for methods `onClick={handleClick}`
3. Avoid conflicting with the native handler methods eg. `onClick` > `onSelect`

Based on an [article](https://dlinau.wordpress.com/2016/02/22/how-to-name-props-for-react-components/).