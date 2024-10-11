import { useFormik } from "formik"
import { MasterTableService } from "../../../../common/services/MasterTableService"
import {
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
import { MasterTable } from "../../../../common/interfaces/MasterTable.interface"
import unknownUser from "../../../../assets/images/user/unknown.png"
import { CompanyLocalService } from "../../../../common/services/CompanyLocalService"

export const CompanyViewContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [company, setCompany] = useState<any>()
  const [ubigeo, setUbigeo] = useState<any>()
  const [positions, setPositions] = useState<MasterTable[]>([])
  const [filteredCurrencies, setFilteredCurrencies] = useState<MasterTable[]>(
    []
  )
  const [paymentConditions, setPaymentConditions] = useState<MasterTable[]>([])
  const [ce, setCe] = useState<MasterTable[]>([])
  const [filteredBanks, setFilteredBanks] = useState<MasterTable[]>([])
  const [locals, setLocals] = useState<any[]>([])

  const [showBillingFields, setShowBillingFields] = useState(false)
  const [showReportFields, setShowReportFields] = useState(false)
  const [showPurchaseFields, setShowPurchaseFields] = useState(false)
  const [showWarehouseFields, setShowWarehouseFields] = useState(false)
  const [showAfterSalesFields, setShowAfterSalesFields] = useState(false)

  async function getAll(idCompany: string) {
    setIsLoading(true)
    await getCompanyById(idCompany)
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

  async function getUbigeo(idUbigeo: number) {
    const data = await UbigeoService.getUbigeoById(idUbigeo)
    if (data) {
      setUbigeo(data)
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

  async function getLocals(idCompany: string) {
    const data = await CompanyLocalService.getLocalsByIdCompany(idCompany)
    if (data) {
      for (const local of data) {
        const ubigeo = await getLocalUbigeo(local.Ubigeo)
        local.Ubigeo =
          ubigeo?.distrito +
            ", " +
            ubigeo?.provincia +
            ", " +
            ubigeo?.departamento || ""
      }
      setLocals(data)
    }
  }

  async function getLocalUbigeo(idUbigeo: number) {
    return await UbigeoService.getUbigeoById(idUbigeo)
  }

  async function getCurrencies(currenciesStr: string[]) {
    const data = await MasterTableService.getMasterTableByIdParent(
      ConstantsMasterTable.CURRENCIES
    )
    if (data) {
      setFilteredCurrencies(
        data.filter((currency) =>
          currenciesStr.includes(currency?.IdMasterTable)
        )
      )
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
      setFilteredBanks(
        data.filter((bank) => banksStr?.includes(bank?.IdMasterTable))
      )
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
    if (company && ubigeo) {
      formik.setValues({
        Name: company?.Name || "",
        Ruc: company?.Ruc || "",
        Ubigeo:
          ubigeo?.distrito +
            ", " +
            ubigeo?.provincia +
            ", " +
            ubigeo?.departamento || "",
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
              <h2 className="font-semibold text-xl pb-2">Ver empresa</h2>
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
            <div className="col-span-12 lg:col-span-8">
              <TextField
                color="primary"
                className="w-full"
                disabled
                id="Name"
                name="Name"
                value={formik.values.Name}
                label="Nombre de empresa"
              />
            </div>
            <div className="col-span-12 md:col-span-4">
              <TextField
                className="w-full"
                disabled
                id="Ruc"
                name="Ruc"
                value={formik.values.Ruc}
                label="RUC"
              />
            </div>
            <div className="col-span-12">
              <TextField
                className="w-full"
                disabled
                id="Ubigeo"
                name="Ubigeo"
                value={formik.values.Ubigeo}
                label="Ubigeo"
              />
            </div>
            <div className="col-span-12">
              <TextField
                className="w-full"
                disabled
                id="Address"
                name="Address"
                label="Dirección fiscal"
                value={formik.values.Address}
              />
            </div>
            {/* <div className="col-span-12">
              <TextField
                className="w-full"
                disabled
                id="Local"
                name="Local"
                label="Nombre de local"
                value={formik.values.Local}
              />
            </div> */}
            {/* <div className="col-span-12 md:col-span-8">
              <TextField
                color="primary"
                disabled
                className="w-full"
                id="Mails"
                name="Mails"
                value={formik.values.Mails}
                label="Correos"
              />
            </div> */}
            <div className="col-span-12 md:col-span-4">
              <FormControlLabel
                name="RequiresOrder"
                id="RequiresOrder"
                value={formik.values.RequiresOrder}
                control={
                  <Switch disabled checked={formik.values.RequiresOrder} />
                }
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
                    disabled
                    id={`Name-${groupIndex}`}
                    name={`Name-${groupIndex}`}
                    label="Nombre de local"
                    value={group.Name}
                  />
                </div>
                <div className="col-span-6">
                  <TextField
                    className="w-full"
                    disabled
                    id={`Address-${groupIndex}`}
                    name={`Address-${groupIndex}`}
                    label="Dirección Fiscal"
                    value={group.Address}
                  />
                </div>
                <div className="col-span-6">
                  <TextField
                    className="w-full"
                    disabled
                    id={`Ubigeo-${groupIndex}`}
                    name={`Ubigeo-${groupIndex}`}
                    value={group.Ubigeo}
                    label="Ubigeo"
                  />
                </div>
                <div className="col-span-6">
                  <TextField
                    className="w-full"
                    disabled
                    id={`Mails-${groupIndex}`}
                    name={`Mails-${groupIndex}`}
                    label="Correos (separados por comas)"
                    value={group.Mails}
                  />
                </div>
                <hr className="col-span-12" />
              </div>
            ))}
            <div className="col-span-12">
              <h4 className="text-sm text-qGray font-semibold py-2">
                CONTACTO PRINCIPAL
              </h4>
            </div>
            <div className="col-span-12 md:col-span-6">
              <TextField
                className="w-full"
                disabled
                id="MainContactName"
                name="MainContactName"
                label="Contacto principal"
                value={formik.values.MainContactName}
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
                  disabled
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
                disabled
                id="MainContactEmail"
                name="MainContactEmail"
                label="Email Contacto principal"
                value={formik.values.MainContactEmail}
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <TextField
                className="w-full"
                disabled
                id="MainContactPhone"
                name="MainContactPhone"
                label="Celular contacto principal"
                type="number"
                value={formik.values.MainContactPhone}
              />
            </div>
            <div className="col-span-6 md:col-span-3">
              <FormControl fullWidth>
                <InputLabel id="MainContactPaymentLabel">Cond. Pago</InputLabel>
                <Select
                  labelId="MainContactPaymentLabel"
                  id="MainContactPayment"
                  name="MainContactPayment"
                  disabled
                  value={formik.values.MainContactPayment}
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
                  disabled
                  id="MainContactCE"
                  name="MainContactCE"
                  value={formik.values.MainContactCE}
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
                  disabled
                  value={filteredCurrencies}
                  input={
                    <OutlinedInput id="MainContactCurrency" label="Moneda" />
                  }
                  renderValue={() => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {filteredCurrencies.map((currency) => {
                        return (
                          <Chip
                            key={currency?.IdMasterTable}
                            label={currency?.Name}
                          />
                        )
                      })}
                    </Box>
                  )}
                ></Select>
              </FormControl>
            </div>
            <div className="col-span-12 md:col-span-3">
              <TextField
                className="w-full"
                disabled
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
                  disabled
                  labelId="MainContactBanksLabel"
                  id="MainContactBanks"
                  value={filteredBanks}
                  input={
                    <OutlinedInput id="MainContactCurrency" label="Moneda" />
                  }
                  renderValue={() => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {filteredBanks.map((bank) => {
                        return (
                          <Chip key={bank?.IdMasterTable} label={bank?.Name} />
                        )
                      })}
                    </Box>
                  )}
                ></Select>
              </FormControl>
            </div>
            <div className="col-span-12">
              <TextField
                className="w-full"
                id="MainContactEmailInvoice"
                disabled
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
                disabled
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
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    className="w-full"
                    disabled
                    id="BillingContactName"
                    name="BillingContactName"
                    label="Contacto cobranza"
                    value={formik.values.BillingContactName}
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
                      disabled
                      value={formik.values.BillingContactPosition}
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
                    disabled
                    id="BillingContactEmail"
                    name="BillingContactEmail"
                    label="Email Contacto cobranza"
                    value={formik.values.BillingContactEmail}
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    className="w-full"
                    disabled
                    id="BillingContactPhone"
                    name="BillingContactPhone"
                    label="Teléfono contacto cobranza"
                    type="number"
                    value={formik.values.BillingContactPhone}
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    className="w-full"
                    id="BillingContactCellphone"
                    name="BillingContactCellphone"
                    disabled
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
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    className="w-full"
                    disabled
                    id="ReportContactName"
                    name="ReportContactName"
                    label="Contacto informe"
                    value={formik.values.ReportContactName}
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
                      disabled
                      value={formik.values.ReportContactPosition}
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
                    disabled
                    id="ReportContactEmail"
                    name="ReportContactEmail"
                    label="Email Contacto informe"
                    value={formik.values.ReportContactEmail}
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    className="w-full"
                    id="ReportContactPhone"
                    disabled
                    name="ReportContactPhone"
                    label="Teléfono contacto informe"
                    type="number"
                    value={formik.values.ReportContactPhone}
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    className="w-full"
                    disabled
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
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    className="w-full"
                    disabled
                    id="PurchaseContactName"
                    name="PurchaseContactName"
                    label="Contacto compras"
                    value={formik.values.PurchaseContactName}
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
                      disabled
                      value={formik.values.PurchaseContactPosition}
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
                    disabled
                    id="PurchaseContactEmail"
                    name="PurchaseContactEmail"
                    label="Email Contacto compras"
                    value={formik.values.PurchaseContactEmail}
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    className="w-full"
                    id="PurchaseContactPhone"
                    name="PurchaseContactPhone"
                    disabled
                    label="Teléfono contacto compras"
                    type="number"
                    value={formik.values.PurchaseContactPhone}
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    className="w-full"
                    id="PurchaseContactCellphone"
                    name="PurchaseContactCellphone"
                    disabled
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
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    className="w-full"
                    disabled
                    id="WarehouseContactName"
                    name="WarehouseContactName"
                    label="Contacto almacén"
                    value={formik.values.WarehouseContactName}
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
                      disabled
                      value={formik.values.WarehouseContactPosition}
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
                    disabled
                    id="WarehouseContactEmail"
                    name="WarehouseContactEmail"
                    label="Email Contacto almacén"
                    value={formik.values.WarehouseContactEmail}
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    className="w-full"
                    id="WarehouseContactPhone"
                    name="WarehouseContactPhone"
                    disabled
                    label="Teléfono contacto almacén"
                    type="number"
                    value={formik.values.WarehouseContactPhone}
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    className="w-full"
                    id="WarehouseContactCellphone"
                    name="WarehouseContactCellphone"
                    disabled
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
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    className="w-full"
                    required
                    id="AfterSalesContactName"
                    name="AfterSalesContactName"
                    disabled
                    label="Contacto posventa"
                    value={formik.values.AfterSalesContactName}
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
                      disabled
                      value={formik.values.AfterSalesContactPosition}
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
                    disabled
                    id="AfterSalesContactEmail"
                    name="AfterSalesContactEmail"
                    label="Email Contacto posventa"
                    value={formik.values.AfterSalesContactEmail}
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    className="w-full"
                    id="AfterSalesContactPhone"
                    name="AfterSalesContactPhone"
                    label="Teléfono contacto posventa"
                    disabled
                    type="number"
                    value={formik.values.AfterSalesContactPhone}
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    className="w-full"
                    id="AfterSalesContactCellphone"
                    name="AfterSalesContactCellphone"
                    label="Celular contacto posventa"
                    disabled
                    type="number"
                    value={formik.values.AfterSalesContactCellphone}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="col-span-12 md:col-span-3">
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
                control={<Checkbox checked={showBillingFields} disabled />}
                label="COBRANZA"
              />
              <FormControlLabel
                control={<Checkbox checked={showReportFields} disabled />}
                label="INFORME"
              />
              <FormControlLabel
                control={<Checkbox checked={showPurchaseFields} disabled />}
                label="COMPRAS"
              />
              <FormControlLabel
                control={<Checkbox checked={showWarehouseFields} disabled />}
                label="ALMACÉN"
              />
              <FormControlLabel
                control={<Checkbox checked={showAfterSalesFields} disabled />}
                label="POSVENTA"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
