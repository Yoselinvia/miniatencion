const coloresIniciales = ['red','green','blue','yellow'];
let colores = [...coloresIniciales];
let colorObjetivo = 'red';
let puntaje = 0;
let nivel = 1;
let tiempoCambio = 2000;
let tiempoRestante = tiempoCambio;
let juegoActivo = true;

const objetivo = document.getElementById('objetivo');
const puntajeEl = document.getElementById('puntaje');
const nivelEl = document.getElementById('nivel');
const juego = document.getElementById('juego');
const barra = document.getElementById('barra-progreso');

const aciertoSound = document.getElementById('acierto');
const errorSound = document.getElementById('error');
const victoriaSound = document.getElementById('victoria');

// Generar círculos visibles
function generarCirculos() {
  juego.innerHTML = '';
  colores.forEach(color => {
    const div = document.createElement('div');
    div.className = 'circulo';
    div.style.backgroundColor = color;
    div.addEventListener('click', () => tocarCirculo(color));
    juego.appendChild(div);
  });
}

// Cambiar objetivo
function cambiarObjetivo() {
  const random = colores[Math.floor(Math.random() * colores.length)];
  colorObjetivo = random;
  objetivo.textContent = `Toca el círculo ${colorObjetivo}`;
  tiempoRestante = tiempoCambio;
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
  tiempoCambio = tiempoCambio > 500 ? tiempoCambio - 200 : tiempoCambio;
  generarCirculos();
}

// Manejar clic en círculo
function tocarCirculo(color) {
  if(!juegoActivo) return;
  if(color === colorObjetivo){
    puntaje++;
    puntajeEl.textContent = `Puntaje: ${puntaje} ${'⭐'.repeat(Math.floor(puntaje/5))}`;
    reproducirAudio(aciertoSound);
  } else {
    reproducirAudio(errorSound);
  }

  if(puntaje % 5 === 0 && puntaje > 0){
    subirNivel();
  }

  cambiarObjetivo();
}

// Barra de tiempo
function actualizarBarra() {
  if(!juegoActivo) return;
  tiempoRestante -= 100;
  barra.style.width = `${(tiempoRestante/tiempoCambio)*100}%`;
  if(tiempoRestante <= 0){
    juegoActivo = false;
    reproducirAudio(victoriaSound);
    setTimeout(()=> {
      alert(`¡Juego terminado!\nPuntaje final: ${puntaje}`);
    }, 100);
  }
}

// Iniciar juego
function iniciarJuego() {
  generarCirculos();
  cambiarObjetivo();
  setInterval(actualizarBarra, 100);
}

iniciarJuego();
