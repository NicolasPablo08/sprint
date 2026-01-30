"use client";
import { useRouter } from "next/navigation";
import { TextField, TextFieldExtend } from "ui/text-field";
import { SubTitle } from "ui/typography";
import { BlueButton, GreenButton } from "ui/buttons";
import { Message } from "ui/message";
import { useState } from "react";
import { medicamentosAtom } from "hooks";
import { useAtom } from "jotai";
export default function RegistPage() {
  const [medicamentos, setMedicamentos] = useAtom(medicamentosAtom);
  const router = useRouter();
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  function handlerSubmit(e: any) {
    e.preventDefault();
    const nombre = e.target.name.value;
    const time = e.target.time.value;
    const obs = e.target.obs.value;
    if (!nombre || !time) {
      setShowMessage(true);
      setMessage("Falta completar el nombre del medicamento o la hora de administracion");
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
      return;
    }
    const nuevoMedicamento = {
      nombre,
      time,
      obs: obs || "",
      id: Date.now().toString(),
      lastTakenDate: null,
    };
    // Guardar en el átomo (esto actualiza automáticamente el localStorage)
    setMedicamentos((prev) => [...prev, nuevoMedicamento]);
    // Mensaje de éxito
    setMessage("¡Medicamento guardado con éxito!");
    setShowMessage(true);

    setTimeout(() => {
      router.push("/dashboard"); // Mandarlo al listado tras guardar
    }, 4000);
  }
  return (
    <div>
      <div className="w-[100vw] h-[100vh] pt-[60px] pb-[110px] flex flex-col items-center gap-[20px]">
        <SubTitle>Registrar medicamento</SubTitle>
        <form onSubmit={handlerSubmit} className="flex flex-col gap-[15px] items-center">
          <TextField name="name" type="text">
            Nombre del Medicamento
          </TextField>
          <TextField name="time" type="time">
            Hora de toma (formato 24hs)
          </TextField>
          <TextFieldExtend
            name="obs"
            placeholder="Aqui puedes poner la dosis a tomar, o cualquier dato relevante."
          >
            Observaciones
          </TextFieldExtend>
          <GreenButton type="submit">Guardar medicamento</GreenButton>
        </form>
        <BlueButton onClick={() => router.push("/dashboard")}>Volver</BlueButton>
      </div>
      <div>{showMessage && <Message>{message}</Message>}</div>
    </div>
  );
}
