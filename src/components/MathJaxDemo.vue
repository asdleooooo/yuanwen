<template>
  <div class="math-container">
    <div class="formula-section" ref="formulaContainer">
      <h2>数学公式示例</h2>
      
      <div class="formula-item">
        <h3>二次方程</h3>
        <div class="formula">\[ax^2 + bx + c = 0\]</div>
        <div class="formula">\[x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}\]</div>
        <div class="formula">
          $$
          x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
          $$
        </div>
      </div>

      <div class="formula-item">
        <h3>三角函数</h3>
        <div class="formula">\[\sin^2 \theta + \cos^2 \theta = 1\]</div>
        <div class="formula">\[\tan \theta = \frac{\sin \theta}{\cos \theta}\]</div>
      </div>

      <div class="formula-item">
        <h3>微积分</h3>
        <div class="formula">\[\int_{a}^{b} f(x) dx = F(b) - F(a)\]</div>
        <div class="formula">\[\frac{d}{dx} \sin x = \cos x\]</div>
      </div>

      <div class="formula-item">
        <h3>矩阵</h3>
        <div class="formula">\[\begin{pmatrix} a & b \\ c & d \end{pmatrix}\]</div>
        <div class="formula">\[\begin{vmatrix} a & b \\ c & d \end{vmatrix} = ad - bc\]</div>
      </div>

      <div class="formula-item">
        <h3>极限</h3>
        <div class="formula">\[\lim_{x \to \infty} \frac{1}{x} = 0\]</div>
        <div class="formula">\[\lim_{x \to 0} \frac{\sin x}{x} = 1\]</div>
      </div>

      <div class="formula-item">
        <h3>级数</h3>
        <div class="formula">\[\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}\]</div>
        <div class="formula">\[\prod_{n=1}^{\infty} (1 + \frac{1}{n}) = e\]</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const formulaContainer = ref(null)

onMounted(() => {
  // 等待MathJax加载完成后渲染公式
  if (window.MathJax) {
    window.MathJax.typesetPromise?.()
  } else {
    // 如果MathJax还没加载完成，等待加载
    const checkMathJax = setInterval(() => {
      if (window.MathJax) {
        window.MathJax.typesetPromise?.()
        clearInterval(checkMathJax)
      }
    }, 100)
  }
})
</script>

<style scoped>
.math-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.formula-section {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
}

.formula-item {
  margin-bottom: 30px;
}

.formula-item h3 {
  color: #333;
  margin-bottom: 15px;
  font-size: 1.2em;
}

.formula {
  margin: 10px 0;
  padding: 10px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  min-height: 40px;
}

/* MathJax样式覆盖 */
:deep(.MathJax) {
  font-size: 1.1em !important;
}

:deep(.MathJax_Display) {
  margin: 1em 0 !important;
}

:deep(.MathJax_SVG_Display) {
  margin: 1em 0 !important;
}
</style> 