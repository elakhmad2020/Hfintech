import { useState, useEffect, useRef } from "react";

const styles = `
  @import 
url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --teal: #0d9488;
    --teal-light: #14b8a6;
    --teal-dark: #0f766e;
    --teal-pale: #ccfbf1;
    --gold: #f59e0b;
    --gold-light: #fcd34d;
    --navy: #0f172a;
    --navy-mid: #1e293b;
    --navy-light: #334155;
    --slate: #64748b;
    --slate-light: #94a3b8;
    --bg: #f0fdf9;
    --white: #ffffff;
    --danger: #ef4444;
    --success: #10b981;
    --card-shadow: 0 4px 24px rgba(13,148,136,0.10);
    --card-shadow-hover: 0 8px 40px rgba(13,148,136,0.18);
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: 
var(--navy); }
  h1,h2,h3,h4,h5 { font-family: 'Syne', sans-serif; }

  .app { display: flex; flex-direction: column; min-height: 100vh; }

  /* AUTH */
  .auth-screen {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: var(--white);
  }
  .auth-left {
    background: linear-gradient(135deg, var(--navy) 0%, var(--teal-dark) 
60%, var(--teal-light) 100%);
    display: flex; flex-direction: column; justify-content: center; 
align-items: flex-start;
    padding: 64px;
    position: relative; overflow: hidden;
  }
  .auth-left::before {
    content: '';
    position: absolute; top: -100px; right: -100px;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(20,184,166,0.3) 0%, 
transparent 70%);
    border-radius: 50%;
  }
  .auth-left::after {
    content: '';
    position: absolute; bottom: -80px; left: -60px;
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(245,158,11,0.2) 0%, 
transparent 70%);
    border-radius: 50%;
  }
  .auth-logo { display: flex; align-items: center; gap: 12px; 
margin-bottom: 64px; z-index: 1; position: relative; }
  .auth-logo-icon {
    width: 48px; height: 48px; background: var(--gold);
    border-radius: 12px; display: flex; align-items: center; 
justify-content: center;
    font-size: 24px;
  }
  .auth-logo-text { font-family: 'Syne', sans-serif; font-size: 22px; 
font-weight: 800; color: white; letter-spacing: -0.5px; }
  .auth-headline { font-size: 48px; font-weight: 800; color: white; 
line-height: 1.1; margin-bottom: 24px; z-index: 1; position: relative; }
  .auth-headline span { color: var(--gold-light); }
  .auth-sub { font-size: 16px; color: rgba(255,255,255,0.7); line-height: 
1.7; z-index: 1; position: relative; max-width: 380px; }
  .auth-features { margin-top: 48px; display: flex; flex-direction: 
column; gap: 16px; z-index: 1; position: relative; }
  .auth-feature { display: flex; align-items: center; gap: 12px; color: 
rgba(255,255,255,0.85); font-size: 15px; }
  .auth-feature-dot { width: 8px; height: 8px; background: var(--gold); 
border-radius: 50%; flex-shrink: 0; }

  .auth-right {
    display: flex; flex-direction: column; justify-content: center; 
align-items: center;
    padding: 64px; background: var(--white);
  }
  .auth-form-container { width: 100%; max-width: 400px; }
  .auth-form-title { font-size: 32px; font-weight: 800; color: 
var(--navy); margin-bottom: 8px; }
  .auth-form-sub { color: var(--slate); font-size: 14px; margin-bottom: 
40px; }

  .form-group { margin-bottom: 20px; }
  .form-label { display: block; font-size: 13px; font-weight: 600; color: 
var(--navy-light); margin-bottom: 6px; text-transform: uppercase; 
letter-spacing: 0.5px; }
  .form-input {
    width: 100%; padding: 14px 16px; border: 2px solid #e2e8f0;
    border-radius: 12px; font-size: 15px; font-family: 'DM Sans', 
sans-serif;
    color: var(--navy); background: var(--bg);
    transition: border-color 0.2s, box-shadow 0.2s;
    outline: none;
  }
  .form-input:focus { border-color: var(--teal); box-shadow: 0 0 0 4px 
rgba(13,148,136,0.1); }

  .btn {
    padding: 14px 24px; border-radius: 12px; font-family: 'Syne', 
sans-serif;
    font-weight: 700; font-size: 15px; cursor: pointer; border: none;
    transition: all 0.2s; display: inline-flex; align-items: center; gap: 
8px;
  }
  .btn-primary {
    background: var(--teal); color: white; width: 100%; justify-content: 
center;
  }
  .btn-primary:hover { background: var(--teal-dark); transform: 
translateY(-1px); box-shadow: 0 8px 20px rgba(13,148,136,0.3); }
  .btn-outline {
    background: transparent; color: var(--teal); border: 2px solid 
var(--teal);
  }
  .btn-outline:hover { background: var(--teal-pale); }
  .btn-gold { background: var(--gold); color: var(--navy); }
  .btn-gold:hover { background: var(--gold-light); transform: 
translateY(-1px); }
  .btn-sm { padding: 8px 16px; font-size: 13px; border-radius: 8px; }
  .btn-danger { background: var(--danger); color: white; }
  .btn-success { background: var(--success); color: white; }
  .btn-ghost { background: transparent; color: var(--slate); border: none; 
}
  .btn-ghost:hover { color: var(--teal); background: var(--teal-pale); }

  .auth-tabs { display: flex; gap: 0; margin-bottom: 32px; border: 2px 
solid #e2e8f0; border-radius: 12px; overflow: hidden; }
  .auth-tab {
    flex: 1; padding: 12px; font-family: 'Syne', sans-serif; font-weight: 
700;
    font-size: 14px; background: var(--white); color: var(--slate); 
cursor: pointer;
    border: none; transition: all 0.2s;
  }
  .auth-tab.active { background: var(--teal); color: white; }

  .divider { display: flex; align-items: center; gap: 16px; margin: 24px 
0; }
  .divider-line { flex: 1; height: 1px; background: #e2e8f0; }
  .divider-text { color: var(--slate-light); font-size: 13px; }

  .verify-screen { text-align: center; padding: 32px 0; }
  .verify-icon { font-size: 64px; margin-bottom: 16px; }
  .verify-title { font-size: 24px; font-weight: 800; color: var(--navy); 
margin-bottom: 8px; }
  .verify-sub { color: var(--slate); font-size: 14px; margin-bottom: 32px; 
line-height: 1.7; }
  .otp-inputs { display: flex; gap: 8px; justify-content: center; 
margin-bottom: 24px; }
  .otp-input {
    width: 48px; height: 56px; text-align: center; font-size: 24px; 
font-weight: 700;
    border: 2px solid #e2e8f0; border-radius: 12px; font-family: 'Syne', 
sans-serif;
    color: var(--navy); background: var(--bg); outline: none; transition: 
all 0.2s;
  }
  .otp-input:focus { border-color: var(--teal); box-shadow: 0 0 0 4px 
rgba(13,148,136,0.1); }

  /* MAIN LAYOUT */
  .main-layout { display: flex; min-height: 100vh; }

  .sidebar {
    width: 260px; min-height: 100vh; background: var(--navy);
    display: flex; flex-direction: column;
    position: fixed; left: 0; top: 0; bottom: 0; z-index: 100;
  }
  .sidebar-logo {
    padding: 24px 20px; border-bottom: 1px solid rgba(255,255,255,0.08);
    display: flex; align-items: center; gap: 10px;
  }
  .sidebar-logo-icon {
    width: 36px; height: 36px; background: var(--gold);
    border-radius: 8px; display: flex; align-items: center; 
justify-content: center;
    font-size: 18px;
  }
  .sidebar-logo-text { font-family: 'Syne', sans-serif; font-size: 18px; 
font-weight: 800; color: white; }

  .sidebar-nav { flex: 1; padding: 16px 12px; overflow-y: auto; }
  .sidebar-section-label {
    font-size: 10px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 1.5px; color: rgba(255,255,255,0.3); padding: 8px 8px 
4px;
    margin-top: 16px;
  }
  .nav-item {
    display: flex; align-items: center; gap: 12px; padding: 11px 12px;
    border-radius: 10px; cursor: pointer; color: rgba(255,255,255,0.6);
    font-size: 14px; font-weight: 500; transition: all 0.2s; 
margin-bottom: 2px;
    font-family: 'DM Sans', sans-serif;
  }
  .nav-item:hover { background: rgba(255,255,255,0.08); color: white; }
  .nav-item.active { background: var(--teal); color: white; }
  .nav-item .nav-icon { font-size: 18px; width: 22px; text-align: center; 
}
  .nav-badge {
    margin-left: auto; background: var(--gold); color: var(--navy);
    font-size: 10px; font-weight: 700; border-radius: 20px; padding: 2px 
7px;
  }

  .sidebar-footer {
    padding: 16px 12px; border-top: 1px solid rgba(255,255,255,0.08);
  }
  .sidebar-user {
    display: flex; align-items: center; gap: 10px; padding: 10px 8px;
    border-radius: 10px; cursor: pointer; transition: all 0.2s;
  }
  .sidebar-user:hover { background: rgba(255,255,255,0.08); }
  .sidebar-avatar {
    width: 36px; height: 36px; border-radius: 10px;
    background: var(--teal); display: flex; align-items: center; 
justify-content: center;
    font-weight: 700; color: white; font-size: 15px; flex-shrink: 0;
  }
  .sidebar-user-info { flex: 1; overflow: hidden; }
  .sidebar-user-name { font-size: 14px; font-weight: 600; color: white; 
white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sidebar-user-role { font-size: 11px; color: rgba(255,255,255,0.45); }

  .main-content { margin-left: 260px; flex: 1; padding: 32px; background: 
var(--bg); min-height: 100vh; }

  .topbar {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 32px;
  }
  .page-title { font-size: 28px; font-weight: 800; color: var(--navy); }
  .page-sub { font-size: 14px; color: var(--slate); margin-top: 2px; }
  .topbar-actions { display: flex; align-items: center; gap: 12px; }
  .notification-btn {
    width: 40px; height: 40px; border-radius: 10px; background: 
var(--white);
    border: 2px solid #e2e8f0; display: flex; align-items: center; 
justify-content: center;
    cursor: pointer; font-size: 18px; position: relative; transition: all 
0.2s;
  }
  .notification-btn:hover { border-color: var(--teal); }
  .notif-dot {
    position: absolute; top: 6px; right: 6px; width: 8px; height: 8px;
    background: var(--danger); border-radius: 50%; border: 2px solid 
white;
  }

  /* CARDS */
  .card {
    background: white; border-radius: 20px; padding: 24px;
    box-shadow: var(--card-shadow); transition: box-shadow 0.2s;
  }
  .card:hover { box-shadow: var(--card-shadow-hover); }
  .card-title { font-size: 16px; font-weight: 700; color: var(--navy); 
margin-bottom: 4px; }
  .card-sub { font-size: 13px; color: var(--slate); }

  /* DASHBOARD */
  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 
20px; margin-bottom: 28px; }
  .stat-card {
    background: white; border-radius: 20px; padding: 24px;
    box-shadow: var(--card-shadow); position: relative; overflow: hidden;
  }
  .stat-card::before {
    content: ''; position: absolute; top: -20px; right: -20px;
    width: 80px; height: 80px; border-radius: 50%;
    background: var(--teal-pale); opacity: 0.6;
  }
  .stat-icon { font-size: 28px; margin-bottom: 12px; }
  .stat-value { font-size: 28px; font-weight: 800; font-family: 'Syne', 
sans-serif; color: var(--navy); }
  .stat-label { font-size: 13px; color: var(--slate); margin-top: 4px; }
  .stat-change { font-size: 12px; font-weight: 600; margin-top: 8px; }
  .stat-change.up { color: var(--success); }
  .stat-change.down { color: var(--danger); }

  .dashboard-grid { display: grid; grid-template-columns: 1fr 340px; gap: 
24px; }
  .wallet-card {
    background: linear-gradient(135deg, var(--navy) 0%, var(--teal-dark) 
100%);
    border-radius: 24px; padding: 32px; color: white; position: relative; 
overflow: hidden;
  }
  .wallet-card::before {
    content: ''; position: absolute; top: -60px; right: -40px;
    width: 200px; height: 200px; border-radius: 50%;
    background: rgba(20,184,166,0.2);
  }
  .wallet-card::after {
    content: ''; position: absolute; bottom: -40px; left: 60px;
    width: 150px; height: 150px; border-radius: 50%;
    background: rgba(245,158,11,0.15);
  }
  .wallet-label { font-size: 12px; text-transform: uppercase; 
letter-spacing: 1px; opacity: 0.7; margin-bottom: 8px; }
  .wallet-amount { font-size: 42px; font-weight: 800; font-family: 'Syne', 
sans-serif; position: relative; z-index: 1; }
  .wallet-id { font-size: 13px; opacity: 0.6; margin-top: 4px; 
letter-spacing: 2px; }
  .wallet-actions { display: flex; gap: 12px; margin-top: 28px; position: 
relative; z-index: 1; }
  .wallet-btn {
    flex: 1; padding: 12px; border-radius: 12px; font-family: 'Syne', 
sans-serif;
    font-weight: 700; font-size: 13px; cursor: pointer; border: none;
    transition: all 0.2s; display: flex; align-items: center; 
justify-content: center; gap: 6px;
  }
  .wallet-btn-primary { background: var(--gold); color: var(--navy); }
  .wallet-btn-primary:hover { background: var(--gold-light); }
  .wallet-btn-outline { background: rgba(255,255,255,0.12); color: white; 
border: 1px solid rgba(255,255,255,0.2); }
  .wallet-btn-outline:hover { background: rgba(255,255,255,0.2); }
  .wallet-chip { display: flex; gap: 8px; margin-top: 16px; }
  .wallet-chip-item {
    padding: 6px 12px; border-radius: 20px; background: 
rgba(255,255,255,0.1);
    font-size: 12px; display: flex; align-items: center; gap: 6px;
  }

  .txn-list { display: flex; flex-direction: column; gap: 12px; }
  .txn-item {
    display: flex; align-items: center; gap: 14px; padding: 14px;
    border-radius: 14px; background: var(--bg); transition: background 
0.2s; cursor: pointer;
  }
  .txn-item:hover { background: var(--teal-pale); }
  .txn-icon {
    width: 42px; height: 42px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center; 
font-size: 18px; flex-shrink: 0;
  }
  .txn-info { flex: 1; }
  .txn-name { font-size: 14px; font-weight: 600; color: var(--navy); }
  .txn-date { font-size: 12px; color: var(--slate); margin-top: 2px; }
  .txn-amount { font-size: 15px; font-weight: 700; font-family: 'Syne', 
sans-serif; }
  .txn-amount.credit { color: var(--success); }
  .txn-amount.debit { color: var(--danger); }

  .quick-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 
12px; margin-bottom: 24px; }
  .quick-action {
    background: white; border-radius: 16px; padding: 20px;
    text-align: center; cursor: pointer; transition: all 0.2s;
    box-shadow: var(--card-shadow); border: 2px solid transparent;
  }
  .quick-action:hover { border-color: var(--teal); transform: 
translateY(-2px); }
  .quick-action-icon { font-size: 28px; margin-bottom: 8px; }
  .quick-action-label { font-size: 13px; font-weight: 600; color: 
var(--navy); }

  /* HEALTH SCORE */
  .health-score-card {
    background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
    border-radius: 20px; padding: 24px; border: 2px solid #a7f3d0;
  }
  .health-score-header { display: flex; justify-content: space-between; 
align-items: flex-start; margin-bottom: 16px; }
  .health-score-value { font-size: 48px; font-weight: 800; font-family: 
'Syne', sans-serif; color: var(--success); }
  .health-score-bar { height: 8px; background: #a7f3d0; border-radius: 
4px; overflow: hidden; }
  .health-score-fill { height: 100%; background: var(--success); 
border-radius: 4px; transition: width 1s ease; }

  /* PROFILE */
  .profile-header { display: flex; gap: 24px; margin-bottom: 28px; }
  .profile-avatar-large {
    width: 100px; height: 100px; border-radius: 24px;
    background: var(--teal); display: flex; align-items: center; 
justify-content: center;
    font-size: 36px; font-weight: 800; color: white; flex-shrink: 0;
    font-family: 'Syne', sans-serif;
  }
  .profile-id-card {
    flex: 1; background: white; border-radius: 20px; padding: 20px;
    box-shadow: var(--card-shadow);
  }
  .profile-name { font-size: 24px; font-weight: 800; color: var(--navy); }
  .profile-id { font-size: 12px; color: var(--teal); font-weight: 600; 
letter-spacing: 1px; margin-top: 4px; }
  .profile-tags { display: flex; gap: 8px; margin-top: 10px; flex-wrap: 
wrap; }
  .profile-tag {
    padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 
600;
    background: var(--teal-pale); color: var(--teal-dark);
  }

  .profile-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 
24px; margin-bottom: 24px; }
  .form-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; 
}
  .form-select {
    width: 100%; padding: 14px 16px; border: 2px solid #e2e8f0;
    border-radius: 12px; font-size: 15px; font-family: 'DM Sans', 
sans-serif;
    color: var(--navy); background: var(--bg); outline: none;
    transition: border-color 0.2s; -webkit-appearance: none; cursor: 
pointer;
  }
  .form-select:focus { border-color: var(--teal); }

  /* DEPENDENTS */
  .dependents-grid { display: grid; grid-template-columns: 
repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; margin-bottom: 24px; }
  .dependent-card {
    background: white; border-radius: 20px; padding: 24px;
    box-shadow: var(--card-shadow); transition: all 0.2s; position: 
relative; overflow: hidden;
  }
  .dependent-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 
4px;
    background: var(--teal);
  }
  .dependent-card:hover { transform: translateY(-4px); box-shadow: 
var(--card-shadow-hover); }
  .dependent-avatar {
    width: 56px; height: 56px; border-radius: 16px; background: 
var(--teal-pale);
    display: flex; align-items: center; justify-content: center; 
font-size: 26px; margin-bottom: 14px;
  }
  .dependent-name { font-size: 17px; font-weight: 700; color: var(--navy); 
}
  .dependent-id { font-size: 11px; color: var(--teal); font-weight: 600; 
letter-spacing: 0.5px; margin-top: 3px; }
  .dependent-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 
10px; margin-top: 14px; }
  .dependent-meta-item { }
  .dependent-meta-label { font-size: 10px; text-transform: uppercase; 
letter-spacing: 0.5px; color: var(--slate-light); font-weight: 700; }
  .dependent-meta-value { font-size: 14px; font-weight: 600; color: 
var(--navy); margin-top: 2px; }
  .dependent-actions { display: flex; gap: 8px; margin-top: 16px; }

  /* TELEMEDICINE */
  .doctors-grid { display: grid; grid-template-columns: repeat(auto-fill, 
minmax(280px, 1fr)); gap: 20px; }
  .doctor-card {
    background: white; border-radius: 20px; padding: 20px;
    box-shadow: var(--card-shadow); transition: all 0.2s; cursor: pointer;
  }
  .doctor-card:hover { transform: translateY(-3px); box-shadow: 
var(--card-shadow-hover); }
  .doctor-header { display: flex; gap: 14px; margin-bottom: 14px; }
  .doctor-avatar {
    width: 60px; height: 60px; border-radius: 16px;
    display: flex; align-items: center; justify-content: center;
    font-size: 28px; flex-shrink: 0;
  }
  .doctor-name { font-size: 16px; font-weight: 700; color: var(--navy); }
  .doctor-specialty { font-size: 13px; color: var(--teal); font-weight: 
600; margin-top: 2px; }
  .doctor-rating { display: flex; align-items: center; gap: 4px; 
font-size: 13px; font-weight: 600; color: var(--gold); margin-top: 4px; }
  .doctor-status { display: flex; align-items: center; gap: 6px; 
font-size: 12px; font-weight: 600; margin-bottom: 14px; }
  .status-dot { width: 8px; height: 8px; border-radius: 50%; }
  .status-dot.online { background: var(--success); box-shadow: 0 0 0 3px 
rgba(16,185,129,0.2); }
  .status-dot.busy { background: var(--gold); }
  .status-dot.offline { background: var(--slate-light); }
  .doctor-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 
14px; }
  .doctor-tag { padding: 3px 10px; border-radius: 20px; font-size: 11px; 
font-weight: 600; background: var(--bg); color: var(--slate); }
  .doctor-call-actions { display: grid; grid-template-columns: 1fr 1fr 
1fr; gap: 6px; }
  .call-btn {
    padding: 8px; border-radius: 10px; font-size: 18px; cursor: pointer;
    border: none; transition: all 0.2s; display: flex; align-items: 
center; justify-content: center;
  }
  .call-btn-video { background: var(--teal-pale); }
  .call-btn-video:hover { background: var(--teal); }
  .call-btn-audio { background: #dcfce7; }
  .call-btn-audio:hover { background: var(--success); }
  .call-btn-chat { background: #eff6ff; }
  .call-btn-chat:hover { background: #3b82f6; }

  /* TELEMEDICINE MODAL */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(15,23,42,0.7);
    display: flex; align-items: center; justify-content: center;
    z-index: 1000; backdrop-filter: blur(4px);
  }
  .modal {
    background: white; border-radius: 24px; width: 90%; max-width: 820px;
    max-height: 90vh; overflow-y: auto; box-shadow: 0 24px 80px 
rgba(0,0,0,0.3);
  }
  .modal-header {
    padding: 24px 28px; border-bottom: 1px solid #f1f5f9;
    display: flex; justify-content: space-between; align-items: center;
    position: sticky; top: 0; background: white; z-index: 1; 
border-radius: 24px 24px 0 0;
  }
  .modal-title { font-size: 22px; font-weight: 800; color: var(--navy); }
  .modal-close {
    width: 36px; height: 36px; border-radius: 10px; border: none;
    background: var(--bg); cursor: pointer; font-size: 20px; display: 
flex;
    align-items: center; justify-content: center; color: var(--slate);
    transition: all 0.2s;
  }
  .modal-close:hover { background: #fee2e2; color: var(--danger); }
  .modal-body { padding: 28px; }

  /* CHAT */
  .chat-layout { display: grid; grid-template-columns: 300px 1fr; height: 
calc(100vh - 120px); border-radius: 20px; overflow: hidden; background: 
white; box-shadow: var(--card-shadow); }
  .chat-sidebar { border-right: 1px solid #f1f5f9; overflow-y: auto; }
  .chat-sidebar-header { padding: 20px; border-bottom: 1px solid #f1f5f9; 
}
  .chat-search { width: 100%; padding: 10px 14px; border: 2px solid 
#e2e8f0; border-radius: 10px; font-size: 14px; outline: none; background: 
var(--bg); transition: border-color 0.2s; }
  .chat-search:focus { border-color: var(--teal); }
  .chat-contact { display: flex; gap: 12px; padding: 14px 16px; cursor: 
pointer; transition: background 0.2s; border-bottom: 1px solid #f8fafc; }
  .chat-contact:hover { background: var(--bg); }
  .chat-contact.active { background: var(--teal-pale); border-left: 3px 
solid var(--teal); }
  .chat-contact-avatar { width: 44px; height: 44px; border-radius: 12px; 
font-size: 20px; display: flex; align-items: center; justify-content: 
center; flex-shrink: 0; background: var(--bg); }
  .chat-contact-info { flex: 1; overflow: hidden; }
  .chat-contact-name { font-size: 14px; font-weight: 700; color: 
var(--navy); }
  .chat-contact-last { font-size: 12px; color: var(--slate); margin-top: 
2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .chat-contact-time { font-size: 11px; color: var(--slate-light); }
  .chat-unread { background: var(--teal); color: white; border-radius: 
20px; padding: 2px 7px; font-size: 11px; font-weight: 700; }

  .chat-main { display: flex; flex-direction: column; }
  .chat-header { padding: 16px 20px; border-bottom: 1px solid #f1f5f9; 
display: flex; align-items: center; gap: 12px; }
  .chat-header-actions { margin-left: auto; display: flex; gap: 8px; }
  .chat-action-btn { width: 36px; height: 36px; border-radius: 10px; 
border: none; background: var(--bg); cursor: pointer; font-size: 18px; 
transition: all 0.2s; display: flex; align-items: center; justify-content: 
center; }
  .chat-action-btn:hover { background: var(--teal-pale); }
  .chat-messages { flex: 1; overflow-y: auto; padding: 20px; display: 
flex; flex-direction: column; gap: 12px; background: var(--bg); }
  .chat-msg { max-width: 68%; }
  .chat-msg.sent { align-self: flex-end; }
  .chat-msg.received { align-self: flex-start; }
  .chat-bubble { padding: 12px 16px; border-radius: 16px; font-size: 14px; 
line-height: 1.6; }
  .chat-bubble.sent { background: var(--teal); color: white; 
border-bottom-right-radius: 4px; }
  .chat-bubble.received { background: white; color: var(--navy); 
border-bottom-left-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
  .chat-time { font-size: 10px; color: var(--slate-light); margin-top: 
4px; }
  .chat-time.sent { text-align: right; }
  .chat-input-area { padding: 16px 20px; border-top: 1px solid #f1f5f9; 
display: flex; gap: 10px; align-items: center; }
  .chat-input { flex: 1; padding: 12px 16px; border: 2px solid #e2e8f0; 
border-radius: 12px; font-size: 14px; outline: none; font-family: 'DM 
Sans', sans-serif; transition: border-color 0.2s; }
  .chat-input:focus { border-color: var(--teal); }
  .chat-attach { width: 40px; height: 40px; border-radius: 10px; border: 
2px solid #e2e8f0; background: white; cursor: pointer; font-size: 18px; 
display: flex; align-items: center; justify-content: center; transition: 
all 0.2s; }
  .chat-attach:hover { border-color: var(--teal); background: 
var(--teal-pale); }

  /* DOCUMENTS */
  .documents-grid { display: grid; grid-template-columns: 
repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
  .doc-card { background: white; border-radius: 16px; padding: 20px; 
box-shadow: var(--card-shadow); cursor: pointer; transition: all 0.2s; }
  .doc-card:hover { transform: translateY(-2px); box-shadow: 
var(--card-shadow-hover); }
  .doc-icon { font-size: 36px; margin-bottom: 10px; }
  .doc-name { font-size: 14px; font-weight: 600; color: var(--navy); }
  .doc-meta { font-size: 12px; color: var(--slate); margin-top: 4px; }
  .doc-tag { display: inline-block; margin-top: 8px; padding: 3px 10px; 
border-radius: 20px; font-size: 11px; font-weight: 600; }
  .doc-tag.lab { background: #eff6ff; color: #3b82f6; }
  .doc-tag.prescription { background: #ecfdf5; color: var(--success); }
  .doc-tag.insurance { background: var(--teal-pale); color: 
var(--teal-dark); }
  .doc-tag.report { background: #fef3c7; color: var(--gold); }

  .upload-zone {
    border: 2px dashed #cbd5e1; border-radius: 16px; padding: 40px;
    text-align: center; cursor: pointer; transition: all 0.2s; 
margin-bottom: 24px;
  }
  .upload-zone:hover { border-color: var(--teal); background: 
var(--teal-pale); }
  .upload-icon { font-size: 40px; margin-bottom: 12px; }
  .upload-text { font-size: 16px; font-weight: 600; color: var(--navy); }
  .upload-sub { font-size: 13px; color: var(--slate); margin-top: 4px; }

  /* WELLNESS PLAN */
  .wellness-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 
20px; }
  .wellness-metric { background: white; border-radius: 20px; padding: 
20px; box-shadow: var(--card-shadow); }
  .wellness-metric-header { display: flex; justify-content: space-between; 
align-items: flex-start; margin-bottom: 16px; }
  .wellness-metric-value { font-size: 32px; font-weight: 800; font-family: 
'Syne', sans-serif; color: var(--navy); }
  .wellness-metric-unit { font-size: 14px; color: var(--slate); 
margin-top: 4px; }
  .wellness-bar-bg { height: 8px; background: #f1f5f9; border-radius: 4px; 
overflow: hidden; margin-top: 12px; }
  .wellness-bar { height: 100%; border-radius: 4px; transition: width 1s 
ease; }

  /* INSURANCE */
  .insurance-card {
    background: linear-gradient(135deg, #1e3a5f 0%, #0d9488 100%);
    border-radius: 24px; padding: 32px; color: white; margin-bottom: 24px; 
position: relative; overflow: hidden;
  }
  .insurance-card::before { content: ''; position: absolute; top: -40px; 
right: -40px; width: 200px; height: 200px; border-radius: 50%; background: 
rgba(255,255,255,0.06); }
  .insurance-plan { font-size: 22px; font-weight: 800; margin-bottom: 4px; 
}
  .insurance-id { font-size: 12px; opacity: 0.6; letter-spacing: 2px; }
  .insurance-meta { display: grid; grid-template-columns: repeat(3, 1fr); 
gap: 20px; margin-top: 24px; }
  .insurance-meta-item { }
  .insurance-meta-label { font-size: 10px; text-transform: uppercase; 
letter-spacing: 0.5px; opacity: 0.6; }
  .insurance-meta-value { font-size: 18px; font-weight: 700; margin-top: 
4px; }

  /* BADGE */
  .badge { display: inline-flex; align-items: center; gap: 4px; padding: 
4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .badge-success { background: #dcfce7; color: #16a34a; }
  .badge-warning { background: #fef9c3; color: #ca8a04; }
  .badge-danger { background: #fee2e2; color: #dc2626; }
  .badge-info { background: #eff6ff; color: #2563eb; }

  /* SCHEDULE */
  .schedule-list { display: flex; flex-direction: column; gap: 12px; }
  .appt-item { background: white; border-radius: 16px; padding: 16px 20px; 
box-shadow: var(--card-shadow); display: flex; gap: 16px; align-items: 
center; }
  .appt-time { text-align: center; min-width: 60px; }
  .appt-time-val { font-size: 18px; font-weight: 800; font-family: 'Syne', 
sans-serif; color: var(--teal); }
  .appt-time-date { font-size: 11px; color: var(--slate); }
  .appt-divider { width: 2px; height: 40px; background: var(--teal-pale); 
flex-shrink: 0; }
  .appt-info { flex: 1; }
  .appt-title { font-size: 15px; font-weight: 700; color: var(--navy); }
  .appt-doctor { font-size: 13px; color: var(--slate); margin-top: 2px; }
  .appt-actions { display: flex; gap: 8px; }

  /* CLAIMS */
  .claims-table { width: 100%; border-collapse: collapse; }
  .claims-table th { font-size: 11px; text-transform: uppercase; 
letter-spacing: 0.5px; color: var(--slate-light); font-weight: 700; 
padding: 12px 16px; text-align: left; border-bottom: 2px solid #f1f5f9; }
  .claims-table td { padding: 14px 16px; border-bottom: 1px solid #f8fafc; 
font-size: 14px; color: var(--navy); vertical-align: middle; }
  .claims-table tr:hover td { background: var(--bg); }

  /* TABS */
  .tab-bar { display: flex; gap: 0; border-bottom: 2px solid #f1f5f9; 
margin-bottom: 24px; }
  .tab-btn { padding: 12px 20px; font-family: 'Syne', sans-serif; 
font-weight: 700; font-size: 14px; background: none; border: none; cursor: 
pointer; color: var(--slate); border-bottom: 3px solid transparent; 
margin-bottom: -2px; transition: all 0.2s; }
  .tab-btn.active { color: var(--teal); border-bottom-color: var(--teal); 
}
  .tab-btn:hover { color: var(--teal-dark); }

  /* MODAL SCHEDULE */
  .time-slots { display: grid; grid-template-columns: repeat(4, 1fr); gap: 
10px; margin-top: 12px; }
  .time-slot { padding: 10px; border: 2px solid #e2e8f0; border-radius: 
10px; text-align: center; cursor: pointer; font-size: 13px; font-weight: 
600; color: var(--navy); transition: all 0.2s; background: white; }
  .time-slot:hover { border-color: var(--teal); color: var(--teal); }
  .time-slot.selected { background: var(--teal); border-color: 
var(--teal); color: white; }
  .time-slot.unavailable { background: var(--bg); color: 
var(--slate-light); cursor: not-allowed; border-color: #f1f5f9; }

  /* RESPONSIVE */
  @media (max-width: 1100px) {
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .dashboard-grid { grid-template-columns: 1fr; }
  }

  .empty-state { text-align: center; padding: 60px 40px; color: 
var(--slate); }
  .empty-state-icon { font-size: 56px; margin-bottom: 16px; }
  .empty-state-text { font-size: 18px; font-weight: 700; color: 
var(--navy); }
  .empty-state-sub { font-size: 14px; margin-top: 4px; }

  .tooltip { position: relative; }
  .tooltip-text { visibility: hidden; position: absolute; bottom: 110%; 
left: 50%; transform: translateX(-50%); background: var(--navy); color: 
white; padding: 5px 10px; border-radius: 8px; font-size: 12px; 
white-space: nowrap; }
  .tooltip:hover .tooltip-text { visibility: visible; }

  .progress-ring { transform: rotate(-90deg); }
  .progress-ring-track { fill: none; stroke: #f1f5f9; stroke-width: 8; }
  .progress-ring-fill { fill: none; stroke: var(--teal); stroke-width: 8; 
stroke-linecap: round; transition: stroke-dashoffset 1s ease; }
`;

