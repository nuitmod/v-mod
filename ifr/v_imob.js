import { decorate, observable, computed, action, autorun, toJS } from '../modules/mobx.module.js';

let imob={
  data:[
      { id: 1, name: "v1", url: "../vid/yiwu_1.mp4", vid_id: "vid_1"},
      { id: 2, name: "v2", url: "../vid/yiwu_2.mp4", vid_id: "vid_2"}
  ]
}

decorate(imob, {
    // inf: observable,
    // type: observable,
    // message: observable,
    data: observable,
    // set_active: action,
//    ch_store: action,
//    del_w: action
})


export default imob;
