<template>
  <VForm 
    ref="formRef" 
    :readonly=" helper.clickIn == 'Show'"
    enctype="multipart/form-data"
    >
      <VRow v-for="(row,i) in rows" :key="i" :class="row.rowClass ?? 'mb-3'">
        <slot v-for="(field,j) in row.fields" :key="j" :name="field.valueForm">
          <VCol 
            :class="field.colClass && field.colClass.length > 0 ? field.colClass : 'v-col'"
            >
            <VTextarea 
              v-if="field.type === 'textarea'"
              v-model="form[field.valueForm]"
              :class="field.fieldClass"
              :rules="field.rules"
              :label="field.label"
            />
            <SelectComponent
              v-else-if="field.type === 'select'"
              :items="(field.select!.items as any)"
              v-model="form[field.valueForm]"
              :name="field.label"
              :item-title="field.select!.itemTitle"
              :item-value="field.select!.itemValue"
              :rules="field.rules"
              :menu-props="field.select!.menuProps"
              :multiple="field.select!.multiple"
            />
            <VSwitch 
              v-else-if="field.type === 'switch'"
              color="primary"
              inset
              v-model="form[field.valueForm]"
              :class="field.fieldClass"
              :rules="field.rules"
              :label="field.label" />
            <UploadImageComponent
              v-else-if="field.type === 'image'"
              v-model="form[field.valueForm]"
              :text="field.label"
              >
              
            </UploadImageComponent>
            <!-- <VTextField v-else-if="field.type === 'image'" type="file"  /> -->
            <!-- <VSelect
              v-else-if="field.type === 'select'"
              :items="field.select?.items.value"
              v-model="form[field.valueForm]"
              :label="field.label"
              :item-title="field.select!.itemTitle"
              :item-value="field.select!.itemValue"
              :rules="field.rules"
              :menu-props="field.select!.menuProps"
              :multiple="field.select!.multiple"
            /> -->
            <InputComponent 
              v-else
              v-model="form[field.valueForm]"
              :type="field.type"
              :class="field.fieldClass"
              :rules="field.rules"
              :name="field.label"
              :id="field.valueForm"
            />
            <!-- <VTextField
              v-else
              v-model="form[field.valueForm]"
              :type="field.type"
              :class="field.fieldClass"
              :rules="field.rules"
              :label="field.label"
            /> -->
          </VCol>
        </slot>
      </VRow>
  </VForm>
</template>

<script setup lang="ts">
import { helperStore } from '@/helper'
import type { Row } from '@/interfaces/FormComponent.helper'
import InputComponent from '@/components/InputComponent.vue'
import SelectComponent from '../SelectComponent.vue';
import { storeToRefs } from 'pinia';
import UploadImageComponent from '@/views/user/Kyc/components/UploadImageComponent.vue'
const props = defineProps<Props>()

const helper = helperStore()
const { formCrud: form , formRef} = storeToRefs(helper)

interface Props {
  rows: Row[]
}

const verificateIfExistUpload = (): boolean => {
  return props.rows.some(row => (row.fields.some(field => field.type == 'image')))
}
// -------------------------------------------
</script>

<style scoped>

</style>
