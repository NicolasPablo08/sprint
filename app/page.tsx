"use client";
import { useRouter } from "next/navigation";
import { GreenButton } from "ui/buttons";
import { Title, LargeText } from "ui/typography";
export default function Home() {
  const router = useRouter();
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col text-center justify-center items-center gap-[120px]">
      <div>
        <Title>CheckMed</Title>
        <LargeText>Tu app de medicamentos</LargeText>
      </div>
      <div className="flex flex-col justify-center items-center gap-[25px]">
        <GreenButton onClick={() => router.push("/dashboard")}>Ingresar</GreenButton>
        <GreenButton onClick={() => router.push("/info")}>Como funciona?</GreenButton>
      </div>
    </div>
  );
}
