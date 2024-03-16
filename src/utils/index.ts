export const isEqual = (value, other) => {
  // 获取变量类型
  const type = Object.prototype.toString.call(value)

  // 如果类型不同，则返回 false
  if (type !== Object.prototype.toString.call(other)) return false

  // 如果是值类型而不是对象或数组，则直接比较
  if (['[object String]', '[object Number]', '[object Boolean]'].includes(type)) {
    return value === other
  }

  // 如果是日期，则比较它们的时间值
  if (type === '[object Date]') {
    return value.getTime() === other.getTime()
  }

  // 如果是正则，则转换为字符串比较
  if (type === '[object RegExp]') {
    return value.toString() === other.toString()
  }

  // 对于数组和对象，比较每个属性
  if (type === '[object Array]' || type === '[object Object]') {
    const keysVal = Object.keys(value)
    const keysOther = Object.keys(other)

    // 比较属性长度
    if (keysVal.length !== keysOther.length) {
      return false
    }

    // 递归地比较每个属性
    for (let i = 0; i < keysVal.length; i++) {
      const key = keysVal[i]
      if (!isEqual(value[key], other[key])) {
        return false
      }
    }

    return true
  }

  // 如果是函数，可以按需比较函数实现（通常不建议）
  if (type === '[object Function]') {
    return value.toString() === other.toString()
  }

  // 如果遇到不能处理的类型，返回 false
  return false
}
