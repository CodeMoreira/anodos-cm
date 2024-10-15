import { ManipulateType } from "dayjs";

export default function splitExpiresInEnv() {
  // regex to replace all characters that are not numbers in JWT_REFRESH_EXPIRES_IN
  const expire_time = Number(
    process.env.JWT_REFRESH_EXPIRES_IN!.replace(/\D/g, "")
  );
  // regex to replace all characters that are numbers in JWT_REFRESH_EXPIRES_IN
  const expire_unit = process.env.JWT_REFRESH_EXPIRES_IN!.replace(
    /\d/g,
    ""
  ) as ManipulateType;

  return { expire_time, expire_unit };
}
