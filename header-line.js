export function initHLine(prop){
    let rootStyle = prop.root.style;
    console.log(prop.navItems)

    function varyGradient(dir, ms){
        let i = 50;
        let j = 0;
        let itvl = setInterval(()=>{
            i = i + dir;
            rootStyle.setProperty('--h-line-grd-pos', `${i}%`);
            if(i > 99 || i < 1){
                dir = dir * -1;
            }
            j++;
            if(j ==100)
                clearInterval(itvl);
        }, ms / 100);
    }
    function setPositionX(x, ms, dir){
        rootStyle.setProperty('--h-line-time-x', `${ms}ms`);
        rootStyle.setProperty("--mouse-x", x);
        return new Promise((resolve)=>{
            setTimeout(()=>{resolve()}, ms);
        });
    }
    function setWidth(x, ms){
        rootStyle.setProperty('--h-line-time-x', `${ms}ms`);
        
        rootStyle.setProperty('--h-line-width', x);
        console.log("hia")
        return new Promise((resolve)=>{
            setTimeout(()=>{resolve()}, ms);
        });
    }
    
    function setPositionY(x, ms){
        rootStyle.setProperty('--h-line-pos-y', x);
        rootStyle.setProperty('--h-line-time-y', `${ms}ms`);
        return new Promise((resolve)=>{
            setTimeout(()=>{resolve()}, ms)
        })
    }
    function removeHiddenClass(element){
        return new Promise((resolve)=>{
            element.classList.remove('hidden-nav-li');
            resolve();
        })
    }
    function calcNextPos(element){
        let eleRect = element.getBoundingClientRect();
        let elemMid = (eleRect.left + eleRect.right)/2;
        return `${elemMid / window.innerWidth * 100}vw`;
    }
    function showNavItems (){
        return new Promise(async (resolve)=>{
            for(let item of prop.navItems){
                let itemRect = item.getBoundingClientRect();
                let itemWidth = itemRect.width * 2;
                await setPositionX(calcNextPos(item), 1000)
                await setWidth(`${itemWidth}px`, 200)
                await setPositionY('calc(10vh - 1px)', 1000)
                await removeHiddenClass(item)
                await setPositionY('0vh', 1000)
            }
            resolve();
        })
    }
    
    setPositionX('-10vw',100, -1)
    .then(()=>{return setWidth("10vw", 100)})
    .then(()=>{return setPositionX("5vw",2000, 1)})
    .then(()=>{return setPositionX("95vw",2000, 1)})
    .then(()=>{return setPositionX("5vw", 2000, -1)})
    .then(()=>{return showNavItems()})
    .then(()=>{return setPositionX("50vw", 500, -1)})
    .then(()=>{setWidth('100vw', 500)})


}