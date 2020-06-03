import * as React from "react";
import { Dispatch } from 'redux';
import {P2} from '@weconnect/appkit';
import {
  connect
} from "react-redux";
import './style.css';
import { navigatorPop } from "../../actions";
import Icons from '../icons/icons';
import Icon from "@ant-design/icons";

interface Props {
  pageCount: number,
  dispatch: Dispatch
}

export default class NavigationBar extends React.Component<Props, any>{
  render() {
    var backButton = this.props.pageCount > 1 ?
      <img src={Icons.navigationBack} onClick={this.onBackButtonClicked.bind(this)} />
      :
      <div></div>;

    var searchbar = <div><img src={Icons.search} /></div>;
    var notificationbar = <img src={Icons.notification} />;
    var userinfobar = this.renderActiveUserAvatar()

    return (
      <div className='navigation-title-bar'>
        <div className='navigation-bar '>
          <div className='navigation-bar-left-part'>
            {backButton}
          </div>
          <div className='navigation-bar-right-part'>
            {searchbar}
            <div style={{ width: '28px' }} />
            {notificationbar}
            <div style={{ width: '28px' }} />
            {userinfobar}
          </div>
        </div>
        <div className='title-bar'>#公司列表</div>
      </div>
    );
  }

  renderActiveUserAvatar() {
    return (
      <div className='navigation-bar-avatar '>
        <img src={Icons.tarsLogo} style={{ backgroundColor: '#001a99' }} />
        <P2.Regular>Alex Edwards**</P2.Regular>
      </div>
    )
  }

  onBackButtonClicked() {
    const dispatch = this.props.dispatch;
    dispatch(navigatorPop());
  }
}
