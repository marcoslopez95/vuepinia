<template>
    <div>
        <h3 class="text-primary">Selecciona cuenta de destino</h3>
        <p class="text-table">
            Puedes seleccionar una de tus cuentas o ir a la configuración de tu perfil y agregar una nueva cuenta, la cuenta por defecto en la orden es la cuenta activa.
        </p>
    </div>
    <div>
        <SelectComponent
            name=""
            v-model="modelValue"
            :items="itemsDetails"
            item-title="attributes.name"
            item-value="id"
            @update:model-value="(value) => emits('update:model-value',value)"
        >
            <!-- <template #title="{ item }"> -->
                <!-- {{ item }} -->
                <!-- {{ titleSelect(item) }} -->
            <!-- </template> -->
        </SelectComponent>
    </div>
</template>

<script setup lang="ts">
import SelectComponent from '@/components/SelectComponent.vue';
import { helperStore } from '@/helper';
import type { BankAccountClient } from '@/interfaces/CompanyAccount/BankAccount/BankAccount.model';
import type { OtherAccountClient } from '@/interfaces/CompanyAccount/OtherAccount/OtherAccount.model';
import type { PaymentMethod } from '@/interfaces/PaymentMethod/PaymentMethod.model';
import { toRefs } from 'vue';
import { watch } from 'vue';
import { computed } from 'vue';
import { ref } from 'vue';

const emits = defineEmits<{
    (e:'update:model-value',value:number):void
}>()
const helper = helperStore()
const props = defineProps<{
    modelValue: any,
    itemsDetails: BankAccountClient[] | OtherAccountClient[]
}>()
const { modelValue } = toRefs(props)
</script>

<style scoped>

</style>