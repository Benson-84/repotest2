import { MethodChannel, ObjAnyType,ObjStringType } from './channel'

export default class NavigationChannel implements MethodChannel {
    id: string
    constructor(id:string) {
        this.id = id
    }
    call(method: string, params: ObjAnyType): Promise<ObjAnyType> {
        console.log(method);
        console.log(params);
        return new Promise((resolve,reject)=> {
            resolve({
                id:this.id,
            })
        })
    }
   
}