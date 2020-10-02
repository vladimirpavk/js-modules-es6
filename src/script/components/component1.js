import Counter from './counter.js';

class Component1 extends HTMLElement{
    constructor(){
        super();
        console.log('Component1 constructor()');
        this.render();
    }

    render(){
        console.log('Component1 render()');
        let counterElement = document.createElement('co-unter');
        this.appendChild(counterElement);
    }
}

export default Component1;

window.customElements.whenDefined('component-1').then(
    (data)=>{
        console.log('component-1 defined', data);
    }
);

window.customElements.define('component-1', Component1);