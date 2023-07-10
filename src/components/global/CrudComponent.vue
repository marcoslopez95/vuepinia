<script setup lang="ts">
import { helperStore } from '@/helper';
import type { Row } from '@/interfaces/FormComponent.helper';
import DialogBase from '@/components/global/DialogGlobal.vue';
import { useI18n } from 'vue-i18n';
import FormComponent from '@/components/global/FormComponent.vue';
import { storeToRefs } from 'pinia';
import { toRefs, computed } from 'vue';
const { t } = useI18n()

const helper = helperStore()
const { formRef, item, formCrud, openModalCrud, clickIn } = storeToRefs(helper)

const emits = defineEmits<{
  (e: 'click:post', value: any): void
}>()
const props = defineProps<Props>()
const { singular } = toRefs(props)

const CreateOrUpdate = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return
  let data;
  if (verificateIfExistUpload()) {
    // emits('click:post', formCrud.value)
    data = new FormData()

    for(let key in formCrud.value){
      let value;
      if(typeof formCrud.value[key] == 'boolean'){
        value = formCrud.value[key] === true ? '1' : '0'
      }else
      if (typeof formCrud.value[key] == 'number'){
        value = formCrud.value[key].toString()
      }else{
        value = formCrud.value[key]
      }

      data.append(key,value)
    }
    const url = clickIn.value === 'Create' ? helper.url : helper.url+`/${helper.item.id}`
    helper
        .http(url, 'post', { data })
        .then(() => {
            closeModal()
            helper.index()
        })
    return
  }
  data = formCrud.value
  let res = clickIn.value == 'Edit' 
            ? await helper.put(item.value.id, data)
            : await helper.create(data)
  
  if (res === false) return
  
  closeModal()
  helper.index()

}

const verificateIfExistUpload = (): boolean => {
  return props.rows.some(row => (row.fields.some(field => field.type == 'image')))
}

const getFieldsName = (): string[] => {
  const fieldsRows: string[] = []

  props.rows.forEach(row => {
    fieldsRows.push(...row.fields.map(field => field.valueForm))
  })

  return fieldsRows
}
const closeModal = () => {
  formRef.value.reset()
  openModalCrud.value = false
}

interface Props {
  singular: string,
  rows: Row[]
}

const getTitle = computed((): string => {
  switch (clickIn.value) {
    case 'Show':
      return t("commons.show-title-modal", { singular: singular.value })
    case 'Edit':
      return t("commons.update-title-modal", { singular: singular.value })
    case 'Create':
      return t("commons.create-title-modal", { singular: singular.value })
    default:
      return ''
  }
})

const getButton = computed((): string => {
  switch (clickIn.value) {
    case 'Edit':
      return t("buttons.update")
    case 'Create':
      return t("buttons.create")
    default:
      return ''
  }
})

</script>

<template>
  <DialogBase :dialog="openModalCrud" :widthDialog="'1000px'" @closeDialog="openModalCrud = false" footer>
    <template #title>{{ getTitle }}</template>

    <template #content>
      <FormComponent :rows="rows">
      </FormComponent>
    </template>

    <template #actions>
      <v-row class="paddingBtn">
        <VBtnPrimary variant="outlined" @click="closeModal()"> {{ $t('buttons.cancel') }} </VBtnPrimary>
        <v-spacer></v-spacer>
        <VBtnPrimary v-if="clickIn != 'Show'" variant="elevated" @click="CreateOrUpdate">
          {{ getButton }}
        </VBtnPrimary>
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

