"use client";
import { useRouter } from "next/navigation";
import { GreenButton } from "ui/buttons";
import { SubTitle, LargeTextBold } from "ui/typography";
import { DigitalClock } from "components/clock";
import { Card } from "components/card";
import { useAtom } from "jotai";
import { medicamentosAtom } from "hooks";

export default function DashboardPage() {
  const router = useRouter();
  const [medicamentos] = useAtom(medicamentosAtom);

  // fecha de hoy para filtrar
  const hoy = new Date().toISOString().split("T")[0];

  // filtramos los que NO han sido tomados hoy y ordenamos por hora
  const pendientes = medicamentos
    .filter((m) => m.lastTakenDate !== hoy)
    .sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="w-[100%] h-[100%] pt-[60px] pb-[110px] flex flex-col items-center gap-[40px]">
      <GreenButton onClick={() => router.push("/registro-med")}>
        Registrar nuevo medicamento
      </GreenButton>
      <SubTitle>Mis medicamentos</SubTitle>
      <div>
        <DigitalClock />
      </div>
      <div className="w-[100%] flex flex-col gap-[20px] items-center">
        {pendientes.length > 0 ? (
          pendientes.map((m) => (
            <Card
              key={m.id}
              id={m.id}
              name={m.nombre}
              time={m.time}
              obs={m.obs}
              lastTakenDate={m.lastTakenDate}
            />
          ))
        ) : (
          <div className="w-[350px] text-center">
            <LargeTextBold>
              No tienes medicamentos próximos a tomar !!! <br /> Puedes registrar uno nuevo con el
              botón de más arriba.
            </LargeTextBold>
          </div>
        )}
      </div>
    </div>
  );
}
