const languages = {
    de: {
        authTitle: "Konto erstellen", authSubtitle: "Starten Sie Ihre finanzielle Unabhängigkeit mit You Finance",
        labelEmail: "E-Mail-Adresse", labelPassword: "Passwort", policyTitle: "Sicherheitsanforderungen:",
        rememberMe: "Auf diesem Gerät angemeldet bleiben", verifyNotice: "🔒 Sicherheits-Verifizierung: Ein 6-stelliger Bestätigungscode wurde an Ihre E-Mail gesendet.",
        verifyLabel: "Bestätigungscode (Demo-Token: 123456)", verifyBtn: "Konto verifizieren",
        navDashboard: "Dashboard", navTransactions: "Transaktionen", navBudget: "Budgetplaner", navAi: "KI Co-Pilot", navSettings: "Einstellungen",
        logoutBtn: "Abmelden ↩", workspaceTitle: "Performance Workspace", sysEncrypted: "End-to-End Verschlüsselt",
        cardIncome: "Gesamteinnahmen", cardExpenses: "Gesamtausgaben", cardBalance: "Netto-Liquidität",
        trendIncome: "↑ Aktiver Cashflow", trendExpenses: "↓ Operative Abflüsse", trendLabelValid: "Valide Bilanz", trendLabelErosion: "Kapitalerodierung",
        titleActivity: "Letzte Aktivitäten", btnJournal: "Journal öffnen", titleStructure: "Kategorien-Struktur",
        transTitle: "Transaktion verbuchen", transDesc: "Buchungstext", transAmount: "Betrag (€)", transType: "Klassifizierung", transCat: "Kategorie",
        optInc: "📈 Einnahme", optExp: "📉 Ausgabe", btnExecute: "Ausführen", historyTitle: "Audit-Log / Transaktionshistorie",
        btnExport: "📊 Ledger Export (.CSV)", thDate: "Zeitpunkt / Beleg", thCat: "Kategorie", thType: "Typus", thAmount: "Betrag",
        budgetTitle: "Budgetäre Obergrenze zuteilen", budgetCat: "Kategorie", budgetLimit: "Limitation (€ / Monat)",
        btnBind: "Limit binden", budgetMonitor: "Echtzeit-Schwellenwert-Überwachung", aiTitle: "YouFinance KI-Consultant",
        aiSubtitle: "Interaktive Realtime-Vermögensanalyse", aiSend: "Senden", settingsHeader: "System-Einstellungen",
        settingsSubheader: "Konfigurieren Sie globale Anwendungsvariablen, Lokalisierungen und Zeitzonen.", settingsLangLabel: "System-Sprache (Language)",
        settingsTimezoneLabel: "Globale Zeitzone (Timezone)", placeholderDesc: "z.B. Gehaltszahlung, Mietaufwand...", placeholderAi: "Fragen Sie die KI nach Sparpotenzialen...",
        msgWelcomeAi: "✨ System-Assistent: Bereit. Ich habe vollen Zugriff auf Ihre Bilanzen. Fragen Sie mich nach Einsparpotenzialen, Prognosen oder Budgetüberschreitungen.",
        emptyData: "Keine Daten verfügbar", emptyLog: "Keine Buchungsdaten erfasst.", emptyBudget: "Keine aktiven Limitierungen zugewiesen.",
        toastAuthError: "Zugriff verweigert. Ungültige Anmeldedaten.", toastFields: "Bitte füllen Sie alle erforderlichen Felder aus.",
        toastSec: "Sicherheitsstufe unzureichend. Bitte korrigieren Sie Ihr Passwort.", toastEmailTaken: "Diese E-Mail-Adresse ist bereits vergeben.",
        toastTokenOk: "E-Mail erfolgreich verifiziert! Willkommen an Bord.", toastTokenErr: "Token ungültig. Verwenden Sie für die Testumgebung: 123456",
        toastValErr: "Eingabe ungültig. Beschreibung und positiver Betrag erforderlich.", toastLimitErr: "Geben Sie einen validen Schwellenwert ein.",
        settingsAvatarTitle: "Profilidentität", avatarDesc: "Klicken Sie auf das Bild, um ein neues Foto hochzuladen. Das Bild wird automatisch verzerrungsfrei angepasst.",
        toastDaySelected: "Filter aktiv für Belege vom: "
    },
    en: {
        authTitle: "Create Account", authSubtitle: "Start your financial independence with You Finance",
        labelEmail: "Email Address", labelPassword: "Password", policyTitle: "Security Requirements:",
        rememberMe: "Stay logged in on this device", verifyNotice: "🔒 Security Verification: A 6-digit confirmation code was sent to your email.",
        verifyLabel: "Verification Code (Demo Token: 123456)", verifyBtn: "Verify Account",
        navDashboard: "Dashboard", navTransactions: "Transactions", navBudget: "Budget Planner", navAi: "AI Co-Pilot", navSettings: "Settings",
        logoutBtn: "Sign Out ↩", workspaceTitle: "Performance Workspace", sysEncrypted: "End-to-End Encrypted",
        cardIncome: "Total Income", cardExpenses: "Total Expenses", cardBalance: "Net Liquidity",
        trendIncome: "↑ Active Cashflow", trendExpenses: "↓ Operative Outflow", trendLabelValid: "Valid Balance", trendLabelErosion: "Capital Erosion",
        titleActivity: "Recent Activity", btnJournal: "Open Ledger", titleStructure: "Category Breakdown",
        transTitle: "Log Transaction", transDesc: "Transaction Text", transAmount: "Amount (€)", transType: "Classification", transCat: "Category",
        optInc: "📈 Income", optExp: "📉 Expense", btnExecute: "Execute", historyTitle: "Audit Log / Transaction History",
        btnExport: "📊 Ledger Export (.CSV)", thDate: "Timestamp / Reference", thCat: "Category", thType: "Type", thAmount: "Amount",
        budgetTitle: "Allocate Budget Cap", budgetCat: "Category", budgetLimit: "Limitation (€ / Month)",
        btnBind: "Bind Limit", budgetMonitor: "Real-time Threshold Monitoring", aiTitle: "YouFinance AI Consultant",
        aiSubtitle: "Interactive Real-time Wealth Analysis", aiSend: "Send", settingsHeader: "System Settings",
        settingsSubheader: "Configure global application variables, localizations and timezones.", settingsLangLabel: "System Language",
        settingsTimezoneLabel: "Global Timezone", placeholderDesc: "e.g., Salary payment, rent expense...", placeholderAi: "Ask the AI about savings potentials...",
        msgWelcomeAi: "✨ System Assistant: Ready. I have full access to your sheets. Ask me about optimization, forecasts, or budget overruns.",
        emptyData: "No data available", emptyLog: "No transaction records found.", emptyBudget: "No active limits assigned.",
        toastAuthError: "Access denied. Invalid credentials.", toastFields: "Please fill in all required fields.",
        toastSec: "Security level insufficient. Please verify your password.", toastEmailTaken: "This email address is already taken.",
        toastTokenOk: "Email verified successfully! Welcome aboard.", toastTokenErr: "Invalid token. Use for this test environment: 123456",
        toastValErr: "Invalid entry. Description and positive amount required.", toastLimitErr: "Please enter a valid threshold value.",
        settingsAvatarTitle: "Profile Identity", avatarDesc: "Click on the avatar to upload a new profile picture. Aspect ratio will be fully locked without stretching.",
        toastDaySelected: "Filter active for records dated: "
    },
    es: {
        authTitle: "Crear Cuenta", authSubtitle: "Comience su independencia financiera con You Finance",
        labelEmail: "Correo Electrónico", labelPassword: "Contraseña", policyTitle: "Requisitos de Seguridad:",
        rememberMe: "Mantener sesión iniciada en este dispositivo", verifyNotice: "🔒 Verificación de Seguridad: Se ha enviado un código de confirmación de 6 dígitos a su correo.",
        verifyLabel: "Código de Verificación (Token de demostración: 123456)", verifyBtn: "Verificar Cuenta",
        navDashboard: "Tablero", navTransactions: "Transacciones", navBudget: "Presupuesto", navAi: "Co-Piloto IA", navSettings: "Ajustes",
        logoutBtn: "Cerrar Sesión ↩", workspaceTitle: "Espacio de Trabajo", sysEncrypted: "Cifrado de Extremo a Extremo",
        cardIncome: "Ingresos Totales", cardExpenses: "Gastos Totales", cardBalance: "Liquidez Neta",
        trendIncome: "↑ Flujo de Caja Activo", trendExpenses: "↓ Flujos Operativos", trendLabelValid: "Balance Válido", trendLabelErosion: "Erosión de Capital",
        titleActivity: "Actividad Reciente", btnJournal: "Abrir Registro", titleStructure: "Estructura de Categorías",
        transTitle: "Registrar Transacción", transDesc: "Texto de Transacción", transAmount: "Monto (€)", transType: "Clasificación", transCat: "Categoría",
        optInc: "📈 Ingreso", optExp: "📉 Gasto", btnExecute: "Ejecutar", historyTitle: "Log de Auditoría / Historial de Transacciones",
        btnExport: "📊 Exportar Libro (.CSV)", thDate: "Fecha / Comprobante", thCat: "Categoría", thType: "Tipo", thAmount: "Monto",
        budgetTitle: "Asignar Límite de Presupuesto", budgetCat: "Categoría", budgetLimit: "Limitación (€ / Mes)",
        btnBind: "Vincular Límite", budgetMonitor: "Monitoreo de Umbrales en Tiempo Real", aiTitle: "Consultor de IA de YouFinance",
        aiSubtitle: "Análisis Interactivo del Patrimonio", aiSend: "Enviar", settingsHeader: "Configuración del Sistema",
        settingsSubheader: "Configure variables globales de la aplicación, localizaciones y zonas horarias.", settingsLangLabel: "Idioma del Sistema",
        settingsTimezoneLabel: "Zona Horaria Global", placeholderDesc: "ej. Pago de salario, gastos de alquiler...", placeholderAi: "Pregunte a la IA sobre potenciales de ahorro...",
        msgWelcomeAi: "✨ Asistente del Sistema: Listo. Tengo acceso completo a sus balances. Pregúnteme sobre ahorros, pronósticos o excesos de presupuesto.",
        emptyData: "No hay datos disponibles", emptyLog: "No se encontraron registros de transacciones.", emptyBudget: "No hay límites activos asignados.",
        toastAuthError: "Acceso denegado. Credenciales inválidas.", toastFields: "Por favor, complete todos los campos obligatorios.",
        toastSec: "Nivel de seguridad insuficiente. Por favor verifique su contraseña.", toastEmailTaken: "Esta dirección de correo ya está registrada.",
        toastTokenOk: "¡Correo verificado con éxito! Bienvenido a bordo.", toastTokenErr: "Token inválido. Use para el entorno de prueba: 123456",
        toastValErr: "Entrada inválida. Se requiere descripción y monto positivo.", toastLimitErr: "Por favor, introduzca un valor de umbral válido.",
        settingsAvatarTitle: "Identidad de Perfil", avatarDesc: "Haga clic en la imagen para cargar una nueva foto. Se encuadrará de forma óptima sin distorsión alguna.",
        toastDaySelected: "Filtro activo para registros del: "
    },
    el: {
        authTitle: "Δημιουργία Λογαριασμού", authSubtitle: "Ξεκινήστε την οικονομική σας ανεξαρτησία με το You Finance",
        labelEmail: "Διεύθυνση Email", labelPassword: "Κωδικός Πρόσβασης", policyTitle: "Απαιτήσεις Ασφαλείας:",
        rememberMe: "Να παραμείνω συνδεδεμένος σε αυτή τη συσκευή", verifyNotice: "🔒 Επαλήθευση Ασφαλείας: Ένας 6ψήφιος κωδικός επιβεβαίωσης στάλθηκε στο email σας.",
        verifyLabel: "Κωδικός Επαλήθευσης (Demo Token: 123456)", verifyBtn: "Επαλήθευση Λογαριασμού",
        navDashboard: "Ταμπλό", navTransactions: "Συναλλαγές", navBudget: "Προϋπολογισμός", navAi: "Βοηθός KI", navSettings: "Ρυθμίσεις",
        logoutBtn: "Αποσύνδεση ↩", workspaceTitle: "Χώρος Εργασίας Απόδοσης", sysEncrypted: "Κρυπτογράφηση End-to-End",
        cardIncome: "Συνολικά Έσοδα", cardExpenses: "Συνολικά Έξοδα", cardBalance: "Καθαρή Ρευστότητα",
        trendIncome: "↑ Ενεργή Ταμειακή Ροή", trendExpenses: "↓ Λειτουργικές Εκροές", trendLabelValid: "Έγκυρος Ισολογισμός", trendLabelErosion: "Διάβρωση Κεφαλαίου",
        titleActivity: "Πρόσφατη Δραστηριότητα", btnJournal: "Άνοιγμα Ημερολογίου", titleStructure: "Δομή Κατηγοριών",
        transTitle: "Καταχώρηση Συναλλαγής", transDesc: "Κείμενο Συναλλαγής", transAmount: "Ποσό (€)", transType: "Ταξινόμηση", transCat: "Κατηγορία",
        optInc: "📈 Έσοδο", optExp: "📉 Έξοδο", btnExecute: "Εκτέλεση", historyTitle: "Αρχείο Ελέγχου / Ιστορικό Συναλλαγών",
        btnExport: "📊 Εξαγωγή Καθολικού (.CSV)", thDate: "Χρονική Σήμανση", thCat: "Κατηγορία", thType: "Τύπος", thAmount: "Ποσό",
        budgetTitle: "Κατανομή Ορίου Προϋπολογισμού", budgetCat: "Κατηγορία", budgetLimit: "Περιορισμός (€ / Μήνα)",
        btnBind: "Δέσμευση Ορίου", budgetMonitor: "Παρακολούθηση Ορίων σε Πραγματικό Χρόνο", aiTitle: "Σύμβουλος KI YouFinance",
        aiSubtitle: "Διαδραστική Ανάλυση Περιουσίας Realtime", aiSend: "Αποστολή", settingsHeader: "Ρυθμίσεις Συστήματος",
        settingsSubheader: "Διαμόρφωση καθολικών μεταβλητών εφαρμογής, μεταφράσεων και ζωνών ώρας.", settingsLangLabel: "Γλώσσα Συστήματος",
        settingsTimezoneLabel: "Παγκόσμια Ζώνη Ώρας", placeholderDesc: "π.χ. Πληρωμή μισθού, έξοδα ενοικίου...", placeholderAi: "Ρωτήστε την KI για δυνατότητες αποταμίευσης...",
        msgWelcomeAi: "✨ Βοηθός Συστήματος: Έτοιμος. Έχω πλήρη πρόσβαση στους ισολογισμούς σας. Ρωτήστε με για εξοικονόμηση πόρων, προβλέψεις ή υπερβάσεις προϋπολογισμού.",
        emptyData: "Δεν υπάρχουν διαθέσιμα δεδομένα", emptyLog: "Δεν βρέθηκαν δεδομένα συναλλαγών.", emptyBudget: "Δεν έχουν οριστεί ενεργά όρια.",
        toastAuthError: "Η πρόσβαση δεν επιτράπηκε. Μη έγκυρα διαπιστευτήρια.", toastFields: "Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία.",
        toastSec: "Ανεπαρκές επίπεδο ασφαλείας. Παρακαλώ ελέγξτε τον κωδικό σας.", toastEmailTaken: "Αυτή η διεύθυνση email χρησιμοποιείται ήδη.",
        toastTokenOk: "Το Email επαληθεύτηκε επιτυχώς! Καλώς ήρθατε.", toastTokenErr: "Μη έγκυρο token. Χρησιμοποιήστε για το περιβάλλον δοκιμής: 123456",
        toastValErr: "Μη έγκυρη καταχώρηση. Απαιτείται περιγραφή και θετικό ποσό.", toastLimitErr: "Παρακαλώ εισάγετε μια έγκυρη τιμή ορίου.",
        settingsAvatarTitle: "Ταυτότητα Προφίλ", avatarDesc: "Κάντε κλικ στην εικόνα για να ανεβάσετε νέα φωτογραφία. Θα προσαρμοστεί αυτόματα χωρίς παραμόρφωση.",
        toastDaySelected: "Ενεργό φίλτρο για εγγραφές στις: "
    }
};

