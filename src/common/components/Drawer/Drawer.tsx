import React, { ReactNode } from "react"
import Drawer from "@mui/material/Drawer"

interface CustomDrawerProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({
  open,
  onClose,
  children,
}) => {
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div role="presentation">{children}</div>
    </Drawer>
  )
}

export default CustomDrawer
