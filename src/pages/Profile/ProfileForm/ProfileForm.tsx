import { TextField } from "@mui/material";
import { Button } from "../../../common/components/Button/Button";
import { useFormik } from "formik";
import { useAuth } from "../../../common/contexts/AuthContext";

export const ProfileForm = () => {
  const { user } = useAuth();

  const formik = useFormik({
    initialValues: {
      Name: "",
      Phone: "",
      Email: "",
      Company: "",
      Role: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="p-8">
      <div className="px-4 py-8">
        <h3 className="text-lg font-semibold mr-4">Mis datos</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 justify-items-center">
        <div className="col-span-3 flex justify-center flex-col">
          <div className="w-52 h-52 rounded-full bg-qBlue"></div>
          <Button
            className="mt-3"
            color="#74C947"
            label="Subir una foto"
            type="button"
          />
        </div>
        <div className="col-span-3 w-full">
          <div className="mb-6">
            <TextField
              disabled
              color="primary"
              className="w-full"
              id="Name"
              name="Name"
              value={user?.Name}
              label="Nombre"
            />
          </div>
          <div className="mb-6">
            <TextField
              disabled
              className="w-full"
              id="Phone"
              name="Phone"
              value={user?.PhoneNumber}
              label="Celular"
            />
          </div>
          <div className="mb-6">
            <TextField
              disabled
              className="w-full"
              id="Email"
              name="Email"
              value={user?.email}
              label="Email"
            />
          </div>
          <div className="mb-6">
            <TextField
              disabled
              className="w-full"
              id="Company"
              name="Company"
              label="Empresa"
              value={user?.IdCompany}
            />
          </div>
          <div className="mb-6">
            <TextField
              disabled
              className="w-full"
              id="Role"
              name="Role"
              label="Rol"
              value={user?.IdRole}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
