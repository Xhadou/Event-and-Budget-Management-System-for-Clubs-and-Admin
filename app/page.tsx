'use client'

import Image from "next/image";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

export default function Home() {

    const router = useRouter();

  return (
    <main className="flex h-screen w-full flex-col items-center justify-between">
      <div className={"w-full h-full items-center justify-center flex"}>
        <div>
            <div className="w-fit h-fit border border-black px-16 py-16 rounded-xl flex items-center justify-center flex-col">
                <div className="">
                    <Button className="drop-shadow-2xl bg-slate-900 text-4xl text-white px-8 py-10 w-48 rounded-xl" onClick={()=>router.push("/student/login")}>
                        <p>Student</p>
                    </Button>
                    <Button className="drop-shadow-2xl bg-slate-900 text-4xl text-white px-8 py-10 w-48 ml-8 rounded-xl" onClick={()=>router.push("/club/login")}>
                        <p>Event</p>
                    </Button>
                </div>
                <Button className="drop-shadow-2xl bg-slate-900 text-4xl text-white px-8 py-10 w-48 mt-8 rounded-xl" onClick={()=>router.push("/admin/login")}>
                    <p>Admin</p>
                </Button>
            </div>
        </div>
      </div>
    </main>
  );
}
