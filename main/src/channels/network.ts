import { MethodChannel, ObjAnyType,ObjStringType } from './channel'
import { net, session } from 'electron'
const Store = require('electron-store');

const store = new Store();
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
                    var jsonString = chuck.toString('utf8').trim()
                    console.log(jsonString);
                    var json = JSON.parse(jsonString)
                    console.log(json);
                    if (json.code === 0) {
                        if (json.data.accessToken != undefined) {
                            store.set('accessToken', json.data.accessToken);
                        }
                    }
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
            let buf = Buffer.from(request.params)
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
        var accessToken = store.get('accessToken')
        if (accessToken != undefined) {
            this.header = {Authorization:`X-CAT ${accessToken}`}
        }
        console.log(accessToken);
        for (var key in params.header){
            this.header[key] = params.header[key]
        }
        this.protocol = 'https:'
        this.params = params.body || {}
    }
   
}