// ==================== DATA ====================
const DOCTORS = [
  { id: 1, name: "Dr. Amira Osei", specialty: "General Practitioner", 
rating: 4.9, status: "online", emoji: "👩‍⚕️", tags: ["Family Medicine", 
"Preventive Care"], experience: "8 yrs", consultations: 1240, price: 5000 
},
  { id: 2, name: "Dr. Chukwuemeka Bello", specialty: "Cardiologist", 
rating: 4.8, status: "online", emoji: "👨‍⚕️", tags: ["Heart Health", 
"Hypertension"], experience: "12 yrs", consultations: 890, price: 8500 },
  { id: 3, name: "Dr. Fatima Al-Hassan", specialty: "Pediatrician", 
rating: 4.9, status: "busy", emoji: "👩‍⚕️", tags: ["Child Health", 
"Vaccines"], experience: "10 yrs", consultations: 2100, price: 6000 },
  { id: 4, name: "Dr. James Adewale", specialty: "Dermatologist", rating: 
4.7, status: "online", emoji: "🧑‍⚕️", tags: ["Skin Care", "Cosmetic"], 
experience: "6 yrs", consultations: 654, price: 7000 },
  { id: 5, name: "Dr. Sarah Nwosu", specialty: "Gynecologist", rating: 
5.0, status: "offline", emoji: "👩‍⚕️", tags: ["Women's Health", 
"Prenatal"], experience: "15 yrs", consultations: 3200, price: 9000 },
  { id: 6, name: "Dr. Ibrahim Musa", specialty: "Dentist", rating: 4.6, 
status: "online", emoji: "🦷", tags: ["Dental Care", "Orthodontics"], 
experience: "9 yrs", consultations: 780, price: 5500 },
];

