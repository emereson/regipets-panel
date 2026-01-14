import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useState, useEffect } from "react";
import type { Mascota } from "../../../../../type/mascotas.type";
import { formatDate } from "../../../../../utils/formatDate";

interface Props {
  mascota: Mascota;
  isOpen: boolean;
  onOpenChange: (e: boolean) => void;
}

const ModalDniMascota = ({ mascota, isOpen, onOpenChange }: Props) => {
  // const [loading, setLoading] = useState<boolean>(false);
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // const dniRef = useRef<HTMLDivElement>(null);
  // const dniRef2 = useRef<HTMLDivElement>(null);

  // // Generar PDF y mostrar preview
  // // const generarPDF = async () => {
  // //   setLoading(true);
  // //   setError(null);

  // //   // Esperar a que se carguen las imágenes
  // //   await new Promise((resolve) => setTimeout(resolve, 500));

  // //   try {
  // //     const pdf = new jsPDF({
  // //       orientation: "landscape",
  // //       unit: "px",
  // //       format: [530, 324],
  // //     });

  // //     // FRONT
  // //     if (dniRef.current) {
  // //       try {
  // //         const imgFront = await htmlToImage.toJpeg(dniRef.current, {
  // //           cacheBust: true,
  // //           quality: 0.95,
  // //           pixelRatio: 2,
  // //           backgroundColor: "#ffffff",
  // //         });
  // //         pdf.addImage(imgFront, "JPEG", 0, 0, 530, 324);
  // //       } catch (frontErr) {
  // //         console.warn("Error en FRONT:", frontErr);
  // //       }
  // //     }

  // //     // BACK
  // //     if (dniRef2.current) {
  // //       try {
  // //         const imgBack = await htmlToImage.toJpeg(dniRef2.current, {
  // //           cacheBust: true,
  // //           quality: 0.95,
  // //           pixelRatio: 2,
  // //           backgroundColor: "#ffffff",
  // //         });
  // //         pdf.addPage([530, 324], "landscape");
  // //         pdf.addImage(imgBack, "JPEG", 0, 0, 530, 324);
  // //       } catch (backErr) {
  // //         console.warn("Error en BACK:", backErr);
  // //       }
  // //     }

  // //     // Convertir a Blob y crear URL
  // //     const pdfBlob = pdf.output("blob");
  // //     const url = URL.createObjectURL(pdfBlob);
  // //     setPdfPreview(url);
  // //   } catch (err) {
  // //     const errorMsg = err instanceof Error ? err.message : "Error desconocido";
  // //     console.error("Error al generar PDF:", errorMsg);
  // //     setError(errorMsg);
  // //   }
  // //   setLoading(false);
  // // };

  // // Descargar PDF
  // const descargarPDF = async () => {
  //   if (pdfPreview) {
  //     saveAs(pdfPreview, `dni-mascota-${mascota.nombre}.pdf`);
  //   }
  // };

  // Limpiar URL al cerrar
  useEffect(() => {
    if (!isOpen && pdfPreview) {
      URL.revokeObjectURL(pdfPreview);
      setPdfPreview(null);
      setError(null);
    }
  }, [isOpen, pdfPreview]);

  // Generar automáticamente al abrir
  // useEffect(() => {
  //   if (isOpen && mascota) {
  //     generarPDF();
  //   }
  // }, [isOpen, mascota]);
  const padMascota = (texto: string, total = 50) => {
    // 1. Limpiar símbolos de padding
    let cleanText = texto.replace(/[<>]/g, "").trim();

    // 2. Cortar si se pasa
    if (cleanText.length > total) {
      cleanText = cleanText.slice(0, total);
    }

    // 3. Calcular faltantes
    const faltantes = total - cleanText.length;

    // 4. Calcular padding
    const left = Math.floor(faltantes / 2);
    const right = faltantes - left;

    // 5. Construir resultado
    const result = `${"<".repeat(left)}${cleanText}${"<".repeat(right)}`;

    // 6. Garantía final (defensivo)
    return result.length === total ? result : result.slice(0, total);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
      {/* {loading && <Loading />} */}
      <ModalContent className="bg-[#e6ebee]">
        {() => (
          <>
            <ModalHeader className="text-[#1c61b6]">
              DNI DE LA MASCOTA
            </ModalHeader>
            <ModalBody className="flex items-center justify-center">
              {error && (
                <div className="w-full p-4 bg-red-100 border border-red-400 rounded-lg text-red-700 text-sm">
                  <b>Error:</b> {error}
                </div>
              )}

              <div>
                <div className="w-fit min-h-[331px] max-h-[331px] ">
                  <div
                    className={`w-[517px] h-[331px] relative ${
                      mascota.tipo_mascota === "PREMIUM"
                        ? "bg-[#1c61b6]"
                        : "bg-[#ffff]"
                    } m-auto flex flex-col items-center justify-start rounded-md overflow-hidden`}
                  >
                    <img
                      className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
                      src="/backBlanco-2-01.png"
                      alt=""
                      style={{
                        filter:
                          "invert(0.08) sepia(0.22) saturate(5) hue-rotate(175deg) brightness(0.9) contrast(0.85)",
                      }}
                    />
                    <div
                      className={`min-w-[350px] min-h-[18px] ${
                        mascota.tipo_mascota === "PREMIUM"
                          ? "bg-[#ffffff]"
                          : "bg-[#1c61b6]"
                      } mt-[2px] rounded-xs z-10`}
                    ></div>
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
                        <h2 className="text-2xl uppercase text-[#1c61b6] font-[segoeuiBold]">
                          {mascota.nombre}
                        </h2>
                        <h3 className="w-fit  text-center px-8 bg-orange-500 text-white font-[segoeuiBold]">
                          {mascota.apellido}
                        </h3>
                        <div
                          className={`w-full relative mt-3 border-2 ${
                            mascota.tipo_mascota === "PREMIUM"
                              ? "border-[#ffffff]"
                              : "border-[#1c61b6]"
                          } rounded-md overflow-hidden`}
                        >
                          <ul className="flex text-center px-2 py-1">
                            <li className="w-1/3 text-xs">Calificación</li>
                            <li className="w-1/3 text-xs">Esterilizado</li>
                            <li className="w-1/3 text-xs">Sexo</li>
                          </ul>
                          <Divider
                            className={`${
                              mascota.tipo_mascota === "PREMIUM"
                                ? "bg-[#ffffff]"
                                : "bg-[#1c61b6]"
                            } h-[2px]`}
                          />
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
                          <Divider
                            className={`${
                              mascota.tipo_mascota === "PREMIUM"
                                ? "bg-[#ffffff]"
                                : "bg-[#1c61b6]"
                            } h-[2px]`}
                          />{" "}
                          <ul className="w-full p-4 text-xs">
                            <li className="w-full flex justify-between py-[2px]">
                              <p className="w-1/2">Fecha de Nacimiento</p>
                              <p
                                className={`w-2/5 text-center border-b-2 ${
                                  mascota.tipo_mascota === "PREMIUM"
                                    ? "border-white text-white"
                                    : "border-[#1c61b6] text-black"
                                }  `}
                              >
                                {formatDate(mascota.fecha_nacimiento)}
                              </p>
                            </li>
                            <li className="w-full flex justify-between py-[2px]">
                              <p className="w-1/2">Fecha de Emisión</p>
                              <p
                                className={`w-2/5 text-center border-b-2 ${
                                  mascota.tipo_mascota === "PREMIUM"
                                    ? "border-white text-white"
                                    : "border-[#1c61b6] text-black"
                                }  `}
                              >
                                {formatDate(mascota.fecha_inscripcion)}
                              </p>
                            </li>
                            <li className="w-full flex justify-between py-[2px]">
                              <p className="w-1/2">Fecha de Inscripción</p>
                              <p
                                className={`w-2/5 text-center border-b-2 ${
                                  mascota.tipo_mascota === "PREMIUM"
                                    ? "border-white text-white"
                                    : "border-[#1c61b6] text-black"
                                }  `}
                              >
                                {formatDate(mascota.fecha_inscripcion)}
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

                <div className="w-fit min-h-[331px] max-h-[331px] bg-white mt-2">
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
                    <div className="absolute top-4 min-w-[350px] font-[segoeui] text-center min-h-[30px] bg-[#616160] rounded-xs z-10 rounded-t-md">
                      <p className="text-white">
                        {mascota.cod_microchip || "-"}
                      </p>
                    </div>
                    <section className="w-full pt-8 h-full flex flex-col items-center p-5 text-neutral-600 font-[SegoeUiBlack]">
                      <div className="w-full h-full relative mt-3 border-2 border-[#616160] rounded-md overflow-hidden">
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
                        <Divider className="bg-[#616160] h-[2px]" />
                        <ul className="flex font-[segoeui]  text-center px-2 py-2">
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
                        <Divider className="bg-[#616160] h-[2px]" />
                        <ul className="flex flex-col gap-1 text-xs py-2 px-3">
                          <li className="w-full flex items-center gap-2">
                            <p className="font-semibold text-black">
                              DIRECCIÓN
                            </p>
                            <p className="font-[segoeui]  text-[11px] text-[#616160]">
                              {mascota.direccion || "-"}
                            </p>
                          </li>
                        </ul>
                        <Divider className="bg-[#616160] h-[2px]" />
                        <ul className="flex flex-col gap-1 text-xs py-4 px-3">
                          <li className="w-full py-[2px] flex items-center gap-2">
                            <p className="w-[150px] text-black">RESPONSABLE</p>
                            <div className="w-full text-center text-[#616160]">
                              {mascota.usuario.nombre}{" "}
                              {mascota.usuario.apellido}
                              <div className="w-full flex gap-2 py-1">
                                {Array.from({ length: 20 }).map((_, i) => (
                                  <span
                                    key={i}
                                    className="w-full h-[1.5px] bg-[#616160] rounded"
                                  ></span>
                                ))}
                              </div>
                            </div>
                          </li>
                          <li className="w-full py-[2px] flex items-center gap-2">
                            <p className="w-[150px] text-black">
                              RESPONSABLE 2
                            </p>
                            <div className="font-[segoeui]  w-full text-center text-[#616160]">
                              {mascota.responsable_2 || "-"}
                              <div className="w-full flex gap-2 py-1">
                                {Array.from({ length: 20 }).map((_, i) => (
                                  <span
                                    key={i}
                                    className="w-full h-[1.5px] bg-[#616160] rounded"
                                  ></span>
                                ))}
                              </div>
                            </div>
                          </li>
                        </ul>
                        <Divider className="bg-[#616160] h-[2px]" />
                        <div className="w-full font-[segoeui] flex flex-col items-center  text-xs uppercase py-2 px-4 text-nowrap overflow-hidden">
                          <p>
                            {`<<<<<<<<<<<<<<<<<<<< ${mascota.dni} <<<<<<<<<<<<<<<<<<<<`}
                          </p>
                          <p>
                            {padMascota(
                              `${mascota.nombre} ${mascota.apellido || "-"}`
                            )}
                          </p>

                          <p>
                            {" "}
                            {`<<<<<<<<<<RUM<REGISTRO<UNICO<DE<MASCOTAS<<<<<<<<<`}
                          </p>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="default"
                size="sm"
                onPress={() => onOpenChange(false)}
              >
                Cerrar
              </Button>
              {/* <Button
                color="secondary"
                size="sm"
                onPress={generarPDF}
                isLoading={loading}
              >
                Previsualizar
              </Button> */}
              {/* <Button
                color="danger"
                size="sm"
                isDisabled={!pdfPreview}
                onPress={descargarPDF}
              >
                Descargar
              </Button> */}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalDniMascota;
