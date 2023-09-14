export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      banner: {
        Row: {
          banner_exist: boolean
          id: number
          text: string | null
        }
        Insert: {
          banner_exist?: boolean
          id?: number
          text?: string | null
        }
        Update: {
          banner_exist?: boolean
          id?: number
          text?: string | null
        }
      }
      items: {
        Row: {
          dateAdded: string
          dateOnHold: string | null
          holder_id: string | null
          id: number
          imageURL: string
          tags: string[]
          title: string
        }
        Insert: {
          dateAdded?: string
          dateOnHold?: string | null
          holder_id?: string | null
          id?: number
          imageURL: string
          tags: string[]
          title: string
        }
        Update: {
          dateAdded?: string
          dateOnHold?: string | null
          holder_id?: string | null
          id?: number
          imageURL?: string
          tags?: string[]
          title?: string
        }
      }
      store_status: {
        Row: {
          id: number
          is_closed: boolean
        }
        Insert: {
          id?: number
          is_closed?: boolean
        }
        Update: {
          id?: number
          is_closed?: boolean
        }
      }
      users: {
        Row: {
          created_at: string
          email: string
          holds: number
          id: string
          is_admin: boolean
          name: string
        }
        Insert: {
          created_at?: string
          email?: string
          holds?: number
          id: string
          is_admin?: boolean
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          holds?: number
          id?: string
          is_admin?: boolean
          name?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
      reserve_item_user: {
        Args: {
          item_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

