import Counter from '../counter/counter.js';
import { navigate } from '../../navigator.config.js';

import NavigationButton from '../common/navigationButton/navigationButton.js';

class Component1 extends HTMLElement{

    get canNavigate(){
        return window.moduleNavigation.canNavigate;
    }
    set canNavigate(value){
        window.moduleNavigation.canNavigate = value;
    }

    get pathOrigin(){
        return window.moduleNavigation.pathOrigin;
    }
    set pathOrigin(value){
        window.moduleNavigation.pathOrigin = value;
    }
    
    nextPageButton;

    constructor(){
        super();                    
    }

    connectedCallback(){                
        //set navigation state       
        this.canNavigate = false;
        this.pathOrigin = 'component1';

        this.render();
    }

    render(){
        this.innerHTML = '';
        let titleContainer = document.createElement('div');
        titleContainer.setAttribute('class', 'titleContainer');
        let title = document.createElement('label');
        title.setAttribute('class', 'pageTitle');
        title.innerHTML = 'Page 1';
        titleContainer.appendChild(title);

        this.appendChild(titleContainer);

        let counterElement = document.createElement('co-unter');
        this.appendChild(counterElement);

        let buttonContainer = document.createElement('div');
        buttonContainer.setAttribute('class', 'buttonContainer');

        let navigateButtonNext = document.createElement('nav-button');
        navigateButtonNext.setAttribute('text', 'Go to next page');
        navigateButtonNext.setAttribute('disabled', '');
        navigateButtonNext.addEventListener('checked', (event)=>{
            //console.log(event.detail.disabled);
            this.canNavigate = !event.detail.disabled;            
        });
        navigateButtonNext.addEventListener('navigate', (event)=>{
            console.log('navigate', event);
        })
        
        buttonContainer.appendChild(navigateButtonNext);
        this.appendChild(buttonContainer);

        let linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('href', './script/components/component1/component1.css');

        this.appendChild(linkElement);      
    }
}

export default Component1;

/* window.customElements.whenDefined('component-1').then(
    (data)=>{
        console.log('component-1 defined', data);
    }
); */

window.customElements.define('component-1', Component1);