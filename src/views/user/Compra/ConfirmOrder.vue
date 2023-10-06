<template>
    <VRow>
        <VCol cols="12">
            <SelectComponent
                v-model="form.shipping_type_id"
                :items="shippingType"
                :name="$t('views.shipping-types.title')"
                itemValue="id"
                itemTitle="attributes.name"
                classLabel="text-primary"
            >
                <template #label>
                    <div class="text-primary font-weight-bold">
                        {{ $t("views.shipping-types.title") }}
                    </div>
                </template>
            </SelectComponent>
        </VCol>
        <VCol cols="12">
            <div
                class="w-100 alertError py-2 px-1 rounded-lg text-soft-error d-flex"
                style="gap: 15px"
            >
                <div class="text-center align-self-center">
                    <VIcon size="50" class="">
                        <svg
                            width="60"
                            height="60"
                            viewBox="0 0 60 60"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                        >
                            <rect
                                width="60"
                                height="60"
                                fill="url(#pattern0222)"
                            />
                            <defs>
                                <pattern
                                    id="pattern0222"
                                    patternContentUnits="objectBoundingBox"
                                    width="1"
                                    height="1"
                                >
                                    <use
                                        xlink:href="#image0_157_59182222"
                                        transform="scale(0.0104167)"
                                    />
                                </pattern>
                                <image
                                    id="image0_157_59182222"
                                    width="96"
                                    height="96"
                                    xlink:href="data:image/png;base64,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"
                                />
                            </defs>
                        </svg>
                    </VIcon>
                </div>
                <div>
                    Puedes hacer transferencia virtual
                    <span class="font-weight-bold">UNICAMENTE</span> si tienes
                    tu identidad validada en nuestra seccion KYC (has click aqui
                    para validarla)
                </div>
            </div>
        </VCol>
    </VRow>
    <VRow>
        <VCol cols="12">
            <SelectComponent
                v-model="form.red_id"
                :items="networkTypes"
                :name="$t('views.network-type.title')"
                itemValue="id"
                itemTitle="attributes.name"
                classLabel="text-primary"
            >
                <template #label>
                    <div class="text-primary font-weight-bold">
                        {{ $t("views.network-type.title") }}
                    </div>
                </template>
            </SelectComponent>
        </VCol>
        <VCol cols="12">
            <VForm ref="formRef">
            <InputComponent
                v-model="form.address_send"
                :name="$t('views.order.address')"
                :rules="[validateAddress]"
                :append-icon="WalletIcon"
                @click:append-icon="modalSelectWallet = true"
            >
                <template #label>
                    <div class="text-primary font-weight-bold">
                        Dirección de destino
                    </div>
                </template>
            </InputComponent>
            </VForm>
            <SelectWallet
                :dialog="modalSelectWallet"
                @close-dialog="modalSelectWallet = false"
                @select-wallet="(value) => form.address_send = value.attributes.address"
            >

            </SelectWallet>
        </VCol>
        <VCol cols="12">
            <div class="w-100 py-2 px-1 text-primary d-flex" style="gap: 15px">
                <VCheckbox v-model="confirmAddress" color="primary">
                </VCheckbox>
                <div
                    class="ml-2 cursor-pointer"
                    @click="confirmAddress = !confirmAddress"
                >
                    Declaro conocer que las transacciones en criptomonedas son
                    irreversibles, y asumo la responsabilidad de cualquier error
                    de mi parte al introducir la direccion destino.
                </div>
            </div>
        </VCol>
    </VRow>

    <div class="text-table">
        <h5 class="text-primary">Comisión de mineros</h5>
        <div class="mb-5">
            Nosotros asumimos las comisiones hasta el 0,4% por el valor total de
            la transaccion, cuando las comisiones de la red bitcoin estan muy
            altas, como en este momento es posible que ese porcentaje no sea
            suficiente para que la transaccion se confirme rapidamente por eso
            motivo ofrecemos las siguientes opciones:
        </div>
        <VRow class="d-flex" v-for="(check, i) in checkboxes" :key="i">
            <VCol cols="12">
                <div class="w-100 px-1 d-flex" style="gap: 15px">
                    <VCheckbox
                        v-model="comisiones[check.label]"
                        color="primary"
                        @click="clickInOption(check.label)"
                    >
                    </VCheckbox>
                    <div
                        class="ml-2 cursor-pointer"
                        @click="clickInOption(check.label)"
                        v-html="check.text"
                    ></div>
                </div>
            </VCol>
        </VRow>
    </div>

    <PreviewOrderForConfirm 
        class="mb-5 mt-10 mx-auto" v-if="transactionStore.showPreviewOrder && smAndDown"
        style="max-width:350px"
        />
    <VRow>
        <VCol cols="6" class="text-center">
            <VBtnSecondary
            @click="clickInBack">
            {{ $t("general-views.back") }}
        </VBtnSecondary>
    </VCol>
    <VCol cols="6" class="text-center">
        <VBtnPrimary 
            :disabled="disabledButton" 
            @click="emitConfirmOrder">
                {{ $t("general-views.accept.title") }}
            </VBtnPrimary>
        </VCol>
        
    </VRow>
</template>

