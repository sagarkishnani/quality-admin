import {
    HiOutlineHome,
    HiOutlineOfficeBuilding,
    HiOutlineTicket,
} from "react-icons/hi";
import { useAuth } from "../../../common/contexts/AuthContext";
import { WelcomeCard } from "../WelcomeCard/WelcomeCard";
import {
    ConstantLocalStorage,
    ConstantMailConfig,
    ConstantRoles,
} from "../../../common/constants";
import { Button } from "@mui/material";
import html2pdf from "html2pdf.js";
import ReactDOMServer from "react-dom/server";
import TechnicalServiceReport from "../../../common/mailTemplates/technicalServiceReport";
import {
    Attachement,
    MailService,
    SendEmailRequest,
} from "../../../common/services/MailService";
import { UserCompanyService } from "../../../common/services/UserCompanyService";
import { useEffect, useState } from "react";
import { CompanyModal } from "../../../common/components/CompanyModal/CompanyModal";
import { GetUserCompany } from "../../../common/interfaces/User.interface";
import secureLocalStorage from "react-secure-storage";

const pdfData = {
    RecordCreationDate: "01/01/2023",
    AppointmentInitTime: "08:00",
    AppointmentEndTime: "12:00",
    Company: "Clínica Javier Prado",
    Address: "Av. Javier Prado Este 499",
    Local: "Local San Isidro",
    CompanyFloor: "6",
    CompanyArea: "Recursos Humanos",
    User: "Sagar Kishnani",
    DeviceOne: "ALTALINK B8055",
    SeriesNumberOne: "T-32423",
    CounterOne: "340",
    GuideOne: "4523232",
    DeviceTwo: "LASERJET ENTERPRISE M606N",
    SeriesNumberTwo: "L-43321",
    CounterTwo: "10",
    GuideTwo: "4523232",
    ReportedFailure:
      "La impresora se atascó y ya no está funcionando correctamente.",
    FoundFailure:
      "Se encontró que la impresora estaba fallando porque había sufrido una caída y la bandeja tuvo un daño.",
    Revision: {
      BandejaUno: "B",
      BandejaDos: "L",
      BandejaSalida: "B",
      BisagraEscaner: "G",
      BandejaADF: "B",
      CristalCamaPlana: "B",
      ConectorUSB: "B",
      ConectorRJ: "L",
      PanelControl: "L",
      Engranaje: "L",
      LaminaTeplon: "G",
      RodilloPresion: "G",
    },
    Procedure: {
      Instalacion: "X",
      Cambio: "X",
      Mantenimiento: "X",
      Reparacion: "X",
      Retiro: "X",
      Revision: "X",
      MantImpresora: "X",
      MantOptico: "",
      MantOpticoEscaner: "",
      MantSistema: "",
      ActualFirmware: "X",
      EtiquetaFusor: "X",
      EtiquetaFusorTeflon: "X",
      RevCartucho: "X",
      RevFusor: "X",
      RevImagen: "X",
      RevADF: "X",
      RevRodilloBUno: "X",
      RevRodilloBDos: "X",
      RevSeparador: "X",
      RevDuplex: "X",
      CambioCartucho: "",
      CambioFusor: "",
      CambioImagen: "",
      CambioRodillo: "",
      CambioTeflon: "",
      CambioRodilloBUno: "",
      CambioRodilloBDos: "",
      CambioSeparador: "",
      CambioDrive: "",
      CambioSwing: "",
      CambioAOF: "",
      CambioDC: "X"
    },
    Comments: {
      UsoPapelHumedo: "",
      UsoPapelReciclado: "",
      UsoPapelGrapas: "",
      UsoEtiquetas: "",
      ConectadoPared: "X",
      ConectadoSupresor: "X",
      ConectadoEstabilizador: "X",
      ConectadoUPS: "",
      Operativo: "",
      PegadoEtiquetaGarantia: "",
      EnObservacion: "",
      EquipoRequiereCambio: "",
      EquipoRequiereMantenimiento: "X",
      CartuchoOtroProveedor: "",
      CartuchoDanado: "",
    },
    Instalacion: "X",
    ServicioGarantia: "",
    Negligencia: "X",
    Maintenance: "X", //ESTE CAMPO FALTÓ AGREGAR
    FacturableVisit: "X",
    Comment: "No hay comentarios.",
    Recommendation:
      "Se recomienda que tengan más cuidado a la hora de cargar la impresora.",
    Signature: {
      ResponsibleName: "Sagar Kishnani",
      ResponsibleDni: "45895675",
      ResponsibleSignature:
        "https://vauxeythnbsssxnhvntg.supabase.co/storage/v1/object/public/media/tickets/6f970d16-055a-4747-9ee9-79f43386abe3",
      TechnicianName: "Jorge Ramón",
      TechnicianSignature:
        "https://vauxeythnbsssxnhvntg.supabase.co/storage/v1/object/public/media/tickets/ab55aec9-d675-429e-86ab-aa3e8a0ce2b7",
    },
  }
  

