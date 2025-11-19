import { tokens } from 'maska'
import { vMaska } from 'maska/vue'

export default defineNuxtPlugin((nuxtApp) => {
    tokens['S'] = { pattern: /[a-zA-Z]/ }
    tokens['A'] = { pattern: /[a-zA-Z]/, transform: (char) => char.toUpperCase() } // Transforma em maiúsculo
    tokens['N'] = { pattern: /^[0-9]+$/, multiple: true } // Aceita números
    tokens['+'] = { pattern: /^[0-9\W]+$/, multiple: true } // Aceita números e carácteres especiais
    tokens['x'] = { pattern: /^[\s\S]+$/, repeated: true } // Aceita números, letras e carácteres especiais
    tokens['X'] = { pattern: /^[\s\S]+$/, transform: (char) => char.toUpperCase(), repeated: true } // Aceita números, letras e carácteres especiais. Transforma em maiúsculo
    tokens['B'] = { pattern: /^[\s\S]+$/, transform: (char) => char.toLowerCase(),repeated: true } // Aceita números, letras e carácteres especiais. Transforma em minusculo

    nuxtApp.vueApp.directive('maska', vMaska)
})