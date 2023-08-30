import { Sidebar } from "../Sidebar/Sidebar";
import { Navbar } from "../Navbar/Navbar";
import { TicketList } from "../../../pages/TicketList/TicketList";
import { CompanyList } from "../../../pages/Company/CompanyList/CompanyList";
import { CompanyRegister } from "../../../pages/Company/CompanyRegister/CompanyRegister";
import { Route, Routes } from "react-router-dom";
import { Company } from "../../../pages/Company/Company";
import { Configuration } from "../../../pages/Configuration/Configuration";
import { ConfigurationList } from "../../../pages/Configuration/ConfigurationList/ConfigurationList";
import { Profile } from "../../../pages/Profile/Profile";
import { ProfileForm } from "../../../pages/Profile/ProfileForm/ProfileForm";
import { User } from "../../../pages/User/User";
import { UserList } from "../../../pages/User/UserList/UserList";
import { ConfigurationRegister } from "../../../pages/Configuration/ConfigurationRegister/ConfigurationRegister";
import { ConfigurationView } from "../../../pages/Configuration/ConfigurationView/ConfigurationView";
import { ConfigurationEdit } from "../../../pages/Configuration/ConfigurationEdit/ConfigurationEdit";
import { UserRegister } from "../../../pages/User/UserRegister/UserRegister";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";

export const Layout = () => {
  const { user } = useAuth();

  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <>
      <div className="grid grid-cols-[2.5rem,auto] lg:grid-cols-[18rem,auto]">
        <Sidebar />
        <div className="flex flex-col">
          <Navbar />
          <Routes>
            <Route path="/tickets" element={<TicketList />} />
            <Route path="/mis-datos" element={<Profile />}>
              <Route index element={<ProfileForm />} />
            </Route>
            <Route path="/empresas" element={<Company />}>
              <Route index element={<CompanyList />} />
              <Route path="nueva" element={<CompanyRegister />} />
            </Route>
            <Route path="/usuarios" element={<User />}>
              <Route index element={<UserList />} />
              <Route path="nuevo" element={<UserRegister />} />
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
  );
};
