/**
 * Custom Payload CMS Dashboard
 * Displays analytics, quick actions, and AI-powered features
 */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

type DashboardStats = {
    totalPosts: number;
    publishedPosts: number;
    draftPosts: number;
    totalViews: number;
    postsThisMonth: number;
    avgReadingTime: number;
    totalImages: number;
    imagesWithoutAlt: number;
};

export default function CustomDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [aiGenerating, setAiGenerating] = useState(false);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const response = await fetch('/api/dashboard/stats');
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const generateContentWithAI = async () => {
        setAiGenerating(true);
        try {
            // This would open a modal or redirect to content creation with AI
            window.location.href = '/admin/collections/content/create?ai=true';
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setAiGenerating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="p-8 space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-gray-200">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Bem-vindo ao Loading Happiness CMS 👋
                </h1>
                <p className="text-gray-600 mb-6">
                    Gerencie seu conteúdo com o poder da IA do Google Gemini
                </p>
                <div className="flex gap-4">
                    <button
                        onClick={generateContentWithAI}
                        disabled={aiGenerating}
                        className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primaryDark transition-all shadow-lg disabled:opacity-50 flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {aiGenerating ? 'Gerando...' : 'Criar Post com IA'}
                    </button>
                    <Link
                        href="/admin/collections/content"
                        className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                    >
                        Ver Todos os Posts
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total de Posts"
                    value={stats?.totalPosts || 0}
                    icon="📝"
                    color="blue"
                    trend={`${stats?.postsThisMonth || 0} este mês`}
                />
                <StatCard
                    title="Publicados"
                    value={stats?.publishedPosts || 0}
                    icon="✅"
                    color="green"
                    trend={`${stats?.draftPosts || 0} rascunhos`}
                />
                <StatCard
                    title="Tempo Médio Leitura"
                    value={`${stats?.avgReadingTime || 0} min`}
                    icon="⏱️"
                    color="purple"
                />
                <StatCard
                    title="Imagens sem ALT"
                    value={stats?.imagesWithoutAlt || 0}
                    icon="🖼️"
                    color="orange"
                    trend={`de ${stats?.totalImages || 0} total`}
                    alert={stats && stats.imagesWithoutAlt > 0}
                />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Ações Rápidas com IA</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <QuickAction
                        title="Gerar Conteúdo"
                        description="Criar post completo com IA"
                        icon="✨"
                        href="/admin/collections/content/create"
                    />
                    <QuickAction
                        title="Otimizar SEO"
                        description="Melhorar meta descriptions"
                        icon="🎯"
                        href="/admin/collections/content"
                    />
                    <QuickAction
                        title="Gerar ALT Text"
                        description="Adicionar ALT a todas imagens"
                        icon="🏷️"
                        href="/admin/collections/media"
                    />
                    <QuickAction
                        title="Analisar Acessibilidade"
                        description="Verificar WCAG compliance"
                        icon="♿"
                        href="/admin/collections/content"
                    />
                    <QuickAction
                        title="Posts Relacionados"
                        description="Sugerir posts relacionados"
                        icon="🔗"
                        href="/admin/collections/content"
                    />
                    <QuickAction
                        title="Traduzir Conteúdo"
                        description="PT ↔ EN automático"
                        icon="🌍"
                        href="/admin/collections/content"
                    />
                </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Posts Recentes</h2>
                    <div className="space-y-3">
                        <RecentItem
                            title="Como proteger sua PME"
                            status="published"
                            date="Há 2 horas"
                        />
                        <RecentItem
                            title="Guia de backup em cloud"
                            status="draft"
                            date="Há 1 dia"
                        />
                        <RecentItem
                            title="Cibersegurança 2024"
                            status="published"
                            date="Há 3 dias"
                        />
                    </div>
                    <Link
                        href="/admin/collections/content"
                        className="mt-4 inline-flex items-center text-sm font-semibold text-primary hover:text-primaryDark"
                    >
                        Ver todos →
                    </Link>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Dicas de SEO</h2>
                    <div className="space-y-4">
                        <TipCard
                            title="Meta Descriptions"
                            description="15 posts sem meta description otimizada"
                            action="Otimizar agora"
                            type="warning"
                        />
                        <TipCard
                            title="Imagens sem ALT"
                            description={`${stats?.imagesWithoutAlt || 0} imagens precisam de texto alternativo`}
                            action="Gerar ALT text"
                            type="error"
                        />
                        <TipCard
                            title="Posts sem Keywords"
                            description="8 posts podem ter melhor SEO"
                            action="Adicionar keywords"
                            type="info"
                        />
                    </div>
                </div>
            </div>

            {/* AI Features Overview */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-200">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Funcionalidades de IA Disponíveis
                        </h2>
                        <p className="text-gray-600">
                            Powered by Google Gemini 2.0
                        </p>
                    </div>
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                        ✓ Ativo
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AIFeature
                        title="Geração de Conteúdo"
                        description="Posts completos em PT/EN"
                        status="active"
                    />
                    <AIFeature
                        title="Otimização SEO"
                        description="Meta descriptions e keywords"
                        status="active"
                    />
                    <AIFeature
                        title="ALT Text Automático"
                        description="Acessibilidade para imagens"
                        status="active"
                    />
                    <AIFeature
                        title="Análise de Acessibilidade"
                        description="WCAG 2.1 AA compliance"
                        status="active"
                    />
                </div>
            </div>
        </div>
    );
}

// Helper Components

type StatColor = 'blue' | 'green' | 'purple' | 'orange';
type StatusColor = 'published' | 'draft';
type TipType = 'warning' | 'error' | 'info';

type StatCardProps = {
    title: string;
    value: string | number;
    icon: string;
    color: StatColor;
    trend?: string;
    alert?: boolean | null;
};

type RecentItemProps = {
    title: string;
    status: StatusColor;
    date: string;
};

type TipCardProps = {
    title: string;
    description: string;
    action: string;
    type: TipType;
};

const STAT_COLORS: Record<StatColor, string> = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
};

