(function(e){function t(t){for(var a,r,c=t[0],u=t[1],l=t[2],s=0,f=[];s<c.length;s++)r=c[s],Object.prototype.hasOwnProperty.call(o,r)&&o[r]&&f.push(o[r][0]),o[r]=0;for(a in u)Object.prototype.hasOwnProperty.call(u,a)&&(e[a]=u[a]);m&&m(t);while(f.length)f.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],a=!0,r=1;r<n.length;r++){var c=n[r];0!==o[c]&&(a=!1)}a&&(i.splice(t--,1),e=u(u.s=n[0]))}return e}var a={},r={app:0},o={app:0},i=[];function c(e){return u.p+"js/"+({}[e]||e)+"."+{"chunk-0926b993":"97aa5454","chunk-0f6ad6fc":"69a46685","chunk-2d0c1da7":"a04b2a17","chunk-2d21a3d2":"9fdb9bc1","chunk-4c6ff497":"c261d1f5","chunk-f2ba33fc":"8b20457c","chunk-2ed4fa7e":"40b3c65f","chunk-79c62b60":"6ea598aa","chunk-df112b0e":"01e34f3e"}[e]+".js"}function u(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={"chunk-0926b993":1,"chunk-0f6ad6fc":1,"chunk-4c6ff497":1,"chunk-f2ba33fc":1,"chunk-2ed4fa7e":1,"chunk-79c62b60":1,"chunk-df112b0e":1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise((function(t,n){for(var a="css/"+({}[e]||e)+"."+{"chunk-0926b993":"01b9a9cc","chunk-0f6ad6fc":"dde4f501","chunk-2d0c1da7":"31d6cfe0","chunk-2d21a3d2":"31d6cfe0","chunk-4c6ff497":"321b9deb","chunk-f2ba33fc":"e2c53f44","chunk-2ed4fa7e":"8ad0bb85","chunk-79c62b60":"15290f63","chunk-df112b0e":"15290f63"}[e]+".css",o=u.p+a,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var l=i[c],s=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(s===a||s===o))return t()}var f=document.getElementsByTagName("style");for(c=0;c<f.length;c++){l=f[c],s=l.getAttribute("data-href");if(s===a||s===o)return t()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=t,m.onerror=function(t){var a=t&&t.target&&t.target.src||o,i=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=a,delete r[e],m.parentNode.removeChild(m),n(i)},m.href=o;var d=document.getElementsByTagName("head")[0];d.appendChild(m)})).then((function(){r[e]=0})));var a=o[e];if(0!==a)if(a)t.push(a[2]);else{var i=new Promise((function(t,n){a=o[e]=[t,n]}));t.push(a[2]=i);var l,s=document.createElement("script");s.charset="utf-8",s.timeout=120,u.nc&&s.setAttribute("nonce",u.nc),s.src=c(e);var f=new Error;l=function(t){s.onerror=s.onload=null,clearTimeout(m);var n=o[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;f.message="Loading chunk "+e+" failed.\n("+a+": "+r+")",f.name="ChunkLoadError",f.type=a,f.request=r,n[1](f)}o[e]=void 0}};var m=setTimeout((function(){l({type:"timeout",target:s})}),12e4);s.onerror=s.onload=l,document.head.appendChild(s)}return Promise.all(t)},u.m=e,u.c=a,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)u.d(n,a,function(t){return e[t]}.bind(null,a));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/",u.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],s=l.push.bind(l);l.push=t,l=l.slice();for(var f=0;f<l.length;f++)t(l[f]);var m=s;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);var a=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return"main"===e.$route.meta.layout?n("v-app",[n("Main",[n("router-view")],1)],1):"auth"===e.$route.meta.layout?n("v-app",[n("Auth",[n("router-view")],1)],1):e._e()},o=[],i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("navbar"),n("v-main",[n("router-view")],1)],1)},c=[],u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-app-bar",{attrs:{app:"",color:"primary",dark:""}},[n("v-app-bar-nav-icon",{on:{click:function(t){e.toggle=!e.toggle}}}),n("v-toolbar-title",{staticClass:"font-weight-light d-flex"},[n("v-icon",{staticClass:"mx-2"},[e._v("mdi-glass-mug-variant")]),e._v(" BR-cloud ")],1)],1),n("v-navigation-drawer",{attrs:{absolute:"",temporary:""},model:{value:e.toggle,callback:function(t){e.toggle=t},expression:"toggle"}},[n("v-list-item",[n("v-btn",{staticClass:"mx-2",attrs:{icon:"","x-large":""},on:{click:function(t){return t.stopPropagation(),e.$router.push("/user")}}},[n("v-avatar",{attrs:{color:"primary",size:"48"}},[n("span",{staticClass:"white--text text-h5",domProps:{textContent:e._s(e.user.initials)}})])],1),n("v-list-item-content",[n("v-list-item-title",{staticClass:"text-h6",domProps:{textContent:e._s(e.user.name)}}),n("v-list-item-subtitle",{domProps:{textContent:e._s(e.user.role)}})],1),n("v-list-item-action",[n("v-icon",{attrs:{color:"red"},on:{click:function(t){return e.$router.push("/login")}}},[e._v(" mdi-exit-to-app ")])],1)],1),n("v-list",{attrs:{nav:"",dense:""}},[n("v-list-item-group",{attrs:{"active-class":"primary--text text--accent-4"}},e._l(e.listItems,(function(t,a){return n("v-list-item",{key:a,on:{click:function(n){return e.$router.push(t.path)}}},[n("v-list-item-icon",[n("v-icon",[e._v(e._s(t.icon))])],1),n("v-list-item-title",[e._v(e._s(t.name))])],1)})),1)],1)],1)],1)},l=[],s={data:()=>({toggle:!1,user:{initials:"ДВ",name:"Дмитрий",lastName:"Владышников",email:"dimavladu1@mail.ru",role:"Пользователь"},listItems:[{name:"Мой диск",icon:"mdi-home",path:"/"},{name:"Доступные мне",icon:"mdi-account-group",path:"/available"},{name:"О нас",icon:"mdi-information",path:"/about"}]})},f=s,m=n("2877"),d=n("6544"),h=n.n(d),p=n("40dc"),v=n("5bc1"),b=n("8212"),g=n("8336"),k=n("132d"),y=n("8860"),_=n("da13"),w=n("1800"),x=n("5d23"),P=n("1baa"),V=n("34c3"),C=n("f774"),O=n("2a7f"),j=Object(m["a"])(f,u,l,!1,null,"74e41619",null),A=j.exports;h()(j,{VAppBar:p["a"],VAppBarNavIcon:v["a"],VAvatar:b["a"],VBtn:g["a"],VIcon:k["a"],VList:y["a"],VListItem:_["a"],VListItemAction:w["a"],VListItemContent:x["a"],VListItemGroup:P["a"],VListItemIcon:V["a"],VListItemSubtitle:x["b"],VListItemTitle:x["c"],VNavigationDrawer:C["a"],VToolbarTitle:O["a"]});var L={name:"main",components:{navbar:A}},E=L,I=n("f6c4"),S=Object(m["a"])(E,i,c,!1,null,null,null),T=S.exports;h()(S,{VMain:I["a"]});var $=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{},[n("v-main",[n("router-view")],1)],1)},M=[],N={created(){console.log("created")}},B=N,D=Object(m["a"])(B,$,M,!1,null,null,null),q=D.exports;h()(D,{VMain:I["a"]});var H={methods:{test(){console.log(this.$route.meta.layout)}},components:{Main:T,Auth:q}},J=H,R=n("7496"),U=Object(m["a"])(J,r,o,!1,null,null,null),z=U.exports;h()(U,{VApp:R["a"]});var F=n("8c4f");a["a"].use(F["a"]);const G=[{path:"/",name:"Home",meta:{layout:"main"},component:()=>Promise.all([n.e("chunk-0926b993"),n.e("chunk-0f6ad6fc"),n.e("chunk-2d21a3d2")]).then(n.bind(null,"bb51"))},{path:"/about",name:"About",meta:{layout:"main"},component:()=>Promise.all([n.e("chunk-0926b993"),n.e("chunk-4c6ff497")]).then(n.bind(null,"f820"))},{path:"/available",name:"Available",meta:{layout:"main"},component:()=>Promise.all([n.e("chunk-0926b993"),n.e("chunk-0f6ad6fc"),n.e("chunk-2d0c1da7")]).then(n.bind(null,"488e"))},{path:"/user",name:"User",meta:{layout:"main"},component:()=>Promise.all([n.e("chunk-0926b993"),n.e("chunk-f2ba33fc"),n.e("chunk-2ed4fa7e")]).then(n.bind(null,"1511"))},{path:"/login",name:"Login",meta:{layout:"auth"},component:()=>Promise.all([n.e("chunk-0926b993"),n.e("chunk-f2ba33fc"),n.e("chunk-df112b0e")]).then(n.bind(null,"bd01"))},{path:"/register",name:"Register",meta:{layout:"auth"},component:()=>Promise.all([n.e("chunk-0926b993"),n.e("chunk-f2ba33fc"),n.e("chunk-79c62b60")]).then(n.bind(null,"6d75"))}],K=new F["a"]({mode:"history",base:"/",routes:G});var Q=K,W=n("2f62");a["a"].use(W["a"]);var X=new W["a"].Store({state:{},mutations:{},actions:{},modules:{}}),Y=n("f309");a["a"].use(Y["a"]);var Z=new Y["a"]({});n("260b");a["a"].config.productionTip=!1,new a["a"]({router:Q,store:X,vuetify:Z,render:function(e){return e(z)}}).$mount("#app")}});
//# sourceMappingURL=app.a4283cc6.js.map