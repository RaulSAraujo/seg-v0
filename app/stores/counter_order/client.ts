import type { Row } from "~/interfaces/Client";

export const useCounterOrderClientStore = defineStore("counter_order_client", () => {
    const initialCustomerData = {
        id: 0,
        erp_client_id: 0,
        name: "",
        gender: "",
        type: false,
        cpf_cnpj: "",
        identity_number: "",
        born_date: null,
        email: "",
        number1: "",
        identifier_number1: "",
        number2: "",
        identifier_number2: "",
        number3: "",
        identifier_number3: "",
        flag_client: 0,
        observation: "",
        official_email: null,
        validated_email: false,
        phone_mercado_pago: null,
        created_at: "",
        updated_at: "",
    };

    const customerData = ref<Row>({ ...initialCustomerData });

    const set = (client: Row) => {
        Object.entries(client).forEach(([key, value]) => {
            if (key in customerData.value) {
                ((customerData.value as unknown) as Record<string, unknown>)[key] = value;
            }
        });
    }

    const resetProps = () => {
        customerData.value = { ...initialCustomerData };
    }

    return {
        set,
        resetProps,
        customerData,
    }
})