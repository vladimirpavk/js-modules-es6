class ModalDialog extends HTMLElement{
    _template = `
        <template id="modal_template">
            <link rel='stylesheet' href='./script/components/common/modalDialog/modalDialog.css' />
            <div id="modal_dialog" class="modal">

            </div>
        </template>
    `;

    _shadowRoot;

    constructor(){
        super();
        
        this._shadowRoot = this.attachShadow({mode:'closed'}).appendChild(this._template.content.cloneNode(true));
    }

    connectedCallback(){

    }
}

export default ModalDialog;

window.customElements.define('mo-dal', ModalDialog);