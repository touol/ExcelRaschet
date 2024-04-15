
<template>
  <PVTables table="tSkladNaryadSmena" :actions="actions" 
  ref="childComponentRef"
  v-on:message="message"
  />
  <Toast/>
</template>

<script setup>
  // import {gtsAutoComplete} from './components/gtsAutoComplete.vue'
  import {PVTables} from 'pvtables'
  import { ref } from 'vue';
  import { useToast } from "primevue/usetoast";

  
  // const data = ref({
  //   id:2,
  //   content:"test"
  // })
  
  const toast = useToast();
  const message = (mess)=>{
    // console.log('mess',mess)
    toast.add(mess)
  }
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
