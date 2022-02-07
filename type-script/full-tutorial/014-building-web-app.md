# Building web app

## Stand-alone web app

### Step 1: TS

Configuring tool chain:

```bash
npm install --save-dev typescript@3.5.1
```

And `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "es2018",
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

### Step 2: Toolchain

```bash
npm install --save-dev webpack@4.31.0
npm install --save-dev webpack-cli@3.3.2
npm install --save-dev ts-loader@6.0.0
```

Add `webpack.config.js` to the root:

```js
module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: { filename: "bundle.js" },
  resolve: { extensions: [".ts", ".js"] },
  module: {
    rules: [{ test: /\.ts/, use: "ts-loader", exclude: /node_modules/ }],
  },
};
```

### Step 3: Web server

```bash
npm install --save-dev webpack-dev-server@3.3.1
```

And add its configuration to the `wepback.config.js`:

```js
devServer: {
contentBase: "./assets",
port: 4500
}
```

You'll also need to create a `index.html` in a server's root:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Web App</title>
    <script src="bundle.js"></script>
  </head>
  <body>
    <div id="app">Web App Placeholder</div>
  </body>
</html>
```

To run the code:

```bash
npx webpack-dev-server
```

> In this configuration only changes in JS files will be detected by WDS>

### Data model

`src/data/entities.ts`:

```ts
export type Product = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
};

export class OrderLine {
  constructor(public product: Product, public quantity: number) {
    // no statements required
  }
  get total(): number {
    return this.product.price * this.quantity;
  }
}

export class Order {
  private lines = new Map<number, OrderLine>();
  constructor(initialLines?: OrderLine[]) {
    if (initialLines) {
      initialLines.forEach((ol) => this.lines.set(ol.product.id, ol));
    }
  }

  public addProduct(prod: Product, quantity: number) {
    if (this.lines.has(prod.id)) {
      if (quantity === 0) {
        this.removeProduct(prod.id);
      } else {
        this.lines.get(prod.id)!.quantity += quantity;
      }
    } else {
      this.lines.set(prod.id, new OrderLine(prod, quantity));
    }
  }

  public removeProduct(id: number) {
    this.lines.delete(id);
  }

  get orderLines(): OrderLine[] {
    return [...this.lines.values()];
  }
  get productCount(): number {
    return [...this.lines.values()].reduce(
      (total, ol) => (total += ol.quantity),
      0
    );
  }

  get total(): number {
    return [...this.lines.values()].reduce(
      (total, ol) => (total += ol.total),
      0
    );
  }
}
```

- Types are exported, so they can be used outside
- Order class represents user choices
- `OrderLine` is an expression of user selection

### Creating the data source

This class is prototype for data providers:

`data/abstractDataSource.ts`

```ts
import { Product, Order } from "./entities";
export type ProductProp = keyof Product;

export abstract class AbstractDataSource {
  private _products: Product[];
  private _categories: Set<string>;
  public order: Order;
  public loading: Promise<void>;
  constructor() {
    this._products = [];
    this._categories = new Set<string>();
    this.order = new Order();
    this.loading = this.getData();
  }
  async getProducts(
    sortProp: ProductProp = "id",
    category?: string
  ): Promise<Product[]> {
    await this.loading;
    return this.selectProducts(this._products, sortProp, category);
  }
  protected async getData(): Promise<void> {
    this._products = [];
    this._categories.clear();
    const rawData = await this.loadProducts();
    rawData.forEach((p) => {
      this._products.push(p);
      this._categories.add(p.category);
    });
  }
  protected selectProducts(
    prods: Product[],
    sortProp: ProductProp,
    category?: string
  ): Product[] {
    return prods
      .filter((p) => category === undefined || p.category === category)
      .sort((p1, p2) =>
        p1[sortProp] < p2[sortProp] ? -1 : p1[sortProp] > p2[sortProp] ? 1 : 0
      );
  }
  async getCategories(): Promise<string[]> {
    await this.loading;
    return [...this._categories.values()];
  }
  protected abstract loadProducts(): Promise<Product[]>;
  abstract storeOrder(): Promise<number>;
}
```

This data is local data storage for testing purposes:

`data/LocalDataSource.ts`

```ts
import { AbstractDataSource } from "./abstractDataSource";
import { Product } from "./entities";
export class LocalDataSource extends AbstractDataSource {
  loadProducts(): Promise<Product[]> {
    return Promise.resolve([
      {
        id: 1,
        name: "P1",
        category: "Watersports",
        description: "P1 (Watersports)",
        price: 3,
      },
      {
        id: 2,
        name: "P2",
        category: "Watersports",
        description: "P2 (Watersports)",
        price: 4,
      },
      {
        id: 3,
        name: "P3",
        category: "Running",
        description: "P3 (Running)",
        price: 5,
      },
      {
        id: 4,
        name: "P4",
        category: "Chess",
        description: "P4 (Chess)",
        price: 6,
      },
      {
        id: 5,
        name: "P5",
        category: "Chess",
        description: "P6 (Chess)",
        price: 7,
      },
    ]);
  }
  storeOrder(): Promise<number> {
    console.log("Store Order");
    console.log(JSON.stringify(this.order));
    return Promise.resolve(1);
  }
}
```

You can consume this data using following code:

