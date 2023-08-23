import { Badge } from "@mui/material";
import { HiChevronDown, HiOutlineBell } from "react-icons/hi";

export const Navbar = () => {
  return (
    <nav className="py-8 px-4 lg:px-12 bg-white shadow-gray-300 shadow-sm w-full">
      <div className="flex flex-row items-center justify-center lg:justify-end space-x-8">
        <div className="flex flex-row items-center flex-wrap space-x-2 cursor-pointer">
          <div className="rounded-full p-2 bg-blue-200">Icon</div>
          <div>
            <h4 className="text-qBlue font-medium">Omar Marquina</h4>
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
  );
};
