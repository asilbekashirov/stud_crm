import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {RootDispatch, RootReducer} from "../redux/store/store";

export const useAppDispatch = () => useDispatch<RootDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootReducer> = useSelector

