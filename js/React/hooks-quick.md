# Hooks quick

## useState

It is used to handle reactive data. This function returns an array that contains two values (value and setter a function).

```jsx
// Destructure array returned from useState
const [count, setCount] = useState(0);

return (
    <button onClick={() => setCount(count+1)}>
        {count}
    </button>
);
```

## useEffect

It is a replacement to components life cycle functions.

This will run on state change:

```jsx
useEffect(() => {
    alert('State changed!');
});
```

* It will run on a component initialization.
* It will run on a state update.

Another example is when we want to fetch data on component initialization:

```jsx
const [loaded, setLoaded] = useState(false)

useEffect(() => {
    fetch('foo').then(() => setLoaded(true));
}, []);
```

To avoid a loop of fetch-set state, we need to add dependencies (it's an array argument passed to `useEffect` second argument). If we pass an empty array this code will run only once on mount.

You can also track a state using variable names passed using this array:

```jsx
const [count, setCount] = useState(0)

useEffect(() => {
    fetch('foo').then(() => setCount(count + 1);
}, [count]);
```

If you need a cleanup function simply return function from the `useEffect` body:

```jsx
useEffect(() => {
    return () => alert('goodbye!');
});
```

## useContext

Contex will help you with sharing data between components.

```jsx
const moods = {
    happy: ':)',
    sad: ';('
}

const MoodContext = createContext(moods);

function App(props) {
    return (
        <MoodContext.Provider value={moods.happy}>
            <ThisComponentCanAccessMood />
        </MoodContext.Provider>
    );
}

function ThisComponentCanAccessMood(props) {
    const mood = useContext(MoodContext);

    return <p>{ mood }</p>;
}
```

## useRef

This hook will allow you to create an immutable reference that will be kept between renders.

This code will not work:

```jsx
function App() {
    const count = useRef(0);

    return (
        <button onClick={() => count.current++ }>
            {count.current}
        </button>
    );
}
```
Because reference is immutable!

This can be used to grab HTML elements from the DOM. 

```jsx
function App() {
    const myBtn = useRef(null);

    const clickIt = () => myBtn.current.click();

    return (
        <button ref={myBtn}></button>
    );
}
```

## useReducer

`useReducer` is using `Redux` pattern for state menagement. 

```jsx
function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return state + 1;
        case 'decrement':
            return state - 1;
        default:
            throw new Error();
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, 0);

    return (
        <>
            Count: {state}
            <button onClick={() => dispatch({type: 'decrement'})}>-</button>
            <button onClick={() => dispatch({type: 'increment'})}>+</button>
        </>
    );
}
```

`Redux` pattern will help you to manage complex states. 

## useMemo

This one is used when you want to decrease computation cost. 

```jsx
function App() {
    const [count, setCount] = useState(60);

    // Only when computation is really expensive!
    const expensiveCount = useMemo(() => {
        // exponentiation operator
        return count ** 2;
    }, [count]);
}
```

This code will run whenever `count` will change.

## useCallback

This one is used when you want to store a function in memory.

```jsx
function App() {
    const [count, setCount] = useState(60);

    const showCount = useCallback(() => {
        alert(`Count ${count}`);
    });

    return (
        <>
            <ChildComponent handler={showCount} />
        </>
    );    
}
```

This should be used when you want to pass a function to multiple child components.

## useImperativeHandle

This one is used when you want to pass reference from your component and change it's behaviour.

```jsx
function App() {
    const ref = useRef(null);

    return <CoolButton ref={ref}></CoolButton>
}

function CoolButton() {
    const myBtn = useRef(null);

    useImperativeHandle(ref, () => ({
        click: () => {
            console.log('Clicking button!');
            myBtn.current.click();
        }
    }));

    return (
        <button ref={myBtn}></button>
    );
}

CoolButton = forwardRef(CoolButton);
```

## useLayoutEffect

It works like `useEffect` with one small difference. Code will run after render but before paiting to screen. So it blocks rendering of your component.

```jsx
function App() {
    const myBtn = useRef(null);
    
    useLayoutEffect(() => {
        const rect = myBtn.current.getBoundingClientRect();
    });
}
```

This might be used when you need to calculate scroll position, size, etc.

## useDebugValue

This is needed only when building custom hooks. It adds custom labels to the debugger (hooks view). 

```jsx
// If you need to group and reuse hooks logic simply create a new one
function useDisplayName() {
    const [displayName, setDisplayName] = useState();

    useEffect(() => {
        const data = fetch(props.userId);
        setDisplayName(data.displayName);
    }, []);

    useDebugValue(displayName ?? 'loading');

    return displayName;
}
```