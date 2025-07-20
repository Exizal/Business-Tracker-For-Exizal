import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const accounts = await prisma.socialAccount.findMany({
      orderBy: {
        platform: 'asc',
      },
    })
    return NextResponse.json(accounts)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch social accounts' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const account = await prisma.socialAccount.create({
      data: {
        platform: data.platform,
        username: data.username,
        profileUrl: data.profileUrl,
        accessToken: data.accessToken,
      },
    })
    return NextResponse.json(account)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create social account' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      )
    }
    await prisma.socialAccount.delete({
      where: {
        id,
      },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete social account' },
      { status: 500 }
    )
  }
} 