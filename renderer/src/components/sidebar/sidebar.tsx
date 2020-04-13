import * as React from "react";
import { getIcon } from './modules/icons/icons';
import './style.css'

const modules: Array<any> = require('./modules/module-list.json')

interface State {
  selected: number
}

export default class Sidebar extends React.Component<any, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      selected: 0
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
    var element = modules[position];
    console.log("clicked position: " + position);
    console.log("clicked: " + element.name);

    this.setState({ selected: position })
  }
}