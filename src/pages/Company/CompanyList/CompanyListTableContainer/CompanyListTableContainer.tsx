import { HiSearch } from "react-icons/hi"
import { Button } from "../../../../common/components/Button/Button"
import { CompanyListTable } from "./CompanyListTable/CompanyListTable"
import { useEffect, useState } from "react"
import { CompanyService } from "../../../../common/services/CompanyService"
import { Skeleton } from "@mui/material"
import { Link } from "react-router-dom"

export const CompanyListTableContainer = () => {
  const [companies, setCompanies] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>("")

  async function getCompanies() {
    const data = await CompanyService.getCompanies()
    if (data) {
      setCompanies(data)
    }
  }

  async function getAll() {
    setIsLoading(true)
    await getCompanies()
    setIsLoading(false)
  }

  const filteredCompanies = companies.filter((company: any) => {
    const searchText = searchValue.toLowerCase()
    return (
      company?.Ruc.toString().includes(searchText) ||
      company?.Name.toLowerCase().includes(searchText)
    )
  })

  useEffect(() => {
    getAll()
  }, [])

  return (
    <div className="p-8 flex-1">
      <div className="px-4 py-8 flex justify-between">
        <div className="flex flex-row flex-wrap items-center">
          <div>
            <h3 className="text-lg font-semibold mr-4">Empresas</h3>
          </div>
          <div className="flex flex-row items-center justify-center flex-wrap w-[28rem] rounded-full bg-qLightGray p-2 border-qGray border-2">
            <div className="w-8 flex justify-center">
              <HiSearch color="#989898" size={"16"} />
            </div>
            <input
              placeholder="Busca por RUC o nombre de empresa"
              className="flex-1 bg-transparent focus:outline-none text-sm"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        <div className="mr-6">
          <Link to={"nueva"}>
            <Button type="button" color="#74C947" label="Agregar empresa" />
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
        <CompanyListTable rows={filteredCompanies} handleReload={getAll} />
      )}
    </div>
  )
}
