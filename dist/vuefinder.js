var Go = Object.defineProperty;
var jo = (t, e, n) => e in t ? Go(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var as = (t, e, n) => jo(t, typeof e != "symbol" ? e + "" : e, n);
import { reactive as At, watch as Oe, ref as A, shallowRef as Wo, onMounted as Ee, onUnmounted as jn, onUpdated as Ms, nextTick as dt, computed as ot, inject as re, openBlock as _, createElementBlock as h, withKeys as Dt, unref as o, createElementVNode as l, withModifiers as st, renderSlot as Rt, normalizeClass as ae, toDisplayString as g, createBlock as j, resolveDynamicComponent as Vs, withCtx as Q, createVNode as q, Fragment as ke, renderList as Ce, createCommentVNode as U, withDirectives as _e, vModelCheckbox as zt, createTextVNode as J, vModelSelect as An, vModelText as Mt, onBeforeUnmount as Ls, customRef as Ko, vShow as ze, isRef as Yo, TransitionGroup as Xo, normalizeStyle as rn, mergeModels as Jo, useModel as Os, resolveComponent as Qo, provide as Zo, Transition as er } from "vue";
import tr from "mitt";
import nr from "dragselect";
import sr from "@uppy/core";
import or from "@uppy/xhr-upload";
import rr from "vanilla-lazyload";
import "cropperjs/dist/cropper.css";
import lr from "cropperjs";
var Ds;
const yn = (Ds = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : Ds.getAttribute("content");
class ar {
  /** @param {RequestConfig} config */
  constructor(e) {
    /** @type {RequestConfig} */
    as(this, "config");
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
    const n = this.config, r = {};
    yn != null && yn !== "" && (r[n.xsrfHeaderName] = yn);
    const s = Object.assign({}, n.headers, r, e.headers), c = Object.assign({}, n.params, e.params), i = e.body, d = n.baseUrl + e.url, a = e.method;
    let u;
    a !== "get" && (i instanceof FormData ? (u = i, n.body != null && Object.entries(this.config.body).forEach(([f, m]) => {
      u.append(f, m);
    })) : (u = { ...i }, n.body != null && Object.assign(u, this.config.body)));
    const p = {
      url: d,
      method: a,
      headers: s,
      params: c,
      body: u
    };
    if (n.transformRequest != null) {
      const f = n.transformRequest({
        url: d,
        method: a,
        headers: s,
        params: c,
        body: u
      });
      f.url != null && (p.url = f.url), f.method != null && (p.method = f.method), f.params != null && (p.params = f.params ?? {}), f.headers != null && (p.headers = f.headers ?? {}), f.body != null && (p.body = f.body);
    }
    return p;
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
    const r = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "download", adapter: e, path: n.path }
    });
    return r.url + "?" + new URLSearchParams(r.params).toString();
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
    const r = this.transformRequestParams({
      url: "",
      method: "get",
      params: { q: "preview", adapter: e, path: n.path }
    });
    return r.url + "?" + new URLSearchParams(r.params).toString();
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
    const n = this.transformRequestParams(e), r = e.responseType || "json", s = {
      method: e.method,
      headers: n.headers,
      signal: e.abortSignal
    }, c = n.url + "?" + new URLSearchParams(n.params);
    if (n.method !== "get" && n.body != null) {
      let d;
      n.body instanceof FormData ? d = e.body : (d = JSON.stringify(n.body), s.headers["Content-Type"] = "application/json"), s.body = d;
    }
    const i = await fetch(c, s);
    if (i.ok)
      return await i[r]();
    throw await i.json();
  }
}
function ir(t) {
  const e = {
    baseUrl: "",
    headers: {},
    params: {},
    body: {},
    xsrfHeaderName: "X-CSRF-Token"
  };
  return typeof t == "string" ? Object.assign(e, { baseUrl: t }) : Object.assign(e, t), new ar(e);
}
function cr(t) {
  let e = localStorage.getItem(t + "_storage");
  const n = At(JSON.parse(e ?? "{}"));
  Oe(n, r);
  function r() {
    Object.keys(n).length ? localStorage.setItem(t + "_storage", JSON.stringify(n)) : localStorage.removeItem(t + "_storage");
  }
  function s(a, u) {
    n[a] = u;
  }
  function c(a) {
    delete n[a];
  }
  function i() {
    Object.keys(n).map((a) => c(a));
  }
  return { getStore: (a, u = null) => n.hasOwnProperty(a) ? n[a] : u, setStore: s, removeStore: c, clearStore: i };
}
async function dr(t, e) {
  const n = e[t];
  return typeof n == "function" ? (await n()).default : n;
}
function ur(t, e, n, r) {
  const { getStore: s, setStore: c } = t, i = A({}), d = A(s("locale", e)), a = (f, m = e) => {
    dr(f, r).then((v) => {
      i.value = v, c("locale", f), d.value = f, c("translations", v), Object.values(r).length > 1 && (n.emit("vf-toast-push", { label: "The language is set to " + f }), n.emit("vf-language-saved"));
    }).catch((v) => {
      m ? (n.emit("vf-toast-push", { label: "The selected locale is not yet supported!", type: "error" }), a(m, null)) : n.emit("vf-toast-push", { label: "Locale cannot be loaded!", type: "error" });
    });
  };
  Oe(d, (f) => {
    a(f);
  }), !s("locale") && !r.length ? a(e) : i.value = s("translations");
  const u = (f, ...m) => m.length ? u(f = f.replace("%s", m.shift()), ...m) : f;
  function p(f, ...m) {
    return i.value && i.value.hasOwnProperty(f) ? u(i.value[f], ...m) : u(f, ...m);
  }
  return At({ t: p, locale: d });
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
  LANGUAGE: "language"
}, vr = Object.values(ve), _r = "2.5.16";
function Rs(t, e, n, r, s) {
  return (e = Math, n = e.log, r = 1024, s = n(t) / n(r) | 0, t / e.pow(r, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "iB" : "B");
}
function Hs(t, e, n, r, s) {
  return (e = Math, n = e.log, r = 1e3, s = n(t) / n(r) | 0, t / e.pow(r, s)).toFixed(0) + " " + (s ? "KMGTPEZY"[--s] + "B" : "B");
}
function fr(t) {
  const e = { k: 1, m: 2, g: 3, t: 4 }, r = /(\d+(?:\.\d+)?)\s?(k|m|g|t)?b?/i.exec(t);
  return r[1] * Math.pow(1024, e[r[2].toLowerCase()]);
}
const tt = {
  SYSTEM: "system",
  LIGHT: "light",
  DARK: "dark"
};
function mr(t, e) {
  const n = A(tt.SYSTEM), r = A(tt.LIGHT);
  n.value = t.getStore("theme", e ?? tt.SYSTEM);
  const s = window.matchMedia("(prefers-color-scheme: dark)"), c = (i) => {
    n.value === tt.DARK || n.value === tt.SYSTEM && i.matches ? r.value = tt.DARK : r.value = tt.LIGHT;
  };
  return c(s), s.addEventListener("change", c), {
    /**
     * @type {import('vue').Ref<Theme>}
     */
    value: n,
    /**
     * @type {import('vue').Ref<Theme>}
     */
    actualValue: r,
    /**
     * @param {Theme} value
     */
    set(i) {
      n.value = i, i !== tt.SYSTEM ? t.setStore("theme", i) : t.removeStore("theme"), c(s);
    }
  };
}
function pr() {
  const t = Wo(null), e = A(!1), n = A();
  return { visible: e, type: t, data: n, open: (c, i = null) => {
    document.querySelector("body").style.overflow = "hidden", e.value = !0, t.value = c, n.value = i;
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
  const { o: n, u: r, _: s } = t;
  let c = n, i;
  const d = (p, f) => {
    const m = c, v = p, b = f || (r ? !r(m, v) : m !== v);
    return (b || s) && (c = v, i = m), [c, b, i];
  };
  return [e ? (p) => d(e(c, i), p) : d, (p) => [c, !!p, i]];
}, Bs = typeof window < "u" && typeof document < "u", De = Bs ? window : {}, Kt = Math.max, hr = Math.min, Dn = Math.round, Fs = De.cancelAnimationFrame, Is = De.requestAnimationFrame, Jt = De.setTimeout, Mn = De.clearTimeout, ln = (t) => typeof De[t] < "u" ? De[t] : void 0, gr = ln("MutationObserver"), is = ln("IntersectionObserver"), Qt = ln("ResizeObserver"), Vn = ln("ScrollTimeline"), Ns = Bs && Node.ELEMENT_NODE, { toString: br, hasOwnProperty: kn } = Object.prototype, wr = /^\[object (.+)\]$/, Ft = (t) => t === void 0, an = (t) => t === null, yr = (t) => Ft(t) || an(t) ? `${t}` : br.call(t).replace(wr, "$1").toLowerCase(), Ge = (t) => typeof t == "number", cn = (t) => typeof t == "string", Us = (t) => typeof t == "boolean", je = (t) => typeof t == "function", Ue = (t) => Array.isArray(t), Ht = (t) => typeof t == "object" && !Ue(t) && !an(t), dn = (t) => {
  const e = !!t && t.length, n = Ge(e) && e > -1 && e % 1 == 0;
  return Ue(t) || !je(t) && n ? e > 0 && Ht(t) ? e - 1 in t : !0 : !1;
}, Zt = (t) => {
  if (!t || !Ht(t) || yr(t) !== "object")
    return !1;
  let e;
  const n = "constructor", r = t[n], s = r && r.prototype, c = kn.call(t, n), i = s && kn.call(s, "isPrototypeOf");
  if (r && !c && !i)
    return !1;
  for (e in t)
    ;
  return Ft(e) || kn.call(t, e);
}, en = (t) => {
  const e = HTMLElement;
  return t ? e ? t instanceof e : t.nodeType === Ns : !1;
}, un = (t) => {
  const e = Element;
  return t ? e ? t instanceof e : t.nodeType === Ns : !1;
};
function oe(t, e) {
  if (dn(t))
    for (let n = 0; n < t.length && e(t[n], n, t) !== !1; n++)
      ;
  else t && oe(Object.keys(t), (n) => e(t[n], n, t));
  return t;
}
const vn = (t, e) => t.indexOf(e) >= 0, Je = (t, e) => t.concat(e), me = (t, e, n) => (!cn(e) && dn(e) ? Array.prototype.push.apply(t, e) : t.push(e), t), _t = (t) => Array.from(t || []), Ps = (t) => Ue(t) ? t : [t], Ln = (t) => !!t && !t.length, cs = (t) => _t(new Set(t)), Re = (t, e, n) => {
  oe(t, (s) => s && s.apply(void 0, e || [])), !n && (t.length = 0);
}, qs = "paddingTop", zs = "paddingRight", Gs = "paddingLeft", js = "paddingBottom", Ws = "marginLeft", Ks = "marginRight", Ys = "marginBottom", _n = "overflowX", fn = "overflowY", St = "width", xt = "height", $t = "hidden", Xs = "visible", Wn = (t, e, n, r) => {
  if (t && e) {
    let s = !0;
    return oe(n, (c) => {
      const i = t[c], d = e[c];
      i !== d && (s = !1);
    }), s;
  }
  return !1;
}, Js = (t, e) => Wn(t, e, ["w", "h"]), Qs = (t, e) => Wn(t, e, ["x", "y"]), kr = (t, e) => Wn(t, e, ["t", "r", "b", "l"]), Ne = () => {
}, X = (t, ...e) => t.bind(0, ...e), gt = (t) => {
  let e;
  const n = t ? Jt : Is, r = t ? Mn : Fs;
  return [(s) => {
    r(e), e = n(s, je(t) ? t() : t);
  }, () => r(e)];
}, Zs = (t, e) => {
  let n, r, s, c = Ne;
  const { v: i, p: d, S: a } = e || {}, u = function(b) {
    c(), Mn(n), n = r = void 0, c = Ne, t.apply(this, b);
  }, p = (v) => a && r ? a(r, v) : v, f = () => {
    c !== Ne && u(p(s) || s);
  }, m = function() {
    const b = _t(arguments), S = je(i) ? i() : i;
    if (Ge(S) && S >= 0) {
      const V = je(d) ? d() : d, L = Ge(V) && V >= 0, w = S > 0 ? Jt : Is, E = S > 0 ? Mn : Fs, F = p(b) || b, W = u.bind(0, F);
      c();
      const R = w(W, S);
      c = () => E(R), L && !n && (n = Jt(f, V)), r = s = F;
    } else
      u(b);
  };
  return m.m = f, m;
}, eo = (t, e) => Object.prototype.hasOwnProperty.call(t, e), rt = (t) => t ? Object.keys(t) : [], se = (t, e, n, r, s, c, i) => {
  const d = [e, n, r, s, c, i];
  return (typeof t != "object" || an(t)) && !je(t) && (t = {}), oe(d, (a) => {
    oe(a, (u, p) => {
      const f = a[p];
      if (t === f)
        return !0;
      const m = Ue(f);
      if (f && Zt(f)) {
        const v = t[p];
        let b = v;
        m && !Ue(v) ? b = [] : !m && !Zt(v) && (b = {}), t[p] = se(b, f);
      } else
        t[p] = m ? f.slice() : f;
    });
  }), t;
}, to = (t, e) => oe(se({}, t), (n, r, s) => {
  n === void 0 ? delete s[r] : n && Zt(n) && (s[r] = to(n));
}), Kn = (t) => {
  for (const e in t)
    return !1;
  return !0;
}, On = (t, e, n) => Kt(t, hr(e, n)), ut = (t) => _t(new Set((Ue(t) ? t : (t || "").split(" ")).filter((e) => e))), mn = (t, e) => t && t.getAttribute(e), ds = (t, e) => t && t.hasAttribute(e), Fe = (t, e, n) => {
  oe(ut(e), (r) => {
    t && t.setAttribute(r, n || "");
  });
}, qe = (t, e) => {
  oe(ut(e), (n) => t && t.removeAttribute(n));
}, pn = (t, e) => {
  const n = ut(mn(t, e)), r = X(Fe, t, e), s = (c, i) => {
    const d = new Set(n);
    return oe(ut(c), (a) => d[i](a)), _t(d).join(" ");
  };
  return {
    $: (c) => r(s(c, "delete")),
    O: (c) => r(s(c, "add")),
    C: (c) => {
      const i = ut(c);
      return i.reduce((d, a) => d && n.includes(a), i.length > 0);
    }
  };
}, no = (t, e, n) => {
  pn(t, e).$(n);
}, Bt = (t, e, n) => (pn(t, e).O(n), X(no, t, e, n)), Yt = (t, e, n, r) => {
  (r ? Bt : no)(t, e, n);
}, Sr = (t, e, n) => pn(t, e).C(n), so = (t) => pn(t, "class"), Yn = (t, e) => {
  so(t).$(e);
}, tn = (t, e) => (so(t).O(e), X(Yn, t, e)), oo = (t, e) => {
  const n = [], r = e ? un(e) && e : document;
  return r ? me(n, r.querySelectorAll(t)) : n;
}, xr = (t, e) => {
  const n = e ? un(e) && e : document;
  return n ? n.querySelector(t) : null;
}, nn = (t, e) => un(t) ? t.matches(e) : !1, ro = (t) => nn(t, "body"), Rn = (t) => t ? _t(t.childNodes) : [], Ct = (t) => t && t.parentElement, bt = (t, e) => un(t) && t.closest(e), Hn = (t) => document.activeElement, $r = (t, e, n) => {
  const r = bt(t, e), s = t && xr(n, r), c = bt(s, e) === r;
  return r && s ? r === t || s === t || c && bt(bt(t, n), e) !== r : !1;
}, lt = (t) => {
  if (dn(t))
    oe(_t(t), (e) => lt(e));
  else if (t) {
    const e = Ct(t);
    e && e.removeChild(t);
  }
}, lo = (t, e, n) => {
  if (n && t) {
    let r = e, s;
    return dn(n) ? (s = document.createDocumentFragment(), oe(n, (c) => {
      c === r && (r = c.previousSibling), s.appendChild(c);
    })) : s = n, e && (r ? r !== e && (r = r.nextSibling) : r = t.firstChild), t.insertBefore(s, r || null), () => lt(n);
  }
  return Ne;
}, Ae = (t, e) => lo(t, null, e), us = (t, e) => lo(Ct(t), t && t.nextSibling, e), wt = (t) => {
  const e = document.createElement("div");
  return Fe(e, "class", t), e;
}, ao = (t) => {
  const e = wt();
  return e.innerHTML = t.trim(), oe(Rn(e), (n) => lt(n));
}, Cr = /^--/, vs = (t, e) => t.getPropertyValue(e) || t[e] || "", Xn = (t) => {
  const e = t || 0;
  return isFinite(e) ? e : 0;
}, Gt = (t) => Xn(parseFloat(t || "")), _s = (t) => `${(Xn(t) * 100).toFixed(3)}%`, Bn = (t) => `${Xn(t)}px`;
function Et(t, e) {
  t && oe(e, (n, r) => {
    try {
      const s = t.style, c = Ge(n) ? Bn(n) : (n || "") + "";
      Cr.test(r) ? s.setProperty(r, c) : s[r] = c;
    } catch {
    }
  });
}
function vt(t, e, n) {
  const r = cn(e);
  let s = r ? "" : {};
  if (t) {
    const c = De.getComputedStyle(t, n) || t.style;
    s = r ? vs(c, e) : e.reduce((i, d) => (i[d] = vs(c, d), i), s);
  }
  return s;
}
const nt = (t) => vt(t, "direction") === "rtl", fs = (t, e, n) => {
  const r = e ? `${e}-` : "", s = n ? `-${n}` : "", c = `${r}top${s}`, i = `${r}right${s}`, d = `${r}bottom${s}`, a = `${r}left${s}`, u = vt(t, [c, i, d, a]);
  return {
    t: Gt(u[c]),
    r: Gt(u[i]),
    b: Gt(u[d]),
    l: Gt(u[a])
  };
}, Sn = (t, e) => `translate${Ht(t) ? `(${t.x},${t.y})` : `${e ? "X" : "Y"}(${t})`}`, Er = {
  w: 0,
  h: 0
}, hn = (t, e) => e ? {
  w: e[`${t}Width`],
  h: e[`${t}Height`]
} : Er, Tr = (t) => hn("inner", t || De), Ot = X(hn, "offset"), io = X(hn, "client"), Fn = X(hn, "scroll"), Jn = (t) => {
  const e = parseFloat(vt(t, St)) || 0, n = parseFloat(vt(t, xt)) || 0;
  return {
    w: e - Dn(e),
    h: n - Dn(n)
  };
}, yt = (t) => t.getBoundingClientRect(), In = (t) => !!(t && (t[xt] || t[St])), co = (t, e) => {
  const n = In(t);
  return !In(e) && n;
}, ms = (t, e, n, r) => {
  oe(ut(e), (s) => {
    t.removeEventListener(s, n, r);
  });
}, fe = (t, e, n, r) => {
  var s;
  const c = (s = r && r.H) != null ? s : !0, i = r && r.I || !1, d = r && r.A || !1, a = {
    passive: c,
    capture: i
  };
  return X(Re, ut(e).map((u) => {
    const p = d ? (f) => {
      ms(t, u, p, i), n(f);
    } : n;
    return t.addEventListener(u, p, a), X(ms, t, u, p, i);
  }));
}, Qn = (t) => t.stopPropagation(), ps = (t) => t.preventDefault(), Ar = {
  x: 0,
  y: 0
}, xn = (t) => {
  const e = t && yt(t);
  return e ? {
    x: e.left + De.scrollX,
    y: e.top + De.scrollY
  } : Ar;
}, sn = (t, e, n) => n ? n.n ? -t + 0 : n.i ? e - t : t : t, hs = (t, e) => [sn(0, t, e), sn(t, t, e)], gs = (t, e, n) => On(0, 1, sn(t, e, n) / e || 0), at = (t, e) => {
  const { x: n, y: r } = Ge(e) ? {
    x: e,
    y: e
  } : e || {};
  Ge(n) && (t.scrollLeft = n), Ge(r) && (t.scrollTop = r);
}, Tt = (t) => ({
  x: t.scrollLeft,
  y: t.scrollTop
}), bs = (t, e) => {
  oe(Ps(e), t);
}, Nn = (t) => {
  const e = /* @__PURE__ */ new Map(), n = (c, i) => {
    if (c) {
      const d = e.get(c);
      bs((a) => {
        d && d[a ? "delete" : "clear"](a);
      }, i);
    } else
      e.forEach((d) => {
        d.clear();
      }), e.clear();
  }, r = (c, i) => {
    if (cn(c)) {
      const u = e.get(c) || /* @__PURE__ */ new Set();
      return e.set(c, u), bs((p) => {
        je(p) && u.add(p);
      }, i), X(n, c, i);
    }
    Us(i) && i && n();
    const d = rt(c), a = [];
    return oe(d, (u) => {
      const p = c[u];
      p && me(a, r(u, p));
    }), X(Re, a);
  }, s = (c, i) => {
    oe(_t(e.get(c)), (d) => {
      i && !Ln(i) ? d.apply(0, i) : d();
    });
  };
  return r(t || {}), [r, n, s];
}, ws = (t) => JSON.stringify(t, (e, n) => {
  if (je(n))
    throw 0;
  return n;
}), ys = (t, e) => t ? `${e}`.split(".").reduce((n, r) => n && eo(n, r) ? n[r] : void 0, t) : void 0, Dr = {
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
}, uo = (t, e) => {
  const n = {}, r = Je(rt(e), rt(t));
  return oe(r, (s) => {
    const c = t[s], i = e[s];
    if (Ht(c) && Ht(i))
      se(n[s] = {}, uo(c, i)), Kn(n[s]) && delete n[s];
    else if (eo(e, s) && i !== c) {
      let d = !0;
      if (Ue(c) || Ue(i))
        try {
          ws(c) === ws(i) && (d = !1);
        } catch {
        }
      d && (n[s] = i);
    }
  }), n;
}, ks = (t, e, n) => (r) => [ys(t, r), n || ys(e, r) !== void 0], It = "data-overlayscrollbars", Xt = "os-environment", jt = `${Xt}-scrollbar-hidden`, $n = `${It}-initialize`, Te = It, vo = `${Te}-overflow-x`, _o = `${Te}-overflow-y`, fo = "overflowVisible", Mr = "scrollbarPressed", Un = "updating", Vr = "body", Xe = `${It}-viewport`, Lr = "arrange", mo = "scrollbarHidden", kt = fo, Pn = `${It}-padding`, Or = kt, Ss = `${It}-content`, Zn = "os-size-observer", Rr = `${Zn}-appear`, Hr = `${Zn}-listener`, Br = "os-trinsic-observer", Fr = "os-theme-none", Me = "os-scrollbar", Ir = `${Me}-rtl`, Nr = `${Me}-horizontal`, Ur = `${Me}-vertical`, po = `${Me}-track`, es = `${Me}-handle`, Pr = `${Me}-visible`, qr = `${Me}-cornerless`, xs = `${Me}-interaction`, $s = `${Me}-unusable`, qn = `${Me}-auto-hide`, Cs = `${qn}-hidden`, Es = `${Me}-wheel`, zr = `${po}-interactive`, Gr = `${es}-interactive`, ho = {}, go = {}, jr = (t) => {
  oe(t, (e) => oe(e, (n, r) => {
    ho[r] = e[r];
  }));
}, bo = (t, e, n) => rt(t).map((r) => {
  const { static: s, instance: c } = t[r], [i, d, a] = n || [], u = n ? c : s;
  if (u) {
    const p = n ? u(i, d, e) : u(e);
    return (a || go)[r] = p;
  }
}), Vt = (t) => go[t], Wr = "__osOptionsValidationPlugin", Kr = "__osSizeObserverPlugin", Yr = (t, e) => {
  const { T: n } = e, [r, s] = t("showNativeOverlaidScrollbars");
  return [r && n.x && n.y, s];
}, on = (t) => t.indexOf(Xs) === 0, wo = (t, e) => {
  const { D: n } = t, r = (a) => {
    const u = vt(n, a), f = (e ? e[a] : u) === "scroll";
    return [u, f];
  }, [s, c] = r(_n), [i, d] = r(fn);
  return {
    k: {
      x: s,
      y: i
    },
    R: {
      x: c,
      y: d
    }
  };
}, Xr = (t, e, n, r) => {
  const s = e.x || e.y, c = (p, f) => {
    const m = on(p), v = m && s ? "hidden" : "", b = f && m && p.replace(`${Xs}-`, "") || v;
    return [f && !m ? p : "", on(b) ? "hidden" : b];
  }, [i, d] = c(n.x, e.x), [a, u] = c(n.y, e.y);
  return r[_n] = d && a ? d : i, r[fn] = u && i ? u : a, wo(t, r);
}, ts = "__osScrollbarsHidingPlugin", Jr = "__osClickScrollPlugin";
let Cn;
const Qr = () => {
  const t = (w, E, B) => {
    Ae(document.body, w), Ae(document.body, w);
    const F = io(w), W = Ot(w), R = Jn(E);
    return B && lt(w), {
      x: W.h - F.h + R.h,
      y: W.w - F.w + R.w
    };
  }, e = (w) => {
    let E = !1;
    const B = tn(w, jt);
    try {
      E = vt(w, "scrollbar-width") === "none" || vt(w, "display", "::-webkit-scrollbar") === "none";
    } catch {
    }
    return B(), E;
  }, n = (w, E) => {
    Et(w, {
      [_n]: $t,
      [fn]: $t,
      direction: "rtl"
    }), at(w, {
      x: 0
    });
    const B = xn(w), F = xn(E);
    at(w, {
      x: -999
    });
    const W = xn(E);
    return {
      i: B.x === F.x,
      n: F.x !== W.x
    };
  }, r = `.${Xt}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${Xt} div{width:200%;height:200%;margin:10px 0}.${jt}{scrollbar-width:none!important}.${jt}::-webkit-scrollbar,.${jt}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}`, c = ao(`<div class="${Xt}"><div></div><style>${r}</style></div>`)[0], i = c.firstChild, [d, , a] = Nn(), [u, p] = Ie({
    o: t(c, i),
    u: Qs
  }, X(t, c, i, !0)), [f] = p(), m = e(c), v = {
    x: f.x === 0,
    y: f.y === 0
  }, b = {
    elements: {
      host: null,
      padding: !m,
      viewport: (w) => m && ro(w) && w,
      content: !1
    },
    scrollbars: {
      slot: !0
    },
    cancel: {
      nativeScrollbarsOverlaid: !1,
      body: null
    }
  }, S = se({}, Dr), k = X(se, {}, S), V = X(se, {}, b), L = {
    P: f,
    T: v,
    L: m,
    J: !!Vn,
    K: n(c, i),
    Z: X(d, "r"),
    G: V,
    tt: (w) => se(b, w) && V(),
    nt: k,
    ot: (w) => se(S, w) && k(),
    st: se({}, b),
    et: se({}, S)
  };
  return qe(c, "style"), lt(c), De.addEventListener("resize", () => {
    let w;
    if (!m && (!v.x || !v.y)) {
      const E = Vt(ts);
      w = !!(E ? E.Y() : Ne)(L, u);
    }
    a("r", [w]);
  }), L;
}, He = () => (Cn || (Cn = Qr()), Cn), yo = (t, e) => je(e) ? e.apply(0, t) : e, Zr = (t, e, n, r) => {
  const s = Ft(r) ? n : r;
  return yo(t, s) || e.apply(0, t);
}, ko = (t, e, n, r) => {
  const s = Ft(r) ? n : r, c = yo(t, s);
  return !!c && (en(c) ? c : e.apply(0, t));
}, el = (t, e) => {
  const { nativeScrollbarsOverlaid: n, body: r } = e || {}, { T: s, L: c, G: i } = He(), { nativeScrollbarsOverlaid: d, body: a } = i().cancel, u = n ?? d, p = Ft(r) ? a : r, f = (s.x || s.y) && u, m = t && (an(p) ? !c : p);
  return !!f || !!m;
}, ns = /* @__PURE__ */ new WeakMap(), tl = (t, e) => {
  ns.set(t, e);
}, nl = (t) => {
  ns.delete(t);
}, So = (t) => ns.get(t), sl = (t, e, n) => {
  let r = !1;
  const s = n ? /* @__PURE__ */ new WeakMap() : !1, c = () => {
    r = !0;
  }, i = (d) => {
    if (s && n) {
      const a = n.map((u) => {
        const [p, f] = u || [];
        return [f && p ? (d || oo)(p, t) : [], f];
      });
      oe(a, (u) => oe(u[0], (p) => {
        const f = u[1], m = s.get(p) || [];
        if (t.contains(p) && f) {
          const b = fe(p, f, (S) => {
            r ? (b(), s.delete(p)) : e(S);
          });
          s.set(p, me(m, b));
        } else
          Re(m), s.delete(p);
      }));
    }
  };
  return i(), [c, i];
}, Ts = (t, e, n, r) => {
  let s = !1;
  const { ct: c, rt: i, lt: d, it: a, ut: u, dt: p } = r || {}, f = Zs(() => s && n(!0), {
    v: 33,
    p: 99
  }), [m, v] = sl(t, f, d), b = c || [], S = i || [], k = Je(b, S), V = (w, E) => {
    if (!Ln(E)) {
      const B = u || Ne, F = p || Ne, W = [], R = [];
      let x = !1, $ = !1;
      if (oe(E, (O) => {
        const { attributeName: C, target: T, type: y, oldValue: N, addedNodes: P, removedNodes: z } = O, Z = y === "attributes", ue = y === "childList", Y = t === T, ce = Z && C, ie = ce && mn(T, C || "") || null, de = ce && N !== ie, Se = vn(S, C) && de;
        if (e && (ue || !Y)) {
          const be = Z && de, pe = be && a && nn(T, a), H = (pe ? !B(T, C, N, ie) : !Z || be) && !F(O, !!pe, t, r);
          oe(P, (M) => me(W, M)), oe(z, (M) => me(W, M)), $ = $ || H;
        }
        !e && Y && de && !B(T, C, N, ie) && (me(R, C), x = x || Se);
      }), v((O) => cs(W).reduce((C, T) => (me(C, oo(O, T)), nn(T, O) ? me(C, T) : C), [])), e)
        return !w && $ && n(!1), [!1];
      if (!Ln(R) || x) {
        const O = [cs(R), x];
        return !w && n.apply(0, O), O;
      }
    }
  }, L = new gr(X(V, !1));
  return [() => (L.observe(t, {
    attributes: !0,
    attributeOldValue: !0,
    attributeFilter: k,
    subtree: e,
    childList: e,
    characterData: e
  }), s = !0, () => {
    s && (m(), L.disconnect(), s = !1);
  }), () => {
    if (s)
      return f.m(), V(!0, L.takeRecords());
  }];
}, xo = (t, e, n) => {
  const { ft: s, _t: c } = n || {}, i = Vt(Kr), { K: d } = He(), a = X(nt, t), [u] = Ie({
    o: !1,
    _: !0
  });
  return () => {
    const p = [], m = ao(`<div class="${Zn}"><div class="${Hr}"></div></div>`)[0], v = m.firstChild, b = (S) => {
      const k = S instanceof ResizeObserverEntry, V = !k && Ue(S);
      let L = !1, w = !1, E = !0;
      if (k) {
        const [B, , F] = u(S.contentRect), W = In(B), R = co(B, F);
        w = !F || R, L = !w && !W, E = !L;
      } else V ? [, E] = S : w = S === !0;
      if (s && E) {
        const B = V ? S[0] : nt(m);
        at(m, {
          x: sn(3333333, 3333333, B && d),
          y: 3333333
        });
      }
      L || e({
        vt: V ? S : void 0,
        ht: !V,
        _t: w
      });
    };
    if (Qt) {
      const S = new Qt((k) => b(k.pop()));
      S.observe(v), me(p, () => {
        S.disconnect();
      });
    } else if (i) {
      const [S, k] = i(v, b, c);
      me(p, Je([tn(m, Rr), fe(m, "animationstart", S)], k));
    } else
      return Ne;
    if (s) {
      const [S] = Ie({
        o: void 0
      }, a);
      me(p, fe(m, "scroll", (k) => {
        const V = S(), [L, w, E] = V;
        w && (Yn(v, "ltr rtl"), tn(v, L ? "rtl" : "ltr"), b([!!L, w, E])), Qn(k);
      }));
    }
    return X(Re, me(p, Ae(t, m)));
  };
}, ol = (t, e) => {
  let n;
  const r = (a) => a.h === 0 || a.isIntersecting || a.intersectionRatio > 0, s = wt(Br), [c] = Ie({
    o: !1
  }), i = (a, u) => {
    if (a) {
      const p = c(r(a)), [, f] = p;
      return f && !u && e(p) && [p];
    }
  }, d = (a, u) => i(u.pop(), a);
  return [() => {
    const a = [];
    if (is)
      n = new is(X(d, !1), {
        root: t
      }), n.observe(s), me(a, () => {
        n.disconnect();
      });
    else {
      const u = () => {
        const p = Ot(s);
        i(p);
      };
      me(a, xo(s, u)()), u();
    }
    return X(Re, me(a, Ae(t, s)));
  }, () => n && d(!0, n.takeRecords())];
}, rl = (t, e, n, r) => {
  let s, c, i, d, a, u;
  const { L: p } = He(), f = `[${Te}]`, m = `[${Xe}]`, v = ["tabindex"], b = ["wrap", "cols", "rows"], S = ["id", "class", "style", "open"], { gt: k, bt: V, D: L, wt: w, yt: E, V: B, St: F, $t: W } = t, R = {
    Ot: !1,
    N: nt(k)
  }, x = He(), $ = Vt(ts), [O] = Ie({
    u: Js,
    o: {
      w: 0,
      h: 0
    }
  }, () => {
    const D = $ && $.M(t, e, R, x, n).W, H = F(kt), M = !B && F(Lr), I = M && Tt(L);
    W(kt), B && W(Un, !0);
    const G = M && D && D()[0], K = Fn(w), te = Fn(L), ne = Jn(L);
    return W(kt, H), B && W(Un), G && G(), at(L, I), {
      w: te.w + K.w + ne.w,
      h: te.h + K.h + ne.h
    };
  }), C = E ? b : Je(S, b), T = Zs(r, {
    v: () => s,
    p: () => c,
    S(D, H) {
      const [M] = D, [I] = H;
      return [Je(rt(M), rt(I)).reduce((G, K) => (G[K] = M[K] || I[K], G), {})];
    }
  }), y = (D) => {
    if (B) {
      const H = nt(k);
      se(D, {
        Ct: u !== H
      }), se(R, {
        N: H
      }), u = H;
    }
  }, N = (D) => {
    oe(D || v, (H) => {
      if (vn(v, H)) {
        const M = mn(V, H);
        cn(M) ? Fe(L, H, M) : qe(L, H);
      }
    });
  }, P = (D, H) => {
    const [M, I] = D, G = {
      xt: I
    };
    return se(R, {
      Ot: M
    }), !H && r(G), G;
  }, z = ({ ht: D, vt: H, _t: M }) => {
    const G = !(D && !M && !H) && p ? T : r, [K, te] = H || [], ne = {
      ht: D || M,
      _t: M,
      Ct: te
    };
    y(ne), H && se(R, {
      N: K
    }), G(ne);
  }, Z = (D, H) => {
    const [, M] = O(), I = {
      Ht: M
    };
    return y(I), M && !H && (D ? r : T)(I), I;
  }, ue = (D, H, M) => {
    const I = {
      zt: H
    };
    return y(I), H && !M ? T(I) : B || N(D), I;
  }, { Z: Y } = x, [ce, ie] = w ? ol(V, P) : [], de = !B && xo(V, z, {
    _t: !0,
    ft: !0
  }), [Se, be] = Ts(V, !1, ue, {
    rt: S,
    ct: Je(S, v)
  }), pe = B && Qt && new Qt((D) => {
    const H = D[D.length - 1].contentRect;
    z({
      ht: !0,
      _t: co(H, a)
    }), a = H;
  });
  return [() => {
    N(), pe && pe.observe(V);
    const D = de && de(), H = ce && ce(), M = Se(), I = Y((G) => {
      const [, K] = O();
      T({
        It: G,
        Ht: K
      });
    });
    return () => {
      pe && pe.disconnect(), D && D(), H && H(), d && d(), M(), I();
    };
  }, ({ Et: D, At: H, Tt: M }) => {
    const I = {}, [G] = D("update.ignoreMutation"), [K, te] = D("update.attributes"), [ne, he] = D("update.elementEvents"), [we, ee] = D("update.debounce"), ye = he || te, xe = H || M, Be = (le) => je(G) && G(le);
    if (ye) {
      i && i(), d && d();
      const [le, $e] = Ts(w || L, !0, Z, {
        ct: Je(C, K || []),
        lt: ne,
        it: f,
        dt: (Ve, ge) => {
          const { target: Le, attributeName: Nt } = Ve;
          return (!ge && Nt && !B ? $r(Le, f, m) : !1) || !!bt(Le, `.${Me}`) || !!Be(Ve);
        }
      });
      d = le(), i = $e;
    }
    if (ee)
      if (T.m(), Ue(we)) {
        const le = we[0], $e = we[1];
        s = Ge(le) && le, c = Ge($e) && $e;
      } else Ge(we) ? (s = we, c = !1) : (s = !1, c = !1);
    if (xe) {
      const le = be(), $e = ie && ie(), Ve = i && i();
      le && se(I, ue(le[0], le[1], xe)), $e && se(I, P($e[0], xe)), Ve && se(I, Z(Ve[0], xe));
    }
    return y(I), I;
  }, R];
}, ll = (t, e, n, r) => {
  const { G: s, K: c } = He(), { scrollbars: i } = s(), { slot: d } = i, { gt: a, bt: u, D: p, Dt: f, kt: m, Rt: v, V: b } = e, { scrollbars: S } = f ? {} : t, { slot: k } = S || {}, V = /* @__PURE__ */ new Map(), L = (D) => Vn && new Vn({
    source: m,
    axis: D
  }), w = L("x"), E = L("y"), B = ko([a, u, p], () => b && v ? a : u, d, k), F = (D, H) => {
    if (H) {
      const ne = D ? St : xt, { Mt: he, Vt: we } = H, ee = yt(we)[ne], ye = yt(he)[ne];
      return On(0, 1, ee / ye || 0);
    }
    const M = D ? "x" : "y", { Lt: I, Pt: G } = n, K = G[M], te = I[M];
    return On(0, 1, K / (K + te) || 0);
  }, W = (D, H, M, I) => {
    const G = F(M, D);
    return 1 / G * (1 - G) * (I ? 1 - H : H) || 0;
  }, R = (D, H) => se(D, H ? {
    clear: ["left"]
  } : {}), x = (D) => {
    V.forEach((H, M) => {
      (D ? vn(Ps(D), M) : !0) && (oe(H || [], (G) => {
        G && G.cancel();
      }), V.delete(M));
    });
  }, $ = (D, H, M, I) => {
    const G = V.get(D) || [], K = G.find((te) => te && te.timeline === H);
    K ? K.effect = new KeyframeEffect(D, M, {
      composite: I
    }) : V.set(D, Je(G, [D.animate(M, {
      timeline: H,
      composite: I
    })]));
  }, O = (D, H, M) => {
    const I = M ? tn : Yn;
    oe(D, (G) => {
      I(G.Ut, H);
    });
  }, C = (D, H) => {
    oe(D, (M) => {
      const [I, G] = H(M);
      Et(I, G);
    });
  }, T = (D, H) => {
    C(D, (M) => {
      const { Vt: I } = M;
      return [I, {
        [H ? St : xt]: _s(F(H))
      }];
    });
  }, y = (D, H) => {
    const { Lt: M } = n, I = H ? M.x : M.y, G = (K, te, ne) => Sn(_s(W(K, gs(te, I, ne), H, ne)), H);
    if (w && E)
      oe(D, (K) => {
        const { Ut: te, Vt: ne } = K, he = H && nt(te) && c;
        $(ne, H ? w : E, R({
          transform: hs(I, he).map((we) => G(K, we, he))
        }, he));
      });
    else {
      const K = Tt(m);
      C(D, (te) => {
        const { Vt: ne, Ut: he } = te;
        return [ne, {
          transform: G(te, H ? K.x : K.y, H && nt(he) && c)
        }];
      });
    }
  }, N = (D) => b && !v && Ct(D) === p, P = [], z = [], Z = [], ue = (D, H, M) => {
    const I = Us(M), G = I ? M : !0, K = I ? !M : !0;
    G && O(z, D, H), K && O(Z, D, H);
  }, Y = () => {
    T(z, !0), T(Z);
  }, ce = () => {
    y(z, !0), y(Z);
  }, ie = () => {
    if (b) {
      const { Lt: D } = n, H = 0.5;
      if (w && E)
        oe(Je(Z, z), ({ Ut: M }) => {
          if (N(M)) {
            const I = (G, K, te) => {
              const ne = te && nt(M) && c;
              $(M, G, R({
                transform: hs(K - H, ne).map((he) => Sn(Bn(he), te))
              }, ne), "add");
            };
            I(w, D.x, !0), I(E, D.y);
          } else
            x(M);
        });
      else {
        const M = Tt(m), I = (G) => {
          const { Ut: K } = G, te = N(K) && K, ne = (he, we, ee) => {
            const ye = gs(he, we, ee), xe = we * ye;
            return Bn(ee ? -xe : xe);
          };
          return [te, {
            transform: te ? Sn({
              x: ne(M.x, D.x, nt(K) && c),
              y: ne(M.y, D.y)
            }) : ""
          }];
        };
        C(z, I), C(Z, I);
      }
    }
  }, de = (D) => {
    const M = wt(`${Me} ${D ? Nr : Ur}`), I = wt(po), G = wt(es), K = {
      Ut: M,
      Mt: I,
      Vt: G
    };
    return me(D ? z : Z, K), me(P, [Ae(M, I), Ae(I, G), X(lt, M), x, r(K, ue, y, D)]), K;
  }, Se = X(de, !0), be = X(de, !1), pe = () => (Ae(B, z[0].Ut), Ae(B, Z[0].Ut), X(Re, P));
  return Se(), be(), [{
    Bt: Y,
    Nt: ce,
    jt: ie,
    Ft: ue,
    qt: {
      J: w,
      Wt: z,
      Xt: Se,
      Yt: X(C, z)
    },
    Jt: {
      J: E,
      Wt: Z,
      Xt: be,
      Yt: X(C, Z)
    }
  }, pe];
}, al = (t, e, n, r) => {
  const { bt: s, D: c, V: i, kt: d, Kt: a } = e;
  return (u, p, f, m) => {
    const { Ut: v, Mt: b, Vt: S } = u, [k, V] = gt(333), [L, w] = gt(), E = X(f, [u], m), B = !!d.scrollBy, F = `client${m ? "X" : "Y"}`, W = m ? St : xt, R = m ? "left" : "top", x = m ? "w" : "h", $ = m ? "x" : "y", O = (y) => y.propertyName.indexOf(W) > -1, C = () => {
      const y = "pointerup pointerleave pointercancel lostpointercapture", N = (P, z) => (Z) => {
        const { Lt: ue } = n, Y = Ot(b)[x] - Ot(S)[x], ie = z * Z / Y * ue[$];
        at(d, {
          [$]: P + ie
        });
      };
      return fe(b, "pointerdown", (P) => {
        const z = bt(P.target, `.${es}`) === S, Z = z ? S : b, ue = t.scrollbars, { button: Y, isPrimary: ce, pointerType: ie } = P, { pointers: de } = ue;
        if (Y === 0 && ce && ue[z ? "dragScroll" : "clickScroll"] && (de || []).includes(ie)) {
          const be = !z && P.shiftKey, pe = X(yt, S), D = X(yt, b), H = (le, $e) => (le || pe())[R] - ($e || D())[R], M = Dn(yt(d)[W]) / Ot(d)[x] || 1, I = N(Tt(d)[$] || 0, 1 / M), G = P[F], K = pe(), te = D(), ne = K[W], he = H(K, te) + ne / 2, we = G - te[R], ee = z ? 0 : we - he, ye = (le) => {
            Re(Be), Z.releasePointerCapture(le.pointerId);
          }, Be = [Bt(s, Te, Mr), fe(a, y, ye), fe(a, "selectstart", (le) => ps(le), {
            H: !1
          }), fe(b, y, ye), fe(b, "pointermove", (le) => {
            const $e = le[F] - G;
            (z || be) && I(ee + $e);
          })];
          if (Z.setPointerCapture(P.pointerId), be)
            I(ee);
          else if (!z) {
            const le = Vt(Jr);
            le && me(Be, le(I, H, ee, ne, we));
          }
        }
      });
    };
    let T = !0;
    return X(Re, [fe(S, "pointermove pointerleave", r), fe(v, "pointerenter", () => {
      p(xs, !0);
    }), fe(v, "pointerleave pointercancel", () => {
      p(xs, !1);
    }), !i && fe(v, "mousedown", () => {
      const y = Hn();
      (ds(y, Xe) || ds(y, Te) || y === document.body) && Jt(() => {
        c.focus({
          preventScroll: !0
        });
      }, 25);
    }), fe(v, "wheel", (y) => {
      const { deltaX: N, deltaY: P, deltaMode: z } = y;
      B && T && z === 0 && Ct(v) === s && d.scrollBy({
        left: N,
        top: P,
        behavior: "smooth"
      }), T = !1, p(Es, !0), k(() => {
        T = !0, p(Es);
      }), ps(y);
    }, {
      H: !1,
      I: !0
    }), fe(S, "transitionstart", (y) => {
      if (O(y)) {
        const N = () => {
          E(), L(N);
        };
        N();
      }
    }), fe(S, "transitionend transitioncancel", (y) => {
      O(y) && (w(), E());
    }), fe(v, "mousedown", X(fe, a, "click", Qn, {
      A: !0,
      I: !0
    }), {
      I: !0
    }), C(), V, w]);
  };
}, il = (t, e, n, r, s, c) => {
  let i, d, a, u, p, f = Ne, m = 0;
  const v = (Y) => Y.pointerType === "mouse", [b, S] = gt(), [k, V] = gt(100), [L, w] = gt(100), [E, B] = gt(() => m), [F, W] = ll(t, s, r, al(e, s, r, (Y) => v(Y) && P())), { bt: R, Zt: x, Rt: $ } = s, { Ft: O, Bt: C, Nt: T, jt: y } = F, N = (Y, ce) => {
    if (B(), Y)
      O(Cs);
    else {
      const ie = X(O, Cs, !0);
      m > 0 && !ce ? E(ie) : ie();
    }
  }, P = () => {
    (a ? !i : !u) && (N(!0), k(() => {
      N(!1);
    }));
  }, z = (Y) => {
    O(qn, Y, !0), O(qn, Y, !1);
  }, Z = (Y) => {
    v(Y) && (i = a, a && N(!0));
  }, ue = [B, V, w, S, () => f(), fe(R, "pointerover", Z, {
    A: !0
  }), fe(R, "pointerenter", Z), fe(R, "pointerleave", (Y) => {
    v(Y) && (i = !1, a && N(!1));
  }), fe(R, "pointermove", (Y) => {
    v(Y) && d && P();
  }), fe(x, "scroll", (Y) => {
    b(() => {
      T(), P();
    }), c(Y), y();
  })];
  return [() => X(Re, me(ue, W())), ({ Et: Y, Tt: ce, Gt: ie, Qt: de }) => {
    const { tn: Se, nn: be, sn: pe } = de || {}, { Ct: D, _t: H } = ie || {}, { N: M } = n, { T: I } = He(), { k: G, en: K } = r, [te, ne] = Y("showNativeOverlaidScrollbars"), [he, we] = Y("scrollbars.theme"), [ee, ye] = Y("scrollbars.visibility"), [xe, Be] = Y("scrollbars.autoHide"), [le, $e] = Y("scrollbars.autoHideSuspend"), [Ve] = Y("scrollbars.autoHideDelay"), [ge, Le] = Y("scrollbars.dragScroll"), [Nt, Ut] = Y("scrollbars.clickScroll"), [Pt, Pe] = Y("overflow"), it = H && !ce, ct = K.x || K.y, bn = Se || be || D || ce, et = pe || ye || Pe, wn = te && I.x && I.y, ft = (mt, pt, Lt) => {
      const qt = mt.includes("scroll") && (ee === "visible" || ee === "auto" && pt === "scroll");
      return O(Pr, qt, Lt), qt;
    };
    if (m = Ve, it && (le && ct ? (z(!1), f(), L(() => {
      f = fe(x, "scroll", X(z, !0), {
        A: !0
      });
    })) : z(!0)), ne && O(Fr, wn), we && (O(p), O(he, !0), p = he), $e && !le && z(!0), Be && (d = xe === "move", a = xe === "leave", u = xe === "never", N(u, !0)), Le && O(Gr, ge), Ut && O(zr, Nt), et) {
      const mt = ft(Pt.x, G.x, !0), pt = ft(Pt.y, G.y, !1);
      O(qr, !(mt && pt));
    }
    bn && (C(), T(), y(), O($s, !K.x, !0), O($s, !K.y, !1), O(Ir, M && !$));
  }, {}, F];
}, cl = (t) => {
  const e = He(), { G: n, L: r } = e, { elements: s } = n(), { host: c, padding: i, viewport: d, content: a } = s, u = en(t), p = u ? {} : t, { elements: f } = p, { host: m, padding: v, viewport: b, content: S } = f || {}, k = u ? t : p.target, V = ro(k), L = nn(k, "textarea"), w = k.ownerDocument, E = w.documentElement, B = () => w.defaultView || De, F = (ee) => {
    ee && ee.focus && ee.focus({
      preventScroll: !0
    });
  }, W = X(Zr, [k]), R = X(ko, [k]), x = X(wt, ""), $ = X(W, x, d), O = X(R, x, a), C = $(b), T = C === k, y = T && V, N = !T && O(S), P = !T && C === N, z = y ? E : C, Z = L ? W(x, c, m) : k, ue = y ? z : Z, Y = !T && R(x, i, v), ce = !P && N, ie = [ce, z, Y, ue].map((ee) => en(ee) && !Ct(ee) && ee), de = (ee) => ee && vn(ie, ee), Se = de(z) ? k : z, be = {
    gt: k,
    bt: ue,
    D: z,
    cn: Y,
    wt: ce,
    kt: y ? E : z,
    Zt: y ? w : z,
    rn: V ? E : Se,
    Kt: w,
    yt: L,
    Rt: V,
    Dt: u,
    V: T,
    ln: B,
    St: (ee) => Sr(z, T ? Te : Xe, ee),
    $t: (ee, ye) => Yt(z, T ? Te : Xe, ee, ye)
  }, { gt: pe, bt: D, cn: H, D: M, wt: I } = be, G = [() => {
    qe(D, [Te, $n]), qe(pe, $n), V && qe(E, [$n, Te]);
  }], K = L && de(D);
  let te = L ? pe : Rn([I, M, H, D, pe].find((ee) => ee && !de(ee)));
  const ne = y ? pe : I || M, he = X(Re, G);
  return [be, () => {
    const ee = B(), ye = Hn(), xe = (ge) => {
      Ae(Ct(ge), Rn(ge)), lt(ge);
    }, Be = (ge) => ge ? fe(ge, "focusin focusout focus blur", (Le) => {
      Qn(Le), Le.stopImmediatePropagation();
    }, {
      I: !0,
      H: !1
    }) : Ne, le = "tabindex", $e = mn(M, le), Ve = Be(ye);
    return Fe(D, Te, T ? "viewport" : "host"), Fe(H, Pn, ""), Fe(I, Ss, ""), T || (Fe(M, Xe, ""), Fe(M, le, $e || "-1"), V && Bt(E, Te, Vr)), K && (us(pe, D), me(G, () => {
      us(D, pe), lt(D);
    })), Ae(ne, te), Ae(D, H), Ae(H || D, !T && M), Ae(M, I), me(G, [Ve, () => {
      const ge = Hn(), Le = Be(ge);
      qe(H, Pn), qe(I, Ss), qe(M, [vo, _o, Xe]), $e ? Fe(M, le, $e) : qe(M, le), de(I) && xe(I), de(M) && xe(M), de(H) && xe(H), F(ge), Le();
    }]), r && !T && (Bt(M, Xe, mo), me(G, X(qe, M, Xe))), F(!T && ye === k && ee.top === ee ? M : ye), Ve(), te = 0, he;
  }, he];
}, dl = ({ wt: t }) => ({ Gt: e, an: n, Tt: r }) => {
  const { xt: s } = e || {}, { Ot: c } = n;
  t && (s || r) && Et(t, {
    [xt]: c && "100%"
  });
}, ul = ({ bt: t, cn: e, D: n, V: r }, s) => {
  const [c, i] = Ie({
    u: kr,
    o: fs()
  }, X(fs, t, "padding", ""));
  return ({ Et: d, Gt: a, an: u, Tt: p }) => {
    let [f, m] = i(p);
    const { L: v } = He(), { ht: b, Ht: S, Ct: k } = a || {}, { N: V } = u, [L, w] = d("paddingAbsolute");
    (b || m || (p || S)) && ([f, m] = c(p));
    const B = !r && (w || k || m);
    if (B) {
      const F = !L || !e && !v, W = f.r + f.l, R = f.t + f.b, x = {
        [Ks]: F && !V ? -W : 0,
        [Ys]: F ? -R : 0,
        [Ws]: F && V ? -W : 0,
        top: F ? -f.t : 0,
        right: F ? V ? -f.r : "auto" : 0,
        left: F ? V ? "auto" : -f.l : 0,
        [St]: F && `calc(100% + ${W}px)`
      }, $ = {
        [qs]: F ? f.t : 0,
        [zs]: F ? f.r : 0,
        [js]: F ? f.b : 0,
        [Gs]: F ? f.l : 0
      };
      Et(e || n, x), Et(n, $), se(s, {
        cn: f,
        un: !F,
        j: e ? $ : se({}, x, $)
      });
    }
    return {
      dn: B
    };
  };
}, vl = (t, e) => {
  const n = He(), { bt: r, cn: s, D: c, V: i, Rt: d, $t: a, ln: u } = t, { L: p } = n, f = d && i, m = X(Kt, 0), v = {
    u: Js,
    o: {
      w: 0,
      h: 0
    }
  }, b = {
    u: Qs,
    o: {
      x: $t,
      y: $t
    }
  }, S = ($, O) => {
    const C = De.devicePixelRatio % 1 !== 0 ? 1 : 0, T = {
      w: m($.w - O.w),
      h: m($.h - O.h)
    };
    return {
      w: T.w > C ? T.w : 0,
      h: T.h > C ? T.h : 0
    };
  }, [k, V] = Ie(v, X(Jn, c)), [L, w] = Ie(v, X(Fn, c)), [E, B] = Ie(v), [F, W] = Ie(v), [R] = Ie(b), x = Vt(ts);
  return ({ Et: $, Gt: O, an: C, Tt: T }, { dn: y }) => {
    const { ht: N, Ht: P, Ct: z, It: Z } = O || {}, ue = x && x.M(t, e, C, n, $), { q: Y, W: ce, X: ie } = ue || {}, [de, Se] = Yr($, n), [be, pe] = $("overflow"), D = N || y || P || z || Z || Se, H = on(be.x), M = on(be.y), I = H || M;
    let G = V(T), K = w(T), te = B(T), ne = W(T), he;
    if (Se && p && a(mo, !de), D) {
      I && a(kt, !1);
      const [Pe, it] = ce ? ce(he) : [], [ct, bn] = G = k(T), [et, wn] = K = L(T), ft = io(c), mt = et, pt = ft;
      Pe && Pe(), (wn || bn || Se) && it && !de && Y && Y(it, et, ct);
      const Lt = Tr(u()), qt = {
        w: m(Kt(et.w, mt.w) + ct.w),
        h: m(Kt(et.h, mt.h) + ct.h)
      }, ls = {
        w: m((f ? Lt.w : pt.w + m(ft.w - et.w)) + ct.w),
        h: m((f ? Lt.h : pt.h + m(ft.h - et.h)) + ct.h)
      };
      ne = F(ls), te = E(S(qt, ls), T);
    }
    const [we, ee] = ne, [ye, xe] = te, [Be, le] = K, [$e, Ve] = G, ge = {
      x: ye.w > 0,
      y: ye.h > 0
    }, Le = H && M && (ge.x || ge.y) || H && ge.x && !ge.y || M && ge.y && !ge.x;
    if (y || z || Z || Ve || le || ee || xe || pe || Se || D) {
      const Pe = {}, it = Xr(t, ge, be, Pe);
      ie && ie(it, C, !!Y && Y(it, Be, $e), Pe), i ? (Fe(r, vo, Pe[_n]), Fe(r, _o, Pe[fn])) : Et(c, Pe);
    }
    Yt(r, Te, fo, Le), Yt(s, Pn, Or, Le), i || Yt(c, Xe, kt, I);
    const [Ut, Pt] = R(wo(t).k);
    return se(e, {
      k: Ut,
      Pt: {
        x: we.w,
        y: we.h
      },
      Lt: {
        x: ye.w,
        y: ye.h
      },
      en: ge
    }), {
      sn: Pt,
      tn: ee,
      nn: xe
    };
  };
}, _l = (t) => {
  const [e, n, r] = cl(t), s = {
    cn: {
      t: 0,
      r: 0,
      b: 0,
      l: 0
    },
    un: !1,
    j: {
      [Ks]: 0,
      [Ys]: 0,
      [Ws]: 0,
      [qs]: 0,
      [zs]: 0,
      [js]: 0,
      [Gs]: 0
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
  }, { gt: c, D: i, V: d } = e, { L: a, T: u } = He(), p = !a && (u.x || u.y), f = [dl(e), ul(e, s), vl(e, s)];
  return [n, (m) => {
    const v = {}, S = p && Tt(i), k = d ? Bt(i, Te, Un) : Ne;
    return oe(f, (V) => {
      se(v, V(m, v) || {});
    }), k(), at(i, S), !d && at(c, 0), v;
  }, s, e, r];
}, fl = (t, e, n, r) => {
  const s = ks(e, {}), [c, i, d, a, u] = _l(t), [p, f, m] = rl(a, d, s, (L) => {
    V({}, L);
  }), [v, b, , S] = il(t, e, m, d, a, r), k = (L) => rt(L).some((w) => !!L[w]), V = (L, w) => {
    const { fn: E, Tt: B, At: F, _n: W } = L, R = E || {}, x = !!B, $ = {
      Et: ks(e, R, x),
      fn: R,
      Tt: x
    };
    if (W)
      return b($), !1;
    const O = w || f(se({}, $, {
      At: F
    })), C = i(se({}, $, {
      an: m,
      Gt: O
    }));
    b(se({}, $, {
      Gt: O,
      Qt: C
    }));
    const T = k(O), y = k(C), N = T || y || !Kn(R) || x;
    return N && n(L, {
      Gt: O,
      Qt: C
    }), N;
  };
  return [() => {
    const { rn: L, D: w } = a, E = Tt(L), B = [p(), c(), v()];
    return at(w, E), X(Re, B);
  }, V, () => ({
    vn: m,
    hn: d
  }), {
    pn: a,
    gn: S
  }, u];
}, Qe = (t, e, n) => {
  const { nt: r } = He(), s = en(t), c = s ? t : t.target, i = So(c);
  if (e && !i) {
    let d = !1;
    const a = [], u = {}, p = ($) => {
      const O = to($), C = Vt(Wr);
      return C ? C(O, !0) : O;
    }, f = se({}, r(), p(e)), [m, v, b] = Nn(), [S, k, V] = Nn(n), L = ($, O) => {
      V($, O), b($, O);
    }, [w, E, B, F, W] = fl(t, f, ({ fn: $, Tt: O }, { Gt: C, Qt: T }) => {
      const { ht: y, Ct: N, xt: P, Ht: z, zt: Z, _t: ue } = C, { tn: Y, nn: ce, sn: ie } = T;
      L("updated", [x, {
        updateHints: {
          sizeChanged: !!y,
          directionChanged: !!N,
          heightIntrinsicChanged: !!P,
          overflowEdgeChanged: !!Y,
          overflowAmountChanged: !!ce,
          overflowStyleChanged: !!ie,
          contentMutation: !!z,
          hostMutation: !!Z,
          appear: !!ue
        },
        changedOptions: $ || {},
        force: !!O
      }]);
    }, ($) => L("scroll", [x, $])), R = ($) => {
      nl(c), Re(a), d = !0, L("destroyed", [x, $]), v(), k();
    }, x = {
      options($, O) {
        if ($) {
          const C = O ? r() : {}, T = uo(f, se(C, p($)));
          Kn(T) || (se(f, T), E({
            fn: T
          }));
        }
        return se({}, f);
      },
      on: S,
      off: ($, O) => {
        $ && O && k($, O);
      },
      state() {
        const { vn: $, hn: O } = B(), { N: C } = $, { Pt: T, Lt: y, k: N, en: P, cn: z, un: Z } = O;
        return se({}, {
          overflowEdge: T,
          overflowAmount: y,
          overflowStyle: N,
          hasOverflow: P,
          padding: z,
          paddingAbsolute: Z,
          directionRTL: C,
          destroyed: d
        });
      },
      elements() {
        const { gt: $, bt: O, cn: C, D: T, wt: y, kt: N, Zt: P } = F.pn, { qt: z, Jt: Z } = F.gn, ue = (ce) => {
          const { Vt: ie, Mt: de, Ut: Se } = ce;
          return {
            scrollbar: Se,
            track: de,
            handle: ie
          };
        }, Y = (ce) => {
          const { Wt: ie, Xt: de } = ce, Se = ue(ie[0]);
          return se({}, Se, {
            clone: () => {
              const be = ue(de());
              return E({
                _n: !0
              }), be;
            }
          });
        };
        return se({}, {
          target: $,
          host: O,
          padding: C || T,
          viewport: T,
          content: y || T,
          scrollOffsetElement: N,
          scrollEventElement: P,
          scrollbarHorizontal: Y(z),
          scrollbarVertical: Y(Z)
        });
      },
      update: ($) => E({
        Tt: $,
        At: !0
      }),
      destroy: X(R, !1),
      plugin: ($) => u[rt($)[0]]
    };
    return me(a, [W]), tl(c, x), bo(ho, Qe, [x, m, u]), el(F.pn.Rt, !s && t.cancel) ? (R(!0), x) : (me(a, w()), L("initialized", [x]), x.update(!0), x);
  }
  return i;
};
Qe.plugin = (t) => {
  const e = Ue(t), n = e ? t : [t], r = n.map((s) => bo(s, Qe)[0]);
  return jr(n), e ? r : r[0];
};
Qe.valid = (t) => {
  const e = t && t.elements, n = je(e) && e();
  return Zt(n) && !!So(n.target);
};
Qe.env = () => {
  const { P: t, T: e, L: n, K: r, J: s, st: c, et: i, G: d, tt: a, nt: u, ot: p } = He();
  return se({}, {
    scrollbarsSize: t,
    scrollbarsOverlaid: e,
    scrollbarsHiding: n,
    rtlScrollBehavior: r,
    scrollTimeline: s,
    staticDefaultInitialization: c,
    staticDefaultOptions: i,
    getDefaultInitialization: d,
    setDefaultInitialization: a,
    getDefaultOptions: u,
    setDefaultOptions: p
  });
};
function ml() {
  let t;
  const e = A(null), n = Math.floor(Math.random() * 2 ** 32), r = A(!1), s = A([]), c = () => s.value, i = () => t.getSelection(), d = () => s.value.length, a = () => t.clearSelection(!0), u = A(), p = A(null), f = A(null), m = A(null), v = A(null);
  function b() {
    t = new nr({
      area: e.value,
      keyboardDrag: !1,
      selectedClass: "vf-explorer-selected",
      selectorClass: "vf-explorer-selector"
    }), t.subscribe("DS:start:pre", ({ items: B, event: F, isDragging: W }) => {
      if (W)
        t.Interaction._reset(F);
      else {
        r.value = !1;
        const R = e.value.offsetWidth - F.offsetX, x = e.value.offsetHeight - F.offsetY;
        R < 15 && x < 15 && t.Interaction._reset(F), F.target.classList.contains("os-scrollbar-handle") && t.Interaction._reset(F);
      }
    }), document.addEventListener("dragleave", (B) => {
      !B.buttons && r.value && (r.value = !1);
    });
  }
  const S = () => dt(() => {
    t.addSelection(
      t.getSelectables()
    ), k();
  }), k = () => {
    s.value = t.getSelection().map((B) => JSON.parse(B.dataset.item)), u.value(s.value);
  }, V = () => dt(() => {
    const B = c().map((F) => F.path);
    a(), t.setSettings({
      selectables: document.getElementsByClassName("vf-item-" + n)
    }), t.addSelection(
      t.getSelectables().filter((F) => B.includes(JSON.parse(F.dataset.item).path))
    ), k(), w();
  }), L = (B) => {
    u.value = B, t.subscribe("DS:end", ({ items: F, event: W, isDragging: R }) => {
      s.value = F.map((x) => JSON.parse(x.dataset.item)), B(F.map((x) => JSON.parse(x.dataset.item)));
    });
  }, w = () => {
    p.value && (e.value.getBoundingClientRect().height < e.value.scrollHeight ? (f.value.style.height = e.value.scrollHeight + "px", f.value.style.display = "block") : (f.value.style.height = "100%", f.value.style.display = "none"));
  }, E = (B) => {
    if (!p.value)
      return;
    const { scrollOffsetElement: F } = p.value.elements();
    F.scrollTo(
      {
        top: e.value.scrollTop,
        left: 0
      }
    );
  };
  return Ee(() => {
    Qe(m.value, {
      scrollbars: {
        theme: "vf-theme-dark dark:vf-theme-light"
      },
      plugins: {
        OverlayScrollbars: Qe
        // ScrollbarsHidingPlugin,
        // SizeObserverPlugin,
        // ClickScrollPlugin
      }
    }, {
      initialized: (B) => {
        p.value = B;
      },
      scroll: (B, F) => {
        const { scrollOffsetElement: W } = B.elements();
        e.value.scrollTo({
          top: W.scrollTop,
          left: 0
        });
      }
    }), b(), w(), v.value = new ResizeObserver(w), v.value.observe(e.value), e.value.addEventListener("scroll", E), t.subscribe("DS:scroll", ({ isDragging: B }) => B || E());
  }), jn(() => {
    t && t.stop(), v.value && v.value.disconnect();
  }), Ms(() => {
    t && t.Area.reset();
  }), {
    area: e,
    explorerId: n,
    isDraggingRef: r,
    scrollBar: f,
    scrollBarContainer: m,
    getSelected: c,
    getSelection: i,
    selectAll: S,
    clearSelection: a,
    refreshSelection: V,
    getCount: d,
    onSelect: L
  };
}
function pl(t, e) {
  const n = A(t), r = A(e), s = A([]), c = A([]), i = A([]), d = A(!1), a = A(5);
  let u = !1, p = !1;
  const f = At({
    adapter: n,
    storages: [],
    dirname: r,
    files: []
  });
  function m() {
    let L = [], w = [], E = r.value ?? n.value + "://";
    E.length === 0 && (s.value = []), E.replace(n.value + "://", "").split("/").forEach(function(W) {
      L.push(W), L.join("/") !== "" && w.push({
        basename: W,
        name: W,
        path: n.value + "://" + L.join("/"),
        type: "dir"
      });
    }), c.value = w;
    const [B, F] = b(w, a.value);
    i.value = F, s.value = B;
  }
  function v(L) {
    a.value = L, m();
  }
  function b(L, w) {
    return L.length > w ? [L.slice(-w), L.slice(0, -w)] : [L, []];
  }
  function S(L = null) {
    d.value = L ?? !d.value;
  }
  function k() {
    return s.value && s.value.length && !p;
  }
  const V = ot(() => {
    var L;
    return ((L = s.value[s.value.length - 2]) == null ? void 0 : L.path) ?? n.value + "://";
  });
  return Ee(() => {
  }), Oe(r, m), Ee(m), {
    adapter: n,
    path: r,
    loading: u,
    searchMode: p,
    data: f,
    breadcrumbs: s,
    breadcrumbItems: c,
    limitBreadcrumbItems: v,
    hiddenBreadcrumbs: i,
    showHiddenBreadcrumbs: d,
    toggleHiddenBreadcrumbs: S,
    isGoUpAvailable: k,
    parentFolderPath: V
  };
}
const hl = (t, e) => {
  const n = cr(t.id), r = tr(), s = n.getStore("metricUnits", !1), c = mr(n, t.theme), i = e.i18n, d = t.locale ?? e.locale, a = n.getStore("adapter"), u = (v) => Array.isArray(v) ? v : vr, p = n.getStore("persist-path", t.persist), f = p ? n.getStore("path", t.path) : t.path, m = ml();
  return At({
    /**
     * Core properties
     * */
    // app version
    version: _r,
    // root element
    root: null,
    // app id
    debug: t.debug,
    // Event Bus
    emitter: r,
    // storage
    storage: n,
    // localization object
    i18n: ur(n, d, r, i),
    // modal state
    modal: pr(),
    // dragSelect object, it is responsible for selecting items
    dragSelect: ot(() => m),
    // http object
    requester: ir(t.request),
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
    theme: c,
    // unit state - for example: GB or GiB
    metricUnits: s,
    // human readable file sizes
    filesize: s ? Hs : Rs,
    // show large icons in list view
    compactListView: n.getStore("compact-list-view", !0),
    // persist state
    persist: p,
    // show thumbnails
    showThumbnails: n.getStore("show-thumbnails", t.showThumbnails),
    // file system
    fs: pl(a, f)
  });
}, gl = { class: "vuefinder__modal-layout__container" }, bl = { class: "vuefinder__modal-layout__content" }, wl = { class: "vuefinder__modal-layout__footer" }, We = {
  __name: "ModalLayout",
  setup(t) {
    const e = A(null), n = re("ServiceContainer");
    return Ee(() => {
      const r = document.querySelector(".v-f-modal input");
      r && r.focus(), dt(() => {
        if (document.querySelector(".v-f-modal input") && window.innerWidth < 768) {
          const s = e.value.getBoundingClientRect().bottom + 16;
          window.scrollTo({
            top: s,
            left: 0,
            behavior: "smooth"
          });
        }
      });
    }), (r, s) => (_(), h("div", {
      class: "vuefinder__modal-layout",
      "aria-labelledby": "modal-title",
      role: "dialog",
      "aria-modal": "true",
      onKeyup: s[1] || (s[1] = Dt((c) => o(n).modal.close(), ["esc"])),
      tabindex: "0"
    }, [
      s[2] || (s[2] = l("div", { class: "vuefinder__modal-layout__overlay" }, null, -1)),
      l("div", gl, [
        l("div", {
          class: "vuefinder__modal-layout__wrapper",
          onMousedown: s[0] || (s[0] = st((c) => o(n).modal.close(), ["self"]))
        }, [
          l("div", {
            ref_key: "modalBody",
            ref: e,
            class: "vuefinder__modal-layout__body"
          }, [
            l("div", bl, [
              Rt(r.$slots, "default")
            ]),
            l("div", wl, [
              Rt(r.$slots, "buttons")
            ])
          ], 512)
        ], 32)
      ])
    ], 32));
  }
}, yl = (t, e) => {
  const n = t.__vccOpts || t;
  for (const [r, s] of e)
    n[r] = s;
  return n;
}, kl = {
  props: {
    on: { type: String, required: !0 }
  },
  setup(t, { emit: e, slots: n }) {
    const r = re("ServiceContainer"), s = A(!1), { t: c } = r.i18n;
    let i = null;
    const d = () => {
      clearTimeout(i), s.value = !0, i = setTimeout(() => {
        s.value = !1;
      }, 2e3);
    };
    return Ee(() => {
      r.emitter.on(t.on, d);
    }), jn(() => {
      clearTimeout(i);
    }), {
      shown: s,
      t: c
    };
  }
}, Sl = { key: 1 };
function xl(t, e, n, r, s, c) {
  return _(), h("div", {
    class: ae(["vuefinder__action-message", { "vuefinder__action-message--hidden": !r.shown }])
  }, [
    t.$slots.default ? Rt(t.$slots, "default", { key: 0 }) : (_(), h("span", Sl, g(r.t("Saved.")), 1))
  ], 2);
}
const ht = /* @__PURE__ */ yl(kl, [["render", xl]]), $l = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Cl(t, e) {
  return _(), h("svg", $l, e[0] || (e[0] = [
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
const El = { render: Cl }, Tl = { class: "vuefinder__modal-header" }, Al = { class: "vuefinder__modal-header__icon-container" }, Dl = {
  class: "vuefinder__modal-header__title",
  id: "modal-title"
}, Ze = {
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
    return (e, n) => (_(), h("div", Tl, [
      l("div", Al, [
        (_(), j(Vs(t.icon), { class: "vuefinder__modal-header__icon" }))
      ]),
      l("h3", Dl, g(t.title), 1)
    ]));
  }
}, Ml = { class: "vuefinder__about-modal__content" }, Vl = { class: "vuefinder__about-modal__main" }, Ll = {
  class: "vuefinder__about-modal__tabs",
  "aria-label": "Tabs"
}, Ol = ["onClick", "aria-current"], Rl = {
  key: 0,
  class: "vuefinder__about-modal__tab-content"
}, Hl = { class: "vuefinder__about-modal__description" }, Bl = {
  href: "https://vuefinder.ozdemir.be",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Fl = {
  href: "https://github.com/n1crack/vuefinder",
  class: "vuefinder__about-modal__link",
  target: "_blank"
}, Il = {
  key: 1,
  class: "vuefinder__about-modal__tab-content"
}, Nl = { class: "vuefinder__about-modal__description" }, Ul = { class: "vuefinder__about-modal__settings" }, Pl = { class: "vuefinder__about-modal__setting flex" }, ql = { class: "vuefinder__about-modal__setting-input" }, zl = { class: "vuefinder__about-modal__setting-label" }, Gl = {
  for: "metric_unit",
  class: "vuefinder__about-modal__label"
}, jl = { class: "vuefinder__about-modal__setting flex" }, Wl = { class: "vuefinder__about-modal__setting-input" }, Kl = { class: "vuefinder__about-modal__setting-label" }, Yl = {
  for: "large_icons",
  class: "vuefinder__about-modal__label"
}, Xl = { class: "vuefinder__about-modal__setting flex" }, Jl = { class: "vuefinder__about-modal__setting-input" }, Ql = { class: "vuefinder__about-modal__setting-label" }, Zl = {
  for: "persist_path",
  class: "vuefinder__about-modal__label"
}, ea = { class: "vuefinder__about-modal__setting flex" }, ta = { class: "vuefinder__about-modal__setting-input" }, na = { class: "vuefinder__about-modal__setting-label" }, sa = {
  for: "show_thumbnails",
  class: "vuefinder__about-modal__label"
}, oa = { class: "vuefinder__about-modal__setting" }, ra = { class: "vuefinder__about-modal__setting-input" }, la = {
  for: "theme",
  class: "vuefinder__about-modal__label"
}, aa = { class: "vuefinder__about-modal__setting-label" }, ia = ["label"], ca = ["value"], da = {
  key: 0,
  class: "vuefinder__about-modal__setting"
}, ua = { class: "vuefinder__about-modal__setting-input" }, va = {
  for: "language",
  class: "vuefinder__about-modal__label"
}, _a = { class: "vuefinder__about-modal__setting-label" }, fa = ["label"], ma = ["value"], pa = {
  key: 2,
  class: "vuefinder__about-modal__tab-content"
}, ha = { class: "vuefinder__about-modal__shortcuts" }, ga = { class: "vuefinder__about-modal__shortcut" }, ba = { class: "vuefinder__about-modal__shortcut" }, wa = { class: "vuefinder__about-modal__shortcut" }, ya = { class: "vuefinder__about-modal__shortcut" }, ka = { class: "vuefinder__about-modal__shortcut" }, Sa = { class: "vuefinder__about-modal__shortcut" }, xa = { class: "vuefinder__about-modal__shortcut" }, $a = { class: "vuefinder__about-modal__shortcut" }, Ca = { class: "vuefinder__about-modal__shortcut" }, Ea = {
  key: 3,
  class: "vuefinder__about-modal__tab-content"
}, Ta = { class: "vuefinder__about-modal__description" }, $o = {
  __name: "ModalAbout",
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n, clearStore: r } = e.storage, { t: s } = e.i18n, c = {
      ABOUT: "about",
      SETTINGS: "settings",
      SHORTCUTS: "shortcuts",
      RESET: "reset"
    }, i = ot(() => [
      { name: s("About"), key: c.ABOUT },
      { name: s("Settings"), key: c.SETTINGS },
      { name: s("Shortcuts"), key: c.SHORTCUTS },
      { name: s("Reset"), key: c.RESET }
    ]), d = A("about"), a = async () => {
      r(), location.reload();
    }, u = (L) => {
      e.theme.set(L), e.emitter.emit("vf-theme-saved");
    }, p = () => {
      e.metricUnits = !e.metricUnits, e.filesize = e.metricUnits ? Hs : Rs, n("metricUnits", e.metricUnits), e.emitter.emit("vf-metric-units-saved");
    }, f = () => {
      e.compactListView = !e.compactListView, n("compactListView", e.compactListView), e.emitter.emit("vf-compact-view-saved");
    }, m = () => {
      e.showThumbnails = !e.showThumbnails, n("show-thumbnails", e.showThumbnails), e.emitter.emit("vf-show-thumbnails-saved");
    }, v = () => {
      e.persist = !e.persist, n("persist-path", e.persist), e.emitter.emit("vf-persist-path-saved");
    }, { i18n: b } = re("VueFinderOptions"), k = Object.fromEntries(
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
      }).filter(([L]) => Object.keys(b).includes(L))
    ), V = ot(() => ({
      system: s("System"),
      light: s("Light"),
      dark: s("Dark")
    }));
    return (L, w) => (_(), j(We, null, {
      buttons: Q(() => [
        l("button", {
          type: "button",
          onClick: w[7] || (w[7] = (E) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(o(s)("Close")), 1)
      ]),
      default: Q(() => [
        l("div", Ml, [
          q(Ze, {
            icon: o(El),
            title: "Vuefinder " + o(e).version
          }, null, 8, ["icon", "title"]),
          l("div", Vl, [
            l("div", null, [
              l("div", null, [
                l("nav", Ll, [
                  (_(!0), h(ke, null, Ce(i.value, (E) => (_(), h("button", {
                    key: E.name,
                    onClick: (B) => d.value = E.key,
                    class: ae([E.key === d.value ? "vuefinder__about-modal__tab--active" : "vuefinder__about-modal__tab--inactive", "vuefinder__about-modal__tab"]),
                    "aria-current": E.current ? "page" : void 0
                  }, g(E.name), 11, Ol))), 128))
                ])
              ])
            ]),
            d.value === c.ABOUT ? (_(), h("div", Rl, [
              l("div", Hl, g(o(s)("Vuefinder is a simple, lightweight, and fast file manager library for Vue.js applications")), 1),
              l("a", Bl, g(o(s)("Project home")), 1),
              l("a", Fl, g(o(s)("Follow on GitHub")), 1)
            ])) : U("", !0),
            d.value === c.SETTINGS ? (_(), h("div", Il, [
              l("div", Nl, g(o(s)("Customize your experience with the following settings")), 1),
              l("div", Ul, [
                l("fieldset", null, [
                  l("div", Pl, [
                    l("div", ql, [
                      _e(l("input", {
                        id: "metric_unit",
                        name: "metric_unit",
                        type: "checkbox",
                        "onUpdate:modelValue": w[0] || (w[0] = (E) => o(e).metricUnits = E),
                        onClick: p,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, o(e).metricUnits]
                      ])
                    ]),
                    l("div", zl, [
                      l("label", Gl, [
                        J(g(o(s)("Use Metric Units")) + " ", 1),
                        q(ht, {
                          class: "ms-3",
                          on: "vf-metric-units-saved"
                        }, {
                          default: Q(() => [
                            J(g(o(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  l("div", jl, [
                    l("div", Wl, [
                      _e(l("input", {
                        id: "large_icons",
                        name: "large_icons",
                        type: "checkbox",
                        "onUpdate:modelValue": w[1] || (w[1] = (E) => o(e).compactListView = E),
                        onClick: f,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, o(e).compactListView]
                      ])
                    ]),
                    l("div", Kl, [
                      l("label", Yl, [
                        J(g(o(s)("Compact list view")) + " ", 1),
                        q(ht, {
                          class: "ms-3",
                          on: "vf-compact-view-saved"
                        }, {
                          default: Q(() => [
                            J(g(o(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  l("div", Xl, [
                    l("div", Jl, [
                      _e(l("input", {
                        id: "persist_path",
                        name: "persist_path",
                        type: "checkbox",
                        "onUpdate:modelValue": w[2] || (w[2] = (E) => o(e).persist = E),
                        onClick: v,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, o(e).persist]
                      ])
                    ]),
                    l("div", Ql, [
                      l("label", Zl, [
                        J(g(o(s)("Persist path on reload")) + " ", 1),
                        q(ht, {
                          class: "ms-3",
                          on: "vf-persist-path-saved"
                        }, {
                          default: Q(() => [
                            J(g(o(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  l("div", ea, [
                    l("div", ta, [
                      _e(l("input", {
                        id: "show_thumbnails",
                        name: "show_thumbnails",
                        type: "checkbox",
                        "onUpdate:modelValue": w[3] || (w[3] = (E) => o(e).showThumbnails = E),
                        onClick: m,
                        class: "vuefinder__about-modal__checkbox"
                      }, null, 512), [
                        [zt, o(e).showThumbnails]
                      ])
                    ]),
                    l("div", na, [
                      l("label", sa, [
                        J(g(o(s)("Show thumbnails")) + " ", 1),
                        q(ht, {
                          class: "ms-3",
                          on: "vf-show-thumbnails-saved"
                        }, {
                          default: Q(() => [
                            J(g(o(s)("Saved.")), 1)
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  l("div", oa, [
                    l("div", ra, [
                      l("label", la, g(o(s)("Theme")), 1)
                    ]),
                    l("div", aa, [
                      _e(l("select", {
                        id: "theme",
                        "onUpdate:modelValue": w[4] || (w[4] = (E) => o(e).theme.value = E),
                        onChange: w[5] || (w[5] = (E) => u(E.target.value)),
                        class: "vuefinder__about-modal__select"
                      }, [
                        l("optgroup", {
                          label: o(s)("Theme")
                        }, [
                          (_(!0), h(ke, null, Ce(V.value, (E, B) => (_(), h("option", { value: B }, g(E), 9, ca))), 256))
                        ], 8, ia)
                      ], 544), [
                        [An, o(e).theme.value]
                      ]),
                      q(ht, {
                        class: "ms-3",
                        on: "vf-theme-saved"
                      }, {
                        default: Q(() => [
                          J(g(o(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ]),
                  o(e).features.includes(o(ve).LANGUAGE) && Object.keys(o(k)).length > 1 ? (_(), h("div", da, [
                    l("div", ua, [
                      l("label", va, g(o(s)("Language")), 1)
                    ]),
                    l("div", _a, [
                      _e(l("select", {
                        id: "language",
                        "onUpdate:modelValue": w[6] || (w[6] = (E) => o(e).i18n.locale = E),
                        class: "vuefinder__about-modal__select"
                      }, [
                        l("optgroup", {
                          label: o(s)("Language")
                        }, [
                          (_(!0), h(ke, null, Ce(o(k), (E, B) => (_(), h("option", { value: B }, g(E), 9, ma))), 256))
                        ], 8, fa)
                      ], 512), [
                        [An, o(e).i18n.locale]
                      ]),
                      q(ht, {
                        class: "ms-3",
                        on: "vf-language-saved"
                      }, {
                        default: Q(() => [
                          J(g(o(s)("Saved.")), 1)
                        ]),
                        _: 1
                      })
                    ])
                  ])) : U("", !0)
                ])
              ])
            ])) : U("", !0),
            d.value === c.SHORTCUTS ? (_(), h("div", pa, [
              l("div", ha, [
                l("div", ga, [
                  l("div", null, g(o(s)("Rename")), 1),
                  w[8] || (w[8] = l("kbd", null, "F2", -1))
                ]),
                l("div", ba, [
                  l("div", null, g(o(s)("Refresh")), 1),
                  w[9] || (w[9] = l("kbd", null, "F5", -1))
                ]),
                l("div", wa, [
                  J(g(o(s)("Delete")) + " ", 1),
                  w[10] || (w[10] = l("kbd", null, "Del", -1))
                ]),
                l("div", ya, [
                  J(g(o(s)("Escape")) + " ", 1),
                  w[11] || (w[11] = l("div", null, [
                    l("kbd", null, "Esc")
                  ], -1))
                ]),
                l("div", ka, [
                  J(g(o(s)("Select All")) + " ", 1),
                  w[12] || (w[12] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    J(" + "),
                    l("kbd", null, "A")
                  ], -1))
                ]),
                l("div", Sa, [
                  J(g(o(s)("Search")) + " ", 1),
                  w[13] || (w[13] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    J(" + "),
                    l("kbd", null, "F")
                  ], -1))
                ]),
                l("div", xa, [
                  J(g(o(s)("Toggle Sidebar")) + " ", 1),
                  w[14] || (w[14] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    J(" + "),
                    l("kbd", null, "E")
                  ], -1))
                ]),
                l("div", $a, [
                  J(g(o(s)("Open Settings")) + " ", 1),
                  w[15] || (w[15] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    J(" + "),
                    l("kbd", null, ",")
                  ], -1))
                ]),
                l("div", Ca, [
                  J(g(o(s)("Toggle Full Screen")) + " ", 1),
                  w[16] || (w[16] = l("div", null, [
                    l("kbd", null, "Ctrl"),
                    J(" + "),
                    l("kbd", null, "Enter")
                  ], -1))
                ])
              ])
            ])) : U("", !0),
            d.value === c.RESET ? (_(), h("div", Ea, [
              l("div", Ta, g(o(s)("Reset all settings to default")), 1),
              l("button", {
                onClick: a,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, g(o(s)("Reset Settings")), 1)
            ])) : U("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Aa = ["title"], Ke = {
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
    const n = e, r = re("ServiceContainer"), { t: s } = r.i18n, c = A(!1), i = A(null), d = A((u = i.value) == null ? void 0 : u.strMessage);
    Oe(d, () => c.value = !1);
    const a = () => {
      n("hidden"), c.value = !0;
    };
    return (p, f) => (_(), h("div", null, [
      c.value ? U("", !0) : (_(), h("div", {
        key: 0,
        ref_key: "strMessage",
        ref: i,
        class: ae(["vuefinder__message", t.error ? "vuefinder__message--error" : "vuefinder__message--success"])
      }, [
        Rt(p.$slots, "default"),
        l("div", {
          class: "vuefinder__message__close",
          onClick: a,
          title: o(s)("Close")
        }, f[0] || (f[0] = [
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
        ]), 8, Aa)
      ], 2))
    ]));
  }
}, Da = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Ma(t, e) {
  return _(), h("svg", Da, e[0] || (e[0] = [
    l("path", { d: "m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21q.512.078 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48 48 0 0 0-3.478-.397m-12 .562q.51-.089 1.022-.165m0 0a48 48 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a52 52 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a49 49 0 0 0-7.5 0" }, null, -1)
  ]));
}
const Co = { render: Ma }, Va = { class: "vuefinder__delete-modal__content" }, La = { class: "vuefinder__delete-modal__form" }, Oa = { class: "vuefinder__delete-modal__description" }, Ra = { class: "vuefinder__delete-modal__files vf-scrollbar" }, Ha = { class: "vuefinder__delete-modal__file" }, Ba = {
  key: 0,
  class: "vuefinder__delete-modal__icon vuefinder__delete-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Fa = {
  key: 1,
  class: "vuefinder__delete-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ia = { class: "vuefinder__delete-modal__file-name" }, Na = { class: "vuefinder__delete-modal__warning" }, ss = {
  __name: "ModalDelete",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = A(e.modal.data.items), s = A(""), c = () => {
      r.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "delete",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: r.value.map(({ path: i, type: d }) => ({ path: i, type: d }))
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("Files deleted.") });
        },
        onError: (i) => {
          s.value = n(i.message);
        }
      });
    };
    return (i, d) => (_(), j(We, null, {
      buttons: Q(() => [
        l("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-danger"
        }, g(o(n)("Yes, Delete!")), 1),
        l("button", {
          type: "button",
          onClick: d[1] || (d[1] = (a) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(o(n)("Cancel")), 1),
        l("div", Na, g(o(n)("This action cannot be undone.")), 1)
      ]),
      default: Q(() => [
        l("div", null, [
          q(Ze, {
            icon: o(Co),
            title: o(n)("Delete files")
          }, null, 8, ["icon", "title"]),
          l("div", Va, [
            l("div", La, [
              l("p", Oa, g(o(n)("Are you sure you want to delete these files?")), 1),
              l("div", Ra, [
                (_(!0), h(ke, null, Ce(r.value, (a) => (_(), h("p", Ha, [
                  a.type === "dir" ? (_(), h("svg", Ba, d[2] || (d[2] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (_(), h("svg", Fa, d[3] || (d[3] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  l("span", Ia, g(a.basename), 1)
                ]))), 256))
              ]),
              s.value.length ? (_(), j(Ke, {
                key: 0,
                onHidden: d[0] || (d[0] = (a) => s.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  J(g(s.value), 1)
                ]),
                _: 1
              })) : U("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Ua = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Pa(t, e) {
  return _(), h("svg", Ua, e[0] || (e[0] = [
    l("path", { d: "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" }, null, -1)
  ]));
}
const Eo = { render: Pa }, qa = { class: "vuefinder__rename-modal__content" }, za = { class: "vuefinder__rename-modal__item" }, Ga = { class: "vuefinder__rename-modal__item-info" }, ja = {
  key: 0,
  class: "vuefinder__rename-modal__icon vuefinder__rename-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Wa = {
  key: 1,
  class: "vuefinder__rename-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Ka = { class: "vuefinder__rename-modal__item-name" }, os = {
  __name: "ModalRename",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = A(e.modal.data.items[0]), s = A(e.modal.data.items[0].basename), c = A(""), i = () => {
      s.value != "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "rename",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: r.value.path,
          name: s.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is renamed.", s.value) });
        },
        onError: (d) => {
          c.value = n(d.message);
        }
      });
    };
    return (d, a) => (_(), j(We, null, {
      buttons: Q(() => [
        l("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, g(o(n)("Rename")), 1),
        l("button", {
          type: "button",
          onClick: a[2] || (a[2] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        l("div", null, [
          q(Ze, {
            icon: o(Eo),
            title: o(n)("Rename")
          }, null, 8, ["icon", "title"]),
          l("div", qa, [
            l("div", za, [
              l("p", Ga, [
                r.value.type === "dir" ? (_(), h("svg", ja, a[3] || (a[3] = [
                  l("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (_(), h("svg", Wa, a[4] || (a[4] = [
                  l("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                l("span", Ka, g(r.value.basename), 1)
              ]),
              _e(l("input", {
                "onUpdate:modelValue": a[0] || (a[0] = (u) => s.value = u),
                onKeyup: Dt(i, ["enter"]),
                class: "vuefinder__rename-modal__input",
                placeholder: "Name",
                type: "text"
              }, null, 544), [
                [Mt, s.value]
              ]),
              c.value.length ? (_(), j(Ke, {
                key: 0,
                onHidden: a[1] || (a[1] = (u) => c.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  J(g(c.value), 1)
                ]),
                _: 1
              })) : U("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Ye = {
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
function Ya(t) {
  const e = (n) => {
    n.code === Ye.ESCAPE && (t.modal.close(), t.root.focus()), !t.modal.visible && (t.fs.searchMode || (n.code === Ye.F2 && t.features.includes(ve.RENAME) && (t.dragSelect.getCount() !== 1 || t.modal.open(os, { items: t.dragSelect.getSelected() })), n.code === Ye.F5 && t.emitter.emit("vf-fetch", { params: { q: "index", adapter: t.fs.adapter, path: t.fs.data.dirname } }), n.code === Ye.DELETE && (!t.dragSelect.getCount() || t.modal.open(ss, { items: t.dragSelect.getSelected() })), n.metaKey && n.code === Ye.BACKSLASH && t.modal.open($o), n.metaKey && n.code === Ye.KEY_F && t.features.includes(ve.SEARCH) && (t.fs.searchMode = !0, n.preventDefault()), n.metaKey && n.code === Ye.KEY_E && (t.showTreeView = !t.showTreeView, t.storage.setStore("show-tree-view", t.showTreeView)), n.metaKey && n.code === Ye.ENTER && (t.fullScreen = !t.fullScreen, t.root.focus()), n.metaKey && n.code === Ye.KEY_A && (t.dragSelect.selectAll(), n.preventDefault())));
  };
  Ee(() => {
    t.root.addEventListener("keydown", e);
  });
}
const Xa = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Ja(t, e) {
  return _(), h("svg", Xa, e[0] || (e[0] = [
    l("path", { d: "M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44z" }, null, -1)
  ]));
}
const To = { render: Ja }, Qa = { class: "vuefinder__new-folder-modal__content" }, Za = { class: "vuefinder__new-folder-modal__form" }, ei = { class: "vuefinder__new-folder-modal__description" }, ti = ["placeholder"], Ao = {
  __name: "ModalNewFolder",
  setup(t) {
    const e = re("ServiceContainer");
    e.storage;
    const { t: n } = e.i18n, r = A(""), s = A(""), c = () => {
      r.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfolder",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          name: r.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is created.", r.value) });
        },
        onError: (i) => {
          s.value = n(i.message);
        }
      });
    };
    return (i, d) => (_(), j(We, null, {
      buttons: Q(() => [
        l("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, g(o(n)("Create")), 1),
        l("button", {
          type: "button",
          onClick: d[2] || (d[2] = (a) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        l("div", null, [
          q(Ze, {
            icon: o(To),
            title: o(n)("New Folder")
          }, null, 8, ["icon", "title"]),
          l("div", Qa, [
            l("div", Za, [
              l("p", ei, g(o(n)("Create a new folder")), 1),
              _e(l("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (a) => r.value = a),
                onKeyup: Dt(c, ["enter"]),
                class: "vuefinder__new-folder-modal__input",
                placeholder: o(n)("Folder Name"),
                type: "text"
              }, null, 40, ti), [
                [Mt, r.value]
              ]),
              s.value.length ? (_(), j(Ke, {
                key: 0,
                onHidden: d[1] || (d[1] = (a) => s.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  J(g(s.value), 1)
                ]),
                _: 1
              })) : U("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, ni = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function si(t, e) {
  return _(), h("svg", ni, e[0] || (e[0] = [
    l("path", { d: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9" }, null, -1)
  ]));
}
const Do = { render: si }, oi = { class: "vuefinder__new-file-modal__content" }, ri = { class: "vuefinder__new-file-modal__form" }, li = { class: "vuefinder__new-file-modal__description" }, ai = ["placeholder"], ii = {
  __name: "ModalNewFile",
  setup(t) {
    const e = re("ServiceContainer");
    e.storage;
    const { t: n } = e.i18n, r = A(""), s = A(""), c = () => {
      r.value !== "" && e.emitter.emit("vf-fetch", {
        params: {
          q: "newfile",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          name: r.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("%s is created.", r.value) });
        },
        onError: (i) => {
          s.value = n(i.message);
        }
      });
    };
    return (i, d) => (_(), j(We, null, {
      buttons: Q(() => [
        l("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, g(o(n)("Create")), 1),
        l("button", {
          type: "button",
          onClick: d[2] || (d[2] = (a) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        l("div", null, [
          q(Ze, {
            icon: o(Do),
            title: o(n)("New File")
          }, null, 8, ["icon", "title"]),
          l("div", oi, [
            l("div", ri, [
              l("p", li, g(o(n)("Create a new file")), 1),
              _e(l("input", {
                "onUpdate:modelValue": d[0] || (d[0] = (a) => r.value = a),
                onKeyup: Dt(c, ["enter"]),
                class: "vuefinder__new-file-modal__input",
                placeholder: o(n)("File Name"),
                type: "text"
              }, null, 40, ai), [
                [Mt, r.value]
              ]),
              s.value.length ? (_(), j(Ke, {
                key: 0,
                onHidden: d[1] || (d[1] = (a) => s.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  J(g(s.value), 1)
                ]),
                _: 1
              })) : U("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
};
function zn(t, e = 14) {
  let n = `((?=([\\w\\W]{0,${e}}))([\\w\\W]{${e + 1},})([\\w\\W]{8,}))`;
  return t.replace(new RegExp(n), "$2..$4");
}
const ci = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function di(t, e) {
  return _(), h("svg", ci, e[0] || (e[0] = [
    l("path", { d: "M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" }, null, -1)
  ]));
}
const Mo = { render: di }, ui = { class: "vuefinder__upload-modal__content" }, vi = {
  key: 0,
  class: "pointer-events-none"
}, _i = {
  key: 1,
  class: "pointer-events-none"
}, fi = ["disabled"], mi = ["disabled"], pi = { class: "vuefinder__upload-modal__file-list vf-scrollbar" }, hi = ["textContent"], gi = { class: "vuefinder__upload-modal__file-info" }, bi = { class: "vuefinder__upload-modal__file-name hidden md:block" }, wi = { class: "vuefinder__upload-modal__file-name md:hidden" }, yi = {
  key: 0,
  class: "ml-auto"
}, ki = ["title", "disabled", "onClick"], Si = {
  key: 0,
  class: "py-2"
}, xi = ["disabled"], $i = {
  __name: "ModalUpload",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = n("uppy"), s = {
      PENDING: 0,
      CANCELED: 1,
      UPLOADING: 2,
      ERROR: 3,
      DONE: 10
    }, c = A({ QUEUE_ENTRY_STATUS: s }), i = A(null), d = A(null), a = A(null), u = A(null), p = A(null), f = A(null), m = A([]), v = A(""), b = A(!1), S = A(!1);
    let k;
    function V(C) {
      return m.value.findIndex((T) => T.id === C);
    }
    function L(C, T = null) {
      T = T ?? (C.webkitRelativePath || C.name), k.addFile({
        name: T,
        type: C.type,
        data: C,
        source: "Local"
      });
    }
    function w(C) {
      switch (C.status) {
        case s.DONE:
          return "text-green-600";
        case s.ERROR:
          return "text-red-600";
        case s.CANCELED:
          return "text-red-600";
        case s.PENDING:
        default:
          return "";
      }
    }
    const E = (C) => {
      switch (C.status) {
        case s.DONE:
          return "✓";
        case s.ERROR:
        case s.CANCELED:
          return "!";
        case s.PENDING:
        default:
          return "...";
      }
    };
    function B() {
      u.value.click();
    }
    function F() {
      if (!b.value) {
        if (!m.value.filter((C) => C.status !== s.DONE).length) {
          v.value = n("Please select file to upload first.");
          return;
        }
        v.value = "", k.retryAll(), k.upload();
      }
    }
    function W() {
      k.cancelAll({ reason: "user" }), m.value.forEach((C) => {
        C.status !== s.DONE && (C.status = s.CANCELED, C.statusName = n("Canceled"));
      }), b.value = !1;
    }
    function R(C) {
      b.value || (k.removeFile(C.id, "removed-by-user"), m.value.splice(V(C.id), 1));
    }
    function x(C) {
      if (!b.value) {
        if (k.cancelAll({ reason: "user" }), C) {
          const T = [];
          m.value.forEach((y) => {
            y.status !== s.DONE && T.push(y);
          }), m.value = [], T.forEach((y) => {
            L(y.originalFile, y.name);
          });
          return;
        }
        m.value.splice(0);
      }
    }
    function $() {
      e.modal.close();
    }
    function O() {
      return e.requester.transformRequestParams({
        url: "",
        method: "post",
        params: { q: "upload", adapter: e.fs.adapter, path: e.fs.data.dirname }
      });
    }
    return Ee(async () => {
      k = new sr({
        debug: e.debug,
        restrictions: {
          maxFileSize: fr(e.maxFileSize)
          //maxNumberOfFiles
          //allowedFileTypes
        },
        locale: r,
        onBeforeFileAdded(y, N) {
          if (N[y.id] != null) {
            const z = V(y.id);
            m.value[z].status === s.PENDING && (v.value = k.i18n("noDuplicates", { fileName: y.name })), m.value = m.value.filter((Z) => Z.id !== y.id);
          }
          return m.value.push({
            id: y.id,
            name: y.name,
            size: e.filesize(y.size),
            status: s.PENDING,
            statusName: n("Pending upload"),
            percent: null,
            originalFile: y.data
          }), !0;
        }
      }), k.use(or, {
        endpoint: "WILL_BE_REPLACED_BEFORE_UPLOAD",
        limit: 5,
        timeout: 0,
        getResponseError(y, N) {
          let P;
          try {
            P = JSON.parse(y).message;
          } catch {
            P = n("Cannot parse server response.");
          }
          return new Error(P);
        }
      }), k.on("restriction-failed", (y, N) => {
        const P = m.value[V(y.id)];
        R(P), v.value = N.message;
      }), k.on("upload", () => {
        const y = O();
        k.setMeta({ ...y.body });
        const N = k.getPlugin("XHRUpload");
        N.opts.method = y.method, N.opts.endpoint = y.url + "?" + new URLSearchParams(y.params), N.opts.headers = y.headers, delete y.headers["Content-Type"], b.value = !0, m.value.forEach((P) => {
          P.status !== s.DONE && (P.percent = null, P.status = s.UPLOADING, P.statusName = n("Pending upload"));
        });
      }), k.on("upload-progress", (y, N) => {
        const P = Math.floor(N.bytesUploaded / N.bytesTotal * 100);
        m.value[V(y.id)].percent = `${P}%`;
      }), k.on("upload-success", (y) => {
        const N = m.value[V(y.id)];
        N.status = s.DONE, N.statusName = n("Done");
      }), k.on("upload-error", (y, N) => {
        const P = m.value[V(y.id)];
        P.percent = null, P.status = s.ERROR, N.isNetworkError ? P.statusName = n("Network Error, Unable establish connection to the server or interrupted.") : P.statusName = N ? N.message : n("Unknown Error");
      }), k.on("error", (y) => {
        v.value = y.message, b.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), k.on("complete", () => {
        b.value = !1, e.emitter.emit("vf-fetch", {
          params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname },
          noCloseModal: !0
        });
      }), u.value.addEventListener("click", () => {
        d.value.click();
      }), p.value.addEventListener("click", () => {
        a.value.click();
      }), f.value.addEventListener("dragover", (y) => {
        y.preventDefault(), S.value = !0;
      }), f.value.addEventListener("dragleave", (y) => {
        y.preventDefault(), S.value = !1;
      });
      function C(y, N) {
        N.isFile && N.file((P) => y(N, P)), N.isDirectory && N.createReader().readEntries((P) => {
          P.forEach((z) => {
            C(y, z);
          });
        });
      }
      f.value.addEventListener("drop", (y) => {
        y.preventDefault(), S.value = !1;
        const N = /^[/\\](.+)/;
        [...y.dataTransfer.items].forEach((P) => {
          P.kind === "file" && C((z, Z) => {
            const ue = N.exec(z.fullPath);
            L(Z, ue[1]);
          }, P.webkitGetAsEntry());
        });
      });
      const T = ({ target: y }) => {
        const N = y.files;
        for (const P of N)
          L(P);
        y.value = "";
      };
      d.value.addEventListener("change", T), a.value.addEventListener("change", T);
    }), Ls(() => {
      k == null || k.close({ reason: "unmount" });
    }), (C, T) => (_(), j(We, null, {
      buttons: Q(() => [
        l("button", {
          type: "button",
          class: "vf-btn vf-btn-primary",
          disabled: b.value,
          onClick: st(F, ["prevent"])
        }, g(o(n)("Upload")), 9, xi),
        b.value ? (_(), h("button", {
          key: 0,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: st(W, ["prevent"])
        }, g(o(n)("Cancel")), 1)) : (_(), h("button", {
          key: 1,
          type: "button",
          class: "vf-btn vf-btn-secondary",
          onClick: st($, ["prevent"])
        }, g(o(n)("Close")), 1))
      ]),
      default: Q(() => [
        l("div", null, [
          q(Ze, {
            icon: o(Mo),
            title: o(n)("Upload Files")
          }, null, 8, ["icon", "title"]),
          l("div", ui, [
            l("div", {
              class: "vuefinder__upload-modal__drop-area",
              ref_key: "dropArea",
              ref: f,
              onClick: B
            }, [
              S.value ? (_(), h("div", vi, g(o(n)("Release to drop these files.")), 1)) : (_(), h("div", _i, g(o(n)("Drag and drop the files/folders to here or click here.")), 1))
            ], 512),
            l("div", {
              ref_key: "container",
              ref: i,
              class: "vuefinder__upload-modal__buttons"
            }, [
              l("button", {
                ref_key: "pickFiles",
                ref: u,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, g(o(n)("Select Files")), 513),
              l("button", {
                ref_key: "pickFolders",
                ref: p,
                type: "button",
                class: "vf-btn vf-btn-secondary"
              }, g(o(n)("Select Folders")), 513),
              l("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: b.value,
                onClick: T[0] || (T[0] = (y) => x(!1))
              }, g(o(n)("Clear all")), 9, fi),
              l("button", {
                type: "button",
                class: "vf-btn vf-btn-secondary",
                disabled: b.value,
                onClick: T[1] || (T[1] = (y) => x(!0))
              }, g(o(n)("Clear only successful")), 9, mi)
            ], 512),
            l("div", pi, [
              (_(!0), h(ke, null, Ce(m.value, (y) => (_(), h("div", {
                class: "vuefinder__upload-modal__file-entry",
                key: y.id
              }, [
                l("span", {
                  class: ae(["vuefinder__upload-modal__file-icon", w(y)])
                }, [
                  l("span", {
                    class: "vuefinder__upload-modal__file-icon-text",
                    textContent: g(E(y))
                  }, null, 8, hi)
                ], 2),
                l("div", gi, [
                  l("div", bi, g(o(zn)(y.name, 40)) + " (" + g(y.size) + ")", 1),
                  l("div", wi, g(o(zn)(y.name, 16)) + " (" + g(y.size) + ")", 1),
                  l("div", {
                    class: ae(["vuefinder__upload-modal__file-status", w(y)])
                  }, [
                    J(g(y.statusName) + " ", 1),
                    y.status === c.value.QUEUE_ENTRY_STATUS.UPLOADING ? (_(), h("b", yi, g(y.percent), 1)) : U("", !0)
                  ], 2)
                ]),
                l("button", {
                  type: "button",
                  class: ae(["vuefinder__upload-modal__file-remove", b.value ? "disabled" : ""]),
                  title: o(n)("Delete"),
                  disabled: b.value,
                  onClick: (N) => R(y)
                }, T[3] || (T[3] = [
                  l("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    "stroke-width": "1.5",
                    stroke: "currentColor",
                    class: "vuefinder__upload-modal__file-remove-icon"
                  }, [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  ], -1)
                ]), 10, ki)
              ]))), 128)),
              m.value.length ? U("", !0) : (_(), h("div", Si, g(o(n)("No files selected!")), 1))
            ]),
            v.value.length ? (_(), j(Ke, {
              key: 0,
              onHidden: T[2] || (T[2] = (y) => v.value = ""),
              error: ""
            }, {
              default: Q(() => [
                J(g(v.value), 1)
              ]),
              _: 1
            })) : U("", !0)
          ])
        ]),
        l("input", {
          ref_key: "internalFileInput",
          ref: d,
          type: "file",
          multiple: "",
          class: "hidden"
        }, null, 512),
        l("input", {
          ref_key: "internalFolderInput",
          ref: a,
          type: "file",
          multiple: "",
          webkitdirectory: "",
          class: "hidden"
        }, null, 512)
      ]),
      _: 1
    }));
  }
}, Ci = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Ei(t, e) {
  return _(), h("svg", Ci, e[0] || (e[0] = [
    l("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ]));
}
const Vo = { render: Ei }, Ti = { class: "vuefinder__unarchive-modal__content" }, Ai = { class: "vuefinder__unarchive-modal__items" }, Di = { class: "vuefinder__unarchive-modal__item" }, Mi = {
  key: 0,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Vi = {
  key: 1,
  class: "vuefinder__unarchive-modal__icon vuefinder__unarchive-modal__icon--file",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Li = { class: "vuefinder__unarchive-modal__item-name" }, Oi = { class: "vuefinder__unarchive-modal__info" }, Lo = {
  __name: "ModalUnarchive",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = A(e.modal.data.items[0]), s = A(""), c = A([]), i = () => {
      e.emitter.emit("vf-fetch", {
        params: {
          q: "unarchive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          item: r.value.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("The file unarchived.") });
        },
        onError: (d) => {
          s.value = n(d.message);
        }
      });
    };
    return (d, a) => (_(), j(We, null, {
      buttons: Q(() => [
        l("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, g(o(n)("Unarchive")), 1),
        l("button", {
          type: "button",
          onClick: a[1] || (a[1] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        l("div", null, [
          q(Ze, {
            icon: o(Vo),
            title: o(n)("Unarchive")
          }, null, 8, ["icon", "title"]),
          l("div", Ti, [
            l("div", Ai, [
              (_(!0), h(ke, null, Ce(c.value, (u) => (_(), h("p", Di, [
                u.type === "dir" ? (_(), h("svg", Mi, a[2] || (a[2] = [
                  l("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  }, null, -1)
                ]))) : (_(), h("svg", Vi, a[3] || (a[3] = [
                  l("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  }, null, -1)
                ]))),
                l("span", Li, g(u.basename), 1)
              ]))), 256)),
              l("p", Oi, g(o(n)("The archive will be unarchived at")) + " (" + g(o(e).fs.data.dirname) + ")", 1),
              s.value.length ? (_(), j(Ke, {
                key: 0,
                onHidden: a[0] || (a[0] = (u) => s.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  J(g(s.value), 1)
                ]),
                _: 1
              })) : U("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Ri = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function Hi(t, e) {
  return _(), h("svg", Ri, e[0] || (e[0] = [
    l("path", { d: "m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125" }, null, -1)
  ]));
}
const Oo = { render: Hi }, Bi = { class: "vuefinder__archive-modal__content" }, Fi = { class: "vuefinder__archive-modal__form" }, Ii = { class: "vuefinder__archive-modal__files vf-scrollbar" }, Ni = { class: "vuefinder__archive-modal__file" }, Ui = {
  key: 0,
  class: "vuefinder__archive-modal__icon vuefinder__archive-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Pi = {
  key: 1,
  class: "vuefinder__archive-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, qi = { class: "vuefinder__archive-modal__file-name" }, zi = ["placeholder"], Ro = {
  __name: "ModalArchive",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = A(""), s = A(""), c = A(e.modal.data.items), i = () => {
      c.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "archive",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: c.value.map(({ path: d, type: a }) => ({ path: d, type: a })),
          name: r.value
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("The file(s) archived.") });
        },
        onError: (d) => {
          s.value = n(d.message);
        }
      });
    };
    return (d, a) => (_(), j(We, null, {
      buttons: Q(() => [
        l("button", {
          type: "button",
          onClick: i,
          class: "vf-btn vf-btn-primary"
        }, g(o(n)("Archive")), 1),
        l("button", {
          type: "button",
          onClick: a[2] || (a[2] = (u) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(o(n)("Cancel")), 1)
      ]),
      default: Q(() => [
        l("div", null, [
          q(Ze, {
            icon: o(Oo),
            title: o(n)("Archive the files")
          }, null, 8, ["icon", "title"]),
          l("div", Bi, [
            l("div", Fi, [
              l("div", Ii, [
                (_(!0), h(ke, null, Ce(c.value, (u) => (_(), h("p", Ni, [
                  u.type === "dir" ? (_(), h("svg", Ui, a[3] || (a[3] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (_(), h("svg", Pi, a[4] || (a[4] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ]))),
                  l("span", qi, g(u.basename), 1)
                ]))), 256))
              ]),
              _e(l("input", {
                "onUpdate:modelValue": a[0] || (a[0] = (u) => r.value = u),
                onKeyup: Dt(i, ["enter"]),
                class: "vuefinder__archive-modal__input",
                placeholder: o(n)("Archive name. (.zip file will be created)"),
                type: "text"
              }, null, 40, zi), [
                [Mt, r.value]
              ]),
              s.value.length ? (_(), j(Ke, {
                key: 0,
                onHidden: a[1] || (a[1] = (u) => s.value = ""),
                error: ""
              }, {
                default: Q(() => [
                  J(g(s.value), 1)
                ]),
                _: 1
              })) : U("", !0)
            ])
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Gi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  class: "animate-spin p-0.5 h-5 w-5 text-white ml-auto",
  viewBox: "0 0 24 24"
};
function ji(t, e) {
  return _(), h("svg", Gi, e[0] || (e[0] = [
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
const rs = { render: ji }, Wi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Ki(t, e) {
  return _(), h("svg", Wi, e[0] || (e[0] = [
    l("path", { d: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" }, null, -1)
  ]));
}
const Yi = { render: Ki }, Xi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto vf-toolbar-icon",
  viewBox: "0 0 24 24"
};
function Ji(t, e) {
  return _(), h("svg", Xi, e[0] || (e[0] = [
    l("path", { d: "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" }, null, -1)
  ]));
}
const Qi = { render: Ji }, Zi = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function ec(t, e) {
  return _(), h("svg", Zi, e[0] || (e[0] = [
    l("path", { d: "M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18zM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18z" }, null, -1)
  ]));
}
const tc = { render: ec }, nc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  "stroke-width": "1.5",
  class: "h-6 w-6 md:h-8 md:w-8 m-auto",
  viewBox: "0 0 24 24"
};
function sc(t, e) {
  return _(), h("svg", nc, e[0] || (e[0] = [
    l("path", { d: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75" }, null, -1)
  ]));
}
const oc = { render: sc }, rc = { class: "vuefinder__toolbar" }, lc = {
  key: 0,
  class: "vuefinder__toolbar__actions"
}, ac = ["title"], ic = ["title"], cc = ["title"], dc = ["title"], uc = ["title"], vc = ["title"], _c = ["title"], fc = {
  key: 1,
  class: "vuefinder__toolbar__search-results"
}, mc = { class: "pl-2" }, pc = { class: "dark:bg-gray-700 bg-gray-200 text-xs px-2 py-1 rounded" }, hc = { class: "vuefinder__toolbar__controls" }, gc = ["title"], bc = ["title"], wc = {
  __name: "Toolbar",
  setup(t) {
    const e = re("ServiceContainer"), { setStore: n } = e.storage, { t: r } = e.i18n, s = e.dragSelect, c = A("");
    e.emitter.on("vf-search-query", ({ newQuery: a }) => {
      c.value = a;
    });
    const i = () => {
      e.fullScreen = !e.fullScreen;
    };
    Oe(() => e.fullScreen, () => {
      e.fullScreen ? document.querySelector("body").style.overflow = "hidden" : document.querySelector("body").style.overflow = "", n("full-screen", e.fullScreen), e.emitter.emit("vf-fullscreen-toggle");
    });
    const d = () => {
      e.view = e.view === "list" ? "grid" : "list", s.refreshSelection(), n("viewport", e.view);
    };
    return (a, u) => (_(), h("div", rc, [
      c.value.length ? (_(), h("div", fc, [
        l("div", mc, [
          J(g(o(r)("Search results for")) + " ", 1),
          l("span", pc, g(c.value), 1)
        ]),
        o(e).fs.loading ? (_(), j(o(rs), { key: 0 })) : U("", !0)
      ])) : (_(), h("div", lc, [
        o(e).features.includes(o(ve).NEW_FOLDER) ? (_(), h("div", {
          key: 0,
          class: "mx-1.5",
          title: o(r)("New Folder"),
          onClick: u[0] || (u[0] = (p) => o(e).modal.open(Ao, { items: o(s).getSelected() }))
        }, [
          q(o(To))
        ], 8, ac)) : U("", !0),
        o(e).features.includes(o(ve).NEW_FILE) ? (_(), h("div", {
          key: 1,
          class: "mx-1.5",
          title: o(r)("New File"),
          onClick: u[1] || (u[1] = (p) => o(e).modal.open(ii, { items: o(s).getSelected() }))
        }, [
          q(o(Do))
        ], 8, ic)) : U("", !0),
        o(e).features.includes(o(ve).RENAME) ? (_(), h("div", {
          key: 2,
          class: "mx-1.5",
          title: o(r)("Rename"),
          onClick: u[2] || (u[2] = (p) => o(s).getCount() !== 1 || o(e).modal.open(os, { items: o(s).getSelected() }))
        }, [
          q(o(Eo), {
            class: ae(o(s).getCount() === 1 ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, cc)) : U("", !0),
        o(e).features.includes(o(ve).DELETE) ? (_(), h("div", {
          key: 3,
          class: "mx-1.5",
          title: o(r)("Delete"),
          onClick: u[3] || (u[3] = (p) => !o(s).getCount() || o(e).modal.open(ss, { items: o(s).getSelected() }))
        }, [
          q(o(Co), {
            class: ae(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, dc)) : U("", !0),
        o(e).features.includes(o(ve).UPLOAD) ? (_(), h("div", {
          key: 4,
          class: "mx-1.5",
          title: o(r)("Upload"),
          onClick: u[4] || (u[4] = (p) => o(e).modal.open($i, { items: o(s).getSelected() }))
        }, [
          q(o(Mo))
        ], 8, uc)) : U("", !0),
        o(e).features.includes(o(ve).UNARCHIVE) && o(s).getCount() === 1 && o(s).getSelected()[0].mime_type === "application/zip" ? (_(), h("div", {
          key: 5,
          class: "mx-1.5",
          title: o(r)("Unarchive"),
          onClick: u[5] || (u[5] = (p) => !o(s).getCount() || o(e).modal.open(Lo, { items: o(s).getSelected() }))
        }, [
          q(o(Vo), {
            class: ae(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, vc)) : U("", !0),
        o(e).features.includes(o(ve).ARCHIVE) ? (_(), h("div", {
          key: 6,
          class: "mx-1.5",
          title: o(r)("Archive"),
          onClick: u[6] || (u[6] = (p) => !o(s).getCount() || o(e).modal.open(Ro, { items: o(s).getSelected() }))
        }, [
          q(o(Oo), {
            class: ae(o(s).getCount() ? "vf-toolbar-icon" : "vf-toolbar-icon-disabled")
          }, null, 8, ["class"])
        ], 8, _c)) : U("", !0)
      ])),
      l("div", hc, [
        o(e).features.includes(o(ve).FULL_SCREEN) ? (_(), h("div", {
          key: 0,
          onClick: i,
          class: "mx-1.5",
          title: o(r)("Toggle Full Screen")
        }, [
          o(e).fullScreen ? (_(), j(o(Qi), { key: 0 })) : (_(), j(o(Yi), { key: 1 }))
        ], 8, gc)) : U("", !0),
        l("div", {
          class: "mx-1.5",
          title: o(r)("Change View"),
          onClick: u[7] || (u[7] = (p) => c.value.length || d())
        }, [
          o(e).view === "grid" ? (_(), j(o(tc), {
            key: 0,
            class: ae(["vf-toolbar-icon", c.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : U("", !0),
          o(e).view === "list" ? (_(), j(o(oc), {
            key: 1,
            class: ae(["vf-toolbar-icon", c.value.length ? "vf-toolbar-icon-disabled" : ""])
          }, null, 8, ["class"])) : U("", !0)
        ], 8, bc)
      ])
    ]));
  }
}, yc = (t, e = 0, n = !1) => {
  let r;
  return (...s) => {
    n && !r && t(...s), clearTimeout(r), r = setTimeout(() => {
      t(...s);
    }, e);
  };
}, As = (t, e, n) => {
  const r = A(t);
  return Ko((s, c) => ({
    get() {
      return s(), r.value;
    },
    set: yc(
      (i) => {
        r.value = i, c();
      },
      e,
      n
    )
  }));
}, kc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "aria-hidden": "true",
  class: "h-6 w-6 stroke-blue-600 dark:stroke-blue-100",
  viewBox: "0 0 24 24"
};
function Sc(t, e) {
  return _(), h("svg", kc, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3"
    }, null, -1)
  ]));
}
const xc = { render: Sc }, $c = { class: "vuefinder__move-modal__content" }, Cc = { class: "vuefinder__move-modal__description" }, Ec = { class: "vuefinder__move-modal__files vf-scrollbar" }, Tc = { class: "vuefinder__move-modal__file" }, Ac = {
  key: 0,
  class: "vuefinder__move-modal__icon vuefinder__move-modal__icon--dir",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Dc = {
  key: 1,
  class: "vuefinder__move-modal__icon",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "1"
}, Mc = { class: "vuefinder__move-modal__file-name" }, Vc = { class: "vuefinder__move-modal__target-title" }, Lc = { class: "vuefinder__move-modal__target-directory" }, Oc = { class: "vuefinder__move-modal__target-path" }, Rc = { class: "vuefinder__move-modal__selected-items" }, Gn = {
  __name: "ModalMove",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = A(e.modal.data.items.from), s = A(""), c = () => {
      r.value.length && e.emitter.emit("vf-fetch", {
        params: {
          q: "move",
          m: "post",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname
        },
        body: {
          items: r.value.map(({ path: i, type: d }) => ({ path: i, type: d })),
          item: e.modal.data.items.to.path
        },
        onSuccess: () => {
          e.emitter.emit("vf-toast-push", { label: n("Files moved.", e.modal.data.items.to.name) });
        },
        onError: (i) => {
          s.value = n(i.message);
        }
      });
    };
    return (i, d) => (_(), j(We, null, {
      buttons: Q(() => [
        l("button", {
          type: "button",
          onClick: c,
          class: "vf-btn vf-btn-primary"
        }, g(o(n)("Yes, Move!")), 1),
        l("button", {
          type: "button",
          onClick: d[1] || (d[1] = (a) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(o(n)("Cancel")), 1),
        l("div", Rc, g(o(n)("%s item(s) selected.", r.value.length)), 1)
      ]),
      default: Q(() => [
        l("div", null, [
          q(Ze, {
            icon: o(xc),
            title: o(n)("Move files")
          }, null, 8, ["icon", "title"]),
          l("div", $c, [
            l("p", Cc, g(o(n)("Are you sure you want to move these files?")), 1),
            l("div", Ec, [
              (_(!0), h(ke, null, Ce(r.value, (a) => (_(), h("div", Tc, [
                l("div", null, [
                  a.type === "dir" ? (_(), h("svg", Ac, d[2] || (d[2] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    }, null, -1)
                  ]))) : (_(), h("svg", Dc, d[3] || (d[3] = [
                    l("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    }, null, -1)
                  ])))
                ]),
                l("div", Mc, g(a.path), 1)
              ]))), 256))
            ]),
            l("h4", Vc, g(o(n)("Target Directory")), 1),
            l("p", Lc, [
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
              l("span", Oc, g(o(e).modal.data.items.to.path), 1)
            ]),
            s.value.length ? (_(), j(Ke, {
              key: 0,
              onHidden: d[0] || (d[0] = (a) => s.value = ""),
              error: ""
            }, {
              default: Q(() => [
                J(g(s.value), 1)
              ]),
              _: 1
            })) : U("", !0)
          ])
        ])
      ]),
      _: 1
    }));
  }
}, Hc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "-40 -40 580 580"
};
function Bc(t, e) {
  return _(), h("svg", Hc, e[0] || (e[0] = [
    l("path", { d: "M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224z" }, null, -1)
  ]));
}
const Fc = { render: Bc }, Ic = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-0.5 rounded",
  viewBox: "0 0 20 20"
};
function Nc(t, e) {
  return _(), h("svg", Ic, e[0] || (e[0] = [
    l("path", {
      "fill-rule": "evenodd",
      d: "M5.293 9.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1-1.414 1.414L11 7.414V15a1 1 0 1 1-2 0V7.414L6.707 9.707a1 1 0 0 1-1.414 0",
      class: "pointer-events-none",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const Uc = { render: Nc }, Pc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-300 dark:text-neutral-200 dark:hover:bg-gray-700 cursor-pointer",
  viewBox: "0 0 24 24"
};
function qc(t, e) {
  return _(), h("svg", Pc, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ]));
}
const zc = { render: qc }, Gc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 rounded text-slate-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 20 20"
};
function jc(t, e) {
  return _(), h("svg", Gc, e[0] || (e[0] = [
    l("path", {
      d: "M10.707 2.293a1 1 0 0 0-1.414 0l-7 7a1 1 0 0 0 1.414 1.414L4 10.414V17a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6.586l.293.293a1 1 0 0 0 1.414-1.414z",
      class: "pointer-events-none"
    }, null, -1)
  ]));
}
const Wc = { render: jc }, Kc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-6 w-6 p-1 m-auto stroke-gray-400 fill-gray-100 dark:stroke-gray-400 dark:fill-gray-400/20",
  viewBox: "0 0 20 20"
};
function Yc(t, e) {
  return _(), h("svg", Kc, e[0] || (e[0] = [
    l("path", { d: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607" }, null, -1)
  ]));
}
const Xc = { render: Yc }, Jc = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "w-6 h-6 cursor-pointer",
  viewBox: "0 0 24 24"
};
function Qc(t, e) {
  return _(), h("svg", Jc, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M6 18 18 6M6 6l12 12"
    }, null, -1)
  ]));
}
const Zc = { render: Qc }, ed = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500 fill-sky-500 stroke-sky-500 dark:fill-slate-500 dark:stroke-slate-500",
  viewBox: "0 0 24 24"
};
function td(t, e) {
  return _(), h("svg", ed, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2"
    }, null, -1)
  ]));
}
const gn = { render: td }, nd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-6 w-6 p-1 rounded text-slate-700 dark:text-neutral-300 cursor-pointer",
  viewBox: "0 0 24 24"
};
function sd(t, e) {
  return _(), h("svg", nd, e[0] || (e[0] = [
    l("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "M9 6h11M12 12h8M15 18h5M5 6v.01M8 12v.01M11 18v.01" }, null, -1)
  ]));
}
const od = { render: sd }, rd = {
  xmlns: "http://www.w3.org/2000/svg",
  class: "h-6 w-6 rounded text-slate-700 hover:bg-neutral-100 dark:fill-neutral-300 dark:hover:bg-gray-800 cursor-pointer",
  viewBox: "0 0 448 512"
};
function ld(t, e) {
  return _(), h("svg", rd, e[0] || (e[0] = [
    l("path", { d: "M8 256a56 56 0 1 1 112 0 56 56 0 1 1-112 0m160 0a56 56 0 1 1 112 0 56 56 0 1 1-112 0m216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112" }, null, -1)
  ]));
}
const ad = { render: ld }, id = { class: "vuefinder__breadcrumb__container" }, cd = ["title"], dd = ["title"], ud = ["title"], vd = ["title"], _d = { class: "vuefinder__breadcrumb__list" }, fd = {
  key: 0,
  class: "vuefinder__breadcrumb__hidden-list"
}, md = { class: "relative" }, pd = ["onDragover", "onDragleave", "onDrop", "title", "onClick"], hd = { class: "vuefinder__breadcrumb__search-mode" }, gd = ["placeholder"], bd = { class: "vuefinder__breadcrumb__hidden-dropdown" }, wd = ["onDrop", "onClick"], yd = { class: "vuefinder__breadcrumb__hidden-item-content" }, kd = { class: "vuefinder__breadcrumb__hidden-item-text" }, Sd = {
  __name: "Breadcrumb",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = e.dragSelect, { setStore: s } = e.storage, c = A(null), i = As(0, 100);
    Oe(i, (R) => {
      const x = c.value.children;
      let $ = 0, O = 0, C = 5, T = 1;
      e.fs.limitBreadcrumbItems(C), dt(() => {
        for (let y = x.length - 1; y >= 0 && !($ + x[y].offsetWidth > i.value - 40); y--)
          $ += parseInt(x[y].offsetWidth, 10), O++;
        O < T && (O = T), O > C && (O = C), e.fs.limitBreadcrumbItems(O);
      });
    });
    const d = () => {
      i.value = c.value.offsetWidth;
    };
    let a = A(null);
    Ee(() => {
      a.value = new ResizeObserver(d), a.value.observe(c.value);
    }), jn(() => {
      a.value.disconnect();
    });
    const u = (R, x = null) => {
      R.preventDefault(), r.isDraggingRef.value = !1, m(R), x ?? (x = e.fs.hiddenBreadcrumbs.length - 1);
      let $ = JSON.parse(R.dataTransfer.getData("items"));
      if ($.find((O) => O.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Gn, {
        items: {
          from: $,
          to: e.fs.hiddenBreadcrumbs[x] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, p = (R, x = null) => {
      R.preventDefault(), r.isDraggingRef.value = !1, m(R), x ?? (x = e.fs.breadcrumbs.length - 2);
      let $ = JSON.parse(R.dataTransfer.getData("items"));
      if ($.find((O) => O.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Gn, {
        items: {
          from: $,
          to: e.fs.breadcrumbs[x] ?? { path: e.fs.adapter + "://" }
        }
      });
    }, f = (R) => {
      R.preventDefault(), e.fs.isGoUpAvailable() ? (R.dataTransfer.dropEffect = "copy", R.currentTarget.classList.add("bg-blue-200", "dark:bg-slate-600")) : (R.dataTransfer.dropEffect = "none", R.dataTransfer.effectAllowed = "none");
    }, m = (R) => {
      R.preventDefault(), R.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600"), e.fs.isGoUpAvailable() && R.currentTarget.classList.remove("bg-blue-200", "dark:bg-slate-600");
    }, v = () => {
      F(), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    }, b = () => {
      F(), !e.fs.isGoUpAvailable() || e.emitter.emit("vf-fetch", {
        params: {
          q: "index",
          adapter: e.fs.adapter,
          path: e.fs.parentFolderPath
        }
      });
    }, S = (R) => {
      e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: R.path } }), e.fs.toggleHiddenBreadcrumbs(!1);
    }, k = () => {
      e.fs.showHiddenBreadcrumbs && e.fs.toggleHiddenBreadcrumbs(!1);
    }, V = {
      mounted(R, x, $, O) {
        R.clickOutsideEvent = function(C) {
          R === C.target || R.contains(C.target) || x.value();
        }, document.body.addEventListener("click", R.clickOutsideEvent);
      },
      beforeUnmount(R, x, $, O) {
        document.body.removeEventListener("click", R.clickOutsideEvent);
      }
    }, L = () => {
      e.showTreeView = !e.showTreeView;
    };
    Oe(() => e.showTreeView, (R, x) => {
      R !== x && s("show-tree-view", R);
    });
    const w = A(null), E = () => {
      e.features.includes(ve.SEARCH) && (e.fs.searchMode = !0, dt(() => w.value.focus()));
    }, B = As("", 400);
    Oe(B, (R) => {
      e.emitter.emit("vf-toast-clear"), e.emitter.emit("vf-search-query", { newQuery: R });
    }), Oe(() => e.fs.searchMode, (R) => {
      R && dt(() => w.value.focus());
    });
    const F = () => {
      e.fs.searchMode = !1, B.value = "";
    };
    e.emitter.on("vf-search-exit", () => {
      F();
    });
    const W = () => {
      B.value === "" && F();
    };
    return (R, x) => (_(), h("div", id, [
      l("span", {
        title: o(n)("Toggle Tree View")
      }, [
        q(o(od), {
          onClick: L,
          class: ae(["vuefinder__breadcrumb__toggle-tree", o(e).showTreeView ? "vuefinder__breadcrumb__toggle-tree--active" : ""])
        }, null, 8, ["class"])
      ], 8, cd),
      l("span", {
        title: o(n)("Go up a directory")
      }, [
        q(o(Uc), {
          onDragover: x[0] || (x[0] = ($) => f($)),
          onDragleave: x[1] || (x[1] = ($) => m($)),
          onDrop: x[2] || (x[2] = ($) => p($)),
          onClick: b,
          class: ae(o(e).fs.isGoUpAvailable() ? "vuefinder__breadcrumb__go-up--active" : "vuefinder__breadcrumb__go-up--inactive")
        }, null, 8, ["class"])
      ], 8, dd),
      o(e).fs.loading ? (_(), h("span", {
        key: 1,
        title: o(n)("Cancel")
      }, [
        q(o(zc), {
          onClick: x[3] || (x[3] = ($) => o(e).emitter.emit("vf-fetch-abort"))
        })
      ], 8, vd)) : (_(), h("span", {
        key: 0,
        title: o(n)("Refresh")
      }, [
        q(o(Fc), { onClick: v })
      ], 8, ud)),
      _e(l("div", {
        onClick: st(E, ["self"]),
        class: "group vuefinder__breadcrumb__search-container"
      }, [
        l("div", null, [
          q(o(Wc), {
            onDragover: x[4] || (x[4] = ($) => f($)),
            onDragleave: x[5] || (x[5] = ($) => m($)),
            onDrop: x[6] || (x[6] = ($) => p($, -1)),
            onClick: x[7] || (x[7] = ($) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(e).fs.adapter } }))
          })
        ]),
        l("div", _d, [
          o(e).fs.hiddenBreadcrumbs.length ? _e((_(), h("div", fd, [
            x[13] || (x[13] = l("div", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            l("div", md, [
              l("span", {
                onDragenter: x[8] || (x[8] = ($) => o(e).fs.toggleHiddenBreadcrumbs(!0)),
                onClick: x[9] || (x[9] = ($) => o(e).fs.toggleHiddenBreadcrumbs()),
                class: "vuefinder__breadcrumb__hidden-toggle"
              }, [
                q(o(ad), { class: "vuefinder__breadcrumb__hidden-toggle-icon" })
              ], 32)
            ])
          ])), [
            [V, k]
          ]) : U("", !0)
        ]),
        l("div", {
          ref_key: "breadcrumbContainer",
          ref: c,
          class: "vuefinder__breadcrumb__visible-list",
          onClick: st(E, ["self"])
        }, [
          (_(!0), h(ke, null, Ce(o(e).fs.breadcrumbs, ($, O) => (_(), h("div", { key: O }, [
            x[14] || (x[14] = l("span", { class: "vuefinder__breadcrumb__separator" }, "/", -1)),
            l("span", {
              onDragover: (C) => O === o(e).fs.breadcrumbs.length - 1 || f(C),
              onDragleave: (C) => O === o(e).fs.breadcrumbs.length - 1 || m(C),
              onDrop: (C) => O === o(e).fs.breadcrumbs.length - 1 || p(C, O),
              class: "vuefinder__breadcrumb__item",
              title: $.basename,
              onClick: (C) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: o(e).fs.adapter, path: $.path } })
            }, g($.name), 41, pd)
          ]))), 128))
        ], 512),
        o(e).fs.loading ? (_(), j(o(rs), { key: 0 })) : U("", !0)
      ], 512), [
        [ze, !o(e).fs.searchMode]
      ]),
      _e(l("div", hd, [
        l("div", null, [
          q(o(Xc))
        ]),
        _e(l("input", {
          ref_key: "searchInput",
          ref: w,
          onKeydown: Dt(F, ["esc"]),
          onBlur: W,
          "onUpdate:modelValue": x[10] || (x[10] = ($) => Yo(B) ? B.value = $ : null),
          placeholder: o(n)("Search anything.."),
          class: "vuefinder__breadcrumb__search-input",
          type: "text"
        }, null, 40, gd), [
          [Mt, o(B)]
        ]),
        q(o(Zc), { onClick: F })
      ], 512), [
        [ze, o(e).fs.searchMode]
      ]),
      _e(l("div", bd, [
        (_(!0), h(ke, null, Ce(o(e).fs.hiddenBreadcrumbs, ($, O) => (_(), h("div", {
          key: O,
          onDragover: x[11] || (x[11] = (C) => f(C)),
          onDragleave: x[12] || (x[12] = (C) => m(C)),
          onDrop: (C) => u(C, O),
          onClick: (C) => S($),
          class: "vuefinder__breadcrumb__hidden-item"
        }, [
          l("div", yd, [
            l("span", null, [
              q(o(gn), { class: "vuefinder__breadcrumb__hidden-item-icon" })
            ]),
            x[15] || (x[15] = J()),
            l("span", kd, g($.name), 1)
          ])
        ], 40, wd))), 128))
      ], 512), [
        [ze, o(e).fs.showHiddenBreadcrumbs]
      ])
    ]));
  }
}, Ho = (t, e = null) => new Date(t * 1e3).toLocaleString(e ?? navigator.language ?? "en-US"), xd = ["onClick"], $d = {
  __name: "Toast",
  setup(t) {
    const e = re("ServiceContainer"), { getStore: n } = e.storage, r = A(n("full-screen", !1)), s = A([]), c = (a) => a === "error" ? "text-red-400 border-red-400 dark:text-red-300 dark:border-red-300" : "text-lime-600 border-lime-600 dark:text-lime-300 dark:border-lime-1300", i = (a) => {
      s.value.splice(a, 1);
    }, d = (a) => {
      let u = s.value.findIndex((p) => p.id === a);
      u !== -1 && i(u);
    };
    return e.emitter.on("vf-toast-clear", () => {
      s.value = [];
    }), e.emitter.on("vf-toast-push", (a) => {
      let u = (/* @__PURE__ */ new Date()).getTime().toString(36).concat(performance.now().toString(), Math.random().toString()).replace(/\./g, "");
      a.id = u, s.value.push(a), setTimeout(() => {
        d(u);
      }, 5e3);
    }), (a, u) => (_(), h("div", {
      class: ae(["vuefinder__toast", r.value.value ? "vuefinder__toast--fixed" : "vuefinder__toast--absolute"])
    }, [
      q(Xo, {
        name: "vuefinder__toast-item",
        "enter-active-class": "vuefinder__toast-item--enter-active",
        "leave-active-class": "vuefinder__toast-item--leave-active",
        "leave-to-class": "vuefinder__toast-item--leave-to"
      }, {
        default: Q(() => [
          (_(!0), h(ke, null, Ce(s.value, (p, f) => (_(), h("div", {
            key: f,
            onClick: (m) => i(f),
            class: ae(["vuefinder__toast__message", c(p.type)])
          }, g(p.label), 11, xd))), 128))
        ]),
        _: 1
      })
    ], 2));
  }
}, Cd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Ed(t, e) {
  return _(), h("svg", Cd, e[0] || (e[0] = [
    l("path", {
      "fill-rule": "evenodd",
      d: "M5.293 7.293a1 1 0 0 1 1.414 0L10 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const Td = { render: Ed }, Ad = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 20 20"
};
function Dd(t, e) {
  return _(), h("svg", Ad, e[0] || (e[0] = [
    l("path", {
      "fill-rule": "evenodd",
      d: "M14.707 12.707a1 1 0 0 1-1.414 0L10 9.414l-3.293 3.293a1 1 0 0 1-1.414-1.414l4-4a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414",
      "clip-rule": "evenodd"
    }, null, -1)
  ]));
}
const Md = { render: Dd }, Wt = {
  __name: "SortIcon",
  props: { direction: String },
  setup(t) {
    return (e, n) => (_(), h("div", null, [
      t.direction === "asc" ? (_(), j(o(Td), { key: 0 })) : U("", !0),
      t.direction === "desc" ? (_(), j(o(Md), { key: 1 })) : U("", !0)
    ]));
  }
}, Vd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "text-neutral-500",
  viewBox: "0 0 24 24"
};
function Ld(t, e) {
  return _(), h("svg", Vd, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ]));
}
const Od = { render: Ld }, Rd = { class: "vuefinder__item-icon" }, En = {
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
    return (e, n) => (_(), h("span", Rd, [
      t.type === "dir" ? (_(), j(o(gn), {
        key: 0,
        class: ae(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"])) : (_(), j(o(Od), {
        key: 1,
        class: ae(t.small ? "vuefinder__item-icon--small" : "vuefinder__item-icon--large")
      }, null, 8, ["class"]))
    ]));
  }
}, Hd = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "absolute h-6 w-6 md:h-12 md:w-12 m-auto stroke-neutral-500 fill-white dark:fill-gray-700 dark:stroke-gray-600 z-10",
  viewBox: "0 0 24 24"
};
function Bd(t, e) {
  return _(), h("svg", Hd, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2"
    }, null, -1)
  ]));
}
const Fd = { render: Bd }, Id = { class: "vuefinder__drag-item__container" }, Nd = { class: "vuefinder__drag-item__count" }, Ud = {
  __name: "DragItem",
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  setup(t) {
    const e = t;
    return (n, r) => (_(), h("div", Id, [
      q(o(Fd)),
      l("div", Nd, g(e.count), 1)
    ]));
  }
}, Pd = { class: "vuefinder__text-preview" }, qd = { class: "vuefinder__text-preview__header" }, zd = ["title"], Gd = { class: "vuefinder__text-preview__actions" }, jd = {
  key: 0,
  class: "vuefinder__text-preview__content"
}, Wd = { key: 1 }, Kd = {
  __name: "Text",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, r = A(""), s = A(""), c = A(null), i = A(!1), d = A(""), a = A(!1), u = re("ServiceContainer"), { t: p } = u.i18n;
    Ee(() => {
      u.requester.send({
        url: "",
        method: "get",
        params: { q: "preview", adapter: u.modal.data.adapter, path: u.modal.data.item.path },
        responseType: "text"
      }).then((v) => {
        r.value = v, n("success");
      });
    });
    const f = () => {
      i.value = !i.value, s.value = r.value;
    }, m = () => {
      d.value = "", a.value = !1, u.requester.send({
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
      }).then((v) => {
        d.value = p("Updated."), r.value = v, n("success"), i.value = !i.value;
      }).catch((v) => {
        d.value = p(v.message), a.value = !0;
      });
    };
    return (v, b) => (_(), h("div", Pd, [
      l("div", qd, [
        l("div", {
          class: "vuefinder__text-preview__title",
          id: "modal-title",
          title: o(u).modal.data.item.path
        }, g(o(u).modal.data.item.basename), 9, zd),
        l("div", Gd, [
          i.value ? (_(), h("button", {
            key: 0,
            onClick: m,
            class: "vuefinder__text-preview__save-button"
          }, g(o(p)("Save")), 1)) : U("", !0),
          o(u).features.includes(o(ve).EDIT) ? (_(), h("button", {
            key: 1,
            class: "vuefinder__text-preview__edit-button",
            onClick: b[0] || (b[0] = (S) => f())
          }, g(i.value ? o(p)("Cancel") : o(p)("Edit")), 1)) : U("", !0)
        ])
      ]),
      l("div", null, [
        i.value ? (_(), h("div", Wd, [
          _e(l("textarea", {
            ref_key: "editInput",
            ref: c,
            "onUpdate:modelValue": b[1] || (b[1] = (S) => s.value = S),
            class: "vuefinder__text-preview__textarea",
            name: "text",
            cols: "30",
            rows: "10"
          }, null, 512), [
            [Mt, s.value]
          ])
        ])) : (_(), h("pre", jd, g(r.value), 1)),
        d.value.length ? (_(), j(Ke, {
          key: 2,
          onHidden: b[2] || (b[2] = (S) => d.value = ""),
          error: a.value
        }, {
          default: Q(() => [
            J(g(d.value), 1)
          ]),
          _: 1
        }, 8, ["error"])) : U("", !0)
      ])
    ]));
  }
}, Yd = { class: "vuefinder__image-preview" }, Xd = { class: "vuefinder__image-preview__header" }, Jd = ["title"], Qd = { class: "vuefinder__image-preview__actions" }, Zd = { class: "vuefinder__image-preview__image-container" }, eu = ["src"], tu = {
  __name: "Image",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, r = re("ServiceContainer"), { t: s } = r.i18n, c = A(null), i = A(null), d = A(!1), a = A(""), u = A(!1), p = () => {
      d.value = !d.value, d.value ? i.value = new lr(c.value, {
        crop(m) {
        }
      }) : i.value.destroy();
    }, f = () => {
      i.value.getCroppedCanvas({
        width: 795,
        height: 341
      }).toBlob(
        (m) => {
          a.value = "", u.value = !1;
          const v = new FormData();
          v.set("file", m), r.requester.send({
            url: "",
            method: "post",
            params: {
              q: "upload",
              adapter: r.modal.data.adapter,
              path: r.modal.data.item.path
            },
            body: v
          }).then((b) => {
            a.value = s("Updated."), c.value.src = r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item), p(), n("success");
          }).catch((b) => {
            a.value = s(b.message), u.value = !0;
          });
        }
      );
    };
    return Ee(() => {
      n("success");
    }), (m, v) => (_(), h("div", Yd, [
      l("div", Xd, [
        l("h3", {
          class: "vuefinder__image-preview__title",
          id: "modal-title",
          title: o(r).modal.data.item.path
        }, g(o(r).modal.data.item.basename), 9, Jd),
        l("div", Qd, [
          d.value ? (_(), h("button", {
            key: 0,
            onClick: f,
            class: "vuefinder__image-preview__crop-button"
          }, g(o(s)("Crop")), 1)) : U("", !0),
          o(r).features.includes(o(ve).EDIT) ? (_(), h("button", {
            key: 1,
            class: "vuefinder__image-preview__edit-button",
            onClick: v[0] || (v[0] = (b) => p())
          }, g(d.value ? o(s)("Cancel") : o(s)("Edit")), 1)) : U("", !0)
        ])
      ]),
      l("div", Zd, [
        l("img", {
          ref_key: "image",
          ref: c,
          class: "vuefinder__image-preview__image",
          src: o(r).requester.getPreviewUrl(o(r).modal.data.adapter, o(r).modal.data.item),
          alt: ""
        }, null, 8, eu)
      ]),
      a.value.length ? (_(), j(Ke, {
        key: 0,
        onHidden: v[1] || (v[1] = (b) => a.value = ""),
        error: u.value
      }, {
        default: Q(() => [
          J(g(a.value), 1)
        ]),
        _: 1
      }, 8, ["error"])) : U("", !0)
    ]));
  }
}, nu = { class: "vuefinder__default-preview" }, su = { class: "vuefinder__default-preview__header" }, ou = ["title"], ru = {
  __name: "Default",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), r = e;
    return Ee(() => {
      r("success");
    }), (s, c) => (_(), h("div", nu, [
      l("div", su, [
        l("h3", {
          class: "vuefinder__default-preview__title",
          id: "modal-title",
          title: o(n).modal.data.item.path
        }, g(o(n).modal.data.item.basename), 9, ou)
      ]),
      c[0] || (c[0] = l("div", null, null, -1))
    ]));
  }
}, lu = { class: "vuefinder__video-preview" }, au = ["title"], iu = {
  class: "vuefinder__video-preview__video",
  preload: "",
  controls: ""
}, cu = ["src"], du = {
  __name: "Video",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), r = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Ee(() => {
      r("success");
    }), (c, i) => (_(), h("div", lu, [
      l("h3", {
        class: "vuefinder__video-preview__title",
        id: "modal-title",
        title: o(n).modal.data.item.path
      }, g(o(n).modal.data.item.basename), 9, au),
      l("div", null, [
        l("video", iu, [
          l("source", {
            src: s(),
            type: "video/mp4"
          }, null, 8, cu),
          i[0] || (i[0] = J(" Your browser does not support the video tag. "))
        ])
      ])
    ]));
  }
}, uu = { class: "vuefinder__audio-preview" }, vu = ["title"], _u = {
  class: "vuefinder__audio-preview__audio",
  controls: ""
}, fu = ["src"], mu = {
  __name: "Audio",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = e, r = re("ServiceContainer"), s = () => r.requester.getPreviewUrl(r.modal.data.adapter, r.modal.data.item);
    return Ee(() => {
      n("success");
    }), (c, i) => (_(), h("div", uu, [
      l("h3", {
        class: "vuefinder__audio-preview__title",
        id: "modal-title",
        title: o(r).modal.data.item.path
      }, g(o(r).modal.data.item.basename), 9, vu),
      l("div", null, [
        l("audio", _u, [
          l("source", {
            src: s(),
            type: "audio/mpeg"
          }, null, 8, fu),
          i[0] || (i[0] = J(" Your browser does not support the audio element. "))
        ])
      ])
    ]));
  }
}, pu = { class: "vuefinder__pdf-preview" }, hu = ["title"], gu = ["data"], bu = ["src"], wu = {
  __name: "Pdf",
  emits: ["success"],
  setup(t, { emit: e }) {
    const n = re("ServiceContainer"), r = e, s = () => n.requester.getPreviewUrl(n.modal.data.adapter, n.modal.data.item);
    return Ee(() => {
      r("success");
    }), (c, i) => (_(), h("div", pu, [
      l("h3", {
        class: "vuefinder__pdf-preview__title",
        id: "modal-title",
        title: o(n).modal.data.item.path
      }, g(o(n).modal.data.item.basename), 9, hu),
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
          }, i[0] || (i[0] = [
            l("p", null, [
              J(" Your browser does not support PDFs. "),
              l("a", { href: "https://example.com/test.pdf" }, "Download the PDF"),
              J(". ")
            ], -1)
          ]), 8, bu)
        ], 8, gu)
      ])
    ]));
  }
}, yu = { class: "vuefinder__preview-modal__content" }, ku = { key: 0 }, Su = { class: "vuefinder__preview-modal__loading" }, xu = {
  key: 0,
  class: "vuefinder__preview-modal__loading-indicator"
}, $u = { class: "vuefinder__preview-modal__details" }, Cu = { class: "font-bold" }, Eu = { class: "font-bold pl-2" }, Tu = {
  key: 0,
  class: "vuefinder__preview-modal__note"
}, Au = ["download", "href"], Bo = {
  __name: "ModalPreview",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = A(!1), s = (i) => (e.modal.data.item.mime_type ?? "").startsWith(i), c = e.features.includes(ve.PREVIEW);
    return c || (r.value = !0), (i, d) => (_(), j(We, null, {
      buttons: Q(() => [
        l("button", {
          type: "button",
          onClick: d[6] || (d[6] = (a) => o(e).modal.close()),
          class: "vf-btn vf-btn-secondary"
        }, g(o(n)("Close")), 1),
        o(e).features.includes(o(ve).DOWNLOAD) ? (_(), h("a", {
          key: 0,
          target: "_blank",
          class: "vf-btn vf-btn-primary",
          download: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item),
          href: o(e).requester.getDownloadUrl(o(e).modal.data.adapter, o(e).modal.data.item)
        }, g(o(n)("Download")), 9, Au)) : U("", !0)
      ]),
      default: Q(() => [
        l("div", null, [
          l("div", yu, [
            o(c) ? (_(), h("div", ku, [
              s("text") ? (_(), j(Kd, {
                key: 0,
                onSuccess: d[0] || (d[0] = (a) => r.value = !0)
              })) : s("image") ? (_(), j(tu, {
                key: 1,
                onSuccess: d[1] || (d[1] = (a) => r.value = !0)
              })) : s("video") ? (_(), j(du, {
                key: 2,
                onSuccess: d[2] || (d[2] = (a) => r.value = !0)
              })) : s("audio") ? (_(), j(mu, {
                key: 3,
                onSuccess: d[3] || (d[3] = (a) => r.value = !0)
              })) : s("application/pdf") ? (_(), j(wu, {
                key: 4,
                onSuccess: d[4] || (d[4] = (a) => r.value = !0)
              })) : (_(), j(ru, {
                key: 5,
                onSuccess: d[5] || (d[5] = (a) => r.value = !0)
              }))
            ])) : U("", !0),
            l("div", Su, [
              r.value === !1 ? (_(), h("div", xu, [
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
                l("span", null, g(o(n)("Loading")), 1)
              ])) : U("", !0)
            ])
          ])
        ]),
        l("div", $u, [
          l("div", null, [
            l("span", Cu, g(o(n)("File Size")) + ": ", 1),
            J(g(o(e).filesize(o(e).modal.data.item.file_size)), 1)
          ]),
          l("div", null, [
            l("span", Eu, g(o(n)("Last Modified")) + ": ", 1),
            J(" " + g(o(Ho)(o(e).modal.data.item.last_modified)), 1)
          ])
        ]),
        o(e).features.includes(o(ve).DOWNLOAD) ? (_(), h("div", Tu, [
          l("span", null, g(o(n)(`Download doesn't work? You can try right-click "Download" button, select "Save link as...".`)), 1)
        ])) : U("", !0)
      ]),
      _: 1
    }));
  }
}, Du = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function Mu(t, e) {
  return _(), h("svg", Du, e[0] || (e[0] = [
    l("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "m15 4.5-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4M9 15l-4.5 4.5M14.5 4 20 9.5" }, null, -1)
  ]));
}
const Fo = { render: Mu }, Vu = ["data-type", "data-item", "data-index"], Tn = {
  __name: "Item",
  props: {
    item: { type: Object },
    index: { type: Number },
    dragImage: { type: Object }
  },
  setup(t) {
    const e = re("ServiceContainer"), n = e.dragSelect, r = t, s = (v) => {
      v.type === "dir" ? (e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: v.path } })) : e.modal.open(Bo, { adapter: e.fs.adapter, item: v });
    }, c = {
      mounted(v, b, S, k) {
        S.props.draggable && (v.addEventListener("dragstart", (V) => i(V, b.value)), v.addEventListener("dragover", (V) => a(V, b.value)), v.addEventListener("drop", (V) => d(V, b.value)));
      },
      beforeUnmount(v, b, S, k) {
        S.props.draggable && (v.removeEventListener("dragstart", i), v.removeEventListener("dragover", a), v.removeEventListener("drop", d));
      }
    }, i = (v, b) => {
      if (v.altKey || v.ctrlKey || v.metaKey)
        return v.preventDefault(), !1;
      n.isDraggingRef.value = !0, v.dataTransfer.setDragImage(r.dragImage.$el, 0, 15), v.dataTransfer.effectAllowed = "all", v.dataTransfer.dropEffect = "copy", v.dataTransfer.setData("items", JSON.stringify(n.getSelected()));
    }, d = (v, b) => {
      v.preventDefault(), n.isDraggingRef.value = !1;
      let S = JSON.parse(v.dataTransfer.getData("items"));
      if (S.find((k) => k.storage !== e.fs.adapter)) {
        alert("Moving items between different storages is not supported yet.");
        return;
      }
      e.modal.open(Gn, { items: { from: S, to: b } });
    }, a = (v, b) => {
      v.preventDefault(), !b || b.type !== "dir" || n.getSelection().find((S) => S === v.currentTarget) ? (v.dataTransfer.dropEffect = "none", v.dataTransfer.effectAllowed = "none") : v.dataTransfer.dropEffect = "copy";
    };
    let u = null, p = !1;
    const f = () => {
      u && clearTimeout(u);
    }, m = (v) => {
      if (!p)
        p = !0, setTimeout(() => p = !1, 300);
      else
        return p = !1, s(r.item), clearTimeout(u), !1;
      u = setTimeout(() => {
        const b = new MouseEvent("contextmenu", {
          bubbles: !0,
          cancelable: !1,
          view: window,
          button: 2,
          buttons: 0,
          clientX: v.target.getBoundingClientRect().x,
          clientY: v.target.getBoundingClientRect().y
        });
        v.target.dispatchEvent(b);
      }, 500);
    };
    return (v, b) => _e((_(), h("div", {
      style: rn({ opacity: o(n).isDraggingRef.value && o(n).getSelection().find((S) => v.$el === S) ? "0.5 !important" : "" }),
      class: ae(["vuefinder__item", "vf-item-" + o(n).explorerId]),
      "data-type": t.item.type,
      key: t.item.path,
      "data-item": JSON.stringify(t.item),
      "data-index": t.index,
      onDblclick: b[0] || (b[0] = (S) => s(t.item)),
      onTouchstart: b[1] || (b[1] = (S) => m(S)),
      onTouchend: b[2] || (b[2] = (S) => f()),
      onContextmenu: b[3] || (b[3] = st((S) => o(e).emitter.emit("vf-contextmenu-show", { event: S, items: o(n).getSelected(), target: t.item }), ["prevent"]))
    }, [
      Rt(v.$slots, "default"),
      o(e).pinnedFolders.find((S) => S.path === t.item.path) ? (_(), j(o(Fo), {
        key: 0,
        class: "vuefinder__item--pinned"
      })) : U("", !0)
    ], 46, Vu)), [
      [c, t.item]
    ]);
  }
}, Lu = { class: "vuefinder__explorer__container" }, Ou = {
  key: 0,
  class: "vuefinder__explorer__header"
}, Ru = { class: "vuefinder__explorer__drag-item" }, Hu = { class: "vuefinder__explorer__item-list-content" }, Bu = { class: "vuefinder__explorer__item-list-name" }, Fu = { class: "vuefinder__explorer__item-name" }, Iu = { class: "vuefinder__explorer__item-path" }, Nu = { class: "vuefinder__explorer__item-list-content" }, Uu = { class: "vuefinder__explorer__item-list-name" }, Pu = { class: "vuefinder__explorer__item-name" }, qu = { class: "vuefinder__explorer__item-size" }, zu = { class: "vuefinder__explorer__item-date" }, Gu = { class: "vuefinder__explorer__item-grid-content" }, ju = ["data-src", "alt"], Wu = {
  key: 2,
  class: "vuefinder__explorer__item-extension"
}, Ku = { class: "vuefinder__explorer__item-title break-all" }, Yu = {
  __name: "Explorer",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = (f) => f == null ? void 0 : f.substring(0, 3), s = A(null), c = A(""), i = e.dragSelect;
    let d;
    e.emitter.on("vf-fullscreen-toggle", () => {
      i.area.value.style.height = null;
    }), e.emitter.on("vf-search-query", ({ newQuery: f }) => {
      c.value = f, f ? e.emitter.emit("vf-fetch", {
        params: {
          q: "search",
          adapter: e.fs.adapter,
          path: e.fs.data.dirname,
          filter: f
        },
        onSuccess: (m) => {
          m.files.length || e.emitter.emit("vf-toast-push", { label: n("No search result found.") });
        }
      }) : e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter, path: e.fs.data.dirname } });
    });
    const a = At({ active: !1, column: "", order: "" }), u = (f = !0) => {
      let m = [...e.fs.data.files], v = a.column, b = a.order === "asc" ? 1 : -1;
      if (!f)
        return m;
      const S = (k, V) => typeof k == "string" && typeof V == "string" ? k.toLowerCase().localeCompare(V.toLowerCase()) : k < V ? -1 : k > V ? 1 : 0;
      return a.active && (m = m.slice().sort((k, V) => S(k[v], V[v]) * b)), m;
    }, p = (f) => {
      a.active && a.column === f ? (a.active = a.order === "asc", a.column = f, a.order = "desc") : (a.active = !0, a.column = f, a.order = "asc");
    };
    return Ee(() => {
      d = new rr(i.area.value);
    }), Ms(() => {
      d.update();
    }), Ls(() => {
      d.destroy();
    }), (f, m) => (_(), h("div", Lu, [
      o(e).view === "list" || c.value.length ? (_(), h("div", Ou, [
        l("div", {
          onClick: m[0] || (m[0] = (v) => p("basename")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--name vf-sort-button"
        }, [
          J(g(o(n)("Name")) + " ", 1),
          _e(q(Wt, {
            direction: a.order
          }, null, 8, ["direction"]), [
            [ze, a.active && a.column === "basename"]
          ])
        ]),
        c.value.length ? U("", !0) : (_(), h("div", {
          key: 0,
          onClick: m[1] || (m[1] = (v) => p("file_size")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--size vf-sort-button"
        }, [
          J(g(o(n)("Size")) + " ", 1),
          _e(q(Wt, {
            direction: a.order
          }, null, 8, ["direction"]), [
            [ze, a.active && a.column === "file_size"]
          ])
        ])),
        c.value.length ? U("", !0) : (_(), h("div", {
          key: 1,
          onClick: m[2] || (m[2] = (v) => p("last_modified")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--date vf-sort-button"
        }, [
          J(g(o(n)("Date")) + " ", 1),
          _e(q(Wt, {
            direction: a.order
          }, null, 8, ["direction"]), [
            [ze, a.active && a.column === "last_modified"]
          ])
        ])),
        c.value.length ? (_(), h("div", {
          key: 2,
          onClick: m[3] || (m[3] = (v) => p("path")),
          class: "vuefinder__explorer__sort-button vuefinder__explorer__sort-button--path vf-sort-button"
        }, [
          J(g(o(n)("Filepath")) + " ", 1),
          _e(q(Wt, {
            direction: a.order
          }, null, 8, ["direction"]), [
            [ze, a.active && a.column === "path"]
          ])
        ])) : U("", !0)
      ])) : U("", !0),
      l("div", Ru, [
        q(Ud, {
          ref_key: "dragImage",
          ref: s,
          count: o(i).getCount()
        }, null, 8, ["count"])
      ]),
      l("div", {
        ref: o(i).scrollBarContainer,
        class: ae(["vf-explorer-scrollbar-container vuefinder__explorer__scrollbar-container", [{ "grid-view": o(e).view === "grid" }, { "search-active": c.value.length }]])
      }, [
        l("div", {
          ref: o(i).scrollBar,
          class: "vuefinder__explorer__scrollbar"
        }, null, 512)
      ], 2),
      l("div", {
        ref: o(i).area,
        class: "vuefinder__explorer__selector-area vf-explorer-scrollbar vf-selector-area",
        onContextmenu: m[4] || (m[4] = st((v) => o(e).emitter.emit("vf-contextmenu-show", { event: v, items: o(i).getSelected() }), ["self", "prevent"]))
      }, [
        c.value.length ? (_(!0), h(ke, { key: 0 }, Ce(u(), (v, b) => (_(), j(Tn, {
          item: v,
          index: b,
          dragImage: s.value,
          class: "vf-item vf-item-list"
        }, {
          default: Q(() => [
            l("div", Hu, [
              l("div", Bu, [
                q(En, {
                  type: v.type,
                  small: o(e).compactListView
                }, null, 8, ["type", "small"]),
                l("span", Fu, g(v.basename), 1)
              ]),
              l("div", Iu, g(v.path), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : U("", !0),
        o(e).view === "list" && !c.value.length ? (_(!0), h(ke, { key: 1 }, Ce(u(), (v, b) => (_(), j(Tn, {
          item: v,
          index: b,
          dragImage: s.value,
          class: "vf-item vf-item-list",
          draggable: "true",
          key: v.path
        }, {
          default: Q(() => [
            l("div", Nu, [
              l("div", Uu, [
                q(En, {
                  type: v.type,
                  small: o(e).compactListView
                }, null, 8, ["type", "small"]),
                l("span", Pu, g(v.basename), 1)
              ]),
              l("div", qu, g(v.file_size ? o(e).filesize(v.file_size) : ""), 1),
              l("div", zu, g(o(Ho)(v.last_modified)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 128)) : U("", !0),
        o(e).view === "grid" && !c.value.length ? (_(!0), h(ke, { key: 2 }, Ce(u(!1), (v, b) => (_(), j(Tn, {
          item: v,
          index: b,
          dragImage: s.value,
          class: "vf-item vf-item-grid",
          draggable: "true"
        }, {
          default: Q(() => [
            l("div", null, [
              l("div", Gu, [
                (v.mime_type ?? "").startsWith("image") && o(e).showThumbnails ? (_(), h("img", {
                  src: "data:image/png;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
                  class: "vuefinder__explorer__item-thumbnail lazy",
                  "data-src": o(e).requester.getPreviewUrl(o(e).fs.adapter, v),
                  alt: v.basename,
                  key: v.path
                }, null, 8, ju)) : (_(), j(En, {
                  key: 1,
                  type: v.type
                }, null, 8, ["type"])),
                !((v.mime_type ?? "").startsWith("image") && o(e).showThumbnails) && v.type !== "dir" ? (_(), h("div", Wu, g(r(v.extension)), 1)) : U("", !0)
              ]),
              l("span", Ku, g(o(zn)(v.basename)), 1)
            ])
          ]),
          _: 2
        }, 1032, ["item", "index", "dragImage"]))), 256)) : U("", !0)
      ], 544),
      q($d)
    ]));
  }
}, Xu = ["href", "download"], Ju = ["onClick"], Qu = {
  __name: "ContextMenu",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, r = A(null), s = A([]), c = A(""), i = At({
      active: !1,
      items: [],
      positions: {
        left: 0,
        top: 0
      }
    }), d = ot(() => i.items.filter((f) => f.key == null || e.features.includes(f.key)));
    e.emitter.on("vf-context-selected", (f) => {
      s.value = f;
    });
    const a = {
      newfolder: {
        key: ve.NEW_FOLDER,
        title: () => n("New Folder"),
        action: () => e.modal.open(Ao)
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
          e.pinnedFolders = e.pinnedFolders.filter((f) => !s.value.find((m) => m.path === f.path)), e.storage.setStore("pinned-folders", e.pinnedFolders);
        }
      },
      delete: {
        key: ve.DELETE,
        title: () => n("Delete"),
        action: () => {
          e.modal.open(ss, { items: s });
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
        action: () => e.modal.open(Bo, { adapter: e.fs.adapter, item: s.value[0] })
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
        key: ve.DOWNLOAD,
        link: ot(() => e.requester.getDownloadUrl(e.fs.adapter, s.value[0])),
        title: () => n("Download"),
        action: () => {
        }
      },
      archive: {
        key: ve.ARCHIVE,
        title: () => n("Archive"),
        action: () => e.modal.open(Ro, { items: s })
      },
      unarchive: {
        key: ve.UNARCHIVE,
        title: () => n("Unarchive"),
        action: () => e.modal.open(Lo, { items: s })
      },
      rename: {
        key: ve.RENAME,
        title: () => n("Rename"),
        action: () => e.modal.open(os, { items: s })
      }
    }, u = (f) => {
      e.emitter.emit("vf-contextmenu-hide"), f.action();
    };
    e.emitter.on("vf-search-query", ({ newQuery: f }) => {
      c.value = f;
    }), e.emitter.on("vf-contextmenu-show", ({ event: f, items: m, target: v = null }) => {
      if (i.items = [], c.value)
        if (v)
          i.items.push(a.openDir), e.emitter.emit("vf-context-selected", [v]);
        else
          return;
      else !v && !c.value ? (i.items.push(a.refresh), i.items.push(a.selectAll), i.items.push(a.newfolder), e.emitter.emit("vf-context-selected", [])) : m.length > 1 && m.some((b) => b.path === v.path) ? (i.items.push(a.refresh), i.items.push(a.archive), i.items.push(a.delete), e.emitter.emit("vf-context-selected", m)) : (v.type === "dir" ? (i.items.push(a.open), e.pinnedFolders.findIndex((b) => b.path === v.path) !== -1 ? i.items.push(a.unpinFolder) : i.items.push(a.pinFolder)) : (i.items.push(a.preview), i.items.push(a.download)), i.items.push(a.rename), v.mime_type === "application/zip" ? i.items.push(a.unarchive) : i.items.push(a.archive), i.items.push(a.delete), e.emitter.emit("vf-context-selected", [v]));
      p(f);
    }), e.emitter.on("vf-contextmenu-hide", () => {
      i.active = !1;
    });
    const p = (f) => {
      const m = e.dragSelect.area.value, v = e.root.getBoundingClientRect(), b = m.getBoundingClientRect();
      let S = f.clientX - v.left, k = f.clientY - v.top;
      i.active = !0, dt(() => {
        var E;
        const V = (E = r.value) == null ? void 0 : E.getBoundingClientRect();
        let L = (V == null ? void 0 : V.height) ?? 0, w = (V == null ? void 0 : V.width) ?? 0;
        S = b.right - f.pageX + window.scrollX < w ? S - w : S, k = b.bottom - f.pageY + window.scrollY < L ? k - L : k, i.positions = {
          left: S + "px",
          top: k + "px"
        };
      });
    };
    return (f, m) => _e((_(), h("ul", {
      ref_key: "contextmenu",
      ref: r,
      style: rn(i.positions),
      class: "vuefinder__context-menu"
    }, [
      (_(!0), h(ke, null, Ce(d.value, (v) => (_(), h("li", {
        class: "vuefinder__context-menu__item",
        key: v.title
      }, [
        v.link ? (_(), h("a", {
          key: 0,
          class: "vuefinder__context-menu__link",
          target: "_blank",
          href: v.link,
          download: v.link,
          onClick: m[0] || (m[0] = (b) => o(e).emitter.emit("vf-contextmenu-hide"))
        }, [
          l("span", null, g(v.title()), 1)
        ], 8, Xu)) : (_(), h("div", {
          key: 1,
          class: "vuefinder__context-menu__action",
          onClick: (b) => u(v)
        }, [
          l("span", null, g(v.title()), 1)
        ], 8, Ju))
      ]))), 128))
    ], 4)), [
      [ze, i.active]
    ]);
  }
}, Zu = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function ev(t, e) {
  return _(), h("svg", Zu, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    }, null, -1)
  ]));
}
const Io = { render: ev }, tv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-5 w-5 stroke-slate-500 cursor-pointer",
  viewBox: "0 0 24 24"
};
function nv(t, e) {
  return _(), h("svg", tv, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    }, null, -1)
  ]));
}
const sv = { render: nv }, ov = { class: "vuefinder__status-bar__wrapper" }, rv = { class: "vuefinder__status-bar__storage" }, lv = ["title"], av = { class: "vuefinder__status-bar__storage-icon" }, iv = ["value"], cv = { class: "vuefinder__status-bar__info" }, dv = { key: 0 }, uv = { class: "vuefinder__status-bar__selected-count" }, vv = { class: "vuefinder__status-bar__actions" }, _v = ["disabled"], fv = ["title"], mv = {
  __name: "Statusbar",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, { setStore: r } = e.storage, s = e.dragSelect, c = () => {
      e.emitter.emit("vf-search-exit"), e.emitter.emit("vf-fetch", { params: { q: "index", adapter: e.fs.adapter } }), r("adapter", e.fs.adapter);
    }, i = A("");
    e.emitter.on("vf-search-query", ({ newQuery: a }) => {
      i.value = a;
    });
    const d = ot(() => {
      const a = e.selectButton.multiple ? s.getSelected().length > 0 : s.getSelected().length === 1;
      return e.selectButton.active && a;
    });
    return (a, u) => (_(), h("div", ov, [
      l("div", rv, [
        l("div", {
          class: "vuefinder__status-bar__storage-container",
          title: o(n)("Storage")
        }, [
          l("div", av, [
            q(o(Io))
          ]),
          _e(l("select", {
            "onUpdate:modelValue": u[0] || (u[0] = (p) => o(e).fs.adapter = p),
            onChange: c,
            class: "vuefinder__status-bar__storage-select",
            tabindex: "-1"
          }, [
            (_(!0), h(ke, null, Ce(o(e).fs.data.storages, (p) => (_(), h("option", { value: p }, g(p), 9, iv))), 256))
          ], 544), [
            [An, o(e).fs.adapter]
          ])
        ], 8, lv),
        l("div", cv, [
          i.value.length ? (_(), h("span", dv, g(o(e).fs.data.files.length) + " items found. ", 1)) : U("", !0),
          l("span", uv, g(o(e).dragSelect.getCount() > 0 ? o(n)("%s item(s) selected.", o(e).dragSelect.getCount()) : ""), 1)
        ])
      ]),
      l("div", vv, [
        o(e).selectButton.active ? (_(), h("button", {
          key: 0,
          class: ae(["vf-btn py-0 vf-btn-primary", { disabled: !d.value }]),
          disabled: !d.value,
          onClick: u[1] || (u[1] = (p) => o(e).selectButton.click(o(s).getSelected(), p))
        }, g(o(n)("Select")), 11, _v)) : U("", !0),
        l("span", {
          class: "vuefinder__status-bar__about",
          title: o(n)("About"),
          onClick: u[2] || (u[2] = (p) => o(e).modal.open($o))
        }, [
          q(o(sv))
        ], 8, fv)
      ])
    ]));
  }
}, pv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  class: "text-neutral-500 fill-sky-500 stroke-gray-100/50 dark:stroke-slate-700/50 dark:fill-slate-500",
  viewBox: "0 0 24 24"
};
function hv(t, e) {
  return _(), h("svg", pv, e[0] || (e[0] = [
    l("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M3.75 9.776q.168-.026.344-.026h15.812q.176 0 .344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
    }, null, -1)
  ]));
}
const No = { render: hv }, gv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "h-5 w-5",
  viewBox: "0 0 24 24"
};
function bv(t, e) {
  return _(), h("svg", gv, e[0] || (e[0] = [
    l("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m3.6 5.2a1 1 0 0 0-1.4.2L12 10.333 9.8 7.4a1 1 0 1 0-1.6 1.2l2.55 3.4-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2-2.933 2.2 2.933a1 1 0 0 0 1.6-1.2L13.25 12l2.55-3.4a1 1 0 0 0-.2-1.4" }, null, -1)
  ]));
}
const wv = { render: bv }, yv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function kv(t, e) {
  return _(), h("svg", yv, e[0] || (e[0] = [
    l("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "M15 12H9M12 9v6" }, null, -1)
  ]));
}
const Uo = { render: kv }, Sv = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  viewBox: "0 0 24 24"
};
function xv(t, e) {
  return _(), h("svg", Sv, e[0] || (e[0] = [
    l("path", {
      stroke: "none",
      d: "M0 0h24v24H0z"
    }, null, -1),
    l("path", { d: "M9 12h6" }, null, -1)
  ]));
}
const Po = { render: xv };
function qo(t, e) {
  const n = t.findIndex((r) => r.path === e.path);
  n > -1 ? t[n] = e : t.push(e);
}
const $v = { class: "vuefinder__folder-loader-indicator" }, Cv = {
  key: 1,
  class: "vuefinder__folder-loader-indicator--icon"
}, zo = {
  __name: "FolderLoaderIndicator",
  props: /* @__PURE__ */ Jo({
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
    const e = t, n = re("ServiceContainer");
    n.i18n;
    const r = Os(t, "modelValue"), s = A(!1);
    Oe(
      () => r.value,
      () => {
        var d;
        return ((d = c()) == null ? void 0 : d.folders.length) || i();
      }
    );
    function c() {
      return n.treeViewData.find((d) => d.path === e.path);
    }
    const i = () => {
      s.value = !0, n.requester.send({
        url: "",
        method: "get",
        params: {
          q: "subfolders",
          adapter: e.adapter,
          path: e.path
        }
      }).then((d) => {
        qo(n.treeViewData, { path: e.path, ...d });
      }).catch((d) => {
      }).finally(() => {
        s.value = !1;
      });
    };
    return (d, a) => {
      var u;
      return _(), h("div", $v, [
        s.value ? (_(), j(o(rs), {
          key: 0,
          class: "vuefinder__folder-loader-indicator--loading"
        })) : (_(), h("div", Cv, [
          r.value && ((u = c()) != null && u.folders.length) ? (_(), j(o(Po), {
            key: 0,
            class: "vuefinder__folder-loader-indicator--minus"
          })) : U("", !0),
          r.value ? U("", !0) : (_(), j(o(Uo), {
            key: 1,
            class: "vuefinder__folder-loader-indicator--plus"
          }))
        ]))
      ]);
    };
  }
}, Ev = { class: "vuefinder__treesubfolderlist__item-content" }, Tv = ["onClick"], Av = ["title", "onClick"], Dv = { class: "vuefinder__treesubfolderlist__item-icon" }, Mv = { class: "vuefinder__treesubfolderlist__subfolder" }, Vv = {
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
    const e = re("ServiceContainer"), n = A([]), r = t, s = A(null);
    Ee(() => {
      r.path === r.adapter + "://" && Qe(s.value, {
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    });
    const c = ot(() => {
      var i;
      return ((i = e.treeViewData.find((d) => d.path === r.path)) == null ? void 0 : i.folders) || [];
    });
    return (i, d) => {
      const a = Qo("TreeSubfolderList", !0);
      return _(), h("ul", {
        ref_key: "parentSubfolderList",
        ref: s,
        class: "vuefinder__treesubfolderlist__container"
      }, [
        (_(!0), h(ke, null, Ce(c.value, (u, p) => (_(), h("li", {
          key: u.path,
          class: "vuefinder__treesubfolderlist__item"
        }, [
          l("div", Ev, [
            l("div", {
              class: "vuefinder__treesubfolderlist__item-toggle",
              onClick: (f) => n.value[u.path] = !n.value[u.path]
            }, [
              q(zo, {
                adapter: t.adapter,
                path: u.path,
                modelValue: n.value[u.path],
                "onUpdate:modelValue": (f) => n.value[u.path] = f
              }, null, 8, ["adapter", "path", "modelValue", "onUpdate:modelValue"])
            ], 8, Tv),
            l("div", {
              class: "vuefinder__treesubfolderlist__item-link",
              title: u.path,
              onClick: (f) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: r.adapter, path: u.path } })
            }, [
              l("div", Dv, [
                o(e).fs.path === u.path ? (_(), j(o(No), { key: 0 })) : (_(), j(o(gn), { key: 1 }))
              ]),
              l("div", {
                class: ae(["vuefinder__treesubfolderlist__item-text", {
                  "vuefinder__treesubfolderlist__item-text--active": o(e).fs.path === u.path
                }])
              }, g(u.basename), 3)
            ], 8, Av)
          ]),
          l("div", Mv, [
            _e(q(a, {
              adapter: r.adapter,
              path: u.path
            }, null, 8, ["adapter", "path"]), [
              [ze, n.value[u.path]]
            ])
          ])
        ]))), 128))
      ], 512);
    };
  }
}, Lv = { class: "vuefinder__treestorageitem__loader" }, Ov = {
  __name: "TreeStorageItem",
  props: {
    storage: {
      type: String,
      required: !0
    }
  },
  setup(t) {
    const e = re("ServiceContainer"), n = A(!1);
    return (r, s) => (_(), h(ke, null, [
      l("div", {
        onClick: s[1] || (s[1] = (c) => n.value = !n.value),
        class: "vuefinder__treestorageitem__header"
      }, [
        l("div", {
          class: ae(["vuefinder__treestorageitem__info", t.storage === o(e).fs.adapter ? "vuefinder__treestorageitem__info--active" : ""])
        }, [
          l("div", {
            class: ae(["vuefinder__treestorageitem__icon", t.storage === o(e).fs.adapter ? "vuefinder__treestorageitem__icon--active" : ""])
          }, [
            q(o(Io))
          ], 2),
          l("div", null, g(t.storage), 1)
        ], 2),
        l("div", Lv, [
          q(zo, {
            adapter: t.storage,
            path: t.storage + "://",
            modelValue: n.value,
            "onUpdate:modelValue": s[0] || (s[0] = (c) => n.value = c)
          }, null, 8, ["adapter", "path", "modelValue"])
        ])
      ]),
      _e(q(Vv, {
        adapter: t.storage,
        path: t.storage + "://",
        class: "vuefinder__treestorageitem__subfolder"
      }, null, 8, ["adapter", "path"]), [
        [ze, n.value]
      ])
    ], 64));
  }
}, Rv = { class: "vuefinder__folder-indicator" }, Hv = { class: "vuefinder__folder-indicator--icon" }, Bv = {
  __name: "FolderIndicator",
  props: {
    modelValue: {},
    modelModifiers: {}
  },
  emits: ["update:modelValue"],
  setup(t) {
    const e = Os(t, "modelValue");
    return (n, r) => (_(), h("div", Rv, [
      l("div", Hv, [
        e.value ? (_(), j(o(Po), {
          key: 0,
          class: "vuefinder__folder-indicator--minus"
        })) : U("", !0),
        e.value ? U("", !0) : (_(), j(o(Uo), {
          key: 1,
          class: "vuefinder__folder-indicator--plus"
        }))
      ])
    ]));
  }
}, Fv = { class: "vuefinder__treeview__header" }, Iv = { class: "vuefinder__treeview__pinned-label" }, Nv = { class: "vuefinder__treeview__pin-text text-nowrap" }, Uv = {
  key: 0,
  class: "vuefinder__treeview__pinned-list"
}, Pv = { class: "vuefinder__treeview__pinned-item" }, qv = ["onClick"], zv = ["title"], Gv = ["onClick"], jv = { key: 0 }, Wv = { class: "vuefinder__treeview__no-pinned" }, Kv = { class: "vuefinder__treeview__storage" }, Yv = {
  __name: "TreeView",
  setup(t) {
    const e = re("ServiceContainer"), { t: n } = e.i18n, { getStore: r, setStore: s } = e.storage, c = A(190), i = A(r("pinned-folders-opened", !0));
    Oe(i, (p) => s("pinned-folders-opened", p));
    const d = (p) => {
      e.pinnedFolders = e.pinnedFolders.filter((f) => f.path !== p.path), e.storage.setStore("pinned-folders", e.pinnedFolders);
    }, a = (p) => {
      const f = p.clientX, m = p.target.parentElement, v = m.getBoundingClientRect().width;
      m.classList.remove("transition-[width]"), m.classList.add("transition-none");
      const b = (k) => {
        c.value = v + k.clientX - f, c.value < 50 && (c.value = 0, e.showTreeView = !1), c.value > 50 && (e.showTreeView = !0);
      }, S = () => {
        const k = m.getBoundingClientRect();
        c.value = k.width, m.classList.add("transition-[width]"), m.classList.remove("transition-none"), window.removeEventListener("mousemove", b), window.removeEventListener("mouseup", S);
      };
      window.addEventListener("mousemove", b), window.addEventListener("mouseup", S);
    }, u = A(null);
    return Ee(() => {
      Qe(u.value, {
        overflow: {
          x: "hidden"
        },
        scrollbars: {
          theme: "vf-theme-dark dark:vf-theme-light"
        }
      });
    }), Oe(e.fs.data, (p, f) => {
      const m = p.files.filter((v) => v.type === "dir");
      qo(e.treeViewData, { path: e.fs.path, folders: m.map((v) => ({
        adapter: v.storage,
        path: v.path,
        basename: v.basename
      })) });
    }), (p, f) => (_(), h(ke, null, [
      l("div", {
        onClick: f[0] || (f[0] = (m) => o(e).showTreeView = !o(e).showTreeView),
        class: ae(["vuefinder__treeview__overlay", o(e).showTreeView ? "vuefinder__treeview__backdrop" : "hidden"])
      }, null, 2),
      l("div", {
        style: rn(o(e).showTreeView ? "min-width:100px;max-width:75%; width: " + c.value + "px" : "width: 0"),
        class: "vuefinder__treeview__container"
      }, [
        l("div", {
          ref_key: "treeViewScrollElement",
          ref: u,
          class: "vuefinder__treeview__scroll"
        }, [
          l("div", Fv, [
            l("div", {
              onClick: f[2] || (f[2] = (m) => i.value = !i.value),
              class: "vuefinder__treeview__pinned-toggle"
            }, [
              l("div", Iv, [
                q(o(Fo), { class: "vuefinder__treeview__pin-icon" }),
                l("div", Nv, g(o(n)("Pinned Folders")), 1)
              ]),
              q(Bv, {
                modelValue: i.value,
                "onUpdate:modelValue": f[1] || (f[1] = (m) => i.value = m)
              }, null, 8, ["modelValue"])
            ]),
            i.value ? (_(), h("ul", Uv, [
              (_(!0), h(ke, null, Ce(o(e).pinnedFolders, (m) => (_(), h("li", Pv, [
                l("div", {
                  class: "vuefinder__treeview__pinned-folder",
                  onClick: (v) => o(e).emitter.emit("vf-fetch", { params: { q: "index", adapter: m.storage, path: m.path } })
                }, [
                  o(e).fs.path !== m.path ? (_(), j(o(gn), {
                    key: 0,
                    class: "vuefinder__treeview__folder-icon"
                  })) : U("", !0),
                  o(e).fs.path === m.path ? (_(), j(o(No), {
                    key: 1,
                    class: "vuefinder__treeview__open-folder-icon"
                  })) : U("", !0),
                  l("div", {
                    title: m.path,
                    class: ae(["vuefinder__treeview__folder-name text-nowrap", {
                      "vuefinder__treeview__folder-name--active": o(e).fs.path === m.path
                    }])
                  }, g(m.basename), 11, zv)
                ], 8, qv),
                l("div", {
                  class: "vuefinder__treeview__remove-favorite",
                  onClick: (v) => d(m)
                }, [
                  q(o(wv), { class: "vuefinder__treeview__remove-icon" })
                ], 8, Gv)
              ]))), 256)),
              o(e).pinnedFolders.length ? U("", !0) : (_(), h("li", jv, [
                l("div", Wv, g(o(n)("No folders pinned")), 1)
              ]))
            ])) : U("", !0)
          ]),
          (_(!0), h(ke, null, Ce(o(e).fs.data.storages, (m) => (_(), h("div", Kv, [
            q(Ov, { storage: m }, null, 8, ["storage"])
          ]))), 256))
        ], 512),
        l("div", {
          onMousedown: a,
          class: ae([(o(e).showTreeView, ""), "vuefinder__treeview__resize-handle"])
        }, null, 34)
      ], 4)
    ], 64));
  }
}, Xv = { class: "vuefinder__main__content" }, Jv = {
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
  setup(t, { emit: e }) {
    const n = e, s = hl(t, re("VueFinderOptions"));
    Zo("ServiceContainer", s);
    const { setStore: c } = s.storage, i = A(null);
    s.root = i;
    const d = s.dragSelect;
    Ya(s);
    const a = (p) => {
      Object.assign(s.fs.data, p), d.clearSelection(), d.refreshSelection();
    };
    let u;
    return s.emitter.on("vf-fetch-abort", () => {
      u.abort(), s.fs.loading = !1;
    }), s.emitter.on("vf-fetch", ({ params: p, body: f = null, onSuccess: m = null, onError: v = null, noCloseModal: b = !1 }) => {
      ["index", "search"].includes(p.q) && (u && u.abort(), s.fs.loading = !0), u = new AbortController();
      const S = u.signal;
      s.requester.send({
        url: "",
        method: p.m || "get",
        params: p,
        body: f,
        abortSignal: S
      }).then((k) => {
        s.fs.adapter = k.adapter, s.persist && (s.fs.path = k.dirname, c("path", s.fs.path)), ["index", "search"].includes(p.q) && (s.fs.loading = !1), b || s.modal.close(), a(k), m && m(k);
      }).catch((k) => {
        console.error(k), v && v(k);
      });
    }), Ee(() => {
      let p = {};
      s.fs.path.includes("://") && (p = {
        adapter: s.fs.path.split("://")[0],
        path: s.fs.path
      }), s.emitter.emit("vf-fetch", { params: { q: "index", adapter: s.fs.adapter, ...p } }), d.onSelect((f) => {
        n("select", f);
      });
    }), (p, f) => (_(), h("div", {
      class: "vuefinder",
      ref_key: "root",
      ref: i,
      tabindex: "0"
    }, [
      l("div", {
        class: ae(o(s).theme.actualValue)
      }, [
        l("div", {
          class: ae([o(s).fullScreen ? "vuefinder__main__fixed" : "vuefinder__main__relative", "vuefinder__main__container"]),
          style: rn(o(s).fullScreen ? "" : "max-height: " + t.maxHeight),
          onMousedown: f[0] || (f[0] = (m) => o(s).emitter.emit("vf-contextmenu-hide")),
          onTouchstart: f[1] || (f[1] = (m) => o(s).emitter.emit("vf-contextmenu-hide"))
        }, [
          q(wc),
          q(Sd),
          l("div", Xv, [
            q(Yv),
            q(Yu)
          ]),
          q(mv)
        ], 38),
        q(er, { name: "fade" }, {
          default: Q(() => [
            o(s).modal.visible ? (_(), j(Vs(o(s).modal.type), { key: 0 })) : U("", !0)
          ]),
          _: 1
        }),
        q(Qu)
      ], 2)
    ], 512));
  }
}, a_ = {
  /**
   * @param {import('vue').App} app
   * @param options
   */
  install(t, e = {}) {
    e.i18n = e.i18n ?? {};
    let [n] = Object.keys(e.i18n);
    e.locale = e.locale ?? n ?? "en", t.provide("VueFinderOptions", e), t.component("VueFinder", Jv);
  }
};
export {
  a_ as default
};
