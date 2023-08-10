<template>
    <slot name="label">
        <VLabel v-if="!withoutLabel" class="pl-3 text-capitalize font-weight-bold" style="">
            {{ withoutLabel ? '' :  name }}
        </VLabel>
    </slot>
    <VResponsive class="v-text-field__slot"
        :style="{
            height
        }"
        >
        <VTextField 
            :id="idElement"
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
            :placeholder="placeholder"
            validate-on="input"
            density="compact"
            :disabled="disabled"
            :active="active??false"
            v-on="events ?? {}"
            @update:model-value="emits('update:model-value',$event)"
            bg-color="transparent"
            center-affix
            >
            <template v-if="appendIcon" #append-inner>
                <VIcon 
                    color="primary"
                    :icon="appendIcon"
                    @click="emits('click:append-icon')"
                    
                    ></VIcon>
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
    placeholder?: string
    rules?: any | any[]
    name: string
    withoutLabel?: boolean
    type?: string
    active?: boolean
    appendIcon?: any
    disabled?: boolean,
    events?: Object
    height?: any
    idElement?: string
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

<style scoped lang="scss">


</style>