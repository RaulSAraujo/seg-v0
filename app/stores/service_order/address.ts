import type { AddressData, ClientAddress } from "~/interfaces/ServiceOrder";


export const useServiceOrderAddressStore = defineStore("service_order_address", () => {
    const addressId = ref<number | null>(null);

    const initialAddressData = {
        zipcode: "",
        street: "",
        neighbourhood: "",
        city: "",
        state: "",
        complement: "",
        number: "",
        observation: "",
        maps_location: "",
        country: "BRASIL",
    };

    const addressData = ref<AddressData>({ ...initialAddressData });

    const errorsAddressData = ref({});

    const set = (Addresses: ClientAddress[]) => {
        const find = Addresses.find(
            (e) => e.type == "Faturamento"
        ) as ClientAddress;

        if (find) {
            Object.entries(find).forEach(([key, value]) => {
                if (key in addressData.value) {
                    ((addressData.value as unknown) as Record<string, unknown>)[key] = value;
                }
            });
        }
    }

    const clear = () => {
        addressId.value = null;
        errorsAddressData.value = {};
        addressData.value = { ...initialAddressData };
    }

    return {
        set,
        clear,
        addressId,
        addressData,
        errorsAddressData,
    }
})