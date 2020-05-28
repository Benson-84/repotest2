import * as React from "react";
import classNames from 'classnames';

import { Menu } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { MiniappGroup, Miniapp, Page } from "../../store/store";
import { navigatorReset } from "../../actions";

import { P2 } from '@weconnect/appkit';

// style.css does work here with antd menu, the file style.css can also be deleted
// import './style.css';

interface Props {
  dispatch: Dispatch,
  miniappStarted: boolean
  miniapps: MiniappGroup[],
}

interface State {
  menuSelected: string
}

export class MainMenu extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      menuSelected: null
    }
  }

  render() {
    var submenus: any[] = [];
    if (this.props.miniapps) {
      this.props.miniapps.forEach((group: MiniappGroup) => {
        if (group.name && group.name.length > 0) {
          let mitems: any[] = [];
          if (group.miniapps) {
            group.miniapps.forEach((miniapp: Miniapp) => {
              let selected = this.state.menuSelected == miniapp.name;
              mitems.push(
                <Menu.Item style={{
                  width: '100%',
                  background: selected ? '#2b44b7' : '#001a99',
                  color: 'white',
                  marginBottom: 0,
                  marginTop: 0
                }}
                  key={miniapp.name}>
                  <span style={{font: 'var(--font-p2-semibold)'}}>{miniapp.label}</span>
                </Menu.Item>
              )
            })
          }

          submenus.push(
            <Menu.SubMenu key={group.name}
              style={{ width: '100%', background: '#001a99', color: 'white', font: 'var(--font-p2-semibold)' }}
              title={<span><img src={group.icon} /><span>{group.label}</span></span>}>
              {mitems}
            </Menu.SubMenu>
          );
        } else {
          let selected = this.state.menuSelected == group.miniapps[0].name;
          submenus.push(
            <Menu.Item style={{
              width: '100%',
              background: selected ? '#2b44b7' : '#001a99',
              color: 'white',
              marginBottom: 0,
              marginTop: 0
            }}
              key={group.miniapps[0].name}>
              <span><img src={group.icon} /><span style={{font: 'var(--font-p2-semibold)'}}>{group.miniapps[0].label}</span></span>
            </Menu.Item>
          );
        }
      })
    }

    return (
      <Menu
        style={{ width: '100%', background: '#001a99' }}
        theme='dark'
        onClick={this.onMenuItemClicked.bind(this)}
        mode="inline"
      >
        {submenus}
      </Menu>
    );
  }

  onMenuItemClicked(param: any) {
    this.setState({ menuSelected: param.key });

    var target = null;
    this.props.miniapps.forEach((group: MiniappGroup) => {
      group.miniapps.forEach((miniapp: Miniapp) => {
        if (miniapp.name == param.key) {
          target = miniapp;
        }
      })
    })

    if (target) {
      this.switchToMiniapp(target);
    }
  }

  switchToMiniapp(miniapp: Miniapp) {
    let page: Page = {
      miniapp: miniapp,
      params: null
    }

    const dispatch = this.props.dispatch;
    dispatch(navigatorReset(page))
  }
}

function mapStateToProps(state: any) {
  return {
  }
}

export default connect(mapStateToProps)(MainMenu);