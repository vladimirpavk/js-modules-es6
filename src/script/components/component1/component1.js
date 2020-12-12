import { navigate } from '../../navigator.config.js';

class Component1 extends HTMLElement{

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
    
    nextPageButton;
    _modalDialog;

    constructor(){
        super();                    
    }

    connectedCallback(){                
        //set navigation state       
        this.canNavigate = false;
        this.pathOrigin = 'component1';

        this.render();
    }

    render(){
        this.innerHTML = '';

        let linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'stylesheet');
        linkElement.setAttribute('href', './script/components/component1/component1.css');
        this.appendChild(linkElement);      

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

        let navigateButtonNext = document.createElement('nav-button');
        navigateButtonNext.setAttribute('text', 'Go to next page');
        navigateButtonNext.setAttribute('disabled', '');
        navigateButtonNext.addEventListener('checked', (event)=>{           
            this.canNavigate = !event.detail.disabled;            
        });
        navigateButtonNext.addEventListener('navigate', (event)=>{
            //
            if(this.canNavigate){
                navigate('/component2');
            }
        })            
        buttonContainer.appendChild(navigateButtonNext);
        this.appendChild(buttonContainer);      

        this._modalDialog = document.createElement('mo-dal');
        this._modalDialog.innerHTML = `<canvas-text slot="slot1"></canvas-text>`;        
        //izbaciti u production verziji
        //this._modalDialog.setAttribute('opened', true);
        this.appendChild(this._modalDialog);

        let modalButton = document.createElement('button');
        modalButton.setAttribute('class', 'Button');
        modalButton.innerHTML = 'Open modal';
        modalButton.addEventListener('click', (event)=>{        
            //this._modalDialog.open();
            this._modalDialog.setAttribute('opened', true);
        })
        this.appendChild(modalButton);

        let imageZoom = document.createElement('img');
        imageZoom.src = './assets/slika_zoom.jpg';
        imageZoom.width = 640;
        imageZoom.height = 640;

        let modalDialog2 = document.createElement('mo-dal');
        /* modalDialog2.innerHTML = `            
        <div slot="slot1">
            <div class="imageFrame">
                <img src='./assets/slika_zoom.jpg' class="zoomImage"></img>
            </div>    
        </div>
        `; */
       /*  modalDialog2.innerHTML = `
            <zoom-image slot='slot1'></zoom-image>
        `; */
        modalDialog2.innerHTML = `
            <zoom-image
                slot='slot1'                
                width="640px"                                
                height="640px"
                originalsrc='./assets/slika.jpg'
                zoomsrc='./assets/slika_zoom.jpg'>
            </zoom-image>
        `;
        this.appendChild(modalDialog2);

        //test purposes only
        modalDialog2.setAttribute('opened', true);

        let modalButton2 = document.createElement('button');
        modalButton2.setAttribute('class', 'Button');
        modalButton2.innerHTML = 'Open zoom window';
        modalButton2.addEventListener('click', (event)=>{
            modalDialog2.setAttribute('opened', true);
        });
        this.appendChild(modalButton2);
    }
}

export default Component1;
/* window.customElements.whenDefined('component-1').then(
    (data)=>{
        console.log('component-1 defined', data);
    }
); */

window.customElements.define('component-1', Component1);