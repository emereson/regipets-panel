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
import type { Mascota } from "../../../../type/mascotas.type";
import { formatDate } from "../../../../utils/formatDate";
import Loading from "../../../../hooks/Loading";

interface Props {
  mascotas: Mascota[];
  isOpen: boolean;
  onOpenChange: (e: boolean) => void;
}

const CertificadosResponsaable = ({
  mascotas,
  isOpen,
  onOpenChange,
}: Props) => {
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

      // Crear un PDF nuevo que contendrá todas las mascotas
      const finalPdfDoc = await PDFDocument.create();

      // Iterar sobre cada mascota
      for (let i = 0; i < mascotas.length; i++) {
        const mascota = mascotas[i];

        // Cargar el PDF template para cada mascota
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const page = pdfDoc.getPages()[0];

        // Crear fuentes para cada PDF individual
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

        // ===== CARGAR IMAGEN DE LA MASCOTA =====
        let imageBytes: ArrayBuffer | null = null;
        if (mascota.usuario.foto) {
          try {
            // Si mascota.foto es una URL
            if (
              typeof mascota.usuario.foto === "string" &&
              mascota.usuario.foto.startsWith("http")
            ) {
              const imgRes = await fetch(
                `${import.meta.env.VITE_URL_IMAGE}/${mascota.usuario.foto}`
              );
              imageBytes = await imgRes.arrayBuffer();
            } else if (typeof mascota.usuario.foto === "string") {
              // Si es una ruta local
              const imgRes = await fetch(
                `${import.meta.env.VITE_URL_IMAGE}/${mascota.usuario.foto}`
              );
              imageBytes = await imgRes.arrayBuffer();
            }
          } catch (err) {
            console.warn(
              `No se pudo cargar la imagen de ${mascota.nombre}:`,
              err
            );
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
            const imgX = 90;
            const imgY = page.getHeight() - imgHeight - 40;

            page.drawImage(image, {
              x: imgX,
              y: imgY,
              width: imgWidth,
              height: imgHeight,
            });
          } catch (imgErr) {
            console.warn(
              `Error al insertar imagen de ${mascota.nombre}:`,
              imgErr
            );
          }
        }

        // ===== NOMBRE DE LA MASCOTA (NARANJA, CENTRADO) =====
        const pageWidth = page.getWidth();
        const nombreSize = 38;
        const nombreMascota = `${mascota.nombre} ${mascota.apellido}`;
        const nombreWidth = boldFont.widthOfTextAtSize(
          nombreMascota,
          nombreSize
        );
        const nombreX = (pageWidth - nombreWidth) / 2;

        page.drawText(nombreMascota, {
          x: nombreX,
          y: 240,
          size: nombreSize,
          font: boldFont,
          color: rgb(228 / 255, 116 / 255, 35 / 255),
        });

        // ===== TEXTO CON DATOS DE LA MASCOTA =====
        const datosText = `Con el Código Único de Identidad Animal N.º ${
          mascota.dni
        }, de raza ${mascota?.raza?.title_es || "-"} y de color ${
          mascota.color
        }, 
desde la fecha de inscripción ${formatDate(
          mascota.fecha_inscripcion
        )}, en el distrito de ${mascota.distrito.distrito}, provincia de ${
          mascota.provincia.provincia
        } 
y departamento de ${mascota.departamento.departamento}.`;

        let textY = 205;
        const lineHeight = 16;
        const fontSize = 12.5;

        // Dividir el texto en líneas y centrar cada línea
        datosText.split("\n").forEach((line) => {
          const textWidth = font.widthOfTextAtSize(line, fontSize);
          const textX = (page.getWidth() - textWidth) / 2;

          page.drawText(line, {
            x: textX,
            y: textY,
            size: fontSize,
            font: boldFont,
            color: rgb(57 / 255, 57 / 255, 57 / 255),
          });

          textY -= lineHeight;
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

        // Copiar la página completada al PDF final
        const copiedPages = await finalPdfDoc.copyPages(pdfDoc, [0]);
        finalPdfDoc.addPage(copiedPages[0]);
      }

      // ===== GENERAR PDF FINAL =====
      const finalPdf = await finalPdfDoc.save();

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
    if (isOpen && mascotas && mascotas.length > 0) {
      generarCertificado();
    }
  }, [isOpen, mascotas]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
      {loading && <Loading />}

      <ModalContent className="bg-[#e6ebee]">
        {() => (
          <>
            <ModalHeader className="text-[#1c61b6]">
              CERTIFICADOS RESPONSABLE ({mascotas.length})
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
                  title="Vista previa certificados"
                  className="w-full h-[520px] rounded-lg border"
                />
              ) : (
                <div className="text-gray-500 text-sm">
                  Haz clic en <b>Previsualizar</b> para generar los certificados
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
                color="secondary"
                size="sm"
                onPress={generarCertificado}
                isLoading={loading}
              >
                Previsualizar
              </Button>

              <Button
                color="danger"
                size="sm"
                isDisabled={!pdfPreview}
                onPress={() => {
                  if (pdfPreview) {
                    saveAs(pdfPreview, `certificados-${mascotas.length}.pdf`);
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

export default CertificadosResponsaable;
