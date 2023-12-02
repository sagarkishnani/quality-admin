import { Sidebar } from "../Sidebar/Sidebar"
import { Navbar } from "../Navbar/Navbar"
import { CompanyList } from "../../../pages/Company/CompanyList/CompanyList"
import { CompanyRegister } from "../../../pages/Company/CompanyRegister/CompanyRegister"
import { Route, Routes } from "react-router-dom"
import { Company } from "../../../pages/Company/Company"
import { Configuration } from "../../../pages/Configuration/Configuration"
import { ConfigurationList } from "../../../pages/Configuration/ConfigurationList/ConfigurationList"
import { Profile } from "../../../pages/Profile/Profile"
import { ProfileForm } from "../../../pages/Profile/ProfileForm/ProfileForm"
import { User } from "../../../pages/User/User"
import { UserList } from "../../../pages/User/UserList/UserList"
import { ConfigurationRegister } from "../../../pages/Configuration/ConfigurationRegister/ConfigurationRegister"
import { ConfigurationView } from "../../../pages/Configuration/ConfigurationView/ConfigurationView"
import { ConfigurationEdit } from "../../../pages/Configuration/ConfigurationEdit/ConfigurationEdit"
import { UserRegister } from "../../../pages/User/UserRegister/UserRegister"
import { useAuth } from "../../contexts/AuthContext"
import { UserEdit } from "../../../pages/User/UserEdit/UserEdit"
import { UserView } from "../../../pages/User/UserView/UserView"
import { CompanyView } from "../../../pages/Company/CompanyView/CompanyView"
import { Ticket } from "../../../pages/Ticket/Ticket"
import { TicketList } from "../../../pages/Ticket/TicketList/TicketList"
import { TicketRegister } from "../../../pages/Ticket/TicketRegister/TicketRegister"
import { TicketRegisterStepTwo } from "../../../pages/Ticket/TicketRegisterStepTwo/TicketRegisterStepTwo"
import { TicketRegisterStepThree } from "../../../pages/Ticket/TicketRegisterStepThree/TicketRegisterStepThree"
import { TicketRegisterStepFour } from "../../../pages/Ticket/TicketRegisterStepFour/TicketRegisterStepFour"
import { TicketRegisterView } from "../../../pages/Ticket/TicketRegisterView/TicketRegisterView"

export const Layout = () => {
  const { user } = useAuth()

  return (
    <>
      <Sidebar />
      <div className="pl-10 lg:pl-[18rem] flex flex-col">
        <Navbar />
        <div className="overflow-auto">
          <Routes>
            <Route path="/tickets" element={<Ticket />}>
              <Route index element={<TicketList />} />
              <Route path="nuevo" element={<TicketRegister />} />
              <Route path="ver" element={<TicketRegisterView />} />
              <Route
                path="asignar-tecnico"
                element={<TicketRegisterStepTwo />}
              />
              <Route
                path="completar-formulario"
                element={<TicketRegisterStepThree />}
              />
              <Route
                path="registrar-facturable"
                element={<TicketRegisterStepFour />}
              />
            </Route>
            <Route path="/mis-datos" element={<Profile />}>
              <Route index element={<ProfileForm />} />
            </Route>
            <Route path="/empresas" element={<Company />}>
              <Route index element={<CompanyList />} />
              <Route path="nueva" element={<CompanyRegister />} />
              <Route path="ver" element={<CompanyView />} />
            </Route>
            <Route path="/usuarios" element={<User />}>
              <Route index element={<UserList />} />
              <Route path="nuevo" element={<UserRegister />} />
              <Route path="editar" element={<UserEdit />} />
              <Route path="ver" element={<UserView />} />
            </Route>
            <Route path="/configuracion" element={<Configuration />}>
              <Route index element={<ConfigurationList />} />
              <Route path="nueva" element={<ConfigurationRegister />} />
              <Route path="ver" element={<ConfigurationView />} />
              <Route path="editar" element={<ConfigurationEdit />} />
            </Route>
          </Routes>
        </div>
      </div>
    </>
  )
}
