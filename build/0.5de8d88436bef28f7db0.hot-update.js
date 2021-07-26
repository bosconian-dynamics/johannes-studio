webpackHotUpdate(0,{

/***/ "PbM+":
/*!***************************!*\
  !*** ./lib/data/index.js ***!
  \***************************/
/*! exports provided: withSelect, withDispatch, withRegistry, RegistryProvider, RegistryConsumer, useRegistry, useSelect, useDispatch, AsyncModeProvider, createRegistry, createRegistrySelector, createRegistryControl, controls, createReduxStore, plugins, select, resolveSelect, dispatch, subscribe, registerGenericStore, registerStore, use, register, createStore, combineReducers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combineReducers", function() { return combineReducers; });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "OgwO");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withSelect", function() { return _wordpress_data__WEBPACK_IMPORTED_MODULE_0__["withSelect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withDispatch", function() { return _wordpress_data__WEBPACK_IMPORTED_MODULE_0__["withDispatch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withRegistry", function() { return _wordpress_data__WEBPACK_IMPORTED_MODULE_0__["withRegistry"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RegistryProvider", function() { return _wordpress_data__WEBPACK_IMPORTED_MODULE_0__["RegistryProvider"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RegistryConsumer", function() { return _wordpress_data__WEBPACK_IMPORTED_MODULE_0__["RegistryConsumer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useRegistry", function() { return _wordpress_data__WEBPACK_IMPORTED_MODULE_0__["useRegistry"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useSelect", function() { return _wordpress_data__WEBPACK_IMPORTED_MODULE_0__["useSelect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useDispatch", function() { return _wordpress_data__WEBPACK_IMPORTED_MODULE_0__["useDispatch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AsyncModeProvider", function() { return _wordpress_data__WEBPACK_IMPORTED_MODULE_0__["AsyncModeProvider"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createRegistry", function() { return _wordpress_data__WEBPACK_IMPORTED_MODULE_0__["createRegistry"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createRegistrySelector", function() { return _wordpress_data__WEBPACK_IMPORTED_MODULE_0__["createRegistrySelector"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createRegistryControl", function() { return _wordpress_data__WEBPACK_IMPORTED_MODULE_0__["createRegistryControl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "controls", function() { return _wordpress_data__WEBPACK_IMPORTED_MODULE_0__["controls"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createReduxStore", function() { return _wordpress_data__WEBPACK_IMPORTED_MODULE_0__["createReduxStore"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "plugins", function() { return _wordpress_data__WEBPACK_IMPORTED_MODULE_0__["plugins"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "select", function() { return _wordpress_data__WEBPACK_IMPORTED_MODULE_0__["select"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "resolveSelect", function() { return _wordpress_data__WEBPACK_IMPORTED_MODULE_0__["resolveSelect"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dispatch", function() { return _wordpress_data__WEBPACK_IMPORTED_MODULE_0__["dispatch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "subscribe", function() { return _wordpress_data__WEBPACK_IMPORTED_MODULE_0__["subscribe"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "registerGenericStore", function() { return _wordpress_data__WEBPACK_IMPORTED_MODULE_0__["registerGenericStore"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "registerStore", function() { return _wordpress_data__WEBPACK_IMPORTED_MODULE_0__["registerStore"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "use", function() { return _wordpress_data__WEBPACK_IMPORTED_MODULE_0__["use"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "register", function() { return _wordpress_data__WEBPACK_IMPORTED_MODULE_0__["register"]; });

/* harmony import */ var _store_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store.js */ "epVH");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createStore", function() { return _store_js__WEBPACK_IMPORTED_MODULE_1__["createStore"]; });

__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../node_modules/react-refresh/runtime.js */ "rxaT");
__webpack_require__.$Refresh$.setup(module.i);


 //export * from "./repo.js";


const combineReducers = (...reducer_maps) => {
  const reducer_map = reducer_maps.length > 1 ? Object.assign({}, ...reducer_maps) : reducer_maps[0];
  if (!reducer_map) return state => state;

  for (const [key, reducer] in Object.entries(reducer_map)) {
    if ("object" === typeof reducer) reducer_map[key] = combineReducers(reducer);
  }

  return Object(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(reducer_map);
};

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ../node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "VW41"), __webpack_require__(/*! ../node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "ncQx")))

/***/ })

})
//# sourceMappingURL=0.5de8d88436bef28f7db0.hot-update.js.map