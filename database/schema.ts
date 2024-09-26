import { appSchema, tableSchema } from '@nozbe/watermelondb'

export default appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'cards',
            columns: [
                { name: 'card_id', type: 'number' },
                { name: 'question', type: 'string' },
                { name: 'answer', type: 'string' },
                { name: 'keywords', type: 'string' },
                { name: 'category_id', type: 'number' },
                { name: 'answer_status_id', type: 'number' },
            ]
        }),
        tableSchema({
            name: 'category',
            columns: [
                { name: 'category_id', type: 'number' },
                { name: 'category_name', type: 'string' },
                { name: 'category_image', type: 'string' },
                { name: 'card_id', type: 'number' },
            ]
        }),
        tableSchema({
            name: 'answer_status',
            columns: [
                { name: 'answer_status_id', type: 'number' },
                { name: 'staus', type: 'string' },
                { name: 'correct_or_wrong', type: 'string' },
                { name: 'card_id', type: 'number' },
            ]
        }),
    ]
})