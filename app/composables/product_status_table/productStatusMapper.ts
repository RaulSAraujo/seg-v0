import type { Row } from "~/interfaces/Pstatus";

/**
 * Filtra e extrai os IDs dos status de produto que estão ativos.
 * @param pstatus Lista de status de produto
 * @returns Ref com array de IDs dos status ativos
 */
export function getActiveProductStatusIds(pstatus: Row[]) {
    const activeStatus = useArrayFilter(pstatus, (f) => f.active === true);

    const mapActiveStatus = useArrayMap(activeStatus, (f) => f.id);

    return mapActiveStatus;
}

