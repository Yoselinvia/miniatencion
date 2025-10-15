import React, { useState, useEffect, useRef } from 'react';
import aciertoSound from './acierto.mp3';
import errorSound from './error.mp3';
import './MiniAtencion.css';

const colores = ['red','green','blue','yellow'];

export default function MiniAtencion() {
  const [colorObjetivo, setColorObjetivo] = useState('red');
  const [puntaje, setPuntaje] = useState(0);
  const [nivel, setNivel] = useState(1);
  const [tiempoCambio, setTiempoCambio] = useState(1000);

  const aciertoRef = useRef(null);
  const errorRef = useRef(null);

  // Cambiar color objetivo cada vez que se toca el correcto
  const cambiarObjetivo = () => {
    const random = colores[Math.floor(Math.random() * colores.length)];
    setColorObjetivo(random);
  };

  const tocarCirculo = (color) => {
    if(color === colorObjetivo){
      setPuntaje(p => p + 1);
      reproducirAudio(aciertoRef);
    } else {
      reproducirAudio(errorRef);
    }

    // Subir nivel cada 5 puntos
    if((puntaje+1) % 5 === 0){
      subirNivel();
    }

    cambiarObjetivo();
  };

  const reproducirAudio = (audioRef) => {
    const audio = audioRef.current;
    if(audio){
      audio.currentTime = 0;
      audio.play().catch(()=>{});
    }
  };

  const subirNivel = () => {
    setNivel(n => n + 1);
    setTiempoCambio(t => (t > 400 ? t - 100 : t));
  };

  const colorNombre = (c) => {
    if(c==='red') return 'rojo';
    if(c==='green') return 'verde';
    if(c==='blue') return 'azul';
    if(c==='yellow') return 'amarillo';
  };

  return (
    <div className="mini-atencion">
      <h2>Toca el círculo {colorNombre(colorObjetivo)}</h2>
      <div className="puntaje">Puntaje: {puntaje} {'⭐'.repeat(Math.floor(puntaje/5))}</div>
      <div className="nivel">Nivel: {nivel}</div>

      <div className="juego">
        {colores.map(color => (
          <div 
            key={color} 
            className="circulo" 
            style={{backgroundColor: color}}
            onClick={() => tocarCirculo(color)}
          ></div>
        ))}
      </div>

      <audio ref={aciertoRef} src={aciertoSound}></audio>
      <audio ref={errorRef} src={errorSound}></audio>
    </div>
  );
}
