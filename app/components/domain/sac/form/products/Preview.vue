<script lang="ts" setup>
defineOptions({
  name: "SacProductsPreview",
});

interface Headers {
  title: string;
  key: string;
  width?: number;
  align?: "start" | "center" | "end";
  headerProps?: object;
  cellProps?: object;
}

const headers = ref<Headers[]>([
  { title: "Cód. fabricante", key: "manufacturer_code" },
  { title: "Cód. auxiliar", key: "auxiliary_code" },
  { title: "Descrição", key: "description" },
  { title: "Custo", key: "cost" },
  { title: "Preço", key: "price" },
  { title: "MC (R$)", key: "contribution_margin_price" },
  { title: "MB (%)", key: "gross_margin_percentage" },
  { title: "Preço c/desc", key: "discounted_price" },
  {
    title: "MC c/desc (R$)",
    key: "discounted_contribution_margin_price",
  },
  { title: "MB c/desc (%)", key: "discounted_gross_margin_percentage" },
  { title: "Margem", key: "is_valid_margin", align: "center" },
  { title: "Desc. und", key: "price_difference" },
  { title: "Desc. total", key: "price_difference_total" },
]);

const sacStore = useSacStore();
const { paymentType } = storeToRefs(sacStore);

const sacProductsStore = useSacProductsStore();
const { products } = storeToRefs(sacProductsStore);

const activeDiscount = computed(
  () =>
    paymentType.value == "À VISTA" ||
    paymentType.value == "PARCELADO C/ DESC" ||
    paymentType.value == "FATURADO C/ DESC"
);

const customColorInHeader = (value: string) => {
  if (value == "discounted_price") return "text-primary";
  if (value == "discounted_contribution_margin_price") return "text-primary";
  if (value == "discounted_gross_margin_percentage") return "text-primary";
};
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="90vw">
    <template #activator="{ props: dialog }">
      <v-btn
        v-bind="dialog"
        class="mr-2"
        color="primary"
        icon="mdi-eye"
        variant="plain"
      />
    </template>

    <template #default>
      <v-card rounded="xl">
        <template #text>
          <v-data-table
            :headers="headers"
            :items="products"
            items-per-page="-1"
            hide-default-footer
            disable-sort
          >
            <template #headers="{ headers: dataHeaders }">
              <tr>
                <th
                  v-for="header in dataHeaders[0]"
                  :key="header.key!"
                  :class="customColorInHeader(header.key!)"
                >
                  {{ header.title }}
                </th>
              </tr>
            </template>

            <template #item.description="{ item }">
              <UiTooltip :text="item.description" :vw="10" />
            </template>

            <template #item.price="{ item }">
              <UiToLocaleString :value="item.price" />
            </template>

            <template #item.cost="{ item }">
              <UiToLocaleString :value="item.cost" />
            </template>

            <template #item.contribution_margin_price="{ item }">
              <UiToLocaleString :value="item.contribution_margin_price" />
            </template>

            <template #item.discounted_price="{ item }">
              <UiToLocaleString
                v-if="activeDiscount"
                :value="item.discounted_price"
              />
            </template>

            <template #item.discounted_contribution_margin_price="{ item }">
              <UiToLocaleString
                v-if="activeDiscount"
                :value="item.discounted_contribution_margin_price"
              />
            </template>

            <template #item.discounted_gross_margin_percentage="{ item }">
              <span v-if="activeDiscount">
                {{ item.discounted_gross_margin_percentage }}
              </span>
            </template>

            <template #item.is_valid_margin="{ item }">
              <div v-if="activeDiscount">
                <v-icon
                  v-if="item.is_valid_margin"
                  icon="mdi-minus"
                  color="primary"
                />

                <v-icon v-else icon="mdi-chevron-triple-down" color="red" />
              </div>
            </template>

            <template #item.price_difference="{ item }">
              <UiToLocaleString
                v-if="activeDiscount"
                :value="item.price_difference"
              />
            </template>

            <template #item.price_difference_total="{ item }">
              <UiToLocaleString
                v-if="activeDiscount"
                :value="item.price_difference_total"
              />
            </template>
          </v-data-table>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
.some-other-style {
  background: blue;
}
.my-header-style {
  color: #6f8fb9;
}
</style>
