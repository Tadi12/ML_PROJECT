import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate that we received the expected fields
    const { age, education, experience, job_role } = data;
    
    if (!age || !education || experience === undefined || !job_role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Call the Python ML backend
    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age: parseFloat(age),
          gender: data.gender || 'Male',
          education: education,
          job_role: job_role,
          experience: parseFloat(experience),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return NextResponse.json({ error: errorData.detail || 'ML Backend error' }, { status: response.status });
      }

      const result = await response.json();
      return NextResponse.json(result);
    } catch (error) {
      console.error('Failed to reach ML backend:', error);
      return NextResponse.json({ error: 'ML Prediction Service Unavailable' }, { status: 503 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
