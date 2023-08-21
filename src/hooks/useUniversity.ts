import { useNavigate } from "react-router-dom";
import { ISavedUniversity, IUniversity } from "../models/university";
import { isCreatedUni } from "../utils/helpers";
import { fetchDeleteUniversity } from "../controllers/university-controller";
import { useAppDispatch, useAppSelector } from "./redux";
import { successAlert, warningAlert } from "../redux/store/alert";
import useConfirm from "../components/confirm/Confirm";
import {
  fetchUniversityRemove,
  fetchUniversitySelect,
} from "../controllers/user-controller";
import { setUser } from "../redux/store/app";

export function useUniversity() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const confirm = useConfirm();
  const {user, isAuth} = useAppSelector((state) => state.app);

  const isAdmin = user.role === "admin"

  const goToUniPage = (uni: IUniversity) => {
    if (!isCreatedUni(uni)) return;
    navigate(`/${isAdmin ? "admin" : "app"}/university/${uni._id}`);
  };

  const deleteUniversity = async (e: any, id: string) => {
    e.stopPropagation();
    const yesNo = await confirm({
      message: "Are you sure you want to delete this university?",
      trueText: "Yes",
      falseText: "No",
    });
    if (!yesNo) return;

    const res = await fetchDeleteUniversity(id);
    if (res?.status === 200) {
      dispatch(successAlert({ message: "University has been deleted" }));
    }
  };

  const handleUniversityAdd = async (
    userId: string,
    uniData: Pick<
      IUniversity & ISavedUniversity,
      "_id" | "name" | "city" | "country"
    >,
    callback?: () => void
  ) => {
    if (!isAuth) navigate("/login");

    const res = await fetchUniversitySelect(userId, uniData);
    if (res?.status === 200) {
      callback && callback();
      dispatch(setUser(res.data.user));
      dispatch(successAlert({ message: `${uniData.name.en} has been added to your list` }));
    }
  };

  const handleUniversityRemove = async (userId: string, uniId: string, callback?: () => void) => {
    const res = await fetchUniversityRemove(userId, uniId);
    if (res?.status === 200) {
      callback && callback();
      dispatch(setUser(res.data.user));
      dispatch(warningAlert({ message: "University has been removed from your list" }));
    }
  };

  const editUniversity = (e: any, uni: IUniversity) => {
    e.stopPropagation();
    if (!isCreatedUni(uni)) return;
    navigate(`/admin/university-add?mode=edit&id=${uni._id}`);
  };

  return {
    deleteUniversity,
    editUniversity,
    handleUniversityAdd,
    handleUniversityRemove,
    goToUniPage
  };
}
