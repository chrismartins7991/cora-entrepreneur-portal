import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import { OpenAI } from 'https://esm.sh/openai@4.28.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get the user's profile data
    const { data: { user } } = await supabaseClient.auth.getUser()
    if (!user) throw new Error('No user found')

    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError) throw profileError

    // Initialize OpenAI
    const openai = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    })

    // Prepare the prompt with the user's profile data
    const prompt = `Based on the following business profile, create a structured roadmap with actionable tasks and milestones:
    
    Business Name: ${profile.business_name}
    Industry: ${profile.industry}
    Business Stage: ${profile.business_stage}
    Team Size: ${profile.team_size}
    Business Model: ${profile.business_model}
    Goals: ${JSON.stringify(profile.goals)}
    Challenges: ${JSON.stringify(profile.challenges)}
    Timeline: ${profile.goal_timeline}
    
    Format the response as a JSON object with the following structure:
    {
      "milestones": [
        {
          "title": "string",
          "description": "string",
          "timeline": "string",
          "tasks": [
            {
              "title": "string",
              "description": "string",
              "priority": "high|medium|low"
            }
          ]
        }
      ]
    }`

    console.log('Generating roadmap with prompt:', prompt)

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a business strategy expert that creates detailed, actionable roadmaps."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" }
    })

    const roadmapData = JSON.parse(completion.choices[0].message.content)
    console.log('Generated roadmap:', roadmapData)

    // Store the roadmap in the database
    const { error: insertError } = await supabaseClient
      .from('roadmap')
      .upsert({
        user_id: user.id,
        goal: 'AI Generated Roadmap',
        tasks: roadmapData,
      })

    if (insertError) throw insertError

    return new Response(JSON.stringify(roadmapData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})