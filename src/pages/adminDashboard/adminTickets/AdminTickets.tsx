
import AdminTicketContent from './components/AdminTicketContent'
import AdminTicketHeader from './components/AdminTicketHeader'

const AdminTickets = () => {
  return (
    <div className='space-y-8 mt-10'>
      <AdminTicketHeader/>
      <AdminTicketContent/>
    </div>
  )
}

export default AdminTickets
