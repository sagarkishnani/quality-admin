import { Skeleton, TextField } from "@mui/material"
import { useFormik } from "formik"
import { v4 as uuidv4 } from "uuid"
import { useState, useEffect } from "react"
import { UserService } from "../../../common/services/UserService"
import { ConstantStorageBuckets } from "../../../common/constants"
import unknownUser from "../../../assets/images/user/unknown.png"
import useUserStore from "../../../common/stores/UserStore"

export const ProfileForm = () => {
  const supabaseImgUrl =
    import.meta.env.VITE_REACT_APP_SUPABASE_STORAGE_URL +
    ConstantStorageBuckets.USER
  const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [imgEvent, setImgEvent] = useState<any>()

  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)

  const handleImageChange = async (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setImgEvent(e.target.files[0])
    }
  }

  async function uploadUserPicture(imageFile: any) {
    setIsLoading(true)
    const dataImage: any = await UserService.uploadUserPicture(
      uuidv4(),
      imageFile
    )
    const imgId = dataImage?.path.slice(dataImage?.path.lastIndexOf("/") + 1)

    await UserService.updatePicture(user!.IdUser, imgId)

    if (user) {
      const updatedUser = { ...user, ImageUrl: imgId }
      setUser(updatedUser)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (imgEvent !== undefined) {
      uploadUserPicture(imgEvent)
    }
  }, [imgEvent])

  return (
    <div className="p-8">
      <div className="px-4 py-8">
        <h3 className="text-lg font-semibold mr-4">Mis datos</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 justify-items-center">
        <div className="col-span-3 flex justify-center flex-col">
          {!isLoading && (
            <div className="w-52 h-52 rounded-full bg-qBlue">
              <img
                className=" rounded-full w-full h-full object-cover"
                src={
                  user?.ImageUrl == null
                    ? unknownUser
                    : supabaseUrl + supabaseImgUrl + "/" + user?.ImageUrl
                }
                alt="perfil"
              />
            </div>
          )}
          {isLoading && (
            <div>
              <Skeleton variant="circular" width={208} height={208} />
            </div>
          )}

          <input
            className="hidden"
            type="file"
            name="ImgUrl"
            id="ImgUrl"
            onChange={handleImageChange}
            accept="image/png, image/jpeg, image/jpg"
          />
          <label
            className="rounded-full px-6 py-2 bg-qGreen mt-4 text-white text-center font-medium cursor-pointer text-ellipsis whitespace-nowrap overflow-hidden text-sm hover:bg-qDarkGreen"
            htmlFor="ImgUrl"
          >
            Cambiar perfil
          </label>
        </div>
        <div className="col-span-3 w-full">
          <div className="mb-6">
            <TextField
              disabled
              color="primary"
              className="w-full"
              id="Name"
              name="Name"
              value={user?.Name}
              label="Nombre"
            />
          </div>
          <div className="mb-6">
            <TextField
              disabled
              className="w-full"
              id="Phone"
              name="Phone"
              value={user?.PhoneNumber}
              label="Celular"
            />
          </div>
          <div className="mb-6">
            <TextField
              disabled
              className="w-full"
              id="Email"
              name="Email"
              value={user?.email}
              label="Email"
            />
          </div>
          <div className="mb-6">
            <TextField
              disabled
              className="w-full"
              id="Company"
              name="Company"
              label="Empresa"
              value={user?.Company.Name}
            />
          </div>
          {/* <div className="mb-6">
            <TextField
              disabled
              className="w-full"
              id="Local"
              name="Local"
              label="Local"
              value={user?.Local?.Name}
            />
          </div> */}
          <div className="mb-6">
            <TextField
              disabled
              className="w-full"
              id="Role"
              name="Role"
              label="Rol"
              value={user?.Role.Name}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
