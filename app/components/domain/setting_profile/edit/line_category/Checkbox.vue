<script lang="ts" setup>
import type { NewPermissions } from "~/interfaces/Group";

const props = defineProps<{
  hasPermission: boolean;
  permission: NewPermissions;
  methodApi: string;
}>();

const emit = defineEmits(["update"]);

const comp = computed({
  get: () => {
    const value = props.permission.pages.every((route) => {
      const method = route.methods.find(
        (e) => e.name == props.methodApi && !e.fake_method
      );

      return method?.has_permission;
    });

    emit("update", value);

    return value;
  },
  set: (newValue: boolean) => {
    emit("update", newValue);

    props.permission.pages.forEach((page) => {
      const findPage = page.methods.find((e) => e.name == props.methodApi);

      if (findPage && !findPage.fake_method) {
        findPage.has_permission = newValue;
      }

      page.routes.forEach((route) => {
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
    });
  },
});

const onlyFake = () => {
  const value = props.permission.pages.every((page) => {
    return page.routes.every((route) => {
      const method = route.methods.find(
        (method) => method.name == props.methodApi
      );

      return method?.fake_method;
    });
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
