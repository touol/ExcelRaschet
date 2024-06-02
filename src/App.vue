
<template>
  <PVTables table="sraschet" 
    :actions="actions" 
    ref="childComponentRef"
  />
  <Toast/>
</template>

<script setup>

  import {PVTables} from 'pvtables/pvtables'
  import { ref } from 'vue';
  import Toast from 'primevue/toast';

  const childComponentRef = ref()
  
  const actions = ref({
    // create:{
    //   row:true,
    //   icon:"pi pi-trash",
    //   class:"p-button-rounded p-button-danger",
    //   click: (data,colomns) => {
    //     // console.log('create',data,colomns)
        
    //     childComponentRef.value.refresh();
    //   }
    // }
  })
  
</script>
<style>

</style>
