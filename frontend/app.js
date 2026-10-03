const datasets = {
  clean: {
    plot: "Plot 125",
    khatian: "Khatian 456 (RS)",
    area: "5.00 Decimal",
    hash: "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
    docId: "DEED-2015-884",
    owner: "Person B (Anisur Rahman)",
    mutation: "MUT-2016-DHK-441 (Approved)",
    status: "VERIFIED",
    statusText: "All Records Consistent",
    flags: [
      {
        type: "SUCCESS",
        title: "Ownership Chain Intact",
        desc: "2005 buyer theke 2015-e valid sale kabala deed diye Person B-er kache transfer hoyeche."
      },
      {
        type: "SUCCESS",
        title: "Area Balance Matched",
        desc: "Khatian er 5.00 decimal er moddhe 5.00 decimal transfer shushongoto."
      }
    ],
    checklist: [
      { valid: true, text: "Khatian o Dalil er dag number mil ache" },
      { valid: true, text: "AC Land office theke mutation shompurno" },
      { valid: true, text: "Govt khas ba acquisition list-e nei" },
      { valid: true, text: "Kono pending double-sale issue nei" }
    ],
    graph: `
      <div class="flex flex-col md:flex-row items-center justify-between gap-4 py-4">
        <div class="text-center p-3 bg-slate-900 border border-slate-700 rounded-xl w-36">
          <i class="fa-solid fa-user text-blue-400 mb-1"></i>
          <div class="text-xs font-bold text-white">Abdul Karim</div>
          <div class="text-[10px] text-slate-400">Original (2005)</div>
        </div>
        <div class="text-xs text-slate-500">─── [Deed #01] ───▶</div>
        <div class="text-center p-3 bg-slate-900 border border-emerald-600/60 rounded-xl w-36">
          <i class="fa-solid fa-user-check text-emerald-400 mb-1"></i>
          <div class="text-xs font-bold text-white">Person B</div>
          <div class="text-[10px] text-emerald-400">Current (2015)</div>
        </div>
        <div class="text-xs text-slate-500">─── [Mutation] ───▶</div>
        <div class="text-center p-3 bg-slate-900 border border-slate-700 rounded-xl w-36">
          <i class="fa-solid fa-file-circle-check text-cyan-400 mb-1"></i>
          <div class="text-xs font-bold text-white">Khatian 456</div>
          <div class="text-[10px] text-slate-400">Final Record</div>
        </div>
      </div>
    `,
    timeline: [
      { year: "2016", title: "e-Mutation Complete", detail: "Final mutation approved for 5.00 decimal." },
      { year: "2015", title: "Sale Deed Registered", detail: "Transfer from Abdul Karim to Person B." },
      { year: "2005", title: "RS Survey Record", detail: "Original settlement recorded." }
    ]
  },

  fraud: {
    plot: "Plot 204",
    khatian: "Khatian 912 (BS)",
    area: "6.00 Decimal",
    hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    docId: "DEED-2023-F91",
    owner: "Kamrul Hasan (Flagged)",
    mutation: "Rejected / Suspended",
    status: "FRAUD",
    statusText: "3 Discrepancies & Double-Sale Detected",
    flags: [
      {
        type: "DANGER",
        title: "Double-Selling Indication",
        desc: "Ekoi Plot 204 theke 2022-e 4.00 decimal bikrir por abar 2023-e notun kore 6.00 decimal bikrir cheshta kora hoyeche."
      },
      {
        type: "DANGER",
        title: "Broken Chain of Title",
        desc: "Seller 'Selim Chowdhury'-r sathe ager kono deed ba khatian er ownership link paoya jayni."
      },
      {
        type: "WARNING",
        title: "Suspicious Rapid Flip",
        desc: "Kom shomoyer moddhe multiple deed entry record kora hoyeche."
      }
    ],
    checklist: [
      { valid: false, text: "Title chain broken (gap exist)" },
      { valid: false, text: "Sub-registry o AC Land record mismatch" },
      { valid: false, text: "Active prior transfer conflict" },
      { valid: true, text: "Not in Govt khas record" }
    ],
    graph: `
      <div class="flex flex-col md:flex-row items-center justify-between gap-4 py-4">
        <div class="text-center p-3 bg-slate-900 border border-slate-700 rounded-xl w-36">
          <i class="fa-solid fa-user text-slate-400 mb-1"></i>
          <div class="text-xs font-bold text-white">Abdur Rauf</div>
          <div class="text-[10px] text-slate-400">Actual (2020)</div>
        </div>
        <div class="text-xs text-rose-500">─── [Sale 1: 4 Dec] ───▶</div>
        <div class="text-center p-3 bg-rose-950/40 border border-rose-600 rounded-xl w-36">
          <i class="fa-solid fa-user-xmark text-rose-400 mb-1"></i>
          <div class="text-xs font-bold text-white">Selim Chowdhury</div>
          <div class="text-[10px] text-rose-300">Unlinked Seller</div>
        </div>
        <div class="text-xs text-rose-500">─── [Double Sale: 6 Dec] ───▶</div>
        <div class="text-center p-3 bg-slate-900 border border-slate-700 rounded-xl w-36">
          <i class="fa-solid fa-triangle-exclamation text-amber-400 mb-1"></i>
          <div class="text-xs font-bold text-white">Kamrul Hasan</div>
          <div class="text-[10px] text-rose-400">Potential Buyer</div>
        </div>
      </div>
    `,
    timeline: [
      { year: "2023", title: "Fraudulent Deed Attempt", detail: "Attempted sale by Selim Chowdhury (Mutation Rejected)." },
      { year: "2022", title: "Valid Deed Registered", detail: "4.00 decimal transferred to Buyer X." },
      { year: "2020", title: "BS Record Entry", detail: "Abdur Rauf recorded with 6.00 decimal." }
    ]
  }
};

