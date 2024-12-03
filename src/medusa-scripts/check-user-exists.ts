import { ExecArgs, IUserModuleService } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";

export default async function checkUserExists({ container, args }: ExecArgs) {
  const userModuleService: IUserModuleService = container.resolve(Modules.USER);

  if (!args[0]) {
    console.error("Please provide a user email as an argument.");
    return;
  }

  const email = args[0];

  try {
    const [users, count] = await userModuleService.listAndCountUsers({
      email: email,
    });

    if (count > 0) {
      console.log(`User with email ${email} exists.`);
    } else {
      console.log(`User with email ${email} does not exist.`);
    }
  } catch (error) {
    console.error("An error occurred while checking for the user:", error);
  }
}
