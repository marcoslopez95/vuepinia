<template>
    <div class="d-flex justify-space-between">
        <SearchInputComponentVue v-model="search" @onSearch="getSearch" />
        <VBtn @click="openModal" prepend-icon="mdi-plus" class="rounded-xl">
            {{ $t('buttons.add') }}
        </VBtn>
    </div>

    <CrudComponent :singular="$t('views.currencies.title')" :rows="rows"></CrudComponent>
    <TableComponentVue
    optionsHabilit
    icon-update
    icon-delete
    :headers="headers"
    @update="openUpdate"
    :items="helper.items"
    >
    <template #cel-attributes.username="{data}">
        <span class="text-primary"> 
            {{ data.attributes.username }}
        </span>
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
import type { Currency } from '@/interfaces/Currency/Currency.model';
import type { CurrencyCreate } from '@/interfaces/Currency/Currency.dto';
import SearchInputComponentVue from '@/components/global/SearchInputComponent.vue';
import * as validator from '@/validator'
const helper = helperStore()
helper.url = 'currency'

helper.index()
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
            }
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


</script>

<style scoped>

</style>