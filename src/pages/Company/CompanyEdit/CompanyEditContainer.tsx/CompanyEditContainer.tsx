import { useFormik } from "formik"
import { MasterTableService } from "../../../../common/services/MasterTableService"
import {
  Autocomplete,
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
  TextField,
} from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { HiChevronLeft, HiOutlineUserAdd, HiOutlineX } from "react-icons/hi"
import { useEffect, useState } from "react"
import {
  ConstantCompanyMessage,
  ConstantHttpErrors,
  ConstantLocalStorage,
  ConstantMessage,
  ConstantsMasterTable,
} from "../../../../common/constants"
import * as yup from "yup"
import secureLocalStorage from "react-secure-storage"
import { UbigeoService } from "../../../../common/services/UbigeoService"
import { CompanyService } from "../../../../common/services/CompanyService"
import { MasterTable } from "../../../../common/interfaces/MasterTable.interface"
import unknownUser from "../../../../assets/images/user/unknown.png"
import { Modal } from "../../../../common/components/Modal/Modal"
import { CompanyEditRequest } from "../../../../common/interfaces/Company.interface"
import { Button } from "../../../../common/components/Button/Button"
import { CompanyLocalService } from "../../../../common/services/CompanyLocalService"
import { CompanyLocalRegisterRequest } from "../../../../common/interfaces/CompanyLocal.interface"

const validationSchema = yup.object({
  Name: yup.string().required("Nombre de empresa es obligatorio"),
  Ruc: yup
    .string()
    .min(11, "El RUC debe tener como mínimo 11 caracteres")
    .max(11, "El RUC debe tener como máximo 11 caracteres")
    .required("RUC es obligatorio"),
  Address: yup
    .string()
    .min(8, "La dirección debe tener como mínimo 8 caracteres")
    .required("Dirección es obligatoria"),
  // ImageUrl: yup.string().required("Debe seleccionar una imagen"),
  Local: yup.string().required("Local es obligatorio"),
  MainContactName: yup
    .string()
    .required("Nombre de contacto principal es obligatorio"),
  MainContactPosition: yup
    .string()
    .required("Cargo de contacto principal es obligatorio"),
  MainContactEmail: yup
    .string()
    .email("Debe ser un correo")
    .required("Email de contacto principal es obligatorio"),
  MainContactPhone: yup
    .number()
    .required("Celular de contacto principal es obligatorio"),
  MainContactCE: yup
    .string()
    .required("CE de contacto principal es obligatorio"),
  // MainContactCurrency: yup
  //   .string()
  //   .required("Moneda de contacto principal es obligatoria"),
  MainContactAlias: yup
    .string()
    .required("Alias de contacto principal es obligatorio"),
  // MainContactBanks: yup
  //   .string()
  //   .required("Banco de contacto principal es obligatorio"),
})

