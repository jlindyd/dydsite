import * as THREE from './vendor/three.module.js';
const track=document.querySelector('.artist-track');
if(track){
 const art=track.querySelector('.artist-art'),stage=track.querySelector('.artist-stage');
 const host=document.createElement('div');host.className='dream-world';host.setAttribute('role','img');host.setAttribute('aria-label','A three-dimensional dream world with arches, gardens, a red bridge and people walking. The camera rises to the creator’s overhead view.');art.append(host);
 const reduce=matchMedia('(prefers-reduced-motion:reduce)');let renderer;
 try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}catch{host.remove();stage.dataset.worldFallback='painting';}
 if(renderer){
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.setClearColor(0xf7f4ed,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;host.append(renderer.domElement);
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(35,1,.1,100);scene.add(new THREE.HemisphereLight(0xfff8e7,0x8a9a80,2.6));const sun=new THREE.DirectionalLight(0xfff3d5,3.2);sun.position.set(-7,15,9);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);Object.assign(sun.shadow.camera,{left:-13,right:13,top:13,bottom:-13,near:.5,far:50});sun.shadow.normalBias=.035;scene.add(sun);
 const world=new THREE.Group();scene.add(world);
 const mat=(color,roughness=.85)=>new THREE.MeshStandardMaterial({color,roughness});const cream=mat(0xe9ddc4),paper=mat(0xf6efdf),red=mat(0xce5035),blue=mat(0x427c9a),gold=mat(0xe0b847),green=mat(0x58784d),dark=mat(0x36443b),water=mat(0x6bafb8,.25);
 function mesh(g,m,x=0,y=0,z=0,parent=world){const a=new THREE.Mesh(g,m);a.position.set(x,y,z);a.castShadow=true;a.receiveShadow=true;parent.add(a);return a;}
 const box=(w,h,d,m,x,y,z,parent)=>mesh(new THREE.BoxGeometry(w,h,d),m,x,y,z,parent);
 // An actual architectural world, modeled from the illustrated arches and terraces.
 box(16,.18,13,paper,0,-.45,0);box(12,.45,9,cream,0,-.15,0);box(5,.9,4,paper,-3,.45,-2);box(4,1.7,3.5,cream,3,.85,-2.6);box(3,.7,3,cream,3,.35,2.8);box(3.7,1.25,2.8,paper,-3.5,.63,2.4);
 function arch(x,y,z,w,h,m,rot=0){const shape=new THREE.Shape();shape.moveTo(-w/2,0);shape.lineTo(w/2,0);shape.lineTo(w/2,h);shape.lineTo(-w/2,h);shape.closePath();const opening=w*.54,r=opening/2,shoulder=h*.48;const hole=new THREE.Path();hole.moveTo(-r,.04);hole.lineTo(-r,shoulder);hole.absarc(0,shoulder,r,Math.PI,0,true);hole.lineTo(r,.04);hole.closePath();shape.holes.push(hole);const g=new THREE.ExtrudeGeometry(shape,{depth:.42,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.035,bevelThickness:.035,curveSegments:28});const a=mesh(g,m,x,y,z);a.rotation.y=rot;return a;}
 arch(-3, .9,-2.9,2.2,3.7,red);arch(2.5,1.7,-3.5,2.4,3.8,paper);arch(4.5,0,-.7,1.8,3.6,blue,Math.PI/2);arch(-4.2,1.25,2.5,1.6,2.7,gold);arch(.1,0,-3.5,1.6,2.8,cream);arch(1.9,.7,2.9,1.5,2.5,red,Math.PI/2);
 // Red ribbon bridge, swept through space with a walking surface and side edges.
 const bridge=new THREE.CatmullRomCurve3([new THREE.Vector3(-5,1.25,1),new THREE.Vector3(-2.7,1.9,.8),new THREE.Vector3(0,2.25,.6),new THREE.Vector3(2.3,2.1,.2),new THREE.Vector3(4,1.85,-1.2)]);
 const positions=[],uv=[],indices=[];for(let i=0;i<=90;i++){const t=i/90,p=bridge.getPoint(t),tangent=bridge.getTangent(t),side=new THREE.Vector3(-tangent.z,0,tangent.x).normalize().multiplyScalar(.5);positions.push(p.x+side.x,p.y,p.z+side.z,p.x-side.x,p.y,p.z-side.z);uv.push(t,0,t,1);if(i<90){const a=i*2;indices.push(a,a+1,a+2,a+1,a+3,a+2)}}const bg=new THREE.BufferGeometry();bg.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));bg.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));bg.setIndex(indices);bg.computeVertexNormals();const bridgeMat=red.clone();bridgeMat.side=THREE.DoubleSide;mesh(bg,bridgeMat);
 for(const sign of [-1,1]){const pts=[];for(let i=0;i<=40;i++){const t=i/40,p=bridge.getPoint(t),q=bridge.getTangent(t);const s=new THREE.Vector3(-q.z,0,q.x).normalize().multiplyScalar(.51*sign);pts.push(new THREE.Vector3(p.x+s.x,p.y-.16,p.z+s.z))}mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),65,.15,5,false),red);}
 function stairs(x,z,y,count,rotation=0){const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=rotation;world.add(g);for(let i=0;i<count;i++)box(1.15,.15*(i+1),.32,cream,0,.075*(i+1),i*.29,g)}stairs(-.8,-2.8,0,8);stairs(3.2,1.8,.7,7,Math.PI/2);stairs(-4.8,-1.5,0,6,Math.PI);
 // Garden islands and water courtyard.
 const pool=mesh(new THREE.CylinderGeometry(1.25,1.25,.06,48),water,1.5,.11,3);const ripples=[];for(let i=0;i<3;i++){const ring=mesh(new THREE.TorusGeometry(.35+i*.25,.008,5,56),paper,1.5,.15,3);ring.rotation.x=-Math.PI/2;ripples.push(ring)}
 function tree(x,y,z,size=1){const g=new THREE.Group();g.position.set(x,y,z);world.add(g);mesh(new THREE.CylinderGeometry(.045,.07,.9*size,7),dark,0,.45*size,0,g);for(let i=0;i<4;i++){const a=i*2.4;const foliage=mesh(new THREE.SphereGeometry(.38*size,9,7),green,Math.sin(a)*.2*size,(1+i*.13)*size,Math.cos(a)*.2*size,g);foliage.scale.y=.7}return g;}const trees=[tree(-4,.9,-1.8,1.4),tree(3.8,1.7,-2.8,1.2),tree(-3.4,1.25,2.5,.8),tree(4,.7,3.2,.9),tree(-.8,0,2.7,1.1),tree(.9,0,-3,.7)];
 for(let i=0;i<15;i++){const a=i*2.4;mesh(new THREE.SphereGeometry(.11,6,5),i%3===0?red:gold,-4.6+Math.sin(a)*.55,.95+Math.random()*.12,-2+Math.cos(a)*.45)}
 // Open book: the imagination behind the world.
 const book=new THREE.Group();book.position.set(.2,.15,-.8);book.rotation.y=.4;world.add(book);for(const sign of [-1,1]){const page=box(1.7,.09,1.4,paper,sign*.83,0,0,book);page.rotation.z=sign*.1;for(let i=0;i<4;i++){const leaf=box(1.67,.012,1.38,cream,sign*.83,-.015-i*.025,0,book);leaf.rotation.z=sign*.1}}
 // Articulated people with walking cycles, grounded on bridge and terraces.
 const people=[];function person(route,offset,color=dark){const root=new THREE.Group();world.add(root);const body=mesh(new THREE.CylinderGeometry(.065,.09,.27,7),color,0,.43,0,root);mesh(new THREE.SphereGeometry(.065,10,8),cream,0,.65,0,root);const limbs=[];for(let i=0;i<4;i++){const pivot=new THREE.Group();pivot.position.set(i<2?(i===0?-.045:.045):(i===2?-.095:.095),i<2?.3:.51,0);root.add(pivot);mesh(new THREE.CylinderGeometry(.018,.023,i<2?.28:.23,6),i<2?dark:color,0,i<2?-.14:-.115,0,pivot);limbs.push(pivot)}people.push({root,limbs,route,offset});}
 const groundRoute=new THREE.CatmullRomCurve3([new THREE.Vector3(-4.7,.08,3.6),new THREE.Vector3(-1.8,.08,3.6),new THREE.Vector3(.2,.08,1.8),new THREE.Vector3(-1.3,.08,-.4)],false);for(let i=0;i<5;i++)person(bridge,i/5,i%2?dark:paper);for(let i=0;i<4;i++)person(groundRoute,i/4,i%2?red:blue);
 const clock=new THREE.Clock();let active=false,lastTime=0,raf=0;
 function resize(){const r=host.getBoundingClientRect();renderer.setSize(Math.max(1,r.width),Math.max(1,r.height),false);camera.aspect=r.width/Math.max(1,r.height);camera.updateProjectionMatrix()}new ResizeObserver(resize).observe(host);resize();
 function frame(){raf=0;const rect=track.getBoundingClientRect();const p=reduce.matches?1:Math.max(0,Math.min(1,-rect.top/Math.max(1,rect.height-innerHeight)));const reveal=Math.max(0,Math.min(1,(p-.68)/.14));host.style.opacity=String(reveal);host.setAttribute('aria-hidden',String(reveal<.5));stage.classList.toggle('has-living-world',reveal>.01);stage.style.setProperty('--world-reveal',String(reveal));
 if(rect.bottom<0||rect.top>innerHeight||document.hidden)return;
 if(reveal>0){const t=reduce.matches?0:clock.getElapsedTime();const overhead=Math.max(0,Math.min(1,(p-.82)/.18));const eased=overhead*overhead*(3-2*overhead);camera.position.set(10*(1-eased),10+eased*18,14*(1-eased)+.1);camera.up.set(0,1,0);camera.lookAt(0,.5,0);world.rotation.y=(1-eased)*-.18;
 for(const person of people){const u=(person.offset+t*.025)%1;const pos=person.route.getPoint(u);person.root.position.copy(pos);const tangent=person.route.getTangent(u);person.root.rotation.y=Math.atan2(tangent.x,tangent.z);const walk=reduce.matches?0:Math.sin(t*5+person.offset*20)*.47;person.limbs.forEach((limb,i)=>limb.rotation.x=walk*(i%2?1:-1));person.root.position.y+=Math.abs(walk)*.022;}
 if(!reduce.matches)ripples.forEach((r,i)=>r.scale.setScalar(1+Math.sin(t+i)*.08));renderer.render(scene,camera);host.dataset.renderState=`camera:${camera.position.x.toFixed(1)},${camera.position.y.toFixed(1)};people:${people[0].root.position.x.toFixed(2)};time:${t.toFixed(1)}`;host.dataset.peopleCount=String(people.length);host.dataset.webgl='true';}
 if(!reduce.matches&&reveal>0)raf=requestAnimationFrame(frame);
 }
 function wake(){if(!raf)raf=requestAnimationFrame(frame)}addEventListener('scroll',wake,{passive:true});addEventListener('resize',wake);document.addEventListener('visibilitychange',wake);reduce.addEventListener('change',wake);wake();
 }
}

