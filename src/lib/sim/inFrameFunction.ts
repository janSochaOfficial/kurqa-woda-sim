import type { dataType } from "./dataType";
import type { userInputs } from "./userInputs";

export type inFrameFunction = (data: dataType, inputs: userInputs) => void;
