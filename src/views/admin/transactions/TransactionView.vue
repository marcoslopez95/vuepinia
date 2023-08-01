<template>
    <div class="d-flex justify-space-between">
        <h3>{{$t('views.transactions.title',2)}}</h3>
        <SearchInputComponentVue v-model="search" @onSearch="getSearch" />
    </div>
    <TableComponentVue 
        :optionsHabilit="true" 
        icon-show :headers="headers" 
        :items="helper.items">
        <template #attributes.created_at="{data}">
            <th class="text-center text-primary text-capitalize" 
            style="min-width: 230px;">
                Fecha
            </th>
        </template>
        <template #cel-total_exchange_local="{data}">
            <!-- {{ data }}asd -->
            {{ formatNumber(
                parseFloat(order(data).relationships?.currencyExchangeOrder.attributes.total_exchange_local ?? '0')
            ) }}
        </template>
        <template #cel-total_exchange_crypto="{data}">
            {{ formatNumber(
                parseFloat(order(data).attributes.amount_currency)
            ) }}
        </template>
        <template #cel-total_exchange_reference="{data}">
            {{ formatNumber(
                parseFloat(order(data).relationships!.currencyExchangeOrder.attributes.total_exchange_reference)
            ) }}
        </template>
        <template #cel-address="{data}">
            {{ getWalletFormated(
                order(data).attributes.address_send!
                )
            }}
        </template>
    </TableComponentVue>
</template>

<script setup lang="ts">
import TableComponentVue from '@/components/global/TableComponent.vue';
import SearchInputComponentVue from '@/components/global/SearchInputComponent.vue';
import { formatNumber, helperStore,getWalletFormated } from '@/helper';
import type { Row } from '@/interfaces/FormComponent.helper';
import type { Order } from '@/interfaces/Order/Order.model';
import type { Head } from '@/interfaces/TableComponent.helper';
import { UserStore } from '@/stores/UserStore';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue'
const helper = helperStore()
helper.url = 'order'
const search = ref<string>('')
helper.index()
const getSearch = () => {
    helper.index({
        tranx_no: search.value
    })
}
const userStore = UserStore()
userStore.getDepartaments()
userStore.getMunicipalities()
userStore.getUsers()
userStore.getRoles()
userStore.getCountries()
userStore.getTypeDocuments()

const {
    departaments,
    municipalities,
    users,
    roles,
    countries,
    typeDocuments
} = storeToRefs(userStore)

const openModal = async () => {
    itemH.value = {}
    formCrud.value = {}
    clickIn.value = 'Create'
    openModalCrud.value = true;
}
const { t } = useI18n()
const { formCrud, openModalCrud, item: itemH, clickIn, formRef } = storeToRefs(helper)

const headers: Head[] = [
    {
        name: t('views.transactions.txn_no'),
        value: 'attributes.tranx_no',
    },
    {
        name: '',
        value: 'icons',
    },
    {
        name: t('general-views.date'),
        value: 'attributes.created_at',
        type: 'date',
        format:  'YYYY-MM-DD | HH:mm:ss',
    },
    {
        name: t('views.users.username'),
        value: 'relationships.user.attributes.username',
    },
    {
        name: t('views.transactions.local_currency'),
        value: 'total_exchange_local',
    },
    {
        name: t('views.transactions.crypto_currency'),
        value: 'total_exchange_crypto',
    },
    {
        name: t('views.transactions.reference_currency'),
        value: 'total_exchange_reference',
    },
    {
        name: t('views.transactions.wallet'),
        value: 'address',
    },
]


const order = (item:unknown):Order =>{
    return item as Order
}
</script>

<style scoped></style>