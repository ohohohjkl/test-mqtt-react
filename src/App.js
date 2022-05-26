import logo from "./logo.svg";
import "./App.css";
import * as mqtt from "mqtt";

const secretInfo = {
  clientId: "277704e7-98a7-4dd9-9075-ba202c150413-console",
  username: "277704e7-98a7-4dd9-9075-ba202c150413",
  password: "api_e013a016b6b24f6f8dbf2a1c4d8ea23b",
};

const hostDevWS = {
  host: "dev-mqtt.knxbee.com",
  port: 8080,
  protocol: "ws",
};

const hostDevWSS = {
  host: "dev-mqtt.knxbee.com",
  port: 8443,
  protocol: "wss",
};

const hostMosquitto = {
  host: "test.mosquitto.org",
  port: 8081,
  protocol: "wss",
};

function App() {
  const onFileRead = async (e) => {
    const result = e.target.result;

    console.log("result", result);
    const TRUSTED_CA_LIST = Buffer.from(result, "utf-8");

    console.log(TRUSTED_CA_LIST);

    const record = { ...hostDevWSS, ...secretInfo };

    const url = `${record.protocol}://${record.host}:${record.port}/mqtt`;

    const options = {
      protocol: record.protocol,
      // checkServerIdentity: true,
      // ca: TRUSTED_CA_LIST,

      rejectUnauthorized: false,
      ...secretInfo,
    };

    console.log({ url, options });

    const client = await mqtt.connect(url, options);

    client.on("error", function (err) {
      console.log("TEST1", { err });
      client.end();
    });
    client.on("connect", function () {
      console.log("TEST2");
      client.end();
    });

    client.on("message", function (topic, message) {
      console.log("TEST3");
      client.end();
    });
  };

  const onHandleConnectHMQTT = async () => {
    const cert = "./resources/cert/ca.cert";
    const certRaw = await fetch(cert);
    const blob = await certRaw.blob();

    const exampleFileReader = new FileReader();
    exampleFileReader.onload = onFileRead;
    exampleFileReader.readAsText(blob);
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={onHandleConnectHMQTT}>COnnect</button>
        <button onClick={refreshPage}>Refresh</button>
      </header>
    </div>
  );
}

export default App;
