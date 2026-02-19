import { useState, useRef } from 'react';
import { FiFilter, FiHeart, FiUsers, FiShuffle, FiMenu, FiX, FiDownload, FiUpload } from 'react-icons/fi';
import { usePokemon } from '../../context/PokemonContext';
import { Button } from '../../styles/shared';
import { exportBackup, parseBackup } from '../../utils/storage';
import { ActionType } from '../../types';
import * as S from './Header.styles';

interface HeaderProps {
  onShowFavorites: () => void;
  onShowTeam: () => void;
  onShowCompare: () => void;
}

export default function Header({ onShowFavorites, onShowTeam, onShowCompare }: HeaderProps) {
  const { state, dispatch } = usePokemon();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleBackup = () => {
    exportBackup(state.favorites, state.team);
    closeMobileMenu();
  };

  const handleRestore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = parseBackup(ev.target?.result as string);
      if (result) {
        dispatch({ type: ActionType.SET_FAVORITES, payload: result.favorites });
        dispatch({ type: ActionType.SET_TEAM, payload: result.team });
        dispatch({ type: ActionType.SHOW_TOAST, payload: { message: `Restored ${result.favorites.length} favorites and ${result.team.length} team members!`, type: 'success' } });
      } else {
        dispatch({ type: ActionType.SHOW_TOAST, payload: { message: 'Invalid backup file format.', type: 'error' } });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
    closeMobileMenu();
  };

  return (
    <S.StyledHeader>
      <S.Inner>
        <S.Logo>
          <S.PokeBallIcon
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
            alt="Poké Ball"
          />
          <S.LogoText>Pokédex</S.LogoText>
          <S.LogoTextShort>Pokédex</S.LogoTextShort>
        </S.Logo>

        <S.HamburgerButton
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
        </S.HamburgerButton>
        <S.Actions $mobileOpen={mobileMenuOpen}>
          <Button
            onClick={() => {
              dispatch({ type: ActionType.TOGGLE_FILTERS });
              closeMobileMenu();
            }}
            $active={state.showFilters}
          >
            <FiFilter size={16} /> Filters
          </Button>
          <Button onClick={() => {
            onShowFavorites();
            closeMobileMenu();
          }}>
            <FiHeart size={16} /> Favorites
            {state.favorites.length > 0 && (
              <S.Badge>{state.favorites.length}</S.Badge>
            )}
          </Button>
          <Button onClick={() => {
            onShowTeam();
            closeMobileMenu();
          }}>
            <FiUsers size={16} /> Team
            {state.team.length > 0 && <S.Badge>{state.team.length}/6</S.Badge>}
          </Button>
          {state.compareList.length > 0 && (
            <Button $variant="secondary" onClick={() => {
              onShowCompare();
              closeMobileMenu();
            }}>
              <FiShuffle size={16} /> Compare ({state.compareList.length})
            </Button>
          )}
          <Button $variant="outline" onClick={handleBackup} title="Backup favorites & team">
            <FiDownload size={16} /> Backup
          </Button>
          <Button $variant="outline" onClick={() => { fileInputRef.current?.click(); }} title="Restore from backup">
            <FiUpload size={16} /> Restore
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            style={{ display: 'none' }}
            onChange={handleRestore}
          />
        </S.Actions>
      </S.Inner>
    </S.StyledHeader>
  );
}

