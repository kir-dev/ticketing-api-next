import { Label } from 'src/labels/entities/label.entity'
import { Ticket } from '../entities/ticket.entity'

export class TicketDetails extends Ticket {
  labels: Label[]
}
