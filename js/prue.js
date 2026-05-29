//no tengo ni idea pero mi tecleo no sirve para nada, los anti-robot dicen que yo naci con tuercas
//inicializacion de todo
const main = document.getElementById("mainContent");
const searchBtn = document.getElementById("searchBtn");
const mapBtn = document.getElementById("mapBtn");
const datePicker = document.getElementById("datePicker");
const typeSelect = document.getElementById("tipo-Select");
const diaSelect = document.getElementById("dia-Select");
const citySelect = document.getElementById("city-Select");
const barrioSelect = document.getElementById("barrio-Select");

let allData = [];       
let currentResults = []; 
let num = 0;
const dias_sem = ["Domingo", "Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];


async function conectarDatosTrastos() {
    try {
        const res = await fetch("./api.php?accion=get_lugares");
        const data = await res.json();

        allData = data.map(item => {
            let coords = [];
            try {
                const parsed = JSON.parse(item.coordenadas);
                coords = Array.isArray(parsed) ? parsed : [parsed];
            } catch (e) {
                console.error("Error parseando coordenadas de:", item.calle);
            }

            return {
                title: item.titulo,
                street: item.calle,
                locations: coords, 
                days: item.dias,
                city: item.ciudad, 
                neighborhood: item.barrio 
            };
        });

        updateUI();
    } catch (err) {
        console.error(err);
    }
}

// document.addEventListener("DOMContentLoaded", () => {
//     conectarDatosTrastos();
// });

    conectarDatosTrastos();


//comtrolador
function updateUI() {

  let results = allData;

  const filtros = {
    ciudad: citySelect.value,
    vecindario: barrioSelect.value,
    dias: diaSelect.value,
    mueble: typeSelect.value,
    fecha: datePicker.value
  };


  if(filtros.fecha){
    const dayName = dias_sem[new Date(filtros.fecha).getDay()]; 
    results = results.filter(item => item.days.includes(dayName));
  }

  results = filterByType(results, filtros.ciudad,'city');
  results = filterByType(results, filtros.vecindario,'neighborhood');
  results = filterByType(results, filtros.dias,'days');
  results = filterByType(results, filtros.mueble,'title');


  currentResults = results;

  renderCards(results);
}

//filtros
function filterByType(data, type, field) {
  if (type === "all") return data;
  return data.filter(item => item[field] === type);
}


function renderCards(results) {
  main.innerHTML = "";

  if (results.length === 0) {
    main.innerHTML = "<p class='no-results'>No hay recogida ese día</p>";
    return;
  }

  const contenedor = document.createElement("div");
  contenedor.className = "contenedor-grid";

  results.forEach(item => {
    const card = document.createElement("div");
    card.className = "tarjeta";

    card.innerHTML = `
      <div class="tarjeta-contenido">
        <h2>${item.title}</h2>
        <p class="tarjeta-cuerpo calle"><strong>Dirección:</strong> ${item.street}</p>
        <p class="tarjeta-cuerpo dia"><strong>Día:</strong> ${item.days || "No especificado"}</p>
      </div>
      <div class="tarjeta-footer">
        <a href="https://seuelectronica.ajuntament.barcelona.cat/oficinavirtual/ca/tramit/19980000438" target="_blank" class="btn-tramite">Trámite Recogida</a>
      </div>
    `;

    contenedor.appendChild(card);
  });

  main.appendChild(contenedor);
}


let markersLayer = null;

function renderMap(results) {
  
  main.innerHTML = `<div id="mapContainer"></div>`;

  const map = L.map('mapContainer').setView([41.3851, 2.1734], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  markersLayer = L.layerGroup().addTo(map);


  const bounds = [];

  // Colores para cada día de la semana
  const dayColors = {
    "Domingo": "grey",
    "Lunes": "red",
    "Martes": "orange",
    "Miércoles": "yellow",
    "Jueves": "green",
    "Viernes": "blue",
    "Sábado": "violet"
  };

  results.forEach(item => {
    if (item.locations.length > 0 &&
         item.locations[0].lat && 
         item.locations[0].lng) {
        
        const lat = parseFloat(item.locations[0].lat);
        const lng = parseFloat(item.locations[0].lng);

        bounds.push([lat, lng]);


        const day = item.days || "Domingo";
        const color = dayColors[day] || "grey";
        

        const icon = L.icon({
          iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,

        });

        L.marker([lat, lng], { icon })
            .bindPopup(`<b>${item.title}</b><br>
                ${item.street}<br><p>Horario de Abandono: 20:00 a 22:00</p>
                <a href="https://seuelectronica.ajuntament.barcelona.cat/oficinavirtual/ca/tramit/19980000438">
                    Tramite de Recogida de Muebles - Fuera de Día</a>`)
            .addTo(map);

          }
});



  if (bounds.length) {
    map.fitBounds(bounds);
  }
}

citySelect.addEventListener("change", updateUI);
barrioSelect.addEventListener("change", updateUI);
diaSelect.addEventListener("change", updateUI);
typeSelect.addEventListener("change", updateUI);
datePicker.addEventListener("change", updateUI);

searchBtn.addEventListener("click", () => {
  if (!datePicker.value) return alert("Selecciona una fecha");
  updateUI();
});

mapBtn.addEventListener("click", () => {

  if (!currentResults.length) {
    alert("No hay datos");
    return;
  }
  renderMap(currentResults);
});
