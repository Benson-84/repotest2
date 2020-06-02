import * as React from "react";
import classNames from 'classnames';

import { Menu } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import "antd/dist/antd.css";

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Miniapp, Page } from "../../store/store";
import MiniappGroup from './miniapp-group';
import { navigatorReset } from "../../actions";

import { P2 } from '@weconnect/appkit';

import Icons from '../icons/icons';

// style.css does work here with antd menu, the file style.css can also be deleted
// import './style.css';

interface Props {
  dispatch: Dispatch,
  miniappStarted: boolean
  miniapps: (Miniapp | MiniappGroup)[],
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
      // Miniapp | MiniappGroup
      this.props.miniapps.forEach((element: any) => {
        if (element.miniapps) {
          submenus.push(this.renderMiniappGroup(element))
        } else {
          submenus.push(this.renderMiniappItem(element))
        }
      })
    }

    return (
      <Menu
        style={{ width: '100%', background: '#001a99', overflow: 'scroll' }}
        theme='dark'
        onClick={this.onMenuItemClicked.bind(this)}
        mode="inline"
      >
        {submenus}
      </Menu>
    );
  }

  renderMiniappGroup(group: MiniappGroup) {
    let mitems: any[] = [];
    if (!group.miniapps || group.miniapps.length < 1) {
      return <div></div>;
    }
    group.miniapps.forEach((miniapp: Miniapp) => {
      let selected = this.state.menuSelected == miniapp.label;
      mitems.push(
        this.renderMiniappItem(miniapp)
      )
    })


    return (
      <Menu.SubMenu key={group.name}
        style={{ width: '100%', background: '#001a99', color: 'white', font: 'var(--font-p2-semibold)' }}
        title={
          <span>
            {group.icon && group.icon.length > 0 ?
              <img src={(Icons as any)[group.icon]} style={{ width: '16px', height: '16px', marginRight: '8px', objectFit: 'contain' }} />
              :
              <div></div>
            }
            <span>{group.label}</span>
          </span>
        }
      >
        {mitems}
      </Menu.SubMenu>
    );
  }

  renderMiniappItem(mp: Miniapp) {
    let selected = this.state.menuSelected == mp.name;
    return (
      <Menu.Item style={{
        width: '100%',
        background: selected ? '#2b44b7' : '#001a99',
        color: 'white',
        marginBottom: 0,
        marginTop: 0
      }}
        key={mp.name}>
        <span>
          {mp.icon && mp.icon.length > 0 ?
            <img src={(Icons as any)[mp.icon]} style={{ width: '16px', height: '16px', marginRight: '8px', objectFit: 'contain' }} />
            :
            <div></div>
          }
          <span style={{ font: 'var(--font-p2-semibold)' }}>{mp.label}</span>
        </span>
      </Menu.Item>
    );
  }

  onMenuItemClicked(param: any) {
    this.setState({ menuSelected: param.key });

    var target: any = null;
    for (var i = param.keyPath.length - 1; i >= 0; i--) {
      if (target == null) {
        target = this.props.miniapps;
      } else {
        target = (target as MiniappGroup).miniapps;
      }

      let key = param.keyPath[i];
      target = target.find((element: any) => {
        return element.name == key;
      });
    }

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