import * as yup from "yup"
import { HiChevronLeft } from "react-icons/hi"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import {
  ConstantHttpErrors,
  ConstantLocalStorage,
  ConstantMessage,
  ConstantsMasterTable,
} from "../../../../common/constants"
import { Link, useNavigate } from "react-router-dom"
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
import { Button } from "../../../../common/components/Button/Button"
import { Modal } from "../../../../common/components/Modal/Modal"
import secureLocalStorage from "react-secure-storage"
import { CompanyService } from "../../../../common/services/CompanyService"
import { RoleService } from "../../../../common/services/RoleService"
import {
  UserCompanyRegister,
  UserEditRequest,
} from "../../../../common/interfaces/User.interface"
import { UserService } from "../../../../common/services/UserService"
import { MasterTableService } from "../../../../common/services/MasterTableService"
import { GetCompaniesResponse } from "../../../../common/interfaces/Company.interface"
import { UserCompanyService } from "../../../../common/services/UserCompanyService"
import { UserModal } from "../../../../common/components/UserModal/UserModal"

const validationSchema = yup.object({
  Dni: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Deben ser solo números")
    .min(8, "El DNI debe tener como mínimo 8 caracteres")
    .max(8, "El DNI debe tener como máximo 8 caracteres"),
  Name: yup
    .string()
    .required("Nombre es obligatorio")
    .min(3, "El Nombre debe tener como mínimo 3 caracteres"),
  PhoneNumber: yup.number().required("Celular es obligatorio"),
  IdRole: yup.string().required("Rol es obligatorio"),
  // IdCompany: yup.string().required("Empresa es obligatorio"),
  Position: yup.string().required("Cargo es obligatorio"),
})

