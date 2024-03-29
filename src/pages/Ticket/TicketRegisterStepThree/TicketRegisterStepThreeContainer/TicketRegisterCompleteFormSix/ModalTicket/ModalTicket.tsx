import {
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
import { Button } from "../../../../../../common/components/Button/Button"

interface ModalTicketInterface {
  title: string
  description?: string | null
  open: boolean
  action?: string | null
  modalType: "success" | "error" | "question" | "warning" | "none"
  isLoadingFacturable: boolean
  isLoadingNonFacturable: boolean
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
  isLoadingFacturable,
  isLoadingNonFacturable,
}: ModalTicketInterface) => {
  return (
    <Dialog className="" open={open} onClose={handleClose}>
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
            <Button
              onClick={handleActionOne}
              color="#00A0DF"
              label="No Facturable"
              isLoading={isLoadingNonFacturable}
              type="button"
              disabled={isLoadingNonFacturable}
            />
            <Button
              onClick={handleActionTwo}
              color="#74C947"
              label="Facturable"
              isLoading={isLoadingFacturable}
              type="button"
              disabled={isLoadingFacturable}
            />
          </DialogActions>
        )}
      </div>
    </Dialog>
  )
}
