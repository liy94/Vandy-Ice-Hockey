import Sequelize from "sequelize";

export default function db_authenticate() {
  const sequelize = new Sequelize(
    "vandy_ice_hockey", //database name
    "root", //user name
    "VandyIceHockey", //password
    {
      host: "localhost",
      dialect: "mysql",
    }
  );

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database: ", error);
    });

  return sequelize;
}
