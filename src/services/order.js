import {post} from "../utils/request";

const  findByUserAndStatusUrl = 'api/order/findByUserAndStatus'
const updateStatusByIdUrl = 'api/order/updateStatusById'
const deleteUrl = 'api/order/delete'

export function findByUserAndStatus(param,callback) {
  return post(findByUserAndStatusUrl,param,callback)
}

export function updateStatusById(param,callback) {
  return post(updateStatusByIdUrl,param,callback)
}

export function deleteOrder(param,callback) {
  return post(deleteUrl,param,callback)
}
