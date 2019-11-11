import axios from 'axios';

export const URLAPI = (URLEnv) => {
  return  axios.create({
     baseURL: URLEnv,
     timeout: 100000,
     headers: {
       'content-type': 'application/json',
     }
   })
}

export const URLAPIGET = async (api, route, functionName) => {
  const result = await api.get(route)
  .then((res) => {
    return res
  })
  .catch((error) => {
    console.error(`'The error in the call route ${route}  is:', ${error.message}`);
    console.log(error.response);
    return error.response;
  })
  return result;
}


export const URLAPIPOSTFILE = async (api, route, body) => {
  const result = await api.post(route,body, {responseType: 'blob',headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/pdf'
            }})
  .then((res) => {
    return res
  })
  .catch((error) => {
    console.error(`'The error in the call route ${route}  is:', ${error.message}`);
    console.log(error.response);
    return error.response;
  })
  return result;
}

export const URLAPIPOST = async(api, route, body) => {
  const result = await api.post(route,body)
  .then((res) => {
      return res
  })
  .catch((error) => {
    console.error(`'The error in the call route ${route}  is:', ${error.message}`);
    console.log(error.response);
    return error.response;
  })
  return result;
}
export const URLAPIUPDATE = async (api,route)=>{
  const result = await api.put(route)
  .then((res) => {
    console.log('res', res)
    return res
})
.catch((error) => {
  console.error(`'The error in the call route ${route}  is:', ${error.message}`);
  console.log(error.response);
  return error.response;
})
return result;
}

export const URLAPIDELETE = async (api,route)=>{
  const result = await api.delete(route)
  .then((res) => {
    console.log('res', res)
    return res
})
.catch((error) => {
  console.error(`'The error in the call route ${route}  is:', ${error.message}`);
  console.log(error.response);
  return error.response;
})
return result;
}
