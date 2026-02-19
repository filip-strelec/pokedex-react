import { useState } from 'react';
import { FiX, FiDownload } from 'react-icons/fi';
import { Button } from '../../styles/shared';
import { exportToCSV, exportToJSON } from '../../utils/export';
import { fetchPokemonBatch } from '../../api/pokeApi';
import type { Pokemon } from '../../types';
import * as S from './ExportModal.styles';

interface ExportModalProps {
  onClose: () => void;
  filteredPokemon: Pokemon[];
  totalCount: number;
}

export default function ExportModal({ onClose, filteredPokemon, totalCount }: ExportModalProps) {
  const [exportType, setExportType] = useState('filtered');
  const [rangeStart, setRangeStart] = useState<number | string>(1);
  const [rangeEnd, setRangeEnd] = useState<number | string>(100);
  const [format, setFormat] = useState('csv');
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      let dataToExport: Pokemon[];

      switch (exportType) {
        case 'filtered':
          dataToExport = filteredPokemon;
          break;
        case 'all': {
          const allIds = Array.from({ length: totalCount }, (_, i) => i + 1);
          dataToExport = await fetchPokemonBatch(allIds);
          break;
        }
        case 'range': {
          const start = Math.max(1, parseInt(String(rangeStart)) || 1);
          const end = Math.min(totalCount, parseInt(String(rangeEnd)) || 100);
          const ids = Array.from({ length: end - start + 1 }, (_, i) => start + i);
          dataToExport = await fetchPokemonBatch(ids);
          break;
        }
        default:
          dataToExport = filteredPokemon;
      }

      if (format === 'csv') {
        exportToCSV(dataToExport);
      } else {
        exportToJSON(dataToExport);
      }

      onClose();
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setExporting(false);
    }
  };

  const getCount = (): number => {
    switch (exportType) {
      case 'filtered':
        return filteredPokemon.length;
      case 'all':
        return totalCount;
      case 'range': {
        const start = Math.max(1, parseInt(String(rangeStart)) || 1);
        const end = Math.min(totalCount, parseInt(String(rangeEnd)) || 100);
        return Math.max(0, end - start + 1);
      }
      default:
        return 0;
    }
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <h2>
            <FiDownload size={20} /> Export Pokémon Data
          </h2>
          <Button onClick={onClose}>
            <FiX size={18} />
          </Button>
        </S.Header>

        <S.Section>
          <S.Label>Export Options</S.Label>
          <S.RadioGroup>
            <S.RadioOption $selected={exportType === 'filtered'}>
              <input type="radio" name="exportType" value="filtered" checked={exportType === 'filtered'} onChange={(e) => setExportType(e.target.value)} />
              <span>Current filtered results ({filteredPokemon.length} Pokémon)</span>
            </S.RadioOption>

            <S.RadioOption $selected={exportType === 'all'}>
              <input type="radio" name="exportType" value="all" checked={exportType === 'all'} onChange={(e) => setExportType(e.target.value)} />
              <span>All Pokémon ({totalCount} total)</span>
            </S.RadioOption>

            <S.RadioOption $selected={exportType === 'range'}>
              <input type="radio" name="exportType" value="range" checked={exportType === 'range'} onChange={(e) => setExportType(e.target.value)} />
              <div style={{ flex: 1 }}>
                <span>Custom ID range</span>
                {exportType === 'range' && (
                  <S.RangeInputs>
                    <S.SmallInput type="number" min="1" max={totalCount} value={rangeStart} onChange={(e) => setRangeStart(e.target.value)} placeholder="From" />
                    <span>to</span>
                    <S.SmallInput type="number" min="1" max={totalCount} value={rangeEnd} onChange={(e) => setRangeEnd(e.target.value)} placeholder="To" />
                  </S.RangeInputs>
                )}
              </div>
            </S.RadioOption>
          </S.RadioGroup>
        </S.Section>

        <S.Section>
          <S.Label>Format</S.Label>
          <S.RadioGroup style={{ flexDirection: 'row' }}>
            <S.RadioOption $selected={format === 'csv'} style={{ flex: 1 }}>
              <input type="radio" name="format" value="csv" checked={format === 'csv'} onChange={(e) => setFormat(e.target.value)} />
              <span>CSV</span>
            </S.RadioOption>
            <S.RadioOption $selected={format === 'json'} style={{ flex: 1 }}>
              <input type="radio" name="format" value="json" checked={format === 'json'} onChange={(e) => setFormat(e.target.value)} />
              <span>JSON</span>
            </S.RadioOption>
          </S.RadioGroup>
        </S.Section>

        <S.Info>Will export {getCount()} Pokémon as {format.toUpperCase()}</S.Info>

        <S.Actions>
          <Button $variant="secondary" onClick={handleExport} style={{ flex: 1 }} disabled={exporting}>
            <FiDownload size={14} /> {exporting ? 'Exporting...' : 'Export'}
          </Button>
          <Button $variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </S.Actions>
      </S.Modal>
    </S.Overlay>
  );
}

