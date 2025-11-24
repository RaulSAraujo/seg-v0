<script lang="ts" setup>
import type {
  IPAccessList,
  Row,
} from "~/interfaces/IpAccessList";

const { data, status } = $useApi<Row[]>("ip-access-list", {
  key: "ip-access-list",
  getCachedData(key, nuxtApp) {
    return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
  },
  transform: (fetchData) => {
    return (fetchData as unknown as IPAccessList).rows;
  },
});

const remove = (id: number) => {
  const index = data.value!.findIndex((e) => e.id == id);

  if (index != -1) {
    data.value?.splice(index, 1);
  }
};

defineExpose({ data });
</script>

<template>
  <div v-if="status == 'success'">
    <v-list>
      <v-list-item
        v-for="item of data"
        :key="item.id"
        :title="item.description"
        :subtitle="item.ip_address"
      >
        <template #append>
          <AccessListDeleteAuthorization
            :id="item.id"
            @remove="remove($event)"
          />
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>
