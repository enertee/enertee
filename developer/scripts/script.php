<?php
$stored_user = 'YWRtaW4=';
$stored_pass = 'blJ0QzBNZGV2ITI1QDA1IzI1Pz1YOSZiRjcqTHBRejQld1ZeVHNHOCRKbU5yUXohNzNAWW5McF5YdiQ4NCZGcyNUZzkqQndeQ20weiFRcExyIzJZeFZzJk5rTWg3KkRmXlp0RzEkSm9SNQ0K';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input_user = $_POST['encoded_name'] ?? '';
    $input_pass = $_POST['encoded_pw'] ?? '';

    if ($input_user === $stored_user && $input_pass === $stored_pass) {
        echo "✅ Login erfolgreich! Benutzer: " . htmlspecialchars(base64_decode($input_user));
    } else {
        echo "❌ Login fehlgeschlagen.";
    }
} else {
    echo "Ungültiger Zugriff.";
}
