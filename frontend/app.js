let map = null;
let currentPolygon = null;
let selectedDocumentFile = null;

const cases = {
  clean: {
    parcelId: "PARCEL-BD-DHK-125",
    title: "দাগ নং ১২৫ / খতিয়ান নং ৪৫৬ (আরএস)",
    owner: "মোঃ আনিসুর রহমান",
    lastTx: "২০১৫ (দলিল #৮৮৪)",
    area: "৫.০০ শতক (Decimal)",
    balance: "অবশিষ্ট: ৫.০০ শতক (পর্যাপ্ত)",
    timestamp: "2026-10-03 17:45 UTC (Verified)",
    mutationStatus: "মঞ্জুরকৃত ও সক্রিয়",
    docId: "DEED-2015-884",
    docHash: "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
    plainSummary: "এই দলিলটি সম্পূর্ণ বৈধ ও নিঃস্বত্ব বিক্রয় কবলা দলিল। মূল মালিক আব্দুল করিম (আরএস খতিয়ান ৪৫৬) ২০১৫ সালে সম্পূর্ণ ৫.০০ শতাংশ জমি বর্তমান মালিক আনিসুর রহমানের নিকট রেজিস্ট্রি সম্পাদন করেছেন। পরবর্তীতে ২০১৬ সালে এসিল্যান্ড অফিস কর্তৃক ই-নামজারি সম্পন্ন হয়েছে। কোনো উত্তরাধিকার সংক্রান্ত জটিলতা বা অতিরিক্ত হস্তান্তর নেই।",
    verdict: {
      status: "CLEAN",
      title: "কোনো অসঙ্গতি পরিলক্ষিত হয়নি",
      subtext: "মালিকানার ধারাবাহিকতা অটুট এবং দাগ ব্যালেন্স সম্পূর্ণ সুসংগত",
      badgeClass: "bg-emerald-950/40 border-emerald-500/40 text-emerald-400",
      iconClass: "bg-emerald-500/20 text-emerald-400",
      icon: "fa-shield-check"
    },
    graphHtml: `
      <div class="w-full flex items-center justify-between max-w-xl mx-auto py-2">
        <div class="text-center p-3 bg-slate-900 border border-slate-700/80 rounded-2xl w-36 shadow-xl">
          <i class="fa-solid fa-user-tie text-blue-400 text-base mb-1"></i>
          <div class="text-xs font-bold text-white">আব্দুল করিম</div>
          <div class="text-[9px] text-slate-400 font-mono mt-0.5">আরএস রেকর্ড (২০০৫)</div>
        </div>
        <div class="flex-1 flex flex-col items-center px-2">
          <span class="text-[9px] font-mono text-emerald-400 mb-1">কবলা #৮৮৪</span>
          <div class="w-full h-0.5 bg-gradient-to-r from-blue-500 via-emerald-500 to-emerald-400 relative">
            <i class="fa-solid fa-chevron-right absolute -right-1 -top-1.5 text-xs text-emerald-400"></i>
          </div>
          <span class="text-[8px] text-slate-400 font-mono mt-1">৫.০০ শতক</span>
        </div>
        <div class="text-center p-3 bg-emerald-950/30 border border-emerald-500/60 rounded-2xl w-36 shadow-xl">
          <i class="fa-solid fa-user-check text-emerald-400 text-base mb-1"></i>
          <div class="text-xs font-bold text-white">আনিসুর রহমান</div>
          <div class="text-[9px] text-emerald-400 font-mono mt-0.5">বর্তমান (২০১৫)</div>
        </div>
        <div class="flex-1 flex flex-col items-center px-2">
          <span class="text-[9px] font-mono text-purple-400 mb-1">ই-নামজারি</span>
          <div class="w-full h-0.5 bg-gradient-to-r from-emerald-500 to-purple-500 relative">
            <i class="fa-solid fa-chevron-right absolute -right-1 -top-1.5 text-xs text-purple-400"></i>
          </div>
          <span class="text-[8px] text-slate-400 font-mono mt-1">কেস #৪৪১</span>
        </div>
        <div class="text-center p-3 bg-slate-900 border border-slate-700/80 rounded-2xl w-36 shadow-xl">
          <i class="fa-solid fa-file-signature text-purple-400 text-base mb-1"></i>
          <div class="text-xs font-bold text-white">খতিয়ান ৪৫৬</div>
          <div class="text-[9px] text-slate-400 font-mono mt-0.5">মিউটেশন সম্পন্ন</div>
        </div>
      </div>
    `,
    surveys: [
      { gen: "CS (১৯৪০)", khat: "১২", plot: "৮৮", area: "৫.০০ শতক", owner: "রহিমউদ্দিন" },
      { gen: "SA (১৯৬২)", khat: "৩৪", plot: "৯০", area: "৫.০০ শতক", owner: "কফিলউদ্দিন" },
      { gen: "RS (১৯৮৫)", khat: "৪৫৬", plot: "১২৫", area: "৫.০০ শতক", owner: "আব্দুল করিম" },
      { gen: "BS (২০১২)", khat: "৭৮৯", plot: "১২৫", area: "৫.০০ শতক", owner: "মোঃ আনিসুর রহমান" }
    ],
    heirs: [
      { rel: "পুত্র (Son)", name: "তারিকুল ইসলাম", fraction: "২/৩ হিস্যা", area: "৩.৩৩ শতক" },
      { rel: "কন্যা (Daughter)", name: "ফাতেমা বেগম", fraction: "১/৩ হিস্যা", area: "১.৬৭ শতক" }
    ],
    timeline: [
      { year: "২০১৬", title: "ই-নামজারি অনুমোদন", badge: "সহকারী কমিশনার (ভূমি)", desc: "আনিসুর রহমানের নামে ৫.০০ শতক জমি খারিজ ও নতুন খতিয়ান চূড়ান্ত।" },
      { year: "২০১৫", title: "বিক্রয় কবলা দলিল রেজিস্ট্রেশন", badge: "সাব-রেজিস্ট্রি অফিস", desc: "আব্দুল করিম হইতে ৫.০০ শতক জমি সম্পূর্ণ মূল্যে দলিল #৮৮৪ মূলে ক্রয়।" },
      { year: "২০০৫", title: "আরএস খতিয়ান চূড়ান্তকরণ", badge: "ভূমি রেকর্ড ও জরিপ", desc: "দাগ ১২৫-এ আব্দুল করিমের নামে ৫.০০ শতক জমি জরিপ রেকর্ডভুক্ত।" }
    ],
    flags: [
      { severity: "VERIFIED", title: "মালিকানার ধারাবাহিকতা সুসংগত (Valid Chain)", evidence: "২০০৫ এর আরএস রেকর্ডীয় মালিকের ধারাবাহিকতায় ২০১৫-এর বিক্রয় দলিল যথাযথ সমর্থিত।" },
      { severity: "VERIFIED", title: "দাগ ব্যালেন্স ও ফারায়েজ সামঞ্জস্যপূর্ণ", evidence: "দাগে কোনো অতিরিক্ত বিক্রয় নেই এবং ওয়ারিশান অংশ অতিক্রম করা হয়নি।" }
    ],
    checklist: [
      { ok: true, text: "খতিয়ান ও দলিল দাগ নম্বর পুরোপুরি ম্যাচ করেছে" },
      { ok: true, text: "সহকারী কমিশনার (ভূমি) অফিস কর্তৃক নামজারি কার্যকর" },
      { ok: true, text: "উত্তরাধিকার ফারায়েজ অংশের মধ্যে জমি বিক্রি সীমাবদ্ধ" },
      { ok: true, text: "কোনো বিচারাধীন মামলা বা দ্বৈত বায়নাপত্র নেই" }
    ],
    gisCoords: [23.7501, 90.3901],
    gisPolygon: [
      [23.7504, 90.3897],
      [23.7506, 90.3906],
      [23.7497, 90.3909],
      [23.7495, 90.3900]
    ],
    gisStatusText: "কোনো সড়ক বা সরকারি খাস জমিতে ওভারল্যাপ নেই",
    certNote: "উক্ত জমির চেইন অব টাইটেল, দাগের লেজার ব্যালেন্স ও ফারায়েজ যাচাইপূর্বক কোনো অনিয়ম পাওয়া যায়নি। জমিটি বর্তমান রেকর্ডে হস্তান্তরযোগ্য ও নিরাপদ হিসেবে চিহ্নিত।"
  },

  fraud: {
    parcelId: "PARCEL-BD-DHK-204",
    title: "দাগ নং ২০৪ / খতিয়ান নং ৯১২ (বিএস)",
    owner: "মোঃ কামরুল হাসান (আপত্তিযুক্ত দাবিদার)",
    lastTx: "২০২৩ (দলিল #DEED-2023-F91)",
    area: "৬.০০ শতক (Decimal)",
    balance: "অবশিষ্ট: ০.০০ শতক (ঘাটতি: ৪.০০ শতক)",
    timestamp: "2026-10-03 17:48 UTC (Tamper Alert)",
    mutationStatus: "স্থগিত / প্রতারণা ফ্ল্যাগড",
    docId: "DEED-2023-F91",
    docHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    plainSummary: "সতর্কতা: দলিল #DEED-2023-F91-এ গুরুতর প্রতারণা রয়েছে। পূর্ববর্তী ২০২২ সালের দলিলে মূল মালিক আব্দুর রউফ ৪.০০ শতক বিক্রি করায় দাগে অবশিষ্ট ছিল মাত্র ২.০০ শতক। অথচ সেলিম চৌধুরী (যিনি কোনো ওয়ারিশ বা ক্রেতা নন) সম্পূর্ণ ৬.০০ শতক জমি কামরুল হাসানের নিকট বিক্রির জাল দলিল তৈরি করেছেন।",
    verdict: {
      status: "FRAUD",
      title: "৪টি গুরুতর অসঙ্গতি ও ডাবল-সেলিং শনাক্ত!",
      subtext: "দাগ ব্যালেন্স অতিরিক্ত বিক্রয়, জরিপ গরমিল ও চেইন বিচ্ছিন্নতা প্রমাণিত",
      badgeClass: "bg-rose-950/40 border-rose-500/50 text-rose-400 animate-pulse",
      iconClass: "bg-rose-500/20 text-rose-400",
      icon: "fa-triangle-exclamation"
    },
    graphHtml: `
      <div class="w-full flex items-center justify-between max-w-xl mx-auto py-2">
        <div class="text-center p-3 bg-slate-900 border border-slate-700/80 rounded-2xl w-36 shadow-xl">
          <i class="fa-solid fa-user-shield text-slate-400 text-base mb-1"></i>
          <div class="text-xs font-bold text-white">আব্দুর রউফ</div>
          <div class="text-[9px] text-slate-400 font-mono mt-0.5">আসল মালিক (২০২০)</div>
        </div>
        <div class="flex-1 flex flex-col items-center px-2">
          <span class="text-[9px] font-mono text-rose-400 mb-1 font-bold">বিচ্ছিন্ন লিঙ্ক (!)</span>
          <div class="w-full h-0.5 bg-rose-500 relative">
            <i class="fa-solid fa-xmark absolute -right-1 -top-2 text-xs text-rose-400"></i>
          </div>
          <span class="text-[8px] text-rose-300 font-mono mt-1">টাইটেল গ্যাপ</span>
        </div>
        <div class="text-center p-3 bg-rose-950/60 border border-rose-500 rounded-2xl w-36 shadow-xl relative">
          <span class="absolute -top-1.5 -right-1.5 bg-rose-600 text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold">!</span>
          <i class="fa-solid fa-user-slash text-rose-400 text-base mb-1"></i>
          <div class="text-xs font-bold text-white">সেলিম চৌধুরী</div>
          <div class="text-[9px] text-rose-300 font-mono mt-0.5">অসম্পৃক্ত বিক্রেতা</div>
        </div>
        <div class="flex-1 flex flex-col items-center px-2">
          <span class="text-[9px] font-mono text-rose-400 mb-1 font-bold">ডাবল সেল</span>
          <div class="w-full h-0.5 bg-rose-500 relative">
            <i class="fa-solid fa-triangle-exclamation absolute -right-1 -top-2 text-xs text-rose-400"></i>
          </div>
          <span class="text-[8px] text-rose-300 font-mono mt-1">অতিরিক্ত বিক্রি</span>
        </div>
        <div class="text-center p-3 bg-slate-900 border border-rose-700/60 rounded-2xl w-36 shadow-xl">
          <i class="fa-solid fa-hand-holding-dollar text-amber-400 text-base mb-1"></i>
          <div class="text-xs font-bold text-white">কামরুল হাসান</div>
          <div class="text-[9px] text-rose-400 font-mono mt-0.5">প্রতারিত ক্রেতা</div>
        </div>
      </div>
    `,
    surveys: [
      { gen: "CS (১৯৪০)", khat: "১০১", plot: "১৫০", area: "৬.০০ শতক", owner: "শেখ মজিদ" },
      { gen: "SA (১৯৬২)", khat: "১৯০", plot: "১৫২", area: "৬.০০ শতক", owner: "শেখ হাশেম" },
      { gen: "RS (১৯৮৫)", khat: "৩২০", plot: "২০৪", area: "৬.০০ শতক", owner: "আব্দুর রউফ" },
      { gen: "BS (২০১২)", khat: "৯১২", plot: "২০৪", area: "৮.৫০ শতক (অনিয়ম)", owner: "অজ্ঞাত / অমিল" }
    ],
    heirs: [
      { rel: "স্ত্রী (Wife)", name: "রোকেয়া বেগম", fraction: "১/৮ হিস্যা", area: "০.৭৫ শতক" },
      { rel: "পুত্র (Son)", name: "জাহিদ রউফ", fraction: "৭/৮ হিস্যা", area: "৫.২৫ শতক" }
    ],
    timeline: [
      { year: "২০২৩", title: "সন্দেহজনক দলিল রেজিস্ট্রেশন প্রয়াস", badge: "রিজেক্টেড", desc: "সেলিম চৌধুরী নামক অসম্পৃক্ত ব্যক্তি দ্বারা ৬.০০ শতক বিক্রির চেষ্টা।" },
      { year: "২০২২", title: "বৈধ হস্তান্তর (দলিল #৮৯১)", badge: "সাব-রেজিস্ট্রি", desc: "আসল মালিক আব্দুর রউফ কর্তৃক অন্য ক্রেতার নিকট ৪.০০ শতক জমি হস্তান্তর।" },
      { year: "২০২০", title: "বিএস জরিপ চূড়ান্তকরণ", badge: "ভূমি রেকর্ড", desc: "আব্দুর রউফের নামে মোট ৬.০০ শতক জমি রেকর্ডভুক্ত হয়।" }
    ],
    flags: [
      { severity: "CRITICAL", title: "দাগ ব্যালেন্স অতিরিক্ত বিক্রয় (Insufficient Balance)", evidence: "মোট জমি ৬ শতক থেকে ৪ শতক বিক্রির পর অবশিষ্ট ছিল মাত্র ২ শতক। অথচ নতুন দলিলে ৬ শতক বিক্রির চেষ্টা করা হয়েছে।" },
      { severity: "CRITICAL", title: "চেইন অব টাইটেল বিচ্ছিন্ন (Broken Chain)", evidence: "বিক্রেতা সেলিম চৌধুরীর নামে কোনো পূর্ববর্তী দলিল বা ওয়ারিশান হিস্যা নেই।" },
      { severity: "WARNING", title: "বিএস জরিপে জমির অস্বাভাবিক পরিমাপ বৃদ্ধি", evidence: "আরএস-এ ৬ শতক থাকলেও বিএস-এ কোনো রেজিস্টার্ড দলিল ছাড়া ৮.৫০ শতক রেকর্ড হয়েছে।" }
    ],
    checklist: [
      { ok: false, text: "মালিকানার ধারাবাহিক চেইন বিদ্যমান নেই (Broken Title)" },
      { ok: false, text: "দাগ লেজারে পর্যাপ্ত জমি অবশিষ্ট নেই (Over-sold)" },
      { ok: false, text: "বিএস জরিপের রেকর্ডে অসঙ্গতি রয়েছে" },
      { ok: true, text: "সরকারি খাস বা পরিত্যক্ত তালিকাভুক্ত নয়" }
    ],
    gisCoords: [23.7610, 90.3810],
    gisPolygon: [
      [23.7614, 90.3805],
      [23.7618, 90.3815],
      [23.7607, 90.3820],
      [23.7602, 90.3809]
    ],
    gisStatusText: "সতর্কতা: ডাবল সেলিং ও টাইটেল কনফ্লিক্ট বাউন্ডারিতে ফ্ল্যাগড",
    certNote: "সতর্কতা: উক্ত দাগে দ্বৈত বিক্রয়ের সুস্পষ্ট প্রমাণ, দাগ ব্যালেন্স ঘাটতি এবং জরিপে অমিল পাওয়া গেছে। জমিটি উচ্চ ঝুঁকিপূর্ণ।"
  }
};

