# Building a React app

Options useful for React development:

| Name                               | Description                                                                                   |
| ---------------------------------- | --------------------------------------------------------------------------------------------- |
| `allowSyntheticDefaultImports`     | Allows importing modules without default export                                               |
| `esModuleInterop`                  | Adds helper code for importing non default exported modules                                   |
| `forceConsistentCasingInFileNames` | This option ensures that names in import statements match the case used by the imported file. |
| `isolatedModules`                  | This option treats each file as separate module (increased Babel compatibility)               |
| `resolveJsonModule`                | Allow importing JSON files                                                                    |
| `skipLibCheck`                     | Speed up compilation by skipping normal checks for declaration files                          |
| `strict`                           | Stricter checks of TS code                                                                    |

## Let's begin

```bash
npx create-react-app reactapp --typescript
```

> In WebPack TS does not create JS files (`noEmit: true`). For that purpose Babel is used. Also, `jsx` isn't compiled by the TS compiler (`jsx: preserve`). TypeScript is added only for type checking.

p. 466

## Defining the Entity Type

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

## React component for filtered list

```tsx
import React, { Component, ChangeEvent } from "react";
import { Product } from "./data/entities";

interface Props {
  product: Product;
  callback: (product: Product, quantity: number) => void;
}

interface State {
  quantity: number;
}

export class ProductItem extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      quantity: 1,
    };
  }

  render() {
    return (
      <div className="card m-1 p-1 bg-light">
        <h4>
          {this.props.product.name}
          <span className="badge badge-pill badge-primary float-right">
            ${this.props.product.price.toFixed(2)}
          </span>
        </h4>
        <div className="card-text bg-white p-1">
          {this.props.product.description}
          <button
            className="btn btn-success btn-sm float-right"
            onClick={this.handleAddToCart}
          >
            Add To Cart
          </button>
          <select
            className="form-control-inline float-right m-1"
            onChange={this.handleQuantityChange}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
      </div>
    );
  }

  handleQuantityChange = (ev: ChangeEvent<HTMLSelectElement>): void =>
    this.setState({ quantity: Number(ev.target.value) });

  handleAddToCart = (): void =>
    this.props.callback(this.props.product, this.state.quantity);
}
```

## Using functional components

```tsx
import React, { FunctionComponent, useState } from "react";
import { Product } from "./data/entities";

interface Props {
  product: Product;
  callback: (product: Product, quantity: number) => void;
}
// interface State {
// quantity: number
// }
export const ProductItem: FunctionComponent<Props> = (props) => {
  const [quantity, setQuantity] = useState<number>(1);
  return (
    <div className="card m-1 p-1 bg-light">
      <h4>
        {props.product.name}
        <span className="badge badge-pill badge-primary float-right">
          ${props.product.price.toFixed(2)}
        </span>
      </h4>
      <div className="card-text bg-white p-1">
        {props.product.description}
        <button
          className="btn btn-success btn-sm float-right"
          onClick={() => props.callback(props.product, quantity)}
        >
          Add To Cart
        </button>
        <select
          className="form-control-inline float-right m-1"
          onChange={(ev) => setQuantity(Number(ev.target.value))}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
        </select>
      </div>
    </div>
  );
};
```

> The choice between function and class components is a matter of personal preference, and both are fully supported by React. I tend to use classes because that’s the programming model that I am most used to, but both approaches have their merits and can be freely mixed in a project (Internet says that 99.9% times you should use function components).

## List categories component

This component has no state:

```tsx
import React, { Component } from "react";

interface Props {
  selected: string;
  categories: string[];
  selectCategory: (category: string) => void;
}

export class CategoryList extends Component<Props> {
  render() {
    return (
      <div>
        {["All", ...this.props.categories].map((c) => {
          let btnClass =
            this.props.selected === c ? "btn-primary" : "btn-secondary";
          return (
            <button
              key={c}
              className={`btn btn-block ${btnClass}`}
              onClick={() => this.props.selectCategory(c)}
            >
              {c}
            </button>
          );
        })}
      </div>
    );
  }
}
```

## Header component

