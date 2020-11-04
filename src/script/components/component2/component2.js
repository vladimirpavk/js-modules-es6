import { navigate } from '../../navigator.config.js';

class Component2 extends HTMLElement{    

    _prevPageButton;
    _nextPageButton;

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

    }

    render(){
        this.innerHTML = '';          

        let linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('href', './script/components/component2/component2.css');
        this.appendChild(linkElement); 

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

        let prevNavigationButton = document.createElement('nav-button');
        prevNavigationButton.setAttribute('text', 'Back to previous page');
        prevNavigationButton.setAttribute('disabled', '');
        prevNavigationButton.addEventListener('checked', (event)=>{
            //console.log('prevNav checked...');
            this.canNavigate = !event.detail.disabled;
        });
        prevNavigationButton.addEventListener('navigate', (event)=>{
            //console.log('preNav navigate...');
            if(this.canNavigate){
                navigate('/component1');
            }
        });

        buttonContainer.appendChild(prevNavigationButton);

        let nextNavigationButton = document.createElement('nav-button');
        nextNavigationButton.setAttribute('text', 'Go to next page');
        nextNavigationButton.setAttribute('disabled', '');
        nextNavigationButton.addEventListener('checked', (event)=>{
            //console.log('nextNav checked...');
        });
        nextNavigationButton.addEventListener('navigate', (event)=>{
            //console.log('nextNav navigate...');
            navigate('/component3');
        });

        buttonContainer.appendChild(nextNavigationButton);

        this.appendChild(buttonContainer);    
    }
}

export default Component2;

/* window.customElements.whenDefined('component-2').then(
    (data)=>{
        console.log('component2 defined', data);
    }
); */

window.customElements.define('component-2', Component2);