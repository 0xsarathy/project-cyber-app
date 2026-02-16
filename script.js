// PERFECT INSTANT NAVIGATION
document.querySelectorAll('.nav-btn, .back').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    
    // HIDE ALL PAGES INSTANTLY
    document.querySelectorAll('.page').forEach(page => {
      page.style.display = 'none';
      page.classList.remove('active');
    });
    
    // SHOW TARGET PAGE INSTANTLY
    const target = btn.dataset.page || 'home';
    const page = document.getElementById(target);
    page.style.display = 'block';
    page.classList.add('active');
    
    // UPDATE NAV BUTTONS
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    if (btn.dataset.page) document.querySelector(`[data-page="${target}"]`).classList.add('active');
  });
});

// PERFECT INSTANT ATTACK CARDS
document.querySelectorAll('.card').forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', e => {
    e.preventDefault();
    
    const attack = card.dataset.attack;
    document.querySelectorAll('.page').forEach(p => {
      p.style.display = 'none';
      p.classList.remove('active');
    });
    
    document.getElementById(attack).style.display = 'block';
    document.getElementById(attack).classList.add('active');
  });
});

// ALL ATTACK SIMULATIONS - ULTRA FAST
function logAttack(logId, messages) {
  const log = document.getElementById(logId);
  log.innerHTML = '';
  messages.forEach((msg, i) => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
      log.appendChild(line);
      log.scrollTop = log.scrollHeight;
    }, i * 150); // 150ms intervals
  });
}

// MALWARE
document.getElementById('runMalware')?.addEventListener('click', () => {
  logAttack('malwareLog', [
    'DOWNLOAD: invoice.exe',
    'AV BYPASSED: zero-day exploit',
    'INJECTED: chrome.exe process',
    'KEYLOGGER: capturing passwords',
    'PERSISTENCE: task scheduler'
  ]);
});

// RANSOMWARE
document.getElementById('runRansom')?.addEventListener('click', () => {
  logAttack('ransomLog', [
    'EXECUTED: INVOICE.pdf.exe',
    'ENCRYPTING: Desktop/ (25%)',
    'ENCRYPTING: Documents/ (75%)',
    'FINISHED: README.txt ransom note',
    'SHADOW COPIES: DELETED'
  ]);
});

// PHISHING
document.getElementById('runPhish')?.addEventListener('click', () => {
  logAttack('phishLog', [
    'EMAIL: URGENT KYC Update',
    'CLICKED: paytm-login.net',
    'FAKE LOGIN: credentials captured',
    'STOLEN: user@gmail.com / pass123',
    'SESSION: hijacked'
  ]);
});

// WEB ATTACK
document.getElementById('runWeb')?.addEventListener('click', () => {
  logAttack('webLog', [
    'nmap -sV target.com',
    'FOUND: nginx 1.18 (vulnerable)',
    'SQLi: login=admin\' OR 1=1 --',
    'DUMPED: 1500 user records',
    'EXFIL: data sent to attacker'
  ]);
});

// DDOS - SPECIAL VISUAL
document.getElementById('runDDoS')?.addEventListener('click', () => {
  logAttack('ddosLog', [
    'BOTNET: 10,000 zombies online',
    'FLOOD: SYN packets 500Mbps',
    'TRAFFIC: 2Gbps incoming',
    'SERVER: CPU 100%',
    'WEBSITE: DOWN'
  ]);
  
  // TRAFFIC METER ANIMATION
  let traffic = 0;
  const meter = document.getElementById('meterFill');
  const trafficText = document.getElementById('traffic');
  const interval = setInterval(() => {
    traffic += 50;
    meter.style.width = traffic + '%';
    trafficText.textContent = traffic + ' Mbps';
    if (traffic >= 100) {
      clearInterval(interval);
      trafficText.textContent = 'WEBSITE DOWN';
      meter.style.background = '#f00';
    }
  }, 100);
});

// QUIZ
document.querySelectorAll('.qbtn').forEach(btn => {
  btn.addEventListener('click', () => {
    let score = parseInt(document.getElementById('quizScore').textContent);
    score += 10;
    document.getElementById('quizScore').textContent = score;
    
    // HIGHLIGHT CORRECT
    document.querySelectorAll('.qbtn').forEach(b => b.classList.remove('correct'));
    if (btn.classList.contains('correct')) {
      btn.style.background = '#0f0';
      btn.style.color = '#000';
    }
  });
});
