"use client";
import { useState, useEffect } from "react";
import { LargeText } from "ui/typography";

export function DigitalClock() {
  const [time, setTime] = useState(new Date());
  const [hasMounted, setHasMounted] = useState(false); // Estado para controlar la hidratación

  useEffect(() => {
    // Creamos un intervalo que actualiza el estado cada 1 segundo
    setHasMounted(true); // Una vez que se monta en el cliente, activamos el render
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Limpiamos el intervalo cuando el componente se destruye
    return () => clearInterval(timer);
  }, []);

  // Si aún no se montó (estamos en el servidor), no renderizamos nada o un espacio vacío
  if (!hasMounted) {
    return <div className="h-[60px]" />; // Un espacio del mismo alto para que no salte el contenido
  }

  return (
    <div className="bg-white/50 px-8 py-2 rounded-full border border-green-200 shadow-sm ">
      <LargeText className="font-mono font-bold text-black text-[40px] tabular-nums">
        {time.toLocaleTimeString("es-AR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          hourCycle: "h23",
        })}
      </LargeText>
    </div>
  );
}
