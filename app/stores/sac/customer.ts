import type { Customer } from "~/interfaces/SacSale";
import type { CustomerHistory } from "~/interfaces/CustomerHistory";

export const useSacCustomerStore = defineStore("sac_customer", () => {
    const initialCustomerData: Customer = {
        id: 0,
        name: "",
        cnpj: "",
        cpf: "",
        rg: "",
        phone: "",
        cellphone: "",
        birth_date: new Date(),
        gender: "",
        email: "",
        total_orders: 0,
        company_name: "",
        blocked: false,
        ecom_customer_id: 0,
        last_purchase: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
    };

    const customerData = ref<Customer>({ ...initialCustomerData });

    const customerHistory = ref<CustomerHistory>();

    const set = (client: Customer) => {
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
        customerHistory
    }
})