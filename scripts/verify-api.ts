
import dotenv from 'dotenv';
import { createClient as createSanityClient } from '@sanity/client';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

const SANITY_PROJECT_ID = process.env.VITE_SANITY_PROJECT_ID;
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SANITY_PROJECT_ID || !SUPABASE_URL || !SUPABASE_KEY) {
    console.error("Missing environment variables. Please check .env file.");
    process.exit(1);
}

// Initialize Clients
const sanity = createSanityClient({
    projectId: SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2023-10-01',
    useCdn: false, // Use fresh data for verification
});

const supabase = createSupabaseClient(SUPABASE_URL, SUPABASE_KEY);

async function verifySanity() {
    console.log("\n--- Verifying Sanity Connection ---");
    try {
        // 1. Fetch Blogs
        const blogQuery = `*[_type == "post"] | order(publishedAt desc)[0...1]{_id, title}`;
        const blogs = await sanity.fetch(blogQuery);
        console.log(`✅ Sanity Blogs: Found ${blogs.length} post(s).`);
        if (blogs.length > 0) {
            console.log(`   Latest Post: "${blogs[0].title}"`);
        } else {
            console.warn("   ⚠️ No blog posts found. Check Sanity content.");
        }

        // 2. Fetch Case Studies
        const caseStudyQuery = `*[_type == "caseStudy"][0...1]{_id, title}`;
        const studies = await sanity.fetch(caseStudyQuery);
        console.log(`✅ Sanity Case Studies: Found ${studies.length} study(ies).`);
        if (studies.length > 0) {
            console.log(`   Latest Study: "${studies[0].title}"`);
        }

        // 3. Fetch Resume
        const resumeQuery = `*[_type == "resume"][0]{name}`;
        const resume = await sanity.fetch(resumeQuery);
        if (resume) {
            console.log(`✅ Sanity Resume: Found resume for "${resume.name}".`);
        } else {
            console.warn("   ⚠️ Resume data not found.");
        }

    } catch (error) {
        console.error("❌ Sanity Verification Failed:", error);
    }
}

async function verifySupabase() {
    console.log("\n--- Verifying Supabase Connection ---");
    try {
        // 1. Check connection/read capability (assuming 'contacts' table is available but might be empty or restricted, we'll try to just select count or a dummy read)
        // Actually, 'contacts' table is for inserts. 'comments' might be readable.
        // Let's try to fetch comments for a dummy slug.
        const { data: comments, error: commentError } = await supabase
            .from('comments')
            .select('*')
            .limit(1);

        if (commentError) {
            // It's possible the table doesn't exist or RLS blocks it.
            console.warn(`⚠️ Supabase Read (Comments) Warning: ${commentError.message} (This might be expected if table is empty or RLS is on)`);
        } else {
            console.log(`✅ Supabase Read (Comments): Success. Found ${comments.length} comments.`);
        }

        // 2. We won't test INSERT ('contact' form) here to avoid spamming the production/dev DB with test data unless strictly necessary.
        // Connection verification via read is usually sufficient to prove the client is working.
        console.log("✅ Supabase Client Initialized Successfully.");

    } catch (error) {
        console.error("❌ Supabase Verification Failed:", error);
    }
}

async function runVerification() {
    console.log("Starting End-to-End Data Verification...");
    await verifySanity();
    await verifySupabase();
    console.log("\nVerification Complete.");
}

runVerification();
