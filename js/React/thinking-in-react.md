# Thinking in React

## Break UI into components

Plan your components by drawing boxes with names on your design. 

How to know what is a component and what's not? Simply use SRP (single responsibility principle). If component does more than one thing, it should be decomposed into smaller ones.

Create hierarchy for your components.

## Build a static version using React

Build your app without any interactivity. For static version do not use state! State is used only for interactivity. 

Component at the top of the hierarchy will take data model as prop. 

## Identify the minimal representation of UI state

Use DRY principle (don't repeat yourself). Figure out absolute minimal representation of application needs. 

For example, if you’re building a TODO list, keep an array of the TODO items around; don’t keep a separate state variable for the count. Instead, when you want to render the TODO count, take the length of the TODO items array.

Figure which data is state. Ask three questions:

1. Is it passed in from a parent via props? If so, it probably isn’t state.
2. Does it remain unchanged over time? If so, it probably isn’t state.
3. Can you compute it based on any other state or props in your component? If so, it isn’t state.

If something is changed over time and can't be computed from anything it is state! For example search box inside a component can be state. 

## Identify a place for your state

Remember: React is all about one-way data flow down the component hierarchy. It may not be immediately clear which component should own what state. This is often the most challenging part for newcomers to understand, so follow these steps to figure it out:

* Identify every component that renders something based on that state.
* Find a common owner component (a single component above all the components that need the state in the hierarchy).
* Either the common owner or another component higher up in the hierarchy should own the state.
* If you can’t find a component where it makes sense to own the state, create a new component solely for holding the state and add it somewhere in the hierarchy above the common owner component.

## Add Inverse Data Flow

If you try to type or check the box in the current version of the example, you’ll see that React ignores your input. This is intentional, as we’ve set the value prop of the input to always be equal to the state passed in from FilterableProductTable.

Since components should only update their own state, FilterableProductTable will pass callbacks to SearchBar that will fire whenever the state should be updated. We can use the onChange event on the inputs to be notified of it. The callbacks passed by FilterableProductTable will call setState(), and the app will be updated.