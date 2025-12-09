<?php
// submit.php - Version UNIQUE pour toutes les soumissions

// 1. Détecter le type de formulaire
$type = $_POST['type'] ?? 'default';

// 2. Récupérer les données selon le type
if ($type === 'lakota_notification' || $type === 'guest_proposal') {
    // Pour Lakota et Invitée
    $name = $_POST['name'] ?? $_POST['sender_name'] ?? '';
    $phone = $_POST['phone'] ?? $_POST['sender_phone'] ?? '';
    $email = $_POST['email'] ?? $_POST['sender_email'] ?? '';
    $city = $_POST['city'] ?? '';
    $guest_name = $_POST['guest_name'] ?? '';
    $guest_contact = $_POST['guest_contact'] ?? '';
    $relationship = $_POST['relationship'] ?? '';
    $reason = $_POST['reason'] ?? '';
    $topic = $_POST['topic'] ?? '';
    $role = ''; // Pas de rôle pour ces types
} else {
    // Pour l'inscription standard (membre, bénévole, partenaire, forum)
    $name = $_POST['name'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $email = $_POST['email'] ?? '';
    $role = $_POST['role'] ?? '';
    $city = '';
    $guest_name = '';
    $guest_contact = '';
    $relationship = '';
    $reason = '';
    $topic = '';
}

$consent = isset($_POST['consent']) ? 'Oui' : 'Non';

// 3. Vérification basique
if (empty($name) || empty($phone)) {
    die("ERREUR : Nom et téléphone sont obligatoires.");
}

// 4. Sauvegarder dans des fichiers différents selon le type
$timestamp = date('Y-m-d H:i:s');
$data = "$timestamp | $type | $name | $phone | $email | $consent";

// Ajouter des informations spécifiques
if (!empty($role)) $data .= " | Rôle: $role";
if (!empty($city)) $data .= " | Ville: $city";
if (!empty($guest_name)) $data .= " | Invitée: $guest_name";
if (!empty($reason)) $data .= " | Raison: " . substr($reason, 0, 50) . "...";

$data .= "\n";

// Sauvegarde principale
file_put_contents('toutes-soumissions.txt', $data, FILE_APPEND);

// Sauvegarde spécifique
switch($type) {
    case 'lakota_notification':
        file_put_contents('lakota-notifications.txt', $data, FILE_APPEND);
        break;
    case 'guest_proposal':
        file_put_contents('guest-proposals.txt', $data, FILE_APPEND);
        break;
    default:
        file_put_contents('inscriptions.txt', $data, FILE_APPEND);
}

// 5. Préparer l'email selon le type
$to = "afamouss@yahoo.fr";

// Sujet selon le type
$subjects = [
    'membre' => '🎉 Nouvelle inscription - Membre ONG Moussos Massa',
    'benevole' => '🤝 Nouvelle inscription - Bénévole ONG Moussos Massa',
    'partenaire' => '🤝 Nouvelle inscription - Partenaire ONG Moussos Massa',
    'forum' => '📅 Nouvelle inscription - Forum 2025 Moussos Massa',
    'lakota_notification' => '🔔 Notification Lakota - Mousso Massa',
    'guest_proposal' => '🎤 Proposition d\'invitée - Émission TV',
    'default' => '📨 Nouvelle soumission - Site Moussos Massa'
];

$subject = $subjects[$type] ?? $subjects['default'];

// Construire le message
$message = "========================================\n";
$message .= "NOUVELLE SOUMISSION - " . strtoupper($type) . "\n";
$message .= "========================================\n\n";

$message .= "📅 DATE: $timestamp\n";
$message .= "👤 NOM: $name\n";
$message .= "📞 TÉLÉPHONE: $phone\n";
if (!empty($email)) $message .= "📧 EMAIL: $email\n";

// Informations spécifiques
switch($type) {
    case 'membre':
    case 'benevole':
    case 'partenaire':
    case 'forum':
        $role_fr = [
            'membre' => 'Membre',
            'benevole' => 'Bénévole', 
            'partenaire' => 'Partenaire',
            'forum' => 'Participant Forum 2025'
        ][$role] ?? $role;
        $message .= "🎯 RÔLE: $role_fr\n";
        break;
        
    case 'lakota_notification':
        $message .= "📍 ÉVÉNEMENT: Lakota\n";
        if (!empty($city)) $message .= "🏙️ VILLE: $city\n";
        $message .= "🔔 DEMANDE: Être prévenu de la date\n";
        break;
        
    case 'guest_proposal':
        if (!empty($guest_name)) {
            $message .= "\n=== PROPOSITION D'INVITÉE ===\n";
            $message .= "🌟 NOM INVITÉE: $guest_name\n";
            if (!empty($guest_contact)) $message .= "📱 CONTACT INVITÉE: $guest_contact\n";
            if (!empty($relationship)) $message .= "🤝 RELATION: $relationship\n";
        }
        if (!empty($topic)) {
            $message .= "🎤 THÈME SUGGÉRÉ: $topic\n";
        }
        if (!empty($reason)) {
            $message .= "\n=== RAISON DE LA PROPOSITION ===\n";
            $message .= "$reason\n";
        }
        break;
}

$message .= "\n✅ CONSENTEMENT: $consent\n";
$message .= "========================================\n";
$message .= "📧 Email envoyé depuis le formulaire du site\n";
$message .= "🌍 Site: ONG Moussos Massa - Quand La Femme veut, elle peut\n";
$message .= "========================================\n";

// 6. En-têtes de l'email
$headers = "From: inscriptions@moussomassa-ong.org\r\n";
if (!empty($email)) $headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// 7. Envoyer l'email
mail($to, $subject, $message, $headers);

// 8. Rediriger vers la bonne page de remerciement
switch($type) {
    case 'lakota_notification':
        header('Location: merci-lakota.html');
        break;
    case 'guest_proposal':
        header('Location: merci-invitee.html');
        break;
    default:
        header('Location: merci.html');
}
exit();
?>