import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { fetchUserProjects, createProject } from '@/lib/firebase/services/services';
export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const projects = await fetchUserProjects(session.user.email);
        return NextResponse.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const data = await request.json();
        const projectId = await createProject({
            ...data,
            userId: session.user.email
        });
        return NextResponse.json({ id: projectId });
    } catch (error) {
        console.error('Error creating project:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
} 