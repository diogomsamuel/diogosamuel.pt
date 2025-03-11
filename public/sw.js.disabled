/**
 * Service Worker para Diogosamuel.pt
 * Fornece suporte offline e caching de recursos estáticos
 */

const CACHE_NAME = 'diogosamuel-cache-v2';

// Recursos a serem cacheados na instalação
const PRECACHE_ASSETS = [
  '/',
  '/offline.html',
  '/favicon.ico',
  '/manifest.json',
  '/logo192.png',
  '/logo512.png',
  '/locales/pt/translation.json',
  '/locales/pt-PT/translation.json'
];

// URLs que devem ser cacheadas sempre que acessadas
const RUNTIME_CACHE_URLS = [
  /\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2)$/,  // Recursos estáticos
  /^https:\/\/www\.diogosamuel\.pt\/(plans|about|support)$/,  // Páginas públicas importantes
];

// URLs que nunca devem ser cacheadas (como endpoints de API)
const NEVER_CACHE_URLS = [
  /\/api\//,  // Endpoints de API
  /api\.diogosamuel\.pt/,  // Domínio da API
  /\/login$/,  // Páginas de autenticação
  /\/register$/,
  /\/profile$/,  // Páginas com dados sensíveis/privados
  /\/payment/,  // Páginas de pagamento
  /\?token=/  // URLs com token na query
];

// Instalação do Service Worker
self.addEventListener('install', event => {
  // Ativa imediatamente, substituindo qualquer versão anterior
  self.skipWaiting();
  
  // Pré-cachear recursos importantes
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Pre-caching assets');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .catch(err => {
        console.error('Service Worker: Pre-caching failed:', err);
      })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', event => {
  // Tomar controle de todos os clients imediatamente
  event.waitUntil(clients.claim());
  
  // Limpar caches antigos
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('diogosamuel-cache-') && 
                 cacheName !== CACHE_NAME;
        }).map(cacheName => {
          console.log('Service Worker: Deleting old cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// Função auxiliar para verificar se uma URL deve ser cacheada
function shouldCache(url) {
  const requestUrl = new URL(url);
  
  // Não cachear diferentes origens (exceto ativos específicos)
  if (requestUrl.origin !== location.origin && 
      !requestUrl.hostname.endsWith('diogosamuel.pt')) {
    return false;
  }
  
  // Nunca cachear URLs sensíveis
  for (const pattern of NEVER_CACHE_URLS) {
    if (pattern.test(requestUrl.pathname) || pattern.test(requestUrl.href)) {
      return false;
    }
  }
  
  // Verificar se está na lista para cachear
  for (const pattern of RUNTIME_CACHE_URLS) {
    if (pattern.test(requestUrl.pathname) || pattern.test(requestUrl.href)) {
      return true;
    }
  }
  
  // Por padrão, não cachear
  return false;
}

// Função auxiliar para verificar se é uma requisição da API
function isApiRequest(url) {
  const requestUrl = new URL(url);
  return requestUrl.hostname.includes('api.diogosamuel.pt') || 
         requestUrl.pathname.startsWith('/api/');
}

// Interceptar requisições de rede
self.addEventListener('fetch', event => {
  // Ignorar requisições non-GET
  if (event.request.method !== 'GET') return;
  
  const requestUrl = new URL(event.request.url);
  
  // Não interceptar requisições para API - deixar o navegador lidar com CORS
  if (isApiRequest(event.request.url)) {
    return;
  }
  
  // Estratégia de cache: Rede primeiro, fallback para cache ou página offline
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Verificar se a resposta é válida
        if (!response || response.status !== 200) {
          return response;
        }
        
        // Cachear a resposta se for apropriado
        if (shouldCache(event.request.url)) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            })
            .catch(err => console.error('Cache error:', err));
        }
        
        return response;
      })
      .catch(async err => {
        console.warn('Network request failed, trying cache:', err);
        
        try {
          // Tentar obter do cache
          const cachedResponse = await caches.match(event.request);
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // Verificar se é uma requisição de página HTML
          if (requestUrl.pathname.endsWith('/') || 
              requestUrl.pathname.endsWith('.html') || 
              !requestUrl.pathname.includes('.')) {
            // Retornar página offline para requisições de página
            return caches.match('/offline.html');
          }
          
          // Falha silenciosa para outros recursos
          throw new Error('Resource not in cache');
        } catch (cacheErr) {
          console.error('Cache retrieval failed:', cacheErr);
          throw cacheErr;
        }
      })
  );
});

// Lidar com mensagens de outros contextos
self.addEventListener('message', event => {
  // Verificar se a mensagem é para forçar atualização do cache
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  // Verificar se a mensagem é para limpar o cache
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.delete(CACHE_NAME).then(() => {
        console.log('Cache cleared successfully');
        // Recachear ativos importantes
        return caches.open(CACHE_NAME).then(cache => {
          return cache.addAll(PRECACHE_ASSETS);
        });
      })
    );
  }
});

// Sincronização em segundo plano
self.addEventListener('sync', event => {
  if (event.tag === 'syncPendingData') {
    event.waitUntil(syncPendingData());
  }
});

// Função para sincronizar dados pendentes quando a conexão for restabelecida
async function syncPendingData() {
  try {
    // Implementação básica de sincronização
    console.log('Sync: Checking for pending data to sync');
  } catch (error) {
    console.error('Sync failed:', error);
    throw error; // Re-throw para que o evento sync possa ser reagendado
  }
}