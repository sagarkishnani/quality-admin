import React from "react"
import bg from "../../assets/mailBackgrounds/servicesReportBG.svg"

export interface ServicePdfData {
  CodeTicket: string
  ServiceDate: string
  Company: string
  UserCompany: string
  CostService: CostService[]
  Subtotal: string
  IGV: string
  Total: string
}

export interface CostService {
  Name: string
  Quantity: string
  Price: string
  TotalPrice: string
}

export default function CostServiceReport({ data }: { data: ServicePdfData }) {
  return (
    <div style={{ position: "relative", fontSize: "12px", width: "780px" }}>
      <img src={bg} width="100%" />

      {/* Campos superiores */}
      <div
        style={{
          position: "absolute",
          top: "220px",
          left: "570px",
          width: "160px",
        }}
      >
        {data.CodeTicket}
      </div>
      <div
        style={{
          position: "absolute",
          top: "235px",
          left: "120px",
          width: "200px",
        }}
      >
        {data.ServiceDate}
      </div>
      <div
        style={{
          position: "absolute",
          top: "275px",
          left: "120px",
          width: "400px",
        }}
      >
        {data.Company}
      </div>
      <div
        style={{
          position: "absolute",
          top: "315px",
          left: "120px",
          width: "400px",
        }}
      >
        {data.UserCompany}
      </div>

      {/* Tabla de servicios */}
      {data.CostService.map((item, index) => {
        const topOffset = 535 + index * 28
        return (
          <React.Fragment key={index}>
            <div
              style={{
                position: "absolute",
                top: `${topOffset}px`,
                left: "120px",
                width: "300px",
                lineHeight: "14px",
              }}
            >
              {item.Name}
            </div>
            <div
              style={{
                position: "absolute",
                top: `${topOffset}px`,
                left: "400px",
                width: "60px",
                textAlign: "center",
              }}
            >
              {item.Quantity}
            </div>
            <div
              style={{
                position: "absolute",
                top: `${topOffset}px`,
                left: "460px",
                width: "100px",
                textAlign: "right",
              }}
            >
              {item.Price}
            </div>
            <div
              style={{
                position: "absolute",
                top: `${topOffset}px`,
                left: "560px",
                width: "100px",
                textAlign: "right",
              }}
            >
              {item.TotalPrice}
            </div>
          </React.Fragment>
        )
      })}

      {/* Totales */}
      <div
        style={{
          position: "absolute",
          top: "775px",
          left: "540px",
          width: "100px",
          textAlign: "right",
        }}
      >
        {data.Subtotal}
      </div>
      <div
        style={{
          position: "absolute",
          top: "800px",
          left: "540px",
          width: "100px",
          textAlign: "right",
        }}
      >
        {data.IGV}
      </div>
      <div
        style={{
          position: "absolute",
          top: "825px",
          left: "540px",
          width: "100px",
          fontWeight: "bold",
          textAlign: "right",
        }}
      >
        {data.Total}
      </div>
    </div>
  )
}
