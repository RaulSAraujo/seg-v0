<script setup lang="ts">
import { getMountAdDescription } from "~/services/product.service";

const { params } = useRoute();

const preview = ref(false);

const description = ref("");

const get = async () => {
  const res = await getMountAdDescription(params.id as string);

  description.value = res;
  preview.value = true;
};
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="75VW">
    <template #activator="{ props: dialog }">
      <v-tooltip
        location="left"
        text="PADRONIZAÇÃO DE ANUNCIO"
        content-class="bg-primary"
      >
        <template #activator="{ props: tooltip }">
          <v-btn
            v-bind="Object.assign({}, tooltip, dialog)"
            icon="mdi-tag-text"
            variant="plain"
            color="primary"
            @click="get"
          />
        </template>
      </v-tooltip>
    </template>

    <template #default>
      <v-card rounded="xl">
        <template #text>
          <UiTiptap
            v-if="preview"
            ref="tiptap"
            :editable="false"
            :remove-buttons="true"
            :content="description"
          />
          
          <UiTextArea
            v-else
            v-model="description"
            label="ANUNCIO"
            :hide-details="true"
            auto-grow
          />

          <v-tooltip
            location="left"
            text="Click e segure para ver o preview"
            content-class="bg-primary"
          >
            <template #activator="{ props: tooltip }">
              <v-fab
                v-bind="tooltip"
                icon="mdi-eye"
                color="primary"
                style="position: fixed; bottom: 40px; right: 65px"
                @click="preview = !preview"
              />
            </template>
          </v-tooltip>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
