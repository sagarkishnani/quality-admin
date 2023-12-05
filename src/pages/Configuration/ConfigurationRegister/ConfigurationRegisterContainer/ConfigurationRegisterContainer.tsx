import * as yup from "yup"
import { HiChevronLeft } from "react-icons/hi"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { MasterTableRegisterRequest } from "../../../../common/interfaces/MasterTable.interface"
import { MasterTableService } from "../../../../common/services/MasterTableService"
import {
  ConstantHttpErrors,
  ConstantMasterTableMessage,
  ConstantMessage,
} from "../../../../common/constants"
import { Link, useNavigate } from "react-router-dom"
import { Skeleton, TextField } from "@mui/material"
import { Button } from "../../../../common/components/Button/Button"
import { Modal } from "../../../../common/components/Modal/Modal"

const validationSchema = yup.object({
  IdMasterTable: yup
    .string()
    .min(5, "El IdMasterTable debe tener como mínimo 5 caracteres")
    .max(5, "El IdMasterTable debe tener como máximo 5 caracteres")
    .required("IdMasterTable es obligatorio"),
  IdMasterTableParent: yup
    .string()
    .min(5, "El IdMasterTableParent debe tener como mínimo 5 caracteres")
    .max(5, "El IdMasterTableParent debe tener como máximo 5 caracteres"),
  Name: yup.string().required("Nombre es obligatorio"),
  Value: yup.string(),
  Order: yup.number().required("Orden es obligatorio"),
})

export const ConfigurationRegisterContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingAction, setIsLoadingAction] = useState<boolean>(false)
  const [mtParents, setMtParents] = useState<any>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<
    "success" | "error" | "question" | "none"
  >("none")
  const [modalMessage, setModalMessage] = useState("")
  const navigate = useNavigate()

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  async function getMtParents() {
    setIsLoading(true)
    const data = await MasterTableService.getMasterTableParents()
    if (data) {
      setMtParents(data)
      setIsLoading(false)
    }
  }

  async function registerMt(request: MasterTableRegisterRequest) {
    setIsLoadingAction(true)

    const { data, status }: any = await MasterTableService.registerMasterTable(
      request
    )
    if (status == ConstantHttpErrors.CREATED) {
      setIsModalOpen(true)
      setModalType("success")
      setModalMessage(ConstantMasterTableMessage.MT_REGISTER_SUCCESS)

      setIsLoadingAction(false)
      setTimeout(() => {
        navigate("/configuracion")
      }, 2000)
    } else if (status == ConstantHttpErrors.DUPLICATED) {
      setIsLoadingAction(false)
      setIsModalOpen(true)
      setModalType("error")
      setModalMessage(ConstantMessage.SERVICE_DUPLICATED)
    } else {
      setIsLoadingAction(false)
      setIsModalOpen(true)
      setModalType("error")
      setModalMessage(ConstantMessage.SERVICE_ERROR)
    }
  }

  const formik = useFormik({
    initialValues: {
      IdMasterTable: "",
      IdMasterTableParent: "",
      Name: "",
      Value: "",
      Order: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      registerMt(values)
    },
  })

  useEffect(() => {
    getMtParents()
  }, [])

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
              <h2 className="font-semibold text-xl pb-2">Registrar item</h2>
            </div>
            <div className="col-span-6">
              <TextField
                color="primary"
                className="w-full"
                required
                id="IdMasterTable"
                name="IdMasterTable"
                value={formik.values.IdMasterTable}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.IdMasterTable &&
                  Boolean(formik.errors.IdMasterTable)
                }
                helperText={
                  formik.touched.IdMasterTable && formik.errors.IdMasterTable
                }
                label="IdMasterTable"
              />
            </div>
            <div className="col-span-6">
              <TextField
                color="primary"
                className="w-full"
                id="IdMasterTableParent"
                name="IdMasterTableParent"
                value={formik.values.IdMasterTableParent}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.IdMasterTableParent &&
                  Boolean(formik.errors.IdMasterTableParent)
                }
                helperText={
                  formik.touched.IdMasterTableParent &&
                  formik.errors.IdMasterTableParent
                }
                label="IdMasterTableParent"
              />
            </div>
            <div className="col-span-6">
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
            <div className="col-span-6">
              <TextField
                color="primary"
                className="w-full"
                id="Value"
                name="Value"
                value={formik.values.Value}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Value && Boolean(formik.errors.Value)}
                helperText={formik.touched.Value && formik.errors.Value}
                label="Valor"
              />
            </div>
            <div className="col-span-6">
              <TextField
                color="primary"
                className="w-full"
                required
                id="Order"
                name="Order"
                type="number"
                value={formik.values.Order}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Order && Boolean(formik.errors.Order)}
                helperText={formik.touched.Order && formik.errors.Order}
                label="Orden"
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
                {mtParents?.map((parent: any) => (
                  <div key={parent.IdMasterTable}>
                    {parent.IdMasterTable} - {parent.Name}
                  </div>
                ))}
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
              disabled={!formik.isValid || isLoadingAction}
              isLoading={isLoadingAction}
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
  )
}
