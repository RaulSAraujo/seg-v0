<script lang="ts" setup>
import type { PAvailabilityHistory } from "~/interfaces/AvailabilityHistory";

defineProps<{
  availability: number | null | undefined;
  availabilityToTextMap: Record<number, string>;
  pavailabilityHistories?: PAvailabilityHistory[];
}>();

const { $dayjs } = useNuxtApp();
</script>

<template>
  <div>
    <span class="text-body-2">
      ATUAL:
      {{ availabilityToTextMap[availability ?? 0] }}
    </span>

    <div v-if="pavailabilityHistories">
      <span
        v-for="(PAvailability, i) in pavailabilityHistories.slice().reverse()"
        :key="i"
        class="text-caption"
      >
        <p v-if="i < 5">
          {{ availabilityToTextMap[PAvailability.availability_id] }} -
          {{
            $dayjs(PAvailability.availability_at).isValid()
              ? $dayjs(PAvailability.availability_at).format(
                  "DD/MM/YYYY HH:mm:ss"
                )
              : ""
          }}
        </p>
      </span>
    </div>
  </div>
</template>
