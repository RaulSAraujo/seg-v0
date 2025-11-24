<script lang="ts" setup>
import BtnToSend from "./BtnToSend.vue";
import BtnPending from "./BtnPending.vue";
import BtnInTransfer from "./BtnInTransfer.vue";
import BtnPreProcess from "./BtnPreProcess.vue";
import BtnInSeparation from "./BtnInSeparation.vue";
import { useEventSourceSalesOrdersSeparation } from "../../composables/useEventSource";

defineOptions({
  name: "SeparationRequestsStatus",
});

defineEmits(["active"]);

const { statusCount, setupEventSource } = useEventSourceSalesOrdersSeparation();

setupEventSource();
</script>

<template>
  <div class="d-flex justify-end">
    <BtnPreProcess :pre-process="statusCount?.pre_process || 0" />

    <BtnToSend
      :to-send="statusCount?.ZN || 0"
      @active="$emit('active', $event)"
    />

    <BtnInSeparation
      :in-separation="statusCount?.ZQ || 0"
      @active="$emit('active', $event)"
    />

    <BtnInTransfer
      :in-transfer="statusCount?.ZP || 0"
      @active="$emit('active', $event)"
    />

    <BtnPending
      :pending="statusCount?.ZE || 0"
      @active="$emit('active', $event)"
    />
  </div>
</template>
