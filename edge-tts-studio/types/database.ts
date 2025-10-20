export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          api_keys: Json | null
        }
        Insert: {
          id: string
          email: string
          created_at?: string
          api_keys?: Json | null
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          api_keys?: Json | null
        }
      }
      jobs: {
        Row: {
          id: string
          user_id: string
          type: 'audiobook' | 'podcast'
          status: 'queued' | 'processing' | 'completed' | 'failed' | 'cancelled'
          config: Json
          progress: number
          logs: Json[]
          error_message: string | null
          file_paths: Json | null
          created_at: string
          updated_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          type: 'audiobook' | 'podcast'
          status?: 'queued' | 'processing' | 'completed' | 'failed' | 'cancelled'
          config: Json
          progress?: number
          logs?: Json[]
          error_message?: string | null
          file_paths?: Json | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'audiobook' | 'podcast'
          status?: 'queued' | 'processing' | 'completed' | 'failed' | 'cancelled'
          config?: Json
          progress?: number
          logs?: Json[]
          error_message?: string | null
          file_paths?: Json | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
      }
      voice_favorites: {
        Row: {
          id: string
          user_id: string
          voice_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          voice_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          voice_id?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
