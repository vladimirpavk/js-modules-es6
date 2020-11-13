//import every component, define all custom elements
//every module will execute only once no matter how many times is imported
import Component1 from './components/component1/component1.js';
import Component2 from './components/component2/component2.js';
import Component3 from './components/component3/component3.js';

import NavigationButton from './components/common/navigationButton/navigationButton.js';
import Counter from './components/counter/counter.js';
import Modal from './components/common/modalDialog/modalDialog.js';
import CanvasText from './components/common/canvasText/canvasText.js';

//import Configure, {Config} from './navigator.config.js';
import * as NavigatorConfig from './navigator.config.js';

class Navigator extends HTMLElement{
   
    shadowRoot;
    pathComponentMap;
    
    constructor(){
        super();

        this.shadowRoot = this.attachShadow({mode: 'closed'});
        //this.pathComponentMap = new Config(this.render.bind(this)).navigateMap;
        //initialize navigator
        NavigatorConfig.Initialize(this.render.bind(this));
        this.pathComponentMap = NavigatorConfig.navigateMap();
    }

    connectedCallback(){
        this.render('/component1');
    }

    render(pathName){
        //change url but not fire GET HTTP request
        window.history.pushState({}, '', pathName.slice(1));
        window._pathOrigin = pathName;

        //find the component we need to render        
        let componentToRender;
        this.pathComponentMap.forEach(
            (mapElement)=>{
                if(mapElement.pathName === pathName){
                    componentToRender = mapElement.component;
                }
            }
        );
        
        //render the component
        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(componentToRender);
    }
}

export default Navigator;

window.customElements.define('nav-igator', Navigator);