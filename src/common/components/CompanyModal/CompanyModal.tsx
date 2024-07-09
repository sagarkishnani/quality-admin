import { Dialog, DialogContent } from "@mui/material"
import { GetUserCompany } from "../../interfaces/User.interface"
import { HiLocationMarker } from "react-icons/hi"
import { CompanyService } from "../../services/CompanyService"
import useUserStore from "../../stores/UserStore"

interface CompanyModalInterface {
  title: string
  open: boolean
  companies: GetUserCompany[]
  handleClose: () => void
}
export const CompanyModal = ({
  title,
  open,
  companies,
  handleClose,
}: CompanyModalInterface) => {
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)

  const handleCompany = async (company: GetUserCompany) => {
    const data = await CompanyService.getCompanyById(company.IdCompany)

    if (data) {
      setUser({
        ...user,
        IdCompany: company.IdCompany,
        Company: {
          ...user.Company,
          IdCompany: company.IdCompany,
          Name: company.Name,
          Address: data?.Address,
          Local: data?.Local,
          Ruc: data?.Ruc,
          Mails: data?.Mails,
          RequiresOrder: data?.RequiresOrder,
        },
      })

      handleClose()
    }
  }

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
            {companies.map((company: GetUserCompany) => (
              <div
                className="bg-qLightGray px-6 py-2 m-1 rounded-full hover:bg-qGreen hover:text-white"
                style={
                  company.IdCompany === user?.IdCompany
                    ? { backgroundColor: "#74C947", color: "white" }
                    : {}
                }
                key={company.IdCompany}
              >
                <button onClick={() => handleCompany(company)}>
                  {company.Name}
                </button>
              </div>
            ))}
          </div>
        </DialogContent>
      </div>
    </Dialog>
  )
}
