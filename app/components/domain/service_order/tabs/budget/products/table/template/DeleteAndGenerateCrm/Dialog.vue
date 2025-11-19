<script lang="ts" setup>
import { useOSProductsApi } from "~/services/service_order.service/useServiceOrderProductsApi";
import { useOSInternalObsApi } from "~/services/service_order.service/useServiceOrderInternalObsApi";

import type { InternalObservationsForm } from "~/interfaces/ServiceOrder";

const Destination = defineAsyncComponent(() => import("./Destination.vue"));

defineOptions({
  name: "ServiceOrderBudgetProductsTableTemplateDeleteAndGenerateCrmDialog",
});

const props = defineProps<{
  id: number;
  nameProduct: string;
}>();

const { params } = useRoute();
const loading = useLoadingIndicator();

const { remove } = useOSProductsApi();
const { create } = useOSInternalObsApi();

const emit = defineEmits(["remove"]);

const form = reactive<InternalObservationsForm>({
  target_user: null,
  observation: "",
  status: null,
});

const save = async () => {
  try {
    loading.start();

    await create(params.id as string, {
      ...form,
      is_manual: false,
      products: props.nameProduct,
    });

    await remove(props.id);

    emit("remove");
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loading.finish();
  }
};

const clear = () => {
  form.target_user = null;
  form.observation = "";
  form.status = null;
};
</script>

<template>
  <v-dialog
    transition="dialog-top-transition"
    width="380px"
    @after-leave="clear"
  >
    <template #default="{ isActive }">
      <v-card title="PEÇA A COLETAR PARA:" rounded="xl">
        <template #text>
          <v-row dense>
            <v-col cols="12">
              <Destination v-model="form.target_user" />
            </v-col>

            <v-col cols="12">
              <ServiceOrderTabsCrmCreationReason v-model="form.status" />
            </v-col>

            <v-col cols="12">
              <UiTextField v-model="form.observation" label="Observação" />
            </v-col>
          </v-row>
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
