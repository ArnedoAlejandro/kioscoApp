import { useContext } from "react";
import SuperContext from "../context/SuperProvider";

const useSuper = () => {
    return useContext(SuperContext)
}

export default useSuper;