import type { CounterOrderInformationCentral } from '~/interfaces/CounterOrderInformationCenter'

export const creationInformationCenter = async (
  counterOrderId: string,
  description: string
): Promise<CounterOrderInformationCentral> => {
  const response = await $api<CounterOrderInformationCentral>(
    `/api/v1/counter-order/information-center`,
    {
      method: 'POST',
      body: {
        counter_order_id: counterOrderId,
        description,
      },
    }
  )

  return response
}

export const updateInformationCenter = async (
  id: number,
  description: string
): Promise<CounterOrderInformationCentral> => {
  const response = await $api<CounterOrderInformationCentral>(
    `/api/v1/counter-order/information-center/${id}`,
    {
      method: 'PUT',
      body: {
        description,
      },
    }
  )

  return response
}

export const deleteInformationCenter = async (
  id: number
): Promise<{ message: string }> => {
  const response = await $api<{ message: string }>(
    `/api/v1/counter-order/information-center/${id}`,
    {
      method: 'DELETE',
    }
  )

  return response
}

