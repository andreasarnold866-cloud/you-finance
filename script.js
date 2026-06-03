// Globale States & Datenpersistenz
let transactions = JSON.parse(localStorage.getItem('premium_transactions')) || [];
let budgets = JSON.parse(localStorage.getItem('premium_budgets')) || {};
let isLoginMode = false;
let pendingUserEmail = "";

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
    
    // Auto-Scroll im Chatfenster beibehalten
    const chatBox = document.getElementById('ai-chat-box');
    if(chatBox) chatBox.scrollTop = chatBox.scrollHeight;
});

// Session Management Engine
function checkUserSession() {
    const activeUser = localStorage.getItem('active_user');
    if (activeUser) {
        document.getElementById('auth-screen').style.display = 'none';
        document.getElementById('app-screen').style.display = 'flex';
        
        const shortName = activeUser.split('@')[0];
        document.getElementById('user-display-name').innerText = shortName;
        document.getElementById('user-avatar-fallback').innerText = shortName.substring(0, 2).toUpperCase();
        
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
    const elements = {
        title: document.getElementById('auth-title'),
        subtitle: document.getElementById('auth-subtitle'),
        btn: document.getElementById('auth-submit-btn'),
        toggleText: document.getElementById('auth-toggle-text'),
        policies: document.getElementById('password-policies'),
        fields: document.getElementById('auth-form-fields'),
        verify: document.getElementById('verification-fields')
    };
    
    elements.fields.style.display = 'flex';
    elements.verify.style.display = 'none';
    
    if (isLoginMode) {
        elements.title.innerText = "Willkommen zurück";
        elements.subtitle.innerText = "Loggen Sie sich ein, um Ihren Workspace freizuschalten.";
        elements.btn.innerText = "Einloggen";
        elements.toggleText.innerHTML = 'Neu bei You Finance? <span onclick="toggleAuthMode()">Konto erstellen</span>';
        elements.policies.style.display = 'none';
    } else {
        elements.title.innerText = "Konto erstellen";
        elements.subtitle.innerText = "Starten Sie Ihre finanzielle Unabhängigkeit mit You Finance";
        elements.btn.innerText = "Registrieren";
        elements.toggleText.innerHTML = 'Bereits Mitglied? <span onclick="toggleAuthMode()">Jetzt einloggen</span>';
        elements.policies.style.display = 'block';
        validatePasswordLive();
    }
}

// Live Passwort-Validierungs-Regex
function validatePasswordLive() {
    if (isLoginMode) return { isValid: true };
    const val = document.getElementById('auth-password').value;

    const rules = {
        length: val.length >= 8,
        uppercase: /[A-Z]/.test(val),
        number: /[0-9]/.test(val),
        special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val)
    };

    updatePolicyUI('policy-length', rules.length, "Mindestens 8 Zeichen");
    updatePolicyUI('policy-uppercase', rules.uppercase, "Einen Großbuchstaben");
    updatePolicyUI('policy-number', rules.number, "Eine Zahl (0-9)");
    updatePolicyUI('policy-special', rules.special, "Ein Sonderzeichen (!@#$%^&*)");

    return { isValid: Object.values(rules).every(Boolean) };
}

function updatePolicyUI(id, isValid, text) {
    const el = document.getElementById(id);
    if (!el) return;
    el.className = isValid ? 'valid' : 'invalid';
    el.innerText = `${isValid ? '✓' : '❌'} ${text}`;
}

// Authentifizierungsprozess & Fake-2FA Sperre
function handleAuth() {
    const email = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value;
    
    if (!email || !password) {
        alert("Bitte füllen Sie alle erforderlichen Felder aus.");
        return;
    }
    
    if (isLoginMode) {
        const registeredPassword = localStorage.getItem(`user_${email}`);
        if (registeredPassword && registeredPassword === password) {
            localStorage.setItem('active_user', email);
            checkUserSession();
        } else {
            alert("Zugriff verweigert. Ungültige Anmeldedaten.");
        }
    } else {
        if (!validatePasswordLive().isValid) {
            alert("Sicherheitsstufe unzureichend. Bitte korrigieren Sie Ihr Passwort.");
            return;
        }
        if (localStorage.getItem(`user_${email}`)) {
            alert("Diese E-Mail-Adresse ist bereits vergeben.");
            return;
        }
        
        pendingUserEmail = email;
        localStorage.setItem(`user_temp_pwd`, password); 
        
        document.getElementById('auth-form-fields').style.display = 'none';
        document.getElementById('password-policies').style.display = 'none';
        document.getElementById('verification-fields').style.display = 'flex';
        document.getElementById('auth-title').innerText = "Identität bestätigen";
        document.getElementById('auth-subtitle').innerText = `Sicherheits-Token übermittelt an ${email}`;
    }
}

