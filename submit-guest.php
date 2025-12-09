<?php
// submit-guest.php - Traitement des propositions d'invitées

// 1. Récupérer les données
$sender_name = $_POST['sender_name'] ?? '';
$sender_phone = $_POST['sender_phone'] ?? '';
$sender_email = $_POST['sender_email'] ?? '';
$guest_name = $_POST['guest_name'] ?? '';
$guest_contact = $_POST['guest_contact'] ?? '';
$relationship = $_POST['relationship'] ?? '';
$reason = $_POST['reason'] ?? '';
$topic = $_POST['topic'] ?? '';
$consent = isset($_POST['consent']) ? 'Oui' : 'Non';

// 2. Vérification
if (empty($sender_name) || empty($sender_phone) || empty($guest_name) || empty($reason)) {
    die("ERREUR : Champs obligatoires manquants.");
}

// 3. Sauvegarder
$data = date('Y-m-d H:i:s') . " | INVITEE | $sender_name | $sender_phone | $guest_name | $relationship\n";
file_put_contents('guest-proposals.txt', $data, FILE_APPEND);

// 4. Envoyer email
$to = "afamouss@yahoo.fr";
$subject = "🎤 Proposition d'invitée - Émission Mousso Massa";

$message = "NOUVELLE PROPOSITION D'INVITÉE POUR L'ÉMISSION :\n\n";
$message .= "=== INFORMATIONS DU PROPOSANT ===\n";
$message .= "👤 Nom: $sender_name\n";
$message .= "📞 Téléphone: $sender_phone\n";
if (!empty($sender_email)) $message .= "📧 Email: $sender_email\n";
$message .= "🤝 Relation avec l'invitée: $relationship\n\n";

$message .= "=== INFORMATIONS DE L'INVITÉE PROPOSÉE ===\n";
$message .= "🌟 Nom: $guest_name\n";
if (!empty($guest_contact)) $message .= "📱 Contact: $guest_contact\n\n";

$message .= "=== RAISON DE LA PROPOSITION ===\n";
$message .= "$reason\n\n";

if (!empty($topic)) {
    $message .= "=== THÈME SUGGÉRÉ ===\n";
    $message .= "$topic\n\n";
}

$message .= "✅ Consentement: $consent\n";
$message .= "📅 Date: " . date('Y-m-d H:i:s') . "\n\n";
$message .= "---\n";
$message .= "Proposition envoyée depuis le site Mousso Massa.";

$headers = "From: emission@moussomassa-ong.org\r\n";
if (!empty($sender_email)) $headers .= "Reply-To: $sender_email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

mail($to, $subject, $message, $headers);

// 5. Réponse
header('Content-Type: application/json');
echo json_encode([
    'success' => true,
    'message' => 'Proposition envoyée avec succès'
]);
?>