<script lang="ts" setup>
import type { GroupID } from "~/interfaces/Group";

const props = defineProps<{
  fakeMethod: boolean;
  hasPermission: boolean;
  routes: GroupID;
  methodApi: string;
}>();

const emit = defineEmits(["update"]);

const comp = computed({
  get: () => {
    const value = props.routes.subpermissions.some((route) => {
      const methods = route.methods.filter(
        (method) => method.name == props.methodApi
      );

      return methods.some((method) => {
        const hasPermission = Object.prototype.hasOwnProperty.call(
          method,
          "has_permission"
        );

        return hasPermission ? method.has_permission : true;
      });
    });

    if (props.hasPermission == false) {
      emit("update", value);

      return value;
    }

    return props.hasPermission;
  },
  set: (newValue: boolean) => {
    emit("update", newValue);

    props.routes.subpermissions.forEach((route) => {
      const find = route.methods.find((e) => e.name == props.methodApi);

      if (find && !find.fake_method) {
        find.has_permission = newValue;
      }

      route.subpermissions.forEach((subRoute) => {
        const find = subRoute.methods.find((e) => e.name == props.methodApi);

        if (find && !find.fake_method) {
          find.has_permission = newValue;
        }

        subRoute.subpermissions.forEach((subSubRoute) => {
          const find = subSubRoute.methods.find(
            (e) => e.name == props.methodApi
          );

          if (find && !find.fake_method) {
            find.has_permission = newValue;
          }
        });
      });
    });
  },
});
</script>

<template>
  <v-checkbox
    v-if="!fakeMethod"
    v-model="comp"
    density="compact"
    color="primary"
    base-color="primary"
    hide-details
  />

  <v-icon v-else icon="mdi-block-helper" color="grey" size="20" />
</template>
