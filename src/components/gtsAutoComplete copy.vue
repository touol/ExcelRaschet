<template>
  <gtsAutoComplete v-model="naryad_id" :setting="setting" :edit="true"/>
</template>

<script setup>
  import { ref } from 'vue';
  import { gtsAutoComplete } from './gtsAutoComplete.vue';
  const naryad_id = ref(2)
  const setting = ref({
    class:"tSkladNaryad",
    select:["id","name","group"],
    template:"{{ name }} ({{ group }})",
    rows:[
      {id:1,name:"Воздуховоды",group:"Слесарные работы"},
      {id:2,name:"СП",group:"Слесарные работы"},
      {id:3,name:"фас.пр.",group:"Слесарные работы"},
    ],
    total:14
  })
</script>