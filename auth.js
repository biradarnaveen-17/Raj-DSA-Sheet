import { supabase } from "./supabase.js";

export async function requireAuth(redirectTo = "login.html") {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    window.location.href = redirectTo;
    return null;
  }
  return session;
}

export async function signOut() {
  await supabase.auth.signOut();
  window.location.href = "login.html";
}

export function qs(id) {
  return document.getElementById(id);
}

export function showToast(text, type = "info") {
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.textContent = text;
  document.body.appendChild(el);

  setTimeout(() => el.classList.add("show"), 10);
  setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => el.remove(), 250);
  }, 2500);
}
