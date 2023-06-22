<template>
    <div class="d-flex justify-space-between" >
        <SearchInputComponentVue v-model="search" @onSearch="getSearch" />
        <VBtn 
            @click="openModal"
            prepend-icon="mdi-plus"
            class="rounded-xl"
            >
            {{$t('buttons.add')}}
        </VBtn>
    </div>
    
    <CrudComponent :singular="$t('views.banks.title')" :rows="rows"></CrudComponent>
    <!-- <h3>{{$t('views.type_documents.title',2)}}</h3> -->
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
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import type { Bank } from '@/interfaces/Bank/Bank.model';
import type { BankCreate } from '@/interfaces/Bank/Bank.dto';
import SearchInputComponentVue from '@/components/global/SearchInputComponent.vue';
import { BankStore } from '@/stores/BankStore'
import * as validator from '@/validator'
const helper = helperStore()
helper.url = 'banks'
helper.index()

const bankStore = BankStore()
const { countries } = storeToRefs(bankStore)
bankStore.getCountries()

const search = ref<string>('')
const getSearch = () => {
    helper.index({
        type_document: search.value
    })
}
const openUpdate = (item:Bank) => {
    itemH.value = item
    const itemUpdate: BankCreate = {
        country_id: item.relationships?.country.id ?? 0,
        description: item.attributes.description,
        name: item.attributes.name,
        status: item.attributes.status
    }
    formCrud.value = itemUpdate
    openModalCrud.value = true;
}

const openModal = async () => {
    itemH.value = false
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
                label: t('general-views.description'),
                type: 'text',
                valueForm: 'description',
            // }
        // ]
    },
    // {
        // fields: [
            {
                label: t('views.countries.title'),
                type: 'select',
                valueForm: 'country_id',
                select: {
                    items: countries,
                    itemTitle: 'attributes.name',
                    itemValue: 'id',
                },
                rules: [
                    validator.required
                ]
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
        name: t('general-views.description'),
        value: 'attributes.description',
    },
    {
        name: t('views.countries.title'),
        value: 'relationships.country.attributes.name',
    },

]


</script>

<style scoped>
.custom-text-field .v-input__control {
  border-radius: 50px;
}
</style>