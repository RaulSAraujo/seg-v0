<script lang="ts" setup>
import { useOSInternalObsApi } from "~/services/service_order.service/useServiceOrderInternalObsApi";
import { useOSProductsApi } from "~/services/service_order.service/useServiceOrderProductsApi";

const Technician = defineAsyncComponent(() => import("./Technician.vue"));

defineOptions({
  name: "ServiceOrderBudgetProductsTableTemplateReservedDialog",
});

const props = defineProps<{
  productId: number;
  productName: string;
}>();

const { params } = useRoute();

const emit = defineEmits(["update", "close"]);

const { update } = useOSProductsApi();
const { create } = useOSInternalObsApi();

const targetUser = ref<string | null>(null);

const save = async () => {
  try {
    await update({
      id: props.productId,
      reserved: 2,
    });

    await create(params.id as string, {
      observation: "",
      is_manual: false,
      status: "LIBERADO",
      products: props.productName,
      target_user: targetUser.value,
    });

    emit("update");

    emit("close");
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  }
};

const clear = () => {
  targetUser.value = null;
};
</script>

<template>
  <v-dialog
    transition="dialog-top-transition"
    width="380px"
    persistent
    @after-leave="clear"
  >
    <template #default>
      <v-card title="PEÇA LIBERADA PARA:" rounded="xl">
        <template #text>
          <v-row dense>
            <v-col cols="12">
              <Technician v-model="targetUser" />
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
            @click="save"
          />

          <v-spacer />
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