<script setup lang="ts">
import SelectComponent from "@/components/SelectComponent.vue";
import InputComponent from "@/components/InputComponent.vue";
import { ConfirmOrderStore } from "./CompraStore";
import { onMounted, ref } from "vue";
import { reactive } from "vue";
import { storeToRefs } from "pinia";
import { addressValid } from '@/validator'
import { WalletStore } from "@/stores/WalletStore"
import { helperStore } from "@/helper";
import WalletIcon from "@/assets/icons/WalletIcon.vue";
import SelectWallet from "./ConfirmOrder/SelectWallet.vue";
import { computed } from "vue";
import { TransactionStore } from "@/stores/TransactionStore";
import PreviewOrderForConfirm from '@/layouts/full/menuRight/PreviewOrder/PreviewOrderForConfirm.vue';
import { useDisplay } from "vuetify/lib/framework.mjs";
import { watch } from "vue";
import { GeneralConfiguration } from "@/stores/GeneralConfiguration";
import { FeesStore } from "@/stores/FeesStore";

const { smAndDown } = useDisplay()
const transactionStore = TransactionStore()
const modalSelectWallet = ref(false)
const feesStore = FeesStore()
const helper = helperStore()
const { formRef } = storeToRefs(helper)
const { checkboxes } = storeToRefs(feesStore)
const walletStore = WalletStore()
const confirmOrderStore = ConfirmOrderStore();
const { shippingType, form, networkTypes } = storeToRefs(confirmOrderStore);
const { getShippingTypes } = confirmOrderStore;
const generalConfiguration = GeneralConfiguration()
const { generalData } = storeToRefs(generalConfiguration);

feesStore.setCheckbox()
form.value.xcop_payment = false

const totalExchngeOriginal = form.value.total_exchange_local
// console.log('totalExchngeOriginal',totalExchngeOriginal)
const totalUsdOriginal = form.value.total_exchange_reference
onMounted(() => {
    form.value.shipping_type_id = ''
    form.value.red_id = ''
    form.value.address_send = ''
}),

confirmOrderStore.getNetworkTypes()
const emitConfirmOrder = async () => {
    const { valid } = await formRef.value.validate()
    console.log('valido',valid)
    if(!valid) return
    // return
    emits('confirmOrder')
}

const validateAddress = () => {
    const currency = walletStore.currencies
        .find(currencyIterable => currencyIterable.id === form.value.currency_id)!

    return addressValid(form.value.address_send!,currency.attributes.abbreviation)
}
const emits = defineEmits<{
    (e: "confirmOrder"): void;
    (e: 'back'):void
}>();
getShippingTypes();
const confirmAddress = ref(false);

const disabledButton = computed(():boolean => {
    return !confirmAddress.value || form.value.shipping_type_id == '' || form.value.red_id == '' || validateAddress() !== true
})

const clickInBack = () => {
    form.value.shipping_type_id = ''
    form.value.red_id = ''
    form.value.address_send = ''
    confirmAddress.value = false
    emits('back')
}
const comisiones = reactive<Comisiones>({
    groupTransaction: false,
    payFee: false,
    sendNormal: false,
    feesPriority: false,
});


const addFeesToTotalLocal = () => {
    let feesXCOP = 0;
    let feesXCOPusd = 0;
    let priceExchangeFees = 0;
    let fee = 0;
    const withFeesXCOP = generalData.value?.attributes.administrative_fee as number
    
    const currency = walletStore.currencies.find(c=> c.id === form.value.currency_id);
    const currencyTicker = walletStore.getCurrencyTickerByAbbreviation(currency?.attributes.abbreviation!);
    
    const priceUsd = currencyTicker?.trm!
    
    if(!form.value.xcop_payment){
        fee = parseFloat(form.value.fee)
        priceExchangeFees = parseFloat(form.value.fee) * parseFloat(priceUsd)
        // const feesMinerCop = parseFloat(form.value.fee) * parseFloat(priceUsd)
        // feesXCOP = withFeesXCOP + feesMinerCop;
        feesXCOPusd = withFeesXCOP / parseFloat(priceUsd)
        // feesXCOPusd += feesMinerCop
    }else{
        feesXCOP = - withFeesXCOP ;
        // priceExchangeFees = 0
        // fee = -fee
    }

    
    form.value.total_exchange_local = (parseFloat(totalExchngeOriginal) + priceExchangeFees + feesXCOP).toFixed(2)

    form.value.total_exchange_reference = (parseFloat(totalUsdOriginal) + fee + feesXCOPusd).toFixed(2)
    
}

form.value.fee = '0';
addFeesToTotalLocal()

transactionStore.feeMiner = form.value.fee

const clickInOption = (label: keyof Comisiones) => {
    for (let key in comisiones) {
        comisiones[key as keyof Comisiones] = key === label;
        if (key === label) {
            form.value.fee = checkboxes.value.find(
                (check) => check.label === label
            )!.fees;
            transactionStore.feeMiner = form.value.fee
        }
    }
};

watch(()=>form.value.fee,(nuevo) => {
    addFeesToTotalLocal()
})

watch(()=>form.value.xcop_payment,(nuevo)=>{
        addFeesToTotalLocal( )
})

interface Comisiones {
    groupTransaction: boolean;
    payFee: boolean;
    sendNormal: boolean;
    feesPriority: boolean;
}
</script>

<style scoped>
.alertError {
    background-color: #ef5da84d;
}
</style>
