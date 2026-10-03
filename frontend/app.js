// Synthetic Intelligence Dataset (Fully Compliant with Hackathon Rule 8)
const cases = {
  clean: {
    parcelId: "PARCEL-BD-DHK-125",
    title: "দাগ নং ১২৫ / খতিয়ান নং ৪৫৬ (আরএস)",
    owner: "মোঃ আনিসুর রহমান",
    lastTx: "২০১৫ (দলিল #৮৮৪)",
    area: "৫.০০ শতাংশ (Decimal)",
    hash: "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
    mutationStatus: "মঞ্জুরকৃত ও সক্রিয়",
    verdict: {
      status: "CLEAN",
      title: "কোনো অসঙ্গতি পরিলক্ষিত হয়নি",
      subtext: "মালিকানার ধারাবাহিকতা অটুট এবং কোনো সক্রিয় দ্বৈত বিক্রি নেই",
      badgeClass: "bg-emerald-950/40 border-emerald-500/40 text-emerald-400",
      iconClass: "bg-emerald-500/20 text-emerald-400",
      icon: "fa-shield-check"
    },
    graphHtml: `
      <div class="w-full flex items-center justify-between max-w-xl mx-auto py-2">
        <div class="text-center p-3.5 bg-slate-900 border border-slate-700/80 rounded-2xl w-40 shadow-xl">
          <i class="fa-solid fa-user-tie text-blue-400 text-lg mb-1"></i>
          <div class="text-xs font-bold text-white">আব্দুল করিম</div>
          <div class="text-[10px] text-slate-400 font-mono mt-0.5">আরএস রেকর্ড (২০০৫)</div>
        </div>

        <div class="flex-1 flex flex-col items-center px-2">
          <span class="text-[10px] font-mono text-emerald-400 mb-1">বিক্রয় কবলা #৮৮৪</span>
          <div class="w-full h-0.5 bg-gradient-to-r from-blue-500 via-emerald-500 to-emerald-400 relative">
            <i class="fa-solid fa-chevron-right absolute -right-1.5 -top-1.5 text-xs text-emerald-400"></i>
          </div>
          <span class="text-[9px] text-slate-400 font-mono mt-1">৫.০০ শতক হস্তান্তর</span>
        </div>

        <div class="text-center p-3.5 bg-emerald-950/30 border border-emerald-500/60 rounded-2xl w-40 shadow-xl shadow-emerald-950/40">
          <i class="fa-solid fa-user-check text-emerald-400 text-lg mb-1"></i>
          <div class="text-xs font-bold text-white">আনিসুর রহমান</div>
          <div class="text-[10px] text-emerald-400 font-mono mt-0.5">বর্তমান মালিক (২০১৫)</div>
        </div>

        <div class="flex-1 flex flex-col items-center px-2">
          <span class="text-[10px] font-mono text-purple-400 mb-1">ই-নামজারি</span>
          <div class="w-full h-0.5 bg-gradient-to-r from-emerald-500 to-purple-500 relative">
            <i class="fa-solid fa-chevron-right absolute -right-1.5 -top-1.5 text-xs text-purple-400"></i>
          </div>
          <span class="text-[9px] text-slate-400 font-mono mt-1">কেস #৪৪১</span>
        </div>

        <div class="text-center p-3.5 bg-slate-900 border border-slate-700/80 rounded-2xl w-40 shadow-xl">
          <i class="fa-solid fa-file-signature text-purple-400 text-lg mb-1"></i>
          <div class="text-xs font-bold text-white">খতিয়ান ৪৫৬</div>
          <div class="text-[10px] text-slate-400 font-mono mt-0.5">মিউটেশন সম্পন্ন</div>
        </div>
      </div>
    `,
    timeline: [
      { year: "২০১৬", title: "ই-নামজারি অনুমোদন", badge: "সহকারী কমিশনার (ভূমি)", desc: "আনিসুর রহমানের নামে ৫.০০ শতক জমি খারিজ ও নতুন খতিয়ান চূড়ান্ত।" },
      { year: "২০১৫", title: "বিক্রয় কবলা দলিল রেজিস্ট্রেশন", badge: "সাব-রেজিস্ট্রি অফিস", desc: "আব্দুল করিম হইতে ৫.০০ শতক জমি সম্পূর্ণ মূল্যে দলিল #৮৮৪ মূলে ক্রয়।" },
      { year: "২০০৫", title: "আরএস খতিয়ান চূড়ান্তকরণ", badge: "ভূমি রেকর্ড ও জরিপ", desc: "দাগ ১২৫-এ আব্দুল করিমের নামে ৫.০০ শতক জমি জরিপ রেকর্ডভুক্ত।" }
    ],
    flags: [
      {
        severity: "VERIFIED",
        title: "মালিকানার ধারাবাহিকতা সুসংগত (Valid Chain)",
        evidence: "২০০৫ এর আরএস রেকর্ডীয় মালিক আব্দুল করিমের স্বাক্ষর ও ফিঙ্গারপ্রিন্ট ২০১৫-এর বিক্রয় দলিলে যথাযথভাবে সমর্থিত।"
      },
      {
        severity: "VERIFIED",
        title: "জমির পরিমাপে কোনো গরমিল নেই (Area Balanced)",
        evidence: "রেকর্ডের মোট ৫.০০ শতাংশের মধ্যে ৫.০০ শতাংশই হস্তান্তরিত হয়েছে, অতিরিক্ত কোনো দাবি নেই।"
      }
    ],
    checklist: [
      { ok: true, text: "খতিয়ান ও দলিল দাগ নম্বর পুরোপুরি ম্যাচ করেছে" },
      { ok: true, text: "সহকারী কমিশনার (ভূমি) অফিস কর্তৃক নামজারি কার্যকর" },
      { ok: true, text: "সরকারি খাস বা ওয়াকফ অধিগ্রহণ তালিকাভুক্ত নয়" },
      { ok: true, text: "কোনো বিচারাধীন মামলা বা দ্বৈত বায়নাপত্র নেই" }
    ],
    certNote: "উক্ত জমির চেইন অব টাইটেল এবং রেজিস্ট্রেশন রেকর্ড যাচাইপূর্বক কোনো অনিয়ম পাওয়া যায়নি। জমিটি বর্তমান রেকর্ডে হস্তান্তরযোগ্য ও নিরাপদ হিসেবে চিহ্নিত।"
  },

  fraud: {
    parcelId: "PARCEL-BD-DHK-204",
    title: "দাগ নং ২০৪ / খতিয়ান নং ৯১২ (বিএস)",
    owner: "মোঃ কামরুল হাসান (আপত্তিযুক্ত দাবিদার)",
    lastTx: "২০২৩ (দলিল #DEED-2023-F91)",
    area: "৬.০০ শতাংশ (Decimal)",
    hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    mutationStatus: "স্থগিত / প্রতারণা ফ্ল্যাগড",
    verdict: {
      status: "FRAUD",
      title: "৩টি গুরুতর অসঙ্গতি ও ডাবল-সেলিং শনাক্ত!",
      subtext: "জাল দলিল ও অসম্পৃক্ত বিক্রেতা দ্বারা জমি বিক্রির প্রমাণ পাওয়া গেছে",
      badgeClass: "bg-rose-950/40 border-rose-500/50 text-rose-400 animate-pulse",
      iconClass: "bg-rose-500/20 text-rose-400",
      icon: "fa-triangle-exclamation"
    },
    graphHtml: `
      <div class="w-full flex items-center justify-between max-w-xl mx-auto py-2">
        <div class="text-center p-3.5 bg-slate-900 border border-slate-700/80 rounded-2xl w-40 shadow-xl">
          <i class="fa-solid fa-user-shield text-slate-400 text-lg mb-1"></i>
          <div class="text-xs font-bold text-white">আব্দুর রউফ</div>
          <div class="text-[10px] text-slate-400 font-mono mt-0.5">আসল মালিক (২০২০)</div>
        </div>

        <div class="flex-1 flex flex-col items-center px-2">
          <span class="text-[10px] font-mono text-rose-400 mb-1 font-bold">বিচ্ছিন্ন লিঙ্ক (!)</span>
          <div class="w-full h-0.5 bg-rose-500 relative">
            <i class="fa-solid fa-xmark absolute -right-1.5 -top-2 text-xs text-rose-400"></i>
          </div>
          <span class="text-[9px] text-rose-300 font-mono mt-1">টাইটেল গ্যাপ</span>
        </div>

        <div class="text-center p-3.5 bg-rose-950/60 border border-rose-500 rounded-2xl w-40 shadow-xl shadow-rose-950/50 relative">
          <span class="absolute -top-2 -right-2 bg-rose-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">!</span>
          <i class="fa-solid fa-user-slash text-rose-400 text-lg mb-1"></i>
          <div class="text-xs font-bold text-white">সেলিম চৌধুরী</div>
          <div class="text-[10px] text-rose-300 font-mono mt-0.5">অসম্পৃক্ত বিক্রেতা</div>
        </div>

        <div class="flex-1 flex flex-col items-center px-2">
          <span class="text-[10px] font-mono text-rose-400 mb-1 font-bold">দ্বৈত বিক্রয় চেষ্টা</span>
          <div class="w-full h-0.5 bg-rose-500 relative">
            <i class="fa-solid fa-triangle-exclamation absolute -right-1.5 -top-2 text-xs text-rose-400"></i>
          </div>
          <span class="text-[9px] text-rose-300 font-mono mt-1">৬.০০ শতক জাল দলিল</span>
        </div>

        <div class="text-center p-3.5 bg-slate-900 border border-rose-700/60 rounded-2xl w-40 shadow-xl">
          <i class="fa-solid fa-hand-holding-dollar text-amber-400 text-lg mb-1"></i>
          <div class="text-xs font-bold text-white">কামরুল হাসান</div>
          <div class="text-[10px] text-rose-400 font-mono mt-0.5">প্রতারিত ক্রেতা</div>
        </div>
      </div>
    `,
    timeline: [
      { year: "২০২৩", title: "সন্দেহজনক দলিল রেজিস্ট্রেশন প্রয়াস", badge: "রিজেক্টেড", desc: "সেলিম চৌধুরী নামক অসম্পৃক্ত ব্যক্তি দ্বারা ৬.০০ শতক বিক্রির চেষ্টা (নামজারি আবেদন বাতিল)।" },
      { year: "২০২২", title: "বৈধ হস্তান্তর (দলিল #৮৯১)", badge: "সাব-রেজিস্ট্রি", desc: "আসল মালিক আব্দুর রউফ কর্তৃক অন্য বৈধ ক্রেতার নিকট ৪.০০ শতক জমি রেজিস্ট্রি হস্তান্তর।" },
      { year: "২০২০", title: "বিএস জরিপ চূড়ান্তকরণ", badge: "ভূমি রেকর্ড ও জরিপ", desc: "আব্দুর রউফের নামে মোট ৬.০০ শতক জমি বৈধভাবে রেকর্ডভুক্ত হয়।" }
    ],
    flags: [
      {
        severity: "CRITICAL",
        title: "ডাবল-সেলিং ও অতিরিক্ত হস্তান্তরের প্রমাণ (Double-Selling Conflict)",
        evidence: "২০২২ সালে এই দাগের ৪.০০ শতাংশ বিক্রির পর অবশিষ্ট রয়েছে মাত্র ২.০০ শতাংশ। অথচ ২০২৩ সালের দলিলে সম্পূর্ণ ৬.০০ শতাংশ বিক্রির দাবি করা হয়েছে।"
      },
      {
        severity: "CRITICAL",
        title: "চেইন অব টাইটেল বিচ্ছিন্ন (Broken Chain of Title)",
        evidence: "বিক্রেতা 'সেলিম চৌধুরী'র নামে কোনো পূর্ববর্তী দলিল, ওয়ারিশান সনদ বা নামজারি রেকর্ড পাওয়া যায়নি।"
      },
      {
        severity: "WARNING",
        title: "অস্বাভাবিক স্বল্প সময়ের ব্যবধানে পুনর্হস্তান্তর",
        evidence: "একই দাগে ৯ মাসের মধ্যে পুনরাবৃত্ত দলিলের আবেদন ল্যান্ড রেকর্ডে সন্দেহজনক ফ্ল্যাগ তৈরি করেছে।"
      }
    ],
    checklist: [
      { ok: false, text: "মালিকানার ধারাবাহিক চেইন বিদ্যমান নেই (Broken Title)" },
      { ok: false, text: "সাব-রেজিস্ট্রি ও এসিল্যান্ড রেকর্ডের মধ্যে গরমিল রয়েছে" },
      { ok: false, text: "একই দাগে পূর্ববর্তী সক্রিয় বায়না/দলিল রেজিস্টার্ড আছে" },
      { ok: true, text: "সরকারি খাস বা পরিত্যক্ত তালিকাভুক্ত নয়" }
    ],
    certNote: "সতর্কতা: উক্ত দাগে দ্বৈত বিক্রয়ের সুস্পষ্ট প্রমাণ এবং চেইন অব টাইটেলে গরমিল পাওয়া গেছে। এই সম্পত্তিতে কোনো আর্থিক লেনদেন করা আইনগতভাবে ঝুঁকিপূর্ণ।"
  }
};

