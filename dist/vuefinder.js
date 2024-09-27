var Fo = Object.defineProperty;
var Ho = (t, e, n) => e in t ? Fo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var os = (t, e, n) => Ho(t, typeof e != "symbol" ? e + "" : e, n);
import { reactive as vt, watch as Oe, ref as O, shallowRef as Io, onMounted as Ee, onUnmounted as Gn, onUpdated as As, nextTick as ct, computed as Xe, inject as le, openBlock as _, createElementBlock as h, withKeys as At, unref as l, createElementVNode as r, withModifiers as Ot, renderSlot as Rt, normalizeClass as ge, toDisplayString as w, createBlock as z, resolveDynamicComponent as Vs, withCtx as X, createVNode as q, Fragment as ke, renderList as Ce, createCommentVNode as I, withDirectives as ue, vModelCheckbox as zt, createTextVNode as Y, vModelSelect as An, vModelText as Vt, onBeforeUnmount as No, customRef as Uo, vShow as ze, isRef as qo, TransitionGroup as Po, normalizeStyle as rn, mergeModels as zo, useModel as Ds, resolveComponent as Go, provide as jo, Transition as Wo } from "vue";
import Ko from "mitt";
import Yo from "dragselect";
import Lv from "@uppy/core";
import Rv from "@uppy/xhr-upload";
import Xo from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import Jo from "cropperjs";
var Ts;
const yn = (Ts = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : Ts.getAttribute("content");
class Qo {
  /** @param {RequestConfig} config */
  constructor(e) {
    /** @type {RequestConfig} */
    os(this, "config");
    this.config = e;
  }
  /** @type {RequestConfig} */
  get config() {
    return this.config;
  }
  /**
   * Transform request params
   * @param {Object} input
   * @param {String} input.url
   * @param {'get'|'post'|'put'|'patch'|'delete'} input.method
   * @param {Record<String,String>=} input.headers
   * @param {Record<String,?String>=} input.params
   * @param {Record<String,?String>|FormData=} input.body
   * @return {RequestTransformResultInternal}
   */
  transformRequestParams(e) {
    const n = this.config, o = {};
    yn != null && yn !== "" && (o[n.xsrfHeaderName] = yn);
    const s = Object.assign({}, n.headers, o, e.headers), a = Object.assign({}, n.params, e.params), c = e.body, d = n.baseUrl + e.url, i = e.method;
    let f;
    i !== "get" && (c instanceof FormData ? (f = c, n.body != null && Object.entries(this.config.body).forEach(([p, u]) => {
      f.append(p, u);
    })) : (f = { ...c }, n.body != null && Object.assign(f, this.config.body)));
    const m = {
      url: d,
      method: i,
      headers: s,
      params: a,
      body: f
    };
    if (n.transformRequest != null) {
      const p = n.transformRequest({
        url: d,
        method: i,
        headers: s,
        params: a,
        body: f
      });
      p.url != null && (m.url = p.url), p.method != null && (m.method = p.method), p.params != null && (m.params = p.params ?? {}), p.headers != null && (m.headers = p.headers ?? {}), p.body != null && (m.body = p.body);
    }
    return m;
  }
  /**
   * Get download url
   * @param {String} adapter
   * @param {String} node
   * @param {String} node.path
   * @param {String=} node.url
   * @return {String}
   */
  getDownloadUrl(e, n) {
    if (n.url != null)
      return n.url;
    const o = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "download", adapter: e, path: n.path }
    });
    return o.url + "?" + new URLSearchParams(o.params).toString();
  }
  /**
   * Get preview url
   * @param {String} adapter
   * @param {String} node
   * @param {String} node.path
   * @param {String=} node.url
   * @return {String}
   */
  getPreviewUrl(e, n) {
    if (n.url != null)
      return n.url;
    const o = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "preview", adapter: e, path: n.path }
    });
    return o.url + "?" + new URLSearchParams(o.params).toString();
  }
  /**
   * Send request
   * @param {Object} input
   * @param {String} input.url
   * @param {'get'|'post'|'put'|'patch'|'delete'} input.method
   * @param {Record<String,String>=} input.headers
   * @param {Record<String,?String>=} input.params
   * @param {(Record<String,?String>|FormData|null)=} input.body
   * @param {'arrayBuffer'|'blob'|'json'|'text'=} input.responseType
   * @param {AbortSignal=} input.abortSignal
   * @returns {Promise<(ArrayBuffer|Blob|Record<String,?String>|String|null)>}
   * @throws {Record<String,?String>|null} resp json error
   */
  async send(e) {
    const n = this.transformRequestParams(e), o = e.responseType || "json", s = {
      method: e.method,
      headers: n.headers,
      signal: e.abortSignal
    }, a = n.url + "?" + new URLSearchParams(n.params);
    if (n.method !== "get" && n.body != null) {
      let d;
      n.body instanceof FormData ? d = e.body : (d = JSON.stringify(n.body), s.headers["Content-Type"] = "application/json"), s.body = d;
    }
    const c = await fetch(a, s);
    if (c.ok)
      return await c[o]();
    throw await c.json();
  }
}
function Zo(t) {
  const e = {
    baseUrl: "",
    headers: {},
    params: {},
    body: {},
    xsrfHeaderName: "X-CSRF-Token"
  };
  return typeof t == "string" ? Object.assign(e, { baseUrl: t }) : Object.assign(e, t), new Qo(e);
}
function er(t) {
  let e = localStorage.getItem(t + "_storage");
  const n = vt(JSON.parse(e ?? "{}"));
  Oe(n, o);
  function o() {
    Object.keys(n).length ? localStorage.setItem(t + "_storage", JSON.stringify(n)) : localStorage.removeItem(t + "_storage");
  }
  function s(i, f) {
    n[i] = f;
  }
  function a(i) {
    delete n[i];
  }
  function c() {
    Object.keys(n).map((i) => a(i));
  }
  return { getStore: (i, f = null) => n.hasOwnProperty(i) ? n[i] : f, setStore: s, removeStore: a, clearStore: c };
}
async function tr(t, e) {
  const n = e[t];
  return typeof n == "function" ? (await n()).default : n;
}
function nr(t, e, n, o) {
  const { getStore: s, setStore: a } = t, c = O({}), d = O(s("locale", e)), i = (p, u = e) => {
    tr(p, o).then((v) => {
      c.value = v, a("locale", p), d.value = p, a("translations", v), Object.values(o).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + p }), n.emit("vf-language-saved"));
    }).catch((v) => {
      u ? (n.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), i(u, null)) : n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  Oe(d, (p) => {
    i(p);
  }), !s("locale") && !o.length ? i(e) : c.value = s("translations");
  const f = (p, ...u) => u.length ? f(p = p.replace("%s", u.shift()), ...u) : p;
  function m(p, ...u) {
    return c.value && c.value.hasOwnProperty(p) ? f(c.value[p], ...u) : f(p, ...u);
  }
  return vt({ t: m, locale: d });
}
const de = {
  EDIT: "edit",
  NEW_FILE: "newfile",
  NEW_FOLDER: "newfolder",
  PREVIEW: "preview",
  ARCHIVE: "archive",
  UNARCHIVE: "unarchive",
  SEARCH: "search",
  RENAME: "rename",
  UPLOAD: "upload",
  DELETE: "delete",
  FULL_SCREEN: "fullscreen",
  DOWNLOAD: "download",
  LANGUAGE: "language",
  SETONLY: "SetOnly",
  SETFILEONLY: "SetFileOnly",
  SETALLONLY: "SetAllOnly"
}, sr = Object.values(de), or = "2.5.16";
function Ms(t, e, n, o, s) {
  return (e = Math, n = e.log, o = 1024, s = n(t) / n(o) | 0, t / e.pow(o, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "iB" : "B");
}
function Ls(t, e, n, o, s) {
  return (e = Math, n = e.log, o = 1e3, s = n(t) / n(o) | 0, t / e.pow(o, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "B" : "B");
}
const tt = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function rr(t, e) {
  const n = O(tt.SYSTEM), o = O(tt.LIGHT);
  n.value = t.getStore("theme", e ?? tt.SYSTEM);
  const s = window.matchMedia("(prefers-color-scheme: dark)"), a = (c) => {
    n.value === tt.DARK || n.value === tt.SYSTEM && c.matches ? o.value = tt.DARK : o.value = tt.LIGHT;
  };
  return a(s), s.addEventListener("change", a), {
    /**
     * @type {import('vue').Ref<Theme>}
     */
    value: n,
    /**
     * @type {import('vue').Ref<Theme>}
     */
    actualValue: o,
    /**
     * @param {Theme} value
     */
    set(c) {
      n.value = c, c !== tt.SYSTEM ? t.setStore("theme", c) : t.removeStore("theme"), a(s);
    }
  };
}
function lr() {
  const t = Io(null), e = O(!1), n = O();
  return { visible: e, type: t, data: n, open: (a, c = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, t.value = a, n.value = c;
  }, close: () => {
    document.querySelector("body").style.overflow = "", e.value = !1, t.value = null;
  } };
}
/*!
 * OverlayScrollbars
 * Version: 2.7.3
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */
const Ie = (t, e) => {
  const { o: n, u: o, _: s } = t;
  let a = n, c;
  const d = (m, p) => {
    const u = a, v = m, g = p || (o ? !o(u, v) : u !== v);
    return (g || s) && (a = v, c = u), [a, g, c];
  };
  return [e ? (m) => d(e(a, c), m) : d, (m) => [a, !!m, c]];
}, Os = typeof window < "u" && typeof document < "u", Ve = Os ? window : {}, Kt = Math.max, ar = Math.min, Vn = Math.round, Rs = Ve.cancelAnimationFrame, Bs = Ve.requestAnimationFrame, Jt = Ve.setTimeout, Dn = Ve.clearTimeout, ln = (t) => typeof Ve[t] < "u" ? Ve[t] : void 0, ir = ln("MutationObserver"), rs = ln("IntersectionObserver"), Qt = ln("ResizeObserver"), Mn = ln("ScrollTimeline"), Fs = Os && Node.ELEMENT_NODE, { toString: cr, hasOwnProperty: kn } = Object.prototype, dr = /^\[object (.+)\]$/, Ht = (t) => t === void 0, an = (t) => t === null, ur = (t) => Ht(t) || an(t) ? `${t}` : cr.call(t).replace(dr, "$1").toLowerCase(), Ge = (t) => typeof t == "number", cn = (t) => typeof t == "string", Hs = (t) => typeof t == "boolean", je = (t) => typeof t == "function", Ue = (t) => Array.isArray(t), Bt = (t) => typeof t == "object" && !Ue(t) && !an(t), dn = (t) => {
  const e = !!t && t.length, n = Ge(e) && e > -1 && e % 1 == 0;
  return Ue(t) || !je(t) && n ? e > 0 && Bt(t) ? e - 1 in t : !0 : !1;
}, Zt = (t) => {
  if (!t || !Bt(t) || ur(t) !== "object")
    return !1;
  let e;
  const n = "constructor", o = t[n], s = o && o.prototype, a = kn.call(t, n), c = s && kn.call(s, "isPrototypeOf");
  if (o && !a && !c)
    return !1;
  for (e in t)
    ;
  return Ht(e) || kn.call(t, e);
}, en = (t) => {
  const e = HTMLElement;
  return t ? e ? t instanceof e : t.nodeType === Fs : !1;
}, un = (t) => {
  const e = Element;
  return t ? e ? t instanceof e : t.nodeType === Fs : !1;
};
function se(t, e) {
  if (dn(t))
    for (let n = 0; n < t.length && e(t[n], n, t) !== !1; n++)
      ;
  else t && se(Object.keys(t), (n) => e(t[n], n, t));
  return t;
}
const vn = (t, e) => t.indexOf(e) >= 0, Ye = (t, e) => t.concat(e), _e = (t, e, n) => (!cn(e) && dn(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), ft = (t) => Array.from(t || []), Is = (t) => Ue(t) ? t : [t], Ln = (t) => !!t && !t.length, ls = (t) => ft(new Set(t)), Re = (t, e, n) => {
  se(t, (s) => s && s.apply(void 0, e || [])), !n && (t.length = 0);
}, Ns = "paddingTop", Us = "paddingRight", qs = "paddingLeft", Ps = "paddingBottom", zs = "marginLeft", Gs = "marginRight", js = "marginBottom", fn = "overflowX", _n = "overflowY", St = "width", xt = "height", $t = "hidden", Ws = "visible", jn = (t, e, n, o) => {
  if (t && e) {
    let s = !0;
    return se(n, (a) => {
      const c = t[a], d = e[a];
      c !== d && (s = !1);
    }), s;
  }
  return !1;
}, Ks = (t, e) => jn(t, e, ["w", "h"]), Ys = (t, e) => jn(t, e, ["x", "y"]), vr = (t, e) => jn(t, e, ["t", "r", "b", "l"]), Ne = () => {
}, K = (t, ...e) => t.bind(0, ...e), gt = (t) => {
  let e;
  const n = t ? Jt : Bs, o = t ? Dn : Rs;
  return [(s) => {
    o(e), e = n(s, je(t) ? t() : t);
  }, () => o(e)];
}, Xs = (t, e) => {
  let n, o, s, a = Ne;
  const { v: c, p: d, S: i } = e || {}, f = function(g) {
    a(), Dn(n), n = o = void 0, a = Ne, t.apply(this, g);
  }, m = (v) => i && o ? i(o, v) : v, p = () => {
    a !== Ne && f(m(s) || s);
  }, u = function() {
    const g = ft(arguments), y = je(c) ? c() : c;
    if (Ge(y) && y >= 0) {
      const M = je(d) ? d() : d, S = Ge(M) && M >= 0, b = y > 0 ? Jt : Bs, $ = y > 0 ? Dn : Rs, R = m(g) || g, j = f.bind(0, R);
      a();
      const V = b(j, y);
      a = () => $(V), S && !n && (n = Jt(p, M)), o = s = R;
    } else
      f(g);
  };
  return u.m = p, u;
}, Js = (t, e) => Object.prototype.hasOwnProperty.call(t, e), st = (t) => t ? Object.keys(t) : [], ne = (t, e, n, o, s, a, c) => {
  const d = [e, n, o, s, a, c];
  return (typeof t != "object" || an(t)) && !je(t) && (t = {}), se(d, (i) => {
    se(i, (f, m) => {
      const p = i[m];
      if (t === p)
        return !0;
      const u = Ue(p);
      if (p && Zt(p)) {
        const v = t[m];
        let g = v;
        u && !Ue(v) ? g = [] : !u && !Zt(v) && (g = {}), t[m] = ne(g, p);
      } else
        t[m] = u ? p.slice() : p;
    });
  }), t;
}, Qs = (t, e) => se(ne({}, t), (n, o, s) => {
  n === void 0 ? delete s[o] : n && Zt(n) && (s[o] = Qs(n));
}), Wn = (t) => {
  for (const e in t)
    return !1;
  return !0;
}, On = (t, e, n) => Kt(t, ar(e, n)), dt = (t) => ft(new Set((Ue(t) ? t : (t || "").split(" ")).filter((e) => e))), mn = (t, e) => t && t.getAttribute(e), as = (t, e) => t && t.hasAttribute(e), He = (t, e, n) => {
  se(dt(e), (o) => {
    t && t.setAttribute(o, n || "");
  });
}, Pe = (t, e) => {
  se(dt(e), (n) => t && t.removeAttribute(n));
}, pn = (t, e) => {
  const n = dt(mn(t, e)), o = K(He, t, e), s = (a, c) => {
    const d = new Set(n);
    return se(dt(a), (i) => d[c](i)), ft(d).join(" ");
  };
  return {
    $: (a) => o(s(a, "delete")),
    O: (a) => o(s(a, "add")),
    C: (a) => {
      const c = dt(a);
      return c.reduce((d, i) => d && n.includes(i), c.length > 0);
    }
  };
}, Zs = (t, e, n) => {
  pn(t, e).$(n);
}, Ft = (t, e, n) => (pn(t, e).O(n), K(Zs, t, e, n)), Yt = (t, e, n, o) => {
  (o ? Ft : Zs)(t, e, n);
}, fr = (t, e, n) => pn(t, e).C(n), eo = (t) => pn(t, "class"), Kn = (t, e) => {
  eo(t).$(e);
}, tn = (t, e) => (eo(t).O(e), K(Kn, t, e)), to = (t, e) => {
  const n = [], o = e ? un(e) && e : document;
  return o ? _e(n, o.querySelectorAll(t)) : n;
}, _r = (t, e) => {
  const n = e ? un(e) && e : document;
  return n ? n.querySelector(t) : null;
}, nn = (t, e) => un(t) ? t.matches(e) : !1, no = (t) => nn(t, "body"), Rn = (t) => t ? ft(t.childNodes) : [], Ct = (t) => t && t.parentElement, bt = (t, e) => un(t) && t.closest(e), Bn = (t) => document.activeElement, mr = (t, e, n) => {
  const o = bt(t, e), s = t && _r(n, o), a = bt(s, e) === o;
  return o && s ? o === t || s === t || a && bt(bt(t, n), e) !== o : !1;
}, ot = (t) => {
  if (dn(t))
    se(ft(t), (e) => ot(e));
  else if (t) {
    const e = Ct(t);
    e && e.removeChild(t);
  }
}, so = (t, e, n) => {
  if (n && t) {
    let o = e, s;
    return dn(n) ? (s = document.createDocumentFragment(), se(n, (a) => {
      a === o && (o = a.previousSibling), s.appendChild(a);
    })) : s = n, e && (o ? o !== e && (o = o.nextSibling) : o = t.firstChild), t.insertBefore(s, o || null), () => ot(n);
  }
  return Ne;
}, Ae = (t, e) => so(t, null, e), is = (t, e) => so(Ct(t), t && t.nextSibling, e), wt = (t) => {
  const e = document.createElement("div");
  return He(e, "class", t), e;
}, oo = (t) => {
  const e = wt();
  return e.innerHTML = t.trim(), se(Rn(e), (n) => ot(n));
}, pr = /^--/, cs = (t, e) => t.getPropertyValue(e) || t[e] || "", Yn = (t) => {
  const e = t || 0;
  return isFinite(e) ? e : 0;
}, Gt = (t) => Yn(parseFloat(t || "")), ds = (t) => `${(Yn(t) * 100).toFixed(3)}%`, Fn = (t) => `${Yn(t)}px`;
function Et(t, e) {
  t && se(e, (n, o) => {
    try {
      const s = t.style, a = Ge(n) ? Fn(n) : (n || "") + "";
      pr.test(o) ? s.setProperty(o, a) : s[o] = a;
    } catch {
    }
  });
}
function ut(t, e, n) {
  const o = cn(e);
  let s = o ? "" : {};
  if (t) {
    const a = Ve.getComputedStyle(t, n) || t.style;
    s = o ? cs(a, e) : e.reduce((c, d) => (c[d] = cs(a, d), c), s);
  }
  return s;
}
const nt = (t) => ut(t, "direction") === "rtl", us = (t, e, n) => {
  const o = e ? `${e}-` : "", s = n ? `-${n}` : "", a = `${o}top${s}`, c = `${o}right${s}`, d = `${o}bottom${s}`, i = `${o}left${s}`, f = ut(t, [a, c, d, i]);
  return {
    t: Gt(f[a]),
    r: Gt(f[c]),
    b: Gt(f[d]),
    l: Gt(f[i])
  };
}, Sn = (t, e) => `translate${Bt(t) ? `(${t.x},${t.y})` : `${e ? "X" : "Y"}(${t})`}`, hr = {
  w: 0,
  h: 0
}, hn = (t, e) => e ? {
  w: e[`${t}Width`],
  h: e[`${t}Height`]
} : hr, gr = (t) => hn("inner", t || Ve), Lt = K(hn, "offset"), ro = K(hn, "client"), Hn = K(hn, "scroll"), Xn = (t) => {
  const e = parseFloat(ut(t, St)) || 0, n = parseFloat(ut(t, xt)) || 0;
  return {
    w: e - Vn(e),
    h: n - Vn(n)
  };
}, yt = (t) => t.getBoundingClientRect(), In = (t) => !!(t && (t[xt] || t[St])), lo = (t, e) => {
  const n = In(t);
  return !In(e) && n;
}, vs = (t, e, n, o) => {
  se(dt(e), (s) => {
    t.removeEventListener(s, n, o);
  });
}, fe = (t, e, n, o) => {
  var s;
  const a = (s = o && o.H) != null ? s : !0, c = o && o.I || !1, d = o && o.A || !1, i = {
    passive: a,
    capture: c
  };
  return K(Re, dt(e).map((f) => {
    const m = d ? (p) => {
      vs(t, f, m, c), n(p);
    } : n;
    return t.addEventListener(f, m, i), K(vs, t, f, m, c);
  }));
}, Jn = (t) => t.stopPropagation(), fs = (t) => t.preventDefault(), br = {
  x: 0,
  y: 0
}, xn = (t) => {
  const e = t && yt(t);
  return e ? {
    x: e.left + Ve.scrollX,
    y: e.top + Ve.scrollY
  } : br;
}, sn = (t, e, n) => n ? n.n ? -t + 0 : n.i ? e - t : t : t, _s = (t, e) => [sn(0, t, e), sn(t, t, e)], ms = (t, e, n) => On(0, 1, sn(t, e, n) / e || 0), rt = (t, e) => {
  const { x: n, y: o } = Ge(e) ? {
    x: e,
    y: e
  } : e || {};
  Ge(n) && (t.scrollLeft = n), Ge(o) && (t.scrollTop = o);
}, Tt = (t) => ({
  x: t.scrollLeft,
  y: t.scrollTop
}), ps = (t, e) => {
  se(Is(e), t);
}, Nn = (t) => {
  const e = /* @__PURE__ */ new Map(), n = (a, c) => {
    if (a) {
      const d = e.get(a);
      ps((i) => {
        d && d[i ? "delete" : "clear"](i);
      }, c);
    } else
      e.forEach((d) => {
        d.clear();
      }), e.clear();
  }, o = (a, c) => {
    if (cn(a)) {
      const f = e.get(a) || /* @__PURE__ */ new Set();
      return e.set(a, f), ps((m) => {
        je(m) && f.add(m);
      }, c), K(n, a, c);
    }
    Hs(c) && c && n();
    const d = st(a), i = [];
    return se(d, (f) => {
      const m = a[f];
      m && _e(i, o(f, m));
    }), K(Re, i);
  }, s = (a, c) => {
    se(ft(e.get(a)), (d) => {
      c && !Ln(c) ? d.apply(0, c) : d();
    });
  };
  return o(t || {}), [o, n, s];
}, hs = (t) => JSON.stringify(t, (e, n) => {
  if (je(n))
    throw 0;
  return n;
}), gs = (t, e) => t ? `${e}`.split(".").reduce((n, o) => n && Js(n, o) ? n[o] : void 0, t) : void 0, wr = {
  paddingAbsolute: !1,
  showNativeOverlaidScrollbars: !1,
  update: {
    elementEvents: [["img", "load"]],
    debounce: [0, 33],
    attributes: null,
    ignoreMutation: null
  },
  overflow: {
    x: "scroll",
    y: "scroll"
  },
  scrollbars: {
    theme: "os-theme-dark",
    visibility: "auto",
    autoHide: "never",
    autoHideDelay: 1300,
    autoHideSuspend: !1,
    dragScroll: !0,
    clickScroll: !1,
    pointers: ["mouse", "touch", "pen"]
  }
}, ao = (t, e) => {
  const n = {}, o = Ye(st(e), st(t));
  return se(o, (s) => {
    const a = t[s], c = e[s];
    if (Bt(a) && Bt(c))
      ne(n[s] = {}, ao(a, c)), Wn(n[s]) && delete n[s];
    else if (Js(e, s) && c !== a) {
      let d = !0;
      if (Ue(a) || Ue(c))
        try {
          hs(a) === hs(c) && (d = !1);
        } catch {
        }
      d && (n[s] = c);
    }
  }), n;
}, bs = (t, e, n) => (o) => [gs(t, o), n || gs(e, o) !== void 0], It = "data-overlayscrollbars", Xt = "os-environment", jt = `${Xt}-scrollbar-hidden`, $n = `${It}-initialize`, Te = It, io = `${Te}-overflow-x`, co = `${Te}-overflow-y`, uo = "overflowVisible", yr = "scrollbarPressed", Un = "updating", kr = "body", Ke = `${It}-viewport`, Sr = "arrange", vo = "scrollbarHidden", kt = uo, qn = `${It}-padding`, xr = kt, ws = `${It}-content`, Qn = "os-size-observer", $r = `${Qn}-appear`, Cr = `${Qn}-listener`, Er = "os-trinsic-observer", Tr = "os-theme-none", De = "os-scrollbar", Ar = `${De}-rtl`, Vr = `${De}-horizontal`, Dr = `${De}-vertical`, fo = `${De}-track`, Zn = `${De}-handle`, Mr = `${De}-visible`, Lr = `${De}-cornerless`, ys = `${De}-interaction`, ks = `${De}-unusable`, Pn = `${De}-auto-hide`, Ss = `${Pn}-hidden`, xs = `${De}-wheel`, Or = `${fo}-interactive`, Rr = `${Zn}-interactive`, _o = {}, mo = {}, Br = (t) => {
  se(t, (e) => se(e, (n, o) => {
    _o[o] = e[o];
  }));
}, po = (t, e, n) => st(t).map((o) => {
  const { static: s, instance: a } = t[o], [c, d, i] = n || [], f = n ? a : s;
  if (f) {
    const m = n ? f(c, d, e) : f(e);
    return (i || mo)[o] = m;
  }
}), Dt = (t) => mo[t], Fr = "__osOptionsValidationPlugin", Hr = "__osSizeObserverPlugin", Ir = (t, e) => {
  const { T: n } = e, [o, s] = t("showNativeOverlaidScrollbars");
  return [o && n.x && n.y, s];
}, on = (t) => t.indexOf(Ws) === 0, ho = (t, e) => {
  const { D: n } = t, o = (i) => {
    const f = ut(n, i), p = (e ? e[i] : f) === "scroll";
    return [f, p];
  }, [s, a] = o(fn), [c, d] = o(_n);
  return {
    k: {
      x: s,
      y: c
    },
    R: {
      x: a,
      y: d
    }
  };
}, Nr = (t, e, n, o) => {
  const s = e.x || e.y, a = (m, p) => {
    const u = on(m), v = u && s ? "hidden" : "", g = p && u && m.replace(`${Ws}-`, "") || v;
    return [p && !u ? m : "", on(g) ? "hidden" : g];
  }, [c, d] = a(n.x, e.x), [i, f] = a(n.y, e.y);
  return o[fn] = d && i ? d : c, o[_n] = f && c ? f : i, ho(t, o);
}, es = "__osScrollbarsHidingPlugin", Ur = "__osClickScrollPlugin";
let Cn;
const qr = () => {
  const t = (b, $, D) => {
    Ae(document.body, b), Ae(document.body, b);
    const R = ro(b), j = Lt(b), V = Xn($);
    return D && ot(b), {
      x: j.h - R.h + V.h,
      y: j.w - R.w + V.w
    };
  }, e = (b) => {
    let $ = !1;
    const D = tn(b, jt);
    try {
      $ = ut(b, "scrollbar-width") === "none" || ut(b, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return D(), $;
  }, n = (b, $) => {
    Et(b, {
      [fn]: $t,
      [_n]: $t,
      direction: "rtl"
    }), rt(b, {
      x: 0
    });
    const D = xn(b), R = xn($);
    rt(b, {
      x: -999
    });
    const j = xn($);
    return {
      i: D.x === R.x,
      n: R.x !== j.x
    };
  }, o = `.${Xt}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Xt} div{width:200%;height:200%;margin:10px 0}.${jt}{scrollbar-width:none!important}.${jt}::-webkit-scrollbar,.${jt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, a = oo(`<div class="${Xt}"><div></div><style>${o}</style></div>`)[0], c = a.firstChild, [d, , i] = Nn(), [f, m] = Ie({
    o: t(a, c),
    u: Ys
  }, K(t, a, c, !0)), [p] = m(), u = e(a), v = {
    x: p.x === 0,
    y: p.y === 0
  }, g = {
    elements: {
      host: null,
      padding: !u,
      viewport: (b) => u && no(b) && b,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, y = ne({}, wr), L = K(ne, {}, y), M = K(ne, {}, g), S = {
    P: p,
    T: v,
    L: u,
    J: !!Mn,
    K: n(a, c),
    Z: K(d, "r"),
    G: M,
    tt: (b) => ne(g, b) && M(),
    nt: L,
    ot: (b) => ne(y, b) && L(),
    st: ne({}, g),
    et: ne({}, y)
  };
  return Pe(a, "style"), ot(a), Ve.addEventListener("resize", () => {
    let b;
    if (!u && (!v.x || !v.y)) {
      const $ = Dt(es);
      b = !!($ ? $.Y() : Ne)(S, f);
    }
    i("r", [b]);
  }), S;
}, Be = () => (Cn || (Cn = qr()), Cn), go = (t, e) => je(e) ? e.apply(0, t) : e, Pr = (t, e, n, o) => {
  const s = Ht(o) ? n : o;
  return go(t, s) || e.apply(0, t);
}, bo = (t, e, n, o) => {
  const s = Ht(o) ? n : o, a = go(t, s);
  return !!a && (en(a) ? a : e.apply(0, t));
}, zr = (t, e) => {
  const { nativeScrollbarsOverlaid: n, body: o } = e || {}, { T: s, L: a, G: c } = Be(), { nativeScrollbarsOverlaid: d, body: i } = c().cancel, f = n ?? d, m = Ht(o) ? i : o, p = (s.x || s.y) && f, u = t && (an(m) ? !a : m);
  return !!p || !!u;
}, ts = /* @__PURE__ */ new WeakMap(), Gr = (t, e) => {
  ts.set(t, e);
}, jr = (t) => {
  ts.delete(t);
}, wo = (t) => ts.get(t), Wr = (t, e, n) => {
  let o = !1;
  const s = n ? /* @__PURE__ */ new WeakMap() : !1, a = () => {
    o = !0;
  }, c = (d) => {
    if (s && n) {
      const i = n.map((f) => {
        const [m, p] = f || [];
        return [p && m ? (d || to)(m, t) : [], p];
      });
      se(i, (f) => se(f[0], (m) => {
        const p = f[1], u = s.get(m) || [];
        if (t.contains(m) && p) {
          const g = fe(m, p, (y) => {
            o ? (g(), s.delete(m)) : e(y);
          });
          s.set(m, _e(u, g));
        } else
          Re(u), s.delete(m);
      }));
    }
  };
  return c(), [a, c];
}, $s = (t, e, n, o) => {
  let s = !1;
  const { ct: a, rt: c, lt: d, it: i, ut: f, dt: m } = o || {}, p = Xs(() => s && n(!0), {
    v: 33,
    p: 99
  }), [u, v] = Wr(t, p, d), g = a || [], y = c || [], L = Ye(g, y), M = (b, $) => {
    if (!Ln($)) {
      const D = f || Ne, R = m || Ne, j = [], V = [];
      let k = !1, x = !1;
      if (se($, (A) => {
        const { attributeName: F, target: H, type: U, oldValue: Q, addedNodes: oe, removedNodes: W } = A, Z = U === "attributes", ve = U === "childList", G = t === H, ie = Z && F, ae = ie && mn(H, F || "") || null, ce = ie && Q !== ae, Se = vn(y, F) && ce;
        if (e && (ve || !G)) {
          const be = Z && ce, me = be && i && nn(H, i), T = (me ? !D(H, F, Q, ae) : !Z || be) && !R(A, !!me, t, o);
          se(oe, (E) => _e(j, E)), se(W, (E) => _e(j, E)), x = x || T;
        }
        !e && G && ce && !D(H, F, Q, ae) && (_e(V, F), k = k || Se);
      }), v((A) => ls(j).reduce((F, H) => (_e(F, to(A, H)), nn(H, A) ? _e(F, H) : F), [])), e)
        return !b && x && n(!1), [!1];
      if (!Ln(V) || k) {
        const A = [ls(V), k];
        return !b && n.apply(0, A), A;
      }
    }
  }, S = new ir(K(M, !1));
  return [() => (S.observe(t, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: L,
    subtree: e,
    childList: e,
    characterData: e
  }), s = !0, () => {
    s && (u(), S.disconnect(), s = !1);
  }), () => {
    if (s)
      return p.m(), M(!0, S.takeRecords());
  }];
}, yo = (t, e, n) => {
  const { ft: s, _t: a } = n || {}, c = Dt(Hr), { K: d } = Be(), i = K(nt, t), [f] = Ie({
    o: !1,
    _: !0
  });
  return () => {
    const m = [], u = oo(`<div class="${Qn}"><div class="${Cr}"></div></div>`)[0], v = u.firstChild, g = (y) => {
      const L = y instanceof ResizeObserverEntry, M = !L && Ue(y);
      let S = !1, b = !1, $ = !0;
      if (L) {
        const [D, , R] = f(y.contentRect), j = In(D), V = lo(D, R);
        b = !R || V, S = !b && !j, $ = !S;
      } else M ? [, $] = y : b = y === !0;
      if (s && $) {
        const D = M ? y[0] : nt(u);
        rt(u, {
          x: sn(3333333, 3333333, D && d),
          y: 3333333
        });
      }
      S || e({
        vt: M ? y : void 0,
        ht: !M,
        _t: b
      });
    };
    if (Qt) {
      const y = new Qt((L) => g(L.pop()));
      y.observe(v), _e(m, () => {
        y.disconnect();
      });
    } else if (c) {
      const [y, L] = c(v, g, a);
      _e(m, Ye([tn(u, $r), fe(u, "animationstart", y)], L));
    } else
      return Ne;
    if (s) {
      const [y] = Ie({
        o: void 0
      }, i);
      _e(m, fe(u, "scroll", (L) => {
        const M = y(), [S, b, $] = M;
        b && (Kn(v, "ltr rtl"), tn(v, S ? "rtl" : "ltr"), g([!!S, b, $])), Jn(L);
      }));
    }
    return K(Re, _e(m, Ae(t, u)));
  };
}, Kr = (t, e) => {
  let n;
  const o = (i) => i.h === 0 || i.isIntersecting || i.intersectionRatio > 0, s = wt(Er), [a] = Ie({
    o: !1
  }), c = (i, f) => {
    if (i) {
      const m = a(o(i)), [, p] = m;
      return p && !f && e(m) && [m];
    }
  }, d = (i, f) => c(f.pop(), i);
  return [() => {
    const i = [];
    if (rs)
      n = new rs(K(d, !1), {
        root: t
      }), n.observe(s), _e(i, () => {
        n.disconnect();
      });
    else {
      const f = () => {
        const m = Lt(s);
        c(m);
      };
      _e(i, yo(s, f)()), f();
    }
    return K(Re, _e(i, Ae(t, s)));
  }, () => n && d(!0, n.takeRecords())];
}, Yr = (t, e, n, o) => {
  let s, a, c, d, i, f;
  const { L: m } = Be(), p = `[${Te}]`, u = `[${Ke}]`, v = ["tabindex"], g = ["wrap", "cols", "rows"], y = ["id", "class", "style", "open"], { gt: L, bt: M, D: S, wt: b, yt: $, V: D, St: R, $t: j } = t, V = {
    Ot: !1,
    N: nt(L)
  }, k = Be(), x = Dt(es), [A] = Ie({
    u: Ks,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const C = x && x.M(t, e, V, k, n).W, T = R(kt), E = !D && R(Sr), B = E && Tt(S);
    j(kt), D && j(Un, !0);
    const N = E && C && C()[0], P = Hn(b), ee = Hn(S), te = Xn(S);
    return j(kt, T), D && j(Un), N && N(), rt(S, B), {
      w: ee.w + P.w + te.w,
      h: ee.h + P.h + te.h
    };
  }), F = $ ? g : Ye(y, g), H = Xs(o, {
    v: () => s,
    p: () => a,
    S(C, T) {
      const [E] = C, [B] = T;
      return [Ye(st(E), st(B)).reduce((N, P) => (N[P] = E[P] || B[P], N), {})];
    }
  }), U = (C) => {
    if (D) {
      const T = nt(L);
      ne(C, {
        Ct: f !== T
      }), ne(V, {
        N: T
      }), f = T;
    }
  }, Q = (C) => {
    se(C || v, (T) => {
      if (vn(v, T)) {
        const E = mn(M, T);
        cn(E) ? He(S, T, E) : Pe(S, T);
      }
    });
  }, oe = (C, T) => {
    const [E, B] = C, N = {
      xt: B
    };
    return ne(V, {
      Ot: E
    }), !T && o(N), N;
  }, W = ({ ht: C, vt: T, _t: E }) => {
    const N = !(C && !E && !T) && m ? H : o, [P, ee] = T || [], te = {
      ht: C || E,
      _t: E,
      Ct: ee
    };
    U(te), T && ne(V, {
      N: P
    }), N(te);
  }, Z = (C, T) => {
    const [, E] = A(), B = {
      Ht: E
    };
    return U(B), E && !T && (C ? o : H)(B), B;
  }, ve = (C, T, E) => {
    const B = {
      zt: T
    };
    return U(B), T && !E ? H(B) : D || Q(C), B;
  }, { Z: G } = k, [ie, ae] = b ? Kr(M, oe) : [], ce = !D && yo(M, W, {
    _t: !0,
    ft: !0
  }), [Se, be] = $s(M, !1, ve, {
    rt: y,
    ct: Ye(y, v)
  }), me = D && Qt && new Qt((C) => {
    const T = C[C.length - 1].contentRect;
    W({
      ht: !0,
      _t: lo(T, i)
    }), i = T;
  });
  return [() => {
    Q(), me && me.observe(M);
    const C = ce && ce(), T = ie && ie(), E = Se(), B = G((N) => {
      const [, P] = A();
      H({
        It: N,
        Ht: P
      });
    });
    return () => {
      me && me.disconnect(), C && C(), T && T(), d && d(), E(), B();
    };
  }, ({ Et: C, At: T, Tt: E }) => {
    const B = {}, [N] = C("update.ignoreMutation"), [P, ee] = C("update.attributes"), [te, pe] = C("update.elementEvents"), [we, J] = C("update.debounce"), ye = pe || ee, xe = T || E, Fe = (re) => je(N) && N(re);
    if (ye) {
      c && c(), d && d();
      const [re, $e] = $s(b || S, !0, Z, {
        ct: Ye(F, P || []),
        lt: te,
        it: p,
        dt: (Me, he) => {
          const { target: Le, attributeName: Nt } = Me;
          return (!he && Nt && !D ? mr(Le, p, u) : !1) || !!bt(Le, `.${De}`) || !!Fe(Me);
        }
      });
      d = re(), c = $e;
    }
    if (J)
      if (H.m(), Ue(we)) {
        const re = we[0], $e = we[1];
        s = Ge(re) && re, a = Ge($e) && $e;
      } else Ge(we) ? (s = we, a = !1) : (s = !1, a = !1);
    if (xe) {
      const re = be(), $e = ae && ae(), Me = c && c();
      re && ne(B, ve(re[0], re[1], xe)), $e && ne(B, oe($e[0], xe)), Me && ne(B, Z(Me[0], xe));
    }
    return U(B), B;
  }, V];
}, Xr = (t, e, n, o) => {
  const { G: s, K: a } = Be(), { scrollbars: c } = s(), { slot: d } = c, { gt: i, bt: f, D: m, Dt: p, kt: u, Rt: v, V: g } = e, { scrollbars: y } = p ? {} : t, { slot: L } = y || {}, M = /* @__PURE__ */ new Map(), S = (C) => Mn && new Mn({
    source: u,
    axis: C
  }), b = S("x"), $ = S("y"), D = bo([i, f, m], () => g && v ? i : f, d, L), R = (C, T) => {
    if (T) {
      const te = C ? St : xt, { Mt: pe, Vt: we } = T, J = yt(we)[te], ye = yt(pe)[te];
      return On(0, 1, J / ye || 0);
    }
    const E = C ? "x" : "y", { Lt: B, Pt: N } = n, P = N[E], ee = B[E];
    return On(0, 1, P / (P + ee) || 0);
  }, j = (C, T, E, B) => {
    const N = R(E, C);
    return 1 / N * (1 - N) * (B ? 1 - T : T) || 0;
  }, V = (C, T) => ne(C, T ? {
    clear: ["left"]
  } : {}), k = (C) => {
    M.forEach((T, E) => {
      (C ? vn(Is(C), E) : !0) && (se(T || [], (N) => {
        N && N.cancel();
      }), M.delete(E));
    });
  }, x = (C, T, E, B) => {
    const N = M.get(C) || [], P = N.find((ee) => ee && ee.timeline === T);
    P ? P.effect = new KeyframeEffect(C, E, {
      composite: B
    }) : M.set(C, Ye(N, [C.animate(E, {
      timeline: T,
      composite: B
    })]));
  }, A = (C, T, E) => {
    const B = E ? tn : Kn;
    se(C, (N) => {
      B(N.Ut, T);
    });
  }, F = (C, T) => {
    se(C, (E) => {
      const [B, N] = T(E);
      Et(B, N);
    });
  }, H = (C, T) => {
    F(C, (E) => {
      const { Vt: B } = E;
      return [B, {
        [T ? St : xt]: ds(R(T))
      }];
    });
  }, U = (C, T) => {
    const { Lt: E } = n, B = T ? E.x : E.y, N = (P, ee, te) => Sn(ds(j(P, ms(ee, B, te), T, te)), T);
    if (b && $)
      se(C, (P) => {
        const { Ut: ee, Vt: te } = P, pe = T && nt(ee) && a;
        x(te, T ? b : $, V({
          transform: _s(B, pe).map((we) => N(P, we, pe))
        }, pe));
      });
    else {
      const P = Tt(u);
      F(C, (ee) => {
        const { Vt: te, Ut: pe } = ee;
        return [te, {
          transform: N(ee, T ? P.x : P.y, T && nt(pe) && a)
        }];
      });
    }
  }, Q = (C) => g && !v && Ct(C) === m, oe = [], W = [], Z = [], ve = (C, T, E) => {
    const B = Hs(E), N = B ? E : !0, P = B ? !E : !0;
    N && A(W, C, T), P && A(Z, C, T);
  }, G = () => {
    H(W, !0), H(Z);
  }, ie = () => {
    U(W, !0), U(Z);
  }, ae = () => {
    if (g) {
      const { Lt: C } = n, T = 0.5;
      if (b && $)
        se(Ye(Z, W), ({ Ut: E }) => {
          if (Q(E)) {
            const B = (N, P, ee) => {
              const te = ee && nt(E) && a;
              x(E, N, V({
                transform: _s(P - T, te).map((pe) => Sn(Fn(pe), ee))
              }, te), "add");
            };
            B(b, C.x, !0), B($, C.y);
          } else
            k(E);
        });
      else {
        const E = Tt(u), B = (N) => {
          const { Ut: P } = N, ee = Q(P) && P, te = (pe, we, J) => {
            const ye = ms(pe, we, J), xe = we * ye;
            return Fn(J ? -xe : xe);
          };
          return [ee, {
            transform: ee ? Sn({
              x: te(E.x, C.x, nt(P) && a),
              y: te(E.y, C.y)
            }) : ""
          }];
        };
        F(W, B), F(Z, B);
      }
    }
  }, ce = (C) => {
    const E = wt(`${De} ${C ? Vr : Dr}`), B = wt(fo), N = wt(Zn), P = {
      Ut: E,
      Mt: B,
      Vt: N
    };
    return _e(C ? W : Z, P), _e(oe, [Ae(E, B), Ae(B, N), K(ot, E), k, o(P, ve, U, C)]), P;
  }, Se = K(ce, !0), be = K(ce, !1), me = () => (Ae(D, W[0].Ut), Ae(D, Z[0].Ut), K(Re, oe));
  return Se(), be(), [{
    Bt: G,
    Nt: ie,
    jt: ae,
    Ft: ve,
    qt: {
      J: b,
      Wt: W,
      Xt: Se,
      Yt: K(F, W)
    },
    Jt: {
      J: $,
      Wt: Z,
      Xt: be,
      Yt: K(F, Z)
    }
  }, me];
}, Jr = (t, e, n, o) => {
  const { bt: s, D: a, V: c, kt: d, Kt: i } = e;
  return (f, m, p, u) => {
    const { Ut: v, Mt: g, Vt: y } = f, [L, M] = gt(333), [S, b] = gt(), $ = K(p, [f], u), D = !!d.scrollBy, R = `client${u ? "X" : "Y"}`, j = u ? St : xt, V = u ? "left" : "top", k = u ? "w" : "h", x = u ? "x" : "y", A = (U) => U.propertyName.indexOf(j) > -1, F = () => {
      const U = "pointerup pointerleave pointercancel lostpointercapture", Q = (oe, W) => (Z) => {
        const { Lt: ve } = n, G = Lt(g)[k] - Lt(y)[k], ae = W * Z / G * ve[x];
        rt(d, {
          [x]: oe + ae
        });
      };
      return fe(g, "pointerdown", (oe) => {
        const W = bt(oe.target, `.${Zn}`) === y, Z = W ? y : g, ve = t.scrollbars, { button: G, isPrimary: ie, pointerType: ae } = oe, { pointers: ce } = ve;
        if (G === 0 && ie && ve[W ? "dragScroll" : "clickScroll"] && (ce || []).includes(ae)) {
          const be = !W && oe.shiftKey, me = K(yt, y), C = K(yt, g), T = (re, $e) => (re || me())[V] - ($e || C())[V], E = Vn(yt(d)[j]) / Lt(d)[k] || 1, B = Q(Tt(d)[x] || 0, 1 / E), N = oe[R], P = me(), ee = C(), te = P[j], pe = T(P, ee) + te / 2, we = N - ee[V], J = W ? 0 : we - pe, ye = (re) => {
            Re(Fe), Z.releasePointerCapture(re.pointerId);
          }, Fe = [Ft(s, Te, yr), fe(i, U, ye), fe(i, "selectstart", (re) => fs(re), {
            H: !1
          }), fe(g, U, ye), fe(g, "pointermove", (re) => {
            const $e = re[R] - N;
            (W || be) && B(J + $e);
          })];
          if (Z.setPointerCapture(oe.pointerId), be)
            B(J);
          else if (!W) {
            const re = Dt(Ur);
            re && _e(Fe, re(B, T, J, te, we));
          }
        }
      });
    };
    let H = !0;
    return K(Re, [fe(y, "pointermove pointerleave", o), fe(v, "pointerenter", () => {
      m(ys, !0);
    }), fe(v, "pointerleave pointercancel", () => {
      m(ys, !1);
    }), !c && fe(v, "mousedown", () => {
      const U = Bn();
      (as(U, Ke) || as(U, Te) || U === document.body) && Jt(() => {
        a.focus({
          preventScroll: !0
        });
      }, 25);
    }), fe(v, "wheel", (U) => {
      const { deltaX: Q, deltaY: oe, deltaMode: W } = U;
      D && H && W === 0 && Ct(v) === s && d.scrollBy({
        left: Q,
        top: oe,
        behavior: "smooth"
      }), H = !1, m(xs, !0), L(() => {
        H = !0, m(xs);
      }), fs(U);
    }, {
      H: !1,
      I: !0
    }), fe(y, "transitionstart", (U) => {
      if (A(U)) {
        const Q = () => {
          $(), S(Q);
        };
        Q();
      }
    }), fe(y, "transitionend transitioncancel", (U) => {
      A(U) && (b(), $());
    }), fe(v, "mousedown", K(fe, i, "click", Jn, {
      A: !0,
      I: !0
    }), {
      I: !0
    }), F(), M, b]);
  };
}, Qr = (t, e, n, o, s, a) => {
  let c, d, i, f, m, p = Ne, u = 0;
  const v = (G) => G.pointerType === "mouse", [g, y] = gt(), [L, M] = gt(100), [S, b] = gt(100), [$, D] = gt(() => u), [R, j] = Xr(t, s, o, Jr(e, s, o, (G) => v(G) && oe())), { bt: V, Zt: k, Rt: x } = s, { Ft: A, Bt: F, Nt: H, jt: U } = R, Q = (G, ie) => {
    if (D(), G)
      A(Ss);
    else {
      const ae = K(A, Ss, !0);
      u > 0 && !ie ? $(ae) : ae();
    }
  }, oe = () => {
    (i ? !c : !f) && (Q(!0), L(() => {
      Q(!1);
    }));
  }, W = (G) => {
    A(Pn, G, !0), A(Pn, G, !1);
  }, Z = (G) => {
    v(G) && (c = i, i && Q(!0));
  }, ve = [D, M, b, y, () => p(), fe(V, "pointerover", Z, {
    A: !0
  }), fe(V, "pointerenter", Z), fe(V, "pointerleave", (G) => {
    v(G) && (c = !1, i && Q(!1));
  }), fe(V, "pointermove", (G) => {
    v(G) && d && oe();
  }), fe(k, "scroll", (G) => {
    g(() => {
      H(), oe();
    }), a(G), U();
  })];
  return [() => K(Re, _e(ve, j())), ({ Et: G, Tt: ie, Gt: ae, Qt: ce }) => {
    const { tn: Se, nn: be, sn: me } = ce || {}, { Ct: C, _t: T } = ae || {}, { N: E } = n, { T: B } = Be(), { k: N, en: P } = o, [ee, te] = G("showNativeOverlaidScrollbars"), [pe, we] = G("scrollbars.theme"), [J, ye] = G("scrollbars.visibility"), [xe, Fe] = G("scrollbars.autoHide"), [re, $e] = G("scrollbars.autoHideSuspend"), [Me] = G("scrollbars.autoHideDelay"), [he, Le] = G("scrollbars.dragScroll"), [Nt, Ut] = G("scrollbars.clickScroll"), [qt, qe] = G("overflow"), at = T && !ie, it = P.x || P.y, bn = Se || be || C || ie, et = me || ye || qe, wn = ee && B.x && B.y, _t = (mt, pt, Mt) => {
      const Pt = mt.includes("scroll") && (J === "visible" || J === "auto" && pt === "scroll");
      return A(Mr, Pt, Mt), Pt;
    };
    if (u = Me, at && (re && it ? (W(!1), p(), S(() => {
      p = fe(k, "scroll", K(W, !0), {
        A: !0
      });
    })) : W(!0)), te && A(Tr, wn), we && (A(m), A(pe, !0), m = pe), $e && !re && W(!0), Fe && (d = xe === "move", i = xe === "leave", f = xe === "never", Q(f, !0)), Le && A(Rr, he), Ut && A(Or, Nt), et) {
      const mt = _t(qt.x, N.x, !0), pt = _t(qt.y, N.y, !1);
      A(Lr, !(mt && pt));
    }
    bn && (F(), H(), U(), A(ks, !P.x, !0), A(ks, !P.y, !1), A(Ar, E && !x));
  }, {}, R];
}, Zr = (t) => {
  const e = Be(), { G: n, L: o } = e, { elements: s } = n(), { host: a, padding: c, viewport: d, content: i } = s, f = en(t), m = f ? {} : t, { elements: p } = m, { host: u, padding: v, viewport: g, content: y } = p || {}, L = f ? t : m.target, M = no(L), S = nn(L, "textarea"), b = L.ownerDocument, $ = b.documentElement, D = () => b.defaultView || Ve, R = (J) => {
    J && J.focus && J.focus({
      preventScroll: !0
    });
  }, j = K(Pr, [L]), V = K(bo, [L]), k = K(wt, ""), x = K(j, k, d), A = K(V, k, i), F = x(g), H = F === L, U = H && M, Q = !H && A(y), oe = !H && F === Q, W = U ? $ : F, Z = S ? j(k, a, u) : L, ve = U ? W : Z, G = !H && V(k, c, v), ie = !oe && Q, ae = [ie, W, G, ve].map((J) => en(J) && !Ct(J) && J), ce = (J) => J && vn(ae, J), Se = ce(W) ? L : W, be = {
    gt: L,
    bt: ve,
    D: W,
    cn: G,
    wt: ie,
    kt: U ? $ : W,
    Zt: U ? b : W,
    rn: M ? $ : Se,
    Kt: b,
    yt: S,
    Rt: M,
    Dt: f,
    V: H,
    ln: D,
    St: (J) => fr(W, H ? Te : Ke, J),
    $t: (J, ye) => Yt(W, H ? Te : Ke, J, ye)
  }, { gt: me, bt: C, cn: T, D: E, wt: B } = be, N = [() => {
    Pe(C, [Te, $n]), Pe(me, $n), M && Pe($, [$n, Te]);
  }], P = S && ce(C);
  let ee = S ? me : Rn([B, E, T, C, me].find((J) => J && !ce(J)));
  const te = U ? me : B || E, pe = K(Re, N);
  return [be, () => {
    const J = D(), ye = Bn(), xe = (he) => {
      Ae(Ct(he), Rn(he)), ot(he);
    }, Fe = (he) => he ? fe(he, "focusin focusout focus blur", (Le) => {
      Jn(Le), Le.stopImmediatePropagation();
    }, {
      I: !0,
      H: !1
    }) : Ne, re = "tabindex", $e = mn(E, re), Me = Fe(ye);
    return He(C, Te, H ? "viewport" : "host"), He(T, qn, ""), He(B, ws, ""), H || (He(E, Ke, ""), He(E, re, $e || "-1"), M && Ft($, Te, kr)), P && (is(me, C), _e(N, () => {
      is(C, me), ot(C);
    })), Ae(te, ee), Ae(C, T), Ae(T || C, !H && E), Ae(E, B), _e(N, [Me, () => {
      const he = Bn(), Le = Fe(he);
      Pe(T, qn), Pe(B, ws), Pe(E, [io, co, Ke]), $e ? He(E, re, $e) : Pe(E, re), ce(B) && xe(B), ce(E) && xe(E), ce(T) && xe(T), R(he), Le();
    }]), o && !H && (Ft(E, Ke, vo), _e(N, K(Pe, E, Ke))), R(!H && ye === L && J.top === J ? E : ye), Me(), ee = 0, pe;
  }, pe];
}, el = ({ wt: t }) => ({ Gt: e, an: n, Tt: o }) => {
  const { xt: s } = e || {}, { Ot: a } = n;
  t && (s || o) && Et(t, {
    [xt]: a && "100%"
  });
}, tl = ({ bt: t, cn: e, D: n, V: o }, s) => {
  const [a, c] = Ie({
    u: vr,
    o: us()
  }, K(us, t, "padding", ""));
  return ({ Et: d, Gt: i, an: f, Tt: m }) => {
    let [p, u] = c(m);
    const { L: v } = Be(), { ht: g, Ht: y, Ct: L } = i || {}, { N: M } = f, [S, b] = d("paddingAbsolute");
    (g || u || (m || y)) && ([p, u] = a(m));
    const D = !o && (b || L || u);
    if (D) {
      const R = !S || !e && !v, j = p.r + p.l, V = p.t + p.b, k = {
        [Gs]: R && !M ? -j : 0,
        [js]: R ? -V : 0,
        [zs]: R && M ? -j : 0,
        top: R ? -p.t : 0,
        right: R ? M ? -p.r : "auto" : 0,
        left: R ? M ? "auto" : -p.l : 0,
        [St]: R && `calc(100% + ${j}px)`
      }, x = {
        [Ns]: R ? p.t : 0,
        [Us]: R ? p.r : 0,
        [Ps]: R ? p.b : 0,
        [qs]: R ? p.l : 0
      };
      Et(e || n, k), Et(n, x), ne(s, {
        cn: p,
        un: !R,
        j: e ? x : ne({}, k, x)
      });
    }
    return {
      dn: D
    };
  };
}, nl = (t, e) => {
  const n = Be(), { bt: o, cn: s, D: a, V: c, Rt: d, $t: i, ln: f } = t, { L: m } = n, p = d && c, u = K(Kt, 0), v = {
    u: Ks,
    o: {
      w: 0,
      h: 0
    }
  }, g = {
    u: Ys,
    o: {
      x: $t,
      y: $t
    }
  }, y = (x, A) => {
    const F = Ve.devicePixelRatio % 1 !== 0 ? 1 : 0, H = {
      w: u(x.w - A.w),
      h: u(x.h - A.h)
    };
    return {
      w: H.w > F ? H.w : 0,
      h: H.h > F ? H.h : 0
    };
  }, [L, M] = Ie(v, K(Xn, a)), [S, b] = Ie(v, K(Hn, a)), [$, D] = Ie(v), [R, j] = Ie(v), [V] = Ie(g), k = Dt(es);
  return ({ Et: x, Gt: A, an: F, Tt: H }, { dn: U }) => {
    const { ht: Q, Ht: oe, Ct: W, It: Z } = A || {}, ve = k && k.M(t, e, F, n, x), { q: G, W: ie, X: ae } = ve || {}, [ce, Se] = Ir(x, n), [be, me] = x("overflow"), C = Q || U || oe || W || Z || Se, T = on(be.x), E = on(be.y), B = T || E;
    let N = M(H), P = b(H), ee = D(H), te = j(H), pe;
    if (Se && m && i(vo, !ce), C) {
      B && i(kt, !1);
      const [qe, at] = ie ? ie(pe) : [], [it, bn] = N = L(H), [et, wn] = P = S(H), _t = ro(a), mt = et, pt = _t;
      qe && qe(), (wn || bn || Se) && at && !ce && G && G(at, et, it);
      const Mt = gr(f()), Pt = {
        w: u(Kt(et.w, mt.w) + it.w),
        h: u(Kt(et.h, mt.h) + it.h)
      }, ss = {
        w: u((p ? Mt.w : pt.w + u(_t.w - et.w)) + it.w),
        h: u((p ? Mt.h : pt.h + u(_t.h - et.h)) + it.h)
      };
      te = R(ss), ee = $(y(Pt, ss), H);
    }
    const [we, J] = te, [ye, xe] = ee, [Fe, re] = P, [$e, Me] = N, he = {
      x: ye.w > 0,
      y: ye.h > 0
    }, Le = T && E && (he.x || he.y) || T && he.x && !he.y || E && he.y && !he.x;
    if (U || W || Z || Me || re || J || xe || me || Se || C) {
      const qe = {}, at = Nr(t, he, be, qe);
      ae && ae(at, F, !!G && G(at, Fe, $e), qe), c ? (He(o, io, qe[fn]), He(o, co, qe[_n])) : Et(a, qe);
    }
    Yt(o, Te, uo, Le), Yt(s, qn, xr, Le), c || Yt(a, Ke, kt, B);
    const [Ut, qt] = V(ho(t).k);
    return ne(e, {
      k: Ut,
      Pt: {
        x: we.w,
        y: we.h
      },
      Lt: {
        x: ye.w,
        y: ye.h
      },
      en: he
    }), {
      sn: qt,
      tn: J,
      nn: xe
    };
  };
}, sl = (t) => {
  const [e, n, o] = Zr(t), s = {
    cn: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    un: !1,
    j: {
      [Gs]: 0,
      [js]: 0,
      [zs]: 0,
      [Ns]: 0,
      [Us]: 0,
      [Ps]: 0,
      [qs]: 0
    },
    Pt: {
      x: 0,
      y: 0
    },
    Lt: {
      x: 0,
      y: 0
    },
    k: {
      x: $t,
      y: $t
    },
    en: {
      x: !1,
      y: !1
    }
  }, { gt: a, D: c, V: d } = e, { L: i, T: f } = Be(), m = !i && (f.x || f.y), p = [el(e), tl(e, s), nl(e, s)];
  return [n, (u) => {
    const v = {}, y = m && Tt(c), L = d ? Ft(c, Te, Un) : Ne;
    return se(p, (M) => {
      ne(v, M(u, v) || {});
    }), L(), rt(c, y), !d && rt(a, 0), v;
  }, s, e, o];
}, ol = (t, e, n, o) => {
  const s = bs(e, {}), [a, c, d, i, f] = sl(t), [m, p, u] = Yr(i, d, s, (S) => {
    M({}, S);
  }), [v, g, , y] = Qr(t, e, u, d, i, o), L = (S) => st(S).some((b) => !!S[b]), M = (S, b) => {
    const { fn: $, Tt: D, At: R, _n: j } = S, V = $ || {}, k = !!D, x = {
      Et: bs(e, V, k),
      fn: V,
      Tt: k
    };
    if (j)
      return g(x), !1;
    const A = b || p(ne({}, x, {
      At: R
    })), F = c(ne({}, x, {
      an: u,
      Gt: A
    }));
    g(ne({}, x, {
      Gt: A,
      Qt: F
    }));
    const H = L(A), U = L(F), Q = H || U || !Wn(V) || k;
    return Q && n(S, {
      Gt: A,
      Qt: F
    }), Q;
  };
  return [() => {
    const { rn: S, D: b } = i, $ = Tt(S), D = [m(), a(), v()];
    return rt(b, $), K(Re, D);
  }, M, () => ({
    vn: u,
    hn: d
  }), {
    pn: i,
    gn: y
  }, f];
}, Je = (t, e, n) => {
  const { nt: o } = Be(), s = en(t), a = s ? t : t.target, c = wo(a);
  if (e && !c) {
    let d = !1;
    const i = [], f = {}, m = (x) => {
      const A = Qs(x), F = Dt(Fr);
      return F ? F(A, !0) : A;
    }, p = ne({}, o(), m(e)), [u, v, g] = Nn(), [y, L, M] = Nn(n), S = (x, A) => {
      M(x, A), g(x, A);
    }, [b, $, D, R, j] = ol(t, p, ({ fn: x, Tt: A }, { Gt: F, Qt: H }) => {
      const { ht: U, Ct: Q, xt: oe, Ht: W, zt: Z, _t: ve } = F, { tn: G, nn: ie, sn: ae } = H;
      S("updated", [k, {
        updateHints: {
          sizeChanged: !!U,
          directionChanged: !!Q,
          heightIntrinsicChanged: !!oe,
          overflowEdgeChanged: !!G,
          overflowAmountChanged: !!ie,
          overflowStyleChanged: !!ae,
          contentMutation: !!W,
          hostMutation: !!Z,
          appear: !!ve
        },
        changedOptions: x || {},
        force: !!A
      }]);
    }, (x) => S("scroll", [k, x])), V = (x) => {
      jr(a), Re(i), d = !0, S("destroyed", [k, x]), v(), L();
    }, k = {
      options(x, A) {
        if (x) {
          const F = A ? o() : {}, H = ao(p, ne(F, m(x)));
          Wn(H) || (ne(p, H), $({
            fn: H
          }));
        }
        return ne({}, p);
      },
      on: y,
      off: (x, A) => {
        x && A && L(x, A);
      },
      state() {
        const { vn: x, hn: A } = D(), { N: F } = x, { Pt: H, Lt: U, k: Q, en: oe, cn: W, un: Z } = A;
        return ne({}, {
          overflowEdge: H,
          overflowAmount: U,
          overflowStyle: Q,
          hasOverflow: oe,
          padding: W,
          paddingAbsolute: Z,
          directionRTL: F,
          destroyed: d
        });
      },
      elements() {
        const { gt: x, bt: A, cn: F, D: H, wt: U, kt: Q, Zt: oe } = R.pn, { qt: W, Jt: Z } = R.gn, ve = (ie) => {
          const { Vt: ae, Mt: ce, Ut: Se } = ie;
          return {
            scrollbar: Se,
            track: ce,
            handle: ae
          };
        }, G = (ie) => {
          const { Wt: ae, Xt: ce } = ie, Se = ve(ae[0]);
          return ne({}, Se, {
            clone: () => {
              const be = ve(ce());
              return $({
                _n: !0
              }), be;
            }
          });
        };
        return ne({}, {
          target: x,
          host: A,
          padding: F || H,
          viewport: H,
          content: U || H,
          scrollOffsetElement: Q,
          scrollEventElement: oe,
          scrollbarHorizontal: G(W),
          scrollbarVertical: G(Z)
        });
      },
      update: (x) => $({
        Tt: x,
        At: !0
      }),
      destroy: K(V, !1),
      plugin: (x) => f[st(x)[0]]
    };
    return _e(i, [j]), Gr(a, k), po(_o, Je, [k, u, f]), zr(R.pn.Rt, !s && t.cancel) ? (V(!0), k) : (_e(i, b()), S("initialized", [k]), k.update(!0), k);
  }
  return c;
};
Je.plugin = (t) => {
  const e = Ue(t), n = e ? t : [t], o = n.map((s) => po(s, Je)[0]);
  return Br(n), e ? o : o[0];
};
Je.valid = (t) => {
  const e = t && t.elements, n = je(e) && e();
  return Zt(n) && !!wo(n.target);
};
Je.env = () => {
  const { P: t, T: e, L: n, K: o, J: s, st: a, et: c, G: d, tt: i, nt: f, ot: m } = Be();
  return ne({}, {
    scrollbarsSize: t,
    scrollbarsOverlaid: e,
    scrollbarsHiding: n,
    rtlScrollBehavior: o,
    scrollTimeline: s,
    staticDefaultInitialization: a,
    staticDefaultOptions: c,
    getDefaultInitialization: d,
    setDefaultInitialization: i,
    getDefaultOptions: f,
    setDefaultOptions: m
  });
};
function rl() {
  let t;
  const e = O(null), n = Math.floor(Math.random() * 2 ** 32), o = O(!1), s = O([]), a = () => s.value, c = () => t.getSelection(), d = () => s.value.length, i = () => t.clearSelection(!0), f = O(), m = O(null), p = O(null), u = O(null), v = O(null);
  function g() {
    t = new Yo({
      area: e.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), t.subscribe(
      "DS:start:pre",
      ({ items: D, event: R, isDragging: j }) => {
        if (j)
          t.Interaction._reset(R);
        else {
          o.value = !1;
          const V = e.value.offsetWidth - R.offsetX, k = e.value.offsetHeight - R.offsetY;
          V < 15 && k < 15 && t.Interaction._reset(R), R.target.classList.contains("os-scrollbar-handle") && t.Interaction._reset(R);
        }
      }
    ), document.addEventListener("dragleave", (D) => {
      !D.buttons && o.value && (o.value = !1);
    });
  }
  const y = () => ct(() => {
    t.addSelection(t.getSelectables()), L();
  }), L = () => {
    s.value = t.getSelection().map((D) => JSON.parse(D.dataset.item)), f.value(s.value);
  }, M = () => ct(() => {
    const D = a().map((R) => R.path);
    i(), t.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + n)
    }), t.addSelection(
      t.getSelectables().filter(
        (R) => D.includes(JSON.parse(R.dataset.item).path)
      )
    ), L(), b();
  }), S = (D) => {
    f.value = D, t.subscribe("DS:end", ({ items: R, event: j, isDragging: V }) => {
      s.value = R.map((k) => JSON.parse(k.dataset.item)), D(R.map((k) => JSON.parse(k.dataset.item)));
    });
  }, b = () => {
    m.value && (e.value.getBoundingClientRect().height < e.value.scrollHeight ? (p.value.style.height = e.value.scrollHeight + "px", p.value.style.display = "block") : (p.value.style.height = "100%", p.value.style.display = "none"));
  }, $ = (D) => {
    if (!m.value)
      return;
    const { scrollOffsetElement: R } = m.value.elements();
    R.scrollTo({
      top: e.value.scrollTop,
      left: 0
    });
  };
  return Ee(() => {
    Je(
      u.value,
      {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        },
        plugins: {
          OverlayScrollbars: Je
          // ScrollbarsHidingPlugin,
          // SizeObserverPlugin,
          // ClickScrollPlugin
        }
      },
      {
        initialized: (D) => {
          m.value = D;
        },
        scroll: (D, R) => {
          const { scrollOffsetElement: j } = D.elements();
          e.value.scrollTo({
            top: j.scrollTop,
            left: 0
          });
        }
      }
    ), g(), b(), v.value = new ResizeObserver(b), v.value.observe(e.value), e.value.addEventListener("scroll", $), t.subscribe(
      "DS:scroll",
      ({ isDragging: D }) => D || $()
    );
  }), Gn(() => {
    t && t.stop(), v.value && v.value.disconnect();
  }), As(() => {
    t && t.Area.reset();
  }), {
    area: e,
    explorerId: n,
    isDraggingRef: o,
    scrollBar: p,
    scrollBarContainer: u,
    getSelected: a,
    getSelection: c,
    selectAll: y,
    clearSelection: i,
    refreshSelection: M,
    getCount: d,
    onSelect: S
  };
}
function ll(t, e) {
  const n = O(t), o = O(e), s = O([]), a = O([]), c = O([]), d = O(!1), i = O(5);
  let f = !1, m = !1;
  const p = vt({
    adapter: n,
    storages: [],
    dirname: o,
    files: []
  });
  function u() {
    let S = [], b = [], $ = o.value ?? n.value + "://";
    $.length === 0 && (s.value = []), $.replace(n.value + "://", "").split("/").forEach(function(j) {
      S.push(j), S.join("/") !== "" && b.push({
        basename: j,
        name: j,
        path: n.value + "://" + S.join("/"),
        type: "dir"
      });
    }), a.value = b;
    const [D, R] = g(b, i.value);
    c.value = R, s.value = D;
  }
  function v(S) {
    i.value = S, u();
  }
  function g(S, b) {
    return S.length > b ? [S.slice(-b), S.slice(0, -b)] : [S, []];
  }
  function y(S = null) {
    d.value = S ?? !d.value;
  }
  function L() {
    return s.value && s.value.length && !m;
  }
  const M = Xe(() => {
    var S;
    return ((S = s.value[s.value.length - 2]) == null ? void 0 : S.path) ?? n.value + "://";
  });
  return Ee(() => {
  }), Oe(o, u), Ee(u), {
    adapter: n,
    path: o,
    loading: f,
    searchMode: m,
    data: p,
    breadcrumbs: s,
    breadcrumbItems: a,
    limitBreadcrumbItems: v,
    hiddenBreadcrumbs: c,
    showHiddenBreadcrumbs: d,
    toggleHiddenBreadcrumbs: y,
    isGoUpAvailable: L,
    parentFolderPath: M
  };
}
function al() {
  const t = "_readOnlyFile", e = localStorage.getItem(t), n = vt(JSON.parse(e ?? '{"items": []}')), o = (f) => {
    for (const m of f)
      n.items.length >= 1e3 && n.items.shift(), i(m.path) ? c(m.path) : n.items.push(m);
  }, s = () => JSON.parse(localStorage.getItem(t) || '{"items": []}'), a = () => {
    localStorage.setItem(t, JSON.stringify(n));
  }, c = (f) => {
    const m = n.items.findIndex((p) => p.path === f);
    m !== -1 && n.items.splice(m, 1);
  }, d = () => n.items, i = (f) => n.items.findIndex((p) => f.indexOf(p.path) === 0) !== -1;
  return {
    storedValues: e,
    appendItems: o,
    save: a,
    deleteItem: c,
    getByLocalStorage: s,
    getItems: d,
    hasItem: i
  };
}
const il = (t, e) => {
  const n = er(t.id), o = Ko(), s = n.getStore("metricUnits", !1), a = rr(n, t.theme), c = e.i18n, d = t.locale ?? e.locale, i = n.getStore("adapter"), f = al(), m = (g) => Array.isArray(g) ? g : sr, p = n.getStore("persist-path", t.persist), u = p ? n.getStore("path", t.path) : t.path, v = rl();
  return vt({
    /**
     * Core properties
     * */
    // app version
    version: or,
    // root element
    root: null,
    // app id
    debug: t.debug,
    // Event Bus
    emitter: o,
    // storage
    storage: n,
    // localization object
    i18n: nr(n, d, o, c),
    // modal state
    modal: lr(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: Xe(() => v),
    // http object
    requester: Zo(t.request),
    // active features
    features: m(t.features),
    // view state
    view: n.getStore("viewport", "grid"),
    // fullscreen state
    fullScreen: n.getStore("full-screen", t.fullScreen),
    // show tree view
    showTreeView: n.getStore("show-tree-view", t.showTreeView),
    // pinnedFolders
    pinnedFolders: n.getStore("pinned-folders", t.pinnedFolders),
    // treeViewData
    treeViewData: [],
    // selectButton state
    selectButton: t.selectButton,
    // max file size
    maxFileSize: t.maxFileSize,
    /**
     * Settings
     * */
    // theme state
    theme: a,
    // unit state - for example: GB or GiB
    metricUnits: s,
    // human readable file sizes
    filesize: s ? Ls : Ms,
    // show large icons in list view
    compactListView: n.getStore("compact-list-view", !0),
    // persist state
    persist: p,
    // show thumbnails
    showThumbnails: n.getStore("show-thumbnails", t.showThumbnails),
    // file system
    fs: ll(i, u),
    onlyReadFileStore: f
  });
}, cl = { class: "vuefinder__modal-layout__container" }, dl = { class: "vuefinder__modal-layout__content" }, ul = { class: "vuefinder__modal-layout__footer" }, Qe = {
  __name: "ModalLayout",
  setup(t) {
    const e = O(null), n = le("ServiceContainer");
    return Ee(() => {
      const o = document.querySelector(".v-f-modal input");
      o && o.focus(), ct(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768) {
          const s = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: s,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    }), (o, s) => (_(), h("div", {
      class: "vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: s[1] || (s[1] = At((a) => l(n).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      s[2] || (s[2] = r("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      r("div", cl, [
        r("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: s[0] || (s[0] = Ot((a) => l(n).modal.close(), ["self"]))
        }, [
          r("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            r("div", dl, [
              Rt(o.$slots, "default")
            ]),
            r("div", ul, [
              Rt(o.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}, vl = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [o, s] of e)
    n[o] = s;
  return n;
}, fl = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const o = le("ServiceContainer"), s = O(!1), { t: a } = o.i18n;
    let c = null;
    const d = () => {
      clearTimeout(c), s.value = !0, c = setTimeout(() => {
        s.value = !1;
      }, 2e3);
    };
    return Ee(() => {
      o.emitter.on(t.on, d);
    }), Gn(() => {
      clearTimeout(c);
    }), {
      shown: s,
      t: a
    };
  }
}, _l = { key: 1 };
function ml(t, e, n, o, s, a) {
  return _(), h("div", {
    class: ge(["vuefinder__action-message", { "vuefinder__action-message--hidden": !o.shown }])
  }, [
    t.$slots.default ? Rt(t.$slots, "default", { key: 0 }) : (_(), h("span", _l, w(o.t("Saved.")), 1))
  ], 2);
}
const ht = /* @__PURE__ */ vl(fl, [["render", ml]]), pl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function hl(t, e) {
  return _(), h("svg", pl, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87q.11.06.22.127c.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a8 8 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a7 7 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a7 7 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7 7 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124q.108-.066.22-.128c.332-.183.582-.495.644-.869z"
    }, null, -1),
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
    }, null, -1)
  ]));
}
const gl = { render: hl }, bl = { class: "vuefinder__modal-header" }, wl = { class: "vuefinder__modal-header__icon-container" }, yl = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, lt = {
  __name: "ModalHeader",
  props: {
    title: {
      type: String,
      required: !0
    },
    icon: {
      type: Object,
      required: !0
    }
  },
  setup(t) {
    return (e, n) => (_(), h("div", bl, [
      r("div", wl, [
        (_(), z(Vs(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      r("h3", yl, w(t.title), 1)
    ]));
  }
}, kl = { class: "vuefinder__about-modal__content" }, Sl = { class: "vuefinder__about-modal__main" }, xl = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, $l = ["onClick", "aria-current"], Cl = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, El = { class: "vuefinder__about-modal__description" }, Tl = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Al = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Vl = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, Dl = { class: "vuefinder__about-modal__description" }, Ml = { class: "vuefinder__about-modal__settings" }, Ll = { class: "vuefinder__about-modal__setting flex" }, Ol = { class: "vuefinder__about-modal__setting-input" }, Rl = { class: "vuefinder__about-modal__setting-label" }, Bl = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, Fl = { class: "vuefinder__about-modal__setting flex" }, Hl = { class: "vuefinder__about-modal__setting-input" }, Il = { class: "vuefinder__about-modal__setting-label" }, Nl = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, Ul = { class: "vuefinder__about-modal__setting flex" }, ql = { class: "vuefinder__about-modal__setting-input" }, Pl = { class: "vuefinder__about-modal__setting-label" }, zl = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, Gl = { class: "vuefinder__about-modal__setting flex" }, jl = { class: "vuefinder__about-modal__setting-input" }, Wl = { class: "vuefinder__about-modal__setting-label" }, Kl = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, Yl = { class: "vuefinder__about-modal__setting" }, Xl = { class: "vuefinder__about-modal__setting-input" }, Jl = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, Ql = { class: "vuefinder__about-modal__setting-label" }, Zl = ["label"], ea = ["value"], ta = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, na = { class: "vuefinder__about-modal__setting-input" }, sa = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, oa = { class: "vuefinder__about-modal__setting-label" }, ra = ["label"], la = ["value"], aa = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, ia = { class: "vuefinder__about-modal__shortcuts" }, ca = { class: "vuefinder__about-modal__shortcut" }, da = { class: "vuefinder__about-modal__shortcut" }, ua = { class: "vuefinder__about-modal__shortcut" }, va = { class: "vuefinder__about-modal__shortcut" }, fa = { class: "vuefinder__about-modal__shortcut" }, _a = { class: "vuefinder__about-modal__shortcut" }, ma = { class: "vuefinder__about-modal__shortcut" }, pa = { class: "vuefinder__about-modal__shortcut" }, ha = { class: "vuefinder__about-modal__shortcut" }, ga = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, ba = { class: "vuefinder__about-modal__description" }, ko = {
  __name: "ModalAbout",
  setup(t) {
    const e = le("ServiceContainer"), { setStore: n, clearStore: o } = e.storage, { t: s } = e.i18n, a = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, c = Xe(() => [
      { name: s("About"), key: a.ABOUT },
      { name: s("Settings"), key: a.SETTINGS },
      { name: s("Shortcuts"), key: a.SHORTCUTS },
      { name: s("Reset"), key: a.RESET }
    ]), d = O("about"), i = async () => {
      o(), location.reload();
    }, f = (S) => {
      e.theme.set(S), e.emitter.emit("vf-theme-saved");
    }, m = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? Ls : Ms, n("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, p = () => {
      e.compactListView = !e.compactListView, n("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, u = () => {
      e.showThumbnails = !e.showThumbnails, n("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, v = () => {
      e.persist = !e.persist, n("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: g } = le("VueFinderOptions"), L = Object.fromEntries(
      Object.entries({
        en: "English",
        fr: "French (Français)",
        de: "German (Deutsch)",
        fa: "Persian (فارسی)",
        he: "Hebrew (עִברִית)",
        hi: "Hindi (हिंदी)",
        ru: "Russian (Pусский)",
        sv: "Swedish (Svenska)",
        tr: "Turkish (Türkçe)",
        zhCN: "Simplified Chinese (简体中文)",
        zhTW: "Traditional Chinese (繁體中文)"
      }).filter(([S]) => Object.keys(g).includes(S))
    ), M = Xe(() => ({
      system: s("System"),
      light: s("Light"),
      dark: s("Dark")
    }));
    return (S, b) => (_(), z(Qe, null, {
      buttons: X(() => [
        r("button", {
          type: "button",
          onClick: b[7] || (b[7] = ($) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(l(s)("Close")), 1)
      ]),
      default: X(() => [
        r("div", kl, [
          q(lt, {
            icon: l(gl),
            title: "Vuefinder " + l(e).version
          }, null, 8, ["icon", "title"]),
          r("div", Sl, [
            r("div", null, [
              r("div", null, [
                r("nav", xl, [
                  (_(!0), h(ke, null, Ce(c.value, ($) => (_(), h("button", {
                    key: $.name,
                    onClick: (D) => d.value = $.key,
                    class: ge([$.key === d.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": $.current ? "page" : void 0
                  }, w($.name), 11, $l))), 128))
                ])
              ])
            ]),
            d.value === a.ABOUT ? (_(), h("div", Cl, [
              r("div", El, w(l(s)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              r("a", Tl, w(l(s)("Project home")), 1),
              r("a", Al, w(l(s)("Follow on GitHub")), 1)
            ])) : I("", !0),
            d.value === a.SETTINGS ? (_(), h("div", Vl, [
              r("div", Dl, w(l(s)("Customize your experience with the following settings")), 1),
              r("div", Ml, [
                r("fieldset", null, [
                  r("div", Ll, [
                    r("div", Ol, [
                      ue(r("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        "onUpdate:modelValue": b[0] || (b[0] = ($) => l(e).metricUnits = $),
                        onClick: m,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, l(e).metricUnits]
                      ])
                    ]),
                    r("div", Rl, [
                      r("label", Bl, [
                        Y(w(l(s)("Use Metric Units")) + " ", 1),
                        q(ht, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: X(() => [
                            Y(w(l(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  r("div", Fl, [
                    r("div", Hl, [
                      ue(r("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        "onUpdate:modelValue": b[1] || (b[1] = ($) => l(e).compactListView = $),
                        onClick: p,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, l(e).compactListView]
                      ])
                    ]),
                    r("div", Il, [
                      r("label", Nl, [
                        Y(w(l(s)("Compact list view")) + " ", 1),
                        q(ht, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: X(() => [
                            Y(w(l(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  r("div", Ul, [
                    r("div", ql, [
                      ue(r("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        "onUpdate:modelValue": b[2] || (b[2] = ($) => l(e).persist = $),
                        onClick: v,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, l(e).persist]
                      ])
                    ]),
                    r("div", Pl, [
                      r("label", zl, [
                        Y(w(l(s)("Persist path on reload")) + " ", 1),
                        q(ht, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: X(() => [
                            Y(w(l(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  r("div", Gl, [
                    r("div", jl, [
                      ue(r("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        "onUpdate:modelValue": b[3] || (b[3] = ($) => l(e).showThumbnails = $),
                        onClick: u,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, l(e).showThumbnails]
                      ])
                    ]),
                    r("div", Wl, [
                      r("label", Kl, [
                        Y(w(l(s)("Show thumbnails")) + " ", 1),
                        q(ht, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: X(() => [
                            Y(w(l(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  r("div", Yl, [
                    r("div", Xl, [
                      r("label", Jl, w(l(s)("Theme")), 1)
                    ]),
                    r("div", Ql, [
                      ue(r("select", {
                        id: "theme",
                        "onUpdate:modelValue": b[4] || (b[4] = ($) => l(e).theme.value = $),
                        onChange: b[5] || (b[5] = ($) => f($.target.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        r("optgroup", {
                          label: l(s)("Theme")
                        }, [
                          (_(!0), h(ke, null, Ce(M.value, ($, D) => (_(), h("option", { value: D }, w($), 9, ea))), 256))
                        ], 8, Zl)
                      ], 544), [
                        [An, l(e).theme.value]
                      ]),
                      q(ht, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: X(() => [
                          Y(w(l(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  l(e).features.includes(l(de).LANGUAGE) && Object.keys(l(L)).length > 1 ? (_(), h("div", ta, [
                    r("div", na, [
                      r("label", sa, w(l(s)("Language")), 1)
                    ]),
                    r("div", oa, [
                      ue(r("select", {
                        id: "language",
                        "onUpdate:modelValue": b[6] || (b[6] = ($) => l(e).i18n.locale = $),
                        class: "vuefinder__about-modal__select"
                      }, [
                        r("optgroup", {
                          label: l(s)("Language")
                        }, [
                          (_(!0), h(ke, null, Ce(l(L), ($, D) => (_(), h("option", { value: D }, w($), 9, la))), 256))
                        ], 8, ra)
                      ], 512), [
                        [An, l(e).i18n.locale]
                      ]),
                      q(ht, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: X(() => [
                          Y(w(l(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : I("", !0)
                ])
              ])
            ])) : I("", !0),
            d.value === a.SHORTCUTS ? (_(), h("div", aa, [
              r("div", ia, [
                r("div", ca, [
                  r("div", null, w(l(s)("Rename")), 1),
                  b[8] || (b[8] = r("kbd", null, "F2", -1))
                ]),
                r("div", da, [
                  r("div", null, w(l(s)("Refresh")), 1),
                  b[9] || (b[9] = r("kbd", null, "F5", -1))
                ]),
                r("div", ua, [
                  Y(w(l(s)("Delete")) + " ", 1),
                  b[10] || (b[10] = r("kbd", null, "Del", -1))
                ]),
                r("div", va, [
                  Y(w(l(s)("Escape")) + " ", 1),
                  b[11] || (b[11] = r("div", null, [
                    r("kbd", null, "Esc")
                  ], -1))
                ]),
                r("div", fa, [
                  Y(w(l(s)("Select All")) + " ", 1),
                  b[12] || (b[12] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    Y(" + "),
                    r("kbd", null, "A")
                  ], -1))
                ]),
                r("div", _a, [
                  Y(w(l(s)("Search")) + " ", 1),
                  b[13] || (b[13] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    Y(" + "),
                    r("kbd", null, "F")
                  ], -1))
                ]),
                r("div", ma, [
                  Y(w(l(s)("Toggle Sidebar")) + " ", 1),
                  b[14] || (b[14] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    Y(" + "),
                    r("kbd", null, "E")
                  ], -1))
                ]),
                r("div", pa, [
                  Y(w(l(s)("Open Settings")) + " ", 1),
                  b[15] || (b[15] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    Y(" + "),
                    r("kbd", null, ",")
                  ], -1))
                ]),
                r("div", ha, [
                  Y(w(l(s)("Toggle Full Screen")) + " ", 1),
                  b[16] || (b[16] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    Y(" + "),
                    r("kbd", null, "Enter")
                  ], -1))
                ])
              ])
            ])) : I("", !0),
            d.value === a.RESET ? (_(), h("div", ga, [
              r("div", ba, w(l(s)("Reset all settings to default")), 1),
              r("button", {
                onClick: i,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, w(l(s)("Reset Settings")), 1)
            ])) : I("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, wa = ["title"], Ze = {
  __name: "Message",
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["hidden"],
  setup(t, { emit: e }) {
    var f;
    const n = e, o = le("ServiceContainer"), { t: s } = o.i18n, a = O(!1), c = O(null), d = O((f = c.value) == null ? void 0 : f.strMessage);
    Oe(d, () => a.value = !1);
    const i = () => {
      n("hidden"), a.value = !0;
    };
    return (m, p) => (_(), h("div", null, [
      a.value ? I("", !0) : (_(), h("div", {
        key: 0,
        ref_key: "strMessage",
        ref: c,
        class: ge(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Rt(m.$slots, "default"),
        r("div", {
          class: "vuefinder__message__close",
          onClick: i,
          title: l(s)("Close")
        }, p[0] || (p[0] = [
          r("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            "stroke-width": "1.5",
            stroke: "currentColor",
            class: "vuefinder__message__icon"
          }, [
            r("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M6 18L18 6M6 6l12 12"
            })
          ], -1)
        ]), 8, wa)
      ], 2))
    ]));
  }
}, ya = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function ka(t, e) {
  return _(), h("svg", ya, e[0] || (e[0] = [
    r("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ]));
}
const Sa = { render: ka }, xa = { class: "vuefinder__delete-modal__content" }, $a = { class: "vuefinder__delete-modal__form" }, Ca = { class: "vuefinder__delete-modal__description" }, Ea = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Ta = { class: "vuefinder__delete-modal__file" }, Aa = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Va = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Da = { class: "vuefinder__delete-modal__file-name" }, Ma = { class: "vuefinder__delete-modal__warning" }, So = {
  __name: "ModalDelete",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, o = O(e.modal.data.items), s = O(""), a = () => {
      o.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: o.value.map(({ path: c, type: d }) => ({ path: c, type: d }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("Files deleted.") });
        },
        onError: (c) => {
          s.value = n(c.message);
        }
      });
    };
    return (c, d) => (_(), z(Qe, null, {
      buttons: X(() => [
        r("button", {
          type: "button",
          onClick: a,
          class: "vf-btn vf-btn-danger"
        }, w(l(n)("Yes, Delete!")), 1),
        r("button", {
          type: "button",
          onClick: d[1] || (d[1] = (i) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(l(n)("Cancel")), 1),
        r("div", Ma, w(l(n)("This action cannot be undone.")), 1)
      ]),
      default: X(() => [
        r("div", null, [
          q(lt, {
            icon: l(Sa),
            title: l(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          r("div", xa, [
            r("div", $a, [
              r("p", Ca, w(l(n)("Are you sure you want to delete these files?")), 1),
              r("div", Ea, [
                (_(!0), h(ke, null, Ce(o.value, (i) => (_(), h("p", Ta, [
                  i.type === "dir" ? (_(), h("svg", Aa, d[2] || (d[2] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (_(), h("svg", Va, d[3] || (d[3] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  r("span", Da, w(i.basename), 1)
                ]))), 256))
              ]),
              s.value.length ? (_(), z(Ze, {
                key: 0,
                onHidden: d[0] || (d[0] = (i) => s.value = ""),
                error: ""
              }, {
                default: X(() => [
                  Y(w(s.value), 1)
                ]),
                _: 1
              })) : I("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, La = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Oa(t, e) {
  return _(), h("svg", La, e[0] || (e[0] = [
    r("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ]));
}
const Ra = { render: Oa }, Ba = { class: "vuefinder__rename-modal__content" }, Fa = { class: "vuefinder__rename-modal__item" }, Ha = { class: "vuefinder__rename-modal__item-info" }, Ia = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Na = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ua = { class: "vuefinder__rename-modal__item-name" }, xo = {
  __name: "ModalRename",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, o = O(e.modal.data.items[0]), s = O(e.modal.data.items[0].basename), a = O(""), c = () => {
      s.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: o.value.path,
          name: s.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is renamed.", s.value) });
        },
        onError: (d) => {
          a.value = n(d.message);
        }
      });
    };
    return (d, i) => (_(), z(Qe, null, {
      buttons: X(() => [
        r("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, w(l(n)("Rename")), 1),
        r("button", {
          type: "button",
          onClick: i[2] || (i[2] = (f) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(l(n)("Cancel")), 1)
      ]),
      default: X(() => [
        r("div", null, [
          q(lt, {
            icon: l(Ra),
            title: l(n)("Rename")
          }, null, 8, ["icon", "title"]),
          r("div", Ba, [
            r("div", Fa, [
              r("p", Ha, [
                o.value.type === "dir" ? (_(), h("svg", Ia, i[3] || (i[3] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (_(), h("svg", Na, i[4] || (i[4] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                r("span", Ua, w(o.value.basename), 1)
              ]),
              ue(r("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (f) => s.value = f),
                onKeyup: At(c, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Vt, s.value]
              ]),
              a.value.length ? (_(), z(Ze, {
                key: 0,
                onHidden: i[1] || (i[1] = (f) => a.value = ""),
                error: ""
              }, {
                default: X(() => [
                  Y(w(a.value), 1)
                ]),
                _: 1
              })) : I("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, We = {
  ESCAPE: "Escape",
  F2: "F2",
  F5: "F5",
  DELETE: "Delete",
  ENTER: "Enter",
  BACKSLASH: "Backslash",
  KEY_A: "KeyA",
  KEY_E: "KeyE",
  KEY_F: "KeyF"
};
function qa(t) {
  const e = (n) => {
    n.code === We.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible && (t.fs.searchMode || (n.code === We.F2 && t.features.includes(de.RENAME) && (t.dragSelect.getCount() !== 1 || t.modal.open(xo, { items: t.dragSelect.getSelected() })), n.code === We.F5 && t.emitter.emit("vf-fetch", { params: { q: "index", adapter: t.fs.adapter, path: t.fs.data.dirname } }), n.code === We.DELETE && (!t.dragSelect.getCount() || t.modal.open(So, { items: t.dragSelect.getSelected() })), n.metaKey && n.code === We.BACKSLASH && t.modal.open(ko), n.metaKey && n.code === We.KEY_F && t.features.includes(de.SEARCH) && (t.fs.searchMode = !0, n.preventDefault()), n.metaKey && n.code === We.KEY_E && (t.showTreeView = !t.showTreeView, t.storage.setStore("show-tree-view", t.showTreeView)), n.metaKey && n.code === We.ENTER && (t.fullScreen = !t.fullScreen, t.root.focus()), n.metaKey && n.code === We.KEY_A && (t.dragSelect.selectAll(), n.preventDefault())));
  };
  Ee(() => {
    t.root.addEventListener("keydown", e);
  });
}
const Pa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function za(t, e) {
  return _(), h("svg", Pa, e[0] || (e[0] = [
    r("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ]));
}
const $o = { render: za }, Ga = { class: "vuefinder__new-folder-modal__content" }, ja = { class: "vuefinder__new-folder-modal__form" }, Wa = { class: "vuefinder__new-folder-modal__description" }, Ka = ["placeholder"], Co = {
  __name: "ModalNewFolder",
  setup(t) {
    const e = le("ServiceContainer");
    e.storage;
    const { t: n } = e.i18n, o = O(""), s = O(""), a = () => {
      o.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfolder",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          name: o.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is created.", o.value) });
        },
        onError: (c) => {
          s.value = n(c.message);
        }
      });
    };
    return (c, d) => (_(), z(Qe, null, {
      buttons: X(() => [
        r("button", {
          type: "button",
          onClick: a,
          class: "vf-btn vf-btn-primary"
        }, w(l(n)("Create")), 1),
        r("button", {
          type: "button",
          onClick: d[2] || (d[2] = (i) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(l(n)("Cancel")), 1)
      ]),
      default: X(() => [
        r("div", null, [
          q(lt, {
            icon: l($o),
            title: l(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          r("div", Ga, [
            r("div", ja, [
              r("p", Wa, w(l(n)("Create a new folder")), 1),
              ue(r("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (i) => o.value = i),
                onKeyup: At(a, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: l(n)("Folder Name"),
                type: "text"
              }, null, 40, Ka), [
                [Vt, o.value]
              ]),
              s.value.length ? (_(), z(Ze, {
                key: 0,
                onHidden: d[1] || (d[1] = (i) => s.value = ""),
                error: ""
              }, {
                default: X(() => [
                  Y(w(s.value), 1)
                ]),
                _: 1
              })) : I("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Ya = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Xa(t, e) {
  return _(), h("svg", Ya, e[0] || (e[0] = [
    r("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ]));
}
const Eo = { render: Xa }, Ja = { class: "vuefinder__new-file-modal__content" }, Qa = { class: "vuefinder__new-file-modal__form" }, Za = { class: "vuefinder__new-file-modal__description" }, ei = ["placeholder"], ti = {
  __name: "ModalNewFile",
  setup(t) {
    const e = le("ServiceContainer");
    e.storage;
    const { t: n } = e.i18n, o = O(""), s = O(""), a = () => {
      o.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfile",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          name: o.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is created.", o.value) });
        },
        onError: (c) => {
          s.value = n(c.message);
        }
      });
    };
    return (c, d) => (_(), z(Qe, null, {
      buttons: X(() => [
        r("button", {
          type: "button",
          onClick: a,
          class: "vf-btn vf-btn-primary"
        }, w(l(n)("Create")), 1),
        r("button", {
          type: "button",
          onClick: d[2] || (d[2] = (i) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(l(n)("Cancel")), 1)
      ]),
      default: X(() => [
        r("div", null, [
          q(lt, {
            icon: l(Eo),
            title: l(n)("New File")
          }, null, 8, ["icon", "title"]),
          r("div", Ja, [
            r("div", Qa, [
              r("p", Za, w(l(n)("Create a new file")), 1),
              ue(r("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (i) => o.value = i),
                onKeyup: At(a, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: l(n)("File Name"),
                type: "text"
              }, null, 40, ei), [
                [Vt, o.value]
              ]),
              s.value.length ? (_(), z(Ze, {
                key: 0,
                onHidden: d[1] || (d[1] = (i) => s.value = ""),
                error: ""
              }, {
                default: X(() => [
                  Y(w(s.value), 1)
                ]),
                _: 1
              })) : I("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
};
function Cs(t, e = 14) {
  let n = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return t.replace(new RegExp(n), "$2..$4");
}
const ni = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function si(t, e) {
  return _(), h("svg", ni, e[0] || (e[0] = [
    r("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ]));
}
const oi = { render: si }, ri = { class: "vuefinder__unarchive-modal__content" }, li = { class: "vuefinder__unarchive-modal__items" }, ai = { class: "vuefinder__unarchive-modal__item" }, ii = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ci = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, di = { class: "vuefinder__unarchive-modal__item-name" }, ui = { class: "vuefinder__unarchive-modal__info" }, vi = {
  __name: "ModalUnarchive",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, o = O(e.modal.data.items[0]), s = O(""), a = O([]), c = () => {
      e.emitter.emit("vf-fetch", {
        params: {
          q: "unarchive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: o.value.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("The file unarchived.") });
        },
        onError: (d) => {
          s.value = n(d.message);
        }
      });
    };
    return (d, i) => (_(), z(Qe, null, {
      buttons: X(() => [
        r("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, w(l(n)("Unarchive")), 1),
        r("button", {
          type: "button",
          onClick: i[1] || (i[1] = (f) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(l(n)("Cancel")), 1)
      ]),
      default: X(() => [
        r("div", null, [
          q(lt, {
            icon: l(oi),
            title: l(n)("Unarchive")
          }, null, 8, ["icon", "title"]),
          r("div", ri, [
            r("div", li, [
              (_(!0), h(ke, null, Ce(a.value, (f) => (_(), h("p", ai, [
                f.type === "dir" ? (_(), h("svg", ii, i[2] || (i[2] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (_(), h("svg", ci, i[3] || (i[3] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                r("span", di, w(f.basename), 1)
              ]))), 256)),
              r("p", ui, w(l(n)("The archive will be unarchived at")) + " (" + w(l(e).fs.data.dirname) + ")", 1),
              s.value.length ? (_(), z(Ze, {
                key: 0,
                onHidden: i[0] || (i[0] = (f) => s.value = ""),
                error: ""
              }, {
                default: X(() => [
                  Y(w(s.value), 1)
                ]),
                _: 1
              })) : I("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, fi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function _i(t, e) {
  return _(), h("svg", fi, e[0] || (e[0] = [
    r("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ]));
}
const mi = { render: _i }, pi = { class: "vuefinder__archive-modal__content" }, hi = { class: "vuefinder__archive-modal__form" }, gi = { class: "vuefinder__archive-modal__files vf-scrollbar" }, bi = { class: "vuefinder__archive-modal__file" }, wi = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, yi = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ki = { class: "vuefinder__archive-modal__file-name" }, Si = ["placeholder"], xi = {
  __name: "ModalArchive",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, o = O(""), s = O(""), a = O(e.modal.data.items), c = () => {
      a.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: a.value.map(({ path: d, type: i }) => ({ path: d, type: i })),
          name: o.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("The file(s) archived.") });
        },
        onError: (d) => {
          s.value = n(d.message);
        }
      });
    };
    return (d, i) => (_(), z(Qe, null, {
      buttons: X(() => [
        r("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, w(l(n)("Archive")), 1),
        r("button", {
          type: "button",
          onClick: i[2] || (i[2] = (f) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(l(n)("Cancel")), 1)
      ]),
      default: X(() => [
        r("div", null, [
          q(lt, {
            icon: l(mi),
            title: l(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          r("div", pi, [
            r("div", hi, [
              r("div", gi, [
                (_(!0), h(ke, null, Ce(a.value, (f) => (_(), h("p", bi, [
                  f.type === "dir" ? (_(), h("svg", wi, i[3] || (i[3] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (_(), h("svg", yi, i[4] || (i[4] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  r("span", ki, w(f.basename), 1)
                ]))), 256))
              ]),
              ue(r("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (f) => o.value = f),
                onKeyup: At(c, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: l(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, Si), [
                [Vt, o.value]
              ]),
              s.value.length ? (_(), z(Ze, {
                key: 0,
                onHidden: i[1] || (i[1] = (f) => s.value = ""),
                error: ""
              }, {
                default: X(() => [
                  Y(w(s.value), 1)
                ]),
                _: 1
              })) : I("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, $i = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function Ci(t, e) {
  return _(), h("svg", $i, e[0] || (e[0] = [
    r("circle", {
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      "stroke-width": "4",
      class: "opacity-25 stroke-blue-900 dark:stroke-blue-100"
    }, null, -1),
    r("path", {
      fill: "currentColor",
      d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
      class: "opacity-75"
    }, null, -1)
  ]));
}
const ns = { render: Ci }, Ei = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Ti(t, e) {
  return _(), h("svg", Ei, e[0] || (e[0] = [
    r("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ]));
}
const Ai = { render: Ti }, Vi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Di(t, e) {
  return _(), h("svg", Vi, e[0] || (e[0] = [
    r("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ]));
}
const Mi = { render: Di }, Li = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Oi(t, e) {
  return _(), h("svg", Li, e[0] || (e[0] = [
    r("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ]));
}
const Ri = { render: Oi }, Bi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Fi(t, e) {
  return _(), h("svg", Bi, e[0] || (e[0] = [
    r("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ]));
}
const Hi = { render: Fi }, Ii = { class: "vuefinder__toolbar" }, Ni = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, Ui = ["title"], qi = ["title"];
const Pi = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, zi = { class: "pl-2" }, Gi = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, ji = { class: "vuefinder__toolbar__controls" }, Wi = ["title"], Ki = ["title"], Yi = {
  __name: "Toolbar",
  setup(t) {
    const e = le("ServiceContainer"), { setStore: n } = e.storage, { t: o } = e.i18n, s = e.dragSelect, a = O(""), c = O([]), d = Xe(() => c.value.some((m) => m.onlyRead));
    e.emitter.on("vf-context-selected", (m) => {
      c.value = m;
    }), e.emitter.on("vf-contextmenu-show", ({ event: m, items: p, target: u = null }) => {
      console.log(u);
    }), e.emitter.on("vf-search-query", ({ newQuery: m }) => {
      a.value = m;
    });
    const i = () => {
      e.fullScreen = !e.fullScreen;
    };
    Oe(() => e.fullScreen, () => {
      e.fullScreen ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "", n("full-screen", e.fullScreen), e.emitter.emit("vf-fullscreen-toggle");
    });
    const f = () => {
      e.view = e.view === "list" ? "grid" : "list", s.refreshSelection(), n("viewport", e.view);
    };
    return (m, p) => (_(), h("div", Ii, [
      a.value.length ? (_(), h("div", Pi, [
        r("div", zi, [
          Y(w(l(o)("Search results for")) + " ", 1),
          r("span", Gi, w(a.value), 1)
        ]),
        l(e).fs.loading ? (_(), z(l(ns), { key: 0 })) : I("", !0)
      ])) : (_(), h("div", Ni, [
        l(e).features.includes(l(de).NEW_FOLDER) ? (_(), h("div", {
          key: 0,
          class: "mx-1.5",
          title: l(o)("New Folder"),
          onClick: p[0] || (p[0] = (u) => l(e).modal.open(Co, { items: l(s).getSelected() }))
        }, [
          q(l($o))
        ], 8, Ui)) : I("", !0),
        l(e).features.includes(l(de).NEW_FILE) ? (_(), h("div", {
          key: 1,
          class: "mx-1.5",
          title: l(o)("New File"),
          onClick: p[1] || (p[1] = (u) => l(e).modal.open(ti, { items: l(s).getSelected() }))
        }, [
          q(l(Eo))
        ], 8, qi)) : I("", !0),
        (l(e).features.includes(l(de).RENAME), I("", !0)),
        (l(e).features.includes(l(de).DELETE), I("", !0)),
        (l(e).features.includes(l(de).UPLOAD), I("", !0)),
        (l(e).features.includes(l(de).UNARCHIVE) && l(s).getCount() === 1 && l(s).getSelected()[0].mime_type, I("", !0)),
        (l(e).features.includes(l(de).ARCHIVE), I("", !0))
      ])),
      r("div", ji, [
        l(e).features.includes(l(de).FULL_SCREEN) ? (_(), h("div", {
          key: 0,
          onClick: i,
          class: "mx-1.5",
          title: l(o)("Toggle Full Screen")
        }, [
          l(e).fullScreen ? (_(), z(l(Mi), { key: 0 })) : (_(), z(l(Ai), { key: 1 }))
        ], 8, Wi)) : I("", !0),
        r("div", {
          class: "mx-1.5",
          title: l(o)("Change View"),
          onClick: p[7] || (p[7] = (u) => a.value.length || f())
        }, [
          l(e).view === "grid" ? (_(), z(l(Ri), {
            key: 0,
            class: ge(["vf-toolbar-icon", a.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : I("", !0),
          l(e).view === "list" ? (_(), z(l(Hi), {
            key: 1,
            class: ge(["vf-toolbar-icon", a.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : I("", !0)
        ], 8, Ki)
      ])
    ]));
  }
}, Xi = (t, e = 0, n = !1) => {
  let o;
  return (...s) => {
    n && !o && t(...s), clearTimeout(o), o = setTimeout(() => {
      t(...s);
    }, e);
  };
}, Es = (t, e, n) => {
  const o = O(t);
  return Uo((s, a) => ({
    get() {
      return s(), o.value;
    },
    set: Xi(
      (c) => {
        o.value = c, a();
      },
      e,
      n
    )
  }));
}, Ji = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Qi(t, e) {
  return _(), h("svg", Ji, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ]));
}
const Zi = { render: Qi }, ec = { class: "vuefinder__move-modal__content" }, tc = { class: "vuefinder__move-modal__description" }, nc = { class: "vuefinder__move-modal__files vf-scrollbar" }, sc = { class: "vuefinder__move-modal__file" }, oc = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, rc = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, lc = { class: "vuefinder__move-modal__file-name" }, ac = { class: "vuefinder__move-modal__target-title" }, ic = { class: "vuefinder__move-modal__target-directory" }, cc = { class: "vuefinder__move-modal__target-path" }, dc = { class: "vuefinder__move-modal__selected-items" }, zn = {
  __name: "ModalMove",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, o = O(e.modal.data.items.from), s = O(""), a = () => {
      o.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "move",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: o.value.map(({ path: c, type: d }) => ({ path: c, type: d })),
          item: e.modal.data.items.to.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("Files moved.", e.modal.data.items.to.name) });
        },
        onError: (c) => {
          s.value = n(c.message);
        }
      });
    };
    return (c, d) => (_(), z(Qe, null, {
      buttons: X(() => [
        r("button", {
          type: "button",
          onClick: a,
          class: "vf-btn vf-btn-primary"
        }, w(l(n)("Yes, Move!")), 1),
        r("button", {
          type: "button",
          onClick: d[1] || (d[1] = (i) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(l(n)("Cancel")), 1),
        r("div", dc, w(l(n)("%s item(s) selected.", o.value.length)), 1)
      ]),
      default: X(() => [
        r("div", null, [
          q(lt, {
            icon: l(Zi),
            title: l(n)("Move files")
          }, null, 8, ["icon", "title"]),
          r("div", ec, [
            r("p", tc, w(l(n)("Are you sure you want to move these files?")), 1),
            r("div", nc, [
              (_(!0), h(ke, null, Ce(o.value, (i) => (_(), h("div", sc, [
                r("div", null, [
                  i.type === "dir" ? (_(), h("svg", oc, d[2] || (d[2] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (_(), h("svg", rc, d[3] || (d[3] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])))
                ]),
                r("div", lc, w(i.path), 1)
              ]))), 256))
            ]),
            r("h4", ac, w(l(n)("Target Directory")), 1),
            r("p", ic, [
              d[4] || (d[4] = r("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                "stroke-width": "1"
              }, [
                r("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                })
              ], -1)),
              r("span", cc, w(l(e).modal.data.items.to.path), 1)
            ]),
            s.value.length ? (_(), z(Ze, {
              key: 0,
              onHidden: d[0] || (d[0] = (i) => s.value = ""),
              error: ""
            }, {
              default: X(() => [
                Y(w(s.value), 1)
              ]),
              _: 1
            })) : I("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, uc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
};
function vc(t, e) {
  return _(), h("svg", uc, e[0] || (e[0] = [
    r("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ]));
}
const fc = { render: vc }, _c = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function mc(t, e) {
  return _(), h("svg", _c, e[0] || (e[0] = [
    r("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const pc = { render: mc }, hc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
};
function gc(t, e) {
  return _(), h("svg", hc, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ]));
}
const bc = { render: gc }, wc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
};
function yc(t, e) {
  return _(), h("svg", wc, e[0] || (e[0] = [
    r("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ]));
}
const kc = { render: yc }, Sc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
};
function xc(t, e) {
  return _(), h("svg", Sc, e[0] || (e[0] = [
    r("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ]));
}
const $c = { render: xc }, Cc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Ec(t, e) {
  return _(), h("svg", Cc, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ]));
}
const Tc = { render: Ec }, Ac = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
};
function Vc(t, e) {
  return _(), h("svg", Ac, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ]));
}
const gn = { render: Vc }, Dc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-6 w-6 p-1 rounded text-slate-700 dark:text-neutral-300 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Mc(t, e) {
  return _(), h("svg", Dc, e[0] || (e[0] = [
    r("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ]));
}
const Lc = { render: Mc }, Oc = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
};
function Rc(t, e) {
  return _(), h("svg", Oc, e[0] || (e[0] = [
    r("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ]));
}
const Bc = { render: Rc }, Fc = { class: "vuefinder__breadcrumb__container" }, Hc = ["title"], Ic = ["title"], Nc = ["title"], Uc = ["title"], qc = { class: "vuefinder__breadcrumb__list" }, Pc = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, zc = { class: "relative" }, Gc = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], jc = { class: "vuefinder__breadcrumb__search-mode" }, Wc = ["placeholder"], Kc = { class: "vuefinder__breadcrumb__hidden-dropdown" }, Yc = ["onDrop", "onClick"], Xc = { class: "vuefinder__breadcrumb__hidden-item-content" }, Jc = { class: "vuefinder__breadcrumb__hidden-item-text" }, Qc = {
  __name: "Breadcrumb",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, o = e.dragSelect, { setStore: s } = e.storage, a = O(null), c = Es(0, 100);
    Oe(c, (V) => {
      const k = a.value.children;
      let x = 0, A = 0, F = 5, H = 1;
      e.fs.limitBreadcrumbItems(F), ct(() => {
        for (let U = k.length - 1; U >= 0 && !(x + k[U].offsetWidth > c.value - 40); U--)
          x += parseInt(k[U].offsetWidth, 10), A++;
        A < H && (A = H), A > F && (A = F), e.fs.limitBreadcrumbItems(A);
      });
    });
    const d = () => {
      c.value = a.value.offsetWidth;
    };
    let i = O(null);
    Ee(() => {
      i.value = new ResizeObserver(d), i.value.observe(a.value);
    }), Gn(() => {
      i.value.disconnect();
    });
    const f = (V, k = null) => {
      V.preventDefault(), o.isDraggingRef.value = !1, u(V), k ?? (k = e.fs.hiddenBreadcrumbs.length - 1);
      let x = JSON.parse(V.dataTransfer.getData("items"));
      if (x.find((A) => A.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(zn, {
        items: {
          from: x,
          to: e.fs.hiddenBreadcrumbs[k] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, m = (V, k = null) => {
      V.preventDefault(), o.isDraggingRef.value = !1, u(V), k ?? (k = e.fs.breadcrumbs.length - 2);
      let x = JSON.parse(V.dataTransfer.getData("items"));
      if (x.find((A) => A.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(zn, {
        items: {
          from: x,
          to: e.fs.breadcrumbs[k] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, p = (V) => {
      V.preventDefault(), e.fs.isGoUpAvailable() ? (V.dataTransfer.dropEffect = "copy", V.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (V.dataTransfer.dropEffect = "none", V.dataTransfer.effectAllowed = "none");
    }, u = (V) => {
      V.preventDefault(), V.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && V.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, v = () => {
      R(), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    }, g = () => {
      R(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.parentFolderPath
        }
      });
    }, y = (V) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: V.path } }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, L = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, M = {
      mounted(V, k, x, A) {
        V.clickOutsideEvent = function(F) {
          V === F.target || V.contains(F.target) || k.value();
        }, document.body.addEventListener("click", V.clickOutsideEvent);
      },
      beforeUnmount(V, k, x, A) {
        document.body.removeEventListener("click", V.clickOutsideEvent);
      }
    }, S = () => {
      e.showTreeView = !e.showTreeView;
    };
    Oe(() => e.showTreeView, (V, k) => {
      V !== k && s("show-tree-view", V);
    });
    const b = O(null), $ = () => {
      e.features.includes(de.SEARCH) && (e.fs.searchMode = !0, ct(() => b.value.focus()));
    }, D = Es("", 400);
    Oe(D, (V) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: V });
    }), Oe(() => e.fs.searchMode, (V) => {
      V && ct(() => b.value.focus());
    });
    const R = () => {
      e.fs.searchMode = !1, D.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      R();
    });
    const j = () => {
      D.value === "" && R();
    };
    return (V, k) => (_(), h("div", Fc, [
      r("span", {
        title: l(n)("Toggle Tree View")
      }, [
        q(l(Lc), {
          onClick: S,
          class: ge(["vuefinder__breadcrumb__toggle-tree", l(e).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, Hc),
      r("span", {
        title: l(n)("Go up a directory")
      }, [
        q(l(pc), {
          onDragover: k[0] || (k[0] = (x) => p(x)),
          onDragleave: k[1] || (k[1] = (x) => u(x)),
          onDrop: k[2] || (k[2] = (x) => m(x)),
          onClick: g,
          class: ge(l(e).fs.isGoUpAvailable() ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive")
        }, null, 8, ["class"])
      ], 8, Ic),
      l(e).fs.loading ? (_(), h("span", {
        key: 1,
        title: l(n)("Cancel")
      }, [
        q(l(bc), {
          onClick: k[3] || (k[3] = (x) => l(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, Uc)) : (_(), h("span", {
        key: 0,
        title: l(n)("Refresh")
      }, [
        q(l(fc), { onClick: v })
      ], 8, Nc)),
      ue(r("div", {
        onClick: Ot($, ["self"]),
        class: "group vuefinder__breadcrumb__search-container"
      }, [
        r("div", null, [
          q(l(kc), {
            onDragover: k[4] || (k[4] = (x) => p(x)),
            onDragleave: k[5] || (k[5] = (x) => u(x)),
            onDrop: k[6] || (k[6] = (x) => m(x, -1)),
            onClick: k[7] || (k[7] = (x) => l(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: l(e).fs.adapter } }))
          })
        ]),
        r("div", qc, [
          l(e).fs.hiddenBreadcrumbs.length ? ue((_(), h("div", Pc, [
            k[13] || (k[13] = r("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            r("div", zc, [
              r("span", {
                onDragenter: k[8] || (k[8] = (x) => l(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: k[9] || (k[9] = (x) => l(e).fs.toggleHiddenBreadcrumbs()),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                q(l(Bc), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [M, L]
          ]) : I("", !0)
        ]),
        r("div", {
          ref_key: "breadcrumbContainer",
          ref: a,
          class: "vuefinder__breadcrumb__visible-list",
          onClick: Ot($, ["self"])
        }, [
          (_(!0), h(ke, null, Ce(l(e).fs.breadcrumbs, (x, A) => (_(), h("div", { key: A }, [
            k[14] || (k[14] = r("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            r("span", {
              onDragover: (F) => A === l(e).fs.breadcrumbs.length - 1 || p(F),
              onDragleave: (F) => A === l(e).fs.breadcrumbs.length - 1 || u(F),
              onDrop: (F) => A === l(e).fs.breadcrumbs.length - 1 || m(F, A),
              class: "vuefinder__breadcrumb__item",
              title: x.basename,
              onClick: (F) => l(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: l(e).fs.adapter, path: x.path } })
            }, w(x.name), 41, Gc)
          ]))), 128))
        ], 512),
        l(e).fs.loading ? (_(), z(l(ns), { key: 0 })) : I("", !0)
      ], 512), [
        [ze, !l(e).fs.searchMode]
      ]),
      ue(r("div", jc, [
        r("div", null, [
          q(l($c))
        ]),
        ue(r("input", {
          ref_key: "searchInput",
          ref: b,
          onKeydown: At(R, ["esc"]),
          onBlur: j,
          "onUpdate:modelValue": k[10] || (k[10] = (x) => qo(D) ? D.value = x : null),
          placeholder: l(n)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, Wc), [
          [Vt, l(D)]
        ]),
        q(l(Tc), { onClick: R })
      ], 512), [
        [ze, l(e).fs.searchMode]
      ]),
      ue(r("div", Kc, [
        (_(!0), h(ke, null, Ce(l(e).fs.hiddenBreadcrumbs, (x, A) => (_(), h("div", {
          key: A,
          onDragover: k[11] || (k[11] = (F) => p(F)),
          onDragleave: k[12] || (k[12] = (F) => u(F)),
          onDrop: (F) => f(F, A),
          onClick: (F) => y(x),
          class: "vuefinder__breadcrumb__hidden-item"
        }, [
          r("div", Xc, [
            r("span", null, [
              q(l(gn), { class: "vuefinder__breadcrumb__hidden-item-icon" })
            ]),
            k[15] || (k[15] = Y()),
            r("span", Jc, w(x.name), 1)
          ])
        ], 40, Yc))), 128))
      ], 512), [
        [ze, l(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, To = (t, e = null) => new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), Zc = ["onClick"], ed = {
  __name: "Toast",
  setup(t) {
    const e = le("ServiceContainer"), { getStore: n } = e.storage, o = O(n("full-screen", !1)), s = O([]), a = (i) => i === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", c = (i) => {
      s.value.splice(i, 1);
    }, d = (i) => {
      let f = s.value.findIndex((m) => m.id === i);
      f !== -1 && c(f);
    };
    return e.emitter.on("vf-toast-clear", () => {
      s.value = [];
    }), e.emitter.on("vf-toast-push", (i) => {
      let f = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      i.id = f, s.value.push(i), setTimeout(() => {
        d(f);
      }, 5e3);
    }), (i, f) => (_(), h("div", {
      class: ge(["vuefinder__toast", o.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      q(Po, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: X(() => [
          (_(!0), h(ke, null, Ce(s.value, (m, p) => (_(), h("div", {
            key: p,
            onClick: (u) => c(p),
            class: ge(["vuefinder__toast__message", a(m.type)])
          }, w(m.label), 11, Zc))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}, td = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function nd(t, e) {
  return _(), h("svg", td, e[0] || (e[0] = [
    r("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const sd = { render: nd }, od = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function rd(t, e) {
  return _(), h("svg", od, e[0] || (e[0] = [
    r("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const ld = { render: rd }, Wt = {
  __name: "SortIcon",
  props: { direction: String },
  setup(t) {
    return (e, n) => (_(), h("div", null, [
      t.direction === "asc" ? (_(), z(l(sd), { key: 0 })) : I("", !0),
      t.direction === "desc" ? (_(), z(l(ld), { key: 1 })) : I("", !0)
    ]));
  }
}, ad = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
};
function id(t, e) {
  return _(), h("svg", ad, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ]));
}
const cd = { render: id }, dd = { class: "vuefinder__item-icon" }, En = {
  __name: "ItemIcon",
  props: {
    type: {
      type: String,
      required: !0
    },
    small: {
      type: Boolean,
      default: !1
    }
  },
  setup(t) {
    return (e, n) => (_(), h("span", dd, [
      t.type === "dir" ? (_(), z(l(gn), {
        key: 0,
        class: ge(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"])) : (_(), z(l(cd), {
        key: 1,
        class: ge(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"]))
    ]));
  }
}, ud = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
};
function vd(t, e) {
  return _(), h("svg", ud, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ]));
}
const fd = { render: vd }, _d = { class: "vuefinder__drag-item__container" }, md = { class: "vuefinder__drag-item__count" }, pd = {
  __name: "DragItem",
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(t) {
    const e = t;
    return (n, o) => (_(), h("div", _d, [
      q(l(fd)),
      r("div", md, w(e.count), 1)
    ]));
  }
}, hd = { class: "vuefinder__text-preview" }, gd = { class: "vuefinder__text-preview__header" }, bd = ["title"], wd = { class: "vuefinder__text-preview__actions" }, yd = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, kd = { key: 1 }, Sd = {
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = O(""), s = O(""), a = O(null), c = O(!1), d = O(""), i = O(!1), f = le("ServiceContainer"), { t: m } = f.i18n;
    Ee(() => {
      f.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: f.modal.data.adapter, path: f.modal.data.item.path },
        responseType: "text"
      }).then((v) => {
        o.value = v, n("success");
      });
    });
    const p = () => {
      c.value = !c.value, s.value = o.value;
    }, u = () => {
      d.value = "", i.value = !1, f.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          adapter: f.modal.data.adapter,
          path: f.modal.data.item.path
        },
        body: {
          content: s.value
        },
        responseType: "text"
      }).then((v) => {
        d.value = m("Updated."), o.value = v, n("success"), c.value = !c.value;
      }).catch((v) => {
        d.value = m(v.message), i.value = !0;
      });
    };
    return (v, g) => (_(), h("div", hd, [
      r("div", gd, [
        r("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: l(f).modal.data.item.path
        }, w(l(f).modal.data.item.basename), 9, bd),
        r("div", wd, [
          c.value ? (_(), h("button", {
            key: 0,
            onClick: u,
            class: "vuefinder__text-preview__save-button"
          }, w(l(m)("Save")), 1)) : I("", !0),
          l(f).features.includes(l(de).EDIT) ? (_(), h("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: g[0] || (g[0] = (y) => p())
          }, w(c.value ? l(m)("Cancel") : l(m)("Edit")), 1)) : I("", !0)
        ])
      ]),
      r("div", null, [
        c.value ? (_(), h("div", kd, [
          ue(r("textarea", {
            ref_key: "editInput",
            ref: a,
            "onUpdate:modelValue": g[1] || (g[1] = (y) => s.value = y),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Vt, s.value]
          ])
        ])) : (_(), h("pre", yd, w(o.value), 1)),
        d.value.length ? (_(), z(Ze, {
          key: 2,
          onHidden: g[2] || (g[2] = (y) => d.value = ""),
          error: i.value
        }, {
          default: X(() => [
            Y(w(d.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : I("", !0)
      ])
    ]));
  }
}, xd = { class: "vuefinder__image-preview" }, $d = { class: "vuefinder__image-preview__header" }, Cd = ["title"], Ed = { class: "vuefinder__image-preview__actions" }, Td = { class: "vuefinder__image-preview__image-container" }, Ad = ["src"], Vd = {
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = le("ServiceContainer"), { t: s } = o.i18n, a = O(null), c = O(null), d = O(!1), i = O(""), f = O(!1), m = () => {
      d.value = !d.value, d.value ? c.value = new Jo(a.value, {
        crop(u) {
        }
      }) : c.value.destroy();
    }, p = () => {
      c.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (u) => {
          i.value = "", f.value = !1;
          const v = new FormData();
          v.set("file", u), o.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: o.modal.data.adapter,
              path: o.modal.data.item.path
            },
            body: v
          }).then((g) => {
            i.value = s("Updated."), a.value.src = o.requester.getPreviewUrl(o.modal.data.adapter, o.modal.data.item), m(), n("success");
          }).catch((g) => {
            i.value = s(g.message), f.value = !0;
          });
        }
      );
    };
    return Ee(() => {
      n("success");
    }), (u, v) => (_(), h("div", xd, [
      r("div", $d, [
        r("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: l(o).modal.data.item.path
        }, w(l(o).modal.data.item.basename), 9, Cd),
        r("div", Ed, [
          d.value ? (_(), h("button", {
            key: 0,
            onClick: p,
            class: "vuefinder__image-preview__crop-button"
          }, w(l(s)("Crop")), 1)) : I("", !0),
          l(o).features.includes(l(de).EDIT) ? (_(), h("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: v[0] || (v[0] = (g) => m())
          }, w(d.value ? l(s)("Cancel") : l(s)("Edit")), 1)) : I("", !0)
        ])
      ]),
      r("div", Td, [
        r("img", {
          ref_key: "image",
          ref: a,
          class: "vuefinder__image-preview__image",
          src: l(o).requester.getPreviewUrl(l(o).modal.data.adapter, l(o).modal.data.item),
          alt: ""
        }, null, 8, Ad)
      ]),
      i.value.length ? (_(), z(Ze, {
        key: 0,
        onHidden: v[1] || (v[1] = (g) => i.value = ""),
        error: f.value
      }, {
        default: X(() => [
          Y(w(i.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : I("", !0)
    ]));
  }
}, Dd = { class: "vuefinder__default-preview" }, Md = { class: "vuefinder__default-preview__header" }, Ld = ["title"], Od = {
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = le("ServiceContainer"), o = e;
    return Ee(() => {
      o("success");
    }), (s, a) => (_(), h("div", Dd, [
      r("div", Md, [
        r("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: l(n).modal.data.item.path
        }, w(l(n).modal.data.item.basename), 9, Ld)
      ]),
      a[0] || (a[0] = r("div", null, null, -1))
    ]));
  }
}, Rd = { class: "vuefinder__video-preview" }, Bd = ["title"], Fd = {
  class: "vuefinder__video-preview__video",
  preload: "",
  controls: ""
}, Hd = ["src"], Id = {
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = le("ServiceContainer"), o = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Ee(() => {
      o("success");
    }), (a, c) => (_(), h("div", Rd, [
      r("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: l(n).modal.data.item.path
      }, w(l(n).modal.data.item.basename), 9, Bd),
      r("div", null, [
        r("video", Fd, [
          r("source", {
            src: s(),
            type: "video/mp4"
          }, null, 8, Hd),
          c[0] || (c[0] = Y(" Your browser does not support the video tag. "))
        ])
      ])
    ]));
  }
}, Nd = { class: "vuefinder__audio-preview" }, Ud = ["title"], qd = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, Pd = ["src"], zd = {
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = le("ServiceContainer"), s = () => o.requester.getPreviewUrl(o.modal.data.adapter, o.modal.data.item);
    return Ee(() => {
      n("success");
    }), (a, c) => (_(), h("div", Nd, [
      r("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: l(o).modal.data.item.path
      }, w(l(o).modal.data.item.basename), 9, Ud),
      r("div", null, [
        r("audio", qd, [
          r("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, Pd),
          c[0] || (c[0] = Y(" Your browser does not support the audio element. "))
        ])
      ])
    ]));
  }
}, Gd = { class: "vuefinder__pdf-preview" }, jd = ["title"], Wd = ["data"], Kd = ["src"], Yd = {
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = le("ServiceContainer"), o = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Ee(() => {
      o("success");
    }), (a, c) => (_(), h("div", Gd, [
      r("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: l(n).modal.data.item.path
      }, w(l(n).modal.data.item.basename), 9, jd),
      r("div", null, [
        r("object", {
          class: "vuefinder__pdf-preview__object",
          data: s(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          r("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: s(),
            width: "100%",
            height: "100%"
          }, c[0] || (c[0] = [
            r("p", null, [
              Y(" Your browser does not support PDFs. "),
              r("a", { href: "https://example.com/test.pdf" }, "Download the PDF"),
              Y(". ")
            ], -1)
          ]), 8, Kd)
        ], 8, Wd)
      ])
    ]));
  }
}, Xd = { class: "vuefinder__preview-modal__content" }, Jd = { key: 0 }, Qd = { class: "vuefinder__preview-modal__loading" }, Zd = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, eu = { class: "vuefinder__preview-modal__details" }, tu = { class: "font-bold" }, nu = { class: "font-bold pl-2" }, su = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, ou = ["download", "href"], Ao = {
  __name: "ModalPreview",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, o = O(!1), s = (c) => (e.modal.data.item.mime_type ?? "").startsWith(c), a = e.features.includes(de.PREVIEW);
    return a || (o.value = !0), (c, d) => (_(), z(Qe, null, {
      buttons: X(() => [
        r("button", {
          type: "button",
          onClick: d[6] || (d[6] = (i) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(l(n)("Close")), 1),
        l(e).features.includes(l(de).DOWNLOAD) ? (_(), h("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: l(e).requester.getDownloadUrl(l(e).modal.data.adapter, l(e).modal.data.item),
          href: l(e).requester.getDownloadUrl(l(e).modal.data.adapter, l(e).modal.data.item)
        }, w(l(n)("Download")), 9, ou)) : I("", !0)
      ]),
      default: X(() => [
        r("div", null, [
          r("div", Xd, [
            l(a) ? (_(), h("div", Jd, [
              s("text") ? (_(), z(Sd, {
                key: 0,
                onSuccess: d[0] || (d[0] = (i) => o.value = !0)
              })) : s("image") ? (_(), z(Vd, {
                key: 1,
                onSuccess: d[1] || (d[1] = (i) => o.value = !0)
              })) : s("video") ? (_(), z(Id, {
                key: 2,
                onSuccess: d[2] || (d[2] = (i) => o.value = !0)
              })) : s("audio") ? (_(), z(zd, {
                key: 3,
                onSuccess: d[3] || (d[3] = (i) => o.value = !0)
              })) : s("application/pdf") ? (_(), z(Yd, {
                key: 4,
                onSuccess: d[4] || (d[4] = (i) => o.value = !0)
              })) : (_(), z(Od, {
                key: 5,
                onSuccess: d[5] || (d[5] = (i) => o.value = !0)
              }))
            ])) : I("", !0),
            r("div", Qd, [
              o.value === !1 ? (_(), h("div", Zd, [
                d[7] || (d[7] = r("svg", {
                  class: "vuefinder__preview-modal__spinner",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24"
                }, [
                  r("circle", {
                    class: "vuefinder__preview-modal__spinner-circle",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    "stroke-width": "4"
                  }),
                  r("path", {
                    class: "vuefinder__preview-modal__spinner-path",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  })
                ], -1)),
                r("span", null, w(l(n)("Loading")), 1)
              ])) : I("", !0)
            ])
          ])
        ]),
        r("div", eu, [
          r("div", null, [
            r("span", tu, w(l(n)("File Size")) + ": ", 1),
            Y(w(l(e).filesize(l(e).modal.data.item.file_size)), 1)
          ]),
          r("div", null, [
            r("span", nu, w(l(n)("Last Modified")) + ": ", 1),
            Y(" " + w(l(To)(l(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        l(e).features.includes(l(de).DOWNLOAD) ? (_(), h("div", su, [
          r("span", null, w(l(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : I("", !0)
      ]),
      _: 1
    }));
  }
}, ru = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function lu(t, e) {
  return _(), h("svg", ru, e[0] || (e[0] = [
    r("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ]));
}
const Vo = { render: lu }, au = ["data-type", "data-item", "data-index"], Tn = {
  __name: "Item",
  props: {
    item: { type: Object },
    index: { type: Number },
    dragImage: { type: Object }
  },
  setup(t) {
    const e = le("ServiceContainer"), n = e.dragSelect, o = t, s = (v) => {
      v.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: v.path } })) : e.modal.open(Ao, { adapter: e.fs.adapter, item: v });
    }, a = {
      mounted(v, g, y, L) {
        y.props.draggable && (v.addEventListener("dragstart", (M) => c(M, g.value)), v.addEventListener("dragover", (M) => i(M, g.value)), v.addEventListener("drop", (M) => d(M, g.value)));
      },
      beforeUnmount(v, g, y, L) {
        y.props.draggable && (v.removeEventListener("dragstart", c), v.removeEventListener("dragover", i), v.removeEventListener("drop", d));
      }
    }, c = (v, g) => {
      if (v.altKey || v.ctrlKey || v.metaKey)
        return v.preventDefault(), !1;
      n.isDraggingRef.value = !0, v.dataTransfer.setDragImage(o.dragImage.$el, 0, 15), v.dataTransfer.effectAllowed = "all", v.dataTransfer.dropEffect = "copy", v.dataTransfer.setData("items", JSON.stringify(n.getSelected()));
    }, d = (v, g) => {
      v.preventDefault(), n.isDraggingRef.value = !1;
      let y = JSON.parse(v.dataTransfer.getData("items"));
      if (y.find((L) => L.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(zn, { items: { from: y, to: g } });
    }, i = (v, g) => {
      v.preventDefault(), !g || g.type !== "dir" || n.getSelection().find((y) => y === v.currentTarget) ? (v.dataTransfer.dropEffect = "none", v.dataTransfer.effectAllowed = "none") : v.dataTransfer.dropEffect = "copy";
    };
    let f = null, m = !1;
    const p = () => {
      f && clearTimeout(f);
    }, u = (v) => {
      if (!m)
        m = !0, setTimeout(() => m = !1, 300);
      else
        return m = !1, s(o.item), clearTimeout(f), !1;
      f = setTimeout(() => {
        const g = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: v.target.getBoundingClientRect().x,
          clientY: v.target.getBoundingClientRect().y
        });
        v.target.dispatchEvent(g);
      }, 500);
    };
    return (v, g) => ue((_(), h("div", {
      style: rn({ opacity: l(n).isDraggingRef.value && l(n).getSelection().find((y) => v.$el === y) ? "0.5 !important" : "" }),
      class: ge(["vuefinder__item", "vf-item-" + l(n).explorerId]),
      "data-type": t.item.type,
      key: t.item.path,
      "data-item": JSON.stringify(t.item),
      "data-index": t.index,
      onDblclick: g[0] || (g[0] = (y) => s(t.item)),
      onTouchstart: g[1] || (g[1] = (y) => u(y)),
      onTouchend: g[2] || (g[2] = (y) => p()),
      onContextmenu: g[3] || (g[3] = Ot((y) => l(e).emitter.emit("vf-contextmenu-show", { event: y, items: l(n).getSelected(), target: t.item }), ["prevent"]))
    }, [
      Rt(v.$slots, "default"),
      l(e).pinnedFolders.find((y) => y.path === t.item.path) ? (_(), z(l(Vo), {
        key: 0,
        class: "vuefinder__item--pinned"
      })) : I("", !0)
    ], 46, au)), [
      [a, t.item]
    ]);
  }
}, iu = { class: "vuefinder__explorer__container" }, cu = {
  key: 0,
  class: "vuefinder__explorer__header"
}, du = { class: "vuefinder__explorer__drag-item" }, uu = { class: "vuefinder__explorer__item-list-content" }, vu = { class: "vuefinder__explorer__item-list-name" }, fu = { class: "vuefinder__explorer__item-name" }, _u = { class: "vuefinder__explorer__item-path" }, mu = { class: "vuefinder__explorer__item-list-content" }, pu = { class: "vuefinder__explorer__item-list-name" }, hu = { class: "vuefinder__explorer__item-name" }, gu = { class: "vuefinder__explorer__item-size" }, bu = { class: "vuefinder__explorer__item-date" }, wu = { class: "vuefinder__explorer__item-grid-content" }, yu = ["data-src", "alt"], ku = {
  key: 2,
  class: "vuefinder__explorer__item-extension"
}, Su = {
  key: 0,
  class: "vuefinder__explorer__item-title break-all"
}, xu = {
  key: 1,
  class: "vuefinder__explorer__item-title break-all"
}, $u = {
  __name: "Explorer",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, o = (p) => p == null ? void 0 : p.substring(0, 3), s = O(null), a = O(""), c = e.dragSelect;
    let d;
    e.emitter.on("vf-fullscreen-toggle", () => {
      c.area.value.style.height = null;
    }), e.emitter.on("vf-search-query", ({ newQuery: p }) => {
      a.value = p, p ? e.emitter.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname,
          filter: p
        },
        onSuccess: (u) => {
          u.files.length || e.emitter.emit("vf-toast-push", { label: n("No search result found.") });
        }
      }) : e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    });
    const i = vt({ active: !1, column: "", order: "" }), f = (p = !0) => {
      let u = [...e.fs.data.files], v = i.column, g = i.order === "asc" ? 1 : -1;
      if (!p)
        return u;
      const y = (L, M) => typeof L == "string" && typeof M == "string" ? L.toLowerCase().localeCompare(M.toLowerCase()) : L < M ? -1 : L > M ? 1 : 0;
      return i.active && (u = u.slice().sort((L, M) => y(L[v], M[v]) * g)), u;
    }, m = (p) => {
      i.active && i.column === p ? (i.active = i.order === "asc", i.column = p, i.order = "desc") : (i.active = !0, i.column = p, i.order = "asc");
    };
    return Ee(() => {
      d = new Xo(c.area.value);
    }), As(() => {
      d.update();
    }), No(() => {
      d.destroy();
    }), (p, u) => (_(), h("div", iu, [
      l(e).view === "list" || a.value.length ? (_(), h("div", cu, [
        r("div", {
          onClick: u[0] || (u[0] = (v) => m("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          Y(w(l(n)("Name")) + " ", 1),
          ue(q(Wt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [ze, i.active && i.column === "basename"]
          ])
        ]),
        a.value.length ? I("", !0) : (_(), h("div", {
          key: 0,
          onClick: u[1] || (u[1] = (v) => m("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          Y(w(l(n)("Size")) + " ", 1),
          ue(q(Wt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [ze, i.active && i.column === "file_size"]
          ])
        ])),
        a.value.length ? I("", !0) : (_(), h("div", {
          key: 1,
          onClick: u[2] || (u[2] = (v) => m("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          Y(w(l(n)("Date")) + " ", 1),
          ue(q(Wt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [ze, i.active && i.column === "last_modified"]
          ])
        ])),
        a.value.length ? (_(), h("div", {
          key: 2,
          onClick: u[3] || (u[3] = (v) => m("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          Y(w(l(n)("Filepath")) + " ", 1),
          ue(q(Wt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [ze, i.active && i.column === "path"]
          ])
        ])) : I("", !0)
      ])) : I("", !0),
      r("div", du, [
        q(pd, {
          ref_key: "dragImage",
          ref: s,
          count: l(c).getCount()
        }, null, 8, ["count"])
      ]),
      r("div", {
        ref: l(c).scrollBarContainer,
        class: ge(["vf-explorer-scrollbar-container vuefinder__explorer__scrollbar-container", [{ "grid-view": l(e).view === "grid" }, { "search-active": a.value.length }]])
      }, [
        r("div", {
          ref: l(c).scrollBar,
          class: "vuefinder__explorer__scrollbar"
        }, null, 512)
      ], 2),
      r("div", {
        ref: l(c).area,
        class: "vuefinder__explorer__selector-area vf-explorer-scrollbar vf-selector-area",
        onContextmenu: u[4] || (u[4] = Ot((v) => l(e).emitter.emit("vf-contextmenu-show", { event: v, items: l(c).getSelected() }), ["self", "prevent"]))
      }, [
        a.value.length ? (_(!0), h(ke, { key: 0 }, Ce(f(), (v, g) => (_(), z(Tn, {
          item: v,
          index: g,
          dragImage: s.value,
          class: "vf-item vf-item-list"
        }, {
          default: X(() => [
            r("div", uu, [
              r("div", vu, [
                q(En, {
                  type: v.type,
                  small: l(e).compactListView
                }, null, 8, ["type", "small"]),
                r("span", fu, w(v.basename), 1)
              ]),
              r("div", _u, w(v.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : I("", !0),
        l(e).view === "list" && !a.value.length ? (_(!0), h(ke, { key: 1 }, Ce(f(), (v, g) => (_(), z(Tn, {
          item: v,
          index: g,
          dragImage: s.value,
          class: "vf-item vf-item-list",
          draggable: v.onlyRead ? "false" : "true",
          key: v.path
        }, {
          default: X(() => [
            r("div", mu, [
              r("div", pu, [
                q(En, {
                  type: v.type,
                  small: l(e).compactListView
                }, null, 8, ["type", "small"]),
                r("span", hu, w(v.basename), 1)
              ]),
              r("div", gu, w(v.file_size ? l(e).filesize(v.file_size) : ""), 1),
              r("div", bu, w(l(To)(v.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage", "draggable"]))), 128)) : I("", !0),
        l(e).view === "grid" && !a.value.length ? (_(!0), h(ke, { key: 2 }, Ce(f(!1), (v, g) => (_(), z(Tn, {
          item: v,
          index: g,
          dragImage: s.value,
          class: "vf-item vf-item-grid",
          draggable: v.onlyRead ? "false" : "true"
        }, {
          default: X(() => [
            r("div", null, [
              r("div", wu, [
                (v.mime_type ?? "").startsWith("image") && l(e).showThumbnails ? (_(), h("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "vuefinder__explorer__item-thumbnail lazy",
                  "data-src": l(e).requester.getPreviewUrl(l(e).fs.adapter, v),
                  alt: v.basename,
                  key: v.path
                }, null, 8, yu)) : (_(), z(En, {
                  key: 1,
                  type: v.type
                }, null, 8, ["type"])),
                !((v.mime_type ?? "").startsWith("image") && l(e).showThumbnails) && v.type !== "dir" ? (_(), h("div", ku, w(o(v.extension)), 1)) : I("", !0)
              ]),
              v.onlyRead ? (_(), h("span", Su, w(l(Cs)("【只读】" + v.basename)), 1)) : (_(), h("span", xu, w(l(Cs)(v.basename)), 1))
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage", "draggable"]))), 256)) : I("", !0)
      ], 544),
      q(ed)
    ]));
  }
}, Cu = ["href", "download"], Eu = ["onClick"], Tu = {
  __name: "ContextMenu",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, o = O(null), s = O([]), a = O(""), c = vt({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), d = Xe(() => c.items.filter((u) => u.key == null || e.features.includes(u.key)));
    e.emitter.on("vf-context-selected", (u) => {
      s.value = u;
    });
    const i = {
      newfolder: {
        key: de.NEW_FOLDER,
        title: () => n("New Folder"),
        action: () => e.modal.open(Co)
      },
      selectAll: {
        title: () => n("Select All"),
        action: () => e.dragSelect.selectAll()
      },
      pinFolder: {
        title: () => n("Pin Folder"),
        action: () => {
          e.pinnedFolders = e.pinnedFolders.concat(s.value), e.storage.setStore("pinned-folders", e.pinnedFolders);
        }
      },
      unpinFolder: {
        title: () => n("Unpin Folder"),
        action: () => {
          e.pinnedFolders = e.pinnedFolders.filter((u) => !s.value.find((v) => v.path === u.path)), e.storage.setStore("pinned-folders", e.pinnedFolders);
        }
      },
      delete: {
        key: de.DELETE,
        title: () => n("Delete"),
        action: () => {
          e.modal.open(So, { items: s });
        }
      },
      refresh: {
        title: () => n("Refresh"),
        action: () => {
          e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
        }
      },
      preview: {
        key: de.PREVIEW,
        title: () => n("Preview"),
        action: () => e.modal.open(Ao, { adapter: e.fs.adapter, item: s.value[0] })
      },
      open: {
        title: () => n("Open"),
        action: () => {
          e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: s.value[0].path
            }
          });
        }
      },
      openDir: {
        title: () => n("Open containing folder"),
        action: () => {
          e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: s.value[0].dir
            }
          });
        }
      },
      download: {
        key: de.DOWNLOAD,
        link: Xe(() => e.requester.getDownloadUrl(e.fs.adapter, s.value[0])),
        title: () => n("Download"),
        action: () => {
        }
      },
      archive: {
        key: de.ARCHIVE,
        title: () => n("Archive"),
        action: () => e.modal.open(xi, { items: s })
      },
      unarchive: {
        key: de.UNARCHIVE,
        title: () => n("Unarchive"),
        action: () => e.modal.open(vi, { items: s })
      },
      rename: {
        key: de.RENAME,
        title: () => n("Rename"),
        action: () => e.modal.open(xo, { items: s })
      },
      setAllOnlyRead: {
        key: de.SETALLONLY,
        title: () => "设置只读/取消",
        action: () => {
          e.onlyReadFileStore.appendItems(s.value.map((u) => ({
            path: u.path,
            type: u.type,
            name: u.name,
            time: Date.now()
          }))), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } }), e.onlyReadFileStore.save();
        }
      }
    }, f = (u) => {
      e.emitter.emit("vf-contextmenu-hide"), u.action();
    };
    e.emitter.on("vf-search-query", ({ newQuery: u }) => {
      a.value = u;
    });
    const m = (u, v, g) => {
      v.some((y) => y.onlyRead) || s.value.some((y) => y.onlyRead) || u.push(g);
    };
    e.emitter.on("vf-contextmenu-show", ({ event: u, items: v, target: g = null }) => {
      if (c.items = [], a.value)
        if (g)
          c.items.push(i.openDir), e.emitter.emit("vf-context-selected", [g]);
        else
          return;
      else !g && !a.value ? (c.items.push(i.refresh), c.items.push(i.selectAll), c.items.push(i.newfolder), e.emitter.emit("vf-context-selected", [])) : v.length > 1 && v.some((y) => y.path === g.path) ? (c.items.push(i.refresh), m(c.items, [g], i.delete), c.items.push(i.setAllOnlyRead), e.emitter.emit("vf-context-selected", v)) : (g.type === "dir" ? (c.items.push(i.open), c.items.push(i.setAllOnlyRead), e.pinnedFolders.findIndex((y) => y.path === g.path) !== -1 ? c.items.push(i.unpinFolder) : c.items.push(i.pinFolder)) : (c.items.push(i.preview), c.items.push(i.download), c.items.push(i.setAllOnlyRead)), m(c.items, [g], i.rename), m(c.items, [g], i.delete), e.emitter.emit("vf-context-selected", [g]));
      p(u);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      c.active = !1;
    });
    const p = (u) => {
      const v = e.dragSelect.area.value, g = e.root.getBoundingClientRect(), y = v.getBoundingClientRect();
      let L = u.clientX - g.left, M = u.clientY - g.top;
      c.active = !0, ct(() => {
        var D;
        const S = (D = o.value) == null ? void 0 : D.getBoundingClientRect();
        let b = (S == null ? void 0 : S.height) ?? 0, $ = (S == null ? void 0 : S.width) ?? 0;
        L = y.right - u.pageX + window.scrollX < $ ? L - $ : L, M = y.bottom - u.pageY + window.scrollY < b ? M - b : M, c.positions = {
          left: L + "px",
          top: M + "px"
        };
      });
    };
    return (u, v) => ue((_(), h("ul", {
      ref_key: "contextmenu",
      ref: o,
      style: rn(c.positions),
      class: "vuefinder__context-menu"
    }, [
      (_(!0), h(ke, null, Ce(d.value, (g) => (_(), h("li", {
        class: "vuefinder__context-menu__item",
        key: g.title
      }, [
        g.link ? (_(), h("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: g.link,
          download: g.link,
          onClick: v[0] || (v[0] = (y) => l(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          r("span", null, w(g.title()), 1)
        ], 8, Cu)) : (_(), h("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (y) => f(g)
        }, [
          r("span", null, w(g.title()), 1)
        ], 8, Eu))
      ]))), 128))
    ], 4)), [
      [ze, c.active]
    ]);
  }
}, Au = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Vu(t, e) {
  return _(), h("svg", Au, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ]));
}
const Do = { render: Vu }, Du = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Mu(t, e) {
  return _(), h("svg", Du, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    }, null, -1)
  ]));
}
const Lu = { render: Mu }, Ou = { class: "vuefinder__status-bar__wrapper" }, Ru = { class: "vuefinder__status-bar__storage" }, Bu = ["title"], Fu = { class: "vuefinder__status-bar__storage-icon" }, Hu = ["value"], Iu = { class: "vuefinder__status-bar__info" }, Nu = { key: 0 }, Uu = { class: "vuefinder__status-bar__selected-count" }, qu = { class: "vuefinder__status-bar__actions" }, Pu = ["disabled"], zu = ["title"], Gu = {
  __name: "Statusbar",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, { setStore: o } = e.storage, s = e.dragSelect, a = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter } }), o("adapter", e.fs.adapter);
    }, c = O("");
    e.emitter.on("vf-search-query", ({ newQuery: i }) => {
      c.value = i;
    });
    const d = Xe(() => {
      const i = e.selectButton.multiple ? s.getSelected().length > 0 : s.getSelected().length === 1;
      return e.selectButton.active && i;
    });
    return (i, f) => (_(), h("div", Ou, [
      r("div", Ru, [
        r("div", {
          class: "vuefinder__status-bar__storage-container",
          title: l(n)("Storage")
        }, [
          r("div", Fu, [
            q(l(Do))
          ]),
          ue(r("select", {
            "onUpdate:modelValue": f[0] || (f[0] = (m) => l(e).fs.adapter = m),
            onChange: a,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (_(!0), h(ke, null, Ce(l(e).fs.data.storages, (m) => (_(), h("option", { value: m }, w(m), 9, Hu))), 256))
          ], 544), [
            [An, l(e).fs.adapter]
          ])
        ], 8, Bu),
        r("div", Iu, [
          c.value.length ? (_(), h("span", Nu, w(l(e).fs.data.files.length) + " items found. ", 1)) : I("", !0),
          r("span", Uu, w(l(e).dragSelect.getCount() > 0 ? l(n)("%s item(s) selected.", l(e).dragSelect.getCount()) : ""), 1)
        ])
      ]),
      r("div", qu, [
        l(e).selectButton.active ? (_(), h("button", {
          key: 0,
          class: ge(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: f[1] || (f[1] = (m) => l(e).selectButton.click(l(s).getSelected(), m))
        }, w(l(n)("Select")), 11, Pu)) : I("", !0),
        r("span", {
          class: "vuefinder__status-bar__about",
          title: l(n)("About"),
          onClick: f[2] || (f[2] = (m) => l(e).modal.open(ko))
        }, [
          q(l(Lu))
        ], 8, zu)
      ])
    ]));
  }
}, ju = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
};
function Wu(t, e) {
  return _(), h("svg", ju, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ]));
}
const Mo = { render: Wu }, Ku = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Yu(t, e) {
  return _(), h("svg", Ku, e[0] || (e[0] = [
    r("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ]));
}
const Xu = { render: Yu }, Ju = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Qu(t, e) {
  return _(), h("svg", Ju, e[0] || (e[0] = [
    r("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M15 12H9M12 9v6" }, null, -1)
  ]));
}
const Lo = { render: Qu }, Zu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function ev(t, e) {
  return _(), h("svg", Zu, e[0] || (e[0] = [
    r("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M9 12h6" }, null, -1)
  ]));
}
const Oo = { render: ev };
function Ro(t, e) {
  const n = t.findIndex((o) => o.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const tv = { class: "vuefinder__folder-loader-indicator" }, nv = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Bo = {
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ zo({
    adapter: {
      type: String,
      required: !0
    },
    path: {
      type: String,
      required: !0
    }
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(t) {
    const e = t, n = le("ServiceContainer");
    n.i18n;
    const o = Ds(t, "modelValue"), s = O(!1);
    Oe(
      () => o.value,
      () => {
        var d;
        return ((d = a()) == null ? void 0 : d.folders.length) || c();
      }
    );
    function a() {
      return n.treeViewData.find((d) => d.path === e.path);
    }
    const c = () => {
      s.value = !0, n.requester.send({
        url: "",
        method: "get",
        params: {
          q: "subfolders",
          adapter: e.adapter,
          path: e.path
        }
      }).then((d) => {
        Ro(n.treeViewData, { path: e.path, ...d });
      }).catch((d) => {
      }).finally(() => {
        s.value = !1;
      });
    };
    return (d, i) => {
      var f;
      return _(), h("div", tv, [
        s.value ? (_(), z(l(ns), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--loading"
        })) : (_(), h("div", nv, [
          o.value && ((f = a()) != null && f.folders.length) ? (_(), z(l(Oo), {
            key: 0,
            class: "vuefinder__folder-loader-indicator--minus"
          })) : I("", !0),
          o.value ? I("", !0) : (_(), z(l(Lo), {
            key: 1,
            class: "vuefinder__folder-loader-indicator--plus"
          }))
        ]))
      ]);
    };
  }
}, sv = { class: "vuefinder__treesubfolderlist__item-content" }, ov = ["onClick"], rv = ["title", "onClick"], lv = { class: "vuefinder__treesubfolderlist__item-icon" }, av = { class: "vuefinder__treesubfolderlist__subfolder" }, iv = {
  __name: "TreeSubfolderList",
  props: {
    adapter: {
      type: String,
      required: !0
    },
    path: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = le("ServiceContainer"), n = O([]), o = t, s = O(null);
    Ee(() => {
      o.path === o.adapter + "://" && Je(s.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const a = Xe(() => {
      var c;
      return ((c = e.treeViewData.find((d) => d.path === o.path)) == null ? void 0 : c.folders) || [];
    });
    return (c, d) => {
      const i = Go("TreeSubfolderList", !0);
      return _(), h("ul", {
        ref_key: "parentSubfolderList",
        ref: s,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (_(!0), h(ke, null, Ce(a.value, (f, m) => (_(), h("li", {
          key: f.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          r("div", sv, [
            r("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (p) => n.value[f.path] = !n.value[f.path]
            }, [
              q(Bo, {
                adapter: t.adapter,
                path: f.path,
                modelValue: n.value[f.path],
                "onUpdate:modelValue": (p) => n.value[f.path] = p
              }, null, 8, ["adapter", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, ov),
            r("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: f.path,
              onClick: (p) => l(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o.adapter, path: f.path } })
            }, [
              r("div", lv, [
                l(e).fs.path === f.path ? (_(), z(l(Mo), { key: 0 })) : (_(), z(l(gn), { key: 1 }))
              ]),
              r("div", {
                class: ge(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": l(e).fs.path === f.path
                }])
              }, w(f.basename), 3)
            ], 8, rv)
          ]),
          r("div", av, [
            ue(q(i, {
              adapter: o.adapter,
              path: f.path
            }, null, 8, ["adapter", "path"]), [
              [ze, n.value[f.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}, cv = { class: "vuefinder__treestorageitem__loader" }, dv = {
  __name: "TreeStorageItem",
  props: {
    storage: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = le("ServiceContainer"), n = O(!1);
    return (o, s) => (_(), h(ke, null, [
      r("div", {
        onClick: s[1] || (s[1] = (a) => n.value = !n.value),
        class: "vuefinder__treestorageitem__header"
      }, [
        r("div", {
          class: ge(["vuefinder__treestorageitem__info", t.storage === l(e).fs.adapter ? "vuefinder__treestorageitem__info--active" : ""])
        }, [
          r("div", {
            class: ge(["vuefinder__treestorageitem__icon", t.storage === l(e).fs.adapter ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            q(l(Do))
          ], 2),
          r("div", null, w(t.storage), 1)
        ], 2),
        r("div", cv, [
          q(Bo, {
            adapter: t.storage,
            path: t.storage + "://",
            modelValue: n.value,
            "onUpdate:modelValue": s[0] || (s[0] = (a) => n.value = a)
          }, null, 8, ["adapter", "path", "modelValue"])
        ])
      ]),
      ue(q(iv, {
        adapter: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["adapter", "path"]), [
        [ze, n.value]
      ])
    ], 64));
  }
}, uv = { class: "vuefinder__folder-indicator" }, vv = { class: "vuefinder__folder-indicator--icon" }, fv = {
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = Ds(t, "modelValue");
    return (n, o) => (_(), h("div", uv, [
      r("div", vv, [
        e.value ? (_(), z(l(Oo), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : I("", !0),
        e.value ? I("", !0) : (_(), z(l(Lo), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}, _v = { class: "vuefinder__treeview__header" }, mv = { class: "vuefinder__treeview__pinned-label" }, pv = { class: "vuefinder__treeview__pin-text text-nowrap" }, hv = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, gv = { class: "vuefinder__treeview__pinned-item" }, bv = ["onClick"], wv = ["title"], yv = ["onClick"], kv = { key: 0 }, Sv = { class: "vuefinder__treeview__no-pinned" }, xv = { class: "vuefinder__treeview__storage" }, $v = {
  __name: "TreeView",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, { getStore: o, setStore: s } = e.storage, a = O(190), c = O(o("pinned-folders-opened", !0));
    Oe(c, (m) => s("pinned-folders-opened", m));
    const d = (m) => {
      e.pinnedFolders = e.pinnedFolders.filter((p) => p.path !== m.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, i = (m) => {
      const p = m.clientX, u = m.target.parentElement, v = u.getBoundingClientRect().width;
      u.classList.remove("transition-[width]"), u.classList.add("transition-none");
      const g = (L) => {
        a.value = v + L.clientX - p, a.value < 50 && (a.value = 0, e.showTreeView = !1), a.value > 50 && (e.showTreeView = !0);
      }, y = () => {
        const L = u.getBoundingClientRect();
        a.value = L.width, u.classList.add("transition-[width]"), u.classList.remove("transition-none"), window.removeEventListener("mousemove", g), window.removeEventListener("mouseup", y);
      };
      window.addEventListener("mousemove", g), window.addEventListener("mouseup", y);
    }, f = O(null);
    return Ee(() => {
      Je(f.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), Oe(e.fs.data, (m, p) => {
      const u = m.files.filter((v) => v.type === "dir");
      Ro(e.treeViewData, { path: e.fs.path, folders: u.map((v) => ({
        adapter: v.storage,
        path: v.path,
        basename: v.basename
      })) });
    }), (m, p) => (_(), h(ke, null, [
      r("div", {
        onClick: p[0] || (p[0] = (u) => l(e).showTreeView = !l(e).showTreeView),
        class: ge(["vuefinder__treeview__overlay", l(e).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      r("div", {
        style: rn(l(e).showTreeView ? "min-width:100px;max-width:75%; width: " + a.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        r("div", {
          ref_key: "treeViewScrollElement",
          ref: f,
          class: "vuefinder__treeview__scroll"
        }, [
          r("div", _v, [
            r("div", {
              onClick: p[2] || (p[2] = (u) => c.value = !c.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              r("div", mv, [
                q(l(Vo), { class: "vuefinder__treeview__pin-icon" }),
                r("div", pv, w(l(n)("Pinned Folders")), 1)
              ]),
              q(fv, {
                modelValue: c.value,
                "onUpdate:modelValue": p[1] || (p[1] = (u) => c.value = u)
              }, null, 8, ["modelValue"])
            ]),
            c.value ? (_(), h("ul", hv, [
              (_(!0), h(ke, null, Ce(l(e).pinnedFolders, (u) => (_(), h("li", gv, [
                r("div", {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (v) => l(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: u.storage, path: u.path } })
                }, [
                  l(e).fs.path !== u.path ? (_(), z(l(gn), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : I("", !0),
                  l(e).fs.path === u.path ? (_(), z(l(Mo), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : I("", !0),
                  r("div", {
                    title: u.path,
                    class: ge(["vuefinder__treeview__folder-name text-nowrap", {
                      "vuefinder__treeview__folder-name--active": l(e).fs.path === u.path
                    }])
                  }, w(u.basename), 11, wv)
                ], 8, bv),
                r("div", {
                  class: "vuefinder__treeview__remove-favorite",
                  onClick: (v) => d(u)
                }, [
                  q(l(Xu), { class: "vuefinder__treeview__remove-icon" })
                ], 8, yv)
              ]))), 256)),
              l(e).pinnedFolders.length ? I("", !0) : (_(), h("li", kv, [
                r("div", Sv, w(l(n)("No folders pinned")), 1)
              ]))
            ])) : I("", !0)
          ]),
          (_(!0), h(ke, null, Ce(l(e).fs.data.storages, (u) => (_(), h("div", xv, [
            q(dv, { storage: u }, null, 8, ["storage"])
          ]))), 256))
        ], 512),
        r("div", {
          onMousedown: i,
          class: ge([(l(e).showTreeView, ""), "vuefinder__treeview__resize-handle"])
        }, null, 34)
      ], 4)
    ], 64));
  }
}, Cv = { class: "vuefinder__main__content" }, Ev = {
  __name: "VueFinder",
  props: {
    id: {
      type: String,
      default: "vf"
    },
    request: {
      type: [String, Object],
      required: !0
    },
    persist: {
      type: Boolean,
      default: !1
    },
    path: {
      type: String,
      default: ""
    },
    features: {
      type: [Array, Boolean],
      default: !0
    },
    debug: {
      type: Boolean,
      default: !1
    },
    theme: {
      type: String,
      default: "system"
    },
    locale: {
      type: String,
      default: null
    },
    maxHeight: {
      type: String,
      default: "600px"
    },
    minHeight: {
      type: String,
      default: "300px"
    },
    maxFileSize: {
      type: String,
      default: "10mb"
    },
    fullScreen: {
      type: Boolean,
      default: !1
    },
    showTreeView: {
      type: Boolean,
      default: !1
    },
    pinnedFolders: {
      type: Array,
      default: []
    },
    showThumbnails: {
      type: Boolean,
      default: !0
    },
    simple: {
      type: Boolean,
      default: !0
    },
    selectButton: {
      type: Object,
      default(t) {
        return {
          active: !1,
          multiple: !1,
          click: (e) => {
          },
          ...t
        };
      }
    }
  },
  emits: ["select"],
  setup(t, { expose: e, emit: n }) {
    const o = n, s = t, a = il(s, le("VueFinderOptions"));
    jo("ServiceContainer", a);
    const { setStore: c } = a.storage, d = O(null);
    a.root = d;
    const i = a.dragSelect;
    qa(a);
    const f = (u) => {
      u.files = u.files.map((v) => (v.onlyRead = a.onlyReadFileStore.hasItem(v.path), v)), Object.assign(a.fs.data, u), i.clearSelection(), i.refreshSelection();
    };
    let m;
    a.emitter.on("vf-fetch-abort", () => {
      m.abort(), a.fs.loading = !1;
    }), a.emitter.on("vf-fetch", ({ params: u, body: v = null, onSuccess: g = null, onError: y = null, noCloseModal: L = !1 }) => {
      ["index", "search"].includes(u.q) && (m && m.abort(), a.fs.loading = !0), m = new AbortController();
      const M = m.signal;
      a.requester.send({
        url: "",
        method: u.m || "get",
        params: u,
        body: v,
        abortSignal: M
      }).then((S) => {
        a.fs.adapter = S.adapter, a.persist && (a.fs.path = S.dirname, c("path", a.fs.path)), ["index", "search"].includes(u.q) && (a.fs.loading = !1), L || a.modal.close(), f(S), g && g(S);
      }).catch((S) => {
        console.error(S), y && y(S);
      });
    });
    const p = () => {
      s.minHeight == "0" || !d.value || (d.value.querySelectorAll(".vuefinder__main__container")[0].style.height = s.minHeight);
    };
    return Ee(() => {
      let u = {};
      a.fs.path.includes("://") && (u = {
        adapter: a.fs.path.split("://")[0],
        path: a.fs.path
      }), a.emitter.emit("vf-fetch", { params: { q: "index", adapter: a.fs.adapter, ...u } }), i.onSelect((v) => {
        o("select", v);
      }), p();
    }), e({
      app: a
    }), (u, v) => (_(), h("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: d,
      tabindex: "0"
    }, [
      r("div", {
        class: ge(l(a).theme.actualValue)
      }, [
        r("div", {
          class: ge([l(a).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          style: rn(l(a).fullScreen ? "" : "max-height: " + t.maxHeight),
          onMousedown: v[0] || (v[0] = (g) => l(a).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: v[1] || (v[1] = (g) => l(a).emitter.emit("vf-contextmenu-hide"))
        }, [
          t.simple ? I("", !0) : (_(), h(ke, { key: 0 }, [
            q(Yi),
            q(Qc)
          ], 64)),
          r("div", Cv, [
            q($v),
            q($u)
          ]),
          t.simple ? I("", !0) : (_(), z(Gu, { key: 1 }))
        ], 38),
        q(Wo, { name: "fade" }, {
          default: X(() => [
            l(a).modal.visible ? (_(), z(Vs(l(a).modal.type), { key: 0 })) : I("", !0)
          ]),
          _: 1
        }),
        q(Tu)
      ], 2)
    ], 512));
  }
}, Iv = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [n] = Object.keys(e.i18n);
    e.locale = e.locale ?? n ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", Ev);
  }
};
export {
  Iv as default
};
