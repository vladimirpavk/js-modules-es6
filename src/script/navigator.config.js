let _pathComponentNameMap = [
    {
        componentTag: 'component-1',
        pathName: '/component1'
    },
    {
        componentTag: 'component-2',
        pathName: '/component2'
    }
];

let _pathComponentMap = [];

let _renderFn;

export default class Config{
    constructor(renderFn){     
        _renderFn = renderFn;

        window.addEventListener('popstate', (event)=>{
            console.log(event.currentTarget.location.pathname.slice(1));
        });

        _pathComponentNameMap.forEach(
            (map)=>{
                let tempComponent = document.createElement(map.componentTag);
                tempComponent.addEventListener('navigate', (event)=>{
                    //event.detail === path - pathName of the component to navigate to                    
                    renderFn(event.detail);        
                });
        
                _pathComponentMap.push({                               
                    component: tempComponent,
                    pathName: map.pathName       
                });
            }
        );
    }

    get navigateMap(){
        return _pathComponentMap;
    }    
}

export const navigate=(path)=>{
    _renderFn(path);
}