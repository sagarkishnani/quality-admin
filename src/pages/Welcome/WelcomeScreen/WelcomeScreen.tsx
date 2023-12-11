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

const data = {
    date: "01/01/2023",
    init_hour: "08:00",
    end_hour: "12:00",
    business: "business",
    address: "address",
    local: "local",
    floor: "floor",
    area: "area",
    user: "user",
    equipments: [
        {
            equipment: "q.1",
            ns: "asdasdas",
            counter: "3r4",
            guide: "894",
        },
        {
            equipment: "eq.1",
            ns: "asdasdas",
            counter: "3r4",
            guide: "894",
        },
    ],
    userIssue: "userIssue",
    fixerIssue: "fixerIssue",
    revision: {
        b1: "b",
        b2: "b",
        b3: "b",
        b4: "b",
        b5: "b",
        b6: "b",
        b7: "b",
        b8: "b",
        b9: "b",
        b10: "b",
        b11: "b",
        b12: "b",
    },
    procedure: {
        p1: "p",
        p2: "p",
        p3: "p",
        p4: "p",
        p5: "p",
        p6: "p",
        p7: "p",
        p8: "p",
        p9: "p",
        p10: "p",
        p11: "p",
        p12: "p",
        p13: "p",
        p14: "p",
        p15: "p",
        p16: "p",
        p17: "p",
        p18: "p",
        p19: "p",
        p20: "p",
        p21: "p",
        p22: "p",
        p23: "p",
        p24: "p",
        p25: "p",
        p26: "p",
        p27: "p",
        p28: "p",
        p29: "p",
        p30: "p",
        p31: "p",
        p32: "p",
        p33: "p",
        p34: "p",
        p35: "p",
        p36: "p",
    },
    comments: {
        c1: "c",
        c2: "c",
        c3: "c",
        c4: "c",
        c5: "c",
        c6: "c",
        c7: "c",
        c8: "c",
        c9: "c",
        c10: "c",
        c11: "c",
        c12: "c",
        c13: "c",
        c14: "c",
    },
    instalation: "x",
    guarantee: "x",
    negligence: "x",
    visit: "x",
    maintenance: "x",
    comment: "comment",
    recomendation: "recomendation",
    responsibleSign: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/XXXTentacion_signature.svg/565px-XXXTentacion_signature.svg.png",
    responsibleTechSign: "https://signaturely.com/wp-content/uploads/2020/04/unreadable-letters-signaturely.svg"
};

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
    //         TechnicalServiceReport({ data })
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
    //         <TechnicalServiceReport data={data}></TechnicalServiceReport>
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
