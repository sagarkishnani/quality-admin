import { Dialog } from "@mui/material"

interface ImageModalInterface {
  open: boolean
  img: string
  handleClose: () => void
}
export const ImageModal = ({ open, img, handleClose }: ImageModalInterface) => {
  return (
    <Dialog className="" open={open} onClose={handleClose}>
      <div className="w-[32rem]">
        <img className="object-cover w-full" src={img} alt="" />
      </div>
    </Dialog>
  )
}
