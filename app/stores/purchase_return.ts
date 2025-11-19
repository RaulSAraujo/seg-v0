import type { FileWithBase64 } from "~/interfaces/FileWithBase64";
import type { Row, PurchaseControlProduct, Form } from "~/interfaces/PurchaseReturn";

export const usePurchaseReturnStore = defineStore("purchase_return", () => {
  const initialForm = {
    id: undefined,
    purchase_control_product_id: 0,
    returning_quantity: 1,
    type: null,
    reason: "",
    warehouse: null,
    priority: false,
    invoice_issuance_date: null,
    return_status: "ABERTO",
    solicitation_number: null,
    returning_invoice_number: null,
    returning_invoice_date: null,
    returning_invoice_value: "0.0",
    packing_date: null,
    collection_date_limit: null,
    collection_date: null,
    refund_status: "PENDENTE",
    supplier: "",
    observation: "",
    refund_date: null,
  };

  const form = ref<Form>({ ...initialForm });

  const createAt = ref("");

  const products = ref<PurchaseControlProduct[]>([]);

  const initialFormProduct = {
    name: "",
    description: "",
    invoice: "",
  };

  const formProduct = ref<Partial<PurchaseControlProduct>>({ ...initialFormProduct });

  const files = ref<FileWithBase64[]>([]);

  function loadProps(dev: Row) {
    const { isDatabaseDate, brDate } = useDateConversion();

    if (typeof dev.created_at == 'string' && isDatabaseDate(dev.created_at)) {
      createAt.value = brDate(dev.created_at)
    }

    Object.entries(dev).forEach(([key, value]) => {
      if (key in form.value) {
        if (isDatabaseDate(value)) {
          ((form.value as unknown) as Record<string, unknown>)[key] = brDate(value);

          return;
        }

        ((form.value as unknown) as Record<string, unknown>)[key] = value;
      }
    });

    formProduct.value.name = dev.PurchaseControlProduct.name;
    formProduct.value.description = dev.PurchaseControlProduct.description;
    formProduct.value.invoice = dev.PurchaseControlProduct.invoice;
  }

  function clear() {
    form.value = { ...initialForm };
    formProduct.value = { ...initialFormProduct };
    products.value = [];
    files.value = [];
  }

  return {
    form,
    createAt,
    products,
    formProduct,
    files,
    loadProps,
    clear,
  };
});
