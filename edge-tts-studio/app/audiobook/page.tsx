'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Upload, BookOpen, Settings as SettingsIcon, Play } from 'lucide-react';
import { VOICES } from '@/data/voices';
import toast from 'react-hot-toast';

export default function AudiobookPage() {
  const [file, setFile] = useState<File | null>(null);
  const [config, setConfig] = useState({
    voice: 'en-US-AriaNeural',
    rate: 0, // -50 to +50
    pitch: 0, // -50 to +50
    volume: 0, // -50 to +50
    ssml: false,
    chunkSize: 500,
    workers: 3,
    outputFormat: 'mp3',
    bitrate: 192,
    generateChapterwise: true,
    generateComplete: true,
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

    toast.success('Starting audiobook generation...');
    // In production, this would call the API
  };

  return (
    <div className="flex min-h-screen">
      <Navigation />

      <main className="flex-1 ml-20 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-merriweather)', color: 'var(--off-white)' }}>
              Audiobook Generator
            </h1>
            <p className="text-lg" style={{ color: 'var(--stone)' }}>
              Upload PDF or EPUB and generate professional audiobooks
            </p>
          </div>

          {/* Upload Section */}
          <div className="rounded-lg p-6 mb-6"
               style={{ background: 'var(--slate-800)', boxShadow: 'var(--shadow-md)' }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--off-white)' }}>
              <Upload className="inline w-5 h-5 mr-2" />
              Upload Book
            </h2>

            <div
              className="border-2 border-dashed rounded-lg p-12 text-center transition-medium hover:border-[var(--warm-teal)] cursor-pointer"
              style={{ borderColor: 'rgba(148, 163, 184, 0.2)' }}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              {file ? (
                <div>
                  <BookOpen className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--warm-teal)' }} />
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
              id="file-upload"
              type="file"
              accept=".pdf,.epub,application/pdf,application/epub+zip"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {/* Configuration Section */}
          <div className="rounded-lg p-6 mb-6"
               style={{ background: 'var(--slate-800)', boxShadow: 'var(--shadow-md)' }}>
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--off-white)' }}>
              <SettingsIcon className="inline w-5 h-5 mr-2" />
              TTS Configuration
            </h2>

            <div className="space-y-6">
              {/* Voice Selection */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--off-white)' }}>
                  Voice
                </label>
                <select
                  value={config.voice}
                  onChange={(e) => setConfig({ ...config, voice: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border transition-short"
                  style={{
                    background: 'var(--graphite)',
                    borderColor: 'rgba(148, 163, 184, 0.2)',
                    color: 'var(--off-white)',
                  }}
                >
                  {VOICES.map(voice => (
                    <option key={voice.id} value={voice.id}>
                      {voice.name} ({voice.language} - {voice.region}) - {voice.gender}
                    </option>
                  ))}
                </select>
              </div>

              {/* TTS Parameters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--off-white)' }}>
                    Rate: {config.rate > 0 ? '+' : ''}{config.rate}%
                  </label>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={config.rate}
                    onChange={(e) => setConfig({ ...config, rate: parseInt(e.target.value) })}
                    className="w-full"
                    style={{ accentColor: 'var(--warm-teal)' }}
                  />
                  <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--stone)' }}>
                    <span>-50%</span>
                    <span>+50%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--off-white)' }}>
                    Pitch: {config.pitch > 0 ? '+' : ''}{config.pitch}Hz
                  </label>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={config.pitch}
                    onChange={(e) => setConfig({ ...config, pitch: parseInt(e.target.value) })}
                    className="w-full"
                    style={{ accentColor: 'var(--warm-teal)' }}
                  />
                  <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--stone)' }}>
                    <span>-50Hz</span>
                    <span>+50Hz</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--off-white)' }}>
                    Volume: {config.volume > 0 ? '+' : ''}{config.volume}%
                  </label>
                  <input
                    type="range"
                    min="-50"
                    max="50"
                    value={config.volume}
                    onChange={(e) => setConfig({ ...config, volume: parseInt(e.target.value) })}
                    className="w-full"
                    style={{ accentColor: 'var(--warm-teal)' }}
                  />
                  <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--stone)' }}>
                    <span>-50%</span>
                    <span>+50%</span>
                  </div>
                </div>
              </div>

              {/* Advanced Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--off-white)' }}>
                    Concurrent Workers: {config.workers}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={config.workers}
                    onChange={(e) => setConfig({ ...config, workers: parseInt(e.target.value) })}
                    className="w-full"
                    style={{ accentColor: 'var(--warm-teal)' }}
                  />
                  <p className="text-xs mt-1" style={{ color: 'var(--stone)' }}>
                    Default: 3 workers
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--off-white)' }}>
                    Max Chunk Size: {config.chunkSize} words
                  </label>
                  <input
                    type="number"
                    min="100"
                    max="1000"
                    value={config.chunkSize}
                    onChange={(e) => setConfig({ ...config, chunkSize: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 rounded-lg border"
                    style={{
                      background: 'var(--graphite)',
                      borderColor: 'rgba(148, 163, 184, 0.2)',
                      color: 'var(--off-white)',
                    }}
                  />
                </div>
              </div>

              {/* Output Options */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="ssml"
                    checked={config.ssml}
                    onChange={(e) => setConfig({ ...config, ssml: e.target.checked })}
                    className="w-4 h-4 rounded"
                    style={{ accentColor: 'var(--warm-teal)' }}
                  />
                  <label htmlFor="ssml" className="text-sm" style={{ color: 'var(--off-white)' }}>
                    Enable SSML processing
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="chapterwise"
                    checked={config.generateChapterwise}
                    onChange={(e) => setConfig({ ...config, generateChapterwise: e.target.checked })}
                    className="w-4 h-4 rounded"
                    style={{ accentColor: 'var(--warm-teal)' }}
                  />
                  <label htmlFor="chapterwise" className="text-sm" style={{ color: 'var(--off-white)' }}>
                    Generate chapter-wise files
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="complete"
                    checked={config.generateComplete}
                    onChange={(e) => setConfig({ ...config, generateComplete: e.target.checked })}
                    className="w-4 h-4 rounded"
                    style={{ accentColor: 'var(--warm-teal)' }}
                  />
                  <label htmlFor="complete" className="text-sm" style={{ color: 'var(--off-white)' }}>
                    Generate complete audiobook file
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleStartGeneration}
            disabled={!file}
            className="w-full py-4 px-6 rounded-lg font-semibold text-lg transition-medium flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: file ? 'var(--warm-teal)' : 'var(--stone)',
              color: 'var(--graphite)',
            }}
          >
            <Play className="w-6 h-6" />
            Start Audiobook Generation
          </button>
        </div>
      </main>
    </div>
  );
}