```tsx
import React, { Component } from "react";
import { Order } from "./data/entities";

interface Props {
  order: Order;
}
export class Header extends Component<Props> {
  render() {
    let count = this.props.order.productCount;
    return (
      <div className="p-1 bg-secondary text-white text-right">
        {count === 0
          ? "(No Selection)"
          : `${count} product(s), $${this.props.order.total.toFixed(2)}`}
        <button className="btn btn-sm btn-primary m-1">Submit Order</button>
      </div>
    );
  }
}
```

## Composing

```tsx
import React, { Component } from "react";
import { Header } from "./header";
import { ProductItem } from "./productItem";
import { CategoryList } from "./categoryList";
import { Product, Order } from "./data/entities";

interface Props {
  products: Product[];
  categories: string[];
  order: Order;
  addToOrder: (product: Product, quantity: number) => void;
}

interface State {
  selectedCategory: string;
}

export class ProductList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedCategory: "All",
    };
  }

  render() {
    return (
      <div>
        <Header order={this.props.order} />
        <div className="container-fluid">
          <div className="row">
            <div className="col-3 p-2">
              <CategoryList
                categories={this.props.categories}
                selected={this.state.selectedCategory}
                selectCategory={this.selectCategory}
              />
            </div>
            <div className="col-9 p-2">
              {this.products.map((p) => (
                <ProductItem
                  key={p.id}
                  product={p}
                  callback={this.props.addToOrder}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  get products(): Product[] {
    return this.props.products.filter(
      (p) =>
        this.state.selectedCategory === "All" ||
        p.category === this.state.selectedCategory
    );
  }
  selectCategory = (cat: string) => {
    this.setState({ selectedCategory: cat });
  };
}
```

`App.tsx`:

```tsx
import React, { Component } from "react";
import { Product, Order } from "./data/entities";
import { ProductList } from "./productList";

let testData: Product[] = [1, 2, 3, 4, 5].map((num) => ({
  id: num,
  name: `Prod${num}`,
  category: `Cat${num % 2}`,
  description: `Product ${num}`,
  price: 100,
}));

interface Props {
  // no props required
}

interface State {
  order: Order;
}

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      order: new Order(),
    };
  }

  render = () => (
    <div className="App">
      <ProductList
        products={testData}
        categories={this.categories}
        order={this.state.order}
        addToOrder={this.addToOrder}
      />
    </div>
  );

  get categories(): string[] {
    return [...new Set(testData.map((p) => p.category))];
  }

  addToOrder = (product: Product, quantity: number) => {
    this.setState((state) => {
      state.order.addProduct(product, quantity);
      return state;
    });
  };
}
```

## Creating data store

Most `React` apps use data stores. Most popular data store library is `Redux`.

```bash
npm install redux@4.0.1
npm install react-redux@7.0.3
npm install --save-dev @types/react-redux
```

### Declare types

`src/data/types.ts`

```ts
import { Product, Order } from "./entities";
import { Action } from "redux";

export interface StoreData {
  products: Product[];
  order: Order;
}

export enum ACTIONS {
  ADD_PRODUCTS,
  MODIFY_ORDER,
  RESET_ORDER,
}

export interface AddProductsAction extends Action<ACTIONS.ADD_PRODUCTS> {
  payload: Product[];
}

export interface ModifyOrderAction extends Action<ACTIONS.MODIFY_ORDER> {
  payload: {
    product: Product;
    quantity: number;
  };
}

export interface ResetOrderAction extends Action<ACTIONS.RESET_ORDER> {}

export type StoreAction =
  | AddProductsAction
  | ModifyOrderAction
  | ResetOrderAction;
```

- `StoreData` interface describes data that store will manage
- `ACTIONS` each `enum` value is used as a type argument to the Action type
- The `Action` interface is extended to describe the characteristics of the object for each action type, some of which have a payload property that provides the data that will be required to apply the action.
- `StoreAction` is an intersection of action interfaces

`src/data/actionCreators.ts`

