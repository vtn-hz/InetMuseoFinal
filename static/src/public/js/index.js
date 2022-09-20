import MuseoRender from '../../services/render.service.js';

const delayAnimation = 1;

window.onload = () => {
    //consumeAPI('https://api.github.com/users/manishmshiva').then(json => console.log(json));
    

    const MuseoRenderInstance =  MuseoRender ();

    setTimeout(()=>{
        MuseoRenderInstance.startUp();
    }, delayAnimation);
}



const textToVoice = text => {
    /*to do*/
    const synth = window.speechSynthesis
    const utterThis = new SpeechSynthesisUtterance(text)
}
