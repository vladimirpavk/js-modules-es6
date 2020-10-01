import { containerDiv as indexComponent } from './index.js';

indexComponent.addEventListener('nextPage', (eventData)=>{
    console.log(eventData);
})
document.getElementById('root').appendChild(indexComponent);