<script setup lang="ts">
import { ref } from "vue";
import CardComponent from "@/views/dashboard/Dashboard/CardComponent.vue";
import { OrderTypes } from "@/enums/OrderTypes.enum";
</script>

<template>
    <VRow class="d-flex justify-center">
        <VCol cols="12" md="4" lg="4" class="mx-auto" style="max-width: 321px;">
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
        <VCol cols="12" md="4" lg="4" class="mx-auto" style="max-width: 321px;">
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
        <VCol cols="12" md="4" lg="4" class="mx-auto" style="max-width: 321px;">
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
        <VCol cols="12" md="4" lg="4"  class="mx-auto" style="max-width: 321px;">
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
</template>
