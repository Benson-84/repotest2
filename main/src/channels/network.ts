import { MethodChannel, ObjAnyType,ObjStringType } from './channel'
import { net, session } from 'electron'
const Store = require('electron-store');

const store = new Store();

var hostname = "api-staging.wework.cn";
let stagingHostname = "api-staging.wework.cn";
let productionHostname = "api.wework.cn";

export function setWeWorkServer(envName:string) {
    if(envName == "staging") {
        hostname = stagingHostname
    } else if(envName == "production") {
        hostname = productionHostname;
    }
}

export default class NetWorkChannel implements MethodChannel {
    id: string
    constructor(id:string) {
        this.id = id
    }
    call(method: string, params: ObjAnyType): Promise<ObjAnyType> {
        return new Promise((resolve,reject)=> {
            let request = new ChannelRequest(params)
            
            console.log("=[net.request]==================================================================");
            console.log(request)
            var req =  net.request({
                method:request.method,
                host:request.host,
                path:request.path,
                protocol:request.protocol
            })
            for (var key in request.header){
                req.setHeader(key,request.header[key])
            }
            
            req.on('response', (response) => {
                if (response.statusCode == 401) {
                    console.log("=[net.request][token expired]==================================================================");
                    reject({
                        id:this.id,
                        method:method,
                        response:{
                            code:401,
                            message:null,
                            data:null
                        }
                    })
                    return;
                }
                var resp:ObjAnyType = {
                    // header:response.headers,
                    status:response.statusCode
                }
                var chucks:Uint8Array[] = [];
                var size = 0;
                response.on('data',(chuck:Buffer)=> {
                    chucks.push(chuck);
                    size+= chuck.length;
                })
                response.on('end',()=>{
                    var buf = Buffer.concat(chucks,size);
                    var jsonString = buf.toString('utf8').trim()
                    var json = JSON.parse(jsonString)
                    if (json.code === 0) {
                        if (json.data.accessToken != undefined) {
                            store.set('accessToken', json.data.accessToken);
                        }
                    }
                    resp['data'] = json
                    console.log("=[net.response]==================================================================");
                    console.log(json);
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
                response.on('error', (error:any) => {
                    console.log("=[net.request][response error]==================================================================");
                    console.log(error)
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
              if (JSON.stringify(request.params) !== '{}') {
                let buf = Buffer.from(request.params)
                req.end(buf)
              } else {
                req.end()
              }
            
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
        let apiUrlPrefix =  hostname + '/chinaos'
        if (url.indexOf(apiUrlPrefix) != -1) {
            this.host = apiUrlPrefix
            this.path = url
        } else {
            this.host = apiUrlPrefix
            this.path = url.split(apiUrlPrefix).pop()
        }
        this.header = {}
        var accessToken = store.get('accessToken')
        if (accessToken != undefined) {
            this.header = {Authorization:`X-CAT ${accessToken}`}
        }
        for (var key in params.header){
            this.header[key] = params.header[key]
        }
        this.protocol = 'https:'
        this.params = params.body || {}
    }
   
}