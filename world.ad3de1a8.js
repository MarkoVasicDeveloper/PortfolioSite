// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"8rGkk":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "39abf40bad3de1a8";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"erJS4":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * World class handles everything that lives INSIDE the scene.
 * Models, Lights, Environment, etc.
 */ parcelHelpers.export(exports, "World", ()=>World);
var _three = require("three");
var _assets = require("../config/assets");
var _shaderRegistry = require("../shader/shaderRegistry");
var _uniforms = require("../shader/uniforms");
var _projectPanel = require("./projectPanel");
var _configIndex = require("../config/configIndex");
var _road = require("./road");
var _background = require("./background");
var _textManager = require("./textManager");
var _heroStageBuilder = require("../infrastructure/three/diorama/hero/heroStageBuilder");
var _frogCharacter = require("./frogCharacter");
var _frogTriggerConfig = require("../config/frogTriggerConfig");
class World {
    /**
   * @param {import('../core/sceneManager').SceneManager} sceneManager
   * @param {import('../core/assetManager').AssetManager} assetManager
   */ constructor(sceneManager, assetManager){
        /** @type {import('../core/sceneManager').SceneManager} */ this.sceneManager = sceneManager;
        /** @type {import('../core/assetManager').AssetManager} */ this.assetManager = assetManager;
        /** * Collection of active ProjectPanel instances.
     * @type {ProjectPanel[]}
     */ this.projectPanels = [];
        /** @type {Road} */ this.road = new (0, _road.Road)(this.sceneManager);
        /** @type {TextManager} */ this.textManager = new (0, _textManager.TextManager)(this.sceneManager, this.assetManager);
        /** @type {number} */ this._lastTime = 0;
        /** @type {string|null} */ this._previousZoneId = null;
        /** @type {FrogCharacter|null} */ this.frog = null;
        /** @type {HeroStageBuilder|null} */ this.stageBuilder = null;
        /** @type {Background|null} */ this.fogBackground = null;
        this._init();
    }
    /**
   * Internal initialization sequence.
   * @private
   * @returns {void}
   */ _init() {
        this._setupLights();
        this._addStaticModels();
        this._addProjectPanels();
        this._addBackground();
    }
    /** * Initializes ambient and directional lighting for the world.
   * @private
   * @returns {void}
   */ _setupLights() {
        const ambientalLight = new _three.AmbientLight(0xffffff, 0.6);
        this.sceneManager.add(ambientalLight);
        const hemisphereLight = new _three.HemisphereLight(0xeeeeff, 0x444444, 0.8);
        hemisphereLight.position.set(0, 20, 0);
        this.sceneManager.add(hemisphereLight);
    }
    /**
   * Iterates through asset configurations to instantiate, transform,
   * and inject static 3D models into the active scene.
   * @private
   * @returns {void}
   */ _addStaticModels() {
        (0, _assets.ASSET_CONFIG).models.forEach((config)=>{
            const asset = this.assetManager.models[config.name];
            if (!asset) return;
            if (config.name === "frog") {
                this._addFrogCharacter(asset, config);
                return;
            }
            const model = asset.scene || asset;
            this._applyTransforms(model, config.transform);
            this._applyShaders(model, config);
            if (config.name === "office") this._setupHeroDiorama(model);
            this.sceneManager.add(model);
        });
    }
    /**
   * Instantiates and configures the Frog character entity.
   * @param {Object} frogAsset - Raw graphic asset.
   * @param {Object} config - Asset transformation configuration.
   * @private
   * @returns {void}
   */ _addFrogCharacter(frogAsset, config) {
        this.frog = new (0, _frogCharacter.FrogCharacter)(frogAsset, this.sceneManager.camera, (0, _frogTriggerConfig.FROG_TRIGGER_CONFIG));
        this._applyTransforms(this.frog.container, config.transform);
        this.sceneManager.add(this.frog.container);
    }
    /**
   * Applies spatial transformations to a 3D target node.
   * @param {THREE.Object3D} model - Target 3D object container.
   * @param {Object} transform - Transformation parameters.
   * @private
   * @returns {void}
   */ _applyTransforms(model, transform) {
        if (!transform) return;
        const { position, scale, rotation } = transform;
        if (position) model.position.set(...position);
        if (scale) model.scale.set(...scale);
        if (rotation) model.rotation.set(...rotation);
    }
    /**
   * Traverses the model hierarchy and injects custom shader materials.
   * @param {THREE.Object3D} model - Target 3D hierarchy.
   * @param {Object} config - Configuration object containing keys for shaders and uniforms.
   * @private
   * @returns {void}
   */ _applyShaders(model, config) {
        if (!config.shader || !(0, _uniforms.SHADER_UNIFORMS)[config.uniforms]) return;
        const shaderData = (0, _shaderRegistry.SHADER_REGISTRY)[config.shader];
        model.traverse((child)=>{
            if (child.isMesh) child.material = new _three.ShaderMaterial({
                vertexShader: shaderData.vertex,
                fragmentShader: shaderData.fragment,
                uniforms: (0, _uniforms.SHADER_UNIFORMS)[config.uniforms]
            });
        });
    }
    /**
   * Initial setup and alignment for the Hero office diorama environment.
   * @param {THREE.Object3D} asset - Loaded office model context.
   * @private
   * @returns {void}
   */ _setupHeroDiorama(asset) {
        this.stageBuilder = new (0, _heroStageBuilder.HeroStageBuilder)(this.sceneManager, asset);
        this.stageBuilder.build();
        this.stageBuilder.alignLightsToModel();
        this._setOfficeVisibility(true);
    }
    /**
   * Dispatches explicit visibility states to the office scene bounds and associated shadow lights.
   * @param {boolean} visible - Target visibility flag state.
   * @private
   * @returns {void}
   */ _setOfficeVisibility(visible) {
        if (!this.stageBuilder) return;
        if (this.stageBuilder.officeScene) this.stageBuilder.officeScene.visible = visible;
        if (this.stageBuilder.neonBlueLight) this.stageBuilder.neonBlueLight.visible = visible;
        if (this.stageBuilder.topLight) this.stageBuilder.topLight.visible = visible;
    }
    /**
   * Instantiates project panels based on PANEL_CONFIG.
   * Maps loaded textures to shader uniforms and positions panels in space.
   * @private
   * @returns {void}
   */ _addProjectPanels() {
        (0, _configIndex.PANEL_CONFIG).forEach((config)=>{
            const shaderData = (0, _shaderRegistry.SHADER_REGISTRY)[config.shaderKey];
            const uniforms = (0, _uniforms.SHADER_UNIFORMS)[config.uniforms];
            const loadedTexture = this.assetManager.textures[config.id];
            if (loadedTexture && uniforms.image) uniforms.image.value = loadedTexture;
            const panel = new (0, _projectPanel.ProjectPanel)(config, shaderData, uniforms, this.assetManager);
            panel.position.set(...config.transform.position);
            panel.rotation.set(...config.transform.rotation);
            panel.scale.set(...config.transform.scale);
            this.projectPanels.push(panel);
            this.sceneManager.add(panel);
        });
    }
    /**
   * Initializes the background fog system and adds it to the persistent background scene.
   * @private
   * @returns {void}
   */ _addBackground() {
        this.fogBackground = new (0, _background.Background)((0, _shaderRegistry.SHADER_REGISTRY).fog, (0, _uniforms.SHADER_UNIFORMS).fog);
        this.sceneManager.addBackground(this.fogBackground);
    }
    /**
   * Main update loop for the world.
   * Updates global shader uniforms and processes dynamic zone transitions.
   * @param {number} elapsedTime - Total time since application start in seconds.
   * @returns {void}
   */ update(elapsedTime) {
        const deltaTime = elapsedTime - this._lastTime;
        this._lastTime = elapsedTime;
        this.road.update(elapsedTime);
        Object.values((0, _uniforms.SHADER_UNIFORMS)).forEach((u)=>{
            if (u.time) u.time.value = elapsedTime;
        });
        this.projectPanels.forEach((panel)=>panel.update(elapsedTime));
        if (this.frog) {
            this.frog.update(deltaTime);
            if (this.frog.currentZoneId !== this._previousZoneId) {
                this._previousZoneId = this.frog.currentZoneId;
                const isInsideOffice = this.frog.currentZoneId === "main_zone";
                this._setOfficeVisibility(isInsideOffice);
            }
        }
    }
    /**
   * Cleans up all resources, geometry and materials to prevent browser memory leaks.
   * @returns {void}
   */ dispose() {
        this.road.dispose();
        this.fogBackground.dispose();
        this.projectPanels.forEach((panel)=>panel.dispose());
        this.sceneManager.scene.traverse((child)=>{
            if (child.isMesh) {
                child.geometry.dispose();
                if (Array.isArray(child.material)) child.material.forEach((m)=>m.dispose());
                else child.material.dispose();
            }
        });
        this.projectPanels = [];
        if (this.frog) this.frog.dispose();
    }
    /**
   * Fetches path positioning spline navigation points data.
   * @type {Array<THREE.Vector3>}
   */ get points() {
        return this.road.points;
    }
}

},{"three":"dsoTF","../config/assets":"3dV1G","../shader/shaderRegistry":"kkTYQ","../shader/uniforms":"4DYXe","./projectPanel":"7Rayp","../config/configIndex":"dTXpe","./road":"f8KEX","./background":"2ez3R","./textManager":"3xMhv","../infrastructure/three/diorama/hero/heroStageBuilder":"fElKW","./frogCharacter":"gGtiF","../config/frogTriggerConfig":"3SxCb","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"kkTYQ":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SHADER_REGISTRY", ()=>SHADER_REGISTRY);
var _matrix = require("./fragment/matrix");
var _matrix1 = require("./vertex/matrix");
var _plane = require("./fragment/plane");
var _plane1 = require("./vertex/plane");
var _road = require("./vertex/road");
var _road1 = require("./fragment/road");
var _underwater = require("./vertex/underwater");
var _underwater1 = require("./fragment/underwater");
var _fog = require("./fragment/fog");
var _fog1 = require("./vertex/fog");
const SHADER_REGISTRY = {
    matrix: {
        vertex: (0, _matrix1.matrixVertex),
        fragment: (0, _matrix.matrixFragment)
    },
    plane: {
        vertex: (0, _plane1.planeVertex),
        fragment: (0, _plane.planeFragment)
    },
    road: {
        vertex: (0, _road.roadVertex),
        fragment: (0, _road1.roadFragment)
    },
    underwater: {
        vertex: (0, _underwater.underwaterVertex),
        fragment: (0, _underwater1.underwaterFragment)
    },
    fog: {
        vertex: (0, _fog1.fogVertex),
        fragment: (0, _fog.fogFragment)
    }
};

},{"./fragment/matrix":"3iu2V","./vertex/matrix":"bOwuz","./fragment/plane":"1NPuB","./vertex/plane":"4Ghe2","./vertex/road":"jokzI","./fragment/road":"fsSjp","./vertex/underwater":"iszWB","./fragment/underwater":"bGejD","./fragment/fog":"egZX5","./vertex/fog":"1bo3d","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"3iu2V":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "matrixFragment", ()=>matrixFragment);
const matrixFragment = `
precision highp float;
precision highp int;

uniform float time;
uniform float speed;

uniform vec2 charSize;
uniform float charResolution;
uniform vec3 color;
uniform vec2 resolution;

varying vec2 vUv;

float seed = 2.0;

float random( float x ) {
    return fract( sin( x ) * 43758.5453 );
}

float random( vec2 st ) {
    return fract( sin( dot( st.xy, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 );
}

float randomChar( vec2 outer, vec2 inner ) {
    vec2 margin = 1.0 - charSize;
    vec2 borders = step( margin, inner ) * step( margin, 1.0 - inner );
    return step(
        0.5,
        random( outer * seed + floor( inner * charResolution ) )
    ) * borders.x * borders.y;
}

vec4 matrix( vec2 st ) {
    float rows = 50.0;
    vec2 ipos = floor( st * rows ) + vec2( 1.0, 0.0 );

    ipos += vec2( 0.0, floor( time * speed * random( ipos.x ) ) );

    vec2 fpos = fract( st * rows );
    vec2 center = 0.5 - fpos;

    float pct = random( ipos );
    float glow = ( 1.0 - dot(center,center) * 3.0 ) * 2.0;

    float result = randomChar( ipos, fpos ) * pct * glow;
    return vec4( color * result, result );
}

void main() {
    
	vec2 st = vUv * resolution;
	gl_FragColor = vec4(.0, .0, .0, 1.) + matrix( st );
	
}
`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"bOwuz":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "matrixVertex", ()=>matrixVertex);
const matrixVertex = `
precision highp float;
precision highp int;

varying vec2 vUv;

void main() {

    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

}
`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"1NPuB":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "planeFragment", ()=>planeFragment);
const planeFragment = `
varying vec2 vUv;
uniform sampler2D image;
uniform float hover;
uniform float time;

void main() {
    vec2 uv = vUv;

    float shift = hover * 0.012 * sin(time * 2.0);
    
    float r = texture2D(image, uv + vec2(shift, 0.0)).r;
    float g = texture2D(image, uv).g;
    float b = texture2D(image, uv - vec2(shift, 0.0)).b;
    
    vec3 color = vec3(r, g, b);

    float edgeGlow = pow(1.0 - vUv.x, 3.0) * 0.4;
    float topBottomGlow = pow(1.0 - vUv.y, 3.0) * 0.2 + pow(vUv.y, 3.0) * 0.2;
    
    color += (edgeGlow + topBottomGlow) * hover;

    float dist = distance(gl_PointCoord, vec2(0.5));
    float alpha = smoothstep(0.5, 0.4, dist);

    if (alpha < 0.1) discard;

    gl_FragColor = vec4(color, alpha);
}
`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"4Ghe2":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "planeVertex", ()=>planeVertex);
const planeVertex = `
varying vec2 vUv;

attribute float aRandom;

uniform float time;
uniform float hover;

void main() {
    vUv = uv;
    vec3 pos = position;

    float anchor = 1.0 - vUv.x; 
    float wave = sin(pos.x * 0.2 + time * 2.0) * 0.8;
    
    wave += cos(pos.y * 0.15 + time * 1.2) * 0.3;

    pos.z += wave * anchor;
    pos.z += sin(time * 10.0 * aRandom) * hover * 0.2 * anchor;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    
    float pulse = 1.0 + (hover * 0.15 * sin(time * 3.0));
    gl_PointSize = 40.0 * pulse * (1.0 / -mvPosition.z);
    
    gl_Position = projectionMatrix * mvPosition;
}
`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"jokzI":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "roadVertex", ()=>roadVertex);
const roadVertex = `
varying vec2 vUv;
varying float vDirection;

void main() {
    vUv = uv;
    vDirection = (modelMatrix[1][1] > 0.0) ? 1.0 : -1.0;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float dist = max(-mvPosition.z, 1.0);
    float size = 120.0 / dist;
    
    gl_PointSize = clamp(size, 2.0, 64.0);
    gl_Position = projectionMatrix * mvPosition;
}
`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"fsSjp":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "roadFragment", ()=>roadFragment);
const roadFragment = `
uniform float time;
uniform vec3 color;
varying vec2 vUv;
varying float vDirection;

void main() {
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(gl_PointCoord, center);
    
    float core = 1.0 - smoothstep(0.1, 0.12, dist);
    
    float correctedUvY = (vDirection > 0.0) ? vUv.y : (1.0 - vUv.y);

    float offsetTime = time * 0.8 - correctedUvY * 3.0;
    float pulse = fract(offsetTime); 
    
    float ringRadius = 0.1 + pulse * 0.4; 
    float ringWidth = 0.1; 
    float ring = smoothstep(ringRadius - ringWidth, ringRadius, dist) - 
                 smoothstep(ringRadius, ringRadius + ringWidth, dist);
                 
    ring *= pow(1.0 - pulse, 3.0); 

    vec3 finalColor = color * (core + ring * 1.5);
    if (dist > 0.5) discard;
    
    float alpha = core + ring;
    gl_FragColor = vec4(finalColor, alpha);
}
`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"iszWB":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "underwaterVertex", ()=>underwaterVertex);
const underwaterVertex = `
precision highp float;
precision highp int;

varying vec2 vUv;
varying vec3 vNormal;

void main() {
    vNormal = normal;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"bGejD":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "underwaterFragment", ()=>underwaterFragment);
const underwaterFragment = `
precision highp float;

