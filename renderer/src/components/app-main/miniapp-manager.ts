import {
  Miniapp,
} from "../../store/store";
import { MiniappMenuGroup, MiniappMenuItem } from '../navigator/menu-model';

const installedMiniApps: Miniapp[] = require('../../../module.json')

export function getMainMenuItemList(privilegeList: any[]): (MiniappMenuItem | MiniappMenuGroup)[] {
  let mpgroups: (MiniappMenuItem | MiniappMenuGroup)[] = [];
  const mplist: any[] = require('../../../main-menu.json');
  mplist.forEach((m) => {
    if (m.type == 'menu-item') {
      let mp = findInstalledMiniappByUrl('module:/' + m.name)

      if (mp && privilegeList[m.privilegeId] == true) {
        let mpitem: MiniappMenuItem = {
          name: m.name,
          label: m.label,
          icon: m.icon,
          miniapp: mp
        }

        mpgroups.push(mpitem);
      }
    } else if (m.type == 'menu-group' && m.items) {
      let mps: MiniappMenuItem[] = (m.items as any[])
        .filter((item: any) => {
          return privilegeList[item.privilegeId] && findInstalledMiniappByUrl('module:/' + item.name);
        })
        .map<MiniappMenuItem>((item: any) => {
          let mp = findInstalledMiniappByUrl('module:/' + item.name)

          return {
            name: item.name,
            label: item.label,
            icon: item.icon,
            miniapp: mp
          }
        })

      if (mps && mps.length > 0) {
        let mpg: MiniappMenuGroup = {
          name: m.name,
          label: m.label,
          icon: m.icon,
          menuitems: mps
        }

        mpgroups.push(mpg)
      }
    } else {
      console.log("Error: unknown module type in modules.json: " + JSON.stringify(m));
    }
  })

  return mpgroups;
}

export function findInstalledMiniappByUrl(url: string): Miniapp {
  let mp = installedMiniApps.find((mp) => {
    return mp.url == url
  });

  return mp;
}

