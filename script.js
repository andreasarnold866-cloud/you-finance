const i18n = {
    de: {
        title: "Konto erstellen", subtitle: "Sichern Sie sich den Zugang zu Ihren Finanzen.",
        userL: "Benutzername", emailL: "E-Mail-Adresse", passL: "Sicheres Passwort",
        polLen: "Mindestens 8 Zeichen", polNum: "Mindestens 1 Zahl", polSpec: "Mindestens 1 Sonderzeichen",
        btnReg: "Registrieren", vTitle: "E-Mail bestätigen", vDesc: "Wir haben einen Sicherheitscode an Ihre E-Mail gesendet.",
        codeL: "6-stelliger Code", btnVer: "Code verifizieren", errFields: "Bitte Passwort-Anforderungen erfüllen.",
        errCode: "Falscher Code. Bitte versuchen Sie es erneut.", successVer: "Erfolgreich! Dashboard wird geladen..."
    },
    en: {
        title: "Create account", subtitle: "Secure your access to personal wealth.",
        userL: "Username", emailL: "Email address", passL: "Secure password",
        polLen: "At least 8 characters", polNum: "At least 1 number", polSpec: "At least 1 special character",
        btnReg: "Register", vTitle: "Verify Email", vDesc: "We have sent a security code to your email address.",
        codeL: "6-digit code", btnVer: "Verify Code", errFields: "Please fulfill password requirements.",
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

let passValid = false;

// Dynamische Stärke-Prüfung
document.getElementById('password').addEventListener('input', (e) => {
    const val = e.target.value;
    const metrics = {
        length: val.length >= 8,
        num: /\d/.test(val),
        spec: /[!@#$%^&*(),.?":{}|<>_]/.test(val)
    };

    updateMetric('req-length', metrics.length);
    updateMetric('req-num', metrics.num);
    updateMetric('req-spec', metrics.spec);

    // Score berechnen (0 bis 3)
    const score = Object.values(metrics).filter(Boolean).length;
    const bar = document.getElementById('strengthBar');
    
    if(score === 0) { bar.style.width = '0%'; }
    else if(score === 1) { bar.style.width = '33%'; bar.style.backgroundColor = '#ef4444'; }
    else if(score === 2) { bar.style.width = '66%'; bar.style.backgroundColor = '#f59e0b'; }
    else if(score === 3) { bar.style.width = '100%'; bar.style.backgroundColor = '#10b981'; }

    passValid = score === 3;
});

function updateMetric(id, isValid) {
    const el = document.getElementById(id);
    if(isValid) el.classList.add('valid'); else el.classList.remove('valid');
}

// Flüssiger Wechsel-Effekt (Anfassen erlaubt!)
function handleRegister(event) {
    event.preventDefault();
    if (!passValid) return;

    const card1 = document.getElementById('registerCard');
    const card2 = document.getElementById('verifyCard');

    card1.style.opacity = '0';
    card1.style.transform = 'scale(0.95) translateY(-10px)';
    
    setTimeout(() => {
        card1.classList.add('hidden');
        card2.classList.remove('hidden');
        setTimeout(() => {
            card2.style.opacity = '1';
            card2.style.transform = 'scale(1) translateY(0)';
        }, 50);
    }, 400);
}

function handleVerify(event) {
    event.preventDefault();
    const currentLang = document.getElementById('langSelect').value;
    const code = document.getElementById('verifyCode').value;
    const status = document.getElementById('verifyStatus');

    if (code === "123456") {
        status.className = "status-msg success";
        status.innerText = i18n[currentLang].successVer;
        setTimeout(() => { alert("Weiterleitung zum Dashboard-Modul!"); }, 1000);
    } else {
        status.className = "status-msg error";
        status.innerText = i18n[currentLang].errCode;
    }
}

function changeLanguage() {
    const lang = document.getElementById('langSelect').value;
    const d = i18n[lang];

    document.getElementById('txt-title').innerText = d.title;
    document.getElementById('txt-subtitle').innerText = d.subtitle;
    document.getElementById('lbl-username').innerText = d.userL;
    document.getElementById('lbl-email').innerText = d.emailL;
    document.getElementById('lbl-password').innerText = d.passL;
    document.getElementById('policy-len').innerText = d.polLen;
    document.getElementById('policy-num').innerText = d.polNum;
    document.getElementById('policy-spec').innerText = d.polSpec;
    document.getElementById('btn-register').innerText = d.btnReg;
    document.getElementById('txt-verify-title').innerText = d.vTitle;
    document.getElementById('txt-verify-desc').innerText = d.vDesc;
    document.getElementById('lbl-code').innerText = d.codeL;
    document.getElementById('btn-verify').innerText = d.btnVer;
}
