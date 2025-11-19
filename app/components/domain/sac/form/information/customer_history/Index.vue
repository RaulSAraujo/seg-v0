<script setup lang="ts">
import { customerHistoryApi } from "~/services/sac.service";
import Table from "./Table.vue";
import BrandQuantity from "./charts/brand/Quantity.vue";
import BrandValue from "./charts/brand/Value.vue";
import DeviceQuantity from "./charts/device/Quantity.vue";
import DeviceValue from "./charts/device/Value.vue";

defineOptions({
  name: "SacCustomerHistory",
});

const sacCustomerStore = useSacCustomerStore();
const { customerData, customerHistory } = storeToRefs(sacCustomerStore);

const loading = ref(false);

const getCustomerHistory = async () => {
  try {
    loading.value = true;

    customerHistory.value = undefined;

    const res = await customerHistoryApi(customerData.value.id);

    customerHistory.value = res;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="60vw">
    <template #activator="{ props: dialog }">
      <v-btn
        v-bind="dialog"
        color="primary"
        text="Histórico cliente"
        :disabled="customerData.id == 0"
        @click="getCustomerHistory"
      />
    </template>

    <template #default>
      <v-card rounded="xl">
        <template #title>
          <span class="font-weight-medium text-primary mr-2">
            HISTÓRICO CLIENTE
          </span>
        </template>

        <template #text>
          <v-row>
            <v-col cols="8">
              <Table
                :orders="customerHistory?.orders ?? []"
                :loading="loading"
              />
            </v-col>
            <v-col
              cols="4"
              class="d-flex flex-column align-center justify-center"
            >
              <div>
                <div class="d-flex mb-2">
                  <span
                    class="text-body-1 font-weight-medium text-primary mr-2"
                  >
                    TOTAL PEDIDOS:
                  </span>

                  <span>{{ customerHistory?.total_orders ?? 0 }}</span>
                </div>

                <div class="d-flex">
                  <span
                    class="text-body-1 font-weight-medium text-primary mr-2"
                  >
                    TOTAL TOTAL:
                  </span>

                  <UiToLocaleString :value="customerHistory?.total_value" />
                </div>
              </div>
            </v-col>
          </v-row>

          <span class="text-body-1 font-weight-medium text-primary">
            PREFERENCIA DE COMPRA
          </span>

          <ClientOnly>
            <v-row v-if="customerHistory">
              <v-col cols="6">
                <BrandQuantity :data="customerHistory?.brands ?? []" />
              </v-col>

              <v-col cols="6">
                <BrandValue :data="customerHistory?.brands ?? []" />
              </v-col>

              <v-col cols="6">
                <DeviceQuantity :data="customerHistory?.devices ?? []" />
              </v-col>

              <v-col cols="6">
                <DeviceValue :data="customerHistory?.devices ?? []" />
              </v-col>
            </v-row>
          </ClientOnly>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
