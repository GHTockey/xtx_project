<!-- src/components/XtxMemberLayout.vue -->
<template>
   <div class="container">
      <XtxMemberSidebar />
      <article class="article">
         <RouterView />
      </article>
   </div>
</template>

<script lang="ts" setup>
import XtxMemberSidebar from "./XtxMemberSidebar.vue";


</script>
 
<style scoped lang="less">
.container {
   display: flex;
   padding-top: 20px;

   .article {
      width: 1000px;
      position: relative;
   }
}
</style>