<template>
    <div class="d-flex justify-space-between flex-column flex-sm-row mb-8">
        <SearchInputComponentVue v-model="search" @onSearch="getSearch" />
        <div>
            <VBtn @click="openModal" prepend-icon="mdi-plus" class="rounded-xl">
                {{ $t('buttons.add') }} 
            </VBtn>
        </div>
    </div>

    <CrudComponent :singular="$t('views.company-accounts.bank.title')" :rows="rows"></CrudComponent>
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
import type { BankAccount, BankAccountClient } from '@/interfaces/CompanyAccount/BankAccount/BankAccount.model';
import type { BankAccountClientCreate, BankAccountCreate } from '@/interfaces/CompanyAccount/BankAccount/BankAccount.dto';
import SearchInputComponentVue from '@/components/global/SearchInputComponent.vue';
import * as validator from '@/validator'
import { PAYMENT_METHODS_AVAILABLE } from '@/enums/PaymentMethod.enum';
import { CompanyAccountStore } from '@/stores/CompanyAccountStore';
const helper = helperStore()
helper.url = 'client/account'
helper.defaultParams.payment_type_id = PAYMENT_METHODS_AVAILABLE.BANK
helper.defaultParamsByCrud.payment_type_id = PAYMENT_METHODS_AVAILABLE.BANK
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

const openUpdate = (item:BankAccountClient) => {
    itemH.value = item
    const itemUpdate: BankAccountClientCreate = {
        account_number: item.attributes.account_number,
        bank_id: item.attributes.bank_id,
        beneficiary: item.attributes.beneficiary,
        currency_id: item.relationships!.currency.id,
        identification_document: item.attributes.identification_document,
        payment_type_id: item.attributes.payment_type_id,
        type_company_bank_account_id: item.attributes.type_company_bank_account_id
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
                }
            },
            {
                label: t('views.banks.title'),
                valueForm: 'bank_id',
                rules: [
                    validator.required
                ],
                type: 'select',
                select: {
                    items: banks,
                    itemTitle: 'attributes.name',
                    itemValue: 'id',
                }
            },
            {
                label: t('views.type-bank-account.title'),
                valueForm: 'type_company_bank_account_id',
                rules: [
                    validator.required
                ],
                type: 'select',
                select: {
                    items: typeBankAccounts,
                    itemTitle: 'attributes.name',
                    itemValue: 'id',
                }
            }
        ]
    },
    {
        fields: [
            {
                label: t('views.company-accounts.bank.account-number'),
                valueForm: 'account_number',
                rules: [
                    validator.required
                ],
                type: 'text',
            },
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
            }
        ]
    },
]

const headers: Head[] = [
    {
        name: t('views.banks.title'),
        value: 'relationships.bank.attributes.name',
    },
    {
        name: t('views.type-bank-account.title'),
        value: 'relationships.typeAccountBank.attributes.name',
    },
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
    },

]


</script>

<style scoped>

</style>