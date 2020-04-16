import * as React from "react";
import { getIcon } from './modules/icons/icons';
import './style.css'

const modules: Array<any> = require('./modules/module-list.json')

interface Props {

}

interface State {
  selected: number
}

export default class Sidebar extends React.Component<Props, State> {
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

    this.setState({ selected: position })

    let container = document.getElementById("content-container");
    while (container.hasChildNodes()) {
      container.removeChild(container.firstChild);
    }

    let miniapp = document.createElement('webview');
    let url: string = '../miniapps/' + (element.url as string).replace("module:/", "") + '/index.html';
    // let url = "https://spacestation-staging.wework.cn/authority"
    
    miniapp.setAttribute("preload", "../../preload/preload.js");
    miniapp.setAttribute("style", "width:100%;height:100%");
    miniapp.setAttribute("webpreferences", "'web-security'=false")
    miniapp.setAttribute('src', url);
    miniapp.setAttribute('nodeintegration', 'true');
    container.appendChild(miniapp);
  }
}