import { axiosFetch } from "./axiosFetch";

export async function signOut() {
  await axiosFetch.post("/signOut");
}
