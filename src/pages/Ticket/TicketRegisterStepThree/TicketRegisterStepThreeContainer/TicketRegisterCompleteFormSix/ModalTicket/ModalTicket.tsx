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

interface ModalTicketInterface {
  title: string
  description?: string | null
  open: boolean
  action?: string | null
  modalType: "success" | "error" | "question" | "warning" | "none"
  handleClose: () => void
  handleActionOne?: () => void
  handleActionTwo?: () => void
}
export const ModalTicket = ({
  title,
  description = null,
  open,
  action,
  modalType,
  handleClose,
  handleActionOne,
  handleActionTwo,
}: ModalTicketInterface) => {
  return (
    <Dialog className="" open={open} onClose={handleClose}>
      <div className="w-[32rem]">
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
            <Button
              className="btn-dialog-non-facturable"
              onClick={handleActionOne}
              autoFocus
            >
              NO FACTURABLE
            </Button>
            <Button className="btn-dialog-facturable" onClick={handleActionTwo}>
              FACTURABLE
            </Button>
          </DialogActions>
        )}
      </div>
    </Dialog>
  )
}
