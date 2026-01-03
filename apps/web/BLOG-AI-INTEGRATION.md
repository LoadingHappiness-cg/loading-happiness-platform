# 📝 Blog SEO Avançado + Integração Google Gemini AI

## 🎯 Visão Geral

Sistema completo de blog com SEO avançado e funcionalidades de IA para geração e otimização de conteúdo, implementado para a plataforma Loading Happiness.

## ✨ Funcionalidades Implementadas

### 1. **Google Gemini AI Integration** 🤖

Serviço completo de IA (`src/lib/gemini.ts`) com as seguintes capacidades:

#### Geração de Conteúdo

- ✅ **Geração automática de posts** com base em tópico
- ✅ Suporte para PT e EN
- ✅ Controlo de tom (professional, casual, technical)
- ✅ Definição de word count
- ✅ Inclusão de keywords específicas

#### Otimização SEO

- ✅ **Meta descriptions** otimizadas (max 155 caracteres)
- ✅ **Geração de keywords** (short-tail e long-tail)
- ✅ Análise de conteúdo para SEO

#### Acessibilidade

- ✅ **Geração automática de ALT text** para imagens
- ✅ **Análise de acessibilidade WCAG 2.1 AA**
- ✅ Sugestões de melhorias
- ✅ Score de acessibilidade (0-100)

#### Funcionalidades de Blog

- ✅ **Table of Contents** automático
- ✅ **Reading time** calculado
- ✅ **Related posts** sugeridos por IA

### 2. **API Endpoints** 🔌

Quatro endpoints REST para integração com o CMS:

```http
POST /api/ai/generate-content
POST /api/ai/generate-seo
POST /api/ai/generate-alt-text
POST /api/ai/analyze-accessibility
```

### 3. **Coleção Content Melhorada** 📚

Campos adicionados à coleção `Content`:

#### SEO & Social

- `seo.title` - Título SEO customizado
- `seo.description` - Meta description (max 160 chars)
- `seo.keywords[]` - Array de keywords
- `seo.ogImage` - Imagem para social sharing (1200x630px)
- `seo.noIndex` - Prevenir indexação

#### Métricas & Engagement

- `readingTime` - Tempo de leitura (calculado automaticamente)
- `tableOfContents` - TOC gerado automaticamente
- `relatedPosts[]` - Posts relacionados (manual ou auto)
- `enableComments` - Ativar comentários
- `featured` - Post destacado

#### Hooks Automáticos

- ✅ Cálculo automático de reading time (200 palavras/min)
- ✅ Geração automática de slug a partir do título
- ✅ Normalização de caracteres especiais

### 4. **Componentes React** ⚛️

#### BlogPost Component

Três variantes de exibição:

- **Card** - Grid de posts (padrão)
- **List** - Lista compacta
- **Featured** - Destaque hero

Funcionalidades:

- Reading time badge
- Author info com avatar
- Tags e categorias
- Hover effects
- Responsive design

#### SocialShare Component

Partilha em:

- Twitter
- LinkedIn
- Facebook
- WhatsApp
- Email
- Copy to clipboard (com feedback visual)

### 5. **SEO Utilities** 🔍

#### Metadata Generation (`src/lib/seo.tsx`)

- ✅ **Open Graph** tags completas
- ✅ **Twitter Cards** otimizados
- ✅ **Canonical URLs** e alternates
- ✅ **Robots** meta tags

#### Schema.org Structured Data

- ✅ **BlogPosting** schema
- ✅ **Breadcrumb** schema
- ✅ **FAQ** schema
- ✅ **Person** (author) schema
- ✅ **Organization** (publisher) schema

## 📋 Como Usar

### 1. Configurar API Key do Gemini

Adicione ao `.env.local`:

```bash
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

**Obter API Key**: <https://aistudio.google.com/app/apikey>

### 2. Gerar Conteúdo com IA

```typescript
// No backend ou API route
import { generateBlogContent } from '@/lib/gemini';

const result = await generateBlogContent({
  topic: 'Melhores práticas de cibersegurança para PMEs',
  keywords: ['cibersegurança', 'PME', 'proteção de dados'],
  tone: 'professional',
  language: 'pt',
  wordCount: 1000,
});

// result = { title, content, excerpt }
```

### 3. Otimizar SEO

```typescript
import { generateMetaDescription, generateSEOKeywords } from '@/lib/gemini';

// Meta description
const metaDesc = await generateMetaDescription({
  title: 'Título do Post',
  content: 'Conteúdo completo...',
  keywords: ['keyword1', 'keyword2'],
  language: 'pt',
});

// Keywords
const keywords = await generateSEOKeywords({
  title: 'Título do Post',
  content: 'Conteúdo completo...',
  language: 'pt',
  count: 10,
});
```

### 4. Gerar ALT Text para Imagens

```typescript
import { generateImageAltText } from '@/lib/gemini';

const altText = await generateImageAltText({
  context: 'Post sobre cibersegurança',
  filename: 'firewall-diagram.png',
  language: 'pt',
});
```

### 5. Analisar Acessibilidade

```typescript
import { analyzeAccessibility } from '@/lib/gemini';

const analysis = await analyzeAccessibility({
  content: '<h1>Título</h1><p>Conteúdo...</p>',
  language: 'pt',
});