export const UserEditContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingAction, setIsLoadingAction] = useState<boolean>(false)
  const [userData, setUserData] = useState<any>(null)
  const [companies, setCompanies] = useState<any[]>([])
  const [roles, setRoles] = useState<any[]>([])
  const [positions, setPositions] = useState<any[]>([])
  const [selectedCompanies, setSelectedCompanies] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<
    "success" | "error" | "question" | "none"
  >("none")
  const [modalMessage, setModalMessage] = useState("")
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const navigate = useNavigate()

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleCloseUserModal = () => {
    setIsUserModalOpen(false)
  }

  const handleOpenUserModal = () => {
    setIsUserModalOpen(true)
  }

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

  const handleCompanyChange = (event) => {
    setSelectedCompanies(event.target.value)
  }

  async function editUser(request: UserEditRequest) {
    setIsLoadingAction(true)

    const idUser: any = await UserService.editUser(request)
    if (idUser) {
      const { status } = await UserService.deleteUserCompany(idUser)

      if (status === ConstantHttpErrors.NO_CONTENT) {
        for (const company of selectedCompanies) {
          const request: UserCompanyRegister = {
            IdUser: idUser,
            IdCompany: company,
          }
          const { status: userCompanyStatus }: any =
            await UserService.registerUserCompany(request)

          if (userCompanyStatus !== ConstantHttpErrors.CREATED) {
            setIsLoadingAction(false)
            setIsModalOpen(true)
            setModalType("error")
            setModalMessage(ConstantMessage.SERVICE_ERROR)
          }
        }
      }

      setIsModalOpen(true)
      setModalType("success")
      setModalMessage("El usuario se actualizó satisfactoriamente")

      setIsLoadingAction(false)
      setTimeout(() => {
        navigate("/usuarios")
      }, 2000)
    } else {
      setIsLoadingAction(false)
      setIsModalOpen(true)
      setModalType("error")
      setModalMessage(ConstantMessage.SERVICE_ERROR)
    }
  }

  async function getUserCompanies(idUser: string) {
    const data = await UserCompanyService.getUserCompanies(idUser)
    if (data) {
      const onlyCompanies = data.map((item) => item.Company.IdCompany)
      setSelectedCompanies(onlyCompanies)
    }
  }

  async function getUserById(idUser: string) {
    const data = await UserService.getUserById(idUser)
    if (data) {
      setUserData(data)
    }
  }

  async function getAll(idUser: string) {
    setIsLoading(true)
    await getCompanies()
    await getRoles()
    await getPositions()
    await getUserById(idUser)
    await getUserCompanies(idUser)
    setIsLoading(false)
  }

  const formik = useFormik({
    initialValues: {
      IdUser: "",
      Dni: "",
      Name: "",
      PhoneNumber: "",
      IdRole: "",
      IdCompany: "",
      Position: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      values.IdCompany = selectedCompanies[0]
      values.IdUser = userData.IdUser
      editUser(values)
    },
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
        IdUser: userData.IdUser,
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
              <div className="col-span-12">
                <h2 className="font-semibold text-xl pb-2">Editar usuario</h2>
              </div>
              <div className="col-span-12 md:col-span-6">
                <TextField
                  color="primary"
                  className="w-full"
                  required
                  id="Dni"
                  name="Dni"
                  value={formik.values.Dni}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.Dni && Boolean(formik.errors.Dni)}
                  helperText={formik.touched.Dni && formik.errors.Dni}
                  label="Dni"
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <TextField
                  color="primary"
                  className="w-full"
                  id="Name"
                  name="Name"
                  value={formik.values.Name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.Name && Boolean(formik.errors.Name)}
                  helperText={formik.touched.Name && formik.errors.Name}
                  label="Nombre"
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <TextField
                  color="primary"
                  className="w-full"
                  type="number"
                  required
                  id="PhoneNumber"
                  name="PhoneNumber"
                  value={formik.values.PhoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.PhoneNumber &&
                    Boolean(formik.errors.PhoneNumber)
                  }
                  helperText={
                    formik.touched.PhoneNumber && formik.errors.PhoneNumber
                  }
                  label="Celular"
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <FormControl fullWidth>
                  <InputLabel id="RoleLabel">Rol</InputLabel>
                  <Select
                    labelId="RoleLabel"
                    id="IdRole"
                    name="IdRole"
                    value={formik.values.IdRole}
                    onChange={formik.handleChange}
                  >
                    {roles?.map((role: any) => (
                      <MenuItem key={role.IdRole} value={role.IdRole}>
                        {role.Name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-span-12 md:col-span-6">
                <FormControl fullWidth>
                  <InputLabel id="PositionLabel">Cargo</InputLabel>
                  <Select
                    labelId="PositionLabel"
                    id="Position"
                    name="Position"
                    value={formik.values.Position}
                    onChange={formik.handleChange}
                  >
                    {positions?.map((position: any) => (
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
                  <InputLabel id="IdCompanyLabel">Empresas</InputLabel>
                  <Select
                    labelId="IdCompanyLabel"
                    id="IdCompany"
                    multiple
                    value={selectedCompanies}
                    onChange={handleCompanyChange}
                    input={<OutlinedInput label="Compañías" />}
                    renderValue={() => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selectedCompanies.map((idCompany: string) => {
                          const company = companies.find(
                            (c: GetCompaniesResponse) =>
                              c.IdCompany === idCompany
                          )
                          return (
                            <Chip
                              key={company?.IdCompany}
                              label={company?.Name}
                            />
                          )
                        })}
                      </Box>
                    )}
                  >
                    <MenuItem disabled value="">
                      <em>Seleccione</em>
                    </MenuItem>
                    {companies.map((company: GetCompaniesResponse) => (
                      <MenuItem
                        key={company.IdCompany}
                        value={company.IdCompany}
                      >
                        {company.Name}
                      </MenuItem>
                    ))}
                  </Select>
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
                    onChange={formik.handleChange}
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
              <div className="col-span-12">
                <button
                  type="button"
                  onClick={handleOpenUserModal}
                  className="text-qBlue"
                >
                  Reestablecer correo y/o contraseña
                </button>
              </div>
            </div>
          )}
          {isLoading && (
            <>
              <div className="col-span-12">
                <h2 className="font-semibold text-xl pb-2">Editar usuario</h2>
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
        <div className="col-span-12 md:col-span-3">
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
          <div className="flex justify-center mt-8 mb-8 md:mb-0 ">
            <Button
              color="#74C947"
              label="Guardar registro"
              disabled={!formik.isValid || isLoadingAction}
              isLoading={isLoadingAction}
              type="submit"
            />
          </div>
        </div>
      </div>
      <Modal
        modalType={modalType}
        title={modalMessage}
        open={isModalOpen}
        handleClose={handleCloseModal}
      />
      <UserModal
        title="Reestablecer correo y contraseña"
        email={userData?.email}
        handleClose={handleCloseUserModal}
        open={isUserModalOpen}
      />
    </form>
  )
}
