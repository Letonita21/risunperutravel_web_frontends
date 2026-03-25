import { getConnection } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { tour, idioma } = await req.json();
    const conn = await getConnection();
    const nombre = "Consulta por whatsapp";

    const postData = await fetch(
      `${process.env.NEXT_PUBLIC_ADMIN_URL}/dataTour/correos.php`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          tour,
          idioma,
        }),
      },
    );

    if (postData.ok) {
      console.log("Correo enviado exitosamente");
      return NextResponse.json({ success: true });
    } else {
      console.log("Error al enviar el correo");
      return NextResponse.json(
        { error: "No se pudo procesar la reserva" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error al procesar la reserva:", error);
    return NextResponse.json(
      { error: "No se pudo procesar la reserva" },
      { status: 500 },
    );
  }
}
