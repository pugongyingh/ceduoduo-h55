import {post} from "../utils/request";

const findByMembersUrl = 'api/alliance/findByMembers'
const findByAllianceUrl = 'api/alliance/findByAlliance'
const findDetailByIdUrl = 'api/alliance/findDetailById'
const isOwnerByIdWithUserIdUrl = 'api/alliance/isOwnerByIdWithUserId'
const addUserListUrl = 'api/alliance/addUserList'
const saveUrl = 'api/alliance/save'

// 根据用户搜索查询登录用户加入的联盟
export function findByMembers(param,callback) {
  return post(findByMembersUrl,param,callback)
}

// 搜索/查询商家联盟列表
export function findByAlliance(param,callback) {
  return post(findByAllianceUrl,param,callback)
}

// 搜索/查询商家联盟详情
export function allianceFindDetailById(param,callback) {
  return post(findDetailByIdUrl,param,callback)
}


export function isOwnerByIdWithUserId(param,callback) {
  return post(isOwnerByIdWithUserIdUrl,param,callback)
}

export function addUserList(param,callback) {
  return post(addUserListUrl,param,callback)
}

export function save(param,callback) {
  return post(saveUrl,param,callback)
}


