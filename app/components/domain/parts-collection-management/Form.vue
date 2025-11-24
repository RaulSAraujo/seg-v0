<script lang="ts" setup>
defineProps<{
  title: string;
  methodRest: "POST" | "PUT";
}>();

const partsCollection = usePartsCollectionStore();
const { form } = storeToRefs(partsCollection);
</script>

<template>
  <div class="mx-4">
    <v-row dense justify="space-between">
      <v-col cols="2">
        <span class="text-h6 text-primary font-weight-black">
          {{ title }}
        </span>
      </v-col>

      <v-col cols="2">
        <PartsCollectionManagementInputSituation />
      </v-col>
    </v-row>

    <PartsCollectionManagementFormServiceOrder :method-rest="methodRest" />

    <PartsCollectionManagementFormGestion v-if="methodRest == 'PUT'" />

    <div class="d-flex align-center my-4">
      <span class="text-h6">APARELHO</span>

      <v-divider class="ml-2" />
    </div>

    <PartsCollectionManagementFormDevice />

    <div class="d-flex align-center my-4">
      <span class="text-h6">PRODUTOS</span>

      <v-divider class="ml-2" />
    </div>

    <PartsCollectionManagementTableProducts v-if="methodRest == 'POST'" />

    <PartsCollectionManagementFormProduct v-if="methodRest == 'PUT'" />

    <div class="d-flex align-center my-4">
      <span class="text-h6">RECUPERAÇÃO</span>

      <v-divider class="ml-2" />
    </div>

    <UiTextArea v-model="form.recovered_part" />

    <div class="d-flex align-center my-4">
      <span class="text-h6">OBSERVAÇÃO</span>

      <v-divider class="ml-2" />
    </div>

    <UiTextArea v-model="form.observation" counter="300" hide-details="auto" />
  </div>
</template>
