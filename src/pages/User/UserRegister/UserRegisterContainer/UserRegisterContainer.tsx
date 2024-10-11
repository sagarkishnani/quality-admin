import * as yup from "yup"
import { HiChevronLeft } from "react-icons/hi"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import {
  ConstantHttpErrors,
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
import { CompanyService } from "../../../../common/services/CompanyService"
import { RoleService } from "../../../../common/services/RoleService"
import {
  UserCompanyRegister,
  UserLocalRegister,
  UserRegisterRequest,
} from "../../../../common/interfaces/User.interface"
import { UserService } from "../../../../common/services/UserService"
import { MasterTableService } from "../../../../common/services/MasterTableService"
import { GetCompaniesResponse } from "../../../../common/interfaces/Company.interface"
import { MasterTable } from "../../../../common/interfaces/MasterTable.interface"
import { CompanyLocal } from "../../../../common/interfaces/CompanyLocal.interface"
import { CompanyLocalService } from "../../../../common/services/CompanyLocalService"

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
  email: yup
    .string()
    .required("Correo es obligatorio")
    .email("Debe ser un correo"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener como mínimo 6 caracteres")
    .required("Contraseña es obligatoria"),
})

export const UserRegisterContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingAction, setIsLoadingAction] = useState<boolean>(false)
  const [companies, setCompanies] = useState<GetCompaniesResponse[]>([])
  const [roles, setRoles] = useState<any[]>([])
  const [positions, setPositions] = useState<MasterTable[]>([])
  const [locals, setLocals] = useState<CompanyLocal[]>([])

  const [selectedCompanies, setSelectedCompanies] = useState([])
  const [selectedLocals, setSelectedLocals] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<
    "success" | "error" | "question" | "none"
  >("none")
  const [modalMessage, setModalMessage] = useState("")
  const navigate = useNavigate()

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  async function getCompanies() {
    const data = await CompanyService.getCompanies()
    if (data) {
      setCompanies(data)
    }
  }

  async function getLocals(idCompany: string) {
    const data = await CompanyLocalService.getLocalsByIdCompany(idCompany)
    if (data) {
      setLocals(data)
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

  const handleCompanyChange = async (event) => {
    // setSelectedCompanies(event.target.value)
    formik.setFieldValue("IdCompany", event.target.value)
    setSelectedLocals([])
    await getLocals(event.target.value)
  }

  const handleLocalChange = (event) => {
    setSelectedLocals(event.target.value)
  }

  async function getAll() {
    setIsLoading(true)
    await getCompanies()
    await getRoles()
    await getPositions()
    setIsLoading(false)
  }

  async function registerUser(request: UserRegisterRequest) {
    setIsLoadingAction(true)

    const idUser: any = await UserService.registerUser(request)
    if (idUser) {
      // for (const company of selectedCompanies) {
      //   const request: UserCompanyRegister = {
      //     IdUser: idUser,
      //     IdCompany: company,
      //   }

      // for (const local of selectedLocals) {
      //   const request: UserLocalRegister = {
      //     IdUser: idUser,
      //     IdLocal: local,
      //   }

      //   const { status }: any = await UserService.registerUserLocal(request)

      //   if (status !== ConstantHttpErrors.CREATED) {
      //     setIsLoadingAction(false)
      //     setIsModalOpen(true)
      //     setModalType("error")
      //     setModalMessage(ConstantMessage.SERVICE_ERROR)
      //   }
      // }

      setIsModalOpen(true)
      setModalType("success")
      setModalMessage("El usuario se registró satisfactoriamente")

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

  const formik = useFormik({
    initialValues: {
      Dni: "",
      Name: "",
      PhoneNumber: "",
      IdRole: "",
      IdCompany: "",
      // Local: "",
      Position: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // values.IdCompany = selectedCompanies[0]
      // values.Local = selectedLocals[0]
      registerUser(values)
    },
  })

  useEffect(() => {
    getAll()
  }, [])

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
                <h2 className="font-semibold text-xl pb-2">
                  Registrar usuario
                </h2>
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
              <div className="col-span-12">
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
              </div>
              {/* <div className="col-span-12">
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
                              key={company!.IdCompany}
                              label={company!.Name}
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
              </div> */}
              {/* <div className="col-span-12">
                <FormControl fullWidth>
                  <InputLabel id="IdLocalLabel">Locales</InputLabel>
                  <Select
                    labelId="IdLocalLabel"
                    id="IdLocal"
                    multiple
                    value={selectedLocals}
                    onChange={handleLocalChange}
                    input={<OutlinedInput label="Locales" />}
                    renderValue={() => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selectedLocals.map((idLocal: string) => {
                          const local = locals.find(
                            (c: CompanyLocal) => c.IdCompanyLocal === idLocal
                          )
                          return (
                            <Chip
                              key={local?.IdCompanyLocal}
                              label={local?.Name}
                            />
                          )
                        })}
                      </Box>
                    )}
                  >
                    <MenuItem disabled value="">
                      <em>Seleccione</em>
                    </MenuItem>
                    {locals.map((local: CompanyLocal) => (
                      <MenuItem
                        key={local.IdCompanyLocal}
                        value={local.IdCompanyLocal}
                      >
                        {local.Name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div> */}
              <div className="col-span-12">
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
                  required
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  label="Correo"
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <TextField
                  color="primary"
                  className="w-full"
                  type="password"
                  required
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  label="Contraseña"
                />
              </div>
            </div>
          )}
          {isLoading && (
            <>
              <div className="col-span-12">
                <h2 className="font-semibold text-xl pb-2">
                  Registrar usuario
                </h2>
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
          <div className="flex justify-center mt-8 mb-8 md:mb-0">
            <Button
              color="#74C947"
              label="Guardar registro"
              disabled={isLoadingAction}
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
    </form>
  )
}
