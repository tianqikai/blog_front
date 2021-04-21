/**
 * 表单 奇数偶数列显示不同信息
 * @param {*} rowIndex
 */
export function tableRowClassName(rowIndex) {
  if (rowIndex % 2 === 0) {
    return 'warning-row'
  } else if (rowIndex % 2 === 1) {
    return 'success-row'
  }
  return ''
}
