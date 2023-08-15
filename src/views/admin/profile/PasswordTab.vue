<template>
    <div>
        <div>
            <div class="w-50">
                <InputComponent
                    v-model="form.passwordCurrent"
                    name="Contraseña Actual"
                />
            </div>
            <div class="d-md-flex mt-5" style="gap: 30px">
                <div :class="$vuetify.display.smAndDown ? 'w-50' : 'w-33'">
                    <InputComponent
                        v-model="form.passwordCurrent"
                        name="Contraseña Nueva"
                    />
                </div>
                <div :class="$vuetify.display.smAndDown ? 'w-50' : 'w-33'">
                    <InputComponent
                        v-model="form.passwordCurrent"
                        name="Confirmar Contraseña"
                    />
                </div>
            </div>
            <div class="mt-5">
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
