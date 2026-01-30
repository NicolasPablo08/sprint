"use client";
import { useRouter } from "next/navigation";
import { BlueButton } from "ui/buttons";
import { SubTitle, LargeText } from "ui/typography";
export default function InfoPage() {
  const router = useRouter();
  return (
    <div className="w-[100%] h-[100vh] pt-[60px] pb-[110px]">
      <div className="h-[100%] flex flex-col items-center justify-between">
        <SubTitle className="text-center">Como funciona?</SubTitle>
        <div className="flex flex-col gap-[40px]">
          <LargeText className="max-w-[85%] text-left ml-[5%]">
            Utilizar CheckMed es muy simple, solo sigue estos pasos:
          </LargeText>
          <ul className="list-decimal list-inside text-left ml-[7%] max-w-[90%] flex flex-col gap-[10px]">
            <li>
              <LargeText className="inline">
                Presiona el boton <strong>"Registrar nuevo medicamento"</strong> en la seccion{" "}
                <strong>"Mis medicamentos"</strong>.
              </LargeText>
            </li>
            <li>
              <LargeText className="inline">
                Completa los datos del medicamento, su hora de ingesta y presiona{" "}
                <strong>"Guardar"</strong>.
              </LargeText>
            </li>
            <li>
              <LargeText className="inline">
                En la seccion <strong>"Mis medicamentos"</strong> veras los medicamentos proximos a
                tomar. Si ya tomaste alguno, puedes presionar <strong>"Confirmar Toma"</strong> para
                que no te notifique de la ingesta nuevamente.
              </LargeText>
            </li>
            <li>
              <LargeText className="inline">
                Recibiras una notificacion cuando sea la hora de tu medicina (en un periodo de 5
                min). Una vez que la hayas tomado, presiona el boton{" "}
                <strong>"Confirmar Toma"</strong>, si no la tomaste se te recordara cada 5 minutos.
              </LargeText>
            </li>
          </ul>
        </div>
        <BlueButton onClick={() => router.push("/")}>Volver</BlueButton>
      </div>
    </div>
  );
}
