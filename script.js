const App = (() => {
    
    const dictionary = {
        de: {
            title: "Konto erstellen", subtitle: "Sichern Sie sich den Zugang zu Ihren Finanzen.",
            userL: "Benutzername", emailL: "E-Mail-Adresse", passL: "Sicheres Passwort",
            polLen: "Mindestens 8 Zeichen", polNum: "Mindestens 1 Zahl", polSpec: "Mindestens 1 Sonderzeichen",
            btnReg: "Registrieren", vTitle: "E-Mail verifizieren", vDesc: "Wir haben einen Sicherheitscode an Ihre E-Mail gesendet.",
            codeL: "6-stelliger Code", btnVer: "Code verifizieren", errFields: "Bitte erfüllen Sie alle Passwort-Kriterien.",
            errCode: "Falscher Code. Bitte versuchen Sie es erneut.", successVer: "Erfolgreich! Daten werden gesichert...",
            loginT: "Willkommen zurück", loginSub: "Melden Sie sich mit Ihren Daten an.", btnLog: "Anmelden"
        },
        en: {
            title: "Create account", subtitle: "Secure your access to personal wealth.",
            userL: "Username", emailL: "Email address", passL: "Secure password",
            polLen: "At least 8 characters", polNum: "At least 1 number", polSpec: "At least 1 special character",
            btnReg: "Register", vTitle: "Verify Email", vDesc: "We have sent a security code to your email address.",
            codeL: "6-digit code", btnVer: "Verify Code", errFields: "Please fulfill all password criteria.",
            errCode: "Invalid code. Please try again.", successVer: "Success! Saving data architecture...",
            loginT: "Welcome Back", loginSub: "Sign in to manage your ecosystem.", btnLog: "Sign In"
        },
        es: {
            title: "Crear cuenta", subtitle: "Asegure su acceso a las finanzas personales.",
            userL: "Usuario", emailL: "Correo electrónico", passL: "Contraseña segura",
            polLen: "Al menos 8 caracteres", polNum: "Al menos 1 número", polSpec: "Al menos 1 carácter especial",
            btnReg: "Registrarse", vTitle: "Verificar Correo", vDesc: "Hemos enviado un código de seguridad a su correo.",
            codeL: "Código de 6 dígitos", btnVer: "Verificar Código", errFields: "Cumpla con los requisitos de contraseña.",
            errCode: "Código incorrecto. Inténtelo de nuevo.", successVer: "¡Éxito! Asegurando datos...",
            loginT: "Bienvenido de nuevo", loginSub: "Inicie sesión con sus credenciales.", btnLog: "Ingresar"
        },
        it: {
            title: "Crea account", subtitle: "Proteggi l'accesso alle tue finanze.",
            userL: "Nome utente", emailL: "Indirizzo e-mail", passL: "Password sicura",
            polLen: "Almeno 8 caratteri", polNum: "Almeno 1 numero", polSpec: "Almeno 1 carattere speciale",
            btnReg: "Registrati", vTitle: "Verifica E-mail", vDesc: "Abbiamo inviato un codice di sicurezza alla tua e-mail.",
            codeL: "Codice a 6 cifre", btnVer: "Verifica codice", errFields: "Soddisfa i requisiti della password.",
            errCode: "Codice errato. Riprova.", successVer: "Successo! Archiviazione dati...",
            loginT: "Bentornato", loginSub: "Accedi al tuo ecosistema finanziario.", btnLog: "Accedi"
        },
        fr: {
            title: "Créer un compte", subtitle: "Sécurisez l'accès à vos finances.",
            userL: "Nom d'utilisateur", emailL: "Adresse e-mail", passL: "Mot de passe sécurisé",
            polLen: "Au moins 8 caractères", polNum: "Au moins 1 chiffre", polSpec: "Au moins 1 caractère spécial",
            btnReg: "S'inscrire", vTitle: "Vérifier l'e-mail", vDesc: "Nous avons envoyé un code de sécurité à votre e-mail.",
            codeL: "Code à 6 chiffres", btnVer: "Vérifier le code", errFields: "Veuillez respecter les exigences.",
            errCode: "Code invalide. Veuillez réessayer.", successVer: "Succès! Sécurisation des données...",
            loginT: "Bon retour", loginSub: "Connectez-vous pour gérer vos actifs.", btnLog: "Se connecter"
        },
        gr: {
            title: "Δημιουργία λογαριασμού", subtitle: "Ασφαλίστε την πρόσβαση στα οικονομικά σας.",
            userL: "Όνομα χρήστη", emailL: "Διεύθυνση Email", passL: "Ασφαλής κωδικός",
            polLen: "Τουλάχιστον 8 χαρακτήρες", polNum: "Τουλάχιστον 1 αριθμός", polSpec: "Τουλάχιστον 1 ειδικός χαρακτήρας",
            btnReg: "Εγγραφή", vTitle: "Επαλήθευση Email", vDesc: "Έχουμε στείλει έναν κωδικό ασφαλείας στο email σας.",
            codeL: "6-ψήφιος κωδικός", btnVer: "Επαλήθευση κωδικού", errFields: "Παρακαλώ συμπληρώστε τα κριτήρια.",
            errCode: "Λάθος κωδικός. Προσπαθήστε ξανά.", successVer: "Επιτυχία! Ασφάλιση δεδομένων...",
            loginT: "Καλώς ορίσατε", loginSub: "Συνδεθείτε για πρόσβαση στα δεδομένα σας.", btnLog: "Σύνδεση"
        }
    };

    // Client-Side Volatile State Manager (Simuliert die Datenbank im RAM)
    let state = {
        isPasswordValid: false,
        activeLanguage: "de",
        registeredUser: null,  // Speichert das erstellte Konto { username, email, password }
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
        if (isConditionMet) { node.classList.remove('invalid'); node.classList.add('valid'); }
        else { node.classList.remove('valid'); node.classList.add('invalid'); }
    };

    /**
     * Navigation Controller System (Smooth Component Swapping)
     */
    const navigateToComponent = (targetCardId) => {
        const cards = ['registerCard', 'verifyCard', 'loginCard', 'dashboardPage'];
        cards.forEach(id => {
            const el = document.getElementById(id);
            if (id === targetCardId) {
                el.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
            }
        });
        
        // Verberge Sprachauswahl im Dashboard, um App-Feeling zu maximieren
        const langWidget = document.getElementById('globalLangWidget');
        if(targetCardId === 'dashboardPage') langWidget.classList.add('hidden');
        else langWidget.classList.remove('hidden');
    };

    /**
     * Core Security Action Despatchers
     */
    const executeRegister = (event) => {
        event.preventDefault();
        if (!state.isPasswordValid) {
            alert(dictionary[state.activeLanguage].errFields);
            return;
        }

        // Lokales Speichern der Daten im temporären State (Datenbank-Simulation)
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
        const statusNode = document.getElementById('loginStatus');

        // Validierung gegen den State
        if (!state.registeredUser) {
            statusNode.className = "feedback-anchor error";
            statusNode.innerText = "Kein Account gefunden. Bitte registrieren Sie sich.";
            return;
        }

        const matchId = (identifier === state.registeredUser.username || identifier === state.registeredUser.email);
        const matchPass = (pass === state.registeredUser.pass);

        if (matchId && matchPass && state.isVerified) {
            statusNode.className = "feedback-anchor success";
            statusNode.innerText = "Login erfolgreich. Dashboard wird initialisiert...";
            
            document.getElementById('dash-username').innerText = state.registeredUser.username;

            setTimeout(() => {
                navigateToComponent('dashboardPage');
            }, 1000);
        } else {
            statusNode.className = "feedback-anchor error";
            statusNode.innerText = "Ungültige Anmeldedaten oder E-Mail nicht verifiziert.";
        }
    };

    const logout = () => {
        navigateToComponent('loginCard');
        document.getElementById('loginForm').reset();
    };

    const toggleSettings = () => {
        const modal = document.getElementById('settingsModal');
        modal.classList.toggle('hidden');
    };

    const switchLanguage = () => {
        const languageSelection = document.getElementById('langSelect').value;
        state.activeLanguage = languageSelection;
        const lexicon = dictionary[languageSelection];

        // DOM Batch Injection
        document.getElementById('txt-title').innerText = lexicon.title;
        document.getElementById('txt-subtitle').innerText = lexicon.subtitle;
        document.getElementById('lbl-username').innerText = lexicon.userL;
        document.getElementById('lbl-email').innerText = lexicon.emailL;
        document.getElementById('lbl-password').innerText = lexicon.passL;
        document.getElementById('policy-len').innerText = lexicon.polLen;
        document.getElementById('policy-num').innerText = lexicon.polNum;
        document.getElementById('policy-spec').innerText = lexicon.polSpec;
        document.getElementById('btn-register').innerText = lexicon.btnReg;
        
        document.getElementById('txt-verify-title').innerText = lexicon.vTitle;
        document.getElementById('txt-verify-desc').innerText = lexicon.vDesc;
        document.getElementById('lbl-code').innerText = lexicon.codeL;
        document.getElementById('btn-verify').innerText = lexicon.btnVer;

        document.getElementById('txt-login-title').innerText = lexicon.loginT;
        document.getElementById('txt-login-subtitle').innerText = lexicon.loginSub;
        document.getElementById('btn-login').innerText = lexicon.btnLog;
    };

    document.addEventListener("DOMContentLoaded", () => {
        initSecurityDiagnostics();
    });

    return {
        Security: { executeRegister, executeVerify, executeLogin, logout },
        Navigation: { to: navigateToComponent },
        Dashboard: { toggleSettings },
        Localization: { switchLanguage }
    };
})();