```ts
import {
  ACTIONS,
  AddProductsAction,
  ModifyOrderAction,
  ResetOrderAction,
} from "./types";
import { Product } from "./entities";

export const addProduct = (...products: Product[]): AddProductsAction => ({
  type: ACTIONS.ADD_PRODUCTS,
  payload: products,
});

export const modifyOrder = (
  product: Product,
  quantity: number
): ModifyOrderAction => ({
  type: ACTIONS.MODIFY_ORDER,
  payload: { product, quantity },
});

export const resetOrder = (): ResetOrderAction => ({
  type: ACTIONS.RESET_ORDER,
});
```

These functions act as a bridge between components and data store. Actions are processed by functions called `reducers`.

`src/data/reducers.ts`

```ts
import { ACTIONS, StoreData, StoreAction } from "./types";
import { Order } from "./entities";
import { Reducer } from "redux";

export const StoreReducer: Reducer<StoreData, StoreAction> = (
  data: StoreData | undefined,
  action
) => {
  data = data || { products: [], order: new Order() };

  switch (action.type) {
    case ACTIONS.ADD_PRODUCTS:
      return {
        ...data,
        products: [...data.products, ...action.payload],
      };

    case ACTIONS.MODIFY_ORDER:
      data.order.addProduct(action.payload.product, action.payload.quantity);
      return { ...data };

    case ACTIONS.RESET_ORDER:
      return {
        ...data,
        order: new Order(),
      };

    default:
      return data;
  }
};
```

> Enums are nice for switching!

`src/data/dataStore.ts`

```ts
import { createStore, Store } from "redux";
import { StoreReducer } from "./reducer";
import { StoreData, StoreAction } from "./types";
export const dataStore: Store<StoreData, StoreAction> =
  createStore(StoreReducer);
```

## HTTP request class

> Redux can support actions that handle HTTP requests. But this is simple example using Axios.

`src/data/httpHandler.ts`

```ts
import Axios from "axios";
import { Product, Order } from "./entities";
const protocol = "http";
const hostname = "localhost";
const port = 4600;
const urls = {
  products: `${protocol}://${hostname}:${port}/products`,
  orders: `${protocol}://${hostname}:${port}/orders`,
};

export class HttpHandler {
  loadProducts(callback: (products: Product[]) => void): void {
    Axios.get(urls.products).then((response) => callback(response.data));
  }
  storeOrder(order: Order, callback: (id: number) => void): void {
    let orderData = {
      lines: [...order.orderLines.values()].map((ol) => ({
        productId: ol.product.id,
        productName: ol.product.name,
        quantity: ol.quantity,
      })),
    };
    Axios.post(urls.orders, orderData).then((response) =>
      callback(response.data.id)
    );
  }
}
```

## Connecting data store to components

The `React-Redux` package is responsible for connecting data store with components.

`src/data/productListConnector.ts`

```ts
import { StoreData } from "./types";
import { modifyOrder } from "./actionCreators";
import { connect } from "react-redux";
import { ProductList } from "../productList";

const mapStateToProps = (data: StoreData) => ({
  products: data.products,
  categories: [...new Set(data.products.map((p) => p.category))],
  order: data.order,
});

const mapDispatchToProps = {
  addToOrder: modifyOrder,
};

const connectFunction = connect(mapStateToProps, mapDispatchToProps);
export const ConnectedProductList = connectFunction(ProductList);
```

Finished `App.tsx`:

```tsx
import React, { Component } from "react";
//import { Product, Order } from './data/entities';
//import { ProductList } from './productList';
import { dataStore } from "./data/dataStore";
import { Provider } from "react-redux";
import { HttpHandler } from "./data/httpHandler";
import { addProduct } from "./data/actionCreators";
import { ConnectedProductList } from "./data/productListConnector";

interface Props {
  // no props required
}

export default class App extends Component<Props> {
  private httpHandler = new HttpHandler();
  constructor(props: Props) {
    super(props);
    this.httpHandler.loadProducts((data) =>
      dataStore.dispatch(addProduct(...data))
    );
  }
  render = () => (
    <div className="App">
      <Provider store={dataStore}>
        <ConnectedProductList />
      </Provider>
    </div>
  );
  
  submitCallback = () => {
    console.log("Submit order");
  };
}
```
