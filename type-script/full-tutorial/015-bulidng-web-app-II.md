# Building web app II

Needed options:

| Name                     | Description                            |
| ------------------------ | -------------------------------------- |
| `emitDecoratorMetadata`  | include decorator metadata in JS files |
| `experimentalDecorators` | enable decorators                      |

## Adding a web service

`Axios` is popular and fully typed. Also, it supports `XmlHttpReques` if browser is older.

```bash
npm install axios@0.19.0
```

Remote version of data source:

```ts
import { AbstractDataSource } from "./abstractDataSource";
import { Product, Order } from "./entities";
import Axios from "axios";

const protocol = "http";
const hostname = "localhost";
const port = 4600;
const urls = {
  products: `${protocol}://${hostname}:${port}/products`,
  orders: `${protocol}://${hostname}:${port}/orders`,
};

export class RemoteDataSource extends AbstractDataSource {
  loadProducts(): Promise<Product[]> {
    return Axios.get(urls.products).then((response) => response.data);
  }

  storeOrder(): Promise<number> {
    let orderData = {
      lines: [...this.order.orderLines.values()].map((ol) => ({
        productId: ol.product.id,
        productName: ol.product.name,
        quantity: ol.quantity,
      })),
    };

    return Axios.post(urls.orders, orderData).then(
      (response) => response.data.id
    );
  }
}
```

## Using Decorators

Decorators come from Angular environment. They can be used also with Vue. Also, they are proposed as an addition to regular JavaScript.

First decorator:

```ts
export const minimumValue =
  (propName: string, min: number) =>
  (
    constructor: any,
    methodName: string,
    descriptor: PropertyDescriptor
  ): any => {
    const origFunction = descriptor.value;
    descriptor.value = async function wrapper(...args) {
      let results = await origFunction.apply(this, args);
      return results.map((r) => ({
        ...r,
        [propName]: r[propName] < min ? min : r[propName],
      }));
    };
  };
```

And example usage:

```ts
import { Product, Order } from "./entities";
import { minimumValue } from "../decorators";
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

  @minimumValue("price", 30)
  async getProducts(
    sortProp: ProductProp = "id",
    category?: string
  ): Promise<Product[]> {
    await this.loading;
    return this.selectProducts(this._products, sortProp, category);
  }
  // ...other methods omitted for brevity...
}
```

## Using Decorator Metadata

Decorator functions are invoked at runtime. They have no access to the type information from the TypeScript. To ease development TS can include metadata during compilation.

To emit metadata, you'll need a package:

```bash
npm install reflect-metadata@0.1.13
```

Metadata for a decorator applied to a method:

| Name                | Description                                                         |
| ------------------- | ------------------------------------------------------------------- |
| `design:type`       | To what decorator is applied to. In this example it will a Function |
| `design:paramtypes` | This item describes types of the function parameters                |
| `design:returntype` | Type of returned value (from the decorated function)                |

```ts
import "reflect-metadata";

export const addClass =
  (selector: string, ...classNames: string[]) =>
  (
    constructor: any,
    methodName: string,
    descriptor: PropertyDescriptor
  ): any => {
    if (
      Reflect.getMetadata("design:returntype", constructor, methodName) ===
      HTMLElement
    ) {
      const origFunction = descriptor.value;
      descriptor.value = function wrapper(...args) {
        let content: HTMLElement = origFunction.apply(this, args);
        content
          .querySelectorAll(selector)
          .forEach((elem) => classNames.forEach((c) => elem.classList.add(c)));
        return content;
      };
    }
  };
```

`reflect-metadata` package extends Reflect object. It adds `getMetadata` method.

Example usage:

```ts
import { createElement } from "./tools/jsxFactory";
import { Product } from "./data/entities";
import { ProductItem } from "./productItem";
import { CategoryList } from "./categoryList";
import { addClass } from "./decorators";

export class ProductList {
  props: {
    products: Product[];
    categories: string[];
    selectedCategory: string;
    addToOrderCallback?: (product: Product, quantity: number) => void;
    filterCallback?: (category: string) => void;
  };

