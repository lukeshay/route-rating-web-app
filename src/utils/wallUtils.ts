import { WallTypes } from '../types';

export function typeAsString(type: WallTypes): string {
  if (type === WallTypes.LEAD) {
    return 'Lead';
  } else if (type === WallTypes.TOP_ROPE) {
    return 'Top rope';
  } else if (type === WallTypes.BOULDER) {
    return 'Boulder';
  } else if (type === WallTypes.AUTO_BELAY) {
    return 'Auto belay';
  } else {
    return '';
  }
}

export function typesAsString(types: WallTypes[]): string {
  let typeStr = '';

  types.forEach((value) => {
    if (typeStr.length !== 0) {
      typeStr += ', ';
    }

    typeStr += typeAsString(value);
  });

  return typeStr;
}
