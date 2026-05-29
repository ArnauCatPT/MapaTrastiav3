<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <meta name="description" content="Mapa interactivo y Visualizacion de tarjetas de los tipos de trastos y dias de recogida">
    <meta name="author" content="Arnau Pardal">
    <meta name="copyright" content="Arnau Pardal 2026"> -->
    <title>Mapa interactivo (Barcelona, Gerona, Sabadell)</title>
    <link rel="stylesheet" href="./css/estilos.css">
    <!-- Leaflet -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>    
</head>
<body>
    <header>
        <div class="barra-busqueda">
            <select id="city-Select" name="city-Select">
                <option value="all">Todas las ciudades</option>
                <option value="Barcelona">Barcelona</option>
                <option value="Girona">Girona</option>
                <option value="Sabadell">Sabadell</option>
            </select>

            <select id="barrio-Select" name="barrio-Select">
                <option value="all">Todos los barrios</option>
                <option value="Centro">Centro</option>
                <option value="Gracia">Gracia</option>
                <option value="Sant Gervasi">Sant Gervasi</option>
                <option value="Sants">Sants</option>
                <option value="Sarria">Sarria</option>
            </select>

            <select name="tipo-Select" id="tipo-Select">
                <option value="all">Todos</option>
                <option value="Sofá">Sofá</option>
                <option value="Mesa">Mesa</option>
                <option value="Silla">Silla</option>
                <option value="Armario">Armario</option>
                <option value="Lámpara">Lámpara</option>
                <option value="Ropa">Ropa</option>
            </select>

            <select name="dia-Select" id="dia-Select">
                <option value="all">Todos los dias</option>
                <option value="Lunes">Lunes</option>
                <option value="Martes">Martes</option>
                <option value="Miércoles">Miércoles</option>
                <option value="Jueves">Jueves</option>
                <option value="Viernes">Viernes</option>
                <option value="Sábado">Sábado</option>
                <option value="Domingo">Domingo</option>
            </select>

            <input type="date" id="datePicker">

            <button id="searchBtn">Buscar</button>
            <button id="mapBtn">🗺️</button>

        </div>


    </header>

    <main id="mainContent">
        <p>Haz una búsqueda para ver resultados</p>
    </main>


    <footer>
        <p>&copy; <?php echo date("Y"); ?>Mapa Interactivo de Trastos Viejos de Barcelona, Gerona y Sabadell</p>
        <p>Desarrollo web en entorno servidor</p>
    </footer>
    <!-- Leaflet -->
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>


    <!-- Tu JS -->
    <script src="./js/prue.js"></script>
    
</body>
</html>