let currentCase = 'clean';

function initMap() {
  if (map) return;
  map = L.map('gis-map').setView([23.7501, 90.3901], 16);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
}

function updateMap(data) {
  if (!map) initMap();
  map.setView(data.gisCoords, 16);

  if (currentPolygon) {
    map.removeLayer(currentPolygon);
  }

  const color = data.verdict.status === 'CLEAN' ? '#10b981' : '#f43f5e';
  currentPolygon = L.polygon(data.gisPolygon, {
    color: color,
    fillColor: color,
    fillOpacity: 0.35,
    weight: 2
  }).addTo(map);

  currentPolygon.bindPopup(`<b>${data.title}</b><br>${data.owner}`).openPopup();
  document.getElementById('gis-coords-display').innerHTML = `<i class="fa-solid fa-crosshairs text-emerald-400 mr-1"></i>${data.gisCoords[0]}° N, ${data.gisCoords[1]}° E`;
  document.getElementById('gis-status-display').innerHTML = data.verdict.status === 'CLEAN' 
    ? `<i class="fa-solid fa-circle-check text-emerald-400 mr-1"></i>${data.gisStatusText}` 
    : `<i class="fa-solid fa-triangle-exclamation text-rose-400 mr-1"></i>${data.gisStatusText}`;
}

