<template>
    <div class="d-flex justify-space-between flex-column flex-sm-row mb-8">
        <SearchInputComponentVue v-model="search" @onSearch="getSearch" />
        <div>
            <VBtn @click="openModal" prepend-icon="mdi-plus" class="rounded-xl">
                {{ $t('buttons.add') }}
            </VBtn>
        </div>
    </div>

    <CrudComponent singular="Deposito Externo" :rows="rows"></CrudComponent>
    <TableComponentVue
    optionsHabilit
    icon-update
    icon-delete
    icon-show
    @show="openUpdate"
    :headers="headers"
    @update="openUpdate"
    :items="helper.items"
    >
        <template #cel-fec_pay="{data}">
            <!-- {{ typeof data.attributes.fec_pay }} -->
            <span v-if="(typeof data.attributes.fec_pay == 'string')">{{ dayjs(data.attributes.fec_pay).format('YYYY-MM-DD') }}</span>
        </template>
        <template #cel-total_exchange_local="{data}">
            {{ formatNumber(parseFloat(data.attributes.total_exchange_local)) }}
        </template>
        <template #cel-received_amount="{data}">
            {{ formatNumber(parseFloat(data.attributes.received_amount)) }}
        </template>
    </TableComponentVue>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CrudComponent from '@/components/global/CrudComponentExternalDeposit.vue';
import TableComponentVue from '@/components/global/TableComponent.vue';
import { formatCrypoAmount, formatNumber, formatNumberStringToNumber, helperStore } from '@/helper';
import type { Row } from '@/interfaces/FormComponent.helper';
import type { Head } from '@/interfaces/TableComponent.helper';
import { storeToRefs} from 'pinia';
import { useI18n } from 'vue-i18n';
import SearchInputComponentVue from '@/components/global/SearchInputComponent.vue';
import * as validator from '@/validator'
import { ExternalDeposit as ExternalDepositStore } from '@/stores/ExternalDepositStore';
import type{ ExternalDeposit } from '@/interfaces/ExternalDeposit/ExternalDeposit.model'
import type{ ExternalDepositUpdate } from '@/interfaces/ExternalDeposit/ExternalDeposit.dto'
import dayjs from 'dayjs';
import type { EventComponent } from '@/interfaces/Components.helper';
const helper = helperStore()
helper.url = 'external/purchase'
helper.index()
const externalDeposit = ExternalDepositStore()
externalDeposit.getCurrencies()

const { currencies } = storeToRefs(externalDeposit)

const search = ref<string>('')
const getSearch = () => {
    helper.index({
        name: search.value
    })
}
const eventsTotalExchange: EventComponent = {
    keypress: validator.keyPressOnlyNumberAndBackscape,
    keyup: (event: any) => {
        formCrud.value.total_exchange_local = validator.amountFormat(event);
    },
}; 
const eventsTotalExchangeLocal: EventComponent = {
    keypress: validator.keyPressOnlyNumberAndBackscape,
    keyup: (event: any) => {
        formCrud.value.received_amount = validator.amountFormat(event);
    },
}; 
const openUpdate = (item: ExternalDeposit) => {
    itemH.value = item
    const itemUpdate: ExternalDepositUpdate = {
        id: item.id,
        currency_id: item.relationships!.currency.id,
        received_amount: item.attributes.received_amount,
        total_exchange_local: formatNumber(item.attributes.total_exchange_local),
        currency_price: item.attributes.currency_price,
        fec_pay: item.attributes.fec_pay
    }
    formCrud.value = itemUpdate
    openModalCrud.value = true;
}

const openModal = async () => {
    itemH.value = {}
    formCrud.value = {}
    clickIn.value = 'Create'
    openModalCrud.value = true;
}

const { t } = useI18n()
const {
    formCrud,
    openModalCrud,
    clickIn,
    formRef,
    item:itemH} = storeToRefs(helper)
const rows: Row[] = [
    {
        fields: [
            {
                label: t('views.currencies.title'),
                valueForm: 'currency_id',
                rules: [
                    validator.required
                ],
                type: 'select',
                select: {
                    items: currencies,
                    itemTitle: 'attributes.name',
                    itemValue: 'id',
                },
                
            },
            {
                label: 'Fecha de Cambio',
                valueForm: 'fec_pay',
                rules: [
                    validator.required
                ],
                type: 'date',
            }
        ]
    },
    {
        fields: [
            {
                label: 'Total Pesos Cambiados',
                valueForm: 'total_exchange_local',
                rules: [
                    validator.required
                ],
                type: 'text',
                events: eventsTotalExchange,
                decode: formatNumberStringToNumber
            },
            {
                label: 'Total de Crypto Recibida',
                valueForm: 'received_amount',
                rules: [
                    validator.required
                ],
                type: 'text',
                events: eventsTotalExchangeLocal,
                decode: formatNumberStringToNumber
            },
            {
                label: 'Tasa de Cambio Apróx.',
                valueForm: 'exchange_local',
                rules: [
                    validator.required
                ],
                type: 'number',
                props:{
                    disabled: true
                }
            },
        ]
    },
]

const headers: Head[] = [
    {
        name: t('views.currencies.title'),
        value: 'relationships.currency.attributes.abbreviation',
    },
    {
        name: 'Total Pesos Cambiados',
        value: 'total_exchange_local',
    },
    {
        name: 'Total de Crypto Recibida',
        value: 'received_amount',
    },
    {
        name: 'Fecha de Cambio',
        value: 'fec_pay',
    },
]


</script>

<style scoped>

</style>