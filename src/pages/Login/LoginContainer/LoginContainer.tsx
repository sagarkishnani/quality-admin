import { TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo/logo.jpg";
import { Button } from "../../../common/components/Button/Button";
import { UserService } from "../../../common/services/UserService";
import { Modal } from "../../../common/components/Modal/Modal";
import {
  ConstantLocalStorage,
  ConstantUserMessage,
} from "../../../common/constants";
import { useAuth } from "../../../common/contexts/AuthContext";

const validationSchema = yup.object({
  email: yup
    .string()
    .required("Correo es obligatorio")
    .email("Debe ser un correo"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener como mínimo 6 caracteres")
    .required("Contraseña es obligatoria"),
});

export const LoginContainer = () => {
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<
    "success" | "error" | "question" | "none"
  >("none");
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  async function login(email: string, password: string) {
    setIsLoading(true);
    const userAuth = await UserService.loginUser(email, password);

    if (userAuth?.email) {
      setUser(userAuth);
      setIsLoading(false);
      navigate("/");
    } else {
      setIsLoading(false);
      setIsModalOpen(true);
      setModalType("error");
      setModalMessage(ConstantUserMessage.USER_INCORRECT);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      login(values.email, values.password);
    },
  });

  return (
    <>
      <div className="grid grid-cols-2 bg-white w-screen h-screen">
        <div className="col-span-1 flex flex-col justify-center items-center h-full">
          <div className="mb-2">
            <img src={logo} alt="logo" />
          </div>
          <div>
            <h2 className="font-semibold text-xl pb-2">Iniciar sesión</h2>
          </div>
          <div>
            <form onSubmit={formik.handleSubmit} autoComplete="off">
              <div className="grid grid-cols-2">
                <div className="col-span-6">
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
                <div className="col-span-6">
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
                <div className="mt-4">
                  <Button
                    className="w-full"
                    color="#74C947"
                    label="Ingresar"
                    disabled={!formik.isValid}
                    type="submit"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-span-1 bg-qGray"></div>
      </div>
      <Modal
        open={isModalOpen}
        modalType={modalType}
        title={modalMessage}
        handleClose={handleCloseModal}
      ></Modal>
    </>
  );
};
