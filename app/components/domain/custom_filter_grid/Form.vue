<script lang="ts" setup>
import type { Form } from "~/interfaces/CustomFilterGrid";

defineProps<{
  title: string;
}>();

defineEmits(["save"]);

const form = reactive<Form>({
  model: undefined,
  label: "",
  type: undefined,
  attribute: "",
  align: "start",
  width: 110,
  sortable: false,
  active: true,
  association: undefined,
  item_name: "",
  item_value: "",
  fixed_values: "",
});

const scrollContainer = ref();

const handleScroll = () => {
  const container = scrollContainer.value;
  const isAtTop = container.scrollTop === 0;
  const isAtBottom =
    Math.ceil(container.scrollHeight - container.scrollTop) ==
    container.clientHeight;

  if (!isAtTop || !isAtBottom) {
    container.classList.remove("has-scroll-bottom");

    container.classList.remove("has-scroll-top");

    if (isAtTop) {
      container.classList.add("has-scroll-bottom");
    }

    if (isAtBottom) {
      container.classList.add("has-scroll-top");
    }
  } else {
    container.classList.remove("has-scroll-bottom");

    container.classList.remove("has-scroll-top");
  }
};

watch(
  () => scrollContainer.value,
  () => {
    const container = scrollContainer.value;

    if (container) {
      container.classList.add("has-scroll-bottom");
    }
  }
);

defineExpose({ form });
</script>

<template>
  <v-card rounded="xl" :title="title">
    <template #text>
      <div
        ref="scrollContainer"
        class="scroll-container px-3 pt-2"
        @scroll="handleScroll"
      >
        <v-row dense>
          <v-col cols="12">
            <CustomFilterGridInputModel v-model="form.model" />
          </v-col>

          <v-col cols="12">
            <UiTextField
              v-model="form.label"
              label="Texto a ser exibido no campo (Label)"
            />
          </v-col>

          <v-col cols="12">
            <CustomFilterGridInputType v-model="form.type" />
          </v-col>

          <v-col cols="12">
            <UiTextField
              v-model="form.attribute"
              v-maska="'x'"
              label="Identificador da grid (Atributo)"
            />
          </v-col>

          <v-col cols="12">
            <CustomFilterGridCardAlign
              :value="form.align"
              @update="form.align = $event"
            />
          </v-col>

          <v-col>
            <CustomFilterGridSizeGrid
              :value="form.width"
              @update="form.width = $event"
            />
          </v-col>

          <v-col cols="12">
            <v-checkbox
              v-model="form.sortable"
              label="Será ordenável na grid ?"
              density="compact"
              base-color="primary"
              color="primary"
              hide-details
            />
          </v-col>

          <v-col cols="12">
            <v-checkbox
              v-model="form.active"
              label="Filtro ativo"
              density="compact"
              base-color="primary"
              color="primary"
              persistent-hint
              :hint="form.active ? 'Será exibido' : 'Será ocultado'"
            />
          </v-col>

          <v-col v-if="form.type == 'ARRAY'" cols="12">
            <CustomFilterGridCardAssociation
              :association="form.association"
              :item-name="form.item_name"
              :item-value="form.item_value"
              @update-association="form.association = $event"
              @update-item-name="form.item_name = $event"
              @update-item-value="form.item_value = $event"
            />

            <CustomFilterGridCardFixedAssociation
              :value="form.fixed_values"
              @update="form.fixed_values = $event"
            />
          </v-col>
        </v-row>
      </div>
    </template>

    <template #actions>
      <v-spacer />

      <v-btn
        class="mb-2"
        color="primary"
        width="8vw"
        variant="flat"
        text="SALVAR"
        @click="$emit('save', form)"
      />
      <v-spacer />
    </template>
  </v-card>
</template>

<style>
.scroll-container {
  height: 70vh;
  overflow-x: hidden;
  overflow-y: scroll;
  --width-scrollbar: 5px;
  --track-color: rgba(0, 0, 0, 0);
  --thumb-color: #8080804d;
  --border-color: rgba(0, 0, 0, 0);
  --track-color-hover: #808080a3;
}

.scroll-container.has-scroll-top {
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1) 20%,
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 0, 0, 1)
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 1) 20%,
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 0, 0, 1)
  );
}

.scroll-container.has-scroll-bottom {
  mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 1) 20%,
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 0, 0, 0)
  );
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 1) 20%,
    rgba(0, 0, 0, 1) 70%,
    rgba(0, 0, 0, 0)
  );
}
</style>
