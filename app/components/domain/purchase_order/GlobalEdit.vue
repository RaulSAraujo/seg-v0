<script lang="ts" setup>
import { updatePurchaseControlProduct } from "~/services/purchase-order.service";

const { isDate, brDate, databaseDate } = useDateConversion();

const purchaseOrderStore = usePurchaseOrderStore();
const { edit, loadingEdit } = storeToRefs(purchaseOrderStore);

const comp = computed({
  get: () => {
    const value = (edit.value.item as Record<string, unknown>)[
      edit.value.attr
    ] as string;

    if (edit.value.type == "date") return brDate(value) as string;
    if (edit.value.type == "number" || edit.value.type == "currency") {
      return parseFloat(value);
    }

    return value;
  },
  set: async (value) => {
    edit.value.newValue = value;

    if (edit.value.external) {
      edit.value.active = false;

      if (edit.value.save) {
        return edit.value.save();
      }
    }

    if (edit.value.type == "date") {
      edit.value.newValue = isDate(`${value}`)
        ? databaseDate(`${value}`)
        : null;
    }

    try {
      console.log(edit.value.url)

      await updatePurchaseControlProduct({
        id: edit.value.item?.id,
        [edit.value.attr]: edit.value.newValue,
      });

      edit.value.active = false;

      if (edit.value.externalUpdateText) {
        if (edit.value.updateText) {
          return edit.value.updateText(`${edit.value.newValue}`);
        }
      }

      (edit.value.item as Record<string, unknown>)[edit.value.attr] =
        edit.value.newValue;
    } catch (error) {
      const err = error as { statusText: string; data: { error: string } };

      $toast().error(`${err.data.error ?? err.statusText}`);
    }
  },
});

const maxNumberInput = computed(() => {
  if (edit.value.attr == "quantity_reserved") {
    return edit.value.item?.quantity_purchased;
  }

  return undefined;
});
</script>

<template>
  <v-menu
    v-model="edit.active"
    location-strategy="connected"
    :target="[edit.x, edit.y]"
    scroll-strategy="close"
    :close-on-content-click="false"
  >
    <v-confirm-edit v-model="comp">
      <template #default="{ model: proxyModel, actions }">
        <v-card class="mx-auto" width="250px">
          <template #text>
            <v-skeleton-loader v-if="loadingEdit" type="heading" />

            <div v-else>
              <v-text-field
                v-if="edit.type == 'string'"
                v-model="proxyModel.value"
                v-maska="'X'"
                density="compact"
                color="primary"
                hide-details
                clearable
                @click:clear="proxyModel.value = ''"
              />

              <UiNumberInput
                v-if="edit.type == 'number'"
                v-model="proxyModel.value"
                hide-details
                :min="1"
                :max="maxNumberInput"
              />

              <v-text-field
                v-if="edit.type == 'date'"
                v-model="proxyModel.value"
                v-maska="'##/##/####'"
                density="compact"
                color="primary"
                hide-details
                clearable
              />

              <UiCurrencyField
                v-if="edit.type == 'currency'"
                v-model="proxyModel.value"
              />

              <UiSelect
                v-if="edit.type == 'object'"
                v-model="proxyModel.value"
                density="compact"
                color="primary"
                clearable
                :items="[...edit.items]"
                :item-title="edit.itemTitle"
                :item-value="edit.itemValue"
                hide-details
              />
            </div>
          </template>

          <template #actions>
            <v-spacer />

            <component :is="actions" />
          </template>
        </v-card>
      </template>
    </v-confirm-edit>
  </v-menu>
</template>
