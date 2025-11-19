import type { Row } from "~/interfaces/Product";
import type { TransformedKit } from "~/interfaces/Kit";

/**
 * Transforma os dados do kit adicionando uma nova família à lista existente.
 * @param data Lista atual de kits transformados
 * @param newFamily Nova família a ser adicionada
 * @returns Lista de famílias formatadas para atualização
 */
export function prepareKitFamiliesForUpdate(data: TransformedKit[], newFamily: { id: number, qtd_itens: number }) {
    const families = useArrayMap(data, (f) => {
        return {
            id: f.id,
            qtd_itens: f.qtd_itens,
        };
    });

    families.value.push(newFamily);

    return families.value;
}

/**
 * Prepara os dados de um item do kit para atualização antes de adicionar à lista.
 * @param data Dados do produto/item
 * @param quantity Quantidade de itens na composição
 * @returns Dados formatados do item do kit
 */
export function prepareKitItemForUpdate(data: Row, quantity: number) {
    const newData = {
        id: data.id,
        name: data.name!,
        erp_product_id: data.erp_product_id,
        produto_chave: data.produto_chave!,
        description: data.description!,
        qtd_itens: quantity,
        quantity: data.quantity,
        virtual_quantity: data.virtual_quantity!,
        lead_time: data.lead_time!,
        observation: data.observation!,
    }

    return newData;
}

