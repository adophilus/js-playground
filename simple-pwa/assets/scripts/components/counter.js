class Counter extends HTMLElement {
  styleTemplate = `
  #root {
    display: flex;
    width: fit-content;
    border: 3px solid black;

    #counter {
      padding: 1em;

      .container {
        padding: 1em;
      }
    }

    #incrementer {
      border-left: 3px solid black;
      background-color: #B1AFFF;
      width: 3rem;
      aspect-ratio: 1 / 1;
      display: grid;
      place-items-center;

      .trigger {
        background-color: transparent;
        stroke-width: 2px;
        cursor: pointer;
        border: 0;
      }
    }
  }
  `

  count = 0

  constructor() {
    super()

    const shadowRoot = this.attachShadow({ mode: "open" });

    const styleEl = document.createElement('style')
    styleEl.innerText = this.styleTemplate

    const containerEl = document.createElement('div')
    containerEl.setAttribute('id', 'root')

    this.countEl = document.createElement('span')
    this.countEl.classList.add('count')

    const countElContainerEl = document.createElement('div')
    countElContainerEl.setAttribute('id', 'counter')
    countElContainerEl.appendChild(this.countEl)

    const buttonContainerEl = document.createElement('div')
    buttonContainerEl.setAttribute('id', 'incrementer')
    const button = document.createElement('button')
    button.classList.add('id', 'trigger')

    button.innerHTML = `
    <svg data-slot="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="width: 1.5rem; height: 1.5rem; stroke: 1px">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"></path>
    </svg>
    `
    button.addEventListener('click', () => {
      this.incrementCount()
    })
    buttonContainerEl.appendChild(button)

    containerEl.appendChild(countElContainerEl)
    containerEl.appendChild(buttonContainerEl)

    shadowRoot.appendChild(containerEl)
    shadowRoot.appendChild(styleEl)

    this.incrementCount()
  }

  incrementCount() {
    this.count += 1
    this.countEl.innerText = this.count.toString()
  }
}

window.customElements.define('wc-counter', Counter)
