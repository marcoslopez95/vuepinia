<template>
    <VLabel class="pl-3 text-capitalize font-weight-bold" style="">{{name}}</VLabel>
    <VResponsive class="v-text-field__slot">
        <VSelect
            variant="filled"
            :items="itemsWithSelectable"
            class="ma-0 pa-0" 
            hide-details 
            single-line
            style="max-height: 40px;" 
            density="compact"
            :name="name"
            v-model="modelValue" 
            :rules="rules" 
            :disabled="disabled"
            @update:model-value="emits('update:model-value',$event)"
            :multiple="multiple??false"
            :item-title="itemTitle"
            :item-value="itemValue"
        >
        <template #item="{item,props}">
            <VListItem 
                class="text-error" 
                @click="selectItem(item.value)"
                :active="activeItem(item.value)"
                >
                {{ item.title }}
            </VListItem>
        </template>
        </VSelect>
    </VResponsive>
    <div class="w-100 text-center ma-0 pa-0">
        <VLabel v-if="errors" class="text-error ml-5 font-weight-bold ">
            {{ errors }}
        </VLabel>
    </div>
</template>

<script setup lang="ts">
import { helperStore } from '@/helper';
import { toRefs } from 'vue';
import { ref,computed,onMounted } from 'vue';

const menu = ref(false)
const emits = defineEmits(['update:model-value'])
const props = defineProps<{
    modelValue: any,
    items: any[]
    name: string
    rules?: any | any[]
    type?: string
    itemValue: string
    itemTitle: string
    multiple?: boolean
    disabled?: boolean
}>()
const { modelValue,items } = toRefs(props)
const helper = helperStore()

const selectedItem  = () => {
    let item:any ={
        id: '',
        attributes: {}
    }

    const name = props.itemTitle.split('.')
    item.attributes[name[name.length-1]] = 'Seleccione...'

    return item
}

const itemsWithSelectable = computed(()=>{
    if(!items.value?.find((e) => e.id == '')){
        items.value?.unshift(selectedItem())
    }
    return items.value
})
const errors = computed(()=>{
    const errors = helper.formRef?.errors as ErrorType[] | null
    if(!errors) return false

    const errorIn =errors.find(err => err.id == props.name)
    if(!errorIn) return false

    return errorIn.errorMessages[0]
})




const selectItem = (value:any) => {
    if(props.multiple){
        emits('update:model-value',value)
        menu.value = false
        return 
    }
    menu.value = false
    emits('update:model-value',{...modelValue,value})
    return 
    // if(props.multiple){
    //     modelValue.value.push(value)
    // }else{
    //     modelValue.value = value
    // }

}

const activeItem = (value:any): boolean => {
    if(props.multiple && Array.isArray(props.modelValue)){
        return props.modelValue.find((item:any) => item == value) ? true : false
    }
    return props.modelValue == value
}
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