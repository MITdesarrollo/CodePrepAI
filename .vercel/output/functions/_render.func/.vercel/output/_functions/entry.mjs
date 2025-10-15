import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_0_yml2pD.mjs';
import { manifest } from './manifest_Uv8ax0QT.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/chat.astro.mjs');
const _page2 = () => import('./pages/contribuir.astro.mjs');
const _page3 = () => import('./pages/preguntas.astro.mjs');
const _page4 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/chat.js", _page1],
    ["src/pages/contribuir.astro", _page2],
    ["src/pages/preguntas.astro", _page3],
    ["src/pages/index.astro", _page4]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "437c6abf-4545-41e7-93c2-be04e7257420",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
