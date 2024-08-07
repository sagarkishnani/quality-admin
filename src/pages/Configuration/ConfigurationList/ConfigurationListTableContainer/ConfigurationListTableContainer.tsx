import { useEffect, useState } from "react"
import { MasterTableService } from "../../../../common/services/MasterTableService"
import { Link } from "react-router-dom"
import { Button } from "../../../../common/components/Button/Button"
import { Skeleton } from "@mui/material"
import { ConfigurationListTable } from "./ConfigurationListTable/ConfigurationListTable"
import { HiSearch } from "react-icons/hi"

export const ConfigurationListTableContainer = () => {
  const [masterTableValues, setMasterTableValues] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>("")

  async function getMasterTableItems() {
    const data = await MasterTableService.getMasterTableItems()
    if (data) {
      setMasterTableValues(data)
    }
  }

  async function getAll() {
    setIsLoading(true)
    await getMasterTableItems()
    setIsLoading(false)
  }

  const filteredMt = masterTableValues.filter((mt: any) => {
    const searchText = searchValue.toLowerCase()
    return (
      mt?.Name.toLowerCase().includes(searchText) ||
      mt?.IdMasterTable.toLowerCase().includes(searchText)
    )
  })

  useEffect(() => {
    getAll()
  }, [])

  return (
    <div className="p-4 lg:p-8 flex-1">
      <div className="px-4 py-8 flex flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col lg:flex-row lg:flex-wrap items-center">
          <div>
            <h3 className="text-lg font-semibold my-3 lg:mr-4 lg:my-0">
              Configuración
            </h3>
          </div>
          <div className="flex flex-row items-center justify-center flex-wrap w-full lg:w-[28rem] rounded-full bg-qLightGray p-2 border-qGray border-2">
            <div className="w-8 flex justify-center">
              <HiSearch color="#989898" size={"16"} />
            </div>
            <input
              placeholder="Busca por Id o Nombre"
              className="flex-1 bg-transparent focus:outline-none text-sm"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        <div className="my-3 lg:mr-6 lg:my-0 flex justify-center lg:justify-start">
          <Link to={"nueva"}>
            <Button type="button" color="#74C947" label="Agregar item" />
          </Link>
        </div>
      </div>
      {isLoading && (
        <div className="p-4">
          <Skeleton height={40} animation="wave" />
          <Skeleton height={40} animation="wave" />
          <Skeleton height={40} animation="wave" />
          <Skeleton height={40} animation="wave" />
          <Skeleton height={40} animation="wave" />
          <Skeleton height={40} animation="wave" />
          <Skeleton height={40} animation="wave" />
          <Skeleton height={40} animation="wave" />
          <Skeleton height={40} animation="wave" />
        </div>
      )}
      {!isLoading && (
        <ConfigurationListTable data={filteredMt} handleReload={getAll} />
      )}
    </div>
  )
}
