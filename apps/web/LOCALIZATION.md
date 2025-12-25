# Sistema de Localização / Localization System

Este documento descreve o sistema de localização implementado no projeto Loading Happiness Platform.

## Visão Geral

O projeto suporta dois idiomas:
- **Português (pt)** - idioma padrão
- **Inglês (en)**

O sistema de localização é composto por:
1. **Ficheiro de traduções** (`src/lib/translations.ts`) - contém todas as strings traduzidas
2. **Utilitários de locale** (`src/lib/locale.ts`) - funções para obter e usar o locale atual
3. **Payload CMS** - configurado com suporte a localização para conteúdo dinâmico

## Como Usar

### Em Componentes Server-Side (React Server Components)

```typescript
import { t, getLocale } from '@/lib/locale';

export default async function MyComponent() {
  // Obter uma tradução
  const heading = await t('common.loading');
  
  // Obter uma tradução com parâmetros
  const copyright = await t('footer.copyright', { year: 2024 });
  
  // Obter o locale atual
  const locale = await getLocale(); // 'pt' ou 'en'
  
  return <h1>{heading}</h1>;
}
```

### Em Componentes Client-Side (use client)

Para componentes client-side, passe o locale como prop:

```typescript
'use client';

import { t, type Locale } from '@/lib/translations';

type MyComponentProps = {
  locale?: Locale;
};

export default function MyComponent({ locale = 'pt' }: MyComponentProps) {
  const heading = t('common.loading', locale);
  
  return <h1>{heading}</h1>;
}
```

E no componente pai (server-side):

```typescript
import { getLocale } from '@/lib/locale';
import MyComponent from './MyComponent';

export default async function ParentComponent() {
  const locale = await getLocale();
  
  return <MyComponent locale={locale} />;
}
```

### Adicionar Novas Traduções

1. Adicione a chave ao tipo `TranslationKey` em `src/lib/translations.ts`:

```typescript
export type TranslationKey = 
  | 'common.loading'
  | 'common.error'
  | 'myNew.key'  // <- nova chave
  // ...
```

2. Adicione as traduções para ambos os idiomas:

```typescript
const translations: Record<Locale, Record<TranslationKey, string>> = {
  pt: {
    'common.loading': 'A carregar...',
    'myNew.key': 'Minha nova tradução',
    // ...
  },
  en: {
    'common.loading': 'Loading...',
    'myNew.key': 'My new translation',
    // ...
  },
};
```

3. Use a nova chave:

```typescript
const text = await t('myNew.key');
```

## Estrutura de Chaves

As chaves de tradução seguem uma convenção hierárquica:

- `common.*` - Textos comuns usados em vários lugares
- `nav.*` - Navegação
- `hero.*` - Secções hero
- `home.*` - Página inicial
- `services.*` - Serviços
- `contact.*` - Formulário de contacto
- `footer.*` - Rodapé

### Exemplo de Organização

```
common.
  ├── loading
  ├── error
  └── success

nav.
  ├── services
  ├── news
  └── contact

contact.
  ├── form.
  │   ├── name
  │   ├── email
  │   └── submit
  └── topics.
      ├── managedIt
      └── cybersecurity
```

## Interpolação de Parâmetros

Você pode usar parâmetros nas traduções:

```typescript
// No ficheiro de traduções
'footer.copyright': '© {year} Loading Happiness. Engenharia para Estabilidade.'

// No código
const text = await t('footer.copyright', { year: 2024 });
// Resultado: "© 2024 Loading Happiness. Engenharia para Estabilidade."
```

## Payload CMS e Conteúdo Dinâmico

O Payload CMS está configurado para suportar localização. Campos marcados com `localized: true` terão versões separadas para cada idioma.

### Exemplo de Campo Localizado

```typescript
{
  name: 'heading',
  type: 'text',
  required: true,
  localized: true,  // <- Este campo terá versões PT e EN
}
```

### Consultar Conteúdo Localizado

```typescript
const payload = await getPayloadClient();
const locale = await getLocale();

const page = await payload.find({
  collection: 'pages',
  locale,  // <- Especifica o locale
});
```

## Detecção de Locale

O locale é detectado através do header `x-locale`. Se não estiver presente, o padrão é `pt`.

### Configuração do Middleware

O middleware (`middleware.ts`) deve definir o header baseado na URL:

```typescript
// Exemplo: /en/services -> locale = 'en'
// Exemplo: /pt/services -> locale = 'pt'
// Exemplo: /services -> locale = 'pt' (padrão)
```

## Links Localizados

Use a função `withLocale` para criar links que mantêm o locale:

```typescript
import { withLocale, getLocalePrefix } from '@/lib/locale';

const localePrefix = await getLocalePrefix(); // '/pt' ou '/en'
const href = withLocale('/services', localePrefix); // '/pt/services' ou '/en/services'
```

## Boas Práticas

1. **Sempre use chaves de tradução** - Nunca hardcode texto que deve ser traduzido
2. **Mantenha as traduções sincronizadas** - Certifique-se de que todas as chaves existem em ambos os idiomas
3. **Use nomes descritivos** - As chaves devem ser auto-explicativas
4. **Agrupe por contexto** - Use prefixos para organizar traduções relacionadas
5. **Teste em ambos os idiomas** - Verifique que as traduções funcionam corretamente

## Componentes Atualizados

Os seguintes componentes já estão totalmente localizados:

- ✅ `ContactForm` - Formulário de contacto
- ✅ `SiteFooter` - Rodapé do site
- ✅ `HomePage` - Página inicial (fallback)
- ⏳ `SiteNav` - Navegação (parcialmente - usa dados do CMS)

## Próximos Passos

Para completar a localização do projeto:

1. Adicionar traduções para páginas de serviços
2. Adicionar traduções para página de notícias
3. Adicionar traduções para página "About"
4. Adicionar traduções para mensagens de erro
5. Criar interface de seleção de idioma mais visível
6. Adicionar traduções para o admin do Payload CMS

## Suporte

Para questões ou problemas com o sistema de localização, consulte a documentação do Payload CMS sobre localização: https://payloadcms.com/docs/configuration/localization
