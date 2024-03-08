import {
  Alert,
  Dialog,
  DialogContent,
  Snackbar,
  TextField,
} from "@mui/material"
import { useEffect, useState } from "react"
import { Button } from "../Button/Button"
import { useFormik } from "formik"
import { ConstantHttpErrors } from "../../constants"
import { HiOutlineDocumentAdd } from "react-icons/hi"
import {
  RegisterServiceInterface,
  ServiceInterface,
} from "../../interfaces/Service.interface"
import { ServicesService } from "../../services/ServicesService"

interface ServiceModalInterface {
  title: string
  open: boolean
  handleClose: () => void
}
export const ServiceModal = ({
  title,
  open,
  handleClose,
}: ServiceModalInterface) => {
  const [isLoadingAction, setIsLoadingAction] = useState<boolean>(false)
  const [openToast, setOpenToast] = useState(false)
  const [services, setServices] = useState<ServiceInterface>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const handleCloseToast = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    setOpenToast(false)
  }

  function checkExistServices(
    services: ServiceInterface[] | undefined,
    serviceParam: RegisterServiceInterface
  ): boolean {
    const serviceExists = services!.filter(
      (service) => service.Name === serviceParam.Name
    )

    if (serviceExists.length === 0) return false
    if (serviceExists.length !== 0) return true

    return false
  }

  async function getServices() {
    const data = await ServicesService.getServices()
    if (data) {
      setServices(data)
    }
  }

  async function registerService(request: RegisterServiceInterface) {
    if (checkExistServices(services, request)) {
      setOpenToast(true)
      setIsLoadingAction(false)
      return
    }

    setIsLoadingAction(true)

    const { status } = await ServicesService.registerService(request)

    if (status == ConstantHttpErrors.CREATED) {
      setIsLoadingAction(false)
      handleClose()
    } else {
      setOpenToast(true)
      setIsLoadingAction(false)
    }
  }

  async function getAll() {
    setIsLoading(true)
    await getServices()
    setIsLoading(false)
  }

  useEffect(() => {
    getAll()
  }, [])

  const formik = useFormik({
    initialValues: {
      Name: "",
      Cost: 0,
    },
    onSubmit: async (values) => {
      await registerService(values)
    },
  })

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <div className="w-full md:w-[36rem] p-4 md:p-12 flex flex-col justify-center space-y-2">
          <div className="m-auto">
            <HiOutlineDocumentAdd size={60} color="#74C947" />
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
              <div className="grid grid-cols-12">
                <div className="col-span-12">
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
                <div className="col-span-12 mt-5">
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
                    label="Costo $"
                  />
                </div>
                <div className="col-span-12 flex justify-center mt-8">
                  <Button
                    color="#74C947"
                    label="Crear servicio"
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
          severity="error"
          sx={{ width: "100%" }}
        >
          El servicio ya existe
        </Alert>
      </Snackbar>
    </>
  )
}
