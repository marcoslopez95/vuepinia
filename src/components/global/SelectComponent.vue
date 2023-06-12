<template>
    <VSelect
        v-model="modelValue" 
        :items="items"
        :item-title="itemTitle"
        :item-value="itemValue"
        variant="plain"
        single-line
        :label="label"
        density="compact"
        color="#5C6776"
        class="rounded-pill pl-3 border pa-0 mb-2 mt-2"
        :class="getErrorInput ? 'color-border-danger' : 'color-border-primary'"
        style="max-height: 40px!important; color:#5C6776;" 
        @update:model-value="emits('update:model-value', $event)">
    <template #label="{isActive,isFocused}">
        <span 
            class="font-weight-bold"
            style="margin-top: -5px;" 
            :style="(isActive || isFocused)? 'font-size:14px;':''">
            {{ label }}
        </span>
    </template>
    <template #message class="">
        <div style="margin-top: -9px;">
            {{ getErrorInput }}
        </div>
    </template>
    </VSelect>
</template>

<script setup lang="ts">
import { helperStore } from '@/helper';
import { toRefs, computed } from 'vue'
const props = defineProps<{
    items:any[],
    itemTitle: string
    itemValue: string
    rules?: any[],
    modelValue: any,
    id: string,
    type?: string,
    label?: string,
    class?: Array<string>
    firstElement?: any & {id:any}
}>()
const { modelValue,items } = toRefs(props)
if(props.firstElement){
    if(!items.value.find(item => item.id === props.firstElement!.id)){
        items.value.unshift(props.firstElement)
    }
}
const emits = defineEmits(['update:model-value'])

const helper = helperStore()

const getErrorInput = computed(() => {
    if (helper.errorsInput.length === 0) return ''
    return helper.errorsInput
        .find(e => e.id === props.id)
        ?.errorMessages[0] ?? ''
})

</script>

<style scoped>
.color-border-primary {
    border-color: #5043E9 !important;
}

.color-border-danger {
    border-color: #FF0000 !important;
}

.v-field__input input {
    margin-top: 211px;
}
</style>