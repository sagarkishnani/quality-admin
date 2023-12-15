import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material"

import {
  HiCheckCircle,
  HiExclamationCircle,
  HiQuestionMarkCircle,
  HiXCircle,
} from "react-icons/hi"

interface ModalInterface {
  title: string
  description?: string | null
  open: boolean
  action?: string | null
  modalType: "success" | "error" | "question" | "warning" | "none"
  handleClose: () => void
  handleAction?: () => void
}
export const Modal = ({
  title,
  description = null,
  open,
  action,
  modalType,
  handleClose,
  handleAction,
}: ModalInterface) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <div className="w-full md:w-[32rem]">
        <div className="flex justify-center pt-12 pb-4">
          {modalType === "none" ? null : modalType === "success" ? (
            <HiCheckCircle color="#3DAE2B" size={"60"} />
          ) : modalType === "question" ? (
            <HiQuestionMarkCircle color="#EEAB29" size={"60"} />
          ) : modalType === "error" ? (
            <HiXCircle color="#C94F47" size={"60"} />
          ) : (
            <HiExclamationCircle color="#EEAB29" size={"60"} />
          )}
        </div>
        <h2
          style={{ paddingBottom: `${action ? "2rem" : "6rem"}` }}
          className="font-semibold text-xl text-center"
        >
          {title}
        </h2>

        {description && (
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {description}
            </DialogContentText>
          </DialogContent>
        )}

        {action && (
          <DialogActions>
            <Button className="btn-dialog-cancel" onClick={handleClose}>
              No, cerrar
            </Button>
            <Button className="btn-dialog-ok" onClick={handleAction} autoFocus>
              Sí, {action}
            </Button>
          </DialogActions>
        )}
      </div>
    </Dialog>
  )
}
