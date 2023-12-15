import {
  HiOutlineHome,
  HiOutlineOfficeBuilding,
  HiOutlineTicket,
} from "react-icons/hi"
import { useAuth } from "../../../common/contexts/AuthContext"
import { WelcomeCard } from "../WelcomeCard/WelcomeCard"
import {
  ConstantLocalStorage,
  ConstantMailConfig,
  ConstantRoles,
} from "../../../common/constants"
import { Button } from "@mui/material"
import ReactDOMServer from "react-dom/server"
import TechnicalServiceReport from "../../../common/mailTemplates/technicalServiceReport"
import {
  Attachement,
  MailService,
  SendEmailRequest,
} from "../../../common/services/MailService"
import { UserCompanyService } from "../../../common/services/UserCompanyService"
import { useEffect, useState } from "react"
import { CompanyModal } from "../../../common/components/CompanyModal/CompanyModal"
import { GetUserCompany } from "../../../common/interfaces/User.interface"
import secureLocalStorage from "react-secure-storage"

export const WelcomeScreen = () => {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMessage] = useState("Seleccione el local activo")
  const [userCompanies, setUserCompanies] = useState<GetUserCompany[]>([])

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  async function getUserCompanies(idUser: string) {
    const hasLocation = secureLocalStorage.getItem(
      ConstantLocalStorage.LOCATION
    )
    const data = await UserCompanyService.getUserCompanies(idUser)
    if (data) {
      const onlyCompanies = data.map((item) => item.Company)
      setUserCompanies(onlyCompanies)
      if (
        data.length > 1 &&
        user?.IdRole === ConstantRoles.USUARIO &&
        !hasLocation
      ) {
        setIsModalOpen(true)
        secureLocalStorage.setItem(ConstantLocalStorage.LOCATION, true)
      }
    }
  }

  async function getAll(idUser: string) {
    setIsLoading(true)
    await getUserCompanies(idUser)
    setIsLoading(false)
  }

  useEffect(() => {
    const idUser = user?.IdUser
    if (idUser !== null) {
      getAll(idUser!)
    }
  }, [])

  return (
    <>
      <div className="flex-row flex-wrap flex-1 grid grid-cols-12">
        <div className="p-4 lg:p-8 col-span-12 md:col-span-8">
          <h2 className="font-semibold text-lg text-center md:text-left">
            ¡Te damos la bienvenida, {user?.Name}!
          </h2>
          <div className="flex flex-row">
            <div className="flex flex-col">
              <WelcomeCard
                key={1}
                title={"Bienvenido " + user?.Name}
                description="Familiarízate con el dashboard, accede a todas las secciones desde este panel."
                link="/"
                icon={<HiOutlineHome color="#00A0DF" size={"26"} />}
              />
              <WelcomeCard
                key={2}
                title={"Accede a tus tickets"}
                description="Accede a tus tickets de manera rápida y fácil, registra y realiza anotaciones para las solicitudes."
                link="/tickets"
                icon={<HiOutlineTicket color="#00A0DF" size={"26"} />}
              />
              {user?.IdRole ===
                (ConstantRoles.LIDER_FUNCIONAL ||
                  ConstantRoles.ADMINISTRADOR_TI) && (
                <WelcomeCard
                  key={3}
                  title={"Accede a las empresas registradas"}
                  description="Crea, edita y visualiza los datos de las empresas que pertenecen a la mesa de ayuda."
                  link="/empresas"
                  icon={<HiOutlineOfficeBuilding color="#00A0DF" size={"26"} />}
                />
              )}
            </div>
            <div></div>
          </div>
        </div>
        {/* <div className="col-span-4 bg-printer"></div> */}
      </div>
      <CompanyModal
        title={modalMessage}
        open={isModalOpen}
        handleClose={handleCloseModal}
        companies={userCompanies}
      />
    </>
  )
}
