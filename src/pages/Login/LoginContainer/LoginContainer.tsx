import { TextField } from "@mui/material"
import { useFormik } from "formik"
import * as yup from "yup"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import logo from "../../../assets/logo/logo.jpg"
import { Button } from "../../../common/components/Button/Button"
import { UserService } from "../../../common/services/UserService"
import { Modal } from "../../../common/components/Modal/Modal"
import { ConstantUserMessage } from "../../../common/constants"
import useUserStore from "../../../common/stores/UserStore"

const validationSchema = yup.object({
  email: yup
    .string()
    .required("Correo es obligatorio")
    .email("Debe ser un correo"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener como mínimo 6 caracteres")
    .required("Contraseña es obligatoria"),
})

export const LoginContainer = () => {
  const setUser = useUserStore((state) => state.setUser)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<
    "success" | "error" | "question" | "none"
  >("none")
  const [modalMessage, setModalMessage] = useState("")
  const navigate = useNavigate()

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  async function login(email: string, password: string) {
    setIsLoading(true)
    const userAuth = await UserService.loginUser(email, password)

    if (userAuth?.email && userAuth?.RecordStatus === true) {
      setUser(userAuth)
      setIsLoading(false)
      navigate("/")
    } else {
      setIsLoading(false)
      setIsModalOpen(true)
      setModalType("error")
      setModalMessage(ConstantUserMessage.USER_INCORRECT)
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      login(values.email, values.password)
    },
  })

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white w-screen h-screen">
        <div className="col-span-1 flex flex-col justify-center h-full w-72 mx-auto">
          <div className="mb-5">
            <img src={logo} alt="logo" />
          </div>
          <div>
            <h2 className="font-black text-xl mb-5">Iniciar sesión</h2>
          </div>
          <div>
            <form onSubmit={formik.handleSubmit} autoComplete="off">
              <div className="grid grid-cols-2">
                <div className="col-span-2 mb-5">
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
                    label="Correo electrónico"
                  />
                </div>
                <div className="col-span-2 mb-5">
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
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    label="Contraseña"
                  />
                </div>
                <div className="col-span-2">
                  <Button
                    className="w-full hover:bg-qDarkGreen"
                    color="#74C947"
                    label="Ingresar"
                    disabled={!formik.isValid || isLoading}
                    isLoading={isLoading}
                    type="submit"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="hidden md:col-span-1 bg-login bg-cover bg-no-repeat bg-left-bottom md:flex flex-col justify-center md:p-20 lg:p-40">
          <div>
            <h2 className="text-white text-3xl font-semibold mb-5">
              ¡Te damos la bienvenida!
            </h2>
          </div>
          <div>
            <p className="text-white">
              Esta mesa de ayuda de Quality Sumprint te ayudará a recibir
              atención técnica para tus impresoras y será una herramienta para
              brindar soporte técnico ante cualquier eventualidad.
            </p>
          </div>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        modalType={modalType}
        title={modalMessage}
        handleClose={handleCloseModal}
      ></Modal>
    </>
  )
}
