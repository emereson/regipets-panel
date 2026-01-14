import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useState, useRef, useEffect } from "react";

import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";
import type { Mascota } from "../../../../type/mascotas.type";
import Loading from "../../../../hooks/Loading";
import { formatDate } from "../../../../utils/formatDate";

interface Props {
  mascotas: Mascota[];
  isOpen: boolean;
  onOpenChange: (e: boolean) => void;
}

const ModalDniMascotas = ({ mascotas, isOpen, onOpenChange }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dniRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dniRefs2 = useRef<(HTMLDivElement | null)[]>([]);

  // Generar PDF y mostrar preview
  const generarPDF = async () => {
    setLoading(true);
    setError(null);

    // Esperar a que se carguen las imágenes
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [530, 324],
      });

      let pageCount = 0;

      // Iterar sobre cada mascota
      for (let i = 0; i < mascotas.length; i++) {
        // FRONT de cada mascota
        if (dniRefs.current[i]) {
          try {
            const imgFront = await htmlToImage.toJpeg(dniRefs.current[i]!, {
              cacheBust: true,
              quality: 0.95,
              pixelRatio: 2,
              backgroundColor: "#ffffff",
            });

            if (pageCount > 0) {
              pdf.addPage([530, 324], "landscape");
            }
            pdf.addImage(imgFront, "JPEG", 0, 0, 530, 324);
            pageCount++;
          } catch (frontErr) {
            console.warn(`Error en FRONT mascota ${i}:`, frontErr);
          }
        }

        // BACK de cada mascota
        if (dniRefs2.current[i]) {
          try {
            const imgBack = await htmlToImage.toJpeg(dniRefs2.current[i]!, {
              cacheBust: true,
              quality: 0.95,
              pixelRatio: 2,
              backgroundColor: "#ffffff",
            });

            pdf.addPage([530, 324], "landscape");
            pdf.addImage(imgBack, "JPEG", 0, 0, 530, 324);
            pageCount++;
          } catch (backErr) {
            console.warn(`Error en BACK mascota ${i}:`, backErr);
          }
        }
      }

      // Convertir a Blob y crear URL
      const pdfBlob = pdf.output("blob");
      const url = URL.createObjectURL(pdfBlob);
      setPdfPreview(url);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Error desconocido";
      console.error("Error al generar PDF:", errorMsg);
      setError(errorMsg);
    }
    setLoading(false);
  };

  // Descargar PDF
  const descargarPDF = async () => {
    if (pdfPreview) {
      saveAs(pdfPreview, `dni-mascotas-${mascotas.length}.pdf`);
    }
  };

  // Limpiar URL al cerrar
  useEffect(() => {
    if (!isOpen && pdfPreview) {
      URL.revokeObjectURL(pdfPreview);
      setPdfPreview(null);
      setError(null);
    }
  }, [isOpen, pdfPreview]);

  // Generar automáticamente al abrir
  useEffect(() => {
    if (isOpen && mascotas && mascotas.length > 0) {
      generarPDF();
    }
  }, [isOpen, mascotas]);

  const padMascota = (texto: string, total = 52) => {
    const cleanText = texto.trim();
    const faltantes = total - cleanText.length;

    if (faltantes <= 0) return cleanText.slice(0, total);

    const left = Math.floor(faltantes / 2);
    const right = faltantes - left;

    return `${"<".repeat(left)}${cleanText}${">".repeat(right)}`;
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
      {loading && <Loading />}
      <ModalContent className="bg-[#e6ebee]">
        {() => (
          <>
            <ModalHeader className="text-[#1c61b6]">
              DNI DE LAS MASCOTAS ({mascotas.length})
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
                  title="Vista previa DNI"
                  className="w-full h-[520px] rounded-lg border"
                />
              ) : (
                <div className="text-gray-500 text-sm">
                  Haz clic en <b>Previsualizar</b> para generar los DNIs
                </div>
              )}

              {/* Contenedores ocultos para generar imágenes */}
              <div
                style={{
                  position: "fixed",
                  top: "-9999px",
                  left: "-9999px",
                  width: "auto",
                  height: "auto",
                }}
              >
                {mascotas.map((mascota, index) => (
                  <div key={`mascota-${index}`}>
                    {/* FRONT */}
                    <div
                      ref={(el) => {
                        dniRefs.current[index] = el;
                      }}
                      className="w-fit min-h-[331px] max-h-[331px] bg-white"
                    >
                      <div className="w-[517px] h-[331px] relative bg-white m-auto flex flex-col items-center justify-start rounded-md overflow-hidden">
                        <img
                          className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
                          src="/backBlanco-2-01.png"
                          alt=""
                          style={{
                            filter:
                              "invert(0.08) sepia(0.22) saturate(5) hue-rotate(175deg) brightness(0.9) contrast(0.85)",
                          }}
                        />
                        <div className="min-w-[350px] min-h-[18px] bg-[#1c61b6] mt-[2px] rounded-xs z-10"></div>
                        <div className="w-full h-full flex px-4 pb-3 z-10">
                          <section className="min-w-[140px] max-w-[140px] flex flex-col justify-start">
                            <div className="w-fit flex flex-col items-center -ml-4">
                              <img
                                className="min-w-[45px] max-w-[45px] mb-[-38px]"
                                src="/logo2.png"
                                alt=""
                              />
                              <img
                                className="min-w-[75px] max-w-[75px] mb-[-5px]"
                                src="/logo1.png"
                                alt=""
                              />
                            </div>
                            <img
                              className="w-[160px] min-h-[180px] rounded-md object-cover"
                              src={
                                `${import.meta.env.VITE_URL_IMAGE}/${
                                  mascota.imagen
                                }` || "/logo.webp"
                              }
                              alt="foto del usuario"
                            />
                            <p className="text-md font-bold text-neutral-700 mt-1.5 mx-auto">
                              {mascota.dni}
                            </p>
                          </section>
                          <section className="w-full flex flex-col items-center pt-2 pl-5 text-neutral-600">
                            <h2 className="text-2xl uppercase text-[#1c61b6] font-semibold">
                              {mascota.nombre} {mascota.apellido}
                            </h2>
                            <h3 className="w-fit text-center px-8 bg-orange-500 text-white">
                              {mascota.usuario.nombre}{" "}
                              {mascota.usuario.apellido}
                            </h3>
                            <div className="w-full relative mt-3 border-2 border-[#1c61b6] rounded-md overflow-hidden">
                              <ul className="flex text-center px-2 py-1">
                                <li className="w-1/3 text-xs">Calificación</li>
                                <li className="w-1/3 text-xs">Esterilizado</li>
                                <li className="w-1/3 text-xs">Sexo</li>
                              </ul>
                              <Divider className="bg-[#1c61b6] h-[2px]" />
                              <ul className="flex text-center px-2 py-1">
                                <li className="w-1/3 text-xs text-black">
                                  {mascota.calificacion}
                                </li>
                                <li className="w-1/3 text-xs text-black">
                                  {mascota.castrado ? "Sí" : "No"}
                                </li>
                                <li className="w-1/3 text-xs text-black">
                                  {mascota.sexo}
                                </li>
                              </ul>
                              <Divider className="bg-[#1c61b6] h-[2px]" />
                              <ul className="w-full p-4 text-xs">
                                <li className="w-full flex justify-between py-[2px]">
                                  <p className="w-1/2">Fecha de Nacimiento</p>
                                  <p className="w-2/5 text-center border-b-2 border-[#1c61b6] text-black">
                                    {formatDate(mascota.fecha_nacimiento)}
                                  </p>
                                </li>
                                <li className="w-full flex justify-between py-[2px]">
                                  <p className="w-1/2">Fecha de Emisión</p>
                                  <p className="w-2/5 text-center border-b-2 border-[#1c61b6] text-black">
                                    {mascota.fecha_inscripcion}
                                  </p>
                                </li>
                                <li className="w-full flex justify-between py-[2px]">
                                  <p className="w-1/2">Fecha de Inscripción</p>
                                  <p className="w-2/5 text-center border-b-2 border-[#1c61b6] text-black">
                                    {mascota.fecha_inscripcion}
                                  </p>
                                </li>
                              </ul>
                              <div className="flex gap-2">
                                {Array.from({ length: 9 }).map((_, i) => (
                                  <div
                                    key={i}
                                    className="w-3 h-[2px] bg-[#1c61b6] rounded"
                                  ></div>
                                ))}
                              </div>
                              <ul className="flex flex-col text-xs py-2 px-3">
                                <li className="w-full flex py-[2px]">
                                  <p className="w-[60px]">Pelaje</p>
                                  <p className="text-black">{mascota.color}</p>
                                </li>
                                <li className="w-full flex py-[2px]">
                                  <p className="w-[60px]">Raza</p>
                                  <p className="text-black">
                                    {mascota.raza.title_es}
                                  </p>
                                </li>
                              </ul>
                              <img
                                className="absolute w-[80px] -bottom-6 -right-5 -rotate-30"
                                src="/logo2.png"
                                alt=""
                              />
                            </div>
                          </section>
                        </div>
                      </div>
                    </div>

                    {/* BACK */}
                    <div
                      ref={(el) => {
                        dniRefs2.current[index] = el;
                      }}
                      className="w-fit min-h-[331px] max-h-[331px] bg-white"
                    >
                      <div className="w-[517px] h-[331px] relative bg-white m-auto flex flex-col items-center justify-start rounded-md overflow-hidden">
                        <img
                          className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
                          src="/backBlanco-2-01.png"
                          alt=""
                          style={{
                            filter:
                              "invert(0.08) sepia(0.22) saturate(5) hue-rotate(175deg) brightness(0.9) contrast(0.85)",
                          }}
                        />
                        <div className="absolute top-4 min-w-[350px] text-center min-h-[30px] bg-[#1c61b6] rounded-xs z-10 rounded-t-md">
                          <p className="text-white">
                            {mascota.cod_microchip || "-"}
                          </p>
                        </div>
                        <section className="w-full pt-8 h-full flex flex-col items-center p-5 text-neutral-600 font-[SegoeUiBlack]">
                          <div className="w-full h-full relative mt-3 border-2 border-[#1c61b6] rounded-md overflow-hidden">
                            <ul className="flex text-center px-2 py-2">
                              <li className="w-1/3 text-xs text-black uppercase">
                                Departamento
                              </li>
                              <li className="w-1/3 text-xs text-black uppercase">
                                Provincia
                              </li>
                              <li className="w-1/3 text-xs text-black uppercase">
                                Distrito
                              </li>
                            </ul>
                            <Divider className="bg-[#1c61b6] h-[2px]" />
                            <ul className="flex text-center px-2 py-2">
                              <li className="w-1/3 text-xs text-[#616160]">
                                {mascota?.departamento?.departamento || "-"}
                              </li>
                              <li className="w-1/3 text-xs text-[#616160]">
                                {mascota?.provincia?.provincia || "-"}
                              </li>
                              <li className="w-1/3 text-xs text-[#616160]">
                                {mascota?.distrito?.distrito || "-"}
                              </li>
                            </ul>
                            <Divider className="bg-[#1c61b6] h-[2px]" />
                            <ul className="flex flex-col gap-1 text-xs py-2 px-3">
                              <li className="w-full flex items-center gap-2">
                                <p className="font-semibold text-black">
                                  DIRECCIÓN
                                </p>
                                <p className="text-[11px] text-[#616160]">
                                  {mascota.direccion || "-"}
                                </p>
                              </li>
                            </ul>
                            <Divider className="bg-[#1c61b6] h-[2px]" />
                            <ul className="flex flex-col gap-1 text-xs py-4 px-3">
                              <li className="w-full py-[2px] flex items-center gap-2">
                                <p className="w-[150px] text-black">
                                  RESPONSABLE
                                </p>
                                <p className="w-full text-center text-[#616160]">
                                  {mascota.usuario.nombre}{" "}
                                  {mascota.usuario.apellido}
                                  <div className="w-full flex gap-2 py-1">
                                    {Array.from({ length: 20 }).map((_, i) => (
                                      <div
                                        key={i}
                                        className="w-full h-[1.5px] bg-[#616160] rounded"
                                      ></div>
                                    ))}
                                  </div>
                                </p>
                              </li>
                              <li className="w-full py-[2px] flex items-center gap-2">
                                <p className="w-[150px] text-black">
                                  RESPONSABLE 2
                                </p>
                                <p className="w-full text-center text-[#616160]">
                                  {mascota.responsable_2 || "-"}
                                  <div className="w-full flex gap-2 py-1">
                                    {Array.from({ length: 20 }).map((_, i) => (
                                      <div
                                        key={i}
                                        className="w-full h-[1.5px] bg-[#616160] rounded"
                                      ></div>
                                    ))}
                                  </div>
                                </p>
                              </li>
                            </ul>
                            <Divider className="bg-[#1c61b6] h-[2px]" />
                            <p className="font-[segoeui]  text-xs py-2 text-center">
                              {`<<<<<<<<<<<<<<<<<<<< ${mascota.dni} >>>>>>>>>>>>>>>>>>>>`}
                              <br />
                              {padMascota(
                                `${mascota.nombre} ${mascota.apellido}`
                              )}
                              <br />
                              {`<<<<<<<<<<RUM<REGISTRO<UNICO<DE<MASCOTAS>>>>>>>>>`}
                            </p>
                            <img
                              className="absolute w-[80px] -bottom-6 -right-5 -rotate-30"
                              src="/logo2.png"
                              alt=""
                            />
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
                onPress={generarPDF}
                isLoading={loading}
              >
                Previsualizar
              </Button>
              <Button
                color="danger"
                size="sm"
                isDisabled={!pdfPreview}
                onPress={descargarPDF}
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

export default ModalDniMascotas;
