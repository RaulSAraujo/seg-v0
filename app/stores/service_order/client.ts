import type { ClientData, Client } from "~/interfaces/ServiceOrder";

export const useServiceOrderClientStore = defineStore("service_order_client", () => {
    const clientId = ref<number>(0);

    const initialClientData = {
        id: undefined,
        erp_client_id: undefined,
        name: "",
        gender: null,
        type: null,
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
    };

    const clientData = ref<ClientData>({ ...initialClientData });

    const errorsClientData = ref({});

    const set = (client: Client) => {
        clientId.value = client.id;

        Object.entries(client).forEach(([key, value]) => {
            if (key in clientData.value) {
                ((clientData.value as unknown) as Record<string, unknown>)[key] = value;
            }
        });
    }

    const clear = () => {
        clientId.value = 0;
        errorsClientData.value = {};
        clientData.value = { ...initialClientData };
    }

    return {
        set,
        clear,
        clientId,
        clientData,
        errorsClientData,
    }
})