// 比赛
import {post} from '@/utils/request/index'
let model = 'contestAlbum'
const findByContestIdAndStoreIdUrl = `api/${model}/findByContestIdAndStoreId`
const saveByContestIdAndStoreIdAndAlbumIdWithUserIdUrl = `api/${model}/saveByContestIdAndStoreIdAndAlbumIdWithUserId`
const findByContestIdAndRewardDegreeIsNotNullUrl = `api/${model}/findByContestIdAndRewardDegreeIsNotNull`

export function findByContestIdAndStoreId(param,callback) {
  return post(findByContestIdAndStoreIdUrl, param, callback)
}

export function saveByContestIdAndStoreIdAndAlbumIdWithUserId(param,callback) {
  return post(saveByContestIdAndStoreIdAndAlbumIdWithUserIdUrl, param, callback)
}

// 根据比赛id获取获奖名单
export function findByContestIdAndRewardDegreeIsNotNull(param,callback) {
  return post(findByContestIdAndRewardDegreeIsNotNullUrl, param, callback)
}

