"use client"

import { addHobby } from "@/actions/action";
import { useEffect, useOptimistic, useRef, useState } from "react";
import Button from "./button";
import { PrismaClient } from "@prisma/client";
import { useSession } from "@clerk/clerk-react";


  type Hobby = {
    id: number;
    name: string;
}


type UIProps = {

    Hobbies: Hobby[];
}


export default function UI({ Hobbies }: UIProps) {
    const { session } = useSession();
        const ref = useRef<HTMLFormElement>(null);
        const [optimisticHobbies, addOptimisticHobby] = useOptimistic(Hobbies, (state, newTodo: Hobby) => {
            return [...state, newTodo];
        });

        const [userHobby, setUserHobby] = useState<Hobby | null>(null);

        useEffect(() => {
            const fetchUserHobby = async () => {
              const prisma = new PrismaClient();
              const hobby = await prisma.hobbies.findMany({
                where: {
                userId: session?.user?.id
                },
              });
              await prisma.$disconnect();
            };
        
            fetchUserHobby();
          }, [session]);

        return (
            <>
            
            <form ref={ref} action={async formData => {
                ref.current?.reset();
    
                addOptimisticHobby({ 
                    id: Math.random(),
                    name: formData.get('name') as string,
                });


                


                // input validation here
               await addHobby(formData);
            }} className='flex flex-col w-[300px] m-16 gap-2 border-b px-4 py-2'>
    
    
                    <textarea 
                     className="flex-grow resize-none overflow-hidden p-4 text-lg outline-none"
                      name="name"
                     
                      placeholder='Todo name'
                      required 
                    />
                    
                    <Button/>
                </form>
    
 
                <ul className='list-disc'>
{optimisticHobbies.map((Hobbies) => (
    <li key={Hobbies.id}>
       
        <p>{Hobbies.name}</p>
    </li>
))}

</ul>
    </>
        )
    
    }
    