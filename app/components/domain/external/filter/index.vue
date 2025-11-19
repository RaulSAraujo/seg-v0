<script lang="ts" setup>
import Excel from "./Excel.vue";
import Region from "./input/Region.vue";
import ErpType from "./input/ErpType.vue";
import Supplier from "./input/Supplier.vue";
import Priority from "./input/Priority.vue";
import ErpSituation from "./input/ErpSituation.vue";

import type {
  GeneralReport,
  Row,
} from "~/interfaces/GeneralReport";

defineOptions({
  name: "ExternalFilter",
});

defineProps<{
  items: Row[];
  loading: boolean;
}>();

const emit = defineEmits(["loading", "set-items"]);

const dayjs = useDayjs();
const { $customFetch } = useNuxtApp();

interface Form {
  region: string[];
  city?: string;
  status: number[];
  type: number[];
  supplier: string[];
}

const form = reactive<Form>({
  region: [],
  city: undefined,
  status: [],
  type: [],
  supplier: [],
});

const search = async () => {
  emit("loading", true);

  const { rows } = await $customFetch<GeneralReport>("external-service-report");

  rows.sort((a, b) => dayjs(a.created_at).diff(b.created_at));

  rows.forEach((e) => (e.city = e.Client.ClientsAddresses[0]?.city));

  emit("set-items", []);

  const validation = Object.values(form).every(
    (e) => e == "" || e == undefined || (e as number[]).length == 0
  );

  if (validation) {
    emit("loading", false);

    emit("set-items", rows);

    return;
  }

  Object.entries(form).forEach(([key, value]) => {
    let filter = [] as Row[];
    if (typeof value == "object" && Array.isArray(value)) {
      filter = useArrayFilter(rows, (e: Row) => {
        return value.includes(e[key as keyof Row] as never);
      }).value;
    }

    if (typeof value == "string") {
      filter = useArrayFilter(rows, (e) => {
        return (e as unknown as Record<string, unknown>)[key] == value;
      }).value;
    }

    if (filter && filter.length > 0) {
      emit("set-items", filter);
    }
  });

  emit("loading", false);
};

const clear = () => {
  form.region = [];
  form.city = "";
  form.status = [];
  form.type = [];
  form.supplier = [];

  search();
};

search();
</script>

<template>
  <v-row dense class="pa-5">
    <v-col cols="3">
      <Region v-model="form.region" />
    </v-col>

    <v-col cols="3">
      <UiTextField v-model="form.city" label="Cidade" />
    </v-col>

    <v-col cols="3">
      <ErpSituation v-model="form.status" />
    </v-col>

    <v-col cols="3">
      <ErpType v-model="form.type" @like="form.type = $event" />
    </v-col>

    <v-col cols="3">
      <Supplier v-model="form.supplier" />
    </v-col>

    <v-col cols="3">
      <Priority
        :status="form.status"
        @priority="
          form.status = $event;

          search();
        "
      />
    </v-col>

    <v-spacer />
  </v-row>

  <div class="d-flex align-center justify-end mr-5 mb-5">
    <div>
      <v-btn class="mr-2" color="primary" @click="search"> BUSCAR </v-btn>

      <v-btn class="mr-2" variant="outlined" color="primary" @click="clear">
        Limpar Filtros
      </v-btn>

      <Excel :items="items" />
    </div>
  </div>
</template>
