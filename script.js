// GLOBAL NAVIGATION
document.querySelectorAll('.nav-btn, .back-btn').forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(btn.dataset.target);
    if (target) target.classList.add('active');
    
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    if (btn.dataset.target === 'home') document.querySelector('[data-target="home"]').classList.add('active');
  };
});

// ATTACK CARD NAVIGATION
document.querySelectorAll('.attack-card').forEach(card => {
  card.onclick = (e) => {
    if (e.target.closest('.back-btn')) return;
    const attack = card.dataset.attack;
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(attack).classList.add('active');
  };
});

// TERMINAL HELPER
function logToTerminal(logEl, text) {
  const line = document.createElement('div');
  line.className = 'terminal-line';
  line.textContent = `[${new Date().toLocaleTimeString()}] ${text}`;
  logEl.appendChild(line);
  logEl.scrollTop = logEl.scrollHeight;
  setTimeout(() => line.style.opacity = '1', 100);
}

// ========== MALWARE SIMULATION ==========
document.getElementById('runMalware').onclick = () => {
  const log = document.getElementById('malwareLog');
  const prevent = document.getElementById('malwarePrevent');
  log.innerHTML = '';
  
  logToTerminal(log, 'User downloaded: invoice_urgent.exe');
  setTimeout(() => logToTerminal(log, 'AV signature check: PASSED (zero-day)'), 800);
  setTimeout(() => logToTerminal(log, 'Process injected into chrome.exe'), 1600);
  setTimeout(() => logToTerminal(log, 'Keylogger active - capturing keystrokes'), 2400);
  setTimeout(() => logToTerminal(log, 'Persistence: Task Scheduler entry created'), 3200);
  
  setTimeout(() => {
    prevent.innerHTML = `
      <ul>
        <li>✅ Real-time EDR with behavioral analysis</li>
        <li>✅ Application allow-listing (AppLocker)</li>
        <li>✅ Least privilege - standard user accounts</li>
        <li>✅ Block execution from Downloads/Temp</li>
        <li>✅ Regular patch management automation</li>
      </ul>
    `;
  }, 3500);
};

document.getElementById('stopMalware').onclick = () => {
  const log = document.getElementById('malwareLog');
  logToTerminal(log, '🛡️ EDR DETECTED: Behavioral anomaly');
  logToTerminal(log, '🛡️ Process terminated + quarantined');
  logToTerminal(log, '🛡️ Persistence removed');
};

// ========== RANSOMWARE SIMULATION ==========
document.getElementById('runRansom').onclick = () => {
  const log = document.getElementById('ransomLog');
  const prevent = document.getElementById('ransomPrevent');
  log.innerHTML = '';
  
  logToTerminal(log, 'User opened: INVOICE.pdf.exe');
  setTimeout(() => logToTerminal(log, 'Ransomware activated - encrypting Desktop/'), 1000);
  setTimeout(() => logToTerminal(log, 'Encrypting Documents/ - 45% complete'), 2000);
  setTimeout(() => logToTerminal(log, 'Shadow copies deleted - no restore points'), 3000);
  setTimeout(() => logToTerminal(log, 'ENCRYPTION COMPLETE - README.txt dropped'), 4000);
  
  setTimeout(() => {
    prevent.innerHTML = `
      <ul>
        <li>✅ 3-2-1 Backup Rule (3 copies, 2 media, 1 offsite)</li>
        <li>✅ Immutable backups (cannot be encrypted)</li>
        <li>✅ Network segmentation</li>
        <li>✅ Block Office macros from internet</li>
      </ul>
    `;
  }, 4200);
};

document.getElementById('recoverRansom').onclick = () => {
  const log = document.getElementById('ransomLog');
  logToTerminal(log, '🔄 Recovery: Mounting immutable backup');
  logToTerminal(log, '🔄 Files restored from offline copy');
  logToTerminal(log, '✅ System clean - lesson learned');
};

// ========== PHISHING SIMULATION ==========
document.getElementById('runPhish').onclick = () => {
  const log = document.getElementById('phishLog');
  const prevent = document.getElementById('phishPrevent');
  log.innerHTML = '';
  
  logToTerminal(log, 'Phishing email sent: URGENT KYC Update');
  setTimeout(() => logToTerminal(log, 'User clicked: paytm-login.net'), 800);
  setTimeout(() => logToTerminal(log, 'Fake login page loaded'), 1600);
  setTimeout(() => logToTerminal(log, 'Credentials captured: user@gmail.com / pass123'), 2400);
  setTimeout(() => logToTerminal(log, 'Session cookie stolen'), 3200);
  
  setTimeout(() => {
    prevent.innerHTML = `
      <ul>
        <li>✅ Check URL carefully (hover before click)</li>
        <li>✅ Use bookmarks/official apps</li>
        <li>✅ Enable MFA everywhere</li>
        <li>✅ Email headers analysis training</li>
      </ul>
    `;
  }, 3500);
};

// ========== WEB ATTACK ==========
document.getElementById('runWeb').onclick = () => {
  const log = document.getElementById('webLog');
  const prevent = document.getElementById('webPrevent');
  log.innerHTML = '';
  
  logToTerminal(log, 'nmap -sV target-app.com');
  setTimeout(() => logToTerminal(log, '80/tcp open nginx/1.18.0 (outdated)'), 800);
  setTimeout(() => logToTerminal(log, 'POST /login SQL injection detected'), 1600);
  setTimeout(() => logToTerminal(log, "' OR 1=1 -- dumped users table"), 2400);
  setTimeout(() => logToTerminal(log, '1000+ emails + hashes exfiltrated'), 3200);
  
  setTimeout(() => {
    prevent.innerHTML = `
      <ul>
        <li>✅ Parameterized queries/ORM</li>
        <li>✅ Web Application Firewall (WAF)</li>
        <li>✅ Regular VAPT testing</li>
        <li>✅ Patch nginx immediately</li>
      </ul>
    `;
  }, 3500);
};

// ========== QUIZ (SIMPLE VERSION) ==========
let score = 0, current = 0, timeLeft = 30;
const questions = [
  { q: "SMS: Update KYC link?", options: ["Click", "Call bank", "Reply"], correct: 1 },
  { q: "Colleague wants password?", options: ["Share", "IT support", "Login for them"], correct: 1 }
];

function loadQuiz() {
  const q = questions[current];
  document.getElementById('question').textContent = q.q;
  document.querySelectorAll('.option').forEach((btn, i) => {
    btn.textContent = q.options[i];
    btn.onclick = () => {
      if (i === q.correct) score += 10;
      document.getElementById('score').textContent = score;
      document.getElementById('nextQ').disabled = false;
    };
  });
}

document.getElementById('nextQ').onclick = () => {
  current++;
  if (current < questions.length) loadQuiz();
  else alert('Quiz Complete! Score: ' + score);
};

// START
loadQuiz();
