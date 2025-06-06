// Import remultApi for setting up the API with entity definitions
import { remultApi } from "remult/remult-express";
import { Task } from "../shared/Task.js";

export const api = remultApi({
    entities: [Task]
});
