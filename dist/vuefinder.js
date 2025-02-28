var Mo = Object.defineProperty;
var Lo = (t, e, n) => e in t ? Mo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var ss = (t, e, n) => Lo(t, typeof e != "symbol" ? e + "" : e, n);
import { reactive as dt, watch as Oe, ref as O, shallowRef as Oo, onMounted as Ee, onUnmounted as zn, onUpdated as As, nextTick as at, computed as Ke, inject as le, openBlock as f, createElementBlock as g, withKeys as Tt, unref as l, createElementVNode as r, withModifiers as kt, renderSlot as Ot, normalizeClass as ye, toDisplayString as k, createBlock as q, resolveDynamicComponent as Ts, withCtx as ee, createVNode as j, Fragment as $e, renderList as Ce, createCommentVNode as F, withDirectives as de, vModelCheckbox as qt, createTextVNode as K, vModelSelect as An, vModelText as Dt, onBeforeUnmount as Ro, customRef as Bo, vShow as ze, isRef as Io, TransitionGroup as Fo, normalizeStyle as on, mergeModels as Ho, useModel as Ds, resolveComponent as No, provide as Uo, Transition as Po } from "vue";
import qo from "mitt";
import zo from "dragselect";
import hv from "@uppy/core";
import bv from "@uppy/xhr-upload";
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
    const n = this.config, s = {};
    wn != null && wn !== "" && (s[n.xsrfHeaderName] = wn);
    const o = Object.assign({}, n.headers, s, e.headers), a = Object.assign({}, n.params, e.params), i = e.body, d = n.baseUrl + e.url, c = e.method;
    let v;
    c !== "get" && (i instanceof FormData ? (v = i, n.body != null && Object.entries(this.config.body).forEach(([m, _]) => {
      v.append(m, _);
    })) : (v = { ...i }, n.body != null && Object.assign(v, this.config.body)));
    const u = {
      url: d,
      method: c,
      headers: o,
      params: a,
      body: v
    };
    if (n.transformRequest != null) {
      const m = n.transformRequest({
        url: d,
        method: c,
        headers: o,
        params: a,
        body: v
      });
      m.url != null && (u.url = m.url), m.method != null && (u.method = m.method), m.params != null && (u.params = m.params ?? {}), m.headers != null && (u.headers = m.headers ?? {}), m.body != null && (u.body = m.body);
    }
    return u;
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
    const s = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "download", adapter: e, path: n.path }
    });
    return s.url + "?" + new URLSearchParams(s.params).toString();
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
    const s = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "preview", adapter: e, path: n.path }
    });
    return s.url + "?" + new URLSearchParams(s.params).toString();
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
    const n = this.transformRequestParams(e), s = e.responseType || "json", o = {
      method: e.method,
      headers: n.headers,
      signal: e.abortSignal
    }, a = n.url + "?" + new URLSearchParams(n.params);
    if (n.method !== "get" && n.body != null) {
      let d;
      n.body instanceof FormData ? d = e.body : (d = JSON.stringify(n.body), o.headers["Content-Type"] = "application/json"), o.body = d;
    }
    const i = await fetch(a, o);
    if (i.ok)
      return await i[s]();
    throw await i.json();
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
  Oe(n, s);
  function s() {
    Object.keys(n).length ? localStorage.setItem(t + "_storage", JSON.stringify(n)) : localStorage.removeItem(t + "_storage");
  }
  function o(c, v) {
    n[c] = v;
  }
  function a(c) {
    delete n[c];
  }
  function i() {
    Object.keys(n).map((c) => a(c));
  }
  return { getStore: (c, v = null) => n.hasOwnProperty(c) ? n[c] : v, setStore: o, removeStore: a, clearStore: i };
}
async function Xo(t, e) {
  const n = e[t];
  return typeof n == "function" ? (await n()).default : n;
}
function Jo(t, e, n, s) {
  const { getStore: o, setStore: a } = t, i = O({}), d = O(o("locale", e)), c = (m, _ = e) => {
    Xo(m, s).then((y) => {
      i.value = y, a("locale", m), d.value = m, a("translations", y), Object.values(s).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + m }), n.emit("vf-language-saved"));
    }).catch((y) => {
      _ ? (n.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), c(_, null)) : n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  Oe(d, (m) => {
    c(m);
  }), !o("locale") && !s.length ? c(e) : i.value = o("translations");
  const v = (m, ..._) => _.length ? v(m = m.replace("%s", _.shift()), ..._) : m;
  function u(m, ..._) {
    return i.value && i.value.hasOwnProperty(m) ? v(i.value[m], ..._) : v(m, ..._);
  }
  return dt({ t: u, locale: d });
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
function Vs(t, e, n, s, o) {
  return (e = Math, n = e.log, s = 1024, o = n(t) / n(s) | 0, t / e.pow(s, o)).toFixed(0) + " " + (o ? "KMGTPEZY"[--o] + "iB" : "B");
}
function Ms(t, e, n, s, o) {
  return (e = Math, n = e.log, s = 1e3, o = n(t) / n(s) | 0, t / e.pow(s, o)).toFixed(0) + " " + (o ? "KMGTPEZY"[--o] + "B" : "B");
}
const Qe = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function er(t, e) {
  const n = O(Qe.SYSTEM), s = O(Qe.LIGHT);
  n.value = t.getStore("theme", e ?? Qe.SYSTEM);
  const o = window.matchMedia("(prefers-color-scheme: dark)"), a = (i) => {
    n.value === Qe.DARK || n.value === Qe.SYSTEM && i.matches ? s.value = Qe.DARK : s.value = Qe.LIGHT;
  };
  return a(o), o.addEventListener("change", a), {
    /**
     * @type {import('vue').Ref<Theme>}
     */
    value: n,
    /**
     * @type {import('vue').Ref<Theme>}
     */
    actualValue: s,
    /**
     * @param {Theme} value
     */
    set(i) {
      n.value = i, i !== Qe.SYSTEM ? t.setStore("theme", i) : t.removeStore("theme"), a(o);
    }
  };
}
function tr() {
  const t = Oo(null), e = O(!1), n = O();
  return { visible: e, type: t, data: n, open: (a, i = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, t.value = a, n.value = i;
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
const He = (t, e) => {
  const { o: n, u: s, _: o } = t;
  let a = n, i;
  const d = (u, m) => {
    const _ = a, y = u, h = m || (s ? !s(_, y) : _ !== y);
    return (h || o) && (a = y, i = _), [a, h, i];
  };
  return [e ? (u) => d(e(a, i), u) : d, (u) => [a, !!u, i]];
}, Ls = typeof window < "u" && typeof document < "u", De = Ls ? window : {}, Wt = Math.max, nr = Math.min, Tn = Math.round, Os = De.cancelAnimationFrame, Rs = De.requestAnimationFrame, Xt = De.setTimeout, Dn = De.clearTimeout, rn = (t) => typeof De[t] < "u" ? De[t] : void 0, sr = rn("MutationObserver"), os = rn("IntersectionObserver"), Jt = rn("ResizeObserver"), Vn = rn("ScrollTimeline"), Bs = Ls && Node.ELEMENT_NODE, { toString: or, hasOwnProperty: yn } = Object.prototype, rr = /^\[object (.+)\]$/, It = (t) => t === void 0, ln = (t) => t === null, lr = (t) => It(t) || ln(t) ? `${t}` : or.call(t).replace(rr, "$1").toLowerCase(), Ge = (t) => typeof t == "number", an = (t) => typeof t == "string", Is = (t) => typeof t == "boolean", je = (t) => typeof t == "function", Ue = (t) => Array.isArray(t), Rt = (t) => typeof t == "object" && !Ue(t) && !ln(t), cn = (t) => {
  const e = !!t && t.length, n = Ge(e) && e > -1 && e % 1 == 0;
  return Ue(t) || !je(t) && n ? e > 0 && Rt(t) ? e - 1 in t : !0 : !1;
}, Qt = (t) => {
  if (!t || !Rt(t) || lr(t) !== "object")
    return !1;
  let e;
  const n = "constructor", s = t[n], o = s && s.prototype, a = yn.call(t, n), i = o && yn.call(o, "isPrototypeOf");
  if (s && !a && !i)
    return !1;
  for (e in t)
    ;
  return It(e) || yn.call(t, e);
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
const un = (t, e) => t.indexOf(e) >= 0, Ye = (t, e) => t.concat(e), _e = (t, e, n) => (!an(e) && cn(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), ut = (t) => Array.from(t || []), Fs = (t) => Ue(t) ? t : [t], Mn = (t) => !!t && !t.length, rs = (t) => ut(new Set(t)), Re = (t, e, n) => {
  se(t, (o) => o && o.apply(void 0, e || [])), !n && (t.length = 0);
}, Hs = "paddingTop", Ns = "paddingRight", Us = "paddingLeft", Ps = "paddingBottom", qs = "marginLeft", zs = "marginRight", Gs = "marginBottom", vn = "overflowX", fn = "overflowY", xt = "width", St = "height", $t = "hidden", js = "visible", Gn = (t, e, n, s) => {
  if (t && e) {
    let o = !0;
    return se(n, (a) => {
      const i = t[a], d = e[a];
      i !== d && (o = !1);
    }), o;
  }
  return !1;
}, Ws = (t, e) => Gn(t, e, ["w", "h"]), Ys = (t, e) => Gn(t, e, ["x", "y"]), ar = (t, e) => Gn(t, e, ["t", "r", "b", "l"]), Ne = () => {
}, Y = (t, ...e) => t.bind(0, ...e), ht = (t) => {
  let e;
  const n = t ? Xt : Rs, s = t ? Dn : Os;
  return [(o) => {
    s(e), e = n(o, je(t) ? t() : t);
  }, () => s(e)];
}, Ks = (t, e) => {
  let n, s, o, a = Ne;
  const { v: i, p: d, S: c } = e || {}, v = function(h) {
    a(), Dn(n), n = s = void 0, a = Ne, t.apply(this, h);
  }, u = (y) => c && s ? c(s, y) : y, m = () => {
    a !== Ne && v(u(o) || o);
  }, _ = function() {
    const h = ut(arguments), p = je(i) ? i() : i;
    if (Ge(p) && p >= 0) {
      const E = je(d) ? d() : d, $ = Ge(E) && E >= 0, w = p > 0 ? Xt : Rs, S = p > 0 ? Dn : Os, H = u(h) || h, C = v.bind(0, H);
      a();
      const x = w(C, p);
      a = () => S(x), $ && !n && (n = Xt(m, E)), s = o = H;
    } else
      v(h);
  };
  return _.m = m, _;
}, Xs = (t, e) => Object.prototype.hasOwnProperty.call(t, e), et = (t) => t ? Object.keys(t) : [], ne = (t, e, n, s, o, a, i) => {
  const d = [e, n, s, o, a, i];
  return (typeof t != "object" || ln(t)) && !je(t) && (t = {}), se(d, (c) => {
    se(c, (v, u) => {
      const m = c[u];
      if (t === m)
        return !0;
      const _ = Ue(m);
      if (m && Qt(m)) {
        const y = t[u];
        let h = y;
        _ && !Ue(y) ? h = [] : !_ && !Qt(y) && (h = {}), t[u] = ne(h, m);
      } else
        t[u] = _ ? m.slice() : m;
    });
  }), t;
}, Js = (t, e) => se(ne({}, t), (n, s, o) => {
  n === void 0 ? delete o[s] : n && Qt(n) && (o[s] = Js(n));
}), jn = (t) => {
  for (const e in t)
    return !1;
  return !0;
}, Ln = (t, e, n) => Wt(t, nr(e, n)), it = (t) => ut(new Set((Ue(t) ? t : (t || "").split(" ")).filter((e) => e))), _n = (t, e) => t && t.getAttribute(e), ls = (t, e) => t && t.hasAttribute(e), Fe = (t, e, n) => {
  se(it(e), (s) => {
    t && t.setAttribute(s, n || "");
  });
}, qe = (t, e) => {
  se(it(e), (n) => t && t.removeAttribute(n));
}, mn = (t, e) => {
  const n = it(_n(t, e)), s = Y(Fe, t, e), o = (a, i) => {
    const d = new Set(n);
    return se(it(a), (c) => d[i](c)), ut(d).join(" ");
  };
  return {
    $: (a) => s(o(a, "delete")),
    O: (a) => s(o(a, "add")),
    C: (a) => {
      const i = it(a);
      return i.reduce((d, c) => d && n.includes(c), i.length > 0);
    }
  };
}, Qs = (t, e, n) => {
  mn(t, e).$(n);
}, Bt = (t, e, n) => (mn(t, e).O(n), Y(Qs, t, e, n)), Yt = (t, e, n, s) => {
  (s ? Bt : Qs)(t, e, n);
}, ir = (t, e, n) => mn(t, e).C(n), Zs = (t) => mn(t, "class"), Wn = (t, e) => {
  Zs(t).$(e);
}, en = (t, e) => (Zs(t).O(e), Y(Wn, t, e)), eo = (t, e) => {
  const n = [], s = e ? dn(e) && e : document;
  return s ? _e(n, s.querySelectorAll(t)) : n;
}, cr = (t, e) => {
  const n = e ? dn(e) && e : document;
  return n ? n.querySelector(t) : null;
}, tn = (t, e) => dn(t) ? t.matches(e) : !1, to = (t) => tn(t, "body"), On = (t) => t ? ut(t.childNodes) : [], Ct = (t) => t && t.parentElement, gt = (t, e) => dn(t) && t.closest(e), Rn = (t) => document.activeElement, dr = (t, e, n) => {
  const s = gt(t, e), o = t && cr(n, s), a = gt(o, e) === s;
  return s && o ? s === t || o === t || a && gt(gt(t, n), e) !== s : !1;
}, tt = (t) => {
  if (cn(t))
    se(ut(t), (e) => tt(e));
  else if (t) {
    const e = Ct(t);
    e && e.removeChild(t);
  }
}, no = (t, e, n) => {
  if (n && t) {
    let s = e, o;
    return cn(n) ? (o = document.createDocumentFragment(), se(n, (a) => {
      a === s && (s = a.previousSibling), o.appendChild(a);
    })) : o = n, e && (s ? s !== e && (s = s.nextSibling) : s = t.firstChild), t.insertBefore(o, s || null), () => tt(n);
  }
  return Ne;
}, Te = (t, e) => no(t, null, e), as = (t, e) => no(Ct(t), t && t.nextSibling, e), bt = (t) => {
  const e = document.createElement("div");
  return Fe(e, "class", t), e;
}, so = (t) => {
  const e = bt();
  return e.innerHTML = t.trim(), se(On(e), (n) => tt(n));
}, ur = /^--/, is = (t, e) => t.getPropertyValue(e) || t[e] || "", Yn = (t) => {
  const e = t || 0;
  return isFinite(e) ? e : 0;
}, zt = (t) => Yn(parseFloat(t || "")), cs = (t) => `${(Yn(t) * 100).toFixed(3)}%`, Bn = (t) => `${Yn(t)}px`;
function Et(t, e) {
  t && se(e, (n, s) => {
    try {
      const o = t.style, a = Ge(n) ? Bn(n) : (n || "") + "";
      ur.test(s) ? o.setProperty(s, a) : o[s] = a;
    } catch {
    }
  });
}
function ct(t, e, n) {
  const s = an(e);
  let o = s ? "" : {};
  if (t) {
    const a = De.getComputedStyle(t, n) || t.style;
    o = s ? is(a, e) : e.reduce((i, d) => (i[d] = is(a, d), i), o);
  }
  return o;
}
const Ze = (t) => ct(t, "direction") === "rtl", ds = (t, e, n) => {
  const s = e ? `${e}-` : "", o = n ? `-${n}` : "", a = `${s}top${o}`, i = `${s}right${o}`, d = `${s}bottom${o}`, c = `${s}left${o}`, v = ct(t, [a, i, d, c]);
  return {
    t: zt(v[a]),
    r: zt(v[i]),
    b: zt(v[d]),
    l: zt(v[c])
  };
}, kn = (t, e) => `translate${Rt(t) ? `(${t.x},${t.y})` : `${e ? "X" : "Y"}(${t})`}`, vr = {
  w: 0,
  h: 0
}, pn = (t, e) => e ? {
  w: e[`${t}Width`],
  h: e[`${t}Height`]
} : vr, fr = (t) => pn("inner", t || De), Lt = Y(pn, "offset"), oo = Y(pn, "client"), In = Y(pn, "scroll"), Kn = (t) => {
  const e = parseFloat(ct(t, xt)) || 0, n = parseFloat(ct(t, St)) || 0;
  return {
    w: e - Tn(e),
    h: n - Tn(n)
  };
}, wt = (t) => t.getBoundingClientRect(), Fn = (t) => !!(t && (t[St] || t[xt])), ro = (t, e) => {
  const n = Fn(t);
  return !Fn(e) && n;
}, us = (t, e, n, s) => {
  se(it(e), (o) => {
    t.removeEventListener(o, n, s);
  });
}, ve = (t, e, n, s) => {
  var o;
  const a = (o = s && s.H) != null ? o : !0, i = s && s.I || !1, d = s && s.A || !1, c = {
    passive: a,
    capture: i
  };
  return Y(Re, it(e).map((v) => {
    const u = d ? (m) => {
      us(t, v, u, i), n(m);
    } : n;
    return t.addEventListener(v, u, c), Y(us, t, v, u, i);
  }));
}, Xn = (t) => t.stopPropagation(), vs = (t) => t.preventDefault(), _r = {
  x: 0,
  y: 0
}, xn = (t) => {
  const e = t && wt(t);
  return e ? {
    x: e.left + De.scrollX,
    y: e.top + De.scrollY
  } : _r;
}, nn = (t, e, n) => n ? n.n ? -t + 0 : n.i ? e - t : t : t, fs = (t, e) => [nn(0, t, e), nn(t, t, e)], _s = (t, e, n) => Ln(0, 1, nn(t, e, n) / e || 0), nt = (t, e) => {
  const { x: n, y: s } = Ge(e) ? {
    x: e,
    y: e
  } : e || {};
  Ge(n) && (t.scrollLeft = n), Ge(s) && (t.scrollTop = s);
}, At = (t) => ({
  x: t.scrollLeft,
  y: t.scrollTop
}), ms = (t, e) => {
  se(Fs(e), t);
}, Hn = (t) => {
  const e = /* @__PURE__ */ new Map(), n = (a, i) => {
    if (a) {
      const d = e.get(a);
      ms((c) => {
        d && d[c ? "delete" : "clear"](c);
      }, i);
    } else
      e.forEach((d) => {
        d.clear();
      }), e.clear();
  }, s = (a, i) => {
    if (an(a)) {
      const v = e.get(a) || /* @__PURE__ */ new Set();
      return e.set(a, v), ms((u) => {
        je(u) && v.add(u);
      }, i), Y(n, a, i);
    }
    Is(i) && i && n();
    const d = et(a), c = [];
    return se(d, (v) => {
      const u = a[v];
      u && _e(c, s(v, u));
    }), Y(Re, c);
  }, o = (a, i) => {
    se(ut(e.get(a)), (d) => {
      i && !Mn(i) ? d.apply(0, i) : d();
    });
  };
  return s(t || {}), [s, n, o];
}, ps = (t) => JSON.stringify(t, (e, n) => {
  if (je(n))
    throw 0;
  return n;
}), hs = (t, e) => t ? `${e}`.split(".").reduce((n, s) => n && Xs(n, s) ? n[s] : void 0, t) : void 0, mr = {
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
  const n = {}, s = Ye(et(e), et(t));
  return se(s, (o) => {
    const a = t[o], i = e[o];
    if (Rt(a) && Rt(i))
      ne(n[o] = {}, lo(a, i)), jn(n[o]) && delete n[o];
    else if (Xs(e, o) && i !== a) {
      let d = !0;
      if (Ue(a) || Ue(i))
        try {
          ps(a) === ps(i) && (d = !1);
        } catch {
        }
      d && (n[o] = i);
    }
  }), n;
}, gs = (t, e, n) => (s) => [hs(t, s), n || hs(e, s) !== void 0], Ft = "data-overlayscrollbars", Kt = "os-environment", Gt = `${Kt}-scrollbar-hidden`, Sn = `${Ft}-initialize`, Ae = Ft, ao = `${Ae}-overflow-x`, io = `${Ae}-overflow-y`, co = "overflowVisible", pr = "scrollbarPressed", Nn = "updating", hr = "body", We = `${Ft}-viewport`, gr = "arrange", uo = "scrollbarHidden", yt = co, Un = `${Ft}-padding`, br = yt, bs = `${Ft}-content`, Jn = "os-size-observer", wr = `${Jn}-appear`, yr = `${Jn}-listener`, kr = "os-trinsic-observer", xr = "os-theme-none", Ve = "os-scrollbar", Sr = `${Ve}-rtl`, $r = `${Ve}-horizontal`, Cr = `${Ve}-vertical`, vo = `${Ve}-track`, Qn = `${Ve}-handle`, Er = `${Ve}-visible`, Ar = `${Ve}-cornerless`, ws = `${Ve}-interaction`, ys = `${Ve}-unusable`, Pn = `${Ve}-auto-hide`, ks = `${Pn}-hidden`, xs = `${Ve}-wheel`, Tr = `${vo}-interactive`, Dr = `${Qn}-interactive`, fo = {}, _o = {}, Vr = (t) => {
  se(t, (e) => se(e, (n, s) => {
    fo[s] = e[s];
  }));
}, mo = (t, e, n) => et(t).map((s) => {
  const { static: o, instance: a } = t[s], [i, d, c] = n || [], v = n ? a : o;
  if (v) {
    const u = n ? v(i, d, e) : v(e);
    return (c || _o)[s] = u;
  }
}), Vt = (t) => _o[t], Mr = "__osOptionsValidationPlugin", Lr = "__osSizeObserverPlugin", Or = (t, e) => {
  const { T: n } = e, [s, o] = t("showNativeOverlaidScrollbars");
  return [s && n.x && n.y, o];
}, sn = (t) => t.indexOf(js) === 0, po = (t, e) => {
  const { D: n } = t, s = (c) => {
    const v = ct(n, c), m = (e ? e[c] : v) === "scroll";
    return [v, m];
  }, [o, a] = s(vn), [i, d] = s(fn);
  return {
    k: {
      x: o,
      y: i
    },
    R: {
      x: a,
      y: d
    }
  };
}, Rr = (t, e, n, s) => {
  const o = e.x || e.y, a = (u, m) => {
    const _ = sn(u), y = _ && o ? "hidden" : "", h = m && _ && u.replace(`${js}-`, "") || y;
    return [m && !_ ? u : "", sn(h) ? "hidden" : h];
  }, [i, d] = a(n.x, e.x), [c, v] = a(n.y, e.y);
  return s[vn] = d && c ? d : i, s[fn] = v && i ? v : c, po(t, s);
}, Zn = "__osScrollbarsHidingPlugin", Br = "__osClickScrollPlugin";
let $n;
const Ir = () => {
  const t = (w, S, I) => {
    Te(document.body, w), Te(document.body, w);
    const H = oo(w), C = Lt(w), x = Kn(S);
    return I && tt(w), {
      x: C.h - H.h + x.h,
      y: C.w - H.w + x.w
    };
  }, e = (w) => {
    let S = !1;
    const I = en(w, Gt);
    try {
      S = ct(w, "scrollbar-width") === "none" || ct(w, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return I(), S;
  }, n = (w, S) => {
    Et(w, {
      [vn]: $t,
      [fn]: $t,
      direction: "rtl"
    }), nt(w, {
      x: 0
    });
    const I = xn(w), H = xn(S);
    nt(w, {
      x: -999
    });
    const C = xn(S);
    return {
      i: I.x === H.x,
      n: H.x !== C.x
    };
  }, s = `.${Kt}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Kt} div{width:200%;height:200%;margin:10px 0}.${Gt}{scrollbar-width:none!important}.${Gt}::-webkit-scrollbar,.${Gt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, a = so(`<div class="${Kt}"><div></div><style>${s}</style></div>`)[0], i = a.firstChild, [d, , c] = Hn(), [v, u] = He({
    o: t(a, i),
    u: Ys
  }, Y(t, a, i, !0)), [m] = u(), _ = e(a), y = {
    x: m.x === 0,
    y: m.y === 0
  }, h = {
    elements: {
      host: null,
      padding: !_,
      viewport: (w) => _ && to(w) && w,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, p = ne({}, mr), b = Y(ne, {}, p), E = Y(ne, {}, h), $ = {
    P: m,
    T: y,
    L: _,
    J: !!Vn,
    K: n(a, i),
    Z: Y(d, "r"),
    G: E,
    tt: (w) => ne(h, w) && E(),
    nt: b,
    ot: (w) => ne(p, w) && b(),
    st: ne({}, h),
    et: ne({}, p)
  };
  return qe(a, "style"), tt(a), De.addEventListener("resize", () => {
    let w;
    if (!_ && (!y.x || !y.y)) {
      const S = Vt(Zn);
      w = !!(S ? S.Y() : Ne)($, v);
    }
    c("r", [w]);
  }), $;
}, Be = () => ($n || ($n = Ir()), $n), ho = (t, e) => je(e) ? e.apply(0, t) : e, Fr = (t, e, n, s) => {
  const o = It(s) ? n : s;
  return ho(t, o) || e.apply(0, t);
}, go = (t, e, n, s) => {
  const o = It(s) ? n : s, a = ho(t, o);
  return !!a && (Zt(a) ? a : e.apply(0, t));
}, Hr = (t, e) => {
  const { nativeScrollbarsOverlaid: n, body: s } = e || {}, { T: o, L: a, G: i } = Be(), { nativeScrollbarsOverlaid: d, body: c } = i().cancel, v = n ?? d, u = It(s) ? c : s, m = (o.x || o.y) && v, _ = t && (ln(u) ? !a : u);
  return !!m || !!_;
}, es = /* @__PURE__ */ new WeakMap(), Nr = (t, e) => {
  es.set(t, e);
}, Ur = (t) => {
  es.delete(t);
}, bo = (t) => es.get(t), Pr = (t, e, n) => {
  let s = !1;
  const o = n ? /* @__PURE__ */ new WeakMap() : !1, a = () => {
    s = !0;
  }, i = (d) => {
    if (o && n) {
      const c = n.map((v) => {
        const [u, m] = v || [];
        return [m && u ? (d || eo)(u, t) : [], m];
      });
      se(c, (v) => se(v[0], (u) => {
        const m = v[1], _ = o.get(u) || [];
        if (t.contains(u) && m) {
          const h = ve(u, m, (p) => {
            s ? (h(), o.delete(u)) : e(p);
          });
          o.set(u, _e(_, h));
        } else
          Re(_), o.delete(u);
      }));
    }
  };
  return i(), [a, i];
}, Ss = (t, e, n, s) => {
  let o = !1;
  const { ct: a, rt: i, lt: d, it: c, ut: v, dt: u } = s || {}, m = Ks(() => o && n(!0), {
    v: 33,
    p: 99
  }), [_, y] = Pr(t, m, d), h = a || [], p = i || [], b = Ye(h, p), E = (w, S) => {
    if (!Mn(S)) {
      const I = v || Ne, H = u || Ne, C = [], x = [];
      let V = !1, L = !1;
      if (se(S, (A) => {
        const { attributeName: U, target: B, type: W, oldValue: J, addedNodes: oe, removedNodes: G } = A, Q = W === "attributes", ue = W === "childList", z = t === B, ie = Q && U, ae = ie && _n(B, U || "") || null, ce = ie && J !== ae, ke = un(p, U) && ce;
        if (e && (ue || !z)) {
          const ge = Q && ce, me = ge && c && tn(B, c), M = (me ? !I(B, U, J, ae) : !Q || ge) && !H(A, !!me, t, s);
          se(oe, (D) => _e(C, D)), se(G, (D) => _e(C, D)), L = L || M;
        }
        !e && z && ce && !I(B, U, J, ae) && (_e(x, U), V = V || ke);
      }), y((A) => rs(C).reduce((U, B) => (_e(U, eo(A, B)), tn(B, A) ? _e(U, B) : U), [])), e)
        return !w && L && n(!1), [!1];
      if (!Mn(x) || V) {
        const A = [rs(x), V];
        return !w && n.apply(0, A), A;
      }
    }
  }, $ = new sr(Y(E, !1));
  return [() => ($.observe(t, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: b,
    subtree: e,
    childList: e,
    characterData: e
  }), o = !0, () => {
    o && (_(), $.disconnect(), o = !1);
  }), () => {
    if (o)
      return m.m(), E(!0, $.takeRecords());
  }];
}, wo = (t, e, n) => {
  const { ft: o, _t: a } = n || {}, i = Vt(Lr), { K: d } = Be(), c = Y(Ze, t), [v] = He({
    o: !1,
    _: !0
  });
  return () => {
    const u = [], _ = so(`<div class="${Jn}"><div class="${yr}"></div></div>`)[0], y = _.firstChild, h = (p) => {
      const b = p instanceof ResizeObserverEntry, E = !b && Ue(p);
      let $ = !1, w = !1, S = !0;
      if (b) {
        const [I, , H] = v(p.contentRect), C = Fn(I), x = ro(I, H);
        w = !H || x, $ = !w && !C, S = !$;
      } else E ? [, S] = p : w = p === !0;
      if (o && S) {
        const I = E ? p[0] : Ze(_);
        nt(_, {
          x: nn(3333333, 3333333, I && d),
          y: 3333333
        });
      }
      $ || e({
        vt: E ? p : void 0,
        ht: !E,
        _t: w
      });
    };
    if (Jt) {
      const p = new Jt((b) => h(b.pop()));
      p.observe(y), _e(u, () => {
        p.disconnect();
      });
    } else if (i) {
      const [p, b] = i(y, h, a);
      _e(u, Ye([en(_, wr), ve(_, "animationstart", p)], b));
    } else
      return Ne;
    if (o) {
      const [p] = He({
        o: void 0
      }, c);
      _e(u, ve(_, "scroll", (b) => {
        const E = p(), [$, w, S] = E;
        w && (Wn(y, "ltr rtl"), en(y, $ ? "rtl" : "ltr"), h([!!$, w, S])), Xn(b);
      }));
    }
    return Y(Re, _e(u, Te(t, _)));
  };
}, qr = (t, e) => {
  let n;
  const s = (c) => c.h === 0 || c.isIntersecting || c.intersectionRatio > 0, o = bt(kr), [a] = He({
    o: !1
  }), i = (c, v) => {
    if (c) {
      const u = a(s(c)), [, m] = u;
      return m && !v && e(u) && [u];
    }
  }, d = (c, v) => i(v.pop(), c);
  return [() => {
    const c = [];
    if (os)
      n = new os(Y(d, !1), {
        root: t
      }), n.observe(o), _e(c, () => {
        n.disconnect();
      });
    else {
      const v = () => {
        const u = Lt(o);
        i(u);
      };
      _e(c, wo(o, v)()), v();
    }
    return Y(Re, _e(c, Te(t, o)));
  }, () => n && d(!0, n.takeRecords())];
}, zr = (t, e, n, s) => {
  let o, a, i, d, c, v;
  const { L: u } = Be(), m = `[${Ae}]`, _ = `[${We}]`, y = ["tabindex"], h = ["wrap", "cols", "rows"], p = ["id", "class", "style", "open"], { gt: b, bt: E, D: $, wt: w, yt: S, V: I, St: H, $t: C } = t, x = {
    Ot: !1,
    N: Ze(b)
  }, V = Be(), L = Vt(Zn), [A] = He({
    u: Ws,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const T = L && L.M(t, e, x, V, n).W, M = H(yt), D = !I && H(gr), R = D && At($);
    C(yt), I && C(Nn, !0);
    const N = D && T && T()[0], P = In(w), Z = In($), te = Kn($);
    return C(yt, M), I && C(Nn), N && N(), nt($, R), {
      w: Z.w + P.w + te.w,
      h: Z.h + P.h + te.h
    };
  }), U = S ? h : Ye(p, h), B = Ks(s, {
    v: () => o,
    p: () => a,
    S(T, M) {
      const [D] = T, [R] = M;
      return [Ye(et(D), et(R)).reduce((N, P) => (N[P] = D[P] || R[P], N), {})];
    }
  }), W = (T) => {
    if (I) {
      const M = Ze(b);
      ne(T, {
        Ct: v !== M
      }), ne(x, {
        N: M
      }), v = M;
    }
  }, J = (T) => {
    se(T || y, (M) => {
      if (un(y, M)) {
        const D = _n(E, M);
        an(D) ? Fe($, M, D) : qe($, M);
      }
    });
  }, oe = (T, M) => {
    const [D, R] = T, N = {
      xt: R
    };
    return ne(x, {
      Ot: D
    }), !M && s(N), N;
  }, G = ({ ht: T, vt: M, _t: D }) => {
    const N = !(T && !D && !M) && u ? B : s, [P, Z] = M || [], te = {
      ht: T || D,
      _t: D,
      Ct: Z
    };
    W(te), M && ne(x, {
      N: P
    }), N(te);
  }, Q = (T, M) => {
    const [, D] = A(), R = {
      Ht: D
    };
    return W(R), D && !M && (T ? s : B)(R), R;
  }, ue = (T, M, D) => {
    const R = {
      zt: M
    };
    return W(R), M && !D ? B(R) : I || J(T), R;
  }, { Z: z } = V, [ie, ae] = w ? qr(E, oe) : [], ce = !I && wo(E, G, {
    _t: !0,
    ft: !0
  }), [ke, ge] = Ss(E, !1, ue, {
    rt: p,
    ct: Ye(p, y)
  }), me = I && Jt && new Jt((T) => {
    const M = T[T.length - 1].contentRect;
    G({
      ht: !0,
      _t: ro(M, c)
    }), c = M;
  });
  return [() => {
    J(), me && me.observe(E);
    const T = ce && ce(), M = ie && ie(), D = ke(), R = z((N) => {
      const [, P] = A();
      B({
        It: N,
        Ht: P
      });
    });
    return () => {
      me && me.disconnect(), T && T(), M && M(), d && d(), D(), R();
    };
  }, ({ Et: T, At: M, Tt: D }) => {
    const R = {}, [N] = T("update.ignoreMutation"), [P, Z] = T("update.attributes"), [te, pe] = T("update.elementEvents"), [be, X] = T("update.debounce"), we = pe || Z, xe = M || D, Ie = (re) => je(N) && N(re);
    if (we) {
      i && i(), d && d();
      const [re, Se] = Ss(w || $, !0, Q, {
        ct: Ye(U, P || []),
        lt: te,
        it: m,
        dt: (Me, he) => {
          const { target: Le, attributeName: Ht } = Me;
          return (!he && Ht && !I ? dr(Le, m, _) : !1) || !!gt(Le, `.${Ve}`) || !!Ie(Me);
        }
      });
      d = re(), i = Se;
    }
    if (X)
      if (B.m(), Ue(be)) {
        const re = be[0], Se = be[1];
        o = Ge(re) && re, a = Ge(Se) && Se;
      } else Ge(be) ? (o = be, a = !1) : (o = !1, a = !1);
    if (xe) {
      const re = ge(), Se = ae && ae(), Me = i && i();
      re && ne(R, ue(re[0], re[1], xe)), Se && ne(R, oe(Se[0], xe)), Me && ne(R, Q(Me[0], xe));
    }
    return W(R), R;
  }, x];
}, Gr = (t, e, n, s) => {
  const { G: o, K: a } = Be(), { scrollbars: i } = o(), { slot: d } = i, { gt: c, bt: v, D: u, Dt: m, kt: _, Rt: y, V: h } = e, { scrollbars: p } = m ? {} : t, { slot: b } = p || {}, E = /* @__PURE__ */ new Map(), $ = (T) => Vn && new Vn({
    source: _,
    axis: T
  }), w = $("x"), S = $("y"), I = go([c, v, u], () => h && y ? c : v, d, b), H = (T, M) => {
    if (M) {
      const te = T ? xt : St, { Mt: pe, Vt: be } = M, X = wt(be)[te], we = wt(pe)[te];
      return Ln(0, 1, X / we || 0);
    }
    const D = T ? "x" : "y", { Lt: R, Pt: N } = n, P = N[D], Z = R[D];
    return Ln(0, 1, P / (P + Z) || 0);
  }, C = (T, M, D, R) => {
    const N = H(D, T);
    return 1 / N * (1 - N) * (R ? 1 - M : M) || 0;
  }, x = (T, M) => ne(T, M ? {
    clear: ["left"]
  } : {}), V = (T) => {
    E.forEach((M, D) => {
      (T ? un(Fs(T), D) : !0) && (se(M || [], (N) => {
        N && N.cancel();
      }), E.delete(D));
    });
  }, L = (T, M, D, R) => {
    const N = E.get(T) || [], P = N.find((Z) => Z && Z.timeline === M);
    P ? P.effect = new KeyframeEffect(T, D, {
      composite: R
    }) : E.set(T, Ye(N, [T.animate(D, {
      timeline: M,
      composite: R
    })]));
  }, A = (T, M, D) => {
    const R = D ? en : Wn;
    se(T, (N) => {
      R(N.Ut, M);
    });
  }, U = (T, M) => {
    se(T, (D) => {
      const [R, N] = M(D);
      Et(R, N);
    });
  }, B = (T, M) => {
    U(T, (D) => {
      const { Vt: R } = D;
      return [R, {
        [M ? xt : St]: cs(H(M))
      }];
    });
  }, W = (T, M) => {
    const { Lt: D } = n, R = M ? D.x : D.y, N = (P, Z, te) => kn(cs(C(P, _s(Z, R, te), M, te)), M);
    if (w && S)
      se(T, (P) => {
        const { Ut: Z, Vt: te } = P, pe = M && Ze(Z) && a;
        L(te, M ? w : S, x({
          transform: fs(R, pe).map((be) => N(P, be, pe))
        }, pe));
      });
    else {
      const P = At(_);
      U(T, (Z) => {
        const { Vt: te, Ut: pe } = Z;
        return [te, {
          transform: N(Z, M ? P.x : P.y, M && Ze(pe) && a)
        }];
      });
    }
  }, J = (T) => h && !y && Ct(T) === u, oe = [], G = [], Q = [], ue = (T, M, D) => {
    const R = Is(D), N = R ? D : !0, P = R ? !D : !0;
    N && A(G, T, M), P && A(Q, T, M);
  }, z = () => {
    B(G, !0), B(Q);
  }, ie = () => {
    W(G, !0), W(Q);
  }, ae = () => {
    if (h) {
      const { Lt: T } = n, M = 0.5;
      if (w && S)
        se(Ye(Q, G), ({ Ut: D }) => {
          if (J(D)) {
            const R = (N, P, Z) => {
              const te = Z && Ze(D) && a;
              L(D, N, x({
                transform: fs(P - M, te).map((pe) => kn(Bn(pe), Z))
              }, te), "add");
            };
            R(w, T.x, !0), R(S, T.y);
          } else
            V(D);
        });
      else {
        const D = At(_), R = (N) => {
          const { Ut: P } = N, Z = J(P) && P, te = (pe, be, X) => {
            const we = _s(pe, be, X), xe = be * we;
            return Bn(X ? -xe : xe);
          };
          return [Z, {
            transform: Z ? kn({
              x: te(D.x, T.x, Ze(P) && a),
              y: te(D.y, T.y)
            }) : ""
          }];
        };
        U(G, R), U(Q, R);
      }
    }
  }, ce = (T) => {
    const D = bt(`${Ve} ${T ? $r : Cr}`), R = bt(vo), N = bt(Qn), P = {
      Ut: D,
      Mt: R,
      Vt: N
    };
    return _e(T ? G : Q, P), _e(oe, [Te(D, R), Te(R, N), Y(tt, D), V, s(P, ue, W, T)]), P;
  }, ke = Y(ce, !0), ge = Y(ce, !1), me = () => (Te(I, G[0].Ut), Te(I, Q[0].Ut), Y(Re, oe));
  return ke(), ge(), [{
    Bt: z,
    Nt: ie,
    jt: ae,
    Ft: ue,
    qt: {
      J: w,
      Wt: G,
      Xt: ke,
      Yt: Y(U, G)
    },
    Jt: {
      J: S,
      Wt: Q,
      Xt: ge,
      Yt: Y(U, Q)
    }
  }, me];
}, jr = (t, e, n, s) => {
  const { bt: o, D: a, V: i, kt: d, Kt: c } = e;
  return (v, u, m, _) => {
    const { Ut: y, Mt: h, Vt: p } = v, [b, E] = ht(333), [$, w] = ht(), S = Y(m, [v], _), I = !!d.scrollBy, H = `client${_ ? "X" : "Y"}`, C = _ ? xt : St, x = _ ? "left" : "top", V = _ ? "w" : "h", L = _ ? "x" : "y", A = (W) => W.propertyName.indexOf(C) > -1, U = () => {
      const W = "pointerup pointerleave pointercancel lostpointercapture", J = (oe, G) => (Q) => {
        const { Lt: ue } = n, z = Lt(h)[V] - Lt(p)[V], ae = G * Q / z * ue[L];
        nt(d, {
          [L]: oe + ae
        });
      };
      return ve(h, "pointerdown", (oe) => {
        const G = gt(oe.target, `.${Qn}`) === p, Q = G ? p : h, ue = t.scrollbars, { button: z, isPrimary: ie, pointerType: ae } = oe, { pointers: ce } = ue;
        if (z === 0 && ie && ue[G ? "dragScroll" : "clickScroll"] && (ce || []).includes(ae)) {
          const ge = !G && oe.shiftKey, me = Y(wt, p), T = Y(wt, h), M = (re, Se) => (re || me())[x] - (Se || T())[x], D = Tn(wt(d)[C]) / Lt(d)[V] || 1, R = J(At(d)[L] || 0, 1 / D), N = oe[H], P = me(), Z = T(), te = P[C], pe = M(P, Z) + te / 2, be = N - Z[x], X = G ? 0 : be - pe, we = (re) => {
            Re(Ie), Q.releasePointerCapture(re.pointerId);
          }, Ie = [Bt(o, Ae, pr), ve(c, W, we), ve(c, "selectstart", (re) => vs(re), {
            H: !1
          }), ve(h, W, we), ve(h, "pointermove", (re) => {
            const Se = re[H] - N;
            (G || ge) && R(X + Se);
          })];
          if (Q.setPointerCapture(oe.pointerId), ge)
            R(X);
          else if (!G) {
            const re = Vt(Br);
            re && _e(Ie, re(R, M, X, te, be));
          }
        }
      });
    };
    let B = !0;
    return Y(Re, [ve(p, "pointermove pointerleave", s), ve(y, "pointerenter", () => {
      u(ws, !0);
    }), ve(y, "pointerleave pointercancel", () => {
      u(ws, !1);
    }), !i && ve(y, "mousedown", () => {
      const W = Rn();
      (ls(W, We) || ls(W, Ae) || W === document.body) && Xt(() => {
        a.focus({
          preventScroll: !0
        });
      }, 25);
    }), ve(y, "wheel", (W) => {
      const { deltaX: J, deltaY: oe, deltaMode: G } = W;
      I && B && G === 0 && Ct(y) === o && d.scrollBy({
        left: J,
        top: oe,
        behavior: "smooth"
      }), B = !1, u(xs, !0), b(() => {
        B = !0, u(xs);
      }), vs(W);
    }, {
      H: !1,
      I: !0
    }), ve(p, "transitionstart", (W) => {
      if (A(W)) {
        const J = () => {
          S(), $(J);
        };
        J();
      }
    }), ve(p, "transitionend transitioncancel", (W) => {
      A(W) && (w(), S());
    }), ve(y, "mousedown", Y(ve, c, "click", Xn, {
      A: !0,
      I: !0
    }), {
      I: !0
    }), U(), E, w]);
  };
}, Wr = (t, e, n, s, o, a) => {
  let i, d, c, v, u, m = Ne, _ = 0;
  const y = (z) => z.pointerType === "mouse", [h, p] = ht(), [b, E] = ht(100), [$, w] = ht(100), [S, I] = ht(() => _), [H, C] = Gr(t, o, s, jr(e, o, s, (z) => y(z) && oe())), { bt: x, Zt: V, Rt: L } = o, { Ft: A, Bt: U, Nt: B, jt: W } = H, J = (z, ie) => {
    if (I(), z)
      A(ks);
    else {
      const ae = Y(A, ks, !0);
      _ > 0 && !ie ? S(ae) : ae();
    }
  }, oe = () => {
    (c ? !i : !v) && (J(!0), b(() => {
      J(!1);
    }));
  }, G = (z) => {
    A(Pn, z, !0), A(Pn, z, !1);
  }, Q = (z) => {
    y(z) && (i = c, c && J(!0));
  }, ue = [I, E, w, p, () => m(), ve(x, "pointerover", Q, {
    A: !0
  }), ve(x, "pointerenter", Q), ve(x, "pointerleave", (z) => {
    y(z) && (i = !1, c && J(!1));
  }), ve(x, "pointermove", (z) => {
    y(z) && d && oe();
  }), ve(V, "scroll", (z) => {
    h(() => {
      B(), oe();
    }), a(z), W();
  })];
  return [() => Y(Re, _e(ue, C())), ({ Et: z, Tt: ie, Gt: ae, Qt: ce }) => {
    const { tn: ke, nn: ge, sn: me } = ce || {}, { Ct: T, _t: M } = ae || {}, { N: D } = n, { T: R } = Be(), { k: N, en: P } = s, [Z, te] = z("showNativeOverlaidScrollbars"), [pe, be] = z("scrollbars.theme"), [X, we] = z("scrollbars.visibility"), [xe, Ie] = z("scrollbars.autoHide"), [re, Se] = z("scrollbars.autoHideSuspend"), [Me] = z("scrollbars.autoHideDelay"), [he, Le] = z("scrollbars.dragScroll"), [Ht, Nt] = z("scrollbars.clickScroll"), [Ut, Pe] = z("overflow"), rt = M && !ie, lt = P.x || P.y, gn = ke || ge || T || ie, Je = me || we || Pe, bn = Z && R.x && R.y, ft = (_t, mt, Mt) => {
      const Pt = _t.includes("scroll") && (X === "visible" || X === "auto" && mt === "scroll");
      return A(Er, Pt, Mt), Pt;
    };
    if (_ = Me, rt && (re && lt ? (G(!1), m(), $(() => {
      m = ve(V, "scroll", Y(G, !0), {
        A: !0
      });
    })) : G(!0)), te && A(xr, bn), be && (A(u), A(pe, !0), u = pe), Se && !re && G(!0), Ie && (d = xe === "move", c = xe === "leave", v = xe === "never", J(v, !0)), Le && A(Dr, he), Nt && A(Tr, Ht), Je) {
      const _t = ft(Ut.x, N.x, !0), mt = ft(Ut.y, N.y, !1);
      A(Ar, !(_t && mt));
    }
    gn && (U(), B(), W(), A(ys, !P.x, !0), A(ys, !P.y, !1), A(Sr, D && !L));
  }, {}, H];
}, Yr = (t) => {
  const e = Be(), { G: n, L: s } = e, { elements: o } = n(), { host: a, padding: i, viewport: d, content: c } = o, v = Zt(t), u = v ? {} : t, { elements: m } = u, { host: _, padding: y, viewport: h, content: p } = m || {}, b = v ? t : u.target, E = to(b), $ = tn(b, "textarea"), w = b.ownerDocument, S = w.documentElement, I = () => w.defaultView || De, H = (X) => {
    X && X.focus && X.focus({
      preventScroll: !0
    });
  }, C = Y(Fr, [b]), x = Y(go, [b]), V = Y(bt, ""), L = Y(C, V, d), A = Y(x, V, c), U = L(h), B = U === b, W = B && E, J = !B && A(p), oe = !B && U === J, G = W ? S : U, Q = $ ? C(V, a, _) : b, ue = W ? G : Q, z = !B && x(V, i, y), ie = !oe && J, ae = [ie, G, z, ue].map((X) => Zt(X) && !Ct(X) && X), ce = (X) => X && un(ae, X), ke = ce(G) ? b : G, ge = {
    gt: b,
    bt: ue,
    D: G,
    cn: z,
    wt: ie,
    kt: W ? S : G,
    Zt: W ? w : G,
    rn: E ? S : ke,
    Kt: w,
    yt: $,
    Rt: E,
    Dt: v,
    V: B,
    ln: I,
    St: (X) => ir(G, B ? Ae : We, X),
    $t: (X, we) => Yt(G, B ? Ae : We, X, we)
  }, { gt: me, bt: T, cn: M, D, wt: R } = ge, N = [() => {
    qe(T, [Ae, Sn]), qe(me, Sn), E && qe(S, [Sn, Ae]);
  }], P = $ && ce(T);
  let Z = $ ? me : On([R, D, M, T, me].find((X) => X && !ce(X)));
  const te = W ? me : R || D, pe = Y(Re, N);
  return [ge, () => {
    const X = I(), we = Rn(), xe = (he) => {
      Te(Ct(he), On(he)), tt(he);
    }, Ie = (he) => he ? ve(he, "focusin focusout focus blur", (Le) => {
      Xn(Le), Le.stopImmediatePropagation();
    }, {
      I: !0,
      H: !1
    }) : Ne, re = "tabindex", Se = _n(D, re), Me = Ie(we);
    return Fe(T, Ae, B ? "viewport" : "host"), Fe(M, Un, ""), Fe(R, bs, ""), B || (Fe(D, We, ""), Fe(D, re, Se || "-1"), E && Bt(S, Ae, hr)), P && (as(me, T), _e(N, () => {
      as(T, me), tt(T);
    })), Te(te, Z), Te(T, M), Te(M || T, !B && D), Te(D, R), _e(N, [Me, () => {
      const he = Rn(), Le = Ie(he);
      qe(M, Un), qe(R, bs), qe(D, [ao, io, We]), Se ? Fe(D, re, Se) : qe(D, re), ce(R) && xe(R), ce(D) && xe(D), ce(M) && xe(M), H(he), Le();
    }]), s && !B && (Bt(D, We, uo), _e(N, Y(qe, D, We))), H(!B && we === b && X.top === X ? D : we), Me(), Z = 0, pe;
  }, pe];
}, Kr = ({ wt: t }) => ({ Gt: e, an: n, Tt: s }) => {
  const { xt: o } = e || {}, { Ot: a } = n;
  t && (o || s) && Et(t, {
    [St]: a && "100%"
  });
}, Xr = ({ bt: t, cn: e, D: n, V: s }, o) => {
  const [a, i] = He({
    u: ar,
    o: ds()
  }, Y(ds, t, "padding", ""));
  return ({ Et: d, Gt: c, an: v, Tt: u }) => {
    let [m, _] = i(u);
    const { L: y } = Be(), { ht: h, Ht: p, Ct: b } = c || {}, { N: E } = v, [$, w] = d("paddingAbsolute");
    (h || _ || (u || p)) && ([m, _] = a(u));
    const I = !s && (w || b || _);
    if (I) {
      const H = !$ || !e && !y, C = m.r + m.l, x = m.t + m.b, V = {
        [zs]: H && !E ? -C : 0,
        [Gs]: H ? -x : 0,
        [qs]: H && E ? -C : 0,
        top: H ? -m.t : 0,
        right: H ? E ? -m.r : "auto" : 0,
        left: H ? E ? "auto" : -m.l : 0,
        [xt]: H && `calc(100% + ${C}px)`
      }, L = {
        [Hs]: H ? m.t : 0,
        [Ns]: H ? m.r : 0,
        [Ps]: H ? m.b : 0,
        [Us]: H ? m.l : 0
      };
      Et(e || n, V), Et(n, L), ne(o, {
        cn: m,
        un: !H,
        j: e ? L : ne({}, V, L)
      });
    }
    return {
      dn: I
    };
  };
}, Jr = (t, e) => {
  const n = Be(), { bt: s, cn: o, D: a, V: i, Rt: d, $t: c, ln: v } = t, { L: u } = n, m = d && i, _ = Y(Wt, 0), y = {
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
  }, p = (L, A) => {
    const U = De.devicePixelRatio % 1 !== 0 ? 1 : 0, B = {
      w: _(L.w - A.w),
      h: _(L.h - A.h)
    };
    return {
      w: B.w > U ? B.w : 0,
      h: B.h > U ? B.h : 0
    };
  }, [b, E] = He(y, Y(Kn, a)), [$, w] = He(y, Y(In, a)), [S, I] = He(y), [H, C] = He(y), [x] = He(h), V = Vt(Zn);
  return ({ Et: L, Gt: A, an: U, Tt: B }, { dn: W }) => {
    const { ht: J, Ht: oe, Ct: G, It: Q } = A || {}, ue = V && V.M(t, e, U, n, L), { q: z, W: ie, X: ae } = ue || {}, [ce, ke] = Or(L, n), [ge, me] = L("overflow"), T = J || W || oe || G || Q || ke, M = sn(ge.x), D = sn(ge.y), R = M || D;
    let N = E(B), P = w(B), Z = I(B), te = C(B), pe;
    if (ke && u && c(uo, !ce), T) {
      R && c(yt, !1);
      const [Pe, rt] = ie ? ie(pe) : [], [lt, gn] = N = b(B), [Je, bn] = P = $(B), ft = oo(a), _t = Je, mt = ft;
      Pe && Pe(), (bn || gn || ke) && rt && !ce && z && z(rt, Je, lt);
      const Mt = fr(v()), Pt = {
        w: _(Wt(Je.w, _t.w) + lt.w),
        h: _(Wt(Je.h, _t.h) + lt.h)
      }, ns = {
        w: _((m ? Mt.w : mt.w + _(ft.w - Je.w)) + lt.w),
        h: _((m ? Mt.h : mt.h + _(ft.h - Je.h)) + lt.h)
      };
      te = H(ns), Z = S(p(Pt, ns), B);
    }
    const [be, X] = te, [we, xe] = Z, [Ie, re] = P, [Se, Me] = N, he = {
      x: we.w > 0,
      y: we.h > 0
    }, Le = M && D && (he.x || he.y) || M && he.x && !he.y || D && he.y && !he.x;
    if (W || G || Q || Me || re || X || xe || me || ke || T) {
      const Pe = {}, rt = Rr(t, he, ge, Pe);
      ae && ae(rt, U, !!z && z(rt, Ie, Se), Pe), i ? (Fe(s, ao, Pe[vn]), Fe(s, io, Pe[fn])) : Et(a, Pe);
    }
    Yt(s, Ae, co, Le), Yt(o, Un, br, Le), i || Yt(a, We, yt, R);
    const [Nt, Ut] = x(po(t).k);
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
      nn: xe
    };
  };
}, Qr = (t) => {
  const [e, n, s] = Yr(t), o = {
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
      [qs]: 0,
      [Hs]: 0,
      [Ns]: 0,
      [Ps]: 0,
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
      x: $t,
      y: $t
    },
    en: {
      x: !1,
      y: !1
    }
  }, { gt: a, D: i, V: d } = e, { L: c, T: v } = Be(), u = !c && (v.x || v.y), m = [Kr(e), Xr(e, o), Jr(e, o)];
  return [n, (_) => {
    const y = {}, p = u && At(i), b = d ? Bt(i, Ae, Nn) : Ne;
    return se(m, (E) => {
      ne(y, E(_, y) || {});
    }), b(), nt(i, p), !d && nt(a, 0), y;
  }, o, e, s];
}, Zr = (t, e, n, s) => {
  const o = gs(e, {}), [a, i, d, c, v] = Qr(t), [u, m, _] = zr(c, d, o, ($) => {
    E({}, $);
  }), [y, h, , p] = Wr(t, e, _, d, c, s), b = ($) => et($).some((w) => !!$[w]), E = ($, w) => {
    const { fn: S, Tt: I, At: H, _n: C } = $, x = S || {}, V = !!I, L = {
      Et: gs(e, x, V),
      fn: x,
      Tt: V
    };
    if (C)
      return h(L), !1;
    const A = w || m(ne({}, L, {
      At: H
    })), U = i(ne({}, L, {
      an: _,
      Gt: A
    }));
    h(ne({}, L, {
      Gt: A,
      Qt: U
    }));
    const B = b(A), W = b(U), J = B || W || !jn(x) || V;
    return J && n($, {
      Gt: A,
      Qt: U
    }), J;
  };
  return [() => {
    const { rn: $, D: w } = c, S = At($), I = [u(), a(), y()];
    return nt(w, S), Y(Re, I);
  }, E, () => ({
    vn: _,
    hn: d
  }), {
    pn: c,
    gn: p
  }, v];
}, Xe = (t, e, n) => {
  const { nt: s } = Be(), o = Zt(t), a = o ? t : t.target, i = bo(a);
  if (e && !i) {
    let d = !1;
    const c = [], v = {}, u = (L) => {
      const A = Js(L), U = Vt(Mr);
      return U ? U(A, !0) : A;
    }, m = ne({}, s(), u(e)), [_, y, h] = Hn(), [p, b, E] = Hn(n), $ = (L, A) => {
      E(L, A), h(L, A);
    }, [w, S, I, H, C] = Zr(t, m, ({ fn: L, Tt: A }, { Gt: U, Qt: B }) => {
      const { ht: W, Ct: J, xt: oe, Ht: G, zt: Q, _t: ue } = U, { tn: z, nn: ie, sn: ae } = B;
      $("updated", [V, {
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
        force: !!A
      }]);
    }, (L) => $("scroll", [V, L])), x = (L) => {
      Ur(a), Re(c), d = !0, $("destroyed", [V, L]), y(), b();
    }, V = {
      options(L, A) {
        if (L) {
          const U = A ? s() : {}, B = lo(m, ne(U, u(L)));
          jn(B) || (ne(m, B), S({
            fn: B
          }));
        }
        return ne({}, m);
      },
      on: p,
      off: (L, A) => {
        L && A && b(L, A);
      },
      state() {
        const { vn: L, hn: A } = I(), { N: U } = L, { Pt: B, Lt: W, k: J, en: oe, cn: G, un: Q } = A;
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
        const { gt: L, bt: A, cn: U, D: B, wt: W, kt: J, Zt: oe } = H.pn, { qt: G, Jt: Q } = H.gn, ue = (ie) => {
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
              return S({
                _n: !0
              }), ge;
            }
          });
        };
        return ne({}, {
          target: L,
          host: A,
          padding: U || B,
          viewport: B,
          content: W || B,
          scrollOffsetElement: J,
          scrollEventElement: oe,
          scrollbarHorizontal: z(G),
          scrollbarVertical: z(Q)
        });
      },
      update: (L) => S({
        Tt: L,
        At: !0
      }),
      destroy: Y(x, !1),
      plugin: (L) => v[et(L)[0]]
    };
    return _e(c, [C]), Nr(a, V), mo(fo, Xe, [V, _, v]), Hr(H.pn.Rt, !o && t.cancel) ? (x(!0), V) : (_e(c, w()), $("initialized", [V]), V.update(!0), V);
  }
  return i;
};
Xe.plugin = (t) => {
  const e = Ue(t), n = e ? t : [t], s = n.map((o) => mo(o, Xe)[0]);
  return Vr(n), e ? s : s[0];
};
Xe.valid = (t) => {
  const e = t && t.elements, n = je(e) && e();
  return Qt(n) && !!bo(n.target);
};
Xe.env = () => {
  const { P: t, T: e, L: n, K: s, J: o, st: a, et: i, G: d, tt: c, nt: v, ot: u } = Be();
  return ne({}, {
    scrollbarsSize: t,
    scrollbarsOverlaid: e,
    scrollbarsHiding: n,
    rtlScrollBehavior: s,
    scrollTimeline: o,
    staticDefaultInitialization: a,
    staticDefaultOptions: i,
    getDefaultInitialization: d,
    setDefaultInitialization: c,
    getDefaultOptions: v,
    setDefaultOptions: u
  });
};
function el(t) {
  let e;
  const n = O(null), s = Math.floor(Math.random() * 2 ** 32), o = O(!1), a = O([]), i = () => a.value, d = () => e.getSelection(), c = () => a.value.length, v = () => e.clearSelection(!0), u = O(), m = O(null), _ = O(null), y = O(null), h = O(null), p = O(null);
  function b() {
    e = new zo({
      area: n.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), e.subscribe(
      "DS:start:pre",
      ({ items: C, event: x, isDragging: V }) => {
        if (V)
          e.Interaction._reset(x);
        else {
          o.value = !1;
          const L = n.value.offsetWidth - x.offsetX, A = n.value.offsetHeight - x.offsetY;
          L < 15 && A < 15 && e.Interaction._reset(x), x.target.classList.contains("os-scrollbar-handle") && e.Interaction._reset(x);
        }
      }
    ), document.addEventListener("dragleave", (C) => {
      h.value = C.target, !C.buttons && o.value && (o.value = !1);
    }), document.addEventListener("dragend", (C) => {
      t && t(h.value);
    });
  }
  const E = () => at(() => {
    e.addSelection(e.getSelectables()), $();
  }), $ = () => {
    a.value = e.getSelection().map((C) => JSON.parse(C.dataset.item)), u.value(a.value);
  }, w = () => at(() => {
    const C = i().map((x) => x.path);
    v(), e.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + s)
    }), e.addSelection(
      e.getSelectables().filter(
        (x) => C.includes(JSON.parse(x.dataset.item).path)
      )
    ), $(), I();
  }), S = (C) => {
    u.value = C, e.subscribe("DS:end", ({ items: x, event: V, isDragging: L }) => {
      a.value = x.map((A) => JSON.parse(A.dataset.item)), C(x.map((A) => JSON.parse(A.dataset.item)));
    });
  }, I = () => {
    m.value && (n.value.getBoundingClientRect().height < n.value.scrollHeight ? (_.value.style.height = n.value.scrollHeight + "px", _.value.style.display = "block") : (_.value.style.height = "100%", _.value.style.display = "none"));
  }, H = (C) => {
    if (!m.value)
      return;
    const { scrollOffsetElement: x } = m.value.elements();
    x.scrollTo({
      top: n.value.scrollTop,
      left: 0
    });
  };
  return Ee(() => {
    Xe(
      y.value,
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
        initialized: (C) => {
          m.value = C;
        },
        scroll: (C, x) => {
          const { scrollOffsetElement: V } = C.elements();
          n.value.scrollTo({
            top: V.scrollTop,
            left: 0
          });
        }
      }
    ), b(), I(), p.value = new ResizeObserver(I), p.value.observe(n.value), n.value.addEventListener("scroll", H), e.subscribe(
      "DS:scroll",
      ({ isDragging: C }) => C || H()
    );
  }), zn(() => {
    e && e.stop(), p.value && p.value.disconnect();
  }), As(() => {
    e && e.Area.reset();
  }), {
    area: n,
    explorerId: s,
    isDraggingRef: o,
    scrollBar: _,
    scrollBarContainer: y,
    getSelected: i,
    getSelection: d,
    selectAll: E,
    clearSelection: v,
    refreshSelection: w,
    getCount: c,
    onSelect: S
  };
}
function tl(t, e) {
  const n = O(t), s = O(e), o = O([]), a = O([]), i = O([]), d = O(!1), c = O(5);
  let v = !1, u = !1;
  const m = dt({
    adapter: n,
    storages: [],
    dirname: s,
    files: []
  });
  function _() {
    let $ = [], w = [], S = s.value ?? n.value + "://";
    S.length === 0 && (o.value = []), S.replace(n.value + "://", "").split("/").forEach(function(C) {
      $.push(C), $.join("/") !== "" && w.push({
        basename: C,
        name: C,
        path: n.value + "://" + $.join("/"),
        type: "dir"
      });
    }), a.value = w;
    const [I, H] = h(w, c.value);
    i.value = H, o.value = I;
  }
  function y($) {
    c.value = $, _();
  }
  function h($, w) {
    return $.length > w ? [$.slice(-w), $.slice(0, -w)] : [$, []];
  }
  function p($ = null) {
    d.value = $ ?? !d.value;
  }
  function b() {
    return o.value && o.value.length && !u;
  }
  const E = Ke(() => {
    var $;
    return (($ = o.value[o.value.length - 2]) == null ? void 0 : $.path) ?? n.value + "://";
  });
  return Ee(() => {
  }), Oe(s, _), Ee(_), {
    adapter: n,
    path: s,
    loading: v,
    searchMode: u,
    data: m,
    breadcrumbs: o,
    breadcrumbItems: a,
    limitBreadcrumbItems: y,
    hiddenBreadcrumbs: i,
    showHiddenBreadcrumbs: d,
    toggleHiddenBreadcrumbs: p,
    isGoUpAvailable: b,
    parentFolderPath: E
  };
}
function nl() {
  const t = "_readOnlyFile", e = localStorage.getItem(t), n = dt(JSON.parse(e ?? '{"items": []}')), s = (v) => {
    for (const u of v)
      n.items.length >= 1e3 && n.items.shift(), c(u.path) ? i(u.path) : n.items.push(u);
  }, o = () => JSON.parse(localStorage.getItem(t) || '{"items": []}'), a = () => {
    localStorage.setItem(t, JSON.stringify(n));
  }, i = (v) => {
    const u = n.items.findIndex((m) => m.path === v);
    u !== -1 && n.items.splice(u, 1);
  }, d = () => n.items, c = (v) => v.indexOf("自动下单") !== -1 ? !0 : n.items.findIndex((m) => v.indexOf(m.path) === 0) !== -1;
  return {
    storedValues: e,
    appendItems: s,
    save: a,
    deleteItem: i,
    getByLocalStorage: o,
    getItems: d,
    hasItem: c
  };
}
const sl = (t, e) => {
  const n = Ko(t.id), s = qo(), o = n.getStore("metricUnits", !1), a = er(n, t.theme), i = e.i18n, d = t.locale ?? e.locale, c = n.getStore("adapter"), v = nl(), u = (h) => Array.isArray(h) ? h : Qo, m = n.getStore("persist-path", t.persist), _ = m ? n.getStore("path", t.path) : t.path, y = el((h) => {
    s.emit("file-drag-end", h);
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
    emitter: s,
    // storage
    storage: n,
    // localization object
    i18n: Jo(n, d, s, i),
    // modal state
    modal: tr(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: Ke(() => y),
    // http object
    requester: Yo(t.request),
    // active features
    features: u(t.features),
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
    metricUnits: o,
    // human readable file sizes
    filesize: o ? Ms : Vs,
    // show large icons in list view
    compactListView: n.getStore("compact-list-view", !0),
    // persist state
    persist: m,
    // show thumbnails
    showThumbnails: n.getStore("show-thumbnails", t.showThumbnails),
    // file system
    fs: tl(c, _),
    onlyReadFileStore: v
  });
}, ol = { class: "vuefinder__modal-layout__container" }, rl = { class: "vuefinder__modal-layout__content" }, ll = { class: "vuefinder__modal-layout__footer" }, st = {
  __name: "ModalLayout",
  setup(t) {
    const e = O(null), n = le("ServiceContainer");
    return Ee(() => {
      const s = document.querySelector(".v-f-modal input");
      s && s.focus(), at(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768) {
          const o = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: o,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    }), (s, o) => (f(), g("div", {
      class: "vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: o[1] || (o[1] = Tt((a) => l(n).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      o[2] || (o[2] = r("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      r("div", ol, [
        r("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: o[0] || (o[0] = kt((a) => l(n).modal.close(), ["self"]))
        }, [
          r("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            r("div", rl, [
              Ot(s.$slots, "default")
            ]),
            r("div", ll, [
              Ot(s.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}, al = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [s, o] of e)
    n[s] = o;
  return n;
}, il = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const s = le("ServiceContainer"), o = O(!1), { t: a } = s.i18n;
    let i = null;
    const d = () => {
      clearTimeout(i), o.value = !0, i = setTimeout(() => {
        o.value = !1;
      }, 2e3);
    };
    return Ee(() => {
      s.emitter.on(t.on, d);
    }), zn(() => {
      clearTimeout(i);
    }), {
      shown: o,
      t: a
    };
  }
}, cl = { key: 1 };
function dl(t, e, n, s, o, a) {
  return f(), g("div", {
    class: ye(["vuefinder__action-message", { "vuefinder__action-message--hidden": !s.shown }])
  }, [
    t.$slots.default ? Ot(t.$slots, "default", { key: 0 }) : (f(), g("span", cl, k(s.t("Saved.")), 1))
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
      r("div", ml, [
        (f(), q(Ts(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      r("h3", pl, k(t.title), 1)
    ]));
  }
}, hl = { class: "vuefinder__about-modal__content" }, gl = { class: "vuefinder__about-modal__main" }, bl = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, wl = ["onClick", "aria-current"], yl = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, kl = { class: "vuefinder__about-modal__description" }, xl = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Sl = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, $l = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, Cl = { class: "vuefinder__about-modal__description" }, El = { class: "vuefinder__about-modal__settings" }, Al = { class: "vuefinder__about-modal__setting flex" }, Tl = { class: "vuefinder__about-modal__setting-input" }, Dl = { class: "vuefinder__about-modal__setting-label" }, Vl = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, Ml = { class: "vuefinder__about-modal__setting flex" }, Ll = { class: "vuefinder__about-modal__setting-input" }, Ol = { class: "vuefinder__about-modal__setting-label" }, Rl = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, Bl = { class: "vuefinder__about-modal__setting flex" }, Il = { class: "vuefinder__about-modal__setting-input" }, Fl = { class: "vuefinder__about-modal__setting-label" }, Hl = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, Nl = { class: "vuefinder__about-modal__setting flex" }, Ul = { class: "vuefinder__about-modal__setting-input" }, Pl = { class: "vuefinder__about-modal__setting-label" }, ql = {
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
    const e = le("ServiceContainer"), { setStore: n, clearStore: s } = e.storage, { t: o } = e.i18n, a = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, i = Ke(() => [
      { name: o("About"), key: a.ABOUT },
      { name: o("Settings"), key: a.SETTINGS },
      { name: o("Shortcuts"), key: a.SHORTCUTS },
      { name: o("Reset"), key: a.RESET }
    ]), d = O("about"), c = async () => {
      s(), location.reload();
    }, v = ($) => {
      e.theme.set($), e.emitter.emit("vf-theme-saved");
    }, u = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? Ms : Vs, n("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, m = () => {
      e.compactListView = !e.compactListView, n("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, _ = () => {
      e.showThumbnails = !e.showThumbnails, n("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, y = () => {
      e.persist = !e.persist, n("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: h } = le("VueFinderOptions"), b = Object.fromEntries(
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
      }).filter(([$]) => Object.keys(h).includes($))
    ), E = Ke(() => ({
      system: o("System"),
      light: o("Light"),
      dark: o("Dark")
    }));
    return ($, w) => (f(), q(st, null, {
      buttons: ee(() => [
        r("button", {
          type: "button",
          onClick: w[7] || (w[7] = (S) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, k(l(o)("Close")), 1)
      ]),
      default: ee(() => [
        r("div", hl, [
          j(vt, {
            icon: l(fl),
            title: "Vuefinder " + l(e).version
          }, null, 8, ["icon", "title"]),
          r("div", gl, [
            r("div", null, [
              r("div", null, [
                r("nav", bl, [
                  (f(!0), g($e, null, Ce(i.value, (S) => (f(), g("button", {
                    key: S.name,
                    onClick: (I) => d.value = S.key,
                    class: ye([S.key === d.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": S.current ? "page" : void 0
                  }, k(S.name), 11, wl))), 128))
                ])
              ])
            ]),
            d.value === a.ABOUT ? (f(), g("div", yl, [
              r("div", kl, k(l(o)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              r("a", xl, k(l(o)("Project home")), 1),
              r("a", Sl, k(l(o)("Follow on GitHub")), 1)
            ])) : F("", !0),
            d.value === a.SETTINGS ? (f(), g("div", $l, [
              r("div", Cl, k(l(o)("Customize your experience with the following settings")), 1),
              r("div", El, [
                r("fieldset", null, [
                  r("div", Al, [
                    r("div", Tl, [
                      de(r("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        "onUpdate:modelValue": w[0] || (w[0] = (S) => l(e).metricUnits = S),
                        onClick: u,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [qt, l(e).metricUnits]
                      ])
                    ]),
                    r("div", Dl, [
                      r("label", Vl, [
                        K(k(l(o)("Use Metric Units")) + " ", 1),
                        j(pt, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: ee(() => [
                            K(k(l(o)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  r("div", Ml, [
                    r("div", Ll, [
                      de(r("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        "onUpdate:modelValue": w[1] || (w[1] = (S) => l(e).compactListView = S),
                        onClick: m,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [qt, l(e).compactListView]
                      ])
                    ]),
                    r("div", Ol, [
                      r("label", Rl, [
                        K(k(l(o)("Compact list view")) + " ", 1),
                        j(pt, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: ee(() => [
                            K(k(l(o)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  r("div", Bl, [
                    r("div", Il, [
                      de(r("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        "onUpdate:modelValue": w[2] || (w[2] = (S) => l(e).persist = S),
                        onClick: y,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [qt, l(e).persist]
                      ])
                    ]),
                    r("div", Fl, [
                      r("label", Hl, [
                        K(k(l(o)("Persist path on reload")) + " ", 1),
                        j(pt, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: ee(() => [
                            K(k(l(o)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  r("div", Nl, [
                    r("div", Ul, [
                      de(r("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        "onUpdate:modelValue": w[3] || (w[3] = (S) => l(e).showThumbnails = S),
                        onClick: _,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [qt, l(e).showThumbnails]
                      ])
                    ]),
                    r("div", Pl, [
                      r("label", ql, [
                        K(k(l(o)("Show thumbnails")) + " ", 1),
                        j(pt, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: ee(() => [
                            K(k(l(o)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  r("div", zl, [
                    r("div", Gl, [
                      r("label", jl, k(l(o)("Theme")), 1)
                    ]),
                    r("div", Wl, [
                      de(r("select", {
                        id: "theme",
                        "onUpdate:modelValue": w[4] || (w[4] = (S) => l(e).theme.value = S),
                        onChange: w[5] || (w[5] = (S) => v(S.target.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        r("optgroup", {
                          label: l(o)("Theme")
                        }, [
                          (f(!0), g($e, null, Ce(E.value, (S, I) => (f(), g("option", { value: I }, k(S), 9, Kl))), 256))
                        ], 8, Yl)
                      ], 544), [
                        [An, l(e).theme.value]
                      ]),
                      j(pt, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: ee(() => [
                          K(k(l(o)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  l(e).features.includes(l(fe).LANGUAGE) && Object.keys(l(b)).length > 1 ? (f(), g("div", Xl, [
                    r("div", Jl, [
                      r("label", Ql, k(l(o)("Language")), 1)
                    ]),
                    r("div", Zl, [
                      de(r("select", {
                        id: "language",
                        "onUpdate:modelValue": w[6] || (w[6] = (S) => l(e).i18n.locale = S),
                        class: "vuefinder__about-modal__select"
                      }, [
                        r("optgroup", {
                          label: l(o)("Language")
                        }, [
                          (f(!0), g($e, null, Ce(l(b), (S, I) => (f(), g("option", { value: I }, k(S), 9, ta))), 256))
                        ], 8, ea)
                      ], 512), [
                        [An, l(e).i18n.locale]
                      ]),
                      j(pt, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: ee(() => [
                          K(k(l(o)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : F("", !0)
                ])
              ])
            ])) : F("", !0),
            d.value === a.SHORTCUTS ? (f(), g("div", na, [
              r("div", sa, [
                r("div", oa, [
                  r("div", null, k(l(o)("Rename")), 1),
                  w[8] || (w[8] = r("kbd", null, "F2", -1))
                ]),
                r("div", ra, [
                  r("div", null, k(l(o)("Refresh")), 1),
                  w[9] || (w[9] = r("kbd", null, "F5", -1))
                ]),
                r("div", la, [
                  K(k(l(o)("Delete")) + " ", 1),
                  w[10] || (w[10] = r("kbd", null, "Del", -1))
                ]),
                r("div", aa, [
                  K(k(l(o)("Escape")) + " ", 1),
                  w[11] || (w[11] = r("div", null, [
                    r("kbd", null, "Esc")
                  ], -1))
                ]),
                r("div", ia, [
                  K(k(l(o)("Select All")) + " ", 1),
                  w[12] || (w[12] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    K(" + "),
                    r("kbd", null, "A")
                  ], -1))
                ]),
                r("div", ca, [
                  K(k(l(o)("Search")) + " ", 1),
                  w[13] || (w[13] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    K(" + "),
                    r("kbd", null, "F")
                  ], -1))
                ]),
                r("div", da, [
                  K(k(l(o)("Toggle Sidebar")) + " ", 1),
                  w[14] || (w[14] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    K(" + "),
                    r("kbd", null, "E")
                  ], -1))
                ]),
                r("div", ua, [
                  K(k(l(o)("Open Settings")) + " ", 1),
                  w[15] || (w[15] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    K(" + "),
                    r("kbd", null, ",")
                  ], -1))
                ]),
                r("div", va, [
                  K(k(l(o)("Toggle Full Screen")) + " ", 1),
                  w[16] || (w[16] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    K(" + "),
                    r("kbd", null, "Enter")
                  ], -1))
                ])
              ])
            ])) : F("", !0),
            d.value === a.RESET ? (f(), g("div", fa, [
              r("div", _a, k(l(o)("Reset all settings to default")), 1),
              r("button", {
                onClick: c,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, k(l(o)("Reset Settings")), 1)
            ])) : F("", !0)
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
    const n = e, s = le("ServiceContainer"), { t: o } = s.i18n, a = O(!1), i = O(null), d = O((v = i.value) == null ? void 0 : v.strMessage);
    Oe(d, () => a.value = !1);
    const c = () => {
      n("hidden"), a.value = !0;
    };
    return (u, m) => (f(), g("div", null, [
      a.value ? F("", !0) : (f(), g("div", {
        key: 0,
        ref_key: "strMessage",
        ref: i,
        class: ye(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Ot(u.$slots, "default"),
        r("div", {
          class: "vuefinder__message__close",
          onClick: c,
          title: l(o)("Close")
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
    r("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ]));
}
const ba = { render: ga }, wa = { class: "vuefinder__rename-modal__content" }, ya = { class: "vuefinder__rename-modal__item" }, ka = { class: "vuefinder__rename-modal__item-info" }, xa = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Sa = {
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
    const e = le("ServiceContainer"), { t: n } = e.i18n, s = O(e.modal.data.items[0]), o = O(e.modal.data.items[0].basename), a = O(""), i = () => {
      o.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: s.value.path,
          name: o.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is renamed.", o.value) });
        },
        onError: (d) => {
          a.value = n(d.message);
        }
      });
    };
    return (d, c) => (f(), q(st, null, {
      buttons: ee(() => [
        r("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, k(l(n)("Rename")), 1),
        r("button", {
          type: "button",
          onClick: c[2] || (c[2] = (v) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, k(l(n)("Cancel")), 1)
      ]),
      default: ee(() => [
        r("div", null, [
          j(vt, {
            icon: l(ba),
            title: l(n)("Rename")
          }, null, 8, ["icon", "title"]),
          r("div", wa, [
            r("div", ya, [
              r("p", ka, [
                s.value.type === "dir" ? (f(), g("svg", xa, c[3] || (c[3] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (f(), g("svg", Sa, c[4] || (c[4] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                r("span", $a, k(s.value.basename), 1)
              ]),
              de(r("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (v) => o.value = v),
                onKeyup: Tt(i, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Dt, o.value]
              ]),
              a.value.length ? (f(), q(ot, {
                key: 0,
                onHidden: c[1] || (c[1] = (v) => a.value = ""),
                error: ""
              }, {
                default: ee(() => [
                  K(k(a.value), 1)
                ]),
                _: 1
              })) : F("", !0)
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
    r("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ]));
}
const yo = { render: Ta }, Da = { class: "vuefinder__new-folder-modal__content" }, Va = { class: "vuefinder__new-folder-modal__form" }, Ma = { class: "vuefinder__new-folder-modal__description" }, La = ["placeholder"], ko = {
  __name: "ModalNewFolder",
  setup(t) {
    const e = le("ServiceContainer");
    e.storage;
    const { t: n } = e.i18n, s = O(""), o = O(""), a = () => {
      s.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfolder",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          name: s.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is created.", s.value) });
        },
        onError: (i) => {
          o.value = n(i.message);
        }
      });
    };
    return (i, d) => (f(), q(st, null, {
      buttons: ee(() => [
        r("button", {
          type: "button",
          onClick: a,
          class: "vf-btn vf-btn-primary"
        }, k(l(n)("Create")), 1),
        r("button", {
          type: "button",
          onClick: d[2] || (d[2] = (c) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, k(l(n)("Cancel")), 1)
      ]),
      default: ee(() => [
        r("div", null, [
          j(vt, {
            icon: l(yo),
            title: l(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          r("div", Da, [
            r("div", Va, [
              r("p", Ma, k(l(n)("Create a new folder")), 1),
              de(r("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (c) => s.value = c),
                onKeyup: Tt(a, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: l(n)("Folder Name"),
                type: "text"
              }, null, 40, La), [
                [Dt, s.value]
              ]),
              o.value.length ? (f(), q(ot, {
                key: 0,
                onHidden: d[1] || (d[1] = (c) => o.value = ""),
                error: ""
              }, {
                default: ee(() => [
                  K(k(o.value), 1)
                ]),
                _: 1
              })) : F("", !0)
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
    r("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ]));
}
const xo = { render: Ra }, Ba = { class: "vuefinder__new-file-modal__content" }, Ia = { class: "vuefinder__new-file-modal__form" }, Fa = { class: "vuefinder__new-file-modal__description" }, Ha = ["placeholder"], Na = {
  __name: "ModalNewFile",
  setup(t) {
    const e = le("ServiceContainer");
    e.storage;
    const { t: n } = e.i18n, s = O(""), o = O(""), a = () => {
      s.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfile",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          name: s.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is created.", s.value) });
        },
        onError: (i) => {
          o.value = n(i.message);
        }
      });
    };
    return (i, d) => (f(), q(st, null, {
      buttons: ee(() => [
        r("button", {
          type: "button",
          onClick: a,
          class: "vf-btn vf-btn-primary"
        }, k(l(n)("Create")), 1),
        r("button", {
          type: "button",
          onClick: d[2] || (d[2] = (c) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, k(l(n)("Cancel")), 1)
      ]),
      default: ee(() => [
        r("div", null, [
          j(vt, {
            icon: l(xo),
            title: l(n)("New File")
          }, null, 8, ["icon", "title"]),
          r("div", Ba, [
            r("div", Ia, [
              r("p", Fa, k(l(n)("Create a new file")), 1),
              de(r("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (c) => s.value = c),
                onKeyup: Tt(a, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: l(n)("File Name"),
                type: "text"
              }, null, 40, Ha), [
                [Dt, s.value]
              ]),
              o.value.length ? (f(), q(ot, {
                key: 0,
                onHidden: d[1] || (d[1] = (c) => o.value = ""),
                error: ""
              }, {
                default: ee(() => [
                  K(k(o.value), 1)
                ]),
                _: 1
              })) : F("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
};
function $s(t, e = 10) {
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
function Pa(t, e) {
  return f(), g("svg", Ua, e[0] || (e[0] = [
    r("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ]));
}
const qa = { render: Pa }, za = { class: "vuefinder__unarchive-modal__content" }, Ga = { class: "vuefinder__unarchive-modal__items" }, ja = { class: "vuefinder__unarchive-modal__item" }, Wa = {
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
    const e = le("ServiceContainer"), { t: n } = e.i18n, s = O(e.modal.data.items[0]), o = O(""), a = O([]), i = () => {
      e.emitter.emit("vf-fetch", {
        params: {
          q: "unarchive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: s.value.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("The file unarchived.") });
        },
        onError: (d) => {
          o.value = n(d.message);
        }
      });
    };
    return (d, c) => (f(), q(st, null, {
      buttons: ee(() => [
        r("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, k(l(n)("Unarchive")), 1),
        r("button", {
          type: "button",
          onClick: c[1] || (c[1] = (v) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, k(l(n)("Cancel")), 1)
      ]),
      default: ee(() => [
        r("div", null, [
          j(vt, {
            icon: l(qa),
            title: l(n)("Unarchive")
          }, null, 8, ["icon", "title"]),
          r("div", za, [
            r("div", Ga, [
              (f(!0), g($e, null, Ce(a.value, (v) => (f(), g("p", ja, [
                v.type === "dir" ? (f(), g("svg", Wa, c[2] || (c[2] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (f(), g("svg", Ya, c[3] || (c[3] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                r("span", Ka, k(v.basename), 1)
              ]))), 256)),
              r("p", Xa, k(l(n)("The archive will be unarchived at")) + " (" + k(l(e).fs.data.dirname) + ")", 1),
              o.value.length ? (f(), q(ot, {
                key: 0,
                onHidden: c[0] || (c[0] = (v) => o.value = ""),
                error: ""
              }, {
                default: ee(() => [
                  K(k(o.value), 1)
                ]),
                _: 1
              })) : F("", !0)
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
    r("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
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
    const e = le("ServiceContainer"), { t: n } = e.i18n, s = O(""), o = O(""), a = O(e.modal.data.items), i = () => {
      a.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: a.value.map(({ path: d, type: c }) => ({ path: d, type: c })),
          name: s.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("The file(s) archived.") });
        },
        onError: (d) => {
          o.value = n(d.message);
        }
      });
    };
    return (d, c) => (f(), q(st, null, {
      buttons: ee(() => [
        r("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, k(l(n)("Archive")), 1),
        r("button", {
          type: "button",
          onClick: c[2] || (c[2] = (v) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, k(l(n)("Cancel")), 1)
      ]),
      default: ee(() => [
        r("div", null, [
          j(vt, {
            icon: l(ei),
            title: l(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          r("div", ti, [
            r("div", ni, [
              r("div", si, [
                (f(!0), g($e, null, Ce(a.value, (v) => (f(), g("p", oi, [
                  v.type === "dir" ? (f(), g("svg", ri, c[3] || (c[3] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (f(), g("svg", li, c[4] || (c[4] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  r("span", ai, k(v.basename), 1)
                ]))), 256))
              ]),
              de(r("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (v) => s.value = v),
                onKeyup: Tt(i, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: l(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, ii), [
                [Dt, s.value]
              ]),
              o.value.length ? (f(), q(ot, {
                key: 0,
                onHidden: c[1] || (c[1] = (v) => o.value = ""),
                error: ""
              }, {
                default: ee(() => [
                  K(k(o.value), 1)
                ]),
                _: 1
              })) : F("", !0)
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
const ts = { render: ui }, vi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function fi(t, e) {
  return f(), g("svg", vi, e[0] || (e[0] = [
    r("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
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
    r("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
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
    r("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
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
    r("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ]));
}
const xi = { render: ki }, Si = { class: "vuefinder__toolbar" }, $i = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, Ci = ["title"], Ei = ["title"];
const Ai = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, Ti = { class: "pl-2" }, Di = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Vi = { class: "vuefinder__toolbar__controls" }, Mi = ["title"], Li = ["title"], Oi = {
  __name: "Toolbar",
  setup(t) {
    const e = le("ServiceContainer"), { setStore: n } = e.storage, { t: s } = e.i18n, o = e.dragSelect, a = O(""), i = O([]), d = Ke(() => i.value.some((u) => u.onlyRead));
    e.emitter.on("vf-context-selected", (u) => {
      i.value = u;
    }), e.emitter.on("vf-contextmenu-show", ({ event: u, items: m, target: _ = null }) => {
      console.log(_);
    }), e.emitter.on("vf-search-query", ({ newQuery: u }) => {
      a.value = u;
    });
    const c = () => {
      e.fullScreen = !e.fullScreen;
    };
    Oe(() => e.fullScreen, () => {
      e.fullScreen ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "", n("full-screen", e.fullScreen), e.emitter.emit("vf-fullscreen-toggle");
    });
    const v = () => {
      e.view = e.view === "list" ? "grid" : "list", o.refreshSelection(), n("viewport", e.view);
    };
    return (u, m) => (f(), g("div", Si, [
      a.value.length ? (f(), g("div", Ai, [
        r("div", Ti, [
          K(k(l(s)("Search results for")) + " ", 1),
          r("span", Di, k(a.value), 1)
        ]),
        l(e).fs.loading ? (f(), q(l(ts), { key: 0 })) : F("", !0)
      ])) : (f(), g("div", $i, [
        l(e).features.includes(l(fe).NEW_FOLDER) ? (f(), g("div", {
          key: 0,
          class: "mx-1.5",
          title: l(s)("New Folder"),
          onClick: m[0] || (m[0] = (_) => l(e).modal.open(ko, { items: l(o).getSelected() }))
        }, [
          j(l(yo))
        ], 8, Ci)) : F("", !0),
        l(e).features.includes(l(fe).NEW_FILE) ? (f(), g("div", {
          key: 1,
          class: "mx-1.5",
          title: l(s)("New File"),
          onClick: m[1] || (m[1] = (_) => l(e).modal.open(Na, { items: l(o).getSelected() }))
        }, [
          j(l(xo))
        ], 8, Ei)) : F("", !0),
        (l(e).features.includes(l(fe).RENAME), F("", !0)),
        (l(e).features.includes(l(fe).DELETE), F("", !0)),
        (l(e).features.includes(l(fe).UPLOAD), F("", !0)),
        (l(e).features.includes(l(fe).UNARCHIVE) && l(o).getCount() === 1 && l(o).getSelected()[0].mime_type, F("", !0)),
        (l(e).features.includes(l(fe).ARCHIVE), F("", !0))
      ])),
      r("div", Vi, [
        l(e).features.includes(l(fe).FULL_SCREEN) ? (f(), g("div", {
          key: 0,
          onClick: c,
          class: "mx-1.5",
          title: l(s)("Toggle Full Screen")
        }, [
          l(e).fullScreen ? (f(), q(l(hi), { key: 0 })) : (f(), q(l(_i), { key: 1 }))
        ], 8, Mi)) : F("", !0),
        r("div", {
          class: "mx-1.5",
          title: l(s)("Change View"),
          onClick: m[7] || (m[7] = (_) => a.value.length || v())
        }, [
          l(e).view === "grid" ? (f(), q(l(wi), {
            key: 0,
            class: ye(["vf-toolbar-icon", a.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : F("", !0),
          l(e).view === "list" ? (f(), q(l(xi), {
            key: 1,
            class: ye(["vf-toolbar-icon", a.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : F("", !0)
        ], 8, Li)
      ])
    ]));
  }
}, Ri = (t, e = 0, n = !1) => {
  let s;
  return (...o) => {
    n && !s && t(...o), clearTimeout(s), s = setTimeout(() => {
      t(...o);
    }, e);
  };
}, Cs = (t, e, n) => {
  const s = O(t);
  return Bo((o, a) => ({
    get() {
      return o(), s.value;
    },
    set: Ri(
      (i) => {
        s.value = i, a();
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
function Ii(t, e) {
  return f(), g("svg", Bi, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ]));
}
const Fi = { render: Ii }, Hi = { class: "vuefinder__move-modal__content" }, Ni = { class: "vuefinder__move-modal__description" }, Ui = { class: "vuefinder__move-modal__files vf-scrollbar" }, Pi = { class: "vuefinder__move-modal__file" }, qi = {
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
}, Gi = { class: "vuefinder__move-modal__file-name" }, ji = { class: "vuefinder__move-modal__target-title" }, Wi = { class: "vuefinder__move-modal__target-directory" }, Yi = { class: "vuefinder__move-modal__target-path" }, Ki = { class: "vuefinder__move-modal__selected-items" }, qn = {
  __name: "ModalMove",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, s = O(e.modal.data.items.from), o = O(""), a = () => {
      s.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "move",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: s.value.map(({ path: i, type: d }) => ({ path: i, type: d })),
          item: e.modal.data.items.to.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("Files moved.", e.modal.data.items.to.name) });
        },
        onError: (i) => {
          o.value = n(i.message);
        }
      });
    };
    return (i, d) => (f(), q(st, null, {
      buttons: ee(() => [
        r("button", {
          type: "button",
          onClick: a,
          class: "vf-btn vf-btn-primary"
        }, k(l(n)("Yes, Move!")), 1),
        r("button", {
          type: "button",
          onClick: d[1] || (d[1] = (c) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, k(l(n)("Cancel")), 1),
        r("div", Ki, k(l(n)("%s item(s) selected.", s.value.length)), 1)
      ]),
      default: ee(() => [
        r("div", null, [
          j(vt, {
            icon: l(Fi),
            title: l(n)("Move files")
          }, null, 8, ["icon", "title"]),
          r("div", Hi, [
            r("p", Ni, k(l(n)("Are you sure you want to move these files?")), 1),
            r("div", Ui, [
              (f(!0), g($e, null, Ce(s.value, (c) => (f(), g("div", Pi, [
                r("div", null, [
                  c.type === "dir" ? (f(), g("svg", qi, d[2] || (d[2] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (f(), g("svg", zi, d[3] || (d[3] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])))
                ]),
                r("div", Gi, k(c.path), 1)
              ]))), 256))
            ]),
            r("h4", ji, k(l(n)("Target Directory")), 1),
            r("p", Wi, [
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
              r("span", Yi, k(l(e).modal.data.items.to.path), 1)
            ]),
            o.value.length ? (f(), q(ot, {
              key: 0,
              onHidden: d[0] || (d[0] = (c) => o.value = ""),
              error: ""
            }, {
              default: ee(() => [
                K(k(o.value), 1)
              ]),
              _: 1
            })) : F("", !0)
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
    r("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
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
    r("path", {
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
    r("path", {
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
    r("path", {
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
    r("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
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
    r("path", {
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
    r("path", {
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
    r("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ]));
}
const gc = { render: hc }, bc = {
  class: "vuefinder__breadcrumb__container",
  style: { padding: "1px" }
}, wc = ["title"], yc = ["title"], kc = ["title"], xc = { class: "vuefinder__breadcrumb__list" }, Sc = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, $c = { class: "relative" }, Cc = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], Ec = { class: "vuefinder__breadcrumb__search-mode" }, Ac = ["placeholder"], Tc = { class: "vuefinder__breadcrumb__hidden-dropdown" }, Dc = ["onDrop", "onClick"], Vc = { class: "vuefinder__breadcrumb__hidden-item-content" }, Mc = { class: "vuefinder__breadcrumb__hidden-item-text" }, Lc = {
  __name: "Breadcrumb",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, s = e.dragSelect, { setStore: o } = e.storage, a = O(null), i = Cs(0, 100);
    Oe(i, (C) => {
      const x = a.value.children;
      let V = 0, L = 0, A = 5, U = 1;
      e.fs.limitBreadcrumbItems(A), at(() => {
        for (let B = x.length - 1; B >= 0 && !(V + x[B].offsetWidth > i.value - 40); B--)
          V += parseInt(x[B].offsetWidth, 10), L++;
        L < U && (L = U), L > A && (L = A), e.fs.limitBreadcrumbItems(L);
      });
    });
    const d = () => {
      i.value = a.value.offsetWidth;
    };
    let c = O(null);
    Ee(() => {
      c.value = new ResizeObserver(d), c.value.observe(a.value);
    }), zn(() => {
      c.value.disconnect();
    });
    const v = (C, x = null) => {
      C.preventDefault(), s.isDraggingRef.value = !1, _(C), x ?? (x = e.fs.hiddenBreadcrumbs.length - 1);
      let V = JSON.parse(C.dataTransfer.getData("items"));
      if (V.find((L) => L.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(qn, {
        items: {
          from: V,
          to: e.fs.hiddenBreadcrumbs[x] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, u = (C, x = null) => {
      C.preventDefault(), s.isDraggingRef.value = !1, _(C), x ?? (x = e.fs.breadcrumbs.length - 2);
      let V = JSON.parse(C.dataTransfer.getData("items"));
      if (V.find((L) => L.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(qn, {
        items: {
          from: V,
          to: e.fs.breadcrumbs[x] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, m = (C) => {
      C.preventDefault(), e.fs.isGoUpAvailable() ? (C.dataTransfer.dropEffect = "copy", C.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (C.dataTransfer.dropEffect = "none", C.dataTransfer.effectAllowed = "none");
    }, _ = (C) => {
      C.preventDefault(), C.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && C.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, y = () => {
      I(), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    }, h = () => {
      I(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.parentFolderPath
        }
      });
    }, p = (C) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: C.path } }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, b = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, E = {
      mounted(C, x, V, L) {
        C.clickOutsideEvent = function(A) {
          C === A.target || C.contains(A.target) || x.value();
        }, document.body.addEventListener("click", C.clickOutsideEvent);
      },
      beforeUnmount(C, x, V, L) {
        document.body.removeEventListener("click", C.clickOutsideEvent);
      }
    };
    Oe(() => e.showTreeView, (C, x) => {
      C !== x && o("show-tree-view", C);
    });
    const $ = O(null), w = () => {
      e.features.includes(fe.SEARCH) && (e.fs.searchMode = !0, at(() => $.value.focus()));
    }, S = Cs("", 400);
    Oe(S, (C) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: C });
    }), Oe(() => e.fs.searchMode, (C) => {
      C && at(() => $.value.focus());
    });
    const I = () => {
      e.fs.searchMode = !1, S.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      I();
    });
    const H = () => {
      S.value === "" && I();
    };
    return (C, x) => (f(), g("div", bc, [
      F("", !0),
      r("span", {
        title: l(n)("Go up a directory")
      }, [
        j(l(tc), {
          onDragover: x[0] || (x[0] = (V) => m(V)),
          onDragleave: x[1] || (x[1] = (V) => _(V)),
          onDrop: x[2] || (x[2] = (V) => u(V)),
          onClick: h,
          class: ye(l(e).fs.isGoUpAvailable() ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive")
        }, null, 8, ["class"])
      ], 8, wc),
      l(e).fs.loading ? (f(), g("span", {
        key: 2,
        title: l(n)("Cancel")
      }, [
        j(l(oc), {
          onClick: x[3] || (x[3] = (V) => l(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, kc)) : (f(), g("span", {
        key: 1,
        title: l(n)("Refresh")
      }, [
        j(l(Qi), { onClick: y })
      ], 8, yc)),
      de(r("div", {
        onClick: kt(w, ["self"]),
        class: "group vuefinder__breadcrumb__search-container"
      }, [
        r("div", null, [
          j(l(ac), {
            onDragover: x[4] || (x[4] = (V) => m(V)),
            onDragleave: x[5] || (x[5] = (V) => _(V)),
            onDrop: x[6] || (x[6] = (V) => u(V, -1)),
            onClick: x[7] || (x[7] = (V) => l(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: l(e).fs.adapter } }))
          })
        ]),
        r("div", xc, [
          l(e).fs.hiddenBreadcrumbs.length ? de((f(), g("div", Sc, [
            x[13] || (x[13] = r("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            r("div", $c, [
              r("span", {
                onDragenter: x[8] || (x[8] = (V) => l(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: x[9] || (x[9] = (V) => l(e).fs.toggleHiddenBreadcrumbs()),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                j(l(gc), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [E, b]
          ]) : F("", !0)
        ]),
        r("div", {
          ref_key: "breadcrumbContainer",
          ref: a,
          class: "vuefinder__breadcrumb__visible-list",
          onClick: kt(w, ["self"])
        }, [
          (f(!0), g($e, null, Ce(l(e).fs.breadcrumbs, (V, L) => (f(), g("div", { key: L }, [
            x[14] || (x[14] = r("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            r("span", {
              onDragover: (A) => L === l(e).fs.breadcrumbs.length - 1 || m(A),
              onDragleave: (A) => L === l(e).fs.breadcrumbs.length - 1 || _(A),
              onDrop: (A) => L === l(e).fs.breadcrumbs.length - 1 || u(A, L),
              class: "vuefinder__breadcrumb__item",
              title: V.basename,
              onClick: (A) => l(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: l(e).fs.adapter, path: V.path } })
            }, k(V.name), 41, Cc)
          ]))), 128))
        ], 512),
        l(e).fs.loading ? (f(), q(l(ts), { key: 0 })) : F("", !0)
      ], 512), [
        [ze, !l(e).fs.searchMode && !1]
      ]),
      de(r("div", Ec, [
        r("div", null, [
          j(l(dc))
        ]),
        de(r("input", {
          ref_key: "searchInput",
          ref: $,
          onKeydown: Tt(I, ["esc"]),
          onBlur: H,
          "onUpdate:modelValue": x[10] || (x[10] = (V) => Io(S) ? S.value = V : null),
          placeholder: l(n)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, Ac), [
          [Dt, l(S)]
        ]),
        j(l(fc), { onClick: I })
      ], 512), [
        [ze, l(e).fs.searchMode && !1]
      ]),
      de(r("div", Tc, [
        (f(!0), g($e, null, Ce(l(e).fs.hiddenBreadcrumbs, (V, L) => (f(), g("div", {
          key: L,
          onDragover: x[11] || (x[11] = (A) => m(A)),
          onDragleave: x[12] || (x[12] = (A) => _(A)),
          onDrop: (A) => v(A, L),
          onClick: (A) => p(V),
          class: "vuefinder__breadcrumb__hidden-item"
        }, [
          r("div", Vc, [
            r("span", null, [
              j(l(hn), { class: "vuefinder__breadcrumb__hidden-item-icon" })
            ]),
            x[15] || (x[15] = K()),
            r("span", Mc, k(V.name), 1)
          ])
        ], 40, Dc))), 128))
      ], 512), [
        [ze, l(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, So = (t, e = null) => new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), Oc = ["onClick"], Rc = {
  __name: "Toast",
  setup(t) {
    const e = le("ServiceContainer"), { getStore: n } = e.storage, s = O(n("full-screen", !1)), o = O([]), a = (c) => c === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", i = (c) => {
      o.value.splice(c, 1);
    }, d = (c) => {
      let v = o.value.findIndex((u) => u.id === c);
      v !== -1 && i(v);
    };
    return e.emitter.on("vf-toast-clear", () => {
      o.value = [];
    }), e.emitter.on("vf-toast-push", (c) => {
      let v = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      c.id = v, o.value.push(c), setTimeout(() => {
        d(v);
      }, 5e3);
    }), (c, v) => (f(), g("div", {
      class: ye(["vuefinder__toast", s.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      j(Fo, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: ee(() => [
          (f(!0), g($e, null, Ce(o.value, (u, m) => (f(), g("div", {
            key: m,
            onClick: (_) => i(m),
            class: ye(["vuefinder__toast__message", a(u.type)])
          }, k(u.label), 11, Oc))), 128))
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
function Ic(t, e) {
  return f(), g("svg", Bc, e[0] || (e[0] = [
    r("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const Fc = { render: Ic }, Hc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Nc(t, e) {
  return f(), g("svg", Hc, e[0] || (e[0] = [
    r("path", {
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
      t.direction === "asc" ? (f(), q(l(Fc), { key: 0 })) : F("", !0),
      t.direction === "desc" ? (f(), q(l(Uc), { key: 1 })) : F("", !0)
    ]));
  }
}, Pc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
};
function qc(t, e) {
  return f(), g("svg", Pc, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ]));
}
const zc = { render: qc }, Gc = { class: "vuefinder__item-icon" }, Cn = {
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
      t.type === "dir" ? (f(), q(l(hn), {
        key: 0,
        class: ye(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"])) : (f(), q(l(zc), {
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
    r("path", {
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
    return (n, s) => (f(), g("div", Kc, [
      j(l(Yc)),
      r("div", Xc, k(e.count), 1)
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
    r("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ]));
}
const $o = { render: Zc }, ed = ["data-type", "data-item", "data-index"], En = {
  __name: "Item",
  props: {
    item: { type: Object },
    index: { type: Number },
    dragImage: { type: Object },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["open"],
  setup(t, { emit: e }) {
    const n = le("ServiceContainer"), s = n.dragSelect, o = t, a = (p) => {
      o.disabled || (p.type === "dir" ? (n.emitter.emit("vf-search-exit"), n.emitter.emit("vf-fetch", { params: { q: "index", adapter: n.fs.adapter, path: p.path } })) : n.emitter.emit("openfile", p));
    }, i = (p, b) => {
      console.log(o.item), !o.disabled && n.emitter.emit("vf-contextmenu-show", { event: p, items: s.getSelected(), target: b });
    }, d = {
      mounted(p, b, E, $) {
        E.props.draggable && (p.addEventListener("dragstart", (w) => c(w, b.value)), p.addEventListener("dragover", (w) => u(w, b.value)), p.addEventListener("drop", (w) => v(w, b.value)));
      },
      beforeUnmount(p, b, E, $) {
        E.props.draggable && (p.removeEventListener("dragstart", c), p.removeEventListener("dragover", u), p.removeEventListener("drop", v));
      }
    }, c = (p, b) => {
      if (p.altKey || p.ctrlKey || p.metaKey)
        return p.preventDefault(), !1;
      s.isDraggingRef.value = !0, p.dataTransfer.setDragImage(o.dragImage.$el, 0, 15), p.dataTransfer.effectAllowed = "all", p.dataTransfer.dropEffect = "copy", p.dataTransfer.setData("items", JSON.stringify(s.getSelected()));
    }, v = (p, b) => {
      p.preventDefault(), s.isDraggingRef.value = !1;
      let E = JSON.parse(p.dataTransfer.getData("items"));
      if (E.find(($) => $.storage !== n.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      n.modal.open(qn, { items: { from: E, to: b } });
    }, u = (p, b) => {
      p.preventDefault(), !b || b.type !== "dir" || s.getSelection().find((E) => E === p.currentTarget) ? (p.dataTransfer.dropEffect = "none", p.dataTransfer.effectAllowed = "none") : p.dataTransfer.dropEffect = "copy";
    };
    let m = null, _ = !1;
    const y = () => {
      m && clearTimeout(m);
    }, h = (p) => {
      if (!_)
        _ = !0, setTimeout(() => _ = !1, 300);
      else
        return _ = !1, a(o.item), clearTimeout(m), !1;
      m = setTimeout(() => {
        const b = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: p.target.getBoundingClientRect().x,
          clientY: p.target.getBoundingClientRect().y
        });
        p.target.dispatchEvent(b);
      }, 500);
    };
    return (p, b) => de((f(), g("div", {
      style: on({ opacity: l(s).isDraggingRef.value && l(s).getSelection().find((E) => p.$el === E) ? "0.5 !important" : "" }),
      class: ye(["vuefinder__item", "vf-item-" + l(s).explorerId, t.disabled ? "vuefinder__item--disabled" : ""]),
      "data-type": t.item.type,
      key: t.item.path,
      "data-item": JSON.stringify(t.item),
      "data-index": t.index,
      onDblclick: b[0] || (b[0] = (E) => a(t.item)),
      onTouchstart: b[1] || (b[1] = (E) => h(E)),
      onTouchend: b[2] || (b[2] = (E) => y()),
      onContextmenu: b[3] || (b[3] = kt((E) => i(E, t.item), ["prevent"]))
    }, [
      Ot(p.$slots, "default"),
      l(n).pinnedFolders.find((E) => E.path === t.item.path) ? (f(), q(l($o), {
        key: 0,
        class: "vuefinder__item--pinned"
      })) : F("", !0)
    ], 46, ed)), [
      [d, t.item]
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
}, bd = ["onClick"], wd = {
  __name: "Explorer",
  props: {
    showProcess: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["onAddProcessImageClick"],
  setup(t, { emit: e }) {
    const n = e, s = le("ServiceContainer"), { t: o } = s.i18n, a = (h) => h == null ? void 0 : h.substring(0, 4), i = O(null), d = O(""), c = s.dragSelect;
    let v;
    s.emitter.on("vf-fullscreen-toggle", () => {
      c.area.value.style.height = null;
    }), s.emitter.on("vf-search-query", ({ newQuery: h }) => {
      d.value = h, h ? s.emitter.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: s.fs.adapter,
          path: s.fs.data.dirname,
          filter: h
        },
        onSuccess: (p) => {
          p.files.length || s.emitter.emit("vf-toast-push", { label: o("No search result found.") });
        }
      }) : s.emitter.emit("vf-fetch", { params: { q: "index", adapter: s.fs.adapter, path: s.fs.data.dirname } });
    });
    const u = dt({ active: !1, column: "", order: "" }), m = (h = !0) => {
      let p = [...s.fs.data.files], b = u.column, E = u.order === "asc" ? 1 : -1;
      if (!h)
        return p;
      const $ = (w, S) => typeof w == "string" && typeof S == "string" ? w.toLowerCase().localeCompare(S.toLowerCase()) : w < S ? -1 : w > S ? 1 : 0;
      return u.active && (p = p.slice().sort((w, S) => $(w[b], S[b]) * E)), p;
    }, _ = (h) => {
      u.active && u.column === h ? (u.active = u.order === "asc", u.column = h, u.order = "desc") : (u.active = !0, u.column = h, u.order = "asc");
    }, y = (h) => {
      n("onAddProcessImageClick", h);
    };
    return Ee(() => {
      v = new Go(c.area.value);
    }), As(() => {
      v.update();
    }), Ro(() => {
      v.destroy();
    }), (h, p) => (f(), g("div", td, [
      l(s).view === "list" || d.value.length ? (f(), g("div", nd, [
        r("div", {
          onClick: p[0] || (p[0] = (b) => _("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          K(k(l(o)("Name")) + " ", 1),
          de(j(jt, {
            direction: u.order
          }, null, 8, ["direction"]), [
            [ze, u.active && u.column === "basename"]
          ])
        ]),
        d.value.length ? F("", !0) : (f(), g("div", {
          key: 0,
          onClick: p[1] || (p[1] = (b) => _("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          K(k(l(o)("Size")) + " ", 1),
          de(j(jt, {
            direction: u.order
          }, null, 8, ["direction"]), [
            [ze, u.active && u.column === "file_size"]
          ])
        ])),
        d.value.length ? F("", !0) : (f(), g("div", {
          key: 1,
          onClick: p[2] || (p[2] = (b) => _("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          K(k(l(o)("Date")) + " ", 1),
          de(j(jt, {
            direction: u.order
          }, null, 8, ["direction"]), [
            [ze, u.active && u.column === "last_modified"]
          ])
        ])),
        d.value.length ? (f(), g("div", {
          key: 2,
          onClick: p[3] || (p[3] = (b) => _("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          K(k(l(o)("Filepath")) + " ", 1),
          de(j(jt, {
            direction: u.order
          }, null, 8, ["direction"]), [
            [ze, u.active && u.column === "path"]
          ])
        ])) : F("", !0)
      ])) : F("", !0),
      r("div", sd, [
        j(Jc, {
          ref_key: "dragImage",
          ref: i,
          count: l(c).getCount()
        }, null, 8, ["count"])
      ]),
      r("div", {
        ref: l(c).scrollBarContainer,
        class: ye(["vf-explorer-scrollbar-container vuefinder__explorer__scrollbar-container", [{ "grid-view": l(s).view === "grid" }, { "search-active": d.value.length }]])
      }, [
        r("div", {
          ref: l(c).scrollBar,
          class: "vuefinder__explorer__scrollbar"
        }, null, 512)
      ], 2),
      r("div", {
        ref: l(c).area,
        class: "vuefinder__explorer__selector-area vf-explorer-scrollbar vf-selector-area",
        onContextmenu: p[4] || (p[4] = kt((b) => l(s).emitter.emit("vf-contextmenu-show", { event: b, items: l(c).getSelected() }), ["self", "prevent"]))
      }, [
        d.value.length ? (f(!0), g($e, { key: 0 }, Ce(m(), (b, E) => (f(), q(En, {
          item: b,
          index: E,
          dragImage: i.value,
          class: "vf-item vf-item-list"
        }, {
          default: ee(() => [
            r("div", od, [
              r("div", rd, [
                j(Cn, {
                  type: b.type,
                  small: l(s).compactListView
                }, null, 8, ["type", "small"]),
                r("span", ld, k(b.basename), 1)
              ]),
              r("div", ad, k(b.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : F("", !0),
        l(s).view === "list" && !d.value.length ? (f(!0), g($e, { key: 1 }, Ce(m(), (b, E) => (f(), q(En, {
          item: b,
          index: E,
          dragImage: i.value,
          class: "vf-item vf-item-list",
          draggable: b.onlyRead ? "false" : "true",
          key: b.path
        }, {
          default: ee(() => [
            r("div", id, [
              r("div", cd, [
                j(Cn, {
                  type: b.type,
                  small: l(s).compactListView
                }, null, 8, ["type", "small"]),
                r("span", dd, k(b.basename), 1)
              ]),
              r("div", ud, k(b.file_size ? l(s).filesize(b.file_size) : ""), 1),
              r("div", vd, k(l(So)(b.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage", "draggable"]))), 128)) : F("", !0),
        l(s).view === "grid" && !d.value.length ? (f(!0), g($e, { key: 2 }, Ce(m(!1), (b, E) => (f(), q(En, {
          item: b,
          index: E,
          dragImage: i.value,
          class: "vf-item vf-item-grid",
          disabled: !b.canopt,
          draggable: !b.onlyRead && b.canopt ? "true" : "false"
        }, {
          default: ee(() => [
            r("div", null, [
              r("div", fd, [
                (b.mime_type ?? "").startsWith("image") && l(s).showThumbnails ? (f(), g("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "vuefinder__explorer__item-thumbnail lazy",
                  "data-src": l(s).requester.getPreviewUrl(l(s).fs.adapter, b),
                  alt: b.basename,
                  key: b.path
                }, null, 8, _d)) : (f(), q(Cn, {
                  key: 1,
                  type: b.type
                }, null, 8, ["type"])),
                b.type !== "dir" && b.hasReader ? (f(), g("span", md, " 打开过 ")) : F("", !0),
                b.type !== "dir" ? (f(), g("div", pd, k(a(b.extension)), 1)) : F("", !0)
              ]),
              b.onlyRead ? (f(), g("span", hd, k(l($s)("【只读】" + b.basename)), 1)) : (f(), g("span", gd, k(l($s)(b.basename)), 1)),
              b.type !== "dir" && t.showProcess ? (f(), g("div", {
                key: 2,
                onClick: kt(($) => y(b), ["stop"]),
                class: "vuefinder__explorer__item-add-process-image vuefinder__btn mb-[5px]",
                style: { "margin-left": "10px", "margin-right": "10px" }
              }, " 加工艺图 ", 8, bd)) : F("", !0)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage", "disabled", "draggable"]))), 256)) : F("", !0)
      ], 544),
      j(Rc)
    ]));
  }
}, yd = { class: "vuefinder__text-preview" }, kd = { class: "vuefinder__text-preview__header" }, xd = ["title"], Sd = { class: "vuefinder__text-preview__actions" }, $d = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, Cd = { key: 1 }, Ed = {
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, s = O(""), o = O(""), a = O(null), i = O(!1), d = O(""), c = O(!1), v = le("ServiceContainer"), { t: u } = v.i18n;
    Ee(() => {
      v.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: v.modal.data.adapter, path: v.modal.data.item.path },
        responseType: "text"
      }).then((y) => {
        s.value = y, n("success");
      });
    });
    const m = () => {
      i.value = !i.value, o.value = s.value;
    }, _ = () => {
      d.value = "", c.value = !1, v.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          adapter: v.modal.data.adapter,
          path: v.modal.data.item.path
        },
        body: {
          content: o.value
        },
        responseType: "text"
      }).then((y) => {
        d.value = u("Updated."), s.value = y, n("success"), i.value = !i.value;
      }).catch((y) => {
        d.value = u(y.message), c.value = !0;
      });
    };
    return (y, h) => (f(), g("div", yd, [
      r("div", kd, [
        r("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: l(v).modal.data.item.path
        }, k(l(v).modal.data.item.basename), 9, xd),
        r("div", Sd, [
          i.value ? (f(), g("button", {
            key: 0,
            onClick: _,
            class: "vuefinder__text-preview__save-button"
          }, k(l(u)("Save")), 1)) : F("", !0),
          l(v).features.includes(l(fe).EDIT) ? (f(), g("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: h[0] || (h[0] = (p) => m())
          }, k(i.value ? l(u)("Cancel") : l(u)("Edit")), 1)) : F("", !0)
        ])
      ]),
      r("div", null, [
        i.value ? (f(), g("div", Cd, [
          de(r("textarea", {
            ref_key: "editInput",
            ref: a,
            "onUpdate:modelValue": h[1] || (h[1] = (p) => o.value = p),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Dt, o.value]
          ])
        ])) : (f(), g("pre", $d, k(s.value), 1)),
        d.value.length ? (f(), q(ot, {
          key: 2,
          onHidden: h[2] || (h[2] = (p) => d.value = ""),
          error: c.value
        }, {
          default: ee(() => [
            K(k(d.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : F("", !0)
      ])
    ]));
  }
}, Ad = { class: "vuefinder__image-preview" }, Td = { class: "vuefinder__image-preview__header" }, Dd = ["title"], Vd = { class: "vuefinder__image-preview__actions" }, Md = { class: "vuefinder__image-preview__image-container" }, Ld = ["src"], Od = {
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, s = le("ServiceContainer"), { t: o } = s.i18n, a = O(null), i = O(null), d = O(!1), c = O(""), v = O(!1), u = () => {
      d.value = !d.value, d.value ? i.value = new jo(a.value, {
        crop(_) {
        }
      }) : i.value.destroy();
    }, m = () => {
      i.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (_) => {
          c.value = "", v.value = !1;
          const y = new FormData();
          y.set("file", _), s.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: s.modal.data.adapter,
              path: s.modal.data.item.path
            },
            body: y
          }).then((h) => {
            c.value = o("Updated."), a.value.src = s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item), u(), n("success");
          }).catch((h) => {
            c.value = o(h.message), v.value = !0;
          });
        }
      );
    };
    return Ee(() => {
      n("success");
    }), (_, y) => (f(), g("div", Ad, [
      r("div", Td, [
        r("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: l(s).modal.data.item.path
        }, k(l(s).modal.data.item.basename), 9, Dd),
        r("div", Vd, [
          d.value ? (f(), g("button", {
            key: 0,
            onClick: m,
            class: "vuefinder__image-preview__crop-button"
          }, k(l(o)("Crop")), 1)) : F("", !0),
          l(s).features.includes(l(fe).EDIT) ? (f(), g("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: y[0] || (y[0] = (h) => u())
          }, k(d.value ? l(o)("Cancel") : l(o)("Edit")), 1)) : F("", !0)
        ])
      ]),
      r("div", Md, [
        r("img", {
          ref_key: "image",
          ref: a,
          class: "vuefinder__image-preview__image",
          src: l(s).requester.getPreviewUrl(l(s).modal.data.adapter, l(s).modal.data.item),
          alt: ""
        }, null, 8, Ld)
      ]),
      c.value.length ? (f(), q(ot, {
        key: 0,
        onHidden: y[1] || (y[1] = (h) => c.value = ""),
        error: v.value
      }, {
        default: ee(() => [
          K(k(c.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : F("", !0)
    ]));
  }
}, Rd = { class: "vuefinder__default-preview" }, Bd = { class: "vuefinder__default-preview__header" }, Id = ["title"], Fd = {
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = le("ServiceContainer"), s = e;
    return Ee(() => {
      s("success");
    }), (o, a) => (f(), g("div", Rd, [
      r("div", Bd, [
        r("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: l(n).modal.data.item.path
        }, k(l(n).modal.data.item.basename), 9, Id)
      ]),
      a[0] || (a[0] = r("div", null, null, -1))
    ]));
  }
}, Hd = { class: "vuefinder__video-preview" }, Nd = ["title"], Ud = {
  class: "vuefinder__video-preview__video",
  preload: "",
  controls: ""
}, Pd = ["src"], qd = {
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = le("ServiceContainer"), s = e, o = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Ee(() => {
      s("success");
    }), (a, i) => (f(), g("div", Hd, [
      r("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: l(n).modal.data.item.path
      }, k(l(n).modal.data.item.basename), 9, Nd),
      r("div", null, [
        r("video", Ud, [
          r("source", {
            src: o(),
            type: "video/mp4"
          }, null, 8, Pd),
          i[0] || (i[0] = K(" Your browser does not support the video tag. "))
        ])
      ])
    ]));
  }
}, zd = { class: "vuefinder__audio-preview" }, Gd = ["title"], jd = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, Wd = ["src"], Yd = {
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, s = le("ServiceContainer"), o = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return Ee(() => {
      n("success");
    }), (a, i) => (f(), g("div", zd, [
      r("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: l(s).modal.data.item.path
      }, k(l(s).modal.data.item.basename), 9, Gd),
      r("div", null, [
        r("audio", jd, [
          r("source", {
            src: o(),
            type: "audio/mpeg"
          }, null, 8, Wd),
          i[0] || (i[0] = K(" Your browser does not support the audio element. "))
        ])
      ])
    ]));
  }
}, Kd = { class: "vuefinder__pdf-preview" }, Xd = ["title"], Jd = ["data"], Qd = ["src"], Zd = {
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = le("ServiceContainer"), s = e, o = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Ee(() => {
      s("success");
    }), (a, i) => (f(), g("div", Kd, [
      r("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: l(n).modal.data.item.path
      }, k(l(n).modal.data.item.basename), 9, Xd),
      r("div", null, [
        r("object", {
          class: "vuefinder__pdf-preview__object",
          data: o(),
          type: "application/pdf",
          width: "100%",
          height: "100%"
        }, [
          r("iframe", {
            class: "vuefinder__pdf-preview__iframe",
            src: o(),
            width: "100%",
            height: "100%"
          }, i[0] || (i[0] = [
            r("p", null, [
              K(" Your browser does not support PDFs. "),
              r("a", { href: "https://example.com/test.pdf" }, "Download the PDF"),
              K(". ")
            ], -1)
          ]), 8, Qd)
        ], 8, Jd)
      ])
    ]));
  }
}, eu = { class: "vuefinder__preview-modal__content" }, tu = { key: 0 }, nu = { class: "vuefinder__preview-modal__loading" }, su = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, ou = { class: "vuefinder__preview-modal__details" }, ru = { class: "font-bold" }, lu = { class: "font-bold pl-2" }, au = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, iu = ["download", "href"], cu = {
  __name: "ModalPreview",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, s = O(!1), o = (i) => (e.modal.data.item.mime_type ?? "").startsWith(i), a = e.features.includes(fe.PREVIEW);
    return a || (s.value = !0), (i, d) => (f(), q(st, null, {
      buttons: ee(() => [
        r("button", {
          type: "button",
          onClick: d[6] || (d[6] = (c) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, k(l(n)("Close")), 1),
        l(e).features.includes(l(fe).DOWNLOAD) ? (f(), g("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: l(e).requester.getDownloadUrl(l(e).modal.data.adapter, l(e).modal.data.item),
          href: l(e).requester.getDownloadUrl(l(e).modal.data.adapter, l(e).modal.data.item)
        }, k(l(n)("Download")), 9, iu)) : F("", !0)
      ]),
      default: ee(() => [
        r("div", null, [
          r("div", eu, [
            l(a) ? (f(), g("div", tu, [
              o("text") ? (f(), q(Ed, {
                key: 0,
                onSuccess: d[0] || (d[0] = (c) => s.value = !0)
              })) : o("image") ? (f(), q(Od, {
                key: 1,
                onSuccess: d[1] || (d[1] = (c) => s.value = !0)
              })) : o("video") ? (f(), q(qd, {
                key: 2,
                onSuccess: d[2] || (d[2] = (c) => s.value = !0)
              })) : o("audio") ? (f(), q(Yd, {
                key: 3,
                onSuccess: d[3] || (d[3] = (c) => s.value = !0)
              })) : o("application/pdf") ? (f(), q(Zd, {
                key: 4,
                onSuccess: d[4] || (d[4] = (c) => s.value = !0)
              })) : (f(), q(Fd, {
                key: 5,
                onSuccess: d[5] || (d[5] = (c) => s.value = !0)
              }))
            ])) : F("", !0),
            r("div", nu, [
              s.value === !1 ? (f(), g("div", su, [
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
                r("span", null, k(l(n)("Loading")), 1)
              ])) : F("", !0)
            ])
          ])
        ]),
        r("div", ou, [
          r("div", null, [
            r("span", ru, k(l(n)("File Size")) + ": ", 1),
            K(k(l(e).filesize(l(e).modal.data.item.file_size)), 1)
          ]),
          r("div", null, [
            r("span", lu, k(l(n)("Last Modified")) + ": ", 1),
            K(" " + k(l(So)(l(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        l(e).features.includes(l(fe).DOWNLOAD) ? (f(), g("div", au, [
          r("span", null, k(l(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : F("", !0)
      ]),
      _: 1
    }));
  }
}, du = ["href", "download"], uu = ["onClick"], vu = {
  __name: "ContextMenu",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, s = O(null), o = O([]), a = O(""), i = dt({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), d = Ke(() => i.items.filter((_) => _.key == null || e.features.includes(_.key)));
    e.emitter.on("vf-context-selected", (_) => {
      o.value = _;
    });
    const c = {
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
          e.pinnedFolders = e.pinnedFolders.concat(o.value), e.storage.setStore("pinned-folders", e.pinnedFolders);
        }
      },
      unpinFolder: {
        title: () => n("Unpin Folder"),
        action: () => {
          e.pinnedFolders = e.pinnedFolders.filter((_) => !o.value.find((y) => y.path === _.path)), e.storage.setStore("pinned-folders", e.pinnedFolders);
        }
      },
      delete: {
        key: fe.DELETE,
        title: () => n("Delete"),
        action: () => {
          e.emitter.emit("delete-file", o);
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
        action: () => e.modal.open(cu, { adapter: e.fs.adapter, item: o.value[0] })
      },
      open: {
        title: () => n("Open"),
        action: () => {
          e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", {
            params: {
              q: "index",
              adapter: e.fs.adapter,
              path: o.value[0].path
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
              path: o.value[0].dir
            }
          });
        }
      },
      download: {
        key: fe.DOWNLOAD,
        link: Ke(() => e.requester.getDownloadUrl(e.fs.adapter, o.value[0])),
        title: () => n("Download"),
        action: () => {
        }
      },
      archive: {
        key: fe.ARCHIVE,
        title: () => n("Archive"),
        action: () => e.modal.open(ci, { items: o })
      },
      unarchive: {
        key: fe.UNARCHIVE,
        title: () => n("Unarchive"),
        action: () => e.modal.open(Ja, { items: o })
      },
      rename: {
        key: fe.RENAME,
        title: () => n("Rename"),
        action: () => e.modal.open(Ca, { items: o })
      },
      setAllOnlyRead: {
        key: fe.SETALLONLY,
        title: () => "设置只读/取消",
        action: () => {
          e.onlyReadFileStore.appendItems(o.value.map((_) => ({
            path: _.path,
            type: _.type,
            name: _.name,
            time: Date.now()
          }))), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } }), e.onlyReadFileStore.save();
        }
      }
    }, v = (_) => {
      e.emitter.emit("vf-contextmenu-hide"), _.action();
    };
    e.emitter.on("vf-search-query", ({ newQuery: _ }) => {
      a.value = _;
    });
    const u = (_, y, h) => {
      y.some((p) => p.onlyRead) || o.value.some((p) => p.onlyRead) || _.push(h);
    };
    e.emitter.on("vf-contextmenu-show", ({ event: _, items: y, target: h = null }) => {
      if (i.items = [], a.value)
        if (h)
          i.items.push(c.openDir), e.emitter.emit("vf-context-selected", [h]);
        else
          return;
      else !h && !a.value ? (i.items.push(c.refresh), i.items.push(c.selectAll), i.items.push(c.newfolder), e.emitter.emit("vf-context-selected", [])) : y.length > 1 && y.some((p) => p.path === h.path) ? (i.items.push(c.refresh), u(i.items, [h], c.delete), i.items.push(c.setAllOnlyRead), e.emitter.emit("vf-context-selected", y)) : (h.type === "dir" ? (i.items.push(c.open), i.items.push(c.setAllOnlyRead), e.pinnedFolders.findIndex((p) => p.path === h.path) !== -1 ? i.items.push(c.unpinFolder) : i.items.push(c.pinFolder)) : (i.items.push(c.preview), i.items.push(c.download), i.items.push(c.setAllOnlyRead)), u(i.items, [h], c.rename), u(i.items, [h], c.delete), e.emitter.emit("vf-context-selected", [h]));
      m(_);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const m = (_) => {
      const y = e.dragSelect.area.value, h = e.root.getBoundingClientRect(), p = y.getBoundingClientRect();
      let b = _.clientX - h.left, E = _.clientY - h.top;
      i.active = !0, at(() => {
        var I;
        const $ = (I = s.value) == null ? void 0 : I.getBoundingClientRect();
        let w = ($ == null ? void 0 : $.height) ?? 0, S = ($ == null ? void 0 : $.width) ?? 0;
        b = p.right - _.pageX + window.scrollX < S ? b - S : b, E = p.bottom - _.pageY + window.scrollY < w ? E - w : E, i.positions = {
          left: b + "px",
          top: E + "px"
        };
      });
    };
    return (_, y) => de((f(), g("ul", {
      ref_key: "contextmenu",
      ref: s,
      style: on(i.positions),
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
          onClick: y[0] || (y[0] = (p) => l(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          r("span", null, k(h.title()), 1)
        ], 8, du)) : (f(), g("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (p) => v(h)
        }, [
          r("span", null, k(h.title()), 1)
        ], 8, uu))
      ]))), 128))
    ], 4)), [
      [ze, i.active]
    ]);
  }
}, fu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function _u(t, e) {
  return f(), g("svg", fu, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ]));
}
const Co = { render: _u }, mu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
};
function pu(t, e) {
  return f(), g("svg", mu, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    }, null, -1)
  ]));
}
const hu = { render: pu }, gu = { class: "vuefinder__status-bar__wrapper" }, bu = { class: "vuefinder__status-bar__storage" }, wu = ["title"], yu = { class: "vuefinder__status-bar__storage-icon" }, ku = ["value"], xu = { class: "vuefinder__status-bar__info" }, Su = { key: 0 }, $u = { class: "vuefinder__status-bar__selected-count" }, Cu = { class: "vuefinder__status-bar__actions" }, Eu = ["disabled"], Au = ["title"], Tu = {
  __name: "Statusbar",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, { setStore: s } = e.storage, o = e.dragSelect, a = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter } }), s("adapter", e.fs.adapter);
    }, i = O("");
    e.emitter.on("vf-search-query", ({ newQuery: c }) => {
      i.value = c;
    });
    const d = Ke(() => {
      const c = e.selectButton.multiple ? o.getSelected().length > 0 : o.getSelected().length === 1;
      return e.selectButton.active && c;
    });
    return (c, v) => (f(), g("div", gu, [
      r("div", bu, [
        r("div", {
          class: "vuefinder__status-bar__storage-container",
          title: l(n)("Storage")
        }, [
          r("div", yu, [
            j(l(Co))
          ]),
          de(r("select", {
            "onUpdate:modelValue": v[0] || (v[0] = (u) => l(e).fs.adapter = u),
            onChange: a,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (f(!0), g($e, null, Ce(l(e).fs.data.storages, (u) => (f(), g("option", { value: u }, k(u), 9, ku))), 256))
          ], 544), [
            [An, l(e).fs.adapter]
          ])
        ], 8, wu),
        r("div", xu, [
          i.value.length ? (f(), g("span", Su, k(l(e).fs.data.files.length) + " items found. ", 1)) : F("", !0),
          r("span", $u, k(l(e).dragSelect.getCount() > 0 ? l(n)("%s item(s) selected.", l(e).dragSelect.getCount()) : ""), 1)
        ])
      ]),
      r("div", Cu, [
        l(e).selectButton.active ? (f(), g("button", {
          key: 0,
          class: ye(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: v[1] || (v[1] = (u) => l(e).selectButton.click(l(o).getSelected(), u))
        }, k(l(n)("Select")), 11, Eu)) : F("", !0),
        r("span", {
          class: "vuefinder__status-bar__about",
          title: l(n)("About"),
          onClick: v[2] || (v[2] = (u) => l(e).modal.open(ma))
        }, [
          j(l(hu))
        ], 8, Au)
      ])
    ]));
  }
}, Du = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
};
function Vu(t, e) {
  return f(), g("svg", Du, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ]));
}
const Eo = { render: Vu }, Mu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Lu(t, e) {
  return f(), g("svg", Mu, e[0] || (e[0] = [
    r("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ]));
}
const Ou = { render: Lu }, Ru = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Bu(t, e) {
  return f(), g("svg", Ru, e[0] || (e[0] = [
    r("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M15 12H9M12 9v6" }, null, -1)
  ]));
}
const Ao = { render: Bu }, Iu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Fu(t, e) {
  return f(), g("svg", Iu, e[0] || (e[0] = [
    r("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M9 12h6" }, null, -1)
  ]));
}
const To = { render: Fu };
function Do(t, e) {
  const n = t.findIndex((s) => s.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const Hu = { class: "vuefinder__folder-loader-indicator" }, Nu = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Vo = {
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ Ho({
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
    const s = Ds(t, "modelValue"), o = O(!1);
    Oe(
      () => s.value,
      () => {
        var d;
        return ((d = a()) == null ? void 0 : d.folders.length) || i();
      }
    );
    function a() {
      return n.treeViewData.find((d) => d.path === e.path);
    }
    const i = () => {
      o.value = !0, n.requester.send({
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
        o.value = !1;
      });
    };
    return (d, c) => {
      var v;
      return f(), g("div", Hu, [
        o.value ? (f(), q(l(ts), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--loading"
        })) : (f(), g("div", Nu, [
          s.value && ((v = a()) != null && v.folders.length) ? (f(), q(l(To), {
            key: 0,
            class: "vuefinder__folder-loader-indicator--minus"
          })) : F("", !0),
          s.value ? F("", !0) : (f(), q(l(Ao), {
            key: 1,
            class: "vuefinder__folder-loader-indicator--plus"
          }))
        ]))
      ]);
    };
  }
}, Uu = { class: "vuefinder__treesubfolderlist__item-content" }, Pu = ["onClick"], qu = ["title", "onClick"], zu = { class: "vuefinder__treesubfolderlist__item-icon" }, Gu = { class: "vuefinder__treesubfolderlist__subfolder" }, ju = {
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
    const e = le("ServiceContainer"), n = O([]), s = t, o = O(null);
    Ee(() => {
      s.path === s.adapter + "://" && Xe(o.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const a = Ke(() => {
      var i;
      return ((i = e.treeViewData.find((d) => d.path === s.path)) == null ? void 0 : i.folders) || [];
    });
    return (i, d) => {
      const c = No("TreeSubfolderList", !0);
      return f(), g("ul", {
        ref_key: "parentSubfolderList",
        ref: o,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (f(!0), g($e, null, Ce(a.value, (v, u) => (f(), g("li", {
          key: v.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          r("div", Uu, [
            r("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (m) => n.value[v.path] = !n.value[v.path]
            }, [
              j(Vo, {
                adapter: t.adapter,
                path: v.path,
                modelValue: n.value[v.path],
                "onUpdate:modelValue": (m) => n.value[v.path] = m
              }, null, 8, ["adapter", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, Pu),
            r("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: v.path,
              onClick: (m) => l(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: s.adapter, path: v.path } })
            }, [
              r("div", zu, [
                l(e).fs.path === v.path ? (f(), q(l(Eo), { key: 0 })) : (f(), q(l(hn), { key: 1 }))
              ]),
              r("div", {
                class: ye(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": l(e).fs.path === v.path
                }])
              }, k(v.basename), 3)
            ], 8, qu)
          ]),
          r("div", Gu, [
            de(j(c, {
              adapter: s.adapter,
              path: v.path
            }, null, 8, ["adapter", "path"]), [
              [ze, n.value[v.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}, Wu = { class: "vuefinder__treestorageitem__loader" }, Yu = {
  __name: "TreeStorageItem",
  props: {
    storage: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = le("ServiceContainer"), n = O(!1);
    return (s, o) => (f(), g($e, null, [
      r("div", {
        onClick: o[1] || (o[1] = (a) => n.value = !n.value),
        class: "vuefinder__treestorageitem__header"
      }, [
        r("div", {
          class: ye(["vuefinder__treestorageitem__info", t.storage === l(e).fs.adapter ? "vuefinder__treestorageitem__info--active" : ""])
        }, [
          r("div", {
            class: ye(["vuefinder__treestorageitem__icon", t.storage === l(e).fs.adapter ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            j(l(Co))
          ], 2),
          r("div", null, k(t.storage), 1)
        ], 2),
        r("div", Wu, [
          j(Vo, {
            adapter: t.storage,
            path: t.storage + "://",
            modelValue: n.value,
            "onUpdate:modelValue": o[0] || (o[0] = (a) => n.value = a)
          }, null, 8, ["adapter", "path", "modelValue"])
        ])
      ]),
      de(j(ju, {
        adapter: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["adapter", "path"]), [
        [ze, n.value]
      ])
    ], 64));
  }
}, Ku = { class: "vuefinder__folder-indicator" }, Xu = { class: "vuefinder__folder-indicator--icon" }, Ju = {
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = Ds(t, "modelValue");
    return (n, s) => (f(), g("div", Ku, [
      r("div", Xu, [
        e.value ? (f(), q(l(To), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : F("", !0),
        e.value ? F("", !0) : (f(), q(l(Ao), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}, Qu = { class: "vuefinder__treeview__header" }, Zu = { class: "vuefinder__treeview__pinned-label" }, ev = { class: "vuefinder__treeview__pin-text text-nowrap" }, tv = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, nv = { class: "vuefinder__treeview__pinned-item" }, sv = ["onClick"], ov = ["title"], rv = ["onClick"], lv = { key: 0 }, av = { class: "vuefinder__treeview__no-pinned" }, iv = { class: "vuefinder__treeview__storage" }, cv = {
  __name: "TreeView",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, { getStore: s, setStore: o } = e.storage, a = O(190), i = O(s("pinned-folders-opened", !0));
    Oe(i, (u) => o("pinned-folders-opened", u));
    const d = (u) => {
      e.pinnedFolders = e.pinnedFolders.filter((m) => m.path !== u.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, c = (u) => {
      const m = u.clientX, _ = u.target.parentElement, y = _.getBoundingClientRect().width;
      _.classList.remove("transition-[width]"), _.classList.add("transition-none");
      const h = (b) => {
        a.value = y + b.clientX - m, a.value < 50 && (a.value = 0, e.showTreeView = !1), a.value > 50 && (e.showTreeView = !0);
      }, p = () => {
        const b = _.getBoundingClientRect();
        a.value = b.width, _.classList.add("transition-[width]"), _.classList.remove("transition-none"), window.removeEventListener("mousemove", h), window.removeEventListener("mouseup", p);
      };
      window.addEventListener("mousemove", h), window.addEventListener("mouseup", p);
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
    }), Oe(e.fs.data, (u, m) => {
      const _ = u.files.filter((y) => y.type === "dir");
      Do(e.treeViewData, { path: e.fs.path, folders: _.map((y) => ({
        adapter: y.storage,
        path: y.path,
        basename: y.basename
      })) });
    }), (u, m) => (f(), g($e, null, [
      r("div", {
        onClick: m[0] || (m[0] = (_) => l(e).showTreeView = !l(e).showTreeView),
        class: ye(["vuefinder__treeview__overlay", l(e).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      r("div", {
        style: on(l(e).showTreeView ? "min-width:100px;max-width:75%; width: " + a.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        r("div", {
          ref_key: "treeViewScrollElement",
          ref: v,
          class: "vuefinder__treeview__scroll"
        }, [
          r("div", Qu, [
            r("div", {
              onClick: m[2] || (m[2] = (_) => i.value = !i.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              r("div", Zu, [
                j(l($o), { class: "vuefinder__treeview__pin-icon" }),
                r("div", ev, k(l(n)("Pinned Folders")), 1)
              ]),
              j(Ju, {
                modelValue: i.value,
                "onUpdate:modelValue": m[1] || (m[1] = (_) => i.value = _)
              }, null, 8, ["modelValue"])
            ]),
            i.value ? (f(), g("ul", tv, [
              (f(!0), g($e, null, Ce(l(e).pinnedFolders, (_) => (f(), g("li", nv, [
                r("div", {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (y) => l(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: _.storage, path: _.path } })
                }, [
                  l(e).fs.path !== _.path ? (f(), q(l(hn), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : F("", !0),
                  l(e).fs.path === _.path ? (f(), q(l(Eo), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : F("", !0),
                  r("div", {
                    title: _.path,
                    class: ye(["vuefinder__treeview__folder-name text-nowrap", {
                      "vuefinder__treeview__folder-name--active": l(e).fs.path === _.path
                    }])
                  }, k(_.basename), 11, ov)
                ], 8, sv),
                r("div", {
                  class: "vuefinder__treeview__remove-favorite",
                  onClick: (y) => d(_)
                }, [
                  j(l(Ou), { class: "vuefinder__treeview__remove-icon" })
                ], 8, rv)
              ]))), 256)),
              l(e).pinnedFolders.length ? F("", !0) : (f(), g("li", lv, [
                r("div", av, k(l(n)("No folders pinned")), 1)
              ]))
            ])) : F("", !0)
          ]),
          (f(!0), g($e, null, Ce(l(e).fs.data.storages, (_) => (f(), g("div", iv, [
            j(Yu, { storage: _ }, null, 8, ["storage"])
          ]))), 256))
        ], 512),
        r("div", {
          onMousedown: c,
          class: ye([(l(e).showTreeView, ""), "vuefinder__treeview__resize-handle"])
        }, null, 34)
      ], 4)
    ], 64));
  }
}, dv = { class: "vuefinder__main__content" }, uv = {
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
    },
    // 显示是否显示工艺
    showProcess: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["select", "openFile", "fileDragEnd", "deleteFile", "onAddProcessImageClick"],
  setup(t, { expose: e, emit: n }) {
    const s = n, o = t, a = sl(o, le("VueFinderOptions"));
    Uo("ServiceContainer", a);
    const { setStore: i } = a.storage, d = O(null);
    a.root = d;
    const c = a.dragSelect;
    Ea();
    const v = (h) => {
      h.files = h.files.map((p) => (p.onlyRead = a.onlyReadFileStore.hasItem(p.path), p)), Object.assign(a.fs.data, h), c.clearSelection(), c.refreshSelection();
    };
    let u;
    a.emitter.on("vf-fetch-abort", () => {
      u.abort(), a.fs.loading = !1;
    }), a.emitter.on("vf-fetch", ({ params: h, body: p = null, onSuccess: b = null, onError: E = null, noCloseModal: $ = !1 }) => {
      ["index", "search"].includes(h.q) && (u && u.abort(), a.fs.loading = !0), u = new AbortController();
      const w = u.signal;
      a.requester.send({
        url: "",
        method: h.m || "get",
        params: h,
        body: p,
        abortSignal: w
      }).then((S) => {
        a.fs.adapter = S.adapter, a.persist && (a.fs.path = S.dirname, i("path", a.fs.path)), ["index", "search"].includes(h.q) && (a.fs.loading = !1), $ || a.modal.close(), v(S), b && b(S);
      }).catch((S) => {
        console.error(S), E && E(S);
      });
    });
    const m = () => {
      o.minHeight == "0" || !d.value || (d.value.querySelectorAll(".vuefinder__main__container")[0].style.height = o.minHeight);
    }, _ = () => {
      a.emitter.on("openfile", (h) => {
        s("openFile", h);
      }), a.emitter.on("file-drag-end", (h) => {
        s("fileDragEnd", h);
      }), a.emitter.on("delete-file", (h) => {
        s("deleteFile", h);
      });
    }, y = (h) => {
      s("onAddProcessImageClick", h);
    };
    return Ee(() => {
      let h = {};
      a.fs.path.includes("://") && (h = {
        adapter: a.fs.path.split("://")[0],
        path: a.fs.path
      }), a.emitter.emit("vf-fetch", { params: { q: "index", adapter: a.fs.adapter, ...h } }), c.onSelect((p) => {
        s("select", p);
      }), m(), _();
    }), e({
      app: a
    }), (h, p) => (f(), g("div", {
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
          style: on(l(a).fullScreen ? "" : "max-height: " + t.maxHeight),
          onMousedown: p[0] || (p[0] = (b) => l(a).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: p[1] || (p[1] = (b) => l(a).emitter.emit("vf-contextmenu-hide"))
        }, [
          t.simple ? F("", !0) : (f(), q(Oi, { key: 0 })),
          t.showPath ? (f(), q(Lc, { key: 1 })) : F("", !0),
          r("div", dv, [
            j(cv),
            j(wd, {
              showProcess: t.showProcess,
              onOnAddProcessImageClick: y
            }, null, 8, ["showProcess"])
          ]),
          t.simple ? F("", !0) : (f(), q(Tu, { key: 2 }))
        ], 38),
        j(Po, { name: "fade" }, {
          default: ee(() => [
            l(a).modal.visible ? (f(), q(Ts(l(a).modal.type), { key: 0 })) : F("", !0)
          ]),
          _: 1
        }),
        j(vu)
      ], 2)
    ], 512));
  }
}, xv = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [n] = Object.keys(e.i18n);
    e.locale = e.locale ?? n ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", uv);
  }
};
export {
  xv as default
};
