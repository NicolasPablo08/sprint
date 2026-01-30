import { LargeText, LargeTextBold } from "ui/typography";
import { GreenButton } from "ui/buttons";
import { Message } from "ui/message";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { medicamentosAtom } from "hooks";

type CardProps = {
  name: string;
  time: string;
  id: string;
  obs: string;
  lastTakenDate?: string | null;
};
export function Card({ name, time, id, obs, lastTakenDate }: CardProps) {
  const [medicamentos, setMedicamentos] = useAtom(medicamentosAtom);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  // --- LÓGICA DE ALARMA (MVP SIMPLE) ---
  useEffect(() => {
    // Función que comprueba la hora
    const checkTime = () => {
      const ahora = new Date().toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      const hoy = new Date().toISOString().split("T")[0];

      // Si es la hora y NO se tomó hoy
      if (time <= ahora && lastTakenDate !== hoy) {
        setMessage(`¡Atención! Es hora de tu medicamento: ${name}`);
        setShowMessage(true);

        // El mensaje desaparece solo a los 4 segundos para liberar el botón
        setTimeout(() => {
          setShowMessage(false);
          // Opcional: limpiar el texto después de que desaparece la animación
          setTimeout(() => setMessage(""), 500);
        }, 4000);
      }
    };

    // Ejecutamos una vez al montar por si justo es la hora
    checkTime();

    // Seteamos el intervalo largo de 5 minutos (300.000 ms)
    const interval = setInterval(checkTime, 300000);

    return () => clearInterval(interval);
  }, [time, lastTakenDate, name]);

  async function confirmAdmin() {
    // fecha de hoy (YYYY-MM-DD)
    const hoy = new Date().toISOString().split("T")[0];

    //mostrar mensaje
    setMessage("¡Muy bien! Ya registramos tu toma, Te avisaremos cuando sea la próxima.");
    setShowMessage(true);

    //tiempo para que el usuario lea
    setTimeout(() => {
      // actualizamos el átomo.
      const nuevosMedis = medicamentos.map((m) => {
        if (m.id === id) {
          return { ...m, lastTakenDate: hoy };
        }
        return m;
      });

      //ocultamos el mensaje
      setMedicamentos(nuevosMedis);
      setShowMessage(false);
      setMessage("");
    }, 3000); // 3 segundos es un buen tiempo de lectura para un adulto mayor
  }
  return (
    <div>
      <div className="w-[350px] px-[7px] py-[7px] border-[2px] border-black rounded-[8px] flex flex-col gap-[10px] overflow-hidden">
        <div className="w-[100%] py-[7px] px-[7px] bg-[var(--celeste-A100)] rounded-t-[8px] flex flex-col gap-[5x] overflow-hidden ">
          <LargeTextBold className="text-center">{name}</LargeTextBold>
          <LargeText>
            <strong>Obs:</strong> {obs}
          </LargeText>
        </div>
        <div className="w-[100%] py-[7px] px-[7px] bg-[var(--fucsia-A200)] rounded-b-[8px] flex flex-row gap-[10px] overflow-hidden ">
          <div className="text-center">
            <LargeText>
              <strong>Tomar a las: {time}hs </strong>
            </LargeText>
          </div>
          <GreenButton onClick={confirmAdmin}>Confirmar Toma</GreenButton>
        </div>
      </div>
      {showMessage && <Message>{message}</Message>}
    </div>
  );
}
