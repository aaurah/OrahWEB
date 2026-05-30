"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

module.exports = import("pg");;

/***/ }),

/***/ "(rsc)/../../node_modules/.pnpm/next@14.2.29_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2Fhome%2Frunner%2Fworkspace%2Fartifacts%2Forahweb%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Frunner%2Fworkspace%2Fartifacts%2Forahweb&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/next@14.2.29_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2Fhome%2Frunner%2Fworkspace%2Fartifacts%2Forahweb%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Frunner%2Fworkspace%2Fartifacts%2Forahweb&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/../../node_modules/.pnpm/next@14.2.29_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/../../node_modules/.pnpm/next@14.2.29_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/../../node_modules/.pnpm/next@14.2.29_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_runner_workspace_artifacts_orahweb_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_home_runner_workspace_artifacts_orahweb_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__]);\n_home_runner_workspace_artifacts_orahweb_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"/home/runner/workspace/artifacts/orahweb/app/api/auth/[...nextauth]/route.ts\",\n    nextConfigOutput,\n    userland: _home_runner_workspace_artifacts_orahweb_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL25leHRAMTQuMi4yOV9yZWFjdC1kb21AMTguMy4xX3JlYWN0QDE4LjMuMV9fcmVhY3RAMTguMy4xL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvYnVpbGQvd2VicGFjay9sb2FkZXJzL25leHQtYXBwLWxvYWRlci5qcz9uYW1lPWFwcCUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGYXV0aCUyRiU1Qi4uLm5leHRhdXRoJTVEJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYXV0aCUyRiU1Qi4uLm5leHRhdXRoJTVEJTJGcm91dGUudHMmYXBwRGlyPSUyRmhvbWUlMkZydW5uZXIlMkZ3b3Jrc3BhY2UlMkZhcnRpZmFjdHMlMkZvcmFod2ViJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZob21lJTJGcnVubmVyJTJGd29ya3NwYWNlJTJGYXJ0aWZhY3RzJTJGb3JhaHdlYiZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDNEI7QUFDekc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpRUFBaUU7QUFDekU7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUN1SDs7QUFFdkgscUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Ad29ya3NwYWNlL29yYWh3ZWIvP2Q3YmYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL2hvbWUvcnVubmVyL3dvcmtzcGFjZS9hcnRpZmFjdHMvb3JhaHdlYi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvaG9tZS9ydW5uZXIvd29ya3NwYWNlL2FydGlmYWN0cy9vcmFod2ViL2FwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/../../node_modules/.pnpm/next@14.2.29_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2Fhome%2Frunner%2Fworkspace%2Fartifacts%2Forahweb%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Frunner%2Fworkspace%2Fartifacts%2Forahweb&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/../../node_modules/.pnpm/next-auth@4.24.14_next@14.2.29_react-dom@18.3.1_react@18.3.1__react@18.3.1__react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_auth__WEBPACK_IMPORTED_MODULE_1__]);\n_lib_auth__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(_lib_auth__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFpQztBQUNRO0FBRXpDLE1BQU1FLFVBQVVGLGdEQUFRQSxDQUFDQyxrREFBV0E7QUFFTyIsInNvdXJjZXMiOlsid2VicGFjazovL0B3b3Jrc3BhY2Uvb3JhaHdlYi8uL2FwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlLnRzP2M4YTQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoIGZyb20gXCJuZXh0LWF1dGhcIjtcbmltcG9ydCB7IGF1dGhPcHRpb25zIH0gZnJvbSBcIkAvbGliL2F1dGhcIjtcblxuY29uc3QgaGFuZGxlciA9IE5leHRBdXRoKGF1dGhPcHRpb25zKTtcblxuZXhwb3J0IHsgaGFuZGxlciBhcyBHRVQsIGhhbmRsZXIgYXMgUE9TVCB9O1xuIl0sIm5hbWVzIjpbIk5leHRBdXRoIiwiYXV0aE9wdGlvbnMiLCJoYW5kbGVyIiwiR0VUIiwiUE9TVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/../../node_modules/.pnpm/next-auth@4.24.14_next@14.2.29_react-dom@18.3.1_react@18.3.1__react@18.3.1__react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/db */ \"(rsc)/./lib/db.ts\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_2__]);\n_lib_db__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\nconst authOptions = {\n    session: {\n        strategy: \"jwt\"\n    },\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) return null;\n                const user = await (0,_lib_db__WEBPACK_IMPORTED_MODULE_2__.findUserByEmail)(credentials.email);\n                if (!user) return null;\n                const isValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().compare(credentials.password, user.password_hash);\n                if (!isValid) return null;\n                await (0,_lib_db__WEBPACK_IMPORTED_MODULE_2__.updateLastLogin)(credentials.email);\n                return {\n                    id: String(user.id),\n                    name: user.name,\n                    email: user.email,\n                    role: user.role\n                };\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.role = user.role;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (session.user) {\n                session.user.role = token.role;\n                session.user.id = token.sub ?? \"\";\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\"\n    },\n    secret: process.env.NEXTAUTH_SECRET ?? \"orahweb-dev-secret-change-in-production\"\n};\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNrRTtBQUNwQztBQUM4QjtBQUVyRCxNQUFNSSxjQUErQjtJQUMxQ0MsU0FBUztRQUNQQyxVQUFVO0lBQ1o7SUFDQUMsV0FBVztRQUNUUCwyRUFBbUJBLENBQUM7WUFDbEJRLE1BQU07WUFDTkMsYUFBYTtnQkFDWEMsT0FBTztvQkFBRUMsT0FBTztvQkFBU0MsTUFBTTtnQkFBUTtnQkFDdkNDLFVBQVU7b0JBQUVGLE9BQU87b0JBQVlDLE1BQU07Z0JBQVc7WUFDbEQ7WUFDQSxNQUFNRSxXQUFVTCxXQUFXO2dCQUN6QixJQUFJLENBQUNBLGFBQWFDLFNBQVMsQ0FBQ0QsYUFBYUksVUFBVSxPQUFPO2dCQUUxRCxNQUFNRSxPQUFPLE1BQU1iLHdEQUFlQSxDQUFDTyxZQUFZQyxLQUFLO2dCQUNwRCxJQUFJLENBQUNLLE1BQU0sT0FBTztnQkFFbEIsTUFBTUMsVUFBVSxNQUFNZix1REFBYyxDQUFDUSxZQUFZSSxRQUFRLEVBQUVFLEtBQUtHLGFBQWE7Z0JBQzdFLElBQUksQ0FBQ0YsU0FBUyxPQUFPO2dCQUVyQixNQUFNYix3REFBZUEsQ0FBQ00sWUFBWUMsS0FBSztnQkFFdkMsT0FBTztvQkFDTFMsSUFBSUMsT0FBT0wsS0FBS0ksRUFBRTtvQkFDbEJYLE1BQU1PLEtBQUtQLElBQUk7b0JBQ2ZFLE9BQU9LLEtBQUtMLEtBQUs7b0JBQ2pCVyxNQUFNTixLQUFLTSxJQUFJO2dCQUNqQjtZQUNGO1FBQ0Y7S0FDRDtJQUNEQyxXQUFXO1FBQ1QsTUFBTUMsS0FBSSxFQUFFQyxLQUFLLEVBQUVULElBQUksRUFBRTtZQUN2QixJQUFJQSxNQUFNO2dCQUNSUyxNQUFNSCxJQUFJLEdBQUcsS0FBNEJBLElBQUk7WUFDL0M7WUFDQSxPQUFPRztRQUNUO1FBQ0EsTUFBTW5CLFNBQVEsRUFBRUEsT0FBTyxFQUFFbUIsS0FBSyxFQUFFO1lBQzlCLElBQUluQixRQUFRVSxJQUFJLEVBQUU7Z0JBQ2ZWLFFBQVFVLElBQUksQ0FBdUJNLElBQUksR0FBR0csTUFBTUgsSUFBSTtnQkFDcERoQixRQUFRVSxJQUFJLENBQXFCSSxFQUFFLEdBQUdLLE1BQU1DLEdBQUcsSUFBSTtZQUN0RDtZQUNBLE9BQU9wQjtRQUNUO0lBQ0Y7SUFDQXFCLE9BQU87UUFDTEMsUUFBUTtJQUNWO0lBQ0FDLFFBQVFDLFFBQVFDLEdBQUcsQ0FBQ0MsZUFBZSxJQUFJO0FBQ3pDLEVBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Ad29ya3NwYWNlL29yYWh3ZWIvLi9saWIvYXV0aC50cz9iZjdlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgTmV4dEF1dGhPcHRpb25zIH0gZnJvbSBcIm5leHQtYXV0aFwiO1xuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHNcIjtcbmltcG9ydCBiY3J5cHQgZnJvbSBcImJjcnlwdGpzXCI7XG5pbXBvcnQgeyBmaW5kVXNlckJ5RW1haWwsIHVwZGF0ZUxhc3RMb2dpbiB9IGZyb20gXCJAL2xpYi9kYlwiO1xuXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnM6IE5leHRBdXRoT3B0aW9ucyA9IHtcbiAgc2Vzc2lvbjoge1xuICAgIHN0cmF0ZWd5OiBcImp3dFwiLFxuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcbiAgICAgIG5hbWU6IFwiQ3JlZGVudGlhbHNcIixcbiAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgIGVtYWlsOiB7IGxhYmVsOiBcIkVtYWlsXCIsIHR5cGU6IFwiZW1haWxcIiB9LFxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogXCJQYXNzd29yZFwiLCB0eXBlOiBcInBhc3N3b3JkXCIgfSxcbiAgICAgIH0sXG4gICAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMpIHtcbiAgICAgICAgaWYgKCFjcmVkZW50aWFscz8uZW1haWwgfHwgIWNyZWRlbnRpYWxzPy5wYXNzd29yZCkgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IGZpbmRVc2VyQnlFbWFpbChjcmVkZW50aWFscy5lbWFpbCk7XG4gICAgICAgIGlmICghdXNlcikgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgY29uc3QgaXNWYWxpZCA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKGNyZWRlbnRpYWxzLnBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkX2hhc2gpO1xuICAgICAgICBpZiAoIWlzVmFsaWQpIHJldHVybiBudWxsO1xuXG4gICAgICAgIGF3YWl0IHVwZGF0ZUxhc3RMb2dpbihjcmVkZW50aWFscy5lbWFpbCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpZDogU3RyaW5nKHVzZXIuaWQpLFxuICAgICAgICAgIG5hbWU6IHVzZXIubmFtZSxcbiAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgICByb2xlOiB1c2VyLnJvbGUsXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgIH0pLFxuICBdLFxuICBjYWxsYmFja3M6IHtcbiAgICBhc3luYyBqd3QoeyB0b2tlbiwgdXNlciB9KSB7XG4gICAgICBpZiAodXNlcikge1xuICAgICAgICB0b2tlbi5yb2xlID0gKHVzZXIgYXMgeyByb2xlPzogc3RyaW5nIH0pLnJvbGU7XG4gICAgICB9XG4gICAgICByZXR1cm4gdG9rZW47XG4gICAgfSxcbiAgICBhc3luYyBzZXNzaW9uKHsgc2Vzc2lvbiwgdG9rZW4gfSkge1xuICAgICAgaWYgKHNlc3Npb24udXNlcikge1xuICAgICAgICAoc2Vzc2lvbi51c2VyIGFzIHsgcm9sZT86IHN0cmluZyB9KS5yb2xlID0gdG9rZW4ucm9sZSBhcyBzdHJpbmc7XG4gICAgICAgIChzZXNzaW9uLnVzZXIgYXMgeyBpZD86IHN0cmluZyB9KS5pZCA9IHRva2VuLnN1YiA/PyBcIlwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlc3Npb247XG4gICAgfSxcbiAgfSxcbiAgcGFnZXM6IHtcbiAgICBzaWduSW46IFwiL2xvZ2luXCIsXG4gIH0sXG4gIHNlY3JldDogcHJvY2Vzcy5lbnYuTkVYVEFVVEhfU0VDUkVUID8/IFwib3JhaHdlYi1kZXYtc2VjcmV0LWNoYW5nZS1pbi1wcm9kdWN0aW9uXCIsXG59O1xuIl0sIm5hbWVzIjpbIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJiY3J5cHQiLCJmaW5kVXNlckJ5RW1haWwiLCJ1cGRhdGVMYXN0TG9naW4iLCJhdXRoT3B0aW9ucyIsInNlc3Npb24iLCJzdHJhdGVneSIsInByb3ZpZGVycyIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJ1c2VyIiwiaXNWYWxpZCIsImNvbXBhcmUiLCJwYXNzd29yZF9oYXNoIiwiaWQiLCJTdHJpbmciLCJyb2xlIiwiY2FsbGJhY2tzIiwiand0IiwidG9rZW4iLCJzdWIiLCJwYWdlcyIsInNpZ25JbiIsInNlY3JldCIsInByb2Nlc3MiLCJlbnYiLCJORVhUQVVUSF9TRUNSRVQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/db.ts":
/*!*******************!*\
  !*** ./lib/db.ts ***!
  \*******************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createUser: () => (/* binding */ createUser),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   findUserByEmail: () => (/* binding */ findUserByEmail),\n/* harmony export */   getAllUsers: () => (/* binding */ getAllUsers),\n/* harmony export */   initDb: () => (/* binding */ initDb),\n/* harmony export */   updateLastLogin: () => (/* binding */ updateLastLogin)\n/* harmony export */ });\n/* harmony import */ var pg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pg */ \"pg\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([pg__WEBPACK_IMPORTED_MODULE_0__]);\npg__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst pool = new pg__WEBPACK_IMPORTED_MODULE_0__.Pool({\n    connectionString: process.env.DATABASE_URL,\n    ssl: process.env.DATABASE_URL?.includes(\"localhost\") ? false : {\n        rejectUnauthorized: false\n    }\n});\nasync function initDb() {\n    await pool.query(`\n    CREATE TABLE IF NOT EXISTS orahweb_users (\n      id          SERIAL PRIMARY KEY,\n      name        TEXT NOT NULL,\n      email       TEXT NOT NULL UNIQUE,\n      password_hash TEXT NOT NULL,\n      role        TEXT NOT NULL DEFAULT 'user',\n      verified    BOOLEAN NOT NULL DEFAULT false,\n      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),\n      last_login  TIMESTAMPTZ\n    );\n  `);\n    const existing = await pool.query(\"SELECT id FROM orahweb_users WHERE email = $1\", [\n        \"admin@orahweb.com\"\n    ]);\n    if (existing.rowCount === 0) {\n        const bcrypt = await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! bcryptjs */ \"bcryptjs\", 23));\n        const hash = await bcrypt.hash(\"OrahAdmin2025!\", 10);\n        await pool.query(`INSERT INTO orahweb_users (name, email, password_hash, role, verified)\n       VALUES ($1, $2, $3, $4, $5)`, [\n            \"Admin\",\n            \"admin@orahweb.com\",\n            hash,\n            \"admin\",\n            true\n        ]);\n    }\n}\nasync function findUserByEmail(email) {\n    await initDb();\n    const result = await pool.query(\"SELECT id, name, email, password_hash, role, verified FROM orahweb_users WHERE email = $1\", [\n        email.toLowerCase().trim()\n    ]);\n    return result.rows[0] ?? null;\n}\nasync function createUser(name, email, passwordHash) {\n    await initDb();\n    const result = await pool.query(`INSERT INTO orahweb_users (name, email, password_hash, role, verified)\n     VALUES ($1, $2, $3, 'user', false)\n     RETURNING id, name, email, role`, [\n        name.trim(),\n        email.toLowerCase().trim(),\n        passwordHash\n    ]);\n    return result.rows[0];\n}\nasync function getAllUsers() {\n    await initDb();\n    const result = await pool.query(`SELECT id, name, email, role, verified,\n            TO_CHAR(created_at, 'Mon DD, YYYY') AS joined,\n            last_login\n     FROM orahweb_users\n     ORDER BY created_at ASC`);\n    return result.rows;\n}\nasync function updateLastLogin(email) {\n    await pool.query(\"UPDATE orahweb_users SET last_login = NOW() WHERE email = $1\", [\n        email.toLowerCase().trim()\n    ]);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (pool);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvZGIudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUEwQjtBQUUxQixNQUFNQyxPQUFPLElBQUlELG9DQUFJQSxDQUFDO0lBQ3BCRSxrQkFBa0JDLFFBQVFDLEdBQUcsQ0FBQ0MsWUFBWTtJQUMxQ0MsS0FBS0gsUUFBUUMsR0FBRyxDQUFDQyxZQUFZLEVBQUVFLFNBQVMsZUFBZSxRQUFRO1FBQUVDLG9CQUFvQjtJQUFNO0FBQzdGO0FBRU8sZUFBZUM7SUFDcEIsTUFBTVIsS0FBS1MsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7Ozs7O0VBV2xCLENBQUM7SUFFRCxNQUFNQyxXQUFXLE1BQU1WLEtBQUtTLEtBQUssQ0FDL0IsaURBQ0E7UUFBQztLQUFvQjtJQUV2QixJQUFJQyxTQUFTQyxRQUFRLEtBQUssR0FBRztRQUMzQixNQUFNQyxTQUFTLE1BQU0sc0hBQWtCO1FBQ3ZDLE1BQU1DLE9BQU8sTUFBTUQsT0FBT0MsSUFBSSxDQUFDLGtCQUFrQjtRQUNqRCxNQUFNYixLQUFLUyxLQUFLLENBQ2QsQ0FBQztrQ0FDMkIsQ0FBQyxFQUM3QjtZQUFDO1lBQVM7WUFBcUJJO1lBQU07WUFBUztTQUFLO0lBRXZEO0FBQ0Y7QUFFTyxlQUFlQyxnQkFBZ0JDLEtBQWE7SUFDakQsTUFBTVA7SUFDTixNQUFNUSxTQUFTLE1BQU1oQixLQUFLUyxLQUFLLENBQzdCLDZGQUNBO1FBQUNNLE1BQU1FLFdBQVcsR0FBR0MsSUFBSTtLQUFHO0lBRTlCLE9BQU9GLE9BQU9HLElBQUksQ0FBQyxFQUFFLElBQUk7QUFDM0I7QUFFTyxlQUFlQyxXQUFXQyxJQUFZLEVBQUVOLEtBQWEsRUFBRU8sWUFBb0I7SUFDaEYsTUFBTWQ7SUFDTixNQUFNUSxTQUFTLE1BQU1oQixLQUFLUyxLQUFLLENBQzdCLENBQUM7O29DQUUrQixDQUFDLEVBQ2pDO1FBQUNZLEtBQUtILElBQUk7UUFBSUgsTUFBTUUsV0FBVyxHQUFHQyxJQUFJO1FBQUlJO0tBQWE7SUFFekQsT0FBT04sT0FBT0csSUFBSSxDQUFDLEVBQUU7QUFDdkI7QUFFTyxlQUFlSTtJQUNwQixNQUFNZjtJQUNOLE1BQU1RLFNBQVMsTUFBTWhCLEtBQUtTLEtBQUssQ0FDN0IsQ0FBQzs7Ozs0QkFJdUIsQ0FBQztJQUUzQixPQUFPTyxPQUFPRyxJQUFJO0FBQ3BCO0FBRU8sZUFBZUssZ0JBQWdCVCxLQUFhO0lBQ2pELE1BQU1mLEtBQUtTLEtBQUssQ0FDZCxnRUFDQTtRQUFDTSxNQUFNRSxXQUFXLEdBQUdDLElBQUk7S0FBRztBQUVoQztBQUVBLGlFQUFlbEIsSUFBSUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL0B3b3Jrc3BhY2Uvb3JhaHdlYi8uL2xpYi9kYi50cz8xZGYwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBvb2wgfSBmcm9tIFwicGdcIjtcblxuY29uc3QgcG9vbCA9IG5ldyBQb29sKHtcbiAgY29ubmVjdGlvblN0cmluZzogcHJvY2Vzcy5lbnYuREFUQUJBU0VfVVJMLFxuICBzc2w6IHByb2Nlc3MuZW52LkRBVEFCQVNFX1VSTD8uaW5jbHVkZXMoXCJsb2NhbGhvc3RcIikgPyBmYWxzZSA6IHsgcmVqZWN0VW5hdXRob3JpemVkOiBmYWxzZSB9LFxufSk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0RGIoKSB7XG4gIGF3YWl0IHBvb2wucXVlcnkoYFxuICAgIENSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIG9yYWh3ZWJfdXNlcnMgKFxuICAgICAgaWQgICAgICAgICAgU0VSSUFMIFBSSU1BUlkgS0VZLFxuICAgICAgbmFtZSAgICAgICAgVEVYVCBOT1QgTlVMTCxcbiAgICAgIGVtYWlsICAgICAgIFRFWFQgTk9UIE5VTEwgVU5JUVVFLFxuICAgICAgcGFzc3dvcmRfaGFzaCBURVhUIE5PVCBOVUxMLFxuICAgICAgcm9sZSAgICAgICAgVEVYVCBOT1QgTlVMTCBERUZBVUxUICd1c2VyJyxcbiAgICAgIHZlcmlmaWVkICAgIEJPT0xFQU4gTk9UIE5VTEwgREVGQVVMVCBmYWxzZSxcbiAgICAgIGNyZWF0ZWRfYXQgIFRJTUVTVEFNUFRaIE5PVCBOVUxMIERFRkFVTFQgTk9XKCksXG4gICAgICBsYXN0X2xvZ2luICBUSU1FU1RBTVBUWlxuICAgICk7XG4gIGApO1xuXG4gIGNvbnN0IGV4aXN0aW5nID0gYXdhaXQgcG9vbC5xdWVyeShcbiAgICBcIlNFTEVDVCBpZCBGUk9NIG9yYWh3ZWJfdXNlcnMgV0hFUkUgZW1haWwgPSAkMVwiLFxuICAgIFtcImFkbWluQG9yYWh3ZWIuY29tXCJdXG4gICk7XG4gIGlmIChleGlzdGluZy5yb3dDb3VudCA9PT0gMCkge1xuICAgIGNvbnN0IGJjcnlwdCA9IGF3YWl0IGltcG9ydChcImJjcnlwdGpzXCIpO1xuICAgIGNvbnN0IGhhc2ggPSBhd2FpdCBiY3J5cHQuaGFzaChcIk9yYWhBZG1pbjIwMjUhXCIsIDEwKTtcbiAgICBhd2FpdCBwb29sLnF1ZXJ5KFxuICAgICAgYElOU0VSVCBJTlRPIG9yYWh3ZWJfdXNlcnMgKG5hbWUsIGVtYWlsLCBwYXNzd29yZF9oYXNoLCByb2xlLCB2ZXJpZmllZClcbiAgICAgICBWQUxVRVMgKCQxLCAkMiwgJDMsICQ0LCAkNSlgLFxuICAgICAgW1wiQWRtaW5cIiwgXCJhZG1pbkBvcmFod2ViLmNvbVwiLCBoYXNoLCBcImFkbWluXCIsIHRydWVdXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmluZFVzZXJCeUVtYWlsKGVtYWlsOiBzdHJpbmcpIHtcbiAgYXdhaXQgaW5pdERiKCk7XG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHBvb2wucXVlcnkoXG4gICAgXCJTRUxFQ1QgaWQsIG5hbWUsIGVtYWlsLCBwYXNzd29yZF9oYXNoLCByb2xlLCB2ZXJpZmllZCBGUk9NIG9yYWh3ZWJfdXNlcnMgV0hFUkUgZW1haWwgPSAkMVwiLFxuICAgIFtlbWFpbC50b0xvd2VyQ2FzZSgpLnRyaW0oKV1cbiAgKTtcbiAgcmV0dXJuIHJlc3VsdC5yb3dzWzBdID8/IG51bGw7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVVc2VyKG5hbWU6IHN0cmluZywgZW1haWw6IHN0cmluZywgcGFzc3dvcmRIYXNoOiBzdHJpbmcpIHtcbiAgYXdhaXQgaW5pdERiKCk7XG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHBvb2wucXVlcnkoXG4gICAgYElOU0VSVCBJTlRPIG9yYWh3ZWJfdXNlcnMgKG5hbWUsIGVtYWlsLCBwYXNzd29yZF9oYXNoLCByb2xlLCB2ZXJpZmllZClcbiAgICAgVkFMVUVTICgkMSwgJDIsICQzLCAndXNlcicsIGZhbHNlKVxuICAgICBSRVRVUk5JTkcgaWQsIG5hbWUsIGVtYWlsLCByb2xlYCxcbiAgICBbbmFtZS50cmltKCksIGVtYWlsLnRvTG93ZXJDYXNlKCkudHJpbSgpLCBwYXNzd29yZEhhc2hdXG4gICk7XG4gIHJldHVybiByZXN1bHQucm93c1swXTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFsbFVzZXJzKCkge1xuICBhd2FpdCBpbml0RGIoKTtcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgcG9vbC5xdWVyeShcbiAgICBgU0VMRUNUIGlkLCBuYW1lLCBlbWFpbCwgcm9sZSwgdmVyaWZpZWQsXG4gICAgICAgICAgICBUT19DSEFSKGNyZWF0ZWRfYXQsICdNb24gREQsIFlZWVknKSBBUyBqb2luZWQsXG4gICAgICAgICAgICBsYXN0X2xvZ2luXG4gICAgIEZST00gb3JhaHdlYl91c2Vyc1xuICAgICBPUkRFUiBCWSBjcmVhdGVkX2F0IEFTQ2BcbiAgKTtcbiAgcmV0dXJuIHJlc3VsdC5yb3dzO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlTGFzdExvZ2luKGVtYWlsOiBzdHJpbmcpIHtcbiAgYXdhaXQgcG9vbC5xdWVyeShcbiAgICBcIlVQREFURSBvcmFod2ViX3VzZXJzIFNFVCBsYXN0X2xvZ2luID0gTk9XKCkgV0hFUkUgZW1haWwgPSAkMVwiLFxuICAgIFtlbWFpbC50b0xvd2VyQ2FzZSgpLnRyaW0oKV1cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcG9vbDtcbiJdLCJuYW1lcyI6WyJQb29sIiwicG9vbCIsImNvbm5lY3Rpb25TdHJpbmciLCJwcm9jZXNzIiwiZW52IiwiREFUQUJBU0VfVVJMIiwic3NsIiwiaW5jbHVkZXMiLCJyZWplY3RVbmF1dGhvcml6ZWQiLCJpbml0RGIiLCJxdWVyeSIsImV4aXN0aW5nIiwicm93Q291bnQiLCJiY3J5cHQiLCJoYXNoIiwiZmluZFVzZXJCeUVtYWlsIiwiZW1haWwiLCJyZXN1bHQiLCJ0b0xvd2VyQ2FzZSIsInRyaW0iLCJyb3dzIiwiY3JlYXRlVXNlciIsIm5hbWUiLCJwYXNzd29yZEhhc2giLCJnZXRBbGxVc2VycyIsInVwZGF0ZUxhc3RMb2dpbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/db.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next@14.2.29_react-dom@18.3.1_react@18.3.1__react@18.3.1","vendor-chunks/next-auth@4.24.14_next@14.2.29_react-dom@18.3.1_react@18.3.1__react@18.3.1__react-dom@18.3.1_react@18.3.1__react@18.3.1","vendor-chunks/@babel+runtime@7.29.2","vendor-chunks/jose@4.15.9","vendor-chunks/openid-client@5.7.1","vendor-chunks/uuid@8.3.2","vendor-chunks/oauth@0.9.15","vendor-chunks/@panva+hkdf@1.2.1","vendor-chunks/yallist@4.0.0","vendor-chunks/preact-render-to-string@5.2.6_preact@10.29.2","vendor-chunks/preact@10.29.2","vendor-chunks/oidc-token-hash@5.2.0","vendor-chunks/object-hash@2.2.0","vendor-chunks/lru-cache@6.0.0","vendor-chunks/cookie@0.7.2"], () => (__webpack_exec__("(rsc)/../../node_modules/.pnpm/next@14.2.29_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=%2Fhome%2Frunner%2Fworkspace%2Fartifacts%2Forahweb%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2Fhome%2Frunner%2Fworkspace%2Fartifacts%2Forahweb&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();