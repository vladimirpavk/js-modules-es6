import Counter from '../counter/counter.js';
import { navigate } from '../../navigator.config.js';

class Component3 extends HTMLElement{    
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
        title.innerHTML = 'Page 3';
        titleContainer.appendChild(title);

        this.appendChild(titleContainer);

        let counterElement = document.createElement('co-unter');
        this.appendChild(counterElement);

        let buttonContainer = document.createElement('div');
        buttonContainer.setAttribute('class', 'buttonContainer');

        let prevPageButton = document.createElement('button');
        prevPageButton.setAttribute('class', 'prevPageButton')
        prevPageButton.addEventListener('click', ()=>{
            navigate('/component2');
        });
        prevPageButton.innerHTML = "Back to previous page";
        buttonContainer.appendChild(prevPageButton);      

        this.appendChild(buttonContainer);

        let linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('href', './script/components/component3/component3.css');

        this.appendChild(linkElement);
    }
}

export default Component3;

/* window.customElements.whenDefined('component-2').then(
    (data)=>{
        console.log('component2 defined', data);
    }
); */

window.customElements.define('component-3', Component3);