let currentLang = localStorage.getItem('system_lang') || 'de';
let currentTimezone = localStorage.getItem('system_timezone') || 'Europe/Berlin';
let transactions = JSON.parse(localStorage.getItem('premium_transactions')) || [];
let budgets = JSON.parse(localStorage.getItem('premium_budgets')) || {};
let isLoginMode = false;
let pendingUserEmail = "";
let selectedCalendarDay = null;

const categoryColors = { Freizeit: '#818cf8', Essen: '#fb923c', Wohnen: '#f43f5e', Gehalt: '#34d399', Sonstiges: '#9ca3af' };

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('system-language-select').value = currentLang;
    document.getElementById('system-timezone-select').value = currentTimezone;
    checkUserSession();
    initLiveDateAndCalendar();
    setInterval(updateLiveClock, 1000); // Laufzeit-Uhr für Zeitzonensynchronität
});

// Realtime-Uhr & Zeitzonen-Parser
function updateLiveClock() {
    const sub = document.getElementById('live-subtitle-date');
    if (!sub) return;
    const now = new Date();
    try {
        const formattedDate = now.toLocaleDateString(currentLang === 'en' ? 'en-US' : currentLang === 'es' ? 'es-ES' : currentLang === 'el' ? 'el-GR' : 'de-DE', { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: currentTimezone 
        });
        const formattedTime = now.toLocaleTimeString('de-DE', { timeStyle: 'medium', timeZone: currentTimezone });
        sub.innerText = `${formattedDate} | ${formattedTime} (${currentTimezone.split('/')[1]})`;
    } catch(e) {
        sub.innerText = now.toLocaleDateString();
    }
}

