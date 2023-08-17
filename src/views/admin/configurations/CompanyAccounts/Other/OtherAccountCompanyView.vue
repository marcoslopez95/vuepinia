<template>
    <div class="d-flex justify-space-between flex-column flex-sm-row mb-8">
        <SearchInputComponentVue v-model="search" @onSearch="getSearch" />
        <div>
            <VBtn @click="openModal" prepend-icon="mdi-plus" class="rounded-xl">
                {{ $t('buttons.add') }}
            </VBtn>
        </div>
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
import type { OtherAccount } from '@/interfaces/CompanyAccount/OtherAccount/OtherAccount.model';
import type { OtherAccountCreate } from '@/interfaces/CompanyAccount/OtherAccount/OtherAccount.dto';
import SearchInputComponentVue from '@/components/global/SearchInputComponent.vue';
import * as validator from '@/validator'
import { PAYMENT_METHODS_AVAILABLE } from '@/enums/PaymentMethod.enum';
import { CompanyAccountStore } from '@/stores/CompanyAccountStore';
const helper = helperStore()
helper.url = 'company/account'
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

const openUpdate = (item:OtherAccount) => {
    itemH.value = item

    const itemUpdate: OtherAccountCreate = {
        account_number: item.attributes.account_number,
        beneficiary: item.attributes.beneficiary,
        currency_id: item.relationships!.currency.id,
        description: item.attributes.description,
        identification_document: item.attributes.identification_document,
        recommendation: item.attributes.recommendation,
        payment_type_id: item.attributes.payment_type_id,
        code_phone: item.attributes.code_phone,
        limit: item.attributes.limit,
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
    {
        fields: [
            {
                label: t('views.company-accounts.bank.limit'),
                valueForm: 'limit',
                colClass: ['v-col-12 v-col-sm-6'],
                rules: [
                    validator.required
                ],
                type: 'number',
            },
            {
                label: t('views.company-accounts.bank.recommendation'),
                colClass: ['v-col-12 v-col-sm-6'],
                valueForm: 'recommendation',
                rules: [
                    validator.required
                ],
                type: 'text',
            }
        ]
    },
    {
        fields: [
            {
                label: t('general-views.description'),
                valueForm: 'description',
                rules: [
                    validator.required
                ],
                type: 'text',
            }
        ]
    }
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
    },
    {
        name: t('views.company-accounts.bank.limit'),
        value: 'attributes.limit',
    },

]


</script>

<style scoped>

</style>