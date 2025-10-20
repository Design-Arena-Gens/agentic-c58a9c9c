'use client';

import { useState, useMemo } from 'react';
import { Navigation } from '@/components/Navigation';
import { Search, Heart, Play, Filter } from 'lucide-react';
import { filterVoices, getLanguages, getRegions, getGenders, getPersonalities } from '@/data/voices';

export default function VoicesPage() {
  const [search, setSearch] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedPersonality, setSelectedPersonality] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);

  const filteredVoices = useMemo(() => {
    return filterVoices(search, selectedLanguage, selectedRegion, selectedGender, selectedPersonality);
  }, [search, selectedLanguage, selectedRegion, selectedGender, selectedPersonality]);

  const languages = getLanguages();
  const regions = getRegions(selectedLanguage);
  const genders = getGenders();
  const personalities = getPersonalities();

  const toggleFavorite = (voiceId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(voiceId)) {
      newFavorites.delete(voiceId);
    } else {
      newFavorites.add(voiceId);
    }
    setFavorites(newFavorites);
  };

  const handlePlayPreview = (voiceId: string) => {
    setPlayingVoice(playingVoice === voiceId ? null : voiceId);
    // In production, this would trigger actual TTS preview
  };

  return (
    <div className="flex min-h-screen">
      <Navigation />

      <main className="flex-1 ml-20 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-merriweather)', color: 'var(--off-white)' }}>
              Voice Library
            </h1>
            <p className="text-lg" style={{ color: 'var(--stone)' }}>
              Browse 551 premium neural voices
            </p>
          </div>

          {/* Search and Filters */}
          <div className="rounded-lg p-6 mb-6"
               style={{ background: 'var(--slate-800)', boxShadow: 'var(--shadow-md)' }}>
            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5"
                      style={{ color: 'var(--stone)' }} />
              <input
                type="text"
                placeholder="Search voices by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-short"
                style={{
                  background: 'var(--graphite)',
                  borderColor: 'rgba(148, 163, 184, 0.2)',
                  color: 'var(--off-white)',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--warm-teal)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)'}
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <select
                value={selectedLanguage}
                onChange={(e) => {
                  setSelectedLanguage(e.target.value);
                  setSelectedRegion('');
                }}
                className="px-4 py-2 rounded-lg border transition-short"
                style={{
                  background: 'var(--graphite)',
                  borderColor: 'rgba(148, 163, 184, 0.2)',
                  color: 'var(--off-white)',
                }}
              >
                <option value="">All Languages</option>
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>

              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-4 py-2 rounded-lg border transition-short"
                style={{
                  background: 'var(--graphite)',
                  borderColor: 'rgba(148, 163, 184, 0.2)',
                  color: 'var(--off-white)',
                }}
              >
                <option value="">All Regions</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>

              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
                className="px-4 py-2 rounded-lg border transition-short"
                style={{
                  background: 'var(--graphite)',
                  borderColor: 'rgba(148, 163, 184, 0.2)',
                  color: 'var(--off-white)',
                }}
              >
                <option value="">All Genders</option>
                {genders.map(gender => (
                  <option key={gender} value={gender}>{gender}</option>
                ))}
              </select>

              <select
                value={selectedPersonality}
                onChange={(e) => setSelectedPersonality(e.target.value)}
                className="px-4 py-2 rounded-lg border transition-short"
                style={{
                  background: 'var(--graphite)',
                  borderColor: 'rgba(148, 163, 184, 0.2)',
                  color: 'var(--off-white)',
                }}
              >
                <option value="">All Personalities</option>
                {personalities.map(personality => (
                  <option key={personality} value={personality}>{personality}</option>
                ))}
              </select>
            </div>

            {/* Active Filters Count */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm" style={{ color: 'var(--stone)' }}>
                Showing {filteredVoices.length} of 551 voices
              </p>
              {(search || selectedLanguage || selectedRegion || selectedGender || selectedPersonality) && (
                <button
                  onClick={() => {
                    setSearch('');
                    setSelectedLanguage('');
                    setSelectedRegion('');
                    setSelectedGender('');
                    setSelectedPersonality('');
                  }}
                  className="text-sm px-3 py-1 rounded-lg transition-short hover:bg-[var(--warm-teal)]/20"
                  style={{ color: 'var(--warm-teal)' }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Voice Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVoices.map((voice) => (
              <div
                key={voice.id}
                className="card-hover rounded-lg p-6 border"
                style={{
                  background: 'var(--slate-800)',
                  borderColor: favorites.has(voice.id) ? 'var(--warm-gold)' : 'rgba(148, 163, 184, 0.2)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1" style={{ color: 'var(--off-white)' }}>
                      {voice.name}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--stone)' }}>
                      {voice.language} ({voice.region})
                    </p>
                  </div>
                  <button
                    onClick={() => toggleFavorite(voice.id)}
                    className="transition-short hover:scale-110"
                  >
                    <Heart
                      className="w-5 h-5"
                      fill={favorites.has(voice.id) ? 'var(--warm-gold)' : 'none'}
                      style={{ color: favorites.has(voice.id) ? 'var(--warm-gold)' : 'var(--stone)' }}
                    />
                  </button>
                </div>

                {/* Gender Badge */}
                <div className="mb-3">
                  <span
                    className="px-2 py-1 rounded text-xs font-medium"
                    style={{
                      background: voice.gender === 'Male' ? 'rgba(21, 178, 160, 0.2)' : 'rgba(212, 167, 106, 0.2)',
                      color: voice.gender === 'Male' ? 'var(--warm-teal)' : 'var(--warm-gold)',
                    }}
                  >
                    {voice.gender}
                  </span>
                </div>

                {/* Personality Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {voice.personality.map((trait) => (
                    <span
                      key={trait}
                      className="px-2 py-1 rounded text-xs"
                      style={{
                        background: 'var(--graphite)',
                        color: 'var(--stone)',
                      }}
                    >
                      {trait}
                    </span>
                  ))}
                </div>

                {/* Preview Button */}
                <button
                  onClick={() => handlePlayPreview(voice.id)}
                  className={`w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-medium ${
                    playingVoice === voice.id ? 'pulse' : ''
                  }`}
                  style={{
                    background: playingVoice === voice.id ? 'var(--warm-teal)' : 'var(--graphite)',
                    color: playingVoice === voice.id ? 'var(--graphite)' : 'var(--warm-teal)',
                    border: `1px solid ${playingVoice === voice.id ? 'transparent' : 'var(--warm-teal)'}`,
                  }}
                >
                  <Play className="w-4 h-4" />
                  {playingVoice === voice.id ? 'Playing...' : 'Preview Voice'}
                </button>

                {/* Voice ID */}
                <p className="mt-3 text-xs font-mono" style={{ color: 'var(--stone)' }}>
                  {voice.id}
                </p>
              </div>
            ))}
          </div>

          {filteredVoices.length === 0 && (
            <div className="text-center py-16">
              <Filter className="w-16 h-16 mx-auto mb-4 opacity-50" style={{ color: 'var(--stone)' }} />
              <p className="text-lg" style={{ color: 'var(--stone)' }}>
                No voices found matching your filters
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
