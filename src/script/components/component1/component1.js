import Counter from '../counter/counter.js';
import { navigate } from '../../navigator.config.js';

class Component1 extends HTMLElement{
    constructor(){
        super();            
    }

    connectedCallback(){
        this.innerHTML = '';
        this.render();

        window.history.pushState({}, '', 'component1');
    }

    render(){
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

        let nextPageButton = document.createElement('button');
        nextPageButton.setAttribute('class', 'nextPageButton')
        nextPageButton.addEventListener('click', ()=>{
            this.dispatchEvent(new Event('nextPageClicked'));
            //this.dispatchEvent(new CustomEvent('navigate', { detail : '/component2'}));
            navigate('/component2');
        });
        nextPageButton.innerHTML = "Go to next page";
        buttonContainer.appendChild(nextPageButton);
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