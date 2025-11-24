export default function () {
    const dayjs = useDayjs()

    const brDate = (date: string) => {
        if (!date) return ''

        return dayjs(date, "DD/MM/YYYY", true).isValid() ? date : dayjs(date, "YYYY-MM-DD").format("DD/MM/YYYY");
    }

    const brDateWithTime = (date: string) => {
        if (!date) return ''

        return dayjs(date, "DD/MM/YYYY HH:mm:ss", true).isValid() ? date : dayjs(date, "YYYY-MM-DDTHH:mm:ss").format("DD/MM/YYYY HH:mm:ss");
    }

    const databaseDate = (date: string) => {
        if (!date) return ''

        return dayjs(date, "YYYY-MM-DD", true).isValid() ? date : dayjs(date, "DD/MM/YYYY").format("YYYY-MM-DD");
    }

    const databaseDateWithTime = (date: string) => {
        if (!date) return ''

        return dayjs(date, "YYYY-MM-DDTHH:mm:ss", true).isValid() ? date : dayjs(date, "DD/MM/YYYY HH:mm:ss").format("YYYY-MM-DDTHH:mm:ss");
    }

    const isDate = (date: string) => {
        if (!date) return ''

        const isValidDateOnly = dayjs(date, 'DD/MM/YYYY', true).isValid()

        const isValidDateTime = dayjs(date, 'DD/MM/YYYY HH:mm:ss', true).isValid()

        return isValidDateOnly || isValidDateTime
    }

    const isDatabaseDate = (date: string) => {
        if (!date) return ''

        const isValidDateOnly = dayjs(date, 'YYYY-MM-DD', true).isValid()

        const isValidDateTime = dayjs(date, 'YYYY-MM-DD HH:mm:ss', true).isValid()

        const isValidDateTimeWithTimezone = dayjs(date, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]', true).isValid()

        return isValidDateOnly || isValidDateTime || isValidDateTimeWithTimezone
    }

    const transformDateDatabase = <T extends Record<string, unknown> | object>(data: T): T => {
        const transformed = { ...data }

        Object.entries(transformed).forEach(([key, value]) => {
            if (typeof value === "string" && isDate(value)) {
                try {
                    // Verifica se é data com hora (formato brasileiro: DD/MM/YYYY HH:mm:ss)
                    const hasTime = dayjs(value, 'DD/MM/YYYY HH:mm:ss', true).isValid()
                    
                    let convertedValue: string | null = null
                    if (hasTime) {
                        const result = databaseDateWithTime(value)
                        convertedValue = result && result.trim() !== '' ? result : null
                    } else {
                        const result = databaseDate(value)
                        convertedValue = result && result.trim() !== '' ? result : null
                    }
                    
                    // Verifica se a conversão resultou em uma data válida
                    if (convertedValue) {
                        const isValid = hasTime 
                            ? dayjs(convertedValue, 'YYYY-MM-DDTHH:mm:ss', true).isValid()
                            : dayjs(convertedValue, 'YYYY-MM-DD', true).isValid()
                        
                        if (!isValid) {
                            convertedValue = null
                        }
                    }
                    
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (transformed as any)[key] = convertedValue
                } catch (error) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (transformed as any)[key] = null
                }
            }
        })

        return transformed
    }

    const transformDateBr = <T extends Record<string, unknown> | object>(data: T): T => {
        const transformed = { ...data }

        Object.entries(transformed).forEach(([key, value]) => {
            if (typeof value === "string" && isDatabaseDate(value)) {
                try {
                    // Verifica se é data com hora (formatos: YYYY-MM-DD HH:mm:ss, YYYY-MM-DDTHH:mm:ss, YYYY-MM-DDTHH:mm:ss.SSS[Z])
                    const hasTime = dayjs(value, 'YYYY-MM-DD HH:mm:ss', true).isValid() 
                        || dayjs(value, 'YYYY-MM-DDTHH:mm:ss', true).isValid()
                        || dayjs(value, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]', true).isValid()
                    
                    let convertedValue: string | null = null
                    if (hasTime) {
                        const result = brDateWithTime(value)
                        convertedValue = result && result.trim() !== '' ? result : null
                    } else {
                        const result = brDate(value)
                        convertedValue = result && result.trim() !== '' ? result : null
                    }
                    
                    // Verifica se a conversão resultou em uma data válida
                    if (convertedValue) {
                        const isValid = hasTime 
                            ? dayjs(convertedValue, 'DD/MM/YYYY HH:mm:ss', true).isValid()
                            : dayjs(convertedValue, 'DD/MM/YYYY', true).isValid()
                        
                        if (!isValid) {
                            convertedValue = null
                        }
                    }
                    
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (transformed as any)[key] = convertedValue
                } catch (error) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (transformed as any)[key] = null
                }
            }
        })

        return transformed
    }

    return {
        isDate,
        brDate,
        databaseDate,
        isDatabaseDate,
        brDateWithTime,
        transformDateBr,
        transformDateDatabase,
        databaseDateWithTime,
    }
}