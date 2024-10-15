var Ro = Object.defineProperty;
var Fo = (t, e, n) => e in t ? Ro(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var os = (t, e, n) => Fo(t, typeof e != "symbol" ? e + "" : e, n);
import { reactive as vt, watch as Oe, ref as M, shallowRef as Bo, onMounted as Ee, onUnmounted as Gn, onUpdated as Ts, nextTick as ct, computed as Xe, inject as le, openBlock as f, createElementBlock as g, withKeys as Tt, unref as l, createElementVNode as r, withModifiers as Ot, renderSlot as Rt, normalizeClass as ye, toDisplayString as w, createBlock as U, resolveDynamicComponent as Ds, withCtx as X, createVNode as j, Fragment as Se, renderList as Ce, createCommentVNode as H, withDirectives as ue, vModelCheckbox as zt, createTextVNode as Y, vModelSelect as Tn, vModelText as Dt, onBeforeUnmount as Ho, customRef as Io, vShow as ze, isRef as No, TransitionGroup as Uo, normalizeStyle as rn, mergeModels as Po, useModel as Vs, resolveComponent as qo, provide as zo, Transition as Go } from "vue";
import jo from "mitt";
import Ko from "dragselect";
import Tv from "@uppy/core";
import Vv from "@uppy/xhr-upload";
import Wo from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import Yo from "cropperjs";
var As;
const yn = (As = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : As.getAttribute("content");
class Xo {
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
    let v;
    i !== "get" && (c instanceof FormData ? (v = c, n.body != null && Object.entries(this.config.body).forEach(([m, u]) => {
      v.append(m, u);
    })) : (v = { ...c }, n.body != null && Object.assign(v, this.config.body)));
    const _ = {
      url: d,
      method: i,
      headers: s,
      params: a,
      body: v
    };
    if (n.transformRequest != null) {
      const m = n.transformRequest({
        url: d,
        method: i,
        headers: s,
        params: a,
        body: v
      });
      m.url != null && (_.url = m.url), m.method != null && (_.method = m.method), m.params != null && (_.params = m.params ?? {}), m.headers != null && (_.headers = m.headers ?? {}), m.body != null && (_.body = m.body);
    }
    return _;
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
function Jo(t) {
  const e = {
    baseUrl: "",
    headers: {},
    params: {},
    body: {},
    xsrfHeaderName: "X-CSRF-Token"
  };
  return typeof t == "string" ? Object.assign(e, { baseUrl: t }) : Object.assign(e, t), new Xo(e);
}
function Qo(t) {
  let e = localStorage.getItem(t + "_storage");
  const n = vt(JSON.parse(e ?? "{}"));
  Oe(n, o);
  function o() {
    Object.keys(n).length ? localStorage.setItem(t + "_storage", JSON.stringify(n)) : localStorage.removeItem(t + "_storage");
  }
  function s(i, v) {
    n[i] = v;
  }
  function a(i) {
    delete n[i];
  }
  function c() {
    Object.keys(n).map((i) => a(i));
  }
  return { getStore: (i, v = null) => n.hasOwnProperty(i) ? n[i] : v, setStore: s, removeStore: a, clearStore: c };
}
async function Zo(t, e) {
  const n = e[t];
  return typeof n == "function" ? (await n()).default : n;
}
function er(t, e, n, o) {
  const { getStore: s, setStore: a } = t, c = M({}), d = M(s("locale", e)), i = (m, u = e) => {
    Zo(m, o).then((p) => {
      c.value = p, a("locale", m), d.value = m, a("translations", p), Object.values(o).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + m }), n.emit("vf-language-saved"));
    }).catch((p) => {
      u ? (n.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), i(u, null)) : n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  Oe(d, (m) => {
    i(m);
  }), !s("locale") && !o.length ? i(e) : c.value = s("translations");
  const v = (m, ...u) => u.length ? v(m = m.replace("%s", u.shift()), ...u) : m;
  function _(m, ...u) {
    return c.value && c.value.hasOwnProperty(m) ? v(c.value[m], ...u) : v(m, ...u);
  }
  return vt({ t: _, locale: d });
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
}, tr = Object.values(de), nr = "2.5.16";
function Ls(t, e, n, o, s) {
  return (e = Math, n = e.log, o = 1024, s = n(t) / n(o) | 0, t / e.pow(o, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "iB" : "B");
}
function Ms(t, e, n, o, s) {
  return (e = Math, n = e.log, o = 1e3, s = n(t) / n(o) | 0, t / e.pow(o, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "B" : "B");
}
const tt = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function sr(t, e) {
  const n = M(tt.SYSTEM), o = M(tt.LIGHT);
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
function or() {
  const t = Bo(null), e = M(!1), n = M();
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
  const d = (_, m) => {
    const u = a, p = _, h = m || (o ? !o(u, p) : u !== p);
    return (h || s) && (a = p, c = u), [a, h, c];
  };
  return [e ? (_) => d(e(a, c), _) : d, (_) => [a, !!_, c]];
}, Os = typeof window < "u" && typeof document < "u", De = Os ? window : {}, Wt = Math.max, rr = Math.min, Dn = Math.round, Rs = De.cancelAnimationFrame, Fs = De.requestAnimationFrame, Jt = De.setTimeout, Vn = De.clearTimeout, ln = (t) => typeof De[t] < "u" ? De[t] : void 0, lr = ln("MutationObserver"), rs = ln("IntersectionObserver"), Qt = ln("ResizeObserver"), Ln = ln("ScrollTimeline"), Bs = Os && Node.ELEMENT_NODE, { toString: ar, hasOwnProperty: kn } = Object.prototype, ir = /^\[object (.+)\]$/, Ht = (t) => t === void 0, an = (t) => t === null, cr = (t) => Ht(t) || an(t) ? `${t}` : ar.call(t).replace(ir, "$1").toLowerCase(), Ge = (t) => typeof t == "number", cn = (t) => typeof t == "string", Hs = (t) => typeof t == "boolean", je = (t) => typeof t == "function", Ue = (t) => Array.isArray(t), Ft = (t) => typeof t == "object" && !Ue(t) && !an(t), dn = (t) => {
  const e = !!t && t.length, n = Ge(e) && e > -1 && e % 1 == 0;
  return Ue(t) || !je(t) && n ? e > 0 && Ft(t) ? e - 1 in t : !0 : !1;
}, Zt = (t) => {
  if (!t || !Ft(t) || cr(t) !== "object")
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
  return t ? e ? t instanceof e : t.nodeType === Bs : !1;
}, un = (t) => {
  const e = Element;
  return t ? e ? t instanceof e : t.nodeType === Bs : !1;
};
function se(t, e) {
  if (dn(t))
    for (let n = 0; n < t.length && e(t[n], n, t) !== !1; n++)
      ;
  else t && se(Object.keys(t), (n) => e(t[n], n, t));
  return t;
}
const vn = (t, e) => t.indexOf(e) >= 0, Ye = (t, e) => t.concat(e), _e = (t, e, n) => (!cn(e) && dn(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), ft = (t) => Array.from(t || []), Is = (t) => Ue(t) ? t : [t], Mn = (t) => !!t && !t.length, ls = (t) => ft(new Set(t)), Re = (t, e, n) => {
  se(t, (s) => s && s.apply(void 0, e || [])), !n && (t.length = 0);
}, Ns = "paddingTop", Us = "paddingRight", Ps = "paddingLeft", qs = "paddingBottom", zs = "marginLeft", Gs = "marginRight", js = "marginBottom", fn = "overflowX", _n = "overflowY", St = "width", xt = "height", $t = "hidden", Ks = "visible", jn = (t, e, n, o) => {
  if (t && e) {
    let s = !0;
    return se(n, (a) => {
      const c = t[a], d = e[a];
      c !== d && (s = !1);
    }), s;
  }
  return !1;
}, Ws = (t, e) => jn(t, e, ["w", "h"]), Ys = (t, e) => jn(t, e, ["x", "y"]), dr = (t, e) => jn(t, e, ["t", "r", "b", "l"]), Ne = () => {
}, W = (t, ...e) => t.bind(0, ...e), gt = (t) => {
  let e;
  const n = t ? Jt : Fs, o = t ? Vn : Rs;
  return [(s) => {
    o(e), e = n(s, je(t) ? t() : t);
  }, () => o(e)];
}, Xs = (t, e) => {
  let n, o, s, a = Ne;
  const { v: c, p: d, S: i } = e || {}, v = function(h) {
    a(), Vn(n), n = o = void 0, a = Ne, t.apply(this, h);
  }, _ = (p) => i && o ? i(o, p) : p, m = () => {
    a !== Ne && v(_(s) || s);
  }, u = function() {
    const h = ft(arguments), y = je(c) ? c() : c;
    if (Ge(y) && y >= 0) {
      const O = je(d) ? d() : d, S = Ge(O) && O >= 0, b = y > 0 ? Jt : Fs, C = y > 0 ? Vn : Rs, I = _(h) || h, x = v.bind(0, I);
      a();
      const k = b(x, y);
      a = () => C(k), S && !n && (n = Jt(m, O)), o = s = I;
    } else
      v(h);
  };
  return u.m = m, u;
}, Js = (t, e) => Object.prototype.hasOwnProperty.call(t, e), st = (t) => t ? Object.keys(t) : [], ne = (t, e, n, o, s, a, c) => {
  const d = [e, n, o, s, a, c];
  return (typeof t != "object" || an(t)) && !je(t) && (t = {}), se(d, (i) => {
    se(i, (v, _) => {
      const m = i[_];
      if (t === m)
        return !0;
      const u = Ue(m);
      if (m && Zt(m)) {
        const p = t[_];
        let h = p;
        u && !Ue(p) ? h = [] : !u && !Zt(p) && (h = {}), t[_] = ne(h, m);
      } else
        t[_] = u ? m.slice() : m;
    });
  }), t;
}, Qs = (t, e) => se(ne({}, t), (n, o, s) => {
  n === void 0 ? delete s[o] : n && Zt(n) && (s[o] = Qs(n));
}), Kn = (t) => {
  for (const e in t)
    return !1;
  return !0;
}, On = (t, e, n) => Wt(t, rr(e, n)), dt = (t) => ft(new Set((Ue(t) ? t : (t || "").split(" ")).filter((e) => e))), mn = (t, e) => t && t.getAttribute(e), as = (t, e) => t && t.hasAttribute(e), He = (t, e, n) => {
  se(dt(e), (o) => {
    t && t.setAttribute(o, n || "");
  });
}, qe = (t, e) => {
  se(dt(e), (n) => t && t.removeAttribute(n));
}, pn = (t, e) => {
  const n = dt(mn(t, e)), o = W(He, t, e), s = (a, c) => {
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
}, Bt = (t, e, n) => (pn(t, e).O(n), W(Zs, t, e, n)), Yt = (t, e, n, o) => {
  (o ? Bt : Zs)(t, e, n);
}, ur = (t, e, n) => pn(t, e).C(n), eo = (t) => pn(t, "class"), Wn = (t, e) => {
  eo(t).$(e);
}, tn = (t, e) => (eo(t).O(e), W(Wn, t, e)), to = (t, e) => {
  const n = [], o = e ? un(e) && e : document;
  return o ? _e(n, o.querySelectorAll(t)) : n;
}, vr = (t, e) => {
  const n = e ? un(e) && e : document;
  return n ? n.querySelector(t) : null;
}, nn = (t, e) => un(t) ? t.matches(e) : !1, no = (t) => nn(t, "body"), Rn = (t) => t ? ft(t.childNodes) : [], Ct = (t) => t && t.parentElement, bt = (t, e) => un(t) && t.closest(e), Fn = (t) => document.activeElement, fr = (t, e, n) => {
  const o = bt(t, e), s = t && vr(n, o), a = bt(s, e) === o;
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
}, Te = (t, e) => so(t, null, e), is = (t, e) => so(Ct(t), t && t.nextSibling, e), wt = (t) => {
  const e = document.createElement("div");
  return He(e, "class", t), e;
}, oo = (t) => {
  const e = wt();
  return e.innerHTML = t.trim(), se(Rn(e), (n) => ot(n));
}, _r = /^--/, cs = (t, e) => t.getPropertyValue(e) || t[e] || "", Yn = (t) => {
  const e = t || 0;
  return isFinite(e) ? e : 0;
}, Gt = (t) => Yn(parseFloat(t || "")), ds = (t) => `${(Yn(t) * 100).toFixed(3)}%`, Bn = (t) => `${Yn(t)}px`;
function Et(t, e) {
  t && se(e, (n, o) => {
    try {
      const s = t.style, a = Ge(n) ? Bn(n) : (n || "") + "";
      _r.test(o) ? s.setProperty(o, a) : s[o] = a;
    } catch {
    }
  });
}
function ut(t, e, n) {
  const o = cn(e);
  let s = o ? "" : {};
  if (t) {
    const a = De.getComputedStyle(t, n) || t.style;
    s = o ? cs(a, e) : e.reduce((c, d) => (c[d] = cs(a, d), c), s);
  }
  return s;
}
const nt = (t) => ut(t, "direction") === "rtl", us = (t, e, n) => {
  const o = e ? `${e}-` : "", s = n ? `-${n}` : "", a = `${o}top${s}`, c = `${o}right${s}`, d = `${o}bottom${s}`, i = `${o}left${s}`, v = ut(t, [a, c, d, i]);
  return {
    t: Gt(v[a]),
    r: Gt(v[c]),
    b: Gt(v[d]),
    l: Gt(v[i])
  };
}, Sn = (t, e) => `translate${Ft(t) ? `(${t.x},${t.y})` : `${e ? "X" : "Y"}(${t})`}`, mr = {
  w: 0,
  h: 0
}, hn = (t, e) => e ? {
  w: e[`${t}Width`],
  h: e[`${t}Height`]
} : mr, pr = (t) => hn("inner", t || De), Mt = W(hn, "offset"), ro = W(hn, "client"), Hn = W(hn, "scroll"), Xn = (t) => {
  const e = parseFloat(ut(t, St)) || 0, n = parseFloat(ut(t, xt)) || 0;
  return {
    w: e - Dn(e),
    h: n - Dn(n)
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
  return W(Re, dt(e).map((v) => {
    const _ = d ? (m) => {
      vs(t, v, _, c), n(m);
    } : n;
    return t.addEventListener(v, _, i), W(vs, t, v, _, c);
  }));
}, Jn = (t) => t.stopPropagation(), fs = (t) => t.preventDefault(), hr = {
  x: 0,
  y: 0
}, xn = (t) => {
  const e = t && yt(t);
  return e ? {
    x: e.left + De.scrollX,
    y: e.top + De.scrollY
  } : hr;
}, sn = (t, e, n) => n ? n.n ? -t + 0 : n.i ? e - t : t : t, _s = (t, e) => [sn(0, t, e), sn(t, t, e)], ms = (t, e, n) => On(0, 1, sn(t, e, n) / e || 0), rt = (t, e) => {
  const { x: n, y: o } = Ge(e) ? {
    x: e,
    y: e
  } : e || {};
  Ge(n) && (t.scrollLeft = n), Ge(o) && (t.scrollTop = o);
}, At = (t) => ({
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
      const v = e.get(a) || /* @__PURE__ */ new Set();
      return e.set(a, v), ps((_) => {
        je(_) && v.add(_);
      }, c), W(n, a, c);
    }
    Hs(c) && c && n();
    const d = st(a), i = [];
    return se(d, (v) => {
      const _ = a[v];
      _ && _e(i, o(v, _));
    }), W(Re, i);
  }, s = (a, c) => {
    se(ft(e.get(a)), (d) => {
      c && !Mn(c) ? d.apply(0, c) : d();
    });
  };
  return o(t || {}), [o, n, s];
}, hs = (t) => JSON.stringify(t, (e, n) => {
  if (je(n))
    throw 0;
  return n;
}), gs = (t, e) => t ? `${e}`.split(".").reduce((n, o) => n && Js(n, o) ? n[o] : void 0, t) : void 0, gr = {
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
    if (Ft(a) && Ft(c))
      ne(n[s] = {}, ao(a, c)), Kn(n[s]) && delete n[s];
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
}, bs = (t, e, n) => (o) => [gs(t, o), n || gs(e, o) !== void 0], It = "data-overlayscrollbars", Xt = "os-environment", jt = `${Xt}-scrollbar-hidden`, $n = `${It}-initialize`, Ae = It, io = `${Ae}-overflow-x`, co = `${Ae}-overflow-y`, uo = "overflowVisible", br = "scrollbarPressed", Un = "updating", wr = "body", We = `${It}-viewport`, yr = "arrange", vo = "scrollbarHidden", kt = uo, Pn = `${It}-padding`, kr = kt, ws = `${It}-content`, Qn = "os-size-observer", Sr = `${Qn}-appear`, xr = `${Qn}-listener`, $r = "os-trinsic-observer", Cr = "os-theme-none", Ve = "os-scrollbar", Er = `${Ve}-rtl`, Ar = `${Ve}-horizontal`, Tr = `${Ve}-vertical`, fo = `${Ve}-track`, Zn = `${Ve}-handle`, Dr = `${Ve}-visible`, Vr = `${Ve}-cornerless`, ys = `${Ve}-interaction`, ks = `${Ve}-unusable`, qn = `${Ve}-auto-hide`, Ss = `${qn}-hidden`, xs = `${Ve}-wheel`, Lr = `${fo}-interactive`, Mr = `${Zn}-interactive`, _o = {}, mo = {}, Or = (t) => {
  se(t, (e) => se(e, (n, o) => {
    _o[o] = e[o];
  }));
}, po = (t, e, n) => st(t).map((o) => {
  const { static: s, instance: a } = t[o], [c, d, i] = n || [], v = n ? a : s;
  if (v) {
    const _ = n ? v(c, d, e) : v(e);
    return (i || mo)[o] = _;
  }
}), Vt = (t) => mo[t], Rr = "__osOptionsValidationPlugin", Fr = "__osSizeObserverPlugin", Br = (t, e) => {
  const { T: n } = e, [o, s] = t("showNativeOverlaidScrollbars");
  return [o && n.x && n.y, s];
}, on = (t) => t.indexOf(Ks) === 0, ho = (t, e) => {
  const { D: n } = t, o = (i) => {
    const v = ut(n, i), m = (e ? e[i] : v) === "scroll";
    return [v, m];
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
}, Hr = (t, e, n, o) => {
  const s = e.x || e.y, a = (_, m) => {
    const u = on(_), p = u && s ? "hidden" : "", h = m && u && _.replace(`${Ks}-`, "") || p;
    return [m && !u ? _ : "", on(h) ? "hidden" : h];
  }, [c, d] = a(n.x, e.x), [i, v] = a(n.y, e.y);
  return o[fn] = d && i ? d : c, o[_n] = v && c ? v : i, ho(t, o);
}, es = "__osScrollbarsHidingPlugin", Ir = "__osClickScrollPlugin";
let Cn;
const Nr = () => {
  const t = (b, C, B) => {
    Te(document.body, b), Te(document.body, b);
    const I = ro(b), x = Mt(b), k = Xn(C);
    return B && ot(b), {
      x: x.h - I.h + k.h,
      y: x.w - I.w + k.w
    };
  }, e = (b) => {
    let C = !1;
    const B = tn(b, jt);
    try {
      C = ut(b, "scrollbar-width") === "none" || ut(b, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return B(), C;
  }, n = (b, C) => {
    Et(b, {
      [fn]: $t,
      [_n]: $t,
      direction: "rtl"
    }), rt(b, {
      x: 0
    });
    const B = xn(b), I = xn(C);
    rt(b, {
      x: -999
    });
    const x = xn(C);
    return {
      i: B.x === I.x,
      n: I.x !== x.x
    };
  }, o = `.${Xt}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Xt} div{width:200%;height:200%;margin:10px 0}.${jt}{scrollbar-width:none!important}.${jt}::-webkit-scrollbar,.${jt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, a = oo(`<div class="${Xt}"><div></div><style>${o}</style></div>`)[0], c = a.firstChild, [d, , i] = Nn(), [v, _] = Ie({
    o: t(a, c),
    u: Ys
  }, W(t, a, c, !0)), [m] = _(), u = e(a), p = {
    x: m.x === 0,
    y: m.y === 0
  }, h = {
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
  }, y = ne({}, gr), $ = W(ne, {}, y), O = W(ne, {}, h), S = {
    P: m,
    T: p,
    L: u,
    J: !!Ln,
    K: n(a, c),
    Z: W(d, "r"),
    G: O,
    tt: (b) => ne(h, b) && O(),
    nt: $,
    ot: (b) => ne(y, b) && $(),
    st: ne({}, h),
    et: ne({}, y)
  };
  return qe(a, "style"), ot(a), De.addEventListener("resize", () => {
    let b;
    if (!u && (!p.x || !p.y)) {
      const C = Vt(es);
      b = !!(C ? C.Y() : Ne)(S, v);
    }
    i("r", [b]);
  }), S;
}, Fe = () => (Cn || (Cn = Nr()), Cn), go = (t, e) => je(e) ? e.apply(0, t) : e, Ur = (t, e, n, o) => {
  const s = Ht(o) ? n : o;
  return go(t, s) || e.apply(0, t);
}, bo = (t, e, n, o) => {
  const s = Ht(o) ? n : o, a = go(t, s);
  return !!a && (en(a) ? a : e.apply(0, t));
}, Pr = (t, e) => {
  const { nativeScrollbarsOverlaid: n, body: o } = e || {}, { T: s, L: a, G: c } = Fe(), { nativeScrollbarsOverlaid: d, body: i } = c().cancel, v = n ?? d, _ = Ht(o) ? i : o, m = (s.x || s.y) && v, u = t && (an(_) ? !a : _);
  return !!m || !!u;
}, ts = /* @__PURE__ */ new WeakMap(), qr = (t, e) => {
  ts.set(t, e);
}, zr = (t) => {
  ts.delete(t);
}, wo = (t) => ts.get(t), Gr = (t, e, n) => {
  let o = !1;
  const s = n ? /* @__PURE__ */ new WeakMap() : !1, a = () => {
    o = !0;
  }, c = (d) => {
    if (s && n) {
      const i = n.map((v) => {
        const [_, m] = v || [];
        return [m && _ ? (d || to)(_, t) : [], m];
      });
      se(i, (v) => se(v[0], (_) => {
        const m = v[1], u = s.get(_) || [];
        if (t.contains(_) && m) {
          const h = fe(_, m, (y) => {
            o ? (h(), s.delete(_)) : e(y);
          });
          s.set(_, _e(u, h));
        } else
          Re(u), s.delete(_);
      }));
    }
  };
  return c(), [a, c];
}, $s = (t, e, n, o) => {
  let s = !1;
  const { ct: a, rt: c, lt: d, it: i, ut: v, dt: _ } = o || {}, m = Xs(() => s && n(!0), {
    v: 33,
    p: 99
  }), [u, p] = Gr(t, m, d), h = a || [], y = c || [], $ = Ye(h, y), O = (b, C) => {
    if (!Mn(C)) {
      const B = v || Ne, I = _ || Ne, x = [], k = [];
      let D = !1, L = !1;
      if (se(C, (E) => {
        const { attributeName: P, target: F, type: K, oldValue: Q, addedNodes: oe, removedNodes: G } = E, Z = K === "attributes", ve = K === "childList", z = t === F, ie = Z && P, ae = ie && mn(F, P || "") || null, ce = ie && Q !== ae, ke = vn(y, P) && ce;
        if (e && (ve || !z)) {
          const ge = Z && ce, me = ge && i && nn(F, i), V = (me ? !B(F, P, Q, ae) : !Z || ge) && !I(E, !!me, t, o);
          se(oe, (T) => _e(x, T)), se(G, (T) => _e(x, T)), L = L || V;
        }
        !e && z && ce && !B(F, P, Q, ae) && (_e(k, P), D = D || ke);
      }), p((E) => ls(x).reduce((P, F) => (_e(P, to(E, F)), nn(F, E) ? _e(P, F) : P), [])), e)
        return !b && L && n(!1), [!1];
      if (!Mn(k) || D) {
        const E = [ls(k), D];
        return !b && n.apply(0, E), E;
      }
    }
  }, S = new lr(W(O, !1));
  return [() => (S.observe(t, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: $,
    subtree: e,
    childList: e,
    characterData: e
  }), s = !0, () => {
    s && (u(), S.disconnect(), s = !1);
  }), () => {
    if (s)
      return m.m(), O(!0, S.takeRecords());
  }];
}, yo = (t, e, n) => {
  const { ft: s, _t: a } = n || {}, c = Vt(Fr), { K: d } = Fe(), i = W(nt, t), [v] = Ie({
    o: !1,
    _: !0
  });
  return () => {
    const _ = [], u = oo(`<div class="${Qn}"><div class="${xr}"></div></div>`)[0], p = u.firstChild, h = (y) => {
      const $ = y instanceof ResizeObserverEntry, O = !$ && Ue(y);
      let S = !1, b = !1, C = !0;
      if ($) {
        const [B, , I] = v(y.contentRect), x = In(B), k = lo(B, I);
        b = !I || k, S = !b && !x, C = !S;
      } else O ? [, C] = y : b = y === !0;
      if (s && C) {
        const B = O ? y[0] : nt(u);
        rt(u, {
          x: sn(3333333, 3333333, B && d),
          y: 3333333
        });
      }
      S || e({
        vt: O ? y : void 0,
        ht: !O,
        _t: b
      });
    };
    if (Qt) {
      const y = new Qt(($) => h($.pop()));
      y.observe(p), _e(_, () => {
        y.disconnect();
      });
    } else if (c) {
      const [y, $] = c(p, h, a);
      _e(_, Ye([tn(u, Sr), fe(u, "animationstart", y)], $));
    } else
      return Ne;
    if (s) {
      const [y] = Ie({
        o: void 0
      }, i);
      _e(_, fe(u, "scroll", ($) => {
        const O = y(), [S, b, C] = O;
        b && (Wn(p, "ltr rtl"), tn(p, S ? "rtl" : "ltr"), h([!!S, b, C])), Jn($);
      }));
    }
    return W(Re, _e(_, Te(t, u)));
  };
}, jr = (t, e) => {
  let n;
  const o = (i) => i.h === 0 || i.isIntersecting || i.intersectionRatio > 0, s = wt($r), [a] = Ie({
    o: !1
  }), c = (i, v) => {
    if (i) {
      const _ = a(o(i)), [, m] = _;
      return m && !v && e(_) && [_];
    }
  }, d = (i, v) => c(v.pop(), i);
  return [() => {
    const i = [];
    if (rs)
      n = new rs(W(d, !1), {
        root: t
      }), n.observe(s), _e(i, () => {
        n.disconnect();
      });
    else {
      const v = () => {
        const _ = Mt(s);
        c(_);
      };
      _e(i, yo(s, v)()), v();
    }
    return W(Re, _e(i, Te(t, s)));
  }, () => n && d(!0, n.takeRecords())];
}, Kr = (t, e, n, o) => {
  let s, a, c, d, i, v;
  const { L: _ } = Fe(), m = `[${Ae}]`, u = `[${We}]`, p = ["tabindex"], h = ["wrap", "cols", "rows"], y = ["id", "class", "style", "open"], { gt: $, bt: O, D: S, wt: b, yt: C, V: B, St: I, $t: x } = t, k = {
    Ot: !1,
    N: nt($)
  }, D = Fe(), L = Vt(es), [E] = Ie({
    u: Ws,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const A = L && L.M(t, e, k, D, n).W, V = I(kt), T = !B && I(yr), R = T && At(S);
    x(kt), B && x(Un, !0);
    const N = T && A && A()[0], q = Hn(b), ee = Hn(S), te = Xn(S);
    return x(kt, V), B && x(Un), N && N(), rt(S, R), {
      w: ee.w + q.w + te.w,
      h: ee.h + q.h + te.h
    };
  }), P = C ? h : Ye(y, h), F = Xs(o, {
    v: () => s,
    p: () => a,
    S(A, V) {
      const [T] = A, [R] = V;
      return [Ye(st(T), st(R)).reduce((N, q) => (N[q] = T[q] || R[q], N), {})];
    }
  }), K = (A) => {
    if (B) {
      const V = nt($);
      ne(A, {
        Ct: v !== V
      }), ne(k, {
        N: V
      }), v = V;
    }
  }, Q = (A) => {
    se(A || p, (V) => {
      if (vn(p, V)) {
        const T = mn(O, V);
        cn(T) ? He(S, V, T) : qe(S, V);
      }
    });
  }, oe = (A, V) => {
    const [T, R] = A, N = {
      xt: R
    };
    return ne(k, {
      Ot: T
    }), !V && o(N), N;
  }, G = ({ ht: A, vt: V, _t: T }) => {
    const N = !(A && !T && !V) && _ ? F : o, [q, ee] = V || [], te = {
      ht: A || T,
      _t: T,
      Ct: ee
    };
    K(te), V && ne(k, {
      N: q
    }), N(te);
  }, Z = (A, V) => {
    const [, T] = E(), R = {
      Ht: T
    };
    return K(R), T && !V && (A ? o : F)(R), R;
  }, ve = (A, V, T) => {
    const R = {
      zt: V
    };
    return K(R), V && !T ? F(R) : B || Q(A), R;
  }, { Z: z } = D, [ie, ae] = b ? jr(O, oe) : [], ce = !B && yo(O, G, {
    _t: !0,
    ft: !0
  }), [ke, ge] = $s(O, !1, ve, {
    rt: y,
    ct: Ye(y, p)
  }), me = B && Qt && new Qt((A) => {
    const V = A[A.length - 1].contentRect;
    G({
      ht: !0,
      _t: lo(V, i)
    }), i = V;
  });
  return [() => {
    Q(), me && me.observe(O);
    const A = ce && ce(), V = ie && ie(), T = ke(), R = z((N) => {
      const [, q] = E();
      F({
        It: N,
        Ht: q
      });
    });
    return () => {
      me && me.disconnect(), A && A(), V && V(), d && d(), T(), R();
    };
  }, ({ Et: A, At: V, Tt: T }) => {
    const R = {}, [N] = A("update.ignoreMutation"), [q, ee] = A("update.attributes"), [te, pe] = A("update.elementEvents"), [be, J] = A("update.debounce"), we = pe || ee, xe = V || T, Be = (re) => je(N) && N(re);
    if (we) {
      c && c(), d && d();
      const [re, $e] = $s(b || S, !0, Z, {
        ct: Ye(P, q || []),
        lt: te,
        it: m,
        dt: (Le, he) => {
          const { target: Me, attributeName: Nt } = Le;
          return (!he && Nt && !B ? fr(Me, m, u) : !1) || !!bt(Me, `.${Ve}`) || !!Be(Le);
        }
      });
      d = re(), c = $e;
    }
    if (J)
      if (F.m(), Ue(be)) {
        const re = be[0], $e = be[1];
        s = Ge(re) && re, a = Ge($e) && $e;
      } else Ge(be) ? (s = be, a = !1) : (s = !1, a = !1);
    if (xe) {
      const re = ge(), $e = ae && ae(), Le = c && c();
      re && ne(R, ve(re[0], re[1], xe)), $e && ne(R, oe($e[0], xe)), Le && ne(R, Z(Le[0], xe));
    }
    return K(R), R;
  }, k];
}, Wr = (t, e, n, o) => {
  const { G: s, K: a } = Fe(), { scrollbars: c } = s(), { slot: d } = c, { gt: i, bt: v, D: _, Dt: m, kt: u, Rt: p, V: h } = e, { scrollbars: y } = m ? {} : t, { slot: $ } = y || {}, O = /* @__PURE__ */ new Map(), S = (A) => Ln && new Ln({
    source: u,
    axis: A
  }), b = S("x"), C = S("y"), B = bo([i, v, _], () => h && p ? i : v, d, $), I = (A, V) => {
    if (V) {
      const te = A ? St : xt, { Mt: pe, Vt: be } = V, J = yt(be)[te], we = yt(pe)[te];
      return On(0, 1, J / we || 0);
    }
    const T = A ? "x" : "y", { Lt: R, Pt: N } = n, q = N[T], ee = R[T];
    return On(0, 1, q / (q + ee) || 0);
  }, x = (A, V, T, R) => {
    const N = I(T, A);
    return 1 / N * (1 - N) * (R ? 1 - V : V) || 0;
  }, k = (A, V) => ne(A, V ? {
    clear: ["left"]
  } : {}), D = (A) => {
    O.forEach((V, T) => {
      (A ? vn(Is(A), T) : !0) && (se(V || [], (N) => {
        N && N.cancel();
      }), O.delete(T));
    });
  }, L = (A, V, T, R) => {
    const N = O.get(A) || [], q = N.find((ee) => ee && ee.timeline === V);
    q ? q.effect = new KeyframeEffect(A, T, {
      composite: R
    }) : O.set(A, Ye(N, [A.animate(T, {
      timeline: V,
      composite: R
    })]));
  }, E = (A, V, T) => {
    const R = T ? tn : Wn;
    se(A, (N) => {
      R(N.Ut, V);
    });
  }, P = (A, V) => {
    se(A, (T) => {
      const [R, N] = V(T);
      Et(R, N);
    });
  }, F = (A, V) => {
    P(A, (T) => {
      const { Vt: R } = T;
      return [R, {
        [V ? St : xt]: ds(I(V))
      }];
    });
  }, K = (A, V) => {
    const { Lt: T } = n, R = V ? T.x : T.y, N = (q, ee, te) => Sn(ds(x(q, ms(ee, R, te), V, te)), V);
    if (b && C)
      se(A, (q) => {
        const { Ut: ee, Vt: te } = q, pe = V && nt(ee) && a;
        L(te, V ? b : C, k({
          transform: _s(R, pe).map((be) => N(q, be, pe))
        }, pe));
      });
    else {
      const q = At(u);
      P(A, (ee) => {
        const { Vt: te, Ut: pe } = ee;
        return [te, {
          transform: N(ee, V ? q.x : q.y, V && nt(pe) && a)
        }];
      });
    }
  }, Q = (A) => h && !p && Ct(A) === _, oe = [], G = [], Z = [], ve = (A, V, T) => {
    const R = Hs(T), N = R ? T : !0, q = R ? !T : !0;
    N && E(G, A, V), q && E(Z, A, V);
  }, z = () => {
    F(G, !0), F(Z);
  }, ie = () => {
    K(G, !0), K(Z);
  }, ae = () => {
    if (h) {
      const { Lt: A } = n, V = 0.5;
      if (b && C)
        se(Ye(Z, G), ({ Ut: T }) => {
          if (Q(T)) {
            const R = (N, q, ee) => {
              const te = ee && nt(T) && a;
              L(T, N, k({
                transform: _s(q - V, te).map((pe) => Sn(Bn(pe), ee))
              }, te), "add");
            };
            R(b, A.x, !0), R(C, A.y);
          } else
            D(T);
        });
      else {
        const T = At(u), R = (N) => {
          const { Ut: q } = N, ee = Q(q) && q, te = (pe, be, J) => {
            const we = ms(pe, be, J), xe = be * we;
            return Bn(J ? -xe : xe);
          };
          return [ee, {
            transform: ee ? Sn({
              x: te(T.x, A.x, nt(q) && a),
              y: te(T.y, A.y)
            }) : ""
          }];
        };
        P(G, R), P(Z, R);
      }
    }
  }, ce = (A) => {
    const T = wt(`${Ve} ${A ? Ar : Tr}`), R = wt(fo), N = wt(Zn), q = {
      Ut: T,
      Mt: R,
      Vt: N
    };
    return _e(A ? G : Z, q), _e(oe, [Te(T, R), Te(R, N), W(ot, T), D, o(q, ve, K, A)]), q;
  }, ke = W(ce, !0), ge = W(ce, !1), me = () => (Te(B, G[0].Ut), Te(B, Z[0].Ut), W(Re, oe));
  return ke(), ge(), [{
    Bt: z,
    Nt: ie,
    jt: ae,
    Ft: ve,
    qt: {
      J: b,
      Wt: G,
      Xt: ke,
      Yt: W(P, G)
    },
    Jt: {
      J: C,
      Wt: Z,
      Xt: ge,
      Yt: W(P, Z)
    }
  }, me];
}, Yr = (t, e, n, o) => {
  const { bt: s, D: a, V: c, kt: d, Kt: i } = e;
  return (v, _, m, u) => {
    const { Ut: p, Mt: h, Vt: y } = v, [$, O] = gt(333), [S, b] = gt(), C = W(m, [v], u), B = !!d.scrollBy, I = `client${u ? "X" : "Y"}`, x = u ? St : xt, k = u ? "left" : "top", D = u ? "w" : "h", L = u ? "x" : "y", E = (K) => K.propertyName.indexOf(x) > -1, P = () => {
      const K = "pointerup pointerleave pointercancel lostpointercapture", Q = (oe, G) => (Z) => {
        const { Lt: ve } = n, z = Mt(h)[D] - Mt(y)[D], ae = G * Z / z * ve[L];
        rt(d, {
          [L]: oe + ae
        });
      };
      return fe(h, "pointerdown", (oe) => {
        const G = bt(oe.target, `.${Zn}`) === y, Z = G ? y : h, ve = t.scrollbars, { button: z, isPrimary: ie, pointerType: ae } = oe, { pointers: ce } = ve;
        if (z === 0 && ie && ve[G ? "dragScroll" : "clickScroll"] && (ce || []).includes(ae)) {
          const ge = !G && oe.shiftKey, me = W(yt, y), A = W(yt, h), V = (re, $e) => (re || me())[k] - ($e || A())[k], T = Dn(yt(d)[x]) / Mt(d)[D] || 1, R = Q(At(d)[L] || 0, 1 / T), N = oe[I], q = me(), ee = A(), te = q[x], pe = V(q, ee) + te / 2, be = N - ee[k], J = G ? 0 : be - pe, we = (re) => {
            Re(Be), Z.releasePointerCapture(re.pointerId);
          }, Be = [Bt(s, Ae, br), fe(i, K, we), fe(i, "selectstart", (re) => fs(re), {
            H: !1
          }), fe(h, K, we), fe(h, "pointermove", (re) => {
            const $e = re[I] - N;
            (G || ge) && R(J + $e);
          })];
          if (Z.setPointerCapture(oe.pointerId), ge)
            R(J);
          else if (!G) {
            const re = Vt(Ir);
            re && _e(Be, re(R, V, J, te, be));
          }
        }
      });
    };
    let F = !0;
    return W(Re, [fe(y, "pointermove pointerleave", o), fe(p, "pointerenter", () => {
      _(ys, !0);
    }), fe(p, "pointerleave pointercancel", () => {
      _(ys, !1);
    }), !c && fe(p, "mousedown", () => {
      const K = Fn();
      (as(K, We) || as(K, Ae) || K === document.body) && Jt(() => {
        a.focus({
          preventScroll: !0
        });
      }, 25);
    }), fe(p, "wheel", (K) => {
      const { deltaX: Q, deltaY: oe, deltaMode: G } = K;
      B && F && G === 0 && Ct(p) === s && d.scrollBy({
        left: Q,
        top: oe,
        behavior: "smooth"
      }), F = !1, _(xs, !0), $(() => {
        F = !0, _(xs);
      }), fs(K);
    }, {
      H: !1,
      I: !0
    }), fe(y, "transitionstart", (K) => {
      if (E(K)) {
        const Q = () => {
          C(), S(Q);
        };
        Q();
      }
    }), fe(y, "transitionend transitioncancel", (K) => {
      E(K) && (b(), C());
    }), fe(p, "mousedown", W(fe, i, "click", Jn, {
      A: !0,
      I: !0
    }), {
      I: !0
    }), P(), O, b]);
  };
}, Xr = (t, e, n, o, s, a) => {
  let c, d, i, v, _, m = Ne, u = 0;
  const p = (z) => z.pointerType === "mouse", [h, y] = gt(), [$, O] = gt(100), [S, b] = gt(100), [C, B] = gt(() => u), [I, x] = Wr(t, s, o, Yr(e, s, o, (z) => p(z) && oe())), { bt: k, Zt: D, Rt: L } = s, { Ft: E, Bt: P, Nt: F, jt: K } = I, Q = (z, ie) => {
    if (B(), z)
      E(Ss);
    else {
      const ae = W(E, Ss, !0);
      u > 0 && !ie ? C(ae) : ae();
    }
  }, oe = () => {
    (i ? !c : !v) && (Q(!0), $(() => {
      Q(!1);
    }));
  }, G = (z) => {
    E(qn, z, !0), E(qn, z, !1);
  }, Z = (z) => {
    p(z) && (c = i, i && Q(!0));
  }, ve = [B, O, b, y, () => m(), fe(k, "pointerover", Z, {
    A: !0
  }), fe(k, "pointerenter", Z), fe(k, "pointerleave", (z) => {
    p(z) && (c = !1, i && Q(!1));
  }), fe(k, "pointermove", (z) => {
    p(z) && d && oe();
  }), fe(D, "scroll", (z) => {
    h(() => {
      F(), oe();
    }), a(z), K();
  })];
  return [() => W(Re, _e(ve, x())), ({ Et: z, Tt: ie, Gt: ae, Qt: ce }) => {
    const { tn: ke, nn: ge, sn: me } = ce || {}, { Ct: A, _t: V } = ae || {}, { N: T } = n, { T: R } = Fe(), { k: N, en: q } = o, [ee, te] = z("showNativeOverlaidScrollbars"), [pe, be] = z("scrollbars.theme"), [J, we] = z("scrollbars.visibility"), [xe, Be] = z("scrollbars.autoHide"), [re, $e] = z("scrollbars.autoHideSuspend"), [Le] = z("scrollbars.autoHideDelay"), [he, Me] = z("scrollbars.dragScroll"), [Nt, Ut] = z("scrollbars.clickScroll"), [Pt, Pe] = z("overflow"), at = V && !ie, it = q.x || q.y, bn = ke || ge || A || ie, et = me || we || Pe, wn = ee && R.x && R.y, _t = (mt, pt, Lt) => {
      const qt = mt.includes("scroll") && (J === "visible" || J === "auto" && pt === "scroll");
      return E(Dr, qt, Lt), qt;
    };
    if (u = Le, at && (re && it ? (G(!1), m(), S(() => {
      m = fe(D, "scroll", W(G, !0), {
        A: !0
      });
    })) : G(!0)), te && E(Cr, wn), be && (E(_), E(pe, !0), _ = pe), $e && !re && G(!0), Be && (d = xe === "move", i = xe === "leave", v = xe === "never", Q(v, !0)), Me && E(Mr, he), Ut && E(Lr, Nt), et) {
      const mt = _t(Pt.x, N.x, !0), pt = _t(Pt.y, N.y, !1);
      E(Vr, !(mt && pt));
    }
    bn && (P(), F(), K(), E(ks, !q.x, !0), E(ks, !q.y, !1), E(Er, T && !L));
  }, {}, I];
}, Jr = (t) => {
  const e = Fe(), { G: n, L: o } = e, { elements: s } = n(), { host: a, padding: c, viewport: d, content: i } = s, v = en(t), _ = v ? {} : t, { elements: m } = _, { host: u, padding: p, viewport: h, content: y } = m || {}, $ = v ? t : _.target, O = no($), S = nn($, "textarea"), b = $.ownerDocument, C = b.documentElement, B = () => b.defaultView || De, I = (J) => {
    J && J.focus && J.focus({
      preventScroll: !0
    });
  }, x = W(Ur, [$]), k = W(bo, [$]), D = W(wt, ""), L = W(x, D, d), E = W(k, D, i), P = L(h), F = P === $, K = F && O, Q = !F && E(y), oe = !F && P === Q, G = K ? C : P, Z = S ? x(D, a, u) : $, ve = K ? G : Z, z = !F && k(D, c, p), ie = !oe && Q, ae = [ie, G, z, ve].map((J) => en(J) && !Ct(J) && J), ce = (J) => J && vn(ae, J), ke = ce(G) ? $ : G, ge = {
    gt: $,
    bt: ve,
    D: G,
    cn: z,
    wt: ie,
    kt: K ? C : G,
    Zt: K ? b : G,
    rn: O ? C : ke,
    Kt: b,
    yt: S,
    Rt: O,
    Dt: v,
    V: F,
    ln: B,
    St: (J) => ur(G, F ? Ae : We, J),
    $t: (J, we) => Yt(G, F ? Ae : We, J, we)
  }, { gt: me, bt: A, cn: V, D: T, wt: R } = ge, N = [() => {
    qe(A, [Ae, $n]), qe(me, $n), O && qe(C, [$n, Ae]);
  }], q = S && ce(A);
  let ee = S ? me : Rn([R, T, V, A, me].find((J) => J && !ce(J)));
  const te = K ? me : R || T, pe = W(Re, N);
  return [ge, () => {
    const J = B(), we = Fn(), xe = (he) => {
      Te(Ct(he), Rn(he)), ot(he);
    }, Be = (he) => he ? fe(he, "focusin focusout focus blur", (Me) => {
      Jn(Me), Me.stopImmediatePropagation();
    }, {
      I: !0,
      H: !1
    }) : Ne, re = "tabindex", $e = mn(T, re), Le = Be(we);
    return He(A, Ae, F ? "viewport" : "host"), He(V, Pn, ""), He(R, ws, ""), F || (He(T, We, ""), He(T, re, $e || "-1"), O && Bt(C, Ae, wr)), q && (is(me, A), _e(N, () => {
      is(A, me), ot(A);
    })), Te(te, ee), Te(A, V), Te(V || A, !F && T), Te(T, R), _e(N, [Le, () => {
      const he = Fn(), Me = Be(he);
      qe(V, Pn), qe(R, ws), qe(T, [io, co, We]), $e ? He(T, re, $e) : qe(T, re), ce(R) && xe(R), ce(T) && xe(T), ce(V) && xe(V), I(he), Me();
    }]), o && !F && (Bt(T, We, vo), _e(N, W(qe, T, We))), I(!F && we === $ && J.top === J ? T : we), Le(), ee = 0, pe;
  }, pe];
}, Qr = ({ wt: t }) => ({ Gt: e, an: n, Tt: o }) => {
  const { xt: s } = e || {}, { Ot: a } = n;
  t && (s || o) && Et(t, {
    [xt]: a && "100%"
  });
}, Zr = ({ bt: t, cn: e, D: n, V: o }, s) => {
  const [a, c] = Ie({
    u: dr,
    o: us()
  }, W(us, t, "padding", ""));
  return ({ Et: d, Gt: i, an: v, Tt: _ }) => {
    let [m, u] = c(_);
    const { L: p } = Fe(), { ht: h, Ht: y, Ct: $ } = i || {}, { N: O } = v, [S, b] = d("paddingAbsolute");
    (h || u || (_ || y)) && ([m, u] = a(_));
    const B = !o && (b || $ || u);
    if (B) {
      const I = !S || !e && !p, x = m.r + m.l, k = m.t + m.b, D = {
        [Gs]: I && !O ? -x : 0,
        [js]: I ? -k : 0,
        [zs]: I && O ? -x : 0,
        top: I ? -m.t : 0,
        right: I ? O ? -m.r : "auto" : 0,
        left: I ? O ? "auto" : -m.l : 0,
        [St]: I && `calc(100% + ${x}px)`
      }, L = {
        [Ns]: I ? m.t : 0,
        [Us]: I ? m.r : 0,
        [qs]: I ? m.b : 0,
        [Ps]: I ? m.l : 0
      };
      Et(e || n, D), Et(n, L), ne(s, {
        cn: m,
        un: !I,
        j: e ? L : ne({}, D, L)
      });
    }
    return {
      dn: B
    };
  };
}, el = (t, e) => {
  const n = Fe(), { bt: o, cn: s, D: a, V: c, Rt: d, $t: i, ln: v } = t, { L: _ } = n, m = d && c, u = W(Wt, 0), p = {
    u: Ws,
    o: {
      w: 0,
      h: 0
    }
  }, h = {
    u: Ys,
    o: {
      x: $t,
      y: $t
    }
  }, y = (L, E) => {
    const P = De.devicePixelRatio % 1 !== 0 ? 1 : 0, F = {
      w: u(L.w - E.w),
      h: u(L.h - E.h)
    };
    return {
      w: F.w > P ? F.w : 0,
      h: F.h > P ? F.h : 0
    };
  }, [$, O] = Ie(p, W(Xn, a)), [S, b] = Ie(p, W(Hn, a)), [C, B] = Ie(p), [I, x] = Ie(p), [k] = Ie(h), D = Vt(es);
  return ({ Et: L, Gt: E, an: P, Tt: F }, { dn: K }) => {
    const { ht: Q, Ht: oe, Ct: G, It: Z } = E || {}, ve = D && D.M(t, e, P, n, L), { q: z, W: ie, X: ae } = ve || {}, [ce, ke] = Br(L, n), [ge, me] = L("overflow"), A = Q || K || oe || G || Z || ke, V = on(ge.x), T = on(ge.y), R = V || T;
    let N = O(F), q = b(F), ee = B(F), te = x(F), pe;
    if (ke && _ && i(vo, !ce), A) {
      R && i(kt, !1);
      const [Pe, at] = ie ? ie(pe) : [], [it, bn] = N = $(F), [et, wn] = q = S(F), _t = ro(a), mt = et, pt = _t;
      Pe && Pe(), (wn || bn || ke) && at && !ce && z && z(at, et, it);
      const Lt = pr(v()), qt = {
        w: u(Wt(et.w, mt.w) + it.w),
        h: u(Wt(et.h, mt.h) + it.h)
      }, ss = {
        w: u((m ? Lt.w : pt.w + u(_t.w - et.w)) + it.w),
        h: u((m ? Lt.h : pt.h + u(_t.h - et.h)) + it.h)
      };
      te = I(ss), ee = C(y(qt, ss), F);
    }
    const [be, J] = te, [we, xe] = ee, [Be, re] = q, [$e, Le] = N, he = {
      x: we.w > 0,
      y: we.h > 0
    }, Me = V && T && (he.x || he.y) || V && he.x && !he.y || T && he.y && !he.x;
    if (K || G || Z || Le || re || J || xe || me || ke || A) {
      const Pe = {}, at = Hr(t, he, ge, Pe);
      ae && ae(at, P, !!z && z(at, Be, $e), Pe), c ? (He(o, io, Pe[fn]), He(o, co, Pe[_n])) : Et(a, Pe);
    }
    Yt(o, Ae, uo, Me), Yt(s, Pn, kr, Me), c || Yt(a, We, kt, R);
    const [Ut, Pt] = k(ho(t).k);
    return ne(e, {
      k: Ut,
      Pt: {
        x: be.w,
        y: be.h
      },
      Lt: {
        x: we.w,
        y: we.h
      },
      en: he
    }), {
      sn: Pt,
      tn: J,
      nn: xe
    };
  };
}, tl = (t) => {
  const [e, n, o] = Jr(t), s = {
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
      [qs]: 0,
      [Ps]: 0
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
  }, { gt: a, D: c, V: d } = e, { L: i, T: v } = Fe(), _ = !i && (v.x || v.y), m = [Qr(e), Zr(e, s), el(e, s)];
  return [n, (u) => {
    const p = {}, y = _ && At(c), $ = d ? Bt(c, Ae, Un) : Ne;
    return se(m, (O) => {
      ne(p, O(u, p) || {});
    }), $(), rt(c, y), !d && rt(a, 0), p;
  }, s, e, o];
}, nl = (t, e, n, o) => {
  const s = bs(e, {}), [a, c, d, i, v] = tl(t), [_, m, u] = Kr(i, d, s, (S) => {
    O({}, S);
  }), [p, h, , y] = Xr(t, e, u, d, i, o), $ = (S) => st(S).some((b) => !!S[b]), O = (S, b) => {
    const { fn: C, Tt: B, At: I, _n: x } = S, k = C || {}, D = !!B, L = {
      Et: bs(e, k, D),
      fn: k,
      Tt: D
    };
    if (x)
      return h(L), !1;
    const E = b || m(ne({}, L, {
      At: I
    })), P = c(ne({}, L, {
      an: u,
      Gt: E
    }));
    h(ne({}, L, {
      Gt: E,
      Qt: P
    }));
    const F = $(E), K = $(P), Q = F || K || !Kn(k) || D;
    return Q && n(S, {
      Gt: E,
      Qt: P
    }), Q;
  };
  return [() => {
    const { rn: S, D: b } = i, C = At(S), B = [_(), a(), p()];
    return rt(b, C), W(Re, B);
  }, O, () => ({
    vn: u,
    hn: d
  }), {
    pn: i,
    gn: y
  }, v];
}, Je = (t, e, n) => {
  const { nt: o } = Fe(), s = en(t), a = s ? t : t.target, c = wo(a);
  if (e && !c) {
    let d = !1;
    const i = [], v = {}, _ = (L) => {
      const E = Qs(L), P = Vt(Rr);
      return P ? P(E, !0) : E;
    }, m = ne({}, o(), _(e)), [u, p, h] = Nn(), [y, $, O] = Nn(n), S = (L, E) => {
      O(L, E), h(L, E);
    }, [b, C, B, I, x] = nl(t, m, ({ fn: L, Tt: E }, { Gt: P, Qt: F }) => {
      const { ht: K, Ct: Q, xt: oe, Ht: G, zt: Z, _t: ve } = P, { tn: z, nn: ie, sn: ae } = F;
      S("updated", [D, {
        updateHints: {
          sizeChanged: !!K,
          directionChanged: !!Q,
          heightIntrinsicChanged: !!oe,
          overflowEdgeChanged: !!z,
          overflowAmountChanged: !!ie,
          overflowStyleChanged: !!ae,
          contentMutation: !!G,
          hostMutation: !!Z,
          appear: !!ve
        },
        changedOptions: L || {},
        force: !!E
      }]);
    }, (L) => S("scroll", [D, L])), k = (L) => {
      zr(a), Re(i), d = !0, S("destroyed", [D, L]), p(), $();
    }, D = {
      options(L, E) {
        if (L) {
          const P = E ? o() : {}, F = ao(m, ne(P, _(L)));
          Kn(F) || (ne(m, F), C({
            fn: F
          }));
        }
        return ne({}, m);
      },
      on: y,
      off: (L, E) => {
        L && E && $(L, E);
      },
      state() {
        const { vn: L, hn: E } = B(), { N: P } = L, { Pt: F, Lt: K, k: Q, en: oe, cn: G, un: Z } = E;
        return ne({}, {
          overflowEdge: F,
          overflowAmount: K,
          overflowStyle: Q,
          hasOverflow: oe,
          padding: G,
          paddingAbsolute: Z,
          directionRTL: P,
          destroyed: d
        });
      },
      elements() {
        const { gt: L, bt: E, cn: P, D: F, wt: K, kt: Q, Zt: oe } = I.pn, { qt: G, Jt: Z } = I.gn, ve = (ie) => {
          const { Vt: ae, Mt: ce, Ut: ke } = ie;
          return {
            scrollbar: ke,
            track: ce,
            handle: ae
          };
        }, z = (ie) => {
          const { Wt: ae, Xt: ce } = ie, ke = ve(ae[0]);
          return ne({}, ke, {
            clone: () => {
              const ge = ve(ce());
              return C({
                _n: !0
              }), ge;
            }
          });
        };
        return ne({}, {
          target: L,
          host: E,
          padding: P || F,
          viewport: F,
          content: K || F,
          scrollOffsetElement: Q,
          scrollEventElement: oe,
          scrollbarHorizontal: z(G),
          scrollbarVertical: z(Z)
        });
      },
      update: (L) => C({
        Tt: L,
        At: !0
      }),
      destroy: W(k, !1),
      plugin: (L) => v[st(L)[0]]
    };
    return _e(i, [x]), qr(a, D), po(_o, Je, [D, u, v]), Pr(I.pn.Rt, !s && t.cancel) ? (k(!0), D) : (_e(i, b()), S("initialized", [D]), D.update(!0), D);
  }
  return c;
};
Je.plugin = (t) => {
  const e = Ue(t), n = e ? t : [t], o = n.map((s) => po(s, Je)[0]);
  return Or(n), e ? o : o[0];
};
Je.valid = (t) => {
  const e = t && t.elements, n = je(e) && e();
  return Zt(n) && !!wo(n.target);
};
Je.env = () => {
  const { P: t, T: e, L: n, K: o, J: s, st: a, et: c, G: d, tt: i, nt: v, ot: _ } = Fe();
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
    getDefaultOptions: v,
    setDefaultOptions: _
  });
};
function sl(t) {
  let e;
  const n = M(null), o = Math.floor(Math.random() * 2 ** 32), s = M(!1), a = M([]), c = () => a.value, d = () => e.getSelection(), i = () => a.value.length, v = () => e.clearSelection(!0), _ = M(), m = M(null), u = M(null), p = M(null), h = M(null), y = M(null);
  function $() {
    e = new Ko({
      area: n.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), e.subscribe(
      "DS:start:pre",
      ({ items: x, event: k, isDragging: D }) => {
        if (D)
          e.Interaction._reset(k);
        else {
          s.value = !1;
          const L = n.value.offsetWidth - k.offsetX, E = n.value.offsetHeight - k.offsetY;
          L < 15 && E < 15 && e.Interaction._reset(k), k.target.classList.contains("os-scrollbar-handle") && e.Interaction._reset(k);
        }
      }
    ), document.addEventListener("dragleave", (x) => {
      h.value = x.target, !x.buttons && s.value && (s.value = !1);
    }), document.addEventListener("dragend", (x) => {
      t && t(h.value);
    });
  }
  const O = () => ct(() => {
    e.addSelection(e.getSelectables()), S();
  }), S = () => {
    a.value = e.getSelection().map((x) => JSON.parse(x.dataset.item)), _.value(a.value);
  }, b = () => ct(() => {
    const x = c().map((k) => k.path);
    v(), e.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + o)
    }), e.addSelection(
      e.getSelectables().filter(
        (k) => x.includes(JSON.parse(k.dataset.item).path)
      )
    ), S(), B();
  }), C = (x) => {
    _.value = x, e.subscribe("DS:end", ({ items: k, event: D, isDragging: L }) => {
      a.value = k.map((E) => JSON.parse(E.dataset.item)), x(k.map((E) => JSON.parse(E.dataset.item)));
    });
  }, B = () => {
    m.value && (n.value.getBoundingClientRect().height < n.value.scrollHeight ? (u.value.style.height = n.value.scrollHeight + "px", u.value.style.display = "block") : (u.value.style.height = "100%", u.value.style.display = "none"));
  }, I = (x) => {
    if (!m.value)
      return;
    const { scrollOffsetElement: k } = m.value.elements();
    k.scrollTo({
      top: n.value.scrollTop,
      left: 0
    });
  };
  return Ee(() => {
    Je(
      p.value,
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
        initialized: (x) => {
          m.value = x;
        },
        scroll: (x, k) => {
          const { scrollOffsetElement: D } = x.elements();
          n.value.scrollTo({
            top: D.scrollTop,
            left: 0
          });
        }
      }
    ), $(), B(), y.value = new ResizeObserver(B), y.value.observe(n.value), n.value.addEventListener("scroll", I), e.subscribe(
      "DS:scroll",
      ({ isDragging: x }) => x || I()
    );
  }), Gn(() => {
    e && e.stop(), y.value && y.value.disconnect();
  }), Ts(() => {
    e && e.Area.reset();
  }), {
    area: n,
    explorerId: o,
    isDraggingRef: s,
    scrollBar: u,
    scrollBarContainer: p,
    getSelected: c,
    getSelection: d,
    selectAll: O,
    clearSelection: v,
    refreshSelection: b,
    getCount: i,
    onSelect: C
  };
}
function ol(t, e) {
  const n = M(t), o = M(e), s = M([]), a = M([]), c = M([]), d = M(!1), i = M(5);
  let v = !1, _ = !1;
  const m = vt({
    adapter: n,
    storages: [],
    dirname: o,
    files: []
  });
  function u() {
    let S = [], b = [], C = o.value ?? n.value + "://";
    C.length === 0 && (s.value = []), C.replace(n.value + "://", "").split("/").forEach(function(x) {
      S.push(x), S.join("/") !== "" && b.push({
        basename: x,
        name: x,
        path: n.value + "://" + S.join("/"),
        type: "dir"
      });
    }), a.value = b;
    const [B, I] = h(b, i.value);
    c.value = I, s.value = B;
  }
  function p(S) {
    i.value = S, u();
  }
  function h(S, b) {
    return S.length > b ? [S.slice(-b), S.slice(0, -b)] : [S, []];
  }
  function y(S = null) {
    d.value = S ?? !d.value;
  }
  function $() {
    return s.value && s.value.length && !_;
  }
  const O = Xe(() => {
    var S;
    return ((S = s.value[s.value.length - 2]) == null ? void 0 : S.path) ?? n.value + "://";
  });
  return Ee(() => {
  }), Oe(o, u), Ee(u), {
    adapter: n,
    path: o,
    loading: v,
    searchMode: _,
    data: m,
    breadcrumbs: s,
    breadcrumbItems: a,
    limitBreadcrumbItems: p,
    hiddenBreadcrumbs: c,
    showHiddenBreadcrumbs: d,
    toggleHiddenBreadcrumbs: y,
    isGoUpAvailable: $,
    parentFolderPath: O
  };
}
function rl() {
  const t = "_readOnlyFile", e = localStorage.getItem(t), n = vt(JSON.parse(e ?? '{"items": []}')), o = (v) => {
    for (const _ of v)
      n.items.length >= 1e3 && n.items.shift(), i(_.path) ? c(_.path) : n.items.push(_);
  }, s = () => JSON.parse(localStorage.getItem(t) || '{"items": []}'), a = () => {
    localStorage.setItem(t, JSON.stringify(n));
  }, c = (v) => {
    const _ = n.items.findIndex((m) => m.path === v);
    _ !== -1 && n.items.splice(_, 1);
  }, d = () => n.items, i = (v) => v.indexOf("自动下单") !== -1 ? !0 : n.items.findIndex((m) => v.indexOf(m.path) === 0) !== -1;
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
const ll = (t, e) => {
  const n = Qo(t.id), o = jo(), s = n.getStore("metricUnits", !1), a = sr(n, t.theme), c = e.i18n, d = t.locale ?? e.locale, i = n.getStore("adapter"), v = rl(), _ = (h) => Array.isArray(h) ? h : tr, m = n.getStore("persist-path", t.persist), u = m ? n.getStore("path", t.path) : t.path, p = sl((h) => {
    o.emit("file-drag-end", h);
  });
  return vt({
    /**
     * Core properties
     * */
    // app version
    version: nr,
    // root element
    root: null,
    // app id
    debug: t.debug,
    // Event Bus
    emitter: o,
    // storage
    storage: n,
    // localization object
    i18n: er(n, d, o, c),
    // modal state
    modal: or(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: Xe(() => p),
    // http object
    requester: Jo(t.request),
    // active features
    features: _(t.features),
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
    filesize: s ? Ms : Ls,
    // show large icons in list view
    compactListView: n.getStore("compact-list-view", !0),
    // persist state
    persist: m,
    // show thumbnails
    showThumbnails: n.getStore("show-thumbnails", t.showThumbnails),
    // file system
    fs: ol(i, u),
    onlyReadFileStore: v
  });
}, al = { class: "vuefinder__modal-layout__container" }, il = { class: "vuefinder__modal-layout__content" }, cl = { class: "vuefinder__modal-layout__footer" }, Qe = {
  __name: "ModalLayout",
  setup(t) {
    const e = M(null), n = le("ServiceContainer");
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
    }), (o, s) => (f(), g("div", {
      class: "vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: s[1] || (s[1] = Tt((a) => l(n).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      s[2] || (s[2] = r("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      r("div", al, [
        r("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: s[0] || (s[0] = Ot((a) => l(n).modal.close(), ["self"]))
        }, [
          r("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            r("div", il, [
              Rt(o.$slots, "default")
            ]),
            r("div", cl, [
              Rt(o.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}, dl = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [o, s] of e)
    n[o] = s;
  return n;
}, ul = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const o = le("ServiceContainer"), s = M(!1), { t: a } = o.i18n;
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
}, vl = { key: 1 };
function fl(t, e, n, o, s, a) {
  return f(), g("div", {
    class: ye(["vuefinder__action-message", { "vuefinder__action-message--hidden": !o.shown }])
  }, [
    t.$slots.default ? Rt(t.$slots, "default", { key: 0 }) : (f(), g("span", vl, w(o.t("Saved.")), 1))
  ], 2);
}
const ht = /* @__PURE__ */ dl(ul, [["render", fl]]), _l = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function ml(t, e) {
  return f(), g("svg", _l, e[0] || (e[0] = [
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
const pl = { render: ml }, hl = { class: "vuefinder__modal-header" }, gl = { class: "vuefinder__modal-header__icon-container" }, bl = {
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
    return (e, n) => (f(), g("div", hl, [
      r("div", gl, [
        (f(), U(Ds(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      r("h3", bl, w(t.title), 1)
    ]));
  }
}, wl = { class: "vuefinder__about-modal__content" }, yl = { class: "vuefinder__about-modal__main" }, kl = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, Sl = ["onClick", "aria-current"], xl = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, $l = { class: "vuefinder__about-modal__description" }, Cl = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, El = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Al = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, Tl = { class: "vuefinder__about-modal__description" }, Dl = { class: "vuefinder__about-modal__settings" }, Vl = { class: "vuefinder__about-modal__setting flex" }, Ll = { class: "vuefinder__about-modal__setting-input" }, Ml = { class: "vuefinder__about-modal__setting-label" }, Ol = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, Rl = { class: "vuefinder__about-modal__setting flex" }, Fl = { class: "vuefinder__about-modal__setting-input" }, Bl = { class: "vuefinder__about-modal__setting-label" }, Hl = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, Il = { class: "vuefinder__about-modal__setting flex" }, Nl = { class: "vuefinder__about-modal__setting-input" }, Ul = { class: "vuefinder__about-modal__setting-label" }, Pl = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, ql = { class: "vuefinder__about-modal__setting flex" }, zl = { class: "vuefinder__about-modal__setting-input" }, Gl = { class: "vuefinder__about-modal__setting-label" }, jl = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, Kl = { class: "vuefinder__about-modal__setting" }, Wl = { class: "vuefinder__about-modal__setting-input" }, Yl = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, Xl = { class: "vuefinder__about-modal__setting-label" }, Jl = ["label"], Ql = ["value"], Zl = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, ea = { class: "vuefinder__about-modal__setting-input" }, ta = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, na = { class: "vuefinder__about-modal__setting-label" }, sa = ["label"], oa = ["value"], ra = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, la = { class: "vuefinder__about-modal__shortcuts" }, aa = { class: "vuefinder__about-modal__shortcut" }, ia = { class: "vuefinder__about-modal__shortcut" }, ca = { class: "vuefinder__about-modal__shortcut" }, da = { class: "vuefinder__about-modal__shortcut" }, ua = { class: "vuefinder__about-modal__shortcut" }, va = { class: "vuefinder__about-modal__shortcut" }, fa = { class: "vuefinder__about-modal__shortcut" }, _a = { class: "vuefinder__about-modal__shortcut" }, ma = { class: "vuefinder__about-modal__shortcut" }, pa = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, ha = { class: "vuefinder__about-modal__description" }, ko = {
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
    ]), d = M("about"), i = async () => {
      o(), location.reload();
    }, v = (S) => {
      e.theme.set(S), e.emitter.emit("vf-theme-saved");
    }, _ = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? Ms : Ls, n("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, m = () => {
      e.compactListView = !e.compactListView, n("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, u = () => {
      e.showThumbnails = !e.showThumbnails, n("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, p = () => {
      e.persist = !e.persist, n("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: h } = le("VueFinderOptions"), $ = Object.fromEntries(
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
      }).filter(([S]) => Object.keys(h).includes(S))
    ), O = Xe(() => ({
      system: s("System"),
      light: s("Light"),
      dark: s("Dark")
    }));
    return (S, b) => (f(), U(Qe, null, {
      buttons: X(() => [
        r("button", {
          type: "button",
          onClick: b[7] || (b[7] = (C) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(l(s)("Close")), 1)
      ]),
      default: X(() => [
        r("div", wl, [
          j(lt, {
            icon: l(pl),
            title: "Vuefinder " + l(e).version
          }, null, 8, ["icon", "title"]),
          r("div", yl, [
            r("div", null, [
              r("div", null, [
                r("nav", kl, [
                  (f(!0), g(Se, null, Ce(c.value, (C) => (f(), g("button", {
                    key: C.name,
                    onClick: (B) => d.value = C.key,
                    class: ye([C.key === d.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": C.current ? "page" : void 0
                  }, w(C.name), 11, Sl))), 128))
                ])
              ])
            ]),
            d.value === a.ABOUT ? (f(), g("div", xl, [
              r("div", $l, w(l(s)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              r("a", Cl, w(l(s)("Project home")), 1),
              r("a", El, w(l(s)("Follow on GitHub")), 1)
            ])) : H("", !0),
            d.value === a.SETTINGS ? (f(), g("div", Al, [
              r("div", Tl, w(l(s)("Customize your experience with the following settings")), 1),
              r("div", Dl, [
                r("fieldset", null, [
                  r("div", Vl, [
                    r("div", Ll, [
                      ue(r("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        "onUpdate:modelValue": b[0] || (b[0] = (C) => l(e).metricUnits = C),
                        onClick: _,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, l(e).metricUnits]
                      ])
                    ]),
                    r("div", Ml, [
                      r("label", Ol, [
                        Y(w(l(s)("Use Metric Units")) + " ", 1),
                        j(ht, {
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
                  r("div", Rl, [
                    r("div", Fl, [
                      ue(r("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        "onUpdate:modelValue": b[1] || (b[1] = (C) => l(e).compactListView = C),
                        onClick: m,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, l(e).compactListView]
                      ])
                    ]),
                    r("div", Bl, [
                      r("label", Hl, [
                        Y(w(l(s)("Compact list view")) + " ", 1),
                        j(ht, {
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
                  r("div", Il, [
                    r("div", Nl, [
                      ue(r("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        "onUpdate:modelValue": b[2] || (b[2] = (C) => l(e).persist = C),
                        onClick: p,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, l(e).persist]
                      ])
                    ]),
                    r("div", Ul, [
                      r("label", Pl, [
                        Y(w(l(s)("Persist path on reload")) + " ", 1),
                        j(ht, {
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
                  r("div", ql, [
                    r("div", zl, [
                      ue(r("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        "onUpdate:modelValue": b[3] || (b[3] = (C) => l(e).showThumbnails = C),
                        onClick: u,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, l(e).showThumbnails]
                      ])
                    ]),
                    r("div", Gl, [
                      r("label", jl, [
                        Y(w(l(s)("Show thumbnails")) + " ", 1),
                        j(ht, {
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
                  r("div", Kl, [
                    r("div", Wl, [
                      r("label", Yl, w(l(s)("Theme")), 1)
                    ]),
                    r("div", Xl, [
                      ue(r("select", {
                        id: "theme",
                        "onUpdate:modelValue": b[4] || (b[4] = (C) => l(e).theme.value = C),
                        onChange: b[5] || (b[5] = (C) => v(C.target.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        r("optgroup", {
                          label: l(s)("Theme")
                        }, [
                          (f(!0), g(Se, null, Ce(O.value, (C, B) => (f(), g("option", { value: B }, w(C), 9, Ql))), 256))
                        ], 8, Jl)
                      ], 544), [
                        [Tn, l(e).theme.value]
                      ]),
                      j(ht, {
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
                  l(e).features.includes(l(de).LANGUAGE) && Object.keys(l($)).length > 1 ? (f(), g("div", Zl, [
                    r("div", ea, [
                      r("label", ta, w(l(s)("Language")), 1)
                    ]),
                    r("div", na, [
                      ue(r("select", {
                        id: "language",
                        "onUpdate:modelValue": b[6] || (b[6] = (C) => l(e).i18n.locale = C),
                        class: "vuefinder__about-modal__select"
                      }, [
                        r("optgroup", {
                          label: l(s)("Language")
                        }, [
                          (f(!0), g(Se, null, Ce(l($), (C, B) => (f(), g("option", { value: B }, w(C), 9, oa))), 256))
                        ], 8, sa)
                      ], 512), [
                        [Tn, l(e).i18n.locale]
                      ]),
                      j(ht, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: X(() => [
                          Y(w(l(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : H("", !0)
                ])
              ])
            ])) : H("", !0),
            d.value === a.SHORTCUTS ? (f(), g("div", ra, [
              r("div", la, [
                r("div", aa, [
                  r("div", null, w(l(s)("Rename")), 1),
                  b[8] || (b[8] = r("kbd", null, "F2", -1))
                ]),
                r("div", ia, [
                  r("div", null, w(l(s)("Refresh")), 1),
                  b[9] || (b[9] = r("kbd", null, "F5", -1))
                ]),
                r("div", ca, [
                  Y(w(l(s)("Delete")) + " ", 1),
                  b[10] || (b[10] = r("kbd", null, "Del", -1))
                ]),
                r("div", da, [
                  Y(w(l(s)("Escape")) + " ", 1),
                  b[11] || (b[11] = r("div", null, [
                    r("kbd", null, "Esc")
                  ], -1))
                ]),
                r("div", ua, [
                  Y(w(l(s)("Select All")) + " ", 1),
                  b[12] || (b[12] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    Y(" + "),
                    r("kbd", null, "A")
                  ], -1))
                ]),
                r("div", va, [
                  Y(w(l(s)("Search")) + " ", 1),
                  b[13] || (b[13] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    Y(" + "),
                    r("kbd", null, "F")
                  ], -1))
                ]),
                r("div", fa, [
                  Y(w(l(s)("Toggle Sidebar")) + " ", 1),
                  b[14] || (b[14] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    Y(" + "),
                    r("kbd", null, "E")
                  ], -1))
                ]),
                r("div", _a, [
                  Y(w(l(s)("Open Settings")) + " ", 1),
                  b[15] || (b[15] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    Y(" + "),
                    r("kbd", null, ",")
                  ], -1))
                ]),
                r("div", ma, [
                  Y(w(l(s)("Toggle Full Screen")) + " ", 1),
                  b[16] || (b[16] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    Y(" + "),
                    r("kbd", null, "Enter")
                  ], -1))
                ])
              ])
            ])) : H("", !0),
            d.value === a.RESET ? (f(), g("div", pa, [
              r("div", ha, w(l(s)("Reset all settings to default")), 1),
              r("button", {
                onClick: i,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, w(l(s)("Reset Settings")), 1)
            ])) : H("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, ga = ["title"], Ze = {
  __name: "Message",
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["hidden"],
  setup(t, { emit: e }) {
    var v;
    const n = e, o = le("ServiceContainer"), { t: s } = o.i18n, a = M(!1), c = M(null), d = M((v = c.value) == null ? void 0 : v.strMessage);
    Oe(d, () => a.value = !1);
    const i = () => {
      n("hidden"), a.value = !0;
    };
    return (_, m) => (f(), g("div", null, [
      a.value ? H("", !0) : (f(), g("div", {
        key: 0,
        ref_key: "strMessage",
        ref: c,
        class: ye(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Rt(_.$slots, "default"),
        r("div", {
          class: "vuefinder__message__close",
          onClick: i,
          title: l(s)("Close")
        }, m[0] || (m[0] = [
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
        ]), 8, ga)
      ], 2))
    ]));
  }
}, ba = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function wa(t, e) {
  return f(), g("svg", ba, e[0] || (e[0] = [
    r("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ]));
}
const ya = { render: wa }, ka = { class: "vuefinder__delete-modal__content" }, Sa = { class: "vuefinder__delete-modal__form" }, xa = { class: "vuefinder__delete-modal__description" }, $a = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Ca = { class: "vuefinder__delete-modal__file" }, Ea = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Aa = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ta = { class: "vuefinder__delete-modal__file-name" }, Da = { class: "vuefinder__delete-modal__warning" }, Va = {
  __name: "ModalDelete",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, o = M(e.modal.data.items), s = M(""), a = () => {
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
    return (c, d) => (f(), U(Qe, null, {
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
        r("div", Da, w(l(n)("This action cannot be undone.")), 1)
      ]),
      default: X(() => [
        r("div", null, [
          j(lt, {
            icon: l(ya),
            title: l(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          r("div", ka, [
            r("div", Sa, [
              r("p", xa, w(l(n)("Are you sure you want to delete these files?")), 1),
              r("div", $a, [
                (f(!0), g(Se, null, Ce(o.value, (i) => (f(), g("p", Ca, [
                  i.type === "dir" ? (f(), g("svg", Ea, d[2] || (d[2] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (f(), g("svg", Aa, d[3] || (d[3] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  r("span", Ta, w(i.basename), 1)
                ]))), 256))
              ]),
              s.value.length ? (f(), U(Ze, {
                key: 0,
                onHidden: d[0] || (d[0] = (i) => s.value = ""),
                error: ""
              }, {
                default: X(() => [
                  Y(w(s.value), 1)
                ]),
                _: 1
              })) : H("", !0)
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
function Ma(t, e) {
  return f(), g("svg", La, e[0] || (e[0] = [
    r("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ]));
}
const Oa = { render: Ma }, Ra = { class: "vuefinder__rename-modal__content" }, Fa = { class: "vuefinder__rename-modal__item" }, Ba = { class: "vuefinder__rename-modal__item-info" }, Ha = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ia = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Na = { class: "vuefinder__rename-modal__item-name" }, So = {
  __name: "ModalRename",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, o = M(e.modal.data.items[0]), s = M(e.modal.data.items[0].basename), a = M(""), c = () => {
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
    return (d, i) => (f(), U(Qe, null, {
      buttons: X(() => [
        r("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, w(l(n)("Rename")), 1),
        r("button", {
          type: "button",
          onClick: i[2] || (i[2] = (v) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(l(n)("Cancel")), 1)
      ]),
      default: X(() => [
        r("div", null, [
          j(lt, {
            icon: l(Oa),
            title: l(n)("Rename")
          }, null, 8, ["icon", "title"]),
          r("div", Ra, [
            r("div", Fa, [
              r("p", Ba, [
                o.value.type === "dir" ? (f(), g("svg", Ha, i[3] || (i[3] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (f(), g("svg", Ia, i[4] || (i[4] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                r("span", Na, w(o.value.basename), 1)
              ]),
              ue(r("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (v) => s.value = v),
                onKeyup: Tt(c, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Dt, s.value]
              ]),
              a.value.length ? (f(), U(Ze, {
                key: 0,
                onHidden: i[1] || (i[1] = (v) => a.value = ""),
                error: ""
              }, {
                default: X(() => [
                  Y(w(a.value), 1)
                ]),
                _: 1
              })) : H("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Ke = {
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
function Ua(t) {
  const e = (n) => {
    n.code === Ke.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible && (t.fs.searchMode || (n.code === Ke.F2 && t.features.includes(de.RENAME) && (t.dragSelect.getCount() !== 1 || t.modal.open(So, { items: t.dragSelect.getSelected() })), n.code === Ke.F5 && t.emitter.emit("vf-fetch", { params: { q: "index", adapter: t.fs.adapter, path: t.fs.data.dirname } }), n.code === Ke.DELETE && (!t.dragSelect.getCount() || t.modal.open(Va, { items: t.dragSelect.getSelected() })), n.metaKey && n.code === Ke.BACKSLASH && t.modal.open(ko), n.metaKey && n.code === Ke.KEY_F && t.features.includes(de.SEARCH) && (t.fs.searchMode = !0, n.preventDefault()), n.metaKey && n.code === Ke.KEY_E && (t.showTreeView = !t.showTreeView, t.storage.setStore("show-tree-view", t.showTreeView)), n.metaKey && n.code === Ke.ENTER && (t.fullScreen = !t.fullScreen, t.root.focus()), n.metaKey && n.code === Ke.KEY_A && (t.dragSelect.selectAll(), n.preventDefault())));
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
function qa(t, e) {
  return f(), g("svg", Pa, e[0] || (e[0] = [
    r("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ]));
}
const xo = { render: qa }, za = { class: "vuefinder__new-folder-modal__content" }, Ga = { class: "vuefinder__new-folder-modal__form" }, ja = { class: "vuefinder__new-folder-modal__description" }, Ka = ["placeholder"], $o = {
  __name: "ModalNewFolder",
  setup(t) {
    const e = le("ServiceContainer");
    e.storage;
    const { t: n } = e.i18n, o = M(""), s = M(""), a = () => {
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
    return (c, d) => (f(), U(Qe, null, {
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
          j(lt, {
            icon: l(xo),
            title: l(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          r("div", za, [
            r("div", Ga, [
              r("p", ja, w(l(n)("Create a new folder")), 1),
              ue(r("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (i) => o.value = i),
                onKeyup: Tt(a, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: l(n)("Folder Name"),
                type: "text"
              }, null, 40, Ka), [
                [Dt, o.value]
              ]),
              s.value.length ? (f(), U(Ze, {
                key: 0,
                onHidden: d[1] || (d[1] = (i) => s.value = ""),
                error: ""
              }, {
                default: X(() => [
                  Y(w(s.value), 1)
                ]),
                _: 1
              })) : H("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Wa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Ya(t, e) {
  return f(), g("svg", Wa, e[0] || (e[0] = [
    r("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ]));
}
const Co = { render: Ya }, Xa = { class: "vuefinder__new-file-modal__content" }, Ja = { class: "vuefinder__new-file-modal__form" }, Qa = { class: "vuefinder__new-file-modal__description" }, Za = ["placeholder"], ei = {
  __name: "ModalNewFile",
  setup(t) {
    const e = le("ServiceContainer");
    e.storage;
    const { t: n } = e.i18n, o = M(""), s = M(""), a = () => {
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
    return (c, d) => (f(), U(Qe, null, {
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
          j(lt, {
            icon: l(Co),
            title: l(n)("New File")
          }, null, 8, ["icon", "title"]),
          r("div", Xa, [
            r("div", Ja, [
              r("p", Qa, w(l(n)("Create a new file")), 1),
              ue(r("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (i) => o.value = i),
                onKeyup: Tt(a, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: l(n)("File Name"),
                type: "text"
              }, null, 40, Za), [
                [Dt, o.value]
              ]),
              s.value.length ? (f(), U(Ze, {
                key: 0,
                onHidden: d[1] || (d[1] = (i) => s.value = ""),
                error: ""
              }, {
                default: X(() => [
                  Y(w(s.value), 1)
                ]),
                _: 1
              })) : H("", !0)
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
const ti = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function ni(t, e) {
  return f(), g("svg", ti, e[0] || (e[0] = [
    r("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ]));
}
const si = { render: ni }, oi = { class: "vuefinder__unarchive-modal__content" }, ri = { class: "vuefinder__unarchive-modal__items" }, li = { class: "vuefinder__unarchive-modal__item" }, ai = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ii = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ci = { class: "vuefinder__unarchive-modal__item-name" }, di = { class: "vuefinder__unarchive-modal__info" }, ui = {
  __name: "ModalUnarchive",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, o = M(e.modal.data.items[0]), s = M(""), a = M([]), c = () => {
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
    return (d, i) => (f(), U(Qe, null, {
      buttons: X(() => [
        r("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, w(l(n)("Unarchive")), 1),
        r("button", {
          type: "button",
          onClick: i[1] || (i[1] = (v) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(l(n)("Cancel")), 1)
      ]),
      default: X(() => [
        r("div", null, [
          j(lt, {
            icon: l(si),
            title: l(n)("Unarchive")
          }, null, 8, ["icon", "title"]),
          r("div", oi, [
            r("div", ri, [
              (f(!0), g(Se, null, Ce(a.value, (v) => (f(), g("p", li, [
                v.type === "dir" ? (f(), g("svg", ai, i[2] || (i[2] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (f(), g("svg", ii, i[3] || (i[3] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                r("span", ci, w(v.basename), 1)
              ]))), 256)),
              r("p", di, w(l(n)("The archive will be unarchived at")) + " (" + w(l(e).fs.data.dirname) + ")", 1),
              s.value.length ? (f(), U(Ze, {
                key: 0,
                onHidden: i[0] || (i[0] = (v) => s.value = ""),
                error: ""
              }, {
                default: X(() => [
                  Y(w(s.value), 1)
                ]),
                _: 1
              })) : H("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, vi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function fi(t, e) {
  return f(), g("svg", vi, e[0] || (e[0] = [
    r("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ]));
}
const _i = { render: fi }, mi = { class: "vuefinder__archive-modal__content" }, pi = { class: "vuefinder__archive-modal__form" }, hi = { class: "vuefinder__archive-modal__files vf-scrollbar" }, gi = { class: "vuefinder__archive-modal__file" }, bi = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, wi = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, yi = { class: "vuefinder__archive-modal__file-name" }, ki = ["placeholder"], Si = {
  __name: "ModalArchive",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, o = M(""), s = M(""), a = M(e.modal.data.items), c = () => {
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
    return (d, i) => (f(), U(Qe, null, {
      buttons: X(() => [
        r("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, w(l(n)("Archive")), 1),
        r("button", {
          type: "button",
          onClick: i[2] || (i[2] = (v) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(l(n)("Cancel")), 1)
      ]),
      default: X(() => [
        r("div", null, [
          j(lt, {
            icon: l(_i),
            title: l(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          r("div", mi, [
            r("div", pi, [
              r("div", hi, [
                (f(!0), g(Se, null, Ce(a.value, (v) => (f(), g("p", gi, [
                  v.type === "dir" ? (f(), g("svg", bi, i[3] || (i[3] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (f(), g("svg", wi, i[4] || (i[4] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  r("span", yi, w(v.basename), 1)
                ]))), 256))
              ]),
              ue(r("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (v) => o.value = v),
                onKeyup: Tt(c, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: l(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, ki), [
                [Dt, o.value]
              ]),
              s.value.length ? (f(), U(Ze, {
                key: 0,
                onHidden: i[1] || (i[1] = (v) => s.value = ""),
                error: ""
              }, {
                default: X(() => [
                  Y(w(s.value), 1)
                ]),
                _: 1
              })) : H("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, xi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function $i(t, e) {
  return f(), g("svg", xi, e[0] || (e[0] = [
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
const ns = { render: $i }, Ci = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Ei(t, e) {
  return f(), g("svg", Ci, e[0] || (e[0] = [
    r("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ]));
}
const Ai = { render: Ei }, Ti = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Di(t, e) {
  return f(), g("svg", Ti, e[0] || (e[0] = [
    r("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ]));
}
const Vi = { render: Di }, Li = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Mi(t, e) {
  return f(), g("svg", Li, e[0] || (e[0] = [
    r("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ]));
}
const Oi = { render: Mi }, Ri = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Fi(t, e) {
  return f(), g("svg", Ri, e[0] || (e[0] = [
    r("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ]));
}
const Bi = { render: Fi }, Hi = { class: "vuefinder__toolbar" }, Ii = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, Ni = ["title"], Ui = ["title"];
const Pi = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, qi = { class: "pl-2" }, zi = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Gi = { class: "vuefinder__toolbar__controls" }, ji = ["title"], Ki = ["title"], Wi = {
  __name: "Toolbar",
  setup(t) {
    const e = le("ServiceContainer"), { setStore: n } = e.storage, { t: o } = e.i18n, s = e.dragSelect, a = M(""), c = M([]), d = Xe(() => c.value.some((_) => _.onlyRead));
    e.emitter.on("vf-context-selected", (_) => {
      c.value = _;
    }), e.emitter.on("vf-contextmenu-show", ({ event: _, items: m, target: u = null }) => {
      console.log(u);
    }), e.emitter.on("vf-search-query", ({ newQuery: _ }) => {
      a.value = _;
    });
    const i = () => {
      e.fullScreen = !e.fullScreen;
    };
    Oe(() => e.fullScreen, () => {
      e.fullScreen ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "", n("full-screen", e.fullScreen), e.emitter.emit("vf-fullscreen-toggle");
    });
    const v = () => {
      e.view = e.view === "list" ? "grid" : "list", s.refreshSelection(), n("viewport", e.view);
    };
    return (_, m) => (f(), g("div", Hi, [
      a.value.length ? (f(), g("div", Pi, [
        r("div", qi, [
          Y(w(l(o)("Search results for")) + " ", 1),
          r("span", zi, w(a.value), 1)
        ]),
        l(e).fs.loading ? (f(), U(l(ns), { key: 0 })) : H("", !0)
      ])) : (f(), g("div", Ii, [
        l(e).features.includes(l(de).NEW_FOLDER) ? (f(), g("div", {
          key: 0,
          class: "mx-1.5",
          title: l(o)("New Folder"),
          onClick: m[0] || (m[0] = (u) => l(e).modal.open($o, { items: l(s).getSelected() }))
        }, [
          j(l(xo))
        ], 8, Ni)) : H("", !0),
        l(e).features.includes(l(de).NEW_FILE) ? (f(), g("div", {
          key: 1,
          class: "mx-1.5",
          title: l(o)("New File"),
          onClick: m[1] || (m[1] = (u) => l(e).modal.open(ei, { items: l(s).getSelected() }))
        }, [
          j(l(Co))
        ], 8, Ui)) : H("", !0),
        (l(e).features.includes(l(de).RENAME), H("", !0)),
        (l(e).features.includes(l(de).DELETE), H("", !0)),
        (l(e).features.includes(l(de).UPLOAD), H("", !0)),
        (l(e).features.includes(l(de).UNARCHIVE) && l(s).getCount() === 1 && l(s).getSelected()[0].mime_type, H("", !0)),
        (l(e).features.includes(l(de).ARCHIVE), H("", !0))
      ])),
      r("div", Gi, [
        l(e).features.includes(l(de).FULL_SCREEN) ? (f(), g("div", {
          key: 0,
          onClick: i,
          class: "mx-1.5",
          title: l(o)("Toggle Full Screen")
        }, [
          l(e).fullScreen ? (f(), U(l(Vi), { key: 0 })) : (f(), U(l(Ai), { key: 1 }))
        ], 8, ji)) : H("", !0),
        r("div", {
          class: "mx-1.5",
          title: l(o)("Change View"),
          onClick: m[7] || (m[7] = (u) => a.value.length || v())
        }, [
          l(e).view === "grid" ? (f(), U(l(Oi), {
            key: 0,
            class: ye(["vf-toolbar-icon", a.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : H("", !0),
          l(e).view === "list" ? (f(), U(l(Bi), {
            key: 1,
            class: ye(["vf-toolbar-icon", a.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : H("", !0)
        ], 8, Ki)
      ])
    ]));
  }
}, Yi = (t, e = 0, n = !1) => {
  let o;
  return (...s) => {
    n && !o && t(...s), clearTimeout(o), o = setTimeout(() => {
      t(...s);
    }, e);
  };
}, Es = (t, e, n) => {
  const o = M(t);
  return Io((s, a) => ({
    get() {
      return s(), o.value;
    },
    set: Yi(
      (c) => {
        o.value = c, a();
      },
      e,
      n
    )
  }));
}, Xi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Ji(t, e) {
  return f(), g("svg", Xi, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ]));
}
const Qi = { render: Ji }, Zi = { class: "vuefinder__move-modal__content" }, ec = { class: "vuefinder__move-modal__description" }, tc = { class: "vuefinder__move-modal__files vf-scrollbar" }, nc = { class: "vuefinder__move-modal__file" }, sc = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, oc = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, rc = { class: "vuefinder__move-modal__file-name" }, lc = { class: "vuefinder__move-modal__target-title" }, ac = { class: "vuefinder__move-modal__target-directory" }, ic = { class: "vuefinder__move-modal__target-path" }, cc = { class: "vuefinder__move-modal__selected-items" }, zn = {
  __name: "ModalMove",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, o = M(e.modal.data.items.from), s = M(""), a = () => {
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
    return (c, d) => (f(), U(Qe, null, {
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
        r("div", cc, w(l(n)("%s item(s) selected.", o.value.length)), 1)
      ]),
      default: X(() => [
        r("div", null, [
          j(lt, {
            icon: l(Qi),
            title: l(n)("Move files")
          }, null, 8, ["icon", "title"]),
          r("div", Zi, [
            r("p", ec, w(l(n)("Are you sure you want to move these files?")), 1),
            r("div", tc, [
              (f(!0), g(Se, null, Ce(o.value, (i) => (f(), g("div", nc, [
                r("div", null, [
                  i.type === "dir" ? (f(), g("svg", sc, d[2] || (d[2] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (f(), g("svg", oc, d[3] || (d[3] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])))
                ]),
                r("div", rc, w(i.path), 1)
              ]))), 256))
            ]),
            r("h4", lc, w(l(n)("Target Directory")), 1),
            r("p", ac, [
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
              r("span", ic, w(l(e).modal.data.items.to.path), 1)
            ]),
            s.value.length ? (f(), U(Ze, {
              key: 0,
              onHidden: d[0] || (d[0] = (i) => s.value = ""),
              error: ""
            }, {
              default: X(() => [
                Y(w(s.value), 1)
              ]),
              _: 1
            })) : H("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, dc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
};
function uc(t, e) {
  return f(), g("svg", dc, e[0] || (e[0] = [
    r("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ]));
}
const vc = { render: uc }, fc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function _c(t, e) {
  return f(), g("svg", fc, e[0] || (e[0] = [
    r("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const mc = { render: _c }, pc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
};
function hc(t, e) {
  return f(), g("svg", pc, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ]));
}
const gc = { render: hc }, bc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
};
function wc(t, e) {
  return f(), g("svg", bc, e[0] || (e[0] = [
    r("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ]));
}
const yc = { render: wc }, kc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
};
function Sc(t, e) {
  return f(), g("svg", kc, e[0] || (e[0] = [
    r("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ]));
}
const xc = { render: Sc }, $c = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Cc(t, e) {
  return f(), g("svg", $c, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ]));
}
const Ec = { render: Cc }, Ac = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
};
function Tc(t, e) {
  return f(), g("svg", Ac, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ]));
}
const gn = { render: Tc }, Dc = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
};
function Vc(t, e) {
  return f(), g("svg", Dc, e[0] || (e[0] = [
    r("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ]));
}
const Lc = { render: Vc }, Mc = { class: "vuefinder__breadcrumb__container" }, Oc = ["title"], Rc = ["title"], Fc = ["title"], Bc = { class: "vuefinder__breadcrumb__list" }, Hc = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, Ic = { class: "relative" }, Nc = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], Uc = { class: "vuefinder__breadcrumb__search-mode" }, Pc = ["placeholder"], qc = { class: "vuefinder__breadcrumb__hidden-dropdown" }, zc = ["onDrop", "onClick"], Gc = { class: "vuefinder__breadcrumb__hidden-item-content" }, jc = { class: "vuefinder__breadcrumb__hidden-item-text" }, Kc = {
  __name: "Breadcrumb",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, o = e.dragSelect, { setStore: s } = e.storage, a = M(null), c = Es(0, 100);
    Oe(c, (x) => {
      const k = a.value.children;
      let D = 0, L = 0, E = 5, P = 1;
      e.fs.limitBreadcrumbItems(E), ct(() => {
        for (let F = k.length - 1; F >= 0 && !(D + k[F].offsetWidth > c.value - 40); F--)
          D += parseInt(k[F].offsetWidth, 10), L++;
        L < P && (L = P), L > E && (L = E), e.fs.limitBreadcrumbItems(L);
      });
    });
    const d = () => {
      c.value = a.value.offsetWidth;
    };
    let i = M(null);
    Ee(() => {
      i.value = new ResizeObserver(d), i.value.observe(a.value);
    }), Gn(() => {
      i.value.disconnect();
    });
    const v = (x, k = null) => {
      x.preventDefault(), o.isDraggingRef.value = !1, u(x), k ?? (k = e.fs.hiddenBreadcrumbs.length - 1);
      let D = JSON.parse(x.dataTransfer.getData("items"));
      if (D.find((L) => L.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(zn, {
        items: {
          from: D,
          to: e.fs.hiddenBreadcrumbs[k] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, _ = (x, k = null) => {
      x.preventDefault(), o.isDraggingRef.value = !1, u(x), k ?? (k = e.fs.breadcrumbs.length - 2);
      let D = JSON.parse(x.dataTransfer.getData("items"));
      if (D.find((L) => L.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(zn, {
        items: {
          from: D,
          to: e.fs.breadcrumbs[k] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, m = (x) => {
      x.preventDefault(), e.fs.isGoUpAvailable() ? (x.dataTransfer.dropEffect = "copy", x.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (x.dataTransfer.dropEffect = "none", x.dataTransfer.effectAllowed = "none");
    }, u = (x) => {
      x.preventDefault(), x.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && x.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, p = () => {
      B(), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    }, h = () => {
      B(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.parentFolderPath
        }
      });
    }, y = (x) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: x.path } }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, $ = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, O = {
      mounted(x, k, D, L) {
        x.clickOutsideEvent = function(E) {
          x === E.target || x.contains(E.target) || k.value();
        }, document.body.addEventListener("click", x.clickOutsideEvent);
      },
      beforeUnmount(x, k, D, L) {
        document.body.removeEventListener("click", x.clickOutsideEvent);
      }
    };
    Oe(() => e.showTreeView, (x, k) => {
      x !== k && s("show-tree-view", x);
    });
    const S = M(null), b = () => {
      e.features.includes(de.SEARCH) && (e.fs.searchMode = !0, ct(() => S.value.focus()));
    }, C = Es("", 400);
    Oe(C, (x) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: x });
    }), Oe(() => e.fs.searchMode, (x) => {
      x && ct(() => S.value.focus());
    });
    const B = () => {
      e.fs.searchMode = !1, C.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      B();
    });
    const I = () => {
      C.value === "" && B();
    };
    return (x, k) => (f(), g("div", Mc, [
      H("", !0),
      r("span", {
        title: l(n)("Go up a directory")
      }, [
        j(l(mc), {
          onDragover: k[0] || (k[0] = (D) => m(D)),
          onDragleave: k[1] || (k[1] = (D) => u(D)),
          onDrop: k[2] || (k[2] = (D) => _(D)),
          onClick: h,
          class: ye(l(e).fs.isGoUpAvailable() ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive")
        }, null, 8, ["class"])
      ], 8, Oc),
      l(e).fs.loading ? (f(), g("span", {
        key: 2,
        title: l(n)("Cancel")
      }, [
        j(l(gc), {
          onClick: k[3] || (k[3] = (D) => l(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, Fc)) : (f(), g("span", {
        key: 1,
        title: l(n)("Refresh")
      }, [
        j(l(vc), { onClick: p })
      ], 8, Rc)),
      ue(r("div", {
        onClick: Ot(b, ["self"]),
        class: "group vuefinder__breadcrumb__search-container"
      }, [
        r("div", null, [
          j(l(yc), {
            onDragover: k[4] || (k[4] = (D) => m(D)),
            onDragleave: k[5] || (k[5] = (D) => u(D)),
            onDrop: k[6] || (k[6] = (D) => _(D, -1)),
            onClick: k[7] || (k[7] = (D) => l(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: l(e).fs.adapter } }))
          })
        ]),
        r("div", Bc, [
          l(e).fs.hiddenBreadcrumbs.length ? ue((f(), g("div", Hc, [
            k[13] || (k[13] = r("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            r("div", Ic, [
              r("span", {
                onDragenter: k[8] || (k[8] = (D) => l(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: k[9] || (k[9] = (D) => l(e).fs.toggleHiddenBreadcrumbs()),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                j(l(Lc), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [O, $]
          ]) : H("", !0)
        ]),
        r("div", {
          ref_key: "breadcrumbContainer",
          ref: a,
          class: "vuefinder__breadcrumb__visible-list",
          onClick: Ot(b, ["self"])
        }, [
          (f(!0), g(Se, null, Ce(l(e).fs.breadcrumbs, (D, L) => (f(), g("div", { key: L }, [
            k[14] || (k[14] = r("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            r("span", {
              onDragover: (E) => L === l(e).fs.breadcrumbs.length - 1 || m(E),
              onDragleave: (E) => L === l(e).fs.breadcrumbs.length - 1 || u(E),
              onDrop: (E) => L === l(e).fs.breadcrumbs.length - 1 || _(E, L),
              class: "vuefinder__breadcrumb__item",
              title: D.basename,
              onClick: (E) => l(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: l(e).fs.adapter, path: D.path } })
            }, w(D.name), 41, Nc)
          ]))), 128))
        ], 512),
        l(e).fs.loading ? (f(), U(l(ns), { key: 0 })) : H("", !0)
      ], 512), [
        [ze, !l(e).fs.searchMode]
      ]),
      ue(r("div", Uc, [
        r("div", null, [
          j(l(xc))
        ]),
        ue(r("input", {
          ref_key: "searchInput",
          ref: S,
          onKeydown: Tt(B, ["esc"]),
          onBlur: I,
          "onUpdate:modelValue": k[10] || (k[10] = (D) => No(C) ? C.value = D : null),
          placeholder: l(n)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, Pc), [
          [Dt, l(C)]
        ]),
        j(l(Ec), { onClick: B })
      ], 512), [
        [ze, l(e).fs.searchMode]
      ]),
      ue(r("div", qc, [
        (f(!0), g(Se, null, Ce(l(e).fs.hiddenBreadcrumbs, (D, L) => (f(), g("div", {
          key: L,
          onDragover: k[11] || (k[11] = (E) => m(E)),
          onDragleave: k[12] || (k[12] = (E) => u(E)),
          onDrop: (E) => v(E, L),
          onClick: (E) => y(D),
          class: "vuefinder__breadcrumb__hidden-item"
        }, [
          r("div", Gc, [
            r("span", null, [
              j(l(gn), { class: "vuefinder__breadcrumb__hidden-item-icon" })
            ]),
            k[15] || (k[15] = Y()),
            r("span", jc, w(D.name), 1)
          ])
        ], 40, zc))), 128))
      ], 512), [
        [ze, l(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, Eo = (t, e = null) => new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), Wc = ["onClick"], Yc = {
  __name: "Toast",
  setup(t) {
    const e = le("ServiceContainer"), { getStore: n } = e.storage, o = M(n("full-screen", !1)), s = M([]), a = (i) => i === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", c = (i) => {
      s.value.splice(i, 1);
    }, d = (i) => {
      let v = s.value.findIndex((_) => _.id === i);
      v !== -1 && c(v);
    };
    return e.emitter.on("vf-toast-clear", () => {
      s.value = [];
    }), e.emitter.on("vf-toast-push", (i) => {
      let v = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      i.id = v, s.value.push(i), setTimeout(() => {
        d(v);
      }, 5e3);
    }), (i, v) => (f(), g("div", {
      class: ye(["vuefinder__toast", o.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      j(Uo, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: X(() => [
          (f(!0), g(Se, null, Ce(s.value, (_, m) => (f(), g("div", {
            key: m,
            onClick: (u) => c(m),
            class: ye(["vuefinder__toast__message", a(_.type)])
          }, w(_.label), 11, Wc))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}, Xc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Jc(t, e) {
  return f(), g("svg", Xc, e[0] || (e[0] = [
    r("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const Qc = { render: Jc }, Zc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function ed(t, e) {
  return f(), g("svg", Zc, e[0] || (e[0] = [
    r("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const td = { render: ed }, Kt = {
  __name: "SortIcon",
  props: { direction: String },
  setup(t) {
    return (e, n) => (f(), g("div", null, [
      t.direction === "asc" ? (f(), U(l(Qc), { key: 0 })) : H("", !0),
      t.direction === "desc" ? (f(), U(l(td), { key: 1 })) : H("", !0)
    ]));
  }
}, nd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
};
function sd(t, e) {
  return f(), g("svg", nd, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ]));
}
const od = { render: sd }, rd = { class: "vuefinder__item-icon" }, En = {
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
    return (e, n) => (f(), g("span", rd, [
      t.type === "dir" ? (f(), U(l(gn), {
        key: 0,
        class: ye(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"])) : (f(), U(l(od), {
        key: 1,
        class: ye(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"]))
    ]));
  }
}, ld = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
};
function ad(t, e) {
  return f(), g("svg", ld, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ]));
}
const id = { render: ad }, cd = { class: "vuefinder__drag-item__container" }, dd = { class: "vuefinder__drag-item__count" }, ud = {
  __name: "DragItem",
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(t) {
    const e = t;
    return (n, o) => (f(), g("div", cd, [
      j(l(id)),
      r("div", dd, w(e.count), 1)
    ]));
  }
}, vd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function fd(t, e) {
  return f(), g("svg", vd, e[0] || (e[0] = [
    r("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ]));
}
const Ao = { render: fd }, _d = ["data-type", "data-item", "data-index"], An = {
  __name: "Item",
  props: {
    item: { type: Object },
    index: { type: Number },
    dragImage: { type: Object }
  },
  emits: ["open"],
  setup(t, { emit: e }) {
    const n = le("ServiceContainer"), o = n.dragSelect, s = t, a = (h) => {
      h.type === "dir" ? (n.emitter.emit("vf-search-exit"), n.emitter.emit("vf-fetch", { params: { q: "index", adapter: n.fs.adapter, path: h.path } })) : n.emitter.emit("openfile", h);
    }, c = {
      mounted(h, y, $, O) {
        $.props.draggable && (h.addEventListener("dragstart", (S) => d(S, y.value)), h.addEventListener("dragover", (S) => v(S, y.value)), h.addEventListener("drop", (S) => i(S, y.value)));
      },
      beforeUnmount(h, y, $, O) {
        $.props.draggable && (h.removeEventListener("dragstart", d), h.removeEventListener("dragover", v), h.removeEventListener("drop", i));
      }
    }, d = (h, y) => {
      if (h.altKey || h.ctrlKey || h.metaKey)
        return h.preventDefault(), !1;
      o.isDraggingRef.value = !0, h.dataTransfer.setDragImage(s.dragImage.$el, 0, 15), h.dataTransfer.effectAllowed = "all", h.dataTransfer.dropEffect = "copy", h.dataTransfer.setData("items", JSON.stringify(o.getSelected()));
    }, i = (h, y) => {
      h.preventDefault(), o.isDraggingRef.value = !1;
      let $ = JSON.parse(h.dataTransfer.getData("items"));
      if ($.find((O) => O.storage !== n.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      n.modal.open(zn, { items: { from: $, to: y } });
    }, v = (h, y) => {
      h.preventDefault(), !y || y.type !== "dir" || o.getSelection().find(($) => $ === h.currentTarget) ? (h.dataTransfer.dropEffect = "none", h.dataTransfer.effectAllowed = "none") : h.dataTransfer.dropEffect = "copy";
    };
    let _ = null, m = !1;
    const u = () => {
      _ && clearTimeout(_);
    }, p = (h) => {
      if (!m)
        m = !0, setTimeout(() => m = !1, 300);
      else
        return m = !1, a(s.item), clearTimeout(_), !1;
      _ = setTimeout(() => {
        const y = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: h.target.getBoundingClientRect().x,
          clientY: h.target.getBoundingClientRect().y
        });
        h.target.dispatchEvent(y);
      }, 500);
    };
    return (h, y) => ue((f(), g("div", {
      style: rn({ opacity: l(o).isDraggingRef.value && l(o).getSelection().find(($) => h.$el === $) ? "0.5 !important" : "" }),
      class: ye(["vuefinder__item", "vf-item-" + l(o).explorerId]),
      "data-type": t.item.type,
      key: t.item.path,
      "data-item": JSON.stringify(t.item),
      "data-index": t.index,
      onDblclick: y[0] || (y[0] = ($) => a(t.item)),
      onTouchstart: y[1] || (y[1] = ($) => p($)),
      onTouchend: y[2] || (y[2] = ($) => u()),
      onContextmenu: y[3] || (y[3] = Ot(($) => l(n).emitter.emit("vf-contextmenu-show", { event: $, items: l(o).getSelected(), target: t.item }), ["prevent"]))
    }, [
      Rt(h.$slots, "default"),
      l(n).pinnedFolders.find(($) => $.path === t.item.path) ? (f(), U(l(Ao), {
        key: 0,
        class: "vuefinder__item--pinned"
      })) : H("", !0)
    ], 46, _d)), [
      [c, t.item]
    ]);
  }
}, md = { class: "vuefinder__explorer__container" }, pd = {
  key: 0,
  class: "vuefinder__explorer__header"
}, hd = { class: "vuefinder__explorer__drag-item" }, gd = { class: "vuefinder__explorer__item-list-content" }, bd = { class: "vuefinder__explorer__item-list-name" }, wd = { class: "vuefinder__explorer__item-name" }, yd = { class: "vuefinder__explorer__item-path" }, kd = { class: "vuefinder__explorer__item-list-content" }, Sd = { class: "vuefinder__explorer__item-list-name" }, xd = { class: "vuefinder__explorer__item-name" }, $d = { class: "vuefinder__explorer__item-size" }, Cd = { class: "vuefinder__explorer__item-date" }, Ed = {
  class: "vuefinder__explorer__item-grid-content flex",
  style: { "justify-content": "center", "align-items": "center" }
}, Ad = ["data-src", "alt"], Td = {
  key: 2,
  class: "vuefinder__explorer__item-extension",
  style: { position: "relative", "font-size": "16px", top: "10px", "font-weight": "bold", "text-align": "left" }
}, Dd = {
  key: 0,
  class: "vuefinder__explorer__item-title break-all"
}, Vd = {
  key: 1,
  class: "vuefinder__explorer__item-title break-all"
}, Ld = {
  __name: "Explorer",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, o = (m) => m == null ? void 0 : m.substring(0, 4), s = M(null), a = M(""), c = e.dragSelect;
    let d;
    e.emitter.on("vf-fullscreen-toggle", () => {
      c.area.value.style.height = null;
    }), e.emitter.on("vf-search-query", ({ newQuery: m }) => {
      a.value = m, m ? e.emitter.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname,
          filter: m
        },
        onSuccess: (u) => {
          u.files.length || e.emitter.emit("vf-toast-push", { label: n("No search result found.") });
        }
      }) : e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    });
    const i = vt({ active: !1, column: "", order: "" }), v = (m = !0) => {
      let u = [...e.fs.data.files], p = i.column, h = i.order === "asc" ? 1 : -1;
      if (!m)
        return u;
      const y = ($, O) => typeof $ == "string" && typeof O == "string" ? $.toLowerCase().localeCompare(O.toLowerCase()) : $ < O ? -1 : $ > O ? 1 : 0;
      return i.active && (u = u.slice().sort(($, O) => y($[p], O[p]) * h)), u;
    }, _ = (m) => {
      i.active && i.column === m ? (i.active = i.order === "asc", i.column = m, i.order = "desc") : (i.active = !0, i.column = m, i.order = "asc");
    };
    return Ee(() => {
      d = new Wo(c.area.value);
    }), Ts(() => {
      d.update();
    }), Ho(() => {
      d.destroy();
    }), (m, u) => (f(), g("div", md, [
      l(e).view === "list" || a.value.length ? (f(), g("div", pd, [
        r("div", {
          onClick: u[0] || (u[0] = (p) => _("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          Y(w(l(n)("Name")) + " ", 1),
          ue(j(Kt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [ze, i.active && i.column === "basename"]
          ])
        ]),
        a.value.length ? H("", !0) : (f(), g("div", {
          key: 0,
          onClick: u[1] || (u[1] = (p) => _("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          Y(w(l(n)("Size")) + " ", 1),
          ue(j(Kt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [ze, i.active && i.column === "file_size"]
          ])
        ])),
        a.value.length ? H("", !0) : (f(), g("div", {
          key: 1,
          onClick: u[2] || (u[2] = (p) => _("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          Y(w(l(n)("Date")) + " ", 1),
          ue(j(Kt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [ze, i.active && i.column === "last_modified"]
          ])
        ])),
        a.value.length ? (f(), g("div", {
          key: 2,
          onClick: u[3] || (u[3] = (p) => _("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          Y(w(l(n)("Filepath")) + " ", 1),
          ue(j(Kt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [ze, i.active && i.column === "path"]
          ])
        ])) : H("", !0)
      ])) : H("", !0),
      r("div", hd, [
        j(ud, {
          ref_key: "dragImage",
          ref: s,
          count: l(c).getCount()
        }, null, 8, ["count"])
      ]),
      r("div", {
        ref: l(c).scrollBarContainer,
        class: ye(["vf-explorer-scrollbar-container vuefinder__explorer__scrollbar-container", [{ "grid-view": l(e).view === "grid" }, { "search-active": a.value.length }]])
      }, [
        r("div", {
          ref: l(c).scrollBar,
          class: "vuefinder__explorer__scrollbar"
        }, null, 512)
      ], 2),
      r("div", {
        ref: l(c).area,
        class: "vuefinder__explorer__selector-area vf-explorer-scrollbar vf-selector-area",
        onContextmenu: u[4] || (u[4] = Ot((p) => l(e).emitter.emit("vf-contextmenu-show", { event: p, items: l(c).getSelected() }), ["self", "prevent"]))
      }, [
        a.value.length ? (f(!0), g(Se, { key: 0 }, Ce(v(), (p, h) => (f(), U(An, {
          item: p,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-list"
        }, {
          default: X(() => [
            r("div", gd, [
              r("div", bd, [
                j(En, {
                  type: p.type,
                  small: l(e).compactListView
                }, null, 8, ["type", "small"]),
                r("span", wd, w(p.basename), 1)
              ]),
              r("div", yd, w(p.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : H("", !0),
        l(e).view === "list" && !a.value.length ? (f(!0), g(Se, { key: 1 }, Ce(v(), (p, h) => (f(), U(An, {
          item: p,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-list",
          draggable: p.onlyRead ? "false" : "true",
          key: p.path
        }, {
          default: X(() => [
            r("div", kd, [
              r("div", Sd, [
                j(En, {
                  type: p.type,
                  small: l(e).compactListView
                }, null, 8, ["type", "small"]),
                r("span", xd, w(p.basename), 1)
              ]),
              r("div", $d, w(p.file_size ? l(e).filesize(p.file_size) : ""), 1),
              r("div", Cd, w(l(Eo)(p.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage", "draggable"]))), 128)) : H("", !0),
        l(e).view === "grid" && !a.value.length ? (f(!0), g(Se, { key: 2 }, Ce(v(!1), (p, h) => (f(), U(An, {
          item: p,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-grid",
          draggable: p.onlyRead ? "false" : "true"
        }, {
          default: X(() => [
            r("div", null, [
              r("div", Ed, [
                (p.mime_type ?? "").startsWith("image") && l(e).showThumbnails ? (f(), g("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "vuefinder__explorer__item-thumbnail lazy",
                  "data-src": l(e).requester.getPreviewUrl(l(e).fs.adapter, p),
                  alt: p.basename,
                  key: p.path
                }, null, 8, Ad)) : (f(), U(En, {
                  key: 1,
                  type: p.type
                }, null, 8, ["type"])),
                p.type !== "dir" ? (f(), g("div", Td, w(o(p.extension)), 1)) : H("", !0)
              ]),
              p.onlyRead ? (f(), g("span", Dd, w(l(Cs)("【只读】" + p.basename)), 1)) : (f(), g("span", Vd, w(l(Cs)(p.basename)), 1))
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage", "draggable"]))), 256)) : H("", !0)
      ], 544),
      j(Yc)
    ]));
  }
}, Md = { class: "vuefinder__text-preview" }, Od = { class: "vuefinder__text-preview__header" }, Rd = ["title"], Fd = { class: "vuefinder__text-preview__actions" }, Bd = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, Hd = { key: 1 }, Id = {
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = M(""), s = M(""), a = M(null), c = M(!1), d = M(""), i = M(!1), v = le("ServiceContainer"), { t: _ } = v.i18n;
    Ee(() => {
      v.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: v.modal.data.adapter, path: v.modal.data.item.path },
        responseType: "text"
      }).then((p) => {
        o.value = p, n("success");
      });
    });
    const m = () => {
      c.value = !c.value, s.value = o.value;
    }, u = () => {
      d.value = "", i.value = !1, v.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          adapter: v.modal.data.adapter,
          path: v.modal.data.item.path
        },
        body: {
          content: s.value
        },
        responseType: "text"
      }).then((p) => {
        d.value = _("Updated."), o.value = p, n("success"), c.value = !c.value;
      }).catch((p) => {
        d.value = _(p.message), i.value = !0;
      });
    };
    return (p, h) => (f(), g("div", Md, [
      r("div", Od, [
        r("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: l(v).modal.data.item.path
        }, w(l(v).modal.data.item.basename), 9, Rd),
        r("div", Fd, [
          c.value ? (f(), g("button", {
            key: 0,
            onClick: u,
            class: "vuefinder__text-preview__save-button"
          }, w(l(_)("Save")), 1)) : H("", !0),
          l(v).features.includes(l(de).EDIT) ? (f(), g("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: h[0] || (h[0] = (y) => m())
          }, w(c.value ? l(_)("Cancel") : l(_)("Edit")), 1)) : H("", !0)
        ])
      ]),
      r("div", null, [
        c.value ? (f(), g("div", Hd, [
          ue(r("textarea", {
            ref_key: "editInput",
            ref: a,
            "onUpdate:modelValue": h[1] || (h[1] = (y) => s.value = y),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Dt, s.value]
          ])
        ])) : (f(), g("pre", Bd, w(o.value), 1)),
        d.value.length ? (f(), U(Ze, {
          key: 2,
          onHidden: h[2] || (h[2] = (y) => d.value = ""),
          error: i.value
        }, {
          default: X(() => [
            Y(w(d.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : H("", !0)
      ])
    ]));
  }
}, Nd = { class: "vuefinder__image-preview" }, Ud = { class: "vuefinder__image-preview__header" }, Pd = ["title"], qd = { class: "vuefinder__image-preview__actions" }, zd = { class: "vuefinder__image-preview__image-container" }, Gd = ["src"], jd = {
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = le("ServiceContainer"), { t: s } = o.i18n, a = M(null), c = M(null), d = M(!1), i = M(""), v = M(!1), _ = () => {
      d.value = !d.value, d.value ? c.value = new Yo(a.value, {
        crop(u) {
        }
      }) : c.value.destroy();
    }, m = () => {
      c.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (u) => {
          i.value = "", v.value = !1;
          const p = new FormData();
          p.set("file", u), o.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: o.modal.data.adapter,
              path: o.modal.data.item.path
            },
            body: p
          }).then((h) => {
            i.value = s("Updated."), a.value.src = o.requester.getPreviewUrl(o.modal.data.adapter, o.modal.data.item), _(), n("success");
          }).catch((h) => {
            i.value = s(h.message), v.value = !0;
          });
        }
      );
    };
    return Ee(() => {
      n("success");
    }), (u, p) => (f(), g("div", Nd, [
      r("div", Ud, [
        r("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: l(o).modal.data.item.path
        }, w(l(o).modal.data.item.basename), 9, Pd),
        r("div", qd, [
          d.value ? (f(), g("button", {
            key: 0,
            onClick: m,
            class: "vuefinder__image-preview__crop-button"
          }, w(l(s)("Crop")), 1)) : H("", !0),
          l(o).features.includes(l(de).EDIT) ? (f(), g("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: p[0] || (p[0] = (h) => _())
          }, w(d.value ? l(s)("Cancel") : l(s)("Edit")), 1)) : H("", !0)
        ])
      ]),
      r("div", zd, [
        r("img", {
          ref_key: "image",
          ref: a,
          class: "vuefinder__image-preview__image",
          src: l(o).requester.getPreviewUrl(l(o).modal.data.adapter, l(o).modal.data.item),
          alt: ""
        }, null, 8, Gd)
      ]),
      i.value.length ? (f(), U(Ze, {
        key: 0,
        onHidden: p[1] || (p[1] = (h) => i.value = ""),
        error: v.value
      }, {
        default: X(() => [
          Y(w(i.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : H("", !0)
    ]));
  }
}, Kd = { class: "vuefinder__default-preview" }, Wd = { class: "vuefinder__default-preview__header" }, Yd = ["title"], Xd = {
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = le("ServiceContainer"), o = e;
    return Ee(() => {
      o("success");
    }), (s, a) => (f(), g("div", Kd, [
      r("div", Wd, [
        r("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: l(n).modal.data.item.path
        }, w(l(n).modal.data.item.basename), 9, Yd)
      ]),
      a[0] || (a[0] = r("div", null, null, -1))
    ]));
  }
}, Jd = { class: "vuefinder__video-preview" }, Qd = ["title"], Zd = {
  class: "vuefinder__video-preview__video",
  preload: "",
  controls: ""
}, eu = ["src"], tu = {
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = le("ServiceContainer"), o = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Ee(() => {
      o("success");
    }), (a, c) => (f(), g("div", Jd, [
      r("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: l(n).modal.data.item.path
      }, w(l(n).modal.data.item.basename), 9, Qd),
      r("div", null, [
        r("video", Zd, [
          r("source", {
            src: s(),
            type: "video/mp4"
          }, null, 8, eu),
          c[0] || (c[0] = Y(" Your browser does not support the video tag. "))
        ])
      ])
    ]));
  }
}, nu = { class: "vuefinder__audio-preview" }, su = ["title"], ou = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, ru = ["src"], lu = {
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = le("ServiceContainer"), s = () => o.requester.getPreviewUrl(o.modal.data.adapter, o.modal.data.item);
    return Ee(() => {
      n("success");
    }), (a, c) => (f(), g("div", nu, [
      r("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: l(o).modal.data.item.path
      }, w(l(o).modal.data.item.basename), 9, su),
      r("div", null, [
        r("audio", ou, [
          r("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, ru),
          c[0] || (c[0] = Y(" Your browser does not support the audio element. "))
        ])
      ])
    ]));
  }
}, au = { class: "vuefinder__pdf-preview" }, iu = ["title"], cu = ["data"], du = ["src"], uu = {
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = le("ServiceContainer"), o = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Ee(() => {
      o("success");
    }), (a, c) => (f(), g("div", au, [
      r("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: l(n).modal.data.item.path
      }, w(l(n).modal.data.item.basename), 9, iu),
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
          ]), 8, du)
        ], 8, cu)
      ])
    ]));
  }
}, vu = { class: "vuefinder__preview-modal__content" }, fu = { key: 0 }, _u = { class: "vuefinder__preview-modal__loading" }, mu = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, pu = { class: "vuefinder__preview-modal__details" }, hu = { class: "font-bold" }, gu = { class: "font-bold pl-2" }, bu = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, wu = ["download", "href"], yu = {
  __name: "ModalPreview",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, o = M(!1), s = (c) => (e.modal.data.item.mime_type ?? "").startsWith(c), a = e.features.includes(de.PREVIEW);
    return a || (o.value = !0), (c, d) => (f(), U(Qe, null, {
      buttons: X(() => [
        r("button", {
          type: "button",
          onClick: d[6] || (d[6] = (i) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(l(n)("Close")), 1),
        l(e).features.includes(l(de).DOWNLOAD) ? (f(), g("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: l(e).requester.getDownloadUrl(l(e).modal.data.adapter, l(e).modal.data.item),
          href: l(e).requester.getDownloadUrl(l(e).modal.data.adapter, l(e).modal.data.item)
        }, w(l(n)("Download")), 9, wu)) : H("", !0)
      ]),
      default: X(() => [
        r("div", null, [
          r("div", vu, [
            l(a) ? (f(), g("div", fu, [
              s("text") ? (f(), U(Id, {
                key: 0,
                onSuccess: d[0] || (d[0] = (i) => o.value = !0)
              })) : s("image") ? (f(), U(jd, {
                key: 1,
                onSuccess: d[1] || (d[1] = (i) => o.value = !0)
              })) : s("video") ? (f(), U(tu, {
                key: 2,
                onSuccess: d[2] || (d[2] = (i) => o.value = !0)
              })) : s("audio") ? (f(), U(lu, {
                key: 3,
                onSuccess: d[3] || (d[3] = (i) => o.value = !0)
              })) : s("application/pdf") ? (f(), U(uu, {
                key: 4,
                onSuccess: d[4] || (d[4] = (i) => o.value = !0)
              })) : (f(), U(Xd, {
                key: 5,
                onSuccess: d[5] || (d[5] = (i) => o.value = !0)
              }))
            ])) : H("", !0),
            r("div", _u, [
              o.value === !1 ? (f(), g("div", mu, [
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
              ])) : H("", !0)
            ])
          ])
        ]),
        r("div", pu, [
          r("div", null, [
            r("span", hu, w(l(n)("File Size")) + ": ", 1),
            Y(w(l(e).filesize(l(e).modal.data.item.file_size)), 1)
          ]),
          r("div", null, [
            r("span", gu, w(l(n)("Last Modified")) + ": ", 1),
            Y(" " + w(l(Eo)(l(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        l(e).features.includes(l(de).DOWNLOAD) ? (f(), g("div", bu, [
          r("span", null, w(l(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : H("", !0)
      ]),
      _: 1
    }));
  }
}, ku = ["href", "download"], Su = ["onClick"], xu = {
  __name: "ContextMenu",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, o = M(null), s = M([]), a = M(""), c = vt({
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
        action: () => e.modal.open($o)
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
          e.pinnedFolders = e.pinnedFolders.filter((u) => !s.value.find((p) => p.path === u.path)), e.storage.setStore("pinned-folders", e.pinnedFolders);
        }
      },
      delete: {
        key: de.DELETE,
        title: () => n("Delete"),
        action: () => {
          e.emitter.emit("delete-file", s);
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
        action: () => e.modal.open(yu, { adapter: e.fs.adapter, item: s.value[0] })
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
        action: () => e.modal.open(Si, { items: s })
      },
      unarchive: {
        key: de.UNARCHIVE,
        title: () => n("Unarchive"),
        action: () => e.modal.open(ui, { items: s })
      },
      rename: {
        key: de.RENAME,
        title: () => n("Rename"),
        action: () => e.modal.open(So, { items: s })
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
    }, v = (u) => {
      e.emitter.emit("vf-contextmenu-hide"), u.action();
    };
    e.emitter.on("vf-search-query", ({ newQuery: u }) => {
      a.value = u;
    });
    const _ = (u, p, h) => {
      p.some((y) => y.onlyRead) || s.value.some((y) => y.onlyRead) || u.push(h);
    };
    e.emitter.on("vf-contextmenu-show", ({ event: u, items: p, target: h = null }) => {
      if (c.items = [], a.value)
        if (h)
          c.items.push(i.openDir), e.emitter.emit("vf-context-selected", [h]);
        else
          return;
      else !h && !a.value ? (c.items.push(i.refresh), c.items.push(i.selectAll), c.items.push(i.newfolder), e.emitter.emit("vf-context-selected", [])) : p.length > 1 && p.some((y) => y.path === h.path) ? (c.items.push(i.refresh), _(c.items, [h], i.delete), c.items.push(i.setAllOnlyRead), e.emitter.emit("vf-context-selected", p)) : (h.type === "dir" ? (c.items.push(i.open), c.items.push(i.setAllOnlyRead), e.pinnedFolders.findIndex((y) => y.path === h.path) !== -1 ? c.items.push(i.unpinFolder) : c.items.push(i.pinFolder)) : (c.items.push(i.preview), c.items.push(i.download), c.items.push(i.setAllOnlyRead)), _(c.items, [h], i.rename), _(c.items, [h], i.delete), e.emitter.emit("vf-context-selected", [h]));
      m(u);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      c.active = !1;
    });
    const m = (u) => {
      const p = e.dragSelect.area.value, h = e.root.getBoundingClientRect(), y = p.getBoundingClientRect();
      let $ = u.clientX - h.left, O = u.clientY - h.top;
      c.active = !0, ct(() => {
        var B;
        const S = (B = o.value) == null ? void 0 : B.getBoundingClientRect();
        let b = (S == null ? void 0 : S.height) ?? 0, C = (S == null ? void 0 : S.width) ?? 0;
        $ = y.right - u.pageX + window.scrollX < C ? $ - C : $, O = y.bottom - u.pageY + window.scrollY < b ? O - b : O, c.positions = {
          left: $ + "px",
          top: O + "px"
        };
      });
    };
    return (u, p) => ue((f(), g("ul", {
      ref_key: "contextmenu",
      ref: o,
      style: rn(c.positions),
      class: "vuefinder__context-menu"
    }, [
      (f(!0), g(Se, null, Ce(d.value, (h) => (f(), g("li", {
        class: "vuefinder__context-menu__item",
        key: h.title
      }, [
        h.link ? (f(), g("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: h.link,
          download: h.link,
          onClick: p[0] || (p[0] = (y) => l(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          r("span", null, w(h.title()), 1)
        ], 8, ku)) : (f(), g("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (y) => v(h)
        }, [
          r("span", null, w(h.title()), 1)
        ], 8, Su))
      ]))), 128))
    ], 4)), [
      [ze, c.active]
    ]);
  }
}, $u = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Cu(t, e) {
  return f(), g("svg", $u, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ]));
}
const To = { render: Cu }, Eu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Au(t, e) {
  return f(), g("svg", Eu, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    }, null, -1)
  ]));
}
const Tu = { render: Au }, Du = { class: "vuefinder__status-bar__wrapper" }, Vu = { class: "vuefinder__status-bar__storage" }, Lu = ["title"], Mu = { class: "vuefinder__status-bar__storage-icon" }, Ou = ["value"], Ru = { class: "vuefinder__status-bar__info" }, Fu = { key: 0 }, Bu = { class: "vuefinder__status-bar__selected-count" }, Hu = { class: "vuefinder__status-bar__actions" }, Iu = ["disabled"], Nu = ["title"], Uu = {
  __name: "Statusbar",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, { setStore: o } = e.storage, s = e.dragSelect, a = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter } }), o("adapter", e.fs.adapter);
    }, c = M("");
    e.emitter.on("vf-search-query", ({ newQuery: i }) => {
      c.value = i;
    });
    const d = Xe(() => {
      const i = e.selectButton.multiple ? s.getSelected().length > 0 : s.getSelected().length === 1;
      return e.selectButton.active && i;
    });
    return (i, v) => (f(), g("div", Du, [
      r("div", Vu, [
        r("div", {
          class: "vuefinder__status-bar__storage-container",
          title: l(n)("Storage")
        }, [
          r("div", Mu, [
            j(l(To))
          ]),
          ue(r("select", {
            "onUpdate:modelValue": v[0] || (v[0] = (_) => l(e).fs.adapter = _),
            onChange: a,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (f(!0), g(Se, null, Ce(l(e).fs.data.storages, (_) => (f(), g("option", { value: _ }, w(_), 9, Ou))), 256))
          ], 544), [
            [Tn, l(e).fs.adapter]
          ])
        ], 8, Lu),
        r("div", Ru, [
          c.value.length ? (f(), g("span", Fu, w(l(e).fs.data.files.length) + " items found. ", 1)) : H("", !0),
          r("span", Bu, w(l(e).dragSelect.getCount() > 0 ? l(n)("%s item(s) selected.", l(e).dragSelect.getCount()) : ""), 1)
        ])
      ]),
      r("div", Hu, [
        l(e).selectButton.active ? (f(), g("button", {
          key: 0,
          class: ye(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: v[1] || (v[1] = (_) => l(e).selectButton.click(l(s).getSelected(), _))
        }, w(l(n)("Select")), 11, Iu)) : H("", !0),
        r("span", {
          class: "vuefinder__status-bar__about",
          title: l(n)("About"),
          onClick: v[2] || (v[2] = (_) => l(e).modal.open(ko))
        }, [
          j(l(Tu))
        ], 8, Nu)
      ])
    ]));
  }
}, Pu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
};
function qu(t, e) {
  return f(), g("svg", Pu, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ]));
}
const Do = { render: qu }, zu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Gu(t, e) {
  return f(), g("svg", zu, e[0] || (e[0] = [
    r("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ]));
}
const ju = { render: Gu }, Ku = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Wu(t, e) {
  return f(), g("svg", Ku, e[0] || (e[0] = [
    r("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M15 12H9M12 9v6" }, null, -1)
  ]));
}
const Vo = { render: Wu }, Yu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Xu(t, e) {
  return f(), g("svg", Yu, e[0] || (e[0] = [
    r("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M9 12h6" }, null, -1)
  ]));
}
const Lo = { render: Xu };
function Mo(t, e) {
  const n = t.findIndex((o) => o.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const Ju = { class: "vuefinder__folder-loader-indicator" }, Qu = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Oo = {
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ Po({
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
    const o = Vs(t, "modelValue"), s = M(!1);
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
        Mo(n.treeViewData, { path: e.path, ...d });
      }).catch((d) => {
      }).finally(() => {
        s.value = !1;
      });
    };
    return (d, i) => {
      var v;
      return f(), g("div", Ju, [
        s.value ? (f(), U(l(ns), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--loading"
        })) : (f(), g("div", Qu, [
          o.value && ((v = a()) != null && v.folders.length) ? (f(), U(l(Lo), {
            key: 0,
            class: "vuefinder__folder-loader-indicator--minus"
          })) : H("", !0),
          o.value ? H("", !0) : (f(), U(l(Vo), {
            key: 1,
            class: "vuefinder__folder-loader-indicator--plus"
          }))
        ]))
      ]);
    };
  }
}, Zu = { class: "vuefinder__treesubfolderlist__item-content" }, ev = ["onClick"], tv = ["title", "onClick"], nv = { class: "vuefinder__treesubfolderlist__item-icon" }, sv = { class: "vuefinder__treesubfolderlist__subfolder" }, ov = {
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
    const e = le("ServiceContainer"), n = M([]), o = t, s = M(null);
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
      const i = qo("TreeSubfolderList", !0);
      return f(), g("ul", {
        ref_key: "parentSubfolderList",
        ref: s,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (f(!0), g(Se, null, Ce(a.value, (v, _) => (f(), g("li", {
          key: v.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          r("div", Zu, [
            r("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (m) => n.value[v.path] = !n.value[v.path]
            }, [
              j(Oo, {
                adapter: t.adapter,
                path: v.path,
                modelValue: n.value[v.path],
                "onUpdate:modelValue": (m) => n.value[v.path] = m
              }, null, 8, ["adapter", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, ev),
            r("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: v.path,
              onClick: (m) => l(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o.adapter, path: v.path } })
            }, [
              r("div", nv, [
                l(e).fs.path === v.path ? (f(), U(l(Do), { key: 0 })) : (f(), U(l(gn), { key: 1 }))
              ]),
              r("div", {
                class: ye(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": l(e).fs.path === v.path
                }])
              }, w(v.basename), 3)
            ], 8, tv)
          ]),
          r("div", sv, [
            ue(j(i, {
              adapter: o.adapter,
              path: v.path
            }, null, 8, ["adapter", "path"]), [
              [ze, n.value[v.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}, rv = { class: "vuefinder__treestorageitem__loader" }, lv = {
  __name: "TreeStorageItem",
  props: {
    storage: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = le("ServiceContainer"), n = M(!1);
    return (o, s) => (f(), g(Se, null, [
      r("div", {
        onClick: s[1] || (s[1] = (a) => n.value = !n.value),
        class: "vuefinder__treestorageitem__header"
      }, [
        r("div", {
          class: ye(["vuefinder__treestorageitem__info", t.storage === l(e).fs.adapter ? "vuefinder__treestorageitem__info--active" : ""])
        }, [
          r("div", {
            class: ye(["vuefinder__treestorageitem__icon", t.storage === l(e).fs.adapter ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            j(l(To))
          ], 2),
          r("div", null, w(t.storage), 1)
        ], 2),
        r("div", rv, [
          j(Oo, {
            adapter: t.storage,
            path: t.storage + "://",
            modelValue: n.value,
            "onUpdate:modelValue": s[0] || (s[0] = (a) => n.value = a)
          }, null, 8, ["adapter", "path", "modelValue"])
        ])
      ]),
      ue(j(ov, {
        adapter: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["adapter", "path"]), [
        [ze, n.value]
      ])
    ], 64));
  }
}, av = { class: "vuefinder__folder-indicator" }, iv = { class: "vuefinder__folder-indicator--icon" }, cv = {
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = Vs(t, "modelValue");
    return (n, o) => (f(), g("div", av, [
      r("div", iv, [
        e.value ? (f(), U(l(Lo), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : H("", !0),
        e.value ? H("", !0) : (f(), U(l(Vo), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}, dv = { class: "vuefinder__treeview__header" }, uv = { class: "vuefinder__treeview__pinned-label" }, vv = { class: "vuefinder__treeview__pin-text text-nowrap" }, fv = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, _v = { class: "vuefinder__treeview__pinned-item" }, mv = ["onClick"], pv = ["title"], hv = ["onClick"], gv = { key: 0 }, bv = { class: "vuefinder__treeview__no-pinned" }, wv = { class: "vuefinder__treeview__storage" }, yv = {
  __name: "TreeView",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, { getStore: o, setStore: s } = e.storage, a = M(190), c = M(o("pinned-folders-opened", !0));
    Oe(c, (_) => s("pinned-folders-opened", _));
    const d = (_) => {
      e.pinnedFolders = e.pinnedFolders.filter((m) => m.path !== _.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, i = (_) => {
      const m = _.clientX, u = _.target.parentElement, p = u.getBoundingClientRect().width;
      u.classList.remove("transition-[width]"), u.classList.add("transition-none");
      const h = ($) => {
        a.value = p + $.clientX - m, a.value < 50 && (a.value = 0, e.showTreeView = !1), a.value > 50 && (e.showTreeView = !0);
      }, y = () => {
        const $ = u.getBoundingClientRect();
        a.value = $.width, u.classList.add("transition-[width]"), u.classList.remove("transition-none"), window.removeEventListener("mousemove", h), window.removeEventListener("mouseup", y);
      };
      window.addEventListener("mousemove", h), window.addEventListener("mouseup", y);
    }, v = M(null);
    return Ee(() => {
      Je(v.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), Oe(e.fs.data, (_, m) => {
      const u = _.files.filter((p) => p.type === "dir");
      Mo(e.treeViewData, { path: e.fs.path, folders: u.map((p) => ({
        adapter: p.storage,
        path: p.path,
        basename: p.basename
      })) });
    }), (_, m) => (f(), g(Se, null, [
      r("div", {
        onClick: m[0] || (m[0] = (u) => l(e).showTreeView = !l(e).showTreeView),
        class: ye(["vuefinder__treeview__overlay", l(e).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      r("div", {
        style: rn(l(e).showTreeView ? "min-width:100px;max-width:75%; width: " + a.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        r("div", {
          ref_key: "treeViewScrollElement",
          ref: v,
          class: "vuefinder__treeview__scroll"
        }, [
          r("div", dv, [
            r("div", {
              onClick: m[2] || (m[2] = (u) => c.value = !c.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              r("div", uv, [
                j(l(Ao), { class: "vuefinder__treeview__pin-icon" }),
                r("div", vv, w(l(n)("Pinned Folders")), 1)
              ]),
              j(cv, {
                modelValue: c.value,
                "onUpdate:modelValue": m[1] || (m[1] = (u) => c.value = u)
              }, null, 8, ["modelValue"])
            ]),
            c.value ? (f(), g("ul", fv, [
              (f(!0), g(Se, null, Ce(l(e).pinnedFolders, (u) => (f(), g("li", _v, [
                r("div", {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (p) => l(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: u.storage, path: u.path } })
                }, [
                  l(e).fs.path !== u.path ? (f(), U(l(gn), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : H("", !0),
                  l(e).fs.path === u.path ? (f(), U(l(Do), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : H("", !0),
                  r("div", {
                    title: u.path,
                    class: ye(["vuefinder__treeview__folder-name text-nowrap", {
                      "vuefinder__treeview__folder-name--active": l(e).fs.path === u.path
                    }])
                  }, w(u.basename), 11, pv)
                ], 8, mv),
                r("div", {
                  class: "vuefinder__treeview__remove-favorite",
                  onClick: (p) => d(u)
                }, [
                  j(l(ju), { class: "vuefinder__treeview__remove-icon" })
                ], 8, hv)
              ]))), 256)),
              l(e).pinnedFolders.length ? H("", !0) : (f(), g("li", gv, [
                r("div", bv, w(l(n)("No folders pinned")), 1)
              ]))
            ])) : H("", !0)
          ]),
          (f(!0), g(Se, null, Ce(l(e).fs.data.storages, (u) => (f(), g("div", wv, [
            j(lv, { storage: u }, null, 8, ["storage"])
          ]))), 256))
        ], 512),
        r("div", {
          onMousedown: i,
          class: ye([(l(e).showTreeView, ""), "vuefinder__treeview__resize-handle"])
        }, null, 34)
      ], 4)
    ], 64));
  }
}, kv = { class: "vuefinder__main__content" }, Sv = {
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
    showPath: {
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
  emits: ["select", "openFile", "fileDragEnd", "deleteFile"],
  setup(t, { expose: e, emit: n }) {
    const o = n, s = t, a = ll(s, le("VueFinderOptions"));
    zo("ServiceContainer", a);
    const { setStore: c } = a.storage, d = M(null);
    a.root = d;
    const i = a.dragSelect;
    Ua(a);
    const v = (p) => {
      p.files = p.files.map((h) => (h.onlyRead = a.onlyReadFileStore.hasItem(h.path), h)), Object.assign(a.fs.data, p), i.clearSelection(), i.refreshSelection();
    };
    let _;
    a.emitter.on("vf-fetch-abort", () => {
      _.abort(), a.fs.loading = !1;
    }), a.emitter.on("vf-fetch", ({ params: p, body: h = null, onSuccess: y = null, onError: $ = null, noCloseModal: O = !1 }) => {
      ["index", "search"].includes(p.q) && (_ && _.abort(), a.fs.loading = !0), _ = new AbortController();
      const S = _.signal;
      a.requester.send({
        url: "",
        method: p.m || "get",
        params: p,
        body: h,
        abortSignal: S
      }).then((b) => {
        a.fs.adapter = b.adapter, a.persist && (a.fs.path = b.dirname, c("path", a.fs.path)), ["index", "search"].includes(p.q) && (a.fs.loading = !1), O || a.modal.close(), v(b), y && y(b);
      }).catch((b) => {
        console.error(b), $ && $(b);
      });
    });
    const m = () => {
      s.minHeight == "0" || !d.value || (d.value.querySelectorAll(".vuefinder__main__container")[0].style.height = s.minHeight);
    }, u = () => {
      a.emitter.on("openfile", (p) => {
        o("openFile", p);
      }), a.emitter.on("file-drag-end", (p) => {
        o("fileDragEnd", p);
      }), a.emitter.on("delete-file", (p) => {
        o("deleteFile", p);
      });
    };
    return Ee(() => {
      let p = {};
      a.fs.path.includes("://") && (p = {
        adapter: a.fs.path.split("://")[0],
        path: a.fs.path
      }), a.emitter.emit("vf-fetch", { params: { q: "index", adapter: a.fs.adapter, ...p } }), i.onSelect((h) => {
        o("select", h);
      }), m(), u();
    }), e({
      app: a
    }), (p, h) => (f(), g("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: d,
      tabindex: "0"
    }, [
      r("div", {
        class: ye(l(a).theme.actualValue)
      }, [
        r("div", {
          class: ye([l(a).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          style: rn(l(a).fullScreen ? "" : "max-height: " + t.maxHeight),
          onMousedown: h[0] || (h[0] = (y) => l(a).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: h[1] || (h[1] = (y) => l(a).emitter.emit("vf-contextmenu-hide"))
        }, [
          t.simple ? H("", !0) : (f(), U(Wi, { key: 0 })),
          t.showPath ? (f(), U(Kc, { key: 1 })) : H("", !0),
          r("div", kv, [
            j(yv),
            j(Ld)
          ]),
          t.simple ? H("", !0) : (f(), U(Uu, { key: 2 }))
        ], 38),
        j(Go, { name: "fade" }, {
          default: X(() => [
            l(a).modal.visible ? (f(), U(Ds(l(a).modal.type), { key: 0 })) : H("", !0)
          ]),
          _: 1
        }),
        j(xu)
      ], 2)
    ], 512));
  }
}, Rv = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [n] = Object.keys(e.i18n);
    e.locale = e.locale ?? n ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", Sv);
  }
};
export {
  Rv as default
};
