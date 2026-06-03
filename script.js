let transactions = JSON.parse(localStorage.getItem('premium_transactions')) || [];
let budgets = JSON.parse(localStorage.getItem('premium_budgets')) || {};

let isLoginMode = false;
let pendingUserEmail = ""; // Zwischenspeicher während Verifizierung

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
        
        const shortName = activeUser.split('@')[0];
        document.getElementById('user-display-name').innerText = shortName;
        
        // Initialen-Fallback bauen
        document.getElementById('user-avatar-fallback').innerText = shortName.substring(0, 2).toUpperCase();
        
        // Gespeichertes Profilbild laden
        loadSavedAvatar();
        updateUI();
    } else {
        document.getElementById('auth-screen').style.display = 'flex';
        document.getElementById('app-screen').style.display = 'none';
        validatePasswordLive();
    }
}

function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    
    const title = document.getElementById('auth-title');
    const subtitle = document.getElementById('auth-subtitle');
    const btn = document.getElementById('auth-submit-btn');
    const toggleText = document.getElementById('auth-toggle-text');
    const policyBox = document.getElementById('password-policies');
    
    // Eingabefelder zurücksetzen
    document.getElementById('auth-form-fields').style.display = 'flex';
    document.getElementById('verification-fields').style.display = 'none';
    
    if (isLoginMode) {
        title.innerText = "Willkommen zurück";
        subtitle.innerText = "Logge dich ein, um deine Finanzen zu verwalten";
        btn.innerText = "Einloggen";
        toggleText.innerHTML = 'Neu bei You Finance? <span onclick="toggleAuthMode()">Konto erstellen</span>';
        if (policyBox) policyBox.style.display = 'none';
    } else {
        title.innerText = "Konto erstellen";
        subtitle.innerText = "Starte deine finanzielle Unabhängigkeit mit You Finance";
        btn.innerText = "Registrieren";
        toggleText.innerHTML = 'Bereits Mitglied? <span onclick="toggleAuthMode()">Jetzt einloggen</span>';
        if (policyBox) policyBox.style.display = 'block';
        validatePasswordLive();
    }
}

// Live-Sicherheitsprüfung
function validatePasswordLive() {
    if (isLoginMode) return { isValid: true };
    const val = document.getElementById('auth-password').value;

    const hasLength = val.length >= 8;
    const hasUpper = /[A-Z]/.test(val);
    const hasNumber = /[0-9]/.test(val);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val);

    updatePolicyUI('policy-length', hasLength, "Mindestens 8 Zeichen");
    updatePolicyUI('policy-uppercase', hasUpper, "Einen Großbuchstaben");
    updatePolicyUI('policy-number', hasNumber, "Eine Zahl (0-9)");
    updatePolicyUI('policy-special', hasSpecial, "Ein Sonderzeichen (!@#$%^&*)");

    return { isValid: (hasLength && hasUpper && hasNumber && hasSpecial) };
}

function updatePolicyUI(id, isValid, text) {
    const el = document.getElementById(id);
    if (!el) return;
    el.className = isValid ? 'valid' : 'invalid';
    el.innerText = `${isValid ? '✓' : '❌'} ${text}`;
}

// Authentifizierungsprozess
function handleAuth() {
    const email = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value;
    
    if (!email || !password) {
        alert("Bitte fülle alle Felder aus.");
        return;
    }
    
    if (isLoginMode) {
        // Login direkt prüfen
        const registeredPassword = localStorage.getItem(`user_${email}`);
        if (registeredPassword && registeredPassword === password) {
            localStorage.setItem('active_user', email);
            checkUserSession();
        } else {
            alert("Falsche Anmeldedaten.");
        }
    } else {
        // Registrierungsprüfung
        const check = validatePasswordLive();
        if (!check.isValid) {
            alert("Dein Passwort erfüllt die Sicherheitskriterien nicht.");
            return;
        }

        if (localStorage.getItem(`user_${email}`)) {
            alert("Diese E-Mail-Adresse wird bereits verwendet.");
            return;
        }
        
        // Nutzer temporär merken & Verifizierung einblenden
        pendingUserEmail = email;
        localStorage.setItem(`user_temp_pwd`, password); 
        
        // Formular umschalten
        document.getElementById('auth-form-fields').style.display = 'none';
        document.getElementById('password-policies').style.display = 'none';
        document.getElementById('verification-fields').style.display = 'flex';
        document.getElementById('auth-title').innerText = "Code verifizieren";
        document.getElementById('auth-subtitle').innerText = `Verifizierungslink an ${email} gesendet.`;
    }
}

