import type { Row } from "~/interfaces/Pstatus";

/**
 * Transforma os status de produto após atualização, adicionando informações de relacionamento.
 * @param id ID do produto
 * @param items Lista de status de produto
 * @returns Lista de status transformados com informações de relacionamento
 */
export function transformProductStatusAfterUpdate(id: number, items: Row[]) {
  const dayjs = useDayjs();

  const activeStatus = items.filter(f => f.active);

  const statusList = activeStatus.map((f) => {
    return {
      id: f.id,
      active: f.active,
      name: f.name,
      ProductPstatus: {
        id: 0,
        product_id: id,
        pstatus_id: f.id,
        created_at: dayjs().format(),
        updated_at: dayjs().format(),
      },
      created_at: f.created_at,
      updated_at: f.updated_at,
    };
  });

  return statusList;
}

