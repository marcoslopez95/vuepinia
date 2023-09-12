<script setup lang="ts">
import { ref } from "vue";
import CardComponent from "@/views/dashboard/Dashboard/CardComponent.vue";
import { OrderTypes } from "@/enums/OrderTypes.enum";
import TransactionView from "../admin/transactions/TransactionView.vue";
import { helperStore } from "@/helper";
import { onBeforeUnmount, onBeforeMount, onMounted } from "vue";
import dayjs from "dayjs";
import GraficoTorta from "./Dashboard/GraficoTorta.vue";


const helper = helperStore();
helper.pagination.perPage = 3;


onBeforeMount(() => {
    helper.pagination.perPage = 3;
});
onBeforeUnmount(() => {
    helper.pagination.perPage = 15;
});

</script>

<template>
    <VRow class="d-flex justify-center">
        <VCol cols="12" md="4" lg="4" class="mx-auto" style="max-width: 321px">
            <CardComponent
                type="currency"
                title="Total Comprado"
                field="pesos"
                icon="moneda"
                url="/order/total/types"
                :withFilter="true"
                :type-order="OrderTypes.COMPRA"
            >
            </CardComponent>
        </VCol>
        <VCol cols="12" md="4" lg="4" class="mx-auto" style="max-width: 321px">
            <CardComponent
                type="currency"
                title="Total Vendido"
                field="pesos"
                icon="moneda"
                url="/order/total/types"
                :withFilter="true"
                :type-order="OrderTypes.VENTA"
            >
            </CardComponent>
        </VCol>
        <VCol cols="12" md="4" lg="4" class="mx-auto" style="max-width: 321px">
            <CardComponent
                url="/users/xcop/total"
                icon="xcop"
                type="currency"
                title="Xcop. Total reward"
                :withFilter="false"
                field="total"
            >
            </CardComponent>
        </VCol>
        <VCol cols="12" md="4" lg="4" class="mx-auto" style="max-width: 321px">
            <CardComponent
                url="/users/total/registers"
                icon="user"
                type="number"
                title="Usuarios Registrados"
                :withFilter="true"
                field="total"
            >
            </CardComponent>
        </VCol>
    </VRow>
    <VRow>
        <VCol cols="12">
            <TransactionView :dashboard="true" />
        </VCol>
    </VRow>
    <VRow dense>
        <VCol class="text-table mx-0 px-0" cols="12" sm="5">
            <GraficoTorta></GraficoTorta>
        </VCol>
        <VCol> </VCol>
    </VRow>
</template>
