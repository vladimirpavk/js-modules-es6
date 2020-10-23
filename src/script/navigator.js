import Component1 from './components/component1/component1.js';
import Component2 from './components/component2/component2.js';
import Component3 from './components/component3/component3.js';

//import Configure, {Config} from './navigator.config.js';
import * as NavigatorConfig from './navigator.config.js';

class Navigator extends HTMLElement{

    component1Visible;
    component1;
    component2;
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

    render(pathName, componentState){
        window.history.pushState(componentState, '', pathName.slice(1));
        
        this.shadowRoot.innerHTML = '';
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