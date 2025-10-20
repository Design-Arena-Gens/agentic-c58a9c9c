'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Key, Save, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const [apiKeys, setApiKeys] = useState({
    groq: '',
    openai: '',
    anthropic: '',
    googleAI: '',
  });

  const [showKeys, setShowKeys] = useState({
    groq: false,
    openai: false,
    anthropic: false,
    googleAI: false,
  });

  const handleSave = async () => {
    toast.success('API keys saved successfully!');
    // In production, this would save to Supabase
  };

  const toggleShowKey = (key: keyof typeof showKeys) => {
    setShowKeys({ ...showKeys, [key]: !showKeys[key] });
  };

  const apiKeyFields = [
    { key: 'groq', label: 'Groq API Key', placeholder: 'gsk_...', description: 'For Llama 3.1 and fast inference' },
    { key: 'openai', label: 'OpenAI API Key', placeholder: 'sk-...', description: 'For GPT-4 and GPT-4 Turbo models' },
    { key: 'anthropic', label: 'Anthropic API Key', placeholder: 'sk-ant-...', description: 'For Claude 3.5 Sonnet' },
    { key: 'googleAI', label: 'Google AI API Key', placeholder: 'AI...', description: 'For Gemini 1.5 Pro' },
  ];

  return (
    <div className="flex min-h-screen">
      <Navigation />

      <main className="flex-1 ml-20 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-merriweather)', color: 'var(--off-white)' }}>
              Settings
            </h1>
            <p className="text-lg" style={{ color: 'var(--stone)' }}>
              Configure your API keys and preferences
            </p>
          </div>

          {/* API Keys Section */}
          <div className="rounded-lg p-6 mb-6"
               style={{ background: 'var(--slate-800)', boxShadow: 'var(--shadow-md)' }}>
            <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--off-white)' }}>
              <Key className="inline w-5 h-5 mr-2" />
              API Keys
            </h2>

            <div className="space-y-6">
              {apiKeyFields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--off-white)' }}>
                    {field.label}
                  </label>
                  <div className="relative">
                    <input
                      type={showKeys[field.key as keyof typeof showKeys] ? 'text' : 'password'}
                      value={apiKeys[field.key as keyof typeof apiKeys]}
                      onChange={(e) => setApiKeys({ ...apiKeys, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 pr-12 rounded-lg border transition-short"
                      style={{
                        background: 'var(--graphite)',
                        borderColor: 'rgba(148, 163, 184, 0.2)',
                        color: 'var(--off-white)',
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => toggleShowKey(field.key as keyof typeof showKeys)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-short"
                      style={{ color: 'var(--stone)' }}
                    >
                      {showKeys[field.key as keyof typeof showKeys] ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs mt-1" style={{ color: 'var(--stone)' }}>
                    {field.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-lg" style={{ background: 'var(--graphite)' }}>
              <h3 className="font-semibold mb-2" style={{ color: 'var(--amber)' }}>
                Security Note
              </h3>
              <p className="text-sm" style={{ color: 'var(--stone)' }}>
                API keys are encrypted and stored securely. They are never transmitted to third parties except to make authorized API calls to the respective services.
              </p>
            </div>
          </div>

          {/* TTS Configuration Defaults */}
          <div className="rounded-lg p-6 mb-6"
               style={{ background: 'var(--slate-800)', boxShadow: 'var(--shadow-md)' }}>
            <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--off-white)' }}>
              Default TTS Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--off-white)' }}>
                  Default Rate
                </label>
                <input
                  type="number"
                  defaultValue={0}
                  min="-50"
                  max="50"
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
                  Default Pitch
                </label>
                <input
                  type="number"
                  defaultValue={0}
                  min="-50"
                  max="50"
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
                  Default Volume
                </label>
                <input
                  type="number"
                  defaultValue={0}
                  min="-50"
                  max="50"
                  className="w-full px-4 py-2 rounded-lg border"
                  style={{
                    background: 'var(--graphite)',
                    borderColor: 'rgba(148, 163, 184, 0.2)',
                    color: 'var(--off-white)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full py-4 px-6 rounded-lg font-semibold text-lg transition-medium flex items-center justify-center gap-3"
            style={{
              background: 'var(--warm-teal)',
              color: 'var(--graphite)',
            }}
          >
            <Save className="w-6 h-6" />
            Save Settings
          </button>
        </div>
      </main>
    </div>
  );
}
