import { Miniapp } from '../../store/store';

export interface MiniappMenuGroup {
    name: string,
    label: string,
    icon: string,
    menuitems?: MiniappMenuItem[],
}

export interface MiniappMenuItem {
    name: string,
    label: string,
    icon: string,
    miniapp: Miniapp,
}