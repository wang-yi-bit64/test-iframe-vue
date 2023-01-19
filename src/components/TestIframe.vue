<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, watchEffect } from "vue";
import pdfFile from "../assets/326_ParcelLabelingGuide-1 - 副本【搜狗文档翻译_双语_英译中】.pdf";
const iframeRef = ref();
onMounted(() => {
  console.log("挂在页面");
});
onUnmounted(() => {
  console.log("卸载");
});
// watch(
//   iframeRef,
//   (newValue, oldValue) => {
//     console.log(newValue, oldValue, "watchers");
//     console.log(newValue.contentWindow);
//     if (newValue) {
//       console.log(newValue.contentWindow, "ele");
//       newValue.onload = () => {
//         console.log("load watchers");
//         console.log(newValue.contentWindow);
//         newValue.contentWindow.addEventListener("afterprint", () => {
//           console.log("after print addEventListener");
//         });
//         let mediaQueryList = newValue.contentWindow.matchMedia("print");
//         mediaQueryList.addListener((mql) => {
//           if (mql.matches) {
//             console.log("onbeforeprint equivalent");
//           } else {
//             console.log("onafterprint equivalent");
//           }
//         });
//         newValue.contentWindow.onafterprint = afterprintfn;
//       };
//     }
//   },
//   { deep: true }
// );
watchEffect(() => {
  if (iframeRef.value) {
    iframeRef.value.onload = () => {
      console.log("load watchEffect");
      iframeRef.value.contentWindow.addEventListener("afterprint", () => {
        console.log("after print addEventListener watchEffect");
      });
      iframeRef.value.onafterprint = afterprintfn;
    };
  }
});

const afterprintfn = () => {
  console.log("after print afterprintfn");
};

const pdfUrl = ref(pdfFile);
const handlePdfClick = () => {
  console.log("iframeRef", iframeRef.value, iframeRef.value.contentWindow);
  // iframeRef.value.contentWindow.addEventListener('afterprint', () => {
  //   console.log('after print')
  // })
  // iframeRef.value.contentWindow.addEventListener('afterprint', () => {
  //   console.log('after print')
  // })

  iframeRef.value.contentWindow.onload = onload;

  iframeRef.value.contentWindow.print();
  iframeRef.value.contentWindow.addEventListener("afterprint", () => {
    console.log("after print: clicked");
  });
};
const onload = () => {
  console.log("load", iframeRef.value.contentWindow);

  iframeRef.value.contentWindow.addEventListener("afterprint", () => {
    console.log("after print");
  });

  // let mediaQueryList = iframeRef.value.contentWindow.matchMedia('print')
  // mediaQueryList.addListener((mql) => {
  //   if (mql.matches) {
  //     console.log('onbeforeprint equivalent');
  //   } else {
  //     console.log('onafterprint equivalent');
  //   }
  // });
};
</script>

<template>
  <div class="test-iframe">
    <iframe
      class="iframe-box"
      title="PDF文件"
      id="Iframe"
      :src="pdfUrl"
      ref="iframeRef"
      @onload="onload"
    />
    <button @click="handlePdfClick">打印</button>
  </div>
</template>

<style scoped>
.iframe-box {
  width: 1200px;
  height: 800px;
}
</style>
