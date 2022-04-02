# Building a React app II

## Configuring routing

```
npm install react-router-dom@5.0.1
npm install --save-dev @types/react-router-dom
```

Example routing code:

```tsx
import React, { Component } from "react";
import { dataStore } from "./data/dataStore";
import { Provider } from "react-redux";
import { HttpHandler } from "./data/httpHandler";
import { addProduct } from "./data/actionCreators";
import { ConnectedProductList } from "./data/productListConnector";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";

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
        <BrowserRouter>
          <Switch>
            <Route path="/products" component={ConnectedProductList} />
            <Redirect to="/products" />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}
```

> Notice `Redirect` component provides a fallback when no route matches. It's like a default in switch conditional statement.

Example how to create route links:

```tsx
import React, { Component } from "react";
import { Order } from "./data/entities";
import { NavLink } from "react-router-dom";
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
        <NavLink to="/order" className="btn btn-sm btn-primary m-1">
          Submit Order
        </NavLink>
      </div>
    );
  }
}
```

## Order summary

`orderDetails.tsx`

```tsx
import React, { Component } from "react";
import { StoreData } from "./data/types";
import { Order } from "./data/entities";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const mapStateToProps = (data: StoreData) => ({
  order: data.order,
});

interface Props {
  order: Order;
  submitCallback: () => void;
}

const connectFunction = connect(mapStateToProps);

export const OrderDetails = connectFunction(
  class extends Component<Props> {
    render() {
      return (
        <div>
          <h3 className="text-center bg-primary text-white p-2">
            Order Summary
          </h3>
          <div className="p-3">
            <table className="table table-sm table-striped">
              <thead>
                <tr>
                  <th>Quantity</th>
                  <th>Product</th>
                  <th className="text-right">Price</th>
                  <th className="text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {this.props.order.orderLines.map((line) => (
                  <tr key={line.product.id}>
                    <td>{line.quantity}</td>
                    <td>{line.product.name}</td>
                    <td className="text-right">
                      ${line.product.price.toFixed(2)}
                    </td>
                    <td className="text-right">${line.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th className="text-right" colSpan={3}>
                    Total:
                  </th>
                  <th className="text-right">
                    ${this.props.order.total.toFixed(2)}
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="text-center">
            <NavLink to="/products" className="btn btn-secondary m-1">
              Back
            </NavLink>
            <button
              className="btn btn-primary m-1"
              onClick={this.props.submitCallback}
            >
              Submit Order
            </button>
          </div>
        </div>
      );
    }
  }
);
```

> This component uses hardwired Redux connector. It cannot be used outside a data store scope.

## Confirmation component

```tsx
import React, { Component } from "react";
import { match } from "react-router";
import { NavLink } from "react-router-dom";
interface Params {
  id: string;
}
interface Props {
  match: match<Params>;
}
export class Summary extends Component<Props> {
  render() {
    let id = this.props.match.params.id;
    return (
      <div className="m-2 text-center">
        <h2>Thanks!</h2>
        <p>Thanks for placing your order.</p>
        <p>Your order is #{id}</p>
        <p>We'll ship your goods as soon as possible.</p>
        <NavLink to="/products" className="btn btn-primary">
          OK
        </NavLink>
      </div>
    );
  }
}
```

> Match takes variables from URL (using React router).

## Completing routing configuration

`App.tsx`

```tsx
import React, { Component } from "react";
import { dataStore } from "./data/dataStore";
import { Provider } from "react-redux";
import { HttpHandler } from "./data/httpHandler";
import { addProduct } from "./data/actionCreators";
import { ConnectedProductList } from "./data/productListConnector";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter,
  RouteComponentProps,
} from "react-router-dom";
import { OrderDetails } from "./orderDetails";
import { Summary } from "./summary";

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
        <BrowserRouter>
          <Switch>
            <Route path="/products" component={ConnectedProductList} />
            <Route
              path="/order"
              render={(props) => (
                <OrderDetails
                  {...props}
                  submitCallback={() => this.submitCallback(props)}
                />
              )}
            />
            <Route path="/summary/:id" component={Summary} />
            <Redirect to="/products" />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
  submitCallback = (routeProps: RouteComponentProps) => {
    this.httpHandler.storeOrder(dataStore.getState().order, (id) =>
      routeProps.history.push(`/summary/${id}`)
    );
  };
}
```

## Deploying app

```
npm install --save-dev express@4.16.4
npm install --save-dev connect-history-api-fallback@1.6.0
```

> Second packages maps requests to `index.html`

### Server

`server.js`

```js
const express = require("express");
const jsonServer = require("json-server");
const history = require("connect-history-api-fallback");

const app = express();
app.use(history());
app.use("/", express.static("build"));
const router = jsonServer.router("data.json");
app.use(jsonServer.bodyParser);
app.use("/api", (req, resp, next) => router(req, resp, next));
const port = process.argv[3] || 4002;
app.listen(port, () => console.log(`Running on port ${port}`));
```

## Containerization

Create `deploy-package.json`:

```json
{
  "name": "reactapp",
  "description": "React Web App",
  "repository": "https://github.com/Apress/essential-typescript",
  "license": "0BSD",
  "devDependencies": {
    "express": "4.16.4",
    "json-server": "0.14.2",
    "connect-history-api-fallback": "1.6.0"
  }
}
```

> This is a package description for `server.js`.

Add `dockerfile`:

```dockerfile
FROM node:12.0.0
RUN mkdir -p /usr/src/reactapp
COPY build /usr/src/reactapp/build/
COPY data.json /usr/src/reactapp/
COPY server.js /usr/src/reactapp/
COPY deploy-package.json /usr/src/reactapp/package.json
WORKDIR /usr/src/reactapp
RUN echo 'package-lock=false' >> .npmrc
RUN npm install
EXPOSE 4002
CMD ["node", "server.js"]
```

Add `.dockerignore` with `node_modules` to speedup build process.

Finally, build:

```
docker build . -t reactapp -f Dockerfile
```

And run:

```
docker run -p 4002:4002 reactapp
```

FIN