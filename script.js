const coloresIniciales = ['red','green','blue','yellow'];
let colores = [...coloresIniciales];
let colorObjetivo = 'red';
let puntaje = 0;
let nivel = 1;

const objetivoEl = document.getElementById('objetivo');
const puntajeEl = document.getElementById('puntaje');
const nivelEl = document.getElementById('nivel');
const juegoEl = document.getElementById('juego');

const acierto = document.getElementById('acierto');
const error = document.getElementById('error');
const victoria = document.getElementById('victoria');

// Generar círculos
function generarCirculos() {
  juegoEl.innerHTML = '';
  colores.forEach(color => {
    const div = document.createElement('div');
    div.className = 'circulo';
    div.style.backgroundColor = color;
    div.addEventListener('click', () => tocarCirculo(color));
    juegoEl.appendChild(div);
  });
}

// Cambiar objetivo
function cambiarObjetivo() {
  const random = colores[Math.floor(Math.random() * colores.length)];
  colorObjetivo = random;
  objetivoEl.textContent = `Toca el círculo ${colorObjetivo}`;
}

// Reproducir sonido
function reproducirAudio(audio) {
  audio.currentTime = 0;
  audio.play().catch(()=>{});
}

// Subir nivel
function subirNivel() {
  nivel++;
  nivelEl.textContent = `Nivel: ${nivel}`;
  if(colores.length < 8){
    const nuevosColores = ['orange','purple','pink','cyan'].slice(0, nivel-1);
    colores = [...coloresIniciales, ...nuevosColores];
  }
  generarCirculos();
}

// Manejar clic
function tocarCirculo(color) {
  if(color === colorObjetivo){
    puntaje++;
    puntajeEl.textContent = `Puntaje: ${puntaje} ${'⭐'.repeat(Math.floor(puntaje/5))}`;
    reproducirAudio(acierto);
  } else {
    reproducirAudio(error);
  }

  if(puntaje % 5 === 0 && puntaje > 0){
    subirNivel();
  }
  cambiarObjetivo();
}

// Iniciar juego
generarCirculos();
cambiarObjetivo();
