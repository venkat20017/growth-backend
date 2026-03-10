import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 'lex57gkf',
    dataset: 'production',
    apiVersion: '2023-10-01',
    useCdn: false
});

async function checkData() {
    try {
        const experiments = await client.fetch('count(*[_type == "demandGenExperiment"])');
        const posts = await client.fetch('count(*[_type == "post"])');
        const legacyStudies = await client.fetch('count(*[_type == "caseStudy"])');
        const allTypes = await client.fetch('array::unique(*._type)');

        console.log('Experiments (demandGenExperiment):', experiments);
        console.log('Posts (post):', posts);
        console.log('Legacy Case Studies (caseStudy):', legacyStudies);
        console.log('All available types in Sanity:', allTypes);
    } catch (error) {
        console.error('Error:', error);
    }
}

checkData();
