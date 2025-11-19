<script lang="ts" setup>
import type { Page } from "~/interfaces/Menu";

const dialog = ref(false);

const search = shallowRef("");

const history = ref<Page[]>([]);
</script>

<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-top-transition"
    width="100vw"
    max-width="350px"
    @after-leave="search = ''"
  >
    <template #activator="{ props: activator }">
      <v-btn v-bind="activator" icon="mdi-magnify" variant="plain" />
    </template>

    <template #default>
      <v-card rounded="xl">
        <template #title>
          <v-text-field
            v-model="search"
            v-maska="'B'"
            prepend-inner-icon="mdi-magnify"
            hide-details
            autofocus
          />
        </template>

        <template #text>
          <v-card
            height="250"
            variant="outlined"
            color="grey"
            rounded="xl"
            class="border-sm"
          >
            <SearchListHistory
              v-if="search.length == 0"
              :history="history"
              @remove="history.splice($event, 1)"
              @close-dialog="dialog = false"
            />

            <SearchListPages
              v-else
              :search="search"
              @set-history="history.push($event)"
              @close-dialog="dialog = false"
            />
          </v-card>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>

<style>
.container-search-text-field {
  width: 15vw;
  min-width: 200px;
}
</style>
