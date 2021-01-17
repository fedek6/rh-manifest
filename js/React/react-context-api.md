# React context API

Context provides a way to pass data through the component tree without having to pass props down manually at every level.

In a typical React application, data is passed top-down (parent to child) via props, but this can be cumbersome for certain types of props (e.g. locale preference, UI theme) that are required by many components within an application. Context provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree.

Context is designed to share data that can be considered “global” for a tree of React components, such as the current authenticated user, theme, or preferred language.

## Theme toggling example

You can create `/context` folder and place there your context files. For example, it can be `ThemeContext.js`:

```js
import React from "react";

const ThemeContext = React.createContext("light");
export default ThemeContext;
```

Now we need to crate a context provider, so let's pack everything using this code:

```jsx
function App() {
  const theme = "light";
  return (
    <ThemeContext.Provider value = {theme}>
      <div>
      </div>
    </ThemeContext.Provider>
  );
}
```

And now the context is available to all child components.

Let's create theme declaration: 

```js
const AppTheme = {
    light: {
        textColor: "#000",
        backgroundColor: "#fff"
    },
    dark: {
        textColor: "#fff",
        backgroundColor: "#333"
    }
}

export default AppTheme
```

### Consume context in a functional component

```jsx
import React, { useContext } from "react";
import ThemeContext from "../Context/ThemeContext";
import AppTheme from "../Colors";


const Main = () => {
    const theme = useContext(ThemeContext)[0];
    const currentTheme = AppTheme[theme];
    return(
        <main style = {{
            padding: "1rem",
            backgroundColor: `${currentTheme.backgroundColor}`,
            color: `${currentTheme.textColor}`,        
        }}>
            <h1>Heading 1</h1>
            <p>This is a paragraph</p>
            <button> This is a button</button>
        </main>
    );
}

export default Main;
```

Theme toggler:

```jsx
import React, {useContext} from "react";
import ThemeContext from "../Context/ThemeContext";

const themeTogglerStyle = {
    cursor: "pointer"
}
const ThemeToggler = () => {
    const[themeMode, setThemeMode] = useContext(ThemeContext);
    return(
        <div style = {themeTogglerStyle} onClick = {() => {setThemeMode(themeMode === "light"? "dark": "light")}}>
            <span title = "switch theme">
                {themeMode === "light" ? "🌙" : "☀️"}
            </span>
        </div>
    );
}

export default ThemeToggler;
```