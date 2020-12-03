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
        if(color=='r'){             
            let newValue = 0;
            if(uintArray[x]+amount>255){
                newValue = (uintArray[x]+amount)-255;
            }
            else{
                newValue = uintArray[x]+amount;
            }            
            newArray.push(newValue, uintArray[x+1], uintArray[x+2], uintArray[x+3]);
        }
        else if(color=='g'){            
            let newValue = 0;
            if(uintArray[x+1]+amount>255){
                newValue = (uintArray[x+1]+amount)-255;
            }
            else{
                newValue = uintArray[x+1]+amount;
            }            
            newArray.push(newValue, newValue, uintArray[x+2], uintArray[x+3]);
        }
        else if(color=='b'){            
            let newValue = 0;
            if(uintArray[x+2]+amount>255){
                newValue = (uintArray[x+2]+amount)-255;
            }
            else{
                newValue = uintArray[x+2]+amount;
            }            
            newArray.push(newValue, uintArray[x+1], newValue, uintArray[x+3]);
        }
        else if(color=='a'){
            let newValue = 0;
            if(uintArray[x+3]+amount>255){
                newValue = (uintArray[x+3]+amount)-255;
            }
            else{
                newValue = uintArray[x+3]+amount;
            }            
            newArray.push(newValue, uintArray[x+1], uintArray[x+2], newValue);
        }
    }
    let returnArray = new Uint8ClampedArray(newArray)
    return returnArray;
}

export const invertColors = (uintArray)=>{
    let newArray = [];
    for(let x=0; x<uintArray.length; x=x+4){             
        newArray.push(255-uintArray[x], 255-uintArray[x+1], 255-uintArray[x+2], uintArray[x+3]);        
    }
    return new Uint8ClampedArray(newArray);
}

export const grayscale = (uintArray)=>{    
    let newArray = [];
    for (let i = 0; i < uintArray.length; i += 4) {
        let avg = (uintArray[i] + uintArray[i + 1] + uintArray[i + 2]) / 3;        
        newArray.push(avg, avg, avg, uintArray[i+3]);
    }
    return new Uint8ClampedArray(newArray);
};

export const colorLevels = (uintArray)=>{
    let colorLevels = {
        red: 0,
        green: 0,
        blue: 0,
        alpha: 0
    };

    for(let x=0; x<uintArray.length; x=x+4){             
        colorLevels.red += uintArray[x];
        colorLevels.green += uintArray[x+1];
        colorLevels.blue += uintArray[x+2];
        colorLevels.alpha += uintArray[x+3];      
    }
    
    colorLevels.red = Math.ceil(colorLevels.red/(uintArray.length/4));
    colorLevels.green = Math.ceil(colorLevels.green/(uintArray.length/4));
    colorLevels.blue = Math.ceil(colorLevels.blue/(uintArray.length/4));
    colorLevels.alpha = Math.ceil(colorLevels.alpha/(uintArray.length/4));   

    return colorLevels;
}