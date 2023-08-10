<template>
    <InitBuy @click:continue="createOrder2">
    </InitBuy>
    <div class="text-table mt-7">
        Tienes
        <CountDown :dateFinish="timeSet" @endTime="alerta"></CountDown> minutos
        para iniciar una orden de lo contrario será cancelada, y no podrás crear
        una nueva orden hasta dentro de
        <span class="text-error text-h6">30 minutos</span>
    </div>
    <PenaltyModal @have-penalization="(value)=> havePenalization = value" :TypePenalty="PENALTY_TYPES.VENTA"></PenaltyModal>
</template>

<script setup lang="ts">
import CountDown from "@/components/CountDown.vue";
import { ref } from "vue";
import InitBuy from "./InitSell.vue";
import dayjs from "dayjs";

import { helperStore } from "@/helper";
import { createPenalty } from '@/stores/PenaltyStore'
import { PENALTY_TYPES } from "@/enums/PenaltyTypes.enum";
import PenaltyModal from "../components/Penalty/PenaltyModal.vue";
import { TransactionStore } from "@/stores/TransactionStore";
import { ConfirmOrderStore } from "../Compra/CompraStore";
import { storeToRefs } from "pinia";
import { OrderTypes } from "@/enums/OrderTypes.enum";

const helper = helperStore()
const confirmOrderStore = ConfirmOrderStore();
const  { form } = storeToRefs(confirmOrderStore)
form.value.type = OrderTypes.VENTA
// form.value.shipping_type_id = 1
const transactionStore = TransactionStore()
transactionStore.showPreviewOrder = false;
const backStep = () => {
    confirmatedOrder.value = false
    transactionStore.showPreviewOrder = false
}
const nextStep = () => {
    confirmatedOrder.value = true
    transactionStore.showPreviewOrder = true
}
const confirmatedOrder = ref(false);
const havePenalization = ref(false);

const alerta = () => {
    createPenalty(PENALTY_TYPES.COMPRA)
};
const timeSet = dayjs().add(30, "minutes").format();

const createOrder2 = async () => {
    if(havePenalization.value) return
    await confirmOrderStore.getAddressSendForSell()
    form.value.address_send = confirmOrderStore.addressSendForSell
    confirmOrderStore.createOrder(OrderTypes.VENTA);
    console.log('pagos', confirmOrderStore.form)
};
</script>

<style scoped></style>
