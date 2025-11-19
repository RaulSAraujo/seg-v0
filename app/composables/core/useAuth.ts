import type { User } from '~/interfaces/User'
import type { Login } from '~/interfaces/Login'
import type { Permission } from '~/interfaces/Login'

interface SignInOptions {
  callbackUrl?: string
  redirect?: boolean
}

interface SignInCredentials {
  username: string
  password: string
}

interface JWTPayload {
  user: User
  exp?: number
  iat?: number
  iss?: string
  [key: string]: any
}

// Decodificar JWT (apenas o payload, sem verificar assinatura)
// Baseado no código antigo que usa Buffer e decodeURIComponent
const decodeJWT = (token: string): JWTPayload | null => {
  try {
    // JWT tem formato: header.payload.signature
    const parts = token.split('.')
    if (parts.length !== 3 || !parts[1]) {
      return null
    }

    let processedToken = parts[1]

    // Substituir caracteres Base64URL por Base64 padrão
    processedToken = processedToken.replace(/-/g, '+').replace(/_/g, '/')

    // Adicionar padding se necessário
    switch (processedToken.length % 4) {
      case 0:
        break
      case 2:
        processedToken += '=='
        break
      case 3:
        processedToken += '='
        break
      default:
        throw new Error('Invalid token padding')
    }

    // Decodificar Base64
    // No cliente, usamos atob ao invés de Buffer
    const decodedToken = atob(processedToken)
    
    // Parse JSON
    const payload = JSON.parse(decodedToken) as JWTPayload
    
    return payload
  } catch (error) {
    console.error('Erro ao decodificar JWT:', error)
    return null
  }
}

// Extrair dados do usuário do payload do JWT
// Os dados estão em payload.user conforme o código antigo
const extractUserFromJWT = (payload: JWTPayload): User | null => {
  if (!payload.user || !payload.user.id) {
    return null
  }

  return payload.user
}

export const useAuth = () => {
  const token = useCookie<string | null>('auth.token', {
    default: () => null,
  })

  const user = useCookie<User | null>('auth.user', {
    default: () => null,
  })

  const permissions = useCookie<Permission[]>('auth.permissions', {
    default: () => [],
  })

  const groupId = useCookie<number | null>('auth.groupId', {
    default: () => null,
  })

  const router = useRouter()
  const config = useRuntimeConfig()

  // Obter a URL base de acordo com o acesso do usuário
  const getBaseUrl = (): string => {
    if (process.client && typeof window !== 'undefined') {
      const host = window.location.hostname
      let baseURL = config.public.base_url_local as string
      if (host.includes('ddns')) {
        baseURL = config.public.base_url_external as string
      }
      return baseURL
    }
    
    // No servidor, tenta pegar do header da requisição
    if (process.server) {
      try {
        const req = useRequestHeaders(['host'])
        const host = req.host || ''
        let baseURL = config.public.base_url_local as string
        if (host.includes('ddns')) {
          baseURL = config.public.base_url_external as string
        }
        return baseURL
      } catch {
        // Fallback se não conseguir pegar o header
        return config.public.base_url_local as string
      }
    }
    
    return config.public.base_url_local as string
  }

  // Fazer login
  const signIn = async (
    credentials: SignInCredentials,
    options: SignInOptions = {}
  ): Promise<Login> => {
    try {
      const baseUrl = getBaseUrl()

      // Usar $api para login (URL completa com baseUrl)
      const response = await $api<Login>(`${baseUrl}/api/v1/auth/login`, {
        method: 'POST',
        body: {
          username: credentials.username,
          password: credentials.password,
        },
      })

      // Salvar dados de autenticação nos cookies
      token.value = response.jwt
      user.value = response.user
      permissions.value = response.permissions
      groupId.value = response.groupId

      // Processar permissões e menus usando useMenu
      const { processPermissions } = useMenus()
      await processPermissions(response.permissions)

      // Redirecionar se necessário
      if (options.redirect && options.callbackUrl) {
        await router.push(options.callbackUrl)
      }

      return response
    } catch (error) {
      const err = error as { statusText?: string; data?: { error?: string }; message?: string }
      throw new Error(err.data?.error || err.statusText || err.message || 'Erro ao fazer login')
    }
  }

  // Fazer logout
  const signOut = async (redirectTo: string = '/') => {
    // Limpar dados de autenticação
    token.value = null
    user.value = null
    permissions.value = []
    groupId.value = null

    // Limpar menus e configurações
    const { clearMenus } = useMenus()
    clearMenus()

    await router.push(redirectTo)
  }

  // Verificar se tem permissão para um método específico
  const hasMethodPermission = (backUrl: string, method: string): boolean => {
    const permission = permissions.value.find((p) => p.backUrl === backUrl)

    if (!permission) return false

    return permission.methods.some((m) => m.name.toLowerCase() === method.toLowerCase())
  }

  // Decodificar JWT e extrair dados do usuário
  const decodeUserFromToken = (): User | null => {
    if (!token.value) {
      console.warn('decodeUserFromToken: Token não encontrado')
      return null
    }

    try {
      const payload = decodeJWT(token.value)
      if (!payload) {
        console.warn('decodeUserFromToken: Payload não pôde ser decodificado')
        return null
      }

      // Log do payload para debug (remover em produção se necessário)
      if (process.dev) {
        console.log('JWT Payload decodificado:', payload)
      }

      // Verificar se o token expirou
      if (payload.exp) {
        const now = Math.floor(Date.now() / 1000)
        if (payload.exp < now) {
          console.warn('Token JWT expirado')
          // Limpar dados se token expirado
          token.value = null
          user.value = null
          permissions.value = []
          groupId.value = null
          return null
        }
      }

      const userData = extractUserFromJWT(payload)
      if (userData) {
        // Salvar dados do usuário
        user.value = userData
        
        // Atualizar groupId se estiver nos dados do usuário
        if (userData.group_id) {
          groupId.value = userData.group_id
        }

        if (process.dev) {
          console.log('Dados do usuário carregados do JWT:', userData)
        }
      } else {
        console.warn('decodeUserFromToken: Não foi possível extrair dados do usuário do payload')
      }

      return userData
    } catch (error) {
      console.error('Erro ao decodificar dados do usuário do JWT:', error)
      return null
    }
  }

  // Carregar dados do usuário do JWT se houver token mas não houver dados
  const loadUser = () => {
    if (!token.value) {
      return
    }

    // Se já tem dados do usuário, não precisa recarregar
    if (user.value) {
      return
    }

    // Decodificar e carregar dados do usuário do JWT
    const decoded = decodeUserFromToken()
    if (!decoded) {
      console.warn('Não foi possível decodificar dados do usuário do JWT')
    }
  }

  // Carregar dados do usuário do JWT na inicialização se necessário
  if (process.client && token.value && !user.value) {
    // Usar nextTick para garantir que os cookies estejam prontos
    nextTick(() => {
      loadUser()
    })
  }

  // Verificar se está autenticado
  const isAuthenticated = computed(() => !!token.value && !!user.value)

  return {
    // Estado
    token,
    data: user,
    permissions,
    groupId,
    isAuthenticated,

    // Métodos
    signIn,
    signOut,
    decodeUserFromToken,
    loadUser,
    hasMethodPermission,
  }
}
