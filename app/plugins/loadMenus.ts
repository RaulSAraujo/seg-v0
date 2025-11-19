export default defineNuxtPlugin({
  name: 'loadMenus',
  async setup() {
    // Executa apenas no cliente - mais confiável
    // Evita problemas com importação de JSON no servidor e cookies durante SSR
    if (!process.client) {
      return
    }

    // Aguardar próximo tick para garantir que tudo está pronto
    await nextTick()
    
    const { permissions, loadUser } = useAuth()
    const { initializeMenus } = useMenus()

    // Carregar dados do usuário do JWT se houver token mas não houver dados
    loadUser()

    // Sempre tentar inicializar (carrega do localStorage ou processa das permissões)
    await initializeMenus()
  }
})

