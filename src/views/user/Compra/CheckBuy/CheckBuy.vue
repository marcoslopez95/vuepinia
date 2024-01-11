<template>
    <div v-if="order">
        <Component :is="typeOrderComponent" :order="order!"></Component>
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
import { computed } from "vue";
import { PAYMENT_METHODS_AVAILABLE } from "@/enums/PaymentMethod.enum";
import CheckOtherOrder from "./components/CheckOtherOrder.vue";
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

const typeOrderComponent = computed(()=> {
    switch(order.value?.relationships?.payment.id){
        case PAYMENT_METHODS_AVAILABLE.BANK:
            return CheckBankOrder
        case PAYMENT_METHODS_AVAILABLE.OTHER:
            return CheckOtherOrder
        default:
            return false
    }
})
</script>

<style scoped></style>
