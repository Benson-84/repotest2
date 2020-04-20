import * as React from "react";
import { Dispatch } from 'redux';
import {
  connect
} from "react-redux";
import '../../style.css';
import { navigatorPop } from "../../actions";
let backIcon = require('./back.svg');

interface Props {
  pageCount: number,
  dispatch: Dispatch
}

export default class NavigationBar extends React.Component<Props, any>{
  render() {
    var backButton = this.props.pageCount > 1 ?
      <img className='navigation-bar-icon' src={backIcon} onClick={this.onBackButtonClicked.bind(this)} />
            :
      <div></div>;

    return (<div className='navigation-bar '>
      {backButton}
    </div>);
  }

  onBackButtonClicked() {
    const dispatch = this.props.dispatch;
    dispatch(navigatorPop());
  }
}
