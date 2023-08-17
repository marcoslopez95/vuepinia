<template>
    <div>
        <div class="">
            <div class="w-50" :class="$vuetify.display.xs ? 'mx-auto w-100': ''" style="max-width: 250px;">
                <InputComponent
                    v-model="form.passwordCurrent"
                    name="Contraseña Actual"
                />
            </div>
            <div class="d-flex  mt-5 flex-column flex-sm-row align-center" style="gap: 30px;">
                <div :class="$vuetify.display.smAndDown ? 'w-100' : 'w-33'" style="max-width: 250px;">
                    <InputComponent
                        v-model="form.passwordCurrent"
                        name="Contraseña Nueva"
                    />
                </div>
                <div :class="$vuetify.display.smAndDown ? 'w-100' : 'w-33'" style="max-width: 250px;">
                    <InputComponent
                        v-model="form.passwordCurrent"
                        name="Confirmar Contraseña"
                    />
                </div>
            </div>
            <div class="mt-5 text-center text-sm-left" :class="$vuetify.display.smAndDown ? 'mx-auto': ''">
                <VBtnPrimary style="width: 115px !important">
                    Guardar
                </VBtnPrimary>
            </div>
        </div>
        <VSpacer class="my-16" />
        <TwoFactor/>
    </div>
</template>

<script setup lang="ts">
import InputComponent from "@/components/InputComponent.vue";
import TwoFactor from "@/views/admin/profile/PasswordTab/TwoFactor.vue";
import { reactive } from "vue";

const form = reactive<ChangePassword>({
    confirmPassword: "",
    newPassword: "",
    passwordCurrent: "",
});

interface ChangePassword {
    passwordCurrent: string;
    newPassword: string;
    confirmPassword: string;
}
</script>

<style scoped></style>
