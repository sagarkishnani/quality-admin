import { createClient } from "@supabase/supabase-js"
import {
  CompanyEditRequest,
  CompanyRegisterRequest,
} from "../interfaces/Company.interface"
import { ConstantStorageBuckets } from "../constants"

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_KEY
const supabaseImgUrl =
  import.meta.env.VITE_REACT_APP_SUPABASE_STORAGE_URL +
  ConstantStorageBuckets.COMPANY
const supabase = createClient(supabaseUrl, supabaseKey)

async function getCompanies() {
  try {
    const { data, error } = await supabase
      .from("Company")
      .select(
        "IdCompany, Name, ImgUrl, Ruc, Address, MainContactName, MainContactEmail"
      )
      .eq("RecordStatus", true)

    if (error) {
      console.warn(error)
      return error
    } else if (data) {
      return data
    }
  } catch (error) {
    console.error("Error al obtener las empresas:", error)
    return error
  }
}

async function getCompanyById(idCompany: string) {
  try {
    const { data, error } = await supabase
      .from("Company")
      .select("*")
      .eq("IdCompany", idCompany)

    if (error) {
      console.warn(error)
      return error
    } else if (data) {
      return data[0]
    }
  } catch (error) {
    console.error("Error al traer la empresa:", error)
    return error
  }
}

async function registerCompany(request: CompanyRegisterRequest) {
  try {
    const { data, error, status } = await supabase
      .from("Company")
      .insert([
        {
          Name: request.Name,
          Ruc: request.Ruc,
          Ubigeo: request.Ubigeo,
          Address: request.Address,
          ImgUrl: supabaseUrl + supabaseImgUrl + "/" + request.ImgUrl,
          Local: request.Local,
          MainContactName: request.MainContactName,
          MainContactPosition: request.MainContactPosition,
          MainContactEmail: request.MainContactEmail,
          MainContactPhone: request.MainContactPhone,
          MainContactPayment: request.MainContactPayment,
          MainContactCE: request.MainContactCE,
          MainContactCurrency: request.MainContactCurrency,
          MainContactAlias: request.MainContactAlias,
          MainContactBanks: request.MainContactBanks,
          MainContactEmailInvoice: request.MainContactEmailInvoice,
          MainContactEmailInvoice2: request.MainContactEmailInvoice2,
          BillingContactName: request.BillingContactName,
          BillingContactPosition: request.BillingContactPosition,
          BillingContactEmail: request.BillingContactEmail,
          BillingContactPhone: request.BillingContactPhone,
          BillingContactCellphone: request.BillingContactCellphone,
          ReportContactName: request.ReportContactName,
          ReportContactPosition: request.ReportContactPosition,
          ReportContactEmail: request.ReportContactEmail,
          ReportContactPhone: request.ReportContactPhone,
          ReportContactCellphone: request.ReportContactCellphone,
          PurchaseContactName: request.PurchaseContactName,
          PurchaseContactPosition: request.PurchaseContactPosition,
          PurchaseContactEmail: request.PurchaseContactEmail,
          PurchaseContactPhone: request.PurchaseContactPhone,
          PurchaseContactCellphone: request.PurchaseContactCellphone,
          WarehouseContactName: request.WarehouseContactName,
          WarehouseContactPosition: request.WarehouseContactPosition,
          WarehouseContactEmail: request.WarehouseContactEmail,
          WarehouseContactPhone: request.WarehouseContactPhone,
          WarehouseContactCellphone: request.WarehouseContactCellphone,
          AfterSalesContactName: request.AfterSalesContactName,
          AfterSalesContactPosition: request.AfterSalesContactPosition,
          AfterSalesContactEmail: request.AfterSalesContactEmail,
          AfterSalesContactPhone: request.AfterSalesContactPhone,
          AfterSalesContactCellphone: request.AfterSalesContactCellphone,
        },
      ])
      .select()

    if (error) {
      console.warn(error)
      return { error, status }
    } else if (data) {
      return { data, status }
    }
  } catch (error) {
    console.error("Error al registrar la empresa:", error)
    return error
  }
}

