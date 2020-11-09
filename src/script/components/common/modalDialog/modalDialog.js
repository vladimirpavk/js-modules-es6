class ModalDialog extends HTMLElement{
    _template = `        
        <div class="modal-content">
            <span class="close" id="close">&times;</span>
            <p>Some text in the Modal..</p>
        </div>
    `;

    _shadowRoot;
    _modalDialog;

    constructor(){
        super();

        this._shadowRoot = this.attachShadow({mode:'closed'});

        let linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('href', './script/components/common/modalDialog/modalDialog.css');
        this._shadowRoot.appendChild(linkElement);

        this._modalDialog = document.createElement('div');       
        this._modalDialog.setAttribute('id', 'modal_dialog') ;
        this._modalDialog.setAttribute('class', 'modal');
        this._modalDialog.innerHTML = this._template;
        this._modalDialog.addEventListener('click', (event)=>{
            this._closeDialog();
        });
        this._shadowRoot.appendChild(this._modalDialog);

        this._shadowRoot.getElementById('close').addEventListener('click', ()=>{
            this._closeDialog();
        });
    }

    _closeDialog(){
        this._modalDialog.style.display = 'none';
    }

    connectedCallback(){

    }

    open(){
        this._modalDialog.style.display = 'block';
    }
}

export default ModalDialog;

window.customElements.define('mo-dal', ModalDialog);