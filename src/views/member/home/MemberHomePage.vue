<template>
   <div class="member-home">
      <MemberHomeOverview />
      <MemberHomePanel title="我的收藏">
         <GoodsItem v-for="item in member_store.collections[1].result.items.slice(0, 4)" :key="item.id" :goods="item" />
      </MemberHomePanel>
      <MemberHomePanel title="我的足迹"></MemberHomePanel>
      <GoodsRelevant />
   </div>
</template>

<script setup lang="ts">
import MemberHomeOverview from "./components/MemberHomeOverview.vue";
import MemberHomePanel from "./components/MemberHomePanel.vue";
import GoodsRelevant from "../../goods/components/GoodsRelevant.vue";
import GoodsItem from "../../category/components/GoodsItem.vue";

import { useMemberStore } from "@/stores/memberStore";

const member_store = useMemberStore();
member_store.getCollections({ collectType: 1, page: 1, pageSize: 10 });
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