<template>
    <slot name="label">
        <VLabel class="pl-3 text-capitalize font-weight-bold" style="">{{name}}</VLabel>
    </slot>
    <VResponsive class="v-text-field__slot"
        :style="{
            height
        }"
        >
        <VTextField 
            :rounded="40" 
            variant="filled" 
            class="ma-0 pa-0" 
            :name="name"
            hide-details 
            single-line
            v-model="mValue" 
            style="max-height: 40px;" 
            :type="type ?? 'text'"
            :rules="rules" 
            density="compact"
            :disabled="disabled"
            :active="active??false"
            v-on="events ?? {}"
            @update:model-value="emits('update:model-value',$event)"
            >
            <template v-if="appendIcon" #append>
                <VBtn 
                    color="transparent" 
                    :icon="appendIcon"
                    style="max-height: 40px;" 
                    @click="emits('click:append-icon')"
                    ></VBtn>
            </template>
        </VTextField>
    </VResponsive>
    <div class="w-100 text-center ma-0 pa-0" >
        <VLabel v-if="errors" class="text-error ml-5 font-weight-bold ">
            {{ errors }}
        </VLabel>
    </div>
</template>

<script setup lang="ts">
import { helperStore } from '@/helper';
import { toRefs } from 'vue';
import { computed } from 'vue';
import type { PropsComponents } from '@/interfaces/Components.helper'
const emits = defineEmits<{
    (e:'update:model-value',value:any):void
    (e:'click:append-icon'):void
}>()
const props = defineProps<{
    modelValue: any,
    rules?: any | any[]
    name: string
    type?: string
    active?: boolean
    appendIcon?: string
    disabled?: boolean,
    events?: Object
    height?: any
}>()
const { modelValue:mValue } = toRefs(props)
const helper = helperStore()

const errors = computed(()=>{
    const errors = helper.formRef?.errors as ErrorType[] | null
    if(!errors) return false

    const errorIn =errors.find(err => err.id == props.name)
    if(!errorIn) return false

    return errorIn.errorMessages[0]
})

interface ErrorType{
    id:string
    errorMessages: string[]
}
</script>

<style scoped>
.v-text-field__slot {
  background: linear-gradient(white, white) padding-box, linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(80,67,233,1) 0%, rgba(22,180,229,1) 100%) border-box;
  border: 1px solid transparent;
  border-radius: 20px;
  text-align: center;
  color: #5D5FEF;
}
</style>