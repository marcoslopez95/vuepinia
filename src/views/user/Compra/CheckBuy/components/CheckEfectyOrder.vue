<template>
    <VRow>
        <VCol cols="12" class="text-primary text-center">
            <h3>Pago de compra #{{ order.attributes.tranx_no }}</h3>
        </VCol>
        <VCol
            cols="12"
            class="text-center"
            :class="{
                'text-success': getStatusOrder === StatusOrder.ORDER_COMPLETED,
                'text-error': getStatusOrder === StatusOrder.ORDER_CANCELED,
                'text-table':
                    getStatusOrder !== StatusOrder.ORDER_COMPLETED &&
                    getStatusOrder !== StatusOrder.ORDER_CANCELED,
            }"
        >
            <h3>
                {{ order.relationships?.status.attributes.name }}
            </h3>
        </VCol>
    </VRow>
    <VRow class="px-5">
        <VCol cols="12" sm="12" class=" text-table border-degree text-left font-22 font-weight-light" >
            <p class="">
                <span class="text-primary font-weight-light">Dirección:</span> <br>{{ accountDelivery?.attributes.description }}
            </p>
            <p>Nombre: {{ accountDelivery?.attributes.beneficiary }}</p>
            <VSpacer></VSpacer>
            <p class="mt-5">
                <span class="text-primary font-weight-light">Indicaciones:</span>
            <ul class="ml-10" style="list-style-type: decimal;">
                <li>Informar un pago para Xeler Go!.</li>
                <li>Entregar el dinero.</li>
                <li>Conservar el recibo.</li>
            </ul>
            </p>
        </VCol>
        <VCol cols="12" sm="12">
            <GoogleMap :api-key="apiGoogleKey" style="width: 100%; height: 500px;">
                <Marker :options="markerOptions" />
            </GoogleMap>
        </VCol>
    </VRow>
    <div
        class="text-center w-100 mt-10"
        v-if="getStatusOrder === StatusOrder.RECEIVED_ORDER"
    >
        <cancel-order :order="order"></cancel-order>
    </div>
</template>

<script setup lang="ts">
import { GoogleMap, Marker } from 'vue3-google-map'
import CountDown from "@/components/CountDown.vue";
import DialogGlobal from "@/components/global/DialogGlobal.vue";
import { helperStore } from "@/helper";
import { TransactionStore } from "@/stores/TransactionStore";
import UploadImageComponent from "@/views/user/Kyc/components/UploadImageComponent.vue";
import { ref, computed, toRefs } from "vue";
import type { BankAccount } from "@/interfaces/CompanyAccount/BankAccount/BankAccount.model";
import dayjs from "dayjs";
import { storeToRefs } from "pinia";
import type { Order } from "@/interfaces/Order/Order.model";
import CancelOrder from "./CancelOrder.vue";
import type { OrderUploadVoucher } from "@/interfaces/Order/Order.dto";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { StatusOrder } from "@/enums/StatusOrder.enum";
import InstructionsModal from "@/views/user/Compra/CheckBuy/components/InstructionsModal.vue";
import { OrderTypes } from "@/enums/OrderTypes.enum";
import TimelineView from "@/views/user/Timeline/TimelineView.vue";
import type { OtherAccount } from "@/interfaces/CompanyAccount/OtherAccount/OtherAccount.model";
import type { EfectyAccount } from '@/interfaces/CompanyAccount/EfectyAccount/EfectyAccount.model';

const router = useRouter();
const props = defineProps<{
    order: Order;
}>();
const { order } = toRefs(props);

const getStatusOrder = computed(
    (): StatusOrder => order.value.relationships?.status.id as StatusOrder
);
const helper = helperStore();
const center = reactive({ lat: 40.689247, lng: -74.044502 })
const markerOptions = ref({
    position: center,
    label: "L",
    title: "LADY LIBERTY"
})
const apiGoogleKey = import.meta.env.VITE_API_GOOGLE as string

const selectItem = () => {
    const item = order.value.relationships?.account_delivery as EfectyAccount
    const coordinate = item.attributes.coordinate.split(',')
    center.lat = parseFloat(coordinate[0])
    center.lng = parseFloat(coordinate[1])
}
selectItem()


const accountDelivery = order.value.relationships
    ?.account_delivery as EfectyAccount;

</script>

<style scoped lang="scss"></style>
