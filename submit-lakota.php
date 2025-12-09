<?php
// submit-lakota.php - Traitement des notifications Lakota

// 1. Récupérer les données
$name = $_POST['name'] ?? '';
$phone = $_POST['phone'] ?? '';
$email = $_POST['email'] ?? '';
$city = $_POST['city'] ?? '';
$type = $_POST['type'] ?? 'lakota_notification';
$consent = isset($_POST['consent']) ? 'Oui' : 'Non';

// 2. Vérification
if (empty($name) || empty($phone)) {
    die("ERREUR : Nom et téléphone sont obligatoires.");
}

// 3. Sauvegarder dans un fichier
$data = date('Y-m-d H:i:s') . " | LAKOTA | $name | $phone | $email | $city | $consent\n";
file_put_contents('lakota-notifications.txt', $data, FILE_APPEND);

// 4. Envoyer un email
$to = "afamouss@yahoo.fr"; // Votre email
$subject = "🔔 Notification Lakota - Mousso Massa";

$message = "NOUVELLE NOTIFICATION POUR L'ÉVÉNEMENT LAKOTA :\n\n";
$message .= "👤 Nom: $name\n";
$message .= "📞 Téléphone: $phone\n";
if (!empty($email)) $message .= "📧 Email: $email\n";
if (!empty($city)) $message .= "🏙️ Ville: $city\n";
$message .= "✅ Consentement: $consent\n";
$message .= "🎯 Type: Événement à Lakota\n";
$message .= "📅 Date d'inscription: " . date('Y-m-d H:i:s') . "\n\n";
$message .= "---\n";
$message .= "Cet email a été envoyé depuis le formulaire Lakota du site Mousso Massa.";

// En-têtes
$headers = "From: lakota@moussomassa-ong.org\r\n";
if (!empty($email)) $headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Envoyer l'email
mail($to, $subject, $message, $headers);

// 5. Réponse JSON pour AJAX
header('Content-Type: application/json');
echo json_encode([
    'success' => true,
    'message' => 'Inscription enregistrée avec succès',
    'timestamp' => date('Y-m-d H:i:s')
]);

// Ou rediriger si nécessaire
// header('Location: merci-lakota.html');
?>