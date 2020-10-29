import Counter from '../counter/counter.js';
import { navigate } from '../../navigator.config.js';

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

        this.nextPageButton = document.createElement('button');
        this.nextPageButton.setAttribute('class', 'nextPageButton')
        this.nextPageButton.addEventListener('click', ()=>{
            if(this.canNavigate){
                console.log(this.canNavigate);
                navigate('/component2', {canNavigate1: this.canNavigate});
            }                
        });
        this.nextPageButton.innerHTML = "Go to next page";
        this.nextPageButton.disabled = true;
        buttonContainer.appendChild(this.nextPageButton);
        this.appendChild(buttonContainer);

        let canNavigateButton = document.createElement('button');
        canNavigateButton.innerHTML = 'Enable navigation';
        canNavigateButton.setAttribute('class', 'nextPageButton');
        canNavigateButton.addEventListener('click', (event)=>{
            this.canNavigate = !this.canNavigate;
            if(!this.canNavigate){
                this.nextPageButton.disabled = true;
            }
            else{
                this.nextPageButton.disabled = false;
            }
        });
        this.appendChild(canNavigateButton);

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