// analysis = { score, issues[], suggestions[] }
```

### 6. Usar Componentes

```tsx
import BlogPost from '@/app/components/BlogPost';
import SocialShare from '@/app/components/SocialShare';
import { generateBlogPostSEO, generateBlogPostSchema } from '@/lib/seo';

// Metadata para SEO
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  return generateBlogPostSEO({ post, locale: 'pt' });
}

// Na página
export default async function BlogPostPage({ params }) {
  const post = await getPost(params.slug);
  
  return (
    <>
      {/* Schema.org */}
      {generateBlogPostSchema({ post, locale: 'pt' })}
      
      {/* Conteúdo */}
      <BlogPost post={post} localePrefix="/pt" variant="featured" />
      
      {/* Social Sharing */}
      <SocialShare
        url={`https://loadinghappiness.com/pt/news/${post.slug}`}
        title={post.title}
        description={post.excerpt}
      />
    </>
  );
}
```

## 🎨 Exemplos de Uso no Payload CMS

### Workflow de Criação de Post

1. **Criar novo post** no Payload CMS
2. **Usar IA para gerar conteúdo**:
   - Chamar `/api/ai/generate-content` com tópico
   - Copiar título, conteúdo e excerpt gerados
3. **Otimizar SEO**:
   - Chamar `/api/ai/generate-seo` para meta description
   - Chamar `/api/ai/generate-seo?type=keywords` para keywords
4. **Adicionar imagens**:
   - Upload de imagens
   - Chamar `/api/ai/generate-alt-text` para cada imagem
5. **Verificar acessibilidade**:
   - Chamar `/api/ai/analyze-accessibility`
   - Corrigir issues identificados
6. **Publicar**

### Automação Futura

Pode-se criar um botão no Payload CMS que:

1. Gera conteúdo automaticamente
2. Otimiza SEO
3. Gera ALT text para todas as imagens
4. Verifica acessibilidade
5. Preenche todos os campos automaticamente

## 📊 Estrutura de Dados

### Post com SEO Completo

```typescript
{
  title: "Como Proteger sua PME de Ataques Cibernéticos",
  slug: "como-proteger-sua-pme-de-ataques-ciberneticos",
  excerpt: "Descubra as melhores práticas...",
  body: [...], // Blocos de conteúdo
  readingTime: 5, // minutos
  seo: {
    title: "Proteção Cibernética para PMEs | Loading Happiness",
    description: "Guia completo com as melhores práticas...",
    keywords: [
      { keyword: "cibersegurança PME" },
      { keyword: "proteção de dados" },
      { keyword: "ataques cibernéticos" }
    ],
    ogImage: { ... }, // 1200x630px
    noIndex: false
  },
  relatedPosts: [...],
  featured: true,
  enableComments: true
}
```

## 🚀 Próximos Passos Recomendados

### Curto Prazo (1-2 semanas)

1. ✅ Configurar GEMINI_API_KEY
2. 🔲 Criar posts de teste usando IA
3. 🔲 Testar geração de ALT text em todas as imagens existentes
4. 🔲 Implementar RSS feed
5. 🔲 Adicionar sitemap.xml

### Médio Prazo (1 mês)

1. 🔲 Criar botão "Gerar com IA" no Payload CMS
2. 🔲 Implementar sistema de comentários
3. 🔲 Adicionar analytics de leitura
4. 🔲 Criar newsletter automática
5. 🔲 Implementar search functionality

### Longo Prazo (2-3 meses)

1. 🔲 A/B testing de títulos e meta descriptions
2. 🔲 Recomendações personalizadas por IA
3. 🔲 Auto-tradução PT ↔ EN com IA
4. 🔲 Chatbot para responder perguntas sobre posts
5. 🔲 Geração automática de social media posts

## 📈 Métricas de Sucesso

### SEO

- **Meta descriptions** em 100% dos posts
- **ALT text** em 100% das imagens
- **Schema.org** em todas as páginas
- **Score de acessibilidade** > 90

### Conteúdo

- **Reading time** calculado automaticamente
- **Related posts** em todos os artigos
- **Social sharing** > 10% dos visitantes

### Performance

- **Tempo de geração** de conteúdo < 30s
- **Qualidade do conteúdo** IA > 8/10 (review manual)
- **SEO score** (Lighthouse) > 95

## 🔧 Troubleshooting

### Erro: "Gemini API not configured"

- Verificar se `GEMINI_API_KEY` está no `.env.local`
- Reiniciar o servidor Next.js

### Conteúdo gerado em inglês quando devia ser PT

- Verificar parâmetro `language: 'pt'`
- Confirmar que está a usar `'pt'` e não `'pt-PT'`

### ALT text muito genérico

- Fornecer mais contexto no parâmetro `context`
- Incluir o `filename` para melhor inferência

### Score de acessibilidade baixo

- Revisar issues retornados pela análise
- Focar em: heading hierarchy, link text, alt text

## 📚 Recursos

- [Google Gemini API Docs](https://ai.google.dev/docs)
- [Schema.org Docs](https://schema.org/BlogPosting)
- [Open Graph Protocol](https://ogp.me/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 🎉 Conclusão

O sistema está **pronto para uso** e oferece:

- ✅ Geração de conteúdo com IA
- ✅ Otimização SEO automática
- ✅ Acessibilidade melhorada
- ✅ Social sharing completo
- ✅ Schema.org structured data
- ✅ Componentes reutilizáveis

**Próximo passo**: Configurar a API key do Gemini e começar a criar conteúdo! 🚀
