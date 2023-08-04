<template>
    <div class="d-flex justify-center align-center mb-5" style="gap: 30px">
        <div>
            <QrcodeVue value="hola" render-as="svg" :size="208"></QrcodeVue>
            <p
                style="width: 208px"
                class="font-weight-bold text-center text-table"
            >
                Click en el qr para abrir en tu wallet
            </p>
        </div>
        <div class="my-auto">
            <div>
                <div class="text-center">
                    <span class="text-primary">Cantidad a enviar</span>
                </div>
                <div
                    :style="[
                        $vuetify.display.mdAndDown
                            ? 'width:300px'
                            : 'width:357px',
                    ]"
                    class="v-text-field__slot py-1 d-flex align-center justify-space-between px-3"
                >
                    <div></div>
                    <div class="text-table">
                        {{ form.amount_currency }}
                    </div>
                    <div class="">
                        <VIcon :icon="CopyIcon" size="20" />
                    </div>
                </div>
            </div>
            <div class="mt-6">
                <div class="text-center">
                    <span class="text-primary"
                        >Enviar los BTC a la siguiente direccion</span
                    >
                </div>
                <div
                    :style="[
                        $vuetify.display.mdAndDown
                            ? 'width:300px'
                            : 'width:357px',
                    ]"
                    class="v-text-field__slot py-1 d-flex align-center justify-space-between px-3"
                >
                    <div></div>
                    <div class="text-table">
                        {{ form.address_send }}
                    </div>
                    <div class="">
                        <VIcon :icon="CopyIcon" size="20" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div
        class="w-100 alertError py-1 px-1 rounded-lg text-soft-error d-flex align-center"
        style="gap: 5px"
    >
        <div class="text-center align-self-center">
            <VIcon size="50" :icon="InformationIconLight" />
        </div>
        <div>
            Envia UNICAMENTE Bitcoin (BTC) a esta direccion usando la red nativa
            de bitcoin
        </div>
    </div>
    <p class="text-table my-5">
        Segun la congestion de la cadena de bloques y para garantizar una
        transaccion exitosa recomendamos enviar con una comision de mineros de
        <span class="text-primary">102 sat/byte</span>
    </p>
    <p class="text-soft-error">
        Nuestro sistema solo detecta una transaccion, si tienes fondos en
        diferentes billeteras te recomendamos agruparlos y luego hacer un solo
        envio.
    </p>
</template>

<script setup lang="ts">
import SelectComponent from "@/components/SelectComponent.vue";
import InputComponent from "@/components/InputComponent.vue";
import { ref } from "vue";
import { reactive } from "vue";
import { storeToRefs } from "pinia";
import { addressValid } from "@/validator";
import { WalletStore } from "@/stores/WalletStore";
import { helperStore } from "@/helper";
import WalletIcon from "@/assets/icons/WalletIcon.vue";
import SelectWallet from "./ConfirmOrder/SelectWallet.vue";
import { computed } from "vue";
import { TransactionStore } from "@/stores/TransactionStore";
import PreviewOrderForConfirm from "@/layouts/full/menuRight/PreviewOrder/PreviewOrderForConfirm.vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import QrcodeVue from "qrcode.vue";
import CopyIcon from "@/assets/icons/CopyIcon.vue";
import InformationIconLight from "@/assets/icons/InformationIconLight.vue";
import { ConfirmOrderStore } from "../Compra/CompraStore";

const { smAndDown } = useDisplay();
const transactionStore = TransactionStore();
const modalSelectWallet = ref(false);
const helper = helperStore();
const { formRef } = storeToRefs(helper);
const walletStore = WalletStore();
const confirmOrderStore = ConfirmOrderStore();
const { shippingType, form, networkTypes } = storeToRefs(confirmOrderStore);
const { getShippingTypes } = confirmOrderStore;

confirmOrderStore.getNetworkTypes();
const emitConfirmOrder = async () => {
    const { valid } = await formRef.value.validate();
    console.log("valido", valid);
    if (!valid) return;
    // return
    emits("confirmOrder");
};

const validateAddress = () => {
    const currency = walletStore.currencies.find(
        (currencyIterable) => currencyIterable.id === form.value.currency_id
    )!;

    return addressValid(
        form.value.address_send!,
        currency.attributes.abbreviation
    );
};
const emits = defineEmits<{
    (e: "confirmOrder"): void;
    (e: "back"): void;
}>();
getShippingTypes();
const confirmAddress = ref(false);

const disabledButton = computed((): boolean => {
    return (
        !confirmAddress.value ||
        form.value.shipping_type_id == "" ||
        form.value.red_id == "" ||
        validateAddress() !== true
    );
});

const clickInBack = () => {
    form.value.shipping_type_id = "";
    form.value.red_id = "";
    form.value.address_send = "";
    confirmAddress.value = false;
    emits("back");
};
const comisiones = reactive<Comisiones>({
    groupTransaction: false,
    payFee: false,
    sendNormal: true,
    feesPriority: false,
});

form.value.fee = "11";
transactionStore.feeMiner = form.value.fee;
const checkboxes: Checkboxes[] = [
    {
        label: "groupTransaction",
        text: ` <span class="text-primary font-weight-bold">Agrupar</span> mi transaccion con otras de esta manera se paga una
                comision mas alta por todas y esto hace que se confirme mas
                rapido el tiempo de espera es de (1-3 horas).`,
        fees: "5",
    },
    {
        label: "payFee",
        text: ` <span class="text-primary font-weight-bold">Pagar</span> una comision normal de 0.00001536 BTC equivalentes a -
                (0.31 USD) con esta opcion es mas probable tener una
                confirmacion mas rapido.`,
        fees: "10",
    },
    {
        label: "sendNormal",
        text: ` <span class="text-primary font-weight-bold">Enviar</span> mi transaccion inmediatamente con la comision que xeler
                puede asumir entiendo que no hay tiempo estimado de confirmacion
                pueden ser varias horas.`,
        fees: "11",
    },
    {
        label: "feesPriority",
        text: ` <span class="text-primary font-weight-bold">Pagar</span> una comision de envio prioritario de 0.00015 BTC
                equivalentes a (3 USD) esta opcion el envio se envia con la
                comision mas alta posible para ser confirmado en diez minutos o
                maximo 20.`,
        fees: "15",
    },
];

const clickInOption = (label: keyof Comisiones) => {
    for (let key in comisiones) {
        comisiones[key as keyof Comisiones] = key === label;
        if (key === label) {
            form.value.fee = checkboxes.find(
                (check) => check.label === label
            )!.fees;
            transactionStore.feeMiner = form.value.fee;
        }
    }
};

interface Checkboxes {
    label: keyof Comisiones;
    text: string;
    fees: string;
}

interface Comisiones {
    groupTransaction: boolean;
    payFee: boolean;
    sendNormal: boolean;
    feesPriority: boolean;
}
</script>

<style scoped lang="scss">
.alertError {
    background: rgba(197, 48, 164, 0.11);
}

.inputCopy {
    width: 300px;
}
@media (width >= 1280) {
    .inputCopy {
        width: 357px;
    }
}
</style>
