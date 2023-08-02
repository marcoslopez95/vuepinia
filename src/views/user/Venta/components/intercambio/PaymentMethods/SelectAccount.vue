<template>
    <div>
        <h3 class="text-primary">Selecciona cuenta de destino</h3>
        <p class="text-table">
            Puedes seleccionar una de tus cuentas o ir a la configuración de tu perfil y agregar una nueva cuenta, la cuenta por defecto en la orden es la cuenta activa.
        </p>
    </div>
    dentro del componente {{ valueSelect }} <br>
    {{ itemsDetails }}
    <div>
        <SelectComponent
            name=""
            v-model="valueSelect"
            :items="itemsDetails"
            itemValue="id"
            itemTitle="attributes.name"
        >
        </SelectComponent>
    </div>
</template>

<script setup lang="ts">
import SelectComponent from '@/components/SelectComponent.vue';
import { helperStore } from '@/helper';
import type { BankAccountClient } from '@/interfaces/CompanyAccount/BankAccount/BankAccount.model';
import type { OtherAccountClient } from '@/interfaces/CompanyAccount/OtherAccount/OtherAccount.model';
import type { PaymentMethod } from '@/interfaces/PaymentMethod/PaymentMethod.model';
import { toRefs } from 'vue';
import { watch } from 'vue';
import { computed } from 'vue';
import { ref } from 'vue';

const emits = defineEmits<{
    (e:'update:model-value',value:number):void
}>()
const helper = helperStore()
const props = defineProps<{
    modelValue: any,
    // itemsDetails: BankAccountClient[] | OtherAccountClient[]
    paymentMethod: PaymentMethod
}>()
const valueSelect = ref<any>('')
const itemsDetails = ref<any>([])

watch(() => props.paymentMethod, (nuevo)=> {
    // getDetailsForPaymentMethod()
    // emits('update:model-value',nuevo)
})
const { modelValue } = toRefs(props)

const getDetailsForPaymentMethod = async () => {
    const params = {
        payment_type_id: props.paymentMethod.id
    }
    const res = await helper.http('client/account', 'get', { params })
    itemsDetails.value = res.data.response
    .map((item: any) => ({
        id:item.id,
        attributes: {name: titleSelect(item)}
    }))
}
getDetailsForPaymentMethod()
const titleSelect = (item:OtherAccountClient | BankAccountClient): string => {
    let str = item.attributes.beneficiary;
    if((item as OtherAccountClient).attributes.code_phone ){
        str += ' ' + item.relationships?.paymentType.attributes.name
    }else{
        str  += ' ' + (item as BankAccountClient).relationships?.bank.attributes.name
    }

    return str
}
</script>

<style scoped>

</style>