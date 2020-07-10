import {post} from '@/utils/request/index'
const findByStoreAndSaleStatusUrl = 'api/storeProduct/findByStoreAndSaleStatus'
const getUrl = 'api/storeProduct/get'

export function getStoreProduct(param,callback) {
  return post(getUrl,param,callback)
}

export function findByStoreAndSaleStatus(param,callback) {
  return post(findByStoreAndSaleStatusUrl,param,callback)
}
