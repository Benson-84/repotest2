import * as React from "react";
import { connect } from "react-redux";
import { PrimaryButton, MailInput, Icons, Typography } from "@weconnect/tars-widgets" ;
const remote = require('electron').remote;
const ipc = require('electron').ipcRenderer;

import { userLogin } from "../../actions/user";
import { fetch } from "@weconnect/appkit";
import { API } from "@weconnect/tars-foundation";

import "./login.less";
import background_image from './login-background.png';
import UnknownErrorPng from "./error-unknown.png";


type LoginPageState = {
  email: string
  displayErrorForEmailAddress: boolean,
  displayLoginError: boolean,
  displayLoginErrorMessage: string
}

class LoginPage extends React.Component< any, LoginPageState> {
  constructor(props:any) {
    super(props)
    
    this.state = {
      email: "",
      displayErrorForEmailAddress: false,
      displayLoginError: false,
      displayLoginErrorMessage: ""
    }
  }

  render() {

    if(this.state.displayLoginError) {
      return this.loginErrorView()
    }

    const errorEmailMessage = this.state.displayErrorForEmailAddress ? (<Typography.Text type="danger">*请输入正确的公司邮箱地址</Typography.Text>):  (<div />);
    return (
      <div className="login-page" style={{backgroundImage: `url(${background_image})`}}>
        <div className="login-form">
          <div className="login-form-logo">
            {Icons.TARS()}
            <Typography.Text type="secondary">All Your Work in One Place</Typography.Text>
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
          <div className="login-form-powered-by">
            <Typography.Text type="secondary">Powered by WeWork China Tech</Typography.Text>
          </div>
        </div>
      </div>
    )
  }

  loginErrorView() {
    return (
      <div className="login-form-error">
        <img src={UnknownErrorPng} />
        <div className="login-form-error-text-area">
          <Typography.Title level={4} type="secondary" >{this.state.displayLoginErrorMessage}</Typography.Title>
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
      this.createLoginWindow(url)
    });

  }

  isEmail(search:string) {
    var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    return regexp.test(search);
  }

  createLoginWindow = (url:string) => {
    const dispatch = this.props.dispatch;

    const BrowserWindow = remote.BrowserWindow;
    const email = this.state.email;
    const displayLoginErrorMessage = this.displayLoginErrorMessage;

    const win = new BrowserWindow({
      height: 800,
      width: 600,
      title: "The We Company - Google/OKTA",
      webPreferences: {
        nodeIntegration: false,
        allowRunningInsecureContent: true,
        webviewTag: true,
        defaultEncoding: "utf-8",
        devTools: true,
        nodeIntegrationInSubFrames: false
      },
      useragent: "Mozilla/5.0 (Desktop; Chrome; WeWork;)"
    });
    win.loadURL(url)
    win.webContents.on('will-redirect',  async function(e:any,redirectUrl:string) {
      
      if(redirectUrl.indexOf("https://wework.localhost/login-success") != -1) {
        let url = new URL(redirectUrl);
        let params = new URLSearchParams(url.search);
        let accessToken = params.get("accessToken");
        let refreshToken = params.get("refreshToken");
        ipc.send("user-session-login", { "accessToken": accessToken, "refreshToken": refreshToken });
        win.close();
        
        try {
          let user = await API.Users.getMyProfile();
          dispatch(userLogin(user));
        } catch (e) {
          displayLoginErrorMessage(JSON.stringify(e));
        }
        
        
      } else if(redirectUrl.indexOf("https://wework.localhost/login-error") != -1) {
        let url = new URL(redirectUrl);
        let params = new URLSearchParams(url.search);
        let message = params.get("message");
        
        win.close();

        displayLoginErrorMessage(message);
      }
    });
  }

  displayLoginErrorMessage = (message: string) => {
    this.setState({
      displayLoginError: true,
      displayLoginErrorMessage: message
    });
  }
}

function mapStateToProps(state: any) {
  return {
    navigatorState: state.navigatorReducer
  }
}

export default connect(mapStateToProps)(LoginPage);