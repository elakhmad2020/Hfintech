import { supabase } from './supabase';

function generateSpanID(name) {
  const prefix = "SPN";
  const year = new Date().getFullYear().toString().slice(-2);
  const nameCode = name ? name.slice(0, 2).toUpperCase() : "XX";
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-${year}-${nameCode}-${rand}`;
}

function generateAccountNumber() {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

export async function registerUser({ name, email, phone, password, dob, sex }) {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });
    if (authError) throw authError;

    const userId = authData.user.id;
    const spanID = generateSpanID(name);

    const { error: profileError } = await supabase.from('profiles').insert({
      id: userId,
      span_id: spanID,
      full_name: name,
      phone,
      date_of_birth: dob || null,
      sex,
    });
    if (profileError) throw profileError;

    let account_number = generateAccountNumber();
    let account_name = name;
    let bank_name = 'Span Bank';
    let customer_code = '';

    try {
      const { data: dvaData, error: dvaError } = await supabase.functions.invoke('create-dva', {
        body: { email, name, phone }
      });
      if (!dvaError && dvaData && dvaData.success) {
        account_number = dvaData.account_number || account_number;
        account_name = dvaData.account_name || account_name;
        bank_name = dvaData.bank_name || bank_name;
        customer_code = dvaData.customer_code || '';
      }
    } catch (e) {
      console.log('DVA creation failed, using generated number:', e.message);
    }

    const { error: walletError } = await supabase.from('wallets').insert({
      user_id: userId,
      balance: 0,
      account_number,
      account_name,
      bank_name,
      customer_code,
    });
    if (walletError) throw walletError;

    return { success: true, user: authData.user, spanID };

  } catch (error) {
    return { success: false, error: error.message };
  }
}

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

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) throw error;
  return data;
}

export async function getWallet(userId) {
  const { data, error } = await supabase
    .from('wallets')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (error) throw error;
  return data;
}

export async function getTransactions(userId) {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function updateProfile(userId, updates) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
  if (error) throw error;
  return data;
}

export async function uploadAvatar(userId, file) {
  const fileExt = file.name.split('.').pop();
  const filePath = `avatars/${userId}.${fileExt}`;
  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, { upsert: true });
  if (uploadError) throw uploadError;
  const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
  return data.publicUrl;
}