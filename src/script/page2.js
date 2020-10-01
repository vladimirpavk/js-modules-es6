import counter from './utils/counterBuilder.js';
import * as Math from './utils/math.js';
import * as HtmlParser from './utils/htmlParser.js';

//console.log('From module imports', Counter, Math, HtmlParser);
//let counter = new Counter();
/* let counterElement = HtmlParser.getCounter();

setInterval(()=>{
    counterElement.innerHTML = counter.getValue();
    counter.increment();
}, 1000);

HtmlParser.getResetButton().addEventListener('click', (event)=>{
    counter.value = Math.resetValue();
});

HtmlParser.getPlusButton().addEventListener('click', (event)=>{
    counter.value = Math.addValue(counter.value, 5);
});

HtmlParser.getMinusButton().addEventListener('click', (event)=>{
    counter.value = Math.subValue(counter.value, 5);
});

HtmlParser.getPrevPageButton().addEventListener('click', (event)=>{
    HtmlParser.getWindow().history.back();
}) */

