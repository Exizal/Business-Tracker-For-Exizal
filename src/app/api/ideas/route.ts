import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const ideas = await prisma.idea.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(ideas)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch ideas' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const idea = await prisma.idea.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        categoryId: data.categoryId,
        tags: data.tags,
      },
      include: {
        category: true,
      },
    })
    return NextResponse.json(idea)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create idea' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const idea = await prisma.idea.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        categoryId: data.categoryId,
        tags: data.tags,
      },
      include: {
        category: true,
      },
    })
    return NextResponse.json(idea)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update idea' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }
    await prisma.idea.delete({
      where: {
        id,
      },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete idea' }, { status: 500 })
  }
} 