import type { RowWithRelations } from "~/interfaces/SacSale";

export const useSacStore = defineStore("sac", () => {
  const seller = ref<string>();
  const saleDate = ref<string | Date | null>("");
  const status = ref<string>();
  const observation = ref<string>("");
  const paymentType = ref<string | null>();
  const ecomOrderId = ref<number | null>();
  const exportedTray = ref(false);

  function set(sac: RowWithRelations) {
    const { brDate } = useDateConversion();

    seller.value = sac.seller;
    status.value = sac.status;
    observation.value = sac.observation;
    paymentType.value = sac.payment_type;
    ecomOrderId.value = sac.ecom_order_id;
    exportedTray.value = sac.exported_tray;
    saleDate.value = brDate(`${sac.sale_date}`);

  }

  function resetProps() {
    seller.value = undefined;
    saleDate.value = "";
    status.value = undefined;
    observation.value = "";
    paymentType.value = undefined;
    ecomOrderId.value = undefined;
  }

  return {
    set,
    status,
    seller,
    saleDate,
    resetProps,
    observation,
    paymentType,
    ecomOrderId,
    exportedTray,
  };
});
