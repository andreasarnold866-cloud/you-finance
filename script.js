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
            loginT: "Willkommen zurück", loginSub: "Melden Sie sich mit Ihren Daten an.", btnGoogleLog: "Mit Google anmelden", btnLog: "Anmelden",
            txtNewHere: "Neu hier?", lnkRegister: "Konto erstellen", errLogin: "Ungültige Anmeldedaten.",
            navDash: "Dashboard", dashWelcome: "Finanzübersicht", btnLogout: "Abmelden",
            lblBalance: "Gesamtsaldo", lblIncome: "Monatliche Einnahmen", lblExpenses: "Monatliche Ausgaben",
            txtAnalytics: "Vermögensentwicklung Analytics", txtSettingsTitle: "Einstellungen",
            txtSettingsDesc: "Echtzeit-Sicherheitsschlüssel aktiv", btnPremium: "Pläne verwalten", btnClose: "Schließen",
            lblModalLang: "Sprache / Language"
        },
        en: {
            title: "Create account", subtitle: "Secure your access to personal wealth.",
            btnGoogleReg: "Continue with Google", btnAppleReg: "Continue with Apple", orText: "OR",
            userL: "Username", emailL: "Email address", passL: "Secure password",
            polLen: "At least 8 characters", polNum: "At least 1 number", polSpec: "At least 1 special character",
            btnReg: "Register", txtHaveAcc: "Already have an account?", lnkLogin: "Sign in here",
            vTitle: "Verify Email", vDesc: "We have sent a security code to your email address.",
            codeL: "6-digit code", btnVer: "Verify Code", errFields: "Please fulfill all password criteria.",
            errCode: "Invalid code. Please try again.", successVer: "Success! Saving data architecture...",
            loginT: "Welcome Back", loginSub: "Sign in to manage your ecosystem.", btnGoogleLog: "Sign in with Google", btnLog: "Sign In",
            txtNewHere: "New here?", lnkRegister: "Create account", errLogin: "Invalid credentials.",
            navDash: "Dashboard", dashWelcome: "Financial Overview", btnLogout: "Logout",
            lblBalance: "Total Balance", lblIncome: "Monthly Income", lblExpenses: "Monthly Expenses",
            txtAnalytics: "Asset Development Analytics", txtSettingsTitle: "Settings",
            txtSettingsDesc: "Real-time security key active", btnPremium: "Manage Plans", btnClose: "Close",
            lblModalLang: "Language / Sprache"
        },
        es: {
            title: "Crear cuenta", subtitle: "Asegure su acceso a las finanzen.",
            btnGoogleReg: "Continuar con Google", btnAppleReg: "Continuar con Apple", orText: "O",
            userL: "Usuario", emailL: "Correo electrónico", passL: "Contraseña segura",
            polLen: "Al menos 8 caracteres", polNum: "Al menos 1 número", polSpec: "Al menos 1 carácter especial",
            btnReg: "Registrarse", txtHaveAcc: "¿Ya tienes una cuenta?", lnkLogin: "Inicia sesión aquí",
            vTitle: "Verificar Correo", vDesc: "Hemos enviado un código de seguridad a su correo.",
            codeL: "Código de 6 dígitos", btnVer: "Verificar Código", errFields: "Cumpla con los requisitos.",
            errCode: "Código incorrecto. Inténtelo de nuevo.", successVer: "¡Éxito! Asegurando datos...",
            loginT: "Bienvenido de nuevo", loginSub: "Inicie sesión con sus credenciales.", btnGoogleLog: "Iniciar sesión con Google", btnLog: "Ingresar",
            txtNewHere: "¿Nuevo aquí?", lnkRegister: "Crear cuenta", errLogin: "Credenciales no válidas.",
            navDash: "Tablero", dashWelcome: "Resumen Financiero", btnLogout: "Cerrar sesión",
            lblBalance: "Saldo Total", lblIncome: "Ingresos Mensuales", lblExpenses: "Gastos Mensuales",
            txtAnalytics: "Análisis de Activos", txtSettingsTitle: "Ajustes",
            txtSettingsDesc: "Clave de seguridad en tempo real activa", btnPremium: "Gestionar Planes", btnClose: "Cerrar",
            lblModalLang: "Idioma / Language"
        },
        it: {
            title: "Crea account", subtitle: "Proteggi l'accesso alle tue finanze.",
            btnGoogleReg: "Continua con Google", btnAppleReg: "Continua con Apple", orText: "OPPURE",
            userL: "Nome utente", emailL: "Indirizzo e-mail", passL: "Password sicura",
            polLen: "Almeno 8 caratteri", polNum: "Almeno 1 numero", polSpec: "Almeno 1 carattere speciale",
            btnReg: "Registrati", txtHaveAcc: "Hai già un account?", lnkLogin: "Accedi qui",
            vTitle: "Verifica E-mail", vDesc: "Abbiamo inviato un codice di sicurezza alla tua e-mail.",
            codeL: "Codice a 6 cifre", btnVer: "Verifica codice", errFields: "Soddisfa i requisiti della password.",
            errCode: "Codice errato. Riprova.", successVer: "Successo! Archiviazione dati...",
            loginT: "Bentornato", loginSub: "Accedi al tuo ecosistema finanziario.", btnGoogleLog: "Accedi con Google", btnLog: "Accedi",
            txtNewHere: "Nuovo qui?", lnkRegister: "Crea account", errLogin: "Credenziali non valide.",
            navDash: "Dashboard", dashWelcome: "Panoramica Finanziaria", btnLogout: "Disconnettersi",
            lblBalance: "Saldo Totale", lblIncome: "Entrate Mensili", lblExpenses: "Uscite Mensili",
            txtAnalytics: "Analisi dello Sviluppo Patrimoniale", txtSettingsTitle: "Impostazioni",
            txtSettingsDesc: "Chiave di sicurezza in tempo real attiva", btnPremium: "Gestisci Piani", btnClose: "Chiudi",
            lblModalLang: "Lingua / Language"
        },
        fr: {
            title: "Créer un compte", subtitle: "Sécurisez l'accès à vos finances.",
            btnGoogleReg: "Continuer avec Google", btnAppleReg: "Continuer avec Apple", orText: "OU",
            userL: "Nom d'utilisateur", emailL: "Adresse e-mail", passL: "Mot de passe sécurisé",
            polLen: "Au moins 8 caractères", polNum: "Au moins 1 chiffre", polSpec: "Au moins 1 caractère spécial",
            btnReg: "S'inscrire", txtHaveAcc: "Vous avez déjà un compte?", lnkLogin: "Se connecter ici",
            vTitle: "Vérifier l'e-mail", vDesc: "Nous avons envoyé un code de sécurité à votre e-mail.",
            codeL: "Code à 6 chiffres", btnVer: "Vérifier le code", errFields: "Veuillez respecter les exigences.",
            errCode: "Code invalide. Veuillez réessayer.", successVer: "Succès! Sécurisation des données...",
            loginT: "Bon retour", loginSub: "Connectez-vous pour gérer vos actifs.", btnGoogleLog: "Se connecter avec Google", btnLog: "Se connecter",
            txtNewHere: "Nouveau ici?", lnkRegister: "Créer un compte", errLogin: "Identifiants invalides.",
            navDash: "Tableau de bord", dashWelcome: "Aperçu Financier", btnLogout: "Se déconnecter",
            lblBalance: "Solde Total", lblIncome: "Revenus Mensuels", lblExpenses: "Dépenses Mensuelles",
            txtAnalytics: "Analyse de l'Évolution des Actifs", txtSettingsTitle: "Paramètres",
            txtSettingsDesc: "Clé de sécurité en temps réel active", btnPremium: "Gérer les Plans", btnClose: "Fermer",
            lblModalLang: "Langue / Language"
        },
        gr: {
            title: "Δημιουργία λογαριασμού", subtitle: "Ασφαλίστε την πρόσβαση στα οικονομικά σας.",
            btnGoogleReg: "Συνέχεια με Google", btnAppleReg: "Συνέχεια με Apple", orText: "Ή",
            userL: "Όνομα χρήστη", emailL: "Διεύθυνση Email", passL: "Ασφαλής κωδικός",
            polLen: "Τουλάχιστον 8 χαρακτήρες", polNum: "Τουλάχιστον 1 αριθμός", polSpec: "Τουλάχιστον 1 ειδικός χαρακτήρας",
            btnReg: "Εγγραφή", txtHaveAcc: "Έχετε ήδη λογαριασμό;", lnkLogin: "Σύνδεση εδώ",
            vTitle: "Επαλήθευση Email", vDesc: "Έχουμε στείλει έναν κωδικό ασφαλείας στο email σας.",
            codeL: "6-ψήφιος κωδικός", btnVer: "Επαλήθευση κωδικού", errFields: "Παρακαλώ συμπληρώστε τα κριτήρια.",
            errCode: "Λάθος κωδικός. Προσπαθήστε ξανά.", successVer: "Επιτυχία! Ασφάλιση δεδομένων...",
            loginT: "Καλώς ορίσατε", loginSub: "Συνδεθείτε για πρόσβαση στα δεδομένα σας.", btnGoogleLog: "Σύνδεση μέσω Google", btnLog: "Σύνδεση",
            txtNewHere: "Νέος εδώ;", lnkRegister: "Δημιουργία λογαριασμού", errLogin: "Μη έγκυρα διαπιστευτήρια.",
            navDash: "Πίνακας Ελέγχου", dashWelcome: "Οικονομική Επισκόπηση", btnLogout: "Αποσύνδεση",
            lblBalance: "Συνολικό Υπόλοιπο", lblIncome: "Μηνιαία Έσοδα", lblExpenses: "Μηνιαία Έξοδα",
            txtAnalytics: "Αναλυτικά Στοιχεία Περιουσίας", txtSettingsTitle: "Ρυθμίσεις",
            txtSettingsDesc: "Ενεργό κλειδί ασφαλείας πραγματικού χρόνου", btnPremium: "Διαχείριση Πακέτων", btnClose: "Κλείσιμο",
            lblModalLang: "Γλώσσα / Language"
        }
    };

    let state = {
        isPasswordValid: false,
        activeLanguage: "de",
        registeredUser: null,
        isVerified: false
    };

    const initSecurityDiagnostics = () => {
        const passInput = document.getElementById('password');
        if (!passInput) return;

        passInput.addEventListener('input', (e) => {
            const stream = e.target.value;
            const metrics = {
                length: stream.length >= 8,
                num: /\d/.test(stream),
                spec: /[!@#$%^&*(),.?":{}|<>_]/.test(stream)
            };

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
        if (!node) return;
        if (isConditionMet) { node.classList.remove('invalid'); node.classList.add('valid'); }
        else { node.classList.remove('valid'); node.classList.add('invalid'); }
    };

    const navigateToComponent = (targetCardId) => {
        const cards = ['registerCard', 'verifyCard', 'loginCard', 'dashboardPage'];
        cards.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                if (id === targetCardId) el.classList.remove('hidden');
                else el.classList.add('hidden');
            }
        });
    };

    const executeRegister = (event) => {
        event.preventDefault();
        if (!state.isPasswordValid) {
            alert(dictionary[state.activeLanguage].errFields);
            return;
        }

        state.registeredUser = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            pass: document.getElementById('password').value
        };

        navigateToComponent('verifyCard');
    };

    const executeVerify = (event) => {
        event.preventDefault();
        const userInputCode = document.getElementById('verifyCode').value;
        const fallbackAnchor = document.getElementById('verifyStatus');

        if (userInputCode === "123456") {
            state.isVerified = true;
            fallbackAnchor.className = "feedback-anchor success";
            fallbackAnchor.innerText = dictionary[state.activeLanguage].successVer;
            
            setTimeout(() => {
                navigateToComponent('loginCard');
            }, 1000);
        } else {
            fallbackAnchor.className = "feedback-anchor error";
            fallbackAnchor.innerText = dictionary[state.activeLanguage].errCode;
        }
    };

    const executeLogin = (event) => {
        event.preventDefault();
        const identifier = document.getElementById('loginIdentifier').value;
        const pass = document.getElementById('loginPassword').value;
        const loginStatus = document.getElementById('loginStatus');

        if (state.registeredUser && 
            (identifier === state.registeredUser.username || identifier === state.registeredUser.email) && 
            pass === state.registeredUser.pass) {
            
            document.getElementById('dash-username').innerText = state.registeredUser.username;
            navigateToComponent('dashboardPage');
        } else {
            loginStatus.className = "feedback-anchor error";
            loginStatus.innerText = dictionary[state.activeLanguage].errLogin;
        }
    };

    // NEU: Simulierter funktionstüchtiger Google Login
    const executeGoogleAuth = () => {
        console.log("Google OAuth 2.0 Pipeline gestartet...");
        state.registeredUser = {
            username: "Google_User_42",
            email: "oauth.user@google.com",
            pass: "OAuth_Verified_Token_2026"
        };
        document.getElementById('dash-username').innerText = state.registeredUser.username;
        navigateToComponent('dashboardPage');
    };

    const logout = () => {
        document.getElementById('loginForm').reset();
        document.getElementById('loginStatus').innerText = "";
        navigateToComponent('loginCard');
    };

    const toggleSettings = () => {
        const modal = document.getElementById('settingsModal');
        if (modal) modal.classList.toggle('hidden');
    };

    // MODIFIZIERT: Volle Synchronisation & tiefgreifende Übersetzung
    const switchLanguage = (source) => {
        let selectedLang = "de";
        
        if (source === 'global') {
            selectedLang = document.getElementById('langSelect').value;
            document.getElementById('modalLangSelect').value = selectedLang;
        } else if (source === 'modal') {
            selectedLang = document.getElementById('modalLangSelect').value;
            document.getElementById('langSelect').value = selectedLang;
        }

        state.activeLanguage = selectedLang;
        const dict = dictionary[selectedLang];
        
        // Register Card translations
        document.getElementById('txt-title').innerText = dict.title;
        document.getElementById('txt-subtitle').innerText = dict.subtitle;
        document.getElementById('btn-google-reg').innerText = dict.btnGoogleReg;
        document.getElementById('btn-apple-reg').innerText = dict.btnAppleReg;
        document.getElementById('txt-or-1').innerText = dict.orText;
        document.getElementById('lbl-username').innerText = dict.userL;
        document.getElementById('lbl-email').innerText = dict.emailL;
        document.getElementById('lbl-password').innerText = dict.passL;
        document.getElementById('policy-len').innerText = dict.polLen;
        document.getElementById('policy-num').innerText = dict.polNum;
        document.getElementById('policy-spec').innerText = dict.polSpec;
        document.getElementById('btn-register').innerText = dict.btnReg;
        document.getElementById('txt-have-account').innerText = dict.txtHaveAcc;
        document.getElementById('lnk-login').innerText = dict.lnkLogin;
        
        // Verify Card translations
        document.getElementById('txt-verify-title').innerText = dict.vTitle;
        document.getElementById('txt-verify-desc').innerText = dict.vDesc;
        document.getElementById('lbl-code').innerText = dict.codeL;
        document.getElementById('btn-verify').innerText = dict.btnVer;
        
        // Login Card translations
        document.getElementById('txt-login-title').innerText = dict.loginT;
        document.getElementById('txt-login-subtitle').innerText = dict.loginSub;
        document.getElementById('btn-google-log').innerText = dict.btnGoogleLog;
        document.getElementById('txt-or-2').innerText = dict.orText;
        document.getElementById('lbl-login-id').innerText = dict.userL + " " + dict.orText.toLowerCase() + " " + dict.emailL;
        document.getElementById('lbl-login-pass').innerText = dict.passL;
        document.getElementById('btn-login').innerText = dict.btnLog;
        document.getElementById('txt-new-here').innerText = dict.txtNewHere;
        document.getElementById('lnk-register').innerText = dict.lnkRegister;

        // Dashboard & Modals translations
        document.getElementById('nav-dash').innerText = dict.navDash;
        document.getElementById('txt-dash-welcome').innerText = dict.dashWelcome;
        document.getElementById('btn-logout').innerText = dict.btnLogout;
        document.getElementById('lbl-balance').innerText = dict.lblBalance;
        document.getElementById('lbl-income').innerText = dict.lblIncome;
        document.getElementById('lbl-expenses').innerText = dict.lblExpenses;
        document.getElementById('txt-analytics-title').innerText = dict.txtAnalytics;
        
        // Settings Modal internal translations
        document.getElementById('txt-settings-title').innerText = dict.txtSettingsTitle;
        document.getElementById('txt-settings-desc').innerText = dict.txtSettingsDesc;
        document.getElementById('lbl-modal-lang').innerText = dict.lblModalLang;
        document.getElementById('btn-premium').innerText = dict.btnPremium;
        document.getElementById('btn-close').innerText = dict.btnClose;
    };

    document.addEventListener('DOMContentLoaded', () => {
        initSecurityDiagnostics();
    });

    return {
        Security: {
            executeRegister,
            executeVerify,
            executeLogin,
            executeGoogleAuth,
            logout
        },
        Navigation: {
            to: navigateToComponent
        },
        Dashboard: {
            toggleSettings
        },
        Localization: {
            switchLanguage
        }
    };
})();
