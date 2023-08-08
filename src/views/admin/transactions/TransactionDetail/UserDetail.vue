<template>
    <div class="border-degree px-3 py-2" style="font-size:22px;max-width: 421px">
            <div class="text-center text-table">
                <span class="text-primary mr-5">Usuario: </span>
                <span> {{ getFullName(order?.relationships?.user!) }}</span>
            </div>
        <div class="d-flex justify-space-around">
            <div class="d-flex align-center cursor-pointer">
                <VIcon :icon="MessageBubbleIcon" /> Sms
            </div>
            <div class="d-flex align-center cursor-pointer">
                <VIcon :icon="SoportIcon" /> Chat
            </div>
            <div class="d-flex align-center cursor-pointer">
                <VIcon :icon="MessageIcon" /> Mensaje
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import MessageBubbleIcon from "@/assets/icons/MessageBubbleIcon.vue";
import MessageIcon from "@/assets/icons/MessageIcon.vue";
import SoportIcon from "@/assets/icons/SoportIcon.vue";
import { TransactionStore } from "@/stores/TransactionStore";
import HuellaIcon from "@/assets/icons/HuellaIcon.vue";
import { OrderTypes } from "@/enums/OrderTypes.enum";
const transactionStore = TransactionStore();
const { order } = storeToRefs(transactionStore);
import dayjs from "dayjs";
import { getFullName } from "@/helper";
</script>

<style scoped lang="scss">
</style>
