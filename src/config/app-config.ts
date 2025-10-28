import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Raigam SFA",
  version: packageJson.version,
  copyright: `© ${currentYear}, Raigam IT Department.`,
  meta: {
    title: "Raigam SFA",
    description:
      "Raigam SFA is a comprehensive sales force automation tool designed to streamline sales processes and enhance productivity.",
  },
};
