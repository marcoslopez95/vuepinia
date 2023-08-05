<template>
    <div v-if="order">
        <v-timeline align="start" density="compact" side="end">
            <v-timeline-item
                v-for="(item, i) in items"
                :key="i"
                fill-dot
                dot-color="white"
                density="compact"
                side="end"
            >
                <template #icon>
                    <VIcon :color="item.color" :icon="item.icon" />
                </template>
                {{ item.text }}
            </v-timeline-item>
        </v-timeline>

        <VRow
            v-if="
                order.attributes.payment_type_id ==
                PAYMENT_METHODS_AVAILABLE.EFECTY
            "
        >
            <VCol
                class="bg-sky-1 text-center"
                cols="6"
                v-for="(img, i) in comprobantes"
            >
                <h3 class="text-primary">Comprobante {{ i + 1 }}</h3>
                <VImg height="400px" width="293px" :src="img"></VImg>
            </VCol>
        </VRow>
        <div v-else class="mt-10">
            <VRow class="text-table">
                <h4 class="text-primary">Código para reclamar el pago</h4>
                <p>
                    Codigo para reclamar el pago Hemos avisado al punto de pago
                    para que preparen tu dinero, cuando llegues debes
                    proporcionar el codigo No 1, en ese momento la persona en
                    caja nos informara y te llegara un SMS y un EMAIL con el
                    codigo No2.
                </p>
                <p class="mt-6">
                    Este proceso nos garantiza que la persona indicada esta
                    recibiendo el dinero.
                </p>
            </VRow>
            <VRow>
                <VCol
                    class="d-flex justify-center align-center"
                    style="gap: 15px"
                >
                    <div class="font-weight-bold text-primary">Código #1</div>
                    <div
                        class="border-degree d-flex align-center justify-center"
                        style="width: 161px; height: 38px"
                    >
                        <span class="">123123</span>
                    </div>
                </VCol>
                <VCol
                    class="d-flex justify-center align-center"
                    style="gap: 10px"
                >
                    <div class="font-weight-bold text-primary">Código #2</div>
                    <div
                        @click="dialog = true"
                        class="cursor-pointer border-degree d-flex align-center justify-center"
                        style="width: 161px; height: 38px"
                    >
                        <span class="">_ _ _ _ _</span>
                    </div>
                </VCol>
            </VRow>

            <dialog-global
                :dialog="dialog"
                @close-dialog="dialog = false"
                class-title="text-center text-primary"
            >
                <template #title>
                    <span class="font-weight-light"
                        >Transacción: {{ order.attributes.tranx_no }}</span
                    >
                </template>
                <template #content>
                    <div class="text-center">
                        <div>
                            Ingresa el codigo que recibiste en el mensaje para
                            autorizar el pago
                        </div>
                        <!-- <div class="mx-auto" style="width: 161px;">
                            <input-component v-model="secondCode" name=""></input-component>
                        </div> -->
                        <div
                            class="mx-auto my-3 border-degree d-flex"
                            style="width: 161px; height: 38px"
                        >
                            <input
                                v-model="secondCode"
                                class="border-0 text-uppercase text-center"
                                style="width: 161px; height: 38px"
                            />
                        </div>

                        <div class="">
                            Mensaje enviado, podras solicitar otro codigo dentro
                            de <br />
                            <count-down
                                class="text-erro"
                                :date-finish="count"
                            ></count-down>
                        </div>
                        <div class="cursor-pointer text-primary mb-5">
                            No recibí el código
                        </div>
                        <div>
                            <VBtnPrimary :disabled="secondCode.length < 4">
                                Continuar
                            </VBtnPrimary>
                        </div>
                    </div>
                </template>
            </dialog-global>
        </div>
        <preview-order
            v-if="$vuetify.display.smAndDown"
            class="mx-auto mt-5"
            style="max-width: 300px"
        ></preview-order>
    </div>
    <div v-else>No existe transaction con ese numero</div>
</template>

<script setup lang="ts">
import { helperStore } from "@/helper";
import { TransactionStore } from "@/stores/TransactionStore";
import { ref } from "vue";
import dayjs from "dayjs";
import { storeToRefs } from "pinia";
import CheckIcon from "@/assets/icons/CheckIcon.vue";
import StageIcon from "@/assets/icons/StageIcon.vue";
import WithoutCheckIcon from "@/assets/icons/WithoutCheckIcon.vue";
// import ComprobanteTest from "@/assets/images/comprobrante-test.png";
import DialogGlobal from "@/components/global/DialogGlobal.vue";
import { PAYMENT_METHODS_AVAILABLE } from "@/enums/PaymentMethod.enum";
import CountDown from "@/components/CountDown.vue";
import InputComponent from "@/components/InputComponent.vue";
import PreviewOrder from "@/layouts/full/menuRight/PreviewOrder/PreviewOrder.vue";
import { watch } from "vue";

const props = defineProps<{
    numTransaction: string;
}>();

const secondCode = ref("");

watch(secondCode, (nuevo, viejo) => {
    if (nuevo.length > 4) {
        secondCode.value = viejo;
    }
});
const count = dayjs().add(6, "minutes").format("YYYY-MM-DD HH:mm:ss");
const helper = helperStore;
const transactionStore = TransactionStore();
const { order } = storeToRefs(transactionStore);
const dialog = ref(false);
transactionStore.getOrderByNum(props.numTransaction);

const alerta = () => alert("se acbo");
const comprobant = ref<Blob | "">("");
const timeSet = dayjs().add(30, "minute").format();

const comprobantes = ["/assets/images/comprobrante-test.png"];

const items = [
    {
        text: "Transacción detectada en la red",
        icon: CheckIcon,
        color: "ok-2",
    },
    {
        text: "Transacción confirmada en la red",
        icon: CheckIcon,
        color: "ok-2",
    },
    {
        text:
            "Tu pago quedará realizado en " +
            dayjs().format("DD/MM/YYYY") +
            "a las " +
            dayjs().add(5, "minutes").format("HH:mm a"),
        icon: StageIcon,
        color: "active",
    },
    {
        text: "Pago Completado",
        icon: WithoutCheckIcon,
        color: "active",
    },
];
</script>

<style scoped>
input.border-0:focus-visible {
    border: none !important;
    outline: 0px;
}
</style>
