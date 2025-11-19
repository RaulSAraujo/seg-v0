import type { Data } from '~/interfaces/Weather'

type Options = {
    lazy?: boolean
    server?: boolean
    immediate?: boolean
}

interface WeatherResponse {
    name: string
    temp: number
    description: string
    icon: string
    humidity: number
    speed: number
}

export const useWeather = (options: Options) => {
    const { lazy = false, immediate = true } = options
    const config = useRuntimeConfig()
    
    const apiKey = config.public.key_weather
    const baseUrl = config.public.base_url_weather || 'https://api.openweathermap.org'
    
    // Coordenadas de Franca/SP
    const lat = '-20.5353'
    const lon = '-47.4014'

    const { data: rawData, status, error, refresh, execute } = useFetch<Data>(
        `${baseUrl}/weather`,
        {
            key: "weather",
            lazy,
            immediate,
            query: {
                lat,
                lon,
                appid: apiKey,
                lang: 'pt_br',
                units: 'metric'
            }
        }
    );

    const data = computed<WeatherResponse | null>(() => {
        if (!rawData.value) return null
        
        return {
            name: rawData.value.name,
            temp: Math.round(rawData.value.main.temp), // Já vem em Celsius da API
            description: rawData.value.weather[0]?.description || '',
            icon: rawData.value.weather[0]?.icon || '',
            humidity: rawData.value.main.humidity,
            speed: Math.round(rawData.value.wind.speed * 3.6), // Converte de m/s para km/h
        }
    });

    return {
        refresh,
        execute,
        data,
        error: readonly(error),
        status: readonly(status),
    }
}