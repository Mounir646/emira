// ---- Quotes ----
const Q=[
"Lihat, Emira sudah tahu hal ini. Ini berat buatmu, masa yang sedang kamu lalui..",
"Tapi dia tidak pernah berhenti mencoba ...",
"Tuhan tidak akan membiarkanmu begitu saja, karena Dia tahu kamu sudah berusaha sekuat tenaga untuk membahagiakan kedua orang tuamu. Semoga Allah menjaga mereka untuk kamu.",
"Perasaan ini nyata, tetapi tidak akan bertahan selamanya.",
"Kamu lebih berarti daripada yang kamu kira.",
"Setelah malam, matahari selalu terbit lagi.",
"Tidak apa-apa meminta tolong. Itu butuh keberanian.",
"Bunga pun butuh waktu untuk mekar. Kamu juga.",
"Gagal bukan akhir dunia. Kamu masih bisa mencoba lagi.",
"Langkah kecil itu sudah kemajuan. Jangan meremehkannya.",
"Gagal itu bagian dari belajar, bukan tanda bahwa kamu tidak mampu.",
"Pelan-pelan tidak apa-apa, yang penting kamu tidak berhenti."
];const q=document.getElementById("quote");let qi=0;
function nq(){qi=(qi+1+Math.floor(Math.random()*(Q.length-1)))%Q.length;q.textContent="“"+Q[qi]+"”"}
document.getElementById("nq").onclick=nq;
q.textContent="“"+Q[0]+"”";

// ---- Falling flowers ----
setInterval(()=>{
  const e=document.createElement("div");
  e.className="fall";
  e.textContent=["🌷","🌹","🌸","🍃"][Math.floor(Math.random()*4)];
  e.style.left=Math.random()*100+"vw";
  e.style.animationDuration=(6+Math.random()*6)+"s";
  document.body.appendChild(e);
  setTimeout(()=>e.remove(),12000);
},900);

// ---- Music (generated in the browser, no audio files) ----
let ac,on=false,timer;
const mb=document.getElementById("mb");
const N=[261.6,293.7,329.6,392,440,523.3];
function note(){
  const o=ac.createOscillator(),g=ac.createGain();
  o.type="sine";
  o.frequency.value=N[Math.floor(Math.random()*N.length)];
  g.gain.setValueAtTime(0,ac.currentTime);
  g.gain.linearRampToValueAtTime(.15,ac.currentTime+.1);
  g.gain.exponentialRampToValueAtTime(.001,ac.currentTime+2);
  o.connect(g).connect(ac.destination);
  o.start();
  o.stop(ac.currentTime+2);
}
// ---- Music (mp3 file) ----
const audio = new Audio("music.mp3");
audio.loop = true;      // kat3awd mn lwl mlli tsali
audio.volume = 0.6;     // 0 = bla sot, 1 = akbar sot

const b = document.getElementById("mb");
mb.onclick = () => {
  if (audio.paused) {
    audio.play().catch(() => alert("music.mp3 ma tlqach. T2akkad mn smiya o mn dossier."));
    mb.textContent = "⏸ Stop";
  } else {
    audio.pause();
    mb.textContent = "▶ Play music";
  }
};

// ---- Game ----
const c=document.getElementById("g"),x=c.getContext("2d"),gb=document.getElementById("gb"),sc=document.getElementById("sc");
let run=false,px=180,items=[],s=0,raf,t=0;

function pos(e){
  const r=c.getBoundingClientRect();
  px=((e.touches?e.touches[0].clientX:e.clientX)-r.left)*360/r.width;
}
c.addEventListener("mousemove",pos);
c.addEventListener("touchmove",e=>{pos(e);e.preventDefault()},{passive:false});
c.addEventListener("touchstart",pos);

function draw(){
  x.clearRect(0,0,360,420);
  x.font="28px serif";
  x.textAlign="center";
  x.fillText("🧺",px,400);
  items.forEach(i=>x.fillText(i.e,i.x,i.y));
  if(!run)return;
  t++;
  if(t%35==0)items.push({x:20+Math.random()*320,y:0,e:["🌷","🌹","🌸"][Math.floor(Math.random()*3)],v:2+s/15});
  items.forEach(i=>i.y+=i.v);
  items=items.filter(i=>{
    if(i.y>370&&Math.abs(i.x-px)<35){s++;sc.textContent=s;return false}
    return i.y<430;
  });
  raf=requestAnimationFrame(draw);
}
gb.onclick=()=>{
  cancelAnimationFrame(raf);
  run=true;s=0;t=0;items=[];
  sc.textContent=0;
  gb.textContent="Restart";
  draw();
};
draw();