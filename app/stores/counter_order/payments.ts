import type { FormPayment, CounterOrderPayment } from "~/interfaces/CounterOrder";

export const useCounterOrderPaymentsStore = defineStore("counter_order_payments", () => {
    const initialFormPayment = {
        payments_methods_id: null,
        payment_value: "",
        effective_date: null,
        authorization: "",
    };

    const form = ref<FormPayment>({ ...initialFormPayment });

    const payments = ref<CounterOrderPayment[]>([]);

    const set = (orderPayments: CounterOrderPayment[]) => {
        payments.value = orderPayments;
    }

    const resetProps = () => {
        payments.value = [];
        form.value = { ...initialFormPayment };
    }

    return {
        set,
        form,
        payments,
        resetProps,
    }
})