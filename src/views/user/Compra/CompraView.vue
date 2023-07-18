<template>
    <InitBuy v-if="!confirmatedOrder" @click:continue="confirmatedOrder = true">
    </InitBuy>
    <confirm-order v-else @confirmOrder="createOrder2"> </confirm-order>
    <div class="text-table mt-7">
        Tienes
        <CountDown :dateFinish="timeSet" @endTime="alerta"></CountDown> minutos
        para iniciar una orden de lo contrario será cancelada, y no podrás crear
        una nueva orden hasta dentro de
        <span class="text-error text-h6">30 minutos</span>
    </div>
</template>

<script setup lang="ts">
import CountDown from "@/components/CountDown.vue";
import { ref } from "vue";
import InitBuy from "./InitBuy.vue";
import ConfirmOrder from "./ConfirmOrder.vue";
import dayjs from "dayjs";
import { ConfirmOrderStore } from "./CompraStore";

const confirmOrderStore = ConfirmOrderStore();

const confirmatedOrder = ref(false);
const alerta = () => alert("se acbo");
const timeSet = dayjs().add(5, "minute").format();

const createOrder2 = () => {
    alert("Confirmado!");
    confirmOrderStore.createOrder();
    // console.log('pagos', confirmOrderStore.form)
};
</script>

<style scoped></style>
