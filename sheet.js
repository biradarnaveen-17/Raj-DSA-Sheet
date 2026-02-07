import { supabase } from "./supabase.js";
import { requireAuth, qs, showToast, signOut } from "./auth.js";

/**
 * Difficulty mapping
 */
const DIFF = new Map([
  [1,"easy"], [2,"easy"], [3,"easy"], [4,"easy"], [5,"easy"],
  [6,"easy"], [7,"easy"], [8,"medium"], [9,"easy"], [10,"medium"],
  [11,"medium"], [12,"easy"], [13,"easy"], [14,"easy"], [15,"easy"],
  [16,"easy"], [17,"easy"], [18,"easy"], [19,"easy"], [20,"easy"],
  [21,"easy"], [22,"medium"], [23,"easy"], [24,"easy"], [25,"easy"],
  [26,"medium"], [27,"easy"], [28,"easy"], [29,"easy"], [30,"easy"],
  [31,"easy"], [32,"easy"], [33,"easy"], [34,"easy"], [35,"medium"],
  [36,"easy"], [37,"medium"], [38,"easy"],
  [39,"easy"], [40,"easy"], [41,"easy"], [42,"easy"], [43,"easy"],
  [44,"medium"], [45,"medium"], [46,"easy"], [47,"easy"], [48,"medium"],
  [49,"easy"], [50,"easy"],
]);

/**
 * IMPORTANT ABOUT GFG:
 * - Put coding/practice links in gfgPractice
 * - Put article links in gfg
 * - The UI will open gfgPractice first, else gfg
 */