function renderUI() {
  const data = cases[currentCase];

  document.getElementById('badge-parcel-id').innerText = data.parcelId;
  document.getElementById('parcel-title').innerText = data.title;
  document.getElementById('parcel-owner').innerText = data.owner;
  document.getElementById('parcel-last-tx').innerText = data.lastTx;
  document.getElementById('meta-area').innerText = data.area;
  document.getElementById('meta-balance').innerText = data.balance;
  document.getElementById('meta-timestamp').innerText = data.timestamp;
  document.getElementById('plain-bangla-text').innerText = data.plainSummary;

  // Verdict Box
  const vBox = document.getElementById('verdict-box');
  vBox.className = `flex items-center gap-4 border p-4 rounded-xl backdrop-blur-md shadow-lg ${data.verdict.badgeClass}`;
  document.getElementById('verdict-icon').className = `w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${data.verdict.iconClass}`;
  document.getElementById('verdict-icon').innerHTML = `<i class="fa-solid ${data.verdict.icon}"></i>`;
  document.getElementById('verdict-text').innerText = data.verdict.title;
  document.getElementById('verdict-subtext').innerText = data.verdict.subtext;

  // Mutation
  const mut = document.getElementById('meta-mutation');
  if (data.verdict.status === 'CLEAN') {
    mut.className = "text-sm font-bold text-emerald-400 mt-0.5";
    mut.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${data.mutationStatus}`;
  } else {
    mut.className = "text-sm font-bold text-rose-400 mt-0.5";
    mut.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> ${data.mutationStatus}`;
  }

  // Graph
  document.getElementById('graph-container').innerHTML = data.graphHtml;

  // Survey Cross-Matcher Table
  const sTable = document.getElementById('survey-table-body');
  sTable.innerHTML = '';
  data.surveys.forEach(s => {
    sTable.innerHTML += `
      <tr class="hover:bg-slate-800/40 transition">
        <td class="py-2.5 px-3 font-mono text-emerald-400 font-semibold">${s.gen}</td>
        <td class="py-2.5 px-3">${s.khat}</td>
        <td class="py-2.5 px-3">${s.plot}</td>
        <td class="py-2.5 px-3 font-medium ${s.area.includes('অনিয়ম') ? 'text-rose-400 font-bold' : ''}">${s.area}</td>
        <td class="py-2.5 px-3 text-slate-400">${s.owner}</td>
      </tr>
    `;
  });

  // Timeline
  document.getElementById('timeline-count').innerText = `${data.timeline.length}টি রেকর্ড পাওয়া গেছে`;
  const tList = document.getElementById('timeline-list');
  tList.innerHTML = '';
  data.timeline.forEach(t => {
    tList.innerHTML += `
      <div class="relative pl-6 border-l-2 border-slate-800 pb-2">
        <span class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-950 border-2 ${data.verdict.status === 'CLEAN' ? 'border-emerald-500' : 'border-rose-500'}"></span>
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold text-white">${t.year} — ${t.title}</span>
          <span class="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">${t.badge}</span>
        </div>
        <p class="text-xs text-slate-400 mt-1">${t.desc}</p>
      </div>
    `;
  });

  // Flags
  const fBox = document.getElementById('discrepancy-flags');
  fBox.innerHTML = '';
  data.flags.forEach(f => {
    const isClean = f.severity === 'VERIFIED';
    const border = isClean ? 'border-emerald-800/40 bg-emerald-950/20 text-emerald-300' : 'border-rose-800/60 bg-rose-950/30 text-rose-300';
    const icon = isClean ? 'fa-check' : 'fa-triangle-exclamation';
    fBox.innerHTML += `
      <div class="border ${border} p-3.5 rounded-xl text-xs space-y-1">
        <div class="font-bold flex items-center gap-2 text-white">
          <i class="fa-solid ${icon} ${isClean ? 'text-emerald-400' : 'text-rose-400'}"></i> ${f.title}
        </div>
        <p class="text-slate-300 text-[11px] leading-relaxed">${f.evidence}</p>
      </div>
    `;
  });

  // Heirs
  const hBox = document.getElementById('heirs-container');
  hBox.innerHTML = '';
  data.heirs.forEach(h => {
    hBox.innerHTML += `
      <div class="flex items-center justify-between p-2.5 rounded-xl bg-[#050811] border border-slate-800">
        <div>
          <div class="font-semibold text-slate-200">${h.name}</div>
          <div class="text-[10px] text-teal-400">${h.rel} — ${h.fraction}</div>
        </div>
        <div class="font-mono text-emerald-400 font-bold">${h.area}</div>
      </div>
    `;
  });

  // Checklist
  const cBox = document.getElementById('checklist-items');
  cBox.innerHTML = '';
  data.checklist.forEach(c => {
    cBox.innerHTML += `
      <div class="flex items-center justify-between p-3 rounded-xl bg-[#050811] border border-slate-800">
        <span class="text-slate-300">${c.text}</span>
        <i class="fa-solid ${c.ok ? 'fa-circle-check text-emerald-400' : 'fa-circle-xmark text-rose-500'} text-sm"></i>
      </div>
    `;
  });

  // Modal Info Sync
  document.getElementById('cert-plot').innerText = data.title;
  document.getElementById('cert-owner').innerText = data.owner;
  document.getElementById('cert-area').innerText = `${data.area} (তেজগাঁও, ঢাকা)`;
  document.getElementById('cert-balance').innerText = data.balance;
  
  const certVBox = document.getElementById('cert-verdict-box');
  if(data.verdict.status === 'CLEAN') {
    certVBox.className = "p-3.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-900";
    certVBox.innerHTML = `<strong>✓ নিরাপদ হিসেবে প্রতীয়মান:</strong> ${data.certNote}`;
  } else {
    certVBox.className = "p-3.5 rounded-xl border border-rose-300 bg-rose-50 text-rose-900";
    certVBox.innerHTML = `<strong>⚠️ উচ্চ ঝুঁকিপূর্ণ সম্পত্তি:</strong> ${data.certNote}`;
  }

  // Real Map Update
  updateMap(data);
}

