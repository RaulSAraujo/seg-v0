import type { Row } from '~/interfaces/Product';

/**
 * Prepara e normaliza os detalhes do produto para envio à API.
 * Formata medidas, pesos e datas conforme necessário.
 * 
 * @param productDetails Os detalhes parciais do produto
 * @param productMeasurementsChanged Indica se as medidas do produto foram alteradas
 * @returns Um objeto com os detalhes do produto formatados para a API
 */
export function prepareProductDetailsForApi(productDetails: Partial<Row>, productMeasurementsChanged: boolean) {
    const preparedDetails: Partial<Row> = { ...productDetails };

    const { transformDateDatabase } = useDateConversion();

    if (productMeasurementsChanged) {
        // Garante que os valores são tratados como números antes de formatar
        preparedDetails.width = parseFloat(`${productDetails.width || 0}`).toFixed(2);
        preparedDetails.height = parseFloat(`${productDetails.height || 0}`).toFixed(2);
        preparedDetails.length = parseFloat(`${productDetails.length || 0}`).toFixed(2);
        // Divide por 1000 e formata para 3 casas decimais
        preparedDetails.weight = (parseFloat(`${productDetails.weight || 0}`) / 1000).toFixed(3);
        preparedDetails.gross_weight = (parseFloat(`${productDetails.gross_weight || 0}`) / 1000).toFixed(3);
        preparedDetails.weight_cubic = (parseFloat(`${productDetails.weight_cubic || 0}`) / 1000).toFixed(3);
    } else {
        // Remove propriedades se as medidas não foram alteradas
        delete preparedDetails.package_id;
        delete preparedDetails.weight;
        delete preparedDetails.gross_weight;
        delete preparedDetails.weight_cubic;
        delete preparedDetails.height;
        delete preparedDetails.width;
        delete preparedDetails.length;
    }

    const transformed = transformDateDatabase(preparedDetails);

    return transformed;
}
