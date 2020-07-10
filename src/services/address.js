import {post} from '@/utils/request/index'
const findByIdUrl = 'api/address/findByUserId' // @param {id}
const saveUrl = 'api/address/save' // @param {}
const getUrl = 'api/address/get'
const deletionUrl = 'api/address/deletion'


export function findAddressById(param,callback) {
  return post(findByIdUrl,param,callback)
}

export function save(param,callback) {
  return post(saveUrl,param,callback)
}

export function get(param,callback) {
  return post(getUrl,param,callback)
}

export function deleteAddress(param,callback) {
  return post(deletionUrl,param,callback)
}
