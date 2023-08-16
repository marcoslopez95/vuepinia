<template>
    <div class="text-table d-flex flex-wrap mx-auto" style="max-width: 500px">
        <div class="w-100">
            <div class="d-sm-flex gap-2 align-center justify-space-between">
                <div>Tiempo inicial para Venta/Compra</div>
                <div style="width: 150px">
                    <input-component
                        v-model="form.initial_time"
                        name=""
                        without-label
                    ></input-component>
                </div>
            </div>
            <div
                class="d-sm-flex gap-2 align-center mt-4 justify-space-between"
            >
                <div>Tiempo para subir comprobante para Venta/Compra</div>
                <div style="width: 150px">
                    <input-component
                        v-model="form.confirmation_time"
                        name=""
                        without-label
                    ></input-component>
                </div>
            </div>
        </div>
        <div class="w-100">
            <div
                class="d-sm-flex gap-2 align-center mt-4 justify-space-between"
            >
                <div>Fees administrativo (COP)</div>
                <div style="width: 150px">
                    <input-component
                        v-model="form.administrative_fee"
                        name=""
                        without-label
                    ></input-component>
                </div>
            </div>
            <div
                class="d-sm-flex gap-2 align-center mt-4 justify-space-between"
            >
                <div>Aplicar Fee Administrivo a montos inferiores de:</div>
                <div style="width: 150px">
                    <input-component
                        v-model="form.order_fee_limit"
                        name=""
                        without-label
                    ></input-component>
                </div>
            </div>
        </div>
        <div class="w-100 text-center my-3" >
            <VBtnPrimary @click="updateGeneralConfiguration">
                Guardar
            </VBtnPrimary>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import { helperStore } from "@/helper";
import { storeToRefs } from "pinia";
import type { ConfigurationGeneralsAttributes } from "@/interfaces/ConfigurationGenerals/ConfigurationGenerals.model";
import InputComponent from "@/components/InputComponent.vue";
import { GeneralConfiguration } from "@/stores/GeneralConfiguration";

const helper = helperStore();
const generalConfiguration = GeneralConfiguration();
const form = reactive<ConfigurationGeneralsAttributes>({
    administrative_fee: 0,
    confirmation_time: "0",
    initial_time: "0",
    order_fee_limit: 0,
});
const { generalData } = storeToRefs(generalConfiguration);
generalConfiguration.getGeneralData();

const updateGeneralConfiguration = async () => {
    const url = 'general/configuration/1'
    const data = form
    const res = await helper.http(url, 'put', { data })
    generalConfiguration.getGeneralData()
}
</script>

<style scoped></style>
