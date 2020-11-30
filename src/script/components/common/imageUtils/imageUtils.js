export const avgColors = (uintArray)=>{
    return{
        red: 5,
        green: 10,
        blue: 142,
        alpha: 0.5
    }
}

export const enhanceColor = (color, amount, uintArray)=>{
    let newArray = [];
    for(let x=0; x<uintArray.length; x=x+4){
        if(color==='r'){    
            newArray.push(uintArray[x]+amount, uintArray[x+1], uintArray[x+2], uintArray[x+3]);
        }
        else if(color==='g'){            
            newArray.push(uintArray[x], uintArray[x+1]+amount, uintArray[x+2], uintArray[x+3]);
        }
        else if(color==='b'){            
            newArray.push(uintArray[x], uintArray[x+1], uintArray[x+2]+amount, uintArray[x+3]);
        }
    }
    return new Uint8ClampedArray([newArray]);
}

export const inverColors = (uintArray)=>{
    let newArray = [];
    for(let x=0; x<uintArray.length; x=x+4){             
        newArray.push(255-uintArray[x], 255-uintArray[x+1], 255-uintArray[x+2]+amount, uintArray[x+3]);        
    }
    return new Uint8ClampedArray([newArray]);
}