import * as yup from "yup"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ServicesService } from "../../../../common/services/ServicesService"
import {
  RegisterServiceInterface,
  ServiceInterface,
} from "../../../../common/interfaces/Service.interface"
import {
  ConstantHttpErrors,
  ConstantMessage,
  ConstantServiceMessage,
} from "../../../../common/constants"
import { useFormik } from "formik"
import { HiChevronLeft } from "react-icons/hi"
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material"
import { Button } from "../../../../common/components/Button/Button"
import { Modal } from "../../../../common/components/Modal/Modal"

const validationSchema = yup.object({
  Name: yup.string().required("Nombre es obligatorio"),
  Cost: yup.number().required("Orden es obligatorio"),
})

export const ServicesRegisterContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingAction, setIsLoadingAction] = useState<boolean>(false)
  const [services, setServices] = useState<any>([])
  const [modal, setModal] = useState({
    isOpen: false,
    type: "none",
    message: "",
  })
  const navigate = useNavigate()

  const handleCloseModal = () => {
    setModal({
      ...modal,
      isOpen: false,
    })
  }

  async function getServices() {
    setIsLoading(true)
    const data = await ServicesService.getServices()
    if (data) {
      setServices(data)
      setIsLoading(false)
    }
  }

  async function registerService(request: RegisterServiceInterface) {
    setIsLoadingAction(true)

    const { data, status }: any = await ServicesService.registerService(request)
    if (status == ConstantHttpErrors.CREATED) {
      setModal({
        isOpen: true,
        type: "success",
        message: ConstantServiceMessage.SERVICE_REGISTER_SUCCESS,
      })

      setIsLoadingAction(false)
      setTimeout(() => {
        navigate("/servicios")
      }, 2000)
    } else if (status == ConstantHttpErrors.DUPLICATED) {
      setIsLoadingAction(false)
      setModal({
        isOpen: true,
        type: "error",
        message: ConstantMessage.SERVICE_DUPLICATED,
      })
    } else {
      setIsLoadingAction(false)
      setModal({
        isOpen: true,
        type: "error",
        message: ConstantMessage.SERVICE_ERROR,
      })
    }
  }

  const formik = useFormik({
    initialValues: {
      Name: "",
      Cost: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      registerService(values)
    },
  })

  useEffect(() => {
    getServices()
  }, [])

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <div className="py-5 px-4 md:px-8 bg-qLightGray grid grid-cols-12 gap-4">
        <div className="col-span-1 w-8 h-8 rounded-full bg-white justify-center items-center">
          <Link to={"/servicios"}>
            <HiChevronLeft size={"32"} />
          </Link>
        </div>
        <div className="bg-white col-span-12 shadow-sm p-6">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <h2 className="font-semibold text-xl pb-2">Registrar servicio</h2>
            </div>
            <div className="col-span-12 md:col-span-6">
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
                label="Nombre"
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <TextField
                color="primary"
                className="w-full"
                id="Cost"
                name="Cost"
                value={formik.values.Cost}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Cost && Boolean(formik.errors.Cost)}
                helperText={formik.touched.Cost && formik.errors.Cost}
                label="Costo ($)"
              />
            </div>
            <div className="col-span-12">
              <hr />
              <h2 className="font-semibold text-base py-2">
                Leyenda de servicios
              </h2>
            </div>
            <div className="col-span-12">
              <FormControl fullWidth>
                <InputLabel id="ParentItem">Listado de servicios</InputLabel>
                <Select
                  labelId="Service"
                  id="Service"
                  name="Service"
                  onChange={formik.handleChange}
                >
                  {services?.map((item: ServiceInterface) => (
                    <MenuItem key={item.IdService} value={item.IdService}>
                      {item.Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="flex justify-center mt-8 mb-8 md:mb-0">
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
        modalType={modal?.type}
        title={modal?.message}
        open={modal?.isOpen}
        handleClose={handleCloseModal}
      />
    </form>
  )
}
