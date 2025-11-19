import type { ServiceOrderProduct, Form } from "~/interfaces/PartsCollectionManagement";

export const usePartsCollectionStore = defineStore("parts_collection", () => {
  const initialForm = {
    service_order_id: null,
    os_supplier: "",
    end_date_os: "",
    collection_date_os: "",
    name: "",
    description: "",
    quantity: 1,
    apparatus: "",
    model: "",
    serial_number: "",
    version: "",
    brand: "",
    type_warranty: "",
    warranty_supplier: "",
    used: false,
    recoverable: false,
    recovered_part: "",
    observation: "",
    warehouse_delivery_date: null,
    limit_date_storage: "",
    return_invoice: null,
    status: "PENDENTE",
    final_date: null,
    completion_deadline: null,
    storage_location: "",
    type: null,
    inches_apparatus: null,
    defect: "",
    solution: "",
    requested_collection_date: null,
  };

  const form = ref<Form>({ ...initialForm });

  const products = ref<ServiceOrderProduct[]>([]);

  const selected = ref<ServiceOrderProduct[]>([]);

  function clearProps() {
    form.value = { ...initialForm };
    products.value = [];
    selected.value = [];
  }

  return {
    form,
    products,
    selected,
    clearProps
  };
});
