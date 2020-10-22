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
        console.log('popstate', event);
        window.history.pushState(null, null, window.location.pathname);
        /* console.log(window); */
        //console.log(event.currentTarget.location.pathname.slice(1));        
       // window.history.pushState(null, null, 'no-go-back')
      // console.log(window.location.href);
       //navigate(event.currentTarget.location.pathname);
    });

    window.addEventListener('pageshow', (event)=>{
        console.log('pageshow', event);
    });

    window.addEventListener('pagehide', (event)=>{
        console.log('pagehid', event);
    });

    window.addEventListener('hashchange', (event)=>{
        console.log('hashchange', event);
    })

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