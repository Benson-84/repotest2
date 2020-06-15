
export default class MiniAppView extends React.Component<any, any> {
    static propTypes: {
        page: Page
    };
    constructor(props: Readonly<any>);
    constructor(props: any, context?: any);
    render(): JSX.Element;
    getWebView(): WebviewTag;
}

import { WebviewTag } from 'electron';
import * as React from "react";
import { Page } from "../../store/store";

