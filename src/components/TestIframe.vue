<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, watchEffect, nextTick } from "vue";
import pdfFile from "../assets/326_ParcelLabelingGuide-1 - 副本【搜狗文档翻译_双语_英译中】.pdf";
const pdfUrl = ref(`${window.location.origin}${pdfFile}`);

const iframeRef = ref();
onMounted(() => {
  console.log("挂在页面", window.location);
});
onUnmounted(() => {
  console.log("卸载");
});
watch(
  iframeRef,
  (newValue, oldValue) => {
    console.log(newValue, oldValue, "watchers");
    console.log(newValue.contentWindow);
    if (newValue) {
      console.log(newValue.contentWindow, "ele");
      newValue.onload = () => {
        console.log("load watchers");
        console.log(newValue.contentWindow);
        newValue.contentWindow.addEventListener("afterprint", function () {
          console.log("after print addEventListener");
        });
        let mediaQueryList = newValue.contentWindow.matchMedia("print");
        mediaQueryList.addListener(function (mql) {
          if (mql.matches) {
            console.log("onbeforeprint equivalent");
          } else {
            console.log("onafterprint equivalent");
          }
        });
        // newValue.contentWindow.onafterprint = afterprintfn;
      };
    }
  },
  { deep: true }
);

const onaAfterprintfn = () => {
  console.log("after print afterprintfn");
};

const handlePdfClick = () => {
  console.log("iframeRef", iframeRef.value, iframeRef.value.contentWindow);
  // iframeRef.value.contentWindow.addEventListener('afterprint', () => {
  //   console.log('after print')
  // })
  // iframeRef.value.contentWindow.addEventListener('afterprint', () => {
  //   console.log('after print')
  // })

  // iframeRef.value.contentWindow.onload = onload;

  iframeRef.value.contentWindow.print();
  // iframeRef.value.contentWindow.addEventListener("afterprint", () => {
  //   console.log("after print: clicked");
  // });
};
async function loaded() {
  let IframeEle = document.getElementById("Iframe");

  console.log("loaded", IframeEle);
  console.log("IframeEle", IframeEle.contentWindow);
  await nextTick();
  IframeEle.contentWindow.addEventListener("afterprint", () => {
    console.log("after print");
  });

  let mediaQueryList = IframeEle.contentWindow.matchMedia("print");
  console.log("mediaQueryList", mediaQueryList);
  mediaQueryList.addEventListener("change", function (mql) {
    console.log("mql", mql);
    if (mql.matches) {
      console.log("onbeforeprint equivalent");
    } else {
      console.log("onafterprint equivalent");
    }
  });
}
</script>

<template>
  <div class="test-iframe">
    <iframe
      class="iframe-box"
      title="PDF文件"
      id="Iframe"
      :src="pdfUrl"
      ref="iframeRef"
      @load="loaded"
      @afterprint="onaAfterprintfn"
    >
    </iframe>
    <button @click="handlePdfClick">打印</button>
  </div>
</template>

<style scoped>
.iframe-box {
  width: 1200px;
  height: 800px;
}
</style>
