webpackHotUpdate("index",{

/***/ "17aF":
/*!***********************************************!*\
  !*** ./data/core/slices/root/scenes/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ../node_modules/babel-loader/lib/index.js):\nSyntaxError: /sandbox/src/data/core/slices/root/scenes/index.js: Identifier 'options' has already been declared. (64:35)\n\n\u001b[0m \u001b[90m 62 |\u001b[39m })\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 63 |\u001b[39m\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 64 |\u001b[39m \u001b[36mexport\u001b[39m \u001b[36mconst\u001b[39m createSlice2 \u001b[33m=\u001b[39m (name\u001b[33m,\u001b[39m options \u001b[33m=\u001b[39m {}) \u001b[33m=>\u001b[39m {\u001b[0m\n\u001b[0m \u001b[90m    |\u001b[39m                                    \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 65 |\u001b[39m   \u001b[36mconst\u001b[39m {\u001b[0m\n\u001b[0m \u001b[90m 66 |\u001b[39m     initial_state\u001b[33m,\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 67 |\u001b[39m     selectors\u001b[33m,\u001b[39m\u001b[0m\n    at Object._raise (/sandbox/node_modules/@babel/parser/lib/index.js:816:17)\n    at Object.raiseWithData (/sandbox/node_modules/@babel/parser/lib/index.js:809:17)\n    at Object.raise (/sandbox/node_modules/@babel/parser/lib/index.js:770:17)\n    at ScopeHandler.checkRedeclarationInScope (/sandbox/node_modules/@babel/parser/lib/index.js:1425:12)\n    at ScopeHandler.declareName (/sandbox/node_modules/@babel/parser/lib/index.js:1405:14)\n    at Object.checkLVal (/sandbox/node_modules/@babel/parser/lib/index.js:10428:24)\n    at Object.checkLVal (/sandbox/node_modules/@babel/parser/lib/index.js:10459:14)\n    at Object.checkParams (/sandbox/node_modules/@babel/parser/lib/index.js:12022:12)\n    at Object.<anonymous> (/sandbox/node_modules/@babel/parser/lib/index.js:11998:14)\n    at Object.parseBlockOrModuleBlockBody (/sandbox/node_modules/@babel/parser/lib/index.js:13146:23)");

/***/ }),

/***/ "XG2G":
/*!****************************************!*\
  !*** ./data/core/slices/root/index.js ***!
  \****************************************/
/*! exports provided: scenes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony import */ var _scenes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scenes */ "17aF");
/* harmony import */ var _scenes__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scenes__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "scenes", function() { return _scenes__WEBPACK_IMPORTED_MODULE_1__; });
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../node_modules/react-refresh/runtime.js */ "rxaT");
__webpack_require__.$Refresh$.setup(module.i);




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
//# sourceMappingURL=index.867aa7533444e61e779e.hot-update.js.map