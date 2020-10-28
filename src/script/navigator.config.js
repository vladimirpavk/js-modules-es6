let _pathComponentNameMap = [
    {
        componentTag: 'component-1',
        pathName: '/component1'
    },
    {
        componentTag: 'component-2',
        pathName: '/component2'
    },{
        componentTag: 'component-3',
        pathName: '/component3'
    }
];

let _pathComponentMap = [];
let _renderFn = null;

export const Initialize = (renderFn)=>{
    _renderFn = renderFn;

    window.addEventListener('popstate', (event)=>{
       //console.log(event, window._canNavigate, event.currentTarget.location.pathname, window.location.href);
       console.log(window._canNavigate);
       if(window._canNavigate){
           this.navigate(event.currentTarget.location.pathname)
       }
       else{
           window.history.pushState({navigationError:true}, '', window._pathOrigin);
           //cause a component to re-render
           let tempComponent = _pathComponentMap.filter(
               (mapEntry)=>{
                   //console.log(mapEntry);
                   return mapEntry.pathName===window._pathOrigin                   
               });
            console.log(tempComponent[0]);
            tempComponent[0].render();
       }
    });
 
    _pathComponentNameMap.forEach(
        (map)=>{
            let tempComponent = document.createElement(map.componentTag);
            _pathComponentMap.push({                               
                component: tempComponent,
                pathName: map.pathName       
            });
        }
    );
}

export const navigate=(path)=>{    
    _renderFn(path);
}

export const navigateMap = ()=>{
    return _pathComponentMap;    
}