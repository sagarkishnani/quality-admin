import { Dialog, DialogContent } from "@mui/material"
import { GetUserCompany, GetUserLocal } from "../../interfaces/User.interface"
import { HiLocationMarker } from "react-icons/hi"
import { CompanyService } from "../../services/CompanyService"
import useUserStore from "../../stores/UserStore"
import { CompanyLocalService } from "../../services/CompanyLocalService"
import { CompanyLocal } from "../../interfaces/CompanyLocal.interface"
import { useEffect } from "react"

interface CompanyModalInterface {
  title: string
  open: boolean
  locals: GetUserLocal[]
  handleClose: () => void
}
export const CompanyModal = ({
  title,
  open,
  locals,
  handleClose,
}: CompanyModalInterface) => {
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)

  const handleCompany = async (local: GetUserLocal) => {
    const data = await CompanyService.getCompanyById(local.IdCompany)
    const localData = await CompanyLocalService.getLocalsByIdCompany(
      local.IdCompany
    )[0]

    if (data && localData) {
      setUser({
        ...user,
        IdCompany: local.IdCompany,
        Company: {
          ...user.Company,
          IdCompany: local.IdCompany,
          Name: local.Name,
          Address: data?.Address,
          Local: data?.Local,
          Ruc: data?.Ruc,
          Mails: data?.Mails,
          RequiresOrder: data?.RequiresOrder,
        },
        IdLocal: {
          IdCompanyLocal: localData.IdCompanyLocal,
          IdCompany: company.IdCompany,
          Name: localData.Name,
          Address: localData.Address,
          Mails: localData.Mails,
        },
      })

      handleClose()
    }
  }

  useEffect(() => {
    console.log(locals)
  }, [user])

  return (
    <Dialog open={open} onClose={handleClose}>
      <div className="w-full md:w-[36rem] p-12 flex flex-col justify-center space-y-2">
        <div className="m-auto">
          <HiLocationMarker color="#74C947" size={"60"} />
        </div>
        <div>
          <h2 className="font-semibold text-xl text-center">{title}</h2>
        </div>
        <DialogContent>
          <div className="flex flex-row flex-wrap justify-center">
            {locals?.map((local: GetUserLocal) => (
              <div
                className="bg-qLightGray px-6 py-2 m-1 rounded-full hover:bg-qGreen hover:text-white"
                style={
                  local?.IdLocal === user?.IdLocal?.IdCompanyLocal
                    ? { backgroundColor: "#74C947", color: "white" }
                    : {}
                }
                key={local?.IdLocal}
              >
                <button onClick={() => handleCompany(local)}>
                  {local?.Name}
                </button>
              </div>
            ))}
          </div>
        </DialogContent>
      </div>
    </Dialog>
  )
}
