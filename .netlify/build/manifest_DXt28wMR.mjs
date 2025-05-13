import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';
import { N as NOOP_MIDDLEWARE_HEADER, g as decodeKey } from './chunks/astro/server_CG0ojw6Q.mjs';
import 'cookie';
import 'es-module-lexer';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/alexpoian/Desktop/sitoastroFra/francescayoga/","cacheDir":"file:///Users/alexpoian/Desktop/sitoastroFra/francescayoga/node_modules/.astro/","outDir":"file:///Users/alexpoian/Desktop/sitoastroFra/francescayoga/dist/","srcDir":"file:///Users/alexpoian/Desktop/sitoastroFra/francescayoga/src/","publicDir":"file:///Users/alexpoian/Desktop/sitoastroFra/francescayoga/public/","buildClientDir":"file:///Users/alexpoian/Desktop/sitoastroFra/francescayoga/dist/","buildServerDir":"file:///Users/alexpoian/Desktop/sitoastroFra/francescayoga/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"chisono/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/chisono","isIndex":false,"type":"page","pattern":"^\\/chisono\\/?$","segments":[[{"content":"chisono","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/chisono.astro","pathname":"/chisono","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"contattami/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contattami","isIndex":false,"type":"page","pattern":"^\\/contattami\\/?$","segments":[[{"content":"contattami","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contattami.astro","pathname":"/contattami","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"orarielezioni/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/orarielezioni","isIndex":false,"type":"page","pattern":"^\\/orarielezioni\\/?$","segments":[[{"content":"orarielezioni","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/orarielezioni.astro","pathname":"/orarielezioni","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"privacy/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/privacy","isIndex":false,"type":"page","pattern":"^\\/privacy\\/?$","segments":[[{"content":"privacy","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/privacy.astro","pathname":"/privacy","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/alexpoian/Desktop/sitoastroFra/francescayoga/src/pages/chisono.astro",{"propagation":"none","containsHead":true}],["/Users/alexpoian/Desktop/sitoastroFra/francescayoga/src/pages/contattami.astro",{"propagation":"none","containsHead":true}],["/Users/alexpoian/Desktop/sitoastroFra/francescayoga/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/alexpoian/Desktop/sitoastroFra/francescayoga/src/pages/orarielezioni.astro",{"propagation":"none","containsHead":true}],["/Users/alexpoian/Desktop/sitoastroFra/francescayoga/src/pages/privacy.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/chisono@_@astro":"pages/chisono.astro.mjs","\u0000@astro-page:src/pages/contattami@_@astro":"pages/contattami.astro.mjs","\u0000@astro-page:src/pages/orarielezioni@_@astro":"pages/orarielezioni.astro.mjs","\u0000@astro-page:src/pages/privacy@_@astro":"pages/privacy.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DXt28wMR.mjs","/Users/alexpoian/Desktop/sitoastroFra/francescayoga/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","/Users/alexpoian/Desktop/sitoastroFra/francescayoga/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.10wEBSSN.js","/Users/alexpoian/Desktop/sitoastroFra/francescayoga/src/pages/contattami.astro?astro&type=script&index=0&lang.ts":"_astro/contattami.astro_astro_type_script_index_0_lang.SztZYhlL.js","/Users/alexpoian/Desktop/sitoastroFra/francescayoga/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.CuRouRmb.js","/Users/alexpoian/Desktop/sitoastroFra/francescayoga/src/pages/index.astro?astro&type=script&index=1&lang.ts":"_astro/index.astro_astro_type_script_index_1_lang.BN1GIMT9.js","/Users/alexpoian/Desktop/sitoastroFra/francescayoga/src/layouts/Layout.astro?astro&type=script&index=1&lang.ts":"_astro/Layout.astro_astro_type_script_index_1_lang.Dg2aTfve.js","/Users/alexpoian/Desktop/sitoastroFra/francescayoga/src/layouts/Layout.astro?astro&type=script&index=2&lang.ts":"_astro/Layout.astro_astro_type_script_index_2_lang.C6IxgUTk.js","/Users/alexpoian/Desktop/sitoastroFra/francescayoga/src/components/Navbar.astro?astro&type=script&index=0&lang.ts":"_astro/Navbar.astro_astro_type_script_index_0_lang.DTCmq3bQ.js","/Users/alexpoian/Desktop/sitoastroFra/francescayoga/src/layouts/Layout.astro?astro&type=script&index=3&lang.ts":"_astro/Layout.astro_astro_type_script_index_3_lang.10wEBSSN.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/alexpoian/Desktop/sitoastroFra/francescayoga/src/pages/contattami.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const e=document.getElementById(\"modal\"),d=document.getElementById(\"openModal\"),n=document.getElementById(\"closeModal\");e&&d&&n&&(d.addEventListener(\"click\",t=>{t.preventDefault(),e.classList.remove(\"hidden\"),e.classList.add(\"flex\")}),n.addEventListener(\"click\",()=>{e.classList.add(\"hidden\"),e.classList.remove(\"flex\")}),e.addEventListener(\"click\",t=>{t.target===e&&(e.classList.add(\"hidden\"),e.classList.remove(\"flex\"))}))});"],["/Users/alexpoian/Desktop/sitoastroFra/francescayoga/src/pages/index.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{document.querySelectorAll(\".toggle-more\").forEach(s=>{s.addEventListener(\"click\",c=>{const t=c.currentTarget;if(!(t instanceof HTMLElement))return;const n=t.closest(\".card\"),e=n?.querySelector(\".extra-text\"),o=n?.querySelector(\".prenota-button\");e instanceof HTMLElement&&o instanceof HTMLElement&&(e.classList.toggle(\"hidden\"),o.classList.toggle(\"hidden\"),e.classList.contains(\"hidden\")?t.textContent=\"Leggi di più\":t.textContent=\"Nascondi\")})})});"],["/Users/alexpoian/Desktop/sitoastroFra/francescayoga/src/pages/index.astro?astro&type=script&index=1&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const t=document.getElementById(\"gallery-slider\"),n=document.getElementById(\"prev\"),d=document.getElementById(\"next\");if(t&&n&&d){const l=t.children;let e=0;const s=()=>{const c=e*-100;t.style.transform=`translateX(${c}%)`};d.addEventListener(\"click\",()=>{e<l.length-1&&(e++,s())}),n.addEventListener(\"click\",()=>{e>0&&(e--,s())})}});"],["/Users/alexpoian/Desktop/sitoastroFra/francescayoga/src/layouts/Layout.astro?astro&type=script&index=1&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const e=document.getElementById(\"cookie-banner\"),t=document.getElementById(\"accept-cookies\");e&&t&&(localStorage.getItem(\"cookieAccepted\")===\"true\"&&(e.style.display=\"none\"),t.addEventListener(\"click\",()=>{localStorage.setItem(\"cookieAccepted\",\"true\"),e.style.display=\"none\"}))});"],["/Users/alexpoian/Desktop/sitoastroFra/francescayoga/src/layouts/Layout.astro?astro&type=script&index=2&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const n=document.getElementById(\"contact-toggle\"),t=document.getElementById(\"contact-menu\");n&&t&&(n.addEventListener(\"click\",e=>{e.stopPropagation(),t.classList.toggle(\"hidden\")}),document.addEventListener(\"click\",e=>{const d=e.target;!t.contains(d)&&d!==n&&t.classList.add(\"hidden\")}),t.addEventListener(\"click\",e=>{e.stopPropagation()}))});"],["/Users/alexpoian/Desktop/sitoastroFra/francescayoga/src/components/Navbar.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const n=document.getElementById(\"menu-toggle\"),d=document.getElementById(\"mobile-menu\"),e=document.getElementById(\"menu-overlay\"),t=()=>{d?.classList.toggle(\"hidden\"),e?.classList.toggle(\"hidden\")};n?.addEventListener(\"click\",t),e?.addEventListener(\"click\",t)});"]],"assets":["/_astro/chisono.bnrjOYqN.css","/dolianova.jpg","/favicon.svg","/gallery1.jpg","/gallery2.jpg","/gallery3.jpg","/gallery4.jpg","/kindnessroots.jpg","/logo.png","/yoga-hero.jpg","/_astro/Layout.astro_astro_type_script_index_0_lang.10wEBSSN.js","/_astro/Layout.astro_astro_type_script_index_3_lang.10wEBSSN.js","/img/Screenshot 2025-02-13 alle 19.19.13.png","/img/aasas.png","/img/francesca.jpg","/img/gallery1.jpg","/img/gallery2.jpg","/img/gallery3.jpg","/img/gallery4.jpeg","/chisono/index.html","/contattami/index.html","/orarielezioni/index.html","/privacy/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"harlBUuJvJ6l0L/VzGO0GUdxuQbX8g4as/j1vxdOUqQ=","sessionConfig":{"driver":"fs-lite","options":{"base":"/Users/alexpoian/Desktop/sitoastroFra/francescayoga/node_modules/.astro/sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
