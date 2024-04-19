'use client'

import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {ScrollArea} from "@/components/ui/scroll-area";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {useEffect, useState} from "react";
import {number} from "prop-types";
import {useRouter, useSearchParams} from "next/navigation";
import {supabase} from "@/lib/supabaseClient";
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
    clubname?: string;
}

interface BudgetRequest {
    requestid: number;
    eventid: number;
    requestedamount: number;
    allocatedamount: number;
    status: string;
    reason: string;
    adminfeedback?: string;
    clubname?: string;
    eventName?: string;
}


export default function Home() {
    const router = useRouter();

    const [alertDialogOpen, setAlertDialogOpen] = useState<boolean>(false);
    const [events, setEvents] = useState<Event[]>([]);
    const [budgetRequests, setBudgetRequests] = useState<BudgetRequest[]>([]);
    const searchParams = useSearchParams();
    const email = searchParams.get('email') ?? logout();
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [selectedBudgetRequest, setSelectedBudgetRequest] = useState<BudgetRequest | null>(null);
    const [assignedAmount, setAssignedAmount] = useState<number | null>(null);
    const [remarks, setRemarks] = useState<string | null>(null);

    function openAlertDialog() {
        setAlertDialogOpen(true);
    }

    function closeAlertDialog() {
        setAlertDialogOpen(false);
        setSelectedEvent(null);
        setSelectedBudgetRequest(null);
    }

    async function updateEvent(){
        if(selectedEvent){
            const { data, error } = await supabase
                .from('events')
                .update({
                    allocatedbudget: assignedAmount,
                    reason: remarks
                })
                .eq('eventid', selectedEvent.eventid)
                .select();

            toast({"title":"Successfully updated","description":"The event has been updated."})

            if (error) {
                console.error('Error updating event:', error);
                toast({"title":"Error","description":error.message});
                return;
            }
        }
    }

    async function rejectEvent(){
        if(selectedEvent){
            const { data, error } = await supabase
                .from('events')
                .update({
                    status: 'Rejected',
                    reason: remarks
                })
                .eq('eventid', selectedEvent.eventid)
                .select();

            if (error) {
                console.error('Error updating event:', error);
                toast({"title":"Error","description":error.message});
                return;
            }
        }
    }

    async function updateBudgetRequest(){
        if(selectedBudgetRequest){
            const { data, error } = await supabase
                .from('budgetrequests')
                .update({
                    allocatedamount: assignedAmount,
                    adminfeedback: remarks
                })
                .eq('requestid', selectedBudgetRequest.requestid)
                .select();

            toast({"title":"Successfully updated","description":"The budget request has been updated."});

            if (error) {
                console.error('Error updating budget request:', error);
                toast({"title":"Error","description":error.message});
                return;
            }
        }
    }

    async function rejectBudgetRequest(){
        if(selectedBudgetRequest){
            const { data, error } = await supabase
                .from('budgetrequests')
                .update({
                    status: 'Rejected',
                    adminfeedback: remarks
                })
                .eq('requestid', selectedBudgetRequest.requestid)
                .select();

            if (error) {
                console.error('Error updating budget request:', error);
                toast({"title":"Error","description":error.message});
                return;
            }
        }
    }


    useEffect(() => {
        const fetchEvents = async () => {
            try {

                const today = new Date().toISOString().slice(0, 10);

                const { data: eventData, error: eventError } = await supabase
                    .from('events')
                    .select('*, clubs ( clubname )')
                    .eq('status', 'Scheduled')
                    .order('date', { ascending: true });

                const { data: budgetRequestData, error } = await supabase
                    .from('budgetrequests')
                    .select('*, events ( eventname, eventid, clubid:clubs (clubname) )')
                    .eq('status', 'Approved')

                console.log(eventData)

                if (eventError) {
                    console.error('Error fetching events:', eventError);
                    return;
                }

                if(eventData){
                    const eventsWithClubName: Event[] = eventData.map((event: Event & { clubs: { clubname: any; }; }) => ({
                        ...event,
                        clubname: event.clubs?.clubname // Access the ClubName from the joined Clubs table
                    }));

                    setEvents(eventsWithClubName);
                }

                if (budgetRequestData) {

                    const requestsWithClubName: BudgetRequest[] = budgetRequestData.map((budget: BudgetRequest & { events: Event }) => ({
                        ...budget,
                        // @ts-ignore
                        clubname: budget.events.clubid.clubname, // Access the clubname from the joined clubs table
                        eventName: budget.events.eventname
                    }));

                    console.log(requestsWithClubName);

                    setBudgetRequests(requestsWithClubName);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
                toast({"title":"Error"});
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
        <main className="flex h-screen w-full flex-col justify-between bg-gray-100 overflow-y-hidden">
            <div className="w-full h-full flex justify-center items-center">

                <div className="w-10/12 h-full px-8 pt-6 bg-white rounded-lg shadow-md flex flex-col">
                    <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">Approved Requests</h1>
                    <div className={"w-full h-full flex flex-row items-center justify-center"}>
                        <div className={"h-full w-4/6 items-center justify-center flex flex-col overflow-y-hidden"}>
                            <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">Events</h1>
                            <Separator />
                            <ScrollArea className={"h-full w-full items-center py-5 flex flex-col"}>
                                {events.length > 0 ? (
                                    events.map((event, index) => (
                                        <div key={event.eventid} className={"h-48 w-[500px] rounded-xl border border-gray-300 py-4 px-8 mb-5"}>
                                            <p className={"text-xl"}>Event: {event.eventname}</p>
                                            <p className={"text-xl mt-3"}>Amount: {event.allocatedbudget}</p>
                                            <p className={"text-xl mt-3"}>Venue: {event.venue}</p>
                                            <div className={"w-full h-fit mt-2 flex items-center justify-end"}>
                                                <Button onClick={()=> {
                                                    openAlertDialog();
                                                    setSelectedEvent(event);
                                                }}>View Details</Button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No approved events found.</p>
                                )}
                            </ScrollArea>
                        </div>

                        <div className={"h-full w-4/6 items-center justify-center flex flex-col"}>
                            <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">Reimbursal</h1>
                            <Separator />
                            <ScrollArea className={"h-full w-full items-center py-5 flex flex-col"}>
                                {budgetRequests.length > 0 ? (
                                    budgetRequests.map((budgetRequest, index) => (
                                        <div key={budgetRequest.requestid} className={"h-48 w-[500px] rounded-xl border border-gray-300 py-4 px-8 mb-5"}>
                                            <p className={"text-xl"}>Event: {budgetRequest.eventName}</p>
                                            <p className={"text-xl mt-3"}>Amount: {budgetRequest.allocatedamount}</p>
                                            <p className={"text-xl mt-3"}>Club: {budgetRequest.clubname}</p>
                                            <div className={"w-full h-fit mt-2 flex items-center justify-end"}>
                                                <Button onClick={()=>{
                                                    setSelectedBudgetRequest(budgetRequest);
                                                    openAlertDialog()
                                                }}>View Details</Button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No pending events found.</p>
                                )}
                            </ScrollArea>
                        </div>

                        <AlertDialog open={alertDialogOpen}>

                            <AlertDialogContent className={"w-8/12"}>
                                <AlertDialogHeader className={"w-full"}>
                                    <div>
                                        <header className="flex justify-between mb-4">
                                            <h1 className="text-2xl font-bold text-gray-700">Request Details</h1>
                                        </header>
                                        <main>
                                            <form action="#">
                                                <div className="mb-4">
                                                    <p className="block text-gray-700 text-sm font-bold mb-2">Club: {selectedEvent?.clubname || selectedBudgetRequest?.clubname}</p>
                                                    <p className="block text-gray-700 text-sm font-bold mb-2">Event
                                                        ID: {selectedEvent?.eventname || selectedBudgetRequest?.eventName}</p>
                                                    {selectedEvent &&
                                                        <p className="block text-gray-700 text-sm font-bold mb-2">Date: {selectedEvent?.date} </p>}
                                                    {selectedEvent &&
                                                        <p className="block text-gray-700 text-sm font-bold mb-2">Venue: {selectedEvent?.venue}</p>}
                                                    <p className="block text-gray-700 text-sm font-bold mb-2">Request
                                                        Budget: {selectedEvent?.requestedbudget || selectedBudgetRequest?.requestedamount}</p>
                                                    {selectedBudgetRequest &&
                                                        <p className="block text-gray-700 text-sm font-bold mb-2">Remarks: {selectedBudgetRequest.reason}</p>}

                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="event-id"
                                                           className="block text-gray-700 text-sm font-bold mb-2">Allocation:</label>
                                                    <Input type="number" id="event-id" name="event-id"
                                                           onChange={(e) => setAssignedAmount(Number(e.target.value))}
                                                           className="w-full py-2 px-3 text-gray-700"/>
                                                </div>
                                                <div className="mb-4">
                                                    <label htmlFor="venue"
                                                           className="block text-gray-700 text-sm font-bold mb-2">Remarks:</label>
                                                    <Textarea onChange={(e) => setRemarks(e.target.value)} id="event-id"
                                                              name="event-id"
                                                              className="w-full py-2 px-3 text-gray-700"/>
                                                </div>

                                            </form>
                                        </main>
                                    </div>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <Button onClick={()=>{
                                        if(selectedEvent){
                                            updateEvent();
                                        } else {
                                            updateBudgetRequest();
                                        }
                                        closeAlertDialog()
                                    }} type="submit"
                                            className="w-full mt-5 font-bold py-2 px-4 rounded-md">
                                        Update
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </div>
        </main>
    )

}