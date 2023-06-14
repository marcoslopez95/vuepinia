<template>
    <div class="rounded-xl color-border-degree pb-5">
        <div class="w-100 text-center">
            <VIcon :icon="KycIcon" size="152" class="text-sky"></VIcon>
            <label
                class="font-weight-bold texto pt-6" 
                style="
                    font-size: 50px;
                    margin-left: -12px;
                    vertical-align: middle;
                "
                >
                {{ $t('menu-right.kyc') }}
            </label>
        </div>
        <div class="w-100 text-center">
            <label class="text-sky font-weight-bold" style="font-size: 22px;">
                {{ $t('menu-right.complete-your-kyc') }}
            </label>
            <VIcon :icon="ArrowIcon" class="text-sky"></VIcon>
        </div>
    </div>
</template>

<script setup lang="ts">
import ArrowIcon from '@/assets/icons/layout/MenuRight/ArrowIcon.vue'
import KycIcon from '@/assets/icons/layout/MenuRight/KycIcon.vue'
</script>

<style scoped lang="scss">
@import "@/scss/variables.scss";

.texto {
    background: linear-gradient(180deg, #5043E9 6.77%, #16B4E6 77.6%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.13);
}

</style>