/* PAVLOS GETFIT STORE — add after the existing script.js */
(() => {
  "use strict";
  const TG = "https://t.me/pavlos_getfit";
  const API_BASE = "https://YOUR-CLOUDFLARE-WORKER.workers.dev";
  const money = n => new Intl.NumberFormat(document.documentElement.lang === "de" ? "de-DE" : "en-IE", {style:"currency",currency:"EUR"}).format(n);

  const words = {
    en:{nav:"Programs", kicker:"TRAINING STORE", title:"Choose your training plan.", lead:"18 structured plans for different goals and experience levels. Choose a plan, review the workouts and get your PDF after checkout.", beginner:"Beginner", intermediate:"Intermediate", advanced:"Advanced", days:"Training days", level:"Level", exercises:"Workout details", exercise:"Exercise", sets:"Sets", reps:"Reps", rest:"Rest", buy:"Buy PDF plan", details:"View plan", coachingKicker:"PERSONAL COACHING", coachingTitle:"One-to-one coaching.", coachingLead:"Personal guidance, structured sessions and a clear next step. Purchase a package, then contact Pavlos to arrange your session times.", single:"Single session", four:"4-session package", eight:"8-session package", vip:"Monthly VIP", session:"60-minute session", sessions4:"4 × 60-minute sessions", sessions8:"8 × 60-minute sessions", vipdesc:"Monthly coaching support; session schedule agreed individually.", book:"Enquire / arrange sessions", secure:"Secure checkout powered by Stripe", note:"Training plans are general fitness education, not medical advice. Choose loads you can control and stop if you feel pain.", filter:"All goals", success:"Payment confirmed. Your PDF is being prepared…", download:"Download your PDF", downloadFail:"We could not verify the payment or find the PDF. Please contact Pavlos with your Stripe receipt.", coachingPaid:"Your coaching package is paid. Message Pavlos on Telegram to arrange your sessions.", unavailable:"Checkout is not configured yet. Please contact Pavlos to purchase.", price:"Price", close:"Close", categoryFat:"Fat loss", categoryMuscle:"Muscle building", categoryStrength:"Strength", categoryFitness:"General fitness", categoryBeginner:"Beginner foundations", categoryCore:"Abs & core", weeks:"Suggested block: 6 weeks", program:"Program", weekly:"Weekly structure"},
    de:{nav:"Programme", kicker:"TRAININGS-SHOP", title:"Wähle deinen Trainingsplan.", lead:"18 strukturierte Pläne für unterschiedliche Ziele und Erfahrungsstufen. Wähle einen Plan und erhalte dein PDF nach erfolgreicher Zahlung.", beginner:"Anfänger", intermediate:"Mittelstufe", advanced:"Fortgeschritten", days:"Trainingstage", level:"Niveau", exercises:"Trainingsdetails", exercise:"Übung", sets:"Sätze", reps:"Wiederholungen", rest:"Pause", buy:"PDF-Plan kaufen", details:"Plan ansehen", coachingKicker:"PERSONAL COACHING", coachingTitle:"Persönliches 1:1 Coaching.", coachingLead:"Persönliche Betreuung und klare Trainingsstruktur. Kaufe ein Paket und kontaktiere Pavlos zur Terminvereinbarung.", single:"Einzelstunde", four:"4er-Paket", eight:"8er-Paket", vip:"Monatliches VIP", session:"60-Minuten-Einheit", sessions4:"4 × 60-Minuten-Einheiten", sessions8:"8 × 60-Minuten-Einheiten", vipdesc:"Monatliche Betreuung; Termine werden individuell vereinbart.", book:"Anfragen / Termine vereinbaren", secure:"Sichere Zahlung über Stripe", note:"Die Pläne dienen der allgemeinen Fitness und ersetzen keine medizinische Beratung. Wähle kontrollierbare Gewichte und stoppe bei Schmerzen.", filter:"Alle Ziele", success:"Zahlung bestätigt. Dein PDF wird vorbereitet …", download:"PDF herunterladen", downloadFail:"Zahlung oder PDF konnte nicht bestätigt werden. Bitte kontaktiere Pavlos mit deinem Stripe-Beleg.", coachingPaid:"Dein Coaching-Paket ist bezahlt. Schreibe Pavlos auf Telegram zur Terminvereinbarung.", unavailable:"Checkout ist noch nicht eingerichtet. Bitte kontaktiere Pavlos.", price:"Preis", close:"Schließen", categoryFat:"Fettabbau", categoryMuscle:"Muskelaufbau", categoryStrength:"Kraft", categoryFitness:"Allgemeine Fitness", categoryBeginner:"Trainingsgrundlagen", categoryCore:"Bauch & Core", weeks:"Empfohlener Block: 6 Wochen", program:"Programm", weekly:"Wochenstruktur"},
    fa:{nav:"برنامه‌ها", kicker:"فروشگاه برنامه تمرینی", title:"برنامه تمرینی‌ات را انتخاب کن.", lead:"۱۸ برنامه ساختاریافته برای هدف‌ها و سطح‌های مختلف. برنامه را انتخاب کن و پس از پرداخت، فایل PDF را دریافت کن.", beginner:"مبتدی", intermediate:"متوسط", advanced:"پیشرفته", days:"روز تمرین", level:"سطح", exercises:"جزئیات تمرین", exercise:"حرکت", sets:"ست", reps:"تکرار", rest:"استراحت", buy:"خرید برنامه PDF", details:"مشاهده برنامه", coachingKicker:"مربی‌گری خصوصی", coachingTitle:"کوچینگ یک‌به‌یک.", coachingLead:"راهنمایی شخصی و جلسات ساختاریافته. پس از خرید پکیج، برای هماهنگی زمان جلسات با پاولوس تماس بگیر.", single:"یک جلسه", four:"پکیج ۴ جلسه‌ای", eight:"پکیج ۸ جلسه‌ای", vip:"وی‌آی‌پی ماهانه", session:"جلسه ۶۰ دقیقه‌ای", sessions4:"۴ جلسه ۶۰ دقیقه‌ای", sessions8:"۸ جلسه ۶۰ دقیقه‌ای", vipdesc:"پشتیبانی ماهانه؛ زمان جلسات به‌صورت توافقی تعیین می‌شود.", book:"درخواست / هماهنگی جلسات", secure:"پرداخت امن با Stripe", note:"این برنامه‌ها آموزشی و عمومی هستند و جایگزین توصیه پزشکی نیستند. وزنه قابل‌کنترل انتخاب کن و در صورت درد تمرین را متوقف کن.", filter:"همه هدف‌ها", success:"پرداخت تأیید شد. فایل PDF در حال آماده‌سازی است…", download:"دریافت PDF", downloadFail:"پرداخت یا فایل PDF تأیید نشد. با رسید Stripe به پاولوس پیام بده.", coachingPaid:"پرداخت پکیج کوچینگ انجام شد. برای هماهنگی جلسات به پاولوس در تلگرام پیام بده.", unavailable:"پرداخت هنوز راه‌اندازی نشده است. برای خرید به پاولوس پیام بده.", price:"قیمت", close:"بستن", categoryFat:"چربی‌سوزی", categoryMuscle:"عضله‌سازی", categoryStrength:"افزایش قدرت", categoryFitness:"تناسب اندام", categoryBeginner:"پایه بدنسازی", categoryCore:"شکم و میان‌تنه", weeks:"دوره پیشنهادی: ۶ هفته", program:"برنامه", weekly:"ساختار هفتگی"}
  };

  const categories = [
    {id:"fat",key:"categoryFat",prices:[19.99,24.99,29.99],days:[3,4,5],names:["Fat Loss","Fat Loss","Fat Loss"],ex:[["Bodyweight squat","Machine chest press","Lat pulldown","Leg press","Treadmill walk"],["Dumbbell squat","Dumbbell bench press","Seated cable row","Reverse lunge","Stationary bike"],["Barbell squat","Romanian deadlift","Incline dumbbell press","Lat pulldown","Intervals: bike"]]},
    {id:"muscle",key:"categoryMuscle",prices:[19.99,27.99,34.99],days:[3,4,5],names:["Muscle Building","Muscle Building","Muscle Building"],ex:[["Leg press","Machine chest press","Lat pulldown","Seated leg curl","Dumbbell shoulder press"],["Barbell bench press","Seated cable row","Dumbbell shoulder press","Squat","Romanian deadlift"],["Barbell bench press","Bent-over row","Squat","Romanian deadlift","Lateral raise"]]},
    {id:"strength",key:"categoryStrength",prices:[19.99,24.99,29.99],days:[3,4,4],names:["Strength","Strength","Strength"],ex:[["Goblet squat","Machine chest press","Lat pulldown","Dumbbell Romanian deadlift","Plank"],["Barbell squat","Barbell bench press","Romanian deadlift","Overhead press","Cable row"],["Barbell squat","Barbell bench press","Deadlift","Pull-up","Overhead press"]]},
    {id:"fitness",key:"categoryFitness",prices:[19.99,22.99,24.99],days:[3,4,5],names:["General Fitness","General Fitness","General Fitness"],ex:[["Bodyweight squat","Incline push-up","Glute bridge","Seated row","Treadmill walk"],["Goblet squat","Push-up","Dumbbell deadlift","Cable row","Step-up"],["Dumbbell squat","Push-up","Kettlebell deadlift","Battle rope","Rowing machine"]]},
    {id:"beginner",key:"categoryBeginner",prices:[14.99,17.99,19.99],days:[3,3,4],names:["Beginner Foundations","Beginner Foundations","Beginner Foundations"],ex:[["Leg press","Machine chest press","Lat pulldown","Leg curl","Dead bug"],["Goblet squat","Dumbbell chest press","Seated row","Glute bridge","Shoulder press"],["Goblet squat","Lat pulldown","Dumbbell bench press","Romanian deadlift","Pallof press"]]},
    {id:"core",key:"categoryCore",prices:[14.99,17.99,19.99],days:[2,3,3],names:["Abs & Core","Abs & Core","Abs & Core"],ex:[["Crunch","Plank","Dead bug","Bird dog","Glute bridge"],["Cable crunch","Side plank","Lying knee raise","Pallof press","Bicycle crunch"],["Hanging knee raise","Ab-wheel rollout","Weighted plank","Cable crunch","Pallof press"]]}
  ];
  const levels=["beginner","intermediate","advanced"];
  const levelLabels={en:["Beginner","Intermediate","Advanced"],de:["Anfänger","Mittelstufe","Fortgeschritten"],fa:["مبتدی","متوسط","پیشرفته"]};
  const prescriptions=[
    [{sets:2,reps:"10–12",rest:"60–75 sec"},{sets:2,reps:"10–12",rest:"60–75 sec"},{sets:2,reps:"10–12",rest:"60–75 sec"},{sets:2,reps:"12",rest:"60 sec"},{sets:2,reps:"20–30 sec / 10 min",rest:"45 sec"}],
    [{sets:3,reps:"8–12",rest:"75–90 sec"},{sets:3,reps:"10–12",rest:"60–90 sec"},{sets:3,reps:"10–12",rest:"60–75 sec"},{sets:3,reps:"10 each leg",rest:"60–75 sec"},{sets:1,reps:"15–20 min",rest:"—"}],
    [{sets:4,reps:"5–8",rest:"2–3 min"},{sets:3,reps:"8–10",rest:"90–120 sec"},{sets:3,reps:"8–12",rest:"75–90 sec"},{sets:3,reps:"8–10",rest:"90 sec"},{sets:3,reps:"12–15 / 10 min",rest:"60 sec"}]
  ];
  const products=[];
  categories.forEach(cat=>levels.forEach((level,i)=>{
    const id=`${cat.id}-${level}`;
    products.push({id,category:cat.id,categoryKey:cat.key,level,index:i,name:cat.names[i],price:cat.prices[i],days:cat.days[i],exercises:cat.ex[i].map((name,j)=>({name,...prescriptions[i][j]}))});
  }));
  const coaching=[
    {id:"coach-single",titleKey:"single",descKey:"session",price:39},
    {id:"coach-4",titleKey:"four",descKey:"sessions4",price:139},
    {id:"coach-8",titleKey:"eight",descKey:"sessions8",price:249},
    {id:"coach-vip",titleKey:"vip",descKey:"vipdesc",price:199}
  ];
  let lang=document.documentElement.lang||"en";
  const tr=k=>(words[lang]||words.en)[k]||words.en[k]||k;
  const safe=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const section=document.createElement("section");
  section.id="program-store"; section.className="section pg-store";
  function render(){
    lang=document.documentElement.lang||lang||"en";
    const isFa=lang==="fa";
    section.dir=isFa?"rtl":"ltr";
    section.innerHTML=`
      <div class="section-head pg-heading"><div><span class="section-kicker">${tr("kicker")}</span><h2>${tr("title")}</h2></div><p>${tr("lead")}</p></div>
      <div class="pg-filter" role="group" aria-label="${tr("filter")}"><button class="active" data-filter="all">${tr("filter")}</button>${categories.map(c=>`<button data-filter="${c.id}">${tr(c.key)}</button>`).join("")}</div>
      <div class="pg-grid">${products.map(p=>`<article class="pg-card" data-category="${p.category}">
        <div class="pg-card-top"><span>${tr(p.categoryKey)}</span><span class="pg-level">${levelLabels[lang][p.index]}</span></div>
        <h3>${safe(p.name)}</h3><p class="pg-meta">${tr("level")}: ${levelLabels[lang][p.index]} · ${tr("days")}: ${p.days}</p>
        <div class="pg-price">${money(p.price)}</div>
        <button class="pg-btn pg-outline" data-view="${p.id}">${tr("details")}</button>
        <button class="pg-btn pg-buy" data-buy="${p.id}">${tr("buy")}</button>
      </article>`).join("")}</div>
      <p class="pg-secure">${tr("secure")}</p><p class="pg-note">${tr("note")}</p>
      <div class="pg-modal" id="pg-modal" aria-hidden="true"><div class="pg-dialog" role="dialog" aria-modal="true"><button class="pg-x" data-close aria-label="${tr("close")}">×</button><div id="pg-modal-content"></div></div></div>
      <section class="pg-coaching" id="one-to-one"><div class="section-head center"><span class="section-kicker">${tr("coachingKicker")}</span><h2>${tr("coachingTitle")}</h2><p>${tr("coachingLead")}</p></div><div class="pg-coach-grid">${coaching.map((c,i)=>`<article class="pg-card pg-coach-card ${i===1?"pg-highlight":""}"><span class="pg-level">${i===1?"POPULAR": "1:1 COACHING"}</span><h3>${tr(c.titleKey)}</h3><p>${tr(c.descKey)}</p><div class="pg-price">${money(c.price)}</div><button class="pg-btn pg-buy" data-buy="${c.id}">${tr("book")}</button></article>`).join("")}</div></section>`;
    section.querySelectorAll("[data-filter]").forEach(b=>b.addEventListener("click",()=>{section.querySelectorAll("[data-filter]").forEach(x=>x.classList.toggle("active",x===b));section.querySelectorAll(".pg-card[data-category]").forEach(card=>card.hidden=b.dataset.filter!=="all"&&card.dataset.category!==b.dataset.filter)}));
    section.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>showProduct(b.dataset.view)));
    section.querySelectorAll("[data-buy]").forEach(b=>b.addEventListener("click",()=>checkout(b.dataset.buy)));
    section.querySelector("[data-close]").addEventListener("click",closeModal);
    section.querySelector("#pg-modal").addEventListener("click",e=>{if(e.target.id==="pg-modal")closeModal()});
  }
  function showProduct(id){
    const p=products.find(x=>x.id===id); if(!p)return;
    const rows=p.exercises.map(e=>`<tr><td>${safe(e.name)}</td><td>${e.sets}</td><td>${e.reps}</td><td>${e.rest}</td></tr>`).join("");
    const modal=section.querySelector("#pg-modal");
    section.querySelector("#pg-modal-content").innerHTML=`<span class="section-kicker">${tr(p.categoryKey)} · ${levelLabels[lang][p.index]}</span><h2>${safe(p.name)}</h2><p>${tr("weekly")}: ${p.days} ${tr("days").toLowerCase()} · ${tr("weeks")}</p><div class="pg-table-wrap"><table><thead><tr><th>${tr("exercise")}</th><th>${tr("sets")}</th><th>${tr("reps")}</th><th>${tr("rest")}</th></tr></thead><tbody>${rows}</tbody></table></div><p class="pg-price">${money(p.price)}</p><button class="pg-btn pg-buy" data-modal-buy="${p.id}">${tr("buy")}</button>`;
    section.querySelector("[data-modal-buy]").addEventListener("click",()=>checkout(id));
    modal.classList.add("open"); modal.setAttribute("aria-hidden","false");
  }
  function closeModal(){const m=section.querySelector("#pg-modal");m.classList.remove("open");m.setAttribute("aria-hidden","true")}
  async function checkout(productId){
    if(API_BASE.includes("YOUR-CLOUDFLARE-WORKER")){
      alert(tr("unavailable")); window.open(`${TG}?text=${encodeURIComponent("Hi Pavlos, I am interested in "+productId)}`,"_blank","noopener"); return;
    }
    try{
      const res=await fetch(`${API_BASE}/api/create-checkout`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({productId,language:lang})});
      const data=await res.json(); if(!res.ok||!data.url)throw new Error(data.error||"Checkout failed");
      location.href=data.url;
    }catch(err){console.error(err);alert(tr("unavailable"))}
  }
  const nav=document.querySelector(".desktop-nav");
  if(nav&&!nav.querySelector('[href="#program-store"]')){const a=document.createElement("a");a.href="#program-store";a.textContent=words.en.nav;nav.insertBefore(a,nav.querySelector('[href="#coaching"]'));}
  const connect=document.querySelector("#connect");
  if(connect)connect.parentNode.insertBefore(section,connect); else document.querySelector("main").appendChild(section);
  document.querySelectorAll("[data-lang]").forEach(b=>b.addEventListener("click",()=>setTimeout(render,0)));
  render();

  // Stripe redirects back here only after Checkout. The Worker independently verifies payment before serving the PDF.
  const params=new URLSearchParams(location.search);
  if(params.get("paid")==="1"&&params.get("session_id")){
    const status=document.createElement("div");status.className="pg-payment-status";status.textContent=tr("success");section.prepend(status);
    fetch(`${API_BASE}/api/download?session_id=${encodeURIComponent(params.get("session_id"))}`)
      .then(async r=>{if(r.status===204){status.textContent=tr("coachingPaid");const link=document.createElement("a");link.href=TG;link.target="_blank";link.rel="noopener";link.textContent="Telegram ↗";link.className="pg-btn pg-buy";status.append(" ");status.append(link);return null;}if(!r.ok)throw new Error("Not paid or PDF unavailable");return r.blob()})
      .then(blob=>{if(!blob)return;const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="pavlosgetfit-training-plan.pdf";a.textContent=tr("download");a.className="pg-btn pg-buy";status.append(" ");status.append(a);})
      .catch(()=>{status.textContent=tr("downloadFail")});
  }
})();