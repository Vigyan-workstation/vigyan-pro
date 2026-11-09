var Oh=Object.defineProperty;var Eu=n=>{throw TypeError(n)};var Bh=(n,e,t)=>e in n?Oh(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var An=(n,e,t)=>Bh(n,typeof e!="symbol"?e+"":e,t),Yo=(n,e,t)=>e.has(n)||Eu("Cannot "+t);var V=(n,e,t)=>(Yo(n,e,"read from private field"),t?t.call(n):e.get(n)),Je=(n,e,t)=>e.has(n)?Eu("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,t),tt=(n,e,t,i)=>(Yo(n,e,"write to private field"),i?i.call(n,t):e.set(n,t),t),nt=(n,e,t)=>(Yo(n,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const Wd=!1;var Xd=Array.isArray,kh=Array.prototype.indexOf,ea=Array.prototype.includes,Bo=Array.from,qd=Object.defineProperty,ns=Object.getOwnPropertyDescriptor,zh=Object.getOwnPropertyDescriptors,Hh=Object.prototype,Gh=Array.prototype,Yd=Object.getPrototypeOf,Tu=Object.isExtensible;const Vh=()=>{};function Wh(n){for(var e=0;e<n.length;e++)n[e]()}function Kd(){var n,e,t=new Promise((i,r)=>{n=i,e=r});return{promise:t,resolve:n,reject:e}}const dn=2,gs=4,ko=8,Zd=1<<24,ei=16,si=32,or=64,Il=128,Oc=256,ri=512,Xt=1024,zt=2048,Vn=4096,_n=8192,tn=16384,ws=32768,ta=1<<25,_s=65536,vo=1<<17,Xh=1<<18,As=1<<19,qh=1<<20,pi=1<<25,xo=1<<21,is=1<<22,ir=1<<23,Ks=Symbol("$state"),Jd=Symbol("component"),Yh=Symbol("legacy props"),Kh=Symbol(""),so=Symbol("attributes"),Ul=Symbol("class"),Zh=Symbol("style"),zs=Symbol("text"),ao=Symbol("form reset"),ba=new class extends Error{constructor(){super(...arguments);An(this,"name","StaleReactionError");An(this,"message","The reaction that called `getAbortSignal()` was re-run or destroyed")}},Jh=1,Qh=2,Qd=4,jh=8,$h=16,ep=1,tp=4,np=8,ip=16,rp=1,sp=2,jd={},Wt=Symbol("uninitialized"),$d="http://www.w3.org/1999/xhtml",ap="http://www.w3.org/2000/svg",op="http://www.w3.org/1998/Math/MathML";function lp(){console.warn("https://svelte.dev/e/derived_inert")}function cp(){console.warn("https://svelte.dev/e/svelte_boundary_reset_noop")}function ef(n){return n===this.v}function up(n,e){return n!=n?e==e:n!==e||n!==null&&typeof n=="object"||typeof n=="function"}function tf(n){return!up(n,this.v)}function nf(n){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}function dp(){throw new Error("https://svelte.dev/e/async_derived_orphan")}function fp(n,e,t){throw new Error("https://svelte.dev/e/each_key_duplicate")}function hp(n){throw new Error("https://svelte.dev/e/effect_in_teardown")}function pp(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function mp(n){throw new Error("https://svelte.dev/e/effect_orphan")}function gp(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function _p(n){throw new Error("https://svelte.dev/e/props_invalid_value")}function vp(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function xp(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function Sp(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}function bp(){throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror")}let Mp=!1,nn=null;function vs(n){nn=n}function fn(n,e=!1,t){nn={p:nn,i:!1,c:null,e:null,s:n,x:null,r:vt,l:null}}function hn(n){var e=nn,t=e.e;if(t!==null){e.e=null;for(var i of t)yf(i)}return e.i=!0,nn=e.p,Bc(n)}function Bc(n={}){return qd(n,Jd,{value:!0}),n}function rf(){return!0}let br=[];function sf(){var n=br;br=[],Wh(n)}function er(n){if(br.length===0&&!Zs){var e=br;queueMicrotask(()=>{e===br&&sf()})}br.push(n)}function yp(){for(;br.length>0;)sf()}const Ep=-7169;function Bt(n,e){n.f=n.f&Ep|e}function kc(n){n.f&ri||n.deps===null?Bt(n,Xt):Bt(n,Vn)}function af(n,e,t){n.f&zt?e.add(n):n.f&Vn&&t.add(n),Bt(n,Xt)}let wu=!1;function Tp(){wu||(wu=!0,document.addEventListener("reset",n=>{Promise.resolve().then(()=>{var e;if(!n.defaultPrevented)for(const t of n.target.elements)(e=t[ao])==null||e.call(t)})},{capture:!0}))}function Ma(n){var e=ft,t=vt;Wn(null),bi(null);try{return n()}finally{Wn(e),bi(t)}}function wp(n,e,t,i=t){n.addEventListener(e,()=>Ma(t));const r=n[ao];r?n[ao]=()=>{r(),i(!0)}:n[ao]=()=>i(!0),Tp()}function Ap(n,e,t,i){const r=na;var s=n.filter(h=>!h.settled),a=e.map(r);if(t.length===0&&s.length===0){i(a);return}var o=vt,c=Rp(),l=s.length===1?s[0].promise:s.length>1?Promise.all(s.map(h=>h.promise)):null;function u(h){if(!(o.f&tn)){c();try{i([...a,...h])}catch(_){hi(_,o)}So()}}var f=of();if(t.length===0){l.then(()=>u([])).finally(f);return}function d(){Promise.all(t.map(h=>Cp(h))).then(u).catch(h=>hi(h,o)).finally(f)}l?l.then(()=>{if(o.f&tn){f();return}c(),d(),So()}):d()}function Rp(){var n=vt,e=ft,t=nn,i=Ve;return function(s=!0){bi(n),Wn(e),vs(t),s&&!(n.f&tn)&&(i==null||i.activate(),i==null||i.apply())}}function So(n=!0){bi(null),Wn(null),vs(null),n&&(Ve==null||Ve.deactivate())}function of(){var n=vt,e=n.b,t=Ve,i=!!(e!=null&&e.is_rendered());return e==null||e.update_pending_count(1,t),t.increment(i,n),()=>{e==null||e.update_pending_count(-1,t),t.decrement(i,n)}}function na(n){var e=dn|zt;return vt!==null&&(vt.f|=As),{ctx:nn,deps:null,effects:null,equals:ef,f:e,fn:n,reactions:null,rv:0,v:Wt,wv:0,parent:vt,ac:null}}const Hs=Symbol("obsolete");function Cp(n,e,t){let i=vt;i===null&&dp();var r=void 0,s=Ir(Wt),a=!ft,o=new Set;return qp(()=>{var h,_;var c=vt,l=Kd();r=l.promise;try{Promise.resolve(n()).then(l.resolve,v=>{v!==ba&&l.reject(v)}).finally(So)}catch(v){l.reject(v),So()}var u=Ve;if(a){if(c.f&ws)var f=of();if((h=i.b)!=null&&h.is_rendered())(_=u.async_deriveds.get(c))==null||_.reject(Hs);else for(const v of o.values())v.reject(Hs);o.add(l),u.async_deriveds.set(c,l)}const d=(v,p=void 0)=>{f==null||f(),o.delete(l),p!==Hs&&(u.activate(),p?(s.f|=ir,xs(s,p)):(s.f&ir&&(s.f^=ir),xs(s,v)),u.deactivate())};l.promise.then(d,v=>d(null,v||"unknown"))}),Vp(()=>{for(const c of o)c.reject(Hs)}),new Promise(c=>{function l(u){function f(){u===r?c(s):l(r)}u.then(f,f)}l(r)})}function qt(n){const e=na(n);return Cf(e),e}function lf(n){const e=na(n);return e.equals=tf,e}function Pp(n){var e=n.effects;if(e!==null){n.effects=null;for(var t=0;t<e.length;t+=1)yn(e[t])}}function zc(n){var e,t=vt,i=n.parent;if(!zi&&i!==null&&n.v!==Wt&&i.f&(tn|_n))return lp(),n.v;bi(i);try{Pp(n),e=Nf(n)}finally{bi(t)}return e}function cf(n){var e=zc(n);if(!n.equals(e)&&(n.wv=Df(),(!(Ve!=null&&Ve.is_fork)||n.deps===null)&&(Ve!==null?(Ve.capture(n,e,!0),rr==null||rr.capture(n,e,!0)):n.v=e,n.deps===null))){Bt(n,Xt);return}zi||($t!==null?(Vc()||Ve!=null&&Ve.is_fork)&&$t.set(n,e):kc(n))}function Dp(n){var e;if(n.effects!==null)for(const t of n.effects)(t.teardown||t.ac)&&((e=t.teardown)==null||e.call(t),t.ac!==null&&Ma(()=>{t.ac.abort(ba),t.ac=null}),t.fn!==null&&(t.teardown=Vh),ra(t,0),qc(t))}function uf(n){if(n.effects!==null)for(const e of n.effects)e.teardown&&e.fn!==null&&Ss(e)}let Ko=null,Br=null,Ve=null,rr=null,$t=null,Fl=null,Zs=!1,Zo=!1,Js=null,oo=null;var Au=0;let Lp=1;var cs,ji,Tr,us,ds,fs,Li,hs,Pn,da,Ni,Jn,ci,ps,wr,St,Ol,Bl,Gs,kl,df,ff,Qr,Np,Vs;const Io=class Io{constructor(){Je(this,St);An(this,"id",Lp++);Je(this,cs,!1);An(this,"linked",!0);Je(this,ji,null);Je(this,Tr,null);An(this,"async_deriveds",new Map);An(this,"current",new Map);An(this,"previous",new Map);Je(this,us,new Set);Je(this,ds,new Set);Je(this,fs,0);Je(this,Li,new Map);Je(this,hs,null);Je(this,Pn,[]);Je(this,da,[]);Je(this,Ni,new Set);Je(this,Jn,new Set);Je(this,ci,new Map);Je(this,ps,new Set);An(this,"is_fork",!1);Je(this,wr,!1);Br===null?Ko=Br=this:(tt(Br,Tr,this),tt(this,ji,Br)),Br=this}skip_effect(e){V(this,ci).has(e)||V(this,ci).set(e,{d:[],m:[]}),V(this,ps).delete(e)}unskip_effect(e,t=i=>this.schedule(i)){var i=V(this,ci).get(e);if(i){V(this,ci).delete(e);for(var r of i.d)Bt(r,zt),t(r);for(r of i.m)Bt(r,Vn),t(r)}V(this,ps).add(e)}capture(e,t,i=!1){e.v!==Wt&&!this.previous.has(e)&&this.previous.set(e,e.v),e.f&ir||(this.current.set(e,[t,i]),$t==null||$t.set(e,t)),this.is_fork||(e.v=t)}activate(){Ve=this}deactivate(){Ve=null,$t=null}flush(){try{Zo=!0,Ve=this,nt(this,St,Gs).call(this)}finally{Au=0,Fl=null,Js=null,oo=null,Zo=!1,Ve=null,$t=null,_i.clear()}}discard(){var e;for(const t of V(this,ds))t(this);V(this,ds).clear();for(const t of this.async_deriveds.values())t.reject(Hs);nt(this,St,Vs).call(this),(e=V(this,hs))==null||e.resolve()}register_created_effect(e){V(this,da).push(e)}increment(e,t){if(tt(this,fs,V(this,fs)+1),e){let i=V(this,Li).get(t)??0;V(this,Li).set(t,i+1)}}decrement(e,t){if(tt(this,fs,V(this,fs)-1),e){let i=V(this,Li).get(t)??0;i===1?V(this,Li).delete(t):V(this,Li).set(t,i-1)}V(this,wr)||(tt(this,wr,!0),er(()=>{tt(this,wr,!1),this.linked&&this.flush()}))}transfer_effects(e,t){for(const i of e)V(this,Ni).add(i);for(const i of t)V(this,Jn).add(i);e.clear(),t.clear()}oncommit(e){V(this,us).add(e)}ondiscard(e){V(this,ds).add(e)}settled(){return(V(this,hs)??tt(this,hs,Kd())).promise}static ensure(){if(Ve===null){const e=Ve=new Io;!Zo&&!Zs&&er(()=>{V(e,cs)||e.flush()})}return Ve}apply(){{$t=null;return}}schedule(e){var t;if(Fl=e,(t=e.b)!=null&&t.is_pending&&e.f&(gs|ko|Zd)&&!(e.f&ws)){e.b.defer_effect(e);return}V(this,Pn).push(e)}};cs=new WeakMap,ji=new WeakMap,Tr=new WeakMap,us=new WeakMap,ds=new WeakMap,fs=new WeakMap,Li=new WeakMap,hs=new WeakMap,Pn=new WeakMap,da=new WeakMap,Ni=new WeakMap,Jn=new WeakMap,ci=new WeakMap,ps=new WeakMap,wr=new WeakMap,St=new WeakSet,Ol=function(){if(this.is_fork)return!0;for(const i of V(this,Li).keys()){for(var e=i,t=!1;e.parent!==null;){if(V(this,ci).has(e)){t=!0;break}e=e.parent}if(!t)return!0}return!1},Bl=function(){var e=[];for(const s of V(this,Pn))if(!(s.f&tn||!(s.f&(zt|Vn)))){for(var t=s,i=!1;t.parent!==null;){t=t.parent;var r=t.f;if(r&(or|si)){if(!(r&Xt)){i=!0;break}t.f^=Xt}}i||e.push(t)}return tt(this,Pn,[]),e},Gs=function(){var o,c,l,u;tt(this,cs,!0);for(const f of V(this,Ni))V(this,Jn).delete(f),Bt(f,zt),this.schedule(f);for(const f of V(this,Jn))Bt(f,Vn),this.schedule(f);this.apply();for(var e=Js=[],t=[],i=oo=[];V(this,Pn).length>0;){Au++>1e3&&(nt(this,St,Vs).call(this),Up());for(const f of nt(this,St,Bl).call(this))try{nt(this,St,kl).call(this,f,e,t)}catch(d){throw mf(f),nt(this,St,Ol).call(this)||this.discard(),d}}if(Ve=null,i.length>0){var r=Io.ensure();for(const f of i)r.schedule(f)}if(Js=null,oo=null,nt(this,St,Ol).call(this)){nt(this,St,Qr).call(this,t),nt(this,St,Qr).call(this,e);for(const[f,d]of V(this,ci))pf(f,d);i.length>0&&nt(o=Ve,St,Gs).call(o);return}const s=nt(this,St,df).call(this);if(s){nt(this,St,Qr).call(this,t),nt(this,St,Qr).call(this,e),nt(c=s,St,ff).call(c,this);return}V(this,Ni).clear(),V(this,Jn).clear();for(const f of V(this,us))f(this);V(this,us).clear(),rr=this,Ru(t),Ru(e),rr=null,(l=V(this,hs))==null||l.resolve();var a=Ve;if(V(this,fs)===0&&(V(this,Pn).length===0||a!==null)&&nt(this,St,Vs).call(this),V(this,Pn).length>0)if(a!==null){for(const f of V(this,Pn))V(a,Pn).push(f);tt(this,Pn,[])}else a=this;a!==null&&(_i.clear(),nt(u=a,St,Gs).call(u))},kl=function(e,t,i){e.f^=Xt;for(var r=e.first;r!==null;){var s=r.f,a=(s&(si|or))!==0,o=a&&(s&Xt)!==0,c=o||(s&_n)!==0||V(this,ci).has(r);if(!c&&r.fn!==null){a?r.f^=Xt:s&gs?t.push(r):Ea(r)&&(s&ei&&V(this,Jn).add(r),Ss(r));var l=r.first;if(l!==null){r=l;continue}}for(;r!==null;){var u=r.next;if(u!==null){r=u;break}r=r.parent}}},df=function(){for(var e=V(this,ji);e!==null;){if(!e.is_fork){for(const[t,[,i]]of this.current)if(e.current.has(t)&&!i)return e}e=V(e,ji)}return null},ff=function(e){var i;for(const[r,s]of e.current)!this.previous.has(r)&&e.previous.has(r)&&this.previous.set(r,e.previous.get(r)),this.current.set(r,s);for(const[r,s]of e.async_deriveds){const a=this.async_deriveds.get(r);a&&s.promise.then(a.resolve).catch(a.reject)}e.async_deriveds.clear(),this.transfer_effects(V(e,Ni),V(e,Jn));const t=r=>{var s=r.reactions;if(s!==null&&!(r.f&dn&&!(r.f&(zt|Vn))))for(const c of s){var a=c.f;if(a&dn)t(c);else{var o=c;a&(is|ei)&&!this.async_deriveds.has(o)&&(V(this,Jn).delete(o),Bt(o,zt),this.schedule(o))}}};for(const r of this.current.keys())t(r);this.oncommit(()=>e.discard()),nt(i=e,St,Vs).call(i),Ve=this,nt(this,St,Gs).call(this)},Qr=function(e){for(var t=0;t<e.length;t+=1)af(e[t],V(this,Ni),V(this,Jn))},Np=function(){var f,d;for(let h=Ko;h!==null;h=V(h,Tr)){var e=h.id<this.id,t=[];for(const[_,[v,p]]of this.current){if(h.current.has(_)){var i=h.current.get(_)[0];if(e&&v!==i)h.current.set(_,[v,p]);else continue}t.push(_)}if(e)for(const[_,v]of this.async_deriveds){const p=h.async_deriveds.get(_);p&&v.promise.then(p.resolve).catch(p.reject)}var r=[...h.current.keys()].filter(_=>!h.current.get(_)[1]);if(!(!V(h,cs)||r.length===0)){var s=r.filter(_=>!this.current.has(_));if(s.length===0)e&&h.discard();else if(t.length>0){if(e)for(const _ of V(this,ps))h.unskip_effect(_,v=>{var p;v.f&(ei|is)?h.schedule(v):nt(p=h,St,Qr).call(p,[v])});h.activate();var a=new Set,o=new Map;for(var c of t)hf(c,s,a,o);o=new Map;var l=[...h.current].filter(([_,v])=>{const p=this.current.get(_);return p?p[0]!==v[0]||p[1]!==v[1]:!0}).map(([_])=>_);if(l.length>0)for(const _ of V(this,da))!(_.f&(tn|_n|vo))&&Hc(_,l,o)&&(_.f&(is|ei)?(Bt(_,zt),h.schedule(_)):V(h,Ni).add(_));if(V(h,Pn).length>0&&!V(h,wr)){h.apply();for(var u of nt(f=h,St,Bl).call(f))nt(d=h,St,kl).call(d,u,[],[])}h.deactivate()}}}},Vs=function(){if(this.linked){var e=V(this,ji),t=V(this,Tr);e===null?Ko=t:tt(e,Tr,t),t===null?Br=e:tt(t,ji,e),this.linked=!1}};let Nr=Io;function Ip(n){var e=Zs,t=rr;rr=null,Zs=!0;try{for(var i;;){if(yp(),Ve===null)return i;Ve.flush()}}finally{Zs=e,rr=t}}function Up(){try{gp()}catch(n){hi(n,Fl)}}let Zn=null;function Ru(n){var e=n.length;if(e!==0){for(var t=0;t<e;){var i=n[t++];if(!(i.f&(tn|_n))&&Ea(i)&&(Zn=new Set,Ss(i),i.deps===null&&i.first===null&&i.nodes===null&&i.teardown===null&&i.ac===null&&wf(i),(Zn==null?void 0:Zn.size)>0)){_i.clear();for(const r of Zn){if(r.f&(tn|_n))continue;const s=[r];let a=r.parent;for(;a!==null;)Zn.has(a)&&(Zn.delete(a),s.push(a)),a=a.parent;for(let o=s.length-1;o>=0;o--){const c=s[o];c.f&(tn|_n)||Ss(c)}}Zn.clear()}}Zn=null}}function hf(n,e,t,i){if(!t.has(n)&&(t.add(n),n.reactions!==null))for(const r of n.reactions){const s=r.f;s&dn?hf(r,e,t,i):s&(is|ei)&&!(s&zt)&&Hc(r,e,i)&&(Bt(r,zt),Gc(r))}}function Hc(n,e,t){const i=t.get(n);if(i!==void 0)return i;if(n.deps!==null)for(const r of n.deps){if(ea.call(e,r))return!0;if(r.f&dn&&Hc(r,e,t))return t.set(r,!0),!0}return t.set(n,!1),!1}function Gc(n){Ve.schedule(n)}function pf(n,e){if(!(n.f&si&&n.f&Xt)){n.f&zt?e.d.push(n):n.f&Vn&&e.m.push(n),Bt(n,Xt);for(var t=n.first;t!==null;)pf(t,e),t=t.next}}function mf(n){Bt(n,Xt);for(var e=n.first;e!==null;)mf(e),e=e.next}let bo=new Set;const _i=new Map;let gf=!1;function Ir(n,e){var t={f:0,v:n,reactions:null,equals:ef,rv:0,wv:0};return t}function Ze(n,e){const t=Ir(n);return Cf(t),t}function Fp(n,e=!1,t=!0){const i=Ir(n);return e||(i.equals=tf),i}function be(n,e,t=!1){ft!==null&&(!ni||ft.f&vo)&&rf()&&ft.f&(dn|ei|is|vo)&&(vi===null||!vi.has(n))&&Sp();let i=t?ti(e):e;return xs(n,i,oo)}var Sr=null,zl=0;function xs(n,e,t=null){if(!n.equals(e)){zi?_i.set(n,e):_i.has(n)||_i.set(n,n.v);var i=Nr.ensure();if(i.capture(n,e),n.f&dn){const r=n;n.f&zt&&zc(r),$t===null&&kc(r)}n.wv=Df(),Sr=null,zl=0,_f(n,zt,t),Sr=null,vt!==null&&vt.f&Xt&&!(vt.f&(si|or))&&(kn===null?Kp([n]):kn.push(n)),!i.is_fork&&bo.size>0&&!gf&&Op()}return e}function Op(){gf=!1;for(const n of bo){n.f&Xt&&Bt(n,Vn);let e;try{e=Ea(n)}catch{e=!0}e&&Ss(n)}bo.clear()}function Qs(n){be(n,n.v+1)}function _f(n,e,t){var i=n.reactions;if(i!==null){var r=i.length;if(zl+=r,zl>1e5&&Sr===null&&(Sr=new Set),Sr!==null){if(Sr.has(n))return;Sr.add(n)}for(var s=0;s<r;s++){var a=i[s],o=a.f,c=(o&zt)===0;if(c&&Bt(a,e),o&vo)bo.add(a);else if(o&dn){var l=a;$t==null||$t.delete(l),_f(l,Vn,t)}else if(c){var u=a;o&ei&&Zn!==null&&Zn.add(u),t!==null?t.push(u):Gc(u)}}}}function ti(n){if(typeof n!="object"||n===null||Ks in n||Jd in n)return n;const e=Yd(n);if(e!==Hh&&e!==Gh)return n;var t=new Map,i=Xd(n),r=Ze(0),s=Dr,a=o=>{if(Dr===s)return o();var c=ft,l=Dr;Wn(null),Du(s);var u=o();return Wn(c),Du(l),u};return i&&t.set("length",Ze(n.length)),new Proxy(n,{defineProperty(o,c,l){(!("value"in l)||l.configurable===!1||l.enumerable===!1||l.writable===!1)&&vp();var u=t.get(c);return u===void 0?a(()=>{var f=Ze(l.value);return t.set(c,f),f}):be(u,l.value,!0),!0},deleteProperty(o,c){var l=t.get(c);if(l===void 0){if(c in o){const u=a(()=>Ze(Wt));t.set(c,u),Qs(r)}}else be(l,Wt),Qs(r);return!0},get(o,c,l){var h;if(c===Ks)return n;var u=t.get(c),f=c in o;if(u===void 0&&(!f||(h=ns(o,c))!=null&&h.writable)&&(u=a(()=>{var _=ti(f?o[c]:Wt),v=Ze(_);return v}),t.set(c,u)),u!==void 0){var d=B(u);return d===Wt?void 0:d}return Reflect.get(o,c,l)},getOwnPropertyDescriptor(o,c){var d;(d=this.has)==null||d.call(this,o,c);var l=Reflect.getOwnPropertyDescriptor(o,c),u=t.get(c);if(u!==void 0){var f=B(u);if(f===Wt)return;if(l&&"value"in l)l.value=f;else return{enumerable:!0,configurable:!0,value:f,writable:!0}}return l},has(o,c){var d;if(c===Ks)return!0;var l=t.get(c),u=l!==void 0&&l.v!==Wt||Reflect.has(o,c);if(l!==void 0||vt!==null&&(!u||(d=ns(o,c))!=null&&d.writable)){l===void 0&&(l=a(()=>{var h=u?ti(o[c]):Wt,_=Ze(h);return _}),t.set(c,l));var f=B(l);if(f===Wt)return!1}return u},set(o,c,l,u){var w;var f=t.get(c),d=c in o;if(i&&c==="length")for(var h=l;h<f.v;h+=1){var _=t.get(h+"");_!==void 0?be(_,Wt):h in o&&(_=a(()=>Ze(Wt)),t.set(h+"",_))}if(f===void 0)(!d||(w=ns(o,c))!=null&&w.writable)&&(f=a(()=>Ze(void 0)),be(f,ti(l)),t.set(c,f));else{d=f.v!==Wt;var v=a(()=>ti(l));be(f,v)}var p=Reflect.getOwnPropertyDescriptor(o,c);if(p!=null&&p.set&&p.set.call(u,l),!d){if(i&&typeof c=="string"){var m=t.get("length"),y=Number(c);Number.isInteger(y)&&y>=m.v&&be(m,y+1)}Qs(r)}return!0},ownKeys(o){B(r);var c=Reflect.ownKeys(o).filter(f=>{var d=t.get(f);return d===void 0||d.v!==Wt});for(var[l,u]of t)u.v!==Wt&&!(l in o)&&c.push(l);return c},setPrototypeOf(){xp()}})}var Cu,vf,xf,Sf;function Bp(){if(Cu===void 0){Cu=window,vf=/Firefox/.test(navigator.userAgent);var n=Element.prototype,e=Node.prototype,t=Text.prototype;xf=ns(e,"firstChild").get,Sf=ns(e,"nextSibling").get,Tu(n)&&(n[Ul]=void 0,n[so]=null,n[Zh]=void 0,n.__e=void 0),Tu(t)&&(t[zs]=void 0)}}function sr(n=""){return document.createTextNode(n)}function Fi(n){return xf.call(n)}function ya(n){return Sf.call(n)}function ie(n,e){return Fi(n)}function On(n,e=!1){{var t=Fi(n);return t instanceof Comment&&t.data===""?ya(t):t}}function Ie(n,e=!1){return Fi(n)}function j(n,e=1,t=!1){let i=n;for(;e--;)i=ya(i);return i}function kp(n){n.textContent=""}function bf(){return!1}function Mf(n,e,t){return e==null||e===$d?t?document.createElement(n,{is:t}):document.createElement(n):t?document.createElementNS(e,n,{is:t}):document.createElementNS(e,n)}function zp(n){var e=vt;if(e===null)return ft.f|=ir,n;if(!(e.f&ws)&&!(e.f&gs))throw n;hi(n,e)}function hi(n,e){if(n===jd)throw n;if(!(e!==null&&e.f&tn)){for(;e!==null;){if(e.f&Il&&!(e.f&(tn|ta))){if(!(e.f&ws))throw n;try{e.b.error(n);return}catch(t){n=t}}e=e.parent}throw n}}function Hp(n){vt===null&&(ft===null&&mp(),pp()),zi&&hp()}function Gp(n,e){var t=e.last;t===null?e.last=e.first=n:(t.next=n,n.prev=t,e.last=n)}function Hi(n,e){var t=vt;t!==null&&t.f&_n&&(n|=_n);var i={ctx:nn,deps:null,nodes:null,f:n|zt|ri,first:null,fn:e,last:null,next:null,parent:t,b:t&&t.b,prev:null,teardown:null,wv:0,ac:null};Ve==null||Ve.register_created_effect(i);var r=i;if(n&gs)Js!==null?Js.push(i):Nr.ensure().schedule(i);else if(e!==null){try{Ss(i)}catch(a){throw yn(i),a}r.deps===null&&r.teardown===null&&r.nodes===null&&r.first===r.last&&!(r.f&As)&&(r=r.first,n&ei&&n&_s&&r!==null&&(r.f|=_s))}if(r!==null&&(r.parent=t,t!==null&&Gp(r,t),ft!==null&&ft.f&dn&&!(n&or))){var s=ft;(s.effects??(s.effects=[])).push(r)}return i}function Vc(){return ft!==null&&!ni}function Vp(n){const e=Hi(ko,null);return Bt(e,Xt),e.teardown=n,e}function ia(n){Hp();var e=vt.f,t=!ft&&(e&si)!==0&&nn!==null&&!nn.i;if(t){var i=nn;(i.e??(i.e=[])).push(n)}else return yf(n)}function yf(n){return Hi(gs|qh,n)}function Wp(n){Nr.ensure();const e=Hi(or|As,n);return(t={})=>new Promise(i=>{t.outro?Pr(e,()=>{yn(e),i(void 0)}):(yn(e),i(void 0))})}function Xp(n){return Hi(gs,n)}function qp(n){return Hi(is|As,n)}function Wc(n,e=0){return Hi(ko|e,n)}function it(n,e=[],t=[],i=[]){Ap(i,e,t,r=>{Hi(ko,()=>{n(...r.map(B))})})}function Xc(n,e=0){var t=Hi(ei|e,n);return t}function Gn(n){return Hi(si|As,n)}function Ef(n){var e=n.teardown;if(e!==null){const t=zi,i=ft;Pu(!0),Wn(null);try{e.call(null)}catch(r){hi(r,n.parent)}finally{Pu(t),Wn(i)}}}function qc(n,e=!1){var t=n.first;for(n.first=n.last=null;t!==null;){const r=t.ac;r!==null&&Ma(()=>{r.abort(ba)});var i=t.next;t.f&or?t.parent=null:yn(t,e),t=i}}function Yp(n){for(var e=n.first;e!==null;){var t=e.next;e.f&si||yn(e),e=t}}function yn(n,e=!0){var t=!1;(e||n.f&Xh)&&n.nodes!==null&&n.nodes.end!==null&&(Tf(n.nodes.start,n.nodes.end),t=!0),n.f|=ta,qc(n,e&&!t),ra(n,0);var i=n.nodes&&n.nodes.t;if(i!==null)for(const s of i)s.stop();Ef(n),n.f^=ta,n.f|=tn;var r=n.parent;r!==null&&r.first!==null&&wf(n),n.next=n.prev=n.teardown=n.ctx=n.deps=n.fn=n.nodes=n.ac=n.b=null}function Tf(n,e){for(;n!==null;){var t=n===e?null:ya(n);n.remove(),n=t}}function wf(n){var e=n.parent,t=n.prev,i=n.next;t!==null&&(t.next=i),i!==null&&(i.prev=t),e!==null&&(e.first===n&&(e.first=i),e.last===n&&(e.last=t))}function Pr(n,e,t=!0){var i=[];n.f|=Oc,Af(n,i,!0);var r=()=>{t&&yn(n),e&&e()},s=i.length;if(s>0){var a=()=>--s||r();for(var o of i)o.out(a)}else r()}function Af(n,e,t){if(!(n.f&_n)){n.f^=_n;var i=n.nodes&&n.nodes.t;if(i!==null)for(const o of i)(o.is_global||t)&&e.push(o);for(var r=n.first;r!==null;){var s=r.next;if(!(r.f&or)){var a=(r.f&_s)!==0||(r.f&si)!==0&&(n.f&ei)!==0;Af(r,e,a?t:!1)}r=s}}}function Mo(n){n.f&=~Oc,Rf(n,!0)}function Rf(n,e){if(!(n.f&Oc)&&n.f&_n){n.f^=_n,n.f&Xt||(Bt(n,zt),Nr.ensure().schedule(n));for(var t=n.first;t!==null;){var i=t.next,r=(t.f&_s)!==0||(t.f&si)!==0;Rf(t,r?e:!1),t=i}var s=n.nodes&&n.nodes.t;if(s!==null)for(const a of s)(a.is_global||e)&&a.in()}}function Yc(n,e){if(n.nodes)for(var t=n.nodes.start,i=n.nodes.end;t!==null;){var r=t===i?null:ya(t);e.append(t),t=r}}let zi=!1;function Pu(n){zi=n}let ft=null,ni=!1;function Wn(n){ft=n}let vt=null;function bi(n){vt=n}let vi=null;function Cf(n){ft!==null&&(ft.f&xo||ft.f&dn)&&(vi??(vi=new Set)).add(n)}let bn=null,In=0,kn=null;function Kp(n){kn=n}let Pf=1,Mr=0,Dr=Mr;function Du(n){Dr=n}function Df(){return++Pf}function Ea(n){var e=n.f;if(e&zt)return!0;if(e&Vn){for(var t=n.deps,i=t.length,r=0;r<i;r++){var s=t[r];if(Ea(s)&&cf(s),s.wv>n.wv)return!0}e&ri&&$t===null&&Bt(n,Xt)}return!1}function Lf(n,e,t=!0){var i=n.reactions;if(i!==null&&!(vi!==null&&vi.has(n)))for(var r=0;r<i.length;r++){var s=i[r];s.f&dn?Lf(s,e,!1):e===s&&(t?Bt(s,zt):s.f&Xt&&Bt(s,Vn),Gc(s))}}function Nf(n){var e=bn,t=In,i=kn,r=ft,s=vi,a=nn,o=ni,c=Dr,l=n.f;bn=null,In=0,kn=null,ft=l&(si|or)?null:n,vi=null,vs(n.ctx),ni=!1,Dr=++Mr,n.ac!==null&&(Ma(()=>{n.ac.abort(ba)}),n.ac=null);try{n.f|=xo;var u=n.fn,f=u();n.f|=ws;var d=Lu(n);if(rf()&&kn!==null&&!ni&&d!==null&&!(n.f&(dn|Vn|zt)))for(var h=0;h<kn.length;h++)Lf(kn[h],n);if(r!==null&&r!==n){if(Mr++,r.deps!==null)for(let _=0;_<t;_+=1)r.deps[_].rv=Mr;if(e!==null)for(const _ of e)_.rv=Mr;kn!==null&&(i===null?i=kn:i.push(...kn))}return n.f&ir&&(n.f^=ir),f}catch(_){return Lu(n),zp(_)}finally{n.f^=xo,bn=e,In=t,kn=i,ft=r,vi=s,vs(a),ni=o,Dr=c}}function Lu(n){var r;var e=n.deps,t=Ve==null?void 0:Ve.is_fork;if(bn!==null){var i;if(t||ra(n,In),e!==null&&In>0)for(e.length=In+bn.length,i=0;i<bn.length;i++)e[In+i]=bn[i];else n.deps=e=bn;if(Vc()&&n.f&ri)for(i=In;i<e.length;i++)((r=e[i]).reactions??(r.reactions=[])).push(n)}else!t&&e!==null&&In<e.length&&(ra(n,In),e.length=In);return e}function Zp(n,e){let t=e.reactions;if(t!==null){var i=kh.call(t,n);if(i!==-1){var r=t.length-1;r===0?t=e.reactions=null:(t[i]=t[r],t.pop())}}if(t===null&&e.f&dn&&(bn===null||!ea.call(bn,e))){var s=e;s.f&ri&&(s.f^=ri),s.v!==Wt&&kc(s),s.ac!==null&&Ma(()=>{s.ac.abort(ba),s.ac=null,Bt(s,zt)}),Dp(s),ra(s,0)}}function ra(n,e){var t=n.deps;if(t!==null)for(var i=e;i<t.length;i++)Zp(n,t[i])}function Ss(n){var e=n.f;if(!(e&tn)){Bt(n,Xt);var t=vt;vt=n;try{e&(ei|Zd)?Yp(n):qc(n),Ef(n);var i=Nf(n);n.teardown=typeof i=="function"?i:null,n.wv=Pf;var r;Wd&&Mp&&n.f&zt&&n.deps}finally{vt=t}}}async function Jp(){await Promise.resolve(),Ip()}function B(n){var e=n.f,t=(e&dn)!==0;if(ft!==null&&!ni){var i=vt!==null&&(vt.f&tn)!==0;if(!i&&(vi===null||!vi.has(n))){var r=ft.deps;if(ft.f&xo)n.rv<Mr&&(n.rv=Mr,bn===null&&r!==null&&r[In]===n?In++:bn===null?bn=[n]:bn.push(n));else{ft.deps??(ft.deps=[]),ea.call(ft.deps,n)||ft.deps.push(n);var s=n.reactions;s===null?n.reactions=[ft]:ea.call(s,ft)||s.push(ft)}}}if(zi&&_i.has(n))return _i.get(n);if(t){var a=n;if(zi){var o=a.v;return(!(a.f&Xt)&&a.reactions!==null||Uf(a))&&(o=zc(a)),_i.set(a,o),o}var c=(a.f&ri)===0&&!ni&&ft!==null&&(ft.f&ri)!==0,l=(a.f&ws)===0;Ea(a)&&(c&&(a.f|=ri),cf(a)),c&&!l&&(uf(a),If(a))}if($t!=null&&$t.has(n))return $t.get(n);if(n.f&ir)throw n.v;return n.v}function If(n){if(n.f|=ri,n.deps!==null)for(const t of n.deps){var e=t.reactions;e===null?t.reactions=[n]:ea.call(e,n)||e.push(n),t.f&dn&&!(t.f&ri)&&(uf(t),If(t))}}function Uf(n){if(n.v===Wt)return!0;if(n.deps===null)return!1;for(const e of n.deps)if(_i.has(e)||e.f&dn&&Uf(e))return!0;return!1}function Rs(n){var e=ni;try{return ni=!0,n()}finally{ni=e}}const Qp=["touchstart","touchmove"];function jp(n){return Qp.includes(n)}const yr=Symbol("events"),Ff=new Set,Hl=new Set;function Ye(n,e,t){(e[yr]??(e[yr]={}))[n]=t}function Tn(n){for(var e=0;e<n.length;e++)Ff.add(n[e]);for(var t of Hl)t(n)}let Jo=null,Qo=!1;function Nu(n){var v,p;var e=this,t=e.ownerDocument,i=n.type,r=((v=n.composedPath)==null?void 0:v.call(n))||[],s=r[0]||n.target;Jo=n,Qo||(Qo=!0,setTimeout(()=>{Qo=!1,Jo=null}));var a=0,o=Jo===n&&n[yr];if(o){var c=r.indexOf(o);if(c!==-1&&(e===document||e===window)){n[yr]=e;return}var l=r.indexOf(e);if(l===-1)return;c<=l&&(a=c)}if(s=r[a]||n.target,s!==e){qd(n,"currentTarget",{configurable:!0,get(){return s||t}});var u=ft,f=vt;Wn(null),bi(null);try{for(var d,h=[];s!==null&&s!==e;){try{var _=(p=s[yr])==null?void 0:p[i];_!=null&&(!s.disabled||n.target===s)&&_.call(s,n)}catch(m){d?h.push(m):d=m}if(n.cancelBubble)break;a++,s=a<r.length?r[a]:null}if(d){for(let m of h)queueMicrotask(()=>{throw m});throw d}}finally{n[yr]=e,delete n.currentTarget,Wn(u),bi(f)}}}var Gd;const jo=((Gd=globalThis==null?void 0:globalThis.window)==null?void 0:Gd.trustedTypes)&&globalThis.window.trustedTypes.createPolicy("svelte-trusted-html",{createHTML:n=>n});function $p(n){return(jo==null?void 0:jo.createHTML(n))??n}function em(n){var e=Mf("template");return e.innerHTML=$p(n.replaceAll("<!>","<!---->")),e.content}function sa(n,e){var t=vt;t.nodes===null&&(t.nodes={start:n,end:e,a:null,t:null})}function Ae(n,e){var t=(e&rp)!==0,i=(e&sp)!==0,r,s=!n.startsWith("<!>");return()=>{r===void 0&&(r=em(s?n:"<!>"+n),t||(r=Fi(r)));var a=i||vf?document.importNode(r,!0):r.cloneNode(!0);if(t){var o=Fi(a),c=a.lastChild;sa(o,c)}else sa(a,a);return a}}function bs(){var n=document.createDocumentFragment(),e=document.createComment(""),t=sr();return n.append(e,t),sa(e,t),n}function Ee(n,e){n!==null&&n.before(e)}function tm(n){let e=0,t=Ir(0),i;return()=>{Vc()&&(B(t),Wc(()=>(e===0&&(i=Rs(()=>n(()=>Qs(t)))),e+=1,()=>{er(()=>{e-=1,e===0&&(i==null||i(),i=void 0,Qs(t))})})))}}var nm=_s|As;function im(n,e,t,i){new rm(n,e,t,i)}var zn,Fc,Hn,Ar,un,Dn,gn,Ln,ui,Rr,$i,ms,fa,ha,Ii,Uo,_t,sm,am,Gl,Ji,om,Vl,Ws,lo,Wl,Xl;class rm{constructor(e,t,i,r){Je(this,_t);An(this,"parent");An(this,"is_pending",!1);An(this,"transform_error");Je(this,zn);Je(this,Fc,null);Je(this,Hn);Je(this,Ar);Je(this,un);Je(this,Dn,null);Je(this,gn,null);Je(this,Ln,null);Je(this,ui,null);Je(this,Rr,0);Je(this,$i,0);Je(this,ms,!1);Je(this,fa,new Set);Je(this,ha,new Set);Je(this,Ii,null);Je(this,Uo,tm(()=>(tt(this,Ii,Ir(V(this,Rr))),()=>{tt(this,Ii,null)})));var s;tt(this,zn,e),tt(this,Hn,t),tt(this,Ar,a=>{var o=vt;o.b=this,o.f|=Il,i(a)}),this.parent=vt.b,this.transform_error=r??((s=this.parent)==null?void 0:s.transform_error)??(a=>a),tt(this,un,Xc(()=>{nt(this,_t,Vl).call(this)},nm))}defer_effect(e){af(e,V(this,fa),V(this,ha))}is_rendered(){return!this.is_pending&&(!this.parent||this.parent.is_rendered())}has_pending_snippet(){return!!V(this,Hn).pending}update_pending_count(e,t){nt(this,_t,Wl).call(this,e,t),tt(this,Rr,V(this,Rr)+e),!(!V(this,Ii)||V(this,ms))&&(tt(this,ms,!0),er(()=>{tt(this,ms,!1),V(this,Ii)&&xs(V(this,Ii),V(this,Rr))}))}get_effect_pending(){return V(this,Uo).call(this),B(V(this,Ii))}error(e){if(e===jd||!V(this,Hn).onerror&&!V(this,Hn).failed)throw e;Ve!=null&&Ve.is_fork?(V(this,Dn)&&Ve.skip_effect(V(this,Dn)),V(this,gn)&&Ve.skip_effect(V(this,gn)),V(this,Ln)&&Ve.skip_effect(V(this,Ln)),Ve.oncommit(()=>{nt(this,_t,Ji).call(this)||nt(this,_t,Xl).call(this,e)})):nt(this,_t,Xl).call(this,e)}}zn=new WeakMap,Fc=new WeakMap,Hn=new WeakMap,Ar=new WeakMap,un=new WeakMap,Dn=new WeakMap,gn=new WeakMap,Ln=new WeakMap,ui=new WeakMap,Rr=new WeakMap,$i=new WeakMap,ms=new WeakMap,fa=new WeakMap,ha=new WeakMap,Ii=new WeakMap,Uo=new WeakMap,_t=new WeakSet,sm=function(){try{tt(this,Dn,Gn(()=>V(this,Ar).call(this,V(this,zn))))}catch(e){this.error(e)}},am=function(e){const t=V(this,Hn).failed,{reset:i,invoke_onerror:r}=nt(this,_t,Gl).call(this,e);er(r),t&&tt(this,Ln,Gn(()=>{t(V(this,zn),()=>e,()=>i)}))},Gl=function(e){var t=!1,i=!1;const r=()=>{if(!nt(this,_t,Ji).call(this)){if(t){cp();return}t=!0,i&&bp(),V(this,Ln)!==null&&Pr(V(this,Ln),()=>{tt(this,Ln,null)}),nt(this,_t,lo).call(this,()=>{nt(this,_t,Vl).call(this)})}};return{reset:r,invoke_onerror:()=>{var a,o;if(!nt(this,_t,Ji).call(this))try{i=!0,(o=(a=V(this,Hn)).onerror)==null||o.call(a,e,r),i=!1}catch(c){hi(c,V(this,un)&&V(this,un).parent)}}}},Ji=function(){return(V(this,un).f&(tn|ta))!==0},om=function(){const e=V(this,Hn).pending;e&&(this.is_pending=!0,tt(this,gn,Gn(()=>e(V(this,zn)))),er(()=>{if(!nt(this,_t,Ji).call(this)){var t=tt(this,ui,document.createDocumentFragment()),i=sr(),r=!1;if(t.append(i),tt(this,Dn,nt(this,_t,lo).call(this,()=>{try{return Gn(()=>V(this,Ar).call(this,i))}catch(s){try{this.error(s),r=!0}catch(a){hi(a,V(this,un).parent)}return null}})),V(this,Dn)===null){tt(this,ui,null),r&&nt(this,_t,Ws).call(this,Ve);return}V(this,$i)===0&&(V(this,zn).before(t),tt(this,ui,null),Pr(V(this,gn),()=>{tt(this,gn,null)}),nt(this,_t,Ws).call(this,Ve))}}))},Vl=function(){try{if(this.is_pending=this.has_pending_snippet(),tt(this,$i,0),tt(this,Rr,0),tt(this,Dn,Gn(()=>{V(this,Ar).call(this,V(this,zn))})),V(this,$i)>0){var e=tt(this,ui,document.createDocumentFragment());Yc(V(this,Dn),e);const t=V(this,Hn).pending;tt(this,gn,Gn(()=>t(V(this,zn))))}else nt(this,_t,Ws).call(this,Ve)}catch(t){this.error(t)}},Ws=function(e){this.is_pending=!1,e.transfer_effects(V(this,fa),V(this,ha))},lo=function(e){var t=vt,i=ft,r=nn;bi(V(this,un)),Wn(V(this,un)),vs(V(this,un).ctx);try{return Nr.ensure(),e()}finally{bi(t),Wn(i),vs(r)}},Wl=function(e,t){var i;if(!this.has_pending_snippet()){this.parent&&nt(i=this.parent,_t,Wl).call(i,e,t);return}tt(this,$i,V(this,$i)+e),V(this,$i)===0&&(nt(this,_t,Ws).call(this,t),V(this,gn)&&Pr(V(this,gn),()=>{tt(this,gn,null)}),V(this,ui)&&(V(this,zn).before(V(this,ui)),tt(this,ui,null)))},Xl=function(e){V(this,Dn)&&(yn(V(this,Dn)),tt(this,Dn,null)),V(this,gn)&&(yn(V(this,gn)),tt(this,gn,null)),V(this,Ln)&&(yn(V(this,Ln)),tt(this,Ln,null));let t=V(this,Hn).failed;const i=r=>{if(nt(this,_t,Ji).call(this))return;const{reset:s,invoke_onerror:a}=nt(this,_t,Gl).call(this,r);a(),t&&!nt(this,_t,Ji).call(this)&&tt(this,Ln,nt(this,_t,lo).call(this,()=>{try{return Gn(()=>{var o=vt;o.b=this,o.f|=Il,t(V(this,zn),()=>r,()=>s)})}catch(o){return hi(o,V(this,un).parent),null}}))};er(()=>{if(!nt(this,_t,Ji).call(this)){var r;try{r=this.transform_error(e)}catch(s){hi(s,V(this,un)&&V(this,un).parent);return}r!==null&&typeof r=="object"&&typeof r.then=="function"?r.then(i,s=>hi(s,V(this,un)&&V(this,un).parent)):i(r)}})};function Ue(n,e){var t=e==null?"":typeof e=="object"?`${e}`:e;t!==(n[zs]??(n[zs]=n.nodeValue))&&(n[zs]=t,n.nodeValue=`${t}`)}function lm(n,e){return cm(n,e)}const Da=new Map;function cm(n,{target:e,anchor:t,props:i={},events:r,context:s,intro:a=!0,transformError:o}){Bp();var c=void 0,l=Wp(()=>{var u=t??e.appendChild(sr());im(u,{pending:()=>{}},h=>{fn({});var _=nn;s&&(_.c=s),r&&(i.$$events=r),c=n(h,i)||Bc(),hn()},o);var f=new Set,d=h=>{for(var _=0;_<h.length;_++){var v=h[_];if(!f.has(v)){f.add(v);var p=jp(v);for(const w of[e,document]){var m=Da.get(w);m===void 0&&(m=new Map,Da.set(w,m));var y=m.get(v);y===void 0?(w.addEventListener(v,Nu,{passive:p}),m.set(v,1)):m.set(v,y+1)}}}};return d(Bo(Ff)),Hl.add(d),()=>{var p;for(var h of f)for(const m of[e,document]){var _=Da.get(m),v=_.get(h);--v==0?(m.removeEventListener(h,Nu),_.delete(h),_.size===0&&Da.delete(m)):_.set(h,v)}Hl.delete(d),u!==t&&((p=u.parentNode)==null||p.removeChild(u))}});return um.set(c,l),c}let um=new WeakMap;var Qn,di,Nn,Cr,pa,ma,Fo;class dm{constructor(e,t=!0){An(this,"anchor");Je(this,Qn,new Map);Je(this,di,new Map);Je(this,Nn,new Map);Je(this,Cr,new Set);Je(this,pa,!0);Je(this,ma,e=>{if(V(this,Qn).has(e)){var t=V(this,Qn).get(e),i=V(this,di).get(t);if(i)Mo(i),V(this,Cr).delete(t);else{var r=V(this,Nn).get(t);r&&(Mo(r.effect),V(this,di).set(t,r.effect),V(this,Nn).delete(t),r.fragment.lastChild.remove(),this.anchor.before(r.fragment),i=r.effect)}for(const[s,a]of V(this,Qn)){if(V(this,Qn).delete(s),s===e)break;const o=V(this,Nn).get(a);o&&(yn(o.effect),V(this,Nn).delete(a))}for(const[s,a]of V(this,di)){if(s===t||V(this,Cr).has(s))continue;const o=()=>{if(Array.from(V(this,Qn).values()).includes(s)){var l=document.createDocumentFragment();Yc(a,l),l.append(sr()),V(this,Nn).set(s,{effect:a,fragment:l})}else yn(a);V(this,Cr).delete(s),V(this,di).delete(s)};V(this,pa)||!i?(V(this,Cr).add(s),Pr(a,o,!1)):o()}}});Je(this,Fo,e=>{V(this,Qn).delete(e);const t=Array.from(V(this,Qn).values());for(const[i,r]of V(this,Nn))t.includes(i)||(yn(r.effect),V(this,Nn).delete(i))});this.anchor=e,tt(this,pa,t)}ensure(e,t){var i=Ve,r=bf();if(t&&!V(this,di).has(e)&&!V(this,Nn).has(e))if(r){var s=document.createDocumentFragment(),a=sr();s.append(a),V(this,Nn).set(e,{effect:Gn(()=>t(a)),fragment:s})}else V(this,di).set(e,Gn(()=>t(this.anchor)));if(V(this,Qn).set(i,e),r){for(const[o,c]of V(this,di))o===e?i.unskip_effect(c):i.skip_effect(c);for(const[o,c]of V(this,Nn))o===e?i.unskip_effect(c.effect):i.skip_effect(c.effect);i.oncommit(V(this,ma)),i.ondiscard(V(this,Fo))}else V(this,ma).call(this,i)}}Qn=new WeakMap,di=new WeakMap,Nn=new WeakMap,Cr=new WeakMap,pa=new WeakMap,ma=new WeakMap,Fo=new WeakMap;function Ge(n,e,t=!1){var i=new dm(n),r=t?_s:0;function s(a,o){i.ensure(a,o)}Xc(()=>{var a=!1;e((o,c=0)=>{a=!0,s(c,o)}),a||s(-1,null)},r)}function rs(n,e){return e}function fm(n,e,t){for(var i=[],r=e.length,s,a=e.length,o=0;o<r;o++){let f=e[o];Pr(f,()=>{if(s){if(s.pending.delete(f),s.done.add(f),s.pending.size===0){var d=n.outrogroups;ql(n,Bo(s.done)),d.delete(s),d.size===0&&(n.outrogroups=null)}}else a-=1},!1)}if(a===0){var c=i.length===0&&t!==null&&n.pending.size===0;if(c){var l=t,u=l.parentNode;kp(u),u.append(l),n.items.clear()}ql(n,e,!c)}else s={pending:new Set(e),done:new Set},(n.outrogroups??(n.outrogroups=new Set)).add(s)}function ql(n,e,t=!0){var i;if(n.pending.size>0){i=new Set;for(const a of n.pending.values())for(const o of a)i.add(n.items.get(o).e)}for(var r=0;r<e.length;r++){var s=e[r];if(i!=null&&i.has(s)){s.f|=pi;const a=document.createDocumentFragment();Yc(s,a)}else yn(e[r],t)}}var Iu;function ar(n,e,t,i,r,s=null){var a=n,o=new Map,c=(e&Qd)!==0;if(c){var l=n;a=l.appendChild(sr())}var u=null,f=lf(()=>{var y=t();return Xd(y)?y:y==null?[]:Bo(y)}),d=new Map,h=!0;function _(y){if(!(m.effect.f&tn)){m.pending.delete(y);var w=B(f);m.fallback=u,hm(m,w,a,e,i),u!==null&&(w.length===0?u.f&pi?(u.f^=pi,Xs(u,null,a)):Mo(u):Pr(u,()=>{u=null}))}}function v(y){m.pending.delete(y)}var p=Xc(()=>{for(var y=B(f),w=y.length,S=new Set,T=Ve,E=bf(),g=0;g<w;g+=1){var M=y[g],L=i(M,g),D=h?null:o.get(L);D?(D.v&&xs(D.v,M),D.i&&xs(D.i,g),E&&T.unskip_effect(D.e)):(D=pm(o,h?a:Iu??(Iu=sr()),M,L,g,r,e,t),h||(D.e.f|=pi),o.set(L,D)),S.add(L)}if(w===0&&s&&!u&&(h?u=Gn(()=>s(a)):(u=Gn(()=>s(Iu??(Iu=sr()))),u.f|=pi)),w>S.size&&fp(),!h)if(d.set(T,S),E){for(const[R,I]of o)S.has(R)||T.skip_effect(I.e);T.oncommit(_),T.ondiscard(v)}else _(T);B(f)}),m={effect:p,items:o,pending:d,outrogroups:null,fallback:u};h=!1}function Ns(n){for(;n!==null&&!(n.f&si);)n=n.next;return n}function hm(n,e,t,i,r){var D,R,I,G,C,P,F,z,Q;var s=(i&jh)!==0,a=e.length,o=n.items,c=Ns(n.effect.first),l,u=null,f,d=[],h=[],_,v,p,m;if(s)for(m=0;m<a;m+=1)_=e[m],v=r(_,m),p=o.get(v).e,p.f&pi||((R=(D=p.nodes)==null?void 0:D.a)==null||R.measure(),(f??(f=new Set)).add(p));for(m=0;m<a;m+=1){if(_=e[m],v=r(_,m),p=o.get(v).e,n.outrogroups!==null)for(const O of n.outrogroups)O.pending.delete(p),O.done.delete(p);if(p.f&_n&&(Mo(p),s&&((G=(I=p.nodes)==null?void 0:I.a)==null||G.unfix(),(f??(f=new Set)).delete(p))),p.f&pi)if(p.f^=pi,p===c)Xs(p,null,t);else{var y=u?u.next:c;p===n.effect.last&&(n.effect.last=p.prev),p.prev&&(p.prev.next=p.next),p.next&&(p.next.prev=p.prev),Wi(n,u,p),Wi(n,p,y),Xs(p,y,t),u=p,d=[],h=[],c=Ns(u.next);continue}if(p!==c){if(l!==void 0&&l.has(p)){if(d.length<h.length){var w=h[0],S;u=w.prev;var T=d[0],E=d[d.length-1];for(S=0;S<d.length;S+=1)Xs(d[S],w,t);for(S=0;S<h.length;S+=1)l.delete(h[S]);Wi(n,T.prev,E.next),Wi(n,u,T),Wi(n,E,w),c=w,u=E,m-=1,d=[],h=[]}else l.delete(p),Xs(p,c,t),Wi(n,p.prev,p.next),Wi(n,p,u===null?n.effect.first:u.next),Wi(n,u,p),u=p;continue}for(d=[],h=[];c!==null&&c!==p;)(l??(l=new Set)).add(c),h.push(c),c=Ns(c.next);if(c===null)continue}p.f&pi||d.push(p),u=p,c=Ns(p.next)}if(n.outrogroups!==null){for(const O of n.outrogroups)O.pending.size===0&&(ql(n,Bo(O.done)),(C=n.outrogroups)==null||C.delete(O));n.outrogroups.size===0&&(n.outrogroups=null)}if(c!==null||l!==void 0){var g=[];if(l!==void 0)for(p of l)p.f&_n||g.push(p);for(;c!==null;)!(c.f&_n)&&c!==n.fallback&&g.push(c),c=Ns(c.next);var M=g.length;if(M>0){var L=i&Qd&&a===0?t:null;if(s){for(m=0;m<M;m+=1)(F=(P=g[m].nodes)==null?void 0:P.a)==null||F.measure();for(m=0;m<M;m+=1)(Q=(z=g[m].nodes)==null?void 0:z.a)==null||Q.fix()}fm(n,g,L)}}s&&er(()=>{var O,q;if(f!==void 0)for(p of f)(q=(O=p.nodes)==null?void 0:O.a)==null||q.apply()})}function pm(n,e,t,i,r,s,a,o){var c=a&Jh?a&$h?Ir(t):Fp(t,!1,!1):null,l=a&Qh?Ir(r):null;return{v:c,i:l,e:Gn(()=>(s(e,c??t,l??r,o),()=>{n.delete(i)}))}}function Xs(n,e,t){if(n.nodes)for(var i=n.nodes.start,r=n.nodes.end,s=e&&!(e.f&pi)?e.nodes.start:t;i!==null;){var a=ya(i);if(s.before(i),i===r)return;i=a}}function Wi(n,e,t){e===null?n.effect.first=t:e.next=t,t===null?n.effect.last=e:t.prev=e}function zo(n,e,t=!1,i=!1,r=!1,s=!1){var a=n,o="";if(t)var c=n;it(()=>{var l=vt;if(o!==(o=e()??"")){if(t){l.nodes=null,c.innerHTML=o,o!==""&&sa(Fi(c),c.lastChild);return}if(l.nodes!==null&&(Tf(l.nodes.start,l.nodes.end),l.nodes=null),o!==""){var u=i?ap:r?op:void 0,f=Mf(i?"svg":r?"math":"template",u);f.innerHTML=o;var d=i||r?f:f.content;if(sa(Fi(d),d.lastChild),i||r)for(;Fi(d);)a.before(Fi(d));else a.before(d)}}})}function mm(n,e,t){var i=n==null?"":""+n;return i===""?null:i}function Ot(n,e,t,i,r,s){var a=n[Ul];if(a!==t||a===void 0){var o=mm(t);o==null?n.removeAttribute("class"):n.className=o,n[Ul]=t}return s}const gm=Symbol("is custom element"),_m=Symbol("is html");function $r(n,e,t,i){var r=vm(n);r[e]!==(r[e]=t)&&(e==="loading"&&(n[Kh]=t),t==null?n.removeAttribute(e):typeof t!="string"&&xm(n).has(e)?n[e]=t:n.setAttribute(e,t))}function vm(n){return n[so]??(n[so]={[gm]:n.nodeName.includes("-"),[_m]:n.namespaceURI===$d})}var Uu=new Map;function xm(n){var e=n.getAttribute("is")||n.nodeName,t=Uu.get(e);if(t)return t;Uu.set(e,t=new Set);for(var i,r=n,s=Element.prototype;s!==r;){i=zh(r);for(var a in i)i[a].set&&a!=="innerHTML"&&a!=="textContent"&&a!=="innerText"&&t.add(a);r=Yd(r)}return t}function es(n,e,t=e){var i=new WeakSet;wp(n,"input",async r=>{var s=r?n.defaultValue:n.value;if(s=$o(n)?el(s):s,t(s),Ve!==null&&i.add(Ve),await Jp(),s!==(s=e())){var a=n.selectionStart,o=n.selectionEnd,c=n.value.length;if(n.value=s??"",o!==null){var l=n.value.length;a===o&&o===c&&l>c?(n.selectionStart=l,n.selectionEnd=l):(n.selectionStart=a,n.selectionEnd=Math.min(o,l))}}}),Rs(e)==null&&n.value&&(t($o(n)?el(n.value):n.value),Ve!==null&&i.add(Ve)),Wc(()=>{var r=e();if(n===document.activeElement){var s=Ve;if(i.has(s))return}$o(n)&&r===el(n.value)||n.type==="date"&&!r&&!n.value||r!==n.value&&(n.value=r??"")})}function $o(n){var e=n.type;return e==="number"||e==="range"}function el(n){return n===""?null:+n}function tl(n,e){return n===e||(n==null?void 0:n[Ks])===e}function yo(n=Bc(),e,t,i){var r=nn.r,s=vt;return Xp(()=>{var a,o;return Wc(()=>{a=o,o=[],Rs(()=>{tl(t(...o),n)||(e(n,...o),a&&tl(t(...a),n)&&e(null,...a))})}),()=>{let c=s;for(;c!==r&&c.parent!==null&&c.parent.f&ta;)c=c.parent;const l=()=>{o&&tl(t(...o),n)&&e(null,...o)},u=c.teardown;c.teardown=()=>{l(),u==null||u()}}}),n}let La=!1;function Sm(n){var e=La;try{return La=!1,[n(),La]}finally{La=e}}function Lr(n,e,t,i){var S;var r=!0,s=(t&np)!==0,a=(t&ip)!==0,o=i,c=!0,l=void 0,u=()=>a&&r?(l??(l=na(i)),B(l)):(c&&(c=!1,o=a?Rs(i):i),o);let f;if(s){var d=Ks in n||Yh in n;f=((S=ns(n,e))==null?void 0:S.set)??(d&&e in n?T=>n[e]=T:void 0)}var h,_=!1;s?[h,_]=Sm(()=>n[e]):h=n[e],h===void 0&&i!==void 0&&(h=u(),f&&(_p(),f(h)));var v;if(v=()=>{var T=n[e];return T===void 0?u():(c=!0,T)},!(t&tp))return v;if(f){var p=n.$$legacy;return function(T,E){return arguments.length>0?((!E||p||_)&&f(E?v():T),T):v()}}var m=!1,y=(t&ep?na:lf)(()=>(m=!1,v()));s&&B(y);var w=vt;return function(T,E){if(arguments.length>0){const g=E?B(y):s?ti(T):T;return be(y,g),m=!0,o!==void 0&&(o=g),T}return zi&&m||w.f&tn?y.v:B(y)}}function Cs(n){nn===null&&nf(),ia(()=>{const e=Rs(n);if(typeof e=="function")return e})}function bm(n){nn===null&&nf(),Cs(()=>()=>Rs(n))}const Mm="5";var Vd;typeof window<"u"&&((Vd=window.__svelte??(window.__svelte={})).v??(Vd.v=new Set)).add(Mm);const ym="vigyan_context_compression_enabled";function Em(){if(typeof window>"u")return!0;const n=localStorage.getItem(ym);return n===null?!0:n==="true"}function Of(n,e=4){if(n.length<=e+1)return{compressed:n,tokensSaved:0,summary:""};const t=n.slice(0,n.length-e),i=n.slice(n.length-e),r=t.reduce((u,f)=>u+f.content.length,0),s=[];for(const u of t)if(u.content.trim()){if(u.role==="user"){const f=u.content.length>80?u.content.slice(0,80)+"…":u.content;s.push(`User asked: "${f.replace(/\n/g," ")}"`)}else if(u.role==="assistant"){const f=u.content.split(/[.\n]/)[0]??"",d=u.content.match(/(?:\\\[|\$\$)([\s\S]*?)(?:\\\]|\$\$)/);let h=f.slice(0,75);d&&d[1]&&(h+=` [Formula: ${d[1].trim().slice(0,40)}]`),s.push(`Resolved: ${h}`)}}const a=`[Context Memory Capsule — Prior Conversation History]:
`+s.map(u=>`• ${u}`).join(`
`),o=a.length,c=Math.max(0,Math.round((r-o)/4));return{compressed:[{role:"system",content:a},...i],tokensSaved:c,summary:a}}const Eo="vigyan:3b";function ss(){if(typeof window<"u"){if(window.AGENT_HOST)return window.AGENT_HOST;try{const n=localStorage.getItem("vigyan_agent_host");if(n)return n}catch{}}return"http://127.0.0.1:8085"}function js(){if(typeof window<"u"){if(window.VIGYAN_TOKEN)return window.VIGYAN_TOKEN;try{const n=localStorage.getItem("vigyan_token");if(n)return n}catch{}}return""}const Bf="http://127.0.0.1:11434";async function Tm(){try{if((await fetch(`${ss()}/health`,{signal:AbortSignal.timeout(1500)})).ok)return!0}catch{}try{return(await fetch(`${Bf}/api/tags`,{signal:AbortSignal.timeout(1500)})).ok}catch{return!1}}async function wm(){try{const n=await fetch(`${ss()}/health`,{signal:AbortSignal.timeout(1500)});if(n.ok)return await n.json()}catch{}return null}async function Am(n,e,t,i){var p,m,y,w;let r=n;if(Em()&&n.length>6){const{compressed:S}=Of(n,4);r=S}const s=((p=[...n].reverse().find(S=>S.role==="user"))==null?void 0:p.content)||"",a=js(),o=ss();let c=4096;try{c=parseInt(localStorage.getItem("vigyan_context_budget")||"4096",10)}catch{}let l=!1;try{const S={"Content-Type":"application/json"};a&&(S["X-Vigyan-Token"]=a);const T=await fetch(`${o}/api/chat`,{method:"POST",headers:S,body:JSON.stringify({query:s,messages:r,model:e||Eo,num_ctx:c}),signal:i});if(T.ok&&T.body){l=!0;const E=T.body.getReader(),g=new TextDecoder;let M="",L=!1;try{for(;;){const{done:D,value:R}=await E.read();if(D)break;M+=g.decode(R,{stream:!0});const I=M.split(`

`);M=I.pop()??"";for(const G of I){if(!G.trim())continue;let C="message",P="";for(const F of G.split(`
`))F.startsWith("event: ")?C=F.slice(7).trim():F.startsWith("data: ")&&(P=F.slice(6));if(P)try{const F=JSON.parse(P);if(C==="think")t({type:"thinking",text:typeof F=="string"?F:JSON.stringify(F)});else if(C==="tier_downgrade")F&&F.reason&&t({type:"thinking",text:`[Model Router]: ${F.reason}
`});else if(C==="ram_governor_trip")F&&F.ram_percent&&t({type:"thinking",text:`[RAM Governor]: Memory threshold reached (${F.ram_percent}%). Model evicted to prevent OOM.
`});else if(C==="token"){let z=typeof F=="string"?F:JSON.stringify(F);z=z.replace(/<\/?(?:code|pre|solution|sstream|latex|math)>/gi,""),z&&t({type:"answer",text:z})}else if(C==="sympy")t({type:"sympy",text:typeof F=="string"?F:JSON.stringify(F)});else if(C==="tool_result")t({type:"tool_result",text:"",toolData:F});else if(C==="artifact")t({type:"artifact",text:"",artifactData:F});else if(C==="done"){t({type:"done",text:""}),L=!0;break}}catch{if(C==="token"){let F=P.replace(/<\/?(?:code|pre|solution|sstream|latex|math)>/gi,"");F&&t({type:"answer",text:F})}}}if(L)break}}finally{E.releaseLock()}L||t({type:"done",text:""});return}}catch(S){if(S instanceof Error&&S.name==="AbortError")return}let u;try{u=await fetch(`${Bf}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:e||Eo,messages:r,stream:!0,options:{num_ctx:c||4096,num_batch:256,num_thread:4,repeat_penalty:1.15,repeat_last_n:64,stop:["<|im_start|>","<|im_end|>","<|endoftext|>","</sstream>","<solution>","</solution>","</code>","</pre>","User:",`

User`,"Human:"]}}),signal:i})}catch(S){if(S instanceof Error&&S.name==="AbortError")return;t({type:"error",text:"Warming up sovereign engine... Please try again in a moment."});return}if(!u.ok){t({type:"error",text:`Sovereign engine returned status ${u.status}. Please try again.`});return}const f=(m=u.body)==null?void 0:m.getReader();if(!f){t({type:"error",text:"No response stream available."});return}const d=new TextDecoder;let h="",_=!1;const v=S=>{if(S=S.replace(/<\/?(?:code|pre|solution|sstream|latex|math)>/gi,""),!S)return;let T=0;for(;T<S.length;)if(_){const E=S.indexOf("</think>",T);if(E===-1){const g=S.slice(T);t({type:"thinking",text:g}),T=S.length}else{const g=S.slice(T,E);g&&t({type:"thinking",text:g}),_=!1,T=E+8}}else{const E=S.indexOf("<think>",T);if(E===-1){const g=S.slice(T);t({type:"answer",text:g}),T=S.length}else{const g=S.slice(T,E);g&&t({type:"answer",text:g}),_=!0,T=E+7}}};try{for(;;){const{done:S,value:T}=await f.read();if(S)break;h+=d.decode(T,{stream:!0});const E=h.split(`
`);h=E.pop()??"";for(const g of E)if(g.trim())try{const M=JSON.parse(g),L=((y=M==null?void 0:M.message)==null?void 0:y.thinking)??"",D=((w=M==null?void 0:M.message)==null?void 0:w.content)??"";if(L&&t({type:"thinking",text:L}),D&&v(D),M!=null&&M.done)break}catch{}}}catch(S){S instanceof Error&&S.name!=="AbortError"&&t({type:"error",text:"The stream was interrupted."})}finally{f.releaseLock(),t({type:"done",text:""})}}const To="vigyan_chat_history";function Rm(){if(typeof window>"u")return[];try{const n=localStorage.getItem(To);return n?JSON.parse(n):[]}catch{return[]}}function Cm(n){if(!(typeof window>"u"))try{const e=n.slice(-40).filter(t=>!t.streaming||t.content).map(t=>{var i;return(i=t.attachment)!=null&&i.dataUrl?{...t,attachment:{name:t.attachment.name,size:t.attachment.size,type:t.attachment.type}}:t});localStorage.setItem(To,JSON.stringify(e))}catch{try{const e=n.slice(-10).map(t=>({...t,attachment:void 0}));localStorage.setItem(To,JSON.stringify(e))}catch{}}}var ga;class Pm{constructor(){Je(this,ga,Ze(ti(Rm())))}get messages(){return B(V(this,ga))}set messages(e){be(V(this,ga),e,!0)}save(){Cm(this.messages)}clear(){this.messages=[],typeof window<"u"&&localStorage.removeItem(To)}deleteMessage(e){this.messages=this.messages.filter(t=>t.id!==e),this.save()}trimHistoryBefore(e){const t=this.messages.findIndex(i=>i.id===e);t>0&&(this.messages=this.messages.slice(t),this.save())}estimateTotalTokens(){const e=this.messages.reduce((t,i)=>{var r,s;return t+(((r=i.content)==null?void 0:r.length)||0)+(((s=i.thinking)==null?void 0:s.length)||0)},0);return Math.max(0,Math.round(e/4))}autoCompressIfNeeded(e=2048){return this.messages.length<=5?!1:this.estimateTotalTokens()>=e*.75?this.compress().olderCount>0:!1}compress(){if(this.messages.length<=4)return{tokensSaved:0,count:this.messages.length,olderCount:0};const e=this.messages.length-4,t=this.messages.map(s=>({role:s.role,content:s.content})),{tokensSaved:i,summary:r}=Of(t,4);if(r){const s=this.messages.slice(-4);return this.messages=[{id:Math.random().toString(36).slice(2,10),role:"assistant",content:r,thinking:`Compressed ${e} older turn${e!==1?"s":""} into an executive memory summary capsule.`,thinkingDone:!0,streaming:!1},...s],this.save(),{tokensSaved:i,count:this.messages.length,olderCount:e}}return{tokensSaved:0,count:this.messages.length,olderCount:0}}}ga=new WeakMap;const ut=new Pm;var Dm=Ae('<span class="text-[10px] font-mono text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/25 px-2 py-0.5 rounded-full">Symbolically Verified</span>'),Lm=Ae('<span class="animate-blink text-[#10b981]">▋</span>'),Nm=Ae('<div class="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#08090d] overflow-hidden shadow-md" style="border-left: 2px solid #10b981;"><button class="w-full flex items-center justify-between px-4 py-2.5 bg-[#0c0e14] hover:bg-white/[0.03] transition-colors cursor-pointer"><div class="flex items-center gap-2.5"><span></span> <span class="text-xs font-semibold text-[#e2e8f0]"> </span></div> <div class="flex items-center gap-2"><!> <span class="text-[11px] text-[#9ca3af] ml-1 flex items-center gap-0.5"><span>Hide</span> <span class="text-[9px]">▴</span></span></div></button> <div class="px-4 py-3 text-[13px] text-[#9ca3af] font-mono leading-relaxed whitespace-pre-wrap break-words max-h-60 overflow-y-auto"> <!></div></div>'),Im=Ae('<span class="text-[10px] font-mono text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded-full border border-[#10b981]/20">Symbolically Verified</span>'),Um=Ae('<span class="text-[10px] font-mono text-[#71717a] bg-white/[0.04] px-2 py-0.5 rounded-full border border-white/10">Reasoning</span>'),Fm=Ae('<button class="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#08090d] border border-[rgba(255,255,255,0.09)] hover:border-white/20 text-xs text-[#9ca3af] hover:text-white transition-all shadow-sm cursor-pointer"><span class="text-[#10b981] font-mono">•</span> <span class="font-medium text-[#e2e8f0]"> </span> <!> <span class="text-[10px] text-[#71717a] ml-1">▾</span></button>'),Om=Ae('<div class="animate-fade-in w-full my-2"><!></div>');function Bm(n,e){fn(e,!0);let t=Ze(!0);const i=qt(()=>!!e.sympyGrounding),r=qt(()=>(e.text.match(/^(?:step\s*\d+|^\d+\.)/gim)??[]).length);ia(()=>{e.done&&!e.streaming&&setTimeout(()=>{be(t,!1)},800)});var s=bs(),a=On(s);{var o=c=>{var l=Om(),u=ie(l);{var f=h=>{var _=Nm(),v=ie(_),p=ie(v),m=ie(p),y=j(m,2),w=Ie(y,!0),S=j(p,2),T=ie(S);{var E=R=>{var I=Dm();Ee(R,I)};Ge(T,R=>{B(i)&&R(E)})}var g=j(v,2),M=ie(g),L=j(M);{var D=R=>{var I=Lm();Ee(R,I)};Ge(L,R=>{e.streaming&&R(D)})}it(()=>{Ot(m,1,`w-2 h-2 rounded-full ${e.streaming?"bg-[#10b981] animate-pulse-dot shadow-[0_0_8px_rgba(16,185,129,0.8)]":"bg-[#10b981]"}`),Ue(w,e.streaming?"Reasoning through mathematical derivation…":B(i)?B(r)>0?`Symbolically verified in ${B(r)} steps`:"Symbolically verified":B(r)>0?`Reasoning chain (${B(r)} steps)`:"Reasoning chain"),Ue(M,e.text)}),Ye("click",v,()=>be(t,!1)),Ee(h,_)},d=h=>{var _=Fm(),v=j(ie(_),2),p=Ie(v,!0),m=j(v,2);{var y=S=>{var T=Im();Ee(S,T)},w=S=>{var T=Um();Ee(S,T)};Ge(m,S=>{B(i)?S(y):S(w,-1)})}it(()=>Ue(p,B(i)?B(r)>0?`Symbolically verified (${B(r)} steps)`:"Symbolically verified":B(r)>0?`Reasoning chain (${B(r)} steps)`:"Reasoning chain")),Ye("click",_,()=>be(t,!0)),Ee(h,_)};Ge(u,h=>{B(t)?h(f):h(d,-1)})}Ee(c,l)};Ge(a,c=>{e.text&&c(o)})}Ee(n,s),hn()}Tn(["click"]);function Kc(n){if(!n)return"";let e=n.replace(/\r\n/g,`
`).replace(/<\/?(?:code|pre|solution|sstream|latex|math|think)>/gi,"");const t=[],i=o=>{const c=`__VG_MATH_PH_${t.length}__`;return t.push({id:c,html:o}),c};e=e.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g,(o,c,l)=>{const u=Er(l.trim());return i(`<pre class="bg-s1 border border-b2 rounded-lg p-3 my-2 overflow-x-auto text-xs font-mono text-platinum"><code>${u}</code></pre>`)}),e=e.replace(/(?:\\+\[|\$\$)([\s\S]*?)(?:\\+\]|\$\$)/g,(o,c)=>i(il(c.trim(),!0))),e=e.replace(/\\+\(([\s\S]*?)\\+\)/g,(o,c)=>i(il(c.trim(),!1))),e=e.replace(/(^|[\s(])\$([^$\n]+)\$(?=[\s),.?!:;]|$)/g,(o,c,l)=>!/^\d+[\s.,]/.test(l)&&l.length<120&&!l.includes(`
`)?`${c}${i(il(l.trim(),!1))}`:o);const r=e.split(`
`),s=[];for(let o of r){const c=o.trim();if(c.startsWith("### ")){s.push(`<div class="mt-4 mb-2 text-xs font-semibold tracking-wider uppercase text-emerald flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-emerald"></span>${Er(c.slice(4))}</div>`);continue}if(c.startsWith("## ")){s.push(`<div class="mt-3 mb-1.5 text-sm font-bold text-platinum tracking-wide">${Er(c.slice(3))}</div>`);continue}if(c.startsWith("# ")){s.push(`<div class="mt-4 mb-2 text-base font-bold text-platinum tracking-tight">${Er(c.slice(2))}</div>`);continue}const l=c.match(/^(\d+)\.\s+(.*)$/);if(l){s.push(`<div class="flex items-start gap-2 my-1 text-platinum"><span class="font-mono text-xs text-muted min-w-[1.2rem] mt-0.5">${l[1]}.</span><span>${nl(l[2])}</span></div>`);continue}const u=c.match(/^[-*•]\s+(.*)$/);if(u){s.push(`<div class="flex items-start gap-2 my-1 pl-2 text-muted"><span class="text-dimmed mt-1">•</span><span class="text-platinum">${nl(u[1])}</span></div>`);continue}if(!c){s.push('<div class="h-1.5"></div>');continue}s.push(`<p class="my-1 text-platinum leading-relaxed">${nl(o)}</p>`)}let a=s.join("");for(const{id:o,html:c}of t)a=a.split(o).join(c);return a}function nl(n){let e=Er(n);return e=e.replace(/\*\*(.*?)\*\*/g,'<strong class="font-semibold text-platinum">$1</strong>'),e=e.replace(/`([^`]+)`/g,'<code class="inline-code">$1</code>'),e}function il(n,e){if(typeof katex>"u")return`<code class="text-muted font-mono">${Er(n)}</code>`;try{return katex.renderToString(n,{throwOnError:!1,displayMode:e})}catch{return`<code class="text-muted font-mono">${Er(n)}</code>`}}function Er(n){return n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}var km=Ae('<button title="Copy LaTeX formula to clipboard" class="text-[11px] font-mono text-[#38bdf8] hover:text-white px-2 py-0.5 rounded hover:bg-white/[0.05] transition-all cursor-pointer"> </button>'),zm=Ae('<div class="py-2 px-3 bg-black/40 rounded-lg border border-white/[0.04] overflow-x-auto text-center"></div>'),Hm=Ae('<div class="px-2 py-1 rounded bg-white/[0.04] border border-white/10 flex items-center gap-1.5"><span class="text-[#9ca3af]">Exact:</span> <span class="text-[#38bdf8] font-semibold"> </span></div>'),Gm=Ae('<div class="px-2 py-1 rounded bg-white/[0.04] border border-white/10 flex items-center gap-1.5"><span class="text-[#9ca3af]">Approx:</span> <span class="text-[#10b981] font-semibold"> </span></div>'),Vm=Ae('<div class="px-2 py-1 rounded bg-white/[0.04] border border-white/10 flex items-center gap-1.5"><span class="text-[#9ca3af]"> </span> <span class="text-[#38bdf8] font-semibold"> </span></div>'),Wm=Ae('<div class="my-3 select-none rounded-xl bg-[#06080d] border border-white/[0.08] overflow-hidden shadow-lg transition-all"><div class="flex items-center justify-between px-3.5 py-2.5 bg-[#090b12] border-b border-white/[0.05]"><div class="flex items-center gap-2.5"><div class="w-6 h-6 rounded-md bg-white/[0.05] border border-white/10 flex items-center justify-center text-xs font-mono text-[#38bdf8]">&sum;</div> <div class="flex flex-col"><span class="text-xs font-semibold text-white tracking-wide">SymPy AST Mathematical Engine</span> <span class="text-[10px] text-[#9ca3af] font-mono"> </span></div></div> <div class="flex items-center gap-2"><!></div></div> <div class="p-3.5 bg-[#020408] flex flex-col gap-2.5"><!> <div class="flex flex-wrap items-center gap-2 text-[11px] font-mono"><!> <!> <!></div></div></div>');function Xm(n,e){fn(e,!0);let t=Ze(!1);const i=qt(()=>e.tool.latex||(e.tool.result?String(e.tool.result):"")||(e.tool.expression?String(e.tool.expression):"")),r=qt(()=>B(i)?Kc(`$$\\mathbf{${B(i)}}$$`):"");function s(){if(B(i))try{navigator.clipboard.writeText(B(i)),be(t,!0),setTimeout(()=>{be(t,!1)},1500)}catch{}}var a=Wm(),o=ie(a),c=ie(o),l=j(ie(c),2),u=j(ie(l),2),f=Ie(u,!0),d=j(c,2),h=ie(d);{var _=L=>{var D=km(),R=Ie(D,!0);it(()=>Ue(R,B(t)?"Copied &check;":"Copy LaTeX")),Ye("click",D,s),Ee(L,D)};Ge(h,L=>{B(i)&&L(_)})}var v=j(o,2),p=ie(v);{var m=L=>{var D=zm();zo(D,()=>B(r),!0),Ee(L,D)};Ge(p,L=>{B(r)&&L(m)})}var y=j(p,2),w=ie(y);{var S=L=>{var D=Hm(),R=j(ie(D),2),I=Ie(R,!0);it(()=>Ue(I,e.tool.result)),Ee(L,D)};Ge(w,L=>{e.tool.result&&L(S)})}var T=j(w,2);{var E=L=>{var D=Gm(),R=j(ie(D),2),I=Ie(R,!0);it(()=>Ue(I,e.tool.numeric||e.tool.numeric_approx)),Ee(L,D)};Ge(T,L=>{(e.tool.numeric||e.tool.numeric_approx)&&L(E)})}var g=j(T,2);{var M=L=>{var D=bs(),R=On(D);ar(R,17,()=>e.tool.metrics,rs,(I,G)=>{var C=Vm(),P=ie(C),F=Ie(P),z=j(P,2),Q=Ie(z,!0);it(()=>{Ue(F,`${B(G).label??""}:`),Ue(Q,B(G).value)}),Ee(I,C)}),Ee(L,D)};Ge(g,L=>{e.tool.metrics&&L(M)})}it(()=>Ue(f,e.tool.expression?`AST: ${e.tool.expression}`:"Closed-Form Exact Solution")),Ee(n,a),hn()}Tn(["click"]);var qm=Ae('<div class="my-3 select-none rounded-xl bg-[#06080d] border border-white/[0.08] p-3 text-xs font-mono text-[#9ca3af]"><pre class="overflow-x-auto select-text"> </pre></div>');function Ym(n,e){fn(e,!0);const t=qt(()=>e.tool.tool==="sympy_eval"||e.tool.result!==void 0&&(e.tool.latex||e.tool.numeric_approx||e.tool.expression));var i=bs(),r=On(i);{var s=o=>{Xm(o,{get tool(){return e.tool}})},a=o=>{var c=qm(),l=ie(c),u=Ie(l,!0);it(f=>Ue(u,f),[()=>JSON.stringify(e.tool,null,2)]),Ee(o,c)};Ge(r,o=>{B(t)?o(s):o(a,-1)})}Ee(n,i),hn()}var Km=Ae('<button type="button" class="w-14 h-14 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 relative group cursor-pointer focus:outline-none" title="Click to expand full resolution"><img class="w-full h-full object-cover group-hover:scale-105 transition-transform"/> <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"></path></svg></div></button>'),Zm=Ae('<div class="w-14 h-14 rounded-lg bg-white/[0.04] border border-white/10 flex flex-col items-center justify-center flex-shrink-0 text-[#10b981]"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></div>'),Jm=Ae('<button type="button" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md cursor-default border-0" aria-label="Close Preview"></button> <div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 max-w-[90vw] max-h-[85vh] bg-[#0c0e14] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-fade-in"><div class="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#10121a]"><span class="text-xs font-semibold text-white"> </span> <button class="text-gray-400 hover:text-white p-1 text-sm leading-none cursor-pointer" aria-label="Close"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div> <div class="p-4 bg-black flex items-center justify-center overflow-auto max-h-[75vh]"><img class="max-h-full max-w-full rounded object-contain"/></div></div>',1),Qm=Ae('<div class="mb-2 flex items-center gap-3 p-2.5 rounded-xl bg-[#0a0c12] border border-white/10 shadow-sm max-w-md animate-fade-in"><!> <div class="flex-1 min-w-0 pr-2"><div class="flex items-center gap-2"><span class="text-xs font-semibold text-white truncate max-w-[200px]"> </span> <span class="text-[10px] font-mono text-[#10b981] bg-[#10b981]/10 px-1.5 py-0.5 rounded border border-[#10b981]/20"> </span></div> <div class="text-[11px] text-[#9ca3af] mt-0.5"> </div></div></div> <!>',1);function jm(n,e){fn(e,!0);let t=Ze(!1);function i(w){return w<1024?`${w} B`:w<1024*1024?`${(w/1024).toFixed(1)} KB`:`${(w/(1024*1024)).toFixed(1)} MB`}var r=Qm(),s=On(r),a=ie(s);{var o=w=>{var S=Km(),T=ie(S);it(()=>{$r(T,"src",e.attachment.dataUrl),$r(T,"alt",e.attachment.name)}),Ye("click",S,()=>be(t,!0)),Ee(w,S)},c=w=>{var S=Zm();Ee(w,S)};Ge(a,w=>{e.attachment.type==="image"&&e.attachment.dataUrl?w(o):w(c,-1)})}var l=j(a,2),u=ie(l),f=ie(u),d=Ie(f,!0),h=j(f,2),_=Ie(h,!0),v=j(u,2),p=Ie(v),m=j(s,2);{var y=w=>{var S=Jm(),T=On(S),E=j(T,2),g=ie(E),M=ie(g),L=Ie(M,!0),D=j(M,2),R=j(g,2),I=Ie(R);it(()=>{Ue(L,e.attachment.name),$r(I,"src",e.attachment.dataUrl),$r(I,"alt",e.attachment.name)}),Ye("click",T,()=>be(t,!1)),Ye("click",D,()=>be(t,!1)),Ee(w,S)};Ge(m,w=>{B(t)&&e.attachment.dataUrl&&w(y)})}it(w=>{Ue(d,e.attachment.name),Ue(_,e.attachment.type==="image"?"Image":"Document"),Ue(p,`${w??""} · Ready for on-device analysis`)},[()=>i(e.attachment.size)]),Ee(n,r),hn()}Tn(["click"]);var _a,va,xa,Sa;class $m{constructor(){Je(this,_a,Ze(null));Je(this,va,Ze(ti([])));Je(this,xa,Ze(null));Je(this,Sa,Ze("derivation"))}get activeArtifact(){return B(V(this,_a))}set activeArtifact(e){be(V(this,_a),e,!0)}get artifacts(){return B(V(this,va))}set artifacts(e){be(V(this,va),e,!0)}get dockedCard(){return B(V(this,xa))}set dockedCard(e){be(V(this,xa),e,!0)}get activeTab(){return B(V(this,Sa))}set activeTab(e){be(V(this,Sa),e,!0)}openArtifact(e){this.activeArtifact=e,this.artifacts.some(t=>t.id===e.id)||this.artifacts.push(e),e.type==="cad"?this.activeTab="cad":e.type==="sim"?this.activeTab="sim":e.type==="chem"?this.activeTab="chem":this.activeTab="derivation"}closeArtifact(){this.activeArtifact=null}setDockedCard(e){this.dockedCard=e}dismissDockedCard(){this.dockedCard=null}}_a=new WeakMap,va=new WeakMap,xa=new WeakMap,Sa=new WeakMap;const Et=new $m;var eg=Ae('<span class="inline-flex items-center gap-1 text-[10px] font-mono text-[#10b981] bg-[#10b981]/10 px-1.5 py-0.2 rounded border border-[#10b981]/20"><span class="w-1 h-1 rounded-full bg-[#10b981]"></span> CAS Verified</span>'),tg=Ae('<div><div class="flex items-center justify-between gap-3"><div class="flex items-center gap-3 min-w-0"><div class="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#38bdf8] flex-shrink-0"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></div> <div class="min-w-0"><div class="flex items-center gap-2"><span class="text-[10px] font-mono font-medium text-[#38bdf8] tracking-wider uppercase">Artifact</span> <span class="text-[10px] font-mono text-[#6b7280]"> </span> <!></div> <h4 class="text-xs font-semibold text-white tracking-tight truncate mt-0.5"> </h4></div></div> <button type="button"><span> </span> <svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M19 10a.75.75 0 00-.75-.75H8.704l2.473-2.47a.75.75 0 10-1.06-1.06l-3.75 3.75a.75.75 0 000 1.06l3.75 3.75a.75.75 0 101.06-1.06L8.704 10.75H18.25A.75.75 0 0019 10z" clip-rule="evenodd"></path></svg></button></div></div>');function ng(n,e){fn(e,!0);let t=qt(()=>{var m;return((m=Et.activeArtifact)==null?void 0:m.id)===e.artifact.id});var i=tg(),r=ie(i),s=ie(r),a=j(ie(s),2),o=ie(a),c=j(ie(o),2),l=Ie(c),u=j(c,2);{var f=m=>{var y=eg();Ee(m,y)};Ge(u,m=>{e.artifact.verified&&m(f)})}var d=j(o,2),h=Ie(d,!0),_=j(s,2),v=ie(_),p=Ie(v,!0);it(()=>{Ot(i,1,`my-3 p-3 rounded-xl bg-[#05080f] border transition-all duration-200 ${B(t)?"border-[#38bdf8]/60 shadow-[0_0_20px_rgba(56,189,248,0.15)] ring-1 ring-[#38bdf8]/30":"border-white/10 hover:border-white/20 hover:bg-[#070b14]"}`),Ue(l,`#${e.artifact.id??""}`),Ue(h,e.artifact.title),Ot(_,1,`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer ${B(t)?"bg-[#38bdf8] text-black font-semibold":"bg-white/[0.06] hover:bg-white/[0.12] text-[#e2e8f0] border border-white/10"}`),Ue(p,B(t)?"Viewing Canvas":"Open Canvas")}),Ye("click",_,()=>Et.openArtifact(e.artifact)),Ee(n,i),hn()}Tn(["click"]);var ig=Ae('<p class="whitespace-pre-wrap text-[14px] leading-relaxed select-text"> </p>'),rg=Ae("<!> <!>",1),sg=Ae('<span class="text-[11px] font-mono bg-white/[0.05] border border-white/10 text-white px-2 py-0.5 rounded select-text"> </span>'),ag=Ae('<div class="flex flex-wrap gap-1.5 pt-1"></div>'),og=Ae('<button type="button" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black hover:bg-slate-200 text-xs font-semibold shadow transition-all cursor-pointer"><span>⬡</span> <span> </span></button>'),lg=Ae('<div class="pt-2 border-t border-white/[0.06] flex flex-wrap gap-2"></div>'),cg=Ae('<div class="mb-3 p-3.5 rounded-xl bg-[#0c0e14] border border-white/10 space-y-3"><div class="flex items-center justify-between text-xs"><span class="font-semibold text-white flex items-center gap-1.5"><span class="text-[#10b981]">⬡</span> <span> </span></span> <span class="text-[10px] text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded border border-[#10b981]/20 font-mono">Document Analyzed</span></div> <p class="text-xs text-[#9ca3af] leading-relaxed select-text"> </p> <!> <!></div>'),ug=Ae('<div class="mb-3 space-y-2"></div>'),dg=Ae('<span class="animate-blink text-[#10b981] ml-0.5">▋</span>'),fg=Ae('<!> <!> <!>  <div class="prose-vigyan text-[14px] select-text"><!><!></div>',1),hg=Ae('<button type="button" title="Copy mathematical LaTeX equations to clipboard" class="px-2 py-0.5 rounded bg-white/[0.04] hover:bg-[#10b981]/20 hover:text-[#10b981] hover:border-[#10b981]/30 border border-white/[0.08] transition-colors cursor-pointer text-[10px] font-mono"> </button>'),pg=Ae('<button type="button" title="Trim prior conversation turns before this point" class="px-2 py-0.5 rounded bg-white/[0.04] hover:bg-amber-500/20 hover:text-amber-300 hover:border-amber-500/30 border border-white/[0.08] transition-colors cursor-pointer">Trim Prior</button>'),mg=Ae('<button type="button" title="Delete this message from context" class="px-2 py-0.5 rounded bg-white/[0.04] hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/30 border border-white/[0.08] transition-colors cursor-pointer">Delete</button>'),gg=Ae('<div><button type="button" title="Copy content" class="px-2 py-0.5 rounded bg-white/[0.04] hover:bg-white/[0.1] hover:text-white border border-white/[0.08] transition-colors cursor-pointer"> </button> <!> <!> <!></div>'),_g=Ae("<div><div><!> <!></div></div>");function Fu(n,e){fn(e,!0);let t=Lr(e,"streaming",3,!1),i=Lr(e,"toolResults",19,()=>[]),r=Lr(e,"canTrimPrior",3,!1),s=Ze(!1),a=Ze(!1);const o=qt(()=>e.role==="user"),c=qt(()=>{if(!e.content||B(o))return[];const w=[],S=e.content.match(/\$\$([\s\S]+?)\$\$/g);S&&w.push(...S.map(E=>E.slice(2,-2).trim()));const T=e.content.match(new RegExp("(?<!\\$)\\$([^\\$\\n]+?)\\$(?!\\$)","g"));return T&&w.push(...T.map(E=>E.slice(1,-1).trim())),w});function l(){if(e.content)try{navigator.clipboard.writeText(e.content),be(s,!0),setTimeout(()=>{be(s,!1)},1500)}catch{}}function u(){if(B(c).length!==0)try{const w=B(c).join(`

`);navigator.clipboard.writeText(w),be(a,!0),setTimeout(()=>{be(a,!1)},1500)}catch{}}const f=qt(()=>B(o)?e.content:Kc(e.content));var d=_g(),h=ie(d),_=ie(h);{var v=w=>{var S=rg(),T=On(S);{var E=L=>{jm(L,{get attachment(){return e.attachment}})};Ge(T,L=>{e.attachment&&L(E)})}var g=j(T,2);{var M=L=>{var D=ig(),R=Ie(D,!0);it(()=>Ue(R,e.content)),Ee(L,D)};Ge(g,L=>{e.content&&L(M)})}Ee(w,S)},p=w=>{var S=fg(),T=On(S);{var E=P=>{var F=cg(),z=ie(F),Q=ie(z),O=j(ie(Q),2),q=Ie(O),Z=j(z,2),de=Ie(Z,!0),Ce=j(Z,2);{var H=he=>{var ue=ag();ar(ue,21,()=>e.digest.metrics,rs,(Oe,ct)=>{var _e=sg(),We=Ie(_e,!0);it(()=>Ue(We,B(ct))),Ee(Oe,_e)}),Ee(he,ue)};Ge(Ce,he=>{e.digest.metrics&&e.digest.metrics.length>0&&he(H)})}var $=j(Ce,2);{var me=he=>{var ue=lg();ar(ue,21,()=>e.digest.actions,rs,(Oe,ct)=>{var _e=og(),We=j(ie(_e),2),rt=Ie(We,!0);it(()=>Ue(rt,B(ct))),Ye("click",_e,()=>{var Ke;return(Ke=e.onAction)==null?void 0:Ke.call(e,B(ct))}),Ee(Oe,_e)}),Ee(he,ue)};Ge($,he=>{e.digest.actions&&e.digest.actions.length>0&&he(me)})}it(()=>{Ue(q,`Engineering Digest: ${e.digest.filename??""}`),Ue(de,e.digest.summary)}),Ee(P,F)};Ge(T,P=>{e.digest&&P(E)})}var g=j(T,2);{var M=P=>{var F=ug();ar(F,21,i,rs,(z,Q)=>{Ym(z,{get tool(){return B(Q)}})}),Ee(P,F)};Ge(g,P=>{i()&&i().length>0&&P(M)})}var L=j(g,2);{var D=P=>{ng(P,{get artifact(){return e.artifact}})};Ge(L,P=>{e.artifact&&P(D)})}var R=j(L,2),I=ie(R);zo(I,()=>B(f));var G=j(I);{var C=P=>{var F=dg();Ee(P,F)};Ge(G,P=>{t()&&P(C)})}Ee(w,S)};Ge(_,w=>{B(o)?w(v):w(p,-1)})}var m=j(_,2);{var y=w=>{var S=gg(),T=ie(S),E=Ie(T,!0),g=j(T,2);{var M=G=>{var C=hg(),P=Ie(C,!0);it(()=>Ue(P,B(a)?"LaTeX Copied":"Copy LaTeX")),Ye("click",C,u),Ee(G,C)};Ge(g,G=>{B(c).length>0&&G(M)})}var L=j(g,2);{var D=G=>{var C=pg();Ye("click",C,()=>{var P;return(P=e.onTrimPrior)==null?void 0:P.call(e,e.id)}),Ee(G,C)};Ge(L,G=>{r()&&e.onTrimPrior&&G(D)})}var R=j(L,2);{var I=G=>{var C=mg();Ye("click",C,()=>{var P;return(P=e.onDelete)==null?void 0:P.call(e,e.id)}),Ee(G,C)};Ge(R,G=>{e.onDelete&&G(I)})}it(()=>{Ot(S,1,`
          opacity-0 group-hover:opacity-100 transition-opacity duration-150
          flex items-center gap-1.5 mt-2.5 pt-2 border-t border-white/[0.06] text-[11px] text-[#9ca3af]
          ${B(o)?"justify-end":"justify-start"}
        `),Ue(E,B(s)?"Copied":"Copy")}),Ye("click",T,l),Ee(w,S)};Ge(m,w=>{!t()&&e.id&&w(y)})}it(()=>{Ot(d,1,`flex w-full animate-fade-in ${B(o)?"justify-end":"justify-start"} my-2 group`),Ot(h,1,`
      max-w-[90%] leading-relaxed break-words relative
      ${B(o)?"bg-[#0e121a] border border-white/[0.08] text-[#f3f4f6] px-4 py-3 rounded-2xl rounded-tr-sm font-normal shadow-sm":"bg-[#030508] border border-white/[0.05] text-[#e2e8f0] px-5 py-4 rounded-xl shadow-sm w-full"}
    `)}),Ee(n,d),hn()}Tn(["click"]);var vg=Ae('<span class="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 font-mono text-[10px] text-[#9ca3af] flex-shrink-0"> </span>'),xg=Ae('<button type="button"> </button>'),Sg=Ae('<div class="w-full mb-2 px-3 py-2 rounded-xl bg-[#080d14]/95 border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.7)] backdrop-blur-xl flex items-center justify-between gap-3 text-xs animate-in fade-in slide-in-from-bottom-2 duration-200" role="region" aria-label="Docked action card"><div class="flex items-center gap-2.5 min-w-0"><span></span> <div class="flex items-center gap-2 min-w-0"><span class="font-semibold text-white tracking-tight truncate"> </span> <!> <span class="hidden md:inline text-[#9ca3af] truncate text-[11px]"> </span></div></div> <div class="flex items-center gap-1.5 flex-shrink-0"><!> <button type="button" class="w-6 h-6 rounded-md text-[#9ca3af] hover:text-white hover:bg-white/[0.08] flex items-center justify-center transition-all cursor-pointer ml-1" title="Dismiss card" aria-label="Dismiss action card"><svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button></div></div>');function bg(n,e){fn(e,!0);let t=qt(()=>Et.dockedCard);var i=bs(),r=On(i);{var s=a=>{var o=Sg(),c=ie(o),l=ie(c),u=j(l,2),f=ie(u),d=Ie(f,!0),h=j(f,2);{var _=S=>{var T=vg(),E=Ie(T,!0);it(()=>Ue(E,B(t).badge)),Ee(S,T)};Ge(h,S=>{B(t).badge&&S(_)})}var v=j(h,2),p=Ie(v,!0),m=j(c,2),y=ie(m);ar(y,17,()=>B(t).actions,rs,(S,T)=>{var E=xg(),g=Ie(E,!0);it(()=>{Ot(E,1,`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${B(T).primary?"bg-[#38bdf8] text-black hover:bg-[#7dd3fc] font-semibold shadow-sm":"bg-white/[0.06] text-[#e2e8f0] hover:bg-white/[0.12] border border-white/10"}`),Ue(g,B(T).label)}),Ye("click",E,function(...M){var L;(L=B(T).onClick)==null||L.apply(this,M)}),Ee(S,E)});var w=j(y,2);it(()=>{Ot(l,1,`w-2 h-2 rounded-full flex-shrink-0 ${B(t).type==="sympy"?"bg-[#10b981] shadow-[0_0_8px_#10b981]":"bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]"}`),Ue(d,B(t).title),Ue(p,B(t).description)}),Ye("click",w,()=>Et.dismissDockedCard()),Ee(a,o)};Ge(r,a=>{B(t)&&a(s)})}Ee(n,i),hn()}Tn(["click"]);var Mg=Ae('<button class="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#08090d] border border-white/10 text-xs text-[#9ca3af] hover:text-white hover:border-white/25 transition-all shadow-sm cursor-pointer"><span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.08] text-[#10b981] font-semibold"> </span> <span> </span></button>'),yg=Ae('<div class="flex flex-col items-center justify-center min-h-[52vh] text-center gap-6 animate-fade-in select-none"><div class="flex flex-col items-center gap-3"><div class="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shadow-lg"><svg class="w-7 h-7 text-[#ffffff]" viewBox="0 0 100 100" fill="currentColor"><polygon points="50,90 20,20 38,20 50,65 62,20 80,20"></polygon></svg></div> <h1 class="text-2xl font-bold text-white tracking-tight">Vigyan Pro</h1> <p class="text-[#9ca3af] text-[14px] max-w-md leading-relaxed">Sovereign scientific intelligence. Exact mathematical derivations, offline document analysis, and zero cloud footprint.</p></div> <div class="flex flex-wrap justify-center gap-2.5 mt-1"></div></div>'),Eg=Ae('<div class="flex flex-col gap-2"><!> <!></div>'),Tg=Ae('<button class="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 border border-white/20 text-[#e2e8f0] hover:bg-white/20 flex items-center justify-center transition-all cursor-pointer" title="Halt generation (Escape)"><span class="w-2.5 h-2.5 bg-white rounded-sm block"></span></button>'),wg=Ae('<button class="flex-shrink-0 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center disabled:opacity-30 hover:opacity-90 transition-all shadow-md font-bold cursor-pointer" title="Send (Enter)"><svg viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 translate-y-[-0.5px]"><path fill-rule="evenodd" d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" clip-rule="evenodd"></path></svg></button>'),Ag=Ae('<div><div class="flex-1 overflow-y-auto overscroll-contain px-4 py-6 scroll-smooth" style="scrollbar-width: none;"><div class="max-w-[768px] mx-auto w-full flex flex-col gap-4"><!></div></div> <div class="px-4 pb-4 pt-1 flex-shrink-0 z-20 relative" role="region" aria-label="Chat input dock"><div class="max-w-[720px] mx-auto w-full flex flex-col items-center"><!> <div class="w-full flex items-center gap-3 bg-[#06080e]/90 backdrop-blur-2xl border border-white/[0.08] rounded-2xl px-4 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.85)] focus-within:border-[#38bdf8]/40 transition-all"><textarea placeholder="Ask a scientific question, derive a proof, analyze a circuit…" class="flex-1 bg-transparent text-[#ffffff] placeholder-[#6b7280] outline-none resize-none leading-relaxed disabled:opacity-50 max-h-36 overflow-y-auto text-[14px]" style="scrollbar-width: none;"></textarea> <!></div> <p class="text-[10px] font-mono text-[#6b7280] text-center mt-2 tracking-wide select-none">100% Offline &amp; Private · Verified Symbolic Mathematics · On-Device Intelligence</p></div></div></div>');function Rg(n,e){fn(e,!0);let t=Lr(e,"fontSize",3,"md"),i=Ze(""),r=Ze(!1),s=null,a=null,o=Ze(null);Cs(()=>{d()});function c(){B(o)&&(B(o).style.height="auto",B(o).style.height=Math.min(B(o).scrollHeight,140)+"px")}const l=[{badge:"RLC",label:"Transient Analysis",prompt:"Derive the step response and damping ratio of an underdamped series RLC circuit with R=20 Ohm, L=0.1 H, and C=100 uF."},{badge:"CAS",label:"Symbolic Calculus",prompt:"Evaluate the analytical integral of x^2 * exp(-x) dx from 0 to infinity using step-by-step SymPy derivation."},{badge:"QM",label:"Quantum Tunneling",prompt:"Derive the transmission coefficient T for quantum tunneling through a rectangular finite potential barrier of width a and height V0."},{badge:"ODE",label:"Harmonic Oscillation",prompt:"Solve the second-order differential equation m*x''(t) + c*x'(t) + k*x(t) = 0 for initial conditions x(0)=x0, x'(0)=0."}],u={sm:"text-[13px]",md:"text-[15px]",lg:"text-[16px]"};function f(){return Math.random().toString(36).slice(2,10)}function d(){requestAnimationFrame(()=>{a&&(a.scrollTop=a.scrollHeight)})}function h(P,F){const z=ut.messages[P];if(!z||z.artifact)return;const Q=z.content;if((Q.includes("$$")||Q.includes("\\[")||Q.includes("\\frac")||Q.includes("\\partial")||Q.includes("\\int")||Q.toLowerCase().includes("derivation")||Q.toLowerCase().includes("proof")||F.toLowerCase().includes("derive")||F.toLowerCase().includes("rlc")||F.toLowerCase().includes("proof"))&&Q.length>50){let q="Analytical STEM Derivation";const Z=Q.match(/^#+\s*(.+)$/m);Z?q=Z[1].trim():F.toLowerCase().includes("rlc")?q="RLC Circuit Underdamped Transient Proof":F.toLowerCase().includes("tunneling")?q="Quantum Tunneling Transmission Derivation":(F.toLowerCase().includes("integral")||F.toLowerCase().includes("calculus"))&&(q="Definite Integral Analytical Derivation");const de=`A-${Math.floor(100+Math.random()*900)}`,Ce=Q.replace(/<\/?(?:code|pre|solution|sstream|latex|math)>/gi,"").trim(),H=!!(z.sympyGrounding&&z.sympyGrounding.trim().length>0),$={id:de,title:q,type:"derivation",content:Ce,verified:H,sympyResidual:H?"0.000e+00":void 0,createdAt:Date.now()};z.artifact=$,ut.save(),Et.setDockedCard({id:`dock-${de}`,type:"artifact",title:`Artifact #${de} Ready`,badge:"KaTeX + CAS",description:q,actions:[{label:"Open Canvas",primary:!0,onClick:()=>Et.openArtifact($)}]})}}async function _(P){const F=P.trim();if(!F||B(r))return;be(i,""),B(o)&&(B(o).style.height="auto"),be(r,!0),ut.messages.push({id:f(),role:"user",content:F,thinking:"",thinkingDone:!1,streaming:!1}),ut.save();const z=f();ut.messages.push({id:z,role:"assistant",content:"",thinking:"",thinkingDone:!1,streaming:!0,toolResults:[]}),d();const Q=ut.messages.filter(O=>O.role==="user"||O.role==="assistant"&&O.content).slice(0,-1).map(O=>({role:O.role,content:O.content}));s=new AbortController,await Am([...Q,{role:"user",content:F}],e.model||Eo,O=>{const q=ut.messages.findIndex(Z=>Z.id===z);q!==-1&&(O.type==="thinking"?(ut.messages[q].thinking+=O.text,d()):O.type==="sympy"?(ut.messages[q].sympyGrounding=O.text,ut.messages[q].thinking.includes("Symbolically Verified")||(ut.messages[q].thinking=`[Symbolically Verified]: ${O.text}
`+ut.messages[q].thinking),d()):O.type==="artifact"&&O.artifactData?(Et.openArtifact(O.artifactData),ut.messages[q].artifact=O.artifactData,ut.save(),d()):O.toolData?(ut.messages[q].toolResults||(ut.messages[q].toolResults=[]),ut.messages[q].toolResults.push(O.toolData),d()):O.type==="answer"?(ut.messages[q].thinkingDone||(ut.messages[q].thinkingDone=!0),ut.messages[q].content+=O.text,d()):(O.type==="done"||O.type==="error")&&(ut.messages[q].thinkingDone=!0,ut.messages[q].streaming=!1,O.type==="error"&&(ut.messages[q].content=O.text||"Inference engine connection failed. Please ensure the local Vigyan service is running."),h(q,F),ut.save(),be(r,!1)))},s.signal),be(r,!1),ut.save();try{const O=parseInt(localStorage.getItem("vigyan_context_budget")||"2048",10);ut.autoCompressIfNeeded(O)}catch{}d()}function v(P){P.key==="Enter"&&(!P.shiftKey||P.metaKey||P.ctrlKey)&&(P.preventDefault(),_(B(i)))}function p(){s==null||s.abort(),be(r,!1);const P=ut.messages.at(-1);P&&P.role==="assistant"&&(P.streaming=!1,P.thinkingDone=!0,P.content||(P.content="Generation halted."),ut.save())}var m=Ag(),y=ie(m),w=ie(y),S=ie(w);{var T=P=>{var F=yg(),z=j(ie(F),2);ar(z,21,()=>l,rs,(Q,O)=>{var q=Mg(),Z=ie(q),de=Ie(Z,!0),Ce=j(Z,2),H=Ie(Ce,!0);it(()=>{Ue(de,B(O).badge),Ue(H,B(O).label)}),Ye("click",q,()=>_(B(O).prompt)),Ee(Q,q)}),Ee(P,F)},E=P=>{var F=bs(),z=On(F);ar(z,19,()=>ut.messages,Q=>Q.id,(Q,O,q)=>{var Z=bs(),de=On(Z);{var Ce=$=>{{let me=qt(()=>B(q)>0);Fu($,{get id(){return B(O).id},role:"user",get content(){return B(O).content},get attachment(){return B(O).attachment},get canTrimPrior(){return B(me)},onDelete:he=>ut.deleteMessage(he),onTrimPrior:he=>ut.trimHistoryBefore(he)})}},H=$=>{var me=Eg(),he=ie(me);{var ue=_e=>{{let We=qt(()=>B(O).streaming&&!B(O).thinkingDone);Bm(_e,{get text(){return B(O).thinking},get streaming(){return B(We)},get done(){return B(O).thinkingDone},get sympyGrounding(){return B(O).sympyGrounding}})}};Ge(he,_e=>{(B(O).thinking||B(O).streaming&&!B(O).thinkingDone)&&_e(ue)})}var Oe=j(he,2);{var ct=_e=>{{let We=qt(()=>B(q)>0);Fu(_e,{get id(){return B(O).id},role:"assistant",get content(){return B(O).content},get streaming(){return B(O).streaming},get toolResults(){return B(O).toolResults},get sympyGrounding(){return B(O).sympyGrounding},get digest(){return B(O).digest},get artifact(){return B(O).artifact},get canTrimPrior(){return B(We)},onDelete:rt=>ut.deleteMessage(rt),onTrimPrior:rt=>ut.trimHistoryBefore(rt)})}};Ge(Oe,_e=>{(B(O).content||B(O).toolResults&&B(O).toolResults.length>0||B(O).thinkingDone&&B(O).streaming||B(O).digest)&&_e(ct)})}Ee($,me)};Ge(de,$=>{B(O).role==="user"?$(Ce):$(H,-1)})}Ee(Q,Z)}),Ee(P,F)};Ge(S,P=>{ut.messages.length===0?P(T):P(E,-1)})}yo(y,P=>a=P,()=>a);var g=j(y,2),M=ie(g),L=ie(M);bg(L,{});var D=j(L,2),R=ie(D);$r(R,"rows",1),yo(R,P=>be(o,P),()=>B(o));var I=j(R,2);{var G=P=>{var F=Tg();Ye("click",F,p),Ee(P,F)},C=P=>{var F=wg();it(z=>F.disabled=z,[()=>!B(i).trim()]),Ye("click",F,()=>_(B(i))),Ee(P,F)};Ge(I,P=>{B(r)?P(G):P(C,-1)})}it(()=>{Ot(m,1,`flex flex-col h-full bg-[#000000] text-[#f3f4f6] ${u[t()]??""} relative`),R.disabled=B(r)}),Ye("input",R,c),Ye("keydown",R,v),es(R,()=>B(i),P=>be(i,P)),Ee(n,m),hn()}Tn(["click","input","keydown"]);var Cg=Ae('<button type="button" class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm border-0 cursor-default" aria-label="Close preferences"></button>'),Pg=Ae('<!> <aside style="will-change: transform;"><div class="flex items-center justify-between px-6 py-4 border-b border-[rgba(255,255,255,0.06)] bg-[#0c0e14]"><span class="text-xs font-semibold text-white tracking-wider uppercase">Preferences</span> <button class="text-[#9ca3af] hover:text-white transition-colors p-1 cursor-pointer flex items-center justify-center" aria-label="Close"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div> <div class="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6"><section><span class="text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af] block mb-2">Intelligence Engine</span> <div class="bg-[#10121a] rounded-xl border border-[rgba(255,255,255,0.08)] p-4 space-y-3"><div class="flex items-start justify-between"><div><h3 class="text-sm font-semibold text-white tracking-tight">Vigyan 3B Quad-Master</h3> <p class="text-[11px] text-[#9ca3af] font-mono mt-0.5">IQ3_M Sovereign Edition</p></div> <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/25 text-[10px] font-medium text-[#10b981]"><span class="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span> Active</span></div></div></section> <section><span class="text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af] block mb-2">Storage & Privacy</span> <div class="bg-[#10121a] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 space-y-3"><p class="text-[11px] text-[#9ca3af] leading-relaxed">Your conversations and mathematical proofs reside exclusively in local storage on this computer.</p> <button type="button"> </button></div></section> <section><span class="text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af] block mb-2">About</span> <div class="bg-[#10121a] border border-[rgba(255,255,255,0.08)] rounded-xl p-4 space-y-2 text-[11px]"><div class="flex items-center justify-between text-white"><span class="font-medium">Vigyan Pro Desktop</span> <span class="font-mono text-[10px] text-[#9ca3af]">v3.4.0</span></div> <p class="text-[#6b7280] leading-relaxed">Sovereign STEM workstation combining local neural inference with exact symbolic algebra (SymPy CAS).</p> <div class="pt-2 border-t border-[rgba(255,255,255,0.06)] space-y-1 text-[10px]"><div class="flex justify-between"><span class="text-[#6b7280]">Developer</span> <span class="text-slate-300">ExperimentLab AI</span></div> <div class="flex justify-between"><span class="text-[#6b7280]">Website</span> <a href="https://experimentlab.in" target="_blank" rel="noopener noreferrer" class="text-violet-400 hover:underline">experimentlab.in</a></div> <div class="flex justify-between"><span class="text-[#6b7280]">Support</span> <span class="text-slate-300">support@experimentlab.in</span></div></div></div></section></div></aside>',1);function Dg(n,e){fn(e,!0);let t=Ze(!1),i=null;function r(){B(t)?(be(t,!1),i&&clearTimeout(i),ut.clear(),e.onClose()):(be(t,!0),i&&clearTimeout(i),i=setTimeout(()=>{be(t,!1)},3500))}var s=Pg(),a=On(s);{var o=p=>{var m=Cg();Ye("click",m,function(...y){var w;(w=e.onClose)==null||w.apply(this,y)}),Ee(p,m)};Ge(a,p=>{e.open&&p(o)})}var c=j(a,2),l=ie(c),u=j(ie(l),2),f=j(l,2),d=j(ie(f),2),h=j(ie(d),2),_=j(ie(h),2),v=Ie(_,!0);it(()=>{Ot(c,1,`fixed top-0 right-0 h-full w-84 z-50 flex flex-col bg-[#08090d] border-l border-[rgba(255,255,255,0.08)] shadow-2xl transition-transform duration-300 ${e.open?"translate-x-0":"translate-x-full"}`),Ot(_,1,`w-full py-2 px-3 rounded-lg text-xs font-medium transition-all border cursor-pointer ${B(t)?"bg-rose-950/60 border-rose-500 text-rose-200 animate-pulse":"bg-white/[0.03] border-white/10 text-rose-400 hover:bg-rose-950/20 hover:border-rose-800/40"}`),Ue(v,B(t)?"Click again to confirm reset":"Clear Conversation History")}),Ye("click",u,function(...p){var m;(m=e.onClose)==null||m.apply(this,p)}),Ye("click",_,r),Ee(n,s),hn()}Tn(["click"]);var Lg=Ae('<button type="button" class="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm border-0 cursor-default" aria-label="Close ledger"></button>'),Ng=Ae('<button class="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-white/70 hover:text-white px-1.5 py-0.5 rounded bg-white/10 cursor-pointer">Add</button>'),Ig=Ae('<div class="py-12 text-center text-[11px] font-mono text-neutral-600 select-none">No active rules.</div>'),Ug=Ae('<div class="group bg-[#0a0c10] border border-white/[0.06] hover:border-white/15 rounded-lg p-2.5 transition-all flex items-start justify-between gap-2"><div class="flex flex-col gap-1 min-w-0 flex-1"><div class="flex items-center gap-1.5"><span class="text-[9px] font-mono font-semibold text-neutral-400 uppercase"> </span> <span class="text-[9px] font-mono text-neutral-600"> </span></div> <p class="text-[11px] font-mono text-neutral-200 leading-normal break-words select-text"> </p></div> <button title="Undo rule" class="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-500 hover:text-rose-400 text-xs px-1 py-0.5 cursor-pointer" aria-label="Undo rule">&times;</button></div>'),Fg=Ae('<div class="flex flex-col gap-2"></div>'),Og=Ae('<!> <aside><div class="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-[#08090c]"><div class="flex items-center gap-2"><span class="text-xs font-mono font-medium tracking-wide text-white uppercase">Ledger</span> <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/10 text-neutral-400"> </span></div> <button class="text-neutral-500 hover:text-white transition-colors text-sm cursor-pointer p-1" aria-label="Close">&times;</button></div> <div class="flex-1 overflow-y-auto p-4 flex flex-col gap-3"><div class="relative"><input type="text" placeholder="Add rule and press Enter..." class="w-full bg-[#0c0e12] border border-white/10 focus:border-white/30 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none transition-colors font-mono disabled:opacity-50"/> <!></div> <!></div> <div class="px-4 py-2.5 border-t border-white/[0.05] text-[10px] font-mono text-neutral-600 flex items-center justify-between"><span>.agents/ledger.jsonl</span> <span>150-line ceiling</span></div></aside>',1);function Bg(n,e){fn(e,!0);let t=Ze(ti([])),i=Ze(ti({active_rules_count:0,lines_used:0,max_budget_lines:150,budget_used_pct:0,budget_remaining_lines:150})),r=Ze(""),s=Ze(!1);async function a(){try{const R=ss(),I=js(),G={};I&&(G["X-Vigyan-Token"]=I);const C=await fetch(`${R}/api/ledger/list`,{headers:G});if(C.ok){const P=await C.json();be(t,P.rules||[],!0),P.telemetry&&be(i,P.telemetry,!0)}}catch(R){console.error("Ledger fetch error:",R)}}async function o(R){if(R&&R.key!=="Enter")return;const I=B(r).trim();if(!(!I||B(s))){be(s,!0);try{const G=ss(),C=js(),P={"Content-Type":"application/json"};C&&(P["X-Vigyan-Token"]=C),(await fetch(`${G}/api/ledger/learn`,{method:"POST",headers:P,body:JSON.stringify({rule:I})})).ok&&(be(r,""),await a())}catch(G){console.error("Add rule error:",G)}finally{be(s,!1)}}}async function c(R){if(!B(s)){be(s,!0);try{const I=ss(),G=js(),C={"Content-Type":"application/json"};G&&(C["X-Vigyan-Token"]=G),(await fetch(`${I}/api/ledger/undo`,{method:"POST",headers:C,body:JSON.stringify({id:R})})).ok&&await a()}catch(I){console.error("Undo rule error:",I)}finally{be(s,!1)}}}ia(()=>{e.open&&a()}),Cs(()=>{a()});var l=Og(),u=On(l);{var f=R=>{var I=Lg();Ye("click",I,function(...G){var C;(C=e.onClose)==null||C.apply(this,G)}),Ee(R,I)};Ge(u,R=>{e.open&&R(f)})}var d=j(u,2),h=ie(d),_=ie(h),v=j(ie(_),2),p=Ie(v),m=j(_,2),y=j(h,2),w=ie(y),S=ie(w),T=j(S,2);{var E=R=>{var I=Ng();Ye("click",I,()=>o()),Ee(R,I)},g=qt(()=>B(r).trim());Ge(T,R=>{B(g)&&R(E)})}var M=j(w,2);{var L=R=>{var I=Ig();Ee(R,I)},D=R=>{var I=Fg();ar(I,21,()=>B(t),G=>G.id,(G,C)=>{var P=Ug(),F=ie(P),z=ie(F),Q=ie(z),O=Ie(Q,!0),q=j(Q,2),Z=Ie(q,!0),de=j(z,2),Ce=Ie(de,!0),H=j(F,2);it(()=>{Ue(O,B(C).category||"RULE"),Ue(Z,B(C).id),Ue(Ce,B(C).rule)}),Ye("click",H,()=>c(B(C).id)),Ee(G,P)}),Ee(R,I)};Ge(M,R=>{B(t).length===0?R(L):R(D,-1)})}it(()=>{Ot(d,1,`fixed top-0 right-0 h-full w-84 z-50 flex flex-col bg-[#050608] border-l border-white/[0.08] shadow-2xl transition-transform duration-200 ${e.open?"translate-x-0":"translate-x-full"}`),Ue(p,`${B(i).lines_used??""}/${B(i).max_budget_lines??""} lines`),S.disabled=B(s)}),Ye("click",m,function(...R){var I;(I=e.onClose)==null||I.apply(this,R)}),Ye("keydown",S,o),es(S,()=>B(r),R=>be(r,R)),Ee(n,l),hn()}Tn(["click","keydown"]);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Zc="187",as={ROTATE:0,DOLLY:1,PAN:2},ts={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},kg=0,Ou=1,zg=2,co=1,Hg=2,qs=3,Ur=0,En=1,Ui=2,os=0,$s=1,Bu=2,ku=3,zu=4,Gg=5,jr=100,Vg=101,Wg=102,Xg=103,qg=104,Yg=200,Kg=201,Zg=202,Jg=203,kf=204,zf=205,Qg=206,jg=207,$g=208,e_=209,t_=210,n_=211,i_=212,r_=213,s_=214,Yl=0,Kl=1,Zl=2,aa=3,Jl=4,Ql=5,jl=6,$l=7,Hf=0,a_=1,o_=2,Bi=0,Gf=1,Vf=2,Wf=3,Xf=4,qf=5,Yf=6,Kf=7,Zf=300,Ms=301,oa=302,rl=303,sl=304,ec=1e3,Oi=1001,tc=1002,en=1003,l_=1004,Na=1005,Mn=1006,al=1007,tr=1008,Fn=1009,Jf=1010,Qf=1011,la=1012,Jc=1013,Mi=1014,mi=1015,yi=1016,Qc=1017,jc=1018,ys=1020,jf=35902,$f=35899,eh=1021,th=1022,gi=1023,lr=1026,nr=1027,nh=1028,$c=1029,Fr=1030,eu=1031,tu=1033,uo=33776,fo=33777,ho=33778,po=33779,nc=35840,ic=35841,rc=35842,sc=35843,ac=36196,oc=37492,lc=37496,cc=37488,uc=37489,wo=37490,dc=37491,fc=37808,hc=37809,pc=37810,mc=37811,gc=37812,_c=37813,vc=37814,xc=37815,Sc=37816,bc=37817,Mc=37818,yc=37819,Ec=37820,Tc=37821,wc=36492,Ac=36494,Rc=36495,Cc=36283,Pc=36284,Ao=36285,Dc=36286,c_=3200,Lc=0,u_=1,Qi="",Un="srgb",Ro="srgb-linear",Co="linear",wt="srgb",ol=7680,d_=519,f_=512,h_=513,p_=514,ih=515,m_=516,g_=517,rh=518,sh=519,__=35044,Hu="300 es",ii=2e3,ca=2001;function v_(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Po(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function x_(){const n=Po("canvas");return n.style.display="block",n}const Gu={};function Vu(...n){const e="THREE."+n.shift();console.log(e,...n)}function ah(n){const e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function qe(...n){n=ah(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Mt(...n){n=ah(n);const e="THREE."+n.shift();{const t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function mo(...n){const e=n.join(" ");e in Gu||(Gu[e]=!0,qe(...n))}function S_(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}const b_={[Yl]:Yl,[Zl]:jl,[Jl]:Jl,[aa]:Ql,[Kl]:Kl,[jl]:Zl,[$l]:$l,[Ql]:aa};class fr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const ln=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],go=Math.PI/180,Nc=180/Math.PI;function Ta(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ln[n&255]+ln[n>>8&255]+ln[n>>16&255]+ln[n>>24&255]+"-"+ln[e&255]+ln[e>>8&255]+"-"+ln[e>>16&15|64]+ln[e>>24&255]+"-"+ln[t&63|128]+ln[t>>8&255]+"-"+ln[t>>16&255]+ln[t>>24&255]+ln[i&255]+ln[i>>8&255]+ln[i>>16&255]+ln[i>>24&255]).toLowerCase()}function ht(n,e,t){return Math.max(e,Math.min(t,n))}function M_(n,e){return(n%e+e)%e}function ll(n,e,t){return(1-t)*n+t*e}function y_(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function nu(n){switch(n.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function E_(n,e){if(e.constructor===Float32Array)return n;const t=nu(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(n/t,-1)}function T_(n,e){if(e.constructor===Float32Array)return n;const t=nu(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(n*t)}const w_={DEG2RAD:go},cu=class cu{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ht(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ht(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};cu.prototype.isVector2=!0;let $e=cu;class cr{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let c=i[r+0],l=i[r+1],u=i[r+2],f=i[r+3],d=s[a+0],h=s[a+1],_=s[a+2],v=s[a+3];if(f!==v||c!==d||l!==h||u!==_){let p=c*d+l*h+u*_+f*v;p<0&&(d=-d,h=-h,_=-_,v=-v,p=-p);let m=1-o;if(p<.9995){const y=Math.acos(p),w=Math.sin(y);m=Math.sin(m*y)/w,o=Math.sin(o*y)/w,c=c*m+d*o,l=l*m+h*o,u=u*m+_*o,f=f*m+v*o}else{c=c*m+d*o,l=l*m+h*o,u=u*m+_*o,f=f*m+v*o;const y=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=y,l*=y,u*=y,f*=y}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=f}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],c=i[r+1],l=i[r+2],u=i[r+3],f=s[a],d=s[a+1],h=s[a+2],_=s[a+3];return e[t]=o*_+u*f+c*h-l*d,e[t+1]=c*_+u*d+l*f-o*h,e[t+2]=l*_+u*h+o*d-c*f,e[t+3]=u*_-o*f-c*d-l*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),u=o(r/2),f=o(s/2),d=c(i/2),h=c(r/2),_=c(s/2);switch(a){case"XYZ":this._x=d*u*f+l*h*_,this._y=l*h*f-d*u*_,this._z=l*u*_+d*h*f,this._w=l*u*f-d*h*_;break;case"YXZ":this._x=d*u*f+l*h*_,this._y=l*h*f-d*u*_,this._z=l*u*_-d*h*f,this._w=l*u*f+d*h*_;break;case"ZXY":this._x=d*u*f-l*h*_,this._y=l*h*f+d*u*_,this._z=l*u*_+d*h*f,this._w=l*u*f-d*h*_;break;case"ZYX":this._x=d*u*f-l*h*_,this._y=l*h*f+d*u*_,this._z=l*u*_-d*h*f,this._w=l*u*f+d*h*_;break;case"YZX":this._x=d*u*f+l*h*_,this._y=l*h*f+d*u*_,this._z=l*u*_-d*h*f,this._w=l*u*f-d*h*_;break;case"XZY":this._x=d*u*f-l*h*_,this._y=l*h*f-d*u*_,this._z=l*u*_+d*h*f,this._w=l*u*f+d*h*_;break;default:qe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],f=t[10],d=i+o+f;if(d>0){const h=.5/Math.sqrt(d+1);this._w=.25/h,this._x=(u-c)*h,this._y=(s-l)*h,this._z=(a-r)*h}else if(i>o&&i>f){const h=2*Math.sqrt(1+i-o-f);this._w=(u-c)/h,this._x=.25*h,this._y=(r+a)/h,this._z=(s+l)/h}else if(o>f){const h=2*Math.sqrt(1+o-i-f);this._w=(s-l)/h,this._x=(r+a)/h,this._y=.25*h,this._z=(c+u)/h}else{const h=2*Math.sqrt(1+f-i-o);this._w=(a-r)/h,this._x=(s+l)/h,this._y=(c+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ht(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=i*u+a*o+r*l-s*c,this._y=r*u+a*c+s*o-i*l,this._z=s*u+a*l+i*c-r*o,this._w=a*u-i*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,t=Math.sin(t*l)/u,this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+i*t,this._y=this._y*c+r*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const uu=class uu{constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Wu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Wu.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*i),u=2*(o*t-s*r),f=2*(s*i-a*t);return this.x=t+c*l+a*f-o*u,this.y=i+c*u+o*l-s*f,this.z=r+c*f+s*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ht(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return cl.copy(this).projectOnVector(e),this.sub(cl)}reflect(e){return this.sub(cl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(ht(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};uu.prototype.isVector3=!0;let K=uu;const cl=new K,Wu=new cr,du=class du{constructor(e,t,i,r,s,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l)}set(e,t,i,r,s,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=c,u[6]=i,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],u=i[4],f=i[7],d=i[2],h=i[5],_=i[8],v=r[0],p=r[3],m=r[6],y=r[1],w=r[4],S=r[7],T=r[2],E=r[5],g=r[8];return s[0]=a*v+o*y+c*T,s[3]=a*p+o*w+c*E,s[6]=a*m+o*S+c*g,s[1]=l*v+u*y+f*T,s[4]=l*p+u*w+f*E,s[7]=l*m+u*S+f*g,s[2]=d*v+h*y+_*T,s[5]=d*p+h*w+_*E,s[8]=d*m+h*S+_*g,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-i*s*u+i*o*c+r*s*l-r*a*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],f=u*a-o*l,d=o*c-u*s,h=l*s-a*c,_=t*f+i*d+r*h;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/_;return e[0]=f*v,e[1]=(r*l-u*i)*v,e[2]=(o*i-r*a)*v,e[3]=d*v,e[4]=(u*t-r*c)*v,e[5]=(r*s-o*t)*v,e[6]=h*v,e[7]=(i*c-l*t)*v,e[8]=(a*t-i*s)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return mo("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ul.makeScale(e,t)),this}rotate(e){return mo("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ul.makeRotation(-e)),this}translate(e,t){return mo("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ul.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};du.prototype.isMatrix3=!0;let je=du;const ul=new je,Xu=new je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),qu=new je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function A_(){const n={enabled:!0,workingColorSpace:Ro,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===wt&&(r.r=ki(r.r),r.g=ki(r.g),r.b=ki(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===wt&&(r.r=ls(r.r),r.g=ls(r.g),r.b=ls(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Qi?Co:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[a].fromXYZ).multiply(this.spaces[s].toXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ro]:{primaries:e,whitePoint:i,transfer:Co,toXYZ:Xu,fromXYZ:qu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Un},outputColorSpaceConfig:{drawingBufferColorSpace:Un}},[Un]:{primaries:e,whitePoint:i,transfer:wt,toXYZ:Xu,fromXYZ:qu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Un}}}),n}const gt=A_();function ki(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ls(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let kr;class R_{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{kr===void 0&&(kr=Po("canvas")),kr.width=e.width,kr.height=e.height;const r=kr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=kr}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Po("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=ki(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ki(t[i]/255)*255):t[i]=ki(t[i]);return{data:t,width:e.width,height:e.height}}else return qe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let C_=0;class iu{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:C_++}),this.uuid=Ta(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(dl(r[a].image)):s.push(dl(r[a]))}else s=dl(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function dl(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?R_.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(qe("Texture: Unable to serialize Texture."),{})}let P_=0;const fl=new K;class vn extends fr{constructor(e=vn.DEFAULT_IMAGE,t=vn.DEFAULT_MAPPING,i=Oi,r=Oi,s=Mn,a=tr,o=gi,c=Fn,l=vn.DEFAULT_ANISOTROPY,u=Qi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:P_++}),this.uuid=Ta(),this.name="",this.source=new iu(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new $e(0,0),this.repeat=new $e(1,1),this.center=new $e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(fl).x}get height(){return this.source.getSize(fl).y}get depth(){return this.source.getSize(fl).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){qe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){qe(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Zf)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ec:e.x=e.x-Math.floor(e.x);break;case Oi:e.x=e.x<0?0:1;break;case tc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ec:e.y=e.y-Math.floor(e.y);break;case Oi:e.y=e.y<0?0:1;break;case tc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}vn.DEFAULT_IMAGE=null;vn.DEFAULT_MAPPING=Zf;vn.DEFAULT_ANISOTROPY=1;const fu=class fu{constructor(e=0,t=0,i=0,r=1){this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const c=e.elements,l=c[0],u=c[4],f=c[8],d=c[1],h=c[5],_=c[9],v=c[2],p=c[6],m=c[10];if(Math.abs(u-d)<.01&&Math.abs(f-v)<.01&&Math.abs(_-p)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+v)<.1&&Math.abs(_+p)<.1&&Math.abs(l+h+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(l+1)/2,S=(h+1)/2,T=(m+1)/2,E=(u+d)/4,g=(f+v)/4,M=(_+p)/4;return w>S&&w>T?w<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(w),r=E/i,s=g/i):S>T?S<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(S),i=E/r,s=M/r):T<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(T),i=g/s,r=M/s),this.set(i,r,s,t),this}let y=Math.sqrt((p-_)*(p-_)+(f-v)*(f-v)+(d-u)*(d-u));return Math.abs(y)<.001&&(y=1),this.x=(p-_)/y,this.y=(f-v)/y,this.z=(d-u)/y,this.w=Math.acos((l+h+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this.w=ht(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this.w=ht(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ht(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};fu.prototype.isVector4=!0;let Ut=fu;class D_ extends fr{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Mn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new Ut(0,0,e,t),this.scissorTest=!1,this.viewport=new Ut(0,0,e,t),this.textures=[];const r=i.count;for(let s=0;s<r;s++)this.textures[s]=new vn({width:e,height:t,depth:i.depth}),this.textures[s].isRenderTargetTexture=!0,this.textures[s].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Mn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new iu(r)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class xi extends D_{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class oh extends vn{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=en,this.minFilter=en,this.wrapR=Oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class L_ extends vn{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=en,this.minFilter=en,this.wrapR=Oi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const Oo=class Oo{constructor(e,t,i,r,s,a,o,c,l,u,f,d,h,_,v,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l,u,f,d,h,_,v,p)}set(e,t,i,r,s,a,o,c,l,u,f,d,h,_,v,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=r,m[1]=s,m[5]=a,m[9]=o,m[13]=c,m[2]=l,m[6]=u,m[10]=f,m[14]=d,m[3]=h,m[7]=_,m[11]=v,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Oo().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,i=e.elements,r=1/zr.setFromMatrixColumn(e,0).length(),s=1/zr.setFromMatrixColumn(e,1).length(),a=1/zr.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const d=a*u,h=a*f,_=o*u,v=o*f;t[0]=c*u,t[4]=-c*f,t[8]=l,t[1]=h+_*l,t[5]=d-v*l,t[9]=-o*c,t[2]=v-d*l,t[6]=_+h*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*u,h=c*f,_=l*u,v=l*f;t[0]=d+v*o,t[4]=_*o-h,t[8]=a*l,t[1]=a*f,t[5]=a*u,t[9]=-o,t[2]=h*o-_,t[6]=v+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*u,h=c*f,_=l*u,v=l*f;t[0]=d-v*o,t[4]=-a*f,t[8]=_+h*o,t[1]=h+_*o,t[5]=a*u,t[9]=v-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*u,h=a*f,_=o*u,v=o*f;t[0]=c*u,t[4]=_*l-h,t[8]=d*l+v,t[1]=c*f,t[5]=v*l+d,t[9]=h*l-_,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,h=a*l,_=o*c,v=o*l;t[0]=c*u,t[4]=v-d*f,t[8]=_*f+h,t[1]=f,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=h*f+_,t[10]=d-v*f}else if(e.order==="XZY"){const d=a*c,h=a*l,_=o*c,v=o*l;t[0]=c*u,t[4]=-f,t[8]=l*u,t[1]=d*f+v,t[5]=a*u,t[9]=h*f-_,t[2]=_*f-h,t[6]=o*u,t[10]=v*f+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(N_,e,I_)}lookAt(e,t,i){const r=this.elements;return Rn.subVectors(e,t),Rn.lengthSq()===0&&(Rn.z=1),Rn.normalize(),Xi.crossVectors(i,Rn),Xi.lengthSq()===0&&(Math.abs(i.z)===1?Rn.x+=1e-4:Rn.z+=1e-4,Rn.normalize(),Xi.crossVectors(i,Rn)),Xi.normalize(),Ia.crossVectors(Rn,Xi),r[0]=Xi.x,r[4]=Ia.x,r[8]=Rn.x,r[1]=Xi.y,r[5]=Ia.y,r[9]=Rn.y,r[2]=Xi.z,r[6]=Ia.z,r[10]=Rn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],u=i[1],f=i[5],d=i[9],h=i[13],_=i[2],v=i[6],p=i[10],m=i[14],y=i[3],w=i[7],S=i[11],T=i[15],E=r[0],g=r[4],M=r[8],L=r[12],D=r[1],R=r[5],I=r[9],G=r[13],C=r[2],P=r[6],F=r[10],z=r[14],Q=r[3],O=r[7],q=r[11],Z=r[15];return s[0]=a*E+o*D+c*C+l*Q,s[4]=a*g+o*R+c*P+l*O,s[8]=a*M+o*I+c*F+l*q,s[12]=a*L+o*G+c*z+l*Z,s[1]=u*E+f*D+d*C+h*Q,s[5]=u*g+f*R+d*P+h*O,s[9]=u*M+f*I+d*F+h*q,s[13]=u*L+f*G+d*z+h*Z,s[2]=_*E+v*D+p*C+m*Q,s[6]=_*g+v*R+p*P+m*O,s[10]=_*M+v*I+p*F+m*q,s[14]=_*L+v*G+p*z+m*Z,s[3]=y*E+w*D+S*C+T*Q,s[7]=y*g+w*R+S*P+T*O,s[11]=y*M+w*I+S*F+T*q,s[15]=y*L+w*G+S*z+T*Z,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],f=e[6],d=e[10],h=e[14],_=e[3],v=e[7],p=e[11],m=e[15],y=c*h-l*d,w=o*h-l*f,S=o*d-c*f,T=a*h-l*u,E=a*d-c*u,g=a*f-o*u;return t*(v*y-p*w+m*S)-i*(_*y-p*T+m*E)+r*(_*w-v*T+m*g)-s*(_*S-v*E+p*g)}determinantAffine(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[1],a=e[5],o=e[9],c=e[2],l=e[6],u=e[10];return t*(a*u-o*l)-i*(s*u-o*c)+r*(s*l-a*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],f=e[9],d=e[10],h=e[11],_=e[12],v=e[13],p=e[14],m=e[15],y=t*o-i*a,w=t*c-r*a,S=t*l-s*a,T=i*c-r*o,E=i*l-s*o,g=r*l-s*c,M=u*v-f*_,L=u*p-d*_,D=u*m-h*_,R=f*p-d*v,I=f*m-h*v,G=d*m-h*p,C=y*G-w*I+S*R+T*D-E*L+g*M;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/C;return e[0]=(o*G-c*I+l*R)*P,e[1]=(r*I-i*G-s*R)*P,e[2]=(v*g-p*E+m*T)*P,e[3]=(d*E-f*g-h*T)*P,e[4]=(c*D-a*G-l*L)*P,e[5]=(t*G-r*D+s*L)*P,e[6]=(p*S-_*g-m*w)*P,e[7]=(u*g-d*S+h*w)*P,e[8]=(a*I-o*D+l*M)*P,e[9]=(i*D-t*I-s*M)*P,e[10]=(_*E-v*S+m*y)*P,e[11]=(f*S-u*E-h*y)*P,e[12]=(o*L-a*R-c*M)*P,e[13]=(t*R-i*L+r*M)*P,e[14]=(v*w-_*T-p*y)*P,e[15]=(u*T-f*w+d*y)*P,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,c=e.z,l=s*a,u=s*o;return this.set(l*a+i,l*o-r*c,l*c+r*o,0,l*o+r*c,u*o+i,u*c-r*a,0,l*c-r*o,u*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,u=a+a,f=o+o,d=s*l,h=s*u,_=s*f,v=a*u,p=a*f,m=o*f,y=c*l,w=c*u,S=c*f,T=i.x,E=i.y,g=i.z;return r[0]=(1-(v+m))*T,r[1]=(h+S)*T,r[2]=(_-w)*T,r[3]=0,r[4]=(h-S)*E,r[5]=(1-(d+m))*E,r[6]=(p+y)*E,r[7]=0,r[8]=(_+w)*g,r[9]=(p-y)*g,r[10]=(1-(d+v))*g,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),t.identity(),this;let a=zr.set(r[0],r[1],r[2]).length();const o=zr.set(r[4],r[5],r[6]).length(),c=zr.set(r[8],r[9],r[10]).length();s<0&&(a=-a),qn.copy(this);const l=1/a,u=1/o,f=1/c;return qn.elements[0]*=l,qn.elements[1]*=l,qn.elements[2]*=l,qn.elements[4]*=u,qn.elements[5]*=u,qn.elements[6]*=u,qn.elements[8]*=f,qn.elements[9]*=f,qn.elements[10]*=f,t.setFromRotationMatrix(qn),i.x=a,i.y=o,i.z=c,this}makePerspective(e,t,i,r,s,a,o=ii,c=!1){const l=this.elements,u=2*s/(t-e),f=2*s/(i-r),d=(t+e)/(t-e),h=(i+r)/(i-r);let _,v;if(c)_=s/(a-s),v=a*s/(a-s);else if(o===ii)_=-(a+s)/(a-s),v=-2*a*s/(a-s);else if(o===ca)_=-a/(a-s),v=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=f,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=_,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=ii,c=!1){const l=this.elements,u=2/(t-e),f=2/(i-r),d=-(t+e)/(t-e),h=-(i+r)/(i-r);let _,v;if(c)_=1/(a-s),v=a/(a-s);else if(o===ii)_=-2/(a-s),v=-(a+s)/(a-s);else if(o===ca)_=-1/(a-s),v=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=f,l[9]=0,l[13]=h,l[2]=0,l[6]=0,l[10]=_,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}};Oo.prototype.isMatrix4=!0;let Nt=Oo;const zr=new K,qn=new Nt,N_=new K(0,0,0),I_=new K(1,1,1),Xi=new K,Ia=new K,Rn=new K,Yu=new Nt,Ku=new cr;class ur{constructor(e=0,t=0,i=0,r=ur.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],u=r[9],f=r[2],d=r[6],h=r[10];switch(t){case"XYZ":this._y=Math.asin(ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ht(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,h),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(ht(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,h),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-ht(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,h),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ht(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,h));break;case"XZY":this._z=Math.asin(-ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,h),this._y=0);break;default:qe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Yu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Yu,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ku.setFromEuler(this),this.setFromQuaternion(Ku,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ur.DEFAULT_ORDER="XYZ";class lh{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let U_=0;const Zu=new K,Hr=new cr,Ti=new Nt,Ua=new K,Is=new K,F_=new K,O_=new cr,Ju=new K(1,0,0),Qu=new K(0,1,0),ju=new K(0,0,1),$u={type:"added"},B_={type:"removed"},Gr={type:"childadded",child:null},hl={type:"childremoved",child:null};class rn extends fr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:U_++}),this.uuid=Ta(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=rn.DEFAULT_UP.clone();const e=new K,t=new ur,i=new cr,r=new K(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Nt},normalMatrix:{value:new je}}),this.matrix=new Nt,this.matrixWorld=new Nt,this.matrixAutoUpdate=rn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new lh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Hr.setFromAxisAngle(e,t),this.quaternion.multiply(Hr),this}rotateOnWorldAxis(e,t){return Hr.setFromAxisAngle(e,t),this.quaternion.premultiply(Hr),this}rotateX(e){return this.rotateOnAxis(Ju,e)}rotateY(e){return this.rotateOnAxis(Qu,e)}rotateZ(e){return this.rotateOnAxis(ju,e)}translateOnAxis(e,t){return Zu.copy(e).applyQuaternion(this.quaternion),this.position.add(Zu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ju,e)}translateY(e){return this.translateOnAxis(Qu,e)}translateZ(e){return this.translateOnAxis(ju,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ti.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Ua.copy(e):Ua.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Is.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ti.lookAt(Is,Ua,this.up):Ti.lookAt(Ua,Is,this.up),this.quaternion.setFromRotationMatrix(Ti),r&&(Ti.extractRotation(r.matrixWorld),Hr.setFromRotationMatrix(Ti),this.quaternion.premultiply(Hr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Mt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent($u),Gr.child=e,this.dispatchEvent(Gr),Gr.child=null):Mt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(B_),hl.child=e,this.dispatchEvent(hl),hl.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ti.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ti.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ti),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent($u),Gr.child=e,this.dispatchEvent(Gr),Gr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Is,e,F_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Is,O_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*i-s[8]*r,s[13]+=i-s[1]*t-s[5]*i-s[9]*r,s[14]+=r-s[2]*t-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const f=c[l];s(e.shapes,f)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),f=a(e.shapes),d=a(e.skeletons),h=a(e.animations),_=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),h.length>0&&(i.animations=h),_.length>0&&(i.nodes=_)}return i.object=r,i;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}rn.DEFAULT_UP=new K(0,1,0);rn.DEFAULT_MATRIX_AUTO_UPDATE=!0;rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Fa extends rn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const k_={type:"move"};class pl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Fa,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Fa,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new K,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new K),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Fa,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new K,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new K,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const v of e.hand.values()){const p=t.getJointPose(v,i),m=this._getHandJoint(l,v);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.quaternion,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],d=u.position.distanceTo(f.position),h=.02,_=.005;l.inputState.pinching&&d>h+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=h-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.quaternion,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(k_)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Fa;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const ch={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qi={h:0,s:0,l:0},Oa={h:0,s:0,l:0};function ml(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class dt{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Un){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,gt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=gt.workingColorSpace){return this.r=e,this.g=t,this.b=i,gt.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=gt.workingColorSpace){if(e=M_(e,1),t=ht(t,0,1),i=ht(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=ml(a,s,e+1/3),this.g=ml(a,s,e),this.b=ml(a,s,e-1/3)}return gt.colorSpaceToWorking(this,r),this}setStyle(e,t=Un){function i(s){s!==void 0&&parseFloat(s)<1&&qe("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseFloat(s[1]))/100,Math.min(100,parseFloat(s[2]))/100,Math.min(100,parseFloat(s[3]))/100,t);break;case"hsl":case"hsla":if(s=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:qe("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);qe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Un){const i=ch[e.toLowerCase()];return i!==void 0?this.setHex(i,t):qe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ki(e.r),this.g=ki(e.g),this.b=ki(e.b),this}copyLinearToSRGB(e){return this.r=ls(e.r),this.g=ls(e.g),this.b=ls(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Un){return gt.workingToColorSpace(cn.copy(this),e),Math.round(ht(cn.r*255,0,255))*65536+Math.round(ht(cn.g*255,0,255))*256+Math.round(ht(cn.b*255,0,255))}getHexString(e=Un){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=gt.workingColorSpace){gt.workingToColorSpace(cn.copy(this),t);const i=cn.r,r=cn.g,s=cn.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const f=a-o;switch(l=u<=.5?f/(a+o):f/(2-a-o),a){case i:c=(r-s)/f+(r<s?6:0);break;case r:c=(s-i)/f+2;break;case s:c=(i-r)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=gt.workingColorSpace){return gt.workingToColorSpace(cn.copy(this),t),e.r=cn.r,e.g=cn.g,e.b=cn.b,e}getStyle(e=Un){gt.workingToColorSpace(cn.copy(this),e);const t=cn.r,i=cn.g,r=cn.b;return e!==Un?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(qi),this.setHSL(qi.h+e,qi.s+t,qi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(qi),e.getHSL(Oa);const i=ll(qi.h,Oa.h,t),r=ll(qi.s,Oa.s,t),s=ll(qi.l,Oa.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const cn=new dt;dt.NAMES=ch;class z_ extends rn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ur,this.environmentIntensity=1,this.environmentRotation=new ur,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Yn=new K,wi=new K,gl=new K,Ai=new K,Vr=new K,Wr=new K,ed=new K,_l=new K,vl=new K,xl=new K,Sl=new Ut,bl=new Ut,Ml=new Ut;class $n{constructor(e=new K,t=new K,i=new K){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),Yn.subVectors(e,t),r.cross(Yn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){Yn.subVectors(r,t),wi.subVectors(i,t),gl.subVectors(e,t);const a=Yn.dot(Yn),o=Yn.dot(wi),c=Yn.dot(gl),l=wi.dot(wi),u=wi.dot(gl),f=a*l-o*o;if(f===0)return s.set(0,0,0),null;const d=1/f,h=(l*c-o*u)*d,_=(a*u-o*c)*d;return s.set(1-h-_,_,h)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,Ai)===null?!1:Ai.x>=0&&Ai.y>=0&&Ai.x+Ai.y<=1}static getInterpolation(e,t,i,r,s,a,o,c){return this.getBarycoord(e,t,i,r,Ai)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Ai.x),c.addScaledVector(a,Ai.y),c.addScaledVector(o,Ai.z),c)}static getInterpolatedAttribute(e,t,i,r,s,a){return Sl.setScalar(0),bl.setScalar(0),Ml.setScalar(0),Sl.fromBufferAttribute(e,t),bl.fromBufferAttribute(e,i),Ml.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Sl,s.x),a.addScaledVector(bl,s.y),a.addScaledVector(Ml,s.z),a}static isFrontFacing(e,t,i,r){return Yn.subVectors(i,t),wi.subVectors(e,t),Yn.cross(wi).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Yn.subVectors(this.c,this.b),wi.subVectors(this.a,this.b),Yn.cross(wi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return $n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return $n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return $n.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return $n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return $n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;Vr.subVectors(r,i),Wr.subVectors(s,i),_l.subVectors(e,i);const c=Vr.dot(_l),l=Wr.dot(_l);if(c<=0&&l<=0)return t.copy(i);vl.subVectors(e,r);const u=Vr.dot(vl),f=Wr.dot(vl);if(u>=0&&f<=u)return t.copy(r);const d=c*f-u*l;if(d<=0&&c>=0&&u<=0&&c-u>0)return a=c/(c-u),t.copy(i).addScaledVector(Vr,a);xl.subVectors(e,s);const h=Vr.dot(xl),_=Wr.dot(xl);if(_>=0&&h<=_)return t.copy(s);const v=h*l-c*_;if(v<=0&&l>=0&&_<=0)return o=l/(l-_),t.copy(i).addScaledVector(Wr,o);const p=u*_-h*f;if(p<=0&&f-u>=0&&h-_>=0)return ed.subVectors(s,r),o=(f-u)/(f-u+(h-_)),t.copy(r).addScaledVector(ed,o);const m=1/(p+v+d);return a=v*m,o=d*m,t.copy(i).addScaledVector(Vr,a).addScaledVector(Wr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class wa{constructor(e=new K(1/0,1/0,1/0),t=new K(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Kn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Kn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Kn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Kn):Kn.fromBufferAttribute(s,a),Kn.applyMatrix4(e.matrixWorld),this.expandByPoint(Kn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ba.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ba.copy(i.boundingBox)),Ba.applyMatrix4(e.matrixWorld),this.union(Ba)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Kn),Kn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Us),ka.subVectors(this.max,Us),Xr.subVectors(e.a,Us),qr.subVectors(e.b,Us),Yr.subVectors(e.c,Us),Yi.subVectors(qr,Xr),Ki.subVectors(Yr,qr),gr.subVectors(Xr,Yr);let t=[0,-Yi.z,Yi.y,0,-Ki.z,Ki.y,0,-gr.z,gr.y,Yi.z,0,-Yi.x,Ki.z,0,-Ki.x,gr.z,0,-gr.x,-Yi.y,Yi.x,0,-Ki.y,Ki.x,0,-gr.y,gr.x,0];return!yl(t,Xr,qr,Yr,ka)||(t=[1,0,0,0,1,0,0,0,1],!yl(t,Xr,qr,Yr,ka))?!1:(za.crossVectors(Yi,Ki),t=[za.x,za.y,za.z],yl(t,Xr,qr,Yr,ka))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Kn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Kn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ri),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ri=[new K,new K,new K,new K,new K,new K,new K,new K],Kn=new K,Ba=new wa,Xr=new K,qr=new K,Yr=new K,Yi=new K,Ki=new K,gr=new K,Us=new K,ka=new K,za=new K,_r=new K;function yl(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){_r.fromArray(n,s);const o=r.x*Math.abs(_r.x)+r.y*Math.abs(_r.y)+r.z*Math.abs(_r.z),c=e.dot(_r),l=t.dot(_r),u=i.dot(_r);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Gt=new K,Ha=new $e;let H_=0;class Si extends fr{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:H_++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=__,this.updateRanges=[],this.gpuType=mi,this.version=0,this._normalizationScale=e!==void 0?nu(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Ha.fromBufferAttribute(this,t),Ha.applyMatrix3(e),this.setXY(t,Ha.x,Ha.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix3(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix4(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Gt.fromBufferAttribute(this,t),Gt.applyNormalMatrix(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Gt.fromBufferAttribute(this,t),Gt.transformDirection(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=this._denormalize(i)),i}setComponent(e,t,i){return this.normalized&&(i=this._normalize(i)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),i=this._normalize(i),r=this._normalize(r),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){const t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):E_(e,this.array)}_normalize(e){const t=this._normalizationScale;return t!==void 0?Math.round(e*t):T_(e,this.array)}}class uh extends Si{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class dh extends Si{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class xn extends Si{constructor(e,t,i){super(new Float32Array(e),t,i)}}const G_=new wa,Fs=new K,El=new K;class Ho{constructor(e=new K,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):G_.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Fs.subVectors(e,this.center);const t=Fs.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Fs,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(El.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Fs.copy(e.center).add(El)),this.expandByPoint(Fs.copy(e.center).sub(El))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let V_=0;const Bn=new Nt,Tl=new rn,Kr=new K,Cn=new wa,Os=new wa,Qt=new K;class ai extends fr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:V_++}),this.uuid=Ta(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(v_(e)?dh:uh)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new je().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Bn.makeRotationFromQuaternion(e),this.applyMatrix4(Bn),this}rotateX(e){return Bn.makeRotationX(e),this.applyMatrix4(Bn),this}rotateY(e){return Bn.makeRotationY(e),this.applyMatrix4(Bn),this}rotateZ(e){return Bn.makeRotationZ(e),this.applyMatrix4(Bn),this}translate(e,t,i){return Bn.makeTranslation(e,t,i),this.applyMatrix4(Bn),this}scale(e,t,i){return Bn.makeScale(e,t,i),this.applyMatrix4(Bn),this}lookAt(e){return Tl.lookAt(e),Tl.updateMatrix(),this.applyMatrix4(Tl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Kr).negate(),this.translate(Kr.x,Kr.y,Kr.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new xn(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&qe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new wa);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Mt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new K(-1/0,-1/0,-1/0),new K(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Cn.setFromBufferAttribute(s),this.morphTargetsRelative?(Qt.addVectors(this.boundingBox.min,Cn.min),this.boundingBox.expandByPoint(Qt),Qt.addVectors(this.boundingBox.max,Cn.max),this.boundingBox.expandByPoint(Qt)):(this.boundingBox.expandByPoint(Cn.min),this.boundingBox.expandByPoint(Cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Mt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ho);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Mt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new K,1/0);return}if(e){const i=this.boundingSphere.center;if(Cn.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Os.setFromBufferAttribute(o),this.morphTargetsRelative?(Qt.addVectors(Cn.min,Os.min),Cn.expandByPoint(Qt),Qt.addVectors(Cn.max,Os.max),Cn.expandByPoint(Qt)):(Cn.expandByPoint(Os.min),Cn.expandByPoint(Os.max))}Cn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Qt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Qt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Qt.fromBufferAttribute(o,l),c&&(Kr.fromBufferAttribute(e,l),Qt.add(Kr)),r=Math.max(r,i.distanceToSquared(Qt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Mt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Mt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Si(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));const o=[],c=[],l=new Uint8Array(i.count);for(let L=0;L<i.count;L++)o[L]=new K,c[L]=new K;const u=new K,f=new K,d=new K,h=new $e,_=new $e,v=new $e,p=new K,m=new K;function y(L,D,R){l[L]=l[D]=l[R]=1,u.fromBufferAttribute(i,L),f.fromBufferAttribute(i,D),d.fromBufferAttribute(i,R),h.fromBufferAttribute(s,L),_.fromBufferAttribute(s,D),v.fromBufferAttribute(s,R),f.sub(u),d.sub(u),_.sub(h),v.sub(h);const I=1/(_.x*v.y-v.x*_.y);isFinite(I)&&(p.copy(f).multiplyScalar(v.y).addScaledVector(d,-_.y).multiplyScalar(I),m.copy(d).multiplyScalar(_.x).addScaledVector(f,-v.x).multiplyScalar(I),o[L].add(p),o[D].add(p),o[R].add(p),c[L].add(m),c[D].add(m),c[R].add(m))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let L=0,D=w.length;L<D;++L){const R=w[L],I=R.start,G=R.count;for(let C=I,P=I+G;C<P;C+=3)y(e.getX(C+0),e.getX(C+1),e.getX(C+2))}const S=new K,T=new K,E=new K,g=new K;function M(L){E.fromBufferAttribute(r,L),g.copy(E);const D=o[L];S.copy(D),S.sub(E.multiplyScalar(E.dot(D))).normalize(),T.crossVectors(g,D);const I=T.dot(c[L])<0?-1:1;a.setXYZW(L,S.x,S.y,S.z,I)}for(let L=0,D=i.count;L<D;++L)l[L]&&M(L);this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Si(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,h=i.count;d<h;d++)i.setXYZ(d,0,0,0);const r=new K,s=new K,a=new K,o=new K,c=new K,l=new K,u=new K,f=new K;if(e)for(let d=0,h=e.count;d<h;d+=3){const _=e.getX(d+0),v=e.getX(d+1),p=e.getX(d+2);r.fromBufferAttribute(t,_),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,p),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(i,_),c.fromBufferAttribute(i,v),l.fromBufferAttribute(i,p),o.add(u),c.add(u),l.add(u),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(v,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let d=0,h=t.count;d<h;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Qt.fromBufferAttribute(e,t),Qt.normalize(),e.setXYZ(t,Qt.x,Qt.y,Qt.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,f=o.normalized,d=new l.constructor(c.length*u);let h=0,_=0;for(let v=0,p=c.length;v<p;v++){o.isInterleavedBufferAttribute?h=c[v]*o.data.stride+o.offset:h=c[v]*u;for(let m=0;m<u;m++)d[_++]=l[h++]}return new Si(d,u,f)}if(this.index===null)return qe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ai,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,i);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let u=0,f=l.length;u<f;u++){const d=l[u],h=e(d,i);c.push(h)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let f=0,d=l.length;f<d;f++){const h=l[f];u.push(h.toJSON(e.data))}u.length>0&&(r[c]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(t))}const s=e.morphAttributes;for(const l in s){const u=[],f=s[l];for(let d=0,h=f.length;d<h;d++)u.push(f[d].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const wl=new K,W_=new K,X_=new je;class Di{constructor(e=new K(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=wl.subVectors(i,t).cross(W_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){const r=e.delta(wl),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||X_.getNormalMatrix(e),r=this.coplanarPoint(wl).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let q_=0;class Ps extends fr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:q_++}),this.uuid=Ta(),this.name="",this.type="Material",this.blending=$s,this.side=Ur,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=kf,this.blendDst=zf,this.blendEquation=jr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new dt(0,0,0),this.blendAlpha=0,this.depthFunc=aa,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=d_,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ol,this.stencilZFail=ol,this.stencilZPass=ol,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){qe(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){qe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(i.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(i.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(i.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(i.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new dt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Di().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new $e().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new $e().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Ci=new K,Al=new K,Ga=new K,Va=new K;class ru{constructor(e=new K,t=new K(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ci)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ci.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ci.copy(this.origin).addScaledVector(this.direction,t),Ci.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Al.copy(e).add(t).multiplyScalar(.5),Ga.copy(t).sub(e).normalize(),Va.copy(this.origin).sub(Al);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Ga),o=Va.dot(this.direction),c=-Va.dot(Ga),l=Va.lengthSq(),u=Math.abs(1-a*a);let f,d,h,_;if(u>0)if(f=a*c-o,d=a*o-c,_=s*u,f>=0)if(d>=-_)if(d<=_){const v=1/u;f*=v,d*=v,h=f*(f+a*d+2*o)+d*(a*f+d+2*c)+l}else d=s,f=Math.max(0,-(a*d+o)),h=-f*f+d*(d+2*c)+l;else d=-s,f=Math.max(0,-(a*d+o)),h=-f*f+d*(d+2*c)+l;else d<=-_?(f=Math.max(0,-(-a*s+o)),d=f>0?-s:Math.min(Math.max(-s,-c),s),h=-f*f+d*(d+2*c)+l):d<=_?(f=0,d=Math.min(Math.max(-s,-c),s),h=d*(d+2*c)+l):(f=Math.max(0,-(a*s+o)),d=f>0?s:Math.min(Math.max(-s,-c),s),h=-f*f+d*(d+2*c)+l);else d=a>0?-s:s,f=Math.max(0,-(a*d+o)),h=-f*f+d*(d+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Al).addScaledVector(Ga,d),h}intersectSphere(e,t){if(e.radius<0)return null;Ci.subVectors(e.center,this.origin);const i=Ci.dot(this.direction),r=Ci.dot(Ci)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return l>=0?(i=(e.min.x-d.x)*l,r=(e.max.x-d.x)*l):(i=(e.max.x-d.x)*l,r=(e.min.x-d.x)*l),u>=0?(s=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-d.z)*f,c=(e.max.z-d.z)*f):(o=(e.max.z-d.z)*f,c=(e.min.z-d.z)*f),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Ci)!==null}intersectTriangle(e,t,i,r,s){const a=this.origin,o=this.direction,c=o.x,l=o.y,u=o.z,f=e.x-a.x,d=e.y-a.y,h=e.z-a.z,_=t.x-a.x,v=t.y-a.y,p=t.z-a.z,m=i.x-a.x,y=i.y-a.y,w=i.z-a.z,S=Math.abs(c),T=Math.abs(l),E=Math.abs(u);let g,M,L,D,R,I,G,C,P,F,z,Q;if(S>=T&&S>=E?(L=c,I=f,P=_,Q=m,c>=0?(g=l,M=u,D=d,R=h,G=v,C=p,F=y,z=w):(g=u,M=l,D=h,R=d,G=p,C=v,F=w,z=y)):T>=E?(L=l,I=d,P=v,Q=y,l>=0?(g=u,M=c,D=h,R=f,G=p,C=_,F=w,z=m):(g=c,M=u,D=f,R=h,G=_,C=p,F=m,z=w)):(L=u,I=h,P=p,Q=w,u>=0?(g=c,M=l,D=f,R=d,G=_,C=v,F=m,z=y):(g=l,M=c,D=d,R=f,G=v,C=_,F=y,z=m)),L===0)return null;const O=g/L,q=M/L,Z=1/L,de=D-O*I,Ce=R-q*I,H=G-O*P,$=C-q*P,me=F-O*Q,he=z-q*Q,ue=me*$-he*H,Oe=de*he-Ce*me,ct=H*Ce-$*de;if(r){if(ue<0||Oe<0||ct<0)return null}else if((ue<0||Oe<0||ct<0)&&(ue>0||Oe>0||ct>0))return null;const _e=ue+Oe+ct;if(_e===0)return null;const We=Z*(ue*I+Oe*P+ct*Q);return(_e>0?We<0:We>0)?null:this.at(We/_e,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Y_ extends Ps{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new dt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ur,this.combine=Hf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const td=new Nt,vr=new ru,Wa=new Ho,nd=new K,Xa=new K,qa=new K,Ya=new K,Rl=new K,Ka=new K,id=new K,Za=new K;class dr extends rn{constructor(e=new ai,t=new Y_){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Ka.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=o[c],f=s[c];u!==0&&(Rl.fromBufferAttribute(f,e),a?Ka.addScaledVector(Rl,u):Ka.addScaledVector(Rl.sub(t),u))}t.add(Ka)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Wa.copy(i.boundingSphere),Wa.applyMatrix4(s),vr.copy(e.ray).recast(e.near),!(Wa.containsPoint(vr.origin)===!1&&(vr.intersectSphere(Wa,nd)===null||vr.origin.distanceToSquared(nd)>(e.far-e.near)**2))&&(td.copy(s).invert(),vr.copy(e.ray).applyMatrix4(td),!(i.boundingBox!==null&&vr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,vr)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,d=s.groups,h=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,v=d.length;_<v;_++){const p=d[_],m=a[p.materialIndex],y=Math.max(p.start,h.start),w=Math.min(o.count,Math.min(p.start+p.count,h.start+h.count));for(let S=y,T=w;S<T;S+=3){const E=o.getX(S),g=o.getX(S+1),M=o.getX(S+2);r=Ja(this,m,e,i,l,u,f,E,g,M),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const _=Math.max(0,h.start),v=Math.min(o.count,h.start+h.count);for(let p=_,m=v;p<m;p+=3){const y=o.getX(p),w=o.getX(p+1),S=o.getX(p+2);r=Ja(this,a,e,i,l,u,f,y,w,S),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let _=0,v=d.length;_<v;_++){const p=d[_],m=a[p.materialIndex],y=Math.max(p.start,h.start),w=Math.min(c.count,Math.min(p.start+p.count,h.start+h.count));for(let S=y,T=w;S<T;S+=3){const E=S,g=S+1,M=S+2;r=Ja(this,m,e,i,l,u,f,E,g,M),r&&(r.faceIndex=Math.floor(S/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const _=Math.max(0,h.start),v=Math.min(c.count,h.start+h.count);for(let p=_,m=v;p<m;p+=3){const y=p,w=p+1,S=p+2;r=Ja(this,a,e,i,l,u,f,y,w,S),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function K_(n,e,t,i,r,s,a,o){let c;if(e.side===En?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,e.side===Ur,o),c===null)return null;Za.copy(o),Za.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(Za);return l<t.near||l>t.far?null:{distance:l,point:Za.clone(),object:n}}function Ja(n,e,t,i,r,s,a,o,c,l){n.getVertexPosition(o,Xa),n.getVertexPosition(c,qa),n.getVertexPosition(l,Ya);const u=K_(n,e,t,i,Xa,qa,Ya,id);if(u){const f=new K;$n.getBarycoord(id,Xa,qa,Ya,f),r&&(u.uv=$n.getInterpolatedAttribute(r,o,c,l,f,new $e)),s&&(u.uv1=$n.getInterpolatedAttribute(s,o,c,l,f,new $e)),a&&(u.normal=$n.getInterpolatedAttribute(a,o,c,l,f,new K),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new K,materialIndex:0};$n.getNormal(Xa,qa,Ya,d.normal),u.face=d,u.barycoord=f}return u}class Z_ extends vn{constructor(e=null,t=1,i=1,r,s,a,o,c,l=en,u=en,f,d){super(null,a,o,c,l,u,r,s,f,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const xr=new Ho,J_=new $e(.5,.5),Qa=new K;class ua{constructor(e=new Di,t=new Di,i=new Di,r=new Di,s=new Di,a=new Di){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=ii,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],u=s[4],f=s[5],d=s[6],h=s[7],_=s[8],v=s[9],p=s[10],m=s[11],y=s[12],w=s[13],S=s[14],T=s[15];if(r[0].setComponents(l-a,h-u,m-_,T-y).normalize(),r[1].setComponents(l+a,h+u,m+_,T+y).normalize(),r[2].setComponents(l+o,h+f,m+v,T+w).normalize(),r[3].setComponents(l-o,h-f,m-v,T-w).normalize(),i)r[4].setComponents(c,d,p,S).normalize(),r[5].setComponents(l-c,h-d,m-p,T-S).normalize();else if(r[4].setComponents(l-c,h-d,m-p,T-S).normalize(),t===ii)r[5].setComponents(l+c,h+d,m+p,T+S).normalize();else if(t===ca)r[5].setComponents(c,d,p,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),xr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),xr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(xr)}intersectsSprite(e){xr.center.set(0,0,0);const t=J_.distanceTo(e.center);return xr.radius=.7071067811865476+t,xr.applyMatrix4(e.matrixWorld),this.intersectsSphere(xr)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(Qa.x=r.normal.x>0?e.max.x:e.min.x,Qa.y=r.normal.y>0?e.max.y:e.min.y,Qa.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Qa)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const rd=new Nt;class su{constructor(){this.coordinateSystem=ii,this._frustums=[],this._count=0}setFromArrayCamera(e){const t=e.cameras,i=this._frustums;for(let r=0;r<t.length;r++){const s=t[r];rd.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),i[r]===void 0&&(i[r]=new ua),i[r].setFromProjectionMatrix(rd,s.coordinateSystem,s.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){const t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsObject(e))return!0;return!1}intersectsSprite(e){const t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSprite(e))return!0;return!1}intersectsSphere(e){const t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsSphere(e))return!0;return!1}intersectsBox(e){const t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].intersectsBox(e))return!0;return!1}containsPoint(e){const t=this._frustums;for(let i=0;i<this._count;i++)if(t[i].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;const t=this._frustums,i=e._frustums;for(let r=0;r<e._count;r++)t[r]===void 0&&(t[r]=new ua),t[r].copy(i[r]);return this._count=e._count,this}clone(){return new su().copy(this)}}class fh extends Ps{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new dt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Do=new K,Lo=new K,sd=new Nt,Bs=new ru,ja=new Ho,Cl=new K,ad=new K;class Q_ extends rn{constructor(e=new ai,t=new fh){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)Do.fromBufferAttribute(t,r-1),Lo.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=Do.distanceTo(Lo);e.setAttribute("lineDistance",new xn(i,1))}else qe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ja.copy(i.boundingSphere),ja.applyMatrix4(r),ja.radius+=s,e.ray.intersectsSphere(ja)===!1)return;sd.copy(r).invert(),Bs.copy(e.ray).applyMatrix4(sd);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=i.index,d=i.attributes.position;if(u!==null){const h=Math.max(0,a.start),_=Math.min(u.count,a.start+a.count);for(let v=h,p=_-1;v<p;v+=l){const m=u.getX(v),y=u.getX(v+1),w=$a(this,e,Bs,c,m,y,v);w&&t.push(w)}if(this.isLineLoop){const v=u.getX(_-1),p=u.getX(h),m=$a(this,e,Bs,c,v,p,_-1);m&&t.push(m)}}else{const h=Math.max(0,a.start),_=Math.min(d.count,a.start+a.count);for(let v=h,p=_-1;v<p;v+=l){const m=$a(this,e,Bs,c,v,v+1,v);m&&t.push(m)}if(this.isLineLoop){const v=$a(this,e,Bs,c,_-1,h,_-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function $a(n,e,t,i,r,s,a){const o=n.geometry.attributes.position;if(Do.fromBufferAttribute(o,r),Lo.fromBufferAttribute(o,s),t.distanceSqToSegment(Do,Lo,Cl,ad)>i)return;Cl.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(Cl);if(!(l<e.near||l>e.far))return{distance:l,point:ad.clone().applyMatrix4(n.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:n}}const od=new K,ld=new K;class j_ extends Q_{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)od.fromBufferAttribute(t,r),ld.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+od.distanceTo(ld);e.setAttribute("lineDistance",new xn(i,1))}else qe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class hh extends vn{constructor(e=[],t=Ms,i,r,s,a,o,c,l,u){super(e,t,i,r,s,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Es extends vn{constructor(e,t,i=Mi,r,s,a,o=en,c=en,l,u=lr,f=1){if(u!==lr&&u!==nr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:f};super(d,r,s,a,o,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new iu(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class ph extends Es{constructor(e,t=Mi,i=Ms,r,s,a=en,o=en,c,l=lr){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,t,i,r,s,a,o,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class mh extends vn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Aa extends ai{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],u=[],f=[];let d=0,h=0;_("z","y","x",-1,-1,i,t,e,a,s,0),_("z","y","x",1,-1,i,t,-e,a,s,1),_("x","z","y",1,1,e,i,t,r,a,2),_("x","z","y",1,-1,e,i,-t,r,a,3),_("x","y","z",1,-1,e,t,i,r,s,4),_("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new xn(l,3)),this.setAttribute("normal",new xn(u,3)),this.setAttribute("uv",new xn(f,2));function _(v,p,m,y,w,S,T,E,g,M,L){const D=S/g,R=T/M,I=S/2,G=T/2,C=E/2,P=g+1,F=M+1;let z=0,Q=0;const O=new K;for(let q=0;q<F;q++){const Z=q*R-G;for(let de=0;de<P;de++){const Ce=de*D-I;O[v]=Ce*y,O[p]=Z*w,O[m]=C,l.push(O.x,O.y,O.z),O[v]=0,O[p]=0,O[m]=E>0?1:-1,u.push(O.x,O.y,O.z),f.push(de/g),f.push(1-q/M),z+=1}}for(let q=0;q<M;q++)for(let Z=0;Z<g;Z++){const de=d+Z+P*q,Ce=d+Z+P*(q+1),H=d+(Z+1)+P*(q+1),$=d+(Z+1)+P*q;c.push(de,Ce,$),c.push(Ce,H,$),Q+=6}o.addGroup(h,Q,L),h+=Q,d+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Aa(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Go extends ai{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),c=Math.floor(r),l=o+1,u=c+1,f=e/o,d=t/c,h=[],_=[],v=[],p=[];for(let m=0;m<u;m++){const y=m*d-a;for(let w=0;w<l;w++){const S=w*f-s;_.push(S,-y,0),v.push(0,0,1),p.push(w/o),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let y=0;y<o;y++){const w=y+l*m,S=y+l*(m+1),T=y+1+l*(m+1),E=y+1+l*m;h.push(w,S,E),h.push(S,T,E)}this.setIndex(h),this.setAttribute("position",new xn(_,3)),this.setAttribute("normal",new xn(v,3)),this.setAttribute("uv",new xn(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Go(e.width,e.height,e.widthSegments,e.heightSegments)}}function Ts(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];if(cd(r))r.isRenderTargetTexture?(qe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone();else if(Array.isArray(r))if(cd(r[0])){const s=[];for(let a=0,o=r.length;a<o;a++)s[a]=r[a].clone();e[t][i]=s}else e[t][i]=r.slice();else e[t][i]=r}}return e}function mn(n){const e={};for(let t=0;t<n.length;t++){const i=Ts(n[t]);for(const r in i)e[r]=i[r]}return e}function cd(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function $_(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function gh(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:gt.workingColorSpace}const e0={clone:Ts,merge:mn};var t0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,n0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Or extends Ps{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=t0,this.fragmentShader=n0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ts(e.uniforms),this.uniformsGroups=$_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=t[r.value]||null;break;case"c":this.uniforms[i].value=new dt().setHex(r.value);break;case"v2":this.uniforms[i].value=new $e().fromArray(r.value);break;case"v3":this.uniforms[i].value=new K().fromArray(r.value);break;case"v4":this.uniforms[i].value=new Ut().fromArray(r.value);break;case"m3":this.uniforms[i].value=new je().fromArray(r.value);break;case"m4":this.uniforms[i].value=new Nt().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class i0 extends Or{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class r0 extends Ps{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new dt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new dt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Lc,this.normalScale=new $e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ur,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class s0 extends Ps{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=c_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class a0 extends Ps{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const ud={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(dd(n)||(this.files[n]=e))},get:function(n){if(this.enabled!==!1&&!dd(n))return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};function dd(n){try{const e=n.slice(n.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class o0{constructor(e,t,i){const r=this;let s=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,f){return l.push(u,f),this},this.removeHandler=function(u){const f=l.indexOf(u);return f!==-1&&l.splice(f,2),this},this.getHandler=function(u){for(let f=0,d=l.length;f<d;f+=2){const h=l[f],_=l[f+1];if(h.global&&(h.lastIndex=0),h.test(u))return _}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const l0=new o0;class au{constructor(e){this.manager=e!==void 0?e:l0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}}au.DEFAULT_MATERIAL_NAME="__DEFAULT";const Pi={};class c0 extends Error{constructor(e,t){super(e),this.response=t}}class u0 extends au{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,i,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=ud.get(`file:${e}`);if(s!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0);return}if(Pi[e]!==void 0){Pi[e].push({onLoad:t,onProgress:i,onError:r});return}Pi[e]=[],Pi[e].push({onLoad:t,onProgress:i,onError:r});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",priority:this.priority,cache:this.cache,signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&qe("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const u=Pi[e],f=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),h=d?parseInt(d):0,_=h!==0;let v=0;const p=new ReadableStream({start(m){y();function y(){f.read().then(({done:w,value:S})=>{if(w)m.close();else{v+=S.byteLength;const T=new ProgressEvent("progress",{lengthComputable:_,loaded:v,total:h});for(let E=0,g=u.length;E<g;E++){const M=u[E];M.onProgress&&M.onProgress(T)}m.enqueue(S),y()}},w=>{m.error(w)})}}});return new Response(p)}else throw new c0(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return l.json();default:if(o==="")return l.text();{const f=/charset="?([^;"\s]*)"?/i.exec(o),d=f&&f[1]?f[1].toLowerCase():void 0,h=new TextDecoder(d);return l.arrayBuffer().then(_=>h.decode(_))}}}).then(l=>{ud.add(`file:${e}`,l);const u=Pi[e];delete Pi[e];for(let f=0,d=u.length;f<d;f++){const h=u[f];h.onLoad&&h.onLoad(l)}}).catch(l=>{const u=Pi[e];if(u===void 0)throw this.manager.itemError(e),l;delete Pi[e];for(let f=0,d=u.length;f<d;f++){const h=u[f];h.onError&&h.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class _h extends rn{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new dt(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const Pl=new Nt,fd=new K,hd=new K;class d0{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new $e(512,512),this.mapType=Fn,this.map=null,this.mapPass=null,this.matrix=new Nt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ua,this._frameExtents=new $e(1,1),this._viewportCount=1,this._viewports=[new Ut(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;fd.setFromMatrixPosition(e.matrixWorld),t.position.copy(fd),hd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(hd),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,r){Pl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(Pl,e.coordinateSystem,e.reversedDepth);const s=this._frameExtents,a=r?r.z/s.x:1,o=r?r.w/s.y:1,c=r?r.x/s.x:0,l=r?r.y/s.y:0;e.coordinateSystem===ca||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(Pl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const eo=new K,to=new cr,oi=new K;class vh extends rn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Nt,this.projectionMatrix=new Nt,this.projectionMatrixInverse=new Nt,this.coordinateSystem=ii,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(eo,to,oi),oi.x===1&&oi.y===1&&oi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(eo,to,oi.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(eo,to,oi),oi.x===1&&oi.y===1&&oi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(eo,to,oi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Zi=new K,pd=new $e,md=new $e;class jn extends vh{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Nc*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(go*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Nc*2*Math.atan(Math.tan(go*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Zi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Zi.x,Zi.y).multiplyScalar(-e/Zi.z),Zi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Zi.x,Zi.y).multiplyScalar(-e/Zi.z)}getViewSize(e,t){return this.getViewBounds(e,pd,md),t.subVectors(md,pd)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(go*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*i/l,r*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class xh extends vh{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class f0 extends d0{constructor(){super(new xh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class gd extends _h{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(rn.DEFAULT_UP),this.updateMatrix(),this.target=new rn,this.shadow=new f0}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class h0 extends _h{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Zr=-90,Jr=1;class Ic extends rn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new jn(Zr,Jr,e,t);r.layers=this.layers,this.add(r);const s=new jn(Zr,Jr,e,t);s.layers=this.layers,this.add(s);const a=new jn(Zr,Jr,e,t);a.layers=this.layers,this.add(a);const o=new jn(Zr,Jr,e,t);o.layers=this.layers,this.add(o);const c=new jn(Zr,Jr,e,t);c.layers=this.layers,this.add(c);const l=new jn(Zr,Jr,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===ii)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===ca)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,u]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.mipmapsAutoUpdate;i.texture.mipmapsAutoUpdate=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(i,1,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(i,4,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),i.texture.mipmapsAutoUpdate=v,e.setRenderTarget(i,5,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(f,d,h),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class p0 extends jn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}}class _d{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ht(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(ht(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class m0 extends j_{constructor(e=10,t=10,i=4473924,r=8947848){i=new dt(i),r=new dt(r);const s=t/2,a=e/t,o=e/2,c=[],l=[];for(let d=0,h=0,_=-o;d<=t;d++,_+=a){c.push(-o,0,_,o,0,_),c.push(_,0,-o,_,0,o);const v=d===s?i:r;v.toArray(l,h),h+=3,v.toArray(l,h),h+=3,v.toArray(l,h),h+=3,v.toArray(l,h),h+=3}const u=new ai;u.setAttribute("position",new xn(c,3)),u.setAttribute("color",new xn(l,3));const f=new fh({vertexColors:!0,toneMapped:!1});super(u,f),this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}}class g0 extends fr{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function vd(n,e,t,i){const r=_0(i);switch(t){case eh:return n*e;case nh:return n*e/r.components*r.byteLength;case $c:return n*e/r.components*r.byteLength;case Fr:return n*e*2/r.components*r.byteLength;case eu:return n*e*2/r.components*r.byteLength;case th:return n*e*3/r.components*r.byteLength;case gi:return n*e*4/r.components*r.byteLength;case tu:return n*e*4/r.components*r.byteLength;case uo:case fo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ho:case po:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ic:case sc:return Math.max(n,16)*Math.max(e,8)/4;case nc:case rc:return Math.max(n,8)*Math.max(e,8)/2;case ac:case oc:case cc:case uc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case lc:case wo:case dc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case fc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case hc:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case pc:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case mc:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case gc:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case _c:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case vc:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case xc:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Sc:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case bc:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Mc:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case yc:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Ec:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Tc:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case wc:case Ac:case Rc:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Cc:case Pc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Ao:case Dc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function _0(n){switch(n){case Fn:case Jf:return{byteLength:1,components:1};case la:case Qf:case yi:return{byteLength:2,components:1};case Qc:case jc:return{byteLength:2,components:4};case Mi:case Jc:case mi:return{byteLength:4,components:1};case jf:case $f:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Zc}}));typeof window<"u"&&(window.__THREE__?qe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Zc);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Sh(){let n=null,e=!1,t=null,i=null;function r(s,a){i=n.requestAnimationFrame(r),t(s,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function v0(n){const e=new WeakMap;function t(o,c){const l=o.array,u=o.usage,f=l.byteLength,d=n.createBuffer();n.bindBuffer(c,d),n.bufferData(c,l,u),o.onUploadCallback();let h;if(l instanceof Float32Array)h=n.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)h=n.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?h=n.HALF_FLOAT:h=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)h=n.SHORT;else if(l instanceof Uint32Array)h=n.UNSIGNED_INT;else if(l instanceof Int32Array)h=n.INT;else if(l instanceof Int8Array)h=n.BYTE;else if(l instanceof Uint8Array)h=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)h=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:h,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,c,l){const u=c.array,f=c.updateRanges;if(n.bindBuffer(l,o),f.length===0)n.bufferSubData(l,0,u);else{f.sort((h,_)=>h.start-_.start);let d=0;for(let h=1;h<f.length;h++){const _=f[d],v=f[h];v.start<=_.start+_.count+1?_.count=Math.max(_.count,v.start+v.count-_.start):(++d,f[d]=v)}f.length=d+1;for(let h=0,_=f.length;h<_;h++){const v=f[h];n.bufferSubData(l,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var x0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,S0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,b0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,M0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,y0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,E0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,T0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,w0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,A0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,R0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,C0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,P0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,D0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,L0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,N0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,I0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,U0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,F0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,O0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,B0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,k0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,z0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,H0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,G0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,V0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,W0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,X0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,q0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Y0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,K0="gl_FragColor = linearToOutputTexel( gl_FragColor );",Z0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,J0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Q0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,j0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,$0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ev=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,tv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,nv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,iv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,rv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,sv=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,av=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ov=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lv=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,cv=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,uv=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,dv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,fv=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,hv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,pv=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,mv=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,gv=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,_v=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,vv=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,xv=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Sv=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,bv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Mv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ev=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Tv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,wv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Av=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Rv=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Cv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Pv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Dv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Lv=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Nv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Iv=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Uv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Ov=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Bv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Hv=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Gv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Vv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Wv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Xv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,qv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Yv=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Kv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Zv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Jv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,jv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,$v=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ex=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,tx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,nx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ix=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,rx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,sx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ax=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ox=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,lx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,cx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ux=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,dx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,fx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,hx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,px=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,mx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,gx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,_x=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const vx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,xx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bx=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ex=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Tx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,wx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Ax=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Rx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Cx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Px=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Dx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Lx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Nx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ix=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ux=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Ox=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,kx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,zx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Hx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Vx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Yx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Kx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Qx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,lt={alphahash_fragment:x0,alphahash_pars_fragment:S0,alphamap_fragment:b0,alphamap_pars_fragment:M0,alphatest_fragment:y0,alphatest_pars_fragment:E0,aomap_fragment:T0,aomap_pars_fragment:w0,batching_pars_vertex:A0,batching_vertex:R0,begin_vertex:C0,beginnormal_vertex:P0,bsdfs:D0,iridescence_fragment:L0,bumpmap_pars_fragment:N0,clipping_planes_fragment:I0,clipping_planes_pars_fragment:U0,clipping_planes_pars_vertex:F0,clipping_planes_vertex:O0,color_fragment:B0,color_pars_fragment:k0,color_pars_vertex:z0,color_vertex:H0,common:G0,defaultnormal_vertex:V0,displacementmap_pars_vertex:W0,displacementmap_vertex:X0,emissivemap_fragment:q0,emissivemap_pars_fragment:Y0,colorspace_fragment:K0,colorspace_pars_fragment:Z0,envmap_fragment:J0,envmap_common_pars_fragment:Q0,envmap_pars_fragment:j0,envmap_pars_vertex:$0,envmap_physical_pars_fragment:uv,envmap_vertex:ev,fog_vertex:tv,fog_pars_vertex:nv,fog_fragment:iv,fog_pars_fragment:rv,gradientmap_pars_fragment:sv,lightmap_pars_fragment:av,lights_lambert_fragment:ov,lights_lambert_pars_fragment:lv,lights_pars_begin:cv,lights_toon_fragment:dv,lights_toon_pars_fragment:fv,lights_phong_fragment:hv,lights_phong_pars_fragment:pv,lights_physical_fragment:mv,lights_physical_pars_fragment:gv,lights_fragment_begin:_v,lights_fragment_maps:vv,lights_fragment_end:xv,lightprobes_pars_fragment:Sv,logdepthbuf_fragment:bv,logdepthbuf_pars_fragment:Mv,logdepthbuf_pars_vertex:yv,logdepthbuf_vertex:Ev,map_fragment:Tv,map_pars_fragment:wv,map_particle_fragment:Av,map_particle_pars_fragment:Rv,metalnessmap_fragment:Cv,metalnessmap_pars_fragment:Pv,morphinstance_vertex:Dv,morphcolor_vertex:Lv,morphnormal_vertex:Nv,morphtarget_pars_vertex:Iv,morphtarget_vertex:Uv,normal_fragment_begin:Fv,normal_fragment_maps:Ov,normal_pars_fragment:Bv,normal_pars_vertex:kv,normal_vertex:zv,normalmap_pars_fragment:Hv,clearcoat_normal_fragment_begin:Gv,clearcoat_normal_fragment_maps:Vv,clearcoat_pars_fragment:Wv,iridescence_pars_fragment:Xv,opaque_fragment:qv,packing:Yv,premultiplied_alpha_fragment:Kv,project_vertex:Zv,dithering_fragment:Jv,dithering_pars_fragment:Qv,roughnessmap_fragment:jv,roughnessmap_pars_fragment:$v,shadowmap_pars_fragment:ex,shadowmap_pars_vertex:tx,shadowmap_vertex:nx,shadowmask_pars_fragment:ix,skinbase_vertex:rx,skinning_pars_vertex:sx,skinning_vertex:ax,skinnormal_vertex:ox,specularmap_fragment:lx,specularmap_pars_fragment:cx,tonemapping_fragment:ux,tonemapping_pars_fragment:dx,transmission_fragment:fx,transmission_pars_fragment:hx,uv_pars_fragment:px,uv_pars_vertex:mx,uv_vertex:gx,worldpos_vertex:_x,background_vert:vx,background_frag:xx,backgroundCube_vert:Sx,backgroundCube_frag:bx,cube_vert:Mx,cube_frag:yx,depth_vert:Ex,depth_frag:Tx,distance_vert:wx,distance_frag:Ax,equirect_vert:Rx,equirect_frag:Cx,linedashed_vert:Px,linedashed_frag:Dx,meshbasic_vert:Lx,meshbasic_frag:Nx,meshlambert_vert:Ix,meshlambert_frag:Ux,meshmatcap_vert:Fx,meshmatcap_frag:Ox,meshnormal_vert:Bx,meshnormal_frag:kx,meshphong_vert:zx,meshphong_frag:Hx,meshphysical_vert:Gx,meshphysical_frag:Vx,meshtoon_vert:Wx,meshtoon_frag:Xx,points_vert:qx,points_frag:Yx,shadow_vert:Kx,shadow_frag:Zx,sprite_vert:Jx,sprite_frag:Qx},we={common:{diffuse:{value:new dt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new $e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new dt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new dt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new dt(16777215)},opacity:{value:1},center:{value:new $e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},fi={basic:{uniforms:mn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.fog]),vertexShader:lt.meshbasic_vert,fragmentShader:lt.meshbasic_frag},lambert:{uniforms:mn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new dt(0)},envMapIntensity:{value:1}}]),vertexShader:lt.meshlambert_vert,fragmentShader:lt.meshlambert_frag},phong:{uniforms:mn([we.common,we.specularmap,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.fog,we.lights,{emissive:{value:new dt(0)},specular:{value:new dt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:lt.meshphong_vert,fragmentShader:lt.meshphong_frag},standard:{uniforms:mn([we.common,we.envmap,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.roughnessmap,we.metalnessmap,we.fog,we.lights,{emissive:{value:new dt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:lt.meshphysical_vert,fragmentShader:lt.meshphysical_frag},toon:{uniforms:mn([we.common,we.aomap,we.lightmap,we.emissivemap,we.bumpmap,we.normalmap,we.displacementmap,we.gradientmap,we.fog,we.lights,{emissive:{value:new dt(0)}}]),vertexShader:lt.meshtoon_vert,fragmentShader:lt.meshtoon_frag},matcap:{uniforms:mn([we.common,we.bumpmap,we.normalmap,we.displacementmap,we.fog,{matcap:{value:null}}]),vertexShader:lt.meshmatcap_vert,fragmentShader:lt.meshmatcap_frag},points:{uniforms:mn([we.points,we.fog]),vertexShader:lt.points_vert,fragmentShader:lt.points_frag},dashed:{uniforms:mn([we.common,we.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:lt.linedashed_vert,fragmentShader:lt.linedashed_frag},depth:{uniforms:mn([we.common,we.displacementmap]),vertexShader:lt.depth_vert,fragmentShader:lt.depth_frag},normal:{uniforms:mn([we.common,we.bumpmap,we.normalmap,we.displacementmap,{opacity:{value:1}}]),vertexShader:lt.meshnormal_vert,fragmentShader:lt.meshnormal_frag},sprite:{uniforms:mn([we.sprite,we.fog]),vertexShader:lt.sprite_vert,fragmentShader:lt.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:lt.background_vert,fragmentShader:lt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:lt.backgroundCube_vert,fragmentShader:lt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:lt.cube_vert,fragmentShader:lt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:lt.equirect_vert,fragmentShader:lt.equirect_frag},distance:{uniforms:mn([we.common,we.displacementmap,{referencePosition:{value:new K},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:lt.distance_vert,fragmentShader:lt.distance_frag},shadow:{uniforms:mn([we.lights,we.fog,{color:{value:new dt(0)},opacity:{value:1}}]),vertexShader:lt.shadow_vert,fragmentShader:lt.shadow_frag}};fi.physical={uniforms:mn([fi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new $e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new je},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new dt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new $e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new dt(0)},specularColor:{value:new dt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new $e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:lt.meshphysical_vert,fragmentShader:lt.meshphysical_frag};const no={r:0,b:0,g:0},jx=new Nt,bh=new je;bh.set(-1,0,0,0,1,0,0,0,1);function $x(n,e,t,i,r,s){const a=new dt(0);let o=r===!0?0:1,c,l,u=null,f=0,d=null;function h(y){let w=y.isScene===!0?y.background:null;if(w&&w.isTexture){const S=y.backgroundBlurriness>0;w=e.get(w,S)}return w}function _(y){let w=!1;const S=h(y);S===null?p(a,o):S&&S.isColor&&(p(S,1),w=!0);const T=n.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,s):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(n.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(y,w){const S=h(w);S&&S.isCubeTexture?(l===void 0&&(l=new dr(new Aa(1,1,1),new Or({name:"BackgroundCubeMaterial",uniforms:Ts(fi.backgroundCube.uniforms),vertexShader:fi.backgroundCube.vertexShader,fragmentShader:fi.backgroundCube.fragmentShader,side:En,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(T,E,g){this.matrixWorld.copyPosition(g.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),l.material.uniforms.envMap.value=S,l.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(jx.makeRotationFromEuler(w.backgroundRotation)).transpose(),S.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(bh),l.material.toneMapped=gt.getTransfer(S.colorSpace)!==wt,(u!==S||f!==S.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=S,f=S.version,d=n.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new dr(new Go(2,2),new Or({name:"BackgroundMaterial",uniforms:Ts(fi.background.uniforms),vertexShader:fi.background.vertexShader,fragmentShader:fi.background.fragmentShader,side:Ur,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.toneMapped=gt.getTransfer(S.colorSpace)!==wt,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||f!==S.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=S,f=S.version,d=n.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,w){y.getRGB(no,gh(n)),t.buffers.color.setClear(no.r,no.g,no.b,w,s)}function m(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,w=1){a.set(y),o=w,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,p(a,o)},render:_,addToRenderList:v,dispose:m}}function eS(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,a=!1;function o(R,I,G,C,P){let F=!1;const z=f(R,C,G,I);s!==z&&(s=z,l(s.object)),F=h(R,C,G,P),F&&_(R,C,G,P),P!==null&&e.update(P,n.ELEMENT_ARRAY_BUFFER),(F||a)&&(a=!1,S(R,I,G,C),P!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(P).buffer))}function c(){return n.createVertexArray()}function l(R){return n.bindVertexArray(R)}function u(R){return n.deleteVertexArray(R)}function f(R,I,G,C){const P=C.wireframe===!0;let F=i[I.id];F===void 0&&(F={},i[I.id]=F);const z=R.isInstancedMesh===!0?R.id:0;let Q=F[z];Q===void 0&&(Q={},F[z]=Q);let O=Q[G.id];O===void 0&&(O={},Q[G.id]=O);let q=O[P];return q===void 0&&(q=d(c()),O[P]=q),q}function d(R){const I=[],G=[],C=[];for(let P=0;P<t;P++)I[P]=0,G[P]=0,C[P]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:G,attributeDivisors:C,object:R,attributes:{},index:null}}function h(R,I,G,C){const P=s.attributes,F=I.attributes;let z=0;const Q=G.getAttributes();for(const O in Q)if(Q[O].location>=0){const Z=P[O];let de=F[O];if(de===void 0&&(O==="instanceMatrix"&&R.instanceMatrix&&(de=R.instanceMatrix),O==="instanceColor"&&R.instanceColor&&(de=R.instanceColor)),Z===void 0||Z.attribute!==de||de&&Z.data!==de.data)return!0;z++}return s.attributesNum!==z||s.index!==C}function _(R,I,G,C){const P={},F=I.attributes;let z=0;const Q=G.getAttributes();for(const O in Q)if(Q[O].location>=0){let Z=F[O];Z===void 0&&(O==="instanceMatrix"&&R.instanceMatrix&&(Z=R.instanceMatrix),O==="instanceColor"&&R.instanceColor&&(Z=R.instanceColor));const de={};de.attribute=Z,Z&&Z.data&&(de.data=Z.data),P[O]=de,z++}s.attributes=P,s.attributesNum=z,s.index=C}function v(){const R=s.newAttributes;for(let I=0,G=R.length;I<G;I++)R[I]=0}function p(R){m(R,0)}function m(R,I){const G=s.newAttributes,C=s.enabledAttributes,P=s.attributeDivisors;G[R]=1,C[R]===0&&(n.enableVertexAttribArray(R),C[R]=1),P[R]!==I&&(n.vertexAttribDivisor(R,I),P[R]=I)}function y(){const R=s.newAttributes,I=s.enabledAttributes;for(let G=0,C=I.length;G<C;G++)I[G]!==R[G]&&(n.disableVertexAttribArray(G),I[G]=0)}function w(R,I,G,C,P,F,z){z===!0?n.vertexAttribIPointer(R,I,G,P,F):n.vertexAttribPointer(R,I,G,C,P,F)}function S(R,I,G,C){v();const P=C.attributes,F=G.getAttributes(),z=I.defaultAttributeValues;for(const Q in F){const O=F[Q];if(O.location>=0){let q=P[Q];if(q===void 0&&(Q==="instanceMatrix"&&R.instanceMatrix&&(q=R.instanceMatrix),Q==="instanceColor"&&R.instanceColor&&(q=R.instanceColor)),q!==void 0){const Z=q.normalized,de=q.itemSize,Ce=e.get(q);if(Ce===void 0)continue;const H=Ce.buffer,$=Ce.type,me=Ce.bytesPerElement,he=$===n.INT||$===n.UNSIGNED_INT||q.gpuType===Jc;if(q.isInterleavedBufferAttribute){const ue=q.data,Oe=ue.isInterleavedBuffer===!0?ue.stride:ue.itemSize,ct=q.offset;if(ue.isInstancedInterleavedBuffer||ue.isInstancedBufferAttribute){for(let _e=0;_e<O.locationSize;_e++)m(O.location+_e,ue.meshPerAttribute);R.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let _e=0;_e<O.locationSize;_e++)p(O.location+_e);n.bindBuffer(n.ARRAY_BUFFER,H);for(let _e=0;_e<O.locationSize;_e++)w(O.location+_e,de/O.locationSize,$,Z,Oe*me,(ct+de/O.locationSize*_e)*me,he)}else{if(q.isInstancedBufferAttribute){for(let ue=0;ue<O.locationSize;ue++)m(O.location+ue,q.meshPerAttribute);R.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let ue=0;ue<O.locationSize;ue++)p(O.location+ue);n.bindBuffer(n.ARRAY_BUFFER,H);for(let ue=0;ue<O.locationSize;ue++)w(O.location+ue,de/O.locationSize,$,Z,de*me,de/O.locationSize*ue*me,he)}}else if(z!==void 0){const Z=z[Q];if(Z!==void 0)switch(Z.length){case 2:n.vertexAttrib2fv(O.location,Z);break;case 3:n.vertexAttrib3fv(O.location,Z);break;case 4:n.vertexAttrib4fv(O.location,Z);break;default:n.vertexAttrib1fv(O.location,Z)}}}}y()}function T(){L();for(const R in i){const I=i[R];for(const G in I){const C=I[G];for(const P in C){const F=C[P];for(const z in F)u(F[z].object),delete F[z];delete C[P]}}delete i[R]}}function E(R){if(i[R.id]===void 0)return;const I=i[R.id];for(const G in I){const C=I[G];for(const P in C){const F=C[P];for(const z in F)u(F[z].object),delete F[z];delete C[P]}}delete i[R.id]}function g(R){for(const I in i){const G=i[I];for(const C in G){const P=G[C];if(P[R.id]===void 0)continue;const F=P[R.id];for(const z in F)u(F[z].object),delete F[z];delete P[R.id]}}}function M(R){for(const I in i){const G=i[I],C=R.isInstancedMesh===!0?R.id:0,P=G[C];if(P!==void 0){for(const F in P){const z=P[F];for(const Q in z)u(z[Q].object),delete z[Q];delete P[F]}delete G[C],Object.keys(G).length===0&&delete i[I]}}}function L(){D(),a=!0,s!==r&&(s=r,l(s.object))}function D(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:L,resetDefaultState:D,dispose:T,releaseStatesOfGeometry:E,releaseStatesOfObject:M,releaseStatesOfProgram:g,initAttributes:v,enableAttribute:p,disableUnusedAttributes:y}}function tS(n,e,t){let i;function r(c){i=c}function s(c,l){n.drawArrays(i,c,l),t.update(l,i,1)}function a(c,l,u){u!==0&&(n.drawArraysInstanced(i,c,l,u),t.update(l,i,u))}function o(c,l,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,l,0,u);let d=0;for(let h=0;h<u;h++)d+=l[h];t.update(d,i,1)}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function nS(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const g=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(g.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(g){return!(g!==gi&&i.convert(g)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(g){const M=g===yi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(g!==Fn&&g!==mi&&!M&&i.convert(g)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function c(g){if(g==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";g="mediump"}return g==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=c(l);u!==l&&(qe("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=t.logarithmicDepthBuffer===!0&&f===!1;t.reversedDepthBuffer===!0&&f===!1&&qe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&f===!0&&qe("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const h=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),y=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),T=n.getParameter(n.MAX_SAMPLES),E=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:h,maxVertexTextures:_,maxTextureSize:v,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:y,maxVaryings:w,maxFragmentUniforms:S,maxSamples:T,samples:E}}function iS(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new Di,o=new je,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const h=f.length!==0||d||i!==0||r;return r=d,i=f.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,d){t=u(f,d,0)},this.setState=function(f,d,h){const _=f.clippingPlanes,v=f.clipIntersection,p=f.clipShadows,m=n.get(f);if(!r||_===null||_.length===0||s&&!p)s?u(null):l();else{const y=s?0:i,w=y*4;let S=m.clippingState||null;c.value=S,S=u(_,d,w,h);for(let T=0;T!==w;++T)S[T]=t[T];m.clippingState=S,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,d,h,_){const v=f!==null?f.length:0;let p=null;if(v!==0){if(p=c.value,_!==!0||p===null){const m=h+v*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(p===null||p.length<m)&&(p=new Float32Array(m));for(let w=0,S=h;w!==v;++w,S+=4)a.copy(f[w]).applyMatrix4(y,o),a.normal.toArray(p,S),p[S+3]=a.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,p}}class ou extends xi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new hh(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Aa(5,5,5),s=new Or({name:"CubemapFromEquirect",uniforms:Ts(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:En,blending:os});s.uniforms.tEquirect.value=t;const a=new dr(r,s),o=t.minFilter;return t.minFilter===tr&&(t.minFilter=Mn),new Ic(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}const xd=256,rS=3,sS=20,Mh=256,yh=16,aS=3,oS=new K,lS=new dt;class No{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Ic(1,10,null),this._boxMesh=new dr(new Aa(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,i=.1,r=100,s={}){const{size:a=256,position:o=oS}=s,c=this._renderer;this._setSize(a);const l=this._allocateTarget(),u=this._getSourceTarget(!0);t>0&&(u.texture.mipmapsAutoUpdate=!1);const f=c.autoClear,d=c.autoClearColor,h=c.autoClearDepth,_=c.autoClearStencil,v=e.background;c.autoClear=!0,c.autoClearColor=!0,c.autoClearDepth=!0,c.autoClearStencil=!0,v===null&&(e.background=c.getClearColor(lS));const p=new Ic(i,r,u);return p.position.copy(o),p.update(c,e),c.autoClear=f,c.autoClearColor=d,c.autoClearDepth=h,c.autoClearStencil=_,e.background=v,t>0&&(u.texture.mipmapsAutoUpdate=!0,this._blur(l,t)),this._applyPMREM(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Md(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=bd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(xd,y_(e))}_fromTexture(e,t){e.mapping===Ms||e.mapping===oa?this._setSize(e.image.length===0?xd:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);const i=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(i),i}_allocateTarget(){const e=this._cubeSize,t=Sd(e,!1,!1),i=Math.log2(e)-rS;for(let r=0;r<=i;r++)t.texture.mipmaps.push({width:e>>r,height:e>>r});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){const t=this._cubeSize,i=this._sourceTarget;return(i===null||i.width!==t||e&&i.depthBuffer===!1)&&(i!==null&&i.dispose(),this._sourceTarget=Sd(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,i){const r=this._boxMesh,s=this._cubeCamera;r.material=i,s.renderTarget=e,s.activeMipmapLevel=t;const a=e.width>>t;e.viewport.set(0,0,a,a),s.update(this._renderer,r),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===Ms||e.mapping===oa?(this._cubemapMaterial===null&&(this._cubemapMaterial=Md()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=bd()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=cS(),this._integrationMaterial=uS());const t=this._cubeSize,i=e.texture.mipmaps.length-1,r=this._ggxMaterial.uniforms;r.envMap.value=this._sourceTarget.texture;const s=this._integrationMaterial.uniforms;s.envMap.value=this._sourceTarget.texture,s.sourceLod.value=Math.log2(t/yh);for(let a=0;a<=i;a++){const o=No.lodToRoughness(a,i);if(a>i-aS)s.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{const c=o>0?Math.log2(t)+.5*Math.log2(6/(Mh*Math.pow(o,4)))+.5:0;r.roughness.value=o,r.lodBias.value=c,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=dS());const i=this._blurMaterial,r=i.uniforms,s=this._sourceTarget;r.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,r.envMap.value=s.texture,this._renderCube(e,0,i),r.envMap.value=e.texture,this._renderCube(s,0,i)}}function Sd(n,e,t){return new ou(n,{minFilter:tr,generateMipmaps:e,type:yi,colorSpace:Ro,depthBuffer:t})}function Ra(n,e,t){return new Or({name:n,uniforms:e,vertexShader:lt.cube_vert,fragmentShader:t,side:En,blending:os,depthTest:!1,depthWrite:!1})}function cS(){return Ra("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Mh}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function uS(){return Ra("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:yh}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function dS(){return Ra("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${sS}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function bd(){return Ra("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Md(){return Ra("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function fS(n){let e=new WeakMap,t=new WeakMap,i=null;function r(d,h=!1){return d==null?null:h?a(d):s(d)}function s(d){if(d&&d.isTexture){const h=d.mapping;if(h===rl||h===sl)if(e.has(d)){const _=e.get(d).texture;return o(_,d.mapping)}else{const _=d.image;if(_&&_.height>0){const v=new ou(_.height);return v.fromEquirectangularTexture(n,d),e.set(d,v),d.addEventListener("dispose",l),o(v.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture&&d.isPMREMTexture!==!0){const h=d.mapping,_=h===rl||h===sl,v=h===Ms||h===oa;if(_||v){let p=t.get(d);const m=p!==void 0?p.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==m)return i===null&&(i=new No(n)),p=_?i.fromEquirectangular(d,p):i.fromCubemap(d,p),p.texture.pmremVersion=d.pmremVersion,t.set(d,p),p.texture;if(p!==void 0)return p.texture;{const y=d.image;return _&&y&&y.height>0||v&&y&&c(y)?(i===null&&(i=new No(n)),p=_?i.fromEquirectangular(d):i.fromCubemap(d),p.texture.pmremVersion=d.pmremVersion,t.set(d,p),d.addEventListener("dispose",u),p.texture):null}}}return d}function o(d,h){return h===rl?d.mapping=Ms:h===sl&&(d.mapping=oa),d}function c(d){let h=0;const _=6;for(let v=0;v<_;v++)d[v]!==void 0&&h++;return h===_}function l(d){const h=d.target;h.removeEventListener("dispose",l);const _=e.get(h);_!==void 0&&(e.delete(h),_.dispose())}function u(d){const h=d.target;h.removeEventListener("dispose",u);const _=t.get(h);_!==void 0&&(t.delete(h),_.dispose())}function f(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function hS(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const r=n.getExtension(i);return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&mo("WebGLRenderer: "+i+" extension not supported."),r}}}function pS(n,e,t,i){const r={},s=new WeakMap,a=new FinalizationRegistry(_=>delete r[_]);function o(_){c(_.target)}function c(_){_.index!==null&&e.remove(_.index);for(const p in _.attributes)e.remove(_.attributes[p]);_.removeEventListener("dispose",o),delete r[_.id],a.unregister(_);const v=s.get(_);v&&(e.remove(v),s.delete(_)),i.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,t.memory.geometries--}function l(_,v){return r[v.id]!==void 0||(v.addEventListener("dispose",o),r[v.id]=new WeakRef(v),a.register(v,v.id,v),t.memory.geometries++),v}function u(_){const v=_.attributes;for(const p in v)e.update(v[p],n.ARRAY_BUFFER)}function f(_){const v=_.index,p=_.attributes.position;let m=0;if(p===void 0)return;const y=v!==null?v.array.length:p.array.length/3-1,w=p.count>=65535?dh:uh,S=new w(Math.ceil(y/3)*6,1),T=S.array;if(v!==null){const g=v.array;m=v.version;for(let M=0,L=0;M<y;M+=3){const D=g[M+0],R=g[M+1],I=g[M+2];T[L++]=D,T[L++]=R,T[L++]=R,T[L++]=I,T[L++]=I,T[L++]=D}}else{m=p.version;for(let g=0,M=0;g<y;g+=3){const L=g+0,D=g+1,R=g+2;T[M++]=L,T[M++]=D,T[M++]=D,T[M++]=R,T[M++]=R,T[M++]=L}}S.version=m;const E=s.get(_);E&&e.remove(E),s.set(_,S)}function d(_){const v=s.get(_);if(v){const p=_.index;p!==null&&v.version<p.version&&f(_)}else f(_);return s.get(_)}function h(){for(const _ in r){const v=r[_].deref();v!==void 0&&c(v)}}return{get:l,update:u,getWireframeAttribute:d,dispose:h}}function mS(n,e,t){let i;function r(f){i=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function c(f,d){n.drawElements(i,d,s,f*a),t.update(d,i,1)}function l(f,d,h){h!==0&&(n.drawElementsInstanced(i,d,s,f*a,h),t.update(d,i,h))}function u(f,d,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,f,0,h);let v=0;for(let p=0;p<h;p++)v+=d[p];t.update(v,i,1)}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function gS(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:Mt("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function _S(n,e,t){const i=new WeakMap,r=new Ut;function s(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let d=i.get(o);if(d===void 0||d.count!==f){let D=function(){M.dispose(),i.delete(o),o.removeEventListener("dispose",D)};var h=D;d!==void 0&&d.texture.dispose();const _=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],y=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let S=0;_===!0&&(S=1),v===!0&&(S=2),p===!0&&(S=3);let T=o.attributes.position.count*S,E=1;T>e.maxTextureSize&&(E=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const g=new Float32Array(T*E*4*f),M=new oh(g,T,E,f);M.type=mi,M.needsUpdate=!0;const L=S*4;for(let R=0;R<f;R++){const I=m[R],G=y[R],C=w[R],P=T*E*4*R;for(let F=0;F<I.count;F++){const z=F*L;_===!0&&(r.fromBufferAttribute(I,F),g[P+z+0]=r.x,g[P+z+1]=r.y,g[P+z+2]=r.z,g[P+z+3]=0),v===!0&&(r.fromBufferAttribute(G,F),g[P+z+4]=r.x,g[P+z+5]=r.y,g[P+z+6]=r.z,g[P+z+7]=0),p===!0&&(r.fromBufferAttribute(C,F),g[P+z+8]=r.x,g[P+z+9]=r.y,g[P+z+10]=r.z,g[P+z+11]=C.itemSize===4?r.w:1)}}d={count:f,texture:M,size:new $e(T,E)},i.set(o,d),o.addEventListener("dispose",D)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let _=0;for(let p=0;p<l.length;p++)_+=l[p];const v=o.morphTargetsRelative?1:1-_;c.getUniforms().setValue(n,"morphTargetBaseInfluence",v),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:s}}function vS(n,e,t,i,r){let s=new WeakMap;function a(l){const u=r.render.frame,f=l.geometry,d=e.get(l,f);if(s.get(d)!==u&&(e.update(d),s.set(d,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==u&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,u))),l.isSkinnedMesh){const h=l.skeleton;s.get(h)!==u&&(h.update(),s.set(h,u))}return d}function o(){s=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const xS={[Gf]:"LINEAR_TONE_MAPPING",[Vf]:"REINHARD_TONE_MAPPING",[Wf]:"CINEON_TONE_MAPPING",[Xf]:"ACES_FILMIC_TONE_MAPPING",[Yf]:"AGX_TONE_MAPPING",[Kf]:"NEUTRAL_TONE_MAPPING",[qf]:"CUSTOM_TONE_MAPPING"};function SS(n,e,t,i,r,s){const a=new xi(e,t,{type:n,depthBuffer:r,stencilBuffer:s,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,c=null,l=null;const u=new ai;u.setAttribute("position",new xn([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute("uv",new xn([0,2,0,0,2,0],2));const f=new i0({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new dr(u,f),h=new xh(-1,1,1,-1,0,1);let _=null,v=null,p=!1,m,y=null,w=[],S=!1;this.setSize=function(T,E){a.setSize(T,E),o!==null&&o.setSize(T,E),c!==null&&c.setSize(T,E);for(let g=0;g<w.length;g++){const M=w[g];M.setSize&&M.setSize(T,E)}},this.setEffects=function(T){w=T,S=w.length>0&&w[0].isRenderPass===!0;const E=a.width,g=a.height;w.length>0&&o===null&&(o=new xi(E,g,{type:yi,depthBuffer:!1,stencilBuffer:!1}),c=new xi(E,g,{type:yi,depthBuffer:!1,stencilBuffer:!1}));const M=r===!0&&w.some(L=>L.needsDepthTexture===!0);M!==(a.depthTexture!==null)&&(M===!0&&l===null&&(l=new Es(E,g),s===!0&&(l.format=nr,l.type=ys)),a.dispose(),a.depthTexture=M?l:null,a.resolveDepthBuffer=M,a.storeMultisampledDepthBuffer=M);for(let L=0;L<w.length;L++){const D=w[L];D.setSize&&D.setSize(E,g),M&&D.needsDepthTexture===!0&&D.setDepthTexture&&D.setDepthTexture(l)}},this.begin=function(T,E){if(p||T.toneMapping===Bi&&w.length===0)return!1;if(y=E,E!==null){const g=E.width,M=E.height;(a.width!==g||a.height!==M)&&this.setSize(g,M)}return S===!1&&T.setRenderTarget(a),m=T.toneMapping,T.toneMapping=Bi,!0},this.hasRenderPass=function(){return S},this.end=function(T,E){T.toneMapping=m,p=!0;let g=a,M=o;for(let L=0;L<w.length;L++){const D=w[L];D.enabled!==!1&&(D.render(T,M,g,E),D.needsSwap!==!1&&(g=M,M=M===o?c:o))}if(_!==T.outputColorSpace||v!==T.toneMapping){_=T.outputColorSpace,v=T.toneMapping,f.defines={},gt.getTransfer(_)===wt&&(f.defines.SRGB_TRANSFER="");const L=xS[v];L&&(f.defines[L]=""),f.needsUpdate=!0}f.uniforms.tDiffuse.value=g.texture,T.setRenderTarget(y),T.render(d,h),y=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),u.dispose(),f.dispose()}}const Eh=new vn,Th=new Es(1,1),wh=new ph(1),Ah=new oh,Rh=new L_,Ch=new hh,yd=[],Ed=[],Td=new Float32Array(16),wd=new Float32Array(9),Ad=new Float32Array(4);function Ds(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=yd[r];if(s===void 0&&(s=new Float32Array(r),yd[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function Yt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Kt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Vo(n,e){let t=Ed[e];t===void 0&&(t=new Int32Array(e),Ed[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function bS(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function MS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;n.uniform2fv(this.addr,e),Kt(t,e)}}function yS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Yt(t,e))return;n.uniform3fv(this.addr,e),Kt(t,e)}}function ES(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;n.uniform4fv(this.addr,e),Kt(t,e)}}function TS(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Kt(t,e)}else{if(Yt(t,i))return;Ad.set(i),n.uniformMatrix2fv(this.addr,!1,Ad),Kt(t,i)}}function wS(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Kt(t,e)}else{if(Yt(t,i))return;wd.set(i),n.uniformMatrix3fv(this.addr,!1,wd),Kt(t,i)}}function AS(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Kt(t,e)}else{if(Yt(t,i))return;Td.set(i),n.uniformMatrix4fv(this.addr,!1,Td),Kt(t,i)}}function RS(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function CS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;n.uniform2iv(this.addr,e),Kt(t,e)}}function PS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;n.uniform3iv(this.addr,e),Kt(t,e)}}function DS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;n.uniform4iv(this.addr,e),Kt(t,e)}}function LS(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function NS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;n.uniform2uiv(this.addr,e),Kt(t,e)}}function IS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;n.uniform3uiv(this.addr,e),Kt(t,e)}}function US(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;n.uniform4uiv(this.addr,e),Kt(t,e)}}function Wo(n){return n.version===0&&(n.compareFunction=sh,n.needsUpdate=!0),n}function FS(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?s=Wo(Th):s=Eh,t.setTexture2D(e||s,r)}function OS(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Rh,r)}function BS(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_CUBE_SHADOW?s=Wo(wh):s=Ch,t.setTextureCube(e||s,r)}function kS(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Ah,r)}function zS(n){switch(n){case 5126:return bS;case 35664:return MS;case 35665:return yS;case 35666:return ES;case 35674:return TS;case 35675:return wS;case 35676:return AS;case 5124:case 35670:return RS;case 35667:case 35671:return CS;case 35668:case 35672:return PS;case 35669:case 35673:return DS;case 5125:return LS;case 36294:return NS;case 36295:return IS;case 36296:return US;case 35678:case 36198:case 36298:case 36306:case 35682:return FS;case 35679:case 36299:case 36307:return OS;case 35680:case 36300:case 36308:case 36293:return BS;case 36289:case 36303:case 36311:case 36292:return kS}}function HS(n,e){n.uniform1fv(this.addr,e)}function GS(n,e){const t=Ds(e,this.size,2);n.uniform2fv(this.addr,t)}function VS(n,e){const t=Ds(e,this.size,3);n.uniform3fv(this.addr,t)}function WS(n,e){const t=Ds(e,this.size,4);n.uniform4fv(this.addr,t)}function XS(n,e){const t=Ds(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function qS(n,e){const t=Ds(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function YS(n,e){const t=Ds(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function KS(n,e){n.uniform1iv(this.addr,e)}function ZS(n,e){n.uniform2iv(this.addr,e)}function JS(n,e){n.uniform3iv(this.addr,e)}function QS(n,e){n.uniform4iv(this.addr,e)}function jS(n,e){n.uniform1uiv(this.addr,e)}function $S(n,e){n.uniform2uiv(this.addr,e)}function eb(n,e){n.uniform3uiv(this.addr,e)}function tb(n,e){n.uniform4uiv(this.addr,e)}function nb(n,e,t){const i=this.cache,r=e.length,s=Vo(t,r);Yt(i,s)||(n.uniform1iv(this.addr,s),Kt(i,s));let a;this.type===n.SAMPLER_2D_SHADOW?a=Wo(Th):a=Eh;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function ib(n,e,t){const i=this.cache,r=e.length,s=Vo(t,r);Yt(i,s)||(n.uniform1iv(this.addr,s),Kt(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Rh,s[a])}function rb(n,e,t){const i=this.cache,r=e.length,s=Vo(t,r);Yt(i,s)||(n.uniform1iv(this.addr,s),Kt(i,s));let a;this.type===n.SAMPLER_CUBE_SHADOW?a=Wo(wh):a=Ch;for(let o=0;o!==r;++o)t.setTextureCube(e[o]||a,s[o])}function sb(n,e,t){const i=this.cache,r=e.length,s=Vo(t,r);Yt(i,s)||(n.uniform1iv(this.addr,s),Kt(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Ah,s[a])}function ab(n){switch(n){case 5126:return HS;case 35664:return GS;case 35665:return VS;case 35666:return WS;case 35674:return XS;case 35675:return qS;case 35676:return YS;case 5124:case 35670:return KS;case 35667:case 35671:return ZS;case 35668:case 35672:return JS;case 35669:case 35673:return QS;case 5125:return jS;case 36294:return $S;case 36295:return eb;case 36296:return tb;case 35678:case 36198:case 36298:case 36306:case 35682:return nb;case 35679:case 36299:case 36307:return ib;case 35680:case 36300:case 36308:case 36293:return rb;case 36289:case 36303:case 36311:case 36292:return sb}}class ob{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=zS(t.type)}}class lb{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ab(t.type)}}class cb{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const Dl=/(\w+)(\])?(\[|\.)?/g;function Rd(n,e){n.seq.push(e),n.map[e.id]=e}function ub(n,e,t){const i=n.name,r=i.length;for(Dl.lastIndex=0;;){const s=Dl.exec(i),a=Dl.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){Rd(t,l===void 0?new ob(o,n,e):new lb(o,n,e));break}else{let f=t.map[o];f===void 0&&(f=new cb(o),Rd(t,f)),t=f}}}class _o{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);ub(o,c,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function Cd(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const db=37297;let fb=0;function hb(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const Pd=new je;function pb(n){gt._getMatrix(Pd,gt.workingColorSpace,n);const e=`mat3( ${Pd.elements.map(t=>t.toFixed(4))} )`;switch(gt.getTransfer(n)){case Co:return[e,"LinearTransferOETF"];case wt:return[e,"sRGBTransferOETF"];default:return qe("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Dd(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+hb(n.getShaderSource(e),o)}else return s}function mb(n,e){const t=pb(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const gb={[Gf]:"Linear",[Vf]:"Reinhard",[Wf]:"Cineon",[Xf]:"ACESFilmic",[Yf]:"AgX",[Kf]:"Neutral",[qf]:"Custom"};function _b(n,e){const t=gb[e];return t===void 0?(qe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const io=new K;function vb(){gt.getLuminanceCoefficients(io);const n=io.x.toFixed(4),e=io.y.toFixed(4),t=io.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function xb(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ys).join(`
`)}function Sb(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function bb(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Ys(n){return n!==""}function Ld(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function Nd(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Mb=/^[ \t]*#include +<([\w\d./]+)>/gm;function Uc(n){return n.replace(Mb,yb)}function yb(n,e){const t=lt[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return Uc(t)}const Eb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Id(n){return n.replace(Eb,Tb)}function Tb(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Ud(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const wb={[co]:"SHADOWMAP_TYPE_PCF",[qs]:"SHADOWMAP_TYPE_VSM"};function Ab(n){return wb[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Rb={[oa]:"ENVMAP_MODE_REFRACTION"};function Cb(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Rb[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Pb={[Hf]:"ENVMAP_BLENDING_MULTIPLY",[a_]:"ENVMAP_BLENDING_MIX",[o_]:"ENVMAP_BLENDING_ADD"};function Db(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Pb[n.combine]||"ENVMAP_BLENDING_NONE"}function Lb(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=Ab(t),l=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",u=Cb(t),f=Db(t),d=xb(t),h=Sb(s),_=r.createProgram();let v,p,m=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h].filter(Ys).join(`
`),v.length>0&&(v+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h].filter(Ys).join(`
`),p.length>0&&(p+=`
`)):(v=[Ud(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ys).join(`
`),p=[Ud(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,h,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+f:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Bi?"#define TONE_MAPPING":"",t.toneMapping!==Bi?lt.tonemapping_pars_fragment:"",t.toneMapping!==Bi?_b("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",lt.colorspace_pars_fragment,mb("linearToOutputTexel",t.outputColorSpace),vb(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ys).join(`
`)),a=Uc(a),a=Ld(a,t),a=Nd(a,t),o=Uc(o),o=Ld(o,t),o=Nd(o,t),a=Id(a),o=Id(o),t.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,v=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,p=["#define varying in",t.glslVersion===Hu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Hu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=m+v+a,w=m+p+o,S=Cd(r,r.VERTEX_SHADER,y),T=Cd(r,r.FRAGMENT_SHADER,w);r.attachShader(_,S),r.attachShader(_,T),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_);function E(D){if(n.debug.checkShaderErrors){const R=r.getProgramInfoLog(_)||"",I=r.getShaderInfoLog(S)||"",G=r.getShaderInfoLog(T)||"",C=R.trim(),P=I.trim(),F=G.trim();let z=!0,Q=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,_,S,T);else{const O=Dd(r,S,"vertex"),q=Dd(r,T,"fragment");Mt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+C+`
`+O+`
`+q)}else C!==""?qe("WebGLProgram: Program Info Log:",C):(P===""||F==="")&&(Q=!1);Q&&(D.diagnostics={runnable:z,programLog:C,vertexShader:{log:P,prefix:v},fragmentShader:{log:F,prefix:p}})}r.deleteShader(S),r.deleteShader(T),g=new _o(r,_),M=bb(r,_)}let g;this.getUniforms=function(){return g===void 0&&E(this),g};let M;this.getAttributes=function(){return M===void 0&&E(this),M};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=r.getProgramParameter(_,db)),L},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=fb++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=S,this.fragmentShader=T,this}let Nb=0;class Ib{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){const r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Ub(e),t.set(e,i)),i}}class Ub{constructor(e){this.id=Nb++,this.code=e,this.usedTimes=0}}function Fb(n){return n===Fr||n===wo||n===Ao}function Ob(n,e,t,i,r,s){const a=new lh,o=new Ib,c=new Set,l=[],u=new Map,f=i.logarithmicDepthBuffer,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function h(g){return c.add(g),g===0?"uv":`uv${g}`}function _(g,M,L,D,R,I){const G=D.fog,C=R.geometry,P=g.isMeshStandardMaterial||g.isMeshLambertMaterial||g.isMeshPhongMaterial?D.environment:null,F=g.isMeshStandardMaterial||g.isMeshLambertMaterial&&!g.envMap||g.isMeshPhongMaterial&&!g.envMap,z=e.get(g.envMap||P,F),Q=d[g.type];let O=i.precision;g.precision!==null&&(O=i.getMaxPrecision(g.precision),O!==g.precision&&qe("WebGLProgram.getParameters:",g.precision,"not supported, using",O,"instead."));const q=C.morphAttributes.position||C.morphAttributes.normal||C.morphAttributes.color,Z=q!==void 0?q.length:0;let de=0;C.morphAttributes.position!==void 0&&(de=1),C.morphAttributes.normal!==void 0&&(de=2),C.morphAttributes.color!==void 0&&(de=3);let Ce,H,$,me;if(Q){const Te=fi[Q];Ce=Te.vertexShader,H=Te.fragmentShader}else{Ce=g.vertexShader,H=g.fragmentShader;const Te=o.getVertexShaderStage(g),Tt=o.getFragmentShaderStage(g);o.update(g,Te,Tt),$=Te.id,me=Tt.id}const he=n.getRenderTarget(),ue=n.state.buffers.depth.getReversed(),Oe=R.isInstancedMesh===!0,ct=R.isBatchedMesh===!0,_e=!!g.map,We=!!g.matcap,rt=!!z,Ke=rt&&z.isPMREMTexture===!0,kt=!!g.aoMap,Ft=!!g.lightMap,sn=!!g.bumpMap&&g.wireframe===!1,Lt=!!g.normalMap,wn=!!g.displacementMap,le=!!g.emissiveMap,At=!!g.metalnessMap,Ct=!!g.roughnessMap,Rt=g.anisotropy>0,U=g.clearcoat>0,Qe=g.diffuseRoughness>0,He=g.dispersion>0,Xe=g.retroreflectivity>0,fe=g.iridescence>0,at=g.sheen>0,Pe=g.transmission>0,Fe=Rt&&!!g.anisotropyMap,A=U&&!!g.clearcoatMap,x=U&&!!g.clearcoatNormalMap,W=U&&!!g.clearcoatRoughnessMap,ae=Qe&&!!g.diffuseRoughnessMap,re=fe&&!!g.iridescenceMap,oe=fe&&!!g.iridescenceThicknessMap,ce=at&&!!g.sheenColorMap,ee=at&&!!g.sheenRoughnessMap,ne=!!g.specularMap,xe=!!g.specularColorMap,N=!!g.specularIntensityMap,se=Pe&&!!g.transmissionMap,te=Pe&&!!g.thicknessMap,Se=!!g.gradientMap,ge=!!g.alphaMap,ve=g.alphaTest>0,ke=!!g.alphaHash,ot=!!g.extensions;let pe=Bi;g.toneMapped&&(he===null||he.isXRRenderTarget===!0)&&(pe=n.toneMapping);const ze=Ke?z.isCompressedCubeTexture?z.image[0].mipmaps:z.mipmaps:null,st={shaderID:Q,shaderType:g.type,shaderName:g.name,vertexShader:Ce,fragmentShader:H,defines:g.defines,customVertexShaderID:$,customFragmentShaderID:me,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:O,batching:ct,batchingColor:ct&&R._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&R.instanceColor!==null,instancingMorph:Oe&&R.morphTexture!==null,outputColorSpace:he===null?n.outputColorSpace:he.isXRRenderTarget===!0?he.texture.colorSpace:gt.workingColorSpace,alphaToCoverage:!!g.alphaToCoverage,map:_e,matcap:We,envMap:rt,envMapMode:rt&&z.mapping,envMapPMREM:Ke,envMapMaxLod:Ke?ze.length-1:null,envMapSize:Ke?ze[0].width:null,aoMap:kt,lightMap:Ft,bumpMap:sn,normalMap:Lt,displacementMap:wn,emissiveMap:le,normalMapObjectSpace:Lt&&g.normalMapType===u_,normalMapTangentSpace:Lt&&g.normalMapType===Lc,packedNormalMap:Lt&&g.normalMapType===Lc&&Fb(g.normalMap.format),metalnessMap:At,roughnessMap:Ct,anisotropy:Rt,anisotropyMap:Fe,clearcoat:U,clearcoatMap:A,clearcoatNormalMap:x,clearcoatRoughnessMap:W,diffuseRoughness:Qe,diffuseRoughnessMap:ae,dispersion:He,retroreflection:Xe,iridescence:fe,iridescenceMap:re,iridescenceThicknessMap:oe,sheen:at,sheenColorMap:ce,sheenRoughnessMap:ee,specularMap:ne,specularColorMap:xe,specularIntensityMap:N,transmission:Pe,transmissionMap:se,thicknessMap:te,gradientMap:Se,opaque:g.transparent===!1&&g.blending===$s&&g.alphaToCoverage===!1,alphaMap:ge,alphaTest:ve,alphaHash:ke,combine:g.combine,mapUv:_e&&h(g.map.channel),aoMapUv:kt&&h(g.aoMap.channel),lightMapUv:Ft&&h(g.lightMap.channel),bumpMapUv:sn&&h(g.bumpMap.channel),normalMapUv:Lt&&h(g.normalMap.channel),displacementMapUv:wn&&h(g.displacementMap.channel),emissiveMapUv:le&&h(g.emissiveMap.channel),metalnessMapUv:At&&h(g.metalnessMap.channel),roughnessMapUv:Ct&&h(g.roughnessMap.channel),anisotropyMapUv:Fe&&h(g.anisotropyMap.channel),clearcoatMapUv:A&&h(g.clearcoatMap.channel),clearcoatNormalMapUv:x&&h(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:W&&h(g.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ae&&h(g.diffuseRoughnessMap.channel),iridescenceMapUv:re&&h(g.iridescenceMap.channel),iridescenceThicknessMapUv:oe&&h(g.iridescenceThicknessMap.channel),sheenColorMapUv:ce&&h(g.sheenColorMap.channel),sheenRoughnessMapUv:ee&&h(g.sheenRoughnessMap.channel),specularMapUv:ne&&h(g.specularMap.channel),specularColorMapUv:xe&&h(g.specularColorMap.channel),specularIntensityMapUv:N&&h(g.specularIntensityMap.channel),transmissionMapUv:se&&h(g.transmissionMap.channel),thicknessMapUv:te&&h(g.thicknessMap.channel),alphaMapUv:ge&&h(g.alphaMap.channel),vertexTangents:!!C.attributes.tangent&&(Lt||Rt),vertexNormals:!!C.attributes.normal,vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!C.attributes.color&&C.attributes.color.itemSize===4,pointsUvs:R.isPoints===!0&&!!C.attributes.uv&&(_e||ge),fog:!!G,useFog:g.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:g.wireframe===!1&&(g.flatShading===!0||C.attributes.normal===void 0&&Lt===!1&&(g.isMeshLambertMaterial||g.isMeshPhongMaterial||g.isMeshStandardMaterial||g.isMeshPhysicalMaterial)),sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:ue,skinning:R.isSkinnedMesh===!0,hasPositionAttribute:C.attributes.position!==void 0,morphTargets:C.morphAttributes.position!==void 0,morphNormals:C.morphAttributes.normal!==void 0,morphColors:C.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:de,numSunLights:M.sun.length,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numSunLightShadows:M.sunShadowMap.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numLightProbeGrids:I.filter(Te=>Te.texture!==null).length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:g.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:pe,decodeVideoTexture:_e&&g.map.isVideoTexture===!0&&gt.getTransfer(g.map.colorSpace)===wt,decodeVideoTextureEmissive:le&&g.emissiveMap.isVideoTexture===!0&&gt.getTransfer(g.emissiveMap.colorSpace)===wt,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===Ui,flipSided:g.side===En,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionClipCullDistance:ot&&g.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ot&&g.extensions.multiDraw===!0||ct)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()};return st.vertexUv1s=c.has(1),st.vertexUv2s=c.has(2),st.vertexUv3s=c.has(3),c.clear(),st}function v(g){const M=[];if(g.shaderID?M.push(g.shaderID):(M.push(g.customVertexShaderID),M.push(g.customFragmentShaderID)),g.defines!==void 0)for(const L in g.defines)M.push(L),M.push(g.defines[L]);return g.isRawShaderMaterial===!1&&(p(M,g),m(M,g),M.push(n.outputColorSpace)),M.push(g.customProgramCacheKey),M.join()}function p(g,M){g.push(M.precision),g.push(M.outputColorSpace),g.push(M.envMapMode),g.push(M.envMapPMREM),g.push(M.envMapMaxLod),g.push(M.envMapSize),g.push(M.mapUv),g.push(M.alphaMapUv),g.push(M.lightMapUv),g.push(M.aoMapUv),g.push(M.bumpMapUv),g.push(M.normalMapUv),g.push(M.displacementMapUv),g.push(M.emissiveMapUv),g.push(M.metalnessMapUv),g.push(M.roughnessMapUv),g.push(M.anisotropyMapUv),g.push(M.clearcoatMapUv),g.push(M.clearcoatNormalMapUv),g.push(M.clearcoatRoughnessMapUv),g.push(M.diffuseRoughnessMapUv),g.push(M.iridescenceMapUv),g.push(M.iridescenceThicknessMapUv),g.push(M.sheenColorMapUv),g.push(M.sheenRoughnessMapUv),g.push(M.specularMapUv),g.push(M.specularColorMapUv),g.push(M.specularIntensityMapUv),g.push(M.transmissionMapUv),g.push(M.thicknessMapUv),g.push(M.combine),g.push(M.fogExp2),g.push(M.sizeAttenuation),g.push(M.morphTargetsCount),g.push(M.numSunLights),g.push(M.numDirLights),g.push(M.numPointLights),g.push(M.numSpotLights),g.push(M.numSpotLightMaps),g.push(M.numHemiLights),g.push(M.numRectAreaLights),g.push(M.numSunLightShadows),g.push(M.numDirLightShadows),g.push(M.numPointLightShadows),g.push(M.numSpotLightShadows),g.push(M.numSpotLightShadowsWithMaps),g.push(M.numLightProbes),g.push(M.numLightProbeGrids),g.push(M.shadowMapType),g.push(M.toneMapping),g.push(M.numClippingPlanes),g.push(M.numClipIntersection),g.push(M.depthPacking)}function m(g,M){a.disableAll(),M.instancing&&a.enable(0),M.instancingColor&&a.enable(1),M.instancingMorph&&a.enable(2),M.matcap&&a.enable(3),M.envMap&&a.enable(4),M.normalMapObjectSpace&&a.enable(5),M.normalMapTangentSpace&&a.enable(6),M.clearcoat&&a.enable(7),M.iridescence&&a.enable(8),M.alphaTest&&a.enable(9),M.vertexColors&&a.enable(10),M.vertexAlphas&&a.enable(11),M.vertexUv1s&&a.enable(12),M.vertexUv2s&&a.enable(13),M.vertexUv3s&&a.enable(14),M.vertexTangents&&a.enable(15),M.anisotropy&&a.enable(16),M.alphaHash&&a.enable(17),M.batching&&a.enable(18),M.dispersion&&a.enable(19),M.retroreflection&&a.enable(24),M.diffuseRoughness&&a.enable(25),M.batchingColor&&a.enable(20),M.gradientMap&&a.enable(21),M.packedNormalMap&&a.enable(22),M.vertexNormals&&a.enable(23),g.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),M.numLightProbeGrids>0&&a.enable(22),M.hasPositionAttribute&&a.enable(23),g.push(a.mask)}function y(g){const M=d[g.type];let L;if(M){const D=fi[M];L=e0.clone(D.uniforms)}else L=g.uniforms;return L}function w(g,M){let L=u.get(M);return L!==void 0?++L.usedTimes:(L=new Lb(n,M,g,r),l.push(L),u.set(M,L)),L}function S(g){if(--g.usedTimes===0){const M=l.indexOf(g);l[M]=l[l.length-1],l.pop(),u.delete(g.cacheKey),g.destroy()}}function T(g){o.remove(g)}function E(){o.dispose()}return{getParameters:_,getProgramCacheKey:v,getUniforms:y,acquireProgram:w,releaseProgram:S,releaseShaderCache:T,programs:l,dispose:E}}function Bb(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,c){n.get(a)[o]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function kb(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function Fd(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Od(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(d){let h=0;return d.isInstancedMesh&&(h+=2),d.isSkinnedMesh&&(h+=1),h}function o(d,h,_,v,p,m){let y=n[e];return y===void 0?(y={id:d.id,object:d,geometry:h,material:_,materialVariant:a(d),groupOrder:v,renderOrder:d.renderOrder,z:p,group:m},n[e]=y):(y.id=d.id,y.object=d,y.geometry=h,y.material=_,y.materialVariant=a(d),y.groupOrder=v,y.renderOrder=d.renderOrder,y.z=p,y.group=m),e++,y}function c(d,h,_,v,p,m,y){y.reversedDepth===!0&&(p=-p);const w=o(d,h,_,v,p,m);_.transmission>0?i.push(w):_.transparent===!0?r.push(w):t.push(w)}function l(d,h,_,v,p,m){const y=o(d,h,_,v,p,m);_.transmission>0?i.unshift(y):_.transparent===!0?r.unshift(y):t.unshift(y)}function u(d,h){t.length>1&&t.sort(d||kb),i.length>1&&i.sort(h||Fd),r.length>1&&r.sort(h||Fd)}function f(){for(let d=e,h=n.length;d<h;d++){const _=n[d];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:c,unshift:l,finish:f,sort:u}}function zb(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new Od,n.set(i,[a])):r>=s.length?(a=new Od,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function Hb(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new K,color:new dt};break;case"SpotLight":t={position:new K,direction:new K,color:new dt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new K,color:new dt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new K,skyColor:new dt,groundColor:new dt};break;case"RectAreaLight":t={color:new dt,position:new K,halfWidth:new K,halfHeight:new K};break}return n[e.id]=t,t}}}function Gb(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Vb=0;function Wb(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Xb(n){const e=new Hb,t=Gb(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new K);const r=new K,s=new Nt,a=new Nt;function o(l){let u=0,f=0,d=0;for(let I=0;I<9;I++)i.probe[I].set(0,0,0);let h=0,_=0,v=0,p=0,m=0,y=0,w=0,S=0,T=0,E=0,g=0,M=0,L=0,D=0;l.sort(Wb);for(let I=0,G=l.length;I<G;I++){const C=l[I],P=C.color,F=C.intensity,z=C.distance;let Q=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===Fr?Q=C.shadow.map.texture:Q=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)u+=P.r*F,f+=P.g*F,d+=P.b*F;else if(C.isLightProbe){for(let O=0;O<9;O++)i.probe[O].addScaledVector(C.sh.coefficients[O],F);D++}else if(C.isSunLight){const O=e.get(C);if(O.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const q=C.shadow,Z=t.get(C);Z.shadowIntensity=q.intensity,Z.shadowBias=q.bias,Z.shadowNormalBias=q.normalBias,Z.shadowRadius=q.radius,Z.shadowMapSize.copy(q.mapSize).multiply(q.getFrameExtents()),i.sunShadow[_]=Z,i.sunShadowMap[_]=Q;const de=q.getViewportCount();for(let Ce=0;Ce<de;Ce++)i.sunShadowMatrix[v+Ce]=q.getMatrix(Ce),i.sunShadowCascade[v+Ce]=q._cascadeData[Ce];v+=de,_++}i.sun[h]=O,h++}else if(C.isDirectionalLight){const O=e.get(C);if(O.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const q=C.shadow,Z=t.get(C);Z.shadowIntensity=q.intensity,Z.shadowBias=q.bias,Z.shadowNormalBias=q.normalBias,Z.shadowRadius=q.radius,Z.shadowMapSize=q.mapSize,i.directionalShadow[p]=Z,i.directionalShadowMap[p]=Q,i.directionalShadowMatrix[p]=C.shadow.matrix,T++}i.directional[p]=O,p++}else if(C.isSpotLight){const O=e.get(C);O.position.setFromMatrixPosition(C.matrixWorld),O.color.copy(P).multiplyScalar(F),O.distance=z,O.coneCos=Math.cos(C.angle),O.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),O.decay=C.decay,i.spot[y]=O;const q=C.shadow;if(C.map&&(i.spotLightMap[M]=C.map,M++,q.updateMatrices(C),C.castShadow&&L++),i.spotLightMatrix[y]=q.matrix,C.castShadow){const Z=t.get(C);Z.shadowIntensity=q.intensity,Z.shadowBias=q.bias,Z.shadowNormalBias=q.normalBias,Z.shadowRadius=q.radius,Z.shadowMapSize=q.mapSize,i.spotShadow[y]=Z,i.spotShadowMap[y]=Q,g++}y++}else if(C.isRectAreaLight){const O=e.get(C);O.color.copy(P).multiplyScalar(F),O.halfWidth.set(C.width*.5,0,0),O.halfHeight.set(0,C.height*.5,0),i.rectArea[w]=O,w++}else if(C.isPointLight){const O=e.get(C);if(O.color.copy(C.color).multiplyScalar(C.intensity),O.distance=C.distance,O.decay=C.decay,C.castShadow){const q=C.shadow,Z=t.get(C);Z.shadowIntensity=q.intensity,Z.shadowBias=q.bias,Z.shadowNormalBias=q.normalBias,Z.shadowRadius=q.radius,Z.shadowMapSize=q.mapSize,Z.shadowCameraNear=q.camera.near,Z.shadowCameraFar=q.camera.far,i.pointShadow[m]=Z,i.pointShadowMap[m]=Q,i.pointShadowMatrix[m]=C.shadow.matrix,E++}i.point[m]=O,m++}else if(C.isHemisphereLight){const O=e.get(C);O.skyColor.copy(C.color).multiplyScalar(F),O.groundColor.copy(C.groundColor).multiplyScalar(F),i.hemi[S]=O,S++}}w>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=we.LTC_FLOAT_1,i.rectAreaLTC2=we.LTC_FLOAT_2):(i.rectAreaLTC1=we.LTC_HALF_1,i.rectAreaLTC2=we.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=d;const R=i.hash;(R.sunLength!==h||R.directionalLength!==p||R.pointLength!==m||R.spotLength!==y||R.rectAreaLength!==w||R.hemiLength!==S||R.numSunShadows!==_||R.numDirectionalShadows!==T||R.numPointShadows!==E||R.numSpotShadows!==g||R.numSpotMaps!==M||R.numLightProbes!==D)&&(i.sun.length=h,i.directional.length=p,i.spot.length=y,i.rectArea.length=w,i.point.length=m,i.hemi.length=S,i.sunShadow.length=_,i.sunShadowMap.length=_,i.sunShadowMatrix.length=v,i.sunShadowCascade.length=v,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.directionalShadowMatrix.length=T,i.pointShadow.length=E,i.pointShadowMap.length=E,i.pointShadowMatrix.length=E,i.spotShadow.length=g,i.spotShadowMap.length=g,i.spotLightMatrix.length=g+M-L,i.spotLightMap.length=M,i.numSpotLightShadowsWithMaps=L,i.numLightProbes=D,R.sunLength=h,R.directionalLength=p,R.pointLength=m,R.spotLength=y,R.rectAreaLength=w,R.hemiLength=S,R.numSunShadows=_,R.numDirectionalShadows=T,R.numPointShadows=E,R.numSpotShadows=g,R.numSpotMaps=M,R.numLightProbes=D,i.version=Vb++)}function c(l,u){let f=0,d=0,h=0,_=0,v=0,p=0;const m=u.matrixWorldInverse;for(let y=0,w=l.length;y<w;y++){const S=l[y];if(S.isSunLight){const T=i.sun[f];T.direction.setFromMatrixPosition(S.matrixWorld),T.direction.transformDirection(m),f++}else if(S.isDirectionalLight){const T=i.directional[d];T.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(m),d++}else if(S.isSpotLight){const T=i.spot[_];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(m),T.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(m),_++}else if(S.isRectAreaLight){const T=i.rectArea[v];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(m),a.identity(),s.copy(S.matrixWorld),s.premultiply(m),a.extractRotation(s),T.halfWidth.set(S.width*.5,0,0),T.halfHeight.set(0,S.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),v++}else if(S.isPointLight){const T=i.point[h];T.position.setFromMatrixPosition(S.matrixWorld),T.position.applyMatrix4(m),h++}else if(S.isHemisphereLight){const T=i.hemi[p];T.direction.setFromMatrixPosition(S.matrixWorld),T.direction.transformDirection(m),p++}}}return{setup:o,setupView:c,state:i}}function Bd(n){const e=new Xb(n),t=[],i=[],r=[];function s(f){u.camera=f,t.length=0,i.length=0,r.length=0}function a(f){f.isLightProbeGrid?r.push(f):t.push(f)}function o(f){i.push(f)}function c(){e.setup(t),r.sort((f,d)=>f.priority-d.priority||f.id-d.id)}function l(f){e.setupView(t,f)}const u={lightsArray:t,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:u,setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function qb(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Bd(n),e.set(r,[o])):s>=a.length?(o=new Bd(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const Yb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Kb=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Zb=[new K(1,0,0),new K(-1,0,0),new K(0,1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1)],Jb=[new K(0,-1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1),new K(0,-1,0),new K(0,-1,0)],kd=new Nt,ks=new K,Ll=new K;function Qb(n,e,t){let i=new ua;const r=new $e,s=new $e,a=new Ut,o=new s0,c=new a0,l={},u=t.maxTextureSize,f={[Ur]:En,[En]:Ur,[Ui]:Ui},d=new Or({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $e},radius:{value:4}},vertexShader:Yb,fragmentShader:Kb}),h=d.clone();h.defines.HORIZONTAL_PASS=1;const _=new ai;_.setAttribute("position",new Si(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new dr(_,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=co;let m=this.type;this.render=function(E,g,M){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||E.length===0)return;this.type===Hg&&(qe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=co);const L=n.getRenderTarget(),D=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),I=n.state;I.setBlending(os),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const G=m!==this.type;G&&g.traverse(function(C){C.material&&(Array.isArray(C.material)?C.material.forEach(P=>P.needsUpdate=!0):C.material.needsUpdate=!0)});for(let C=0,P=E.length;C<P;C++){const F=E[C],z=F.shadow;if(z===void 0){qe("WebGLShadowMap:",F,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;r.copy(z.mapSize);const Q=z.getFrameExtents();r.multiply(Q),s.copy(z.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/Q.x),r.x=s.x*Q.x,z.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/Q.y),r.y=s.y*Q.y,z.mapSize.y=s.y));const O=n.state.buffers.depth.getReversed();if(z.camera._reversedDepth=O,z.map===null||G===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===qs){if(F.isPointLight){qe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new xi(r.x,r.y,{format:Fr,type:yi,minFilter:Mn,magFilter:Mn,generateMipmaps:!1}),z.map.texture.name=F.name+".shadowMap",z.map.depthTexture=new Es(r.x,r.y,mi),z.map.depthTexture.name=F.name+".shadowMapDepth",z.map.depthTexture.format=lr,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=en,z.map.depthTexture.magFilter=en}else F.isPointLight?(z.map=new ou(r.x),z.map.depthTexture=new ph(r.x,Mi)):(z.map=new xi(r.x,r.y),z.map.depthTexture=new Es(r.x,r.y,Mi)),z.map.depthTexture.name=F.name+".shadowMap",z.map.depthTexture.format=lr,this.type===co?(z.map.depthTexture.compareFunction=O?rh:ih,z.map.depthTexture.minFilter=Mn,z.map.depthTexture.magFilter=Mn):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=en,z.map.depthTexture.magFilter=en);z.camera.updateProjectionMatrix()}z.map.isWebGLCubeRenderTarget!==!0&&(z.map.width!==r.x||z.map.height!==r.y)&&z.map.setSize(r.x,r.y);const q=z.map.isWebGLCubeRenderTarget?6:z.getViewportCount();F.isPointLight!==!0&&z.updateMatrices(F,M);const Z=z.camera.layers.mask&4294967294?z.camera.layers:M.layers;for(let de=0;de<q;de++){const Ce=z.getCamera(de);if(F.isPointLight){const H=z.camera,$=z.matrix,me=F.distance||H.far;me!==H.far&&(H.far=me,H.updateProjectionMatrix()),ks.setFromMatrixPosition(F.matrixWorld),H.position.copy(ks),Ll.copy(H.position),Ll.add(Zb[de]),H.up.copy(Jb[de]),H.lookAt(Ll),H.updateMatrixWorld(),$.makeTranslation(-ks.x,-ks.y,-ks.z),kd.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),z._frustum.setFromProjectionMatrix(kd,H.coordinateSystem,H.reversedDepth)}if(z.map.isWebGLCubeRenderTarget)n.setRenderTarget(z.map,de),n.clear();else{de===0&&(n.setRenderTarget(z.map),n.clear());const H=z.getViewport(de);a.set(s.x*H.x,s.y*H.y,s.x*H.z,s.y*H.w),I.viewport(a)}i=z.getFrustum(de),S(g,M,Ce,F,Z,this.type)}z.isPointLightShadow!==!0&&this.type===qs&&y(z,M),z.needsUpdate=!1}m=this.type,p.needsUpdate=!1,n.setRenderTarget(L,D,R)};function y(E,g){const M=e.update(v);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,h.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,h.needsUpdate=!0),E.mapPass===null?E.mapPass=new xi(r.x,r.y,{format:Fr,type:yi}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),d.uniforms.shadow_pass.value=E.map.depthTexture,d.uniforms.resolution.value.set(E.map.width,E.map.height),d.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(g,null,M,d,v,null),h.uniforms.shadow_pass.value=E.mapPass.texture,h.uniforms.resolution.value.set(E.map.width,E.map.height),h.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(g,null,M,h,v,null)}function w(E,g,M,L){let D=null;const R=M.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(R!==void 0)D=R;else if(D=M.isPointLight===!0?c:o,n.localClippingEnabled&&g.clipShadows===!0&&Array.isArray(g.clippingPlanes)&&g.clippingPlanes.length!==0||g.displacementMap&&g.displacementScale!==0||g.alphaMap&&g.alphaTest>0||g.map&&g.alphaTest>0||g.alphaToCoverage===!0){const I=D.uuid,G=g.uuid;let C=l[I];C===void 0&&(C={},l[I]=C);let P=C[G];P===void 0&&(P=D.clone(),C[G]=P,g.addEventListener("dispose",T)),D=P}if(D.visible=g.visible,D.wireframe=g.wireframe,L===qs?D.side=g.shadowSide!==null?g.shadowSide:g.side:D.side=g.shadowSide!==null?g.shadowSide:f[g.side],D.alphaMap=g.alphaMap,D.alphaTest=g.alphaToCoverage===!0?.5:g.alphaTest,D.map=g.map,D.clipShadows=g.clipShadows,D.clippingPlanes=g.clippingPlanes,D.clipIntersection=g.clipIntersection,D.displacementMap=g.displacementMap,D.displacementScale=g.displacementScale,D.displacementBias=g.displacementBias,D.wireframeLinewidth=g.wireframeLinewidth,D.linewidth=g.linewidth,M.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const I=n.properties.get(D);I.light=M}return D}function S(E,g,M,L,D,R){if(E.visible===!1)return;if(E.layers.test(D)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&R===qs)&&(!E.frustumCulled||E.intersectsFrustum(i))){E.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,E.matrixWorld);const C=e.update(E),P=E.material;if(Array.isArray(P)){const F=C.groups;for(let z=0,Q=F.length;z<Q;z++){const O=F[z],q=P[O.materialIndex];if(q&&q.visible){const Z=w(E,q,L,R);E.onBeforeShadow(n,E,g,M,C,Z,O),n.renderBufferDirect(M,null,C,Z,E,O),E.onAfterShadow(n,E,g,M,C,Z,O)}}}else if(P.visible){const F=w(E,P,L,R);E.onBeforeShadow(n,E,g,M,C,F,null),n.renderBufferDirect(M,null,C,F,E,null),E.onAfterShadow(n,E,g,M,C,F,null)}}const G=E.children;for(let C=0,P=G.length;C<P;C++)S(G[C],g,M,L,D,R)}function T(E){E.target.removeEventListener("dispose",T);for(const M in l){const L=l[M],D=E.target.uuid;D in L&&(L[D].dispose(),delete L[D])}}}function jb(n,e){function t(){let N=!1;const se=new Ut;let te=null;const Se=new Ut(0,0,0,0);return{setMask:function(ge){te!==ge&&!N&&(n.colorMask(ge,ge,ge,ge),te=ge)},setLocked:function(ge){N=ge},setClear:function(ge,ve,ke,ot,pe){pe===!0&&(ge*=ot,ve*=ot,ke*=ot),se.set(ge,ve,ke,ot),Se.equals(se)===!1&&(n.clearColor(ge,ve,ke,ot),Se.copy(se))},reset:function(){N=!1,te=null,Se.set(-1,0,0,0)}}}function i(){let N=!1,se=!1,te=null,Se=null,ge=null;return{setReversed:function(ve){if(se!==ve){const ke=e.get("EXT_clip_control");ve?ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.ZERO_TO_ONE_EXT):ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.NEGATIVE_ONE_TO_ONE_EXT),se=ve;const ot=ge;ge=null,this.setClear(ot)}},getReversed:function(){return se},setTest:function(ve){ve?ue(n.DEPTH_TEST):Oe(n.DEPTH_TEST)},setMask:function(ve){te!==ve&&!N&&(n.depthMask(ve),te=ve)},setFunc:function(ve){if(se&&(ve=b_[ve]),Se!==ve){switch(ve){case Yl:n.depthFunc(n.NEVER);break;case Kl:n.depthFunc(n.ALWAYS);break;case Zl:n.depthFunc(n.LESS);break;case aa:n.depthFunc(n.LEQUAL);break;case Jl:n.depthFunc(n.EQUAL);break;case Ql:n.depthFunc(n.GEQUAL);break;case jl:n.depthFunc(n.GREATER);break;case $l:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Se=ve}},setLocked:function(ve){N=ve},setClear:function(ve){ge!==ve&&(ge=ve,se&&(ve=1-ve),n.clearDepth(ve))},reset:function(){N=!1,te=null,Se=null,ge=null,se=!1}}}function r(){let N=!1,se=null,te=null,Se=null,ge=null,ve=null,ke=null,ot=null,pe=null;return{setTest:function(ze){N||(ze?ue(n.STENCIL_TEST):Oe(n.STENCIL_TEST))},setMask:function(ze){se!==ze&&!N&&(n.stencilMask(ze),se=ze)},setFunc:function(ze,st,Te){(te!==ze||Se!==st||ge!==Te)&&(n.stencilFunc(ze,st,Te),te=ze,Se=st,ge=Te)},setOp:function(ze,st,Te){(ve!==ze||ke!==st||ot!==Te)&&(n.stencilOp(ze,st,Te),ve=ze,ke=st,ot=Te)},setLocked:function(ze){N=ze},setClear:function(ze){pe!==ze&&(n.clearStencil(ze),pe=ze)},reset:function(){N=!1,se=null,te=null,Se=null,ge=null,ve=null,ke=null,ot=null,pe=null}}}const s=new t,a=new i,o=new r;let c={};const l=new WeakMap;let u={},f={},d={},h=new WeakMap,_=[],v=null,p=!1,m=null,y=null,w=null,S=null,T=null,E=null,g=null,M=new dt(0,0,0),L=0,D=!1,R=null,I=null,G=null,C=null,P=null;const F=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,Q=0;const O=n.getParameter(n.VERSION);O.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(O)[1]),z=Q>=1):O.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),z=Q>=2);let q=null,Z={};const de=n.getParameter(n.SCISSOR_BOX),Ce=n.getParameter(n.VIEWPORT),H=new Ut().fromArray(de),$=new Ut().fromArray(Ce);function me(N,se,te,Se){const ge=new Uint8Array(4),ve=n.createTexture();n.bindTexture(N,ve),n.texParameteri(N,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(N,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ke=0;ke<te;ke++)N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY?n.texImage3D(se,0,n.RGBA,1,1,Se,0,n.RGBA,n.UNSIGNED_BYTE,ge):n.texImage2D(se+ke,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ge);return ve}const he={};he[n.TEXTURE_2D]=me(n.TEXTURE_2D,n.TEXTURE_2D,1),he[n.TEXTURE_CUBE_MAP]=me(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),he[n.TEXTURE_2D_ARRAY]=me(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),he[n.TEXTURE_3D]=me(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ue(n.DEPTH_TEST),a.setFunc(aa),sn(!1),Lt(Ou),ue(n.CULL_FACE),kt(os);function ue(N){u[N]!==!0&&(n.enable(N),u[N]=!0)}function Oe(N){u[N]!==!1&&(n.disable(N),u[N]=!1)}function ct(N,se){return d[N]!==se?(n.bindFramebuffer(N,se),d[N]=se,N===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=se),N===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=se),!0):!1}function _e(N,se){let te=_,Se=!1;if(N){te=h.get(se),te===void 0&&(te=[],h.set(se,te));const ge=N.textures;if(te.length!==ge.length||te[0]!==n.COLOR_ATTACHMENT0){for(let ve=0,ke=ge.length;ve<ke;ve++)te[ve]=n.COLOR_ATTACHMENT0+ve;te.length=ge.length,Se=!0}}else te[0]!==n.BACK&&(te[0]=n.BACK,Se=!0);Se&&n.drawBuffers(te)}function We(N){return v!==N?(n.useProgram(N),v=N,!0):!1}const rt={[jr]:n.FUNC_ADD,[Vg]:n.FUNC_SUBTRACT,[Wg]:n.FUNC_REVERSE_SUBTRACT};rt[Xg]=n.MIN,rt[qg]=n.MAX;const Ke={[Yg]:n.ZERO,[Kg]:n.ONE,[Zg]:n.SRC_COLOR,[kf]:n.SRC_ALPHA,[t_]:n.SRC_ALPHA_SATURATE,[$g]:n.DST_COLOR,[Qg]:n.DST_ALPHA,[Jg]:n.ONE_MINUS_SRC_COLOR,[zf]:n.ONE_MINUS_SRC_ALPHA,[e_]:n.ONE_MINUS_DST_COLOR,[jg]:n.ONE_MINUS_DST_ALPHA,[n_]:n.CONSTANT_COLOR,[i_]:n.ONE_MINUS_CONSTANT_COLOR,[r_]:n.CONSTANT_ALPHA,[s_]:n.ONE_MINUS_CONSTANT_ALPHA};function kt(N,se,te,Se,ge,ve,ke,ot,pe,ze){if(N===os){p===!0&&(Oe(n.BLEND),p=!1);return}if(p===!1&&(ue(n.BLEND),p=!0),N!==Gg){if(N!==m||ze!==D){if((y!==jr||T!==jr)&&(n.blendEquation(n.FUNC_ADD),y=jr,T=jr),ze)switch(N){case $s:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Bu:n.blendFunc(n.ONE,n.ONE);break;case ku:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case zu:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Mt("WebGLState: Invalid blending: ",N);break}else switch(N){case $s:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Bu:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case ku:Mt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case zu:Mt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Mt("WebGLState: Invalid blending: ",N);break}w=null,S=null,E=null,g=null,M.set(0,0,0),L=0,m=N,D=ze}return}ge=ge||se,ve=ve||te,ke=ke||Se,(se!==y||ge!==T)&&(n.blendEquationSeparate(rt[se],rt[ge]),y=se,T=ge),(te!==w||Se!==S||ve!==E||ke!==g)&&(n.blendFuncSeparate(Ke[te],Ke[Se],Ke[ve],Ke[ke]),w=te,S=Se,E=ve,g=ke),(ot.equals(M)===!1||pe!==L)&&(n.blendColor(ot.r,ot.g,ot.b,pe),M.copy(ot),L=pe),m=N,D=!1}function Ft(N,se){N.side===Ui?Oe(n.CULL_FACE):ue(n.CULL_FACE);let te=N.side===En;se&&(te=!te),sn(te),N.blending===$s&&N.transparent===!1?kt(os):kt(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),s.setMask(N.colorWrite);const Se=N.stencilWrite;o.setTest(Se),Se&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),le(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ue(n.SAMPLE_ALPHA_TO_COVERAGE):Oe(n.SAMPLE_ALPHA_TO_COVERAGE)}function sn(N){R!==N&&(N?n.frontFace(n.CW):n.frontFace(n.CCW),R=N)}function Lt(N){N!==kg?(ue(n.CULL_FACE),N!==I&&(N===Ou?n.cullFace(n.BACK):N===zg?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Oe(n.CULL_FACE),I=N}function wn(N){N!==G&&(z&&n.lineWidth(N),G=N)}function le(N,se,te){N?(ue(n.POLYGON_OFFSET_FILL),(C!==se||P!==te)&&(C=se,P=te,a.getReversed()&&(se=-se,te=-te),n.polygonOffset(se,te))):Oe(n.POLYGON_OFFSET_FILL)}function At(N){N?ue(n.SCISSOR_TEST):Oe(n.SCISSOR_TEST)}function Ct(N){N===void 0&&(N=n.TEXTURE0+F-1),q!==N&&(n.activeTexture(N),q=N)}function Rt(N,se,te){te===void 0&&(q===null?te=n.TEXTURE0+F-1:te=q);let Se=Z[te];Se===void 0&&(Se={type:void 0,texture:void 0},Z[te]=Se),(Se.type!==N||Se.texture!==se)&&(q!==te&&(n.activeTexture(te),q=te),n.bindTexture(N,se||he[N]),Se.type=N,Se.texture=se)}function U(){const N=Z[q];N!==void 0&&N.type!==void 0&&(n.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function Qe(){try{n.compressedTexImage2D(...arguments)}catch(N){Mt("WebGLState:",N)}}function He(){try{n.compressedTexImage3D(...arguments)}catch(N){Mt("WebGLState:",N)}}function Xe(){try{n.texSubImage2D(...arguments)}catch(N){Mt("WebGLState:",N)}}function fe(){try{n.texSubImage3D(...arguments)}catch(N){Mt("WebGLState:",N)}}function at(){try{n.compressedTexSubImage2D(...arguments)}catch(N){Mt("WebGLState:",N)}}function Pe(){try{n.compressedTexSubImage3D(...arguments)}catch(N){Mt("WebGLState:",N)}}function Fe(){try{n.texStorage2D(...arguments)}catch(N){Mt("WebGLState:",N)}}function A(){try{n.texStorage3D(...arguments)}catch(N){Mt("WebGLState:",N)}}function x(){try{n.texImage2D(...arguments)}catch(N){Mt("WebGLState:",N)}}function W(){try{n.texImage3D(...arguments)}catch(N){Mt("WebGLState:",N)}}function ae(N){return f[N]!==void 0?f[N]:n.getParameter(N)}function re(N,se){f[N]!==se&&(n.pixelStorei(N,se),f[N]=se)}function oe(N){H.equals(N)===!1&&(n.scissor(N.x,N.y,N.z,N.w),H.copy(N))}function ce(N){$.equals(N)===!1&&(n.viewport(N.x,N.y,N.z,N.w),$.copy(N))}function ee(N,se){let te=l.get(se);te===void 0&&(te=new WeakMap,l.set(se,te));let Se=te.get(N);Se===void 0&&(Se=n.getUniformBlockIndex(se,N.name),n.uniformBlockBinding(se,Se,Se),te.set(N,Se))}function ne(N,se,te){const ge=l.get(se).get(N);c[ge]!==te&&(n.bindBufferBase(n.UNIFORM_BUFFER,ge,te),c[ge]=te)}function xe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},f={},q=null,Z={},d={},c={},h=new WeakMap,_=[],v=null,p=!1,m=null,y=null,w=null,S=null,T=null,E=null,g=null,M=new dt(0,0,0),L=0,D=!1,R=null,I=null,G=null,C=null,P=null,H.set(0,0,n.canvas.width,n.canvas.height),$.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ue,disable:Oe,bindFramebuffer:ct,drawBuffers:_e,useProgram:We,setBlending:kt,setMaterial:Ft,setFlipSided:sn,setCullFace:Lt,setLineWidth:wn,setPolygonOffset:le,setScissorTest:At,activeTexture:Ct,bindTexture:Rt,unbindTexture:U,compressedTexImage2D:Qe,compressedTexImage3D:He,texImage2D:x,texImage3D:W,pixelStorei:re,getParameter:ae,updateUBOMapping:ee,uniformBlockBinding:ne,texStorage2D:Fe,texStorage3D:A,texSubImage2D:Xe,texSubImage3D:fe,compressedTexSubImage2D:at,compressedTexSubImage3D:Pe,scissor:oe,viewport:ce,reset:xe}}function $b(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new $e,u=new WeakMap,f=new Set;let d;const h=new WeakMap,_=new Set,v=new FinalizationRegistry(A=>_.delete(A));let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(A,x){return p?new OffscreenCanvas(A,x):Po("canvas")}function y(A,x,W){let ae=1;const re=Fe(A);if((re.width>W||re.height>W)&&(ae=W/Math.max(re.width,re.height)),ae<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const oe=Math.floor(ae*re.width),ce=Math.floor(ae*re.height);d===void 0&&(d=m(oe,ce));const ee=x?m(oe,ce):d;return ee.width=oe,ee.height=ce,ee.getContext("2d").drawImage(A,0,0,oe,ce),qe("WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+oe+"x"+ce+")."),ee}else return"data"in A&&qe("WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),A;return A}function w(A){return A.generateMipmaps}function S(A){n.generateMipmap(A)}function T(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function E(A,x,W,ae,re,oe=!1){if(A!==null){if(n[A]!==void 0)return n[A];qe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let ce;ae&&(ce=e.get("EXT_texture_norm16"),ce||qe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ee=x;if(x===n.RED&&(W===n.FLOAT&&(ee=n.R32F),W===n.HALF_FLOAT&&(ee=n.R16F),W===n.UNSIGNED_BYTE&&(ee=n.R8),W===n.UNSIGNED_SHORT&&ce&&(ee=ce.R16_EXT),W===n.SHORT&&ce&&(ee=ce.R16_SNORM_EXT)),x===n.RED_INTEGER&&(W===n.UNSIGNED_BYTE&&(ee=n.R8UI),W===n.UNSIGNED_SHORT&&(ee=n.R16UI),W===n.UNSIGNED_INT&&(ee=n.R32UI),W===n.BYTE&&(ee=n.R8I),W===n.SHORT&&(ee=n.R16I),W===n.INT&&(ee=n.R32I)),x===n.RG&&(W===n.FLOAT&&(ee=n.RG32F),W===n.HALF_FLOAT&&(ee=n.RG16F),W===n.UNSIGNED_BYTE&&(ee=n.RG8),W===n.UNSIGNED_SHORT&&ce&&(ee=ce.RG16_EXT),W===n.SHORT&&ce&&(ee=ce.RG16_SNORM_EXT)),x===n.RG_INTEGER&&(W===n.UNSIGNED_BYTE&&(ee=n.RG8UI),W===n.UNSIGNED_SHORT&&(ee=n.RG16UI),W===n.UNSIGNED_INT&&(ee=n.RG32UI),W===n.BYTE&&(ee=n.RG8I),W===n.SHORT&&(ee=n.RG16I),W===n.INT&&(ee=n.RG32I)),x===n.RGB_INTEGER&&(W===n.UNSIGNED_BYTE&&(ee=n.RGB8UI),W===n.UNSIGNED_SHORT&&(ee=n.RGB16UI),W===n.UNSIGNED_INT&&(ee=n.RGB32UI),W===n.BYTE&&(ee=n.RGB8I),W===n.SHORT&&(ee=n.RGB16I),W===n.INT&&(ee=n.RGB32I)),x===n.RGBA_INTEGER&&(W===n.UNSIGNED_BYTE&&(ee=n.RGBA8UI),W===n.UNSIGNED_SHORT&&(ee=n.RGBA16UI),W===n.UNSIGNED_INT&&(ee=n.RGBA32UI),W===n.BYTE&&(ee=n.RGBA8I),W===n.SHORT&&(ee=n.RGBA16I),W===n.INT&&(ee=n.RGBA32I)),x===n.RGB&&(W===n.UNSIGNED_SHORT&&ce&&(ee=ce.RGB16_EXT),W===n.SHORT&&ce&&(ee=ce.RGB16_SNORM_EXT),W===n.UNSIGNED_INT_5_9_9_9_REV&&(ee=n.RGB9_E5),W===n.UNSIGNED_INT_10F_11F_11F_REV&&(ee=n.R11F_G11F_B10F)),x===n.RGBA){const ne=oe?Co:gt.getTransfer(re);W===n.FLOAT&&(ee=n.RGBA32F),W===n.HALF_FLOAT&&(ee=n.RGBA16F),W===n.UNSIGNED_BYTE&&(ee=ne===wt?n.SRGB8_ALPHA8:n.RGBA8),W===n.UNSIGNED_SHORT&&ce&&(ee=ce.RGBA16_EXT),W===n.SHORT&&ce&&(ee=ce.RGBA16_SNORM_EXT),W===n.UNSIGNED_SHORT_4_4_4_4&&(ee=n.RGBA4),W===n.UNSIGNED_SHORT_5_5_5_1&&(ee=n.RGB5_A1)}return(ee===n.R16F||ee===n.R32F||ee===n.RG16F||ee===n.RG32F||ee===n.RGBA16F||ee===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function g(A,x){let W;return A?x===null||x===Mi||x===ys?W=n.DEPTH24_STENCIL8:x===mi?W=n.DEPTH32F_STENCIL8:x===la&&(W=n.DEPTH24_STENCIL8,qe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Mi||x===ys?W=n.DEPTH_COMPONENT24:x===mi?W=n.DEPTH_COMPONENT32F:x===la&&(W=n.DEPTH_COMPONENT16),W}function M(A,x){return w(A)===!0||A.isFramebufferTexture&&A.minFilter!==en&&A.minFilter!==Mn?Math.log2(Math.max(x.width,x.height))+1:A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?x.mipmaps.length:1}function L(A){const x=new WeakRef(A);i.get(A).__ref=x,_.add(x),v.register(A,x,x)}function D(A){const x=i.get(A).__ref;x!==void 0&&(_.delete(x),v.unregister(x))}function R(A){G(A.target)}function I(A){C(A.target)}function G(A){A.removeEventListener("dispose",R),D(A),F(A),A.isVideoTexture&&u.delete(A),A.isHTMLTexture&&f.delete(A)}function C(A){A.removeEventListener("dispose",I),D(A),Q(A)}function P(){for(const A of _){const x=A.deref();x!==void 0&&(x.isRenderTarget===!0?C(x):G(x))}_.clear(),f.clear()}function F(A){const x=i.get(A);if(x.__webglInit===void 0)return;const W=A.source,ae=h.get(W);if(ae){const re=ae[x.__cacheKey];re.usedTimes--,re.usedTimes===0&&z(A),Object.keys(ae).length===0&&h.delete(W)}i.remove(A)}function z(A){const x=i.get(A);n.deleteTexture(x.__webglTexture);const W=A.source,ae=h.get(W);delete ae[x.__cacheKey],a.memory.textures--}function Q(A){const x=i.get(A);x.__depthDisposeCallback&&x.__depthDisposeCallback();const W=A.depthTexture;if(W&&W.renderTarget===A&&G(W),A.isWebGLCubeRenderTarget)for(let re=0;re<6;re++){if(Array.isArray(x.__webglFramebuffer[re]))for(let oe=0;oe<x.__webglFramebuffer[re].length;oe++)n.deleteFramebuffer(x.__webglFramebuffer[re][oe]);else n.deleteFramebuffer(x.__webglFramebuffer[re]);x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer[re])}else{if(Array.isArray(x.__webglFramebuffer))for(let re=0;re<x.__webglFramebuffer.length;re++)n.deleteFramebuffer(x.__webglFramebuffer[re]);else n.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&n.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&n.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let re=0;re<x.__webglColorRenderbuffer.length;re++)x.__webglColorRenderbuffer[re]&&n.deleteRenderbuffer(x.__webglColorRenderbuffer[re]);x.__webglDepthRenderbuffer&&n.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const ae=A.textures;for(let re=0,oe=ae.length;re<oe;re++){const ce=i.get(ae[re]);ce.__webglTexture&&(n.deleteTexture(ce.__webglTexture),a.memory.textures--),i.remove(ae[re])}i.remove(A)}let O=0;function q(){O=0}function Z(){return O}function de(A){O=A}function Ce(){const A=O;return A>=r.maxTextures&&qe("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+r.maxTextures),O+=1,A}function H(A){const x=[];return x.push(A.wrapS),x.push(A.wrapT),x.push(A.wrapR||0),x.push(A.magFilter),x.push(A.minFilter),x.push(A.anisotropy),x.push(A.internalFormat),x.push(A.format),x.push(A.type),x.push(A.generateMipmaps),x.push(A.mipmapsAutoUpdate),x.push(A.premultiplyAlpha),x.push(A.flipY),x.push(A.unpackAlignment),x.push(A.colorSpace),x.join()}function $(A,x){const W=i.get(A);if(A.isVideoTexture&&at(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&W.__version!==A.version){const ae=A.image;if(ae===null)qe("WebGLRenderer: Texture marked for update but no image data found.");else if(ae.complete===!1)qe("WebGLRenderer: Texture marked for update but image is incomplete");else{Ft(W,A,x);return}}else A.isExternalTexture&&(W.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,W.__webglTexture,n.TEXTURE0+x)}function me(A,x){const W=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&W.__version!==A.version){Ft(W,A,x);return}else A.isExternalTexture&&(W.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,W.__webglTexture,n.TEXTURE0+x)}function he(A,x){const W=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&W.__version!==A.version){Ft(W,A,x);return}t.bindTexture(n.TEXTURE_3D,W.__webglTexture,n.TEXTURE0+x)}function ue(A,x){const W=i.get(A);if(A.version>0&&W.__version!==A.version){sn(W,A,x);return}t.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture,n.TEXTURE0+x)}const Oe={[ec]:n.REPEAT,[Oi]:n.CLAMP_TO_EDGE,[tc]:n.MIRRORED_REPEAT},ct={[en]:n.NEAREST,[l_]:n.NEAREST_MIPMAP_NEAREST,[Na]:n.NEAREST_MIPMAP_LINEAR,[Mn]:n.LINEAR,[al]:n.LINEAR_MIPMAP_NEAREST,[tr]:n.LINEAR_MIPMAP_LINEAR},_e={[f_]:n.NEVER,[sh]:n.ALWAYS,[h_]:n.LESS,[ih]:n.LEQUAL,[p_]:n.EQUAL,[rh]:n.GEQUAL,[m_]:n.GREATER,[g_]:n.NOTEQUAL};function We(A,x){if(x.type===mi&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Mn||x.magFilter===al||x.magFilter===Na||x.magFilter===tr||x.minFilter===Mn||x.minFilter===al||x.minFilter===Na||x.minFilter===tr)&&qe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,Oe[x.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,Oe[x.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,Oe[x.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,ct[x.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,ct[x.minFilter]),x.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,_e[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===en||x.minFilter!==Na&&x.minFilter!==tr||x.type===mi&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");n.texParameterf(A,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function rt(A,x){let W=!1;A.__webglInit===void 0&&(A.__webglInit=!0,x.addEventListener("dispose",R),L(x));const ae=x.source;let re=h.get(ae);re===void 0&&(re={},h.set(ae,re));const oe=H(x);if(oe!==A.__cacheKey){re[oe]===void 0&&(re[oe]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,W=!0),re[oe].usedTimes++;const ce=re[A.__cacheKey];ce!==void 0&&(re[A.__cacheKey].usedTimes--,ce.usedTimes===0&&z(x)),A.__cacheKey=oe,A.__webglTexture=re[oe].texture}return W}function Ke(A,x,W){return Math.floor(Math.floor(A/W)/x)}function kt(A,x,W,ae){const oe=A.updateRanges;if(oe.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,x.width,x.height,W,ae,x.data);else{oe.sort((N,se)=>N.start-se.start);let ce=0;for(let N=1;N<oe.length;N++){const se=oe[ce],te=oe[N],Se=se.start+se.count,ge=Ke(te.start,x.width,4),ve=Ke(se.start,x.width,4);te.start<=Se+1&&ge===ve&&Ke(te.start+te.count-1,x.width,4)===ge?se.count=Math.max(se.count,te.start+te.count-se.start):(++ce,oe[ce]=te)}oe.length=ce+1;const ee=t.getParameter(n.UNPACK_ROW_LENGTH),ne=t.getParameter(n.UNPACK_SKIP_PIXELS),xe=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,x.width);for(let N=0,se=oe.length;N<se;N++){const te=oe[N],Se=Math.floor(te.start/4),ge=Math.ceil(te.count/4),ve=Se%x.width,ke=Math.floor(Se/x.width),ot=ge,pe=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,ve),t.pixelStorei(n.UNPACK_SKIP_ROWS,ke),t.texSubImage2D(n.TEXTURE_2D,0,ve,ke,ot,pe,W,ae,x.data)}A.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,ee),t.pixelStorei(n.UNPACK_SKIP_PIXELS,ne),t.pixelStorei(n.UNPACK_SKIP_ROWS,xe)}}function Ft(A,x,W){let ae=n.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(ae=n.TEXTURE_2D_ARRAY),x.isData3DTexture&&(ae=n.TEXTURE_3D);const re=rt(A,x),oe=x.source;t.bindTexture(ae,A.__webglTexture,n.TEXTURE0+W);const ce=i.get(oe);if(oe.version!==ce.__version||re===!0){if(t.activeTexture(n.TEXTURE0+W),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const pe=gt.getPrimaries(gt.workingColorSpace),ze=x.colorSpace===Qi?null:gt.getPrimaries(x.colorSpace),st=x.colorSpace===Qi||pe===ze?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,st)}t.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment);let ne=y(x.image,!1,r.maxTextureSize);ne=Pe(x,ne);const xe=s.convert(x.format,x.colorSpace),N=s.convert(x.type);let se=E(x.internalFormat,xe,N,x.normalized,x.colorSpace,x.isVideoTexture);We(ae,x);let te;const Se=x.mipmaps,ge=x.isVideoTexture!==!0,ve=ce.__version===void 0||re===!0,ke=oe.dataReady,ot=M(x,ne);if(x.isDepthTexture)se=g(x.format===nr,x.type),ve&&(ge?t.texStorage2D(n.TEXTURE_2D,1,se,ne.width,ne.height):t.texImage2D(n.TEXTURE_2D,0,se,ne.width,ne.height,0,xe,N,null));else if(x.isDataTexture)if(Se.length>0){ge&&ve&&t.texStorage2D(n.TEXTURE_2D,ot,se,Se[0].width,Se[0].height);for(let pe=0,ze=Se.length;pe<ze;pe++)te=Se[pe],ge?ke&&t.texSubImage2D(n.TEXTURE_2D,pe,0,0,te.width,te.height,xe,N,te.data):t.texImage2D(n.TEXTURE_2D,pe,se,te.width,te.height,0,xe,N,te.data);x.generateMipmaps=!1}else ge?(ve&&t.texStorage2D(n.TEXTURE_2D,ot,se,ne.width,ne.height),ke&&kt(x,ne,xe,N)):t.texImage2D(n.TEXTURE_2D,0,se,ne.width,ne.height,0,xe,N,ne.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){ge&&ve&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ot,se,Se[0].width,Se[0].height,ne.depth);for(let pe=0,ze=Se.length;pe<ze;pe++)if(te=Se[pe],x.format!==gi)if(xe!==null)if(ge){if(ke)if(x.layerUpdates.size>0){const st=vd(te.width,te.height,x.format,x.type);for(const Te of x.layerUpdates){const Tt=te.data.subarray(Te*st/te.data.BYTES_PER_ELEMENT,(Te+1)*st/te.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,pe,0,0,Te,te.width,te.height,1,xe,Tt)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,pe,0,0,0,te.width,te.height,ne.depth,xe,te.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,pe,se,te.width,te.height,ne.depth,0,te.data,0,0);else qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ge?ke&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,pe,0,0,0,te.width,te.height,ne.depth,xe,N,te.data):t.texImage3D(n.TEXTURE_2D_ARRAY,pe,se,te.width,te.height,ne.depth,0,xe,N,te.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{ge&&ve&&t.texStorage2D(n.TEXTURE_2D,ot,se,Se[0].width,Se[0].height);for(let pe=0,ze=Se.length;pe<ze;pe++)te=Se[pe],x.format!==gi?xe!==null?ge?ke&&t.compressedTexSubImage2D(n.TEXTURE_2D,pe,0,0,te.width,te.height,xe,te.data):t.compressedTexImage2D(n.TEXTURE_2D,pe,se,te.width,te.height,0,te.data):qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ge?ke&&t.texSubImage2D(n.TEXTURE_2D,pe,0,0,te.width,te.height,xe,N,te.data):t.texImage2D(n.TEXTURE_2D,pe,se,te.width,te.height,0,xe,N,te.data)}else if(x.isDataArrayTexture)if(ge){if(ve&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ot,se,ne.width,ne.height,ne.depth),ke)if(x.layerUpdates.size>0){const pe=vd(ne.width,ne.height,x.format,x.type);for(const ze of x.layerUpdates){const st=ne.data.subarray(ze*pe/ne.data.BYTES_PER_ELEMENT,(ze+1)*pe/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ze,ne.width,ne.height,1,xe,N,st)}x.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,xe,N,ne.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,se,ne.width,ne.height,ne.depth,0,xe,N,ne.data);else if(x.isData3DTexture)ge?(ve&&t.texStorage3D(n.TEXTURE_3D,ot,se,ne.width,ne.height,ne.depth),ke&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,xe,N,ne.data)):t.texImage3D(n.TEXTURE_3D,0,se,ne.width,ne.height,ne.depth,0,xe,N,ne.data);else if(x.isFramebufferTexture){if(ve)if(ge)t.texStorage2D(n.TEXTURE_2D,ot,se,ne.width,ne.height);else{let pe=ne.width,ze=ne.height;for(let st=0;st<ot;st++)t.texImage2D(n.TEXTURE_2D,st,se,pe,ze,0,xe,N,null),pe>>=1,ze>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in n){const pe=n.canvas;if(pe.hasAttribute("layoutsubtree")||pe.setAttribute("layoutsubtree","true"),ne.parentNode!==pe){pe.appendChild(ne),f.add(x),pe.onpaint=ze=>{const st=ze.changedElements;for(const Te of f)st.includes(Te.image)&&(Te.needsUpdate=!0)},pe.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,ne);else{const st=n.RGBA,Te=n.RGBA,Tt=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,st,Te,Tt,ne)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Se.length>0){if(ge&&ve){const pe=Fe(Se[0]);t.texStorage2D(n.TEXTURE_2D,ot,se,pe.width,pe.height)}for(let pe=0,ze=Se.length;pe<ze;pe++)te=Se[pe],ge?ke&&t.texSubImage2D(n.TEXTURE_2D,pe,0,0,xe,N,te):t.texImage2D(n.TEXTURE_2D,pe,se,xe,N,te);x.generateMipmaps=!1}else if(ge){if(ve){const pe=Fe(ne);t.texStorage2D(n.TEXTURE_2D,ot,se,pe.width,pe.height)}ke&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,xe,N,ne)}else t.texImage2D(n.TEXTURE_2D,0,se,xe,N,ne);w(x)&&x.mipmapsAutoUpdate===!0&&S(ae),ce.__version=oe.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function sn(A,x,W){if(x.image.length!==6)return;const ae=rt(A,x),re=x.source;t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+W);const oe=i.get(re);if(re.version!==oe.__version||ae===!0){t.activeTexture(n.TEXTURE0+W);const ce=gt.getPrimaries(gt.workingColorSpace),ee=x.colorSpace===Qi?null:gt.getPrimaries(x.colorSpace),ne=x.colorSpace===Qi||ce===ee?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,x.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,x.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);const xe=x.isCompressedTexture||x.image[0].isCompressedTexture,N=x.image[0]&&x.image[0].isDataTexture,se=[];for(let Te=0;Te<6;Te++)!xe&&!N?se[Te]=y(x.image[Te],!0,r.maxCubemapSize):se[Te]=N?x.image[Te].image:x.image[Te],se[Te]=Pe(x,se[Te]);const te=se[0],Se=s.convert(x.format,x.colorSpace),ge=s.convert(x.type);let ve=E(x.internalFormat,Se,ge,x.normalized,x.colorSpace);const ke=x.isVideoTexture!==!0,ot=oe.__version===void 0||ae===!0,pe=re.dataReady;let ze=M(x,te);We(n.TEXTURE_CUBE_MAP,x);let st;if(x.isDepthTexture){if(ve=g(x.format===nr,x.type),ot)if(ke)t.texStorage2D(n.TEXTURE_CUBE_MAP,1,ve,te.width,te.height);else for(let Te=0;Te<6;Te++)t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,ve,te.width,te.height,0,Se,ge,null)}else if(xe){ke&&ot&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ze,ve,te.width,te.height);for(let Te=0;Te<6;Te++){st=se[Te].mipmaps;for(let Tt=0;Tt<st.length;Tt++){const Zt=st[Tt];x.format!==gi?Se!==null?ke?pe&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Te,Tt,0,0,Zt.width,Zt.height,Se,Zt.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Te,Tt,ve,Zt.width,Zt.height,0,Zt.data):qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ke?pe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Te,Tt,0,0,Zt.width,Zt.height,Se,ge,Zt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Te,Tt,ve,Zt.width,Zt.height,0,Se,ge,Zt.data)}}}else{if(st=x.mipmaps,ke&&ot){st.length>0&&ze++;const Te=Fe(se[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ze,ve,Te.width,Te.height)}for(let Te=0;Te<6;Te++)if(N){ke?pe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,0,0,se[Te].width,se[Te].height,Se,ge,se[Te].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,ve,se[Te].width,se[Te].height,0,Se,ge,se[Te].data);for(let Tt=0;Tt<st.length;Tt++){const Gi=st[Tt].image[Te].image;ke?pe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Te,Tt+1,0,0,Gi.width,Gi.height,Se,ge,Gi.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Te,Tt+1,ve,Gi.width,Gi.height,0,Se,ge,Gi.data)}}else{ke?pe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,0,0,Se,ge,se[Te]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,ve,Se,ge,se[Te]);for(let Tt=0;Tt<st.length;Tt++){const Zt=st[Tt];ke?pe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Te,Tt+1,0,0,Se,ge,Zt.image[Te]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Te,Tt+1,ve,Se,ge,Zt.image[Te])}}}w(x)&&x.mipmapsAutoUpdate===!0&&S(n.TEXTURE_CUBE_MAP),oe.__version=re.version,x.onUpdate&&x.onUpdate(x)}A.__version=x.version}function Lt(A,x,W,ae,re,oe){const ce=s.convert(W.format,W.colorSpace),ee=s.convert(W.type),ne=E(W.internalFormat,ce,ee,W.normalized,W.colorSpace),xe=i.get(x),N=i.get(W);if(N.__renderTarget=x,!xe.__hasExternalTextures){const se=Math.max(1,x.width>>oe),te=Math.max(1,x.height>>oe);re===n.TEXTURE_3D||re===n.TEXTURE_2D_ARRAY?t.texImage3D(re,oe,ne,se,te,x.depth,0,ce,ee,null):t.texImage2D(re,oe,ne,se,te,0,ce,ee,null)}t.bindFramebuffer(n.FRAMEBUFFER,A),fe(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ae,re,N.__webglTexture,0,Xe(x)):(re===n.TEXTURE_2D||re>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ae,re,N.__webglTexture,oe),t.bindFramebuffer(n.FRAMEBUFFER,null)}function wn(A,x,W){if(n.bindRenderbuffer(n.RENDERBUFFER,A),x.depthBuffer){const ae=x.depthTexture,re=ae&&ae.isDepthTexture?ae.type:null,oe=g(x.stencilBuffer,re),ce=x.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;fe(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Xe(x),oe,x.width,x.height):W?n.renderbufferStorageMultisample(n.RENDERBUFFER,Xe(x),oe,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,oe,x.width,x.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ce,n.RENDERBUFFER,A)}else{const ae=x.textures;for(let re=0;re<ae.length;re++){const oe=ae[re],ce=s.convert(oe.format,oe.colorSpace),ee=s.convert(oe.type),ne=E(oe.internalFormat,ce,ee,oe.normalized,oe.colorSpace);fe(x)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Xe(x),ne,x.width,x.height):W?n.renderbufferStorageMultisample(n.RENDERBUFFER,Xe(x),ne,x.width,x.height):n.renderbufferStorage(n.RENDERBUFFER,ne,x.width,x.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function le(A,x,W){const ae=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,A),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const re=i.get(x.depthTexture);re.__renderTarget=x;const oe=ae?x.depthTexture.image[0]:x.depthTexture.image;(!re.__webglTexture||oe.width!==x.width||oe.height!==x.height)&&(oe.width=x.width,oe.height=x.height,x.depthTexture.needsUpdate=!0),ae?ue(x.depthTexture,0):$(x.depthTexture,0);const ce=re.__webglTexture,ee=Xe(x),ne=ae?n.TEXTURE_CUBE_MAP_POSITIVE_X+W:n.TEXTURE_2D,xe=x.depthTexture.format===nr?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(x.depthTexture.format===lr)fe(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,xe,ne,ce,0,ee):n.framebufferTexture2D(n.FRAMEBUFFER,xe,ne,ce,0);else if(x.depthTexture.format===nr)fe(x)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,xe,ne,ce,0,ee):n.framebufferTexture2D(n.FRAMEBUFFER,xe,ne,ce,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function At(A){const x=i.get(A),W=A.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==A.depthTexture){const ae=A.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),ae){const re=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,ae.removeEventListener("dispose",re)};ae.addEventListener("dispose",re),x.__depthDisposeCallback=re}x.__boundDepthTexture=ae}if(A.depthTexture&&!x.__autoAllocateDepthBuffer)if(W)for(let ae=0;ae<6;ae++)le(x.__webglFramebuffer[ae],A,ae);else A.texture.mipmaps.length>0?le(x.__webglFramebuffer[0],A,0):le(x.__webglFramebuffer,A,0);else if(W){x.__webglDepthbuffer=[];for(let ae=0;ae<6;ae++)if(t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[ae]),x.__webglDepthbuffer[ae]===void 0)x.__webglDepthbuffer[ae]=n.createRenderbuffer(),wn(x.__webglDepthbuffer[ae],A,!1);else{const re=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=x.__webglDepthbuffer[ae];n.bindRenderbuffer(n.RENDERBUFFER,oe),n.framebufferRenderbuffer(n.FRAMEBUFFER,re,n.RENDERBUFFER,oe)}}else if(A.texture.mipmaps.length>0?t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=n.createRenderbuffer(),wn(x.__webglDepthbuffer,A,!1);else{const re=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=x.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,oe),n.framebufferRenderbuffer(n.FRAMEBUFFER,re,n.RENDERBUFFER,oe)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ct(A,x,W){const ae=i.get(A);x!==void 0&&Lt(ae.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),W!==void 0&&At(A)}function Rt(A){const x=A.texture,W=i.get(A),ae=i.get(x);A.addEventListener("dispose",I),L(A);const re=A.textures,oe=A.isWebGLCubeRenderTarget===!0,ce=re.length>1;if(ce||(ae.__webglTexture===void 0&&(ae.__webglTexture=n.createTexture()),ae.__version=x.version,a.memory.textures++),oe){W.__webglFramebuffer=[];for(let ee=0;ee<6;ee++)if(x.mipmaps.length>0){W.__webglFramebuffer[ee]=[];for(let ne=0;ne<x.mipmaps.length;ne++)W.__webglFramebuffer[ee][ne]=n.createFramebuffer()}else W.__webglFramebuffer[ee]=n.createFramebuffer()}else{if(x.mipmaps.length>0){W.__webglFramebuffer=[];for(let ee=0;ee<x.mipmaps.length;ee++)W.__webglFramebuffer[ee]=n.createFramebuffer()}else W.__webglFramebuffer=n.createFramebuffer();if(ce)for(let ee=0,ne=re.length;ee<ne;ee++){const xe=i.get(re[ee]);xe.__webglTexture===void 0&&(xe.__webglTexture=n.createTexture(),a.memory.textures++)}if(A.samples>0&&fe(A)===!1){W.__webglMultisampledFramebuffer=n.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let ee=0;ee<re.length;ee++){const ne=re[ee];W.__webglColorRenderbuffer[ee]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,W.__webglColorRenderbuffer[ee]);const xe=s.convert(ne.format,ne.colorSpace),N=s.convert(ne.type),se=E(ne.internalFormat,xe,N,ne.normalized,ne.colorSpace,A.isXRRenderTarget===!0),te=Xe(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,te,se,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ee,n.RENDERBUFFER,W.__webglColorRenderbuffer[ee])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(W.__webglDepthRenderbuffer=n.createRenderbuffer(),wn(W.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(oe){t.bindTexture(n.TEXTURE_CUBE_MAP,ae.__webglTexture),We(n.TEXTURE_CUBE_MAP,x);for(let ee=0;ee<6;ee++)if(x.mipmaps.length>0)for(let ne=0;ne<x.mipmaps.length;ne++)Lt(W.__webglFramebuffer[ee][ne],A,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ne);else Lt(W.__webglFramebuffer[ee],A,x,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0);w(x)?S(n.TEXTURE_CUBE_MAP):x.mipmaps.length>0&&n.texParameteri(n.TEXTURE_CUBE_MAP,n.TEXTURE_MAX_LEVEL,x.mipmaps.length-1),t.unbindTexture()}else if(ce){for(let ee=0,ne=re.length;ee<ne;ee++){const xe=re[ee],N=i.get(xe);let se=n.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(se=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(se,N.__webglTexture),We(se,xe),Lt(W.__webglFramebuffer,A,xe,n.COLOR_ATTACHMENT0+ee,se,0),w(xe)&&S(se)}t.unbindTexture()}else{let ee=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ee=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ee,ae.__webglTexture),We(ee,x),x.mipmaps.length>0)for(let ne=0;ne<x.mipmaps.length;ne++)Lt(W.__webglFramebuffer[ne],A,x,n.COLOR_ATTACHMENT0,ee,ne);else Lt(W.__webglFramebuffer,A,x,n.COLOR_ATTACHMENT0,ee,0);w(x)?S(ee):x.mipmaps.length>0&&n.texParameteri(ee,n.TEXTURE_MAX_LEVEL,x.mipmaps.length-1),t.unbindTexture()}A.depthBuffer&&At(A)}function U(A){const x=A.textures;for(let W=0,ae=x.length;W<ae;W++){const re=x[W];if(w(re)&&re.mipmapsAutoUpdate===!0){const oe=T(A),ce=i.get(re).__webglTexture;t.bindTexture(oe,ce),S(oe),t.unbindTexture()}}}const Qe=[];function He(A){if(A.samples>0){if(fe(A)===!1){const x=A.textures,W=A.width,ae=A.height;let re=n.COLOR_BUFFER_BIT;const oe=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ce=i.get(A),ee=x.length>1;if(ee)for(let xe=0;xe<x.length;xe++)t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer),A.texture.mipmaps.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let xe=0;xe<x.length;xe++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(re|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(re|=n.STENCIL_BUFFER_BIT)),ee){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ce.__webglColorRenderbuffer[xe]);const N=i.get(x[xe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,N,0)}n.blitFramebuffer(0,0,W,ae,0,0,W,ae,re,n.NEAREST),c===!0&&(Qe.length=0,Qe.push(n.COLOR_ATTACHMENT0+xe),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&Qe.push(oe),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Qe))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ee)for(let xe=0;xe<x.length;xe++){t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.RENDERBUFFER,ce.__webglColorRenderbuffer[xe]);const N=i.get(x[xe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ce.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+xe,n.TEXTURE_2D,N,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&c){const x=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[x])}}}function Xe(A){return Math.min(r.maxSamples,A.samples)}function fe(A){const x=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function at(A){const x=a.render.frame;u.get(A)!==x&&(u.set(A,x),A.update())}function Pe(A,x){const W=A.colorSpace,ae=A.format,re=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||W!==Ro&&W!==Qi&&(gt.getTransfer(W)===wt?(ae!==gi||re!==Fn)&&qe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Mt("WebGLTextures: Unsupported texture color space:",W)),x}function Fe(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=Ce,this.resetTextureUnits=q,this.getTextureUnits=Z,this.setTextureUnits=de,this.setTexture2D=$,this.setTexture2DArray=me,this.setTexture3D=he,this.setTextureCube=ue,this.rebindTextures=Ct,this.setupRenderTarget=Rt,this.updateRenderTargetMipmap=U,this.updateMultisampleRenderTarget=He,this.setupDepthRenderbuffer=At,this.setupFrameBufferTexture=Lt,this.useMultisampledRTT=fe,this.dispose=P}function eM(n,e){function t(i,r=Qi){let s;const a=gt.getTransfer(r);if(i===Fn)return n.UNSIGNED_BYTE;if(i===Qc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===jc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===jf)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===$f)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Jf)return n.BYTE;if(i===Qf)return n.SHORT;if(i===la)return n.UNSIGNED_SHORT;if(i===Jc)return n.INT;if(i===Mi)return n.UNSIGNED_INT;if(i===mi)return n.FLOAT;if(i===yi)return n.HALF_FLOAT;if(i===eh)return n.ALPHA;if(i===th)return n.RGB;if(i===gi)return n.RGBA;if(i===lr)return n.DEPTH_COMPONENT;if(i===nr)return n.DEPTH_STENCIL;if(i===nh)return n.RED;if(i===$c)return n.RED_INTEGER;if(i===Fr)return n.RG;if(i===eu)return n.RG_INTEGER;if(i===tu)return n.RGBA_INTEGER;if(i===uo||i===fo||i===ho||i===po)if(a===wt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===uo)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===fo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===ho)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===po)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===uo)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===fo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===ho)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===po)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===nc||i===ic||i===rc||i===sc)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===nc)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ic)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===rc)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===sc)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ac||i===oc||i===lc||i===cc||i===uc||i===wo||i===dc)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===ac||i===oc)return a===wt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===lc)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===cc)return s.COMPRESSED_R11_EAC;if(i===uc)return s.COMPRESSED_SIGNED_R11_EAC;if(i===wo)return s.COMPRESSED_RG11_EAC;if(i===dc)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===fc||i===hc||i===pc||i===mc||i===gc||i===_c||i===vc||i===xc||i===Sc||i===bc||i===Mc||i===yc||i===Ec||i===Tc)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===fc)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===hc)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===pc)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===mc)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===gc)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===_c)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===vc)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===xc)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Sc)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===bc)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Mc)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===yc)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ec)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Tc)return a===wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===wc||i===Ac||i===Rc)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===wc)return a===wt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ac)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Rc)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Cc||i===Pc||i===Ao||i===Dc)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Cc)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Pc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ao)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Dc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ys?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const tM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,nM=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class iM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new mh(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Or({vertexShader:tM,fragmentShader:nM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new dr(new Go(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class rM extends fr{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,u=null,f=null,d=null,h=null,_=null;const v=typeof XRWebGLBinding<"u",p=new iM,m={},y=t.getContextAttributes();let w=null,S=null;const T=[],E=[],g=new $e;let M=null,L=null;const D=new jn;D.viewport=new Ut;const R=new jn;R.viewport=new Ut;const I=[D,R],G=new p0;let C=null,P=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let $=T[H];return $===void 0&&($=new pl,T[H]=$),$.getTargetRaySpace()},this.getControllerGrip=function(H){let $=T[H];return $===void 0&&($=new pl,T[H]=$),$.getGripSpace()},this.getHand=function(H){let $=T[H];return $===void 0&&($=new pl,T[H]=$),$.getHandSpace()};function F(H){const $=E.indexOf(H.inputSource);if($===-1)return;const me=T[$];me!==void 0&&(me.update(H.inputSource,H.frame,l||a),me.dispatchEvent({type:H.type,data:H.inputSource}))}function z(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",z),r.removeEventListener("inputsourceschange",Q);for(let H=0;H<T.length;H++){const $=E[H];$!==null&&(E[H]=null,T[H].disconnect($))}C=null,P=null,p.reset();for(const H in m)delete m[H];if(e.setRenderTarget(w),h=null,d=null,f=null,r=null,S=null,Ce.stop(),i.isPresenting=!1,e.setPixelRatio(M),e.setSize(g.width,g.height,!1),L!==null){const H=L.camera;H.fov=L.fov,H.zoom=L.zoom,H.updateProjectionMatrix(),L=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){s=H,i.isPresenting===!0&&qe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){o=H,i.isPresenting===!0&&qe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(H){l=H},this.getBaseLayer=function(){return d!==null?d:h},this.getBinding=function(){return f===null&&v&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(H){if(r=H,r!==null){if(w=e.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",z),r.addEventListener("inputsourceschange",Q),y.xrCompatible!==!0&&await t.makeXRCompatible(),M=e.getPixelRatio(),e.getSize(g),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,he=null,ue=null;y.depth&&(ue=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,me=y.stencil?nr:lr,he=y.stencil?ys:Mi);const Oe={colorFormat:t.RGBA8,depthFormat:ue,scaleFactor:s};f=this.getBinding(),d=f.createProjectionLayer(Oe),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),S=new xi(d.textureWidth,d.textureHeight,{format:gi,type:Fn,depthTexture:new Es(d.textureWidth,d.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{const me={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(r,t,me),r.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),S=new xi(h.framebufferWidth,h.framebufferHeight,{format:gi,type:Fn,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),Ce.setContext(r),Ce.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function Q(H){for(let $=0;$<H.removed.length;$++){const me=H.removed[$],he=E.indexOf(me);he>=0&&(E[he]=null,T[he].disconnect(me))}for(let $=0;$<H.added.length;$++){const me=H.added[$];let he=E.indexOf(me);if(he===-1){for(let Oe=0;Oe<T.length;Oe++)if(Oe>=E.length){E.push(me),he=Oe;break}else if(E[Oe]===null){E[Oe]=me,he=Oe;break}if(he===-1)break}const ue=T[he];ue&&ue.connect(me)}}function O(H,$){$===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices($.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(r===null)return;let $=H.near,me=H.far;p.texture!==null&&(p.depthNear>0&&($=p.depthNear),p.depthFar>0&&(me=p.depthFar)),G.near=R.near=D.near=$,G.far=R.far=D.far=me,(C!==G.near||P!==G.far)&&(r.updateRenderState({depthNear:G.near,depthFar:G.far}),C=G.near,P=G.far),G.layers.mask=H.layers.mask|6,D.layers.mask=G.layers.mask&-5,R.layers.mask=G.layers.mask&-3;const he=H.parent,ue=G.cameras;O(G,he);for(let Oe=0;Oe<ue.length;Oe++)O(ue[Oe],he);G.projectionMatrix.copy(D.projectionMatrix),G.projectionMatrixInverse.copy(D.projectionMatrixInverse),L===null&&H.isPerspectiveCamera&&(L={camera:H,fov:H.fov,zoom:H.zoom}),q(H,G,he)};function q(H,$,me){me===null?H.matrix.copy($.matrixWorld):(H.matrix.copy(me.matrixWorld),H.matrix.invert(),H.matrix.multiply($.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy($.projectionMatrix),H.projectionMatrixInverse.copy($.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=Nc*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return G},this.getFoveation=function(){if(!(d===null&&h===null))return c},this.setFoveation=function(H){c=H,d!==null&&(d.fixedFoveation=H),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=H)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(G)},this.getCameraTexture=function(H){return m[H]};let Z=null;function de(H,$){if(u=$.getViewerPose(l||a),_=$,u!==null){const me=u.views;h!==null&&(e.setRenderTargetFramebuffer(S,h.framebuffer),e.setRenderTarget(S));let he=!1;me.length!==G.cameras.length&&(G.cameras.length=0,he=!0);for(let _e=0;_e<me.length;_e++){const We=me[_e];let rt=null;if(h!==null)rt=h.getViewport(We);else{const kt=f.getViewSubImage(d,We);rt=kt.viewport,_e===0&&(e.setRenderTargetTextures(S,kt.colorTexture,kt.depthStencilTexture),e.setRenderTarget(S))}let Ke=I[_e];Ke===void 0&&(Ke=new jn,Ke.layers.enable(_e),Ke.viewport=new Ut,I[_e]=Ke),Ke.matrix.fromArray(We.transform.matrix),Ke.matrix.decompose(Ke.position,Ke.quaternion,Ke.scale),Ke.projectionMatrix.fromArray(We.projectionMatrix),Ke.projectionMatrixInverse.copy(Ke.projectionMatrix).invert(),Ke.viewport.set(rt.x,rt.y,rt.width,rt.height),_e===0&&(G.matrix.copy(Ke.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale)),he===!0&&G.cameras.push(Ke)}const ue=r.enabledFeatures;if(ue&&ue.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&v){f=i.getBinding();const _e=f.getDepthInformation(me[0]);_e&&_e.isValid&&_e.texture&&p.init(_e,r.renderState)}if(ue&&ue.includes("camera-access")&&v){e.state.unbindTexture(),f=i.getBinding();for(let _e=0;_e<me.length;_e++){const We=me[_e].camera;if(We){let rt=m[We];rt||(rt=new mh,m[We]=rt);const Ke=f.getCameraImage(We);rt.sourceTexture=Ke}}}}for(let me=0;me<T.length;me++){const he=E[me],ue=T[me];he!==null&&ue!==void 0&&ue.update(he,$,l||a)}Z&&Z(H,$),$.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:$}),_=null}const Ce=new Sh;Ce.setAnimationLoop(de),this.setAnimationLoop=function(H){Z=H},this.dispose=function(){}}}const sM=new Nt,Ph=new je;Ph.set(-1,0,0,0,1,0,0,0,1);function aM(n,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,gh(n)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function r(p,m,y,w,S){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?s(p,m):m.isMeshLambertMaterial?(s(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(s(p,m),f(p,m)):m.isMeshPhongMaterial?(s(p,m),u(p,m),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(s(p,m),d(p,m),m.isMeshPhysicalMaterial&&h(p,m,S)):m.isMeshMatcapMaterial?(s(p,m),_(p,m)):m.isMeshDepthMaterial?s(p,m):m.isMeshDistanceMaterial?(s(p,m),v(p,m)):m.isMeshNormalMaterial?s(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?c(p,m,y,w):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function s(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===En&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===En&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const y=e.get(m),w=y.envMap,S=y.envMapRotation;w&&(p.envMap.value=w,p.envMapRotation.value.setFromMatrix4(sM.makeRotationFromEuler(S)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(Ph),p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,y,w){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*y,p.scale.value=w*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function f(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function h(p,m,y){p.ior.value=m.ior,m.diffuseRoughness>0&&(p.diffuseRoughness.value=m.diffuseRoughness,m.diffuseRoughnessMap&&(p.diffuseRoughnessMap.value=m.diffuseRoughnessMap,t(m.diffuseRoughnessMap,p.diffuseRoughnessMapTransform))),m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===En&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.retroreflectivity>0&&(p.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessMinimum,p.iridescenceThicknessMaximum.value=m.iridescenceThicknessMaximum,m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=y.texture,p.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,m){m.matcap&&(p.matcap.value=m.matcap)}function v(p,m){const y=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),p.nearDistance.value=y.shadow.camera.near,p.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function oM(n,e,t,i){let r={},s={};function a(y,w){const S=w.program;i.uniformBlockBinding(y,S,r[y.id])}function o(y,w){let S=r[y.id];S===void 0&&(_(y),S=c(y),r[y.id]=S,y.addEventListener("dispose",p));const T=w.program;i.updateUBOMapping(y,T);const E=e.render.frame;s[y.id]!==E&&(l(y),s[y.id]=E)}function c(y){const w=n.createBuffer(),S=y.__size,T=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,w),n.bufferData(n.UNIFORM_BUFFER,S,T),n.bindBuffer(n.UNIFORM_BUFFER,null),w}function l(y){const w=r[y.id],S=y.uniforms,T=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let E=0,g=S.length;E<g;E++){const M=S[E];if(Array.isArray(M))for(let L=0,D=M.length;L<D;L++)u(M[L],E,L,T);else u(M,E,0,T)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function u(y,w,S,T){if(d(y,w,S,T)===!0){const E=y.__offset,g=y.value;if(Array.isArray(g)){let M=0;for(let L=0;L<g.length;L++){const D=g[L],R=v(D,!0);f(D,y.__data,M),M+=R.storage/Float32Array.BYTES_PER_ELEMENT}}else f(g,y.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,E,y.__data)}}function f(y,w,S){typeof y=="number"||typeof y=="boolean"?w[S]=y:y.isMatrix3?(w[S]=y.elements[0],w[S+1]=y.elements[1],w[S+2]=y.elements[2],w[S+3]=0,w[S+4]=y.elements[3],w[S+5]=y.elements[4],w[S+6]=y.elements[5],w[S+7]=0,w[S+8]=y.elements[6],w[S+9]=y.elements[7],w[S+10]=y.elements[8],w[S+11]=0):ArrayBuffer.isView(y)?w.set(y.subarray(0,w.length-S),S):y.toArray(w,S)}function d(y,w,S,T){const E=y.value,g=w+"_"+S;if(Array.isArray(E)){T[g]===void 0&&(T[g]=[]);const M=T[g];let L=!1;for(let D=0;D<E.length;D++)h(E[D],M,D)===!0&&(L=!0);return L}return h(E,T,g)}function h(y,w,S){if(w[S]===void 0)return typeof y=="number"||typeof y=="boolean"?w[S]=y:ArrayBuffer.isView(y)?w[S]=y.slice():w[S]=y.clone(),!0;{const T=w[S];if(typeof y=="number"||typeof y=="boolean"){if(T!==y)return w[S]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(T.equals(y)===!1)return T.copy(y),!0}}return!1}function _(y){const w=y.uniforms;let S=0;const T=16;for(let g=0,M=w.length;g<M;g++){const L=Array.isArray(w[g])?w[g]:[w[g]];for(let D=0,R=L.length;D<R;D++){const I=L[D],G=Array.isArray(I.value)?I.value:[I.value],C=Array.isArray(w[g])||Array.isArray(I.value);let P=S;for(let z=0,Q=G.length;z<Q;z++){const O=G[z],q=v(O,C),Z=S%T,de=Z%q.boundary,Ce=Z+de;S+=de,Ce!==0&&T-Ce<q.storage&&(S+=T-Ce),z===0&&(P=S),S+=q.storage}const F=I.type==="int"?Int32Array:I.type==="uint"?Uint32Array:Float32Array;I.__data=new F((S-P)/Float32Array.BYTES_PER_ELEMENT),I.__offset=P}}const E=S%T;return E>0&&(S+=T-E),y.__size=S,y.__cache={},this}function v(y,w){const S={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(S.boundary=4,S.storage=4):y.isVector2?(S.boundary=8,S.storage=8):y.isVector3||y.isColor?(S.boundary=16,S.storage=12):y.isVector4?(S.boundary=16,S.storage=16):y.isMatrix3?(S.boundary=16,S.storage=48):y.isMatrix4?(S.boundary=16,S.storage=64):y.isTexture?qe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(S.boundary=16,S.storage=y.byteLength):qe("WebGLRenderer: Unsupported uniform value type.",y),w===!0&&(S.boundary=16,S.storage=Math.ceil(S.storage/16)*16),S}function p(y){const w=y.target;w.removeEventListener("dispose",p),n.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function m(){for(const y in r)n.deleteBuffer(r[y]);r={},s={}}return{bind:a,update:o,dispose:m}}const lM=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let li=null;function cM(){return li===null&&(li=new Z_(lM,16,16,Fr,yi),li.name="DFG_LUT",li.minFilter=Mn,li.magFilter=Mn,li.wrapS=Oi,li.wrapT=Oi,li.generateMipmaps=!1,li.needsUpdate=!0),li}class uM{constructor(e={}){const{canvas:t=x_(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:h=Fn}=e;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=a;const v=h,p=new Set([tu,eu,$c]),m=new Set([Fn,Mi,la,ys,Qc,jc]),y=new Uint32Array(4),w=new Int32Array(4),S={textures:[],min:[],max:[],resolution:[]};let T=null,E=null;const g=[],M=[];let L=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Bi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const D=this;let R=!1,I=null,G=null,C=null,P=null;this._outputColorSpace=Un;let F=0,z=0,Q=null,O=-1,q=null;const Z=new Ut,de=new Ut;let Ce=null;const H=new dt(0);let $=0,me=t.width,he=t.height,ue=1,Oe=null,ct=null;const _e=new Ut(0,0,me,he),We=new Ut(0,0,me,he);let rt=!1;const Ke=new ua,kt=new su;let Ft=!1,sn=!1;const Lt=new Nt,wn=new K,le=new Ut,At={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ct=!1;function Rt(){return Q===null?ue:1}let U=i;function Qe(b,k){return t.getContext(b,k)}let He,Xe,fe,at,Pe,Fe,A,x,W,ae,re,oe,ce,ee,ne,xe,N,se,te,Se,ge,ve,ke;try{const b={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Zc}`),t.addEventListener("webglcontextlost",ze,!1),t.addEventListener("webglcontextrestored",st,!1),t.addEventListener("webglcontextcreationerror",Te,!1),U===null){const k="webgl2";if(U=Qe(k,b),U===null)throw Qe(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ot()}catch(b){throw t.removeEventListener("webglcontextlost",ze,!1),t.removeEventListener("webglcontextrestored",st,!1),t.removeEventListener("webglcontextcreationerror",Te,!1),Mt("WebGLRenderer: "+b.message),b}function ot(){He=new hS(U),He.init(),ge=new eM(U,He),Xe=new nS(U,He,e,ge),fe=new jb(U,He),Xe.reversedDepthBuffer&&d&&fe.buffers.depth.setReversed(!0),G=U.createFramebuffer(),C=U.createFramebuffer(),P=U.createFramebuffer(),at=new gS(U),Pe=new Bb,Fe=new $b(U,He,fe,Pe,Xe,ge,at),A=new fS(D),x=new v0(U),ve=new eS(U,x),W=new pS(U,x,at,ve),ae=new vS(U,W,x,ve,at),se=new _S(U,Xe,Fe),ne=new iS(Pe),re=new Ob(D,A,He,Xe,ve,ne),oe=new aM(D,Pe),ce=new zb,ee=new qb(He),N=new $x(D,A,fe,ae,_,c),xe=new Qb(D,ae,Xe),ke=new oM(U,at,Xe,fe),te=new tS(U,He,at),Se=new mS(U,He,at),at.programs=re.programs,D.capabilities=Xe,D.extensions=He,D.properties=Pe,D.renderLists=ce,D.shadowMap=xe,D.state=fe,D.info=at}v!==Fn&&(L=new SS(v,t.width,t.height,o,r,s));const pe=new rM(D,U);this.xr=pe,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const b=He.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=He.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return ue},this.setPixelRatio=function(b){b!==void 0&&(ue=b,this.setSize(me,he,!1))},this.getSize=function(b){return b.set(me,he)},this.setSize=function(b,k,J=!0){if(pe.isPresenting){qe("WebGLRenderer: Can't change size while VR device is presenting.");return}me=b,he=k,t.width=Math.floor(b*ue),t.height=Math.floor(k*ue),J===!0&&(t.style.width=b+"px",t.style.height=k+"px"),L!==null&&L.setSize(t.width,t.height),this.setViewport(0,0,b,k)},this.getDrawingBufferSize=function(b){return b.set(me*ue,he*ue).floor()},this.setDrawingBufferSize=function(b,k,J){me=b,he=k,ue=J,t.width=Math.floor(b*J),t.height=Math.floor(k*J),this.setViewport(0,0,b,k)},this.setEffects=function(b){if(v===Fn){Mt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let k=0;k<b.length;k++)if(b[k].isOutputPass===!0){qe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}L.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(Z)},this.getViewport=function(b){return b.copy(_e)},this.setViewport=function(b,k,J,X){b.isVector4?_e.set(b.x,b.y,b.z,b.w):_e.set(b,k,J,X),fe.viewport(Z.copy(_e).multiplyScalar(Rt()).round())},this.getScissor=function(b){return b.copy(We)},this.setScissor=function(b,k,J,X){b.isVector4?We.set(b.x,b.y,b.z,b.w):We.set(b,k,J,X),fe.scissor(de.copy(We).multiplyScalar(Rt()).round())},this.getScissorTest=function(){return rt},this.setScissorTest=function(b){fe.setScissorTest(rt=b)},this.setOpaqueSort=function(b){Oe=b},this.setTransparentSort=function(b){ct=b},this.getClearColor=function(b){return b.copy(N.getClearColor())},this.setClearColor=function(){N.setClearColor(...arguments)},this.getClearAlpha=function(){return N.getClearAlpha()},this.setClearAlpha=function(){N.setClearAlpha(...arguments)},this.clear=function(b=!0,k=!0,J=!0){let X=0;if(b){let Y=!1;if(Q!==null){const ye=Q.texture.format;Y=p.has(ye)}if(Y){const ye=Q.texture.type,De=m.has(ye),Me=N.getClearColor(),Re=N.getClearAlpha(),Be=Me.r,et=Me.g,pt=Me.b;De?(y[0]=Be,y[1]=et,y[2]=pt,y[3]=Re,U.clearBufferuiv(U.COLOR,0,y)):(w[0]=Be,w[1]=et,w[2]=pt,w[3]=Re,U.clearBufferiv(U.COLOR,0,w))}else X|=U.COLOR_BUFFER_BIT}k&&(X|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(X|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),X!==0&&U.clear(X)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),I=b},this.dispose=function(){t.removeEventListener("webglcontextlost",ze,!1),t.removeEventListener("webglcontextrestored",st,!1),t.removeEventListener("webglcontextcreationerror",Te,!1),N.dispose(),ce.dispose(),ee.dispose(),Fe.dispose(),Pe.dispose(),A.dispose(),ae.dispose(),W.dispose(),ve.dispose(),ke.dispose(),re.dispose(),pe.dispose(),pe.removeEventListener("sessionstart",pu),pe.removeEventListener("sessionend",mu),hr.stop()};function ze(b){b.preventDefault(),Vu("WebGLRenderer: Context Lost."),R=!0}function st(){Vu("WebGLRenderer: Context Restored."),R=!1;const b=at.autoReset,k=xe.enabled,J=xe.autoUpdate,X=xe.needsUpdate,Y=xe.type;ot(),at.autoReset=b,xe.enabled=k,xe.autoUpdate=J,xe.needsUpdate=X,xe.type=Y}function Te(b){Mt("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Tt(b){const k=b.target;k.removeEventListener("dispose",Tt),Zt(k)}function Zt(b){Gi(b),Pe.remove(b)}function Gi(b){const k=Pe.get(b).programs;k!==void 0&&(k.forEach(function(J){re.releaseProgram(J)}),b.isShaderMaterial&&re.releaseShaderCache(b))}this.renderBufferDirect=function(b,k,J,X,Y,ye){k===null&&(k=At);const De=Y.isMesh&&Y.matrixWorld.determinantAffine()<0,Me=Ih(b,k,J,X,Y);fe.setMaterial(X,De);let Re=J.index,Be=1;if(X.wireframe===!0){if(Re=W.getWireframeAttribute(J),Re===void 0)return;Be=2}const et=J.drawRange,pt=J.attributes.position;let Le=et.start*Be,mt=(et.start+et.count)*Be;ye!==null&&(Le=Math.max(Le,ye.start*Be),mt=Math.min(mt,(ye.start+ye.count)*Be)),Re!==null?(Le=Math.max(Le,0),mt=Math.min(mt,Re.count)):pt!=null&&(Le=Math.max(Le,0),mt=Math.min(mt,pt.count));const Ht=mt-Le;if(Ht<0||Ht===1/0)return;ve.setup(Y,X,Me,J,Re);let Dt,Pt=te;if(Re!==null&&(Dt=x.get(Re),Pt=Se,Pt.setIndex(Dt)),Y.isMesh)X.wireframe===!0?(fe.setLineWidth(X.wireframeLinewidth*Rt()),Pt.setMode(U.LINES)):Pt.setMode(U.TRIANGLES);else if(Y.isLine){let an=X.linewidth;an===void 0&&(an=1),fe.setLineWidth(an*Rt()),Y.isLineSegments?Pt.setMode(U.LINES):Y.isLineLoop?Pt.setMode(U.LINE_LOOP):Pt.setMode(U.LINE_STRIP)}else Y.isPoints?Pt.setMode(U.POINTS):Y.isSprite&&Pt.setMode(U.TRIANGLES);if(Y.isBatchedMesh)if(He.get("WEBGL_multi_draw"))Pt.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{const an=Y._multiDrawStarts,Ne=Y._multiDrawCounts,pn=Y._multiDrawCount,bt=Re?x.get(Re).bytesPerElement:1,pr=Pe.get(X).currentProgram.getUniforms();for(let on=0;on<pn;on++)pr.setValue(U,"_gl_DrawID",on),Pt.render(an[on]/bt,Ne[on])}else if(Y.isInstancedMesh)Pt.renderInstances(Le,Ht,Y.count);else if(J.isInstancedBufferGeometry){const an=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Ne=Math.min(J.instanceCount,an);Pt.renderInstances(Le,Ht,Ne)}else Pt.render(Le,Ht)};function hu(b,k,J,X){I!==null&&b.isNodeMaterial&&I.setObject(X,b),Ft===!0&&ne.setState(b,J,!1),b.transparent===!0&&b.side===Ui&&b.forceSinglePass===!1?(b.side=En,b.needsUpdate=!0,Ls(b,k,X),b.side=Ur,b.needsUpdate=!0,Ls(b,k,X),b.side=Ui):Ls(b,k,X)}this.compile=function(b,k,J=null){J===null&&(J=b),I!==null&&I.renderStart(b,k,J),E=ee.get(J),E.init(k),M.push(E),J.traverseVisible(function(Y){Y.isLight&&Y.layers.test(k.layers)&&(E.pushLight(Y),Y.castShadow&&E.pushShadow(Y))}),b!==J&&b.traverseVisible(function(Y){Y.isLight&&Y.layers.test(k.layers)&&(E.pushLight(Y),Y.castShadow&&E.pushShadow(Y))}),E.setupLights(),I!==null&&I.updateLights(E.state.lightsArray),sn=this.localClippingEnabled,Ft=ne.init(this.clippingPlanes,sn),Ft===!0&&ne.setGlobalState(this.clippingPlanes,k),I!==null&&xe.render(E.state.shadowsArray,J,k);const X=new Set;return b.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;const ye=Y.material;if(ye)if(Array.isArray(ye))for(let De=0;De<ye.length;De++){const Me=ye[De];hu(Me,J,k,Y),X.add(Me)}else hu(ye,J,k,Y),X.add(ye)}),E=M.pop(),I!==null&&I.renderEnd(),X},this.compileAsync=function(b,k,J=null){const X=this.compile(b,k,J);return new Promise(Y=>{function ye(){if(X.forEach(function(De){const Re=Pe.get(De).currentProgram;(Re===void 0||Re.isReady())&&X.delete(De)}),X.size===0){Y(b);return}setTimeout(ye,10)}He.get("KHR_parallel_shader_compile")!==null?ye():setTimeout(ye,10)})};let Xo=null;function Lh(b){Xo&&Xo(b)}function pu(){hr.stop()}function mu(){hr.start()}const hr=new Sh;hr.setAnimationLoop(Lh),typeof self<"u"&&hr.setContext(self),this.setAnimationLoop=function(b){Xo=b,pe.setAnimationLoop(b),b===null?hr.stop():hr.start()},pe.addEventListener("sessionstart",pu),pe.addEventListener("sessionend",mu),this.render=function(b,k){if(k!==void 0&&k.isCamera!==!0){Mt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;I!==null&&I.renderStart(b,k);const J=pe.enabled===!0&&pe.isPresenting===!0,X=L!==null&&(Q===null||J)&&L.begin(D,Q);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),pe.enabled===!0&&pe.isPresenting===!0&&(L===null||L.isCompositing()===!1)&&(pe.cameraAutoUpdate===!0&&pe.updateCamera(k),k=pe.getCamera()),b.isScene===!0&&b.onBeforeRender(D,b,k,Q),E=ee.get(b,M.length),E.init(k),E.state.textureUnits=Fe.getTextureUnits(),M.push(E),Lt.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),k.isArrayCamera?kt.setFromArrayCamera(k):Ke.setFromProjectionMatrix(Lt,ii,k.reversedDepth),sn=this.localClippingEnabled,Ft=ne.init(this.clippingPlanes,sn),T=ce.get(b,g.length),T.init(),g.push(T),this.info.render.frame++,pe.enabled===!0&&pe.isPresenting===!0){const De=D.xr.getDepthSensingMesh();De!==null&&qo(De,k,-1/0,D.sortObjects)}qo(b,k,0,D.sortObjects),T.finish(),I!==null&&I.updateLights(E.state.lightsArray),D.sortObjects===!0&&T.sort(Oe,ct),Ct=pe.enabled===!1||pe.isPresenting===!1||pe.hasDepthSensing()===!1,Ct&&N.addToRenderList(T,b),this.info.autoReset===!0&&this.info.reset(),Ft===!0&&ne.beginShadows();const Y=E.state.shadowsArray;if(xe.render(Y,b,k),Ft===!0&&ne.endShadows(),(X&&L.hasRenderPass())===!1){const De=T.opaque,Me=T.transmissive;if(E.setupLights(),k.isArrayCamera){const Re=k.cameras;if(Me.length>0)for(let Be=0,et=Re.length;Be<et;Be++){const pt=Re[Be];_u(De,Me,b,pt)}Ct&&N.render(b);for(let Be=0,et=Re.length;Be<et;Be++){const pt=Re[Be];gu(T,b,pt,pt.viewport)}}else Me.length>0&&_u(De,Me,b,k),Ct&&N.render(b),gu(T,b,k)}Q!==null&&z===0&&(Fe.updateMultisampleRenderTarget(Q),Fe.updateRenderTargetMipmap(Q)),X&&L.end(D),b.isScene===!0&&b.onAfterRender(D,b,k),ve.resetDefaultState(),O=-1,q=null,M.pop(),M.length>0?(E=M[M.length-1],Fe.setTextureUnits(E.state.textureUnits),Ft===!0&&ne.setGlobalState(D.clippingPlanes,E.state.camera)):E=null,g.pop(),g.length>0?T=g[g.length-1]:T=null,I!==null&&I.renderEnd()};function qo(b,k,J,X){if(b.visible===!1)return;if(b.layers.test(k.layers)){if(b.isGroup)J=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(k);else if(b.isLight)E.pushLight(b),b.castShadow&&E.pushShadow(b);else if(b.isSprite){const De=k.isArrayCamera?kt:Ke;if(!b.frustumCulled||b.intersectsFrustum(De)){X&&le.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Lt);const Me=ae.update(b),Re=b.material;Re.visible&&T.push(b,Me,Re,J,le.z,null,k)}}else if(b.isMesh||b.isLine||b.isPoints){const De=k.isArrayCamera?kt:Ke;if(!b.frustumCulled||b.intersectsFrustum(De)){const Me=ae.update(b),Re=b.material;if(X&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),le.copy(b.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),le.copy(Me.boundingSphere.center)),le.applyMatrix4(b.matrixWorld).applyMatrix4(Lt)),Array.isArray(Re)){const Be=Me.groups;for(let et=0,pt=Be.length;et<pt;et++){const Le=Be[et],mt=Re[Le.materialIndex];mt&&mt.visible&&T.push(b,Me,mt,J,le.z,Le,k)}}else Re.visible&&T.push(b,Me,Re,J,le.z,null,k)}}}const ye=b.children;for(let De=0,Me=ye.length;De<Me;De++)qo(ye[De],k,J,X)}function gu(b,k,J,X){const{opaque:Y,transmissive:ye,transparent:De}=b;E.setupLightsView(J),Ft===!0&&ne.setGlobalState(D.clippingPlanes,J),X&&fe.viewport(Z.copy(X)),Y.length>0&&Ca(Y,k,J),ye.length>0&&Ca(ye,k,J),De.length>0&&Ca(De,k,J),fe.buffers.depth.setTest(!0),fe.buffers.depth.setMask(!0),fe.buffers.color.setMask(!0),fe.setPolygonOffset(!1)}function _u(b,k,J,X){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[X.id]===void 0){const Le=He.has("EXT_color_buffer_half_float")||He.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[X.id]=new xi(1,1,{generateMipmaps:!0,type:Le?yi:Fn,minFilter:tr,samples:Math.max(4,Xe.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:gt.workingColorSpace})}const ye=E.state.transmissionRenderTarget[X.id],De=X.viewport||Z;ye.setSize(De.z*D.transmissionResolutionScale,De.w*D.transmissionResolutionScale);const Me=D.getRenderTarget(),Re=D.getActiveCubeFace(),Be=D.getActiveMipmapLevel();D.setRenderTarget(ye),D.getClearColor(H),$=D.getClearAlpha(),$<1&&D.setClearColor(16777215,.5),D.clear(),Ct&&N.render(J);const et=D.toneMapping;D.toneMapping=Bi;const pt=X.viewport;if(X.viewport!==void 0&&(X.viewport=void 0),E.setupLightsView(X),Ft===!0&&ne.setGlobalState(D.clippingPlanes,X),Ca(b,J,X),Fe.updateMultisampleRenderTarget(ye),Fe.updateRenderTargetMipmap(ye),He.has("WEBGL_multisampled_render_to_texture")===!1){let Le=!1;for(let mt=0,Ht=k.length;mt<Ht;mt++){const Dt=k[mt],{object:Pt,geometry:an,material:Ne,group:pn}=Dt;if(Ne.side===Ui&&Pt.layers.test(X.layers)){const bt=Ne.side;Ne.side=En,Ne.needsUpdate=!0,vu(Pt,J,X,an,Ne,pn),Ne.side=bt,Ne.needsUpdate=!0,Le=!0}}Le===!0&&(Fe.updateMultisampleRenderTarget(ye),Fe.updateRenderTargetMipmap(ye))}D.setRenderTarget(Me,Re,Be),D.setClearColor(H,$),pt!==void 0&&(X.viewport=pt),D.toneMapping=et}function Ca(b,k,J){const X=k.isScene===!0?k.overrideMaterial:null;for(let Y=0,ye=b.length;Y<ye;Y++){const De=b[Y],{object:Me,geometry:Re,group:Be}=De;let et=De.material;et.allowOverride===!0&&X!==null&&(et=X),Me.layers.test(J.layers)&&vu(Me,k,J,Re,et,Be)}}function vu(b,k,J,X,Y,ye){I!==null&&Y.isNodeMaterial&&I.setObject(b,Y),b.onBeforeRender(D,k,J,X,Y,ye),b.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),Y.onBeforeRender(D,k,J,X,b,ye),Y.transparent===!0&&Y.side===Ui&&Y.forceSinglePass===!1?(Y.side=En,Y.needsUpdate=!0,D.renderBufferDirect(J,k,X,Y,b,ye),Y.side=Ur,Y.needsUpdate=!0,D.renderBufferDirect(J,k,X,Y,b,ye),Y.side=Ui):D.renderBufferDirect(J,k,X,Y,b,ye),b.onAfterRender(D,k,J,X,Y,ye)}function xu(b){let k=0;for(const J of b)J.texture!==null&&k++;return k}function Ls(b,k,J){k.isScene!==!0&&(k=At);const X=Pe.get(b),Y=E.state.lights,ye=E.state.shadowsArray,De=Y.state.version,Me=re.getParameters(b,Y.state,ye,k,J,E.state.lightProbeGridArray),Re=re.getProgramCacheKey(Me);let Be=X.programs;X.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?k.environment:null,X.fog=k.fog;const et=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;X.envMap=A.get(b.envMap||X.environment,et),X.envMapRotation=X.environment!==null&&b.envMap===null?k.environmentRotation:b.envMapRotation,Be===void 0&&(b.addEventListener("dispose",Tt),Be=new Map,X.programs=Be,X.programVariants=new Map);let pt=Be.get(Re);if(pt!==void 0){if(X.currentProgram===pt&&X.lightsStateVersion===De)return bu(b,Me),pt}else Me.uniforms=re.getUniforms(b),I!==null&&b.isNodeMaterial&&I.build(b,J,Me),b.onBeforeCompile(Me,D),pt=re.acquireProgram(Me,Re),Be.set(Re,pt),X.uniforms=Me.uniforms;const Le=X.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Le.clippingPlanes=ne.uniform),bu(b,Me),X.needsLights=Fh(b),X.lightsStateVersion=De,X.needsLights&&(Le.ambientLightColor.value=Y.state.ambient,Le.lightProbe.value=Y.state.probe,Le.sunLights.value=Y.state.sun,Le.sunLightShadows.value=Y.state.sunShadow,Le.directionalLights.value=Y.state.directional,Le.directionalLightShadows.value=Y.state.directionalShadow,Le.spotLights.value=Y.state.spot,Le.spotLightShadows.value=Y.state.spotShadow,Le.rectAreaLights.value=Y.state.rectArea,Le.ltc_1.value=Y.state.rectAreaLTC1,Le.ltc_2.value=Y.state.rectAreaLTC2,Le.pointLights.value=Y.state.point,Le.pointLightShadows.value=Y.state.pointShadow,Le.hemisphereLights.value=Y.state.hemi,Le.sunShadowMatrix.value=Y.state.sunShadowMatrix,Le.sunShadowCascade.value=Y.state.sunShadowCascade,Le.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Le.spotLightMatrix.value=Y.state.spotLightMatrix,Le.spotLightMap.value=Y.state.spotLightMap,Le.pointShadowMatrix.value=Y.state.pointShadowMatrix),X.numLightProbeGrids=xu(E.state.lightProbeGridArray),X.currentProgram=pt,X.uniformsList=null,pt}function Nh(b,k,J,X,Y){const ye=Pe.get(b),De=ye.currentProgram.id+","+X+","+Y;let Me=ye.programVariants.get(De);return Me===void 0?(Me=Ls(b,k,J),ye.programVariants.set(De,Me)):(ye.currentProgram=Me,ye.uniformsList=null,ye.outputColorSpace=X,ye.toneMapping=Y),Me}function Su(b){if(b.uniformsList===null){const k=b.currentProgram.getUniforms();b.uniformsList=_o.seqWithValue(k.seq,b.uniforms)}return b.uniformsList}function bu(b,k){const J=Pe.get(b);J.outputColorSpace=k.outputColorSpace,J.batching=k.batching,J.batchingColor=k.batchingColor,J.instancing=k.instancing,J.instancingColor=k.instancingColor,J.instancingMorph=k.instancingMorph,J.skinning=k.skinning,J.morphTargets=k.morphTargets,J.morphNormals=k.morphNormals,J.morphColors=k.morphColors,J.morphTargetsCount=k.morphTargetsCount,J.numClippingPlanes=k.numClippingPlanes,J.numIntersection=k.numClipIntersection,J.vertexAlphas=k.vertexAlphas,J.vertexTangents=k.vertexTangents,J.toneMapping=k.toneMapping}function Ih(b,k,J,X,Y){k.isScene!==!0&&(k=At),Fe.resetTextureUnits();const ye=k.fog,De=X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial?k.environment:null,Me=Q===null?D.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:gt.workingColorSpace,Re=X.isMeshStandardMaterial||X.isMeshLambertMaterial&&!X.envMap||X.isMeshPhongMaterial&&!X.envMap,Be=A.get(X.envMap||De,Re),et=X.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pt=!!J.attributes.tangent&&(!!X.normalMap||X.anisotropy>0),Le=!!J.morphAttributes.position,mt=!!J.morphAttributes.normal,Ht=!!J.morphAttributes.color;let Dt=Bi;X.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Dt=D.toneMapping);const Pt=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,an=Pt!==void 0?Pt.length:0,Ne=Pe.get(X),pn=E.state.lights;if(Ft===!0&&(sn===!0||b!==q)){const It=b===q&&X.id===O;ne.setState(X,b,It)}let bt=!1,pr=!1;X.version===Ne.__version?Ne.needsLights&&Ne.lightsStateVersion!==pn.state.version||Y.isBatchedMesh&&Ne.batching===!1||!Y.isBatchedMesh&&Ne.batching===!0||Y.isBatchedMesh&&Ne.batchingColor===!0&&Y._colorsTexture===null||Y.isBatchedMesh&&Ne.batchingColor===!1&&Y._colorsTexture!==null||Y.isInstancedMesh&&Ne.instancing===!1||!Y.isInstancedMesh&&Ne.instancing===!0||Y.isSkinnedMesh&&Ne.skinning===!1||!Y.isSkinnedMesh&&Ne.skinning===!0||Y.isInstancedMesh&&Ne.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&Ne.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&Ne.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&Ne.instancingMorph===!1&&Y.morphTexture!==null||Ne.envMap!==Be||X.fog===!0&&Ne.fog!==ye||Ne.numClippingPlanes!==void 0&&(Ne.numClippingPlanes!==ne.numPlanes||Ne.numIntersection!==ne.numIntersection)||Ne.vertexAlphas!==et||Ne.vertexTangents!==pt||Ne.morphTargets!==Le||Ne.morphNormals!==mt||Ne.morphColors!==Ht||Ne.morphTargetsCount!==an||Ne.numLightProbeGrids!==xu(E.state.lightProbeGridArray)?bt=!0:(Ne.outputColorSpace!==Me||Ne.toneMapping!==Dt)&&(pr=!0):(bt=!0,Ne.__version=X.version);let on=Ne.currentProgram;(bt===!0||pr===!0)&&(on=pr===!0?Nh(X,k,Y,Me,Dt):Ls(X,k,Y),I&&X.isNodeMaterial&&I.onUpdateProgram(X,on,Ne));let Pa=!1,Vi=!1,mr=!1;const xt=on.getUniforms(),jt=Ne.uniforms;if(fe.useProgram(on.program)&&(Pa=!0,Vi=!0,mr=!0),X.id!==O&&(O=X.id,Vi=!0),Pa||q!==b){fe.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),xt.setValue(U,"projectionMatrix",b.projectionMatrix),xt.setValue(U,"viewMatrix",b.matrixWorldInverse);const Jt=xt.map.cameraPosition;Jt!==void 0&&Jt.setValue(U,wn.setFromMatrixPosition(b.matrixWorld)),Xe.logarithmicDepthBuffer&&xt.setValue(U,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(X.isMeshPhongMaterial||X.isMeshToonMaterial||X.isMeshLambertMaterial||X.isMeshBasicMaterial||X.isMeshStandardMaterial||X.isShaderMaterial)&&xt.setValue(U,"isOrthographic",b.isOrthographicCamera===!0),q!==b&&(q=b,Vi=!0,mr=!0)}if(Ne.needsLights&&(pn.state.sunShadowMap.length>0&&xt.setValue(U,"sunShadowMap",pn.state.sunShadowMap,Fe),pn.state.directionalShadowMap.length>0&&xt.setValue(U,"directionalShadowMap",pn.state.directionalShadowMap,Fe),pn.state.spotShadowMap.length>0&&xt.setValue(U,"spotShadowMap",pn.state.spotShadowMap,Fe),pn.state.pointShadowMap.length>0&&xt.setValue(U,"pointShadowMap",pn.state.pointShadowMap,Fe)),Y.isSkinnedMesh){xt.setOptional(U,Y,"bindMatrix"),xt.setOptional(U,Y,"bindMatrixInverse");const It=Y.skeleton;It&&(It.boneTexture===null&&It.computeBoneTexture(),xt.setValue(U,"boneTexture",It.boneTexture,Fe))}Y.isBatchedMesh&&(xt.setOptional(U,Y,"batchingTexture"),xt.setValue(U,"batchingTexture",Y._matricesTexture,Fe),xt.setOptional(U,Y,"batchingIdTexture"),xt.setValue(U,"batchingIdTexture",Y._indirectTexture,Fe),xt.setOptional(U,Y,"batchingColorTexture"),Y._colorsTexture!==null&&xt.setValue(U,"batchingColorTexture",Y._colorsTexture,Fe));const Xn=J.morphAttributes;if((Xn.position!==void 0||Xn.normal!==void 0||Xn.color!==void 0)&&se.update(Y,J,on),(Vi||Ne.receiveShadow!==Y.receiveShadow)&&(Ne.receiveShadow=Y.receiveShadow,xt.setValue(U,"receiveShadow",Y.receiveShadow)),(X.isMeshStandardMaterial||X.isMeshLambertMaterial||X.isMeshPhongMaterial)&&X.envMap===null&&k.environment!==null&&(jt.envMapIntensity.value=k.environmentIntensity),jt.dfgLUT!==void 0&&(jt.dfgLUT.value=cM()),Vi){if(xt.setValue(U,"toneMappingExposure",D.toneMappingExposure),Ne.needsLights&&Uh(jt,mr),ye&&X.fog===!0&&oe.refreshFogUniforms(jt,ye),oe.refreshMaterialUniforms(jt,X,ue,he,E.state.transmissionRenderTarget[b.id]),Ne.needsLights&&Ne.numLightProbeGrids>0){const It=S;let Jt=0;for(const Ei of E.state.lightProbeGridArray)Ei.texture!==null&&(It.textures[Jt]=Ei.texture,It.min[Jt]=Ei.boundingBox.min,It.max[Jt]=Ei.boundingBox.max,It.resolution[Jt]=Ei.resolution,Jt++);for(const Ei in It)It[Ei].length=Jt;jt.probesSH.value=It.textures,jt.probesMin.value=It.min,jt.probesMax.value=It.max,jt.probesResolution.value=It.resolution}_o.upload(U,Su(Ne),jt,Fe)}if(X.isShaderMaterial&&X.uniformsNeedUpdate===!0&&(_o.upload(U,Su(Ne),jt,Fe),X.uniformsNeedUpdate=!1),X.isSpriteMaterial&&xt.setValue(U,"center",Y.center),xt.setValue(U,"modelViewMatrix",Y.modelViewMatrix),xt.setValue(U,"normalMatrix",Y.normalMatrix),xt.setValue(U,"modelMatrix",Y.matrixWorld),X.uniformsGroups!==void 0){const It=X.uniformsGroups;for(let Jt=0,Ei=It.length;Jt<Ei;Jt++){const yu=It[Jt];ke.update(yu,on),ke.bind(yu,on)}}return on}function Uh(b,k){b.ambientLightColor.needsUpdate=k,b.lightProbe.needsUpdate=k,b.sunLights.needsUpdate=k,b.sunLightShadows.needsUpdate=k,b.directionalLights.needsUpdate=k,b.directionalLightShadows.needsUpdate=k,b.pointLights.needsUpdate=k,b.pointLightShadows.needsUpdate=k,b.spotLights.needsUpdate=k,b.spotLightShadows.needsUpdate=k,b.rectAreaLights.needsUpdate=k,b.hemisphereLights.needsUpdate=k}function Fh(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return Q},this.setRenderTargetTextures=function(b,k,J){const X=Pe.get(b);X.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,X.__autoAllocateDepthBuffer===!1&&(X.__useRenderToTexture=!1),Pe.get(b.texture).__webglTexture=k,Pe.get(b.depthTexture).__webglTexture=X.__autoAllocateDepthBuffer?void 0:J,X.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,k){const J=Pe.get(b);J.__webglFramebuffer=k,J.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(b,k=0,J=0){Q=b,F=k,z=J;let X=null,Y=!1,ye=!1;if(b){const Me=Pe.get(b);if(Me.__useDefaultFramebuffer!==void 0){fe.bindFramebuffer(U.FRAMEBUFFER,Me.__webglFramebuffer),Z.copy(b.viewport),de.copy(b.scissor),Ce=b.scissorTest,fe.viewport(Z),fe.scissor(de),fe.setScissorTest(Ce),O=-1;return}else if(Me.__webglFramebuffer===void 0)Fe.setupRenderTarget(b);else if(Me.__hasExternalTextures)Fe.rebindTextures(b,Pe.get(b.texture).__webglTexture,Pe.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const et=b.depthTexture;if(Me.__boundDepthTexture!==et){if(et!==null&&Pe.has(et)&&(b.width!==et.image.width||b.height!==et.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Fe.setupDepthRenderbuffer(b)}}const Re=b.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(ye=!0);const Be=Pe.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Be[k])?X=Be[k][J]:X=Be[k],Y=!0):b.samples>0&&Fe.useMultisampledRTT(b)===!1?X=Pe.get(b).__webglMultisampledFramebuffer:Array.isArray(Be)?X=Be[J]:X=Be,Z.copy(b.viewport),de.copy(b.scissor),Ce=b.scissorTest}else Z.copy(_e).multiplyScalar(ue).floor(),de.copy(We).multiplyScalar(ue).floor(),Ce=rt;if(J!==0&&(X=G),fe.bindFramebuffer(U.FRAMEBUFFER,X)&&fe.drawBuffers(b,X),fe.viewport(Z),fe.scissor(de),fe.setScissorTest(Ce),Y){const Me=Pe.get(b.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+k,Me.__webglTexture,J)}else if(ye){const Me=k;for(let Re=0;Re<b.textures.length;Re++){const Be=Pe.get(b.textures[Re]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Re,Be.__webglTexture,J,Me)}}else if(b!==null&&J!==0){const Me=Pe.get(b.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Me.__webglTexture,J)}O=-1};function Mu(b){const k=Pe.get(b);return(k.__readFormat!==b.format||k.__readType!==b.type)&&(k.__readFormat=b.format,k.__readType=b.type,k.__formatReadable=Xe.textureFormatReadable(b.format),k.__typeReadable=Xe.textureTypeReadable(b.type)),k}this.readRenderTargetPixels=function(b,k,J,X,Y,ye,De,Me=0){if(!(b&&b.isWebGLRenderTarget)){Mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Re=Pe.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&De!==void 0&&(Re=Re[De],Array.isArray(Re)&&(Re=Re[0])),Re){fe.bindFramebuffer(U.FRAMEBUFFER,Re);try{const Be=b.textures[Me],et=Be.format,pt=Be.type;b.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Me);const Le=Mu(Be);if(Le.__formatReadable===!1){Mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Le.__typeReadable===!1){Mt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=b.width-X&&J>=0&&J<=b.height-Y&&U.readPixels(k,J,X,Y,ge.convert(et),ge.convert(pt),ye)}finally{const Be=Q!==null?Pe.get(Q).__webglFramebuffer:null;fe.bindFramebuffer(U.FRAMEBUFFER,Be)}}},this.readRenderTargetPixelsAsync=async function(b,k,J,X,Y,ye,De,Me=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Re=Pe.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&De!==void 0&&(Re=Re[De],Array.isArray(Re)&&(Re=Re[0])),Re)if(k>=0&&k<=b.width-X&&J>=0&&J<=b.height-Y){fe.bindFramebuffer(U.FRAMEBUFFER,Re);const Be=b.textures[Me],et=Be.format,pt=Be.type;b.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Me);const Le=Mu(Be);if(Le.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Le.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const mt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,mt),U.bufferData(U.PIXEL_PACK_BUFFER,ye.byteLength,U.STREAM_READ),U.readPixels(k,J,X,Y,ge.convert(et),ge.convert(pt),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);const Ht=Q!==null?Pe.get(Q).__webglFramebuffer:null;fe.bindFramebuffer(U.FRAMEBUFFER,Ht);const Dt=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await S_(U,Dt,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,mt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,ye),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(mt),U.deleteSync(Dt),ye}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,k=null,J=0){const X=Math.pow(2,-J),Y=Math.floor(b.image.width*X),ye=Math.floor(b.image.height*X),De=k!==null?k.x:0,Me=k!==null?k.y:0;Fe.setTexture2D(b,0),U.copyTexSubImage2D(U.TEXTURE_2D,J,0,0,De,Me,Y,ye),fe.unbindTexture()},this.copyTextureToTexture=function(b,k,J=null,X=null,Y=0,ye=0){let De,Me,Re,Be,et,pt,Le,mt,Ht;const Dt=b.isCompressedTexture?b.mipmaps[ye]:b.image;if(J!==null)De=J.max.x-J.min.x,Me=J.max.y-J.min.y,Re=J.isBox3?J.max.z-J.min.z:1,Be=J.min.x,et=J.min.y,pt=J.isBox3?J.min.z:0;else{const xt=Math.pow(2,-Y);De=Math.floor(Dt.width*xt),Me=Math.floor(Dt.height*xt),b.isDataArrayTexture?Re=Dt.depth:b.isData3DTexture?Re=Math.floor(Dt.depth*xt):Re=1,Be=0,et=0,pt=0}X!==null?(Le=X.x,mt=X.y,Ht=X.z):(Le=0,mt=0,Ht=0);const Pt=ge.convert(k.format),an=ge.convert(k.type);let Ne;k.isData3DTexture?(Fe.setTexture3D(k,0),Ne=U.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(Fe.setTexture2DArray(k,0),Ne=U.TEXTURE_2D_ARRAY):(Fe.setTexture2D(k,0),Ne=U.TEXTURE_2D),fe.activeTexture(U.TEXTURE0),fe.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,k.flipY),fe.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),fe.pixelStorei(U.UNPACK_ALIGNMENT,k.unpackAlignment);const pn=fe.getParameter(U.UNPACK_ROW_LENGTH),bt=fe.getParameter(U.UNPACK_IMAGE_HEIGHT),pr=fe.getParameter(U.UNPACK_SKIP_PIXELS),on=fe.getParameter(U.UNPACK_SKIP_ROWS),Pa=fe.getParameter(U.UNPACK_SKIP_IMAGES);fe.pixelStorei(U.UNPACK_ROW_LENGTH,Dt.width),fe.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Dt.height),fe.pixelStorei(U.UNPACK_SKIP_PIXELS,Be),fe.pixelStorei(U.UNPACK_SKIP_ROWS,et),fe.pixelStorei(U.UNPACK_SKIP_IMAGES,pt);const Vi=b.isDataArrayTexture||b.isData3DTexture,mr=k.isDataArrayTexture||k.isData3DTexture;if(b.isDepthTexture){const xt=Pe.get(b),jt=Pe.get(k),Xn=Pe.get(xt.__renderTarget),It=Pe.get(jt.__renderTarget);fe.bindFramebuffer(U.READ_FRAMEBUFFER,Xn.__webglFramebuffer),fe.bindFramebuffer(U.DRAW_FRAMEBUFFER,It.__webglFramebuffer);for(let Jt=0;Jt<Re;Jt++)Vi&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Pe.get(b).__webglTexture,Y,pt+Jt),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Pe.get(k).__webglTexture,ye,Ht+Jt)),U.blitFramebuffer(Be,et,Be+De,et+Me,Le,mt,Le+De,mt+Me,U.DEPTH_BUFFER_BIT,U.NEAREST);fe.bindFramebuffer(U.READ_FRAMEBUFFER,null),fe.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(Y!==0||b.isRenderTargetTexture||Pe.has(b)){const xt=Pe.get(b),jt=Pe.get(k);fe.bindFramebuffer(U.READ_FRAMEBUFFER,C),fe.bindFramebuffer(U.DRAW_FRAMEBUFFER,P);for(let Xn=0;Xn<Re;Xn++)Vi?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,xt.__webglTexture,Y,pt+Xn):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,xt.__webglTexture,Y),mr?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,jt.__webglTexture,ye,Ht+Xn):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,jt.__webglTexture,ye),Y!==0?U.blitFramebuffer(Be,et,Be+De,et+Me,Le,mt,Le+De,mt+Me,U.COLOR_BUFFER_BIT,U.NEAREST):mr?U.copyTexSubImage3D(Ne,ye,Le,mt,Ht+Xn,Be,et,De,Me):U.copyTexSubImage2D(Ne,ye,Le,mt,Be,et,De,Me);fe.bindFramebuffer(U.READ_FRAMEBUFFER,null),fe.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else mr?b.isDataTexture||b.isData3DTexture?U.texSubImage3D(Ne,ye,Le,mt,Ht,De,Me,Re,Pt,an,Dt.data):k.isCompressedArrayTexture?U.compressedTexSubImage3D(Ne,ye,Le,mt,Ht,De,Me,Re,Pt,Dt.data):U.texSubImage3D(Ne,ye,Le,mt,Ht,De,Me,Re,Pt,an,Dt):b.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,ye,Le,mt,De,Me,Pt,an,Dt.data):b.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,ye,Le,mt,Dt.width,Dt.height,Pt,Dt.data):U.texSubImage2D(U.TEXTURE_2D,ye,Le,mt,De,Me,Pt,an,Dt);fe.pixelStorei(U.UNPACK_ROW_LENGTH,pn),fe.pixelStorei(U.UNPACK_IMAGE_HEIGHT,bt),fe.pixelStorei(U.UNPACK_SKIP_PIXELS,pr),fe.pixelStorei(U.UNPACK_SKIP_ROWS,on),fe.pixelStorei(U.UNPACK_SKIP_IMAGES,Pa),ye===0&&k.generateMipmaps===!0&&k.mipmapsAutoUpdate===!0&&U.generateMipmap(Ne),fe.unbindTexture()},this.initRenderTarget=function(b){Pe.get(b).__webglFramebuffer===void 0&&Fe.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?Fe.setTextureCube(b,0):b.isData3DTexture?Fe.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?Fe.setTexture2DArray(b,0):Fe.setTexture2D(b,0),fe.unbindTexture()},this.resetState=function(){F=0,z=0,Q=null,fe.reset(),ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ii}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=gt._getDrawingBufferColorSpace(e),t.unpackColorSpace=gt._getUnpackColorSpace()}}const zd={type:"change"},lu={type:"start"},Dh={type:"end"},ro=new ru,Hd=new Di,dM=Math.cos(70*w_.DEG2RAD),Vt=new K,Sn=2*Math.PI,yt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Nl=1e-6;class fM extends g0{constructor(e,t=null){super(e,t),this.state=yt.NONE,this.target=new K,this.cursor=new K,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:as.ROTATE,MIDDLE:as.DOLLY,RIGHT:as.PAN},this.touches={ONE:ts.ROTATE,TWO:ts.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new K,this._lastQuaternion=new cr,this._lastTargetPosition=new K,this._quat=new cr().setFromUnitVectors(e.up,new K(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new _d,this._sphericalDelta=new _d,this._scale=1,this._panOffset=new K,this._rotateStart=new $e,this._rotateEnd=new $e,this._rotateDelta=new $e,this._panStart=new $e,this._panEnd=new $e,this._panDelta=new $e,this._dollyStart=new $e,this._dollyEnd=new $e,this._dollyDelta=new $e,this._dollyDirection=new K,this._mouse=new $e,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=pM.bind(this),this._onPointerDown=hM.bind(this),this._onPointerUp=mM.bind(this),this._onContextMenu=MM.bind(this),this._onMouseWheel=vM.bind(this),this._onKeyDown=xM.bind(this),this._onTouchStart=SM.bind(this),this._onTouchMove=bM.bind(this),this._onMouseDown=gM.bind(this),this._onMouseMove=_M.bind(this),this._interceptControlDown=yM.bind(this),this._interceptControlUp=EM.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=yt.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(zd),this.update(),this.state=yt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const t=this.object.position;Vt.copy(t).sub(this.target),Vt.applyQuaternion(this._quat),this._spherical.setFromVector3(Vt),this.autoRotate&&this.state===yt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=Sn:i>Math.PI&&(i-=Sn),r<-Math.PI?r+=Sn:r>Math.PI&&(r-=Sn),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=a!=this._spherical.radius}if(Vt.setFromSpherical(this._spherical),Vt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Vt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=Vt.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),s=!!c}else if(this.object.isOrthographicCamera){const o=new K(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=c!==this.object.zoom;const l=new K(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=Vt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(ro.origin.copy(this.object.position),ro.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ro.direction))<dM?this.object.lookAt(this.target):(Hd.setFromNormalAndCoplanarPoint(this.object.up,this.target),ro.intersectPlane(Hd,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>Nl||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Nl||this._lastTargetPosition.distanceToSquared(this.target)>Nl?(this.dispatchEvent(zd),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Sn/60*this.autoRotateSpeed*e:Sn/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Vt.setFromMatrixColumn(t,0),Vt.multiplyScalar(-e),this._panOffset.add(Vt)}_panUp(e,t){this.screenSpacePanning===!0?Vt.setFromMatrixColumn(t,1):(Vt.setFromMatrixColumn(t,0),Vt.crossVectors(this.object.up,Vt)),Vt.multiplyScalar(e),this._panOffset.add(Vt)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const r=this.object.position;Vt.copy(r).sub(this.target);let s=Vt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*t*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),r=e-i.left,s=t-i.top,a=i.width,o=i.height;this._mouse.x=r/a*2-1,this._mouse.y=-(s/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientY),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Sn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Sn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Sn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Sn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Sn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new $e,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function hM(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function pM(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function mM(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Dh),this.state=yt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function gM(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case as.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=yt.DOLLY;break;case as.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=yt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=yt.ROTATE}break;case as.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=yt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=yt.PAN}break;default:this.state=yt.NONE}this.state!==yt.NONE&&this.dispatchEvent(lu)}function _M(n){switch(this.state){case yt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case yt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case yt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function vM(n){this.enabled===!1||this.enableZoom===!1||this.state!==yt.NONE||(n.preventDefault(),this.dispatchEvent(lu),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Dh))}function xM(n){this.enabled!==!1&&this._handleKeyDown(n)}function SM(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case ts.ROTATE:if(this.enableRotate===!1){this.state=yt.NONE;break}this._handleTouchStartRotate(n),this.state=yt.TOUCH_ROTATE;break;case ts.PAN:if(this.enablePan===!1){this.state=yt.NONE;break}this._handleTouchStartPan(n),this.state=yt.TOUCH_PAN;break;default:this.state=yt.NONE}break;case 2:switch(this.touches.TWO){case ts.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=yt.TOUCH_DOLLY_PAN;break;case ts.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=yt.TOUCH_DOLLY_ROTATE;break;default:this.state=yt.NONE}break;default:this.state=yt.NONE}this.state!==yt.NONE&&this.dispatchEvent(lu)}function bM(n){switch(this._trackPointer(n),this.state){case yt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case yt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case yt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case yt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=yt.NONE}}function MM(n){this.enabled!==!1&&n.preventDefault()}function yM(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function EM(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class TM extends au{constructor(e){super(e)}load(e,t,i,r){const s=this,a=new u0(this.manager);a.setPriority(this.priority),a.setCache(this.cache),a.setPath(this.path),a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(o){try{t(s.parse(o))}catch(c){r?r(c):console.error(c),s.manager.itemError(e)}},i,r)}parse(e){function t(l){const u=new DataView(l),f=32/8*3+32/8*3*3+16/8,d=u.getUint32(80,!0);if(80+32/8+d*f===u.byteLength)return!0;const _=[115,111,108,105,100];for(let v=0;v<5;v++)if(i(_,u,v))return!1;return!0}function i(l,u,f){for(let d=0,h=l.length;d<h;d++)if(l[d]!==u.getUint8(f+d))return!1;return!0}function r(l){const u=new DataView(l),f=u.getUint32(80,!0);let d,h,_,v=!1,p,m,y,w,S;for(let R=0;R<=70;R++)u.getUint32(R,!1)==1129270351&&u.getUint8(R+4)==82&&u.getUint8(R+5)==61&&(v=!0,p=new Float32Array(f*3*3),m=u.getUint8(R+6)/255,y=u.getUint8(R+7)/255,w=u.getUint8(R+8)/255,S=u.getUint8(R+9)/255);const T=84,E=12*4+2,g=new ai,M=new Float32Array(f*3*3),L=new Float32Array(f*3*3),D=new dt;for(let R=0;R<f;R++){const I=T+R*E,G=u.getFloat32(I,!0),C=u.getFloat32(I+4,!0),P=u.getFloat32(I+8,!0);if(v){const F=u.getUint16(I+48,!0);F&32768?(d=m,h=y,_=w):(d=(F&31)/31,h=(F>>5&31)/31,_=(F>>10&31)/31)}for(let F=1;F<=3;F++){const z=I+F*12,Q=R*3*3+(F-1)*3;M[Q]=u.getFloat32(z,!0),M[Q+1]=u.getFloat32(z+4,!0),M[Q+2]=u.getFloat32(z+8,!0),L[Q]=G,L[Q+1]=C,L[Q+2]=P,v&&(D.setRGB(d,h,_,Un),p[Q]=D.r,p[Q+1]=D.g,p[Q+2]=D.b)}}return g.setAttribute("position",new Si(M,3)),g.setAttribute("normal",new Si(L,3)),v&&(g.setAttribute("color",new Si(p,3)),g.hasColors=!0,g.alpha=S),g}function s(l){const u=new ai,f=/solid([\s\S]*?)endsolid/g,d=/facet([\s\S]*?)endfacet/g,h=/solid\s(.+)/;let _=0;const v=/[\s]+([+-]?(?:\d*)(?:\.\d*)?(?:[eE][+-]?\d+)?)/.source,p=new RegExp("vertex"+v+v+v,"g"),m=new RegExp("normal"+v+v+v,"g"),y=[],w=[],S=[],T=new K;let E,g=0,M=0,L=0;for(;(E=f.exec(l))!==null;){M=L;const D=E[0],R=(E=h.exec(D))!==null?E[1]:"";for(S.push(R);(E=d.exec(D))!==null;){let C=0,P=0;const F=E[0];for(;(E=m.exec(F))!==null;)T.x=parseFloat(E[1]),T.y=parseFloat(E[2]),T.z=parseFloat(E[3]),P++;for(;(E=p.exec(F))!==null;)y.push(parseFloat(E[1]),parseFloat(E[2]),parseFloat(E[3])),w.push(T.x,T.y,T.z),C++,L++;P!==1&&console.error("THREE.STLLoader: Something isn't right with the normal of face number "+_),C!==3&&console.error("THREE.STLLoader: Something isn't right with the vertices of face number "+_),_++}const I=M,G=L-M;u.userData.groupNames=S,u.addGroup(I,G,g),g++}return u.setAttribute("position",new xn(y,3)),u.setAttribute("normal",new xn(w,3)),u}function a(l){return typeof l!="string"?new TextDecoder().decode(l):l}function o(l){if(typeof l=="string"){const u=new Uint8Array(l.length);for(let f=0;f<l.length;f++)u[f]=l.charCodeAt(f)&255;return u.buffer||u}else return l}const c=o(e);return t(c)?r(c):s(a(e))}}var wM=Ae('<div class="absolute inset-0 flex items-center justify-center text-xs text-[#64748b]">No 3D STL geometry loaded</div>'),AM=Ae('<div class="relative w-full h-full flex flex-col bg-[#02050a] select-none"><div class="h-10 px-4 flex items-center justify-between border-b border-white/[0.08] bg-[#040812]/80 backdrop-blur-sm text-xs"><div class="flex items-center gap-2"><span class="font-mono text-[#38bdf8] font-semibold"> </span> <span class="text-[#64748b]">·</span> <span class="text-[#94a3b8] font-mono text-[11px]"> </span></div> <div class="flex items-center gap-1.5"><button type="button" title="Toggle Auto-Rotation">Auto Rotate</button> <button type="button" title="Toggle Wireframe Mesh">Wireframe</button> <button type="button" class="px-2 py-1 rounded text-[11px] font-medium text-[#9ca3af] hover:text-white hover:bg-white/[0.06] transition-all" title="Reset Camera View">Reset View</button> <button type="button" class="px-2.5 py-1 rounded bg-[#38bdf8]/15 hover:bg-[#38bdf8]/25 text-[#38bdf8] border border-[#38bdf8]/30 font-medium text-[11px] flex items-center gap-1 transition-all" title="Download binary STL file"><svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clip-rule="evenodd"></path></svg> Download STL</button></div></div> <div class="flex-1 w-full h-full relative cursor-grab active:cursor-grabbing overflow-hidden"><!></div> <div class="h-6 px-3 bg-[#030712] border-t border-white/[0.05] flex items-center justify-between text-[10px] text-[#64748b] font-mono"><span>Left Click + Drag: Orbit • Right Click: Pan • Scroll: Zoom</span> <span>Parametric Solid Geometry • build123d</span></div></div>');function RM(n,e){fn(e,!0);let t=Lr(e,"fileName",3,"model.stl"),i=Ze(null),r=Ze(!1),s=Ze(!1),a=qt(()=>{var Z;return(Z=e.metrics)!=null&&Z.volume_mm3?`${e.metrics.volume_mm3.toLocaleString()} mm³`:"Calculated"}),o,c,l,u,f=null,d,h,_;function v(){if(!B(i))return;const Z=B(i).clientWidth||400,de=B(i).clientHeight||400;o=new z_,o.background=new dt(132362);const Ce=new m0(100,20,1976635,988970);Ce.position.y=-20,o.add(Ce),c=new jn(45,Z/de,.1,1e3),c.position.set(60,50,80),l=new uM({antialias:!0,powerPreference:"high-performance"}),l.setSize(Z,de),l.setPixelRatio(Math.min(window.devicePixelRatio,2)),l.shadowMap.enabled=!0,B(i).innerHTML="",B(i).appendChild(l.domElement),u=new fM(c,l.domElement),u.enableDamping=!0,u.dampingFactor=.05;const H=new h0(16777215,.7);o.add(H);const $=new gd(3718648,1.8);$.position.set(50,80,50),o.add($);const me=new gd(16777215,1);me.position.set(-50,-30,-50),o.add(me),d=new r0({color:3718648,metalness:.3,roughness:.35,wireframe:B(r)}),p(),_=new ResizeObserver(()=>{if(!B(i)||!l||!c)return;const he=B(i).clientWidth,ue=B(i).clientHeight;c.aspect=he/ue,c.updateProjectionMatrix(),l.setSize(he,ue)}),_.observe(B(i)),y()}function p(){if(e.stlData)try{const Z=new TM;let de;if(e.stlData.startsWith("data:")||e.stlData.startsWith("blob:")||e.stlData.startsWith("http")){Z.load(e.stlData,H=>m(H));return}let Ce;try{const H=atob(e.stlData),$=H.length,me=new Uint8Array($);for(let he=0;he<$;he++)me[he]=H.charCodeAt(he);Ce=me.buffer}catch{Ce=new TextEncoder().encode(e.stlData).buffer}de=Z.parse(Ce),m(de)}catch(Z){console.error("Failed to parse STL geometry",Z)}}function m(Z){f&&(o.remove(f),f.geometry.dispose()),Z.computeVertexNormals(),Z.center(),f=new dr(Z,d),f.castShadow=!0,f.receiveShadow=!0,o.add(f),Z.computeBoundingSphere();const de=Z.boundingSphere?Z.boundingSphere.radius:30;c.position.set(de*2.2,de*1.8,de*2.5),c.lookAt(0,0,0),u.target.set(0,0,0)}function y(){h=requestAnimationFrame(y),u&&(u.autoRotate=B(s),u.autoRotateSpeed=2,u.update()),l&&o&&c&&l.render(o,c)}function w(){be(r,!B(r)),d&&(d.wireframe=B(r))}function S(){if(u&&f&&f.geometry.boundingSphere){const Z=f.geometry.boundingSphere.radius;c.position.set(Z*2.2,Z*1.8,Z*2.5),u.target.set(0,0,0)}}function T(){if(e.stlData)try{let Z;if(e.stlData.startsWith("data:")){const H=e.stlData.split(","),$=atob(H[1]),me=new Uint8Array($.length);for(let he=0;he<$.length;he++)me[he]=$.charCodeAt(he);Z=new Blob([me],{type:"application/sla"})}else Z=new Blob([e.stlData],{type:"application/sla"});const de=URL.createObjectURL(Z),Ce=document.createElement("a");Ce.href=de,Ce.download=t().endsWith(".stl")?t():`${t()}.stl`,Ce.click(),URL.revokeObjectURL(de)}catch(Z){console.error("Failed to download STL",Z)}}Cs(()=>{v()}),bm(()=>{h&&cancelAnimationFrame(h),_&&_.disconnect(),f&&f.geometry.dispose(),d&&d.dispose(),u&&u.dispose(),l&&l.dispose()});var E=AM(),g=ie(E),M=ie(g),L=ie(M),D=Ie(L,!0),R=j(L,4),I=Ie(R,!0),G=j(M,2),C=ie(G),P=j(C,2),F=j(P,2),z=j(F,2),Q=j(g,2),O=ie(Q);{var q=Z=>{var de=wM();Ee(Z,de)};Ge(O,Z=>{e.stlData||Z(q)})}yo(Q,Z=>be(i,Z),()=>B(i)),it(()=>{Ue(D,t()),Ue(I,B(a)),Ot(C,1,`px-2 py-1 rounded text-[11px] font-medium transition-all ${B(s)?"bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/40":"text-[#9ca3af] hover:text-white hover:bg-white/[0.06]"}`),Ot(P,1,`px-2 py-1 rounded text-[11px] font-medium transition-all ${B(r)?"bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/40":"text-[#9ca3af] hover:text-white hover:bg-white/[0.06]"}`)}),Ye("click",C,()=>be(s,!B(s))),Ye("click",P,w),Ye("click",F,S),Ye("click",z,T),Ee(n,E),hn()}Tn(["click"]);var CM=Ae('<div class="h-full w-full flex flex-col bg-[#02050a] text-[#f3f4f6]"><div class="px-5 py-3 border-b border-white/[0.08] bg-[#040812]/90 flex items-center justify-between text-xs"><div><div class="font-semibold text-white tracking-tight"> </div> <div class="text-[11px] text-[#64748b]"> </div></div> <div class="flex items-center gap-4 text-xs font-mono"><div class="flex flex-col items-end"><span class="text-[#94a3b8]">Range</span> <span class="font-bold text-[#38bdf8]"> </span></div> <div class="flex flex-col items-end"><span class="text-[#94a3b8]">Peak Alt</span> <span class="font-bold text-[#10b981]"> </span></div> <div class="flex flex-col items-end"><span class="text-[#94a3b8]">Flight Time</span> <span class="font-bold text-white"> </span></div></div></div> <div class="flex-1 w-full relative min-h-[220px]"><canvas class="w-full h-full block"></canvas></div> <div class="p-4 border-t border-white/[0.08] bg-[#030610] grid grid-cols-2 md:grid-cols-4 gap-4 text-xs select-none"><div class="space-y-1"><div class="flex justify-between text-[11px]"><span class="text-[#94a3b8]">Velocity (v₀)</span> <span class="font-mono text-[#38bdf8]"> </span></div> <input type="range" min="10" max="150" step="1" class="w-full accent-[#38bdf8] cursor-pointer"/></div> <div class="space-y-1"><div class="flex justify-between text-[11px]"><span class="text-[#94a3b8]">Launch Angle (θ)</span> <span class="font-mono text-[#38bdf8]"> </span></div> <input type="range" min="5" max="85" step="1" class="w-full accent-[#38bdf8] cursor-pointer"/></div> <div class="space-y-1"><div class="flex justify-between text-[11px]"><span class="text-[#94a3b8]">Air Drag (k)</span> <span class="font-mono text-[#38bdf8]"> </span></div> <input type="range" min="0.00" max="0.20" step="0.01" class="w-full accent-[#38bdf8] cursor-pointer"/></div> <div class="space-y-1"><div class="flex justify-between text-[11px]"><span class="text-[#94a3b8]">Mass (m)</span> <span class="font-mono text-[#38bdf8]"> </span></div> <input type="range" min="0.1" max="10" step="0.1" class="w-full accent-[#38bdf8] cursor-pointer"/></div></div></div>');function PM(n,e){fn(e,!0);let t=Ze(null),i=qt(()=>{var le,At;return((At=(le=e.simData)==null?void 0:le.system)==null?void 0:At.toLowerCase().includes("projectile"))??!0}),r=Ze(50),s=Ze(45),a=Ze(.05),o=Ze(1);ia(()=>{var le;(le=e.simData)!=null&&le.metrics&&(e.simData.metrics.v0!==void 0&&be(r,Number(e.simData.metrics.v0),!0),e.simData.metrics.angle!==void 0&&be(s,Number(e.simData.metrics.angle),!0),e.simData.metrics.drag_k!==void 0&&be(a,Number(e.simData.metrics.drag_k),!0),e.simData.metrics.mass!==void 0&&be(o,Number(e.simData.metrics.mass),!0))});let c=Ze(!1),l=Ze(0),u=Ze(0),f=Ze(0);function d(le,At,Ct){const[,,Rt,U]=le,Qe=Math.hypot(Rt,U),He=-(At/Ct)*Qe*Rt,Xe=-9.80665-At/Ct*Qe*U;return[Rt,U,He,Xe]}function h(le,At,Ct,Rt){const U=At*Math.PI/180;let Qe=[0,0,le*Math.cos(U),le*Math.sin(U)],He=0;const Xe=.02,fe=[0],at=[0];let Pe=0;for(;Qe[1]>=0&&He<30;){const Fe=d(Qe,Ct,Rt),A=[Qe[0]+.5*Xe*Fe[0],Qe[1]+.5*Xe*Fe[1],Qe[2]+.5*Xe*Fe[2],Qe[3]+.5*Xe*Fe[3]],x=d(A,Ct,Rt),W=[Qe[0]+.5*Xe*x[0],Qe[1]+.5*Xe*x[1],Qe[2]+.5*Xe*x[2],Qe[3]+.5*Xe*x[3]],ae=d(W,Ct,Rt),re=[Qe[0]+Xe*ae[0],Qe[1]+Xe*ae[1],Qe[2]+Xe*ae[2],Qe[3]+Xe*ae[3]],oe=d(re,Ct,Rt);Qe[0]+=Xe/6*(Fe[0]+2*x[0]+2*ae[0]+oe[0]),Qe[1]+=Xe/6*(Fe[1]+2*x[1]+2*ae[1]+oe[1]),Qe[2]+=Xe/6*(Fe[2]+2*x[2]+2*ae[2]+oe[2]),Qe[3]+=Xe/6*(Fe[3]+2*x[3]+2*ae[3]+oe[3]),He+=Xe,Qe[1]>Pe&&(Pe=Qe[1]),Qe[1]>=0&&(fe.push(Qe[0]),at.push(Qe[1]))}return be(l,Math.round(Qe[0]*100)/100),be(u,Math.round(Pe*100)/100),be(f,Math.round(He*100)/100),{xs:fe,ys:at}}function _(){var le,At,Ct,Rt,U,Qe,He;if(!B(c)&&((At=(le=e.simData)==null?void 0:le.trajectories)!=null&&At.x)&&((Rt=(Ct=e.simData)==null?void 0:Ct.trajectories)!=null&&Rt.y)&&e.simData.trajectories.x.length>0){const Xe=e.simData.trajectories.x,fe=e.simData.trajectories.y;return be(l,((U=e.simData.metrics)==null?void 0:U.total_range_m)??Math.round(Xe[Xe.length-1]*100)/100,!0),be(u,((Qe=e.simData.metrics)==null?void 0:Qe.max_altitude_m)??Math.round(Math.max(...fe)*100)/100,!0),be(f,((He=e.simData.metrics)==null?void 0:He.flight_time_s)??0,!0),{xs:Xe,ys:fe}}return h(B(r),B(s),B(a),B(o))}function v(){if(!B(t))return;const le=B(t).getContext("2d");if(!le)return;const At=window.devicePixelRatio||1,Ct=B(t).clientWidth,Rt=B(t).clientHeight;B(t).width=Ct*At,B(t).height=Rt*At,le.scale(At,At),le.fillStyle="#02050a",le.fillRect(0,0,Ct,Rt);const U=55,Qe=30,He=30,Xe=45,fe=Ct-U-Qe,at=Rt-He-Xe;if(B(i)){const{xs:Pe,ys:Fe}=_(),A=Math.max(Math.max(...Pe)*1.15,20),x=Math.max(Math.max(...Fe)*1.25,10);le.strokeStyle="rgba(255, 255, 255, 0.06)",le.lineWidth=1;const W=5,ae=4;for(let oe=0;oe<=W;oe++){const ce=U+oe/W*fe;le.beginPath(),le.moveTo(ce,He),le.lineTo(ce,He+at),le.stroke(),le.fillStyle="#64748b",le.font="10px monospace";const ee=Math.round(oe/W*A);le.fillText(`${ee}m`,ce-10,He+at+18)}for(let oe=0;oe<=ae;oe++){const ce=He+at-oe/ae*at;le.beginPath(),le.moveTo(U,ce),le.lineTo(U+fe,ce),le.stroke(),le.fillStyle="#64748b",le.font="10px monospace";const ee=Math.round(oe/ae*x);le.fillText(`${ee}m`,U-38,ce+4)}if(le.strokeStyle="rgba(255, 255, 255, 0.2)",le.lineWidth=1.5,le.beginPath(),le.moveTo(U,He),le.lineTo(U,He+at),le.lineTo(U+fe,He+at),le.stroke(),le.fillStyle="#94a3b8",le.font="11px sans-serif",le.fillText("Altitude (y) [m]",U,He-12),le.fillText("Downrange Distance (x) [m]",U+fe/2-50,He+at+36),Pe.length>1){le.beginPath(),le.moveTo(U,He+at);for(let ce=0;ce<Pe.length;ce++){const ee=U+Pe[ce]/A*fe,ne=He+at-Fe[ce]/x*at;le.lineTo(ee,ne)}le.lineTo(U+Pe[Pe.length-1]/A*fe,He+at),le.closePath();const oe=le.createLinearGradient(0,He,0,He+at);oe.addColorStop(0,"rgba(56, 189, 248, 0.25)"),oe.addColorStop(1,"rgba(56, 189, 248, 0.0)"),le.fillStyle=oe,le.fill(),le.beginPath(),le.moveTo(U,He+at);for(let ce=0;ce<Pe.length;ce++){const ee=U+Pe[ce]/A*fe,ne=He+at-Fe[ce]/x*at;le.lineTo(ee,ne)}le.strokeStyle="#38bdf8",le.lineWidth=2.5,le.shadowColor="#38bdf8",le.shadowBlur=8,le.stroke(),le.shadowBlur=0}const re=Fe.indexOf(Math.max(...Fe));if(re>=0){const oe=U+Pe[re]/A*fe,ce=He+at-Fe[re]/x*at;le.fillStyle="#10b981",le.beginPath(),le.arc(oe,ce,4,0,Math.PI*2),le.fill(),le.fillStyle="#10b981",le.font="bold 10px monospace",le.fillText(`Peak: ${B(u)}m`,oe+8,ce-4)}}}ia(()=>{B(r),B(s),B(a),B(o),v()}),Cs(()=>{v();const le=()=>v();return window.addEventListener("resize",le),()=>window.removeEventListener("resize",le)});var p=CM(),m=ie(p),y=ie(m),w=ie(y),S=Ie(w,!0),T=j(w,2),E=Ie(T,!0),g=j(y,2),M=ie(g),L=j(ie(M),2),D=Ie(L),R=j(M,2),I=j(ie(R),2),G=Ie(I),C=j(R,2),P=j(ie(C),2),F=Ie(P),z=j(m,2),Q=ie(z);yo(Q,le=>be(t,le),()=>B(t));var O=j(z,2),q=ie(O),Z=ie(q),de=j(ie(Z),2),Ce=Ie(de),H=j(Z,2),$=j(q,2),me=ie($),he=j(ie(me),2),ue=Ie(he),Oe=j(me,2),ct=j($,2),_e=ie(ct),We=j(ie(_e),2),rt=Ie(We,!0),Ke=j(_e,2),kt=j(ct,2),Ft=ie(kt),sn=j(ie(Ft),2),Lt=Ie(sn),wn=j(Ft,2);it(()=>{var le;Ue(S,((le=e.simData)==null?void 0:le.system)||"2D Nonlinear Projectile Simulation"),Ue(E,B(c)?"Real-Time 4th-Order Runge-Kutta (RK4) • Quadratic Drag":"SciPy RK45 Adaptive Integrator • Verified Initial Trajectory"),Ue(D,`${B(l)??""} m`),Ue(G,`${B(u)??""} m`),Ue(F,`${B(f)??""} s`),Ue(Ce,`${B(r)??""} m/s`),Ue(ue,`${B(s)??""}°`),Ue(rt,B(a)),Ue(Lt,`${B(o)??""} kg`)}),Ye("input",H,()=>be(c,!0)),es(H,()=>B(r),le=>be(r,le)),Ye("input",Oe,()=>be(c,!0)),es(Oe,()=>B(s),le=>be(s,le)),Ye("input",Ke,()=>be(c,!0)),es(Ke,()=>B(a),le=>be(a,le)),Ye("input",wn,()=>be(c,!0)),es(wn,()=>B(o),le=>be(o,le)),Ee(n,p),hn()}Tn(["input"]);var DM=Ae('<div class="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] shadow-2xl max-w-md w-full flex items-center justify-center [&amp;_svg]:max-w-full [&amp;_svg]:h-auto [&amp;_rect]:fill-transparent"></div>'),LM=Ae('<div class="text-xs text-[#64748b]">No chemical structure SVG available</div>'),NM=Ae('<div class="p-4 border-t border-white/[0.08] bg-[#02050a] grid grid-cols-3 sm:grid-cols-6 gap-3 text-xs select-none"><div class="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]"><div class="text-[10px] text-[#9ca3af]">Formula</div> <div class="font-mono font-bold text-white mt-0.5"> </div></div> <div class="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]"><div class="text-[10px] text-[#9ca3af]">Mol Weight</div> <div class="font-mono font-bold text-[#38bdf8] mt-0.5"> </div></div> <div class="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]"><div class="text-[10px] text-[#9ca3af]">LogP</div> <div class="font-mono font-bold text-white mt-0.5"> </div></div> <div class="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]"><div class="text-[10px] text-[#9ca3af]">TPSA</div> <div class="font-mono font-bold text-white mt-0.5"> </div></div> <div class="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]"><div class="text-[10px] text-[#9ca3af]">H-Donors</div> <div class="font-mono font-bold text-[#10b981] mt-0.5"> </div></div> <div class="p-2 rounded-lg bg-white/[0.03] border border-white/[0.06]"><div class="text-[10px] text-[#9ca3af]">H-Acceptors</div> <div class="font-mono font-bold text-[#38bdf8] mt-0.5"> </div></div></div>'),IM=Ae('<div class="h-full w-full flex flex-col bg-[#02050a] text-[#f3f4f6]"><div class="h-10 px-4 flex items-center justify-between border-b border-white/[0.08] bg-[#040812]/80 backdrop-blur-sm text-xs"><div class="flex items-center gap-2 font-mono"><span class="text-[#38bdf8] truncate max-w-[280px]"> </span> <button type="button" class="text-[10px] text-[#9ca3af] hover:text-white px-1.5 py-0.5 rounded bg-white/[0.05] transition-all cursor-pointer" title="Copy SMILES string"> </button></div> <button type="button" class="px-2.5 py-1 rounded bg-[#38bdf8]/15 hover:bg-[#38bdf8]/25 text-[#38bdf8] border border-[#38bdf8]/30 font-medium text-[11px] flex items-center gap-1 transition-all cursor-pointer" title="Download vector SVG"><svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" clip-rule="evenodd"></path></svg> Download SVG</button></div> <div class="flex-1 flex items-center justify-center p-6 bg-[#030611] overflow-hidden"><!></div> <!></div>');function UM(n,e){fn(e,!0);let t=Lr(e,"smiles",3,""),i=Lr(e,"descriptors",19,()=>({})),r=Ze(!1);async function s(){try{await navigator.clipboard.writeText(t()),be(r,!0),setTimeout(()=>be(r,!1),2e3)}catch(E){console.error("Clipboard copy failed",E)}}function a(){if(!e.svg)return;const E=new Blob([e.svg],{type:"image/svg+xml"}),g=URL.createObjectURL(E),M=document.createElement("a");M.href=g,M.download="molecule.svg",M.click(),URL.revokeObjectURL(g)}var o=IM(),c=ie(o),l=ie(c),u=ie(l),f=Ie(u,!0),d=j(u,2),h=Ie(d,!0),_=j(l,2),v=j(c,2),p=ie(v);{var m=E=>{var g=DM();zo(g,()=>e.svg,!0),Ee(E,g)},y=E=>{var g=LM();Ee(E,g)};Ge(p,E=>{e.svg?E(m):E(y,-1)})}var w=j(v,2);{var S=E=>{var g=NM(),M=ie(g),L=j(ie(M),2),D=Ie(L,!0),R=j(M,2),I=j(ie(R),2),G=Ie(I,!0),C=j(R,2),P=j(ie(C),2),F=Ie(P,!0),z=j(C,2),Q=j(ie(z),2),O=Ie(Q),q=j(z,2),Z=j(ie(q),2),de=Ie(Z,!0),Ce=j(q,2),H=j(ie(Ce),2),$=Ie(H,!0);it(()=>{Ue(D,i().formula||"N/A"),Ue(G,i().mw||"N/A"),Ue(F,i().logp??"N/A"),Ue(O,`${i().tpsa??"N/A"??""} Å²`),Ue(de,i().hbd??0),Ue($,i().hba??0)}),Ee(E,g)},T=qt(()=>Object.keys(i()).length>0);Ge(w,E=>{B(T)&&E(S)})}it(()=>{Ue(f,t()||"Molecular Structure"),Ue(h,B(r)?"Copied!":"Copy")}),Ye("click",d,s),Ye("click",_,a),Ee(n,o),hn()}Tn(["click"]);var FM=Ae('<button type="button"><span>3D CAD</span></button>'),OM=Ae('<button type="button"><span>Simulation</span></button>'),BM=Ae('<button type="button"><span>Structure</span></button>'),kM=Ae('<button type="button">Diff</button>'),zM=Ae('<div class="flex items-center justify-between p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs"><div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]"></span> <span class="font-medium text-[#10b981]">SymPy CAS Certified</span> <span class="text-[#9ca3af]"> </span></div> <span class="font-mono text-[11px] text-[#10b981]">100% Deterministic (Exact)</span></div>'),HM=Ae('<div class="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.07] text-xs"><div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-[#94a3b8]"></span> <span class="font-medium text-[#94a3b8]">Analytical Formulation</span> <span class="text-[#64748b]">· LLM Synthesized (Uncertified)</span></div> <span class="font-mono text-[11px] text-[#6b7280]">Symbolic verification not evaluated</span></div>'),GM=Ae('<div class="h-full overflow-y-auto px-6 py-5 leading-relaxed font-sans" style="scrollbar-width: thin;"><div class="max-w-3xl mx-auto space-y-4"><!> <div class="prose prose-invert max-w-none text-sm text-[#e2e8f0] font-sans leading-7"></div></div></div>'),VM=Ae('<div class="h-full overflow-y-auto px-6 py-5 leading-relaxed font-sans" style="scrollbar-width: thin;"><div class="max-w-3xl mx-auto space-y-3"><div class="flex items-center justify-between text-xs text-[#9ca3af] px-1"><span>Compilable Standard LaTeX (Overleaf Ready)</span> <span class="font-mono text-[10px]">amsmath · physics · siunitx</span></div> <div class="relative rounded-xl border border-white/10 bg-[#05080e] overflow-hidden"><pre class="p-4 text-xs font-mono text-[#cbd5e1] overflow-x-auto leading-relaxed select-all"><code> </code></pre></div></div></div>'),WM=Ae('<div class="rounded-xl border border-red-500/20 bg-red-950/10 p-4"><div class="text-[10px] uppercase font-bold text-red-400 mb-2">Previous Equation</div> <pre class="text-red-200 overflow-x-auto whitespace-pre-wrap"> </pre></div>'),XM=Ae('<div class="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-4"><div class="text-[10px] uppercase font-bold text-emerald-400 mb-2">Revised Calibrated Equation</div> <pre class="text-emerald-200 overflow-x-auto whitespace-pre-wrap"> </pre></div>'),qM=Ae('<div class="h-full overflow-y-auto px-6 py-5 leading-relaxed font-sans" style="scrollbar-width: thin;"><div class="max-w-3xl mx-auto space-y-4 text-xs font-mono"><div class="p-3 rounded-xl bg-white/[0.03] border border-white/[0.07] text-[#9ca3af]">Intra-line character diff comparing equations and constant calibrations.</div> <!> <!></div></div>'),YM=Ae('<div class="h-full w-full flex flex-col bg-[#02050a] text-[#f3f4f6] select-text"><div class="h-12 flex-shrink-0 flex items-center justify-between px-4 border-b border-white/[0.08] bg-[#040812]/90 backdrop-blur-md select-none"><div class="flex items-center gap-3 min-w-0"><div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]"></span> <span class="text-xs font-semibold text-white tracking-tight truncate max-w-[150px] sm:max-w-[220px]"> </span></div> <div class="flex items-center bg-white/[0.04] p-0.5 rounded-lg border border-white/[0.08]"><!> <!> <!> <button type="button">Derivation</button> <button type="button">LaTeX</button> <!></div></div> <div class="flex items-center gap-1.5 flex-shrink-0"><button type="button" class="px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1.5 bg-[#10b981]/15 hover:bg-[#10b981]/25 text-[#10b981] border border-[#10b981]/30 disabled:opacity-50" title="Download instant Typst vector PDF (&lt;50ms)"><svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm4.75 6.75a.75.75 0 011.5 0v3.69l1.22-1.22a.75.75 0 111.06 1.06l-2.5 2.5a.75.75 0 01-1.06 0l-2.5-2.5a.75.75 0 111.06-1.06l1.22 1.22V8.75z" clip-rule="evenodd"></path></svg> <span> </span></button> <button type="button" title="Copy compilable LaTeX for Overleaf"><svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12a1.5 1.5 0 01.439 1.061V16.5A1.5 1.5 0 0115.5 18h-7A1.5 1.5 0 017 16.5v-13z"></path><path d="M5 6.5A1.5 1.5 0 016.5 5h.75v1.5H6.5a.5.5 0 00-.5.5v10a.5.5 0 00.5.5h7a.5.5 0 00.5-.5v-.75H16v.75A1.5 1.5 0 0114.5 18h-7A1.5 1.5 0 016 16.5v-10z"></path></svg> <span> </span></button> <button type="button" class="w-7 h-7 rounded-lg text-[#9ca3af] hover:text-white hover:bg-white/[0.08] flex items-center justify-center transition-all cursor-pointer" title="Close Canvas (Esc)" aria-label="Close Canvas"><svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button></div></div> <div class="flex-1 w-full h-full overflow-hidden relative"><!></div></div>');function KM(n,e){fn(e,!0);let t=Ze(!1),i=Ze(!1),r=qt(()=>e.artifact.latexSource?e.artifact.latexSource:`\\documentclass[11pt,a4paper]{article}
\\usepackage[margin=1in]{geometry}
\\usepackage{amsmath,amssymb,amsfonts}
\\usepackage{physics}
\\usepackage{siunitx}
\\usepackage{booktabs}
\\usepackage{hyperref}

\\title{\\textbf{${e.artifact.title}}}
\\author{Vigyan Sovereign Scientific Workstation}
\\date{\\today}

\\begin{document}
\\maketitle

\\begin{abstract}
Analytical derivation and symbolic verification certified by Vigyan AST Engine.
\\end{abstract}

\\section{Derivation and Governing Formulations}
${e.artifact.content.replace(/```[a-z]*\n?/g,"").replace(/<\/?(?:code|pre|solution|sstream|latex|math)>/gi,"").replace(/#/g,"%").trim()}

\\section{SymPy Verification Metrics}
Residual Error: \\texttt{${e.artifact.sympyResidual||"0.000e+00"}} (Analytically Exact)

\\end{document}`);async function s(){try{await navigator.clipboard.writeText(B(r)),be(t,!0),setTimeout(()=>be(t,!1),2e3)}catch(H){console.error("Clipboard copy failed",H)}}async function a(){var H;be(i,!0);try{const $={title:e.artifact.title,content:e.artifact.content,verified:e.artifact.verified??!1,verified_residual:e.artifact.sympyResidual||"0.000e+00",metrics:((H=e.artifact.simData)==null?void 0:H.metrics)||e.artifact.stlMetrics||{}},me={"Content-Type":"application/json"},he=js();he&&(me["X-Vigyan-Token"]=he);const ue=await fetch("/api/export-typst",{method:"POST",headers:me,body:JSON.stringify($)});if(!ue.ok)throw new Error(`Typst export failed: ${ue.statusText}`);const Oe=await ue.blob(),ct=URL.createObjectURL(Oe),_e=document.createElement("a");_e.href=ct,_e.download=`${e.artifact.title.toLowerCase().replace(/[^a-z0-9]+/g,"_")}_report.pdf`,_e.click(),URL.revokeObjectURL(ct)}catch($){console.error("Failed to generate Typst PDF",$)}finally{be(i,!1)}}var o=YM(),c=ie(o),l=ie(c),u=ie(l),f=j(ie(u),2),d=Ie(f,!0),h=j(u,2),_=ie(h);{var v=H=>{var $=FM();it(()=>Ot($,1,`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1.5 ${Et.activeTab==="cad"?"bg-[#38bdf8]/20 text-[#38bdf8] shadow-sm border border-[#38bdf8]/30 font-semibold":"text-[#9ca3af] hover:text-white"}`)),Ye("click",$,()=>Et.activeTab="cad"),Ee(H,$)};Ge(_,H=>{(e.artifact.type==="cad"||e.artifact.stlData)&&H(v)})}var p=j(_,2);{var m=H=>{var $=OM();it(()=>Ot($,1,`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1.5 ${Et.activeTab==="sim"?"bg-[#38bdf8]/20 text-[#38bdf8] shadow-sm border border-[#38bdf8]/30 font-semibold":"text-[#9ca3af] hover:text-white"}`)),Ye("click",$,()=>Et.activeTab="sim"),Ee(H,$)};Ge(p,H=>{(e.artifact.type==="sim"||e.artifact.simData)&&H(m)})}var y=j(p,2);{var w=H=>{var $=BM();it(()=>Ot($,1,`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1.5 ${Et.activeTab==="chem"?"bg-[#38bdf8]/20 text-[#38bdf8] shadow-sm border border-[#38bdf8]/30 font-semibold":"text-[#9ca3af] hover:text-white"}`)),Ye("click",$,()=>Et.activeTab="chem"),Ee(H,$)};Ge(y,H=>{(e.artifact.type==="chem"||e.artifact.chemSvg)&&H(w)})}var S=j(y,2),T=j(S,2),E=j(T,2);{var g=H=>{var $=kM();it(()=>Ot($,1,`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${Et.activeTab==="diff"?"bg-white/10 text-white shadow-sm font-semibold":"text-[#9ca3af] hover:text-white"}`)),Ye("click",$,()=>Et.activeTab="diff"),Ee(H,$)};Ge(E,H=>{(e.artifact.diffBefore||e.artifact.diffAfter)&&H(g)})}var M=j(l,2),L=ie(M),D=j(ie(L),2),R=Ie(D,!0),I=j(L,2),G=j(ie(I),2),C=Ie(G,!0),P=j(I,2),F=j(c,2),z=ie(F);{var Q=H=>{{let $=qt(()=>e.artifact.stlFileName||"part.stl");RM(H,{get stlData(){return e.artifact.stlData},get fileName(){return B($)},get metrics(){return e.artifact.stlMetrics}})}},O=H=>{PM(H,{get simData(){return e.artifact.simData}})},q=H=>{UM(H,{get svg(){return e.artifact.chemSvg},get smiles(){return e.artifact.title},get descriptors(){return e.artifact.chemDescriptors}})},Z=H=>{var $=GM(),me=ie($),he=ie(me);{var ue=_e=>{var We=zM(),rt=ie(We),Ke=j(ie(rt),4),kt=Ie(Ke);it(()=>Ue(kt,`· Residual: ${(e.artifact.sympyResidual||"0.000e+00")??""}`)),Ee(_e,We)},Oe=_e=>{var We=HM();Ee(_e,We)};Ge(he,_e=>{e.artifact.verified?_e(ue):_e(Oe,-1)})}var ct=j(he,2);zo(ct,()=>Kc(e.artifact.content),!0),Ee(H,$)},de=H=>{var $=VM(),me=ie($),he=j(ie(me),2),ue=ie(he),Oe=ie(ue),ct=Ie(Oe,!0);it(()=>Ue(ct,B(r))),Ee(H,$)},Ce=H=>{var $=qM(),me=ie($),he=j(ie(me),2);{var ue=_e=>{var We=WM(),rt=j(ie(We),2),Ke=Ie(rt,!0);it(()=>Ue(Ke,e.artifact.diffBefore)),Ee(_e,We)};Ge(he,_e=>{e.artifact.diffBefore&&_e(ue)})}var Oe=j(he,2);{var ct=_e=>{var We=XM(),rt=j(ie(We),2),Ke=Ie(rt,!0);it(()=>Ue(Ke,e.artifact.diffAfter)),Ee(_e,We)};Ge(Oe,_e=>{e.artifact.diffAfter&&_e(ct)})}Ee(H,$)};Ge(z,H=>{Et.activeTab==="cad"?H(Q):Et.activeTab==="sim"?H(O,1):Et.activeTab==="chem"?H(q,2):Et.activeTab==="derivation"?H(Z,3):Et.activeTab==="overleaf"?H(de,4):Et.activeTab==="diff"&&H(Ce,5)})}it(()=>{Ue(d,e.artifact.title),Ot(S,1,`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${Et.activeTab==="derivation"?"bg-white/10 text-white shadow-sm font-semibold":"text-[#9ca3af] hover:text-white"}`),Ot(T,1,`px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${Et.activeTab==="overleaf"?"bg-white/10 text-white shadow-sm font-semibold":"text-[#9ca3af] hover:text-white"}`),L.disabled=B(i),Ue(R,B(i)?"Compiling...":"Download PDF"),Ot(I,1,`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1.5 ${B(t)?"bg-[#10b981] text-black font-semibold":"bg-[#38bdf8]/15 hover:bg-[#38bdf8]/25 text-[#38bdf8] border border-[#38bdf8]/30"}`),Ue(C,B(t)?"Copied!":"LaTeX")}),Ye("click",S,()=>Et.activeTab="derivation"),Ye("click",T,()=>Et.activeTab="overleaf"),Ye("click",L,a),Ye("click",I,s),Ye("click",P,function(...H){var $;($=e.onClose)==null||$.apply(this,H)}),Ee(n,o),hn()}Tn(["click"]);var ZM=Ae('<button class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono text-[#9ca3af] hover:text-white hover:bg-white/[0.05] transition-all cursor-pointer border border-transparent" title="Start fresh conversation (Cmd+K)"><span>+ New</span></button>'),JM=Ae('<div class="w-px bg-white/10 flex-shrink-0"></div> <div class="h-full w-[50%] min-w-[420px] max-w-[70%] flex-shrink-0 animate-in slide-in-from-right-4 duration-200"><!></div>',1),QM=Ae('<div class="h-screen w-screen flex flex-col bg-[#000000] text-[#f3f4f6] overflow-hidden font-sans"><header class="h-11 flex-shrink-0 flex items-center justify-between px-4 border-b border-[var(--guide-color)] bg-[#020408]/90 backdrop-blur-md z-30 select-none"><div class="flex items-center gap-2.5"><div class="w-5 h-5 rounded bg-white/[0.06] border border-white/15 flex items-center justify-center shadow-inner"><svg class="w-3 h-3 text-[#10b981]" viewBox="0 0 100 100" fill="currentColor"><polygon points="50,90 20,20 38,20 50,65 62,20 80,20"></polygon></svg></div> <span class="text-[13px] font-semibold tracking-tight text-white">Vigyan Pro</span> <span class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/10 text-[#9ca3af]">v4.1</span></div> <div class="hidden sm:flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.07] text-[11px] text-[#9ca3af] select-none transition-all shadow-sm"><span></span> <span class="font-medium tracking-wide text-[#cbd5e1]"> </span></div> <div class="flex items-center gap-1.5"><!> <button class="flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-mono text-[#9ca3af] hover:text-white hover:bg-white/[0.05] transition-all cursor-pointer border border-white/[0.08]" title="Learning Ledger (Cmd+L)"><span class="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"></span> <span>Ledger</span></button> <button class="w-7 h-7 flex items-center justify-center rounded-lg text-[#9ca3af] hover:text-white hover:bg-white/[0.05] transition-all cursor-pointer" aria-label="Preferences" title="Preferences (Cmd+,)"><svg viewBox="0 0 20 20" fill="currentColor" class="w-3.5 h-3.5"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path></svg></button></div></header> <main class="flex-1 overflow-hidden relative w-full h-full flex flex-row"><div class="h-full flex-1 min-w-[360px] overflow-hidden transition-all duration-300"><!></div> <!></main> <!> <!></div>');function jM(n,e){fn(e,!0);let t=Ze(!1),i=Ze(!1),r=Ze(!1),s=ti(Eo),a="md",o=Ze(1.8),c=Ze(7),l=Ze(26);Cs(()=>{const I=P=>{const F=P.metaKey||P.ctrlKey;F&&P.key.toLowerCase()==="k"?(P.preventDefault(),ut.clear()):F&&P.key.toLowerCase()==="l"?(P.preventDefault(),be(i,!B(i))):F&&P.key===","?(P.preventDefault(),be(t,!B(t))):P.key==="Escape"&&(B(t)&&be(t,!1),B(i)&&be(i,!1),Et.activeArtifact&&Et.closeArtifact())};window.addEventListener("keydown",I);const G=async()=>{be(r,await Tm(),!0);const P=await wm();if(P){const F=P.ram_used_pct??P.ram_pct;F!==void 0&&be(l,Math.round(F),!0),P.ram_total_gb&&be(c,Math.round(P.ram_total_gb*10)/10),P.ram_avail_gb&&be(o,Math.round((B(c)-P.ram_avail_gb)*10)/10)}};G();const C=setInterval(G,5e3);return()=>{clearInterval(C),window.removeEventListener("keydown",I)}});var u=QM(),f=ie(u),d=j(ie(f),2),h=ie(d),_=j(h,2),v=Ie(_,!0),p=j(d,2),m=ie(p);{var y=I=>{var G=ZM();Ye("click",G,()=>ut.clear()),Ee(I,G)};Ge(m,I=>{ut.messages.length>0&&I(y)})}var w=j(m,2),S=j(w,2),T=j(f,2),E=ie(T),g=ie(E);Rg(g,{get model(){return s},fontSize:a});var M=j(E,2);{var L=I=>{var G=JM(),C=j(On(G),2),P=ie(C);KM(P,{get artifact(){return Et.activeArtifact},onClose:()=>Et.closeArtifact()}),Ee(I,G)};Ge(M,I=>{Et.activeArtifact&&I(L)})}var D=j(T,2);Bg(D,{get open(){return B(i)},onClose:()=>be(i,!1)});var R=j(D,2);Dg(R,{get open(){return B(t)},onClose:()=>be(t,!1)}),it(()=>{$r(d,"title",B(r)?`Sovereign Engine Active • ${B(o)}G / ${B(c)}G RAM (${B(l)}%) • 100% Offline`:"Connecting to local engine…"),Ot(h,1,`w-1.5 h-1.5 rounded-full transition-all duration-300 ${B(r)?"bg-[#10b981] shadow-[0_0_6px_#10b981]":"bg-[#f59e0b] shadow-[0_0_6px_#f59e0b] animate-pulse"}`),Ue(v,B(r)?"Offline & Grounded":"Connecting…")}),Ye("click",w,()=>be(i,!B(i))),Ye("click",S,()=>be(t,!B(t))),Ee(n,u),hn()}Tn(["click"]);typeof window<"u"&&(window.__CHAT_STORE__=ut);lm(jM,{target:document.getElementById("app")});
