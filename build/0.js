(window["webpackJsonp_node_http_server"] = window["webpackJsonp_node_http_server"] || []).push([[0],{

/***/ "20Eb":
/*!*****************************!*\
  !*** ./lib/scenes/index.js ***!
  \*****************************/
/*! exports provided: importScenes, useActiveScene, useScenes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "importScenes", function() { return importScenes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useActiveScene", function() { return useActiveScene; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useScenes", function() { return useScenes; });
/* harmony import */ var _lib_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! /lib/data */ "PbM+");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../node_modules/react-refresh/runtime.js */ "rxaT");
__webpack_require__.$Refresh$.setup(module.i);

var _s = __webpack_require__.$Refresh$.signature(),
    _s2 = __webpack_require__.$Refresh$.signature();


const importScenes = async (...names) => Promise.all(names.map(async name => {
  console.log("MAP", name);
  const {
    default: Scene
  } = await !(function webpackMissingModule() { var e = new Error("Cannot find module 'undefined'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
  if (!Scene.displayName) Scene.displayName = name;
  return Scene;
}));
const useActiveScene = (scenes, {
  selector,
  action,
  initial
}) => {
  _s();

  const {
    setActiveSceneName
  } = Object(_lib_data__WEBPACK_IMPORTED_MODULE_0__["useDispatch"])();
  const {
    active_scene_name
  } = Object(_lib_data__WEBPACK_IMPORTED_MODULE_0__["useSelect"])(select => (selector !== null && selector !== void 0 ? selector : select("sazerac/core").getActiveSceneName)());
  const dispatchAction = action !== null && action !== void 0 ? action : setActiveSceneName;
  return Object(_lib_data__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    const index = Object.keys(scenes).indexOf(active_scene_name);

    const setActiveScene = scene_name_index => {
      let name;

      switch (typeof scene_name_index) {
        case "number":
          name = scenes[Object.keys(scenes)[scene_name_index]].name;
          break;

        case "string":
          name = scene_name_index;
          break;

        case "object":
          name = scene_name_index.name;
          break;

        default:
          throw new TypeError("Unkown scene resolvable.");
      }

      dispatchAction(name);
    };

    return {
      name: active_scene_name,
      index,
      scene: scenes[active_scene_name],
      setActiveScene,
      set: setActiveScene
    };
  }, [scenes, active_scene_name, dispatchAction]);
};

_s(useActiveScene, "v9JDmkcSMm2fV1q+EqFSX5tjR2w=", false, function () {
  return [_lib_data__WEBPACK_IMPORTED_MODULE_0__["useDispatch"], _lib_data__WEBPACK_IMPORTED_MODULE_0__["useSelect"]];
});

const useScenes = (...scenes_or_names) => {
  _s2();

  const [scenes, setScenes] = Object(_lib_data__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  const setScene = Object(_lib_data__WEBPACK_IMPORTED_MODULE_0__["useCallback"])((name, scene) => {
    if (!name) name = scene.displayName;
    setScenes({ ...scenes,
      [name]: scene
    });
    return scene;
  }, [scenes]);
  const loadScene = Object(_lib_data__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(async scene_or_name => {
    let scene = Object.entries(scenes).find(([name, scene]) => [name, scene, scene.displayName].includes(scene_or_name));
    if (scene) return scene;

    if ("string" === typeof scene_or_name) {
      try {
        [scene] = await importScenes(scene_or_name);
        return setScene(scene, scene_or_name);
      } catch (err) {
        console.error(`No such scene: "${scene_or_name}" :: ${err}`);
        return;
      }
    }

    return setScene(scene);
  }, [setScene, scenes]);
  Object(_lib_data__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    for (const scene_or_name of scenes_or_names) {
      loadScene(scene_or_name);
    }
  }, [scenes_or_names, loadScene]);
  return {
    scenes,
    set: setScene
  };
};

_s2(useScenes, "HzntiadJZCWysKdvW+J0YfkYsEg=");

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

/***/ }),

/***/ "GDc7":
/*!*****************!*\
  !*** ./App.jsx ***!
  \*****************/
/*! exports provided: App */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "ptdL");
/* harmony import */ var _lib_scenes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! /lib/scenes */ "20Eb");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ "h3ov");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../node_modules/react-refresh/runtime.js */ "rxaT");
__webpack_require__.$Refresh$.setup(module.i);

var _s = __webpack_require__.$Refresh$.signature();




function App() {
  _s();

  const {
    scenes
  } = Object(_lib_scenes__WEBPACK_IMPORTED_MODULE_1__["useScenes"])("BlockEditor");
  const active_scene = Object(_lib_scenes__WEBPACK_IMPORTED_MODULE_1__["useActiveScene"])(scenes);
  console.log("APP RENDER", scenes);
  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "app"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("header", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("h2", null, "Berlin Editor", active_scene && `: ${active_scene.name}`)), Object.entries(scenes).map(Scene => Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(Scene, {
    key: Scene.displayName
  })));
}

_s(App, "nsoYTRa7JZrlhr982WT7a7WklcI=", false, function () {
  return [_lib_scenes__WEBPACK_IMPORTED_MODULE_1__["useScenes"], _lib_scenes__WEBPACK_IMPORTED_MODULE_1__["useActiveScene"]];
});

_c = App;

var _c;

__webpack_require__.$Refresh$.register(_c, "App");

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

/***/ }),

/***/ "h3ov":
/*!********************!*\
  !*** ./style.scss ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1626720816380
      var cssReload = __webpack_require__(/*! ../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "qPyx")(module.i, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ })

}]);
//# sourceMappingURL=0.js.map