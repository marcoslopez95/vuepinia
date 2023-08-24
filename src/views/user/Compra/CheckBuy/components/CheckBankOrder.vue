<template>
    <VRow>
        <VCol cols="12" class="text-primary text-center">
            <h3>Pago de compra #{{ order.attributes.tranx_no }}</h3>
        </VCol>
        <VCol cols="12" class="">
            <instructions-modal :order="order"></instructions-modal>
        </VCol>
        <VCol v-if="!$vuetify.display.xs" cols="12">
            <div
                class="w-100 alertError py-2 px-1 rounded-lg text-soft-error d-flex"
                style="gap: 15px"
            >
                <div class="text-center align-self-center">
                    <VIcon size="50" class="">
                        <svg
                            width="53"
                            height="53"
                            viewBox="0 0 53 53"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clip-path="url(#clip0_157_6393)">
                                <path
                                    d="M24.2917 33.1248H28.7084V37.5415H24.2917V33.1248ZM24.2917 15.4582H28.7084V28.7082H24.2917V15.4582ZM26.4779 4.4165C14.2879 4.4165 4.41669 14.3098 4.41669 26.4998C4.41669 38.6898 14.2879 48.5832 26.4779 48.5832C38.69 48.5832 48.5834 38.6898 48.5834 26.4998C48.5834 14.3098 38.69 4.4165 26.4779 4.4165ZM26.5 44.1665C16.7392 44.1665 8.83335 36.2607 8.83335 26.4998C8.83335 16.739 16.7392 8.83317 26.5 8.83317C36.2609 8.83317 44.1667 16.739 44.1667 26.4998C44.1667 36.2607 36.2609 44.1665 26.5 44.1665Z"
                                    fill="#EF5DA8"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_157_6393">
                                    <rect width="53" height="53" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </VIcon>
                </div>
                <div class="my-auto">
                    No recibimos transferencias virtuales a menos que tengas la
                    verificacion de identidad aprobada (KYC), la cuenta desde la
                    que transfieres debe estar a nombre tuyo de lo contrario la
                    transaccion sera rechaza y se cobrara un costo
                    administrativo del 1.4% del total de la transaccion.
                </div>
            </div>
        </VCol>
    </VRow>
    <VRow>
        <VCol cols="12" class="mx-0 px-0">
            <h3 class="text-primary text-center">
                Realizar pago y sube el comprobante de pago
            </h3>
        </VCol>
        <VCol cols="12" lg="6" class="my-6 h-100" style="height: 200px;">
            <div class=" mx-auto v-text-field__slot h-100" style="width: 300px;">
                <div class=" mt-2">
                    <VImg
                        v-if="getImageBank()"
                        :src="(getImageBank() as string)"
                        width="250px"
                        class="mx-auto"
                        cover
                    >
                    </VImg>
                    <span v-else>
                        {{
                            accountDelivery.relationships?.bank.attributes.name
                        }}
                    </span>
                </div>
                <div class="text-left mx-5 my-6 text-table font-weight-bold">
                    <span
                        >Titular:
                        {{ accountDelivery.attributes.beneficiary }}</span
                    ><br />
                    <span
                        >Número de Cuenta:
                        {{ accountDelivery.attributes.account_number }}</span
                    ><br />
                    <span
                        >Banco:
                        {{
                            accountDelivery.relationships?.bank?.attributes
                                .name ?? ""
                        }}</span
                    ><br />
                    <span
                        >Tipo de Cuenta:
                        {{
                            accountDelivery.relationships?.typeAccountBank
                                ?.attributes.name ?? ""
                        }}</span
                    ><br />
                </div>
            </div>
        </VCol>
        <VCol cols="12" lg="6" class="">
            <UploadImageComponent
                :class-input="[
                    'd-flex h-100 flex-column justify-center align-center',
                ]"
                style="height: 200px"
                v-model="comprobant"
                text="Sube tu comprobante de pago"
            ></UploadImageComponent>
        </VCol>
        <VCol
            cols="12"
            class="text-center"
            v-if="
                order.relationships?.status.id === StatusOrder.RECEIVED_ORDER 
                //|| 
                //typeof comprobant != 'string'
            "
        >
            <VBtnPrimary
                style="min-width: 170px;"
                @click="uploadVoucher"
                :disabled="!comprobant || typeof comprobant == 'string'"
            >
                Subir Comprobante
            </VBtnPrimary>
        </VCol>
    </VRow>

    <VRow
        v-if="
            order.relationships?.status.id === StatusOrder.RECEIVED_ORDER 
            // ||
            // false
        "
    >
        <div class="text-table mt-7">
            Tienes
            <CountDown :dateFinish="timeSet" @endTime="alerta"></CountDown>
            minutos para enviarnos tu comprobante de lo contrario será
            cancelada, y no podrás crear una nueva orden hasta dentro de
            <span class="text-error text-h6">30 minutos</span>
        </div>
    </VRow>
    <div class="text-center w-100 mt-10">
        <cancel-order :order="order"></cancel-order>
    </div>
</template>

<script setup lang="ts">
import CountDown from "@/components/CountDown.vue";
import DialogGlobal from "@/components/global/DialogGlobal.vue";
import { helperStore } from "@/helper";
import { TransactionStore } from "@/stores/TransactionStore";
import UploadImageComponent from "@/views/user/Kyc/components/UploadImageComponent.vue";
import { ref, computed } from "vue";
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

const router = useRouter();
const props = defineProps<{
    order: Order;
}>();

const form = reactive<OrderUploadVoucher>({
    name: "",
    order_id: props.order.id,
    vouchers: [],
});
const helper = helperStore();
const transactionStore = TransactionStore();
const openModal = ref(false);
const accountDelivery = props.order.relationships
    ?.account_delivery as BankAccount;
const alerta = () => alert("se acbo");
const comprobant = ref<Blob | string>(
    props.order.relationships!.images.length > 0 &&
        props.order.relationships?.images[0].attributes.aws_url
        ? props.order.relationships?.images[0].attributes.aws_url
        : ''
);
const timeSet = dayjs().add(30, "minute").format();

const getImageBank = (): string | false => {
    const images = accountDelivery.relationships?.bank.relationships?.images;
    if (images?.length == 0) return false;
    return images![0].attributes.aws_url ?? false;
};

const getColorBank = computed(() => {
    return accountDelivery.relationships?.bank?.attributes?.color ?? "yellow";
});

const uploadVoucher = async () => {
    const url = "order/charge/voucher";
    const data = new FormData();
    data.append("name", form.name);
    data.append("order_id", form.order_id.toString());
    data.append("vouchers[]", comprobant.value);
    await helper.http(url, "post", { data });
    helper.showNotify("Su comprobante se ha subido Satisfactoriamente");
    // setInterval(() => {
        router.push({ name: "user-transactions" });
    // }, 5000);
};
</script>

<style scoped lang="scss">
$background-color: v-bind("getColorBank");
.v-text-field__slot {
    background: linear-gradient($background-color, $background-color)
            padding-box,
        linear-gradient(
                180deg,
                rgba(2, 0, 36, 1) 0%,
                rgba(80, 67, 233, 1) 0%,
                rgba(22, 180, 229, 1) 100%
            )
            border-box;
}
</style>
