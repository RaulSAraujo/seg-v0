<script lang="ts" setup>
import type { LayoutFilters } from "~/interfaces/CustomFilterGrid";

const props = defineProps<{
  id: number;
  model: string;
  attribute: string;
  active: boolean;
  type: string;
  layoutFilters: LayoutFilters | null;
}>();

const size = ref(2);

const ticksLabels = {
  0: "",
  1: "",
  2: "PQ",
  3: "",
  4: "",
  5: "MD",
  6: "",
  7: "",
  8: "LG",
  9: "",
  10: "",
  11: "",
  12: "XL",
};

interface Form {
  text: string;
  att: string;
  value: boolean;
}

const form = ref<Form[]>([]);

if (props.type == "STRING") {
  form.value.push(
    {
      text: "Valor aproximado",
      att: "approximate",
      value: false,
    },
    {
      text: "Adicionar um ícone para apagar conteúdo",
      att: "clearable",
      value: false,
    }
  );
}

if (props.type == "FLOAT" || props.type == "INTEGER") {
  form.value.push(
    {
      text: "Valor aproximado",
      att: "approximate",
      value: false,
    },
    {
      text: "Adicionar um ícone para apagar conteúdo",
      att: "clearable",
      value: false,
    }
  );
}

if (props.type == "ARRAY") {
  form.value.push(
    {
      text: "Apenas valores selecionáveis",
      att: "comboBox",
      value: false,
    },
    {
      text: "Aceita valores múltiplos",
      att: "multiple",
      value: false,
    },
    {
      text: "Adicionar um ícone para apagar conteúdo",
      att: "clearable",
      value: false,
    }
  );
}

if (props.type == "DATE") {
  form.value.push(
    {
      text: "Selecione mais de uma data",
      att: "range",
      value: false,
    },
    {
      text: "Adicionar um ícone para apagar conteúdo",
      att: "clearable",
      value: false,
    }
  );
}

const loading = ref<boolean>(false);

const { $customFetch } = useNuxtApp();

const save = async () => {
  try {
    loading.value = true;

    const map = form.value
      .map((f) => ({ [f.att]: f.value }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {});

    await $customFetch("custom-filters", {
      method: "PUT",
      body: {
        id: props.id,
        model: props.model,
        attribute: props.attribute.toLowerCase(),
        layout_filters: {
          size: size.value,
          ...map,
        },
      },
    });

    $toast().success("Layout do filtro atualizado com sucesso.");

    loading.value = false;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);

    loading.value = false;
  }
};
</script>

<template>
  <v-dialog transition="dialog-top-transition" width="30vw">
    <template #activator="{ props: dialog }">
      <v-btn
        v-bind="dialog"
        icon="mdi-animation-play-outline"
        variant="plain"
        size="small"
        density="comfortable"
        :disabled="active"
      />
    </template>

    <template #default>
      <v-sheet rounded="xl">
        <v-card
          elevation="0"
          title="INFORME O TAMANHO DO CAMPO"
          subtitle="Defina o tamanho do campo no filtro."
        >
          <template #text>
            <v-slider
              v-model="size"
              dense
              max="12"
              min="0"
              step="1"
              tick-size="4"
              show-ticks="always"
              color="primary"
              :ticks="ticksLabels"
              hide-details
            />
          </template>
        </v-card>

        <v-card
          v-if="form.length > 0"
          elevation="0"
          title="PERSONALIZE O FILTRO"
          subtitle="Adicione ou remova configurações do filtro."
        >
          <template #text>
            <v-row dense class="mx-2">
              <v-col v-for="f in form" :key="f.att" cols="12">
                <v-checkbox
                  v-model="f.value"
                  :label="f.text"
                  density="compact"
                  base-color="primary"
                  color="primary"
                  hide-details
                />
              </v-col>
            </v-row>
          </template>
        </v-card>

        <div class="d-flex justify-center pa-3">
          <v-btn
            class="mb-2"
            color="primary"
            width="8vw"
            variant="flat"
            text="SALVAR"
            @click="save"
          />
        </div>
      </v-sheet>
    </template>
  </v-dialog>
</template>
