// GLOBAL STATE
let attackRunning = false;
let quizData = [
  {
    question: "Bank SMS: 'Update KYC or account suspended' with login link?",
    options: ["Click immediately", "Call bank official number", "Forward to friends", "Reply with OTP"],
    correct: 1,
    explanation: "✅ CORRECT! Banks NEVER send login links via SMS. Always verify via official contact."
  },
  {
    question: "Colleague asks for admin password 'just for 5 mins'",
    options: ["Share privately", "Direct to IT support", "Login on their PC", "Send via email"],
    correct: 1,
    explanation: "✅ CORRECT! Never share credentials. Always follow proper IT procedures."
  },
  {
    question: "CEO email: 'Urgent wire transfer - send bank details'",
    options: ["Send bank details", "Call CEO directly", "Forward to finance", "Ignore completely"],
    correct: 1,
    explanation: "✅ CORRECT! Verify CEO requests via phone. Never send sensitive info via email."
  },
  {
    question: "Unknown USB found in parking lot - what to do?",
    options: ["Plug into work PC", "Destroy immediately", "Take to lost & found", "Give to security"],
    correct: 1,
    explanation: "✅ CORRECT! USB drops are common social engineering attacks."
  },
  {
    question: "Website certificate warning - what to do?",
    options: ["Continue anyway", "Close immediately", "Call IT support", "Take screenshot"],
    correct: 1,
    explanation: "✅ CORRECT! Certificate warnings indicate potential MITM attacks."
  }
];
let currentQuestion = 0;
let quizScore = 0;
let answered = false;
let quizTimer;

// NAVIGATION
document.querySelectorAll('.navbtn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.querySelector(`#${this.dataset.page}`).classList.add('active');
    document.querySelectorAll('.navbtn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    updateQuizNav();
  });
});

// ATTACKS (Same as before)
function launchAttack(type) {
  if (attackRunning) return;
  attackRunning = true;
  
  document.getElementById('traffic-arrow').style.color = '#f88';
  document.getElementById('packets').style.display = 'block';
  document.getElementById('atk-cpu').textContent = '89%';
  document.getElementById('vic-cpu').textContent = '97%';
  document.getElementById('atk-net').textContent = '2.1 MB/s';
  document.getElementById('vic-net').textContent = '1.8 MB/s';
  
  logAttacker(`🚀 LAUNCHING ${type.toUpperCase()} ATTACK...`);
  
  setTimeout(() => {
    switch(type) {
      case 'nmap':
        logAttacker('nmap -sS -T4 -p- 192.168.1.200 → 22,80,445 OPEN');
        logVictim('🔴 IDS: Port scan from 192.168.1.100');
        break;
      case 'phish':
        logAttacker('📧 Phishing → admin/P@ssw0rd123 CAPTURED');
        logVictim('⚠️ Fake login page → Credentials stolen');
        break;
      case 'exploit':
        logAttacker('💉 MS17-010 → SYSTEM shell gained');
        logVictim('💀 svchost.exe privilege escalation');
        break;
      case 'ransom':
        logAttacker('🔒 1500 files ENCRYPTED → Ransom note dropped');
        logVictim('💀 encryptor.exe → All files .encrypted');
        break;
      case 'ddos':
        logAttacker('🌪️ 3.2Gbps SYN flood → Target down');
        logVictim('💀 NETWORK DOWN → 98% packet loss');
        document.getElementById('vic-cpu').textContent = '100%';
        break;
    }
  }, 1200);
  
  setTimeout(() => {
    attackRunning = false;
    document.getElementById('traffic-arrow').style.color = '#0f0';
    document.getElementById('packets').style.display = 'none';
    document.getElementById('atk-cpu').textContent = '12%';
    document.getElementById('vic-cpu').textContent = '6%';
    document.getElementById('atk-net').textContent = '0 KB/s';
    document.getElementById('vic-net').textContent = '0 KB/s';
  }, 7000);
}

// LOG FUNCTIONS
function logAttacker(msg) {
  const log = document.getElementById('attacker-log');
  log.innerHTML += `<div>[${new Date().toLocaleTimeString()}] ${msg}</div>`;
  log.scrollTop = log.scrollHeight;
}

