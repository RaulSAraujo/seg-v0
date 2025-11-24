<script lang="ts" setup>
import type { Form } from "~/interfaces/AutomationOrderStatus";

defineProps<{
  loading: boolean;
}>();

defineEmits(["init", "close"]);

const initialForm = {
  current_status: null,
  target_status: null,
};

const form = ref<Form>({ ...initialForm });
</script>

<template>
  <div class="mt-2">
    <v-row dense>
      <v-col cols="12">
        <AutomationOrderStatusInputStatus
          v-model="form.current_status"
          label="Status inicial"
        />
      </v-col>

      <v-col cols="12">
        <AutomationOrderStatusInputStatus
          v-model="form.target_status"
          label="Status final"
        />
      </v-col>
    </v-row>

    <div class="mt-2 d-flex justify-end">
      <v-btn
        class="mr-2"
        base-color="grey"
        text="CANCELAR"
        variant="outlined"
        @click="$emit('close')"
      />

      <v-btn
        base-color="primary"
        text="INICIAR"
        :loading="loading"
        @click="$emit('init', form)"
      />
    </div>
  </div>
</template>
