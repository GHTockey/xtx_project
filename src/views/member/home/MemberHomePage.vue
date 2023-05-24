<template>
   <div class="member-home">
      <MemberHomeOverview />
      <MemberHomePanel title="我的收藏"></MemberHomePanel>
      <MemberHomePanel title="我的足迹"></MemberHomePanel>
      <GoodsRelevant />
   </div>
</template>

<script setup lang="ts">
import MemberHomeOverview from "./components/MemberHomeOverview.vue";
import MemberHomePanel from "./components/MemberHomePanel.vue";
import GoodsRelevant from "../../goods/components/GoodsRelevant.vue";
</script>
 
<style scoped lang="less">
.member-home {
   :deep(.xtx-carousel) .carousel-btn.prev {
      left: 5px;
   }

   :deep(.xtx-carousel) .carousel-btn.next {
      right: 5px;
   }
}
</style>