import { Observable, throwError, from } from 'rxjs';
import {
  mergeMap, retryWhen, take, delay, catchError, map,
} from 'rxjs/operators';
import axios, { AxiosPromise } from 'axios';
import * as Globals from 'application/common/index';


async function handleRequest(req: any) {
  const ts = new Date().getTime();
  return req;
}


function errorHandler(err: any): Observable<any> {
  const message = Globals.errorEncountered;
  if (err && err.status === 0){
    Object.assign(err.data, { message });
  } 
  if (err.code === 'ECONNABORTED') {
    console.log(Globals.timeoutMessage);
  }
  return throwError(err);
}


axios.interceptors.request.use(
  async (req: any) => await handleRequest(req),
  (error) => Promise.reject(error),
);


function processApiRequest(apiCaller: AxiosPromise<any>): Observable<any> {
  return from(apiCaller).pipe(
    retryWhen((errors) => errors.pipe(
      mergeMap((err) => {
       return errorHandler(err)
      }),
      delay(1000),
      take(2),
    )),
    catchError((err) => errorHandler(err)),
    map((res) => ({ data: res.data, headers: res.headers, status: res.status })),
  );
}


const request = (option:any)=>processApiRequest(
  axios.request(option)
)


const post = (url: string, data: any, options?: any) => processApiRequest(
  axios.post(
    options && options.fullPath ? url : Globals.URLAPI + url,
    data,
    options && { headers: options },
  ));
const get = (url: string, options?: any) => {
  
  return processApiRequest(
    axios.get( Globals.URLAPI + url,options),
  );
}
const put = (url: string, data: any, options?: any) => processApiRequest(
  axios.put(
    options && options.fullPath ? url : Globals.URLAPI + url,
    data,
    options && { headers: options },
  ),
);

const patch = (url: string, data: any, options?: any) => processApiRequest(
  axios.patch(
    options && options.fullPath ? url : Globals.URLAPI + url,
    data,
    options && { headers: options },
  ),
);


const del = (url: string, options?: any, data?: any) => {
  data = data ? (data instanceof Object && !Object.keys(data).length ? null : data) : null;
  const config = data
    ? { headers: options, data, timeout: Globals.timeoutDuration }
    : { headers: options, data: '', timeout: Globals.timeoutDuration };
  return processApiRequest(
    axios.delete(options && options.fullPath ? url : Globals.URLAPI + url, config),
  );
}

interface HeaderProps{
  token:string;
}

 interface ResponseServer{
  status:number;
  error:string;
}

export  {
  post,
  get,
  put,
  del,
  patch,
  request,
  type ResponseServer,
  type HeaderProps
}