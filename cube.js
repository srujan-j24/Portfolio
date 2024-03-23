import anime from "animejs";

export function setCube(element){
    let root = document.documentElement;
    
    function cubeStart(){
        element.animate(
            {
                scale: [1, 0, 0, 0],
            },
            {
                duration: 1600,
                fill: 'forwards'     
            }
        )
    }    
    function load(){
        element.classList.add("cube-loader");
        element.animate(
            {
                outlineOffset: ['-1px', '0.5rem', '-1px', '-1px', '-1px', '0.5rem', '-1px', '-1px', '-1px'],
                rotate: ['0deg', '45deg', '90deg', '135deg', '180deg', '225deg', '270deg', '315deg', '360deg'],
                borderRadius: [0, 0, 0, '1rem', 0, 0, 0, '1rem', 0]
            },
            {
                name: 'load_spin',
                duration: 10000,
                iterations: Infinity,
            }
        )
        let cancelLoadAni = ()=>{
            element.getAnimations()[0].playbackRate = 10;
            cubeStart();
            setTimeout(()=>{
                console.log(element.getAnimations());
                element.getAnimations()[0].cancel();
                element.removeEventListener("click", cancelLoadAni);
                element.classList.remove("cube-loader");
                root.style.setProperty("--cube-height", "2rem");
                root.style.setProperty("--cube-width", "2rem");
                element.classList.add("cube-start");
                document.getElementById('cube-img').setAttribute("src", './rocket.svg')
                document.getElementById("s1-prtn").classList.add("s1-prtn-vis");
                document.getElementById("hd").classList.add("header-expand")
            }, 800);
            setTimeout(()=>{
                document.getElementById("btm-line").classList.add('btm-line-vis');
            }, 1600)
            
        }
        element.addEventListener("click", cancelLoadAni );
    }

    load();
}