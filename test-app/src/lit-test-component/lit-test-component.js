import {html, LitElement} from "lit";

import Style1 from "./style-1.scss";
import Style2 from "./style-2.scss";

class LitTestComponent extends LitElement {

    constructor() {
        super();

        this.prop1 = "🔥-app";
    }

    static get properties() {
        return {
            prop1: {
                type: String
            }
        };
    }

    static get styles() {
        return [Style1, Style2];
    }

    render() {
        return html`
            <div class="section">
                <p>This is the lit-test-component</p>
                <p>This is the property's value: ${this.prop1} </p>
                <div id="test">This font size should be bigger</div>
            </div>
        `;
    }

}

window.customElements.define("lit-test-component", LitTestComponent);
