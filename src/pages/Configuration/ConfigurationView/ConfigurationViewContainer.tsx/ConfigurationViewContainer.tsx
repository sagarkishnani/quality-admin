import { useFormik } from "formik"
import { MasterTableService } from "../../../../common/services/MasterTableService"
import { Skeleton, TextField } from "@mui/material"
import { Link } from "react-router-dom"
import { HiChevronLeft } from "react-icons/hi"
import { useEffect, useState } from "react"
import secureLocalStorage from "react-secure-storage"
import { ConstantLocalStorage } from "../../../../common/constants"

export const ConfigurationViewContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [mtParents, setMtParents] = useState<any>([])
  const [mt, setMt] = useState<any>(null)

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
    onSubmit: (values) => {},
  })

  useEffect(() => {
    const idMasterTable = secureLocalStorage.getItem(
      ConstantLocalStorage.ID_MASTER_TABLE
    )
    if (idMasterTable !== null) {
      getAll(idMasterTable)
    } else {
    }
  }, [])

  return (
    <>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div className="py-5 px-4 md:px-8 bg-qLightGray grid grid-cols-12 gap-4 h-screen">
          <div className="col-span-1 w-8 h-8 rounded-full bg-white justify-center items-center">
            <Link to={"/configuracion"}>
              <HiChevronLeft size={"32"} />
            </Link>
          </div>
          <div className="bg-white col-span-12 md:col-span-8 shadow-sm p-6">
            {!isLoading && (
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                  <h2 className="font-semibold text-xl pb-2">Ver item</h2>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    color="primary"
                    className="w-full"
                    disabled
                    id="IdMasterTable"
                    name="IdMasterTable"
                    value={mt?.IdMasterTable || ""}
                    label="Id"
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    color="primary"
                    className="w-full"
                    disabled
                    id="IdMasterTableParent"
                    name="IdMasterTableParent"
                    value={mt?.IdMasterTableParent || "NULO"}
                    label="Id Padre"
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    color="primary"
                    className="w-full"
                    disabled
                    id="Name"
                    name="Name"
                    value={mt?.Name || "NULO"}
                    label="Nombre"
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    color="primary"
                    className="w-full"
                    disabled
                    id="Value"
                    name="Value"
                    value={mt?.Value || "NULO"}
                    label="Valor"
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    color="primary"
                    className="w-full"
                    disabled
                    id="Order"
                    name="Order"
                    type="number"
                    value={mt?.Order || 0}
                    label="Orden"
                  />
                </div>
              </div>
            )}
            {isLoading && (
              <>
                <div className="col-span-12">
                  <h2 className="font-semibold text-xl pb-2">Ver item</h2>
                </div>
                <div className="p-4 grid grid-cols-12 gap-4">
                  <Skeleton
                    className="col-span-12 md:col-span-6"
                    height={40}
                    animation="wave"
                  />
                  <Skeleton
                    className="col-span-12 md:col-span-6"
                    height={40}
                    animation="wave"
                  />
                  <Skeleton
                    className="col-span-12 md:col-span-6"
                    height={40}
                    animation="wave"
                  />
                  <Skeleton
                    className="col-span-12 md:col-span-6"
                    height={40}
                    animation="wave"
                  />
                  <Skeleton
                    className="col-span-12 md:col-span-6"
                    height={40}
                    animation="wave"
                  />
                  <Skeleton
                    className="col-span-12 md:col-span-6"
                    height={40}
                    animation="wave"
                  />
                  <Skeleton
                    className="col-span-12 md:col-span-6"
                    height={40}
                    animation="wave"
                  />
                </div>
              </>
            )}
          </div>
          <div className="col-span-12 md:col-span-3">
            <div className="bg-white grid grid-cols-2 shadow-sm p-4 mb-8 md:mb-0">
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
          </div>
        </div>
      </form>
    </>
  )
}
