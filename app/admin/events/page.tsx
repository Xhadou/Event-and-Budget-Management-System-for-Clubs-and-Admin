'use client'

import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

export default function Home() {

    const router = useRouter();

    return (
        <main className="flex h-screen w-full flex-col justify-between bg-gray-100">
            <div className="w-full h-full flex justify-center flex-col items-center">
                <div className="w-8/12 h-4/5 px-8 pt-6 bg-white rounded-lg shadow-md flex flex-row">
                    <div className={"h-full w-4/6 items-center justify-center flex flex-col"}>
                        <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">Upcoming Events</h1>
                        <Separator />
                        <div className={"h-full w-full items-center py-5 flex flex-col overflow-y-scroll"}>
                            <div className={"h-48 w-[500px] rounded-xl border border-gray-300 py-4 px-8 mb-5"}>
                                <p className={"text-xl"}>{"Event: Fresher's Day"}</p>
                                <p className={"text-xl mt-3"}>Date: Tomorrow</p>
                                <p className={"text-xl mt-3"}>Venue: Backyard</p>
                            </div>
                            <div className={"h-48 w-[500px] rounded-xl border border-gray-300 py-4 px-8 mb-5"}>
                                <p className={"text-xl"}>Event: Breeze</p>
                                <p className={"text-xl mt-3"}>Date: someday</p>
                                <p className={"text-xl mt-3"}>Venue: sometime</p>
                            </div>
                            <div className={"h-48 w-[500px] rounded-xl border border-gray-300 py-4 px-8 mb-5"}>
                                <p className={"text-xl"}>Event: Surge</p>
                                <p className={"text-xl mt-3"}>Date: some other day</p>
                                <p className={"text-xl mt-3"}>Venue: some other time</p>
                            </div>
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
    )

}