import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 'lex57gkf',
    dataset: 'production',
    apiVersion: '2023-10-01',
    useCdn: false
});

async function checkData() {
    try {
        const d = await client.fetch('*[_type == "caseStudy"][0]');
        console.log(JSON.stringify(d, null, 2));
    } catch (error) {
        console.error('Error:', error);
    }
}

checkData();
