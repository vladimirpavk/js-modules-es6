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
       //navigate(event.currentTarget.location.pathname);
       //console.log('popstate', window.history);
      /*  window.history.back(1);
       window.history.pushState({}, '', window.location.href); */
       console.log(event.state);
    });

 /*    window.addEventListener('pageshow', (event)=>{
        console.log('pageshow', event);
    });

    window.addEventListener('pagehide', (event)=>{
        console.log('pagehid', event);
    });

    window.addEventListener('hashchange', (event)=>{
        console.log('hashchange', event);
    }) */

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

export const navigate=(path, componentState)=>{    
    _renderFn(path, componentState);
}

export const navigateMap = ()=>{
    return _pathComponentMap;    
}