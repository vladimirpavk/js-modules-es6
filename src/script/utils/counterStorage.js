let _value = 0;

class CounterStorage{    

    constructor(defaultValue){
        if(defaultValue){
            _value = defaultValue;
        }           
        else{
            _value = 0;
        }
    }
 
    getValue(){
        return _value;
    }

    increment(){
        _value = _value + 1;
    }

    increment5(){
        _value = _value + 5;
    }

    decrement5(){
        _value = _value -5;
    }

    reset(){
        _value = 0;
    }
    
}

export default CounterStorage;