uniform float time;
uniform float scale;
uniform float speed;

varying vec3 vNormal;
varying vec2 vUv;

float rand(in vec2 p)
{
	return abs( fract( sin(p.x * 95325.328 + p.y * -48674.077) + cos(p.x * -46738.322 + p.y * 76485.077) + time * speed ) -.5)+.5;
}
	
void main( void ) {
	
	vec2 position = ( vUv.xy ) * scale;

	vec3 color = vec3(rand( vec2(floor(position.x), floor(position.y) ) ), rand( vec2(floor(position.x) , floor(position.x) ) ) , rand( vec2(floor(position.x*.5) , floor(position.y*.5) ) ));
	float scale = 1.-pow( pow( (mod( position.x, 1.)-.5), 2.) + pow( (mod( position.y, 1.)-.5), 2.), .7 );
	
	gl_FragColor = vec4( color*scale, 1.);
}

`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"egZX5":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "fogFragment", ()=>fogFragment);
const fogFragment = `
// http://casual-effects.blogspot.com/2013/08/starfield-shader.html
// #extension GL_OES_standard_derivatives : enable

#define iterations 17
#define volsteps 3
#define sparsity 0.5
#define stepsize 0.2
 #define frequencyVariation   1.3

precision highp float;
precision highp int;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

uniform vec3 color;
uniform float time;
uniform float twinkleSpeed;
uniform float speed;
 
uniform float brightness;
uniform float distfading;
 

#define PI 3.141592653589793238462643383279

