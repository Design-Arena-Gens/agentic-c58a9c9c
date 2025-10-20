'use client';

import { Navigation } from '@/components/Navigation';
import { Activity, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function Dashboard() {
  const recentJobs = [
    { id: '1', type: 'audiobook', title: 'The Great Gatsby', status: 'completed', progress: 100, created: '2 hours ago' },
    { id: '2', type: 'podcast', title: 'AI Overview Episode', status: 'processing', progress: 45, created: '1 hour ago' },
    { id: '3', type: 'audiobook', title: 'Pride and Prejudice', status: 'queued', progress: 0, created: '30 minutes ago' },
  ];

  const stats = [
    { label: 'Total Jobs', value: '24', icon: Activity, color: 'var(--warm-teal)' },
    { label: 'In Progress', value: '3', icon: Clock, color: 'var(--amber)' },
    { label: 'Completed', value: '19', icon: CheckCircle, color: 'var(--viridian)' },
    { label: 'Failed', value: '2', icon: XCircle, color: 'var(--carmine)' },
  ];

  return (
    <div className="flex min-h-screen">
      <Navigation />

      <main className="flex-1 ml-20 p-8">
        {/* Hero Section */}
        <div className="hero-gradient rounded-lg p-12 mb-8 relative overflow-hidden"
             style={{ boxShadow: 'var(--shadow-lg)' }}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[var(--warm-gold)] to-transparent opacity-10 rounded-full blur-3xl"></div>
          <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-merriweather)', color: 'var(--off-white)' }}>
            Welcome to Edge-TTS Studio
          </h1>
          <p className="text-lg opacity-90" style={{ color: 'var(--stone)' }}>
            Transform your content with 551 premium neural voices
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label}
                   className="rounded-lg p-6 transition-medium hover:translate-y-[-2px]"
                   style={{ background: 'var(--slate-800)', boxShadow: 'var(--shadow-md)' }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm" style={{ color: 'var(--stone)' }}>{stat.label}</span>
                  <Icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div className="text-3xl font-bold" style={{ color: 'var(--off-white)' }}>
                  {stat.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Jobs */}
        <div className="rounded-lg p-6"
             style={{ background: 'var(--slate-800)', boxShadow: 'var(--shadow-md)' }}>
          <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-merriweather)', color: 'var(--off-white)' }}>
            Recent Jobs
          </h2>

          <div className="space-y-4">
            {recentJobs.map((job) => (
              <div key={job.id}
                   className="rounded-lg p-4 border transition-medium hover:border-[var(--warm-teal)]"
                   style={{ background: 'var(--graphite)', borderColor: 'rgba(148, 163, 184, 0.2)' }}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold mb-1" style={{ color: 'var(--off-white)' }}>
                      {job.title}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--stone)' }}>
                      {job.type.charAt(0).toUpperCase() + job.type.slice(1)} • {job.created}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    job.status === 'completed' ? 'bg-[var(--viridian)]/20 text-[var(--viridian)]' :
                    job.status === 'processing' ? 'bg-[var(--amber)]/20 text-[var(--amber)]' :
                    'bg-[var(--stone)]/20 text-[var(--stone)]'
                  }`}>
                    {job.status}
                  </div>
                </div>

                {job.status === 'processing' && (
                  <div className="relative w-full h-2 rounded-full overflow-hidden"
                       style={{ background: 'rgba(148, 163, 184, 0.2)' }}>
                    <div className="progress-glow absolute top-0 left-0 h-full rounded-full transition-all duration-300"
                         style={{
                           width: `${job.progress}%`,
                           background: 'linear-gradient(90deg, var(--warm-teal), var(--warm-gold))'
                         }} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {recentJobs.length === 0 && (
            <div className="text-center py-12" style={{ color: 'var(--stone)' }}>
              <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No recent jobs</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <a href="/audiobook"
             className="card-hover rounded-lg p-8 text-center border transition-medium"
             style={{ background: 'var(--slate-800)', borderColor: 'rgba(21, 178, 160, 0.2)' }}>
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                 style={{ background: 'var(--warm-teal)/20' }}>
              <svg className="w-8 h-8" style={{ color: 'var(--warm-teal)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--off-white)' }}>Create Audiobook</h3>
            <p className="text-sm" style={{ color: 'var(--stone)' }}>
              Upload PDF or EPUB and generate audiobook
            </p>
          </a>

          <a href="/podcast"
             className="card-hover rounded-lg p-8 text-center border transition-medium"
             style={{ background: 'var(--slate-800)', borderColor: 'rgba(212, 167, 106, 0.2)' }}>
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                 style={{ background: 'rgba(212, 167, 106, 0.2)' }}>
              <svg className="w-8 h-8" style={{ color: 'var(--warm-gold)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--off-white)' }}>Create Podcast</h3>
            <p className="text-sm" style={{ color: 'var(--stone)' }}>
              Generate AI-powered podcast episodes
            </p>
          </a>
        </div>
      </main>
    </div>
  );
}
