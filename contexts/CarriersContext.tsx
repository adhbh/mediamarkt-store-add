import { createContext, Dispatch, useContext, useReducer } from 'react';
import { Carrier } from '../types/Carrier';

export interface CarrierAction {
  type: string;
  data: Carrier[];
}

export enum CarriersActions {
  SET_CARRIERS = 'SET_CARRIERS',
}

const intialState: Carrier[] = [];

export const CarriersStateContext = createContext<Carrier[]>(intialState);
export const CarriersDispatchContext = createContext(null as any);

const CarriersReducer = (state: Carrier[], action: CarrierAction) => {
  switch (action.type) {
    case CarriersActions.SET_CARRIERS: {
      return [...action.data];
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const useCarriersState = () => {
  const context = useContext(CarriersStateContext);
  if (context === undefined) {
    throw new Error('useCarriersState must be used within a CarriersProvider');
  }
  return context;
};

const useCarriersDispatch = () => {
  const context = useContext(CarriersDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useCarriersDispatch must be used within a CarriersProvider'
    );
  }
  return context;
};

const CarriersProvider = ({
  children,
}: {
  children: string | JSX.Element | JSX.Element[];
}) => {
  const [state, dispatch] = useReducer(CarriersReducer, intialState);
  return (
    <CarriersStateContext.Provider value={state}>
      <CarriersDispatchContext.Provider value={dispatch}>
        {children}
      </CarriersDispatchContext.Provider>
    </CarriersStateContext.Provider>
  );
};

export { CarriersProvider, useCarriersDispatch, useCarriersState };
