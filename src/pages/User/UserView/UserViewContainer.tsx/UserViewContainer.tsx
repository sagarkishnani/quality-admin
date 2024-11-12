import { useFormik } from "formik"
import { MasterTableService } from "../../../../common/services/MasterTableService"
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Skeleton,
  TextField,
} from "@mui/material"
import { Link } from "react-router-dom"
import { HiChevronLeft } from "react-icons/hi"
import { useEffect, useState } from "react"
import secureLocalStorage from "react-secure-storage"
import {
  ConstantLocalStorage,
  ConstantStorageBuckets,
  ConstantsMasterTable,
} from "../../../../common/constants"
import { UserService } from "../../../../common/services/UserService"
import { RoleService } from "../../../../common/services/RoleService"
import unknownUser from "../../../../assets/images/user/unknown.png"
import { UserCompanyService } from "../../../../common/services/UserCompanyService"
import { MasterTable } from "../../../../common/interfaces/MasterTable.interface"
import { GetCompaniesResponse } from "../../../../common/interfaces/Company.interface"
import { CompanyService } from "../../../../common/services/CompanyService"

export const UserViewContainer = () => {
  const supabaseImgUrl =
    import.meta.env.VITE_REACT_APP_SUPABASE_STORAGE_URL +
    ConstantStorageBuckets.USER
  const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [userData, setUserData] = useState<any>(null)
  const [companies, setCompanies] = useState<GetCompaniesResponse[]>([])
  const [userCompanies, setUserCompanies] = useState<any[]>([])
  const [roles, setRoles] = useState<any[]>([])
  const [positions, setPositions] = useState<MasterTable[]>([])

  async function getCompanies() {
    const data = await CompanyService.getCompanies()
    if (data) {
      setCompanies(data)
    }
  }

  async function getRoles() {
    const data = await RoleService.getRoles()
    if (data) {
      setRoles(data)
    }
  }

  async function getPositions() {
    const data = await MasterTableService.getMasterTableByIdParent(
      ConstantsMasterTable.POSITIONS
    )
    if (data) {
      setPositions(data)
    }
  }

  async function getUserById(idUser: string) {
    const data = await UserService.getUserById(idUser)
    if (data) {
      setUserData(data)
    }
  }

  async function getUserCompanies(idUser: string) {
    const data = await UserCompanyService.getUserCompanies(idUser)
    if (data) {
      const onlyCompanies = data.map((item) => item.Company)
      setUserCompanies(onlyCompanies)
    }
  }

  async function getAll(idUser: string) {
    setIsLoading(true)
    await getRoles()
    await getPositions()
    await getUserById(idUser)
    await getUserCompanies(idUser)
    await getCompanies()
    setIsLoading(false)
  }

  const formik = useFormik({
    initialValues: {
      Dni: "",
      Name: "",
      PhoneNumber: "",
      IdRole: "",
      IdCompany: "",
      Position: "",
      email: "",
    },
    onSubmit: (values) => {},
  })

  useEffect(() => {
    const idUser = secureLocalStorage.getItem(ConstantLocalStorage.ID_USER)
    if (idUser !== null) {
      getAll(idUser)
    }
  }, [])

  useEffect(() => {
    if (userData) {
      formik.setValues({
        Dni: userData.Dni,
        Name: userData.Name || "",
        IdCompany: userData.IdCompany || "",
        IdRole: userData.IdRole || "",
        PhoneNumber: userData.PhoneNumber || 0,
        Position: userData.Position || "",
        email: userData.email || "",
      })
    }
  }, [userData])

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <div className="py-5 px-4 md:px-8 bg-qLightGray grid grid-cols-12 gap-4 h-screen">
        <div className="col-span-1 w-8 h-8 rounded-full bg-white justify-center items-center">
          <Link to={"/usuarios"}>
            <HiChevronLeft size={"32"} />
          </Link>
        </div>
        <div className="bg-white col-span-12 md:col-span-8 shadow-sm p-6">
          {!isLoading && (
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <h2 className="font-semibold text-xl pb-2">Ver usuario</h2>
              </div>
              <div className="col-span-6 flex justify-end">
                {!isLoading && (
                  <div className="w-20 h-20 rounded-full bg-qBlue">
                    <img
                      className=" rounded-full w-full h-full object-cover"
                      src={
                        userData?.ImageUrl !== null
                          ? supabaseUrl +
                            supabaseImgUrl +
                            "/" +
                            userData?.ImageUrl
                          : unknownUser
                      }
                      alt="perfil"
                    />
                  </div>
                )}
              </div>
              <div className="col-span-12 md:col-span-6">
                <TextField
                  color="primary"
                  className="w-full"
                  disabled
                  id="Dni"
                  name="Dni"
                  value={formik.values.Dni}
                  label="Dni"
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <TextField
                  color="primary"
                  className="w-full"
                  disabled
                  id="Name"
                  name="Name"
                  value={formik.values.Name}
                  label="Nombre"
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <TextField
                  color="primary"
                  className="w-full"
                  type="number"
                  disabled
                  id="PhoneNumber"
                  name="PhoneNumber"
                  value={formik.values.PhoneNumber}
                  label="Celular"
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <FormControl fullWidth>
                  <InputLabel id="RoleLabel">Rol</InputLabel>
                  <Select
                    disabled
                    labelId="RoleLabel"
                    id="IdRole"
                    name="IdRole"
                    value={formik.values.IdRole}
                  >
                    {roles?.map((role: any) => (
                      <MenuItem key={role.IdRole} value={role.IdRole}>
                        {role.Name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              {/* <div className="col-span-12 md:col-span-6">
                <FormControl fullWidth>
                  <InputLabel id="CompanyLabel">Empresa</InputLabel>
                  <Select
                    disabled
                    labelId="CompanyLabel"
                    id="IdCompany"
                    name="IdCompany"
                    value={formik.values.IdCompany}
                  >
                    {companies?.map((company: any) => (
                      <MenuItem
                        key={company.IdCompany}
                        value={company.IdCompany}
                      >
                        {company.Name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div> */}
              <div className="col-span-12 md:col-span-6">
                <FormControl fullWidth>
                  <InputLabel id="PositionLabel">Cargo</InputLabel>
                  <Select
                    disabled
                    labelId="PositionLabel"
                    id="Position"
                    name="Position"
                    value={formik.values.Position}
                  >
                    {positions?.map((position: MasterTable) => (
                      <MenuItem
                        key={position.IdMasterTable}
                        value={position.IdMasterTable}
                      >
                        {position.Name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-span-12 md:col-span-6">
                <TextField
                  color="primary"
                  className="w-full"
                  disabled
                  id="email"
                  name="email"
                  value={formik.values.email}
                  label="Correo"
                />
              </div>

              <div className="col-span-12">
                <FormControl fullWidth>
                  <InputLabel id="CompanyLabel">Empresas</InputLabel>
                  <Select
                    disabled
                    labelId="CompanyLabel"
                    id="Companies"
                    value={userCompanies}
                    input={
                      <OutlinedInput id="Companies" label="CompanyLabel" />
                    }
                    renderValue={() => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {userCompanies.map((company) => {
                          return (
                            <Chip
                              key={company?.IdCompany}
                              label={company?.Name}
                            />
                          )
                        })}
                      </Box>
                    )}
                  ></Select>
                </FormControl>
              </div>
              {/* <div className="col-span-12">
                <FormControl fullWidth>
                  <InputLabel id="RoleLabel">Empresa</InputLabel>
                  <Select
                    labelId="CompanyLabel"
                    id="IdCompany"
                    name="IdCompany"
                    value={formik.values.IdCompany}
                    disabled
                  >
                    {companies?.map((company: any) => (
                      <MenuItem
                        key={company.IdCompany}
                        value={company.IdCompany}
                      >
                        {company.Name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div> */}
            </div>
          )}
          {isLoading && (
            <>
              <div className="col-span-6">
                <h2 className="font-semibold text-xl pb-2">Ver usuario</h2>
              </div>
              <div className="col-span-6 flex justify-end">
                <Skeleton variant="circular" width={80} height={80} />
              </div>
              <div className="p-4 grid grid-cols-12 gap-4">
                <Skeleton
                  className="col-span-12 md:col-span-6"
                  height={40}
                  animation="wave"
                />
                <Skeleton
                  className="col-span-12 md:col-span-6"
                  height={40}
                  animation="wave"
                />
                <Skeleton
                  className="col-span-12 md:col-span-6"
                  height={40}
                  animation="wave"
                />
                <Skeleton
                  className="col-span-12 md:col-span-6"
                  height={40}
                  animation="wave"
                />
                <Skeleton
                  className="col-span-12 md:col-span-6"
                  height={40}
                  animation="wave"
                />
                <Skeleton
                  className="col-span-12 md:col-span-6"
                  height={40}
                  animation="wave"
                />
                <Skeleton
                  className="col-span-12 md:col-span-6"
                  height={40}
                  animation="wave"
                />
              </div>
            </>
          )}
        </div>
        <div className="pb-8 md:pb-0 col-span-12 md:col-span-3">
          <div className="bg-white grid grid-cols-2 shadow-sm p-4">
            <div className="col-span-2">
              <h4 className="text-sm text-qGray font-semibold py-2">
                RECOMENDACIONES
              </h4>
            </div>
            <div className="col-span-2 text-sm text-qBlack">
              1. El usuario solo podrá cambiar su foto de perfil en "Mis Datos".{" "}
              <br /> <br />
              2. Siempre mantener datos del usuario actualizados para envío de
              correos. <br />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
