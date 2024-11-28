<template>
  <div>
    <h2>Score: {{ score }} out of {{ this.words.length }}</h2>

    <form action="#" @submit.prevent="onSubmit">
      <!-- German Word -->
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="germany flag"></i> German
        </div>
        <input type="text" readonly :disabled="testOver" :value="currWord.german" />
      </div>

      <!-- Vietnamese Word -->
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="vietnam flag"></i> Vietnamese
        </div>
        <input type="text" readonly :disabled="testOver" :value="currWord.vietnamese" />
      </div>

      <!-- English Answer Input -->
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="united kingdom flag"></i> English
        </div>
        <input
          type="text"
          placeholder="Enter English word"
          v-model="englishInput"
          :disabled="testOver"
          autocomplete="off"
        />
      </div>

      <!-- Submit Button -->
      <button class="positive ui button" :disabled="testOver">Submit</button>
    </form>

    <!-- Results Display -->
    <p :class="['results', resultClass]">
      <span v-html="result"></span>
    </p>
  </div>
</template>

<script>
export default {
  name: "vocab-test",
  props: {
    words: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      randWords: [...this.words.sort(() => 0.5 - Math.random())], // Shuffle the words
      incorrectGuesses: [],
      result: "",
      resultClass: "",
      englishInput: "",
      score: 0,
      testOver: false
    };
  },
  computed: {
    currWord: function () {
      return this.randWords.length ? this.randWords[0] : null; // Current word to test
    }
  },
  methods: {
    onSubmit: function () {
      // Validate the answer
      if (this.englishInput.trim().toLowerCase() === this.currWord.english.trim().toLowerCase()) {
        this.flash("Correct!", "success", { timeout: 1000 });
        this.score += 1; // Increment score for correct answers
      } else {
        this.flash("Wrong!", "error", { timeout: 1000 });
        this.incorrectGuesses.push(
          `${this.currWord.german} (${this.currWord.vietnamese})`
        ); // Record the incorrect guess
      }

      // Clear input and move to the next word
      this.englishInput = "";
      this.randWords.shift();

      // End the test if no words are left
      if (this.randWords.length === 0) {
        this.testOver = true;
        this.displayResults();
      }
    },
    displayResults: function () {
      // Show the results when the test is finished
      if (this.incorrectGuesses.length === 0) {
        this.result = "You got everything correct. Well done!";
        this.resultClass = "success";
      } else {
        const incorrect = this.incorrectGuesses.join(", ");
        this.result = `<strong>You got the following translations wrong:</strong> ${incorrect}`;
        this.resultClass = "error";
      }
    }
  }
};
</script>

<style scoped>
.results {
  margin: 25px auto;
  padding: 15px;
  border-radius: 5px;
}

.error {
  border: 1px solid #ebccd1;
  color: #a94442;
  background-color: #f2dede;
}

.success {
  border: 1px solid #d6e9c6;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>