import { v4 as uuidv4 } from "https://jspm.dev/uuid";
export function setCookie() {
  console.log(document.cookie);
  if (!document.cookie.includes("User")) {
    document.cookie = `User=${uuidv4()}`;
  }
}
