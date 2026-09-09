(()=>{
const DB='veyltharyn_github_db',SESSION='veyltharyn_session';
function db(){let d=JSON.parse(localStorage.getItem(DB)||'{}');d.settings??={};d.music??=[];return d}
function user(){try{return JSON.parse(localStorage.getItem(SESSION)||'null')}catch(e){return null}}
function apply(){const d=db(),s=d.settings||{};if(s.background){document.body.style.setProperty('--bg-image',`url("${s.background}")`);document.body.style.backgroundImage=`linear-gradient(135deg,rgba(5,3,8,${Math.min(.9,Number(s.overlay??.28)+.1)}),rgba(7,26,61,.25)),url("${s.background}")`;document.body.style.backgroundSize='cover';document.body.style.backgroundPosition='center';document.body.style.backgroundAttachment='fixed'}if(s.siteTitle)document.title=s.siteTitle+(document.title.includes('—')?' — Veyltharyn':'');if(s.accent)document.documentElement.style.setProperty('--hell-red',s.accent);if(s.accent2)document.documentElement.style.setProperty('--hell-red2',s.accent2);if(s.maintenance&&user()?.role!=='owner'){const b=document.createElement('div');b.className='site-maintenance';b.textContent='Situs sedang dalam maintenance. Silakan kembali lagi nanti.';document.body.appendChild(b)}}
function roleMenu(){const u=user();if(!u||!['owner','admin','admin_cs','staff'].includes(u.role))return;document.querySelectorAll('.side-nav').forEach(nav=>{if(!nav.querySelector('[data-role-panel]')){const a=document.createElement('a');a.href='admin.html';a.setAttribute('data-role-panel','1');a.innerHTML=`<span>🛡️</span><span>${u.role==='owner'?'Owner Panel':'Admin Panel'}</span>`;nav.appendChild(a)}})}
function music(){
 const d=db(); if(!d.music?.length)return;
 const old=document.getElementById('vyMusicDock'); if(old)old.remove();
 const oldPlayer=document.getElementById('vyMusicEngine'); if(oldPlayer)oldPlayer.remove();
 const wrap=document.createElement('div'); wrap.id='vyMusicDock';
 wrap.innerHTML=`<div class="vy-music-title">♫ Veyltharyn Music</div><select id="vyTrack"></select><div class="vy-music-controls"><button id="vyPrev">⏮</button><button id="vyPlay">▶</button><button id="vyStop">■</button><button id="vyNext">⏭</button></div><div id="vyMusicStatus" style="font-size:11px;opacity:.72;margin-top:5px">Ready</div>`;
 document.body.appendChild(wrap);
 const sel=wrap.querySelector('#vyTrack'),status=wrap.querySelector('#vyMusicStatus');
 d.music.forEach((m,i)=>{const o=document.createElement('option');o.value=i;o.textContent=m.title||`Track ${i+1}`;sel.appendChild(o)});
 let idx=0,engine=null,kind=null,playing=false;
 const hidden=document.createElement('div'); hidden.id='vyMusicEngine'; hidden.style.cssText='position:fixed;width:1px;height:1px;left:-10px;bottom:-10px;overflow:hidden;opacity:.01;pointer-events:none'; document.body.appendChild(hidden);
 function setStatus(x){status.textContent=x}
 function ytId(url){try{const u=new URL(url); if(u.hostname.includes('youtu.be'))return u.pathname.slice(1).split('/')[0]; if(u.hostname.includes('youtube.com'))return u.searchParams.get('v')||u.pathname.match(/\/(?:shorts|embed|live)\/([^/?]+)/)?.[1]||null}catch(e){}return null}
 function spotify(url){try{const u=new URL(url);if(!u.hostname.includes('spotify.com'))return null;const m=u.pathname.match(/^\/(track|album|playlist|episode|show|artist)\/([^/?]+)/);return m?`spotify:${m[1]}:${m[2]}`:null}catch(e){return null}}
 function destroy(){if(engine){try{if(kind==='yt')engine.stopVideo?.();if(kind==='spotify')engine.pause?.();}catch(e){}} engine=null;kind=null;hidden.innerHTML='';playing=false}
 function load(){const m=d.music[idx];if(!m)return;destroy();sel.value=idx;const url=String(m.url||'').trim();
   const y=ytId(url); if(y){kind='yt';setStatus('YouTube • siap diputar');
     const holder=document.createElement('div');holder.id='vyYTPlayer';holder.style.cssText='width:1px;height:1px';hidden.appendChild(holder);
     function create(){engine=new YT.Player('vyYTPlayer',{width:'200',height:'200',videoId:y,host:'https://www.youtube-nocookie.com',playerVars:{playsinline:1,controls:0,rel:0,origin:location.origin},events:{onReady:e=>{engine=e.target;setStatus('YouTube • siap');},onStateChange:e=>{if(e.data===1){playing=true;setStatus('YouTube • playing')}else if(e.data===0){playing=false;next(true)}},onError:()=>setStatus('YouTube • tidak dapat diputar'),onAutoplayBlocked:()=>setStatus('Tekan ▶ untuk memulai')}})}
     if(window.YT?.Player)create();else{window.onYouTubeIframeAPIReady=()=>create();const sc=document.createElement('script');sc.src='https://www.youtube.com/iframe_api';sc.async=true;document.head.appendChild(sc)}
     return;
   }
   const sp=spotify(url); if(sp){kind='spotify';setStatus('Spotify • memuat player');
     const holder=document.createElement('div');holder.id='vySpotifyPlayer';holder.style.cssText='width:320px;height:80px';hidden.style.cssText='position:fixed;width:320px;height:80px;left:-1000px;bottom:-1000px;overflow:hidden;opacity:0;pointer-events:none';hidden.appendChild(holder);
     function createSP(){window.onSpotifyIframeApiReady?.(window.__vySpotifyAPI)}
     if(window.__vySpotifyAPI)createSP();else{window.__vySpotifyReadyQueue=window.__vySpotifyReadyQueue||[];window.__vySpotifyReadyQueue.push(()=>createSP()); if(!document.querySelector('script[data-vy-spotify]')){const sc=document.createElement('script');sc.src='https://open.spotify.com/embed/iframe-api/v1';sc.async=true;sc.dataset.vySpotify='1';document.head.appendChild(sc)}}
     window.__vySpotifyMake=api=>{window.__vySpotifyAPI=api;const el=document.getElementById('vySpotifyPlayer');if(!el)return;api.createController(el,{uri:sp,width:'320',height:'80'},c=>{engine=c;setStatus('Spotify • siap');});};
     window.onSpotifyIframeApiReady=api=>{window.__vySpotifyAPI=api;window.__vySpotifyReadyQueue?.splice(0).forEach(fn=>fn());window.__vySpotifyMake?.(api)};
     return;
   }
   if(/^https?:\/\/.+\.(mp3|m4a|aac|ogg|wav)(\?.*)?$/i.test(url)){kind='audio';const a=document.createElement('audio');a.id='vyNativeAudio';a.preload='metadata';a.src=url;hidden.appendChild(a);engine=a;setStatus('Audio langsung • siap');a.onended=()=>next(true);return;}
   if(/^https?:\/\/.+\.(mp4|webm|ogv)(\?.*)?$/i.test(url)){kind='video';const v=document.createElement('video');v.id='vyNativeVideo';v.preload='metadata';v.src=url;v.muted=false;hidden.appendChild(v);engine=v;setStatus('Video langsung • siap');v.onended=()=>next(true);return;}
   kind='embed';const frame=document.createElement('iframe');frame.src=url;frame.allow='autoplay; encrypted-media; fullscreen; picture-in-picture';frame.style.cssText='width:320px;height:80px;border:0';hidden.style.cssText='position:fixed;width:320px;height:80px;left:-1000px;bottom:-1000px;overflow:hidden;opacity:0;pointer-events:none';hidden.appendChild(frame);engine=frame;setStatus('Embed • kontrol provider');
 }
 function play(){if(!engine){load();setTimeout(play,500);return}try{if(kind==='yt')engine.playVideo();else if(kind==='spotify')engine.play();else if(kind==='audio'||kind==='video')engine.play();else setStatus('Embed • gunakan kontrol provider');playing=true}catch(e){setStatus('Tekan ▶ lagi untuk memulai')}}
 function pause(){try{if(kind==='yt')engine.pauseVideo();else if(kind==='spotify')engine.pause();else if(kind==='audio'||kind==='video')engine.pause();playing=false;setStatus('Paused')}catch(e){}}
 function stop(){try{if(kind==='yt')engine.stopVideo();else if(kind==='spotify')engine.pause();else if(kind==='audio'||kind==='video'){engine.pause();engine.currentTime=0}playing=false;setStatus('Stopped')}catch(e){}}
 function next(auto){idx=(idx+1)%d.music.length;load();if(auto||playing)setTimeout(play,300)}
 sel.onchange=()=>{idx=Number(sel.value);load()};wrap.querySelector('#vyPrev').onclick=()=>{idx=(idx-1+d.music.length)%d.music.length;load();play()};wrap.querySelector('#vyNext').onclick=()=>next(false);wrap.querySelector('#vyPlay').onclick=()=>playing?pause():play();wrap.querySelector('#vyStop').onclick=stop;
 load();
}
function init(){apply();roleMenu();music();}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();