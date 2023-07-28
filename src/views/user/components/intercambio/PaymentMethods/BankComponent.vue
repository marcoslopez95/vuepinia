<template>
    <div>
        <VRow>
            <VCol
                cols="6"
                sm="4"
                md="6"
                lg="4"
                v-for="bankAccount, i in (itemsDetails as Bank[])"
                :key="i"
                @click="selectItem(bankAccount)"
                
            >
                <VBtnDegree
                    rounded="lg"
                    :class="{
                        'payment-selected':
                            bankAccount.id ==
                            modelValue?.relationships?.bank.id,
                    }"
                    :color="bankAccount.attributes.color ?? 'primary'"
                >
                    <VImg
                        v-if="bankAccount.relationships!.images.length > 0"
                        :src="bankAccount.relationships!.images[0].attributes.aws_url"
                        width="150"
                        cover
                        aspect-ratio="16/9"
                        :max-height="34"
                    >
                    </VImg>
                    <span v-else>
                        {{ bankAccount.attributes.name }}
                    </span>
                </VBtnDegree>
            </VCol>
        </VRow>
    </div>
</template>

<script setup lang="ts">
import type { BankAccount } from "@/interfaces/CompanyAccount/BankAccount/BankAccount.model";
import type { Bank } from "@/interfaces/Bank/Bank.model";
import { ref } from "vue";
import { helperStore } from "@/helper";

const helper = helperStore();
const { modelValue } = defineProps<{
    itemsDetails: any;
    modelValue: BankAccount;
}>();

const emits = defineEmits<{
    (e: "update:model-value", value: BankAccount): void;
}>();

const selectItem = async (item: Bank) => {
    const params = {
        bank_id: item.id,
    };
    const res = await helper.http("company/account/ramdoms/banks", "get", {
        params,
    });
    const bankAccount = res.data.response;
    emits("update:model-value", bankAccount);
    itemSelect.value = bankAccount;
};
const itemSelect = ref<BankAccount | null>(null);
</script>

<style scoped>
.v-text-field__slot.payment-selected {
    background: none;
}

.payment-selected {
    color: white !important;
}
</style>