function logVictim(msg) {
  const log = document.getElementById('victim-log');
  log.innerHTML += `<div>[${new Date().toLocaleTimeString()}] ${msg}</div>`;
  log.scrollTop = log.scrollHeight;
}

// QUIZ SYSTEM
function loadQuizQuestion() {
  if (currentQuestion >= quizData.length) {
    endQuiz();
    return;
  }
  
  const q = quizData[currentQuestion];
  document.getElementById('qnum').textContent = currentQuestion + 1;
  document.getElementById('quiz-question').textContent = q.question;
  
  const options = document.getElementById('quiz-options');
  options.innerHTML = '';
  q.options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = option;
    btn.onclick = () => selectQuizAnswer(index);
    options.appendChild(btn);
  });
  
  document.getElementById('next-question').disabled = true;
  document.getElementById('quiz-feedback').innerHTML = '';
  answered = false;
  startQuizTimer();
}

function selectQuizAnswer(selected) {
  if (answered) return;
  answered = true;
  
  const q = quizData[currentQuestion];
  const options = document.querySelectorAll('.quiz-option');
  
  options.forEach((btn, i) => {
    btn.classList.add('disabled');
    if (i === q.correct) {
      btn.classList.add('correct');
    }
  });
  
  if (selected === q.correct) {
    quizScore += 20;
    document.getElementById('quiz-score').textContent = quizScore;
    document.getElementById('quiz-feedback').innerHTML = q.explanation;
    document.getElementById('quiz-feedback').className = 'feedback-correct';
  } else {
    document.getElementById('quiz-feedback').innerHTML = 
      `❌ Wrong! ${q.explanation}`;
    document.getElementById('quiz-feedback').className = 'feedback-wrong';
    options[selected].classList.add('wrong');
  }
  
  clearInterval(quizTimer);
  document.getElementById('next-question').disabled = false;
  updateQuizNav();
}

document.getElementById('next-question').onclick = () => {
  currentQuestion++;
  loadQuizQuestion();
};

function startQuizTimer() {
  let time = 30;
  document.getElementById('quiz-time').textContent = time;
  quizTimer = setInterval(() => {
    time--;
    document.getElementById('quiz-time').textContent = time;
    if (time <= 0) {
      clearInterval(quizTimer);
      if (!answered) {
        answered = true;
        document.getElementById('quiz-feedback').innerHTML = 
          '⏰ Time up! Correct was: ' + quizData[currentQuestion].explanation;
        document.getElementById('quiz-feedback').className = 'feedback-wrong';
        document.getElementById('next-question').disabled = false;
      }
    }
  }, 1000);
}

function endQuiz() {
  document.querySelector('.quiz-container').innerHTML = `
    <h2>🎉 QUIZ COMPLETE!</h2>
    <div style="font-size:24px;text-align:center;margin:40px;">
      FINAL SCORE: <span style="color:#0f0;font-size:32px;">${quizScore}/100</span>
    </div>
    <button onclick="resetQuiz()" class="next-btn" style="margin:0 auto;display:block;">PLAY AGAIN</button>
  `;
}

function resetQuiz() {
  currentQuestion = 0;
  quizScore = 0;
  document.getElementById('quiz-score').textContent = '0';
  loadQuizQuestion();
  updateQuizNav();
}

function updateQuizNav() {
  const score = document.querySelector('[data-page="quiz"]');
  if (score) score.textContent = `🎯 QUIZ (${quizScore}/100)`;
}

// PREVENTION CARDS
document.querySelectorAll('.prev-card').forEach(card => {
  card.addEventListener('click', function() {
    this.style.transform = 'scale(0.98)';
    setTimeout(() => this.style.transform = '', 200);
  });
});

// UTILITY
function clearLogs(type) {
  document.getElementById(type === 'attacker' ? 'attacker-log' : 'victim-log').innerHTML = '';
}

// LIVE STATS
setInterval(() => {
  const atkCPU = Math.floor(Math.random() * 25 + 8);
  const vicCPU = Math.floor(Math.random() * 15 + 3);
  document.getElementById('atk-cpu').textContent = atkCPU + '%';
  document.getElementById('vic-cpu').textContent = vicCPU + '%';
}, 3000);

// INIT
window.onload = () => {
  logAttacker('Cyber Range v4.0 → Ready for attacks');
  logVictim('Windows Server 2019 → All systems nominal');
  loadQuizQuestion();
};