const TRANSACTIONS = [
  { id: 1, name: "Wallet Top-up", type: "credit", amount: 50000, date: 
"Today, 10:32 AM", icon: "💰", bg: "#dcfce7" },
  { id: 2, name: "Dr. Amira Osei - Consult", type: "debit", amount: 5000, 
date: "Today, 9:15 AM", icon: "🏥", bg: "#fee2e2" },
  { id: 3, name: "Lab Test - Full Blood Count", type: "debit", amount: 
12000, date: "Yesterday, 2:00 PM", icon: "🧪", bg: "#eff6ff" },
  { id: 4, name: "Insurance Premium - Feb", type: "debit", amount: 8500, 
date: "Feb 20, 2026", icon: "🛡️", bg: "#fef9c3" },
  { id: 5, name: "Pharmacy - Medications", type: "debit", amount: 3200, 
date: "Feb 18, 2026", icon: "💊", bg: "#f3e8ff" },
  { id: 6, name: "Wallet Top-up", type: "credit", amount: 100000, date: 
"Feb 15, 2026", icon: "💰", bg: "#dcfce7" },
];

const DEPENDENTS = [
  { id: "DEP-2847-A", name: "Chidinma Okafor", relation: "Spouse", sex: 
"Female", age: 32, dob: "1993-07-15", bloodGroup: "O+", genotype: "AA", 
allergies: "Penicillin", weight: "62kg", height: "165cm", emoji: "👩" },
  { id: "DEP-2847-B", name: "Emeka Okafor Jr.", relation: "Son", sex: 
"Male", age: 8, dob: "2017-03-22", bloodGroup: "O+", genotype: "AS", 
allergies: "None", weight: "28kg", height: "125cm", emoji: "👦" },
  { id: "DEP-2847-C", name: "Ada Okafor", relation: "Daughter", sex: 
"Female", age: 5, dob: "2020-11-10", bloodGroup: "A+", genotype: "AA", 
allergies: "Peanuts", weight: "18kg", height: "105cm", emoji: "👧" },
];

