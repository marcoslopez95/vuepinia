<template>
    <div>
        <!-- Fields -->
        <div style="width: 270px" class="mx-auto">
            <!-- XCOP field -->
            <div
                class="border custom-border-primary rounded-lg d-flex align-center py-1 pl-3 pr-6 gap-2"
            >
                <!-- icon xcop -->
                <div>
                    <VIcon :icon="XcopIcon" />
                </div>
                <!-- text xcop -->
                <div class="">
                    <label for="xcop-input">
                        <div
                            class="text-table text-10"
                            style="line-height: 10px"
                        >
                            Enviar
                        </div>
                        <div class="font-16">XCOP</div>
                    </label>
                </div>
                <!-- xcop input -->
                <div class="w-100 d-flex justify-end">
                    <input
                        class="w-100 border-none text-right"
                        single-line
                        id="xcop-input"
                        name="xcop-input"
                        hide-details
                        @keypress="eventsXcop.keypress"
                        @keyup="eventsXcop.keyup"
                        v-model="form.amount"
                    />
                </div>
            </div>
            <!-- Icon -->
            <SelectPaymentMethod v-model="form.account_id" />
            
            <!-- Received Field -->
            <div></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import XcopIcon from "@/assets/icons/XcopIcon.vue";
import { amountFormat, keyPressIsNumber } from "@/validator";
import { ref } from "vue";
import SelectPaymentMethod from '@/views/user/walletXCOP/Swap/SelectPaymentMethod.vue'

const form = ref<FormWithdrawalXcop>({
    account_id: "",
    amount: "0",
    fee: "",
    type: "Cuenta",
    wallet_id: "",
});

const eventsXcop = {
    keypress: (event: any) => {
        if (!keyPressIsNumber(event) && event.key != "Backscape") {
            event.preventDefault();
            return;
        }
        // amountFiat.value = amountFormat(event)
    },
    keyup: (event: any) => {
        form.value.amount = amountFormat(event);
    },
};

interface FormWithdrawalXcop {
    type: "Crypto" | "Cuenta";
    wallet_id: number | "";
    account_id: number | "";
    amount: string;
    fee: string;
}
</script>

<style scoped lang="scss">
#xcop-input {
    border: none;
    outline: none;
}
/*
#iconSwap {
    position: absolute;
    right: 5px;
    top: -5px;
    left: auto;
}*/
</style>
