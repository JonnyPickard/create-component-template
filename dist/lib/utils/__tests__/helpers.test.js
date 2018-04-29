const { capitalize } = require('../helpers');

describe('capitalize', () => {
  it('capitalizes the fist letter of strings', () => {
    const testString01 = 'test1';
    const testString02 = 'test_/3';
    const testString03 = 'anotherTest34';

    expect(capitalize(testString01)).toEqual('Test1');
    expect(capitalize(testString02)).toEqual('Test_/3');
    expect(capitalize(testString03)).toEqual('AnotherTest34');
  });
});
