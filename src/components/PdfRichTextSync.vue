<template>
  <div class="sync-container">
    <div class="pdf-container" ref="pdfContainer">
      <iframe :src="pdfSource" class="pdf-iframe" @load="onPdfLoaded" ref="pdfIframe"></iframe>
    </div>
    <div class="rich-text-container" ref="richTextContainer">
      <div class="editor-toolbar">
        <button @click="saveContent" class="save-btn">保存</button>
      </div>
      <div class="editor-wrapper">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
          :mode="mode" />
        <Editor style="height: calc(100% - 40px); overflow-y: auto;" v-model="richTextContent"
          :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" @onChange="handleChange"
          @scroll="onEditorScroll" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, shallowRef, onBeforeUnmount, nextTick } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import axios from 'axios'


onMounted(() => {
  nextTick(() => {
    // 直接通过选择器获取滚动容器
    const scrollContainer = document.getElementById('w-e-textarea-1').parentElement;
    console.log(scrollContainer);
    console.log(111111);



    scrollContainer.addEventListener('scroll', (e) => {
      console.log(11111111);

      const scrollTop = e.target.scrollTop;
      const scrollLeft = e.target.scrollLeft;
      console.log('滚动位置：', scrollTop, scrollLeft);
    });
  })
})

const props = defineProps({
  pdfSource: {
    type: String,
    required: true
  },
  xmlContent: {
    type: String,
    required: true
  },
  saveUrl: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['save'])

const pdfContainer = ref(null)
const pdfIframe = ref(null)
const richTextContainer = ref(null)
const richTextContent = ref('')
const editorRef = shallowRef()
const mode = ref('default')
let isScrolling = false

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

// 将XML转换为HTML
const convertXmlToHtml = (xml) => {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(xml, 'text/xml')
  // 这里可以根据实际的XML结构进行转换
  // 示例转换逻辑
  const html = Array.from(xmlDoc.documentElement.children)
    .map(node => {
      if (node.tagName === 'p') {
        return `<p>${node.textContent}</p>`
      }
      return node.outerHTML
    })
    .join('')
  return html
}

// 处理PDF加载完成事件
const onPdfLoaded = () => {
  console.log('PDF loaded')
  // 添加PDF滚动事件监听
  const iframe = pdfIframe.value
  if (iframe) {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document
    iframeDoc.addEventListener('scroll', onPdfScroll)
  }
}

// 处理PDF滚动事件
const onPdfScroll = (event) => {
  if (isScrolling) return
  isScrolling = true

  const iframe = pdfIframe.value
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document
  const pdfScrollTop = iframeDoc.documentElement.scrollTop
  const pdfHeight = iframeDoc.documentElement.scrollHeight
  const editor = editorRef.value
  const editorHeight = editor.$el.scrollHeight

  const ratio = pdfScrollTop / pdfHeight
  const editorScrollTop = ratio * editorHeight

  editor.$el.scrollTop = editorScrollTop

  setTimeout(() => {
    isScrolling = false
  }, 100)
}

// 处理编辑器滚动事件
const onEditorScroll = (event) => {
  if (isScrolling) return
  isScrolling = true

  const editor = editorRef.value
  const editorScrollTop = editor.$el.scrollTop
  const editorHeight = editor.$el.scrollHeight
  const iframe = pdfIframe.value
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document
  const pdfHeight = iframeDoc.documentElement.scrollHeight

  const ratio = editorScrollTop / editorHeight
  const pdfScrollTop = ratio * pdfHeight

  iframeDoc.documentElement.scrollTop = pdfScrollTop

  setTimeout(() => {
    isScrolling = false
  }, 100)
}

// 编辑器创建完成时的回调
const handleCreated = (editor) => {
  editorRef.value = editor
}

// 编辑器内容变化时的回调
const handleChange = (editor) => {
  richTextContent.value = editor.getHtml()
}

// 保存内容
const saveContent = async () => {
  try {
    const response = await axios.post(props.saveUrl, {
      content: richTextContent.value
    })
    emit('save', response.data)
  } catch (error) {
    console.error('保存失败:', error)
  }
}

// 监听XML内容变化
watch(() => props.xmlContent, (newXml) => {
  richTextContent.value = convertXmlToHtml(newXml)
}, { immediate: true })

onMounted(() => {
  // 初始化富文本内容
  richTextContent.value = convertXmlToHtml(props.xmlContent)
})

onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()

  // 移除PDF滚动事件监听
  const iframe = pdfIframe.value
  if (iframe) {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document
    iframeDoc.removeEventListener('scroll', onPdfScroll)
  }
})
</script>

<style scoped>
.sync-container {
  display: flex;
  height: calc(100vh - 60px);
  /* 减去导航栏高度 */
  overflow: hidden;
}

.pdf-container {
  flex: 1;
  height: 100%;
  overflow: hidden;
  border-right: 1px solid #ccc;
}

.pdf-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.rich-text-container {
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
</style>