function switchCase(type) {
  currentCase = type;
  if (type === 'clean') {
    document.getElementById('btn-case-clean').className = "text-xs px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold shadow-md shadow-emerald-900/40 transition";
    document.getElementById('btn-case-fraud').className = "text-xs px-3.5 py-1.5 rounded-lg bg-slate-900 text-slate-300 font-semibold hover:text-white transition";
    document.getElementById('search-plot-input').value = "১২৫";
    document.getElementById('search-khatian').value = "456";
  } else {
    document.getElementById('btn-case-fraud').className = "text-xs px-3.5 py-1.5 rounded-lg bg-rose-600 text-white font-semibold shadow-md shadow-rose-900/40 transition";
    document.getElementById('btn-case-clean').className = "text-xs px-3.5 py-1.5 rounded-lg bg-slate-900 text-slate-300 font-semibold hover:text-white transition";
    document.getElementById('search-plot-input').value = "২০৪";
    document.getElementById('search-khatian').value = "912";
  }
  renderUI();
}

function handleManualSearch() {
  const val = document.getElementById('search-plot-input').value.trim();
  if (val === '২০৪' || val === '204') {
    switchCase('fraud');
  } else {
    switchCase('clean');
  }
}

// Modal Handlers
function openVerificationModal() {
  document.getElementById('cert-modal').classList.remove('hidden');
}
function closeVerificationModal() {
  document.getElementById('cert-modal').classList.add('hidden');
}

