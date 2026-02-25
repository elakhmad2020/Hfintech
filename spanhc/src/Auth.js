import { supabase } from './supabase';

// Generate Span ID
function generateSpanID(name) {
  const prefix = "SPN";
  const year = new Date().getFullYear().toString().slice(-2);
  const nameCode = name ? name.slice(0, 2).toUpperCase() : "XX";
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-${year}-${nameCode}-${rand}`;
}

// Generate wallet account number
function generateAccountNumber() {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

// REGISTER
export async function registerUser({ name, email, phone, password, dob, sex }) {
  try {
    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });
    if (authError) throw authError;

    const userId = authData.user.id;
    const spanID = generateSpanID(name);

    // 2. Create profile
    const { error: profileError } = await supabase.from('profiles').insert({
      id: userId,
      span_id: spanID,
      full_name: name,
      phone,
      date_of_birth: dob,
      sex,
    });
    if (profileError) throw profileError;

    // 3. Create wallet
    const { error: walletError } = await supabase.from('wallets').insert({
      user_id: userId,
      balance: 0,
      account_number: generateAccountNumber(),
    });
    if (walletError) throw walletError;

    return { success: true, user: authData.user, spanID };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// LOGIN
export async function loginUser({ email, password }) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return { success: true, user: data.user, session: data.session };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// LOGOUT
export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// GET CURRENT USER
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// GET PROFILE
export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
}

// GET WALLET
export async function getWallet(userId) {
  const { data, error } = await supabase
    .from('wallets')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (error) throw error;
  return data;
}

// GET TRANSACTIONS
export async function getTransactions(userId) {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}