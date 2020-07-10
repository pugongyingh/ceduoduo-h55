// 比赛
import {post} from '@/utils/request/index'
let model = 'contestAlbum'
const findByContestIdAndStoreIdUrl = `api/${model}/findByContestIdAndStoreId`
const saveByContestIdAndStoreIdAndAlbumIdWithUserIdUrl = `api/${model}/saveByContestIdAndStoreIdAndAlbumIdWithUserId`

export function findByContestIdAndStoreId(param,callback) {
  return post(findByContestIdAndStoreIdUrl, param, callback)
}

export function saveByContestIdAndStoreIdAndAlbumIdWithUserId(param,callback) {
  return post(saveByContestIdAndStoreIdAndAlbumIdWithUserIdUrl, param, callback)
}

