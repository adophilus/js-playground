import {
	FaFacebook,
	FaInstagram,
	FaLinkedin,
	FaTwitter,
	FaWhatsapp,
} from "react-icons/fa";

const socials = [
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

const links = [
	{ label: "Help center", link: "/support" },
	{ label: "Blog", link: "/blog" },
	{ label: "API docs", link: "/api" },
];

export const HomeFooter = () => (
	<div>
		<div>
			<div>
				<img src="/images/simpu-logo.svg" alt="logo" />
			</div>
			<div>
				{socials.map((social) => (
					<span key={social.id}>
						<social.icon />
					</span>
				))}
			</div>
		</div>
		<div>
			{links.map((link) => (
				<span key={link.link}>
					<a href={link.link}>{link.label}</a>
				</span>
			))}
		</div>
		<div>
			<p>© 2026. All rights reserved. Simpu Inc.</p>
			<p>
				<a href="/privacy">Privacy</a>
			</p>
		</div>
	</div>
);
