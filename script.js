// Colores disponibles
const colores = ['red','green','blue','yellow'];
let colorObjetivo = 'red';

const mensaje = document.getElementById('mensaje');
const juego = document.getElementById('juego');
const pantallaInicio = document.getElementById('pantalla-inicio');
const juegoContainer = document.getElementById('juego-container');
const btnJugar = document.getElementById('btn-jugar');

// Iniciar juego al presionar el botón
btnJugar.addEventListener('click', () => {
    pantallaInicio.style.display = 'none';
    juegoContainer.style.display = 'flex';
    crearCirculos();
    cambiarObjetivo();
});

// Crear círculos en pantalla
function crearCirculos() {
    juego.innerHTML = '';
    colores.forEach(color => {
        const div = document.createElement('div');
        div.classList.add('circulo');
        div.style.backgroundColor = color;
        div.addEventListener('click', () => tocarCirculo(color));
        juego.appendChild(div);
    });
}

// Nombre de color para el mensaje
function colorNombre(color) {
    if(color==='red') return 'rojo';
    if(color==='green') return 'verde';
    if(color==='blue') return 'azul';
    if(color==='yellow') return 'amarillo';
}

// Cambiar color objetivo
function cambiarObjetivo() {
    const random = colores[Math.floor(Math.random() * colores.length)];
    colorObjetivo = random;
    mensaje.textContent = `Toca el círculo ${colorNombre(colorObjetivo)}`;
}

// Lógica al tocar un círculo
function tocarCirculo(color) {
    if(color === colorObjetivo){
        mensaje.textContent = "¡Bien hecho!";
    } else {
        mensaje.textContent = "Intenta de nuevo...";
    }
    setTimeout(cambiarObjetivo, 1000);
}
