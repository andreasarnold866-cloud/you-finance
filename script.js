let transactions = JSON.parse(localStorage.getItem('premium_transactions')) || [];
let budgets = JSON.parse(localStorage.getItem('premium_budgets')) || {};

let isLoginMode = false;

const categoryColors = {
    Freizeit: '#818cf8',
    Essen: '#fb923c',
    Wohnen: '#f43f5e',
    Gehalt: '#34d399',
    Sonstiges: '#9ca3af'
};

document.addEventListener("DOMContentLoaded", () => {
    checkUserSession();
    initLiveDateAndCalendar();
});

function checkUserSession() {
    const activeUser = localStorage.getItem('active_user');
    if (activeUser) {
        document.getElementById('auth-screen').style.display = 'none';
        document.getElementById('app-screen').style.display = 'flex';
        document.getElementById('user-display-name').innerText = activeUser.split('@')[0];
        updateUI();
    } else {
        document.getElementById('auth-screen').style.display = 'flex';
        document.getElementById('app-screen').style.display = 'none';
        validatePasswordLive(); // Start-Zustand anzeigen
    }
}

function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    
    const title = document.getElementById('auth-title');
    const subtitle = document.getElementById('auth-subtitle');
    const btn = document.getElementById('auth-submit-btn');
    const toggleText = document.getElementById('auth-toggle-text');
    const policyBox = document.getElementById('password-policies');
    
    if (isLoginMode) {
        title.innerText = "Willkommen zurück";
        subtitle.innerText = "Logge dich ein, um deine Finanzen zu verwalten";
        btn.innerText = "Einloggen";
        toggleText.innerHTML = 'Neu bei You Finance? <span onclick="toggleAuthMode()">Konto erstellen</span>';
        if (policyBox) policyBox.style.display = 'none'; // Beim Login ausblenden
    } else {
        title.innerText = "Konto erstellen";
        subtitle.innerText = "Starte deine finanzielle Unabhängigkeit mit You Finance";
        btn.innerText = "Registrieren";
        toggleText.innerHTML = 'Bereits Mitglied? <span onclick="toggleAuthMode()">Jetzt einloggen</span>';
        if (policyBox) policyBox.style.display = 'block';
        validatePasswordLive();
    }
}

// NEU: Live Passwort-Checker
function validatePasswordLive() {
    if (isLoginMode) return { isValid: true };

    const val = document.getElementById('auth-password').value;

    // Checks
    const hasLength = val.length >= 8;
    const hasUpper = /[A-Z]/.test(val);
    const hasNumber = /[0-9]/.test(val);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val);

    // DOM-Aktualisierung
    updatePolicyUI('policy-length', hasLength, "Mindestens 8 Zeichen");
    updatePolicyUI('policy-uppercase', hasUpper, "Einen Großbuchstaben");
    updatePolicyUI('policy-number', hasNumber, "Eine Zahl (0-9)");
    updatePolicyUI('policy-special', hasSpecial, "Ein Sonderzeichen (!@#$%^&*)");

    return { isValid: (hasLength && hasUpper && hasNumber && hasSpecial) };
}

function updatePolicyUI(id, isValid, text) {
    const el = document.getElementById(id);
    if (!el) return;
    if (isValid) {
        el.className = 'valid';
        el.innerText = `✓ ${text}`;
    } else {
        el.className = 'invalid';
        el.innerText = `❌ ${text}`;
    }
}

function handleAuth() {
    const email = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value;
    
    if (!email || !password) {
        alert("Bitte fülle alle Felder aus.");
        return;
    }
    
    if (isLoginMode) {
        const registeredPassword = localStorage.getItem(`user_${email}`);
        if (registeredPassword && registeredPassword === password) {
            localStorage.setItem('active_user', email);
            checkUserSession();
        } else {
            alert("Falsche E-Mail-Adresse oder fehlerhaftes Passwort.");
        }
    } else {
        // Bei Registrierung: Sicherheits-Check erzwingen
        const check = validatePasswordLive();
        if (!check.isValid) {
            alert("Dein Passwort ist nicht sicher genug! Bitte erfülle alle Kriterien.");
            return;
        }

        if (localStorage.getItem(`user_${email}`)) {
            alert("Diese E-Mail ist bereits registriert.");
            return;
        }
        
        localStorage.setItem(`user_${email}`, password);
        localStorage.setItem('active_user', email);
        alert("Konto erfolgreich erstellt!");
        checkUserSession();
    }
}

function logout() {
    localStorage.removeItem('active_user');
    document.getElementById('auth-email').value = '';
    document.getElementById('auth-password').value = '';
    checkUserSession();
}

// Kalender-Generator
function initLiveDateAndCalendar() {
    const heute = new Date();
    const datumsOptionen = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const subtitleElement = document.getElementById('live-subtitle-date');
    if (subtitleElement) subtitleElement.innerText = `Heute ist ${heute.toLocaleDateString('de-DE', datumsOptionen)}`;

    const monatsOptionen = { month: 'long', year: 'numeric' };
    const calendarHeader = document.getElementById('calendar-month-year');
    if (calendarHeader) calendarHeader.innerText = heute.toLocaleDateString('de-DE', monatsOptionen);

    const grid = document.getElementById('calendar-days-grid');
    if (grid) {
        grid.innerHTML = '';
        const jahr = heute.getFullYear();
        const monat = heute.getMonth();
        let ersterTagWochentag = new Date(jahr, monat, 1).getDay();
        ersterTagWochentag = ersterTagWochentag === 0 ? 6 : ersterTagWochentag - 1;
        const tageImMonat = new Date(jahr, monat + 1, 0).getDate();
        
        for (let i = 0; i < ersterTagWochentag; i++) {
            grid.appendChild(document.createElement('div'));
        }
        for (let tag = 1; tag <= tageImMonat; tag++) {
            const tagFeld = document.createElement('div');
            tagFeld.innerText = tag;
            if (tag === heute.getDate()) tagFeld.className = 'today';
            grid.appendChild(tagFeld);
        }
    }
}

