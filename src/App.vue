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
<style>
.v-navigation-drawer__scrim {
  z-index: 1 !important;
}
.overl {
  justify-content: center;
  align-items: center;
  top: 50%;
}
</style>