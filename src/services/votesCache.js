import {post} from '@/utils/request/index'
const model = 'votesCache'
const saveByContestAlbumIdWithUserIdUrl = `api/${model}/saveByContestAlbumIdWithUserId` // @param {}

// 投票
export function saveByContestAlbumIdWithUserId(param,callback) {
  return post(saveByContestAlbumIdWithUserIdUrl,param,callback)
}
