import NavigationChannel from './navigationchannel'
import NetworkChannel from './network'
class Channel {
    invoke(args:ObjAnyType) {
        let call = new ChannelCall(args)
        var methodChannel:MethodChannel
        if (call.name === "NavigationChannel") {
            methodChannel = new NavigationChannel(call.id)
        }else if (call.name == "FetchChannel") {
            methodChannel = new NetworkChannel(call.id)
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

// {"method":"setTitle","params":{"title":"Support"},"name":"NavigationChannel","id":"377adba6-a082-4fef-999e-7d3a8eb2c46b","channelType":"jsCallNative"}


interface MethodChannel {
    id:string
    call(method:string,params:ObjAnyType):Promise<ObjAnyType>
}
export {
    MethodChannel,
    ObjAnyType,
    ObjStringType,
    Channel
}
    