import { Badge, Menu, MenuItem } from "@mui/material";
import { HiChevronDown, HiOutlineBell } from "react-icons/hi";
import { useState } from "react";
import { UserService } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ConstantStorageBuckets } from "../../constants";
import { HiOutlineUser, HiOutlineLogout } from "react-icons/hi";

export const Navbar = () => {
  const supabaseImgUrl =
    import.meta.env.VITE_REACT_APP_SUPABASE_STORAGE_URL +
    ConstantStorageBuckets.USER;
  const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  async function logout() {
    setIsLoading(true);

    await UserService.logoutUser();

    setUser(null);

    setIsLoading(false);
    navigate("/login");
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfile = () => {
    setAnchorEl(null);
    navigate("mis-datos");
  };

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <nav className="py-8 px-4 lg:px-12 bg-white shadow-gray-300 shadow-sm w-full">
        <div className="flex flex-row items-center justify-center lg:justify-end space-x-8">
          <div className="flex flex-row items-center flex-wrap space-x-2 cursor-pointer">
            <div className="rounded-full bg-blue-200 w-8 h-8">
              <img
                className="rounded-full w-full h-full object-cover"
                src={supabaseUrl + supabaseImgUrl + "/" + user?.ImageUrl}
                alt="perfil"
              />
            </div>
            <div onClick={handleClick}>
              <h4 className="text-qBlue font-semibold">{user?.Name}</h4>
            </div>
            <div>
              <HiChevronDown color="#00A0DF" size={"20"} />
            </div>
          </div>
          <div className="cursor-pointer">
            <Badge badgeContent={4} color="primary">
              <HiOutlineBell color="#00A0DF" size={"24"} />
            </Badge>
          </div>
        </div>
      </nav>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem className="text-qGray" onClick={handleProfile}>
          <HiOutlineUser size={"20"} className="mr-2" />
          Mis datos
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <HiOutlineLogout size={"20"} className="mr-2" />
          Cerrar sesión
        </MenuItem>
      </Menu>
    </>
  );
};
