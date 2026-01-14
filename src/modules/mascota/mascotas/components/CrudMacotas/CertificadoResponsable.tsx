import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";
import Loading from "../../../../../hooks/Loading";
import type { Mascota } from "../../../../../type/mascotas.type";
import { formatDate } from "../../../../../utils/formatDate";

interface Props {
  mascota: Mascota;
  isOpen: boolean;
  onOpenChange: (e: boolean) => void;
}

const CertificadoResponsable = ({ mascota, isOpen, onOpenChange }: Props) => {
  const [loading, setLoading] = useState(false);
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ===== GENERAR PDF =====
  const generarCertificado = async () => {
    setLoading(true);
    setError(null);

    try {
      // Intenta cargar desde diferentes rutas
      const pdfPaths = ["/CertificadoTenenciaResponsable.pdf"];

      let pdfBytes: ArrayBuffer | null = null;

      for (const path of pdfPaths) {
        try {
          const res = await fetch(path);
          if (res.ok) {
            pdfBytes = await res.arrayBuffer();
            break;
          }
        } catch {
          continue;
        }
      }

      if (!pdfBytes) {
        throw new Error(
          "No se pudo cargar el PDF. Verifica que el archivo existe en la carpeta public."
        );
      }

      const pdfDoc = await PDFDocument.load(pdfBytes);
      const page = pdfDoc.getPages()[0];
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      // ===== CARGAR IMAGEN DE LA MASCOTA =====
      let imageBytes: ArrayBuffer | null = null;
      if (mascota.creador.foto && mascota.creador.rol === "Gobierno") {
        try {
          // Si mascota.foto es una URL
          if (
            typeof mascota.creador.foto === "string" &&
            mascota.creador.foto.startsWith("http")
          ) {
            const imgRes = await fetch(
              `${import.meta.env.VITE_URL_IMAGE}/${mascota.creador.foto}`
            );
            imageBytes = await imgRes.arrayBuffer();
          } else if (typeof mascota.creador.foto === "string") {
            // Si es una ruta local
            const imgRes = await fetch(
              `${import.meta.env.VITE_URL_IMAGE}/${mascota.creador.foto}`
            );
            imageBytes = await imgRes.arrayBuffer();
          }
        } catch (err) {
          console.warn("No se pudo cargar la imagen:", err);
        }
      }

      // Insertar imagen en la esquina superior derecha
      if (imageBytes) {
        try {
          const image = await pdfDoc
            .embedPng(imageBytes)
            .catch(() => pdfDoc.embedJpg(imageBytes!));

          const imgWidth = 80;
          const imgHeight = 80;
          const imgX = 90; // 30px desde el borde izquierdo
          const imgY = page.getHeight() - imgHeight - 60; // 30px del borde superior

          page.drawImage(image, {
            x: imgX,
            y: imgY,
            width: imgWidth,
            height: imgHeight,
          });
        } catch (imgErr) {
          console.warn("Error al insertar imagen:", imgErr);
        }
      }

      // ===== NOMBRE DE LA MASCOTA (NARANJA, CENTRADO CON PADDING) =====
      const pageWidth = page.getWidth();
      const nombreSize = 40;

      // Calcular ancho real del texto
      const textWidth = boldFont.widthOfTextAtSize(mascota.nombre, nombreSize);

      // Padding lateral del rectángulo
      const paddingLateral = 40;
      const rectWidth = textWidth + paddingLateral * 2;
      const rectHeight = nombreSize + 10;

      // Centrar rectángulo en la página
      const rectX = (pageWidth - rectWidth) / 2;
      const rectY = 230;

      // Dibujar rectángulo de fondo
      page.drawRectangle({
        x: rectX,
        y: rectY,
        width: rectWidth,
        height: rectHeight,
        color: rgb(228 / 255, 116 / 255, 35 / 255),
      });

      // Centrar el texto dentro del rectángulo
      const textX = (pageWidth - textWidth) / 2;
      const textY = 240;

      // Dibujar texto blanco
      page.drawText(mascota.nombre, {
        x: textX,
        y: textY,
        size: nombreSize,
        font: boldFont,
        color: rgb(1, 1, 1),
      });

      // ===== TEXTO CON DATOS DE LA MASCOTA =====
      const datosText = `Con el Código Único de Identidad Animal N.º ${
        mascota.dni
      }, de raza ${mascota?.raza?.title_es || "-"} y de color ${mascota.color}, 
desde la fecha de inscripción ${formatDate(
        mascota.fecha_inscripcion
      )}, en el distrito de ${mascota.distrito.distrito}, provincia de ${
        mascota.provincia.provincia
      } 
y departamento de ${mascota.departamento.departamento}.`;

      let textY_datos = 205;
      const lineHeight = 16;
      const fontSize = 12.5;

      // Dividir el texto en líneas y centrar cada línea
      datosText.split("\n").forEach((line) => {
        const lineWidth = font.widthOfTextAtSize(line, fontSize);
        const lineX = (page.getWidth() - lineWidth) / 2;

        page.drawText(line, {
          x: lineX,
          y: textY_datos,
          size: fontSize,
          font: boldFont,
          color: rgb(57 / 255, 57 / 255, 57 / 255),
        });

        textY_datos -= lineHeight;
      });

      const fechaBase = new Date(mascota.fecha_inscripcion);
      fechaBase.setFullYear(fechaBase.getFullYear() + 1);

      // fuerza string
      const fechaValido = formatDate(fechaBase.toISOString()) ?? "";

      const fontSizeFecha = 10;

      const textXFecha = 183;

      page.drawText(fechaValido, {
        x: textXFecha,
        y: 12,
        size: fontSizeFecha,
        font: boldFont,
        color: rgb(57 / 255, 57 / 255, 57 / 255),
      });

      // ===== GENERAR PDF FINAL =====
      const finalPdf = await pdfDoc.save();

      // Conversión segura para TypeScript
      const pdfArrayBuffer = finalPdf.buffer.slice(
        finalPdf.byteOffset,
        finalPdf.byteOffset + finalPdf.byteLength
      );

      const blob = new Blob([new Uint8Array(pdfArrayBuffer as ArrayBuffer)], {
        type: "application/pdf",
      });

      const url = URL.createObjectURL(blob);
      setPdfPreview(url);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Error desconocido";
      console.error("Error al generar certificado:", errorMsg);
      setError(errorMsg);
    }

    setLoading(false);
  };

  // ===== LIMPIAR URL AL CERRAR =====
  useEffect(() => {
    if (!isOpen && pdfPreview) {
      URL.revokeObjectURL(pdfPreview);
      setPdfPreview(null);
      setError(null);
    }
  }, [isOpen, pdfPreview]);

  useEffect(() => {
    if (isOpen && mascota) {
      generarCertificado();
    }
  }, [isOpen, mascota]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
      {loading && <Loading />}

      <ModalContent className="bg-[#e6ebee]">
        {() => (
          <>
            <ModalHeader className="text-[#1c61b6]">
              CERTIFICADO RESPONSABLE
            </ModalHeader>

            <ModalBody className="flex items-center justify-center">
              {error && (
                <div className="w-full p-4 bg-red-100 border border-red-400 rounded-lg text-red-700 text-sm">
                  <b>Error:</b> {error}
                </div>
              )}

              {pdfPreview ? (
                <iframe
                  src={pdfPreview}
                  title="Vista previa certificado"
                  className="w-full h-[520px] rounded-lg border"
                />
              ) : (
                <div className="text-gray-500 text-sm">
                  Haz clic en <b>Previsualizar</b> para generar el certificado
                </div>
              )}
            </ModalBody>

            <ModalFooter>
              <Button
                color="default"
                size="sm"
                onPress={() => onOpenChange(false)}
              >
                Cancelar
              </Button>

              <Button
                color="danger"
                size="sm"
                isDisabled={!pdfPreview}
                onPress={() => {
                  if (pdfPreview) {
                    saveAs(pdfPreview, `certificado-${mascota.nombre}.pdf`);
                  }
                }}
              >
                Descargar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CertificadoResponsable;
