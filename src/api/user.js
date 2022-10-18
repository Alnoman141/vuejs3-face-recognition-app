import request from '@/utils/request';

export function register(data){
    return request({
        url: '/user/register',
        method: 'post',
        data
    })
}

export function uploadImage(data) {
  return request({
    url: "/user/uploadBase64",
    method: "post",
    data: { upload: data },
  });
}