
<?php
// api.php
header('Content-Type: application/json');

$host = 'localhost';
$db   = 'trastos';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    
    if (isset($_GET['accion']) && $_GET['accion'] === 'get_lugares') {

        // Eliminamos el WHERE para traerlo todo
        $stmt = $pdo->prepare("
            SELECT 
                l.titulo, 
                l.calle, 
                l.coordenadas, 
                l.dias,
                b.nombre AS barrio,
                c.nombre AS ciudad
            FROM lugares l
            LEFT JOIN barrios b ON l.barrio_id = b.id
            LEFT JOIN ciudades c ON b.ciudad_id = c.id
        ");

        $stmt->execute();

        $resultados = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode($resultados);
    }
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}