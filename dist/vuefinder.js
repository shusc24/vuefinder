var Vo = Object.defineProperty;
var Mo = (t, e, n) => e in t ? Vo(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var ns = (t, e, n) => Mo(t, typeof e != "symbol" ? e + "" : e, n);
import { reactive as dt, watch as Oe, ref as O, shallowRef as Lo, onMounted as Ee, onUnmounted as qn, onUpdated as As, nextTick as at, computed as Ye, inject as le, openBlock as f, createElementBlock as b, withKeys as Tt, unref as l, createElementVNode as r, withModifiers as kt, renderSlot as Ot, normalizeClass as ye, toDisplayString as k, createBlock as G, resolveDynamicComponent as Ts, withCtx as ee, createVNode as W, Fragment as $e, renderList as Ce, createCommentVNode as F, withDirectives as pe, vModelCheckbox as qt, createTextVNode as K, vModelSelect as En, vModelText as Dt, onBeforeUnmount as Oo, customRef as Bo, vShow as Ze, isRef as Ro, TransitionGroup as Io, normalizeStyle as sn, mergeModels as Fo, useModel as Ds, resolveComponent as Ho, provide as No, Transition as Uo } from "vue";
import Po from "mitt";
import qo from "dragselect";
import uv from "@uppy/core";
import fv from "@uppy/xhr-upload";
import zo from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import Go from "cropperjs";
var Es;
const bn = (Es = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : Es.getAttribute("content");
class jo {
  /** @param {RequestConfig} config */
  constructor(e) {
    /** @type {RequestConfig} */
    ns(this, "config");
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
    bn != null && bn !== "" && (s[n.xsrfHeaderName] = bn);
    const o = Object.assign({}, n.headers, s, e.headers), a = Object.assign({}, n.params, e.params), i = e.body, d = n.baseUrl + e.url, c = e.method;
    let u;
    c !== "get" && (i instanceof FormData ? (u = i, n.body != null && Object.entries(this.config.body).forEach(([m, _]) => {
      u.append(m, _);
    })) : (u = { ...i }, n.body != null && Object.assign(u, this.config.body)));
    const v = {
      url: d,
      method: c,
      headers: o,
      params: a,
      body: u
    };
    if (n.transformRequest != null) {
      const m = n.transformRequest({
        url: d,
        method: c,
        headers: o,
        params: a,
        body: u
      });
      m.url != null && (v.url = m.url), m.method != null && (v.method = m.method), m.params != null && (v.params = m.params ?? {}), m.headers != null && (v.headers = m.headers ?? {}), m.body != null && (v.body = m.body);
    }
    return v;
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
function Wo(t) {
  const e = {
    baseUrl: "",
    headers: {},
    params: {},
    body: {},
    xsrfHeaderName: "X-CSRF-Token"
  };
  return typeof t == "string" ? Object.assign(e, { baseUrl: t }) : Object.assign(e, t), new jo(e);
}
function Yo(t) {
  let e = localStorage.getItem(t + "_storage");
  const n = dt(JSON.parse(e ?? "{}"));
  Oe(n, s);
  function s() {
    Object.keys(n).length ? localStorage.setItem(t + "_storage", JSON.stringify(n)) : localStorage.removeItem(t + "_storage");
  }
  function o(c, u) {
    n[c] = u;
  }
  function a(c) {
    delete n[c];
  }
  function i() {
    Object.keys(n).map((c) => a(c));
  }
  return { getStore: (c, u = null) => n.hasOwnProperty(c) ? n[c] : u, setStore: o, removeStore: a, clearStore: i };
}
async function Ko(t, e) {
  const n = e[t];
  return typeof n == "function" ? (await n()).default : n;
}
function Xo(t, e, n, s) {
  const { getStore: o, setStore: a } = t, i = O({}), d = O(o("locale", e)), c = (m, _ = e) => {
    Ko(m, s).then((y) => {
      i.value = y, a("locale", m), d.value = m, a("translations", y), Object.values(s).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + m }), n.emit("vf-language-saved"));
    }).catch((y) => {
      _ ? (n.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), c(_, null)) : n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  Oe(d, (m) => {
    c(m);
  }), !o("locale") && !s.length ? c(e) : i.value = o("translations");
  const u = (m, ..._) => _.length ? u(m = m.replace("%s", _.shift()), ..._) : m;
  function v(m, ..._) {
    return i.value && i.value.hasOwnProperty(m) ? u(i.value[m], ..._) : u(m, ..._);
  }
  return dt({ t: v, locale: d });
}
const ve = {
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
}, Jo = Object.values(ve), Qo = "2.5.16";
function Vs(t, e, n, s, o) {
  return (e = Math, n = e.log, s = 1024, o = n(t) / n(s) | 0, t / e.pow(s, o)).toFixed(0) + " " + (o ? "KMGTPEZY"[--o] + "iB" : "B");
}
function Ms(t, e, n, s, o) {
  return (e = Math, n = e.log, s = 1e3, o = n(t) / n(s) | 0, t / e.pow(s, o)).toFixed(0) + " " + (o ? "KMGTPEZY"[--o] + "B" : "B");
}
const Je = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function Zo(t, e) {
  const n = O(Je.SYSTEM), s = O(Je.LIGHT);
  n.value = t.getStore("theme", e ?? Je.SYSTEM);
  const o = window.matchMedia("(prefers-color-scheme: dark)"), a = (i) => {
    n.value === Je.DARK || n.value === Je.SYSTEM && i.matches ? s.value = Je.DARK : s.value = Je.LIGHT;
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
      n.value = i, i !== Je.SYSTEM ? t.setStore("theme", i) : t.removeStore("theme"), a(o);
    }
  };
}
function er() {
  const t = Lo(null), e = O(!1), n = O();
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
  const d = (v, m) => {
    const _ = a, y = v, h = m || (s ? !s(_, y) : _ !== y);
    return (h || o) && (a = y, i = _), [a, h, i];
  };
  return [e ? (v) => d(e(a, i), v) : d, (v) => [a, !!v, i]];
}, Ls = typeof window < "u" && typeof document < "u", De = Ls ? window : {}, jt = Math.max, tr = Math.min, An = Math.round, Os = De.cancelAnimationFrame, Bs = De.requestAnimationFrame, Kt = De.setTimeout, Tn = De.clearTimeout, on = (t) => typeof De[t] < "u" ? De[t] : void 0, nr = on("MutationObserver"), ss = on("IntersectionObserver"), Xt = on("ResizeObserver"), Dn = on("ScrollTimeline"), Rs = Ls && Node.ELEMENT_NODE, { toString: sr, hasOwnProperty: wn } = Object.prototype, or = /^\[object (.+)\]$/, It = (t) => t === void 0, rn = (t) => t === null, rr = (t) => It(t) || rn(t) ? `${t}` : sr.call(t).replace(or, "$1").toLowerCase(), ze = (t) => typeof t == "number", ln = (t) => typeof t == "string", Is = (t) => typeof t == "boolean", Ge = (t) => typeof t == "function", Ue = (t) => Array.isArray(t), Bt = (t) => typeof t == "object" && !Ue(t) && !rn(t), an = (t) => {
  const e = !!t && t.length, n = ze(e) && e > -1 && e % 1 == 0;
  return Ue(t) || !Ge(t) && n ? e > 0 && Bt(t) ? e - 1 in t : !0 : !1;
}, Jt = (t) => {
  if (!t || !Bt(t) || rr(t) !== "object")
    return !1;
  let e;
  const n = "constructor", s = t[n], o = s && s.prototype, a = wn.call(t, n), i = o && wn.call(o, "isPrototypeOf");
  if (s && !a && !i)
    return !1;
  for (e in t)
    ;
  return It(e) || wn.call(t, e);
}, Qt = (t) => {
  const e = HTMLElement;
  return t ? e ? t instanceof e : t.nodeType === Rs : !1;
}, cn = (t) => {
  const e = Element;
  return t ? e ? t instanceof e : t.nodeType === Rs : !1;
};
function se(t, e) {
  if (an(t))
    for (let n = 0; n < t.length && e(t[n], n, t) !== !1; n++)
      ;
  else t && se(Object.keys(t), (n) => e(t[n], n, t));
  return t;
}
const dn = (t, e) => t.indexOf(e) >= 0, We = (t, e) => t.concat(e), fe = (t, e, n) => (!ln(e) && an(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), ut = (t) => Array.from(t || []), Fs = (t) => Ue(t) ? t : [t], Vn = (t) => !!t && !t.length, os = (t) => ut(new Set(t)), Be = (t, e, n) => {
  se(t, (o) => o && o.apply(void 0, e || [])), !n && (t.length = 0);
}, Hs = "paddingTop", Ns = "paddingRight", Us = "paddingLeft", Ps = "paddingBottom", qs = "marginLeft", zs = "marginRight", Gs = "marginBottom", un = "overflowX", vn = "overflowY", St = "width", xt = "height", $t = "hidden", js = "visible", zn = (t, e, n, s) => {
  if (t && e) {
    let o = !0;
    return se(n, (a) => {
      const i = t[a], d = e[a];
      i !== d && (o = !1);
    }), o;
  }
  return !1;
}, Ws = (t, e) => zn(t, e, ["w", "h"]), Ys = (t, e) => zn(t, e, ["x", "y"]), lr = (t, e) => zn(t, e, ["t", "r", "b", "l"]), Ne = () => {
}, Y = (t, ...e) => t.bind(0, ...e), ht = (t) => {
  let e;
  const n = t ? Kt : Bs, s = t ? Tn : Os;
  return [(o) => {
    s(e), e = n(o, Ge(t) ? t() : t);
  }, () => s(e)];
}, Ks = (t, e) => {
  let n, s, o, a = Ne;
  const { v: i, p: d, S: c } = e || {}, u = function(h) {
    a(), Tn(n), n = s = void 0, a = Ne, t.apply(this, h);
  }, v = (y) => c && s ? c(s, y) : y, m = () => {
    a !== Ne && u(v(o) || o);
  }, _ = function() {
    const h = ut(arguments), p = Ge(i) ? i() : i;
    if (ze(p) && p >= 0) {
      const E = Ge(d) ? d() : d, $ = ze(E) && E >= 0, w = p > 0 ? Kt : Bs, x = p > 0 ? Tn : Os, H = v(h) || h, C = u.bind(0, H);
      a();
      const S = w(C, p);
      a = () => x(S), $ && !n && (n = Kt(m, E)), s = o = H;
    } else
      u(h);
  };
  return _.m = m, _;
}, Xs = (t, e) => Object.prototype.hasOwnProperty.call(t, e), et = (t) => t ? Object.keys(t) : [], ne = (t, e, n, s, o, a, i) => {
  const d = [e, n, s, o, a, i];
  return (typeof t != "object" || rn(t)) && !Ge(t) && (t = {}), se(d, (c) => {
    se(c, (u, v) => {
      const m = c[v];
      if (t === m)
        return !0;
      const _ = Ue(m);
      if (m && Jt(m)) {
        const y = t[v];
        let h = y;
        _ && !Ue(y) ? h = [] : !_ && !Jt(y) && (h = {}), t[v] = ne(h, m);
      } else
        t[v] = _ ? m.slice() : m;
    });
  }), t;
}, Js = (t, e) => se(ne({}, t), (n, s, o) => {
  n === void 0 ? delete o[s] : n && Jt(n) && (o[s] = Js(n));
}), Gn = (t) => {
  for (const e in t)
    return !1;
  return !0;
}, Mn = (t, e, n) => jt(t, tr(e, n)), it = (t) => ut(new Set((Ue(t) ? t : (t || "").split(" ")).filter((e) => e))), fn = (t, e) => t && t.getAttribute(e), rs = (t, e) => t && t.hasAttribute(e), Fe = (t, e, n) => {
  se(it(e), (s) => {
    t && t.setAttribute(s, n || "");
  });
}, qe = (t, e) => {
  se(it(e), (n) => t && t.removeAttribute(n));
}, _n = (t, e) => {
  const n = it(fn(t, e)), s = Y(Fe, t, e), o = (a, i) => {
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
  _n(t, e).$(n);
}, Rt = (t, e, n) => (_n(t, e).O(n), Y(Qs, t, e, n)), Wt = (t, e, n, s) => {
  (s ? Rt : Qs)(t, e, n);
}, ar = (t, e, n) => _n(t, e).C(n), Zs = (t) => _n(t, "class"), jn = (t, e) => {
  Zs(t).$(e);
}, Zt = (t, e) => (Zs(t).O(e), Y(jn, t, e)), eo = (t, e) => {
  const n = [], s = e ? cn(e) && e : document;
  return s ? fe(n, s.querySelectorAll(t)) : n;
}, ir = (t, e) => {
  const n = e ? cn(e) && e : document;
  return n ? n.querySelector(t) : null;
}, en = (t, e) => cn(t) ? t.matches(e) : !1, to = (t) => en(t, "body"), Ln = (t) => t ? ut(t.childNodes) : [], Ct = (t) => t && t.parentElement, gt = (t, e) => cn(t) && t.closest(e), On = (t) => document.activeElement, cr = (t, e, n) => {
  const s = gt(t, e), o = t && ir(n, s), a = gt(o, e) === s;
  return s && o ? s === t || o === t || a && gt(gt(t, n), e) !== s : !1;
}, tt = (t) => {
  if (an(t))
    se(ut(t), (e) => tt(e));
  else if (t) {
    const e = Ct(t);
    e && e.removeChild(t);
  }
}, no = (t, e, n) => {
  if (n && t) {
    let s = e, o;
    return an(n) ? (o = document.createDocumentFragment(), se(n, (a) => {
      a === s && (s = a.previousSibling), o.appendChild(a);
    })) : o = n, e && (s ? s !== e && (s = s.nextSibling) : s = t.firstChild), t.insertBefore(o, s || null), () => tt(n);
  }
  return Ne;
}, Te = (t, e) => no(t, null, e), ls = (t, e) => no(Ct(t), t && t.nextSibling, e), bt = (t) => {
  const e = document.createElement("div");
  return Fe(e, "class", t), e;
}, so = (t) => {
  const e = bt();
  return e.innerHTML = t.trim(), se(Ln(e), (n) => tt(n));
}, dr = /^--/, as = (t, e) => t.getPropertyValue(e) || t[e] || "", Wn = (t) => {
  const e = t || 0;
  return isFinite(e) ? e : 0;
}, zt = (t) => Wn(parseFloat(t || "")), is = (t) => `${(Wn(t) * 100).toFixed(3)}%`, Bn = (t) => `${Wn(t)}px`;
function Et(t, e) {
  t && se(e, (n, s) => {
    try {
      const o = t.style, a = ze(n) ? Bn(n) : (n || "") + "";
      dr.test(s) ? o.setProperty(s, a) : o[s] = a;
    } catch {
    }
  });
}
function ct(t, e, n) {
  const s = ln(e);
  let o = s ? "" : {};
  if (t) {
    const a = De.getComputedStyle(t, n) || t.style;
    o = s ? as(a, e) : e.reduce((i, d) => (i[d] = as(a, d), i), o);
  }
  return o;
}
const Qe = (t) => ct(t, "direction") === "rtl", cs = (t, e, n) => {
  const s = e ? `${e}-` : "", o = n ? `-${n}` : "", a = `${s}top${o}`, i = `${s}right${o}`, d = `${s}bottom${o}`, c = `${s}left${o}`, u = ct(t, [a, i, d, c]);
  return {
    t: zt(u[a]),
    r: zt(u[i]),
    b: zt(u[d]),
    l: zt(u[c])
  };
}, yn = (t, e) => `translate${Bt(t) ? `(${t.x},${t.y})` : `${e ? "X" : "Y"}(${t})`}`, ur = {
  w: 0,
  h: 0
}, mn = (t, e) => e ? {
  w: e[`${t}Width`],
  h: e[`${t}Height`]
} : ur, vr = (t) => mn("inner", t || De), Lt = Y(mn, "offset"), oo = Y(mn, "client"), Rn = Y(mn, "scroll"), Yn = (t) => {
  const e = parseFloat(ct(t, St)) || 0, n = parseFloat(ct(t, xt)) || 0;
  return {
    w: e - An(e),
    h: n - An(n)
  };
}, wt = (t) => t.getBoundingClientRect(), In = (t) => !!(t && (t[xt] || t[St])), ro = (t, e) => {
  const n = In(t);
  return !In(e) && n;
}, ds = (t, e, n, s) => {
  se(it(e), (o) => {
    t.removeEventListener(o, n, s);
  });
}, ue = (t, e, n, s) => {
  var o;
  const a = (o = s && s.H) != null ? o : !0, i = s && s.I || !1, d = s && s.A || !1, c = {
    passive: a,
    capture: i
  };
  return Y(Be, it(e).map((u) => {
    const v = d ? (m) => {
      ds(t, u, v, i), n(m);
    } : n;
    return t.addEventListener(u, v, c), Y(ds, t, u, v, i);
  }));
}, Kn = (t) => t.stopPropagation(), us = (t) => t.preventDefault(), fr = {
  x: 0,
  y: 0
}, kn = (t) => {
  const e = t && wt(t);
  return e ? {
    x: e.left + De.scrollX,
    y: e.top + De.scrollY
  } : fr;
}, tn = (t, e, n) => n ? n.n ? -t + 0 : n.i ? e - t : t : t, vs = (t, e) => [tn(0, t, e), tn(t, t, e)], fs = (t, e, n) => Mn(0, 1, tn(t, e, n) / e || 0), nt = (t, e) => {
  const { x: n, y: s } = ze(e) ? {
    x: e,
    y: e
  } : e || {};
  ze(n) && (t.scrollLeft = n), ze(s) && (t.scrollTop = s);
}, At = (t) => ({
  x: t.scrollLeft,
  y: t.scrollTop
}), _s = (t, e) => {
  se(Fs(e), t);
}, Fn = (t) => {
  const e = /* @__PURE__ */ new Map(), n = (a, i) => {
    if (a) {
      const d = e.get(a);
      _s((c) => {
        d && d[c ? "delete" : "clear"](c);
      }, i);
    } else
      e.forEach((d) => {
        d.clear();
      }), e.clear();
  }, s = (a, i) => {
    if (ln(a)) {
      const u = e.get(a) || /* @__PURE__ */ new Set();
      return e.set(a, u), _s((v) => {
        Ge(v) && u.add(v);
      }, i), Y(n, a, i);
    }
    Is(i) && i && n();
    const d = et(a), c = [];
    return se(d, (u) => {
      const v = a[u];
      v && fe(c, s(u, v));
    }), Y(Be, c);
  }, o = (a, i) => {
    se(ut(e.get(a)), (d) => {
      i && !Vn(i) ? d.apply(0, i) : d();
    });
  };
  return s(t || {}), [s, n, o];
}, ms = (t) => JSON.stringify(t, (e, n) => {
  if (Ge(n))
    throw 0;
  return n;
}), ps = (t, e) => t ? `${e}`.split(".").reduce((n, s) => n && Xs(n, s) ? n[s] : void 0, t) : void 0, _r = {
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
  const n = {}, s = We(et(e), et(t));
  return se(s, (o) => {
    const a = t[o], i = e[o];
    if (Bt(a) && Bt(i))
      ne(n[o] = {}, lo(a, i)), Gn(n[o]) && delete n[o];
    else if (Xs(e, o) && i !== a) {
      let d = !0;
      if (Ue(a) || Ue(i))
        try {
          ms(a) === ms(i) && (d = !1);
        } catch {
        }
      d && (n[o] = i);
    }
  }), n;
}, hs = (t, e, n) => (s) => [ps(t, s), n || ps(e, s) !== void 0], Ft = "data-overlayscrollbars", Yt = "os-environment", Gt = `${Yt}-scrollbar-hidden`, Sn = `${Ft}-initialize`, Ae = Ft, ao = `${Ae}-overflow-x`, io = `${Ae}-overflow-y`, co = "overflowVisible", mr = "scrollbarPressed", Hn = "updating", pr = "body", je = `${Ft}-viewport`, hr = "arrange", uo = "scrollbarHidden", yt = co, Nn = `${Ft}-padding`, gr = yt, gs = `${Ft}-content`, Xn = "os-size-observer", br = `${Xn}-appear`, wr = `${Xn}-listener`, yr = "os-trinsic-observer", kr = "os-theme-none", Ve = "os-scrollbar", Sr = `${Ve}-rtl`, xr = `${Ve}-horizontal`, $r = `${Ve}-vertical`, vo = `${Ve}-track`, Jn = `${Ve}-handle`, Cr = `${Ve}-visible`, Er = `${Ve}-cornerless`, bs = `${Ve}-interaction`, ws = `${Ve}-unusable`, Un = `${Ve}-auto-hide`, ys = `${Un}-hidden`, ks = `${Ve}-wheel`, Ar = `${vo}-interactive`, Tr = `${Jn}-interactive`, fo = {}, _o = {}, Dr = (t) => {
  se(t, (e) => se(e, (n, s) => {
    fo[s] = e[s];
  }));
}, mo = (t, e, n) => et(t).map((s) => {
  const { static: o, instance: a } = t[s], [i, d, c] = n || [], u = n ? a : o;
  if (u) {
    const v = n ? u(i, d, e) : u(e);
    return (c || _o)[s] = v;
  }
}), Vt = (t) => _o[t], Vr = "__osOptionsValidationPlugin", Mr = "__osSizeObserverPlugin", Lr = (t, e) => {
  const { T: n } = e, [s, o] = t("showNativeOverlaidScrollbars");
  return [s && n.x && n.y, o];
}, nn = (t) => t.indexOf(js) === 0, po = (t, e) => {
  const { D: n } = t, s = (c) => {
    const u = ct(n, c), m = (e ? e[c] : u) === "scroll";
    return [u, m];
  }, [o, a] = s(un), [i, d] = s(vn);
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
}, Or = (t, e, n, s) => {
  const o = e.x || e.y, a = (v, m) => {
    const _ = nn(v), y = _ && o ? "hidden" : "", h = m && _ && v.replace(`${js}-`, "") || y;
    return [m && !_ ? v : "", nn(h) ? "hidden" : h];
  }, [i, d] = a(n.x, e.x), [c, u] = a(n.y, e.y);
  return s[un] = d && c ? d : i, s[vn] = u && i ? u : c, po(t, s);
}, Qn = "__osScrollbarsHidingPlugin", Br = "__osClickScrollPlugin";
let xn;
const Rr = () => {
  const t = (w, x, I) => {
    Te(document.body, w), Te(document.body, w);
    const H = oo(w), C = Lt(w), S = Yn(x);
    return I && tt(w), {
      x: C.h - H.h + S.h,
      y: C.w - H.w + S.w
    };
  }, e = (w) => {
    let x = !1;
    const I = Zt(w, Gt);
    try {
      x = ct(w, "scrollbar-width") === "none" || ct(w, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return I(), x;
  }, n = (w, x) => {
    Et(w, {
      [un]: $t,
      [vn]: $t,
      direction: "rtl"
    }), nt(w, {
      x: 0
    });
    const I = kn(w), H = kn(x);
    nt(w, {
      x: -999
    });
    const C = kn(x);
    return {
      i: I.x === H.x,
      n: H.x !== C.x
    };
  }, s = `.${Yt}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Yt} div{width:200%;height:200%;margin:10px 0}.${Gt}{scrollbar-width:none!important}.${Gt}::-webkit-scrollbar,.${Gt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, a = so(`<div class="${Yt}"><div></div><style>${s}</style></div>`)[0], i = a.firstChild, [d, , c] = Fn(), [u, v] = He({
    o: t(a, i),
    u: Ys
  }, Y(t, a, i, !0)), [m] = v(), _ = e(a), y = {
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
  }, p = ne({}, _r), g = Y(ne, {}, p), E = Y(ne, {}, h), $ = {
    P: m,
    T: y,
    L: _,
    J: !!Dn,
    K: n(a, i),
    Z: Y(d, "r"),
    G: E,
    tt: (w) => ne(h, w) && E(),
    nt: g,
    ot: (w) => ne(p, w) && g(),
    st: ne({}, h),
    et: ne({}, p)
  };
  return qe(a, "style"), tt(a), De.addEventListener("resize", () => {
    let w;
    if (!_ && (!y.x || !y.y)) {
      const x = Vt(Qn);
      w = !!(x ? x.Y() : Ne)($, u);
    }
    c("r", [w]);
  }), $;
}, Re = () => (xn || (xn = Rr()), xn), ho = (t, e) => Ge(e) ? e.apply(0, t) : e, Ir = (t, e, n, s) => {
  const o = It(s) ? n : s;
  return ho(t, o) || e.apply(0, t);
}, go = (t, e, n, s) => {
  const o = It(s) ? n : s, a = ho(t, o);
  return !!a && (Qt(a) ? a : e.apply(0, t));
}, Fr = (t, e) => {
  const { nativeScrollbarsOverlaid: n, body: s } = e || {}, { T: o, L: a, G: i } = Re(), { nativeScrollbarsOverlaid: d, body: c } = i().cancel, u = n ?? d, v = It(s) ? c : s, m = (o.x || o.y) && u, _ = t && (rn(v) ? !a : v);
  return !!m || !!_;
}, Zn = /* @__PURE__ */ new WeakMap(), Hr = (t, e) => {
  Zn.set(t, e);
}, Nr = (t) => {
  Zn.delete(t);
}, bo = (t) => Zn.get(t), Ur = (t, e, n) => {
  let s = !1;
  const o = n ? /* @__PURE__ */ new WeakMap() : !1, a = () => {
    s = !0;
  }, i = (d) => {
    if (o && n) {
      const c = n.map((u) => {
        const [v, m] = u || [];
        return [m && v ? (d || eo)(v, t) : [], m];
      });
      se(c, (u) => se(u[0], (v) => {
        const m = u[1], _ = o.get(v) || [];
        if (t.contains(v) && m) {
          const h = ue(v, m, (p) => {
            s ? (h(), o.delete(v)) : e(p);
          });
          o.set(v, fe(_, h));
        } else
          Be(_), o.delete(v);
      }));
    }
  };
  return i(), [a, i];
}, Ss = (t, e, n, s) => {
  let o = !1;
  const { ct: a, rt: i, lt: d, it: c, ut: u, dt: v } = s || {}, m = Ks(() => o && n(!0), {
    v: 33,
    p: 99
  }), [_, y] = Ur(t, m, d), h = a || [], p = i || [], g = We(h, p), E = (w, x) => {
    if (!Vn(x)) {
      const I = u || Ne, H = v || Ne, C = [], S = [];
      let V = !1, L = !1;
      if (se(x, (A) => {
        const { attributeName: U, target: R, type: j, oldValue: J, addedNodes: oe, removedNodes: z } = A, Q = j === "attributes", de = j === "childList", q = t === R, ie = Q && U, ae = ie && fn(R, U || "") || null, ce = ie && J !== ae, ke = dn(p, U) && ce;
        if (e && (de || !q)) {
          const ge = Q && ce, _e = ge && c && en(R, c), M = (_e ? !I(R, U, J, ae) : !Q || ge) && !H(A, !!_e, t, s);
          se(oe, (D) => fe(C, D)), se(z, (D) => fe(C, D)), L = L || M;
        }
        !e && q && ce && !I(R, U, J, ae) && (fe(S, U), V = V || ke);
      }), y((A) => os(C).reduce((U, R) => (fe(U, eo(A, R)), en(R, A) ? fe(U, R) : U), [])), e)
        return !w && L && n(!1), [!1];
      if (!Vn(S) || V) {
        const A = [os(S), V];
        return !w && n.apply(0, A), A;
      }
    }
  }, $ = new nr(Y(E, !1));
  return [() => ($.observe(t, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: g,
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
  const { ft: o, _t: a } = n || {}, i = Vt(Mr), { K: d } = Re(), c = Y(Qe, t), [u] = He({
    o: !1,
    _: !0
  });
  return () => {
    const v = [], _ = so(`<div class="${Xn}"><div class="${wr}"></div></div>`)[0], y = _.firstChild, h = (p) => {
      const g = p instanceof ResizeObserverEntry, E = !g && Ue(p);
      let $ = !1, w = !1, x = !0;
      if (g) {
        const [I, , H] = u(p.contentRect), C = In(I), S = ro(I, H);
        w = !H || S, $ = !w && !C, x = !$;
      } else E ? [, x] = p : w = p === !0;
      if (o && x) {
        const I = E ? p[0] : Qe(_);
        nt(_, {
          x: tn(3333333, 3333333, I && d),
          y: 3333333
        });
      }
      $ || e({
        vt: E ? p : void 0,
        ht: !E,
        _t: w
      });
    };
    if (Xt) {
      const p = new Xt((g) => h(g.pop()));
      p.observe(y), fe(v, () => {
        p.disconnect();
      });
    } else if (i) {
      const [p, g] = i(y, h, a);
      fe(v, We([Zt(_, br), ue(_, "animationstart", p)], g));
    } else
      return Ne;
    if (o) {
      const [p] = He({
        o: void 0
      }, c);
      fe(v, ue(_, "scroll", (g) => {
        const E = p(), [$, w, x] = E;
        w && (jn(y, "ltr rtl"), Zt(y, $ ? "rtl" : "ltr"), h([!!$, w, x])), Kn(g);
      }));
    }
    return Y(Be, fe(v, Te(t, _)));
  };
}, Pr = (t, e) => {
  let n;
  const s = (c) => c.h === 0 || c.isIntersecting || c.intersectionRatio > 0, o = bt(yr), [a] = He({
    o: !1
  }), i = (c, u) => {
    if (c) {
      const v = a(s(c)), [, m] = v;
      return m && !u && e(v) && [v];
    }
  }, d = (c, u) => i(u.pop(), c);
  return [() => {
    const c = [];
    if (ss)
      n = new ss(Y(d, !1), {
        root: t
      }), n.observe(o), fe(c, () => {
        n.disconnect();
      });
    else {
      const u = () => {
        const v = Lt(o);
        i(v);
      };
      fe(c, wo(o, u)()), u();
    }
    return Y(Be, fe(c, Te(t, o)));
  }, () => n && d(!0, n.takeRecords())];
}, qr = (t, e, n, s) => {
  let o, a, i, d, c, u;
  const { L: v } = Re(), m = `[${Ae}]`, _ = `[${je}]`, y = ["tabindex"], h = ["wrap", "cols", "rows"], p = ["id", "class", "style", "open"], { gt: g, bt: E, D: $, wt: w, yt: x, V: I, St: H, $t: C } = t, S = {
    Ot: !1,
    N: Qe(g)
  }, V = Re(), L = Vt(Qn), [A] = He({
    u: Ws,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const T = L && L.M(t, e, S, V, n).W, M = H(yt), D = !I && H(hr), B = D && At($);
    C(yt), I && C(Hn, !0);
    const N = D && T && T()[0], P = Rn(w), Z = Rn($), te = Yn($);
    return C(yt, M), I && C(Hn), N && N(), nt($, B), {
      w: Z.w + P.w + te.w,
      h: Z.h + P.h + te.h
    };
  }), U = x ? h : We(p, h), R = Ks(s, {
    v: () => o,
    p: () => a,
    S(T, M) {
      const [D] = T, [B] = M;
      return [We(et(D), et(B)).reduce((N, P) => (N[P] = D[P] || B[P], N), {})];
    }
  }), j = (T) => {
    if (I) {
      const M = Qe(g);
      ne(T, {
        Ct: u !== M
      }), ne(S, {
        N: M
      }), u = M;
    }
  }, J = (T) => {
    se(T || y, (M) => {
      if (dn(y, M)) {
        const D = fn(E, M);
        ln(D) ? Fe($, M, D) : qe($, M);
      }
    });
  }, oe = (T, M) => {
    const [D, B] = T, N = {
      xt: B
    };
    return ne(S, {
      Ot: D
    }), !M && s(N), N;
  }, z = ({ ht: T, vt: M, _t: D }) => {
    const N = !(T && !D && !M) && v ? R : s, [P, Z] = M || [], te = {
      ht: T || D,
      _t: D,
      Ct: Z
    };
    j(te), M && ne(S, {
      N: P
    }), N(te);
  }, Q = (T, M) => {
    const [, D] = A(), B = {
      Ht: D
    };
    return j(B), D && !M && (T ? s : R)(B), B;
  }, de = (T, M, D) => {
    const B = {
      zt: M
    };
    return j(B), M && !D ? R(B) : I || J(T), B;
  }, { Z: q } = V, [ie, ae] = w ? Pr(E, oe) : [], ce = !I && wo(E, z, {
    _t: !0,
    ft: !0
  }), [ke, ge] = Ss(E, !1, de, {
    rt: p,
    ct: We(p, y)
  }), _e = I && Xt && new Xt((T) => {
    const M = T[T.length - 1].contentRect;
    z({
      ht: !0,
      _t: ro(M, c)
    }), c = M;
  });
  return [() => {
    J(), _e && _e.observe(E);
    const T = ce && ce(), M = ie && ie(), D = ke(), B = q((N) => {
      const [, P] = A();
      R({
        It: N,
        Ht: P
      });
    });
    return () => {
      _e && _e.disconnect(), T && T(), M && M(), d && d(), D(), B();
    };
  }, ({ Et: T, At: M, Tt: D }) => {
    const B = {}, [N] = T("update.ignoreMutation"), [P, Z] = T("update.attributes"), [te, me] = T("update.elementEvents"), [be, X] = T("update.debounce"), we = me || Z, Se = M || D, Ie = (re) => Ge(N) && N(re);
    if (we) {
      i && i(), d && d();
      const [re, xe] = Ss(w || $, !0, Q, {
        ct: We(U, P || []),
        lt: te,
        it: m,
        dt: (Me, he) => {
          const { target: Le, attributeName: Ht } = Me;
          return (!he && Ht && !I ? cr(Le, m, _) : !1) || !!gt(Le, `.${Ve}`) || !!Ie(Me);
        }
      });
      d = re(), i = xe;
    }
    if (X)
      if (R.m(), Ue(be)) {
        const re = be[0], xe = be[1];
        o = ze(re) && re, a = ze(xe) && xe;
      } else ze(be) ? (o = be, a = !1) : (o = !1, a = !1);
    if (Se) {
      const re = ge(), xe = ae && ae(), Me = i && i();
      re && ne(B, de(re[0], re[1], Se)), xe && ne(B, oe(xe[0], Se)), Me && ne(B, Q(Me[0], Se));
    }
    return j(B), B;
  }, S];
}, zr = (t, e, n, s) => {
  const { G: o, K: a } = Re(), { scrollbars: i } = o(), { slot: d } = i, { gt: c, bt: u, D: v, Dt: m, kt: _, Rt: y, V: h } = e, { scrollbars: p } = m ? {} : t, { slot: g } = p || {}, E = /* @__PURE__ */ new Map(), $ = (T) => Dn && new Dn({
    source: _,
    axis: T
  }), w = $("x"), x = $("y"), I = go([c, u, v], () => h && y ? c : u, d, g), H = (T, M) => {
    if (M) {
      const te = T ? St : xt, { Mt: me, Vt: be } = M, X = wt(be)[te], we = wt(me)[te];
      return Mn(0, 1, X / we || 0);
    }
    const D = T ? "x" : "y", { Lt: B, Pt: N } = n, P = N[D], Z = B[D];
    return Mn(0, 1, P / (P + Z) || 0);
  }, C = (T, M, D, B) => {
    const N = H(D, T);
    return 1 / N * (1 - N) * (B ? 1 - M : M) || 0;
  }, S = (T, M) => ne(T, M ? {
    clear: ["left"]
  } : {}), V = (T) => {
    E.forEach((M, D) => {
      (T ? dn(Fs(T), D) : !0) && (se(M || [], (N) => {
        N && N.cancel();
      }), E.delete(D));
    });
  }, L = (T, M, D, B) => {
    const N = E.get(T) || [], P = N.find((Z) => Z && Z.timeline === M);
    P ? P.effect = new KeyframeEffect(T, D, {
      composite: B
    }) : E.set(T, We(N, [T.animate(D, {
      timeline: M,
      composite: B
    })]));
  }, A = (T, M, D) => {
    const B = D ? Zt : jn;
    se(T, (N) => {
      B(N.Ut, M);
    });
  }, U = (T, M) => {
    se(T, (D) => {
      const [B, N] = M(D);
      Et(B, N);
    });
  }, R = (T, M) => {
    U(T, (D) => {
      const { Vt: B } = D;
      return [B, {
        [M ? St : xt]: is(H(M))
      }];
    });
  }, j = (T, M) => {
    const { Lt: D } = n, B = M ? D.x : D.y, N = (P, Z, te) => yn(is(C(P, fs(Z, B, te), M, te)), M);
    if (w && x)
      se(T, (P) => {
        const { Ut: Z, Vt: te } = P, me = M && Qe(Z) && a;
        L(te, M ? w : x, S({
          transform: vs(B, me).map((be) => N(P, be, me))
        }, me));
      });
    else {
      const P = At(_);
      U(T, (Z) => {
        const { Vt: te, Ut: me } = Z;
        return [te, {
          transform: N(Z, M ? P.x : P.y, M && Qe(me) && a)
        }];
      });
    }
  }, J = (T) => h && !y && Ct(T) === v, oe = [], z = [], Q = [], de = (T, M, D) => {
    const B = Is(D), N = B ? D : !0, P = B ? !D : !0;
    N && A(z, T, M), P && A(Q, T, M);
  }, q = () => {
    R(z, !0), R(Q);
  }, ie = () => {
    j(z, !0), j(Q);
  }, ae = () => {
    if (h) {
      const { Lt: T } = n, M = 0.5;
      if (w && x)
        se(We(Q, z), ({ Ut: D }) => {
          if (J(D)) {
            const B = (N, P, Z) => {
              const te = Z && Qe(D) && a;
              L(D, N, S({
                transform: vs(P - M, te).map((me) => yn(Bn(me), Z))
              }, te), "add");
            };
            B(w, T.x, !0), B(x, T.y);
          } else
            V(D);
        });
      else {
        const D = At(_), B = (N) => {
          const { Ut: P } = N, Z = J(P) && P, te = (me, be, X) => {
            const we = fs(me, be, X), Se = be * we;
            return Bn(X ? -Se : Se);
          };
          return [Z, {
            transform: Z ? yn({
              x: te(D.x, T.x, Qe(P) && a),
              y: te(D.y, T.y)
            }) : ""
          }];
        };
        U(z, B), U(Q, B);
      }
    }
  }, ce = (T) => {
    const D = bt(`${Ve} ${T ? xr : $r}`), B = bt(vo), N = bt(Jn), P = {
      Ut: D,
      Mt: B,
      Vt: N
    };
    return fe(T ? z : Q, P), fe(oe, [Te(D, B), Te(B, N), Y(tt, D), V, s(P, de, j, T)]), P;
  }, ke = Y(ce, !0), ge = Y(ce, !1), _e = () => (Te(I, z[0].Ut), Te(I, Q[0].Ut), Y(Be, oe));
  return ke(), ge(), [{
    Bt: q,
    Nt: ie,
    jt: ae,
    Ft: de,
    qt: {
      J: w,
      Wt: z,
      Xt: ke,
      Yt: Y(U, z)
    },
    Jt: {
      J: x,
      Wt: Q,
      Xt: ge,
      Yt: Y(U, Q)
    }
  }, _e];
}, Gr = (t, e, n, s) => {
  const { bt: o, D: a, V: i, kt: d, Kt: c } = e;
  return (u, v, m, _) => {
    const { Ut: y, Mt: h, Vt: p } = u, [g, E] = ht(333), [$, w] = ht(), x = Y(m, [u], _), I = !!d.scrollBy, H = `client${_ ? "X" : "Y"}`, C = _ ? St : xt, S = _ ? "left" : "top", V = _ ? "w" : "h", L = _ ? "x" : "y", A = (j) => j.propertyName.indexOf(C) > -1, U = () => {
      const j = "pointerup pointerleave pointercancel lostpointercapture", J = (oe, z) => (Q) => {
        const { Lt: de } = n, q = Lt(h)[V] - Lt(p)[V], ae = z * Q / q * de[L];
        nt(d, {
          [L]: oe + ae
        });
      };
      return ue(h, "pointerdown", (oe) => {
        const z = gt(oe.target, `.${Jn}`) === p, Q = z ? p : h, de = t.scrollbars, { button: q, isPrimary: ie, pointerType: ae } = oe, { pointers: ce } = de;
        if (q === 0 && ie && de[z ? "dragScroll" : "clickScroll"] && (ce || []).includes(ae)) {
          const ge = !z && oe.shiftKey, _e = Y(wt, p), T = Y(wt, h), M = (re, xe) => (re || _e())[S] - (xe || T())[S], D = An(wt(d)[C]) / Lt(d)[V] || 1, B = J(At(d)[L] || 0, 1 / D), N = oe[H], P = _e(), Z = T(), te = P[C], me = M(P, Z) + te / 2, be = N - Z[S], X = z ? 0 : be - me, we = (re) => {
            Be(Ie), Q.releasePointerCapture(re.pointerId);
          }, Ie = [Rt(o, Ae, mr), ue(c, j, we), ue(c, "selectstart", (re) => us(re), {
            H: !1
          }), ue(h, j, we), ue(h, "pointermove", (re) => {
            const xe = re[H] - N;
            (z || ge) && B(X + xe);
          })];
          if (Q.setPointerCapture(oe.pointerId), ge)
            B(X);
          else if (!z) {
            const re = Vt(Br);
            re && fe(Ie, re(B, M, X, te, be));
          }
        }
      });
    };
    let R = !0;
    return Y(Be, [ue(p, "pointermove pointerleave", s), ue(y, "pointerenter", () => {
      v(bs, !0);
    }), ue(y, "pointerleave pointercancel", () => {
      v(bs, !1);
    }), !i && ue(y, "mousedown", () => {
      const j = On();
      (rs(j, je) || rs(j, Ae) || j === document.body) && Kt(() => {
        a.focus({
          preventScroll: !0
        });
      }, 25);
    }), ue(y, "wheel", (j) => {
      const { deltaX: J, deltaY: oe, deltaMode: z } = j;
      I && R && z === 0 && Ct(y) === o && d.scrollBy({
        left: J,
        top: oe,
        behavior: "smooth"
      }), R = !1, v(ks, !0), g(() => {
        R = !0, v(ks);
      }), us(j);
    }, {
      H: !1,
      I: !0
    }), ue(p, "transitionstart", (j) => {
      if (A(j)) {
        const J = () => {
          x(), $(J);
        };
        J();
      }
    }), ue(p, "transitionend transitioncancel", (j) => {
      A(j) && (w(), x());
    }), ue(y, "mousedown", Y(ue, c, "click", Kn, {
      A: !0,
      I: !0
    }), {
      I: !0
    }), U(), E, w]);
  };
}, jr = (t, e, n, s, o, a) => {
  let i, d, c, u, v, m = Ne, _ = 0;
  const y = (q) => q.pointerType === "mouse", [h, p] = ht(), [g, E] = ht(100), [$, w] = ht(100), [x, I] = ht(() => _), [H, C] = zr(t, o, s, Gr(e, o, s, (q) => y(q) && oe())), { bt: S, Zt: V, Rt: L } = o, { Ft: A, Bt: U, Nt: R, jt: j } = H, J = (q, ie) => {
    if (I(), q)
      A(ys);
    else {
      const ae = Y(A, ys, !0);
      _ > 0 && !ie ? x(ae) : ae();
    }
  }, oe = () => {
    (c ? !i : !u) && (J(!0), g(() => {
      J(!1);
    }));
  }, z = (q) => {
    A(Un, q, !0), A(Un, q, !1);
  }, Q = (q) => {
    y(q) && (i = c, c && J(!0));
  }, de = [I, E, w, p, () => m(), ue(S, "pointerover", Q, {
    A: !0
  }), ue(S, "pointerenter", Q), ue(S, "pointerleave", (q) => {
    y(q) && (i = !1, c && J(!1));
  }), ue(S, "pointermove", (q) => {
    y(q) && d && oe();
  }), ue(V, "scroll", (q) => {
    h(() => {
      R(), oe();
    }), a(q), j();
  })];
  return [() => Y(Be, fe(de, C())), ({ Et: q, Tt: ie, Gt: ae, Qt: ce }) => {
    const { tn: ke, nn: ge, sn: _e } = ce || {}, { Ct: T, _t: M } = ae || {}, { N: D } = n, { T: B } = Re(), { k: N, en: P } = s, [Z, te] = q("showNativeOverlaidScrollbars"), [me, be] = q("scrollbars.theme"), [X, we] = q("scrollbars.visibility"), [Se, Ie] = q("scrollbars.autoHide"), [re, xe] = q("scrollbars.autoHideSuspend"), [Me] = q("scrollbars.autoHideDelay"), [he, Le] = q("scrollbars.dragScroll"), [Ht, Nt] = q("scrollbars.clickScroll"), [Ut, Pe] = q("overflow"), rt = M && !ie, lt = P.x || P.y, hn = ke || ge || T || ie, Xe = _e || we || Pe, gn = Z && B.x && B.y, ft = (_t, mt, Mt) => {
      const Pt = _t.includes("scroll") && (X === "visible" || X === "auto" && mt === "scroll");
      return A(Cr, Pt, Mt), Pt;
    };
    if (_ = Me, rt && (re && lt ? (z(!1), m(), $(() => {
      m = ue(V, "scroll", Y(z, !0), {
        A: !0
      });
    })) : z(!0)), te && A(kr, gn), be && (A(v), A(me, !0), v = me), xe && !re && z(!0), Ie && (d = Se === "move", c = Se === "leave", u = Se === "never", J(u, !0)), Le && A(Tr, he), Nt && A(Ar, Ht), Xe) {
      const _t = ft(Ut.x, N.x, !0), mt = ft(Ut.y, N.y, !1);
      A(Er, !(_t && mt));
    }
    hn && (U(), R(), j(), A(ws, !P.x, !0), A(ws, !P.y, !1), A(Sr, D && !L));
  }, {}, H];
}, Wr = (t) => {
  const e = Re(), { G: n, L: s } = e, { elements: o } = n(), { host: a, padding: i, viewport: d, content: c } = o, u = Qt(t), v = u ? {} : t, { elements: m } = v, { host: _, padding: y, viewport: h, content: p } = m || {}, g = u ? t : v.target, E = to(g), $ = en(g, "textarea"), w = g.ownerDocument, x = w.documentElement, I = () => w.defaultView || De, H = (X) => {
    X && X.focus && X.focus({
      preventScroll: !0
    });
  }, C = Y(Ir, [g]), S = Y(go, [g]), V = Y(bt, ""), L = Y(C, V, d), A = Y(S, V, c), U = L(h), R = U === g, j = R && E, J = !R && A(p), oe = !R && U === J, z = j ? x : U, Q = $ ? C(V, a, _) : g, de = j ? z : Q, q = !R && S(V, i, y), ie = !oe && J, ae = [ie, z, q, de].map((X) => Qt(X) && !Ct(X) && X), ce = (X) => X && dn(ae, X), ke = ce(z) ? g : z, ge = {
    gt: g,
    bt: de,
    D: z,
    cn: q,
    wt: ie,
    kt: j ? x : z,
    Zt: j ? w : z,
    rn: E ? x : ke,
    Kt: w,
    yt: $,
    Rt: E,
    Dt: u,
    V: R,
    ln: I,
    St: (X) => ar(z, R ? Ae : je, X),
    $t: (X, we) => Wt(z, R ? Ae : je, X, we)
  }, { gt: _e, bt: T, cn: M, D, wt: B } = ge, N = [() => {
    qe(T, [Ae, Sn]), qe(_e, Sn), E && qe(x, [Sn, Ae]);
  }], P = $ && ce(T);
  let Z = $ ? _e : Ln([B, D, M, T, _e].find((X) => X && !ce(X)));
  const te = j ? _e : B || D, me = Y(Be, N);
  return [ge, () => {
    const X = I(), we = On(), Se = (he) => {
      Te(Ct(he), Ln(he)), tt(he);
    }, Ie = (he) => he ? ue(he, "focusin focusout focus blur", (Le) => {
      Kn(Le), Le.stopImmediatePropagation();
    }, {
      I: !0,
      H: !1
    }) : Ne, re = "tabindex", xe = fn(D, re), Me = Ie(we);
    return Fe(T, Ae, R ? "viewport" : "host"), Fe(M, Nn, ""), Fe(B, gs, ""), R || (Fe(D, je, ""), Fe(D, re, xe || "-1"), E && Rt(x, Ae, pr)), P && (ls(_e, T), fe(N, () => {
      ls(T, _e), tt(T);
    })), Te(te, Z), Te(T, M), Te(M || T, !R && D), Te(D, B), fe(N, [Me, () => {
      const he = On(), Le = Ie(he);
      qe(M, Nn), qe(B, gs), qe(D, [ao, io, je]), xe ? Fe(D, re, xe) : qe(D, re), ce(B) && Se(B), ce(D) && Se(D), ce(M) && Se(M), H(he), Le();
    }]), s && !R && (Rt(D, je, uo), fe(N, Y(qe, D, je))), H(!R && we === g && X.top === X ? D : we), Me(), Z = 0, me;
  }, me];
}, Yr = ({ wt: t }) => ({ Gt: e, an: n, Tt: s }) => {
  const { xt: o } = e || {}, { Ot: a } = n;
  t && (o || s) && Et(t, {
    [xt]: a && "100%"
  });
}, Kr = ({ bt: t, cn: e, D: n, V: s }, o) => {
  const [a, i] = He({
    u: lr,
    o: cs()
  }, Y(cs, t, "padding", ""));
  return ({ Et: d, Gt: c, an: u, Tt: v }) => {
    let [m, _] = i(v);
    const { L: y } = Re(), { ht: h, Ht: p, Ct: g } = c || {}, { N: E } = u, [$, w] = d("paddingAbsolute");
    (h || _ || (v || p)) && ([m, _] = a(v));
    const I = !s && (w || g || _);
    if (I) {
      const H = !$ || !e && !y, C = m.r + m.l, S = m.t + m.b, V = {
        [zs]: H && !E ? -C : 0,
        [Gs]: H ? -S : 0,
        [qs]: H && E ? -C : 0,
        top: H ? -m.t : 0,
        right: H ? E ? -m.r : "auto" : 0,
        left: H ? E ? "auto" : -m.l : 0,
        [St]: H && `calc(100% + ${C}px)`
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
}, Xr = (t, e) => {
  const n = Re(), { bt: s, cn: o, D: a, V: i, Rt: d, $t: c, ln: u } = t, { L: v } = n, m = d && i, _ = Y(jt, 0), y = {
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
    const U = De.devicePixelRatio % 1 !== 0 ? 1 : 0, R = {
      w: _(L.w - A.w),
      h: _(L.h - A.h)
    };
    return {
      w: R.w > U ? R.w : 0,
      h: R.h > U ? R.h : 0
    };
  }, [g, E] = He(y, Y(Yn, a)), [$, w] = He(y, Y(Rn, a)), [x, I] = He(y), [H, C] = He(y), [S] = He(h), V = Vt(Qn);
  return ({ Et: L, Gt: A, an: U, Tt: R }, { dn: j }) => {
    const { ht: J, Ht: oe, Ct: z, It: Q } = A || {}, de = V && V.M(t, e, U, n, L), { q, W: ie, X: ae } = de || {}, [ce, ke] = Lr(L, n), [ge, _e] = L("overflow"), T = J || j || oe || z || Q || ke, M = nn(ge.x), D = nn(ge.y), B = M || D;
    let N = E(R), P = w(R), Z = I(R), te = C(R), me;
    if (ke && v && c(uo, !ce), T) {
      B && c(yt, !1);
      const [Pe, rt] = ie ? ie(me) : [], [lt, hn] = N = g(R), [Xe, gn] = P = $(R), ft = oo(a), _t = Xe, mt = ft;
      Pe && Pe(), (gn || hn || ke) && rt && !ce && q && q(rt, Xe, lt);
      const Mt = vr(u()), Pt = {
        w: _(jt(Xe.w, _t.w) + lt.w),
        h: _(jt(Xe.h, _t.h) + lt.h)
      }, ts = {
        w: _((m ? Mt.w : mt.w + _(ft.w - Xe.w)) + lt.w),
        h: _((m ? Mt.h : mt.h + _(ft.h - Xe.h)) + lt.h)
      };
      te = H(ts), Z = x(p(Pt, ts), R);
    }
    const [be, X] = te, [we, Se] = Z, [Ie, re] = P, [xe, Me] = N, he = {
      x: we.w > 0,
      y: we.h > 0
    }, Le = M && D && (he.x || he.y) || M && he.x && !he.y || D && he.y && !he.x;
    if (j || z || Q || Me || re || X || Se || _e || ke || T) {
      const Pe = {}, rt = Or(t, he, ge, Pe);
      ae && ae(rt, U, !!q && q(rt, Ie, xe), Pe), i ? (Fe(s, ao, Pe[un]), Fe(s, io, Pe[vn])) : Et(a, Pe);
    }
    Wt(s, Ae, co, Le), Wt(o, Nn, gr, Le), i || Wt(a, je, yt, B);
    const [Nt, Ut] = S(po(t).k);
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
}, Jr = (t) => {
  const [e, n, s] = Wr(t), o = {
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
  }, { gt: a, D: i, V: d } = e, { L: c, T: u } = Re(), v = !c && (u.x || u.y), m = [Yr(e), Kr(e, o), Xr(e, o)];
  return [n, (_) => {
    const y = {}, p = v && At(i), g = d ? Rt(i, Ae, Hn) : Ne;
    return se(m, (E) => {
      ne(y, E(_, y) || {});
    }), g(), nt(i, p), !d && nt(a, 0), y;
  }, o, e, s];
}, Qr = (t, e, n, s) => {
  const o = hs(e, {}), [a, i, d, c, u] = Jr(t), [v, m, _] = qr(c, d, o, ($) => {
    E({}, $);
  }), [y, h, , p] = jr(t, e, _, d, c, s), g = ($) => et($).some((w) => !!$[w]), E = ($, w) => {
    const { fn: x, Tt: I, At: H, _n: C } = $, S = x || {}, V = !!I, L = {
      Et: hs(e, S, V),
      fn: S,
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
    const R = g(A), j = g(U), J = R || j || !Gn(S) || V;
    return J && n($, {
      Gt: A,
      Qt: U
    }), J;
  };
  return [() => {
    const { rn: $, D: w } = c, x = At($), I = [v(), a(), y()];
    return nt(w, x), Y(Be, I);
  }, E, () => ({
    vn: _,
    hn: d
  }), {
    pn: c,
    gn: p
  }, u];
}, Ke = (t, e, n) => {
  const { nt: s } = Re(), o = Qt(t), a = o ? t : t.target, i = bo(a);
  if (e && !i) {
    let d = !1;
    const c = [], u = {}, v = (L) => {
      const A = Js(L), U = Vt(Vr);
      return U ? U(A, !0) : A;
    }, m = ne({}, s(), v(e)), [_, y, h] = Fn(), [p, g, E] = Fn(n), $ = (L, A) => {
      E(L, A), h(L, A);
    }, [w, x, I, H, C] = Qr(t, m, ({ fn: L, Tt: A }, { Gt: U, Qt: R }) => {
      const { ht: j, Ct: J, xt: oe, Ht: z, zt: Q, _t: de } = U, { tn: q, nn: ie, sn: ae } = R;
      $("updated", [V, {
        updateHints: {
          sizeChanged: !!j,
          directionChanged: !!J,
          heightIntrinsicChanged: !!oe,
          overflowEdgeChanged: !!q,
          overflowAmountChanged: !!ie,
          overflowStyleChanged: !!ae,
          contentMutation: !!z,
          hostMutation: !!Q,
          appear: !!de
        },
        changedOptions: L || {},
        force: !!A
      }]);
    }, (L) => $("scroll", [V, L])), S = (L) => {
      Nr(a), Be(c), d = !0, $("destroyed", [V, L]), y(), g();
    }, V = {
      options(L, A) {
        if (L) {
          const U = A ? s() : {}, R = lo(m, ne(U, v(L)));
          Gn(R) || (ne(m, R), x({
            fn: R
          }));
        }
        return ne({}, m);
      },
      on: p,
      off: (L, A) => {
        L && A && g(L, A);
      },
      state() {
        const { vn: L, hn: A } = I(), { N: U } = L, { Pt: R, Lt: j, k: J, en: oe, cn: z, un: Q } = A;
        return ne({}, {
          overflowEdge: R,
          overflowAmount: j,
          overflowStyle: J,
          hasOverflow: oe,
          padding: z,
          paddingAbsolute: Q,
          directionRTL: U,
          destroyed: d
        });
      },
      elements() {
        const { gt: L, bt: A, cn: U, D: R, wt: j, kt: J, Zt: oe } = H.pn, { qt: z, Jt: Q } = H.gn, de = (ie) => {
          const { Vt: ae, Mt: ce, Ut: ke } = ie;
          return {
            scrollbar: ke,
            track: ce,
            handle: ae
          };
        }, q = (ie) => {
          const { Wt: ae, Xt: ce } = ie, ke = de(ae[0]);
          return ne({}, ke, {
            clone: () => {
              const ge = de(ce());
              return x({
                _n: !0
              }), ge;
            }
          });
        };
        return ne({}, {
          target: L,
          host: A,
          padding: U || R,
          viewport: R,
          content: j || R,
          scrollOffsetElement: J,
          scrollEventElement: oe,
          scrollbarHorizontal: q(z),
          scrollbarVertical: q(Q)
        });
      },
      update: (L) => x({
        Tt: L,
        At: !0
      }),
      destroy: Y(S, !1),
      plugin: (L) => u[et(L)[0]]
    };
    return fe(c, [C]), Hr(a, V), mo(fo, Ke, [V, _, u]), Fr(H.pn.Rt, !o && t.cancel) ? (S(!0), V) : (fe(c, w()), $("initialized", [V]), V.update(!0), V);
  }
  return i;
};
Ke.plugin = (t) => {
  const e = Ue(t), n = e ? t : [t], s = n.map((o) => mo(o, Ke)[0]);
  return Dr(n), e ? s : s[0];
};
Ke.valid = (t) => {
  const e = t && t.elements, n = Ge(e) && e();
  return Jt(n) && !!bo(n.target);
};
Ke.env = () => {
  const { P: t, T: e, L: n, K: s, J: o, st: a, et: i, G: d, tt: c, nt: u, ot: v } = Re();
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
    getDefaultOptions: u,
    setDefaultOptions: v
  });
};
function Zr(t) {
  let e;
  const n = O(null), s = Math.floor(Math.random() * 2 ** 32), o = O(!1), a = O([]), i = () => a.value, d = () => e.getSelection(), c = () => a.value.length, u = () => e.clearSelection(!0), v = O(), m = O(null), _ = O(null), y = O(null), h = O(null), p = O(null);
  function g() {
    e = new qo({
      area: n.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), e.subscribe(
      "DS:start:pre",
      ({ items: C, event: S, isDragging: V }) => {
        if (V)
          e.Interaction._reset(S);
        else {
          o.value = !1;
          const L = n.value.offsetWidth - S.offsetX, A = n.value.offsetHeight - S.offsetY;
          L < 15 && A < 15 && e.Interaction._reset(S), S.target.classList.contains("os-scrollbar-handle") && e.Interaction._reset(S);
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
    a.value = e.getSelection().map((C) => JSON.parse(C.dataset.item)), v.value(a.value);
  }, w = () => at(() => {
    const C = i().map((S) => S.path);
    u(), e.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + s)
    }), e.addSelection(
      e.getSelectables().filter(
        (S) => C.includes(JSON.parse(S.dataset.item).path)
      )
    ), $(), I();
  }), x = (C) => {
    v.value = C, e.subscribe("DS:end", ({ items: S, event: V, isDragging: L }) => {
      a.value = S.map((A) => JSON.parse(A.dataset.item)), C(S.map((A) => JSON.parse(A.dataset.item)));
    });
  }, I = () => {
    m.value && (n.value.getBoundingClientRect().height < n.value.scrollHeight ? (_.value.style.height = n.value.scrollHeight + "px", _.value.style.display = "block") : (_.value.style.height = "100%", _.value.style.display = "none"));
  }, H = (C) => {
    if (!m.value)
      return;
    const { scrollOffsetElement: S } = m.value.elements();
    S.scrollTo({
      top: n.value.scrollTop,
      left: 0
    });
  };
  return Ee(() => {
    Ke(
      y.value,
      {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        },
        plugins: {
          OverlayScrollbars: Ke
          // ScrollbarsHidingPlugin,
          // SizeObserverPlugin,
          // ClickScrollPlugin
        }
      },
      {
        initialized: (C) => {
          m.value = C;
        },
        scroll: (C, S) => {
          const { scrollOffsetElement: V } = C.elements();
          n.value.scrollTo({
            top: V.scrollTop,
            left: 0
          });
        }
      }
    ), g(), I(), p.value = new ResizeObserver(I), p.value.observe(n.value), n.value.addEventListener("scroll", H), e.subscribe(
      "DS:scroll",
      ({ isDragging: C }) => C || H()
    );
  }), qn(() => {
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
    clearSelection: u,
    refreshSelection: w,
    getCount: c,
    onSelect: x
  };
}
function el(t, e) {
  const n = O(t), s = O(e), o = O([]), a = O([]), i = O([]), d = O(!1), c = O(5);
  let u = !1, v = !1;
  const m = dt({
    adapter: n,
    storages: [],
    dirname: s,
    files: []
  });
  function _() {
    let $ = [], w = [], x = s.value ?? n.value + "://";
    x.length === 0 && (o.value = []), x.replace(n.value + "://", "").split("/").forEach(function(C) {
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
  function g() {
    return o.value && o.value.length && !v;
  }
  const E = Ye(() => {
    var $;
    return (($ = o.value[o.value.length - 2]) == null ? void 0 : $.path) ?? n.value + "://";
  });
  return Ee(() => {
  }), Oe(s, _), Ee(_), {
    adapter: n,
    path: s,
    loading: u,
    searchMode: v,
    data: m,
    breadcrumbs: o,
    breadcrumbItems: a,
    limitBreadcrumbItems: y,
    hiddenBreadcrumbs: i,
    showHiddenBreadcrumbs: d,
    toggleHiddenBreadcrumbs: p,
    isGoUpAvailable: g,
    parentFolderPath: E
  };
}
function tl() {
  const t = "_readOnlyFile", e = localStorage.getItem(t), n = dt(JSON.parse(e ?? '{"items": []}')), s = (u) => {
    for (const v of u)
      n.items.length >= 1e3 && n.items.shift(), c(v.path) ? i(v.path) : n.items.push(v);
  }, o = () => JSON.parse(localStorage.getItem(t) || '{"items": []}'), a = () => {
    localStorage.setItem(t, JSON.stringify(n));
  }, i = (u) => {
    const v = n.items.findIndex((m) => m.path === u);
    v !== -1 && n.items.splice(v, 1);
  }, d = () => n.items, c = (u) => u.indexOf("自动下单") !== -1 ? !0 : n.items.findIndex((m) => u.indexOf(m.path) === 0) !== -1;
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
const nl = (t, e) => {
  const n = Yo(t.id), s = Po(), o = n.getStore("metricUnits", !1), a = Zo(n, t.theme), i = e.i18n, d = t.locale ?? e.locale, c = n.getStore("adapter"), u = tl(), v = (h) => Array.isArray(h) ? h : Jo, m = n.getStore("persist-path", t.persist), _ = m ? n.getStore("path", t.path) : t.path, y = Zr((h) => {
    s.emit("file-drag-end", h);
  });
  return dt({
    /**
     * Core properties
     * */
    // app version
    version: Qo,
    // root element
    root: null,
    // app id
    debug: t.debug,
    // Event Bus
    emitter: s,
    // storage
    storage: n,
    // localization object
    i18n: Xo(n, d, s, i),
    // modal state
    modal: er(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: Ye(() => y),
    // http object
    requester: Wo(t.request),
    // active features
    features: v(t.features),
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
    fs: el(c, _),
    onlyReadFileStore: u
  });
}, sl = { class: "vuefinder__modal-layout__container" }, ol = { class: "vuefinder__modal-layout__content" }, rl = { class: "vuefinder__modal-layout__footer" }, st = {
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
    }), (s, o) => (f(), b("div", {
      class: "vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: o[1] || (o[1] = Tt((a) => l(n).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      o[2] || (o[2] = r("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      r("div", sl, [
        r("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: o[0] || (o[0] = kt((a) => l(n).modal.close(), ["self"]))
        }, [
          r("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            r("div", ol, [
              Ot(s.$slots, "default")
            ]),
            r("div", rl, [
              Ot(s.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}, ll = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [s, o] of e)
    n[s] = o;
  return n;
}, al = {
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
    }), qn(() => {
      clearTimeout(i);
    }), {
      shown: o,
      t: a
    };
  }
}, il = { key: 1 };
function cl(t, e, n, s, o, a) {
  return f(), b("div", {
    class: ye(["vuefinder__action-message", { "vuefinder__action-message--hidden": !s.shown }])
  }, [
    t.$slots.default ? Ot(t.$slots, "default", { key: 0 }) : (f(), b("span", il, k(s.t("Saved.")), 1))
  ], 2);
}
const pt = /* @__PURE__ */ ll(al, [["render", cl]]), dl = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function ul(t, e) {
  return f(), b("svg", dl, e[0] || (e[0] = [
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
const vl = { render: ul }, fl = { class: "vuefinder__modal-header" }, _l = { class: "vuefinder__modal-header__icon-container" }, ml = {
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
    return (e, n) => (f(), b("div", fl, [
      r("div", _l, [
        (f(), G(Ts(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      r("h3", ml, k(t.title), 1)
    ]));
  }
}, pl = { class: "vuefinder__about-modal__content" }, hl = { class: "vuefinder__about-modal__main" }, gl = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, bl = ["onClick", "aria-current"], wl = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, yl = { class: "vuefinder__about-modal__description" }, kl = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Sl = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, xl = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, $l = { class: "vuefinder__about-modal__description" }, Cl = { class: "vuefinder__about-modal__settings" }, El = { class: "vuefinder__about-modal__setting flex" }, Al = { class: "vuefinder__about-modal__setting-input" }, Tl = { class: "vuefinder__about-modal__setting-label" }, Dl = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, Vl = { class: "vuefinder__about-modal__setting flex" }, Ml = { class: "vuefinder__about-modal__setting-input" }, Ll = { class: "vuefinder__about-modal__setting-label" }, Ol = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, Bl = { class: "vuefinder__about-modal__setting flex" }, Rl = { class: "vuefinder__about-modal__setting-input" }, Il = { class: "vuefinder__about-modal__setting-label" }, Fl = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, Hl = { class: "vuefinder__about-modal__setting flex" }, Nl = { class: "vuefinder__about-modal__setting-input" }, Ul = { class: "vuefinder__about-modal__setting-label" }, Pl = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, ql = { class: "vuefinder__about-modal__setting" }, zl = { class: "vuefinder__about-modal__setting-input" }, Gl = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, jl = { class: "vuefinder__about-modal__setting-label" }, Wl = ["label"], Yl = ["value"], Kl = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, Xl = { class: "vuefinder__about-modal__setting-input" }, Jl = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, Ql = { class: "vuefinder__about-modal__setting-label" }, Zl = ["label"], ea = ["value"], ta = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, na = { class: "vuefinder__about-modal__shortcuts" }, sa = { class: "vuefinder__about-modal__shortcut" }, oa = { class: "vuefinder__about-modal__shortcut" }, ra = { class: "vuefinder__about-modal__shortcut" }, la = { class: "vuefinder__about-modal__shortcut" }, aa = { class: "vuefinder__about-modal__shortcut" }, ia = { class: "vuefinder__about-modal__shortcut" }, ca = { class: "vuefinder__about-modal__shortcut" }, da = { class: "vuefinder__about-modal__shortcut" }, ua = { class: "vuefinder__about-modal__shortcut" }, va = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, fa = { class: "vuefinder__about-modal__description" }, _a = {
  __name: "ModalAbout",
  setup(t) {
    const e = le("ServiceContainer"), { setStore: n, clearStore: s } = e.storage, { t: o } = e.i18n, a = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, i = Ye(() => [
      { name: o("About"), key: a.ABOUT },
      { name: o("Settings"), key: a.SETTINGS },
      { name: o("Shortcuts"), key: a.SHORTCUTS },
      { name: o("Reset"), key: a.RESET }
    ]), d = O("about"), c = async () => {
      s(), location.reload();
    }, u = ($) => {
      e.theme.set($), e.emitter.emit("vf-theme-saved");
    }, v = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? Ms : Vs, n("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, m = () => {
      e.compactListView = !e.compactListView, n("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, _ = () => {
      e.showThumbnails = !e.showThumbnails, n("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, y = () => {
      e.persist = !e.persist, n("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: h } = le("VueFinderOptions"), g = Object.fromEntries(
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
    ), E = Ye(() => ({
      system: o("System"),
      light: o("Light"),
      dark: o("Dark")
    }));
    return ($, w) => (f(), G(st, null, {
      buttons: ee(() => [
        r("button", {
          type: "button",
          onClick: w[7] || (w[7] = (x) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, k(l(o)("Close")), 1)
      ]),
      default: ee(() => [
        r("div", pl, [
          W(vt, {
            icon: l(vl),
            title: "Vuefinder " + l(e).version
          }, null, 8, ["icon", "title"]),
          r("div", hl, [
            r("div", null, [
              r("div", null, [
                r("nav", gl, [
                  (f(!0), b($e, null, Ce(i.value, (x) => (f(), b("button", {
                    key: x.name,
                    onClick: (I) => d.value = x.key,
                    class: ye([x.key === d.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": x.current ? "page" : void 0
                  }, k(x.name), 11, bl))), 128))
                ])
              ])
            ]),
            d.value === a.ABOUT ? (f(), b("div", wl, [
              r("div", yl, k(l(o)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              r("a", kl, k(l(o)("Project home")), 1),
              r("a", Sl, k(l(o)("Follow on GitHub")), 1)
            ])) : F("", !0),
            d.value === a.SETTINGS ? (f(), b("div", xl, [
              r("div", $l, k(l(o)("Customize your experience with the following settings")), 1),
              r("div", Cl, [
                r("fieldset", null, [
                  r("div", El, [
                    r("div", Al, [
                      pe(r("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        "onUpdate:modelValue": w[0] || (w[0] = (x) => l(e).metricUnits = x),
                        onClick: v,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [qt, l(e).metricUnits]
                      ])
                    ]),
                    r("div", Tl, [
                      r("label", Dl, [
                        K(k(l(o)("Use Metric Units")) + " ", 1),
                        W(pt, {
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
                  r("div", Vl, [
                    r("div", Ml, [
                      pe(r("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        "onUpdate:modelValue": w[1] || (w[1] = (x) => l(e).compactListView = x),
                        onClick: m,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [qt, l(e).compactListView]
                      ])
                    ]),
                    r("div", Ll, [
                      r("label", Ol, [
                        K(k(l(o)("Compact list view")) + " ", 1),
                        W(pt, {
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
                    r("div", Rl, [
                      pe(r("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        "onUpdate:modelValue": w[2] || (w[2] = (x) => l(e).persist = x),
                        onClick: y,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [qt, l(e).persist]
                      ])
                    ]),
                    r("div", Il, [
                      r("label", Fl, [
                        K(k(l(o)("Persist path on reload")) + " ", 1),
                        W(pt, {
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
                  r("div", Hl, [
                    r("div", Nl, [
                      pe(r("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        "onUpdate:modelValue": w[3] || (w[3] = (x) => l(e).showThumbnails = x),
                        onClick: _,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [qt, l(e).showThumbnails]
                      ])
                    ]),
                    r("div", Ul, [
                      r("label", Pl, [
                        K(k(l(o)("Show thumbnails")) + " ", 1),
                        W(pt, {
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
                  r("div", ql, [
                    r("div", zl, [
                      r("label", Gl, k(l(o)("Theme")), 1)
                    ]),
                    r("div", jl, [
                      pe(r("select", {
                        id: "theme",
                        "onUpdate:modelValue": w[4] || (w[4] = (x) => l(e).theme.value = x),
                        onChange: w[5] || (w[5] = (x) => u(x.target.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        r("optgroup", {
                          label: l(o)("Theme")
                        }, [
                          (f(!0), b($e, null, Ce(E.value, (x, I) => (f(), b("option", { value: I }, k(x), 9, Yl))), 256))
                        ], 8, Wl)
                      ], 544), [
                        [En, l(e).theme.value]
                      ]),
                      W(pt, {
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
                  l(e).features.includes(l(ve).LANGUAGE) && Object.keys(l(g)).length > 1 ? (f(), b("div", Kl, [
                    r("div", Xl, [
                      r("label", Jl, k(l(o)("Language")), 1)
                    ]),
                    r("div", Ql, [
                      pe(r("select", {
                        id: "language",
                        "onUpdate:modelValue": w[6] || (w[6] = (x) => l(e).i18n.locale = x),
                        class: "vuefinder__about-modal__select"
                      }, [
                        r("optgroup", {
                          label: l(o)("Language")
                        }, [
                          (f(!0), b($e, null, Ce(l(g), (x, I) => (f(), b("option", { value: I }, k(x), 9, ea))), 256))
                        ], 8, Zl)
                      ], 512), [
                        [En, l(e).i18n.locale]
                      ]),
                      W(pt, {
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
            d.value === a.SHORTCUTS ? (f(), b("div", ta, [
              r("div", na, [
                r("div", sa, [
                  r("div", null, k(l(o)("Rename")), 1),
                  w[8] || (w[8] = r("kbd", null, "F2", -1))
                ]),
                r("div", oa, [
                  r("div", null, k(l(o)("Refresh")), 1),
                  w[9] || (w[9] = r("kbd", null, "F5", -1))
                ]),
                r("div", ra, [
                  K(k(l(o)("Delete")) + " ", 1),
                  w[10] || (w[10] = r("kbd", null, "Del", -1))
                ]),
                r("div", la, [
                  K(k(l(o)("Escape")) + " ", 1),
                  w[11] || (w[11] = r("div", null, [
                    r("kbd", null, "Esc")
                  ], -1))
                ]),
                r("div", aa, [
                  K(k(l(o)("Select All")) + " ", 1),
                  w[12] || (w[12] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    K(" + "),
                    r("kbd", null, "A")
                  ], -1))
                ]),
                r("div", ia, [
                  K(k(l(o)("Search")) + " ", 1),
                  w[13] || (w[13] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    K(" + "),
                    r("kbd", null, "F")
                  ], -1))
                ]),
                r("div", ca, [
                  K(k(l(o)("Toggle Sidebar")) + " ", 1),
                  w[14] || (w[14] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    K(" + "),
                    r("kbd", null, "E")
                  ], -1))
                ]),
                r("div", da, [
                  K(k(l(o)("Open Settings")) + " ", 1),
                  w[15] || (w[15] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    K(" + "),
                    r("kbd", null, ",")
                  ], -1))
                ]),
                r("div", ua, [
                  K(k(l(o)("Toggle Full Screen")) + " ", 1),
                  w[16] || (w[16] = r("div", null, [
                    r("kbd", null, "Ctrl"),
                    K(" + "),
                    r("kbd", null, "Enter")
                  ], -1))
                ])
              ])
            ])) : F("", !0),
            d.value === a.RESET ? (f(), b("div", va, [
              r("div", fa, k(l(o)("Reset all settings to default")), 1),
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
}, ma = ["title"], ot = {
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
    const n = e, s = le("ServiceContainer"), { t: o } = s.i18n, a = O(!1), i = O(null), d = O((u = i.value) == null ? void 0 : u.strMessage);
    Oe(d, () => a.value = !1);
    const c = () => {
      n("hidden"), a.value = !0;
    };
    return (v, m) => (f(), b("div", null, [
      a.value ? F("", !0) : (f(), b("div", {
        key: 0,
        ref_key: "strMessage",
        ref: i,
        class: ye(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Ot(v.$slots, "default"),
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
        ]), 8, ma)
      ], 2))
    ]));
  }
};
const pa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function ha(t, e) {
  return f(), b("svg", pa, e[0] || (e[0] = [
    r("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ]));
}
const ga = { render: ha }, ba = { class: "vuefinder__rename-modal__content" }, wa = { class: "vuefinder__rename-modal__item" }, ya = { class: "vuefinder__rename-modal__item-info" }, ka = {
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
}, xa = { class: "vuefinder__rename-modal__item-name" }, $a = {
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
    return (d, c) => (f(), G(st, null, {
      buttons: ee(() => [
        r("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, k(l(n)("Rename")), 1),
        r("button", {
          type: "button",
          onClick: c[2] || (c[2] = (u) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, k(l(n)("Cancel")), 1)
      ]),
      default: ee(() => [
        r("div", null, [
          W(vt, {
            icon: l(ga),
            title: l(n)("Rename")
          }, null, 8, ["icon", "title"]),
          r("div", ba, [
            r("div", wa, [
              r("p", ya, [
                s.value.type === "dir" ? (f(), b("svg", ka, c[3] || (c[3] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (f(), b("svg", Sa, c[4] || (c[4] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                r("span", xa, k(s.value.basename), 1)
              ]),
              pe(r("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (u) => o.value = u),
                onKeyup: Tt(i, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Dt, o.value]
              ]),
              a.value.length ? (f(), G(ot, {
                key: 0,
                onHidden: c[1] || (c[1] = (u) => a.value = ""),
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
function Ca(t) {
  Ee(() => {
  });
}
const Ea = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Aa(t, e) {
  return f(), b("svg", Ea, e[0] || (e[0] = [
    r("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ]));
}
const yo = { render: Aa }, Ta = { class: "vuefinder__new-folder-modal__content" }, Da = { class: "vuefinder__new-folder-modal__form" }, Va = { class: "vuefinder__new-folder-modal__description" }, Ma = ["placeholder"], ko = {
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
    return (i, d) => (f(), G(st, null, {
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
          W(vt, {
            icon: l(yo),
            title: l(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          r("div", Ta, [
            r("div", Da, [
              r("p", Va, k(l(n)("Create a new folder")), 1),
              pe(r("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (c) => s.value = c),
                onKeyup: Tt(a, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: l(n)("Folder Name"),
                type: "text"
              }, null, 40, Ma), [
                [Dt, s.value]
              ]),
              o.value.length ? (f(), G(ot, {
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
}, La = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Oa(t, e) {
  return f(), b("svg", La, e[0] || (e[0] = [
    r("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ]));
}
const So = { render: Oa }, Ba = { class: "vuefinder__new-file-modal__content" }, Ra = { class: "vuefinder__new-file-modal__form" }, Ia = { class: "vuefinder__new-file-modal__description" }, Fa = ["placeholder"], Ha = {
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
    return (i, d) => (f(), G(st, null, {
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
          W(vt, {
            icon: l(So),
            title: l(n)("New File")
          }, null, 8, ["icon", "title"]),
          r("div", Ba, [
            r("div", Ra, [
              r("p", Ia, k(l(n)("Create a new file")), 1),
              pe(r("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (c) => s.value = c),
                onKeyup: Tt(a, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: l(n)("File Name"),
                type: "text"
              }, null, 40, Fa), [
                [Dt, s.value]
              ]),
              o.value.length ? (f(), G(ot, {
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
function xs(t, e = 10) {
  let n = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return t.replace(new RegExp(n), "$2..$4");
}
const Na = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Ua(t, e) {
  return f(), b("svg", Na, e[0] || (e[0] = [
    r("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ]));
}
const Pa = { render: Ua }, qa = { class: "vuefinder__unarchive-modal__content" }, za = { class: "vuefinder__unarchive-modal__items" }, Ga = { class: "vuefinder__unarchive-modal__item" }, ja = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Wa = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ya = { class: "vuefinder__unarchive-modal__item-name" }, Ka = { class: "vuefinder__unarchive-modal__info" }, Xa = {
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
    return (d, c) => (f(), G(st, null, {
      buttons: ee(() => [
        r("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, k(l(n)("Unarchive")), 1),
        r("button", {
          type: "button",
          onClick: c[1] || (c[1] = (u) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, k(l(n)("Cancel")), 1)
      ]),
      default: ee(() => [
        r("div", null, [
          W(vt, {
            icon: l(Pa),
            title: l(n)("Unarchive")
          }, null, 8, ["icon", "title"]),
          r("div", qa, [
            r("div", za, [
              (f(!0), b($e, null, Ce(a.value, (u) => (f(), b("p", Ga, [
                u.type === "dir" ? (f(), b("svg", ja, c[2] || (c[2] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (f(), b("svg", Wa, c[3] || (c[3] = [
                  r("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                r("span", Ya, k(u.basename), 1)
              ]))), 256)),
              r("p", Ka, k(l(n)("The archive will be unarchived at")) + " (" + k(l(e).fs.data.dirname) + ")", 1),
              o.value.length ? (f(), G(ot, {
                key: 0,
                onHidden: c[0] || (c[0] = (u) => o.value = ""),
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
}, Ja = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Qa(t, e) {
  return f(), b("svg", Ja, e[0] || (e[0] = [
    r("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ]));
}
const Za = { render: Qa }, ei = { class: "vuefinder__archive-modal__content" }, ti = { class: "vuefinder__archive-modal__form" }, ni = { class: "vuefinder__archive-modal__files vf-scrollbar" }, si = { class: "vuefinder__archive-modal__file" }, oi = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, ri = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, li = { class: "vuefinder__archive-modal__file-name" }, ai = ["placeholder"], ii = {
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
    return (d, c) => (f(), G(st, null, {
      buttons: ee(() => [
        r("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, k(l(n)("Archive")), 1),
        r("button", {
          type: "button",
          onClick: c[2] || (c[2] = (u) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, k(l(n)("Cancel")), 1)
      ]),
      default: ee(() => [
        r("div", null, [
          W(vt, {
            icon: l(Za),
            title: l(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          r("div", ei, [
            r("div", ti, [
              r("div", ni, [
                (f(!0), b($e, null, Ce(a.value, (u) => (f(), b("p", si, [
                  u.type === "dir" ? (f(), b("svg", oi, c[3] || (c[3] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (f(), b("svg", ri, c[4] || (c[4] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  r("span", li, k(u.basename), 1)
                ]))), 256))
              ]),
              pe(r("input", {
                "onUpdate:modelValue": c[0] || (c[0] = (u) => s.value = u),
                onKeyup: Tt(i, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: l(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, ai), [
                [Dt, s.value]
              ]),
              o.value.length ? (f(), G(ot, {
                key: 0,
                onHidden: c[1] || (c[1] = (u) => o.value = ""),
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
}, ci = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function di(t, e) {
  return f(), b("svg", ci, e[0] || (e[0] = [
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
const es = { render: di };
const ui = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function vi(t, e) {
  return f(), b("svg", ui, e[0] || (e[0] = [
    r("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ]));
}
const fi = { render: vi }, _i = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function mi(t, e) {
  return f(), b("svg", _i, e[0] || (e[0] = [
    r("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ]));
}
const pi = { render: mi }, hi = { class: "vuefinder__toolbar" }, gi = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, bi = ["title"], wi = ["title"];
const yi = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, ki = { class: "pl-2" }, Si = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, xi = { class: "vuefinder__toolbar__controls" };
const $i = ["title"], Ci = {
  __name: "Toolbar",
  setup(t) {
    const e = le("ServiceContainer"), { setStore: n } = e.storage, { t: s } = e.i18n, o = e.dragSelect, a = O(""), i = O([]), d = Ye(() => i.value.some((v) => v.onlyRead));
    e.emitter.on("vf-context-selected", (v) => {
      i.value = v;
    }), e.emitter.on("vf-contextmenu-show", ({ event: v, items: m, target: _ = null }) => {
      console.log(_);
    }), e.emitter.on("vf-search-query", ({ newQuery: v }) => {
      a.value = v;
    });
    const c = () => {
      e.fullScreen = !e.fullScreen;
    };
    Oe(() => e.fullScreen, () => {
      e.fullScreen ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "", n("full-screen", e.fullScreen), e.emitter.emit("vf-fullscreen-toggle");
    });
    const u = () => {
      e.view = e.view === "list" ? "grid" : "list", o.refreshSelection(), n("viewport", e.view);
    };
    return (v, m) => (f(), b("div", hi, [
      a.value.length ? (f(), b("div", yi, [
        r("div", ki, [
          K(k(l(s)("Search results for")) + " ", 1),
          r("span", Si, k(a.value), 1)
        ]),
        l(e).fs.loading ? (f(), G(l(es), { key: 0 })) : F("", !0)
      ])) : (f(), b("div", gi, [
        l(e).features.includes(l(ve).NEW_FOLDER) ? (f(), b("div", {
          key: 0,
          class: "mx-1.5",
          title: l(s)("New Folder"),
          onClick: m[0] || (m[0] = (_) => l(e).modal.open(ko, { items: l(o).getSelected() }))
        }, [
          W(l(yo))
        ], 8, bi)) : F("", !0),
        l(e).features.includes(l(ve).NEW_FILE) ? (f(), b("div", {
          key: 1,
          class: "mx-1.5",
          title: l(s)("New File"),
          onClick: m[1] || (m[1] = (_) => l(e).modal.open(Ha, { items: l(o).getSelected() }))
        }, [
          W(l(So))
        ], 8, wi)) : F("", !0),
        (l(e).features.includes(l(ve).RENAME), F("", !0)),
        (l(e).features.includes(l(ve).DELETE), F("", !0)),
        (l(e).features.includes(l(ve).UPLOAD), F("", !0)),
        (l(e).features.includes(l(ve).UNARCHIVE) && l(o).getCount() === 1 && l(o).getSelected()[0].mime_type, F("", !0)),
        (l(e).features.includes(l(ve).ARCHIVE), F("", !0))
      ])),
      r("div", xi, [
        (l(e).features.includes(l(ve).FULL_SCREEN), F("", !0)),
        r("div", {
          class: "mx-1.5",
          title: l(s)("Change View"),
          onClick: m[7] || (m[7] = (_) => a.value.length || u())
        }, [
          l(e).view === "grid" ? (f(), G(l(fi), {
            key: 0,
            class: ye(["vf-toolbar-icon", a.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : F("", !0),
          l(e).view === "list" ? (f(), G(l(pi), {
            key: 1,
            class: ye(["vf-toolbar-icon", a.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : F("", !0)
        ], 8, $i)
      ])
    ]));
  }
}, Ei = (t, e = 0, n = !1) => {
  let s;
  return (...o) => {
    n && !s && t(...o), clearTimeout(s), s = setTimeout(() => {
      t(...o);
    }, e);
  };
}, $s = (t, e, n) => {
  const s = O(t);
  return Bo((o, a) => ({
    get() {
      return o(), s.value;
    },
    set: Ei(
      (i) => {
        s.value = i, a();
      },
      e,
      n
    )
  }));
}, Ai = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Ti(t, e) {
  return f(), b("svg", Ai, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ]));
}
const Di = { render: Ti }, Vi = { class: "vuefinder__move-modal__content" }, Mi = { class: "vuefinder__move-modal__description" }, Li = { class: "vuefinder__move-modal__files vf-scrollbar" }, Oi = { class: "vuefinder__move-modal__file" }, Bi = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ri = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ii = { class: "vuefinder__move-modal__file-name" }, Fi = { class: "vuefinder__move-modal__target-title" }, Hi = { class: "vuefinder__move-modal__target-directory" }, Ni = { class: "vuefinder__move-modal__target-path" }, Ui = { class: "vuefinder__move-modal__selected-items" }, Pn = {
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
    return (i, d) => (f(), G(st, null, {
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
        r("div", Ui, k(l(n)("%s item(s) selected.", s.value.length)), 1)
      ]),
      default: ee(() => [
        r("div", null, [
          W(vt, {
            icon: l(Di),
            title: l(n)("Move files")
          }, null, 8, ["icon", "title"]),
          r("div", Vi, [
            r("p", Mi, k(l(n)("Are you sure you want to move these files?")), 1),
            r("div", Li, [
              (f(!0), b($e, null, Ce(s.value, (c) => (f(), b("div", Oi, [
                r("div", null, [
                  c.type === "dir" ? (f(), b("svg", Bi, d[2] || (d[2] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (f(), b("svg", Ri, d[3] || (d[3] = [
                    r("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])))
                ]),
                r("div", Ii, k(c.path), 1)
              ]))), 256))
            ]),
            r("h4", Fi, k(l(n)("Target Directory")), 1),
            r("p", Hi, [
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
              r("span", Ni, k(l(e).modal.data.items.to.path), 1)
            ]),
            o.value.length ? (f(), G(ot, {
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
}, Pi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
};
function qi(t, e) {
  return f(), b("svg", Pi, e[0] || (e[0] = [
    r("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ]));
}
const zi = { render: qi }, Gi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function ji(t, e) {
  return f(), b("svg", Gi, e[0] || (e[0] = [
    r("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const Wi = { render: ji }, Yi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Ki(t, e) {
  return f(), b("svg", Yi, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ]));
}
const Xi = { render: Ki }, Ji = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
};
function Qi(t, e) {
  return f(), b("svg", Ji, e[0] || (e[0] = [
    r("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ]));
}
const Zi = { render: Qi }, ec = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
};
function tc(t, e) {
  return f(), b("svg", ec, e[0] || (e[0] = [
    r("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ]));
}
const nc = { render: tc }, sc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function oc(t, e) {
  return f(), b("svg", sc, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ]));
}
const rc = { render: oc }, lc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
};
function ac(t, e) {
  return f(), b("svg", lc, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ]));
}
const pn = { render: ac }, ic = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
};
function cc(t, e) {
  return f(), b("svg", ic, e[0] || (e[0] = [
    r("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ]));
}
const dc = { render: cc }, uc = {
  class: "vuefinder__breadcrumb__container",
  style: { padding: "1px" }
}, vc = ["title"], fc = ["title"], _c = ["title"], mc = { class: "vuefinder__breadcrumb__list" }, pc = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, hc = { class: "relative" }, gc = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], bc = { class: "vuefinder__breadcrumb__search-mode" }, wc = ["placeholder"], yc = { class: "vuefinder__breadcrumb__hidden-dropdown" }, kc = ["onDrop", "onClick"], Sc = { class: "vuefinder__breadcrumb__hidden-item-content" }, xc = { class: "vuefinder__breadcrumb__hidden-item-text" }, $c = {
  __name: "Breadcrumb",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, s = e.dragSelect, { setStore: o } = e.storage, a = O(null), i = $s(0, 100);
    Oe(i, (C) => {
      const S = a.value.children;
      let V = 0, L = 0, A = 5, U = 1;
      e.fs.limitBreadcrumbItems(A), at(() => {
        for (let R = S.length - 1; R >= 0 && !(V + S[R].offsetWidth > i.value - 40); R--)
          V += parseInt(S[R].offsetWidth, 10), L++;
        L < U && (L = U), L > A && (L = A), e.fs.limitBreadcrumbItems(L);
      });
    });
    const d = () => {
      i.value = a.value.offsetWidth;
    };
    let c = O(null);
    Ee(() => {
      c.value = new ResizeObserver(d), c.value.observe(a.value);
    }), qn(() => {
      c.value.disconnect();
    });
    const u = (C, S = null) => {
      C.preventDefault(), s.isDraggingRef.value = !1, _(C), S ?? (S = e.fs.hiddenBreadcrumbs.length - 1);
      let V = JSON.parse(C.dataTransfer.getData("items"));
      if (V.find((L) => L.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Pn, {
        items: {
          from: V,
          to: e.fs.hiddenBreadcrumbs[S] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, v = (C, S = null) => {
      C.preventDefault(), s.isDraggingRef.value = !1, _(C), S ?? (S = e.fs.breadcrumbs.length - 2);
      let V = JSON.parse(C.dataTransfer.getData("items"));
      if (V.find((L) => L.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Pn, {
        items: {
          from: V,
          to: e.fs.breadcrumbs[S] ?? { path: e.fs.adapter + "://" }
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
    }, g = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, E = {
      mounted(C, S, V, L) {
        C.clickOutsideEvent = function(A) {
          C === A.target || C.contains(A.target) || S.value();
        }, document.body.addEventListener("click", C.clickOutsideEvent);
      },
      beforeUnmount(C, S, V, L) {
        document.body.removeEventListener("click", C.clickOutsideEvent);
      }
    };
    Oe(() => e.showTreeView, (C, S) => {
      C !== S && o("show-tree-view", C);
    });
    const $ = O(null), w = () => {
      e.features.includes(ve.SEARCH) && (e.fs.searchMode = !0, at(() => $.value.focus()));
    }, x = $s("", 400);
    Oe(x, (C) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: C });
    }), Oe(() => e.fs.searchMode, (C) => {
      C && at(() => $.value.focus());
    });
    const I = () => {
      e.fs.searchMode = !1, x.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      I();
    });
    const H = () => {
      x.value === "" && I();
    };
    return (C, S) => (f(), b("div", uc, [
      F("", !0),
      r("span", {
        title: l(n)("Go up a directory")
      }, [
        W(l(Wi), {
          onDragover: S[0] || (S[0] = (V) => m(V)),
          onDragleave: S[1] || (S[1] = (V) => _(V)),
          onDrop: S[2] || (S[2] = (V) => v(V)),
          onClick: h,
          class: ye(l(e).fs.isGoUpAvailable() ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive")
        }, null, 8, ["class"])
      ], 8, vc),
      l(e).fs.loading ? (f(), b("span", {
        key: 2,
        title: l(n)("Cancel")
      }, [
        W(l(Xi), {
          onClick: S[3] || (S[3] = (V) => l(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, _c)) : (f(), b("span", {
        key: 1,
        title: l(n)("Refresh")
      }, [
        W(l(zi), { onClick: y })
      ], 8, fc)),
      pe(r("div", {
        onClick: kt(w, ["self"]),
        class: "group vuefinder__breadcrumb__search-container"
      }, [
        r("div", null, [
          W(l(Zi), {
            onDragover: S[4] || (S[4] = (V) => m(V)),
            onDragleave: S[5] || (S[5] = (V) => _(V)),
            onDrop: S[6] || (S[6] = (V) => v(V, -1)),
            onClick: S[7] || (S[7] = (V) => l(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: l(e).fs.adapter } }))
          })
        ]),
        r("div", mc, [
          l(e).fs.hiddenBreadcrumbs.length ? pe((f(), b("div", pc, [
            S[13] || (S[13] = r("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            r("div", hc, [
              r("span", {
                onDragenter: S[8] || (S[8] = (V) => l(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: S[9] || (S[9] = (V) => l(e).fs.toggleHiddenBreadcrumbs()),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                W(l(dc), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [E, g]
          ]) : F("", !0)
        ]),
        r("div", {
          ref_key: "breadcrumbContainer",
          ref: a,
          class: "vuefinder__breadcrumb__visible-list",
          onClick: kt(w, ["self"])
        }, [
          (f(!0), b($e, null, Ce(l(e).fs.breadcrumbs, (V, L) => (f(), b("div", { key: L }, [
            S[14] || (S[14] = r("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            r("span", {
              onDragover: (A) => L === l(e).fs.breadcrumbs.length - 1 || m(A),
              onDragleave: (A) => L === l(e).fs.breadcrumbs.length - 1 || _(A),
              onDrop: (A) => L === l(e).fs.breadcrumbs.length - 1 || v(A, L),
              class: "vuefinder__breadcrumb__item",
              title: V.basename,
              onClick: (A) => l(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: l(e).fs.adapter, path: V.path } })
            }, k(V.name), 41, gc)
          ]))), 128))
        ], 512),
        l(e).fs.loading ? (f(), G(l(es), { key: 0 })) : F("", !0)
      ], 512), [
        [Ze, !l(e).fs.searchMode && !1]
      ]),
      pe(r("div", bc, [
        r("div", null, [
          W(l(nc))
        ]),
        pe(r("input", {
          ref_key: "searchInput",
          ref: $,
          onKeydown: Tt(I, ["esc"]),
          onBlur: H,
          "onUpdate:modelValue": S[10] || (S[10] = (V) => Ro(x) ? x.value = V : null),
          placeholder: l(n)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, wc), [
          [Dt, l(x)]
        ]),
        W(l(rc), { onClick: I })
      ], 512), [
        [Ze, l(e).fs.searchMode && !1]
      ]),
      pe(r("div", yc, [
        (f(!0), b($e, null, Ce(l(e).fs.hiddenBreadcrumbs, (V, L) => (f(), b("div", {
          key: L,
          onDragover: S[11] || (S[11] = (A) => m(A)),
          onDragleave: S[12] || (S[12] = (A) => _(A)),
          onDrop: (A) => u(A, L),
          onClick: (A) => p(V),
          class: "vuefinder__breadcrumb__hidden-item"
        }, [
          r("div", Sc, [
            r("span", null, [
              W(l(pn), { class: "vuefinder__breadcrumb__hidden-item-icon" })
            ]),
            S[15] || (S[15] = K()),
            r("span", xc, k(V.name), 1)
          ])
        ], 40, kc))), 128))
      ], 512), [
        [Ze, l(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, Cc = (t, e = null) => new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), Ec = ["onClick"], Ac = {
  __name: "Toast",
  setup(t) {
    const e = le("ServiceContainer"), { getStore: n } = e.storage, s = O(n("full-screen", !1)), o = O([]), a = (c) => c === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", i = (c) => {
      o.value.splice(c, 1);
    }, d = (c) => {
      let u = o.value.findIndex((v) => v.id === c);
      u !== -1 && i(u);
    };
    return e.emitter.on("vf-toast-clear", () => {
      o.value = [];
    }), e.emitter.on("vf-toast-push", (c) => {
      let u = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      c.id = u, o.value.push(c), setTimeout(() => {
        d(u);
      }, 5e3);
    }), (c, u) => (f(), b("div", {
      class: ye(["vuefinder__toast", s.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      W(Io, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: ee(() => [
          (f(!0), b($e, null, Ce(o.value, (v, m) => (f(), b("div", {
            key: m,
            onClick: (_) => i(m),
            class: ye(["vuefinder__toast__message", a(v.type)])
          }, k(v.label), 11, Ec))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}, Tc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Dc(t, e) {
  return f(), b("svg", Tc, e[0] || (e[0] = [
    r("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const Vc = { render: Dc }, Mc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Lc(t, e) {
  return f(), b("svg", Mc, e[0] || (e[0] = [
    r("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const Oc = { render: Lc }, Cs = {
  __name: "SortIcon",
  props: { direction: String },
  setup(t) {
    return (e, n) => (f(), b("div", null, [
      t.direction === "asc" ? (f(), G(l(Vc), { key: 0 })) : F("", !0),
      t.direction === "desc" ? (f(), G(l(Oc), { key: 1 })) : F("", !0)
    ]));
  }
}, Bc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
};
function Rc(t, e) {
  return f(), b("svg", Bc, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ]));
}
const Ic = { render: Rc }, Fc = { class: "vuefinder__item-icon" }, $n = {
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
    return (e, n) => (f(), b("span", Fc, [
      t.type === "dir" ? (f(), G(l(pn), {
        key: 0,
        class: ye(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"])) : (f(), G(l(Ic), {
        key: 1,
        class: ye(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"]))
    ]));
  }
}, Hc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
};
function Nc(t, e) {
  return f(), b("svg", Hc, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ]));
}
const Uc = { render: Nc }, Pc = { class: "vuefinder__drag-item__container" }, qc = { class: "vuefinder__drag-item__count" }, zc = {
  __name: "DragItem",
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(t) {
    const e = t;
    return (n, s) => (f(), b("div", Pc, [
      W(l(Uc)),
      r("div", qc, k(e.count), 1)
    ]));
  }
}, Gc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function jc(t, e) {
  return f(), b("svg", Gc, e[0] || (e[0] = [
    r("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ]));
}
const xo = { render: jc }, Wc = ["data-type", "data-item", "data-index"], Cn = {
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
    }, i = (p, g) => {
      console.log(o.item), !o.disabled && n.emitter.emit("vf-contextmenu-show", { event: p, items: s.getSelected(), target: g });
    }, d = {
      mounted(p, g, E, $) {
        E.props.draggable && (p.addEventListener("dragstart", (w) => c(w, g.value)), p.addEventListener("dragover", (w) => v(w, g.value)), p.addEventListener("drop", (w) => u(w, g.value)));
      },
      beforeUnmount(p, g, E, $) {
        E.props.draggable && (p.removeEventListener("dragstart", c), p.removeEventListener("dragover", v), p.removeEventListener("drop", u));
      }
    }, c = (p, g) => {
      if (p.altKey || p.ctrlKey || p.metaKey)
        return p.preventDefault(), !1;
      s.isDraggingRef.value = !0, p.dataTransfer.setDragImage(o.dragImage.$el, 0, 15), p.dataTransfer.effectAllowed = "all", p.dataTransfer.dropEffect = "copy", p.dataTransfer.setData("items", JSON.stringify(s.getSelected()));
    }, u = (p, g) => {
      p.preventDefault(), s.isDraggingRef.value = !1;
      let E = JSON.parse(p.dataTransfer.getData("items"));
      if (E.find(($) => $.storage !== n.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      n.modal.open(Pn, { items: { from: E, to: g } });
    }, v = (p, g) => {
      p.preventDefault(), !g || g.type !== "dir" || s.getSelection().find((E) => E === p.currentTarget) ? (p.dataTransfer.dropEffect = "none", p.dataTransfer.effectAllowed = "none") : p.dataTransfer.dropEffect = "copy";
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
        const g = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: p.target.getBoundingClientRect().x,
          clientY: p.target.getBoundingClientRect().y
        });
        p.target.dispatchEvent(g);
      }, 500);
    };
    return (p, g) => pe((f(), b("div", {
      style: sn({ opacity: l(s).isDraggingRef.value && l(s).getSelection().find((E) => p.$el === E) ? "0.5 !important" : "" }),
      class: ye(["vuefinder__item", "vf-item-" + l(s).explorerId, t.disabled ? "vuefinder__item--disabled" : ""]),
      "data-type": t.item.type,
      key: t.item.path,
      "data-item": JSON.stringify(t.item),
      "data-index": t.index,
      onDblclick: g[0] || (g[0] = (E) => a(t.item)),
      onTouchstart: g[1] || (g[1] = (E) => h(E)),
      onTouchend: g[2] || (g[2] = (E) => y()),
      onContextmenu: g[3] || (g[3] = kt((E) => i(E, t.item), ["prevent"]))
    }, [
      Ot(p.$slots, "default"),
      l(n).pinnedFolders.find((E) => E.path === t.item.path) ? (f(), G(l(xo), {
        key: 0,
        class: "vuefinder__item--pinned"
      })) : F("", !0)
    ], 46, Wc)), [
      [d, t.item]
    ]);
  }
}, Yc = { class: "vuefinder__explorer__container" }, Kc = {
  key: 0,
  class: "vuefinder__explorer__header"
}, Xc = { class: "vuefinder__explorer__drag-item" }, Jc = { class: "vuefinder__explorer__item-list-content" }, Qc = { class: "vuefinder__explorer__item-list-name" }, Zc = { class: "vuefinder__explorer__item-name" }, ed = { class: "vuefinder__explorer__item-path" }, td = { class: "vuefinder__explorer__item-list-content" }, nd = { class: "vuefinder__explorer__item-list-name" }, sd = {
  key: 0,
  style: { color: "red" }
}, od = {
  key: 1,
  class: "vuefinder__explorer__item-name"
}, rd = {
  key: 2,
  class: "vuefinder__explorer__item-name"
}, ld = { class: "vuefinder__explorer__item-size" }, ad = {
  class: "vuefinder__explorer__item-grid-content flex",
  style: { "justify-content": "center", "align-items": "center" }
}, id = ["data-src", "alt"], cd = {
  key: 2,
  class: "vuefinder__explorer__item-hasReader",
  style: { position: "absolute", "font-size": "10px", top: "0px", right: "0", "font-weight": "bold", color: "red" }
}, dd = {
  key: 3,
  class: "vuefinder__explorer__item-extension",
  style: { position: "relative", "font-size": "16px", top: "10px", "font-weight": "bold", "text-align": "left" }
}, ud = {
  key: 0,
  class: "vuefinder__explorer__item-title break-all"
}, vd = {
  key: 1,
  class: "vuefinder__explorer__item-title break-all"
}, fd = ["onClick"], _d = {
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
    let u;
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
    const v = dt({ active: !1, column: "", order: "" }), m = (h = !0) => {
      let p = [...s.fs.data.files], g = v.column, E = v.order === "asc" ? 1 : -1;
      if (!h)
        return p;
      const $ = (w, x) => typeof w == "string" && typeof x == "string" ? w.toLowerCase().localeCompare(x.toLowerCase()) : w < x ? -1 : w > x ? 1 : 0;
      return v.active && (p = p.slice().sort((w, x) => $(w[g], x[g]) * E)), p;
    }, _ = (h) => {
      v.active && v.column === h ? (v.active = v.order === "asc", v.column = h, v.order = "desc") : (v.active = !0, v.column = h, v.order = "asc");
    }, y = (h) => {
      n("onAddProcessImageClick", h);
    };
    return Ee(() => {
      u = new zo(c.area.value);
    }), As(() => {
      u.update();
    }), Oo(() => {
      u.destroy();
    }), (h, p) => (f(), b("div", Yc, [
      l(s).view === "list" || d.value.length ? (f(), b("div", Kc, [
        r("div", {
          onClick: p[0] || (p[0] = (g) => _("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          K(k(l(o)("Name")) + " ", 1),
          pe(W(Cs, {
            direction: v.order
          }, null, 8, ["direction"]), [
            [Ze, v.active && v.column === "basename"]
          ])
        ]),
        d.value.length ? F("", !0) : (f(), b("div", {
          key: 0,
          onClick: p[1] || (p[1] = (g) => _("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          K(k(l(o)("Size")) + " ", 1),
          pe(W(Cs, {
            direction: v.order
          }, null, 8, ["direction"]), [
            [Ze, v.active && v.column === "file_size"]
          ])
        ])),
        (d.value.length, F("", !0)),
        (d.value.length, F("", !0))
      ])) : F("", !0),
      r("div", Xc, [
        W(zc, {
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
        onContextmenu: p[4] || (p[4] = kt((g) => l(s).emitter.emit("vf-contextmenu-show", { event: g, items: l(c).getSelected() }), ["self", "prevent"]))
      }, [
        d.value.length ? (f(!0), b($e, { key: 0 }, Ce(m(), (g, E) => (f(), G(Cn, {
          item: g,
          index: E,
          dragImage: i.value,
          class: "vf-item vf-item-list"
        }, {
          default: ee(() => [
            r("div", Jc, [
              r("div", Qc, [
                W($n, {
                  type: g.type,
                  small: l(s).compactListView
                }, null, 8, ["type", "small"]),
                r("span", Zc, k(g.basename), 1)
              ]),
              r("div", ed, k(g.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : F("", !0),
        l(s).view === "list" && !d.value.length ? (f(!0), b($e, { key: 1 }, Ce(m(), (g, E) => (f(), G(Cn, {
          item: g,
          index: E,
          dragImage: i.value,
          class: "vf-item vf-item-list",
          draggable: g.onlyRead ? "false" : "true",
          key: g.path
        }, {
          default: ee(() => [
            r("div", td, [
              r("div", nd, [
                W($n, {
                  type: g.type,
                  small: l(s).compactListView
                }, null, 8, ["type", "small"]),
                g.type !== "dir" && g.hasReader ? (f(), b("span", sd, "[打开]")) : F("", !0),
                g.onlyRead ? (f(), b("span", od, " [读]" + k(g.basename), 1)) : F("", !0),
                g.onlyRead ? F("", !0) : (f(), b("span", rd, k(g.basename), 1))
              ]),
              r("div", ld, k(g.file_size ? l(s).filesize(g.file_size) : ""), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage", "draggable"]))), 128)) : F("", !0),
        l(s).view === "grid" && !d.value.length ? (f(!0), b($e, { key: 2 }, Ce(m(!1), (g, E) => (f(), G(Cn, {
          item: g,
          index: E,
          dragImage: i.value,
          class: "vf-item vf-item-grid",
          disabled: !g.canopt,
          draggable: !g.onlyRead && g.canopt ? "true" : "false"
        }, {
          default: ee(() => [
            r("div", null, [
              r("div", ad, [
                (g.mime_type ?? "").startsWith("image") && l(s).showThumbnails ? (f(), b("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "vuefinder__explorer__item-thumbnail lazy",
                  "data-src": l(s).requester.getPreviewUrl(l(s).fs.adapter, g),
                  alt: g.basename,
                  key: g.path
                }, null, 8, id)) : (f(), G($n, {
                  key: 1,
                  type: g.type
                }, null, 8, ["type"])),
                g.type !== "dir" && g.hasReader ? (f(), b("span", cd, " 打开过 ")) : F("", !0),
                g.type !== "dir" ? (f(), b("div", dd, k(a(g.extension)), 1)) : F("", !0)
              ]),
              g.onlyRead ? (f(), b("span", ud, k(l(xs)("【只读】" + g.basename)), 1)) : (f(), b("span", vd, k(l(xs)(g.basename)), 1)),
              t.showProcess ? (f(), b("div", {
                key: 2,
                onClick: kt(($) => y(g), ["stop"]),
                class: "vuefinder__explorer__item-add-process-image vuefinder__btn mb-[5px]",
                style: { "margin-left": "10px", "margin-right": "10px" }
              }, " 加工艺图 ", 8, fd)) : F("", !0)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage", "disabled", "draggable"]))), 256)) : F("", !0)
      ], 544),
      W(Ac)
    ]));
  }
}, md = { class: "vuefinder__text-preview" }, pd = { class: "vuefinder__text-preview__header" }, hd = ["title"], gd = { class: "vuefinder__text-preview__actions" }, bd = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, wd = { key: 1 }, yd = {
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, s = O(""), o = O(""), a = O(null), i = O(!1), d = O(""), c = O(!1), u = le("ServiceContainer"), { t: v } = u.i18n;
    Ee(() => {
      u.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: u.modal.data.adapter, path: u.modal.data.item.path },
        responseType: "text"
      }).then((y) => {
        s.value = y, n("success");
      });
    });
    const m = () => {
      i.value = !i.value, o.value = s.value;
    }, _ = () => {
      d.value = "", c.value = !1, u.requester.send({
        url: "",
        method: "post",
        params: {
          q: "save",
          adapter: u.modal.data.adapter,
          path: u.modal.data.item.path
        },
        body: {
          content: o.value
        },
        responseType: "text"
      }).then((y) => {
        d.value = v("Updated."), s.value = y, n("success"), i.value = !i.value;
      }).catch((y) => {
        d.value = v(y.message), c.value = !0;
      });
    };
    return (y, h) => (f(), b("div", md, [
      r("div", pd, [
        r("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: l(u).modal.data.item.path
        }, k(l(u).modal.data.item.basename), 9, hd),
        r("div", gd, [
          i.value ? (f(), b("button", {
            key: 0,
            onClick: _,
            class: "vuefinder__text-preview__save-button"
          }, k(l(v)("Save")), 1)) : F("", !0),
          l(u).features.includes(l(ve).EDIT) ? (f(), b("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: h[0] || (h[0] = (p) => m())
          }, k(i.value ? l(v)("Cancel") : l(v)("Edit")), 1)) : F("", !0)
        ])
      ]),
      r("div", null, [
        i.value ? (f(), b("div", wd, [
          pe(r("textarea", {
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
        ])) : (f(), b("pre", bd, k(s.value), 1)),
        d.value.length ? (f(), G(ot, {
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
}, kd = { class: "vuefinder__image-preview" }, Sd = { class: "vuefinder__image-preview__header" }, xd = ["title"], $d = { class: "vuefinder__image-preview__actions" }, Cd = { class: "vuefinder__image-preview__image-container" }, Ed = ["src"], Ad = {
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, s = le("ServiceContainer"), { t: o } = s.i18n, a = O(null), i = O(null), d = O(!1), c = O(""), u = O(!1), v = () => {
      d.value = !d.value, d.value ? i.value = new Go(a.value, {
        crop(_) {
        }
      }) : i.value.destroy();
    }, m = () => {
      i.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (_) => {
          c.value = "", u.value = !1;
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
            c.value = o("Updated."), a.value.src = s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item), v(), n("success");
          }).catch((h) => {
            c.value = o(h.message), u.value = !0;
          });
        }
      );
    };
    return Ee(() => {
      n("success");
    }), (_, y) => (f(), b("div", kd, [
      r("div", Sd, [
        r("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: l(s).modal.data.item.path
        }, k(l(s).modal.data.item.basename), 9, xd),
        r("div", $d, [
          d.value ? (f(), b("button", {
            key: 0,
            onClick: m,
            class: "vuefinder__image-preview__crop-button"
          }, k(l(o)("Crop")), 1)) : F("", !0),
          l(s).features.includes(l(ve).EDIT) ? (f(), b("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: y[0] || (y[0] = (h) => v())
          }, k(d.value ? l(o)("Cancel") : l(o)("Edit")), 1)) : F("", !0)
        ])
      ]),
      r("div", Cd, [
        r("img", {
          ref_key: "image",
          ref: a,
          class: "vuefinder__image-preview__image",
          src: l(s).requester.getPreviewUrl(l(s).modal.data.adapter, l(s).modal.data.item),
          alt: ""
        }, null, 8, Ed)
      ]),
      c.value.length ? (f(), G(ot, {
        key: 0,
        onHidden: y[1] || (y[1] = (h) => c.value = ""),
        error: u.value
      }, {
        default: ee(() => [
          K(k(c.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : F("", !0)
    ]));
  }
}, Td = { class: "vuefinder__default-preview" }, Dd = { class: "vuefinder__default-preview__header" }, Vd = ["title"], Md = {
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = le("ServiceContainer"), s = e;
    return Ee(() => {
      s("success");
    }), (o, a) => (f(), b("div", Td, [
      r("div", Dd, [
        r("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: l(n).modal.data.item.path
        }, k(l(n).modal.data.item.basename), 9, Vd)
      ]),
      a[0] || (a[0] = r("div", null, null, -1))
    ]));
  }
}, Ld = { class: "vuefinder__video-preview" }, Od = ["title"], Bd = {
  class: "vuefinder__video-preview__video",
  preload: "",
  controls: ""
}, Rd = ["src"], Id = {
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = le("ServiceContainer"), s = e, o = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Ee(() => {
      s("success");
    }), (a, i) => (f(), b("div", Ld, [
      r("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: l(n).modal.data.item.path
      }, k(l(n).modal.data.item.basename), 9, Od),
      r("div", null, [
        r("video", Bd, [
          r("source", {
            src: o(),
            type: "video/mp4"
          }, null, 8, Rd),
          i[0] || (i[0] = K(" Your browser does not support the video tag. "))
        ])
      ])
    ]));
  }
}, Fd = { class: "vuefinder__audio-preview" }, Hd = ["title"], Nd = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, Ud = ["src"], Pd = {
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, s = le("ServiceContainer"), o = () => s.requester.getPreviewUrl(s.modal.data.adapter, s.modal.data.item);
    return Ee(() => {
      n("success");
    }), (a, i) => (f(), b("div", Fd, [
      r("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: l(s).modal.data.item.path
      }, k(l(s).modal.data.item.basename), 9, Hd),
      r("div", null, [
        r("audio", Nd, [
          r("source", {
            src: o(),
            type: "audio/mpeg"
          }, null, 8, Ud),
          i[0] || (i[0] = K(" Your browser does not support the audio element. "))
        ])
      ])
    ]));
  }
}, qd = { class: "vuefinder__pdf-preview" }, zd = ["title"], Gd = ["data"], jd = ["src"], Wd = {
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = le("ServiceContainer"), s = e, o = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Ee(() => {
      s("success");
    }), (a, i) => (f(), b("div", qd, [
      r("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: l(n).modal.data.item.path
      }, k(l(n).modal.data.item.basename), 9, zd),
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
          ]), 8, jd)
        ], 8, Gd)
      ])
    ]));
  }
}, Yd = { class: "vuefinder__preview-modal__content" }, Kd = { key: 0 }, Xd = { class: "vuefinder__preview-modal__loading" }, Jd = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, Qd = { class: "vuefinder__preview-modal__details" }, Zd = { class: "font-bold" }, eu = { class: "font-bold pl-2" }, tu = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, nu = ["download", "href"], su = {
  __name: "ModalPreview",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, s = O(!1), o = (i) => (e.modal.data.item.mime_type ?? "").startsWith(i), a = e.features.includes(ve.PREVIEW);
    return a || (s.value = !0), (i, d) => (f(), G(st, null, {
      buttons: ee(() => [
        r("button", {
          type: "button",
          onClick: d[6] || (d[6] = (c) => l(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, k(l(n)("Close")), 1),
        l(e).features.includes(l(ve).DOWNLOAD) ? (f(), b("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: l(e).requester.getDownloadUrl(l(e).modal.data.adapter, l(e).modal.data.item),
          href: l(e).requester.getDownloadUrl(l(e).modal.data.adapter, l(e).modal.data.item)
        }, k(l(n)("Download")), 9, nu)) : F("", !0)
      ]),
      default: ee(() => [
        r("div", null, [
          r("div", Yd, [
            l(a) ? (f(), b("div", Kd, [
              o("text") ? (f(), G(yd, {
                key: 0,
                onSuccess: d[0] || (d[0] = (c) => s.value = !0)
              })) : o("image") ? (f(), G(Ad, {
                key: 1,
                onSuccess: d[1] || (d[1] = (c) => s.value = !0)
              })) : o("video") ? (f(), G(Id, {
                key: 2,
                onSuccess: d[2] || (d[2] = (c) => s.value = !0)
              })) : o("audio") ? (f(), G(Pd, {
                key: 3,
                onSuccess: d[3] || (d[3] = (c) => s.value = !0)
              })) : o("application/pdf") ? (f(), G(Wd, {
                key: 4,
                onSuccess: d[4] || (d[4] = (c) => s.value = !0)
              })) : (f(), G(Md, {
                key: 5,
                onSuccess: d[5] || (d[5] = (c) => s.value = !0)
              }))
            ])) : F("", !0),
            r("div", Xd, [
              s.value === !1 ? (f(), b("div", Jd, [
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
        r("div", Qd, [
          r("div", null, [
            r("span", Zd, k(l(n)("File Size")) + ": ", 1),
            K(k(l(e).filesize(l(e).modal.data.item.file_size)), 1)
          ]),
          r("div", null, [
            r("span", eu, k(l(n)("Last Modified")) + ": ", 1),
            K(" " + k(l(Cc)(l(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        l(e).features.includes(l(ve).DOWNLOAD) ? (f(), b("div", tu, [
          r("span", null, k(l(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : F("", !0)
      ]),
      _: 1
    }));
  }
}, ou = ["href", "download"], ru = ["onClick"], lu = {
  __name: "ContextMenu",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, s = O(null), o = O([]), a = O(""), i = dt({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), d = Ye(() => i.items.filter((_) => _.key == null || e.features.includes(_.key)));
    e.emitter.on("vf-context-selected", (_) => {
      o.value = _;
    });
    const c = {
      newfolder: {
        key: ve.NEW_FOLDER,
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
        key: ve.DELETE,
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
        key: ve.PREVIEW,
        title: () => n("Preview"),
        action: () => e.modal.open(su, { adapter: e.fs.adapter, item: o.value[0] })
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
        key: ve.DOWNLOAD,
        link: Ye(() => e.requester.getDownloadUrl(e.fs.adapter, o.value[0])),
        title: () => n("Download"),
        action: () => {
        }
      },
      archive: {
        key: ve.ARCHIVE,
        title: () => n("Archive"),
        action: () => e.modal.open(ii, { items: o })
      },
      unarchive: {
        key: ve.UNARCHIVE,
        title: () => n("Unarchive"),
        action: () => e.modal.open(Xa, { items: o })
      },
      rename: {
        key: ve.RENAME,
        title: () => n("Rename"),
        action: () => e.modal.open($a, { items: o })
      },
      setAllOnlyRead: {
        key: ve.SETALLONLY,
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
    }, u = (_) => {
      e.emitter.emit("vf-contextmenu-hide"), _.action();
    };
    e.emitter.on("vf-search-query", ({ newQuery: _ }) => {
      a.value = _;
    });
    const v = (_, y, h) => {
      y.some((p) => p.onlyRead) || o.value.some((p) => p.onlyRead) || _.push(h);
    };
    e.emitter.on("vf-contextmenu-show", ({ event: _, items: y, target: h = null }) => {
      if (i.items = [], a.value)
        if (h)
          i.items.push(c.openDir), e.emitter.emit("vf-context-selected", [h]);
        else
          return;
      else !h && !a.value ? (i.items.push(c.refresh), i.items.push(c.selectAll), i.items.push(c.newfolder), e.emitter.emit("vf-context-selected", [])) : y.length > 1 && y.some((p) => p.path === h.path) ? (i.items.push(c.refresh), v(i.items, [h], c.delete), i.items.push(c.setAllOnlyRead), e.emitter.emit("vf-context-selected", y)) : (h.type === "dir" ? (i.items.push(c.open), i.items.push(c.setAllOnlyRead), e.pinnedFolders.findIndex((p) => p.path === h.path) !== -1 ? i.items.push(c.unpinFolder) : i.items.push(c.pinFolder)) : (i.items.push(c.preview), i.items.push(c.download), i.items.push(c.setAllOnlyRead)), v(i.items, [h], c.rename), v(i.items, [h], c.delete), e.emitter.emit("vf-context-selected", [h]));
      m(_);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const m = (_) => {
      const y = e.dragSelect.area.value, h = e.root.getBoundingClientRect(), p = y.getBoundingClientRect();
      let g = _.clientX - h.left, E = _.clientY - h.top;
      i.active = !0, at(() => {
        var I;
        const $ = (I = s.value) == null ? void 0 : I.getBoundingClientRect();
        let w = ($ == null ? void 0 : $.height) ?? 0, x = ($ == null ? void 0 : $.width) ?? 0;
        g = p.right - _.pageX + window.scrollX < x ? g - x : g, E = p.bottom - _.pageY + window.scrollY < w ? E - w : E, i.positions = {
          left: g + "px",
          top: E + "px"
        };
      });
    };
    return (_, y) => pe((f(), b("ul", {
      ref_key: "contextmenu",
      ref: s,
      style: sn(i.positions),
      class: "vuefinder__context-menu"
    }, [
      (f(!0), b($e, null, Ce(d.value, (h) => (f(), b("li", {
        class: "vuefinder__context-menu__item",
        key: h.title
      }, [
        h.link ? (f(), b("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: h.link,
          download: h.link,
          onClick: y[0] || (y[0] = (p) => l(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          r("span", null, k(h.title()), 1)
        ], 8, ou)) : (f(), b("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (p) => u(h)
        }, [
          r("span", null, k(h.title()), 1)
        ], 8, ru))
      ]))), 128))
    ], 4)), [
      [Ze, i.active]
    ]);
  }
}, au = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function iu(t, e) {
  return f(), b("svg", au, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ]));
}
const $o = { render: iu }, cu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
};
function du(t, e) {
  return f(), b("svg", cu, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    }, null, -1)
  ]));
}
const uu = { render: du }, vu = { class: "vuefinder__status-bar__wrapper" }, fu = { class: "vuefinder__status-bar__storage" }, _u = ["title"], mu = { class: "vuefinder__status-bar__storage-icon" }, pu = ["value"], hu = { class: "vuefinder__status-bar__info" }, gu = { key: 0 }, bu = { class: "vuefinder__status-bar__selected-count" }, wu = { class: "vuefinder__status-bar__actions" }, yu = ["disabled"], ku = ["title"], Su = {
  __name: "Statusbar",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, { setStore: s } = e.storage, o = e.dragSelect, a = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter } }), s("adapter", e.fs.adapter);
    }, i = O("");
    e.emitter.on("vf-search-query", ({ newQuery: c }) => {
      i.value = c;
    });
    const d = Ye(() => {
      const c = e.selectButton.multiple ? o.getSelected().length > 0 : o.getSelected().length === 1;
      return e.selectButton.active && c;
    });
    return (c, u) => (f(), b("div", vu, [
      r("div", fu, [
        r("div", {
          class: "vuefinder__status-bar__storage-container",
          title: l(n)("Storage")
        }, [
          r("div", mu, [
            W(l($o))
          ]),
          pe(r("select", {
            "onUpdate:modelValue": u[0] || (u[0] = (v) => l(e).fs.adapter = v),
            onChange: a,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (f(!0), b($e, null, Ce(l(e).fs.data.storages, (v) => (f(), b("option", { value: v }, k(v), 9, pu))), 256))
          ], 544), [
            [En, l(e).fs.adapter]
          ])
        ], 8, _u),
        r("div", hu, [
          i.value.length ? (f(), b("span", gu, k(l(e).fs.data.files.length) + " items found. ", 1)) : F("", !0),
          r("span", bu, k(l(e).dragSelect.getCount() > 0 ? l(n)("%s item(s) selected.", l(e).dragSelect.getCount()) : ""), 1)
        ])
      ]),
      r("div", wu, [
        l(e).selectButton.active ? (f(), b("button", {
          key: 0,
          class: ye(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: u[1] || (u[1] = (v) => l(e).selectButton.click(l(o).getSelected(), v))
        }, k(l(n)("Select")), 11, yu)) : F("", !0),
        r("span", {
          class: "vuefinder__status-bar__about",
          title: l(n)("About"),
          onClick: u[2] || (u[2] = (v) => l(e).modal.open(_a))
        }, [
          W(l(uu))
        ], 8, ku)
      ])
    ]));
  }
}, xu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
};
function $u(t, e) {
  return f(), b("svg", xu, e[0] || (e[0] = [
    r("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ]));
}
const Co = { render: $u }, Cu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Eu(t, e) {
  return f(), b("svg", Cu, e[0] || (e[0] = [
    r("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ]));
}
const Au = { render: Eu }, Tu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Du(t, e) {
  return f(), b("svg", Tu, e[0] || (e[0] = [
    r("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M15 12H9M12 9v6" }, null, -1)
  ]));
}
const Eo = { render: Du }, Vu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function Mu(t, e) {
  return f(), b("svg", Vu, e[0] || (e[0] = [
    r("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    r("path", { d: "M9 12h6" }, null, -1)
  ]));
}
const Ao = { render: Mu };
function To(t, e) {
  const n = t.findIndex((s) => s.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const Lu = { class: "vuefinder__folder-loader-indicator" }, Ou = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, Do = {
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ Fo({
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
        To(n.treeViewData, { path: e.path, ...d });
      }).catch((d) => {
      }).finally(() => {
        o.value = !1;
      });
    };
    return (d, c) => {
      var u;
      return f(), b("div", Lu, [
        o.value ? (f(), G(l(es), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--loading"
        })) : (f(), b("div", Ou, [
          s.value && ((u = a()) != null && u.folders.length) ? (f(), G(l(Ao), {
            key: 0,
            class: "vuefinder__folder-loader-indicator--minus"
          })) : F("", !0),
          s.value ? F("", !0) : (f(), G(l(Eo), {
            key: 1,
            class: "vuefinder__folder-loader-indicator--plus"
          }))
        ]))
      ]);
    };
  }
}, Bu = { class: "vuefinder__treesubfolderlist__item-content" }, Ru = ["onClick"], Iu = ["title", "onClick"], Fu = { class: "vuefinder__treesubfolderlist__item-icon" }, Hu = { class: "vuefinder__treesubfolderlist__subfolder" }, Nu = {
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
      s.path === s.adapter + "://" && Ke(o.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const a = Ye(() => {
      var i;
      return ((i = e.treeViewData.find((d) => d.path === s.path)) == null ? void 0 : i.folders) || [];
    });
    return (i, d) => {
      const c = Ho("TreeSubfolderList", !0);
      return f(), b("ul", {
        ref_key: "parentSubfolderList",
        ref: o,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (f(!0), b($e, null, Ce(a.value, (u, v) => (f(), b("li", {
          key: u.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          r("div", Bu, [
            r("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (m) => n.value[u.path] = !n.value[u.path]
            }, [
              W(Do, {
                adapter: t.adapter,
                path: u.path,
                modelValue: n.value[u.path],
                "onUpdate:modelValue": (m) => n.value[u.path] = m
              }, null, 8, ["adapter", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, Ru),
            r("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: u.path,
              onClick: (m) => l(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: s.adapter, path: u.path } })
            }, [
              r("div", Fu, [
                l(e).fs.path === u.path ? (f(), G(l(Co), { key: 0 })) : (f(), G(l(pn), { key: 1 }))
              ]),
              r("div", {
                class: ye(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": l(e).fs.path === u.path
                }])
              }, k(u.basename), 3)
            ], 8, Iu)
          ]),
          r("div", Hu, [
            pe(W(c, {
              adapter: s.adapter,
              path: u.path
            }, null, 8, ["adapter", "path"]), [
              [Ze, n.value[u.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}, Uu = { class: "vuefinder__treestorageitem__loader" }, Pu = {
  __name: "TreeStorageItem",
  props: {
    storage: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = le("ServiceContainer"), n = O(!1);
    return (s, o) => (f(), b($e, null, [
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
            W(l($o))
          ], 2),
          r("div", null, k(t.storage), 1)
        ], 2),
        r("div", Uu, [
          W(Do, {
            adapter: t.storage,
            path: t.storage + "://",
            modelValue: n.value,
            "onUpdate:modelValue": o[0] || (o[0] = (a) => n.value = a)
          }, null, 8, ["adapter", "path", "modelValue"])
        ])
      ]),
      pe(W(Nu, {
        adapter: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["adapter", "path"]), [
        [Ze, n.value]
      ])
    ], 64));
  }
}, qu = { class: "vuefinder__folder-indicator" }, zu = { class: "vuefinder__folder-indicator--icon" }, Gu = {
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = Ds(t, "modelValue");
    return (n, s) => (f(), b("div", qu, [
      r("div", zu, [
        e.value ? (f(), G(l(Ao), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : F("", !0),
        e.value ? F("", !0) : (f(), G(l(Eo), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}, ju = { class: "vuefinder__treeview__header" }, Wu = { class: "vuefinder__treeview__pinned-label" }, Yu = { class: "vuefinder__treeview__pin-text text-nowrap" }, Ku = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Xu = { class: "vuefinder__treeview__pinned-item" }, Ju = ["onClick"], Qu = ["title"], Zu = ["onClick"], ev = { key: 0 }, tv = { class: "vuefinder__treeview__no-pinned" }, nv = { class: "vuefinder__treeview__storage" }, sv = {
  __name: "TreeView",
  setup(t) {
    const e = le("ServiceContainer"), { t: n } = e.i18n, { getStore: s, setStore: o } = e.storage, a = O(190), i = O(s("pinned-folders-opened", !0));
    Oe(i, (v) => o("pinned-folders-opened", v));
    const d = (v) => {
      e.pinnedFolders = e.pinnedFolders.filter((m) => m.path !== v.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, c = (v) => {
      const m = v.clientX, _ = v.target.parentElement, y = _.getBoundingClientRect().width;
      _.classList.remove("transition-[width]"), _.classList.add("transition-none");
      const h = (g) => {
        a.value = y + g.clientX - m, a.value < 50 && (a.value = 0, e.showTreeView = !1), a.value > 50 && (e.showTreeView = !0);
      }, p = () => {
        const g = _.getBoundingClientRect();
        a.value = g.width, _.classList.add("transition-[width]"), _.classList.remove("transition-none"), window.removeEventListener("mousemove", h), window.removeEventListener("mouseup", p);
      };
      window.addEventListener("mousemove", h), window.addEventListener("mouseup", p);
    }, u = O(null);
    return Ee(() => {
      Ke(u.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), Oe(e.fs.data, (v, m) => {
      const _ = v.files.filter((y) => y.type === "dir");
      To(e.treeViewData, { path: e.fs.path, folders: _.map((y) => ({
        adapter: y.storage,
        path: y.path,
        basename: y.basename
      })) });
    }), (v, m) => (f(), b($e, null, [
      r("div", {
        onClick: m[0] || (m[0] = (_) => l(e).showTreeView = !l(e).showTreeView),
        class: ye(["vuefinder__treeview__overlay", l(e).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      r("div", {
        style: sn(l(e).showTreeView ? "min-width:100px;max-width:75%; width: " + a.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        r("div", {
          ref_key: "treeViewScrollElement",
          ref: u,
          class: "vuefinder__treeview__scroll"
        }, [
          r("div", ju, [
            r("div", {
              onClick: m[2] || (m[2] = (_) => i.value = !i.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              r("div", Wu, [
                W(l(xo), { class: "vuefinder__treeview__pin-icon" }),
                r("div", Yu, k(l(n)("Pinned Folders")), 1)
              ]),
              W(Gu, {
                modelValue: i.value,
                "onUpdate:modelValue": m[1] || (m[1] = (_) => i.value = _)
              }, null, 8, ["modelValue"])
            ]),
            i.value ? (f(), b("ul", Ku, [
              (f(!0), b($e, null, Ce(l(e).pinnedFolders, (_) => (f(), b("li", Xu, [
                r("div", {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (y) => l(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: _.storage, path: _.path } })
                }, [
                  l(e).fs.path !== _.path ? (f(), G(l(pn), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : F("", !0),
                  l(e).fs.path === _.path ? (f(), G(l(Co), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : F("", !0),
                  r("div", {
                    title: _.path,
                    class: ye(["vuefinder__treeview__folder-name text-nowrap", {
                      "vuefinder__treeview__folder-name--active": l(e).fs.path === _.path
                    }])
                  }, k(_.basename), 11, Qu)
                ], 8, Ju),
                r("div", {
                  class: "vuefinder__treeview__remove-favorite",
                  onClick: (y) => d(_)
                }, [
                  W(l(Au), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Zu)
              ]))), 256)),
              l(e).pinnedFolders.length ? F("", !0) : (f(), b("li", ev, [
                r("div", tv, k(l(n)("No folders pinned")), 1)
              ]))
            ])) : F("", !0)
          ]),
          (f(!0), b($e, null, Ce(l(e).fs.data.storages, (_) => (f(), b("div", nv, [
            W(Pu, { storage: _ }, null, 8, ["storage"])
          ]))), 256))
        ], 512),
        r("div", {
          onMousedown: c,
          class: ye([(l(e).showTreeView, ""), "vuefinder__treeview__resize-handle"])
        }, null, 34)
      ], 4)
    ], 64));
  }
}, ov = { class: "vuefinder__main__content" }, rv = {
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
    showToolBar: {
      type: Boolean,
      default: !1
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
    const s = n, o = t, a = nl(o, le("VueFinderOptions"));
    No("ServiceContainer", a);
    const { setStore: i } = a.storage, d = O(null);
    a.root = d;
    const c = a.dragSelect;
    Ca();
    const u = (h) => {
      h.files = h.files.map((p) => (p.onlyRead = a.onlyReadFileStore.hasItem(p.path), p)), Object.assign(a.fs.data, h), c.clearSelection(), c.refreshSelection();
    };
    let v;
    a.emitter.on("vf-fetch-abort", () => {
      v.abort(), a.fs.loading = !1;
    }), a.emitter.on("vf-fetch", ({ params: h, body: p = null, onSuccess: g = null, onError: E = null, noCloseModal: $ = !1 }) => {
      ["index", "search"].includes(h.q) && (v && v.abort(), a.fs.loading = !0), v = new AbortController();
      const w = v.signal;
      a.requester.send({
        url: "",
        method: h.m || "get",
        params: h,
        body: p,
        abortSignal: w
      }).then((x) => {
        a.fs.adapter = x.adapter, a.persist && (a.fs.path = x.dirname, i("path", a.fs.path)), ["index", "search"].includes(h.q) && (a.fs.loading = !1), $ || a.modal.close(), u(x), g && g(x);
      }).catch((x) => {
        console.error(x), E && E(x);
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
    }), (h, p) => (f(), b("div", {
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
          style: sn(l(a).fullScreen ? "" : "max-height: " + t.maxHeight),
          onMousedown: p[0] || (p[0] = (g) => l(a).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: p[1] || (p[1] = (g) => l(a).emitter.emit("vf-contextmenu-hide"))
        }, [
          !t.simple || t.showToolBar ? (f(), G(Ci, { key: 0 })) : F("", !0),
          t.showPath ? (f(), G($c, { key: 1 })) : F("", !0),
          r("div", ov, [
            W(sv),
            W(_d, {
              showProcess: t.showProcess,
              onOnAddProcessImageClick: y
            }, null, 8, ["showProcess"])
          ]),
          t.simple ? F("", !0) : (f(), G(Su, { key: 2 }))
        ], 38),
        W(Uo, { name: "fade" }, {
          default: ee(() => [
            l(a).modal.visible ? (f(), G(Ts(l(a).modal.type), { key: 0 })) : F("", !0)
          ]),
          _: 1
        }),
        W(lu)
      ], 2)
    ], 512));
  }
}, hv = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [n] = Object.keys(e.i18n);
    e.locale = e.locale ?? n ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", rv);
  }
};
export {
  hv as default
};
