<template>
    <div>
        <!-- Select -->
        <div class="d-flex gap-2">
            <VBtn
                v-for="(item, index) in indexFor"
                :key="index"
                class="w-50 text-center rounded-lg text-18"
                variant="outlined"
                :color="item.color"
                @click="url = item.url as Url"
                :active="url == item.url"
            >
                {{ item.type }}</VBtn
            >
        </div>
        <div class="">
            <div class="my-3 text-primary font-weight-light text-center font-22">
                Transacciones
            </div>
            <div class="">
                <div
                    v-for="(item, i) in items"
                    :key="i"
                    class="d-flex justify-space-between w-100 border-b-md py-2"
                >
                    <div class="w-25 text-center" v-if="isTransaction(item)">
                        <span v-if="isReceived(item)">
                            <svg
                                width="28"
                                height="26"
                                viewBox="0 0 28 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    width="28"
                                    height="26"
                                    rx="5"
                                    fill="#BBF3E0"
                                />
                                <path
                                    d="M22.6604 14.2755L23.6771 13.2588C24.1076 12.8283 24.1076 12.1322 23.6771 11.7062L14.7786 2.8031C14.3481 2.3726 13.6519 2.3726 13.226 2.8031L4.32288 11.7062C3.89237 12.1367 3.89237 12.8329 4.32288 13.2588L5.33959 14.2755C5.77467 14.7106 6.48454 14.7014 6.91046 14.2572L12.1681 8.73853L12.1681 21.9009C12.1681 22.51 12.6581 23 13.2672 23H14.7328C15.3419 23 15.8319 22.51 15.8319 21.9009L15.8319 8.73853L21.0895 14.2572C21.5155 14.706 22.2253 14.7152 22.6604 14.2755Z"
                                    fill="#1AD598"
                                />
                            </svg>
                        </span>
                        <span v-else>
                            <svg
                                width="28"
                                height="26"
                                viewBox="0 0 28 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    width="28"
                                    height="26"
                                    rx="5"
                                    transform="matrix(1 0 0 -1 0 26)"
                                    fill="#F9E8F5"
                                />
                                <path
                                    d="M22.6604 11.7245L23.6771 12.7412C24.1076 13.1717 24.1076 13.8678 23.6771 14.2938L14.7786 23.1969C14.3481 23.6274 13.6519 23.6274 13.226 23.1969L4.32288 14.2938C3.89237 13.8633 3.89237 13.1671 4.32288 12.7412L5.33959 11.7245C5.77467 11.2894 6.48454 11.2986 6.91046 11.7428L12.1681 17.2615L12.1681 4.09912C12.1681 3.49 12.6581 2.99997 13.2672 2.99997H14.7328C15.3419 2.99997 15.8319 3.49 15.8319 4.09912L15.8319 17.2615L21.0895 11.7428C21.5155 11.294 22.2253 11.2848 22.6604 11.7245Z"
                                    fill="#EF5DA8"
                                />
                            </svg>
                        </span>
                    </div>
                    <div class="w-25 d-flex justify-center align-center" v-else>
                        <!-- <div class=""> -->
                            <VChipSuccess size="md" class="text-10 px-2" small v-if="item.attributes.status === 'Procesado'">
                                Completado
                            </VChipSuccess>
                            <VChipWarning size="md" class="text-10 px-2" small
                                v-if="item.attributes.status == 'En proceso' "
                            >
                                Pendiente
                            </VChipWarning>
                        <!-- </div> -->
                    </div>
                    <!-- {{ transaction(item).attributes }} -->
                    <div
                        class="text-primary font-weight-light w-25 text-center"
                    >
                        {{ amount(item) }}
                    </div>
                    <div
                        class="text-disabled font-weight-light w-50 text-center"
                    >
                        {{
                            dayjs(item.attributes.created_at).format(
                                "DD/MM/YYYY HH:mm"
                            )
                        }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { formatNumber, getUserAuth, helperStore } from "@/helper";
import { ref, watch } from "vue";
import type {
    WithdrawalXCOP,
    TransactionXCOP,
} from "@/interfaces/TransactionXCOP/TransactionXCOP.model";
import dayjs from "dayjs";
const url = ref<Url>("");
const items = ref();
const helper = helperStore();
const indexFor = [
    {
        type: "Envios/Recibido",
        color: "active",
        url: "shipping/record/user/history/transactions",
    },
    {
        type: "Retiros",
        color: "active",
        url: "withdrawal/xcop",
    },
];

const getIndex = async () => {
    try {
        items.value = [];
        const res = await helper.http(url.value);
        items.value = res.data.response;
    } catch (e) {}
};

watch(url, () => getIndex());
const withdrawal = (item: unknown) => item as WithdrawalXCOP;
const transaction = (item: unknown) => item as TransactionXCOP;

const isTransaction = (item: unknown) => {
    if (transaction(item).attributes.user_send) {
        return true;
    }
    return false;
};

const isReceived = (item: unknown) =>{
    const user_id = getUserAuth().id
    return transaction(item).attributes.user_receipt == user_id
}

const amount = (item: unknown) => {
    if (url.value == "shipping/record/user/history/transactions") {
        return formatNumber(transaction(item).attributes.quantity);
    }
    if (url.value == "withdrawal/xcop") {
        return formatNumber(withdrawal(item).attributes.amount);
    }
};

const colorBadge = (item: unknown): string => {
    if (withdrawal(item).attributes.status == "En proceso") return "sky";
    return "success";
};

type Url = "shipping/record/user/history/transactions" | "withdrawal/xcop" | "";
</script>

<style scoped></style>
