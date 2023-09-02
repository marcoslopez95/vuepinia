<template>
    <div v-if="order">
        <confirm-order 
            v-if="
                order.relationships?.status.id == StatusOrder.RECEIVED_ORDER
            "
            :order="order!">
            </confirm-order> 
        <timeline-view v-else :order="order"></timeline-view>
        
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
import usePusher from "@/pusher";
import { onMounted } from "vue";
import { onUnmounted } from "vue";

const props = defineProps<{
    numTransaction: string;
}>();

const helper = helperStore;
const transactionStore = TransactionStore();
const { order } = storeToRefs(transactionStore)
const openModal = ref(false)
const message = ref<usePusher>()
const message2 = ref<usePusher>()
const p1 = ref()
const p2 = ref()
transactionStore.getOrderByNum(props.numTransaction).then(()=>{

    console.log('12')
    p1.value = new usePusher(`private-orders.${order.value!.id}`,'App\Events\orderStatusEvent',(data:any) => {
        console.log('nuevo orderStatusEvent',data)
        message.value = data
    })
    p2.value = new usePusher(`private-orders.${order.value!.id}`,'App\Events\orderStatusChangeEvent',(data:any) => {
        console.log('nuevo orderStatusChangeEvent',data)
        message2.value = data
    })
});

const alerta = () => alert("se acbo");
const comprobant = ref<Blob | "">("");
const timeSet = dayjs().add(30, "minute").format();

onUnmounted(()=> {
    p1.value.unMounted()
    p2.value.unMounted()
})

</script>

<style scoped></style>
