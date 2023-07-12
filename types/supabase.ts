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
      links: {
        Row: {
          created_at: string | null
          id: number
          label: string | null
          profile: number
          url: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          label?: string | null
          profile: number
          url?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          label?: string | null
          profile?: number
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "links_profile_fkey"
            columns: ["profile"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
          user: string
          username: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string | null
          user: string
          username: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string | null
          user?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_fkey"
            columns: ["user"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
