import {post} from '@/utils/request/index'
const regeisterUrl = 'api/user/register'  //@param {phone inviteCode password}
const checkCaptchaUrl = 'api/user/checkCaptcha' // @param {phone,captcha}
const sendRegCaptchaUrl = 'api/user/sendRegisterationCaptcha' // @param {phone}
const checkInviteCodeUrl = 'api/user/isValidByInviteCode' // @param {inviteCode}
const sendBindCaptchaUrl = 'api/user/sendBindingCaptcha' // @param {phone}
const updatePhoneUrl = 'api/user/updatePhone' // @param {phone}
const getUrl = 'api/user/get' // @param {phone}
const loginWithPhoneAndPasswordUrl = 'api/user/loginWithPhoneAndPasswordH5' //@param {phone password}
const updateUrl = 'api/user/update'
const logoutUrl = 'api/user/logout'
const sendLoginCaptchaUrl = 'api/user/sendLoginCaptcha'
const loginWithPhoneAndCaptchaH5Url = 'api/user/loginWithPhoneAndCaptchaH5'
const sendUpdatePasswordCaptchaUrl = 'api/user/sendUpdatePasswordCaptcha'
const updatePasswordUrl = 'api/user/updatePassword'
const findPosterWithUserIdUrl = 'api/user/findPosterWithUserId'
const findWalletWithUserIdUrl = 'api/user/findWalletWithUserId'
const userFindByJoinedAllianceUrl = 'api/user/findByJoinedAlliance'


export function register(param,callback) {
  return post(regeisterUrl,param,callback)
}

export function findPoster(param,callback) {
  return post(findPosterWithUserIdUrl,param,callback)
}

export function checkCaptcha(param,callback) {
  return post(checkCaptchaUrl,param,callback)
}

export function sendRegCaptcha(param,callback) {
  return post(sendRegCaptchaUrl,param,callback)
}

export function checkInviteCode(param,callback) {
  return post(checkInviteCodeUrl,param,callback)
}

export function sendBindCaptcha(param,callback) {
  return post(sendBindCaptchaUrl,param,callback)
}

export function updatePhone(param,callback) {
  return post(updatePhoneUrl,param,callback)
}

export function get(param,callback) {
  return post(getUrl,param,callback)
}

export function loginWithPhoneAndPassword(param,callback) {
  return post(loginWithPhoneAndPasswordUrl,param,callback)
}

export function loginPassword(param,callback) {
  return post(loginWithPhoneAndPasswordUrl,param,callback)
}

export function update(param,callback) {
  return post(updateUrl,param,callback)

}

export function logout(param,callback) {
  return post(logoutUrl,param,callback)

}

export function sendLoginCaptcha(param,callback) {
  return post(sendLoginCaptchaUrl,param,callback)
}

export function loginWithPhoneAndCaptcha(param,callback) {
  return post(loginWithPhoneAndCaptchaH5Url,param,callback)
}

export function sendUpdatePasswordCaptcha(param,callback) {
  return post(sendUpdatePasswordCaptchaUrl,param,callback)
}

export function updatePassword(param,callback) {
  return post(updatePasswordUrl,param,callback)
}

export function findWalletWithUserId(param,callback) {
  return post(findWalletWithUserIdUrl,param,callback)
}

export function userFindByJoinedAlliance(param,callback) {
  return post(userFindByJoinedAllianceUrl,param,callback)
}
