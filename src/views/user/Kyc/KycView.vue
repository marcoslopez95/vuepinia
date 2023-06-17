<template>
    <div>
        <h2 class="text-primary">{{ $t('views.profile.kyc.verification-identity') }}</h2>
        <p class="text-table">
            {{ $t('views.profile.kyc.upload-documents') }}
        </p>
    </div>
    <div class="text-table">
        <h3 class="text-primary">
            {{ $t('views.profile.kyc.title-intructions') }}
        </h3>
        <VList>
            <VListItem class="li-custom">
                <template #prepend>
                    <VIcon icon="mdi-circle" size="7"></VIcon>
                </template>
                {{ $t('views.profile.kyc.instructions.one') }}
            </VListItem>
            <VListItem class="li-custom">
                <template #prepend>
                    <VIcon icon="mdi-circle" size="7"></VIcon>
                </template>
                {{ $t('views.profile.kyc.instructions.two') }}
            </VListItem>
            <VListItem class="li-custom">
                <template #prepend>
                    <VAvatar>
                        <VIcon icon="mdi-circle" size="7"></VIcon>
                    </VAvatar>
                </template>
                {{ $t('views.profile.kyc.instructions.three') }} <span class="text-primary font-weight-bold">JPG,PNG,GIF</span>
            </VListItem>
        </VList>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const items =[

]
</script>

<style lang="scss" scoped>
.ul-custom {
    list-style-type: none; /* Elimina los estilos predeterminados de la lista */
  padding: 0;
}
.li-custom{
    content: "•"; /* Agrega un punto negro como marcador */
  color: black; /* Color del punto */
  margin-right: 8px; /* Espacio entre el punto y el texto */
}
</style>