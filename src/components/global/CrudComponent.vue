<script setup lang="ts">
import { helperStore } from '@/helper';
import type { Row } from '@/interfaces/FormComponent.helper';
import DialogBase from '@/views/global/DialogGlobal.vue';
import { useI18n } from 'vue-i18n';
import FormComponent from '../global/FormComponent.vue';
import { storeToRefs } from 'pinia';
import { toRefs, computed } from 'vue';
const { t } = useI18n()

const helper = helperStore()
const {formRef,item,formCrud,openModalCrud,clickIn} = storeToRefs(helper)


const props = defineProps<Props>()
const {singular} = toRefs(props)

const CreateOrUpdate = async () => {
  let res:unknown
  if(item.value){
    res = await helper.put(item.value.id,formCrud.value)
  }else{
    res = await helper.create(formCrud.value)
  }
  if(res === false)return
  closeModal()
  helper.index()
  
}

const closeModal = () => {
  formRef.value.reset()
  openModalCrud.value = false
}

interface Props {
  singular:string,
  rows: Row[]
}

const getTitle = computed(() :string => {
  switch(clickIn.value){
    case 'Show':
      return t("commons.show-title-modal",{singular:singular.value})
    case 'Edit':
      return t("commons.update-title-modal",{singular:singular.value})
    case 'Create':
      return t("commons.create-title-modal",{singular:singular.value})
    default:
      return ''
  }
})

const getButton = computed(():string => {
  switch(clickIn.value){
    case 'Edit':
      return t("commons.Update")
    case 'Create':
      return t("commons.Create")
    default:
      return ''
  }
})
</script>

<template>
  <DialogBase :dialog="openModalCrud" :widthDialog="'1000px'" @closeDialog="openModalCrud = false">
    <template #title>{{ getTitle }}</template>

    <template #content>
      <FormComponent :rows="rows" />
    </template>

    <template #actions>
      <v-row class="paddingBtn">
        <VBtn @click="closeModal()"> {{ $t('commons.Cancel') }} </VBtn>
        <v-spacer></v-spacer>
        <VBtn 
          v-if="helper.clickIn !== 'Show'" 
          variant="elevated" 
          @click="CreateOrUpdate"> 
          {{ getButton }} 
          </VBtn>
      </v-row>
    </template>
  </DialogBase>
</template>

<style>
.paddingBtn {
  padding-left: 15px;
  padding-right: 20px;
}
</style>

