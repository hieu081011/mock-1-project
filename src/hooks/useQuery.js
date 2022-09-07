import { useLocation } from "react-router-dom"
export const useQuery = function () {
    return new URLSearchParams(useLocation().search)

}
