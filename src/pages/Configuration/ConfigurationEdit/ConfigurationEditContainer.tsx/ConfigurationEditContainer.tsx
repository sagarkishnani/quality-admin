import { useFormik } from "formik"
import { MasterTableService } from "../../../../common/services/MasterTableService"
import { Skeleton, TextField } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { HiChevronLeft } from "react-icons/hi"
import { useEffect, useState } from "react"
import secureLocalStorage from "react-secure-storage"
import * as yup from "yup"
import {
  ConstantHttpErrors,
  ConstantLocalStorage,
  ConstantMasterTableMessage,
  ConstantMessage,
} from "../../../../common/constants"
import { Button } from "../../../../common/components/Button/Button"
import { MasterTableEditRequest } from "../../../../common/interfaces/MasterTable.interface"
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

export const ConfigurationEditContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingAction, setIsLoadingAction] = useState<boolean>(false)
  const [mtParents, setMtParents] = useState<any>([])
  const [mt, setMt] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<
    "success" | "error" | "question" | "none"
  >("none")
  const [modalMessage, setModalMessage] = useState("")
  const navigate = useNavigate()

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  async function editMt(request: MasterTableEditRequest) {
    setIsLoadingAction(true)

    const { data, status }: any = await MasterTableService.editMasterTable(
      request,
      mt.IdMasterTable
    )
    if (status == ConstantHttpErrors.OK) {
      setIsModalOpen(true)
      setModalType("success")
      setModalMessage(ConstantMasterTableMessage.MT_EDIT_SUCCESS)

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

  async function getMtParents() {
    const data = await MasterTableService.getMasterTableParents()
    if (data) {
      setMtParents(data)
    }
  }

  async function getMtById(idMasterTable: string) {
    const data = await MasterTableService.getMasterTableById(idMasterTable)
    if (data) {
      setMt(data)
    }
  }

  async function getAll(idMasterTable: string) {
    setIsLoading(true)
    await getMtById(idMasterTable)
    await getMtParents()
    setIsLoading(false)
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
      editMt(values)
    },
  })

  useEffect(() => {
    const idMasterTable = secureLocalStorage.getItem(
      ConstantLocalStorage.ID_MASTER_TABLE
    )
    if (idMasterTable !== null) {
      getAll(idMasterTable)
    }
  }, [])

  useEffect(() => {
    if (mt) {
      formik.setValues({
        IdMasterTable: mt.IdMasterTable,
        IdMasterTableParent: mt.IdMasterTableParent || "",
        Name: mt.Name || "",
        Value: mt.Value || "",
        Order: mt.Order || 0,
      })
    }
  }, [mt])

  return (
    <>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div className="py-5 px-8 bg-qLightGray grid grid-cols-12 gap-4 h-screen">
          <div className="col-span-1 w-8 h-8 rounded-full bg-white justify-center items-center">
            <Link to={"/configuracion"}>
              <HiChevronLeft size={"32"} />
            </Link>
          </div>
          <div className="bg-white col-span-8 shadow-sm p-6">
            {!isLoading && (
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                  <h2 className="font-semibold text-xl pb-2">Editar item</h2>
                </div>
                <div className="col-span-6">
                  <TextField
                    color="primary"
                    className="w-full"
                    disabled
                    id="IdMasterTable"
                    name="IdMasterTable"
                    value={mt?.IdMasterTable || ""}
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
            )}
            {isLoading && (
              <>
                <div className="col-span-12">
                  <h2 className="font-semibold text-xl pb-2">Editar item</h2>
                </div>
                <div className="p-4 grid grid-cols-12 gap-4">
                  <Skeleton
                    className="col-span-6"
                    height={40}
                    animation="wave"
                  />
                  <Skeleton
                    className="col-span-6"
                    height={40}
                    animation="wave"
                  />
                  <Skeleton
                    className="col-span-6"
                    height={40}
                    animation="wave"
                  />
                  <Skeleton
                    className="col-span-6"
                    height={40}
                    animation="wave"
                  />
                  <Skeleton
                    className="col-span-6"
                    height={40}
                    animation="wave"
                  />
                  <Skeleton
                    className="col-span-6"
                    height={40}
                    animation="wave"
                  />
                  <Skeleton
                    className="col-span-6"
                    height={40}
                    animation="wave"
                  />
                </div>
              </>
            )}
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
                className="hover:bg-qDarkGreen"
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
    </>
  )
}
