'use client'

import { useState } from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {toast} from "@/components/ui/use-toast";

function setlocal(key: string, value: string) {
    typeof window !== 'undefined' ? window.localStorage.setItem(key, value) : null;
}

function getlocal(key: string) {
    const value = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
    return value;
}

export default function Home() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email') ?? logout();
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventVenue, setEventVenue] = useState('');
    const [requestedBudget, setRequestedBudget] = useState('');
    const [message, setMessage] = useState('');
    const logemail = getlocal("email")
    if(email!==logemail){
        logout();
    }

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            // Fetch club ID associated with the provided email
            const { data: clubData, error: clubError } = await supabase
                .from('clubs')
                .select('clubid')
                .eq('email', email)
                .single();

            if (clubError) {
                console.error('Error fetching club data:', clubError);
                toast({"title": "Error fetching club data", "description": clubError.message});
                return;
            }

            if (!clubData) {
                console.error('Club not found for the provided email');
                toast({"title": "Club not found", "description": "Club not found for the provided email"});
                return;
            }

            const clubId = clubData.clubid;

            // Insert event data into the database

            const { data, error } = await supabase
                .from('events')
                .insert([
                    {
                        eventname: eventName,
                        date: eventDate,
                        venue: eventVenue,
                        requestedbudget: requestedBudget,
                        clubid: clubId,
                    },
                ])
                .select()


            if (error) {
                console.error('Error inserting event data:', error);
                toast({"title": "Error inserting event data", "description": error.message});
                return;
            }

            console.log('Event data inserted successfully', data);
            toast({"title": "Event data inserted successfully", "description": "Event data inserted successfully"})
            // Optionally, you can navigate to a success page or perform other actions
            setMessage('Request submitted successfully');
        } catch (error) {
            console.error('Error:', error);
            toast({"title": "Error"});
        }
    };

    function logout(){
        window.history.replaceState(null, '', window.location.pathname);
        router.push("/")
        setlocal("email", "");
        return "";
    }

    return (
        <main className="flex h-screen w-full flex-col justify-between bg-gray-100">
            <div className="w-full h-full items-center justify-center flex">
                <div className="w-full max-w-md px-8 py-6 bg-white rounded-lg shadow-md">
                    <header className="flex justify-between mb-4">
                        <h1 className="text-2xl font-bold text-gray-700">Event Registration</h1>
                        <p className="text-md text-gray-500 hover:underline">Logout</p>
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
                                <label htmlFor="venue" className="block text-gray-700 text-sm font-bold mb-2">
                                    Venue:
                                </label>
                                <Input
                                    type="text"
                                    id="venue"
                                    name="venue"
                                    className="w-full py-2 px-3 text-gray-700"
                                    value={eventVenue}
                                    onChange={(e) => setEventVenue(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="budget" className="block text-gray-700 text-sm font-bold mb-2">
                                    Budget:
                                </label>
                                <Input
                                    type="text"
                                    id="budget"
                                    name="budget"
                                    className="w-full py-2 px-3 text-gray-700"
                                    value={requestedBudget}
                                    onChange={(e) => setRequestedBudget(e.target.value)}
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
