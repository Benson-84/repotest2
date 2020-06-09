import NavigationChannel from './navigationbar';
import NavigatorChannel from './navigator'
import NetworkManager from "./network/NetworkManager";

class Channel {
    invoke(args:ObjAnyType) {
        let call = new ChannelCall(args)
        let methodChannel:MethodChannel
        if (call.name === "NavigationChannel") {
            methodChannel = new NavigationChannel(call.id)
        } else if (call.name == "NavigatorChannel") {
            methodChannel = new NavigatorChannel(call.id)
        } else if (call.name == "FetchChannel") {
            // For the network request , we will let NetworkManager to manage all incomning network requests.
            return NetworkManager.request(call);
        } else {
            console.log("no channel");
            return;
        }
        return new Promise((resolve,reject) => {
            methodChannel.call(call.method,call.params)
            .then(res => {
                res['channelType'] = call.channelType
                let jsonStr = JSON.stringify(res)
                resolve(jsonStr)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

class ChannelCall {
    method:string
    params:ObjStringType
    name:string
    id:string
    channelType:string
    constructor(args:ObjAnyType) {
        this.method = args['method']
        this.params = args['params']
        this.name = args['name']
        this.id = args['id']
        this.channelType = args['channelType']
    }    
}

interface ObjAnyType {
    [key: string]: any
}

interface ObjStringType {
    [key: string]: string
}

interface MethodChannel {
    id:string
    call(method:string,params:ObjAnyType):Promise<ObjAnyType>
}
export {
    ChannelCall,
    MethodChannel,
    ObjAnyType,
    ObjStringType,
    Channel
}
    