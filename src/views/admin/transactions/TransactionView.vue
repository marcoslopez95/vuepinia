<template>
    <div class="d-flex justify-space-between">
        <h3>{{$t('views.transactions.title',2)}}</h3>
        <SearchInputComponentVue v-model="search" @onSearch="getSearch" />
    </div>
    <TableComponentVue 
        :optionsHabilit="true" 
        icon-show :headers="headers" 
        :items="helper.items">
        <template #cel-icons="{data}">
            <div class="d-flex">
                <VIcon v-if="orderTaken(data)"  :icon="HandIcon" title="Tomada" />
                <VIcon v-if="isBankType(data)"  :icon="BankIcon" title="Banco" />
                <VIcon v-if="withVoucher(data)" :icon="VoucherIcon" title="Comprobantes" />
                <VIcon v-if="userWithKyc(data)" :icon="HuellaIcon" title="Kyc" />
                <VIcon
                    
                    :class="typeOrder(data) == OrderTypes.COMPRA ? 'text-warning' : 'text-ok giro-180'" 
                    :title="typeOrder(data)"
                    :icon="ArrowWithSquareIcon" />
            </div>
        </template>
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
            <div class="d-flex justify-start align-center gap-2">
            <VImg 
                width="20"
                height="20"
                inline
                v-if="haveCurrencyImage(order(data).relationships?.currency)"
                :src="(haveCurrencyImage(order(data).relationships?.currency) as string)" ></VImg>
            {{ formatNumber(
                parseFloat(order(data).attributes.amount_currency),'.',',',6
            ) }} {{ order(data).relationships?.currency.attributes.abbreviation.toLocaleUpperCase() }}
        </div>

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
import { haveCurrencyImage } from '@/stores/CurrencyStore';
import { PAYMENT_METHODS_AVAILABLE } from '@/enums/PaymentMethod.enum';
import { KYC_STATUS } from '@/enums/Kyc.enum';
import { OrderTypes } from '@/enums/OrderTypes.enum';
import HandIcon from '@/assets/icons/HandIcon.vue'
import BankIcon from '@/assets/icons/BankIcon.vue'
import VoucherIcon from '@/assets/icons/VoucherIcon.vue'
import HuellaIcon from '@/assets/icons/HuellaIcon.vue'
import ArrowWithSquareIcon from '@/assets/icons/ArrowWithSquareIcon.vue'

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
        style: 'min-width:200px'
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

const orderTaken = (item:unknown): boolean => {
    return order(item).attributes.processed_by ? true : false
}

const isBankType = (item:unknown): boolean => {
    return order(item).attributes.payment_type_id == PAYMENT_METHODS_AVAILABLE.BANK
}

const withVoucher = (item:unknown): boolean => {
    const images = order(item).relationships?.images
    if(!images || images.length == 0) return false
    return true
}

const userWithKyc = (item:unknown): boolean => {
    return order(item).relationships?.user.relationships?.kyc?.attributes.status == KYC_STATUS.ACCEPT
}

const typeOrder = (item:unknown): OrderTypes => {
    return order(item).attributes.type
}
</script>

<style scoped>

.giro-180{
    transform: rotate(180deg);
}
</style>