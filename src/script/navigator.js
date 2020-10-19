import Component1 from './components/component1/component1.js';
import Component2 from './components/component2/component2.js';

import Config from './navigator.config.js';

class Navigator extends HTMLElement{

    component1Visible;
    component1;
    component2;
    shadowRoot;
    pathComponentMap;
    
    constructor(){
        super();

        this.shadowRoot = this.attachShadow({mode: 'closed'});
        this.pathComponentMap = new Config(this.render.bind(this)).navigateMap;

       /*  let name = '';
        window.addEventListener('popstate', (event)=>{
            console.log(event.currentTarget.location.pathname.slice(1));
            name='pavle';
        }); */             
        //console.log(this.pathComponentNameMap, this.pathComponentMap);
    }

    connectedCallback(){
        this.render('/component1');
    }

    render(pathName){    
        /* if(this.component1Visible){
            this.shadowRoot.innerHTML = '';
            this.shadowRoot.appendChild(this.component1);
        }
        else{
            this.shadowRoot.innerHTML = '';
            this.shadowRoot.appendChild(this.component2);
        } */
        this.shadowRoot.innerHTML = '';
        //this.shadowRoot.appendChild(this.pathComponentMap[0].component);
        let componentToRender;
        this.pathComponentMap.forEach(
            (mapElement)=>{
                if(mapElement.pathName === pathName){
                    componentToRender = mapElement.component;
                }
            }
        );
        this.shadowRoot.appendChild(componentToRender);
    }

}

export default Navigator;

window.customElements.define('nav-igator', Navigator);