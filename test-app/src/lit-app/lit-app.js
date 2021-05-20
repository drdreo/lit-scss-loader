import {html, LitElement} from "lit";

import LitAppStyles from "./lit-app-styles.scss";

/**
 * @customElement
 * @lit
 */
class LitApp extends LitElement {

    static get styles() {
        return [LitAppStyles];
    }

    static get properties() {
        return {
            prop1: {
                type: String,
                value: "lit-app"
            }
        };
    }

    render() {
        return html`
            <style>
                :host {
                    display: block;
                }
            </style>
            <div class="section">
                <h2>Hello ${this.prop1}!</h2>
                <input type="text" value="${this.prop1}" @change="${(e) => this.prop1 = e.target.value}"/>
                <div>
                    This is lit-app.js
                    😉😉😉😉😉
                </div>
                <div id="he">
                    Foobar
                </div>
            </div>
        `;
    }
}

window.customElements.define("lit-app", LitApp);
