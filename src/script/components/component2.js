import Counter from './counter.js';

class Component2 extends HTMLElement{    
    constructor(){
        super();
    }

    connectedCallback(){
        console.log('Component2 connectedCallback()')
        this.render();
    }

    render(){
        console.log('Component2 render()');
        let counterElement = document.createElement('co-unter');
        this.appendChild(counterElement);
    }
}

export default Component2;

window.customElements.whenDefined('component-2').then(
    (data)=>{
        console.log('component2 defined', data);
    }
);


window.customElements.define('component-2', Component2);