// Codebestätigung
function confirmVerificationCode() {
    const codeInput = document.getElementById('verify-code').value.trim();
    
    if (codeInput === "123456") {
        const password = localStorage.getItem(`user_temp_pwd`);
        
        localStorage.setItem(`user_${pendingUserEmail}`, password);
        localStorage.setItem('active_user', pendingUserEmail);
        
        localStorage.removeItem(`user_temp_pwd`);
        alert("E-Mail erfolgreich verifiziert! Willkommen an Bord.");
        checkUserSession();
    } else {
        alert("Ungültiger Verifizierungscode. Nutze das Test-Token: 123456");
    }
}

// Profilbild-Upload ansteuern
function triggerAvatarUpload() {
    document.getElementById('avatar-input').click();
}

// Profilbild verarbeiten & im LocalStorage sichern
function updateAvatar(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const base64Image = e.target.result;
        const activeUser = localStorage.getItem('active_user');
        
        // Speichere das Bild spezifisch für den aktuellen Benutzer ab
        localStorage.setItem(`avatar_${activeUser}`, base64Image);
        loadSavedAvatar();
    };
    reader.readAsDataURL(file);
}

// Gespeichertes Profilbild laden
function loadSavedAvatar() {
    const activeUser = localStorage.getItem('active_user');
    const savedAvatar = localStorage.getItem(`avatar_${activeUser}`);
    
    const imgEl = document.getElementById('user-avatar-img');
    const fallbackEl = document.getElementById('user-avatar-fallback');
    
    if (savedAvatar) {
        imgEl.src = savedAvatar;
        imgEl.style.display = 'block';
        fallbackEl.style.display = 'none';
    } else {
        imgEl.style.display = 'none';
        fallbackEl.style.display = 'flex';
    }
}

