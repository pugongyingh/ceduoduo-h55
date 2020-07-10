import {post} from '@/utils/request/index'
export function countDown(time,target,prop) {
  var timer = window.setInterval(() => {
    if(target[prop] === 0) {
      target[prop] = 60
      clearInterval(timer)
      return
    }
    target[prop] = --time
  },1000)
}

export function uploadImg(files,callback) {
  const file = files.file
  let param = new FormData();
  param.append('file',file);
  post('api/attachment/upload',param,(res) => {
    callback(res)
  })
}
