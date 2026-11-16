import fs from 'node:fs';
const futureMovie=false;
const frames=[
 ['pencil','story-empty-pencil','Pencil sketch of an imaginative world taking shape'],
 ['painting','story-empty-painting','The same world, painted in colour'],
 ['model','story-empty-3d','The uninhabited dream world with dimensional architectural materials'],

 ['glass','future-world-no-paper','The same dream world with glass, light and living materials added'],
 ['future','future-world-realistic-v2','Realistic travertine and glass architecture with planted terraces, terracotta walkways and water'],
];
const steps=['The sketch','Creative design','Development','The application','With AI'];
export const artistHero=`<section class="story-track" data-world-video="${futureMovie?'future':'still'}" aria-label="An idea, shaped by design, built through development and evolved with AI"><div class="story-stage"><div class="story-art" aria-hidden="false">${frames.map(([k,f,alt],i)=>`<img class="story-frame story-${k}" src="/assets/${f}.webp" alt="${alt}" width="2000" height="1125"${i===0?' fetchpriority="high"':i===4?' loading="eager" decoding="async"':''}>`).join('')}</div><div class="story-copy"><span class="story-kicker">DYD / CREATIVITY WITH TECHNOLOGY</span><h1 id="story-headline">Every idea<br>begins with<br><em>a sketch.</em></h1><p id="story-description">The first lines of something new.</p><a class="story-cta" href="/contact">Tell us about your project <span aria-hidden="true">↗</span></a></div><div class="story-final"><h2>With AI,<br><em>we take it further.</em></h2><p>Opening new possibilities.</p><a class="story-cta" href="/contact">Tell us about your project <span aria-hidden="true">↗</span></a></div><div class="story-navigation"><span class="story-label">FROM IDEA TO INTELLIGENT SOLUTION</span><div role="group" aria-label="Explore the story">${steps.map((x,i)=>`<button type="button" data-story-step="${i}" aria-pressed="${i===0}">${x}<i></i></button>`).join('')}</div><a href="#after-story">Discover DYD ↗</a></div><span class="story-note">ORIGINAL CONCEPT ARTWORK</span></div></section><div id="after-story" tabindex="-1"></div>`;









