const App = (() => {
    
    const dictionary = {
        de: {
            title: "Konto erstellen", subtitle: "Sichern Sie sich den Zugang zu Ihren Finanzen.",
            btnGoogleReg: "Mit Google fortfahren", btnAppleReg: "Mit Apple fortfahren", orText: "ODER",
            userL: "Benutzername", emailL: "E-Mail-Adresse", passL: "Sicheres Passwort",
            polLen: "Mindestens 8 Zeichen", polNum: "Mindestens 1 Zahl", polSpec: "Mindestens 1 Sonderzeichen",
            btnReg: "Registrieren", txtHaveAcc: "Bereits ein Konto?", lnkLogin: "Hier anmelden",
            vTitle: "E-Mail verifizieren", vDesc: "Wir haben einen Sicherheitscode an Ihre E-Mail gesendet.",
            codeL: "6-stelliger Code", btnVer: "Code verifizieren", errFields: "Bitte erfüllen Sie alle Passwort-Kriterien.",
            errCode: "Falscher Code. Bitte versuchen Sie es erneut.", successVer: "Erfolgreich! Daten werden gesichert...",
            loginT: "Willkommen zurück", loginSub: "Melden Sie sich mit Ihren Daten an.", btnLog: "Anmelden",
            txtNewHere: "Neu hier?", lnkRegister: "Konto erstellen", errLogin: "Ungültige Anmeldedaten.",
            navDash: "Cockpit", dashWelcome: "Finanzintelligenz",
            txtSettingsTitle: "Kontoverwaltung & Einstellungen",
            txtSettingsDesc: "Passen Sie Ihre Identität und regionalen Parameter an.", 
            btnPremium: "Änderungen speichern", btnClose: "Schließen",
            lblModalLang: "System-Sprache", lblChangeAvatar: "Profilbild ändern (Avatar)",
            lblSetUser: "Nutzernamen ändern", lblSetEmail: "E-Mail-Adresse ändern",
            btnDeleteAcc: "Konto permanent löschen", successSave: "Änderungen erfolgreich übernommen!"
        },
        en: {
            title: "Create account", subtitle: "Secure your access to personal wealth.",
            btnGoogleReg: "Continue with Google", btnAppleReg: "Continue with Apple", orText: "OR",
            userL: "Username", emailL: "Email address", passL: "Secure password",
            polLen: "At least 8 characters", polNum: "At least 1 number", polSpec: "At least 1 special character",
            btnReg: "Register", txtHaveAcc: "Already have an account?", lnkLogin: "Sign in here",
            vTitle: "Verify Email", vDesc: "We have sent a security code to your email address.",
            codeL: "6-digit code", borderV: "Verify Code", errFields: "Please fulfill all password criteria.",
            errCode: "Invalid code. Please try again.", successVer: "Success! Saving data architecture...",
            loginT: "Welcome Back", loginSub: "Sign in to manage your ecosystem.", btnLog: "Sign In",
            txtNewHere: "New here?", lnkRegister: "Create account", errLogin: "Invalid credentials.",
            navDash: "Cockpit", dashWelcome: "Financial Intelligence",
            txtSettingsTitle: "Account Management & Settings",
            txtSettingsDesc: "Customize your personal identity and regional settings.", 
            btnPremium: "Save Changes", btnClose: "Close",
            lblModalLang: "System Language", lblChangeAvatar: "Change Avatar Icon",
            lblSetUser: "Change Username", lblSetEmail: "Change Email Address",
            btnDeleteAcc: "Permanently Delete Account", successSave: "Settings saved successfully!"
        }
    };

    let state = {
        isPasswordValid: false,
        activeLanguage: "de",
        connectedBanks: 3,
        totalBalance: 14850.00,
        registeredUser: { username: "Premium_User", email: "analyst@youfinance.com", pass: "SecurePass123!", avatar: "💼" },
        contracts: [
            { id: 1, name: "Netflix Premium", category: "Entertainment", price: 19.99, icon: "🍿", interval: "monatlich", deadline: "In 12 Tagen" },
            { id: 2, name: "McFit Premium", category: "Fitness", price: 24.98, icon: "💪", interval: "monatlich", deadline: "In 28 Tagen (Kündbar)" },
            { id: 3, name: "Spotify Family", category: "Streaming", price: 17.99, icon: "🎵", interval: "monatlich", deadline: "In 5 Tagen" }
        ]
    };

    const initSecurityDiagnostics = () => {
        const passInput = document.getElementById('password');
        if (!passInput) return;
        passInput.addEventListener('input', (e) => {
            const stream = e.target.value;
            const metrics = { length: stream.length >= 8, num: /\d/.test(stream), spec: /[!@#$%^&*(),.?":{}|<>_]/.test(stream) };
            updateNodeState('req-length', metrics.length);
            updateNodeState('req-num', metrics.num);
            updateNodeState('req-spec', metrics.spec);

            const activeScore = Object.values(metrics).filter(Boolean).length;
            const meterBar = document.getElementById('strengthBar');
            if(activeScore === 0) meterBar.style.width = '0%';
            else if(activeScore === 1) { meterBar.style.width = '33%'; meterBar.style.backgroundColor = 'var(--sys-error)'; }
            else if(activeScore === 2) { meterBar.style.width = '66%'; meterBar.style.backgroundColor = '#f59e0b'; }
            else if(activeScore === 3) { meterBar.style.width = '100%'; meterBar.style.backgroundColor = 'var(--sys-primary)'; }
            state.isPasswordValid = (activeScore === 3);
        });
    };

    const updateNodeState = (targetId, isConditionMet) => {
        const node = document.getElementById(targetId);
        if (node) node.className = isConditionMet ? 'policy-node valid' : 'policy-node invalid';
    };

    const navigateToComponent = (targetCardId) => {
        ['registerCard', 'verifyCard', 'loginCard', 'dashboardPage'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.className = (id === targetCardId) ? 'surface-card' : 'surface-card hidden';
        });
        if (targetCardId === 'dashboardPage') {
            document.getElementById('dashboardPage').className = 'dashboard-surface';
        }
    };

    // FINANZGURU SPECIAL: Live-Vertragsrenderung mit Kündigungs-Logik
    const renderContracts = () => {
        const container = document.getElementById('contract-list');
        if (!container) return;
        container.innerHTML = "";

        if(state.contracts.length === 0) {
            container.innerHTML = `<div class="contract-item"><p style="color:var(--sys-text-low); font-size:0.85rem;">🎉 Keine aktiven Fixkosten-Abos mehr gefunden!</p></div>`;
            return;
        }

        state.contracts.forEach(contract => {
            const item = document.createElement('div');
            item.className = "contract-item";
            item.innerHTML = `
                <div class="contract-meta">
                    <div class="contract-icon-box">${contract.icon}</div>
                    <div>
                        <span class="contract-name">${contract.name}</span>
                        <span class="contract-deadline">${contract.deadline} • ${contract.interval}</span>
                    </div>
                </div>
                <div class="contract-action-side">
                    <span class="contract-price">€ ${contract.price.toFixed(2)}</span>
                    <button class="btn-cancel-contract" onclick="App.Features.cancelContract(${contract.id})">Kündigen</button>
                </div>
            `;
            container.appendChild(item);
        });

        // Berechne aggregierte Abo-Fixkosten neu
        const totalFix = state.contracts.reduce((sum, c) => sum + c.price, 0);
        document.getElementById('val-fix-expenses').innerText = `€ ${totalFix.toFixed(2)}`;
        
        // Berechne KI-Finanzscore dynamisch basierend auf verbliebenen Abos
        const dynamicScore = Math.min(100, 75 + (5 - state.contracts.length) * 5);
        document.getElementById('val-health-score').innerText = `${dynamicScore}%`;
        
        // KI-Insight Engine füttern
        const insightText = document.getElementById('ai-insight-text');
        if(state.contracts.length > 2) {
            insightText.innerText = `Achtung: Du hast ${state.contracts.length} aktive Streaming- und Fitnessabos. Durch die Kündigung von "${state.contracts[0].name}" sparst du jährlich € ${(state.contracts[0].price * 12).toFixed(2)}!`;
        } else if(state.contracts.length > 0) {
            insightText.innerText = `Sehr gut! Deine Fixkostenstruktur ist schlank. Der Finanz-Health-Score ist auf ${dynamicScore}% gestiegen.`;
        } else {
            insightText.innerText = `Phänomenal! Du hast alle unbemerkt laufenden Fixkosten eliminiert. Maximales Sparpotenzial aktiviert.`;
        }
    };

    const cancelContract = (id) => {
        const target = state.contracts.find(c => c.id === id);
        if(confirm(`Finanzguru Smart-Kündigung aktivieren: Möchten Sie den Vertrag bei "${target.name}" rechtssicher über unsere Schnittstelle kündigen?`)) {
            state.contracts = state.contracts.filter(c => c.id !== id);
            renderContracts();
        }
    };

    // IDEE: Multi-Banken-Verknüpfung (Mocking PSD2 API)
    const syncNewBank = () => {
        const bankName = prompt("Welche Bank oder Depot möchten Sie verschlüsselt hinzufügen? (z.B. Sparkasse, Volksbank, Trade Republic, N26)");
        if(bankName) {
            state.connectedBanks += 1;
            const extraBalance = Math.floor(Math.random() * 4000) + 1500;
            state.totalBalance += extraBalance;
            
            document.getElementById('val-total-balance').innerText = `€ ${state.totalBalance.toLocaleString('de-DE', {minimumFractionDigits: 2})}`;
            document.getElementById('bank-count-badge').innerText = `${state.connectedBanks} Banken verbunden`;
            alert(`Schnittstelle stabil! ${bankName} erfolgreich ausgelesen. € ${extraBalance.toFixed(2)} Guthaben importiert.`);
        }
    };

    const executeRegister = (event) => {
        event.preventDefault();
        if (!state.isPasswordValid) return alert(dictionary[state.activeLanguage].errFields);
        state.registeredUser = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            pass: document.getElementById('password').value,
            avatar: "💼"
        };
        navigateToComponent('verifyCard');
    };

    const executeVerify = (event) => {
        event.preventDefault();
        if (document.getElementById('verifyCode').value === "123456") {
            const anchor = document.getElementById('verifyStatus');
            anchor.className = "feedback-anchor success";
            anchor.innerText = dictionary[state.activeLanguage].successVer;
            setTimeout(() => navigateToComponent('loginCard'), 1000);
        } else {
            document.getElementById('verifyStatus').innerText = dictionary[state.activeLanguage].errCode;
        }
    };

    const executeLogin = (event) => {
        event.preventDefault();
        const id = document.getElementById('loginIdentifier').value;
        const pass = document.getElementById('loginPassword').value;
        if (state.registeredUser && (id === state.registeredUser.username || id === state.registeredUser.email) && pass === state.registeredUser.pass) {
            syncUserDOM();
            renderContracts();
            navigateToComponent('dashboardPage');
        } else {
            document.getElementById('loginStatus').innerText = dictionary[state.activeLanguage].errLogin;
        }
    };

    const executeOAuth = (provider) => {
        state.registeredUser = { username: `${provider}_User`, email: `${provider.toLowerCase()}@oauth.com`, pass: "OAuth_Token_2026", avatar: "🚀" };
        syncUserDOM();
        renderContracts();
        navigateToComponent('dashboardPage');
    };

    const syncUserDOM = () => {
        if (!state.registeredUser) return;
        document.getElementById('dash-username').innerText = state.registeredUser.username;
        document.getElementById('dash-avatar').innerText = state.registeredUser.avatar;
        document.getElementById('set-username').value = state.registeredUser.username;
        document.getElementById('set-email').value = state.registeredUser.email;
    };

    const toggleSettings = () => {
        const modal = document.getElementById('settingsModal');
        if (modal) modal.classList.toggle('hidden');
    };

    const updateAvatar = (emoji) => {
        if(state.registeredUser) {
            state.registeredUser.avatar = emoji;
            document.getElementById('dash-avatar').innerText = emoji;
        }
    };

    const saveAccountChanges = (event) => {
        event.preventDefault();
        state.registeredUser.username = document.getElementById('set-username').value;
        state.registeredUser.email = document.getElementById('set-email').value;
        syncUserDOM();
        toggleSettings();
    };

    const deleteAccount = () => {
        if(confirm("Konto wirklich löschen?")) {
            state.registeredUser = null;
            toggleSettings();
            navigateToComponent('registerCard');
        }
    };

    const switchLanguage = (source) => {
        const selectedLang = document.getElementById(source === 'global' ? 'langSelect' : 'modalLangSelect').value;
        document.getElementById('langSelect').value = selectedLang;
        document.getElementById('modalLangSelect').value = selectedLang;
        state.activeLanguage = selectedLang;
        // Text-Übersetzungen hier ausführen falls nötig...
    };

    document.addEventListener('DOMContentLoaded', () => initSecurityDiagnostics());

    return {
        Security: { executeRegister, executeVerify, executeLogin, executeOAuth, logout: () => navigateToComponent('loginCard') },
        Navigation: { to: navigateToComponent },
        Dashboard: { toggleSettings, updateAvatar, saveAccountChanges, deleteAccount },
        Features: { cancelContract, syncNewBank },
        Localization: { switchLanguage }
    };
})();