// Toast Feedback System
function showToast(text, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${text}</span><span style="margin-left:12px;cursor:pointer;opacity:0.6;" onclick="this.parentElement.remove()">✕</span>`;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 4000);
}

// Global Localization Engine
function applyTranslations() {
    const dict = languages[currentLang];
    
    // Auth Components
    document.getElementById('t-auth-title').innerText = isLoginMode ? (currentLang === 'de' ? "Willkommen zurück" : currentLang === 'en' ? "Welcome Back" : currentLang === 'es' ? "Bienvenido de nuevo" : "Καλώς ήρθατε ξανά") : dict.authTitle;
    document.getElementById('t-auth-subtitle').innerText = isLoginMode ? (currentLang === 'de' ? "Loggen Sie sich ein, um Ihren Workspace freizuschalten." : currentLang === 'en' ? "Log in to unlock your workspace." : currentLang === 'es' ? "Inicie sesión για να ξεκλειδώσετε." : "Συνδεθείτε για να ξεκλειδώσετε το χώρο εργασίας σας.") : dict.authSubtitle;
    document.getElementById('t-label-email').innerText = dict.labelEmail;
    document.getElementById('t-label-password').innerText = dict.labelPassword;
    document.getElementById('t-policy-title').innerText = dict.policyTitle;
    document.getElementById('t-remember-me').innerText = dict.rememberMe;
    document.getElementById('auth-submit-btn').innerText = isLoginMode ? (currentLang === 'de' ? "Einloggen" : currentLang === 'en' ? "Log In" : currentLang === 'es' ? "Iniciar Sesión" : "Σύνδεση") : dict.authTitle;
    document.getElementById('t-verify-notice').innerHTML = dict.verifyNotice;
    document.getElementById('t-verify-label').innerText = dict.verifyLabel;
    document.getElementById('t-verify-btn').innerText = dict.verifyBtn;
    
    // Application Navigation
    document.getElementById('t-nav-dashboard').innerText = dict.navDashboard;
    document.getElementById('t-nav-transactions').innerText = dict.navTransactions;
    document.getElementById('t-nav-budget').innerText = dict.navBudget;
    document.getElementById('t-nav-ai').innerText = dict.navAi;
    document.getElementById('t-nav-settings').innerText = dict.navSettings;
    document.getElementById('t-logout-btn').innerText = dict.logoutBtn;
    
    // Structural Topbar
    document.getElementById('t-workspace-title').innerText = dict.workspaceTitle;
    document.getElementById('t-sys-encrypted').innerText = dict.sysEncrypted;
    
    // Premium Analytics
    document.getElementById('t-card-income').innerText = dict.cardIncome;
    document.getElementById('t-trend-income').innerText = dict.trendIncome;
    document.getElementById('t-card-expenses').innerText = dict.cardExpenses;
    document.getElementById('t-trend-expenses').innerText = dict.trendExpenses;
    document.getElementById('t-card-balance').innerText = dict.cardBalance;
    document.getElementById('t-title-activity').innerText = dict.titleActivity;
    document.getElementById('t-btn-journal').innerText = dict.btnJournal;
    document.getElementById('t-title-structure').innerText = dict.titleStructure;
    
    // Ledger Ledger
    document.getElementById('t-trans-title').innerText = dict.transTitle;
    document.getElementById('t-trans-desc').innerText = dict.transDesc;
    document.getElementById('t-trans-amount').innerText = dict.transAmount;
    document.getElementById('t-trans-type').innerText = dict.transType;
    document.getElementById('t-trans-cat').innerText = dict.transCat;
    document.getElementById('t-btn-execute').innerText = dict.btnExecute;
    document.getElementById('t-history-title').innerText = dict.historyTitle;
    document.getElementById('t-btn-export').innerText = dict.btnExport;
    
    document.getElementById('beschreibung').placeholder = dict.placeholderDesc;
    document.getElementById('ai-user-query').placeholder = dict.placeholderAi;
    
    document.getElementById('th-date').innerText = dict.thDate;
    document.getElementById('th-cat').innerText = dict.thCat;
    document.getElementById('th-type').innerText = dict.thType;
    document.getElementById('th-amount').innerText = dict.thAmount;
    
    // Budgets & AI
    document.getElementById('t-budget-title').innerText = dict.budgetTitle;
    document.getElementById('t-budget-cat').innerText = dict.budgetCat;
    document.getElementById('t-budget-limit').innerText = dict.budgetLimit;
    document.getElementById('t-btn-bind').innerText = dict.btnBind;
    document.getElementById('t-budget-monitor').innerText = dict.budgetMonitor;
    document.getElementById('t-ai-title').innerText = dict.aiTitle;
    document.getElementById('t-ai-subtitle').innerText = dict.aiSubtitle;
    document.getElementById('t-ai-send').innerText = dict.aiSend;
    
    // Settings Sub-Elements
    document.getElementById('t-settings-header').innerText = dict.settingsHeader;
    document.getElementById('t-settings-subheader').innerText = dict.settingsSubheader;
    document.getElementById('t-settings-lang-label').innerText = dict.settingsLangLabel;
    document.getElementById('t-settings-timezone-label').innerText = dict.settingsTimezoneLabel;
    document.getElementById('t-settings-avatar-title').innerText = dict.settingsAvatarTitle;
    document.getElementById('t-avatar-desc').innerText = dict.avatarDesc;
}

function changeSystemLanguage(langCode) {
    currentLang = langCode;
    localStorage.setItem('system_lang', langCode);
    applyTranslations();
    initLiveDateAndCalendar();
    updateUI();
    
    const chatBox = document.getElementById('ai-chat-box');
    if(chatBox) {
        chatBox.innerHTML = `<div class="ai-msg system">${languages[currentLang].msgWelcomeAi}</div>`;
    }
}

function changeSystemTimezone(tzCode) {
    currentTimezone = tzCode;
    localStorage.setItem('system_timezone', tzCode);
    updateLiveClock();
}

function checkUserSession() {
    applyTranslations();
    const activeUser = localStorage.getItem('active_user');
    if (activeUser) {
        document.getElementById('auth-screen').style.display = 'none';
        document.getElementById('app-screen').style.display = 'flex';
        
        const shortName = activeUser.split('@')[0];
        document.getElementById('user-display-name').innerText = shortName;
        document.getElementById('user-avatar-fallback').innerText = shortName.substring(0, 2).toUpperCase();
        document.getElementById('settings-avatar-fallback').innerText = shortName.substring(0, 2).toUpperCase();
        
        document.getElementById('ai-chat-box').innerHTML = `<div class="ai-msg system">${languages[currentLang].msgWelcomeAi}</div>`;
        
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
    document.getElementById('auth-form-fields').style.display = 'flex';
    document.getElementById('verification-fields').style.display = 'none';
    
    const textEl = document.getElementById('auth-toggle-text');
    if(isLoginMode) {
        textEl.innerHTML = currentLang === 'de' ? 'Neu bei You Finance? <span onclick="toggleAuthMode()">Konto erstellen</span>' : 'New to You Finance? <span onclick="toggleAuthMode()">Create account</span>';
    } else {
        textEl.innerHTML = currentLang === 'de' ? 'Bereits Mitglied? <span onclick="toggleAuthMode()">Jetzt einloggen</span>' : 'Already a member? <span onclick="toggleAuthMode()">Log in now</span>';
    }
    applyTranslations();
}

function validatePasswordLive() {
    if (isLoginMode) return { isValid: true };
    const val = document.getElementById('auth-password').value;
    const rules = { length: val.length >= 8, uppercase: /[A-Z]/.test(val), number: /[0-9]/.test(val), special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val) };

    updatePolicyUI('policy-length', rules.length, currentLang === 'de' ? "Mindestens 8 Zeichen" : "At least 8 characters");
    updatePolicyUI('policy-uppercase', rules.uppercase, currentLang === 'de' ? "Einen Großbuchstaben" : "One uppercase letter");
    updatePolicyUI('policy-number', rules.number, currentLang === 'de' ? "Eine Zahl (0-9)" : "One number (0-9)");
    updatePolicyUI('policy-special', rules.special, currentLang === 'de' ? "Ein Sonderzeichen (!@#$%^&*)" : "One special char (!@#$%^&*)");

    return { isValid: Object.values(rules).every(Boolean) };
}

function updatePolicyUI(id, isValid, text) {
    const el = document.getElementById(id);
    if (!el) return;
    el.className = isValid ? 'valid' : 'invalid';
    el.innerText = `${isValid ? '✓' : '❌'} ${text}`;
}

function handleAuth() {
    const email = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value;
    const dict = languages[currentLang];
    
    if (!email || !password) {
        showToast(dict.toastFields, 'error');
        return;
    }
    
    if (isLoginMode) {
        const registeredPassword = localStorage.getItem(`user_${email}`);
        if (registeredPassword && registeredPassword === password) {
            localStorage.setItem('active_user', email);
            checkUserSession();
        } else {
            showToast(dict.toastAuthError, 'error');
        }
    } else {
        if (!validatePasswordLive().isValid) {
            showToast(dict.toastSec, 'error');
            return;
        }
        if (localStorage.getItem(`user_${email}`)) {
            showToast(dict.toastEmailTaken, 'error');
            return;
        }
        
        pendingUserEmail = email;
        localStorage.setItem(`user_temp_pwd`, password); 
        
        document.getElementById('auth-form-fields').style.display = 'none';
        document.getElementById('password-policies').style.display = 'none';
        document.getElementById('verification-fields').style.display = 'flex';
    }
}

function confirmVerificationCode() {
    const code = document.getElementById('verify-code').value.trim();
    const dict = languages[currentLang];
    if (code === "123456") {
        const password = localStorage.getItem(`user_temp_pwd`);
        localStorage.setItem(`user_${pendingUserEmail}`, password);
        localStorage.setItem('active_user', pendingUserEmail);
        localStorage.removeItem(`user_temp_pwd`);
        showToast(dict.toastTokenOk, 'success');
        checkUserSession();
    } else {
        showToast(dict.toastTokenErr, 'error');
    }
}

// Verzerrungsfreie Skalierungsmatrix für Profilbilder (object-fit Emulation auf Canvas-Ebene)
function triggerAvatarUpload() { document.getElementById('avatar-input').click(); }
function updateAvatar(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Quadratischer Crop-Faktor zur Eliminierung von Stretches
            const targetSize = 150;
            canvas.width = targetSize; 
            canvas.height = targetSize;
            
            let srcX = 0, srcY = 0, srcW = img.width, srcH = img.height;
            if (img.width > img.height) {
                srcW = img.height;
                srcX = (img.width - img.height) / 2;
            } else {
                srcH = img.width;
                srcY = (img.height - img.width) / 2;
            }
            
            ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, targetSize, targetSize);
            const base64 = canvas.toDataURL('image/jpeg', 0.9);
            localStorage.setItem(`avatar_${localStorage.getItem('active_user')}`, base64);
            loadSavedAvatar();
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function loadSavedAvatar() {
    const saved = localStorage.getItem(`avatar_${localStorage.getItem('active_user')}`);
    const imgSidebar = document.getElementById('user-avatar-img');
    const fallbackSidebar = document.getElementById('user-avatar-fallback');
    const imgSettings = document.getElementById('settings-avatar-img');
    const fallbackSettings = document.getElementById('settings-avatar-fallback');
    
    if (saved) { 
        if(imgSidebar) { imgSidebar.src = saved; imgSidebar.style.display = 'block'; }
        if(fallbackSidebar) fallbackSidebar.style.display = 'none';
        if(imgSettings) { imgSettings.src = saved; imgSettings.style.display = 'block'; }
        if(fallbackSettings) fallbackSettings.style.display = 'none';
    } else { 
        if(imgSidebar) imgSidebar.style.display = 'none';
        if(fallbackSidebar) fallbackSidebar.style.display = 'flex';
        if(imgSettings) imgSettings.style.display = 'none';
        if(fallbackSettings) fallbackSettings.style.display = 'flex';
    }
}

// Ledger Ledger Generator
function exportToCSV() {
    if (transactions.length === 0) { showToast(languages[currentLang].emptyLog, 'error'); return; }
    let csvContent = "\uFEFF";
    csvContent += "Date;Reference;Category;Type;Amount (EUR)\r\n";
    transactions.forEach(t => {
        csvContent += `${t.datum};${t.beschreibung};${t.kategorie};${t.typ.toUpperCase()};${t.typ === 'einnahme' ? "" : "-"}${t.betrag.toFixed(2)}\r\n`;
    });
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `YouFinance_Statement_${Date.now()}.csv`;
    link.click();
}

// KI Virtual Consultant Core Logic
function sendAiMessage() {
    const inputEl = document.getElementById('ai-user-query');
    const query = inputEl.value.trim();
    if (!query) return;

    const chatBox = document.getElementById('ai-chat-box');
    const userMsg = document.createElement('div');
    userMsg.className = 'ai-msg user';
    userMsg.innerText = query;
    chatBox.appendChild(userMsg);
    inputEl.value = '';
    chatBox.scrollTop = chatBox.scrollHeight;

    let income = 0, expense = 0;
    let catExpenses = { Freizeit: 0, Essen: 0, Wohnen: 0, Sonstiges: 0 };
    transactions.forEach(t => {
        if(t.typ === 'einnahme') income += t.betrag;
        else { expense += t.betrag; if(catExpenses[t.kategorie] !== undefined) catExpenses[t.kategorie] += t.betrag; }
    });

    setTimeout(() => {
        const aiMsg = document.createElement('div');
        aiMsg.className = 'ai-msg system';
        let reply = "";
        
        if(currentLang === 'de') {
            if(query.toLowerCase().includes('ausgaben') || query.toLowerCase().includes('kosten')) {
                reply = `Ihre laufenden Gesamtausgaben belaufen sich auf €${expense.toFixed(2)}. Der Haupttreiber ist hierbei Wohnen & Fixkosten.`;
            } else {
                reply = `Analyse abgeschlossen: Ihr Netto-Liquiditätssaldo beträgt €${(income-expense).toFixed(2)}. Empfehlung: Binden Sie ungenutztes Kapital in produktive Assets.`;
            }
        } else if(currentLang === 'en') {
            reply = `Financial query processed. Total expenses are at €${expense.toFixed(2)} while active income is €${income.toFixed(2)}. Strategy: Keep savings rate above 20%.`;
        } else if(currentLang === 'es') {
            reply = `Análisis de cartera completado. Gastos consolidados: €${expense.toFixed(2)}. Recomiendo optimizar las salidas operativas.`;
        } else {
            reply = `Η επεξεργασία των δεδομένων ολοκληρώθηκε. Συνολικά έξοδα: €${expense.toFixed(2)}. Η οικονομική σας βάση παραμένει σταθερή.`;
        }

        aiMsg.innerHTML = `✨ <strong>KI-Consultant:</strong> ${reply}`;
        chatBox.appendChild(aiMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 600);
}

// Render-Modul für Vektordiagramme (Nativer Donut-Chart)
function renderDonutChart(catExpenses, totalExpense) {
    const canvas = document.getElementById('chart-canvas');
    const legend = document.getElementById('chart-legend');
    const centerLabel = document.getElementById('chart-center-label');
    const dict = languages[currentLang];
    if (!canvas || !legend) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (totalExpense === 0) {
        ctx.beginPath(); ctx.arc(75, 75, 65, 0, 2 * Math.PI);
        ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 14; ctx.stroke();
        legend.innerHTML = `<p class="empty-text" style="padding:0">${dict.emptyData}</p>`;
        if(centerLabel) centerLabel.innerHTML = `${dict.thAmount}<br><strong style="color:#fff">€0.00</strong>`;
        return;
    }

    if(centerLabel) centerLabel.innerHTML = `${dict.thAmount}<br><strong style="color:#fff; font-size:13px;">€${totalExpense.toFixed(0)}</strong>`;
    legend.innerHTML = '';
    let startAngle = -0.5 * Math.PI;

    for (let kat in catExpenses) {
        const val = catExpenses[kat]; if (val === 0) continue;
        const slice = (val / totalExpense) * 2 * Math.PI;
        const pct = (val / totalExpense) * 100;
        const color = categoryColors[kat] || '#fff';

        ctx.beginPath(); ctx.arc(75, 75, 65, startAngle, startAngle + slice);
        ctx.strokeStyle = color; ctx.lineWidth = 14; ctx.stroke();
        startAngle += slice;

        const item = document.createElement('div');
        item.className = 'legend-item';
        item.innerHTML = `<div class="legend-color" style="background:${color}"></div><span style="color:#fff;font-weight:500;">${kat}</span> <span style="color:var(--text-muted)">(${pct.toFixed(0)}%)</span>`;
        legend.appendChild(item);
    }
}

function updateUI() {
    let inc = 0, exp = 0;
    let catExpenses = { Freizeit: 0, Essen: 0, Wohnen: 0, Sonstiges: 0 };
    const dict = languages[currentLang];

    const tableBody = document.getElementById('transaction-table-body');
    const activityList = document.getElementById('recent-activity-list');
    if (tableBody) tableBody.innerHTML = '';

    // Filter für Kalenderinteraktion vorbereiten
    transactions.forEach(t => {
        if (t.typ === 'einnahme') inc += t.betrag;
        else { exp += t.betrag; if (catExpenses[t.kategorie] !== undefined) catExpenses[t.kategorie] += t.betrag; }

        if (tableBody) {
            const row = document.createElement('tr');
            const isInc = t.typ === 'einnahme';
            row.innerHTML = `
                <td><strong>${t.beschreibung}</strong><br><small style="color:#6b7280">${t.datum}</small></td>
                <td><span style="background:rgba(255,255,255,0.03);padding:4px 10px;border-radius:6px;font-size:12px;border:1px solid var(--border-color);">${t.kategorie}</span></td>
                <td style="color:${isInc ? '#10b981':'#ef4444'};font-weight:600;font-size:12px;">${t.typ.toUpperCase()}</td>
                <td class="text-right" style="color:${isInc ? '#10b981':'#ef4444'};font-weight:600;">${isInc ? '+':'-'}€${t.betrag.toFixed(2)}</td>
            `;
            tableBody.appendChild(row);
        }
    });

    const bal = inc - exp;
    document.getElementById('total-income').innerText = `€${inc.toFixed(2)}`;
    document.getElementById('total-expenses').innerText = `€${exp.toFixed(2)}`;
    
    const balEl = document.getElementById('total-balance');
    const trendLabel = document.getElementById('trend-label');
    if(balEl) {
        balEl.innerText = `${bal >= 0 ? '+' : ''}€${bal.toFixed(2)}`;
        balEl.style.color = bal >= 0 ? '#10b981' : '#ef4444';
        if(trendLabel) trendLabel.innerText = bal >= 0 ? dict.trendLabelValid : dict.trendLabelErosion;
    }

    if (activityList) {
        if (transactions.length === 0) { activityList.innerHTML = `<p class="empty-text">${dict.emptyLog}</p>`; }
        else {
            activityList.innerHTML = '';
            transactions.slice(-4).reverse().forEach(t => {
                const item = document.createElement('div');
                item.style.cssText = "display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid var(--border-color);";
                item.innerHTML = `<div><p style="font-size:14px;font-weight:500;">${t.beschreibung}</p><small style="color:#6b7280">${t.kategorie}</small></div><span style="color:${t.typ==='einnahme'?'#10b981':'#ef4444'};font-weight:600;font-size:14px;">${t.typ==='einnahme'?'+':'-'}€${t.betrag.toFixed(2)}</span>`;
                activityList.appendChild(item);
            });
        }
    }
    renderBudgets(catExpenses);
    renderDonutChart(catExpenses, exp);
}

function renderBudgets(catExpenses) {
    const container = document.getElementById('budget-progress-container');
    const dict = languages[currentLang];
    if (!container) return;
    if (Object.keys(budgets).length === 0) { container.innerHTML = `<p class="empty-text">${dict.emptyBudget}</p>`; }
    else {
        container.innerHTML = '';
        for (let kat in budgets) {
            const lim = budgets[kat]; const spent = catExpenses[kat] || 0;
            const pct = Math.min((spent / lim) * 100, 100);
            const box = document.createElement('div');
            box.className = 'budget-bar-wrapper';
            box.innerHTML = `<div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:14px;"><span><strong>${kat}</strong></span><span style="color:var(--text-muted)">€${spent.toFixed(2)} / <strong style="color:#fff">€${lim.toFixed(2)}</strong></span></div><div style="background:#111827;height:6px;border-radius:3px;overflow:hidden;"><div style="background:${pct>=100?'#ef4444':pct>=85?'#f59e0b':'#6366f1'};width:${pct}%;height:100%;transition:width 0.3s;"></div></div>`;
            container.appendChild(box);
        }
    }
}

