const track=document.querySelector('.story-track');
if(track&&track.dataset.worldVideo!=='still'){
 const art=track.querySelector('.story-art'),reduce=matchMedia('(prefers-reduced-motion:reduce)');const layer=document.createElement('div');layer.className='story-video-layer';if(track.dataset.worldVideo==='future')layer.classList.add('story-environment-only');layer.setAttribute('aria-label','High-resolution animated illustration of the world coming alive');art.append(layer);
 const videos=[0,1].map(()=>{const v=document.createElement('video');const future=track.dataset.worldVideo==='future';v.src=future?(innerWidth<850?'/assets/future-world-mobile.mp4':'/assets/future-world-hd.mp4'):(innerWidth<850?'/assets/empty-world-mobile.mp4':'/assets/empty-world-hd.mp4');v.poster=future?'/assets/future-world-poster.webp':'/assets/story-empty-video-poster.webp';v.playbackRate=.65;v.muted=true;v.defaultMuted=true;v.playsInline=true;v.setAttribute('playsinline','');v.preload='auto';v.setAttribute('aria-hidden','true');v.style.opacity='0';layer.append(v);return v});
 const control=document.createElement('button');control.type='button';control.className='story-motion-control';control.textContent='Pause motion';control.setAttribute('aria-label','Pause the animated world');track.querySelector('.story-stage').append(control);
 let active=0,playing=false,userPaused=false,raf=0,blend=false,startTime=0,visible=false;
 const clamp=x=>Math.max(0,Math.min(1,x));const seam=1.0;
 function pause(){videos.forEach(v=>v.pause());playing=false;if(raf){cancelAnimationFrame(raf);raf=0}}
 async function play(){if(playing||userPaused||reduce.matches||!visible)return;try{await videos[active].play();if(blend)await videos[1-active].play();if(!visible||userPaused||reduce.matches){pause();return}playing=true;control.textContent='Pause motion';control.setAttribute('aria-label','Pause the animated world');if(!raf)raf=requestAnimationFrame(frame)}catch{playing=false;control.textContent='Play motion';control.setAttribute('aria-label','Play the animated world');}}
 function frame(){raf=0;if(!visible||userPaused||reduce.matches||document.hidden){pause();return}const current=videos[active],next=videos[1-active];if(current.readyState>=2){if(!blend)current.style.opacity='1';layer.dataset.ready='true'}
 if(!blend&&Number.isFinite(current.duration)&&current.duration-current.currentTime<=seam&&next.readyState>=2){blend=true;startTime=current.currentTime;current.style.zIndex='1';next.style.zIndex='2';next.style.opacity='0';next.currentTime=0;next.play().catch(()=>{blend=false;next.style.opacity='0'})}
 if(blend){const mix=clamp((current.currentTime-startTime)/Math.max(.1,current.duration-startTime));current.style.opacity='1';next.style.opacity=String(mix);if(mix>=.99||current.ended){current.pause();current.currentTime=0;current.style.opacity='0';next.style.opacity='1';active=1-active;blend=false;layer.dataset.loops=String(Number(layer.dataset.loops||0)+1)}}
 layer.dataset.playTime=videos[active].currentTime.toFixed(3);if(playing)raf=requestAnimationFrame(frame);
 }
 function update(){const r=track.getBoundingClientRect(),p=reduce.matches?1:clamp(-r.top/Math.max(1,r.height-innerHeight));const reveal=track.dataset.worldVideo==='future'?clamp((p-.87)/.12):clamp((p-.72)/.16);layer.style.opacity=String(reveal);visible=reveal>.02&&r.bottom>0&&r.top<innerHeight&&!document.hidden;control.hidden=reveal<.5||reduce.matches;
 if(!visible||reduce.matches)pause();else play();}
 videos.forEach(v=>v.addEventListener('canplay',update));addEventListener('scroll',update,{passive:true});addEventListener('resize',update);document.addEventListener('visibilitychange',update);reduce.addEventListener('change',update);
 control.addEventListener('click',()=>{userPaused=!userPaused;if(userPaused){pause();control.textContent='Play motion';control.setAttribute('aria-label','Play the animated world')}else play()});update();
}






