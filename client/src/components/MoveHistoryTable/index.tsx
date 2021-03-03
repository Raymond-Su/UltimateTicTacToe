import React, { FC } from 'react';
import { Move } from '../../types/game';
import './MoveHistoryTable.scss';

interface MoveHistoryTableProps {
  moves: Move[];
}

const MoveHistoryTable: FC<MoveHistoryTableProps> = ({
  moves
}: MoveHistoryTableProps) => (
  <table className="move-history-table" id="history-table">
    <thead>
      <tr className="move-history-table-row">
        <th scope="col">Turn</th>
        <th scope="col">Player</th>
        <th scope="col">Location</th>
      </tr>
    </thead>
    <tbody>
      {moves.map((move, index) => (
        <tr key={`move-${index}`} className="move-history-table-row">
          <td>{index + 1}</td>
          <td>{index % 2 ? 'O' : 'X'}</td>
          <td>{`(${move.boardPosition.x},${move.boardPosition.y}) (${move.tilePosition.x},${move.tilePosition.y})`}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default MoveHistoryTable;
