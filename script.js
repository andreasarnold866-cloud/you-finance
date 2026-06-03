const App = (() => {
    
    // Encapsulated Localization Memory (i18n Dictionary)
    const dictionary = {
        de: {
            title: "Konto erstellen", subtitle: "Sichern Sie sich den Zugang zu Ihren Finanzen.",
            userL: "Benutzername", emailL: "E-Mail-Adresse", passL: "Sicheres Passwort",
            polLen: "Mindestens 8 Zeichen", polNum: "Mindestens 1 Zahl", polSpec: "Mindestens 1 Sonderzeichen",
            btnReg: "Registrieren", vTitle: "E-Mail bestätigen", vDesc: "Wir haben einen Sicherheitscode an Ihre E-Mail gesendet.",
            codeL: "6-stelliger Code", btnVer: "Code verifizieren", errFields: "Bitte erfüllen Sie alle Passwort-Kriterien.",
            errCode: "Falscher Code. Bitte versuchen Sie es erneut.", successVer: "Erfolgreich! Dashboard wird geladen..."
        },
        en: {
            title: "Create account", subtitle: "Secure your access to personal wealth.",
            userL: "Username", emailL: "Email address", passL: "Secure password",
            polLen: "At least 8 characters", polNum: "At least 1 number", polSpec: "At least 1 special character",
            btnReg: "Register", vTitle: "Verify Email", vDesc: "We have sent a security code to your email address.",
            codeL: "6-digit code", btnVer: "Verify Code", errFields: "Please fulfill all password criteria.",
            errCode: "Invalid code. Please try again.", successVer: "Success! Loading dashboard..."
        },
        es: {
            title: "Crear cuenta", subtitle: "Asegure su acceso a las finanzas personales.",
            userL: "Usuario", emailL: "Correo electrónico", passL: "Contraseña segura",
            polLen: "Al menos 8 caracteres", polNum: "Al menos 1 número", polSpec: "Al menos 1 carácter especial",
            btnReg: "Registrarse", vTitle: "Verificar Correo", vDesc: "Hemos enviado un código de seguridad a su correo.",
            codeL: "Código de 6 dígitos", btnVer: "Verificar Código", errFields: "Cumpla con los requisitos de contraseña.",
            errCode: "Código incorrecto. Inténtelo de nuevo.", successVer: "¡Éxito! Cargando el panel..."
        },
        it: {
            title: "Crea account", subtitle: "Proteggi l'accesso alle tue finanze.",
            userL: "Nome utente", emailL: "Indirizzo e-mail", passL: "Password sicura",
            polLen: "Almeno 8 caratteri", polNum: "Almeno 1 numero", polSpec: "Almeno 1 carattere speciale",
            btnReg: "Registrati", vTitle: "Verifica E-mail", vDesc: "Abbiamo inviato un codice di sicurezza alla tua e-mail.",
            codeL: "Codice a 6 cifre", btnVer: "Verifica codice", errFields: "Soddisfa i requisiti della password.",
            errCode: "Codice errato. Riprova.", successVer: "Successo! Caricamento dashboard..."
        },
        fr: {
            title: "Créer un compte", subtitle: "Sécurisez l'accès à vos finances.",
            userL: "Nom d'utilisateur", emailL: "Adresse e-mail", passL: "Mot de passe sécurisé",
            polLen: "Au moins 8 caractères", polNum: "Au moins 1 chiffre", polSpec: "Au moins 1 caractère spécial",
            btnReg: "S'inscrire", vTitle: "Vérifier l'e-mail", vDesc: "Nous avons envoyé un code de sécurité à votre e-mail.",
            codeL: "Code à 6 chiffres", btnVer: "Vérifier le code", errFields: "Veuillez respecter les exigences.",
            errCode: "Code invalide. Veuillez réessayer.", successVer: "Succès! Chargement du tableau de bord..."
    },
        gr: {
            title: "Δημιουργία λογαριασμού", subtitle: "Ασφαλίστε την πρόσβαση στα οικονομικά σας.",
            userL: "Όνομα χρήστη", emailL: "Διεύθυνση Email", passL: "Ασφαλής κωδικός",
            polLen: "Τουλάχιστον 8 χαρακτήρες", polNum: "Τουλάχιστον 1 αριθμός", polSpec: "Τουλάχιστον 1 ειδικός χαρακτήρας",
            btnReg: "Εγγραφή", vTitle: "Επαλήθευση Email", vDesc: "Έχουμε στείλει έναν κωδικό ασφαλείας στο email σας.",
            codeL: "6-ψήφιος κωδικός", btnVer: "Επαλήθευση κωδικού", errFields: "Παρακαλώ συμπληρώστε τα κριτήρια.",
            errCode: "Λάθος κωδικός. Προσπαθήστε ξανά.", successVer: "Επιτυχία! Φόρτωση πίνακα..."
        }
    };

    // Internal State System
    let state = {
        isPasswordValid: false,
        activeLanguage: "de"
    };

    /**
     * Diagnostic Core for Security Validations
     */
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

            // Compute Engine for Matrix-Strength Indicator Bar
            const activeScore = Object.values(metrics).filter(Boolean).length;
            const meterBar = document.getElementById('strengthBar');
            
            switch(activeScore) {
                case 0:
                    meterBar.style.width = '0%';
                    break;
                case 1:
                    meterBar.style.width = '33%';
                    meterBar.style.backgroundColor = 'var(--sys-error)';
                    break;
                case 2:
                    meterBar.style.width = '66%';
                    meterBar.style.backgroundColor = '#f59e0b'; // Dynamic Orange Alert
                    break;
                case 3:
                    meterBar.style.width = '100%';
                    meterBar.style.backgroundColor = 'var(--sys-primary)';
                    break;
            }

            state.isPasswordValid = (activeScore === 3);
        });
    };

    const updateNodeState = (targetId, isConditionMet) => {
        const node = document.getElementById(targetId);
        if (isConditionMet) {
            node.classList.remove('invalid');
            node.classList.add('valid');
        } else {
            node.classList.remove('valid');
            node.classList.add('invalid');
        }
    };

    /**
     * Interface State Transitions
     */
    const executeRegister = (event) => {
        event.preventDefault();
        if (!state.isPasswordValid) {
            alert(dictionary[state.activeLanguage].errFields);
            return;
        }

        const sourceCard = document.getElementById('registerCard');
        const targetCard = document.getElementById('verifyCard');

        // Cinematic Window Transformation Flow
        sourceCard.style.opacity = '0';
        sourceCard.style.transform = 'scale(0.96) translateY(-15px)';
        
        setTimeout(() => {
            sourceCard.classList.add('hidden');
            targetCard.classList.remove('hidden');
            
            // Asynchronous Render Layer Dispatch
            setTimeout(() => {
                targetCard.style.opacity = '1';
                targetCard.style.transform = 'scale(1) translateY(0)';
            }, 30);
        }, 500);
    };

    const executeVerify = (event) => {
        event.preventDefault();
        const userInputCode = document.getElementById('verifyCode').value;
        const fallbackAnchor = document.getElementById('verifyStatus');

        if (userInputCode === "123456") {
            fallbackAnchor.className = "feedback-anchor success";
            fallbackAnchor.innerText = dictionary[state.activeLanguage].successVer;
            
            setTimeout(() => {
                alert("Runtime Execution: Transitioning to FinTech Dashboard Module...");
            }, 1000);
        } else {
            fallbackAnchor.className = "feedback-anchor error";
            fallbackAnchor.innerText = dictionary[state.activeLanguage].errCode;
        }
    };

    /**
     * i18n Translation Engine Runtime
     */
    const switchLanguage = () => {
        const languageSelection = document.getElementById('langSelect').value;
        state.activeLanguage = languageSelection;
        const lexicon = dictionary[languageSelection];

        // Batch Execution DOM Injection
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
    };

    // Auto-Bootstrap Application Layer
    document.addEventListener("DOMContentLoaded", () => {
        initSecurityDiagnostics();
    });

    // Public API Endpoint Exposure
    return {
        Security: {
            executeRegister: executeRegister,
            executeVerify: executeVerify
        },
        Localization: {
            switchLanguage: switchLanguage
        }
    };
})();
