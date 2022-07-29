class Widget extends HTMLElement {
  connectedCallback() {
    const userName = this.attributes.username.value;
    // this.innerHTML = `<button>Hello World... ${userName}</button>`;
    this.style.color = "red";
    this.onclick = function () {
      alert("hurray");
    };
  }
}

customElements.define("feedback-widget", Widget);
