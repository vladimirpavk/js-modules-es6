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

let counter;
counter.appendChild(labelCounterLabel);
counter.appendChild(labelCounter);
counter.appendChild(buttonContainer);

export default counter;

