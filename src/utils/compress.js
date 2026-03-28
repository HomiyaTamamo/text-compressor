import LZString from 'lz-string'

/**
 * 压缩文本
 * @param {string} text 原始文本
 * @returns {string} 压缩后的字符串
 */
export function compress(text) {
  if (!text) return ''
  return LZString.compressToEncodedURIComponent(text)
}

/**
 * 解压文本
 * @param {string} compressed 压缩后的字符串
 * @returns {string} 解压后的原始文本
 */
export function decompress(compressed) {
  if (!compressed) return ''
  const decompressed = LZString.decompressFromEncodedURIComponent(compressed)
  if (decompressed === null) {
    throw new Error('无效的压缩数据')
  }
  return decompressed
}
