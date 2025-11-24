<script setup lang="ts">
import type {
  GroupID,
  NewPermissions,
  NewArrayOrdering,
} from "~/interfaces/Group";

const props = defineProps<{
  id: number;
  groupName: string;
}>();

const dialog = ref(false);

const permissions = ref<NewPermissions[]>([]);

const modelStore = useModelStore();
const { models } = storeToRefs(modelStore);

const { $customFetch } = useNuxtApp();

const loading = ref(false);

const getPermissionByGroup = async () => {
  try {
    const res = await $customFetch<GroupID[]>(`group/permissions/by-group`, {
      query: {
        group_id: props.id,
      },
    });

    return res;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  }
};

const generatingNewArrayOrdering = (res: GroupID[]) => {
  const mapOthers: GroupID[] = [];

  const map = res
    .map((route) => {
      const find = models.value.find(
        (e) =>
          e.entity_name == route.source_model || e.entity_name == route.resource
      );

      if (find) {
        return {
          page_name: find.page_title,
          category: find.menu,
          route: route,
        };
      } else {
        mapOthers.push(route);

        return null;
      }
    })
    .filter((e) => e != null);

  mapOthers.forEach((e) => {
    map.push({
      page_name: e.resource || e.source_model || e.back_url,
      category: "Outros",
      route: e,
    });
  });

  return map.sort((a, b) => a.page_name.localeCompare(b.page_name));
};

const groupingReturnMap = (array: NewArrayOrdering[]) => {
  const map = new Map<string, NewPermissions>();

  array.forEach((item) => {
    const { category } = item;

    if (!map.has(category)) {
      map.set(category, {
        category: category,
        methods: [
          {
            name: "get",
            has_permission: false,
          },
          {
            name: "post",
            has_permission: false,
          },
          {
            name: "put",
            has_permission: false,
          },
          {
            name: "delete",
            has_permission: false,
          },
          {
            name: "patch",
            has_permission: false,
          },
        ],
        pages: [],
      });
    }

    map.get(category)?.pages.push({
      page_name: item.page_name,
      methods: [
        {
          name: "get",
          has_permission: false,
        },
        {
          name: "post",
          has_permission: false,
        },
        {
          name: "put",
          has_permission: false,
        },
        {
          name: "delete",
          has_permission: false,
        },
        {
          name: "patch",
          has_permission: false,
        },
      ],
      routes: [item.route],
    });
  });

  return map;
};

watch(
  () => dialog.value,
  async () => {
    if (dialog.value) {
      loading.value = true;

      const res = await getPermissionByGroup();

      if (res) {
        const array = generatingNewArrayOrdering(res);

        const map = groupingReturnMap(array);

        permissions.value = Array.from(map.values()).sort((a, b) => {
          if (a.category === "Outros") return 1;
          if (b.category === "Outros") return -1;
          return a.category.localeCompare(b.category);
        });
      }

      loading.value = false;
    }
  }
);
</script>

<template>
  <v-dialog v-model="dialog" transition="dialog-top-transition" width="1300px">
    <template #activator="{ props: dialogProps }">
      <v-btn
        v-bind="dialogProps"
        icon="mdi-pencil"
        variant="plain"
        size="small"
        color="primary"
        density="comfortable"
      />
    </template>

    <v-card rounded="xl">
      <template #title>
        <span class="text-h5 text-primary font-weight-black">
          {{ groupName.toUpperCase() }}
        </span>
      </template>

      <template #append>
        <SettingProfileEditSaveButton
          :id="props.id"
          :permissions="permissions"
          @close="dialog = false"
        />
      </template>

      <template #text>
        <div v-if="!loading">
          <div class="mr-3">
            <SettingProfileEditHeader />

            <v-divider />
          </div>

          <div
            v-if="!loading"
            class="pr-2"
            style="
              height: 75vh;
              overflow-y: scroll;
              overflow-x: hidden;
              --width-scrollbar: 5px;
              --track-color: rgba(0, 0, 0, 0);
              --thumb-color: #8080804d;
              --border-color: rgba(0, 0, 0, 0);
              --track-color-hover: #808080a3;
            "
          >
            <div
              v-for="(permission, index) in permissions"
              :key="index"
              class="border-s-sm border-e-sm"
            >
              <SettingProfileEditLineCategory
                :label="`${index + 1}. ${permission.category}`"
                :permission="permission"
              />

              <div v-for="(page, i) in permission.pages" :key="i">
                <SettingProfileEditLinePage
                  :label="`${index + 1}.${i + 1} ${page.page_name}`"
                  :page="page"
                />

                <div
                  v-for="(route, indexRoutes) in page.routes"
                  :key="indexRoutes"
                >
                  <SettingProfileEditLineRoutes
                    :label="`${index + 1}.${i + 1}.${
                      parseInt(`${indexRoutes}`) + 1
                    }`"
                    :description="route.description || route.back_url"
                    :back-url="route.back_url"
                    :index="indexRoutes"
                    :length="page.routes.length"
                    :route="route"
                  />

                  <v-divider />

                  <div
                    v-for="(subpermissions, indexSub) in route.subpermissions"
                    :key="indexSub"
                  >
                    <SettingProfileEditLineSubRoutes
                      :label="`${index + 1}.${i + 1}.${
                        parseInt(`${indexRoutes}`) + 1
                      }.${parseInt(`${indexSub}`) + 1}`"
                      :description="
                        subpermissions.description || subpermissions.back_url
                      "
                      :back-url="subpermissions.back_url"
                      :index="indexSub"
                      :length="route.subpermissions.length"
                      :route="subpermissions"
                      :margin-left="11"
                    />

                    <v-divider />

                    <div
                      v-for="(
                        subSubPermission, indexSubSub
                      ) in subpermissions.subpermissions"
                      :key="indexSubSub"
                    >
                      <SettingProfileEditLineSubRoutes
                        :label="`${index + 1}.${i + 1}.${
                          parseInt(`${indexRoutes}`) + 1
                        }.${parseInt(`${indexSub}`) + 1}.${
                          parseInt(`${indexSubSub}`) + 1
                        }`"
                        :description="
                          subSubPermission.description ||
                          subSubPermission.back_url
                        "
                        :back-url="subSubPermission.back_url"
                        :index="indexSubSub"
                        :length="subpermissions.subpermissions.length"
                        :route="subSubPermission"
                        :margin-left="15"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <v-divider class="mr-3" />
        </div>

        <div v-else class="d-flex justify-center">
          <v-progress-circular indeterminate size="80" color="primary" />
        </div>
      </template>
    </v-card>
  </v-dialog>
</template>
