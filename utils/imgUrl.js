// 图片显示时加图片域名，分正式和测试
export function prefixUrl(img){
  var urlType = (location.href).substring(0,7);
  var urlHost = 'http://';
  if(urlType=='https:/'){
    urlHost = 'https://';
  }
  if(img){
    var imgurltype = img.substring(0,7);
    if(imgurltype=='group1/'){
      return urlHost +'192.168.2.4:8888/' + img
    }

    if(imgurltype == '/images'){
      return urlHost + 'www.8673h.com' + img
    }

    if(imgurltype=='http://'||imgurltype=='https:/'){
      return img
    }
    return urlHost + 'img.8673h.com/' + img
  }else{
    return urlHost + "www.8673h.com/images/pro_pic.png"
  }

}
