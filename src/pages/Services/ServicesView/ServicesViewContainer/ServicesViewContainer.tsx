import { useFormik } from "formik"
import { Skeleton, TextField } from "@mui/material"
import { Link } from "react-router-dom"
import { HiChevronLeft } from "react-icons/hi"
import { useEffect, useState } from "react"
import secureLocalStorage from "react-secure-storage"
import { ConstantLocalStorage } from "../../../../common/constants"
import { ServicesService } from "../../../../common/services/ServicesService"

export const ServicesViewContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [service, setService] = useState<any>(null)

  async function getServiceById(idService: string) {
    const data = await ServicesService.getServiceById(idService)
    if (data) {
      setService(data)
    }
  }

  async function getAll(idService: string) {
    setIsLoading(true)
    await getServiceById(idService)
    setIsLoading(false)
  }

  const formik = useFormik({
    initialValues: {
      Name: "",
      Cost: 0,
    },
    onSubmit: (values) => {},
  })

  useEffect(() => {
    const idService = secureLocalStorage.getItem(
      ConstantLocalStorage.ID_SERVICE
    )
    if (idService !== null) {
      getAll(idService)
    }
  }, [])

  return (
    <>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div className="py-5 px-4 md:px-8 bg-qLightGray grid grid-cols-12 gap-4">
          <div className="col-span-1 w-8 h-8 rounded-full bg-white justify-center items-center">
            <Link to={"/servicios"}>
              <HiChevronLeft size={"32"} />
            </Link>
          </div>
          <div className="bg-white col-span-12  shadow-sm p-6">
            {!isLoading && (
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12">
                  <h2 className="font-semibold text-xl pb-2">Ver servicio</h2>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    color="primary"
                    className="w-full"
                    disabled
                    id="Name"
                    name="Name"
                    value={service?.Name || ""}
                    label="Nombre"
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <TextField
                    color="primary"
                    className="w-full"
                    disabled
                    id="Cost"
                    name="Cost"
                    value={service?.Cost || 0}
                    label="Costo"
                  />
                </div>
              </div>
            )}
            {isLoading && (
              <>
                <div className="col-span-12">
                  <h2 className="font-semibold text-xl pb-2">Ver servicio</h2>
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
        </div>
      </form>
    </>
  )
}
