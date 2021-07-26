const path = require("path");

const dotenv = require("dotenv");
const { HotModuleReplacementPlugin } = require("webpack");
const DotenvWebpackPlugin = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const { error: env_error } = dotenv.config();

if (env_error) {
  console.log("Loading ./.env.defaults.");

  dotenv.config({ path: path.resolve(__dirname, ".env.defaults") });
}

const config = require("@wordpress/scripts/config/webpack.config.js");

const {
  SANDBOX_URL,
  SANDBOX_PORT,
  WP_LIVE_RELOAD_PORT,
  WEBPACK_DEV_SERVER,
  APP_ROOT_ID,
  WDS_CONTROL_HOST,
  WDS_CONTROL_PORT
} = process.env;

const sandbox_host = SANDBOX_URL.match(/([^./]+\.)+[^/]+/)[0];
const sandbox_port = Number(SANDBOX_PORT);

const getSandboxPortHost = (port, host = sandbox_host) =>
  host
    .split(".")
    .map((part, i, { length }) => (i === length - 1 ? `${part}:${port}` : part))
    .join(".");

const getSandboxPortOrigin = (port) => getSandboxPortHost(port, SANDBOX_URL);

const is_development = config.mode === "development";
const is_dev_server = !!WEBPACK_DEV_SERVER;
const livereload_origin = getSandboxPortOrigin(WP_LIVE_RELOAD_PORT);
const wds_control_host = WDS_CONTROL_HOST || sandbox_host;
const wds_control_port = Number(WDS_CONTROL_PORT);

console.log({
  SANDBOX_URL,
  sandbox_host,
  livereload_origin,
  wds_control_host,
  wds_control_port
});

if (is_development) {
  console.log("Configuring Development Environment...");

  config.devServer = {
    contentBase: path.join(__dirname, "build"),
    //watchContentBase: true,
    writeToDisk: true,
    /*     host: sandbox_host,
    port: sandbox_port,
    sockHost: wds_control_host,
    sockPort: wds_control_port, */
    hot: true,
    //inline: true,
    port: 8080,
    disableHostCheck: true,
    host: "0.0.0.0",
    public: "0.0.0.0:0"
    //injectHot: true,
    //liveReload: false,
    //injectClient: true,
    //public: `${sandbox_host}:${sandbox_port}`,
    //publicPath: "/",
    //overlay: true
  };
}

config.context = path.resolve(__dirname, "src");

config.entry = {
  ...config.entry,

  reactRefreshSetup:
    "@pmmmwh/react-refresh-webpack-plugin/client/ReactRefreshEntry.js"

  /*   BlockEditor: path.resolve(
    __dirname,
    "src",
    "scenes",
    "BlockEditor",
    "index.js"
  ) */
};

config.plugins = [
  new DotenvWebpackPlugin({
    defaults: true,
    systemvars: true
  }),

  new HtmlWebpackPlugin({
    filename: path.resolve(__dirname, "build/index.html"),
    template: path.resolve(__dirname, "src/index.html"),
    livereload_origin,
    app_root_id: APP_ROOT_ID
  }),

  ...config.plugins.reduce((plugins, plugin) => {
    switch (plugin.constructor.name) {
      case "DependencyExtractionWebpackPlugin":
      case "LiveReloadPlugin":
      case "FixStyleWebpackPlugin":
        return plugins;

      default:
        break;
    }

    plugins.push(plugin);

    return plugins;
  }, []),

  new HotModuleReplacementPlugin(),

  new ReactRefreshWebpackPlugin({
    overlay: {
      sockHost: wds_control_host,
      sockPort: wds_control_port
    }
  })
];

config.module.rules = [
  ...config.module.rules.map((rule) => {
    if (rule.test.toString() === "/\\.jsx?$/") {
      rule.resolve = {
        extensions: [".js", ".jsx"]
      };

      rule.use[1].options = {
        ...rule.use[1].options,

        cacheCompression: false,
        plugins: [require.resolve("react-refresh/babel")]
      };
    }

    return rule;
  })
];

config.optimization = {
  ...config.optimization,

  moduleIds: "hashed",
  runtimeChunk: "single",
  splitChunks: {
    ...config.optimization.splitChunks,

    cacheGroups: {
      //...config.optimization.splitChunks.cacheGroups,

      vendor: {
        test: /^[\\/]?sandbox[\\/]node_modules[\\/]/,
        name: "vendor",
        maxSize: 512 * 1000,
        chunks: "all"
      }
    }
  }
};

config.externals = {
  react: "React",
  "react-dom": "ReactDOM"
};

module.exports = config;
