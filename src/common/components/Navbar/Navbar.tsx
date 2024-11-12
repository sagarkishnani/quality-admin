import { Badge, Menu, MenuItem, Tooltip } from "@mui/material"
import {
  HiChevronDown,
  HiLocationMarker,
  HiMenu,
  HiOutlineBell,
  HiX,
} from "react-icons/hi"
import { useEffect, useState } from "react"
import { UserService } from "../../services/UserService"
import { useNavigate } from "react-router-dom"
import {
  ConstantLocalStorage,
  ConstantRoles,
  ConstantStorageBuckets,
} from "../../constants"
import { HiOutlineUser, HiOutlineLogout } from "react-icons/hi"
import unknownUser from "../../../assets/images/user/unknown.png"
import { CompanyModal } from "../CompanyModal/CompanyModal"
import { GetUserCompany, GetUserLocal } from "../../interfaces/User.interface"
import { UserCompanyService } from "../../services/UserCompanyService"
import secureLocalStorage from "react-secure-storage"
import CustomDrawer from "../Drawer/Drawer"
import { NotificationService } from "../../services/NotificationService"
import { Notification } from "../../interfaces/Notification.interface"
import moment from "moment"
import useUserStore from "../../stores/UserStore"
import { UserLocalService } from "../../services/UserLocalService"

export const Navbar = ({ onToggleSidebar }) => {
  const supabaseImgUrl =
    import.meta.env.VITE_REACT_APP_SUPABASE_STORAGE_URL +
    ConstantStorageBuckets.USER
  const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL

  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMessage] = useState("Seleccione el local activo")
  const [userCompanies, setUserCompanies] = useState<GetUserCompany[]>([])
  const [userLocals, setUserLocals] = useState<GetUserLocal[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const navigate = useNavigate()

  async function logout() {
    setIsLoading(true)

    secureLocalStorage.setItem(ConstantLocalStorage.LOCATION, false)
    await UserService.logoutUser()

    setUser(null)

    setIsLoading(false)
    navigate("/login")
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleProfile = () => {
    setAnchorEl(null)
    navigate("mis-datos")
  }

  const handleLogout = () => {
    setAnchorEl(null)
    logout()
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }

  const handleOpenLocation = () => {
    navigate("/")
    setIsModalOpen(true)
  }

  async function getUserCompanies(idUser: string) {
    const data = await UserCompanyService.getUserCompanies(idUser)
    if (data) {
      const onlyCompanies = data.map((item) => item.Company)
      setUserCompanies(onlyCompanies)
    }
  }

  // async function getUserLocals(idUser: string) {
  //   const data = await UserLocalService.getUserLocals(idUser)
  //   if (data) {
  //     const onlyLocals = data.map((item) => item.CompanyLocal)
  //     setUserLocals(onlyLocals)
  //   }
  // }

  async function getNotifications() {
    if (
      user?.IdRole === ConstantRoles.LIDER_FUNCIONAL ||
      user?.IdRole === ConstantRoles.ADMINISTRADOR_TI
    ) {
      const data = await NotificationService.getNotifications()
      if (data) {
        setNotifications(data)
        return
      }
    }

    if (user?.IdRole === ConstantRoles.USUARIO) {
      const data = await NotificationService.getNotificationsByFilter(
        "IdCompany",
        user.IdCompany
      )
      if (data) {
        setNotifications(data)
        return
      }
    }

    if (user?.IdRole === ConstantRoles.TECNICO) {
      const data = await NotificationService.getNotificationsByFilter(
        "IdTechnician",
        user.IdUser
      )
      if (data) {
        setNotifications(data)
        return
      }
    }
  }

  async function getAll(idUser: string) {
    setIsLoading(true)
    await getUserCompanies(idUser)
    await getNotifications()
    setIsLoading(false)
  }

  useEffect(() => {
    const idUser = user?.IdUser
    if (idUser !== null) {
      getAll(idUser)
    }
  }, [user])

  return (
    <>
      <nav className="py-8 px-4 lg:px-12 bg-white shadow-gray-300 shadow-sm w-full">
        <div className="flex flex-row items-center justify-center lg:justify-end space-x-8">
          <div onClick={onToggleSidebar} className="cursor-pointer lg:hidden">
            <HiMenu color="#00A0DF" size={"24"} />
          </div>
          <div
            onClick={handleClick}
            className="flex flex-row items-center flex-wrap space-x-2 cursor-pointer"
          >
            <div className="rounded-full bg-blue-200 w-8 h-8">
              <img
                className="rounded-full w-full h-full object-cover"
                src={
                  user?.ImageUrl == null
                    ? unknownUser
                    : supabaseUrl + supabaseImgUrl + "/" + user?.ImageUrl
                }
                alt="perfil"
              />
            </div>
            <div>
              <h4 className="text-qBlue font-semibold">{user?.Name}</h4>
            </div>
            <div>
              <HiChevronDown color="#00A0DF" size={"20"} />
            </div>
          </div>
          {userCompanies.length > 1 &&
            user?.IdRole == ConstantRoles.USUARIO && (
              <div>
                <Tooltip title="Cambiar empresa">
                  <button onClick={handleOpenLocation}>
                    <HiLocationMarker color="#74C947" size={"32"} />
                  </button>
                </Tooltip>
              </div>
            )}
          <div onClick={() => setDrawerOpen(true)} className="cursor-pointer">
            <Badge
              badgeContent={notifications.length > 0 ? notifications.length : 0}
              color="primary"
            >
              <HiOutlineBell color="#00A0DF" size={"24"} />
            </Badge>
          </div>
        </div>
      </nav>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem className="text-qGray" onClick={handleProfile}>
          <HiOutlineUser size={"20"} className="mr-2" />
          Mis datos
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <HiOutlineLogout size={"20"} className="mr-2" />
          Cerrar sesión
        </MenuItem>
      </Menu>
      <CompanyModal
        title={modalMessage}
        open={isModalOpen}
        handleClose={handleCloseModal}
        companies={userCompanies}
      />
      <CustomDrawer open={drawerOpen} onClose={handleDrawerClose}>
        <div className="mt-12 p-6">
          <HiX
            onClick={handleDrawerClose}
            size={"20"}
            className="mr-2 float-right cursor-pointer"
          />
          <div className="flex flex-row justify-between mb-4">
            <h2 className="font-semibold text-xl">Notificaciones</h2>
            {/* <div>
              <button className="text-qBlue underline">Limpiar</button>
            </div> */}
          </div>
          {notifications.length > 0 ? (
            <>
              {notifications.map((notification: Notification) => (
                <div
                  key={notification.IdNotification}
                  className="px-6 py-3 bg-gray-100 rounded-lg max-w-sm mb-4 font-medium"
                >
                  El ticket{" "}
                  <span className="font-semibold">
                    {notification.CodeTicket}
                  </span>{" "}
                  ha pasado al estado{" "}
                  <span className="font-semibold">
                    {notification.TicketStatus.Name.toLowerCase()}.
                  </span>{" "}
                  <div className="text-qBlack text-sm font-semibold mt-2">
                    {notification.RecordEditDate === null
                      ? moment(notification.RecordCreationDate).format(
                          "DD/MM/YYYY"
                        )
                      : moment(notification.RecordEditDate).format(
                          "DD/MM/YYYY"
                        )}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <div className="px-6 py-3 font-medium">
                No tiene notificaciones pendientes.
              </div>
            </>
          )}
        </div>
      </CustomDrawer>
    </>
  )
}