const DATA = [
  {
    key:"arrays",
    title:"Arrays & Matrices",
    items:[
      {n:1, name:"Find Second Largest Element", lc:null,
        gfgPractice:"https://www.geeksforgeeks.org/problems/second-largest3735/1",
        gfg:"https://www.geeksforgeeks.org/find-second-largest-element-array/"
      },
      {n:2, name:"Array Rotation", lc:"https://leetcode.com/problems/rotate-array/",
        gfgPractice:"https://www.geeksforgeeks.org/problems/rotate-array-by-n-elements-1587115621/1",
        gfg:"https://www.geeksforgeeks.org/array-rotation/"
      },
      {n:3, name:"Count Even and Odd Numbers", lc:null,
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/count-number-even-odd-elements-array/"
      },
      {n:4, name:"Remove Duplicates from Sorted Array", lc:"https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
        gfgPractice:null,
        gfg:null
      },
      {n:5, name:"Find Missing Number", lc:"https://leetcode.com/problems/missing-number/",
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/find-the-missing-number/"
      },
      {n:6, name:"Frequency of Array Elements", lc:null,
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/counting-frequencies-of-array-elements/"
      },
      {n:7, name:"Move All Zeros to End", lc:"https://leetcode.com/problems/move-zeroes/",
        gfgPractice:null,
        gfg:null
      },
      {n:8, name:"Maximum Sum Subarray (Kadane's Algorithm)", lc:"https://leetcode.com/problems/maximum-subarray/",
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/largest-sum-contiguous-subarray/"
      },
      {n:9, name:"Two Sum Problem", lc:"https://leetcode.com/problems/two-sum/",
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/given-an-array-a-and-a-number-x-check-for-pair-in-a-with-sum-as-x/"
      },
      {n:10, name:"Matrix Spiral Traversal", lc:"https://leetcode.com/problems/spiral-matrix/",
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/print-a-given-matrix-in-spiral-form/"
      },
      {n:11, name:"Sliding Window Maximum", lc:"https://leetcode.com/problems/sliding-window-maximum/",
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/sliding-window-maximum-maximum-of-all-subarrays-of-size-k/"
      },
      {n:12, name:"Merge Two Sorted Arrays", lc:"https://leetcode.com/problems/merge-sorted-array/",
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/merge-two-sorted-arrays/"
      },
      {n:13, name:"Stock Buy Sell Problem", lc:"https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/stock-buy-sell/"
      },
      {n:14, name:"String Reversal", lc:null,
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/reverse-a-string-in-java/"
      },
      {n:15, name:"Palindrome Check", lc:"https://leetcode.com/problems/valid-palindrome/",
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/c-program-check-given-string-palindrome/"
      },
      {n:16, name:"Character Frequency Count", lc:null,
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/python-frequency-of-each-character-in-string/"
      },
      {n:17, name:"Remove Duplicate Characters", lc:null,
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/remove-duplicates-from-a-given-string/"
      },
      {n:18, name:"First Non-Repeating Character", lc:"https://leetcode.com/problems/first-unique-character-in-a-string/",
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/given-a-string-find-its-first-non-repeating-character/"
      },
      {n:19, name:"Count Vowels and Consonants", lc:null,
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/program-count-vowels-string-iterative-recursive/"
      },
      {n:20, name:"String Length Without Built-in Functions", lc:null,
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/length-string-without-using-length-method/"
      },
      {n:21, name:"Anagram Detection", lc:"https://leetcode.com/problems/valid-anagram/",
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/check-whether-two-strings-are-anagram-of-each-other/"
      },
      {n:22, name:"Longest Palindromic Substring", lc:"https://leetcode.com/problems/longest-palindromic-substring/",
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/longest-palindrome-substring-set-1/"
      },
      {n:23, name:"String Rotation Check", lc:null,
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/a-program-to-check-if-strings-are-rotations-of-each-other/"
      },
      {n:24, name:"Compress String (Run-length Encoding)", lc:"https://leetcode.com/problems/string-compression/",
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/run-length-encoding/"
      },
      {n:25, name:"Substring Pattern Search", lc:"https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/",
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/naive-algorithm-for-pattern-searching/"
      },
    ]
  },

  {
    key:"linked",
    title:"Linked Lists",
    items:[
      {n:26, name:"Longest Substring Without Repeating Characters", lc:"https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/length-of-the-longest-substring-without-repeating-characters/"
      },
      {n:27, name:"Insert Node at Different Positions", lc:null,
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/linked-list-set-2-inserting-a-node/"
      },
      {n:28, name:"Delete Node from Different Positions", lc:null,
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/linked-list-set-3-deleting-node/"
      },
      {n:29, name:"Find Length and Search Element", lc:null,
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/find-length-of-a-linked-list-iterative-and-recursive/"
      },
      {n:30, name:"Display Linked List in Different Orders", lc:null,
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/print-reverse-of-a-linked-list-without-actually-reversing/"
      },
      {n:31, name:"Convert Array to Linked List", lc:null,
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/create-linked-list-from-a-given-array/"
      },
      {n:32, name:"Count Nodes with Specific Properties", lc:null,
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/count-even-odd-nodes-in-a-linked-list/"
      },
      {n:33, name:"Reverse a Linked List", lc:"https://leetcode.com/problems/reverse-linked-list/",
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/reverse-a-linked-list/"
      },
      {n:34, name:"Find Middle Element", lc:"https://leetcode.com/problems/middle-of-the-linked-list/",
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/write-a-c-function-to-print-the-middle-of-the-linked-list/"
      },
      {n:35, name:"Detect and Remove Loop", lc:"https://leetcode.com/problems/linked-list-cycle-ii/",
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/detect-and-remove-loop-in-a-linked-list/"
      },
      {n:36, name:"Remove Duplicates", lc:"https://leetcode.com/problems/remove-duplicates-from-sorted-list/",
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/remove-duplicates-from-an-unsorted-linked-list/"
      },
      {n:37, name:"Check if Palindrome", lc:"https://leetcode.com/problems/palindrome-linked-list/",
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/function-to-check-if-a-singly-linked-list-is-palindrome/"
      },
      {n:38, name:"Merge Two Sorted Lists", lc:"https://leetcode.com/problems/merge-two-sorted-lists/",
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/merge-two-sorted-linked-lists/"
      },
    ]
  },

  {
    key:"recursion",
    title:"Recursion & Backtracking",
    items:[
      {n:39, name:"Modified Factorial", lc:null,
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/program-for-factorial-of-a-number/"
      },
      {n:40, name:"Recursive Pattern Printing", lc:null,
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/programs-printing-pyramid-patterns-using-recursion/"
      },
      {n:41, name:"String Length Without strlen()", lc:null,
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/program-for-length-of-a-string-using-recursion/"
      },
      {n:42, name:"Sum of Array Elements", lc:null,
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/sum-array-elements-using-recursion/"
      },
      {n:43, name:"GCD using Euclidean Algorithm", lc:null,
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/euclidean-algorithms-basic-and-extended/"
      },
      {n:44, name:"Power Function Implementation", lc:"https://leetcode.com/problems/powx-n/",
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/write-a-c-program-to-calculate-powxn/"
      },
      {n:45, name:"N-Queens Problem", lc:"https://leetcode.com/problems/n-queens/",
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/n-queen-problem-backtracking-3/"
      },
      {n:46, name:"Generate All Subsets", lc:"https://leetcode.com/problems/subsets/",
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/find-distinct-subsets-given-set/"
      },
      {n:47, name:"Palindrome Check with Recursion", lc:null,
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/recursive-function-check-string-palindrome/"
      },
      {n:48, name:"Merge Sort Implementation", lc:null,
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/merge-sort/"
      },
      {n:49, name:"Tower of Hanoi", lc:null,
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/c-program-for-tower-of-hanoi/"
      },
      {n:50, name:"Binary Tree Path Sum", lc:"https://leetcode.com/problems/path-sum/",
        gfgPractice:null,
        gfg:"https://www.geeksforgeeks.org/root-to-leaf-path-sum-equal-to-a-given-number/"
      },
    ]
  }
];