  @addClass("select", "bg-info", "m-1")
  getContent(): HTMLElement {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 p-2">
            <CategoryList
              categories={this.props.categories}
              selectedCategory={this.props.selectedCategory}
              callback={this.props.filterCallback}
            />
          </div>
          <div className="col-9 p-2">
            {this.props.products.map((p) => (
              <ProductItem
                product={p}
                callback={this.props.addToOrderCallback}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
```

> Decorator is accessing function output and doing operations on it.

## Finishing app

Header class:

```jsx
import { createElement } from "./tools/jsxFactory";
import { Order } from "./data/entities";
export class Header {
  props: {
    order: Order,
    submitCallback: () => void,
  };
  getContent(): HTMLElement {
    let count = this.props.order.productCount;
    return (
      <div className="p-1 bg-secondary text-white text-right">
        {count === 0
          ? "(No Selection)"
          : `${count} product(s), $${this.props.order.total.toFixed(2)}`}
        <button
          className="btn btn-sm btn-primary m-1"
          onclick={this.props.submitCallback}
        >
          Submit Order
        </button>
      </div>
    );
  }
}
```

Order details class:

```jsx
import { createElement } from "./tools/jsxFactory";
import { Product, Order } from "./data/entities";
export class OrderDetails {
  props: {
    order: Order
    cancelCallback: () => void,
    submitCallback: () => void
  }
  getContent(): HTMLElement {
    return <div>
      <h3 className="text-center bg-primary text-white p-2">
      Order Summary
      </h3>
      <div className="p-3">
      <table className="table table-sm table-striped">
      <thead>
      <tr>
      <th>Quantity</th><th>Product</th>
      <th className="text-right">Price</th>
      <th className="text-right">Subtotal</th>
      </tr>
      </thead>
      <tbody>
      { this.props.order.orderLines.map(line =>
      <tr>
        <td>{ line.quantity }</td>
        <td>{ line.product.name }</td>
        <td className="text-right">
          ${ line.product.price.toFixed(2) }
        </td>
        <td className="text-right">
          ${ line.total.toFixed(2) }
        </td>
      </tr>
      )}
      </tbody>
      <tfoot>
      <tr>
      <th className="text-right" colSpan="3">Total:</th>
      <th className="text-right">
      ${ this.props.order.total.toFixed(2) }
      </th>
      </tr>
      </tfoot>
      </table>
      </div>
      <div className="text-center">
      <button className="btn btn-secondary m-1"
      onclick={ this.props.cancelCallback }>
      Back
      </button>
      <button className="btn btn-primary m-1"
      onclick={ this.props.submitCallback }>
      Submit Order
      </button>
      </div>
    </div>
  }
}
```

Confirmation class:

```jsx
import { createElement } from "./tools/jsxFactory";
export class Summary {
  props: {
    orderId: number,
    callback: () => void,
  };
  getContent(): HTMLElement {
    return (
      <div className="m-2 text-center">
        <h2>Thanks!</h2>
        <p>Thanks for placing your order.</p>
        <p>Your order is #{this.props.orderId}</p>
        <p>We'll ship your goods as soon as possible.</p>
        <button className="btn btn-primary" onclick={this.props.callback}>
          OK
        </button>
      </div>
    );
  }
}
```

## Completing app

```jsx
import { createElement } from "./tools/jsxFactory";
import { Product, Order } from "./data/entities";
import { AbstractDataSource } from "./data/abstractDataSource";
import { ProductList } from "./productList";
import { Header } from "./header";
import { OrderDetails } from "./orderDetails";
import { Summary } from "./summary";
enum DisplayMode {
  List, Details, Complete
}
export class HtmlDisplay {
  private containerElem: HTMLElement;
  private selectedCategory: string;
  private mode: DisplayMode = DisplayMode.List;
  private orderId: number;

  constructor() {
    this.containerElem = document.createElement("div");
  }

  props: {
    dataSource: AbstractDataSource;
  }

  async getContent(): Promise<HTMLElement> {
    await this.updateContent();
    return this.containerElem;
  }

  async updateContent() {
    let products = await this.props.dataSource.getProducts("id", this.selectedCategory);

    let categories = await this.props.dataSource.getCategories();
    this.containerElem.innerHTML = "";

    let contentElem: HTMLElement;

    switch (this.mode) {
      case DisplayMode.List:
        contentElem = this.getListContent(products, categories);
      break;
      case DisplayMode.Details:
        contentElem = <OrderDetails order={ this.props.dataSource.order }
        cancelCallback={ this.showList }
        submitCallback={ this.submitOrder } />
      break;
      case DisplayMode.Complete:
        contentElem = <Summary orderId={ this.orderId } callback= { this.showList } />
      break;
    }

    this.containerElem.appendChild(contentElem);
  }

  getListContent(products: Product[], categories: string[]): HTMLElement {
    return <div>
      <Header order={ this.props.dataSource.order }
      submitCallback={ this.showDetails } />

      <ProductList products={ products } categories={ categories }
        selectedCategory={ this.selectedCategory }
        addToOrderCallback={ this.addToOrder }
        filterCallback={ this.selectCategory} />
    </div>
  }

  addToOrder = (product: Product, quantity: number) => {
    this.props.dataSource.order.addProduct(product, quantity);
    this.updateContent();
  }

  selectCategory = (selected: string) => {
    this.selectedCategory = selected === "All" ? undefined : selected;
    this.updateContent();
  }

  showDetails = () => {
    this.mode = DisplayMode.Details;
    this.updateContent();
  }

  showList = () => {
    this.mode = DisplayMode.List;
    this.updateContent();
  }
  submitOrder = () => {
    this.props.dataSource.storeOrder().then(id => {
      this.orderId = id;
      this.props.dataSource.order = new Order();
      this.mode = DisplayMode.Complete;
      this.updateContent();
    });
  }
}
```

> It's a lot easier to use JS files when you're combining packages in your code. Use TypeScript for customized codebase.

## Containerizing the app

Create `deploy-package.json`:

```json
{
  "name": "webapp",
  "description": "Stand-Alone Web App",
  "repository": "https://github.com/Apress/essential-typescript",
  "license": "0BSD",
  "devDependencies": {
    "express": "4.16.4",
    "json-server": "0.14.2"
  }
}
```

> These are only packages required to run the container. All the rest are incorporated into bundle.

Create `Dockerfile`:

```Dockerfile
FROM node:12.0.0
RUN mkdir -p /usr/src/webapp
COPY dist /usr/src/webapp/dist
COPY assets /usr/src/webapp/assets
COPY data.json /usr/src/webapp/
COPY server.js /usr/src/webapp/
COPY deploy-package.json /usr/src/webapp/package.json
WORKDIR /usr/src/webapp
RUN echo 'package-lock=false' >> .npmrc
RUN npm install
EXPOSE 4000
CMD ["node", "server.js"]
```

Add `.dockerignore`:

```
node_modules
```

And build an image:

```bash
docker build . -t webapp -f Dockerfile
docker run -p 4000:4000 webapp
```