import {
  Alert,
  Box,
  Checkbox,
  Chip,
  Dialog,
  DialogContent,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Snackbar,
} from "@mui/material"
import { PiMicrosoftExcelLogoFill } from "react-icons/pi"
import { CompanyService } from "../../services/CompanyService"
import { GetCompaniesResponse } from "../../interfaces/Company.interface"
import { useEffect, useState } from "react"
import { DatePicker } from "@mui/x-date-pickers"
import { Button } from "../Button/Button"
import { useFormik } from "formik"
import { ConstantTicketStatus } from "../../constants"
import { TicketService } from "../../services/TicketService"
import { exportData } from "../../utils"
import moment from "moment"
import { FilteredTicketsByExcelRequest } from "../../interfaces/Ticket.interface"

interface ExcelModalInterface {
  title: string
  open: boolean
  handleClose: () => void
}
export const ExcelModal = ({
  title,
  open,
  handleClose,
}: ExcelModalInterface) => {
  const [isLoadingAction, setIsLoadingAction] = useState<boolean>(false)
  const [openToast, setOpenToast] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [companies, setCompanies] = useState<GetCompaniesResponse[]>([])

  const [selectedCompanies, setSelectedCompanies] = useState([])

  async function getCompanies() {
    const data = await CompanyService.getCompanies()
    if (data) {
      setCompanies(data)
    }
  }

  const handleCompanyChange = (event) => {
    setSelectedCompanies(event.target.value)
  }

  async function filterTickets(
    pending: string | null,
    enProgreso: string | null,
    atendido: string | null,
    enEspera: string | null,
    abierto: string | null,
    finalizado: string | null,
    cancelado: string | null,
    initDate: any | null,
    endDate: any | null
  ) {
    setIsLoadingAction(true)

    const requestFilter: FilteredTicketsByExcelRequest = {
      IdCompany: selectedCompanies,
      Pending: pending,
      InProgress: enProgreso,
      Attended: atendido,
      Waiting: enEspera,
      Open: abierto,
      Finished: finalizado,
      Cancelled: cancelado,
      InitDate: initDate,
      EndDate: endDate,
    }

    const data: any[] = await TicketService.getFilteredTicketsByExcel(
      requestFilter
    )

    if (data.length > 0) {
      exportData(data)
      setIsLoadingAction(false)
      handleClose()
    } else {
      setOpenToast(true)
      setIsLoadingAction(false)
    }
  }

  const handleCloseToast = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    setOpenToast(false)
  }

  async function getAll() {
    setIsLoading(true)
    await getCompanies()
    setIsLoading(false)
  }

  useEffect(() => {
    getAll()
  }, [])

  function validateForm(values: any) {
    let pendiente = null,
      enProgreso = null,
      atendido = null,
      enEspera = null,
      abierto = null,
      finalizado = null,
      cancelado = null,
      initDate = null,
      endDate = null

    if (values.Pending === true) {
      pendiente = ConstantTicketStatus.PENDIENTE
    }

    if (values.Pending === false) {
      pendiente = null
    }

    if (values.InProgress === true) {
      enProgreso = ConstantTicketStatus.EN_PROGRESO
    }

    if (values.InProgress === false) {
      enProgreso = null
    }

    if (values.Attended === true) {
      atendido = ConstantTicketStatus.ATENDIDO
    }

    if (values.Attended === false) {
      atendido = null
    }

    if (values.Waiting === true) {
      enEspera = ConstantTicketStatus.EN_ESPERA
    }

    if (values.Waiting === false) {
      enEspera = null
    }

    if (values.Open === true) {
      abierto = ConstantTicketStatus.ABIERTO
    }

    if (values.Open === false) {
      abierto = null
    }

    if (values.Finished === true) {
      finalizado = ConstantTicketStatus.FINALIZADO
    }

    if (values.Finished === false) {
      finalizado = null
    }

    if (values.Cancelled === true) {
      cancelado = ConstantTicketStatus.CANCELADO
    }

    if (values.Cancelled === false) {
      cancelado = null
    }

    if (values.InitDate) initDate = values.InitDate?._d.toISOString()

    if (!values.InitDate) {
      initDate = null
    }

    if (values.EndDate) endDate = values.EndDate?._d.toISOString()

    if (!values.EndDate) {
      endDate = null
    }

    filterTickets(
      pendiente,
      enProgreso,
      atendido,
      enEspera,
      abierto,
      finalizado,
      cancelado,
      initDate,
      endDate
    )
  }

  const formik = useFormik({
    initialValues: {
      Pending: false,
      InProgress: false,
      Attended: false,
      Waiting: false,
      Open: false,
      Finished: false,
      Cancelled: false,
      InitDate: null,
      EndDate: null,
    },
    onSubmit: (values) => {
      validateForm(values)
    },
  })

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <div className="w-full md:w-[36rem] p-4 md:p-12 flex flex-col justify-center space-y-2">
          <div className="m-auto">
            <PiMicrosoftExcelLogoFill size={60} color="#74C947" />
          </div>
          <div>
            <h2 className="font-semibold text-xl text-center">{title}</h2>
          </div>
          <form
            className="w-full"
            onSubmit={formik.handleSubmit}
            autoComplete="off"
          >
            <DialogContent>
              <div className="grid grid-cols-4">
                <div className="col-span-4 lg:col-span-2">
                  <h4 className="text-qGreen font-medium pb-2">
                    Fecha de inicio
                  </h4>
                  <div className="text-sm pb-2">
                    <DatePicker
                      className="date-filter"
                      format="DD/MM/YYYY"
                      value={moment(formik.values.InitDate)}
                      onChange={(value) =>
                        formik.setFieldValue("InitDate", value, true)
                      }
                    />
                  </div>
                </div>
                <div className="lg:ml-2 col-span-4 lg:col-span-2">
                  <h4 className="text-qGreen font-medium pb-2">Fecha de fin</h4>
                  <div className="text-sm pb-2">
                    <DatePicker
                      className="date-filter"
                      format="DD/MM/YYYY"
                      value={moment(formik.values.EndDate)}
                      onChange={(value) =>
                        formik.setFieldValue("EndDate", value, true)
                      }
                    />
                  </div>
                </div>
                <div className="col-span-4 mt-2">
                  <h4 className="text-qGreen font-medium pb-2">
                    Seleccione las empresas
                  </h4>
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
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
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
                </div>
                <div className="col-span-4 mt-3">
                  <h4 className="text-qGreen font-medium pb-2">
                    Estado del ticket
                  </h4>
                  <div className="grid grid-cols-3 text-sm pb-2">
                    <div className="col-span-3 md:col-span-1">
                      <FormControlLabel
                        className="!text-xs"
                        control={<Checkbox />}
                        id="Pending"
                        name="Pending"
                        value={formik.values.Pending}
                        onChange={formik.handleChange}
                        label="Pendiente"
                      />
                    </div>
                    <div className="col-span-3 md:col-span-1">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="En progreso"
                        id="InProgress"
                        value={formik.values.InProgress}
                        onChange={formik.handleChange}
                        name="InProgress"
                      />
                    </div>
                    <div className="col-span-3 md:col-span-1">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Atendido"
                        id="Attended"
                        value={formik.values.Attended}
                        onChange={formik.handleChange}
                        name="Attended"
                      />
                    </div>
                    <div className="col-span-3 md:col-span-1">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="En espera"
                        id="Waiting"
                        value={formik.values.Waiting}
                        onChange={formik.handleChange}
                        name="Waiting"
                      />
                    </div>
                    <div className="col-span-3 md:col-span-1">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Abierto"
                        id="Open"
                        value={formik.values.Open}
                        onChange={formik.handleChange}
                        name="Open"
                      />
                    </div>
                    <div className="col-span-3 md:col-span-1">
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Finalizado"
                        id="Finished"
                        value={formik.values.Finished}
                        onChange={formik.handleChange}
                        name="Finished"
                      />
                    </div>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Cancelado"
                      id="Cancelled"
                      value={formik.values.Cancelled}
                      onChange={formik.handleChange}
                      name="Cancelled"
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-8 col-span-4">
                  <Button
                    color="#74C947"
                    label="Exportar a Excel"
                    disabled={isLoadingAction}
                    isLoading={isLoadingAction}
                    type="submit"
                  />
                </div>
              </div>
            </DialogContent>
          </form>
        </div>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openToast}
        autoHideDuration={6000}
        onClose={handleCloseToast}
      >
        <Alert
          onClose={handleCloseToast}
          severity="warning"
          sx={{ width: "100%" }}
        >
          No se encontraron opciones con los filtros usados
        </Alert>
      </Snackbar>
    </>
  )
}
