import { html, LitElement } from 'lit-element';

import LitAppStyles from './lit-app-styles.scss';

/**
 * @customElement
 * @lit
 */
class LitApp extends LitElement {

  static get styles(){
    return [LitAppStyles]
  }

  render() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello ${this.prop1}!</h2>
      <input type="text" value="${this.prop1}" @change="${(e) => this.prop1 = e.target.value}" />
      <div>
      This is lit-app.js   
      😉😉😉😉😉
      </div>
      <div id="he">
        Poop
      </div>
    `;
  }

  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'lit-app',
      },
    };
  }
}

window.customElements.define('lit-app', LitApp);
