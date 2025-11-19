import type { RowWithAddressSingle } from "~/interfaces/Client";

export function transformerData(data: RowWithAddressSingle) {
    const { transformDateDatabase } = useDateConversion();

    const transform = transformDateDatabase(data);

    const transformedData = {
        ...transform,
        cpf_cnpj: transform.cpf_cnpj ? transform.cpf_cnpj.replace(/[^\w\s]|_/g, "") : "",
        identity_number: transform.identity_number ? transform.identity_number.replace(/[^\w\s]|_/g, "") : "",
        number1: transform.number1 ? transform.number1.replace(/[^\w\s]|_| /g, "") : "",
        number2: transform.number2 ? transform.number2.replace(/[^\w\s]|_| /g, "") : "",
        number3: transform.number3 ? transform.number3.replace(/[^\w\s]|_| /g, "") : "",
    };

    return transformedData;

}

