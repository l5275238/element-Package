export function getStorage(key,type="sessionStorage") {
  let data=window[type].getItem(key);
  
  return data?JSON.parse(data):data
}
export function setStorage(key,data,type="sessionStorage") {


  window[type].setItem(key,data);
}
export function removeStorage(key,type="sessionStorage") {
  window[type].removeItem(key);
  
}
export function clearStorage(type="sessionStorage") {
  window[type].clear();
}
