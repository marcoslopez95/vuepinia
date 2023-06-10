<template>
  <RouterView></RouterView>
  <v-overlay v-model="helper.loading" class="overl">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { helperStore } from "./helper";
const helper = helperStore()
</script>
<style lang="scss">
.v-navigation-drawer__scrim{
  z-index: 1 !important;
}

.overl{
  justify-content: center;
  align-items: center;
  top: 50%;
}

%scroll-styles{
  overflow-y: auto;
  scrollbar-width: thin;
  &::-webkit-scrollbar{
    width: 8px;
    height: 8px;
    scrollbar-color: rgba(var(--v-theme-primary))!important;
  }
  &::-webkit-scrollbar-track{
    background-color: transparent !important
  }
  &::-webkit-scrollbar-thumb{
    background-color: rgba(var(--v-theme-primary));
    transition: background-color 0.2s ease-in-out;
    border-radius: 4px;
    &::-webkit-scrollbar-thumb:hover{
      filter: brightness(1.1) !important;
    }
  }
}
</style>