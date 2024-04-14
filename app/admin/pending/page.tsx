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
import {useState} from "react";

export default function Home() {
    
    const [alertDialogOpen, setAlertDialogOpen] = useState<boolean>(false);
    
    function openAlertDialog() {
        setAlertDialogOpen(true);
    }
    
    function closeAlertDialog() {
        setAlertDialogOpen(false);
    }

    return (
        <main className="flex h-screen w-full flex-col justify-between bg-gray-100 overflow-y-hidden">
            <div className="w-full h-full flex justify-center items-center">

                <div className="w-10/12 h-full px-8 pt-6 bg-white rounded-lg shadow-md flex flex-col">
                    <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">Pending Requests</h1>
                    <div className={"w-full h-full flex flex-row items-center justify-center"}>
                        <div className={"h-full w-4/6 items-center justify-center flex flex-col overflow-y-hidden"}>
                            <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">Events</h1>
                            <Separator />
                            <ScrollArea className={"h-full w-full items-center py-5 flex flex-col"}>
                                <div className={"h-48 w-[500px] rounded-xl border border-gray-300 py-4 px-8 mb-5"}>
                                    <p className={"text-xl"}>{"Event: Fresher's Day"}</p>
                                    <p className={"text-xl mt-3"}>Amount: 60000</p>
                                    <p className={"text-xl mt-3"}>Venue: Backyard</p>
                                    <div className={"w-full h-fit mt-2 flex items-center justify-end"}>
                                        <Button onClick={openAlertDialog}>View Details</Button>
                                    </div>
                                </div>
                                <div className={"h-48 w-[500px] rounded-xl border border-gray-300 py-4 px-8 mb-5"}>
                                    <p className={"text-xl"}>Event: Breeze</p>
                                    <p className={"text-xl mt-3"}>Amount: 60000</p>
                                    <p className={"text-xl mt-3"}>Venue: sometime</p>
                                    <div className={"w-full h-fit mt-2 flex items-center justify-end"}>
                                        <Button onClick={openAlertDialog}>View Details</Button>
                                    </div>
                                </div>
                                <div className={"h-48 w-[500px] rounded-xl border border-gray-300 py-4 px-8 mb-5"}>
                                    <p className={"text-xl"}>Event: Surge</p>
                                    <p className={"text-xl mt-3"}>Amount: 60000</p>
                                    <p className={"text-xl mt-3"}>Venue: some other time</p>
                                    <div className={"w-full h-fit mt-2 flex items-center justify-end"}>
                                        <Button onClick={openAlertDialog}>View Details</Button>
                                    </div>
                                </div>
                                <div className={"h-48 w-[500px] rounded-xl border border-gray-300 py-4 px-8 mb-5"}>
                                    <p className={"text-xl"}>Event: Surge</p>
                                    <p className={"text-xl mt-3"}>Amount: 60000</p>
                                    <p className={"text-xl mt-3"}>Venue: some other time</p>
                                    <div className={"w-full h-fit mt-2 flex items-center justify-end"}>
                                        <Button onClick={openAlertDialog}>View Details</Button>
                                    </div>
                                </div>
                                <div className={"h-48 w-[500px] rounded-xl border border-gray-300 py-4 px-8 mb-5"}>
                                    <p className={"text-xl"}>Event: Surge</p>
                                    <p className={"text-xl mt-3"}>Amount: 60000</p>
                                    <p className={"text-xl mt-3"}>Venue: some other time</p>
                                    <div className={"w-full h-fit mt-2 flex items-center justify-end"}>
                                        <Button onClick={openAlertDialog}>View Details</Button>
                                    </div>
                                </div>
                            </ScrollArea>
                        </div>

                        <div className={"h-full w-4/6 items-center justify-center flex flex-col"}>
                            <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">Reimbursal</h1>
                            <Separator />
                            <ScrollArea className={"h-full w-full items-center py-5 flex flex-col"}>
                                <div className={"h-48 w-[500px] rounded-xl border border-gray-300 py-4 px-8 mb-5"}>
                                    <p className={"text-xl"}>{"Event: Fresher's Day"}</p>
                                    <p className={"text-xl mt-3"}>Amount: 60000</p>
                                    <p className={"text-xl mt-3"}>Venue: Backyard</p>
                                    <div className={"w-full h-fit mt-2 flex items-center justify-end"}>
                                        <Button onClick={openAlertDialog}>View Details</Button>
                                    </div>
                                </div>
                                <div className={"h-48 w-[500px] rounded-xl border border-gray-300 py-4 px-8 mb-5"}>
                                    <p className={"text-xl"}>Event: Breeze</p>
                                    <p className={"text-xl mt-3"}>Amount: 60000</p>
                                    <p className={"text-xl mt-3"}>Venue: sometime</p>
                                    <div className={"w-full h-fit mt-2 flex items-center justify-end"}>
                                        <Button onClick={openAlertDialog}>View Details</Button>
                                    </div>
                                </div>
                                <div className={"h-48 w-[500px] rounded-xl border border-gray-300 py-4 px-8 mb-5"}>
                                    <p className={"text-xl"}>Event: Surge</p>
                                    <p className={"text-xl mt-3"}>Amount: 60000</p>
                                    <p className={"text-xl mt-3"}>Venue: some other time</p>
                                    <div className={"w-full h-fit mt-2 flex items-center justify-end"}>
                                        <Button onClick={openAlertDialog}>View Details</Button>
                                    </div>
                                </div>
                                <div className={"h-48 w-[500px] rounded-xl border border-gray-300 py-4 px-8 mb-5"}>
                                    <p className={"text-xl"}>Event: Surge</p>
                                    <p className={"text-xl mt-3"}>Amount: 60000</p>
                                    <p className={"text-xl mt-3"}>Venue: some other time</p>
                                    <div className={"w-full h-fit mt-2 flex items-center justify-end"}>
                                        <Button onClick={openAlertDialog}>View Details</Button>
                                    </div>
                                </div>
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
                                                <p className="block text-gray-700 text-sm font-bold mb-2">Club:</p>
                                                <p className="block text-gray-700 text-sm font-bold mb-2">Event ID:</p>
                                                <p className="block text-gray-700 text-sm font-bold mb-2">Date:</p>
                                                <p className="block text-gray-700 text-sm font-bold mb-2">Venue:</p>
                                                <p className="block text-gray-700 text-sm font-bold mb-2">Request Budget:</p>
                                                <p className="block text-gray-700 text-sm font-bold mb-2">Remarks:</p>

                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="event-id" className="block text-gray-700 text-sm font-bold mb-2">Allocation:</label>
                                                <Input type="text" id="event-id" name="event-id" className="w-full py-2 px-3 text-gray-700" />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="venue" className="block text-gray-700 text-sm font-bold mb-2">Remarks:</label>
                                                <Textarea id="event-id" name="event-id" className="w-full py-2 px-3 text-gray-700" />
                                            </div>

                                        </form>
                                    </main>
                                    </div>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <div className={"w-full h-full flex flex-col"}>
                                    <div className={"flex flex-row w-full h-full space-x-4"}>
                                        <Button onClick={closeAlertDialog} type="submit" className="bg-green-600 hover:bg-green-800 w-full mt-5 font-bold py-2 px-4 rounded-md">
                                            Approve
                                        </Button>
                                        <Button variant={"destructive"} onClick={closeAlertDialog} type="submit" className="w-full mt-5 font-bold py-2 px-4 rounded-md">
                                            Reject
                                        </Button>
                                    </div>
                                        <Button className={"mt-4"} onClick={closeAlertDialog}>
                                            Close
                                        </Button>
                                    </div>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </div>
        </main>
    )

}