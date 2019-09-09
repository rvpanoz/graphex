import configDev from "./dev";
import configProd from "./prod";

const selectedConfig =
  process.env.NODE_ENV === "production" ? configProd : configDev;

export default selectedConfig;
