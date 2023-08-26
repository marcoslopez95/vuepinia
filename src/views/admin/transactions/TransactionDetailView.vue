<template>
    <div v-if="!numTransaction || !order">
        No existe transaction con ese numero
    </div>
    <div v-else>
        <VRow class="d-flex align-center" :class="$vuetify.display.mdAndDown ? 'justify-center':''">
            <div class="text-18 font-weight-bold text-table" >
                Detalles transacción:
                <span class="text-primary">{{
                    order?.attributes.tranx_no
                }}</span>
            </div>
            <div class="text-center ml-6" v-if="!verifyOrderCompleted && $vuetify.display.lgAndUp">
                
                <BtnWithModalComponent
                    :color-btn="(order!.attributes.processed_by) ? 'warning' :'primary'"
                    :text-btn="(order!.attributes.processed_by) ? 'Ceder Orden' :'Tomar Transacción'"
                    :title-modal="(order!.attributes.processed_by) ? '¿Quieres ceder esta orden?' :'¿Quieres tomar esta orden?'"
                    :icon="QuestionIcon"
                    :color-icon="(order!.attributes.processed_by) ? 'warning' : 'primary'"
                    :btn-modal="(order!.attributes.processed_by) ? 'Sí, cederla' : 'Sí, tomarla'"
                    @click:btn-modal="
                        order!.attributes.processed_by
                            ? releasseOrder()
                            : takeOrder()
                    "
                />
            </div>
        </VRow>
        <VRow dense v-if="!$vuetify.display.mdAndDown">
            <VCol />
            <VCol class="d-flex justify-center text-table font-weight-bold">
                <div
                    class="cursor-pointer d-flex align-center"
                    @click="showDetailPayment = !showDetailPayment"
                >
                    <VIcon
                        :class="showDetailPayment ? '' : 'rotate-270'"
                        :icon="SelectIcon"
                    />
                    <span>Mostrar Detalle</span>
                </div>
            </VCol>
        </VRow>
        <VRow>
            <VCol :cols="$vuetify.display.mdAndDown ? 12: 6">
                <div class="mx-auto" style="max-width: 421px">
                    <general-detail></general-detail>
                    <div class="text-center ml-6 mt-3" v-if="!verifyOrderCompleted && $vuetify.display.mdAndDown">
                        <BtnWithModalComponent
                            :color-btn="(order!.attributes.processed_by) ? 'warning' :'primary'"
                            :text-btn="(order!.attributes.processed_by) ? 'Ceder Orden' :'Tomar Transacción'"
                            :title-modal="(order!.attributes.processed_by) ? '¿Quieres ceder esta orden?' :'¿Quieres tomar esta orden?'"
                            :icon="QuestionIcon"
                            :color-icon="(order!.attributes.processed_by) ? 'warning' : 'primary'"
                            :btn-modal="(order!.attributes.processed_by) ? 'Sí, cederla' : 'Sí, tomarla'"
                            @click:btn-modal="
                                order!.attributes.processed_by
                                    ? releasseOrder()
                                    : takeOrder()
                            "
                        />
                    </div>
                    <user-detail class="mt-3"></user-detail>
                    <UploadImageComponent
                        v-if="order.attributes.type == OrderTypes.VENTA"
                        :sizeImage="421"
                        style="width: 421px"
                        text="Subir comprobante de pago"
                        v-model="voucher"
                    />
                    <div class="my-5" />
                    <detail-account-sell v-if="order.attributes.type == OrderTypes.COMPRA"  />
                </div>
            </VCol>
            <VCol v-if="$vuetify.display.mdAndDown" cols="12" class="d-flex justify-center text-table font-weight-bold">
                <div
                    class="cursor-pointer d-flex align-center"
                    @click="showDetailPayment = !showDetailPayment"
                >
                    <VIcon
                        :class="showDetailPayment ? '' : 'rotate-270'"
                        :icon="SelectIcon"
                    />
                    <span>Mostrar Detalle</span>
                </div>
            </VCol>
            <VCol :cols="$vuetify.display.mdAndDown ? 12: 6">
                
                <div
                    class="mx-auto"
                    v-if="showDetailPayment"
                    style="max-width: 400px"
                >
                    <PaymentDetail />
                    <div class="my-5" />
                    <CronometerComponent
                        v-if="order.attributes.type == OrderTypes.VENTA"
                        :cronP="order.attributes.estimated_time"
                    />
                    <div class="my-5" />
                    <detail-account-sell v-if="order.attributes.type == OrderTypes.VENTA" />
                    <div class="my-5" />
                    <amount-detail v-if="order.attributes.type == OrderTypes.VENTA"></amount-detail>
                    <div class="my-5" />
                    <qr-buy v-if="verifyOrderTakeForUserAuth && !verifyOrderCompleted" @external-pay="giveExternal"></qr-buy>
                </div>
            </VCol>
        </VRow>
       
        <VRow v-if="!verifyOrderCompleted">
            <VCol>
                <div
                    class="text-center"
                    v-if="order.attributes.type == OrderTypes.VENTA"
                >
                    <VBtnSecondary
                        :disabled="voucher == ''"
                        @click="uploadVoucher"
                    >
                        Subir Comprobante
                    </VBtnSecondary>
                </div>
            </VCol>
            <VCol>
                <div class="text-center" v-if="verifyOrderTakeForUserAuth">
                    <BtnWithModalComponent
                        v-if="order.attributes.type == OrderTypes.VENTA"
                        color-btn="primary"
                        text-btn="Autorizar Pago"
                        title-modal="¿Desear Autorizar este pago?"
                        :icon="QuestionIcon"
                        color-icon="warning"
                        btn-modal="Sí, Aturizo"
                        @click:btn-modal="accept"
                    />
                    <BtnWithModalComponent
                        only-modal
                        v-model="openSuccess"
                        title-modal="¡Bien Hecho!"
                        text-modal="orden aceptada con éxito"
                        :icon="CheckIcon"
                        color-icon="ok-3"
                    />
                </div>
            </VCol>
        </VRow>
    </div>
