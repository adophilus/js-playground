import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import type { TLink, TSocial } from "./type";

export const socials: TSocial[] = [
  {
    id: "whatsapp",
    icon: FaWhatsapp,
    link: "https://wa.me/2348101405645",
  },
  {
    id: "facebook",
    icon: FaFacebook,
    link: "https://www.facebook.com/SimpuInc",
  },
  {
    id: "twitter",
    icon: FaTwitter,
    link: "https://twitter.com/simpuinc",
  },
  {
    id: "linkedin",
    icon: FaLinkedin,
    link: "https://www.linkedin.com/company/simpu-inc/",
  },
  {
    id: "instagram",
    icon: FaInstagram,
    link: "https://www.instagram.com/simpuinc/",
  },
];

export const links: TLink[] = [
  { label: "Help center", link: "/support" },
  { label: "Blog", link: "/blog" },
  { label: "API docs", link: "/api" },
];
