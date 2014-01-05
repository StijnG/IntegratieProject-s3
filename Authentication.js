var clientId = '663658222418-41alrf9qinerlds3b71d93ga777jdfki.apps.googleusercontent.com';
var apiKey = 'AIzaSyANDBwPvO1iEdHrsrgj_W3fe_NK6lu4gTY';
var scopes = 'https://www.googleapis.com/auth/analytics.readonly';

// Wordt opgeropen als de client library werd geladen
function handleClientLoad() {
    // 1. De API key wordt 'geset'
    gapi.client.setApiKey(apiKey);

    // 2. Kijkt of de user geautoriseert is
    window.setTimeout(checkAuth, 1);
}

function checkAuth() {
    // Hierbij wordt de Google Accounts Service opgeropen om de gebruiker te laten inloggen
    // die gegevens worden dan doorgespeeld naar de handleAuthResult functie 
    gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: true }, handleAuthResult);
}

function handleAuthResult(authResult) {
    if (authResult) {
        // De gebruiker is geautoriseert
        // Laad de Analytics Client. 
        loadAnalyticsClient();
    } else {
        // De gebruiker is niet geautoriseert
        handleUnAuthorized();
    }
}

function loadAnalyticsClient() {
    // Laad de Analytics Client en roep de functie handleAuthorized op
    gapi.client.load('analytics', 'v3', handleAuthorized);
}

function handleAuthorized() {
    var authorizeButton = document.getElementById('authorize-button');
    var makeApiCallButton = document.getElementById('make-api-call-button');

    // Toon de Toon Google Chart button en verberg de Autoriseren button
    makeApiCallButton.style.visibility = '';
    authorizeButton.style.visibility = 'hidden';

    // makeApiCall functie wordt opgeroepen als de Toon Google Chart button wordt aangeklikt
    makeApiCallButton.onclick = makeApiCall;
}

function handleUnAuthorized() {
    var authorizeButton = document.getElementById('authorize-button');
    var makeApiCallButton = document.getElementById('make-api-call-button');

    // Toon de Autoriseren button en verberg de Toon Google Chart button
    makeApiCallButton.style.visibility = 'hidden';
    authorizeButton.style.visibility = '';

    // handleAuthClick functie wordt opgeropen als de Autoriseren button wordt aangeklikt
    authorizeButton.onclick = handleAuthClick;
}

function handleAuthClick(event) {
    gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: false }, handleAuthResult);
    return false;
}

