import { UserButton, UserProfile } from "@clerk/nextjs";
import Welcome from "./welcome";
import UI from "./components/CheckForHobby";
import { addHobby } from "@/actions/action";
import { SignInBtn } from "./components/signInBtn";
import { User } from "@clerk/nextjs/api";
import { currentUser } from "@clerk/nextjs/app-beta";
import { SignOutBtn } from "./components/signOutBtn";


export default async function Home() {
  const user: User | null = await currentUser();

  return (

    <main className="w-full flex h-screen items-center justify-center">
          {!!user ? (
        <>
          <UserProfile />
          <UserButton />
       
        </>
      ) : (
        <SignInBtn />
       
      )}

<div>
       <h1>Sign in to see your hobbies</h1>
        <p>Sign in to see your hobbies</p>
        </div>


    </main>
  );
}
