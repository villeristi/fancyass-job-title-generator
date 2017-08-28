import Vue from 'vue';
import template from './home.html';

import adjectives from 'src/fixtures/adjectives';
import titles from 'src/fixtures/titles';
import nouns from 'src/fixtures/nouns';

const getRandom = (itemSet) => {
  return itemSet[Math.floor(Math.random() * itemSet.length)];
};

const sleep = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), timeout);
  });
};

const slotInterval = 1500;

export default Vue.extend({
  template,

  data() {
    return {
      created: {
        adjective: 'click button',
        title: 'to generate',
        noun: 'a fancy-ass title!',
        share: ''
      },
      datasets: {
        adjective: adjectives,
        title: titles,
        noun: nouns,
      },
      shuffling: {
        adjective: false,
        title: false,
        noun: false,
      },
      isGenerating: false,
      buttonText: 'Generate',
      displayShare: false
    };
  },

  methods: {

    generateTitle() {
      const items = Object.keys(this.datasets);
      this.displayShare = false;
      this.isGenerating = true;
      this.buttonText = 'Generating...';

      items.map((item, index) => {
        const currentDataSet = this.datasets[item];
        const interval = setInterval(() => this.generateCreated(item, currentDataSet), 60);
        this.shuffling[item] = true;

        sleep((index + 1) * slotInterval)
          .then(() => {
            clearInterval(interval);
            this.shuffling[item] = false;
            if (index === items.length - 1) {
              this.handleReady();
            }
          });
      });
    },

    handleReady() {
      this.displayShare = true;
      this.isGenerating = false;
      this.buttonText = 'Generate new!';
      this.created.share = `My New Fancy-Ass Job Title Is: ${this.created.adjective} ${this.created.title} ${this.created.noun}`;
    },

    generateCreated(item, dataset) {
      this.created[item] = getRandom(dataset);
    },
  }
});
