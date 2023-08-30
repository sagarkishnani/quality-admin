import * as yup from "yup";
import { HiChevronLeft } from "react-icons/hi";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { ConstantMessage } from "../../../../common/constants";
import { Link } from "react-router-dom";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
} from "@mui/material";
import { Button } from "../../../../common/components/Button/Button";
import { Modal } from "../../../../common/components/Modal/Modal";
import { CompanyService } from "../../../../common/services/CompanyService";
import { RoleService } from "../../../../common/services/RoleService";
import { UserRegisterRequest } from "../../../../common/interfaces/User.interface";
import { UserService } from "../../../../common/services/UserService";

const validationSchema = yup.object({
  Dni: yup
    .number()
    // .min(7, "El Dni debe tener como mínimo 7 caracteres")
    // .max(7, "El Dni debe tener como máximo 7 caracteres")
    .required("Dni es obligatorio"),
  Name: yup
    .string()
    .required("Nombre es obligatorio")
    .min(3, "El Nombre debe tener como mínimo 3 caracteres"),
  PhoneNumber: yup.number().required("Celular es obligatorio"),
  IdRole: yup.string().required("Rol es obligatorio"),
  IdCompany: yup.string().required("Empresa es obligatorio"),
  email: yup
    .string()
    .required("Correo es obligatorio")
    .email("Debe ser un correo"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener como mínimo 6 caracteres")
    .required("Contraseña es obligatoria"),
});

export const UserRegisterContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [companies, setCompanies] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<
    "success" | "error" | "question" | "none"
  >("none");
  const [modalMessage, setModalMessage] = useState("");

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  async function getCompanies() {
    setIsLoading(true);
    const data = await CompanyService.getCompanies();
    if (data) {
      setCompanies(data);
      setIsLoading(false);
    }
  }

  async function getRoles() {
    setIsLoading(true);
    const data = await RoleService.getRoles();
    if (data) {
      setRoles(data);
      setIsLoading(false);
    }
  }

  async function registerUser(request: UserRegisterRequest) {
    const { data, status }: any = await UserService.registerUser(request);
    if (data.message) {
      setIsModalOpen(true);
      setModalType("success");
      setModalMessage(data.message);
    } else {
      setIsModalOpen(true);
      setModalType("error");
      setModalMessage(ConstantMessage.SERVICE_ERROR);
    }
  }

  const formik = useFormik({
    initialValues: {
      Dni: "",
      Name: "",
      PhoneNumber: "",
      IdRole: "",
      IdCompany: 0,
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      registerUser(values);
    },
  });

  useEffect(() => {
    getCompanies();
    getRoles();
  }, []);

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <div className="py-5 px-8 bg-qLightGray grid grid-cols-12 gap-4 h-screen">
        <div className="col-span-1 w-8 h-8 rounded-full bg-white justify-center items-center">
          <Link to={"/configuracion"}>
            <HiChevronLeft size={"32"} />
          </Link>
        </div>
        <div className="bg-white col-span-8 shadow-sm p-6">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12">
              <h2 className="font-semibold text-xl pb-2">Registrar usuario</h2>
            </div>
            <div className="col-span-6">
              <TextField
                color="primary"
                className="w-full"
                required
                id="Dni"
                name="Dni"
                value={formik.values.Dni}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Dni && Boolean(formik.errors.Dni)}
                helperText={formik.touched.Dni && formik.errors.Dni}
                label="Dni"
              />
            </div>
            <div className="col-span-6">
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
            <div className="col-span-6">
              <TextField
                color="primary"
                className="w-full"
                type="number"
                required
                id="PhoneNumber"
                name="PhoneNumber"
                value={formik.values.PhoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.PhoneNumber &&
                  Boolean(formik.errors.PhoneNumber)
                }
                helperText={
                  formik.touched.PhoneNumber && formik.errors.PhoneNumber
                }
                label="Celular"
              />
            </div>
            <div className="col-span-6">
              <FormControl fullWidth>
                <InputLabel id="RoleLabel">Rol</InputLabel>
                <Select
                  labelId="RoleLabel"
                  id="IdRole"
                  name="IdRole"
                  value={formik.values.IdRole}
                  onChange={formik.handleChange}
                >
                  {roles?.map((role: any) => (
                    <MenuItem key={role.IdRole} value={role.IdRole}>
                      {role.Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col-span-6">
              <FormControl fullWidth>
                <InputLabel id="CompanyLabel">Empresa</InputLabel>
                <Select
                  labelId="CompanyLabel"
                  id="IdCompany"
                  name="IdCompany"
                  value={formik.values.IdCompany}
                  onChange={formik.handleChange}
                >
                  {companies?.map((company: any) => (
                    <MenuItem key={company.IdCompany} value={company.IdCompany}>
                      {company.Name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
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
                label="Correo"
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
                helperText={formik.touched.password && formik.errors.password}
                label="Contraseña"
              />
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="bg-white grid grid-cols-2 shadow-sm p-4">
            <div className="col-span-2">
              <h4 className="text-sm text-qGray font-semibold py-2">ITEMS</h4>
            </div>
            {!isLoading && (
              <div className="col-span-2 flex flex-col">
                {/* {mtParents?.map((parent: any) => (
                  <div key={parent.IdMasterTable}>
                    {parent.IdMasterTable} - {parent.Name}
                  </div>
                ))} */}
              </div>
            )}
            {isLoading && (
              <div className="col-span-2 flex flex-col">
                <Skeleton height={40} animation="wave" />
                <Skeleton height={40} animation="wave" />
                <Skeleton height={40} animation="wave" />
                <Skeleton height={40} animation="wave" />
                <Skeleton height={40} animation="wave" />
                <Skeleton height={40} animation="wave" />
              </div>
            )}
          </div>
          <div className="flex justify-center mt-8">
            <Button
              color="#74C947"
              label="Guardar registro"
              disabled={!formik.isValid}
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
  );
};
