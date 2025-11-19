import type { ErpOperators } from "~/interfaces/ErpOperators";
import type { Row, Form, PaymentsMethods } from "~/interfaces/CounterOrder";

interface AttendanceType {
  id: number;
  name: string;
}

interface OrderStatus {
  id: number;
  name: string;
}

export const useCounterOrderStore = defineStore("counter_order", () => {
  const initialForm: Form = {
    status: "00-ABERTO",
    attendance_type: null,
    seller: "",
    created_at: "",
    delivery_date: "",
    budget_status: null,
    discount: 0.0,
  }

  const form = ref<Form>({ ...initialForm });

  const operators = ref<ErpOperators | null>(null);

  // Cache de dados de lookup
  const erpOperatorsList = ref<ErpOperators[]>([]);
  const paymentMethodsList = ref<PaymentsMethods[]>([]);
  const attendanceTypesList = ref<AttendanceType[]>([]);
  const orderStatusesList = ref<OrderStatus[]>([]);

  // Estados de loading
  const loadingErpOperators = ref(false);
  const loadingPaymentMethods = ref(false);
  const loadingAttendanceTypes = ref(false);
  const loadingOrderStatuses = ref(false);

  // Flags de cache
  const loadedErpOperators = ref(false);
  const loadedPaymentMethods = ref(false);
  const loadedAttendanceTypes = ref(false);
  const loadedOrderStatuses = ref(false);

  function set(order: Row) {
    const { brDate } = useDateConversion();

    form.value.status = order.status;
    form.value.seller = order.User.name;
    form.value.budget_status = order.budget_status;
    form.value.discount = parseFloat(order.discount);
    form.value.attendance_type = order.attendance_type;
    form.value.created_at = brDate(`${order.created_at}`);
    form.value.delivery_date = brDate(`${order.delivery_date}`);
  }

  function resetProps() {
    operators.value = null;
    form.value = { ...initialForm };
  }

  /**
   * Busca lista de operadores ERP com cache
   */
  async function fetchErpOperators(force = false) {
    if (loadedErpOperators.value && !force) {
      return erpOperatorsList.value;
    }

    loadingErpOperators.value = true;

    try {
      const data = await $api<ErpOperators[]>('/counter-order/counter-order-payments/erp-operators');
      erpOperatorsList.value = data || [];
      loadedErpOperators.value = true;
      return erpOperatorsList.value;
    } catch (err) {
      throw err;
    } finally {
      loadingErpOperators.value = false;
    }
  }

  /**
   * Busca lista de métodos de pagamento com cache
   */
  async function fetchPaymentMethods(force = false) {
    if (loadedPaymentMethods.value && !force) {
      return paymentMethodsList.value;
    }

    loadingPaymentMethods.value = true;

    try {
      const data = await $api<PaymentsMethods[]>('/counter-order/payment-methods');
      paymentMethodsList.value = data || [];
      loadedPaymentMethods.value = true;
      return paymentMethodsList.value;
    } catch (err) {
      throw err;
    } finally {
      loadingPaymentMethods.value = false;
    }
  }

  /**
   * Busca lista de tipos de atendimento com cache
   */
  async function fetchAttendanceTypes(force = false) {
    if (loadedAttendanceTypes.value && !force) {
      return attendanceTypesList.value;
    }

    loadingAttendanceTypes.value = true;

    try {
      const data = await $api<AttendanceType[]>('/counter-order/attendance-type');
      attendanceTypesList.value = data || [];
      loadedAttendanceTypes.value = true;
      return attendanceTypesList.value;
    } catch (err) {
      throw err;
    } finally {
      loadingAttendanceTypes.value = false;
    }
  }

  /**
   * Busca lista de status de pedido com cache
   */
  async function fetchOrderStatuses(force = false) {
    if (loadedOrderStatuses.value && !force) {
      return orderStatusesList.value;
    }

    loadingOrderStatuses.value = true;

    try {
      const data = await $api<OrderStatus[]>('/counter-order/erp-order-status');
      orderStatusesList.value = data || [];
      loadedOrderStatuses.value = true;
      return orderStatusesList.value;
    } catch (err) {
      throw err;
    } finally {
      loadingOrderStatuses.value = false;
    }
  }

  return {
    set,
    form,
    operators,
    resetProps,
    // Novos métodos e dados
    erpOperatorsList: readonly(erpOperatorsList),
    paymentMethodsList: readonly(paymentMethodsList),
    attendanceTypesList: readonly(attendanceTypesList),
    orderStatusesList: readonly(orderStatusesList),
    loadingErpOperators: readonly(loadingErpOperators),
    loadingPaymentMethods: readonly(loadingPaymentMethods),
    loadingAttendanceTypes: readonly(loadingAttendanceTypes),
    loadingOrderStatuses: readonly(loadingOrderStatuses),
    fetchErpOperators,
    fetchPaymentMethods,
    fetchAttendanceTypes,
    fetchOrderStatuses,
  };
});
