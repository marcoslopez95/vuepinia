<template>
    <div class="d-flex justify-space-between">
        <SearchInputComponentVue v-model="search" @onSearch="getSearch" />
        <VBtn @click="openModal" prepend-icon="mdi-plus" class="rounded-xl">
            {{ $t('buttons.add') }}
        </VBtn>
    </div>

    <CrudComponent 
        :singular="$t('views.currencies.title')" 
        :rows="rows"
        @click:post="postCurrency"
    >
    </CrudComponent>
    <TableComponentVue
    optionsHabilit
    icon-update
    icon-delete
    :headers="headers"
    @update="openUpdate"
    :items="helper.items"
    >
    <template #cel-attributes.name="{data}">
        <div class="d-flex gap-2">
            <div class="text-table text-left" style="width: 25px;">  
                <VImg inline class="mx-auto my-auto" v-if="itemHaveImages(currency(data).relationships?.images)" :src="(itemHaveImages(currency(data).relationships?.images) as string)" width="25" />
            </div>
            <div>
                {{ currency(data).attributes.name }}
            </div>
        </div>
    </template>
    </TableComponentVue>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CrudComponent from '@/components/global/CrudComponent.vue';
import TableComponentVue from '@/components/global/TableComponent.vue';
import { helperStore, itemHaveImages } from '@/helper';
import type { Row } from '@/interfaces/FormComponent.helper';
import type { Head } from '@/interfaces/TableComponent.helper';
import { storeToRefs} from 'pinia';
import { useI18n } from 'vue-i18n';
import type { Currency } from '@/interfaces/Currency/Currency.model';
import type { CurrencyCreate } from '@/interfaces/Currency/Currency.dto';
import SearchInputComponentVue from '@/components/global/SearchInputComponent.vue';
import * as validator from '@/validator'
import { CurrencyStore } from '@/stores/CurrencyStore';

const helper = helperStore()
helper.url = 'currency'

helper.index()
const currencyStore = CurrencyStore()
currencyStore.getCurrencyTypes()

const currency  = (item:any): Currency => item as Currency

const { currencyTypes } = storeToRefs(currencyStore)
const search = ref<string>('')
const getSearch = () => {
    helper.index({
        name: search.value
    })
}
const openUpdate = (item:Currency) => {
    itemH.value = item
    const itemUpdate: CurrencyCreate = {
        name: item.attributes.name,
        abbreviation: item.attributes.abbreviation,
        symbol: item.attributes.symbol,
        type_currency_id: item.relationships?.typeCurrency?.id ??  '',
        reference_system_currency: !!item.attributes.reference_system_currency,
        wallet_default: !!item.attributes.wallet_default,
        sale: !!item.attributes.sale,
        buy: !!item.attributes.buy,
        icon: item.relationships?.images && item.relationships.images.length>0 ? item.relationships?.images[0].attributes.aws_url : "",
        color: item.attributes.color
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
                label: t('general-views.name'),
                type: 'text',
                valueForm: 'name',
                rules: [
                    validator.required
                ]
            },
            {
                label: t('views.currencies.abbreviation'),
                type: 'text',
                valueForm: 'abbreviation',
                rules: [
                    validator.required
                ]
            },
            {
                label: t('views.currencies.symbol'),
                type: 'text',
                valueForm: 'symbol',
                rules: [
                    validator.required
                ]
            },
            {
                label: t('views.currency-types.title'),
                type: 'select',
                valueForm: 'type_currency_id',
                rules: [
                    validator.required
                ],
                select: {
                    items: currencyTypes,
                    itemTitle: 'attributes.name',
                    itemValue: 'id'
                }
            }
        ]
    },
    {
        fields: [
            {
                label: t('views.currencies.buy'),
                type: 'switch',
                valueForm: 'buy',
                rules: [ ]
            },
            {
                label: t('views.currencies.sale'),
                type: 'switch',
                valueForm: 'sale',
                rules: []
            },
            {
                label: t('views.currencies.reference'),
                type: 'switch',
                valueForm: 'reference_system_currency',
                rules: []
            },
            // {
            //     label: t('views.currencies.wallet-default'),
            //     type: 'switch',
            //     valueForm: 'wallet_default',
            //     rules: []
            // }
        ]
    },
    {
        fields: [
            {
                label: t('views.currencies.image'),
                type: 'image',
                valueForm: 'icon',
                rules: [ ],
                props: {
                    sizeImage: 100
                }
            },
            {
                label: t('general-views.color'),
                type: 'color',
                valueForm: 'color',
            },
        ]
    }
]

const headers: Head[] = [

    {
        name: t('general-views.name'),
        value: 'attributes.name',
    },
    {
        name: t('views.currencies.abbreviation'),
        value: 'attributes.abbreviation',
    },
    {
        name: t('views.currencies.symbol'),
        value: 'attributes.symbol',
    },

]

const postCurrency = async (item: CurrencyCreate) => {
    const data = new FormData()

    for(let key in formCrud.value){
        if(key == 'icon'){
            continue
        }
        data.append(key,formCrud.value[key])
    }
    const url = clickIn.value == 'Create' ? 'currency' : `currency/${itemH.value}`
    const method = clickIn.value == 'Create' ? 'post' : 'put'
    // const res = (await helper.http(url, method,{data}))
    console.log(data)
    // return
    const res = clickIn.value == 'Edit' 
            ? await helper.put(itemH.value.id, data)
            : await helper.create(data)

    if (res === false) return
    formRef.value.reset()
    openModalCrud.value = false
    helper.index()
}
</script>

<style scoped>

</style>