import Counter from '../counter/counter.js';
import { navigate } from '../../navigator.config.js';

class Component2 extends HTMLElement{    
    constructor(){
        super();
    }

    connectedCallback(){    
        this.innerHTML = '';
        this.render();
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