export default defineNuxtPlugin({
  name: 'customFetch',
  parallel: true,
  async setup(nuxtApp) {
    const config = useRuntimeConfig();
    const req = useRequestHeaders(['host']);

    const host = req.host || (process.client ? window.location.hostname : '');

    let baseURL = config.public.base_url_local as string;
    if (host.includes('ddns')) {
      baseURL = config.public.base_url_external as string;
    }

    const $customFetch = $fetch.create({
      baseURL,
      timeout: 30000,
      onRequest({ options }) {
        // Pega o token do cookie - funciona tanto no cliente quanto no servidor
        const tokenCookie = useCookie('auth.token');
        if (tokenCookie.value) {
          options.headers.set('Authorization', `${tokenCookie.value}`);
        }
      },
      onResponseError({ response }) {
        if (response.status === 401) {
          // Limpa o token e redireciona (apenas no cliente)
          if (process.client) {
            const tokenCookie = useCookie('auth.token');
            const userCookie = useCookie('auth.user');
            tokenCookie.value = null;
            userCookie.value = null;

            const router = useRouter();
            router.push('/');
          }
        }
      }
    })

    return {
      provide: {
        customFetch: $customFetch
      }
    }
  }
})


