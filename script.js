const i18n = {
    de: {
        title: "Konto erstellen", subtitle: "Starten Sie Ihre finanzielle Unabhängigkeit",
        userL: "Benutzername", emailL: "E-Mail-Adresse", passL: "Sicheres Passwort",
        polLen: "Mindestens 8 Zeichen", polNum: "Mindestens 1 Zahl", polSpec: "Mindestens 1 Sonderzeichen",
        btnReg: "Registrieren", vTitle: "E-Mail bestätigen", vDesc: "Wir haben einen Sicherheitscode an Ihre E-Mail-Adresse gesendet.",
        codeL: "6-stelliger Code", btnVer: "Code verifizieren", errFields: "Bitte füllen Sie alle Felder korrekt aus.",
        errCode: "Ungültiger Code. Bitte versuchen Sie es erneut.", successVer: "Verifiziert! Weiterleitung zum Dashboard..."
    },
    en: {
        title: "Create an account", subtitle: "Start your journey to financial freedom",
        userL: "Username", emailL: "Email Address", passL: "Secure Password",
        polLen: "At least 8 characters", polNum: "At least 1 number", polSpec: "At least 1 special character",
        btnReg: "Register", vTitle: "Verify Email", vDesc: "We have sent a security code to your email address.",
        codeL: "6-digit code", btnVer: "Verify Code", errFields: "Please fill out all fields correctly.",
        errCode: "Invalid code. Please try again.", successVer: "Verified! Redirecting to dashboard..."
    },
    es: {
        title: "Crear una cuenta", subtitle: "Comience su camino hacia la libertad financiera",
        userL: "Usuario", emailL: "Correo electrónico", passL: "Contraseña segura",
        polLen: "Al menos 8 caracteres", polNum: "Al menos 1 número", polSpec: "Al menos 1 carácter特殊",
        btnReg: "Registrarse", vTitle: "Verificar Correo", vDesc: "Hemos enviado un código de seguridad a su correo.",
        codeL: "Código de 6 dígitos", btnVer: "Verificar Código", errFields: "Por favor, complete todos los campos.",
        errCode: "Código inválido. Inténtelo de nuevo.", successVer: "¡Verificado! Redirigiendo al panel..."
    },
    it: {
        title: "Crea un account", subtitle: "Inizia il tuo viaggio verso la libertà finanziaria",
        userL: "Nome utente", emailL: "Indirizzo E-mail", passL: "Password sicura",
        polLen: "Almeno 8 caratteri", polNum: "Almeno 1 numero", polSpec: "Almeno 1 carattere speciale",
        btnReg: "Registrati", vTitle: "Verifica E-mail", vDesc: "Abbiamo inviato un codice di sicurezza al tuo indirizzo.",
        codeL: "Codice a 6 cifre", btnVer: "Verifica Codice", errFields: "Si prega di compilare tutti i campi correttamente.",
        errCode: "Codice non valido. Riprova.", successVer: "Verificato! Reindirizzamento alla dashboard..."
    },
    fr: {
        title: "Créer un compte", subtitle: "Commencez votre voyage vers la liberté financière",
        userL: "Nom d'utilisateur", emailL: "Adresse e-mail", passL: "Mot de passe sécurisé",
        polLen: "Au moins 8 caractères", polNum: "Au moins 1 chiffre", polSpec: "Au moins 1 caractère spécial",
        btnReg: "S'inscrire", vTitle: "Vérifier l'e-mail", vDesc: "Nous avons envoyé un code de sécurité à votre adresse e-mail.",
        codeL: "Code à 6 chiffres", btnVer: "Vérifier le code", errFields: "Veuillez remplir tous les champs correctement.",
        errCode: "Code invalide. Veuillez réessayer.", successVer: "Vérifié! Redirection vers le tableau de bord..."
    },
    gr: {
        title: "Δημιουργία λογαριασμού", subtitle: "Ξεκινήστε το ταξίδι σας προς την οικονομική ελευθερία",
        userL: "Όνομα χρήστη", emailL: "Διεύθυνση Email", passL: "Ασφαλής Κωδικός",
        polLen: "Τουλάχιστον 8 χαρακτήρες", polNum: "Τουλάχιστον 1 αριθμός", polSpec: "Τουλάχιστον 1 ειδικός χαρακτήρας",
        btnReg: "Εγγραφή", vTitle: "Επαλήθευση Email", vDesc: "Έχουμε στείλει έναν κωδικό ασφαλείας στη διεύθυνση email σας.",
        codeL: "6-ψήφιος κωδικός", btnVer: "Επαλήθευση Κωδικού", errFields: "Παρακαλώ συμπληρώστε όλα τα πεδία σωστά.",
        errCode: "Μη έγκυρος κωδικός. Παρακαλώ προσπαθήστε ξανά.", successVer: "Επαληθεύτηκε! Ανακατεύθυνση στο ταμπλό..."
    }
};

