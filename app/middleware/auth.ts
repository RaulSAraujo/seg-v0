export default defineNuxtRouteMiddleware((to, from) => {
  const { token } = useAuth()
  
  // Se não está autenticado e não está na página de login, redireciona
  if (!token.value && to.path !== '/') {
    return navigateTo('/')
  }
  
  // Se está autenticado e está na página de login, redireciona para início
  if (token.value && to.path === '/') {
    return navigateTo('/inicio')
  }
})

