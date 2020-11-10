class ModalDialog extends HTMLElement{
    _template = `        
        <template id='my_template'>
            <div class="modal-content" id="modal_content">
                <span class="close" id="close">&times;</span>
                <p>Some text in the Modal..</p>
            </div>
        </template>
    `;

    _shadowRoot;
    _modalDialog;
    _opened;

    constructor(){
        super();

        this.render();       
    }

    render(){
        this._shadowRoot = this.attachShadow({mode:'closed'});

        let linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('href', './script/components/common/modalDialog/modalDialog.css');
        this._shadowRoot.appendChild(linkElement);

        this._modalDialog = document.createElement('div');       
        this._modalDialog.setAttribute('id', 'modal_dialog') ;
        this._modalDialog.setAttribute('class', 'modal');
        //this._modalDialog.innerHTML = this._template.content.cloneNode(true);
        console.log(this._template.getElementbyId('my_template'));
        this._modalDialog.addEventListener('click', (event)=>{   
            event.stopPropagation();                     
            this._closeDialog();
        });
        this._shadowRoot.appendChild(this._modalDialog);

       /*  this._shadowRoot.getElementById('close').addEventListener('click', (event)=>{            
            event.stopPropagation();
            this._closeDialog();
        }); */

       /*  this._shadowRoot.getElementById('modal_content').addEventListener('click',(event)=>{        
            event.stopPropagation();
        }); */
    }

    _closeDialog(){
        this._modalDialog.style.display = 'none';
    }

    connectedCallback(){        
        if(!this.hasAttribute('opened')) this._closeDialog();
    }

    _openDialog(){
        this._modalDialog.style.display = 'block';
    }

    static get observedAttributes(){
        return ['opened'];
    }

    attributeChangedCallback(name, oldValue, newValue){
        //console.log(name, oldValue, newValue);
        if(name === 'opened'){
            if(newValue === 'true')
                this._openDialog();            
            else        
                this._closeDialog();            
        }
    }
}

export default ModalDialog;

window.customElements.define('mo-dal', ModalDialog);