function openTab(tabId) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active-content'));
    const items = document.querySelectorAll('.nav-item');
    items.forEach(item => item.classList.remove('active'));
    document.getElementById(tabId).classList.add('active-content');
    if (window.event && window.event.currentTarget) window.event.currentTarget.classList.add('active');
}

function addTransaction() {
    const beschreibung = document.getElementById('beschreibung').value.trim();
    const betrag = parseFloat(document.getElementById('betrag').value);
    const typ = document.getElementById('typ').value;
    const kategorie = document.getElementById('kategorie').value;

    if (!beschreibung || isNaN(betrag) || betrag <= 0) {
        alert('Bitte gib eine gültige Bezeichnung und einen Betrag ein.');
        return;
    }

    const newTransaction = {
        id: Date.now(),
        beschreibung,
        betrag,
        typ,
        kategorie,
        datum: new Date().toLocaleDateString('de-DE')
    };

    transactions.push(newTransaction);
    localStorage.setItem('premium_transactions', JSON.stringify(transactions));
    document.getElementById('beschreibung').value = '';
    document.getElementById('betrag').value = '';
    updateUI();
}

function setBudget() {
    const kat = document.getElementById('budget-kategorie').value;
    const limit = parseFloat(document.getElementById('budget-limit').value);
    if (isNaN(limit) || limit <= 0) {
        alert('Bitte setze ein valides Limit fest.');
        return;
    }
    budgets[kat] = limit;
    localStorage.setItem('premium_budgets', JSON.stringify(budgets));
    document.getElementById('budget-limit').value = '';
    updateUI();
}

function updateUI() {
    let incomeSum = 0;
    let expenseSum = 0;
    let categoryExpenses = { Freizeit: 0, Essen: 0, Wohnen: 0, Sonstiges: 0 };

    const tableBody = document.getElementById('transaction-table-body');
    const activityList = document.getElementById('recent-activity-list');
    if (tableBody) tableBody.innerHTML = '';

    transactions.forEach(t => {
        if (t.typ === 'einnahme') {
            incomeSum += t.betrag;
        } else {
            expenseSum += t.betrag;
            if (categoryExpenses[t.kategorie] !== undefined) categoryExpenses[t.kategorie] += t.betrag;
        }

        if (tableBody) {
            const row = document.createElement('tr');
            const colorClass = t.typ === 'einnahme' ? 'style="color: #10b981; font-weight:600;"' : 'style="color: #ef4444; font-weight:600;"';
            row.innerHTML = `
                <td><strong>${t.beschreibung}</strong><br><small style="color:#6b7280">${t.datum}</small></td>
                <td><span style="background: rgba(255,255,255,0.05); padding: 4px 10px; border-radius:6px; font-size:12px; border: 1px solid var(--border-color);">${t.kategorie}</span></td>
                <td ${colorClass}>${t.typ === 'einnahme' ? 'EINNAHME' : 'AUSGABE'}</td>
                <td class="text-right" ${colorClass}>${t.typ === 'einnahme' ? '+' : '-'}€${t.betrag.toFixed(2)}</td>
            `;
            tableBody.appendChild(row);
        }
    });

    const balanceSum = incomeSum - expenseSum;
    if(document.getElementById('total-income')) document.getElementById('total-income').innerText = `€${incomeSum.toFixed(2)}`;
    if(document.getElementById('total-expenses')) document.getElementById('total-expenses').innerText = `€${expenseSum.toFixed(2)}`;
    
    const balanceElement = document.getElementById('total-balance');
    if(balanceElement) {
        balanceElement.innerText = `${balanceSum >= 0 ? '+' : ''}€${balanceSum.toFixed(2)}`;
        balanceElement.style.color = balanceSum >= 0 ? '#10b981' : '#ef4444';
    }

    if (activityList) {
        if (transactions.length === 0) {
            activityList.innerHTML = '<p class="empty-text">Noch keine Buchungen vorhanden.</p>';
        } else {
            activityList.innerHTML = '';
            transactions.slice(-4).reverse().forEach(t => {
                const item = document.createElement('div');
                item.style.display = 'flex';
                item.style.justifyContent = 'space-between';
                item.style.padding = '12px 0';
                item.style.borderBottom = '1px solid var(--border-color)';
                const prefix = t.typ === 'einnahme' ? '+' : '-';
                const color = t.typ === 'einnahme' ? '#10b981' : '#ef4444';
                item.innerHTML = `
                    <div>
                        <p style="font-size:14px; font-weight:500;">${t.beschreibung}</p>
                        <small style="color:#6b7280">${t.kategorie}</small>
                    </div>
                    <span style="color: ${color}; font-weight:600; font-size:14px;">${prefix}€${t.betrag.toFixed(2)}</span>
                `;
                activityList.appendChild(item);
            });
        }
    }

    renderBudgets(categoryExpenses);
    renderDonutChart(categoryExpenses, expenseSum);
    renderAIInsights(incomeSum, expenseSum, categoryExpenses);
}

// Restliche Render-Hilfsfunktionen unverändert...
