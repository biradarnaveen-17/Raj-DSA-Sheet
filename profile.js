import { supabase } from "./supabase.js";
import { requireAuth, signOut, qs, showToast } from "./auth.js";

const session = await requireAuth();
if (!session) {}

qs("who").textContent = "Logged in: " + session.user.email;
qs("logout").addEventListener("click", signOut);

const userId = session.user.id;
const email = session.user.email;

// --- Avatar generation (GitHub style) ---
// We store a seed in localStorage so avatar stays same until regenerate.
function getSeed() {
  const k = "rajsheet_avatar_seed_" + userId;
  let seed = localStorage.getItem(k);
  if (!seed) {
    seed = crypto.randomUUID();
    localStorage.setItem(k, seed);
  }
  return seed;
}

function setSeed(newSeed) {
  const k = "rajsheet_avatar_seed_" + userId;
  localStorage.setItem(k, newSeed);
}

function avatarUrl(style, seed) {
  // DiceBear public avatars (no API key needed)
  // GitHub-like: identicon
  if (style === "git") {
    return `https://api.dicebear.com/9.x/identicon/svg?seed=${encodeURIComponent(seed)}`;
  }
  // Fun: pixel/dice
  return `https://api.dicebear.com/9.x/pixel-art/svg?seed=${encodeURIComponent(seed)}`;
}

function niceName(name) {
  if (!name) return "Raj";
  // Title case
  return name
    .trim()
    .split(/\s+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

// local settings
const styleKey = "rajsheet_avatar_style_" + userId;

function getStyle() {
  return localStorage.getItem(styleKey) || "git";
}
function setStyle(v) {
  localStorage.setItem(styleKey, v);
}

function updateAvatarUI() {
  const seed = getSeed();
  const style = getStyle();
  qs("avatarImg").src = avatarUrl(style, seed);

  // sidebar avatar = first letter of name
  const bigName = qs("bigName").textContent || "R";
  qs("avatar").textContent = bigName.trim().slice(0, 1).toUpperCase();

  // style buttons
  qs("styleGit").classList.toggle("primary", style === "git");
  qs("styleDice").classList.toggle("primary", style !== "git");
}

async function load() {
  qs("bigEmail").textContent = email;

  // profile
  const { data: prof } = await supabase
    .from("profiles")
    .select("name")
    .eq("id", userId)
    .maybeSingle();

  const name = niceName(prof?.name || session.user.user_metadata?.name || "Raj");
  qs("name").value = name;
  qs("bigName").textContent = name;

  // stats
  const { data: prog } = await supabase
    .from("progress")
    .select("solved, revision, note")
    .eq("user_id", userId);

  const rows = prog || [];
  const solved = rows.filter(r => r.solved).length;
  const rev = rows.filter(r => r.revision).length;
  const notes = rows.filter(r => (r.note || "").trim().length > 0).length;

  qs("solved").textContent = solved;
  qs("rev").textContent = rev;
  qs("notes").textContent = notes;

  updateAvatarUI();
}

qs("save").addEventListener("click", async () => {
  const name = niceName(qs("name").value);

  if (!name) return showToast("Name cannot be empty.", "bad");

  const { error } = await supabase.from("profiles").upsert({
    id: userId,
    name
  });

  if (error) return showToast(error.message, "bad");

  qs("bigName").textContent = name;
  qs("avatar").textContent = name.trim().slice(0, 1).toUpperCase();

  showToast("Profile updated.", "ok");
});

qs("styleGit").addEventListener("click", () => {
  setStyle("git");
  updateAvatarUI();
});

qs("styleDice").addEventListener("click", () => {
  setStyle("dice");
  updateAvatarUI();
});

qs("regen").addEventListener("click", () => {
  setSeed(crypto.randomUUID());
  updateAvatarUI();
  showToast("Avatar regenerated.", "ok");
});

qs("randomBtn").addEventListener("click", () => {
  const n = Math.floor(Math.random() * 50) + 1;
  showToast(`Random pick: Problem ${n}`, "ok");
  window.location.href = "sheet.html";
});

await load();
