import { Dialog, DialogContent } from "@mui/material"
import { GetUserCompany, UserCompany } from "../../interfaces/User.interface"
import { HiLocationMarker } from "react-icons/hi"
import { useAuth } from "../../contexts/AuthContext"
import { useEffect, useState } from "react"
import { CompanyService } from "../../services/CompanyService"

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
  const { user, setUser } = useAuth()

  const handleCompany = async (company: GetUserCompany) => {
    const data = await CompanyService.getCompanyById(company.IdCompany)
    user!.IdCompany = company.IdCompany
    user!.Company.IdCompany = company.IdCompany
    user!.Company.Name = company.Name

    if (data) {
      user!.Company.Address = data?.Address
      user!.Company.Local = data?.Local
      user!.Company.Ruc = data?.Ruc
      user!.Company.Mails = data?.Mails
      user!.Company.RequiresOrder = data?.RequiresOrder
      setUser(user)
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
