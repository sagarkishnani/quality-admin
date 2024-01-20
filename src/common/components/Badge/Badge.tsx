interface BadgeInterface {
  label: string
  status: string
}

export const Badge = ({ label, status }: BadgeInterface) => {
  const getColor = (status: string) => {
    if (status === "Pendiente")
      return { text: "#FFFFFF", background: "#BBBCBD" }
    if (status === "En progreso")
      return { text: "#24272A", background: "#B0E2F5" }
    if (status === "Atendido") return { text: "#24272A", background: "#F7DD81" }
    if (status === "Finalizado")
      return { text: "#FFFFFF", background: "#3DAE2B" }
    if (status === "En espera")
      return { text: "#FFFFFF", background: "#FF8A33" }
    if (status === "Abierto") return { text: "#FFFFFF", background: "#9C2BAE" }
    if (status === "Cancelado")
      return { text: "#24272A", background: "#F78181" }
  }

  return (
    <div
      style={{
        backgroundColor: `${getColor(status)?.background}`,
        color: `${getColor(status)?.text}`,
      }}
      className={`p-2 rounded-full text-xs w-24 text-center`}
    >
      {label}
    </div>
  )
}
