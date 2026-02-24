import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ssmjjtbvrakzfsxezavp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_GayEMildDmOJsQB6QW5pjw_GrhTDrQE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
