<template>
    <div v-if="helper.clickIn !='Show'">
        <div class="d-flex justify-space-between mx-5 mb-5">
            <h2 class="text-primary font-weight-bold">{{ $t('views.admin.kyc.title') }}</h2>
            <SearchInputComponentVue v-model="search" @onSearch="getSearch" />
        </div>

        <TableComponentVue 
            optionsHabilit 
            icon-show 
            :headers="headers" 
            @show="showItem" 
            :items="helper.items"
        >
        <template #cel-attributes.status="{data}">
            <VChipSuccess
                v-if="(data as Kyc).attributes.status === KYC_STATUS.ACCEPT"
                >
                {{(data as Kyc).attributes.status}}
            </VChipSuccess>
            <VChipError
                v-if="(data as Kyc).attributes.status === KYC_STATUS.REJECT"
                >
                {{(data as Kyc).attributes.status}}
            </VChipError>
            <VChipWarning
                v-if="(data as Kyc).attributes.status === KYC_STATUS.IN_VERIFICATION"
                >
                {{(data as Kyc).attributes.status}}
            </VChipWarning>
        </template>
        </TableComponentVue>
    </div>
    <KycShow 
        v-else
        @back="helper.index"
        />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { helperStore } from '@/helper';
import SearchInputComponentVue from '@/components/global/SearchInputComponent.vue';
import TableComponentVue from '@/components/global/TableComponent.vue';
import type { Head } from '@/interfaces/TableComponent.helper';
import KycShow from './KycShow.vue';
import type { Kyc } from '@/interfaces/User/Kyc/Kyc.model';
import { KYC_STATUS } from '@/enums/Kyc.enum';

const showKyc = ref(false)
const { t } = useI18n()
const helper = helperStore()
const search = ref<string>('')
helper.url = 'kyc'
helper.pagination.currentPage = 1

helper.index()

const getSearch = () => {
    helper.index({
        type_document: search.value
    })
}

const headers: Head[] = [
    {
        name: t('general-views.id'),
        value: 'id',
    },
    {
        name: t('views.users.title'),
        value: 'relationships.user.attributes.username',
    },
    {
        name: t('views.users.email'),
        value: 'relationships.user.attributes.email',
    },
    {
        name: t('general-views.status'),
        value: 'attributes.status',
    },
]

const showItem = (element: Kyc) => {
    helper.item = element
    helper.clickIn = 'Show'
}
</script>

<style scoped></style>