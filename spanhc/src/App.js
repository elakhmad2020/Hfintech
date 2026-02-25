import { useState, useRef, useEffect } from "react";
import { registerUser, loginUser, logoutUser, getCurrentUser, getProfile, getWallet, getTransactions } from './Auth';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Manrope:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --primary: #3D9CB0;
    --primary-light: #56b4c8;
    --primary-dark: #2d8a9e;
    --primary-pale: #e8f6f9;
    --secondary: #98B7B9;
    --secondary-light: #b0cccf;
    --secondary-pale: #f0f7f8;
    --navy: #0f1f2e;
    --navy-mid: #1a2f42;
    --navy-light: #2a4560;
    --slate: #5a7a8a;
    --slate-light: #8aaabb;
    --bg: #f4f9fa;
    --white: #ffffff;
    --danger: #e05252;
    --success: #2fb88a;
    --warning: #e8a444;
    --card-shadow: 0 2px 20px rgba(61,156,176,0.08);
    --card-shadow-hover: 0 8px 32px rgba(61,156,176,0.16);
  }

  body { font-family: 'Manrope', sans-serif; background: var(--bg); color: var(--navy); }
  h1,h2,h3,h4,h5 { font-family: 'Montserrat', sans-serif; }

  .app { display: flex; flex-direction: column; min-height: 100vh; }

  .auth-screen { min-height: 100vh; display: grid; grid-template-columns: 1.1fr 0.9fr; background: var(--white); }
  .auth-left {
    background: linear-gradient(160deg, var(--navy) 0%, var(--navy-mid) 40%, var(--primary-dark) 100%);
    display: flex; flex-direction: column; justify-content: center; align-items: flex-start;
    padding: 64px; position: relative; overflow: hidden;
  }
  .auth-left::before { content: ''; position: absolute; bottom: -120px; right: -80px; width: 500px; height: 500px; background: radial-gradient(circle, rgba(61,156,176,0.25) 0%, transparent 70%); border-radius: 50%; }
  .auth-left::after { content: ''; position: absolute; top: -80px; left: -60px; width: 300px; height: 300px; background: radial-gradient(circle, rgba(152,183,185,0.15) 0%, transparent 70%); border-radius: 50%; }
  .auth-logo { display: flex; align-items: center; gap: 14px; margin-bottom: 56px; z-index: 1; position: relative; }
  .auth-logo-img { height: 52px; width: auto; object-fit: contain; }
  .auth-logo-icon { width: 52px; height: 52px; background: var(--primary); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; color: white; font-family: 'Montserrat', sans-serif; letter-spacing: 0.5px; box-shadow: 0 4px 16px rgba(61,156,176,0.4); }
  .auth-logo-text { font-family: 'Montserrat', sans-serif; font-size: 20px; font-weight: 800; color: white; line-height: 1.2; }
  .auth-logo-sub { font-size: 11px; color: var(--secondary); font-weight: 500; letter-spacing: 1px; text-transform: uppercase; }
  .auth-headline { font-size: 40px; font-weight: 800; color: white; line-height: 1.15; margin-bottom: 20px; z-index: 1; position: relative; font-family: 'Montserrat', sans-serif; }
  .auth-headline span { color: var(--secondary-light); }
  .auth-sub { font-size: 15px; color: rgba(255,255,255,0.65); line-height: 1.8; z-index: 1; position: relative; max-width: 360px; font-family: 'Manrope', sans-serif; }
  .auth-features { margin-top: 44px; display: flex; flex-direction: column; gap: 14px; z-index: 1; position: relative; }
  .auth-feature { display: flex; align-items: center; gap: 12px; color: rgba(255,255,255,0.8); font-size: 14px; font-family: 'Manrope', sans-serif; }
  .auth-feature-dot { width: 7px; height: 7px; background: var(--primary); border-radius: 50%; flex-shrink: 0; box-shadow: 0 0 8px rgba(61,156,176,0.6); }

  .auth-right { display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 56px; background: var(--white); }
  .auth-form-container { width: 100%; max-width: 400px; }
  .auth-form-title { font-size: 28px; font-weight: 800; color: var(--navy); margin-bottom: 6px; font-family: 'Montserrat', sans-serif; }
  .auth-form-sub { color: var(--slate); font-size: 13px; margin-bottom: 36px; font-family: 'Manrope', sans-serif; }

  .form-group { margin-bottom: 18px; }
  .form-label { display: block; font-size: 11px; font-weight: 700; color: var(--slate); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.8px; font-family: 'Montserrat', sans-serif; }
  .form-input { width: 100%; padding: 13px 16px; border: 1.5px solid #dce8eb; border-radius: 10px; font-size: 14px; font-family: 'Manrope', sans-serif; color: var(--navy); background: var(--bg); transition: all 0.2s; outline: none; }
  .form-input:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(61,156,176,0.12); background: white; }
  .form-select { width: 100%; padding: 13px 16px; border: 1.5px solid #dce8eb; border-radius: 10px; font-size: 14px; font-family: 'Manrope', sans-serif; color: var(--navy); background: var(--bg); outline: none; transition: all 0.2s; cursor: pointer; }
  .form-select:focus { border-color: var(--primary); }

  .consent-box { background: var(--primary-pale); border: 1.5px solid var(--secondary); border-radius: 12px; padding: 16px; margin-bottom: 20px; }
  .consent-title { font-size: 13px; font-weight: 700; color: var(--navy); margin-bottom: 8px; font-family: 'Montserrat', sans-serif; }
  .consent-text { font-size: 12px; color: var(--slate); line-height: 1.7; margin-bottom: 12px; font-family: 'Manrope', sans-serif; }
  .consent-check { display: flex; align-items: flex-start; gap: 10px; cursor: pointer; }
  .consent-check input { margin-top: 2px; accent-color: var(--primary); width: 16px; height: 16px; flex-shrink: 0; }
  .consent-check-label { font-size: 12px; color: var(--navy); font-family: 'Manrope', sans-serif; line-height: 1.6; }
  .consent-check-label span { color: var(--primary); font-weight: 700; cursor: pointer; }

  .btn { padding: 13px 22px; border-radius: 10px; font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 14px; cursor: pointer; border: none; transition: all 0.2s; display: inline-flex; align-items: center; gap: 8px; }
  .btn-primary { background: var(--primary); color: white; width: 100%; justify-content: center; letter-spacing: 0.3px; }
  .btn-primary:hover { background: var(--primary-dark); transform: translateY(-1px); box-shadow: 0 6px 18px rgba(61,156,176,0.35); }
  .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: none; }
  .btn-outline { background: transparent; color: var(--primary); border: 1.5px solid var(--primary); }
  .btn-outline:hover { background: var(--primary-pale); }
  .btn-sm { padding: 8px 16px; font-size: 12px; border-radius: 8px; width: auto; }
  .btn-ghost { background: transparent; color: var(--slate); border: none; font-family: 'Manrope', sans-serif; }
  .btn-ghost:hover { color: var(--primary); background: var(--primary-pale); }

  .auth-tabs { display: flex; margin-bottom: 28px; border: 1.5px solid #dce8eb; border-radius: 10px; overflow: hidden; }
  .auth-tab { flex: 1; padding: 11px; font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 13px; background: var(--white); color: var(--slate); cursor: pointer; border: none; transition: all 0.2s; }
  .auth-tab.active { background: var(--primary); color: white; }

  .divider { display: flex; align-items: center; gap: 14px; margin: 20px 0; }
  .divider-line { flex: 1; height: 1px; background: #dce8eb; }
  .divider-text { color: var(--slate-light); font-size: 12px; font-family: 'Manrope', sans-serif; }

  .verify-screen { text-align: center; padding: 24px 0; }
  .verify-title { font-size: 22px; font-weight: 800; color: var(--navy); margin-bottom: 8px; font-family: 'Montserrat', sans-serif; }
  .verify-sub { color: var(--slate); font-size: 13px; margin-bottom: 28px; line-height: 1.7; font-family: 'Manrope', sans-serif; }
  .otp-inputs { display: flex; gap: 8px; justify-content: center; margin-bottom: 24px; }
  .otp-input { width: 46px; height: 54px; text-align: center; font-size: 22px; font-weight: 700; border: 1.5px solid #dce8eb; border-radius: 10px; font-family: 'Montserrat', sans-serif; color: var(--navy); background: var(--bg); outline: none; transition: all 0.2s; }
  .otp-input:focus { border-color: var(--primary); }

  .main-layout { display: flex; min-height: 100vh; }
  .sidebar { width: 248px; min-height: 100vh; background: var(--navy); display: flex; flex-direction: column; position: fixed; left: 0; top: 0; bottom: 0; z-index: 100; }
  .sidebar-logo { padding: 22px 18px; border-bottom: 1px solid rgba(255,255,255,0.07); display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.12); }
  .sidebar-logo-icon { width: 34px; height: 34px; background: var(--primary); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 800; color: white; font-family: 'Montserrat', sans-serif; letter-spacing: 0.3px; }
  .sidebar-logo-img { height: 34px; width: auto; object-fit: contain; }
  .sidebar-logo-name { font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 800; color: white; line-height: 1.2; }
  .sidebar-logo-tag { font-size: 9px; color: var(--secondary); font-weight: 500; letter-spacing: 0.8px; text-transform: uppercase; }
  .logout-btn { display: flex; align-items: center; gap: 8px; padding: 9px 11px; border-radius: 9px; cursor: pointer; color: rgba(255,255,255,0.45); font-size: 12px; font-weight: 600; transition: all 0.2s; background: none; border: none; width: 100%; font-family: 'Manrope', sans-serif; margin-top: 6px; }
  .logout-btn:hover { background: rgba(224,82,82,0.15); color: #e05252; }
  .sidebar-nav { flex: 1; padding: 14px 10px; overflow-y: auto; }
  .sidebar-section-label { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: rgba(255,255,255,0.25); padding: 8px 8px 4px; margin-top: 14px; font-family: 'Montserrat', sans-serif; }
  .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 11px; border-radius: 9px; cursor: pointer; color: rgba(255,255,255,0.55); font-size: 13px; font-weight: 500; transition: all 0.2s; margin-bottom: 2px; font-family: 'Manrope', sans-serif; }
  .nav-item:hover { background: rgba(255,255,255,0.07); color: white; }
  .nav-item.active { background: var(--primary); color: white; }
  .nav-icon { width: 26px; height: 26px; border-radius: 6px; background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 700; flex-shrink: 0; font-family: 'Montserrat', sans-serif; }
  .nav-item.active .nav-icon { background: rgba(255,255,255,0.2); }
  .nav-badge { margin-left: auto; background: var(--primary-light); color: white; font-size: 9px; font-weight: 700; border-radius: 20px; padding: 2px 7px; }
  .sidebar-footer { padding: 14px 10px; border-top: 1px solid rgba(255,255,255,0.07); }
  .sidebar-user { display: flex; align-items: center; gap: 10px; padding: 9px 8px; border-radius: 9px; cursor: pointer; transition: all 0.2s; }
  .sidebar-user:hover { background: rgba(255,255,255,0.07); }
  .sidebar-avatar { width: 34px; height: 34px; border-radius: 9px; background: var(--primary); display: flex; align-items: center; justify-content: center; font-weight: 700; color: white; font-size: 12px; flex-shrink: 0; font-family: 'Montserrat', sans-serif; overflow: hidden; }
  .sidebar-avatar img { width: 100%; height: 100%; object-fit: cover; }
  .sidebar-user-name { font-size: 13px; font-weight: 600; color: white; font-family: 'Manrope', sans-serif; }
  .sidebar-user-role { font-size: 10px; color: rgba(255,255,255,0.4); font-family: 'Manrope', sans-serif; }

  .main-content { margin-left: 248px; flex: 1; padding: 28px 32px; background: var(--bg); min-height: 100vh; }
  .topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }
  .page-title { font-size: 24px; font-weight: 800; color: var(--navy); font-family: 'Montserrat', sans-serif; }
  .page-sub { font-size: 13px; color: var(--slate); margin-top: 2px; font-family: 'Manrope', sans-serif; }

  .card { background: white; border-radius: 16px; padding: 22px; box-shadow: var(--card-shadow); transition: box-shadow 0.2s; }
  .card:hover { box-shadow: var(--card-shadow-hover); }
  .card-title { font-size: 15px; font-weight: 700; color: var(--navy); margin-bottom: 4px; font-family: 'Montserrat', sans-serif; }
  .card-sub { font-size: 12px; color: var(--slate); font-family: 'Manrope', sans-serif; }

  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
  .stat-card { background: white; border-radius: 16px; padding: 20px; box-shadow: var(--card-shadow); border-left: 3px solid var(--primary); }
  .stat-tag { display: inline-block; padding: 3px 9px; border-radius: 5px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; font-family: 'Montserrat', sans-serif; }
  .stat-value { font-size: 26px; font-weight: 800; font-family: 'Montserrat', sans-serif; color: var(--navy); }
  .stat-label { font-size: 12px; color: var(--slate); margin-top: 3px; font-family: 'Manrope', sans-serif; }
  .stat-change { font-size: 11px; font-weight: 600; margin-top: 6px; font-family: 'Manrope', sans-serif; }
  .stat-change.up { color: var(--success); }
  .stat-change.down { color: var(--danger); }

  .wallet-card { background: linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 50%, var(--primary-dark) 100%); border-radius: 20px; padding: 28px; color: white; position: relative; overflow: hidden; }
  .wallet-card::before { content: ''; position: absolute; top: -50px; right: -30px; width: 180px; height: 180px; border-radius: 50%; background: rgba(61,156,176,0.15); }
  .wallet-card::after { content: ''; position: absolute; bottom: -40px; left: 20px; width: 120px; height: 120px; border-radius: 50%; background: rgba(152,183,185,0.1); }
  .wallet-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; opacity: 0.6; margin-bottom: 6px; font-family: 'Montserrat', sans-serif; }
  .wallet-amount { font-size: 38px; font-weight: 800; font-family: 'Montserrat', sans-serif; position: relative; z-index: 1; }
  .wallet-id { font-size: 12px; opacity: 0.5; margin-top: 4px; letter-spacing: 2px; font-family: 'Manrope', sans-serif; }
  .wallet-actions { display: flex; gap: 10px; margin-top: 24px; position: relative; z-index: 1; }
  .wallet-btn { flex: 1; padding: 11px; border-radius: 10px; font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 12px; cursor: pointer; border: none; transition: all 0.2s; letter-spacing: 0.3px; }
  .wallet-btn-primary { background: var(--primary); color: white; }
  .wallet-btn-primary:hover { background: var(--primary-light); }
  .wallet-btn-outline { background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2); }
  .wallet-btn-outline:hover { background: rgba(255,255,255,0.18); }

  .txn-list { display: flex; flex-direction: column; gap: 10px; }
  .txn-item { display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 12px; background: var(--bg); transition: background 0.2s; cursor: pointer; }
  .txn-item:hover { background: var(--primary-pale); }
  .txn-icon { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; flex-shrink: 0; font-family: 'Montserrat', sans-serif; }
  .txn-info { flex: 1; }
  .txn-name { font-size: 13px; font-weight: 600; color: var(--navy); font-family: 'Manrope', sans-serif; }
  .txn-date { font-size: 11px; color: var(--slate); margin-top: 1px; font-family: 'Manrope', sans-serif; }
  .txn-amount { font-size: 14px; font-weight: 700; font-family: 'Montserrat', sans-serif; }
  .txn-amount.credit { color: var(--success); }
  .txn-amount.debit { color: var(--danger); }

  .dashboard-grid { display: grid; grid-template-columns: 1fr 320px; gap: 20px; }

  .health-score-card { background: linear-gradient(135deg, #e8f6f9 0%, #d4eef2 100%); border-radius: 16px; padding: 20px; border: 1.5px solid var(--secondary); }
  .health-score-value { font-size: 44px; font-weight: 800; font-family: 'Montserrat', sans-serif; color: var(--primary); }
  .health-score-bar { height: 6px; background: rgba(61,156,176,0.2); border-radius: 3px; overflow: hidden; margin-top: 10px; }
  .health-score-fill { height: 100%; background: var(--primary); border-radius: 3px; }

  .quick-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
  .quick-action { background: white; border-radius: 14px; padding: 18px; text-align: center; cursor: pointer; transition: all 0.2s; box-shadow: var(--card-shadow); border: 1.5px solid transparent; }
  .quick-action:hover { border-color: var(--primary); transform: translateY(-2px); }
  .quick-action-icon { width: 36px; height: 36px; border-radius: 9px; background: var(--primary-pale); display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; font-size: 10px; font-weight: 700; color: var(--primary-dark); font-family: 'Montserrat', sans-serif; }
  .quick-action-label { font-size: 12px; font-weight: 600; color: var(--navy); font-family: 'Manrope', sans-serif; }

  .id-card { background: linear-gradient(135deg, var(--navy) 0%, var(--primary-dark) 100%); border-radius: 18px; padding: 24px; color: white; position: relative; overflow: hidden; }
  .id-card::before { content: ''; position: absolute; top: -40px; right: -40px; width: 160px; height: 160px; border-radius: 50%; background: rgba(61,156,176,0.2); }
  .id-card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; position: relative; z-index: 1; }
  .id-card-logo { font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 800; color: white; }
  .id-card-logo-sub { font-size: 8px; color: var(--secondary); letter-spacing: 1px; text-transform: uppercase; }
  .id-card-type { font-size: 9px; background: rgba(255,255,255,0.15); padding: 3px 8px; border-radius: 20px; letter-spacing: 0.5px; font-family: 'Manrope', sans-serif; }
  .id-card-body { display: flex; gap: 16px; align-items: flex-start; position: relative; z-index: 1; }
  .id-card-photo { width: 64px; height: 64px; border-radius: 12px; background: rgba(255,255,255,0.15); border: 2px solid rgba(255,255,255,0.3); overflow: hidden; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 18px; font-family: 'Montserrat', sans-serif; }
  .id-card-photo img { width: 100%; height: 100%; object-fit: cover; }
  .id-card-name { font-size: 16px; font-weight: 800; font-family: 'Montserrat', sans-serif; margin-bottom: 4px; }
  .id-card-id { font-size: 10px; color: var(--secondary-light); letter-spacing: 1.5px; font-family: 'Manrope', sans-serif; margin-bottom: 8px; }
  .id-card-details { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
  .id-card-detail-label { font-size: 8px; text-transform: uppercase; letter-spacing: 0.5px; color: rgba(255,255,255,0.5); font-family: 'Montserrat', sans-serif; }
  .id-card-detail-value { font-size: 11px; font-weight: 600; color: white; font-family: 'Manrope', sans-serif; }
  .id-card-footer { margin-top: 16px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.15); display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 1; }
  .id-card-valid { font-size: 9px; color: rgba(255,255,255,0.5); font-family: 'Manrope', sans-serif; text-align: right; }

  .profile-photo-upload { position: relative; width: 100px; height: 100px; cursor: pointer; }
  .profile-photo { width: 100px; height: 100px; border-radius: 20px; background: var(--primary); display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 800; color: white; overflow: hidden; font-family: 'Montserrat', sans-serif; }
  .profile-photo img { width: 100%; height: 100%; object-fit: cover; }
  .profile-photo-overlay { position: absolute; inset: 0; border-radius: 20px; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s; font-size: 11px; font-weight: 700; color: white; font-family: 'Montserrat', sans-serif; }
  .profile-photo-upload:hover .profile-photo-overlay { opacity: 1; }
  .profile-name { font-size: 22px; font-weight: 800; color: var(--navy); font-family: 'Montserrat', sans-serif; }
  .profile-id { font-size: 11px; color: var(--primary); font-weight: 600; letter-spacing: 1px; margin-top: 3px; font-family: 'Manrope', sans-serif; }
  .profile-tags { display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap; }
  .profile-tag { padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; background: var(--primary-pale); color: var(--primary-dark); font-family: 'Manrope', sans-serif; }
  .form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

  .dependents-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 16px; margin-bottom: 20px; }
  .dependent-card { background: white; border-radius: 16px; padding: 20px; box-shadow: var(--card-shadow); transition: all 0.2s; position: relative; overflow: hidden; }
  .dependent-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--primary); }
  .dependent-card:hover { transform: translateY(-3px); box-shadow: var(--card-shadow-hover); }
  .dependent-avatar { width: 48px; height: 48px; border-radius: 12px; background: var(--primary); display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 800; color: white; margin-bottom: 12px; font-family: 'Montserrat', sans-serif; }
  .dependent-name { font-size: 15px; font-weight: 700; color: var(--navy); font-family: 'Montserrat', sans-serif; }
  .dependent-id { font-size: 10px; color: var(--primary); font-weight: 600; letter-spacing: 0.5px; margin-top: 2px; font-family: 'Manrope', sans-serif; }
  .dependent-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 12px; }
  .dependent-meta-label { font-size: 9px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--slate-light); font-weight: 700; font-family: 'Montserrat', sans-serif; }
  .dependent-meta-value { font-size: 13px; font-weight: 600; color: var(--navy); margin-top: 1px; font-family: 'Manrope', sans-serif; }

  .doctors-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 16px; }
  .doctor-card { background: white; border-radius: 16px; padding: 18px; box-shadow: var(--card-shadow); transition: all 0.2s; }
  .doctor-card:hover { transform: translateY(-2px); box-shadow: var(--card-shadow-hover); }
  .doctor-avatar { width: 54px; height: 54px; border-radius: 14px; background: var(--primary); display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 800; color: white; flex-shrink: 0; font-family: 'Montserrat', sans-serif; }
  .doctor-name { font-size: 15px; font-weight: 700; color: var(--navy); font-family: 'Montserrat', sans-serif; }
  .doctor-specialty { font-size: 12px; color: var(--primary); font-weight: 600; margin-top: 2px; font-family: 'Manrope', sans-serif; }
  .doctor-rating { font-size: 12px; font-weight: 600; color: var(--warning); margin-top: 3px; font-family: 'Manrope', sans-serif; }
  .status-dot { width: 7px; height: 7px; border-radius: 50%; display: inline-block; margin-right: 5px; }
  .status-dot.online { background: var(--success); }
  .status-dot.busy { background: var(--warning); }
  .status-dot.offline { background: var(--slate-light); }
  .doctor-tags { display: flex; gap: 5px; flex-wrap: wrap; margin: 8px 0; }
  .doctor-tag { padding: 2px 8px; border-radius: 20px; font-size: 10px; font-weight: 600; background: var(--bg); color: var(--slate); font-family: 'Manrope', sans-serif; }
  .doctor-call-actions { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 5px; margin-top: 10px; }
  .call-btn { padding: 9px; border-radius: 9px; font-size: 11px; font-weight: 700; cursor: pointer; border: none; transition: all 0.2s; font-family: 'Montserrat', sans-serif; }
  .call-btn-video { background: var(--primary-pale); color: var(--primary-dark); }
  .call-btn-video:hover { background: var(--primary); color: white; }
  .call-btn-audio { background: #dcfce7; color: #166534; }
  .call-btn-audio:hover { background: var(--success); color: white; }
  .call-btn-chat { background: #eff6ff; color: #1d4ed8; }
  .call-btn-chat:hover { background: #3b82f6; color: white; }

  .modal-overlay { position: fixed; inset: 0; background: rgba(15,31,46,0.75); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(4px); }
  .modal { background: white; border-radius: 20px; width: 90%; max-width: 800px; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 70px rgba(0,0,0,0.25); }
  .modal-header { padding: 22px 26px; border-bottom: 1px solid #eef2f5; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: white; z-index: 1; border-radius: 20px 20px 0 0; }
  .modal-title { font-size: 20px; font-weight: 800; color: var(--navy); font-family: 'Montserrat', sans-serif; }
  .modal-close { width: 34px; height: 34px; border-radius: 9px; border: none; background: var(--bg); cursor: pointer; font-size: 15px; display: flex; align-items: center; justify-content: center; color: var(--slate); font-weight: 700; transition: all 0.2s; }
  .modal-close:hover { background: #fee2e2; color: var(--danger); }
  .modal-body { padding: 26px; }

  .chat-layout { display: grid; grid-template-columns: 280px 1fr; border-radius: 16px; overflow: hidden; background: white; box-shadow: var(--card-shadow); }
  .chat-sidebar { border-right: 1px solid #eef2f5; overflow-y: auto; }
  .chat-sidebar-header { padding: 18px; border-bottom: 1px solid #eef2f5; }
  .chat-search { width: 100%; padding: 9px 13px; border: 1.5px solid #dce8eb; border-radius: 9px; font-size: 13px; outline: none; background: var(--bg); transition: border-color 0.2s; font-family: 'Manrope', sans-serif; }
  .chat-search:focus { border-color: var(--primary); }
  .chat-contact { display: flex; gap: 10px; padding: 13px 15px; cursor: pointer; transition: background 0.2s; border-bottom: 1px solid #f8fafc; }
  .chat-contact:hover { background: var(--bg); }
  .chat-contact.active { background: var(--primary-pale); border-left: 3px solid var(--primary); }
  .chat-contact-avatar { width: 40px; height: 40px; border-radius: 11px; font-size: 12px; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; background: var(--primary); color: white; font-family: 'Montserrat', sans-serif; }
  .chat-contact-name { font-size: 13px; font-weight: 700; color: var(--navy); font-family: 'Manrope', sans-serif; }
  .chat-contact-last { font-size: 11px; color: var(--slate); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-family: 'Manrope', sans-serif; }
  .chat-contact-time { font-size: 10px; color: var(--slate-light); font-family: 'Manrope', sans-serif; }
  .chat-unread { background: var(--primary); color: white; border-radius: 20px; padding: 2px 6px; font-size: 10px; font-weight: 700; }
  .chat-main { display: flex; flex-direction: column; }
  .chat-header { padding: 14px 18px; border-bottom: 1px solid #eef2f5; display: flex; align-items: center; gap: 10px; }
  .chat-header-actions { margin-left: auto; display: flex; gap: 6px; }
  .chat-action-btn { padding: 7px 11px; border-radius: 9px; border: none; background: var(--bg); cursor: pointer; font-size: 11px; font-weight: 700; transition: all 0.2s; color: var(--navy); font-family: 'Montserrat', sans-serif; }
  .chat-action-btn:hover { background: var(--primary-pale); color: var(--primary); }
  .chat-messages { flex: 1; overflow-y: auto; padding: 18px; display: flex; flex-direction: column; gap: 10px; background: var(--bg); min-height: 400px; }
  .chat-msg { max-width: 65%; }
  .chat-msg.sent { align-self: flex-end; }
  .chat-msg.received { align-self: flex-start; }
  .chat-bubble { padding: 11px 15px; border-radius: 14px; font-size: 13px; line-height: 1.6; font-family: 'Manrope', sans-serif; }
  .chat-bubble.sent { background: var(--primary); color: white; border-bottom-right-radius: 3px; }
  .chat-bubble.received { background: white; color: var(--navy); border-bottom-left-radius: 3px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
  .chat-time { font-size: 9px; color: var(--slate-light); margin-top: 3px; font-family: 'Manrope', sans-serif; }
  .chat-time.sent { text-align: right; }
  .chat-input-area { padding: 14px 18px; border-top: 1px solid #eef2f5; display: flex; gap: 8px; align-items: center; }
  .chat-input { flex: 1; padding: 11px 15px; border: 1.5px solid #dce8eb; border-radius: 10px; font-size: 13px; outline: none; font-family: 'Manrope', sans-serif; transition: border-color 0.2s; }
  .chat-input:focus { border-color: var(--primary); }
  .chat-attach { padding: 9px 12px; border-radius: 9px; border: 1.5px solid #dce8eb; background: white; cursor: pointer; font-size: 11px; font-weight: 700; color: var(--slate); transition: all 0.2s; font-family: 'Montserrat', sans-serif; }
  .chat-attach:hover { border-color: var(--primary); color: var(--primary); background: var(--primary-pale); }

  .documents-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 14px; }
  .doc-card { background: white; border-radius: 14px; padding: 18px; box-shadow: var(--card-shadow); cursor: pointer; transition: all 0.2s; }
  .doc-card:hover { transform: translateY(-2px); box-shadow: var(--card-shadow-hover); }
  .doc-icon { width: 44px; height: 44px; border-radius: 11px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; margin-bottom: 10px; font-family: 'Montserrat', sans-serif; }
  .doc-name { font-size: 13px; font-weight: 600; color: var(--navy); font-family: 'Manrope', sans-serif; }
  .doc-meta { font-size: 11px; color: var(--slate); margin-top: 3px; font-family: 'Manrope', sans-serif; }
  .doc-tag { display: inline-block; margin-top: 7px; padding: 2px 8px; border-radius: 20px; font-size: 10px; font-weight: 600; font-family: 'Manrope', sans-serif; }
  .doc-tag.lab { background: #eff6ff; color: #3b82f6; }
  .doc-tag.prescription { background: #ecfdf5; color: var(--success); }
  .doc-tag.report { background: #fef3c7; color: var(--warning); }
  .upload-zone { border: 2px dashed #b0cccf; border-radius: 14px; padding: 36px; text-align: center; cursor: pointer; transition: all 0.2s; margin-bottom: 20px; }
  .upload-zone:hover { border-color: var(--primary); background: var(--primary-pale); }

  .badge { display: inline-flex; align-items: center; gap: 4px; padding: 3px 9px; border-radius: 20px; font-size: 11px; font-weight: 600; font-family: 'Manrope', sans-serif; }
  .badge-success { background: #dcfce7; color: #16a34a; }
  .badge-warning { background: #fef9c3; color: #ca8a04; }
  .badge-danger { background: #fee2e2; color: #dc2626; }
  .badge-info { background: #eff6ff; color: #2563eb; }

  .schedule-list { display: flex; flex-direction: column; gap: 10px; }
  .appt-item { background: white; border-radius: 14px; padding: 14px 18px; box-shadow: var(--card-shadow); display: flex; gap: 14px; align-items: center; }
  .appt-time-val { font-size: 16px; font-weight: 800; font-family: 'Montserrat', sans-serif; color: var(--primary); }
  .appt-time-date { font-size: 10px; color: var(--slate); font-family: 'Manrope', sans-serif; }
  .appt-divider { width: 1.5px; height: 36px; background: var(--primary-pale); flex-shrink: 0; }
  .appt-title { font-size: 14px; font-weight: 700; color: var(--navy); font-family: 'Montserrat', sans-serif; }
  .appt-doctor { font-size: 12px; color: var(--slate); margin-top: 1px; font-family: 'Manrope', sans-serif; }

  .claims-table { width: 100%; border-collapse: collapse; }
  .claims-table th { font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--slate-light); font-weight: 700; padding: 11px 14px; text-align: left; border-bottom: 1.5px solid #eef2f5; font-family: 'Montserrat', sans-serif; }
  .claims-table td { padding: 13px 14px; border-bottom: 1px solid #f8fafc; font-size: 13px; color: var(--navy); vertical-align: middle; font-family: 'Manrope', sans-serif; }
  .claims-table tr:hover td { background: var(--bg); }

  .tab-bar { display: flex; border-bottom: 1.5px solid #eef2f5; margin-bottom: 20px; }
  .tab-btn { padding: 11px 18px; font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 13px; background: none; border: none; cursor: pointer; color: var(--slate); border-bottom: 2.5px solid transparent; margin-bottom: -1.5px; transition: all 0.2s; }
  .tab-btn.active { color: var(--primary); border-bottom-color: var(--primary); }

  .time-slots { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-top: 10px; }
  .time-slot { padding: 9px; border: 1.5px solid #dce8eb; border-radius: 9px; text-align: center; cursor: pointer; font-size: 12px; font-weight: 600; color: var(--navy); transition: all 0.2s; background: white; font-family: 'Manrope', sans-serif; }
  .time-slot:hover { border-color: var(--primary); color: var(--primary); }
  .time-slot.selected { background: var(--primary); border-color: var(--primary); color: white; }

  .settings-section { background: white; border-radius: 16px; padding: 22px; box-shadow: var(--card-shadow); margin-bottom: 16px; }
  .settings-section-title { font-size: 14px; font-weight: 700; color: var(--navy); margin-bottom: 16px; font-family: 'Montserrat', sans-serif; display: flex; align-items: center; gap: 10px; }
  .settings-section-icon { width: 32px; height: 32px; border-radius: 8px; background: var(--primary-pale); display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 700; color: var(--primary-dark); font-family: 'Montserrat', sans-serif; }
  .settings-item { display: flex; justify-content: space-between; align-items: center; padding: 14px 0; border-bottom: 1px solid #f4f9fa; }
  .settings-item:last-child { border-bottom: none; padding-bottom: 0; }
  .settings-item-left { flex: 1; }
  .settings-item-label { font-size: 14px; font-weight: 600; color: var(--navy); font-family: 'Manrope', sans-serif; }
  .settings-item-desc { font-size: 11px; color: var(--slate); margin-top: 2px; font-family: 'Manrope', sans-serif; }
  .toggle { width: 42px; height: 23px; background: var(--primary); border-radius: 12px; cursor: pointer; position: relative; flex-shrink: 0; transition: background 0.2s; }
  .toggle.off { background: #dce8eb; }
  .toggle-thumb { position: absolute; right: 2px; top: 2px; width: 19px; height: 19px; background: white; border-radius: 50%; transition: all 0.2s; box-shadow: 0 1px 4px rgba(0,0,0,0.15); }
  .toggle.off .toggle-thumb { right: auto; left: 2px; }
  .settings-action { padding: 7px 14px; border-radius: 8px; border: 1.5px solid #dce8eb; background: white; cursor: pointer; font-size: 12px; font-weight: 600; color: var(--navy); font-family: 'Montserrat', sans-serif; transition: all 0.2s; }
  .settings-action:hover { border-color: var(--primary); color: var(--primary); }
  .settings-action-danger { border-color: #fee2e2; color: var(--danger); }
  .settings-action-danger:hover { background: #fee2e2; }

  @media (max-width: 1100px) {
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .dashboard-grid { grid-template-columns: 1fr; }
  }
`;

function generateSpanID(name) {
  const prefix = "SPN";
  const year = new Date().getFullYear().toString().slice(-2);
  const nameCode = name ? name.slice(0, 2).toUpperCase() : "XX";
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-${year}-${nameCode}-${rand}`;
}

function generateDependentID(relation) {
  const codes = { Spouse: "SP", Son: "SN", Daughter: "DT", Parent: "PR", Sibling: "SB", Other: "OT" };
  const code = codes[relation] || "DP";
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `DEP-${code}-${rand}`;
}

function Barcode() {
  const heights = [14, 10, 16, 8, 14, 12, 16, 10, 14, 8, 12, 16, 10, 14, 8];
  return (
    <div style={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
      {heights.map((h, i) => (
        <div key={i} style={{ width: i % 3 === 0 ? 3 : 1.5, height: h, background: "rgba(255,255,255,0.5)", borderRadius: 1 }} />
      ))}
    </div>
  );
}

const DOCTORS = [
  { id: 1, name: "Dr. Amira Osei", specialty: "General Practitioner", rating: 4.9, status: "online", initials: "AO", tags: ["Family Medicine", "Preventive Care"], experience: "8 yrs", consultations: 1240, price: 5000 },
  { id: 2, name: "Dr. Chukwuemeka Bello", specialty: "Cardiologist", rating: 4.8, status: "online", initials: "CB", tags: ["Heart Health", "Hypertension"], experience: "12 yrs", consultations: 890, price: 8500 },
  { id: 3, name: "Dr. Fatima Al-Hassan", specialty: "Pediatrician", rating: 4.9, status: "busy", initials: "FA", tags: ["Child Health", "Vaccines"], experience: "10 yrs", consultations: 2100, price: 6000 },
  { id: 4, name: "Dr. James Adewale", specialty: "Dermatologist", rating: 4.7, status: "online", initials: "JA", tags: ["Skin Care", "Cosmetic"], experience: "6 yrs", consultations: 654, price: 7000 },
  { id: 5, name: "Dr. Sarah Nwosu", specialty: "Gynecologist", rating: 5.0, status: "offline", initials: "SN", tags: ["Women's Health", "Prenatal"], experience: "15 yrs", consultations: 3200, price: 9000 },
  { id: 6, name: "Dr. Ibrahim Musa", specialty: "Dentist", rating: 4.6, status: "online", initials: "IM", tags: ["Dental Care", "Orthodontics"], experience: "9 yrs", consultations: 780, price: 5500 },
];

const TRANSACTIONS = [
  { id: 1, name: "Wallet Top-up", type: "credit", amount: 50000, date: "Today, 10:32 AM", label: "TOP", bg: "#dcfce7", color: "#166534" },
  { id: 2, name: "Dr. Amira Osei Consult", type: "debit", amount: 5000, date: "Today, 9:15 AM", label: "MED", bg: "#fee2e2", color: "#991b1b" },
  { id: 3, name: "Lab Test - Full Blood Count", type: "debit", amount: 12000, date: "Yesterday, 2:00 PM", label: "LAB", bg: "#eff6ff", color: "#1d4ed8" },
  { id: 4, name: "Pharmacy - Medications", type: "debit", amount: 3200, date: "Feb 18, 2026", label: "PHM", bg: "#f3e8ff", color: "#6b21a8" },
  { id: 5, name: "Wallet Top-up", type: "credit", amount: 100000, date: "Feb 15, 2026", label: "TOP", bg: "#dcfce7", color: "#166534" },
];

const DOCUMENTS = [
  { id: 1, name: "Blood Test Results Feb 2026", type: "lab", label: "LAB", size: "1.2 MB", date: "Feb 20, 2026", bg: "#eff6ff", color: "#1d4ed8" },
  { id: 2, name: "Dr. Bello Prescription", type: "prescription", label: "RX", size: "0.5 MB", date: "Feb 18, 2026", bg: "#ecfdf5", color: "#166534" },
  { id: 3, name: "Annual Physical Report 2025", type: "report", label: "RPT", size: "3.4 MB", date: "Dec 12, 2025", bg: "#fef3c7", color: "#92400e" },
  { id: 4, name: "X-Ray Chest Scan", type: "lab", label: "IMG", size: "8.7 MB", date: "Nov 5, 2025", bg: "#eff6ff", color: "#1d4ed8" },
  { id: 5, name: "Malaria Test Negative", type: "lab", label: "LAB", size: "0.8 MB", date: "Oct 28, 2025", bg: "#eff6ff", color: "#1d4ed8" },
];

const APPOINTMENTS = [
  { id: 1, time: "9:00 AM", date: "Feb 24", title: "General Checkup", doctor: "Dr. Amira Osei", type: "Video" },
  { id: 2, time: "2:30 PM", date: "Feb 26", title: "Cardiology Follow-up", doctor: "Dr. Chukwuemeka Bello", type: "Audio" },
  { id: 3, time: "11:00 AM", date: "Mar 1", title: "Dental Cleaning", doctor: "Dr. Ibrahim Musa", type: "In-Person" },
];

const CLAIMS = [
  { id: "CLM-001", service: "General Consultation", doctor: "Dr. Amira Osei", date: "Feb 20", amount: "N5,000", status: "approved" },
  { id: "CLM-002", service: "Full Blood Count", doctor: "Lab Services", date: "Feb 18", amount: "N12,000", status: "pending" },
  { id: "CLM-003", service: "Medications", doctor: "Pharmacy", date: "Feb 18", amount: "N3,200", status: "approved" },
  { id: "CLM-004", service: "Cardiology Consult", doctor: "Dr. Bello", date: "Jan 30", amount: "N8,500", status: "rejected" },
];

const CHAT_CONTACTS = [
  { id: 1, name: "Dr. Amira Osei", role: "General Practitioner", initials: "AO", lastMsg: "Your results look great!", time: "10:32 AM", unread: 2, online: true },
  { id: 2, name: "Dr. Chukwuemeka Bello", role: "Cardiologist", initials: "CB", lastMsg: "Take your medication as prescribed.", time: "Yesterday", unread: 0, online: false },
  { id: 3, name: "Support Team", role: "Span Healthcare", initials: "SH", lastMsg: "How can we help you today?", time: "Feb 20", unread: 1, online: true },
];

const CHAT_MESSAGES = [
  { id: 1, text: "Hello Dr. Amira! I have been feeling some chest tightness lately.", sent: true, time: "10:20 AM" },
  { id: 2, text: "Hi! I understand your concern. How long have you been experiencing this? Any other symptoms?", sent: false, time: "10:22 AM" },
  { id: 3, text: "About 3 days now. Sometimes I feel short of breath especially when climbing stairs.", sent: true, time: "10:24 AM" },
  { id: 4, text: "I see. Can you upload your latest blood pressure readings? I would also recommend a quick video call.", sent: false, time: "10:26 AM" },
  { id: 5, text: "Sure, let me get that. Should I be worried?", sent: true, time: "10:28 AM" },
  { id: 6, text: "Do not worry, we will get to the bottom of this. Your results from last week look great.", sent: false, time: "10:32 AM" },
];

function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [step, setStep] = useState(1);
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", phone: "", name: "", password: "", confirmPassword: "", dob: "", sex: "Male" });

  const next = async () => {
    setError("");
    if (mode === "register" && step === 1) { setStep(2); return; }

    if (mode === "register" && step === 2) {
      if (form.password !== form.confirmPassword) { setError("Passwords do not match"); return; }
      if (!consent) { setError("Please accept the terms to continue"); return; }
      setLoading(true);
      const result = await registerUser({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        dob: form.dob,
        sex: form.sex,
      });
      setLoading(false);
      if (!result.success) { setError(result.error); return; }
      setStep(3);
      return;
    }

    if (mode === "login") {
      setLoading(true);
      const result = await loginUser({ email: form.email, password: form.password });
      setLoading(false);
      if (!result.success) { setError(result.error); return; }
      onLogin(result.user);
      return;
    }

    onLogin();
  };

  return (
    <div className="auth-screen">
      <div className="auth-left">
        <div className="auth-logo">
          <img
            src="/assets/logo.png"
            alt="Span Healthcare"
            className="auth-logo-img"
            onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
          />
          <div className="auth-logo-icon" style={{ display: "none" }}>SPAN</div>
        </div>
        <div className="auth-headline">Your Health,<br /><span>Your Savings,</span><br />One Platform.</div>
        <div className="auth-sub">A complete health finance ecosystem. Save for healthcare, consult doctors instantly, and manage your family health records seamlessly.</div>
        <div className="auth-features">
          {[
            "Health Savings Wallet — save anytime",
            "Telemedicine via video, audio and chat",
            "Family profile and dependent management",
            "Wellness tracking and health scoring",
            "Secure medical document vault",
          ].map(f => (
            <div key={f} className="auth-feature"><div className="auth-feature-dot" />{f}</div>
          ))}
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-container">
          {step === 3 ? (
            <div className="verify-screen">
              <div style={{ width: 72, height: 72, borderRadius: 18, background: "var(--primary-pale)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px", fontWeight: 800, fontSize: 15, color: "var(--primary)", fontFamily: "'Montserrat',sans-serif" }}>OTP</div>
              <div className="verify-title">Verify your account</div>
              <div className="verify-sub">We sent a 6-digit code to<br /><strong>{form.email || form.phone}</strong></div>
              <div className="otp-inputs">{[0,1,2,3,4,5].map(i => <input key={i} className="otp-input" maxLength={1} type="text" />)}</div>
              <button className="btn btn-primary" onClick={onLogin}>Verify and Continue</button>
              <p style={{ marginTop: 14, fontSize: 12, color: "var(--slate)", textAlign: "center", fontFamily: "'Manrope',sans-serif" }}>Did not get it? <span style={{ color: "var(--primary)", fontWeight: 700, cursor: "pointer" }}>Resend code</span></p>
            </div>
          ) : (
            <>
              <div className="auth-form-title">{mode === "login" ? "Welcome back" : "Create account"}</div>
              <div className="auth-form-sub">{mode === "login" ? "Log in to your Span Healthcare dashboard" : step === 1 ? "Step 1 of 2 - Personal details" : "Step 2 of 2 - Set your password"}</div>
              <div className="auth-tabs">
                <button className={"auth-tab" + (mode === "login" ? " active" : "")} onClick={() => { setMode("login"); setStep(1); }}>Log In</button>
                <button className={"auth-tab" + (mode === "register" ? " active" : "")} onClick={() => { setMode("register"); setStep(1); }}>Register</button>
              </div>

              {mode === "register" && step === 1 && <>
                <div className="form-group"><label className="form-label">Full Name</label><input className="form-input" placeholder="e.g. Emeka Okafor" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Email Address</label><input className="form-input" type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Phone Number</label><input className="form-input" type="tel" placeholder="+234 8XX XXX XXXX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Date of Birth</label><input className="form-input" type="date" /></div>
                <div className="form-group"><label className="form-label">Sex</label><select className="form-select"><option>Male</option><option>Female</option><option>Prefer not to say</option></select></div>
              </>}

              {mode === "register" && step === 2 && <>
  <div className="form-group">
    <label className="form-label">Password</label>
    <input className="form-input" type="password" placeholder="Create a strong password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
  </div>
  <div className="form-group">
    <label className="form-label">Confirm Password</label>
    <input className="form-input" type="password" placeholder="Repeat password" value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })} />
  </div>
                <div className="consent-box">
                  <div className="consent-title">Data Protection and Consent</div>
                  <div className="consent-text">Span Healthcare collects and processes your personal and health data in accordance with the Nigeria Data Protection Regulation (NDPR). Your data is encrypted, securely stored, and will never be shared with third parties without your explicit consent except as required by law.</div>
                  <label className="consent-check">
                    <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} />
                    <span className="consent-check-label">I agree to the <span>Terms of Service</span>, <span>Privacy Policy</span>, and <span>Data Protection Policy</span>. I consent to processing of my health data by Span Healthcare.</span>
                  </label>
                </div>
              </>}

              {mode === "login" && <>
                <div className="form-group"><label className="form-label">Email or Phone</label><input className="form-input" placeholder="you@email.com or +234..." /></div>
                <div className="form-group"><label className="form-label">Password</label><input className="form-input" type="password" placeholder="Enter password" /></div>
                <p style={{ textAlign: "right", marginBottom: 18, fontSize: 12, fontFamily: "'Manrope',sans-serif" }}><span style={{ color: "var(--primary)", fontWeight: 700, cursor: "pointer" }}>Forgot password?</span></p>
              </>}

              {error && <div style={{ background: "#fee2e2", color: "#dc2626", padding: "10px 14px", borderRadius: 9, fontSize: 13, marginBottom: 16, fontFamily: "'Manrope',sans-serif" }}>{error}</div>}
              <button className="btn btn-primary" onClick={next} disabled={mode === "register" && step === 2 && !consent}>
                {mode === "login" ? "Log In" : step === 1 ? "Continue" : "Create Account"}
              </button>

              {mode === "login" && <>
                <div className="divider"><div className="divider-line" /><span className="divider-text">or continue with</span><div className="divider-line" /></div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button className="btn btn-outline" style={{ flex: 1, justifyContent: "center" }}>Google</button>
                  <button className="btn btn-outline" style={{ flex: 1, justifyContent: "center" }}>Facebook</button>
                </div>
              </>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Sidebar({ active, onNav, userPhoto, userName, onLogout }) {
  const sections = [
    { label: "", items: [{ id: "dashboard", label: "Dashboard", short: "DB" }, { id: "wallet", label: "Wallet", short: "WL" }, { id: "transactions", label: "Transactions", short: "TX" }] },
    { label: "Health", items: [{ id: "telemedicine", label: "Telemedicine", short: "TM", badge: "3" }, { id: "appointments", label: "Appointments", short: "AP" }, { id: "chat", label: "Messages", short: "MSG", badge: "3" }, { id: "documents", label: "Documents", short: "DOC" }, { id: "wellness", label: "Wellness", short: "WN" }] },
    { label: "Account", items: [{ id: "profile", label: "My Profile", short: "PR" }, { id: "dependents", label: "Dependents", short: "DP" }, { id: "claims", label: "Claims", short: "CL" }, { id: "settings", label: "Settings", short: "ST" }] },
  ];
  const initials = userName ? userName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "EO";
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <img
          src="/assets/logo.png"
          alt="Span Healthcare"
          className="sidebar-logo-img"
          onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
        />
        <div className="sidebar-logo-icon" style={{ display: "none" }}>SPAN</div>
        <div><div className="sidebar-logo-name">Span Healthcare</div><div className="sidebar-logo-tag">Health Savings</div></div>
      </div>
      <div className="sidebar-nav">
        {sections.map(sec => (
          <div key={sec.label}>
            {sec.label && <div className="sidebar-section-label">{sec.label}</div>}
            {sec.items.map(item => (
              <div key={item.id} className={"nav-item" + (active === item.id ? " active" : "")} onClick={() => onNav(item.id)}>
                <div className="nav-icon">{item.short}</div>
                {item.label}
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">{userPhoto ? <img src={userPhoto} alt="profile" /> : initials}</div>
          <div><div className="sidebar-user-name">{userName || "Emeka Okafor"}</div><div className="sidebar-user-role">Principal Member</div></div>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          <div style={{ width: 24, height: 24, borderRadius: 6, background: "rgba(224,82,82,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: "#e05252", fontFamily: "'Montserrat',sans-serif" }}>OUT</div>
          Log Out
        </button>
      </div>
    </div>
  );
}

function Dashboard({ onNav }) {
  return (
    <div>
      <div className="topbar">
        <div><div className="page-title">Good morning, Emeka</div><div className="page-sub">Tuesday, February 24, 2026</div></div>
        <button className="btn btn-primary btn-sm" onClick={() => onNav("telemedicine")}>+ Book Appointment</button>
      </div>
      <div className="stats-grid">
        {[
          { label: "Wallet Balance", value: "N237,500", change: "Up N50k this month", up: true, tag: "WALLET", tagBg: "#e8f6f9", tagColor: "#2d8a9e" },
          { label: "Total Spent on Health", value: "N28,700", change: "Down N3k vs last month", up: false, tag: "SPENT", tagBg: "#fee2e2", tagColor: "#991b1b" },
          { label: "Dependents Covered", value: "5", change: "All active", up: true, tag: "FAMILY", tagBg: "#eff6ff", tagColor: "#1d4ed8" },
          { label: "Upcoming Appointments", value: "2", change: "Next: Feb 24", up: true, tag: "APPT", tagBg: "#fef9c3", tagColor: "#854d0e" },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <span className="stat-tag" style={{ background: s.tagBg, color: s.tagColor }}>{s.tag}</span>
            <div className="stat-value" style={{ marginTop: 6 }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className={"stat-change " + (s.up ? "up" : "down")}>{s.change}</div>
          </div>
        ))}
      </div>
      <div className="dashboard-grid">
        <div>
          <div className="wallet-card" style={{ marginBottom: 20 }}>
            <div className="wallet-label">Health Savings Wallet</div>
            <div className="wallet-amount">N237,500.00</div>
            <div className="wallet-id">SPN-26-EO-48291</div>
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <div style={{ padding: "5px 12px", background: "rgba(255,255,255,0.1)", borderRadius: 20, fontSize: 11, color: "rgba(255,255,255,0.75)", fontFamily: "'Manrope',sans-serif" }}>5 Dependents</div>
              <div style={{ padding: "5px 12px", background: "rgba(255,255,255,0.1)", borderRadius: 20, fontSize: 11, color: "rgba(255,255,255,0.75)", fontFamily: "'Manrope',sans-serif" }}>Active Member</div>
            </div>
            <div className="wallet-actions">
              <button className="wallet-btn wallet-btn-primary">Fund Wallet</button>
              <button className="wallet-btn wallet-btn-outline">Transfer</button>
              <button className="wallet-btn wallet-btn-outline">Statement</button>
            </div>
          </div>
          <div className="card" style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div className="card-title">Recent Transactions</div>
              <button className="btn btn-ghost btn-sm" onClick={() => onNav("transactions")}>View all</button>
            </div>
            <div className="txn-list">
              {TRANSACTIONS.slice(0, 4).map(t => (
                <div key={t.id} className="txn-item">
                  <div className="txn-icon" style={{ background: t.bg, color: t.color }}>{t.label}</div>
                  <div className="txn-info"><div className="txn-name">{t.name}</div><div className="txn-date">{t.date}</div></div>
                  <div className={"txn-amount " + t.type}>{t.type === "credit" ? "+" : "-"}N{t.amount.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="health-score-card" style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div><div className="card-title">Health Score</div><div className="card-sub">Based on activity and records</div></div>
              <div className="health-score-value">82</div>
            </div>
            <div className="health-score-bar"><div className="health-score-fill" style={{ width: "82%" }} /></div>
            <div style={{ marginTop: 10, fontSize: 12, color: "var(--primary)", fontWeight: 600, fontFamily: "'Manrope',sans-serif" }}>Good health habits detected</div>
          </div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-title" style={{ marginBottom: 14 }}>Quick Actions</div>
            <div className="quick-actions">
              {[{ label: "See a Doctor", short: "DOC", page: "telemedicine" }, { label: "Fund Wallet", short: "PAY", page: "wallet" }, { label: "Dependents", short: "FAM", page: "dependents" }, { label: "Documents", short: "FIL", page: "documents" }].map(a => (
                <div key={a.label} className="quick-action" onClick={() => onNav(a.page)}>
                  <div className="quick-action-icon">{a.short}</div>
                  <div className="quick-action-label">{a.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="card-title" style={{ marginBottom: 14 }}>Upcoming Appointments</div>
            <div className="schedule-list">
              {APPOINTMENTS.slice(0, 2).map(a => (
                <div key={a.id} className="appt-item" style={{ padding: "10px 12px" }}>
                  <div style={{ minWidth: 56, textAlign: "center" }}>
                    <div className="appt-time-val" style={{ fontSize: 13 }}>{a.time}</div>
                    <div className="appt-time-date">{a.date}</div>
                  </div>
                  <div className="appt-divider" />
                  <div style={{ flex: 1 }}><div className="appt-title" style={{ fontSize: 12 }}>{a.title}</div><div className="appt-doctor">{a.doctor}</div></div>
                  <span className="badge badge-info">{a.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WalletPage() {
  const [showFund, setShowFund] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [showStatement, setShowStatement] = useState(false);
  return (
    <div>
      <div className="topbar">
        <div><div className="page-title">Wallet</div><div className="page-sub">Your health savings account</div></div>
        <button className="btn btn-primary btn-sm" onClick={() => setShowFund(true)}>+ Fund Wallet</button>
      </div>
      <div className="wallet-card" style={{ marginBottom: 24 }}>
        <div className="wallet-label">Available Balance</div>
        <div className="wallet-amount">N237,500.00</div>
        <div className="wallet-id">SPN-26-EO-48291</div>
        <div className="wallet-actions">
          <button className="wallet-btn wallet-btn-primary" onClick={() => setShowFund(true)}>Fund Wallet</button>
          <button className="wallet-btn wallet-btn-outline" onClick={() => setShowTransfer(true)}>Transfer</button>
          <button className="wallet-btn wallet-btn-outline" onClick={() => setShowStatement(true)}>Statement</button>
        </div>
      </div>
      <div className="card">
        <div className="card-title" style={{ marginBottom: 18 }}>All Transactions</div>
        <div className="txn-list">
          {TRANSACTIONS.map(t => (
            <div key={t.id} className="txn-item">
              <div className="txn-icon" style={{ background: t.bg, color: t.color }}>{t.label}</div>
              <div className="txn-info"><div className="txn-name">{t.name}</div><div className="txn-date">{t.date}</div></div>
              <div className={"txn-amount " + t.type}>{t.type === "credit" ? "+" : "-"}N{t.amount.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
      {showFund && (
        <div className="modal-overlay" onClick={() => setShowFund(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><div className="modal-title">Fund Wallet</div><button className="modal-close" onClick={() => setShowFund(false)}>X</button></div>
            <div className="modal-body">
              <div className="form-group"><label className="form-label">Amount (N)</label><input className="form-input" placeholder="Enter amount" type="number" /></div>
              <div className="form-group"><label className="form-label">Payment Method</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 8 }}>
                  {["Card", "Bank Transfer", "USSD"].map(m => <div key={m} style={{ border: "1.5px solid #dce8eb", borderRadius: 10, padding: 14, textAlign: "center", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "var(--navy)", fontFamily: "'Manrope',sans-serif" }}>{m}</div>)}
                </div>
              </div>
              <button className="btn btn-primary" style={{ marginTop: 8 }}>Proceed to Pay</button>
            </div>
          </div>
        </div>
      )}
      {showTransfer && (
        <div className="modal-overlay" onClick={() => setShowTransfer(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><div className="modal-title">Transfer Funds</div><button className="modal-close" onClick={() => setShowTransfer(false)}>X</button></div>
            <div className="modal-body">
              <div className="form-group"><label className="form-label">Recipient Account Number</label><input className="form-input" placeholder="Enter account number" /></div>
              <div className="form-group"><label className="form-label">Bank</label><select className="form-select"><option>Select Bank</option><option>Access Bank</option><option>GTBank</option><option>Zenith Bank</option><option>First Bank</option><option>UBA</option></select></div>
              <div className="form-group"><label className="form-label">Amount (N)</label><input className="form-input" placeholder="Enter amount" type="number" /></div>
              <div className="form-group"><label className="form-label">Narration</label><input className="form-input" placeholder="Optional note" /></div>
              <button className="btn btn-primary">Confirm Transfer</button>
            </div>
          </div>
        </div>
      )}
      {showStatement && (
        <div className="modal-overlay" onClick={() => setShowStatement(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><div className="modal-title">Account Statement</div><button className="modal-close" onClick={() => setShowStatement(false)}>X</button></div>
            <div className="modal-body">
              <div className="form-group"><label className="form-label">From Date</label><input className="form-input" type="date" /></div>
              <div className="form-group"><label className="form-label">To Date</label><input className="form-input" type="date" /></div>
              <div className="form-group"><label className="form-label">Format</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {["PDF", "Excel"].map(f => <div key={f} style={{ border: "1.5px solid #dce8eb", borderRadius: 10, padding: 14, textAlign: "center", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "var(--navy)", fontFamily: "'Manrope',sans-serif" }}>{f}</div>)}
                </div>
              </div>
              <button className="btn btn-primary">Download Statement</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [showID, setShowID] = useState(false);
  const fileRef = useRef();
  const spanID = generateSpanID("Emeka Okafor");

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPhoto(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="topbar">
        <div><div className="page-title">My Profile</div><div className="page-sub">Manage your health identity</div></div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-outline btn-sm" onClick={() => setShowID(true)}>View ID Card</button>
          <button className="btn btn-primary btn-sm" onClick={() => setEditing(!editing)}>{editing ? "Save Changes" : "Edit Profile"}</button>
        </div>
      </div>
      <div style={{ display: "flex", gap: 20, marginBottom: 24 }}>
        <div>
          <div className="profile-photo-upload" onClick={() => editing && fileRef.current.click()}>
            <div className="profile-photo">{photo ? <img src={photo} alt="profile" /> : "EO"}</div>
            {editing && <div className="profile-photo-overlay">Change</div>}
          </div>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhoto} />
          {editing && <div style={{ fontSize: 11, color: "var(--slate)", textAlign: "center", marginTop: 6, fontFamily: "'Manrope',sans-serif" }}>Click to upload</div>}
        </div>
        <div className="profile-id-card" style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div className="profile-name">Emeka Okafor</div>
              <div className="profile-id">{spanID}</div>
              <div className="profile-tags">
                <span className="profile-tag">Principal Member</span>
                <span className="profile-tag" style={{ background: "#dcfce7", color: "var(--success)" }}>Active</span>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: "var(--slate)", fontFamily: "'Manrope',sans-serif" }}>Health Score</div>
              <div style={{ fontSize: 26, fontWeight: 800, fontFamily: "'Montserrat',sans-serif", color: "var(--primary)" }}>82</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <div className="card">
          <div className="card-title" style={{ marginBottom: 18 }}>Personal Information</div>
          <div className="form-grid-2">
            {[{ label: "First Name", value: "Emeka" }, { label: "Last Name", value: "Okafor" }, { label: "Phone Number", value: "+234 803 456 7890" }, { label: "Email", value: "emeka.okafor@email.com" }].map(f => (
              <div key={f.label} className="form-group"><label className="form-label">{f.label}</label><input className="form-input" defaultValue={f.value} disabled={!editing} /></div>
            ))}
            <div className="form-group"><label className="form-label">Date of Birth</label><input className="form-input" type="date" defaultValue="1989-05-14" disabled={!editing} /></div>
            <div className="form-group"><label className="form-label">Sex</label><select className="form-select" disabled={!editing}><option>Male</option><option>Female</option></select></div>
          </div>
        </div>
        <div className="card">
          <div className="card-title" style={{ marginBottom: 18 }}>Medical Information</div>
          <div className="form-grid-2">
            <div className="form-group"><label className="form-label">Blood Group</label><select className="form-select" disabled={!editing}>{["A+","A-","B+","B-","O+","O-","AB+","AB-"].map(b => <option key={b}>{b}</option>)}</select></div>
            <div className="form-group"><label className="form-label">Genotype</label><select className="form-select" disabled={!editing}>{["AA","AS","SS","AC","SC"].map(g => <option key={g}>{g}</option>)}</select></div>
            <div className="form-group"><label className="form-label">Height</label><input className="form-input" defaultValue="175cm" disabled={!editing} /></div>
            <div className="form-group"><label className="form-label">Weight</label><input className="form-input" defaultValue="78kg" disabled={!editing} /></div>
            <div className="form-group" style={{ gridColumn: "1/-1" }}><label className="form-label">Known Allergies</label><input className="form-input" defaultValue="None known" disabled={!editing} /></div>
            <div className="form-group" style={{ gridColumn: "1/-1" }}><label className="form-label">Chronic Conditions</label><input className="form-input" defaultValue="None" disabled={!editing} /></div>
            <div className="form-group" style={{ gridColumn: "1/-1" }}><label className="form-label">Current Medications</label><input className="form-input" defaultValue="None" disabled={!editing} /></div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-title" style={{ marginBottom: 18 }}>Emergency Contact</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {[{ label: "Full Name", value: "Mrs. Grace Okafor" }, { label: "Relationship", value: "Spouse" }, { label: "Phone Number", value: "+234 805 123 4567" }].map(f => (
            <div key={f.label} className="form-group"><label className="form-label">{f.label}</label><input className="form-input" defaultValue={f.value} disabled={!editing} /></div>
          ))}
        </div>
      </div>
      {showID && (
        <div className="modal-overlay" onClick={() => setShowID(false)}>
          <div className="modal" style={{ maxWidth: 440 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header"><div className="modal-title">Virtual ID Card</div><button className="modal-close" onClick={() => setShowID(false)}>X</button></div>
            <div className="modal-body" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
              <div className="id-card" style={{ width: "100%" }}>
                <div className="id-card-header">
                  <div><div className="id-card-logo">Span Healthcare</div><div className="id-card-logo-sub">Health Savings Platform</div></div>
                  <div className="id-card-type">Member Card</div>
                </div>
                <div className="id-card-body">
                  <div className="id-card-photo">{photo ? <img src={photo} alt="profile" /> : "EO"}</div>
                  <div>
                    <div className="id-card-name">Emeka Okafor</div>
                    <div className="id-card-id">{spanID}</div>
                    <div className="id-card-details">
                      <div><div className="id-card-detail-label">Blood Group</div><div className="id-card-detail-value">O+</div></div>
                      <div><div className="id-card-detail-label">Genotype</div><div className="id-card-detail-value">AA</div></div>
                      <div><div className="id-card-detail-label">Member Since</div><div className="id-card-detail-value">Jan 2025</div></div>
                      <div><div className="id-card-detail-label">Status</div><div className="id-card-detail-value">Active</div></div>
                    </div>
                  </div>
                </div>
                <div className="id-card-footer">
                  <Barcode />
                  <div className="id-card-valid"><div>Valid Through</div><div style={{ fontWeight: 700, fontSize: 11 }}>Dec 2026</div></div>
                </div>
              </div>
              <button className="btn btn-primary" style={{ width: "100%" }}>Download ID Card</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DependentsPage() {
  const [dependents, setDependents] = useState([
    { id: generateDependentID("Spouse"), name: "Chidinma Okafor", relation: "Spouse", sex: "Female", age: 32, bloodGroup: "O+", genotype: "AA", allergies: "Penicillin", weight: "62kg", height: "165cm", initials: "CO" },
    { id: generateDependentID("Son"), name: "Emeka Okafor Jr.", relation: "Son", sex: "Male", age: 8, bloodGroup: "O+", genotype: "AS", allergies: "None", weight: "28kg", height: "125cm", initials: "EO" },
    { id: generateDependentID("Daughter"), name: "Ada Okafor", relation: "Daughter", sex: "Female", age: 5, bloodGroup: "A+", genotype: "AA", allergies: "Peanuts", weight: "18kg", height: "105cm", initials: "AO" },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newDep, setNewDep] = useState({ firstName: "", lastName: "", relation: "Spouse", sex: "Male", dob: "", bloodGroup: "O+", genotype: "AA", weight: "", height: "", allergies: "" });

  const addDependent = () => {
    if (!newDep.firstName) return;
    const dep = {
      id: generateDependentID(newDep.relation),
      name: `${newDep.firstName} ${newDep.lastName}`,
      relation: newDep.relation, sex: newDep.sex,
      age: newDep.dob ? new Date().getFullYear() - new Date(newDep.dob).getFullYear() : 0,
      bloodGroup: newDep.bloodGroup, genotype: newDep.genotype,
      allergies: newDep.allergies || "None",
      weight: newDep.weight ? newDep.weight + "kg" : "N/A",
      height: newDep.height ? newDep.height + "cm" : "N/A",
      initials: `${newDep.firstName[0] || ""}${newDep.lastName[0] || ""}`.toUpperCase(),
    };
    setDependents([...dependents, dep]);
    setShowAdd(false);
    setNewDep({ firstName: "", lastName: "", relation: "Spouse", sex: "Male", dob: "", bloodGroup: "O+", genotype: "AA", weight: "", height: "", allergies: "" });
  };

  return (
    <div>
      <div className="topbar">
        <div><div className="page-title">Dependents</div><div className="page-sub">{dependents.length} family member{dependents.length !== 1 ? "s" : ""} on your plan</div></div>
        <button className="btn btn-primary btn-sm" onClick={() => setShowAdd(true)}>+ Add Dependent</button>
      </div>
      <div className="dependents-grid">
        {dependents.map(dep => (
          <div key={dep.id} className="dependent-card">
            <div className="dependent-avatar">{dep.initials}</div>
            <div className="dependent-name">{dep.name}</div>
            <div className="dependent-id">{dep.id}</div>
            <span className="badge badge-info" style={{ marginTop: 5 }}>{dep.relation}</span>
            <div className="dependent-meta">
              {[{ label: "Age", value: dep.age + " yrs" }, { label: "Sex", value: dep.sex }, { label: "Blood Group", value: dep.bloodGroup }, { label: "Genotype", value: dep.genotype }, { label: "Weight", value: dep.weight }, { label: "Height", value: dep.height }].map(m => (
                <div key={m.label}><div className="dependent-meta-label">{m.label}</div><div className="dependent-meta-value">{m.value}</div></div>
              ))}
            </div>
            {dep.allergies !== "None" && <div style={{ marginTop: 8, padding: "5px 9px", background: "#fee2e2", borderRadius: 7, fontSize: 11, color: "var(--danger)", fontWeight: 600, fontFamily: "'Manrope',sans-serif" }}>Allergy: {dep.allergies}</div>}
            <div style={{ display: "flex", gap: 7, marginTop: 14 }}>
              <button className="btn btn-outline btn-sm" style={{ flex: 1 }}>Edit</button>
              <button className="btn btn-sm" style={{ background: "var(--primary-pale)", color: "var(--primary)", flex: 1, border: "none" }}>Book</button>
            </div>
          </div>
        ))}
        <div style={{ border: "2px dashed #b0cccf", borderRadius: 16, padding: 28, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", minHeight: 180 }} onClick={() => setShowAdd(true)}>
          <div style={{ width: 44, height: 44, borderRadius: 11, background: "var(--primary-pale)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 22, color: "var(--primary)", marginBottom: 10 }}>+</div>
          <div style={{ fontWeight: 700, color: "var(--navy)", fontFamily: "'Montserrat',sans-serif", fontSize: 14 }}>Add Dependent</div>
          <div style={{ fontSize: 12, color: "var(--slate)", marginTop: 3, fontFamily: "'Manrope',sans-serif" }}>No limit on dependents</div>
        </div>
      </div>
      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><div className="modal-title">Add New Dependent</div><button className="modal-close" onClick={() => setShowAdd(false)}>X</button></div>
            <div className="modal-body">
              <div className="form-grid-2">
                <div className="form-group"><label className="form-label">First Name</label><input className="form-input" placeholder="First name" value={newDep.firstName} onChange={e => setNewDep({ ...newDep, firstName: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Last Name</label><input className="form-input" placeholder="Last name" value={newDep.lastName} onChange={e => setNewDep({ ...newDep, lastName: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Relationship</label><select className="form-select" value={newDep.relation} onChange={e => setNewDep({ ...newDep, relation: e.target.value })}><option>Spouse</option><option>Son</option><option>Daughter</option><option>Parent</option><option>Sibling</option><option>Other</option></select></div>
                <div className="form-group"><label className="form-label">Sex</label><select className="form-select" value={newDep.sex} onChange={e => setNewDep({ ...newDep, sex: e.target.value })}><option>Male</option><option>Female</option></select></div>
                <div className="form-group"><label className="form-label">Date of Birth</label><input className="form-input" type="date" value={newDep.dob} onChange={e => setNewDep({ ...newDep, dob: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Blood Group</label><select className="form-select" value={newDep.bloodGroup} onChange={e => setNewDep({ ...newDep, bloodGroup: e.target.value })}>{["A+","A-","B+","B-","O+","O-","AB+","AB-"].map(b => <option key={b}>{b}</option>)}</select></div>
                <div className="form-group"><label className="form-label">Genotype</label><select className="form-select" value={newDep.genotype} onChange={e => setNewDep({ ...newDep, genotype: e.target.value })}>{["AA","AS","SS","AC","SC"].map(g => <option key={g}>{g}</option>)}</select></div>
                <div className="form-group"><label className="form-label">Height (cm)</label><input className="form-input" placeholder="e.g. 170" value={newDep.height} onChange={e => setNewDep({ ...newDep, height: e.target.value })} /></div>
                <div className="form-group"><label className="form-label">Weight (kg)</label><input className="form-input" placeholder="e.g. 65" value={newDep.weight} onChange={e => setNewDep({ ...newDep, weight: e.target.value })} /></div>
                <div className="form-group" style={{ gridColumn: "1/-1" }}><label className="form-label">Known Allergies</label><input className="form-input" placeholder="e.g. Penicillin or None" value={newDep.allergies} onChange={e => setNewDep({ ...newDep, allergies: e.target.value })} /></div>
              </div>
              <div style={{ background: "var(--primary-pale)", borderRadius: 10, padding: 12, marginBottom: 18, fontSize: 12, color: "var(--primary-dark)", fontFamily: "'Manrope',sans-serif" }}>A unique Dependent ID will be auto-generated and linked to your account.</div>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowAdd(false)}>Cancel</button>
                <button className="btn btn-primary" style={{ flex: 2 }} onClick={addDependent}>Add Dependent</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TelemedicinePage() {
  const [filter, setFilter] = useState("all");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [scheduleStep, setScheduleStep] = useState(1);
  const filtered = filter === "all" ? DOCTORS : DOCTORS.filter(d => d.status === filter);
  const timeSlots = ["8:00 AM","8:30 AM","9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","2:00 PM","2:30 PM","3:00 PM","3:30 PM"];
  return (
    <div>
      <div className="topbar">
        <div><div className="page-title">Telemedicine</div><div className="page-sub">Consult with qualified doctors from anywhere</div></div>
        <div style={{ display: "flex", gap: 7 }}>
          {["all","online","busy"].map(f => <button key={f} className={"btn btn-sm " + (filter === f ? "btn-primary" : "btn-outline")} onClick={() => setFilter(f)}>{f === "all" ? "All Doctors" : f === "online" ? "Online Now" : "Busy"}</button>)}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 20 }}>
        {[{ label: "Online Now", value: DOCTORS.filter(d => d.status === "online").length, color: "var(--success)" }, { label: "Avg. Wait Time", value: "Under 5 min", color: "var(--primary)" }, { label: "Specialties", value: "12+", color: "var(--warning)" }].map(s => (
          <div key={s.label} className="card" style={{ display: "flex", alignItems: "center", gap: 14, padding: 18 }}>
            <div style={{ fontSize: 24, fontWeight: 800, fontFamily: "'Montserrat',sans-serif", color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "var(--slate)", fontFamily: "'Manrope',sans-serif" }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div className="doctors-grid">
        {filtered.map(doc => (
          <div key={doc.id} className="doctor-card">
            <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              <div className="doctor-avatar">{doc.initials}</div>
              <div>
                <div className="doctor-name">{doc.name}</div>
                <div className="doctor-specialty">{doc.specialty}</div>
                <div className="doctor-rating">Rating: {doc.rating} ({doc.consultations} consults)</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 8, fontSize: 12, fontWeight: 600, fontFamily: "'Manrope',sans-serif" }}>
              <span className={"status-dot " + doc.status} />
              <span style={{ color: doc.status === "online" ? "var(--success)" : doc.status === "busy" ? "var(--warning)" : "var(--slate-light)", textTransform: "capitalize" }}>{doc.status}</span>
              <span style={{ marginLeft: "auto", color: "var(--slate)", fontSize: 11 }}>Exp: {doc.experience}</span>
            </div>
            <div className="doctor-tags">{doc.tags.map(t => <span key={t} className="doctor-tag">{t}</span>)}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 15, fontWeight: 800, fontFamily: "'Montserrat',sans-serif", color: "var(--navy)" }}>N{doc.price.toLocaleString()}</span>
              <span style={{ fontSize: 11, color: "var(--slate)", fontFamily: "'Manrope',sans-serif" }}>per session</span>
            </div>
            <div className="doctor-call-actions">
              <button className="call-btn call-btn-video" onClick={() => setSelectedDoctor({ ...doc, mode: "video" })}>Video</button>
              <button className="call-btn call-btn-audio" onClick={() => setSelectedDoctor({ ...doc, mode: "audio" })}>Audio</button>
              <button className="call-btn call-btn-chat" onClick={() => setSelectedDoctor({ ...doc, mode: "schedule" })}>Chat</button>
            </div>
            <button className="btn btn-outline btn-sm" style={{ width: "100%", marginTop: 7 }} onClick={() => { setSelectedDoctor({ ...doc, mode: "schedule" }); setScheduleStep(1); }}>Schedule Appointment</button>
          </div>
        ))}
      </div>
      {selectedDoctor && (
        <div className="modal-overlay" onClick={() => setSelectedDoctor(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">{selectedDoctor.mode === "video" ? "Video Call" : selectedDoctor.mode === "audio" ? "Audio Call" : "Schedule Appointment"}</div>
              <button className="modal-close" onClick={() => setSelectedDoctor(null)}>X</button>
            </div>
            <div className="modal-body">
              <div style={{ display: "flex", gap: 14, alignItems: "center", padding: 14, background: "var(--bg)", borderRadius: 12, marginBottom: 20 }}>
                <div style={{ width: 50, height: 50, borderRadius: 12, background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: "white", fontFamily: "'Montserrat',sans-serif" }}>{selectedDoctor.initials}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: "var(--navy)", fontFamily: "'Montserrat',sans-serif" }}>{selectedDoctor.name}</div>
                  <div style={{ color: "var(--primary)", fontSize: 13, fontWeight: 600, fontFamily: "'Manrope',sans-serif" }}>{selectedDoctor.specialty}</div>
                  <div style={{ color: "var(--slate)", fontSize: 12, marginTop: 2, fontFamily: "'Manrope',sans-serif" }}>Fee: N{selectedDoctor.price.toLocaleString()}</div>
                </div>
              </div>
              {(selectedDoctor.mode === "video" || selectedDoctor.mode === "audio") ? (
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: 72, height: 72, borderRadius: 18, background: "var(--primary-pale)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontWeight: 800, fontSize: 13, color: "var(--primary)", fontFamily: "'Montserrat',sans-serif" }}>{selectedDoctor.mode === "video" ? "VIDEO" : "AUDIO"}</div>
                  <div style={{ fontSize: 17, fontWeight: 800, color: "var(--navy)", marginBottom: 6, fontFamily: "'Montserrat',sans-serif" }}>Start {selectedDoctor.mode === "video" ? "Video" : "Audio"} Consultation</div>
                  <div style={{ color: "var(--slate)", fontSize: 13, marginBottom: 20, lineHeight: 1.7, fontFamily: "'Manrope',sans-serif" }}>Your wallet will be charged N{selectedDoctor.price.toLocaleString()} upon connection.</div>
                  <button className="btn btn-primary">Start {selectedDoctor.mode === "video" ? "Video" : "Audio"} Call</button>
                  <button className="btn btn-outline" style={{ width: "100%", marginTop: 8 }} onClick={() => setSelectedDoctor({ ...selectedDoctor, mode: "schedule" })}>Schedule for Later</button>
                </div>
              ) : (
                <>
                  {scheduleStep === 1 && <>
                    <div className="form-group"><label className="form-label">Select Date</label><input className="form-input" type="date" defaultValue="2026-02-24" /></div>
                    <div className="form-group"><label className="form-label">Select Time</label><div className="time-slots">{timeSlots.map(t => <div key={t} className={"time-slot" + (selectedTime === t ? " selected" : "")} onClick={() => setSelectedTime(t)}>{t}</div>)}</div></div>
                    <button className="btn btn-primary" style={{ marginTop: 8 }} onClick={() => setScheduleStep(2)}>Continue</button>
                  </>}
                  {scheduleStep === 2 && <>
                    <div className="form-group"><label className="form-label">Consultation Type</label>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                        {["Video","Audio","Chat"].map(m => <div key={m} style={{ border: "1.5px solid #dce8eb", borderRadius: 10, padding: 12, textAlign: "center", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "var(--navy)", fontFamily: "'Manrope',sans-serif" }}>{m}</div>)}
                      </div>
                    </div>
                    <div className="form-group"><label className="form-label">Reason for Visit</label><textarea className="form-input" rows={3} placeholder="Describe your symptoms..." style={{ resize: "none" }} /></div>
                    <div style={{ background: "var(--primary-pale)", borderRadius: 12, padding: 14, marginBottom: 18 }}>
                      <div style={{ fontWeight: 700, color: "var(--navy)", marginBottom: 6, fontSize: 13, fontFamily: "'Montserrat',sans-serif" }}>Booking Summary</div>
                      <div style={{ fontSize: 12, color: "var(--navy-light)", lineHeight: 1.8, fontFamily: "'Manrope',sans-serif" }}>Time: {selectedTime || "9:00 AM"}, Feb 24, 2026<br />Doctor: {selectedDoctor.name}<br />Fee: N{selectedDoctor.price.toLocaleString()} from wallet</div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button className="btn btn-outline btn-sm" onClick={() => setScheduleStep(1)}>Back</button>
                      <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setSelectedDoctor(null)}>Confirm Booking</button>
                    </div>
                  </>}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ChatPage() {
  const [active, setActive] = useState(0);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState(CHAT_MESSAGES);
  const send = () => {
    if (!msg.trim()) return;
    setMessages([...messages, { id: Date.now(), text: msg, sent: true, time: "Now" }]);
    setMsg("");
  };
  return (
    <div>
      <div className="topbar"><div><div className="page-title">Messages</div><div className="page-sub">Chat with your doctors and support team</div></div></div>
      <div className="chat-layout" style={{ height: "calc(100vh - 160px)" }}>
        <div className="chat-sidebar">
          <div className="chat-sidebar-header"><input className="chat-search" placeholder="Search conversations..." /></div>
          {CHAT_CONTACTS.map((c, i) => (
            <div key={c.id} className={"chat-contact" + (active === i ? " active" : "")} onClick={() => setActive(i)}>
              <div style={{ position: "relative" }}>
                <div className="chat-contact-avatar">{c.initials}</div>
                {c.online && <div style={{ position: "absolute", bottom: 2, right: 2, width: 9, height: 9, background: "var(--success)", borderRadius: "50%", border: "2px solid white" }} />}
              </div>
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}><div className="chat-contact-name">{c.name}</div><div className="chat-contact-time">{c.time}</div></div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                  <div className="chat-contact-last">{c.lastMsg}</div>
                  {c.unread > 0 && <span className="chat-unread">{c.unread}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="chat-main">
          <div className="chat-header">
            <div style={{ width: 40, height: 40, borderRadius: 11, background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "white", fontFamily: "'Montserrat',sans-serif" }}>{CHAT_CONTACTS[active].initials}</div>
            <div><div style={{ fontWeight: 700, fontSize: 14, color: "var(--navy)", fontFamily: "'Montserrat',sans-serif" }}>{CHAT_CONTACTS[active].name}</div><div style={{ fontSize: 11, color: CHAT_CONTACTS[active].online ? "var(--success)" : "var(--slate)", fontFamily: "'Manrope',sans-serif" }}>{CHAT_CONTACTS[active].online ? "Online" : "Offline"}</div></div>
            <div className="chat-header-actions">
              <button className="chat-action-btn">Video</button>
              <button className="chat-action-btn">Audio</button>
              <button className="chat-action-btn">Files</button>
            </div>
          </div>
          <div className="chat-messages">
            {messages.map(m => (
              <div key={m.id} className={"chat-msg " + (m.sent ? "sent" : "received")}>
                <div className={"chat-bubble " + (m.sent ? "sent" : "received")}>{m.text}</div>
                <div className={"chat-time" + (m.sent ? " sent" : "")}>{m.time}</div>
              </div>
            ))}
          </div>
          <div className="chat-input-area">
            <button className="chat-attach">Attach</button>
            <button className="chat-attach">Voice</button>
            <input className="chat-input" placeholder="Type a message..." value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} />
            <button className="btn btn-primary btn-sm" onClick={send} style={{ padding: "9px 14px" }}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DocumentsPage() {
  return (
    <div>
      <div className="topbar"><div><div className="page-title">Health Documents</div><div className="page-sub">Upload and manage your medical records</div></div><button className="btn btn-primary btn-sm">+ Upload Document</button></div>
      <div className="upload-zone">
        <div style={{ width: 56, height: 56, borderRadius: 14, background: "var(--primary-pale)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontWeight: 800, fontSize: 11, color: "var(--primary)", fontFamily: "'Montserrat',sans-serif" }}>UPLOAD</div>
        <div style={{ fontSize: 15, fontWeight: 600, color: "var(--navy)", fontFamily: "'Montserrat',sans-serif" }}>Drag and drop files here or click to browse</div>
        <div style={{ fontSize: 12, color: "var(--slate)", marginTop: 4, fontFamily: "'Manrope',sans-serif" }}>Supports PDF, JPG, PNG - Max 50MB per file</div>
      </div>
      <div style={{ display: "flex", gap: 7, marginBottom: 18 }}>
        {["All","Lab Results","Prescriptions","Reports"].map(f => <button key={f} className={"btn btn-sm " + (f === "All" ? "btn-primary" : "btn-outline")}>{f}</button>)}
      </div>
      <div className="documents-grid">
        {DOCUMENTS.map(doc => (
          <div key={doc.id} className="doc-card">
            <div className="doc-icon" style={{ background: doc.bg, color: doc.color }}>{doc.label}</div>
            <div className="doc-name">{doc.name}</div>
            <div className="doc-meta">{doc.size} - {doc.date}</div>
            <span className={"doc-tag " + doc.type}>{doc.type}</span>
            <div style={{ display: "flex", gap: 5, marginTop: 10 }}>
              <button className="btn btn-outline btn-sm" style={{ flex: 1, padding: "5px 7px" }}>View</button>
              <button className="btn btn-outline btn-sm" style={{ flex: 1, padding: "5px 7px" }}>Download</button>
              <button className="btn btn-sm" style={{ flex: 1, padding: "5px 7px", background: "#fee2e2", color: "var(--danger)", border: "none" }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AppointmentsPage() {
  return (
    <div>
      <div className="topbar"><div><div className="page-title">Appointments</div><div className="page-sub">Your scheduled and past consultations</div></div><button className="btn btn-primary btn-sm">+ Book New</button></div>
      <div className="tab-bar">{["Upcoming","Completed","Cancelled"].map((t, i) => <button key={t} className={"tab-btn" + (i === 0 ? " active" : "")}>{t}</button>)}</div>
      <div className="schedule-list">
        {APPOINTMENTS.map(a => (
          <div key={a.id} className="appt-item">
            <div style={{ minWidth: 56, textAlign: "center" }}><div className="appt-time-val">{a.time}</div><div className="appt-time-date">{a.date}</div></div>
            <div className="appt-divider" />
            <div style={{ flex: 1 }}><div className="appt-title">{a.title}</div><div className="appt-doctor">{a.doctor}</div></div>
            <span className="badge badge-info">{a.type}</span>
            <div style={{ display: "flex", gap: 7 }}>
              <button className="btn btn-primary btn-sm">Join</button>
              <button className="btn btn-outline btn-sm">Reschedule</button>
              <button className="btn btn-sm" style={{ background: "#fee2e2", color: "var(--danger)", border: "none" }}>Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WellnessPage() {
  return (
    <div>
      <div className="topbar"><div><div className="page-title">Wellness Tracker</div><div className="page-sub">Monitor your health metrics and goals</div></div><button className="btn btn-primary btn-sm">+ Log Reading</button></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <div className="health-score-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div><div className="card-title">Overall Health Score</div><div className="card-sub">Updated weekly</div></div>
            <div className="health-score-value">82</div>
          </div>
          <div className="health-score-bar"><div className="health-score-fill" style={{ width: "82%" }} /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginTop: 14 }}>
            {[{ label: "BMI", value: "25.5" }, { label: "BP", value: "120/80" }, { label: "Sugar", value: "98 mg" }].map(m => (
              <div key={m.label} style={{ textAlign: "center", background: "rgba(255,255,255,0.6)", borderRadius: 9, padding: 9 }}>
                <div style={{ fontSize: 10, color: "var(--slate)", fontWeight: 700, textTransform: "uppercase", fontFamily: "'Montserrat',sans-serif" }}>{m.label}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "var(--navy)", marginTop: 3, fontFamily: "'Montserrat',sans-serif" }}>{m.value}</div>
                <div style={{ fontSize: 11, color: "var(--primary)", fontFamily: "'Manrope',sans-serif" }}>Normal</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-title" style={{ marginBottom: 14 }}>Today's Goals</div>
          {[{ label: "Steps", target: 10000, current: 7234, unit: "steps", color: "var(--primary)" }, { label: "Water Intake", target: 8, current: 5, unit: "glasses", color: "#3b82f6" }, { label: "Sleep", target: 8, current: 7, unit: "hrs", color: "#8b5cf6" }, { label: "Active Minutes", target: 30, current: 22, unit: "mins", color: "var(--warning)" }].map(g => (
            <div key={g.label} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}><span style={{ fontSize: 12, fontWeight: 600, color: "var(--navy)", fontFamily: "'Manrope',sans-serif" }}>{g.label}</span><span style={{ fontSize: 12, color: "var(--slate)", fontFamily: "'Manrope',sans-serif" }}>{g.current}/{g.target} {g.unit}</span></div>
              <div style={{ height: 5, background: "#f1f5f9", borderRadius: 3, overflow: "hidden" }}><div style={{ height: "100%", background: g.color, borderRadius: 3, width: Math.min(g.current / g.target * 100, 100) + "%" }} /></div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
        {[{ label: "Heart Rate", value: "72", unit: "bpm", tag: "HR", bg: "#fee2e2", color: "#991b1b" }, { label: "Blood Pressure", value: "120/80", unit: "mmHg", tag: "BP", bg: "#dcfce7", color: "#166534" }, { label: "Blood Sugar", value: "98", unit: "mg/dL", tag: "BS", bg: "#eff6ff", color: "#1d4ed8" }, { label: "Temperature", value: "36.7", unit: "Celsius", tag: "TMP", bg: "#fef9c3", color: "#854d0e" }].map(m => (
          <div key={m.label} className="card">
            <div style={{ width: 38, height: 38, borderRadius: 9, background: m.bg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 10, color: m.color, marginBottom: 10, fontFamily: "'Montserrat',sans-serif" }}>{m.tag}</div>
            <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Montserrat',sans-serif", color: "var(--navy)" }}>{m.value}</div>
            <div style={{ fontSize: 11, color: "var(--slate)", fontFamily: "'Manrope',sans-serif" }}>{m.unit}</div>
            <div style={{ fontSize: 11, color: "var(--navy)", marginTop: 3, fontFamily: "'Manrope',sans-serif" }}>{m.label}</div>
            <span className="badge badge-success" style={{ marginTop: 7 }}>Normal</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ClaimsPage() {
  return (
    <div>
      <div className="topbar"><div><div className="page-title">Claims</div><div className="page-sub">Submit and track your health claims</div></div><button className="btn btn-primary btn-sm">+ File Claim</button></div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 20 }}>
        {[{ label: "Total Claims", value: "4", color: "var(--primary)" }, { label: "Approved", value: "2", color: "var(--success)" }, { label: "Pending", value: "1", color: "var(--warning)" }].map(s => (
          <div key={s.label} className="stat-card" style={{ borderLeft: `3px solid ${s.color}` }}>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}><div className="card-title">Claims History</div><button className="btn btn-primary btn-sm">+ New Claim</button></div>
        <table className="claims-table">
          <thead><tr><th>Claim ID</th><th>Service</th><th>Provider</th><th>Date</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {CLAIMS.map(c => (
              <tr key={c.id}>
                <td style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: "var(--primary)", fontSize: 12 }}>{c.id}</td>
                <td>{c.service}</td>
                <td style={{ color: "var(--slate)" }}>{c.doctor}</td>
                <td style={{ color: "var(--slate)" }}>{c.date}</td>
                <td style={{ fontWeight: 700, fontFamily: "'Montserrat',sans-serif" }}>{c.amount}</td>
                <td><span className={"badge " + (c.status === "approved" ? "badge-success" : c.status === "pending" ? "badge-warning" : "badge-danger")}>{c.status === "approved" ? "Approved" : c.status === "pending" ? "Pending" : "Rejected"}</span></td>
                <td><button className="btn btn-ghost btn-sm">View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Transactions() {
  return (
    <div>
      <div className="topbar"><div><div className="page-title">Transactions</div><div className="page-sub">Full history of wallet activity</div></div><div style={{ display: "flex", gap: 7 }}><button className="btn btn-outline btn-sm">Export</button><button className="btn btn-outline btn-sm">Filter</button></div></div>
      <div className="card">
        <div className="txn-list">
          {TRANSACTIONS.map(t => (
            <div key={t.id} className="txn-item">
              <div className="txn-icon" style={{ background: t.bg, color: t.color }}>{t.label}</div>
              <div className="txn-info"><div className="txn-name">{t.name}</div><div className="txn-date">{t.date}</div></div>
              <div style={{ textAlign: "right" }}>
                <div className={"txn-amount " + t.type}>{t.type === "credit" ? "+" : "-"}N{t.amount.toLocaleString()}</div>
                <span className={"badge " + (t.type === "credit" ? "badge-success" : "badge-info")} style={{ fontSize: 10, marginTop: 3 }}>{t.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsToggle({ on = true }) {
  const [isOn, setIsOn] = useState(on);
  return (
    <div className={"toggle" + (isOn ? "" : " off")} onClick={() => setIsOn(!isOn)}>
      <div className="toggle-thumb" />
    </div>
  );
}

function Settings() {
  const sections = [
    { title: "Notifications", icon: "BELL", items: [
      { label: "Email Alerts", desc: "Appointment and transaction alerts by email", toggle: true, on: true },
      { label: "SMS Reminders", desc: "Appointment reminders via SMS", toggle: true, on: true },
      { label: "Push Notifications", desc: "Browser and mobile push notifications", toggle: true, on: false },
      { label: "Health Tips Newsletter", desc: "Weekly health and wellness tips", toggle: true, on: false },
    ]},
    { title: "Security", icon: "LOCK", items: [
      { label: "Two-Factor Authentication", desc: "Add an extra layer of security to your account", toggle: true, on: true },
      { label: "Biometric Login", desc: "Use fingerprint or face ID to log in", toggle: true, on: false },
      { label: "Login Activity Alerts", desc: "Get notified of new sign-ins", toggle: true, on: true },
      { label: "Change Password", desc: "Update your account password", action: "Change" },
    ]},
    { title: "Privacy", icon: "PRIV", items: [
      { label: "Data Sharing Preferences", desc: "Control how your data is shared", action: "Manage" },
      { label: "Health Data Visibility", desc: "Choose who can view your health records", action: "Manage" },
      { label: "Download My Data", desc: "Export all your data in a portable format", action: "Download" },
      { label: "Delete Account Data", desc: "Permanently remove your account and all data", action: "Delete", danger: true },
    ]},
    { title: "Payment", icon: "PAY", items: [
      { label: "Saved Payment Methods", desc: "Manage your cards and bank accounts", action: "Manage" },
      { label: "Auto-Fund Wallet", desc: "Automatically top up when balance is low", toggle: true, on: false },
      { label: "Spending Notifications", desc: "Get alerts for every wallet transaction", toggle: true, on: true },
      { label: "Transaction PIN", desc: "Set a PIN for wallet transactions", action: "Set PIN" },
    ]},
  ];
  return (
    <div>
      <div className="topbar"><div><div className="page-title">Settings</div><div className="page-sub">Manage your account preferences</div></div></div>
      {sections.map(sec => (
        <div key={sec.title} className="settings-section">
          <div className="settings-section-title">
            <div className="settings-section-icon">{sec.icon}</div>
            {sec.title}
          </div>
          {sec.items.map(item => (
            <div key={item.label} className="settings-item">
              <div className="settings-item-left">
                <div className="settings-item-label">{item.label}</div>
                <div className="settings-item-desc">{item.desc}</div>
              </div>
              {item.toggle && <SettingsToggle on={item.on} />}
              {item.action && <button className={"settings-action" + (item.danger ? " settings-action-danger" : "")}>{item.action}</button>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [authed, setAuthed] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [userPhoto] = useState(null);
  const [userName, setUserName] = useState("Loading...");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    getCurrentUser().then(user => {
      if (user) {
        setAuthed(true);
        setUserId(user.id);
        getProfile(user.id).then(profile => {
          if (profile) setUserName(profile.full_name);
        }).catch(() => {});
      }
    });
  }, []);

  const handleLogin = (user) => {
    setAuthed(true);
    setUserId(user.id);
    getProfile(user.id).then(profile => {
      if (profile) setUserName(profile.full_name);
    }).catch(() => {});
    setPage("dashboard");
  };

  const handleLogout = async () => {
    await logoutUser();
    setAuthed(false);
    setUserId(null);
    setUserName("Loading...");
    setPage("dashboard");
  };

  const pages = {
    dashboard: <Dashboard onNav={setPage} />,
    wallet: <WalletPage />,
    transactions: <Transactions />,
    telemedicine: <TelemedicinePage />,
    appointments: <AppointmentsPage />,
    chat: <ChatPage />,
    documents: <DocumentsPage />,
    wellness: <WellnessPage />,
    profile: <ProfilePage />,
    dependents: <DependentsPage />,
    claims: <ClaimsPage />,
    settings: <Settings />,
  };

  if (!authed) return <><style>{styles}</style><AuthScreen onLogin={handleLogin} /></>;

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="main-layout">
          <Sidebar active={page} onNav={setPage} userPhoto={userPhoto} userName={userName} onLogout={handleLogout} />
          <div className="main-content">{pages[page] || pages.dashboard}</div>
        </div>
      </div>
    </>
  );
}