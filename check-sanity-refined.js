import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 'lex57gkf',
    dataset: 'production',
    apiVersion: '2023-10-01',
    useCdn: false
});

async function checkData() {
    try {
        const dgeCount = await client.fetch('count(*[_type == "demandGenExperiment"])');
        const csCount = await client.fetch('count(*[_type == "caseStudy"])');
        const dgeList = await client.fetch('*[_type == "demandGenExperiment"]{title, _id}');
        const csList = await client.fetch('*[_type == "caseStudy"]{title, _id}');

        console.log('--- Counts ---');
        console.log('demandGenExperiment:', dgeCount);
        console.log('caseStudy:', csCount);

        console.log('--- Titles (demandGenExperiment) ---');
        dgeList.forEach(d => console.log(`- ${d.title} (${d._id})`));

        console.log('--- Titles (caseStudy) ---');
        csList.forEach(d => console.log(`- ${d.title} (${d._id})`));
    } catch (error) {
        console.error('Error:', error);
    }
}

checkData();
