<?php
// submit.php - Version améliorée

// 1. Récupérer les données
$name = $_POST['name'] ?? '';
$phone = $_POST['phone'] ?? '';
$email = $_POST['email'] ?? '';
$role = $_POST['role'] ?? '';
$consent = isset($_POST['consent']) ? 'Oui' : 'Non';

// 2. Vérification basique
if (empty($name) || empty($phone) || empty($email) || empty($role)) {
    die("ERREUR : Tous les champs sont obligatoires.");
}

// 3. Sauvegarder dans un fichier
$data = date('Y-m-d H:i:s') . " | $name | $phone | $email | $role | $consent\n";
file_put_contents('inscriptions.txt', $data, FILE_APPEND);

// 4. Envoyer un email
$to = "votre@gemail.com"; // ⬅️ METTEZ VOTRE VRAI EMAIL ICI
$subject = "🎉 Nouvelle inscription Mousso Massa";
$message = "Une nouvelle inscription a été enregistrée :\n\n";
$message .= "👤 Nom: $name\n";
$message .= "📞 Téléphone: $phone\n";
$message .= "📧 Email: $email\n";
$message .= "🎯 Rôle: $role\n";
$message .= "✅ Consentement: $consent\n";
$message .= "📅 Date: " . date('Y-m-d H:i:s') . "\n\n";
$message .= "---\n";
$message .= "Cet email a été envoyé automatiquement depuis le site Mousso Massa.";

// En-têtes de l'email
$headers = "From: inscriptions@moussomassa.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Envoyer l'email
mail($to, $subject, $message, $headers);

// 5. Rediriger
header('Location: merci.html');
exit();
?>