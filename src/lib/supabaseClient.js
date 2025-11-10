import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iegyaziwbyzugxwbqrjt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllZ3lheml3Ynl6dWd4d2Jxcmp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4MDk1MDUsImV4cCI6MjA3NjM4NTUwNX0.1cydhnGIng2Ue049pKpB3TyRoKBeHoajpsyUmS1UtYc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)