// Display the supplied widget inline on Contact, using the widget's own iframe.
const mount=document.querySelector('#contact-agent-mount');
const frame=document.querySelector('#dyd-widget-frame');
const bubble=document.querySelector('#dyd-widget-bubble');
if(mount&&frame){
 if(bubble)bubble.hidden=true;
 frame.title='Chat with the DYD AI agent';
 frame.classList.add('dyd-open');
 mount.append(frame);
 mount.classList.add('agent-ready');
 document.querySelector('#contact-agent-fallback')?.setAttribute('hidden','');
}
