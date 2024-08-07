import { options } from "@/app/api/auth/[...nextauth]/options";
import { ProfileImageUploader } from "@/components/ProfileImageUploader";
import { getServerSession } from "next-auth";

export default async function Profile() {

    const session = await getServerSession(options)

    return (
        <section>
            <h1 style={{ color: 'while' }}>
                Profile
            </h1>
            <ProfileImageUploader user={session.user} />
        </section>
    );
}

