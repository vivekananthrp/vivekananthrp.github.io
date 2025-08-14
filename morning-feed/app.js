const FEED = document.getElementById('feed');
document.getElementById('year').textContent = new Date().getFullYear();

async function load() {
try {
const res = await fetch('data/today.json', {cache:'no-cache'});
const data = await res.json();
render(data);
} catch(e){
FEED.innerHTML = '<div class="section">Failed to load feed.</div>';
}
}

function section(title, cls){
const el=document.createElement('div');
el.className='section '+cls;
el.textContent=title;
return el;
}

function card(item){
const a = document.createElement('a');
a.className = 'card';
a.href = item.url || '#';
a.target = '_blank';
a.rel = 'noopener';
a.innerHTML = `<img class="thumb" src="${item.thumb}" alt=""> <div class="content"> <div class="title">${item.title}</div> <div class="take">${item.takeaway || ''}</div> <div class="source">${item.source || ''} ${item.time ? '- ' + item.time : ''}</div> </div>`;
return a;
}

function render(d){
FEED.innerHTML='';
FEED.append(section('Gurudev Sri Sri Ravi Shankar','saffron'));
(d.gurudev||[]).forEach(x=>FEED.append(card(x)));
FEED.append(section('India / USA — News','blue'));
(d.news||[]).forEach(x=>FEED.append(card(x)));
FEED.append(section('US Visa — Updates','teal'));
(d.visa||[]).forEach(x=>FEED.append(card(x)));
FEED.append(section('AI / LLM — On X','purple'));
(d.ai||[]).forEach(x=>FEED.append(card(x)));
FEED.append(section('Productivity — On X','green'));
(d.productivity||[]).forEach(x=>FEED.append(card(x)));
}

load();
