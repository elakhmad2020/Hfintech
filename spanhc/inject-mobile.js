const fs = require('fs');
const path = './build/index.html';
let html = fs.readFileSync(path, 'utf8');
const style = '<style>@media(max-width:900px){.auth-screen{grid-template-columns:1fr!important}.auth-left{display:none!important}.auth-right{padding:32px 24px!important}.sidebar{transform:translateX(-100%)!important;z-index:200!important}.sidebar.mobile-open{transform:translateX(0)!important}.main-content{margin-left:0!important;padding:16px!important}.stats-grid{grid-template-columns:repeat(2,1fr)!important}.dashboard-grid{grid-template-columns:1fr!important}.form-grid-2{grid-template-columns:1fr!important}.doctors-grid{grid-template-columns:1fr!important}.dependents-grid{grid-template-columns:1fr!important}.topbar{flex-direction:column!important;align-items:flex-start!important;gap:12px!important}.page-title{font-size:20px!important}.wallet-amount{font-size:28px!important}.mobile-menu-btn{display:flex!important}}</style>';
html = html.replace('</head>', style + '</head>');
fs.writeFileSync(path, html);
console.log('Mobile styles injected!');
