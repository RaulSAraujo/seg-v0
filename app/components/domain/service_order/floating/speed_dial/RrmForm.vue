<script lang="ts" setup>
const { $customFetch, $config } = useNuxtApp();

const { params } = useRoute();

const input = ref("");

const generatePdf = async () => {
  try {
    const res = await $customFetch<{ url: string }>(
      "service-order/generate-pdf",
      {
        method: "POST",
        body: {
          id: params.id,
          pdfType: "createPdfRma",
          defectAndSolutionRma: input.value,
        },
      }
    );

    window?.open(`${$config.public.base_url_local}${res.url}`, "_blank");
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  }
};

const clear = () => {
  input.value = "";
};
</script>

<template>
  <div>
    <v-dialog
      transition="dialog-top-transition"
      width="380px"
      @after-leave="clear"
    >
      <template #activator="{ props: dialog }">
        <v-tooltip
          location="left"
          text="Ficha RMA"
          content-class="bg-cyan text-white"
        >
          <template #activator="{ props: tooltip }">
            <v-btn
              v-bind="Object.assign({}, tooltip, dialog)"
              icon="mdi-text-box-remove"
              color="cyan"
              class="text-white"
            />
          </template>
        </v-tooltip>
      </template>

      <template #default="{ isActive }">
        <v-card title="DEFEITO E SOLUÇÃO" rounded="xl">
          <template #text>
            <UiTextArea v-model="input" rows="1" />
          </template>

          <template #actions>
            <v-spacer />
            <v-btn
              color="primary"
              text="GERAR PDF"
              variant="flat"
              width="8vw"
              @click="
                generatePdf();

                isActive.value = false;
              "
            />
            <v-spacer />
          </template>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>
