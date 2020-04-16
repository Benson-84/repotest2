import * as React from "react";
import { getIcon } from './modules/icons/icons';
import './style.css'
  
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Page } from "../../store/store";
import { navigatorReset } from "../../actions";

const modules: Array<any> = require('./modules/module-list.json')

interface Props {
  dispatch: Dispatch
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
    let container = document.getElementById("content-container");
    if (!container.hasChildNodes()) {
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


    const dispatch = this.props.dispatch;

    let page: Page
    if(position == 0) {
      page = {
        miniapp: "../miniapps/miniapp-support/index.html",
        params: null
      }
    } else if (position == 1) {
      page = {
        miniapp: "https://spacestation-staging.wework.cn/authority",
        params: null
      }
    }

    dispatch(navigatorReset(page))

    this.setState({ selected: position })
  }
}



function mapStateToProps(state:any) {
  return {
  }
}

export default connect(mapStateToProps)(Sidebar);