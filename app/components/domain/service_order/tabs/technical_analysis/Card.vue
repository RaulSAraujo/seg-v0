<script lang="ts" setup>
const Menu = defineAsyncComponent({
  loader: () => import("./Menu.vue"),
  delay: 5000,
});

interface Comment {
  id: number;
  user_id: number;
  description: string;
  created_at: Date | string;
}

const props = defineProps<{
  name: string;
  description: string;
  commentId: number;
  userId: number;
  createdAt: Date | string;
}>();

const { brDateWithTime } = useDateConversion();

const MenuCard = ref();

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
  <div class="text-break" @contextmenu.prevent="activeMenu">
    <div class="d-flex align-center mb-n5">
      <span class="text-h6 text-primary">{{ name }}</span>

      <span class="text-caption ml-2">
        {{ brDateWithTime(`${createdAt}`) }}
      </span>
    </div>

    <UiTiptap :editable="false" :remove-buttons="true" :content="description" />

    <Menu ref="MenuCard" />
  </div>
</template>

<style scoped>
:deep(.tiptap) {
  padding: 0px;
  margin: 20px 0px 0px 0px;
}
</style>
