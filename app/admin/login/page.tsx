'use client'

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";

export default function Home() {

    const router = useRouter();

    return (
        <main className="flex h-screen w-full flex-col items-center justify-between">
            <div className={"w-full h-full flex justify-center items-center bg-gray-100"}>
                <div className="w-full max-w-md px-8 py-6 bg-white rounded-lg shadow-md">
                    <h1 className="text-xl font-bold text-gray-700 text-center mb-4">Admin</h1>
                    <div className="mb-4">
                        <label htmlFor="username"
                               className="block text-base text-gray-700 font-bold mb-2">Username</label>
                        <Input
                            type="text"
                            id="username"
                            className="shadow rounded w-full py-2 px-3 text-gray-700"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password"
                               className="block text-base text-gray-700 font-bold mb-2">Password</label>
                        <Input
                            type="password"
                            id="password"
                            className="shadow rounded w-full py-2 px-3 text-gray-700"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Button
                            type="submit"
                            className="font-bold py-2 px-4 w-full mt-5"
                            onClick={() => {router.push('/admin/events')}}
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    )
}