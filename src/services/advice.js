import {post} from "../utils/request";

const saveUrl = 'api/advice/save'

export function save(param,callback) {
  return post(saveUrl,param,callback)
}