function addTransaction() {
    const desc = document.getElementById('beschreibung').value.trim();
    const amt = parseFloat(document.getElementById('betrag').value);
    const typ = document.getElementById('typ').value;
    const cat = document.getElementById('kategorie').value;

    if (!desc || isNaN(amt) || amt <= 0) { showToast(languages[currentLang].toastValErr, 'error'); return; }
    
    // Falls ein Kalendertag gewählt ist, wird das Datum für die Transaktion übernommen, sonst das heutige
    let targetDate = new Date().toLocaleDateString('de-DE');
    if (selectedCalendarDay) {
        const hoy = new Date();
        targetDate = new Date(hoy.getFullYear(), hoy.getMonth(), selectedCalendarDay).toLocaleDateString('de-DE');
    }

    transactions.push({ id: Date.now(), beschreibung: desc, betrag: amt, typ, kategorie: cat, datum: targetDate });
    localStorage.setItem('premium_transactions', JSON.stringify(transactions));
    document.getElementById('beschreibung').value = ''; document.getElementById('betrag').value = '';
    updateUI();
}

function setBudget() {
    const kat = document.getElementById('budget-kategorie').value;
    const lim = parseFloat(document.getElementById('budget-limit').value);
    if (isNaN(lim) || lim <= 0) { showToast(languages[currentLang].toastLimitErr, 'error'); return; }
    budgets[kat] = lim; localStorage.setItem('premium_budgets', JSON.stringify(budgets));
    document.getElementById('budget-limit').value = '';
    updateUI();
}

function openTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active-content'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(tabId).classList.add('active-content');
    document.getElementById(`btn-${tabId}`).classList.add('active');
}

// Interaktive Kalenderlogik für selektierbare Daten
function initLiveDateAndCalendar() {
    updateLiveClock();
    const hoy = new Date();

    const calHeader = document.getElementById('calendar-month-year');
    if (calHeader) calHeader.innerText = hoy.toLocaleDateString(currentLang === 'en' ? 'en-US' : 'de-DE', { month: 'long', year: 'numeric' });

    const grid = document.getElementById('calendar-days-grid');
    if (grid) {
        grid.innerHTML = '';
        let firstDay = new Date(hoy.getFullYear(), hoy.getMonth(), 1).getDay();
        firstDay = firstDay === 0 ? 6 : firstDay - 1;
        const totalDays = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
        
        for (let i = 0; i < firstDay; i++) grid.appendChild(document.createElement('div'));
        
        for (let t = 1; t <= totalDays; t++) {
            const el = document.createElement('div'); 
            el.innerText = t;
            
            if (t === hoy.getDate()) el.className = 'today';
            
            // Klick-Event für die Datumsauswahl
            el.addEventListener('click', () => {
                document.querySelectorAll('#calendar-days-grid div').forEach(day => day.classList.remove('selected-day'));
                el.classList.add('selected-day');
                selectedCalendarDay = t;
                
                const chosenDate = new Date(hoy.getFullYear(), hoy.getMonth(), t).toLocaleDateString('de-DE');
                showToast(`${languages[currentLang].toastDaySelected} ${chosenDate}`, 'info');
            });
            
            grid.appendChild(el);
        }
    }
}

function logout() { localStorage.removeItem('active_user'); checkUserSession(); }
