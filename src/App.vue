
<template>
  <PVTables table="sraschet" 
    :actions="actions" 
    ref="childComponentRef"
  />
  <Toast/>
  <Dialog
      v-model:visible="createDocDialog"
      :style="{ width: '450px' }"
      header="Создать"
      :modal="true"
      class="p-fluid"
    >
      <div class="p-field">
        <label for="doc_type_id">Тип документа</label>
        <GTSAutocomplete
          v-model:id="Doc.doc_type_id"
          table="DocType"
        />
      </div>
      <template v-if="Doc.doc_type_id==1">
        <div class="p-field">
        <label for="doc_type_id">Договор</label>
          <GTSAutocomplete
            v-model:id="Doc.doc_type_id"
            table="DocType"
          />
        </div>
      </template>
      <template #footer>
        <Button
          label="Отмена"
          icon="pi pi-times"
          class="p-button-text"
          @click="hideDialog"
        />
        <Button
          label="Сохранить"
          icon="pi pi-check"
          class="p-button-text"
          @click="saveLineItem"
        />
      </template>
    </Dialog>
</template>

<script setup>

  import { PVTables } from 'pvtables/pvtables'
  import { ref } from 'vue';
  import Toast from 'primevue/toast';

  import Button from "primevue/button";
  import Dialog from "primevue/dialog";

  import GTSAutocomplete from "pvtables/gtsautocomplete";
  import apiCtor from 'pvtables/api'

  const childComponentRef = ref()
  const createDocDialog = ref(false)
  const api = apiCtor('DocOrderLink')
  const submitted = ref(false)
  const api_sraschet = apiCtor('sraschet')
  
  const Doc = ref({})
  const actions = ref({
    DocOrderLink:{
      create:{
        row:true,
        icon:"pi pi-plus",
        class:"p-button-rounded p-button-danger",
        head_click: (event,table,filters,selectedlineItems) => {
          console.log('create',event,table,filters,selectedlineItems)
          const order_id = filters.order_id.constraints[0].value
          console.log('order_id',order_id)
          createDocDialog.value = true
          // childComponentRef.value.refresh('DocOrderLink');
          
        }
      }
    }
  })
  const hideDialog = () => {
    createDocDialog.value = false;
    submitted.value = false;
  };
  const saveLineItem = async () => {
    submitted.value = true;

    // if (lineItem.value.id) {

    //   try {
    //     await api.update(lineItem.value)
    
    //     lineItems.value[findIndexById(Number(lineItem.value.id))] =
    //     lineItem.value;
    //     lineItemDialog.value = false;
    //     lineItem.value = {};
    //   } catch (error) {
    //     notify('error', { detail: error.message });
    //   }
    // } else {
    //   try {
    //     await api.create(lineItem.value)
    //     refresh()
    //     lineItemDialog.value = false;
    //     lineItem.value = {};
    //   } catch (error) {
    //     notify('error', { detail: error.message });
    //   }
    // }
  };
</script>
<style>

</style>
