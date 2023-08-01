<template>
    <VBtnDanger @click="openModal = true" style="background-color: #ef5da8 !important">
        <span class="text-white">Cancelar Orden</span>
    </VBtnDanger>
    <dialog-global footer :dialog="openModal" @close-dialog="openModal = false" widthDialog="350">
        <div class="text-center">
            <VIcon :icon="QuestionIcon" size="73" color="primary">

            </VIcon>
        </div>
        <div class="text-center mt-4">
            <p class="text-h5 font-weight-bold">
                ¿Realmente desea cancelar la orden?
            </p>
        </div>

        <template #actions>
            <VRow>
                <VCol cols="6">
                    <VBtnSecondary @click="openModal = false">
                        Cancelar
                    </VBtnSecondary>
                </VCol>
                <VCol cols="6">
                    <VBtnPrimary @click="clickInCancel">
                        Aceptar
                    </VBtnPrimary>
                </VCol>
            </VRow>
        </template>
    </dialog-global>
</template>

<script setup lang="ts">
import type { Order } from "@/interfaces/Order/Order.model";
import { ref } from "vue";
import DialogGlobal from "@/components/global/DialogGlobal.vue";
import QuestionIcon from "@/assets/icons/QuestionIcon.vue";
import { helperStore } from "@/helper";
import { useRouter } from "vue-router";
const openModal = ref(false)
const props = defineProps<{
    order: Order;
}>();
const helper = helperStore()
const router = useRouter()
const clickInCancel = () => {
    const url = 'order/cancel/'+ props.order.id
    helper.http(url).then(()=> {
        helper.showNotify('Su Orden se ha cancelado')
        setInterval(()=> {
            router.push({name: 'user-profile'})
        },5000)
    })
}
</script>

<style scoped></style>