function openOCRModal() {
  document.getElementById('ocr-modal').classList.remove('hidden');
  resetOCRState();
}
function closeOCRModal() {
  document.getElementById('ocr-modal').classList.add('hidden');
}

function resetOCRState() {
  const laser = document.getElementById('scanner-laser');
  laser.classList.remove('laser-active');
  
  document.getElementById('ocr-icon').classList.remove('hidden');
  document.getElementById('ocr-preview-img').classList.add('hidden');
  document.getElementById('ocr-preview-img').src = '';
  
  document.getElementById('ocr-status-text').innerText = "দলিল বা খতিয়ান কপি আপলোড করুন";
  document.getElementById('ocr-sub-text').innerText = "ফরম্যাট: PDF / JPG (সর্বোচ্চ ১০ মেগাবাইট)";
  document.getElementById('ocr-res-filename').innerText = "কোনো ফাইল নেই";
  document.getElementById('ocr-res-deed').innerText = "--";
  document.getElementById('ocr-res-plot').innerText = "--";
  document.getElementById('ocr-res-area').innerText = "--";
  document.getElementById('ocr-res-hash').innerText = "--";
  
  const downloadBtn = document.getElementById('btn-download-ocr-report');
  if (downloadBtn) downloadBtn.classList.add('hidden');

  const btn = document.getElementById('btn-run-ocr');
  btn.disabled = false;
  btn.innerHTML = `<i class="fa-solid fa-bolt"></i> স্ক্যান ও এক্সট্র্যাক্ট শুরু করুন`;
  
  selectedDocumentFile = null;
  document.getElementById('doc-file-input').value = "";
  document.getElementById('camera-file-input').value = "";
}

