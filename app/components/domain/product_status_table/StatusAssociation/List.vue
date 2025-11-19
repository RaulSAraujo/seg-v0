<script setup lang="ts">
import type { Row } from "~/interfaces/Pstatus";

defineOptions({
  name: "ProductStatusTableStatusAssociationList",
});

defineProps<{
  data: Row[];
}>();

defineEmits(["switch"]);
</script>

<template>
  <v-virtual-scroll
    :items="data"
    min-height="400"
    style="
      overflow: auto;
      --width-scrollbar: 5px;
      --track-color: rgba(0, 0, 0, 0);
      --thumb-color: #8080804d;
      --border-color: rgba(0, 0, 0, 0);
      --track-color-hover: #808080a3;
    "
  >
    <template #default="{ item, index }">
      <v-list-item :title="`${item.id}.${item.name}`">
        <template #append>
          <v-btn
            :text="item.active ? 'Remover' : 'Adicionar'"
            :color="item.active ? 'red' : 'blue'"
            variant="plain"
            size="small"
            @click="$emit('switch', index)"
          />
        </template>
      </v-list-item>

      <v-divider v-if="(index + 1) != data!.length" />
    </template>
  </v-virtual-scroll>
</template>
