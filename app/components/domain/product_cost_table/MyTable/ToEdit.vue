<script setup lang="ts">
import { updateQuotationPack } from "~/services/product-cost-table.service";

defineEmits(["disable"]);

const dayjs = useDayjs();

const productStore = useProductStore();
const { product, costTableIndex, availabilityMap, productQuotations } =
  storeToRefs(productStore);

const loading = ref<boolean>(false);
const costChanged = ref<boolean>(false);

const quotation = ref(productQuotations.value[costTableIndex.value]);

const { data } = useProductSuppliers({ lazy: true });

const ChangeDateAndAvailabilityDate = () => {
  quotation.value!.availability_at = dayjs().format("DD/MM/YYYY");

  quotation.value!.cost_at = dayjs().format("DD/MM/YYYY");

  costChanged.value = true;
};

const updateQuotation = async () => {
  if (!product.value || !quotation.value) return;

  loading.value = true;

  try {
    await updateQuotationPack(
      quotation.value,
      product.value.name || "",
      costChanged.value
    );

    $toast().success("Sucesso em atualizar a cotação.");
  } catch (error) {
    const err = error as { statusText: string; name: string };

    $toast().error(`${err.statusText ?? err.name}`);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  if (!quotation.value) return;

  if (quotation.value.cost_at && dayjs(quotation.value.cost_at).isValid()) {
    quotation.value.cost_at = dayjs(quotation.value.cost_at).format(
      "DD/MM/YYYY"
    );
  }

  if (
    quotation.value.availability_at &&
    dayjs(quotation.value.availability_at).isValid()
  ) {
    quotation.value.availability_at = dayjs(
      quotation.value.availability_at
    ).format("DD/MM/YYYY");
  }
});
</script>

<template>
  <v-dialog
    :retain-focus="false"
    width="80%"
    transition="dialog-top-transition"
  >
    <v-sheet class="rounded-xl">
      <v-container v-if="quotation">
        <div class="d-flex flex-row my-2">
          <span class="text-h5 blue white--text">
            EDITAR TABELA DE CUSTO ID.{{ quotation.id }}
          </span>
        </div>

        <v-row dense>
          <v-col cols="6" sm="4" md="3" lg="3">
            <UiTextField
              v-model="product.name"
              label="Codigo de fabricante"
              :disabled="true"
              :hide-details="true"
            />
          </v-col>

          <v-col cols="6" sm="4" md="2" lg="3">
            <UiCombobox
              v-model="quotation.supplier_id"
              label="Fornecedor"
              :items="data ?? []"
              item-title="name"
              item-value="id"
              :hide-details="true"
              :multiple="false"
            />
          </v-col>

          <v-col cols="3" sm="4" md="2" lg="2">
            <v-tooltip location="top" color="blue">
              <template #activator="{ props }">
                <UiCurrencyField
                  v-model="quotation.cost"
                  v-bind="props"
                  label="Custo"
                  :hide-details="true"
                  @update:model-value="ChangeDateAndAvailabilityDate"
                />
              </template>

              <span>
                Ao alterar atualizará a data de custo e disponibilidade
              </span>
            </v-tooltip>
          </v-col>

          <v-col cols="3" sm="2" md="2" lg="1">
            <UiTextField
              v-model="quotation.lead_time"
              label="Lead time"
              :hide-details="true"
            />
          </v-col>

          <v-col cols="6" sm="5" md="3" lg="3">
            <UiSelect
              v-model="quotation.availability"
              label="Disponibilidade"
              :items="availabilityMap"
              item-title="title"
              item-value="value"
              @update:model-value="
                quotation.availability_at = dayjs().format('DD/MM/YYYY')
              "
            />
          </v-col>

          <v-col cols="6" sm="5" md="2" lg="3">
            <UiDatePicker
              v-model="quotation.cost_at"
              label="Data alteração de custo"
              :clearable="false"
              :multiple="false"
              @save="quotation.cost_at = dayjs($event).format('DD/MM/YYYY')"
            />
          </v-col>

          <v-col cols="6" sm="5" md="2" lg="3">
            <UiDatePicker
              v-model="quotation.availability_at"
              label="Data alteração de disponibildade"
              :clearable="false"
              :multiple="false"
              @save="
                quotation.availability_at = dayjs($event).format('DD/MM/YYYY')
              "
            />
          </v-col>

          <v-col cols="6" sm="4" md="3" lg="3">
            <UiSwitch
              v-model="quotation.active"
              class="d-flex flex-row justify-center border-sm rounded-lg mx-1"
              label="Cotação ativa"
              :hide-details="true"
            />
          </v-col>

          <v-col cols="6" sm="4" md="3" lg="3">
            <UiTextField
              v-model="quotation.virtual_quantity"
              label="Estoque virtual"
              :hide-details="true"
            />
          </v-col>

          <v-col cols="6" sm="12" md="12" lg="12">
            <UiTextArea
              v-model="quotation.observation"
              label="Observação"
              :auto-grow="true"
              :hide-details="true"
            />
          </v-col>
        </v-row>

        <v-divider />

        <v-card-actions>
          <v-spacer />

          <v-btn
            color="primary"
            width="8vw"
            variant="flat"
            :loading="loading"
            @click="updateQuotation"
          >
            SALVAR
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-sheet>
  </v-dialog>
</template>
