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
import { WelcomeScreen } from "../../../pages/Welcome/WelcomeScreen/WelcomeScreen"
import { Welcome } from "../../../pages/Welcome/Welcome"
import { CompanyEdit } from "../../../pages/Company/CompanyEdit/CompanyEdit"
import { TicketRegisterStepFive } from "../../../pages/Ticket/TicketRegisterStepFive/TicketRegisterStepFive"
import { useState } from "react"
import { Services } from "../../../pages/Services/Services"
import { ServicesList } from "../../../pages/Services/ServicesList/ServicesList"
import { ServicesRegister } from "../../../pages/Services/ServicesRegister/ServicesRegister"
import { ServicesView } from "../../../pages/Services/ServicesView/ServicesView"
import { ServicesEdit } from "../../../pages/Services/ServicesEdit/ServicesEdit"

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <>
      <Sidebar open={sidebarOpen} onToggleSidebar={toggleSidebar} />
      <div
        className={`flex flex-col w-full ${
          sidebarOpen ? "hidden" : "lg:pl-[18rem]"
        }`}
      >
        <Navbar onToggleSidebar={toggleSidebar} />
        <div className="overflow-auto">
          <Routes>
            <Route path="/" element={<Welcome />}>
              <Route index element={<WelcomeScreen />} />
            </Route>
            <Route path="/tickets" element={<Ticket />}>
              <Route index element={<TicketList />} />
              <Route path="nuevo" element={<TicketRegister />} />
              <Route path="ver" element={<TicketRegisterView />} />
              <Route
                path="asignar-tecnico"
                element={<TicketRegisterStepTwo />}
              />
              <Route
                path="reasignar-tecnico"
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
              <Route
                path="confirmar-facturable"
                element={<TicketRegisterStepFive />}
              />
            </Route>
            <Route path="/mis-datos" element={<Profile />}>
              <Route index element={<ProfileForm />} />
            </Route>
            <Route path="/empresas" element={<Company />}>
              <Route index element={<CompanyList />} />
              <Route path="nueva" element={<CompanyRegister />} />
              <Route path="editar" element={<CompanyEdit />} />
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
            <Route path="/servicios" element={<Services />}>
              <Route index element={<ServicesList />} />
              <Route path="nuevo" element={<ServicesRegister />} />
              <Route path="ver" element={<ServicesView />} />
              <Route path="editar" element={<ServicesEdit />} />
            </Route>
          </Routes>
        </div>
      </div>
    </>
  )
}
