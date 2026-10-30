import * as THREE from './vendor/three.module.js';
const track=document.querySelector('.story-track');
if(track){
 const host=document.createElement('div');host.className='story-living';host.setAttribute('role','img');host.setAttribute('aria-label','An uninhabited illustrated world with gently flowing water, drifting clouds and softly moving gardens.');track.querySelector('.story-art').append(host);
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');let renderer;
 try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:false,powerPreference:'low-power'});}catch{host.remove();}
 if(renderer){renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setClearColor(0,0);host.append(renderer.domElement);const scene=new THREE.Scene(),camera=new THREE.OrthographicCamera(-1,1,1,-1,0,2);camera.position.z=1;
 const uniforms={picture:{value:null},time:{value:0},strength:{value:0},frame:{value:new THREE.Vector2(1,1)},anchor:{value:.8}};
 const material=new THREE.ShaderMaterial({uniforms,vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}',fragmentShader:`
 precision highp float;varying vec2 vUv;uniform sampler2D picture;uniform float time;uniform float strength;uniform vec2 frame;uniform float anchor;
 float oval(vec2 p,vec2 c,vec2 r){return 1.-smoothstep(.45,1.,length((p-c)/r));}
 float region(vec2 p,vec4 r){return smoothstep(r.x,r.x+.005,p.x)*(1.-smoothstep(r.z-.005,r.z,p.x))*smoothstep(r.y,r.y+.008,p.y)*(1.-smoothstep(r.w-.008,r.w,p.y));}
 void main(){
 float imageRatio=2000./1125.;float canvasRatio=frame.x/frame.y;vec2 scale=canvasRatio>imageRatio?vec2(1.,imageRatio/canvasRatio):vec2(canvasRatio/imageRatio,1.);vec2 uv=vUv*scale+vec2((1.-scale.x)*anchor,(1.-scale.y)*.5);vec2 p=vec2(uv.x,1.-uv.y);vec2 delta=vec2(0.);
 float waterfall=region(p,vec4(.698,.605,.737,.797));float pool=oval(p,vec2(.753,.797),vec2(.065,.028));float river=region(p,vec4(.602,.785,.694,1.));
 delta.x+=(sin(p.y*430.-time*18.)*.00025+sin(p.y*180.-time*8.)*.00015)*waterfall;
 delta.y+=sin(p.x*340.+time*4.)*.00065*(pool+river*.45);delta.x+=cos(p.y*260.-time*3.)*.00035*river;
 float clouds=oval(p,vec2(.681,.235),vec2(.026,.045))+oval(p,vec2(.945,.395),vec2(.024,.035))+oval(p,vec2(.897,.747),vec2(.018,.026));
 float ocean=oval(p,vec2(.943,.535),vec2(.022,.037))+oval(p,vec2(.893,.817),vec2(.019,.027));
 delta.x+=sin(time)*.005*clouds;delta.y+=cos(time+p.x*8.)*.00045*clouds;
 delta.y+=sin(p.x*550.+p.y*180.-time*5.)*.00065*ocean;delta.x+=cos(p.y*440.-time*3.)*.00035*ocean;
 float foliage=oval(p,vec2(.66,.145),vec2(.065,.095))+oval(p,vec2(.902,.254),vec2(.05,.055))+oval(p,vec2(.837,.458),vec2(.05,.075));
 float flowers=oval(p,vec2(.502,.775),vec2(.075,.09));
 delta.x+=sin(time*2.+p.y*14.)*(foliage*.00045+flowers*.00055);delta.y+=cos(time*2.+p.x*15.)*.00015*(foliage+flowers);
 vec4 color=texture2D(picture,uv+vec2(delta.x,-delta.y)*strength);float glint=(sin(p.y*690.-time*20.+p.x*20.)*.5+.5)*waterfall*.018+pow(sin(p.x*500.+p.y*320.-time*6.)*.5+.5,12.)*(pool*.025+ocean*.015);color.rgb+=glint*strength;gl_FragColor=color;
 }`});scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),material));
 let running=0,ready=false,seconds=0,last=0,userPaused=false;
 const control=document.createElement('button');control.type='button';control.className='story-motion-control';control.textContent='Pause motion';control.setAttribute('aria-label','Pause environmental motion');track.querySelector('.story-stage').append(control);control.addEventListener('click',()=>{userPaused=!userPaused;control.textContent=userPaused?'Play motion':'Pause motion';control.setAttribute('aria-label',userPaused?'Play environmental motion':'Pause environmental motion');last=0;wake()});
 new THREE.TextureLoader().load('/assets/story-empty-3d.webp',texture=>{texture.colorSpace=THREE.NoColorSpace;uniforms.picture.value=texture;ready=true;host.dataset.ready='true';wake()});
 function resize(){const r=host.getBoundingClientRect();renderer.setSize(Math.max(1,r.width),Math.max(1,r.height),false);uniforms.frame.value.set(r.width,r.height);wake()}new ResizeObserver(resize).observe(host);
 function render(now){running=0;const r=track.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight||document.hidden){last=0;return}const p=reduced.matches?1:Math.max(0,Math.min(1,-r.top/Math.max(1,r.height-innerHeight)));const live=Math.max(0,Math.min(1,(p-.72)/.16));host.style.opacity=String(ready?live:0);uniforms.anchor.value=innerWidth<850?.78:.8;uniforms.strength.value=reduced.matches?0:live;
 control.hidden=live<.5||reduced.matches;
 if(ready&&live>0){if(last&&!reduced.matches&&!userPaused)seconds+=Math.min(.05,(now-last)/1000);last=now;uniforms.time.value=(seconds%24)*Math.PI*2/24;renderer.render(scene,camera);host.dataset.motionState=seconds.toFixed(3);host.dataset.strength=uniforms.strength.value.toFixed(2);host.dataset.paused=String(userPaused);if(!reduced.matches&&!userPaused)running=requestAnimationFrame(render)}else last=0;
 }
 function wake(){if(!running)running=requestAnimationFrame(render)}addEventListener('scroll',wake,{passive:true});addEventListener('resize',wake);document.addEventListener('visibilitychange',wake);reduced.addEventListener('change',wake);resize();
 }
}

