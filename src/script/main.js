import Component1 from './components/component1.js';
import Component2 from './components/component2.js';


const component1 = document.createElement('component-1');
const component2 = document.createElement('component-2');

const rootComponent = document.getElementById('root').appendChild(component1);

/* import { containerDiv as indexComponent } from './index.js';

indexComponent.addEventListener('nextPage', (eventData)=>{
    console.log(eventData);
})

document.getElementById('root').appendChild(indexComponent); */