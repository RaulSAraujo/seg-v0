<script lang="ts" setup>
import { useOSInternalObsApi } from "~/services/service_order.service/useServiceOrderInternalObsApi";

import type { InternalObservationsForm } from "~/interfaces/ServiceOrder";

const { params } = useRoute();

const { create } = useOSInternalObsApi();

const form = reactive<InternalObservationsForm>({
  target_user: null,
  observation: "",
  status: null,
  products: "",
});

const loading = useLoadingIndicator();

const save = async () => {
  try {
    loading.start();

    await create(params.id as string, {
      is_manual: true,
      ...form,
    });
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loading.finish();
  }
};

const clear = () => {
  form.target_user = null;
  form.status = null;
  form.observation = "";
  form.products = "";
};
</script>

<template>
  <v-dialog
    transition="dialog-top-transition"
    width="380px"
    @after-leave="clear"
  >
    <template #activator="{ props: dialog }">
      <v-btn
        v-bind="dialog"
        class="mr-2"
        color="primary"
        text="ADD"
        prepend-icon="mdi-plus"
      />
    </template>

    <template #default="{ isActive }">
      <v-card title="NOVO CRM" rounded="xl">
        <template #text>
          <v-row dense>
            <v-col cols="12">
              <ServiceOrderTabsCrmCreationDestination
                v-model="form.target_user"
              />
            </v-col>
            <v-col cols="12">
              <ServiceOrderTabsCrmCreationReason v-model="form.status" />
            </v-col>
            <v-col cols="12">
              <UiTextField v-model="form.observation" label="Observação" />
            </v-col>
          </v-row>

          <ServiceOrderTabsCrmCreationProducts
            @select="form.products = $event"
          />
        </template>

        <template #actions>
          <v-spacer />
          <v-btn
            color="primary"
            text="SALVAR"
            variant="flat"
            width="8vw"
            @click="
              save();

              isActive.value = false;
            "
          />
          <v-spacer />
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
