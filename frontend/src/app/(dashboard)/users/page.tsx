"use client";

import { CrudPage } from "@/components/crud/CrudPage";
import { userService } from "@/services/generic.service";
import { userConfig } from "./config";

export default function UsersPage() {
  return <CrudPage config={userConfig} service={userService} queryKey="users" />;
}