const DOCUMENTS = [
  { id: 1, name: "Blood Test Results Feb 2026", type: "lab", icon: "📋", 
size: "1.2 MB", date: "Feb 20, 2026" },
  { id: 2, name: "Dr. Bello Prescription #124", type: "prescription", 
icon: "📄", size: "0.5 MB", date: "Feb 18, 2026" },
  { id: 3, name: "Health Insurance Certificate", type: "insurance", icon: 
"📑", size: "2.1 MB", date: "Jan 1, 2026" },
  { id: 4, name: "Annual Physical Report 2025", type: "report", icon: 
"📊", size: "3.4 MB", date: "Dec 12, 2025" },
  { id: 5, name: "X-Ray Chest Scan", type: "lab", icon: "🩻", size: "8.7 
MB", date: "Nov 5, 2025" },
  { id: 6, name: "Malaria Test Negative", type: "lab", icon: "🔬", size: 
"0.8 MB", date: "Oct 28, 2025" },
];

const APPOINTMENTS = [
  { id: 1, time: "9:00 AM", date: "Feb 24", title: "General Checkup", 
doctor: "Dr. Amira Osei", type: "video", status: "upcoming" },
  { id: 2, time: "2:30 PM", date: "Feb 26", title: "Cardiology Follow-up", 
doctor: "Dr. Chukwuemeka Bello", type: "audio", status: "upcoming" },
  { id: 3, time: "11:00 AM", date: "Mar 1", title: "Dental Cleaning", 
doctor: "Dr. Ibrahim Musa", type: "in-person", status: "scheduled" },
];

const CLAIMS = [
  { id: "CLM-001", service: "General Consultation", doctor: "Dr. Amira 
Osei", date: "Feb 20", amount: "₦5,000", status: "approved" },
  { id: "CLM-002", service: "Full Blood Count", doctor: "Lab Services", 
date: "Feb 18", amount: "₦12,000", status: "pending" },
  { id: "CLM-003", service: "Medications", doctor: "Pharmacy", date: "Feb 
18", amount: "₦3,200", status: "approved" },
  { id: "CLM-004", service: "Cardiology Consult", doctor: "Dr. Bello", 
date: "Jan 30", amount: "₦8,500", status: "rejected" },
];

const CHAT_CONTACTS = [
  { id: 1, name: "Dr. Amira Osei", role: "General Practitioner", emoji: 
"👩‍⚕️", lastMsg: "Your results look great!", time: "10:32 AM", unread: 2, 
online: true },
  { id: 2, name: "Dr. Chukwuemeka Bello", role: "Cardiologist", emoji: 
"👨‍⚕️", lastMsg: "Take your medication as prescribed.", time: "Yesterday", 
unread: 0, online: false },
  { id: 3, name: "Support Team", role: "HealthSave Support", emoji: "🏥", 
lastMsg: "How can we help you today?", time: "Feb 20", unread: 1, online: 
true },
];

const CHAT_MESSAGES = [
  { id: 1, text: "Hello Dr. Amira! I've been feeling some chest tightness 
lately.", sent: true, time: "10:20 AM" },
  { id: 2, text: "Hi! I understand your concern. How long have you been 
experiencing this? Any other symptoms like shortness of breath or 
palpitations?", sent: false, time: "10:22 AM" },
  { id: 3, text: "About 3 days now. Sometimes I feel short of breath too 
especially when climbing stairs.", sent: true, time: "10:24 AM" },
  { id: 4, text: "I see. This could be related to several things. Can you 
upload your latest blood pressure readings if you have them? I'd also 
recommend we do a quick video call so I can assess you better.", sent: 
false, time: "10:26 AM" },
  { id: 5, text: "Sure, let me get that. Should I be worried?", sent: 
true, time: "10:28 AM" },
  { id: 6, text: "Don't worry, we'll get to the bottom of this. Your 
results from last week look great! Let's schedule a call.", sent: false, 
time: "10:32 AM" },
];

// ==================== COMPONENTS ====================

function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ email: "", phone: "", password: "", 
name: "" });

  const handleSubmit = () => {
    if (mode === "register" && step === 1) { setStep(2); return; }
    if (mode === "register" && step === 2) { setStep(3); return; }
    onLogin();
  };

  return (
    <div className="auth-screen">
      <div className="auth-left">
        <div className="auth-logo">
          <div className="auth-logo-icon">💚</div>
          <div className="auth-logo-text">HealthSave</div>
        </div>
        <div className="auth-headline">Your Health,<br /><span>Your 
Savings,</span><br />One Platform.</div>
        <div className="auth-sub">A complete health finance ecosystem — 
save for healthcare, consult doctors instantly, manage your family's 
health records, and claim insurance seamlessly.</div>
        <div className="auth-features">
          {["Health Savings Wallet with smart budgeting","Telemedicine — 
video, audio & chat","Family profile & dependent management","Insurance 
claims & document vault","Wellness tracking & health scoring"].map(f => (
            <div key={f} className="auth-feature">
              <div className="auth-feature-dot" />
              {f}
            </div>
          ))}
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-container">
          {step === 3 ? (
            <div className="verify-screen">
              <div className="verify-icon">📧</div>
              <div className="verify-title">Verify your account</div>
              <div className="verify-sub">We sent a 6-digit code to<br 
/><strong>{form.email || form.phone}</strong><br />Enter it below to 
activate your account.</div>
              <div className="otp-inputs">
                {[0,1,2,3,4,5].map(i => (
                  <input key={i} className="otp-input" maxLength={1} 
type="text" />
                ))}
              </div>
              <button className="btn btn-primary" onClick={onLogin}>Verify 
& Continue ✓</button>
              <p 
style={{marginTop:16,fontSize:13,color:'var(--slate)',textAlign:'center'}}>
                Didn't get it? <span 
style={{color:'var(--teal)',fontWeight:700,cursor:'pointer'}}>Resend 
code</span>
              </p>
            </div>
          ) : (
            <>
              <div className="auth-form-title">{mode === "login" ? 
"Welcome back" : "Create account"}</div>
              <div className="auth-form-sub">{mode === "login" ? "Log in 
to your HealthSave dashboard" : step === 1 ? "Step 1: Personal details" : 
"Step 2: Set your password"}</div>

              <div className="auth-tabs">
                <button className={`auth-tab${mode==="login"?" 
active":""}`} onClick={() => { setMode("login"); setStep(1); }}>Log 
In</button>
                <button className={`auth-tab${mode==="register"?" 
active":""}`} onClick={() => { setMode("register"); setStep(1); 
}}>Register</button>
              </div>

              {mode === "register" && step === 1 && (
                <>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input className="form-input" placeholder="e.g. Emeka 
Okafor" value={form.name} onChange={e => setForm({...form, name: 
e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input className="form-input" type="email" 
placeholder="you@email.com" value={form.email} onChange={e => 
setForm({...form, email: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input className="form-input" type="tel" 
placeholder="+234 8XX XXX XXXX" value={form.phone} onChange={e => 
setForm({...form, phone: e.target.value})} />
                  </div>
                </>
              )}

              {((mode === "register" && step === 2) || mode === "login") 
&& (
                <>
                  {mode === "login" && (
                    <div className="form-group">
                      <label className="form-label">Email or Phone</label>
                      <input className="form-input" 
placeholder="you@email.com or +234..." />
                    </div>
                  )}
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input className="form-input" type="password" 
placeholder="••••••••" />
                  </div>
                  {mode === "register" && (
                    <div className="form-group">
                      <label className="form-label">Confirm 
Password</label>
                      <input className="form-input" type="password" 
placeholder="••••••••" />
                    </div>
                  )}
                  {mode === "login" && (
                    <p 
style={{textAlign:'right',marginBottom:20,fontSize:13}}>
                      <span 
style={{color:'var(--teal)',fontWeight:700,cursor:'pointer'}}>Forgot 
password?</span>
                    </p>
                  )}
                </>
              )}

              <button className="btn btn-primary" onClick={handleSubmit}>
                {mode === "login" ? "Log In →" : step === 1 ? "Continue 
→" : "Create Account →"}
              </button>

              {mode === "login" && (
                <>
                  <div className="divider"><div className="divider-line" 
/><span className="divider-text">or continue with</span><div 
className="divider-line" /></div>
                  <div style={{display:'flex',gap:12}}>
                    <button className="btn btn-outline" 
style={{flex:1,justifyContent:'center'}}>🔵 Google</button>
                    <button className="btn btn-outline" 
style={{flex:1,justifyContent:'center'}}>📘 Facebook</button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Sidebar({ active, onNav, user }) {
  const sections = [
    { label: "", items: [
      { id: "dashboard", icon: "🏠", label: "Dashboard" },
      { id: "wallet", icon: "💳", label: "Wallet & Savings" },
      { id: "transactions", icon: "📊", label: "Transactions" },
    ]},
    { label: "Health", items: [
      { id: "telemedicine", icon: "🩺", label: "Telemedicine", badge: "3" 
},
      { id: "appointments", icon: "📅", label: "Appointments" },
      { id: "chat", icon: "💬", label: "Messages", badge: "3" },
      { id: "documents", icon: "📁", label: "Documents" },
      { id: "wellness", icon: "💪", label: "Wellness" },
    ]},
    { label: "Account", items: [
      { id: "profile", icon: "👤", label: "My Profile" },
      { id: "dependents", icon: "👨‍👩‍👧‍👦", label: "Dependents" },
      { id: "insurance", icon: "🛡️", label: "Insurance & Claims" },
      { id: "settings", icon: "⚙️", label: "Settings" },
    ]},
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">💚</div>
        <div className="sidebar-logo-text">HealthSave</div>
      </div>
      <div className="sidebar-nav">
        {sections.map(sec => (
          <div key={sec.label}>
            {sec.label && <div 
className="sidebar-section-label">{sec.label}</div>}
            {sec.items.map(item => (
              <div key={item.id} className={`nav-item${active === item.id 
? " active" : ""}`} onClick={() => onNav(item.id)}>
                <span className="nav-icon">{item.icon}</span>
                {item.label}
                {item.badge && <span 
className="nav-badge">{item.badge}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">EO</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">Emeka Okafor</div>
            <div className="sidebar-user-role">Principal Member</div>
          </div>
          <span 
style={{color:'rgba(255,255,255,0.4)',fontSize:16}}>›</span>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ onNav }) {
  return (
    <div>
      <div className="topbar">
        <div>
          <div className="page-title">Good morning, Emeka 👋</div>
          <div className="page-sub">Monday, February 23, 2026</div>
        </div>
        <div className="topbar-actions">
          <div className="notification-btn">🔔<div className="notif-dot" 
/></div>
          <button className="btn btn-primary btn-sm" onClick={() => 
onNav('telemedicine')}>+ Book Appointment</button>
        </div>
      </div>

      <div className="stats-grid">
        {[
          { icon: "💰", label: "Wallet Balance", value: "₦237,500", 
change: "+₦50k this month", up: true },
          { icon: "🏥", label: "Total Spent on Health", value: "₦28,700", 
change: "-₦3k vs last month", up: false },
          { icon: "👨‍👩‍👧‍👦", label: "Dependents Covered", value: "3", 
change: "All active", up: true },
          { icon: "📅", label: "Upcoming Appointments", value: "2", 
change: "Next: Feb 24", up: true },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className={`stat-change ${s.up ? 'up' : 'down'}`}>{s.up ? 
'↑' : '↓'} {s.change}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div>
          <div className="wallet-card" style={{marginBottom:24}}>
            <div className="wallet-label">Health Savings Wallet</div>
            <div className="wallet-amount">₦237,500.00</div>
            <div className="wallet-id">HSW • 2847 • 0026 • PRIN</div>
            <div className="wallet-chip">
              <div className="wallet-chip-item">🛡️ Insurance Active</div>
              <div className="wallet-chip-item">✅ 3 Dependents</div>
            </div>
            <div className="wallet-actions">
              <button className="wallet-btn wallet-btn-primary">+ Fund 
Wallet</button>
              <button className="wallet-btn wallet-btn-outline">📤 
Transfer</button>
              <button className="wallet-btn wallet-btn-outline">📋 
Statement</button>
            </div>
          </div>

          <div className="card" style={{marginBottom:24}}>
            <div 
style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
              <div className="card-title">Recent Transactions</div>
              <button className="btn btn-ghost btn-sm" onClick={() => 
onNav('transactions')}>View all →</button>
            </div>
            <div className="txn-list">
              {TRANSACTIONS.slice(0,4).map(t => (
                <div key={t.id} className="txn-item">
                  <div className="txn-icon" 
style={{background:t.bg}}>{t.icon}</div>
                  <div className="txn-info">
                    <div className="txn-name">{t.name}</div>
                    <div className="txn-date">{t.date}</div>
                  </div>
                  <div className={`txn-amount 
${t.type}`}>{t.type==='credit'?'+':'-'}₦{t.amount.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="health-score-card" style={{marginBottom:20}}>
            <div className="health-score-header">
              <div>
                <div className="card-title">Health Score</div>
                <div className="card-sub">Based on activity & 
records</div>
              </div>
              <div className="health-score-value">82</div>
            </div>
            <div className="health-score-bar">
              <div className="health-score-fill" style={{width:'82%'}} />
            </div>
            <div 
style={{marginTop:12,fontSize:13,color:'var(--success)',fontWeight:600}}>↑ 
Good health habits detected</div>
          </div>

          <div className="card" style={{marginBottom:20}}>
            <div className="card-title" style={{marginBottom:16}}>Quick 
Actions</div>
            <div className="quick-actions">
              <div className="quick-action" onClick={() => 
onNav('telemedicine')}>
                <div className="quick-action-icon">🩺</div>
                <div className="quick-action-label">See a Doctor</div>
              </div>
              <div className="quick-action" onClick={() => 
onNav('wallet')}>
                <div className="quick-action-icon">💰</div>
                <div className="quick-action-label">Fund Wallet</div>
              </div>
              <div className="quick-action" onClick={() => 
onNav('dependents')}>
                <div className="quick-action-icon">👨‍👩‍👧</div>
                <div className="quick-action-label">Dependents</div>
              </div>
              <div className="quick-action" onClick={() => 
onNav('documents')}>
                <div className="quick-action-icon">📁</div>
                <div className="quick-action-label">Documents</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-title" style={{marginBottom:16}}>Upcoming 
Appointments</div>
            <div className="schedule-list">
              {APPOINTMENTS.slice(0,2).map(a => (
                <div key={a.id} className="appt-item" 
style={{padding:'12px 14px'}}>
                  <div className="appt-time">
                    <div className="appt-time-val" 
style={{fontSize:14}}>{a.time}</div>
                    <div className="appt-time-date">{a.date}</div>
                  </div>
                  <div className="appt-divider" />
                  <div className="appt-info">
                    <div className="appt-title" 
style={{fontSize:13}}>{a.title}</div>
                    <div className="appt-doctor">{a.doctor}</div>
                  </div>
                  <span 
style={{fontSize:18}}>{a.type==='video'?'🎥':'🎙️'}</span>
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
  const [tab, setTab] = useState("overview");
  const [showFund, setShowFund] = useState(false);

  return (
    <div>
      <div className="topbar">
        <div>
          <div className="page-title">Wallet & Savings</div>
          <div className="page-sub">Manage your health savings</div>
        </div>
        <button className="btn btn-primary" onClick={() => 
setShowFund(true)}>+ Fund Wallet</button>
      </div>

      <div className="wallet-card" style={{marginBottom:28}}>
        <div className="wallet-label">Total Balance</div>
        <div className="wallet-amount">₦237,500.00</div>
        <div className="wallet-id">Account No: 2847 0026 0001 | HSW</div>
        <div className="wallet-chip" style={{marginTop:16}}>
          <div className="wallet-chip-item">🏥 Health Reserve: 
₦50,000</div>
          <div className="wallet-chip-item">📈 Savings Target: 
₦500,000</div>
        </div>
        <div className="wallet-actions">
          <button className="wallet-btn wallet-btn-primary" onClick={() => 
setShowFund(true)}>💰 Fund</button>
          <button className="wallet-btn wallet-btn-outline">📤 
Transfer</button>
          <button className="wallet-btn wallet-btn-outline">📋 
Statement</button>
          <button className="wallet-btn wallet-btn-outline">🔒 Lock 
Savings</button>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 
1fr',gap:20,marginBottom:28}}>
        {[
          {label:"Monthly 
Budget",value:"₦30,000",used:"₦28,700",pct:96,color:"var(--danger)"},
          {label:"Savings 
Goal",value:"₦500,000",used:"₦237,500",pct:48,color:"var(--teal)"},
          {label:"Insurance 
Reserve",value:"₦50,000",used:"₦50,000",pct:100,color:"var(--success)"},
        ].map(b => (
          <div key={b.label} className="card">
            <div className="card-title">{b.label}</div>
            <div 
style={{fontSize:22,fontWeight:800,fontFamily:"'Syne',sans-serif",margin:'10px 
0',color:'var(--navy)'}}>{b.used}</div>
            <div 
style={{fontSize:13,color:'var(--slate)',marginBottom:8}}>of 
{b.value}</div>
            <div 
style={{height:8,background:'#f1f5f9',borderRadius:4,overflow:'hidden'}}>
              <div 
style={{height:'100%',borderRadius:4,background:b.color,width:`${Math.min(b.pct,100)}%`}} 
/>
            </div>
            <div 
style={{fontSize:12,color:b.color,fontWeight:700,marginTop:6}}>{b.pct}% 
used</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-title" style={{marginBottom:20}}>Transaction 
History</div>
        <div className="txn-list">
          {TRANSACTIONS.map(t => (
            <div key={t.id} className="txn-item">
              <div className="txn-icon" 
style={{background:t.bg}}>{t.icon}</div>
              <div className="txn-info">
                <div className="txn-name">{t.name}</div>
                <div className="txn-date">{t.date}</div>
              </div>
              <div className={`txn-amount 
${t.type}`}>{t.type==='credit'?'+':'-'}₦{t.amount.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>

      {showFund && (
        <div className="modal-overlay" onClick={() => setShowFund(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Fund Wallet</div>
              <button className="modal-close" onClick={() => 
setShowFund(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Amount (₦)</label>
                <input className="form-input" placeholder="e.g. 50000" 
type="number" />
              </div>
              <div className="form-group">
                <label className="form-label">Payment Method</label>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 
1fr',gap:10,marginTop:8}}>
                  {["💳 Card","🏦 Bank Transfer","📱 USSD"].map(m => (
                    <div key={m} style={{border:'2px solid 
#e2e8f0',borderRadius:12,padding:14,textAlign:'center',cursor:'pointer',fontSize:14,fontWeight:600,color:'var(--navy)',transition:'all 
0.2s'}}
                      
onMouseEnter={e=>{e.target.style.borderColor='var(--teal)';e.target.style.background='var(--teal-pale)'}}
                      
onMouseLeave={e=>{e.target.style.borderColor='#e2e8f0';e.target.style.background='white'}}>
                      {m}
                    </div>
                  ))}
                </div>
              </div>
              <button className="btn btn-primary" 
style={{marginTop:8}}>Proceed to Pay →</button>
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

  const filtered = filter === "all" ? DOCTORS : DOCTORS.filter(d => 
d.status === filter);

  const timeSlots = ["8:00 AM","8:30 AM","9:00 AM","9:30 AM","10:00 
AM","10:30 AM","11:00 AM","11:30 AM","2:00 PM","2:30 PM","3:00 PM","3:30 
PM"];

  return (
    <div>
      <div className="topbar">
        <div>
          <div className="page-title">Telemedicine</div>
          <div className="page-sub">Consult with qualified doctors from 
anywhere</div>
        </div>
        <div style={{display:'flex',gap:8}}>
          {["all","online","busy"].map(f => (
            <button key={f} className={`btn btn-sm 
${filter===f?'btn-primary':'btn-outline'}`} onClick={() => setFilter(f)}>
              {f==="online"?"🟢 Online":f==="busy"?"🟡 Busy":"All 
Doctors"}
            </button>
          ))}
        </div>
      </div>

      <div 
style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginBottom:24}}>
        {[{icon:"👩‍⚕️",label:"Online 
Now",value:DOCTORS.filter(d=>d.status==="online").length,color:"var(--success)"},
          {icon:"⏱️",label:"Avg. Wait Time",value:"< 5 
min",color:"var(--teal)"},
          
{icon:"💊",label:"Specialties",value:"12+",color:"var(--gold)"}].map(s => 
(
          <div key={s.label} className="card" 
style={{display:'flex',alignItems:'center',gap:16,padding:20}}>
            <span style={{fontSize:32}}>{s.icon}</span>
            <div>
              <div 
style={{fontSize:22,fontWeight:800,fontFamily:"'Syne',sans-serif",color:s.color}}>{s.value}</div>
              <div 
style={{fontSize:13,color:'var(--slate)'}}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="doctors-grid">
        {filtered.map(doc => (
          <div key={doc.id} className="doctor-card">
            <div className="doctor-header">
              <div className="doctor-avatar" 
style={{background:'var(--teal-pale)'}}>{doc.emoji}</div>
              <div>
                <div className="doctor-name">{doc.name}</div>
                <div className="doctor-specialty">{doc.specialty}</div>
                <div className="doctor-rating">⭐ {doc.rating} <span 
style={{color:'var(--slate)',fontWeight:400}}>({doc.consultations} 
consults)</span></div>
              </div>
            </div>
            <div className="doctor-status">
              <div className={`status-dot ${doc.status}`} />
              <span 
style={{color:doc.status==='online'?'var(--success)':doc.status==='busy'?'var(--gold)':'var(--slate-light)',textTransform:'capitalize'}}>{doc.status}</span>
              <span 
style={{marginLeft:'auto',color:'var(--slate)',fontSize:12}}>Exp: 
{doc.experience}</span>
            </div>
            <div className="doctor-tags">
              {doc.tags.map(t => <span key={t} 
className="doctor-tag">{t}</span>)}
            </div>
            <div 
style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
              <span 
style={{fontSize:16,fontWeight:800,fontFamily:"'Syne',sans-serif",color:'var(--navy)'}}>₦{doc.price.toLocaleString()}</span>
              <span style={{fontSize:12,color:'var(--slate)'}}>per 
session</span>
            </div>
            <div className="doctor-call-actions">
              <button className="call-btn call-btn-video" title="Video 
Call" onClick={() => setSelectedDoctor({...doc, 
mode:"video"})}>🎥</button>
              <button className="call-btn call-btn-audio" title="Audio 
Call" onClick={() => setSelectedDoctor({...doc, 
mode:"audio"})}>🎙️</button>
              <button className="call-btn call-btn-chat" title="Chat" 
onClick={() => setSelectedDoctor({...doc, mode:"schedule"})}>📅</button>
            </div>
            <button className="btn btn-outline btn-sm" 
style={{width:'100%',marginTop:8}} onClick={() => { 
setSelectedDoctor({...doc,mode:"schedule"}); setScheduleStep(1); }}>
              Schedule Appointment
            </button>
          </div>
        ))}
      </div>

      {selectedDoctor && (
        <div className="modal-overlay" onClick={() => 
setSelectedDoctor(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                {selectedDoctor.mode==="video"?"📹 Video 
Call":selectedDoctor.mode==="audio"?"🎙️ Audio Call":"📅 Schedule 
Appointment"}
              </div>
              <button className="modal-close" onClick={() => 
setSelectedDoctor(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div 
style={{display:'flex',gap:16,alignItems:'center',padding:'16px',background:'var(--bg)',borderRadius:14,marginBottom:24}}>
                <span style={{fontSize:40}}>{selectedDoctor.emoji}</span>
                <div>
                  <div 
style={{fontWeight:700,fontSize:17,color:'var(--navy)'}}>{selectedDoctor.name}</div>
                  <div 
style={{color:'var(--teal)',fontSize:14,fontWeight:600}}>{selectedDoctor.specialty}</div>
                  <div 
style={{color:'var(--slate)',fontSize:13,marginTop:4}}>Consultation fee: 
<strong 
style={{color:'var(--navy)'}}>₦{selectedDoctor.price.toLocaleString()}</strong></div>
                </div>
              </div>

              
{(selectedDoctor.mode==="video"||selectedDoctor.mode==="audio") ? (
                <div style={{textAlign:'center'}}>
                  <div 
style={{fontSize:80,marginBottom:16}}>{selectedDoctor.mode==="video"?"🎥":"🎙️"}</div>
                  <div 
style={{fontSize:18,fontWeight:800,color:'var(--navy)',marginBottom:8}}>Start 
{selectedDoctor.mode==="video"?"Video":"Audio"} Consultation</div>
                  <div 
style={{color:'var(--slate)',fontSize:14,marginBottom:24,lineHeight:1.7}}>Your 
wallet will be charged ₦{selectedDoctor.price.toLocaleString()} upon 
connection.<br/>Estimated wait: &lt; 5 minutes.</div>
                  <button className="btn btn-primary" 
style={{width:'100%',background:selectedDoctor.mode==="video"?"var(--teal)":"var(--success)"}}>
                    {selectedDoctor.mode==="video"?"🎥 Start Video 
Call":"🎙️ Start Audio Call"}
                  </button>
                  <button className="btn btn-outline" 
style={{width:'100%',marginTop:10}} onClick={() => { 
setSelectedDoctor({...selectedDoctor,mode:"schedule"}); }}>
                    Or Schedule for Later
                  </button>
                </div>
              ) : (
                <>
                  {scheduleStep === 1 && (
                    <>
                      <div className="form-group">
                        <label className="form-label">Select Date</label>
                        <input className="form-input" type="date" 
defaultValue="2026-02-24" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Select Time</label>
                        <div className="time-slots">
                          {timeSlots.map(t => (
                            <div key={t} className={`time-slot 
${selectedTime===t?"selected":""}`} onClick={() => 
setSelectedTime(t)}>{t}</div>
                          ))}
                        </div>
                      </div>
                      <button className="btn btn-primary" 
style={{marginTop:8}} onClick={() => setScheduleStep(2)}>Continue 
→</button>
                    </>
                  )}
                  {scheduleStep === 2 && (
                    <>
                      <div className="form-group">
                        <label className="form-label">Consultation 
Type</label>
                        <div 
style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10}}>
                          {["🎥 Video","🎙️ Audio","💬 Chat"].map(m => (
                            <div key={m} style={{border:'2px solid 
#e2e8f0',borderRadius:12,padding:14,textAlign:'center',cursor:'pointer',fontSize:14,fontWeight:600,color:'var(--navy)'}}>
                              {m}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Reason for 
Visit</label>
                        <textarea className="form-input" rows={3} 
placeholder="Describe your symptoms or reason..." style={{resize:'none'}} 
/>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Book For</label>
                        <select className="form-select">
                          <option>Myself - Emeka Okafor</option>
                          {DEPENDENTS.map(d => <option key={d.id}>{d.name} 
({d.relation})</option>)}
                        </select>
                      </div>
                      <div 
style={{background:'var(--teal-pale)',borderRadius:14,padding:16,marginBottom:20}}>
                        <div 
style={{fontWeight:700,color:'var(--navy)',marginBottom:8}}>Booking 
Summary</div>
                        <div 
style={{fontSize:13,color:'var(--navy-light)',lineHeight:1.8}}>
                          📅 {selectedTime || "9:00 AM"}, February 24, 
2026<br />
                          👩‍⚕️ {selectedDoctor.name}<br />
                          💰 ₦{selectedDoctor.price.toLocaleString()} will 
be deducted from wallet
                        </div>
                      </div>
                      <div style={{display:'flex',gap:10}}>
                        <button className="btn btn-outline btn-sm" 
onClick={() => setScheduleStep(1)}>← Back</button>
                        <button className="btn btn-primary" 
style={{flex:1}} onClick={() => setSelectedDoctor(null)}>✓ Confirm 
Booking</button>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProfilePage() {
  const [editing, setEditing] = useState(false);

  return (
    <div>
      <div className="topbar">
        <div>
          <div className="page-title">My Profile</div>
          <div className="page-sub">Principal Member — Manage your health 
identity</div>
        </div>
        <button className="btn btn-primary" onClick={() => 
setEditing(!editing)}>
          {editing ? "✓ Save Changes" : "✏️ Edit Profile"}
        </button>
      </div>

      <div className="profile-header">
        <div style={{position:'relative'}}>
          <div className="profile-avatar-large">EO</div>
          {editing && (
            <div 
style={{position:'absolute',bottom:0,right:0,width:28,height:28,background:'var(--teal)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',fontSize:14}}>📷</div>
          )}
        </div>
        <div className="profile-id-card">
          <div 
style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
            <div>
              <div className="profile-name">Emeka Okafor</div>
              <div className="profile-id">ID: PRI-2847-0026 | Member since 
Jan 2025</div>
              <div className="profile-tags">
                <span className="profile-tag">Principal Member</span>
                <span className="profile-tag">Gold Plan</span>
                <span className="profile-tag" 
style={{background:'#dcfce7',color:'var(--success)'}}>Active</span>
              </div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:12,color:'var(--slate)'}}>Health 
Score</div>
              <div 
style={{fontSize:28,fontWeight:800,fontFamily:"'Syne',sans-serif",color:'var(--success)'}}>82</div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-grid">
        <div className="card">
          <div className="card-title" style={{marginBottom:20}}>Personal 
Information</div>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input className="form-input" defaultValue="Emeka" 
disabled={!editing} />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input className="form-input" defaultValue="Okafor" 
disabled={!editing} />
            </div>
            <div className="form-group">
              <label className="form-label">Date of Birth</label>
              <input className="form-input" type="date" 
defaultValue="1989-05-14" disabled={!editing} />
            </div>
            <div className="form-group">
              <label className="form-label">Sex</label>
              <select className="form-select" disabled={!editing}>
                <option>Male</option><option>Female</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input className="form-input" defaultValue="+234 803 456 
7890" disabled={!editing} />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" 
defaultValue="emeka.okafor@email.com" disabled={!editing} />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-title" style={{marginBottom:20}}>Medical 
Information</div>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Blood Group</label>
              <select className="form-select" disabled={!editing}>
                {["A+","A-","B+","B-","O+","O-","AB+","AB-"].map(b => 
<option key={b} selected={b==="O+"}>{b}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Genotype</label>
              <select className="form-select" disabled={!editing}>
                {["AA","AS","SS","AC","SC"].map(g => <option key={g} 
selected={g==="AS"}>{g}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Height</label>
              <input className="form-input" defaultValue="175cm" 
disabled={!editing} />
            </div>
            <div className="form-group">
              <label className="form-label">Weight</label>
              <input className="form-input" defaultValue="78kg" 
disabled={!editing} />
            </div>
            <div className="form-group" style={{gridColumn:'1/-1'}}>
              <label className="form-label">Known Allergies</label>
              <input className="form-input" defaultValue="None known" 
disabled={!editing} />
            </div>
            <div className="form-group" style={{gridColumn:'1/-1'}}>
              <label className="form-label">Chronic Conditions</label>
              <input className="form-input" defaultValue="None" 
disabled={!editing} />
            </div>
            <div className="form-group" style={{gridColumn:'1/-1'}}>
              <label className="form-label">Current Medications</label>
              <input className="form-input" defaultValue="None" 
disabled={!editing} />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title" style={{marginBottom:20}}>Emergency 
Contact & Next of Kin</div>
        <div 
style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16}}>
          {[
            {label:"Full Name",value:"Mrs. Grace Okafor"},
            {label:"Relationship",value:"Spouse"},
            {label:"Phone Number",value:"+234 805 123 4567"},
          ].map(f => (
            <div key={f.label} className="form-group">
              <label className="form-label">{f.label}</label>
              <input className="form-input" defaultValue={f.value} 
disabled={!editing} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DependentsPage() {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div>
      <div className="topbar">
        <div>
          <div className="page-title">Dependents</div>
          <div className="page-sub">Manage family members under your 
plan</div>
        </div>
        <button className="btn btn-primary" onClick={() => 
setShowAdd(true)}>+ Add Dependent</button>
      </div>

      <div 
style={{background:'linear-gradient(135deg,var(--teal-pale),#ecfdf5)',borderRadius:20,padding:20,marginBottom:28,display:'flex',gap:20,alignItems:'center'}}>
        <span style={{fontSize:40}}>👨‍👩‍👧‍👦</span>
        <div>
          <div style={{fontWeight:800,fontSize:18,color:'var(--navy)'}}>3 
of 5 slots used</div>
          <div style={{color:'var(--slate)',fontSize:14,marginTop:4}}>Your 
Gold Plan allows up to 5 dependents. 2 slots remaining.</div>
        </div>
        <div style={{marginLeft:'auto'}}>
          <div style={{display:'flex',gap:6}}>
            {[1,2,3,4,5].map(i => (
              <div key={i} 
style={{width:20,height:20,borderRadius:6,background:i<=3?'var(--teal)':'#e2e8f0'}} 
/>
            ))}
          </div>
        </div>
      </div>

      <div className="dependents-grid">
        {DEPENDENTS.map(dep => (
          <div key={dep.id} className="dependent-card">
            <div className="dependent-avatar">{dep.emoji}</div>
            <div className="dependent-name">{dep.name}</div>
            <div className="dependent-id">{dep.id}</div>
            <span className="badge badge-info" 
style={{marginTop:6}}>{dep.relation}</span>
            <div className="dependent-meta">
              <div className="dependent-meta-item"><div 
className="dependent-meta-label">Age</div><div 
className="dependent-meta-value">{dep.age} yrs</div></div>
              <div className="dependent-meta-item"><div 
className="dependent-meta-label">Sex</div><div 
className="dependent-meta-value">{dep.sex}</div></div>
              <div className="dependent-meta-item"><div 
className="dependent-meta-label">Blood Group</div><div 
className="dependent-meta-value">{dep.bloodGroup}</div></div>
              <div className="dependent-meta-item"><div 
className="dependent-meta-label">Genotype</div><div 
className="dependent-meta-value">{dep.genotype}</div></div>
              <div className="dependent-meta-item"><div 
className="dependent-meta-label">Weight</div><div 
className="dependent-meta-value">{dep.weight}</div></div>
              <div className="dependent-meta-item"><div 
className="dependent-meta-label">Height</div><div 
className="dependent-meta-value">{dep.height}</div></div>
            </div>
            {dep.allergies !== "None" && (
              <div style={{marginTop:10,padding:'6px 
10px',background:'#fee2e2',borderRadius:8,fontSize:12,color:'var(--danger)',fontWeight:600}}>
                ⚠️ Allergy: {dep.allergies}
              </div>
            )}
            <div className="dependent-actions">
              <button className="btn btn-outline btn-sm" 
style={{flex:1}}>✏️ Edit</button>
              <button className="btn btn-sm" 
style={{background:'var(--teal-pale)',color:'var(--teal)',flex:1}}>🩺 
Book</button>
            </div>
          </div>
        ))}
        
        <div style={{border:'2px dashed 
#cbd5e1',borderRadius:20,padding:32,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',cursor:'pointer',minHeight:200,transition:'all 
0.2s'}}
          onClick={() => setShowAdd(true)}
          
onMouseEnter={e=>e.currentTarget.style.borderColor='var(--teal)'}
          onMouseLeave={e=>e.currentTarget.style.borderColor='#cbd5e1'}>
          <span style={{fontSize:40,marginBottom:12}}>➕</span>
          <div style={{fontWeight:700,color:'var(--navy)'}}>Add 
Dependent</div>
          <div style={{fontSize:13,color:'var(--slate)',marginTop:4}}>2 
slots remaining</div>
        </div>
      </div>

      {showAdd && (
        <div className="modal-overlay" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Add New Dependent</div>
              <button className="modal-close" onClick={() => 
setShowAdd(false)}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input className="form-input" placeholder="First name" 
/>
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input className="form-input" placeholder="Last name" />
                </div>
                <div className="form-group">
                  <label className="form-label">Relationship</label>
                  <select className="form-select">
                    
<option>Spouse</option><option>Son</option><option>Daughter</option>
                    
<option>Parent</option><option>Sibling</option><option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Sex</label>
                  <select 
className="form-select"><option>Male</option><option>Female</option></select>
                </div>
                <div className="form-group">
                  <label className="form-label">Date of Birth</label>
                  <input className="form-input" type="date" />
                </div>
                <div className="form-group">
                  <label className="form-label">Blood Group</label>
                  <select 
className="form-select">{["A+","A-","B+","B-","O+","O-","AB+","AB-"].map(b 
=> <option key={b}>{b}</option>)}</select>
                </div>
                <div className="form-group">
                  <label className="form-label">Genotype</label>
                  <select 
className="form-select">{["AA","AS","SS","AC","SC"].map(g => <option 
key={g}>{g}</option>)}</select>
                </div>
                <div className="form-group">
                  <label className="form-label">Weight (kg)</label>
                  <input className="form-input" placeholder="e.g. 65" />
                </div>
                <div className="form-group">
                  <label className="form-label">Height (cm)</label>
                  <input className="form-input" placeholder="e.g. 170" />
                </div>
                <div className="form-group">
                  <label className="form-label">Known Allergies</label>
                  <input className="form-input" placeholder="e.g. 
Penicillin or None" />
                </div>
                <div className="form-group" style={{gridColumn:'1/-1'}}>
                  <label className="form-label">Chronic Conditions (if 
any)</label>
                  <input className="form-input" placeholder="e.g. Asthma 
or None" />
                </div>
                <div className="form-group" style={{gridColumn:'1/-1'}}>
                  <label className="form-label">Current 
Medications</label>
                  <input className="form-input" placeholder="e.g. 
Salbutamol or None" />
                </div>
              </div>
              <div 
style={{background:'var(--teal-pale)',borderRadius:12,padding:14,marginBottom:20,fontSize:13,color:'var(--teal-dark)'}}>
                ℹ️ A unique Dependent ID will be auto-generated and linked 
to your principal account.
              </div>
              <div style={{display:'flex',gap:10}}>
                <button className="btn btn-outline" style={{flex:1}} 
onClick={() => setShowAdd(false)}>Cancel</button>
                <button className="btn btn-primary" style={{flex:2}}>✓ 
Add Dependent</button>
              </div>
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
    setMessages([...messages, { id: Date.now(), text: msg, sent: true, 
time: "Now" }]);
    setMsg("");
  };

  return (
    <div>
      <div className="topbar">
        <div>
          <div className="page-title">Messages</div>
          <div className="page-sub">Chat with your doctors and support 
team</div>
        </div>
      </div>

      <div className="chat-layout" style={{height:'calc(100vh - 160px)'}}>
        <div className="chat-sidebar">
          <div className="chat-sidebar-header">
            <input className="chat-search" placeholder="🔍 Search 
conversations..." />
          </div>
          {CHAT_CONTACTS.map((c, i) => (
            <div key={c.id} className={`chat-contact 
${active===i?"active":""}`} onClick={() => setActive(i)}>
              <div style={{position:'relative'}}>
                <div className="chat-contact-avatar">{c.emoji}</div>
                {c.online && <div 
style={{position:'absolute',bottom:2,right:2,width:10,height:10,background:'var(--success)',borderRadius:'50%',border:'2px 
solid white'}} />}
              </div>
              <div className="chat-contact-info">
                <div 
style={{display:'flex',justifyContent:'space-between'}}>
                  <div className="chat-contact-name">{c.name}</div>
                  <div className="chat-contact-time">{c.time}</div>
                </div>
                <div 
style={{display:'flex',justifyContent:'space-between',marginTop:2}}>
                  <div className="chat-contact-last">{c.lastMsg}</div>
                  {c.unread > 0 && <span 
className="chat-unread">{c.unread}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="chat-main">
          <div className="chat-header">
            <div 
style={{width:44,height:44,borderRadius:12,background:'var(--bg)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22}}>{CHAT_CONTACTS[active].emoji}</div>
            <div>
              <div 
style={{fontWeight:700,fontSize:15,color:'var(--navy)'}}>{CHAT_CONTACTS[active].name}</div>
              <div 
style={{fontSize:12,color:CHAT_CONTACTS[active].online?'var(--success)':'var(--slate)'}}>{CHAT_CONTACTS[active].online?"● 
Online":"● Offline"}</div>
            </div>
            <div className="chat-header-actions">
              <button className="chat-action-btn">🎥</button>
              <button className="chat-action-btn">🎙️</button>
              <button className="chat-action-btn">📎</button>
              <button className="chat-action-btn">ℹ️</button>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map(m => (
              <div key={m.id} className={`chat-msg 
${m.sent?"sent":"received"}`}>
                <div className={`chat-bubble 
${m.sent?"sent":"received"}`}>{m.text}</div>
                <div className={`chat-time 
${m.sent?"sent":""}`}>{m.time}</div>
              </div>
            ))}
          </div>

          <div className="chat-input-area">
            <button className="chat-attach">📎</button>
            <button className="chat-attach">🎤</button>
            <input className="chat-input" placeholder="Type a message..." 
value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => 
e.key==="Enter" && send()} />
            <button className="btn btn-primary btn-sm" onClick={send} 
style={{padding:'10px 16px'}}>Send ➤</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DocumentsPage() {
  return (
    <div>
      <div className="topbar">
        <div>
          <div className="page-title">Health Documents</div>
          <div className="page-sub">Upload and manage your medical 
records</div>
        </div>
        <button className="btn btn-primary">+ Upload Document</button>
      </div>

      <div className="upload-zone">
        <div className="upload-icon">📤</div>
        <div className="upload-text">Drag & drop files here or click to 
browse</div>
        <div className="upload-sub">Supports PDF, JPG, PNG, DICOM • Max 
50MB per file</div>
      </div>

      <div style={{display:'flex',gap:8,marginBottom:20}}>
        {["All","Lab 
Results","Prescriptions","Insurance","Reports","Scans"].map(f => (
          <button key={f} className={`btn btn-sm 
${f==="All"?"btn-primary":"btn-outline"}`}>{f}</button>
        ))}
      </div>

      <div className="documents-grid">
        {DOCUMENTS.map(doc => (
          <div key={doc.id} className="doc-card">
            <div className="doc-icon">{doc.icon}</div>
            <div className="doc-name">{doc.name}</div>
            <div className="doc-meta">{doc.size} • {doc.date}</div>
            <span className={`doc-tag 
${doc.type}`}>{doc.type.replace(/_/g," ")}</span>
            <div style={{display:'flex',gap:6,marginTop:12}}>
              <button className="btn btn-outline btn-sm" 
style={{flex:1,padding:'6px 8px'}}>👁️</button>
              <button className="btn btn-outline btn-sm" 
style={{flex:1,padding:'6px 8px'}}>⬇️</button>
              <button className="btn btn-sm" style={{flex:1,padding:'6px 
8px',background:'#fee2e2',color:'var(--danger)',border:'none'}}>🗑️</button>
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
      <div className="topbar">
        <div><div className="page-title">Appointments</div><div 
className="page-sub">Your scheduled and past consultations</div></div>
        <button className="btn btn-primary">+ Book New</button>
      </div>
      <div className="tab-bar" style={{marginBottom:24}}>
        {["Upcoming","Completed","Cancelled"].map((t,i) => (
          <button key={t} className={`tab-btn${i===0?" 
active":""}`}>{t}</button>
        ))}
      </div>
      <div className="schedule-list">
        {APPOINTMENTS.map(a => (
          <div key={a.id} className="appt-item">
            <div className="appt-time">
              <div className="appt-time-val">{a.time}</div>
              <div className="appt-time-date">{a.date}</div>
            </div>
            <div className="appt-divider" />
            <div className="appt-info">
              <div className="appt-title">{a.title}</div>
              <div className="appt-doctor">{a.doctor}</div>
            </div>
            <span className="badge badge-info">{a.type==="video"?"🎥 
Video":a.type==="audio"?"🎙️ Audio":"🏥 In-Person"}</span>
            <div className="appt-actions">
              <button className="btn btn-primary btn-sm">Join</button>
              <button className="btn btn-outline 
btn-sm">Reschedule</button>
              <button className="btn btn-sm" 
style={{background:'#fee2e2',color:'var(--danger)',border:'none'}}>Cancel</button>
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
      <div className="topbar">
        <div><div className="page-title">Wellness Tracker</div><div 
className="page-sub">Monitor your health metrics and goals</div></div>
        <button className="btn btn-primary">+ Log Reading</button>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 
1fr',gap:24,marginBottom:24}}>
        <div className="health-score-card">
          <div className="health-score-header">
            <div><div className="card-title">Overall Health 
Score</div><div className="card-sub">Updated weekly based on 
activity</div></div>
            <div className="health-score-value">82</div>
          </div>
          <div className="health-score-bar"><div 
className="health-score-fill" style={{width:'82%'}} /></div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 
1fr',gap:12,marginTop:16}}>
            
{[{label:"BMI",value:"25.5",ok:true},{label:"BP",value:"120/80",ok:true},{label:"Sugar",value:"98 
mg/dL",ok:true}].map(m => (
              <div key={m.label} 
style={{textAlign:'center',background:'rgba(255,255,255,0.6)',borderRadius:10,padding:10}}>
                <div 
style={{fontSize:11,color:'var(--slate)',fontWeight:700,textTransform:'uppercase'}}>{m.label}</div>
                <div 
style={{fontSize:15,fontWeight:800,color:'var(--navy)',marginTop:4}}>{m.value}</div>
                <div 
style={{fontSize:12,color:m.ok?'var(--success)':'var(--danger)'}}>{m.ok?"Normal":"High"}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title" style={{marginBottom:16}}>Today's 
Goals</div>
          {[
            
{label:"Steps",target:10000,current:7234,unit:"steps",color:"var(--teal)"},
            {label:"Water 
Intake",target:8,current:5,unit:"glasses",color:"#3b82f6"},
            {label:"Sleep",target:8,current:7,unit:"hrs",color:"#8b5cf6"},
            {label:"Active 
Minutes",target:30,current:22,unit:"mins",color:"var(--gold)"},
          ].map(g => (
            <div key={g.label} style={{marginBottom:14}}>
              <div 
style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                <span 
style={{fontSize:13,fontWeight:600,color:'var(--navy)'}}>{g.label}</span>
                <span 
style={{fontSize:13,color:'var(--slate)'}}>{g.current}/{g.target} 
{g.unit}</span>
              </div>
              <div 
style={{height:6,background:'#f1f5f9',borderRadius:3,overflow:'hidden'}}>
                <div 
style={{height:'100%',background:g.color,borderRadius:3,width:`${Math.min(g.current/g.target*100,100)}%`}} 
/>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div 
style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16}}>
        {[
          {icon:"❤️",label:"Heart 
Rate",value:"72",unit:"bpm",trend:"stable",color:"#fee2e2"},
          {icon:"🩸",label:"Blood 
Pressure",value:"120/80",unit:"mmHg",trend:"normal",color:"#dcfce7"},
          {icon:"🧪",label:"Blood 
Sugar",value:"98",unit:"mg/dL",trend:"normal",color:"#eff6ff"},
          
{icon:"🌡️",label:"Temperature",value:"36.7",unit:"°C",trend:"normal",color:"#fef9c3"},
        ].map(m => (
          <div key={m.label} className="card">
            <div style={{fontSize:28,marginBottom:8}}>{m.icon}</div>
            <div 
style={{fontSize:24,fontWeight:800,fontFamily:"'Syne',sans-serif",color:'var(--navy)'}}>{m.value}</div>
            <div style={{fontSize:12,color:'var(--slate)'}}>{m.unit}</div>
            <div 
style={{fontSize:12,color:'var(--navy)',marginTop:4}}>{m.label}</div>
            <span className="badge badge-success" 
style={{marginTop:8}}>{m.trend}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InsurancePage() {
  return (
    <div>
      <div className="topbar">
        <div><div className="page-title">Insurance & Claims</div><div 
className="page-sub">Manage your health coverage and claims</div></div>
        <button className="btn btn-primary">+ File Claim</button>
      </div>

      <div className="insurance-card">
        <div 
style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
          <div>
            <div 
style={{fontSize:12,opacity:0.6,letterSpacing:1,marginBottom:4}}>HEALTH 
INSURANCE</div>
            <div className="insurance-plan">Gold Health Shield Plan</div>
            <div className="insurance-id">POL-HS-2847-2026 | Expires Dec 
31, 2026</div>
          </div>
          <span style={{background:'rgba(255,255,255,0.15)',padding:'6px 
14px',borderRadius:20,fontSize:13,fontWeight:700}}>✓ Active</span>
        </div>
        <div className="insurance-meta">
          <div className="insurance-meta-item">
            <div className="insurance-meta-label">Annual Coverage</div>
            <div className="insurance-meta-value">₦2,000,000</div>
          </div>
          <div className="insurance-meta-item">
            <div className="insurance-meta-label">Used This Year</div>
            <div className="insurance-meta-value">₦128,700</div>
          </div>
          <div className="insurance-meta-item">
            <div className="insurance-meta-label">Remaining</div>
            <div className="insurance-meta-value">₦1,871,300</div>
          </div>
        </div>
        <div 
style={{marginTop:24,height:8,background:'rgba(255,255,255,0.2)',borderRadius:4,overflow:'hidden'}}>
          <div 
style={{height:'100%',background:'var(--gold)',borderRadius:4,width:'6.4%'}} 
/>
        </div>
        <div style={{marginTop:6,fontSize:12,opacity:0.7}}>6.4% of annual 
coverage used</div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 
1fr',gap:16,marginBottom:24}}>
        {[
          {label:"Inpatient",value:"₦1,500,000",icon:"🏥",used:"₦0"},
          {label:"Outpatient",value:"₦300,000",icon:"🩺",used:"₦128,700"},
          {label:"Dental & Vision",value:"₦200,000",icon:"😁",used:"₦0"},
        ].map(b => (
          <div key={b.label} className="card">
            <div 
style={{display:'flex',justifyContent:'space-between',marginBottom:12}}>
              <span style={{fontSize:24}}>{b.icon}</span>
              <span className="badge badge-success">Active</span>
            </div>
            <div 
style={{fontWeight:800,fontSize:20,fontFamily:"'Syne',sans-serif",color:'var(--navy)'}}>{b.value}</div>
            <div 
style={{fontSize:13,color:'var(--slate)',marginTop:4}}>{b.label} 
limit</div>
            <div 
style={{fontSize:12,color:'var(--teal)',fontWeight:600,marginTop:4}}>Used: 
{b.used}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div 
style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
          <div className="card-title">Claims History</div>
          <button className="btn btn-primary btn-sm">+ New Claim</button>
        </div>
        <table className="claims-table">
          <thead>
            <tr>
              <th>Claim 
ID</th><th>Service</th><th>Provider</th><th>Date</th><th>Amount</th><th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {CLAIMS.map(c => (
              <tr key={c.id}>
                <td 
style={{fontFamily:"'Syne',sans-serif",fontWeight:700,color:'var(--teal)',fontSize:13}}>{c.id}</td>
                <td>{c.service}</td>
                <td style={{color:'var(--slate)'}}>{c.doctor}</td>
                <td style={{color:'var(--slate)'}}>{c.date}</td>
                <td style={{fontWeight:700}}>{c.amount}</td>
                <td>
                  <span className={`badge 
${c.status==="approved"?"badge-success":c.status==="pending"?"badge-warning":"badge-danger"}`}>
                    {c.status==="approved"?"✓ 
Approved":c.status==="pending"?"⏳ Pending":"✕ Rejected"}
                  </span>
                </td>
                <td><button className="btn btn-ghost 
btn-sm">View</button></td>
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
      <div className="topbar">
        <div><div className="page-title">Transactions</div><div 
className="page-sub">Full history of wallet activity</div></div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn btn-outline btn-sm">⬇️ Export</button>
          <button className="btn btn-outline btn-sm">🔍 Filter</button>
        </div>
      </div>
      <div className="card">
        <div className="txn-list">
          {TRANSACTIONS.map(t => (
            <div key={t.id} className="txn-item">
              <div className="txn-icon" 
style={{background:t.bg}}>{t.icon}</div>
              <div className="txn-info">
                <div className="txn-name">{t.name}</div>
                <div className="txn-date">{t.date}</div>
              </div>
              <div style={{textAlign:'right'}}>
                <div className={`txn-amount 
${t.type}`}>{t.type==='credit'?'+':'-'}₦{t.amount.toLocaleString()}</div>
                <span className={`badge 
${t.type==='credit'?'badge-success':'badge-info'}`} 
style={{fontSize:10,marginTop:4}}>{t.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Settings() {
  return (
    <div>
      <div className="topbar">
        <div><div className="page-title">Settings</div><div 
className="page-sub">Manage your account preferences</div></div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
        {[
          {title:"Notifications",icon:"🔔",items:["Email alerts for 
appointments","SMS reminders","Push notifications","Newsletter & health 
tips"]},
          {title:"Security",icon:"🔒",items:["Two-factor 
authentication","Biometric login","Login activity alerts","Change 
password"]},
          {title:"Privacy",icon:"🛡️",items:["Data sharing 
preferences","Health data visibility","Delete account data","Download my 
data"]},
          {title:"Payment",icon:"💳",items:["Saved payment 
methods","Auto-fund wallet","Spending limits","Payment notifications"]},
        ].map(sec => (
          <div key={sec.title} className="card">
            <div 
style={{display:'flex',gap:10,alignItems:'center',marginBottom:16}}>
              <span style={{fontSize:22}}>{sec.icon}</span>
              <div className="card-title">{sec.title}</div>
            </div>
            {sec.items.map(item => (
              <div key={item} 
style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'12px 
0',borderBottom:'1px solid #f8fafc'}}>
                <span 
style={{fontSize:14,color:'var(--navy)'}}>{item}</span>
                <div 
style={{width:44,height:24,background:'var(--teal)',borderRadius:12,cursor:'pointer',position:'relative'}}>
                  <div 
style={{position:'absolute',right:2,top:2,width:20,height:20,background:'white',borderRadius:'50%'}} 
/>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== APP ====================
export default function App() {
  const [authed, setAuthed] = useState(false);
  const [page, setPage] = useState("dashboard");

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
    insurance: <InsurancePage />,
    settings: <Settings />,
  };

  if (!authed) {
    return (
      <>
        <style>{styles}</style>
        <AuthScreen onLogin={() => setAuthed(true)} />
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="main-layout">
          <Sidebar active={page} onNav={setPage} />
          <div className="main-content">{pages[page] || 
pages.dashboard}</div>
        </div>
      </div>
    </>
  );
}
