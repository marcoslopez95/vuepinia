<template>
    <div>
        <h3 class="text-primary">Selecciona cuenta de destino</h3>
        <p class="text-table">
            Puedes seleccionar una de tus cuentas o ir a la configuración de tu
            perfil y agregar una nueva cuenta, la cuenta por defecto en la orden
            es la cuenta activa.
        </p>
    </div>
    <div :style="{
        width: $vuetify.display.xs ? '300px' : '390px'
    }" class="mx-auto">
        <SelectComponent
            name=""
            v-model="valueSelect"
            :items="itemsDetails"
            itemValue="id"
            itemTitle="attributes.name"
        >
        </SelectComponent>
    </div>
    <div v-if="accountSelect !== ''">
        <VCard
            elevation="0"
            class="border custom-border-primary mx-auto mt-10"
            :style="{
                width: $vuetify.display.xs ? '300px' : '390px'
            }" 
            :height=" $vuetify.display.xs ? 200 :173"
        >
            <VCardText class="" style="font-size: 18px;">
                    <VRow dense  class="d-flex text-table align-content-space-between">
                        <VCol >Nombre Titular:</VCol>
                        <VCol class="text-primary text-left">{{accountSelect?.attributes.beneficiary}}</VCol>
                    </VRow>
                    <VRow dense class="d-flex text-table">
                        <VCol>Número de Cuenta:</VCol>
                        <VCol class="text-left">{{accountSelect?.attributes.account_number}}</VCol>
                    </VRow>
                        <VRow dense class="d-flex text-table">
                            <VCol>{{ 
                                (accountSelect as BankAccountClient).relationships?.bank ? 'Banco'
                                : 'Tipo'
                             }}:</VCol>
                            <VCol class="text-left">{{
                                (accountSelect as BankAccountClient).relationships?.bank 
                                ? (accountSelect as BankAccountClient).relationships?.bank.attributes.name
                                : (accountSelect as OtherAccountClient).relationships?.typePayment.attributes.name
                            }}</VCol>
                        </VRow>
                        <VRow dense class="d-flex text-table">
                            <VCol>Identificación:</VCol>
                            <VCol class="text-left">{{accountSelect.attributes.identification_document}}</VCol>
                        </VRow>
            </VCardText>
        </VCard>
    </div>
</template>

<script setup lang="ts">
import SelectComponent from "@/components/SelectComponent.vue";
import { helperStore } from "@/helper";
import type { BankAccountClient } from "@/interfaces/CompanyAccount/BankAccount/BankAccount.model";
import type { OtherAccountClient } from "@/interfaces/CompanyAccount/OtherAccount/OtherAccount.model";
import type { PaymentMethod } from "@/interfaces/PaymentMethod/PaymentMethod.model";
import { toRefs } from "vue";
import { reactive } from "vue";
import { watch } from "vue";
import { computed } from "vue";
import { ref } from "vue";

const emits = defineEmits<{
    (e: "update:model-value", value: number | string): void;
}>();
const helper = helperStore();
const props = defineProps<{
    modelValue: any;
    // itemsDetails: BankAccountClient[] | OtherAccountClient[]
    paymentMethod: PaymentMethod;
}>();
const valueSelect = ref("");
const itemsDetails = ref<any>([]);

watch(
    () => props.paymentMethod,
    (nuevo) => {
        getDetailsForPaymentMethod();
        valueSelect.value = "";
        // emits('update:model-value',nuevo)
    }
);
watch(valueSelect, (nuevo) => {
    if(nuevo){
        accountSelect.value =  itemsDetails.value.find((item:any) => item.id == nuevo) ?? ''
    }else {
        accountSelect.value = ''
    }
    emits("update:model-value",nuevo ?? '')
})
const { modelValue } = toRefs(props);


const accountSelect = ref<OtherAccountClient | BankAccountClient | ''>('');

const getDetailsForPaymentMethod = async () => {
    const params = {
        payment_type_id: props.paymentMethod.id,
    };
    const res = await helper.http("client/account", "get", { params });
    console.log("nuevo", res.data.response);
    itemsDetails.value = res.data.response.map((item: any) => {
        item.attributes.name = titleSelect(item)
        return item
    });
};
getDetailsForPaymentMethod();
const titleSelect = (item: OtherAccountClient | BankAccountClient): string => {
    let str = item.attributes.beneficiary;
    if ((item as OtherAccountClient).attributes.phone) {
        str +=
            " " +
            (item as OtherAccountClient).relationships?.typePayment.attributes
                .name;
    } else {
        str +=
            " " +
            (item as BankAccountClient).relationships?.bank.attributes.name;
    }

    return str;
};
</script>

<style scoped lang="scss"></style>
