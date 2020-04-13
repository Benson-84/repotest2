import supportIcon from './support.svg';
import spaceStationIcon from "./space-station.svg";

const Icons = {
  support: supportIcon,
  spaceStation: spaceStationIcon,
}

export function getIcon(name) {
  return Icons[name];
}

