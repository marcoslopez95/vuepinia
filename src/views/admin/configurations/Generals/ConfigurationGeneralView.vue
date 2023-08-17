<template>
    <VForm validate-on="input">
        <template #default="{ isValid }">
            <div
                class="text-table d-flex flex-wrap mx-auto"
                style="max-width: 550px"
            >
                <div class="w-100">
                    <div
                        class="d-sm-flex gap-2 align-center justify-space-between"
                    >
                        <div>Tiempo inicial Venta/Compra (minutos) </div>
                        <div style="width: 150px">
                            <input-component
                                v-model="form.initial_time"
                                name="initial_time"
                                without-label
                                :rules="[validator.required]"
                                type="number"
                            ></input-component>
                        </div>
                    </div>
                    <div
                        class="d-sm-flex gap-2 align-center mt-4 justify-space-between"
                    >
                        <div>
                            Tiempo para subir comprobante Venta/Compra (minutos)
                        </div>
                        <div style="width: 150px">
                            <input-component
                                v-model="form.confirmation_time"
                                name="confirmation_time"
                                without-label
                                :rules="[validator.required]"
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
                                name="administrative_fee"
                                :rules="[validator.required]"
                                :events="eventsAdministrative"
                                without-label
                            ></input-component>
                        </div>
                    </div>
                    <div
                        class="d-sm-flex gap-2 align-center mt-4 justify-space-between"
                    >
                        <div>
                            Aplicar Fee Administrivo a montos inferiores de (COP):
                        </div>
                        <div style="width: 150px">
                            <input-component
                                v-model="form.order_fee_limit"
                                name="order_fee_limit"
                                :rules="[validator.required]"
                                :events="eventsLimit"
                                without-label
                            ></input-component>
                        </div>
                    </div>
                </div>
                <div class="w-100 text-center my-3">
                    <VBtnPrimary @click="updateGeneralConfiguration" :disabled="!(isValid.value)">
                        Guardar
                    </VBtnPrimary>
                </div>
            </div>
        </template>
    </VForm>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import { formatNumber, helperStore } from "@/helper";
import { storeToRefs } from "pinia";
import type { ConfigurationGeneralsAttributes } from "@/interfaces/ConfigurationGenerals/ConfigurationGenerals.model";
import InputComponent from "@/components/InputComponent.vue";
import { GeneralConfiguration } from "@/stores/GeneralConfiguration";
import * as validator from '@/validator'
import type { EventComponent } from "@/interfaces/Components.helper";

const helper = helperStore();
const generalConfiguration = GeneralConfiguration();
const form = reactive<ConfigurationGeneralsAttributes>({
    administrative_fee: '0',
    confirmation_time: "0",
    initial_time: "0",
    order_fee_limit: '0',
});
const { generalData } = storeToRefs(generalConfiguration);
generalConfiguration.getGeneralData().then(()=>{
    form.initial_time = generalConfiguration.generalData!.attributes.initial_time
    form.confirmation_time = generalConfiguration.generalData!.attributes.confirmation_time
    form.administrative_fee = formatNumber(parseFloat(generalConfiguration.generalData!.attributes.administrative_fee))
    form.order_fee_limit    = formatNumber(parseFloat(generalConfiguration.generalData!.attributes.order_fee_limit))
});

const updateGeneralConfiguration = async () => {
    const url = "general/configuration/1";
    const data = form;
    const res = await helper.http(url, "put", { data });
    generalConfiguration.getGeneralData();
    
};

const eventsAdministrative: EventComponent = {
    keypress: (event: any) => {
        if (!validator.keyPressIsNumber(event) && event.key != "Backscape") {
            event.preventDefault();
            return;
        }
        // amountFiat.value = amountFormat(event)
    },
    keyup: (event: any) => {
        form.administrative_fee = validator.amountFormat(event)
    }
};
const eventsLimit: EventComponent = {
    keypress: (event: any) => {
        if (!validator.keyPressIsNumber(event) && event.key != "Backscape") {
            event.preventDefault();
            return;
        }
        // amountFiat.value = amountFormat(event)
    },
    keyup: (event: any) => {
        form.order_fee_limit = validator.amountFormat(event)
    }
};
</script>

<style scoped></style>
