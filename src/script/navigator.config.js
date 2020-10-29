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
    //define window.moduleNavigation state
    window.moduleNavigation = {};

    _renderFn = renderFn;

    _pathComponentNameMap.forEach(
        (map)=>{
            let tempComponent = document.createElement(map.componentTag);
            _pathComponentMap.push({                               
                component: tempComponent,
                pathName: map.pathName       
            });
        }
    );

    window.addEventListener('popstate', (event)=>{
       //console.log(event, window.moduleNavigation, event.currentTarget.location.pathname, window.location.href);
       console.log(window.moduleNavigation);
       if(window.moduleNavigation.canNavigate){
           this.navigate(event.currentTarget.location.pathname)
       }
       else{
           //check if you want to show error msg
           window.history.pushState({navigationError:true}, '', window.moduleNavigation.pathOrigin);
           //cause a component to re-render and show error message or smtg like that
           let tempComponent = _pathComponentMap.filter(
               (mapEntry)=>{
                   return mapEntry.pathName===window._pathOrigin                   
               });            
            tempComponent[0].component.render();
       }
    });   
}

export const navigate=(path)=>{    
    _renderFn(path);
}

export const navigateMap = ()=>{
    return _pathComponentMap;    
}