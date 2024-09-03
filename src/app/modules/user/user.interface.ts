export type TUser = {
   uid: string;
   password: string;
   needsPasswordChange: boolean;
   role: "admin" | "student" | "faculty";
   status: "active" | "blocked";
   isDeleted: boolean;
};