// File / Camera Select Handler
function handleFileSelect(event) {
  const file = event.target.files[0];
  if (!file) return;

  selectedDocumentFile = file;
  document.getElementById('ocr-res-filename').innerText = file.name;
  document.getElementById('ocr-status-text').innerText = `${file.name} ফাইলটি প্রস্তুত হয়েছে`;
  document.getElementById('ocr-sub-text').innerText = `সাইজ: ${(file.size / 1024).toFixed(1)} KB | স্ক্যান শুরু করতে নিচের বাটনে চাপুন`;

  if (file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.getElementById('ocr-preview-img');
      img.src = e.target.result;
      img.classList.remove('hidden');
      document.getElementById('ocr-icon').classList.add('hidden');
    };
    reader.readAsDataURL(file);
  } else {
    document.getElementById('ocr-preview-img').classList.add('hidden');
    document.getElementById('ocr-icon').classList.remove('hidden');
  }
}

function runOCRScanSimulation() {
  const laser = document.getElementById('scanner-laser');
  const btn = document.getElementById('btn-run-ocr');
  
  laser.classList.add('laser-active');
  btn.disabled = true;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> স্ক্যানিং ও OCR প্রসেসিং চলছে...`;
  document.getElementById('ocr-status-text').innerText = "বাংলা হরফ বিশ্লেষণ ও ক্রিপ্টো হ্যাশিং প্রসেসিং হচ্ছে...";

  setTimeout(() => {
    laser.classList.remove('laser-active');
    btn.innerHTML = `<i class="fa-solid fa-check"></i> এক্সট্র্যাক্ট সম্পন্ন`;
    document.getElementById('ocr-status-text').innerText = "দলিলের মেটাডেটা সফলভাবে নিষ্কাশন করা হয়েছে!";
    
    const data = cases[currentCase];
    const generatedHash = selectedDocumentFile 
      ? "e83f" + Math.random().toString(16).substring(2, 10) + data.docHash.substring(12) 
      : data.docHash;

    document.getElementById('ocr-res-deed').innerText = data.docId;
    document.getElementById('ocr-res-plot').innerText = data.title;
    document.getElementById('ocr-res-area').innerText = data.area;
    document.getElementById('ocr-res-hash').innerText = generatedHash;

    const downloadBtn = document.getElementById('btn-download-ocr-report');
    if (downloadBtn) downloadBtn.classList.remove('hidden');
  }, 1600);
}

function downloadOCRReport() {
  closeOCRModal();
  openVerificationModal();
  setTimeout(() => {
    window.print();
  }, 350);
}

window.onload = () => {
  initMap();
  renderUI();
};