</template>

<script setup lang="ts">
import { TransactionStore } from "@/stores/TransactionStore";
import { storeToRefs } from "pinia";
import GeneralDetail from "./TransactionDetail/GeneralDetail.vue";
import UserDetail from "@/views/admin/transactions/TransactionDetail/UserDetail.vue";
import UploadImageComponent from "@/views/user/Kyc/components/UploadImageComponent.vue";
import SelectIcon from "@/assets/icons/SelectIcon.vue";
import PaymentDetail from "@/views/admin/transactions/TransactionDetail/PaymentDetail.vue";
import CronometerComponent from "@/views/admin/transactions/TransactionDetail/CronometerComponent.vue";
import DetailAccountSell from "./TransactionDetail/DetailAccountSell.vue";
import { reactive } from "vue";
import { computed } from "vue";
import { ref } from "vue";
import AmountDetail from "./TransactionDetail/AmountDetail.vue";
import { getUserAuth, helperStore, itemHaveImages } from "@/helper";
import { onMounted } from "vue";
import { watch } from "vue";
import BtnWithModalComponent from "@/components/BtnWithModalComponent.vue";
import QuestionIcon from "@/assets/icons/QuestionIcon.vue";
import CheckIcon from "@/assets/icons/CheckFilledIcon.vue";
import { StatusOrder } from "@/enums/StatusOrder.enum";
import { OrderTypes } from "@/enums/OrderTypes.enum";
import QrBuy from "./TransactionDetail/QrBuy.vue";
const props = defineProps<{
    numTransaction: string;
}>();
const takeOrRelease = reactive({
    "color-btn": "primary",
    "text-btn": "Tomar Transacción",
    "title-modal": "¿Quieres tomar esta orden?",
    icon: QuestionIcon,
    "color-icon": "primary",
    "btn-modal": "Sí, tomarla",
});
const helper = helperStore();
const transactionStore = TransactionStore();
const { order } = storeToRefs(transactionStore);

const getOrder = () => transactionStore.getOrderByNum(props.numTransaction)

getOrder();
const voucher = ref<Blob | string>("");
const showDetailPayment = ref(true);

const takeOrder = async () => {
    await transactionStore.takeOrder(order.value!.id);
    getOrder();

};

const releasseOrder = async () => {
    await transactionStore.releaseOrder(order.value!.id);
    getOrder();

};

watch(order, (nuevo) => {
    if (nuevo) {
        const image = itemHaveImages(order.value?.relationships?.images);
        voucher.value = image === false ? "" : image;
    }
});

const uploadVoucher = async () => {
    const url = "order/charge/voucher";
    const data = new FormData();
    data.append("order_id", order.value!.id.toString());
    data.append("vouchers[]", voucher.value as Blob);
    await helper.http(url, "post", { data });
};

const verifyOrderTakeForUserAuth = computed(() => {
    const proccess_by = order.value?.attributes.processed_by;
    return proccess_by == getUserAuth().id;
});

const verifyOrderCompleted = computed(() => {
    return order.value?.relationships?.status.id == StatusOrder.ORDER_COMPLETED;
});

const openSuccess = ref(false);
const accept = async () => {
    const url = "order/accept/" + order.value?.id;
    await helper.http(url, "get").then(() => (openSuccess.value = true));
    getOrder();

};

const giveExternal = () => {
    openSuccess.value = true
    getOrder();
}
</script>

<style scoped></style>
