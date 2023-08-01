<template>
    <div v-if="order">
        <CheckBankOrder :order="order!"></CheckBankOrder>
    </div>
    <div v-else>No existe transaction con ese numero</div>
</template>

<script setup lang="ts">
import { helperStore } from "@/helper";
import { TransactionStore } from "@/stores/TransactionStore";
import { ref } from "vue";
import dayjs from "dayjs";
import CheckBankOrder from "./components/CheckBankOrder.vue";
import { storeToRefs } from "pinia";
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
