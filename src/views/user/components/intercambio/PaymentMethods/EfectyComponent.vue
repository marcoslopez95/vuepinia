<template>
    <div>

        <VRow>
            <VCol cols="4" v-for="efectyAccount, i in (itemsDetails as EfectyAccount[])" :key="i"
                @click="selectItem(efectyAccount)">
                <VBtnDegree rounded="lg" :class="{
                    'payment-selected': efectyAccount.id == modelValue?.id
                }" color="primary">
                    <template #prepend>
                        <VIcon icon="mdi-map-marker" size="28"></VIcon>
                    </template>
                    {{ efectyAccount.attributes.location }}
                </VBtnDegree>
            </VCol>
        </VRow>

        <VRow v-if="itemSelect" class="px-5">
            <VCol cols="12" sm="6" class="font-weight-bold text-table">
                <p>Dirección: {{ itemSelect?.attributes.description }}</p>
                <p>Nombre: {{ itemSelect?.attributes.beneficiary }}</p>
                <VSpacer></VSpacer>
                <p>Indicaciones:
                <ul class="ml-10">
                    <li>Informar un pago para Xeler Go!.</li>
                    <li>Entregar el dinero.</li>
                    <li>Conservar el recibo.</li>
                </ul>
                </p>
            </VCol>
            <VCol cols="12" sm="6">
                <GoogleMap :api-key="apiGoogleKey" style="width: 100%; height: 500px;">
                    <Marker :options="markerOptions" />
                </GoogleMap>
            </VCol>
        </VRow>
    </div>
</template>

<script setup lang="ts">
import { GoogleMap, Marker } from 'vue3-google-map'
import type { EfectyAccount } from '@/interfaces/CompanyAccount/EfectyAccount/EfectyAccount.model';
import { computed } from 'vue';
import { ref } from 'vue';
import { reactive } from 'vue';
const { modelValue } = defineProps<{
    itemsDetails: any
    modelValue: any
}>()

const apiGoogleKey = 'AIzaSyB819UUrxog6lwdzP8kvKkEAzevC4kLZp4'
const center = reactive({ lat: 40.689247, lng: -74.044502 })
const markerOptions = ref({
    position: center,
    label: "L",
    title: "LADY LIBERTY"
})
const emits = defineEmits<{
    (e: 'update:model-value', value: EfectyAccount): void
}>()

const selectItem = (item: EfectyAccount) => {
    emits('update:model-value', item)
    const coordinate = item.attributes.coordinate.split(',')
    center.lat = parseFloat(coordinate[0])
    center.lng = parseFloat(coordinate[1])
    itemSelect.value = item
}
const itemSelect = ref<EfectyAccount | null>(null)
</script>


<style scoped>
.v-text-field__slot.payment-selected {
    background: none;
}

.payment-selected {
    color: white !important;
}
</style>