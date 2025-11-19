import type { AddUserActive } from "~/interfaces/ServiceOrder"

export const useServiceOrderEventSource = (orderId: string) => {
    const { token } = useAuth()

    const { $customFetch } = useNuxtApp()
    const config = useRuntimeConfig()

    const eventSource = ref<EventSource>()

    const disabledSave = useState<boolean>("disabled-save-os", () => false);

    const setupEventSource = () => {
        const id = unref(orderId)
        if (!id) return

        eventSource.value = new EventSource(
            `${config.public.base_url_local}/service-order/check-user-active?authorization=${token.value}&id=${id}`
        )

        eventSource.value.onmessage = handleEventSourceMessage

        eventSource.value!.onerror = () => {
            eventSource.value!.close();
        };
    }

    const handleEventSourceMessage = async (event: MessageEvent) => {
        const data = JSON.parse(event.data)

        if (!data.active) {
            await addUserActive()
        }
    }

    const addUserActive = async () => {
        const res = await $customFetch<AddUserActive>("service-order/add-user-active",
            {
                method: "POST",
                body: { id: orderId }
            }
        )

        if (res?.result[0] === 1) {
            disabledSave.value = true

            $toast().warning(`Usuário(a) ${res.user_name.substring(0, res.user_name.indexOf(" "))} esta ativo(a) há ${Math.ceil(parseFloat(res.time_active))} min. Funções desabilitadas`);
        } else {
            disabledSave.value = false

            $toast().success("Você esta ativo nesta ordem de serviço");
        }

        eventSource.value?.close()
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        event.preventDefault()
        event.returnValue = ""
        cleanup()
    }

    const cleanup = () => {
        eventSource.value?.close()
        removeUserActive()
    }

    const removeUserActive = async () => {
        await $customFetch("service-order/remove-user-active", {
            method: "POST"
        })
    }

    return {
        cleanup,
        setupEventSource,
        handleBeforeUnload,
    }
}