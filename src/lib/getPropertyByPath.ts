// Inspired by: https://stackoverflow.com/a/22129960/9324
/**
 * Examples:
 * {
 *   prop1: {
 *     prop2: {
 *       prop3: 'deep',
 *       prop4: [
 *         { prop5: 'deeper' }
 *       ]
 *     }
 *   }
 * }
 * 'prop1.prop2.prop3' == 'deep'
 * 'prop1.prop2.prop4.0.prop5' == 'deeper'
 */

// alias for lodash.get
export function get(obj: any, propPath: string, defaultValue?: any) {
  return getPropertyByPath(obj, propPath, defaultValue);
}

export function getPropertyByPath(obj: any, propPath: string, defaultValue?: any) {
  return propPath.split('.').reduce((o, p) => (o && o[p]) || defaultValue, obj);
}
