import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xczpyftawjpsijmzygrc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjenB5ZnRhd2pwc2lqbXp5Z3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxNTg4MjUsImV4cCI6MjA5NTczNDgyNX0.tE3TcIYTdGbDRGKIgpZhnVihfYjUHvahmpwKAsH73xQ'

export const supabase = createClient(supabaseUrl, supabaseKey, {
  db: { schema: 'public' },
  auth: { persistSession: false }
})
