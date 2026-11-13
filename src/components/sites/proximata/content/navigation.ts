import { LOGIN_URL, LUMA_URL } from "./event";

/** In-page anchors; each id is set on the matching section root. */
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Tracks", href: "#tracks" },
  { label: "Agenda", href: "#agenda" },
  { label: "FAQ", href: "#faq" },
] as const;

export const registerLink = { label: "Register", href: LUMA_URL } as const;

/** Opens in the same tab: the platform is part of the event site. */
export const loginLink = { label: "Login", href: LOGIN_URL } as const;
