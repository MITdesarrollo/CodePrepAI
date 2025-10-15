import{r as u}from"./index.CVf8TyFT.js";var l={exports:{}},i={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var v=u,y=Symbol.for("react.element"),w=Symbol.for("react.fragment"),x=Object.prototype.hasOwnProperty,k=v.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,h={key:!0,ref:!0,__self:!0,__source:!0};function p(t,e,n){var r,o={},s=null,a=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(a=e.ref);for(r in e)x.call(e,r)&&!h.hasOwnProperty(r)&&(o[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)o[r]===void 0&&(o[r]=e[r]);return{$$typeof:y,type:t,key:s,ref:a,props:o,_owner:k.current}}i.Fragment=w;i.jsx=p;i.jsxs=p;l.exports=i;var j=l.exports,E={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const b=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),g=(t,e)=>{const n=u.forwardRef(({color:r="currentColor",size:o=24,strokeWidth:s=2,absoluteStrokeWidth:a,children:c,...f},m)=>u.createElement("svg",{ref:m,...E,width:o,height:o,stroke:r,strokeWidth:a?Number(s)*24/Number(o):s,className:`lucide lucide-${b(t)}`,...f},[...e.map(([d,_])=>u.createElement(d,_)),...(Array.isArray(c)?c:[c])||[]]));return n.displayName=`${t}`,n};var C=g;const L=C("MessageCircle",[["path",{d:"m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z",key:"v2veuj"}]]);export{L as M,C as c,j};
