import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../../../../common/components/Button/Button"
import { Skeleton } from "@mui/material"
import { UserListTable } from "./UserListTable/UserListTable"
import { HiSearch } from "react-icons/hi"
import { UserService } from "../../../../common/services/UserService"

export const UserListTableContainer = () => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>("")

  async function getUsers() {
    const data = await UserService.getUsers()
    if (data) {
      const output_data = data.map((entry) => ({
        IdUser: entry.IdUser,
        Dni: entry.Dni,
        Name: entry?.Name,
        email: entry.email,
        PhoneNumber: entry.PhoneNumber,
        Company: entry?.Company.Name,
        Role: entry?.Role.Name,
      }))
      setUsers(output_data)
    }
  }

  async function getAll() {
    setIsLoading(true)
    await getUsers()
    setIsLoading(false)
  }

  const filteredUsers = users.filter((user: any) => {
    const searchText = searchValue.toLowerCase()
    return (
      user?.Name.toLowerCase().includes(searchText) ||
      (user?.Dni).toString().toLowerCase().includes(searchText)
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
              Usuarios
            </h3>
          </div>
          <div className="flex flex-row items-center justify-center flex-wrap w-full lg:w-[28rem] rounded-full bg-qLightGray p-2 border-qGray border-2">
            <div className="w-8 flex justify-center">
              <HiSearch color="#989898" size={"16"} />
            </div>
            <input
              placeholder="Busca por DNI o Nombre"
              className="flex-1 bg-transparent focus:outline-none text-sm"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        <div className="my-3 lg:mr-6 lg:my-0 flex justify-center lg:justify-start">
          <Link to={"nuevo"}>
            <Button type="button" color="#74C947" label="Agregar usuario" />
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
        <UserListTable data={filteredUsers} handleReload={getAll} />
      )}
    </div>
  )
}
