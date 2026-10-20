(function(){
"use strict";
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function norm(s){return String(s).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()}
function dur(s){return Math.floor(s/60)+":"+String(s%60).padStart(2,"0")}
function num(n){return n.toLocaleString("es-CO")}
var IC={
heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="M12 20.5s-7.5-4.4-9.3-9.1C1.6 8 3.6 4.5 7.1 4.5c2 0 3.6 1.1 4.9 2.9 1.3-1.8 2.9-2.9 4.9-2.9 3.5 0 5.5 3.5 4.4 6.9-1.8 4.7-9.3 9.1-9.3 9.1z"/></svg>',
share:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15V3.5"/><path d="M7.5 8 12 3.5 16.5 8"/><path d="M5 12.5V19a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 19v-6.5"/></svg>',
sound:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4 4 0 0 1 0 6"/><path d="M18 6.5a7.5 7.5 0 0 1 0 11"/></svg>',
mute:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="m16 9.5 5 5M21 9.5l-5 5"/></svg>',
pause:'<svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><rect x="7" y="5.5" width="3.5" height="13" rx="1"/><rect x="13.5" y="5.5" width="3.5" height="13" rx="1"/></svg>',
play:'<svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z"/></svg>',
star:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><path d="m12 3.8 2.5 5.1 5.6.8-4 3.9.9 5.6-5-2.6-5 2.6.9-5.6-4-3.9 5.6-.8z"/></svg>',
eye:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/></svg>',
eyeOff:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 3 18 18"/><path d="M10.6 5.6A9.6 9.6 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-3.1 3.9M6.5 7.4A16.3 16.3 0 0 0 2.5 12S6 18.5 12 18.5a9 9 0 0 0 4-.9"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>',
send:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4 12 16-8-6 16-2.5-6.5z"/></svg>'
};
var CATS=["Tutoriales","Tips","Historias","Detrás de cámaras","Novedades","Preguntas"];
var V=[
{id:"v1",slug:"asi-empezamos",t:"Así empezamos: la historia en 60 segundos",c:"Historias",d:60,views:18420,word:"60 s",desc:"De una idea pequeña a lo que somos hoy.",date:"2026-09-02",st:"pub",pal:["#2A1B4D","#FF7A59","#FFB21E","#7B5CFF"]},
{id:"v2",slug:"3-errores",t:"3 errores que todos cometemos",c:"Tips",d:45,views:25310,word:"3",desc:"Y cómo evitarlos desde hoy.",date:"2026-10-16",st:"pub",feat:true,pal:["#0F2A3A","#36D6C3","#FFD166","#2E86FF"]},
{id:"v3",slug:"detras-de-camaras",t:"Detrás de cámaras: un día en el equipo",c:"Detrás de cámaras",d:52,views:9870,word:"Detrás",desc:"Lo que no se ve de lo que hacemos.",date:"2026-10-10",st:"pub",pal:["#2B1426","#FF4FA3","#FF9F43","#7D3CFF"]},
{id:"v4",slug:"la-pregunta",t:"La pregunta que más nos hacen",c:"Preguntas",d:38,views:14230,word:"?",desc:"La respondemos en menos de un minuto.",date:"2026-10-07",st:"pub",pal:["#1A2B12","#A8E05F","#3BB273","#F4D35E"]},
{id:"v5",slug:"guia-rapida",t:"Guía rápida para empezar",c:"Tutoriales",d:75,views:21040,word:"Paso 1",desc:"Todo lo que necesitas saber, paso a paso.",date:"2026-09-28",st:"pub",pal:["#14213D","#4CC9F0","#4361EE","#FFB21E"]},
{id:"v6",slug:"antes-y-despues",t:"Antes y después",c:"Historias",d:30,views:7650,word:"Antes\nDespués",desc:"El cambio, en 30 segundos.",date:"2026-09-21",st:"pub",pal:["#301A10","#FF8C42","#FFD6A5","#E76F51"]},
{id:"v7",slug:"lo-nuevo",t:"Lo nuevo de este mes",c:"Novedades",d:41,views:3980,word:"Nuevo",desc:"Todo lo que llegó en octubre.",date:"2026-10-18",st:"pub",pal:["#1B1035","#B388FF","#FF6FD8","#FFE66D"]},
{id:"v8",slug:"consejo-para-hoy",t:"Un consejo para hoy",c:"Tips",d:25,views:11560,word:"Hoy",desc:"Corto, útil y para aplicar ya.",date:"2026-10-13",st:"pub",pal:["#0F2E2A","#2EC4B6","#CBF3F0","#FFBF69"]},
{id:"v9",slug:"elegir-la-opcion",t:"Cómo elegir la opción correcta",c:"Tutoriales",d:58,views:5120,word:"A o B",desc:"Una guía para decidir sin dudas.",date:"2026-09-15",st:"hid",pal:["#1A1F3D","#6C8CFF","#B8C0FF","#FFD166"]},
{id:"v10",slug:"cada-cuanto",t:"¿Cada cuánto conviene hacerlo?",c:"Preguntas",d:36,views:0,word:"¿?",desc:"La respuesta corta y la larga.",date:"2026-10-20",st:"prog",pal:["#2C1630","#F25F5C","#FFE066","#70C1B3"]}
];
var PALS=[["#1D1440","#FF9E7A","#FFCF56","#8E6CFF"],["#0E2B33","#4DE1C1","#FFE29A","#3C8DFF"],["#2A1030","#FF6FB5","#FFB86B","#9257FF"]];
var LS="reelteca-demo-favs";
var favs=[];
try{favs=JSON.parse(localStorage.getItem(LS)||"[]")||[]}catch(e){favs=[]}
function isFav(id){return favs.indexOf(id)>-1}
function saveFavs(){try{localStorage.setItem(LS,JSON.stringify(favs))}catch(e){}}
function byId(id){for(var i=0;i<V.length;i++){if(V[i].id===id)return V[i]}return null}
function live(){return V.filter(function(v){return v.st==="pub"})}
function ordered(list){return list.slice().sort(function(a,b){return ((b.feat?1:0)-(a.feat?1:0))||b.date.localeCompare(a.date)})}
function newest(list){return list.slice().sort(function(a,b){return b.date.localeCompare(a.date)})}
function scene(v,still){return '<div class="scene'+(still?' still':'')+'" style="--b:'+v.pal[0]+';--c1:'+v.pal[1]+';--c2:'+v.pal[2]+';--c3:'+v.pal[3]+'"><i class="blob b1"></i><i class="blob b2"></i><i class="blob b3"></i><span class="scene-word">'+esc(v.word)+'</span><i class="grain"></i></div>'}
var MESES=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
var MES_AB=["ene.","feb.","mar.","abr.","may.","jun.","jul.","ago.","sept.","oct.","nov.","dic."];
function dateTxt(v){if(v.st==="prog")return "Mañana, 8:00 a. m.";var p=v.date.split("-");return (+p[2])+" de "+MESES[+p[1]-1]+" de "+p[0]}
var tTimer;
function toast(msg){var t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(tTimer);tTimer=setTimeout(function(){t.classList.remove("show")},3200)}
function setBar(){document.documentElement.style.setProperty("--bar-h",$("#demobar").offsetHeight+"px")}
window.addEventListener("resize",setBar);
var VIEWS={app:$("#v-app"),panel:$("#v-panel"),landing:$("#v-landing"),shared:$("#v-shared")};
var appVisible=false;
function route(){
var h=location.hash.replace(/^#/,"")||"app";
var parts=h.split("/"),name=parts[0];
if(name==="v"){renderShared(parts[1]);name="shared"}
if(!VIEWS[name])name="app";
Object.keys(VIEWS).forEach(function(k){VIEWS[k].classList.toggle("on",k===name)});
$$(".tabs a").forEach(function(a){if(a.dataset.view===name)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")});
appVisible=(name==="app");
if(appVisible){resumeActive();schedulePush()}else{pauseAll()}
if(name==="landing")renderLanding();
if(name==="panel")setPTab(pTab);
window.scrollTo(0,0);
setBar();
}
window.addEventListener("hashchange",route);
var feed=$("#feed"),activeReel=null,userPaused=false,muted=true,appTab="home";
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)activate(e.target)})},{root:feed,threshold:0.6});
function reelHTML(v){
return '<article class="reel" data-id="'+v.id+'" aria-label="'+esc(v.t)+'">'+scene(v,false)+
'<div class="scrim"></div><button class="tap" type="button" data-act="toggle" aria-label="Pausar o reproducir el video"></button>'+
'<span class="pp" aria-hidden="true"></span>'+
'<div class="meta"><div class="meta-top"><span class="chip">'+esc(v.c)+'</span><span class="len">'+dur(v.d)+'</span></div><h3 class="reel-title">'+esc(v.t)+'</h3><p class="reel-desc">'+esc(v.desc)+'</p></div>'+
'<div class="rail">'+
'<button class="rb fav" type="button" data-act="fav" data-id="'+v.id+'" aria-pressed="'+isFav(v.id)+'" aria-label="Guardar en favoritos"><span class="ic">'+IC.heart+'</span><span>Guardar</span></button>'+
'<button class="rb" type="button" data-act="share" data-id="'+v.id+'" aria-label="Compartir video"><span class="ic">'+IC.share+'</span><span>Compartir</span></button>'+
'<button class="rb snd" type="button" data-act="sound" aria-label="Activar o desactivar el sonido"><span class="ic">'+(muted?IC.mute:IC.sound)+'</span><span>Sonido</span></button>'+
'</div><div class="progress"><i style="--d:'+Math.max(8,Math.round(v.d/4))+'s"></i></div></article>';
}
function renderFeed(keepId){
var list=ordered(live());
$$(".reel",feed).forEach(function(r){io.unobserve(r)});
feed.innerHTML=list.length?list.map(reelHTML).join(""):'<p class="empty" style="padding-top:140px">No hay videos publicados. Publique uno desde el panel de administración.</p>';
activeReel=null;
$$(".reel",feed).forEach(function(r){io.observe(r)});
if(keepId){var idx=list.findIndex(function(v){return v.id===keepId});if(idx>-1)feed.scrollTop=idx*feed.clientHeight}
else feed.scrollTop=0;
}
function activate(r){
if(activeReel===r)return;
if(activeReel)activeReel.classList.remove("playing");
activeReel=r;userPaused=false;
var bar=$(".progress i",r);bar.style.animation="none";void bar.offsetWidth;bar.style.animation="";
if(appVisible&&appTab==="home"&&!sheetOpen)r.classList.add("playing");
}
function pauseAll(){$$(".reel.playing").forEach(function(r){if(!r.closest(".hero-phone"))r.classList.remove("playing")})}
function resumeActive(){if(activeReel&&!userPaused&&appTab==="home"&&!sheetOpen)activeReel.classList.add("playing")}
function flash(r,playing){var p=$(".pp",r);p.innerHTML=playing?IC.play:IC.pause;p.classList.add("show");clearTimeout(p._t);p._t=setTimeout(function(){p.classList.remove("show")},650)}
var swiped=false;
feed.addEventListener("scroll",function(){if(!swiped&&feed.scrollTop>40){swiped=true;$("#swipe").classList.add("gone")}},{passive:true});
feed.addEventListener("keydown",function(e){
if(e.key==="ArrowDown"||e.key==="PageDown"){e.preventDefault();feed.scrollBy({top:feed.clientHeight,behavior:"smooth"})}
else if(e.key==="ArrowUp"||e.key==="PageUp"){e.preventDefault();feed.scrollBy({top:-feed.clientHeight,behavior:"smooth"})}
else if(e.key===" "&&activeReel&&e.target===feed){e.preventDefault();var pl=activeReel.classList.toggle("playing");userPaused=!pl;flash(activeReel,pl)}
});
document.addEventListener("keydown",function(e){
if(!appVisible||appTab!=="home"||sheetOpen)return;
if(document.activeElement&&/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName))return;
if(document.activeElement===feed)return;
if(e.key==="ArrowDown"){e.preventDefault();feed.scrollBy({top:feed.clientHeight,behavior:"smooth"})}
if(e.key==="ArrowUp"){e.preventDefault();feed.scrollBy({top:-feed.clientHeight,behavior:"smooth"})}
});
function setAppTab(t){
appTab=t;
$$(".app-pane").forEach(function(p){p.classList.toggle("on",p.dataset.pane===t)});
$$(".tabbar button").forEach(function(b){b.setAttribute("aria-current",String(b.dataset.tab===t))});
if(t==="home")resumeActive();else pauseAll();
if(t==="lib")renderLib();
if(t==="favs")renderFavs();
}
function openInFeed(id){
setAppTab("home");
var list=ordered(live()),idx=list.findIndex(function(v){return v.id===id});
if(idx<0)return;
feed.scrollTo({top:idx*feed.clientHeight,behavior:"auto"});
var r=$$(".reel",feed)[idx];
if(r){activeReel=null;activate(r)}
}
var libCat="Todos";
function tileHTML(v,tag){
tag=tag||"button";
var attrs=tag==="a"?' href="#v/'+v.slug+'"':' type="button" data-act="open" data-id="'+v.id+'"';
return '<'+tag+' class="tile"'+attrs+' aria-label="Ver '+esc(v.t)+'">'+scene(v,true)+'<span class="tile-d">'+dur(v.d)+'</span>'+(v.feat?'<span class="tile-f">Destacado</span>':'')+'<span class="tile-t">'+esc(v.t)+'</span></'+tag+'>';
}
function renderLib(){
var raw=$("#q").value.trim(),q=norm(raw);
$("#cats").innerHTML=["Todos"].concat(CATS).map(function(c){return '<button class="cat" type="button" data-cat="'+esc(c)+'" aria-pressed="'+(c===libCat)+'">'+esc(c)+'</button>'}).join("");
var all=ordered(live());
var list=all.filter(function(v){return (libCat==="Todos"||v.c===libCat)&&(!q||norm(v.t+" "+v.c+" "+v.desc).indexOf(q)>-1)});
var showTop=!q&&libCat==="Todos"&&all.length>3;
$("#lib-top").hidden=!showTop;
if(showTop)$("#row-top").innerHTML=all.slice().sort(function(a,b){return b.views-a.views}).slice(0,4).map(function(v){return tileHTML(v)}).join("");
$("#lib-all-t").textContent=q?"Resultados para «"+raw+"»":(libCat==="Todos"?"Todos los videos":libCat);
$("#grid-all").innerHTML=list.map(function(v){return tileHTML(v)}).join("");
var em=$("#lib-empty");em.hidden=list.length>0;
if(!list.length)em.textContent=q?"No encontramos videos con «"+raw+"». Prueba con otra palabra o explora las categorías.":"Aún no hay videos en esta categoría.";
}
$("#q").addEventListener("input",renderLib);
$("#cats").addEventListener("click",function(e){var b=e.target.closest("[data-cat]");if(!b)return;libCat=b.dataset.cat;renderLib()});
function renderFavs(){
var list=newest(live()).filter(function(v){return isFav(v.id)});
$("#fav-grid").innerHTML=list.map(function(v){return tileHTML(v)}).join("");
$("#fav-empty").hidden=list.length>0;
$("#fav-count").textContent=list.length?(list.length+(list.length===1?" video guardado":" videos guardados")+" en este celular"):"";
}
function toggleFav(id){
var i=favs.indexOf(id),on=i<0;
if(on)favs.push(id);else favs.splice(i,1);
saveFavs();
$$('.fav[data-id="'+id+'"]').forEach(function(b){b.setAttribute("aria-pressed",String(on))});
toast(on?"Guardado en favoritos":"Quitado de favoritos");
if(appTab==="favs")renderFavs();
}
var sheetOpen=false,shareId=null;
function shareUrl(v){return location.href.split("#")[0]+"#v/"+v.slug}
function openShare(id){
var v=byId(id);if(!v)return;shareId=id;sheetOpen=true;
$("#share-title").textContent=v.t;$("#share-link").textContent=shareUrl(v);
$("#sheet").classList.add("open");pauseAll();
setTimeout(function(){$("#sheet .sheet").focus()},50);
}
function closeShare(){sheetOpen=false;$("#sheet").classList.remove("open");resumeActive()}
document.addEventListener("keydown",function(e){if(e.key==="Escape"){if(sheetOpen)closeShare();closeModal()}});
var pushShown=false,pushTimer=null,pending=null;
function schedulePush(){
if(pending){var p=pending;pending=null;setTimeout(function(){showPush(p.v,p.t,p.m)},500);return}
if(pushShown||pushTimer)return;
pushTimer=setTimeout(function(){pushTimer=null;if(!appVisible||pushShown)return;var v=byId("v7");if(!v||v.st!=="pub")v=newest(live())[0];if(v)showPush(v)},9000);
}
function showPush(v,t,m){
pushShown=true;var p=$("#push");
$("#push-t").textContent=t||"Nuevo video publicado";$("#push-m").textContent=m||v.t;p.dataset.id=v.id;
p.classList.add("show");clearTimeout(p._h);p._h=setTimeout(function(){p.classList.remove("show")},7000);
}
$("#push").addEventListener("click",function(){var p=$("#push");p.classList.remove("show");if(p.dataset.id)openInFeed(p.dataset.id)});
$("#screen").addEventListener("click",function(e){
var b=e.target.closest("[data-act]");if(!b)return;
var act=b.dataset.act,id=b.dataset.id;
if(act==="close-sheet"&&b.id==="sheet"&&e.target!==b)return;
switch(act){
case "toggle":var r=b.closest(".reel");if(r!==activeReel){activeReel=null;activate(r)}var pl=r.classList.toggle("playing");userPaused=!pl;flash(r,pl);break;
case "fav":toggleFav(id);break;
case "share":openShare(id);break;
case "sound":muted=!muted;$$(".snd .ic",feed).forEach(function(x){x.innerHTML=muted?IC.mute:IC.sound});toast(muted?"Sonido desactivado":"Sonido activado. En el demo, los videos de ejemplo no tienen audio.");break;
case "open":openInFeed(id);break;
case "tab":setAppTab(b.dataset.tab);break;
case "close-sheet":closeShare();break;
case "sh-wa":toast("En el celular se abre WhatsApp con el enlace del video.");break;
case "sh-copy":var url=shareUrl(byId(shareId));
if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(url).then(function(){toast("Enlace copiado")},function(){toast("Enlace listo para copiar")})}else{toast("Enlace listo para copiar")}
break;
case "sh-more":toast("En el celular se abre el menú para compartir del sistema.");break;
case "sh-view":var v=byId(shareId);closeShare();location.hash="v/"+v.slug;break;
}
});
var pTab="videos";
function setPTab(t){
pTab=t;
$$(".side [data-ptab]").forEach(function(b){b.setAttribute("aria-current",String(b.dataset.ptab===t))});
$$(".ppane").forEach(function(p){p.hidden=p.dataset.ppane!==t});
if(t==="videos")renderTable();if(t==="cats")renderCats();if(t==="stats")renderStats();if(t==="notif")renderNotif();
}
$(".side").addEventListener("click",function(e){var b=e.target.closest("[data-ptab]");if(b)setPTab(b.dataset.ptab)});
var ST={pub:["pub","Publicado"],prog:["prog","Programado"],hid:["hid","Oculto"]};
function fillCatSelect(){
var sel=$("#pc"),cur=sel.value;
sel.innerHTML='<option value="">Todas las categorías</option>'+CATS.map(function(c){return '<option>'+esc(c)+'</option>'}).join("");
sel.value=cur;
}
function renderTable(){
fillCatSelect();
var q=norm($("#pq").value.trim()),c=$("#pc").value,s=$("#ps").value;
var base=V.filter(function(v){return v.st!=="proc"});
var rows=newest(base).filter(function(v){return (!q||norm(v.t).indexOf(q)>-1)&&(!c||v.c===c)&&(!s||v.st===s)});
$("#vt-body").innerHTML=rows.map(function(v){
var visIc=v.st==="hid"?IC.eyeOff:(v.st==="prog"?IC.send:IC.eye);
var visLb=v.st==="hid"?"Publicar":(v.st==="prog"?"Publicar ahora":"Ocultar de la app");
return '<tr><td><div class="vcell"><span class="mini">'+scene(v,true)+'</span><div><b>'+esc(v.t)+'</b><small>'+dur(v.d)+'</small></div></div></td>'+
'<td data-l="Categoría">'+esc(v.c)+'</td>'+
'<td data-l="Estado"><span class="st '+ST[v.st][0]+'">'+ST[v.st][1]+'</span></td>'+
'<td class="num" data-l="Reproducciones">'+(v.st==="pub"||v.views?num(v.views):"—")+'</td>'+
'<td data-l="Publicación">'+dateTxt(v)+'</td>'+
'<td><div class="actions"><button class="icon-btn" type="button" data-pact="feat" data-id="'+v.id+'" aria-pressed="'+!!v.feat+'" aria-label="'+(v.feat?"Quitar de destacados":"Destacar")+'" title="'+(v.feat?"Quitar de destacados":"Destacar")+'">'+IC.star+'</button>'+
'<button class="icon-btn" type="button" data-pact="vis" data-id="'+v.id+'" aria-label="'+visLb+'" title="'+visLb+'">'+visIc+'</button></div></td></tr>';
}).join("");
$("#vt-empty").hidden=rows.length>0;
$("#vt-count").textContent=rows.length+" de "+base.length+" videos";
}
["#pq","#pc","#ps"].forEach(function(s){$(s).addEventListener("input",renderTable)});
function refreshPublic(){var keep=activeReel?activeReel.dataset.id:null;renderFeed(keep);if(appTab==="lib")renderLib();if(appTab==="favs")renderFavs()}
var upN=0;
function cleanName(n){n=n.replace(/\.[^.]+$/,"").replace(/[_-]+/g," ").replace(/\s+/g," ").trim();if(!n)n="Nuevo video";return (n.charAt(0).toUpperCase()+n.slice(1)).slice(0,60)}
function startUpload(name){
upN++;var id="n"+upN;
var v={id:id,slug:"nuevo-video-"+upN,t:name||("Nuevo video de ejemplo "+upN),c:"Novedades",d:28+(upN*11)%40,views:0,word:"Nuevo",desc:"Publicado hace un momento desde el panel.",date:new Date().toISOString().slice(0,10),st:"proc",pal:PALS[(upN-1)%PALS.length]};
V.push(v);
var el=document.createElement("div");el.className="up";el.dataset.id=id;
el.innerHTML='<span class="mini">'+scene(v,true)+'</span><div><b>'+esc(v.t)+'</b><div class="up-s">Subiendo… 0 %</div><div class="bar"><i></i></div></div><div class="up-a"></div>';
$("#uploads").prepend(el);
var p=0,bar=$(".bar i",el),s=$(".up-s",el);
var iv=setInterval(function(){
p+=8+Math.round(Math.random()*14);
if(p>=100){
clearInterval(iv);bar.style.width="100%";s.textContent="Optimizando para celular: formato vertical, compresión y portada…";
setTimeout(function(){
s.textContent="Listo para publicar";var b=$(".bar",el);if(b)b.remove();
$(".up-a",el).innerHTML='<label><input type="checkbox" checked data-notify> Avisar con una notificación</label><button class="btn btn-ghost sm" type="button" data-pact="sched" data-id="'+id+'">Programar</button><button class="btn btn-primary sm" type="button" data-pact="pubnow" data-id="'+id+'">Publicar ahora</button>';
},1500);
}else{bar.style.width=p+"%";s.textContent="Subiendo… "+p+" %"}
},240);
}
$("#v-panel").addEventListener("click",function(e){
var b=e.target.closest("[data-pact]");if(!b)return;
var a=b.dataset.pact,v=b.dataset.id?byId(b.dataset.id):null;
if(a==="pick"){$("#file").click()}
else if(a==="sample"){startUpload()}
else if(a==="feat"&&v){v.feat=!v.feat;renderTable();refreshPublic();toast(v.feat?"Video destacado. Aparece primero en la app y en la biblioteca.":"El video ya no está destacado.")}
else if(a==="vis"&&v){
if(v.st==="pub"){v.st="hid";toast("Video oculto. Ya no aparece en la app, pero no se borra.")}
else{v.st="pub";v.date=new Date().toISOString().slice(0,10);toast("Video publicado. Ya aparece en la app.")}
renderTable();refreshPublic();
}
else if((a==="pubnow"||a==="sched")&&v){
var card=b.closest(".up"),notify=card&&$("[data-notify]",card)&&$("[data-notify]",card).checked;
if(a==="pubnow"){v.st="pub";v.date=new Date().toISOString().slice(0,10);toast(notify?"Video publicado. Ya aparece en la app y la notificación sale ahora.":"Video publicado. Ya aparece en la app.");if(notify)pending={v:v,t:"Nuevo video publicado",m:v.t}}
else{v.st="prog";toast("Video programado para mañana a las 8:00 a. m.")}
if(card)card.remove();renderTable();refreshPublic();
}
});
$("#file").addEventListener("change",function(e){var fs=Array.prototype.slice.call(e.target.files||[],0,3);fs.forEach(function(f){startUpload(cleanName(f.name))});e.target.value=""});
var drop=$("#drop");
["dragenter","dragover"].forEach(function(t){drop.addEventListener(t,function(e){e.preventDefault();drop.classList.add("over")})});
["dragleave","drop"].forEach(function(t){drop.addEventListener(t,function(e){e.preventDefault();drop.classList.remove("over")})});
drop.addEventListener("drop",function(e){var fs=Array.prototype.slice.call((e.dataTransfer&&e.dataTransfer.files)||[],0,3);if(!fs.length){startUpload();return}fs.forEach(function(f){startUpload(cleanName(f.name))})});
function renderCats(){
$("#cat-list").innerHTML=CATS.map(function(c){var n=V.filter(function(v){return v.c===c&&v.st!=="proc"}).length;return '<li><b>'+esc(c)+'</b><span class="muted">'+n+(n===1?" video":" videos")+'</span></li>'}).join("");
}
$("#cat-form").addEventListener("submit",function(e){
e.preventDefault();var inp=$("#cat-new"),n=inp.value.trim();
if(!n){toast("Escriba el nombre de la categoría.");inp.focus();return}
if(CATS.some(function(c){return norm(c)===norm(n)})){toast("Esa categoría ya existe.");return}
CATS.push(n.charAt(0).toUpperCase()+n.slice(1));inp.value="";renderCats();fillCatSelect();
toast("Categoría creada. Ya aparece en la biblioteca de la app.");
});
function renderStats(){
var pub=V.filter(function(v){return v.st==="pub"});
$("#k1").textContent=num(pub.reduce(function(a,v){return a+v.views},0));
$("#k2").textContent=num(pub.length);
$("#k3").textContent=num(1284+favs.length);
var data=[5200,6100,5800,7400,8100,7900,9300,10450],max=12000,w=520,h=220,pl=44,pb=28,bw=34;
var today=new Date(),labels=data.map(function(_,i){var d=new Date(today);d.setDate(d.getDate()-(7*(data.length-1-i)));return d.getDate()+" "+MES_AB[d.getMonth()]});
var step=(w-pl-10)/data.length,svg='<svg class="chart" viewBox="0 0 '+w+' '+h+'" role="img" aria-label="Reproducciones por semana, datos de ejemplo">';
[0,4000,8000,12000].forEach(function(t){var y=h-pb-(t/max)*(h-pb-12);svg+='<line x1="'+pl+'" x2="'+(w-6)+'" y1="'+y+'" y2="'+y+'" stroke="#ECE8F4"/><text x="'+(pl-8)+'" y="'+(y+4)+'" text-anchor="end" font-size="11" fill="#6B6380">'+(t?num(t/1000)+" mil":"0")+'</text>'});
data.forEach(function(d,i){var x=pl+i*step+(step-bw)/2,bh=(d/max)*(h-pb-12),y=h-pb-bh;svg+='<rect x="'+x+'" y="'+y+'" width="'+bw+'" height="'+bh+'" rx="6" fill="'+(i===data.length-1?"#FFB21E":"#3A2F5A")+'"><title>'+num(d)+' reproducciones</title></rect><text x="'+(x+bw/2)+'" y="'+(h-9)+'" text-anchor="middle" font-size="11" fill="#6B6380">'+labels[i]+'</text>'});
$("#chart").innerHTML=svg+'</svg>';
var top=pub.slice().sort(function(a,b){return b.views-a.views}).slice(0,5),mx=top.length?top[0].views||1:1;
$("#toplist").innerHTML=top.map(function(v){return '<li><span class="t">'+esc(v.t)+'</span><span class="v">'+num(v.views)+'</span><span class="bar"><i style="width:'+Math.max(4,Math.round(v.views/mx*100))+'%"></i></span></li>'}).join("");
}
var HIST=[{t:"Nuevo video publicado",m:"3 errores que todos cometemos",d:"16 de octubre de 2026, 8:00 a. m."},{t:"Nuevo video publicado",m:"Detrás de cámaras: un día en el equipo",d:"10 de octubre de 2026, 6:30 p. m."}];
function renderNotif(){
var sel=$("#nv"),cur=sel.value;
sel.innerHTML=newest(live()).map(function(v){return '<option value="'+v.id+'">'+esc(v.t)+'</option>'}).join("");
if(cur&&byId(cur))sel.value=cur;
if(!$("#nm").value&&sel.value)$("#nm").value=byId(sel.value).t;
updPreview();
$("#hist").innerHTML=HIST.map(function(h){return '<li><b>'+esc(h.t)+'</b>: '+esc(h.m)+'<small>'+esc(h.d)+'</small></li>'}).join("");
}
function updPreview(){$("#pv-t").textContent=$("#nt").value||"Título";$("#pv-m").textContent=$("#nm").value||"Mensaje"}
$("#nv").addEventListener("change",function(){var v=byId(this.value);if(v)$("#nm").value=v.t;updPreview()});
$("#nt").addEventListener("input",updPreview);$("#nm").addEventListener("input",updPreview);
$("#nform").addEventListener("submit",function(e){
e.preventDefault();var v=byId($("#nv").value);if(!v){toast("Publique un video antes de enviar una notificación.");return}
var t=$("#nt").value.trim()||"Nuevo video publicado",m=$("#nm").value.trim()||v.t;
HIST.unshift({t:t,m:m,d:"Ahora"});pending={v:v,t:t,m:m};renderNotif();
toast("Notificación enviada a quienes activaron los avisos. Ábrala en la pestaña App.");
});
function renderLanding(){
$("#latest").innerHTML=newest(live()).slice(0,6).map(function(v){return tileHTML(v,"a")}).join("");
var hv=ordered(live())[0];
$("#hero-screen").innerHTML=hv?'<div class="reel playing">'+scene(hv,false)+'<div class="scrim"></div><div class="meta" style="right:16px"><div class="meta-top"><span class="chip">'+esc(hv.c)+'</span><span class="len">'+dur(hv.d)+'</span></div><h3 class="reel-title">'+esc(hv.t)+'</h3></div><div class="progress"><i style="--d:12s"></i></div></div>':"";
if(!$("#qr").firstChild){
var target=location.href.split("#")[0]+"#app";
if(window.qrcode){try{var q=window.qrcode(0,"M");q.addData(target);q.make();$("#qr").innerHTML=q.createSvgTag({cellSize:4,margin:0,scalable:true})}catch(e){}}
}
}
$("#v-landing").addEventListener("click",function(e){
var j=e.target.closest("[data-jump]");
if(j){e.preventDefault();var s=document.getElementById(j.dataset.jump);if(s)window.scrollTo({top:s.getBoundingClientRect().top+window.scrollY-$("#demobar").offsetHeight,behavior:"smooth"});return}
var l=e.target.closest("[data-legal]");if(l)openLegal(l.dataset.legal);
});
document.addEventListener("click",function(e){
var s=e.target.closest("[data-store]");if(!s)return;
var ua=navigator.userAgent,k=s.dataset.store;
if(k==="smart"){
if(/android/i.test(ua))toast("En Android, este botón abre la app en Google Play.");
else if(/iphone|ipad|ipod/i.test(ua))toast("En iPhone, este botón abre la app en App Store.");
else toast("En un celular, este botón lleva directo a Google Play o a App Store, según el equipo.");
}else toast("Aquí se abrirá la ficha de la app en "+(k==="play"?"Google Play":"App Store")+" cuando esté publicada.");
});
var LEGAL={
privacidad:["Política de privacidad","Aquí irá la política de privacidad de la app. Google Play y App Store la exigen para publicar; la estructuramos con su empresa durante el levantamiento."],
terminos:["Términos de uso","Aquí irán los términos de uso de la app y de sus contenidos."],
soporte:["Soporte","Aquí irá la página de soporte con los datos de contacto que exigen las tiendas de aplicaciones."]
};
function openLegal(k){var d=LEGAL[k];$("#m-t").textContent=d[0];$("#m-p").textContent=d[1];$("#modal").classList.add("open");$("#modal [data-close]").focus()}
function closeModal(){$("#modal").classList.remove("open")}
$("#modal").addEventListener("click",function(e){if(e.target===this||e.target.closest("[data-close]"))closeModal()});
function renderShared(slug){
var v=V.filter(function(x){return x.slug===slug&&x.st==="pub"})[0]||ordered(live())[0];
if(!v)return;
$("#sh-player").innerHTML=scene(v,false)+'<div class="scrim"></div><div class="meta"><div class="meta-top"><span class="chip">'+esc(v.c)+'</span><span class="len">'+dur(v.d)+'</span></div></div>';
$("#sh-title").textContent=v.t;
}
renderFeed();
setBar();
route();
})();
