import { useContext } from "react";
import { NavigationContext } from "react-navigation";

export function useNavigation() {
  return useContext(NavigationContext);
}
