import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json()

    // Validate the incoming data (optional but recommended)
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 },
      )
    }

    // Process the data (e.g., save to database, perform an action)
    // This is a mock example - replace with your actual logic
    const result = {
      message: 'Submission successful',
      data: body,
    }

    // Return a success response
    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    // Handle any errors
    console.error('Submission error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
