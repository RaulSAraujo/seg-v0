import type { Menu, Page } from '~/interfaces/Menu'
import type { ConfigMenu } from '~/interfaces/ConfigMenu'
import type { PermissionComponent } from '~/interfaces/PermissionsComponent'
import type { Permission } from '~/interfaces/Login'

const MENUS_STORAGE_KEY = 'auth.menus'
const CONFIGS_STORAGE_KEY = 'auth.configs'
const COMPONENTS_STORAGE_KEY = 'auth.components'

export const useMenus = () => {
  // Função helper para ler do localStorage (apenas no cliente)
  const getFromLocalStorage = <T>(key: string, defaultValue: T): T => {
    if (process.client) {
      try {
        const stored = localStorage.getItem(key)
        return stored ? JSON.parse(stored) : defaultValue
      } catch (error) {
        console.error(`Erro ao ler ${key} do localStorage:`, error)
        return defaultValue
      }
    }
    return defaultValue
  }

  // Ler permissões dos cookies (funciona no servidor e cliente)
  const permissionsCookie = useCookie<Permission[]>('auth.permissions', {
    default: () => [],
  })

  // Estado reativo para menus e configurações
  // Inicializa vazio - será preenchido pelo plugin ou initializeMenus
  const menus = useState<Menu[]>(MENUS_STORAGE_KEY, () => [])
  const configs = useState<ConfigMenu[]>(CONFIGS_STORAGE_KEY, () => [])
  const components = useState<PermissionComponent[]>(COMPONENTS_STORAGE_KEY, () => [])

  // Salvar no localStorage
  const saveToLocalStorage = (key: string, data: any) => {
    if (process.client) {
      localStorage.setItem(key, JSON.stringify(data))
    }
  }

  // Limpar do localStorage
  const clearFromLocalStorage = (key: string) => {
    if (process.client) {
      localStorage.removeItem(key)
    }
  }

  // Autorizar o acesso a página
  const authPages = async (permissionsList: Permission[]): Promise<Page[]> => {
    try {
      // Importar diretamente do app/assets
      const pagesModule = await import('~/assets/pages.json')
      const pages = pagesModule.default as Page[]

      for (const page of pages) {
        const find = permissionsList.find((e) => e.backUrl === page.backUrl)

        if (find && find.methods.some((m) => m.name === 'get')) {
          page.auth = true
        }
      }

      return pages.filter((e) => e.auth === true)
    } catch (error) {
      console.error('Erro ao carregar páginas:', error)
      return []
    }
  }

  // Agrupar páginas pelo menu
  const groupPagesByMenu = (authorized: Page[]): { title: string; items: Page[] }[] => {
    const map = new Map<string, { title: string; items: Page[] }>()

    authorized.forEach((item) => {
      const { menu } = item

      if (!map.has(menu)) {
        map.set(menu, {
          title: menu,
          items: [],
        })
      }

      map.get(menu)?.items.push(item)
    })

    return Array.from(map.values())
  }

  // Montar o menu removendo os menus vazios
  const mountedMenu = async (
    groupedArray: { title: string; items: Page[] }[]
  ): Promise<Menu[]> => {
    try {
      // Importar diretamente do app/assets
      const menusModule = await import('~/assets/menus.json')
      const allMenus = menusModule.default as Menu[]
      const removeMenu: Menu[] = []

      allMenus.forEach((menu) => {
        const find = groupedArray.find((e) => e.title === menu.title)

        if (find) {
          menu.items.push(...find.items)
        } else {
          removeMenu.push(menu)
        }
      })

      return allMenus.filter((menu) => !removeMenu.includes(menu))
    } catch (error) {
      console.error('Erro ao carregar menus:', error)
      return []
    }
  }

  // Montar configurações de menu
  const mountedConfigMenu = async (
    groupedArray: { title: string; items: Page[] }[]
  ): Promise<ConfigMenu[]> => {
    try {
      // Importar diretamente do app/assets
      const configModule = await import('~/assets/config.json')
      const configMenus = configModule.default as ConfigMenu[]

      configMenus.forEach((menu) => {
        menu.subMenus.forEach((subMenu) => {
          const find = groupedArray.find((e) => e.title === subMenu.title)

          if (find) {
            subMenu.pages.push(...find.items)
          }
        })
      })

      return configMenus
    } catch (error) {
      console.error('Erro ao carregar configurações de menu:', error)
      return []
    }
  }

  // Carregar permissões de componentes
  const authPermissionComponent = async (
    permissionsList: Permission[]
  ): Promise<PermissionComponent[]> => {
    try {
      // Importar diretamente do app/assets
      const permissionsModule = await import('~/assets/permissions.json')
      const permissionComponents = permissionsModule.default as PermissionComponent[]

      for (const component of permissionComponents) {
        const find = permissionsList.find((e) => e.backUrl === component.backUrl)

        const subPermission = find?.subpermissions?.find(
          (s) => s.backUrl === component.subpermission
        )

        if (subPermission && subPermission.methods.some((m) => m.name === 'get')) {
          component.auth = true
        }
      }

      return permissionComponents
    } catch (error) {
      console.error('Erro ao carregar permissões de componentes:', error)
      return []
    }
  }

  // Processar e salvar permissões, menus e configurações
  const processPermissions = async (permissionsList: Permission[]) => {
    try {
      // Processar páginas autorizadas
      const authorized = await authPages(permissionsList)
      const groupedArray = groupPagesByMenu(authorized)

      // Processar menus e configurações em paralelo
      const [filteredMenus, configMenu, authorizedComponent] = await Promise.all([
        mountedMenu(groupedArray),
        mountedConfigMenu(groupedArray),
        authPermissionComponent(permissionsList),
      ])

      // Atualizar estado
      menus.value = filteredMenus
      configs.value = configMenu
      components.value = authorizedComponent

      // Salvar no localStorage
      saveToLocalStorage(MENUS_STORAGE_KEY, filteredMenus)
      saveToLocalStorage(CONFIGS_STORAGE_KEY, configMenu)
      saveToLocalStorage(COMPONENTS_STORAGE_KEY, authorizedComponent)

      return {
        menus: filteredMenus,
        configs: configMenu,
        components: authorizedComponent,
      }
    } catch (error) {
      console.error('Erro ao processar permissões:', error)
      throw error
    }
  }

  // Verificar se tem permissão para uma página
  const hasPagePermission = (backUrl: string): boolean => {
    const page = menus.value
      .flatMap((menu) => menu.items)
      .find((item) => item.backUrl === backUrl)

    return page?.auth === true
  }

  // Verificar se tem permissão para um componente
  const hasComponentPermission = (backUrl: string, subpermission?: string): boolean => {
    const component = components.value.find(
      (comp) => comp.backUrl === backUrl && (!subpermission || comp.subpermission === subpermission)
    )

    return component?.auth === true
  }

  // Limpar todos os dados de menu
  const clearMenus = () => {
    menus.value = []
    configs.value = []
    components.value = []

    clearFromLocalStorage(MENUS_STORAGE_KEY)
    clearFromLocalStorage(CONFIGS_STORAGE_KEY)
    clearFromLocalStorage(COMPONENTS_STORAGE_KEY)
  }

  // Carregar menus das permissões salvas (útil após reload)
  const loadMenusFromPermissions = async (permissions: Permission[]) => {
    if (permissions && permissions.length > 0) {
      await processPermissions(permissions)
    }
  }

  // Inicializar menus das permissões (servidor ou cliente)
  const initializeMenus = async () => {
    // No cliente, tentar carregar do localStorage primeiro
    if (process.client) {
      const storedMenus = getFromLocalStorage<Menu[]>(MENUS_STORAGE_KEY, [])
      const storedConfigs = getFromLocalStorage<ConfigMenu[]>(CONFIGS_STORAGE_KEY, [])
      
      if (storedMenus.length > 0 && storedConfigs.length > 0) {
        // Se há dados no localStorage, usar eles
        menus.value = storedMenus
        configs.value = storedConfigs
        const storedComponents = getFromLocalStorage<PermissionComponent[]>(COMPONENTS_STORAGE_KEY, [])
        if (storedComponents.length > 0) {
          components.value = storedComponents
        }
        return
      }
    }

    // Se não há cache ou estamos no servidor, processar das permissões
    if (permissionsCookie.value && permissionsCookie.value.length > 0) {
      await processPermissions(permissionsCookie.value)
    }
  }

  return {
    // Estado
    menus: readonly(menus),
    configs: readonly(configs),
    components: readonly(components),

    // Métodos
    processPermissions,
    loadMenusFromPermissions,
    hasPagePermission,
    hasComponentPermission,
    clearMenus,
    initializeMenus,
  }
}

