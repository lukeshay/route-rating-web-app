import * as WallUtils from '../wallUtils';
import * as TypeMocks from '../../__mocks__/typeMocks';
import { WallTypes } from '../../types';

describe('WallUtils', () => {
  it('should convert the wall type correctly.', async function() {
    expect(WallUtils.typeAsString(WallTypes.LEAD)).toEqual('Lead');
    expect(WallUtils.typeAsString(WallTypes.TOP_ROPE)).toEqual('Top rope');
    expect(WallUtils.typeAsString(WallTypes.AUTO_BELAY)).toEqual('Auto belay');
    expect(WallUtils.typeAsString(WallTypes.BOULDER)).toEqual('Boulder');
  });

  it('should convert the wall types correctly', async function() {
    expect(WallUtils.typesAsString(TypeMocks.testWallOne.types)).toEqual(
      'Lead, Top rope'
    );
    expect(WallUtils.typesAsString(TypeMocks.testRouteOne.types)).toEqual(
      'Top rope, Lead'
    );
  });
});
