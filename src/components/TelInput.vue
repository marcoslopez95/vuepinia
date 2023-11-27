<template>
    <VLabel class="pl-3 text-capitalize font-weight-light text-table" style="">{{ !withoutLabel ?name : '' }}</VLabel>
    <!-- <VResponsive class="v-text-field__slot"> -->
        <vue-tel-input 
            v-model="modelValue" 
            :autoDefaultCountry="false"
            defaultCountry="co"
            styleClasses="v-text-field__slot"
            style="min-height: 40px;"
            :inputOptions="{placeholder,styleClasses: 'text-primary'}"
            @onInput="updateModel"
            validCharactersOnly
            >
        </vue-tel-input>
    <!-- </VResponsive> -->
    <div class="w-100 text-center ma-0 pa-0">
        <VLabel v-if="error" class="text-error ml-5 font-weight-bold ">
            {{ error }}
        </VLabel>
    </div>
</template>

<script setup lang="ts">
import { helperStore } from '@/helper';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { toRefs } from 'vue';
import {VueTelInput} from 'vue-tel-input';

const emits = defineEmits<{
    (e: 'update:model-value',value:string):void,
    (e: 'isValid',bool:boolean):void,
    (e: 'phoneCode',code:string):void,
    (e: 'phone', phone:string):void,
    (e: 'country', value:Country):void,
}>()
const props = defineProps<{
    modelValue: any,
    name?: string
    rules?: any | any[]
    required?: boolean
    withoutLabel?: boolean
    placeholder?: string
}>()
const { modelValue } = toRefs(props)

const error = ref('')

const updateModel = (formatedPhone: string,objectPhone:ObjectPhone) => {
    error.value = ''
    emits('update:model-value',formatedPhone)
    emits('isValid',objectPhone.valid)
    emits('phoneCode',objectPhone.countryCallingCode)
    emits('phone',objectPhone.nationalNumber)
    emits('country', objectPhone.country)

    if(!modelValue.value && props.required)
    {
        error.value = ('Required')
    }else
    if(!objectPhone.valid && modelValue.value){
        error.value = 'Format no valid'
    }
    
}


interface ObjectPhone {
  countryCallingCode: string;
  nationalNumber: string;
  number: string;
  country: Country;
  countryCode: string;
  valid: boolean;
  formatted: string;
}

interface Country {
  name: string;
  iso2: string;
  dialCode: string;
}

</script>

<style lang="scss">
@import "@/scss/variables.scss";
input.vti__input::placeholder {
    color: $color-primary;
    opacity: 0.4;
}

.v-text-field__slot {
    background: linear-gradient(white, white) padding-box, linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(80,67,233,1) 0%, rgba(22,180,229,1) 100%) border-box;
    border: 1px solid transparent;
    border-radius: 20px;
    text-align: center;
    color: #5D5FEF;
  }
</style>