import { createContext, useContext, useState } from "react";
import { Data } from "../interfaces/Data.interfaces";
import { SelectDayAndShowNext } from "../interfaces/SelectDayAndShowNext.interfaces";
import { TodaysPicks } from "../interfaces/TodaysPicks.interfaces";

export interface GlobalStateContextType {
  day: SelectDayAndShowNext;
  setDay: React.Dispatch<React.SetStateAction<SelectDayAndShowNext>>;
  data: Data[];
  setData: React.Dispatch<React.SetStateAction<Data[]>>;
  titleAndIcon: TodaysPicks[];
  setTitleAndIcon: React.Dispatch<React.SetStateAction<TodaysPicks[]>>;
}

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

export const GlobalProvider = () => {
  const context = useContext(GlobalStateContext)
  if (!context) {
    throw new Error('useGlobalStateProvider must be used within a GlobalStateProvider')
  }
  return context
}

export const GlobalStateProvider = (props: React.PropsWithChildren) => {
  const { children } = props
  const [day, setDay] = useState<SelectDayAndShowNext>({
    day: 'Wednesday',
    showNext: false
  });
  const [data, setData] = useState<Data[]>([{
    image: '',
    title: '',
    message: ''
  }]);
  const [titleAndIcon, setTitleAndIcon] = useState<TodaysPicks[]>([]);

  return (
    <GlobalStateContext.Provider value={{
      day,
      setDay,
      data,
      setData,
      titleAndIcon,
      setTitleAndIcon,
    }}
    >
      {children}
    </GlobalStateContext.Provider>
  )
}