import { Miniapp } from '../../store/store';

export default interface MiniappGroup {
    name: string,
    label: string,
    icon: string,
    miniapps?: Miniapp[],
}