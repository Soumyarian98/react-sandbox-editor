import { useDispatch } from "react-redux";
import { AppDispatch } from "../state";

export const useTypedDispatch: () => AppDispatch = useDispatch;
