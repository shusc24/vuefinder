var Mo = Object.defineProperty;
var Lo = (t, e, n) => e in t ? Mo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var ss = (t, e, n) => Lo(t, typeof e != "symbol" ? e + "" : e, n);
import { reactive as dt, watch as Oe, ref as O, shallowRef as Oo, onMounted as Ee, onUnmounted as zn, onUpdated as As, nextTick as at, computed as Ke, inject as le, openBlock as f, createElementBlock as h, withKeys as At, unref as l, createElementVNode as r, withModifiers as Lt, renderSlot as Ot, normalizeClass as ye, toDisplayString as y, createBlock as P, resolveDynamicComponent as Ts, withCtx as ee, createVNode as j, Fragment as $e, renderList as Ce, createCommentVNode as H, withDirectives as de, vModelCheckbox as Pt, createTextVNode as K, vModelSelect as An, vModelText as Tt, onBeforeUnmount as Ro, customRef as Bo, vShow as ze, isRef as Fo, TransitionGroup as Ho, normalizeStyle as on, mergeModels as Io, useModel as Ds, resolveComponent as No, provide as Uo, Transition as qo } from "vue";
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
    i !== "get" && (c instanceof FormData ? (v = c, n.body != null && Object.entries(this.config.body).forEach(([_, u]) => {
      v.append(_, u);
    })) : (v = { ...c }, n.body != null && Object.assign(v, this.config.body)));
    const m = {
      url: d,
      method: i,
      headers: s,
      params: a,
      body: v
    };
    if (n.transformRequest != null) {
      const _ = n.transformRequest({
        url: d,
        method: i,
        headers: s,
        params: a,
        body: v
      });
      _.url != null && (m.url = _.url), _.method != null && (m.method = _.method), _.params != null && (m.params = _.params ?? {}), _.headers != null && (m.headers = _.headers ?? {}), _.body != null && (m.body = _.body);
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
  const { getStore: s, setStore: a } = t, c = O({}), d = O(s("locale", e)), i = (_, u = e) => {
    Xo(_, o).then((p) => {
      c.value = p, a("locale", _), d.value = _, a("translations", p), Object.values(o).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + _ }), n.emit("vf-language-saved"));
    }).catch((p) => {
      u ? (n.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), i(u, null)) : n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  Oe(d, (_) => {
    i(_);
  }), !s("locale") && !o.length ? i(e) : c.value = s("translations");
  const v = (_, ...u) => u.length ? v(_ = _.replace("%s", u.shift()), ...u) : _;
  function m(_, ...u) {
    return c.value && c.value.hasOwnProperty(_) ? v(c.value[_], ...u) : v(_, ...u);
  }
  return dt({ t: m, locale: d });
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
function Ms(t, e, n, o, s) {
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
  const d = (m, _) => {
    const u = a, p = m, w = _ || (o ? !o(u, p) : u !== p);
    return (w || s) && (a = p, c = u), [a, w, c];
  };
  return [e ? (m) => d(e(a, c), m) : d, (m) => [a, !!m, c]];
}, Ls = typeof window < "u" && typeof document < "u", De = Ls ? window : {}, Wt = Math.max, nr = Math.min, Tn = Math.round, Os = De.cancelAnimationFrame, Rs = De.requestAnimationFrame, Xt = De.setTimeout, Dn = De.clearTimeout, rn = (t) => typeof De[t] < "u" ? De[t] : void 0, sr = rn("MutationObserver"), os = rn("IntersectionObserver"), Jt = rn("ResizeObserver"), Vn = rn("ScrollTimeline"), Bs = Ls && Node.ELEMENT_NODE, { toString: or, hasOwnProperty: yn } = Object.prototype, rr = /^\[object (.+)\]$/, Ft = (t) => t === void 0, ln = (t) => t === null, lr = (t) => Ft(t) || ln(t) ? `${t}` : or.call(t).replace(rr, "$1").toLowerCase(), Ge = (t) => typeof t == "number", an = (t) => typeof t == "string", Fs = (t) => typeof t == "boolean", je = (t) => typeof t == "function", Ue = (t) => Array.isArray(t), Rt = (t) => typeof t == "object" && !Ue(t) && !ln(t), cn = (t) => {
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
const un = (t, e) => t.indexOf(e) >= 0, Ye = (t, e) => t.concat(e), _e = (t, e, n) => (!an(e) && cn(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), ut = (t) => Array.from(t || []), Hs = (t) => Ue(t) ? t : [t], Mn = (t) => !!t && !t.length, rs = (t) => ut(new Set(t)), Re = (t, e, n) => {
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
  const { v: c, p: d, S: i } = e || {}, v = function(w) {
    a(), Dn(n), n = o = void 0, a = Ne, t.apply(this, w);
  }, m = (p) => i && o ? i(o, p) : p, _ = () => {
    a !== Ne && v(m(s) || s);
  }, u = function() {
    const w = ut(arguments), b = je(c) ? c() : c;
    if (Ge(b) && b >= 0) {
      const C = je(d) ? d() : d, $ = Ge(C) && C >= 0, g = b > 0 ? Xt : Rs, E = b > 0 ? Dn : Os, I = m(w) || w, x = v.bind(0, I);
      a();
      const k = g(x, b);
      a = () => E(k), $ && !n && (n = Xt(_, C)), o = s = I;
    } else
      v(w);
  };
  return u.m = _, u;
}, Xs = (t, e) => Object.prototype.hasOwnProperty.call(t, e), et = (t) => t ? Object.keys(t) : [], ne = (t, e, n, o, s, a, c) => {
  const d = [e, n, o, s, a, c];
  return (typeof t != "object" || ln(t)) && !je(t) && (t = {}), se(d, (i) => {
    se(i, (v, m) => {
      const _ = i[m];
      if (t === _)
        return !0;
      const u = Ue(_);
      if (_ && Qt(_)) {
        const p = t[m];
        let w = p;
        u && !Ue(p) ? w = [] : !u && !Qt(p) && (w = {}), t[m] = ne(w, _);
      } else
        t[m] = u ? _.slice() : _;
    });
  }), t;
}, Js = (t, e) => se(ne({}, t), (n, o, s) => {
  n === void 0 ? delete s[o] : n && Qt(n) && (s[o] = Js(n));
}), jn = (t) => {
  for (const e in t)
    return !1;
  return !0;
}, Ln = (t, e, n) => Wt(t, nr(e, n)), it = (t) => ut(new Set((Ue(t) ? t : (t || "").split(" ")).filter((e) => e))), _n = (t, e) => t && t.getAttribute(e), ls = (t, e) => t && t.hasAttribute(e), He = (t, e, n) => {
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
} : vr, fr = (t) => pn("inner", t || De), Mt = Y(pn, "offset"), oo = Y(pn, "client"), Fn = Y(pn, "scroll"), Kn = (t) => {
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
    const m = d ? (_) => {
      us(t, v, m, c), n(_);
    } : n;
    return t.addEventListener(v, m, i), Y(us, t, v, m, c);
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
}, nn = (t, e, n) => n ? n.n ? -t + 0 : n.i ? e - t : t : t, fs = (t, e) => [nn(0, t, e), nn(t, t, e)], _s = (t, e, n) => Ln(0, 1, nn(t, e, n) / e || 0), nt = (t, e) => {
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
      return e.set(a, v), ms((m) => {
        je(m) && v.add(m);
      }, c), Y(n, a, c);
    }
    Fs(c) && c && n();
    const d = et(a), i = [];
    return se(d, (v) => {
      const m = a[v];
      m && _e(i, o(v, m));
    }), Y(Re, i);
  }, s = (a, c) => {
    se(ut(e.get(a)), (d) => {
      c && !Mn(c) ? d.apply(0, c) : d();
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
    const m = n ? v(c, d, e) : v(e);
    return (i || _o)[o] = m;
  }
}), Dt = (t) => _o[t], Mr = "__osOptionsValidationPlugin", Lr = "__osSizeObserverPlugin", Or = (t, e) => {
  const { T: n } = e, [o, s] = t("showNativeOverlaidScrollbars");
  return [o && n.x && n.y, s];
}, sn = (t) => t.indexOf(js) === 0, po = (t, e) => {
  const { D: n } = t, o = (i) => {
    const v = ct(n, i), _ = (e ? e[i] : v) === "scroll";
    return [v, _];
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
  const s = e.x || e.y, a = (m, _) => {
    const u = sn(m), p = u && s ? "hidden" : "", w = _ && u && m.replace(`${js}-`, "") || p;
    return [_ && !u ? m : "", sn(w) ? "hidden" : w];
  }, [c, d] = a(n.x, e.x), [i, v] = a(n.y, e.y);
  return o[vn] = d && i ? d : c, o[fn] = v && c ? v : i, po(t, o);
}, Zn = "__osScrollbarsHidingPlugin", Br = "__osClickScrollPlugin";
let $n;
const Fr = () => {
  const t = (g, E, F) => {
    Te(document.body, g), Te(document.body, g);
    const I = oo(g), x = Mt(g), k = Kn(E);
    return F && tt(g), {
      x: x.h - I.h + k.h,
      y: x.w - I.w + k.w
    };
  }, e = (g) => {
    let E = !1;
    const F = en(g, Gt);
    try {
      E = ct(g, "scrollbar-width") === "none" || ct(g, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return F(), E;
  }, n = (g, E) => {
    Ct(g, {
      [vn]: xt,
      [fn]: xt,
      direction: "rtl"
    }), nt(g, {
      x: 0
    });
    const F = Sn(g), I = Sn(E);
    nt(g, {
      x: -999
    });
    const x = Sn(E);
    return {
      i: F.x === I.x,
      n: I.x !== x.x
    };
  }, o = `.${Kt}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Kt} div{width:200%;height:200%;margin:10px 0}.${Gt}{scrollbar-width:none!important}.${Gt}::-webkit-scrollbar,.${Gt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, a = so(`<div class="${Kt}"><div></div><style>${o}</style></div>`)[0], c = a.firstChild, [d, , i] = In(), [v, m] = Ie({
    o: t(a, c),
    u: Ys
  }, Y(t, a, c, !0)), [_] = m(), u = e(a), p = {
    x: _.x === 0,
    y: _.y === 0
  }, w = {
    elements: {
      host: null,
      padding: !u,
      viewport: (g) => u && to(g) && g,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, b = ne({}, mr), S = Y(ne, {}, b), C = Y(ne, {}, w), $ = {
    P: _,
    T: p,
    L: u,
    J: !!Vn,
    K: n(a, c),
    Z: Y(d, "r"),
    G: C,
    tt: (g) => ne(w, g) && C(),
    nt: S,
    ot: (g) => ne(b, g) && S(),
    st: ne({}, w),
    et: ne({}, b)
  };
  return Pe(a, "style"), tt(a), De.addEventListener("resize", () => {
    let g;
    if (!u && (!p.x || !p.y)) {
      const E = Dt(Zn);
      g = !!(E ? E.Y() : Ne)($, v);
    }
    i("r", [g]);
  }), $;
}, Be = () => ($n || ($n = Fr()), $n), ho = (t, e) => je(e) ? e.apply(0, t) : e, Hr = (t, e, n, o) => {
  const s = Ft(o) ? n : o;
  return ho(t, s) || e.apply(0, t);
}, go = (t, e, n, o) => {
  const s = Ft(o) ? n : o, a = ho(t, s);
  return !!a && (Zt(a) ? a : e.apply(0, t));
}, Ir = (t, e) => {
  const { nativeScrollbarsOverlaid: n, body: o } = e || {}, { T: s, L: a, G: c } = Be(), { nativeScrollbarsOverlaid: d, body: i } = c().cancel, v = n ?? d, m = Ft(o) ? i : o, _ = (s.x || s.y) && v, u = t && (ln(m) ? !a : m);
  return !!_ || !!u;
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
        const [m, _] = v || [];
        return [_ && m ? (d || eo)(m, t) : [], _];
      });
      se(i, (v) => se(v[0], (m) => {
        const _ = v[1], u = s.get(m) || [];
        if (t.contains(m) && _) {
          const w = ve(m, _, (b) => {
            o ? (w(), s.delete(m)) : e(b);
          });
          s.set(m, _e(u, w));
        } else
          Re(u), s.delete(m);
      }));
    }
  };
  return c(), [a, c];
}, xs = (t, e, n, o) => {
  let s = !1;
  const { ct: a, rt: c, lt: d, it: i, ut: v, dt: m } = o || {}, _ = Ks(() => s && n(!0), {
    v: 33,
    p: 99
  }), [u, p] = qr(t, _, d), w = a || [], b = c || [], S = Ye(w, b), C = (g, E) => {
    if (!Mn(E)) {
      const F = v || Ne, I = m || Ne, x = [], k = [];
      let V = !1, L = !1;
      if (se(E, (A) => {
        const { attributeName: U, target: B, type: W, oldValue: J, addedNodes: oe, removedNodes: G } = A, Q = W === "attributes", ue = W === "childList", z = t === B, ie = Q && U, ae = ie && _n(B, U || "") || null, ce = ie && J !== ae, ke = un(b, U) && ce;
        if (e && (ue || !z)) {
          const ge = Q && ce, me = ge && i && tn(B, i), M = (me ? !F(B, U, J, ae) : !Q || ge) && !I(A, !!me, t, o);
          se(oe, (D) => _e(x, D)), se(G, (D) => _e(x, D)), L = L || M;
        }
        !e && z && ce && !F(B, U, J, ae) && (_e(k, U), V = V || ke);
      }), p((A) => rs(x).reduce((U, B) => (_e(U, eo(A, B)), tn(B, A) ? _e(U, B) : U), [])), e)
        return !g && L && n(!1), [!1];
      if (!Mn(k) || V) {
        const A = [rs(k), V];
        return !g && n.apply(0, A), A;
      }
    }
  }, $ = new sr(Y(C, !1));
  return [() => ($.observe(t, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: S,
    subtree: e,
    childList: e,
    characterData: e
  }), s = !0, () => {
    s && (u(), $.disconnect(), s = !1);
  }), () => {
    if (s)
      return _.m(), C(!0, $.takeRecords());
  }];
}, wo = (t, e, n) => {
  const { ft: s, _t: a } = n || {}, c = Dt(Lr), { K: d } = Be(), i = Y(Ze, t), [v] = Ie({
    o: !1,
    _: !0
  });
  return () => {
    const m = [], u = so(`<div class="${Jn}"><div class="${yr}"></div></div>`)[0], p = u.firstChild, w = (b) => {
      const S = b instanceof ResizeObserverEntry, C = !S && Ue(b);
      let $ = !1, g = !1, E = !0;
      if (S) {
        const [F, , I] = v(b.contentRect), x = Hn(F), k = ro(F, I);
        g = !I || k, $ = !g && !x, E = !$;
      } else C ? [, E] = b : g = b === !0;
      if (s && E) {
        const F = C ? b[0] : Ze(u);
        nt(u, {
          x: nn(3333333, 3333333, F && d),
          y: 3333333
        });
      }
      $ || e({
        vt: C ? b : void 0,
        ht: !C,
        _t: g
      });
    };
    if (Jt) {
      const b = new Jt((S) => w(S.pop()));
      b.observe(p), _e(m, () => {
        b.disconnect();
      });
    } else if (c) {
      const [b, S] = c(p, w, a);
      _e(m, Ye([en(u, wr), ve(u, "animationstart", b)], S));
    } else
      return Ne;
    if (s) {
      const [b] = Ie({
        o: void 0
      }, i);
      _e(m, ve(u, "scroll", (S) => {
        const C = b(), [$, g, E] = C;
        g && (Wn(p, "ltr rtl"), en(p, $ ? "rtl" : "ltr"), w([!!$, g, E])), Xn(S);
      }));
    }
    return Y(Re, _e(m, Te(t, u)));
  };
}, Pr = (t, e) => {
  let n;
  const o = (i) => i.h === 0 || i.isIntersecting || i.intersectionRatio > 0, s = bt(kr), [a] = Ie({
    o: !1
  }), c = (i, v) => {
    if (i) {
      const m = a(o(i)), [, _] = m;
      return _ && !v && e(m) && [m];
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
        const m = Mt(s);
        c(m);
      };
      _e(i, wo(s, v)()), v();
    }
    return Y(Re, _e(i, Te(t, s)));
  }, () => n && d(!0, n.takeRecords())];
}, zr = (t, e, n, o) => {
  let s, a, c, d, i, v;
  const { L: m } = Be(), _ = `[${Ae}]`, u = `[${We}]`, p = ["tabindex"], w = ["wrap", "cols", "rows"], b = ["id", "class", "style", "open"], { gt: S, bt: C, D: $, wt: g, yt: E, V: F, St: I, $t: x } = t, k = {
    Ot: !1,
    N: Ze(S)
  }, V = Be(), L = Dt(Zn), [A] = Ie({
    u: Ws,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const T = L && L.M(t, e, k, V, n).W, M = I(yt), D = !F && I(gr), R = D && Et($);
    x(yt), F && x(Nn, !0);
    const N = D && T && T()[0], q = Fn(g), Z = Fn($), te = Kn($);
    return x(yt, M), F && x(Nn), N && N(), nt($, R), {
      w: Z.w + q.w + te.w,
      h: Z.h + q.h + te.h
    };
  }), U = E ? w : Ye(b, w), B = Ks(o, {
    v: () => s,
    p: () => a,
    S(T, M) {
      const [D] = T, [R] = M;
      return [Ye(et(D), et(R)).reduce((N, q) => (N[q] = D[q] || R[q], N), {})];
    }
  }), W = (T) => {
    if (F) {
      const M = Ze(S);
      ne(T, {
        Ct: v !== M
      }), ne(k, {
        N: M
      }), v = M;
    }
  }, J = (T) => {
    se(T || p, (M) => {
      if (un(p, M)) {
        const D = _n(C, M);
        an(D) ? He($, M, D) : Pe($, M);
      }
    });
  }, oe = (T, M) => {
    const [D, R] = T, N = {
      xt: R
    };
    return ne(k, {
      Ot: D
    }), !M && o(N), N;
  }, G = ({ ht: T, vt: M, _t: D }) => {
    const N = !(T && !D && !M) && m ? B : o, [q, Z] = M || [], te = {
      ht: T || D,
      _t: D,
      Ct: Z
    };
    W(te), M && ne(k, {
      N: q
    }), N(te);
  }, Q = (T, M) => {
    const [, D] = A(), R = {
      Ht: D
    };
    return W(R), D && !M && (T ? o : B)(R), R;
  }, ue = (T, M, D) => {
    const R = {
      zt: M
    };
    return W(R), M && !D ? B(R) : F || J(T), R;
  }, { Z: z } = V, [ie, ae] = g ? Pr(C, oe) : [], ce = !F && wo(C, G, {
    _t: !0,
    ft: !0
  }), [ke, ge] = xs(C, !1, ue, {
    rt: b,
    ct: Ye(b, p)
  }), me = F && Jt && new Jt((T) => {
    const M = T[T.length - 1].contentRect;
    G({
      ht: !0,
      _t: ro(M, i)
    }), i = M;
  });
  return [() => {
    J(), me && me.observe(C);
    const T = ce && ce(), M = ie && ie(), D = ke(), R = z((N) => {
      const [, q] = A();
      B({
        It: N,
        Ht: q
      });
    });
    return () => {
      me && me.disconnect(), T && T(), M && M(), d && d(), D(), R();
    };
  }, ({ Et: T, At: M, Tt: D }) => {
    const R = {}, [N] = T("update.ignoreMutation"), [q, Z] = T("update.attributes"), [te, pe] = T("update.elementEvents"), [be, X] = T("update.debounce"), we = pe || Z, Se = M || D, Fe = (re) => je(N) && N(re);
    if (we) {
      c && c(), d && d();
      const [re, xe] = xs(g || $, !0, Q, {
        ct: Ye(U, q || []),
        lt: te,
        it: _,
        dt: (Me, he) => {
          const { target: Le, attributeName: It } = Me;
          return (!he && It && !F ? dr(Le, _, u) : !1) || !!gt(Le, `.${Ve}`) || !!Fe(Me);
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
      const re = ge(), xe = ae && ae(), Me = c && c();
      re && ne(R, ue(re[0], re[1], Se)), xe && ne(R, oe(xe[0], Se)), Me && ne(R, Q(Me[0], Se));
    }
    return W(R), R;
  }, k];
}, Gr = (t, e, n, o) => {
  const { G: s, K: a } = Be(), { scrollbars: c } = s(), { slot: d } = c, { gt: i, bt: v, D: m, Dt: _, kt: u, Rt: p, V: w } = e, { scrollbars: b } = _ ? {} : t, { slot: S } = b || {}, C = /* @__PURE__ */ new Map(), $ = (T) => Vn && new Vn({
    source: u,
    axis: T
  }), g = $("x"), E = $("y"), F = go([i, v, m], () => w && p ? i : v, d, S), I = (T, M) => {
    if (M) {
      const te = T ? kt : St, { Mt: pe, Vt: be } = M, X = wt(be)[te], we = wt(pe)[te];
      return Ln(0, 1, X / we || 0);
    }
    const D = T ? "x" : "y", { Lt: R, Pt: N } = n, q = N[D], Z = R[D];
    return Ln(0, 1, q / (q + Z) || 0);
  }, x = (T, M, D, R) => {
    const N = I(D, T);
    return 1 / N * (1 - N) * (R ? 1 - M : M) || 0;
  }, k = (T, M) => ne(T, M ? {
    clear: ["left"]
  } : {}), V = (T) => {
    C.forEach((M, D) => {
      (T ? un(Hs(T), D) : !0) && (se(M || [], (N) => {
        N && N.cancel();
      }), C.delete(D));
    });
  }, L = (T, M, D, R) => {
    const N = C.get(T) || [], q = N.find((Z) => Z && Z.timeline === M);
    q ? q.effect = new KeyframeEffect(T, D, {
      composite: R
    }) : C.set(T, Ye(N, [T.animate(D, {
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
      Ct(R, N);
    });
  }, B = (T, M) => {
    U(T, (D) => {
      const { Vt: R } = D;
      return [R, {
        [M ? kt : St]: cs(I(M))
      }];
    });
  }, W = (T, M) => {
    const { Lt: D } = n, R = M ? D.x : D.y, N = (q, Z, te) => kn(cs(x(q, _s(Z, R, te), M, te)), M);
    if (g && E)
      se(T, (q) => {
        const { Ut: Z, Vt: te } = q, pe = M && Ze(Z) && a;
        L(te, M ? g : E, k({
          transform: fs(R, pe).map((be) => N(q, be, pe))
        }, pe));
      });
    else {
      const q = Et(u);
      U(T, (Z) => {
        const { Vt: te, Ut: pe } = Z;
        return [te, {
          transform: N(Z, M ? q.x : q.y, M && Ze(pe) && a)
        }];
      });
    }
  }, J = (T) => w && !p && $t(T) === m, oe = [], G = [], Q = [], ue = (T, M, D) => {
    const R = Fs(D), N = R ? D : !0, q = R ? !D : !0;
    N && A(G, T, M), q && A(Q, T, M);
  }, z = () => {
    B(G, !0), B(Q);
  }, ie = () => {
    W(G, !0), W(Q);
  }, ae = () => {
    if (w) {
      const { Lt: T } = n, M = 0.5;
      if (g && E)
        se(Ye(Q, G), ({ Ut: D }) => {
          if (J(D)) {
            const R = (N, q, Z) => {
              const te = Z && Ze(D) && a;
              L(D, N, k({
                transform: fs(q - M, te).map((pe) => kn(Bn(pe), Z))
              }, te), "add");
            };
            R(g, T.x, !0), R(E, T.y);
          } else
            V(D);
        });
      else {
        const D = Et(u), R = (N) => {
          const { Ut: q } = N, Z = J(q) && q, te = (pe, be, X) => {
            const we = _s(pe, be, X), Se = be * we;
            return Bn(X ? -Se : Se);
          };
          return [Z, {
            transform: Z ? kn({
              x: te(D.x, T.x, Ze(q) && a),
              y: te(D.y, T.y)
            }) : ""
          }];
        };
        U(G, R), U(Q, R);
      }
    }
  }, ce = (T) => {
    const D = bt(`${Ve} ${T ? $r : Cr}`), R = bt(vo), N = bt(Qn), q = {
      Ut: D,
      Mt: R,
      Vt: N
    };
    return _e(T ? G : Q, q), _e(oe, [Te(D, R), Te(R, N), Y(tt, D), V, o(q, ue, W, T)]), q;
  }, ke = Y(ce, !0), ge = Y(ce, !1), me = () => (Te(F, G[0].Ut), Te(F, Q[0].Ut), Y(Re, oe));
  return ke(), ge(), [{
    Bt: z,
    Nt: ie,
    jt: ae,
    Ft: ue,
    qt: {
      J: g,
      Wt: G,
      Xt: ke,
      Yt: Y(U, G)
    },
    Jt: {
      J: E,
      Wt: Q,
      Xt: ge,
      Yt: Y(U, Q)
    }
  }, me];
}, jr = (t, e, n, o) => {
  const { bt: s, D: a, V: c, kt: d, Kt: i } = e;
  return (v, m, _, u) => {
    const { Ut: p, Mt: w, Vt: b } = v, [S, C] = ht(333), [$, g] = ht(), E = Y(_, [v], u), F = !!d.scrollBy, I = `client${u ? "X" : "Y"}`, x = u ? kt : St, k = u ? "left" : "top", V = u ? "w" : "h", L = u ? "x" : "y", A = (W) => W.propertyName.indexOf(x) > -1, U = () => {
      const W = "pointerup pointerleave pointercancel lostpointercapture", J = (oe, G) => (Q) => {
        const { Lt: ue } = n, z = Mt(w)[V] - Mt(b)[V], ae = G * Q / z * ue[L];
        nt(d, {
          [L]: oe + ae
        });
      };
      return ve(w, "pointerdown", (oe) => {
        const G = gt(oe.target, `.${Qn}`) === b, Q = G ? b : w, ue = t.scrollbars, { button: z, isPrimary: ie, pointerType: ae } = oe, { pointers: ce } = ue;
        if (z === 0 && ie && ue[G ? "dragScroll" : "clickScroll"] && (ce || []).includes(ae)) {
          const ge = !G && oe.shiftKey, me = Y(wt, b), T = Y(wt, w), M = (re, xe) => (re || me())[k] - (xe || T())[k], D = Tn(wt(d)[x]) / Mt(d)[V] || 1, R = J(Et(d)[L] || 0, 1 / D), N = oe[I], q = me(), Z = T(), te = q[x], pe = M(q, Z) + te / 2, be = N - Z[k], X = G ? 0 : be - pe, we = (re) => {
            Re(Fe), Q.releasePointerCapture(re.pointerId);
          }, Fe = [Bt(s, Ae, pr), ve(i, W, we), ve(i, "selectstart", (re) => vs(re), {
            H: !1
          }), ve(w, W, we), ve(w, "pointermove", (re) => {
            const xe = re[I] - N;
            (G || ge) && R(X + xe);
          })];
          if (Q.setPointerCapture(oe.pointerId), ge)
            R(X);
          else if (!G) {
            const re = Dt(Br);
            re && _e(Fe, re(R, M, X, te, be));
          }
        }
      });
    };
    let B = !0;
    return Y(Re, [ve(b, "pointermove pointerleave", o), ve(p, "pointerenter", () => {
      m(ws, !0);
    }), ve(p, "pointerleave pointercancel", () => {
      m(ws, !1);
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
      }), B = !1, m(Ss, !0), S(() => {
        B = !0, m(Ss);
      }), vs(W);
    }, {
      H: !1,
      I: !0
    }), ve(b, "transitionstart", (W) => {
      if (A(W)) {
        const J = () => {
          E(), $(J);
        };
        J();
      }
    }), ve(b, "transitionend transitioncancel", (W) => {
      A(W) && (g(), E());
    }), ve(p, "mousedown", Y(ve, i, "click", Xn, {
      A: !0,
      I: !0
    }), {
      I: !0
    }), U(), C, g]);
  };
}, Wr = (t, e, n, o, s, a) => {
  let c, d, i, v, m, _ = Ne, u = 0;
  const p = (z) => z.pointerType === "mouse", [w, b] = ht(), [S, C] = ht(100), [$, g] = ht(100), [E, F] = ht(() => u), [I, x] = Gr(t, s, o, jr(e, s, o, (z) => p(z) && oe())), { bt: k, Zt: V, Rt: L } = s, { Ft: A, Bt: U, Nt: B, jt: W } = I, J = (z, ie) => {
    if (F(), z)
      A(ks);
    else {
      const ae = Y(A, ks, !0);
      u > 0 && !ie ? E(ae) : ae();
    }
  }, oe = () => {
    (i ? !c : !v) && (J(!0), S(() => {
      J(!1);
    }));
  }, G = (z) => {
    A(qn, z, !0), A(qn, z, !1);
  }, Q = (z) => {
    p(z) && (c = i, i && J(!0));
  }, ue = [F, C, g, b, () => _(), ve(k, "pointerover", Q, {
    A: !0
  }), ve(k, "pointerenter", Q), ve(k, "pointerleave", (z) => {
    p(z) && (c = !1, i && J(!1));
  }), ve(k, "pointermove", (z) => {
    p(z) && d && oe();
  }), ve(V, "scroll", (z) => {
    w(() => {
      B(), oe();
    }), a(z), W();
  })];
  return [() => Y(Re, _e(ue, x())), ({ Et: z, Tt: ie, Gt: ae, Qt: ce }) => {
    const { tn: ke, nn: ge, sn: me } = ce || {}, { Ct: T, _t: M } = ae || {}, { N: D } = n, { T: R } = Be(), { k: N, en: q } = o, [Z, te] = z("showNativeOverlaidScrollbars"), [pe, be] = z("scrollbars.theme"), [X, we] = z("scrollbars.visibility"), [Se, Fe] = z("scrollbars.autoHide"), [re, xe] = z("scrollbars.autoHideSuspend"), [Me] = z("scrollbars.autoHideDelay"), [he, Le] = z("scrollbars.dragScroll"), [It, Nt] = z("scrollbars.clickScroll"), [Ut, qe] = z("overflow"), rt = M && !ie, lt = q.x || q.y, gn = ke || ge || T || ie, Je = me || we || qe, bn = Z && R.x && R.y, ft = (_t, mt, Vt) => {
      const qt = _t.includes("scroll") && (X === "visible" || X === "auto" && mt === "scroll");
      return A(Er, qt, Vt), qt;
    };
    if (u = Me, rt && (re && lt ? (G(!1), _(), $(() => {
      _ = ve(V, "scroll", Y(G, !0), {
        A: !0
      });
    })) : G(!0)), te && A(Sr, bn), be && (A(m), A(pe, !0), m = pe), xe && !re && G(!0), Fe && (d = Se === "move", i = Se === "leave", v = Se === "never", J(v, !0)), Le && A(Dr, he), Nt && A(Tr, It), Je) {
      const _t = ft(Ut.x, N.x, !0), mt = ft(Ut.y, N.y, !1);
      A(Ar, !(_t && mt));
    }
    gn && (U(), B(), W(), A(ys, !q.x, !0), A(ys, !q.y, !1), A(xr, D && !L));
  }, {}, I];
}, Yr = (t) => {
  const e = Be(), { G: n, L: o } = e, { elements: s } = n(), { host: a, padding: c, viewport: d, content: i } = s, v = Zt(t), m = v ? {} : t, { elements: _ } = m, { host: u, padding: p, viewport: w, content: b } = _ || {}, S = v ? t : m.target, C = to(S), $ = tn(S, "textarea"), g = S.ownerDocument, E = g.documentElement, F = () => g.defaultView || De, I = (X) => {
    X && X.focus && X.focus({
      preventScroll: !0
    });
  }, x = Y(Hr, [S]), k = Y(go, [S]), V = Y(bt, ""), L = Y(x, V, d), A = Y(k, V, i), U = L(w), B = U === S, W = B && C, J = !B && A(b), oe = !B && U === J, G = W ? E : U, Q = $ ? x(V, a, u) : S, ue = W ? G : Q, z = !B && k(V, c, p), ie = !oe && J, ae = [ie, G, z, ue].map((X) => Zt(X) && !$t(X) && X), ce = (X) => X && un(ae, X), ke = ce(G) ? S : G, ge = {
    gt: S,
    bt: ue,
    D: G,
    cn: z,
    wt: ie,
    kt: W ? E : G,
    Zt: W ? g : G,
    rn: C ? E : ke,
    Kt: g,
    yt: $,
    Rt: C,
    Dt: v,
    V: B,
    ln: F,
    St: (X) => ir(G, B ? Ae : We, X),
    $t: (X, we) => Yt(G, B ? Ae : We, X, we)
  }, { gt: me, bt: T, cn: M, D, wt: R } = ge, N = [() => {
    Pe(T, [Ae, xn]), Pe(me, xn), C && Pe(E, [xn, Ae]);
  }], q = $ && ce(T);
  let Z = $ ? me : On([R, D, M, T, me].find((X) => X && !ce(X)));
  const te = W ? me : R || D, pe = Y(Re, N);
  return [ge, () => {
    const X = F(), we = Rn(), Se = (he) => {
      Te($t(he), On(he)), tt(he);
    }, Fe = (he) => he ? ve(he, "focusin focusout focus blur", (Le) => {
      Xn(Le), Le.stopImmediatePropagation();
    }, {
      I: !0,
      H: !1
    }) : Ne, re = "tabindex", xe = _n(D, re), Me = Fe(we);
    return He(T, Ae, B ? "viewport" : "host"), He(M, Un, ""), He(R, bs, ""), B || (He(D, We, ""), He(D, re, xe || "-1"), C && Bt(E, Ae, hr)), q && (as(me, T), _e(N, () => {
      as(T, me), tt(T);
    })), Te(te, Z), Te(T, M), Te(M || T, !B && D), Te(D, R), _e(N, [Me, () => {
      const he = Rn(), Le = Fe(he);
      Pe(M, Un), Pe(R, bs), Pe(D, [ao, io, We]), xe ? He(D, re, xe) : Pe(D, re), ce(R) && Se(R), ce(D) && Se(D), ce(M) && Se(M), I(he), Le();
    }]), o && !B && (Bt(D, We, uo), _e(N, Y(Pe, D, We))), I(!B && we === S && X.top === X ? D : we), Me(), Z = 0, pe;
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
  return ({ Et: d, Gt: i, an: v, Tt: m }) => {
    let [_, u] = c(m);
    const { L: p } = Be(), { ht: w, Ht: b, Ct: S } = i || {}, { N: C } = v, [$, g] = d("paddingAbsolute");
    (w || u || (m || b)) && ([_, u] = a(m));
    const F = !o && (g || S || u);
    if (F) {
      const I = !$ || !e && !p, x = _.r + _.l, k = _.t + _.b, V = {
        [zs]: I && !C ? -x : 0,
        [Gs]: I ? -k : 0,
        [Ps]: I && C ? -x : 0,
        top: I ? -_.t : 0,
        right: I ? C ? -_.r : "auto" : 0,
        left: I ? C ? "auto" : -_.l : 0,
        [kt]: I && `calc(100% + ${x}px)`
      }, L = {
        [Is]: I ? _.t : 0,
        [Ns]: I ? _.r : 0,
        [qs]: I ? _.b : 0,
        [Us]: I ? _.l : 0
      };
      Ct(e || n, V), Ct(n, L), ne(s, {
        cn: _,
        un: !I,
        j: e ? L : ne({}, V, L)
      });
    }
    return {
      dn: F
    };
  };
}, Jr = (t, e) => {
  const n = Be(), { bt: o, cn: s, D: a, V: c, Rt: d, $t: i, ln: v } = t, { L: m } = n, _ = d && c, u = Y(Wt, 0), p = {
    u: Ws,
    o: {
      w: 0,
      h: 0
    }
  }, w = {
    u: Ys,
    o: {
      x: xt,
      y: xt
    }
  }, b = (L, A) => {
    const U = De.devicePixelRatio % 1 !== 0 ? 1 : 0, B = {
      w: u(L.w - A.w),
      h: u(L.h - A.h)
    };
    return {
      w: B.w > U ? B.w : 0,
      h: B.h > U ? B.h : 0
    };
  }, [S, C] = Ie(p, Y(Kn, a)), [$, g] = Ie(p, Y(Fn, a)), [E, F] = Ie(p), [I, x] = Ie(p), [k] = Ie(w), V = Dt(Zn);
  return ({ Et: L, Gt: A, an: U, Tt: B }, { dn: W }) => {
    const { ht: J, Ht: oe, Ct: G, It: Q } = A || {}, ue = V && V.M(t, e, U, n, L), { q: z, W: ie, X: ae } = ue || {}, [ce, ke] = Or(L, n), [ge, me] = L("overflow"), T = J || W || oe || G || Q || ke, M = sn(ge.x), D = sn(ge.y), R = M || D;
    let N = C(B), q = g(B), Z = F(B), te = x(B), pe;
    if (ke && m && i(uo, !ce), T) {
      R && i(yt, !1);
      const [qe, rt] = ie ? ie(pe) : [], [lt, gn] = N = S(B), [Je, bn] = q = $(B), ft = oo(a), _t = Je, mt = ft;
      qe && qe(), (bn || gn || ke) && rt && !ce && z && z(rt, Je, lt);
      const Vt = fr(v()), qt = {
        w: u(Wt(Je.w, _t.w) + lt.w),
        h: u(Wt(Je.h, _t.h) + lt.h)
      }, ns = {
        w: u((_ ? Vt.w : mt.w + u(ft.w - Je.w)) + lt.w),
        h: u((_ ? Vt.h : mt.h + u(ft.h - Je.h)) + lt.h)
      };
      te = I(ns), Z = E(b(qt, ns), B);
    }
    const [be, X] = te, [we, Se] = Z, [Fe, re] = q, [xe, Me] = N, he = {
      x: we.w > 0,
      y: we.h > 0
    }, Le = M && D && (he.x || he.y) || M && he.x && !he.y || D && he.y && !he.x;
    if (W || G || Q || Me || re || X || Se || me || ke || T) {
      const qe = {}, rt = Rr(t, he, ge, qe);
      ae && ae(rt, U, !!z && z(rt, Fe, xe), qe), c ? (He(o, ao, qe[vn]), He(o, io, qe[fn])) : Ct(a, qe);
    }
    Yt(o, Ae, co, Le), Yt(s, Un, br, Le), c || Yt(a, We, yt, R);
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
  }, { gt: a, D: c, V: d } = e, { L: i, T: v } = Be(), m = !i && (v.x || v.y), _ = [Kr(e), Xr(e, s), Jr(e, s)];
  return [n, (u) => {
    const p = {}, b = m && Et(c), S = d ? Bt(c, Ae, Nn) : Ne;
    return se(_, (C) => {
      ne(p, C(u, p) || {});
    }), S(), nt(c, b), !d && nt(a, 0), p;
  }, s, e, o];
}, Zr = (t, e, n, o) => {
  const s = gs(e, {}), [a, c, d, i, v] = Qr(t), [m, _, u] = zr(i, d, s, ($) => {
    C({}, $);
  }), [p, w, , b] = Wr(t, e, u, d, i, o), S = ($) => et($).some((g) => !!$[g]), C = ($, g) => {
    const { fn: E, Tt: F, At: I, _n: x } = $, k = E || {}, V = !!F, L = {
      Et: gs(e, k, V),
      fn: k,
      Tt: V
    };
    if (x)
      return w(L), !1;
    const A = g || _(ne({}, L, {
      At: I
    })), U = c(ne({}, L, {
      an: u,
      Gt: A
    }));
    w(ne({}, L, {
      Gt: A,
      Qt: U
    }));
    const B = S(A), W = S(U), J = B || W || !jn(k) || V;
    return J && n($, {
      Gt: A,
      Qt: U
    }), J;
  };
  return [() => {
    const { rn: $, D: g } = i, E = Et($), F = [m(), a(), p()];
    return nt(g, E), Y(Re, F);
  }, C, () => ({
    vn: u,
    hn: d
  }), {
    pn: i,
    gn: b
  }, v];
}, Xe = (t, e, n) => {
  const { nt: o } = Be(), s = Zt(t), a = s ? t : t.target, c = bo(a);
  if (e && !c) {
    let d = !1;
    const i = [], v = {}, m = (L) => {
      const A = Js(L), U = Dt(Mr);
      return U ? U(A, !0) : A;
    }, _ = ne({}, o(), m(e)), [u, p, w] = In(), [b, S, C] = In(n), $ = (L, A) => {
      C(L, A), w(L, A);
    }, [g, E, F, I, x] = Zr(t, _, ({ fn: L, Tt: A }, { Gt: U, Qt: B }) => {
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
    }, (L) => $("scroll", [V, L])), k = (L) => {
      Ur(a), Re(i), d = !0, $("destroyed", [V, L]), p(), S();
    }, V = {
      options(L, A) {
        if (L) {
          const U = A ? o() : {}, B = lo(_, ne(U, m(L)));
          jn(B) || (ne(_, B), E({
            fn: B
          }));
        }
        return ne({}, _);
      },
      on: b,
      off: (L, A) => {
        L && A && S(L, A);
      },
      state() {
        const { vn: L, hn: A } = F(), { N: U } = L, { Pt: B, Lt: W, k: J, en: oe, cn: G, un: Q } = A;
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
        const { gt: L, bt: A, cn: U, D: B, wt: W, kt: J, Zt: oe } = I.pn, { qt: G, Jt: Q } = I.gn, ue = (ie) => {
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
              return E({
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
      update: (L) => E({
        Tt: L,
        At: !0
      }),
      destroy: Y(k, !1),
      plugin: (L) => v[et(L)[0]]
    };
    return _e(i, [x]), Nr(a, V), mo(fo, Xe, [V, u, v]), Ir(I.pn.Rt, !s && t.cancel) ? (k(!0), V) : (_e(i, g()), $("initialized", [V]), V.update(!0), V);
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
  const { P: t, T: e, L: n, K: o, J: s, st: a, et: c, G: d, tt: i, nt: v, ot: m } = Be();
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
    setDefaultOptions: m
  });
};
function el(t) {
  let e;
  const n = O(null), o = Math.floor(Math.random() * 2 ** 32), s = O(!1), a = O([]), c = () => a.value, d = () => e.getSelection(), i = () => a.value.length, v = () => e.clearSelection(!0), m = O(), _ = O(null), u = O(null), p = O(null), w = O(null), b = O(null);
  function S() {
    e = new zo({
      area: n.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), e.subscribe(
      "DS:start:pre",
      ({ items: x, event: k, isDragging: V }) => {
        if (V)
          e.Interaction._reset(k);
        else {
          s.value = !1;
          const L = n.value.offsetWidth - k.offsetX, A = n.value.offsetHeight - k.offsetY;
          L < 15 && A < 15 && e.Interaction._reset(k), k.target.classList.contains("os-scrollbar-handle") && e.Interaction._reset(k);
        }
      }
    ), document.addEventListener("dragleave", (x) => {
      w.value = x.target, !x.buttons && s.value && (s.value = !1);
    }), document.addEventListener("dragend", (x) => {
      t && t(w.value);
    });
  }
  const C = () => at(() => {
    e.addSelection(e.getSelectables()), $();
  }), $ = () => {
    a.value = e.getSelection().map((x) => JSON.parse(x.dataset.item)), m.value(a.value);
  }, g = () => at(() => {
    const x = c().map((k) => k.path);
    v(), e.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + o)
    }), e.addSelection(
      e.getSelectables().filter(
        (k) => x.includes(JSON.parse(k.dataset.item).path)
      )
    ), $(), F();
  }), E = (x) => {
    m.value = x, e.subscribe("DS:end", ({ items: k, event: V, isDragging: L }) => {
      a.value = k.map((A) => JSON.parse(A.dataset.item)), x(k.map((A) => JSON.parse(A.dataset.item)));
    });
  }, F = () => {
    _.value && (n.value.getBoundingClientRect().height < n.value.scrollHeight ? (u.value.style.height = n.value.scrollHeight + "px", u.value.style.display = "block") : (u.value.style.height = "100%", u.value.style.display = "none"));
  }, I = (x) => {
    if (!_.value)
      return;
    const { scrollOffsetElement: k } = _.value.elements();
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
          _.value = x;
        },
        scroll: (x, k) => {
          const { scrollOffsetElement: V } = x.elements();
          n.value.scrollTo({
            top: V.scrollTop,
            left: 0
          });
        }
      }
    ), S(), F(), b.value = new ResizeObserver(F), b.value.observe(n.value), n.value.addEventListener("scroll", I), e.subscribe(
      "DS:scroll",
      ({ isDragging: x }) => x || I()
    );
  }), zn(() => {
    e && e.stop(), b.value && b.value.disconnect();
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
    selectAll: C,
    clearSelection: v,
    refreshSelection: g,
    getCount: i,
    onSelect: E
  };
}
function tl(t, e) {
  const n = O(t), o = O(e), s = O([]), a = O([]), c = O([]), d = O(!1), i = O(5);
  let v = !1, m = !1;
  const _ = dt({
    adapter: n,
    storages: [],
    dirname: o,
    files: []
  });
  function u() {
    let $ = [], g = [], E = o.value ?? n.value + "://";
    E.length === 0 && (s.value = []), E.replace(n.value + "://", "").split("/").forEach(function(x) {
      $.push(x), $.join("/") !== "" && g.push({
        basename: x,
        name: x,
        path: n.value + "://" + $.join("/"),
        type: "dir"
      });
    }), a.value = g;
    const [F, I] = w(g, i.value);
    c.value = I, s.value = F;
  }
  function p($) {
    i.value = $, u();
  }
  function w($, g) {
    return $.length > g ? [$.slice(-g), $.slice(0, -g)] : [$, []];
  }
  function b($ = null) {
    d.value = $ ?? !d.value;
  }
  function S() {
    return s.value && s.value.length && !m;
  }
  const C = Ke(() => {
    var $;
    return (($ = s.value[s.value.length - 2]) == null ? void 0 : $.path) ?? n.value + "://";
  });
  return Ee(() => {
  }), Oe(o, u), Ee(u), {
    adapter: n,
    path: o,
    loading: v,
    searchMode: m,
    data: _,
    breadcrumbs: s,
    breadcrumbItems: a,
    limitBreadcrumbItems: p,
    hiddenBreadcrumbs: c,
    showHiddenBreadcrumbs: d,
    toggleHiddenBreadcrumbs: b,
    isGoUpAvailable: S,
    parentFolderPath: C
  };
}
function nl() {
  const t = "_readOnlyFile", e = localStorage.getItem(t), n = dt(JSON.parse(e ?? '{"items": []}')), o = (v) => {
    for (const m of v)
      n.items.length >= 1e3 && n.items.shift(), i(m.path) ? c(m.path) : n.items.push(m);
  }, s = () => JSON.parse(localStorage.getItem(t) || '{"items": []}'), a = () => {
    localStorage.setItem(t, JSON.stringify(n));
  }, c = (v) => {
    const m = n.items.findIndex((_) => _.path === v);
    m !== -1 && n.items.splice(m, 1);
  }, d = () => n.items, i = (v) => v.indexOf("自动下单") !== -1 ? !0 : n.items.findIndex((_) => v.indexOf(_.path) === 0) !== -1;
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
  const n = Ko(t.id), o = Po(), s = n.getStore("metricUnits", !1), a = er(n, t.theme), c = e.i18n, d = t.locale ?? e.locale, i = n.getStore("adapter"), v = nl(), m = (w) => Array.isArray(w) ? w : Qo, _ = n.getStore("persist-path", t.persist), u = _ ? n.getStore("path", t.path) : t.path, p = el((w) => {
    o.emit("file-drag-end", w);
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
    filesize: s ? Ms : Vs,
    // show large icons in list view
    compactListView: n.getStore("compact-list-view", !0),
    // persist state
    persist: _,
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
    }), (o, s) => (f(), h("div", {
      class: "vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: s[1] || (s[1] = At((a) => l(n).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      s[2] || (s[2] = r("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      r("div", ol, [
        r("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: s[0] || (s[0] = Lt((a) => l(n).modal.close(), ["self"]))
        }, [
          r("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            r("div", rl, [
              Ot(o.$slots, "default")
            ]),
            r("div", ll, [
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
  return f(), h("div", {
    class: ye(["vuefinder__action-message", { "vuefinder__action-message--hidden": !o.shown }])
  }, [
    t.$slots.default ? Ot(t.$slots, "default", { key: 0 }) : (f(), h("span", cl, y(o.t("Saved.")), 1))
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
  return f(), h("svg", ul, e[0] || (e[0] = [
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
    return (e, n) => (f(), h("div", _l, [
      r("div", ml, [
        (f(), P(Ts(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      r("h3", pl, y(t.title), 1)
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
}, Ml = { class: "vuefinder__about-modal__setting flex" }, Ll = { class: "vuefinder__about-modal__setting-input" }, Ol = { class: "vuefinder__about-modal__setting-label" }, Rl = {
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
    }, v = ($) => {
      e.theme.set($), e.emitter.emit("vf-theme-saved");
    }, m = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? Ms : Vs, n("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, _ = () => {
      e.compactListView = !e.compactListView, n("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, u = () => {
      e.showThumbnails = !e.showThumbnails, n("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, p = () => {
      e.persist = !e.persist, n("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: w } = le("VueFinderOptions"), S = Object.fromEntries(
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
      }).filter(([$]) => Object.keys(w).includes($))
    ), C = Ke(() => ({
      system: s("System"),
      light: s("Light"),
      dark: s("Dark")
    }));
    return ($, g) => (f(), P(st, null, {
      buttons: ee(() => [
        r("button", {
          type: "button",
          onClick: g[7] || (g[7] = (E) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, y(l(s)("Close")), 1)
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
                  (f(!0), h($e, null, Ce(c.value, (E) => (f(), h("button", {
                    key: E.name,
                    onClick: (F) => d.value = E.key,
                    class: ye([E.key === d.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": E.current ? "page" : void 0
                  }, y(E.name), 11, wl))), 128))
                ])
              ])
            ]),
            d.value === a.ABOUT ? (f(), h("div", yl, [
              r("div", kl, y(l(s)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              r("a", Sl, y(l(s)("Project home")), 1),
              r("a", xl, y(l(s)("Follow on GitHub")), 1)
            ])) : H("", !0),
            d.value === a.SETTINGS ? (f(), h("div", $l, [
              r("div", Cl, y(l(s)("Customize your experience with the following settings")), 1),
              r("div", El, [
                r("fieldset", null, [
                  r("div", Al, [
                    r("div", Tl, [
                      de(r("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        "onUpdate:modelValue": g[0] || (g[0] = (E) => l(e).metricUnits = E),
                        onClick: m,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Pt, l(e).metricUnits]
                      ])
                    ]),
                    r("div", Dl, [
                      r("label", Vl, [
                        K(y(l(s)("Use Metric Units")) + " ", 1),
                        j(pt, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: ee(() => [
                            K(y(l(s)("Saved.")), 1)
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
                        "onUpdate:modelValue": g[1] || (g[1] = (E) => l(e).compactListView = E),
                        onClick: _,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Pt, l(e).compactListView]
                      ])
                    ]),
                    r("div", Ol, [
                      r("label", Rl, [
                        K(y(l(s)("Compact list view")) + " ", 1),
                        j(pt, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: ee(() => [
                            K(y(l(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  r("div", Bl, [
                    r("div", Fl, [
                      de(r("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        "onUpdate:modelValue": g[2] || (g[2] = (E) => l(e).persist = E),
                        onClick: p,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Pt, l(e).persist]
                      ])
                    ]),
                    r("div", Hl, [
                      r("label", Il, [
                        K(y(l(s)("Persist path on reload")) + " ", 1),
                        j(pt, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: ee(() => [
                            K(y(l(s)("Saved.")), 1)
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
                        "onUpdate:modelValue": g[3] || (g[3] = (E) => l(e).showThumbnails = E),
                        onClick: u,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [Pt, l(e).showThumbnails]
                      ])
                    ]),
                    r("div", ql, [
                      r("label", Pl, [
                        K(y(l(s)("Show thumbnails")) + " ", 1),
                        j(pt, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: ee(() => [
                            K(y(l(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  r("div", zl, [
                    r("div", Gl, [
                      r("label", jl, y(l(s)("Theme")), 1)
                    ]),
                    r("div", Wl, [
                      de(r("select", {
                        id: "theme",
                        "onUpdate:modelValue": g[4] || (g[4] = (E) => l(e).theme.value = E),
                        onChange: g[5] || (g[5] = (E) => v(E.target.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        r("optgroup", {
                          label: l(s)("Theme")
                        }, [
                          (f(!0), h($e, null, Ce(C.value, (E, F) => (f(), h("option", { value: F }, y(E), 9, Kl))), 256))
                        ], 8, Yl)
                      ], 544), [
                        [An, l(e).theme.value]
                      ]),
                      j(pt, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: ee(() => [
                          K(y(l(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  l(e).features.includes(l(fe).LANGUAGE) && Object.keys(l(S)).length > 1 ? (f(), h("div", Xl, [
                    r("div", Jl, [
                      r("label", Ql, y(l(s)("Language")), 1)
                    ]),
                    r("div", Zl, [
                      de(r("select", {
                        id: "language",
                        "onUpdate:modelValue": g[6] || (g[6] = (E) => l(e).i18n.locale = E),
                        class: "vuefinder__about-modal__select"
                      }, [
                        r("optgroup", {
                          label: l(s)("Language")
                        }, [
                          (f(!0), h($e, null, Ce(l(S), (E, F) => (f(), h("option", { value: F }, y(E), 9, ta))), 256))
                        ], 8, ea)
                      ], 512), [
                        [An, l(e).i18n.locale]
                      ]),
                      j(pt, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: ee(() => [
                          K(y(l(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : H("", !0)
                ])
              ])
            ])) : H("", !0),
            d.value === a.SHORTCUTS ? (f(), h("div", na, [
              r("div", sa, [
                r("div", oa, [
                  r("div", null, y(l(s)("Rename")), 1),
                  g[8] || (g[8] = r("kbd", null, "F2", -1))
                ]),
                r("div", ra, [
                  r("div", null, y(l(s)("Refresh")), 1),
                  g[9] || (g[9] = r("kbd", null, "F5", -1))
                ]),
                r("div", la, [
                  K(y(l(s)("Delete")) + " ", 1),
                  g[10] || (g[10] = r("kbd", null, "Del", -1))
                ]),
                r("div", aa, [
                  K(y(l(s)("Escape")) + " ", 1),
                  g[11] || (g[11] = r("div", null, [
                    r("kbd", null, "Esc")
                  ], -1))
                ]),
                r("div", ia, [
                  K(y(l(s)("Select All")) + " ", 1),
                  g[12] || (g[12] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    K(" + "),
                    r("kbd", null, "A")
                  ], -1))
                ]),
                r("div", ca, [
                  K(y(l(s)("Search")) + " ", 1),
                  g[13] || (g[13] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    K(" + "),
                    r("kbd", null, "F")
                  ], -1))
                ]),
                r("div", da, [
                  K(y(l(s)("Toggle Sidebar")) + " ", 1),
                  g[14] || (g[14] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    K(" + "),
                    r("kbd", null, "E")
                  ], -1))
                ]),
                r("div", ua, [
                  K(y(l(s)("Open Settings")) + " ", 1),
                  g[15] || (g[15] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    K(" + "),
                    r("kbd", null, ",")
                  ], -1))
                ]),
                r("div", va, [
                  K(y(l(s)("Toggle Full Screen")) + " ", 1),
                  g[16] || (g[16] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    K(" + "),
                    r("kbd", null, "Enter")
                  ], -1))
                ])
              ])
            ])) : H("", !0),
            d.value === a.RESET ? (f(), h("div", fa, [
              r("div", _a, y(l(s)("Reset all settings to default")), 1),
              r("button", {
                onClick: i,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, y(l(s)("Reset Settings")), 1)
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
    return (m, _) => (f(), h("div", null, [
      a.value ? H("", !0) : (f(), h("div", {
        key: 0,
        ref_key: "strMessage",
        ref: c,
        class: ye(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Ot(m.$slots, "default"),
        r("div", {
          class: "vuefinder__message__close",
          onClick: i,
          title: l(s)("Close")
        }, _[0] || (_[0] = [
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
  return f(), h("svg", ha, e[0] || (e[0] = [
    r("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
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
        r("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, y(l(n)("Rename")), 1),
        r("button", {
          type: "button",
          onClick: i[2] || (i[2] = (v) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, y(l(n)("Cancel")), 1)
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
                o.value.type === "dir" ? (f(), h("svg", Sa, i[3] || (i[3] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (f(), h("svg", xa, i[4] || (i[4] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                r("span", $a, y(o.value.basename), 1)
              ]),
              de(r("input", {
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
  return f(), h("svg", Aa, e[0] || (e[0] = [
    r("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ]));
}
const yo = { render: Ta }, Da = { class: "vuefinder__new-folder-modal__content" }, Va = { class: "vuefinder__new-folder-modal__form" }, Ma = { class: "vuefinder__new-folder-modal__description" }, La = ["placeholder"], ko = {
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
        r("button", {
          type: "button",
          onClick: a,
          class: "vf-btn vf-btn-primary"
        }, y(l(n)("Create")), 1),
        r("button", {
          type: "button",
          onClick: d[2] || (d[2] = (i) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, y(l(n)("Cancel")), 1)
      ]),
      default: ee(() => [
        r("div", null, [
          j(vt, {
            icon: l(yo),
            title: l(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          r("div", Da, [
            r("div", Va, [
              r("p", Ma, y(l(n)("Create a new folder")), 1),
              de(r("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (i) => o.value = i),
                onKeyup: At(a, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: l(n)("Folder Name"),
                type: "text"
              }, null, 40, La), [
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
  return f(), h("svg", Oa, e[0] || (e[0] = [
    r("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
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
        r("button", {
          type: "button",
          onClick: a,
          class: "vf-btn vf-btn-primary"
        }, y(l(n)("Create")), 1),
        r("button", {
          type: "button",
          onClick: d[2] || (d[2] = (i) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, y(l(n)("Cancel")), 1)
      ]),
      default: ee(() => [
        r("div", null, [
          j(vt, {
            icon: l(So),
            title: l(n)("New File")
          }, null, 8, ["icon", "title"]),
          r("div", Ba, [
            r("div", Fa, [
              r("p", Ha, y(l(n)("Create a new file")), 1),
              de(r("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (i) => o.value = i),
                onKeyup: At(a, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: l(n)("File Name"),
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
  return f(), h("svg", Ua, e[0] || (e[0] = [
    r("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
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
        r("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, y(l(n)("Unarchive")), 1),
        r("button", {
          type: "button",
          onClick: i[1] || (i[1] = (v) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, y(l(n)("Cancel")), 1)
      ]),
      default: ee(() => [
        r("div", null, [
          j(vt, {
            icon: l(Pa),
            title: l(n)("Unarchive")
          }, null, 8, ["icon", "title"]),
          r("div", za, [
            r("div", Ga, [
              (f(!0), h($e, null, Ce(a.value, (v) => (f(), h("p", ja, [
                v.type === "dir" ? (f(), h("svg", Wa, i[2] || (i[2] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (f(), h("svg", Ya, i[3] || (i[3] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                r("span", Ka, y(v.basename), 1)
              ]))), 256)),
              r("p", Xa, y(l(n)("The archive will be unarchived at")) + " (" + y(l(e).fs.data.dirname) + ")", 1),
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
  return f(), h("svg", Qa, e[0] || (e[0] = [
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
        r("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, y(l(n)("Archive")), 1),
        r("button", {
          type: "button",
          onClick: i[2] || (i[2] = (v) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, y(l(n)("Cancel")), 1)
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
                (f(!0), h($e, null, Ce(a.value, (v) => (f(), h("p", oi, [
                  v.type === "dir" ? (f(), h("svg", ri, i[3] || (i[3] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (f(), h("svg", li, i[4] || (i[4] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  r("span", ai, y(v.basename), 1)
                ]))), 256))
              ]),
              de(r("input", {
                "onUpdate:modelValue": i[0] || (i[0] = (v) => o.value = v),
                onKeyup: At(c, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: l(n)("Archive name. (.zip file will be created)"),
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
  return f(), h("svg", di, e[0] || (e[0] = [
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
  return f(), h("svg", vi, e[0] || (e[0] = [
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
  return f(), h("svg", mi, e[0] || (e[0] = [
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
  return f(), h("svg", gi, e[0] || (e[0] = [
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
  return f(), h("svg", yi, e[0] || (e[0] = [
    r("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ]));
}
const Si = { render: ki }, xi = { class: "vuefinder__toolbar" }, $i = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, Ci = ["title"], Ei = ["title"];
const Ai = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, Ti = { class: "pl-2" }, Di = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, Vi = { class: "vuefinder__toolbar__controls" }, Mi = ["title"], Li = ["title"], Oi = {
  __name: "Toolbar",
  setup(t) {
    const e = le("ServiceContainer"), { setStore: n } = e.storage, { t: o } = e.i18n, s = e.dragSelect, a = O(""), c = O([]), d = Ke(() => c.value.some((m) => m.onlyRead));
    e.emitter.on("vf-context-selected", (m) => {
      c.value = m;
    }), e.emitter.on("vf-contextmenu-show", ({ event: m, items: _, target: u = null }) => {
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
    const v = () => {
      e.view = e.view === "list" ? "grid" : "list", s.refreshSelection(), n("viewport", e.view);
    };
    return (m, _) => (f(), h("div", xi, [
      a.value.length ? (f(), h("div", Ai, [
        r("div", Ti, [
          K(y(l(o)("Search results for")) + " ", 1),
          r("span", Di, y(a.value), 1)
        ]),
        l(e).fs.loading ? (f(), P(l(ts), { key: 0 })) : H("", !0)
      ])) : (f(), h("div", $i, [
        l(e).features.includes(l(fe).NEW_FOLDER) ? (f(), h("div", {
          key: 0,
          class: "mx-1.5",
          title: l(o)("New Folder"),
          onClick: _[0] || (_[0] = (u) => l(e).modal.open(ko, { items: l(s).getSelected() }))
        }, [
          j(l(yo))
        ], 8, Ci)) : H("", !0),
        l(e).features.includes(l(fe).NEW_FILE) ? (f(), h("div", {
          key: 1,
          class: "mx-1.5",
          title: l(o)("New File"),
          onClick: _[1] || (_[1] = (u) => l(e).modal.open(Na, { items: l(s).getSelected() }))
        }, [
          j(l(So))
        ], 8, Ei)) : H("", !0),
        (l(e).features.includes(l(fe).RENAME), H("", !0)),
        (l(e).features.includes(l(fe).DELETE), H("", !0)),
        (l(e).features.includes(l(fe).UPLOAD), H("", !0)),
        (l(e).features.includes(l(fe).UNARCHIVE) && l(s).getCount() === 1 && l(s).getSelected()[0].mime_type, H("", !0)),
        (l(e).features.includes(l(fe).ARCHIVE), H("", !0))
      ])),
      r("div", Vi, [
        l(e).features.includes(l(fe).FULL_SCREEN) ? (f(), h("div", {
          key: 0,
          onClick: i,
          class: "mx-1.5",
          title: l(o)("Toggle Full Screen")
        }, [
          l(e).fullScreen ? (f(), P(l(hi), { key: 0 })) : (f(), P(l(_i), { key: 1 }))
        ], 8, Mi)) : H("", !0),
        r("div", {
          class: "mx-1.5",
          title: l(o)("Change View"),
          onClick: _[7] || (_[7] = (u) => a.value.length || v())
        }, [
          l(e).view === "grid" ? (f(), P(l(wi), {
            key: 0,
            class: ye(["vf-toolbar-icon", a.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : H("", !0),
          l(e).view === "list" ? (f(), P(l(Si), {
            key: 1,
            class: ye(["vf-toolbar-icon", a.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : H("", !0)
        ], 8, Li)
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
  return f(), h("svg", Bi, e[0] || (e[0] = [
    r("path", {
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
        r("button", {
          type: "button",
          onClick: a,
          class: "vf-btn vf-btn-primary"
        }, y(l(n)("Yes, Move!")), 1),
        r("button", {
          type: "button",
          onClick: d[1] || (d[1] = (i) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, y(l(n)("Cancel")), 1),
        r("div", Ki, y(l(n)("%s item(s) selected.", o.value.length)), 1)
      ]),
      default: ee(() => [
        r("div", null, [
          j(vt, {
            icon: l(Hi),
            title: l(n)("Move files")
          }, null, 8, ["icon", "title"]),
          r("div", Ii, [
            r("p", Ni, y(l(n)("Are you sure you want to move these files?")), 1),
            r("div", Ui, [
              (f(!0), h($e, null, Ce(o.value, (i) => (f(), h("div", qi, [
                r("div", null, [
                  i.type === "dir" ? (f(), h("svg", Pi, d[2] || (d[2] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (f(), h("svg", zi, d[3] || (d[3] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])))
                ]),
                r("div", Gi, y(i.path), 1)
              ]))), 256))
            ]),
            r("h4", ji, y(l(n)("Target Directory")), 1),
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
              r("span", Yi, y(l(e).modal.data.items.to.path), 1)
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
  return f(), h("svg", Xi, e[0] || (e[0] = [
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
  return f(), h("svg", Zi, e[0] || (e[0] = [
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
  return f(), h("svg", nc, e[0] || (e[0] = [
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
  return f(), h("svg", rc, e[0] || (e[0] = [
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
  return f(), h("svg", ic, e[0] || (e[0] = [
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
  return f(), h("svg", uc, e[0] || (e[0] = [
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
  return f(), h("svg", _c, e[0] || (e[0] = [
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
  return f(), h("svg", pc, e[0] || (e[0] = [
    r("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ]));
}
const gc = { render: hc }, bc = {
  class: "vuefinder__breadcrumb__container",
  style: { padding: "1px" }
}, wc = ["title"], yc = ["title"], kc = ["title"], Sc = { class: "vuefinder__breadcrumb__list" }, xc = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, $c = { class: "relative" }, Cc = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], Ec = { class: "vuefinder__breadcrumb__search-mode" }, Ac = ["placeholder"], Tc = { class: "vuefinder__breadcrumb__hidden-dropdown" }, Dc = ["onDrop", "onClick"], Vc = { class: "vuefinder__breadcrumb__hidden-item-content" }, Mc = { class: "vuefinder__breadcrumb__hidden-item-text" }, Lc = {
  __name: "Breadcrumb",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, o = e.dragSelect, { setStore: s } = e.storage, a = O(null), c = Cs(0, 100);
    Oe(c, (x) => {
      const k = a.value.children;
      let V = 0, L = 0, A = 5, U = 1;
      e.fs.limitBreadcrumbItems(A), at(() => {
        for (let B = k.length - 1; B >= 0 && !(V + k[B].offsetWidth > c.value - 40); B--)
          V += parseInt(k[B].offsetWidth, 10), L++;
        L < U && (L = U), L > A && (L = A), e.fs.limitBreadcrumbItems(L);
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
      let V = JSON.parse(x.dataTransfer.getData("items"));
      if (V.find((L) => L.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Pn, {
        items: {
          from: V,
          to: e.fs.hiddenBreadcrumbs[k] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, m = (x, k = null) => {
      x.preventDefault(), o.isDraggingRef.value = !1, u(x), k ?? (k = e.fs.breadcrumbs.length - 2);
      let V = JSON.parse(x.dataTransfer.getData("items"));
      if (V.find((L) => L.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Pn, {
        items: {
          from: V,
          to: e.fs.breadcrumbs[k] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, _ = (x) => {
      x.preventDefault(), e.fs.isGoUpAvailable() ? (x.dataTransfer.dropEffect = "copy", x.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (x.dataTransfer.dropEffect = "none", x.dataTransfer.effectAllowed = "none");
    }, u = (x) => {
      x.preventDefault(), x.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && x.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, p = () => {
      F(), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    }, w = () => {
      F(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.parentFolderPath
        }
      });
    }, b = (x) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: x.path } }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, S = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, C = {
      mounted(x, k, V, L) {
        x.clickOutsideEvent = function(A) {
          x === A.target || x.contains(A.target) || k.value();
        }, document.body.addEventListener("click", x.clickOutsideEvent);
      },
      beforeUnmount(x, k, V, L) {
        document.body.removeEventListener("click", x.clickOutsideEvent);
      }
    };
    Oe(() => e.showTreeView, (x, k) => {
      x !== k && s("show-tree-view", x);
    });
    const $ = O(null), g = () => {
      e.features.includes(fe.SEARCH) && (e.fs.searchMode = !0, at(() => $.value.focus()));
    }, E = Cs("", 400);
    Oe(E, (x) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: x });
    }), Oe(() => e.fs.searchMode, (x) => {
      x && at(() => $.value.focus());
    });
    const F = () => {
      e.fs.searchMode = !1, E.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      F();
    });
    const I = () => {
      E.value === "" && F();
    };
    return (x, k) => (f(), h("div", bc, [
      H("", !0),
      r("span", {
        title: l(n)("Go up a directory")
      }, [
        j(l(tc), {
          onDragover: k[0] || (k[0] = (V) => _(V)),
          onDragleave: k[1] || (k[1] = (V) => u(V)),
          onDrop: k[2] || (k[2] = (V) => m(V)),
          onClick: w,
          class: ye(l(e).fs.isGoUpAvailable() ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive")
        }, null, 8, ["class"])
      ], 8, wc),
      l(e).fs.loading ? (f(), h("span", {
        key: 2,
        title: l(n)("Cancel")
      }, [
        j(l(oc), {
          onClick: k[3] || (k[3] = (V) => l(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, kc)) : (f(), h("span", {
        key: 1,
        title: l(n)("Refresh")
      }, [
        j(l(Qi), { onClick: p })
      ], 8, yc)),
      de(r("div", {
        onClick: Lt(g, ["self"]),
        class: "group vuefinder__breadcrumb__search-container"
      }, [
        r("div", null, [
          j(l(ac), {
            onDragover: k[4] || (k[4] = (V) => _(V)),
            onDragleave: k[5] || (k[5] = (V) => u(V)),
            onDrop: k[6] || (k[6] = (V) => m(V, -1)),
            onClick: k[7] || (k[7] = (V) => l(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: l(e).fs.adapter } }))
          })
        ]),
        r("div", Sc, [
          l(e).fs.hiddenBreadcrumbs.length ? de((f(), h("div", xc, [
            k[13] || (k[13] = r("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            r("div", $c, [
              r("span", {
                onDragenter: k[8] || (k[8] = (V) => l(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: k[9] || (k[9] = (V) => l(e).fs.toggleHiddenBreadcrumbs()),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                j(l(gc), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [C, S]
          ]) : H("", !0)
        ]),
        r("div", {
          ref_key: "breadcrumbContainer",
          ref: a,
          class: "vuefinder__breadcrumb__visible-list",
          onClick: Lt(g, ["self"])
        }, [
          (f(!0), h($e, null, Ce(l(e).fs.breadcrumbs, (V, L) => (f(), h("div", { key: L }, [
            k[14] || (k[14] = r("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            r("span", {
              onDragover: (A) => L === l(e).fs.breadcrumbs.length - 1 || _(A),
              onDragleave: (A) => L === l(e).fs.breadcrumbs.length - 1 || u(A),
              onDrop: (A) => L === l(e).fs.breadcrumbs.length - 1 || m(A, L),
              class: "vuefinder__breadcrumb__item",
              title: V.basename,
              onClick: (A) => l(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: l(e).fs.adapter, path: V.path } })
            }, y(V.name), 41, Cc)
          ]))), 128))
        ], 512),
        l(e).fs.loading ? (f(), P(l(ts), { key: 0 })) : H("", !0)
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
          onKeydown: At(F, ["esc"]),
          onBlur: I,
          "onUpdate:modelValue": k[10] || (k[10] = (V) => Fo(E) ? E.value = V : null),
          placeholder: l(n)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, Ac), [
          [Tt, l(E)]
        ]),
        j(l(fc), { onClick: F })
      ], 512), [
        [ze, l(e).fs.searchMode && !1]
      ]),
      de(r("div", Tc, [
        (f(!0), h($e, null, Ce(l(e).fs.hiddenBreadcrumbs, (V, L) => (f(), h("div", {
          key: L,
          onDragover: k[11] || (k[11] = (A) => _(A)),
          onDragleave: k[12] || (k[12] = (A) => u(A)),
          onDrop: (A) => v(A, L),
          onClick: (A) => b(V),
          class: "vuefinder__breadcrumb__hidden-item"
        }, [
          r("div", Vc, [
            r("span", null, [
              j(l(hn), { class: "vuefinder__breadcrumb__hidden-item-icon" })
            ]),
            k[15] || (k[15] = K()),
            r("span", Mc, y(V.name), 1)
          ])
        ], 40, Dc))), 128))
      ], 512), [
        [ze, l(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, xo = (t, e = null) => new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), Oc = ["onClick"], Rc = {
  __name: "Toast",
  setup(t) {
    const e = le("ServiceContainer"), { getStore: n } = e.storage, o = O(n("full-screen", !1)), s = O([]), a = (i) => i === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", c = (i) => {
      s.value.splice(i, 1);
    }, d = (i) => {
      let v = s.value.findIndex((m) => m.id === i);
      v !== -1 && c(v);
    };
    return e.emitter.on("vf-toast-clear", () => {
      s.value = [];
    }), e.emitter.on("vf-toast-push", (i) => {
      let v = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      i.id = v, s.value.push(i), setTimeout(() => {
        d(v);
      }, 5e3);
    }), (i, v) => (f(), h("div", {
      class: ye(["vuefinder__toast", o.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      j(Ho, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: ee(() => [
          (f(!0), h($e, null, Ce(s.value, (m, _) => (f(), h("div", {
            key: _,
            onClick: (u) => c(_),
            class: ye(["vuefinder__toast__message", a(m.type)])
          }, y(m.label), 11, Oc))), 128))
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
  return f(), h("svg", Bc, e[0] || (e[0] = [
    r("path", {
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
  return f(), h("svg", Ic, e[0] || (e[0] = [
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
    return (e, n) => (f(), h("div", null, [
      t.direction === "asc" ? (f(), P(l(Hc), { key: 0 })) : H("", !0),
      t.direction === "desc" ? (f(), P(l(Uc), { key: 1 })) : H("", !0)
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
  return f(), h("svg", qc, e[0] || (e[0] = [
    r("path", {
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
    return (e, n) => (f(), h("span", Gc, [
      t.type === "dir" ? (f(), P(l(hn), {
        key: 0,
        class: ye(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"])) : (f(), P(l(zc), {
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
  return f(), h("svg", jc, e[0] || (e[0] = [
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
    return (n, o) => (f(), h("div", Kc, [
      j(l(Yc)),
      r("div", Xc, y(e.count), 1)
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
  return f(), h("svg", Qc, e[0] || (e[0] = [
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
    const n = le("ServiceContainer"), o = n.dragSelect, s = t, a = (b) => {
      s.disabled || (b.type === "dir" ? (n.emitter.emit("vf-search-exit"), n.emitter.emit("vf-fetch", { params: { q: "index", adapter: n.fs.adapter, path: b.path } })) : n.emitter.emit("openfile", b));
    }, c = (b, S) => {
      console.log(s.item), !s.disabled && n.emitter.emit("vf-contextmenu-show", { event: b, items: o.getSelected(), target: S });
    }, d = {
      mounted(b, S, C, $) {
        C.props.draggable && (b.addEventListener("dragstart", (g) => i(g, S.value)), b.addEventListener("dragover", (g) => m(g, S.value)), b.addEventListener("drop", (g) => v(g, S.value)));
      },
      beforeUnmount(b, S, C, $) {
        C.props.draggable && (b.removeEventListener("dragstart", i), b.removeEventListener("dragover", m), b.removeEventListener("drop", v));
      }
    }, i = (b, S) => {
      if (b.altKey || b.ctrlKey || b.metaKey)
        return b.preventDefault(), !1;
      o.isDraggingRef.value = !0, b.dataTransfer.setDragImage(s.dragImage.$el, 0, 15), b.dataTransfer.effectAllowed = "all", b.dataTransfer.dropEffect = "copy", b.dataTransfer.setData("items", JSON.stringify(o.getSelected()));
    }, v = (b, S) => {
      b.preventDefault(), o.isDraggingRef.value = !1;
      let C = JSON.parse(b.dataTransfer.getData("items"));
      if (C.find(($) => $.storage !== n.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      n.modal.open(Pn, { items: { from: C, to: S } });
    }, m = (b, S) => {
      b.preventDefault(), !S || S.type !== "dir" || o.getSelection().find((C) => C === b.currentTarget) ? (b.dataTransfer.dropEffect = "none", b.dataTransfer.effectAllowed = "none") : b.dataTransfer.dropEffect = "copy";
    };
    let _ = null, u = !1;
    const p = () => {
      _ && clearTimeout(_);
    }, w = (b) => {
      if (!u)
        u = !0, setTimeout(() => u = !1, 300);
      else
        return u = !1, a(s.item), clearTimeout(_), !1;
      _ = setTimeout(() => {
        const S = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: b.target.getBoundingClientRect().x,
          clientY: b.target.getBoundingClientRect().y
        });
        b.target.dispatchEvent(S);
      }, 500);
    };
    return (b, S) => de((f(), h("div", {
      style: on({ opacity: l(o).isDraggingRef.value && l(o).getSelection().find((C) => b.$el === C) ? "0.5 !important" : "" }),
      class: ye(["vuefinder__item", "vf-item-" + l(o).explorerId, t.disabled ? "vuefinder__item--disabled" : ""]),
      "data-type": t.item.type,
      key: t.item.path,
      "data-item": JSON.stringify(t.item),
      "data-index": t.index,
      onDblclick: S[0] || (S[0] = (C) => a(t.item)),
      onTouchstart: S[1] || (S[1] = (C) => w(C)),
      onTouchend: S[2] || (S[2] = (C) => p()),
      onContextmenu: S[3] || (S[3] = Lt((C) => c(C, t.item), ["prevent"]))
    }, [
      Ot(b.$slots, "default"),
      l(n).pinnedFolders.find((C) => C.path === t.item.path) ? (f(), P(l($o), {
        key: 0,
        class: "vuefinder__item--pinned"
      })) : H("", !0)
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
}, bd = {
  __name: "Explorer",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, o = (_) => _ == null ? void 0 : _.substring(0, 4), s = O(null), a = O(""), c = e.dragSelect;
    let d;
    e.emitter.on("vf-fullscreen-toggle", () => {
      c.area.value.style.height = null;
    }), e.emitter.on("vf-search-query", ({ newQuery: _ }) => {
      a.value = _, _ ? e.emitter.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname,
          filter: _
        },
        onSuccess: (u) => {
          u.files.length || e.emitter.emit("vf-toast-push", { label: n("No search result found.") });
        }
      }) : e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    });
    const i = dt({ active: !1, column: "", order: "" }), v = (_ = !0) => {
      let u = [...e.fs.data.files], p = i.column, w = i.order === "asc" ? 1 : -1;
      if (!_)
        return u;
      const b = (S, C) => typeof S == "string" && typeof C == "string" ? S.toLowerCase().localeCompare(C.toLowerCase()) : S < C ? -1 : S > C ? 1 : 0;
      return i.active && (u = u.slice().sort((S, C) => b(S[p], C[p]) * w)), u;
    }, m = (_) => {
      i.active && i.column === _ ? (i.active = i.order === "asc", i.column = _, i.order = "desc") : (i.active = !0, i.column = _, i.order = "asc");
    };
    return Ee(() => {
      d = new Go(c.area.value);
    }), As(() => {
      d.update();
    }), Ro(() => {
      d.destroy();
    }), (_, u) => (f(), h("div", td, [
      l(e).view === "list" || a.value.length ? (f(), h("div", nd, [
        r("div", {
          onClick: u[0] || (u[0] = (p) => m("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          K(y(l(n)("Name")) + " ", 1),
          de(j(jt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [ze, i.active && i.column === "basename"]
          ])
        ]),
        a.value.length ? H("", !0) : (f(), h("div", {
          key: 0,
          onClick: u[1] || (u[1] = (p) => m("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          K(y(l(n)("Size")) + " ", 1),
          de(j(jt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [ze, i.active && i.column === "file_size"]
          ])
        ])),
        a.value.length ? H("", !0) : (f(), h("div", {
          key: 1,
          onClick: u[2] || (u[2] = (p) => m("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          K(y(l(n)("Date")) + " ", 1),
          de(j(jt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [ze, i.active && i.column === "last_modified"]
          ])
        ])),
        a.value.length ? (f(), h("div", {
          key: 2,
          onClick: u[3] || (u[3] = (p) => m("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          K(y(l(n)("Filepath")) + " ", 1),
          de(j(jt, {
            direction: i.order
          }, null, 8, ["direction"]), [
            [ze, i.active && i.column === "path"]
          ])
        ])) : H("", !0)
      ])) : H("", !0),
      r("div", sd, [
        j(Jc, {
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
        onContextmenu: u[4] || (u[4] = Lt((p) => l(e).emitter.emit("vf-contextmenu-show", { event: p, items: l(c).getSelected() }), ["self", "prevent"]))
      }, [
        a.value.length ? (f(!0), h($e, { key: 0 }, Ce(v(), (p, w) => (f(), P(En, {
          item: p,
          index: w,
          dragImage: s.value,
          class: "vf-item vf-item-list"
        }, {
          default: ee(() => [
            r("div", od, [
              r("div", rd, [
                j(Cn, {
                  type: p.type,
                  small: l(e).compactListView
                }, null, 8, ["type", "small"]),
                r("span", ld, y(p.basename), 1)
              ]),
              r("div", ad, y(p.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : H("", !0),
        l(e).view === "list" && !a.value.length ? (f(!0), h($e, { key: 1 }, Ce(v(), (p, w) => (f(), P(En, {
          item: p,
          index: w,
          dragImage: s.value,
          class: "vf-item vf-item-list",
          draggable: p.onlyRead ? "false" : "true",
          key: p.path
        }, {
          default: ee(() => [
            r("div", id, [
              r("div", cd, [
                j(Cn, {
                  type: p.type,
                  small: l(e).compactListView
                }, null, 8, ["type", "small"]),
                r("span", dd, y(p.basename), 1)
              ]),
              r("div", ud, y(p.file_size ? l(e).filesize(p.file_size) : ""), 1),
              r("div", vd, y(l(xo)(p.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage", "draggable"]))), 128)) : H("", !0),
        l(e).view === "grid" && !a.value.length ? (f(!0), h($e, { key: 2 }, Ce(v(!1), (p, w) => (f(), P(En, {
          item: p,
          index: w,
          dragImage: s.value,
          class: "vf-item vf-item-grid",
          disabled: !p.canopt,
          draggable: !p.onlyRead && p.canopt ? "true" : "false"
        }, {
          default: ee(() => [
            r("div", null, [
              r("div", fd, [
                (p.mime_type ?? "").startsWith("image") && l(e).showThumbnails ? (f(), h("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "vuefinder__explorer__item-thumbnail lazy",
                  "data-src": l(e).requester.getPreviewUrl(l(e).fs.adapter, p),
                  alt: p.basename,
                  key: p.path
                }, null, 8, _d)) : (f(), P(Cn, {
                  key: 1,
                  type: p.type
                }, null, 8, ["type"])),
                p.type !== "dir" && p.hasReader ? (f(), h("span", md, " 打开过 ")) : H("", !0),
                p.type !== "dir" ? (f(), h("div", pd, y(o(p.extension)), 1)) : H("", !0)
              ]),
              p.onlyRead ? (f(), h("span", hd, y(l($s)("【只读】" + p.basename)), 1)) : (f(), h("span", gd, y(l($s)(p.basename)), 1))
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage", "disabled", "draggable"]))), 256)) : H("", !0)
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
    const n = e, o = O(""), s = O(""), a = O(null), c = O(!1), d = O(""), i = O(!1), v = le("ServiceContainer"), { t: m } = v.i18n;
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
    const _ = () => {
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
        d.value = m("Updated."), o.value = p, n("success"), c.value = !c.value;
      }).catch((p) => {
        d.value = m(p.message), i.value = !0;
      });
    };
    return (p, w) => (f(), h("div", wd, [
      r("div", yd, [
        r("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: l(v).modal.data.item.path
        }, y(l(v).modal.data.item.basename), 9, kd),
        r("div", Sd, [
          c.value ? (f(), h("button", {
            key: 0,
            onClick: u,
            class: "vuefinder__text-preview__save-button"
          }, y(l(m)("Save")), 1)) : H("", !0),
          l(v).features.includes(l(fe).EDIT) ? (f(), h("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: w[0] || (w[0] = (b) => _())
          }, y(c.value ? l(m)("Cancel") : l(m)("Edit")), 1)) : H("", !0)
        ])
      ]),
      r("div", null, [
        c.value ? (f(), h("div", $d, [
          de(r("textarea", {
            ref_key: "editInput",
            ref: a,
            "onUpdate:modelValue": w[1] || (w[1] = (b) => s.value = b),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Tt, s.value]
          ])
        ])) : (f(), h("pre", xd, y(o.value), 1)),
        d.value.length ? (f(), P(ot, {
          key: 2,
          onHidden: w[2] || (w[2] = (b) => d.value = ""),
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
}, Ed = { class: "vuefinder__image-preview" }, Ad = { class: "vuefinder__image-preview__header" }, Td = ["title"], Dd = { class: "vuefinder__image-preview__actions" }, Vd = { class: "vuefinder__image-preview__image-container" }, Md = ["src"], Ld = {
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, o = le("ServiceContainer"), { t: s } = o.i18n, a = O(null), c = O(null), d = O(!1), i = O(""), v = O(!1), m = () => {
      d.value = !d.value, d.value ? c.value = new jo(a.value, {
        crop(u) {
        }
      }) : c.value.destroy();
    }, _ = () => {
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
          }).then((w) => {
            i.value = s("Updated."), a.value.src = o.requester.getPreviewUrl(o.modal.data.adapter, o.modal.data.item), m(), n("success");
          }).catch((w) => {
            i.value = s(w.message), v.value = !0;
          });
        }
      );
    };
    return Ee(() => {
      n("success");
    }), (u, p) => (f(), h("div", Ed, [
      r("div", Ad, [
        r("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: l(o).modal.data.item.path
        }, y(l(o).modal.data.item.basename), 9, Td),
        r("div", Dd, [
          d.value ? (f(), h("button", {
            key: 0,
            onClick: _,
            class: "vuefinder__image-preview__crop-button"
          }, y(l(s)("Crop")), 1)) : H("", !0),
          l(o).features.includes(l(fe).EDIT) ? (f(), h("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: p[0] || (p[0] = (w) => m())
          }, y(d.value ? l(s)("Cancel") : l(s)("Edit")), 1)) : H("", !0)
        ])
      ]),
      r("div", Vd, [
        r("img", {
          ref_key: "image",
          ref: a,
          class: "vuefinder__image-preview__image",
          src: l(o).requester.getPreviewUrl(l(o).modal.data.adapter, l(o).modal.data.item),
          alt: ""
        }, null, 8, Md)
      ]),
      i.value.length ? (f(), P(ot, {
        key: 0,
        onHidden: p[1] || (p[1] = (w) => i.value = ""),
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
    }), (s, a) => (f(), h("div", Od, [
      r("div", Rd, [
        r("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: l(n).modal.data.item.path
        }, y(l(n).modal.data.item.basename), 9, Bd)
      ]),
      a[0] || (a[0] = r("div", null, null, -1))
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
    }), (a, c) => (f(), h("div", Hd, [
      r("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: l(n).modal.data.item.path
      }, y(l(n).modal.data.item.basename), 9, Id),
      r("div", null, [
        r("video", Nd, [
          r("source", {
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
    }), (a, c) => (f(), h("div", Pd, [
      r("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: l(o).modal.data.item.path
      }, y(l(o).modal.data.item.basename), 9, zd),
      r("div", null, [
        r("audio", Gd, [
          r("source", {
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
    }), (a, c) => (f(), h("div", Yd, [
      r("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: l(n).modal.data.item.path
      }, y(l(n).modal.data.item.basename), 9, Kd),
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
              K(" Your browser does not support PDFs. "),
              r("a", { href: "https://example.com/test.pdf" }, "Download the PDF"),
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
        r("button", {
          type: "button",
          onClick: d[6] || (d[6] = (i) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, y(l(n)("Close")), 1),
        l(e).features.includes(l(fe).DOWNLOAD) ? (f(), h("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: l(e).requester.getDownloadUrl(l(e).modal.data.adapter, l(e).modal.data.item),
          href: l(e).requester.getDownloadUrl(l(e).modal.data.adapter, l(e).modal.data.item)
        }, y(l(n)("Download")), 9, au)) : H("", !0)
      ]),
      default: ee(() => [
        r("div", null, [
          r("div", Zd, [
            l(a) ? (f(), h("div", eu, [
              s("text") ? (f(), P(Cd, {
                key: 0,
                onSuccess: d[0] || (d[0] = (i) => o.value = !0)
              })) : s("image") ? (f(), P(Ld, {
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
            r("div", tu, [
              o.value === !1 ? (f(), h("div", nu, [
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
                r("span", null, y(l(n)("Loading")), 1)
              ])) : H("", !0)
            ])
          ])
        ]),
        r("div", su, [
          r("div", null, [
            r("span", ou, y(l(n)("File Size")) + ": ", 1),
            K(y(l(e).filesize(l(e).modal.data.item.file_size)), 1)
          ]),
          r("div", null, [
            r("span", ru, y(l(n)("Last Modified")) + ": ", 1),
            K(" " + y(l(xo)(l(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        l(e).features.includes(l(fe).DOWNLOAD) ? (f(), h("div", lu, [
          r("span", null, y(l(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
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
    const m = (u, p, w) => {
      p.some((b) => b.onlyRead) || s.value.some((b) => b.onlyRead) || u.push(w);
    };
    e.emitter.on("vf-contextmenu-show", ({ event: u, items: p, target: w = null }) => {
      if (c.items = [], a.value)
        if (w)
          c.items.push(i.openDir), e.emitter.emit("vf-context-selected", [w]);
        else
          return;
      else !w && !a.value ? (c.items.push(i.refresh), c.items.push(i.selectAll), c.items.push(i.newfolder), e.emitter.emit("vf-context-selected", [])) : p.length > 1 && p.some((b) => b.path === w.path) ? (c.items.push(i.refresh), m(c.items, [w], i.delete), c.items.push(i.setAllOnlyRead), e.emitter.emit("vf-context-selected", p)) : (w.type === "dir" ? (c.items.push(i.open), c.items.push(i.setAllOnlyRead), e.pinnedFolders.findIndex((b) => b.path === w.path) !== -1 ? c.items.push(i.unpinFolder) : c.items.push(i.pinFolder)) : (c.items.push(i.preview), c.items.push(i.download), c.items.push(i.setAllOnlyRead)), m(c.items, [w], i.rename), m(c.items, [w], i.delete), e.emitter.emit("vf-context-selected", [w]));
      _(u);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      c.active = !1;
    });
    const _ = (u) => {
      const p = e.dragSelect.area.value, w = e.root.getBoundingClientRect(), b = p.getBoundingClientRect();
      let S = u.clientX - w.left, C = u.clientY - w.top;
      c.active = !0, at(() => {
        var F;
        const $ = (F = o.value) == null ? void 0 : F.getBoundingClientRect();
        let g = ($ == null ? void 0 : $.height) ?? 0, E = ($ == null ? void 0 : $.width) ?? 0;
        S = b.right - u.pageX + window.scrollX < E ? S - E : S, C = b.bottom - u.pageY + window.scrollY < g ? C - g : C, c.positions = {
          left: S + "px",
          top: C + "px"
        };
      });
    };
    return (u, p) => de((f(), h("ul", {
      ref_key: "contextmenu",
      ref: o,
      style: on(c.positions),
      class: "vuefinder__context-menu"
    }, [
      (f(!0), h($e, null, Ce(d.value, (w) => (f(), h("li", {
        class: "vuefinder__context-menu__item",
        key: w.title
      }, [
        w.link ? (f(), h("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: w.link,
          download: w.link,
          onClick: p[0] || (p[0] = (b) => l(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          r("span", null, y(w.title()), 1)
        ], 8, cu)) : (f(), h("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (b) => v(w)
        }, [
          r("span", null, y(w.title()), 1)
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
  return f(), h("svg", vu, e[0] || (e[0] = [
    r("path", {
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
  return f(), h("svg", _u, e[0] || (e[0] = [
    r("path", {
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
    return (i, v) => (f(), h("div", hu, [
      r("div", gu, [
        r("div", {
          class: "vuefinder__status-bar__storage-container",
          title: l(n)("Storage")
        }, [
          r("div", wu, [
            j(l(Co))
          ]),
          de(r("select", {
            "onUpdate:modelValue": v[0] || (v[0] = (m) => l(e).fs.adapter = m),
            onChange: a,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (f(!0), h($e, null, Ce(l(e).fs.data.storages, (m) => (f(), h("option", { value: m }, y(m), 9, yu))), 256))
          ], 544), [
            [An, l(e).fs.adapter]
          ])
        ], 8, bu),
        r("div", ku, [
          c.value.length ? (f(), h("span", Su, y(l(e).fs.data.files.length) + " items found. ", 1)) : H("", !0),
          r("span", xu, y(l(e).dragSelect.getCount() > 0 ? l(n)("%s item(s) selected.", l(e).dragSelect.getCount()) : ""), 1)
        ])
      ]),
      r("div", $u, [
        l(e).selectButton.active ? (f(), h("button", {
          key: 0,
          class: ye(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: v[1] || (v[1] = (m) => l(e).selectButton.click(l(s).getSelected(), m))
        }, y(l(n)("Select")), 11, Cu)) : H("", !0),
        r("span", {
          class: "vuefinder__status-bar__about",
          title: l(n)("About"),
          onClick: v[2] || (v[2] = (m) => l(e).modal.open(ma))
        }, [
          j(l(pu))
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
  return f(), h("svg", Tu, e[0] || (e[0] = [
    r("path", {
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
function Mu(t, e) {
  return f(), h("svg", Vu, e[0] || (e[0] = [
    r("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ]));
}
const Lu = { render: Mu }, Ou = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Ru(t, e) {
  return f(), h("svg", Ou, e[0] || (e[0] = [
    r("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M15 12H9M12 9v6" }, null, -1)
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
  return f(), h("svg", Bu, e[0] || (e[0] = [
    r("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M9 12h6" }, null, -1)
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
      return f(), h("div", Hu, [
        s.value ? (f(), P(l(ts), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--loading"
        })) : (f(), h("div", Iu, [
          o.value && ((v = a()) != null && v.folders.length) ? (f(), P(l(To), {
            key: 0,
            class: "vuefinder__folder-loader-indicator--minus"
          })) : H("", !0),
          o.value ? H("", !0) : (f(), P(l(Ao), {
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
      return f(), h("ul", {
        ref_key: "parentSubfolderList",
        ref: s,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (f(!0), h($e, null, Ce(a.value, (v, m) => (f(), h("li", {
          key: v.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          r("div", Nu, [
            r("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (_) => n.value[v.path] = !n.value[v.path]
            }, [
              j(Vo, {
                adapter: t.adapter,
                path: v.path,
                modelValue: n.value[v.path],
                "onUpdate:modelValue": (_) => n.value[v.path] = _
              }, null, 8, ["adapter", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, Uu),
            r("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: v.path,
              onClick: (_) => l(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o.adapter, path: v.path } })
            }, [
              r("div", Pu, [
                l(e).fs.path === v.path ? (f(), P(l(Eo), { key: 0 })) : (f(), P(l(hn), { key: 1 }))
              ]),
              r("div", {
                class: ye(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": l(e).fs.path === v.path
                }])
              }, y(v.basename), 3)
            ], 8, qu)
          ]),
          r("div", zu, [
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
    return (o, s) => (f(), h($e, null, [
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
            j(l(Co))
          ], 2),
          r("div", null, y(t.storage), 1)
        ], 2),
        r("div", ju, [
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
    return (n, o) => (f(), h("div", Yu, [
      r("div", Ku, [
        e.value ? (f(), P(l(To), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : H("", !0),
        e.value ? H("", !0) : (f(), P(l(Ao), {
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
    Oe(c, (m) => s("pinned-folders-opened", m));
    const d = (m) => {
      e.pinnedFolders = e.pinnedFolders.filter((_) => _.path !== m.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, i = (m) => {
      const _ = m.clientX, u = m.target.parentElement, p = u.getBoundingClientRect().width;
      u.classList.remove("transition-[width]"), u.classList.add("transition-none");
      const w = (S) => {
        a.value = p + S.clientX - _, a.value < 50 && (a.value = 0, e.showTreeView = !1), a.value > 50 && (e.showTreeView = !0);
      }, b = () => {
        const S = u.getBoundingClientRect();
        a.value = S.width, u.classList.add("transition-[width]"), u.classList.remove("transition-none"), window.removeEventListener("mousemove", w), window.removeEventListener("mouseup", b);
      };
      window.addEventListener("mousemove", w), window.addEventListener("mouseup", b);
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
    }), Oe(e.fs.data, (m, _) => {
      const u = m.files.filter((p) => p.type === "dir");
      Do(e.treeViewData, { path: e.fs.path, folders: u.map((p) => ({
        adapter: p.storage,
        path: p.path,
        basename: p.basename
      })) });
    }), (m, _) => (f(), h($e, null, [
      r("div", {
        onClick: _[0] || (_[0] = (u) => l(e).showTreeView = !l(e).showTreeView),
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
          r("div", Ju, [
            r("div", {
              onClick: _[2] || (_[2] = (u) => c.value = !c.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              r("div", Qu, [
                j(l($o), { class: "vuefinder__treeview__pin-icon" }),
                r("div", Zu, y(l(n)("Pinned Folders")), 1)
              ]),
              j(Xu, {
                modelValue: c.value,
                "onUpdate:modelValue": _[1] || (_[1] = (u) => c.value = u)
              }, null, 8, ["modelValue"])
            ]),
            c.value ? (f(), h("ul", ev, [
              (f(!0), h($e, null, Ce(l(e).pinnedFolders, (u) => (f(), h("li", tv, [
                r("div", {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (p) => l(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: u.storage, path: u.path } })
                }, [
                  l(e).fs.path !== u.path ? (f(), P(l(hn), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : H("", !0),
                  l(e).fs.path === u.path ? (f(), P(l(Eo), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : H("", !0),
                  r("div", {
                    title: u.path,
                    class: ye(["vuefinder__treeview__folder-name text-nowrap", {
                      "vuefinder__treeview__folder-name--active": l(e).fs.path === u.path
                    }])
                  }, y(u.basename), 11, sv)
                ], 8, nv),
                r("div", {
                  class: "vuefinder__treeview__remove-favorite",
                  onClick: (p) => d(u)
                }, [
                  j(l(Lu), { class: "vuefinder__treeview__remove-icon" })
                ], 8, ov)
              ]))), 256)),
              l(e).pinnedFolders.length ? H("", !0) : (f(), h("li", rv, [
                r("div", lv, y(l(n)("No folders pinned")), 1)
              ]))
            ])) : H("", !0)
          ]),
          (f(!0), h($e, null, Ce(l(e).fs.data.storages, (u) => (f(), h("div", av, [
            j(Wu, { storage: u }, null, 8, ["storage"])
          ]))), 256))
        ], 512),
        r("div", {
          onMousedown: i,
          class: ye([(l(e).showTreeView, ""), "vuefinder__treeview__resize-handle"])
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
      p.files = p.files.map((w) => (w.onlyRead = a.onlyReadFileStore.hasItem(w.path), w)), Object.assign(a.fs.data, p), i.clearSelection(), i.refreshSelection();
    };
    let m;
    a.emitter.on("vf-fetch-abort", () => {
      m.abort(), a.fs.loading = !1;
    }), a.emitter.on("vf-fetch", ({ params: p, body: w = null, onSuccess: b = null, onError: S = null, noCloseModal: C = !1 }) => {
      ["index", "search"].includes(p.q) && (m && m.abort(), a.fs.loading = !0), m = new AbortController();
      const $ = m.signal;
      a.requester.send({
        url: "",
        method: p.m || "get",
        params: p,
        body: w,
        abortSignal: $
      }).then((g) => {
        a.fs.adapter = g.adapter, a.persist && (a.fs.path = g.dirname, c("path", a.fs.path)), ["index", "search"].includes(p.q) && (a.fs.loading = !1), C || a.modal.close(), v(g), b && b(g);
      }).catch((g) => {
        console.error(g), S && S(g);
      });
    });
    const _ = () => {
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
      }), a.emitter.emit("vf-fetch", { params: { q: "index", adapter: a.fs.adapter, ...p } }), i.onSelect((w) => {
        o("select", w);
      }), _(), u();
    }), e({
      app: a
    }), (p, w) => (f(), h("div", {
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
          onMousedown: w[0] || (w[0] = (b) => l(a).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: w[1] || (w[1] = (b) => l(a).emitter.emit("vf-contextmenu-hide"))
        }, [
          t.simple ? H("", !0) : (f(), P(Oi, { key: 0 })),
          t.showPath ? (f(), P(Lc, { key: 1 })) : H("", !0),
          r("div", cv, [
            j(iv),
            j(bd)
          ]),
          t.simple ? H("", !0) : (f(), P(Au, { key: 2 }))
        ], 38),
        j(qo, { name: "fade" }, {
          default: ee(() => [
            l(a).modal.visible ? (f(), P(Ts(l(a).modal.type), { key: 0 })) : H("", !0)
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