function loadScenario(type) {
  const data = datasets[type];

  document.getElementById('stat-plot').innerText = `${data.plot} / ${data.khatian}`;
  document.getElementById('stat-area').innerText = data.area;
  document.getElementById('stat-hash').innerText = data.hash;

  const kpiBox = document.getElementById('kpi-status-box');
  const statIcon = document.getElementById('stat-icon');
  const statStatus = document.getElementById('stat-status');

  if(data.status === 'VERIFIED') {
    kpiBox.className = "bg-emerald-950/30 border border-emerald-800/80 p-4 rounded-xl flex items-center gap-4";
    statIcon.className = "p-3 bg-emerald-500/20 text-emerald-400 rounded-lg text-lg";
    statIcon.innerHTML = `<i class="fa-solid fa-circle-check"></i>`;
    statStatus.className = "text-sm font-bold text-emerald-400";
    statStatus.innerText = data.statusText;
    document.getElementById('btn-clean').className = "text-xs px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-medium";
    document.getElementById('btn-fraud').className = "text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 font-medium";
  } else {
    kpiBox.className = "bg-rose-950/30 border border-rose-800/80 p-4 rounded-xl flex items-center gap-4";
    statIcon.className = "p-3 bg-rose-500/20 text-rose-400 rounded-lg text-lg";
    statIcon.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i>`;
    statStatus.className = "text-sm font-bold text-rose-400";
    statStatus.innerText = data.statusText;
    document.getElementById('btn-fraud').className = "text-xs px-3 py-1.5 rounded-lg bg-rose-600 text-white font-medium";
    document.getElementById('btn-clean').className = "text-xs px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 font-medium";
  }

  document.getElementById('doc-id').innerText = data.docId;
  document.getElementById('doc-owner').innerText = data.owner;
  document.getElementById('doc-mutation').innerText = data.mutation;

  const flagsContainer = document.getElementById('flags-container');
  flagsContainer.innerHTML = '';
  data.flags.forEach(flag => {
    let borderClass = flag.type === 'SUCCESS' ? 'border-emerald-800/60 bg-emerald-950/20 text-emerald-300' : 'border-rose-800/60 bg-rose-950/30 text-rose-200';
    let icon = flag.type === 'SUCCESS' ? 'fa-check' : 'fa-triangle-exclamation';
    flagsContainer.innerHTML += `
      <div class="border ${borderClass} p-3 rounded-xl text-xs space-y-1">
        <div class="font-bold flex items-center gap-1.5"><i class="fa-solid ${icon}"></i> ${flag.title}</div>
        <p class="text-slate-300">${flag.desc}</p>
      </div>
    `;
  });

  const checklistContainer = document.getElementById('checklist-container');
  checklistContainer.innerHTML = '';
  data.checklist.forEach(item => {
    checklistContainer.innerHTML += `
      <li class="flex items-center gap-2 ${item.valid ? 'text-slate-300' : 'text-rose-400 font-semibold'}">
        <i class="fa-solid ${item.valid ? 'fa-circle-check text-emerald-400' : 'fa-circle-xmark text-rose-500'}"></i>
        <span>${item.text}</span>
      </li>
    `;
  });

  document.getElementById('graph-view').innerHTML = data.graph;

  const timelineContainer = document.getElementById('timeline-container');
  timelineContainer.innerHTML = '';
  data.timeline.forEach(item => {
    timelineContainer.innerHTML += `
      <div class="relative pl-6 mb-4">
        <span class="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-emerald-500"></span>
        <div class="text-xs font-bold text-slate-200">${item.year} — ${item.title}</div>
        <p class="text-xs text-slate-400 mt-0.5">${item.detail}</p>
      </div>
    `;
  });
}

window.onload = () => loadScenario('clean');