import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log(
        `MongoDB connected on ${connection.host}:${connection.port}/${connection.name}`
      );
    });
    connection.on("error", (err) => {
      console.log(`MongoDB error: ${err}`);
      process.exit();
    });
  } catch (error) {
    console.log("Error connecting to database: ", error);
  }
}
