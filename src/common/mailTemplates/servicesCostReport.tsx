import React from "react"
import bg from "../../assets/mailBackgrounds/servicesReportNewBG.svg"

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
  Code: string
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
          top: "125px",
          left: "620px",
          width: "160px",
        }}
      >
        {data.CodeTicket}
      </div>
      <div
        style={{
          position: "absolute",
          top: "159px",
          left: "150px",
          width: "200px",
        }}
      >
        {data.ServiceDate}
      </div>
      <div
        style={{
          position: "absolute",
          top: "198px",
          left: "150px",
          width: "400px",
        }}
      >
        {data.Company}
      </div>
      <div
        style={{
          position: "absolute",
          top: "241px",
          left: "150px",
          width: "400px",
        }}
      >
        {data.UserCompany}
      </div>

      {/* Tabla de servicios */}
      {data.CostService.map((item, index) => {
        const topOffset = 468 + index * 35
        return (
          <React.Fragment key={index}>
            <div
              style={{
                position: "absolute",
                top: `${topOffset}px`,
                left: "70px",
                width: "200px",
                lineHeight: "14px",
              }}
            >
              {item.Code}
            </div>
            <div
              style={{
                position: "absolute",
                top: `${topOffset}px`,
                left: "210px",
                width: "310px",
                lineHeight: "14px",
              }}
            >
              {item.Name}
            </div>
            <div
              style={{
                position: "absolute",
                top: `${topOffset}px`,
                left: "510px",
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
                left: "525px",
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
                left: "590px",
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
      {/* <div
        style={{
          position: "absolute",
          top: "775px",
          left: "590px",
          width: "100px",
          textAlign: "right",
        }}
      >
        {data.Subtotal}
      </div> */}
      <div
        style={{
          position: "absolute",
          top: "732px",
          left: "590px",
          width: "100px",
          textAlign: "right",
        }}
      >
        {data.IGV}
      </div>
      <div
        style={{
          position: "absolute",
          top: "755px",
          left: "590px",
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
