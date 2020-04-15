import { MethodChannel, ObjAnyType,ObjStringType } from './channel'
import { net } from 'electron'


export default class NetWorkChannel implements MethodChannel {
    id: string
    constructor(id:string) {
        this.id = id
    }
    call(method: string, params: ObjAnyType): Promise<ObjAnyType> {
        console.log(method);
        console.log(params);
        return new Promise((resolve,reject)=> {
            let request = new ChannelRequest(params)
            console.log(request);
            
            var req =  net.request({
                method:request.method,
                host:request.host,
                path:request.path,
                protocol:request.protocol
            }) 
            for (var key in request.header){
                req.setHeader(key,request.header[key])
            }
            console.log(req);
            req.on('response', (response) => {
                var resp:ObjAnyType = {
                    // header:response.headers,
                    status:response.statusCode
                }
                response.on('data',(chuck:Buffer)=> {
                    var json = JSON.parse(chuck.toString())
                    console.log(`data: ${json}`);
                    resp['data'] = json
                    resolve({
                        id:this.id,
                        method:method,
                        response:{
                            code:0,
                            message:null,
                            data:resp
                        }
                    })
                })
                console.log(`STATUS: ${response.statusCode}`);
                response.on('error', (error:any) => {
                  console.log(`ERROR: ${JSON.stringify(error)}`)
                  resolve({
                    id:this.id,
                    method:method,
                    response:{
                        code:0,
                        message:JSON.stringify(error),
                        data:null
                    }
                })
                })
              })
            let buf = Buffer.from(JSON.stringify(request.params))
            req.end(buf)
        })
    }
    request() {

    }
}
interface netRequest {
    method:string
    host:string
    path:string
    header:ObjStringType
    protocol:string
    params:ObjStringType
}
class ChannelRequest implements netRequest {
    method: string;
    host: string;
    path: string;
    header: ObjStringType;
    protocol: string;
    params:ObjStringType;
    
    constructor(params:ObjAnyType) {
        this.method = params.method
        let url = params.url
        if (url.indexOf('api-staging.wework.cn/chinaos') != -1) {
            this.host = 'api-staging.wework.cn/chinaos'
            this.path = url
        } else {
            this.host = 'api-staging.wework.cn/chinaos'
            this.path = url.split('api-staging.wework.cn/chinaos').pop()
        }
        this.header = {}
        // this.header = {"Authorization" : "X-CAT eyJraWQiOiJFRjRGMjJDMC01Q0IwLTQzNDgtOTY3Qi0wMjY0OTVFN0VGQzgiLCJhbGciOiJFUzI1NiJ9.eyJpc3MiOiJ3d2NoaW5hIiwiYXVkIjoid3djaGluYS1pb3MiLCJzdWIiOiIxMjEyZGFkMC1lMDM2LTAxMzYtZTdkZC0wMjQyYWMxMTM1MGQiLCJpYXQiOjE1ODY4NDk3MDQsImV4cCI6MTU4Njg1NjkwNCwianRpIjoiYjYyNDNhMWYtMzhlOS00ODc3LWJiOWMtZWMzZTg0ZmM1ZWQ1IiwidWlkIjoyMDM0NTR9.6PAeDzitVsiJBKinX9ohpePuRkz3mk2n6nAMadKaLzOd5g3kq6riK8CnCHC0vc5Dp71OApnJowsrfI1XDFA_XA"}
        for (var key in params.header){
            this.header[key] = params.header[key]
        }
        this.protocol = 'https:'
        this.params = params.body || {}
    }
   
}


interface NetResponse {
    status:string
    data:any
    url:string
    header:any
}
