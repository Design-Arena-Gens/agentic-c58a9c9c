'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Upload, Radio, Settings as SettingsIcon, Play, Sparkles } from 'lucide-react';
import { VOICES } from '@/data/voices';
import toast from 'react-hot-toast';

const AI_MODELS = [
  { id: 'groq-llama', name: 'Groq Llama 3.1', provider: 'Groq', speed: 'Fast' },
  { id: 'claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', speed: 'Balanced' },
  { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI', speed: 'Balanced' },
  { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', provider: 'Google', speed: 'Fast' },
];

export default function PodcastPage() {
  const [file, setFile] = useState<File | null>(null);
  const [config, setConfig] = useState({
    hostAVoice: 'en-US-GuyNeural',
    hostBVoice: 'en-US-JennyNeural',
    mode: 'overview', // overview or detailed
    aiModel: 'groq-llama',
    pageStart: 1,
    pageEnd: 0,
    outputFormat: 'mp3',
    stereo: true,
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      const validTypes = ['application/pdf', 'application/epub+zip'];
      if (validTypes.includes(uploadedFile.type) || uploadedFile.name.endsWith('.epub')) {
        setFile(uploadedFile);
        toast.success(`Uploaded: ${uploadedFile.name}`);
      } else {
        toast.error('Please upload a PDF or EPUB file');
      }
    }
  };

  const handleStartGeneration = async () => {
    if (!file) {
      toast.error('Please upload a file first');
      return;
    }

    toast.success('Starting podcast generation...');
    // In production, this would call the API
  };

  const maleVoices = VOICES.filter(v => v.gender === 'Male' && v.language === 'English');
  const femaleVoices = VOICES.filter(v => v.gender === 'Female' && v.language === 'English');

  return (
    <div className="flex min-h-screen">
      <Navigation />

      <main className="flex-1 ml-20 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-merriweather)', color: 'var(--off-white)' }}>
              Podcast Generator
            </h1>
            <p className="text-lg" style={{ color: 'var(--stone)' }}>
              Create AI-powered podcast episodes with dual hosts
            </p>
          </div>

          {/* Upload Section */}
          <div className="rounded-lg p-6 mb-6"
               style={{ background: 'var(--slate-800)', boxShadow: 'var(--shadow-md)' }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--off-white)' }}>
              <Upload className="inline w-5 h-5 mr-2" />
              Upload Source Material
            </h2>

            <div
              className="border-2 border-dashed rounded-lg p-12 text-center transition-medium hover:border-[var(--warm-gold)] cursor-pointer"
              style={{ borderColor: 'rgba(148, 163, 184, 0.2)' }}
              onClick={() => document.getElementById('podcast-file-upload')?.click()}
            >
              {file ? (
                <div>
                  <Radio className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--warm-gold)' }} />
                  <p className="font-semibold mb-2" style={{ color: 'var(--off-white)' }}>
                    {file.name}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--stone)' }}>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                    }}
                    className="mt-4 text-sm px-4 py-2 rounded-lg transition-short"
                    style={{ color: 'var(--carmine)', background: 'rgba(227, 75, 75, 0.1)' }}
                  >
                    Remove File
                  </button>
                </div>
              ) : (
                <div>
                  <Upload className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--stone)' }} />
                  <p className="font-semibold mb-2" style={{ color: 'var(--off-white)' }}>
                    Drop PDF or EPUB here
                  </p>
                  <p className="text-sm" style={{ color: 'var(--stone)' }}>
                    or click to browse
                  </p>
                </div>
              )}
            </div>

            <input
              id="podcast-file-upload"
              type="file"
              accept=".pdf,.epub,application/pdf,application/epub+zip"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {/* AI Model Selection */}
          <div className="rounded-lg p-6 mb-6"
               style={{ background: 'var(--slate-800)', boxShadow: 'var(--shadow-md)' }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--off-white)' }}>
              <Sparkles className="inline w-5 h-5 mr-2" />
              AI Model Selection
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {AI_MODELS.map((model) => (
                <div
                  key={model.id}
                  onClick={() => setConfig({ ...config, aiModel: model.id })}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-medium ${
                    config.aiModel === model.id ? 'border-[var(--warm-gold)]' : 'border-transparent'
                  }`}
                  style={{
                    background: config.aiModel === model.id ? 'rgba(212, 167, 106, 0.1)' : 'var(--graphite)',
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold" style={{ color: 'var(--off-white)' }}>
                      {model.name}
                    </h3>
                    <span className="text-xs px-2 py-1 rounded" style={{ background: 'var(--slate-800)', color: 'var(--warm-gold)' }}>
                      {model.speed}
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--stone)' }}>
                    {model.provider}
                  </p>
                </div>
              ))}
            </div>

            {/* Mode Selection */}
            <div className="mt-6">
              <label className="block text-sm font-medium mb-3" style={{ color: 'var(--off-white)' }}>
                Podcast Mode
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  onClick={() => setConfig({ ...config, mode: 'overview' })}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-medium ${
                    config.mode === 'overview' ? 'border-[var(--warm-teal)]' : 'border-transparent'
                  }`}
                  style={{
                    background: config.mode === 'overview' ? 'rgba(21, 178, 160, 0.1)' : 'var(--graphite)',
                  }}
                >
                  <h4 className="font-semibold mb-1" style={{ color: 'var(--off-white)' }}>Overview Mode</h4>
                  <p className="text-sm" style={{ color: 'var(--stone)' }}>
                    High-level discussion of key concepts and themes
                  </p>
                </div>

                <div
                  onClick={() => setConfig({ ...config, mode: 'detailed' })}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-medium ${
                    config.mode === 'detailed' ? 'border-[var(--warm-teal)]' : 'border-transparent'
                  }`}
                  style={{
                    background: config.mode === 'detailed' ? 'rgba(21, 178, 160, 0.1)' : 'var(--graphite)',
                  }}
                >
                  <h4 className="font-semibold mb-1" style={{ color: 'var(--off-white)' }}>Detailed Mode</h4>
                  <p className="text-sm" style={{ color: 'var(--stone)' }}>
                    Deep-dive analysis with examples and explanations
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Host Configuration */}
          <div className="rounded-lg p-6 mb-6"
               style={{ background: 'var(--slate-800)', boxShadow: 'var(--shadow-md)' }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--off-white)' }}>
              <SettingsIcon className="inline w-5 h-5 mr-2" />
              Host Configuration
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Host A */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--off-white)' }}>
                  Host A Voice (Left Channel)
                </label>
                <select
                  value={config.hostAVoice}
                  onChange={(e) => setConfig({ ...config, hostAVoice: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border transition-short"
                  style={{
                    background: 'var(--graphite)',
                    borderColor: 'rgba(148, 163, 184, 0.2)',
                    color: 'var(--off-white)',
                  }}
                >
                  <optgroup label="Male Voices">
                    {maleVoices.map(voice => (
                      <option key={voice.id} value={voice.id}>
                        {voice.name} ({voice.region})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Female Voices">
                    {femaleVoices.map(voice => (
                      <option key={voice.id} value={voice.id}>
                        {voice.name} ({voice.region})
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Host B */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--off-white)' }}>
                  Host B Voice (Right Channel)
                </label>
                <select
                  value={config.hostBVoice}
                  onChange={(e) => setConfig({ ...config, hostBVoice: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border transition-short"
                  style={{
                    background: 'var(--graphite)',
                    borderColor: 'rgba(148, 163, 184, 0.2)',
                    color: 'var(--off-white)',
                  }}
                >
                  <optgroup label="Male Voices">
                    {maleVoices.map(voice => (
                      <option key={voice.id} value={voice.id}>
                        {voice.name} ({voice.region})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Female Voices">
                    {femaleVoices.map(voice => (
                      <option key={voice.id} value={voice.id}>
                        {voice.name} ({voice.region})
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>

            {/* Page Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--off-white)' }}>
                  Start Page
                </label>
                <input
                  type="number"
                  min="1"
                  value={config.pageStart}
                  onChange={(e) => setConfig({ ...config, pageStart: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{
                    background: 'var(--graphite)',
                    borderColor: 'rgba(148, 163, 184, 0.2)',
                    color: 'var(--off-white)',
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--off-white)' }}>
                  End Page (0 = all)
                </label>
                <input
                  type="number"
                  min="0"
                  value={config.pageEnd}
                  onChange={(e) => setConfig({ ...config, pageEnd: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{
                    background: 'var(--graphite)',
                    borderColor: 'rgba(148, 163, 184, 0.2)',
                    color: 'var(--off-white)',
                  }}
                />
              </div>
            </div>

            {/* Audio Output Options */}
            <div className="mt-6">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="stereo"
                  checked={config.stereo}
                  onChange={(e) => setConfig({ ...config, stereo: e.target.checked })}
                  className="w-4 h-4 rounded"
                  style={{ accentColor: 'var(--warm-gold)' }}
                />
                <label htmlFor="stereo" className="text-sm" style={{ color: 'var(--off-white)' }}>
                  Stereo output (Host A: Left, Host B: Right)
                </label>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleStartGeneration}
            disabled={!file}
            className="w-full py-4 px-6 rounded-lg font-semibold text-lg transition-medium flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: file ? 'linear-gradient(90deg, var(--warm-teal), var(--warm-gold))' : 'var(--stone)',
              color: 'var(--graphite)',
            }}
          >
            <Play className="w-6 h-6" />
            Generate Podcast Episode
          </button>
        </div>
      </main>
    </div>
  );
}
