# Essentials

Redux is a pattern and library for managing and updating application state, using events called "actions". It serves as a centralized store for state that needs to be used across your entire application, with rules ensuring that the state can only be updated in a predictable fashion.

This is the basic idea behind Redux: a single centralized place to contain the global state in your application, and specific patterns to follow when updating that state to make the code predictable.

__Notice:__ Everything in JS is mutable, so we need to create copies of objects to protect them from mutating. 

## Terminology

### Actions

```js
const addTodoAction = {
  type: 'todos/todoAdded',
  payload: 'Buy milk'
}
```

* Type is a descriptive name `domain/eventName`. 
* An action object can have multiple fields with information what happened. By convention, we put that in a payload field.

### Actions Creators

Are functions that create and return an action object. We use these, so we don't need to write action object every time.

```js
const addTodo = text => {
  return {
    type: 'todos/todoAdded',
    payload: text
  }
}
```

### Reducers

A reducer is a function that receives the current state and an action object, decides how to update the state if necessary, and returns the new state: `(state, action) => newState`.

Rules of reducers:

* State can be calculated only by using `state` and `action` arguments.
* They are not allowed to modify existing `state`. Instead, they must make immutable updates by copying state and making changes to copied values.
* They can't do any asynchronous stuff or be random. 

Reducer steps:

1. Check to see if the reducer cares about this action
 * If so, make a copy of the state, update the copy with new values, and return it
2. Otherwise, return the existing state unchanged

### Store

The current Redux application state lives in an object called the store.

### Dispatch

The only way to update the state is to call store.dispatch() and pass in an action object. 

You can think of dispatching actions as “triggering an event” in the application. 

### Selectors

Selectors are functions that know how to extract specific pieces of information from a store state value. As an application grows bigger, this can help avoid repeating logic as different parts of the app need to read the same data.

```js
const selectCounterValue = state => state.value

const currentValue = selectCounterValue(store.getState())
console.log(currentValue)
```