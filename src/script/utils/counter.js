class Counter{    
    constructor(){
        this.value = 0;
    }
    getValue = ()=>this.value;
    increment = ()=>this.value = this.value + 1;
}

export default Counter;