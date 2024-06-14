import { options } from "../api/auth/[...nextauth]/options"
import { handler } from "../api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"
import UserCard from "../components/UserCard"
import { redirect } from "next/navigation"

export default async function ServerPage() {
    const session = await getServerSession(handler)
    console.log('servercheck', { session })
    // if (!session) {
    //     redirect('/api/auth/signin?callbackUrl=/server')
    // }

    return (
        <section className="flex flex-col gap-6">
            <UserCard user={session?.user} pagetype={"Server"} />
        </section>
    )

}