import * as React from "react";
import { getIcon } from './modules/icons/icons';
import './style.css'

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Page } from "../../store/store";
import { navigatorReset } from "../../actions";

const modules: Array<any> = require('./modules/module-list.json')

interface Props {
  dispatch: Dispatch,
  miniappStarted: boolean
}

interface State {
  selected: number
}

class Sidebar extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      selected: 0
    }
  }

  componentDidMount() {
    if (!this.props.miniappStarted) {
      console.log("no miniapp is opened, so start the first one of the embeded miniapps")
      this.switchToMiniapp(0);
    }
  }

  render() {
    var appitems: any[] = [];
    for (var i = 0; i < modules.length; i++) {
      var element = modules[i];
      let index = i;
      let backgroundColor = index == this.state.selected ? '#cccccc' : '#e5e5e5';

      appitems.push(
        <div className="sidebar-item" onClick={() => { this.onSidebarItemClicked(index) }} style={{ background: backgroundColor }} key={element.name} >
          <img src={getIcon(element.icon)} style={{ paddingRight: '8px' }} />
          {element.name}
        </div>)
    }

    return (
      <div className='sidebar'>
        {appitems}
      </div>
    );
  }

  onSidebarItemClicked = (position: number) => {
    console.log("navitate to module at position: " + position);
    this.switchToMiniapp(position);
  }

  switchToMiniapp(position: number) {
    var element = modules[position];

    let page: Page = {
      miniapp: element.miniapp,
      url: element.url,
      moduleClass: element['module-class'],
      params: null
    }

    const dispatch = this.props.dispatch;

    dispatch(navigatorReset(page))

    this.setState({ selected: position })
  }
}

function mapStateToProps(state: any) {
  return {
  }
}

export default connect(mapStateToProps)(Sidebar);