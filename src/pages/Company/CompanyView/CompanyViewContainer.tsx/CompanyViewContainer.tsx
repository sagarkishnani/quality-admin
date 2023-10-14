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
  Skeleton,
  TextField,
} from "@mui/material"
import { Link } from "react-router-dom"
import { HiChevronLeft } from "react-icons/hi"
import { useEffect, useState } from "react"
import {
  ConstantLocalStorage,
  ConstantsMasterTable,
} from "../../../../common/constants"
import secureLocalStorage from "react-secure-storage"
import { UbigeoService } from "../../../../common/services/UbigeoService"
import { CompanyService } from "../../../../common/services/CompanyService"

export const CompanyViewContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [company, setCompany] = useState<any>()
  const [ubigeos, setUbigeos] = useState<any>([])
  const [positions, setPositions] = useState<any>([])
  const [currencies, setCurrencies] = useState<any>([])
  const [paymentConditions, setPaymentConditions] = useState<any>([])
  const [ce, setCe] = useState<any>([])
  const [banks, setBanks] = useState<any>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<
    "success" | "error" | "question" | "none"
  >("none")
  const [modalMessage, setModalMessage] = useState("")
  const [selectedCurrencies, setSelectedCurrencies] = useState([])
  const [selectedBanks, setSelectedBanks] = useState([])

  const [showBillingFields, setShowBillingFields] = useState(false)
  const [showReportFields, setShowReportFields] = useState(false)
  const [showPurchaseFields, setShowPurchaseFields] = useState(false)
  const [showWarehouseFields, setShowWarehouseFields] = useState(false)
  const [showAfterSalesFields, setShowAfterSalesFields] = useState(false)

  async function getAll(idCompany: string) {
    setIsLoading(true)
    await getCompanyById(idCompany)
    await getUbigeos()
    await getPositions()
    await getCurrencies()
    await getPaymentConditions()
    await getCE()
    await getBanks()
    setIsLoading(false)
  }

  async function getCompanyById(idCompany: string) {
    const data = await CompanyService.getCompanyById(idCompany)
    if (data) {
      setCompany(data)
      console.log(data)
    }
  }

  async function getUbigeos() {
    const data = await UbigeoService.getUbigeo()
    if (data) {
      setUbigeos(data)
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

  async function getCurrencies() {
    const data = await MasterTableService.getMasterTableByIdParent(
      ConstantsMasterTable.CURRENCIES
    )
    if (data) {
      setCurrencies(data)
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

  async function getBanks() {
    const data = await MasterTableService.getMasterTableByIdParent(
      ConstantsMasterTable.BANKS
    )
    if (data) {
      setBanks(data)
    }
  }

  const formik = useFormik({
    initialValues: {
      Name: "",
      Ruc: "",
      Ubigeo: ubigeos[0],
      Address: "",
      ImgUrl: "",
      Local: "",
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
    onSubmit: (values) => {},
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
    if (company) {
      formik.setValues({
        Name: company?.Name || "",
        Ruc: company?.Ruc || "",
        Ubigeo: company?.Ubigeo || "",
        Address: company?.Address || "",
        ImgUrl: company?.ImgUrl || "",
        Local: company?.Local || 0,
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
    }
  }, [company])

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <div className="py-5 px-8 bg-qLightGray grid grid-cols-12 gap-4 h-full">
        <div className="col-span-1 w-8 h-8 rounded-full bg-white justify-center items-center">
          <Link to={"/empresas"}>
            <HiChevronLeft size={"32"} />
          </Link>
        </div>
        <div className="bg-white col-span-8 shadow-sm p-6">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <h2 className="font-semibold text-xl pb-2">Ver empresa</h2>
            </div>
            <div className="col-span-12">
              <h4 className="text-sm text-qGray font-semibold pb-2">
                DATOS DE LA EMPRESA
              </h4>
            </div>
            <div className="col-span-8">
              <TextField
                color="primary"
                className="w-full"
                required
                id="Name"
                name="Name"
                value={formik.values.Name}
                label="Nombre de empresa"
              />
            </div>
            <div className="col-span-4">
              <TextField
                className="w-full"
                required
                id="Ruc"
                name="Ruc"
                value={formik.values.Ruc}
                label="RUC"
              />
            </div>
            <div className="col-span-12">
              <Autocomplete
                className="w-full"
                disablePortal
                options={ubigeos}
                value={formik.values.Ubigeo}
                getOptionLabel={(option: any) =>
                  `${option.departamento} - ${option.provincia} - ${option.distrito}`
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
            <div className="col-span-9">
              <TextField
                className="w-full"
                required
                id="Address"
                name="Address"
                label="Dirección fiscal"
                value={formik.values.Address}
              />
            </div>
            <div className="col-span-12">
              <TextField
                className="w-full"
                required
                id="Local"
                name="Local"
                label="Nombre de local"
                value={formik.values.Local}
              />
            </div>
            <div className="col-span-12">
              <h4 className="text-sm text-qGray font-semibold py-2">
                CONTACTO PRINCIPAL
              </h4>
            </div>
            <div className="col-span-6">
              <TextField
                className="w-full"
                required
                id="MainContactName"
                name="MainContactName"
                label="Contacto principal"
                value={formik.values.MainContactName}
              />
            </div>
            <div className="col-span-6">
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
            <div className="col-span-6">
              <TextField
                className="w-full"
                required
                id="MainContactEmail"
                name="MainContactEmail"
                label="Email Contacto principal"
                value={formik.values.MainContactEmail}
              />
            </div>
            <div className="col-span-6">
              <TextField
                className="w-full"
                required
                id="MainContactPhone"
                name="MainContactPhone"
                label="Celular contacto principal"
                type="number"
                value={formik.values.MainContactPhone}
              />
            </div>
            <div className="col-span-3">
              <FormControl fullWidth>
                <InputLabel id="MainContactPaymentLabel">Cond. Pago</InputLabel>
                <Select
                  labelId="MainContactPaymentLabel"
                  id="MainContactPayment"
                  name="MainContactPayment"
                  value={formik.values.MainContactPayment}
                >
                  {paymentConditions?.map((paymentCondition: any) => (
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
            <div className="col-span-3">
              <FormControl fullWidth>
                <InputLabel id="MainContactCELabel">CE</InputLabel>
                <Select
                  labelId="MainContactCELabel"
                  id="MainContactCE"
                  name="MainContactCE"
                  value={formik.values.MainContactCE}
                >
                  {ce?.map((ce: any) => (
                    <MenuItem key={ce.IdMasterTable} value={ce.IdMasterTable}>
                      {ce.Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col-span-3">
              <FormControl fullWidth>
                <InputLabel id="MainContactCurrencyLabel">Moneda</InputLabel>
                <Select
                  labelId="MainContactCurrencyLabel"
                  id="MainContactCurrency"
                  multiple
                  value={selectedCurrencies}
                  input={
                    <OutlinedInput id="MainContactCurrency" label="Moneda" />
                  }
                  renderValue={() => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selectedCurrencies.map((currencyId: string) => {
                        const currency = currencies.find(
                          (c: any) => c.IdMasterTable === currencyId
                        )
                        return (
                          <Chip
                            key={currency.IdMasterTable}
                            label={currency.Name}
                          />
                        )
                      })}
                    </Box>
                  )}
                >
                  <MenuItem disabled value="">
                    <em>Seleccione</em>
                  </MenuItem>
                  {currencies.map((currency: any) => (
                    <MenuItem
                      key={currency.IdMasterTable}
                      value={currency.IdMasterTable}
                    >
                      {currency.Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col-span-3">
              <TextField
                className="w-full"
                required
                id="MainContactAlias"
                name="MainContactAlias"
                label="Empresa (Alias)"
                value={formik.values.MainContactAlias}
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
                  input={
                    <OutlinedInput id="MainContactCurrency" label="Moneda" />
                  }
                  renderValue={() => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selectedBanks.map((bankId: string) => {
                        const bank = banks.find(
                          (c: any) => c.IdMasterTable === bankId
                        )
                        return (
                          <Chip key={bank.IdMasterTable} label={bank.Name} />
                        )
                      })}
                    </Box>
                  )}
                >
                  <MenuItem disabled value="">
                    <em>Seleccione</em>
                  </MenuItem>
                  {banks.map((bank: any) => (
                    <MenuItem
                      key={bank.IdMasterTable}
                      value={bank.IdMasterTable}
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
              />
            </div>
            <div className="col-span-12">
              <TextField
                className="w-full"
                id="MainContactEmailInvoice2"
                name="MainContactEmailInvoice2"
                label="C.E. Factura electrónica 2 (Opcional)"
                value={formik.values.MainContactEmailInvoice2}
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
                <div className="col-span-6">
                  <TextField
                    className="w-full"
                    required
                    id="BillingContactName"
                    name="BillingContactName"
                    label="Contacto cobranza"
                    value={formik.values.BillingContactName}
                  />
                </div>
                <div className="col-span-6">
                  <FormControl fullWidth>
                    <InputLabel id="BillingContactPositionLabel">
                      Cargo contacto cobranza
                    </InputLabel>
                    <Select
                      labelId="BillingContactPositionLabel"
                      id="BillingContactPosition"
                      name="BillingContactPosition"
                      value={formik.values.BillingContactPosition}
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
                <div className="col-span-6">
                  <TextField
                    className="w-full"
                    required
                    id="BillingContactEmail"
                    name="BillingContactEmail"
                    label="Email Contacto cobranza"
                    value={formik.values.BillingContactEmail}
                  />
                </div>
                <div className="col-span-6">
                  <TextField
                    className="w-full"
                    id="BillingContactPhone"
                    name="BillingContactPhone"
                    label="Teléfono contacto cobranza"
                    type="number"
                    value={formik.values.BillingContactPhone}
                  />
                </div>
                <div className="col-span-6">
                  <TextField
                    className="w-full"
                    id="BillingContactCellphone"
                    name="BillingContactCellphone"
                    label="Celular contacto cobranza"
                    type="number"
                    value={formik.values.BillingContactCellphone}
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
                <div className="col-span-6">
                  <TextField
                    className="w-full"
                    required
                    id="ReportContactName"
                    name="ReportContactName"
                    label="Contacto informe"
                    value={formik.values.ReportContactName}
                  />
                </div>
                <div className="col-span-6">
                  <FormControl fullWidth>
                    <InputLabel id="ReportContactPositionLabel">
                      Cargo contacto informe
                    </InputLabel>
                    <Select
                      labelId="ReportContactPositionLabel"
                      id="ReportContactPosition"
                      name="ReportContactPosition"
                      value={formik.values.ReportContactPosition}
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
                <div className="col-span-6">
                  <TextField
                    className="w-full"
                    required
                    id="ReportContactEmail"
                    name="ReportContactEmail"
                    label="Email Contacto informe"
                    value={formik.values.ReportContactEmail}
                  />
                </div>
                <div className="col-span-6">
                  <TextField
                    className="w-full"
                    id="ReportContactPhone"
                    name="ReportContactPhone"
                    label="Teléfono contacto informe"
                    type="number"
                    value={formik.values.ReportContactPhone}
                  />
                </div>
                <div className="col-span-6">
                  <TextField
                    className="w-full"
                    id="ReportContactCellphone"
                    name="ReportContactCellphone"
                    label="Celular contacto informe"
                    type="number"
                    value={formik.values.ReportContactCellphone}
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
                <div className="col-span-6">
                  <TextField
                    className="w-full"
                    required
                    id="PurchaseContactName"
                    name="PurchaseContactName"
                    label="Contacto compras"
                    value={formik.values.PurchaseContactName}
                  />
                </div>
                <div className="col-span-6">
                  <FormControl fullWidth>
                    <InputLabel id="PurchaseContactPositionLabel">
                      Cargo contacto compras
                    </InputLabel>
                    <Select
                      labelId="PurchaseContactPositionLabel"
                      id="PurchaseContactPosition"
                      name="PurchaseContactPosition"
                      value={formik.values.PurchaseContactPosition}
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
                <div className="col-span-6">
                  <TextField
                    className="w-full"
                    required
                    id="PurchaseContactEmail"
                    name="PurchaseContactEmail"
                    label="Email Contacto compras"
                    value={formik.values.PurchaseContactEmail}
                  />
                </div>
                <div className="col-span-6">
                  <TextField
                    className="w-full"
                    id="PurchaseContactPhone"
                    name="PurchaseContactPhone"
                    label="Teléfono contacto compras"
                    type="number"
                    value={formik.values.PurchaseContactPhone}
                  />
                </div>
                <div className="col-span-6">
                  <TextField
                    className="w-full"
                    id="PurchaseContactCellphone"
                    name="PurchaseContactCellphone"
                    label="Celular contacto compras"
                    type="number"
                    value={formik.values.PurchaseContactCellphone}
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
                <div className="col-span-6">
                  <TextField
                    className="w-full"
                    required
                    id="WarehouseContactName"
                    name="WarehouseContactName"
                    label="Contacto almacén"
                    value={formik.values.WarehouseContactName}
                  />
                </div>
                <div className="col-span-6">
                  <FormControl fullWidth>
                    <InputLabel id="WarehouseContactPositionLabel">
                      Cargo contacto almacén
                    </InputLabel>
                    <Select
                      labelId="WarehouseContactPositionLabel"
                      id="WarehouseContactPosition"
                      name="WarehouseContactPosition"
                      value={formik.values.WarehouseContactPosition}
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
                <div className="col-span-6">
                  <TextField
                    className="w-full"
                    required
                    id="WarehouseContactEmail"
                    name="WarehouseContactEmail"
                    label="Email Contacto almacén"
                    value={formik.values.WarehouseContactEmail}
                  />
                </div>
                <div className="col-span-6">
                  <TextField
                    className="w-full"
                    id="WarehouseContactPhone"
                    name="WarehouseContactPhone"
                    label="Teléfono contacto almacén"
                    type="number"
                    value={formik.values.WarehouseContactPhone}
                  />
                </div>
                <div className="col-span-6">
                  <TextField
                    className="w-full"
                    id="WarehouseContactCellphone"
                    name="WarehouseContactCellphone"
                    label="Celular contacto almacén"
                    type="number"
                    value={formik.values.WarehouseContactCellphone}
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
                <div className="col-span-6">
                  <TextField
                    className="w-full"
                    required
                    id="AfterSalesContactName"
                    name="AfterSalesContactName"
                    label="Contacto posventa"
                    value={formik.values.AfterSalesContactName}
                  />
                </div>
                <div className="col-span-6">
                  <FormControl fullWidth>
                    <InputLabel id="AfterSalesContactPositionLabel">
                      Cargo contacto posventa
                    </InputLabel>
                    <Select
                      labelId="AfterSalesContactPositionLabel"
                      id="AfterSalesContactPosition"
                      name="AfterSalesContactPosition"
                      value={formik.values.AfterSalesContactPosition}
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
                <div className="col-span-6">
                  <TextField
                    className="w-full"
                    required
                    id="AfterSalesContactEmail"
                    name="AfterSalesContactEmail"
                    label="Email Contacto posventa"
                    value={formik.values.AfterSalesContactEmail}
                  />
                </div>
                <div className="col-span-6">
                  <TextField
                    className="w-full"
                    id="AfterSalesContactPhone"
                    name="AfterSalesContactPhone"
                    label="Teléfono contacto posventa"
                    type="number"
                    value={formik.values.AfterSalesContactPhone}
                  />
                </div>
                <div className="col-span-6">
                  <TextField
                    className="w-full"
                    id="AfterSalesContactCellphone"
                    name="AfterSalesContactCellphone"
                    label="Celular contacto posventa"
                    type="number"
                    value={formik.values.AfterSalesContactCellphone}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="col-span-3">
          <div className="bg-white grid grid-cols-2 shadow-sm p-4">
            <div className="col-span-2">
              <h4 className="text-sm text-qGray font-semibold py-2">
                CONTACTOS
              </h4>
            </div>
            <div>
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
        </div>
      </div>
    </form>
  )
}
