import {
    fetch,
    Headers,
    Request,
    isAndroid,
    isIOS,
    isDesktop
} from "@weconnect/appkit";

export default class DataProvider {
    fetchFeatureList() {
        return new Promise(async (resolve, reject) => {
            await new Promise(r => setTimeout(r, 2000));
            resolve(
                [
                    {
                        "id": "1",
                        "name": "Member Gallery",
                        "label": "Member Gallery",
                        "icon": "http://img2.imgtn.bdimg.com/it/u=2934236407,2961049037&fm=26&gp=0.jpg",
                        "miniapps": [
                            {
                                "id": "11",
                                "name": "Company List",
                                "label": "Company List"
                            }
                        ]
                    },
                    {
                        "id": "2",
                        "name": "",
                        "label": "",
                        "icon": "http://bpic.588ku.com/element_origin_min_pic/01/42/02/28573d62ffba199.jpg",
                        "miniapps": [
                            {
                                "id": "21",
                                "name": "Spacestation",
                                "label": "Spacestation"
                            }
                        ]
                    },
                    {
                        "id": "3",
                        "name": "",
                        "label": "",
                        "icon": "http://bpic.588ku.com/element_origin_min_pic/00/90/47/9256efcbf458c23.jpg",
                        "miniapps": [
                            {
                                "id": "31",
                                "name": "SS China",
                                "label": "SS China"
                            }]
                    }
                ]
            )
        });

        // var myHeaders = new Headers();
        // myHeaders.append('Content-Type', 'application/json');

        // var myInit = { method: 'GET', headers: myHeaders };
        // let request = new Request('spaceService/api/v1/fe/helpinfo/categories', myInit)
        // return fetch(request).then((response) => {
        //     return response.data.data;
        // });
    }
}
