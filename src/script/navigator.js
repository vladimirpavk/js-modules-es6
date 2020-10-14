import Component1 from './components/component1/component1.js';
import Component2 from './components/component2/component2.js';

class Navigator extends HTMLElement{

    component1Visible;
    component1;
    component2;
    shadowRoot;
    
    constructor(){
        super();

        let name = '';
        window.addEventListener('popstate', (event)=>{
            console.log(event.currentTarget.location.pathname.slice(1));
            name='pavle';
        });

        this.shadowRoot = this.attachShadow({mode: 'closed'});

        //default visible component
        this.component1Visible = true;

        this.component1 = document.createElement('component-1');
        this.component1.addEventListener('nextPageClicked', (e)=>{            
            this.component1Visible = false;
            this.render();
        });

        this.component2 = document.createElement('component-2');
        this.component2.addEventListener('prevPageClicked', (e)=>{            
            this.component1Visible = true;
            this.render();
        });
    }

    connectedCallback(){
        this.render();
    }

    render(){    
        if(this.component1Visible){
            this.shadowRoot.innerHTML = '';
            this.shadowRoot.appendChild(this.component1);
        }
        else{
            this.shadowRoot.innerHTML = '';
            this.shadowRoot.appendChild(this.component2);
        }
    }

}

export default Navigator;

window.customElements.define('nav-igator', Navigator);