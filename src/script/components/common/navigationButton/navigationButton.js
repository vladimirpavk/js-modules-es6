class NavigationButton extends HTMLElement{

    _enabled;

    get enabled(){
        return this._enabled;
    }

    set enabled(value){
        //value can be true or false       
        this._enabled = value;
        this.dispatchEvent(new CustomEvent('checked', { detail: { checked: this.enabled}}));
    }

    constructor(){
        super();
    }

    connectedCallback(){    
        //set initial state
        this._enabled = false;

        this.render();
    }

    disconnectedCallback(){

    }


}