import './scrollcraft.js';

// The shared Scrollcraft engine is copied verbatim. Bespoke behavior stays here.
try { window.ScrollCraft?.mount?.(document); } catch (error) { console.warn('Scrollcraft fallback: natural document flow remains available.', error); }
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const hero = document.querySelector('.hero');
const assembly = document.querySelector('.assembly');
let scheduled = false;
function paint(){
  scheduled=false;
  const y=hero.getBoundingClientRect().top;
  const travel=Math.max(-1,Math.min(1,-y/innerHeight));
  const motion=reduce.matches?0:travel;
  hero.style.setProperty('--hero-y',`${motion*66}px`);
  hero.style.setProperty('--hero-r',`${-10+motion*9}deg`);
  hero.style.setProperty('--orbit-y',`${motion*20}px`);
  hero.style.setProperty('--cross-y',`${motion*-38}px`);
  const r=assembly.getBoundingClientRect();
  const pinned=innerWidth>=850&&!reduce.matches;
  const p=pinned?Math.max(0,Math.min(1,-r.top/Math.max(1,r.height-innerHeight))):1;
  assembly.style.setProperty('--draw',1-p);
  assembly.style.setProperty('--ring-r',`${p*60}deg`);
  const stage=assembly.querySelector('[data-sc-stage]');
  stage.setAttribute('data-sc-verify-state',`line:${(1-p).toFixed(2)};ring:${(p*60).toFixed(1)};spread:${((1-p)*38).toFixed(1)}`);
  stage.setAttribute('data-sc-verify-hold',String(!pinned||p>=1));
  for(const [index,node] of [...document.querySelectorAll('.node')].entries()){
    const x=index===0||index===3?-1:1;
    const v=index<2?-1:1;
    node.style.setProperty('--nx',`${x*(1-p)*38}px`);
    node.style.setProperty('--ny',`${v*(1-p)*30}px`);
  }
}
function schedule(){if(!scheduled){scheduled=true;requestAnimationFrame(paint)}}
addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);reduce.addEventListener('change',schedule);paint();
const buttons=[...document.querySelectorAll('[data-service]')];
const phrases={Branding:'your brand','Web design':'your website','Apps & technology':'your technology',Marketing:'your message'};
function updateBrief(){
 const selected=buttons.filter(b=>b.getAttribute('aria-pressed')==='true').map(b=>b.dataset.service);
 const fragments=selected.map(s=>phrases[s]);
 let joined=fragments.length>1?fragments.slice(0,-1).join(', ')+' and '+fragments.at(-1):fragments[0];
 document.querySelector('#brief-text').textContent=selected.length?`Let’s connect ${joined} with your next chapter.`:'Every project starts with a conversation. Tell us what’s on your mind.';
 document.querySelector('#selection-count').textContent=`${selected.length} connection${selected.length===1?'':'s'}`;
 document.querySelectorAll('.brief-dots span').forEach((d,i)=>d.classList.toggle('active',buttons[i].getAttribute('aria-pressed')==='true'));
 const body=`Hi DYD,\n\nI’d like to start a conversation about ${selected.length?selected.join(', '):'a new project'}.\n\nHere’s a little about my business and what I’m hoping to achieve:\n\n`;
 document.querySelector('#email-project').href=`mailto:info@dyd.com?subject=${encodeURIComponent('New project'+(selected.length?': '+selected.join(', '):''))}&body=${encodeURIComponent(body)}`;
}
buttons.forEach(b=>b.addEventListener('click',()=>{const pressed=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',String(pressed));b.querySelector('span').textContent=pressed?'↗':'+';updateBrief()}));updateBrief();
