import { ReactElement } from "react"
import { Link } from "react-router-dom"

interface WelcomeCardInterface {
  icon: ReactElement
  title: string
  description: string
  link: string
}

export const WelcomeCard = ({
  icon,
  title = "Título",
  description = "Descripción",
  link = "/",
}: WelcomeCardInterface) => {
  return (
    <Link to={link}>
      <div className="bg-white shadow-md p-10 w-full md:w-[28rem] mt-4 hover:bg-neutral-100">
        <div>{icon}</div>
        <h2 className="mt-2 font-bold">{title}</h2>
        <p className="mt-2">{description}</p>
      </div>
    </Link>
  )
}
