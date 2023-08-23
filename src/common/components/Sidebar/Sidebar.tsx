/* eslint-disable @typescript-eslint/no-unused-vars */
import pattern from "../../../assets/patterns/pattern.svg";
import logo from "../../../assets/logo/logo-white.svg";
import {
  HiOutlineTicket,
  HiChevronRight,
  HiOutlineUser,
  HiOutlineOfficeBuilding,
  HiOutlineCog,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { BsWhatsapp } from "react-icons/bs";
import { RouteLink } from "../../interfaces/RouteLink.interface";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const routeLinks: RouteLink[] = [
    {
      Id: 1,
      Name: "Tickets",
      Link: "tickets",
      Icon: <HiOutlineTicket className="inline" size={"20"} />,
    },
    {
      Id: 2,
      Name: "Mis datos",
      Link: "mis-datos",
      Icon: <HiOutlineUser className="inline" size={"20"} />,
    },
    {
      Id: 3,
      Name: "Empresas",
      Link: "empresas",
      Icon: <HiOutlineOfficeBuilding className="inline" size={"20"} />,
    },
    {
      Id: 4,
      Name: "Usuarios",
      Link: "usuarios",
      Icon: <HiOutlineUserGroup className="inline" size={"20"} />,
    },
    {
      Id: 5,
      Name: "Configuración",
      Link: "configuracion",
      Icon: <HiOutlineCog className="inline" size={"20"} />,
    },
  ];

  return (
    <>
      {/* Mobile Sidebar */}
      <div className={`h-full w-10 lg:hidden bg-qBlack text-white`}>
        <div className="flex flex-col text-white">
          <div className="p-2">
            <img src={logo} alt="logo" />
          </div>
          <div>
            <div className="p-2">
              {routeLinks.map((route) => (
                <Link to={route.Link}>
                  <div
                    key={route.Id}
                    className="pb-4 flex flex-row justify-between items-center"
                  >
                    <div>
                      <h3 className="font-semibold">
                        <span>{route.Icon}</span>
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="p-2">
              <h3 className="font-semibold">
                <span>
                  <BsWhatsapp className="inline" size={"20"} />
                </span>
              </h3>
            </div>
          </div>
        </div>
      </div>
      {/* Desktop Sidebar */}
      <div className="bg-qBlack text-white hidden lg:block h-full">
        <div className="flex flex-col text-white">
          <div className="p-8">
            <img src={logo} alt="logo" />
          </div>
          <div>
            <div className="justify-center text-center p-8">
              <div>
                <h2 className="font-semibold text-lg">¡Hola, Omar!</h2>
                <p className="pt-4 m-auto max-w-xs text-sm font-medium">
                  Bienvenido a la mesa de ayuda
                </p>
              </div>
            </div>
            <div className="p-6">
              {routeLinks.map((route) => (
                <Link to={route.Link}>
                  <div
                    key={route.Id}
                    className="pb-4 flex flex-row justify-between items-center"
                  >
                    <div className="basis-4/5">
                      <h3 className="font-semibold">
                        <span className="pr-2">{route.Icon}</span>
                        {route.Name}
                      </h3>
                    </div>
                    <div className="basis-1/5">
                      <HiChevronRight size={"20"} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="h-full p-6 mb-8">
            <div className="flex flex-row justify-between">
              <div className="basis-4/5">
                <h3 className="font-semibold">
                  <span className="pr-2">
                    <BsWhatsapp className="inline" size={"20"} />
                  </span>
                  Contáctanos
                </h3>
              </div>
              <div className="basis-1/5">
                <HiChevronRight size={"20"} />
              </div>
            </div>
          </div>
          <div>
            <img src={pattern} alt="patrón" />
          </div>
        </div>
      </div>
    </>
  );
};
