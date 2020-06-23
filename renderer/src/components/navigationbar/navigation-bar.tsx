import * as React from "react";
import { Dispatch } from 'redux';
import './style.css';
import { navigatorPop } from "../../actions";
import { userLogout } from "../../actions/user";
import NavIcons from '../../../res/icons/icons';
import { Menu, Dropdown, Typography, Modal, Icons } from "@weconnect/tars-widgets";
import { PageLoadingStatus } from "../../store/store";
import { connect } from "react-redux";
import { User } from "@weconnect/tars-foundation";

interface Props {
  pageCount: number,
  loadingStatus: PageLoadingStatus,
  onBackButtonClicked: () => void,
  dispatch: Dispatch,
  user: User,
}

interface State {
  loadingAnimWidth: number,
  loadingAnimTickCount: number,
  displayLogoutModal: boolean
}

class NavigationBar extends React.Component<Props, State>{
  loadingAnimTimer: number = 0;

  constructor(props: Props) {
    super(props)
    this.state = {
      loadingAnimWidth: 0,
      loadingAnimTickCount: 0,
      displayLogoutModal: false
    }

    if (props.loadingStatus == PageLoadingStatus.started) {
      this.startLoadingAnim()
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.loadingStatus == PageLoadingStatus.started) {
      this.startLoadingAnim()
    } else if (nextProps.loadingStatus == PageLoadingStatus.idle || PageLoadingStatus.stopped) {
      this.stopLoadingAnim()
    }
  }

  startLoadingAnim = () => {
    if (this.loadingAnimTimer == 0) {
      this.loadingAnimTimer = window.setInterval(() => {
        let w = 100 * this.state.loadingAnimTickCount / (this.state.loadingAnimTickCount + 49)
        //console.log("animation width: " +w)
        this.setState({
          loadingAnimWidth: w,
          loadingAnimTickCount: this.state.loadingAnimTickCount + 1
        });
      }, 17);
    }
  }

  stopLoadingAnim = () => {
    if (this.loadingAnimTimer) {
      window.clearInterval(this.loadingAnimTimer)
    }
    this.loadingAnimTimer = 0;

    this.setState({
      loadingAnimWidth: 0,
      loadingAnimTickCount: 0
    });
  }

  render() {
    var backButton = this.props.pageCount > 1 ?
      <img src={NavIcons.navigationBack} onClick={this.props.onBackButtonClicked} />
      :
      <div></div>;

    // todo, global search and notificaiton button
    var searchbar = <div></div> //<div><img src={NavIcons.search} /></div>;
    var notificationbar = <div></div> //<img src={NavIcons.notification} />;
    var userinfobar = this.renderActiveUserAvatar()

    var loadinganim = <div className='navigation-bar-loading' style={{ width: this.state.loadingAnimWidth + '%' }} />

    return (
      <div>
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
        {loadinganim}
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
    const { user } = this.props;
    const avatar = user.avatar ?  user.avatar: NavIcons.tarsLogo ;
    
    return (
      <Dropdown overlay={this.popupMenu()} placement="bottomRight">
      <div className='navigation-bar-avatar '>
        <img src={avatar} style={{ backgroundColor: '#001a99' }} />
        <Typography.Text>{user.name}</Typography.Text>
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

  onHandleConfirmLogout = () => {
    const dispatch = this.props.dispatch;
    dispatch(userLogout());
  }

  onHandleCancelLogout = () => {
  }
  
}

function mapStateToProps(state: any) {
  return {
    user: state.userReducer.activeUser
  }
}

export default connect(mapStateToProps)(NavigationBar);
