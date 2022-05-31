import { html, Component, render } from 'https://unpkg.com/htm/preact/index.mjs?module';
import { useState } from "../modules/preact_hooks.module.js"
import { observer } from '../modules/mobx_preact.module.js';
import imob from "./v_imob.js"


let togglePictureInPicture=v=>{
  if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
  } else {
    if (document.pictureInPictureEnabled) {
      v.requestPictureInPicture();
    }
  }
}


let pip_act=v_id=>{
   let el=document.getElementById(v_id);
   togglePictureInPicture(el);
}


let v_dat=()=>{

  let v_list=imob.data.map(i=>html`
    <ul key=${i.id}>
      <li>
        <a href="#">${i.name}</a>${i.id}
        <video src=${i.url} id=${i.vid_id} muted="" controls="true" autoplay="" height="90" width="200"></video>
        <button id="btn" onclick=${()=>pip_act(i.vid_id)}>pip ${i.name}</button>
      </li>
    </ul>`)

return html`
 <div>
   ${v_list}
 </div>`

}

render(v_dat(), document.getElementById("root"))