export const WelcomeScreen = () => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage] = useState("Seleccione el local activo");
    const [userCompanies, setUserCompanies] = useState<GetUserCompany[]>([]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    async function getUserCompanies(idUser: string) {
        const hasLocation = secureLocalStorage.getItem(
            ConstantLocalStorage.LOCATION
        );
        const data = await UserCompanyService.getUserCompanies(idUser);
        if (data) {
            const onlyCompanies = data.map((item) => item.Company);
            setUserCompanies(onlyCompanies);
            if (
                data.length > 1 &&
                user?.IdRole === ConstantRoles.USUARIO &&
                !hasLocation
            ) {
                setIsModalOpen(true);
                secureLocalStorage.setItem(ConstantLocalStorage.LOCATION, true);
            }
        }
    }

    async function getAll(idUser: string) {
        setIsLoading(true);
        await getUserCompanies(idUser);
        setIsLoading(false);
    }

    useEffect(() => {
        const idUser = user?.IdUser;
        if (idUser !== null) {
            getAll(idUser!);
        }
    }, []);

    // const onClickTest = () => {
    //     const printElement = ReactDOMServer.renderToString(
    //         TechnicalServiceReport({ data: pdfData })
    //     );
    //     let opt = {
    //         format: "a4",
    //         margin: 1,
    //         html2canvas: {
    //             dpi: 192,
    //             scale: 4,
    //             letterRendering: true,
    //             useCORS: true,
    //         },
    //         devicePixelRatio: 1.5,
    //     };

    //     // DESCOMENTAR PARA DESCARGA DE ARCHIVO PDF
    //     // html2pdf()
    //     //     .from(printElement)
    //     //     .set(opt)
    //     //     .save();

    //     html2pdf()
    //         .from(printElement)
    //         .set(opt)
    //         .outputPdf()
    //         .then(async (pdf) => {
    //             let base64 = btoa(pdf);

    //             let attachemnts: Attachement = {
    //                 filename: "test.pdf",
    //                 content: base64,
    //             };

    //             let request: SendEmailRequest = {
    //                 from: ConstantMailConfig.FROM,
    //                 to: ["rz.jorge21@gmail.com"],
    //                 subject: ConstantMailConfig.SUBJECT,
    //                 html: ConstantMailConfig.HTML,
    //                 attachments: [attachemnts],
    //             };
    //             const resp = await MailService.sendEmail(request);
    //             console.log("resp", resp);
    //     });
    // };

    // return (
    //     <>
    //         <TechnicalServiceReport data={pdfData}></TechnicalServiceReport>
    //         <Button variant="contained" onClick={onClickTest}>
    //             Test Button
    //         </Button>
    //     </>
    // );

    return (
        <>
            <div className="flex flex-row flex-wrap flex-1">
                <div className="p-4 lg:p-8 flex-1">
                    <h2 className="font-semibold text-lg">
                        ¡Te damos la bienvenida, {user?.Name}!
                    </h2>
                    <div className="flex flex-row">
                        <div className="flex flex-col">
                            <WelcomeCard
                                key={1}
                                title={"Bienvenido " + user?.Name}
                                description="Familiarízate con el dashboard, accede a todas las secciones desde este panel."
                                link="/"
                                icon={
                                    <HiOutlineHome
                                        color="#00A0DF"
                                        size={"26"}
                                    />
                                }
                            />
                            <WelcomeCard
                                key={2}
                                title={"Accede a tus tickets"}
                                description="Accede a tus tickets de manera rápida y fácil, registra y realiza anotaciones para las solicitudes."
                                link="/tickets"
                                icon={
                                    <HiOutlineTicket
                                        color="#00A0DF"
                                        size={"26"}
                                    />
                                }
                            />
                            {user?.IdRole ===
                                (ConstantRoles.LIDER_FUNCIONAL ||
                                    ConstantRoles.ADMINISTRADOR_TI) && (
                                <WelcomeCard
                                    key={3}
                                    title={"Accede a las empresas registadas"}
                                    description="Crea, edita y visualiza los datos de las empresas que pertenecen a la mesa de ayuda."
                                    link="/empresas"
                                    icon={
                                        <HiOutlineOfficeBuilding
                                            color="#00A0DF"
                                            size={"26"}
                                        />
                                    }
                                />
                            )}
                        </div>
                        <div></div>
                    </div>
                </div>
            </div>
            <CompanyModal
                title={modalMessage}
                open={isModalOpen}
                handleClose={handleCloseModal}
                companies={userCompanies}
            />
        </>
    );
};
