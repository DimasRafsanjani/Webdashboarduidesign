import { Bell, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";

export function TopBar() {
  return (
    <div className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-64 z-10 flex items-center justify-end px-6 gap-4">
      <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
        <Bell className="w-5 h-5 text-gray-600" />
        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
          3
        </Badge>
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-3 hover:bg-gray-100 rounded-lg p-2 transition-colors">
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback className="bg-blue-600 text-white">
                <User className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="text-gray-900">Dr. Ahmad Wijaya</p>
              <p className="text-gray-500 text-xs">Dosen Pembimbing</p>
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profil</DropdownMenuItem>
          <DropdownMenuItem>Pengaturan</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
