(function(h){var a={getBaseDomain:function(i){var j=i.split(".");var k=j.length;if(k<=2){return i}if(j[k-1].length<=2&&j[k-2].length<=3){return j[k-3]+"."+j[k-2]+"."+j[k-1]
}else{return j[k-2]+"."+j[k-1]}},setPersistentCookie:function(n,m,l,k){var i=new Date();i.setDate(i.getDate()+365*100);
if(a.isInteger(k)){i.setTime(new Date().getTime()+k)}var j=n+"="+escape(m)+"; expires="+i.toGMTString()+"; path=/";
if(l){j=j+"; domain="+l}document.cookie=j},isInteger:function(i){return typeof i==="number"&&isFinite(i)&&Math.floor(i)===i
},elementIsDescendant:function(l,i){try{var k=l.parentNode;while(k!==null){if(k===i){return true}k=k.parentNode
}}catch(j){return false}return false},elementFindClosest:function(n,j){var m=(this.document||this.ownerDocument).querySelectorAll(j);
var k;var l=n;do{k=m.length;while(--k>=0&&m.item(k)!==l){}}while((k<0)&&(l=l.parentElement));return l
},getCookie:function(l){var j=document.cookie;if(j&&(j.length>0)){var i=j.indexOf(l+"=");if(i!=-1){i=i+l.length+1;
var k=j.indexOf(";",i);if(k==-1){k=j.length}return unescape(j.substring(i,k))}}return""},getGoogleDataLayer:function(){var j=document.querySelectorAll("script[src*=googletagmanager\\.com]");
var l="dataLayer";for(var k=0;k<j.length;k++){var m=/[?&]l=([^&]+)/i.exec(j[k].src);if(m&&m.length>0){l=m[1];
break}}if(window[l]&&Array.isArray(window[l])){return window[l]}return[]},getGoogleDataLayerValue:function(m){var n=BrTrk.BrUtils.getGoogleDataLayer();
var l=n.length;while(l--){var k=n[l];for(var j=0;j<m.length;j++){k=k[m[j]];if(k===h){break}}if(k!==h){return k
}}return h},addGoogleDataLayerEventHandler:function(p,n,l,j){try{new RegExp(l,"i")}catch(m){return}var o=BrTrk.BrUtils.getGoogleDataLayer();
var i=o.length;while(i--){if(n in o[i]&&new RegExp(l,"i").test(o[i][n])){setTimeout(p,j);break}}var k=o.push;
o.push=function(){var q=k.apply(this,arguments);for(var r=0;r<arguments.length;r++){if(n in arguments[r]&&new RegExp(l,"i").test(arguments[r][n])){setTimeout(p,j)
}}return q}},addEventHandler:function(n,l,o){var k=l.split(" ");for(var j=0;j<k.length;j++){var m=k[j];
if(n.addEventListener){n.addEventListener(m,o,true)}else{if(n.attachEvent){n.attachEvent("on"+m,o)}else{n["on"+m]=o
}}}},addDocumentReadyHandler:function(k,i){var j=i||0;if(document.readyState=="interactive"||document.readyState=="complete"||document.readyState=="loaded"){if(i>0){setTimeout(k,j)
}else{k()}return}if(document.addEventListener){document.addEventListener("DOMContentLoaded",k,false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){if(i>0){setTimeout(k,j)
}else{k()}}})}}},extend:function(i,k){for(var j in k){if(k.hasOwnProperty(j)){i[j]=k[j]}}return i},objectKeyToArrayIndex:function(l,o){var j={};
for(var k=0;k<l.length;k++){var n=l[k];var m=n[o];if(m){j[m]=k}}return j},testLocalStorage:function(){localStorage.setItem("_br_test_storage","1");
var i=localStorage.getItem("_br_test_storage")=="1";localStorage.removeItem("_br_test_storage");return i
},parseBRCookie:function(q){var r={};var l=q.split(":");var s=["uid","_uid","hc","ts"];for(var n=0,k=l.length;
n<k;n++){for(var m=0,p=s.length;m<p;m++){if(l[n].substring(0,s[m].length)==s[m]){var o=l[n].split("=");
if(o[0]&&o[1]){r[o[0]]=o[1]}}}}return r}};var b={jsonParsing:typeof JSON==="object"&&!!JSON.parse&&!!JSON.stringify,querySelector:typeof document.querySelector==="function"&&typeof document.querySelectorAll==="function"};
try{b.localStorage=typeof localStorage==="object"&&!!localStorage.removeItem&&a.testLocalStorage()}catch(d){b.localStorage=false
}a.support=b;var f={init:function(){this.browser=this.searchString(this.dataBrowser)||"An unknown browser";
this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";
this.OS=this.searchString(this.dataOS)||"an unknown OS";urlLength=60000;subUrlLength=30000;if(this.browser=="Explorer"){if(this.version<=6){urlLength=1900;
subUrlLength=800}else{if(this.version<=8){urlLength=4000;subUrlLength=1800}}}this.urlLength=urlLength;
this.subUrlLength=subUrlLength},searchString:function(m){for(var j=0;j<m.length;j++){var k=m[j].string;
var l=m[j].prop;this.versionSearchString=m[j].versionSearch||m[j].identity;if(k){if(k.indexOf(m[j].subString)!=-1){return m[j].identity
}}else{if(l){return m[j].identity}}}},searchVersion:function(j){var i=j.indexOf(this.versionSearchString);
if(i==-1){return}return parseFloat(j.substring(i+this.versionSearchString.length+1))},dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.userAgent,subString:"iPhone",identity:"iPhone/iPod"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};
f.init();a.browserDetect=f;function g(ak){BrTrk.options.pageViewLookup=a.objectKeyToArrayIndex(BrTrk.options.pageViewEvents,"event_name");
BrTrk.options.userInteractionLookup=a.objectKeyToArrayIndex(BrTrk.options.userInteractionEvents,"event_name");
var z="http://p-eu.brsrvr.com/pix.gif";var J="https://p-eu.brsrvr.com/pix.gif";var E="_br_uid_2";var T=E+"_d";
var i;var aa=2*60*1000;var Z=48*60*60*1000*-1;var X=3700;var q=false;var D;var r;var t="br-trk.deferredPixel",B="br-trk.deferredData";
function ah(ao){var am={};for(var an in ao){if(ao.hasOwnProperty(an)&&(ao[an]!==h)&&(typeof ao[an]!=="function")){am[an]=ao[an]
}}return am}var ak=ah(ak);function ae(){return ah(ak)}function k(am){ak=ah(am)}function al(ao,an,am){if(am==="undefined"||typeof am==="undefined"||am===h){return
}ao[an]=am}function u(an,am){ak=ae();al(ak,an,am)}function N(am){q=false;ak=ah(am);ak.ajax=1}function V(){if(typeof br_related_rid!=="undefined"&&br_related_rid){D=br_related_rid
}}function W(){var ax=a.getCookie(E);var aw=ax&&ax.length>0;var ap;var ay={};if(!aw){var aq=Math.round(Math.random()*10000000000000);
ap="uid="+aq}else{var am=ax.split(":");ap=am[0];if(ap.indexOf("uid=")==-1){var aq=Math.round(Math.random()*10000000000000);
ap="uid="+aq}for(var an=1,ar=am.length;an<ar;an++){if(am[an].substring(0,"_uid".length)=="_uid"){}else{var at=am[an].split("=");
if(at[0]&&at[1]){ay[at[0]]=at[1]}}}}ay.v=ay.v||BrTrk.scriptVersion;ay.ts=ay.ts||(new Date()).getTime();
ay.hc=Number(ay.hc||0)+1;var ao=[ap];for(var av in ay){ao.push(av+"="+ay[av])}ax=ao.join(":");if(ax!=i&&ax.length<1000){var au=a.getBaseDomain(document.domain);
a.setPersistentCookie(E,ax,au);i=a.getCookie(E)}}function s(){var ao=document.getElementsByTagName("link");
for(var an=0,am=ao.length;an<am;an++){if(ao[an].getAttribute("rel")=="canonical"){return ao[an].getAttribute("href")
}}return""}function U(an){var am=a.browserDetect.subUrlLength;if(!an){return""}return an.length>am?an.substring(0,am)+"~~":an
}function I(am){if(am&&am!==""){return am}return document.referrer||""}function C(am,an){return am+"="+encodeURIComponent(an)
}function H(ao,am){var an="";if(ao[am]){an=ao[am];delete ao[am]}return an}function x(an,ar){var aq="|",ap=[],am;
if(ar){while(ar&&(ar!==an.parentNode)){var ao=ar.tagName;if(ar.id){ao+="#"+ar.id}else{if(ar.className){ao+="."+ar.className
}}if(!am&&ar.tagName==="A"){am=ar.href}ap.splice(0,0,ao);ar=ar.parentNode}}return{path:ap.join(aq),href:am||""}
}function o(ar){var at="!";var am="'";var ap={prod_id:"i",sku:"s",name:"n",quantity:"q",price:"p",mod:"m",prod_ver:"r"};
var ax=[];for(var au=0;au<ar.length;au++){var ao=[];for(var av in ar[au]){if(av in ap){var aq=ar[au][av];
if(typeof(aq)=="string"){aq=aq.replace("!","%21");aq=aq.replace("'","%27")}ao.push([ap[av],aq].join(""))
}}var an=ao.join(am);ax.push(an)}var aw=at+ax.join(at);return aw}function v(ao){var am=new Image();var an=("https:"===document.location.protocol)?J:z;
am.src=an+"?"+ao}function y(ay){var ar=[];ar.push(C("acct_id",H(ay,"acct_id")));ar.push(C("cookie2",i));
ar.push(C("sid",D));var am=H(ay,"is_conversion");var ao=H(ay,"order_id");var av=H(ay,"basket");var au=H(ay,"basket_value");
if(am&&am!=""&&am=="1"){ar.push(C("is_conversion",am));var at=[];var ax="";if(av&&av.items&&av.items.length>0){at=av.items
}ax=o(at);ar.push(C("basket",ax));if(ao){ar.push(C("order_id",ao))}if(au){ar.push(C("basket_value",au))
}}var aq=H(ay,"explicit_referrer");ar.push(C("ref",U(I(aq))));ar.push(C("tzo",new Date().getTimezoneOffset()));
ar.push(C("rand",Math.random()));for(var aw in ay){ar.push(C(aw,ay[aw]))}var an=U(location.href);ar.push(C("url",an));
var ap=U(s());if(ap){ar.push(C("rc",1));if(ap!=an){ar.push(C("can_url",ap))}}ar.push(C("version",BrTrk.scriptVersion));
return K(ar.join("&"))}function K(am){if(am.length>a.browserDetect.urlLength){return am.substr(0,a.browserDetect.urlLength)+"&tr=1"
}return am}function P(an){var aq="";var am=ah(an);var ap=["path"];while(document.cookie.length>X&&ap.length>0){delete am[ap.shift()]
}if(b.jsonParsing){try{aq=JSON.stringify(am)}catch(ao){}}if(aq){a.setPersistentCookie(T,aq,a.getBaseDomain(document.domain),aa)
}}function ab(){var an={};if(b.jsonParsing){try{an=JSON.parse(unescape(a.getCookie(T)))}catch(am){}}return an
}function R(){a.setPersistentCookie(T,"expirenow",a.getBaseDomain(document.domain),Z)}function ag(aq,ap,an){var ar=false;
ap=ap||"";an=an||false;var am=ab();for(var ao in am){if(an||typeof aq[ap+ao]==="undefined"){ar=true;aq[ap+ao]=am[ao]
}}return ar}function M(aw,av){try{var au=window.BrTrkConfig;if(au&&typeof au.pixelLogCallback==="function"){au.pixelLogCallback(a,aw)
}}catch(aq){}aw.lang=navigator.language||navigator.browserLanguage;var ap=BrTrk.options.extraCookies||[];
for(var ar=0;ar<ap.length;ar++){var ao=ap[ar];var an=a.getCookie(ao.name);if(an||an===false||an===0){var at="_ec_"+ao.name;
if(an.length<=ao.maxLength){aw[at]=an}else{aw[at]=an.substring(0,ao.maxLength)}}}var am=y(aw);if(av){if(b.localStorage){localStorage[t]=am
}}else{v(am)}}function m(an){w();var ar={};if(document.title){ar.title=document.title.substr(0,200)}var ap=ah(ak);
for(var au in ap){ar[au]=ap[au]}an=an||"pageview";ar.type=an;if(typeof document.br_custom_data!=="undefined"){var av=document.br_custom_data;
for(var au in av){for(var aq in av[au]){ar[au+"_"+aq]=av[au][aq]}}}try{if(/cookie/i.test(ak.defer_mode)){ag(ar,"df_");
R()}else{if(b.localStorage&&b.jsonParsing&&localStorage[B]){var am=JSON.parse(localStorage[B]);if(am){for(var au in am){if(am.hasOwnProperty(au)){var at="df_"+au;
if(typeof ar[at]==="undefined"){ar[at]=am[au]}}}}localStorage.removeItem(B)}}}catch(ao){}M(ar)}function O(an,ao){var am=ah(ak);
am.type="linkclick";if(an){am.link=an}if(ao){am.path=ao}am.time=(new Date()).getTime()-r;M(am)}function S(at,ap,am,aq,av){var au=ah(ak);
au.group=at;au.type="event";au.etype=ap;a.extend(au,am);a.extend(au,aq);try{if(av){if(/cookie/i.test(au.defer_mode)){var an={group:at,type:"event",etype:ap};
a.extend(an,am);a.extend(an,aq);P(an)}else{if(b.localStorage&&b.jsonParsing){if(/suggest/i.test(au.group)&&/submit/i.test(au.etype)){var ar=localStorage[B]?JSON.parse(localStorage[B]):{};
if(/suggest/i.test(ar.group)&&/click/i.test(ar.etype)){return}}localStorage[B]=JSON.stringify(au)}}}}catch(ao){}M(au,av)
}function w(){if(/cookie/i.test(ak.defer_mode)){var an=ah(ak);var ao=ag(an,"",true);if(ao){v(y(an))}}else{if(b.localStorage){var am=localStorage[t];
if(am){localStorage.removeItem(t);v(am)}}}}function G(am){var an=ae();al(am,"user_id",an.user_id);al(am,"domain_key",an.domain_key);
al(am,"view_id",an.view_id);al(am,"tms",an.tms)}function Y(aq,ap,ao){var an=ao||{};if(!(ap in BrTrk.options.userInteractionLookup)){return
}var at=BrTrk.options.userInteractionLookup[ap];if(at!==h&&BrTrk.options.userInteractionEvents.length>=at){var ar=af(aq,BrTrk.options.userInteractionEvents[at]);
var am={};a.extend(am,an);G(am);switch(ap){case"add_to_cart":al(am,"prod_id",ar.prod_id);al(am,"sku",ar.sku);
al(am,"prod_ver",ar.prod_ver);S("cart","click-add",am);break;case"search_submit":al(am,"q",ar.q);S("suggest","submit",am,{},true);
break;case"auto_suggest":al(am,"q",ar.q);al(am,"aq",ar.aq);S("suggest","click",am,{},true);break;case"quick_view":al(am,"prod_id",ar.prod_id);
al(am,"sku",ar.sku);al(am,"prod_name",ar.prod_name);S("product","quickview",am);break;case"widget":am={};
S("widget","click",am,{},true);break}}}function j(){var an=ac(BrTrk.options.pageViewDefinitions);var ao=BrTrk.options.pageViewLookup[an];
var am=BrTrk.options.pageViewLookup.global;if(ao!==h&&am!==h){if(BrTrk.options.pageViewEvents.length>=ao&&BrTrk.options.pageViewEvents.length>=am){if(an==="conversion"){u("is_conversion",1);
u("ptype","other")}af(null,BrTrk.options.pageViewEvents[ao]);af(null,BrTrk.options.pageViewEvents[am]);
m();return}}if(ao===h&&am!==h){if(BrTrk.options.pageViewEvents.length>=am){af(null,BrTrk.options.pageViewEvents[am]);
m();return}}if(an===h){u("ptype","other")}m()}function af(ap,am){var au=["basket","basket_value"];if(Array.isArray(am.mapping)){for(var ao=0;
ao<am.mapping.length;ao++){var an=am.mapping[ao].output_var;var av=am.mapping[ao].mapping_rule(ap);if(av===h){continue
}if(typeof av==="object"&&!Array.isArray(av)){var ar=false;for(var at in av){if(!av.hasOwnProperty(at)){continue
}if(au.indexOf(at)<0){ar=false;break}ar=true}if(ar){for(var aq in av){if(!av.hasOwnProperty(aq)){continue
}u(aq,av[aq])}}else{u(an,av)}}else{if(Array.isArray(av)){if(/^basket$/i.test(an)){u(an,{items:av})}else{u(an,av.join(","))
}}else{u(an,av)}}}}return ae()}function ac(ap){var ao=ae();for(var am=0;am<ap.length;am++){var an=ap[am]();
if(an!==h&&an!==null&&an.length>0){u("ptype",an);return an}}if(ap.length===0){if(/(homepage|product|category|search|thematic|content|other|mlt|personalized|conversion)/i.test(ao.ptype)){return ao.ptype
}}u("ptype","other");return"other"}function n(ao){var an={RAW:[],TRIGGER_ON_SUBMIT:{selector:"",delay:0},TRIGGER_ON_ENTER:{selector:"",delay:0},TRIGGER_ON_CLICK:{selector:"",delay:0},TRIGGER_ON_DOCUMENT_READY:{delay:0},TRIGGER_ON_GOOGLE_DATALAYER_UPDATE:{on_value_regex:"",on_key:"",delay:0}};
if(Array.isArray(ao.on_event_args)){an.RAW=ao.on_event_args;if(ao.on_event_args.length>0&&ao.on_event_args[0]!==null){an.TRIGGER_ON_GOOGLE_DATALAYER_UPDATE.on_key=ao.on_event_args[0];
an.TRIGGER_ON_ENTER.selector=ao.on_event_args[0];an.TRIGGER_ON_CLICK.selector=ao.on_event_args[0];an.TRIGGER_ON_SUBMIT.selector=ao.on_event_args[0]
}if(ao.on_event_args.length>1&&ao.on_event_args[1]!==null){an.TRIGGER_ON_GOOGLE_DATALAYER_UPDATE.on_value_regex=ao.on_event_args[1];
var am=parseInt(ao.on_event_args[1]);if(BrTrk.BrUtils.isInteger(am)){an.TRIGGER_ON_DOCUMENT_READY.delay=am;
an.TRIGGER_ON_ENTER.delay=am;an.TRIGGER_ON_CLICK.delay=am;an.TRIGGER_ON_SUBMIT.delay=am}}if(ao.on_event_args.length>2&&ao.on_event_args[2]!==null){var ap=parseInt(ao.on_event_args[2]);
if(BrTrk.BrUtils.isInteger(ap)){an.TRIGGER_ON_GOOGLE_DATALAYER_UPDATE.delay=ap}}}return an}function A(aq){if(!Array.isArray(aq)){return
}for(var ap=0;ap<aq.length;ap++){var ar=aq[ap];if(ar.event_name!=="global"){continue}if(!Array.isArray(ar.triggers)){continue
}for(var am=0;am<ar.triggers.length;am++){var ao=ar.triggers[am];var an=n(ao);switch(ao.on_event){case"TRIGGER_ON_DOCUMENT_READY":if(!BrTrk.options.pageViewHandlers[ao.on_event]){a.addDocumentReadyHandler(j,an.TRIGGER_ON_DOCUMENT_READY.delay);
BrTrk.options.pageViewHandlers[ao.on_event]=true}break;case"TRIGGER_ON_GOOGLE_DATALAYER_UPDATE":a.addGoogleDataLayerEventHandler(j,an.TRIGGER_ON_GOOGLE_DATALAYER_UPDATE.on_key,an.TRIGGER_ON_GOOGLE_DATALAYER_UPDATE.on_value_regex,an.TRIGGER_ON_GOOGLE_DATALAYER_UPDATE.delay);
break}}}}function F(aq){var at;if(!Array.isArray(aq)){return}for(var ap=0;ap<aq.length;ap++){var ar=aq[ap];
if(!Array.isArray(ar.triggers)){continue}for(var am=0;am<ar.triggers.length;am++){var ao=ar.triggers[am];
var an=n(ao);switch(ao.on_event){case"TRIGGER_ON_GOOGLE_DATALAYER_UPDATE":(function(au,av){a.addGoogleDataLayerEventHandler(function(){Y(null,av,{})
},au.TRIGGER_ON_GOOGLE_DATALAYER_UPDATE.on_key,au.TRIGGER_ON_GOOGLE_DATALAYER_UPDATE.on_value_regex,au.TRIGGER_ON_GOOGLE_DATALAYER_UPDATE.delay)
}(an,ar.event_name));break;case"TRIGGER_ON_SUBMIT":(function(av,au,aw){a.addEventHandler(document.body,"submit",function(aE){var az=aE||window.event;
var aD=az.target||az.srcElement;var ay=Array.prototype.slice.call(document.querySelectorAll(au),0);var aA=false;
var ax=h;for(var aC=0;aC<ay.length;aC++){if(BrTrk.BrUtils.elementIsDescendant(aD,ay[aC])||aD===ay[aC]){aA=true;
ax=ay[aC];break}}if(!aA){return false}var aB=x(ax,aD);(function(aI,aG,aH,aF){setTimeout(function(){Y(aI,aG,{path:aH})
},aF)}(ax,av,aB.path,aw))})}(ar.event_name,an.TRIGGER_ON_SUBMIT.selector,an.TRIGGER_ON_SUBMIT.delay));
break;case"TRIGGER_ON_ENTER":(function(av,au,aw){a.addEventHandler(document.body,"keydown",function(aE){aE.which=aE.which||aE.keyCode;
if(aE.which!==13){return false}var az=aE||window.event;var aD=az.target||az.srcElement;var ay=Array.prototype.slice.call(document.querySelectorAll(au),0);
var aA=false;var ax=h;for(var aC=0;aC<ay.length;aC++){if(BrTrk.BrUtils.elementIsDescendant(aD,ay[aC])||aD===ay[aC]){aA=true;
ax=ay[aC];break}}if(!aA){return false}var aB=x(ax,aD);(function(aI,aG,aH,aF){setTimeout(function(){Y(aI,aG,{path:aH})
},aF)}(ax,av,aB.path,aw))})}(ar.event_name,an.TRIGGER_ON_ENTER.selector,an.TRIGGER_ON_ENTER.delay));break;
case"TRIGGER_ON_CLICK":(function(av,au,aw){a.addEventHandler(document.body,"click",function(aE){var az=aE||window.event;
var aD=az.target||az.srcElement;var ay=Array.prototype.slice.call(document.querySelectorAll(au),0);var aA=false;
var ax=h;for(var aC=0;aC<ay.length;aC++){if(BrTrk.BrUtils.elementIsDescendant(aD,ay[aC])||aD===ay[aC]){aA=true;
ax=ay[aC];break}}if(!aA){return false}var aB=x(ax,aD);(function(aI,aG,aH,aF){setTimeout(function(){Y(aI,aG,{path:aH})
},aF)}(ax,av,aB.path,aw))})}(ar.event_name,an.TRIGGER_ON_CLICK.selector,an.TRIGGER_ON_CLICK.delay));break
}}}}function ad(){a.addDocumentReadyHandler(function(){A(BrTrk.options.pageViewEvents);F(BrTrk.options.userInteractionEvents)
})}function l(){if(!BrTrk.options.timeTracking){return}var am=[5000,25000,75000,150000];var ao=function(ap){var aq=ah(ak);
aq.type="sitetime";aq.time=am[ap];M(aq)};var an;for(an=0;an<am.length;++an){(function(ap){setTimeout(function(){ao(ap)
},am[ap])})(an)}}function p(an){var am;for(am=0;am<an.length;am++){Q(an[am])}}function Q(am,ao,aq){var ap=document.getElementById(am);
if(!ap){return false}var an=function(av){if(typeof aq==="function"){aq(ak)}var ar=av||window.event;var au=ar.target||ar.srcElement;
if(!au){return false}var at=x(ap,au);O(at.href,at.path)};a.addEventHandler(ap,"mousedown",an);return true
}function L(){a.addDocumentReadyHandler(function(){p(BrTrk.options.linkTrackingIds)})}function aj(){if(q){return
}ad();L();l();q=true}function ai(){r=(new Date()).getTime();W();V()}this.logPageView=m;this.logLinkClick=O;
this.logEvent=S;this.addClickTracker=Q;this.enableEventTracking=ad;this.enableLinkTracking=L;this.enableTracking=aj;
this.enableTimeTracking=l;this.getBrData=ae;this.updateBrData=N;this.getCookie=a.getCookie;ai()}var c;
window.BrTrk={scriptVersion:"13.0",acctId:5374,defer_mode:null,options:{extraCookies:[{name:"sengine",maxLength:2048}],linkTrackingIds:[],timeTracking:false,pageViewDefinitions:[],pageViewEvents:[{event_name:"global",triggers:[{on_event:"TRIGGER_ON_DOCUMENT_READY",on_event_args:["","0"]}]},{event_name:"search",triggers:[],mapping:[{output_var:"search_term",mapping_rule:function(k){var j={};
j.v=true;j.r=h;try{j.r=window.window.utag_data["searchTerm"]}catch(i){}if(j.r!==h){return j.r}return h
}}]}],pageViewLookup:{},pageViewHandlers:{},userInteractionEvents:[{event_name:"auto_suggest",triggers:[{on_event:"TRIGGER_ON_CLICK",on_event_args:["#search-predictive-search li a","0"]}],mapping:[{output_var:"q",mapping_rule:function(j){var i={};
i.v=true;i.r=function(l){try{return l.innerText}catch(k){return h}}(j);if(i.r!==h){return i.r}return h
}},{output_var:"aq",mapping_rule:function(j){var i={};i.v=true;i.r=function(){try{return document.querySelector("#search").value
}catch(k){return h}}();if(i.r!==h){return i.r}return h}}]},{event_name:"search_submit",triggers:[{on_event:"TRIGGER_ON_SUBMIT",on_event_args:["#searchbar_form","0"]}],mapping:[{output_var:"q",mapping_rule:function(j){var i={};
i.v=true;i.r=function(){try{return document.querySelector("#search").value}catch(k){return h}}();if(i.r!==h){return i.r
}return h}}]}],userInteractionLookup:{},userInteractionHandlers:{},brDataObject:"br_data",watchesFormInputPreviousValue:[]},getTracker:function(i,j){if(!c){c=new g(j)
}return c},BrUtils:a,simulate:false};if(typeof testBrTrk!=="undefined"){window.BrUtils=a;window.BrTrkClass=g
}var e=function e(l){try{var i=window[window.BrTrk.options.brDataObject]?window[window.BrTrk.options.brDataObject]:{};
i.acct_id=BrTrk.acctId;if(BrTrk.defer_mode){i.defer_mode=BrTrk.defer_mode}var k=BrTrk.getTracker(0,i);
k.enableTracking()}catch(j){}};if(document.readyState==="complete"||(document.readyState!=="loading"&&!document.documentElement.doScroll)){e()
}else{BrTrk.BrUtils.addEventHandler(window,"load",e)}if(!Array.isArray){Array.isArray=function(i){return Object.prototype.toString.call(i)==="[object Array]"
}}if(!document.querySelectorAll){document.querySelectorAll=function(j){var k=document.createElement("style"),l=[],i;
document.documentElement.firstChild.appendChild(k);document._qsa=[];k.styleSheet.cssText=j+"{x-qsa:expression(document._qsa && document._qsa.push(this))}";
window.scrollBy(0,0);k.parentNode.removeChild(k);while(document._qsa.length){i=document._qsa.shift();
i.style.removeAttribute("x-qsa");l.push(i)}document._qsa=null;return l}}if(!document.querySelector){document.querySelector=function(i){var j=document.querySelectorAll(i);
return(j.length)?j[0]:null}}}());