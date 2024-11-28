<template>
    <div>
      <h1>New Word</h1>
      <word-form @createOrUpdate="createOrUpdate"></word-form>
    </div>
  </template>
  
  <script>
  import WordForm from '@/components/WordForm.vue';
  import { api } from '@/helpers/helpers';
  
  export default {
    name: 'new-word',
    components: {
      'word-form': WordForm,
    },
    methods: {
      createOrUpdate: async function (word) {
        try {
          // Call the API to create the new word
          const res = await api.createWord(word);
  
          // Show success notification
          this.flash('Word Created', 'success');
  
          // Emit an event to notify the parent component
          this.$emit('word-added', res); // Pass the created word as a payload
  
          // Optionally redirect to the words list
          this.$router.push('/words');
        } catch (error) {
          // Show error notification
          console.error('Error creating word:', error);
          this.flash(
            `Failed to create word: ${
              error.response?.data?.message || 'Internal server error'
            }`,
            'error'
          );
        }
      },
    },
  };
  </script>