function confirmVerificationCode() {
    const code = document.getElementById('verify-code').value.trim();
    if (code === "123456") {
        const password = localStorage.getItem(`user_temp_pwd`);
        localStorage.setItem(`user_${pendingUserEmail}`, password);
        localStorage.setItem('active_user', pendingUserEmail);
        localStorage.removeItem(`user_temp_pwd`);
        checkUserSession();
    } else {
        alert("Token ungültig. Verwenden Sie für die Testumgebung: 123456");
    }
}

// Professioneller Bild-Upload & Skalierung über Canvas
function triggerAvatarUpload() {
    document.getElementById('avatar-input').click();
}

function updateAvatar(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            // Skalierung auf kompakte Maße für schnelles LocalStorage-Handling
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 120;
            canvas.height = 120;
            ctx.drawImage(img, 0, 0, 120, 120);
            
            const optimizedBase64 = canvas.toDataURL('image/jpeg', 0.8);
            const activeUser = localStorage.getItem('active_user');
            localStorage.setItem(`avatar_${activeUser}`, optimizedBase64);
            loadSavedAvatar();
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

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

// Fehlerfreier, Excel-konformer CSV Data Export
function exportToCSV() {
    if (transactions.length === 0) {
        alert("Keine Transaktionsdaten vorhanden.");
        return;
    }
    
    // UTF-8 BOM hinzufügen, damit Excel deutsche Sonderzeichen nativ erkennt
    let csvContent = "\uFEFF";
    csvContent += "Zeitpunkt;Beleg/Beschreibung;Kategorie;Typus;Betrag (EUR)\r\n";
    
    transactions.forEach(t => {
        const mathPrefix = t.typ === 'einnahme' ? "" : "-";
        csvContent += `${t.datum};${t.beschreibung};${t.kategorie};${t.typ.toUpperCase()};${mathPrefix}${t.betrag.toFixed(2)}\r\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `YouFinance_Ledger_Export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Interaktiver Live-KI-Chatbot
function sendAiMessage() {
    const inputEl = document.getElementById('ai-user-query');
    const query = inputEl.value.trim();
    if (!query) return;

    const chatBox = document.getElementById('ai-chat-box');
    
    // 1. User Message rendern
    const userMsg = document.createElement('div');
    userMsg.className = 'ai-msg user';
    userMsg.innerText = query;
    chatBox.appendChild(userMsg);
    inputEl.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    // Daten-Kontext für die KI aufbereiten
    let incomeSum = 0, expenseSum = 0;
    let categoryExpenses = { Freizeit: 0, Essen: 0, Wohnen: 0, Sonstiges: 0 };
    transactions.forEach(t => {
        if(t.typ === 'einnahme') incomeSum += t.betrag;
        else {
            expenseSum += t.betrag;
            if(categoryExpenses[t.kategorie] !== undefined) categoryExpenses[t.kategorie] += t.betrag;
        }
    });

    // 2. Antwort logisch berechnen (Kontextsensitive Realtime-Antworten)
    setTimeout(() => {
        const aiMsg = document.createElement('div');
        aiMsg.className = 'ai-msg system';
        
        let reply = "Ich habe Ihre Anfrage analysiert. ";
        const normalized = query.toLowerCase();

        if (normalized.includes('ausgaben') || normalized.includes('geld ausgegeben') || normalized.includes('kosten')) {
            reply += `Ihre aktuellen Gesamtausgaben belaufen sich auf €${expenseSum.toFixed(2)}. `;
            if (expenseSum > incomeSum) {
                reply += "Achtung: Sie leben aktuell über Ihren Verhältnissen, da die Ausgaben Ihre Einnahmen übersteigen.";
            } else {
                reply += "Das liegt im grünen Bereich im Verhältnis zu Ihren Einnahmen.";
            }
        } else if (normalized.includes('sparen') || normalized.includes('tipp') || normalized.includes('optimieren')) {
            const highestExpenseCat = Object.keys(categoryExpenses).reduce((a, b) => categoryExpenses[a] > categoryExpenses[b] ? a : b);
            if (categoryExpenses[highestExpenseCat] > 0) {
                reply += `Ihr größter Kostenfaktor liegt in der Kategorie *${highestExpenseCat}* (€${categoryExpenses[highestExpenseCat].toFixed(2)}). Hier empfehle ich eine Budgetgrenze einzurichten, um monatlich rund 15% mehr Liquidität freizusetzen.`;
            } else {
                reply += "Da Sie noch keine signifikanten Ausgaben verbucht haben, ist Ihre Sparquote aktuell optimal.";
            }
        } else if (normalized.includes('budget')) {
            if (Object.keys(budgets).length > 0) {
                reply += `Sie überwachen aktuell ${Object.keys(budgets).length} Budgets. Halten Sie sich strikt an die Schwellenwerte im Budget-Planer.`;
            } else {
                reply += "Sie haben noch keine Budgets definiert. Nutzen Sie den Reiter 'Budgetplaner', um Ausgabenlimits für Lebensmittel oder Freizeit festzulegen.";
            }
        } else {
            reply += `Basierend auf Ihrer Bilanz (Einnahmen: €${incomeSum.toFixed(2)}, Ausgaben: €${expenseSum.toFixed(2)}) stehen Ihnen alle Kontrollen offen. Haben Sie spezifische Fragen zu Ihren Fixkosten oder Ihrer Sparquote?`;
        }

        aiMsg.innerHTML = `✨ <strong>KI-Consultant:</strong> ${reply}`;
        chatBox.appendChild(aiMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 650);
}

// Präzise HTML5 Canvas Donut Chart Rendering Engine
function renderDonutChart(categoryExpenses, totalExpense) {
    const canvas = document.getElementById('chart-canvas');
    const legend = document.getElementById('chart-legend');
    const centerLabel = document.getElementById('chart-center-label');
    if (!canvas || !legend) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (totalExpense === 0) {
        ctx.beginPath();
        ctx.arc(75, 75, 65, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(255,255,255,0.05)';
        ctx.lineWidth = 14;
        ctx.stroke();
        legend.innerHTML = '<p class="empty-text" style="padding:0">Keine Daten verfügbar</p>';
        if(centerLabel) centerLabel.innerHTML = 'Ausgaben<br><strong style="color:#fff">€0.00</strong>';
        return;
    }

    if(centerLabel) centerLabel.innerHTML = `Gesamt<br><strong style="color:#fff; font-size:14px;">€${totalExpense.toFixed(0)}</strong>`;
    legend.innerHTML = '';

    let startAngle = -0.5 * Math.PI;

    for (let kat in categoryExpenses) {
        const value = categoryExpenses[kat];
        if (value === 0) continue;
        
        const sliceAngle = (value / totalExpense) * 2 * Math.PI;
        const percent = (value / totalExpense) * 100;
        const color = categoryColors[kat] || '#fff';

        // Kreissegment zeichnen
        ctx.beginPath();
        ctx.arc(75, 75, 65, startAngle, startAngle + sliceAngle);
        ctx.strokeStyle = color;
        ctx.lineWidth = 14;
        ctx.stroke();

        startAngle += sliceAngle;

        // Legende rendern
        const legItem = document.createElement('div');
        legItem.className = 'legend-item';
        legItem.innerHTML = `
            <div class="legend-color" style="background: ${color}"></div>
            <span style="color:#fff; font-weight:500;">${kat}</span> 
            <span style="color:var(--text-muted)">(€${value.toFixed(0)} / ${percent.toFixed(0)}%)</span>
        `;
        legend.appendChild(legItem);
    }
}

// Datenfluss & UI Synchronisierung
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
            const isInc = t.typ === 'einnahme';
            const color = isInc ? '#10b981' : '#ef4444';
            row.innerHTML = `
                <td><strong>${t.beschreibung}</strong><br><small style="color:#6b7280">${t.datum}</small></td>
                <td><span style="background: rgba(255,255,255,0.03); padding: 4px 10px; border-radius:6px; font-size:12px; border: 1px solid var(--border-color);">${t.kategorie}</span></td>
                <td style="color: ${color}; font-weight:600; font-size:12px;">${t.typ.toUpperCase()}</td>
                <td class="text-right" style="color: ${color}; font-weight:600;">${isInc ? '+' : '-'}€${t.betrag.toFixed(2)}</td>
            `;
            tableBody.appendChild(row);
        }
    });

    const balanceSum = incomeSum - expenseSum;
    if(document.getElementById('total-income')) document.getElementById('total-income').innerText = `€${incomeSum.toFixed(2)}`;
    if(document.getElementById('total-expenses')) document.getElementById('total-expenses').innerText = `€${expenseSum.toFixed(2)}`;
    
    const balanceElement = document.getElementById('total-balance');
    const trendLabel = document.getElementById('trend-label');
    if(balanceElement) {
        balanceElement.innerText = `${balanceSum >= 0 ? '+' : ''}€${balanceSum.toFixed(2)}`;
        balanceElement.style.color = balanceSum >= 0 ? '#10b981' : '#ef4444';
        if(trendLabel) trendLabel.innerText = balanceSum >= 0 ? "Stabile Kapitalbasis" : "Kapitalerodierung";
    }

    if (activityList) {
        if (transactions.length === 0) {
            activityList.innerHTML = '<p class="empty-text">Keine Buchungsdaten erfasst.</p>';
        } else {
            activityList.innerHTML = '';
            transactions.slice(-4).reverse().forEach(t => {
                const item = document.createElement('div');
                item.style.cssText = "display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--border-color);";
                const isInc = t.typ === 'einnahme';
                item.innerHTML = `
                    <div>
                        <p style="font-size:14px; font-weight:500;">${t.beschreibung}</p>
                        <small style="color:#6b7280">${t.kategorie}</small>
                    </div>
                    <span style="color: ${isInc ? '#10b981' : '#ef4444'}; font-weight:600; font-size:14px;">${isInc ? '+' : '-'}€${t.betrag.toFixed(2)}</span>
                `;
                activityList.appendChild(item);
            });
        }
    }

    renderBudgets(categoryExpenses);
    renderDonutChart(categoryExpenses, expenseSum);
}

function renderBudgets(categoryExpenses) {
    const budgetContainer = document.getElementById('budget-progress-container');
    if (!budgetContainer) return;
    if (Object.keys(budgets).length === 0) {
        budgetContainer.innerHTML = '<p class="empty-text">Keine aktiven Limitierungen zugewiesen.</p>';
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
                <div style="background: #111827; height: 6px; border-radius: 3px; overflow: hidden;">
                    <div style="background: ${barColor}; width: ${percent}%; height: 100%; transition: width 0.3s;"></div>
                </div>
            `;
            budgetContainer.appendChild(bBox);
        }
    }
}

function addTransaction() {
    const beschreibung = document.getElementById('beschreibung').value.trim();
    const betrag = parseFloat(document.getElementById('betrag').value);
    const typ = document.getElementById('typ').value;
    const kategorie = document.getElementById('kategorie').value;

    if (!beschreibung || isNaN(betrag) || betrag <= 0) {
        alert('Eingabe ungültig. Beschreibung und positiver Betrag erforderlich.');
        return;
    }

    transactions.push({
        id: Date.now(),
        beschreibung,
        betrag,
        typ,
        kategorie,
        datum: new Date().toLocaleDateString('de-DE')
    });

    localStorage.setItem('premium_transactions', JSON.stringify(transactions));
    document.getElementById('beschreibung').value = '';
    document.getElementById('betrag').value = '';
    updateUI();
}

function setBudget() {
    const kat = document.getElementById('budget-kategorie').value;
    const limit = parseFloat(document.getElementById('budget-limit').value);
    if (isNaN(limit) || limit <= 0) {
        alert('Geben Sie einen validen Schwellenwert ein.');
        return;
    }
    budgets[kat] = limit;
    localStorage.setItem('premium_budgets', JSON.stringify(budgets));
    document.getElementById('budget-limit').value = '';
    updateUI();
}

function openTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active-content'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active-content');
    document.getElementById(`btn-${tabId}`).classList.add('active');
}

function initLiveDateAndCalendar() {
    const heute = new Date();
    const sub = document.getElementById('live-subtitle-date');
    if (sub) sub.innerText = heute.toLocaleDateString('de-DE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const calHeader = document.getElementById('calendar-month-year');
    if (calHeader) calHeader.innerText = heute.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' });

    const grid = document.getElementById('calendar-days-grid');
    if (grid) {
        grid.innerHTML = '';
        const year = heute.getFullYear();
        const month = heute.getMonth();
        let firstDay = new Date(year, month, 1).getDay();
        firstDay = firstDay === 0 ? 6 : firstDay - 1;
        const totalDays = new Date(year, month + 1, 0).getDate();
        
        for (let i = 0; i < firstDay; i++) grid.appendChild(document.createElement('div'));
        for (let tag = 1; tag <= totalDays; tag++) {
            const el = document.createElement('div');
            el.innerText = tag;
            if (tag === heute.getDate()) el.className = 'today';
            grid.appendChild(el);
        }
    }
}

function logout() {
    localStorage.removeItem('active_user');
    checkUserSession();
}
