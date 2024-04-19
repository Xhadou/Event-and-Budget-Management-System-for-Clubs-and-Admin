'use client'

import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import { supabase } from '@/lib/supabaseClient';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {toast} from "@/components/ui/use-toast";

interface Event {
    eventid: number;
    clubid: number;
    eventname: string;
    date: string;
    venue: string;
    status: string;
    requestedbudget: number;
    allocatedbudget: number;
}

export default function Home() {
    const router = useRouter();
    const [events, setEvents] = useState<Event[]>([]);
    const [rsvpCounts, setRsvpCounts] = useState<{ [key: number]: number }>({});
    const searchParams = useSearchParams();
    const email = searchParams.get('email') ?? logout();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data: clubData, error: clubError } = await supabase
                    .from('clubs')
                    .select('clubid')
                    .eq('email', email)
                    .single();

                if (clubError) {
                    console.error('Error fetching club data:', clubError);
                    toast({"title": "Error fetching club data", "description": clubError.message})
                    return;
                }

                if (!clubData) {
                    console.error('Club not found for the provided email');
                    toast({"title": "Club not found", "description": "Club not found for the provided email"})
                    return;
                }

                const today = new Date().toISOString().slice(0, 10);

                const { data: eventData, error: eventError } = await supabase
                    .from('events')
                    .select('*')
                    .eq('status', 'Scheduled')
                    .eq('clubid', clubData.clubid)
                    .gte('date', today)
                    .order('date', { ascending: true });

                if (eventError) {
                    console.error('Error fetching events:', eventError);
                    toast({"title": "Error fetching events", "description": eventError.message})
                    return;
                }

                if (eventData) {
                    setEvents(eventData);

                    const eventIds = eventData.map((event: { eventid: any; }) => event.eventid);

                    if (eventIds.length > 0) {
                        const { data: rsvpData, error: rsvpError } = await supabase
                            .from('rsvps')
                            .select('eventid')
                            .in('eventid', eventIds);

                        if (rsvpError) {
                            console.error('Error fetching RSVPs:', rsvpError);
                            toast({"title": "Error fetching RSVPs", "description": rsvpError.message})
                            return;
                        }

                        const rsvpCounts: { [key: number]: number } = {};

                        rsvpData.forEach((rsvp: { eventid: any; }) => {
                            const eventId = rsvp.eventid;
                            rsvpCounts[eventId] = rsvpCounts[eventId] ? rsvpCounts[eventId] + 1 : 1;
                        });

                        setRsvpCounts(rsvpCounts);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                toast({"title": "Error fetching data"})
            }
        };

        if (email) {
            fetchEvents();
        }
    }, [email]);

    function logout(){
        window.history.replaceState(null, '', window.location.pathname);
        router.push("/")
        return "";
    }

    return (
        <main className="flex h-screen w-full flex-col justify-between bg-gray-100">
            <div className="w-full h-full flex justify-center items-center flex-col">
                <div className="w-8/12 h-4/5 px-8 pt-6 bg-white rounded-lg shadow-md flex flex-row">
                    <div className={"h-full w-4/6 items-center justify-center flex flex-col"}>
                        <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">Upcoming Events</h1>
                        <Separator />
                        <div className={"h-full w-full items-center py-5 flex flex-col overflow-y-scroll"}>
                            {events.length > 0 ? (
                                events.map((event, index) => (
                                    <div key={index} className={"h-48 w-[500px] rounded-xl border border-gray-300 py-4 px-8 mb-5"}>
                                        <p className={"text-xl"}>Event: {event.eventname}</p>
                                        <p className={"text-xl mt-3"}>Date: {new Date(event.date).toLocaleDateString()}</p>
                                        <p className={"text-xl mt-3"}>Venue: {event.venue}</p>
                                        <p className={"text-xl mt-3"}>RSVPs: {rsvpCounts[event.eventid] || 0}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No upcoming events found.</p>
                            )}
                        </div>
                    </div>

                    <div className={"w-2/6 h-full pr-3 pl-8 justify-center flex"}>
                        <div className={"mt-32 w-full"}>
                            <Button className={"w-full h-fit text-2xl"} onClick={() => {router.push(`/club/events/new?email=${encodeURIComponent(email)}`)}}>New Event</Button>
                            <Button className={"w-full h-fit text-2xl text-wrap mt-4"} onClick={() => {router.push(`/club/events/reimbursement?email=${encodeURIComponent(email)}`)}}>Request Reimbursement</Button>
                            <Separator className={"mt-4 text-neutral-800 bg-gray-800"}/>
                            <Button className={"w-full h-fit text-2xl mt-4"} onClick={() => {router.push(`/club/status?email=${encodeURIComponent(email)}`)}}>Request Status</Button>
                        </div>
                    </div>
                </div>

                <Button className={"mt-4"} onClick={logout}>Logout</Button>
            </div>
        </main>
    )
}
