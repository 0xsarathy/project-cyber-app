// GLOBAL VARIABLES
let attackRunning = false;

// NAVIGATION
document.querySelectorAll('.navbtn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.page').forEach(page => {
      page.classList.remove('active');
    });
    document.querySelector(`#${this.dataset.page}`).classList.add('active');
    
    document.querySelectorAll('.navbtn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

// ATTACK FUNCTIONS
function launchAttack(type) {
  if (attackRunning) return;
  attackRunning = true;
  
  // VISUAL FEEDBACK
  document.getElementById('traffic-arrow').style.color = '#f88';
  document.getElementById('packets').style.display = 'block';
  
  // UPDATE STATS
  document.getElementById('atk-cpu').textContent = '89%';
  document.getElementById('vic-cpu').textContent = '97%';
  document.getElementById('atk-net').textContent = '2.1 MB/s';
  document.getElementById('vic-net').textContent = '1.8 MB/s';
  
  // ATTACKER LOG START
  logAttacker(`🚀 LAUNCHING ${type.toUpperCase()} ATTACK...`);
  
  // ATTACK SIMULATION
  setTimeout(() => {
    switch(type) {
      case 'nmap':
        logAttacker('nmap -sS -T4 -p- 192.168.1.200');
        logAttacker('PORT     STATE  SERVICE');
        logAttacker('22/tcp   open   ssh');
        logAttacker('80/tcp   open   http');
        logAttacker('445/tcp  open   smb');
        logVictim('🔴 IDS ALERT: Port scan detected from 192.168.1.100');
        break;
        
      case 'phish':
        logAttacker('python phishing_server.py --target 192.168.1.200');
        logAttacker('📧 Spear phishing: "URGENT KYC UPDATE"');
        logAttacker('✅ Victim clicked → Credentials captured!');
        logVictim('⚠️ Suspicious URL opened: fake-paytm-login.com');
        logVictim('💀 USER: admin | PASS: P@ssw0rd123 STOLEN');
        break;
        
      case 'exploit':
        logAttacker('msfconsole -x "use exploit/windows/smb/ms17_010"');
        logAttacker('💉 EternalBlue → Sending payload...');
        logAttacker('🎯 Exploit SUCCESS → SYSTEM shell gained!');
        logVictim('⚠️ svchost.exe → High CPU + Suspicious network');
        logVictim('💀 Privilege escalation to SYSTEM detected');
        break;
        
      case 'ransom':
        logAttacker('dropping encryptor.exe payload');
        logAttacker('🔒 Encrypting Desktop/ → 45% complete');
        logAttacker('✅ Encryption 100% → README.txt ransom note');
        logVictim('⚠️ High disk I/O → encryptor.exe detected');
        logVictim('💀 CRITICAL: All files .encrypted');
        break;
        
      case 'ddos':
        logAttacker('hping3 --flood -S -p80 192.168.1.200');
        logAttacker('🌪️ DDoS → 3.2Gbps SYN flood active');
        logAttacker('📊 Traffic: 95% packet loss achieved');
        logVictim('💀 NETWORK SATURATED → 98% packet drop');
        logVictim('💀 WEBSERVER DOWN → Connection timeout');
        document.getElementById('vic-cpu').textContent = '100%';
        break;
    }
  }, 1200);
  
  // RESET AFTER 7 SECONDS
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
function logAttacker(message) {
  const log = document.getElementById('attacker-log');
  const time = new Date().toLocaleTimeString();
  log.innerHTML += `<div>[${time}] ${message}</div>`;
  log.scrollTop = log.scrollHeight;
}

function logVictim(message) {
  const log = document.getElementById('victim-log');
  const time = new Date().toLocaleTimeString();
  log.innerHTML += `<div>[${time}] ${message}</div>`;
  log.scrollTop = log.scrollHeight;
}

// DEFENSE FUNCTIONS
function defenseAction(type) {
  switch(type) {
    case 'block':
      logAttacker('❌ Connection BLOCKED by firewall');
      logVictim('✅ Perimeter firewall → 192.168.1.100 BLOCKED');
      document.getElementById('traffic-arrow').style.color = '#555';
      document.getElementById('packets').style.display = 'none';
      break;
      
    case 'isolate':
      logVictim('✅ NAC → Victim PC NETWORK ISOLATED');
      document.querySelector('.victim .pc-status').textContent = 'ISOLATED';
      document.querySelector('.victim .pc-status').className = 'pc-status red';
      break;
      
    case 'scan':
      logVictim('✅ AV SCAN complete → 23 threats QUARANTINED');
      break;
      
    case 'edr':
      logVictim('✅ EDR activated → Behavioral monitoring ON');
      break;
      
    case 'backup':
      logVictim('✅ Immutable backup → Files FULLY RESTORED');
      break;
  }
}

// CLEAR LOGS
function clearLogs(type) {
  if(type === 'attacker') {
    document.getElementById('attacker-log').innerHTML = '';
  } else {
    document.getElementById('victim-log').innerHTML = '';
  }
}

// LIVE CPU UPDATES
setInterval(() => {
  const atkCPU = Math.floor(Math.random() * 25 + 8);
  const vicCPU = Math.floor(Math.random() * 15 + 3);
  document.getElementById('atk-cpu').textContent = atkCPU + '%';
  document.getElementById('vic-cpu').textContent = vicCPU + '%';
}, 3000);

// INITIALIZE
logAttacker('Cyber Range v3.0 → Attacker:192.168.1.100 | Victim:192.168.1.200');
logVictim('Windows Server 2019 booted → All services nominal');
