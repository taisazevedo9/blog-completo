
import { put, del } from '@vercel/blob';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { options } from '../auth/[...nextauth]/options';
import db from '../../../../prisma/db';

export async function POST(request) {

    const session = await getServerSession(options);

    const filename = session.user.name;

    const dbuser = await db.user.findFirst({ where: { 
        email: user.email
    } })

    if (dbuser.avatar) {
        console.log('Vamos deletar a imagem antiga:', dbuser.avatar)
        await del(dbuser.image)
    }

    const blob = await put(filename, request.body, {
        access: 'public',
    });

    await db.user.update({
        where: {
            email: session.user.email
        },
        data: {
            avatar: blob.url
        }
    })

    return NextResponse.json(blob);
}
