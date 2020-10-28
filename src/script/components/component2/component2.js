import Counter from '../counter/counter.js';
import { navigate } from '../../navigator.config.js';

class Component2 extends HTMLElement{    

  /*   _canNavigate;
    get canNavigate(){
        return this._canNavigate;
    }
    set canNavigate(value){
        console.log('canNavigate value changed, new value ', value);
        this._canNavigate = value;                     
    } */

    get canNavigate(){
        return window._canNavigate;
    }
    set canNavigate(value){
        window._canNavigate = value;
    }

    constructor(){
        super();        
    }

    connectedCallback(){            
        this.innerHTML = '';        
        this.canNavigate = false;
        //window._pathOrigin = 'component2';

        console.log(window.history.state);

        this.render();
    }

    disconnectedCallback(){
        console.log('component2 is now disconnected...');        
        window.history.pushState({canNavigate2:canNavigate}, '', window.location.href); 
    }

    render(){
        let titleContainer = document.createElement('div');
        titleContainer.setAttribute('class', 'titleContainer');
        let title = document.createElement('label');
        title.setAttribute('class', 'pageTitle');
        title.innerHTML = 'Page 2';
        titleContainer.appendChild(title);

        this.appendChild(titleContainer);

        let counterElement = document.createElement('co-unter');
        this.appendChild(counterElement);

        let buttonContainer = document.createElement('div');
        buttonContainer.setAttribute('class', 'buttonContainer');

        let prevPageButton = document.createElement('button');
        prevPageButton.setAttribute('class', 'prevPageButton')
        prevPageButton.addEventListener('click', ()=>{
            navigate('/component1');
        });
        prevPageButton.innerHTML = "Back to previous page";
        buttonContainer.appendChild(prevPageButton);

        let nextPageButton = document.createElement('button');
        nextPageButton.setAttribute('class', 'nextPageButton')
        nextPageButton.addEventListener('click', ()=>{
            navigate('/component3');
        });
        nextPageButton.innerHTML = "Go to next page";
        buttonContainer.appendChild(nextPageButton);

        this.appendChild(buttonContainer);

        let linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('href', './script/components/component2/component2.css');

        this.appendChild(linkElement);
    }
}

export default Component2;

/* window.customElements.whenDefined('component-2').then(
    (data)=>{
        console.log('component2 defined', data);
    }
); */

window.customElements.define('component-2', Component2);