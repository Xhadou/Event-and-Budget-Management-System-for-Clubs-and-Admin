import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";

export default function Home() {

    return (
        <main className="flex h-screen w-full flex-col justify-between bg-gray-100">
            <div className="w-full h-full flex justify-center items-center">
                <div className="w-6/12 h-4/5 px-8 pt-6 bg-white rounded-lg shadow-md flex flex-row">
                    <div className={"h-full w-full items-center justify-center flex flex-col"}>
                        <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">Request Status</h1>
                        <Separator />
                        <div className={"h-full w-full items-center py-5 flex flex-col overflow-y-scroll"}>
                            <div className={"h-48 w-[500px] rounded-xl border border-gray-300 py-4 px-8 mb-5"}>
                                <p className={"text-xl"}>{"Event: Fresher's Day"}</p>
                                <p className={"text-xl mt-3"}>Date: Tomorrow</p>
                                <p className={"text-xl mt-3"}>Venue: Backyard</p>
                                <p className={"text-xl mt-3"}>Status: Processing</p>
                            </div>
                            <div className={"h-48 w-[500px] rounded-xl border border-gray-300 py-4 px-8 mb-5"}>
                                <p className={"text-xl"}>Event: Breeze</p>
                                <p className={"text-xl mt-3"}>Date: someday</p>
                                <p className={"text-xl mt-3"}>Venue: sometime</p>
                                <p className={"text-xl mt-3"}>Status: Processing</p>
                            </div>
                            <div className={"h-48 w-[500px] rounded-xl border border-gray-300 py-4 px-8 mb-5"}>
                                <p className={"text-xl"}>Event: Surge</p>
                                <p className={"text-xl mt-3"}>Date: some other day</p>
                                <p className={"text-xl mt-3"}>Venue: some other time</p>
                                <p className={"text-xl mt-3"}>Status: Rejected</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    )

}