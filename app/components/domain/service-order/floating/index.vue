<script lang="ts" setup>
import SaveButton from "./SaveButton.vue";
import Octadesk from "./octadesk/Index.vue";
import SpeedDial from "./speed_dial/Index.vue";
import ApparatusDelta from "./apparatus_delta/Index.vue";

const { hasPermission } = usePermissions();

const serviceOrderStore = useServiceOrderStore();
const { type } = storeToRefs(serviceOrderStore);

const disabledSave = useState<boolean>("disabled-save-os", () => false);

const permissionBudgetCost = await hasPermission("service-order-octadesk");
</script>

<template>
  <div style="position: fixed; bottom: 30px; right: 30px; display: flex; gap: 10px">
    <Octadesk v-if="permissionBudgetCost" />

    <SpeedDial v-if="type != 17" />

    <ApparatusDelta v-else />

    <SaveButton v-if="!disabledSave" />
  </div>
</template>
