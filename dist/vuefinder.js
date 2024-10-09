var Bo = Object.defineProperty;
var Fo = (t, e, n) => e in t ? Bo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var os = (t, e, n) => Fo(t, typeof e != "symbol" ? e + "" : e, n);
import { reactive as vt, watch as Oe, ref as O, shallowRef as Ho, onMounted as Ee, onUnmounted as Gn, onUpdated as Ts, nextTick as ct, computed as Xe, inject as le, openBlock as v, createElementBlock as g, withKeys as Tt, unref as l, createElementVNode as r, withModifiers as Ot, renderSlot as Rt, normalizeClass as ye, toDisplayString as w, createBlock as U, resolveDynamicComponent as Ds, withCtx as X, createVNode as j, Fragment as Se, renderList as Ce, createCommentVNode as I, withDirectives as ue, vModelCheckbox as zt, createTextVNode as Y, vModelSelect as Tn, vModelText as Dt, onBeforeUnmount as Io, customRef as No, vShow as ze, isRef as Uo, TransitionGroup as Po, normalizeStyle as rn, mergeModels as qo, useModel as Vs, resolveComponent as zo, provide as Go, Transition as jo } from "vue";
import Wo from "mitt";
import Ko from "dragselect";
import Tv from "@uppy/core";
import Vv from "@uppy/xhr-upload";
import Yo from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import Xo from "cropperjs";
var As;
const yn = (As = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : As.getAttribute("content");
class Jo {
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
    let u;
    i !== "get" && (c instanceof FormData ? (u = c, n.body != null && Object.entries(this.config.body).forEach(([m, f]) => {
      u.append(m, f);
    })) : (u = { ...c }, n.body != null && Object.assign(u, this.config.body)));
    const _ = {
      url: d,
      method: i,
      headers: s,
      params: a,
      body: u
    };
    if (n.transformRequest != null) {
      const m = n.transformRequest({
        url: d,
        method: i,
        headers: s,
        params: a,
        body: u
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
function Qo(t) {
  const e = {
    baseUrl: "",
    headers: {},
    params: {},
    body: {},
    xsrfHeaderName: "X-CSRF-Token"
  };
  return typeof t == "string" ? Object.assign(e, { baseUrl: t }) : Object.assign(e, t), new Jo(e);
}
function Zo(t) {
  let e = localStorage.getItem(t + "_storage");
  const n = vt(JSON.parse(e ?? "{}"));
  Oe(n, o);
  function o() {
    Object.keys(n).length ? localStorage.setItem(t + "_storage", JSON.stringify(n)) : localStorage.removeItem(t + "_storage");
  }
  function s(i, u) {
    n[i] = u;
  }
  function a(i) {
    delete n[i];
  }
  function c() {
    Object.keys(n).map((i) => a(i));
  }
  return { getStore: (i, u = null) => n.hasOwnProperty(i) ? n[i] : u, setStore: s, removeStore: a, clearStore: c };
}
async function er(t, e) {
  const n = e[t];
  return typeof n == "function" ? (await n()).default : n;
}
function tr(t, e, n, o) {
  const { getStore: s, setStore: a } = t, c = O({}), d = O(s("locale", e)), i = (m, f = e) => {
    er(m, o).then((p) => {
      c.value = p, a("locale", m), d.value = m, a("translations", p), Object.values(o).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + m }), n.emit("vf-language-saved"));
    }).catch((p) => {
      f ? (n.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), i(f, null)) : n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  Oe(d, (m) => {
    i(m);
  }), !s("locale") && !o.length ? i(e) : c.value = s("translations");
  const u = (m, ...f) => f.length ? u(m = m.replace("%s", f.shift()), ...f) : m;
  function _(m, ...f) {
    return c.value && c.value.hasOwnProperty(m) ? u(c.value[m], ...f) : u(m, ...f);
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
}, nr = Object.values(de), sr = "2.5.16";
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
function or(t, e) {
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
function rr() {
  const t = Ho(null), e = O(!1), n = O();
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
    const f = a, p = _, h = m || (o ? !o(f, p) : f !== p);
    return (h || s) && (a = p, c = f), [a, h, c];
  };
  return [e ? (_) => d(e(a, c), _) : d, (_) => [a, !!_, c]];
}, Os = typeof window < "u" && typeof document < "u", De = Os ? window : {}, Kt = Math.max, lr = Math.min, Dn = Math.round, Rs = De.cancelAnimationFrame, Bs = De.requestAnimationFrame, Jt = De.setTimeout, Vn = De.clearTimeout, ln = (t) => typeof De[t] < "u" ? De[t] : void 0, ar = ln("MutationObserver"), rs = ln("IntersectionObserver"), Qt = ln("ResizeObserver"), Ln = ln("ScrollTimeline"), Fs = Os && Node.ELEMENT_NODE, { toString: ir, hasOwnProperty: kn } = Object.prototype, cr = /^\[object (.+)\]$/, Ht = (t) => t === void 0, an = (t) => t === null, dr = (t) => Ht(t) || an(t) ? `${t}` : ir.call(t).replace(cr, "$1").toLowerCase(), Ge = (t) => typeof t == "number", cn = (t) => typeof t == "string", Hs = (t) => typeof t == "boolean", je = (t) => typeof t == "function", Ue = (t) => Array.isArray(t), Bt = (t) => typeof t == "object" && !Ue(t) && !an(t), dn = (t) => {
  const e = !!t && t.length, n = Ge(e) && e > -1 && e % 1 == 0;
  return Ue(t) || !je(t) && n ? e > 0 && Bt(t) ? e - 1 in t : !0 : !1;
}, Zt = (t) => {
  if (!t || !Bt(t) || dr(t) !== "object")
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
const vn = (t, e) => t.indexOf(e) >= 0, Ye = (t, e) => t.concat(e), _e = (t, e, n) => (!cn(e) && dn(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), ft = (t) => Array.from(t || []), Is = (t) => Ue(t) ? t : [t], Mn = (t) => !!t && !t.length, ls = (t) => ft(new Set(t)), Re = (t, e, n) => {
  se(t, (s) => s && s.apply(void 0, e || [])), !n && (t.length = 0);
}, Ns = "paddingTop", Us = "paddingRight", Ps = "paddingLeft", qs = "paddingBottom", zs = "marginLeft", Gs = "marginRight", js = "marginBottom", fn = "overflowX", _n = "overflowY", St = "width", xt = "height", $t = "hidden", Ws = "visible", jn = (t, e, n, o) => {
  if (t && e) {
    let s = !0;
    return se(n, (a) => {
      const c = t[a], d = e[a];
      c !== d && (s = !1);
    }), s;
  }
  return !1;
}, Ks = (t, e) => jn(t, e, ["w", "h"]), Ys = (t, e) => jn(t, e, ["x", "y"]), ur = (t, e) => jn(t, e, ["t", "r", "b", "l"]), Ne = () => {
}, K = (t, ...e) => t.bind(0, ...e), gt = (t) => {
  let e;
  const n = t ? Jt : Bs, o = t ? Vn : Rs;
  return [(s) => {
    o(e), e = n(s, je(t) ? t() : t);
  }, () => o(e)];
}, Xs = (t, e) => {
  let n, o, s, a = Ne;
  const { v: c, p: d, S: i } = e || {}, u = function(h) {
    a(), Vn(n), n = o = void 0, a = Ne, t.apply(this, h);
  }, _ = (p) => i && o ? i(o, p) : p, m = () => {
    a !== Ne && u(_(s) || s);
  }, f = function() {
    const h = ft(arguments), y = je(c) ? c() : c;
    if (Ge(y) && y >= 0) {
      const R = je(d) ? d() : d, k = Ge(R) && R >= 0, b = y > 0 ? Jt : Bs, $ = y > 0 ? Vn : Rs, B = _(h) || h, D = u.bind(0, B);
      a();
      const x = b(D, y);
      a = () => $(x), k && !n && (n = Jt(m, R)), o = s = B;
    } else
      u(h);
  };
  return f.m = m, f;
}, Js = (t, e) => Object.prototype.hasOwnProperty.call(t, e), st = (t) => t ? Object.keys(t) : [], ne = (t, e, n, o, s, a, c) => {
  const d = [e, n, o, s, a, c];
  return (typeof t != "object" || an(t)) && !je(t) && (t = {}), se(d, (i) => {
    se(i, (u, _) => {
      const m = i[_];
      if (t === m)
        return !0;
      const f = Ue(m);
      if (m && Zt(m)) {
        const p = t[_];
        let h = p;
        f && !Ue(p) ? h = [] : !f && !Zt(p) && (h = {}), t[_] = ne(h, m);
      } else
        t[_] = f ? m.slice() : m;
    });
  }), t;
}, Qs = (t, e) => se(ne({}, t), (n, o, s) => {
  n === void 0 ? delete s[o] : n && Zt(n) && (s[o] = Qs(n));
}), Wn = (t) => {
  for (const e in t)
    return !1;
  return !0;
}, On = (t, e, n) => Kt(t, lr(e, n)), dt = (t) => ft(new Set((Ue(t) ? t : (t || "").split(" ")).filter((e) => e))), mn = (t, e) => t && t.getAttribute(e), as = (t, e) => t && t.hasAttribute(e), He = (t, e, n) => {
  se(dt(e), (o) => {
    t && t.setAttribute(o, n || "");
  });
}, qe = (t, e) => {
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
}, vr = (t, e, n) => pn(t, e).C(n), eo = (t) => pn(t, "class"), Kn = (t, e) => {
  eo(t).$(e);
}, tn = (t, e) => (eo(t).O(e), K(Kn, t, e)), to = (t, e) => {
  const n = [], o = e ? un(e) && e : document;
  return o ? _e(n, o.querySelectorAll(t)) : n;
}, fr = (t, e) => {
  const n = e ? un(e) && e : document;
  return n ? n.querySelector(t) : null;
}, nn = (t, e) => un(t) ? t.matches(e) : !1, no = (t) => nn(t, "body"), Rn = (t) => t ? ft(t.childNodes) : [], Ct = (t) => t && t.parentElement, bt = (t, e) => un(t) && t.closest(e), Bn = (t) => document.activeElement, _r = (t, e, n) => {
  const o = bt(t, e), s = t && fr(n, o), a = bt(s, e) === o;
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
}, mr = /^--/, cs = (t, e) => t.getPropertyValue(e) || t[e] || "", Yn = (t) => {
  const e = t || 0;
  return isFinite(e) ? e : 0;
}, Gt = (t) => Yn(parseFloat(t || "")), ds = (t) => `${(Yn(t) * 100).toFixed(3)}%`, Fn = (t) => `${Yn(t)}px`;
function Et(t, e) {
  t && se(e, (n, o) => {
    try {
      const s = t.style, a = Ge(n) ? Fn(n) : (n || "") + "";
      mr.test(o) ? s.setProperty(o, a) : s[o] = a;
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
  const o = e ? `${e}-` : "", s = n ? `-${n}` : "", a = `${o}top${s}`, c = `${o}right${s}`, d = `${o}bottom${s}`, i = `${o}left${s}`, u = ut(t, [a, c, d, i]);
  return {
    t: Gt(u[a]),
    r: Gt(u[c]),
    b: Gt(u[d]),
    l: Gt(u[i])
  };
}, Sn = (t, e) => `translate${Bt(t) ? `(${t.x},${t.y})` : `${e ? "X" : "Y"}(${t})`}`, pr = {
  w: 0,
  h: 0
}, hn = (t, e) => e ? {
  w: e[`${t}Width`],
  h: e[`${t}Height`]
} : pr, hr = (t) => hn("inner", t || De), Mt = K(hn, "offset"), ro = K(hn, "client"), Hn = K(hn, "scroll"), Xn = (t) => {
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
  return K(Re, dt(e).map((u) => {
    const _ = d ? (m) => {
      vs(t, u, _, c), n(m);
    } : n;
    return t.addEventListener(u, _, i), K(vs, t, u, _, c);
  }));
}, Jn = (t) => t.stopPropagation(), fs = (t) => t.preventDefault(), gr = {
  x: 0,
  y: 0
}, xn = (t) => {
  const e = t && yt(t);
  return e ? {
    x: e.left + De.scrollX,
    y: e.top + De.scrollY
  } : gr;
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
      const u = e.get(a) || /* @__PURE__ */ new Set();
      return e.set(a, u), ps((_) => {
        je(_) && u.add(_);
      }, c), K(n, a, c);
    }
    Hs(c) && c && n();
    const d = st(a), i = [];
    return se(d, (u) => {
      const _ = a[u];
      _ && _e(i, o(u, _));
    }), K(Re, i);
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
}), gs = (t, e) => t ? `${e}`.split(".").reduce((n, o) => n && Js(n, o) ? n[o] : void 0, t) : void 0, br = {
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
}, bs = (t, e, n) => (o) => [gs(t, o), n || gs(e, o) !== void 0], It = "data-overlayscrollbars", Xt = "os-environment", jt = `${Xt}-scrollbar-hidden`, $n = `${It}-initialize`, Ae = It, io = `${Ae}-overflow-x`, co = `${Ae}-overflow-y`, uo = "overflowVisible", wr = "scrollbarPressed", Un = "updating", yr = "body", Ke = `${It}-viewport`, kr = "arrange", vo = "scrollbarHidden", kt = uo, Pn = `${It}-padding`, Sr = kt, ws = `${It}-content`, Qn = "os-size-observer", xr = `${Qn}-appear`, $r = `${Qn}-listener`, Cr = "os-trinsic-observer", Er = "os-theme-none", Ve = "os-scrollbar", Ar = `${Ve}-rtl`, Tr = `${Ve}-horizontal`, Dr = `${Ve}-vertical`, fo = `${Ve}-track`, Zn = `${Ve}-handle`, Vr = `${Ve}-visible`, Lr = `${Ve}-cornerless`, ys = `${Ve}-interaction`, ks = `${Ve}-unusable`, qn = `${Ve}-auto-hide`, Ss = `${qn}-hidden`, xs = `${Ve}-wheel`, Mr = `${fo}-interactive`, Or = `${Zn}-interactive`, _o = {}, mo = {}, Rr = (t) => {
  se(t, (e) => se(e, (n, o) => {
    _o[o] = e[o];
  }));
}, po = (t, e, n) => st(t).map((o) => {
  const { static: s, instance: a } = t[o], [c, d, i] = n || [], u = n ? a : s;
  if (u) {
    const _ = n ? u(c, d, e) : u(e);
    return (i || mo)[o] = _;
  }
}), Vt = (t) => mo[t], Br = "__osOptionsValidationPlugin", Fr = "__osSizeObserverPlugin", Hr = (t, e) => {
  const { T: n } = e, [o, s] = t("showNativeOverlaidScrollbars");
  return [o && n.x && n.y, s];
}, on = (t) => t.indexOf(Ws) === 0, ho = (t, e) => {
  const { D: n } = t, o = (i) => {
    const u = ut(n, i), m = (e ? e[i] : u) === "scroll";
    return [u, m];
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
}, Ir = (t, e, n, o) => {
  const s = e.x || e.y, a = (_, m) => {
    const f = on(_), p = f && s ? "hidden" : "", h = m && f && _.replace(`${Ws}-`, "") || p;
    return [m && !f ? _ : "", on(h) ? "hidden" : h];
  }, [c, d] = a(n.x, e.x), [i, u] = a(n.y, e.y);
  return o[fn] = d && i ? d : c, o[_n] = u && c ? u : i, ho(t, o);
}, es = "__osScrollbarsHidingPlugin", Nr = "__osClickScrollPlugin";
let Cn;
const Ur = () => {
  const t = (b, $, L) => {
    Te(document.body, b), Te(document.body, b);
    const B = ro(b), D = Mt(b), x = Xn($);
    return L && ot(b), {
      x: D.h - B.h + x.h,
      y: D.w - B.w + x.w
    };
  }, e = (b) => {
    let $ = !1;
    const L = tn(b, jt);
    try {
      $ = ut(b, "scrollbar-width") === "none" || ut(b, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return L(), $;
  }, n = (b, $) => {
    Et(b, {
      [fn]: $t,
      [_n]: $t,
      direction: "rtl"
    }), rt(b, {
      x: 0
    });
    const L = xn(b), B = xn($);
    rt(b, {
      x: -999
    });
    const D = xn($);
    return {
      i: L.x === B.x,
      n: B.x !== D.x
    };
  }, o = `.${Xt}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Xt} div{width:200%;height:200%;margin:10px 0}.${jt}{scrollbar-width:none!important}.${jt}::-webkit-scrollbar,.${jt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, a = oo(`<div class="${Xt}"><div></div><style>${o}</style></div>`)[0], c = a.firstChild, [d, , i] = Nn(), [u, _] = Ie({
    o: t(a, c),
    u: Ys
  }, K(t, a, c, !0)), [m] = _(), f = e(a), p = {
    x: m.x === 0,
    y: m.y === 0
  }, h = {
    elements: {
      host: null,
      padding: !f,
      viewport: (b) => f && no(b) && b,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, y = ne({}, br), S = K(ne, {}, y), R = K(ne, {}, h), k = {
    P: m,
    T: p,
    L: f,
    J: !!Ln,
    K: n(a, c),
    Z: K(d, "r"),
    G: R,
    tt: (b) => ne(h, b) && R(),
    nt: S,
    ot: (b) => ne(y, b) && S(),
    st: ne({}, h),
    et: ne({}, y)
  };
  return qe(a, "style"), ot(a), De.addEventListener("resize", () => {
    let b;
    if (!f && (!p.x || !p.y)) {
      const $ = Vt(es);
      b = !!($ ? $.Y() : Ne)(k, u);
    }
    i("r", [b]);
  }), k;
}, Be = () => (Cn || (Cn = Ur()), Cn), go = (t, e) => je(e) ? e.apply(0, t) : e, Pr = (t, e, n, o) => {
  const s = Ht(o) ? n : o;
  return go(t, s) || e.apply(0, t);
}, bo = (t, e, n, o) => {
  const s = Ht(o) ? n : o, a = go(t, s);
  return !!a && (en(a) ? a : e.apply(0, t));
}, qr = (t, e) => {
  const { nativeScrollbarsOverlaid: n, body: o } = e || {}, { T: s, L: a, G: c } = Be(), { nativeScrollbarsOverlaid: d, body: i } = c().cancel, u = n ?? d, _ = Ht(o) ? i : o, m = (s.x || s.y) && u, f = t && (an(_) ? !a : _);
  return !!m || !!f;
}, ts = /* @__PURE__ */ new WeakMap(), zr = (t, e) => {
  ts.set(t, e);
}, Gr = (t) => {
  ts.delete(t);
}, wo = (t) => ts.get(t), jr = (t, e, n) => {
  let o = !1;
  const s = n ? /* @__PURE__ */ new WeakMap() : !1, a = () => {
    o = !0;
  }, c = (d) => {
    if (s && n) {
      const i = n.map((u) => {
        const [_, m] = u || [];
        return [m && _ ? (d || to)(_, t) : [], m];
      });
      se(i, (u) => se(u[0], (_) => {
        const m = u[1], f = s.get(_) || [];
        if (t.contains(_) && m) {
          const h = fe(_, m, (y) => {
            o ? (h(), s.delete(_)) : e(y);
          });
          s.set(_, _e(f, h));
        } else
          Re(f), s.delete(_);
      }));
    }
  };
  return c(), [a, c];
}, $s = (t, e, n, o) => {
  let s = !1;
  const { ct: a, rt: c, lt: d, it: i, ut: u, dt: _ } = o || {}, m = Xs(() => s && n(!0), {
    v: 33,
    p: 99
  }), [f, p] = jr(t, m, d), h = a || [], y = c || [], S = Ye(h, y), R = (b, $) => {
    if (!Mn($)) {
      const L = u || Ne, B = _ || Ne, D = [], x = [];
      let A = !1, M = !1;
      if (se($, (V) => {
        const { attributeName: P, target: H, type: W, oldValue: Q, addedNodes: oe, removedNodes: G } = V, Z = W === "attributes", ve = W === "childList", z = t === H, ie = Z && P, ae = ie && mn(H, P || "") || null, ce = ie && Q !== ae, ke = vn(y, P) && ce;
        if (e && (ve || !z)) {
          const ge = Z && ce, me = ge && i && nn(H, i), T = (me ? !L(H, P, Q, ae) : !Z || ge) && !B(V, !!me, t, o);
          se(oe, (E) => _e(D, E)), se(G, (E) => _e(D, E)), M = M || T;
        }
        !e && z && ce && !L(H, P, Q, ae) && (_e(x, P), A = A || ke);
      }), p((V) => ls(D).reduce((P, H) => (_e(P, to(V, H)), nn(H, V) ? _e(P, H) : P), [])), e)
        return !b && M && n(!1), [!1];
      if (!Mn(x) || A) {
        const V = [ls(x), A];
        return !b && n.apply(0, V), V;
      }
    }
  }, k = new ar(K(R, !1));
  return [() => (k.observe(t, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: S,
    subtree: e,
    childList: e,
    characterData: e
  }), s = !0, () => {
    s && (f(), k.disconnect(), s = !1);
  }), () => {
    if (s)
      return m.m(), R(!0, k.takeRecords());
  }];
}, yo = (t, e, n) => {
  const { ft: s, _t: a } = n || {}, c = Vt(Fr), { K: d } = Be(), i = K(nt, t), [u] = Ie({
    o: !1,
    _: !0
  });
  return () => {
    const _ = [], f = oo(`<div class="${Qn}"><div class="${$r}"></div></div>`)[0], p = f.firstChild, h = (y) => {
      const S = y instanceof ResizeObserverEntry, R = !S && Ue(y);
      let k = !1, b = !1, $ = !0;
      if (S) {
        const [L, , B] = u(y.contentRect), D = In(L), x = lo(L, B);
        b = !B || x, k = !b && !D, $ = !k;
      } else R ? [, $] = y : b = y === !0;
      if (s && $) {
        const L = R ? y[0] : nt(f);
        rt(f, {
          x: sn(3333333, 3333333, L && d),
          y: 3333333
        });
      }
      k || e({
        vt: R ? y : void 0,
        ht: !R,
        _t: b
      });
    };
    if (Qt) {
      const y = new Qt((S) => h(S.pop()));
      y.observe(p), _e(_, () => {
        y.disconnect();
      });
    } else if (c) {
      const [y, S] = c(p, h, a);
      _e(_, Ye([tn(f, xr), fe(f, "animationstart", y)], S));
    } else
      return Ne;
    if (s) {
      const [y] = Ie({
        o: void 0
      }, i);
      _e(_, fe(f, "scroll", (S) => {
        const R = y(), [k, b, $] = R;
        b && (Kn(p, "ltr rtl"), tn(p, k ? "rtl" : "ltr"), h([!!k, b, $])), Jn(S);
      }));
    }
    return K(Re, _e(_, Te(t, f)));
  };
}, Wr = (t, e) => {
  let n;
  const o = (i) => i.h === 0 || i.isIntersecting || i.intersectionRatio > 0, s = wt(Cr), [a] = Ie({
    o: !1
  }), c = (i, u) => {
    if (i) {
      const _ = a(o(i)), [, m] = _;
      return m && !u && e(_) && [_];
    }
  }, d = (i, u) => c(u.pop(), i);
  return [() => {
    const i = [];
    if (rs)
      n = new rs(K(d, !1), {
        root: t
      }), n.observe(s), _e(i, () => {
        n.disconnect();
      });
    else {
      const u = () => {
        const _ = Mt(s);
        c(_);
      };
      _e(i, yo(s, u)()), u();
    }
    return K(Re, _e(i, Te(t, s)));
  }, () => n && d(!0, n.takeRecords())];
}, Kr = (t, e, n, o) => {
  let s, a, c, d, i, u;
  const { L: _ } = Be(), m = `[${Ae}]`, f = `[${Ke}]`, p = ["tabindex"], h = ["wrap", "cols", "rows"], y = ["id", "class", "style", "open"], { gt: S, bt: R, D: k, wt: b, yt: $, V: L, St: B, $t: D } = t, x = {
    Ot: !1,
    N: nt(S)
  }, A = Be(), M = Vt(es), [V] = Ie({
    u: Ks,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const C = M && M.M(t, e, x, A, n).W, T = B(kt), E = !L && B(kr), F = E && At(k);
    D(kt), L && D(Un, !0);
    const N = E && C && C()[0], q = Hn(b), ee = Hn(k), te = Xn(k);
    return D(kt, T), L && D(Un), N && N(), rt(k, F), {
      w: ee.w + q.w + te.w,
      h: ee.h + q.h + te.h
    };
  }), P = $ ? h : Ye(y, h), H = Xs(o, {
    v: () => s,
    p: () => a,
    S(C, T) {
      const [E] = C, [F] = T;
      return [Ye(st(E), st(F)).reduce((N, q) => (N[q] = E[q] || F[q], N), {})];
    }
  }), W = (C) => {
    if (L) {
      const T = nt(S);
      ne(C, {
        Ct: u !== T
      }), ne(x, {
        N: T
      }), u = T;
    }
  }, Q = (C) => {
    se(C || p, (T) => {
      if (vn(p, T)) {
        const E = mn(R, T);
        cn(E) ? He(k, T, E) : qe(k, T);
      }
    });
  }, oe = (C, T) => {
    const [E, F] = C, N = {
      xt: F
    };
    return ne(x, {
      Ot: E
    }), !T && o(N), N;
  }, G = ({ ht: C, vt: T, _t: E }) => {
    const N = !(C && !E && !T) && _ ? H : o, [q, ee] = T || [], te = {
      ht: C || E,
      _t: E,
      Ct: ee
    };
    W(te), T && ne(x, {
      N: q
    }), N(te);
  }, Z = (C, T) => {
    const [, E] = V(), F = {
      Ht: E
    };
    return W(F), E && !T && (C ? o : H)(F), F;
  }, ve = (C, T, E) => {
    const F = {
      zt: T
    };
    return W(F), T && !E ? H(F) : L || Q(C), F;
  }, { Z: z } = A, [ie, ae] = b ? Wr(R, oe) : [], ce = !L && yo(R, G, {
    _t: !0,
    ft: !0
  }), [ke, ge] = $s(R, !1, ve, {
    rt: y,
    ct: Ye(y, p)
  }), me = L && Qt && new Qt((C) => {
    const T = C[C.length - 1].contentRect;
    G({
      ht: !0,
      _t: lo(T, i)
    }), i = T;
  });
  return [() => {
    Q(), me && me.observe(R);
    const C = ce && ce(), T = ie && ie(), E = ke(), F = z((N) => {
      const [, q] = V();
      H({
        It: N,
        Ht: q
      });
    });
    return () => {
      me && me.disconnect(), C && C(), T && T(), d && d(), E(), F();
    };
  }, ({ Et: C, At: T, Tt: E }) => {
    const F = {}, [N] = C("update.ignoreMutation"), [q, ee] = C("update.attributes"), [te, pe] = C("update.elementEvents"), [be, J] = C("update.debounce"), we = pe || ee, xe = T || E, Fe = (re) => je(N) && N(re);
    if (we) {
      c && c(), d && d();
      const [re, $e] = $s(b || k, !0, Z, {
        ct: Ye(P, q || []),
        lt: te,
        it: m,
        dt: (Le, he) => {
          const { target: Me, attributeName: Nt } = Le;
          return (!he && Nt && !L ? _r(Me, m, f) : !1) || !!bt(Me, `.${Ve}`) || !!Fe(Le);
        }
      });
      d = re(), c = $e;
    }
    if (J)
      if (H.m(), Ue(be)) {
        const re = be[0], $e = be[1];
        s = Ge(re) && re, a = Ge($e) && $e;
      } else Ge(be) ? (s = be, a = !1) : (s = !1, a = !1);
    if (xe) {
      const re = ge(), $e = ae && ae(), Le = c && c();
      re && ne(F, ve(re[0], re[1], xe)), $e && ne(F, oe($e[0], xe)), Le && ne(F, Z(Le[0], xe));
    }
    return W(F), F;
  }, x];
}, Yr = (t, e, n, o) => {
  const { G: s, K: a } = Be(), { scrollbars: c } = s(), { slot: d } = c, { gt: i, bt: u, D: _, Dt: m, kt: f, Rt: p, V: h } = e, { scrollbars: y } = m ? {} : t, { slot: S } = y || {}, R = /* @__PURE__ */ new Map(), k = (C) => Ln && new Ln({
    source: f,
    axis: C
  }), b = k("x"), $ = k("y"), L = bo([i, u, _], () => h && p ? i : u, d, S), B = (C, T) => {
    if (T) {
      const te = C ? St : xt, { Mt: pe, Vt: be } = T, J = yt(be)[te], we = yt(pe)[te];
      return On(0, 1, J / we || 0);
    }
    const E = C ? "x" : "y", { Lt: F, Pt: N } = n, q = N[E], ee = F[E];
    return On(0, 1, q / (q + ee) || 0);
  }, D = (C, T, E, F) => {
    const N = B(E, C);
    return 1 / N * (1 - N) * (F ? 1 - T : T) || 0;
  }, x = (C, T) => ne(C, T ? {
    clear: ["left"]
  } : {}), A = (C) => {
    R.forEach((T, E) => {
      (C ? vn(Is(C), E) : !0) && (se(T || [], (N) => {
        N && N.cancel();
      }), R.delete(E));
    });
  }, M = (C, T, E, F) => {
    const N = R.get(C) || [], q = N.find((ee) => ee && ee.timeline === T);
    q ? q.effect = new KeyframeEffect(C, E, {
      composite: F
    }) : R.set(C, Ye(N, [C.animate(E, {
      timeline: T,
      composite: F
    })]));
  }, V = (C, T, E) => {
    const F = E ? tn : Kn;
    se(C, (N) => {
      F(N.Ut, T);
    });
  }, P = (C, T) => {
    se(C, (E) => {
      const [F, N] = T(E);
      Et(F, N);
    });
  }, H = (C, T) => {
    P(C, (E) => {
      const { Vt: F } = E;
      return [F, {
        [T ? St : xt]: ds(B(T))
      }];
    });
  }, W = (C, T) => {
    const { Lt: E } = n, F = T ? E.x : E.y, N = (q, ee, te) => Sn(ds(D(q, ms(ee, F, te), T, te)), T);
    if (b && $)
      se(C, (q) => {
        const { Ut: ee, Vt: te } = q, pe = T && nt(ee) && a;
        M(te, T ? b : $, x({
          transform: _s(F, pe).map((be) => N(q, be, pe))
        }, pe));
      });
    else {
      const q = At(f);
      P(C, (ee) => {
        const { Vt: te, Ut: pe } = ee;
        return [te, {
          transform: N(ee, T ? q.x : q.y, T && nt(pe) && a)
        }];
      });
    }
  }, Q = (C) => h && !p && Ct(C) === _, oe = [], G = [], Z = [], ve = (C, T, E) => {
    const F = Hs(E), N = F ? E : !0, q = F ? !E : !0;
    N && V(G, C, T), q && V(Z, C, T);
  }, z = () => {
    H(G, !0), H(Z);
  }, ie = () => {
    W(G, !0), W(Z);
  }, ae = () => {
    if (h) {
      const { Lt: C } = n, T = 0.5;
      if (b && $)
        se(Ye(Z, G), ({ Ut: E }) => {
          if (Q(E)) {
            const F = (N, q, ee) => {
              const te = ee && nt(E) && a;
              M(E, N, x({
                transform: _s(q - T, te).map((pe) => Sn(Fn(pe), ee))
              }, te), "add");
            };
            F(b, C.x, !0), F($, C.y);
          } else
            A(E);
        });
      else {
        const E = At(f), F = (N) => {
          const { Ut: q } = N, ee = Q(q) && q, te = (pe, be, J) => {
            const we = ms(pe, be, J), xe = be * we;
            return Fn(J ? -xe : xe);
          };
          return [ee, {
            transform: ee ? Sn({
              x: te(E.x, C.x, nt(q) && a),
              y: te(E.y, C.y)
            }) : ""
          }];
        };
        P(G, F), P(Z, F);
      }
    }
  }, ce = (C) => {
    const E = wt(`${Ve} ${C ? Tr : Dr}`), F = wt(fo), N = wt(Zn), q = {
      Ut: E,
      Mt: F,
      Vt: N
    };
    return _e(C ? G : Z, q), _e(oe, [Te(E, F), Te(F, N), K(ot, E), A, o(q, ve, W, C)]), q;
  }, ke = K(ce, !0), ge = K(ce, !1), me = () => (Te(L, G[0].Ut), Te(L, Z[0].Ut), K(Re, oe));
  return ke(), ge(), [{
    Bt: z,
    Nt: ie,
    jt: ae,
    Ft: ve,
    qt: {
      J: b,
      Wt: G,
      Xt: ke,
      Yt: K(P, G)
    },
    Jt: {
      J: $,
      Wt: Z,
      Xt: ge,
      Yt: K(P, Z)
    }
  }, me];
}, Xr = (t, e, n, o) => {
  const { bt: s, D: a, V: c, kt: d, Kt: i } = e;
  return (u, _, m, f) => {
    const { Ut: p, Mt: h, Vt: y } = u, [S, R] = gt(333), [k, b] = gt(), $ = K(m, [u], f), L = !!d.scrollBy, B = `client${f ? "X" : "Y"}`, D = f ? St : xt, x = f ? "left" : "top", A = f ? "w" : "h", M = f ? "x" : "y", V = (W) => W.propertyName.indexOf(D) > -1, P = () => {
      const W = "pointerup pointerleave pointercancel lostpointercapture", Q = (oe, G) => (Z) => {
        const { Lt: ve } = n, z = Mt(h)[A] - Mt(y)[A], ae = G * Z / z * ve[M];
        rt(d, {
          [M]: oe + ae
        });
      };
      return fe(h, "pointerdown", (oe) => {
        const G = bt(oe.target, `.${Zn}`) === y, Z = G ? y : h, ve = t.scrollbars, { button: z, isPrimary: ie, pointerType: ae } = oe, { pointers: ce } = ve;
        if (z === 0 && ie && ve[G ? "dragScroll" : "clickScroll"] && (ce || []).includes(ae)) {
          const ge = !G && oe.shiftKey, me = K(yt, y), C = K(yt, h), T = (re, $e) => (re || me())[x] - ($e || C())[x], E = Dn(yt(d)[D]) / Mt(d)[A] || 1, F = Q(At(d)[M] || 0, 1 / E), N = oe[B], q = me(), ee = C(), te = q[D], pe = T(q, ee) + te / 2, be = N - ee[x], J = G ? 0 : be - pe, we = (re) => {
            Re(Fe), Z.releasePointerCapture(re.pointerId);
          }, Fe = [Ft(s, Ae, wr), fe(i, W, we), fe(i, "selectstart", (re) => fs(re), {
            H: !1
          }), fe(h, W, we), fe(h, "pointermove", (re) => {
            const $e = re[B] - N;
            (G || ge) && F(J + $e);
          })];
          if (Z.setPointerCapture(oe.pointerId), ge)
            F(J);
          else if (!G) {
            const re = Vt(Nr);
            re && _e(Fe, re(F, T, J, te, be));
          }
        }
      });
    };
    let H = !0;
    return K(Re, [fe(y, "pointermove pointerleave", o), fe(p, "pointerenter", () => {
      _(ys, !0);
    }), fe(p, "pointerleave pointercancel", () => {
      _(ys, !1);
    }), !c && fe(p, "mousedown", () => {
      const W = Bn();
      (as(W, Ke) || as(W, Ae) || W === document.body) && Jt(() => {
        a.focus({
          preventScroll: !0
        });
      }, 25);
    }), fe(p, "wheel", (W) => {
      const { deltaX: Q, deltaY: oe, deltaMode: G } = W;
      L && H && G === 0 && Ct(p) === s && d.scrollBy({
        left: Q,
        top: oe,
        behavior: "smooth"
      }), H = !1, _(xs, !0), S(() => {
        H = !0, _(xs);
      }), fs(W);
    }, {
      H: !1,
      I: !0
    }), fe(y, "transitionstart", (W) => {
      if (V(W)) {
        const Q = () => {
          $(), k(Q);
        };
        Q();
      }
    }), fe(y, "transitionend transitioncancel", (W) => {
      V(W) && (b(), $());
    }), fe(p, "mousedown", K(fe, i, "click", Jn, {
      A: !0,
      I: !0
    }), {
      I: !0
    }), P(), R, b]);
  };
}, Jr = (t, e, n, o, s, a) => {
  let c, d, i, u, _, m = Ne, f = 0;
  const p = (z) => z.pointerType === "mouse", [h, y] = gt(), [S, R] = gt(100), [k, b] = gt(100), [$, L] = gt(() => f), [B, D] = Yr(t, s, o, Xr(e, s, o, (z) => p(z) && oe())), { bt: x, Zt: A, Rt: M } = s, { Ft: V, Bt: P, Nt: H, jt: W } = B, Q = (z, ie) => {
    if (L(), z)
      V(Ss);
    else {
      const ae = K(V, Ss, !0);
      f > 0 && !ie ? $(ae) : ae();
    }
  }, oe = () => {
    (i ? !c : !u) && (Q(!0), S(() => {
      Q(!1);
    }));
  }, G = (z) => {
    V(qn, z, !0), V(qn, z, !1);
  }, Z = (z) => {
    p(z) && (c = i, i && Q(!0));
  }, ve = [L, R, b, y, () => m(), fe(x, "pointerover", Z, {
    A: !0
  }), fe(x, "pointerenter", Z), fe(x, "pointerleave", (z) => {
    p(z) && (c = !1, i && Q(!1));
  }), fe(x, "pointermove", (z) => {
    p(z) && d && oe();
  }), fe(A, "scroll", (z) => {
    h(() => {
      H(), oe();
    }), a(z), W();
  })];
  return [() => K(Re, _e(ve, D())), ({ Et: z, Tt: ie, Gt: ae, Qt: ce }) => {
    const { tn: ke, nn: ge, sn: me } = ce || {}, { Ct: C, _t: T } = ae || {}, { N: E } = n, { T: F } = Be(), { k: N, en: q } = o, [ee, te] = z("showNativeOverlaidScrollbars"), [pe, be] = z("scrollbars.theme"), [J, we] = z("scrollbars.visibility"), [xe, Fe] = z("scrollbars.autoHide"), [re, $e] = z("scrollbars.autoHideSuspend"), [Le] = z("scrollbars.autoHideDelay"), [he, Me] = z("scrollbars.dragScroll"), [Nt, Ut] = z("scrollbars.clickScroll"), [Pt, Pe] = z("overflow"), at = T && !ie, it = q.x || q.y, bn = ke || ge || C || ie, et = me || we || Pe, wn = ee && F.x && F.y, _t = (mt, pt, Lt) => {
      const qt = mt.includes("scroll") && (J === "visible" || J === "auto" && pt === "scroll");
      return V(Vr, qt, Lt), qt;
    };
    if (f = Le, at && (re && it ? (G(!1), m(), k(() => {
      m = fe(A, "scroll", K(G, !0), {
        A: !0
      });
    })) : G(!0)), te && V(Er, wn), be && (V(_), V(pe, !0), _ = pe), $e && !re && G(!0), Fe && (d = xe === "move", i = xe === "leave", u = xe === "never", Q(u, !0)), Me && V(Or, he), Ut && V(Mr, Nt), et) {
      const mt = _t(Pt.x, N.x, !0), pt = _t(Pt.y, N.y, !1);
      V(Lr, !(mt && pt));
    }
    bn && (P(), H(), W(), V(ks, !q.x, !0), V(ks, !q.y, !1), V(Ar, E && !M));
  }, {}, B];
}, Qr = (t) => {
  const e = Be(), { G: n, L: o } = e, { elements: s } = n(), { host: a, padding: c, viewport: d, content: i } = s, u = en(t), _ = u ? {} : t, { elements: m } = _, { host: f, padding: p, viewport: h, content: y } = m || {}, S = u ? t : _.target, R = no(S), k = nn(S, "textarea"), b = S.ownerDocument, $ = b.documentElement, L = () => b.defaultView || De, B = (J) => {
    J && J.focus && J.focus({
      preventScroll: !0
    });
  }, D = K(Pr, [S]), x = K(bo, [S]), A = K(wt, ""), M = K(D, A, d), V = K(x, A, i), P = M(h), H = P === S, W = H && R, Q = !H && V(y), oe = !H && P === Q, G = W ? $ : P, Z = k ? D(A, a, f) : S, ve = W ? G : Z, z = !H && x(A, c, p), ie = !oe && Q, ae = [ie, G, z, ve].map((J) => en(J) && !Ct(J) && J), ce = (J) => J && vn(ae, J), ke = ce(G) ? S : G, ge = {
    gt: S,
    bt: ve,
    D: G,
    cn: z,
    wt: ie,
    kt: W ? $ : G,
    Zt: W ? b : G,
    rn: R ? $ : ke,
    Kt: b,
    yt: k,
    Rt: R,
    Dt: u,
    V: H,
    ln: L,
    St: (J) => vr(G, H ? Ae : Ke, J),
    $t: (J, we) => Yt(G, H ? Ae : Ke, J, we)
  }, { gt: me, bt: C, cn: T, D: E, wt: F } = ge, N = [() => {
    qe(C, [Ae, $n]), qe(me, $n), R && qe($, [$n, Ae]);
  }], q = k && ce(C);
  let ee = k ? me : Rn([F, E, T, C, me].find((J) => J && !ce(J)));
  const te = W ? me : F || E, pe = K(Re, N);
  return [ge, () => {
    const J = L(), we = Bn(), xe = (he) => {
      Te(Ct(he), Rn(he)), ot(he);
    }, Fe = (he) => he ? fe(he, "focusin focusout focus blur", (Me) => {
      Jn(Me), Me.stopImmediatePropagation();
    }, {
      I: !0,
      H: !1
    }) : Ne, re = "tabindex", $e = mn(E, re), Le = Fe(we);
    return He(C, Ae, H ? "viewport" : "host"), He(T, Pn, ""), He(F, ws, ""), H || (He(E, Ke, ""), He(E, re, $e || "-1"), R && Ft($, Ae, yr)), q && (is(me, C), _e(N, () => {
      is(C, me), ot(C);
    })), Te(te, ee), Te(C, T), Te(T || C, !H && E), Te(E, F), _e(N, [Le, () => {
      const he = Bn(), Me = Fe(he);
      qe(T, Pn), qe(F, ws), qe(E, [io, co, Ke]), $e ? He(E, re, $e) : qe(E, re), ce(F) && xe(F), ce(E) && xe(E), ce(T) && xe(T), B(he), Me();
    }]), o && !H && (Ft(E, Ke, vo), _e(N, K(qe, E, Ke))), B(!H && we === S && J.top === J ? E : we), Le(), ee = 0, pe;
  }, pe];
}, Zr = ({ wt: t }) => ({ Gt: e, an: n, Tt: o }) => {
  const { xt: s } = e || {}, { Ot: a } = n;
  t && (s || o) && Et(t, {
    [xt]: a && "100%"
  });
}, el = ({ bt: t, cn: e, D: n, V: o }, s) => {
  const [a, c] = Ie({
    u: ur,
    o: us()
  }, K(us, t, "padding", ""));
  return ({ Et: d, Gt: i, an: u, Tt: _ }) => {
    let [m, f] = c(_);
    const { L: p } = Be(), { ht: h, Ht: y, Ct: S } = i || {}, { N: R } = u, [k, b] = d("paddingAbsolute");
    (h || f || (_ || y)) && ([m, f] = a(_));
    const L = !o && (b || S || f);
    if (L) {
      const B = !k || !e && !p, D = m.r + m.l, x = m.t + m.b, A = {
        [Gs]: B && !R ? -D : 0,
        [js]: B ? -x : 0,
        [zs]: B && R ? -D : 0,
        top: B ? -m.t : 0,
        right: B ? R ? -m.r : "auto" : 0,
        left: B ? R ? "auto" : -m.l : 0,
        [St]: B && `calc(100% + ${D}px)`
      }, M = {
        [Ns]: B ? m.t : 0,
        [Us]: B ? m.r : 0,
        [qs]: B ? m.b : 0,
        [Ps]: B ? m.l : 0
      };
      Et(e || n, A), Et(n, M), ne(s, {
        cn: m,
        un: !B,
        j: e ? M : ne({}, A, M)
      });
    }
    return {
      dn: L
    };
  };
}, tl = (t, e) => {
  const n = Be(), { bt: o, cn: s, D: a, V: c, Rt: d, $t: i, ln: u } = t, { L: _ } = n, m = d && c, f = K(Kt, 0), p = {
    u: Ks,
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
  }, y = (M, V) => {
    const P = De.devicePixelRatio % 1 !== 0 ? 1 : 0, H = {
      w: f(M.w - V.w),
      h: f(M.h - V.h)
    };
    return {
      w: H.w > P ? H.w : 0,
      h: H.h > P ? H.h : 0
    };
  }, [S, R] = Ie(p, K(Xn, a)), [k, b] = Ie(p, K(Hn, a)), [$, L] = Ie(p), [B, D] = Ie(p), [x] = Ie(h), A = Vt(es);
  return ({ Et: M, Gt: V, an: P, Tt: H }, { dn: W }) => {
    const { ht: Q, Ht: oe, Ct: G, It: Z } = V || {}, ve = A && A.M(t, e, P, n, M), { q: z, W: ie, X: ae } = ve || {}, [ce, ke] = Hr(M, n), [ge, me] = M("overflow"), C = Q || W || oe || G || Z || ke, T = on(ge.x), E = on(ge.y), F = T || E;
    let N = R(H), q = b(H), ee = L(H), te = D(H), pe;
    if (ke && _ && i(vo, !ce), C) {
      F && i(kt, !1);
      const [Pe, at] = ie ? ie(pe) : [], [it, bn] = N = S(H), [et, wn] = q = k(H), _t = ro(a), mt = et, pt = _t;
      Pe && Pe(), (wn || bn || ke) && at && !ce && z && z(at, et, it);
      const Lt = hr(u()), qt = {
        w: f(Kt(et.w, mt.w) + it.w),
        h: f(Kt(et.h, mt.h) + it.h)
      }, ss = {
        w: f((m ? Lt.w : pt.w + f(_t.w - et.w)) + it.w),
        h: f((m ? Lt.h : pt.h + f(_t.h - et.h)) + it.h)
      };
      te = B(ss), ee = $(y(qt, ss), H);
    }
    const [be, J] = te, [we, xe] = ee, [Fe, re] = q, [$e, Le] = N, he = {
      x: we.w > 0,
      y: we.h > 0
    }, Me = T && E && (he.x || he.y) || T && he.x && !he.y || E && he.y && !he.x;
    if (W || G || Z || Le || re || J || xe || me || ke || C) {
      const Pe = {}, at = Ir(t, he, ge, Pe);
      ae && ae(at, P, !!z && z(at, Fe, $e), Pe), c ? (He(o, io, Pe[fn]), He(o, co, Pe[_n])) : Et(a, Pe);
    }
    Yt(o, Ae, uo, Me), Yt(s, Pn, Sr, Me), c || Yt(a, Ke, kt, F);
    const [Ut, Pt] = x(ho(t).k);
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
}, nl = (t) => {
  const [e, n, o] = Qr(t), s = {
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
  }, { gt: a, D: c, V: d } = e, { L: i, T: u } = Be(), _ = !i && (u.x || u.y), m = [Zr(e), el(e, s), tl(e, s)];
  return [n, (f) => {
    const p = {}, y = _ && At(c), S = d ? Ft(c, Ae, Un) : Ne;
    return se(m, (R) => {
      ne(p, R(f, p) || {});
    }), S(), rt(c, y), !d && rt(a, 0), p;
  }, s, e, o];
}, sl = (t, e, n, o) => {
  const s = bs(e, {}), [a, c, d, i, u] = nl(t), [_, m, f] = Kr(i, d, s, (k) => {
    R({}, k);
  }), [p, h, , y] = Jr(t, e, f, d, i, o), S = (k) => st(k).some((b) => !!k[b]), R = (k, b) => {
    const { fn: $, Tt: L, At: B, _n: D } = k, x = $ || {}, A = !!L, M = {
      Et: bs(e, x, A),
      fn: x,
      Tt: A
    };
    if (D)
      return h(M), !1;
    const V = b || m(ne({}, M, {
      At: B
    })), P = c(ne({}, M, {
      an: f,
      Gt: V
    }));
    h(ne({}, M, {
      Gt: V,
      Qt: P
    }));
    const H = S(V), W = S(P), Q = H || W || !Wn(x) || A;
    return Q && n(k, {
      Gt: V,
      Qt: P
    }), Q;
  };
  return [() => {
    const { rn: k, D: b } = i, $ = At(k), L = [_(), a(), p()];
    return rt(b, $), K(Re, L);
  }, R, () => ({
    vn: f,
    hn: d
  }), {
    pn: i,
    gn: y
  }, u];
}, Je = (t, e, n) => {
  const { nt: o } = Be(), s = en(t), a = s ? t : t.target, c = wo(a);
  if (e && !c) {
    let d = !1;
    const i = [], u = {}, _ = (M) => {
      const V = Qs(M), P = Vt(Br);
      return P ? P(V, !0) : V;
    }, m = ne({}, o(), _(e)), [f, p, h] = Nn(), [y, S, R] = Nn(n), k = (M, V) => {
      R(M, V), h(M, V);
    }, [b, $, L, B, D] = sl(t, m, ({ fn: M, Tt: V }, { Gt: P, Qt: H }) => {
      const { ht: W, Ct: Q, xt: oe, Ht: G, zt: Z, _t: ve } = P, { tn: z, nn: ie, sn: ae } = H;
      k("updated", [A, {
        updateHints: {
          sizeChanged: !!W,
          directionChanged: !!Q,
          heightIntrinsicChanged: !!oe,
          overflowEdgeChanged: !!z,
          overflowAmountChanged: !!ie,
          overflowStyleChanged: !!ae,
          contentMutation: !!G,
          hostMutation: !!Z,
          appear: !!ve
        },
        changedOptions: M || {},
        force: !!V
      }]);
    }, (M) => k("scroll", [A, M])), x = (M) => {
      Gr(a), Re(i), d = !0, k("destroyed", [A, M]), p(), S();
    }, A = {
      options(M, V) {
        if (M) {
          const P = V ? o() : {}, H = ao(m, ne(P, _(M)));
          Wn(H) || (ne(m, H), $({
            fn: H
          }));
        }
        return ne({}, m);
      },
      on: y,
      off: (M, V) => {
        M && V && S(M, V);
      },
      state() {
        const { vn: M, hn: V } = L(), { N: P } = M, { Pt: H, Lt: W, k: Q, en: oe, cn: G, un: Z } = V;
        return ne({}, {
          overflowEdge: H,
          overflowAmount: W,
          overflowStyle: Q,
          hasOverflow: oe,
          padding: G,
          paddingAbsolute: Z,
          directionRTL: P,
          destroyed: d
        });
      },
      elements() {
        const { gt: M, bt: V, cn: P, D: H, wt: W, kt: Q, Zt: oe } = B.pn, { qt: G, Jt: Z } = B.gn, ve = (ie) => {
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
              return $({
                _n: !0
              }), ge;
            }
          });
        };
        return ne({}, {
          target: M,
          host: V,
          padding: P || H,
          viewport: H,
          content: W || H,
          scrollOffsetElement: Q,
          scrollEventElement: oe,
          scrollbarHorizontal: z(G),
          scrollbarVertical: z(Z)
        });
      },
      update: (M) => $({
        Tt: M,
        At: !0
      }),
      destroy: K(x, !1),
      plugin: (M) => u[st(M)[0]]
    };
    return _e(i, [D]), zr(a, A), po(_o, Je, [A, f, u]), qr(B.pn.Rt, !s && t.cancel) ? (x(!0), A) : (_e(i, b()), k("initialized", [A]), A.update(!0), A);
  }
  return c;
};
Je.plugin = (t) => {
  const e = Ue(t), n = e ? t : [t], o = n.map((s) => po(s, Je)[0]);
  return Rr(n), e ? o : o[0];
};
Je.valid = (t) => {
  const e = t && t.elements, n = je(e) && e();
  return Zt(n) && !!wo(n.target);
};
Je.env = () => {
  const { P: t, T: e, L: n, K: o, J: s, st: a, et: c, G: d, tt: i, nt: u, ot: _ } = Be();
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
    getDefaultOptions: u,
    setDefaultOptions: _
  });
};
function ol() {
  let t;
  const e = O(null), n = Math.floor(Math.random() * 2 ** 32), o = O(!1), s = O([]), a = () => s.value, c = () => t.getSelection(), d = () => s.value.length, i = () => t.clearSelection(!0), u = O(), _ = O(null), m = O(null), f = O(null), p = O(null);
  function h() {
    t = new Ko({
      area: e.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), t.subscribe(
      "DS:start:pre",
      ({ items: L, event: B, isDragging: D }) => {
        if (D)
          t.Interaction._reset(B);
        else {
          o.value = !1;
          const x = e.value.offsetWidth - B.offsetX, A = e.value.offsetHeight - B.offsetY;
          x < 15 && A < 15 && t.Interaction._reset(B), B.target.classList.contains("os-scrollbar-handle") && t.Interaction._reset(B);
        }
      }
    ), document.addEventListener("dragleave", (L) => {
      !L.buttons && o.value && (o.value = !1);
    });
  }
  const y = () => ct(() => {
    t.addSelection(t.getSelectables()), S();
  }), S = () => {
    s.value = t.getSelection().map((L) => JSON.parse(L.dataset.item)), u.value(s.value);
  }, R = () => ct(() => {
    const L = a().map((B) => B.path);
    i(), t.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + n)
    }), t.addSelection(
      t.getSelectables().filter(
        (B) => L.includes(JSON.parse(B.dataset.item).path)
      )
    ), S(), b();
  }), k = (L) => {
    u.value = L, t.subscribe("DS:end", ({ items: B, event: D, isDragging: x }) => {
      s.value = B.map((A) => JSON.parse(A.dataset.item)), L(B.map((A) => JSON.parse(A.dataset.item)));
    });
  }, b = () => {
    _.value && (e.value.getBoundingClientRect().height < e.value.scrollHeight ? (m.value.style.height = e.value.scrollHeight + "px", m.value.style.display = "block") : (m.value.style.height = "100%", m.value.style.display = "none"));
  }, $ = (L) => {
    if (!_.value)
      return;
    const { scrollOffsetElement: B } = _.value.elements();
    B.scrollTo({
      top: e.value.scrollTop,
      left: 0
    });
  };
  return Ee(() => {
    Je(
      f.value,
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
        initialized: (L) => {
          _.value = L;
        },
        scroll: (L, B) => {
          const { scrollOffsetElement: D } = L.elements();
          e.value.scrollTo({
            top: D.scrollTop,
            left: 0
          });
        }
      }
    ), h(), b(), p.value = new ResizeObserver(b), p.value.observe(e.value), e.value.addEventListener("scroll", $), t.subscribe(
      "DS:scroll",
      ({ isDragging: L }) => L || $()
    );
  }), Gn(() => {
    t && t.stop(), p.value && p.value.disconnect();
  }), Ts(() => {
    t && t.Area.reset();
  }), {
    area: e,
    explorerId: n,
    isDraggingRef: o,
    scrollBar: m,
    scrollBarContainer: f,
    getSelected: a,
    getSelection: c,
    selectAll: y,
    clearSelection: i,
    refreshSelection: R,
    getCount: d,
    onSelect: k
  };
}
function rl(t, e) {
  const n = O(t), o = O(e), s = O([]), a = O([]), c = O([]), d = O(!1), i = O(5);
  let u = !1, _ = !1;
  const m = vt({
    adapter: n,
    storages: [],
    dirname: o,
    files: []
  });
  function f() {
    let k = [], b = [], $ = o.value ?? n.value + "://";
    $.length === 0 && (s.value = []), $.replace(n.value + "://", "").split("/").forEach(function(D) {
      k.push(D), k.join("/") !== "" && b.push({
        basename: D,
        name: D,
        path: n.value + "://" + k.join("/"),
        type: "dir"
      });
    }), a.value = b;
    const [L, B] = h(b, i.value);
    c.value = B, s.value = L;
  }
  function p(k) {
    i.value = k, f();
  }
  function h(k, b) {
    return k.length > b ? [k.slice(-b), k.slice(0, -b)] : [k, []];
  }
  function y(k = null) {
    d.value = k ?? !d.value;
  }
  function S() {
    return s.value && s.value.length && !_;
  }
  const R = Xe(() => {
    var k;
    return ((k = s.value[s.value.length - 2]) == null ? void 0 : k.path) ?? n.value + "://";
  });
  return Ee(() => {
  }), Oe(o, f), Ee(f), {
    adapter: n,
    path: o,
    loading: u,
    searchMode: _,
    data: m,
    breadcrumbs: s,
    breadcrumbItems: a,
    limitBreadcrumbItems: p,
    hiddenBreadcrumbs: c,
    showHiddenBreadcrumbs: d,
    toggleHiddenBreadcrumbs: y,
    isGoUpAvailable: S,
    parentFolderPath: R
  };
}
function ll() {
  const t = "_readOnlyFile", e = localStorage.getItem(t), n = vt(JSON.parse(e ?? '{"items": []}')), o = (u) => {
    for (const _ of u)
      n.items.length >= 1e3 && n.items.shift(), i(_.path) ? c(_.path) : n.items.push(_);
  }, s = () => JSON.parse(localStorage.getItem(t) || '{"items": []}'), a = () => {
    localStorage.setItem(t, JSON.stringify(n));
  }, c = (u) => {
    const _ = n.items.findIndex((m) => m.path === u);
    _ !== -1 && n.items.splice(_, 1);
  }, d = () => n.items, i = (u) => n.items.findIndex((m) => u.indexOf(m.path) === 0) !== -1;
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
const al = (t, e) => {
  const n = Zo(t.id), o = Wo(), s = n.getStore("metricUnits", !1), a = or(n, t.theme), c = e.i18n, d = t.locale ?? e.locale, i = n.getStore("adapter"), u = ll(), _ = (h) => Array.isArray(h) ? h : nr, m = n.getStore("persist-path", t.persist), f = m ? n.getStore("path", t.path) : t.path, p = ol();
  return vt({
    /**
     * Core properties
     * */
    // app version
    version: sr,
    // root element
    root: null,
    // app id
    debug: t.debug,
    // Event Bus
    emitter: o,
    // storage
    storage: n,
    // localization object
    i18n: tr(n, d, o, c),
    // modal state
    modal: rr(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: Xe(() => p),
    // http object
    requester: Qo(t.request),
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
    fs: rl(i, f),
    onlyReadFileStore: u
  });
}, il = { class: "vuefinder__modal-layout__container" }, cl = { class: "vuefinder__modal-layout__content" }, dl = { class: "vuefinder__modal-layout__footer" }, Qe = {
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
    }), (o, s) => (v(), g("div", {
      class: "vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: s[1] || (s[1] = Tt((a) => l(n).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      s[2] || (s[2] = r("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      r("div", il, [
        r("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: s[0] || (s[0] = Ot((a) => l(n).modal.close(), ["self"]))
        }, [
          r("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            r("div", cl, [
              Rt(o.$slots, "default")
            ]),
            r("div", dl, [
              Rt(o.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}, ul = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [o, s] of e)
    n[o] = s;
  return n;
}, vl = {
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
}, fl = { key: 1 };
function _l(t, e, n, o, s, a) {
  return v(), g("div", {
    class: ye(["vuefinder__action-message", { "vuefinder__action-message--hidden": !o.shown }])
  }, [
    t.$slots.default ? Rt(t.$slots, "default", { key: 0 }) : (v(), g("span", fl, w(o.t("Saved.")), 1))
  ], 2);
}
const ht = /* @__PURE__ */ ul(vl, [["render", _l]]), ml = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function pl(t, e) {
  return v(), g("svg", ml, e[0] || (e[0] = [
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
const hl = { render: pl }, gl = { class: "vuefinder__modal-header" }, bl = { class: "vuefinder__modal-header__icon-container" }, wl = {
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
    return (e, n) => (v(), g("div", gl, [
      r("div", bl, [
        (v(), U(Ds(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      r("h3", wl, w(t.title), 1)
    ]));
  }
}, yl = { class: "vuefinder__about-modal__content" }, kl = { class: "vuefinder__about-modal__main" }, Sl = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, xl = ["onClick", "aria-current"], $l = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, Cl = { class: "vuefinder__about-modal__description" }, El = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Al = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Tl = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, Dl = { class: "vuefinder__about-modal__description" }, Vl = { class: "vuefinder__about-modal__settings" }, Ll = { class: "vuefinder__about-modal__setting flex" }, Ml = { class: "vuefinder__about-modal__setting-input" }, Ol = { class: "vuefinder__about-modal__setting-label" }, Rl = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, Bl = { class: "vuefinder__about-modal__setting flex" }, Fl = { class: "vuefinder__about-modal__setting-input" }, Hl = { class: "vuefinder__about-modal__setting-label" }, Il = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, Nl = { class: "vuefinder__about-modal__setting flex" }, Ul = { class: "vuefinder__about-modal__setting-input" }, Pl = { class: "vuefinder__about-modal__setting-label" }, ql = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, zl = { class: "vuefinder__about-modal__setting flex" }, Gl = { class: "vuefinder__about-modal__setting-input" }, jl = { class: "vuefinder__about-modal__setting-label" }, Wl = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, Kl = { class: "vuefinder__about-modal__setting" }, Yl = { class: "vuefinder__about-modal__setting-input" }, Xl = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, Jl = { class: "vuefinder__about-modal__setting-label" }, Ql = ["label"], Zl = ["value"], ea = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, ta = { class: "vuefinder__about-modal__setting-input" }, na = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, sa = { class: "vuefinder__about-modal__setting-label" }, oa = ["label"], ra = ["value"], la = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, aa = { class: "vuefinder__about-modal__shortcuts" }, ia = { class: "vuefinder__about-modal__shortcut" }, ca = { class: "vuefinder__about-modal__shortcut" }, da = { class: "vuefinder__about-modal__shortcut" }, ua = { class: "vuefinder__about-modal__shortcut" }, va = { class: "vuefinder__about-modal__shortcut" }, fa = { class: "vuefinder__about-modal__shortcut" }, _a = { class: "vuefinder__about-modal__shortcut" }, ma = { class: "vuefinder__about-modal__shortcut" }, pa = { class: "vuefinder__about-modal__shortcut" }, ha = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, ga = { class: "vuefinder__about-modal__description" }, ko = {
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
    }, u = (k) => {
      e.theme.set(k), e.emitter.emit("vf-theme-saved");
    }, _ = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? Ms : Ls, n("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, m = () => {
      e.compactListView = !e.compactListView, n("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, f = () => {
      e.showThumbnails = !e.showThumbnails, n("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, p = () => {
      e.persist = !e.persist, n("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: h } = le("VueFinderOptions"), S = Object.fromEntries(
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
      }).filter(([k]) => Object.keys(h).includes(k))
    ), R = Xe(() => ({
      system: s("System"),
      light: s("Light"),
      dark: s("Dark")
    }));
    return (k, b) => (v(), U(Qe, null, {
      buttons: X(() => [
        r("button", {
          type: "button",
          onClick: b[7] || (b[7] = ($) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(l(s)("Close")), 1)
      ]),
      default: X(() => [
        r("div", yl, [
          j(lt, {
            icon: l(hl),
            title: "Vuefinder " + l(e).version
          }, null, 8, ["icon", "title"]),
          r("div", kl, [
            r("div", null, [
              r("div", null, [
                r("nav", Sl, [
                  (v(!0), g(Se, null, Ce(c.value, ($) => (v(), g("button", {
                    key: $.name,
                    onClick: (L) => d.value = $.key,
                    class: ye([$.key === d.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": $.current ? "page" : void 0
                  }, w($.name), 11, xl))), 128))
                ])
              ])
            ]),
            d.value === a.ABOUT ? (v(), g("div", $l, [
              r("div", Cl, w(l(s)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              r("a", El, w(l(s)("Project home")), 1),
              r("a", Al, w(l(s)("Follow on GitHub")), 1)
            ])) : I("", !0),
            d.value === a.SETTINGS ? (v(), g("div", Tl, [
              r("div", Dl, w(l(s)("Customize your experience with the following settings")), 1),
              r("div", Vl, [
                r("fieldset", null, [
                  r("div", Ll, [
                    r("div", Ml, [
                      ue(r("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        "onUpdate:modelValue": b[0] || (b[0] = ($) => l(e).metricUnits = $),
                        onClick: _,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, l(e).metricUnits]
                      ])
                    ]),
                    r("div", Ol, [
                      r("label", Rl, [
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
                  r("div", Bl, [
                    r("div", Fl, [
                      ue(r("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        "onUpdate:modelValue": b[1] || (b[1] = ($) => l(e).compactListView = $),
                        onClick: m,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, l(e).compactListView]
                      ])
                    ]),
                    r("div", Hl, [
                      r("label", Il, [
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
                  r("div", Nl, [
                    r("div", Ul, [
                      ue(r("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        "onUpdate:modelValue": b[2] || (b[2] = ($) => l(e).persist = $),
                        onClick: p,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, l(e).persist]
                      ])
                    ]),
                    r("div", Pl, [
                      r("label", ql, [
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
                  r("div", zl, [
                    r("div", Gl, [
                      ue(r("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        "onUpdate:modelValue": b[3] || (b[3] = ($) => l(e).showThumbnails = $),
                        onClick: f,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, l(e).showThumbnails]
                      ])
                    ]),
                    r("div", jl, [
                      r("label", Wl, [
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
                    r("div", Yl, [
                      r("label", Xl, w(l(s)("Theme")), 1)
                    ]),
                    r("div", Jl, [
                      ue(r("select", {
                        id: "theme",
                        "onUpdate:modelValue": b[4] || (b[4] = ($) => l(e).theme.value = $),
                        onChange: b[5] || (b[5] = ($) => u($.target.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        r("optgroup", {
                          label: l(s)("Theme")
                        }, [
                          (v(!0), g(Se, null, Ce(R.value, ($, L) => (v(), g("option", { value: L }, w($), 9, Zl))), 256))
                        ], 8, Ql)
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
                  l(e).features.includes(l(de).LANGUAGE) && Object.keys(l(S)).length > 1 ? (v(), g("div", ea, [
                    r("div", ta, [
                      r("label", na, w(l(s)("Language")), 1)
                    ]),
                    r("div", sa, [
                      ue(r("select", {
                        id: "language",
                        "onUpdate:modelValue": b[6] || (b[6] = ($) => l(e).i18n.locale = $),
                        class: "vuefinder__about-modal__select"
                      }, [
                        r("optgroup", {
                          label: l(s)("Language")
                        }, [
                          (v(!0), g(Se, null, Ce(l(S), ($, L) => (v(), g("option", { value: L }, w($), 9, ra))), 256))
                        ], 8, oa)
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
                  ])) : I("", !0)
                ])
              ])
            ])) : I("", !0),
            d.value === a.SHORTCUTS ? (v(), g("div", la, [
              r("div", aa, [
                r("div", ia, [
                  r("div", null, w(l(s)("Rename")), 1),
                  b[8] || (b[8] = r("kbd", null, "F2", -1))
                ]),
                r("div", ca, [
                  r("div", null, w(l(s)("Refresh")), 1),
                  b[9] || (b[9] = r("kbd", null, "F5", -1))
                ]),
                r("div", da, [
                  Y(w(l(s)("Delete")) + " ", 1),
                  b[10] || (b[10] = r("kbd", null, "Del", -1))
                ]),
                r("div", ua, [
                  Y(w(l(s)("Escape")) + " ", 1),
                  b[11] || (b[11] = r("div", null, [
                    r("kbd", null, "Esc")
                  ], -1))
                ]),
                r("div", va, [
                  Y(w(l(s)("Select All")) + " ", 1),
                  b[12] || (b[12] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    Y(" + "),
                    r("kbd", null, "A")
                  ], -1))
                ]),
                r("div", fa, [
                  Y(w(l(s)("Search")) + " ", 1),
                  b[13] || (b[13] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    Y(" + "),
                    r("kbd", null, "F")
                  ], -1))
                ]),
                r("div", _a, [
                  Y(w(l(s)("Toggle Sidebar")) + " ", 1),
                  b[14] || (b[14] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    Y(" + "),
                    r("kbd", null, "E")
                  ], -1))
                ]),
                r("div", ma, [
                  Y(w(l(s)("Open Settings")) + " ", 1),
                  b[15] || (b[15] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    Y(" + "),
                    r("kbd", null, ",")
                  ], -1))
                ]),
                r("div", pa, [
                  Y(w(l(s)("Toggle Full Screen")) + " ", 1),
                  b[16] || (b[16] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    Y(" + "),
                    r("kbd", null, "Enter")
                  ], -1))
                ])
              ])
            ])) : I("", !0),
            d.value === a.RESET ? (v(), g("div", ha, [
              r("div", ga, w(l(s)("Reset all settings to default")), 1),
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
}, ba = ["title"], Ze = {
  __name: "Message",
  props: {
    error: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["hidden"],
  setup(t, { emit: e }) {
    var u;
    const n = e, o = le("ServiceContainer"), { t: s } = o.i18n, a = O(!1), c = O(null), d = O((u = c.value) == null ? void 0 : u.strMessage);
    Oe(d, () => a.value = !1);
    const i = () => {
      n("hidden"), a.value = !0;
    };
    return (_, m) => (v(), g("div", null, [
      a.value ? I("", !0) : (v(), g("div", {
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
        ]), 8, ba)
      ], 2))
    ]));
  }
}, wa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function ya(t, e) {
  return v(), g("svg", wa, e[0] || (e[0] = [
    r("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ]));
}
const ka = { render: ya }, Sa = { class: "vuefinder__delete-modal__content" }, xa = { class: "vuefinder__delete-modal__form" }, $a = { class: "vuefinder__delete-modal__description" }, Ca = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Ea = { class: "vuefinder__delete-modal__file" }, Aa = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ta = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Da = { class: "vuefinder__delete-modal__file-name" }, Va = { class: "vuefinder__delete-modal__warning" }, So = {
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
    return (c, d) => (v(), U(Qe, null, {
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
        r("div", Va, w(l(n)("This action cannot be undone.")), 1)
      ]),
      default: X(() => [
        r("div", null, [
          j(lt, {
            icon: l(ka),
            title: l(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          r("div", Sa, [
            r("div", xa, [
              r("p", $a, w(l(n)("Are you sure you want to delete these files?")), 1),
              r("div", Ca, [
                (v(!0), g(Se, null, Ce(o.value, (i) => (v(), g("p", Ea, [
                  i.type === "dir" ? (v(), g("svg", Aa, d[2] || (d[2] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (v(), g("svg", Ta, d[3] || (d[3] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  r("span", Da, w(i.basename), 1)
                ]))), 256))
              ]),
              s.value.length ? (v(), U(Ze, {
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
function Ma(t, e) {
  return v(), g("svg", La, e[0] || (e[0] = [
    r("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ]));
}
const Oa = { render: Ma }, Ra = { class: "vuefinder__rename-modal__content" }, Ba = { class: "vuefinder__rename-modal__item" }, Fa = { class: "vuefinder__rename-modal__item-info" }, Ha = {
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
}, Na = { class: "vuefinder__rename-modal__item-name" }, xo = {
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
    return (d, i) => (v(), U(Qe, null, {
      buttons: X(() => [
        r("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, w(l(n)("Rename")), 1),
        r("button", {
          type: "button",
          onClick: i[2] || (i[2] = (u) => l(e).modal.close()),
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
            r("div", Ba, [
              r("p", Fa, [
                o.value.type === "dir" ? (v(), g("svg", Ha, i[3] || (i[3] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (v(), g("svg", Ia, i[4] || (i[4] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                r("span", Na, w(o.value.basename), 1)
              ]),
              ue(r("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (u) => s.value = u),
                onKeyup: Tt(c, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Dt, s.value]
              ]),
              a.value.length ? (v(), U(Ze, {
                key: 0,
                onHidden: i[1] || (i[1] = (u) => a.value = ""),
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
function Ua(t) {
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
function qa(t, e) {
  return v(), g("svg", Pa, e[0] || (e[0] = [
    r("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ]));
}
const $o = { render: qa }, za = { class: "vuefinder__new-folder-modal__content" }, Ga = { class: "vuefinder__new-folder-modal__form" }, ja = { class: "vuefinder__new-folder-modal__description" }, Wa = ["placeholder"], Co = {
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
    return (c, d) => (v(), U(Qe, null, {
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
            icon: l($o),
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
              }, null, 40, Wa), [
                [Dt, o.value]
              ]),
              s.value.length ? (v(), U(Ze, {
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
}, Ka = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Ya(t, e) {
  return v(), g("svg", Ka, e[0] || (e[0] = [
    r("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ]));
}
const Eo = { render: Ya }, Xa = { class: "vuefinder__new-file-modal__content" }, Ja = { class: "vuefinder__new-file-modal__form" }, Qa = { class: "vuefinder__new-file-modal__description" }, Za = ["placeholder"], ei = {
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
    return (c, d) => (v(), U(Qe, null, {
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
            icon: l(Eo),
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
              s.value.length ? (v(), U(Ze, {
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
const ti = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function ni(t, e) {
  return v(), g("svg", ti, e[0] || (e[0] = [
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
    return (d, i) => (v(), U(Qe, null, {
      buttons: X(() => [
        r("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, w(l(n)("Unarchive")), 1),
        r("button", {
          type: "button",
          onClick: i[1] || (i[1] = (u) => l(e).modal.close()),
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
              (v(!0), g(Se, null, Ce(a.value, (u) => (v(), g("p", li, [
                u.type === "dir" ? (v(), g("svg", ai, i[2] || (i[2] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (v(), g("svg", ii, i[3] || (i[3] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                r("span", ci, w(u.basename), 1)
              ]))), 256)),
              r("p", di, w(l(n)("The archive will be unarchived at")) + " (" + w(l(e).fs.data.dirname) + ")", 1),
              s.value.length ? (v(), U(Ze, {
                key: 0,
                onHidden: i[0] || (i[0] = (u) => s.value = ""),
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
}, vi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function fi(t, e) {
  return v(), g("svg", vi, e[0] || (e[0] = [
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
    return (d, i) => (v(), U(Qe, null, {
      buttons: X(() => [
        r("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, w(l(n)("Archive")), 1),
        r("button", {
          type: "button",
          onClick: i[2] || (i[2] = (u) => l(e).modal.close()),
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
                (v(!0), g(Se, null, Ce(a.value, (u) => (v(), g("p", gi, [
                  u.type === "dir" ? (v(), g("svg", bi, i[3] || (i[3] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (v(), g("svg", wi, i[4] || (i[4] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  r("span", yi, w(u.basename), 1)
                ]))), 256))
              ]),
              ue(r("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (u) => o.value = u),
                onKeyup: Tt(c, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: l(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, ki), [
                [Dt, o.value]
              ]),
              s.value.length ? (v(), U(Ze, {
                key: 0,
                onHidden: i[1] || (i[1] = (u) => s.value = ""),
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
}, xi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function $i(t, e) {
  return v(), g("svg", xi, e[0] || (e[0] = [
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
  return v(), g("svg", Ci, e[0] || (e[0] = [
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
  return v(), g("svg", Ti, e[0] || (e[0] = [
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
  return v(), g("svg", Li, e[0] || (e[0] = [
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
function Bi(t, e) {
  return v(), g("svg", Ri, e[0] || (e[0] = [
    r("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ]));
}
const Fi = { render: Bi }, Hi = { class: "vuefinder__toolbar" }, Ii = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, Ni = ["title"], Ui = ["title"];
const Pi = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, qi = { class: "pl-2" }, zi = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Gi = { class: "vuefinder__toolbar__controls" }, ji = ["title"], Wi = ["title"], Ki = {
  __name: "Toolbar",
  setup(t) {
    const e = le("ServiceContainer"), { setStore: n } = e.storage, { t: o } = e.i18n, s = e.dragSelect, a = O(""), c = O([]), d = Xe(() => c.value.some((_) => _.onlyRead));
    e.emitter.on("vf-context-selected", (_) => {
      c.value = _;
    }), e.emitter.on("vf-contextmenu-show", ({ event: _, items: m, target: f = null }) => {
      console.log(f);
    }), e.emitter.on("vf-search-query", ({ newQuery: _ }) => {
      a.value = _;
    });
    const i = () => {
      e.fullScreen = !e.fullScreen;
    };
    Oe(() => e.fullScreen, () => {
      e.fullScreen ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "", n("full-screen", e.fullScreen), e.emitter.emit("vf-fullscreen-toggle");
    });
    const u = () => {
      e.view = e.view === "list" ? "grid" : "list", s.refreshSelection(), n("viewport", e.view);
    };
    return (_, m) => (v(), g("div", Hi, [
      a.value.length ? (v(), g("div", Pi, [
        r("div", qi, [
          Y(w(l(o)("Search results for")) + " ", 1),
          r("span", zi, w(a.value), 1)
        ]),
        l(e).fs.loading ? (v(), U(l(ns), { key: 0 })) : I("", !0)
      ])) : (v(), g("div", Ii, [
        l(e).features.includes(l(de).NEW_FOLDER) ? (v(), g("div", {
          key: 0,
          class: "mx-1.5",
          title: l(o)("New Folder"),
          onClick: m[0] || (m[0] = (f) => l(e).modal.open(Co, { items: l(s).getSelected() }))
        }, [
          j(l($o))
        ], 8, Ni)) : I("", !0),
        l(e).features.includes(l(de).NEW_FILE) ? (v(), g("div", {
          key: 1,
          class: "mx-1.5",
          title: l(o)("New File"),
          onClick: m[1] || (m[1] = (f) => l(e).modal.open(ei, { items: l(s).getSelected() }))
        }, [
          j(l(Eo))
        ], 8, Ui)) : I("", !0),
        (l(e).features.includes(l(de).RENAME), I("", !0)),
        (l(e).features.includes(l(de).DELETE), I("", !0)),
        (l(e).features.includes(l(de).UPLOAD), I("", !0)),
        (l(e).features.includes(l(de).UNARCHIVE) && l(s).getCount() === 1 && l(s).getSelected()[0].mime_type, I("", !0)),
        (l(e).features.includes(l(de).ARCHIVE), I("", !0))
      ])),
      r("div", Gi, [
        l(e).features.includes(l(de).FULL_SCREEN) ? (v(), g("div", {
          key: 0,
          onClick: i,
          class: "mx-1.5",
          title: l(o)("Toggle Full Screen")
        }, [
          l(e).fullScreen ? (v(), U(l(Vi), { key: 0 })) : (v(), U(l(Ai), { key: 1 }))
        ], 8, ji)) : I("", !0),
        r("div", {
          class: "mx-1.5",
          title: l(o)("Change View"),
          onClick: m[7] || (m[7] = (f) => a.value.length || u())
        }, [
          l(e).view === "grid" ? (v(), U(l(Oi), {
            key: 0,
            class: ye(["vf-toolbar-icon", a.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : I("", !0),
          l(e).view === "list" ? (v(), U(l(Fi), {
            key: 1,
            class: ye(["vf-toolbar-icon", a.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : I("", !0)
        ], 8, Wi)
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
  const o = O(t);
  return No((s, a) => ({
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
  return v(), g("svg", Xi, e[0] || (e[0] = [
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
    return (c, d) => (v(), U(Qe, null, {
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
              (v(!0), g(Se, null, Ce(o.value, (i) => (v(), g("div", nc, [
                r("div", null, [
                  i.type === "dir" ? (v(), g("svg", sc, d[2] || (d[2] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (v(), g("svg", oc, d[3] || (d[3] = [
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
            s.value.length ? (v(), U(Ze, {
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
}, dc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
};
function uc(t, e) {
  return v(), g("svg", dc, e[0] || (e[0] = [
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
  return v(), g("svg", fc, e[0] || (e[0] = [
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
  return v(), g("svg", pc, e[0] || (e[0] = [
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
  return v(), g("svg", bc, e[0] || (e[0] = [
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
  return v(), g("svg", kc, e[0] || (e[0] = [
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
  return v(), g("svg", $c, e[0] || (e[0] = [
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
  return v(), g("svg", Ac, e[0] || (e[0] = [
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
  return v(), g("svg", Dc, e[0] || (e[0] = [
    r("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ]));
}
const Lc = { render: Vc }, Mc = { class: "vuefinder__breadcrumb__container" }, Oc = ["title"], Rc = ["title"], Bc = ["title"], Fc = { class: "vuefinder__breadcrumb__list" }, Hc = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, Ic = { class: "relative" }, Nc = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], Uc = { class: "vuefinder__breadcrumb__search-mode" }, Pc = ["placeholder"], qc = { class: "vuefinder__breadcrumb__hidden-dropdown" }, zc = ["onDrop", "onClick"], Gc = { class: "vuefinder__breadcrumb__hidden-item-content" }, jc = { class: "vuefinder__breadcrumb__hidden-item-text" }, Wc = {
  __name: "Breadcrumb",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, o = e.dragSelect, { setStore: s } = e.storage, a = O(null), c = Es(0, 100);
    Oe(c, (D) => {
      const x = a.value.children;
      let A = 0, M = 0, V = 5, P = 1;
      e.fs.limitBreadcrumbItems(V), ct(() => {
        for (let H = x.length - 1; H >= 0 && !(A + x[H].offsetWidth > c.value - 40); H--)
          A += parseInt(x[H].offsetWidth, 10), M++;
        M < P && (M = P), M > V && (M = V), e.fs.limitBreadcrumbItems(M);
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
    const u = (D, x = null) => {
      D.preventDefault(), o.isDraggingRef.value = !1, f(D), x ?? (x = e.fs.hiddenBreadcrumbs.length - 1);
      let A = JSON.parse(D.dataTransfer.getData("items"));
      if (A.find((M) => M.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(zn, {
        items: {
          from: A,
          to: e.fs.hiddenBreadcrumbs[x] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, _ = (D, x = null) => {
      D.preventDefault(), o.isDraggingRef.value = !1, f(D), x ?? (x = e.fs.breadcrumbs.length - 2);
      let A = JSON.parse(D.dataTransfer.getData("items"));
      if (A.find((M) => M.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(zn, {
        items: {
          from: A,
          to: e.fs.breadcrumbs[x] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, m = (D) => {
      D.preventDefault(), e.fs.isGoUpAvailable() ? (D.dataTransfer.dropEffect = "copy", D.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (D.dataTransfer.dropEffect = "none", D.dataTransfer.effectAllowed = "none");
    }, f = (D) => {
      D.preventDefault(), D.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && D.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, p = () => {
      L(), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    }, h = () => {
      L(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.parentFolderPath
        }
      });
    }, y = (D) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: D.path } }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, S = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, R = {
      mounted(D, x, A, M) {
        D.clickOutsideEvent = function(V) {
          D === V.target || D.contains(V.target) || x.value();
        }, document.body.addEventListener("click", D.clickOutsideEvent);
      },
      beforeUnmount(D, x, A, M) {
        document.body.removeEventListener("click", D.clickOutsideEvent);
      }
    };
    Oe(() => e.showTreeView, (D, x) => {
      D !== x && s("show-tree-view", D);
    });
    const k = O(null), b = () => {
      e.features.includes(de.SEARCH) && (e.fs.searchMode = !0, ct(() => k.value.focus()));
    }, $ = Es("", 400);
    Oe($, (D) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: D });
    }), Oe(() => e.fs.searchMode, (D) => {
      D && ct(() => k.value.focus());
    });
    const L = () => {
      e.fs.searchMode = !1, $.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      L();
    });
    const B = () => {
      $.value === "" && L();
    };
    return (D, x) => (v(), g("div", Mc, [
      I("", !0),
      r("span", {
        title: l(n)("Go up a directory")
      }, [
        j(l(mc), {
          onDragover: x[0] || (x[0] = (A) => m(A)),
          onDragleave: x[1] || (x[1] = (A) => f(A)),
          onDrop: x[2] || (x[2] = (A) => _(A)),
          onClick: h,
          class: ye(l(e).fs.isGoUpAvailable() ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive")
        }, null, 8, ["class"])
      ], 8, Oc),
      l(e).fs.loading ? (v(), g("span", {
        key: 2,
        title: l(n)("Cancel")
      }, [
        j(l(gc), {
          onClick: x[3] || (x[3] = (A) => l(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, Bc)) : (v(), g("span", {
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
            onDragover: x[4] || (x[4] = (A) => m(A)),
            onDragleave: x[5] || (x[5] = (A) => f(A)),
            onDrop: x[6] || (x[6] = (A) => _(A, -1)),
            onClick: x[7] || (x[7] = (A) => l(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: l(e).fs.adapter } }))
          })
        ]),
        r("div", Fc, [
          l(e).fs.hiddenBreadcrumbs.length ? ue((v(), g("div", Hc, [
            x[13] || (x[13] = r("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            r("div", Ic, [
              r("span", {
                onDragenter: x[8] || (x[8] = (A) => l(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: x[9] || (x[9] = (A) => l(e).fs.toggleHiddenBreadcrumbs()),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                j(l(Lc), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [R, S]
          ]) : I("", !0)
        ]),
        r("div", {
          ref_key: "breadcrumbContainer",
          ref: a,
          class: "vuefinder__breadcrumb__visible-list",
          onClick: Ot(b, ["self"])
        }, [
          (v(!0), g(Se, null, Ce(l(e).fs.breadcrumbs, (A, M) => (v(), g("div", { key: M }, [
            x[14] || (x[14] = r("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            r("span", {
              onDragover: (V) => M === l(e).fs.breadcrumbs.length - 1 || m(V),
              onDragleave: (V) => M === l(e).fs.breadcrumbs.length - 1 || f(V),
              onDrop: (V) => M === l(e).fs.breadcrumbs.length - 1 || _(V, M),
              class: "vuefinder__breadcrumb__item",
              title: A.basename,
              onClick: (V) => l(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: l(e).fs.adapter, path: A.path } })
            }, w(A.name), 41, Nc)
          ]))), 128))
        ], 512),
        l(e).fs.loading ? (v(), U(l(ns), { key: 0 })) : I("", !0)
      ], 512), [
        [ze, !l(e).fs.searchMode]
      ]),
      ue(r("div", Uc, [
        r("div", null, [
          j(l(xc))
        ]),
        ue(r("input", {
          ref_key: "searchInput",
          ref: k,
          onKeydown: Tt(L, ["esc"]),
          onBlur: B,
          "onUpdate:modelValue": x[10] || (x[10] = (A) => Uo($) ? $.value = A : null),
          placeholder: l(n)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, Pc), [
          [Dt, l($)]
        ]),
        j(l(Ec), { onClick: L })
      ], 512), [
        [ze, l(e).fs.searchMode]
      ]),
      ue(r("div", qc, [
        (v(!0), g(Se, null, Ce(l(e).fs.hiddenBreadcrumbs, (A, M) => (v(), g("div", {
          key: M,
          onDragover: x[11] || (x[11] = (V) => m(V)),
          onDragleave: x[12] || (x[12] = (V) => f(V)),
          onDrop: (V) => u(V, M),
          onClick: (V) => y(A),
          class: "vuefinder__breadcrumb__hidden-item"
        }, [
          r("div", Gc, [
            r("span", null, [
              j(l(gn), { class: "vuefinder__breadcrumb__hidden-item-icon" })
            ]),
            x[15] || (x[15] = Y()),
            r("span", jc, w(A.name), 1)
          ])
        ], 40, zc))), 128))
      ], 512), [
        [ze, l(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, Ao = (t, e = null) => new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), Kc = ["onClick"], Yc = {
  __name: "Toast",
  setup(t) {
    const e = le("ServiceContainer"), { getStore: n } = e.storage, o = O(n("full-screen", !1)), s = O([]), a = (i) => i === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", c = (i) => {
      s.value.splice(i, 1);
    }, d = (i) => {
      let u = s.value.findIndex((_) => _.id === i);
      u !== -1 && c(u);
    };
    return e.emitter.on("vf-toast-clear", () => {
      s.value = [];
    }), e.emitter.on("vf-toast-push", (i) => {
      let u = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      i.id = u, s.value.push(i), setTimeout(() => {
        d(u);
      }, 5e3);
    }), (i, u) => (v(), g("div", {
      class: ye(["vuefinder__toast", o.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      j(Po, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: X(() => [
          (v(!0), g(Se, null, Ce(s.value, (_, m) => (v(), g("div", {
            key: m,
            onClick: (f) => c(m),
            class: ye(["vuefinder__toast__message", a(_.type)])
          }, w(_.label), 11, Kc))), 128))
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
  return v(), g("svg", Xc, e[0] || (e[0] = [
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
  return v(), g("svg", Zc, e[0] || (e[0] = [
    r("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const td = { render: ed }, Wt = {
  __name: "SortIcon",
  props: { direction: String },
  setup(t) {
    return (e, n) => (v(), g("div", null, [
      t.direction === "asc" ? (v(), U(l(Qc), { key: 0 })) : I("", !0),
      t.direction === "desc" ? (v(), U(l(td), { key: 1 })) : I("", !0)
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
  return v(), g("svg", nd, e[0] || (e[0] = [
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
    return (e, n) => (v(), g("span", rd, [
      t.type === "dir" ? (v(), U(l(gn), {
        key: 0,
        class: ye(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"])) : (v(), U(l(od), {
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
  return v(), g("svg", ld, e[0] || (e[0] = [
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
    return (n, o) => (v(), g("div", cd, [
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
  return v(), g("svg", vd, e[0] || (e[0] = [
    r("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ]));
}
const To = { render: fd }, _d = ["data-type", "data-item", "data-index"], An = {
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
      mounted(h, y, S, R) {
        S.props.draggable && (h.addEventListener("dragstart", (k) => d(k, y.value)), h.addEventListener("dragover", (k) => u(k, y.value)), h.addEventListener("drop", (k) => i(k, y.value)));
      },
      beforeUnmount(h, y, S, R) {
        S.props.draggable && (h.removeEventListener("dragstart", d), h.removeEventListener("dragover", u), h.removeEventListener("drop", i));
      }
    }, d = (h, y) => {
      if (h.altKey || h.ctrlKey || h.metaKey)
        return h.preventDefault(), !1;
      o.isDraggingRef.value = !0, h.dataTransfer.setDragImage(s.dragImage.$el, 0, 15), h.dataTransfer.effectAllowed = "all", h.dataTransfer.dropEffect = "copy", h.dataTransfer.setData("items", JSON.stringify(o.getSelected()));
    }, i = (h, y) => {
      h.preventDefault(), o.isDraggingRef.value = !1;
      let S = JSON.parse(h.dataTransfer.getData("items"));
      if (S.find((R) => R.storage !== n.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      n.modal.open(zn, { items: { from: S, to: y } });
    }, u = (h, y) => {
      h.preventDefault(), !y || y.type !== "dir" || o.getSelection().find((S) => S === h.currentTarget) ? (h.dataTransfer.dropEffect = "none", h.dataTransfer.effectAllowed = "none") : h.dataTransfer.dropEffect = "copy";
    };
    let _ = null, m = !1;
    const f = () => {
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
    return (h, y) => ue((v(), g("div", {
      style: rn({ opacity: l(o).isDraggingRef.value && l(o).getSelection().find((S) => h.$el === S) ? "0.5 !important" : "" }),
      class: ye(["vuefinder__item", "vf-item-" + l(o).explorerId]),
      "data-type": t.item.type,
      key: t.item.path,
      "data-item": JSON.stringify(t.item),
      "data-index": t.index,
      onDblclick: y[0] || (y[0] = (S) => a(t.item)),
      onTouchstart: y[1] || (y[1] = (S) => p(S)),
      onTouchend: y[2] || (y[2] = (S) => f()),
      onContextmenu: y[3] || (y[3] = Ot((S) => l(n).emitter.emit("vf-contextmenu-show", { event: S, items: l(o).getSelected(), target: t.item }), ["prevent"]))
    }, [
      Rt(h.$slots, "default"),
      l(n).pinnedFolders.find((S) => S.path === t.item.path) ? (v(), U(l(To), {
        key: 0,
        class: "vuefinder__item--pinned"
      })) : I("", !0)
    ], 46, _d)), [
      [c, t.item]
    ]);
  }
}, md = { class: "vuefinder__explorer__container" }, pd = {
  key: 0,
  class: "vuefinder__explorer__header"
}, hd = { class: "vuefinder__explorer__drag-item" }, gd = { class: "vuefinder__explorer__item-list-content" }, bd = { class: "vuefinder__explorer__item-list-name" }, wd = { class: "vuefinder__explorer__item-name" }, yd = { class: "vuefinder__explorer__item-path" }, kd = { class: "vuefinder__explorer__item-list-content" }, Sd = { class: "vuefinder__explorer__item-list-name" }, xd = { class: "vuefinder__explorer__item-name" }, $d = { class: "vuefinder__explorer__item-size" }, Cd = { class: "vuefinder__explorer__item-date" }, Ed = { class: "vuefinder__explorer__item-grid-content" }, Ad = ["data-src", "alt"], Td = {
  key: 2,
  class: "vuefinder__explorer__item-extension"
}, Dd = {
  key: 0,
  class: "vuefinder__explorer__item-title break-all"
}, Vd = {
  key: 1,
  class: "vuefinder__explorer__item-title break-all"
}, Ld = {
  __name: "Explorer",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, o = (m) => m == null ? void 0 : m.substring(0, 3), s = O(null), a = O(""), c = e.dragSelect;
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
        onSuccess: (f) => {
          f.files.length || e.emitter.emit("vf-toast-push", { label: n("No search result found.") });
        }
      }) : e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    });
    const i = vt({ active: !1, column: "", order: "" }), u = (m = !0) => {
      let f = [...e.fs.data.files], p = i.column, h = i.order === "asc" ? 1 : -1;
      if (!m)
        return f;
      const y = (S, R) => typeof S == "string" && typeof R == "string" ? S.toLowerCase().localeCompare(R.toLowerCase()) : S < R ? -1 : S > R ? 1 : 0;
      return i.active && (f = f.slice().sort((S, R) => y(S[p], R[p]) * h)), f;
    }, _ = (m) => {
      i.active && i.column === m ? (i.active = i.order === "asc", i.column = m, i.order = "desc") : (i.active = !0, i.column = m, i.order = "asc");
    };
    return Ee(() => {
      d = new Yo(c.area.value);
    }), Ts(() => {
      d.update();
    }), Io(() => {
      d.destroy();
    }), (m, f) => (v(), g("div", md, [
      l(e).view === "list" || a.value.length ? (v(), g("div", pd, [
        r("div", {
          onClick: f[0] || (f[0] = (p) => _("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          Y(w(l(n)("Name")) + " ", 1),
          ue(j(Wt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [ze, i.active && i.column === "basename"]
          ])
        ]),
        a.value.length ? I("", !0) : (v(), g("div", {
          key: 0,
          onClick: f[1] || (f[1] = (p) => _("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          Y(w(l(n)("Size")) + " ", 1),
          ue(j(Wt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [ze, i.active && i.column === "file_size"]
          ])
        ])),
        a.value.length ? I("", !0) : (v(), g("div", {
          key: 1,
          onClick: f[2] || (f[2] = (p) => _("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          Y(w(l(n)("Date")) + " ", 1),
          ue(j(Wt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [ze, i.active && i.column === "last_modified"]
          ])
        ])),
        a.value.length ? (v(), g("div", {
          key: 2,
          onClick: f[3] || (f[3] = (p) => _("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          Y(w(l(n)("Filepath")) + " ", 1),
          ue(j(Wt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [ze, i.active && i.column === "path"]
          ])
        ])) : I("", !0)
      ])) : I("", !0),
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
        onContextmenu: f[4] || (f[4] = Ot((p) => l(e).emitter.emit("vf-contextmenu-show", { event: p, items: l(c).getSelected() }), ["self", "prevent"]))
      }, [
        a.value.length ? (v(!0), g(Se, { key: 0 }, Ce(u(), (p, h) => (v(), U(An, {
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
        }, 1032, ["item", "index", "dragImage"]))), 256)) : I("", !0),
        l(e).view === "list" && !a.value.length ? (v(!0), g(Se, { key: 1 }, Ce(u(), (p, h) => (v(), U(An, {
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
              r("div", Cd, w(l(Ao)(p.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage", "draggable"]))), 128)) : I("", !0),
        l(e).view === "grid" && !a.value.length ? (v(!0), g(Se, { key: 2 }, Ce(u(!1), (p, h) => (v(), U(An, {
          item: p,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-grid",
          draggable: p.onlyRead ? "false" : "true"
        }, {
          default: X(() => [
            r("div", null, [
              r("div", Ed, [
                (p.mime_type ?? "").startsWith("image") && l(e).showThumbnails ? (v(), g("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "vuefinder__explorer__item-thumbnail lazy",
                  "data-src": l(e).requester.getPreviewUrl(l(e).fs.adapter, p),
                  alt: p.basename,
                  key: p.path
                }, null, 8, Ad)) : (v(), U(En, {
                  key: 1,
                  type: p.type
                }, null, 8, ["type"])),
                !((p.mime_type ?? "").startsWith("image") && l(e).showThumbnails) && p.type !== "dir" ? (v(), g("div", Td, w(o(p.extension)), 1)) : I("", !0)
              ]),
              p.onlyRead ? (v(), g("span", Dd, w(l(Cs)("【只读】" + p.basename)), 1)) : (v(), g("span", Vd, w(l(Cs)(p.basename)), 1))
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage", "draggable"]))), 256)) : I("", !0)
      ], 544),
      j(Yc)
    ]));
  }
}, Md = { class: "vuefinder__text-preview" }, Od = { class: "vuefinder__text-preview__header" }, Rd = ["title"], Bd = { class: "vuefinder__text-preview__actions" }, Fd = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, Hd = { key: 1 }, Id = {
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = O(""), s = O(""), a = O(null), c = O(!1), d = O(""), i = O(!1), u = le("ServiceContainer"), { t: _ } = u.i18n;
    Ee(() => {
      u.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: u.modal.data.adapter, path: u.modal.data.item.path },
        responseType: "text"
      }).then((p) => {
        o.value = p, n("success");
      });
    });
    const m = () => {
      c.value = !c.value, s.value = o.value;
    }, f = () => {
      d.value = "", i.value = !1, u.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          adapter: u.modal.data.adapter,
          path: u.modal.data.item.path
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
    return (p, h) => (v(), g("div", Md, [
      r("div", Od, [
        r("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: l(u).modal.data.item.path
        }, w(l(u).modal.data.item.basename), 9, Rd),
        r("div", Bd, [
          c.value ? (v(), g("button", {
            key: 0,
            onClick: f,
            class: "vuefinder__text-preview__save-button"
          }, w(l(_)("Save")), 1)) : I("", !0),
          l(u).features.includes(l(de).EDIT) ? (v(), g("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: h[0] || (h[0] = (y) => m())
          }, w(c.value ? l(_)("Cancel") : l(_)("Edit")), 1)) : I("", !0)
        ])
      ]),
      r("div", null, [
        c.value ? (v(), g("div", Hd, [
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
        ])) : (v(), g("pre", Fd, w(o.value), 1)),
        d.value.length ? (v(), U(Ze, {
          key: 2,
          onHidden: h[2] || (h[2] = (y) => d.value = ""),
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
}, Nd = { class: "vuefinder__image-preview" }, Ud = { class: "vuefinder__image-preview__header" }, Pd = ["title"], qd = { class: "vuefinder__image-preview__actions" }, zd = { class: "vuefinder__image-preview__image-container" }, Gd = ["src"], jd = {
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = le("ServiceContainer"), { t: s } = o.i18n, a = O(null), c = O(null), d = O(!1), i = O(""), u = O(!1), _ = () => {
      d.value = !d.value, d.value ? c.value = new Xo(a.value, {
        crop(f) {
        }
      }) : c.value.destroy();
    }, m = () => {
      c.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (f) => {
          i.value = "", u.value = !1;
          const p = new FormData();
          p.set("file", f), o.requester.send({
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
            i.value = s(h.message), u.value = !0;
          });
        }
      );
    };
    return Ee(() => {
      n("success");
    }), (f, p) => (v(), g("div", Nd, [
      r("div", Ud, [
        r("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: l(o).modal.data.item.path
        }, w(l(o).modal.data.item.basename), 9, Pd),
        r("div", qd, [
          d.value ? (v(), g("button", {
            key: 0,
            onClick: m,
            class: "vuefinder__image-preview__crop-button"
          }, w(l(s)("Crop")), 1)) : I("", !0),
          l(o).features.includes(l(de).EDIT) ? (v(), g("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: p[0] || (p[0] = (h) => _())
          }, w(d.value ? l(s)("Cancel") : l(s)("Edit")), 1)) : I("", !0)
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
      i.value.length ? (v(), U(Ze, {
        key: 0,
        onHidden: p[1] || (p[1] = (h) => i.value = ""),
        error: u.value
      }, {
        default: X(() => [
          Y(w(i.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : I("", !0)
    ]));
  }
}, Wd = { class: "vuefinder__default-preview" }, Kd = { class: "vuefinder__default-preview__header" }, Yd = ["title"], Xd = {
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = le("ServiceContainer"), o = e;
    return Ee(() => {
      o("success");
    }), (s, a) => (v(), g("div", Wd, [
      r("div", Kd, [
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
    }), (a, c) => (v(), g("div", Jd, [
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
    }), (a, c) => (v(), g("div", nu, [
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
    }), (a, c) => (v(), g("div", au, [
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
    const e = le("ServiceContainer"), { t: n } = e.i18n, o = O(!1), s = (c) => (e.modal.data.item.mime_type ?? "").startsWith(c), a = e.features.includes(de.PREVIEW);
    return a || (o.value = !0), (c, d) => (v(), U(Qe, null, {
      buttons: X(() => [
        r("button", {
          type: "button",
          onClick: d[6] || (d[6] = (i) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, w(l(n)("Close")), 1),
        l(e).features.includes(l(de).DOWNLOAD) ? (v(), g("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: l(e).requester.getDownloadUrl(l(e).modal.data.adapter, l(e).modal.data.item),
          href: l(e).requester.getDownloadUrl(l(e).modal.data.adapter, l(e).modal.data.item)
        }, w(l(n)("Download")), 9, wu)) : I("", !0)
      ]),
      default: X(() => [
        r("div", null, [
          r("div", vu, [
            l(a) ? (v(), g("div", fu, [
              s("text") ? (v(), U(Id, {
                key: 0,
                onSuccess: d[0] || (d[0] = (i) => o.value = !0)
              })) : s("image") ? (v(), U(jd, {
                key: 1,
                onSuccess: d[1] || (d[1] = (i) => o.value = !0)
              })) : s("video") ? (v(), U(tu, {
                key: 2,
                onSuccess: d[2] || (d[2] = (i) => o.value = !0)
              })) : s("audio") ? (v(), U(lu, {
                key: 3,
                onSuccess: d[3] || (d[3] = (i) => o.value = !0)
              })) : s("application/pdf") ? (v(), U(uu, {
                key: 4,
                onSuccess: d[4] || (d[4] = (i) => o.value = !0)
              })) : (v(), U(Xd, {
                key: 5,
                onSuccess: d[5] || (d[5] = (i) => o.value = !0)
              }))
            ])) : I("", !0),
            r("div", _u, [
              o.value === !1 ? (v(), g("div", mu, [
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
        r("div", pu, [
          r("div", null, [
            r("span", hu, w(l(n)("File Size")) + ": ", 1),
            Y(w(l(e).filesize(l(e).modal.data.item.file_size)), 1)
          ]),
          r("div", null, [
            r("span", gu, w(l(n)("Last Modified")) + ": ", 1),
            Y(" " + w(l(Ao)(l(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        l(e).features.includes(l(de).DOWNLOAD) ? (v(), g("div", bu, [
          r("span", null, w(l(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : I("", !0)
      ]),
      _: 1
    }));
  }
}, ku = ["href", "download"], Su = ["onClick"], xu = {
  __name: "ContextMenu",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, o = O(null), s = O([]), a = O(""), c = vt({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), d = Xe(() => c.items.filter((f) => f.key == null || e.features.includes(f.key)));
    e.emitter.on("vf-context-selected", (f) => {
      s.value = f;
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
          e.pinnedFolders = e.pinnedFolders.filter((f) => !s.value.find((p) => p.path === f.path)), e.storage.setStore("pinned-folders", e.pinnedFolders);
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
        action: () => e.modal.open(xo, { items: s })
      },
      setAllOnlyRead: {
        key: de.SETALLONLY,
        title: () => "设置只读/取消",
        action: () => {
          e.onlyReadFileStore.appendItems(s.value.map((f) => ({
            path: f.path,
            type: f.type,
            name: f.name,
            time: Date.now()
          }))), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } }), e.onlyReadFileStore.save();
        }
      }
    }, u = (f) => {
      e.emitter.emit("vf-contextmenu-hide"), f.action();
    };
    e.emitter.on("vf-search-query", ({ newQuery: f }) => {
      a.value = f;
    });
    const _ = (f, p, h) => {
      p.some((y) => y.onlyRead) || s.value.some((y) => y.onlyRead) || f.push(h);
    };
    e.emitter.on("vf-contextmenu-show", ({ event: f, items: p, target: h = null }) => {
      if (c.items = [], a.value)
        if (h)
          c.items.push(i.openDir), e.emitter.emit("vf-context-selected", [h]);
        else
          return;
      else !h && !a.value ? (c.items.push(i.refresh), c.items.push(i.selectAll), c.items.push(i.newfolder), e.emitter.emit("vf-context-selected", [])) : p.length > 1 && p.some((y) => y.path === h.path) ? (c.items.push(i.refresh), _(c.items, [h], i.delete), c.items.push(i.setAllOnlyRead), e.emitter.emit("vf-context-selected", p)) : (h.type === "dir" ? (c.items.push(i.open), c.items.push(i.setAllOnlyRead), e.pinnedFolders.findIndex((y) => y.path === h.path) !== -1 ? c.items.push(i.unpinFolder) : c.items.push(i.pinFolder)) : (c.items.push(i.preview), c.items.push(i.download), c.items.push(i.setAllOnlyRead)), _(c.items, [h], i.rename), _(c.items, [h], i.delete), e.emitter.emit("vf-context-selected", [h]));
      m(f);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      c.active = !1;
    });
    const m = (f) => {
      const p = e.dragSelect.area.value, h = e.root.getBoundingClientRect(), y = p.getBoundingClientRect();
      let S = f.clientX - h.left, R = f.clientY - h.top;
      c.active = !0, ct(() => {
        var L;
        const k = (L = o.value) == null ? void 0 : L.getBoundingClientRect();
        let b = (k == null ? void 0 : k.height) ?? 0, $ = (k == null ? void 0 : k.width) ?? 0;
        S = y.right - f.pageX + window.scrollX < $ ? S - $ : S, R = y.bottom - f.pageY + window.scrollY < b ? R - b : R, c.positions = {
          left: S + "px",
          top: R + "px"
        };
      });
    };
    return (f, p) => ue((v(), g("ul", {
      ref_key: "contextmenu",
      ref: o,
      style: rn(c.positions),
      class: "vuefinder__context-menu"
    }, [
      (v(!0), g(Se, null, Ce(d.value, (h) => (v(), g("li", {
        class: "vuefinder__context-menu__item",
        key: h.title
      }, [
        h.link ? (v(), g("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: h.link,
          download: h.link,
          onClick: p[0] || (p[0] = (y) => l(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          r("span", null, w(h.title()), 1)
        ], 8, ku)) : (v(), g("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (y) => u(h)
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
  return v(), g("svg", $u, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ]));
}
const Do = { render: Cu }, Eu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Au(t, e) {
  return v(), g("svg", Eu, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    }, null, -1)
  ]));
}
const Tu = { render: Au }, Du = { class: "vuefinder__status-bar__wrapper" }, Vu = { class: "vuefinder__status-bar__storage" }, Lu = ["title"], Mu = { class: "vuefinder__status-bar__storage-icon" }, Ou = ["value"], Ru = { class: "vuefinder__status-bar__info" }, Bu = { key: 0 }, Fu = { class: "vuefinder__status-bar__selected-count" }, Hu = { class: "vuefinder__status-bar__actions" }, Iu = ["disabled"], Nu = ["title"], Uu = {
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
    return (i, u) => (v(), g("div", Du, [
      r("div", Vu, [
        r("div", {
          class: "vuefinder__status-bar__storage-container",
          title: l(n)("Storage")
        }, [
          r("div", Mu, [
            j(l(Do))
          ]),
          ue(r("select", {
            "onUpdate:modelValue": u[0] || (u[0] = (_) => l(e).fs.adapter = _),
            onChange: a,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (v(!0), g(Se, null, Ce(l(e).fs.data.storages, (_) => (v(), g("option", { value: _ }, w(_), 9, Ou))), 256))
          ], 544), [
            [Tn, l(e).fs.adapter]
          ])
        ], 8, Lu),
        r("div", Ru, [
          c.value.length ? (v(), g("span", Bu, w(l(e).fs.data.files.length) + " items found. ", 1)) : I("", !0),
          r("span", Fu, w(l(e).dragSelect.getCount() > 0 ? l(n)("%s item(s) selected.", l(e).dragSelect.getCount()) : ""), 1)
        ])
      ]),
      r("div", Hu, [
        l(e).selectButton.active ? (v(), g("button", {
          key: 0,
          class: ye(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: u[1] || (u[1] = (_) => l(e).selectButton.click(l(s).getSelected(), _))
        }, w(l(n)("Select")), 11, Iu)) : I("", !0),
        r("span", {
          class: "vuefinder__status-bar__about",
          title: l(n)("About"),
          onClick: u[2] || (u[2] = (_) => l(e).modal.open(ko))
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
  return v(), g("svg", Pu, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ]));
}
const Vo = { render: qu }, zu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Gu(t, e) {
  return v(), g("svg", zu, e[0] || (e[0] = [
    r("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ]));
}
const ju = { render: Gu }, Wu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Ku(t, e) {
  return v(), g("svg", Wu, e[0] || (e[0] = [
    r("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M15 12H9M12 9v6" }, null, -1)
  ]));
}
const Lo = { render: Ku }, Yu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Xu(t, e) {
  return v(), g("svg", Yu, e[0] || (e[0] = [
    r("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M9 12h6" }, null, -1)
  ]));
}
const Mo = { render: Xu };
function Oo(t, e) {
  const n = t.findIndex((o) => o.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const Ju = { class: "vuefinder__folder-loader-indicator" }, Qu = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Ro = {
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ qo({
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
    const o = Vs(t, "modelValue"), s = O(!1);
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
        Oo(n.treeViewData, { path: e.path, ...d });
      }).catch((d) => {
      }).finally(() => {
        s.value = !1;
      });
    };
    return (d, i) => {
      var u;
      return v(), g("div", Ju, [
        s.value ? (v(), U(l(ns), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--loading"
        })) : (v(), g("div", Qu, [
          o.value && ((u = a()) != null && u.folders.length) ? (v(), U(l(Mo), {
            key: 0,
            class: "vuefinder__folder-loader-indicator--minus"
          })) : I("", !0),
          o.value ? I("", !0) : (v(), U(l(Lo), {
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
      const i = zo("TreeSubfolderList", !0);
      return v(), g("ul", {
        ref_key: "parentSubfolderList",
        ref: s,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (v(!0), g(Se, null, Ce(a.value, (u, _) => (v(), g("li", {
          key: u.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          r("div", Zu, [
            r("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (m) => n.value[u.path] = !n.value[u.path]
            }, [
              j(Ro, {
                adapter: t.adapter,
                path: u.path,
                modelValue: n.value[u.path],
                "onUpdate:modelValue": (m) => n.value[u.path] = m
              }, null, 8, ["adapter", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, ev),
            r("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: u.path,
              onClick: (m) => l(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o.adapter, path: u.path } })
            }, [
              r("div", nv, [
                l(e).fs.path === u.path ? (v(), U(l(Vo), { key: 0 })) : (v(), U(l(gn), { key: 1 }))
              ]),
              r("div", {
                class: ye(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": l(e).fs.path === u.path
                }])
              }, w(u.basename), 3)
            ], 8, tv)
          ]),
          r("div", sv, [
            ue(j(i, {
              adapter: o.adapter,
              path: u.path
            }, null, 8, ["adapter", "path"]), [
              [ze, n.value[u.path]]
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
    const e = le("ServiceContainer"), n = O(!1);
    return (o, s) => (v(), g(Se, null, [
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
            j(l(Do))
          ], 2),
          r("div", null, w(t.storage), 1)
        ], 2),
        r("div", rv, [
          j(Ro, {
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
    return (n, o) => (v(), g("div", av, [
      r("div", iv, [
        e.value ? (v(), U(l(Mo), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : I("", !0),
        e.value ? I("", !0) : (v(), U(l(Lo), {
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
    const e = le("ServiceContainer"), { t: n } = e.i18n, { getStore: o, setStore: s } = e.storage, a = O(190), c = O(o("pinned-folders-opened", !0));
    Oe(c, (_) => s("pinned-folders-opened", _));
    const d = (_) => {
      e.pinnedFolders = e.pinnedFolders.filter((m) => m.path !== _.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, i = (_) => {
      const m = _.clientX, f = _.target.parentElement, p = f.getBoundingClientRect().width;
      f.classList.remove("transition-[width]"), f.classList.add("transition-none");
      const h = (S) => {
        a.value = p + S.clientX - m, a.value < 50 && (a.value = 0, e.showTreeView = !1), a.value > 50 && (e.showTreeView = !0);
      }, y = () => {
        const S = f.getBoundingClientRect();
        a.value = S.width, f.classList.add("transition-[width]"), f.classList.remove("transition-none"), window.removeEventListener("mousemove", h), window.removeEventListener("mouseup", y);
      };
      window.addEventListener("mousemove", h), window.addEventListener("mouseup", y);
    }, u = O(null);
    return Ee(() => {
      Je(u.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), Oe(e.fs.data, (_, m) => {
      const f = _.files.filter((p) => p.type === "dir");
      Oo(e.treeViewData, { path: e.fs.path, folders: f.map((p) => ({
        adapter: p.storage,
        path: p.path,
        basename: p.basename
      })) });
    }), (_, m) => (v(), g(Se, null, [
      r("div", {
        onClick: m[0] || (m[0] = (f) => l(e).showTreeView = !l(e).showTreeView),
        class: ye(["vuefinder__treeview__overlay", l(e).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      r("div", {
        style: rn(l(e).showTreeView ? "min-width:100px;max-width:75%; width: " + a.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        r("div", {
          ref_key: "treeViewScrollElement",
          ref: u,
          class: "vuefinder__treeview__scroll"
        }, [
          r("div", dv, [
            r("div", {
              onClick: m[2] || (m[2] = (f) => c.value = !c.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              r("div", uv, [
                j(l(To), { class: "vuefinder__treeview__pin-icon" }),
                r("div", vv, w(l(n)("Pinned Folders")), 1)
              ]),
              j(cv, {
                modelValue: c.value,
                "onUpdate:modelValue": m[1] || (m[1] = (f) => c.value = f)
              }, null, 8, ["modelValue"])
            ]),
            c.value ? (v(), g("ul", fv, [
              (v(!0), g(Se, null, Ce(l(e).pinnedFolders, (f) => (v(), g("li", _v, [
                r("div", {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (p) => l(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: f.storage, path: f.path } })
                }, [
                  l(e).fs.path !== f.path ? (v(), U(l(gn), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : I("", !0),
                  l(e).fs.path === f.path ? (v(), U(l(Vo), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : I("", !0),
                  r("div", {
                    title: f.path,
                    class: ye(["vuefinder__treeview__folder-name text-nowrap", {
                      "vuefinder__treeview__folder-name--active": l(e).fs.path === f.path
                    }])
                  }, w(f.basename), 11, pv)
                ], 8, mv),
                r("div", {
                  class: "vuefinder__treeview__remove-favorite",
                  onClick: (p) => d(f)
                }, [
                  j(l(ju), { class: "vuefinder__treeview__remove-icon" })
                ], 8, hv)
              ]))), 256)),
              l(e).pinnedFolders.length ? I("", !0) : (v(), g("li", gv, [
                r("div", bv, w(l(n)("No folders pinned")), 1)
              ]))
            ])) : I("", !0)
          ]),
          (v(!0), g(Se, null, Ce(l(e).fs.data.storages, (f) => (v(), g("div", wv, [
            j(lv, { storage: f }, null, 8, ["storage"])
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
  emits: ["select", "openFile"],
  setup(t, { expose: e, emit: n }) {
    const o = n, s = t, a = al(s, le("VueFinderOptions"));
    Go("ServiceContainer", a);
    const { setStore: c } = a.storage, d = O(null);
    a.root = d;
    const i = a.dragSelect;
    Ua(a);
    const u = (p) => {
      p.files = p.files.map((h) => (h.onlyRead = a.onlyReadFileStore.hasItem(h.path), h)), Object.assign(a.fs.data, p), i.clearSelection(), i.refreshSelection();
    };
    let _;
    a.emitter.on("vf-fetch-abort", () => {
      _.abort(), a.fs.loading = !1;
    }), a.emitter.on("vf-fetch", ({ params: p, body: h = null, onSuccess: y = null, onError: S = null, noCloseModal: R = !1 }) => {
      ["index", "search"].includes(p.q) && (_ && _.abort(), a.fs.loading = !0), _ = new AbortController();
      const k = _.signal;
      a.requester.send({
        url: "",
        method: p.m || "get",
        params: p,
        body: h,
        abortSignal: k
      }).then((b) => {
        a.fs.adapter = b.adapter, a.persist && (a.fs.path = b.dirname, c("path", a.fs.path)), ["index", "search"].includes(p.q) && (a.fs.loading = !1), R || a.modal.close(), u(b), y && y(b);
      }).catch((b) => {
        console.error(b), S && S(b);
      });
    });
    const m = () => {
      s.minHeight == "0" || !d.value || (d.value.querySelectorAll(".vuefinder__main__container")[0].style.height = s.minHeight);
    }, f = () => {
      a.emitter.on("openfile", (p) => {
        o("openFile", p);
      });
    };
    return Ee(() => {
      let p = {};
      a.fs.path.includes("://") && (p = {
        adapter: a.fs.path.split("://")[0],
        path: a.fs.path
      }), a.emitter.emit("vf-fetch", { params: { q: "index", adapter: a.fs.adapter, ...p } }), i.onSelect((h) => {
        o("select", h);
      }), m(), f();
    }), e({
      app: a
    }), (p, h) => (v(), g("div", {
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
          t.simple ? I("", !0) : (v(), U(Ki, { key: 0 })),
          t.showPath ? (v(), U(Wc, { key: 1 })) : I("", !0),
          r("div", kv, [
            j(yv),
            j(Ld)
          ]),
          t.simple ? I("", !0) : (v(), U(Uu, { key: 2 }))
        ], 38),
        j(jo, { name: "fade" }, {
          default: X(() => [
            l(a).modal.visible ? (v(), U(Ds(l(a).modal.type), { key: 0 })) : I("", !0)
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
