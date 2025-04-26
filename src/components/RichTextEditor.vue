<template>
  <div class="editor-container">
    <div class="preview-section" ref="previewContainer">
      <div class="preview-content" v-html="previewContent"></div>
    </div>
    <div class="editor-section">
      <div class="editor-toolbar">
        <button @click="saveContent" class="save-btn">保存</button>
      </div>
      <div class="editor-wrapper">
        <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="mode"
        />
        <Editor
          style="height: calc(100% - 40px); overflow-y: auto;"
          v-model="editorContent"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
          @onChange="handleChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, shallowRef, onBeforeUnmount } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import axios from 'axios'

const props = defineProps({
  initialContent: {
    type: String,
    default: ''
  },
  saveUrl: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['save'])

const previewContainer = ref(null)
const editorContent = ref('')
const previewContent = ref('')
const editorRef = shallowRef()
const mode = ref('default')

// 编辑器配置
const toolbarConfig = {
  excludeKeys: [
    'uploadVideo',
    'insertTable',
    'codeBlock',
    'todo'
  ]
}

const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {}
}

// 编辑器创建完成时的回调
const handleCreated = (editor) => {
  editorRef.value = editor
}

// 编辑器内容变化时的回调
const handleChange = (editor) => {
  editorContent.value = editor.getHtml()
  previewContent.value = editor.getHtml()
}

// 保存内容
const saveContent = async () => {
  try {
    const response = await axios.post(props.saveUrl, {
      content: editorContent.value
    })
    emit('save', response.data)
  } catch (error) {
    console.error('保存失败:', error)
  }
}

// 监听初始内容变化
watch(() => props.initialContent, (newContent) => {
  editorContent.value = newContent
  previewContent.value = newContent
}, { immediate: true })

onMounted(() => {
  // 初始化编辑器内容
  editorContent.value = props.initialContent
  previewContent.value = props.initialContent
})

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
</script>

<style scoped>
.editor-container {
  display: flex;
  height: calc(100vh - 60px); /* 减去导航栏高度 */
  overflow: hidden;
}

.preview-section {
  flex: 1;
  height: 100%;
  overflow-y: auto;
  border-right: 1px solid #ccc;
  padding: 20px;
  background-color: #f8f9fa;
}

.preview-content {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.editor-section {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.editor-toolbar {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: flex-end;
}

.save-btn {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.save-btn:hover {
  background-color: #45a049;
}

.editor-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

:deep(.w-e-text-container) {
  flex: 1;
  overflow-y: auto;
}

:deep(.w-e-text) {
  padding: 20px;
  line-height: 1.6;
}

:deep(.w-e-text p) {
  margin-bottom: 1em;
}

/* 预览区域样式 */
.preview-content :deep(p) {
  margin-bottom: 1em;
  line-height: 1.6;
}

.preview-content :deep(h1),
.preview-content :deep(h2),
.preview-content :deep(h3),
.preview-content :deep(h4),
.preview-content :deep(h5),
.preview-content :deep(h6) {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

.preview-content :deep(ul),
.preview-content :deep(ol) {
  margin: 1em 0;
  padding-left: 2em;
}

.preview-content :deep(li) {
  margin: 0.5em 0;
}

.preview-content :deep(blockquote) {
  margin: 1em 0;
  padding: 0.5em 1em;
  border-left: 4px solid #ccc;
  background-color: #f8f9fa;
}

.preview-content :deep(code) {
  background-color: #f8f9fa;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: monospace;
}

.preview-content :deep(pre) {
  background-color: #f8f9fa;
  padding: 1em;
  border-radius: 4px;
  overflow-x: auto;
}

.preview-content :deep(img) {
  max-width: 100%;
  height: auto;
  margin: 1em 0;
}
</style> 