import { createContext, useCallback, useContext, useReducer } from 'react';

import type { ReactElement } from 'react';

interface ProfileContextType {
  currentPage: number;
}

export const initialState: ProfileContextType = { currentPage: 0 };

type ReducerAction = {
  pageNumber: number;
};

const reducer = (
  state: ProfileContextType,
  action: ReducerAction
): ProfileContextType => {
  switch (action.pageNumber) {
    case 0:
      return { ...state, currentPage: 0 };
    case 1:
      return { ...state, currentPage: 1 };
    case 2:
      return { ...state, currentPage: 2 };
    case 3:
      return { ...state, currentPage: 3 };
    case 4:
      return { ...state, currentPage: 4 };
    case 5:
      return { ...state, currentPage: 5 };
    default: {
      return { ...state, currentPage: 2 };
    }
  }
};

const useProfileContext = (initState: ProfileContextType) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const changePageContext = useCallback(
    (inputPage: number) => dispatch({ pageNumber: inputPage }),
    []
  );
  return { state, changePageContext };
};

type UseProfileContextType = ReturnType<typeof useProfileContext>;

const initContextState: UseProfileContextType = {
  state: initialState,
  changePageContext: (arg0: number) => {},
};

export const ProfileContext =
  createContext<UseProfileContextType>(initContextState);

type ChildrenType = {
  children?: ReactElement | undefined;
};

export const ProfilePageProvider = ({
  children,
  ...initState
}: ChildrenType & ProfileContextType): ReactElement => {
  return (
    <ProfileContext.Provider value={useProfileContext(initState)}>
      {children}
    </ProfileContext.Provider>
  );
};

type useProfileContextHookType = {
  currentPage: number;
  changePageContext: (arg0: number) => void;
};

export const useProfile = (): useProfileContextHookType => {
  const {
    state: { currentPage },
    changePageContext,
  } = useContext(ProfileContext);
  return { currentPage, changePageContext };
};
