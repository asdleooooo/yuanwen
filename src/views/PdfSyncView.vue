<template>
  <div class="pdf-sync-view">
    <PdfRichTextSync
      :pdf-source="pdfSource"
      :xml-content="xmlContent"
      :save-url="saveUrl"
      @save="handleSave"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PdfRichTextSync from '../components/PdfRichTextSync.vue'

// 示例PDF源
const pdfSource = ref('/test.pdf')

// 示例XML内容
const xmlContent = ref(`
<?xml version="1.0" encoding="UTF-8"?>
<document>
  <p>第1段：这是测试内容，用于测试同步滚动功能。这是一段较长的文本，以确保有足够的内容来测试滚动效果。</p>
  <p>第2段：这是测试内容，用于测试同步滚动功能。这是一段较长的文本，以确保有足够的内容来测试滚动效果。</p>
  <p>第3段：这是测试内容，用于测试同步滚动功能。这是一段较长的文本，以确保有足够的内容来测试滚动效果。</p>
  <p>第4段：这是测试内容，用于测试同步滚动功能。这是一段较长的文本，以确保有足够的内容来测试滚动效果。</p>
  <p>第5段：这是测试内容，用于测试同步滚动功能。这是一段较长的文本，以确保有足够的内容来测试滚动效果。</p>
  <p>第6段：这是测试内容，用于测试同步滚动功能。这是一段较长的文本，以确保有足够的内容来测试滚动效果。</p>
  <p>第7段：这是测试内容，用于测试同步滚动功能。这是一段较长的文本，以确保有足够的内容来测试滚动效果。</p>
  <p>第8段：这是测试内容，用于测试同步滚动功能。这是一段较长的文本，以确保有足够的内容来测试滚动效果。</p>
  <p>第9段：这是测试内容，用于测试同步滚动功能。这是一段较长的文本，以确保有足够的内容来测试滚动效果。</p>
  <p>第10段：这是测试内容，用于测试同步滚动功能。这是一段较长的文本，以确保有足够的内容来测试滚动效果。</p>
</document>
`)

// 保存URL
const saveUrl = ref('/api/save-content')

// 处理保存事件
const handleSave = (response) => {
  console.log('保存成功:', response)
  // 这里可以添加保存成功后的处理逻辑
}
</script>

<style scoped>
.pdf-sync-view {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style> 