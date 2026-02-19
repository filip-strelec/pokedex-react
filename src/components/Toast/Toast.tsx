import { useEffect } from 'react';
import { usePokemon } from '../../context/PokemonContext';
import { ActionType } from '../../types';
import * as S from './Toast.styles';

export default function Toast() {
  const { state, dispatch } = usePokemon();

  useEffect(() => {
    if (!state.toast) return;
    const timer = setTimeout(() => {
      dispatch({ type: ActionType.CLEAR_TOAST });
    }, 3000);
    return () => clearTimeout(timer);
  }, [state.toast, dispatch]);

  if (!state.toast) return null;

  return (
    <S.ToastWrapper>
      <S.ToastBody $type={state.toast.type}>
        {state.toast.message}
      </S.ToastBody>
    </S.ToastWrapper>
  );
}

