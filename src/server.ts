import app from './app/app';
import {server_config} from "./app/config/development.json"

const appPort = process.env.PORT || server_config.port

app.listen(appPort, () => {
  console.log("Node server started running");
});