```ts
import { LocalDataSource } from "./data/localDataSource";

async function displayData(): Promise<string> {
  let ds = new LocalDataSource();
  let allProducts = await ds.getProducts("name");
  let categories = await ds.getCategories();
  let chessProducts = await ds.getProducts("name", "Chess");
  let result = "";
  allProducts.forEach((p) => (result += `Product: ${p.name}, ${p.category}\n`));
  categories.forEach((c) => (result += `Category: ${c}\n`));
  chessProducts.forEach((p) => ds.order.addProduct(p, 1));
  result += `Order total: $${ds.order.total.toFixed(2)}`;
  return result;
}

displayData().then((res) => console.log(res));
```

### Rendering data using the DOM API

```ts
import { Product, Order } from "./data/entities";
export class DomDisplay {
  props: {
    products: Product[];
    order: Order;
  };
  getContent(): HTMLElement {
    let elem = document.createElement("h3");
    elem.innerText = this.getElementText();
    elem.classList.add("bg-primary", "text-center", "text-white", "p-2");
    return elem;
  }
  getElementText() {
    return (
      `${this.props.products.length} Products, ` +
      `Order total: $${this.props.order.total}`
    );
  }
}
```

- `getContent` returns `HTMLElement` object which is the type used by the DOM API.
- The data values used in the template string are provided by a property called props.

### Adding Bootstrap to Webpack

```bash
npm install bootstrap@4.3.1
npm install --save-dev css-loader@2.1.1
npm install --save-dev style-loader@0.23.1
```

And to load CSS files:

```js
module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: { filename: "bundle.js" },
  resolve: { extensions: [".ts", ".js", ".css"] },
  module: {
    rules: [
      { test: /\.ts/, use: "ts-loader", exclude: /node_modules/ },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  devServer: {
    contentBase: "./assets",
    port: 4500,
  },
};
```

### Render

```ts
import { LocalDataSource } from "./data/localDataSource";
import { DomDisplay } from "./domDisplay";
import "bootstrap/dist/css/bootstrap.css";

let ds = new LocalDataSource();

async function displayData(): Promise<HTMLElement> {
  let display = new DomDisplay();
  display.props = {
    products: await ds.getProducts("name"),
    order: ds.order,
  };
  return display.getContent();
}

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    displayData().then((elem) => {
      let rootElement = document.getElementById("app");
      rootElement.innerHTML = "";
      rootElement.appendChild(elem);
    });
  }
};
```

> Notice: the default settings for the TypeScript compiler include type declaration files for the DOM API, which allows type-safe use of the browser features.

## Using JSX

> JSX stands for JavaScript XML. TypeScript compiler provides features that allow it to be used in any project.

> Files with JSX syntax should have `.tsx` extension.

First example:

```tsx
import { Product, Order } from "./data/entities";
export class HtmlDisplay {
  props: {
    products: Product[];
    order: Order;
  };
  getContent(): HTMLElement {
    return (
      <h3 className="bg-secondary text-center text-white p-2">
        {this.getElementText()}
      </h3>
    );
  }
  getElementText() {
    return (
      `${this.props.products.length} Products, ` +
      `Order total: $${this.props.order.total}`
    );
  }
}
```

### JSX workflow

- Each element is parsed and separated into the tag that defines the element type.
- Compiler replaces each HTML element with a call to a factory function.

So:

```tsx
  getContent(): HTMLElement {
    return (
      <h3 className="bg-secondary text-center text-white p-2">
        {this.getElementText()}
      </h3>
    );
  }
```

Means:

```js
getContent() {
  return createElement("h3", { className: "bg-secondary text-center text-white p-2" }, this.getElementText());
}
```

### Configuring JSX with TS and Webpack

There are two `tsconfig` options needed:

```json
{
  "compilerOptions": {
    "target": "es2018",
    "outDir": "./dist",
    "rootDir": "./src",
    "jsx": "react",
    "jsxFactory": "createElement"
  }
}
```

And `wbepack.config.js`:

```js
module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: { filename: "bundle.js" },
  resolve: { extensions: [".ts", ".tsx", ".js", ".css"] },
  module: {
    rules: [
      { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  devServer: {
    contentBase: "./assets",
    port: 4500,
  },
};
```

### Factory Function (needed to support TSX)

`React` has its own elegant `createElement` function, but this custom one is needed for basic development:

`jsxFactory.ts`

```ts
export function createElement(
  tag: any,
  props: Object,
  ...children: Object[]
): HTMLElement {
  function addChild(elem: HTMLElement, child: any) {
    elem.appendChild(
      child instanceof Node ? child : document.createTextNode(child.toString())
    );
  }
  
  if (typeof tag === "function") {
    return Object.assign(new tag(), { props: props || {} }).getContent();
  }
  
  const elem = Object.assign(document.createElement(tag), props || {});

  children.forEach((child) =>
    Array.isArray(child)
      ? child.forEach((c) => addChild(elem, c))
      : addChild(elem, child)
  );
  return elem;
}

declare global {
  namespace JSX {
    interface ElementAttributesProperty {
      props;
    }
  }
}
```

> Notice: this is minimal version of `createElement`. Reacts one is far more complicated. 

> Notice: `declare global` syntax is superseded by the introduction of standard JS modules and is no longer recommended for use.

### Using the JSX Classes