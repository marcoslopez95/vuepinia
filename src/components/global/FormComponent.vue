<template>
  <VForm ref="formRef" :readonly=" helper.clickIn == 'Show'">
      <VRow v-for="(row,i) in rows" :key="i" :class="row.rowClass ?? 'mb-3'">
        <VCol 
          v-for="(field,j) in row.fields" :key="j" 
          :class="field.colClass && field.colClass.length > 0 ? field.colClass : 'v-col'"
          >
          <VTextarea 
            v-if="field.type === 'textarea'"
            v-model="form[field.valueForm]"
            :class="field.fieldClass"
            :rules="field.rules"
            :label="field.label"
          />
          <VSelect
            v-else-if="field.type === 'select'"
            :items="field.select?.items.value"
            v-model="form[field.valueForm]"
            :label="field.label"
            :item-title="field.select!.itemTitle"
            :item-value="field.select!.itemValue"
            :rules="field.rules"
            :menu-props="field.select!.menuProps"
          />
          <VTextField
            v-else
            v-model="form[field.valueForm]"
            :type="field.type"
            :class="field.fieldClass"
            :rules="field.rules"
            :label="field.label"
          />
        </VCol>
      </VRow>
  </VForm>
</template>

<script setup lang="ts">
import { helperStore } from '@/helper'
import type { Row } from '@/interfaces/FormComponent.helper'
import { storeToRefs } from 'pinia';

const props = defineProps<Props>()

const helper = helperStore()
const { formCrud: form , formRef} = storeToRefs(helper)

interface Props {
  rows: Row[]
}

// -------------------------------------------
</script>

<style scoped>

</style>
