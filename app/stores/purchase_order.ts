import type { GlobalEdit, GlobalEditEvent } from "~/interfaces/PurchaseControl";

export const usePurchaseOrderStore = defineStore("purchase_order", () => {
  const statusLimit = ref<boolean>(false);

  const invoiceEmpty = ref<boolean>(false);

  const activeEventSourceXml = ref<boolean>(false)

  const initialEdit = {
    item: null,
    active: false,
    x: 0,
    y: 0,
    type: '',
    attr: '',
    url: '',
    items: [],
    itemTitle: '',
    itemValue: '',
    external: false,
    save: undefined,
    newValue: undefined,
    externalUpdateText: false,
    updateText: undefined
  }

  const edit = ref<GlobalEdit>({ ...initialEdit })

  const loadingEdit = ref(true)

  const showEdit = (event: GlobalEditEvent & { mouseEvent: MouseEvent }) => {
    const { mouseEvent, attr, item, type, external, save, externalUpdateText, updateText, items, itemTitle, itemValue, } = event

    if (!(mouseEvent instanceof MouseEvent) || !type || !attr) {
      return $toast().error("Erro ao construir component.");
    }

    loadingEdit.value = true

    edit.value.active = false;

    edit.value.x = mouseEvent.clientX;
    edit.value.y = mouseEvent.clientY;

    edit.value.active = true;

    edit.value.item = item;

    edit.value.type = type;

    edit.value.attr = attr;

    edit.value.external = external;

    edit.value.items = items

    edit.value.itemTitle = itemTitle

    edit.value.itemValue = itemValue

    edit.value.save = save

    edit.value.externalUpdateText = externalUpdateText

    edit.value.updateText = updateText

    setTimeout(() => {
      loadingEdit.value = false
    }, 500);
  };


  return {
    statusLimit,
    invoiceEmpty,
    activeEventSourceXml,
    edit,
    loadingEdit,
    showEdit,
  }
})
