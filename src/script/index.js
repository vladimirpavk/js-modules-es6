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

HtmlParser.getNextPageButton().addEventListener('click', (event)=>{
    HtmlParser.getWindow().location='page2.html';
}) */

let bodyRoot = document.getElementById('root');

const resetButton = document.createElement('button');
/* resetButton.id = 'resetButton'; */
resetButton.setAttribute('id', 'resetButton');
resetButton.innerHTML = 'Reset';

const plusButton = document.createElement('button');
/* plusButton.id = 'plusButton'; */
plusButton.setAttribute('id', 'plusButton');
plusButton.innerHTML = '+5';

const minusButton = document.createElement('button');
/* minusButton.id = 'minusButton'; */
minusButton.setAttribute('id', 'minusButton');
minusButton.innerHTML = '-5';

const buttonContainer = document.createElement('div');
buttonContainer.classList.add('buttonContainer');
buttonContainer.appendChild(resetButton);
buttonContainer.appendChild(plusButton);
buttonContainer.appendChild(minusButton);

const labelCounter = document.createElement('label');
labelCounter.classList.add('counter');

const labelCounterLabel = document.createElement('label')
labelCounterLabel.classList.add('counterLabel');
labelCounterLabel.innerHTML = 'js-module counter';

const nextPageButton = document.createElement('button');
nextPageButton.classList.add('nextPageButton');
nextPageButton.innerHTML = 'Next Page';

const containerDiv = document.createElement('div');
containerDiv.classList.add('container');
containerDiv.appendChild(labelCounterLabel);
containerDiv.appendChild(labelCounter);
containerDiv.appendChild(buttonContainer);
containerDiv.appendChild(nextPageButton);

bodyRoot.appendChild(containerDiv);

console.log(containerDiv);
