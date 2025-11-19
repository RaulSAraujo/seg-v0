<script lang="ts" setup>
import type { GroupID } from "~/interfaces/Group";

const props = defineProps<{
  routes: GroupID[];
  methodApi: string;
}>();

const emit = defineEmits(["update"]);

const comp = computed({
  get: () => {
    const value = props.routes.every((route) => {
      const method = route.methods.find(
        (method) => method.name == props.methodApi && !method.fake_method
      );

      if (!method) return true;

      return method.has_permission;
    });

    emit("update", value);

    return value;
  },
  set: (newValue: boolean) => {
    emit("update", newValue);

    props.routes.forEach((route) => {
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

const onlyFake = () => {
  const value = props.routes.every((route) => {
    const method = route.methods.find(
      (method) => method.name == props.methodApi
    );

    return method?.fake_method;
  });

  return value;
};
</script>

<template>
  <v-checkbox
    v-if="!onlyFake()"
    v-model="comp"
    density="compact"
    color="primary"
    base-color="primary"
    hide-details
  />

  <v-icon v-else icon="mdi-block-helper" color="grey" size="20" />
</template>
