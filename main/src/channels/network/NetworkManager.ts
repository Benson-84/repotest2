import { ChannelCall } from "../channel";
import NetworkChannel from '../network';

class NetworkTask {

  promise: Promise<any>
  call: ChannelCall
  resolver: any;
  rejector: any;

  constructor(call: ChannelCall) {
    this.call = call;
    this.promise = new Promise((resolve,reject) => {
      this.resolver = resolve;
      this.rejector = reject;
    })
  }

  requestNetwork() {
    let networkChannel = new NetworkChannel(this.call.id);
    return new Promise((resolve,reject) => {
      networkChannel.call(this.call.method, this.call.params)
      .then(res => {
          res['channelType'] = this.call.channelType
          let jsonStr = JSON.stringify(res)
          resolve(jsonStr)
      }).catch(err => {
          reject(err)
      })
   });
  }
}

class NetworkManagerImpl {

  private taskQueue: NetworkTask[];
  private isRequesting: boolean;

  constructor() {
    this.isRequesting = false;
    this.taskQueue = [];
  }

  request(call: ChannelCall)  {
    let task = new NetworkTask(call);
    this.taskQueue.push(task);
    this.tryRequestNext();
    return task.promise;
  }

  private tryRequestNext() {
    if(this.taskQueue.length == 0 ) {
      return;
    }

    if(this.isRequesting == false) {
      this.isRequesting = true;
      
      let task = this.taskQueue.shift();

      task.requestNetwork().then((response) => {
        task.resolver(response);
      }).catch((error) => {
        task.rejector(error);
      }).finally(() => {
        this.isRequesting = false;
        this.tryRequestNext();
      });
    } 
  }
}



const NetworkManager = new NetworkManagerImpl();

export default NetworkManager;
