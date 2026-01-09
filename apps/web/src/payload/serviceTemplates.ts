const baseCTA = {
  title: 'Vamos simplificar a tua TI?',
  content: 'Alinhamos contexto, prioridades e entregamos um plano prático.',
  primaryCTA: { label: 'Marcar conversa', link: '/contact' },
  secondaryCTA: { label: 'Enviar mensagem', link: '/contact' },
};

const baseHero = (heading: string, subheading: string, variant: string) => ({
  variant,
  theme: 'brandGradient',
  heading,
  subheading,
  primaryCTA: { label: 'Marcar conversa', link: '/contact' },
  secondaryCTA: { label: 'Pedir diagnóstico', link: '/contact' },
  badges: [{ text: 'Equipa sénior' }, { text: 'Segurança-first' }],
});

export const serviceTemplatePresets = {
  'managed-it': {
    hero: baseHero(
      'TI Gerida & Helpdesk',
      'Menos incidentes, respostas claras e manutenção planeada — para equipas que precisam de estabilidade e previsibilidade.',
      'C'
    ),
    whoItsFor: {
      title: 'Indicado para equipas que…',
      items: [
        { text: 'têm tickets repetidos e pouca visibilidade' },
        { text: 'precisam de SLA e escalamento claros' },
        { text: 'querem documentação e ownership explícito' },
        { text: 'não têm tempo para gerir fornecedores e ferramentas' },
      ],
    },
    deliverables: {
      title: 'O que entregamos',
      items: [
        { title: 'Resposta e escalamento com SLA', text: 'Severidades, tempos e responsáveis definidos.' },
        { title: 'Monitorização e manutenção', text: 'Patching, alertas e prevenção de repetidos.' },
        { title: 'Gestão de acessos e inventário', text: 'Quem tem acesso a quê, e porquê.' },
        { title: 'Onboarding/offboarding', text: 'Processo claro para entradas e saídas.' },
        { title: 'Notas mensais de saúde', text: 'O que mudou, o que melhorou, próximos passos.' },
      ],
    },
    outcomes: {
      title: 'Resultados esperados',
      items: [
        { title: 'Menos repetição', text: 'Causas raiz tratadas, não só sintomas.' },
        { title: 'Visibilidade', text: 'Sabe o que está a acontecer e porquê.' },
        { title: 'Utilizadores mais satisfeitos', text: 'Respostas claras e prazos realistas.' },
        { title: 'Operação mais calma', text: 'Menos incêndios, mais foco.' },
      ],
    },
    steps: {
      title: 'Como trabalhamos',
      items: [
        { title: 'Discovery rápido', text: 'Contexto, urgências e prioridades.' },
        { title: 'Baseline de acessos e inventário', text: 'Mapear sistemas, utilizadores e riscos.' },
        { title: 'Quick wins (30 dias)', text: 'Reduzir atrito imediato.' },
        { title: 'Ritmo operacional', text: 'Ticketing, reporting e revisões.' },
      ],
    },
    cta: baseCTA,
  },
  cybersecurity: {
    hero: baseHero(
      'Cibersegurança pragmática',
      'Hardening, identidade forte e backups testados — controlos que reduzem risco sem bloquear a equipa.',
      'C'
    ),
    whoItsFor: {
      title: 'Indicado para equipas que…',
      items: [
        { text: 'precisam de MFA e políticas mínimas em ordem' },
        { text: 'têm dúvidas sobre o que está realmente em risco' },
        { text: 'querem provas de controlo para clientes/auditorias' },
        { text: 'querem resposta a incidentes sem drama' },
      ],
    },
    deliverables: {
      title: 'O que entregamos',
      items: [
        { title: 'Baseline e políticas de segurança', text: 'Mapa de controlos, gaps e prioridades.' },
        { title: 'Identidade reforçada', text: 'MFA, conditional access, least privilege.' },
        { title: 'Proteção endpoint/email', text: 'EDR/AV, segurança de correio e awareness prático.' },
        { title: 'Backups e testes de recuperação', text: 'Restauros provados, não assumidos.' },
        { title: 'Playbooks e resposta', text: 'Procedimentos claros para incidentes.' },
      ],
    },
    checklist: {
      title: 'Checklist de baseline',
      items: [
        { item: 'MFA forçado para contas privilegiadas' },
        { item: 'Proteção de email e endpoints ativa' },
        { item: 'Backups testados e verificados' },
        { item: 'Least privilege e controlo de acessos' },
      ],
    },
    outcomes: {
      title: 'Resultados esperados',
      items: [
        { title: 'Menos exposição', text: 'Primeiro fechamos gaps de alto risco.' },
        { title: 'Prova de controlo', text: 'Evidências prontas para clientes e auditorias.' },
        { title: 'Playbooks claros', text: 'Menos stress na resposta.' },
        { title: 'Recuperação testada', text: 'Restauração validada.' },
      ],
    },
    steps: {
      title: 'Como trabalhamos',
      items: [
        { title: 'Risk discovery', text: 'Mapear superfície real de risco.' },
        { title: 'Plano 90 dias', text: 'Priorizar controlos por impacto.' },
        { title: 'Implementação', text: 'Rollout com mínima fricção.' },
        { title: 'Revisões', text: 'Métricas e ajustes trimestrais.' },
      ],
    },
    cta: baseCTA,
  },
  'm365-cloud': {
    hero: baseHero('Microsoft 365 & Cloud', 'Governança, migrações, identidade e licenciamento sem desperdício.', 'C'),
    whoItsFor: {
      title: 'Indicado para equipas que…',
      items: [
        { text: 'têm confusão de licenciamento e permissões' },
        { text: 'precisam de políticas e ownership definidos' },
        { text: 'planeiam migrações com baixo downtime' },
        { text: 'querem reduzir tickets e dúvidas sobre M365' },
      ],
    },
    deliverables: {
      title: 'O que entregamos',
      items: [
        { title: 'Governança de tenant e políticas', text: 'Retenção, ownership, defaults seguros.' },
        { title: 'Identidade e acessos', text: 'Modelos consistentes de roles e permissões.' },
        { title: 'Planeamento e execução de migração', text: 'Timelines claros, cutovers seguros.' },
        { title: 'Licenciamento e custos', text: 'Eliminar desperdício e alinhar uso.' },
        { title: 'Documentação e enablement', text: 'Menos confusão, menos tickets.' },
      ],
    },
    stats: {
      title: 'Métricas alvo',
      intro: 'Indicadores de melhoria após estabilização.',
      items: [
        { label: 'Waste de licenças', value: '↓ 20–30%' },
        { label: 'Tickets de acesso', value: '↓ 30–40%' },
        { label: 'Cobertura de políticas', value: '100%' },
      ],
    },
    outcomes: {
      title: 'Resultados esperados',
      items: [
        { title: 'Menos desperdício', text: 'Licenças alinhadas ao uso real.' },
        { title: 'Acessos previsíveis', text: 'Modelos de permissões claros.' },
        { title: 'Tenant seguro', text: 'Governança que resiste a mudanças de equipa.' },
        { title: 'Cutovers tranquilos', text: 'Sem surpresas na migração.' },
      ],
    },
    steps: {
      title: 'Como trabalhamos',
      items: [
        { title: 'Diagnóstico', text: 'Estado do tenant, gaps e riscos.' },
        { title: 'Governança', text: 'Regras, ownership e políticas.' },
        { title: 'Migração / limpeza', text: 'Execução com marcos claros.' },
        { title: 'Estabilizar', text: 'Reduzir tickets e documentar.' },
      ],
    },
    cta: baseCTA,
  },
  networking: {
    hero: baseHero('Redes & Wi-Fi', 'Cobertura fiável, segmentação segura e VPNs que funcionam.', 'C'),
    whoItsFor: {
      title: 'Indicado para equipas que…',
      items: [
        { text: 'têm quedas de Wi-Fi ou latência constante' },
        { text: 'precisam de VPN estável para equipas remotas' },
        { text: 'querem segmentação e menos superfícies de ataque' },
        { text: 'não têm visibilidade de performance' },
      ],
    },
    deliverables: {
      title: 'O que entregamos',
      items: [
        { title: 'Auditoria de rede', text: 'Inventário, riscos e gargalos.' },
        { title: 'Segmentação e firewalls', text: 'Menos movimento lateral e mais segurança.' },
        { title: 'Redesenho Wi-Fi', text: 'Cobertura, densidade e tuning.' },
        { title: 'VPN e acesso remoto', text: 'Acesso consistente e seguro.' },
        { title: 'Monitorização e alertas', text: 'Saber antes das reclamações.' },
      ],
    },
    outcomes: {
      title: 'Resultados esperados',
      items: [
        { title: 'Menos paragens', text: 'Melhor desenho e alertas.' },
        { title: 'Acesso remoto fiável', text: 'VPN sem fricção.' },
        { title: 'Visibilidade', text: 'Saúde da rede mensurável.' },
        { title: 'Performance afinada', text: 'Para padrões reais de uso.' },
      ],
    },
    steps: {
      title: 'Como trabalhamos',
      items: [
        { title: 'Mapear', text: 'Dispositivos, riscos e utilização.' },
        { title: 'Desenhar', text: 'Segmentação, Wi-Fi e políticas.' },
        { title: 'Implementar', text: 'Rollout com mínimo downtime.' },
        { title: 'Monitorizar', text: 'Alertas e tuning contínuo.' },
      ],
    },
    cta: baseCTA,
  },
  infrastructure: {
    hero: baseHero('Infraestrutura & Virtualização', 'Performance estável, backups testados e upgrades planeados.', 'C'),
    whoItsFor: {
      title: 'Indicado para equipas que…',
      items: [
        { text: 'têm infra envelhecida ou heterogénea' },
        { text: 'não confiam nos backups ou nunca testaram' },
        { text: 'sofrem com performance imprevisível' },
        { text: 'precisam de documentação e runbooks' },
      ],
    },
    deliverables: {
      title: 'O que entregamos',
      items: [
        { title: 'Assessment e dimensionamento', text: 'Right-size e mapa de risco.' },
        { title: 'Tuning de virtualização/storage', text: 'Performance e resiliência.' },
        { title: 'Backups e testes de recuperação', text: 'Restauros provados.' },
        { title: 'Plano de lifecycle e patching', text: 'Upgrades planeados, menos surpresas.' },
        { title: 'Runbooks e documentação', text: 'Mapas de sistema e procedimentos.' },
      ],
    },
    outcomes: {
      title: 'Resultados esperados',
      items: [
        { title: 'Menos paragens', text: 'Menos fragilidade nos sistemas core.' },
        { title: 'Recuperação mais rápida', text: 'Caminhos de restore testados.' },
        { title: 'Clareza de capacidade', text: 'Saber quando e o que escalar.' },
        { title: 'Conhecimento reutilizável', text: 'Documentação viva.' },
      ],
    },
    steps: {
      title: 'Como trabalhamos',
      items: [
        { title: 'Avaliar', text: 'Hardware, risco e carga.' },
        { title: 'Estabilizar', text: 'Resolver fragilidades maiores.' },
        { title: 'Otimizar', text: 'Performance e segurança.' },
        { title: 'Documentar', text: 'Conhecimento fora das cabeças.' },
      ],
    },
    cta: baseCTA,
  },
  'strategy-roadmaps': {
    hero: baseHero(
      'Estratégia & Roadmaps',
      'Plano realista de 12–24 meses: o que corrigir agora, onde investir a seguir.',
      'C'
    ),
    whoItsFor: {
      title: 'Indicado para equipas que…',
      items: [
        { text: 'precisam de prioridades claras (agora vs. depois)' },
        { text: 'querem plano de investimento realista' },
        { text: 'necessitam de alinhamento de stakeholders' },
        { text: 'querem parar gasto reativo' },
      ],
    },
    deliverables: {
      title: 'O que entregamos',
      items: [
        { title: 'Baseline operacional e mapa de risco', text: 'Estado atual e fragilidades.' },
        { title: 'Roadmap 12–24 meses', text: 'Sequência por impacto e custo.' },
        { title: 'Budget e investimento', text: 'Gastar onde muda resultados.' },
        { title: 'Quick wins mensuráveis', text: 'Melhorias de estabilidade que se mostram.' },
        { title: 'Reporting para liderança', text: 'Tradução de operações em decisões.' },
      ],
    },
    outcomes: {
      title: 'Resultados esperados',
      items: [
        { title: 'Prioridades claras', text: 'Corrigir o certo primeiro.' },
        { title: 'Investimento previsível', text: 'Sem gastos surpresa.' },
        { title: 'Menos fogo-fogo', text: 'Menos urgências e desvios.' },
        { title: 'Stakeholders alinhados', text: 'Toda a gente sabe o plano.' },
      ],
    },
    steps: {
      title: 'Como trabalhamos',
      items: [
        { title: 'Discovery', text: 'Contexto e restrições.' },
        { title: 'Desenho do roadmap', text: 'Sequenciar correções e investimentos.' },
        { title: 'Alinhamento', text: 'Scope e ownership acordados.' },
        { title: 'Suporte à execução', text: 'Revisões para manter ritmo.' },
      ],
    },
    cta: baseCTA,
  },
  'backup-continuity': {
    hero: baseHero(
      'Backups & Continuidade',
      'Backups 3-2-1, restauros testados e runbooks simples para quando algo corre mal.',
      'C'
    ),
    whoItsFor: {
      title: 'Indicado para equipas que…',
      items: [
        { text: 'não testam restauros ou não confiam nos backups' },
        { text: 'têm dados críticos e RPO/RTO indefinidos' },
        { text: 'dependem de storage local sem redundância' },
        { text: 'precisam de plano anti-ransomware' },
      ],
    },
    deliverables: {
      title: 'O que entregamos',
      items: [
        { title: 'Mapa de dados e riscos', text: 'O que é crítico, onde está, quem usa.' },
        { title: 'Estratégia 3-2-1', text: 'Cópias locais + offsite, imutabilidade quando possível.' },
        { title: 'Testes de restore', text: 'Prova de recuperação regular.' },
        { title: 'Runbooks de continuidade', text: 'Passos claros para incidentes.' },
        { title: 'Monitorização de backups', text: 'Alertas de falha e relatórios.' },
      ],
    },
    outcomes: {
      title: 'Resultados esperados',
      items: [
        { title: 'RPO/RTO definidos', text: 'Expectativas claras para o negócio.' },
        { title: 'Restauros provados', text: 'Menos suposições, mais confiança.' },
        { title: 'Menos impacto de ransomware', text: 'Backups resilientes.' },
        { title: 'Equipa sabe o que fazer', text: 'Runbooks simples.' },
      ],
    },
    steps: {
      title: 'Como trabalhamos',
      items: [
        { title: 'Avaliar e mapear', text: 'Fontes de dados, riscos e prioridades.' },
        { title: 'Estabilizar', text: 'Garantir cópias consistentes e isolamento.' },
        { title: 'Testar', text: 'Restauros periódicos e métricas de sucesso.' },
        { title: 'Rever', text: 'Ajustes trimestrais conforme mudanças.' },
      ],
    },
    cta: baseCTA,
  },
  'projects-procurement': {
    hero: baseHero(
      'Projetos & Procurement',
      'Planeamos e entregamos projetos com escopo claro e compras sem desperdício.',
      'C'
    ),
    whoItsFor: {
      title: 'Indicado para equipas que…',
      items: [
        { text: 'têm projetos que derrapam em tempo e custo' },
        { text: 'precisam renovar equipamentos ou licenças' },
        { text: 'não têm PM técnico dedicado' },
        { text: 'querem justificar investimento com ROI' },
      ],
    },
    deliverables: {
      title: 'O que entregamos',
      items: [
        { title: 'Discovery e escopo', text: 'Requisitos, riscos e dependências.' },
        { title: 'Plano e orçamento', text: 'Cronograma realista e fases.' },
        { title: 'Implementação e coordenação', text: 'Gestão com fornecedores e equipa interna.' },
        { title: 'Documentação e handover', text: 'Runbooks e ownership claro.' },
        { title: 'Avaliação de fornecedores', text: 'Critérios e recomendações.' },
      ],
    },
    outcomes: {
      title: 'Resultados esperados',
      items: [
        { title: 'Projetos no prazo', text: 'Menos derrapagens e surpresas.' },
        { title: 'Compras justificadas', text: 'Decisões com base em necessidade e ROI.' },
        { title: 'Equipa preparada', text: 'Handover e documentação.' },
        { title: 'Menos retrabalho', text: 'Escopo fechado e controlos.' },
      ],
    },
    steps: {
      title: 'Como trabalhamos',
      items: [
        { title: 'Scoping', text: 'Alinhar objetivos e restrições.' },
        { title: 'Planeamento', text: 'Cronograma, orçamento e riscos.' },
        { title: 'Entrega', text: 'Coordenação e validação.' },
        { title: 'Handover', text: 'Documentação e treino.' },
      ],
    },
    cta: baseCTA,
  },
  'compliance-gdpr': {
    hero: baseHero(
      'Compliance & GDPR',
      'Políticas, controlos técnicos e evidência prática para clientes e auditorias.',
      'C'
    ),
    whoItsFor: {
      title: 'Indicado para equipas que…',
      items: [
        { text: 'precisam de provas de conformidade para clientes' },
        { text: 'têm dados pessoais sem controlo ou DPIA/ROPA em falta' },
        { text: 'querem alinhar TI com requisitos legais' },
        { text: 'precisam de playbooks para incidentes e DSRs' },
      ],
    },
    deliverables: {
      title: 'O que entregamos',
      items: [
        { title: 'Gap analysis e plano', text: 'Onde estamos vs. onde temos de estar.' },
        { title: 'Políticas e registos', text: 'ROPA, DPIA e procedimentos claros.' },
        { title: 'Controlos técnicos', text: 'Acessos, logging, encriptação, backups.' },
        { title: 'Retenção e minimização', text: 'Dados certos, pelo tempo certo.' },
        { title: 'Formação curta', text: 'Awareness prático e repetível.' },
      ],
    },
    outcomes: {
      title: 'Resultados esperados',
      items: [
        { title: 'Evidência pronta', text: 'Para clientes e auditorias.' },
        { title: 'Menos risco de fuga', text: 'Controlos aplicados e revistos.' },
        { title: 'Processos claros', text: 'Quem faz o quê em incidentes ou DSRs.' },
        { title: 'Dados sob controlo', text: 'Retenção alinhada ao negócio.' },
      ],
    },
    steps: {
      title: 'Como trabalhamos',
      items: [
        { title: 'Avaliar', text: 'Gaps legais e técnicos.' },
        { title: 'Implementar', text: 'Controlos e políticas essenciais.' },
        { title: 'Evidenciar', text: 'Registos e provas simples.' },
        { title: 'Rever', text: 'Ciclos periódicos de atualização.' },
      ],
    },
    cta: baseCTA,
  },
  'custom-software': {
    hero: baseHero(
      'Software à Medida & Integrações',
      'Automação e ferramentas focadas em operação: EnviaSAFT, GS1-128, integrações ERP e APIs.',
      'C'
    ),
    whoItsFor: {
      title: 'Indicado para equipas que…',
      items: [
        { text: 'têm processos manuais que consomem tempo' },
        { text: 'precisam de integrar ERP/SQL com outras apps' },
        { text: 'têm requisitos de compliance (ex: SAF-T)' },
        { text: 'querem eliminar erros em logística/etiquetas' },
      ],
    },
    deliverables: {
      title: 'O que entregamos',
      items: [
        { title: 'Discovery e blueprint', text: 'Contexto, dados e objetivos.' },
        { title: 'Desenvolvimento incremental', text: 'Ciclos curtos com feedback.' },
        { title: 'Integrações e APIs', text: 'ERP, SQL, automação de tarefas.' },
        { title: 'Testes e documentação', text: 'Runbooks, handover, monitorização básica.' },
        { title: 'Manutenção opcional', text: 'Planos de suporte com SLA.' },
      ],
    },
    outcomes: {
      title: 'Resultados esperados',
      items: [
        { title: 'Menos trabalho manual', text: 'Automação onde cria impacto.' },
        { title: 'Dados consistentes', text: 'Integrações robustas.' },
        { title: 'Compliance facilitada', text: 'Ex: SAF-T com EnviaSAFT.' },
        { title: 'Suporte previsível', text: 'Roadmap e manutenção acordados.' },
      ],
    },
    steps: {
      title: 'Como trabalhamos',
      items: [
        { title: 'Discovery', text: 'Mapear problema e dados.' },
        { title: 'Protótipo', text: 'Validar solução rapidamente.' },
        { title: 'Beta', text: 'Testes com utilizadores e ajustes.' },
        { title: 'Produção', text: 'Handover, monitorização e suporte.' },
      ],
    },
    cta: baseCTA,
  },
} as const;
