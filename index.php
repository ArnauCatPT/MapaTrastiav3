<?php
// Iniciamos el buffer de salida para evitar errores de "Headers already sent"
ob_start();


ob_end_clean();

// Redirigimos a la interfaz principal
header("Location: main.php");
exit(); // Siempre usa exit() después de un header Location
?>
   