// =======================================================
// AUTH + TOPBAR
// =======================================================
const session = await requireAuth();
if(!session) {}

const userId = session.user.id;

// topbar
const whoEl = qs("who");
if(whoEl) whoEl.textContent = "Logged in: " + session.user.email;

const logoutBtn = qs("logout");
if(logoutBtn) logoutBtn.addEventListener("click", signOut);

// sidebar avatar (first letter of name if available)
try{
  const { data: prof } = await supabase
    .from("profiles")
    .select("name")
    .eq("id", userId)
    .maybeSingle();

  if(prof?.name && qs("avatar")){
    qs("avatar").textContent = prof.name.trim().slice(0,1).toUpperCase();
  }
}catch(err){
  // ignore
}

// =======================================================
// UI refs
// =======================================================
const rowsEl = qs("rows");
const countTextEl = qs("countText");

const ringEl = qs("ring");
const solvedNumEl = qs("solvedNum");
const totalNumEl = qs("totalNum");
const easyTextEl = qs("easyText");
const medTextEl = qs("medText");
const hardTextEl = qs("hardText");
const smallInfoEl = qs("smallInfo");

// =======================================================
// State
// =======================================================
let activeSection = "all";
let qText = "";
const progressMap = new Map();

// =======================================================
// Helpers
// =======================================================
function allProblemsFlat(){
  const out = [];
  for(const sec of DATA){
    for(const it of sec.items){
      out.push({ ...it, sectionKey: sec.key, sectionTitle: sec.title });
    }
  }
  return out;
}

function difficultyOf(n){
  return DIFF.get(n) || "easy";
}

function getProg(n){
  return progressMap.get(n) || { solved:false, revision:false, note:null };
}

function setProgLocal(n, patch){
  const prev = getProg(n);
  progressMap.set(n, { ...prev, ...patch });
}

function norm(s){ return (s||"").toLowerCase().trim(); }

function passesFilters(p){
  if(activeSection !== "all" && p.sectionKey !== activeSection) return false;

  if(qText){
    const hay = `${p.name} ${p.sectionTitle} ${difficultyOf(p.n)}`.toLowerCase();
    if(!hay.includes(qText)) return false;
  }
  return true;
}

// =======================================================
// Logo buttons
// =======================================================
function logoBtn(url, type){
  if(!url) return `<span style="color:rgba(255,255,255,.45)">—</span>`;

  const icon =
    type === "lc"
      ? "https://leetcode.com/favicon.ico"
      : "https://www.geeksforgeeks.org/favicon.ico";

  const title =
    type === "lc" ? "Open in LeetCode" : "Open in GeeksforGeeks";

  return `
    <a class="plink" target="_blank" rel="noreferrer" href="${url}" title="${title}">
      <img src="${icon}" alt="${type}">
    </a>
  `;
}

function gfgLink(p){
  return p.gfgPractice || p.gfg || null;
}

function diffBadge(diff){
  if(diff === "easy") return `<span class="diff easy">Easy</span>`;
  if(diff === "medium") return `<span class="diff medium">Medium</span>`;
  return `<span class="diff hard">Hard</span>`;
}

// =======================================================
// Progress UI
// =======================================================
function updateProgressUI(){
  const flat = allProblemsFlat();
  const total = flat.length;

  let solved = 0;

  let easySolved = 0, easyTotal = 0;
  let medSolved = 0, medTotal = 0;
  let hardSolved = 0, hardTotal = 0;

  for(const p of flat){
    const diff = difficultyOf(p.n);
    const pr = getProg(p.n);

    if(diff === "easy") easyTotal++;
    else if(diff === "medium") medTotal++;
    else hardTotal++;

    if(pr.solved){
      solved++;
      if(diff === "easy") easySolved++;
      else if(diff === "medium") medSolved++;
      else hardSolved++;
    }
  }

  const pct = total === 0 ? 0 : Math.round((solved / total) * 100);

  ringEl.style.setProperty("--p", pct);

  solvedNumEl.textContent = solved;
  totalNumEl.textContent = `/ ${total}`;

  easyTextEl.textContent = `Easy ${easySolved}/${easyTotal}`;
  medTextEl.textContent = `Medium ${medSolved}/${medTotal}`;
  hardTextEl.textContent = `Hard ${hardSolved}/${hardTotal}`;

  smallInfoEl.textContent = `${pct}% solved`;
}

