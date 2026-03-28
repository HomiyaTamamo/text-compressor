<template>
  <div class="container">
    <h1>📝 文本压缩工具</h1>
    <p class="subtitle">使用 LZ-String 算法压缩/解压文本，支持复制结果</p>
    <TextCompressor />
  </div>
</template>

<script setup>
import TextCompressor from './components/TextCompressor.vue'
</script>

<style scoped>
h1 {
  margin-bottom: 0.5rem;
  font-size: 2rem;
  font-weight: 600;
}
.subtitle {
  color: #6c757d;
  margin-bottom: 2rem;
}
</style>
