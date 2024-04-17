'use client'

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Home() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [requestedAmount, setRequestedAmount] = useState('');
    const [reason, setReason] = useState('');
    const [message, setMessage] = useState('');

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const formattedDate = new Date(eventDate).toISOString().slice(0, 10);

            // Fetch club ID associated with the provided email
            const { data: clubData, error: clubError } = await supabase
                .from('clubs')
                .select('clubid')
                .eq('email', email)
                .single();

            if (clubError) {
                console.error('Error fetching club data:', clubError);
                return;
            }

            if (!clubData) {
                console.error('Club not found for the provided email');
                return;
            }

            const clubId = clubData.clubid;

            // Fetch event ID based on the provided event name and date
            const { data: eventData, error: eventError } = await supabase
                .from('events')
                .select('eventid')
                .eq('clubid', clubId)
                .eq('eventname', eventName)
                .eq('date', formattedDate)
                .eq('status', 'Scheduled') // Check for Scheduled status
                .single();

            if (eventError) {
                console.error('Error fetching event data:', eventError);
                return;
            }

            if (!eventData) {
                console.error('Event not found with the provided name, date, or status not Scheduled');
                return;
            }

            const eventId = eventData.eventid;

            // Insert reimbursement request data into the database
            const { error } = await supabase.from('reimbursementrequests').insert([
                {
                    eventid: eventId,
                    requestedamount: requestedAmount,
                    reason: reason,
                },
            ]);

            if (error) {
                console.error('Error inserting reimbursement request:', error);
                return;
            }

            setMessage('Request sent successfully');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <main className="flex h-screen w-full flex-col justify-between bg-gray-100">
            <div className="w-full h-full items-center justify-center flex">
                <div className="w-full max-w-md px-8 py-6 bg-white rounded-lg shadow-md">
                    <header className="flex justify-between mb-4">
                        <h1 className="text-2xl font-bold text-gray-700">Apply for reimbursement</h1>
                    </header>
                    <main>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label htmlFor="event-name" className="block text-gray-700 text-sm font-bold mb-2">
                                    Event Name:
                                </label>
                                <Input
                                    type="text"
                                    id="event-name"
                                    name="event-name"
                                    className="w-full py-2 px-3 text-gray-700"
                                    value={eventName}
                                    onChange={(e) => setEventName(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">
                                    Date:
                                </label>
                                <Input
                                    type="date"
                                    id="date"
                                    name="date"
                                    className="w-full py-2 px-3 text-gray-700"
                                    value={eventDate}
                                    onChange={(e) => setEventDate(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
                                    Amount:
                                </label>
                                <Input
                                    type="text"
                                    id="amount"
                                    name="amount"
                                    className="w-full py-2 px-3 text-gray-700"
                                    value={requestedAmount}
                                    onChange={(e) => setRequestedAmount(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="reason" className="block text-gray-700 text-sm font-bold mb-2">
                                    Reason/Feedback:
                                </label>
                                <Textarea
                                    id="reason"
                                    name="reason"
                                    className="w-full py-2 px-3 text-gray-700"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                />
                            </div>
                            <Button type="submit" className="w-full mt-5 font-bold py-2 px-4 rounded-md">
                                Submit
                            </Button>
                            {message && <p className="text-green-500 mt-4">{message}</p>}
                        </form>
                    </main>
                </div>
            </div>
        </main>
    );
}
