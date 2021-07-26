import { render } from "@wordpress/element";

import "./data";

import("./App.jsx").then(({ App }) =>
  render(<App />, document.getElementById(process.env.APP_ROOT_ID))
);
