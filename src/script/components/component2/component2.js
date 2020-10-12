import Counter from '../counter/counter.js';

class Component2 extends HTMLElement{    
    constructor(){
        super();
    }

    connectedCallback(){    
        this.innerHTML = '';
        this.render();
    }

    render(){
        let counterElement = document.createElement('co-unter');
        this.appendChild(counterElement);

        let prevPageButton = document.createElement('button');
        prevPageButton.setAttribute('class', 'prevPageButton')
        prevPageButton.addEventListener('click', ()=>{
            this.dispatchEvent(new Event('prevPageClicked'));
        });
        prevPageButton.innerHTML = "Back to previous page";
        this.appendChild(prevPageButton);

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