// =======================================================
// Render table
// =======================================================
function render(){
  const flat = allProblemsFlat().filter(passesFilters);

  rowsEl.innerHTML = "";

  for(const p of flat){
    const pr = getProg(p.n);
    const diff = difficultyOf(p.n);

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>
        <input class="chk" type="checkbox" data-solve="${p.n}" ${pr.solved ? "checked" : ""}/>
      </td>

      <td>
        <div class="pname">${p.n}. ${p.name}</div>
        <div class="tags">
          <span class="tag">${p.sectionTitle}</span>
        </div>
      </td>

      <td>${logoBtn(p.lc, "lc")}</td>
      <td>${logoBtn(gfgLink(p), "gfg")}</td>

      <td>
        <button class="noteBtn ${pr.note ? "on" : ""}" data-note="${p.n}" title="Add note">✍️</button>
      </td>

      <td>
        <span class="star ${pr.revision ? "on" : ""}" data-rev="${p.n}" title="Mark revision">★</span>
      </td>

      <td>${diffBadge(diff)}</td>
    `;

    rowsEl.appendChild(tr);
  }

  countTextEl.textContent = `${flat.length} problems`;

  // events
  document.querySelectorAll("[data-solve]").forEach(cb => {
    cb.addEventListener("change", onToggleSolved);
  });

  document.querySelectorAll("[data-rev]").forEach(btn => {
    btn.addEventListener("click", onToggleRevision);
  });

  document.querySelectorAll("[data-note]").forEach(btn => {
    btn.addEventListener("click", onOpenNote);
  });

  updateProgressUI();
}

// =======================================================
// Supabase load/save
// =======================================================
async function loadProgress(){
  const { data, error } = await supabase
    .from("progress")
    .select("problem_no, solved, revision, note")
    .eq("user_id", userId);

  if(error){
    showToast("Failed to load progress: " + error.message, "bad");
    return;
  }

  progressMap.clear();
  for(const row of data){
    progressMap.set(row.problem_no, {
      solved: !!row.solved,
      revision: !!row.revision,
      note: row.note || null
    });
  }
}

async function upsertProgress(problemNo, patch){
  const prev = getProg(problemNo);
  const next = { ...prev, ...patch };

  // optimistic update
  setProgLocal(problemNo, next);
  updateProgressUI();

  const { error } = await supabase
    .from("progress")
    .upsert(
      {
        user_id: userId,
        problem_no: problemNo,
        solved: !!next.solved,
        revision: !!next.revision,
        note: next.note || null,
        updated_at: new Date().toISOString()
      },
      { onConflict: "user_id,problem_no" } // ✅ FIX
    );

  if(error){
    showToast("DB error: " + error.message, "bad");
    setProgLocal(problemNo, prev);
    updateProgressUI();
  }
}

// =======================================================
// Events
// =======================================================
async function onToggleSolved(e){
  const n = parseInt(e.target.dataset.solve, 10);
  await upsertProgress(n, { solved: e.target.checked });
  render();
}

async function onToggleRevision(e){
  const n = parseInt(e.target.dataset.rev, 10);
  const cur = getProg(n);
  await upsertProgress(n, { revision: !cur.revision });
  render();
}

async function onOpenNote(e){
  const n = parseInt(e.target.dataset.note, 10);
  const cur = getProg(n);

  const text = prompt(`Write note for Problem ${n}:`, cur.note || "");
  if(text === null) return;

  await upsertProgress(n, { note: text.trim() || null });
  showToast("Note saved!", "ok");
  render();
}

// =======================================================
// Filters
// =======================================================
document.querySelectorAll("[data-filter]").forEach(btn => {
  btn.addEventListener("click", () => {
    activeSection = btn.dataset.filter;

    document.querySelectorAll("[data-filter]").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    render();
  });
});

// =======================================================
// Search
// =======================================================
qs("q").addEventListener("input", (e) => {
  qText = norm(e.target.value);
  render();
});

// =======================================================
// Random
// =======================================================
qs("random").addEventListener("click", () => {
  const list = allProblemsFlat().filter(passesFilters);
  if(list.length === 0) return;

  const pick = list[Math.floor(Math.random() * list.length)];
  alert(`Random Pick:\n\n${pick.n}. ${pick.name}`);
});

// =======================================================
// INIT
// =======================================================
await loadProgress();
render();
