# Resilient components

Based on [this](https://overreacted.io/writing-resilient-components/#writing-resilient-components).

## Linting

...is not most important.

You can always use `eslint-config-react-app` which has no style rules.

Do not use linter for enforcing style! Prettier can do this better.

## 1. Don't stop the data flow

When somebody uses your component, they expect that they can pass different props to it over time, and that the component will reflect those change.

```js
function Button({ color, children }) {
  return (
    // ✅ `color` is always fresh!
    <button className={"Button-" + color}>{children}</button>
  );
}
```

But often mistake is to copy prop into state:

```js
class Button extends React.Component {
  state = {
    color: this.props.color,
  };
  render() {
    const { color } = this.state; // 🔴 `color` is stale!
    return <button className={"Button-" + color}>{this.props.children}</button>;
  }
}
```

> In the rare case that this behavior is intentional, make sure to call that prop `initialColor` or `defaultColor` to clarify that changes to it are ignored.

Even when calculation of such prop is costly, you shouldn't do this:

```js
class Button extends React.Component {
  state = {
    textColor: slowlyCalculateTextColor(this.props.color),
  };
  render() {
    return (
      <button
        className={
          "Button-" + this.props.color + " Button-text-" + this.state.textColor // 🔴 Stale on `color` prop updates
        }
      >
        {this.props.children}
      </button>
    );
  }
}
```

This component is buggy because it doesn’t recalculate `this.state.textColor` on the color prop change! You should move this code to a memoization hook:

```js
function Button({ color, children }) {
  const textColor = useMemo(
    () => slowlyCalculateTextColor(color),
    [color] // ✅ Don’t recalculate until `color` changes
  );
  return (
    <button className={"Button-" + color + " Button-text-" + textColor}>
      {children}
    </button>
  );
}
```

### Don’t Stop the Data Flow in Side Effects

This code is buggy:

```js
class SearchResults extends React.Component {
  state = {
    data: null,
  };
  componentDidMount() {
    this.fetchResults();
  }
  fetchResults() {
    const url = this.getFetchUrl();
    // Do the fetching...
  }
  getFetchUrl() {
    return "http://myapi/results?query" + this.props.query;
  }
  render() {
    // ...
  }
}
```

Because it won't reflect prop changes. You should watch property changes using hooks or `componentDiDupdate`.

Best solution for this problem is to use hooks:

```js
function SearchResults({ query }) {
  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    function fetchResults() {
      const url = getFetchUrl();
      // Do the fetching...
    }

    function getFetchUrl() {
      return "http://myapi/results?query" + query + "&page=" + currentPage;
    }

    fetchResults();
  }, [currentPage, query]); // ✅ Refetch on change

  // ...
}
```

> Be very careful to respect all prop changes! 

### Dangers of optimization

```js
class Button extends React.Component {
  shouldComponentUpdate(prevProps) {
    // 🔴 Doesn't compare this.props.onClick 
    return this.props.color !== prevProps.color;
  }
  render() {
    const onClick = this.props.onClick; // 🔴 Doesn't reflect updates
    const textColor = slowlyCalculateTextColor(this.props.color);
    return (
      <button
        onClick={onClick}
        className={'Button-' + this.props.color + ' Button-text-' + textColor}>
        {this.props.children}
      </button>
    );
  }
}
```

You should avoid optimization by hand. It's better to use memo:

```js
function Button({ onClick, color, children }) {
  const textColor = slowlyCalculateTextColor(color);
  return (
    <button
      onClick={onClick}
      className={'Button-' + color + ' Button-text-' + textColor}>
      {children}
    </button>
  );
}
export default React.memo(Button); // ✅ Uses shallow comparison
```

> Whenever you use props and state, consider what should happen if they change. In most cases, a component shouldn’t treat the initial render and updates differently. That makes it resilient to changes in the logic.

## 2. Always Be Ready to Render

Don’t try to introduce unnecessary timing assumptions into your component behavior. Your component should be ready to re-render at any time.

**Warning!** Once again avoid copying props into state. This is considered anti-pattern. 

You can accomplish control using this example:

```js
// Option 1: Fully controlled component.
function TextInput({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={onChange}
    />
  );
}
```

Or this way:

```js
// Option 2: Fully uncontrolled component.
function TextInput() {
  const [value, setValue] = useState('');
  return (
    <input
      value={value}
      onChange={e => setValue(e.target.value)}
    />
  );
}

// We can reset its internal state later by changing the key:
<TextInput key={formId} />
```

> `PureComponent`, `shouldComponentUpdate`, and `React.memo` shouldn’t be used for controlling behavior. Only use them to improve performance where it helps. If removing an optimization breaks a component, it was too fragile to begin with.

The solution here is the same as we described earlier. Don’t treat “receiving props” as a special event. Avoid “syncing” props and state. In most cases, every value should either be fully controlled (through props), or fully uncontrolled (in local state). Avoid derived state when you can.

## 3. Components aren't singletons

Sometimes we assume a certain component is only ever displayed once. Such as a navigation bar. This might be true for some time. However, this assumption often causes design problems that only surface much later.

For example resetting Redux store on component unmount might be a bad idea. One component can remove state used by other one.

## 4. Isolate local state

If you’re not sure whether some state is local, ask yourself: “If this component was rendered twice, should this interaction reflect in the other copy?” Whenever the answer is “no”, you found some local state.

* Post content. We’d want editing the post in one tree to update it in another tree. Therefore, it probably should not be the local state of a Post component. (Instead, the post content could live in some cache like Apollo, Relay, or Redux.)

* List of comments. This is similar to post content. We’d want adding a new comment in one tree to be reflected in the other tree too. So ideally we would use some kind of a cache for it, and it should not be a local state of our Post.

* Which comments are expanded. It would be weird if expanding a comment in one tree would also expand it in another tree. In this case we’re interacting with a particular Comment UI representation rather than an abstract “comment entity”. Therefore, an “expanded” flag should be a local state of the Comment.

* The value of new comment input. It would be odd if typing a comment in one input would also update an input in another tree. Unless inputs are clearly grouped together, usually people expect them to be independent. So the input value should be a local state of the NewComment component.