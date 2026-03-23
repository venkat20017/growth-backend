const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: 'lex57gkf',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-01-01',
});

const sampleContent = [
    {
        _type: 'block',
        _key: 'b1',
        style: 'h2',
        children: [{ _type: 'span', _key: 's1', text: 'How This Experiment Was Designed' }],
        markDefs: []
    },
    {
        _type: 'block',
        _key: 'b2',
        style: 'normal',
        children: [{ _type: 'span', _key: 's2', text: 'This is the "In-Depth Walkthrough" section. You can write detailed paragraphs here explaining your strategy, what you tested, what worked, and what failed. You can also upload screenshots directly into this editor from your Google Ads dashboard, HubSpot pipeline, or any other tool — they will appear inline between your paragraphs, just like blog posts!' }],
        markDefs: []
    },
    {
        _type: 'block',
        _key: 'b3',
        style: 'h2',
        children: [{ _type: 'span', _key: 's3', text: 'Key Findings and Results Analysis' }],
        markDefs: []
    },
    {
        _type: 'block',
        _key: 'b4',
        style: 'normal',
        children: [{ _type: 'span', _key: 's4', text: 'After A/B testing two landing page variants for 3 weeks, Variant B (with a video testimonial) outperformed Variant A by 34% in conversion rate. The Cost Per Lead dropped from Rs.480 to Rs.316 within the first 14 days of the optimization. The winning insight: social proof above the fold outperforms feature lists for B2B SaaS buyers.' }],
        markDefs: []
    },
    {
        _type: 'block',
        _key: 'b5',
        style: 'h2',
        children: [{ _type: 'span', _key: 's5', text: 'Lessons Learned' }],
        markDefs: []
    },
    {
        _type: 'block',
        _key: 'b6',
        style: 'normal',
        children: [{ _type: 'span', _key: 's6', text: 'You can replace this with your actual learnings. If you have screenshots from your dashboards, go to Sanity Studio and use the "Content and Screenshots" field to upload them inline. They will appear right here between paragraphs, making your case study much more credible and visual.' }],
        markDefs: []
    }
];

async function main() {
    try {
        const studies = await client.fetch(
            `*[_type in ["demandGenExperiment","caseStudy"]]{"_id":_id,"_type":_type,"title":title,"slug":slug.current}`
        );
        console.log('Found studies:', studies.length);
        if (!studies || studies.length === 0) {
            console.log('No studies found. Please create one in Sanity Studio first.');
            return;
        }
        const target = studies[0];
        console.log('Patching:', target.title, '/', target._id);
        await client.patch(target._id).set({ content: sampleContent }).commit();
        console.log('Patch successful!');
        console.log('Frontend URL: http://localhost:5173/case-studies/' + target.slug);
    } catch (err) {
        console.error('Error:', err.message);
    }
}

main();