void main( void ) {

    vec2 uv = vUv.xy + 0.5;
    uv.x += time * speed * 0.1;
 
    vec3 dir = vec3(uv * 2.0, 1.0);
 
    float s = 0.1, fade = 0.01;
    vec3 starColor = vec3(0.0);
     
    for (int r = 0; r < volsteps; ++r) {
        vec3 p =  (time * speed * twinkleSpeed) + dir * (s * 0.5);
        p = abs(vec3(frequencyVariation) - mod(p, vec3(frequencyVariation * 2.0)));
 
        float prevlen = 0.0, a = 0.0;
        for (int i = 0; i < iterations; ++i) {
            p = abs(p);
            p = p * (1.0 / dot(p, p)) + (-sparsity); // the magic formula            
            float len = length(p);
            a += abs(len - prevlen); // absolute sum of average change
            prevlen = len;
        }
         
        a *= a * a; // add contrast
         
        // coloring based on distance        
        starColor += (vec3(s, s*s, s*s*s) * a * brightness + 1.0) * fade;
        fade *= distfading; // distance fading
        s += stepsize;
    }
     
    starColor = min(starColor, vec3(1.2));
 
    // Detect and suppress flickering single pixels (ignoring the huge gradients that we encounter inside bright areas)
    float intensity = min(starColor.r + starColor.g + starColor.b, 0.7);
 
    vec2 sgn = (vec2(vUv.xy)) * 2.0 - 1.0;
    vec2 gradient = vec2(dFdx(intensity) * sgn.x, dFdy(intensity) * sgn.y);
    float cutoff = max(max(gradient.x, gradient.y) - 0.1, 0.0);
    starColor *= max(1.0 - cutoff * 6.0, 0.3);
 
    // Motion blur; increases temporal coherence of undersampled flickering stars
    // and provides temporal filtering under true motion.  
    gl_FragColor = vec4( starColor * color, 1.0 );
}

`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"1bo3d":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "fogVertex", ()=>fogVertex);
const fogVertex = `
precision highp float;
precision highp int;

varying vec2 vUv;
varying vec3 vPosition;
varying vec3 vNormal;

