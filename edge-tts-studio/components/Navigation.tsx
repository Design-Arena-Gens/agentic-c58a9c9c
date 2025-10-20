'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Mic2, BookOpen, Radio, Settings, User } from 'lucide-react';
import { cn } from '@/lib/cn';

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/voices', label: 'Voices', icon: Mic2 },
  { href: '/audiobook', label: 'Audiobook', icon: BookOpen },
  { href: '/podcast', label: 'Podcast', icon: Radio },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 h-screen w-20 flex flex-col items-center py-8 space-y-8"
         style={{ background: 'var(--slate-800)', borderRight: '1px solid rgba(21, 178, 160, 0.1)' }}>
      <div className="mb-8">
        <div className="w-12 h-12 rounded-full flex items-center justify-center"
             style={{ background: 'linear-gradient(135deg, var(--warm-teal), var(--warm-gold))' }}>
          <Mic2 className="w-6 h-6" style={{ color: 'var(--graphite)' }} />
        </div>
      </div>

      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'w-12 h-12 rounded-lg flex items-center justify-center transition-medium group relative',
              isActive
                ? 'bg-[var(--warm-teal)] text-[var(--graphite)]'
                : 'text-[var(--stone)] hover:text-[var(--warm-teal)] hover:bg-[var(--graphite)]'
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="absolute left-full ml-4 px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-short pointer-events-none"
                  style={{ background: 'var(--slate-800)', color: 'var(--off-white)' }}>
              {item.label}
            </span>
          </Link>
        );
      })}

      <div className="mt-auto">
        <button className="w-12 h-12 rounded-full flex items-center justify-center transition-medium hover:ring-2 hover:ring-[var(--warm-gold)]"
                style={{ background: 'var(--graphite)', color: 'var(--warm-gold)' }}>
          <User className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
}
