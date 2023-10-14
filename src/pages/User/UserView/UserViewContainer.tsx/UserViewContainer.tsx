import { useFormik } from "formik";
import { MasterTableService } from "../../../../common/services/MasterTableService";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi";
import { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import {
  ConstantLocalStorage,
  ConstantStorageBuckets,
  ConstantsMasterTable,
} from "../../../../common/constants";
import { CompanyService } from "../../../../common/services/CompanyService";
import { UserService } from "../../../../common/services/UserService";
import { RoleService } from "../../../../common/services/RoleService";
import { useAuth } from "../../../../common/contexts/AuthContext";

export const UserViewContainer = () => {
  const supabaseImgUrl =
    import.meta.env.VITE_REACT_APP_SUPABASE_STORAGE_URL +
    ConstantStorageBuckets.USER;
  const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<any>(null);
  const [companies, setCompanies] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [positions, setPositions] = useState<any[]>([]);
  const { user } = useAuth();

  async function getCompanies() {
    const data = await CompanyService.getCompanies();
    if (data) {
      setCompanies(data);
    }
  }

  async function getRoles() {
    const data = await RoleService.getRoles();
    if (data) {
      setRoles(data);
    }
  }

  async function getPositions() {
    const data = await MasterTableService.getMasterTableByIdParent(
      ConstantsMasterTable.POSITIONS
    );
    if (data) {
      setPositions(data);
    }
  }

  async function getUserById(idUser: string) {
    const data = await UserService.getUserById(idUser);
    if (data) {
      setUserData(data);
    }
  }

  async function getAll(idUser: string) {
    setIsLoading(true);
    await getCompanies();
    await getRoles();
    await getPositions();
    await getUserById(idUser);
    setIsLoading(false);
  }

  const formik = useFormik({
    initialValues: {
      Dni: "",
      Name: "",
      PhoneNumber: "",
      IdRole: "",
      IdCompany: "",
      Position: "",
      email: "",
    },
    onSubmit: (values) => {},
  });

  useEffect(() => {
    const idUser = secureLocalStorage.getItem(ConstantLocalStorage.ID_USER);
    if (idUser !== null) {
      getAll(idUser);
    }
  }, []);

  useEffect(() => {
    if (userData) {
      formik.setValues({
        Dni: userData.Dni,
        Name: userData.Name || "",
        IdCompany: userData.IdCompany || "",
        IdRole: userData.IdRole || "",
        PhoneNumber: userData.PhoneNumber || 0,
        Position: userData.Position || "",
        email: userData.email || "",
      });
    }
  }, [userData]);

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <div className="py-5 px-8 bg-qLightGray grid grid-cols-12 gap-4 h-screen">
        <div className="col-span-1 w-8 h-8 rounded-full bg-white justify-center items-center">
          <Link to={"/usuarios"}>
            <HiChevronLeft size={"32"} />
          </Link>
        </div>
        <div className="bg-white col-span-8 shadow-sm p-6">
          {!isLoading && (
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <h2 className="font-semibold text-xl pb-2">Ver usuario</h2>
              </div>
              <div className="col-span-6 flex justify-end">
                {!isLoading && (
                  <div className="w-20 h-20 rounded-full bg-qBlue">
                    <img
                      className=" rounded-full w-full h-full object-cover"
                      src={supabaseUrl + supabaseImgUrl + "/" + user?.ImageUrl}
                      alt="perfil"
                    />
                  </div>
                )}
              </div>
              <div className="col-span-6">
                <TextField
                  color="primary"
                  className="w-full"
                  disabled
                  id="Dni"
                  name="Dni"
                  value={formik.values.Dni}
                  label="Dni"
                />
              </div>
              <div className="col-span-6">
                <TextField
                  color="primary"
                  className="w-full"
                  disabled
                  id="Name"
                  name="Name"
                  value={formik.values.Name}
                  label="Nombre"
                />
              </div>
              <div className="col-span-6">
                <TextField
                  color="primary"
                  className="w-full"
                  type="number"
                  disabled
                  id="PhoneNumber"
                  name="PhoneNumber"
                  value={formik.values.PhoneNumber}
                  label="Celular"
                />
              </div>
              <div className="col-span-6">
                <FormControl fullWidth>
                  <InputLabel id="RoleLabel">Rol</InputLabel>
                  <Select
                    disabled
                    labelId="RoleLabel"
                    id="IdRole"
                    name="IdRole"
                    value={formik.values.IdRole}
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
                    disabled
                    labelId="CompanyLabel"
                    id="IdCompany"
                    name="IdCompany"
                    value={formik.values.IdCompany}
                  >
                    {companies?.map((company: any) => (
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
              <div className="col-span-6">
                <FormControl fullWidth>
                  <InputLabel id="PositionLabel">Cargo</InputLabel>
                  <Select
                    disabled
                    labelId="PositionLabel"
                    id="Position"
                    name="Position"
                    value={formik.values.Position}
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
                  color="primary"
                  className="w-full"
                  disabled
                  id="email"
                  name="email"
                  value={formik.values.email}
                  label="Correo"
                />
              </div>
            </div>
          )}
          {isLoading && (
            <>
              <div className="col-span-6">
                <h2 className="font-semibold text-xl pb-2">Ver usuario</h2>
              </div>
              <div className="col-span-6 flex justify-end">
                <Skeleton variant="circular" width={80} height={80} />
              </div>
              <div className="p-4 grid grid-cols-12 gap-4">
                <Skeleton className="col-span-6" height={40} animation="wave" />
                <Skeleton className="col-span-6" height={40} animation="wave" />
                <Skeleton className="col-span-6" height={40} animation="wave" />
                <Skeleton className="col-span-6" height={40} animation="wave" />
                <Skeleton className="col-span-6" height={40} animation="wave" />
                <Skeleton className="col-span-6" height={40} animation="wave" />
                <Skeleton className="col-span-6" height={40} animation="wave" />
              </div>
            </>
          )}
        </div>
        <div className="col-span-3">
          <div className="bg-white grid grid-cols-2 shadow-sm p-4">
            <div className="col-span-2">
              <h4 className="text-sm text-qGray font-semibold py-2">
                RECOMENDACIONES
              </h4>
            </div>
            <div className="col-span-2 text-sm text-qBlack">
              1. El usuario podrá cambiar su contraseña en el login en "Olvidé
              contraseña"
              <br /> <br />
              2. El usuario solo podrá cambiar su foto de perfil en "Mis Datos".{" "}
              <br /> <br />
              3. Siempre mantener datos del usuario actualizados para envío de
              correos. <br />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
