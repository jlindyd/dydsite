import fs from 'node:fs';
const futureMovie=false;
const frames=[
 ['pencil','story-empty-pencil','Pencil sketch of an imaginative world taking shape'],
 ['painting','story-empty-painting','The same world, painted in colour'],
 ['model','story-empty-3d','The uninhabited dream world with dimensional architectural materials'],

 ['future','future-world-no-paper','The same dream world evolved with glass knowledge archives and futuristic architecture'],
];
const steps=['First line','Add colour','Lift off the page','A future world'];
export const artistHero=`<section class="story-track" data-world-video="${futureMovie?'future':'still'}" aria-label="A dream, from first line to finished world"><div class="story-stage"><div class="story-art" aria-hidden="false">${frames.map(([k,f,alt],i)=>`<img class="story-frame story-${k}" src="/assets/${f}.webp" alt="${alt}" width="2000" height="1125"${i===0?' fetchpriority="high"':i===3?' loading="lazy"':''}>`).join('')}</div><div class="story-copy"><span class="story-kicker">DYD / CREATIVITY WITH TECHNOLOGY</span><h1 id="story-headline">Every dream<br>starts with<br><em>a first line.</em></h1><p id="story-description">An idea. A blank page.<br>The courage to imagine something new.</p><a class="story-cta" href="/contact">Let’s create your next chapter <span aria-hidden="true">↗</span></a></div><div class="story-final"><h2>Your dream.<br><em>A new future.</em></h2><p>Creativity, technology and intelligence.<br>One world of possibility.</p><a class="story-cta" href="/contact">Let’s create your next chapter <span aria-hidden="true">↗</span></a></div><div class="story-navigation"><span class="story-label">FROM IMAGINATION TO POSSIBILITY</span><div role="group" aria-label="Explore the story">${steps.map((x,i)=>`<button type="button" data-story-step="${i}" aria-pressed="${i===0}">${x}<i></i></button>`).join('')}</div><a href="#after-story">Discover DYD ↗</a></div><span class="story-note">ORIGINAL CONCEPT ARTWORK</span></div></section><div id="after-story" tabindex="-1"></div>`;









