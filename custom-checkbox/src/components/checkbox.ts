import styles from "./checkbox.module.css?raw";
import checkmark from "./checkmark.svg?raw";

export class MyCheckbox extends HTMLElement {
	private declare checkboxEl: HTMLInputElement;
	private declare btnEl: HTMLButtonElement;
	private declare svgEl: SVGElement;

	constructor() {
		super();

		const id = Date.now().toString();

		const shadowRoot = this.attachShadow({ mode: "open" });

		this.checkboxEl = document.createElement("input");
		this.checkboxEl.setAttribute("type", "checkbox");
		this.checkboxEl.setAttribute("id", id);
		this.checkboxEl.addEventListener("change", async () => {
			switch (this.checkboxEl.checked) {
				case true: {
					this.triggerCheckboxCheckedAnimation();
					break;
				}
				case false: {
					this.triggerCheckboxUncheckedAnimation();
					break;
				}
			}
		});

		shadowRoot.appendChild(this.checkboxEl);

		this.btnEl = document.createElement("button");
		this.btnEl.addEventListener("click", () => {
			this.checkboxEl.click();
		});
		this.btnEl.innerHTML = checkmark;
		shadowRoot.appendChild(this.btnEl);
		// biome-ignore lint/style/noNonNullAssertion: this is fine
		this.svgEl = this.btnEl.querySelector<SVGElement>("svg")!;

		const labelEl = document.createElement("label");
		labelEl.setAttribute("for", id);
		labelEl.appendChild(document.createElement("slot"));
		shadowRoot.appendChild(labelEl);

		const sheet = new CSSStyleSheet();
		sheet.replaceSync(styles);
		shadowRoot.adoptedStyleSheets = [sheet];
	}

	attributeChangedCallback(name: string, _: string, newValue: string) {
		if (name === "id") {
			this.checkboxEl.setAttribute("id", newValue);
		}
	}

	private async triggerCheckboxCheckedAnimation() {
		this.btnEl.animate(
			[
				{
					transform: "scale(100%) rotate(0deg)",
					boxShadow: "0px 0px 0px 0px rgba(164, 199, 246, 0)",
				},
				{
					transform: "scale(120%) rotate(20deg)",
					boxShadow: "0px 0px 1px 6px rgba(164, 199, 246, 1)",
				},
				{
					transform: "scale(100%) rotate(0deg)",
					boxShadow: "0px 0px 0px 0px rgba(164, 199, 246, 0)",
				},
			],
			{
				fill: "forwards",
				duration: 250,
				easing: "cubic-bezier(0.25, 1, 0.5, 1)",
			},
		);
		this.svgEl.animate(
			[
				{
					strokeDashoffset: "-23",
				},
				{
					strokeDashoffset: "0",
				},
			],
			{
				fill: "forwards",
				duration: 250,
				easing: "cubic-bezier(0.25, 1, 0.5, 1)",
			},
		);
	}

	private async triggerCheckboxUncheckedAnimation() {
		this.svgEl.animate(
			[
				{
					strokeDashoffset: "0",
				},
				{
					strokeDashoffset: "-23",
				},
			],
			{
				fill: "forwards",
				duration: 250,
				easing: "cubic-bezier(0.25, 1, 0.5, 1)",
			},
		);
	}
}

window.customElements.define("my-checkbox", MyCheckbox);
