function openTab(tabId) {
    // 1. Alle Inhalte unsichtbar machen
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.classList.remove('active-content');
    });

    // 2. Bei allen Buttons den "Aktiv"-Status entfernen
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // 3. Den ausgewählten Inhalt anzeigen
    document.getElementById(tabId).classList.add('active-content');

    // 4. Den geklickten Button als aktiv markieren
    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('active');
    }
}
