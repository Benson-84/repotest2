import * as React from "react";
import { connect } from "react-redux";

import { PrimaryButton, MailInput, Icons } from "@weconnect/tars-widgets" ;
import "./login.less";
import { userLogin } from "../../actions/user";
import { fetch } from "@weconnect/appkit";
import MiniAppView from "../webview/miniappview";

type LoginPageState = {
  email: string,
  loginUrl: string
}

class LoginPage extends React.Component< any, LoginPageState> {
  constructor(props:any) {
    super(props)
    
    this.state = {
      email: "",
      loginUrl: ""
    }
  }

  render() {

    if(this.state.loginUrl != null && this.state.loginUrl.length > 0 ) {
      return <MiniAppView url={this.state.loginUrl} />
    } else 
    return (
      <div className="login-page">
        <div className="login-form">
          <div className="login-form-logo">
            {Icons.TARS()}
          </div>
          <div  className="login-form-email-input">
            <MailInput placeholder={"请输入公司邮箱"} onChange={this.onChange} />
          </div>
          <div className="login-form-ok" onClick={this.onLoginPressed}>
            <PrimaryButton title={"OK"} />
          </div>
        </div>
      </div>
    )
  }

  onChange = (e:any) => {
    this.setState({
      email: e.target.value
    })
  }

  // on press the login button
  onLoginPressed = () => {
    fetch('userService/api/v2/login/tars?email=' + this.state.email, {}).then((response:any)=>{
      let url = response.data.data;
      // window.location.href = url;
      this.setState({
        loginUrl: url
      })
    });
  }
}

function createLoginWindow(url:string) {
  const remote = require('electron').remote;
  const BrowserWindow = remote.BrowserWindow;
  const win = new BrowserWindow({
    height: 800,
    width: 600,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: true,
      webviewTag: true,
      defaultEncoding: "utf-8",
      devTools: true,
      nodeIntegrationInSubFrames: true
    },
    useragent: "Mozilla/5.0 (Desktop; )"
  });

  win.loadURL(url);
}


function mapStateToProps(state: any) {
  return {
    navigatorState: state.navigatorReducer
  }
}

export default connect(mapStateToProps)(LoginPage);