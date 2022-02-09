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

403