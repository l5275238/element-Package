import Cookies from 'js-cookie'

const TokenKey = 'cookie_uuid'

export function getToken(type=TokenKey) {
 var obj;
 try {
   obj= JSON.parse(Cookies.get(type))
 }
 catch (e) {
   obj=Cookies.get(type)
 }

  return obj
}

export function setToken(token,type=TokenKey) {
  return Cookies.set(type, token)
}

export function removeToken(type=TokenKey) {
  return Cookies.remove(type)
}
