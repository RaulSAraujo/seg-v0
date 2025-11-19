export default function () {
    const capitalizeFirstLetter = (text: string) => {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    }

    function toCamelCase(pascalCaseString: string): string {
        if (!pascalCaseString || pascalCaseString.length === 0) {
            return "";
        }
        return pascalCaseString.charAt(0).toLowerCase() + pascalCaseString.slice(1);
    }

    return { capitalizeFirstLetter, toCamelCase }
}