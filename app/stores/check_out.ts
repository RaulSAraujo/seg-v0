import type { UserAnalysis } from '~/interfaces/UserAnalysis';
import type { Checkout, ListProductsOrder } from '~/interfaces/Checkout';
import type { Row } from '~/interfaces/SalesOrder'

export const useCheckOutStore = defineStore("checkout", () => {

  const dialog = ref<boolean>(false)

  const ecomOrderId = ref<string>('')

  const products = ref<ListProductsOrder[]>([])

  const box = ref<string>('');

  const pointSale = ref<string>('')

  const colorSeller = ref<string>('')

  const { capitalizeFirstLetter } = useCapitalize();

  function eventAlert(data: { message: string; priority: string }) {
    if (data.priority == "low") {
      $toast().info(capitalizeFirstLetter(data.message));
    }

    if (data.priority == "medium") {
      $toast().warning(capitalizeFirstLetter(data.message));
    }

    if (data.priority == "high") {
      $toast().error(capitalizeFirstLetter(data.message));
    }
  };

  function eventProductCountData(data: Checkout) {
    ecomOrderId.value = data.ecomOrderId;

    pointSale.value = data.pointSale;

    products.value = data.listProductsOrder;

    box.value = data.orderBox.box;

    colorSeller.value = data.colorSeller;

    dialog.value = true;
  };

  function eventAccountedProduct(data: ListProductsOrder) {
    const product = useArrayFind(products, (e) => e.name == data.name).value;

    product!.countedQuantity += 1;
  };

  function eventInterruptedFlow() {
    const { $customFetch, $config } = useNuxtApp()

    const { data: user } = useAuth();

    $customFetch(`checkout/interrupted-flow`, {
      baseURL: $config.public.base_url_web_socket,
      method: "POST",
      query: {
        user_id: user.value?.id,
      }
    });
  }

  const tableStore = useTableStore();
  const { items } = storeToRefs(tableStore);

  function eventHistory(data: Row) {
    items.value.splice(0, 0, data);
  }

  const dateUserAnalysis = ref('');

  const itemsUserAnalysis = ref<UserAnalysis>()

  const loadingUserAnalysis = ref(false)

  return {
    dialog,
    ecomOrderId,
    products,
    box,
    pointSale,
    colorSeller,
    eventAlert,
    eventProductCountData,
    eventAccountedProduct,
    eventInterruptedFlow,
    eventHistory,
    dateUserAnalysis,
    itemsUserAnalysis,
    loadingUserAnalysis,
  }
})
