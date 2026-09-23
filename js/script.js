const MENU=[["index","Beranda","index.html"],["kegiatan","Kegiatan","kegiatan.html"],["program","Program","program.html"],["galeri","Galeri","galeri.html"],["perpustakaan","Perpustakaan","perpustakaan.html"],["kontak","Kontak","kontak.html"]];
const WA="6287781546647"; // ganti dengan nomor WhatsApp pengurus (format 62...)
const halaman=document.body.dataset.page;
document.getElementById("site-header").innerHTML=`<nav class="nav"><a class="brand" href="index.html"><img src="Aset/Logo/logo.png" alt="Logo Musholla Al Khair" onerror="this.remove()"><span>Musholla Al Khair</span></a><ul>${MENU.map(m=>`<li><a href="${m[2]}" class="${m[0]===halaman?"aktif":""}">${m[1]}</a></li>`).join("")}</ul></nav>`;
document.getElementById("site-footer").innerHTML=`<p>© ${new Date().getFullYear()} Musholla Al Khair. Barakallahu fiikum.</p>`;
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const img=(src,alt)=>`<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" onerror="this.style.visibility='hidden'">`;
const RENDER={
  kegiatan:d=>`<article class="card">${img(d.foto,d.judul)}<div><small>${esc(d.tanggal)}</small><h3>${esc(d.judul)}</h3><p>${esc(d.deskripsi)}</p></div></article>`,
  program:d=>`<article class="card">${img(d.foto,d.judul)}<div><h3>${esc(d.judul)}</h3><p>${esc(d.deskripsi)}</p></div></article>`,
  galeri:d=>`<figure>${img(d.foto,d.keterangan)}<figcaption>${esc(d.keterangan)}</figcaption></figure>`,
  perpustakaan:d=>`<div class="item"><div><h3>${esc(d.judul)}</h3><p>${esc(d.penulis)} · ${esc(d.deskripsi)}</p></div><a class="btn" href="${esc(d.file)}" download>Unduh PDF</a></div>`
};
document.querySelectorAll("[data-src]").forEach(async el=>{
  try{
    const r=await fetch(el.dataset.src); if(!r.ok) throw 0;
    let data=await r.json(); if(el.dataset.limit) data=data.slice(0,+el.dataset.limit);
    el.innerHTML=data.length?data.map(RENDER[el.dataset.type]).join(""):"<p>Belum ada data.</p>";
  }catch(e){
    el.innerHTML='<p class="pesan">Data tidak bisa dimuat. Buka situs lewat server (misalnya ekstensi Live Server di VS Code, atau hosting), bukan dengan klik dua kali file HTML.</p>';
  }
});
document.querySelectorAll(".copy").forEach(b=>b.addEventListener("click",async()=>{
  const t=document.getElementById(b.dataset.copy).textContent;
  try{await navigator.clipboard.writeText(t);b.textContent="Tersalin";}catch{b.textContent="Salin manual";}
  setTimeout(()=>b.textContent="Salin",2000);
}));
const f=document.getElementById("waform");
if(f)f.addEventListener("submit",e=>{e.preventDefault();
  const d=new FormData(f);
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(`Assalamu'alaikum, saya ${d.get("nama")}.\n${d.get("pesan")}`)}`,"_blank");
});
