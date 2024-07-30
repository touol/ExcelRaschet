<template>
  <PVForm v-model="model" :columns="columns" :autocompleteSettings="autocompleteSettings"/>
</template>
<script setup>
  import { ref, onMounted } from "vue";
  import { useNotifications, apiCtor, PVForm } from 'pvtables/dist/pvtables';

  
  const { notify } = useNotifications();

  const model = defineModel({
    type: Object,
    default: {},
  });

  const api = apiCtor('commercialItem')
  const api_gtsBPeriod = apiCtor('gtsBPeriod')

  const columns = ref([])
  const autocompleteSettings = ref({})

  onMounted(async () => {
    // console.log('model',model)
    try {
      const response = await api.options()

      if (response.data.hasOwnProperty("fields")) {
        let fields = response.data.fields;
        let cols = [];
        for (let field in fields) {
          fields[field].field = field;
          if (!fields[field].hasOwnProperty("label")) {
            fields[field].label = field;
          }
          if (!fields[field].hasOwnProperty("type")) fields[field].type = "text";
          if (fields[field].hasOwnProperty("readonly")){
            if(fields[field].readonly === true || fields[field].readonly == 1){
              fields[field].readonly = true
            }else{
              fields[field].readonly = false
            }
          }
          if (fields[field].hasOwnProperty("default")){
            model.value[field] = fields[field].default
          }
          cols.push(fields[field]);
          columns.value = cols;
        }
      }
    } catch (error) {
      notify('error', { detail: error.message });
    }
    try {
      const response = await api_gtsBPeriod.autocomplete()
      autocompleteSettings.value['period_id'] = response.data;

    } catch (error) {
      notify('error', { detail: error.message });
    }
  })

  
</script>