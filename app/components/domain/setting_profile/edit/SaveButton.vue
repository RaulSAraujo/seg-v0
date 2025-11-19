<script lang="ts" setup>
import type { NewPermissions } from "~/interfaces/Group";

const props = defineProps<{
  id: number;
  permissions: NewPermissions[];
}>();

const emit = defineEmits(["close"]);

const { $customFetch } = useNuxtApp();

const loadingSave = ref(false);

const save = async () => {
  loadingSave.value = true;

  const permissionListId = props.permissions
    .flatMap((permission) => {
      return permission.pages.flatMap((page) => {
        return page.routes.flatMap((route) => {
          const changedPermissions = route.methods.flatMap((method) => {
            if (method.initial_value_permission != method.has_permission) {
              return {
                id: method.id,
                has_permission: method.has_permission,
              };
            }
          });

          const subChangedPermissions = route.subpermissions.flatMap((sub) => {
            const subPermission = sub.methods.flatMap((method) => {
              if (method.initial_value_permission != method.has_permission) {
                return {
                  id: method.id,
                  has_permission: method.has_permission,
                };
              }
            });

            const subSubPermission = sub.subpermissions.flatMap((subSub) => {
              return subSub.methods.flatMap((method) => {
                if (method.initial_value_permission != method.has_permission) {
                  return {
                    id: method.id,
                    has_permission: method.has_permission,
                  };
                }
              });
            });

            return [...subPermission, ...subSubPermission];
          });

          return [...changedPermissions, ...subChangedPermissions];
        });
      });
    })
    .filter((e) => e != null);

  const creationPermission = permissionListId
    .filter((e) => e.has_permission == true && e.id != 0)
    .map((e) => e.id);

  const destroyPermission = permissionListId
    .filter((e) => e.has_permission == false && e.id != 0)
    .map((e) => e.id);

  try {
    const res = await $customFetch<{ message: string }>(
      "group/group-permissions-methods/bulk",
      {
        method: "PUT",
        body: {
          group_id: props.id,
          methods_to_create: creationPermission,
          methods_to_delete: destroyPermission,
        },
      }
    );

    $toast().success(res.message);

    emit("close");

    loadingSave.value = false;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);

    loadingSave.value = false;
  }
};
</script>

<template>
  <v-btn
    class="mb-2"
    base-color="primary"
    width="8vw"
    variant="flat"
    text="SALVAR"
    :loading="loadingSave"
    @click="save"
  />
</template>
