import type { Row, RowWithAddressSingle, RowWithAddress, ClientAddress } from '~/interfaces/Client'

const { transformDateBr } = useDateConversion();

export async function getById(id: string) {
    const res = await $api<RowWithAddress>(`/client/${id}`);

    const transformed = transformDateBr(res);

    const deliveryAddress = transformed.ClientsAddresses.find((e) => e.type == "Entrada");
    const billingAddress = transformed.ClientsAddresses.find((e) => e.type == "Faturamento");
    const collectionAddress = transformed.ClientsAddresses.find((e) => e.type == "Cobrança");

    return {
        ...transformed as Row,
        ClientsAddresses: billingAddress as ClientAddress,
        deliveryAddress: deliveryAddress as ClientAddress,
        collectionAddress: collectionAddress as ClientAddress,
    }
}

export interface ClientResponse extends Row {
    message?: string;
}

export async function creation(form: RowWithAddressSingle) {
    const address1 = form.ClientsAddresses;

    const res = await $api<ClientResponse>('/client', {
        method: 'POST',
        body: {
            ...form,
            ClientsAddresses: [address1],
        },
    })

    return res;
}

export async function update(
    id: string,
    form: RowWithAddressSingle,
    address2?: ClientAddress,
    address3?: ClientAddress
) {
    const address1 = form.ClientsAddresses;

    const res = await $api<ClientResponse>(`/client/${id}`, {
        method: 'PUT',
        body: {
            ...form,
            ClientsAddresses: [address1, address2, address3],
        },
    })

    return res;
}

