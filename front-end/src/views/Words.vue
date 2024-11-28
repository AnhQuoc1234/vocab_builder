<template> 
    <div>
        <h1>Quoc Anh's Dictionary</h1>
        <table id="words" class="ui celled compact table">
            <thead>
                <tr>
                    <th>English</th>
                    <th>German</th>
                    <th>Vietnamese</th> 
                    <th colspan="3"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(word, i) in words" :key="i">
                    <td>{{ word.english }}</td>
                    <td>{{ word.german }}</td>
                    <td>{{ word.vietnamese }}</td> <!-- Display Vietnamese data -->
                    <td width="75" class="center aligned">
                        <router-link :to="{ name: 'show', params: { id: word._id }}">Show</router-link>
                    </td>
                    <td width="75" class="center aligned">
                        <router-link :to="{ name: 'edit', params: { id: word._id }}">Edit</router-link>
                    </td>
                    <td width="75" class="center aligned" @click.prevent="onDestroy(word._id)">
                        <a :href="`/words/${word._id}`">Destroy</a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { api } from '../helpers/helpers';

export default {
    name: 'words',
    data() {
        return {
            words: [] // Data fetched from API, including Vietnamese translations
        };
    },
    methods: {
        async onDestroy(id) {
            const sure = window.confirm('Are you sure?');
            if (!sure) return;
            await api.deleteWord(id);
            this.flash('Word deleted successfully!', 'success');
            const newWords = this.words.filter(word => word._id !== id);
            this.words = newWords;
        }
    },
    async mounted() {
    this.words = await api.getWords();
    console.log(this.words); // Log the fetched words to verify
}
};
</script>