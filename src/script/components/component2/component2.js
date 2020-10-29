import Counter from '../counter/counter.js';
import { navigate } from '../../navigator.config.js';

class Component2 extends HTMLElement{    

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

    constructor(){
        super();        
    }

    connectedCallback(){                    
        //set navigation state       
        this.canNavigate = false;
        this.pathOrigin = 'component2';

        this.render();
    }

    disconnectedCallback(){
        console.log('component2 is now disconnected...');        
        window.history.pushState({canNavigate2:canNavigate}, '', window.location.href); 
    }

    render(){
        this.innerHTML = ''; 

        console.log('render component 2');
        console.log(window.history.state);        

        let titleContainer = document.createElement('div');
        titleContainer.setAttribute('class', 'titleContainer');

        //show message if navigation blocked occured
        if(window.history.state.navigationError){
            let errorMsg = document.createElement('label');
            errorMsg.setAttribute('class', 'errorMsg');
            errorMsg.innerHTML = 'Blocked navigation !!!';
            titleContainer.appendChild(errorMsg);
        }       

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
        prevPageButton.setAttribute('class', 'navigationButton');
        prevPageButton.addEventListener('click', ()=>{
            navigate('/component1');
        });
        prevPageButton.innerHTML = "Back to previous page";
        buttonContainer.appendChild(prevPageButton);

        let nextPageButton = document.createElement('button');
        nextPageButton.setAttribute('class', 'navigationButton');
        nextPageButton.disabled = true;
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