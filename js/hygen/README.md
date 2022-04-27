# Basics

### Add new template (no prompt)

```
hygen generator new mygen
```

### Add new template with prompt

```
hygen generator with-prompt mygen
```

## Generate

```
hygen mygen with-prompt
```

> with-prompt is a directory inside mygen


## React example

Generate with command `hygen component-void-unstyled with-prompt`

### Files

`_templates/component-void-unstyled/with-prompt/prompt.js`

```js
// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [
  {
    type: 'input',
    name: 'name',
    message: "What's the name of a component (PascalCase)?"
  }
]
```

`_templates/component-void-unstyled/with-prompt/index.ejs.t`

```
---
to: src/components/<%=name%>/index.ts
---
export * from "./<%=name%>";

```

`component.ejs.t`

```
---
to: src/components/<%=name%>/<%=name%>.tsx
---
import React from "react";

type ComponentProps = {};

type ComponentType = React.VFC<ComponentProps>;

export const <%=name%>: ComponentType = ({ ...props }) => (
  <>
    <div {...props}>
      Hello world
    </div>
  </>
);
```