<script setup lang="ts">
import type { Row } from "~/interfaces/ProductLoan";

useHead({
  titleTemplate: `Controle de empréstimo - %s`,
});

definePageMeta({
  path: "/controle-emprestimo",
});

const { data } = useAuth();

const updateDevolution = (event: boolean, item: Row) => {
  item.devolution = event;

  if (event) {
    item.devolution_at = new Date();
    item.devolution_user_name = data.value!.name;
  } else {
    item.devolution_at = null;
    item.devolution_user_name = null;
  }
};

const updateConfirmReturn = (event: boolean, item: Row) => {
  item.confirm_return = event;

  if (event) {
    item.confirm_return_at = new Date();
    item.confirm_return_user_name = data.value!.name;
  } else {
    item.confirm_return_at = null;
    item.confirm_return_user_name = null;
  }
};
</script>

<template>
  <div class="mt-5">
    <span class="ml-5 text-h6 text-primary"> CONTROLE DE EMPRÉSTIMO </span>

    <UiFilter>
      <template #button-create>
        <ProductLoanCreation />
      </template>
    </UiFilter>

    <UiTable>
      <template #item.action="{ item }">
        <UiDelete :id="item.id" />
      </template>

      <template #item.devolution="{ item }">
        <UiCheckIcon
          :id="item.id"
          attr="devolution"
          :value="item.devolution"
          :enable-alert="true"
          :disabled="item.confirm_return === true"
          :body="{
            devolution_at: item.devolution ? null : undefined,
            devolution_user_name: item.devolution ? null : undefined,
          }"
          @update-value="updateDevolution($event, item)"
        />
      </template>

      <template #item.confirm_return="{ item }">
        <UiCheckIcon
          :id="item.id"
          attr="confirm_return"
          :value="item.confirm_return"
          :enable-alert="true"
          :disabled="item.confirm_return === true"
          :body="{
            confirm_return_at: !item.confirm_return ? null : undefined,
            confirm_return_user_name: !item.confirm_return ? null : undefined,
          }"
          @update-value="updateConfirmReturn($event, item)"
        />
      </template>

      <template #item.devolution_at="{ item }">
        <UiDateString
          :date="item.devolution_at"
          format-for="DD/MM/YYYY HH:mm:ss"
          format-from="YYYY-MM-DDTHH:mm:ss"
        />
      </template>

      <template #item.confirm_return_at="{ item }">
        <UiDateString
          :date="item.confirm_return_at"
          format-for="DD/MM/YYYY HH:mm:ss"
          format-from="YYYY-MM-DDTHH:mm:ss"
        />
      </template>
    </UiTable>
  </div>
</template>
