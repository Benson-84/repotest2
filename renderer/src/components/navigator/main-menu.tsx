import * as React from "react";
import { Menu, Typography } from '@weconnect/tars-widgets';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Miniapp, Page } from "../../store/store";
import MiniappGroup from './miniapp-group';
import { navigatorReset } from "../../actions";
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
        this.renderMiniappItem(miniapp, true)
      )
    })


    return (
      <Menu.SubMenu key={group.name}
        style={{ width: '100%', background: '#001a99', color: 'white', paddingRight: '5px' }}
        title={
          <span>
            {group.icon && group.icon.length > 0 ?
              <img src={(Icons as any)[group.icon]} style={{ width: '16px', height: '16px', marginRight: '8px', objectFit: 'contain' }} />
              :
              <div></div>
            }
            <span><Typography.Text strong={true} style={{ color: 'white' }}>{group.label}</Typography.Text></span>
          </span>
        }
      >
        {mitems}
      </Menu.SubMenu>
    );
  }

  renderMiniappItem(mp: Miniapp, expanded: boolean = false) {
    let selected = this.state.menuSelected == mp.name;
    var bgcolor = '#001a99';
    if (selected) {
      bgcolor = '#2d44b7';
    } else if (expanded) {
      bgcolor = '#001166';
    }

    return (
      <Menu.Item style={{
        width: '100%',
        background: bgcolor,
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
          <span ><Typography.Text strong={true} style={{ color: 'white' }}>{mp.label}</Typography.Text></span>
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