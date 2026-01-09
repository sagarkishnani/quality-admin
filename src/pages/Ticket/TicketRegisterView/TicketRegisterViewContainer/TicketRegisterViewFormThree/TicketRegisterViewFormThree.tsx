import { useEffect, useState } from "react"
import { useFormik } from "formik"
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material"
import moment from "moment"
import { useTicket } from "../../../../../common/contexts/TicketContext"

export const TicketRegisterViewFormThree = ({ ticket }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { setTicketStep } = useTicket()

  function registerTicketStep(isNext: boolean) {
    isNext ? setTicketStep(4) : setTicketStep(2)
  }

  const formik = useFormik({
    initialValues: {
      BandejaUno: "",
      BisagraEscaner: "",
      BandejaDos: "",
      BandejaADF: "",
      BandejaSalida: "",
      CristalCamaPlana: "",
      ConectorUSB: "",
      Engranaje: "",
      ConectorRJ: "",
      LaminaTeplon: "",
      PanelControl: "",
      RodilloPresion: "",
    },
    onSubmit: (values) => {},
  })

  useEffect(() => {
    setIsLoading(true)
    if (ticket) {
      formik.setValues({
        BandejaUno: ticket?.TicketAnswer?.BandejaUno || "",
        BisagraEscaner: ticket?.TicketAnswer?.BisagraEscaner || "",
        BandejaDos: ticket?.TicketAnswer?.BandejaDos || "",
        BandejaADF: ticket?.TicketAnswer?.BandejaADF || "",
        BandejaSalida: ticket?.TicketAnswer?.BandejaSalida || "",
        CristalCamaPlana: ticket?.TicketAnswer?.CristalCamaPlana || "",
        ConectorUSB: ticket?.TicketAnswer?.ConectorUSB || "",
        Engranaje: ticket?.TicketAnswer?.Engranaje || "",
        ConectorRJ: ticket?.TicketAnswer?.ConectorRJ || "",
        LaminaTeplon: ticket?.TicketAnswer?.LaminaTeplon || "",
        PanelControl: ticket?.TicketAnswer?.PanelControl || "",
        RodilloPresion: ticket?.TicketAnswer?.RodilloPresion || "",
      })
    }
    setIsLoading(false)
  }, [ticket])

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-8">
          <h2 className="font-semibold text-xl pb-2">
            Reporte de servicio técnico
          </h2>
        </div>
        <div className="col-span-12 md:col-span-4 justify-end flex">
          <h2 className="font-semibold text-qGray pb-2">
            {moment(
              ticket?.ScheduledAppointmentDate
                ? ticket?.ScheduledAppointmentDate
                : ticket?.RecordCreationDate
            ).format("DD/MM/YYYY")}
          </h2>
        </div>
        <div className="col-span-12">
          <h4 className="font-semibold text-lg">Revisión</h4>
        </div>
        <div className="col-span-12">
          <p className="font-semibold text-xs -mt-2">
            B: BUEN ESTADO | L: LEVE DESGASTE | G: GASTADO | R: ROTO
          </p>
        </div>
        <div className="col-span-12 md:col-span-2 flex items-center">
          <p className="text-sm font-semibold">Bandeja 1</p>
        </div>
        <div className="col-span-12 md:col-span-4">
          <FormControl>
            <RadioGroup
              row
              id="BandejaUno"
              name="BandejaUno"
              value={formik.values.BandejaUno}
            >
              <FormControlLabel
                value="B"
                control={<Radio disabled />}
                label="B"
              />
              <FormControlLabel
                value="L"
                control={<Radio disabled />}
                label="L"
              />
              <FormControlLabel
                value="G"
                control={<Radio disabled />}
                label="G"
              />
              <FormControlLabel
                value="R"
                control={<Radio disabled />}
                label="R"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="col-span-12 md:col-span-2 flex items-center">
          <p className="text-sm font-semibold">Bisagra de escaner</p>
        </div>
        <div className="col-span-12 md:col-span-4">
          <FormControl>
            <RadioGroup
              row
              id="BisagraEscaner"
              name="BisagraEscaner"
              value={formik.values.BisagraEscaner}
              onChange={formik.handleChange}
            >
              <FormControlLabel
                value="B"
                control={<Radio disabled />}
                label="B"
              />
              <FormControlLabel
                value="L"
                control={<Radio disabled />}
                label="L"
              />
              <FormControlLabel
                value="G"
                control={<Radio disabled />}
                label="G"
              />
              <FormControlLabel
                value="R"
                control={<Radio disabled />}
                label="R"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="col-span-12 md:col-span-2 flex items-center">
          <p className="text-sm font-semibold">Bandeja 2</p>
        </div>
        <div className="col-span-12 md:col-span-4">
          <FormControl>
            <RadioGroup
              row
              id="BandejaDos"
              name="BandejaDos"
              value={formik.values.BandejaDos}
              onChange={formik.handleChange}
            >
              <FormControlLabel
                value="B"
                control={<Radio disabled />}
                label="B"
              />
              <FormControlLabel
                value="L"
                control={<Radio disabled />}
                label="L"
              />
              <FormControlLabel
                value="G"
                control={<Radio disabled />}
                label="G"
              />
              <FormControlLabel
                value="R"
                control={<Radio disabled />}
                label="R"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="col-span-12 md:col-span-2 flex items-center">
          <p className="text-sm font-semibold">Bandeja ADF</p>
        </div>
        <div className="col-span-12 md:col-span-4">
          <FormControl>
            <RadioGroup
              row
              id="BandejaADF"
              name="BandejaADF"
              value={formik.values.BandejaADF}
              onChange={formik.handleChange}
            >
              <FormControlLabel
                value="B"
                control={<Radio disabled />}
                label="B"
              />
              <FormControlLabel
                value="L"
                control={<Radio disabled />}
                label="L"
              />
              <FormControlLabel
                value="G"
                control={<Radio disabled />}
                label="G"
              />
              <FormControlLabel
                value="R"
                control={<Radio disabled />}
                label="R"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="col-span-12 md:col-span-2 flex items-center">
          <p className="text-sm font-semibold">Bandeja de salida</p>
        </div>
        <div className="col-span-12 md:col-span-4">
          <FormControl>
            <RadioGroup
              row
              id="BandejaSalida"
              name="BandejaSalida"
              value={formik.values.BandejaSalida}
              onChange={formik.handleChange}
            >
              <FormControlLabel
                value="B"
                control={<Radio disabled />}
                label="B"
              />
              <FormControlLabel
                value="L"
                control={<Radio disabled />}
                label="L"
              />
              <FormControlLabel
                value="G"
                control={<Radio disabled />}
                label="G"
              />
              <FormControlLabel
                value="R"
                control={<Radio disabled />}
                label="R"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="col-span-12 md:col-span-2 flex items-center">
          <p className="text-sm font-semibold">Cristal de cama plana</p>
        </div>
        <div className="col-span-12 md:col-span-4">
          <FormControl>
            <RadioGroup
              row
              id="CristalCamaPlana"
              name="CristalCamaPlana"
              value={formik.values.CristalCamaPlana}
              onChange={formik.handleChange}
            >
              <FormControlLabel
                value="B"
                control={<Radio disabled />}
                label="B"
              />
              <FormControlLabel
                value="L"
                control={<Radio disabled />}
                label="L"
              />
              <FormControlLabel
                value="G"
                control={<Radio disabled />}
                label="G"
              />
              <FormControlLabel
                value="R"
                control={<Radio disabled />}
                label="R"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="col-span-12 md:col-span-2 flex items-center">
          <p className="text-sm font-semibold">Conector USB</p>
        </div>
        <div className="col-span-12 md:col-span-4">
          <FormControl>
            <RadioGroup
              row
              id="ConectorUSB"
              name="ConectorUSB"
              value={formik.values.ConectorUSB}
              onChange={formik.handleChange}
            >
              <FormControlLabel
                value="B"
                control={<Radio disabled />}
                label="B"
              />
              <FormControlLabel
                value="L"
                control={<Radio disabled />}
                label="L"
              />
              <FormControlLabel
                value="G"
                control={<Radio disabled />}
                label="G"
              />
              <FormControlLabel
                value="R"
                control={<Radio disabled />}
                label="R"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="col-span-12 md:col-span-2 flex items-center">
          <p className="text-sm font-semibold">Engranaje</p>
        </div>
        <div className="col-span-12 md:col-span-4">
          <FormControl>
            <RadioGroup
              row
              id="Engranaje"
              name="Engranaje"
              value={formik.values.Engranaje}
              onChange={formik.handleChange}
            >
              <FormControlLabel
                value="B"
                control={<Radio disabled />}
                label="B"
              />
              <FormControlLabel
                value="L"
                control={<Radio disabled />}
                label="L"
              />
              <FormControlLabel
                value="G"
                control={<Radio disabled />}
                label="G"
              />
              <FormControlLabel
                value="R"
                control={<Radio disabled />}
                label="R"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="col-span-12 md:col-span-2 flex items-center">
          <p className="text-sm font-semibold">Conector RJ45</p>
        </div>
        <div className="col-span-12 md:col-span-4">
          <FormControl>
            <RadioGroup
              row
              id="ConectorRJ"
              name="ConectorRJ"
              value={formik.values.ConectorRJ}
              onChange={formik.handleChange}
            >
              <FormControlLabel
                value="B"
                control={<Radio disabled />}
                label="B"
              />
              <FormControlLabel
                value="L"
                control={<Radio disabled />}
                label="L"
              />
              <FormControlLabel
                value="G"
                control={<Radio disabled />}
                label="G"
              />
              <FormControlLabel
                value="R"
                control={<Radio disabled />}
                label="R"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="col-span-12 md:col-span-2 flex items-center">
          <p className="text-sm font-semibold">Lámina de teflón</p>
        </div>
        <div className="col-span-12 md:col-span-4">
          <FormControl>
            <RadioGroup
              row
              id="LaminaTeplon"
              name="LaminaTeplon"
              value={formik.values.LaminaTeplon}
              onChange={formik.handleChange}
            >
              <FormControlLabel
                value="B"
                control={<Radio disabled />}
                label="B"
              />
              <FormControlLabel
                value="L"
                control={<Radio disabled />}
                label="L"
              />
              <FormControlLabel
                value="G"
                control={<Radio disabled />}
                label="G"
              />
              <FormControlLabel
                value="R"
                control={<Radio disabled />}
                label="R"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="col-span-12 md:col-span-2 flex items-center">
          <p className="text-sm font-semibold">Panel de control</p>
        </div>
        <div className="col-span-12 md:col-span-4">
          <FormControl>
            <RadioGroup
              row
              id="PanelControl"
              name="PanelControl"
              value={formik.values.PanelControl}
              onChange={formik.handleChange}
            >
              <FormControlLabel
                value="B"
                control={<Radio disabled />}
                label="B"
              />
              <FormControlLabel
                value="L"
                control={<Radio disabled />}
                label="L"
              />
              <FormControlLabel
                value="G"
                control={<Radio disabled />}
                label="G"
              />
              <FormControlLabel
                value="R"
                control={<Radio disabled />}
                label="R"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="col-span-12 md:col-span-2 flex items-center">
          <p className="text-sm font-semibold">Rodillo de presión</p>
        </div>
        <div className="col-span-12 md:col-span-4">
          <FormControl>
            <RadioGroup
              row
              id="RodilloPresion"
              name="RodilloPresion"
              value={formik.values.RodilloPresion}
              onChange={formik.handleChange}
            >
              <FormControlLabel
                value="B"
                control={<Radio disabled />}
                label="B"
              />
              <FormControlLabel
                value="L"
                control={<Radio disabled />}
                label="L"
              />
              <FormControlLabel
                value="G"
                control={<Radio disabled />}
                label="G"
              />
              <FormControlLabel
                value="R"
                control={<Radio disabled />}
                label="R"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      <div className="w-full mt-16 flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-3 md:justify-end">
        <button
          className={`bg-qBlue px-10 py-2 font-medium rounded-full text-white hover:bg-qDarkerBlue`}
          onClick={() => registerTicketStep(false)}
          type="button"
        >
          Anterior
        </button>
        <button
          className={`bg-qGreen px-10 py-2 font-medium rounded-full text-white hover:bg-qDarkGreen`}
          onClick={() => registerTicketStep(true)}
          type="button"
        >
          Siguiente
        </button>
      </div>
    </>
  )
}