export const CompanyEditContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingAction, setIsLoadingAction] = useState<boolean>(false)
  const [company, setCompany] = useState<any>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<
    "success" | "error" | "question" | "none"
  >("none")
  const [modalMessage, setModalMessage] = useState("")
  const [ubigeo, setUbigeo] = useState<any>()
  const [ubigeos, setUbigeos] = useState<any>([])
  const [currencies, setCurrencies] = useState<MasterTable[]>([])
  const [positions, setPositions] = useState<MasterTable[]>([])
  const [banks, setBanks] = useState<MasterTable[]>([])
  const [selectedCurrencies, setSelectedCurrencies] = useState<MasterTable[]>(
    []
  )
  const [paymentConditions, setPaymentConditions] = useState<MasterTable[]>([])
  const [ce, setCe] = useState<MasterTable[]>([])
  const [selectedBanks, setSelectedBanks] = useState([])
  const [locals, setLocals] = useState<any[]>([])

  const [showBillingFields, setShowBillingFields] = useState(false)
  const [showReportFields, setShowReportFields] = useState(false)
  const [showPurchaseFields, setShowPurchaseFields] = useState(false)
  const [showWarehouseFields, setShowWarehouseFields] = useState(false)
  const [showAfterSalesFields, setShowAfterSalesFields] = useState(false)

  const navigate = useNavigate()

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleCurrencyChange = (event) => {
    setSelectedCurrencies(event.target.value)
  }

  const handleBankChange = (event) => {
    setSelectedBanks(event.target.value)
  }

  async function getAll(idCompany: string) {
    setIsLoading(true)
    await getCompanyById(idCompany)
    await getUbigeos()
    await getPositions()
    await getPaymentConditions()
    await getCE()
    setIsLoading(false)
  }

  async function getCompanyById(idCompany: string) {
    const data = await CompanyService.getCompanyById(idCompany)
    if (data) {
      setCompany(data)

      if (data) {
        await getCurrencies(data?.MainContactCurrency.split(", "))
        await getBanks(data?.MainContactBanks.split(", "))
        await getLocals(data?.IdCompany)
      }

      getUbigeo(data.Ubigeo)
    }
  }

  async function getUbigeos() {
    const data = await UbigeoService.getUbigeo()
    if (data) {
      setUbigeos(data)
    }
  }

  async function getUbigeo(idUbigeo: number) {
    const data = await UbigeoService.getUbigeoById(idUbigeo)
    if (data) {
      setUbigeo(data)
    }
  }

  async function getLocalUbigeo(idUbigeo: number) {
    return await UbigeoService.getUbigeoById(idUbigeo)
  }

  async function getPositions() {
    const data = await MasterTableService.getMasterTableByIdParent(
      ConstantsMasterTable.POSITIONS
    )
    if (data) {
      setPositions(data)
    }
  }

  async function getLocals(idCompany: string) {
    const data = await CompanyLocalService.getLocalsByIdCompany(idCompany)
    if (data) {
      for (const local of data) {
        const ubigeo = await getLocalUbigeo(local.Ubigeo)
        local.Ubigeo = ubigeo
      }
      setLocals(data)
    }
  }

  async function getCurrencies(currenciesStr: string[]) {
    const data = await MasterTableService.getMasterTableByIdParent(
      ConstantsMasterTable.CURRENCIES
    )
    if (data) {
      const filteredCurrencies = data
        .filter(({ IdMasterTable }) => currenciesStr.includes(IdMasterTable))
        .map(({ IdMasterTable }) => IdMasterTable)

      setCurrencies(data)
      setSelectedCurrencies(filteredCurrencies)
    }
  }

  async function getPaymentConditions() {
    const data = await MasterTableService.getMasterTableByIdParent(
      ConstantsMasterTable.PAYMENT_CONDITIONS
    )
    if (data) {
      setPaymentConditions(data)
    }
  }

  async function getCE() {
    const data = await MasterTableService.getMasterTableByIdParent(
      ConstantsMasterTable.CE
    )
    if (data) {
      setCe(data)
    }
  }

  async function getBanks(banksStr: string[]) {
    const data = await MasterTableService.getMasterTableByIdParent(
      ConstantsMasterTable.BANKS
    )

    if (data) {
      const filteredBanks = data
        .filter(({ IdMasterTable }) => banksStr.includes(IdMasterTable))
        .map(({ IdMasterTable }) => IdMasterTable)

      setBanks(data)
      setSelectedBanks(filteredBanks)
    }
  }

  async function registerLocal(request: CompanyLocalRegisterRequest) {
    const { data, status }: any = await CompanyLocalService.registerLocal(
      request
    )

    return { data, status }
  }

  async function deleteLocal(idCompany: string) {
    const { data, status }: any =
      await CompanyLocalService.deleteLocalByCompany(idCompany)
    return { data, status }
  }

  const handleAddGroup = () => {
    setLocals([...locals, { Name: "", Ubigeo: "", Address: "", Mails: "" }])
  }

  const handleRemoveGroup = (index) => {
    const updatedGroups = locals.filter((_, groupIndex) => groupIndex !== index)
    setLocals(updatedGroups)
  }

  const handleChange = (index, field, value) => {
    const updatedGroups = locals.map((group, groupIndex) =>
      groupIndex === index ? { ...group, [field]: value } : group
    )
    setLocals(updatedGroups)
  }

  async function editCompany(request: CompanyEditRequest) {
    setIsLoadingAction(true)
    const { data, status }: any = await CompanyService.editCompany(
      company.IdCompany,
      request
    )
    await deleteLocal(company.IdCompany)

    for (const element of locals) {
      const req: CompanyLocalRegisterRequest = {
        IdCompany: data[0].IdCompany,
        Name: element.Name,
        Address: element.Address,
        Mails: element.Mails,
        Ubigeo: element.Ubigeo.id_ubigeo,
      }

      await registerLocal(req)
    }

    if (status == ConstantHttpErrors.OK) {
      setIsModalOpen(true)
      setModalType("success")
      setModalMessage(ConstantCompanyMessage.COMPANY_EDIT_SUCCESS)

      setIsLoadingAction(false)
      setTimeout(() => {
        navigate("/empresas")
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
      Name: "",
      Ruc: "",
      Ubigeo: "",
      Address: "",
      ImgUrl: "",
      Local: "",
      Mails: "",
      RequiresOrder: false,
      MainContactName: "",
      MainContactPosition: "",
      MainContactEmail: "",
      MainContactPhone: "",
      MainContactPayment: "",
      MainContactCE: "",
      MainContactCurrency: "",
      MainContactAlias: "",
      MainContactBanks: "",
      MainContactEmailInvoice: "",
      MainContactEmailInvoice2: "",
      BillingContactName: "",
      BillingContactPosition: "",
      BillingContactEmail: "",
      BillingContactPhone: "",
      BillingContactCellphone: "",
      ReportContactName: "",
      ReportContactPosition: "",
      ReportContactEmail: "",
      ReportContactPhone: "",
      ReportContactCellphone: "",
      PurchaseContactName: "",
      PurchaseContactPosition: "",
      PurchaseContactEmail: "",
      PurchaseContactPhone: "",
      PurchaseContactCellphone: "",
      WarehouseContactName: "",
      WarehouseContactPosition: "",
      WarehouseContactEmail: "",
      WarehouseContactPhone: "",
      WarehouseContactCellphone: "",
      AfterSalesContactName: "",
      AfterSalesContactPosition: "",
      AfterSalesContactEmail: "",
      AfterSalesContactPhone: "",
      AfterSalesContactCellphone: "",
    },
    onSubmit: (values) => {
      values.Ubigeo = values.Ubigeo.id_ubigeo
      values.MainContactCurrency = selectedCurrencies.join(", ")
      values.MainContactBanks = selectedBanks.join(", ")
      editCompany(values)
    },
  })

  useEffect(() => {
    const idCompany = secureLocalStorage.getItem(
      ConstantLocalStorage.ID_COMPANY
    )
    if (idCompany !== null) {
      getAll(idCompany)
    }
  }, [])

  useEffect(() => {
    if (company && ubigeo) {
      formik.setValues({
        Name: company?.Name || "",
        Ruc: company?.Ruc || "",
        Ubigeo: ubigeo || "",
        Address: company?.Address || "",
        ImgUrl: company?.ImgUrl || "",
        Local: company?.Local || "",
        Mails: company?.Mails || "",
        RequiresOrder: company?.RequiresOrder || false,
        MainContactName: company?.MainContactName || "",
        MainContactPosition: company?.MainContactPosition || "",
        MainContactEmail: company?.MainContactEmail || "",
        MainContactPhone: company?.MainContactPhone || "",
        MainContactPayment: company?.MainContactPayment || "",
        MainContactCE: company?.MainContactCE || "",
        MainContactCurrency: company?.MainContactCurrency || "",
        MainContactAlias: company?.MainContactAlias || "",
        MainContactBanks: company?.MainContactBanks || "",
        MainContactEmailInvoice: company?.MainContactEmailInvoice || "",
        MainContactEmailInvoice2: company?.MainContactEmailInvoice2 || "",
        BillingContactName: company?.BillingContactName || "",
        BillingContactPosition: company?.BillingContactPosition || "",
        BillingContactEmail: company?.BillingContactEmail || "",
        BillingContactPhone: company?.BillingContactPhone || "",
        BillingContactCellphone: company?.BillingContactCellphone || "",
        ReportContactName: company?.ReportContactName || "",
        ReportContactPosition: company?.ReportContactPosition || "",
        ReportContactEmail: company?.ReportContactEmail || "",
        ReportContactPhone: company?.ReportContactPhone || "",
        ReportContactCellphone: company?.ReportContactCellphone || "",
        PurchaseContactName: company?.PurchaseContactName || "",
        PurchaseContactPosition: company?.PurchaseContactPosition || "",
        PurchaseContactEmail: company?.PurchaseContactEmail || "",
        PurchaseContactPhone: company?.PurchaseContactPhone || "",
        PurchaseContactCellphone: company?.PurchaseContactCellphone || "",
        WarehouseContactName: company?.WarehouseContactName || "",
        WarehouseContactPosition: company?.WarehouseContactPosition || "",
        WarehouseContactEmail: company?.WarehouseContactEmail || "",
        WarehouseContactPhone: company?.WarehouseContactPhone || "",
        WarehouseContactCellphone: company?.WarehouseContactCellphone || "",
        AfterSalesContactName: company?.AfterSalesContactName || "",
        AfterSalesContactPosition: company?.AfterSalesContactPosition || "",
        AfterSalesContactEmail: company?.AfterSalesContactEmail || "",
        AfterSalesContactPhone: company?.AfterSalesContactPhone || "",
        AfterSalesContactCellphone: company?.AfterSalesContactCellphone || "",
      })

      if (company?.BillingContactName !== "") setShowBillingFields(true)
      if (company?.ReportContactName !== "") setShowReportFields(true)
      if (company?.PurchaseContactName !== "") setShowPurchaseFields(true)
      if (company?.WarehouseContactName !== "") setShowWarehouseFields(true)
      if (company?.AfterSalesContactName !== "") setShowAfterSalesFields(true)
    }
  }, [company, ubigeo])

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <div className="py-5 px-4 md:px-8 bg-qLightGray grid grid-cols-12 gap-4 h-full">
        <div className="col-span-1 w-8 h-8 rounded-full bg-white justify-center items-center">
          <Link to={"/empresas"}>
            <HiChevronLeft size={"32"} />
          </Link>
        </div>
        <div className="bg-white col-span-12 md:col-span-8 shadow-sm p-6">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <h2 className="font-semibold text-xl pb-2">Editar empresa</h2>
            </div>
            <div className="col-span-6 flex items-center">
              <h4 className="text-sm text-qGray font-semibold pb-2">
                DATOS DE LA EMPRESA
              </h4>
            </div>
            <div className="col-span-6 flex items-center justify-end">
              <div className="w-20 h-20 rounded-full bg-qBlue">
                <img
                  className=" rounded-full w-full h-full object-cover"
                  src={company?.ImgUrl == null ? unknownUser : company?.ImgUrl}
                  alt="perfil"
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-8">
              <TextField
                color="primary"
                className="w-full"
                required
                id="Name"
                name="Name"
                value={formik.values.Name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Name && Boolean(formik.errors.Name)}
                helperText={formik.touched.Name && formik.errors.Name}
                label="Nombre de empresa"
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <TextField
                className="w-full"
                required
                id="Ruc"
                name="Ruc"
                value={formik.values.Ruc}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Ruc && Boolean(formik.errors.Ruc)}
                helperText={formik.touched.Ruc && formik.errors.Ruc}
                label="RUC"
              />
            </div>
            <div className="col-span-12">
              <Autocomplete
                className="w-full"
                disablePortal
                options={ubigeos}
                onChange={(event, newValue) => {
                  if (newValue) {
                    if (typeof newValue === "string") {
                      formik.setFieldValue("Ubigeo", newValue)
                    } else {
                      formik.setFieldValue("Ubigeo", newValue)
                    }
                  } else {
                    formik.setFieldValue("Ubigeo", "")
                  }
                }}
                value={formik.values.Ubigeo}
                filterOptions={(options, { inputValue }) =>
                  options
                    .filter(
                      (item: any) =>
                        item?.departamento
                          .toLowerCase()
                          .includes(inputValue.toLowerCase()) ||
                        item?.provincia
                          .toLowerCase()
                          .includes(inputValue.toLowerCase()) ||
                        item?.distrito
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())
                    )
                    .slice(0, 25)
                }
                getOptionLabel={(option: any) =>
                  option?.departamento
                    ? `${option?.departamento} - ${option?.provincia} - ${option?.distrito}`
                    : ""
                }
                renderInput={(params) => (
                  <TextField
                    name="Ubigeo"
                    required
                    {...params}
                    label="Departamento - Provincia - Distrito"
                  />
                )}
                openText="Mostrar opciones"
                noOptionsText="No hay opciones"
              />
            </div>
            <div className="col-span-12">
              <TextField
                className="w-full"
                required
                id="Address"
                name="Address"
                label="Dirección fiscal"
                value={formik.values.Address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Address && Boolean(formik.errors.Address)}
                helperText={formik.touched.Address && formik.errors.Address}
              />
            </div>
            {/* <div className="col-span-12">
              <TextField
                className="w-full"
                required
                id="Local"
                name="Local"
                label="Nombre de local"
                value={formik.values.Local}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Local && Boolean(formik.errors.Local)}
                helperText={formik.touched.Local && formik.errors.Local}
              />
            </div> */}
            {/* <div className="col-span-12 md:col-span-8">
              <TextField
                color="primary"
                className="w-full"
                required
                id="Mails"
                name="Mails"
                value={formik.values.Mails}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Mails && Boolean(formik.errors.Mails)}
                helperText={formik.touched.Mails && formik.errors.Mails}
                label="Correos (separados por comas)"
              />
            </div> */}
            <div className="col-span-12 md:col-span-4">
              <FormControlLabel
                name="RequiresOrder"
                id="RequiresOrder"
                value={formik.values.RequiresOrder}
                onChange={formik.handleChange}
                control={<Switch checked={formik.values.RequiresOrder} />}
                label="Requiere orden de compra"
              />
            </div>
            <div className="col-span-12">
              <h4 className="text-sm text-qGray font-semibold pb-2">
                DATOS DE LOCALES
              </h4>
            </div>
            {locals.map((group, groupIndex) => (
              <div
                key={groupIndex}
                className="col-span-12 grid grid-cols-12 gap-4 mb-4"
              >
                <div className="col-span-6">
                  <TextField
                    className="w-full"
                    required
                    id={`Name-${groupIndex}`}
                    name={`Name-${groupIndex}`}
                    label="Nombre de local"
                    value={group.Name}
                    onChange={(e) =>
                      handleChange(groupIndex, "Name", e.target.value)
                    }
                    onBlur={formik.handleBlur}
                    error={formik.touched.Name && Boolean(formik.errors.Name)}
                    helperText={formik.touched.Name && formik.errors.Name}
                  />
                </div>
                <div className="col-span-6">
                  <TextField
                    className="w-full"
                    required
                    id={`Address-${groupIndex}`}
                    name={`Address-${groupIndex}`}
                    label="Dirección Fiscal"
                    value={group.Address}
                    onChange={(e) =>
                      handleChange(groupIndex, "Address", e.target.value)
                    }
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.Address && Boolean(formik.errors.Address)
                    }
                    helperText={formik.touched.Address && formik.errors.Address}
                  />
                </div>
                <div className="col-span-6">
                  <Autocomplete
                    className="w-full"
                    disablePortal
                    options={ubigeos}
                    onChange={(event, newValue) => {
                      handleChange(
                        groupIndex,
                        "Ubigeo",
                        newValue ? newValue : ""
                      )
                    }}
                    value={
                      ubigeos.find(
                        (option) =>
                          option.departamento === group.Ubigeo.departamento &&
                          option.provincia === group.Ubigeo.provincia &&
                          option.distrito === group.Ubigeo.distrito
                      ) || null
                    }
                    filterOptions={(options, { inputValue }) =>
                      options
                        .filter(
                          (item) =>
                            item.departamento
                              .toLowerCase()
                              .includes(inputValue.toLowerCase()) ||
                            item.provincia
                              .toLowerCase()
                              .includes(inputValue.toLowerCase()) ||
                            item.distrito
                              .toLowerCase()
                              .includes(inputValue.toLowerCase())
                        )
                        .slice(0, 25)
                    }
                    getOptionLabel={(option) =>
                      option?.departamento
                        ? `${option.departamento} - ${option.provincia} - ${option.distrito}`
                        : ""
                    }
                    renderInput={(params) => (
                      <TextField
                        name={`Ubigeo-${groupIndex}`}
                        {...params}
                        label="Departamento - Provincia - Distrito"
                      />
                    )}
                    openText="Mostrar opciones"
                    noOptionsText="No hay opciones"
                  />
                </div>
                <div className="col-span-6">
                  <TextField
                    className="w-full"
                    required
                    id={`Mails-${groupIndex}`}
                    name={`Mails-${groupIndex}`}
                    label="Correos (separados por comas)"
                    value={group.Mails}
                    onChange={(e) =>
                      handleChange(groupIndex, "Mails", e.target.value)
                    }
                    onBlur={formik.handleBlur}
                    error={formik.touched.Mails && Boolean(formik.errors.Mails)}
                    helperText={formik.touched.Mails && formik.errors.Mails}
                  />
                </div>
                <div className="text-left col-span-12">
                  {locals.length > 1 && (
                    <>
                      <HiOutlineX
                        color="#C94F47"
                        className="inline cursor-pointer"
                        size={"24"}
                        onClick={() => handleRemoveGroup(groupIndex)}
                      />
                    </>
                  )}
                </div>
              </div>
            ))}
            <div
              className="text-right col-span-12 cursor-pointer"
              onClick={handleAddGroup}
            >
              <HiOutlineUserAdd
                color="#00A0DF"
                className="inline"
                size={"24"}
              />
              <div className="text-qBlue">Agregar local</div>
            </div>
            <div className="col-span-12">
              <h4 className="text-sm text-qGray font-semibold py-2">
                CONTACTO PRINCIPAL
              </h4>
            </div>
            <div className="col-span-12 md:col-span-6">
              <TextField
                className="w-full"
                required
                id="MainContactName"
                name="MainContactName"
                label="Contacto principal"
                value={formik.values.MainContactName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.MainContactName &&
                  Boolean(formik.errors.MainContactName)
                }
                helperText={
                  formik.touched.MainContactName &&
                  formik.errors.MainContactName
                }
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <FormControl fullWidth>
                <InputLabel id="MainContactPositionLabel">
                  Cargo contacto principal
                </InputLabel>
                <Select
                  labelId="MainContactPositionLabel"
                  id="MainContactPosition"
                  name="MainContactPosition"
                  value={formik.values.MainContactPosition}
                  onChange={formik.handleChange}
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
                className="w-full"
                required
                id="MainContactEmail"
                name="MainContactEmail"
                label="Email Contacto principal"
                value={formik.values.MainContactEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.MainContactEmail &&
                  Boolean(formik.errors.MainContactEmail)
                }
                helperText={
                  formik.touched.MainContactEmail &&
                  formik.errors.MainContactEmail
                }
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <TextField
                className="w-full"
                required
                id="MainContactPhone"
                name="MainContactPhone"
                label="Celular contacto principal"
                type="number"
                value={formik.values.MainContactPhone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.MainContactPhone &&
                  Boolean(formik.errors.MainContactPhone)
                }
                helperText={
                  formik.touched.MainContactPhone &&
                  formik.errors.MainContactPhone
                }
              />
            </div>
            <div className="col-span-6 md:col-span-3">
              <FormControl fullWidth>
                <InputLabel id="MainContactPaymentLabel">Cond. Pago</InputLabel>
                <Select
                  labelId="MainContactPaymentLabel"
                  id="MainContactPayment"
                  name="MainContactPayment"
                  value={formik.values.MainContactPayment}
                  onChange={formik.handleChange}
                >
                  {paymentConditions?.map((paymentCondition: MasterTable) => (
                    <MenuItem
                      key={paymentCondition.IdMasterTable}
                      value={paymentCondition.IdMasterTable}
                    >
                      {paymentCondition.Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col-span-6 md:col-span-3">
              <FormControl fullWidth>
                <InputLabel id="MainContactCELabel">CE</InputLabel>
                <Select
                  labelId="MainContactCELabel"
                  id="MainContactCE"
                  name="MainContactCE"
                  value={formik.values.MainContactCE}
                  onChange={formik.handleChange}
                >
                  {ce?.map((ce: MasterTable) => (
                    <MenuItem key={ce.IdMasterTable} value={ce.IdMasterTable}>
                      {ce.Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col-span-12 md:col-span-3">
              <FormControl fullWidth>
                <InputLabel id="MainContactCurrencyLabel">Moneda</InputLabel>
                <Select
                  labelId="MainContactCurrencyLabel"
                  id="MainContactCurrency"
                  multiple
                  value={selectedCurrencies}
                  onChange={handleCurrencyChange}
                  input={
                    <OutlinedInput id="MainContactCurrency" label="Moneda" />
                  }
                  renderValue={() => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selectedCurrencies.map((currencyId: string) => {
                        const currency = currencies.find(
                          (c: MasterTable) => c.IdMasterTable === currencyId
                        )
                        return (
                          <Chip
                            key={currency?.IdMasterTable}
                            label={currency?.Name}
                          />
                        )
                      })}
                    </Box>
                  )}
                >
                  <MenuItem disabled value="">
                    <em>Seleccione</em>
                  </MenuItem>
                  {currencies.map((currency: MasterTable) => (
                    <MenuItem
                      key={currency?.IdMasterTable}
                      value={currency?.IdMasterTable}
                    >
                      {currency.Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col-span-12 md:col-span-3">
              <TextField
                className="w-full"
                id="MainContactAlias"
                name="MainContactAlias"
                label="Empresa (Alias)"
                value={formik.values.MainContactAlias}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.MainContactAlias &&
                  Boolean(formik.errors.MainContactAlias)
                }
                helperText={
                  formik.touched.MainContactAlias &&
                  formik.errors.MainContactAlias
                }
              />
            </div>
            <div className="col-span-12">
              <FormControl fullWidth>
                <InputLabel id="MainContactBanksLabel">Banco</InputLabel>
                <Select
                  labelId="MainContactBanksLabel"
                  id="MainContactBanks"
                  multiple
                  value={selectedBanks}
                  onChange={handleBankChange}
                  input={
                    <OutlinedInput id="MainContactCurrency" label="Moneda" />
                  }
                  renderValue={() => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selectedBanks.map((bankId: string) => {
                        const bank = banks.find(
                          (c: MasterTable) => c.IdMasterTable === bankId
                        )
                        return (
                          <Chip key={bank?.IdMasterTable} label={bank?.Name} />
                        )
                      })}
                    </Box>
                  )}
                >
                  <MenuItem disabled value="">
                    <em>Seleccione</em>
                  </MenuItem>
                  {banks.map((bank: MasterTable) => (
                    <MenuItem
                      key={bank?.IdMasterTable}
                      value={bank?.IdMasterTable}
                    >
                      {bank.Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col-span-12">
              <TextField
                className="w-full"
                id="MainContactEmailInvoice"
                name="MainContactEmailInvoice"
                label="Email Factura electrónica 1 (Opcional)"
                value={formik.values.MainContactEmailInvoice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.MainContactEmailInvoice &&
                  Boolean(formik.errors.MainContactEmailInvoice)
                }
                helperText={
                  formik.touched.MainContactEmailInvoice &&
                  formik.errors.MainContactEmailInvoice
                }
              />
            </div>
            <div className="col-span-12">
              <TextField
                className="w-full"
                id="MainContactEmailInvoice2"
                name="MainContactEmailInvoice2"
                label="C.E. Factura electrónica 2 (Opcional)"
                value={formik.values.MainContactEmailInvoice2}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.MainContactEmailInvoice2 &&
                  Boolean(formik.errors.MainContactEmailInvoice2)
                }
                helperText={
                  formik.touched.MainContactEmailInvoice2 &&
                  formik.errors.MainContactEmailInvoice2
                }
              />
            </div>
            {/* Contacto cobranza */}
            {showBillingFields && (
              <>
                <div className="col-span-12">
                  <h4 className="text-sm text-qGray font-semibold py-2">
                    CONTACTO COBRANZA
                  </h4>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    className="w-full"
                    id="BillingContactName"
                    name="BillingContactName"
                    label="Contacto cobranza"
                    value={formik.values.BillingContactName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.BillingContactName &&
                      Boolean(formik.errors.BillingContactName)
                    }
                    helperText={
                      formik.touched.BillingContactName &&
                      formik.errors.BillingContactName
                    }
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <FormControl fullWidth>
                    <InputLabel id="BillingContactPositionLabel">
                      Cargo contacto cobranza
                    </InputLabel>
                    <Select
                      labelId="BillingContactPositionLabel"
                      id="BillingContactPosition"
                      name="BillingContactPosition"
                      value={formik.values.BillingContactPosition}
                      onChange={formik.handleChange}
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
                    className="w-full"
                    id="BillingContactEmail"
                    name="BillingContactEmail"
                    label="Email Contacto cobranza"
                    value={formik.values.BillingContactEmail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.BillingContactEmail &&
                      Boolean(formik.errors.BillingContactEmail)
                    }
                    helperText={
                      formik.touched.BillingContactEmail &&
                      formik.errors.BillingContactEmail
                    }
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    className="w-full"
                    id="BillingContactPhone"
                    name="BillingContactPhone"
                    label="Teléfono contacto cobranza"
                    type="number"
                    value={formik.values.BillingContactPhone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.BillingContactPhone &&
                      Boolean(formik.errors.BillingContactPhone)
                    }
                    helperText={
                      formik.touched.BillingContactPhone &&
                      formik.errors.BillingContactPhone
                    }
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    className="w-full"
                    id="BillingContactCellphone"
                    name="BillingContactCellphone"
                    label="Celular contacto cobranza"
                    type="number"
                    value={formik.values.BillingContactCellphone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.BillingContactCellphone &&
                      Boolean(formik.errors.BillingContactCellphone)
                    }
                    helperText={
                      formik.touched.BillingContactCellphone &&
                      formik.errors.BillingContactCellphone
                    }
                  />
                </div>
              </>
            )}
            {/* Contacto informe */}
            {showReportFields && (
              <>
                <div className="col-span-12">
                  <h4 className="text-sm text-qGray font-semibold py-2">
                    CONTACTO INFORME
                  </h4>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    className="w-full"
                    id="ReportContactName"
                    name="ReportContactName"
                    label="Contacto informe"
                    value={formik.values.ReportContactName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.ReportContactName &&
                      Boolean(formik.errors.ReportContactName)
                    }
                    helperText={
                      formik.touched.ReportContactName &&
                      formik.errors.ReportContactName
                    }
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <FormControl fullWidth>
                    <InputLabel id="ReportContactPositionLabel">
                      Cargo contacto informe
                    </InputLabel>
                    <Select
                      labelId="ReportContactPositionLabel"
                      id="ReportContactPosition"
                      name="ReportContactPosition"
                      value={formik.values.ReportContactPosition}
                      onChange={formik.handleChange}
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
                    className="w-full"
                    id="ReportContactEmail"
                    name="ReportContactEmail"
                    label="Email Contacto informe"
                    value={formik.values.ReportContactEmail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.ReportContactEmail &&
                      Boolean(formik.errors.ReportContactEmail)
                    }
                    helperText={
                      formik.touched.ReportContactEmail &&
                      formik.errors.ReportContactEmail
                    }
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    className="w-full"
                    id="ReportContactPhone"
                    name="ReportContactPhone"
                    label="Teléfono contacto informe"
                    type="number"
                    value={formik.values.ReportContactPhone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.ReportContactPhone &&
                      Boolean(formik.errors.ReportContactPhone)
                    }
                    helperText={
                      formik.touched.ReportContactPhone &&
                      formik.errors.ReportContactPhone
                    }
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    className="w-full"
                    id="ReportContactCellphone"
                    name="ReportContactCellphone"
                    label="Celular contacto informe"
                    type="number"
                    value={formik.values.ReportContactCellphone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.ReportContactCellphone &&
                      Boolean(formik.errors.ReportContactCellphone)
                    }
                    helperText={
                      formik.touched.ReportContactCellphone &&
                      formik.errors.ReportContactCellphone
                    }
                  />
                </div>
              </>
            )}
            {/* Contacto compras */}
            {showPurchaseFields && (
              <>
                <div className="col-span-12">
                  <h4 className="text-sm text-qGray font-semibold py-2">
                    CONTACTO COMPRAS
                  </h4>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    className="w-full"
                    id="PurchaseContactName"
                    name="PurchaseContactName"
                    label="Contacto compras"
                    value={formik.values.PurchaseContactName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.PurchaseContactName &&
                      Boolean(formik.errors.PurchaseContactName)
                    }
                    helperText={
                      formik.touched.PurchaseContactName &&
                      formik.errors.PurchaseContactName
                    }
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <FormControl fullWidth>
                    <InputLabel id="PurchaseContactPositionLabel">
                      Cargo contacto compras
                    </InputLabel>
                    <Select
                      labelId="PurchaseContactPositionLabel"
                      id="PurchaseContactPosition"
                      name="PurchaseContactPosition"
                      value={formik.values.PurchaseContactPosition}
                      onChange={formik.handleChange}
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
                    className="w-full"
                    id="PurchaseContactEmail"
                    name="PurchaseContactEmail"
                    label="Email Contacto compras"
                    value={formik.values.PurchaseContactEmail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.PurchaseContactEmail &&
                      Boolean(formik.errors.PurchaseContactEmail)
                    }
                    helperText={
                      formik.touched.PurchaseContactEmail &&
                      formik.errors.PurchaseContactEmail
                    }
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    className="w-full"
                    id="PurchaseContactPhone"
                    name="PurchaseContactPhone"
                    label="Teléfono contacto compras"
                    type="number"
                    value={formik.values.PurchaseContactPhone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.PurchaseContactPhone &&
                      Boolean(formik.errors.PurchaseContactPhone)
                    }
                    helperText={
                      formik.touched.PurchaseContactPhone &&
                      formik.errors.PurchaseContactPhone
                    }
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    className="w-full"
                    id="PurchaseContactCellphone"
                    name="PurchaseContactCellphone"
                    label="Celular contacto compras"
                    type="number"
                    value={formik.values.PurchaseContactCellphone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.PurchaseContactCellphone &&
                      Boolean(formik.errors.PurchaseContactCellphone)
                    }
                    helperText={
                      formik.touched.PurchaseContactCellphone &&
                      formik.errors.PurchaseContactCellphone
                    }
                  />
                </div>
              </>
            )}
            {/* Contacto almacén */}
            {showWarehouseFields && (
              <>
                <div className="col-span-12">
                  <h4 className="text-sm text-qGray font-semibold py-2">
                    CONTACTO ALMACÉN
                  </h4>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    className="w-full"
                    id="WarehouseContactName"
                    name="WarehouseContactName"
                    label="Contacto almacén"
                    value={formik.values.WarehouseContactName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.WarehouseContactName &&
                      Boolean(formik.errors.WarehouseContactName)
                    }
                    helperText={
                      formik.touched.WarehouseContactName &&
                      formik.errors.WarehouseContactName
                    }
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <FormControl fullWidth>
                    <InputLabel id="WarehouseContactPositionLabel">
                      Cargo contacto almacén
                    </InputLabel>
                    <Select
                      labelId="WarehouseContactPositionLabel"
                      id="WarehouseContactPosition"
                      name="WarehouseContactPosition"
                      value={formik.values.WarehouseContactPosition}
                      onChange={formik.handleChange}
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
                    className="w-full"
                    id="WarehouseContactEmail"
                    name="WarehouseContactEmail"
                    label="Email Contacto almacén"
                    value={formik.values.WarehouseContactEmail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.WarehouseContactEmail &&
                      Boolean(formik.errors.WarehouseContactEmail)
                    }
                    helperText={
                      formik.touched.WarehouseContactEmail &&
                      formik.errors.WarehouseContactEmail
                    }
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    className="w-full"
                    id="WarehouseContactPhone"
                    name="WarehouseContactPhone"
                    label="Teléfono contacto almacén"
                    type="number"
                    value={formik.values.WarehouseContactPhone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.WarehouseContactPhone &&
                      Boolean(formik.errors.WarehouseContactPhone)
                    }
                    helperText={
                      formik.touched.WarehouseContactPhone &&
                      formik.errors.WarehouseContactPhone
                    }
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    className="w-full"
                    id="WarehouseContactCellphone"
                    name="WarehouseContactCellphone"
                    label="Celular contacto almacén"
                    type="number"
                    value={formik.values.WarehouseContactCellphone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.WarehouseContactCellphone &&
                      Boolean(formik.errors.WarehouseContactCellphone)
                    }
                    helperText={
                      formik.touched.WarehouseContactCellphone &&
                      formik.errors.WarehouseContactCellphone
                    }
                  />
                </div>
              </>
            )}
            {/* Contacto post ventas */}
            {showAfterSalesFields && (
              <>
                <div className="col-span-12">
                  <h4 className="text-sm text-qGray font-semibold py-2">
                    CONTACTO POSVENTA
                  </h4>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    className="w-full"
                    required
                    id="AfterSalesContactName"
                    name="AfterSalesContactName"
                    label="Contacto posventa"
                    value={formik.values.AfterSalesContactName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.AfterSalesContactName &&
                      Boolean(formik.errors.AfterSalesContactName)
                    }
                    helperText={
                      formik.touched.AfterSalesContactName &&
                      formik.errors.AfterSalesContactName
                    }
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <FormControl fullWidth>
                    <InputLabel id="AfterSalesContactPositionLabel">
                      Cargo contacto posventa
                    </InputLabel>
                    <Select
                      labelId="AfterSalesContactPositionLabel"
                      id="AfterSalesContactPosition"
                      name="AfterSalesContactPosition"
                      value={formik.values.AfterSalesContactPosition}
                      onChange={formik.handleChange}
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
                    className="w-full"
                    id="AfterSalesContactEmail"
                    name="AfterSalesContactEmail"
                    label="Email Contacto posventa"
                    value={formik.values.AfterSalesContactEmail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.AfterSalesContactEmail &&
                      Boolean(formik.errors.AfterSalesContactEmail)
                    }
                    helperText={
                      formik.touched.AfterSalesContactEmail &&
                      formik.errors.AfterSalesContactEmail
                    }
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    className="w-full"
                    id="AfterSalesContactPhone"
                    name="AfterSalesContactPhone"
                    label="Teléfono contacto posventa"
                    type="number"
                    value={formik.values.AfterSalesContactPhone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.AfterSalesContactPhone &&
                      Boolean(formik.errors.AfterSalesContactPhone)
                    }
                    helperText={
                      formik.touched.AfterSalesContactPhone &&
                      formik.errors.AfterSalesContactPhone
                    }
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    className="w-full"
                    id="AfterSalesContactCellphone"
                    name="AfterSalesContactCellphone"
                    label="Celular contacto posventa"
                    type="number"
                    value={formik.values.AfterSalesContactCellphone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.AfterSalesContactCellphone &&
                      Boolean(formik.errors.AfterSalesContactCellphone)
                    }
                    helperText={
                      formik.touched.AfterSalesContactCellphone &&
                      formik.errors.AfterSalesContactCellphone
                    }
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="col-span-12 xl:col-span-3">
          <div className="bg-white grid grid-cols-2 shadow-sm p-4">
            <div className="col-span-2">
              <h4 className="text-sm text-qGray font-semibold py-2">
                CONTACTOS
              </h4>
            </div>
            <div className="col-span-2">
              <FormControlLabel
                control={<Checkbox checked={true} disabled />}
                label="PRINCIPAL"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showBillingFields}
                    onChange={() => {
                      if (!showBillingFields) {
                        formik.setValues({
                          ...formik.values,
                          BillingContactName: "",
                          BillingContactPosition: "",
                          BillingContactEmail: "",
                          BillingContactPhone: "",
                          BillingContactCellphone: "",
                        })
                      }
                      setShowBillingFields(!showBillingFields)
                    }}
                  />
                }
                label="COBRANZA"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showReportFields}
                    onChange={() => {
                      if (!showReportFields) {
                        formik.setValues({
                          ...formik.values,
                          ReportContactName: "",
                          ReportContactPosition: "",
                          ReportContactEmail: "",
                          ReportContactPhone: "",
                          ReportContactCellphone: "",
                        })
                      }
                      setShowReportFields(!showReportFields)
                    }}
                  />
                }
                label="INFORME"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showPurchaseFields}
                    onChange={() => {
                      if (!showPurchaseFields) {
                        formik.setValues({
                          ...formik.values,
                          PurchaseContactName: "",
                          PurchaseContactPosition: "",
                          PurchaseContactEmail: "",
                          PurchaseContactPhone: "",
                          PurchaseContactCellphone: "",
                        })
                      }
                      setShowPurchaseFields(!showPurchaseFields)
                    }}
                  />
                }
                label="COMPRAS"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showWarehouseFields}
                    onChange={() => {
                      if (!showWarehouseFields) {
                        formik.setValues({
                          ...formik.values,
                          WarehouseContactName: "",
                          WarehouseContactPosition: "",
                          WarehouseContactEmail: "",
                          WarehouseContactPhone: "",
                          WarehouseContactCellphone: "",
                        })
                      }
                      setShowWarehouseFields(!showWarehouseFields)
                    }}
                  />
                }
                label="ALMACÉN"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showAfterSalesFields}
                    onChange={() => {
                      if (!showAfterSalesFields) {
                        formik.setValues({
                          ...formik.values,
                          AfterSalesContactName: "",
                          AfterSalesContactPosition: "",
                          AfterSalesContactEmail: "",
                          AfterSalesContactPhone: "",
                          AfterSalesContactCellphone: "",
                        })
                      }
                      setShowAfterSalesFields(!showAfterSalesFields)
                    }}
                  />
                }
                label="POSVENTA"
              />
            </div>
          </div>
          <div className="flex justify-center mt-8">
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
    </form>
  )
}
