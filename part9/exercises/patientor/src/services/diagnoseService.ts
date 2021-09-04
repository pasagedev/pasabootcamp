import { diagnose } from "../types";
import diagnoses from "../../data/diagnoses";

const getDiagnoses = (): diagnose[] => {
    return diagnoses;
};

export default {
    getDiagnoses
};
