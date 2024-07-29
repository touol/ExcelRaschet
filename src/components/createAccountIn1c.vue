<template>
  <div class="flex items-center gap-4 mb-4">
    <label for="doc_id" class="font-semibold w-24">База 1с</label>
    <gtsAutoComplete
      v-model:id="data.base_id"
      table="doc1cBase"
      class="flex-auto" autocomplete="off"
    />
  </div>
  <div class="flex items-center gap-4 mb-4">
    <label for="doc_id" class="font-semibold w-24">Сокращенный счет</label>
    <ToggleSwitch v-model="data.sokrashen"/>
  </div>
  
  <Button
    label="Создать"
    icon="pi pi-check"
    class="p-button-text"
    @click="saveItem"
  />
</template>
<script setup>
  import { ref } from "vue";
  import { useNotifications, gtsAutoComplete, apiCtor, Button, ToggleSwitch } from 'pvtables/dist/pvtables';

  const api_sraschet = apiCtor('sraschet',600000)
  const { notify } = useNotifications();

  const props = defineProps({
    raschet_id: {
      type: [String,Number],
      required: true,
    },
  });
  const data = ref({
    raschet_id:props.raschet_id,
    sokrashen:false,
    base_id:'1',
  })
  const emit = defineEmits(['acc-create-on']);
  const saveItem = async () => {
    try {
      const resp = await api_sraschet.action('ExcelRaschet/createAccountIn1c',data.value)
      // console.log('resp',resp)
      emit('acc-create-on',resp)
    } catch (error) {
      // console.log('notify3',error)
      notify('error', { detail: error.message });
    }
  };
</script>