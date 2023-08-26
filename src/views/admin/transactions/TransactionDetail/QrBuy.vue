<template>
    <div :class="$vuetify.display.mdAndDown ? '' :'border-degree'">
        <div class="my-4 d-flex justify-center align-center gap-2 flex-column flex-lg-row">
            <QrcodeVue
                class="order-1 order-lg-0"
                foreground="#5043E8"
                :value="getDataForQr()"
                render-as="svg"
                :size="$vuetify.display.mdAndDown ? 217 : 130"
            >
            </QrcodeVue>
            <div class="order-0 order-lg-1" :class="$vuetify.display.mdAndDown ? 'my-4':''">
                <btn-with-modal-component
                    :icon="QuestionIcon"
                    text-btn="Desembolso"
                    color-btn="success"
                    :props-btn="{
                        class: 'w-100 mb-3',
                    }"
                    color-icon="warning"
                    title-modal="¿Realmente quiere hacer un desembolso?"
                    btn-modal="Sí"
                >
                    <template #btn>
                        <span class="text-white">Desembolso</span>
                    </template>
                </btn-with-modal-component>

                <VBtnDangerT color="primary" @click="modalExternalPayment = true">
                    Desembolso Externo
                </VBtnDangerT>
            </div>
        </div>
    </div>

    <dialog-global 
        :dialog="modalExternalPayment" 
        @close-dialog="modalExternalPayment = false"
        width-dialog="300"
    >
        <div class="text-center">
            <input-component v-model="txid" name="Ingresa el tx id">
                <template #label>
                    <span class="font-weight-bold text-table">Ingresa el tx id</span>
                </template>
            </input-component>
        </div>
        <div class="text-center my-3">
            <VBtnPrimary :disabled="!txid" @click="accepOrder">
                Enviar
            </VBtnPrimary>
        </div>
    </dialog-global>
</template>

<script setup lang="ts">
import { TransactionStore } from "@/stores/TransactionStore";
import InputComponent from "@/components/InputComponent.vue";
import DialogGlobal from "@/components/global/DialogGlobal.vue";
import { storeToRefs } from "pinia";
import QrcodeVue from "qrcode.vue";
import BtnWithModalComponent from "@/components/BtnWithModalComponent.vue";
import QuestionIcon from "@/assets/icons/QuestionIcon.vue";
import { ref } from "vue";
import { helperStore } from "@/helper";

const helper = helperStore()
const transactionStore = TransactionStore();
const { order } = storeToRefs(transactionStore);
const emits = defineEmits<{(e:'external-pay'):void}>()
const getDataForQr = () => {
    return transactionStore.getDataForQr(
        order.value?.relationships?.currency.attributes.name!,
        order.value?.attributes.address_send!,
        order.value?.attributes.amount_currency as string
    );
};

const modalExternalPayment = ref(false)
const txid = ref('')
const accepOrder = async () => {
    try{
        const url = 'order/external/accept/deposit'
        const data = {
            order_id : order.value?.id,
            txid: txid.value
        }
        await helper.http(url,'post',{data})
        modalExternalPayment.value = false
        emits('external-pay')
    }catch(e) {

    }
}
</script>

<style scoped></style>
