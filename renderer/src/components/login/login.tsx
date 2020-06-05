import * as React from "react";
import { connect } from "react-redux";
import { PrimaryButton, MailInput, Icons, Typography } from "@weconnect/tars-widgets" ;
import "./login.less";

import { userLogin } from "../../actions/user";
import { fetch } from "@weconnect/appkit";

import ErrorSvg from "./error";


type LoginPageState = {
  email: string
  displayErrorForEmailAddress: boolean,
  displayLoginError: boolean
}

class LoginPage extends React.Component< any, LoginPageState> {
  constructor(props:any) {
    super(props)
    
    this.state = {
      email: "",
      displayErrorForEmailAddress: true,
      displayLoginError: true
    }
  }

  render() {

    if(this.state.displayLoginError) {
      return this.loginErrorView()
    }

    const errorEmailMessage = this.state.displayErrorForEmailAddress ? (<Typography.Text type="danger">*请输入正确的公司邮箱地址</Typography.Text>):  (<div />);
    return (
      <div className="login-page">
        <div className="login-form">
          <div className="login-form-logo">
            {Icons.TARS()}
          </div>
          <div  className="login-form-email-input">
            <MailInput placeholder={"请输入公司邮箱"} onChange={this.onChange} />
          </div>
          <div className="login-form-email-error">
            {errorEmailMessage}
          </div>
          <div className="login-form-ok" onClick={this.onLoginPressed}>
            <PrimaryButton title={"OK"} />
          </div>
        </div>
      </div>
    )
  }

  loginErrorView() {
    return (
      <div className="login-form-error">
        <Icons.Icon component= {ErrorSvg} />
        <div className="login-form-error-text-area">
          <Typography.Title level={4} type="secondary" >很抱歉，不知道哪里出错了</Typography.Title>
          <div className="login-form-error-refresh" onClick={this.onRefresh}>
            <PrimaryButton title={"刷新重试"} />
          </div>
        </div>
      </div>
    )
  }

  onChange = (e:any) => {
    this.setState({
      displayErrorForEmailAddress: false,
      email: e.target.value
    })
  }

  onRefresh = () => {
    this.setState({
      displayLoginError:false
    })
  }

  // on press the login button
  onLoginPressed = () => {

    if(this.isEmail(this.state.email) == false) {
      this.setState({
        displayErrorForEmailAddress: true
      })
      return 
    } 

    fetch('userService/api/v2/login/tars?email=' + this.state.email, {}).then((response:any)=>{
      let url = response.data.data;
      createLoginWindow(url)
    });

  }

  isEmail(search:string) {
    var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regexp.test(search);
  }
}


function createLoginWindow(url:string) {
  const remote = require('electron').remote;
  const BrowserWindow = remote.BrowserWindow;
  const win = new BrowserWindow({
    height: 800,
    width: 600,
    webPreferences: {
      nodeIntegration: false,
      allowRunningInsecureContent: true,
      webviewTag: true,
      defaultEncoding: "utf-8",
      devTools: true,
      nodeIntegrationInSubFrames: false
    },
    useragent: "Mozilla/5.0 (Desktop; )"
  });
  win.loadURL(url)
  win.webContents.on('will-redirect',  function(e:any,url:string) {
    console.log(url);
  });
}

function mapStateToProps(state: any) {
  return {
    navigatorState: state.navigatorReducer
  }
}

export default connect(mapStateToProps)(LoginPage);