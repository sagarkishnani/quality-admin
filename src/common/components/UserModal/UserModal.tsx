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
import { HiUser } from "react-icons/hi"
import { UserService } from "../../services/UserService"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"

interface UserModalInterface {
  title: string
  open: boolean
  email: string
  handleClose: () => void
}

const validationSchema = yup.object({
  CurrentEmail: yup
    .string()
    .email("Debe ser un correo")
    .required("Equipo es obligatorio"),
  NewEmail: yup
    .string()
    .email("Debe ser un correo")
    .required("Equipo es obligatorio"),
  Password: yup
    .string()
    .min(6, "La contraseña debe tener como mínimo 6 caracteres")
    .required("Contraseña es obligatoria"),
})

export const UserModal = ({
  title,
  open,
  email,
  handleClose,
}: UserModalInterface) => {
  const [isLoadingAction, setIsLoadingAction] = useState<boolean>(false)
  const [openToast, setOpenToast] = useState(false)
  const navigate = useNavigate()

  const handleCloseToast = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    setOpenToast(false)
  }

  async function resetEmailAndPassword(
    currentEmail: string,
    newEmail: string,
    password: string
  ) {
    setIsLoadingAction(true)

    const response = await UserService.resetEmailAndPassword(
      currentEmail,
      newEmail,
      password
    )

    if (response == undefined) {
      setIsLoadingAction(false)
      setOpenToast(true)
      handleClose()
      setTimeout(() => {
        navigate("/usuarios")
      }, 2000)
    } else {
      setOpenToast(true)
      setIsLoadingAction(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      CurrentEmail: email,
      NewEmail: email,
      Password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await resetEmailAndPassword(
        values.CurrentEmail,
        values.NewEmail,
        values.Password
      )
    },
  })

  useEffect(() => {
    if (email) {
      formik.setValues({
        CurrentEmail: email,
        NewEmail: email,
        Password: "",
      })
    }
  }, [email])

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <div className="w-full md:w-[36rem] p-4 md:p-12 flex flex-col justify-center space-y-2">
          <div className="m-auto">
            <HiUser size={60} color="#74C947" />
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
                    id="CurrentEmail"
                    name="CurrentEmail"
                    value={formik.values.CurrentEmail}
                    disabled
                    label="Correo actual"
                  />
                </div>
                <div className="col-span-12 mt-5">
                  <TextField
                    color="primary"
                    className="w-full"
                    id="NewEmail"
                    name="NewEmail"
                    value={formik.values.NewEmail}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.NewEmail && Boolean(formik.errors.NewEmail)
                    }
                    helperText={
                      formik.touched.NewEmail && formik.errors.NewEmail
                    }
                    label="Correo nuevo"
                  />
                </div>
                <div className="col-span-12 mt-5">
                  <TextField
                    color="primary"
                    className="w-full"
                    id="Password"
                    name="Password"
                    type="password"
                    value={formik.values.Password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.Password && Boolean(formik.errors.Password)
                    }
                    helperText={
                      formik.touched.Password && formik.errors.Password
                    }
                    label="Nueva contraseña"
                  />
                </div>
                <div className="col-span-12 flex justify-center mt-8">
                  <Button
                    color="#74C947"
                    label="Actualizar"
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
          severity="success"
          sx={{ width: "100%" }}
        >
          Se actualizó correctamente
        </Alert>
      </Snackbar>
    </>
  )
}
