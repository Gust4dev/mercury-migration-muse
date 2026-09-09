export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          city: string
          complement: string | null
          created_at: string
          district: string | null
          id: string
          number: string | null
          postal_code: string
          recipient: string | null
          state: string
          street: string
          user_id: string | null
        }
        Insert: {
          city: string
          complement?: string | null
          created_at?: string
          district?: string | null
          id?: string
          number?: string | null
          postal_code: string
          recipient?: string | null
          state: string
          street: string
          user_id?: string | null
        }
        Update: {
          city?: string
          complement?: string | null
          created_at?: string
          district?: string | null
          id?: string
          number?: string | null
          postal_code?: string
          recipient?: string | null
          state?: string
          street?: string
          user_id?: string | null
        }
        Relationships: []
      }
      artwork_approvals: {
        Row: {
          created_at: string
          customer_comment: string | null
          id: string
          order_id: string
          order_item_id: string | null
          preview_url: string
          responded_at: string | null
          status: string
          version: number
        }
        Insert: {
          created_at?: string
          customer_comment?: string | null
          id?: string
          order_id: string
          order_item_id?: string | null
          preview_url: string
          responded_at?: string | null
          status?: string
          version?: number
        }
        Update: {
          created_at?: string
          customer_comment?: string | null
          id?: string
          order_id?: string
          order_item_id?: string | null
          preview_url?: string
          responded_at?: string | null
          status?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "artwork_approvals_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "artwork_approvals_order_item_id_fkey"
            columns: ["order_item_id"]
            isOneToOne: false
            referencedRelation: "order_items"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          icon: string | null
          id: string
          image_url: string | null
          name: string
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          name: string
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          name?: string
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      coupons: {
        Row: {
          active: boolean
          category_ids: string[] | null
          code: string
          created_at: string
          discount_type: string
          discount_value: number
          free_shipping: boolean
          id: string
          max_uses: number | null
          min_order_total: number
          product_ids: string[] | null
          segment_ids: string[] | null
          updated_at: string
          used_count: number
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          active?: boolean
          category_ids?: string[] | null
          code: string
          created_at?: string
          discount_type?: string
          discount_value?: number
          free_shipping?: boolean
          id?: string
          max_uses?: number | null
          min_order_total?: number
          product_ids?: string[] | null
          segment_ids?: string[] | null
          updated_at?: string
          used_count?: number
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          active?: boolean
          category_ids?: string[] | null
          code?: string
          created_at?: string
          discount_type?: string
          discount_value?: number
          free_shipping?: boolean
          id?: string
          max_uses?: number | null
          min_order_total?: number
          product_ids?: string[] | null
          segment_ids?: string[] | null
          updated_at?: string
          used_count?: number
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: []
      }
      customization_fields: {
        Row: {
          created_at: string
          field_key: string
          field_type: string
          help_text: string | null
          id: string
          label: string
          options: Json | null
          product_id: string
          required: boolean
          sort_order: number
        }
        Insert: {
          created_at?: string
          field_key: string
          field_type?: string
          help_text?: string | null
          id?: string
          label: string
          options?: Json | null
          product_id: string
          required?: boolean
          sort_order?: number
        }
        Update: {
          created_at?: string
          field_key?: string
          field_type?: string
          help_text?: string | null
          id?: string
          label?: string
          options?: Json | null
          product_id?: string
          required?: boolean
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "customization_fields_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      email_send_log: {
        Row: {
          created_at: string
          error_message: string | null
          id: string
          message_id: string | null
          metadata: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email: string
          status: string
          template_name: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          id?: string
          message_id?: string | null
          metadata?: Json | null
          recipient_email?: string
          status?: string
          template_name?: string
        }
        Relationships: []
      }
      email_send_state: {
        Row: {
          auth_email_ttl_minutes: number
          batch_size: number
          id: number
          retry_after_until: string | null
          send_delay_ms: number
          transactional_email_ttl_minutes: number
          updated_at: string
        }
        Insert: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Update: {
          auth_email_ttl_minutes?: number
          batch_size?: number
          id?: number
          retry_after_until?: string | null
          send_delay_ms?: number
          transactional_email_ttl_minutes?: number
          updated_at?: string
        }
        Relationships: []
      }
      email_unsubscribe_tokens: {
        Row: {
          created_at: string
          email: string
          id: string
          token: string
          used_at: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          token: string
          used_at?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          token?: string
          used_at?: string | null
        }
        Relationships: []
      }
      order_item_files: {
        Row: {
          created_at: string
          field_key: string | null
          file_name: string | null
          file_url: string
          id: string
          order_item_id: string
        }
        Insert: {
          created_at?: string
          field_key?: string | null
          file_name?: string | null
          file_url: string
          id?: string
          order_item_id: string
        }
        Update: {
          created_at?: string
          field_key?: string | null
          file_name?: string | null
          file_url?: string
          id?: string
          order_item_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_item_files_order_item_id_fkey"
            columns: ["order_item_id"]
            isOneToOne: false
            referencedRelation: "order_items"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          base_price: number | null
          created_at: string
          customization: Json | null
          id: string
          line_total: number
          order_id: string
          product_id: string | null
          product_image: string | null
          product_name: string
          product_slug: string | null
          production_days: number
          quantity: number
          requires_artwork: boolean
          sku: string | null
          unit_price: number
        }
        Insert: {
          base_price?: number | null
          created_at?: string
          customization?: Json | null
          id?: string
          line_total: number
          order_id: string
          product_id?: string | null
          product_image?: string | null
          product_name: string
          product_slug?: string | null
          production_days?: number
          quantity?: number
          requires_artwork?: boolean
          sku?: string | null
          unit_price: number
        }
        Update: {
          base_price?: number | null
          created_at?: string
          customization?: Json | null
          id?: string
          line_total?: number
          order_id?: string
          product_id?: string | null
          product_image?: string | null
          product_name?: string
          product_slug?: string | null
          production_days?: number
          quantity?: number
          requires_artwork?: boolean
          sku?: string | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          coupon_code: string | null
          created_at: string
          customer_document: string | null
          customer_email: string
          customer_name: string
          customer_phone: string | null
          delivery_method: string
          discount_total: number
          id: string
          notes: string | null
          order_number: string
          payment_method: string | null
          payment_status: string
          pickup_location_id: string | null
          production_days: number
          requires_artwork: boolean
          shipping_carrier: string | null
          shipping_city: string | null
          shipping_complement: string | null
          shipping_cost: number
          shipping_days_max: number | null
          shipping_days_min: number | null
          shipping_district: string | null
          shipping_number: string | null
          shipping_origin_postal_code: string | null
          shipping_postal_code: string | null
          shipping_provider: string | null
          shipping_quote_data: Json | null
          shipping_quoted_at: string | null
          shipping_service: string | null
          shipping_service_id: string | null
          shipping_state: string | null
          shipping_street: string | null
          status: string
          subtotal: number
          total: number
          tracking_code: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          coupon_code?: string | null
          created_at?: string
          customer_document?: string | null
          customer_email: string
          customer_name: string
          customer_phone?: string | null
          delivery_method?: string
          discount_total?: number
          id?: string
          notes?: string | null
          order_number: string
          payment_method?: string | null
          payment_status?: string
          pickup_location_id?: string | null
          production_days?: number
          requires_artwork?: boolean
          shipping_carrier?: string | null
          shipping_city?: string | null
          shipping_complement?: string | null
          shipping_cost?: number
          shipping_days_max?: number | null
          shipping_days_min?: number | null
          shipping_district?: string | null
          shipping_number?: string | null
          shipping_origin_postal_code?: string | null
          shipping_postal_code?: string | null
          shipping_provider?: string | null
          shipping_quote_data?: Json | null
          shipping_quoted_at?: string | null
          shipping_service?: string | null
          shipping_service_id?: string | null
          shipping_state?: string | null
          shipping_street?: string | null
          status?: string
          subtotal?: number
          total?: number
          tracking_code?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          coupon_code?: string | null
          created_at?: string
          customer_document?: string | null
          customer_email?: string
          customer_name?: string
          customer_phone?: string | null
          delivery_method?: string
          discount_total?: number
          id?: string
          notes?: string | null
          order_number?: string
          payment_method?: string | null
          payment_status?: string
          pickup_location_id?: string | null
          production_days?: number
          requires_artwork?: boolean
          shipping_carrier?: string | null
          shipping_city?: string | null
          shipping_complement?: string | null
          shipping_cost?: number
          shipping_days_max?: number | null
          shipping_days_min?: number | null
          shipping_district?: string | null
          shipping_number?: string | null
          shipping_origin_postal_code?: string | null
          shipping_postal_code?: string | null
          shipping_provider?: string | null
          shipping_quote_data?: Json | null
          shipping_quoted_at?: string | null
          shipping_service?: string | null
          shipping_service_id?: string | null
          shipping_state?: string | null
          shipping_street?: string | null
          status?: string
          subtotal?: number
          total?: number
          tracking_code?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_pickup_location_id_fkey"
            columns: ["pickup_location_id"]
            isOneToOne: false
            referencedRelation: "pickup_locations"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          id: string
          method: string | null
          order_id: string
          provider: string | null
          provider_payment_id: string | null
          raw: Json | null
          status: string
          updated_at: string
        }
        Insert: {
          amount?: number
          created_at?: string
          id?: string
          method?: string | null
          order_id: string
          provider?: string | null
          provider_payment_id?: string | null
          raw?: Json | null
          status?: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          method?: string | null
          order_id?: string
          provider?: string | null
          provider_payment_id?: string | null
          raw?: Json | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      pickup_locations: {
        Row: {
          active: boolean
          address: string
          city: string | null
          created_at: string
          id: string
          name: string
          opening_hours: string | null
          postal_code: string | null
          ready_in_days: number
          state: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          address: string
          city?: string | null
          created_at?: string
          id?: string
          name: string
          opening_hours?: string | null
          postal_code?: string | null
          ready_in_days?: number
          state?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          address?: string
          city?: string | null
          created_at?: string
          id?: string
          name?: string
          opening_hours?: string | null
          postal_code?: string | null
          ready_in_days?: number
          state?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      product_categories: {
        Row: {
          category_id: string
          product_id: string
        }
        Insert: {
          category_id: string
          product_id: string
        }
        Update: {
          category_id?: string
          product_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_categories_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_images: {
        Row: {
          alt: string | null
          created_at: string
          id: string
          product_id: string
          sort_order: number
          url: string
        }
        Insert: {
          alt?: string | null
          created_at?: string
          id?: string
          product_id: string
          sort_order?: number
          url: string
        }
        Update: {
          alt?: string | null
          created_at?: string
          id?: string
          product_id?: string
          sort_order?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_segments: {
        Row: {
          product_id: string
          segment_id: string
        }
        Insert: {
          product_id: string
          segment_id: string
        }
        Update: {
          product_id?: string
          segment_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_segments_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_segments_segment_id_fkey"
            columns: ["segment_id"]
            isOneToOne: false
            referencedRelation: "segments"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          active: boolean
          best_seller: boolean
          compare_at_price: number | null
          cost: number | null
          created_at: string
          customizable: boolean
          description: string | null
          featured: boolean
          height_cm: number
          id: string
          is_new: boolean
          length_cm: number
          made_to_order: boolean
          max_per_package: number | null
          name: string
          on_sale: boolean
          pix_discount_percent: number | null
          price: number
          production_days: number
          rating: number
          reviews_count: number
          sales_count: number
          seo_description: string | null
          seo_title: string | null
          short_description: string | null
          sku: string | null
          slug: string
          stock: number
          updated_at: string
          weight_g: number
          width_cm: number
        }
        Insert: {
          active?: boolean
          best_seller?: boolean
          compare_at_price?: number | null
          cost?: number | null
          created_at?: string
          customizable?: boolean
          description?: string | null
          featured?: boolean
          height_cm?: number
          id?: string
          is_new?: boolean
          length_cm?: number
          made_to_order?: boolean
          max_per_package?: number | null
          name: string
          on_sale?: boolean
          pix_discount_percent?: number | null
          price?: number
          production_days?: number
          rating?: number
          reviews_count?: number
          sales_count?: number
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          sku?: string | null
          slug: string
          stock?: number
          updated_at?: string
          weight_g?: number
          width_cm?: number
        }
        Update: {
          active?: boolean
          best_seller?: boolean
          compare_at_price?: number | null
          cost?: number | null
          created_at?: string
          customizable?: boolean
          description?: string | null
          featured?: boolean
          height_cm?: number
          id?: string
          is_new?: boolean
          length_cm?: number
          made_to_order?: boolean
          max_per_package?: number | null
          name?: string
          on_sale?: boolean
          pix_discount_percent?: number | null
          price?: number
          production_days?: number
          rating?: number
          reviews_count?: number
          sales_count?: number
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          sku?: string | null
          slug?: string
          stock?: number
          updated_at?: string
          weight_g?: number
          width_cm?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          document: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          document?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          document?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      quantity_pricing: {
        Row: {
          created_at: string
          id: string
          max_qty: number | null
          min_qty: number
          product_id: string
          unit_price: number
        }
        Insert: {
          created_at?: string
          id?: string
          max_qty?: number | null
          min_qty: number
          product_id: string
          unit_price: number
        }
        Update: {
          created_at?: string
          id?: string
          max_qty?: number | null
          min_qty?: number
          product_id?: string
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "quantity_pricing_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          approved: boolean
          author_name: string | null
          comment: string | null
          created_at: string
          id: string
          product_id: string
          rating: number
          user_id: string | null
        }
        Insert: {
          approved?: boolean
          author_name?: string | null
          comment?: string | null
          created_at?: string
          id?: string
          product_id: string
          rating: number
          user_id?: string | null
        }
        Update: {
          approved?: boolean
          author_name?: string | null
          comment?: string | null
          created_at?: string
          id?: string
          product_id?: string
          rating?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      segments: {
        Row: {
          active: boolean
          created_at: string
          description: string | null
          icon: string | null
          id: string
          image_url: string | null
          name: string
          seo_description: string | null
          seo_title: string | null
          slug: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          name: string
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          name?: string
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      shipments: {
        Row: {
          carrier: string | null
          created_at: string
          delivered_at: string | null
          id: string
          label_url: string | null
          order_id: string
          service: string | null
          shipped_at: string | null
          status: string
          tracking_code: string | null
          updated_at: string
        }
        Insert: {
          carrier?: string | null
          created_at?: string
          delivered_at?: string | null
          id?: string
          label_url?: string | null
          order_id: string
          service?: string | null
          shipped_at?: string | null
          status?: string
          tracking_code?: string | null
          updated_at?: string
        }
        Update: {
          carrier?: string | null
          created_at?: string
          delivered_at?: string | null
          id?: string
          label_url?: string | null
          order_id?: string
          service?: string | null
          shipped_at?: string | null
          status?: string
          tracking_code?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "shipments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      shipping_quotes: {
        Row: {
          created_at: string
          destination_postal_code: string | null
          expires_at: string | null
          id: string
          items: Json | null
          items_hash: string | null
          options: Json | null
          order_id: string | null
          origin_postal_code: string | null
          packages: Json | null
          provider: string
        }
        Insert: {
          created_at?: string
          destination_postal_code?: string | null
          expires_at?: string | null
          id?: string
          items?: Json | null
          items_hash?: string | null
          options?: Json | null
          order_id?: string | null
          origin_postal_code?: string | null
          packages?: Json | null
          provider?: string
        }
        Update: {
          created_at?: string
          destination_postal_code?: string | null
          expires_at?: string | null
          id?: string
          items?: Json | null
          items_hash?: string | null
          options?: Json | null
          order_id?: string | null
          origin_postal_code?: string | null
          packages?: Json | null
          provider?: string
        }
        Relationships: [
          {
            foreignKeyName: "shipping_quotes_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      shipping_settings: {
        Row: {
          created_at: string
          disabled_services: Json
          free_shipping_local: boolean
          free_shipping_local_city: string
          free_shipping_min_total: number | null
          handling_days: number
          id: number
          origin_city: string
          origin_country: string
          origin_postal_code: string
          origin_state: string
          quote_ttl_minutes: number
          shipping_markup_percent: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          disabled_services?: Json
          free_shipping_local?: boolean
          free_shipping_local_city?: string
          free_shipping_min_total?: number | null
          handling_days?: number
          id?: number
          origin_city?: string
          origin_country?: string
          origin_postal_code?: string
          origin_state?: string
          quote_ttl_minutes?: number
          shipping_markup_percent?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          disabled_services?: Json
          free_shipping_local?: boolean
          free_shipping_local_city?: string
          free_shipping_min_total?: number | null
          handling_days?: number
          id?: number
          origin_city?: string
          origin_country?: string
          origin_postal_code?: string
          origin_state?: string
          quote_ttl_minutes?: number
          shipping_markup_percent?: number
          updated_at?: string
        }
        Relationships: []
      }
      suppressed_emails: {
        Row: {
          created_at: string
          email: string
          id: string
          metadata: Json | null
          reason: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          metadata?: Json | null
          reason: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          metadata?: Json | null
          reason?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_delete_order: { Args: { _order_id: string }; Returns: boolean }
      delete_email: {
        Args: { message_id: number; queue_name: string }
        Returns: boolean
      }
      email_queue_dispatch: { Args: never; Returns: undefined }
      enqueue_email: {
        Args: { payload: Json; queue_name: string }
        Returns: number
      }
      get_order_public: {
        Args: { _email: string; _order_number: string }
        Returns: Json
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      move_to_dlq: {
        Args: {
          dlq_name: string
          message_id: number
          payload: Json
          source_queue: string
        }
        Returns: number
      }
      read_email_batch: {
        Args: { batch_size: number; queue_name: string; vt: number }
        Returns: {
          message: Json
          msg_id: number
          read_ct: number
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "customer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "customer"],
    },
  },
} as const
