import * as React from "react";
import { PrimaryButton, MailInput, Icons } from "@weconnect/tars-widgets" ;
import "./login.less";


export default class LoginPage extends React.Component {
  render() {
    return (
      <div className="login-page">
        <div className="login-form">
          <div className="login-form-logo">
            {Icons.TARS()}
          </div>
          <div  className="login-form-email-input">
            <MailInput/>
          </div>
          <div className="login-form-ok">
            <PrimaryButton title={"OK"} />
          </div>
        </div>
      </div>
    )
  }
}