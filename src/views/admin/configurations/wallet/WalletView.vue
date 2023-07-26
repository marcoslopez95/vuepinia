<template>
    <div class="d-flex justify-space-between">
        <SearchInputComponentVue v-model="search" @onSearch="getSearch" />
        <VBtn @click="openModal" prepend-icon="mdi-plus" class="rounded-xl">
            {{ $t('buttons.add') }}
        </VBtn>
    </div>

    <CrudComponent :singular="$t('views.wallets.title')" :rows="rows"></CrudComponent>
    <TableComponentVue
    optionsHabilit
    icon-update
    icon-delete
    :headers="headers"
    @update="openUpdate"
    :items="helper.items"
    >
    <template #cel-relationships.currency.attributes.name="{data}">
        <div class="d-flex justify-space-between">
            <VIcon>
                {{ moneyIcon(data) }}
            </VIcon>
            <div>
                <span class=""> 
                    {{ (data as Wallet).relationships?.currency.attributes.name }}
                </span>
            </div>
        </div>
    </template>
    </TableComponentVue>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CrudComponent from '@/components/global/CrudComponent.vue';
import TableComponentVue from '@/components/global/TableComponent.vue';
import { helperStore } from '@/helper';
import type { Row } from '@/interfaces/FormComponent.helper';
import type { Head } from '@/interfaces/TableComponent.helper';
import { storeToRefs} from 'pinia';
import { useI18n } from 'vue-i18n';
import type { Wallet } from '@/interfaces/Wallet/Wallet.model';
import type { WalletCreate } from '@/interfaces/Wallet/Wallet.dto';
import SearchInputComponentVue from '@/components/global/SearchInputComponent.vue';
import * as validator from '@/validator'
import { WalletStore } from '@/stores/WalletStore';
const helper = helperStore()
helper.url = 'company/wallet'

helper.index()
const walletStore = WalletStore()
walletStore.getCurrencies()

const { currencies } = storeToRefs(walletStore)
const search = ref<string>('')
const getSearch = () => {
    helper.index({
        name: search.value
    })
}
const openUpdate = (item:Wallet) => {
    itemH.value = item
    const itemUpdate: WalletCreate = {
        currency_id: item.relationships!.currency.id,
        wallet_id: item.attributes.wallet_id,
        alias: item.attributes.alias
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
                type: 'select',
                valueForm: 'currency_id',
                rules: [
                    validator.required
                ],
                select: {
                    items: currencies,
                    itemTitle: 'attributes.name',
                    itemValue: 'id'
                }
            },
            {
                label: t('views.wallets.address'),
                type: 'text',
                valueForm: 'wallet_id',
                rules: [
                    validator.required
                ]
            },
            
        ]
    }
]

const headers: Head[] = [
    {
        name: t('views.currencies.title'),
        value: 'relationships.currency.attributes.name',
    },
    {
        name: t('views.wallets.address'),
        value: 'attributes.wallet_id',
    }
]

const moneyIcon = (item: Wallet): string => {
    const images = item.relationships?.currency.relationships?.images ?? false
    if(!images || images.length == 0) return 'mdi-bitcoin'

    return images[0].attributes.aws_url
}
</script>

<style scoped>

</style>