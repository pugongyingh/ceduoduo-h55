import {post} from '@/utils/request/index'
const searchUrl = 'api/album/findByUserId'
const findAlbumUserShopDTOByIdUrl = 'api/album/findAlbumUserShopDTOById'
const openUrl = 'api/album/openList'
const privateUrl = 'api/album/privateList'
const deletionListUrl = 'api/album/deletionList'
const findWithUserIdUrl = 'api/album/findWithUserId'
const findIconAndIdUrl = 'api/platformProduct/findIconAndId'
const findHomePageNewUrl = 'api/article/findHomePageNew'
const findMyAlbumUrl = 'api/album/search'

export function search(param,callback) {
  return post(searchUrl,param,callback)
}

export function findAlbumWithUserId(param,callback) {
  return post(findWithUserIdUrl,param,callback)
}

export function findAlbumUserShopDTOById(param,callback) {
  return post(findAlbumUserShopDTOByIdUrl,param,callback)
}

export function openList(param,callback) {
  return post(openUrl,param,callback)
}

export function privateList(param,callback) {
  return post(privateUrl,param,callback)
}

export function deletionList(param,callback) {
  return post(deletionListUrl,param,callback)
}

export function findMyAlbum(param,callback) {
  return post(findMyAlbumUrl,param,callback)
}



