import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useState, useRef } from "react";

import Loading from "../../../../../hooks/Loading";
import type { Mascota } from "../../../../../type/mascotas.type";
import { formatDate } from "../../../../../utils/formatDate";
import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";

interface Props {
  mascota: Mascota;
  isOpen: boolean;
  onOpenChange: (e: boolean) => void;
}

const ModalDniMascota = ({ mascota, isOpen, onOpenChange }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  // Referencia al contenedor que se descargará como imagen
  const dniRef = useRef<HTMLDivElement>(null);
  const dniRef2 = useRef<HTMLDivElement>(null);

  // FUNCIÓN PARA DESCARGAR EL CONTENEDOR COMO IMAGEN
  // const descargarImagen = async () => {
  //   setLoading(true);

  //   try {
  //     // PRIMERA IMAGEN
  //     if (dniRef.current) {
  //       const dataUrl1 = await htmlToImage.toPng(dniRef.current, {
  //         cacheBust: true,
  //         quality: 1,
  //       });

  //       const link1 = document.createElement("a");
  //       link1.download = `dni-front-${mascota.nombre}.png`;
  //       link1.href = dataUrl1;
  //       link1.click();
  //     }

  //     // SEGUNDA IMAGEN
  //     if (dniRef2.current) {
  //       const dataUrl2 = await htmlToImage.toPng(dniRef2.current, {
  //         cacheBust: true,
  //         quality: 1,
  //       });

  //       const link2 = document.createElement("a");
  //       link2.download = `dni-back-${mascota.nombre}.png`;
  //       link2.href = dataUrl2;
  //       link2.click();
  //     }
  //   } catch (error) {
  //     console.error("Error al generar imagen:", error);
  //   }

  //   setLoading(false);
  // };

  const descargarPDF = async () => {
    setLoading(true);

    try {
      const pdf = new jsPDF({
        orientation: "landscape", // DNI horizontal
        unit: "px",
        format: [530, 324], // tamaño exacto de tu DNI
      });

      // ===== FRONT =====
      if (dniRef.current) {
        const imgFront = await htmlToImage.toPng(dniRef.current, {
          cacheBust: true,
          quality: 1,
        });

        pdf.addImage(imgFront, "PNG", 0, 0, 530, 324);
      }

      // ===== BACK (segunda página) =====
      if (dniRef2.current) {
        const imgBack = await htmlToImage.toPng(dniRef2.current, {
          cacheBust: true,
          quality: 1,
        });

        pdf.addPage([530, 324], "landscape");
        pdf.addImage(imgBack, "PNG", 0, 0, 530, 324);
      }

      pdf.save(`dni-mascota-${mascota.nombre}.pdf`);
    } catch (error) {
      console.error("Error al generar PDF:", error);
    }

    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
      {loading && <Loading />}
      <ModalContent className="bg-[#e6ebee] h-auto overflow-y-auto">
        {() => (
          <>
            <ModalHeader className="text-[#1c61b6]">
              DNI DE LA MASCOTA
            </ModalHeader>

            <ModalBody className=" flex flex-col gap-4 items-center justify-center">
              {/* ===== CONTENEDOR QUE SE DESCARGA COMO IMAGEN ===== */}
              <div
                ref={dniRef}
                className={`w-fit min-h-[331px] max-h-[331px]  ${mascota} bg-white`}
                style={{
                  display: "inline-block",
                }}
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
                        className="w-[160px] min-h-[180px] rounded-md object-cover "
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
                        {mascota.nombre}
                      </h2>

                      <h3 className="w-fit text-center px-8 bg-orange-500 text-white">
                        {mascota.usuario.nombre} {mascota.usuario.apellido}
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

                        <ul className="flex flex-col  text-xs py-2 px-3">
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
              <div
                ref={dniRef2}
                className="w-fit min-h-[331px] max-h-[331px]  bg-white"
                style={{
                  display: "inline-block",
                }}
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
                    <p className="text-white ">
                      {mascota.cod_microchip || "-"}
                    </p>
                  </div>

                  <section className="w-full pt-8 h-full  flex flex-col items-center  p-5 text-neutral-600 font-[SegoeUiBlack]">
                    <div className="w-full h-full relative mt-3 border-2 border-[#1c61b6] rounded-md overflow-hidden">
                      <ul className="flex text-center px-2 py-2">
                        <li className="w-1/3 text-xs text-black uppercase ">
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
                        <li className="w-full  flex items-center  gap-2">
                          <p className="font-semibold text-black">DIRECCIÓN</p>
                          <p className="text-[11px] text-[#616160]">
                            {mascota.direccion || "-"}
                          </p>
                        </li>
                      </ul>
                      <Divider className="bg-[#1c61b6] h-[2px]" />

                      <ul className="flex flex-col gap-1 text-xs py-4 px-3">
                        <li className="w-full  py-[2px] flex items-center gap-2">
                          <p className="w-[150px] text-black">RESPONSABLE</p>
                          <p className="w-full text-center text-[#616160] ">
                            {mascota.usuario.nombre} {mascota.usuario.apellido}
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
                      <p className="text-xs py-4 text-center">
                        {`<<<<<<<<<<<<<<<<<< ${mascota.dni} >>>>>>>>>>>>>>>>>>>`}{" "}
                        <br />
                        {`<<<<<< ${mascota.usuario.nombre} ${mascota.usuario.apellido} >>>>>>>`}
                        <br />
                        {`<<<<<<<<RUM<REGISTRO<UNICO<DE<MASCOTAS>>>>>>>>`}{" "}
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

              {/* ===== FIN DEL CONTENEDOR ===== */}
            </ModalBody>

            <ModalFooter>
              <Button
                color="primary"
                type="button"
                onPress={() => onOpenChange(false)}
                size="sm"
              >
                Cancelar
              </Button>

              {/* BOTÓN DESCARGAR */}
              <Button color="danger" size="sm" onPress={descargarPDF}>
                Descargar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalDniMascota;