async function editCompany(idCompany: string, request: CompanyEditRequest) {
  try {
    const { data, error, status } = await supabase
      .from("Company")
      .update([
        {
          Name: request.Name,
          Ruc: request.Ruc,
          Ubigeo: request.Ubigeo,
          Address: request.Address,
          ImgUrl: supabaseUrl + supabaseImgUrl + "/" + request.ImgUrl,
          Local: request.Local,
          MainContactName: request.MainContactName,
          MainContactPosition: request.MainContactPosition,
          MainContactEmail: request.MainContactEmail,
          MainContactPhone: request.MainContactPhone,
          MainContactPayment: request.MainContactPayment,
          MainContactCE: request.MainContactCE,
          MainContactCurrency: request.MainContactCurrency,
          MainContactAlias: request.MainContactAlias,
          MainContactBanks: request.MainContactBanks,
          MainContactEmailInvoice: request.MainContactEmailInvoice,
          MainContactEmailInvoice2: request.MainContactEmailInvoice2,
          BillingContactName: request.BillingContactName,
          BillingContactPosition: request.BillingContactPosition,
          BillingContactEmail: request.BillingContactEmail,
          BillingContactPhone: request.BillingContactPhone,
          BillingContactCellphone: request.BillingContactCellphone,
          ReportContactName: request.ReportContactName,
          ReportContactPosition: request.ReportContactPosition,
          ReportContactEmail: request.ReportContactEmail,
          ReportContactPhone: request.ReportContactPhone,
          ReportContactCellphone: request.ReportContactCellphone,
          PurchaseContactName: request.PurchaseContactName,
          PurchaseContactPosition: request.PurchaseContactPosition,
          PurchaseContactEmail: request.PurchaseContactEmail,
          PurchaseContactPhone: request.PurchaseContactPhone,
          PurchaseContactCellphone: request.PurchaseContactCellphone,
          WarehouseContactName: request.WarehouseContactName,
          WarehouseContactPosition: request.WarehouseContactPosition,
          WarehouseContactEmail: request.WarehouseContactEmail,
          WarehouseContactPhone: request.WarehouseContactPhone,
          WarehouseContactCellphone: request.WarehouseContactCellphone,
          AfterSalesContactName: request.AfterSalesContactName,
          AfterSalesContactPosition: request.AfterSalesContactPosition,
          AfterSalesContactEmail: request.AfterSalesContactEmail,
          AfterSalesContactPhone: request.AfterSalesContactPhone,
          AfterSalesContactCellphone: request.AfterSalesContactCellphone,
        },
      ])
      .eq("IdCompany", idCompany)
      .select()

    if (error) {
      console.warn(error)
      return { error, status }
    } else if (data) {
      return { data, status }
    }
  } catch (error) {
    console.error("Error al editar la empresa:", error)
    return error
  }
}

async function uploadCompanyLogo(imgName: string, file: File) {
  try {
    const { data, error } = await supabase.storage
      .from("media")
      .upload("companies" + "/" + imgName, file)

    if (error) {
      console.warn(error)
      return error
    } else if (data) {
      return data
    }
  } catch (error) {
    console.error("Error registering companies:", error)
    return error
  }
}

async function deleteCompany(idCompany: string) {
  try {
    const { data, error, status } = await supabase
      .from("Company")
      .update([
        {
          RecordStatus: false,
        },
      ])
      .eq("IdCompany", idCompany)
      .select()

    if (error) {
      console.warn(error)
      return { error, status }
    } else if (data) {
      return { data, status }
    }
  } catch (error) {
    console.error("Error al eliminar el usuario", error)
    return error
  }
}

export const CompanyService = {
  getCompanies,
  registerCompany,
  editCompany,
  uploadCompanyLogo,
  getCompanyById,
  deleteCompany,
}
