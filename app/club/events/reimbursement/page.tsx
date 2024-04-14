import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";

export default function Home() {

    return (
        <main className={"flex h-screen w-full flex-col justify-between bg-gray-100"}>
            <div className={"w-full h-full items-center justify-center flex"}>
                <div className="w-full max-w-md px-8 py-6 bg-white rounded-lg shadow-md">
                    <header className="flex justify-between mb-4">
                        <h1 className="text-2xl font-bold text-gray-700">Apply for reimbursement</h1>
                    </header>
                    <main>
                        <form action="#">
                            <div className="mb-4">
                                <label htmlFor="event-id" className="block text-gray-700 text-sm font-bold mb-2">Event
                                    ID:</label>
                                <Input type="text" id="event-id" name="event-id" className="w-full py-2 px-3 text-gray-700" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="venue" className="block text-gray-700 text-sm font-bold mb-2">Amount:</label>
                                <Input type="text" id="event-id" name="event-id" className="w-full py-2 px-3 text-gray-700" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="venue" className="block text-gray-700 text-sm font-bold mb-2">Reason/Feedback:</label>
                                <Textarea id="event-id" name="event-id" className="w-full py-2 px-3 text-gray-700" />
                            </div>
                            <Button type="submit" className="w-full mt-5 font-bold py-2 px-4 rounded-md">
                                Submit
                            </Button>
                        </form>
                    </main>
                </div>
            </div>
        </main>
    )

}