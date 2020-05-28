import * as React from "react";
import { Dispatch } from 'redux';
import {
  connect
} from "react-redux";
import '../../style.css';
import { navigatorPop } from "../../actions";
import Icons from '../icons/icons';
import Icon from "@ant-design/icons";

interface Props {
  pageCount: number,
  dispatch: Dispatch
}

export default class NavigationBar extends React.Component<Props, any>{
  render() {
    var backButton =
      this.props.pageCount > 1 ?
        <img src={Icons.navigationBack} onClick={this.onBackButtonClicked.bind(this)} />
        :
        <div></div>;

    var searchbar = <div><img src={Icons.search} /></div>;
    var notificationbar = <img src={Icons.notification} />;
    var userinfobar = <div>user info</div>

    return (
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
    );
  }

  onBackButtonClicked() {
    const dispatch = this.props.dispatch;
    dispatch(navigatorPop());
  }

}
