<template>
    <InitBuy v-if="!confirmatedOrder" @click:continue="nextStep">
    </InitBuy>
    <confirm-order v-else @back="backStep" @confirmOrder="createOrder2"> </confirm-order>
    <div class="text-table mt-7">
        Tienes
        <CountDown :dateFinish="timeSet" @endTime="alerta"></CountDown> minutos
        para iniciar una orden de lo contrario será cancelada, y no podrás crear
        una nueva orden hasta dentro de
        <span class="text-error text-h6">30 minutos</span>
    </div>
    <PenaltyModal @have-penalization="(value)=> havePenalization = value" :TypePenalty="PENALTY_TYPES.COMPRA"></PenaltyModal>
</template>

<script setup lang="ts">
import CountDown from "@/components/CountDown.vue";
import { ref } from "vue";
import InitBuy from "./InitBuy.vue";
import ConfirmOrder from "./ConfirmOrder.vue";
import dayjs from "dayjs";
import { ConfirmOrderStore } from "./CompraStore";
import { helperStore } from "@/helper";
import { createPenalty } from '@/stores/PenaltyStore'
import { PENALTY_TYPES } from "@/enums/PenaltyTypes.enum";
import PenaltyModal from "../components/Penalty/PenaltyModal.vue";
import { TransactionStore } from "@/stores/TransactionStore";
import { OrderTypes } from "@/enums/OrderTypes.enum";
import { storeToRefs } from "pinia";
import { GeneralConfiguration } from "@/stores/GeneralConfiguration";

const helper = helperStore()
const generalConfiguration = GeneralConfiguration()
generalConfiguration.getGeneralData();


const confirmOrderStore = ConfirmOrderStore();
const transactionStore = TransactionStore()
const  { form } = storeToRefs(confirmOrderStore)
form.value.type = OrderTypes.COMPRA
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

const createOrder2 = () => {
    if(havePenalization.value) return
    transactionStore.showPreviewOrder = false
    form.value.administrative_fee_order = generalConfiguration.generalData?.attributes.administrative_fee as number
    confirmOrderStore.createOrder(OrderTypes.COMPRA);
    console.log('pagos', confirmOrderStore.form)
};
</script>

<style scoped></style>
