'use client';

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Event {
    eventid: number;
    clubid: number;
    eventname: string;
    date: string;
    venue: string;
    status: string;
    requestedbudget: number;
    allocatedbudget: number;
    clubname?: string;
}

export default function Home() {    
    const [events, setEvents] = useState<Event[]>([]);
    const router = useRouter();
    useEffect(() => {
        
        // Function to fetch events
        const fetchEvents = async () => {
            const { data, error } = await supabase
                .from('events')
                .select('*, clubs ( clubname )')
                .eq('status', 'Scheduled')
                .gte('date', new Date().toISOString().slice(0, 10)) // Get today's date in YYYY-MM-DD format
                .order('date', { ascending: true });

            if (error) {
                console.error('Error fetching events:', error);
            } 
            if (data) {
                // Map through the data to include the clubName in the event object
                const eventsWithClubName = data.map(event => ({
                    ...event,
                    clubname: event.clubs?.clubname // Access the ClubName from the joined Clubs table
                }));
                setEvents(eventsWithClubName);
            }
        };

        fetchEvents();
    }, []);

    return (
        <main className="flex h-screen w-full flex-col justify-between bg-gray-100">
            <div className="w-full h-full flex justify-center flex-col items-center">
                <div className="w-8/12 h-4/5 px-8 pt-6 bg-white rounded-lg shadow-md flex flex-row">
                    <div className={"h-full w-4/6 items-center justify-center flex flex-col"}>
                        <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">Upcoming Events</h1>
                        <Separator />
                        <div className={"h-full w-full items-center py-5 flex flex-col overflow-y-scroll"}>
                            {events.length > 0 ? (
                                events.map((event, index) => (
                                    <div key={index} className={"h-58 w-[500px] rounded-xl border border-gray-300 py-4 px-8 mb-5"}>
                                        <p className={"text-xl"}>Club: {event.clubname}</p>
                                        <p className={"text-xl mt-3"}>Event: {event.eventname}</p>
                                        <p className={"text-xl mt-3"}>Date: {new Date(event.date).toLocaleDateString()}</p>
                                        <p className={"text-xl mt-3"}>Venue: {event.venue}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No upcoming events found.</p>
                            )}
                        </div>
                    </div>

                    <div className={"w-2/6 h-full pr-3 pl-8 justify-center flex"}>
                        <div className={"mt-32 w-full"}>
                            <Button className={"w-full h-fit text-2xl"} onClick={() => {router.push('/admin/pending')}}>Pending Requests</Button>
                            <Button className={"w-full h-fit text-2xl text-wrap mt-4"} onClick={() => {router.push('/admin/approved')}}>Review Approved Requests</Button>
                        </div>
                    </div>
                </div>
                <Button className={"mt-4"}>Logout</Button>
            </div>
        </main>
    );
}
