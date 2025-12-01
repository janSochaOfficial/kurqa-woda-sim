import type { simData } from "../types/simData";
import type { userInputs } from "../types/userInputs";

export type frameHandler = (data: simData, inputs: userInputs) => void;
