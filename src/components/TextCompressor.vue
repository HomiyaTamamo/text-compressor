<template>
  <div class="compressor">
    <div class="card">
      <h3>原始文本</h3>
      <textarea
        v-model="originalText"
        placeholder="请输入要压缩的文本..."
        rows="8"
      ></textarea>
      <div class="actions">
        <button @click="compress" :disabled="!originalText.trim()">
          压缩
        </button>
        <button @click="clearOriginal">清空</button>
      </div>
    </div>

    <div class="card">
      <h3>压缩结果</h3>
      <textarea
        v-model="compressedText"
        placeholder="压缩后的文本将显示在这里..."
        rows="4"
        readonly
      ></textarea>
      <div class="actions">
        <button @click="copyToClipboard(compressedText)" :disabled="!compressedText">
          复制
        </button>
        <button @click="decompress" :disabled="!compressedText">
          解压
        </button>
      </div>
    </div>

    <div class="card" v-if="decompressedText">
      <h3>解压结果</h3>
      <textarea
        v-model="decompressedText"
        placeholder="解压后的文本将显示在这里..."
        rows="8"
        readonly
      ></textarea>
      <div class="actions">
        <button @click="copyToClipboard(decompressedText)">
          复制
        </button>
        <button @click="clearDecompressed">清空</button>
      </div>
    </div>

    <div v-if="message" :class="['message', messageType]">
      {{ message }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { compress, decompress } from '../utils/compress'

const originalText = ref('')
const compressedText = ref('')
const decompressedText = ref('')
const message = ref('')
const messageType = ref('info')

let timeoutId = null

const showMessage = (text, type = 'info') => {
  if (timeoutId) clearTimeout(timeoutId)
  message.value = text
  messageType.value = type
  timeoutId = setTimeout(() => {
    message.value = ''
  }, 3000)
}

const compressHandler = () => {
  if (!originalText.value.trim()) {
    showMessage('请输入要压缩的文本', 'error')
    return
  }
  try {
    const compressed = compress(originalText.value)
    compressedText.value = compressed
    showMessage('压缩成功！', 'success')
  } catch (err) {
    showMessage('压缩失败：' + err.message, 'error')
  }
}

const decompressHandler = () => {
  if (!compressedText.value.trim()) {
    showMessage('没有可解压的内容', 'error')
    return
  }
  try {
    const decompressed = decompress(compressedText.value)
    decompressedText.value = decompressed
    showMessage('解压成功！', 'success')
  } catch (err) {
    showMessage('解压失败：' + err.message, 'error')
  }
}

const copyToClipboard = async (text) => {
  if (!text) return
  try {
    await navigator.clipboard.writeText(text)
    showMessage('已复制到剪贴板', 'success')
  } catch (err) {
    showMessage('复制失败', 'error')
  }
}

const clearOriginal = () => {
  originalText.value = ''
  compressedText.value = ''
  decompressedText.value = ''
  showMessage('已清空', 'info')
}

const clearDecompressed = () => {
  decompressedText.value = ''
}

// 为模板提供方法
const compress = compressHandler
const decompress = decompressHandler
</script>

<style scoped>
.compressor {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h3 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: #2c3e50;
}

textarea {
  width: 100%;
  padding: 0.75rem;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
  font-size: 0.9rem;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  resize: vertical;
  transition: border-color 0.2s;
}

textarea:focus {
  outline: none;
  border-color: #409eff;
}

.actions {
  margin-top: 1rem;
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

button {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: #f0f2f5;
  color: #1f2d3d;
  transition: background-color 0.2s;
}

button:hover:not(:disabled) {
  background-color: #e4e7ed;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.message {
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
  text-align: center;
  font-size: 0.9rem;
}

.message.success {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.message.error {
  background-color: #ffebee;
  color: #c62828;
}

.message.info {
  background-color: #e3f2fd;
  color: #1565c0;
}
</style>
