<script lang="ts" setup>
const dialog = useState<boolean>("active-prompt", () => false);

const mensagens = useState<string[]>("force-sync-mensagens", () => []);
</script>

<template>
  <v-dialog v-model="dialog" width="400">
    <v-card
      title="Mensagens"
      color="black"
      rounded="xl"
      height="72vh"
      style="overflow-y: scroll"
    >
      <template #text>
        <div class="mb-5">
          <div v-for="(msg, i) in mensagens" :key="i">
            <v-row no-gutters justify="space-between" align="center">
              <span class="cmdText">
                {{ msg }}
              </span>
            </v-row>
          </div>
        </div>
      </template>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.cmdText {
  font-family: "Space Mono";
  font-size: 12px;
  letter-spacing: 1px;
  color: white;
  background-color: black;
}

::-webkit-scrollbar {
  width: 0px;
  height: 15px;
  overflow: scroll;
}

::-webkit-scrollbar-track {
  background: #1e1e1e;
  border-left: 1px solid #2c2c2c00;
}

::-webkit-scrollbar-thumb {
  background: #313030;
  border: solid 3px #1e1e1e;
  border-radius: 7px;
}

::-webkit-scrollbar-thumb:hover {
  background: #353535;
}
</style>
