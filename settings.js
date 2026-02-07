import { supabase } from "./supabase.js";
import { requireAuth, signOut, qs } from "./auth.js";

const session = await requireAuth();
if(!session) {}

qs("who").textContent = "Logged in: " + session.user.email;
qs("logout").addEventListener("click", signOut);
qs("logout2").addEventListener("click", signOut);

const userId = session.user.id;

// avatar
const { data } = await supabase.from("profiles").select("name").eq("id", userId).maybeSingle();
if(data?.name){
  qs("avatar").textContent = data.name.trim().slice(0,1).toUpperCase();
}
