<template>
    <h2 class="text-table font-weight-bold">
        {{ $t("views.configurations.title", 2) }} - {{ menuActive }}
        {{ submenuActive ? " - " + submenuActive : "" }}
    </h2>

    <v-card>
        <div class="border-b-md">
            <v-tabs v-model="menuActive" bg-color="transparent" show-arrows>
                <v-tab
                    v-for="(item, i) in tabs"
                    @click.prevent="clickInTab(i, item)"
                    :value="item.name"
                >
                    <span
                        :class="
                            menuActive == item.name
                                ? 'text-primary'
                                : 'text-tab'
                        "
                        v-if="!item.children"
                        >{{ item.name }}</span
                    >
                    <v-menu v-else class="w-100 h-100" v-model="menusOpened[i]">
                        <template v-slot:activator="{ props }">
                            <v-btn
                                variant="plain"
                                rounded="0"
                                class="align-self-center font-weight-bold w-100 h-100"
                                height="100%"
                                v-bind="props"
                                :color="
                                    item.children.some(
                                        (ch) => ch.name === submenuActive
                                    )
                                        ? 'primary'
                                        : 'tab'
                                "
                            >
                                {{ item.name }}
                                <v-icon end icon="mdi-menu-down"></v-icon>
                            </v-btn>
                        </template>

                        <v-list class="bg-grey-lighten-3">
                            <v-list-item
                                v-for="(child, j) in item.children"
                                :key="j"
                                @click="
                                    clickInSubMenu(
                                        child.value,
                                        child.name,
                                        item.name
                                    )
                                "
                                :active="submenuActive == child.name"
                                color="primary"
                            >
                                {{ child.name }}
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-tab>
            </v-tabs>
        </div>

        <v-card-text>
            <v-window v-model="tabActive">
                <Component :key="tabActive" :is="tabActive" />
                <v-window-item value="">
                    <span class="text-table">Por favor escoja una opción</span>
                </v-window-item>
            </v-window>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import CountryView from "./countries/CountryView.vue";
import DepartamentsView from "./departaments/DepartamentsView.vue";
import MunicipalitiesView from "./municipalities/MunicipalitiesView.vue";
import TypeDocumentsView from "./type-documents/TypeDocumentsView.vue";
import { helperStore } from "@/helper";
import { storeToRefs } from "pinia";
import { watch, shallowRef } from "vue";
import BanksView from "./banks/BanksView.vue";
import CurrencyView from "./currencies/CurrencyView.vue";
import PaymentMethodView from "./PaymentMethod/PaymentMethodView.vue";
import TypeBankAccountView from "./TypeBankAccount/TypeBankAccountView.vue";
import CategoriesFaqView from "./Faq/CategoriesFaqView.vue";
import FaqView from "./Faq/FaqView.vue";
import BankAccountCompanyView from "./CompanyAccounts/Bank/BankAccountCompanyView.vue";
import EfectyAccountCompanyView from "./CompanyAccounts/Efecty/EfectyAccountCompanyView.vue";
import items from "@/layouts/full/sidebar/items/AdminItems";
import OtherAccountCompanyView from "./CompanyAccounts/Other/OtherAccountCompanyView.vue";
import CurrencyTypeView from "./CurrencyType/CurrencyTypeView.vue";
import WalletView from "./wallet/WalletView.vue";
import ShippingTypeView from "./ShippingTypes/ShippingTypeView.vue";
import OtherPaymentsView from "./OtherPayments/OtherPaymentsView.vue";

const { t } = useI18n();
const helper = helperStore();
const tabActive = ref("");
const tabs = shallowRef<ItemTab[]>([
    {
        name: t("views.configurations.tabs.ubication"),
        value: "ubicaciones",
        children: [
            {
                name: t("views.countries.title", 2),
                value: CountryView,
            },
            {
                name: t("views.departaments.title", 2),
                value: DepartamentsView,
            },
            {
                name: t("views.municipalities.title", 2),
                value: MunicipalitiesView,
            },
        ],
    },
    {
        name: t("views.configurations.tabs.general-configs"),
        value: "general",
        children: [
            {
                name: t("views.type_documents.title", 2),
                value: TypeDocumentsView,
            },
            {
                name: t("views.banks.title", 2),
                value: BanksView,
            },
            {
                name: t("views.currencies.title", 2),
                value: CurrencyView,
            },
            {
                name: t("views.currency-types.title", 2),
                value: CurrencyTypeView,
            },
            {
                name: t("views.type-company-account.title", 2),
                value: PaymentMethodView,
            },
            {
                name: t("views.other-payments.title", 2),
                value: OtherPaymentsView,
            },
            {
                name: t("views.type-bank-account.title", 2),
                value: TypeBankAccountView,
            },
            {
                name: t("views.shipping-types.title", 2),
                value: ShippingTypeView,
            },
        ],
    },
    {
        name: t("views.categories-faq.title", 2),
        value: CategoriesFaqView,
    },
    {
        name: t("views.faq.title", 2),
        value: FaqView,
    },
    {
        name: t("views.configurations.tabs.company-account.title"),
        value: "finanzas",
        children: [
            {
                name: t("views.company-accounts.bank.title", 2),
                value: BankAccountCompanyView,
            },
            {
                name: t("views.company-accounts.efecty.title", 2),
                value: EfectyAccountCompanyView,
            },
            {
                name: t("views.company-accounts.other.title", 2),
                value: OtherAccountCompanyView,
            },
        ],
    },
    {
        name: t("views.wallets.title", 2),
        value: WalletView,
    },
]);

const menusOpened = ref(
    tabs.value.filter((item) => item.children).map((item) => false)
);

const submenuActive = ref("");
const menuActive = ref("");

const clickInSubMenu = (component: any, name: string, parent: string) => {
    submenuActive.value = name;
    tabActive.value = component;
    menuActive.value = parent;
};

const clickInTab = (i: number, item: ItemTab) => {
    menusOpened.value[i] = true;
    submenuActive.value = "";
    if (!item.children) {
        tabActive.value = item.value;
        menuActive.value = item.name;
    }
};

watch(menuActive, (nuevo, viejo) => {});
interface ItemTab {
    name: string;
    value: any;
    children?: ItemTab[];
}
</script>

<style scoped></style>
