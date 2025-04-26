<template>
  <div class="rich-text-view">
    <RichTextEditor
      :initial-content="initialContent"
      :save-url="saveUrl"
      @save="handleSave"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RichTextEditor from '../components/RichTextEditor.vue'

// 初始内容
const initialContent = ref(`
<h1>欢迎使用富文本编辑器</h1>
<p>这是一个示例文档，你可以在这里编辑内容。</p>
<h2>功能特点</h2>
<ul>
  <li>实时预览</li>
  <li>丰富的编辑功能</li>
  <li>自动保存</li>
</ul>
<h2>使用说明</h2>
<p>在右侧编辑器中输入内容，左侧会实时显示预览效果。</p>
<blockquote>
  提示：你可以使用工具栏上的各种功能来格式化文本。
</blockquote>
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
.rich-text-view {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
</style> 