let currentCase = 'clean';

function renderUI() {
  const data = cases[currentCase];

  // Badges & Meta
  document.getElementById('badge-parcel-id').innerText = data.parcelId;
  document.getElementById('parcel-title').innerText = data.title;
  document.getElementById('parcel-owner').innerText = data.owner;
  document.getElementById('parcel-last-tx').innerText = data.lastTx;
  document.getElementById('meta-area').innerText = data.area;
  document.getElementById('meta-hash').innerText = data.hash;

  // Verdict Box
  const vBox = document.getElementById('verdict-box');
  vBox.className = `flex items-center gap-4 border p-4 rounded-xl backdrop-blur ${data.verdict.badgeClass}`;
  document.getElementById('verdict-icon').className = `w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${data.verdict.iconClass}`;
  document.getElementById('verdict-icon').innerHTML = `<i class="fa-solid ${data.verdict.icon}"></i>`;
  document.getElementById('verdict-text').innerText = data.verdict.title;
  document.getElementById('verdict-subtext').innerText = data.verdict.subtext;

  // Mutation Text
  const mut = document.getElementById('meta-mutation');
  if (data.verdict.status === 'CLEAN') {
    mut.className = "text-sm font-bold text-emerald-400 mt-0.5 flex items-center gap-1.5";
    mut.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${data.mutationStatus}`;
  } else {
    mut.className = "text-sm font-bold text-rose-400 mt-0.5 flex items-center gap-1.5";
    mut.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> ${data.mutationStatus}`;
  }

  // Graph
  document.getElementById('graph-container').innerHTML = data.graphHtml;

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

  // Flags (Discrepancy Engine)
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

  // Checklist
  const cBox = document.getElementById('checklist-items');
  cBox.innerHTML = '';
  data.checklist.forEach(c => {
    cBox.innerHTML += `
      <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/80">
        <span class="text-slate-300">${c.text}</span>
        <i class="fa-solid ${c.ok ? 'fa-circle-check text-emerald-400' : 'fa-circle-xmark text-rose-500'} text-sm"></i>
      </div>
    `;
  });

  // Modal Info Sync
  document.getElementById('cert-plot').innerText = data.title;
  document.getElementById('cert-owner').innerText = data.owner;
  document.getElementById('cert-area').innerText = `${data.area} (তেজগাঁও, ঢাকা)`;
  document.getElementById('cert-hash').innerText = `${data.hash.substring(0, 28)}... (Matched)`;
  
  const certVBox = document.getElementById('cert-verdict-box');
  if(data.verdict.status === 'CLEAN') {
    certVBox.className = "p-3.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-900";
    certVBox.innerHTML = `<strong>✓ নিরাপদ হিসেবে প্রতীয়মান:</strong> ${data.certNote}`;
  } else {
    certVBox.className = "p-3.5 rounded-xl border border-rose-300 bg-rose-50 text-rose-900";
    certVBox.innerHTML = `<strong>⚠️ উচ্চ ঝুঁকিপূর্ণ সম্পত্তি:</strong> ${data.certNote}`;
  }
}

function switchCase(type) {
  currentCase = type;
  if (type === 'clean') {
    document.getElementById('btn-case-clean').className = "text-xs px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white font-medium shadow-sm transition";
    document.getElementById('btn-case-fraud').className = "text-xs px-3.5 py-1.5 rounded-lg bg-slate-800/80 text-slate-300 font-medium hover:text-white transition";
  } else {
    document.getElementById('btn-case-fraud').className = "text-xs px-3.5 py-1.5 rounded-lg bg-rose-600 text-white font-medium shadow-sm transition";
    document.getElementById('btn-case-clean').className = "text-xs px-3.5 py-1.5 rounded-lg bg-slate-800/80 text-slate-300 font-medium hover:text-white transition";
  }
  renderUI();
}

function openVerificationModal() {
  document.getElementById('cert-modal').classList.remove('hidden');
}

function closeVerificationModal() {
  document.getElementById('cert-modal').classList.add('hidden');
}

function triggerOCRUpload() {
  alert("OCR সিমুলেটর সক্রিয়: সিন্থেটিক দলিল থেকে বাংলা পাঠ নিষ্কাশন ও SHA-256 হ্যাশ ম্যাচিং সফল হয়েছে!");
}

window.onload = () => renderUI();