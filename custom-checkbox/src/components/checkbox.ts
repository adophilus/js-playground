import styles from "./checkbox.module.css?raw";

export class MyCheckbox extends HTMLElement {
	private declare checkboxEl: HTMLInputElement;

	constructor() {
		super();

		const id = Date.now().toString();

		const shadowRoot = this.attachShadow({ mode: "open" });

		this.checkboxEl = document.createElement("input");
		this.checkboxEl.setAttribute("type", "checkbox");
		this.checkboxEl.setAttribute("id", id);
		shadowRoot.appendChild(this.checkboxEl);

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

	connectedCallback() {}
}

window.customElements.define("my-checkbox", MyCheckbox);
