<template>
    <div v-if="order">
        <confirm-order 
            v-if="
                order.relationships?.status.id != StatusOrder.ORDER_COMPLETED 
                &&
                order.relationships?.status.id != StatusOrder.ORDER_CANCELED
            "
            :order="order!">
            </confirm-order> 
        <timeline-view :order="order"></timeline-view>
    </div>
    <div v-else>No existe transaction con ese numero</div>
</template>

<script setup lang="ts">
import { helperStore } from "@/helper";
import TimelineView from "../../Timeline/TimelineView.vue";
import { TransactionStore } from "@/stores/TransactionStore";
import { ref } from "vue";
import dayjs from "dayjs";
import ConfirmOrder from "./../ConfirmOrder.vue";
import { storeToRefs } from "pinia";
import { StatusOrder } from "@/enums/StatusOrder.enum";
const props = defineProps<{
    numTransaction: string;
}>();

const helper = helperStore;
const transactionStore = TransactionStore();
const { order } = storeToRefs(transactionStore)
const openModal = ref(false)
transactionStore.getOrderByNum(props.numTransaction);

const alerta = () => alert("se acbo");
const comprobant = ref<Blob | "">("");
const timeSet = dayjs().add(30, "minute").format();
</script>

<style scoped></style>
