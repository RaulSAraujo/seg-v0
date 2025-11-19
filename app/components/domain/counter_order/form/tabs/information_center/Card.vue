<script lang="ts" setup>
import Menu from './menu/Index.vue';
import Edit from './menu/Edit.vue';
import Delete from './menu/Delete.vue';

defineOptions({
  name: "CounterOrderInformationCenterCard",
});

const props = defineProps<{
  name: string;
  description: string;
  commentId: number;
  userId: number;
  createdAt: Date | string;
}>();

const { brDateWithTime } = useDateConversion();

const MenuCard = ref();

interface Comment {
  id: number;
  user_id: number;
  description: string;
  created_at: Date | string;
}

const comment = useState<Comment | null>("comment", () => null);

const activeMenu = (e: PointerEvent) => {
  MenuCard.value.contextMenu = false;
  MenuCard.value.x = e.clientX;
  MenuCard.value.y = e.clientY;
  MenuCard.value.contextMenu = true;

  comment.value = {
    id: props.commentId,
    user_id: props.userId,
    description: props.description,
    created_at: props.createdAt,
  };
};
</script>

<template>
  <v-card
    rounded="xl"
    border="primary md"
    color="transparent"
    @contextmenu.prevent="activeMenu"
  >
    <template #title>
      <span class="text-primary">{{ name }}</span>
    </template>

    <template #subtitle>
      <span class="text-subtitle-2">{{ brDateWithTime(`${createdAt}`) }}</span>
    </template>

    <template #text>
      <UiTiptap
        :editable="false"
        :remove-buttons="true"
        :content="description"
      />
    </template>
  </v-card>

  <Menu ref="MenuCard" />

  <Edit />

  <Delete />
</template>
