(window["webpackJsonp_node_http_server"] = window["webpackJsonp_node_http_server"] || []).push([[1],{

/***/ "GDc7":
/*!*****************!*\
  !*** ./App.jsx ***!
  \*****************/
/*! exports provided: useScenes, App, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useScenes", function() { return useScenes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "ptdL");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "h3ov");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ../node_modules/react-refresh/runtime.js */ "rxaT");
__webpack_require__.$Refresh$.setup(module.i);

var _s = __webpack_require__.$Refresh$.signature(),
    _s2 = __webpack_require__.$Refresh$.signature();





const loadScenes = async (...names) => Promise.all(names.map(async name => {
  console.log("MAP", name);
  const {
    default: Scene
  } = await __webpack_require__("zydq")(`./${name}/index.jsx`);
  if (!Scene.displayName) Scene.displayName = name;
  return Scene;
}));

const useScenes = (...scenes_or_names) => {
  _s();

  const [scenes, setScenes] = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["useState"])({});
  Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    (async () => {
      for (const scene_or_name of scenes_or_names) {
        getScene(scene_or_name);
      }
    })();
  }, [scenes_or_names]);

  const getScene = async scene_or_name => {
    let scene = Object.entries(scenes).find(([name, scene]) => [name, scene, scene.displayName].includes(scene_or_name));
    if (scene) return scene;

    if ("string" === typeof scene_or_name) {
      try {
        [scene] = await loadScenes(scene_or_name);
        return setScene(scene, scene_or_name);
      } catch (err) {
        console.error(`No such scene: "${scene_or_name}" :: ${err}`);
        return;
      }
    }

    return setScene(scene);
  };

  const setScene = (scene, name) => {
    if (!name) name = scene.displayName;
    setScenes({
      [name]: scene
    });
    return scene;
  };

  return {
    scenes,
    getScene,
    get: getScene,
    setScene,
    set: setScene
  };
};

_s(useScenes, "3Cg0qwfb22N5e8zLZUxPGOHWRVs=");

function App() {
  _s2();

  const {
    scenes
  } = useScenes("BlockEditor");
  /*   const [scenes, setScenes] = useState({});
    useEffect(() => {
    (async () => {
      const { default: scene } = await import("./scenes/BlockEditor");
        setScenes({ [scene.displayName]: scene });
    })();
  }, []); */

  console.log("APP RENDER", scenes);
  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", {
    className: "app"
  }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("header", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("h2", null, "Berlin Editor")), Object.values(scenes).map(Scene => Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(Scene, {
    key: Scene.displayName
  })));
}

_s2(App, "1R41xH6om+1igwDaWfof0Ymh0e8=", false, function () {
  return [useScenes];
});

_c = App;
/* harmony default export */ __webpack_exports__["default"] = (App);
/* export default () => (
  <div className="app">
    <h1>{process.env.SANDBOX_URL}</h1>
  </div>
); */

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
      // 1625874927886
      var cssReload = __webpack_require__(/*! ../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "qPyx")(module.i, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "zydq":
/*!***********************************************************!*\
  !*** ./scenes lazy ^\.\/.*\/index\.jsx$ namespace object ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./BlockEditor/index.jsx": [
		"TEK6",
		"vendor~.._node_modules_@b",
		"vendor~.._node_modules_@t",
		"vendor~.._node_modules_@wordpress_blob",
		"vendor~.._node_modules_@wordpress_block-editor_b",
		"vendor~.._node_modules_@wordpress_block-editor_build-module_components_d",
		"vendor~.._node_modules_@wordpress_block-editor_build-module_h",
		"vendor~.._node_modules_@wordpress_block-library_build-module_a",
		"vendor~.._node_modules_@wordpress_block-library_build-module_l",
		"vendor~.._node_modules_@wordpress_block-library_build-module_m",
		"vendor~.._node_modules_@wordpress_block-serialization-default-parser_build-module_index.js~42942e7d",
		"vendor~.._node_modules_@wordpress_blocks_build-module_a",
		"vendor~.._node_modules_@wordpress_blocks_node_modules_uuid_dist_esm-browser_i",
		"vendor~.._node_modules_@wordpress_c",
		"vendor~.._node_modules_@wordpress_components_build-module_a",
		"vendor~.._node_modules_@wordpress_components_build-module_f",
		"vendor~.._node_modules_@wordpress_components_build-module_i",
		"vendor~.._node_modules_@wordpress_components_build-module_p",
		"vendor~.._node_modules_@wordpress_components_build-module_s",
		"vendor~.._node_modules_@wordpress_components_node_modules_uuid_dist_esm-browser_i",
		"vendor~.._node_modules_@wordpress_compose_build-module_h",
		"vendor~.._node_modules_@wordpress_i",
		"vendor~.._node_modules_@wordpress_wa",
		"vendor~.._node_modules_a",
		"vendor~.._node_modules_airbnb-prop-types_b",
		"vendor~.._node_modules_events_events.js~84164f07",
		"vendor~.._node_modules_f",
		"vendor~.._node_modules_h",
		"vendor~.._node_modules_hi",
		"vendor~.._node_modules_i",
		"vendor~.._node_modules_lodash_lodash.js~f6f6baa5",
		"vendor~.._node_modules_me",
		"vendor~.._node_modules_moment_locale_a",
		"vendor~.._node_modules_moment_moment.js~4e22a0c6",
		"vendor~.._node_modules_mousetrap_m",
		"vendor~.._node_modules_na",
		"vendor~.._node_modules_o",
		"vendor~.._node_modules_p",
		"vendor~.._node_modules_r",
		"vendor~.._node_modules_re-resizable_lib_i",
		"vendor~.._node_modules_react-a",
		"vendor~.._node_modules_reakit-s",
		"vendor~.._node_modules_reakit_es_B",
		"vendor~.._node_modules_redux_es_redux.js~7276dfad",
		"vendor~.._node_modules_t",
		0
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "zydq";
module.exports = webpackAsyncContext;

/***/ })

}]);
//# sourceMappingURL=1.js.map