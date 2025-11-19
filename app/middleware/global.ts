export default defineNuxtRouteMiddleware((to) => {
  // Permite acesso à página de login sem autenticação
  if (to.path === '/') {
    return
  }

  const { token } = useAuth()
  
  // Se não está autenticado, redireciona para login
  if (!token.value) {
    return navigateTo('/')
  }
})