// Validierungsstatus
let isPasswordValid = false;

// Echtzeit-Passwortprüfung
const passwordInput = document.getElementById('password');
passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    
    const metrics = {
        length: val.length >= 8,
        num: /\d/.test(val),
        spec: /[!@#$%^&*(),.?":{}|<>_]/.test(val)
    };

    updatePolicy('req-length', metrics.length);
    updatePolicy('req-num', metrics.num);
    updatePolicy('req-spec', metrics.spec);

    isPasswordValid = metrics.length && metrics.num && metrics.spec;
});

function updatePolicy(elementId, isValid) {
    const el = document.getElementById(elementId);
    if (isValid) {
        el.classList.remove('invalid');
        el.classList.add('valid');
        el.querySelector('.icon').innerText = '✓';
    } else {
        el.classList.remove('valid');
        el.classList.add('invalid');
        el.querySelector('.icon').innerText = '○';
    }
}

// Registrierung abschicken
function handleRegister(event) {
    event.preventDefault();
    const currentLang = document.getElementById('langSelect').value;

    if (!isPasswordValid) {
        alert(i18n[currentLang].errFields);
        return;
    }

    // Animation beim Wechsel zur Verifizierung
    const regCard = document.getElementById('registerCard');
    const verifyCard = document.getElementById('verifyCard');

    regCard.style.opacity = '0';
    regCard.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        regCard.classList.add('hidden');
        verifyCard.classList.remove('hidden');
        // Kleine Verzögerung für sauberes Einblenden
        setTimeout(() => {
            verifyCard.style.opacity = '1';
            verifyCard.style.transform = 'translateY(0)';
        }, 50);
    }, 400);
}

// Verifizierungscode prüfen
function handleVerify(event) {
    event.preventDefault();
    const currentLang = document.getElementById('langSelect').value;
    const code = document.getElementById('verifyCode').value;
    const statusDiv = document.getElementById('verifyStatus');

    if (code === "123456") {
        statusDiv.className = "status-message success";
        statusDiv.innerText = i18n[currentLang].successVer;
        
        setTimeout(() => {
            alert("Hier geht es in der nächsten Phase zum Dashboard!");
        }, 1500);
    } else {
        statusDiv.className = "status-message error";
        statusDiv.innerText = i18n[currentLang].errCode;
    }
}

// Sprachwechsel-Logik
function changeLanguage() {
    const lang = document.getElementById('langSelect').value;
    const data = i18n[lang];

    // Texte der Registrierungskarte
    document.getElementById('txt-title').innerText = data.title;
    document.getElementById('txt-subtitle').innerText = data.subtitle;
    document.getElementById('lbl-username').innerText = data.userL;
    document.getElementById('lbl-email').innerText = data.emailL;
    document.getElementById('lbl-password').innerText = data.passL;
    document.getElementById('policy-len').innerText = data.polLen;
    document.getElementById('policy-num').innerText = data.polNum;
    document.getElementById('policy-spec').innerText = data.polSpec;
    document.getElementById('btn-register').innerText = data.btnReg;

    // Texte der Verifizierungskarte
    document.getElementById('txt-verify-title').innerText = data.vTitle;
    document.getElementById('txt-verify-desc').innerText = data.vDesc;
    document.getElementById('lbl-code').innerText = data.codeL;
    document.getElementById('btn-verify').innerText = data.btnVer;
}
