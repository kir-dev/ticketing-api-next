import { Ticket } from 'src/ticket/entities/ticket.entity';
import { Board } from '../entities/board.entity';

export class BoardDetails extends Board {
  tickets: Ticket[];
}
