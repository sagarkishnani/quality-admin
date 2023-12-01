/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

import pattern from "../../../assets/patterns/pattern.svg"
import logo from "../../../assets/logo/logo-white.svg"
import {
  HiOutlineTicket,
  HiChevronRight,
  HiOutlineUser,
  HiOutlineOfficeBuilding,
  HiOutlineCog,
  HiOutlineUserGroup,
} from "react-icons/hi"
import { BsWhatsapp } from "react-icons/bs"
import { RouteLink } from "../../interfaces/RouteLink.interface"
import { Link, useMatch } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { ConstantRoles } from "../../constants"

export const Sidebar = () => {
  const { user } = useAuth()

  const isActiveRoute = (route: string) => {
    if (useMatch(route)) {
      return 1
    } else 0
  }

  const hasRole = (roles: string[]) => {
    if (roles.includes(user!.IdRole)) return true
    else false
  }

  const routeLinks: RouteLink[] = [
    {
      Id: 1,
      Name: "Tickets",
      Link: "tickets",
      Icon: <HiOutlineTicket className="inline" size={"20"} />,
      Roles: [
        ConstantRoles.ADMINISTRADOR_TI,
        ConstantRoles.LIDER_FUNCIONAL,
        ConstantRoles.TECNICO,
        ConstantRoles.USUARIO,
      ],
    },
    {
      Id: 2,
      Name: "Mis datos",
      Link: "mis-datos",
      Icon: <HiOutlineUser className="inline" size={"20"} />,
      Roles: [
        ConstantRoles.ADMINISTRADOR_TI,
        ConstantRoles.LIDER_FUNCIONAL,
        ConstantRoles.TECNICO,
        ConstantRoles.USUARIO,
      ],
    },
    {
      Id: 3,
      Name: "Empresas",
      Link: "empresas",
      Icon: <HiOutlineOfficeBuilding className="inline" size={"20"} />,
      Roles: [ConstantRoles.LIDER_FUNCIONAL],
    },
    {
      Id: 4,
      Name: "Usuarios",
      Link: "usuarios",
      Icon: <HiOutlineUserGroup className="inline" size={"20"} />,
      Roles: [ConstantRoles.LIDER_FUNCIONAL, ConstantRoles.ADMINISTRADOR_TI],
    },
    {
      Id: 5,
      Name: "Configuración",
      Link: "configuracion",
      Icon: <HiOutlineCog className="inline" size={"20"} />,
      Roles: [ConstantRoles.LIDER_FUNCIONAL],
    },
  ]

  return (
    <>
      {/* Mobile Sidebar */}
      <div className={`h-full w-10 lg:hidden bg-qBlack fixed text-white`}>
        <div className="flex flex-col text-white">
          <div className="p-2">
            <img src={logo} alt="logo" />
          </div>
          <div>
            <div className="p-2">
              {routeLinks.map((route) => (
                <Link to={route.Link}>
                  {hasRole(route.Roles) && (
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
                  )}
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
      <div className="bg-qBlack text-white hidden fixed lg:block h-full w-[18rem]">
        <div className="flex flex-col text-white">
          <div className="p-8">
            <img src={logo} alt="logo" />
          </div>
          <div>
            <div className="justify-center text-center p-8">
              <div>
                <h2 className="font-semibold text-lg">¡Hola, {user?.Name}!</h2>
                <p className="pt-4 m-auto max-w-xs text-sm font-medium">
                  Bienvenido a la mesa de ayuda
                </p>
              </div>
            </div>
            <div className="p-6">
              {routeLinks.map((route) => (
                <Link to={route.Link}>
                  {hasRole(route.Roles) && (
                    <div
                      key={route.Id}
                      className={`${
                        isActiveRoute(route.Link) === 1 ? "text-qGreen" : " "
                      } pb-4 flex flex-row justify-between items-center hover:text-qGreen`}
                    >
                      <div className="basis-4/5">
                        <h3 className="font-semibold">
                          <span className="pr-2 ">{route.Icon}</span>
                          {route.Name}
                        </h3>
                      </div>
                      <div className="basis-1/5 ">
                        <HiChevronRight size={"20"} />
                      </div>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
          <div className="h-full p-6 mb-8">
            <div className="flex flex-row justify-between hover:text-qGreen cursor-pointer">
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
          <div className="absolute bottom-0">
            <img src={pattern} alt="patrón" />
          </div>
        </div>
      </div>
    </>
  )
}
