import * as React from "react";
import { Dispatch } from 'redux';
import {P2} from '@weconnect/appkit';
import {
  connect
} from "react-redux";
import './style.css';
import { navigatorPop } from "../../actions";
import { userLogout } from "../../actions/user";

import NavIcons from '../icons/icons';
import { Menu, Dropdown, Typography, Modal, Icons } from "@weconnect/tars-widgets";

interface Props {
  pageCount: number,
  dispatch: Dispatch
}

interface State {
  displayLogoutModal: boolean
}

export default class NavigationBar extends React.Component<Props, State>{

  constructor(props: Props) {
    super(props)

    this.state = {
      displayLogoutModal: false
    }
  }

  render() {
    var backButton = this.props.pageCount > 1 ?
      <img src={NavIcons.navigationBack} onClick={this.onBackButtonClicked.bind(this)} />
      :
      <div></div>;

    var searchbar = <div><img src={NavIcons.search} /></div>;
    var notificationbar = <img src={NavIcons.notification} />;
    var userinfobar = this.renderActiveUserAvatar()

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
          {this.renderLogoutConfirmDialog()}
        </div>
    );
  }

  renderLogoutConfirmDialog() {
    return (
      <Modal
          title="确定要注销登陆吗？"
          visible={this.state.displayLogoutModal}
          onOk={this.onHandleConfirmLogout}
          onCancel={this.onHandleCancelLogout}
        >
          <p>注销后需要重新登陆哦</p>
      </Modal>)
 
  }

  renderActiveUserAvatar() {
    return (
      <Dropdown overlay={this.popupMenu()} placement="bottomRight">
      <div className='navigation-bar-avatar '>
        <img src={NavIcons.tarsLogo} style={{ backgroundColor: '#001a99' }} />
        <P2.Regular>Alex Edwards**</P2.Regular>
      </div>
      </Dropdown>
    )
  }

  popupMenu() {
    return (
      <Menu>
        <Menu.Item onClick={()=>{this.popupLogoutConfirmDialog()}}>
          <Typography.Text>注销用户</Typography.Text>
        </Menu.Item>
      </Menu>
    );
  }

  popupLogoutConfirmDialog() {
    const modal = Modal.confirm({
      icon: <Icons.ExclamationCircleOutlined />,
      title: '确定要注销登陆吗？',
      content: `注销后需要重新登陆哦`,
      cancelText: "取 消",
      okText: "确 定",
      onOk: this.onHandleConfirmLogout,
      onCancel: this.onHandleCancelLogout
    });
  }

  onBackButtonClicked() {
    const dispatch = this.props.dispatch;
    dispatch(navigatorPop());
  }

  onHandleConfirmLogout = () => {
    const dispatch = this.props.dispatch;
    dispatch(userLogout());
  }

  onHandleCancelLogout = () => {
  }
  
}
