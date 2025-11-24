<script setup lang="ts">
import type {
  CustomFilterGrid,
  Row,
} from "~/interfaces/CustomFilterGrid";

const model = ref<string | undefined>(undefined);

const active = ref<Row[]>([]);

const deactivated = ref<Row[]>([]);

const { $customFetch } = useNuxtApp();

const loading = useLoadingIndicator();

const find = async () => {
  loading.start();

  try {
    const res = await $customFetch<CustomFilterGrid>("custom-filters", {
      method: "GET",
      query: {
        model: model.value,
      },
    });

    active.value = res.rows
      .filter((e) => e.initial_grid == true && e.align != " d-none")
      .sort((a, b) => a.sequence_filter! - b.sequence_filter!);

    deactivated.value = res.rows.filter((e) => e.initial_grid == false);

    loading.finish();
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);

    loading.finish();
  }
};

const add = (index: number, item: Row) => {
  active.value.push(item);

  deactivated.value.splice(index, 1);
};

const remove = (index: number, item: Row) => {
  active.value.splice(index, 1);

  deactivated.value.push(item);
};

const save = async () => {
  loading.start();

  try {
    const mapActive = active.value.map((e, i) => ({
      id: e.id,
      initial_grid: true,
      sequence_grid: i + 1,
    }));

    const mapDeactivated = deactivated.value.map((e) => ({
      id: e.id,
      initial_grid: false,
      sequence_grid: null,
    }));

    await $customFetch("custom-filters/bulk-update", {
      method: "PUT",
      body: [...mapActive, ...mapDeactivated],
    });

    $toast().success("Grids iniciais salvo com sucesso");

    loading.finish();
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);

    loading.finish();
  }
};

const clear = () => {
  model.value = undefined;

  active.value = [];

  deactivated.value = [];
};
</script>

<template>
  <v-dialog
    transition="dialog-top-transition"
    width="600px"
    @after-leave="clear"
  >
    <template #activator="{ props: dialog }">
      <v-tooltip
        location="top"
        text="DEFINIR GRIDS INICIAIS"
        content-class="bg-purple"
      >
        <template #activator="{ props: tooltip }">
          <v-btn
            v-bind="Object.assign({}, tooltip, dialog)"
            icon="mdi-table-cog"
            class="text-purple"
          />
        </template>
      </v-tooltip>
    </template>

    <template #default>
      <v-card title="GRIDS INICIAIS" rounded="xl">
        <template #text>
          <v-row dense>
            <v-col cols="8">
              <CustomFilterGridInputModel
                v-model="model"
                append-icon="mdi-magnify"
                @click:append="find"
              />
            </v-col>

            <v-spacer />

            <v-col cols="2">
              <v-btn
                text="Salvar"
                variant="flat"
                color="primary"
                base-color="primary"
                :disabled="active.length == 0"
                @click="save"
              />
            </v-col>
          </v-row>

          <CustomFilterGridInitCustomList
            v-if="active.length > 0"
            :active="active"
            :deactivated="deactivated"
            @add="add"
            @remove="remove"
          />
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>
