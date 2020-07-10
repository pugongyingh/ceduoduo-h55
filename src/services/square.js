import {post} from '@/utils/request/index'
const findByStatusAndAuditStatusUrl = 'api/liveShow/findByStatusAndAuditStatus'
const findDetailByIdUrl = 'api/liveShow/findDetailById'
const findAllImageByLiveShowIdUrl = 'api/livePicture/findByLiveShowIdGroupByCreate'


export function findAllImageByLiveShowId(param,callback) {
  return post(findAllImageByLiveShowIdUrl,param,callback)
}

export function findLiveListBySearch(param,callback) {
  return post(findByStatusAndAuditStatusUrl,param,callback)
}

export function findLiveDetailById(param,callback) {
  return post(findDetailByIdUrl,param,callback)
}
