<script setup lang="ts">
import { ref } from "vue";
const fav = ref(true);
const menu = ref(true);
const message = ref(true);
const hints = ref(true);
</script>

<template>
  <!-- ----------------------------------------------------------------------------- -->
  <!-- Popover menu -->
  <!-- ----------------------------------------------------------------------------- -->
  <p class="text-subtitle-1 text-grey-darken-1">
    A menu can be configured to be static when opened, allowing it to function
    as a popover. This can be useful when there are multiple interactive items
    within the menu contents.
  </p>
  <div class="text-center mt-4">
    <v-menu v-model="menu" :close-on-content-click="false" anchor="top">
      <template v-slot:activator="{ props }">
        <v-btn color="secondary" v-bind="props"> Menu as Popover </v-btn>
      </template>

      <v-card min-width="300">
        <v-list>
          <v-list-item
            prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
            title="John Leider"
            subtitle="Founder of Vuetify"
          >
            <template v-slot:append>
              <v-btn
                variant="text"
                :class="fav ? 'text-red' : ''"
                icon="mdi-heart"
                @click="fav = !fav"
              ></v-btn>
            </template>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-switch
              v-model="message"
              color="purple"
              label="Enable messages"
              hide-details
            ></v-switch>
          </v-list-item>

          <v-list-item>
            <v-switch
              v-model="hints"
              color="purple"
              label="Enable hints"
              hide-details
            ></v-switch>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn @click="menu = false"> Cancel </v-btn>
          <v-btn color="primary" @click="menu = false"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

