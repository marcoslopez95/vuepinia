<template>
    <div class="d-flex justify-space-between">
        <SearchInputComponentVue v-model="search" @onSearch="getSearch" />
        <VBtn @click="openModal" prepend-icon="mdi-plus" class="rounded-xl">
            {{ $t('buttons.add') }}
        </VBtn>
    </div>

    <CrudComponent :singular="$t('views.company-accounts.other.title')" :rows="rows"></CrudComponent>
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
import type { OtherAccountClient } from '@/interfaces/CompanyAccount/OtherAccount/OtherAccount.model';
import type { OtherAccountClientCreate } from '@/interfaces/CompanyAccount/OtherAccount/OtherAccount.dto';
import SearchInputComponentVue from '@/components/global/SearchInputComponent.vue';
import * as validator from '@/validator'
import { PAYMENT_METHODS_AVAILABLE } from '@/enums/PaymentMethod.enum';
import { CompanyAccountStore } from '@/stores/CompanyAccountStore';
const helper = helperStore()
helper.url = 'client/account'
helper.defaultParams.payment_type_id = PAYMENT_METHODS_AVAILABLE.OTHER
helper.defaultParamsByCrud.payment_type_id = PAYMENT_METHODS_AVAILABLE.OTHER
helper.index()

const search = ref<string>('')
const getSearch = () => {
    helper.index({
        name: search.value
    })
}

const companyAccount = CompanyAccountStore()
companyAccount.getBanks()
companyAccount.getCurrencies()
companyAccount.getPaymentMethods()
companyAccount.getTypeBankAccounts()
const { banks,currencies,paymentMethods,typeBankAccounts } = storeToRefs(companyAccount)

const openUpdate = (item:OtherAccountClient) => {
    itemH.value = item

    const itemUpdate: OtherAccountClientCreate = {
        account_number: item.attributes.account_number,
        beneficiary: item.attributes.beneficiary,
        currency_id: item.relationships!.currency.id,
        identification_document: item.attributes.identification_document,
        payment_type_id: item.attributes.payment_type_id,
        code_phone: item.attributes.code_phone,
        phone: item.attributes.phone,
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
                label: t('views.company-accounts.bank.account-number'),
                valueForm: 'account_number',
                rules: [
                    validator.required
                ],
                type: 'text',
            },
        ]
    },
    {
        fields: [
           
            {
                label: t('views.company-accounts.bank.beneficiary'),
                valueForm: 'beneficiary',
                rules: [
                    validator.required
                ],
                type: 'text',
            },
            {
                label: t('views.company-accounts.bank.identification-document'),
                valueForm: 'identification_document',
                rules: [
                    validator.required
                ],
                type: 'text',
            },
            {
                label: t('views.users.phone'),
                valueForm: 'phoneFormat',
                rules: [
                ],
                type: 'phone',
                phone: {
                    fieldCode: 'code',
                    fieldPhone: 'phone',
                    fieldValid: 'phoneIsValid'
                }
            }
        ]
    },
]

const headers: Head[] = [
    {
        name: t('views.currencies.title'),
        value: 'relationships.currency.attributes.abbreviation',
    },
    {
        name: t('views.company-accounts.bank.beneficiary'),
        value: 'attributes.beneficiary',
    },
    {
        name: t('views.company-accounts.bank.account-number'),
        value: 'attributes.account_number',
    }

]


</script>

<style scoped>

</style>