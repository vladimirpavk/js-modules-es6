import Counter from './counter/counter.js';

class Component1 extends HTMLElement{
    constructor(){
        super();    
    }

    connectedCallback(){
        this.render();
    }

    render(){
        let counterElement = document.createElement('co-unter');
        counterElement.addEventListener('plusButtonClicked', function(){
            console.log('Counter +5 button clicked');
        });
        counterElement.addEventListener('minusButtonClicked', function(){
            console.log('Counter -5 button clicked');
        });
        counterElement.addEventListener('resetButtonClicked', function(){
            console.log('Counter reset button clicked');
        });

        let val=0;
        setInterval(()=>{
            val++;
            counterElement.setAttribute('value', val);
        },300); 
               
        this.appendChild(counterElement);
    }
}

export default Component1;

/* window.customElements.whenDefined('component-1').then(
    (data)=>{
        console.log('component-1 defined', data);
    }
); */

window.customElements.define('component-1', Component1);