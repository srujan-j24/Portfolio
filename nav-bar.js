export function navBarInit(){
    let wrapper = document.getElementById("h-line-wrapper");
    let navbarStyle = document.getElementById('navbar').style;
    let navElements = Array.from(document.getElementsByClassName('nav-li'));
    let vGrdMouse = '--grd-mouse';
    let vGrdStart = '--grd-start';
    let vGrdMid = '--grd-mid';
    let vGrdEnd = '--grd-end';
    let vGrdColor = '--grd-color';
    let grdMidPos = 50;
    let grdStartPos = 50;
    let grdEndPos = 50;

    let grdCornerInterval;
    let mainOffset = 50;
    console.log(navElements)

    function setNavVar(name, value){
        navbarStyle.setProperty(name, value);
    }

    function fixGrdCorners(startPos, endPos, delay){
        let curGrdStyle = getComputedStyle(wrapper, '::after');
        grdStartPos = parseInt(curGrdStyle.getPropertyValue("height").slice(0, -1));
        grdEndPos =  parseInt(curGrdStyle.getPropertyValue("width").slice(0, -1));
        startPos = parseInt(startPos);
        endPos = parseInt(endPos);
        clearInterval(grdCornerInterval);
        return new Promise((resolve)=>{
            let startDir = grdStartPos < startPos ? +1 : -1;
            let endDir = grdEndPos > endPos ? -1 : +1;

            grdCornerInterval = setInterval(()=>{
                if(grdStartPos != startPos){
                    setNavVar(vGrdStart, `${grdStartPos+=startDir}%`);
                }
                if(grdEndPos != endPos){
                    setNavVar(vGrdEnd, `${grdEndPos+=endDir}%`);
                }
                if(grdStartPos == startPos && grdEndPos == endPos){
                    clearInterval(grdCornerInterval);
                    resolve();
                }
            }, delay);
        })
    }

    function addhoverEffect(){
        let expandTimeOut;
        for(let element of navElements){
            element.addEventListener("mouseover", ()=>{
                clearTimeout(expandTimeOut);
                let {right, left} = element.getBoundingClientRect();
                let ww = window.innerWidth;
                fixGrdCorners(Math.floor(left/ww*100), Math.ceil(right/ww*100), 5);
            });
            element.addEventListener("mouseout", ()=>{
                let {width} = element.getBoundingClientRect();
                let offset = width / window.innerWidth * 100 / 2;
                setNavVar(vGrdStart, `calc(var(${vGrdMouse}) - ${offset}%)`);
                setNavVar(vGrdEnd, `calc(var(${vGrdMouse}) + ${offset}%)`);
                mainOffset = offset;
                expandTimeOut = setTimeout(()=>{
                    fixGrdCorners(0, 100, 10)
                }, 500)
            })
        }
    }
    function followMouse(){
        document.addEventListener("mousemove", (e)=>{
            let curMousePercent = e.clientX / window.innerWidth * 100;
            setNavVar(vGrdMouse, `${curMousePercent}%`);
        })
    }


    fixGrdCorners(0, 100, 15)
    .then(()=>{
        followMouse();
        addhoverEffect();
    })
}