const STATUS_COLORS: Record<StatusColor, string> = {
    published: 'bg-green-100 text-green-800',
    draft: 'bg-yellow-100 text-yellow-800',
};

const TIP_COLORS: Record<TipType, string> = {
    warning: 'border-yellow-200 bg-yellow-50',
    error: 'border-red-200 bg-red-50',
    info: 'border-blue-200 bg-blue-50',
};

function StatCard({ title, value, icon, color, trend, alert }: StatCardProps) {

    return (
        <div className={`bg-gradient-to-br ${STAT_COLORS[color]} rounded-2xl p-6 text-white shadow-lg ${alert ? 'ring-2 ring-red-500' : ''}`}>
            <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">{icon}</span>
                {alert && <span className="text-xs bg-red-500 px-2 py-1 rounded-full">!</span>}
            </div>
            <div className="text-3xl font-bold mb-1">{value}</div>
            <div className="text-sm opacity-90">{title}</div>
            {trend && <div className="text-xs opacity-75 mt-2">{trend}</div>}
        </div>
    );
}

function QuickAction({ title, description, icon, href }: any) {
    return (
        <Link
            href={href}
            className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
        >
            <span className="text-2xl">{icon}</span>
            <div>
                <div className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {title}
                </div>
                <div className="text-sm text-gray-600">{description}</div>
            </div>
        </Link>
    );
}

function RecentItem({ title, status, date }: RecentItemProps) {
    return (
        <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
            <div>
                <div className="font-medium text-gray-900">{title}</div>
                <div className="text-sm text-gray-500">{date}</div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[status]}`}>
                {status === 'published' ? 'Publicado' : 'Rascunho'}
            </span>
        </div>
    );
}

function TipCard({ title, description, action, type }: TipCardProps) {
    return (
        <div className={`p-4 rounded-xl border ${TIP_COLORS[type]}`}>
            <div className="font-semibold text-gray-900 mb-1">{title}</div>
            <div className="text-sm text-gray-600 mb-3">{description}</div>
            <button className="text-sm font-semibold text-primary hover:text-primaryDark">
                {action} →
            </button>
        </div>
    );
}

function AIFeature({ title, description, status }: any) {
    return (
        <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200">
            <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
            <div>
                <div className="font-semibold text-gray-900">{title}</div>
                <div className="text-sm text-gray-600">{description}</div>
            </div>
        </div>
    );
}
