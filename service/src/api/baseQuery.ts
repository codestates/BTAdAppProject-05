import axios from 'axios';
import qs from 'qs';


export interface CustomRequest {
  pathParams?: {[key: string]: any};
  queryParams?: {[key: string]: any};
  data?: {[key: string]: any};
}

export interface BaseQueryParam {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete'
  request?: CustomRequest;
  errorMessage?: string;
}

export async function baseQuery({ path, method, request, errorMessage }: BaseQueryParam) {
  const { pathParams, queryParams, data: requestData } = request ?? {};

  const queryString = queryParams ? `?${qs.stringify(queryParams)}` : '';
  if (pathParams) {
    path = insertPathParams(path, pathParams);
  }
  try {
    const { data } = await axiosInstance[method](process.env.API_URL + path + queryString, requestData);
    return { data };
  } catch (error) {
    console.error(error);
    errorMessage && console.error(errorMessage);
    return { error };
  }
}

const axiosInstance = (() => {
  const instance = axios.create({
    baseURL: process.env.API_URL
  })
  return instance;
})();


const insertPathParams = (path: string, pathParams: {[key: string]: string}) => {
  Object.entries(pathParams).forEach(([key, value]) => {
    path = path.replace(`{${key}}`, value);
  })
  return path;
}
