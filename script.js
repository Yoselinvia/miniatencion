const colores = ['red','green','blue','yellow'];
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

// Crear los círculos
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

// Función al tocar círculo
function tocarCirculo(color) {
  if(color === colorObjetivo){
    puntaje++;
    puntajeEl.textContent = `Puntaje: ${puntaje} ${'⭐'.repeat(Math.floor(puntaje/5))}`;
    acierto.currentTime = 0;
    acierto.play().catch(()=>{});
  } else {
    error.currentTime = 0;
    error.play().catch(()=>{});
  }

  if(puntaje > 0 && puntaje % 5 === 0){
    nivel++;
    nivelEl.textContent = `Nivel: ${nivel}`;
  }

  cambiarObjetivo();
}

// Iniciar juego
generarCirculos();
cambiarObjetivo();
