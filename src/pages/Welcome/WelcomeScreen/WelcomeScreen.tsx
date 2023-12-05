import {
  HiOutlineHome,
  HiOutlineOfficeBuilding,
  HiOutlineTicket,
} from "react-icons/hi"
import { useAuth } from "../../../common/contexts/AuthContext"
import { WelcomeCard } from "../WelcomeCard/WelcomeCard"
import { ConstantRoles } from "../../../common/constants"

export const WelcomeScreen = () => {
  const { user } = useAuth()
  return (
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
                title={"Accede a las empresas registadas"}
                description="Crea, edita y visualiza los datos de las empresas que pertenecen a la mesa de ayuda."
                link="/empresas"
                icon={<HiOutlineOfficeBuilding color="#00A0DF" size={"26"} />}
              />
            )}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  )
}
