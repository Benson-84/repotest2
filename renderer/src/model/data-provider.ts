import {
    fetch,
    Headers,
    Request,
    isAndroid,
    isIOS,
    isDesktop
} from "@weconnect/appkit";

export default class DataProvider {
    fetchPrivilegeList() {
        return new Promise(async (resolve, reject) => {
            await new Promise(r => setTimeout(r, 2000));
            resolve(
                {
                    "member.company_list" : true,
                    "spacestation.global" : true,
                    "spacestation.china" : true
                }
            )
        });

        // var myHeaders = new Headers();
        // myHeaders.append('Content-Type', 'application/json');

        // var myInit = { method: 'GET', headers: myHeaders };
        // let request = new Request('userService/api/v1/users/me/privileges', myInit)
        // return fetch(request).then((response) => {
        //     return response.data.data;
        // });
    }
}
