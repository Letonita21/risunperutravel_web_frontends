import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_KiFarWDm_7uUPF7o2BoKjXCoa1SuaUfGv");

export async function POST(req) {
  try {
    const {
      nombre,
      pais,
      idioma,
      email,
      numero,
      fecha_llegada,
      numero_pasajeros,
      mensaje,
      tour,
      token,
    } = await req.json();

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token de reCAPTCHA no proporcionado" },
        { status: 400 },
      );
    }

    // Verificar reCAPTCHA
    const verifyRes = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secretKey}&response=${token}`,
      },
    );

    const verifyData = await verifyRes.json();
    if (!verifyData.success) {
      return NextResponse.json(
        { error: "Falló la verificación de reCAPTCHA" },
        { status: 400 },
      );
    }

    // enviar correo a personal
    /*    await resend.emails.send({
      from: `risunperucorreos@risunperutravel.com`,
      cc: "reservasrisunperutravel@gmail.com",
      bcc: "yurnero216@gmail.com",
      to: `${email}`,
      subject: "Solicitud de reserva",
      text: generarMensajePlano({
        nombre,
        pais,
        email,
        numero,
        fecha_llegada,
        numero_pasajeros,
        mensaje,
        tour,
      }),
      html: generarMensajeHTML({
        nombre,
        pais,
        email,
        numero,
        fecha_llegada,
        numero_pasajeros,
        mensaje,
        tour,
      }),
    }); */

    await resend.emails.send({
      from: "Risun Peru Travel <risunperucorreos@risunperutravel.com>", // cambia cuando verifiques dominio
      /* to: `${email}, reservasrisunperutravel@gmail.com`, // 👉 TÚ recibes */
      to: [email, "reservasrisunperutravel@gmail.com"],
      cc: ["reservasrisunperutravel@gmail.com"],
      bcc: ["yurnero216@gmail.com"],
      /* cc: "reservasrisunperutravel@gmail.com",
      bcc: "yurnero216@gmail.com", */
      /* reply_to: email, */ // 👉 respondes al cliente directo
      subject: "Nueva solicitud de reserva",
      text: generarMensajePlano({
        nombre,
        pais,
        email,
        numero,
        fecha_llegada,
        numero_pasajeros,
        mensaje,
        tour,
      }),
      html: generarMensajeHTML({
        nombre,
        pais,
        email,
        numero,
        fecha_llegada,
        numero_pasajeros,
        mensaje,
        tour,
      }),
    });

    // Guardar en la base de datos
    /*  const conn = await getConnection();
    await conn.execute(
      `INSERT INTO reservas 
        (nombre, pais, idioma, email, numero, fecha_llegada, numero_pasajeros, mensaje, fecha_registro, tour, estado) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?)`,
      [
        nombre,
        pais,
        idioma,
        email,
        numero,
        fecha_llegada,
        numero_pasajeros,
        mensaje,
        tour,
        "sin atender",
      ],
    ); */

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error al procesar la reserva:", error);
    return Response.json(
      { error: "No se pudo procesar la reserva" },
      { status: 500 },
    );
  }
}

// ✅ Mensaje en texto plano
function generarMensajePlano({
  nombre,
  pais,
  email,
  numero,
  fecha_llegada,
  numero_pasajeros,
  mensaje,
  tour,
}) {
  return `
Nueva solicitud de reserva

Nombre: ${nombre}
País: ${pais}
Email: ${email}
Número: ${numero}
Tour solicitado: ${tour?.nombre || tour || "No especificado"}
Fecha de llegada: ${fecha_llegada}
Número de pasajeros: ${numero_pasajeros}

Mensaje del cliente:
${mensaje}

Enviado desde risunperutravel.com
`;
}

// ✅ Mensaje en HTML
function generarMensajeHTML({
  nombre,
  pais,
  email,
  numero,
  fecha_llegada,
  numero_pasajeros,
  mensaje,
  tour,
}) {
  return `
    <div style="max-width: 600px; margin: 0 auto; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; border: 1px solid #eee; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
  
  <div style="background-color: #1a2e35; padding: 30px; text-align: center;">
    
    <img src="https://risunperutravel.com/risun_logo2.png" alt="Logo de Risun Peru Travel" style="max-width: 200px; height: auto; margin-bottom: 20px;">
    <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px; text-transform: uppercase;">Nueva Solicitud de Reserva</h1>
  </div>

  <div style="padding: 40px 30px; background-color: #ffffff;">
    <p style="font-size: 16px; line-height: 1.6; color: #555;">
      Hola, equipo de <strong>Risun Peru Travel</strong>. Han recibido un nuevo interés de viaje. Aquí están los detalles:
    </p>

    <div style="background-color: #f9fbfb; border-left: 4px solid #c5a059; padding: 20px; margin: 25px 0;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #888; font-size: 13px; text-transform: uppercase; width: 40%;">Pasajero</td>
          <td style="padding: 8px 0; font-weight: bold; font-size: 15px;">${nombre}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #888; font-size: 13px; text-transform: uppercase;">Origen</td>
          <td style="padding: 8px 0; font-size: 15px;">📍 ${pais}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #888; font-size: 13px; text-transform: uppercase;">Tour Elegido</td>
          <td style="padding: 8px 0; font-weight: bold; color: #1a2e35; font-size: 15px;">${tour}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #888; font-size: 13px; text-transform: uppercase;">Fecha de Inicio</td>
          <td style="padding: 8px 0; font-size: 15px;">📅 ${fecha_llegada}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #888; font-size: 13px; text-transform: uppercase;">Pax</td>
          <td style="padding: 8px 0; font-size: 15px;">👥 ${numero_pasajeros} personas</td>
        </tr>
      </table>
    </div>

    <h3 style="font-size: 18px; color: #1a2e35; border-bottom: 1px solid #eee; padding-bottom: 10px;">Información de contacto</h3>
    <p style="margin: 10px 0; font-size: 15px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #c5a059; text-decoration: none;">${email}</a></p>
    <p style="margin: 10px 0; font-size: 15px;"><strong>WhatsApp:</strong> <a href="https://wa.me/${numero}" style="color: #c5a059; text-decoration: none;">${numero}</a></p>

    <div style="margin-top: 30px; padding: 20px; background-color: #f4f4f4; border-radius: 8px; font-style: italic; color: #666;">
      "${mensaje}"
    </div>
  </div>

  <div style="background-color: #fdfdfd; padding: 20px; text-align: center; border-top: 1px solid #eee;">
    <p style="font-size: 12px; color: #999; margin: 0;">
      Este correo fue generado automáticamente por el portal <br>
      <a href="https://risunperutravel.com" style="color: #1a2e35; text-decoration: none; font-weight: bold;">www.risunperutravel.com</a>
    </p>
  </div>
</div>
  `;
}
