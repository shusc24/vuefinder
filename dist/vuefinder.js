var Lo = Object.defineProperty;
var Mo = (t, e, n) => e in t ? Lo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var ss = (t, e, n) => Mo(t, typeof e != "symbol" ? e + "" : e, n);
import { reactive as dt, watch as Oe, ref as O, shallowRef as Oo, onMounted as Ee, onUnmounted as zn, onUpdated as As, nextTick as at, computed as Ke, inject as le, openBlock as f, createElementBlock as g, withKeys as At, unref as r, createElementVNode as l, withModifiers as Mt, renderSlot as Ot, normalizeClass as ye, toDisplayString as y, createBlock as P, resolveDynamicComponent as Ts, withCtx as ee, createVNode as j, Fragment as $e, renderList as Ce, createCommentVNode as H, withDirectives as de, vModelCheckbox as Pt, createTextVNode as K, vModelSelect as An, vModelText as Tt, onBeforeUnmount as Ro, customRef as Bo, vShow as ze, isRef as Fo, TransitionGroup as Ho, normalizeStyle as on, mergeModels as Io, useModel as Ds, resolveComponent as No, provide as Uo, Transition as qo } from "vue";
import Po from "mitt";
import zo from "dragselect";
import pv from "@uppy/core";
import gv from "@uppy/xhr-upload";
import Go from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import jo from "cropperjs";
var Es;
const wn = (Es = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : Es.getAttribute("content");
class Wo {
  /** @param {RequestConfig} config */
  constructor(e) {
    /** @type {RequestConfig} */
    ss(this, "config");
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
    wn != null && wn !== "" && (o[n.xsrfHeaderName] = wn);
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
function Yo(t) {
  const e = {
    baseUrl: "",
    headers: {},
    params: {},
    body: {},
    xsrfHeaderName: "X-CSRF-Token"
  };
  return typeof t == "string" ? Object.assign(e, { baseUrl: t }) : Object.assign(e, t), new Wo(e);
}
function Ko(t) {
  let e = localStorage.getItem(t + "_storage");
  const n = dt(JSON.parse(e ?? "{}"));
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
async function Xo(t, e) {
  const n = e[t];
  return typeof n == "function" ? (await n()).default : n;
}
function Jo(t, e, n, o) {
  const { getStore: s, setStore: a } = t, c = O({}), d = O(s("locale", e)), i = (m, u = e) => {
    Xo(m, o).then((p) => {
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
  return dt({ t: _, locale: d });
}
const fe = {
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
}, Qo = Object.values(fe), Zo = "2.5.16";
function Vs(t, e, n, o, s) {
  return (e = Math, n = e.log, o = 1024, s = n(t) / n(o) | 0, t / e.pow(o, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "iB" : "B");
}
function Ls(t, e, n, o, s) {
  return (e = Math, n = e.log, o = 1e3, s = n(t) / n(o) | 0, t / e.pow(o, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "B" : "B");
}
const Qe = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function er(t, e) {
  const n = O(Qe.SYSTEM), o = O(Qe.LIGHT);
  n.value = t.getStore("theme", e ?? Qe.SYSTEM);
  const s = window.matchMedia("(prefers-color-scheme: dark)"), a = (c) => {
    n.value === Qe.DARK || n.value === Qe.SYSTEM && c.matches ? o.value = Qe.DARK : o.value = Qe.LIGHT;
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
      n.value = c, c !== Qe.SYSTEM ? t.setStore("theme", c) : t.removeStore("theme"), a(s);
    }
  };
}
function tr() {
  const t = Oo(null), e = O(!1), n = O();
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
}, Ms = typeof window < "u" && typeof document < "u", De = Ms ? window : {}, Wt = Math.max, nr = Math.min, Tn = Math.round, Os = De.cancelAnimationFrame, Rs = De.requestAnimationFrame, Xt = De.setTimeout, Dn = De.clearTimeout, rn = (t) => typeof De[t] < "u" ? De[t] : void 0, sr = rn("MutationObserver"), os = rn("IntersectionObserver"), Jt = rn("ResizeObserver"), Vn = rn("ScrollTimeline"), Bs = Ms && Node.ELEMENT_NODE, { toString: or, hasOwnProperty: yn } = Object.prototype, rr = /^\[object (.+)\]$/, Ft = (t) => t === void 0, ln = (t) => t === null, lr = (t) => Ft(t) || ln(t) ? `${t}` : or.call(t).replace(rr, "$1").toLowerCase(), Ge = (t) => typeof t == "number", an = (t) => typeof t == "string", Fs = (t) => typeof t == "boolean", je = (t) => typeof t == "function", Ue = (t) => Array.isArray(t), Rt = (t) => typeof t == "object" && !Ue(t) && !ln(t), cn = (t) => {
  const e = !!t && t.length, n = Ge(e) && e > -1 && e % 1 == 0;
  return Ue(t) || !je(t) && n ? e > 0 && Rt(t) ? e - 1 in t : !0 : !1;
}, Qt = (t) => {
  if (!t || !Rt(t) || lr(t) !== "object")
    return !1;
  let e;
  const n = "constructor", o = t[n], s = o && o.prototype, a = yn.call(t, n), c = s && yn.call(s, "isPrototypeOf");
  if (o && !a && !c)
    return !1;
  for (e in t)
    ;
  return Ft(e) || yn.call(t, e);
}, Zt = (t) => {
  const e = HTMLElement;
  return t ? e ? t instanceof e : t.nodeType === Bs : !1;
}, dn = (t) => {
  const e = Element;
  return t ? e ? t instanceof e : t.nodeType === Bs : !1;
};
function se(t, e) {
  if (cn(t))
    for (let n = 0; n < t.length && e(t[n], n, t) !== !1; n++)
      ;
  else t && se(Object.keys(t), (n) => e(t[n], n, t));
  return t;
}
const un = (t, e) => t.indexOf(e) >= 0, Ye = (t, e) => t.concat(e), _e = (t, e, n) => (!an(e) && cn(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), ut = (t) => Array.from(t || []), Hs = (t) => Ue(t) ? t : [t], Ln = (t) => !!t && !t.length, rs = (t) => ut(new Set(t)), Re = (t, e, n) => {
  se(t, (s) => s && s.apply(void 0, e || [])), !n && (t.length = 0);
}, Is = "paddingTop", Ns = "paddingRight", Us = "paddingLeft", qs = "paddingBottom", Ps = "marginLeft", zs = "marginRight", Gs = "marginBottom", vn = "overflowX", fn = "overflowY", kt = "width", St = "height", xt = "hidden", js = "visible", Gn = (t, e, n, o) => {
  if (t && e) {
    let s = !0;
    return se(n, (a) => {
      const c = t[a], d = e[a];
      c !== d && (s = !1);
    }), s;
  }
  return !1;
}, Ws = (t, e) => Gn(t, e, ["w", "h"]), Ys = (t, e) => Gn(t, e, ["x", "y"]), ar = (t, e) => Gn(t, e, ["t", "r", "b", "l"]), Ne = () => {
}, Y = (t, ...e) => t.bind(0, ...e), ht = (t) => {
  let e;
  const n = t ? Xt : Rs, o = t ? Dn : Os;
  return [(s) => {
    o(e), e = n(s, je(t) ? t() : t);
  }, () => o(e)];
}, Ks = (t, e) => {
  let n, o, s, a = Ne;
  const { v: c, p: d, S: i } = e || {}, v = function(h) {
    a(), Dn(n), n = o = void 0, a = Ne, t.apply(this, h);
  }, _ = (p) => i && o ? i(o, p) : p, m = () => {
    a !== Ne && v(_(s) || s);
  }, u = function() {
    const h = ut(arguments), w = je(c) ? c() : c;
    if (Ge(w) && w >= 0) {
      const M = je(d) ? d() : d, S = Ge(M) && M >= 0, b = w > 0 ? Xt : Rs, C = w > 0 ? Dn : Os, I = _(h) || h, x = v.bind(0, I);
      a();
      const k = b(x, w);
      a = () => C(k), S && !n && (n = Xt(m, M)), o = s = I;
    } else
      v(h);
  };
  return u.m = m, u;
}, Xs = (t, e) => Object.prototype.hasOwnProperty.call(t, e), et = (t) => t ? Object.keys(t) : [], ne = (t, e, n, o, s, a, c) => {
  const d = [e, n, o, s, a, c];
  return (typeof t != "object" || ln(t)) && !je(t) && (t = {}), se(d, (i) => {
    se(i, (v, _) => {
      const m = i[_];
      if (t === m)
        return !0;
      const u = Ue(m);
      if (m && Qt(m)) {
        const p = t[_];
        let h = p;
        u && !Ue(p) ? h = [] : !u && !Qt(p) && (h = {}), t[_] = ne(h, m);
      } else
        t[_] = u ? m.slice() : m;
    });
  }), t;
}, Js = (t, e) => se(ne({}, t), (n, o, s) => {
  n === void 0 ? delete s[o] : n && Qt(n) && (s[o] = Js(n));
}), jn = (t) => {
  for (const e in t)
    return !1;
  return !0;
}, Mn = (t, e, n) => Wt(t, nr(e, n)), it = (t) => ut(new Set((Ue(t) ? t : (t || "").split(" ")).filter((e) => e))), _n = (t, e) => t && t.getAttribute(e), ls = (t, e) => t && t.hasAttribute(e), He = (t, e, n) => {
  se(it(e), (o) => {
    t && t.setAttribute(o, n || "");
  });
}, Pe = (t, e) => {
  se(it(e), (n) => t && t.removeAttribute(n));
}, mn = (t, e) => {
  const n = it(_n(t, e)), o = Y(He, t, e), s = (a, c) => {
    const d = new Set(n);
    return se(it(a), (i) => d[c](i)), ut(d).join(" ");
  };
  return {
    $: (a) => o(s(a, "delete")),
    O: (a) => o(s(a, "add")),
    C: (a) => {
      const c = it(a);
      return c.reduce((d, i) => d && n.includes(i), c.length > 0);
    }
  };
}, Qs = (t, e, n) => {
  mn(t, e).$(n);
}, Bt = (t, e, n) => (mn(t, e).O(n), Y(Qs, t, e, n)), Yt = (t, e, n, o) => {
  (o ? Bt : Qs)(t, e, n);
}, ir = (t, e, n) => mn(t, e).C(n), Zs = (t) => mn(t, "class"), Wn = (t, e) => {
  Zs(t).$(e);
}, en = (t, e) => (Zs(t).O(e), Y(Wn, t, e)), eo = (t, e) => {
  const n = [], o = e ? dn(e) && e : document;
  return o ? _e(n, o.querySelectorAll(t)) : n;
}, cr = (t, e) => {
  const n = e ? dn(e) && e : document;
  return n ? n.querySelector(t) : null;
}, tn = (t, e) => dn(t) ? t.matches(e) : !1, to = (t) => tn(t, "body"), On = (t) => t ? ut(t.childNodes) : [], $t = (t) => t && t.parentElement, gt = (t, e) => dn(t) && t.closest(e), Rn = (t) => document.activeElement, dr = (t, e, n) => {
  const o = gt(t, e), s = t && cr(n, o), a = gt(s, e) === o;
  return o && s ? o === t || s === t || a && gt(gt(t, n), e) !== o : !1;
}, tt = (t) => {
  if (cn(t))
    se(ut(t), (e) => tt(e));
  else if (t) {
    const e = $t(t);
    e && e.removeChild(t);
  }
}, no = (t, e, n) => {
  if (n && t) {
    let o = e, s;
    return cn(n) ? (s = document.createDocumentFragment(), se(n, (a) => {
      a === o && (o = a.previousSibling), s.appendChild(a);
    })) : s = n, e && (o ? o !== e && (o = o.nextSibling) : o = t.firstChild), t.insertBefore(s, o || null), () => tt(n);
  }
  return Ne;
}, Te = (t, e) => no(t, null, e), as = (t, e) => no($t(t), t && t.nextSibling, e), bt = (t) => {
  const e = document.createElement("div");
  return He(e, "class", t), e;
}, so = (t) => {
  const e = bt();
  return e.innerHTML = t.trim(), se(On(e), (n) => tt(n));
}, ur = /^--/, is = (t, e) => t.getPropertyValue(e) || t[e] || "", Yn = (t) => {
  const e = t || 0;
  return isFinite(e) ? e : 0;
}, zt = (t) => Yn(parseFloat(t || "")), cs = (t) => `${(Yn(t) * 100).toFixed(3)}%`, Bn = (t) => `${Yn(t)}px`;
function Ct(t, e) {
  t && se(e, (n, o) => {
    try {
      const s = t.style, a = Ge(n) ? Bn(n) : (n || "") + "";
      ur.test(o) ? s.setProperty(o, a) : s[o] = a;
    } catch {
    }
  });
}
function ct(t, e, n) {
  const o = an(e);
  let s = o ? "" : {};
  if (t) {
    const a = De.getComputedStyle(t, n) || t.style;
    s = o ? is(a, e) : e.reduce((c, d) => (c[d] = is(a, d), c), s);
  }
  return s;
}
const Ze = (t) => ct(t, "direction") === "rtl", ds = (t, e, n) => {
  const o = e ? `${e}-` : "", s = n ? `-${n}` : "", a = `${o}top${s}`, c = `${o}right${s}`, d = `${o}bottom${s}`, i = `${o}left${s}`, v = ct(t, [a, c, d, i]);
  return {
    t: zt(v[a]),
    r: zt(v[c]),
    b: zt(v[d]),
    l: zt(v[i])
  };
}, kn = (t, e) => `translate${Rt(t) ? `(${t.x},${t.y})` : `${e ? "X" : "Y"}(${t})`}`, vr = {
  w: 0,
  h: 0
}, pn = (t, e) => e ? {
  w: e[`${t}Width`],
  h: e[`${t}Height`]
} : vr, fr = (t) => pn("inner", t || De), Lt = Y(pn, "offset"), oo = Y(pn, "client"), Fn = Y(pn, "scroll"), Kn = (t) => {
  const e = parseFloat(ct(t, kt)) || 0, n = parseFloat(ct(t, St)) || 0;
  return {
    w: e - Tn(e),
    h: n - Tn(n)
  };
}, wt = (t) => t.getBoundingClientRect(), Hn = (t) => !!(t && (t[St] || t[kt])), ro = (t, e) => {
  const n = Hn(t);
  return !Hn(e) && n;
}, us = (t, e, n, o) => {
  se(it(e), (s) => {
    t.removeEventListener(s, n, o);
  });
}, ve = (t, e, n, o) => {
  var s;
  const a = (s = o && o.H) != null ? s : !0, c = o && o.I || !1, d = o && o.A || !1, i = {
    passive: a,
    capture: c
  };
  return Y(Re, it(e).map((v) => {
    const _ = d ? (m) => {
      us(t, v, _, c), n(m);
    } : n;
    return t.addEventListener(v, _, i), Y(us, t, v, _, c);
  }));
}, Xn = (t) => t.stopPropagation(), vs = (t) => t.preventDefault(), _r = {
  x: 0,
  y: 0
}, Sn = (t) => {
  const e = t && wt(t);
  return e ? {
    x: e.left + De.scrollX,
    y: e.top + De.scrollY
  } : _r;
}, nn = (t, e, n) => n ? n.n ? -t + 0 : n.i ? e - t : t : t, fs = (t, e) => [nn(0, t, e), nn(t, t, e)], _s = (t, e, n) => Mn(0, 1, nn(t, e, n) / e || 0), nt = (t, e) => {
  const { x: n, y: o } = Ge(e) ? {
    x: e,
    y: e
  } : e || {};
  Ge(n) && (t.scrollLeft = n), Ge(o) && (t.scrollTop = o);
}, Et = (t) => ({
  x: t.scrollLeft,
  y: t.scrollTop
}), ms = (t, e) => {
  se(Hs(e), t);
}, In = (t) => {
  const e = /* @__PURE__ */ new Map(), n = (a, c) => {
    if (a) {
      const d = e.get(a);
      ms((i) => {
        d && d[i ? "delete" : "clear"](i);
      }, c);
    } else
      e.forEach((d) => {
        d.clear();
      }), e.clear();
  }, o = (a, c) => {
    if (an(a)) {
      const v = e.get(a) || /* @__PURE__ */ new Set();
      return e.set(a, v), ms((_) => {
        je(_) && v.add(_);
      }, c), Y(n, a, c);
    }
    Fs(c) && c && n();
    const d = et(a), i = [];
    return se(d, (v) => {
      const _ = a[v];
      _ && _e(i, o(v, _));
    }), Y(Re, i);
  }, s = (a, c) => {
    se(ut(e.get(a)), (d) => {
      c && !Ln(c) ? d.apply(0, c) : d();
    });
  };
  return o(t || {}), [o, n, s];
}, ps = (t) => JSON.stringify(t, (e, n) => {
  if (je(n))
    throw 0;
  return n;
}), hs = (t, e) => t ? `${e}`.split(".").reduce((n, o) => n && Xs(n, o) ? n[o] : void 0, t) : void 0, mr = {
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
}, lo = (t, e) => {
  const n = {}, o = Ye(et(e), et(t));
  return se(o, (s) => {
    const a = t[s], c = e[s];
    if (Rt(a) && Rt(c))
      ne(n[s] = {}, lo(a, c)), jn(n[s]) && delete n[s];
    else if (Xs(e, s) && c !== a) {
      let d = !0;
      if (Ue(a) || Ue(c))
        try {
          ps(a) === ps(c) && (d = !1);
        } catch {
        }
      d && (n[s] = c);
    }
  }), n;
}, gs = (t, e, n) => (o) => [hs(t, o), n || hs(e, o) !== void 0], Ht = "data-overlayscrollbars", Kt = "os-environment", Gt = `${Kt}-scrollbar-hidden`, xn = `${Ht}-initialize`, Ae = Ht, ao = `${Ae}-overflow-x`, io = `${Ae}-overflow-y`, co = "overflowVisible", pr = "scrollbarPressed", Nn = "updating", hr = "body", We = `${Ht}-viewport`, gr = "arrange", uo = "scrollbarHidden", yt = co, Un = `${Ht}-padding`, br = yt, bs = `${Ht}-content`, Jn = "os-size-observer", wr = `${Jn}-appear`, yr = `${Jn}-listener`, kr = "os-trinsic-observer", Sr = "os-theme-none", Ve = "os-scrollbar", xr = `${Ve}-rtl`, $r = `${Ve}-horizontal`, Cr = `${Ve}-vertical`, vo = `${Ve}-track`, Qn = `${Ve}-handle`, Er = `${Ve}-visible`, Ar = `${Ve}-cornerless`, ws = `${Ve}-interaction`, ys = `${Ve}-unusable`, qn = `${Ve}-auto-hide`, ks = `${qn}-hidden`, Ss = `${Ve}-wheel`, Tr = `${vo}-interactive`, Dr = `${Qn}-interactive`, fo = {}, _o = {}, Vr = (t) => {
  se(t, (e) => se(e, (n, o) => {
    fo[o] = e[o];
  }));
}, mo = (t, e, n) => et(t).map((o) => {
  const { static: s, instance: a } = t[o], [c, d, i] = n || [], v = n ? a : s;
  if (v) {
    const _ = n ? v(c, d, e) : v(e);
    return (i || _o)[o] = _;
  }
}), Dt = (t) => _o[t], Lr = "__osOptionsValidationPlugin", Mr = "__osSizeObserverPlugin", Or = (t, e) => {
  const { T: n } = e, [o, s] = t("showNativeOverlaidScrollbars");
  return [o && n.x && n.y, s];
}, sn = (t) => t.indexOf(js) === 0, po = (t, e) => {
  const { D: n } = t, o = (i) => {
    const v = ct(n, i), m = (e ? e[i] : v) === "scroll";
    return [v, m];
  }, [s, a] = o(vn), [c, d] = o(fn);
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
}, Rr = (t, e, n, o) => {
  const s = e.x || e.y, a = (_, m) => {
    const u = sn(_), p = u && s ? "hidden" : "", h = m && u && _.replace(`${js}-`, "") || p;
    return [m && !u ? _ : "", sn(h) ? "hidden" : h];
  }, [c, d] = a(n.x, e.x), [i, v] = a(n.y, e.y);
  return o[vn] = d && i ? d : c, o[fn] = v && c ? v : i, po(t, o);
}, Zn = "__osScrollbarsHidingPlugin", Br = "__osClickScrollPlugin";
let $n;
const Fr = () => {
  const t = (b, C, F) => {
    Te(document.body, b), Te(document.body, b);
    const I = oo(b), x = Lt(b), k = Kn(C);
    return F && tt(b), {
      x: x.h - I.h + k.h,
      y: x.w - I.w + k.w
    };
  }, e = (b) => {
    let C = !1;
    const F = en(b, Gt);
    try {
      C = ct(b, "scrollbar-width") === "none" || ct(b, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return F(), C;
  }, n = (b, C) => {
    Ct(b, {
      [vn]: xt,
      [fn]: xt,
      direction: "rtl"
    }), nt(b, {
      x: 0
    });
    const F = Sn(b), I = Sn(C);
    nt(b, {
      x: -999
    });
    const x = Sn(C);
    return {
      i: F.x === I.x,
      n: I.x !== x.x
    };
  }, o = `.${Kt}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Kt} div{width:200%;height:200%;margin:10px 0}.${Gt}{scrollbar-width:none!important}.${Gt}::-webkit-scrollbar,.${Gt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, a = so(`<div class="${Kt}"><div></div><style>${o}</style></div>`)[0], c = a.firstChild, [d, , i] = In(), [v, _] = Ie({
    o: t(a, c),
    u: Ys
  }, Y(t, a, c, !0)), [m] = _(), u = e(a), p = {
    x: m.x === 0,
    y: m.y === 0
  }, h = {
    elements: {
      host: null,
      padding: !u,
      viewport: (b) => u && to(b) && b,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, w = ne({}, mr), $ = Y(ne, {}, w), M = Y(ne, {}, h), S = {
    P: m,
    T: p,
    L: u,
    J: !!Vn,
    K: n(a, c),
    Z: Y(d, "r"),
    G: M,
    tt: (b) => ne(h, b) && M(),
    nt: $,
    ot: (b) => ne(w, b) && $(),
    st: ne({}, h),
    et: ne({}, w)
  };
  return Pe(a, "style"), tt(a), De.addEventListener("resize", () => {
    let b;
    if (!u && (!p.x || !p.y)) {
      const C = Dt(Zn);
      b = !!(C ? C.Y() : Ne)(S, v);
    }
    i("r", [b]);
  }), S;
}, Be = () => ($n || ($n = Fr()), $n), ho = (t, e) => je(e) ? e.apply(0, t) : e, Hr = (t, e, n, o) => {
  const s = Ft(o) ? n : o;
  return ho(t, s) || e.apply(0, t);
}, go = (t, e, n, o) => {
  const s = Ft(o) ? n : o, a = ho(t, s);
  return !!a && (Zt(a) ? a : e.apply(0, t));
}, Ir = (t, e) => {
  const { nativeScrollbarsOverlaid: n, body: o } = e || {}, { T: s, L: a, G: c } = Be(), { nativeScrollbarsOverlaid: d, body: i } = c().cancel, v = n ?? d, _ = Ft(o) ? i : o, m = (s.x || s.y) && v, u = t && (ln(_) ? !a : _);
  return !!m || !!u;
}, es = /* @__PURE__ */ new WeakMap(), Nr = (t, e) => {
  es.set(t, e);
}, Ur = (t) => {
  es.delete(t);
}, bo = (t) => es.get(t), qr = (t, e, n) => {
  let o = !1;
  const s = n ? /* @__PURE__ */ new WeakMap() : !1, a = () => {
    o = !0;
  }, c = (d) => {
    if (s && n) {
      const i = n.map((v) => {
        const [_, m] = v || [];
        return [m && _ ? (d || eo)(_, t) : [], m];
      });
      se(i, (v) => se(v[0], (_) => {
        const m = v[1], u = s.get(_) || [];
        if (t.contains(_) && m) {
          const h = ve(_, m, (w) => {
            o ? (h(), s.delete(_)) : e(w);
          });
          s.set(_, _e(u, h));
        } else
          Re(u), s.delete(_);
      }));
    }
  };
  return c(), [a, c];
}, xs = (t, e, n, o) => {
  let s = !1;
  const { ct: a, rt: c, lt: d, it: i, ut: v, dt: _ } = o || {}, m = Ks(() => s && n(!0), {
    v: 33,
    p: 99
  }), [u, p] = qr(t, m, d), h = a || [], w = c || [], $ = Ye(h, w), M = (b, C) => {
    if (!Ln(C)) {
      const F = v || Ne, I = _ || Ne, x = [], k = [];
      let D = !1, L = !1;
      if (se(C, (E) => {
        const { attributeName: U, target: B, type: W, oldValue: J, addedNodes: oe, removedNodes: G } = E, Q = W === "attributes", ue = W === "childList", z = t === B, ie = Q && U, ae = ie && _n(B, U || "") || null, ce = ie && J !== ae, ke = un(w, U) && ce;
        if (e && (ue || !z)) {
          const ge = Q && ce, me = ge && i && tn(B, i), V = (me ? !F(B, U, J, ae) : !Q || ge) && !I(E, !!me, t, o);
          se(oe, (T) => _e(x, T)), se(G, (T) => _e(x, T)), L = L || V;
        }
        !e && z && ce && !F(B, U, J, ae) && (_e(k, U), D = D || ke);
      }), p((E) => rs(x).reduce((U, B) => (_e(U, eo(E, B)), tn(B, E) ? _e(U, B) : U), [])), e)
        return !b && L && n(!1), [!1];
      if (!Ln(k) || D) {
        const E = [rs(k), D];
        return !b && n.apply(0, E), E;
      }
    }
  }, S = new sr(Y(M, !1));
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
      return m.m(), M(!0, S.takeRecords());
  }];
}, wo = (t, e, n) => {
  const { ft: s, _t: a } = n || {}, c = Dt(Mr), { K: d } = Be(), i = Y(Ze, t), [v] = Ie({
    o: !1,
    _: !0
  });
  return () => {
    const _ = [], u = so(`<div class="${Jn}"><div class="${yr}"></div></div>`)[0], p = u.firstChild, h = (w) => {
      const $ = w instanceof ResizeObserverEntry, M = !$ && Ue(w);
      let S = !1, b = !1, C = !0;
      if ($) {
        const [F, , I] = v(w.contentRect), x = Hn(F), k = ro(F, I);
        b = !I || k, S = !b && !x, C = !S;
      } else M ? [, C] = w : b = w === !0;
      if (s && C) {
        const F = M ? w[0] : Ze(u);
        nt(u, {
          x: nn(3333333, 3333333, F && d),
          y: 3333333
        });
      }
      S || e({
        vt: M ? w : void 0,
        ht: !M,
        _t: b
      });
    };
    if (Jt) {
      const w = new Jt(($) => h($.pop()));
      w.observe(p), _e(_, () => {
        w.disconnect();
      });
    } else if (c) {
      const [w, $] = c(p, h, a);
      _e(_, Ye([en(u, wr), ve(u, "animationstart", w)], $));
    } else
      return Ne;
    if (s) {
      const [w] = Ie({
        o: void 0
      }, i);
      _e(_, ve(u, "scroll", ($) => {
        const M = w(), [S, b, C] = M;
        b && (Wn(p, "ltr rtl"), en(p, S ? "rtl" : "ltr"), h([!!S, b, C])), Xn($);
      }));
    }
    return Y(Re, _e(_, Te(t, u)));
  };
}, Pr = (t, e) => {
  let n;
  const o = (i) => i.h === 0 || i.isIntersecting || i.intersectionRatio > 0, s = bt(kr), [a] = Ie({
    o: !1
  }), c = (i, v) => {
    if (i) {
      const _ = a(o(i)), [, m] = _;
      return m && !v && e(_) && [_];
    }
  }, d = (i, v) => c(v.pop(), i);
  return [() => {
    const i = [];
    if (os)
      n = new os(Y(d, !1), {
        root: t
      }), n.observe(s), _e(i, () => {
        n.disconnect();
      });
    else {
      const v = () => {
        const _ = Lt(s);
        c(_);
      };
      _e(i, wo(s, v)()), v();
    }
    return Y(Re, _e(i, Te(t, s)));
  }, () => n && d(!0, n.takeRecords())];
}, zr = (t, e, n, o) => {
  let s, a, c, d, i, v;
  const { L: _ } = Be(), m = `[${Ae}]`, u = `[${We}]`, p = ["tabindex"], h = ["wrap", "cols", "rows"], w = ["id", "class", "style", "open"], { gt: $, bt: M, D: S, wt: b, yt: C, V: F, St: I, $t: x } = t, k = {
    Ot: !1,
    N: Ze($)
  }, D = Be(), L = Dt(Zn), [E] = Ie({
    u: Ws,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const A = L && L.M(t, e, k, D, n).W, V = I(yt), T = !F && I(gr), R = T && Et(S);
    x(yt), F && x(Nn, !0);
    const N = T && A && A()[0], q = Fn(b), Z = Fn(S), te = Kn(S);
    return x(yt, V), F && x(Nn), N && N(), nt(S, R), {
      w: Z.w + q.w + te.w,
      h: Z.h + q.h + te.h
    };
  }), U = C ? h : Ye(w, h), B = Ks(o, {
    v: () => s,
    p: () => a,
    S(A, V) {
      const [T] = A, [R] = V;
      return [Ye(et(T), et(R)).reduce((N, q) => (N[q] = T[q] || R[q], N), {})];
    }
  }), W = (A) => {
    if (F) {
      const V = Ze($);
      ne(A, {
        Ct: v !== V
      }), ne(k, {
        N: V
      }), v = V;
    }
  }, J = (A) => {
    se(A || p, (V) => {
      if (un(p, V)) {
        const T = _n(M, V);
        an(T) ? He(S, V, T) : Pe(S, V);
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
    const N = !(A && !T && !V) && _ ? B : o, [q, Z] = V || [], te = {
      ht: A || T,
      _t: T,
      Ct: Z
    };
    W(te), V && ne(k, {
      N: q
    }), N(te);
  }, Q = (A, V) => {
    const [, T] = E(), R = {
      Ht: T
    };
    return W(R), T && !V && (A ? o : B)(R), R;
  }, ue = (A, V, T) => {
    const R = {
      zt: V
    };
    return W(R), V && !T ? B(R) : F || J(A), R;
  }, { Z: z } = D, [ie, ae] = b ? Pr(M, oe) : [], ce = !F && wo(M, G, {
    _t: !0,
    ft: !0
  }), [ke, ge] = xs(M, !1, ue, {
    rt: w,
    ct: Ye(w, p)
  }), me = F && Jt && new Jt((A) => {
    const V = A[A.length - 1].contentRect;
    G({
      ht: !0,
      _t: ro(V, i)
    }), i = V;
  });
  return [() => {
    J(), me && me.observe(M);
    const A = ce && ce(), V = ie && ie(), T = ke(), R = z((N) => {
      const [, q] = E();
      B({
        It: N,
        Ht: q
      });
    });
    return () => {
      me && me.disconnect(), A && A(), V && V(), d && d(), T(), R();
    };
  }, ({ Et: A, At: V, Tt: T }) => {
    const R = {}, [N] = A("update.ignoreMutation"), [q, Z] = A("update.attributes"), [te, pe] = A("update.elementEvents"), [be, X] = A("update.debounce"), we = pe || Z, Se = V || T, Fe = (re) => je(N) && N(re);
    if (we) {
      c && c(), d && d();
      const [re, xe] = xs(b || S, !0, Q, {
        ct: Ye(U, q || []),
        lt: te,
        it: m,
        dt: (Le, he) => {
          const { target: Me, attributeName: It } = Le;
          return (!he && It && !F ? dr(Me, m, u) : !1) || !!gt(Me, `.${Ve}`) || !!Fe(Le);
        }
      });
      d = re(), c = xe;
    }
    if (X)
      if (B.m(), Ue(be)) {
        const re = be[0], xe = be[1];
        s = Ge(re) && re, a = Ge(xe) && xe;
      } else Ge(be) ? (s = be, a = !1) : (s = !1, a = !1);
    if (Se) {
      const re = ge(), xe = ae && ae(), Le = c && c();
      re && ne(R, ue(re[0], re[1], Se)), xe && ne(R, oe(xe[0], Se)), Le && ne(R, Q(Le[0], Se));
    }
    return W(R), R;
  }, k];
}, Gr = (t, e, n, o) => {
  const { G: s, K: a } = Be(), { scrollbars: c } = s(), { slot: d } = c, { gt: i, bt: v, D: _, Dt: m, kt: u, Rt: p, V: h } = e, { scrollbars: w } = m ? {} : t, { slot: $ } = w || {}, M = /* @__PURE__ */ new Map(), S = (A) => Vn && new Vn({
    source: u,
    axis: A
  }), b = S("x"), C = S("y"), F = go([i, v, _], () => h && p ? i : v, d, $), I = (A, V) => {
    if (V) {
      const te = A ? kt : St, { Mt: pe, Vt: be } = V, X = wt(be)[te], we = wt(pe)[te];
      return Mn(0, 1, X / we || 0);
    }
    const T = A ? "x" : "y", { Lt: R, Pt: N } = n, q = N[T], Z = R[T];
    return Mn(0, 1, q / (q + Z) || 0);
  }, x = (A, V, T, R) => {
    const N = I(T, A);
    return 1 / N * (1 - N) * (R ? 1 - V : V) || 0;
  }, k = (A, V) => ne(A, V ? {
    clear: ["left"]
  } : {}), D = (A) => {
    M.forEach((V, T) => {
      (A ? un(Hs(A), T) : !0) && (se(V || [], (N) => {
        N && N.cancel();
      }), M.delete(T));
    });
  }, L = (A, V, T, R) => {
    const N = M.get(A) || [], q = N.find((Z) => Z && Z.timeline === V);
    q ? q.effect = new KeyframeEffect(A, T, {
      composite: R
    }) : M.set(A, Ye(N, [A.animate(T, {
      timeline: V,
      composite: R
    })]));
  }, E = (A, V, T) => {
    const R = T ? en : Wn;
    se(A, (N) => {
      R(N.Ut, V);
    });
  }, U = (A, V) => {
    se(A, (T) => {
      const [R, N] = V(T);
      Ct(R, N);
    });
  }, B = (A, V) => {
    U(A, (T) => {
      const { Vt: R } = T;
      return [R, {
        [V ? kt : St]: cs(I(V))
      }];
    });
  }, W = (A, V) => {
    const { Lt: T } = n, R = V ? T.x : T.y, N = (q, Z, te) => kn(cs(x(q, _s(Z, R, te), V, te)), V);
    if (b && C)
      se(A, (q) => {
        const { Ut: Z, Vt: te } = q, pe = V && Ze(Z) && a;
        L(te, V ? b : C, k({
          transform: fs(R, pe).map((be) => N(q, be, pe))
        }, pe));
      });
    else {
      const q = Et(u);
      U(A, (Z) => {
        const { Vt: te, Ut: pe } = Z;
        return [te, {
          transform: N(Z, V ? q.x : q.y, V && Ze(pe) && a)
        }];
      });
    }
  }, J = (A) => h && !p && $t(A) === _, oe = [], G = [], Q = [], ue = (A, V, T) => {
    const R = Fs(T), N = R ? T : !0, q = R ? !T : !0;
    N && E(G, A, V), q && E(Q, A, V);
  }, z = () => {
    B(G, !0), B(Q);
  }, ie = () => {
    W(G, !0), W(Q);
  }, ae = () => {
    if (h) {
      const { Lt: A } = n, V = 0.5;
      if (b && C)
        se(Ye(Q, G), ({ Ut: T }) => {
          if (J(T)) {
            const R = (N, q, Z) => {
              const te = Z && Ze(T) && a;
              L(T, N, k({
                transform: fs(q - V, te).map((pe) => kn(Bn(pe), Z))
              }, te), "add");
            };
            R(b, A.x, !0), R(C, A.y);
          } else
            D(T);
        });
      else {
        const T = Et(u), R = (N) => {
          const { Ut: q } = N, Z = J(q) && q, te = (pe, be, X) => {
            const we = _s(pe, be, X), Se = be * we;
            return Bn(X ? -Se : Se);
          };
          return [Z, {
            transform: Z ? kn({
              x: te(T.x, A.x, Ze(q) && a),
              y: te(T.y, A.y)
            }) : ""
          }];
        };
        U(G, R), U(Q, R);
      }
    }
  }, ce = (A) => {
    const T = bt(`${Ve} ${A ? $r : Cr}`), R = bt(vo), N = bt(Qn), q = {
      Ut: T,
      Mt: R,
      Vt: N
    };
    return _e(A ? G : Q, q), _e(oe, [Te(T, R), Te(R, N), Y(tt, T), D, o(q, ue, W, A)]), q;
  }, ke = Y(ce, !0), ge = Y(ce, !1), me = () => (Te(F, G[0].Ut), Te(F, Q[0].Ut), Y(Re, oe));
  return ke(), ge(), [{
    Bt: z,
    Nt: ie,
    jt: ae,
    Ft: ue,
    qt: {
      J: b,
      Wt: G,
      Xt: ke,
      Yt: Y(U, G)
    },
    Jt: {
      J: C,
      Wt: Q,
      Xt: ge,
      Yt: Y(U, Q)
    }
  }, me];
}, jr = (t, e, n, o) => {
  const { bt: s, D: a, V: c, kt: d, Kt: i } = e;
  return (v, _, m, u) => {
    const { Ut: p, Mt: h, Vt: w } = v, [$, M] = ht(333), [S, b] = ht(), C = Y(m, [v], u), F = !!d.scrollBy, I = `client${u ? "X" : "Y"}`, x = u ? kt : St, k = u ? "left" : "top", D = u ? "w" : "h", L = u ? "x" : "y", E = (W) => W.propertyName.indexOf(x) > -1, U = () => {
      const W = "pointerup pointerleave pointercancel lostpointercapture", J = (oe, G) => (Q) => {
        const { Lt: ue } = n, z = Lt(h)[D] - Lt(w)[D], ae = G * Q / z * ue[L];
        nt(d, {
          [L]: oe + ae
        });
      };
      return ve(h, "pointerdown", (oe) => {
        const G = gt(oe.target, `.${Qn}`) === w, Q = G ? w : h, ue = t.scrollbars, { button: z, isPrimary: ie, pointerType: ae } = oe, { pointers: ce } = ue;
        if (z === 0 && ie && ue[G ? "dragScroll" : "clickScroll"] && (ce || []).includes(ae)) {
          const ge = !G && oe.shiftKey, me = Y(wt, w), A = Y(wt, h), V = (re, xe) => (re || me())[k] - (xe || A())[k], T = Tn(wt(d)[x]) / Lt(d)[D] || 1, R = J(Et(d)[L] || 0, 1 / T), N = oe[I], q = me(), Z = A(), te = q[x], pe = V(q, Z) + te / 2, be = N - Z[k], X = G ? 0 : be - pe, we = (re) => {
            Re(Fe), Q.releasePointerCapture(re.pointerId);
          }, Fe = [Bt(s, Ae, pr), ve(i, W, we), ve(i, "selectstart", (re) => vs(re), {
            H: !1
          }), ve(h, W, we), ve(h, "pointermove", (re) => {
            const xe = re[I] - N;
            (G || ge) && R(X + xe);
          })];
          if (Q.setPointerCapture(oe.pointerId), ge)
            R(X);
          else if (!G) {
            const re = Dt(Br);
            re && _e(Fe, re(R, V, X, te, be));
          }
        }
      });
    };
    let B = !0;
    return Y(Re, [ve(w, "pointermove pointerleave", o), ve(p, "pointerenter", () => {
      _(ws, !0);
    }), ve(p, "pointerleave pointercancel", () => {
      _(ws, !1);
    }), !c && ve(p, "mousedown", () => {
      const W = Rn();
      (ls(W, We) || ls(W, Ae) || W === document.body) && Xt(() => {
        a.focus({
          preventScroll: !0
        });
      }, 25);
    }), ve(p, "wheel", (W) => {
      const { deltaX: J, deltaY: oe, deltaMode: G } = W;
      F && B && G === 0 && $t(p) === s && d.scrollBy({
        left: J,
        top: oe,
        behavior: "smooth"
      }), B = !1, _(Ss, !0), $(() => {
        B = !0, _(Ss);
      }), vs(W);
    }, {
      H: !1,
      I: !0
    }), ve(w, "transitionstart", (W) => {
      if (E(W)) {
        const J = () => {
          C(), S(J);
        };
        J();
      }
    }), ve(w, "transitionend transitioncancel", (W) => {
      E(W) && (b(), C());
    }), ve(p, "mousedown", Y(ve, i, "click", Xn, {
      A: !0,
      I: !0
    }), {
      I: !0
    }), U(), M, b]);
  };
}, Wr = (t, e, n, o, s, a) => {
  let c, d, i, v, _, m = Ne, u = 0;
  const p = (z) => z.pointerType === "mouse", [h, w] = ht(), [$, M] = ht(100), [S, b] = ht(100), [C, F] = ht(() => u), [I, x] = Gr(t, s, o, jr(e, s, o, (z) => p(z) && oe())), { bt: k, Zt: D, Rt: L } = s, { Ft: E, Bt: U, Nt: B, jt: W } = I, J = (z, ie) => {
    if (F(), z)
      E(ks);
    else {
      const ae = Y(E, ks, !0);
      u > 0 && !ie ? C(ae) : ae();
    }
  }, oe = () => {
    (i ? !c : !v) && (J(!0), $(() => {
      J(!1);
    }));
  }, G = (z) => {
    E(qn, z, !0), E(qn, z, !1);
  }, Q = (z) => {
    p(z) && (c = i, i && J(!0));
  }, ue = [F, M, b, w, () => m(), ve(k, "pointerover", Q, {
    A: !0
  }), ve(k, "pointerenter", Q), ve(k, "pointerleave", (z) => {
    p(z) && (c = !1, i && J(!1));
  }), ve(k, "pointermove", (z) => {
    p(z) && d && oe();
  }), ve(D, "scroll", (z) => {
    h(() => {
      B(), oe();
    }), a(z), W();
  })];
  return [() => Y(Re, _e(ue, x())), ({ Et: z, Tt: ie, Gt: ae, Qt: ce }) => {
    const { tn: ke, nn: ge, sn: me } = ce || {}, { Ct: A, _t: V } = ae || {}, { N: T } = n, { T: R } = Be(), { k: N, en: q } = o, [Z, te] = z("showNativeOverlaidScrollbars"), [pe, be] = z("scrollbars.theme"), [X, we] = z("scrollbars.visibility"), [Se, Fe] = z("scrollbars.autoHide"), [re, xe] = z("scrollbars.autoHideSuspend"), [Le] = z("scrollbars.autoHideDelay"), [he, Me] = z("scrollbars.dragScroll"), [It, Nt] = z("scrollbars.clickScroll"), [Ut, qe] = z("overflow"), rt = V && !ie, lt = q.x || q.y, gn = ke || ge || A || ie, Je = me || we || qe, bn = Z && R.x && R.y, ft = (_t, mt, Vt) => {
      const qt = _t.includes("scroll") && (X === "visible" || X === "auto" && mt === "scroll");
      return E(Er, qt, Vt), qt;
    };
    if (u = Le, rt && (re && lt ? (G(!1), m(), S(() => {
      m = ve(D, "scroll", Y(G, !0), {
        A: !0
      });
    })) : G(!0)), te && E(Sr, bn), be && (E(_), E(pe, !0), _ = pe), xe && !re && G(!0), Fe && (d = Se === "move", i = Se === "leave", v = Se === "never", J(v, !0)), Me && E(Dr, he), Nt && E(Tr, It), Je) {
      const _t = ft(Ut.x, N.x, !0), mt = ft(Ut.y, N.y, !1);
      E(Ar, !(_t && mt));
    }
    gn && (U(), B(), W(), E(ys, !q.x, !0), E(ys, !q.y, !1), E(xr, T && !L));
  }, {}, I];
}, Yr = (t) => {
  const e = Be(), { G: n, L: o } = e, { elements: s } = n(), { host: a, padding: c, viewport: d, content: i } = s, v = Zt(t), _ = v ? {} : t, { elements: m } = _, { host: u, padding: p, viewport: h, content: w } = m || {}, $ = v ? t : _.target, M = to($), S = tn($, "textarea"), b = $.ownerDocument, C = b.documentElement, F = () => b.defaultView || De, I = (X) => {
    X && X.focus && X.focus({
      preventScroll: !0
    });
  }, x = Y(Hr, [$]), k = Y(go, [$]), D = Y(bt, ""), L = Y(x, D, d), E = Y(k, D, i), U = L(h), B = U === $, W = B && M, J = !B && E(w), oe = !B && U === J, G = W ? C : U, Q = S ? x(D, a, u) : $, ue = W ? G : Q, z = !B && k(D, c, p), ie = !oe && J, ae = [ie, G, z, ue].map((X) => Zt(X) && !$t(X) && X), ce = (X) => X && un(ae, X), ke = ce(G) ? $ : G, ge = {
    gt: $,
    bt: ue,
    D: G,
    cn: z,
    wt: ie,
    kt: W ? C : G,
    Zt: W ? b : G,
    rn: M ? C : ke,
    Kt: b,
    yt: S,
    Rt: M,
    Dt: v,
    V: B,
    ln: F,
    St: (X) => ir(G, B ? Ae : We, X),
    $t: (X, we) => Yt(G, B ? Ae : We, X, we)
  }, { gt: me, bt: A, cn: V, D: T, wt: R } = ge, N = [() => {
    Pe(A, [Ae, xn]), Pe(me, xn), M && Pe(C, [xn, Ae]);
  }], q = S && ce(A);
  let Z = S ? me : On([R, T, V, A, me].find((X) => X && !ce(X)));
  const te = W ? me : R || T, pe = Y(Re, N);
  return [ge, () => {
    const X = F(), we = Rn(), Se = (he) => {
      Te($t(he), On(he)), tt(he);
    }, Fe = (he) => he ? ve(he, "focusin focusout focus blur", (Me) => {
      Xn(Me), Me.stopImmediatePropagation();
    }, {
      I: !0,
      H: !1
    }) : Ne, re = "tabindex", xe = _n(T, re), Le = Fe(we);
    return He(A, Ae, B ? "viewport" : "host"), He(V, Un, ""), He(R, bs, ""), B || (He(T, We, ""), He(T, re, xe || "-1"), M && Bt(C, Ae, hr)), q && (as(me, A), _e(N, () => {
      as(A, me), tt(A);
    })), Te(te, Z), Te(A, V), Te(V || A, !B && T), Te(T, R), _e(N, [Le, () => {
      const he = Rn(), Me = Fe(he);
      Pe(V, Un), Pe(R, bs), Pe(T, [ao, io, We]), xe ? He(T, re, xe) : Pe(T, re), ce(R) && Se(R), ce(T) && Se(T), ce(V) && Se(V), I(he), Me();
    }]), o && !B && (Bt(T, We, uo), _e(N, Y(Pe, T, We))), I(!B && we === $ && X.top === X ? T : we), Le(), Z = 0, pe;
  }, pe];
}, Kr = ({ wt: t }) => ({ Gt: e, an: n, Tt: o }) => {
  const { xt: s } = e || {}, { Ot: a } = n;
  t && (s || o) && Ct(t, {
    [St]: a && "100%"
  });
}, Xr = ({ bt: t, cn: e, D: n, V: o }, s) => {
  const [a, c] = Ie({
    u: ar,
    o: ds()
  }, Y(ds, t, "padding", ""));
  return ({ Et: d, Gt: i, an: v, Tt: _ }) => {
    let [m, u] = c(_);
    const { L: p } = Be(), { ht: h, Ht: w, Ct: $ } = i || {}, { N: M } = v, [S, b] = d("paddingAbsolute");
    (h || u || (_ || w)) && ([m, u] = a(_));
    const F = !o && (b || $ || u);
    if (F) {
      const I = !S || !e && !p, x = m.r + m.l, k = m.t + m.b, D = {
        [zs]: I && !M ? -x : 0,
        [Gs]: I ? -k : 0,
        [Ps]: I && M ? -x : 0,
        top: I ? -m.t : 0,
        right: I ? M ? -m.r : "auto" : 0,
        left: I ? M ? "auto" : -m.l : 0,
        [kt]: I && `calc(100% + ${x}px)`
      }, L = {
        [Is]: I ? m.t : 0,
        [Ns]: I ? m.r : 0,
        [qs]: I ? m.b : 0,
        [Us]: I ? m.l : 0
      };
      Ct(e || n, D), Ct(n, L), ne(s, {
        cn: m,
        un: !I,
        j: e ? L : ne({}, D, L)
      });
    }
    return {
      dn: F
    };
  };
}, Jr = (t, e) => {
  const n = Be(), { bt: o, cn: s, D: a, V: c, Rt: d, $t: i, ln: v } = t, { L: _ } = n, m = d && c, u = Y(Wt, 0), p = {
    u: Ws,
    o: {
      w: 0,
      h: 0
    }
  }, h = {
    u: Ys,
    o: {
      x: xt,
      y: xt
    }
  }, w = (L, E) => {
    const U = De.devicePixelRatio % 1 !== 0 ? 1 : 0, B = {
      w: u(L.w - E.w),
      h: u(L.h - E.h)
    };
    return {
      w: B.w > U ? B.w : 0,
      h: B.h > U ? B.h : 0
    };
  }, [$, M] = Ie(p, Y(Kn, a)), [S, b] = Ie(p, Y(Fn, a)), [C, F] = Ie(p), [I, x] = Ie(p), [k] = Ie(h), D = Dt(Zn);
  return ({ Et: L, Gt: E, an: U, Tt: B }, { dn: W }) => {
    const { ht: J, Ht: oe, Ct: G, It: Q } = E || {}, ue = D && D.M(t, e, U, n, L), { q: z, W: ie, X: ae } = ue || {}, [ce, ke] = Or(L, n), [ge, me] = L("overflow"), A = J || W || oe || G || Q || ke, V = sn(ge.x), T = sn(ge.y), R = V || T;
    let N = M(B), q = b(B), Z = F(B), te = x(B), pe;
    if (ke && _ && i(uo, !ce), A) {
      R && i(yt, !1);
      const [qe, rt] = ie ? ie(pe) : [], [lt, gn] = N = $(B), [Je, bn] = q = S(B), ft = oo(a), _t = Je, mt = ft;
      qe && qe(), (bn || gn || ke) && rt && !ce && z && z(rt, Je, lt);
      const Vt = fr(v()), qt = {
        w: u(Wt(Je.w, _t.w) + lt.w),
        h: u(Wt(Je.h, _t.h) + lt.h)
      }, ns = {
        w: u((m ? Vt.w : mt.w + u(ft.w - Je.w)) + lt.w),
        h: u((m ? Vt.h : mt.h + u(ft.h - Je.h)) + lt.h)
      };
      te = I(ns), Z = C(w(qt, ns), B);
    }
    const [be, X] = te, [we, Se] = Z, [Fe, re] = q, [xe, Le] = N, he = {
      x: we.w > 0,
      y: we.h > 0
    }, Me = V && T && (he.x || he.y) || V && he.x && !he.y || T && he.y && !he.x;
    if (W || G || Q || Le || re || X || Se || me || ke || A) {
      const qe = {}, rt = Rr(t, he, ge, qe);
      ae && ae(rt, U, !!z && z(rt, Fe, xe), qe), c ? (He(o, ao, qe[vn]), He(o, io, qe[fn])) : Ct(a, qe);
    }
    Yt(o, Ae, co, Me), Yt(s, Un, br, Me), c || Yt(a, We, yt, R);
    const [Nt, Ut] = k(po(t).k);
    return ne(e, {
      k: Nt,
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
      sn: Ut,
      tn: X,
      nn: Se
    };
  };
}, Qr = (t) => {
  const [e, n, o] = Yr(t), s = {
    cn: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    un: !1,
    j: {
      [zs]: 0,
      [Gs]: 0,
      [Ps]: 0,
      [Is]: 0,
      [Ns]: 0,
      [qs]: 0,
      [Us]: 0
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
      x: xt,
      y: xt
    },
    en: {
      x: !1,
      y: !1
    }
  }, { gt: a, D: c, V: d } = e, { L: i, T: v } = Be(), _ = !i && (v.x || v.y), m = [Kr(e), Xr(e, s), Jr(e, s)];
  return [n, (u) => {
    const p = {}, w = _ && Et(c), $ = d ? Bt(c, Ae, Nn) : Ne;
    return se(m, (M) => {
      ne(p, M(u, p) || {});
    }), $(), nt(c, w), !d && nt(a, 0), p;
  }, s, e, o];
}, Zr = (t, e, n, o) => {
  const s = gs(e, {}), [a, c, d, i, v] = Qr(t), [_, m, u] = zr(i, d, s, (S) => {
    M({}, S);
  }), [p, h, , w] = Wr(t, e, u, d, i, o), $ = (S) => et(S).some((b) => !!S[b]), M = (S, b) => {
    const { fn: C, Tt: F, At: I, _n: x } = S, k = C || {}, D = !!F, L = {
      Et: gs(e, k, D),
      fn: k,
      Tt: D
    };
    if (x)
      return h(L), !1;
    const E = b || m(ne({}, L, {
      At: I
    })), U = c(ne({}, L, {
      an: u,
      Gt: E
    }));
    h(ne({}, L, {
      Gt: E,
      Qt: U
    }));
    const B = $(E), W = $(U), J = B || W || !jn(k) || D;
    return J && n(S, {
      Gt: E,
      Qt: U
    }), J;
  };
  return [() => {
    const { rn: S, D: b } = i, C = Et(S), F = [_(), a(), p()];
    return nt(b, C), Y(Re, F);
  }, M, () => ({
    vn: u,
    hn: d
  }), {
    pn: i,
    gn: w
  }, v];
}, Xe = (t, e, n) => {
  const { nt: o } = Be(), s = Zt(t), a = s ? t : t.target, c = bo(a);
  if (e && !c) {
    let d = !1;
    const i = [], v = {}, _ = (L) => {
      const E = Js(L), U = Dt(Lr);
      return U ? U(E, !0) : E;
    }, m = ne({}, o(), _(e)), [u, p, h] = In(), [w, $, M] = In(n), S = (L, E) => {
      M(L, E), h(L, E);
    }, [b, C, F, I, x] = Zr(t, m, ({ fn: L, Tt: E }, { Gt: U, Qt: B }) => {
      const { ht: W, Ct: J, xt: oe, Ht: G, zt: Q, _t: ue } = U, { tn: z, nn: ie, sn: ae } = B;
      S("updated", [D, {
        updateHints: {
          sizeChanged: !!W,
          directionChanged: !!J,
          heightIntrinsicChanged: !!oe,
          overflowEdgeChanged: !!z,
          overflowAmountChanged: !!ie,
          overflowStyleChanged: !!ae,
          contentMutation: !!G,
          hostMutation: !!Q,
          appear: !!ue
        },
        changedOptions: L || {},
        force: !!E
      }]);
    }, (L) => S("scroll", [D, L])), k = (L) => {
      Ur(a), Re(i), d = !0, S("destroyed", [D, L]), p(), $();
    }, D = {
      options(L, E) {
        if (L) {
          const U = E ? o() : {}, B = lo(m, ne(U, _(L)));
          jn(B) || (ne(m, B), C({
            fn: B
          }));
        }
        return ne({}, m);
      },
      on: w,
      off: (L, E) => {
        L && E && $(L, E);
      },
      state() {
        const { vn: L, hn: E } = F(), { N: U } = L, { Pt: B, Lt: W, k: J, en: oe, cn: G, un: Q } = E;
        return ne({}, {
          overflowEdge: B,
          overflowAmount: W,
          overflowStyle: J,
          hasOverflow: oe,
          padding: G,
          paddingAbsolute: Q,
          directionRTL: U,
          destroyed: d
        });
      },
      elements() {
        const { gt: L, bt: E, cn: U, D: B, wt: W, kt: J, Zt: oe } = I.pn, { qt: G, Jt: Q } = I.gn, ue = (ie) => {
          const { Vt: ae, Mt: ce, Ut: ke } = ie;
          return {
            scrollbar: ke,
            track: ce,
            handle: ae
          };
        }, z = (ie) => {
          const { Wt: ae, Xt: ce } = ie, ke = ue(ae[0]);
          return ne({}, ke, {
            clone: () => {
              const ge = ue(ce());
              return C({
                _n: !0
              }), ge;
            }
          });
        };
        return ne({}, {
          target: L,
          host: E,
          padding: U || B,
          viewport: B,
          content: W || B,
          scrollOffsetElement: J,
          scrollEventElement: oe,
          scrollbarHorizontal: z(G),
          scrollbarVertical: z(Q)
        });
      },
      update: (L) => C({
        Tt: L,
        At: !0
      }),
      destroy: Y(k, !1),
      plugin: (L) => v[et(L)[0]]
    };
    return _e(i, [x]), Nr(a, D), mo(fo, Xe, [D, u, v]), Ir(I.pn.Rt, !s && t.cancel) ? (k(!0), D) : (_e(i, b()), S("initialized", [D]), D.update(!0), D);
  }
  return c;
};
Xe.plugin = (t) => {
  const e = Ue(t), n = e ? t : [t], o = n.map((s) => mo(s, Xe)[0]);
  return Vr(n), e ? o : o[0];
};
Xe.valid = (t) => {
  const e = t && t.elements, n = je(e) && e();
  return Qt(n) && !!bo(n.target);
};
Xe.env = () => {
  const { P: t, T: e, L: n, K: o, J: s, st: a, et: c, G: d, tt: i, nt: v, ot: _ } = Be();
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
function el(t) {
  let e;
  const n = O(null), o = Math.floor(Math.random() * 2 ** 32), s = O(!1), a = O([]), c = () => a.value, d = () => e.getSelection(), i = () => a.value.length, v = () => e.clearSelection(!0), _ = O(), m = O(null), u = O(null), p = O(null), h = O(null), w = O(null);
  function $() {
    e = new zo({
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
  const M = () => at(() => {
    e.addSelection(e.getSelectables()), S();
  }), S = () => {
    a.value = e.getSelection().map((x) => JSON.parse(x.dataset.item)), _.value(a.value);
  }, b = () => at(() => {
    const x = c().map((k) => k.path);
    v(), e.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + o)
    }), e.addSelection(
      e.getSelectables().filter(
        (k) => x.includes(JSON.parse(k.dataset.item).path)
      )
    ), S(), F();
  }), C = (x) => {
    _.value = x, e.subscribe("DS:end", ({ items: k, event: D, isDragging: L }) => {
      a.value = k.map((E) => JSON.parse(E.dataset.item)), x(k.map((E) => JSON.parse(E.dataset.item)));
    });
  }, F = () => {
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
    Xe(
      p.value,
      {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        },
        plugins: {
          OverlayScrollbars: Xe
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
    ), $(), F(), w.value = new ResizeObserver(F), w.value.observe(n.value), n.value.addEventListener("scroll", I), e.subscribe(
      "DS:scroll",
      ({ isDragging: x }) => x || I()
    );
  }), zn(() => {
    e && e.stop(), w.value && w.value.disconnect();
  }), As(() => {
    e && e.Area.reset();
  }), {
    area: n,
    explorerId: o,
    isDraggingRef: s,
    scrollBar: u,
    scrollBarContainer: p,
    getSelected: c,
    getSelection: d,
    selectAll: M,
    clearSelection: v,
    refreshSelection: b,
    getCount: i,
    onSelect: C
  };
}
function tl(t, e) {
  const n = O(t), o = O(e), s = O([]), a = O([]), c = O([]), d = O(!1), i = O(5);
  let v = !1, _ = !1;
  const m = dt({
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
    const [F, I] = h(b, i.value);
    c.value = I, s.value = F;
  }
  function p(S) {
    i.value = S, u();
  }
  function h(S, b) {
    return S.length > b ? [S.slice(-b), S.slice(0, -b)] : [S, []];
  }
  function w(S = null) {
    d.value = S ?? !d.value;
  }
  function $() {
    return s.value && s.value.length && !_;
  }
  const M = Ke(() => {
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
    toggleHiddenBreadcrumbs: w,
    isGoUpAvailable: $,
    parentFolderPath: M
  };
}
function nl() {
  const t = "_readOnlyFile", e = localStorage.getItem(t), n = dt(JSON.parse(e ?? '{"items": []}')), o = (v) => {
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
const sl = (t, e) => {
  const n = Ko(t.id), o = Po(), s = n.getStore("metricUnits", !1), a = er(n, t.theme), c = e.i18n, d = t.locale ?? e.locale, i = n.getStore("adapter"), v = nl(), _ = (h) => Array.isArray(h) ? h : Qo, m = n.getStore("persist-path", t.persist), u = m ? n.getStore("path", t.path) : t.path, p = el((h) => {
    o.emit("file-drag-end", h);
  });
  return dt({
    /**
     * Core properties
     * */
    // app version
    version: Zo,
    // root element
    root: null,
    // app id
    debug: t.debug,
    // Event Bus
    emitter: o,
    // storage
    storage: n,
    // localization object
    i18n: Jo(n, d, o, c),
    // modal state
    modal: tr(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: Ke(() => p),
    // http object
    requester: Yo(t.request),
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
    filesize: s ? Ls : Vs,
    // show large icons in list view
    compactListView: n.getStore("compact-list-view", !0),
    // persist state
    persist: m,
    // show thumbnails
    showThumbnails: n.getStore("show-thumbnails", t.showThumbnails),
    // file system
    fs: tl(i, u),
    onlyReadFileStore: v
  });
}, ol = { class: "vuefinder__modal-layout__container" }, rl = { class: "vuefinder__modal-layout__content" }, ll = { class: "vuefinder__modal-layout__footer" }, st = {
  __name: "ModalLayout",
  setup(t) {
    const e = O(null), n = le("ServiceContainer");
    return Ee(() => {
      const o = document.querySelector(".v-f-modal input");
      o && o.focus(), at(() => {
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
      onKeyup: s[1] || (s[1] = At((a) => r(n).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      s[2] || (s[2] = l("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      l("div", ol, [
        l("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: s[0] || (s[0] = Mt((a) => r(n).modal.close(), ["self"]))
        }, [
          l("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            l("div", rl, [
              Ot(o.$slots, "default")
            ]),
            l("div", ll, [
              Ot(o.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}, al = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [o, s] of e)
    n[o] = s;
  return n;
}, il = {
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
    }), zn(() => {
      clearTimeout(c);
    }), {
      shown: s,
      t: a
    };
  }
}, cl = { key: 1 };
function dl(t, e, n, o, s, a) {
  return f(), g("div", {
    class: ye(["vuefinder__action-message", { "vuefinder__action-message--hidden": !o.shown }])
  }, [
    t.$slots.default ? Ot(t.$slots, "default", { key: 0 }) : (f(), g("span", cl, y(o.t("Saved.")), 1))
  ], 2);
}
const pt = /* @__PURE__ */ al(il, [["render", dl]]), ul = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function vl(t, e) {
  return f(), g("svg", ul, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87q.11.06.22.127c.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a8 8 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a7 7 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a7 7 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a7 7 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124q.108-.066.22-.128c.332-.183.582-.495.644-.869z"
    }, null, -1),
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
    }, null, -1)
  ]));
}
const fl = { render: vl }, _l = { class: "vuefinder__modal-header" }, ml = { class: "vuefinder__modal-header__icon-container" }, pl = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, vt = {
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
    return (e, n) => (f(), g("div", _l, [
      l("div", ml, [
        (f(), P(Ts(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      l("h3", pl, y(t.title), 1)
    ]));
  }
}, hl = { class: "vuefinder__about-modal__content" }, gl = { class: "vuefinder__about-modal__main" }, bl = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, wl = ["onClick", "aria-current"], yl = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, kl = { class: "vuefinder__about-modal__description" }, Sl = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, xl = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, $l = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, Cl = { class: "vuefinder__about-modal__description" }, El = { class: "vuefinder__about-modal__settings" }, Al = { class: "vuefinder__about-modal__setting flex" }, Tl = { class: "vuefinder__about-modal__setting-input" }, Dl = { class: "vuefinder__about-modal__setting-label" }, Vl = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, Ll = { class: "vuefinder__about-modal__setting flex" }, Ml = { class: "vuefinder__about-modal__setting-input" }, Ol = { class: "vuefinder__about-modal__setting-label" }, Rl = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, Bl = { class: "vuefinder__about-modal__setting flex" }, Fl = { class: "vuefinder__about-modal__setting-input" }, Hl = { class: "vuefinder__about-modal__setting-label" }, Il = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, Nl = { class: "vuefinder__about-modal__setting flex" }, Ul = { class: "vuefinder__about-modal__setting-input" }, ql = { class: "vuefinder__about-modal__setting-label" }, Pl = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, zl = { class: "vuefinder__about-modal__setting" }, Gl = { class: "vuefinder__about-modal__setting-input" }, jl = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, Wl = { class: "vuefinder__about-modal__setting-label" }, Yl = ["label"], Kl = ["value"], Xl = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, Jl = { class: "vuefinder__about-modal__setting-input" }, Ql = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, Zl = { class: "vuefinder__about-modal__setting-label" }, ea = ["label"], ta = ["value"], na = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, sa = { class: "vuefinder__about-modal__shortcuts" }, oa = { class: "vuefinder__about-modal__shortcut" }, ra = { class: "vuefinder__about-modal__shortcut" }, la = { class: "vuefinder__about-modal__shortcut" }, aa = { class: "vuefinder__about-modal__shortcut" }, ia = { class: "vuefinder__about-modal__shortcut" }, ca = { class: "vuefinder__about-modal__shortcut" }, da = { class: "vuefinder__about-modal__shortcut" }, ua = { class: "vuefinder__about-modal__shortcut" }, va = { class: "vuefinder__about-modal__shortcut" }, fa = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, _a = { class: "vuefinder__about-modal__description" }, ma = {
  __name: "ModalAbout",
  setup(t) {
    const e = le("ServiceContainer"), { setStore: n, clearStore: o } = e.storage, { t: s } = e.i18n, a = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, c = Ke(() => [
      { name: s("About"), key: a.ABOUT },
      { name: s("Settings"), key: a.SETTINGS },
      { name: s("Shortcuts"), key: a.SHORTCUTS },
      { name: s("Reset"), key: a.RESET }
    ]), d = O("about"), i = async () => {
      o(), location.reload();
    }, v = (S) => {
      e.theme.set(S), e.emitter.emit("vf-theme-saved");
    }, _ = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? Ls : Vs, n("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
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
    ), M = Ke(() => ({
      system: s("System"),
      light: s("Light"),
      dark: s("Dark")
    }));
    return (S, b) => (f(), P(st, null, {
      buttons: ee(() => [
        l("button", {
          type: "button",
          onClick: b[7] || (b[7] = (C) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, y(r(s)("Close")), 1)
      ]),
      default: ee(() => [
        l("div", hl, [
          j(vt, {
            icon: r(fl),
            title: "Vuefinder " + r(e).version
          }, null, 8, ["icon", "title"]),
          l("div", gl, [
            l("div", null, [
              l("div", null, [
                l("nav", bl, [
                  (f(!0), g($e, null, Ce(c.value, (C) => (f(), g("button", {
                    key: C.name,
                    onClick: (F) => d.value = C.key,
                    class: ye([C.key === d.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": C.current ? "page" : void 0
                  }, y(C.name), 11, wl))), 128))
                ])
              ])
            ]),
            d.value === a.ABOUT ? (f(), g("div", yl, [
              l("div", kl, y(r(s)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              l("a", Sl, y(r(s)("Project home")), 1),
              l("a", xl, y(r(s)("Follow on GitHub")), 1)
            ])) : H("", !0),
            d.value === a.SETTINGS ? (f(), g("div", $l, [
              l("div", Cl, y(r(s)("Customize your experience with the following settings")), 1),
              l("div", El, [
                l("fieldset", null, [
                  l("div", Al, [
                    l("div", Tl, [
                      de(l("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        "onUpdate:modelValue": b[0] || (b[0] = (C) => r(e).metricUnits = C),
                        onClick: _,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Pt, r(e).metricUnits]
                      ])
                    ]),
                    l("div", Dl, [
                      l("label", Vl, [
                        K(y(r(s)("Use Metric Units")) + " ", 1),
                        j(pt, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: ee(() => [
                            K(y(r(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  l("div", Ll, [
                    l("div", Ml, [
                      de(l("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        "onUpdate:modelValue": b[1] || (b[1] = (C) => r(e).compactListView = C),
                        onClick: m,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Pt, r(e).compactListView]
                      ])
                    ]),
                    l("div", Ol, [
                      l("label", Rl, [
                        K(y(r(s)("Compact list view")) + " ", 1),
                        j(pt, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: ee(() => [
                            K(y(r(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  l("div", Bl, [
                    l("div", Fl, [
                      de(l("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        "onUpdate:modelValue": b[2] || (b[2] = (C) => r(e).persist = C),
                        onClick: p,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Pt, r(e).persist]
                      ])
                    ]),
                    l("div", Hl, [
                      l("label", Il, [
                        K(y(r(s)("Persist path on reload")) + " ", 1),
                        j(pt, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: ee(() => [
                            K(y(r(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  l("div", Nl, [
                    l("div", Ul, [
                      de(l("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        "onUpdate:modelValue": b[3] || (b[3] = (C) => r(e).showThumbnails = C),
                        onClick: u,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Pt, r(e).showThumbnails]
                      ])
                    ]),
                    l("div", ql, [
                      l("label", Pl, [
                        K(y(r(s)("Show thumbnails")) + " ", 1),
                        j(pt, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: ee(() => [
                            K(y(r(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  l("div", zl, [
                    l("div", Gl, [
                      l("label", jl, y(r(s)("Theme")), 1)
                    ]),
                    l("div", Wl, [
                      de(l("select", {
                        id: "theme",
                        "onUpdate:modelValue": b[4] || (b[4] = (C) => r(e).theme.value = C),
                        onChange: b[5] || (b[5] = (C) => v(C.target.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        l("optgroup", {
                          label: r(s)("Theme")
                        }, [
                          (f(!0), g($e, null, Ce(M.value, (C, F) => (f(), g("option", { value: F }, y(C), 9, Kl))), 256))
                        ], 8, Yl)
                      ], 544), [
                        [An, r(e).theme.value]
                      ]),
                      j(pt, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: ee(() => [
                          K(y(r(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  r(e).features.includes(r(fe).LANGUAGE) && Object.keys(r($)).length > 1 ? (f(), g("div", Xl, [
                    l("div", Jl, [
                      l("label", Ql, y(r(s)("Language")), 1)
                    ]),
                    l("div", Zl, [
                      de(l("select", {
                        id: "language",
                        "onUpdate:modelValue": b[6] || (b[6] = (C) => r(e).i18n.locale = C),
                        class: "vuefinder__about-modal__select"
                      }, [
                        l("optgroup", {
                          label: r(s)("Language")
                        }, [
                          (f(!0), g($e, null, Ce(r($), (C, F) => (f(), g("option", { value: F }, y(C), 9, ta))), 256))
                        ], 8, ea)
                      ], 512), [
                        [An, r(e).i18n.locale]
                      ]),
                      j(pt, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: ee(() => [
                          K(y(r(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : H("", !0)
                ])
              ])
            ])) : H("", !0),
            d.value === a.SHORTCUTS ? (f(), g("div", na, [
              l("div", sa, [
                l("div", oa, [
                  l("div", null, y(r(s)("Rename")), 1),
                  b[8] || (b[8] = l("kbd", null, "F2", -1))
                ]),
                l("div", ra, [
                  l("div", null, y(r(s)("Refresh")), 1),
                  b[9] || (b[9] = l("kbd", null, "F5", -1))
                ]),
                l("div", la, [
                  K(y(r(s)("Delete")) + " ", 1),
                  b[10] || (b[10] = l("kbd", null, "Del", -1))
                ]),
                l("div", aa, [
                  K(y(r(s)("Escape")) + " ", 1),
                  b[11] || (b[11] = l("div", null, [
                    l("kbd", null, "Esc")
                  ], -1))
                ]),
                l("div", ia, [
                  K(y(r(s)("Select All")) + " ", 1),
                  b[12] || (b[12] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    K(" + "),
                    l("kbd", null, "A")
                  ], -1))
                ]),
                l("div", ca, [
                  K(y(r(s)("Search")) + " ", 1),
                  b[13] || (b[13] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    K(" + "),
                    l("kbd", null, "F")
                  ], -1))
                ]),
                l("div", da, [
                  K(y(r(s)("Toggle Sidebar")) + " ", 1),
                  b[14] || (b[14] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    K(" + "),
                    l("kbd", null, "E")
                  ], -1))
                ]),
                l("div", ua, [
                  K(y(r(s)("Open Settings")) + " ", 1),
                  b[15] || (b[15] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    K(" + "),
                    l("kbd", null, ",")
                  ], -1))
                ]),
                l("div", va, [
                  K(y(r(s)("Toggle Full Screen")) + " ", 1),
                  b[16] || (b[16] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    K(" + "),
                    l("kbd", null, "Enter")
                  ], -1))
                ])
              ])
            ])) : H("", !0),
            d.value === a.RESET ? (f(), g("div", fa, [
              l("div", _a, y(r(s)("Reset all settings to default")), 1),
              l("button", {
                onClick: i,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, y(r(s)("Reset Settings")), 1)
            ])) : H("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, pa = ["title"], ot = {
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
    const n = e, o = le("ServiceContainer"), { t: s } = o.i18n, a = O(!1), c = O(null), d = O((v = c.value) == null ? void 0 : v.strMessage);
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
        Ot(_.$slots, "default"),
        l("div", {
          class: "vuefinder__message__close",
          onClick: i,
          title: r(s)("Close")
        }, m[0] || (m[0] = [
          l("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 24 24",
            "stroke-width": "1.5",
            stroke: "currentColor",
            class: "vuefinder__message__icon"
          }, [
            l("path", {
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              d: "M6 18L18 6M6 6l12 12"
            })
          ], -1)
        ]), 8, pa)
      ], 2))
    ]));
  }
};
const ha = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function ga(t, e) {
  return f(), g("svg", ha, e[0] || (e[0] = [
    l("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ]));
}
const ba = { render: ga }, wa = { class: "vuefinder__rename-modal__content" }, ya = { class: "vuefinder__rename-modal__item" }, ka = { class: "vuefinder__rename-modal__item-info" }, Sa = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, xa = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, $a = { class: "vuefinder__rename-modal__item-name" }, Ca = {
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
    return (d, i) => (f(), P(st, null, {
      buttons: ee(() => [
        l("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, y(r(n)("Rename")), 1),
        l("button", {
          type: "button",
          onClick: i[2] || (i[2] = (v) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, y(r(n)("Cancel")), 1)
      ]),
      default: ee(() => [
        l("div", null, [
          j(vt, {
            icon: r(ba),
            title: r(n)("Rename")
          }, null, 8, ["icon", "title"]),
          l("div", wa, [
            l("div", ya, [
              l("p", ka, [
                o.value.type === "dir" ? (f(), g("svg", Sa, i[3] || (i[3] = [
                  l("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (f(), g("svg", xa, i[4] || (i[4] = [
                  l("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                l("span", $a, y(o.value.basename), 1)
              ]),
              de(l("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (v) => s.value = v),
                onKeyup: At(c, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Tt, s.value]
              ]),
              a.value.length ? (f(), P(ot, {
                key: 0,
                onHidden: i[1] || (i[1] = (v) => a.value = ""),
                error: ""
              }, {
                default: ee(() => [
                  K(y(a.value), 1)
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
function Ea(t) {
  Ee(() => {
  });
}
const Aa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Ta(t, e) {
  return f(), g("svg", Aa, e[0] || (e[0] = [
    l("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ]));
}
const yo = { render: Ta }, Da = { class: "vuefinder__new-folder-modal__content" }, Va = { class: "vuefinder__new-folder-modal__form" }, La = { class: "vuefinder__new-folder-modal__description" }, Ma = ["placeholder"], ko = {
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
    return (c, d) => (f(), P(st, null, {
      buttons: ee(() => [
        l("button", {
          type: "button",
          onClick: a,
          class: "vf-btn vf-btn-primary"
        }, y(r(n)("Create")), 1),
        l("button", {
          type: "button",
          onClick: d[2] || (d[2] = (i) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, y(r(n)("Cancel")), 1)
      ]),
      default: ee(() => [
        l("div", null, [
          j(vt, {
            icon: r(yo),
            title: r(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          l("div", Da, [
            l("div", Va, [
              l("p", La, y(r(n)("Create a new folder")), 1),
              de(l("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (i) => o.value = i),
                onKeyup: At(a, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: r(n)("Folder Name"),
                type: "text"
              }, null, 40, Ma), [
                [Tt, o.value]
              ]),
              s.value.length ? (f(), P(ot, {
                key: 0,
                onHidden: d[1] || (d[1] = (i) => s.value = ""),
                error: ""
              }, {
                default: ee(() => [
                  K(y(s.value), 1)
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
}, Oa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Ra(t, e) {
  return f(), g("svg", Oa, e[0] || (e[0] = [
    l("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ]));
}
const So = { render: Ra }, Ba = { class: "vuefinder__new-file-modal__content" }, Fa = { class: "vuefinder__new-file-modal__form" }, Ha = { class: "vuefinder__new-file-modal__description" }, Ia = ["placeholder"], Na = {
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
    return (c, d) => (f(), P(st, null, {
      buttons: ee(() => [
        l("button", {
          type: "button",
          onClick: a,
          class: "vf-btn vf-btn-primary"
        }, y(r(n)("Create")), 1),
        l("button", {
          type: "button",
          onClick: d[2] || (d[2] = (i) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, y(r(n)("Cancel")), 1)
      ]),
      default: ee(() => [
        l("div", null, [
          j(vt, {
            icon: r(So),
            title: r(n)("New File")
          }, null, 8, ["icon", "title"]),
          l("div", Ba, [
            l("div", Fa, [
              l("p", Ha, y(r(n)("Create a new file")), 1),
              de(l("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (i) => o.value = i),
                onKeyup: At(a, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: r(n)("File Name"),
                type: "text"
              }, null, 40, Ia), [
                [Tt, o.value]
              ]),
              s.value.length ? (f(), P(ot, {
                key: 0,
                onHidden: d[1] || (d[1] = (i) => s.value = ""),
                error: ""
              }, {
                default: ee(() => [
                  K(y(s.value), 1)
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
function $s(t, e = 14) {
  let n = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return t.replace(new RegExp(n), "$2..$4");
}
const Ua = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function qa(t, e) {
  return f(), g("svg", Ua, e[0] || (e[0] = [
    l("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ]));
}
const Pa = { render: qa }, za = { class: "vuefinder__unarchive-modal__content" }, Ga = { class: "vuefinder__unarchive-modal__items" }, ja = { class: "vuefinder__unarchive-modal__item" }, Wa = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ya = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ka = { class: "vuefinder__unarchive-modal__item-name" }, Xa = { class: "vuefinder__unarchive-modal__info" }, Ja = {
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
    return (d, i) => (f(), P(st, null, {
      buttons: ee(() => [
        l("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, y(r(n)("Unarchive")), 1),
        l("button", {
          type: "button",
          onClick: i[1] || (i[1] = (v) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, y(r(n)("Cancel")), 1)
      ]),
      default: ee(() => [
        l("div", null, [
          j(vt, {
            icon: r(Pa),
            title: r(n)("Unarchive")
          }, null, 8, ["icon", "title"]),
          l("div", za, [
            l("div", Ga, [
              (f(!0), g($e, null, Ce(a.value, (v) => (f(), g("p", ja, [
                v.type === "dir" ? (f(), g("svg", Wa, i[2] || (i[2] = [
                  l("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (f(), g("svg", Ya, i[3] || (i[3] = [
                  l("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                l("span", Ka, y(v.basename), 1)
              ]))), 256)),
              l("p", Xa, y(r(n)("The archive will be unarchived at")) + " (" + y(r(e).fs.data.dirname) + ")", 1),
              s.value.length ? (f(), P(ot, {
                key: 0,
                onHidden: i[0] || (i[0] = (v) => s.value = ""),
                error: ""
              }, {
                default: ee(() => [
                  K(y(s.value), 1)
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
}, Qa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Za(t, e) {
  return f(), g("svg", Qa, e[0] || (e[0] = [
    l("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ]));
}
const ei = { render: Za }, ti = { class: "vuefinder__archive-modal__content" }, ni = { class: "vuefinder__archive-modal__form" }, si = { class: "vuefinder__archive-modal__files vf-scrollbar" }, oi = { class: "vuefinder__archive-modal__file" }, ri = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, li = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ai = { class: "vuefinder__archive-modal__file-name" }, ii = ["placeholder"], ci = {
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
    return (d, i) => (f(), P(st, null, {
      buttons: ee(() => [
        l("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, y(r(n)("Archive")), 1),
        l("button", {
          type: "button",
          onClick: i[2] || (i[2] = (v) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, y(r(n)("Cancel")), 1)
      ]),
      default: ee(() => [
        l("div", null, [
          j(vt, {
            icon: r(ei),
            title: r(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          l("div", ti, [
            l("div", ni, [
              l("div", si, [
                (f(!0), g($e, null, Ce(a.value, (v) => (f(), g("p", oi, [
                  v.type === "dir" ? (f(), g("svg", ri, i[3] || (i[3] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (f(), g("svg", li, i[4] || (i[4] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  l("span", ai, y(v.basename), 1)
                ]))), 256))
              ]),
              de(l("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (v) => o.value = v),
                onKeyup: At(c, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: r(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, ii), [
                [Tt, o.value]
              ]),
              s.value.length ? (f(), P(ot, {
                key: 0,
                onHidden: i[1] || (i[1] = (v) => s.value = ""),
                error: ""
              }, {
                default: ee(() => [
                  K(y(s.value), 1)
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
}, di = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function ui(t, e) {
  return f(), g("svg", di, e[0] || (e[0] = [
    l("circle", {
      cx: "12",
      cy: "12",
      r: "10",
      stroke: "currentColor",
      "stroke-width": "4",
      class: "opacity-25 stroke-blue-900 dark:stroke-blue-100"
    }, null, -1),
    l("path", {
      fill: "currentColor",
      d: "M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12zm2 5.291A7.96 7.96 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938z",
      class: "opacity-75"
    }, null, -1)
  ]));
}
const ts = { render: ui }, vi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function fi(t, e) {
  return f(), g("svg", vi, e[0] || (e[0] = [
    l("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ]));
}
const _i = { render: fi }, mi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function pi(t, e) {
  return f(), g("svg", mi, e[0] || (e[0] = [
    l("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ]));
}
const hi = { render: pi }, gi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function bi(t, e) {
  return f(), g("svg", gi, e[0] || (e[0] = [
    l("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ]));
}
const wi = { render: bi }, yi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function ki(t, e) {
  return f(), g("svg", yi, e[0] || (e[0] = [
    l("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ]));
}
const Si = { render: ki }, xi = { class: "vuefinder__toolbar" }, $i = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, Ci = ["title"], Ei = ["title"];
const Ai = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, Ti = { class: "pl-2" }, Di = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Vi = { class: "vuefinder__toolbar__controls" }, Li = ["title"], Mi = ["title"], Oi = {
  __name: "Toolbar",
  setup(t) {
    const e = le("ServiceContainer"), { setStore: n } = e.storage, { t: o } = e.i18n, s = e.dragSelect, a = O(""), c = O([]), d = Ke(() => c.value.some((_) => _.onlyRead));
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
    return (_, m) => (f(), g("div", xi, [
      a.value.length ? (f(), g("div", Ai, [
        l("div", Ti, [
          K(y(r(o)("Search results for")) + " ", 1),
          l("span", Di, y(a.value), 1)
        ]),
        r(e).fs.loading ? (f(), P(r(ts), { key: 0 })) : H("", !0)
      ])) : (f(), g("div", $i, [
        r(e).features.includes(r(fe).NEW_FOLDER) ? (f(), g("div", {
          key: 0,
          class: "mx-1.5",
          title: r(o)("New Folder"),
          onClick: m[0] || (m[0] = (u) => r(e).modal.open(ko, { items: r(s).getSelected() }))
        }, [
          j(r(yo))
        ], 8, Ci)) : H("", !0),
        r(e).features.includes(r(fe).NEW_FILE) ? (f(), g("div", {
          key: 1,
          class: "mx-1.5",
          title: r(o)("New File"),
          onClick: m[1] || (m[1] = (u) => r(e).modal.open(Na, { items: r(s).getSelected() }))
        }, [
          j(r(So))
        ], 8, Ei)) : H("", !0),
        (r(e).features.includes(r(fe).RENAME), H("", !0)),
        (r(e).features.includes(r(fe).DELETE), H("", !0)),
        (r(e).features.includes(r(fe).UPLOAD), H("", !0)),
        (r(e).features.includes(r(fe).UNARCHIVE) && r(s).getCount() === 1 && r(s).getSelected()[0].mime_type, H("", !0)),
        (r(e).features.includes(r(fe).ARCHIVE), H("", !0))
      ])),
      l("div", Vi, [
        r(e).features.includes(r(fe).FULL_SCREEN) ? (f(), g("div", {
          key: 0,
          onClick: i,
          class: "mx-1.5",
          title: r(o)("Toggle Full Screen")
        }, [
          r(e).fullScreen ? (f(), P(r(hi), { key: 0 })) : (f(), P(r(_i), { key: 1 }))
        ], 8, Li)) : H("", !0),
        l("div", {
          class: "mx-1.5",
          title: r(o)("Change View"),
          onClick: m[7] || (m[7] = (u) => a.value.length || v())
        }, [
          r(e).view === "grid" ? (f(), P(r(wi), {
            key: 0,
            class: ye(["vf-toolbar-icon", a.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : H("", !0),
          r(e).view === "list" ? (f(), P(r(Si), {
            key: 1,
            class: ye(["vf-toolbar-icon", a.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : H("", !0)
        ], 8, Mi)
      ])
    ]));
  }
}, Ri = (t, e = 0, n = !1) => {
  let o;
  return (...s) => {
    n && !o && t(...s), clearTimeout(o), o = setTimeout(() => {
      t(...s);
    }, e);
  };
}, Cs = (t, e, n) => {
  const o = O(t);
  return Bo((s, a) => ({
    get() {
      return s(), o.value;
    },
    set: Ri(
      (c) => {
        o.value = c, a();
      },
      e,
      n
    )
  }));
}, Bi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Fi(t, e) {
  return f(), g("svg", Bi, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ]));
}
const Hi = { render: Fi }, Ii = { class: "vuefinder__move-modal__content" }, Ni = { class: "vuefinder__move-modal__description" }, Ui = { class: "vuefinder__move-modal__files vf-scrollbar" }, qi = { class: "vuefinder__move-modal__file" }, Pi = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, zi = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Gi = { class: "vuefinder__move-modal__file-name" }, ji = { class: "vuefinder__move-modal__target-title" }, Wi = { class: "vuefinder__move-modal__target-directory" }, Yi = { class: "vuefinder__move-modal__target-path" }, Ki = { class: "vuefinder__move-modal__selected-items" }, Pn = {
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
    return (c, d) => (f(), P(st, null, {
      buttons: ee(() => [
        l("button", {
          type: "button",
          onClick: a,
          class: "vf-btn vf-btn-primary"
        }, y(r(n)("Yes, Move!")), 1),
        l("button", {
          type: "button",
          onClick: d[1] || (d[1] = (i) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, y(r(n)("Cancel")), 1),
        l("div", Ki, y(r(n)("%s item(s) selected.", o.value.length)), 1)
      ]),
      default: ee(() => [
        l("div", null, [
          j(vt, {
            icon: r(Hi),
            title: r(n)("Move files")
          }, null, 8, ["icon", "title"]),
          l("div", Ii, [
            l("p", Ni, y(r(n)("Are you sure you want to move these files?")), 1),
            l("div", Ui, [
              (f(!0), g($e, null, Ce(o.value, (i) => (f(), g("div", qi, [
                l("div", null, [
                  i.type === "dir" ? (f(), g("svg", Pi, d[2] || (d[2] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (f(), g("svg", zi, d[3] || (d[3] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])))
                ]),
                l("div", Gi, y(i.path), 1)
              ]))), 256))
            ]),
            l("h4", ji, y(r(n)("Target Directory")), 1),
            l("p", Wi, [
              d[4] || (d[4] = l("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                "stroke-width": "1"
              }, [
                l("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                })
              ], -1)),
              l("span", Yi, y(r(e).modal.data.items.to.path), 1)
            ]),
            s.value.length ? (f(), P(ot, {
              key: 0,
              onHidden: d[0] || (d[0] = (i) => s.value = ""),
              error: ""
            }, {
              default: ee(() => [
                K(y(s.value), 1)
              ]),
              _: 1
            })) : H("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Xi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
};
function Ji(t, e) {
  return f(), g("svg", Xi, e[0] || (e[0] = [
    l("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ]));
}
const Qi = { render: Ji }, Zi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function ec(t, e) {
  return f(), g("svg", Zi, e[0] || (e[0] = [
    l("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const tc = { render: ec }, nc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
};
function sc(t, e) {
  return f(), g("svg", nc, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ]));
}
const oc = { render: sc }, rc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
};
function lc(t, e) {
  return f(), g("svg", rc, e[0] || (e[0] = [
    l("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ]));
}
const ac = { render: lc }, ic = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
};
function cc(t, e) {
  return f(), g("svg", ic, e[0] || (e[0] = [
    l("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ]));
}
const dc = { render: cc }, uc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function vc(t, e) {
  return f(), g("svg", uc, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ]));
}
const fc = { render: vc }, _c = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
};
function mc(t, e) {
  return f(), g("svg", _c, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ]));
}
const hn = { render: mc }, pc = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
};
function hc(t, e) {
  return f(), g("svg", pc, e[0] || (e[0] = [
    l("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ]));
}
const gc = { render: hc }, bc = {
  class: "vuefinder__breadcrumb__container",
  style: { padding: "1px" }
}, wc = ["title"], yc = ["title"], kc = ["title"], Sc = { class: "vuefinder__breadcrumb__list" }, xc = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, $c = { class: "relative" }, Cc = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], Ec = { class: "vuefinder__breadcrumb__search-mode" }, Ac = ["placeholder"], Tc = { class: "vuefinder__breadcrumb__hidden-dropdown" }, Dc = ["onDrop", "onClick"], Vc = { class: "vuefinder__breadcrumb__hidden-item-content" }, Lc = { class: "vuefinder__breadcrumb__hidden-item-text" }, Mc = {
  __name: "Breadcrumb",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, o = e.dragSelect, { setStore: s } = e.storage, a = O(null), c = Cs(0, 100);
    Oe(c, (x) => {
      const k = a.value.children;
      let D = 0, L = 0, E = 5, U = 1;
      e.fs.limitBreadcrumbItems(E), at(() => {
        for (let B = k.length - 1; B >= 0 && !(D + k[B].offsetWidth > c.value - 40); B--)
          D += parseInt(k[B].offsetWidth, 10), L++;
        L < U && (L = U), L > E && (L = E), e.fs.limitBreadcrumbItems(L);
      });
    });
    const d = () => {
      c.value = a.value.offsetWidth;
    };
    let i = O(null);
    Ee(() => {
      i.value = new ResizeObserver(d), i.value.observe(a.value);
    }), zn(() => {
      i.value.disconnect();
    });
    const v = (x, k = null) => {
      x.preventDefault(), o.isDraggingRef.value = !1, u(x), k ?? (k = e.fs.hiddenBreadcrumbs.length - 1);
      let D = JSON.parse(x.dataTransfer.getData("items"));
      if (D.find((L) => L.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Pn, {
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
      e.modal.open(Pn, {
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
      F(), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    }, h = () => {
      F(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.parentFolderPath
        }
      });
    }, w = (x) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: x.path } }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, $ = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, M = {
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
    const S = O(null), b = () => {
      e.features.includes(fe.SEARCH) && (e.fs.searchMode = !0, at(() => S.value.focus()));
    }, C = Cs("", 400);
    Oe(C, (x) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: x });
    }), Oe(() => e.fs.searchMode, (x) => {
      x && at(() => S.value.focus());
    });
    const F = () => {
      e.fs.searchMode = !1, C.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      F();
    });
    const I = () => {
      C.value === "" && F();
    };
    return (x, k) => (f(), g("div", bc, [
      H("", !0),
      l("span", {
        title: r(n)("Go up a directory")
      }, [
        j(r(tc), {
          onDragover: k[0] || (k[0] = (D) => m(D)),
          onDragleave: k[1] || (k[1] = (D) => u(D)),
          onDrop: k[2] || (k[2] = (D) => _(D)),
          onClick: h,
          class: ye(r(e).fs.isGoUpAvailable() ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive")
        }, null, 8, ["class"])
      ], 8, wc),
      r(e).fs.loading ? (f(), g("span", {
        key: 2,
        title: r(n)("Cancel")
      }, [
        j(r(oc), {
          onClick: k[3] || (k[3] = (D) => r(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, kc)) : (f(), g("span", {
        key: 1,
        title: r(n)("Refresh")
      }, [
        j(r(Qi), { onClick: p })
      ], 8, yc)),
      de(l("div", {
        onClick: Mt(b, ["self"]),
        class: "group vuefinder__breadcrumb__search-container"
      }, [
        l("div", null, [
          j(r(ac), {
            onDragover: k[4] || (k[4] = (D) => m(D)),
            onDragleave: k[5] || (k[5] = (D) => u(D)),
            onDrop: k[6] || (k[6] = (D) => _(D, -1)),
            onClick: k[7] || (k[7] = (D) => r(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: r(e).fs.adapter } }))
          })
        ]),
        l("div", Sc, [
          r(e).fs.hiddenBreadcrumbs.length ? de((f(), g("div", xc, [
            k[13] || (k[13] = l("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            l("div", $c, [
              l("span", {
                onDragenter: k[8] || (k[8] = (D) => r(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: k[9] || (k[9] = (D) => r(e).fs.toggleHiddenBreadcrumbs()),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                j(r(gc), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [M, $]
          ]) : H("", !0)
        ]),
        l("div", {
          ref_key: "breadcrumbContainer",
          ref: a,
          class: "vuefinder__breadcrumb__visible-list",
          onClick: Mt(b, ["self"])
        }, [
          (f(!0), g($e, null, Ce(r(e).fs.breadcrumbs, (D, L) => (f(), g("div", { key: L }, [
            k[14] || (k[14] = l("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            l("span", {
              onDragover: (E) => L === r(e).fs.breadcrumbs.length - 1 || m(E),
              onDragleave: (E) => L === r(e).fs.breadcrumbs.length - 1 || u(E),
              onDrop: (E) => L === r(e).fs.breadcrumbs.length - 1 || _(E, L),
              class: "vuefinder__breadcrumb__item",
              title: D.basename,
              onClick: (E) => r(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: r(e).fs.adapter, path: D.path } })
            }, y(D.name), 41, Cc)
          ]))), 128))
        ], 512),
        r(e).fs.loading ? (f(), P(r(ts), { key: 0 })) : H("", !0)
      ], 512), [
        [ze, !r(e).fs.searchMode && !1]
      ]),
      de(l("div", Ec, [
        l("div", null, [
          j(r(dc))
        ]),
        de(l("input", {
          ref_key: "searchInput",
          ref: S,
          onKeydown: At(F, ["esc"]),
          onBlur: I,
          "onUpdate:modelValue": k[10] || (k[10] = (D) => Fo(C) ? C.value = D : null),
          placeholder: r(n)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, Ac), [
          [Tt, r(C)]
        ]),
        j(r(fc), { onClick: F })
      ], 512), [
        [ze, r(e).fs.searchMode && !1]
      ]),
      de(l("div", Tc, [
        (f(!0), g($e, null, Ce(r(e).fs.hiddenBreadcrumbs, (D, L) => (f(), g("div", {
          key: L,
          onDragover: k[11] || (k[11] = (E) => m(E)),
          onDragleave: k[12] || (k[12] = (E) => u(E)),
          onDrop: (E) => v(E, L),
          onClick: (E) => w(D),
          class: "vuefinder__breadcrumb__hidden-item"
        }, [
          l("div", Vc, [
            l("span", null, [
              j(r(hn), { class: "vuefinder__breadcrumb__hidden-item-icon" })
            ]),
            k[15] || (k[15] = K()),
            l("span", Lc, y(D.name), 1)
          ])
        ], 40, Dc))), 128))
      ], 512), [
        [ze, r(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, xo = (t, e = null) => new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), Oc = ["onClick"], Rc = {
  __name: "Toast",
  setup(t) {
    const e = le("ServiceContainer"), { getStore: n } = e.storage, o = O(n("full-screen", !1)), s = O([]), a = (i) => i === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", c = (i) => {
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
      j(Ho, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: ee(() => [
          (f(!0), g($e, null, Ce(s.value, (_, m) => (f(), g("div", {
            key: m,
            onClick: (u) => c(m),
            class: ye(["vuefinder__toast__message", a(_.type)])
          }, y(_.label), 11, Oc))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}, Bc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Fc(t, e) {
  return f(), g("svg", Bc, e[0] || (e[0] = [
    l("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const Hc = { render: Fc }, Ic = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Nc(t, e) {
  return f(), g("svg", Ic, e[0] || (e[0] = [
    l("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const Uc = { render: Nc }, jt = {
  __name: "SortIcon",
  props: { direction: String },
  setup(t) {
    return (e, n) => (f(), g("div", null, [
      t.direction === "asc" ? (f(), P(r(Hc), { key: 0 })) : H("", !0),
      t.direction === "desc" ? (f(), P(r(Uc), { key: 1 })) : H("", !0)
    ]));
  }
}, qc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
};
function Pc(t, e) {
  return f(), g("svg", qc, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ]));
}
const zc = { render: Pc }, Gc = { class: "vuefinder__item-icon" }, Cn = {
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
    return (e, n) => (f(), g("span", Gc, [
      t.type === "dir" ? (f(), P(r(hn), {
        key: 0,
        class: ye(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"])) : (f(), P(r(zc), {
        key: 1,
        class: ye(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"]))
    ]));
  }
}, jc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
};
function Wc(t, e) {
  return f(), g("svg", jc, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ]));
}
const Yc = { render: Wc }, Kc = { class: "vuefinder__drag-item__container" }, Xc = { class: "vuefinder__drag-item__count" }, Jc = {
  __name: "DragItem",
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(t) {
    const e = t;
    return (n, o) => (f(), g("div", Kc, [
      j(r(Yc)),
      l("div", Xc, y(e.count), 1)
    ]));
  }
}, Qc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Zc(t, e) {
  return f(), g("svg", Qc, e[0] || (e[0] = [
    l("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ]));
}
const $o = { render: Zc }, ed = ["data-type", "data-item", "data-index"], En = {
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
      mounted(h, w, $, M) {
        $.props.draggable && (h.addEventListener("dragstart", (S) => d(S, w.value)), h.addEventListener("dragover", (S) => v(S, w.value)), h.addEventListener("drop", (S) => i(S, w.value)));
      },
      beforeUnmount(h, w, $, M) {
        $.props.draggable && (h.removeEventListener("dragstart", d), h.removeEventListener("dragover", v), h.removeEventListener("drop", i));
      }
    }, d = (h, w) => {
      if (h.altKey || h.ctrlKey || h.metaKey)
        return h.preventDefault(), !1;
      o.isDraggingRef.value = !0, h.dataTransfer.setDragImage(s.dragImage.$el, 0, 15), h.dataTransfer.effectAllowed = "all", h.dataTransfer.dropEffect = "copy", h.dataTransfer.setData("items", JSON.stringify(o.getSelected()));
    }, i = (h, w) => {
      h.preventDefault(), o.isDraggingRef.value = !1;
      let $ = JSON.parse(h.dataTransfer.getData("items"));
      if ($.find((M) => M.storage !== n.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      n.modal.open(Pn, { items: { from: $, to: w } });
    }, v = (h, w) => {
      h.preventDefault(), !w || w.type !== "dir" || o.getSelection().find(($) => $ === h.currentTarget) ? (h.dataTransfer.dropEffect = "none", h.dataTransfer.effectAllowed = "none") : h.dataTransfer.dropEffect = "copy";
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
        const w = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: h.target.getBoundingClientRect().x,
          clientY: h.target.getBoundingClientRect().y
        });
        h.target.dispatchEvent(w);
      }, 500);
    };
    return (h, w) => de((f(), g("div", {
      style: on({ opacity: r(o).isDraggingRef.value && r(o).getSelection().find(($) => h.$el === $) ? "0.5 !important" : "" }),
      class: ye(["vuefinder__item", "vf-item-" + r(o).explorerId]),
      "data-type": t.item.type,
      key: t.item.path,
      "data-item": JSON.stringify(t.item),
      "data-index": t.index,
      onDblclick: w[0] || (w[0] = ($) => a(t.item)),
      onTouchstart: w[1] || (w[1] = ($) => p($)),
      onTouchend: w[2] || (w[2] = ($) => u()),
      onContextmenu: w[3] || (w[3] = Mt(($) => r(n).emitter.emit("vf-contextmenu-show", { event: $, items: r(o).getSelected(), target: t.item }), ["prevent"]))
    }, [
      Ot(h.$slots, "default"),
      r(n).pinnedFolders.find(($) => $.path === t.item.path) ? (f(), P(r($o), {
        key: 0,
        class: "vuefinder__item--pinned"
      })) : H("", !0)
    ], 46, ed)), [
      [c, t.item]
    ]);
  }
}, td = { class: "vuefinder__explorer__container" }, nd = {
  key: 0,
  class: "vuefinder__explorer__header"
}, sd = { class: "vuefinder__explorer__drag-item" }, od = { class: "vuefinder__explorer__item-list-content" }, rd = { class: "vuefinder__explorer__item-list-name" }, ld = { class: "vuefinder__explorer__item-name" }, ad = { class: "vuefinder__explorer__item-path" }, id = { class: "vuefinder__explorer__item-list-content" }, cd = { class: "vuefinder__explorer__item-list-name" }, dd = { class: "vuefinder__explorer__item-name" }, ud = { class: "vuefinder__explorer__item-size" }, vd = { class: "vuefinder__explorer__item-date" }, fd = {
  class: "vuefinder__explorer__item-grid-content flex",
  style: { "justify-content": "center", "align-items": "center" }
}, _d = ["data-src", "alt"], md = {
  key: 2,
  class: "vuefinder__explorer__item-hasReader",
  style: { position: "absolute", "font-size": "10px", top: "0px", right: "0", "font-weight": "bold", color: "red" }
}, pd = {
  key: 3,
  class: "vuefinder__explorer__item-extension",
  style: { position: "relative", "font-size": "16px", top: "10px", "font-weight": "bold", "text-align": "left" }
}, hd = {
  key: 0,
  class: "vuefinder__explorer__item-title break-all"
}, gd = {
  key: 1,
  class: "vuefinder__explorer__item-title break-all"
}, bd = {
  __name: "Explorer",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, o = (m) => m == null ? void 0 : m.substring(0, 4), s = O(null), a = O(""), c = e.dragSelect;
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
    const i = dt({ active: !1, column: "", order: "" }), v = (m = !0) => {
      let u = [...e.fs.data.files], p = i.column, h = i.order === "asc" ? 1 : -1;
      if (!m)
        return u;
      const w = ($, M) => typeof $ == "string" && typeof M == "string" ? $.toLowerCase().localeCompare(M.toLowerCase()) : $ < M ? -1 : $ > M ? 1 : 0;
      return i.active && (u = u.slice().sort(($, M) => w($[p], M[p]) * h)), u;
    }, _ = (m) => {
      i.active && i.column === m ? (i.active = i.order === "asc", i.column = m, i.order = "desc") : (i.active = !0, i.column = m, i.order = "asc");
    };
    return Ee(() => {
      d = new Go(c.area.value);
    }), As(() => {
      d.update();
    }), Ro(() => {
      d.destroy();
    }), (m, u) => (f(), g("div", td, [
      r(e).view === "list" || a.value.length ? (f(), g("div", nd, [
        l("div", {
          onClick: u[0] || (u[0] = (p) => _("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          K(y(r(n)("Name")) + " ", 1),
          de(j(jt, {
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
          K(y(r(n)("Size")) + " ", 1),
          de(j(jt, {
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
          K(y(r(n)("Date")) + " ", 1),
          de(j(jt, {
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
          K(y(r(n)("Filepath")) + " ", 1),
          de(j(jt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [ze, i.active && i.column === "path"]
          ])
        ])) : H("", !0)
      ])) : H("", !0),
      l("div", sd, [
        j(Jc, {
          ref_key: "dragImage",
          ref: s,
          count: r(c).getCount()
        }, null, 8, ["count"])
      ]),
      l("div", {
        ref: r(c).scrollBarContainer,
        class: ye(["vf-explorer-scrollbar-container vuefinder__explorer__scrollbar-container", [{ "grid-view": r(e).view === "grid" }, { "search-active": a.value.length }]])
      }, [
        l("div", {
          ref: r(c).scrollBar,
          class: "vuefinder__explorer__scrollbar"
        }, null, 512)
      ], 2),
      l("div", {
        ref: r(c).area,
        class: "vuefinder__explorer__selector-area vf-explorer-scrollbar vf-selector-area",
        onContextmenu: u[4] || (u[4] = Mt((p) => r(e).emitter.emit("vf-contextmenu-show", { event: p, items: r(c).getSelected() }), ["self", "prevent"]))
      }, [
        a.value.length ? (f(!0), g($e, { key: 0 }, Ce(v(), (p, h) => (f(), P(En, {
          item: p,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-list"
        }, {
          default: ee(() => [
            l("div", od, [
              l("div", rd, [
                j(Cn, {
                  type: p.type,
                  small: r(e).compactListView
                }, null, 8, ["type", "small"]),
                l("span", ld, y(p.basename), 1)
              ]),
              l("div", ad, y(p.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : H("", !0),
        r(e).view === "list" && !a.value.length ? (f(!0), g($e, { key: 1 }, Ce(v(), (p, h) => (f(), P(En, {
          item: p,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-list",
          draggable: p.onlyRead ? "false" : "true",
          key: p.path
        }, {
          default: ee(() => [
            l("div", id, [
              l("div", cd, [
                j(Cn, {
                  type: p.type,
                  small: r(e).compactListView
                }, null, 8, ["type", "small"]),
                l("span", dd, y(p.basename), 1)
              ]),
              l("div", ud, y(p.file_size ? r(e).filesize(p.file_size) : ""), 1),
              l("div", vd, y(r(xo)(p.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage", "draggable"]))), 128)) : H("", !0),
        r(e).view === "grid" && !a.value.length ? (f(!0), g($e, { key: 2 }, Ce(v(!1), (p, h) => (f(), P(En, {
          item: p,
          index: h,
          dragImage: s.value,
          class: "vf-item vf-item-grid",
          draggable: p.onlyRead ? "false" : "true"
        }, {
          default: ee(() => [
            l("div", null, [
              l("div", fd, [
                (p.mime_type ?? "").startsWith("image") && r(e).showThumbnails ? (f(), g("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "vuefinder__explorer__item-thumbnail lazy",
                  "data-src": r(e).requester.getPreviewUrl(r(e).fs.adapter, p),
                  alt: p.basename,
                  key: p.path
                }, null, 8, _d)) : (f(), P(Cn, {
                  key: 1,
                  type: p.type
                }, null, 8, ["type"])),
                p.type !== "dir" && p.hasReader ? (f(), g("span", md, " 已打开 ")) : H("", !0),
                p.type !== "dir" ? (f(), g("div", pd, y(o(p.extension)), 1)) : H("", !0)
              ]),
              p.onlyRead ? (f(), g("span", hd, y(r($s)("【只读】" + p.basename)), 1)) : (f(), g("span", gd, y(r($s)(p.basename)), 1))
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage", "draggable"]))), 256)) : H("", !0)
      ], 544),
      j(Rc)
    ]));
  }
}, wd = { class: "vuefinder__text-preview" }, yd = { class: "vuefinder__text-preview__header" }, kd = ["title"], Sd = { class: "vuefinder__text-preview__actions" }, xd = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, $d = { key: 1 }, Cd = {
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = O(""), s = O(""), a = O(null), c = O(!1), d = O(""), i = O(!1), v = le("ServiceContainer"), { t: _ } = v.i18n;
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
    return (p, h) => (f(), g("div", wd, [
      l("div", yd, [
        l("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: r(v).modal.data.item.path
        }, y(r(v).modal.data.item.basename), 9, kd),
        l("div", Sd, [
          c.value ? (f(), g("button", {
            key: 0,
            onClick: u,
            class: "vuefinder__text-preview__save-button"
          }, y(r(_)("Save")), 1)) : H("", !0),
          r(v).features.includes(r(fe).EDIT) ? (f(), g("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: h[0] || (h[0] = (w) => m())
          }, y(c.value ? r(_)("Cancel") : r(_)("Edit")), 1)) : H("", !0)
        ])
      ]),
      l("div", null, [
        c.value ? (f(), g("div", $d, [
          de(l("textarea", {
            ref_key: "editInput",
            ref: a,
            "onUpdate:modelValue": h[1] || (h[1] = (w) => s.value = w),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Tt, s.value]
          ])
        ])) : (f(), g("pre", xd, y(o.value), 1)),
        d.value.length ? (f(), P(ot, {
          key: 2,
          onHidden: h[2] || (h[2] = (w) => d.value = ""),
          error: i.value
        }, {
          default: ee(() => [
            K(y(d.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : H("", !0)
      ])
    ]));
  }
}, Ed = { class: "vuefinder__image-preview" }, Ad = { class: "vuefinder__image-preview__header" }, Td = ["title"], Dd = { class: "vuefinder__image-preview__actions" }, Vd = { class: "vuefinder__image-preview__image-container" }, Ld = ["src"], Md = {
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = le("ServiceContainer"), { t: s } = o.i18n, a = O(null), c = O(null), d = O(!1), i = O(""), v = O(!1), _ = () => {
      d.value = !d.value, d.value ? c.value = new jo(a.value, {
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
    }), (u, p) => (f(), g("div", Ed, [
      l("div", Ad, [
        l("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: r(o).modal.data.item.path
        }, y(r(o).modal.data.item.basename), 9, Td),
        l("div", Dd, [
          d.value ? (f(), g("button", {
            key: 0,
            onClick: m,
            class: "vuefinder__image-preview__crop-button"
          }, y(r(s)("Crop")), 1)) : H("", !0),
          r(o).features.includes(r(fe).EDIT) ? (f(), g("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: p[0] || (p[0] = (h) => _())
          }, y(d.value ? r(s)("Cancel") : r(s)("Edit")), 1)) : H("", !0)
        ])
      ]),
      l("div", Vd, [
        l("img", {
          ref_key: "image",
          ref: a,
          class: "vuefinder__image-preview__image",
          src: r(o).requester.getPreviewUrl(r(o).modal.data.adapter, r(o).modal.data.item),
          alt: ""
        }, null, 8, Ld)
      ]),
      i.value.length ? (f(), P(ot, {
        key: 0,
        onHidden: p[1] || (p[1] = (h) => i.value = ""),
        error: v.value
      }, {
        default: ee(() => [
          K(y(i.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : H("", !0)
    ]));
  }
}, Od = { class: "vuefinder__default-preview" }, Rd = { class: "vuefinder__default-preview__header" }, Bd = ["title"], Fd = {
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = le("ServiceContainer"), o = e;
    return Ee(() => {
      o("success");
    }), (s, a) => (f(), g("div", Od, [
      l("div", Rd, [
        l("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: r(n).modal.data.item.path
        }, y(r(n).modal.data.item.basename), 9, Bd)
      ]),
      a[0] || (a[0] = l("div", null, null, -1))
    ]));
  }
}, Hd = { class: "vuefinder__video-preview" }, Id = ["title"], Nd = {
  class: "vuefinder__video-preview__video",
  preload: "",
  controls: ""
}, Ud = ["src"], qd = {
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = le("ServiceContainer"), o = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Ee(() => {
      o("success");
    }), (a, c) => (f(), g("div", Hd, [
      l("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: r(n).modal.data.item.path
      }, y(r(n).modal.data.item.basename), 9, Id),
      l("div", null, [
        l("video", Nd, [
          l("source", {
            src: s(),
            type: "video/mp4"
          }, null, 8, Ud),
          c[0] || (c[0] = K(" Your browser does not support the video tag. "))
        ])
      ])
    ]));
  }
}, Pd = { class: "vuefinder__audio-preview" }, zd = ["title"], Gd = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, jd = ["src"], Wd = {
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = le("ServiceContainer"), s = () => o.requester.getPreviewUrl(o.modal.data.adapter, o.modal.data.item);
    return Ee(() => {
      n("success");
    }), (a, c) => (f(), g("div", Pd, [
      l("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: r(o).modal.data.item.path
      }, y(r(o).modal.data.item.basename), 9, zd),
      l("div", null, [
        l("audio", Gd, [
          l("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, jd),
          c[0] || (c[0] = K(" Your browser does not support the audio element. "))
        ])
      ])
    ]));
  }
}, Yd = { class: "vuefinder__pdf-preview" }, Kd = ["title"], Xd = ["data"], Jd = ["src"], Qd = {
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = le("ServiceContainer"), o = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Ee(() => {
      o("success");
    }), (a, c) => (f(), g("div", Yd, [
      l("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: r(n).modal.data.item.path
      }, y(r(n).modal.data.item.basename), 9, Kd),
      l("div", null, [
        l("object", {
          class: "vuefinder__pdf-preview__object",
          data: s(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          l("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: s(),
            width: "100%",
            height: "100%"
          }, c[0] || (c[0] = [
            l("p", null, [
              K(" Your browser does not support PDFs. "),
              l("a", { href: "https://example.com/test.pdf" }, "Download the PDF"),
              K(". ")
            ], -1)
          ]), 8, Jd)
        ], 8, Xd)
      ])
    ]));
  }
}, Zd = { class: "vuefinder__preview-modal__content" }, eu = { key: 0 }, tu = { class: "vuefinder__preview-modal__loading" }, nu = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, su = { class: "vuefinder__preview-modal__details" }, ou = { class: "font-bold" }, ru = { class: "font-bold pl-2" }, lu = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, au = ["download", "href"], iu = {
  __name: "ModalPreview",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, o = O(!1), s = (c) => (e.modal.data.item.mime_type ?? "").startsWith(c), a = e.features.includes(fe.PREVIEW);
    return a || (o.value = !0), (c, d) => (f(), P(st, null, {
      buttons: ee(() => [
        l("button", {
          type: "button",
          onClick: d[6] || (d[6] = (i) => r(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, y(r(n)("Close")), 1),
        r(e).features.includes(r(fe).DOWNLOAD) ? (f(), g("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: r(e).requester.getDownloadUrl(r(e).modal.data.adapter, r(e).modal.data.item),
          href: r(e).requester.getDownloadUrl(r(e).modal.data.adapter, r(e).modal.data.item)
        }, y(r(n)("Download")), 9, au)) : H("", !0)
      ]),
      default: ee(() => [
        l("div", null, [
          l("div", Zd, [
            r(a) ? (f(), g("div", eu, [
              s("text") ? (f(), P(Cd, {
                key: 0,
                onSuccess: d[0] || (d[0] = (i) => o.value = !0)
              })) : s("image") ? (f(), P(Md, {
                key: 1,
                onSuccess: d[1] || (d[1] = (i) => o.value = !0)
              })) : s("video") ? (f(), P(qd, {
                key: 2,
                onSuccess: d[2] || (d[2] = (i) => o.value = !0)
              })) : s("audio") ? (f(), P(Wd, {
                key: 3,
                onSuccess: d[3] || (d[3] = (i) => o.value = !0)
              })) : s("application/pdf") ? (f(), P(Qd, {
                key: 4,
                onSuccess: d[4] || (d[4] = (i) => o.value = !0)
              })) : (f(), P(Fd, {
                key: 5,
                onSuccess: d[5] || (d[5] = (i) => o.value = !0)
              }))
            ])) : H("", !0),
            l("div", tu, [
              o.value === !1 ? (f(), g("div", nu, [
                d[7] || (d[7] = l("svg", {
                  class: "vuefinder__preview-modal__spinner",
                  xmlns: "http://www.w3.org/2000/svg",
                  fill: "none",
                  viewBox: "0 0 24 24"
                }, [
                  l("circle", {
                    class: "vuefinder__preview-modal__spinner-circle",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    "stroke-width": "4"
                  }),
                  l("path", {
                    class: "vuefinder__preview-modal__spinner-path",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  })
                ], -1)),
                l("span", null, y(r(n)("Loading")), 1)
              ])) : H("", !0)
            ])
          ])
        ]),
        l("div", su, [
          l("div", null, [
            l("span", ou, y(r(n)("File Size")) + ": ", 1),
            K(y(r(e).filesize(r(e).modal.data.item.file_size)), 1)
          ]),
          l("div", null, [
            l("span", ru, y(r(n)("Last Modified")) + ": ", 1),
            K(" " + y(r(xo)(r(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        r(e).features.includes(r(fe).DOWNLOAD) ? (f(), g("div", lu, [
          l("span", null, y(r(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : H("", !0)
      ]),
      _: 1
    }));
  }
}, cu = ["href", "download"], du = ["onClick"], uu = {
  __name: "ContextMenu",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, o = O(null), s = O([]), a = O(""), c = dt({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), d = Ke(() => c.items.filter((u) => u.key == null || e.features.includes(u.key)));
    e.emitter.on("vf-context-selected", (u) => {
      s.value = u;
    });
    const i = {
      newfolder: {
        key: fe.NEW_FOLDER,
        title: () => n("New Folder"),
        action: () => e.modal.open(ko)
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
        key: fe.DELETE,
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
        key: fe.PREVIEW,
        title: () => n("Preview"),
        action: () => e.modal.open(iu, { adapter: e.fs.adapter, item: s.value[0] })
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
        key: fe.DOWNLOAD,
        link: Ke(() => e.requester.getDownloadUrl(e.fs.adapter, s.value[0])),
        title: () => n("Download"),
        action: () => {
        }
      },
      archive: {
        key: fe.ARCHIVE,
        title: () => n("Archive"),
        action: () => e.modal.open(ci, { items: s })
      },
      unarchive: {
        key: fe.UNARCHIVE,
        title: () => n("Unarchive"),
        action: () => e.modal.open(Ja, { items: s })
      },
      rename: {
        key: fe.RENAME,
        title: () => n("Rename"),
        action: () => e.modal.open(Ca, { items: s })
      },
      setAllOnlyRead: {
        key: fe.SETALLONLY,
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
      p.some((w) => w.onlyRead) || s.value.some((w) => w.onlyRead) || u.push(h);
    };
    e.emitter.on("vf-contextmenu-show", ({ event: u, items: p, target: h = null }) => {
      if (c.items = [], a.value)
        if (h)
          c.items.push(i.openDir), e.emitter.emit("vf-context-selected", [h]);
        else
          return;
      else !h && !a.value ? (c.items.push(i.refresh), c.items.push(i.selectAll), c.items.push(i.newfolder), e.emitter.emit("vf-context-selected", [])) : p.length > 1 && p.some((w) => w.path === h.path) ? (c.items.push(i.refresh), _(c.items, [h], i.delete), c.items.push(i.setAllOnlyRead), e.emitter.emit("vf-context-selected", p)) : (h.type === "dir" ? (c.items.push(i.open), c.items.push(i.setAllOnlyRead), e.pinnedFolders.findIndex((w) => w.path === h.path) !== -1 ? c.items.push(i.unpinFolder) : c.items.push(i.pinFolder)) : (c.items.push(i.preview), c.items.push(i.download), c.items.push(i.setAllOnlyRead)), _(c.items, [h], i.rename), _(c.items, [h], i.delete), e.emitter.emit("vf-context-selected", [h]));
      m(u);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      c.active = !1;
    });
    const m = (u) => {
      const p = e.dragSelect.area.value, h = e.root.getBoundingClientRect(), w = p.getBoundingClientRect();
      let $ = u.clientX - h.left, M = u.clientY - h.top;
      c.active = !0, at(() => {
        var F;
        const S = (F = o.value) == null ? void 0 : F.getBoundingClientRect();
        let b = (S == null ? void 0 : S.height) ?? 0, C = (S == null ? void 0 : S.width) ?? 0;
        $ = w.right - u.pageX + window.scrollX < C ? $ - C : $, M = w.bottom - u.pageY + window.scrollY < b ? M - b : M, c.positions = {
          left: $ + "px",
          top: M + "px"
        };
      });
    };
    return (u, p) => de((f(), g("ul", {
      ref_key: "contextmenu",
      ref: o,
      style: on(c.positions),
      class: "vuefinder__context-menu"
    }, [
      (f(!0), g($e, null, Ce(d.value, (h) => (f(), g("li", {
        class: "vuefinder__context-menu__item",
        key: h.title
      }, [
        h.link ? (f(), g("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: h.link,
          download: h.link,
          onClick: p[0] || (p[0] = (w) => r(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          l("span", null, y(h.title()), 1)
        ], 8, cu)) : (f(), g("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (w) => v(h)
        }, [
          l("span", null, y(h.title()), 1)
        ], 8, du))
      ]))), 128))
    ], 4)), [
      [ze, c.active]
    ]);
  }
}, vu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function fu(t, e) {
  return f(), g("svg", vu, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ]));
}
const Co = { render: fu }, _u = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
};
function mu(t, e) {
  return f(), g("svg", _u, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    }, null, -1)
  ]));
}
const pu = { render: mu }, hu = { class: "vuefinder__status-bar__wrapper" }, gu = { class: "vuefinder__status-bar__storage" }, bu = ["title"], wu = { class: "vuefinder__status-bar__storage-icon" }, yu = ["value"], ku = { class: "vuefinder__status-bar__info" }, Su = { key: 0 }, xu = { class: "vuefinder__status-bar__selected-count" }, $u = { class: "vuefinder__status-bar__actions" }, Cu = ["disabled"], Eu = ["title"], Au = {
  __name: "Statusbar",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, { setStore: o } = e.storage, s = e.dragSelect, a = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter } }), o("adapter", e.fs.adapter);
    }, c = O("");
    e.emitter.on("vf-search-query", ({ newQuery: i }) => {
      c.value = i;
    });
    const d = Ke(() => {
      const i = e.selectButton.multiple ? s.getSelected().length > 0 : s.getSelected().length === 1;
      return e.selectButton.active && i;
    });
    return (i, v) => (f(), g("div", hu, [
      l("div", gu, [
        l("div", {
          class: "vuefinder__status-bar__storage-container",
          title: r(n)("Storage")
        }, [
          l("div", wu, [
            j(r(Co))
          ]),
          de(l("select", {
            "onUpdate:modelValue": v[0] || (v[0] = (_) => r(e).fs.adapter = _),
            onChange: a,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (f(!0), g($e, null, Ce(r(e).fs.data.storages, (_) => (f(), g("option", { value: _ }, y(_), 9, yu))), 256))
          ], 544), [
            [An, r(e).fs.adapter]
          ])
        ], 8, bu),
        l("div", ku, [
          c.value.length ? (f(), g("span", Su, y(r(e).fs.data.files.length) + " items found. ", 1)) : H("", !0),
          l("span", xu, y(r(e).dragSelect.getCount() > 0 ? r(n)("%s item(s) selected.", r(e).dragSelect.getCount()) : ""), 1)
        ])
      ]),
      l("div", $u, [
        r(e).selectButton.active ? (f(), g("button", {
          key: 0,
          class: ye(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: v[1] || (v[1] = (_) => r(e).selectButton.click(r(s).getSelected(), _))
        }, y(r(n)("Select")), 11, Cu)) : H("", !0),
        l("span", {
          class: "vuefinder__status-bar__about",
          title: r(n)("About"),
          onClick: v[2] || (v[2] = (_) => r(e).modal.open(ma))
        }, [
          j(r(pu))
        ], 8, Eu)
      ])
    ]));
  }
}, Tu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
};
function Du(t, e) {
  return f(), g("svg", Tu, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ]));
}
const Eo = { render: Du }, Vu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Lu(t, e) {
  return f(), g("svg", Vu, e[0] || (e[0] = [
    l("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ]));
}
const Mu = { render: Lu }, Ou = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Ru(t, e) {
  return f(), g("svg", Ou, e[0] || (e[0] = [
    l("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "M15 12H9M12 9v6" }, null, -1)
  ]));
}
const Ao = { render: Ru }, Bu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Fu(t, e) {
  return f(), g("svg", Bu, e[0] || (e[0] = [
    l("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "M9 12h6" }, null, -1)
  ]));
}
const To = { render: Fu };
function Do(t, e) {
  const n = t.findIndex((o) => o.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const Hu = { class: "vuefinder__folder-loader-indicator" }, Iu = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Vo = {
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ Io({
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
        Do(n.treeViewData, { path: e.path, ...d });
      }).catch((d) => {
      }).finally(() => {
        s.value = !1;
      });
    };
    return (d, i) => {
      var v;
      return f(), g("div", Hu, [
        s.value ? (f(), P(r(ts), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--loading"
        })) : (f(), g("div", Iu, [
          o.value && ((v = a()) != null && v.folders.length) ? (f(), P(r(To), {
            key: 0,
            class: "vuefinder__folder-loader-indicator--minus"
          })) : H("", !0),
          o.value ? H("", !0) : (f(), P(r(Ao), {
            key: 1,
            class: "vuefinder__folder-loader-indicator--plus"
          }))
        ]))
      ]);
    };
  }
}, Nu = { class: "vuefinder__treesubfolderlist__item-content" }, Uu = ["onClick"], qu = ["title", "onClick"], Pu = { class: "vuefinder__treesubfolderlist__item-icon" }, zu = { class: "vuefinder__treesubfolderlist__subfolder" }, Gu = {
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
      o.path === o.adapter + "://" && Xe(s.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const a = Ke(() => {
      var c;
      return ((c = e.treeViewData.find((d) => d.path === o.path)) == null ? void 0 : c.folders) || [];
    });
    return (c, d) => {
      const i = No("TreeSubfolderList", !0);
      return f(), g("ul", {
        ref_key: "parentSubfolderList",
        ref: s,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (f(!0), g($e, null, Ce(a.value, (v, _) => (f(), g("li", {
          key: v.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          l("div", Nu, [
            l("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (m) => n.value[v.path] = !n.value[v.path]
            }, [
              j(Vo, {
                adapter: t.adapter,
                path: v.path,
                modelValue: n.value[v.path],
                "onUpdate:modelValue": (m) => n.value[v.path] = m
              }, null, 8, ["adapter", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, Uu),
            l("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: v.path,
              onClick: (m) => r(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o.adapter, path: v.path } })
            }, [
              l("div", Pu, [
                r(e).fs.path === v.path ? (f(), P(r(Eo), { key: 0 })) : (f(), P(r(hn), { key: 1 }))
              ]),
              l("div", {
                class: ye(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": r(e).fs.path === v.path
                }])
              }, y(v.basename), 3)
            ], 8, qu)
          ]),
          l("div", zu, [
            de(j(i, {
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
}, ju = { class: "vuefinder__treestorageitem__loader" }, Wu = {
  __name: "TreeStorageItem",
  props: {
    storage: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = le("ServiceContainer"), n = O(!1);
    return (o, s) => (f(), g($e, null, [
      l("div", {
        onClick: s[1] || (s[1] = (a) => n.value = !n.value),
        class: "vuefinder__treestorageitem__header"
      }, [
        l("div", {
          class: ye(["vuefinder__treestorageitem__info", t.storage === r(e).fs.adapter ? "vuefinder__treestorageitem__info--active" : ""])
        }, [
          l("div", {
            class: ye(["vuefinder__treestorageitem__icon", t.storage === r(e).fs.adapter ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            j(r(Co))
          ], 2),
          l("div", null, y(t.storage), 1)
        ], 2),
        l("div", ju, [
          j(Vo, {
            adapter: t.storage,
            path: t.storage + "://",
            modelValue: n.value,
            "onUpdate:modelValue": s[0] || (s[0] = (a) => n.value = a)
          }, null, 8, ["adapter", "path", "modelValue"])
        ])
      ]),
      de(j(Gu, {
        adapter: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["adapter", "path"]), [
        [ze, n.value]
      ])
    ], 64));
  }
}, Yu = { class: "vuefinder__folder-indicator" }, Ku = { class: "vuefinder__folder-indicator--icon" }, Xu = {
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = Ds(t, "modelValue");
    return (n, o) => (f(), g("div", Yu, [
      l("div", Ku, [
        e.value ? (f(), P(r(To), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : H("", !0),
        e.value ? H("", !0) : (f(), P(r(Ao), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}, Ju = { class: "vuefinder__treeview__header" }, Qu = { class: "vuefinder__treeview__pinned-label" }, Zu = { class: "vuefinder__treeview__pin-text text-nowrap" }, ev = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, tv = { class: "vuefinder__treeview__pinned-item" }, nv = ["onClick"], sv = ["title"], ov = ["onClick"], rv = { key: 0 }, lv = { class: "vuefinder__treeview__no-pinned" }, av = { class: "vuefinder__treeview__storage" }, iv = {
  __name: "TreeView",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, { getStore: o, setStore: s } = e.storage, a = O(190), c = O(o("pinned-folders-opened", !0));
    Oe(c, (_) => s("pinned-folders-opened", _));
    const d = (_) => {
      e.pinnedFolders = e.pinnedFolders.filter((m) => m.path !== _.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, i = (_) => {
      const m = _.clientX, u = _.target.parentElement, p = u.getBoundingClientRect().width;
      u.classList.remove("transition-[width]"), u.classList.add("transition-none");
      const h = ($) => {
        a.value = p + $.clientX - m, a.value < 50 && (a.value = 0, e.showTreeView = !1), a.value > 50 && (e.showTreeView = !0);
      }, w = () => {
        const $ = u.getBoundingClientRect();
        a.value = $.width, u.classList.add("transition-[width]"), u.classList.remove("transition-none"), window.removeEventListener("mousemove", h), window.removeEventListener("mouseup", w);
      };
      window.addEventListener("mousemove", h), window.addEventListener("mouseup", w);
    }, v = O(null);
    return Ee(() => {
      Xe(v.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), Oe(e.fs.data, (_, m) => {
      const u = _.files.filter((p) => p.type === "dir");
      Do(e.treeViewData, { path: e.fs.path, folders: u.map((p) => ({
        adapter: p.storage,
        path: p.path,
        basename: p.basename
      })) });
    }), (_, m) => (f(), g($e, null, [
      l("div", {
        onClick: m[0] || (m[0] = (u) => r(e).showTreeView = !r(e).showTreeView),
        class: ye(["vuefinder__treeview__overlay", r(e).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      l("div", {
        style: on(r(e).showTreeView ? "min-width:100px;max-width:75%; width: " + a.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        l("div", {
          ref_key: "treeViewScrollElement",
          ref: v,
          class: "vuefinder__treeview__scroll"
        }, [
          l("div", Ju, [
            l("div", {
              onClick: m[2] || (m[2] = (u) => c.value = !c.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              l("div", Qu, [
                j(r($o), { class: "vuefinder__treeview__pin-icon" }),
                l("div", Zu, y(r(n)("Pinned Folders")), 1)
              ]),
              j(Xu, {
                modelValue: c.value,
                "onUpdate:modelValue": m[1] || (m[1] = (u) => c.value = u)
              }, null, 8, ["modelValue"])
            ]),
            c.value ? (f(), g("ul", ev, [
              (f(!0), g($e, null, Ce(r(e).pinnedFolders, (u) => (f(), g("li", tv, [
                l("div", {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (p) => r(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: u.storage, path: u.path } })
                }, [
                  r(e).fs.path !== u.path ? (f(), P(r(hn), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : H("", !0),
                  r(e).fs.path === u.path ? (f(), P(r(Eo), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : H("", !0),
                  l("div", {
                    title: u.path,
                    class: ye(["vuefinder__treeview__folder-name text-nowrap", {
                      "vuefinder__treeview__folder-name--active": r(e).fs.path === u.path
                    }])
                  }, y(u.basename), 11, sv)
                ], 8, nv),
                l("div", {
                  class: "vuefinder__treeview__remove-favorite",
                  onClick: (p) => d(u)
                }, [
                  j(r(Mu), { class: "vuefinder__treeview__remove-icon" })
                ], 8, ov)
              ]))), 256)),
              r(e).pinnedFolders.length ? H("", !0) : (f(), g("li", rv, [
                l("div", lv, y(r(n)("No folders pinned")), 1)
              ]))
            ])) : H("", !0)
          ]),
          (f(!0), g($e, null, Ce(r(e).fs.data.storages, (u) => (f(), g("div", av, [
            j(Wu, { storage: u }, null, 8, ["storage"])
          ]))), 256))
        ], 512),
        l("div", {
          onMousedown: i,
          class: ye([(r(e).showTreeView, ""), "vuefinder__treeview__resize-handle"])
        }, null, 34)
      ], 4)
    ], 64));
  }
}, cv = { class: "vuefinder__main__content" }, dv = {
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
    const o = n, s = t, a = sl(s, le("VueFinderOptions"));
    Uo("ServiceContainer", a);
    const { setStore: c } = a.storage, d = O(null);
    a.root = d;
    const i = a.dragSelect;
    Ea();
    const v = (p) => {
      p.files = p.files.map((h) => (h.onlyRead = a.onlyReadFileStore.hasItem(h.path), h)), Object.assign(a.fs.data, p), i.clearSelection(), i.refreshSelection();
    };
    let _;
    a.emitter.on("vf-fetch-abort", () => {
      _.abort(), a.fs.loading = !1;
    }), a.emitter.on("vf-fetch", ({ params: p, body: h = null, onSuccess: w = null, onError: $ = null, noCloseModal: M = !1 }) => {
      ["index", "search"].includes(p.q) && (_ && _.abort(), a.fs.loading = !0), _ = new AbortController();
      const S = _.signal;
      a.requester.send({
        url: "",
        method: p.m || "get",
        params: p,
        body: h,
        abortSignal: S
      }).then((b) => {
        a.fs.adapter = b.adapter, a.persist && (a.fs.path = b.dirname, c("path", a.fs.path)), ["index", "search"].includes(p.q) && (a.fs.loading = !1), M || a.modal.close(), v(b), w && w(b);
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
      l("div", {
        class: ye(r(a).theme.actualValue)
      }, [
        l("div", {
          class: ye([r(a).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          style: on(r(a).fullScreen ? "" : "max-height: " + t.maxHeight),
          onMousedown: h[0] || (h[0] = (w) => r(a).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: h[1] || (h[1] = (w) => r(a).emitter.emit("vf-contextmenu-hide"))
        }, [
          t.simple ? H("", !0) : (f(), P(Oi, { key: 0 })),
          t.showPath ? (f(), P(Mc, { key: 1 })) : H("", !0),
          l("div", cv, [
            j(iv),
            j(bd)
          ]),
          t.simple ? H("", !0) : (f(), P(Au, { key: 2 }))
        ], 38),
        j(qo, { name: "fade" }, {
          default: ee(() => [
            r(a).modal.visible ? (f(), P(Ts(r(a).modal.type), { key: 0 })) : H("", !0)
          ]),
          _: 1
        }),
        j(uu)
      ], 2)
    ], 512));
  }
}, kv = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [n] = Object.keys(e.i18n);
    e.locale = e.locale ?? n ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", dv);
  }
};
export {
  kv as default
};
