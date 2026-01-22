"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateRoleAction } from "./actions";
import { useState } from "react";
// import { useToast } from "@/hooks/use-toast";

interface RoleSelectorProps {
  userId: string;
  currentRole: string | null;
}

export function RoleSelector({ userId, currentRole }: RoleSelectorProps) {
  const [loading, setLoading] = useState(false);

  const handleValueChange = async (newRole: string) => {
    setLoading(true);
    try {
      await updateRoleAction(userId, newRole);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-end">
      <Select 
        onValueChange={handleValueChange}
        defaultValue={currentRole || "user"}
        disabled={loading}
      >
        <SelectTrigger className="w-[140px] bg-[#111111] border-white/10 text-xs focus:ring-[#C6FF5B] disabled:opacity-50">
          <SelectValue placeholder="Cambiar rol" />
        </SelectTrigger>
        <SelectContent className="bg-[#111111] border-white/10 text-white">
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="asistente">Asistente</SelectItem>
          <SelectItem value="editor">Editor</SelectItem>
          <SelectItem value="user">Usuario Standard</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}