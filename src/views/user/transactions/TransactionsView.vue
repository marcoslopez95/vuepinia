<template>
    <div class="d-flex justify-space-between">
        <h3>{{ $t("views.transactions.title", 2) }}</h3>
        <SearchInputComponentVue v-model="search" @onSearch="getSearch" />
    </div>
    <TableComponentVue
        optionsHabilit
        icon-show
        :headers="headers"
        :items="helper.items"
        @show="clickInShow"
    >
        <template #cel-tranx_no="{ data }">
            <span class="text-primary">{{
                order(data).attributes.tranx_no
            }}</span>
        </template>
        <template #cel-transaction="{ data }">
            <span
                :class="
                    order(data).attributes.type == OrderTypes.COMPRA
                        ? 'text-ok'
                        : 'text-erro'
                "
                >{{ order(data).attributes.type }}</span
            >
        </template>
        <template #cel-local_currency="{ data }">
            {{
                formatNumber(
                    parseFloat(
                        order(data).relationships?.currencyExchangeOrder
                            .attributes.total_exchange_local!
                    )
                )
            }}
            COP
        </template>
        <template #cel-crypto_currency="{ data }">
            <div class="d-flex justify-center align-center" style="gap: 15px">
                <div>
                    <VImg
                        v-if="haveCurrencyImage(data)"
                        :src="order(data).relationships?.currency.relationships?.images![0].attributes.aws_url"
                        width="20px"
                        class=""
                    >
                    </VImg>
                </div>
                <div>
                    {{
                        formatNumber(
                            parseFloat(order(data).attributes.received_amount)
                        )
                    }}
                    {{
                        order(
                            data
                        ).relationships?.currency.attributes.abbreviation.toLocaleUpperCase()
                    }}
                </div>
            </div>
        </template>
        <template #cel-reference_currency="{ data }">
            {{
                formatNumber(
                    parseFloat(
                        order(data).relationships?.currencyExchangeOrder
                            .attributes.total_exchange_reference!
                    )
                )
            }}
            USD
        </template>
        <template #cel-wallet="{ data }">
            {{ getWalletFormated(order(data).attributes.address_send!) }}
        </template>
    </TableComponentVue>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CrudComponent from "@/components/global/CrudComponent.vue";
import TableComponentVue from "@/components/global/TableComponent.vue";
import { formatNumber, helperStore, getWalletFormated } from "@/helper";
import type { Row } from "@/interfaces/FormComponent.helper";
import type { Head } from "@/interfaces/TableComponent.helper";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import type { Wallet } from "@/interfaces/Wallet/Wallet.model";
import type { WalletCreate } from "@/interfaces/Wallet/Wallet.dto";
import SearchInputComponentVue from "@/components/global/SearchInputComponent.vue";
import * as validator from "@/validator";
import { WalletStore } from "@/stores/WalletStore";
import { computed } from "vue";
import { OrderTypes } from "@/enums/OrderTypes.enum";
import type { Order } from "@/interfaces/Order/Order.model";
import { useRouter } from "vue-router";

const router = useRouter();
const helper = helperStore();
helper.url = "order";
// helper.url = 'client/wallet/adress/wallet'

const order = (item: unknown): Order => {
    return item as Order;
};
helper.index();
const walletStore = WalletStore();
walletStore.getCurrencies();

const { currencies } = storeToRefs(walletStore);
const search = ref<string>("");
const getSearch = () => {
    helper.index({
        name: search.value,
    });
};
const openUpdate = (item: Wallet) => {
    itemH.value = item;
    const itemUpdate: WalletCreate = {
        currency_id: item.relationships!.currency.id,
        address: item.attributes.address,
        alias: item.attributes.alias,
    };
    formCrud.value = itemUpdate;
    openModalCrud.value = true;
};

const openModal = async () => {
    itemH.value = {};
    formCrud.value = {};
    clickIn.value = "Create";
    openModalCrud.value = true;
};

const { t } = useI18n();
const {
    formCrud,
    openModalCrud,
    clickIn,
    formRef,
    item: itemH,
} = storeToRefs(helper);

const validateAddress = () => {
    const currency = walletStore.currencies.find(
        (currencyIterable) => currencyIterable.id === formCrud.value.currency_id
    )!;

    return validator.addressValid(
        formCrud.value.address,
        currency.attributes.abbreviation
    );
};
const rows: Row[] = [
    {
        fields: [
            {
                label: t("views.wallets.alias"),
                type: "text",
                valueForm: "alias",
                rules: [validator.required],
            },
            {
                label: t("views.currencies.title"),
                type: "select",
                valueForm: "currency_id",
                rules: [validator.required],
                select: {
                    items: currencies,
                    itemTitle: "attributes.name",
                    itemValue: "id",
                },
            },
        ],
    },
    {
        fields: [
            {
                label: t("views.wallets.address"),
                type: "text",
                valueForm: "address",
                rules: [validateAddress, validator.required],
            },
        ],
    },
];

const headers: Head[] = [
    {
        name: t("general-views.status"),
        value: "status",
    },
    {
        name: t("views.transactions.txn_no"),
        value: "tranx_no",
    },
    {
        name: t("general-views.date"),
        value: "attributes.created_at",
        type: "date",
        format: "YYYY-MM-DD | HH:mm:ss",
        style: "min-width:250px",
    },
    {
        name: t("views.transactions.title"),
        value: "transaction",
    },
    {
        name: t("views.transactions.local_currency"),
        value: "local_currency",
        style: "min-width:250px",
    },
    {
        name: t("views.transactions.crypto_currency"),
        value: "crypto_currency",
        style: "min-width:250px",
    },
    {
        name: t("views.transactions.reference_currency"),
        value: "reference_currency",
        style: "min-width:250px",
    },
    {
        name: t("views.transactions.wallet"),
        value: "wallet",
    },
];

const haveCurrencyImage = (item: unknown): boolean => {
    const order = item as Order;
    const images = order.relationships?.currency.relationships?.images;
    if (images?.length == 0 || !images![0].attributes.aws_url) return false;
    return true;
};

const clickInShow = (order: Order) => {
    let  name = order.attributes.type == OrderTypes.COMPRA ? 'user-check-buy' : 'user-check-sell'
    router.push({
        name,
        params: {
            numTransaction: order.attributes.tranx_no,
        },
    });
};
</script>

<style scoped></style>
