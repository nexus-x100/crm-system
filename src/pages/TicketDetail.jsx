import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  fetchTicket();
  fetchNotes();
}, []);

  const fetchTicket = async () => {
    const { data, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('id', id)
      .single();
    if (error) console.error(error);
    else {
      setTicket(data);
      setStatus(data.status);
    }
  };

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('ticket_id', id)
      .order('created_at', { ascending: false });
    if (error) console.error(error);
    else setNotes(data);
  };

  const updateStatus = async () => {
    setLoading(true);
    const { error } = await supabase
      .from('tickets')
      .update({ status, updated_at: new Date() })
      .eq('id', id);
    if (error) alert('Error updating status!');
    else alert('Status updated!');
    setLoading(false);
  };

  const addNote = async () => {
    if (!newNote.trim()) return;
    const { error } = await supabase
      .from('notes')
      .insert([{ ticket_id: id, note_text: newNote }]);
    if (error) alert('Error adding note!');
    else {
      setNewNote('');
      fetchNotes();
    }
  };

  const getStatusColor = (status) => {
    if (status === 'Open') return 'bg-green-100 text-green-800';
    if (status === 'In Progress') return 'bg-yellow-100 text-yellow-800';
    if (status === 'Closed') return 'bg-red-100 text-red-800';
  };

  if (!ticket) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="text-blue-600 mb-4 hover:underline"
        >
          ← Back to tickets
        </button>

        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{ticket.subject}</h1>
              <p className="text-gray-400 text-sm font-mono">{ticket.ticket_id}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ticket.status)}`}>
              {ticket.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <p className="text-gray-400">Customer Name</p>
              <p className="font-medium">{ticket.customer_name}</p>
            </div>
            <div>
              <p className="text-gray-400">Email</p>
              <p className="font-medium">{ticket.customer_email}</p>
            </div>
            <div>
              <p className="text-gray-400">Created</p>
              <p className="font-medium">{new Date(ticket.created_at).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-400">Last Updated</p>
              <p className="font-medium">{ticket.updated_at ? new Date(ticket.updated_at).toLocaleString() : 'Not updated yet'}</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-400 text-sm mb-1">Description</p>
            <p className="text-gray-700 bg-gray-50 rounded-lg p-3">{ticket.description}</p>
          </div>

          <div className="flex gap-3 items-center">
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none"
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Closed</option>
            </select>
            <button
              onClick={updateStatus}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Status'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Notes</h2>

          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={newNote}
              onChange={e => setNewNote(e.target.value)}
              placeholder="Add a note..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addNote}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add Note
            </button>
          </div>

          {notes.length === 0 ? (
            <p className="text-gray-400 text-center py-4">No notes yet</p>
          ) : (
            <div className="space-y-3">
              {notes.map(note => (
                <div key={note.id} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-gray-700">{note.note_text}</p>
                  <p className="text-gray-400 text-xs mt-1">{new Date(note.created_at).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TicketDetail;