void main() {
  vUv = uv;
  vPosition = position;
  vNormal = normal;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"4DYXe":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SHADER_UNIFORMS", ()=>SHADER_UNIFORMS);
var _three = require("three");
/**
 * Helper function to generate standard panel uniforms.
 * @returns {{ image: {type: string, value: THREE.Texture|null}, time: {type: string, value: number}, hover: {type: string, value: number} }}
 */ const createPanelUniforms = ()=>({
        image: {
            value: null
        },
        time: {
            value: 0
        },
        hover: {
            value: 0
        }
    });
const SHADER_UNIFORMS = {
    underwater: {
        speed: {
            value: 2.0
        },
        scale: {
            value: 3
        },
        time: {
            value: 0.0
        }
    },
    fog: {
        time: {
            value: 0
        },
        color: {
            value: new _three.Color(1, 1, 1)
        },
        twinkleSpeed: {
            value: 20
        },
        speed: {
            value: 0.0001
        },
        brightness: {
            value: 0.0018
        },
        distfading: {
            value: 0.2
        }
    },
    matrix: {
        color: {
            value: new _three.Color(0, 0.70196, 0.14509)
        },
        resolution: {
            value: new _three.Vector2(1.9461, 1.9369)
        },
        charSize: {
            value: new _three.Vector2(0.8769, 0.9384)
        },
        charResolution: {
            value: 7.72425
        },
        speed: {
            value: 18.2645
        },
        time: {
            value: 0
        }
    },
    road: {
        time: {
            value: 0
        },
        color: {
            value: new _three.Color(0x00aaff)
        }
    },
    main: createPanelUniforms(),
    washer: createPanelUniforms(),
    landary: createPanelUniforms(),
    burger: createPanelUniforms(),
    css: createPanelUniforms(),
    react: createPanelUniforms(),
    python: createPanelUniforms()
};

},{"three":"dsoTF","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"7Rayp":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Represents a decorative and interactive 3D panel for project display.
 * Manages its own shader material, attachments (icons), and decorative elements.
 * @extends THREE.Group
 */ parcelHelpers.export(exports, "ProjectPanel", ()=>ProjectPanel);
var _three = require("three");
var _logger = require("../core/logger");
var _textGeometry = require("three/examples/jsm/geometries/TextGeometry");
/**
 * Shared geometry used by all ProjectPanels to reduce memory footprint.
 * Includes a custom 'aRandom' attribute for vertex shader displacement.
 * @type {THREE.PlaneGeometry}
 */ const SHARED_GEOMETRY = new _three.PlaneGeometry(6, 4, 300, 200);
const count = SHARED_GEOMETRY.attributes.position.count;
const aRandom = new _three.BufferAttribute(new Float32Array(count), 1);
for(let i = 0; i < count; i++)aRandom.setX(i, Math.random() * 0.1 + 0.1);
SHARED_GEOMETRY.setAttribute("aRandom", aRandom);
class ProjectPanel extends _three.Group {
    /**
   * @param {import('../config/panels').PanelEntry} config - Configuration object for the panel.
   * @param {Object} shaderData - Object containing vertex and fragment strings.
   * @param {string} shaderData.vertex - Vertex shader code.
   * @param {string} shaderData.fragment - Fragment shader code.
   * @param {Object.<string, THREE.IUniform>} uniform - Three.js uniform object for ShaderMaterial.
   * @param {import('../core/assetManager').AssetManager} assetManager - Instance to retrieve 3D models.
   */ constructor(config, shaderData, uniform, assetManager){
        super();
        /** @type {string} */ this.name = `panel-${config.name}`;
        /** * Animated ring mesh in the decoration group.
     * @type {THREE.Mesh|null}
     */ this.ring = null;
        if (config.text) this._createText(config.text, assetManager.fonts.fontJson);
        if (config.attachments && Array.isArray(config.attachments)) config.attachments.forEach((attachConfig)=>{
            this._createAttachment(attachConfig, assetManager);
        });
        this._build(config, shaderData, uniform);
    }
    /**
   * Generates 3D text and adds it to the panel.
   * @param {string} content - The text to display.
   * @param {Object} font - The loaded Three.js font object.
   * @private
   */ _createText(content, font) {
        if (!font) {
            (0, _logger.Logger).warn("ProjectPanel", "Font not loaded, skipping text creation.");
            return;
        }
        const textGeometry = new (0, _textGeometry.TextGeometry)(content, {
            font: font,
            size: 0.4,
            height: 0.01,
            curveSegments: 12
        });
        const textMaterial = new _three.MeshStandardMaterial({
            color: "#525B68"
        });
        const textMesh = new _three.Mesh(textGeometry, textMaterial);
        textMesh.position.x = 4;
        this.add(textMesh);
    }
    /**
   * Creates and positions a 3D attachment (icon) relative to the panel.
   * @param {import('../config/panels').PanelAttachment} attachConfig - Attachment spatial and metadata.
   * @param {import('../core/assetManager').AssetManager} assetManager - To retrieve the source model.
   * @private
   */ _createAttachment(attachConfig, assetManager) {
        const asset = assetManager.iconModels[attachConfig.modelName];
        if (!asset) {
            (0, _logger.Logger).warn("Project panel", `Model ${attachConfig.modelName} nof found!`);
            return;
        }
        const model = asset.scene ? asset.scene.clone() : asset.clone();
        const [px, py, pz] = attachConfig.offset;
        model.position.set(px, py, pz);
        const [sx, sy, sz] = attachConfig.scale;
        model.scale.set(sx, sy, sz);
        if (attachConfig.rotation) {
            const [rx, ry, rz] = attachConfig.rotation;
            model.rotation.set(rx, ry, rz);
        }
        model.traverse((child)=>{
            if (child.isMesh) {
                child.name = "attachment";
                child.userData.link = attachConfig.link;
            }
        });
        model.userData.link = attachConfig.link;
        model.name = "attachment";
        this.add(model);
    }
    /**
   * Builds the main shader-based point cloud mesh.
   * @param {import('../config/panels').PanelEntry} config - Panel metadata.
   * @param {Object} shaderData - Shader source code.
   * @param {Object} uniforms - Shader uniform values.
   * @private
   */ _build(config, shaderData, uniforms) {
        const material = new _three.ShaderMaterial({
            vertexShader: shaderData.vertex,
            fragmentShader: shaderData.fragment,
            uniforms: uniforms,
            transparent: true,
            depthTest: false,
            depthWrite: false
        });
        /** * The main visual representation using Three.js Points.
     * @type {THREE.Points}
     */ const mesh = new _three.Points(SHARED_GEOMETRY, material);
        mesh.name = "link";
        mesh.userData.link = config.link;
        this.add(mesh);
        this._createDecorations();
    }
    /**
   * Creates static decorative elements like the support line and landing sphere.
   * @private
   */ _createDecorations() {
        const linePoints = [
            new _three.Vector3(0, 1.5, 0),
            new _three.Vector3(0, 4, 0)
        ];
        const lineGeometry = new _three.BufferGeometry().setFromPoints(linePoints);
        const lineMaterial = new _three.LineBasicMaterial({
            color: "#525B68"
        });
        const lineMesh = new _three.Line(lineGeometry, lineMaterial);
        lineMesh.position.set(3.5, -5, 0);
        const sphereGeometry = new _three.SphereGeometry(0.05, 10, 10);
        const sphereMaterial = new _three.MeshStandardMaterial({
            color: "#525B68"
        });
        const sphereMesh = new _three.Mesh(sphereGeometry, sphereMaterial);
        sphereMesh.position.set(0, 4.4, 0);
        const ringGeometry = new _three.RingGeometry(0.05, 0.07, 30);
        const ringMaterial = new _three.MeshStandardMaterial({
            color: "#525B68"
        });
        this.ring = new _three.Mesh(ringGeometry, ringMaterial);
        sphereMesh.add(this.ring);
        lineMesh.add(sphereMesh);
        this.add(lineMesh);
    }
    /**
   * Updates the panel animations per frame.
   * @param {number} elapsedTime - Total time since the application started.
   */ update(elapsedTime) {
        if (this.ring) {
            const s = 1 + Math.sin(elapsedTime * 3) * 3;
            this.ring.scale.set(s, s, 1);
        }
    }
    /**
   * Cleans up GPU assets to prevent memory leaks.
   * Note: SHARED_GEOMETRY is not disposed here as it is shared across instances.
   */ dispose() {
        this.traverse((child)=>{
            if (child.isMesh || child.isPoints || child.isLine) {
                if (child.geometry && child.geometry !== SHARED_GEOMETRY) child.geometry.dispose();
                if (child.material) {
                    if (Array.isArray(child.material)) child.material.forEach((mat)=>this._disposeMaterial(mat));
                    else this._disposeMaterial(child.material);
                }
            }
        });
        this.clear();
    }
    /**
   * Internal helper to dispose of material and its textures.
   * @param {THREE.Material} mat
   * @private
   */ _disposeMaterial(mat) {
        mat.dispose();
        for(const key in mat)if (mat[key] && mat[key].isTexture) mat[key].dispose();
        if (mat.uniforms) for(const key in mat.uniforms){
            const u = mat.uniforms[key];
            if (u.value && u.value.isTexture) u.value.dispose();
        }
    }
}

},{"three":"dsoTF","../core/logger":"d2gjF","three/examples/jsm/geometries/TextGeometry":"4gbT1","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"4gbT1":[function(require,module,exports,__globalThis) {
/**
 * Text = 3D Text
 *
 * parameters = {
 *  font: <THREE.Font>, // font
 *
 *  size: <float>, // size of the text
 *  height: <float>, // thickness to extrude text
 *  curveSegments: <int>, // number of points on the curves
 *
 *  bevelEnabled: <bool>, // turn on bevel
 *  bevelThickness: <float>, // how deep into text bevel goes
 *  bevelSize: <float>, // how far from text outline (including bevelOffset) is bevel
 *  bevelOffset: <float> // how far from text outline does bevel start
 * }
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "TextGeometry", ()=>TextGeometry);
var _three = require("three");
class TextGeometry extends (0, _three.ExtrudeGeometry) {
    constructor(text, parameters = {}){
        const font = parameters.font;
        if (font === undefined) super(); // generate default extrude geometry
        else {
            const shapes = font.generateShapes(text, parameters.size);
            // translate parameters to ExtrudeGeometry API
            parameters.depth = parameters.height !== undefined ? parameters.height : 50;
            // defaults
            if (parameters.bevelThickness === undefined) parameters.bevelThickness = 10;
            if (parameters.bevelSize === undefined) parameters.bevelSize = 8;
            if (parameters.bevelEnabled === undefined) parameters.bevelEnabled = false;
            super(shapes, parameters);
        }
        this.type = 'TextGeometry';
    }
}

},{"three":"dsoTF","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"f8KEX":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * The Road class manages the road logic, path generation, and visual elements.
 * It uses custom ShaderMaterials to animate pulsing points along the path.
 */ parcelHelpers.export(exports, "Road", ()=>Road);
var _three = require("three");
var _shaderRegistry = require("../shader/shaderRegistry");
var _uniforms = require("../shader/uniforms");
class Road {
    /**
   * Creates a road instance.
   * @param {Object} sceneManager - The scene manager used to add objects to the Three.js scene.
   */ constructor(sceneManager){
        this.sceneManager = sceneManager;
        this.group = new _three.Group();
        this.sceneManager.add(this.group);
        this.progress = 0;
        this.materials = [];
        this.points = [];
        this._createPath();
        this._createVisualRoad();
    }
    /**
   * Generates the mathematical path (array of points) using EllipseCurve.
   * This path is used for camera movement and geometry reference.
   * @private
   */ _createPath() {
        let ax = 22.5;
        const radius = [
            22,
            18,
            22,
            62
        ];
        for(let i = 0; i < 4; i++){
            const curve = new _three.EllipseCurve(i === 3 ? 62.5 : ax, 0, radius[i], radius[i], 0, Math.PI, i % 2 === 0 ? false : true, 0);
            const pts = i !== 3 ? curve.getPoints(300).reverse() : curve.getPoints(900);
            this.points.push(...pts);
            ax += 40;
        }
    }
    /**
   * Creates visual road objects (Points) using RingGeometry.
   * Each segment receives its own ShaderMaterial instance for independent animation.
   * @private
   */ _createVisualRoad() {
        const geometry = new _three.RingGeometry(15, 25, 30, 4, 0, Math.PI);
        const shader = (0, _shaderRegistry.SHADER_REGISTRY)["road"];
        let x = 22.5;
        for(let i = 0; i < 3; i++){
            const material = new _three.ShaderMaterial({
                vertexShader: shader.vertex,
                fragmentShader: shader.fragment,
                uniforms: _three.UniformsUtils.clone((0, _uniforms.SHADER_UNIFORMS)["road"]),
                transparent: true,
                depthWrite: false
            });
            const mesh = new _three.Points(geometry, material);
            mesh.position.x = x;
            mesh.rotation.x = i % 2 === 0 ? -Math.PI / 2 : Math.PI / 2;
            this.materials.push(material);
            this.group.add(mesh);
            x += 40;
        }
        const bigGeometry = new _three.RingGeometry(55, 65, 90, 4, 0, Math.PI);
        const bigMaterial = new _three.ShaderMaterial({
            vertexShader: shader.vertex,
            fragmentShader: shader.fragment,
            uniforms: _three.UniformsUtils.clone((0, _uniforms.SHADER_UNIFORMS)["road"]),
            transparent: true,
            depthWrite: false
        });
        const bigMesh = new _three.Points(bigGeometry, bigMaterial);
        bigMesh.position.x = 62.5;
        bigMesh.rotation.x = Math.PI / 2;
        this.materials.push(bigMaterial);
        this.group.add(bigMesh);
    }
    /**
   * Updates material uniforms, specifically the time used for shader animations.
   * @param {number} elapsedTime - The total elapsed time since the application started.
   */ update(elapsedTime) {
        if (this.materials) this.materials.forEach((mat)=>{
            mat.uniforms.time.value = elapsedTime;
        });
    }
    /**
   * Cleans up GPU resources to prevent memory leaks.
   */ dispose() {
        this.group.traverse((child)=>{
            if (child.isMesh || child.isPoints) {
                if (child.geometry) child.geometry.dispose();
                if (child.material) this._disposeMaterial(child.material);
            }
        });
        this.materials = [];
        this.points = [];
        if (this.sceneManager && this.group) this.sceneManager.scene.remove(this.group);
        this.group.clear();
    }
    /**
   * Helper to clean up shader materials and their uniforms.
   * @param {THREE.Material} mat
   * @private
   */ _disposeMaterial(mat) {
        mat.dispose();
        if (mat.uniforms) for(const key in mat.uniforms){
            const u = mat.uniforms[key];
            if (u.value && u.value.isTexture) u.value.dispose();
        }
    }
}

},{"three":"dsoTF","../shader/shaderRegistry":"kkTYQ","../shader/uniforms":"4DYXe","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"2ez3R":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Handles the background fog/shader plane.
 * Acts as a fullscreen background element by rendering a 2x2 plane
 * in a dedicated background scene with depth testing disabled.
 *
 * @extends THREE.Mesh
 */ parcelHelpers.export(exports, "Background", ()=>Background);
var _three = require("three");
class Background extends _three.Mesh {
    /**
   * @param {Object} shaderData - The shader source code.
   * @param {string} shaderData.vertex - Vertex shader string.
   * @param {string} shaderData.fragment - Fragment shader string.
   * @param {Object.<string, THREE.IUniform>} uniforms - Shader uniforms object.
   */ constructor(shaderData, uniforms){
        const geometry = new _three.PlaneGeometry(2, 2);
        const material = new _three.ShaderMaterial({
            fragmentShader: shaderData.fragment,
            vertexShader: shaderData.vertex,
            uniforms,
            transparent: true,
            depthTest: false,
            depthWrite: false
        });
        super(geometry, material);
        /** @type {string} */ this.name = "background";
    }
    /**
   * Cleans up background resources.
   */ dispose() {
        this.geometry.dispose();
        this.material.dispose();
    }
}

},{"three":"dsoTF","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"3xMhv":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * TextManager handles the creation, organization, and disposal of all 3D text elements.
 * It separates text logic from the main World orchestrator.
 */ parcelHelpers.export(exports, "TextManager", ()=>TextManager);
var _text3D = require("./text3d");
var _techText = require("./techText");
var _configIndex = require("../config/configIndex");
var _shaderRegistry = require("../shader/shaderRegistry");
var _uniforms = require("../shader/uniforms");
class TextManager {
    /**
   * @param {import('../core/sceneManager').SceneManager} sceneManager
   * @param {import('../core/assetManager').AssetManager} assetManager
   */ constructor(sceneManager, assetManager){
        /** @type {import('../core/sceneManager').SceneManager} */ this.sceneManager = sceneManager;
        /** @type {import('../core/assetManager').AssetManager} */ this.assetManager = assetManager;
        /**
     * Collection of all active text instances (Text3D, TechText).
     * @type {Array<Object>}
     */ this.texts = [];
        this._init();
    }
    _init() {
        this._addTitles();
        this._addTechTexts();
        this._addHeroText();
    }
    /**
   * Initializes and adds floating 3D titles to the scene based on configuration.
   * Uses the Permanent Marker font.
   *
   * @private
   * @returns {void}
   */ _addTitles() {
        (0, _configIndex.TITLES_CONFIG).forEach((config)=>{
            const title = new (0, _text3D.Text3D)(config.text, this.assetManager.fonts.fontPremanentMarker, {
                position: [
                    ...config.position
                ],
                rotationY: config.rotationY,
                size: config.size,
                scale: [
                    0,
                    0,
                    0
                ],
                name: "title"
            });
            this._register(title);
        });
    }
    /**
   * Initializes technology description texts using the JSON font.
   * @private
   * @returns {void}
   */ _addTechTexts() {
        (0, _configIndex.TECH_TEXT_CONFIG).forEach((config)=>{
            const techText = new (0, _techText.TechText)(config, this.assetManager.fonts.fontJson);
            this._register(techText);
        });
    }
    /**
   * Creates the main "Hero" title with underwater shader effects.
   * @private
   * @returns {void}
   */ _addHeroText() {
        this.heroText = new (0, _text3D.Text3D)("Marko Vasic", this.assetManager.fonts.fontJustAnotherHand, {
            size: 3.9,
            position: [
                88,
                1,
                0
            ],
            rotationY: -Math.PI / 2,
            shaderData: (0, _shaderRegistry.SHADER_REGISTRY).underwater,
            uniforms: (0, _uniforms.SHADER_UNIFORMS).underwater
        });
        this._register(this.heroText);
    }
    /**
   * Adds a text instance to the internal tracking array and the 3D scene.
   * @param {Object} textInstance - The text object to be managed.
   * @private
   */ _register(textInstance) {
        this.texts.push(textInstance);
        this.sceneManager.add(textInstance);
    }
    /**
   * Disposes of all text resources and removes them from the scene.
   * Essential for preventing memory leaks.
   * @returns {void}
   */ dispose() {
        this.texts.forEach((text)=>{
            if (text.dispose) text.dispose();
            this.sceneManager.scene.remove(text);
        });
        this.heroText.dispose();
        this.texts = [];
    }
}

},{"./text3d":"aFuUm","./techText":"3ukW1","../config/configIndex":"dTXpe","../shader/shaderRegistry":"kkTYQ","../shader/uniforms":"4DYXe","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"aFuUm":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Universal 3D Text component that supports both standard and shader materials.
 */ parcelHelpers.export(exports, "Text3D", ()=>Text3D);
var _three = require("three");
var _textGeometry = require("three/examples/jsm/geometries/TextGeometry");
class Text3D extends _three.Mesh {
    /**
   * @param {string} content - The actual text string to display.
   * @param {Object} font - The parsed Three.js font object.
   * @param {Object} [options={}] - Configuration options.
   * @param {number} [options.size=1] - Size of the text.
   * @param {number} [options.height=0.01] - Thickness of the text.
   * @param {string} [options.name="Text3D"] - Object name for the scene graph.
   * @param {number[]} [options.position=[0,0,0]] - Initial [x, y, z] position.
   * @param {number} [options.rotationY=0] - Initial rotation around the Y axis.
   * @param {number[]} [options.scale] - Initial [x, y, z] scale.
   * @param {string} [options.color="#525B68"] - Color for MeshStandardMaterial.
   * @param {boolean} [options.center=false] - Whether to center the geometry.
   * @param {Object} [options.shaderData] - Data for ShaderMaterial.
   * @param {string} options.shaderData.vertex - Vertex shader string.
   * @param {string} options.shaderData.fragment - Fragment shader string.
   * @param {Object} [options.uniforms={}] - Uniforms for ShaderMaterial.
   */ constructor(content, font, options = {}){
        const geometry = Text3D._createGeometry(content, font, options);
        const material = Text3D._createMaterial(options);
        super(geometry, material);
        this._applyOptions(options);
    }
    /** @private */ static _createGeometry(content, font, options) {
        return new (0, _textGeometry.TextGeometry)(content, {
            font: font,
            size: options.size || 1,
            height: options.height || 0.01,
            curveSegments: 12
        });
    }
    /** @private */ static _createMaterial(options) {
        if (options.shaderData) return new _three.ShaderMaterial({
            vertexShader: options.shaderData.vertex,
            fragmentShader: options.shaderData.fragment,
            uniforms: options.uniforms || {},
            transparent: true
        });
        return new _three.MeshStandardMaterial({
            color: options.color || "#525B68"
        });
    }
    /** @private */ _applyOptions(options) {
        this.name = options.name || "Text3D";
        if (options.name) this.name = options.name;
        if (options.position) this.position.set(...options.position);
        if (options.rotationY !== undefined) this.rotation.y = options.rotationY;
        if (options.scale) this.scale.set(...options.scale);
    }
    /**
   * Frees the GPU resources allocated for this text instance.
   * Must be called when the object is permanently removed from the scene.
   */ dispose() {
        this.geometry.dispose();
        this.material.dispose();
    }
}

},{"three":"dsoTF","three/examples/jsm/geometries/TextGeometry":"4gbT1","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"3ukW1":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Represents descriptive technical paragraphs in 3D space.
 * @extends THREE.Mesh
 */ parcelHelpers.export(exports, "TechText", ()=>TechText);
var _three = require("three");
var _textGeometry = require("three/examples/jsm/geometries/TextGeometry");
class TechText extends _three.Mesh {
    /**
   * @param {Object} config - Text configuration
   * @param {Object} font - Loaded font object
   */ constructor(config, font){
        const geometry = new (0, _textGeometry.TextGeometry)(config.content, {
            font: font,
            size: 0.5,
            height: 0.01,
            curveSegments: 12
        });
        const material = new _three.MeshStandardMaterial({
            color: "#525B68"
        });
        super(geometry, material);
        this.name = "technologyText";
        this.position.set(...config.position);
        this.rotation.y = config.rotationY;
        this.scale.set(0, 0, 0);
    }
    dispose() {
        this.geometry.dispose();
        this.material.dispose();
    }
}

},{"three":"dsoTF","three/examples/jsm/geometries/TextGeometry":"4gbT1","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"fElKW":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * HeroStageBuilder isolates the configuration, material mapping,
 * shadow settings, and precise lighting alignment for the Hero Diorama.
 */ parcelHelpers.export(exports, "HeroStageBuilder", ()=>HeroStageBuilder);
var _three = require("three");
var _heroDioram = require("../../../../config/heroDioram");
class HeroStageBuilder {
    /**
   * @param {Object} sceneManager - The core scene manager.
   * @param {THREE.Scene|Object} model - The loaded GLTF/GLB model asset.
   */ constructor(sceneManager, model){
        /** @type {Object} */ this.sceneManager = sceneManager;
        /** @type {THREE.Scene|Object} */ this.office = model;
        /** @type {THREE.DirectionalLight|null} */ this.topLight = null;
        /** @type {THREE.Object3D|null} */ this.lightTarget = null;
        /** @type {THREE.Group|THREE.Scene|null} */ this.officeScene = null;
        /** @type {THREE.SpotLight|null} */ this.neonBlueLight = null;
        /** @type {THREE.Object3D|null} */ this.customNeonTarget = null;
        /** @type {THREE.Mesh|null} */ this.screenMesh = null;
        /** @private */ this._vModelPos = new _three.Vector3();
        /** @private */ this._vLocalCenter = new _three.Vector3();
        /** @private */ this._vRealScreenPos = new _three.Vector3();
    }
    /**
   * Parses the hierarchy, configures PBR materials, shadows, and computes spatial bounds.
   */ build() {
        this.officeScene = this.office.scene || this.office;
        const AMBIENT_DARKNESS = 0.3;
        const DEFAULT_ROUGHNESS = 0.8;
        const DEFAULT_METALNESS = 0.1;
        this.officeScene.traverse((child)=>{
            if (!child.isMesh) return;
            if (child.name.toLowerCase() === "screen") {
                this._setupScreenMesh(child);
                return;
            }
            if (child.material) this._optimizeMaterial(child, AMBIENT_DARKNESS, DEFAULT_ROUGHNESS, DEFAULT_METALNESS);
            child.castShadow = true;
            child.receiveShadow = true;
        });
        this._initLights();
    }
    /**
   * Optimizes standard mesh materials to handle low-light environments correctly.
   * @private
   */ _optimizeMaterial(mesh, darknessFactor, roughness, metalness) {
        const oldMaterial = mesh.material;
        const originalColor = oldMaterial.color ? oldMaterial.color.clone() : new _three.Color(0xffffff);
        originalColor.multiplyScalar(darknessFactor);
        mesh.material = new _three.MeshStandardMaterial({
            color: originalColor,
            map: oldMaterial.map,
            roughness: roughness,
            metalness: metalness
        });
        oldMaterial.dispose();
    }
    /**
   * Configures the neon emission material specifically for the monitor screen.
   * @private
   */ _setupScreenMesh(mesh) {
        const oldMaterial = mesh.material;
        mesh.material = new _three.MeshStandardMaterial({
            color: new _three.Color(0x111111),
            map: oldMaterial ? oldMaterial.map : null,
            emissive: new _three.Color(0x00a8ff),
            emissiveIntensity: 2.0,
            roughness: 0.2
        });
        if (oldMaterial) oldMaterial.dispose();
        this.screenMesh = mesh;
        this.screenMesh.geometry.computeBoundingBox();
        this.screenMesh.castShadow = true;
        this.screenMesh.receiveShadow = true;
    }
    /**
   * Instantiates and registers the doriama-specific lights into the scene.
   * @private
   */ _initLights() {
        this.neonBlueLight = new _three.SpotLight(0x00a8ff, 15, 5, Math.PI / 5, 0.4, 1);
        this.neonBlueLight.castShadow = true;
        this.neonBlueLight.shadow.mapSize.set(1024, 1024);
        this.neonBlueLight.shadow.bias = -0.001;
        this.customNeonTarget = new _three.Object3D();
        this.sceneManager.add(this.customNeonTarget);
        this.neonBlueLight.target = this.customNeonTarget;
        this.sceneManager.add(this.neonBlueLight);
        this.topLight = new _three.DirectionalLight(0xffe6b3, 2.5);
        this.topLight.castShadow = true;
        this.topLight.shadow.mapSize.set(1024, 1024);
        this.topLight.shadow.bias = -0.0005;
        const boxSize = (0, _heroDioram.LIGHT_CONFIG).directional.boxSize;
        const shadowCam = this.topLight.shadow.camera;
        shadowCam.left = -boxSize;
        shadowCam.right = boxSize;
        shadowCam.top = boxSize;
        shadowCam.bottom = -boxSize;
        shadowCam.near = 1;
        shadowCam.far = 15;
        this.lightTarget = new _three.Object3D();
        this.sceneManager.add(this.lightTarget);
        this.topLight.target = this.lightTarget;
        this.sceneManager.add(this.topLight);
    }
    /**
   * Aligns the lights to the physical geometry center of the screen mesh.
   */ alignLightsToModel() {
        if (!this.topLight || !this.lightTarget || !this.officeScene || !this.screenMesh) return;
        this.officeScene.updateMatrixWorld(true);
        this.officeScene.getWorldPosition(this._vModelPos);
        this.screenMesh.geometry.boundingBox.getCenter(this._vLocalCenter);
        this._vRealScreenPos.copy(this._vLocalCenter);
        this.screenMesh.localToWorld(this._vRealScreenPos);
        const actualScreenY = this._vModelPos.y + (0, _heroDioram.LIGHT_CONFIG).screenHeightOffset;
        this.neonBlueLight.position.set(this._vRealScreenPos.x, actualScreenY, this._vRealScreenPos.z + 0.1);
        this.customNeonTarget.position.set(this._vRealScreenPos.x + (0, _heroDioram.LIGHT_CONFIG).targetXOffset, actualScreenY, this._vRealScreenPos.z + (0, _heroDioram.LIGHT_CONFIG).targetZOffset);
        this.lightTarget.position.copy(this._vModelPos);
        this.topLight.position.set(this._vModelPos.x + (0, _heroDioram.LIGHT_CONFIG).directional.x, this._vModelPos.y + (0, _heroDioram.LIGHT_CONFIG).directional.y, this._vModelPos.z + (0, _heroDioram.LIGHT_CONFIG).directional.z);
        this.topLight.shadow.camera.updateProjectionMatrix();
    }
}

},{"three":"dsoTF","../../../../config/heroDioram":"16V3s","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"gGtiF":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Orchestrator class representing the main Frog character entity.
 * Manages spatial transformations, component lifecycles (animations/dioramas),
 * and handles proximity-based camera trigger zone checks.
 */ parcelHelpers.export(exports, "FrogCharacter", ()=>FrogCharacter);
var _three = require("three");
var _animationManager = require("../core/animationManager");
var _dioramaManager = require("../infrastructure/three/diorama/dioramaManager");
const _targetTriggerPosition = new _three.Vector3();
class FrogCharacter {
    /**
   * Creates an instance of FrogCharacter.
   * @param {Object|THREE.Object3D} frogAsset - The loaded asset object (typically a GLTF result containing a scene).
   * @param {THREE.Camera} camera - The active application camera used for spatial proximity tracking.
   * @param {Array<Object>} triggerConfig - Configuration array containing spatial bounds and command maps.
   */ constructor(frogAsset, camera, triggerConfig){
        /**
     * Group container wrapping the raw mesh model for safe local/global space operations.
     * @type {THREE.Group}
     */ this.container = new _three.Group();
        this.container.name = "frogContainer";
        /**
     * The raw inner Object3D/Group hierarchy parsed from the graphic asset.
     * @type {THREE.Object3D}
     */ this.rawModel = frogAsset.scene || frogAsset;
        /**
     * Reference to the runtime scene camera used to evaluate zone proximity thresholds.
     * @type {THREE.Camera}
     */ this.camera = camera;
        /**
     * Dependency injected collection of localized trigger definitions.
     * @type {Array<Object>}
     */ this.triggerConfig = triggerConfig;
        /**
     * Id tracker of the current active trigger zone. Null if the camera is out of bounds.
     * @type {string|null}
     */ this.currentZoneId = null;
        /**
     * Subsystem manager handling internal animation state tracks.
     * @type {AnimationManager}
     */ this.animationManager = null;
        /**
     * Subsystem manager controlling contextual behavior dioramas.
     * @type {DioramaManager}
     */ this.dioramaManager = null;
        this._init(frogAsset.animations || []);
    }
    /**
   * Internal component bootstrapper. Compiles spatial node links,
   * optimizes shading materials for low-light environments, and registers subsystems.
   * @param {THREE.AnimationClip[]} animations - Cached array of clips extracted from the asset root.
   * @private
   * @returns {void}
   */ _init(animations) {
        this.container.add(this.rawModel);
        this._optimizeMaterialsForDiorama();
        this.animationManager = new (0, _animationManager.AnimationManager)(this.rawModel, animations);
        this.dioramaManager = new (0, _dioramaManager.DioramaManager)(this);
        this.setVisibility(true);
    }
    /**
   * Traverses the model hierarchy to dim material base colors and adjust roughness,
   * ensuring the mesh blends naturally into the dark cyber-punk diorama.
   * @private
   * @returns {void}
   */ _optimizeMaterialsForDiorama() {
        const DARKNESS_FACTOR = 0.3;
        const TARGET_ROUGHNESS = 0.85;
        this.rawModel.traverse((child)=>{
            if (!child.isMesh || !child.material) return;
            const materials = Array.isArray(child.material) ? child.material : [
                child.material
            ];
            materials.forEach((mat)=>{
                if (mat.color) mat.color.multiplyScalar(DARKNESS_FACTOR);
                if ("roughness" in mat) mat.roughness = TARGET_ROUGHNESS;
            });
        });
    }
    /**
   * Safe spatial manipulation utility interface for positioning and rotating the root container element.
   * @param {number[]} [position] - Array matching [x, y, z] spatial coords.
   * @param {number} [rotationY] - Target yaw angle value in radians.
   * @returns {void}
   */ setupScene(position, rotationY) {
        if (position) this.container.position.set(...position);
        if (rotationY !== undefined) this.container.quaternion.setFromAxisAngle(new _three.Vector3(0, 1, 0), rotationY);
    }
    /**
   * Updates visibility state configurations on the main container node.
   * When false, Three.js automatically bypasses the element during the render execution pass.
   * @param {boolean} visible - Visibility visibility target flag.
   * @returns {void}
   */ setVisibility(visible) {
        this.container.visible = visible;
    }
    /**
   * Core frame ticker loop execution hook. Dispatches update updates to managers and triggers proximity evaluations.
   * @param {number} deltaTime - Time variance delta slice elapsed since the last rendering frame in seconds.
   * @returns {void}
   */ update(deltaTime) {
        if (this.animationManager) this.animationManager.update(deltaTime);
        if (this.dioramaManager && this.dioramaManager.currentDiorama) {
            const currentDiorama = this.dioramaManager.currentDiorama;
            if (typeof currentDiorama.update === "function") currentDiorama.update(deltaTime);
        }
        this._checkTriggers();
    }
    /**
   * Performs real-time distance comparisons between the active camera and configured triggers.
   * Operates on squared mathematical lengths to avoid expensive square root CPU cycles.
   * @private
   * @returns {void}
   */ _checkTriggers() {
        if (!this.camera?.position || !this.triggerConfig) return;
        const cameraPos = this.camera.position;
        let activeZone = null;
        for (const trigger of this.triggerConfig){
            const [tx, ty, tz] = trigger.position;
            _targetTriggerPosition.set(tx, ty, tz);
            const distanceSq = cameraPos.distanceToSquared(_targetTriggerPosition);
            const radiusSq = trigger.radius * trigger.radius;
            if (distanceSq <= radiusSq) {
                activeZone = trigger;
                break;
            }
        }
        // Handle structural state changes only when crossing a boundary threshold
        if (this.currentZoneId !== activeZone?.id) {
            this.currentZoneId = activeZone ? activeZone.id : null;
            if (activeZone) {
                this.dioramaManager.switchDiorama(activeZone.command);
                this.setVisibility(true);
            } else {
                this.setVisibility(false);
                this.dioramaManager.clear();
            }
        }
    }
    /**
   * Disposes of structural runtime component allocations, unbinds external event tracks,
   * and prepares inner sub-managers for memory cleanup.
   * @param {THREE.Scene} [parentScene] - Optional reference to the root Three.js graph scene to force node removal.
   * @returns {void}
   */ dispose(parentScene = null) {
        if (this.dioramaManager) {
            this.dioramaManager.clear();
            this.dioramaManager = null;
        }
        if (this.animationManager) {
            this.animationManager.dispose();
            this.animationManager = null;
        }
        if (parentScene && this.container) parentScene.remove(this.container);
        this.camera = null;
        this.triggerConfig = null;
    }
}

},{"three":"dsoTF","../core/animationManager":"1NN8G","../infrastructure/three/diorama/dioramaManager":"9iTr9","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"1NN8G":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Universal AnimationManager handling PBR model animations.
 * Supports smooth cross-fading, action pooling, and state tracking.
 */ parcelHelpers.export(exports, "AnimationManager", ()=>AnimationManager);
var _three = require("three");
var _error = require("./errors/error");
class AnimationManager {
    /**
   * @param {THREE.Object3D} model - The root 3D object/mesh to animate.
   * @param {THREE.AnimationClip[]} animations - Array of clips loaded from the asset.
   */ constructor(model, animations){
        if (!model) throw new (0, _error.ValidationError)("AnimationManager", "Initialization failed: 'model' target parameter is missing or undefined.");
        if (!animations) throw new (0, _error.ValidationError)("AnimationManager", "Initialization failed: 'animations' array is undefined.");
        /** @type {THREE.AnimationMixer} */ this.mixer = new _three.AnimationMixer(model);
        /** @type {Map<string, THREE.AnimationAction>} */ this.actions = new Map();
        /** @type {THREE.AnimationAction|null} */ this.currentAction = null;
        this._init(animations);
    }
    /**
   * Pools all available clips into AnimationAction instances for quick access.
   * @param {THREE.AnimationClip[]} animations
   * @private
   */ _init(animations) {
        if (animations.length === 0) return;
        animations.forEach((clip)=>{
            const action = this.mixer.clipAction(clip);
            this.actions.set(clip.name, action);
        });
    }
    /**
   * Plays or smoothly transitions to a targeted animation using contextual configurations.
   * @param {Object} step - The configuration step object from the sequence.
   * @param {string} step.name - The name of the animation clip.
   * @param {boolean} [step.loop] - Flag indicating if the track loops.
   * @param {number} [step.repeat] - Loop repeat counter limit.
   * @param {number} [step.timeScale] - Velocity modifier.
   * @param {number} [duration=0.5] - Crossfade duration in seconds.
   * @returns {THREE.AnimationAction|null} The activated action.
   */ play(step, duration = 0.5) {
        const { name, loop, repeat, timeScale } = step;
        const nextAction = this.actions.get(name);
        if (!nextAction) throw new (0, _error.ValidationError)("AnimationManager", `Animation "${name}" does not exist on this model.`);
        if (this.currentAction === nextAction) return nextAction;
        nextAction.reset();
        const targetTimeScale = timeScale !== undefined ? timeScale : 1.0;
        nextAction.setEffectiveTimeScale(targetTimeScale);
        nextAction.setEffectiveWeight(1.0);
        nextAction.clampWhenFinished = true;
        if (repeat && loop) nextAction.setLoop(_three.LoopRepeat, repeat);
        else if (!loop) nextAction.setLoop(_three.LoopOnce);
        else nextAction.setLoop(_three.LoopRepeat);
        if (!this.currentAction) {
            nextAction.play();
            this.mixer.update(0);
        } else {
            nextAction.play();
            this.currentAction.crossFadeTo(nextAction, duration, false);
        }
        this.currentAction = nextAction;
        return nextAction;
    }
    /**
   * Safely stops the currently playing animation and resets the state track.
   * Smoothly fades out the action if duration is provided.
   * @param {number} [duration=0.2] - Fade out transition time.
   */ stop(duration = 0.2) {
        if (!this.currentAction) return;
        if (duration > 0) this.currentAction.fadeOut(duration);
        else this.currentAction.stop();
        this.currentAction = null;
    }
    /**
   * Advances the mixer time. Call this inside the world/render update loop.
   * @param {number} deltaTime - Time elapsed since the last frame in seconds.
   */ update(deltaTime) {
        if (this.mixer && deltaTime > 0) this.mixer.update(deltaTime);
    }
    /**
   * Disposes of the mixer and clears references to prevent memory leaks.
   */ dispose() {
        if (this.mixer) {
            this.mixer.stopAllAction();
            this.mixer.uncacheRoot(this.mixer.getRoot());
        }
        this.actions.clear();
        this.currentAction = null;
        this.mixer = null;
    }
}

},{"three":"dsoTF","./errors/error":"5lvuz","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"9iTr9":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * State manager responsible for controlling the lifecycle of scene dioramas.
 * Acts as a behavioral routing engine that dynamically instantiates, configures,
 * and disposes of specialized diorama classes based on structural commands.
 */ parcelHelpers.export(exports, "DioramaManager", ()=>DioramaManager);
var _heroDiorama = require("./hero/heroDiorama");
var _frogCommands = require("../diorama/hero/frogCommands");
var _error = require("../../../core/errors/error");
class DioramaManager {
    /**
   * Creates an instance of DioramaManager.
   * @param {Object} frog - The main character context instance orchestrating the entity state.
   * @throws {ValidationError} If the required 'frog' parameter is missing or invalid.
   */ constructor(frog){
        // Type validation and dependency checking on initialization
        if (!frog || typeof frog !== "object") throw new (0, _error.ValidationError)("DioramaManager", "Initialization failed: Required parameter 'frog' instance is missing or invalid.");
        /**
     * Parent context character reference.
     * @type {Object}
     */ this.frog = frog;
        /**
     * The currently active diorama runtime instance. Null if no trigger zone is active.
     * @type {Object|null}
     */ this.currentDiorama = null;
        /**
     * Tracked identifier key of the currently active command state.
     * @type {string|null}
     */ this.currentAction = null;
        /**
     * Internal registry mapping command keys to explicit Diorama class constructors.
     * @type {Record<string, typeof import("../baseDiorama").BaseDiorama>}
     */ this.dioramaMap = {
            SIT_AND_TYPE: (0, _heroDiorama.HeroDiorama)
        };
    }
    /**
   * Evaluates and orchestrates the transition between the current diorama and a targeted command state.
   * Gracefully shuts down the active diorama lifecycle before re-allocating new domain contexts.
   * @param {string} [commandKey=""] - The targeted trigger configuration command key. Defaults to an empty string.
   * @returns {void}
   */ switchDiorama(commandKey = "") {
        // Fallback: If commandKey is falsy or missing, automatically trigger full clear and stop execution
        if (!commandKey) {
            this.clear();
            return;
        }
        // Performance optimization: Avoid redundant operations if the targeted state is already active
        if (this.currentDiorama && this.currentAction === commandKey) return;
        // Safely exit and unbind the running context before dereferencing
        if (this.currentDiorama) {
            this.currentDiorama.exit();
            this.currentDiorama = null;
        }
        this.currentAction = commandKey;
        // Fallback protection against structural dictionary property access issues
        const DioramaClass = this.dioramaMap[commandKey];
        const config = (0, _frogCommands.FrogCommands) ? (0, _frogCommands.FrogCommands)[commandKey] : null;
        // Instantiate and execute the new diorama state only if both class and configuration exist
        if (DioramaClass && config) {
            this.currentDiorama = new DioramaClass(this.frog, config);
            this.currentDiorama.enter();
        } else {
            // Automatic fallback reset in case of invalid or unregistered data mappings
            this.currentDiorama = null;
            this.currentAction = null;
        }
    }
    /**
   * Forces an immediate teardown of the active diorama context.
   * Resets all operational trackers to an idle/clean state.
   * @returns {void}
   */ clear() {
        if (this.currentDiorama) {
            this.currentDiorama.exit();
            this.currentDiorama = null;
        }
        this.currentAction = null;
    }
}

},{"./hero/heroDiorama":"lc4kb","../diorama/hero/frogCommands":"4r6US","../../../core/errors/error":"5lvuz","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"lc4kb":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Representation of a structured, sequence-driven animation diorama for the Hero character.
 * Implements a data-driven Finite State Machine (FSM) that loops through automated animation flows.
 * @extends BaseDiorama
 */ parcelHelpers.export(exports, "HeroDiorama", ()=>HeroDiorama);
var _baseDiorama = require("../baseDiorama");
var _interruptPool = require("./interruptPool");
var _error = require("../../../../core/errors/error");
var _errorReport = require("../../../../core/errors/errorReport");
class HeroDiorama extends (0, _baseDiorama.BaseDiorama) {
    /**
   * Creates an instance of HeroDiorama.
   * @param {Object} frog - The main frog character instance containing the animation manager.
   * @param {Object} config - Configuration object containing scene position, rotation, and limits.
   */ constructor(frog, config){
        super(frog, config);
        /**
     * Index tracking the currently active sequence template from the global pool.
     * @type {number}
     */ this.poolIndex = 0;
        /**
     * Deep copy of the active animation sequence track currently playing.
     * @type {Array<Object>}
     */ this.activeSequence = [];
        /**
     * Pointer tracking the current step/animation index within the active sequence.
     * @type {number}
     */ this.sequenceIndex = 0;
        /**
     * Cached bound event handler reference for the Three.js AnimationMixer listener removal.
     * @type {Function}
     */ this.onFinishedBound = this._onFinished.bind(this);
    }
    /**
   * Initializes the diorama lifecycle. Hooks into the mixer timeline and triggers the loop.
   * @override
   * @returns {void}
   */ enter() {
        this.frog.animationManager.mixer.addEventListener("finished", this.onFinishedBound);
        this._startNewSequence();
    }
    /**
   * Fetches, clones, and initializes the next structural sequence chain from the configuration pool.
   * Dispatches validation errors to the centralized ErrorReport system if the pool is corrupted.
   * @private
   * @throws {ValidationError} If the target sequence template is missing or empty.
   * @returns {void}
   */ _startNewSequence() {
        const sequenceTemplate = (0, _interruptPool.INTERRUPT_POOL)[this.poolIndex];
        if (!sequenceTemplate || sequenceTemplate.length === 0) {
            const validationError = new (0, _error.ValidationError)("HeroDiorama", `INTERRUPT_POOL at index [${this.poolIndex}] is empty, undefined, or corrupted.`);
            (0, _errorReport.ErrorReport).handle(validationError);
            return;
        }
        this.activeSequence = JSON.parse(JSON.stringify(sequenceTemplate));
        this.sequenceIndex = 0;
        this.poolIndex = (this.poolIndex + 1) % (0, _interruptPool.INTERRUPT_POOL).length;
        this._playCurrentStep();
    }
    /**
   * Configures standard playback properties and dispatches execution commands to the core AnimationManager.
   * @private
   * @returns {void}
   */ _playCurrentStep() {
        const currentStep = this.activeSequence[this.sequenceIndex];
        if (!currentStep) {
            this._startNewSequence();
            return;
        }
        this.frog.animationManager.play(currentStep, 0.3);
    }
    /**
   * Event listener callback triggered synchronously when a non-looping Three.js animation action finishes.
   * Evaluates sequential progress and triggers incremental stepping.
   * @param {Object} e - Native event payload emitted by the THREE.AnimationMixer.
   * @param {Object} e.action - The specific AnimationAction that just completed.
   * @private
   * @returns {void}
   */ _onFinished(e) {
        const currentStep = this.activeSequence[this.sequenceIndex];
        if (!currentStep) return;
        const expectedAction = this.frog.animationManager.actions.get(currentStep.name);
        if (e.action === expectedAction) {
            if (this.sequenceIndex < this.activeSequence.length - 1) {
                this.sequenceIndex++;
                this._playCurrentStep();
            } else this._startNewSequence();
        }
    }
    /**
   * Clears event subscriptions and nullifies domain model bindings to guarantee memory release.
   * @override
   * @returns {void}
   */ exit() {
        this.frog.animationManager.mixer.removeEventListener("finished", this.onFinishedBound);
        if (this.frog.animationManager) this.frog.animationManager.stop(0);
        this.activeSequence = [];
        this.sequenceIndex = 0;
    }
}

},{"../baseDiorama":"lqKYA","./interruptPool":"dc2Nb","../../../../core/errors/error":"5lvuz","../../../../core/errors/errorReport":"ngGmH","@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"lqKYA":[function(require,module,exports,__globalThis) {
/**
 * @abstract
 * Class representing the base contract for all scene dioramas.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "BaseDiorama", ()=>BaseDiorama);
class BaseDiorama {
    /**
   * @param {Object} frog - The main frog character instance.
   * @param {Object} config - Configuration object containing position, rotation, and commands.
   */ constructor(frog, config){
        if (new.target === BaseDiorama) throw new TypeError("Cannot directly instantiate abstract class BaseDiorama.");
        /** @type {Object} */ this.frog = frog;
        /** @type {Object} */ this.config = config;
    }
    /**
   * Triggered when the camera enters the trigger zone of this diorama.
   * @abstract
   * @throws {Error} If not implemented by the subclass.
   * @returns {void}
   */ enter() {
        throw new Error("Method 'enter()' must be implemented in the subclass.");
    }
    /**
   * Triggered when the camera leaves the trigger zone of this diorama.
   * @returns {void}
   */ exit() {
    // Optional lifecycle method for clearing timers, events, etc.
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"dc2Nb":[function(require,module,exports,__globalThis) {
/**
 * @typedef {Object} SequenceStep
 * @property {string} name - The unique registration name of the target animation clip.
 * @property {boolean} loop - Determines if the animation track should loop or play once.
 * @property {number} [repeat] - Optional iteration counter specifying how many times a looping animation repeats before firing the "finished" event.
 * @property {number} [timeScale] - Optional playback velocity modifier (e.g., 1.0 for normal speed, 2.0 for double speed).
 */ /**
 * Global pool containing predefined, multi-step animation sequences (tracks).
 * Each inner array represents a complete structural chain that the HeroDiorama
 * will execute sequentially from the first to the last step.
 * * @type {Array<SequenceStep[]>}
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "INTERRUPT_POOL", ()=>INTERRUPT_POOL);
const INTERRUPT_POOL = [
    [
        {
            name: "typing",
            loop: true,
            repeat: 3,
            timeScale: 0.6
        },
        {
            name: "praying",
            loop: true,
            repeat: 3,
            timeScale: 1.0
        },
        {
            name: "standing_victory",
            loop: false,
            timeScale: 1.0
        }
    ],
    [
        {
            name: "typing",
            loop: true,
            repeat: 3,
            timeScale: 0.6
        },
        {
            name: "sitting_pose",
            loop: true,
            repeat: 5,
            timeScale: 1.0
        },
        {
            name: "sitting_victory",
            loop: false,
            timeScale: 1.0
        }
    ],
    [
        {
            name: "typing",
            loop: true,
            repeat: 3,
            timeScale: 0.6
        },
        {
            name: "sitting_pose",
            loop: true,
            repeat: 5,
            timeScale: 1.0
        },
        {
            name: "typing",
            loop: true,
            repeat: 2,
            timeScale: 0.6
        },
        {
            name: "praying",
            loop: true,
            repeat: 3,
            timeScale: 1.0
        },
        {
            name: "sitting_victory2",
            loop: false,
            timeScale: 1.0
        }
    ]
];

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"4r6US":[function(require,module,exports,__globalThis) {
/**
 * @typedef {Object} SequenceStep
 * @property {string} name - The unique registration name of the target animation clip.
 * @property {boolean} loop - Determines if the animation track should repeat.
 * @property {number} [repeat] - Optional iteration counter for THREE.LoopRepeat cycles.
 * @property {number} [timeScale] - Optional playback velocity modifier (default is 1.0).
 */ /**
 * @typedef {Object} FrogCommandConfig
 * @property {SequenceStep[]} sequence - Array of animation steps defining the structural diorama flow.
 * @property {number[]} position - Spatial coordinates mapped as an [X, Y, Z] position array.
 * @property {number} rotationY - Target yaw rotation angle expressed in radians.
 */ /**
 * Global configuration registry mapping trigger command keys to spatial parameters and animation sequences.
 * Serves as the primary data source for the DioramaManager state allocation.
 * * @type {Record<string, FrogCommandConfig>}
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FrogCommands", ()=>FrogCommands);
const FrogCommands = {
    SIT_AND_TYPE: {
        sequence: [
            {
                name: "typing",
                loop: true
            }
        ],
        position: [
            10,
            0,
            -25
        ],
        rotationY: -Math.PI / 1.7
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}],"3SxCb":[function(require,module,exports,__globalThis) {
/**
 * @typedef {Object} FrogTrigger
 * @property {string} id - The unique identifier of the trigger zone.
 * @property {number[]} position - Spatial [X, Y, Z] coordinates representing the center of the trigger zone.
 * @property {number} radius - The proximity radius threshold from the camera position that activates the command.
 * @property {string} command - The target command key mapped to an explicit definition within FrogCommands.
 */ /**
 * Global configuration array defining spatial proximity trigger boundaries for the character.
 * Used by the proximity evaluation engine to dynamically allocate behavior states.
 * * @type {FrogTrigger[]}
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FROG_TRIGGER_CONFIG", ()=>FROG_TRIGGER_CONFIG);
const FROG_TRIGGER_CONFIG = [
    {
        id: "main_zone",
        position: [
            -5,
            4,
            -10
        ],
        radius: 23,
        command: "SIT_AND_TYPE"
    }
];

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jnFvT"}]},["8rGkk"], null, "parcelRequire2041", {})

//# sourceMappingURL=world.ad3de1a8.js.map
