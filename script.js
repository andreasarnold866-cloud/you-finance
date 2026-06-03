// Daten-Speicher laden (oder leer starten, wenn neu)
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let budgets = JSON.parse(localStorage.getItem('budgets')) || {};

// Beim Start der Website alles direkt anzeigen
updateUI();

// 1. Tab-Wechsel-Funktion
function openTab(tabId) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active-content'));

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(button => button.classList.remove('active'));

    document.getElementById(tabId).classList.add('active-content');
    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('active');
    }
}

// 2. Transaktion hinzufügen
function addTransaction() {
    const beschreibung = document.getElementById('beschreibung').value;
    const betrag = parseFloat(document.getElementById('betrag').value);
    const typ = document.getElementById('typ').value;
    const kategorie = document.getElementById('kategorie').value;

    if (!beschreibung || isNaN(betrag) || betrag <= 0) {
        alert('Bitte gib eine gültigkeit Beschreibung und einen Betrag ein.');
        return;
    }

    const transaction = {
        id: Date.now(),
        beschreibung,
        betrag,
        typ,
        kategorie
    };

    transactions.push(transaction);
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // Felder leeren
    document.getElementById('beschreibung').value = '';
    document.getElementById('betrag').value = '';

    updateUI();
}

// 3. Budget festlegen
function setBudget() {
    const kat = document.getElementById('budget-kategorie').value;
    const limit = parseFloat(document.getElementById('budget-limit').value);

    if (isNaN(limit) || limit <= 0) {
        alert('Bitte ein gültiges Budgetlimit eingeben.');
        return;
    }

    budgets[kat] = limit;
    localStorage.setItem('budgets', JSON.stringify(budgets));
    
    document.getElementById('budget-limit').value = '';
    updateUI();
}

// 4. Benutzeroberfläche komplett neu berechnen und zeichnen
function updateUI() {
    let incomeSum = 0;
    let expenseSum = 0;
    let categoryExpenses = { Freizeit: 0, Essen: 0, Wohnen: 0, Sonstiges: 0 };

    // Tabellen-Inhalt leeren
    const tableBody = document.getElementById('transaction-table-body');
    const activityList = document.getElementById('recent-activity-list');
    if(tableBody) tableBody.innerHTML = '';
    
    // Berechnungen durchführen
    transactions.forEach(t => {
        if (t.typ === 'einnahme') {
            incomeSum += t.betrag;
        } else {
            expenseSum += t.betrag;
            if (categoryExpenses[t.kategorie] !== undefined) {
                categoryExpenses[t.kategorie] += t.betrag;
            }
        }

        // Zeile für Tabelle bauen
        if(tableBody) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${t.beschreibung}</td>
                <td><span class="tag">${t.kategorie}</span></td>
                <td style="color: ${t.typ === 'einnahme' ? '#00bfa5' : '#ff5252'}">${t.typ.toUpperCase()}</td>
                <td style="color: ${t.typ === 'einnahme' ? '#00bfa5' : '#ff5252'}">${t.typ === 'einnahme' ? '+' : '-'}€${t.betrag.toFixed(2)}</td>
            `;
            tableBody.appendChild(row);
        }
    });

    // Dashboard-Karten aktualisieren
    const balanceSum = incomeSum - expenseSum;
    
    if(document.getElementById('total-income')) document.getElementById('total-income').innerText = `€${incomeSum.toFixed(2)}`;
    if(document.getElementById('total-expenses')) document.getElementById('total-expenses').innerText = `€${expenseSum.toFixed(2)}`;
    
    const balanceElement = document.getElementById('total-balance');
    if(balanceElement) {
        balanceElement.innerText = `${balanceSum >= 0 ? '+' : ''}€${balanceSum.toFixed(2)}`;
        balanceElement.style.color = balanceSum >= 0 ? '#00bfa5' : '#ff5252';
    }

    // Aktivitäten-Kurzübersicht auf der Startseite
    if(activityList) {
        if(transactions.length === 0) {
            activityList.innerHTML = '<p class="empty-text">Noch keine Buchungen vorhanden.</p>';
        } else {
            activityList.innerHTML = '';
            // Die letzten 3 Transaktionen anzeigen
            transactions.slice(-3).reverse().forEach(t => {
                const item = document.createElement('p');
                item.style.padding = '8px 0';
                item.style.borderBottom = '1px solid #2a2a2a';
                item.innerHTML = `<strong>${t.beschreibung}</strong> (${t.kategorie}): <span style="color: ${t.typ === 'einnahme' ? '#00bfa5' : '#ff5252'}">${t.typ === 'einnahme' ? '+' : '-'}€${t.betrag.toFixed(2)}</span>`;
                activityList.appendChild(item);
            });
        }
    }

    // Budget-Fortschrittsbalken zeichnen
    const budgetContainer = document.getElementById('budget-progress-container');
    if(budgetContainer) {
        if(Object.keys(budgets).length === 0) {
            budgetContainer.innerHTML = '<p class="empty-text">Noch keine Budgets definiert.</p>';
        } else {
            budgetContainer.innerHTML = '';
            for (let kat in budgets) {
                const limit = budgets[kat];
                const spent = categoryExpenses[kat] || 0;
                const percent = Math.min((spent / limit) * 100, 100);
                const barColor = percent >= 100 ? '#ff5252' : percent >= 80 ? '#ffb300' : '#00bfa5';

                const bBox = document.createElement('div');
                bBox.style.marginBottom = '15px';
                bBox.innerHTML = `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 14px;">
                        <span><strong>${kat}</strong></span>
                        <span>€${spent.toFixed(2)} von €${limit.toFixed(2)} verbraucht</span>
                    </div>
                    <div style="background: #2a2a2a; height: 10px; border-radius: 5px; overflow: hidden;">
                        <div style="background: ${barColor}; width: ${percent}%; height: 100%; transition: width 0.3s;"></div>
                    </div>
                `;
                budgetContainer.appendChild(bBox);
            }
        }
    }
}
