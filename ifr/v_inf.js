import { html, Component, render } from 'https://unpkg.com/htm/preact/index.mjs?module';
import { observer } from '../modules/mobx_preact.module.js';
import imob from "./v_imob.js"

let v_dat=()=>{

  let v_list=imob.data.map(i=>html`
    <ul class="mobile__items" key=${i.id}>
      <li><a href="#">${i.name}</a>${i.id}</li>
    </ul>`)

return html`
 <div>
   ${v_list}
 </div>`

}

render(v_dat(), document.getElementById("root"))