// CSV Export Funktion
function exportToCSV() {
    if (transactions.length === 0) {
        alert("Keine Transaktionsdaten zum Exportieren vorhanden.");
        return;
    }
    
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Datum;Beschreibung;Kategorie;Typ;Betrag\r\n";
    
    transactions.forEach(t => {
        const prefix = t.typ === 'einnahme' ? "" : "-";
        csvContent += `${t.datum};${t.beschreibung};${t.kategorie};${t.typ.toUpperCase()};${prefix}${t.betrag.toFixed(2)}\r\n`;
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `YouFinance_Export_${new Date().toLocaleDateString('de-DE')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function logout() {
    localStorage.removeItem('active_user');
    document.getElementById('auth-email').value = '';
    document.getElementById('auth-password').value = '';
    document.getElementById('verify-code').value = '';
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
    if (calendarHeader) calendarHeader.innerText = hoy = heute.toLocaleDateString('de-DE', monatsOptionen);

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

function renderBudgets(categoryExpenses) {
    const budgetContainer = document.getElementById('budget-progress-container');
    if (!budgetContainer) return;
    if (Object.keys(budgets).length === 0) {
        budgetContainer.innerHTML = '<p class="empty-text">Noch keine Budgets definiert.</p>';
    } else {
        budgetContainer.innerHTML = '';
        for (let kat in budgets) {
            const limit = budgets[kat];
            const spent = categoryExpenses[kat] || 0;
            const percent = Math.min((spent / limit) * 100, 100);
            const barColor = percent >= 100 ? '#ef4444' : percent >= 85 ? '#f59e0b' : '#6366f1';

            const bBox = document.createElement('div');
            bBox.className = 'budget-bar-wrapper';
            bBox.innerHTML = `
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px;">
                    <span><strong>${kat}</strong></span>
                    <span style="color: var(--text-muted)">€${spent.toFixed(2)} / <strong style="color:#fff">€${limit.toFixed(2)}</strong></span>
                </div>
                <div style="background: #111827; height: 8px; border-radius: 4px; overflow: hidden;">
                    <div style="background: ${barColor}; width: ${percent}%; height: 100%; transition: width 0.4s ease-out;"></div>
                </div>
            `;
            budgetContainer.appendChild(bBox);
        }
    }
}

function renderDonutChart(categoryExpenses, totalExpense) {
    const chart = document.getElementById('donut-chart-element');
    const legend = document.getElementById('chart-legend');
    const centerLabel = document.getElementById('chart-center-label');
    if (!chart || !legend) return;
    if (totalExpense === 0) {
        chart.style.background = `conic-gradient(rgba(255,255,255,0.05) 0% 100%)`;
        legend.innerHTML = '<p class="empty-text" style="padding:0">Keine Daten vorhanden</p>';
        if(centerLabel) centerLabel.innerHTML = 'Ausgaben<br><strong style="color:#fff">€0.00</strong>';
        return;
    }
    if(centerLabel) centerLabel.innerHTML = `Gesamt<br><strong style="color:#fff; font-size:14px;">€${totalExpense.toFixed(0)}</strong>`;

    let currentPercent = 0;
    let gradientStrings = [];
    legend.innerHTML = '';

    for (let kat in categoryExpenses) {
        const value = categoryExpenses[kat];
        if (value === 0) continue;
        const percent = (value / totalExpense) * 100;
        const color = categoryColors[kat] || '#fff';
        gradientStrings.push(`${color} ${currentPercent}% ${currentPercent + percent}%`);
        currentPercent += percent;

        const legItem = document.createElement('div');
        legItem.className = 'legend-item';
        legItem.innerHTML = `
            <div class="legend-color" style="background: ${color}"></div>
            <span style="color:#fff; font-weight:500;">${kat}</span> 
            <span style="color:var(--text-muted)">(${percent.toFixed(0)}%)</span>
        `;
        legend.appendChild(legItem);
    }
    chart.style.background = `conic-gradient(${gradientStrings.join(', ')})`;
}

function renderAIInsights(income, expense, catExpenses) {
    const aiBox = document.getElementById('ai-insights-content');
    if (!aiBox) return;
    if (income === 0 && expense === 0) return;
    let text = "";
    const quote = income > 0 ? ((income - expense) / income) * 100 : 0;
    if (expense > income && income > 0) {
        text = `⚠️ <strong>Kritischer Status:</strong> Deine Ausgaben übersteigen deine Einnahmen. Reduziere temporär Kosten im Bereich <em>"${Object.keys(catExpenses).reduce((a, b) => catExpenses[a] > catExpenses[b] ? a : b)}"</em>.`;
    } else if (quote > 30) {
        text = `🚀 <strong>Exzellente Sparquote!</strong> Du sparst aktuell ${quote.toFixed(0)}% deines Einkommens. Überlege dir, diesen Überschuss automatisiert zu investieren.`;
    } else {
        text = `💡 <strong>Optimierungspotenzial:</strong> Setze dir feste Budget-Limits für <em>${Object.keys(catExpenses).reduce((a, b) => catExpenses[a] > catExpenses[b] ? a : b)}</em>, um deine Sparquote leicht auf über 25% anzuheben.`;
    }
    aiBox.innerHTML = `<p class="ai-text">${text}</p>`;
}
