<template>
  <div class="flex items-center gap-4 mb-4">
    <label for="doc_id" class="font-semibold w-24">База 1с</label>
    <gtsAutoComplete
      v-model:id="model.base_id"
      table="doc1cBase"
      class="flex-auto" autocomplete="off"
    />
    <!-- <span  class="p-error">Это поле требуется.</span> -->
  </div>
  <div class="flex items-center gap-4 mb-4">
    <label for="doc_id" class="font-semibold w-24">Период</label>
    <gtsAutoComplete
      v-model:id="model.period_id"
      table="gtsBPeriod"
      :options="items_gtsBPeriod"
      class="flex-auto" autocomplete="off"
    />
    <!-- <span  class="p-error">Это поле требуется.</span> -->
  </div>
  <div class="flex items-center gap-4 mb-4">
    <label for="doc_id" class="font-semibold w-24">Номер счета</label>
    <InputText
      v-model="model.nomer_1c"
      class="flex-auto" autocomplete="off"
    />
    <!-- <span  class="p-error">Это поле требуется.</span> -->
  </div>
  <div class="flex items-center gap-4 mb-4">
    <label for="doc_id" class="font-semibold w-24">Номер счета полный</label>
    <InputText
      v-model="model.nomer_1c_str"
      class="flex-auto" autocomplete="off"
    />
    <!-- <span  class="p-error">Это поле требуется.</span> -->
  </div>
  <div class="flex items-center gap-4 mb-4">
    <label for="doc_id" class="font-semibold w-24">Дата счета</label>
    <gtsDate
      v-model="model.date_1c"
      class="flex-auto" autocomplete="off"
    />
    <!-- <span  class="p-error">Это поле требуется.</span> -->
  </div>
</template>
<script setup>
  import { ref, onMounted } from "vue";
  import { useNotifications, gtsAutoComplete, apiCtor, gtsDate, InputText } from 'pvtables/dist/pvtables';

  const api_gtsBPeriod = apiCtor('gtsBPeriod')
  const { notify } = useNotifications();

  const model = defineModel({
    type: Object,
    default: {
      base_id:'1',
      period_id:'',
      nomer_1c:'',
      nomer_1c_str:'',
      date_1c:'',
      file:''
    },
  });
  const items_gtsBPeriod = ref([])
  onMounted(async () => {
    try {
      const response = await api_gtsBPeriod.autocomplete()
      // items_gtsBPeriod.value = response.data.rows;
      // console.log('items_gtsBPeriod.value',items_gtsBPeriod.value)
      if(!model.value.period_id) model.value.period_id = response.data.default.toString();
    } catch (error) {
      // console.log('error',error)
      notify('error', { detail: error.message });
    }
  })
  
</script>